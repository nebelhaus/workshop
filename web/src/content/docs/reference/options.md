---
title: nebelhaus.* options
description: Every option you can set in your host file — types, defaults, and what each one changes.
---

These are the `nebelhaus.*` options you set in your host file at
`~/.config/nix/hosts/<hostname>/default.nix`. They're defined in the rice's
`modules/options.nix`. Everything here is optional unless noted; the defaults
are a complete, working system.

Apply changes with `haus rebuild`.

## nebelhaus.git

Your commit identity. Host-only — never edited into the rice.

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.git.name` | `str` | `""` | Git `user.name` for commits. |
| `nebelhaus.git.email` | `str` | `""` | Git `user.email` for commits. |
| `nebelhaus.git.signingKey` | `str` | `""` | GPG key id for signing commits/tags. Empty disables signing. Key material lives outside Nix (`gpg-agent` + `pinentry-mac`). |

```nix
nebelhaus.git.name = "Ada Lovelace";
nebelhaus.git.email = "ada@example.com";
nebelhaus.git.signingKey = "6F7BD6F43A7C1420";
```

## nebelhaus.theme

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.theme.accent` | enum | `"mauve"` | Accent hue. One of `rosewater`, `flamingo`, `pink`, `mauve`, `red`, `maroon`, `peach`, `yellow`, `green`, `teal`, `sky`, `sapphire`, `blue`, `lavender`. Re-tints lazygit, fzf, yazi, and the Zen browser; the neutral greys stay fixed. |

See [Theming & accents](/guides/theming/) and the [palette](/reference/palette/).

## nebelhaus.hearth

The shell and terminal layer. See [The shell](/guides/the-shell/).

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.hearth.editor` | `str` | `"hx"` | The one editor the rice uses everywhere: `$EDITOR` / `$VISUAL` **and** what every "open in an editor" action launches (the "Nix Config" palette command, the bar's nix-open item, the file-association hijack) — opened in a new zellij tab. A terminal editor is recommended; a GUI editor's CLI works too (e.g. `"code"` or `"code -w"` to block). |
| `nebelhaus.hearth.newTabDirs` | `listOf str` | `[]` | Home-relative directories offered by the `Super ⇧T` yazi picker. Empty browses all of `$HOME`. |
| `nebelhaus.hearth.hijackFileAssociations` | `bool` | `false` | When `true`, makes `hearth.editor` the default opener for `.json`/`.md`/`.ts`/`.nix`/… via `duti`. Opt-in; changes double-click behaviour. |

```nix
nebelhaus.hearth.editor = "nvim";
nebelhaus.hearth.newTabDirs = [ "code" ".config" ];
```

## nebelhaus.prowl

Tiling and the Caps-Lock launcher. See [Window management](/guides/window-management/).

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.prowl.enable` | `bool` | `true` | Toggle AeroSpace tiling, the Caps-Lock launcher, and window-management keybinds. |
| `nebelhaus.prowl.apps` | `listOf submodule` | terminal + browser | The single source of truth for the launcher letters, workspace assignment, and bar pills. |

Each entry in `nebelhaus.prowl.apps` is a submodule:

| Field | Type | Description |
|---|---|---|
| `key` | `str` | Leader letter (unique across the roster). |
| `name` | `str` | macOS app name (used by `open -a`). |
| `workspace` | `str` / `null` | AeroSpace workspace letter; `null` = launcher-only. |
| `appId` | `str` / `null` | Bundle id for auto-assigning windows. `null` skips it. Find with `osascript -e 'id of app "…"'`. |
| `barIcon` | `str` / `null` | SketchyBar app-font ligature (e.g. `:slack:`); `null` uses the workspace letter. |
| `label` | `str` / `null` | Cheatsheet caption; `null` uses `name`. |
| `cask` | `str` / `null` | Homebrew cask to install; `null` if already installed. |

```nix
nebelhaus.prowl.apps = [
  { key = "s"; name = "Slack"; workspace = "S";
    appId = "com.tinyspeck.slackmacgap"; barIcon = ":slack:";
    label = "Slack"; cask = "slack"; }
];
```

## nebelhaus.sill

The status bar. See [The bar](/guides/the-bar/).

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.sill.enable` | `bool` | `true` | Toggle SketchyBar. When on, the native macOS menu bar is hidden. |
| `nebelhaus.sill.plugins` | `listOf enum` | `[]` | Opt-in personal bar items: `"elgato"` (toggle an Elgato Key Light) and `"harvest"` (Harvest time tracker). Both read `~/.config/sketchybar/harvest_secrets.sh`, which you provide. |

## nebelhaus.pounce

The command palette. See [Pounce](/guides/pounce/) and its [config reference](/reference/pounce/).

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.pounce.enable` | `bool` | `true` | Toggle the Pounce daemon, the ⌘Space palette, and its Accessibility features. |
| `nebelhaus.pounce.signingIdentity` | `str` | `""` | SHA-1 of an Apple Development code-signing identity. The daemon is re-signed with it so the Accessibility grant survives rebuilds. Find with `security find-identity -v -p codesigning`. Empty runs unsigned (palette works; auto-paste off). |

## nebelhaus.homebrew

Homebrew *policy* — not the casks/brews themselves (those go in `homebrew.casks`
/ `homebrew.brews`).

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.homebrew.cleanup` | enum | `"none"` | How `switch` treats undeclared Homebrew packages: `"none"` (leave alone — the rice never deletes your apps), `"uninstall"` (remove, keep data), `"zap"` (remove + data). |
| `nebelhaus.homebrew.autoUpdate` | `bool` | `false` | Run `brew update` before every activation. Off for reproducibility. |
| `nebelhaus.homebrew.upgrade` | `bool` | `false` | Upgrade outdated packages on every rebuild. Off for reproducibility. |

## nebelhaus.claude

| Option | Type | Default | Description |
|---|---|---|---|
| `nebelhaus.claude.globalMd` | `lines` | `""` | Contents of `~/.claude/CLAUDE.md` (cross-project context for Claude Code). The rice ships no opinion; leave empty to manage by hand. |

## A complete example host file

```nix
{ pkgs, ... }:
{
  # Identity
  nebelhaus.git.name = "Ada Lovelace";
  nebelhaus.git.email = "ada@example.com";
  nebelhaus.git.signingKey = "";
  nebelhaus.pounce.signingIdentity = "";

  # Preferences
  nebelhaus.theme.accent = "sapphire";
  nebelhaus.hearth.editor = "nvim";
  nebelhaus.hearth.newTabDirs = [ "code" ".config" ];

  # Your app roster (merged with the rice defaults)
  nebelhaus.prowl.apps = [
    { key = "s"; name = "Slack"; workspace = "S";
      appId = "com.tinyspeck.slackmacgap"; barIcon = ":slack:"; cask = "slack"; }
  ];

  # Extra apps with no launcher key
  homebrew.casks = [ "discord" ];

  # Your own packages
  home-manager.users.ada.home.packages = with pkgs; [ ripgrep ];
}
```

For how these fit into the flake, see [How the flakes fit together](/internals/flakes/).
