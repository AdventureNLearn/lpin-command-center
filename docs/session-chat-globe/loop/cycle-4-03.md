# Hour 4 POLISH — seat 03 `InsightCard.tsx`

**Class:** public-suite WIP · **Not a ship** · **Phase:** polish-closeout  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/InsightCard.tsx` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`

No new features. No FORECAST.md.

## Polish re-check (Hour 3 GO still holds)

| Check | Disk | Verdict |
|-------|------|---------|
| Buttons exactly Look here / Open the file / Show on the map / Close | L58 / L63 / L68 / L76 | **GO** |
| Look here click-only (no mount fly) | `fly()` only from Look here `onClick`. No `useEffect` | **GO** |
| ISS Look here → `trackNearest` iss, not flyTo 0,0 | L21–25 before lat/lon | **GO** |
| Peek not imported | No Peek / PeekCard / `setPeek` | **GO** |
| Toasts Looking at, not Flying to | L23 / L29 / L34 | **GO** |
| No auto-score | title / body / `source` only | **GO** |

**Verdict: still GO.** Everyday: Look here optional. Serious: human final call, no auto-truth / auto-zoom.

## Execute

None. File unchanged. Note and stop.

## Leftovers (not this seat)

Same as Hour 3: desk `applyAction` closes comms; ISS body “Fly tracks”; `.holo-grab` chrome.
