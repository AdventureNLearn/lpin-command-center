# SEAT H07 — PERMIT SEARCH

Seat: **H07 PERMIT SEARCH**. Harden pass (15 seats). Coordinator: Host Grok Build.
Target class: public-suite. Tree: `REPO_ROOT`.
Date: 2026-08-29. **This file only.** Did not edit `src/`, `_out/`, or `kits/`.
Did not import, copy, or list `places-rest.ts` ids, hostnames, or pin rows.

Parent contracts: `docs/dev-team/03-lead-permit.md` (KIT-04), `docs/dev-team/16-confidence.md` (chips), `docs/dev-team/17-no-rest.md` (import graph).
Next kit (not this seat): KIT-06 zoom gate. Draft `src/lib/permit/permit-pins.ts` exists; engine not wired.

**Claim:** KIT-04 search is on disk through `search-lite.ts` (Core + Extra + More, 1240). Chips are higher/mid. Featured empty-query is 12 core metros. `DISCLAIMER` is the permit drawer footer. `catalog.ts` still pulls Rest — do not import it. Rest opt-in belongs in KIT-06, not here.

---

## Verdict

**PASS (KIT-04 search path). WATCH (`catalog.ts` Rest fuse).**

| Path | Rest in graph? | Use? |
| --- | --- | --- |
| `search-lite.ts` → `places-core` + extra + more | **No** | **Live.** DeskDrawer + `runCommand` |
| `places-core.ts` `export const CORE_PLACES` | **No** | **Live.** 79 core desks |
| `catalog.ts` → `places.ts` → `places-rest.ts` | **Yes** | **Do not import.** Orphan poison |
| `places.ts` `searchPlaces` / `PLACES` | **Yes** | **Do not call from HUD** |
| `permit-pins.ts` | No Rest import | Draft only. KIT-06. Not this seat |

HUD first paint mounts `DeskDrawer`, which static-imports `search-lite`. That bundles **1240** searchable desks (core 79 + extra 462 + more 699). It does **not** bundle Rest. OverlayHud source still has no `places-rest` string (`docs/corpus-audit/smoke-corpus.mjs`).

**BLOCK would fire if** DeskDrawer, OverlayHud, `runCommand`, or `search-lite` imported `places-rest`, current `catalog.ts`, or `places.ts`. They do not.

---

## 1. Live search — `search-lite.ts`

File: `src/lib/permit/search-lite.ts`.

```ts
import { CORE_PLACES } from "./places-core";
import { EXTRA_PLACES } from "./places-extra";
import { MORE_PLACES } from "./places-more";

export type PermitLayer = "core" | "extra" | "more";
export type PermitChip = "higher" | "mid";

const SEARCHABLE: PlaceDesk[] = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES];
```

No `places-rest`. No `places.ts`. Layer type has **no** `"rest"`. Chip type has **no** `"provisional"`. That is the KIT-04 surface.

| Export | Behavior |
| --- | --- |
| `SEARCHABLE` (module-private) | Core + Extra + More only. **1240.** |
| `permitLayer(id)` | `"core"` / `"extra"` / `"more"` / `undefined`. Rest ids return `undefined`. |
| `permitChip(id)` | `core → higher`, else **`mid`**. |
| `getSearchablePlace(id)` | Lookup on `SEARCHABLE` only. Rest ids miss. |
| `searchAhj(query)` | Empty q → featured 12. Else substring on name/state/county/ahj/portal/id, **slice 40**. |
| `FEATURED_AHJ_IDS` | 12 core ids (see §4). |

Importers (live):

| File | What it takes |
| --- | --- |
| `src/components/desks/DeskDrawer.tsx` | `getSearchablePlace`, `permitChip`, `searchAhj` |
| `src/lib/intel/runCommand.ts` | `searchAhj` for `permitSearch` |
| `src/lib/permit/permit-pins.ts` | featured + `searchAhj` — **draft, unwired** |

Typeahead copy in the drawer: `{n} AHJ hits · Rest not searched`. Empty query line: `Featured core metros. Extra/More searchable. Rest is a count, not in this list.` Miss: `No Core/Extra/More hit.`

Commands (`src/lib/intel/commands.ts`), after empty desk open, before flyTo `open`:

- `find AHJ in {place}` → `{ type: "permitSearch", q }`
- `building desk {place}` → same
- Bare `open building desk` / `open permit desk` stays empty permit home (KIT-02). Does not steal `show permits` (layer).

