# H04 — KIT-00..06 completeness

Seat: **H04**. Tree: `REPO_ROOT`.  
Write: this file only. No `src/` edits. Date: 2026-08-29.

Law: `FEATURE_KITS.md` (one kit per turn). Paste blocks: Handoffs `KIT-00` … `KIT-06`.  
Scores are against **this tree’s disk**, not live gevradio and not the 32-seat prep briefs (those predate the adapters).

---

## Scoreboard

| Kit | Name | Depends | Score | Why |
| --- | --- | --- | --- | --- |
| KIT-00 | Shell lock | remix | **DONE** | Cockpit files present. Localhost smoke log exists. Homepage is still `IntelApp`. |
| KIT-01 | Layer registry | 00 | **DONE** | `legislatures` + `permits` are LayerIds. Rail + store default **off**. |
| KIT-02 | Desk drawer | 01 | **DONE** | `DeskDrawer.tsx` mounted. `desk` on the store. Esc closes desk before corpus. No civic route. |
| KIT-03 | Kept desks | 02 | **DONE** | `src/lib/kept/desks.ts` + `roster.ts`. Engine **does** subscribe to LEG. Country contacts only. |
| KIT-04 | Permit search | 02 | **DONE** | `search-lite.ts` = Core/Extra/More. Drawer search + chips + disclaimer. Civic path does not import Rest. |
| KIT-05 | Command grammar | 03+04 | **DONE** | ≥5 civic phrases parse and apply. Radio / style phrases not stolen. |
| KIT-06 | Permit zoom gate | 04 | **PARTIAL** | **Next kit.** Draft `permit-pins.ts` exists. `globeEngine` does **not** subscribe to `permits`. |

**Next kit: KIT-06.** Do not start KIT-07 streams, KIT-08 PWA, or a Rest dump.

FEATURE_KITS definition of done (globe orbits, Creedence from the bar, honesty visible, no skill-brand UI) is **I** for this sitting — this seat did not re-run browser smoke. File-level civic work for 00–05 is on disk.

---

## Named spine (this seat’s required checks)

| Artifact | Disk | Kit | Note |
| --- | --- | --- | --- |
| `src/components/desks/DeskDrawer.tsx` | **present** | 02 (host for 03/04) | Kept adapter + Permit adapter filled. Compare shell is a KIT-07 stub. |
| `src/lib/kept/desks.ts` | **present** | 03 | Atlas `kit_on_disk` ∩ capitals, cap 33. `keptContact` kind `legislature`. |
| `src/lib/kept/roster.ts` | **present** | 03 | Lazy `members.json` glob. Names as filed. Hole string if unnamed. |
| `src/lib/permit/search-lite.ts` | **present** | 04 | `CORE_PLACES` + `EXTRA_PLACES` + `MORE_PLACES`. **No** `places-rest`. |
| `src/lib/permit/permit-pins.ts` | **present, unwired** | 06 draft | `permitMarks` / `permitContact` exported. **Zero importers.** |
| `globeEngine` `layers.legislatures` subscribe | **present** | 03 | `loadLegislatures()` on LEG toggle. Click `leg-*` opens kept desk. |
| `globeEngine` `layers.permits` subscribe | **absent** | 06 | Grep `s.layers.permits` under `src/lib/intel` = **0**. AHJ toggle is store + rail only. |

---

## KIT-00 — Shell lock — **DONE**

Handoff: `KIT-00-shell-lock.md`. Goal: prove the remixed cockpit before civic code.

**E.** These files exist:

- `src/components/intel/IntelApp.tsx` — `GlobeCanvas` + `DetectionOverlay` + `OverlayHud`
- `GlobeCanvas.tsx`, `OverlayHud.tsx`, `RadioDeck.tsx`, `CommsChat.tsx`, `FirstRun.tsx`
- `src/lib/intel/types.ts`, `commands.ts`, `radio.ts`, `globeEngine.ts`

`src/routes/index.tsx` still mounts `<IntelApp />`. Footer command bar is `z-30` (`OverlayHud.tsx`). Header is `z-30`. Smoke logs: Handoffs `KIT-00-SMOKE-LOCALHOST-2026-08-29.md` (this tree on `:8080`) and `KIT-00-SMOKE-2026-08-29.md` (live gevradio, not this writable tree).

**I.** Civic kits landed **after** that smoke. That does not reopen KIT-00 unless the globe, radio, comms, or first-run were replaced. They were extended, not swapped. First-run cards were not replaced.

