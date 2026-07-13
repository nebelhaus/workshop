---
title: The family
description: The repos that make up nebelhaus, what each one owns, and how they feed each other.
---

nebelhaus is not one repo — it's a small family, each piece owning one job and
usable on its own. The rice ([nebelhaus](https://github.com/nebelhaus/nebelhaus))
ties them together, but pounce and nebelung stand alone too.

## The repos

| Repo | Owns | You touch it when… |
|---|---|---|
| 🏠 [**nebelhaus**](https://github.com/nebelhaus/nebelhaus) | the rice — nix-darwin modules for tiling, bar, shell, security, palette wiring | anything about *how the system behaves* |
| 🐾 [**pounce**](https://github.com/nebelhaus/pounce) | the launcher — a native Swift command palette + its generic command scripts | the palette app or a built-in command changes |
| 🌫 [**nebelung**](https://github.com/nebelhaus/nebelung) | the colours — a silver-mist Catppuccin variant + per-tool theme templates | you want a different shade of fog |
| 🍺 [**homebrew-tap**](https://github.com/nebelhaus/homebrew-tap) | the Homebrew tap (`brew tap nebelhaus/tap`) | almost never — CI bumps it on every release |
| 🧰 [**workshop**](https://github.com/nebelhaus/workshop) | every repo checked out side-by-side + the `bench` dev CLI | you're hacking on the family itself |

Your private machine config — identity, secrets, your app roster — lives at
`~/.config/nix` and is **yours**, never part of the rice.

## The three rooms, standalone

- **[pounce](/guides/pounce/)** installs from Homebrew (`brew install pounce`)
  with zero Nix. It's a general command palette; the rice just wires it up.
- **[nebelung](/reference/palette/)** is a plain colour system. Any tool —
  Ghostty, bat, lazygit, Slack, Zen — can consume its rendered themes without
  touching the rest.
- **[nebelhaus](/start/what-is-nebelhaus/)** is the whole system, but its
  modules (`den`, `hearth`, `prowl`, `sill`, `collar`, `pounce`) are exported
  individually so you can cherry-pick.

## How they feed each other

The repos form a chain of pinned flake inputs. Each link is a *flake input* —
a reference to an exact commit, recorded in the downstream repo's `flake.lock`:

![one colour change rippling down the chain: nebelung → pounce → nebelhaus → ~/.config/nix → your Mac, each lock pinning the exact commit of the one before](/media/ripple.webp)

The catch that surprises everyone: a flake input is **not** "whatever is on
GitHub right now" — it's a frozen commit hash. So pushing a change to `nebelung`
changes **nothing** downstream until each downstream `flake.lock` is bumped to
the new commit. That's what makes rebuilds reproducible, and it's why updating
is a deliberate `nix flake update`, not automatic.

As an end user you rarely feel this — `haus update` handles it. It matters if
you [contribute to the family](/internals/contributing/) or want to understand
[how the flakes fit together](/internals/flakes/).

## Built on

nebelhaus stands on the shoulders of excellent open-source projects:

- [Nix](https://nixos.org) & [nix-darwin](https://github.com/nix-darwin/nix-darwin) — reproducible system config
- [AeroSpace](https://github.com/nikitabobko/AeroSpace) — the tiling window manager
- [SketchyBar](https://github.com/FelixKratz/SketchyBar) — the status bar
- [Catppuccin](https://github.com/catppuccin) — the colour framework nebelung is derived from
- [Ghostty](https://ghostty.org), [zellij](https://zellij.dev), [yazi](https://yazi-rs.github.io), [helix](https://helix-editor.com), [starship](https://starship.rs) — the terminal stack

All of nebelhaus is MIT-licensed.
