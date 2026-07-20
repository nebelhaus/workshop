---
title: Keybindings cheatsheet
description: Every default shortcut across tiling, the launcher, the terminal, and Pounce — in one place.
---

Every default binding in nebelhaus, grouped by where it lives. The same list is
available live in-system: tap **⇪** then **/** to open Pounce's cheatsheet,
generated from your actual app roster.

Notation: `⌥` Option/Alt · `⌘` Command · `⌃` Control · `⇧` Shift · `⇪` Caps-Lock.

## Tiling — main mode (prowl)

| Keys | Action |
|---|---|
| `⌥H` `⌥J` `⌥K` `⌥L` | Focus left / down / up / right (Vim-style twin of ⇪ + arrows) |
| `⌥/` | Tiles layout (toggles horizontal ↔ vertical split) |
| `⌥,` | Accordion layout (toggles horizontal ↔ vertical) |
| `⌥F` | Toggle fullscreen |
| `⌥⇧1`–`⌥⇧4` | Move window to workspace 1–4 |
| `⌥⇧<app-key>` | Throw window to that app's workspace |
| `⌥Tab` | Previous workspace (back-and-forth) |
| `⌥⇧Tab` | Move workspace to next monitor |
| `⌥⇧;` | Enter service mode |
| `⌥⇧R` | Re-sort windows (wake recovery) |
| `⌘Space` | Open Pounce |

## Launch mode — tap ⇪ (prowl)

| Keys | Action |
|---|---|
| `<app-key>` | Launch / focus that app (`T` terminal, `B` browser by default) |
| `1`–`4` | Focus workspace 1–4 |
| `←↓↑→` | Focus tiled window; drops into **navigate mode** (arrows repeat, `⇧`+arrow *moves* the window, `Esc`/`Return` exits) |
| `-` / `=` | Enter resize mode (shrink / grow) |
| `V` | Clipboard history (Pounce) |
| `E` | Emoji picker (Pounce) |
| `Z` | Reopen the last closed app (the ⌘⇧T analog) |
| `,` | Open macOS System Settings (mirrors the ⌘, convention) |
| `/` | Show the cheatsheet |
| `Esc` | Exit launch mode |

## Service mode — ⌥⇧; (prowl)

| Keys | Action |
|---|---|
| `R` | Flatten the workspace tree |
| `F` | Toggle floating ↔ tiling |
| `Backspace` | Close all windows except current |
| `⌥⇧H/J/K/L` | Join with the neighbour |
| `↑` / `↓` | Volume up / down |
| `⇧↓` | Mute |
| `Esc` | Reload config and exit |

## Terminal — zellij (hearth)

| Keys | Action |
|---|---|
| `Super P` | New pane (inherits cwd; hops to the main checkout inside a worktree) |
| `Super ⇧P` | New pane, stay here (inherits cwd, no worktree hop) |
| `Super T` | New tab (inherits cwd; same worktree hop as `Super P`) |
| `Super ⇧T` | New tab at `$HOME` |
| `Super Y` | yazi peek (floating previews; `Enter` on a dir opens a new tab there) |
| `Super ⇧Y` | yazi jump (browse, then shell in that dir) |
| `Ctrl Tab` / `Ctrl ⇧Tab` | Tab history back / forward (most-recently-used, browser-style) |
| `Alt <` / `Alt >` | Cycle swap layouts (grid → spiral → columns) |
| `Super C` | Spawn an isolated Claude agent (own worktree) |
| `Ctrl ⌥⇧C` | Spawn a resident Claude agent (this checkout) |

Option-click a file path in the terminal to open a new tab `cd`'d there.

## Pounce — ⌘Space

| Keys | Action |
|---|---|
| type | Fuzzy-search |
| `↑` / `↓` | Move selection |
| `Return` | Default action |
| `⌘Return` | Modifier action (e.g. Reveal in Finder) |
| `⌥Return` / `⌃Return` | Alternate actions (when shown) |
| `⌥Return` *(Find Files)* | Copy the path |
| `Tab` | Cycle sections / emoji categories |
| `Esc` | Dismiss |

## Ghostty note

Ghostty deliberately **unbinds** `⌘T`, `⌘P`, `⌘Y`, `⌘⇧Y`, `⌘⇧T`, and `⌘C` so
zellij owns them — the same keys work whether or not you're multiplexed.
`Ctrl-Tab` is forwarded to zellij via the kitty keyboard protocol.
