# LEAD 03 PERMIT — KIT-04 / KIT-06 contract

Seat: LEAD 03 PERMIT. Coordinator: Host Grok Build.
Target class: public-suite. Tree: `REPO_ROOT`.
Date: 2026-08-29. This file only. Did not edit `src/`, `_out/`, or `kits/`.
Did not import or copy `places-rest.ts`. Rest ids, hostnames, and pin rows are not listed here.

Kits (Handoffs `gevradio-unification`): `KIT-04-permit-search.md`, `KIT-06-permit-zoom-gate.md`.
Index: `vendor/kept/_out/permit-index.json`. Types: `src/lib/permit/types.ts` + `src/lib/permit/catalog.ts` (types only).
Specialists: 15 places layers · 16 confidence (on disk) · 17 no-rest · 20 zoom gate · 21 pin budget.

**This sitting is the contract. Do not implement KIT-04 or KIT-06 from this file.**

---

## GO / NO-GO

| Kit | Verdict | Why |
| --- | --- | --- |
| **KIT-04 Permit search** | **NO-GO until KIT-02 lands** | FEATURE_KITS: KIT-04 depends on KIT-02. `src/components/desks/` is absent. Search has no drawer. Do not start KIT-04 in the same turn as KIT-02. |
| **KIT-06 Zoom gate** | **NO-GO until KIT-04 lands** | FEATURE_KITS: KIT-06 depends on KIT-04. Rest stays a count. No pin loop this sitting. |
| **This file (prep)** | **GO** | Bind searchable Core/Extra/More, Rest count-only, `factory_urls_verified: false`, no 16k pins, file-touch map. |

KIT-01 is already on disk (`LayerId` has `permits`, AHJ default **off**, zero civic entities in `globeEngine` subscribe). That is **not** KIT-04. Toggling AHJ today updates rail + store only.

**NO-GO paths (revert if hit in any later turn):** globe unmounts; radio dead; `places-rest.ts` or current `places.ts` (Rest concat) in first-paint graph; 14,925 / 16,165 Cesium entities; factory URLs labelled verified; fee tables; new `/place/` or `/state/` route that kills Cesium; hivepermitdev iframe; invented lat/lon for Rest.

---

## 1. What exists (do not ship as search)

Permit Harbor catalog is already vendored. It is **not** wired to the globe or a desk.

| Layer | Index count | Disk module | First-paint KIT-04 |
| --- | ---: | --- | --- |
| core | **79** | `CORE_PLACES` inside `src/lib/permit/places.ts` (no `places-core.ts`) | **searchable** |
| extra | **462** | `src/lib/permit/places-extra.ts` `EXTRA_PLACES` | **searchable** |
| more | **699** | `src/lib/permit/places-more.ts` `MORE_PLACES` | **searchable** |
| rest | **14925** | `src/lib/permit/places-rest.ts` (~3.37 MB) | **count only** |
| **sum** | **16165** | four files, unique `{st}-{slug}` ids | searchable **1240** |

`vendor/kept/_out/permit-index.json` (1477 bytes, wave 3, lock **2026-08-18**):

- `honesty.factory_urls_verified`: **`false`** — must stay false
- `honesty.fees_invented`: `false`
- `honesty.rest_is_count_not_map`: `true`
- `honesty.counted_from_disk`: `true`

US-only footnote (`packages/us-permit.json`): more **680** / rest **14855** (50+DC). Do not show US-only as the global card. Country-native `{iso}-permit.json` catalogs may be **zero** — do not copy US AHJs onto other iso2.

Load-bearing bug on disk: `places.ts` static-imports `REST_PLACES` and concatenates it into `PLACES` / `searchPlaces` / `getPlace`. `catalog.ts` `searchCatalog` calls `searchPlaces`. **Any Vite import of `places.ts` or `catalog.ts` today pulls Rest into the bundle.** KIT-04’s first code change is to **break that import** before any HUD/globe module touches the catalog.

Integrity: `scripts/permit/catalog-integrity.test.mjs` reads all four files as **text** (not a first-paint JS import). Keep tests green. Do not rewrite catalog rows. Do not paste Rest into dashboards.

---

## 2. Types (read-only contract)

From `src/lib/permit/types.ts` — do not fork:

