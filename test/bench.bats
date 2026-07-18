#!/usr/bin/env bats
# Unit tests for the `bench` CLI. We source bench with HAUS_LIB=1 (which skips the
# command dispatch) and call its functions directly, pointing ROOT/CONSUMER at
# throwaway fixtures. These cover the parsing + path logic that the whole
# status/ship/release flow rests on — not the nix/darwin-rebuild side effects.

setup() {
  HAUS="$BATS_TEST_DIRNAME/../bench"
  TMP="$BATS_TEST_TMPDIR"
  # Hermetic git: ignore the machine's global/system config so fixtures behave
  # the same everywhere. (Without this, a global tag.gpgsign=true turns the
  # lightweight `git tag` calls below into "fatal: no tag message?" failures.)
  export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null
  # Source the library form; override ROOT so repo_dir() resolves into fixtures.
  HAUS_LIB=1 source "$HAUS"
  ROOT="$TMP/root"
  mkdir -p "$ROOT"
}

# ── locked_rev: parse a rev out of flake.lock, degrade to "?" on anything odd ──

@test "locked_rev reads the locked rev of an input" {
  mkdir -p "$ROOT/pounce"
  cat >"$ROOT/pounce/flake.lock" <<'JSON'
{ "nodes": { "nebelung": { "locked": { "rev": "abc123" } } } }
JSON
  run locked_rev pounce nebelung
  [ "$status" -eq 0 ]
  [ "$output" = "abc123" ]
}

@test "locked_rev yields ? when the input node is missing" {
  mkdir -p "$ROOT/pounce"
  echo '{ "nodes": {} }' >"$ROOT/pounce/flake.lock"
  run locked_rev pounce nebelung
  [ "$output" = "?" ]
}

@test "locked_rev yields ? on a missing lock file" {
  mkdir -p "$ROOT/pounce"
  run locked_rev pounce nebelung
  [ "$output" = "?" ]
}

@test "locked_rev yields ? on malformed JSON (never crashes the caller)" {
  mkdir -p "$ROOT/pounce"
  echo 'not json {{{' >"$ROOT/pounce/flake.lock"
  run locked_rev pounce nebelung
  [ "$output" = "?" ]
}

# (hook_field + the worktree lifecycle moved to the standalone `wt` tool in
# ~/.config/nix — bench no longer parses hook payloads.)

# ── local_src / overrides: worktree-aware checkout substitution ────────────────

@test "local_src points at the main checkout when not in a worktree" {
  WT_REPO="" WT_PATH=""
  run local_src nebelung
  [ "$output" = "$ROOT/nebelung" ]
}

@test "local_src substitutes the worktree path for the active worktree repo" {
  WT_REPO="nebelung" WT_PATH="/tmp/wt/nebelung"
  run local_src nebelung
  [ "$output" = "/tmp/wt/nebelung" ]
  # …but other repos still resolve to their main checkout.
  run local_src pounce
  [ "$output" = "$ROOT/pounce" ]
}

@test "overrides redirects every family input, honouring the active worktree" {
  WT_REPO="pounce" WT_PATH="/tmp/wt/pounce"
  run overrides
  [[ "$output" == *"--override-input nebelhaus path:$ROOT/nebelhaus"* ]]
  [[ "$output" == *"--override-input nebelhaus/nebelung path:$ROOT/nebelung"* ]]
  [[ "$output" == *"--override-input nebelhaus/pounce path:/tmp/wt/pounce"* ]]
}

# ── version_file / read_version: the release tag source (regression: $verfile) ─

@test "version_file locates pounce's version source" {
  run version_file pounce
  [ "$output" = "$ROOT/pounce/pkgs/pounce/default.nix" ]
}

@test "version_file rejects a non-releasable repo" {
  run version_file nebelung
  [ "$status" -ne 0 ]
}

@test "read_version extracts the version from pounce's default.nix" {
  mkdir -p "$ROOT/pounce/pkgs/pounce"
  cat >"$ROOT/pounce/pkgs/pounce/default.nix" <<'NIX'
{ lib }:
stdenv.mkDerivation {
  pname = "pounce";
  version = "1.4.2";
}
NIX
  run read_version pounce
  [ "$output" = "1.4.2" ]
}

