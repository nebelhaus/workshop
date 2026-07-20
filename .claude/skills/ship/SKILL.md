---
name: ship
description: >-
  Finish a piece of work in the nebelhaus family and land it: commit stragglers, verify
  with `bench try`, open a PR and merge it, clean up every worktree the session spun up,
  ripple the flake locks with `bench ship` — then, if nothing important is left to flag,
  close the pane. Use when I say /ship, "ship it", "land this", or want to wrap up a change
  across the nebelung → pounce → nebelhaus → config chain. Worktree-aware: invoking /ship
  is the go-ahead to merge the PR; only `try switch` (activation) and `bench release` stay
  main-checkout-only.
---

# Ship (nebelhaus workshop): verify → PR → merge → clean up → ripple → close

The nebelhaus repos form a chain of pinned flake inputs
(`nebelung → pounce → nebelhaus → ~/.config/nix`). A commit is invisible downstream until
each downstream `flake.lock` is bumped — `bench ship` does that ripple. Never hand-walk it.
`bench` lives at `~/code/nebelhaus/bench` (aliased `bench`); run it from anywhere.

End-state: the work is merged **through a PR**, the locks are rippled, every worktree this
session created is gone, and — if there's nothing worth my attention — the pane is closed.

## Why a PR, and why /ship merges it

Land through a PR (never a direct push or a local `git merge` into `main`) so parallel
agents can't clobber each other — a PR is atomic and conflict-detected. "Merging is my
call" means *don't merge unprompted*. **Invoking /ship IS that prompt:** open the PR for
the safety, then merge it. Only *activation* and *release* still wait for me.

## Step 0 — am I in a worktree? (decides how far you go)

```bash
git rev-parse --git-common-dir   # points OUTSIDE your toplevel → linked worktree
```

Everything through **ripple** is yours to drive from a worktree. The only lines you may
NOT cross from a worktree are `bench try switch` (activation) and `bench release` (always
gated) — both are main-checkout jobs. From the main checkout you can do those too.

## Step 1 — commit stragglers

`git status` in the repo you edited. Commit changes that belong to this work, in that repo
(imperative message; commits are GPG-signed). Don't sweep unrelated files in; if unsure a
file belongs, ask. `bench ship` refuses dirty trees on purpose — feature commits are
yours/mine, lock bumps are its.

## Step 2 — verify it builds

```bash
bench try            # build the machine against the LOCAL checkouts (worktree-aware)
```

`bench try` overrides whichever repo your worktree belongs to with YOUR checkout, so it
proves the branch before anyone merges. Read Nix errors bottom-up; don't proceed on a
broken build.

## Step 3 — open the PR and merge it

Push the branch and open the PR against `main` **in the repo you edited** (a workshop
worktree that spawned a child-repo worktree opens the PR in that child repo):

```bash
git push -u origin HEAD
gh pr create --base main --fill        # real title/body when it helps
gh pr merge --squash --delete-branch
```

Not mergeable (conflicts / non-fast-forward)? `git fetch origin && git rebase origin/main`,
push, retry. On conflicts you can't cleanly resolve, **stop and show them** — never
force-push `main`. On the current worktree's own branch the *local* delete may be skipped
because you're standing on it — fine, the `wt` remove hook reaps the merged branch when the
pane closes.

## Step 4 — clean up every worktree this session spun up

A workshop worktree can't see the child repos, so when a task belongs to one you
hand-create a child-repo worktree (`git worktree add …`) to do the work. Those are **NOT**
auto-reaped. For each worktree you created (this repo or any other): confirm its branch is
merged (open + merge its PR as in Step 3), then remove it:

```bash
git -C ~/code/nebelhaus/<repo> worktree remove <path>   # --force only if confirmed clean
```

`wt` lists every agent worktree across all repos — use it to catch any you forgot. Don't
delete worktrees you didn't create.

## Step 5 — ripple the locks

If the merge moved an upstream repo's HEAD that downstreams pin, walk the bump down the
chain:

```bash
bench ship           # push upstream→downstream, nix flake update + lock-bump commit per hop
```

`bench ship` is allowed from a worktree (standing permission) — it only pushes
already-committed/merged work and operates on the MAIN checkouts, never your branch and
never activating. Size it to the change: small (bugfix/typo/config/theme/docs) — just ship;
big (feature/refactor/anything a user could feel break) — you'll already have paused before
merging, so confirm it's approved before you ripple.

## Step 6 — activation & release (main-checkout only — note them, don't do them from a worktree)

- **Activation** (`bench try switch` → `darwin-rebuild switch`) makes the shipped change
  live on the machine. It's a main-checkout job — from a worktree you *can't*, so if the
  change needs activating to be seen, say so in the report as a follow-up for me.
- **Release** (`bench release <repo>`: stamps today's CalVer date → tag → CI publishes →
  bumps `homebrew-tap`; releasable repos are pounce, trill, nebelhaus) is **always gated.**
  Never run it unprompted — but if this ship touched user-facing behavior in a tagged repo,
  **propose one** (nudging is expected, tagging is my call). Ship first, then release.

## Step 7 — report, then settle-or-surface

Print the report *first* — closing the pane wipes it from screen. Then judge whether
anything deserves my attention:

- **Something ≥ ~3/5 importance** — a broken build you worked around, a decision I need to
  make, a pending activation for a user-facing change, a release worth proposing, a risky
  change — **surface it and stop. Don't close.**
- **Only low-importance notes (≤ 2.5/5) and it's all landed + rippled** — **close this pane:**
  ```bash
  [ -n "$ZELLIJ_PANE_ID" ] && zellij action close-pane -p "$ZELLIJ_PANE_ID"
  ```
  Target `$ZELLIJ_PANE_ID` explicitly — plain `close-pane` kills whatever pane is
  *focused*, which may not be this one. Closing kills this session; the `wt` remove hook
  reaps the merged branch. Don't wait on CI unless CI is what this thread was about.

**Report:** which repos shipped and their new SHAs, what you verified with `bench try`,
which PRs merged, which worktrees you removed, and either the one thing you're surfacing
(activation follow-up, release proposal) or "settled — closing the pane."

## The whole lifecycle (for context)

**hack** (agents draft on `worktree-*` branches) → **test** (`bench try`, worktree-aware) →
**PR** (push + `gh pr create`) → **merge** (/ship merges the PR — `gh pr merge`) →
**try switch** (activate; main checkouts only) → **ship** (`bench ship` ripples locks) →
**release** (tagged repos only; CI does the rest). A small fix runs straight through; big
changes pause before merge; release always waits for me.
