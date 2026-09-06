# Hour 3 AUDIT — seat 13 `globeEngine.ts`

**Class:** public-suite WIP · **Not a ship** · **Phase:** audit-heavy  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/lib/intel/globeEngine.ts` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`

No new features. No FORECAST.md. No other CLOCK files.

## Verdict: **GO**

No FAIL leftover in this file. Execute: note and stop. `src/` not edited this hour.

## Audit

| Check | Disk | Mark |
|-------|------|------|
| No jobsite pins | `grep jobsite` = **0**. Subscribe 1451–1489: flights, military, vessels, satellites, earthquakes, fires, launches, legislatures, permits. First paint 1560–1566 same live feeds. No `loadJobsite()`. Prefixes `flt-` `mil-` `ves-` `sat-` `orbit-` `eq-` `fire-` `msn-` `leg-` `ahj-`. No `job-`. | **GO** |
| Jobsite hole stays a desk, not a map | Layer on does not spawn billboards. Store default still `{ on: false, count: 0 }`. Everyday §6 / evidence-gate rows = 0. | **GO** |
| Peek hover SAT only | `MOUSE_MOVE` 1383–1398 → `pickSatId` (sats map, 24px) → `currentContact` → `kind === "satellite"` only. Cockpit / tracked / same-id skip. | **GO** |
| Peek does not fly | Hover path is `setPeek` only. No `flyTo` / `lookupPlace` / `track` / `trackNearest` on move. | **GO** |
| Peek ≠ Insight | No `setInsight`. Click track is LEFT_CLICK 1365–1379 (explicit), not hover. | **GO** |
| No Rest / no 16k | Permit extras from `permitMarks` only. No Rest fetch. Flight cap `REGION_CAP`. | **GO** |
| No auto-zoom from hover | Camera primitives stay `flyTo` / `trackNearest` / share restore. Callers own Look here. | **GO** |

Everyday: globe does not lie with jobsite pins; satellite card waits for hover; Look here is not this path. Serious: 0 honest hole on the globe; no auto-truth; no auto-zoom from peek.

## Execute

None. GO → stop.

## Verification

`npm.cmd run typecheck` (`tsc --noEmit`) **PASS**. `globeEngine.ts` not edited.

## Leftovers (not this file / not this hour)

1. Operator SAT hover FAIL (hour0-11 / cycle-3-11) is still unverified without SAT layer on + smoke T+3:45. Disk pick path exists; widening pick would be a new feature. Not a proven FAIL this hour.
2. Geocode `48_000` vs AHJ `80_000` — nav leftover, not peek/jobsite.
3. PeekCard Follow this / Esc — seats 11 / 10.

OPSEC: localhost harden. No municipality samples. Live gevradio frozen. Not a ship.
