# SEAT H08 — ENTITY BUDGET

Seat: **H08** · harden pass (15 seats) · class: public-suite  
Coordinator: Host Grok Build. Tree: `REPO_ROOT`.  
Date: 2026-08-29. **This file only.** Did not edit `src/`, `_out/`, or `kits/`.

Claim: **civic globe entities are capped. Today LEG ≤ 33, AHJ = 0 (draft `permit-pins.ts` is unwired). KIT-06 may add at most 12 orbit cores or 56 mid clusters. 16165 is a catalog sum, never an entity quota. Camera-move must not rebuild civic. Both engines (globe + flat) take the same cap.**

---

## Lock

| Surface | Today (wired) | KIT-06 max (draft, still unwired) | Hard cap |
| --- | ---: | ---: | --- |
| LEG (`leg-`, extras) | **≤ 33** when LEG on; **0** when off | still ≤ 33 | `keptDesks().slice(0, 33)` |
| AHJ (`ahj-core-` / `ahj-st-`) | **0** | orbit **12** cores · mid **56** clusters · close **12** cores | never Rest leaves; **never 16165** |
| Civic total at default boot | **0** | 0 until AHJ on | LEG/AHJ default `on: false` |
| Permit-index sum | 79+462+699+14925 = **16165** | count card only | **not a pin target** |

P0: `viewer.entities` / flat `marks` must not jump by thousands when AHJ turns on, when the camera moves, or when the desktop globe falls back to the phone map.

---

## 1. extras prefixes (E)

`src/lib/intel/globeEngine.ts` keeps one `extras` map (`line 255`) plus `purgeExtras(prefix)` (`735–741`). Four prefixes write it:

| Prefix | Loader | Off / reload | Typical n |
| --- | --- | --- | ---: |
| `eq-` | `loadQuakes` — `id = eq-${q.id}` | purge then refill; layer off → `purgeExtras("eq-")` | USGS 2.5-day features (uncapped in loader) |
| `fire-` | `loadFires` — `id = fire-${f.id}` | same | FIRMS break at **120**; EONET `limit=80` |
| `msn-` | `loadLaunches` — `id = msn-${m.id}` | same | LL2 `limit=16` |
| `leg-` | `loadLegislatures` — `keptContact` id `leg-${iso2}` | `purgeExtras("leg-")` then add desks, or purge + count 0 if LEG off | **≤ 33** |

Intel traffic is **not** extras: `flt-` / `mil-` maps, `ves-` + `clearPrefix`, `sat-` wraps + `orbitEntity`. Click ignores `orbit-`.

Subscribe (`1355–1398`) flips those four extras prefixes plus FLT/MIL/VES/SAT. **No `layers.permits` branch.** Boot after first Earth (`1452–1459`) reloads the seven intel layers only — **not LEG, not AHJ**.

Reserved for KIT-06 (draft ids, not in extras today): `ahj-core-{placeId}`, `ahj-st-{ST}`. Do not reuse `eq-` / `fire-` / `msn-` / `leg-` / `flt-` / `mil-` / `ves-` / `sat-` / `orbit-`. `purgeExtras("leg-")` must not wipe AHJ; `purgeExtras("ahj-")` must not wipe LEG.

---

## 2. Civic max today — LEG 33, AHJ 0 (E)

### LEG

`src/lib/kept/desks.ts` `keptDesks()` walks atlas `kit_on_disk`, joins `capitals.json`, **`return out.slice(0, 33)`**. Contact id is `leg-${iso2}`.

Wired in both engines when `layers.legislatures.on`:

- Globe: `loadLegislatures()` (`893–927`) — purge `leg-`, `entities.add` one billboard per desk, `extras.set(contact.id, …)`, layer `count: desks.length`. Subscribe calls it on LEG flip (`1393–1395`). Click `leg-` → `setDesk({ system: "kept", id: iso2 })`.
- Flat: `refreshMarks()` (`661–680`) pushes `leg-${d.iso2}` marks, same 33-cap. Select `leg-` opens the kept desk.

