# Seat 07 — KIT-02 shell mount

**Class:** KIT-02 empty desk drawer contract (next implement).  
**Tree:** `REPO_ROOT`  
**This sitting writes:** this file only. No `src/` edits.  
**P0:** homepage is the Cesium globe. Fail closed if Earth unmounts.

KIT-02 is one panel, two later adapters. This seat answers **where `DeskDrawer` mounts**. Not a new route. Not a pin loop. `GlobeCanvas.tsx` is boot-only — do not plan entity add/prune here.

---

## Verdict

Mount `DeskDrawer` **inside `OverlayHud`**, as a **sibling overlay** of `CommsChat` / `RadioDeck` / `CorpusPanel`. Leave `GlobeCanvas` where it is in `IntelApp`. Do not add a route. Do not nest the drawer in the Cesium host div.

**Cesium stays mounted.** Opening a sibling overlay like CorpusPanel or CommsChat does not unmount `GlobeCanvas`. DeskDrawer using that same overlay slot is globe-safe.

---

## 1. Shell as it exists (mount only)

`src/routes/index.tsx` is `/` → `<IntelApp />`. Root `__root.tsx` only wraps `<Outlet />`. No other app route.

`src/components/intel/IntelApp.tsx` is the only homepage composition:

```
<main className="intel-shell">
  <GlobeCanvas />          ← Cesium (or flat fallback). Always rendered.
  <DetectionOverlay />     ← HUD sibling, pointer-events none
  <OverlayHud />           ← HUD sibling, pointer-events none except chrome
</main>
```

`GlobeCanvas` is **not** inside `OverlayHud`. Overlays sit on top of Earth; they do not replace Earth.

`src/components/intel/GlobeCanvas.tsx` is a boot wrapper:

- Renders `<div ref={ref} className="intel-globe" />` (`position: absolute; inset: 0`).
- `useEffect(..., [])` lazy-imports `bootGlobe` (desktop) or `bootFlatMap` (phone). Cleanup runs **only** when `GlobeCanvas` unmounts.
- No pin loop, no `entities.add`, no layer subscribe. Those live in `src/lib/intel/globeEngine.ts` (KIT-03/06 later). **Do not open a pin loop for KIT-02.**

`.intel-hud` is `position: absolute; inset: 0; pointer-events: none; z-index: 4`. Panels, buttons, inputs, and `[role="dialog"]` flip `pointer-events: auto`. Orbit/zoom keep hitting the globe except on the panel itself.

---

## 2. Proven sibling overlays (do this, not a route)

`OverlayHud` already mounts exclusive right-side `aside.panel` overlays as **always-present children** of the HUD (outside the `hud && !clean` header gate):

```tsx
{/* OverlayHud.tsx ~679–681 */}
<CommsChat />
<RadioDeck />
<CorpusPanel />
```

Each overlay:

| Overlay | File | When closed | Geometry (desktop) | Covers command bar? |
| --- | --- | --- | --- | --- |
| CommsChat | `src/components/intel/CommsChat.tsx` | `return null` | `md:right-4 md:w-[22rem]` `aside.panel` `z-20` | Footer hides while chat is open (existing) |
| RadioDeck | `src/components/intel/RadioDeck.tsx` | `picker ? <RadioPicker/> : null` | `md:right-4` `.radio-panel` `z-20` | No |
| CorpusPanel | `src/components/intel/CorpusPanel.tsx` | `return null` | same right `aside.panel`, `md:bottom-28` | **No** — stays above footer |

Closed overlay = that component returns `null`. **`GlobeCanvas` is not in that tree.** IntelApp still renders it. Cesium `useEffect` cleanup does not run.

CorpusPanel is **not** DeskDrawer. It is the smoke index card. KIT-02 is the civic desk shell that later hosts KeptAdapter + PermitAdapter.

---

## 3. Where to mount DeskDrawer

