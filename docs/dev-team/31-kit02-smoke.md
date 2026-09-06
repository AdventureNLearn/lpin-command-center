# SEAT 31 — KIT-02 smoke checklist

Seat: 31 · KIT-02 · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: **this file only**. No `src/` edits. No Playwright.  
Coordinator Host runs this **after** implementing KIT-02 (`KIT-02-desk-drawer.md`). One kit per turn. Do not start KIT-03+.

KIT-02 Done when (kit file, quote): *A temporary debug control or command can open and close an empty Kept drawer and an empty Permit drawer. Globe still orbits underneath. Stop.*

---

## How to run

Manual localhost. Do **not** run `scripts/browser-smoke.mjs` (Playwright). Do not `npm install`. Do not `git push`. Do not remix live gevradio.

Start (Windows KIT-00 residual: `npm run dev` → `spawn vite ENOENT`):

```
node.exe scripts/with-app-env.mjs node.exe node_modules/vite/bin/vite.js dev --host 0.0.0.0 --port 8080
```

Target: http://127.0.0.1:8080/

Confirm Earth orbits **before** civic ticks. If P0 globe or radio is already red, **stop** — do not score KIT-02.

390px = DevTools device / window width **390**. Command bar is the footer form (`aria-label="Command the globe"`). Type, Enter. No automation.

Tick **PASS** / **FAIL**. Any **FAIL** on a P0 row = sitting not done; revert civic diff.

---

## Commands (from KIT-02 + integration contract)

Source: `KIT-02-desk-drawer.md` (debug control **or** command). Phrases from `docs/dev-team/01-lead-integration.md` (parse **before** flyTo `open`). Seat 04 HUD landmines apply.

**Open empty Kept drawer** (`desk.system = "kept"`, id unused / `"empty"`):

- `open kept drawer`
- `open kept desk`
- `show kept desk`

**Open empty Permit drawer** (`desk.system = "permit"`):

- `open permit desk`
- `open building desk`
- `show permit desk`

**Close** (`desk = null`):

- `close desk`
- `close drawer`
- `hide desk`
- `desk off`

Plus: panel **X**, OverlayHud **Esc**, optional toolbar **Desk (debug)** (do not steal `G` / `R` / `L` / Corpus). Either command **or** debug control satisfies the kit file. Prefer the command bar so 390px is proven.

**Do not type this sitting** (KIT-04/05, or they steal layers/corpus/radio):

| Phrase | Owner / why |
| --- | --- |
| `put on creedence` | Radio. Survival check only — must stay `ccr`. |
| `show corpus` / `hide corpus` / `open corpus` | Corpus panel. Survival check only. |
| `show legislatures` / `hide permits` | LEG/AHJ rail. Survival check only — **zero pins**. |
| `open korea` / `find AHJ in …` / `building desk {place}` | KIT-05 / KIT-04. Empty drawer has no place id. |
| `open kept` (no `desk`/`drawer`) | Today flyTo `q="kept"`. Must not be the smoke phrase. |

Header copy: **Legislature** (kept) / **Building desk** (permit). Body placeholder: **No desk selected.** Honesty strip visible even when empty.

---

## Checklist (run in this order)

### A. Open kept drawer

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| A1 | Command `open kept drawer` (or `open kept desk` / debug Kept) | Right-side dark `.panel` (not Kept cream). Header **Legislature**. Body **No desk selected.** `useIntel.getState().desk.system === "kept"`. |  |
| A2 | Globe under the panel | Cesium ion credit, Earth visible, drag orbit / scroll zoom around the panel. `GlobeCanvas` still in `IntelApp`. No new route. URL still `/`. |  |
| A3 | Mutex | Comms closed. Radio picker closed. Corpus closed. Layer rail closed. Command footer **still mounted** (unlike Comms). |  |

