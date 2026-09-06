# Hour 3 AUDIT — seat 15 `search-lite.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/permit/search-lite.ts` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** hour 3 audit-heavy · no new features

## Verdict: **GO** after FAIL patch

Chat `pickAhjCore` is Core only. Drawer `searchAhj` Extra/More OK. No Rest import. No invented coords.

## Audit

| Gate | Disk | |
|------|------|---|
| `pickAhjCore` = chat Core only | Pool = `CORE_PLACES`. Guard `CORE_IDS`. `insight-local.ts` imports `pickAhjCore` (not this seat). Extra id never returned. | **GO** |
| `searchAhj` drawer Extra/More | `SEARCHABLE` = 79+462+699. `DeskDrawer` uses `searchAhj`. `Hoover` → `al-hoover`. | **GO** |
| No Rest import | No `places-rest` / `places.ts` / `catalog.ts`. | **GO** |
| Portland miss; `Portland, OR` hits | Two cores → miss. `, OR` → `or-portland`. | **GO** |
| Extra unique names miss in chat | `Hoover` miss. **FAIL found:** Extra `York` substring-stole `ny-nyc`; More `Chester` stole `nh-manchester`. | **FAIL → patched** |
| No invented coords | `PlaceDesk` has no lat/lon. `ahjHasFeaturedCoords` is membership. Featured numbers stay in `permit-pins.ts`. | **GO** |

Everyday: named core → card; hole stays hole. Serious: Core/featured chat; Rest is a count; portals unverified (not this file).

## Execute

`isDrawerOnlyName`: Extra/More exact name that is not a Core name → chat miss. Drawer `searchAhj` / `pickAhj` unchanged.

Re-audit: `York` / `Chester` / `Hoover` miss. `Miami` / `nyc` / `Portland, OR` core. Steal list empty. `tsc --noEmit` **PASS**.

## Leftover (not FAIL vs gates)

Same-string Extra as a Core (`Newark` → `nj-newark`) is Core-only by law. Type `Newark, DE` for miss (no DE core). Drawer still has Extra.

## Ship?

no
