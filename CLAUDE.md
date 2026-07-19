# CLAUDE.md

**The nebelhaus workshop** — the parent directory holding every repo in the
[nebelhaus](https://github.com/nebelhaus) family, plus the `bench` script that
moves changes between them. This folder's own repo holds the README, this file,
`bench`, `web/` (the nebelhaus.com Astro Starlight docs site + its Cloudflare
Worker), plus `assets/` and `test/`; the subdirectories are independent git repos.

## Master routing table

Every task belongs to exactly one repo. Go there first; each has its own
CLAUDE.md with the deep rules.

| Want to change… | Repo |
|---|---|
| colors / palette / how a tool is themed | `./nebelung` |
| the pounce app (UI, ranking) or a generic command script | `./pounce` |
| the trill Messages client (UI, providers over `chat.db`) | `./trill` |
| the rice: macOS defaults, tiling (prowl), bar (sill), shell (hearth), Touch ID (collar), pounce wiring | `./nebelhaus` |
| the org's GitHub front page | `./.github` (the `nebelhaus/.github` repo; `bench clone` maps the alias `org-profile` to it) |
| this machine's apps / identity / secrets | `~/.config/nix` (not in this dir) |
| the cross-repo workflow itself (`bench`, this README) | here |
| the nebelhaus.com install front door (`curl … init.sh`, Cloudflare Worker) | `./web` |
| pounce's Homebrew formula / trill's cask | `./homebrew-tap` — **CI-owned**; hand-edit only to bootstrap a new formula/cask |

## The one gotcha that explains everything

The repos form a chain of pinned flake inputs:
`nebelung → pounce → nebelhaus → ~/.config/nix`. A commit — even a pushed one —
is **invisible downstream** until each downstream `flake.lock` is updated.
Never hand-walk that ripple; the tooling does it:

- `./bench status` — shows every stale lock edge, dirty/unpushed repo, and
  every agent worktree / unmerged `worktree-*` branch.
- `./bench try [switch]` — build/run the user's machine against the **local
  checkouts** (via `--override-input`). This is how you test WITHOUT pushing.
  Worktree-aware: run from inside an agent worktree, it substitutes that
  worktree for the repo it belongs to — so a branch can prove it builds
  before anyone merges it. `try switch` refuses from a worktree.
- `./bench ship` — after commits exist: pushes upstream→downstream, running
  `nix flake update` + a lock-bump commit at each hop.

## Agent worktrees (parallel Claude sessions)

Claude panes spawned with `Super c` (⌘C) run `claude --worktree`: each session
gets its own checkout under `~/.cache/claude-worktrees/<repo>/<name>` on branch
`worktree-<name>`, branched from the repo's **local HEAD**. The plumbing is
`wt` — a standalone, repo-agnostic tool that ships in the **rice**
(`nebelhaus/modules/den`, next to `haus`) on PATH, wired into
`~/.claude/settings.json` as Claude Code's `WorktreeCreate`/`WorktreeRemove`
hooks (the host points the hooks at it). It lives in the rice, not `bench`,
because the rice already ships the `claude --worktree` keybinds — and not every
machine running `wt` has the workshop. Worktrees live OUTSIDE the repos so trees
stay clean and `bench try`'s `path:` overrides never swallow them. (`Ctrl Alt
Shift c` is the in-place variant: the one agent per tab allowed to edit the real
checkout.)

**Closing a pane never loses work, and every session is resumable.** `wt`'s
remove hook parks any uncommitted edits as a WIP commit on the branch before
deleting the checkout (only *merged* branches get reaped), so the checkout dir
is disposable — the branch + the Claude transcript are the real persistence.
Run `wt` to list every parked/live agent worktree across **all** repos, and
`wt <name>` (or `wt <repo>/<name>`) to rebuild a parked checkout and drop back
into `claude --resume`. This is `wt`'s job, not `bench`'s.

If YOU are running in a worktree (check: `git rev-parse --git-common-dir`
points outside your toplevel):

- Commit on your `worktree-*` branch as usual; verify with `./bench try` (it
  builds against your branch automatically).
- **Never** `bench try switch`, `bench ship`, or touch the main checkouts —
  merging into `main` happens from the main checkout, and it's the user's call.
- When done, say the branch name; the worktree dies with the pane, the branch
  survives until merged (and `bench status` nags about it).

**A worktree is of whichever repo the pane sat in — and a *workshop* worktree
cannot see the child repos.** Check `git rev-parse --git-common-dir`: if it
points at `…/nebelhaus/.git` (the workshop), your tree holds ONLY the workshop's
own files (`README.md`, `CLAUDE.md`, `bench`, `assets`, `web/`). The family
sub-repos — rice (`nebelhaus/`), `nebelung/`, `pounce/`, `trill/`, `.github/`,
`homebrew-tap/` — are **not here at all.** This is **NOT** a `.gitignore`
visibility problem, and re-reading the ignore file won't change it: a linked
worktree of the workshop simply never checks out the sibling repos, because each
is an independent repo that lives only in the main checkout (`~/code/nebelhaus/<repo>`).
So the moment a task turns out to belong to a child repo (per the routing table),
don't grep, edit, or hunt for those files in *this* tree, and don't report them as
"hidden by gitignore." **You have standing permission — no need to ask — to make a
dedicated worktree of that child repo and do the work there.** That's the default
path from a workshop worktree; just do it:

```
git -C ~/code/nebelhaus/<repo> worktree add -b worktree-<name> \
    ~/.cache/claude-worktrees/nebelhaus/<name> HEAD
cd ~/.cache/claude-worktrees/nebelhaus/<name>
```

Then work, commit on the `worktree-<name>` branch, and — when the change is
ready — push it and open a PR against that child repo, all without asking. A
hand-made sub-repo worktree isn't auto-cleaned on pane close, so remove it after
merge (`git -C ~/code/nebelhaus/<repo> worktree remove …`). Tell me the child
repo, the branch, and the PR when you're done. (Editing the child's *main*
checkout at `~/code/nebelhaus/<repo>` directly is the fallback only if I ask for
it — the isolated worktree is preferred.)

## Working from the main checkout (`~/code/nebelhaus` — the normal case)

Not a worktree, not a cloud session — this is where most work happens, and the
worktree/cloud restrictions above do **not** apply here. The child repos
(`nebelhaus`, `nebelung`, `pounce`, `trill`, `.github`, `homebrew-tap`) are
`.gitignore`d by the workshop **only to keep the outer tree clean** — each is a
full, independent repo I own solo, and from the main checkout you drive it
end-to-end:

- To change a child, `cd` into it and commit / push / ship it normally, under
  its own CLAUDE.md and the ship-by-default policy. A child being gitignored
  *up here* says nothing about committing *down there* — that's a different
  repo, and it is **not** a signal that git ops there are risky or need extra
  confirmation. Don't downgrade a solo repo to "ask first" just because it
  nests inside this one.
- When I ask for the whole flow — fold in the `worktree-*` branches, `bench try
  switch` to activate, `bench ship` the ripple, rebuild — run it straight through
  across every repo it touches. "Merging is my call" means don't merge
  *unprompted*; once I've asked, don't stop to re-confirm each repo
  word-for-word. That per-repo hand-holding is the exact friction this whole
  router dir exists to remove.

## Claude Code on the web (cloud sessions)

Web sessions boot a bare Linux container with **no Nix**. A remote-only
`SessionStart` hook (`.claude/hooks/session-start.sh`, present in each repo)
installs Determinate Nix so flake work is possible at all — without it you get
"nix isn't on this box" the moment you touch a lock. It also exports
`NIX_SSL_CERT_FILE` at the agent-proxy CA, because Nix's fetches tunnel through
that proxy (TLS re-terminated) and fail verification otherwise. The hook is
guarded on `CLAUDE_CODE_REMOTE`, so local macOS sessions no-op.

What a cloud session **can** do, and its hard limits (all found the hard way):

- ✅ Edit modules, `nixfmt`, read/resolve the flakes.
- ✅ Regenerate `flake.lock` entries for **nebelhaus-org inputs** (pounce,
  nebelung) — those repos are in the session's GitHub scope.
- ⚠️ **Full `nix eval`/build won't run under the default org-scoped access.**
  A flake pulls nixpkgs / nix-darwin / home-manager / catppuccin from
  *third-party* GitHub orgs, Nix fetches them through the session's GitHub gate,
  and `add_repo` refuses cross-owner adds — so you can't grant them one by one.
  It needs an environment whose **network policy allows general `github.com`
  egress** plus the Nix caches (`cache.nixos.org`, `channels.nixos.org`,
  `releases.nixos.org`). Sanity-check with `nix flake metadata github:NixOS/nixpkgs`:
  if it 403s with "use add_repo", the policy is still too tight for a full eval.
- ❌ `bench try switch` / `darwin-rebuild switch` never run here — macOS only.
  Activation is always a local, main-checkout job.

So cloud is for **editing + own-org lock bumps**, not for building or switching.

## Rules for working here

- **Verify by actually running it.** `./bench try` to build, then
  `./bench try switch` to activate on the machine — testing in prod is the
  house style, and `darwin-rebuild` is passwordless, so drive the whole loop
  yourself (main checkouts only; worktrees stop at `try`).
- **Ship by default, sized to the change.** `./bench ship` pushes to GitHub.
  Small stuff — bugfixes, typos, config/theme tweaks, docs — commit, verify,
  ship, without asking; a verified fix left unpushed is a bug here. Big
  stuff — new features, refactors, anything users could feel break — verify
  it works, then stop and ask before shipping. When unsure which bucket, ask.
- **Releases are always gated.** `./bench release` puts a version in real
  users' hands (tag → CI → homebrew). Never run it unprompted — but DO
  propose one after shipping user-facing changes to a tagged repo. Nudging
  is expected; tagging is the user's call.
- Commit in the repo you edited; `bench ship` refuses dirty trees on purpose
  (commit messages are yours/the user's, lock bumps are its).
- **Releases ride tags, not pushes.** Versions are **date-based** (CalVer):
  `./bench release pounce` stamps today's date — `YYYY.MM.DD`, or `YYYY.MM.DD-N`
  on a same-day repeat — into the repo's version source, commits it, and tags
  `v<date>`; CI then publishes the GitHub release and bumps `homebrew-tap`. No
  version number is ever typed by hand — the date IS the version, so there's
  nothing to bump before releasing. Never hand-bump the formula's url/sha lines.
  Ship first, then release (the date-stamp moves HEAD, so `bench ship` again
  afterward to ripple that lock downstream).
- Don't cross-edit: a color hex in `nebelhaus`, or launchd logic in `pounce`,
  is in the wrong repo even if it would work. Each repo's CLAUDE.md enforces
  its own boundary — respect it from up here too.
- The whole life of a change: **hack** (agents draft on `worktree-*` branches)
  → **test** (`bench try`, worktree-aware) → **merge** (user folds branches into
  main) → **try switch** (main checkouts only) → **ship** → **release**
  (tagged repos only; CI does the rest). For small fixes an agent in the main
  checkout drives it straight through **ship**; features pause for the user
  before ship; **release** always waits for the user.
