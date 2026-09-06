# Hour 3 AUDIT — seat 11 PeekCard

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/components/intel/PeekCard.tsx` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** audit-heavy. No new features.

## Verdict: **GO**

No FAIL leftover in this file. Execute: note and stop. PeekCard not edited this hour.

## Checklist (disk)

| Law | Disk | Mark |
|-----|------|------|
| Peek ≠ Insight | No `setInsight`. No `flyTo` / `lookupPlace` / `trackNearest`. Class `holo-peek`. No Insight import. | **GO** |
| Follow this → track only | `grab()` → `st.engine.track(c.id)` then `setPeek(null)`. | **GO** |
| English | Kicker `Satellite · {satFreshness}`. Grid Where / How high / How fast `knots`. Button **Follow this**. | **GO** |
| `satFreshness` defined | L10–16: live feed / delayed / modeled / feed error / off. | **GO** |
| Insight may stay open | Render gate is `!peek \|\| cockpit` then satellite kind. No `insight` subscribe. | **GO** |
| No auto-zoom | Hover / mount do not call camera. Track waits for Follow this. | **GO** |
| Everyday | Card in English. Follow optional. Not classified theater. | **GO** |
| Serious | Source row + NORAD via `c.meta`. Freshness labeled. No auto-truth. | **GO** |

## Not this file (leftover elsewhere)

1. SAT hover pick / last operator FAIL → `globeEngine.ts` (seat 13).
2. Esc-dismiss → T+4 polish, not hour 3.
3. Flat / phone: no hover peek (this sitting).

## Execute

None in `PeekCard.tsx`. GO → stop.

## Verification

- `npm.cmd run typecheck` (`tsc --noEmit`) PASS. PeekCard not edited.