`applyAction` `permitSearch`: one exact name or a unique hit opens that desk id and `lookupPlace(name + state)` if the engine already knows the name. Else `id = "search:{q}"` (hit list). **No invented lat/lon. No Rest lookup.**

---

## 2. `places-core.ts` export

`CORE_PLACES` **is exported**. Seat 15 / 16 / 17 prep files said it lived unexported inside `places.ts`. That is stale.

```3:3:src/lib/permit/places-core.ts
export const CORE_PLACES: PlaceDesk[] = [
```

Disk unique ids with `kind` `city|county|district`: **79**. Matches `permit-index.json` `counts.core`. Integrity test `scripts/permit/catalog-integrity.test.mjs` now parses `places-core.ts` (not `places.ts`) for core.

`places.ts` re-imports `CORE_PLACES` from `./places-core` **and still static-imports `REST_PLACES`**. Core leaving `places.ts` is what made `search-lite` Rest-safe. The concat file is still poisoned.

---

## 3. Chip map — higher / mid (KIT-04)

Bind seat 16. Tokens on this kit are **two**, not three.

| Layer | Count | Chip | Visible | This kit |
| --- | ---: | --- | --- | --- |
| core | 79 | `higher` | Higher | searchable |
| extra | 462 | `mid` | Mid | searchable |
| more | 699 | `mid` | Mid | searchable |
| rest | 14925 | `provisional` | — | **not returned. KIT-06 opt-in only.** |

Chip = catalog **layer**, not URL liveness, not fees, not a map. Extra and more share mid (factory `p()` uses one URL for portal and department). Do not promote extra/more to higher. Do not green a chip. Never say “verified.”

`search-lite.permitChip` implements that map for searchable ids. Drawer `Chip` renders the token as uppercase muted text next to the name on hits and on the card.

`places.ts` `portalConfidence` is still binary (`higher` \| `provisional`) and lumps extra/more with Rest. **Do not call it from the drawer.** Follow `permitChip`.

Unknown / Rest ids are not in `SEARCHABLE`, so `getSearchablePlace` cannot open a Rest card. (`permitChip` would fall through to `mid` if handed a non-core id; the UI does not hand it one.)

Honesty flags (`vendor/kept/_out/permit-index.json`, lock **2026-08-18**):

| Flag | Value | Stay |
| --- | --- | --- |
| `factory_urls_verified` | `false` | **must stay false** |
| `fees_invented` | `false` | stay false |
| `rest_is_count_not_map` | `true` | stay true |
| `counted_from_disk` | `true` | 79 / 462 / 699 / 14925 = **16165** |

Card copy already says `portal not verified`. Do not fetch portals to upgrade chips. No fee tables.

---

## 4. Featured 12

`FEATURED_AHJ_IDS` in `search-lite.ts` (same 12 as `FEATURED_PLACE_IDS` in `catalog.ts`):

1. `fl-miami`
2. `fl-miami-dade`
3. `ny-nyc`
4. `ca-los-angeles`
5. `tx-houston`
6. `il-chicago`
7. `wa-seattle`
8. `ga-atlanta`
9. `pa-philadelphia`
10. `az-phoenix`
11. `co-denver`
12. `dc-washington`

All twelve exist as **core** rows in `places-core.ts` (grep `id:`). Empty `searchAhj("")` returns those twelve. All chips **higher**. Still unverified URLs. Still `DISCLAIMER`.

KIT-06 may reuse this length as the cheap orbital hint cap (`permit-pins.ts` `out.slice(0, 12)`). That is pins, not search. Not this seat.

---

## 5. `DISCLAIMER` on the permit footer

Exact export, `src/lib/permit/types.ts`:

> Guidance only — not legal advice, not a city login, and not a substitute for the adopted code or the Authority Having Jurisdiction. Confirm editions, fees, and procedures with the local building department before you apply or cover work.

`DeskDrawer` footer:

```329:333:src/components/desks/DeskDrawer.tsx
      <footer className="mt-2 shrink-0 border-t border-line pt-2 text-xs text-muted">
        {desk.system === "kept"
          ? "Delayed register. Incomplete files stay empty. Not an influence score."
          : DISCLAIMER}
```

Rules this seat confirms on disk:

1. Permit drawer (empty home, hit list, card, playbook shell) always shows the constant. Not a toast. Not first-run-only.
2. Higher chip does **not** hide it.
3. Kept footer is a different honesty line. Do not mix.
4. Import is `DISCLAIMER` from `@/lib/permit/types`. Do not paraphrase a second string into `src/`.

---

## 6. `catalog.ts` still pulls Rest

File: `src/lib/permit/catalog.ts` line 1:

```ts
import { getPlace, PLACES, searchPlaces } from "./places";
```

`src/lib/permit/places.ts`:

```ts
import { REST_PLACES } from "./places-rest";
export const PLACES: PlaceDesk[] = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES, ...REST_PLACES];
```

`searchCatalog` empty path uses `FEATURED_PLACES` (via `getPlace` on the full concat — featured ids happen to be core, but the **module graph still loads Rest**). Typed path calls `searchPlaces(q)`, which filters `PLACES` including Rest, slice 80.

`placeCount()` returns `PLACES.length` (**16165** if evaluated). `CatalogHit.href` is still `/place/{id}` and `/state/{code}` — permit-harbor routes. **GEV must not add those routes.** Hits open `DeskDrawer` (`system: "permit"`). Globe stays mounted.

**No `src/` component, route, or intel module imports `catalog.ts`.** Keep it that way. Wiring the drawer to `searchCatalog` would silently put ~3.37 MB Rest in the HUD bundle and make Rest searchable on typeahead.

Integrity tests read Rest as **text** (`readFileSync` + `p("id")` regex). Off-bundle. Keep them green. Do not rewrite catalog rows.

---

## 7. Expand — Rest opt-in belongs in KIT-06, not here

Do **not** grow H07 / KIT-04 search into Rest.

| Later (KIT-06) | Not this seat |
| --- | --- |
| Lazy `import()` of `places-rest.ts` on **explicit** Rest search or county-scale pack with Rest enabled | Static import from `search-lite`, DeskDrawer, OverlayHud, globeEngine, first paint |
| Rest **name hits** (capped), chip **provisional**, `DISCLAIMER` | Returning Rest from `searchAhj` |
| Widen chip union to `"higher" \| "mid" \| "provisional"` when Rest can appear | Adding `"provisional"` to `PermitChip` now |
| Zoom gate + cluster + ~50 labels. Orbit Rest entities = **0** | Plotting 14925 / 16165 pins |
| Sourced coordinates only. `PlaceDesk` has **no lat/lon** | Geocoding Rest “just in case” |
| Draft `permit-pins.ts` wired through `globeEngine` subscribe | Importing `permit-pins` from the search path |

`permit-pins.ts` already imports `search-lite` (featured 12 + `ORBIT_M = 2_000_000`). `globeEngine.ts` has **no** `permit-pins` / `layers.permits` entity branch. Leave it. KIT-06 owns that wire. If FPS dies, the globe wins.

Search hits in the drawer do not require pins. Featured 12 on empty query is typeahead, not a globe dump.

---

## 8. Import graph (disk, 2026-08-29)

```
FIRST PAINT (OverlayHud always mounts DeskDrawer)
================================================
OverlayHud.tsx
  └── DeskDrawer.tsx
        ├── search-lite.ts
        │     ├── places-core.ts     CORE 79
        │     ├── places-extra.ts    EXTRA 462  (p helper; extra does not import rest)
        │     └── places-more.ts     MORE 699   (p from extra only)
        ├── states.ts / playbooks.ts / types.DISCLAIMER
        └── kept desks/roster (other system)

runCommand.ts ──► search-lite.searchAhj     (permitSearch only)

POISON (not reachable from HUD / search)
========================================
places-rest.ts  (~3.37 MB, 14925 p("id"))
  └── imported by places.ts only
        └── imported by catalog.ts only
              └── NO component / route / intel importer

DRAFT (KIT-06, unwired)
=======================
permit-pins.ts ──► search-lite  (no Rest)
  └── globeEngine does not import this
```

`places-more.ts` / `places-extra.ts` imported **alone** are Rest-safe. `places-core.ts` imported alone is Rest-safe. `places.ts` is not.

---

## 9. File-touch (Host later — not this seat)

This seat does not patch `src/`.

KIT-04 (already on disk; do not reopen for Rest):

- Keep search on `search-lite`. Do not point DeskDrawer at `catalog.searchCatalog` or `places.searchPlaces`.
- Keep `DISCLAIMER` on the permit footer.
- Keep chips higher/mid from `permitChip`.
- Keep featured 12 as empty-query hits.

KIT-06 (next kit, after this harden pass — other seats / Host):

- Lazy Rest search module. Provisional chip. Count card stays 14925 until opt-in.
- Wire `permit-pins.ts` behind camera height. Orbit Rest = 0.
- Do not start that work from this file.

---

## 10. E / I / A

**E — Evidence (this tree, 2026-08-29)**