**A.** Hold the shell. Do not restyle the HUD. Do not iframe keptglobal. Icon-180 / `cesiumStatic` 404s are KIT-00 residuals, not a fail. KIT-08 owns PWA.

---

## KIT-01 — Layer registry — **DONE**

Handoff: `KIT-01-layer-registry.md`. Goal: LEG + AHJ as LayerIds **without** civic markers.

**E.** `types.ts`: `LayerId` includes `"legislatures" | "permits"`. `Kind` includes `"legislature" | "permit"`. `LAYER_META`:

| id | short | source | freshness |
| --- | --- | --- | --- |
| legislatures | LEG | Kept harvest / public registers | delayed |
| permits | AHJ | Permit Harbor catalog (locked 2026-08-18) | delayed |

`store.ts` `defaultLayers()`: both `{ on: false, count: 0, freshness: "off" }`.  
`OverlayHud.tsx` `LAYER_ORDER` ends `legislatures`, `permits`. Same rail `setLayer`.  
`commands.ts` LAYERS table includes LEG / AHJ; `show legislatures` / `hide permits` emit `{ type: "layer", id, on }`.  
`runCommand.ts` layer apply is generic (`id in LAYER_META`).

**I.** KIT-01’s done-when is rail + store. Country pins are KIT-03. Permit pins are KIT-06. Toggling AHJ today still updates rail + store only — that is **KIT-06 missing**, not a KIT-01 regression.

**A.** Do not default LEG/AHJ on. Do not import `places-rest.ts` from the engine.

---

## KIT-02 — Desk drawer — **DONE**

Handoff: `KIT-02-desk-drawer.md`. Goal: one slide-over; globe stays mounted.

**E.** `src/components/desks/DeskDrawer.tsx` exists and is imported in `OverlayHud.tsx` (`<DeskDrawer />` next to `CorpusPanel` / `RadioDeck` / `CommsChat`). Not a route.

Store (`store.ts`):

```ts
desk: null | { system: "kept" | "permit"; id: string }
setDesk: (d) => set((s) => ({ desk, corpusOpen: desk ? false : s.corpusOpen }))
setCorpusOpen: (v) => set((s) => ({ corpusOpen, desk: corpusOpen ? null : s.desk }))
```

Esc order (`OverlayHud.tsx`): comms → radio picker → first-run → **desk** → corpus → cockpit → track → layer drawer.  
Chrome: `kicker` Legislature / Building desk, close button, footer honesty / `DISCLAIMER`. Geometry: `bottom-28`, `md:w-[22rem]`, `z-20` (footer stays `z-30`).  
Commands: `open legislature desk` / `open building desk` / `close desk` → `{ type: "desk" }` applied **before** `if (!engine) return`.

**I.** The kit allowed placeholder “No desk selected.” Later kits filled the body. Empty open is still `{ system, id: "" }` → Kept atlas / Permit home. That is the slot working, not a skip of KIT-02.

**A.** Do not add a desk route. Do not unmount Cesium. Adapter bugs belong to 03/04, not a reopen of 02.

---

## KIT-03 — Kept desks — **DONE**

Handoff: `KIT-03-kept-desks.md`. Goal: country contacts + honest roster drawer.

**E.** `src/lib/kept/desks.ts`:

- Reads `vendor/kept/_out/atlas.json` + `capitals.json`
- Eager glob `vendor/kept/kits/*/meta.json`
- `keptDesks()`: `kit_on_disk` ∩ capital point, **slice 0..33**
- Atlas on disk: **33** `kit_on_disk: true`. Canada `ca` kit_on_disk true. Korea `kr` kit_on_disk true. Capitals `CA` Ottawa, `KR` Seoul (iso2 lowercased in the join).
- One `Contact` per country (`keptContact`): kind `legislature`, meta `chamber · N of M named`, **no member pins**
- `keptAtlasHoles()` = atlas rows without a kit (A–Z empty list)

`src/lib/kept/roster.ts`: lazy `members.json` glob. Skips blank names. Hole if 0 named or named < claimed. `source_url` surfaced. **No** `votes.json` import under `src/`.

`globeEngine.ts`:

- `import { keptContact, keptDesks } from "@/lib/kept/desks"`
- `loadLegislatures()` purges `leg-`, plots ≤33 billboards, sets LEG count
- `useIntel.subscribe`: `s.layers.legislatures.on !== prev` → `loadLegislatures()`
- Click: `id.startsWith("leg-")` → `setDesk({ system: "kept", id: iso2 })`

