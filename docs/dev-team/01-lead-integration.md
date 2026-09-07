# 01 — LEAD INTEGRATION — KIT-02 DeskDrawer

Seat: 01 INTEGRATION · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
Kit: `KIT-02-desk-drawer.md` (depends on KIT-01; execute only this kit)  
Specialists 07 / 08 / 09 / 10 / 29 / 31: **files absent**. Disk audit below is the SoT.

This file is the contract. It does not patch `src/`.

---

## Tri-state

Claim: **coordinator may implement empty KIT-02 DeskDrawer this sitting without unmounting Cesium, eating the command bar, or merging CorpusPanel into the desk.**

| State | Meaning |
| --- | --- |
| **PASS** | Empty kept/permit drawers can land in ≤8 files. `corpusOpen` and `desk` stay separate. Globe + radio + command bar survive. |
| HOLE | Ready, with named collisions (`open` flyTo, `kept desks` layer regex, OverlayHud `drawerOpen` name, 390px stacked footer height). |
| BLOCK | Would fail a P0 (globe dead, 16k pins, iframe-as-integration, invented names, new route, Rest import). |

**Verdict: GO / PASS (honest-incomplete).**  
KIT-01 LEG/AHJ and the corpus BASE panel are already on disk. KIT-02 is the next kit (FEATURE_KITS: one kit per turn). `docs/corpus-audit/13-drawer-contract.md` “do not start KIT-02 in the same turn” was the *previous* smoke sitting. That sitting landed. This sitting is the empty drawer.

**NO-GO if** the implementer ships adapters (KIT-03/04), a route, an iframe, Rest pins, `members.json` names, or more than 8 files.

---

## (1) Exact files KIT-02 may touch (max 8)

Required (6):

| # | File | Why |
| --- | --- | --- |
| 1 | `src/components/desks/DeskDrawer.tsx` | **NEW.** The panel. Directory does not exist (`src/components/` has `intel/` only). |
| 2 | `src/lib/intel/store.ts` | Add `desk` + `setDesk`. Do not reuse `corpusOpen`. Do not reuse OverlayHud local `drawerOpen`. |
| 3 | `src/lib/intel/types.ts` | Add `CommandAction` `{ type: "desk"; desk: null \| { system: "kept" \| "permit"; id: string } }`. Do not add LayerIds. |
| 4 | `src/lib/intel/commands.ts` | Parse open/close desk **before** flyTo `open`. Do not steal LEG/AHJ layer on/off. |
| 5 | `src/lib/intel/runCommand.ts` | Apply `desk`. Opening desk closes corpus / comms / radio picker. Opening corpus closes desk. |
| 6 | `src/components/intel/OverlayHud.tsx` | Mount `<DeskDrawer />`. Esc stack. Mutual exclusion with corpus / comms / radio / layer-rail. Temporary debug control. |

Optional (use only if Tailwind cannot clear the stacked 390px footer):

| # | File | Why |
| --- | --- | --- |
| 7 | `src/styles.css` | `.desk-drawer` max-height / bottom inset. Prefer CorpusPanel classes and skip this file. |

Slot 8 unused. Do **not** spend it on IntelApp, GlobeCanvas, CorpusPanel, RadioDeck, or a smoke `.mjs`.

### Store shape (KIT-02 Do #3, exact)

```ts
desk: null | { system: "kept" | "permit"; id: string }
setDesk: (desk: null | { system: "kept" | "permit"; id: string }) => void
```

Default `desk: null`. Debug open may use `id: "empty"`. Body placeholder: **“No desk selected.”**

### Commands (parse **before** flyTo)

On (system set, id `"empty"`):

- `open kept desk` · `open kept drawer` · `show kept desk`
- `open permit desk` · `open building desk` · `show permit desk`

Off:

- `close desk` · `close drawer` · `hide desk` · `desk off`

Do **not** parse `open korea`, `find AHJ in …`, `building desk {place}` search (KIT-04/05). Do **not** map `corpus` to desk.

### Debug control

One OverlayHud toolbar control or two (Kept / Permit). Do not steal `G` / `R` / `L` / Corpus. Title e.g. `Desk (debug)`. Enough that a sitting can open and close an empty Kept drawer and an empty Permit drawer.

### Panel chrome (KIT-02 Do)