**File (next implement, not this sitting):** `src/components/desks/DeskDrawer.tsx`  
**Insert (next implement):** `src/components/intel/OverlayHud.tsx`, immediately after `<CorpusPanel />`.

```
IntelApp                          ← do not change composition
  GlobeCanvas                     ← do not touch; boot only; no pin loop
  DetectionOverlay
  OverlayHud
    header / layer-rail (L) / track card / command bar
    CommsChat                     ← sibling overlay
    RadioDeck                     ← sibling overlay
    CorpusPanel                   ← sibling overlay (smoke index; keep)
    DeskDrawer                    ← MOUNT HERE
    FirstRun
```

Copy CorpusPanel chrome, not the Layers rail:

- `aside.panel` + `role="dialog"`.
- Desktop: right-side dark cockpit panel (`md:right-4 md:w-[22rem]`, `md:top-20 md:bottom-28`). Not Kept cream.
- Mobile: bottom sheet **above** the command bar (`bottom-28` / `bottom-24` band). Must not cover the footer.
- Header: Legislature / Building desk. Close control. Esc closes (join OverlayHud Esc stack).
- Body: empty kept/permit slots. Placeholder **“No desk selected”** is enough for KIT-02.
- Footer: honesty strip.
- Closed: `return null` (same as CorpusPanel). Do **not** unmount `GlobeCanvas` / `OverlayHud` / `IntelApp`.

Store (KIT-02, not this sitting): `{ desk: null | { system: "kept" | "permit"; id: string } }`. Do not reuse `corpusOpen`. Do not add `{ type: "desk" }` until the implement turn.

Mutual exclusion: opening DeskDrawer closes comms, radio picker, layer rail, and corpus (same pattern as G / R / L / Corpus buttons). Radio play and the command bar stay reachable.

---

## 4. P0 globe — Cesium stays mounted

**Claim:** DeskDrawer as a sibling overlay like CorpusPanel/CommsChat does not unmount Cesium.

**Why (disk, not hope):**

1. `IntelApp` always renders `<GlobeCanvas />`. No flag, no route swap, no `{desk ? <DeskDrawer/> : <GlobeCanvas/>}`.
2. `GlobeCanvas` boot effect deps are `[]`. Stop runs only on **GlobeCanvas** unmount.
3. OverlayHud overlays live in a **sibling** of GlobeCanvas (`IntelApp` children), then as HUD children. They never own the `.intel-globe` node.
4. CorpusPanel and CommsChat already open/close on `/` without remounting IntelApp. KIT-00/BASE smoke: globe still orbits with corpus open. DeskDrawer in that slot inherits the same lifetime.
5. HUD `pointer-events: none` except the panel. Drag-orbit / scroll-zoom still hit Cesium around the drawer.
6. Boot splash (`z-40` cover) and `cleanUi` hide chrome; they do not remove `GlobeCanvas`. DeskDrawer must sit with the other overlays (always in OverlayHud), not inside the `hud && !clean` header fragment.

**P0 fail (do not do these):**

| Anti-pattern | Why it kills Earth |
| --- | --- |
| New route (`/desk`, `/kept`, `/permits`) that renders DeskDrawer instead of IntelApp | Unmounts `GlobeCanvas` → Cesium `cleanup()` |
| `{deskOpen ? <DeskDrawer /> : <GlobeCanvas />}` in IntelApp | Same unmount |
| Nest DeskDrawer **inside** the `.intel-globe` host div | Contaminates the Cesium container; invites boot/teardown coupling and pin-loop temptation |
| Replace `/` (`src/routes/index.tsx`) | Homepage stops being the globe |
| Iframe keptglobal / hivepermitdev as “the desk” | Not integration; hides or replaces the cockpit |
| Treat layer-rail (`drawerOpen`, `L`) as DeskDrawer | Wrong panel; still not a civic desk; do not skip KIT-02 |

`src/routes/index.tsx` stays `createFileRoute("/")` → `<IntelApp />`. **Do not add a new route.**

---

