# CLAUDE.md

**The nebelhaus workshop** — the parent directory holding every repo in the
[nebelhaus](https://github.com/nebelhaus) family, plus the `haus` script that
moves changes between them. This folder's own repo contains ONLY the README,
this file, and `haus`; the subdirectories are independent git repos.

## Master routing table

Every task belongs to exactly one repo. Go there first; each has its own
CLAUDE.md with the deep rules.

| Want to change… | Repo |
|---|---|
| colors / palette / how a tool is themed | `./nebelung` |
| the pounce app (UI, ranking) or a generic command script | `./pounce` |
| the rice: macOS defaults, tiling (prowl), bar (sill), shell (hearth), Touch ID (collar), pounce wiring | `./nebelhaus` |
| the org's GitHub front page | `./org-profile` |
| this machine's apps / identity / secrets | `~/.config/nix` (not in this dir) |
| the cross-repo workflow itself (`haus`, this README) | here |
| pounce's Homebrew formula | `./homebrew-tap` — **CI-owned**; hand-edit only to bootstrap a new formula |

## The one gotcha that explains everything

The repos form a chain of pinned flake inputs:
`nebelung → pounce → nebelhaus → ~/.config/nix`. A commit — even a pushed one —
is **invisible downstream** until each downstream `flake.lock` is updated.
Never hand-walk that ripple; the tooling does it:

- `./haus status` — shows every stale lock edge, dirty/unpushed repo, and
  every agent worktree / unmerged `worktree-*` branch.
- `./haus try [switch]` — build/run the user's machine against the **local
  checkouts** (via `--override-input`). This is how you test WITHOUT pushing.
  Worktree-aware: run from inside an agent worktree, it substitutes that
  worktree for the repo it belongs to — so a branch can prove it builds
  before anyone merges it. `try switch` refuses from a worktree.
- `./haus ship` — after commits exist: pushes upstream→downstream, running
  `nix flake update` + a lock-bump commit at each hop.

## Agent worktrees (parallel Claude sessions)

Claude panes spawned with `Ctrl Alt c` run `claude --worktree`: each session
gets its own checkout under `~/.cache/claude-worktrees/<repo>/<name>` on branch
`worktree-<name>`, branched from the repo's **local HEAD**. The plumbing is
`haus wt-create` / `wt-remove`, wired into `~/.claude/settings.json` as
Claude Code's `WorktreeCreate`/`WorktreeRemove` hooks — worktrees deliberately
live OUTSIDE the repos so trees stay clean and `haus try`'s `path:` overrides
never swallow them. (`Ctrl Alt Shift c` is the in-place variant: the one agent
per tab allowed to edit the real checkout.)

If YOU are running in a worktree (check: `git rev-parse --git-common-dir`
points outside your toplevel):

- Commit on your `worktree-*` branch as usual; verify with `./haus try` (it
  builds against your branch automatically).
- **Never** `haus try switch`, `haus ship`, or touch the main checkouts —
  merging into `main` happens from the main checkout, and it's the user's call.
- When done, say the branch name; the worktree dies with the pane, the branch
  survives until merged (and `haus status` nags about it).

## Rules for working here

- **Verify by actually running it.** `./haus try` to build, then
  `./haus try switch` to activate on the machine — testing in prod is the
  house style, and `darwin-rebuild` is passwordless, so drive the whole loop
  yourself (main checkouts only; worktrees stop at `try`).
- **Ship by default, sized to the change.** `./haus ship` pushes to GitHub.
  Small stuff — bugfixes, typos, config/theme tweaks, docs — commit, verify,
  ship, without asking; a verified fix left unpushed is a bug here. Big
  stuff — new features, refactors, anything users could feel break — verify
  it works, then stop and ask before shipping. When unsure which bucket, ask.
- **Releases are always gated.** `./haus release` puts a version in real
  users' hands (tag → CI → homebrew). Never run it unprompted — but DO
  propose one after shipping user-facing changes to a tagged repo. Nudging
  is expected; tagging is the user's call.
- Commit in the repo you edited; `haus ship` refuses dirty trees on purpose
  (commit messages are yours/the user's, lock bumps are its).
- **Releases ride tags, not pushes.** `./haus release pounce` tags `v<version>`
  (read from `pkgs/pounce/default.nix`); CI then publishes the GitHub release
  and bumps `homebrew-tap`. Never hand-bump the formula's url/sha lines, and
  bump the version in `default.nix` BEFORE releasing. Ship first, then release.
- Don't cross-edit: a color hex in `nebelhaus`, or launchd logic in `pounce`,
  is in the wrong repo even if it would work. Each repo's CLAUDE.md enforces
  its own boundary — respect it from up here too.
- The whole life of a change: **hack** (agents draft on `worktree-*` branches)
  → **test** (`haus try`, worktree-aware) → **merge** (user folds branches into
  main) → **try switch** (main checkouts only) → **ship** → **release**
  (tagged repos only; CI does the rest). For small fixes an agent in the main
  checkout drives it straight through **ship**; features pause for the user
  before ship; **release** always waits for the user.
