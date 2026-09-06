# Seat 12 — Globe + PC mode

**Target class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File:** `docs/session-chat-globe/12-globe-pc.md`  
**Verdict:** **GO**

Sitting default is **desktop 1440×900**, not 390. `?globe=1` forces Cesium. Insight card must not cover the command bar. Globe stays mounted when card / desk / comms open.

## Disk — engine

`src/lib/intel/phone.ts` `isPhone()`:

- `?globe=1` → `false` (Cesium).
- `?flat=1` → `true` (tiles).
- Else Mobile UA only. Comment on disk: **width does not switch engines**. Desktop Cesium always.

`GlobeCanvas.tsx`: `!isPhone()` preloads Cesium + `CESIUM_BASE_URL`; boots `globeEngine`, else `flatEngine`. Tiles only if 3D throws. `useEffect([])` — no insight / desk / comms deps.

`IntelApp.tsx` always `<GlobeCanvas /><DetectionOverlay /><OverlayHud />`. No desk route. `fillViewport` sizes the globe to the shell.

## Disk — HUD

`OverlayHud.tsx` footer: `absolute … bottom-3 z-30 md:bottom-4`, `aria-label="Command the globe"`. Hidden only if `clean` or `chatOpen`. Desk does **not** hide it. `<InsightCard />`, `<CommsChat />`, `<DeskDrawer />` are HUD siblings. Desk copy: “Globe stays up”.

`InsightCard.tsx`: `holo-card holo-insight`. Returns null if no insight or `cockpit` — hides the **card**, not the globe.

`styles.css`:

- `.intel-globe { position:absolute; inset:0 }`
- `.holo-card { z-index:26; width:min(18.75rem, calc(100vw - 1.5rem)) }`
- `.holo-insight { left:1rem; bottom:7rem }`
- `@media (min-width:768px) { left:auto; right:calc(22rem + 1.5rem); bottom:7.5rem }`

1440×900: footer ~16px + row panel ~60px + coords ~20px ≈ **96px** from bottom. Card bottom **7.5rem = 120px**; card grows up. z-26 under footer z-30. Comms/desk `md:w-[22rem]`; card parks left of that rail.

## Law (coordinator)

1. Default this sitting: desktop UA, **1440×900**. Do not restyle for 390.
2. Keep `?globe=1` → Cesium even on a Mobile UA. Do not add a width branch to `isPhone`.
3. Do not unmount `GlobeCanvas` when insight, desk, comms, radio, or corpus open. Overlays only.
4. Keep `.holo-insight` at md+ `right: calc(22rem + 1.5rem)` and `bottom: ≥ 7.5rem`. Never raise card z ≥ 30.
5. Peek stays pointer-placed (`.holo-card` without `.holo-insight`). Do not merge Peek into Insight.

## Leftovers

- Smoke desktop is **1280×800** plus a **390** shot (`scripts/browser-smoke.mjs`). Done-when is 1440×900. Seat 15.
- Comms still **unmounts** the command footer (`!chatOpen`). Old exception. Card + comms at 1440 leave the bar gone until chat closes.
- `<768` card `bottom:7rem` can overlap the stacked ~140px footer. Phone. Out of this sitting.
- `.holo-grab { width:100% }` stacks Fly / Open desk / Dismiss. Taller card; still above the 1440 bar.
- No `1440` breakpoint on disk; desktop branch is `768` / `md`. Keep it.

## No

No `src/` from this seat. No phone-first HUD. No unmounting Cesium for a desk.
