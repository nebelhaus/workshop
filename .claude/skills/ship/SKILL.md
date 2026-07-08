---
name: ship
description: >-
  Finish a piece of work in the nebelhaus family and land it: commit stragglers in the
  edited repo, verify with `haus try`, activate with `haus try switch`, then `haus ship`
  to ripple the flake-lock updates downstream. Use when I say /ship, "ship it", "land
  this", or want to wrap up a change across the nebelung → pounce → nebelhaus → config
  chain. Worktree-aware: from inside an agent worktree it stops at commit-and-report.
---

# Ship (nebelhaus workshop): verify → activate → ripple the locks

The nebelhaus repos form a chain of pinned flake inputs
(`nebelung → pounce → nebelhaus → ~/.config/nix`). A commit is invisible downstream
until each downstream `flake.lock` is bumped — `haus ship` does that ripple. Never
hand-walk it. `haus` lives at `~/code/nebelhaus/haus` (aliased `haus` in the shell);
run it from anywhere in the family.

## Step 0 — am I in a worktree? (decides everything)

```bash
git rev-parse --git-common-dir   # points OUTSIDE your toplevel → linked worktree
```

**If you're in a worktree** (spawned by `Ctrl Alt c`), you CANNOT ship — merging into
`main` is done from the main checkout and is my call. Instead:
1. Commit your work on the `worktree-*` branch.
2. Verify it builds: `haus try` (it's worktree-aware — it overrides the repo it belongs
   to with YOUR checkout automatically). Never `haus try switch` / `haus ship` /
   `haus release` from a worktree.
3. Report the branch name so I can merge it from the main checkout. Stop here.

Everything below is for the **main checkout** only.

## Step 1 — commit stragglers

`git status` in the repo you edited. Commit changes that belong to this work, in that
repo (imperative message; commits are GPG-signed). `haus ship` refuses dirty trees on
purpose — lock bumps are its job, feature commits are mine/yours. Don't sweep unrelated
files in; if unsure a file belongs, ask.

## Step 2 — verify it builds

```bash
haus try            # build the machine against the LOCAL checkouts (no push needed)
```

Read Nix errors from the bottom up. Don't proceed on a broken build.

## Step 3 — activate (test in prod, house style)

```bash
haus try switch     # activate the local build on this machine
```

`darwin-rebuild` is passwordless, so drive the whole loop yourself. Confirm the change
actually does what it should on the running machine — verify by running it, not by
eyeballing the diff.

## Step 4 — ship, sized to the change

`haus ship` pushes upstream→downstream, running `nix flake update` + a lock-bump commit
at each hop.

- **Small change** (bugfix, typo, config/theme tweak, docs): once it verifies, just
  `haus ship` — no need to ask. A verified fix left unpushed is a bug here.
- **Big change** (new feature, refactor, anything a user could feel break): verify it
  works, then stop and ask before `haus ship`. Once approved, drive it to shipped.
- When unsure which bucket, ask.

Don't cross-edit to make ship easier — a color hex belongs in `nebelung`, launchd logic
in `pounce`, etc. Each repo's CLAUDE.md owns its boundary.

## Step 5 — propose a release (always gated)

`haus release <repo>` puts a version in real users' hands (bump version in
`default.nix` first → tag → CI publishes → bumps `homebrew-tap`). **Never run it
unprompted.** But if this ship touched user-facing behavior in a tagged repo (pounce,
nebelhaus…), DO propose one — nudging is expected, tagging is my call. Ship first, then
release. Never hand-bump the formula's url/sha (CI owns `homebrew-tap`).

## Step 6 — report

State: which repos were shipped and their new SHAs, what you verified on the machine,
and — if applicable — the release you're proposing and why.

## The whole lifecycle (for context)

**hack** (agents draft on `worktree-*` branches) → **test** (`haus try`, worktree-aware)
→ **merge** (I fold branches into main) → **try switch** (main checkouts only) →
**ship** (`haus ship`) → **release** (tagged repos only; CI does the rest). A small fix
in the main checkout can run straight through ship; features pause before ship; release
always waits for me.
