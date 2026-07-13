<div align="center">

# 🌫 the nebelhaus workshop

**every repo in the family, in one place — and the tool that moves changes between them**

![the nebelhaus family](./assets/nebelhaus-banner-rounded.png)

</div>

---

This directory is the working checkout of the whole
[nebelhaus](https://github.com/nebelhaus) org. Each subdirectory is its own
repo; this folder itself is a tiny repo holding only this README, a
`CLAUDE.md`, and the `bench` script. If you can only remember one thing:
**work anywhere, then `./bench status` tells you what's out of sync and
`./bench ship` makes it right.**

## the family

| repo | what it owns | you edit it when… |
|------|--------------|-------------------|
| 🌫 [**nebelung**](https://github.com/nebelhaus/nebelung) | the colors — a silver-mist Catppuccin variant + per-tool theme templates | you want a different shade of fog |
| 🐾 [**pounce**](https://github.com/nebelhaus/pounce) | the command palette — a native Swift launcher + its generic command scripts | the palette app or a built-in command changes |
| 🏠 [**nebelhaus**](https://github.com/nebelhaus/nebelhaus) | the rice — nix-darwin modules for macOS defaults, tiling, bar, shell, security | anything about *how the system behaves* |
| 🐙 [**org-profile**](https://github.com/nebelhaus/.github) | the org's front page on GitHub | the pitch changes |
| 🍺 [**homebrew-tap**](https://github.com/nebelhaus/homebrew-tap) | the Homebrew tap (`brew tap nebelhaus/tap`) | almost never — CI bumps it on every `bench release` |
| 🔒 `~/.config/nix` | **your machine** (private, lives outside this dir) | your apps, identity, secrets |

New to the parts? [AeroSpace](https://github.com/nikitabobko/AeroSpace) is a
tiling window manager for macOS (windows arrange themselves, keyboard moves
them). [SketchyBar](https://github.com/FelixKratz/SketchyBar) replaces the menu
bar. [Nix](https://nixos.org) makes the whole setup reproducible: the entire
machine is described in text files, and one command makes reality match them.

## how the repos feed each other

Each link is a *flake input* — a pinned reference to an exact commit of the
upstream repo, recorded in the downstream repo's `flake.lock`:

![one colour change rippling down the chain: nebelung → pounce → nebelhaus → ~/.config/nix → your Mac, each lock pinning the exact commit of the one before](./assets/ripple.webp)

### flakes in sixty seconds (the part that bites)

A flake input is **not** "whatever is on GitHub right now" — it's an exact
commit hash, frozen in `flake.lock`. That's what makes a rebuild reproducible.
The flip side: **committing, even pushing, changes nothing downstream** until
the downstream lock is updated to the new commit. So a color change travels
like this:

1. edit `nebelung`, commit, push
2. in `nebelhaus`: `nix flake update nebelung` (moves the pin), commit, push
3. in `~/.config/nix`: `nix flake update nebelhaus`, rebuild

That's three repos of ceremony for one hex value — which is why `bench` exists.
`./bench ship` performs exactly that ripple, in order, and `./bench status`
shows every pin that's fallen behind.

## the workflows

**Daily driving** — you only touch your machine (a new app, an alias):

```sh
# edit ~/.config/nix/hosts/<host>/default.nix, then:
./bench rebuild        # build first, switch second — a failed build never touches the system
```

**Hacking on the rice / theme / pounce** — the important one. You never need
to push to "see" a change; `try` builds your real machine config against the
**local checkouts**, uncommitted edits and all:

```sh
# edit anything in nebelung/, pounce/, nebelhaus/…
./bench try            # does it build?  (nothing pushed, nothing activated)
./bench try switch     # run it on this Mac  (still nothing pushed)
# happy? commit in the repo(s) you touched, then:
./bench ship           # pushes upstream→downstream, updating each lock along the way
```

**Parallel Claude agents** — `Ctrl Alt c` in any repo tab spawns a Claude
session in its **own git worktree** (own checkout, own `worktree-*` branch,
branched from local HEAD), so agents never yank the branch out from under each
other — or you. The worktrees live *outside* the repos, in
`~/.cache/claude-worktrees/<repo>/<name>`: Claude Code's `WorktreeCreate` /
`WorktreeRemove` hooks (in `~/.claude/settings.json`) delegate to
`bench wt-create` / `wt-remove`, which is what keeps `git status` and
`bench try`'s overrides clean. `Ctrl Alt Shift c` spawns the one agent allowed
to edit the checkout you're looking at.

```sh
# Ctrl-Alt-c panes hack away on their own branches; meanwhile:
./bench status               # …also lists agent worktrees + unmerged worktree-* branches
# an agent (or you, cd'd into its worktree) can prove its branch builds:
./bench try                  # from inside a worktree: that repo's override points AT the worktree
# happy with an agent's work? merge it from the main checkout:
git -C nebelung merge worktree-<name>
# closing the claude pane removes the worktree; the branch survives until merged
```

**Catching up** — on another machine, or after shipping from elsewhere:

```sh
./bench pull && ./bench rebuild
```

**Releasing** — two repos are releasable, and each release has a real audience:

```sh
./bench ship                # everything pushed & locks current first
./bench release pounce      # tags v<version> from pkgs/pounce/default.nix —
                            # CI publishes the release + bumps homebrew-tap
./bench release nebelhaus   # tags v<version> from VERSION — this is what
                            # nebelhaus.com/init.sh serves to new installs
```

The rice one matters more than it looks: the install one-liner serves the
**latest rice release**, so until you cut one, new users bootstrap from the
previous tag no matter what's on `main`. Ship user-visible rice changes, then
release.

## the bench commands

| command | what it does |
|---------|--------------|
| `./bench status` | git state of every repo, every lock edge (who's pinning an old rev of whom), and every release edge (is the tag users install from behind main?) |
| `./bench try [switch]` | build (and optionally activate) your machine against the local checkouts |
| `./bench ship` | push everything in dependency order, rippling `flake.lock` updates downstream |
| `./bench rebuild` | plain pinned rebuild of `~/.config/nix` |
| `./bench pull` | fast-forward every repo |
| `./bench clone` | fetch any family repo missing from this directory |
| `./bench release <repo>` | tag `v<version>` (read from the repo) — CI publishes the release + bumps the brew tap |
| `./bench wt-create` / `wt-remove` | plumbing for Claude Code's worktree hooks (JSON on stdin) — not for humans |

Tip: the rice ships a `bench` shell alias, so these work from anywhere.

## the whole life of a change

```
hack ──► test ──► try ──► merge ──► ship ──► release
```

1. **hack** — edit in place, or let `Ctrl Alt c` agents draft on `worktree-*`
   branches in parallel; the main checkouts never move.
2. **test** — `./bench try` from wherever you are: it builds your real machine
   against the local checkouts (from inside an agent worktree, against *that*
   branch). `./bench try switch` activates it — main checkouts only; it refuses
   from a worktree.
3. **merge** — fold the agent branches you like into `main` (the branch, and a
   nagging `bench status` line, survive until you do).
4. **ship** — commit, then `./bench ship` pushes upstream→downstream, rippling
   every `flake.lock`.
5. **release** — bump the version, `./bench release <repo>`, and CI does the
   rest (pounce: GitHub release + Homebrew formula; nebelhaus: the tag
   `init.sh` serves to new installs).

## setting up this workshop on a fresh machine

```sh
git clone https://github.com/nebelhaus/workshop.git ~/code/nebelhaus
cd ~/code/nebelhaus && ./bench clone
```

(Your private `~/.config/nix` is restored separately — see its own README.)

## where a change goes

Every repo's `CLAUDE.md` opens with the same routing table, so a session
started anywhere knows whether it's in the right place. The short version:
**colors → nebelung · the palette app → pounce · system behavior → nebelhaus ·
personal anything → `~/.config/nix`**. When in doubt, start here and read
[`CLAUDE.md`](./CLAUDE.md).

## roadmap

- **nebelhaus tui options program** — A custom install script that people can `curl` and pipe into bash. It will spawn a (ts/bun/node) TUI allowing people to input information and choose preferences for their rice (like favorite IDE, accent color, etc.). These answers will template `nebelhaus.*` options into the generated host file.
- **Screenshots** — `assets/hero.png` in the rice is still a placeholder
  (pounce's `assets/demo.webp` hero is shot); for a rice, the screenshot *is* the pitch.
