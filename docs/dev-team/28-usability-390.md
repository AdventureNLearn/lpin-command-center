# Seat 28 — Usability 390px (command bar vs drawers)

Seat: 28 · band: Fence · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: this file only. No `src/` edit. No Playwright. No `DeskDrawer` create.

**Claim under test:** at **390px** width the command bar stays visible and usable, and the KIT-02 desk drawer must copy the **live CorpusPanel** inset / inner-scroll / z-stack so it does not cover that bar.

390px is iPhone 12/13/14 CSS width. It is below Tailwind `sm` (640) and `md` (768). All `sm:` / `md:` HUD branches are **off**. This is the stacked-chrome case.

---

## 1. Live geometry (read, not guessed)

### CorpusPanel — `src/components/intel/CorpusPanel.tsx`

`aside.panel.corpus-panel` (only when `corpusOpen`):

```
absolute inset-x-3 top-28 bottom-28 z-20
flex min-h-0 flex-col overflow-hidden p-3
sm:top-16
md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]
```

Inner scroller (header is `shrink-0`):

```
div.min-h-0.flex-1.overflow-y-auto.overscroll-contain.pr-1
```

There is **no** `.corpus-panel { max-height }` rule in `src/styles.css`. Height is the Tailwind box: `top-28` + `bottom-28`. Overflow is **inner**, not on the `aside`. `min-h-0` on the column is required or flex children refuse to shrink and the sheet grows into the footer.

At 390px (`sm`/`md` off): full-bleed sheet `left/right = 0.75rem`, `top = bottom = 7rem = 112px`, `z-index: 20`.

### OverlayHud footer — `src/components/intel/OverlayHud.tsx`

```
footer.absolute.right-3.bottom-3.left-3.z-30
md:right-4 md:bottom-4 md:left-4
```

Gate: `{!clean && !chatOpen && ( <footer>…` — **not** gated on `corpusOpen`. Corpus leaves the command bar mounted. Comms is the only panel that hides it (comms has its own input).

At 390px the inner panel is `flex flex-col gap-2 p-2` (`md:flex-row` off):

| Chip | Class | px (1rem=16) |
| --- | --- | ---: |
| Style row | `min-h-10` + `overflow-x-auto` | 40 |
| `gap-2` | | 8 |
| Command form | `min-h-11` | 44 |
| Panel `p-2` | | 16 |
| Coords line | `mt-1` + `text-xs` | ~20 |
| Footer `bottom-3` | | 12 |

Stacked footer block ≈ **108px** panel + coords ≈ **128px**, sitting **12px** off the bottom → top of chrome ≈ **140px** from the viewport bottom. `bottom-28` = **112px**. The last ~28px of the corpus sheet can sit **under** the bar. That is why **z-20 vs z-30 is load-bearing**, not decorative: the footer paints and hit-tests on top.

Command field: `aria-label="Command the globe"`, `/` focuses it, Submit is `size-10`. Style chips stay on one `overflow-x-auto` row (six `min-w-10` buttons fit ~366px inner). Touch target on the input is 44px.

### Header at the same width (why `top-28`, not `top-16`)

`header.absolute.top-3.left-3.right-3.z-30.flex.flex-col.gap-2` (`sm:flex-row` off). Title + Zulu line stack above the `size-11` toolbar (`self-end`). Share / Reset are `hidden … sm:grid` on the toolbar and move into the layer rail (`sm:hidden`). `top-28` (112px) clears that stack. Corpus uses `top-28`; comms/radio/rail still use `top-32`.

### z-stack (HUD)

| Surface | z | 390px role |
| --- | ---: | --- |
| `.intel-hud` | 4, `pointer-events: none` | Chrome overlay; globe keeps drag |
| `.panel` / `button` / `input` / `form` / `[role="dialog"]` | auto | Hits land on chrome only |
| Tracked card | 10, `bottom-28` | Same bottom clearance |
| Corpus / comms / radio / layer-rail | **20** | Drawers |
| Header + **footer command bar** + toast | **30** | Must win over drawers |
| Boot veil | 40 | Full-screen; not a drawer |