Default `legislatures.on = false`, `count: 0`. Off path: globe purges `leg-` and reports count 0; flat omits the loop.

**Max civic LEG entities today = 33.** Not 194 capitals. Not 13631 members.

### AHJ

`permitMarks` / `permitContact` live only in `src/lib/permit/permit-pins.ts`. Grep of `src/`: **no importer**. `globeEngine.ts` and `flatEngine.ts` never name `permits.on`, `permitMarks`, or `ahj-`.

Default `permits.on = false`, `count: 0`. Share-hash can light AHJ in the store; neither engine draws.

**Max civic AHJ entities today = 0 until KIT-06 wires the draft.** Harden README: draft exists; engine not wired.

---

## 3. `permit-pins.ts` draft (E)

`ORBIT_M = 2_000_000` (imported from `flightView.ts`). Local `STATE_SCALE_M = 250_000`.

### Dead dummy `stateCounts()` (`96–107`)

```
for (const p of searchAhj("a").concat(searchAhj("e")).concat(searchAhj("i"))) {
  /* dummy — don't use this */
}
void m;
const real = new Map<string, number>();
for (const id of Object.keys(STATE_CENTROIDS)) real.set(id, 0);
```

Search hits are discarded. Every centroid is stored as **0**. `permitMarks` does **not** call this function. Live counts come from `buildStateCounts()` — only the 12 `FEATURED_AHJ_IDS`, grouped by state.

**Do not “fix” `stateCounts()` by walking `REST_PLACES` / `places.ts` / `searchAhj` over the 1240 named desks.** That is how 16165 (or 1240) becomes a cluster weight and then a pin list.

### Orbit — 12 cores (`123–137`)

If `heightM` is not finite **or** `heightM > ORBIT_M`: one `ahj-core-${id}` per featured metro that has `FEATURED_COORDS` + a searchable place, then `out.slice(0, 12)`.

`FEATURED_AHJ_IDS` / `FEATURED_COORDS` are the same 12: Miami, Miami-Dade, NYC, LA, Houston, Chicago, Seattle, Atlanta, Philadelphia, Phoenix, Denver, DC. Approximate city points. **Not parcels. Not Rest.**

### Mid — 56 clusters (`139–153`)

If not orbit and `heightM > 250_000`: one `ahj-st-${code}` per `STATE_CENTROIDS` key. Keys = 50 states + DC + PR + VI + GU + AS + MP = **56**. `count = Math.max(featuredInState, 1)` so **every centroid is emitted** (even states with 0 featured desks).

### Close (`155–168`)

Else: the same 12 cores, `slice(0, 50)` → **12**. Draft does **not** uncluster Rest at county scale.

| Band | Predicate | Draft n | kind |
| --- | --- | ---: | --- |
| Orbit | `!finite(h) \|\| h > 2_000_000` | **12** | `core` |
| Mid | `2_000_000 ≥ h > 250_000` | **56** | `cluster` |
| Close | `h ≤ 250_000` | **12** | `core` |

Draft ceiling if wired as-is: **56**. Rest leaves in this file: **0**.

---

## 4. Cap never 16165 (E)

`vendor/kept/_out/permit-index.json` lock 2026-08-18:

| Layer | Count | First-paint globe |
| --- | ---: | --- |
| core | 79 | 0 |
| extra | 462 | 0 |
| more | 699 | 0 |
| rest | 14925 | 0 |
| **sum** | **16165** | **0** |

`honesty.rest_is_count_not_map: true`. `PlaceDesk` has no lat/lon. Featured 12 have hand-entered `FEATURED_COORDS`. State clusters use centroids, not AHJ parcels.

**16165 is the unique-id sum. It is not `viewer.entities.length`. It is not a KIT-06 quota.** Showing it as pins at orbit (or at all) is the named P0.

