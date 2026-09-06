# Hour 0 — seat 11 PeekCard (DEVELOP)

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/components/intel/PeekCard.tsx` only  
**Clock:** T+0 develop (D-260). Live gevradio frozen.

## Law held

| Rule | This hour |
|------|-----------|
| Peek ≠ Insight | Separate object. Class `holo-card holo-peek`. No Fly / Open desk / Dismiss. Never `setInsight`. |
| Grab stays track | Grab → `engine.track(id)` only. No `flyTo` / `lookupPlace` / `trackNearest`. |
| Insight open | Peek may still show. Visibility gates on `peek` + `cockpit` + satellite kind only. |
| No auto-fly | Hover / mount do not move the camera. Track waits for Grab. |

## Act

- Satellite-only: non-sat `peek.contact` does not render.
- PC clamp: card stays above the ~96px command bar (seat 12).
- Honest Grab: no engine → flash “Globe not ready”; peek stays.
- 5s meter + hover-hold + fade unchanged.

## Verification

- `npm.cmd run typecheck` (`tsc --noEmit`) PASS.
- Playwright / operator hover smoke — hour 3:45, not this file.

## Leftovers (not this file)

1. Hover pick lives in `globeEngine.ts` (seat 13). Last operator report: SAT hover FAIL.
2. `.holo-peek` class has no extra CSS yet (seat 17). Shared glass chrome is enough.
3. Esc-dismiss is T+4 polish. Peek does not steal Esc this hour.
4. Phone / flat map still has no hover peek (by design this sitting).