A KIT-02 sheet at `z-30` or `z-40` **covers** the command bar even with `bottom-28`. A sheet at `z-20` with `bottom-0` / `inset-0` still paints under the bar (bar stays clickable) but **covers it visually** — content and scrim in the footer band. Fail.

---

## 2. Neighbors — do not copy these for KIT-02

| Surface | Bottom | Scroll | Why not the KIT-02 template |
| --- | --- | --- | --- |
| **CorpusPanel (copy this)** | `bottom-28` | inner `overflow-y-auto` + aside `overflow-hidden` | Clears stacked footer; z-20 |
| CommsChat | `bottom-24` (96px) | log `flex-1`; CSS `max-height: min(70vh, 36rem)` | **Hides** the footer (`!chatOpen`). Tighter than the stacked bar. Pickup-plan §3 still says corpus `bottom-24`; **live code is `bottom-28`**. Follow live. |
| RadioDeck | **none** | aside `overflow-y-auto` + `max-height: 70vh` | Can run into the stacked footer. z-20 saves hit-test, not the visual. |
| Layer rail (`L`) | **none** | aside `overflow-y-auto` + `max-height: 70vh`; width `min(72vw, 260px)` | Nine layers × `min-h-11` plus Detect / Map / Go look / Share+Reset. Left rail, not a desk. |
| Tracked card | `bottom-28` | none | z-10; hidden while corpus is open |
| FirstRun | centered `z-20` | none | Modal, not a sheet |

`docs/corpus-audit/13-drawer-contract.md`: KIT-02 mobile = “bottom sheet that does **not** cover the command bar.” This seat names the copy-source: **CorpusPanel**, not comms `bottom-24` and not radio/rail unbounded bottoms.

---

## 3. KIT-02 must use the same (implement later, not this sitting)

Target file (not created here): `src/components/desks/DeskDrawer.tsx`, mounted from `OverlayHud` the same way as `CorpusPanel` (sibling overlay, globe stays in `IntelApp`).

**Copy (390px / default classes):**

- `absolute inset-x-3 top-28 bottom-28 z-20 flex min-h-0 flex-col overflow-hidden`
- Inner body: `min-h-0 flex-1 overflow-y-auto overscroll-contain`
- Header `shrink-0`
- Desktop: `md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]` (same as corpus)
- `role="dialog"` on the panel; pointer-events already on `.panel` via `.intel-hud`
- Esc closes (insert on the existing OverlayHud stack; do not eat comms/radio/first-run)
- Footer **stays mounted**. Do **not** add `deskOpen` (or equivalent) to `{!clean && !chatOpen && (`

**Refuse:**

- `inset-0`, `bottom-0`, `h-full`, `h-dvh`, `h-svh`, `fixed inset-0`, full-viewport sheet, new route, iframe
- `z-30` / `z-40` / anything ≥ footer
- Copying CommsChat `bottom-24` as “close enough”
- Copying RadioDeck / layer-rail (no `bottom-*`)
- Hiding the command bar while a desk is open
- Horizontal overflow trap at 390px (`overflow-x` on the sheet; keep `inset-x-3`)
- Treating the Open-sources rail as DeskDrawer

Empty copy when `desk === null` is “No desk selected”. Adapters (KIT-03/04) fill later. This seat does not implement.

---

## 4. 390px pass / fail (when a later turn builds KIT-02)

Pass only if all of these hold at **390px** CSS width (no Playwright from this seat):

1. Footer command input is **visible** (not under an opaque sheet) and **clickable** (`z-30` > drawer `z-20`).
2. `/` still focuses “Command the globe”. Style chips 1–6 still send.
3. Drawer top clears the stacked header (`top-28`); drawer bottom is `bottom-28`, not the viewport edge.
4. Long honesty / roster / search results **scroll inside** the sheet (`overflow-y-auto`); the `aside` does not grow.
5. Globe remains mounted; radio Play and Comms in the **header** stay reachable (`z-30`).
6. No new homepage, no unmount of `GlobeCanvas`.