---

## 5. Stress — camera-move reload (E + I)

### E — what already reloads on camera

Globe tick (`1330–1340`): every **280 ms** writes `cam` and calls `onCamForFlights()` (`1403–1414`). Flights reload is **debounced 700 ms** and keyed:

`orbit` vs `${lat.toFixed(1)}:${lon.toFixed(1)}:${Math.round(distNm / 25)}`

Same key → return. Civic extras are **not** on this path today.

Flat `paint()` (`213–221`) writes `cam.height = zoomToHeight(zoom)` on every pan / wheel / pinch. `refreshMarks()` is **not** on paint: it runs on any layer `.on` flip and on an **8 s** interval (`719`). Camera-move on the phone map does not currently rebuild marks.

### I — KIT-06 failure mode

`permitMarks(heightM)` is a **pure band function**. Wiring it as:

`every cam tick → purgeExtras("ahj-") → permitMarks(h).forEach(add)`

is a camera-move reload. At 280 ms that is ~3.5 Hz entity churn even at n=12. Crossing 2_000_000 m or 250_000 m swaps 12 cores ↔ 56 clusters; that swap must happen **once per band**, not per tick.

Worse: using camera-move as the moment to iterate Rest / named 1240. That is how 16165 lands while the operator is still flying in.

Copy the flights pattern: **band+cell key + debounce**. Reload AHJ only when the key changes. Do not hang civic purge/add off the raw `setCam` write. Do not put `permitMarks` inside flat `paint()` (every pan). Do not wait only on the 8 s timer (stale band after zoom).

---

## 6. Stress — dual engines globe + flat (E + I)

### E — two boots, one canvas

`GlobeCanvas.tsx`:

- phone → `bootFlatMap`
- desktop → `bootGlobe`
- desktop boot **catch** → `bootFlatMap` (“3D missed. Switching to tiles.”)

One live engine per session. Two **code paths**. LEG is already duplicated (globe extras + flat marks). AHJ is in neither.

Flat rebuilds the **entire** `marks` array in `refreshMarks()` (flights, mil, ves, eq, fire, msn, sat, LEG). Adding AHJ there without a cap dumps on the phone map even if globe is gated. Globe `purgeExtras` does not touch flat dots.

### I — both must take the same budget

KIT-06 that wires only `globeEngine` leaves phone/fallback at 0 (safe, incomplete) or invites a later “just plot Rest on tiles” patch (unsafe). KIT-06 that wires only `flatEngine` leaves desktop at 0 and still risks the 8 s full rebuild.

Lock for the sitting that implements:

1. Same `permitMarks(heightM)` in both engines. Same 12 / 56 / 12. Same **never 16165**.
2. Globe: extras prefix `ahj-`, purge on AHJ off, band-keyed reload (not 280 ms raw).
3. Flat: add AHJ marks inside `refreshMarks` **or** a band-keyed helper; never inside `paint()`. Cap the array; do not concatenate Rest.
4. Click `ahj-core-*` may open a permit desk (later). Click `ahj-st-*` must not explode a cluster into 16165 leaves.
5. Do not mount both engines. Fallback replaces globe; it must not add a second pin set on top of Cesium leftovers (cleanup already destroys the viewer).

---

## 7. Forbidden

- 16165 Cesium entities or flat marks at any camera, especially default 20–22_000 km
- 14925 Rest leaves on first paint, orbit, mid, or close
- “Fixing” `stateCounts()` with Rest / `places.ts` / a 1240 walk
- Camera-tick purge+add of civic extras
- AHJ inside flat `paint()`
- Raising `REGION_CAP` (120) to fit Rest
- Plotting 194 capitals or 13631 members as LEG
- Reusing `eq-` / `fire-` / `msn-` / `leg-` for AHJ
- Importing `places-rest.ts` from `globeEngine` / `flatEngine` / `GlobeCanvas` / first-paint HUD

---

## 8. Verify later (not this sitting)