`flatEngine.ts` also plots LEG and opens the kept desk (phone path).  
`DeskDrawer` `KeptBody`: chamber, `named of seats`, source link, method one-liner (“Score against this chamber’s sourced pledges, never a party ticket.”), roster or hole. `KeptAtlas` lists kits + holes.

**I.** Done-when: `show legislatures` lights country markers; Korea / Canada open a drawer with sourced names or an honest hole. Parser: `open korea` → `matchKeptDesk` substring on “Republic of Korea” (KP is not in `keptDesks()`). Scoring is **copy**, not an influence number — that is the kit’s do-not.

**A.** Do not enable Streams/compare fill (KIT-07). The compare **shell** already exists in the drawer (`desk.id` `compare:a:b`) as a KIT-05 phrase; data fill is still empty. Do not plot the 163 holes. Do not pad seats.

---

## KIT-04 — Permit search — **DONE**

Handoff: `KIT-04-permit-search.md`. Goal: find an AHJ without pinning Rest.

**E.** Civic search is `src/lib/permit/search-lite.ts`, **not** `places.ts` / `catalog.ts`.

```ts
import { CORE_PLACES } from "./places-core";
import { EXTRA_PLACES } from "./places-extra";
import { MORE_PLACES } from "./places-more";
// no places-rest
```

- `permitChip`: core → `higher`; extra/more → `mid`
- Empty query → 12 `FEATURED_AHJ_IDS` (includes `fl-miami`)
- Typed query → substring over searchable, cap 40
- `getSearchablePlace(id)` Rest-free

`DeskDrawer` Permit path: search box, hits with name/kind/state + chip, card with portal (“portal not verified”), department URL, state pack notes / common permits, playbook `<select>` from `PLAYBOOKS`, footer = `DISCLAIMER` from `types.ts`.

Commands: `find AHJ in {place}` / `building desk {place}` → `{ type: "permitSearch" }`.  
`runCommand.ts` uses `searchAhj` from **search-lite**. Single/exact hit opens that id and `lookupPlace(name state)`; else `search:{q}` list.

HUD / globe importers of `@/lib/permit/*`: `search-lite`, `states`, `playbooks`, `types`. **Not** `places.ts`, **not** `catalog.ts`, **not** `places-rest.ts`.

Residual fuse (not a KIT-04 fail of the civic path): `places.ts` still `import { REST_PLACES } from "./places-rest"` and concatenates into `PLACES`. `catalog.ts` still imports `places.ts`. Nothing in the HUD graph imports either.

**I.** Done-when: `find AHJ in miami` opens a desk with a confidence chip and the disclaimer. That path is wired. Factory URLs are not called verified. No fee tables. No pin loop (KIT-06).

**A.** Do not let KIT-06 (or anyone) import `places.ts` / `catalog.ts` into the engine. Split or quarantine the Rest concat before any pin module walks `PLACES`. Rest search is KIT-06 opt-in, not first paint.

---

## KIT-05 — Command grammar — **DONE**

Handoff: `KIT-05-command-grammar.md`. Depends on 03 + 04 (both **DONE**). Goal: civic phrases in the existing bar.

**E.** `commands.ts` local parser, radio/style **before** civic steal-risk, then:

| Phrase | Action on disk |
| --- | --- |
| `show legislatures` / `hide permits` | `{ type: "layer", id, on }` |
| `open {country or capital}` | `{ type: "keptOpen", iso2 }` via `matchKeptDesk` |
| `score the sitting in {country}` | same `keptOpen` (opens desk; does not compute a score) |
| `compare {a} and {b}` | `{ type: "keptCompare" }` → `desk.id = compare:a:b` shell |
| `find AHJ in {place}` | `{ type: "permitSearch" }` |
| `building desk {place}` | `{ type: "permitSearch" }` |
| `{project} permit playbook` | `{ type: "permitPlaybook" }` from `PROJECT_KINDS` |
| `take me to the chamber in {place}` | `{ type: "keptOpen" }` |

`put on` / station names still hit radio first. `nvg` / `flir` still hit styles. Unknown → optional Grok `interpretCommand` if key present, else `{ type: "unknown" }` → flash, not a crash.

That is **nine** civic phrases. Kit asked for five.

`store.ts` hint: `"yo tokyo · put on creedence · find AHJ in miami"`.

