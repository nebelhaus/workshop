# 🌫 nebelhaus — screenshot & video shot list

The capture plan for the family READMEs (org, rice, pounce, nebelung), the docs
site, and the landing page. Assets share a number — `S#` stills, `V#` videos,
`M#` rendered motion loops — so one recording can serve several places.

## ✅ In the can

Everything the READMEs actually need is shot. READMEs stay lean (1–2 assets
each); the rest of the menu is for the landing page + social pool.

| Asset | File | Where |
|---|---|---|
| **S1** hero | `nebelhaus/assets/hero.png` | rice README ✅ · **org README still TODO** ("the house") |
| **V1** pounce demo | `pounce/assets/demo.webp` | pounce README |
| **V3** tap-to-launch | `nebelhaus/assets/tap-to-launch.webp` | rice README |
| **S14** command-is-a-file | `pounce/assets/command-is-a-file.webp` | pounce README |
| **S17** loud-vs-right | `nebelung/assets/loud-vs-right.webp` | nebelung README |
| swatch cascade (hero) | `nebelung/assets/swatch-cascade.webp` | nebelung README |
| preview / palette render | `nebelung/assets/preview.png` · `palette.png` | nebelung README |
| **M1** ripple | `assets/ripple.webp` · `web/public/media/ripple.webp` | workshop README · docs |
| **M2** theming | `web/public/media/theming.webp` | docs — **stand-in, retire when V9 lands** |
| **M3** tap ⇪ | `web/public/media/tap-caps.webp` | docs |
| **S18** OG card | `web/public/social/og.png` | nebelhaus.com social card |
| **S19** pounce launch card | `assets/pounce-launch-card.png` | social pool (post by hand) |
| **S20** nebelung palette square | `assets/nebelung-palette-square.png` | social pool (post by hand) |

**Shelved:** **M4** fog banner (`assets/fog-banner.png`) — the still adds nothing
over the current banners; an animated retry only if the alpha survives on GitHub's
dark bg (WebP, ≤~1.5 MB, barely moving).

## 🎯 Still to shoot

The one README gap is **S1 into the org README**. Everything else below feeds the
**landing page + social pool** — a menu, not a backlog. Videos are the priority.

- **Videos:** V2, V4, V5, V6, V7, V8, V9, V10 (scripts in §2).
- **Stills:** ✅ all shot — S2–S13, S16 in [`assets/stills/`](./stills/).
  S15 skipped (`palette.png`/`preview.png` cover it).

**Composites built** (in `assets/stills/`): `S2-trio.png` (S2a pounce · S2b
nebelung · S2c rice, matched side-by-side) and `S16-gallery.png` (fastfetch ·
lazygit · bat · yazi · Zen · Helix, 3×2, menu bar + keycast footer cropped).
The rest (S3–S13) stand alone. **Left to do:** place them in the proper repos /
landing pool; once placed, the raw `S*` frames can be retired.

---

## 0 · Stage the machine once (before any shot)

Consistency is what makes a rice read as *designed*, not *dumped*. Lock in first:

- [ ] **Wallpaper** — flat/near-flat fog grey near `base #202020`, soft lighter gradient top-left. No busy photo.
- [ ] **Accent** — `mauve #c9a8f1` (the default) everywhere EXCEPT the accent-swap video (V9).
- [ ] **Clock** — a clean time: **9:41** (Apple demo time) or **10:09**.
- [ ] **Weather** — a fog-appropriate city (San Francisco / Vancouver); the popover is a hero widget.
- [ ] **Record** on the built-in retina display, 60fps, export @2x.
- [ ] **KeyCastr** bottom-center for ALL videos, badge themed dark grey — the hotkeys ARE the product.
- [ ] **Clean state** — fresh git repos, neutral clipboard, no personal filenames, neutral browser tabs.
- [ ] **Gaps** — default inner `10px` / outer `20px`; the floating-pane look sells it.
- [ ] **Terminal font** — bump Ghostty 19 → ~22px for VIDEO only (phones need it readable).

**Hero apps to keep tiled:** **fastfetch** (logo + specs in Nebelung colors),
**lazygit** (mauve active borders), a **Zen browser** with the Nebelung userChrome.

