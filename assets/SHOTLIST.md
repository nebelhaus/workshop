# 🌫 nebelhaus — screenshot & video shot list

The capture plan for every README in the family (org, rice, pounce, nebelung)
and the upcoming landing page. Assets share a number — `S#` for screenshots,
`V#` for videos — so one recording serves several places. Tick the box when a
shot is in the can.

**Highest-leverage assets, shoot these first & best:**
- `S1` → `assets/hero.png` (used by BOTH the org profile and the rice README — currently placeholder)
- `V1` → pounce `assets/demo.gif` (currently placeholder)
- `S2` → the org profile's three-room trio (must match its Pounce/Nebelung/rice table)

---

## 0 · Stage the machine once (before any shot)

Consistency is what makes a rice read as *designed* instead of *dumped*. Lock
these in first:

- [ ] **Wallpaper** — flat/near-flat fog grey near `base #202020`, soft lighter fog gradient top-left. No busy photo.
- [ ] **Accent** — `mauve #c9a8f1` (the default) for everything EXCEPT the accent-swap video (V9).
- [ ] **Clock** — set the bar to read a clean time: **9:41** (Apple demo time) or **10:09**.
- [ ] **Weather** — pin a fog-appropriate city (San Francisco / Vancouver); the popover is a hero widget.
- [ ] **Record** on the built-in retina display, 60fps, export @2x.
- [ ] **KeyCastr** (or similar) bottom-center for ALL videos, badge themed dark grey — the hotkeys ARE the product.
- [ ] **Clean state** — fresh/clean git repos, neutral clipboard, no personal filenames, neutral browser tabs.
- [ ] **Gaps** — default inner `10px` / outer `20px`; the floating-pane look is a selling point.
- [ ] **Terminal font** — bump Ghostty 19 → ~22px for VIDEO only (README views on phones need it readable).

**Hero apps to keep tiled** (they show the theme instantly): **fastfetch**
(logo + specs in Nebelung colors), **lazygit** (mauve active borders), a **Zen
browser** window with the Nebelung userChrome.

**Palette quick-ref (real Nebelung hexes):**
`base #202020` · `text #d7d7d7` · signature `pink #f2c4e5` · `mauve #c9a8f1` ·
`peach #f5b58e` · `teal #9be0d5` · `green #abe1a6` · grey ramp `crust #121212 → text #d7d7d7`.

---

## 1 · Screenshots — exactly what to put on screen

### 🐙 Org front page (`.github`) & landing hero

- [ ] **S1 — THE HERO** (fills `assets/hero.png`; org + rice both point here). One 3–4 window tiling layout:
  - **Sill bar** on top: Apple logo, 3–4 workspace pills (one numbered, two app glyphs), lavender front-app pill; right cluster = weather, media, battery (green), wifi (teal), clock (pink) reading 9:41.
  - **Left column:** Ghostty→zellij running **fastfetch** above a small `lazygit` pane.
  - **Right column, top:** a **Zen browser** window themed in Nebelung.
  - **Center, floating:** **Pounce open**, a few results, one row selected (mauve highlight).
  - Fog-grey wallpaper through the gaps. *Shoot 5 content variations, pick the prettiest.*

- [ ] **S2 — The "three rooms" trio** (matches the org README table). Matched framing, same wallpaper:
  - [ ] **S2a Pounce** — palette open, query typed, app results listed.
  - [ ] **S2b Nebelung** — the swatch render (`palette.png`) OR three themed TUIs side by side.
  - [ ] **S2c rice** — clean 2-pane tiling shot with the bar.

### 🏠 nebelhaus (rice) README