**I.** “Score the sitting” executing as **open the honest desk** is correct under KIT-03 do-not (no influence score). Compare shell with “streams not filled” is the KIT-05 contract; KIT-07 fills data.

**A.** Do not steal radio phrases. Do not add Rest to `permitSearch`. KIT-07 may fill compare; do not start it this turn.

---

## KIT-06 — Permit zoom gate — **PARTIAL** (next)

Handoff: `KIT-06-permit-zoom-gate.md`. Depends on KIT-04 (**DONE**). Goal: cheap permit markers; Rest never dumps at orbital zoom.

**E.** Draft module only.

`src/lib/permit/permit-pins.ts` exists. It exports `FEATURED_COORDS` (12 core metros), `STATE_CENTROIDS` (56 packs), `permitMarks(heightM)`, `permitContact`. Height bands reuse `ORBIT_M` (2_000_000 m) from `flightView.ts`.

What the draft actually draws:

| Height | Draft `permitMarks` | Kit rule |
| --- | --- | --- |
| orbit (`> ORBIT_M` or non-finite) | up to **12** featured Core points | 0 Rest. Optional handful of Core — draft matches this slice |
| `> 250_000` (not orbit) | **all** state centroids, `kind: "cluster"`, count mostly `1` | should cluster Extra/More (+ Core) for the **visible pack** |
| else | same 12 Core, cap 50 | should uncluster nearby desks, label cap ~50 |

Dead code in the same file: `stateCounts()` concatenates dummy `searchAhj("a"|"e"|"i")` then zeros every state. Unused. `buildStateCounts()` only counts the 12 featured ids.

**Not on disk:**

- `globeEngine.ts` does not import `permit-pins`
- no `if (s.layers.permits.on !== prev…)` branch
- no camera-move rebuild of permit entities
- no click → `setDesk({ system: "permit", id })` for `ahj-*`
- no lazy `import()` of `places-rest.ts`
- no Rest-hit search (KIT-04 search-lite still says “Rest not searched”)
- no Extra/More clustering
- `flatEngine.ts` has LEG, not AHJ pins

AHJ rail toggle therefore still does what KIT-01 specified: store + rail, **zero Cesium entities**. P0 “no 16k pins at orbit” holds by **vacuum**, not by a gate.

**I.** A draft helper is not the kit. Done-when (“orbital + permits-on does not spawn thousands of entities. A city search still finds a Rest name if opted in.”) is **not** met as a feature. Rest opt-in search is missing. Integrity tests (`scripts/permit/catalog-integrity.test.mjs`) still exist on the catalog side and must stay green when pins land.

**A.** **Execute KIT-06 next.** One kit per turn.

Wire list (host, not this seat):

1. `globeEngine` subscribe to `layers.permits` + camera-height (copy flights `onCamForFlights` / `ORBIT_M`).
2. Plot `permitMarks` only. Cap labels. Globe wins if FPS dies.
3. Click cluster / core → expand or `setDesk({ system: "permit", id })`.
4. Lazy-load `places-rest.ts` only on explicit Rest search or a pack with Rest enabled **below** county scale. Clustering **before** Rest is visible.
5. Every Rest pin/card: **provisional** chip + `DISCLAIMER`.
6. Do **not** import `places.ts` / `catalog.ts` (Rest concat fuse).
7. Same gap on `flatEngine` if phone must show AHJ.

Do not start KIT-07 in the same turn.

---

## P0 (fail closed — any one stops KIT-06)

From `FEATURE_KITS.md` / handoff:

1. Do not dump 16,165 Rest pins at orbital zoom.
2. Do not kill radio.
3. Do not unmount the globe.
4. Do not invent sitting names.
5. Do not ship certified-fake / “verified” factory portals.

KIT-00…05 as filed do not violate these. KIT-06 is the first kit that *could*. Skip and report if a P0 would fail.

---

## Out of this score

| Item | Status |
| --- | --- |
| KIT-07 streams / compare fill | not scored; shell only |
| KIT-08 one-click / PWA | not scored; icon-180 404 is KIT-00 residual |
| KIT-09 add-a-feature template | not scored |
| Live gevradio | not this tree |
| This sitting’s browser smoke | **not run** (I, not E) |

---

## Stop

00–05 **DONE** on disk. 06 **PARTIAL** — draft `permit-pins.ts`, engine not wired.  
**Next: KIT-06 permit zoom gate.** One kit. No Rest dump.