**Palette quick-ref (real Nebelung hexes):**
`base #202020` · `text #d7d7d7` · signature `pink #f2c4e5` · `mauve #c9a8f1` ·
`peach #f5b58e` · `teal #9be0d5` · `green #abe1a6` · grey ramp `crust #121212 → text #d7d7d7`.

---

## 1 · Screenshots still to shoot (landing + social pool)

**Org / hero**
- [ ] **S2 — three-rooms trio** (matched framing, same wallpaper): **S2a** pounce (palette open, query typed, results) · **S2b** nebelung (swatch render or three themed TUIs) · **S2c** rice (clean 2-pane tiling + bar).

**Rice**
- [ ] **S3 — bar close-up, normal state.** Crop to the bar; every widget clear (workspace pills + glyphs, front-app pill, full right cluster).
- [ ] **S4 — weather popover open.** Full popover: location, condition, temps, sun times, wind, humidity, UV, hourly + 3-day.
- [ ] **S5 — Caps-Lock launch mode.** Tap ⇪ and freeze: pills hide, letter-hints appear — mauve = focused, green = running, grey = closed.
- [ ] **S6 — full tiling grid.** 4 windows (browser, terminal, notes, chat), even gaps, bar on top.
- [ ] **S7 — Touch ID prompt.** `sudo darwin-rebuild switch` in a zellij pane with the Touch ID dialog floating over it.
- [ ] **S8 — accent cohesion strip.** Ghostty + yazi (glow md preview) + lazygit + fzf tiled 2×2, all Nebelung.

**Pounce**
- [ ] **S9 — empty query (frecency).** ⌘Space, nothing typed → top apps/commands; header, magnifier, rounded rows.
- [ ] **S10 — fuzzy match.** Type `saf` → Safari top, mauve highlight, action bar (`↵ Open`, `⌘↵ Reveal in Finder`).
- [ ] **S11 — emoji picker submenu.** 9-column grid, one cell selected.
- [ ] **S12 — clipboard history submenu.** Two-pane 820×480 — recent copies left, preview right.
- [ ] **S13 — Force Quit (grouped).** `Applications` / `Background` headers with process rows.

**Nebelung**
- [ ] **S15 — palette swatch board.** All 26 colors: grey ramp row + 14 muted accents below, each chip labeled name + hex. *(`palette.png`/`preview.png` largely cover this — reshoot only if the pool needs a dedicated board.)*
- [ ] **S16 — ports gallery.** Grid of 6–8 themed tools (Ghostty, btop, lazygit, bat, yazi, Zen, Helix, Slack), each cropped small.

---

## 2 · Videos to shoot — pseudo-scripts

Each = single continuous take, **8–18s**, KeyCastr visible, 60fps then lightly
sped up (~1.1–1.2×). Short = few retakes. *(V1 and V3 are shot — see §In the can.)*

- [ ] **V2 — "Every command is a file"** (Pounce, ~12s) → landing
  ```
  0:00  Editor with a 5-line bash script (# pounce: name = Say Hello).
  0:02  Save.
  0:03  ⌘Space → type "say" → the new command is right there.
  0:05  ↵ → notification "🐾 Pounce" fires.
  0:07  Cut: type "wifi" → ↵ → submenu lists networks (grouped).
  0:10  Type "force" → ↵ → Force Quit with Applications/Background sections.
  ```

- [ ] **V4 — "Move it with your mind"** (Prowl tiling, ~14s) → landing
  ```
  0:00  Three tiled windows.
  0:02  ⌥h / ⌥l → focus ring jumps between panes.
  0:05  ⌥⌘⌃⇧ + arrows → active window moves across the grid.
  0:08  ⌥/ → layout flips tiles↔accordion, windows reflow.
  0:10  ⌥f → fullscreen; ⌥f → back.
  0:12  ⌥1 → ⌥2 → workspace switch, bar pill highlight follows.
  ```
  Rehearse the sequence — pianist, not typist.

- [ ] **V5 — "Resize without re-reaching"** (Prowl, ~7s) → landing
  ```
  0:00  Two panes.
  0:01  Tap ⇪, tap - , then - - - - (just minus, no re-tapping Caps).
  0:04  Window shrinks a notch per keystroke.
  0:06  ⎋ to exit. End.
  ```
  Great as a silent looping GIF.

