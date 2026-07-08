---
title: What is nebelhaus?
description: An opinionated macOS rice — silver-grey, keyboard-first, reproducible, and Nix-native. What it is, who it's for, and what you actually get.
---

**nebelhaus** turns a Mac into a quiet, keyboard-first, fog-grey workstation —
arranged like a tiling Linux rig, but native to the grain of the Mac. It is a
small family of tools tied together by one Nix flake. Run one command and the
whole house rises: a tiling window manager, a status bar, a themed shell, a
command palette, Touch-ID sudo, and a single muted colour scheme painted across
every app you own.

Wipe the machine and rebuild it, and it stands again — bar, windows, theme, and
all — because the entire system is described in text and pinned to exact commits.

## The pitch, in one breath

> An opinionated macOS, raised in the fog. Silver-grey · keyboard-first ·
> reproducible · nix-native.

Grey is the point. The default palette — [nebelung](/reference/palette/) — is a
low-contrast, muted dark theme for people who find most themes too loud, named
for a cat breed the colour of high fog.

## Who it's for

- You like **tiling window managers** and keyboard-driven workflows, and wish
  the Mac felt more like one without fighting it.
- You want your machine to be **reproducible** — describable in git, restorable
  on a fresh laptop in one command.
- You appreciate a **calm, cohesive look** across the terminal, editor, git,
  and browser instead of a different accent colour in every app.
- You're comfortable in a terminal. You do **not** need to know Nix going in —
  the installer scaffolds everything — but you'll get more out of it over time.

If you've never touched Nix, that's fine. [Nix](https://nixos.org) is what makes
the setup reproducible: the whole machine is described in text files, and one
command makes reality match them.

## What you get

| Piece | Codename | What it does |
|---|---|---|
| Tiling & launcher | **prowl** | [AeroSpace](https://github.com/nikitabobko/AeroSpace) tiling, driven from the home row; tap Caps-Lock to launch or throw windows |
| Status bar | **sill** | [SketchyBar](https://github.com/FelixKratz/SketchyBar) with workspace pills, weather, media, battery, clock |
| Shell & terminal | **hearth** | zsh + starship + [Ghostty](https://ghostty.org) + zellij + yazi + helix, all themed |
| Touch-ID sudo | **collar** | fingerprint auth for `sudo` — even inside a terminal multiplexer |
| Command palette | **pounce** | a native ⌘Space launcher where every command is a file |
| The colours | **nebelung** | one silver-mist palette rendered onto 20+ tools |
| System core | **den** | macOS defaults, Homebrew policy, the `haus` CLI |

Each piece also stands on its own — you can take the whole rice, or just
[pounce](/guides/pounce/), or just [the palette](/reference/palette/).

## The two-command install

```sh
# 1. Scaffold your config (installs Nix if needed, interviews you, writes files)
curl -fsSL https://nebelhaus.com/init.sh | bash

# 2. Build and switch into it
cd ~/.config/nix
nix build .#darwinConfigurations.$(scutil --get LocalHostName).system \
  && sudo ./result/sw/bin/darwin-rebuild switch --flake .
```

The [Install](/start/install/) page walks through exactly what the one-liner
does — and how to read it first if you'd rather not pipe curl into bash blind.

## How the pieces relate

The rice is **generic, complete, and identity-free**. Your name, keys, secrets,
and private app list live in a thin config you own at `~/.config/nix` — never
edited into the rice itself. The rice stays upstream, where `nix flake update`
pulls new versions. See [The family](/start/the-family/) and
[How the flakes fit together](/internals/flakes/) for the full picture.

Ready? Head to [Install](/start/install/).
