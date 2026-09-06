# SEAT 21 — PIN BUDGET

Seat: 21 · band: later-kits prep (11–25) · class: public-suite  
Coordinator: Host Grok Build. Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`.  
Date: 2026-08-29. This file only. Did not edit `src/`, `_out/`, or `kits/`.  
Did not propose a `globeEngine.ts` patch this sitting. Read subscribe as-is.

Claim: **civic globe entities are budgeted. KIT-02 draws none. KIT-03 draws at most 33 country contacts. KIT-06 clusters Rest. 16165 never appears at orbit.**

---

## Lock

| Kit | Globe entities | Hard cap |
| --- | ---: | --- |
| KIT-01 (LEG/AHJ registry) | 0 | store + rail only |
| **KIT-02** (DeskDrawer chrome) | **0** | **0 new Cesium entities, 0 new `Contact`s** |
| **KIT-03** (KeptAdapter / LEG markers) | **≤ 33** | **one country `Contact` per `kit_on_disk` iso2** |
| KIT-04 (PermitAdapter search) | 0 dump | typeahead list; not 1240 pins |
| KIT-05 (civic grammar) | 0 | commands, not billboards |
| **KIT-06** (AHJ Rest) | **clustered, zoom-gated** | **0 Rest leaves at orbit; never 16165 entities** |

P0: `viewer.entities` must not jump by thousands when LEG, AHJ, corpus, or a desk opens. Homepage stays the globe.

This sitting does **not** implement KIT-03 or KIT-06. It locks the numbers later kits must not exceed.

---

## 1. Engine subscribe today — leave it

Pin loops live in `src/lib/intel/globeEngine.ts`, not `GlobeCanvas.tsx` (boot wrapper only). `useIntel.subscribe` (lines 1312–1353) watches **seven intel `.on` flags** and detection. It does **not** name `legislatures` or `permits`.

On flip:

| Layer | On | Off |
| --- | --- | --- |
| `flights` | `refreshFlights()` | `prune(flights, empty)` |
| `military` | `refreshMilitary()` | `prune(military, empty)` |
| `vessels` | `refreshVessels()` | `clearPrefix("ves-", vessels)` |
| `satellites` | `loadSats()` | remove sat wraps + `orbitEntity` |
| `earthquakes` | `loadQuakes()` | `purgeExtras("eq-")` |
| `fires` | `loadFires()` | `purgeExtras("fire-")` |
| `launches` | `loadLaunches()` | `purgeExtras("msn-")` |

Boot reload (1407–1413) is the same seven. Share-hash `setLayer(id, on)` can light LEG/AHJ in the store; subscribe still loads **zero civic entities**. That empty civic state is correct.

**Do not edit `globeEngine.ts` this sitting.** Do not add `if (s.layers.legislatures.on)` or `if (s.layers.permits.on)` that walks `capitals.json`, fat `members.json`, or `places-rest.ts`. That is how 194 capitals, 13 631 member rows, or 16 165 desks land on Earth.

`flatEngine.ts` treats *any* layer `.on` flip as `layerChanged` and re-paints **existing intel marks**. Do not add a civic branch there this sitting either.

---

## 2. Camera bands (existing numbers, not invented)

`flightView.ts`: `ORBIT_M = 2_000_000`. Flights and military already prune when `view.orbit` (`cam.height > ORBIT_M`). Civic Rest must fail the same way, harder.

| Band | `cam.height` (m) | On-disk analog | Civic AHJ / Rest | LEG (KIT-03, later) |
| --- | ---: | --- | --- | --- |
| **Orbit** | **> 2 000 000** | boot `setView` **22 000 000**; store default **20 000 000**; preset `globe` 22 000 000; ISS preset 2 000 000 is the edge | **0 Rest leaves. 0 of 16165. 0 of 14925.** | ≤ 33 if LEG on; still 0 if LEG off |
| Region | 80 000 … 2 000 000 | NYC 80 000; California 900 000; Eastern Europe 1 200 000 | **clusters only** (state/pack bubbles). No Rest leaf pins. Not 16165. | ≤ 33 |
| **County / city** | **≤ 80 000** | Austin 18 000; airports 6–8 000; city presets 10–18 000 | KIT-06 **may** expand Rest **in view**, still clustered, still capped | ≤ 33 |

County-scale in this budget means at or below the NYC preset (80 000 m). California at 900 000 is a **region**: bubbles, not leaves.

**Never 16165 at orbit.** Also never 16165 at region or county. 16165 is the catalog **count**, not a billboard target.

---

## 3. KIT-02 = 0 new entities

DeskDrawer is chrome (`src/components/desks/DeskDrawer.tsx`, not yet). Store `desk: null | { system: "kept" | "permit"; id: string }`. Right-side panel / mobile bottom sheet above the command bar. Globe stays mounted.

| Action | Entities added |
| --- | ---: |
| Mount DeskDrawer | 0 |
| Open empty drawer (`desk === null`) | 0 |
| Set `desk` to an iso2 or place id | 0 (KIT-02) |
| Esc close | 0 |
| Mutex vs corpus / radio / comms / layer rail | 0 |

KIT-02 must not call `viewer.entities.add`, must not mint `Contact`, must not write `extras`, must not import `places-rest.ts` / `places.ts` / fat kits. Opening a desk is a panel, not a pin.

Corpus panel is already HUD index, not a pin source. `corpusOpen` must not grow entity count.

---

## 4. KIT-03 ≤ 33 country contacts

Authority is `_out`, not ARCHIVE 34 and not `capitals.json` 194.

```
196 atlas rows
 └── 33 kit_on_disk   ← this is the pin budget
      └── 12 fills
