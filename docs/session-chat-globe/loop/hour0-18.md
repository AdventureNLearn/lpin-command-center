# Hour 0 · seat 18 · `src/components/intel/FirstRun.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only

## Done

- Four KIT-00 cards unchanged (Planes / Space junk / Planet yelling / Just the globe).
- **KEEP** explicit fly on card click: Planes `flyTo(-74.0, 40.6, 420_000)`, Planet `flyTo(-119.4, 36.7, 1_100_000)`, Space delayed `trackNearest("iss")` at 1400 ms (timeout outlives dismiss).
- **No auto-fly on load.** No `useEffect`. Mount does not call `flyTo` / `trackNearest`. Esc (`skip`) and **Just the globe** dismiss only.
- Once-only `picked` guard. Engine read from `getState()` at click / ISS delay, not a mount subscription.

## Verify

`node.exe node_modules\typescript\bin\tsc --noEmit` → **0** after this edit.

## Not this seat

`OverlayHud` Esc stack / `hydrateFirstRun`. Share-hash `flyTo` in `globeEngine` / `flatEngine`. `scenes.ts` orbital. InsightCard Fly. Chat `askedToMove`.
