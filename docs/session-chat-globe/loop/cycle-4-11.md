# Hour 4 POLISH — seat 11 PeekCard

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/components/intel/PeekCard.tsx` only  
**Phase:** polish. No new features. FORECAST.md not edited.

## Verdict: **GO** (still)

Hour 3 GO stands. Peek ≠ Insight. No FAIL leftover in this file. Execute: note and stop. PeekCard not edited this hour.

## Polish check (disk, unchanged from hour 3)

| Item | Disk | Mark |
|------|------|------|
| Peek ≠ Insight | No `setInsight`. No `flyTo`. Class `holo-peek`. | **GO** |
| Follow this | `engine.track(c.id)` only | **GO** |
| English | Satellite · live feed; Where / How high / How fast knots | **GO** |
| `satFreshness` | Defined L10–16 | **GO** |
| Insight may stay | Gate is peek + cockpit + satellite kind | **GO** |
| Card vs command bar | `BAR_RESERVE = 96` already | **GO** |

Esc-dismiss was an hour-3 leftover tagged T+4. Adding a key handler is a **new feature**. Polish this hour = copy leftovers only. Copy is already English. No Esc steal from first-run / cockpit.

## Execute

None in `PeekCard.tsx`. GO → stop.

## Not this file

SAT hover pick → `globeEngine.ts`. Flat / phone: no hover peek.

## Verification

- PeekCard bytes unchanged from hour 3 GO.
- `npm.cmd run typecheck` (`tsc --noEmit`) PASS. PeekCard not edited.
