# Hour 3 audit · seat 12 · `src/lib/intel/commands.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Law:** `USEFUL-TOOL.md` — everyday card not yank; serious no auto-zoom  
**This file only.** No new features. Chat parser is not this file.

## Audit

| Law | Disk | Mark |
|-----|------|------|
| `show me {q}` is not flyTo | go prefix is `show me on the globe` only; `^show me\b` → unknown. Scenes `show me fires` / `show me space` stay scenes. | **GO** |
| `open {q}` is not flyTo | go prefix has no `open`. HUD `open radio/corpus/desk` still earlier. | **GO** after FAIL patch |
| Bar fly-ask = take me / fly / go to\|there / jump / navigate / bring me\|us / show me on the globe | that list only, anchored `^` | **GO** |
| `take me to the chamber in` → keptOpen | arm before fly | **GO** |
| Bare `tokyo` flyTo (explicit bar go) | whole-string P0 list unchanged. No city added. | **GO** |

## FAIL leftover (this file)

Leftover `open {q}` (keptOpen miss) returned unknown **after** track prefixes. `open nearest flight` / `open track iss` became **trackNearest** (camera).

## Execute

Moved `if (/^open\b/i.test(text)) return { type: "unknown", text }` to immediately after the `open {q}` keptOpen arm. Track / go / coord / bare cannot steal it. No new phrases. No demo city.

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` — **PASS** (exit 0).

## Not this seat

`open {kit}` still **keptOpen** (desk, not flyTo). `applyAction` may still fly 1.2Mm (seat 07). Unknown `open` / `show me` may still hit `interpretCommand`.