- Right-side, dark cockpit `.panel` (not Kept cream, not a full page).
- Header: **Legislature** when `system === "kept"`; **Building desk** when `system === "permit"`; close button.
- Body: slot. Empty = “No desk selected.”
- Footer slot: honesty strip even when empty.
  - kept: “Delayed harvest. Not live hosts. Roster later.”
  - permit: “Permit Harbor lock 2026-08-18. Rest is a count, not a map.”
- Esc closes. Globe stays mounted. Command bar stays usable (footer remains in the tree; unlike CommsChat which hides it).

### Shell mount (seat 07)

Mount from OverlayHud next to `<CorpusPanel />`, same as CommsChat / RadioDeck. **Do not edit `IntelApp.tsx`.** `IntelApp` is already `GlobeCanvas` + `DetectionOverlay` + `OverlayHud`. A third civic mount would be a wasted file and a second overlay root.

---

## (2) Files forbidden

Do not open for writes:

- `src/components/intel/IntelApp.tsx` — globe mount already correct
- `src/components/intel/GlobeCanvas.tsx` — boot wrapper; user-named pin-loop scare file
- `src/lib/intel/globeEngine.ts` / `src/lib/intel/flatEngine.ts` — actual entity loops
- `src/components/intel/CorpusPanel.tsx` — do not merge corpus into desk
- `src/lib/intel/corpus.ts` — index loader stays corpus-only
- `src/components/intel/RadioDeck.tsx` / `CommsChat.tsx` / `FirstRun.tsx` / `DetectionOverlay.tsx`
- `src/lib/permit/places-rest.ts` / `places.ts` / `places-extra.ts` / `places-more.ts`
- `src/lib/kept/**` (does not exist; KIT-03)
- `src/components/desks/*Adapter*` — no KeptAdapter / PermitAdapter this kit
- `src/routes/index.tsx` — remains `<IntelApp />` only
- `src/router.tsx` / `src/routeTree.gen.ts` — no civic route
- `vendor/kept/_out/**` / `vendor/kept/kits/**`
- `package.json` / lockfile / `vite.config.ts`
- live gevradio remix, grok.me, 16k pins

Do not: npm, git push, iframe `keptglobal` / `hivepermitdev`, invent sitting names, dump Rest, enable LEG/AHJ drawing, hide the command bar when desk is open.

---

## (3) DeskDrawer vs CorpusPanel (`corpusOpen` vs `desk`)

Two surfaces. Same right-side / 390px slot. **Not aliases.**

| Flag | File | Role |
| --- | --- | --- |
| OverlayHud local `drawerOpen` | `OverlayHud.tsx` | **Layers rail** (`L` / Open sources). Not a civic desk. Do not rename it `desk`. |
| `corpusOpen: boolean` | `store.ts` + `CorpusPanel.tsx` | Delayed **archive index** (33/196, permit counts, 501, holes). No selected system. |
| `desk: null \| { system, id }` | KIT-02 store + `DeskDrawer.tsx` | Civic **work surface**. Empty this kit. Adapters later (KIT-03/04). |

Coexistence rules:

1. **At most one of** corpus panel, desk drawer, comms, radio picker, layer rail occupies the overlay slot.
2. Opening `desk` → `setCorpusOpen(false)` + close comms + close radio picker + `setDrawerOpen(false)`.
3. Opening corpus → `setDesk(null)` (extend `runCommand` corpus branch). OverlayHud corpus button already closes comms/radio/rail; add `setDesk(null)` there too.
4. `G` / `R` / `L` when turning **on** also `setDesk(null)` (they already close corpus).
5. LEG/AHJ rail toggles do **not** auto-open desk or corpus.
6. Desk open must **not** hide the footer command bar. Corpus does not hide it (`{!clean && !chatOpen && (`). Copy that. Comms **does** hide it — do not copy comms.
7. Hide layer rail and tracked card when `desk` is set, same as `corpusOpen` (`drawerOpen && !chatOpen && !radioOpen && !corpusOpen` → also `&& !desk`).
8. Do not render `DeskDrawer` when `desk === null`. Do not render `CorpusPanel` when `!corpusOpen`. If both flags leak, Esc closes desk first (see stack).
9. First-run stays independent. Do not open desk while `firstRun` (same guard as `G`/`R`).

Corpus is proof the archive is wired. Desk is the host for adapters. Smoke corpus is **not** DeskDrawer. Do not skip KIT-02 because CorpusPanel exists.

---

## (4) Esc stack

Current OverlayHud `keydown` (Escape), disk order:

1. `useComms.open` → `setOpen(false)`
2. `useRadio.picker` → `setPicker(false)`
3. `firstRun` → `dismissFirstRun(false)`
4. `corpusOpen` → `setCorpusOpen(false)`
5. `cockpit` → `engine.enterCockpit(false)`
6. `tracked` → `engine.track(null)`
7. else OverlayHud local `drawerOpen` → `setDrawerOpen(false)`

**Insert desk as 4; corpus becomes 5.** Front-most overlays first. Desk is the civic modal; corpus is the index; both are above cockpit/track/rail.

Required order after KIT-02:

1. comms
2. radio picker
3. first-run
4. **`desk !== null` → `setDesk(null)`**
5. `corpusOpen` → `setCorpusOpen(false)`
6. cockpit
7. tracked
8. layer rail `drawerOpen`

Return after the first hit. Do not add a second `window` keydown listener inside `DeskDrawer` (would race OverlayHud). Close button on the panel may call `setDesk(null)` directly.

`/` still focuses the command bar even while desk is open (command bar stays usable).

---

## (5) 390px bottom sheet vs command bar `z-30`

### Disk stacking (do not invert)

| Surface | Classes (now) | z |
| --- | --- | --- |
| `.intel-hud` | `position:absolute; inset:0; z-index:4` over globe | 4 (HUD root) |
| Boot overlay | `z-40` | 40 |
| Header toolbar | `z-30` | 30 |
| **Command footer** | `absolute … bottom-3 … z-30` | **30** |
| Toast | `z-30` | 30 |
| CorpusPanel | `z-20` · mobile `inset-x-3 top-28 bottom-28` · md right `w-[22rem] bottom-28` | 20 |
| CommsChat | `z-20` · `bottom-24` | 20 |
| RadioDeck | `z-20` · **no bottom inset** (HOLE: can paint over the bar) | 20 |
| Layer rail | `z-20` | 20 |
| Tracked card | `z-10` · `bottom-28` | 10 |

Footer is **not** hidden when corpus is open. It **is** hidden when comms is open.

### 390px geometry (command bar is stacked)

At 390px the footer is `flex-col`: style chips (`min-h-10`) + command form (`min-h-11`) + `p-2` + `gap-2` ≈ **108px** panel, plus coords line ≈ **20px**, plus `bottom-3` = **12px**. Clearance from viewport bottom ≈ **140px**.

`bottom-24` (96px) and CorpusPanel `bottom-28` (112px) **intersect** that stacked footer. Usability today is **z-30 > z-20**, not spatial clearance.

### KIT-02 sheet rules

Desktop (`md+`): right rail, copy corpus — `md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]`. Not a bottom sheet.

Mobile / 390px: **bottom sheet**, not a route, not `inset-0`, not full viewport.

1. Drawer **`z-20`**. Command footer stays **`z-30`**. Never raise the sheet to 30 or 40 (boot). Never wrap the globe in a `z-40` sheet.
2. Prefer `bottom-36` (144px) at 390px so the sheet **clears** the stacked styles+input. If Tailwind-only copy of corpus `bottom-28` is used, that is acceptable **only because** z-20 sits under z-30 — the bar must remain visible and hittable. “Does not permanently cover” = bar stays usable, not “never intersects.”
3. `max-h-[min(50vh,24rem)]` (or equivalent) so Earth stays visible above the sheet.
4. `pointer-events` only on the panel (HUD root is `pointer-events: none`; `.panel` is auto). Do not add a full-screen dim that captures clicks on the footer.
5. Do **not** copy RadioDeck (no bottom inset). Do **not** copy CommsChat (hides footer).
6. Header toolbar also `z-30` — sheet must not cover Play / Radio / Comms / Corpus / Layers on mobile. `top-auto` on the sheet (not `top-0`). Corpus uses `top-28` on small screens; a bottom sheet should be `top-auto` + max-height, not a second full-height column.

If a 7th file is needed, put the 390px rule in `src/styles.css` as `.desk-drawer` and keep Tailwind z-20.

---

## (6) GO / NO-GO this sitting

**GO** — coordinator implements empty KIT-02 now, bounded by this file.

Preconditions already true on disk:

