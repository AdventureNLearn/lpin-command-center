# Hour 0 — seat 10 OverlayHud Esc

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/OverlayHud.tsx`  
**Phase:** DEVELOP (CLOCK T 0:00)

## Harden

Escape dismisses the Insight card if it is present (store `insight` set and cockpit off, so the card actually paints). Else the existing Esc stack: install → comms → radio picker → first-run → desk → corpus → cockpit → tracked → layer rail.

Dismiss path is `setInsight(null)` only. Chat stays. Desk stays. Cesium / `GlobeCanvas` stay mounted. `<InsightCard />` stays mounted as a HUD sibling (it already returns null when empty).

## Disk

- One `window` `keydown`. No second listener. No globe unmount.
- Peek is not this peel (pointer / 5s).
- G / R / L mutex holes from `docs/harden/14-esc.md` not in this hour.

## Verify

`tsc --noEmit` PASS (local `typescript/bin/tsc`; host `npx` blocked by PS execution policy).

OPSEC: localhost harden, not public-facing. No municipality samples. Live gevradio frozen.