- [ ] **S3 — Sill bar close-up, normal state.** Crop to the bar. Every widget clear: workspace pills w/ app glyphs, front-app pill, full right cluster.
- [ ] **S4 — Sill weather popover open.** Click weather → full popover (location, condition, temps, sun times, wind, humidity, UV, hourly + 3-day).
- [ ] **S5 — Caps-Lock launch mode.** Tap ⇪ and freeze: workspace pills hide, letter-hint bubbles appear — mauve = focused, green = running, grey = closed.
- [ ] **S6 — Full tiling grid.** 4 windows (browser, terminal, notes, chat), even gaps, bar on top. The "tiling Linux rig, native to the Mac" proof.
- [ ] **S7 — Touch ID prompt.** `sudo darwin-rebuild switch` in a zellij pane with the macOS Touch ID dialog floating over it. (Collar's whole pitch.)
- [ ] **S8 — Accent cohesion strip.** Ghostty + yazi (markdown preview via glow) + lazygit + fzf tiled 2×2, all Nebelung. "One palette, every app."

### 🐾 pounce README

- [ ] **S9 — Empty query (frecency).** ⌘Space, nothing typed → top apps/commands. Shows header ("Search apps & actions…"), magnifier icon, rounded rows.
- [ ] **S10 — Fuzzy match.** Type `saf` → Safari at top, mauve highlight, action bar showing `↵ Open` and `⌘↵ Reveal in Finder` pills.
- [ ] **S11 — Submenu: Emoji picker.** 9-column emoji grid, one cell selected.
- [ ] **S12 — Submenu: Clipboard history.** Two-pane 820×480 view — recent copies left, preview right.
- [ ] **S13 — Grouped output: Force Quit.** `Applications` / `Background` section headers with process rows.
- [ ] **S14 — Write-a-command.** Split: 5-line bash script in the editor (`# pounce: name = Say Hello`…) left, that command appearing in the palette right. "Every command is a file."

### 🌫 nebelung README

- [ ] **S15 — Palette swatch board.** All 26 colors: grey ramp (`crust #121212` → `text #d7d7d7`) as a row, 14 muted accents below, each chip labeled name + hex.
- [ ] **S16 — Ports gallery.** Grid of 6–8 themed tools (Ghostty, btop, lazygit, bat, yazi, Zen, Helix, Slack), each cropped small. "Whiskered to every app."
- [ ] **S17 — "Too loud vs. just right."** Side-by-side stock Catppuccin Mocha (left) vs Nebelung (right) on the same btop or code file.

---

## 2 · Videos — with pseudo-scripts

Each = single continuous take, **8–18s**, KeyCastr visible, 60fps then lightly
sped up (~1.1–1.2×). Short = few retakes.

- [ ] **V1 — "Summon, aim, pounce"** (Pounce hero, ~10s) → pounce `demo.gif`, landing
  ```
  0:00  Clean desktop, one tiled window.
  0:01  ⌘Space → palette springs in (frosted blur, centered).
  0:03  Type "saf" → Safari rises to top, mauve highlight snaps on.
  0:05  ↵ → Safari launches, palette dismisses.
  0:07  ⌘Space → type "emoji" → ↵ → grid swaps IN PLACE (no flash).
  0:09  Arrow to 🐾, ↵ → copies. End on palette fade-out.
  ```
  Retake tip: the in-place submenu swap (0:07) is the wow moment — window must NOT blink closed.

- [ ] **V2 — "Every command is a file"** (Pounce extensibility, ~12s) → pounce README, landing
  ```
  0:00  Editor with a 5-line bash script (# pounce: name = Say Hello).
  0:02  Save.
  0:03  ⌘Space → type "say" → the new command is right there.
  0:05  ↵ → notification "🐾 Pounce" fires.
  0:07  Cut: type "wifi" → ↵ → submenu lists networks (grouped).
  0:10  Type "force" → ↵ → Force Quit with Applications/Background sections.
  ```

- [ ] **V3 — "Tap to launch"** (Prowl launcher, ~9s) → rice, org, landing
  ```
  0:00  Desktop, bar visible, one workspace focused.
  0:01  Tap ⇪ → bar morphs: letter-hint bubbles appear.
  0:03  Press the browser's letter → it launches & tiles onto its workspace.
  0:05  Tap ⇪ again, press another letter → second app tiles in beside it.
  0:07  Windows settle into a clean split. End.
  ```
  The most "wait, how'd he do that" clip for Mac users. Front-load it.

- [ ] **V4 — "Move it with your mind"** (Prowl tiling, ~14s) → rice, landing
  ```
  0:00  Three tiled windows.
  0:02  ⌥h / ⌥l → focus ring jumps between panes.
  0:05  ⌥⌘⌃⇧ + arrows → active window moves across the grid.
  0:08  ⌥/ → layout flips tiles↔accordion, windows reflow.
  0:10  ⌥f → fullscreen; ⌥f → back.
  0:12  ⌥1 → ⌥2 → workspace switch, bar pill highlight follows.
  ```
  Retake tip: rehearse the sequence — pianist, not typist.

- [ ] **V5 — "Resize without re-reaching"** (Prowl micro-delight, ~7s) → rice
  ```
  0:00  Two panes.
  0:01  Tap ⇪, tap - , then - - - - (just minus, no re-tapping Caps).
  0:04  Window shrinks a notch per keystroke.
  0:06  ⎋ to exit. End.
  ```
  Great as a silent looping GIF.

- [ ] **V6 — "The bar that watches"** (Sill, ~12s) → rice, landing
  ```
  0:00  Bar close-up.
  0:02  Click a workspace pill → jump; highlight underline slides over.
  0:04  Click weather → popover blooms open (full forecast).
  0:07  Close it; media pill scrolls a track title.
  0:09  Tap ⇪ → whole bar flips into launcher letter-mode, then ⎋ back.
  ```

- [ ] **V7 — "One palette, every tool"** (Hearth/Nebelung terminal tour, ~16s) → nebelung, rice, landing
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

- [ ] **V8 — "Touch to sudo"** (Collar, ~8s) → rice
  ```
  0:00  Zellij pane.
  0:02  Type `sudo darwin-rebuild switch`, ↵.
  0:04  Touch ID dialog floats up over the multiplexer.
  0:05  Touch the sensor.
  0:06  Auth clears, command runs — no password typed. End.
  ```
  README caption: "yes, Touch ID works *inside* zellij."

- [ ] **V9 — "Change one word, repaint everything"** (Nebelung accent swap, ~14s) → nebelung, landing
  ```
  0:00  Editor: nebelhaus.theme.accent = "mauve"; three tools tiled (starship, fzf, lazygit).
  0:03  Change "mauve" → "sapphire". Save.
  0:05  ./haus try switch  (fast-forward the build in the edit).
  0:10  Cut back: starship prompt, fzf prompt, lazygit borders all now sapphire.
  0:13  End on the swatch board tinting.
  ```

- [ ] **V10 — "Wipe and it stands again"** (reproducibility, ~10s, optional) → org, landing
  ```
  0:00  Terminal: `./haus status` (clean).
  0:02  `./haus rebuild` → build streams, then "switch".
  0:07  Desktop re-activates: bar reloads, windows re-sort to workspaces.
  0:09  End on the tidy desktop.
  ```
  "One Nix flake raises the whole house." Conceptual, so optional.

---

## 3 · Placement matrix

| Asset | org | rice | pounce | nebelung | landing |
|---|:--:|:--:|:--:|:--:|:--:|
| **S1 hero** | ● hero.png | ● hero.png | | | ● |
| S2 three-rooms trio | ● | | | | ● |
| S3 bar close-up | | ● | | | |
| S4 weather popover | | ● | | | ● |
| S5 launch-mode frame | ● | ● | | | |
| S6 tiling grid | | ● | | | ● |
| S7 Touch ID still | | ● | | | |
| S8 accent cohesion | | ● | | ● | |
| S9–S14 pounce shots | | | ● | | ● (pick 2) |
| S15 swatch board | | | | ● | ● |
| S16 ports gallery | | | | ● | |
| S17 loud-vs-right | | | | ● | ● |
| **V1 pounce hero** | | | ● demo.gif | | ● |
| V2 command-is-a-file | | | ● | | ● |
| V3 tap-to-launch | ● | ● | | | ● |
| V4 tiling | | ● | | | ● |
| V5 resize delight | | ● | | | |
| V6 sill bar | | ● | | | ● |
| V7 terminal tour | | ● | | ● | ● |
| V8 Touch ID | | ● | | | |
| V9 accent swap | | | | ● | ● |
| V10 reproducibility | ● | | | | ● |

**Landing loop reel:** stitch V3 → V4 → V1 → V6 → V7 (muted, ~60s) as a
background hero video; use S1 as the static poster frame.

---

## 4 · Capture-day running order (fewest setup changes)

Shoot by *scene setup*, not destination. Do all **stills** in a scene before
the **video** in that scene (video leaves windows in a changed state).

1. **Bar & tiling block** (windows tiled): S1, S3, S4, S5, S6, S2c → V3, V4, V5, V6.
2. **Terminal block** (Ghostty/zellij foreground): S8, S16 → V7, V8, V10.
3. **Pounce block** (palette work): S9–S14, S2a → V1, V2.
4. **Theme/palette block** (do last — the rebuild changes the accent): S15, S17, S2b → V9.
</content>
</invoke>