- `places-core.ts` line 3: `export const CORE_PLACES`. Unique kind-id objects: **79**.
- `search-lite.ts`: imports core/extra/more only. `PermitLayer` = core\|extra\|more. `PermitChip` = higher\|mid. `SEARCHABLE` concat of those three. `searchAhj("")` maps `FEATURED_AHJ_IDS` (12). Typed path `slice(0, 40)`. No `places-rest` import.
- Featured 12 ids all present in `places-core.ts`. Same list as `catalog.ts` `FEATURED_PLACE_IDS`.
- `permitChip`: `permitLayer(id) === "core" ? "higher" : "mid"`.
- `DeskDrawer.tsx` imports `search-lite` + `DISCLAIMER`. Permit footer is the constant. Hits list says Rest not searched. OverlayHud mounts `<DeskDrawer />`.
- `commands.ts`: `find AHJ in …` and `building desk {place}` → `permitSearch`. `runCommand.ts` resolves via `searchAhj`, not `searchCatalog`.
- `catalog.ts` line 1 still `from "./places"`. `places.ts` line 5 still `from "./places-rest"`. `PLACES` concatenates Rest. `searchPlaces` filters `PLACES`.
- Grep of `src/**/*.{ts,tsx}`: only `places.ts` imports `places-rest`. Only `catalog.ts` imports `places.ts`. Zero HUD/route/intel imports of `catalog.ts`.
- `globeEngine.ts`: no `permit-pins`, no `layers.permits` entity loop.
- `permit-index.json`: 79 / 462 / 699 / 14925; `factory_urls_verified: false`; `rest_is_count_not_map: true`.
- `types.ts` `PlaceDesk` has no lat/lon. `DISCLAIMER` exact string as quoted in §5.
- Smoke: OverlayHud source must not contain `places-rest`. Integrity test reads all four catalog files as text; core path is `places-core.ts`.

**I — Inference**

- KIT-04 search is done **without** breaking the Rest concat inside `places.ts`, because HUD never imports that file. The split that matters is `search-lite` + `places-core` export. The old concat remains a fuse behind `catalog.ts`.
- Importing `catalog.ts` “for `FEATURED_PLACE_IDS` / `buildDesk`” would undo the split. Copy featured ids from `search-lite`. `buildDesk` still walks `getPlace` on the full concat — leave it unimported.
- Extra/more in the first-paint bundle is the 1240-desk typeahead, not a Rest dump. Rest opt-in is a different kit because it needs lazy load, a third chip, and a zoom gate — none of which search needs.
- `permitChip`’s else-`mid` is safe only because Rest never enters `SEARCHABLE`. Do not feed Rest ids into `Chip` until KIT-06 adds `provisional`.

**A — Assumption**

- Host will not “simplify” by deleting `search-lite` and calling `searchCatalog`.
- KIT-06 implementers will lazy-load Rest, not add it to `SEARCHABLE`.
- Operators will not treat `catalog.ts` existing on disk as the live search API.
- `lookupPlace` stays “fly if the engine already knows the name”; no catalog geocode pass from this seat.
- This file is audit only. No `src/` edit. No npm. No git push.

---

## 11. Do-not

- Do not import `places-rest.ts`, `places.ts`, or `catalog.ts` into OverlayHud, DeskDrawer, `runCommand`, `search-lite`, or globeEngine.
- Do not add Rest rows to `SEARCHABLE` / `searchAhj`.
- Do not add `"provisional"` to this kit’s chip union, and do not call `portalConfidence`.
- Do not hide `DISCLAIMER` when the chip is higher.
- Do not mark factory / core / Rest URLs verified. `factory_urls_verified` stays **false**.
- Do not add fee tables. Do not fetch portals to upgrade chips.
- Do not plot 16,165 or 14,925 pins. Do not geocode Rest.
- Do not add `/place/` or `/state/` routes that unmount Cesium.
- Do not iframe hivepermitdev / keptglobal. Do not remix live gevradio.
- Do not start KIT-06 from this file. Rest opt-in is the next kit.
- Do not print skill brands, swarm names, investigator legal names, or sitting inventions.
- Do not rewrite catalog rows. Integrity tests stay text-parse.

---

## Stop

KIT-04 permit search is **`search-lite.ts`**: Core + Extra + More (**1240**), chips **higher / mid**, empty query **featured 12**, permit footer = exact **`DISCLAIMER`**. Rest is the integer **14925**.

`catalog.ts` still pulls Rest. Leave it unimported.

**Rest opt-in belongs in KIT-06, not here.** Orbit Rest entities stay **0** until that kit. Globe wins.

This seat writes only this file.
