# SEAT 15 — Places layers (KIT-04 prep)

Seat: 15 · band: later kits · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This file is **prep only**. It does not implement KIT-04. It does not patch `src/`.  
It does not copy, list, or paste `places-rest.ts` ids, names, or URLs.

**Claim:** Permit typeahead can run on CORE + EXTRA + MORE (1240 desks) without Rest. The blocker is a static import, not missing search code.

**Verdict:** PREP READY. Do not implement this sitting.

---

## Scope

KIT-04 is the **PermitAdapter** inside later KIT-02 `DeskDrawer`. Smoke this sitting is still a permit **count card** (`permit-index.json` via `src/lib/intel/corpus.ts`). KIT-04 search is later.

Owner contract (do not re-litigate): `docs/corpus-audit/13-drawer-contract.md` §KIT-04.

1. Search `places.ts` (CORE) + `places-extra.ts` + `places-more.ts`.
2. **Never** import or search `places-rest.ts` on first paint.
3. Result row: name, kind, state, portal URL, confidence chip.
4. Card: AHJ + portal + `DISCLAIMER` always on. Factory URLs unverified. No fee tables.
5. Break the Rest concat in `places.ts` before the globe bundles Rest.

---

## 1. Export inventory (grep `^export`)

No `places-core.ts`. Core lives as an **unexported** `const CORE_PLACES` inside `places.ts`.

### `src/lib/permit/places.ts`

| Export | Kind | Role for KIT-04 |
| --- | --- | --- |
| `PLACES` | `PlaceDesk[]` | Concat of CORE + EXTRA + MORE + **REST**. Do not import as-is. |
| `getPlace(id)` | fn | Lookup on the full concat map (includes Rest ids). |
| `placeLayer(id)` | fn | `"core" \| "extra" \| "more" \| "rest" \| undefined`. Core/extra/more sets first; anything else in `BY_ID` is `"rest"`. |
| `portalConfidence(id)` | fn | `"higher"` if core, else `"provisional"`. **Binary. Extra/more are lumped with Rest.** |
| `placesInState(code)` | fn | State index over full `PLACES` (Rest included). |
| `searchPlaces(query)` | fn | Substring filter over full `PLACES`. **Typed queries walk Rest.** |

Imports (not exports): `EXTRA_PLACES`, `MORE_PLACES`, **`REST_PLACES`** (static).  
Not exported: `CORE_PLACES`, `CORE_IDS`, `EXTRA_IDS`, `MORE_IDS`, `BY_ID`, `STATE_INDEX`.

### `src/lib/permit/places-extra.ts`

| Export | Kind | Role |
| --- | --- | --- |
| `p(...)` | factory | Compact `PlaceDesk` builder. One function. Not a place. Extra/more/rest all call it. |
| `EXTRA_PLACES` | `PlaceDesk[]` | Named AHJs. **No Rest import.** |

### `src/lib/permit/places-more.ts`

| Export | Kind | Role |
| --- | --- | --- |
| `MORE_PLACES` | `PlaceDesk[]` | Remaining named AHJs (typically 50k+ / extra counties / territories). Imports `p` from extra only. **No Rest import.** |

### `src/lib/permit/places-rest.ts` (cite only — do not copy)

| Export | Kind | Role |
| --- | --- | --- |
| `REST_PLACES` | `PlaceDesk[]` | Census-gazetteer remainder. Count only until KIT-06. Header on disk: remaining US county-equivalents and municipal AHJs; no overlap with CORE/EXTRA/MORE ids. |

Only `places.ts` static-imports that module. Integrity tests parse it with regex (`scripts/permit/catalog-integrity.test.mjs`) and must stay out of the globe bundle.

### `src/lib/permit/catalog.ts` (search owner, Rest-tainted today)

Exports used by KIT-04 later: `CatalogHit`, `searchCatalog`, `FEATURED_PLACE_IDS`, `FEATURED_PLACES`, `buildDesk`, `placeCount`, `CombinedDesk`.  
Imports from `./places`: `getPlace`, `PLACES`, `searchPlaces` — **any UI import of `catalog.ts` currently pulls Rest through `places.ts`.**  
No route or component imports `catalog.ts` today. Smoke corpus loader does not.

### `src/lib/permit/types.ts` (card shape)

`PlaceDesk`: `id`, `name`, `kind: "city" \| "county" \| "district"`, `state`, optional `county` / `populationRank` / `phone` / `extraPermits` / `extraHolds`, plus `ahjName`, `portalName`, `portalUrl`, `departmentUrl`, `notes[]`, `extraLinks[]`.  
`DISCLAIMER` (always on the KIT-04 card): guidance only — not legal advice, not a city login, not a substitute for adopted code or the AHJ.

---

## 2. Layer counts (named searchable vs Rest count)

Seat-03 independent unique-id counts already match `_out/permit-index.json`. This seat recounts CORE/EXTRA/MORE only (`kind` objects / `p("` calls). Rest is the index integer, not a dump.