Fail (P0-adjacent for the kit, not for this docs seat): drawer `z ≥ 30`, `bottom-0`/`inset-0`, footer gated off, horizontal trap, or command input covered.

---

## E / I / A

**E — Evidence (this tree, source read only)**

- `CorpusPanel.tsx` L23–24: `bottom-28` + `z-20` + `flex min-h-0 flex-col overflow-hidden`; L45–46 inner `min-h-0 flex-1 overflow-y-auto overscroll-contain`. `md:bottom-28` kept (not relaxed at desktop).
- `OverlayHud.tsx` L609–610: footer `z-30` `bottom-3` `left-3` `right-3`; L612 `flex-col` until `md:flex-row`; L629 command `min-h-11`; L609 gate is `!clean && !chatOpen` only. Corpus mount L681 is unconditional.
- `styles.css` L226–240: `.intel-hud` `pointer-events: none` except `.panel` / controls. L325–363: `.layer-rail` / `.comms-panel` / `.radio-panel` have `max-height: min(70vh, 36rem)`; **no** `.corpus-panel` height rule.
- `CommsChat.tsx` L33: `bottom-24 z-20` (tighter; also hides footer). `RadioDeck.tsx` L164: no `bottom-*`. Layer rail L390: `top-32 left-3 z-20`, no `bottom-*`.
- Tracked card and cockpit readouts already use `bottom-28` (`OverlayHud.tsx` L515, L588).
- `IntelApp.tsx`: globe + HUD only. No `src/components/desks/`.
- `docs/corpus-audit/13-drawer-contract.md`: KIT-02 mobile sheet must not cover the command bar. `15-pickup-plan.md` S9 / step 11: 390px command bar usable; plan text still says corpus `bottom-24` — **drift vs live `bottom-28`**.
- KIT-00 residual (pickup-plan): command bar already survived 390px before civic drawers.

**I — Inference**

- 390px is the worst HUD stack: header `flex-col` and footer `flex-col` both inflate. `top-28` / `bottom-28` are the live answers to that stack.
- Stacked footer (~140px including `bottom-3`) is taller than `bottom-28` (112px). Clearance is **partial**. Footer `z-30` over drawer `z-20` is the second lock so the bar still wins paint and clicks. Drop either lock and the bar dies.
- Inner scroll + `overflow-hidden` + `min-h-0` is the third lock: without it, honesty lists (KIT-03/04) grow the sheet through the footer band.
- Comms may hide the footer because it replaces the input. A desk drawer does not. Copying the comms gate (`chatOpen`) onto `deskOpen` would fail the claim.
- Radio/rail `70vh` max-height is not a substitute for `bottom-28` at this width.

**A — Assumption**

- Host implements KIT-02 in a later turn from this contract + seat 13. This seat does not open `src/`.
- Operators will not treat this file as a Playwright log. Geometry is from class strings and Tailwind spacing, not a resized browser.
- `1rem = 16px` holds in this HUD (`html` has no non-16 root size in `styles.css`).
- iPhone 12/13/14 height (~844) is assumed for “inner scroll has room”; a 390×landscape short viewport still must inner-scroll rather than cover the bar.
- Pickup-plan `bottom-24` is stale relative to CorpusPanel; KIT-02 follows **CorpusPanel**, not the plan sentence.

---

## Tri-state

Claim: **at 390px the command bar stays usable, and KIT-02 must use CorpusPanel’s `bottom-28` / inner scroll / `z-20` so it does not cover that bar.**

| State | Meaning |
| --- | --- |
| **PASS** | Live corpus + footer already encode the pattern; KIT-02 copy-list is unambiguous |
| HOLE | Pattern exists but a required class is missing or neighbors disagree |
| BLOCK | Command bar would be covered if KIT-02 copied current corpus, or corpus already covers it by design |

**Verdict: PASS (honest-incomplete).**  
CorpusPanel + footer already implement the 390px rule. KIT-02 is not built (`src/components/desks/` absent). Incomplete = drawer not shipped; not a geometry hole.

Stop. Do not start KIT-02 in this turn. Do not patch `src/` to “fix” pickup-plan `bottom-24`.
