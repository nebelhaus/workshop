<div align="center">

# 🌫 the nebelhaus workshop

**every repo in the family, in one place — and the tool that moves changes between them**

</div>

---

This directory is the working checkout of the whole
[nebelhaus](https://github.com/nebelhaus) org. Each subdirectory is its own
repo; this folder itself is a tiny repo holding only this README, a
`CLAUDE.md`, and the `haus` script. If you can only remember one thing:
**work anywhere, then `./haus status` tells you what's out of sync and
`./haus ship` makes it right.**

## the family

| repo | what it owns | you edit it when… |
|------|--------------|-------------------|
| 🌫 [**nebelung**](https://github.com/nebelhaus/nebelung) | the colors — a silver-mist Catppuccin variant + per-tool theme templates | you want a different shade of fog |
| 🐾 [**pounce**](https://github.com/nebelhaus/pounce) | the command palette — a native Swift launcher + its generic command scripts | the palette app or a built-in command changes |
| 🏠 [**nebelhaus**](https://github.com/nebelhaus/nebelhaus) | the rice — nix-darwin modules for macOS defaults, tiling, bar, shell, security | anything about *how the system behaves* |
| 🐙 [**org-profile**](https://github.com/nebelhaus/.github) | the org's front page on GitHub | the pitch changes |
| 🔒 `~/.config/nix` | **your machine** (private, lives outside this dir) | your apps, identity, secrets |

New to the parts? [AeroSpace](https://github.com/nikitabobko/AeroSpace) is a
tiling window manager for macOS (windows arrange themselves, keyboard moves
them). [SketchyBar](https://github.com/FelixKratz/SketchyBar) replaces the menu
bar. [Nix](https://nixos.org) makes the whole setup reproducible: the entire
machine is described in text files, and one command makes reality match them.

## how the repos feed each other

Each arrow is a *flake input* — a pinned reference to an exact commit of the
upstream repo, recorded in the downstream repo's `flake.lock`:

```
nebelung ──────────────┐
   │                   │
   ▼                   ▼
 pounce ─────────► nebelhaus ─────────► ~/.config/nix ───► your actual Mac
 (theme baked      (theme + palette     (pins the rice)     (darwin-rebuild
  into binary)      wired everywhere)                        switch)
```

### flakes in sixty seconds (the part that bites)

A flake input is **not** "whatever is on GitHub right now" — it's an exact
commit hash, frozen in `flake.lock`. That's what makes a rebuild reproducible.
The flip side: **committing, even pushing, changes nothing downstream** until
the downstream lock is updated to the new commit. So a color change travels
like this:

1. edit `nebelung`, commit, push
2. in `nebelhaus`: `nix flake update nebelung` (moves the pin), commit, push
3. in `~/.config/nix`: `nix flake update nebelhaus`, rebuild

That's three repos of ceremony for one hex value — which is why `haus` exists.
`./haus ship` performs exactly that ripple, in order, and `./haus status`
shows every pin that's fallen behind.

## the three workflows

**Daily driving** — you only touch your machine (a new app, an alias):

```sh
# edit ~/.config/nix/hosts/<host>/default.nix, then:
./haus rebuild        # build first, switch second — a failed build never touches the system
```

**Hacking on the rice / theme / pounce** — the important one. You never need
to push to "see" a change; `try` builds your real machine config against the
**local checkouts**, uncommitted edits and all:

```sh
# edit anything in nebelung/, pounce/, nebelhaus/…
./haus try            # does it build?  (nothing pushed, nothing activated)
./haus try switch     # run it on this Mac  (still nothing pushed)
# happy? commit in the repo(s) you touched, then:
./haus ship           # pushes upstream→downstream, updating each lock along the way
```

**Catching up** — on another machine, or after shipping from elsewhere:

```sh
./haus pull && ./haus rebuild
```

## the haus commands

| command | what it does |
|---------|--------------|
| `./haus status` | git state of every repo + every lock edge (who's pinning an old rev of whom) |
| `./haus try [switch]` | build (and optionally activate) your machine against the local checkouts |
| `./haus ship` | push everything in dependency order, rippling `flake.lock` updates downstream |
| `./haus rebuild` | plain pinned rebuild of `~/.config/nix` |
| `./haus pull` | fast-forward every repo |
| `./haus clone` | fetch any family repo missing from this directory |

Tip: the rice ships a `haus` shell alias, so these work from anywhere.

## setting up this workshop on a fresh machine

```sh
git clone https://github.com/nebelhaus/workshop.git ~/code/nebelhaus
cd ~/code/nebelhaus && ./haus clone
```

(Your private `~/.config/nix` is restored separately — see its own README.)

## where a change goes

Every repo's `CLAUDE.md` opens with the same routing table, so a session
started anywhere knows whether it's in the right place. The short version:
**colors → nebelung · the palette app → pounce · system behavior → nebelhaus ·
personal anything → `~/.config/nix`**. When in doubt, start here and read
[`CLAUDE.md`](./CLAUDE.md).

## roadmap

- **Interactive installer** — `bootstrap.sh` already scaffolds a thin personal
  config; the plan is to grow it a short interview (which IDE, which accent,
  compact or full bar) whose answers just template `nebelhaus.*` options into
  the generated host file. Everything new should stay expressible as a
  host-settable option so the interview stays a thin layer.
- **Homebrew tap** (`nebelhaus/homebrew-tap`) so `brew install nebelhaus/tap/pounce`
  works for people who won't touch Nix.
- **Screenshots** — `assets/hero.png` in the rice and `assets/demo.gif` in
  pounce are still placeholders; for a rice, the screenshot *is* the pitch.
