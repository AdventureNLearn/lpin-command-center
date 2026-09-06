# SEAT 20 — ZOOM GATE (KIT-06 prep)

Seat: 20 · band: later kits (prep only) · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
Write: this file only. No `src/` edits. No `_out/` edits. Do not implement KIT-03+.

**Claim:** Rest later must reuse the flights camera-height gate (`heightM > 2_000_000` m = **> 2000 km** → no fetch). KIT-02 and KIT-04 must not plot Rest.

---

## E — Evidence

### KIT-06 (not this sitting)

Source: `C:\AOS\ops\obsidian\AOS-v3-Sovereign-Brain\Active\Handoffs\gevradio-unification\KIT-06-permit-zoom-gate.md`  
Depends on KIT-04. Goal: permit markers stay cheap; Rest never dumps at orbital zoom.

| Camera height (kit, qualitative) | What may draw |
| --- | --- |
| Orbital / continent | **0 Rest pins.** Optional handful of Core metros if cheap. Search hint in HUD. |
| State-scale | Cluster Extra/More (+ Core) for the visible pack. Click cluster to expand. |
| County / city-scale | Uncluster nearby desks. Cap on-screen labels (~50). |
| Search / deep query | Rest may resolve **hits**, not the whole file. |

Kit Do: lazy-load `places-rest.ts` only on Rest search or zoom into a pack with Rest enabled; clustering required before Rest is visible; every Rest pin/card keeps **provisional** + disclaimer; if FPS dies, raise the height threshold and cut labels (globe wins).

Kit Done: orbital + permits-on does not spawn thousands of entities. City search can still find a Rest name if opted in. **This seat does not execute the kit.**

FEATURE_KITS: KIT-06 = clustered pins, no Rest dump. One kit per turn. Later-kits band = prep only.

### Flights region law (numeric, already on disk)

The kit has no meter number. The live-traffic stack already has one. That is the law to copy.

`src/lib/intel/flightView.ts`:

```ts
/** Above this camera height, do not fetch or plot live traffic. */
export const ORBIT_M = 2_000_000;  // meters = 2000 km
export const REGION_CAP = 120;

export function flightView(lat, lon, heightM): FlightView {
  const orbit = !Number.isFinite(heightM) || heightM > ORBIT_M;
  // ...
}
```

`src/lib/feeds/flights.ts` `getFlights` handler (after `flightView(lat, lon, heightM)`):

```ts
if (view.orbit) {
  return {
    flights: [] as FlightSample[],
    source: "Zoom in for live traffic",
    at: Date.now(),
    freshness: "off" as const,
  };
}
```

No ADS-B / OpenSky / Aviationstack pull on that path. Empty payload, HUD copy, stop.

`src/lib/intel/globeEngine.ts` `refreshFlights` repeats the same gate **before** `getFlights`:

- `flightView(cam.lat, cam.lon, cam.height)`
- if `view.orbit`: prune entities, `count: 0`, `freshness: "off"`, detail `"Zoom in for live traffic"`, **return** (no server fn)

Military plot uses the same `view.orbit` skip. Camera-move key is `"orbit"` vs region cell.

| Height (m) | km | `orbit` | Fetch? |
| ---: | ---: | --- | --- |
| not finite | — | true | **no** |
| `> 2_000_000` | **> 2000** | true | **no** |
| `= 2_000_000` (ISS preset) | 2000 | false | yes (at the line) |
| city presets 6k–80k | 6–80 | false | yes |

Store default `cam.height` is **20_000_000** (`store.ts`). Full-globe preset is **22_000_000**. First paint is orbit. FLT on at first paint already shows “Zoom in for live traffic” and does not fetch.

### Rest on disk (count, not a map)

`vendor/kept/_out/permit-index.json`: core **79** / extra **462** / more **699** / rest **14925** = **16165**. `honesty.rest_is_count_not_map: true`. Card is 1477 bytes.

`src/lib/permit/places.ts` today **static-imports** `REST_PLACES` and concatenates into `PLACES` / `searchPlaces` / `placesInState`. `places-rest.ts` is ~3.37 MB, 14925 `p("id")` rows. `PlaceDesk` has **no `lat` / `lon`**. There is nothing legal to `entities.add` for Rest without a later geocode/centroid.

`src/lib/permit/catalog.ts` `searchCatalog` calls `searchPlaces` — that would search Rest **if** KIT-04 imported `places.ts` as it sits today.

HANDOFF P0 (`GROK_BUILD_HANDOFF.md`):

- Never plot 16,165 permit pins at once.
- Global zoom + permits on = **0 Rest-layer pins**.
- Do not load `places-rest.ts` on first paint.
- Do not plot Rest-layer pins at orbital zoom.
- Rest appears only after: search hit, state pack, or camera below a **county-scale** threshold with clustering.

County-scale is **stricter than** 2000 km. The 2000 km law is the **no-fetch** hard stop (same as flights). Clustering/uncluster in KIT-06 is a later inner band below orbit.

