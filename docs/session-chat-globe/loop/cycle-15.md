# Cycle — seat 15 `search-lite.ts`

**Class:** public-suite WIP · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/permit/search-lite.ts` only. No Rest. No other `src/`.  
**Law:** `USEFUL-TOOL.md` (everyday + serious) · CLOCK iterate → audit → forecast → execute.

## Iterate (hour 0 leftover)

- Chat already imports `pickAhjCore` (`insight-local.ts`, not this seat).
- Hour-0 pick still used drawer blob match (ahjName / portal). “building” / Extra unique names / two Portlands were weak.
- Extra/More still have no coords. Do not invent.

## Audit

| Audience | Bar | This file |
|----------|-----|-----------|
| Everyday | Named city → card; no yank; miss stays miss | `pickAhjCore("Miami")` = `fl-miami`. `Hoover` (extra) = miss. `building` = miss. `Portland` = miss (two cores). |
| Serious | Core/featured only; unverified portals; no Rest dump | Chat pool = `CORE_PLACES` (79). Guard `CORE_IDS`. Drawer `searchAhj` still Extra/More 1240. Rest never imported. |

PlaceDesk has no lat/lon. Featured 12 coords stay in `permit-pins.ts`. Extra/More none.

## Forecast

Chat stays core-only. Drawer keeps Extra/More typeahead. No Rest. Next cycle (not this seat): empty-state desks, chip copy, stranger smoke. `pickAhjCore` is the chat API; do not point chat at `searchAhj`.

## Execute

- Chat match = name / id, min 3 chars. Not portal / ahjName.
- Trailing `, ST` or ` ST` filters core by state (`Portland, OR` / `Washington DC`).
- Ambiguous exact names miss. Extra/More miss. 2-letter miss.
- `isCoreAhj`. Featured empty-q still 12 cores for drawer home.
- `searchAhj` / `pickAhj` unchanged (command bar + desk).

Smoke: Miami → `fl-miami`; Hoover / Portland / building / `fl` / empty → miss; Portland OR/ME, nyc, Washington DC, Los Angeles → core ids. `tsc --noEmit` PASS.

## Ship?

no · localhost only
