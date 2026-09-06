# Hour 3 AUDIT · seat 05 · `src/lib/intel/comms.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** audit-heavy · this file only · no new features

## Verdict: **GO**

No src edit this hour. Execute = note and stop.

## Checklist

| # | Gate | Disk | Mark |
|---|------|------|------|
| 1 | Greeting plain English | L34–38: ask in English; card; Look here optional; no yank; incomplete empty | **GO** |
| 2 | Chips Japan / ISS / planes, no roast | L185–187 Earth: `What's over Japan?` / ISS / `Any planes up?`. Comment L168 no roast. No tea / roast / classified-planes | **GO** |
| 3 | Unasked flyTo / layer / trackNearest → cards | flyTo L213–216 `askedToMove` else `insightFromFlyQuery`. layer L266–275 `askedToToggleLayer` else Insight + layer. trackNearest L235–246 ask (move/track/lock/grab/follow) else `insightFromTrackKind` (ISS `q` or layer, not `q:"flight"`) | **GO** |
| 4 | Dark + catch still card from kits | `!res.ok` L314–332 and catch L366–383: `cardForAsk` → `insightFromUserText` / stripped fly-ask / iso2 kept. `setInsight` if local | **GO** |
| 5 | `flyAskAction` only when `askedToMove` | L125–126 `if (!askedToMove(text)) return null` then `parseCommand` flyTo / trackNearest / keptOpen / flyToCoord | **GO** |
| 6 | comms does not `setDesk(null)` | No `setDesk` in this file. Only `setInsight` | **GO** |

## Everyday / serious

- Stranger chips card without yank (Japan kit, ISS, planes layer). Look here is the human.
- Dark fly-ask still cards (strip + kits) and flies only if `askedToMove`.
- Desk stays: this module never closes it.

## Leftovers (not FAIL this hour)

ACTION `style` / `radio` still apply with no ask (not camera). Bubble labels = seat 04. SYSTEM = seat 06.

## Execute

**None.** All six gates GO.

## Verify

No `comms.ts` edit. `tsc --noEmit` not required this seat this hour.