| Layer | Index | This seat | File bytes | Search on first paint |
| --- | ---: | ---: | ---: | --- |
| core | 79 | 79 | 40666 | yes |
| extra | 462 | 462 | 69888 | yes |
| more | 699 | 699 | 103630 | yes |
| **named sum** | **1240** | **1240** | **~214 KB** | **KIT-04 typeahead** |
| rest | 14925 | count only | ~3.37 MB (not opened into this file) | **no** |
| total | 16165 | — | — | Rest stays the count card |

Zero cross-layer id overlap (seat 03). Extra `export function p(` is one line and is not a place.

Core kinds on disk: 76 city / 2 county (`fl-miami-dade`, `fl-palm-beach-county`) / 1 district (`dc-washington`). Extra/more kinds: seat 03 table; not re-listed here.

Empty-query featured twelve (`FEATURED_PLACE_IDS`) are **all CORE**:

`fl-miami`, `fl-miami-dade`, `ny-nyc`, `ca-los-angeles`, `tx-houston`, `il-chicago`, `wa-seattle`, `ga-atlanta`, `pa-philadelphia`, `az-phoenix`, `co-denver`, `dc-washington`.

---

## 3. How search works today

`searchPlaces` (`places.ts`):

1. Trim + lower the query.
2. Empty query → `PLACES.slice(0, 40)`. Concat order is CORE, EXTRA, MORE, REST, so the empty slice is accidentally CORE-only (79 ≥ 40). **This is not a Rest fence.**
3. Typed query → compact hyphens (`"fort pierce"` → `"fort-pierce"`). Filter `PLACES` where
   `name state county ahjName portalName` blob contains `q` **or** `id` contains the compact form.
4. Cap 80.

`searchCatalog` (`catalog.ts`):

1. Empty query → `FEATURED_PLACES` (12 CORE hits). Does **not** call empty `searchPlaces`.
2. Typed query → all `searchPlaces` hits as `kind: "place"`, then substring on `STATES` (`code name modelBase`) and `PLAYBOOKS` (`label summary relatedPermits` / hyphenated id). Cap **40** total.
3. Place hit: title `"${name}, ${state}"`, subtitle `ahjName`, href `/place/${id}`.

`placeCount()` returns `PLACES.length` (16165 with Rest). KIT-04 UI must not use that number as “searchable desks.” Show named 1240; Rest stays `permit-index` `counts.rest`.

`portalConfidence` today: core = higher; extra **and** more **and** rest = provisional. Drawer contract wants three chips: core = higher; extra/more = **mid**; rest (later) = provisional research seed.

---

## 4. How search works **without** Rest

Named layers already have the fields the typeahead needs. Extra and more do not import Rest. Core does not need Rest. The only Rest edge is `places.ts` line 4 + the `PLACES` concat.

### Searchable set (KIT-04)

```
SEARCHABLE = CORE_PLACES + EXTRA_PLACES + MORE_PLACES   // 79 + 462 + 699 = 1240
```

Reuse the existing blob/id matcher on `SEARCHABLE`, not on `PLACES`. Empty typeahead = `FEATURED_PLACE_IDS` resolved from CORE (do not use `PLACES.slice(0, 40)`). Cap stays 40 at the catalog / 80 at the place filter.

`STATES` + `PLAYBOOKS` stay in `searchCatalog` if the adapter wants them; those modules do not import Rest.

`buildDesk(state, placeId, kind)` only needs `getPlace` for the selected named id. After the split, a CORE/EXTRA/MORE map is enough.

`placeLayer` on the named map: return `core | extra | more`; unknown id → `undefined` (do not invent `"rest"` for a miss). Rest layer is KIT-06 opt-in.

Chip map for the adapter (extend; do not keep the binary helper as the UI source of truth):

| Layer | Chip | Meaning |
| --- | --- | --- |
| core | higher | Hand-written major AHJ with named portal |
| extra / more | mid | Named factory AHJ; URL unverified |
| rest (KIT-06 only) | provisional | Research seed; not first paint |

Card always renders `types.DISCLAIMER`. `factory_urls_verified` stays false. No fees.

### Import graph the later implementer must cut

```
TODAY (Rest on any places.ts import)
  catalog.ts ──► places.ts ──► places-rest.ts   (~3.37 MB)
                    ├── places-extra.ts
                    └── places-more.ts

KIT-04 FIRST PAINT
  PermitAdapter ──► CORE (export it) + EXTRA_PLACES + MORE_PLACES
                ──► types.DISCLAIMER
                ──x  places-rest.ts
                ──x  current places.ts barrel
                ──x  current catalog.ts (until it stops importing PLACES)

SMOKE (already)
  corpus.ts ──► vendor/kept/_out/permit-index.json counts only
```

`src/lib/intel/corpus.ts` already reads the count card. That path must stay Rest-free.

### Split options (later KIT-04, pick one; this seat does not patch)

