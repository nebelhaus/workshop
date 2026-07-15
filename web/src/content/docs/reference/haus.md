---
title: The haus CLI
description: The end-user haus command — rebuild, update, rollback, and diagnose your machine.
---

`haus` is the command that drives your machine after install. It wraps the Nix
and `darwin-rebuild` invocations you'd otherwise type by hand, with safe
defaults (it always builds before switching). It lands on your `PATH` after the
first `switch`.

For the day-to-day workflow, see [Keeping in sync](/guides/staying-in-sync/).

## Commands

| Command | What it does |
|---|---|
| `haus rebuild` | Build, then `darwin-rebuild switch`. Your everyday apply. A failed build never touches the running system. |
| `haus update` | Update the `nebelhaus` pin in `~/.config/nix/flake.lock`, then rebuild — pulls new rice versions. |
| `haus rollback [N]` | Atomically return to the previous generation — or to generation `N`. |
| `haus generations` | List the generations you can roll back to. |
| `haus status` | Show the current generation and how stale the pinned rice is. |
| `haus edit` | Open your host file (`~/.config/nix/hosts/<hostname>/default.nix`) in `$EDITOR`. |
| `haus doctor` | Health check: Determinate Nix, Xcode CLT, and the GUI login agents. |
| `haus btm` | On macOS 26 Tahoe+, check whether Background Task Management is blocking the nix login agents, and print the one-time fix. A no-op on earlier macOS. See [Troubleshooting](/reference/troubleshooting/#after-a-macos-upgrade-all-my-agents-are-dead-macos-26-tahoe). |

## Typical sessions

**Change a setting and apply it:**

```sh
haus edit        # tweak your host file
haus rebuild
```

**Pull the latest rice:**

```sh
haus update      # bumps the pin and rebuilds
```

**Recover from a bad change:**

```sh
haus rollback    # back to the previous generation
haus doctor      # if something still looks off
```

## The contributor's counterpart: `bench`

Hacking on the nebelhaus family itself? The [workshop repo](/internals/contributing/)
ships a separate CLI called **`bench`** — with commands like `try`, `ship`, and
`release` for moving changes between the family's repos. It's for contributors and
lives in the workshop checkout. As an end user, the `haus` on your `PATH` (the one
documented here) is all you need.
