# Hour 0 DEVELOP — seat 15 `search-lite.ts`

**Class:** public-suite WIP · 4h loop · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/permit/search-lite.ts` only. No Rest. No other `src/`.

## Act

- `SEARCHABLE` stays Core + Extra + More (**79 + 462 + 699 = 1240**). No `places-rest` / `places.ts` / `catalog.ts`.
- Drawer typeahead `searchAhj` unchanged in contract: empty q = featured 12; typed substring cap 40 (Extra/More included).
- Chat path added: `searchAhjCore` / `pickAhjCore`. Extra/More = **miss** (no `desk.id`). Command-bar unique/exact stays `pickAhj` on the 1240.
- `ahjHasFeaturedCoords(id)` is membership on the featured 12 only. `PlaceDesk` has **no lat/lon**. Extra/More have none. Non-featured core have none here. Featured numbers stay in `permit-pins.ts` `FEATURED_COORDS`. **Did not invent coords.**
- O(1) `BY_ID` / layer sets. `SEARCH_LITE_COUNTS` exported. Rest id → `undefined` layer / miss lookup.

## Honesty leftover (not this seat)

`insight-local.ts` still calls `searchAhj` (seat 01). Unique Extra/More names can still become a chat `desk.id` until that file switches to `pickAhjCore`. Pins / Fly numbers stay in `permit-pins.ts` (not this file).

## Verify

`tsc --noEmit` PASS. Slice counts 79/462/699/1240. Featured 12 all in core. File has no Rest import. No lat/lon values added.

## Ship?

no · localhost only · hour 0 develop