- [ ] **V6 — "The bar that watches"** (Sill, ~12s) → landing
  ```
  0:00  Bar close-up.
  0:02  Click a workspace pill → jump; highlight underline slides over.
  0:04  Click weather → popover blooms open (full forecast).
  0:07  Close it; media pill scrolls a track title.
  0:09  Tap ⇪ → whole bar flips into launcher letter-mode, then ⎋ back.
  ```

- [ ] **V7 — "One palette, every tool"** (Hearth terminal tour, ~16s) → landing
  ```
  0:00  Open Ghostty → auto-attaches to zellij (spiral layout + status bar).
  0:02  Super+t → new tab at $HOME (home.kdl layout).
  0:04  Super+y → yazi peek floats in; arrow onto a .md → glow preview (themed).
  0:07  Arrow onto a .rs → bat syntax preview. ⎋ closes it.
  0:10  `lg` → lazygit, mauve active borders.
  0:12  `git diff` → delta themed, syntax-highlit diff.
  0:14  Starship prompt: clean = lavender branch. End on fastfetch.
  ```
  The "cozy terminal" money video. Longest — keep the moves crisp.

- [ ] **V8 — "Touch to sudo"** (Collar, ~8s) → landing
  ```
  0:00  Zellij pane.
  0:02  Type `sudo darwin-rebuild switch`, ↵.
  0:04  Touch ID dialog floats up over the multiplexer.
  0:05  Touch the sensor.
  0:06  Auth clears, command runs — no password typed. End.
  ```
  Caption: "yes, Touch ID works *inside* zellij."

- [ ] **V9 — "Change one word, repaint everything"** (Nebelung accent swap, ~14s) → landing. *Retires the M2 `theming.webp` stand-in.*
  ```
  0:00  Editor: nebelhaus.theme.accent = "mauve"; three tools tiled (starship, fzf, lazygit).
  0:03  Change "mauve" → "sapphire". Save.
  0:05  ./bench try switch  (fast-forward the build in the edit).
  0:10  Cut back: starship prompt, fzf prompt, lazygit borders all now sapphire.
  0:13  End on the swatch board tinting.
  ```

- [ ] **V10 — "Wipe and it stands again"** (reproducibility, ~10s, optional) → landing
  ```
  0:00  Terminal: `./bench status` (clean).
  0:02  `./bench rebuild` → build streams, then "switch".
  0:07  Desktop re-activates: bar reloads, windows re-sort to workspaces.
  0:09  End on the tidy desktop.
  ```
  "One Nix flake raises the whole house." Conceptual, so optional.

---

## 3 · Placement

**READMEs (lean — the whole list, all shot except the org gap):**

| README | Assets |
|---|---|
| 🐙 org (.github) | banner (have it) · **S1** in "the house" — **TODO** |
| 🏠 rice | **S1** hero · **V3** tap-to-launch |
| 🐾 pounce | **V1** `demo.webp` · **S14** command-is-a-file |
| 🌫 nebelung | swatch-cascade (hero) · `preview.png` · **S17** loud-vs-right |

**Landing page + social pool (everything else):**
- **Reel:** stitch V3 → V4 → V1 → V6 → V7 (muted, ~60s) as a background hero; **S1** as the poster frame.
- **Feature stills:** S2–S13, S15, S16.
- **Standalone clips:** V2, V5, V8, V9, V10.

None of the pool items are obligations — pull from them as the landing page takes shape.

---

## 4 · Capture-day running order (fewest setup changes)

Shoot by *scene*, not destination. Do all **stills** in a scene before the
**video** (video leaves windows in a changed state).

1. **Bar & tiling** (windows tiled): S2c, S3, S4, S5, S6 → V4, V5, V6.
2. **Terminal** (Ghostty/zellij foreground): S8, S16 → V7, V8, V10.
3. **Pounce** (palette work): S9–S13, S2a → V2.
4. **Theme/palette** (last — the rebuild changes the accent): S15, S2b → V9.
</content>
</invoke>
