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

## The one gotcha that explains everything

The repos form a chain of pinned flake inputs:
`nebelung → pounce → nebelhaus → ~/.config/nix`. A commit — even a pushed one —
is **invisible downstream** until each downstream `flake.lock` is updated.
Never hand-walk that ripple; the tooling does it:

- `./haus status` — shows every stale lock edge and dirty/unpushed repo.
- `./haus try [switch]` — build/run the user's machine against the **local
  checkouts** (via `--override-input`). This is how you test WITHOUT pushing.
- `./haus ship` — after commits exist: pushes upstream→downstream, running
  `nix flake update` + a lock-bump commit at each hop.

## Rules for working here

- **Test with `./haus try` before proposing a ship.** A change isn't verified
  until the consumer config builds against it.
- **`./haus ship` pushes to GitHub** — it's the "make it prod" button. Don't
  run it unless the user asked to ship/push.
- Commit in the repo you edited; `haus ship` refuses dirty trees on purpose
  (commit messages are yours/the user's, lock bumps are its).
- Don't cross-edit: a color hex in `nebelhaus`, or launchd logic in `pounce`,
  is in the wrong repo even if it would work. Each repo's CLAUDE.md enforces
  its own boundary — respect it from up here too.