@test "read_version reads and trims nebelhaus's VERSION file" {
  mkdir -p "$ROOT/nebelhaus"
  printf '  0.3.0\n' >"$ROOT/nebelhaus/VERSION"
  run read_version nebelhaus
  [ "$output" = "0.3.0" ]
}

# ── write_version: stamp a (date) version back into the source, round-tripping ─

@test "write_version stamps pounce's default.nix, leaving POUNCE_VERSION alone" {
  mkdir -p "$ROOT/pounce/pkgs/pounce"
  cat >"$ROOT/pounce/pkgs/pounce/default.nix" <<'NIX'
{ lib }:
stdenv.mkDerivation {
  pname = "pounce";
  version = "0.5.8";
  buildPhase = ''
    POUNCE_VERSION="$version" bash ./build.sh
  '';
}
NIX
  write_version pounce 2026.07.18
  run read_version pounce
  [ "$output" = "2026.07.18" ]
  # the shell-var line that also says "version" must survive untouched
  grep -q 'POUNCE_VERSION="\$version"' "$ROOT/pounce/pkgs/pounce/default.nix"
}

@test "write_version round-trips a same-day -N version through nebelhaus's VERSION" {
  mkdir -p "$ROOT/nebelhaus"
  printf '0.5.8\n' >"$ROOT/nebelhaus/VERSION"
  write_version nebelhaus 2026.07.18-1
  run read_version nebelhaus
  [ "$output" = "2026.07.18-1" ]
}

# ── next_version: today's date, with -N on a same-day repeat ───────────────────

@test "next_version is the bare date when nothing is tagged today" {
  make_repo pounce
  run next_version pounce
  [ "$output" = "$(date +%Y.%m.%d)" ]
}

@test "next_version appends -1 when today's bare date is already tagged" {
  make_repo pounce
  git -C "$ROOT/pounce" tag "v$(date +%Y.%m.%d)"
  run next_version pounce
  [ "$output" = "$(date +%Y.%m.%d)-1" ]
}

@test "next_version keeps counting -N past existing same-day releases" {
  make_repo pounce
  today="$(date +%Y.%m.%d)"
  git -C "$ROOT/pounce" tag "v$today"
  git -C "$ROOT/pounce" tag "v$today-1"
  git -C "$ROOT/pounce" tag "v$today-2"
  run next_version pounce
  [ "$output" = "$today-3" ]
}

# ── latest_tag / commits_since: the release-edge staleness check ───────────────

make_repo() { # make_repo <name> — a fixture git repo with one commit
  mkdir -p "$ROOT/$1"
  git -C "$ROOT/$1" init -q
  git -C "$ROOT/$1" -c user.name=t -c user.email=t@t commit -q --allow-empty -m one
}

@test "latest_tag picks the newest v* tag by version order, not lexically" {
  make_repo pounce
  git -C "$ROOT/pounce" tag v0.9.0
  git -C "$ROOT/pounce" tag v0.10.0
  run latest_tag pounce
  [ "$output" = "v0.10.0" ]
}

@test "latest_tag is empty when a repo has no tags" {
  make_repo pounce
  run latest_tag pounce
  [ "$output" = "" ]
}

@test "latest_tag ignores tags that don't look like releases" {
  make_repo pounce
  git -C "$ROOT/pounce" tag v0.1.0
  git -C "$ROOT/pounce" tag experiment
  run latest_tag pounce
  [ "$output" = "v0.1.0" ]
}

@test "commits_since counts commits on HEAD past the tag" {
  make_repo nebelhaus
  git -C "$ROOT/nebelhaus" tag v0.2.0
  git -C "$ROOT/nebelhaus" -c user.name=t -c user.email=t@t commit -q --allow-empty -m two
  git -C "$ROOT/nebelhaus" -c user.name=t -c user.email=t@t commit -q --allow-empty -m three
  run commits_since nebelhaus v0.2.0
  [ "$output" = "2" ]
}

@test "commits_since is 0 when the tag is at HEAD" {
  make_repo nebelhaus
  git -C "$ROOT/nebelhaus" tag v0.2.0
  run commits_since nebelhaus v0.2.0
  [ "$output" = "0" ]
}

@test "commits_since degrades to ? on a bogus ref" {
  make_repo nebelhaus
  run commits_since nebelhaus v9.9.9
  [ "$output" = "?" ]
}