### B. Open permit drawer

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| B1 | Command `open permit desk` (or `open building desk` / `show permit desk` / debug Permit) | Same shell, header **Building desk**. Body still **No desk selected.** `desk.system === "permit"`. Kept header gone. |  |
| B2 | Honesty | Permit strip present (lock 2026-08-18 / Rest is a count, not a map). No AHJ typeahead. No portal list. No pins. |  |
| B3 | No iframe | No `keptglobal.grok.me` / `hivepermitdev.grok.me` frame. |  |

### C. Close + Esc

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| C1 | Command `close desk` (or `close drawer` / `hide desk` / `desk off` / panel X) | Drawer gone (`desk === null`). Globe still orbits. Command bar still typeable. |  |
| C2 | Re-open kept, press **Esc** (not focused in an INPUT, or Esc still peels) | Desk closes. One Esc = one layer. Do not close first-run / cockpit / Earth. |  |
| C3 | Re-open permit, Esc | Permit drawer closes. Globe mounted. |  |
| C4 | Esc stack sanity | Comms still first if open. Radio picker still second. First-run still third. Desk closes without skipping corpus forever: `show corpus` then Esc still closes CorpusPanel. |  |

### D. Globe still Cesium (P0)

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| D1 | After A–C | Homepage is Earth. Cesium (or documented flat fallback on phone). No civic table as `/`. |  |
| D2 | Open kept drawer, orbit | Canvas not unmounted. No `cleanup()` of GlobeCanvas. |  |

**FAIL D = revert the sitting.**

### E. Creedence (P0)

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| E1 | `put on creedence` (or `play creedence` / Play) | Station **Creedence** / `ccr`. Pause control live. Tuner still music — no scoring copy. |  |
| E2 | Same command **with desk open** | Radio still starts/plays. Command bar not stolen by `put on`. |  |

**FAIL E = revert the sitting.**

### F. Command bar at 390px (P0)

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| F1 | Width **390** | Footer visible: style chips + input + send. `/` focuses it. `z-30` above the sheet (`z-20`). |  |
| F2 | Open kept drawer at 390px | Bottom sheet, **not** `inset-0`, not a new route. Sheet does not permanently cover the bar (bar hittable). Earth visible above the sheet. Header Play/Radio/Comms/Corpus/Layers still reachable. |  |
| F3 | Type `close desk` at 390px | Parses. Drawer closes. No horizontal trap. |  |

Copy CorpusPanel (`bottom-28` / `md:w-[22rem]`), not Comms (hides footer) and not RadioDeck (no bottom inset).

### G. Corpus still works

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| G1 | `show corpus` / `open corpus` with desk closed | CorpusPanel opens. Kits **33 / 196**. Permits **79 / 462 / 699 / 14925**. Lock **2026-08-18**. 501 lazy: **199** nodes · **215** edges · **17** holes. Honesty: Rest is count not map. |  |
| G2 | `hide corpus` / Esc | Panel closes. `corpusOpen === false`. Globe up. |  |
| G3 | Open desk then `show corpus` (or Corpus button) | Desk closes, corpus opens. Flags not aliased (`corpusOpen` ≠ `desk`). |  |
| G4 | Open corpus then `open kept drawer` | Corpus closes, desk opens. Corpus button / `corpusOpen` still exist after the kit. |  |

### H. LEG / AHJ still 0 pins (P0)

| # | Action | Expect | Tick |
| --- | --- | --- | --- |
| H1 | Fresh load | Rail LEG + AHJ exist, **off**. `layers.legislatures.on === false`. `layers.permits.on === false`. `count === 0`. |  |
| H2 | Open/close both drawers | **Zero** new globe entities. No capitals. No AHJ pins. Rest pin count **0**. |  |
| H3 | `show legislatures` then `show permits` then `hide` both | Rail/store only. Still **zero** civic billboards. Other seven intel layers unchanged. |  |
| H4 | Network / bundle (optional eyeball) | `places-rest` **not** on first paint. No `places.ts` Rest dump. No `packages/{iso}.json` load for the empty body. |  |

---