- `PlaceDesk`: `id`, `name`, `kind: "city" | "county" | "district"`, `state`, optional `county` / `populationRank`, `ahjName`, `portalName`, `portalUrl`, `departmentUrl`, optional `phone`, `notes[]`, `extraLinks`, optional `extraPermits` / `extraHolds`.
- **No `lat` / `lon` on `PlaceDesk`.** Catalog is not a pin map.
- `StateDesk`: `code`, `name`, `adoption`, `modelBase`, cycle notes, `commonPermits`, `holdPoints`, `links`.
- `Playbook` / `ProjectKind`: new-home, addition, interior-remodel, roof, electrical, plumbing, hvac, solar, deck-fence, pool, adu, demo, commercial-ti, window-door.
- `DISCLAIMER` (exact, always visible on every permit card / result pane / empty permit drawer):

> Guidance only — not legal advice, not a city login, and not a substitute for the adopted code or the Authority Having Jurisdiction. Confirm editions, fees, and procedures with the local building department before you apply or cover work.

From `src/lib/permit/catalog.ts` — types / API shape only:

- `CatalogHit`: `{ kind: "place" | "state" | "playbook"; id; title; subtitle; href }`
- `CombinedDesk`: `{ state; place?; playbook?; permits; holdPoints; links }` via `buildDesk(stateCode, placeId?, kind?)`
- `searchCatalog(query)` — later must **not** walk Rest
- `FEATURED_PLACE_IDS` (12 core metros) — empty-query hits, all **higher** chips
- `href` values `/place/{id}` and `/state/{code}` are permit-harbor routes. **GEV must not add those routes.** Hits open `DeskDrawer` (`system: "permit"`), globe stays mounted.

On-disk helpers in `places.ts` (prep; KIT-04 may widen, not this seat):

- `placeLayer(id)` → `"core" | "extra" | "more" | "rest"`
- `portalConfidence(id)` today is **two-state** (`higher` \| `provisional`). Seat 16 map is three-state. KIT-04 follows the chip map, not the current helper.

