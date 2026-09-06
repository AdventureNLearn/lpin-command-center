# SEAT 15 — Pickup plan for host builder

Target class: public-suite. One tree: `groks-eye-view-next`.
Bots: PARK. Corpus: `vendor/kept/_out/` (read-only).
This sitting: HOST smokes a comprehensive intelligence dashboard **BASE**. Plan only. Do not implement from this file.

---

## E — Evidence (mined 2026-08-29)

### Park / handoff

- `vendor/kept/_out/STATUS.md`: **PARK**. Writers none. Next is user/ANL Grok Build from ANL pack. CoS does not start Grok Build. No src writes from bots.
- `vendor/kept/_out/HANDOFF.md`: packages **33/33 PASS**, remaining 0. WAVE-501 US **PASS**. Do not merge into live gevradio. Do not edit `src/` or kits from that handoff.
- KIT-00 localhost smoke (2026-08-29) is green. Civic code **not started**. No LEG/AHJ on the rail. First-run four cards + Esc. `tokyo` flies. NVG3/Normal1. Creedence plays. Comms open/close. FLT on → live count · **adsb.lol**. Command bar survives **390px**. Residual: Windows `npm run dev` → `spawn vite ENOENT`; KIT-00 started via `node.exe scripts/with-app-env.mjs node.exe node_modules/vite/bin/vite.js …`. Do not “fix” adsb.lol vs live adsb.fi as a drive-by.

### Shell now (seven layers only)

`src/lib/intel/types.ts` `LayerId` / `Kind` / `LAYER_META` are FLT MIL AIS SAT EQ FIR MSN. No `legislatures`, no `permits`.
`src/lib/intel/store.ts` `defaultLayers()` all start **off**.
`src/components/intel/OverlayHud.tsx` `LAYER_ORDER` is those seven. Existing `L` drawer is the **open-sources rail**, not a civic desk. Esc already closes comms → radio picker → first-run → cockpit → track → that drawer.
`src/lib/intel/commands.ts` has no LEG/AHJ/corpus phrases.
`src/components/intel/GlobeCanvas.tsx` mounts Cesium (or flat fallback). **No pin loop in this file.** Entity add/prune lives in `src/lib/intel/globeEngine.ts` (do not open a pin loop this sitting). Engine subscribe handles the seven live layers only; unknown LayerIds would be store-only if added and not subscribed.

### Corpus on disk (`vendor/kept/_out/`)

| File | Size / shape | Use this sitting |
| --- | --- | --- |
| `atlas.json` | 38842 B. **196** country rows. `kit_on_disk: true` = **33**. `un_member: false` = 3 (`ps`, `tw`, `va`). | Count 33/196. No pins. |
| `capitals.json` | 63816 B. schema `gev.capitals.v1`. **count: 194** points. Note: “No permit pins.” | Count + hole vs 196. **Do not plot.** |
| `permit-index.json` | 1477 B. lock **2026-08-18**. counts core **79** / extra **462** / more **699** / rest **14925** (= **16165**). `rest_is_count_not_map: true`. factory URLs **not** verified. | Counts + honesty. **Do not import `places-rest.ts`.** |
| `packages/_index.json` | 11074 B. `kit_on_disk_count: 33`. `remaining_count: 0`. last_audit PACKAGE-TZ PASS, tz holes 18. 33 rows all `kit_package` + `permit_package`. 12 fill extras (us ca kr gb de br ua fr cn it tw pl). | Roster of 33 kits + per-row hole counts. Do not load `packages/{iso}.json` this sitting. |
| `501-links.json` | 125973 B. iso2 `us`. **nodes 199**, **edges 215** (fec 186, usaspending 29), **holes 17**. WAVE-501 PASS. | Lazy load. **Counts + hole list only. No node-name dump.** |

HANDOFF honest extras: country-native permit catalogs may be zero (example: `packages/ng-permit.json` counts all 0, hole “US AHJ catalog has no Nigeria AHJs”). No ng/tr/mx fill files.

ARCHIVE.md “34 kit folders / 196 desks” is **stale**. Authority this sitting is `_out`: **33/196**. Do not recount `vendor/kept/kits/`.

### Kits that exist and must not run

FEATURE_KITS: one kit per turn. KIT-01 = LayerIds, default off, no pins. KIT-02 = `src/components/desks/DeskDrawer.tsx` (empty kept/permit drawers). KIT-03+ = country markers, AHJ typeahead, zoom-gated pins, streams.
This BASE panel is **not** KIT-02. Do not create `DeskDrawer`. Do not copy harvest members. Do not enable LEG/AHJ drawing.