### KIT-02 / KIT-04 (must not plot Rest)

KIT-02 (`KIT-02-desk-drawer.md`): empty `DeskDrawer.tsx`. Store `{ desk: null | { system: "kept" | "permit"; id: string } }`. Placeholder “No desk selected.” **No pin loop.** Globe stays mounted.

KIT-04 (`KIT-04-permit-search.md`): typeahead Core + Extra + More. **Do not import `places-rest.ts` in this kit.** Rest is explicit opt-in in KIT-06. “Do not plot thousands of pins.” Select → flyTo **if a coordinate exists** or state centroid fallback → open drawer. `PlaceDesk` has no coordinates today; flyTo is centroid/geocode, not a Rest dump.

`GlobeCanvas.tsx` is boot-only. Entity add/prune is `globeEngine.ts`. KIT-01 left LEG/AHJ with **no subscribe branch**. Do not add `if (s.layers.permits.on)` that iterates Rest from KIT-02 or KIT-04.

`docs/corpus-audit/13-drawer-contract.md`: KIT-04 must **break** the `places.ts` Rest import before the globe bundles Rest. Smoke / KIT-02 must not import `places.ts` at all.

---

## I — Inference

Flights already solved “orbital camera must not pull a planet dump.” Rest is the same class of dump (14,925 rows, ~3.3 MB source, 16k entities would kill Cesium). Copy the **same predicate**, do not invent a second orbit constant.

`heightM > ORBIT_M` (`2_000_000` m, **> 2000 km**) → `orbit === true` → **no Rest fetch, no Rest import, 0 Rest entities**, HUD hint (same voice as `"Zoom in for live traffic"`). First paint (`cam.height` 20e6) is already on the no-fetch side.

KIT-02 is chrome. KIT-04 is search in the drawer. Neither owns globe entities. Plotting Rest from either kit would skip KIT-06, bundle `places-rest.ts` onto first paint, and fail the 16k P0 even if the operator never zoomed.

KIT-06 later still needs the **inner** bands (state cluster, county uncluster, search hits). Those sit **below** the 2000 km gate. They do not weaken it. County-scale is not 2000 km; 2000 km is “do not even load.” Search hits may resolve Rest **names** without plotting the file.

---

## A — Action

Prep only. This seat writes no code.

### Same camera-height gate (KIT-06 later)

Reuse `ORBIT_M` / `flightView().orbit` from `src/lib/intel/flightView.ts`. Do not fork a second threshold unless FPS forces a **raise** (KIT-06 already says raise height + cut labels if the globe dies).

| `cam.height` | Flights (exists) | Rest (KIT-06 later) |
| --- | --- | --- |
| `> 2_000_000` m (**> 2000 km**) or non-finite | no fetch; empty; “Zoom in for live traffic” | **no** `places-rest` import; **0** Rest entities; search hint; optional cheap Core metros only |
| ≤ 2000 km (below orbit) | region fetch, cap 120 | still not a file dump; cluster Extra/More (+ Core); Rest only after search / state pack / **county-scale** + clustering |
| Search / deep query | n/a | Rest **hits** only, provisional chip + disclaimer |

Wire the Rest skip the same way `refreshFlights` skips `getFlights`: compute `flightView` (or a thin alias that reads the same `ORBIT_M`), if `orbit` then prune Rest bucket and return. Do not lazy-load the 3.3 MB module on that path.

Suggested HUD copy when AHJ is on and `orbit`: same pattern as flights — “Zoom in for AHJ pins” / “type a city / county”. Do not spawn placeholders for 14925 ids.

### KIT-02 must not plot Rest

Empty drawer only. No `entities.add`. No `places-rest`. No `places.ts` (it concatenates Rest today). No `if (layers.permits.on)` pin loop in `globeEngine` / `flatEngine`. Rest pin count on the globe after KIT-02 = **0**.

### KIT-04 must not plot Rest

Break `places.ts` Rest concatenation **before** search is wired. Search Core + Extra + More only. Do not import `places-rest.ts`. Do not `searchPlaces` on the concatenated `PLACES`. Results live in the drawer (name, kind, state, portal, confidence chip, `DISCLAIMER`). flyTo = existing coordinate or state centroid — not a Rest pin field (none exists). Rest opt-in search is KIT-06, still hit-capped, still gated by `orbit`.

### Do not (this sitting and KIT-02/04)

- Do not implement KIT-06.
- Do not plot Rest from DeskDrawer or PermitAdapter.
- Do not bundle `places-rest.ts` on first paint.
- Do not dump 16165 / 14925 pins.
- Do not treat factory / Rest URLs as verified.
- Do not add a civic pin loop “just to see.”

### Stop

Flights already no-fetch above 2000 km. Rest later copies that gate. KIT-02/04 never plot Rest. KIT-06 owns clustered pins after the operator is below orbit.
)