1. **Export `CORE_PLACES`. Delete the `REST_PLACES` static import from `places.ts`.** `PLACES` / `searchPlaces` / `placesInState` become named-only. Lazy `import("./places-rest")` only from KIT-06 (search hit / state pack / county-scale camera). Smallest diff.
2. **New named barrel** (`places-named.ts` or export `SEARCHABLE_PLACES`) that concatenates CORE+EXTRA+MORE. KIT-04 imports that. Current `places.ts` stays a forbidden barrel until Rest is lazy.
3. **Optional `places-core.ts`.** Seat 03 already noted there is none. Not required if `CORE_PLACES` is exported.

Integrity tests may keep regex-counting Rest on disk. They must not `import` `REST_PLACES` into the app graph.

### What typed search can find without Rest

1240 named desks. Core majors + extra named cities/counties + more remaining large places. Enough for KIT-04 typeahead and later KIT-05 `find AHJ in {named place}`. Small Census munis that exist only on Rest stay a **count** until KIT-06. Honest miss: “not in named catalog (1240). Rest is 14925 and is not loaded.”

---

## 5. Later KIT-04 touch list (do not execute)

Prep for the implementer. Not this sitting.

- `src/lib/permit/places.ts` — export CORE; break Rest concat; `searchPlaces` / `BY_ID` on named layers.
- `src/lib/permit/catalog.ts` — stop importing `PLACES`; empty query = featured CORE; `placeCount` must not report Rest as searchable.
- `portalConfidence` or a new chip helper — three values (higher / mid / provisional).
- New `src/components/desks/` PermitAdapter (needs KIT-02 drawer). Typeahead + card + disclaimer.
- Do **not** add AHJ pins here. Pins are KIT-06 zoom-gated. Layer AHJ stays default **off**.
- Do **not** steal `building desk {place}` in KIT-01 layer regexes (KIT-00/01 contract).

---

## 6. Do-not

- Do not implement KIT-04 from this file.
- Do not edit `src/`, `_out/`, `kits/`, `package.json`.
- Do not import `places-rest.ts` or the current `places.ts` barrel on first paint.
- Do not copy Rest ids, names, URLs, or pin rows into docs or UI.
- Do not search Rest “just this once.”
- Do not plot 16,165 / 14,925 desks.
- Do not mark factory portal URLs verified. Do not invent fees.
- Do not treat `placeCount()` 16165 as the typeahead universe.
- Do not treat extra/more `provisional` (today’s binary helper) as the shipped chip; named layers are **mid**.
- Do not iframe hivepermitdev as the adapter.

---

## 7. E / I / A

**E — Evidence (disk, this tree)**

- `_out/permit-index.json`: core 79 / extra 462 / more 699 / rest 14925; `rest_is_count_not_map: true`; `factory_urls_verified: false`; lock 2026-08-18.
- This seat: 79 `kind` objects in `places.ts`; 462 `p("` in extra; 699 `p("` in more; named sum **1240**. Files 40666 / 69888 / 103630 bytes.
- Grep `^export`: places.ts = `PLACES`, `getPlace`, `placeLayer`, `portalConfidence`, `placesInState`, `searchPlaces`. Extra = `p`, `EXTRA_PLACES`. More = `MORE_PLACES`. `CORE_PLACES` is not exported.
- `places.ts` line 4 static-imports `REST_PLACES`; line 636 concatenates it into `PLACES`. `searchPlaces` filters that array (cap 80). Empty slice is CORE-only only because concat order puts CORE first.
- `catalog.ts` `searchCatalog` empty path uses 12 CORE `FEATURED_PLACE_IDS`; typed path calls `searchPlaces` (Rest-tainted). No UI importer of `catalog.ts` yet.
- `corpus.ts` loads permit-index counts only. Smoke does not import `places.ts`.
- `PlaceDesk` + `DISCLAIMER` live in `types.ts`. `portalConfidence` is two-valued.
- Extra/more import `p` only. They do not import Rest.
- Drawer contract: KIT-04 typeahead Core+Extra+More; break Rest import before the globe bundles Rest.

**I — Inference**

- Search quality does not require Rest. The matcher is a 1240-row substring over name/state/county/AHJ/portal/id. Rest is a bundle and pin-dump risk, not a typeahead requirement.
- KIT-04 is an import-graph change plus a chip remap, not a new search language. Reuse `searchPlaces`’s blob/id test on `SEARCHABLE`.
- Shipping current `catalog.searchCatalog` or `places.ts` into the drawer would silently put ~3.37 MB Rest in the globe graph even with AHJ off.
- Honest empty for a Rest-only muni is better than loading 14925 rows to satisfy one query.

**A — Assumption**

- Later KIT-04 will export CORE and cut the Rest static import (or add a named barrel) before any PermitAdapter import.
- Operators will not treat this prep file as “search shipped.”
- KIT-06 may lazy-load Rest after explicit search / state pack / county-scale camera; that opt-in is out of KIT-04.
- Integrity tests can keep counting Rest on disk without putting it in the client bundle.
- Featured twelve remain CORE after the split, so empty typeahead does not need Rest or Extra.

---

Stop. Do not start KIT-04 in the same turn as this prep.
