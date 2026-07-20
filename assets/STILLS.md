# 📷 nebelhaus — stills capture guide

Shot-by-shot recipes for every still still-to-shoot in [`SHOTLIST.md`](./SHOTLIST.md) §1.
Each entry is **Stage** (what's on screen) → **Steps** (how to reach the frame) →
**View** (the exact crop/framing) → **Dest**. Ordered by *scene*, not asset number,
so you restage the machine as few times as possible (SHOTLIST §4 running order).

**Before the first shot, run the §0 machine-stage checklist** (wallpaper, mauve
accent `#c9a8f1`, clock 9:41, SF/Vancouver weather, default gaps 10/20, clean state).
Stills are shot at Ghostty **19px** (the 22px bump is video-only). No KeyCastr in
stills — that's a video thing. Export @2×, retina.

**Palette quick-ref:** `base #202020` · `text #d7d7d7` · `pink #f2c4e5` ·
`mauve #c9a8f1` · `peach #f5b58e` · `teal #9be0d5` · `green #abe1a6` ·
grey ramp `crust #121212 → text #d7d7d7`.

---

## S1 — hero (no shoot; placement only)

Already in the can at `nebelhaus/assets/hero.png`. The one open task is **dropping it
into the org README** (`.github` repo, in the "the house" section). That's a markdown
edit in the `.github` repo — not a capture. Nothing to stage.

---

## Scene 1 · Bar & tiling

Stage the desktop once: **4 windows tiled** (Zen browser, Ghostty, a notes app, a
chat app), default gaps, bar on top, mauve accent, clock at 9:41. Everything in this
scene is a crop or an overlay on that one arrangement.

### S2c — rice room (org trio)
- **Stage:** Clean **2-pane** tiling (Zen + Ghostty running fastfetch), bar on top.
  Simpler than S6 — this is the "calm room," not the "full grid."
- **Steps:** Tile the two panes evenly (⌥/ if needed to land on tiles, not accordion).
  Let the bar settle to normal state (no popover open).
- **View:** Full screen, top-left origin. Wallpaper margin visible around the floating
  panes. Bar fully in frame. Match S2a/S2b framing exactly (same wallpaper, same
  screen bounds) so the trio reads as one set.
- **Dest:** S2 three-rooms trio → org / landing.

### S3 — bar close-up, normal state
- **Stage:** Same tiled desktop; bar in resting state, no popover.
- **Steps:** Nothing to trigger — just a clean bar. Confirm the front-app pill shows a
  neutral app (Zen or Ghostty), weather shows the SF/Vancouver condition, clock 9:41.
- **View:** **Crop tight to the bar** — full width, bar height only. Every widget must
  be legible: left = workspace pills + glyphs, center = front-app pill, right = full
  cluster (media / weather / battery / clock). No window chrome below.
- **Dest:** Rice / landing.

### S4 — weather popover open
- **Stage:** Same bar.
- **Steps:** Click the **weather pill** → popover blooms. Wait for it to fully render
  (all rows populated — no "loading" state).
- **View:** Crop to **bar + popover** together (popover hangs below the pill). The
  popover is the hero: location, condition, current + hi/lo temps, sunrise/sunset,
  wind, humidity, UV, the hourly strip, and the 3-day forecast must all be present and
  sharp. Leave a little wallpaper margin around the popover.
- **Dest:** Rice / landing (V6 also uses this beat).

### S5 — Caps-Lock launch mode
- **Stage:** Same tiled desktop.
- **Steps:** **Tap ⇪ (Caps Lock)** to enter launch/hint mode, then **freeze** — do not
  press a letter yet.
- **View:** Full screen (so you can see hints across all panes) *or* crop to the bar if
  the letter-hints render in the bar — shoot both, pick later. Key visual: workspace
  pills have **hidden**, letter-hints have appeared, and the color legend reads
  correctly — **mauve = focused, green = running, grey = closed**. Make sure at least
  one of each color is on screen so the legend is self-evident.
- **Dest:** Rice / landing.

### S6 — full tiling grid
- **Stage:** Promote to the **4-window** arrangement: browser, terminal, notes, chat.
- **Steps:** Tile all four into an even 2×2 (⌥/ to force tiles if any landed as
  accordion/float). Equalize so gaps are uniform. Bar on top, resting state.
- **View:** Full screen, top-left origin. Even inner 10px / outer 20px gaps — the
  floating-pane look is the point, so the wallpaper gutters must be crisp and equal.
  Bar fully in frame. Each of the 4 windows showing real, neutral content (no personal
  filenames).
- **Dest:** Rice / landing.

---

## Scene 2 · Terminal (Ghostty / zellij foreground)

Bring Ghostty forward, zellij attached. This scene shares the terminal, so shoot the
accent strip and ports gallery before the Touch ID overlay changes state.

### S8 — accent cohesion strip
- **Stage:** **2×2 tile of four terminal tools**, all Nebelung-themed: Ghostty (shell
  prompt) · yazi (with a **glow** markdown preview open) · lazygit (mauve active
  borders) · fzf (a live fuzzy list).
- **Steps:** Open each in its own pane/window, get each into its "showing off the
  theme" state: yazi hovering a `.md` so glow renders; lazygit on a repo with a mauve
  active border; fzf mid-filter with the mauve pointer visible.
- **View:** 2×2 crop, even gaps. The **through-line is the palette** — the same mauve
  accent and grey ramp should visibly repeat across all four. Every pane's text legible.
- **Dest:** Rice / landing.

### S16 — ports gallery
- **Stage:** A grid of **6–8 themed tools**, each cropped small: Ghostty, btop,
  lazygit, bat, yazi, Zen, Helix, Slack.
- **Steps:** This is a **composite**, not one live frame — capture each tool
  individually in its themed state, then assemble the grid in post (or tile live if you
  can fit 8 legibly). Each cell should show the tool doing something recognizable
  (btop graphs, bat syntax, Helix a buffer, Slack the sidebar).
- **View:** Uniform small cells, consistent inner padding, tool identity obvious at a
  glance. The set should read as "one palette, many tools." Label optional.
- **Dest:** Nebelung / landing.

### S7 — Touch ID prompt
- **Stage:** A single **zellij pane**, Ghostty foreground.
- **Steps:** Type `sudo darwin-rebuild switch` and **↵**. The **Touch ID dialog floats
  up** over the multiplexer. Freeze the instant the dialog is fully drawn — before you
  touch the sensor.
- **View:** Full screen or a generous crop that keeps **both** the zellij pane (with the
  visible `sudo darwin-rebuild switch` command line) **and** the floating Touch ID
  dialog above it. The story is "Touch ID works *inside* zellij," so both layers must
  be in frame and sharp.
- **Dest:** Rice / landing (V8 is the motion version).

---

## Scene 3 · Pounce (palette work)

Foreground is the pounce palette via ⌘Space. All of these are the palette in different
states — shoot them back-to-back. Neutral clipboard, neutral app list (no personal
filenames).

### S9 — empty query (frecency)
- **Steps:** **⌘Space**, type **nothing**. The palette shows top apps/commands by
  frecency.
- **View:** Crop to the **palette window** only (drop the desktop). Header visible,
  magnifier glyph in the search field, rounded result rows. The frecency list should be
  neutral, recognizable apps — nothing personal.
- **Dest:** Pounce / landing.

### S10 — fuzzy match
- **Steps:** ⌘Space → type **`saf`**. Safari rises to the top with the fuzzy-match
  highlight.
- **View:** Palette crop. **Safari row selected at top**, the matched letters
  highlighted in **mauve**, and the **action bar** at the bottom showing `↵ Open` and
  `⌘↵ Reveal in Finder`. All three (query, highlighted result, action bar) in frame.
- **Dest:** Pounce / landing.

### S11 — emoji picker submenu
- **Steps:** Open the emoji picker command → the 9-column emoji grid appears. Arrow to
  select one cell.
- **View:** Palette crop showing the **9-column grid**, with **one cell clearly
  selected** (mauve selection ring/fill). Enough rows visible to read it as a grid, not
  a strip.
- **Dest:** Pounce / landing.

### S12 — clipboard history submenu
- **Steps:** Open the clipboard-history command → the two-pane view. Make sure the
  clipboard holds a few **neutral** recent copies (a URL, a short phrase, a hex color —
  nothing personal).
- **View:** The **820×480** two-pane layout: recent copies list on the **left**,
  preview of the selected entry on the **right**. Selected row highlighted; preview pane
  showing that entry's content.
- **Dest:** Pounce / landing.

### S13 — Force Quit (grouped)
- **Steps:** Open the Force Quit command → the grouped process list.
- **View:** Palette crop showing the **`Applications`** and **`Background`** section
  headers, each with process rows beneath. Both groups visible, at least a couple of
  rows each, so the grouping is obvious.
- **Dest:** Pounce / landing (V2 ends on this beat).

### S2a — pounce room (org trio)
- **Steps:** ⌘Space, **type a query** (e.g. `saf`), results showing — the palette
  looking alive and populated.
- **View:** Framed to **match S2b and S2c** — same wallpaper, same screen bounds. The
  palette open over the staged desktop (not cropped bare like S9–S13); this one is a
  *room*, so let the desktop breathe around the palette. Query typed, results visible.
- **Dest:** S2 three-rooms trio → org / landing.

---

## Scene 4 · Theme / palette (shoot last — rebuild changes the accent)

### S15 — palette swatch board
- **Note:** `nebelung/assets/palette.png` + `preview.png` largely cover this —
  **only reshoot if the pool needs a dedicated board.** If you do:
- **Steps:** Render/lay out all **26 colors**: the grey ramp as the top row
  (`crust #121212 → text #d7d7d7`), then the **14 muted accents** below.
- **View:** Each chip labeled with **name + hex**. Grey ramp visually continuous; accent
  chips in a tidy grid. High contrast, legible labels, even chip sizing.
- **Dest:** Nebelung / social pool.

### S2b — nebelung room (org trio)
- **Steps:** Either the **swatch render** or **three themed TUIs** side by side.
- **View:** Framed to **match S2a and S2c** — same wallpaper, same bounds. The Nebelung
  palette should be the unmistakable subject (swatch cascade or the three-TUI spread).
- **Dest:** S2 three-rooms trio → org / landing.

---

## The three-rooms trio (S2) — matched-set reminder

S2a, S2b, S2c are **one asset in three frames**. Shoot them (or crop them) to the
**exact same wallpaper, screen bounds, and margin** so they stack as a triptych:
- **S2a** pounce — palette open, query typed, results (Scene 3).
- **S2b** nebelung — swatch render or three themed TUIs (Scene 4).
- **S2c** rice — clean 2-pane tiling + bar (Scene 1).
Do the *framing* identically even though they're shot in different scenes.