- KIT-01: `LayerId` includes `legislatures` | `permits`; `LAYER_ORDER` has LEG then AHJ; `defaultLayers()` both `on: false`.
- Corpus BASE: `CorpusPanel.tsx`, `corpusOpen`, `show corpus` / `hide corpus`.
- Shell: `IntelApp` = globe + HUD. `src/routes/index.tsx` = `<IntelApp />`. No `src/components/desks/`.
- Command bar footer `z-30` exists.

Done when (KIT-02 Done when, plus this sitting’s fences):

1. Debug control or command opens empty Kept drawer and empty Permit drawer; close works; Esc closes desk.
2. Globe still orbits underneath (`GlobeCanvas` still a sibling in `IntelApp`).
3. Command bar still typed into at 390px; Creedence still plays from it.
4. Corpus panel still opens/closes independently; opening one closes the other.
5. Placeholder body “No desk selected.” Honesty footer visible. No iframe. No new route.
6. Zero Rest pins. Zero `members.json` names. LEG/AHJ still default off with no new globe entities.
7. Files touched ⊆ the 6–7 listed. No `package.json`.

Stop. Do not start KIT-03 / KIT-04 in the same turn.

**NO-GO paths (revert if hit):** globe unmounts; radio dead; footer hidden or `z-index` ≤ sheet; `places-rest` / `places.ts` in the module graph; civic homepage/route; keptglobal iframe; >8 files; adapters that load fat kits.

---

## E / I / A

**E — Evidence (this tree, 2026-08-29)**

- KIT-02: add `DeskDrawer.tsx`; store `{ desk: null | { system: "kept" | "permit"; id: string } }`; Esc closes; globe mounted; command bar usable; mobile bottom sheet does not permanently cover the command bar; placeholder allowed; no new route; no keptglobal iframe.
- `src/components/` has no `desks/` folder.
- `store.ts`: `corpusOpen` + `setCorpusOpen` only. No `desk`.
- `types.ts`: `CommandAction` has `{ type: "corpus"; on: boolean }`. No `{ type: "desk" }`. `LayerId` already has legislatures/permits (KIT-01 landed).
- `OverlayHud.tsx` Esc: comms → radio → firstRun → corpus → cockpit → track → local `drawerOpen`. Footer `z-30`. Corpus button and `L` are mutually exclusive with comms/radio/rail.
- `CorpusPanel.tsx`: `z-20`, `bottom-28`, `md:w-[22rem]`. Index copy only.
- `runCommand.ts` corpus branch closes comms + radio, not desk (desk does not exist).
- `commands.ts`: `kept desks?` is a **legislatures layer** regex (on/off gated). FlyTo includes `open` as a prefix. Corpus phrases are parsed before flyTo.
- `IntelApp.tsx`: GlobeCanvas always mounted.
- FEATURE_KITS: KIT-02 depends on KIT-01; one kit per turn.
- Pickup plan (`docs/corpus-audit/15-pickup-plan.md`): `corpusOpen` must not reuse `desk`. 390px corpus = bottom sheet above command bar. KIT-02 files were forbidden *that* sitting.
- Seats 07–10, 29, 31 notes: missing.

**I — Inference**

- Empty drawer is a HUD overlay, not a data kit. Six files are enough. Adapters would explode the file cap and the P0 surface.
- `open kept desk` will hit flyTo (`open …`) unless parsed earlier, same pattern corpus already uses.
- 390px survival is a z-index contract (`sheet 20` / `footer 30`) plus a bottom inset; copying RadioDeck would fail the kit.
- OverlayHud `drawerOpen` is the load-bearing name collision. Calling the civic flag `desk` on the store is the only safe split.

**A — Assumption**

- Host implements from this file even if 07–10 / 29 / 31 never write. Collision seat 29 does not get a veto beyond the forbidden list here.
- Operators will not treat an empty “No desk selected.” panel as KIT-03/04 done.
- Tailwind `bottom-36` + `z-20` is enough; `styles.css` stays unused unless 390px still traps the bar.

---

## Smoke the coordinator must be able to tick (5 lines)

1. Globe orbits with desk open. No new route. Cesium still in `IntelApp`.
2. `open kept desk` / `open permit desk` / `close desk` (or debug buttons). Header Legislature vs Building desk. Body “No desk selected.”
3. Esc: comms, radio, first-run, **desk**, corpus, cockpit, track, layer rail.
4. 390px: type in the command bar; Play still hits; sheet does not win z-index.
5. `show corpus` closes desk; opening desk closes corpus. Creedence still plays. LEG/AHJ still off. No Rest pins.

Stop.