Handoff command (KIT-04 Do #2; KIT-05 later generalizes):

```ts
| { type: "desk"; system: "kept" | "permit"; q: string }
```

KIT-02 owns empty `desk: null | { system: "kept" | "permit"; id: string }` (leads 01 / 04 / 06). KIT-04 **waits** for that store + `DeskDrawer`, then fills `id` from a Core/Extra/More hit and may add `q` on the action. Do not fork a second desk store. Do not steal KIT-02 empty `building desk` / `open permit desk` (no place token).

---

## 3. KIT-04 contract — PermitAdapter (after KIT-02)

Execute only this kit. Goal: find an AHJ from the command bar / drawer search **without pinning Rest**.

### Do

1. **Split Rest out of the searchable catalog** before any UI import.
   - `places.ts` exports Core (+ re-exports extra/more if needed). `PLACES` / `searchPlaces` / `getPlace` for KIT-04 = Core + Extra + More only (**1240**).
   - Do **not** `import` `places-rest.ts` in this kit.
   - `placeLayer` may still *type* `"rest"`; Rest rows must not be in the searchable array.
2. Search box in the **Permit** drawer + command parse:
   - `find AHJ in {place}`
   - `building desk {place}`
   - Parse **after** radio / style, **before** generic flyTo `open`. Do not steal `put on`, `nvg`, `show permits` (layer), or empty KIT-02 `open permit desk`.
3. Results: **name, kind, state, portal URL, confidence chip**.
   - core = **higher**
   - extra / more = **mid**
   - rest = **provisional**, KIT-06 opt-in only (not returned by KIT-04 search)
4. Select hit → open DeskDrawer PermitAdapter:
   - AHJ name, portal, department URL (unverified)
   - State pack notes / common permits via `buildDesk` / `STATES`
   - Playbook picker from `playbooks.ts`
   - Permanent `DISCLAIMER`
   - flyTo **only if** `EngineApi.lookupPlace(name)` already succeeds, else skip camera and still open the drawer. **Do not invent coordinates.**
5. Integrity: keep unique `{st}-{slug}` ids. Do not rewrite catalogs. Integrity tests stay green.

### Do not (KIT-04)

- Do not call factory URLs “verified.” `factory_urls_verified` stays **false**.
- Do not add fee tables.
- Do not plot thousands of pins. **Zero AHJ entities in KIT-04.** AHJ layer on = search hint, not a Rest dump.
- Do not import current `places.ts` until the Rest concat is broken.
- Do not use `CatalogHit.href` as a router push.
- Do not fetch portals to upgrade chips.
- Do not start KIT-06 in the same turn.

### Done when

`find AHJ in miami` (or similar Core/Extra place) opens a building desk with a **higher** chip and the exact `DISCLAIMER`. Extra/more hits show **mid**. Globe usable. Creedence still plays. Rest pin count = **0**. Stop.

Empty-query typeahead may show `FEATURED_PLACE_IDS` (core / higher) plus the count-card line: Core 79 · Extra 462 · More 699 · Rest 14925 (count only).

---

## 4. Confidence chips (bind seat 16)

File: `docs/dev-team/16-confidence.md`. Lead 03 adopts it.

| Layer | Count | Chip | KIT |
| --- | ---: | --- | --- |
| core | 79 | `higher` | KIT-04 |
| extra | 462 | `mid` | KIT-04 |
| more | 699 | `mid` | KIT-04 |
| rest | 14925 | `provisional` | KIT-06 opt-in only |

Chip = catalog **layer**, not URL liveness, not fees, not a map. Extra and more share mid (factory `p()` uses one URL for portal and department). Do not promote extra/more to higher. Do not green a chip. Visible labels: Higher / Mid / Provisional. Never “verified.”

KIT-04 later: widen `portalConfidence` to `"higher" | "mid" | "provisional"` from `placeLayer`. Tests: core → higher; extra → mid; more → mid; rest → provisional **and rest not returned**.

`DISCLAIMER` is unused in UI today. KIT-04 must import the constant. Higher does not hide it.

---

## 5. KIT-06 contract — zoom gate (after KIT-04)

Execute only this kit. Goal: permit markers exist and stay cheap. Rest **never** dumps at orbital zoom.

### Rules (from KIT-06)

| Camera height (approx) | What may draw |
| --- | --- |
| Orbital / continent | **0 Rest pins.** Optional: a handful of Core metros only if cheap (cap = `FEATURED_PLACE_IDS` length **12**). Search hint in HUD. |
| State-scale | Cluster Extra/More (+ Core) for the **visible pack**, and **only if a sourced coordinate exists**. Click cluster to expand. |
| County / city-scale | Uncluster nearby desks. Cap on-screen **labels ~50**. |
| Search / deep query | Rest may resolve **hits** (name match → drawer card), **not** the whole file. |

Reuse analog: intel `ORBIT_M = 2_000_000` in `flightView.ts` is the existing orbital cutoff. Exact AHJ height bands are seat **20**. If FPS dies: raise the height threshold, cut labels. **The globe wins.**

### Do (KIT-06)

1. Lazy-load `places-rest.ts` **only** when the operator runs an explicit Rest search **or** enables Rest on a pack already at county-scale. Never on first paint. Never because AHJ layer flipped on at orbit.
2. Clustering required before any Rest **pin** is visible.
3. Every Rest pin / card keeps the **provisional** chip + `DISCLAIMER`.
4. Integrity tests still make sense (unique ids; no catalog rewrite).

### Coordinate hole (honest)

`PlaceDesk` has **no lat/lon**. There is no GeoJSON / pin array on `permit-index.json`. KIT-06 **must not** geocode 14,925 Rest rows or invent Census coordinates. Search hits in the drawer do not require pins. Pins without a sourced coordinate = **do not draw**. This hole is why Rest stays a count until opt-in search, not why someone should batch-geocode.

### Done when

Orbital + permits-on does not spawn thousands of entities (Rest entities at orbit = **0**). A city search still finds a Rest **name** if opted in, with provisional chip. Globe stays interactive. Stop.

---

## 6. No 16k pins (P0)

| Number | Meaning | Draw? |
| ---: | --- | --- |
| 16165 | unique place ids on disk | **never all at once** |
| 14925 | Rest count | **never as a pin dump** |
| 1240 | Core+Extra+More searchable | typeahead; not a globe dump |
| 12 | featured core metros | optional cheap orbit hint after KIT-06, not KIT-04 |
| ~50 | city-scale **labels** | KIT-06 cap (seat 21) |
| 0 | Rest pins at orbit / first paint / KIT-04 | **required** |

`globeEngine.ts` `useIntel.subscribe` today has **no** `layers.permits` branch. KIT-04 must **leave it that way**. KIT-06 may add a gated branch. Do not open a pin loop in `GlobeCanvas.tsx` (boot wrapper only).

---

## 7. File-touch map

This seat does not patch `src/`. Later implementers only.

### KIT-04 (after KIT-02 GO) — likely touch

| File | Why |
| --- | --- |
| `src/lib/permit/places.ts` | **Break** `REST_PLACES` import. `PLACES` / `searchPlaces` / `getPlace` = Core+Extra+More. Widen `portalConfidence`. Keep unique ids. **Do not rewrite `CORE_PLACES` rows.** |
| `src/lib/permit/catalog.ts` | `searchCatalog` over the split catalog only. Hits open desk ids, not `/place/` routes. Keep `CatalogHit` / `CombinedDesk` / `FEATURED_PLACE_IDS`. |
| `src/components/desks/PermitAdapter.tsx` (or `PermitPanel.tsx`) | **NEW.** Typeahead + card + playbook picker + `DISCLAIMER`. Slot into KIT-02 `DeskDrawer` body. |
| `src/components/desks/DeskDrawer.tsx` | Slot PermitAdapter when `desk.system === "permit"`. Do not restyle chrome. |
| `src/lib/intel/types.ts` | Extend `CommandAction` desk with search `q` if KIT-02 did not. |
| `src/lib/intel/commands.ts` | `find AHJ in {place}` · `building desk {place}` |
| `src/lib/intel/runCommand.ts` | Resolve q against Core/Extra/More; `setDesk({ system: "permit", id })`; optional `lookupPlace`; no Rest import. |
| `src/lib/intel/store.ts` | Only if desk shape needs a query string; prefer KIT-02 shape. |

Optional: `src/lib/permit/places-search.ts` as a thin Core/Extra/More search module so HUD never imports `places.ts` by accident.

### KIT-04 — do not touch

- `src/lib/permit/places-rest.ts` (do not import, copy, or rewrite)
- `src/lib/permit/places-extra.ts` / `places-more.ts` / `states.ts` / `playbooks.ts` / `types.ts` `DISCLAIMER` text / `row-map.ts` (read-only)
- `src/components/intel/GlobeCanvas.tsx`
- `src/lib/intel/globeEngine.ts` / `flatEngine.ts` (no permit entity loop)
- `src/components/intel/IntelApp.tsx` / `src/routes/index.tsx`
- `src/lib/intel/corpus.ts` (already counts-only from permit-index)
- `vendor/kept/_out/**`, `vendor/kept/kits/**`
- `package.json`, live gevradio, hivepermitdev iframe

### KIT-06 (after KIT-04 GO) — likely touch

| File | Why |
| --- | --- |
| `src/lib/permit/places-rest.ts` | **Lazy dynamic `import()` only.** No rewrite. No first-paint static import. |
| New `src/lib/permit/rest-search.ts` (or similar) | Opt-in name search over Rest; returns hits, not the whole array. Provisional chip. |
| New `src/lib/intel/permitPins.ts` (or similar) | Zoom gate + cluster + label cap. Sourced coords only. |
| `src/lib/intel/globeEngine.ts` | Gated `layers.permits` subscribe. **Never** iterate 14925 at orbit. |
| `src/lib/intel/flatEngine.ts` | Same budget on marks; no civic dump on any-layer flip. |
| PermitAdapter | Explicit “search remaining names” control. Rest hits = provisional + disclaimer. |

Seat **21** owns the numeric pin budget. Seat **20** owns height-band numbers. Seat **17** owns the first-paint Rest ban. If those specialist files land after this one, they may tighten numbers; they may not loosen “0 Rest at orbit” or `factory_urls_verified: false`.

### KIT-02 (prerequisite; not this seat)

Empty `DeskDrawer.tsx` + store `desk` + OverlayHud mount. Leads 01 / 04 / 06 + seats 07–10, 31. KIT-04 does not create the drawer.

---

## 8. Specialist bindings

| Seat | File | Load-bearing rule this lead needs |
| --- | --- | --- |
| **15** places layers | `docs/dev-team/15-places-layers.md` (if written) | Four layers; KIT-04 search = 79+462+699; Rest not in `PLACES` after split. |
| **16** confidence | `docs/dev-team/16-confidence.md` **exists** | higher / mid / mid / provisional. Chip ≠ live URL. |
| **17** no-rest | `docs/dev-team/17-no-rest.md` (if written) | No `places-rest` / current `places.ts` on first paint. Rest = index integer until KIT-06 opt-in. |
| **20** zoom gate | `docs/dev-team/20-zoom-gate.md` (if written) | Numeric camera bands for the KIT-06 table. Globe wins if FPS dies. |
| **21** pin budget | `docs/dev-team/21-pin-budget.md` (if written) | Orbit Rest = 0; city labels ~50; never 16165/14925 entities. |

This lead file wins on sequencing (KIT-04 waits for KIT-02; KIT-06 waits for KIT-04) and on honesty flags.

---

## 9. Nesting vs other leads

```
permit-index count card (already in CorpusPanel)
 └── KIT-02 empty Building desk (next implement; this lead waits)
      └── KIT-04 PermitAdapter typeahead Core/Extra/More + chips + DISCLAIMER
           └── KIT-06 opt-in Rest hits + zoom-gated pins (if sourced coords)
```

- Lead 01 / 04 / 06: empty drawer. **Do not** parse `find AHJ in …` in KIT-02.
- Lead 05 integrity: hide iso2 exclusion city lists; field-gate; live gevradio **NO**.
- Corpus panel stays. Permit counts 79 / 462 / 699 / 14925 stay on the index card. KIT-04 does not replace CorpusPanel.

---

## 10. E / I / A

**E — Evidence (this tree, 2026-08-29)**

- `permit-index.json`: counts 79 / 462 / 699 / 14925 = 16165; `factory_urls_verified: false`; `rest_is_count_not_map: true`; lock 2026-08-18; 1477 bytes.
- `places.ts` line 4 imports `REST_PLACES`; `PLACES = [...CORE, ...EXTRA, ...MORE, ...REST]`; `searchPlaces` filters `PLACES`.
- `catalog.ts` `searchCatalog` calls `searchPlaces`. `CatalogHit` / `CombinedDesk` / `FEATURED_PLACE_IDS` exported.
- `types.ts` `PlaceDesk` has no lat/lon. `DISCLAIMER` exported; grep: unused in UI components.
- `portalConfidence` is binary; `placeLayer` is four-way.
- `src/components/desks/` **absent**. Store has `corpusOpen`, not `desk`. `CommandAction` has `corpus`, not `desk`.
- `globeEngine.ts` subscribe: seven intel layers only. No `layers.permits` entity branch.
- OverlayHud `LAYER_ORDER` includes `permits`. `defaultLayers().permits.on === false`.
- FEATURE_KITS: KIT-04 depends on KIT-02; KIT-06 depends on KIT-04.
- KIT-04 / KIT-06 paste blocks: Core/Extra/More search; Rest opt-in; no verified factory URLs; no thousands of pins.
- `src/` JS/TS first-paint: only `catalog.ts` and `places.ts` import the Rest module. HUD/corpus do not. Integrity test reads Rest as text.
- Seat 16 chip map on disk. Seats 15 / 17 / 20 / 21 files were absent when this lead wrote.

**I — Inference**

- KIT-04 cannot ship search until (a) DeskDrawer exists and (b) Rest is split out of `places.ts`. Doing (b) without (a) still has no UX home; doing (a) then importing today’s `catalog.ts` bundles Rest.
- Extra/more are factory-shaped; chip mid is authorship, not HTTP 200.
- Without lat/lon, KIT-06 pins are a later sourced-coordinate problem, not a “plot Rest” sitting. Search hits do not require 16k entities.

**A — Assumption**

- KIT-02 implementers will not sneak PermitAdapter or `places.ts` into the empty drawer turn.
- Operators will not treat this GO-on-prep as KIT-04/06 done.
- Specialists 15 / 17 / 20 / 21 will not contradict 0 Rest at orbit or `factory_urls_verified: false`.
- `lookupPlace` remains good enough for “fly if we already know the name”; no catalog geocode pass.

---

## 11. Do-not (every sitting)

- Do not implement from this file.
- Do not import, copy, or dump `places-rest.ts`.
- Do not mark factory / Rest / core portal URLs verified.
- Do not add unsourced fees.
- Do not plot 16,165 or 14,925 pins.
- Do not geocode Rest “just in case.”
- Do not iframe hivepermitdev / keptglobal.
- Do not add `/place/` `/state/` routes that unmount Cesium.
- Do not hide `DISCLAIMER` when the chip is higher.
- Do not start KIT-04 in the KIT-02 turn. Do not start KIT-06 in the KIT-04 turn.
- Do not print skill brands, swarm names, investigator legal names, or sitting inventions.
- Do not remix live gevradio.

---

## Stop

**KIT-04 waits for KIT-02.** After the empty Building desk exists: split Rest out of `places.ts`, search Core/Extra/More only (1240), chips higher/mid/mid, `DISCLAIMER` always on, `factory_urls_verified` stays **false**, **zero** Rest pins.

**KIT-06 waits for KIT-04.** Rest is the integer **14925** until explicit opt-in search / county-scale camera. Clustering + ~50 labels. Orbit Rest entities = **0**. Globe wins.

Do not start KIT-04 now.