### P0s already on disk (GROK_BUILD_HANDOFF + KIT-00)

Homepage is the globe. Radio/comms/HUD/command bar stay reachable. Never plot 16,165 Rest pins. No invented sitting names. No skill brands / FROGNET / GOYNET / Layer-0 in product UI. Honest incomplete > padded complete. Fail closed if globe or radio dies.

---

## I — Intent

Host-only sitting. Smoke a **BASE** intelligence dashboard on localhost:

1. **KIT-01 only** for layers: `legislatures` (LEG) + `permits` (AHJ) as real LayerIds. Default **OFF**. Empty contacts. **No pins.**
2. One **corpus loader** that reads `_out` JSON (atlas, capitals, permit-index, packages/_index; **lazy** 501).
3. One **corpus panel** in the existing HUD. Globe stays mounted. Shows 33/196, permit counts, 501 node/edge/hole counts, honest holes. Command opens/closes it.
4. Re-run KIT-00 browser smoke plus LEG off, AHJ off, corpus panel on/off, 390px, no Rest pins, no skill brands.

Out of scope: KIT-02+, live remix, bot writes, npm install, git push, sitting-name dumps, gevradio remix, 16k pin loop.

---

## A — Action (host implement, later sitting)

### 0. Preconditions (fail closed before coding)

- Bots still PARK. Do not touch `vendor/kept/_out/` or `vendor/kept/kits/`.
- Do not edit `package.json`. Do not `npm install`. Do not `git push`. Do not open live gevradio as a write target.
- Start localhost the KIT-00 way if `npm run dev` ENOENT on Windows:

```
node.exe scripts/with-app-env.mjs node.exe node_modules/vite/bin/vite.js dev --host 0.0.0.0 --port 8080
```

- Confirm http://127.0.0.1:8080/ still orbits + Creedence **before** any civic diff. If P0 is already red, stop.

### 1. KIT-01 only — LayerIds, default OFF, no pins

Do exactly KIT-01 (`KIT-01-layer-registry.md`):

1. `src/lib/intel/types.ts`
   - `LayerId` += `"legislatures" | "permits"`
   - `Kind` += `"legislature" | "permit"` (typed only; no contacts)
   - `LAYER_META`:
     - legislatures · **LEG** · “Kept harvest / public registers” · freshness **delayed**
     - permits · **AHJ** · “Permit Harbor catalog (locked 2026-08-18)” · freshness **delayed**
2. `src/lib/intel/store.ts` — add both to `defaultLayers()` with `{ on: false, count: 0, freshness: "off", detail: LAYER_META.*.source }`.
3. `src/components/intel/OverlayHud.tsx` — append LEG then AHJ to `LAYER_ORDER`. Rail toggle uses existing `setLayer` (on → meta.freshness, off → `"off"`). Do not auto-open corpus when toggling LEG/AHJ.
4. `src/lib/intel/commands.ts` — local parser (before generic layers): `show|hide|enable|disable|turn on|turn off` + `legislatures?|leg|kept` → `{ type: "layer", id: "legislatures", on }` and `permits?|ahj|permit harbor` → `{ type: "layer", id: "permits", on }`. Existing `applyAction` layer case in `runCommand.ts` already flashes `LAYER_META[id].label`.

**Do not:** fetch harvests, import `places-rest.ts` or `places.ts` (the latter statically imports Rest), subscribe globeEngine to LEG/AHJ, add billboards, copy capitals onto the globe, invent `Contact`s.

**Done when:** rail shows nine rows; LEG and AHJ start off (delayed-dot only when on); toggling updates store; FLT/MIL/AIS/SAT/EQ/FIR/MSN unchanged; radio still works.

### 2. Corpus loader module

New `src/lib/intel/corpus.ts` (only civic import surface).

- Static Vite JSON imports from `vendor/kept/_out/` (workspace-relative, already inside Vite FS allow):
  - `atlas.json`
  - `capitals.json`
  - `permit-index.json`
  - `packages/_index.json`
- **Lazy** `import()` of `501-links.json` inside `load501Summary()`. Do not import 501 at module top. Do not import `packages/{iso}.json`, `{iso}-permit.json`, `{iso}-fill.json`, or anything under `vendor/kept/kits/`.
- Export a **summary** only. Suggested shape:

```ts
type CorpusSummary = {
  kitsOnDisk: number;          // _index.kit_on_disk_count (33)
  atlasRows: number;           // atlas.length (196)
  capitals: number;            // capitals.count (194)
  permit: { core: number; extra: number; more: number; rest: number; lockDate: string };
  packageHoles: number;        // sum of rows[].holes
  remaining: number;           // _index.remaining_count (0)
  fillIsos: string[];          // extras iso2 (12)
  missingFillNote: string;     // "no ng/tr/mx fill" (HANDOFF)
  wave: string;                // PACKAGE-TZ / WAVE-501 labels from files
  holes: string[];             // honest hole lines, not member names
  five01?: { nodes: number; edges: number; fec: number; usaspending: number; holes: number };
};
```

- Count 501 by `nodes.length` / `edges.length` / `holes.length`. Split edges by `rel` or source field already on disk (fec 186 / usaspending 29). **Do not** return node `name` arrays to the UI.
- Honest holes the panel must be able to print (derive, do not invent):
  - 163 atlas rows have no kit (`196 − 33`)
  - capitals 194 vs atlas 196 (2 atlas rows lack a sourced capital point)
  - Rest **14925 is a count, not a map**
  - factory URLs not verified; fees omitted
  - country-native AHJ catalogs may be zero (US catalog is not world AHJs)
  - 12 fill files; no ng/tr/mx fill
  - 501 US holes 17 (990 Part VII names, Form 1 treasurers, Sch I, 990-PF, 8872, IND persons, incomplete 24K, forbidden c3 Sch B / c4–c6 donors omitted, etc.) — print **what/reason**, never invent the missing people
- If a JSON import throws: return `{ error }` and keep globe up. Fail closed on data, not on Earth.

### 3. One corpus panel in the existing HUD

Not KIT-02. No `src/components/desks/`. GlobeCanvas stays mounted in `IntelApp`. Command bar stays usable.

- New `src/components/intel/CorpusPanel.tsx`. Mount from `OverlayHud` the same way as `CommsChat` / `RadioDeck` (overlay `aside.panel`, pointer-events on the panel only).
- Store flag on intel store: `corpusOpen: boolean` + `setCorpusOpen`. Default **false**. Do **not** reuse `desk: { system, id }` (KIT-02).
- Command (extend `CommandAction` with `{ type: "corpus"; on: boolean }`, parse in `commands.ts`, apply in `runCommand.ts`):
  - on: `show corpus` · `open corpus` · `corpus on` · `intel corpus`
  - off: `hide corpus` · `close corpus` · `corpus off`
- Optional HUD button next to Layers (`title="Corpus"`). Do not steal `G` / `R` / `L`. Esc closes corpus after comms/radio/first-run (same stack as the layer drawer). Opening corpus closes comms + radio picker + layer rail, and vice versa.
- Panel copy (public civic language only):

  | Row | Source of truth |
  | --- | --- |
  | Kits **33 / 196** | `_index.kit_on_disk_count` / `atlas.length` |
  | Capitals **194** | `capitals.count` + hole vs 196 |
  | Permits core/extra/more/rest | `permit-index.json` counts; lock 2026-08-18 |
  | 501 US | lazy: nodes 199, edges 215 (fec 186 / usaspending 29), holes 17 |
  | Honesty strip | Rest is count not map. No pins this sitting. LEG/AHJ layers off. Country kits not US AHJs. |

- 501 section: “Load 501” or load-on-open. Show counts + hole **what** lines. **No committee/org name list.**
- Layout: right-side `panel` on desktop (`md:w` ~22rem like comms). At **390px** width: bottom sheet **above** the command bar (`bottom-24`), not a new route, not full-viewport. Globe visible around it.
- Do not fly the camera. Do not setLayer(legislatures|permits, on) from this panel.

### 4. Browser smoke checklist (localhost :8080)

Run in this order. Tick or fail closed.

1. **Globe** — Cesium ion credit, Earth visible, orbit drag. `GlobeCanvas` still in `IntelApp`. No unmount when corpus opens.
2. **Esc first-run** — four cards present (Planes please / Space junk / The planet is yelling / Just the globe). Esc closes. “Don't show this again” still there. Do not add LEG/AHJ first-run cards this sitting.
3. **tokyo** — local parser flies; header place **Tokyo**. (`yo tokyo` still may shrug without Grok parse — KIT-00 residual, do not patch.)
4. **NVG** — style 3 then back to Normal 1. HUD chrome follows `data-style`.
5. **Creedence** — `put on creedence` or Play. Pause control + station **Creedence** (now-playing metadata may show CCR title). Tuner still music. Do not merge scoring copy into radio.
6. **Comms** — `G` opens; header shows `Tokyo · radio on` while radio plays; **Close comms** / Esc.
7. **FLT** — layer on. Count · source (clone reports **adsb.lol**; do not retarget). Zoom-in may be required (orbit = “Zoom in for live traffic”). Other six intel layers still toggle.
8. **LEG off** — rail shows LEG delayed source; default off; `show legislatures` lights the rail **only**; **zero** new globe entities.
9. **AHJ off** — same for permits; `hide permits` returns off; **zero** permit pins.
10. **Corpus panel on/off** — `show corpus` / `hide corpus`. Counts 33/196, permit 79/462/699/14925, 501 199/215/17 after lazy load, honesty strip visible. Esc closes. Globe still orbits under it.
11. **390px** — command bar still there; corpus + rail do not eat it; no horizontal trap.
12. **No Rest pins** — Network/coverage: `places-rest` **not** in the first-paint graph. Entity count does not jump by thousands when AHJ or corpus is on.
13. **No skill brands** — UI strings must not contain FROGNET, GOYNET, Layer-0, swarm names, investigator legal names, or kit-internal bot names. Public: legislatures, permits, corpus, honesty holes.

