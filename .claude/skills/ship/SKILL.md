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

## Step 6 — activation rides the landing pane; release stays gated

- **Activation** (`bench try switch` → `darwin-rebuild switch`) is what makes the shipped
  change live. A worktree can't run it in place — but you **no longer surface it as a
  follow-up and stay open.** Step 7 spawns a main-checkout *landing pane* that runs
  `bench try switch` for me as it closes this one (activation is passwordless and
  testing-in-prod is house style, so "you need to rebuild to see it" is not news worth
  halting on). Only flag an activation when it's genuinely *risky* — something a user could
  feel break, or a change that's hard to roll back.
- **Release** (`bench release <repo>`: stamps today's CalVer date → tag → CI publishes →
  bumps `homebrew-tap`; releasable repos are pounce, trill, nebelhaus) is **always gated.**
  Never run it unprompted — but if this ship touched user-facing behavior in a tagged repo,
  **propose one** (nudging is expected, tagging is my call). Ship first, then release.

## Step 7 — report, land the verify-list, then settle-or-surface

Print the report, then a bottom-anchored **verify-list**, then decide whether to close.

**1. Report** — closing the pane wipes the screen, so print it first: which repos shipped
and their new SHAs, what `bench try` verified, which PRs merged, which worktrees you removed.

**2. The verify-list — ALWAYS the last thing in the thread**, so it survives a pane close
and is my test checklist. A single session often opens more than one PR (a workshop PR plus
child-repo PRs) — list **every** one, oldest first:

```
## 🧪 To verify — live on `main`, not released. Break something? Fresh agent + the link + what broke.

- [pounce#35](https://github.com/nebelhaus/pounce/pull/35) — <one line: what changed> · **check:** <1–3 concrete, observable steps>
- [nebelung#12](https://github.com/nebelhaus/nebelung/pull/12) — <what changed> · **check:** <steps>

Activate (idempotent, skip if the landing pane already did): `bench try switch`
```

Rules for the list: each entry is a `[repo#N](url)` markdown link — repo-qualified, never
the word "PR", the link itself is the highlight. Test steps are concrete and observable
("⌘Space 5×, no filter flash"; "hover the hidden bar, pill is opaque"), never "confirm it
works." Then **open every one of those PR URLs in Chrome** via the browser tools if they're
loadable (ToolSearch them first); skip silently in a headless/cron ship — the block above
is the reliable copy.

**3. Settle-or-surface.**

- **Something genuinely ≥ ~3/5** — a broken build you worked around, a decision I owe you, a
  *risky* activation (something a user could feel break), a release worth proposing —
  **surface it and stop. Don't close.** Routine activation is NOT this; it rides the landing
  pane below.
- **Otherwise it's settled — close this pane, spawning a main-checkout landing pane first
  whenever this is the last real pane in *its own tab*.** I keep ~1 tab per repo, so a tab
  emptying = that repo's work is done: land me in main there, running the activation, so I
  come back to the change already going live (this also covers the naked-terminal case —
  the last pane in the *only* tab — as a subset, since we always spawn before closing it):

  ```bash
  main="$(dirname "$(git rev-parse --git-common-dir)")"          # e.g. ~/code/nebelhaus
  if [ -n "$ZELLIJ_PANE_ID" ]; then
    # real panes in THIS tab only: the focus=true block, stopping before swap_tiled_layout
    panes=$(zellij action dump-layout \
              | awk '/^    tab[ ].*focus=true/{f=1} f{print} f&&/^    }[[:space:]]*$/{exit}' \
              | grep -E '^[[:space:]]+pane' | grep -vcE 'borderless=true|split_direction=')
    if [ "${panes:-0}" -le 1 ]; then
      # last real pane in this tab → land me in main running the activation, shell after
      zellij action new-pane --cwd "$main" --name activate -- zsh -ic 'bench try switch; exec zsh'
    fi
    zellij action close-pane -p "$ZELLIJ_PANE_ID"               # target the id, not the focused pane
  fi
  ```

  The count is **per-tab, not per-session**: with sibling panes still open *in this tab*
  don't spawn — just close, the tab lives on. But when this tab's last pane closes, spawn and
  auto-activate **even if other tabs still have live agents** — that's deliberate. Activation
  surfacing per-repo is what I want; if two tabs empty near-simultaneously and their
  `bench try switch` runs race, I'd rather see that race and fix it than have it hidden
  behind a per-session guard. When the shipped change needs no activation at all (docs, a
  lock-only ripple), still spawn the landing pane but drop the command — use `-- zsh` so I
  land in main instead of a bare terminal. Closing reaps the merged branch via the `wt`
  remove hook; don't wait on CI unless CI is what this thread was about.

## The whole lifecycle (for context)

**hack** (agents draft on `worktree-*` branches) → **test** (`bench try`, worktree-aware) →
**PR** (push + `gh pr create`) → **merge** (/ship merges the PR — `gh pr merge`) →
**try switch** (activate; main checkouts only) → **ship** (`bench ship` ripples locks) →
**release** (tagged repos only; CI does the rest). A small fix runs straight through; big
changes pause before merge; release always waits for me.
