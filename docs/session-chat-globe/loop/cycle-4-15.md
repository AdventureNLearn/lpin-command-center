# Hour 4 POLISH — seat 15 `search-lite.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/permit/search-lite.ts` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** hour 4 polish-closeout · no new features

## Verdict: **GO**

Hour 3 FAIL patch still on disk. `pickAhjCore` is Core only. No Rest import. Note and stop. `src/` not edited this hour.

## Re-check

| Gate | Disk | |
|------|------|---|
| Chat Core only | `filterChatHits` → `CORE_PLACES`. `CORE_IDS` guard. `isDrawerOnlyName` (York ≠ NYC). `insight-local.ts` still `pickAhjCore`. | **GO** |
| Extra unique miss | `isDrawerOnlyName` before pick. Extra/More exact names that are not Core names miss. | **GO** |
| Drawer Extra/More | `searchAhj` still `SEARCHABLE` (core+extra+more). Rest never. | **GO** |
| No Rest import | No `places-rest` / `places.ts` / `catalog.ts`. | **GO** |
| No invented coords | No lat/lon values. Featured numbers stay in `permit-pins.ts`. | **GO** |

Copy leftovers: same-string Extra as a Core (`Newark` → `nj-newark`) is Core-only by law, not a polish rewrite.

## Execute

None. GO → stop.

`tsc --noEmit` **PASS** (no `search-lite.ts` change).

## Ship?

no