| # | Check |
| --- | --- |
| V1 | Default boot 22_000_000 m, LEG/AHJ off: civic extras **0** |
| V2 | LEG on, either engine: `leg-*` count **≤ 33**, not 194 |
| V3 | AHJ on before KIT-06 wire: still **0** `ahj-*` |
| V4 | KIT-06 + AHJ on + orbit: **≤ 12** cores, **0** Rest, total ≠ 16165 |
| V5 | KIT-06 + AHJ on + mid (e.g. 900_000 m): **≤ 56** clusters, 0 Rest |
| V6 | Camera pan at constant band: AHJ entity/mark count **unchanged** (no reload) |
| V7 | Band cross orbit↔mid: one rebuild, then stable |
| V8 | Phone `bootFlatMap` and desktop fallback: same 12/56 cap as globe |
| V9 | `stateCounts()` still unused; no Rest import in engine graph |
| V10 | `purgeExtras("leg-")` leaves `ahj-*`; FLT still prunes at `ORBIT_M` |

---

## E / I / A

**E — Evidence (this tree, this sitting)**

- `globeEngine.ts` extras prefixes: **`eq-` / `fire-` / `msn-` / `leg-`**. `purgeExtras` by prefix. Subscribe loads those four + intel; **no permits**. Boot reload (`1452–1459`) skips LEG and AHJ.
- `keptDesks()` **`.slice(0, 33)`**. Globe `loadLegislatures` + flat `refreshMarks` LEG loop. Default LEG off.
- `permit-pins.ts` imported by **nobody**. AHJ entities today **0**.
- `stateCounts()` is a dead dummy (a/e/i search unused; all 56 keys stored as 0). `permitMarks` uses `buildStateCounts()` on 12 featured ids only.
- `permitMarks`: orbit **12** cores; mid **56** `STATE_CENTROIDS` clusters; close **12** cores. `slice(0, 12)` / always-56 / `slice(0, 50)`.
- `permit-index.json`: 79 / 462 / 699 / 14925 = **16165**; `rest_is_count_not_map: true`.
- Camera: globe `lastCamWrite` 280 ms + flights debounce 700 ms + orbit/cell key. Flat `paint()` writes cam; `refreshMarks` is layer-flip + 8 s, not pan.
- Dual engines: `GlobeCanvas` phone → flat, desktop → globe, desktop fail → flat. LEG already in both. AHJ in neither.
- Store defaults: `cam.height` **20_000_000**; both civic layers `on: false`, `count: 0`.

**I — Inference**

- The 16165 failure is one subscribe/camera branch that iterates the catalog. Today that branch does not exist for AHJ. KIT-06 must keep n at the draft ceiling (56), not at the index sum.
- `stateCounts()` is a trap: filling the empty loop from search or Rest turns a dummy into a dump. Leave it dead or delete it in the implement sitting; do not animate it.
- 12 orbit cores are the cheap Core hint (KIT-06 / seat 20). They are not Rest and they do not license 79 core pins, 1240 named pins, or 14925 leaves.
- Camera-move reload kills FPS long before n reaches 16165. Band-key the reload like flights. Dual engines must share the cap or the fallback map becomes the dump.

**A — Assumption**

- KIT-06 (next kit per harden README) will import `permitMarks` into **both** `globeEngine.ts` and `flatEngine.ts`, behind `layers.permits.on`, with prefix `ahj-` and a camera **band key**.
- Rest stays a count until sourced coordinates exist. Clustering without lat/lon is not a reason to geocode 14925 rows.
- Operators will not treat this budget as permission to edit `src/` from this seat. Host implements after audits.

---

## Stop

Prep only. **Do not wire `permit-pins.ts` this sitting.**  
Today: LEG **≤ 33**, AHJ **0**. Draft: orbit **12**, mid **56**. **Never 16165.**  
Camera-move does not rebuild civic. Globe and flat take the same cap.
