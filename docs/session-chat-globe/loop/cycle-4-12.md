# Hour 4 polish · seat 12 · `src/lib/intel/commands.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No new features. Did not edit `commands.ts`. Did not edit FORECAST.md.

## Confirm GO

Hour 3 patch is on disk: leftover `open {q}` returns `{ type: "unknown" }` immediately after the keptOpen arm (`commands.ts` 142). Track / go / coord / bare cannot steal it.

| Law | Disk | Mark |
|-----|------|------|
| `show me {q}` is not flyTo | `show me on the globe` only; `^show me\b` → unknown | **GO** |
| `open {q}` is not flyTo | no `open` in go prefix; leftover unknown before track | **GO** |
| Bar fly-ask only | take me / fly / go to\|there / jump / navigate / bring me\|us / show me on the globe | **GO** |
| `take me to the chamber in` | keptOpen before fly | **GO** |
| Bare `tokyo` | whole-string P0 flyTo. No city added. | **GO** |

## Stop

GO. No polish edit in this file. Copy leftovers are not command grammar.

## Not this seat

`open {kit}` still keptOpen. `applyAction` may still fly 1.2Mm. Unknown may still hit `interpretCommand`.
