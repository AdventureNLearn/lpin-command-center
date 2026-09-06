# Hour 4 POLISH — seat 13 `globeEngine.ts`

**Class:** public-suite WIP · **Not a ship** · **Phase:** polish-closeout  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/lib/intel/globeEngine.ts` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`

No new features. No FORECAST.md.

## Verdict: **GO** (still)

Hour 3 GO stands. No jobsite pins. Peek hover SAT only, does not fly. No FAIL leftover in this file. Execute: note and stop. `src/` not edited this hour.

## Polish re-check

| Check | Disk | Mark |
|-------|------|------|
| No jobsite pins | `grep jobsite` = **0**. Subscribe: flights…launches + LEG + AHJ. No `loadJobsite()`. No `job-`. | **GO** |
| Peek hover SAT only | `MOUSE_MOVE` 1383–1398 → `pickSatId` → `kind === "satellite"`. `setPeek` only. | **GO** |
| Peek does not fly | No `flyTo` / `track` on move. | **GO** |
| Copy leftovers | Boot/geo flashes only (`We're in. Everything here is public.`). Not card chrome. No jargon FAIL. | **GO** |

Widening SAT pick (hour0-11 leftover) is a **new feature**. Polish = copy leftovers only. Not this hour.

Everyday: globe does not dump jobsite pins; Look here is not hover. Serious: 0 honest hole on the globe; no auto-zoom from peek.

## Execute

None. GO → stop.

## Verification

`npm.cmd run typecheck` (`tsc --noEmit`) **PASS**. `globeEngine.ts` not edited.

OPSEC: localhost harden. Live gevradio frozen. Not a ship.
