# Hour 3 AUDIT — seat 03 `InsightCard.tsx`

**Class:** public-suite WIP · **Not a ship** · **Phase:** audit-heavy  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/InsightCard.tsx` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`

No new features. No FORECAST.md. No other CLOCK files.

## Audit

| Check | Disk | Verdict |
|-------|------|---------|
| Buttons exactly Look here / Open the file / Show on the map / Close | L58 / L63 / L68 / L76 | **GO** |
| Look here is click-only (no mount fly) | `fly()` only from Look here `onClick`. No `useEffect`. Card mount does not call engine or `applyAction` | **GO** |
| ISS Look here is `trackNearest` iss, not `flyTo` 0,0 | L21–25: ISS `q` → `applyAction({ type: "trackNearest", kind: "iss" })` **before** lat/lon | **GO** |
| Peek not imported | Imports: store, runCommand, insight types, `LAYER_META`. No Peek / PeekCard / `setPeek` | **GO** |
| Toasts Looking at, not Flying to | L23 / L29 / L34 `Looking at …`. No `Flying to` | **GO** |
| No auto-score | Renders title / body / `source`. No tri-state, no +1/0/−1, no claim score | **GO** |

**Verdict: GO.** Everyday: Look here optional, card not a yank. Serious: delayed source on the glass, human final call, no auto-truth / auto-zoom.

## Execute

None. This file has no FAIL leftover. Note and stop.

## Leftovers (not this seat)

- `applyAction` desk still closes comms (serious: keep chat + desk) — `runCommand.ts`
- ISS body in `insight-local.ts` still says “Fly tracks”
- `.holo-grab` chrome — `styles.css`