## Fail closed (any one = not done)

- Globe dead, unmounted, or replaced by a desk homepage / new route
- `put on creedence` not radio `ccr`
- Command bar missing or unusable at 390px while desk is open
- CorpusPanel gone, merged into DeskDrawer, or `corpusOpen` reused as `desk`
- LEG/AHJ drawing contacts, capitals loop, Rest 14925 / 16165 pins
- Iframe of keptglobal / hivepermitdev
- Skill brands, invented sitting names, member/votes dump
- KIT-03 KeptAdapter / KIT-04 PermitAdapter bodies shipped as “empty drawer”
- Playwright used as this sitting’s proof

---

## 5-line smoke log (coordinator fills after ticks)

```
1. Globe:
2. Kept drawer (`open kept drawer`) / Permit drawer / close / Esc:
3. Creedence + 390px command bar:
4. Corpus 33/196 · 79/462/699/14925 · 501 199/215/17:
5. LEG/AHJ pins (must be 0):
```

Files the implement turn touched (host lists):

```
```

---

## E / I / A

**E — Evidence (this tree + kit pack, 2026-08-29)**

- `KIT-02-desk-drawer.md`: empty kept/permit drawers; Esc; globe mounted; command bar usable; placeholder “No desk selected.”; Done = debug control **or** command opens and closes both drawers.
- FEATURE_KITS definition of done: globe orbits; Creedence from the command bar; feature at desktop **and** narrow mobile; honesty visible; no skill-brand UI.
- `docs/dev-team/01-lead-integration.md`: phrases `open kept drawer` / `open kept desk` / `show kept desk` · `open permit desk` / `open building desk` / `show permit desk` · `close desk` / `close drawer` / `hide desk` / `desk off`. Parse before flyTo. Max 8 files. `corpusOpen` ≠ `desk`.
- `docs/dev-team/04-lead-hud.md`: P0 globe / Creedence / comms / command bar; 390px footer `z-30`; desk `z-20`; do not steal `G`/`R`/`L`; `put on` is not a layer verb; `open kept desk` is flyTo **today**.
- `docs/dev-team/07-kit02-shell.md`: mount DeskDrawer after `<CorpusPanel />` in OverlayHud. Do not touch `GlobeCanvas` / `IntelApp` / routes.
- Disk now: `IntelApp` = `GlobeCanvas` + `DetectionOverlay` + `OverlayHud`. `corpusOpen` + CorpusPanel shipped. LEG/AHJ LayerIds default off. `globeEngine.ts` has **no** `legislatures` / `permits` subscribe. No `src/components/desks/`. No `{ type: "desk" }` on `CommandAction`.
- KIT-00 localhost: Cesium, Esc first-run, Creedence, command bar at **390px**. KIT-01 + corpus BASE already in tree (`show corpus`, 33/196, 79/462/699/14925, lazy 501).

**I — Inference**

- KIT-02 smoke is chrome + parser, not adapters. If Earth, Creedence, 390px bar, corpus counts, and zero civic pins survive empty open/close/Esc, the plugin slot is proven.
- `open` is already flyTo; `kept desks` is already LEG. Smoke phrases must be the **desk** strings above so the sitting does not fly to “kept desk” or light LEG.
- Playwright would test a different surface (`scripts/browser-smoke.mjs` KIT-00). This sitting is operator-ticked on `:8080`.

**A — Assumption**

- Host implements from KIT-02 + seats 01/04/07, then runs **this** list. Debug toolbar is optional; commands are enough.
- Operators will not treat PASS here as KIT-03/04/05 done.
- Esc order desk-vs-corpus may follow seat 01 (desk then corpus) or seat 04 (corpus then desk); smoke only requires: desk-open Esc closes desk, and corpus still Esc-closes when it is the open overlay.

---

## Stop

KIT-02 empty drawers only. Do not plot capitals. Do not search AHJ. Do not start KIT-03. Localhost yes. Live gevradio **no**.
