# 🌫 nebelhaus — screenshot & video shot list

The capture plan for every README in the family (org, rice, pounce, nebelung)
and the upcoming landing page. Assets share a number — `S#` for screenshots,
`V#` for videos — so one recording serves several places. Tick the box when a
shot is in the can.

**Highest-leverage assets, shoot these first & best:**
- `S1` → `assets/hero.png` (the rice README hero + the org page's "the house" section — currently placeholder)
- `V1` → pounce `assets/demo.webp` (✅ shot)

## README media budget (keep it lean)

READMEs get **1–2 assets each, 4 absolute max**. A wall of gifs reads as noise;
one perfect hero reads as designed. The full S#/V# catalog below is the
*shooting menu* — you shoot from it, but only these few land in a README. The
rest go to the **landing page + social pool**.

| README | What actually goes in it |
|---|---|
| 🐙 **org (.github)** | the **banner** (already there) + **S1** desktop, once shot, in "the house" section. Nothing else. |
| 🏠 **rice (nebelhaus)** | **S1** hero image + **V3** "tap to launch" clip (`tap-to-launch.webp`, ✅ in). That's the whole pitch. |
| 🐾 **pounce** | **V1** `demo.webp` (the hero, ✅ in) + **S14** "every command is a file". |
| 🌫 **nebelung** | `swatch-cascade.webp` (animated accent-ramp hero) + `preview.png` + **S17** `loud-vs-right.webp` (bat A/B). (`particle-field.webp` — the planned animated hero — is not shot yet; reserved for the landing page.) |

Everything else (S2–S13, S15–S16, V2, V4–V10) is for the landing page and
social — do not scatter it across the READMEs. (S15 was a nebelung README
still; now that the animated WebP supersedes it, it drops to the pool. **S17**
was pooled too, but earned its way back into the README as the "blue stripped
out" proof shot — a bat A/B of the same file, upstream Mocha vs Nebelung.)

**Motion pieces already in hand** (1280×720 mp4s, exported → animated WebP via
`nix run nixpkgs#ffmpeg`):
- `1a Swatch Cascade` → `nebelung/assets/swatch-cascade.webp` — in the README.
- `1b Type Wash` — accent name + hex, cycling every accent. **Reserved for the
  landing page** (it's the animated palette reference).
- `1c Particle Field` → planned `nebelung/assets/particle-field.webp` — **not shot
  yet**; intended as the landing-page hero (the README hero is `swatch-cascade.webp`).

## Audit additions — `M#` motion renders + `S18–S20` cards

The media/animation audit added a rendered (not screen-captured) series: `M#`
for designed motion loops, `S18+` continuing the stills numbering. M1–M3 are
now the real animated loops — alpha-surviving animated WebP, infinite loop —
swapped in 2026-07-13 over the static posters that had held their spots.

| ID | What | Size | Placed (animated WebP) |
|---|---|---|---|
| **M1 — the ripple** | the pin chain as a diagram, 14s loop | 900×276, 2.0 MB | `assets/ripple.webp` → workshop README · `web/public/media/ripple.webp` → `/internals/flakes/` + `/start/the-family/` (replaced the ASCII chain) |
| **M2 — change one word** | accent swap in one loop, 12s | 900×450, 1.9 MB | `web/public/media/theming.webp` → `/guides/theming/` header. **Stand-in: retire when the real V9 capture is shot.** |
| **M3 — tap ⇪** | ⇪ → letter hints → green flash → new pill, 9s loop | 900×218, 328 KB | `web/public/media/tap-caps.webp` → `/guides/window-management/` + `/guides/the-bar/`. V3 stays the rice README's real-capture proof. |
| **M4 — fog banner** | barely-moving drift | 1040×260 static | `assets/fog-banner.png` (static frame), **shelved**. An animated APNG export (900×225, 932 KB) was tried in the org + rice READMEs 2026-07-13 and reverted: its rounded corners rendered opaque black on GitHub's dark background instead of transparent. The static banners stay. Retry only with an export whose alpha survives (e.g. animated WebP, per the original brief) — the ≤ ~1.5 MB / barely-moving gate still applies. |
| **S18 — OG card** | nebelhaus.com social card | 1200×630 | `web/public/social/og.png` ✅ live |
| **S19 — pounce launch card** | X / Mastodon / Reddit, brew release announcement | 1600×900 | `assets/pounce-launch-card.png` — **social pool, post by hand** |
| **S20 — nebelung palette square** | Mastodon / community posts | 1080×1080 | `assets/nebelung-palette-square.png` — **social pool, post by hand** |

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
- [x] **S14 — Write-a-command.** ✅ shot → `pounce/assets/command-is-a-file.webp`, in the pounce README. Split: 5-line bash script in the editor (`# pounce: name = Say Hello`…) left, that command appearing in the palette right. "Every command is a file."

### 🌫 nebelung README

- [ ] **S15 — Palette swatch board.** All 26 colors: grey ramp (`crust #121212` → `text #d7d7d7`) as a row, 14 muted accents below, each chip labeled name + hex.
- [ ] **S16 — Ports gallery.** Grid of 6–8 themed tools (Ghostty, btop, lazygit, bat, yazi, Zen, Helix, Slack), each cropped small. "Whiskered to every app."
- [x] **S17 — "Too loud vs. just right."** ✅ shot → `nebelung/assets/loud-vs-right.webp`, in the nebelung README. Same Rust file in `bat`: upstream Catppuccin Mocha (left) vs Nebelung (right), rendered from the repo's own bat template (stock = no `--color-overrides`, Nebelung = with).

---

## 2 · Videos — with pseudo-scripts

Each = single continuous take, **8–18s**, KeyCastr visible, 60fps then lightly
sped up (~1.1–1.2×). Short = few retakes.

- [x] **V1 — "Summon, aim, pounce"** (Pounce hero, ~10s) → pounce `demo.webp`, landing. ✅ shot →
  `pounce/assets/demo.webp` (animated WebP, 880×572, ~9.5s loop): palette springs →
  type → Obsidian launches & tiles → ⌘Space → emoji grid swaps in place → copy 🐾 → paste.
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

- [x] **V3 — "Tap to launch"** (Prowl launcher, ~9s) → rice, org, landing. ✅ shot →
  `nebelhaus/assets/tap-to-launch.webp` (animated WebP, 880×572, ~9s loop),
  front-loaded in the rice README right under the hero.
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
  0:05  ./bench try switch  (fast-forward the build in the edit).
  0:10  Cut back: starship prompt, fzf prompt, lazygit borders all now sapphire.
  0:13  End on the swatch board tinting.
  ```

- [ ] **V10 — "Wipe and it stands again"** (reproducibility, ~10s, optional) → org, landing
  ```
  0:00  Terminal: `./bench status` (clean).
  0:02  `./bench rebuild` → build streams, then "switch".
  0:07  Desktop re-activates: bar reloads, windows re-sort to workspaces.
  0:09  End on the tidy desktop.
  ```
  "One Nix flake raises the whole house." Conceptual, so optional.

---

## 3 · Placement

### In the READMEs (lean — this is the whole list)

| README | Assets |
|---|---|
| 🐙 org (.github) | banner (have it) · **S1** in "the house" |
| 🏠 rice | **S1** hero · **V3** tap-to-launch |
| 🐾 pounce | **V1** `demo.webp` · **S14** command-is-a-file |
| 🌫 nebelung | `swatch-cascade.webp` (accent-ramp hero) · `preview.png` · **S17** `loud-vs-right.webp` (bat A/B) |

### Landing page + social pool (everything else)

The landing page (nebelhaus.com, the `web/` Worker) can hold the rest —
feature sections, a background reel, social clips:

- **Reel:** stitch V3 → V4 → V1 → V6 → V7 (muted, ~60s) as a background hero
  video; **S1** as the static poster frame.
- **Feature stills:** S2 (three rooms), S3/S4 (bar), S5 (launch mode), S6
  (tiling), S7 (Touch ID), S8 (cohesion), S9–S13 (pounce), S15 (swatch board),
  S16 (ports gallery), S17 (loud-vs-right).
- **Standalone clips:** V2 (extensibility), V5 (resize), V8 (Touch ID),
  V9 (accent swap), V10 (reproducibility).

None of these are obligations — they're a menu to pull from as the landing page
takes shape. Shoot the four README assets first; grab the pool while the scene
is already staged (see §4).

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