```

| Disk fact | n | Plot as KIT-03 `Contact`? |
| --- | ---: | --- |
| `packages/_index.json` `kit_on_disk_count` | **33** | **yes, ≤ 1 each** |
| atlas `kit_on_disk: true` ∩ capitals | **33/33** | same 33 |
| `capitals.json` points | 194 | **no — lookup table, not a dump** |
| atlas without kit | 163 | **no** (honest empty desk) |
| atlas minus capitals (NR, PS) | 2 | omit; neither is a kit |
| `packages/{iso}.json` `objects["members.json"].count` sum | **13631** | **no member pins** |

One `Contact` per country pack:

- `kind: "legislature"`
- id prefix reserved for a later sitting: `leg-{iso2}`
- position from `capitals.json` / package `capital` (every kit package has a `capital` object)
- LEG layer still **default off**; markers only when LEG is on **and** KIT-03 exists
- Roster stays in the drawer (fat `members.json`). **No member billboards.**

Sitting-0 kits (`cl`, `fj`, `nl`, `th`, `tz`; members count 0) still get **at most one** capital contact if LEG is on. Empty roster is honesty in the drawer, not a missing pin *and* not a fake member.

**Override:** corpus-audit seats 12/13 allowed “≤ ~200 country markers” because 194 capitals exist. **This seat locks ≤ 33.** Plotting 194 would mark 161 countries that have no kit and would read as 196/196 coverage. Do not.

CN members **2849**, US **437**, GB **650** — a members dump is the same class of failure as Rest.

---

## 5. KIT-04 is a list, not a globe dump

Permit-index (lock 2026-08-18):

| Layer | Count | First-paint globe | Role |
| --- | ---: | --- | --- |
| core | 79 | 0 | KIT-04 typeahead |
| extra | 462 | 0 | KIT-04 typeahead |
| more | 699 | 0 | KIT-04 typeahead |
| rest | 14925 | 0 | count until KIT-06 |
| **sum** | **16165** | **0** | never a pin target |

`PlaceDesk` has **no lat/lon**. Catalog files are names, AHJ, portal URLs, state. `honesty.rest_is_count_not_map: true` is literal. Do not invent coordinates.

`places.ts` today static-imports `REST_PLACES` into `PLACES`. KIT-04 must **split that import** before any globe AHJ work. Searching current `places.ts` bundles Rest (~3.3 MB) into first paint.

Search hits are drawer rows (name, kind, state, confidence chip, disclaimer). Not 79, not 1240, not 16165 billboards. A later flyTo of **one** selected desk is not a pin budget exception for the rest of the catalog.

---

## 6. KIT-06 — cluster Rest, zoom-gated

Drawer contract: Rest only after **search / state pack / county-scale camera**. This budget adds: **cluster, never flatten 14925, never 16165 at orbit.**

Rules for the sitting that implements KIT-06 (not this one):

1. **Orbit (`cam.height > ORBIT_M`): Rest entity count = 0.** Prune like `refreshFlights` when `view.orbit`. Distance-display must not keep Rest visible from 22 000 km.
2. **Region:** at most one **cluster** billboard per state pack (US: ≤ 51 including DC, only packs that exist). Cluster label is a **count**, not a desk name list. No leaf Rest pins.
3. **County / city (`cam.height ≤ 80_000`) plus opt-in (search hit or state pack):** expand clusters **in view** only. Visible Rest **leaves** cap = `REGION_CAP` (**120**), same constant flights already use. Drop the rest, do not paginate onto the globe.
4. **Never** `for (const place of REST_PLACES) viewer.entities.add(...)`.
5. **Never** import `places-rest.ts` from `globeEngine` / `GlobeCanvas` / first-paint HUD.
6. **Never** treat 79+462+699+14925 = **16165** as an entity quota. That integer is the permit-index sum. Showing it as pins at orbit is the named P0.
7. Country-native `{iso}-permit.json` may be zeros (US catalog is not world AHJs). Zero is not a pin.

Cluster entity ids (later, not this sitting): `ahj-cluster-{pack}`. Leaf ids: `ahj-{placeId}`. Do not reuse `flt-` / `mil-` / `ves-` / `sat-` / `eq-` / `fire-` / `msn-` / `orbit-`. Do not dump civic rows into the intel `extras` map.

Until Rest has sourced coordinates, **keep it a count**. Clustering without lat/lon is not a reason to guess points.

---

## 7. Intel caps (do not steal, do not raise for civic)

Existing 3D budgets stay intel-only:

| Bucket | Cap / behavior |
| --- | --- |
| flights | `REGION_CAP` 120; `DistanceDisplayCondition(0, ORBIT_M)`; prune at orbit |
| military | same `addFlight` cap; prune at orbit |
| vessels | modeled lanes (~138 simulated contacts); prefix `ves-` |
| satellites | catalog wraps + ISS `sat-25544` + one `orbitEntity` polyline |
| extras | `eq-` / `fire-` / `msn-` from feeds; `purgeExtras` on layer off |

Civic work must not raise `REGION_CAP` to “fit Rest.” Civic work must not ride the extras map.

---

## 8. Forbidden (every later kit)

- 16165 Cesium entities at any camera, especially orbit / default 20–22 000 km
- 14925 Rest leaves on first paint or at orbit
- 194 capital billboards as “LEG”
- 13631 member billboards
- 163 atlas-without-kit pins
- KIT-02 minting entities “so the drawer has a marker”
- Subscribing globeEngine to LEG/AHJ this sitting
- Importing `places-rest.ts` or current concatenated `places.ts` into the globe graph
- Iframe of keptglobal / hivepermitdev as “pins”
- Skill brands, invented sittings, guessed lat/lon

---

## 9. Verify later (not this sitting)

When a later turn draws civic markers, fail closed if any check is red:

| # | Check |
| --- | --- |
| V1 | Default boot (22 000 000 m): civic entity count **0** with LEG/AHJ off |
| V2 | `show legislatures` before KIT-03: still **0** entities (subscribe unchanged) |
| V3 | KIT-03 + LEG on + orbit: legislature entities **≤ 33**, ids = the 33 kit iso2, **not** 194 |
| V4 | KIT-02 open/close: entity count unchanged |
| V5 | AHJ on at orbit: Rest leaves **0**; total permit entities **≠ 16165** |
| V6 | KIT-06 at county + opt-in: Rest leaves **≤ 120** in view; clusters elsewhere |
| V7 | `places-rest` absent from first-paint module graph |
| V8 | FLT/MIL still prune at `ORBIT_M`; globe still orbits; Creedence still radio |

---

## E / I / A

**E — Evidence (this tree, this sitting)**

- `globeEngine.ts` `useIntel.subscribe` (1312–1353): seven intel loads/prunes only. Grep: no `legislatures`, no `permits` in that file.
- Boot `setView` destination height **22 000 000**; store `cam.height` default **20 000 000**; `ORBIT_M` **2 000 000**; flights prune when `view.orbit`.
- `LAYER_META` already has LEG/AHJ; `defaultLayers()` both `on: false`, `count: 0`.
- `permit-index.json`: 79 / 462 / 699 / 14925 = **16165**; `rest_is_count_not_map: true`.
- `_index.json` + atlas: **33** kits on disk, 196 atlas, 163 holes. Capitals join: **33/33** kit countries have a point; file count is **194**.
- Package `members.json` counts sum **13631** (cn 2849, us 437, five sitting-0 kits at 0).
- `PlaceDesk` (`src/lib/permit/types.ts`): no `lat` / `lon`. `places.ts` concatenates Rest.
- `GlobeCanvas.tsx`: no entity loop. `REGION_CAP` 120 in `flightView.ts`.
- No `src/components/desks/` yet (KIT-02 create target).

**I — Inference**

- The failure mode is one subscribe branch that iterates a catalog when a civic layer flips on. Subscribe-as-is is the safe empty state; do not “complete” it this sitting.
- 33 is the honest LEG budget because that is how many kits exist. 194 is a delayed-point file, not a coverage claim. 16165 is a count card.
- Flights already prove the zoom gate: above 2 000 km, live traffic is zero. Rest must be at least that strict. Clustering is how 14925 exists without 14925 billboards.
- KIT-02 is a panel. A drawer that plants pins is KIT-03/06 smuggled into chrome.

**A — Assumption**

- Later KIT-03 will join the 33 iso2 to `capitals.json` and will not “include the other 161 for completeness.”
- Later KIT-06 will not geocode Rest inventively; until coords are sourced, Rest stays a count plus clusters of **known** packs.
- Operators will not treat this budget as permission to edit `globeEngine.ts` in the same turn as KIT-02.

---

## Stop

Prep only. **Do not implement KIT-03+.** **Do not edit `globeEngine.ts`.**  
KIT-02 = **0** entities. KIT-03 = **≤ 33** country contacts. KIT-06 = **cluster Rest**. **Never 16165 at orbit.**