## 5. Out of this seat (and out of GlobeCanvas)

KIT-02 implement later: create `DeskDrawer`, wire store + Esc + a HUD control, empty kept/permit panes.

**Not KIT-02:**

- Pin loops, `viewer.entities.add`, capitals dump, Rest desks (14925), member pins.
- Any edit to `GlobeCanvas.tsx` or `globeEngine.ts` / `flatEngine.ts`.
- KIT-03 KeptAdapter / KIT-04 PermitAdapter bodies.
- Replacing or deleting `CorpusPanel`.
- Civic homepage, skill brands, invented sitting names.

If a later sitting needs a control to open the drawer, add a toolbar button next to Corpus/Layers in OverlayHud, or a command `{ type: "desk" }`. Do not steal `G` / `R` / `L`. Do not auto-open from LEG/AHJ toggles.

---

## 6. E / I / A

**E — Evidence (this tree, 2026-08-29)**

- `src/components/intel/IntelApp.tsx`: `GlobeCanvas` + `DetectionOverlay` + `OverlayHud` inside `.intel-shell`. Unconditional.
- `src/components/intel/GlobeCanvas.tsx`: mount-only `intel-globe` div; `useEffect([])` boots Cesium/flat; no entity loop.
- `src/routes/index.tsx`: `/` → `IntelApp` only. `__root.tsx` is chrome + `<Outlet />`.
- `src/styles.css`: `.intel-globe` fills the shell; `.intel-hud` overlays with `pointer-events: none` + auto on panels.
- `OverlayHud.tsx` lines 679–681: `<CommsChat />` `<RadioDeck />` `<CorpusPanel />` as HUD children. Each returns `null` when closed.
- `CorpusPanel.tsx` / `CommsChat.tsx`: `aside.panel` right overlay, `z-20`, command bar left clear (`md:bottom-28` / `bottom-24`).
- Layer rail is a **left** `section.layer-rail` gated by `drawerOpen`. Contract (`docs/corpus-audit/13-drawer-contract.md`) already says that rail is not DeskDrawer.
- FEATURE_KITS / drawer contract: KIT-02 = `src/components/desks/DeskDrawer.tsx`, right-side dark panel, Esc, store `{ desk: null | { system, id } }`, mobile sheet that does not cover the command bar. No `src/components/desks/` on disk yet.
- No `{ type: "desk" }` on `CommandAction` today (`corpus` exists; desk does not).

**I — Inference**

- The cheapest globe-safe mount is the overlay slot OverlayHud already uses. Cesium lifetime is IntelApp’s, not the overlay’s.
- A new route or a GlobeCanvas swap is the P0 failure mode, not “forgot z-index.”
- Mounting DeskDrawer as an **IntelApp** sibling (`<OverlayHud /><DeskDrawer />`) would also leave Cesium mounted, but it sits outside `.intel-hud` pointer-events / z-index 4 and misses Esc + mutual exclusion. Inferior. Use OverlayHud.

**A — Assumption**

- Next implement will add `DeskDrawer` at the OverlayHud insert above and will not open `GlobeCanvas` / `globeEngine` for “just a pin.”
- Operators will not treat `CorpusPanel` as KIT-02 done.
- Empty “No desk selected” is enough for KIT-02; adapters are KIT-03/04.

---

## 7. Next-implement touch list (do not execute from this seat)

```
src/components/desks/DeskDrawer.tsx          NEW empty shell
src/components/intel/OverlayHud.tsx          mount after <CorpusPanel />
```

Optional on that turn (not required to pick the mount): intel store `desk` + setter; Esc + toolbar; `{ type: "desk" }` command.

**Forbidden on that turn as well:** `GlobeCanvas.tsx`, `globeEngine.ts`, `flatEngine.ts`, `src/routes/index.tsx`, new routes, `places-rest.ts`, harvest member dumps, 16k pins.

**Done (this seat):** mount site named. P0 globe preserved. No `src/` writes.
)