If step 1 or 5 fails: **revert the sitting** and stop. Civic BASE is not worth a dead cockpit.

### 5. Files

**Touch (max 8):**

1. `src/lib/intel/types.ts` — LayerId, Kind, LAYER_META, `CommandAction` corpus
2. `src/lib/intel/store.ts` — defaultLayers LEG/AHJ off; `corpusOpen`
3. `src/lib/intel/commands.ts` — LEG/AHJ + corpus phrases
4. `src/lib/intel/runCommand.ts` — apply `corpus` (layer case already works)
5. `src/lib/intel/corpus.ts` — **new** loader
6. `src/components/intel/CorpusPanel.tsx` — **new** panel
7. `src/components/intel/OverlayHud.tsx` — rail order, mount panel, Esc, optional button

8th slot only if needed: `src/styles.css` (`.corpus-panel` max-height). Prefer existing `.panel` / comms geometry and skip this file.

**Forbidden (do not open for writes):**

- `src/components/intel/GlobeCanvas.tsx` (user-named pin-loop file; keep mount-only)
- `src/lib/intel/globeEngine.ts` (actual entity loop)
- `src/lib/permit/places-rest.ts` and `src/lib/permit/places.ts` (Rest dump)
- `src/components/desks/**` and any KIT-02+ adapter
- `src/lib/kept/**` (KIT-03)
- `vendor/kept/_out/**`, `vendor/kept/kits/**`
- `package.json`, lockfile, live gevradio remix, `vite.config.ts` unless JSON import is truly blocked (it should not be: `types: ["vite/client"]` already types `*.json`)

**Do not:** npm install, git push, invent sitting names, dump 16k pins, remix gevradio.

### 6. Success criteria (verifiable)

Pass all of these or the sitting is not done:

| # | Check | How to verify |
| --- | --- | --- |
| S1 | Globe still orbits after the diff | Earth visible; `__gevReady` true; no OverlayHud-only page |
| S2 | Radio still plays Creedence from the command bar | Pause control + Creedence (or CCR now-playing) |
| S3 | Nine layer ids; LEG + AHJ default off | Rail + `useIntel.getState().layers.legislatures.on === false` (same for permits) |
| S4 | `show legislatures` / `hide permits` update rail+store only | No new Cesium entities; other layers unchanged |
| S5 | Corpus panel shows **33/196** | Matches `_out` atlas + `_index`, not ARCHIVE 34 |
| S6 | Permit counts **79 / 462 / 699 / 14925** + lock 2026-08-18 | From `permit-index.json`, not a Rest import |
| S7 | 501 lazy: **199 nodes / 215 edges / 17 holes** | Panel after open; 501 not in first-paint module graph |
| S8 | Honesty visible | Rest-is-count, no pins, zero-AHJ countries, 501 hole *what* lines, no padded seats |
| S9 | 390px command bar usable | Same as KIT-00 |
| S10 | No Rest pins, no skill brands, no sitting-name dump | Source grep + UI read |
| S11 | Typecheck | `npx tsc --noEmit` (existing script; no package.json edit) |

**Fail closed (any one = revert civic diff):**

- P0 globe dead / unmounted / replaced by a table
- P0 radio dead
- Rest catalog bundled or plotted
- LEG/AHJ drawing contacts (that is KIT-03 / KIT-06)
- DeskDrawer / KIT-02+ files created
- Invented members, donors, or sitting names
- Live gevradio or `_out` mutated

### Stop

KIT-01 + corpus BASE only. Do not start KIT-02. Do not plot capitals. Do not lazy-load Rest “just in case.” Host writes the code in a later turn from this plan; this seat wrote the plan only.
