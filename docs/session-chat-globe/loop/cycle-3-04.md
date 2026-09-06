# Hour 3 AUDIT — seat 04 `CommsChat.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/components/intel/CommsChat.tsx` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** hour 3 audit-heavy · no new features

## Verdict: **GO**

No FAIL leftover in this file. Note and stop. `src/` not edited this hour.

## Checklist

| Gate | Disk | |
|------|------|---|
| Chips English | `toolLabel`: Legislature / Building desk / Jobsite / Live map. Identity chip `{tool} · {title}`. | **PASS** |
| Look here | Present when `q` or lat/lon. Click → `flyInsight`. No mount fly. | **PASS** |
| Open the file | Present when `desk`. `applyAction desk` + optional layer on. | **PASS** |
| Show on the map | Present when `layer && !desk`. `setLayer` on. | **PASS** |
| flyInsight toast Looking at | Coord + q paths `flash(\`Looking at …\`)`. No `Flying to` in file. | **PASS** |
| Desk does not close comms | Open the file never `setOpen(false)`. Only header Close comms does. | **PASS** |
| No auto-zoom | Card chip = `setInsight` only. Camera only on Look here click. | **PASS** |

Everyday: talk in English; card not a yank; Look here optional; feeds via Show on the map. Serious: human final call on fly/desk; comms stay open with a desk.

## Execute

None. GO → stop.

## Leftover (not FAIL)

ISS `q` path has no toast (InsightCard flashes “Looking at the ISS”). Not `Flying to`. Not patched this hour.

## Ship?

no
