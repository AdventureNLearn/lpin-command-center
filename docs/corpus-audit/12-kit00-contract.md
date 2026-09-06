# Seat 12 — KIT-00 / shell contract for KIT-01

**Class:** public-suite  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Bots:** PARK  
**Corpus:** `vendor/kept/_out/` (read-only; `_out/HANDOFF.md` is bot closeout)  
**This sitting writes:** this file only  
**Civic code:** not started. KIT-00 smoke 2026-08-29: seven intel layers, no LEG/AHJ.

KIT-01 is registry-only: `legislatures` + `permits` become LayerIds, default **off**, **no pins**.

---

## 1. LayerId today — no legislatures / permits

`src/lib/intel/types.ts` is the contract. Current union is intel-only:

```ts
export type LayerId =
  | "flights"
  | "military"
  | "vessels"
  | "satellites"
  | "earthquakes"
  | "fires"
  | "launches";

export type Kind =
  | "flight" | "military" | "vessel" | "satellite"
  | "earthquake" | "fire" | "launch";
```

`LAYER_META` has those seven keys only. Short codes: FLT / MIL / AIS / SAT / EQ / FIR / MSN. No LEG. No AHJ.

`Kind` is used on `Contact` and `DetectionBox`. Globe engines only mint the seven intel kinds. Adding `"legislature" | "permit"` to `Kind` in KIT-01 is type-level. Do not mint civic `Contact`s this sitting.

Store defaults (`src/lib/intel/store.ts` `defaultLayers()`): every existing layer is `{ on: false, count: 0, freshness: "off" }`. `Record<LayerId, LayerState>` is exhaustive — new LayerIds **must** get default rows here or TypeScript fails. KIT-01 rows: `on: false`, `count: 0`, `freshness: "off"`, `detail` = `LAYER_META.*.source`. Empty contact arrays are the intended draw state.

KIT-01 `LAYER_META` copy (from KIT-01 + GROK_BUILD_HANDOFF, do not invent):

| id | short | label | source | freshness |
| --- | --- | --- | --- | --- |
| `legislatures` | LEG | Legislatures | Kept harvest / public registers | delayed |
| `permits` | AHJ | Permits | Permit Harbor catalog (locked 2026-08-18) | delayed |

Corpus on disk (do not fetch, do not pin this sitting): `_out/packages/_index.json` = 33 kit_on_disk, remaining 0; `_out/capitals.json` count 194 capital points; `_out/permit-index.json` rest = 14925 (count only, `rest_is_count_not_map: true`). Permit Rest file is `src/lib/permit/places-rest.ts`. KIT-01 must not import it.

---

## 2. Where layer toggles live — add LEG/AHJ without breaking radio / comms / globe

**Rail, not a new shell.** Toggles live in `src/components/intel/OverlayHud.tsx`.

- Hardcoded order: `LAYER_ORDER` (lines 36–44). Seven ids. The rail `map`s this array — `LAYER_META` alone will not show new rows.
- Each row: `useIntel.getState().setLayer(id, { on: !st.on, freshness: !st.on ? meta.freshness : "off" })`.
- Rail is the left `section.layer-rail`, gated `drawerOpen && !chatOpen && !radioOpen`.
- Toolbar **Layers (L)** toggles `drawerOpen` and **closes comms + radio picker**.
- Toolbar **Radio (R)** and **Comms (G)** each close the other **and** the layer drawer.
- Esc: comms → radio picker → first-run → cockpit → track → layer drawer.
- Footer command bar is a sibling of the rail, not inside it. Radio play/pause is on the header toolbar.

**KIT-01 add path (safe):** append `"legislatures"` then `"permits"` to `LAYER_ORDER`. Same `<ul>`, same `setLayer`, same L-key drawer. Do **not** add a second toolbar button, a new exclusive panel, a route, or civic copy inside `RadioDeck` / `CommsChat`. Mutual-exclusion already keeps radio and comms reachable.

**Do not restyle the HUD.** Do not replace FirstRun’s four cards (KIT-00 lock). Handoff *may* add two first-run cards later; that is not KIT-01.

**Shell composition stays:** `IntelApp` = `GlobeCanvas` + `DetectionOverlay` + `OverlayHud`. `src/routes/index.tsx` is `/` → `<IntelApp />`. KIT-01 does not touch those two files.

**Engine subscribe already ignores unknown layers (3D):** `globeEngine.ts` `useIntel.subscribe` watches the seven intel `.on` flags only and loads/prunes flights, military, vessels, sats, quakes, fires, launches. Toggling LEG/AHJ with no new branch = store + rail update, **zero new Cesium entities**. Leave it that way this sitting.

**Phone/flat catch:** `flatEngine.ts` treats *any* layer `.on` flip as `layerChanged` and re-runs `refreshMarks()`. That is a cheap re-paint of **existing intel marks**, not a civic pin dump — unless someone adds a civic branch. Do not add one in KIT-01.

`runCommand.ts` `isLayer` is `v in LAYER_META`. Layer apply is generic (`setLayer` + flash). Command-bar LEG/AHJ works once types + `LAYER_META` + `commands.ts` + store exist. No `runCommand` rewrite required.

---

## 3. Survival P0s (KIT-01 must not break)

These are the FEATURE_KITS definition-of-done plus KIT-00 smoke. Fail any of them → stop the kit.

1. **Globe still orbits.** Homepage is Cesium (`GlobeCanvas` → `bootGlobe`). Drag orbit, scroll zoom. Do not unmount the canvas. Do not add a civic route that replaces `/`.
2. **Creedence from the command bar.** Local parser in `commands.ts`: `/^(play |put on |spin )?(some )?(ccr|creedence)$/i` → `{ type: "radio", id: "ccr", on: true }` **before** layer on/off. Station aliases in `src/lib/intel/radio.ts` (`ccr`, `creedence`, `swamp rock`). `runCommand` radio branch does not need the engine. Do not steal `put on` for civic layers. Layer on-words are only `on|enable|show|turn on|light up`.
3. **No 16k pins.** Permit Rest count on disk is 14925. KIT-01: no entities for LEG/AHJ. KIT-03 cap is ~194 capitals (`capitals.json` count 194; handoff says ≤ ~200 country markers). KIT-06 is the zoom gate. This sitting: **zero civic billboards**.
4. **No skill brands.** Public copy = plain civic tooling. No FROGNET/GOYNET, no swarm names, no “Layer-0”, no investigator legal names, no invented sitting names. Radio stays music. LEG source string is “Kept harvest / public registers”; AHJ source string is the locked catalog line above.
5. **Seven intel layers unchanged.** Flights/military/vessels/sats/quakes/fires/launches still default off, still draw only when toggled. KIT-00 smoke: FLT on → regional ADS-B (clone reported adsb.lol; do not “correct” as a drive-by).
6. **Comms / radio / first-run / styles 1–6 / command bar** stay reachable with the layer drawer open or closed. Do not merge scoring language into tuner copy.

KIT-00 residual (not a KIT-01 job): `yo tokyo` did not fly without Grok parse; local `tokyo` did. Do not patch that as a drive-by.

---

## 4. KIT-01 file touch list (only)

Execute only these four. Stop.

| File | Why |
| --- | --- |
| `src/lib/intel/types.ts` | Extend `LayerId` + `Kind`. Add `LAYER_META.legislatures` and `LAYER_META.permits`. Do **not** add `{ type: "desk" }` (KIT-02). |
| `src/lib/intel/store.ts` | `defaultLayers()` exhaustive rows, both `on: false`. Empty counts. |
| `src/components/intel/OverlayHud.tsx` | Append `legislatures`, `permits` to `LAYER_ORDER`. No new toolbar control. |
| `src/lib/intel/commands.ts` | Two `LAYERS` regex rows so `show legislatures` / `hide permits` (and obvious synonyms) emit `{ type: "layer", id, on }`. |

**Auto-follow, do not edit this sitting:** `runCommand.ts` (generic `LAYER_META`), `share.ts` (`x in LAYER_META`), `DetectionOverlay.tsx` (`KIND_CLASS` is `Record<string, string>`).

**Optional later, not KIT-01:** `comms.ts` tagged-action allowlist still hardcodes the seven intel layer ids. Command bar does not go through that list. Leave it.

### GlobeCanvas pin-loop warning — do not touch this sitting

`src/components/intel/GlobeCanvas.tsx` is a **boot wrapper only** (lazy `globeEngine` / `flatEngine`). It has no pin loop.

The pin loops are in `src/lib/intel/globeEngine.ts`:

- `viewer.entities.add({ billboard: … })` for flights/military
- extra-entity maps for quakes/fires/launches
- `useIntel.subscribe` that **loads a catalog when a layer flips on**

**Do not** add `if (s.layers.legislatures.on) …` or `if (s.layers.permits.on) …` that iterates `_out/capitals.json`, harvest members, or `places-rest.ts`. That is how 16k Rest desks and member pins get onto the globe. KIT-03 (country contacts only) and KIT-06 (zoom-gated AHJ) own drawing. KIT-01 toggling LEG/AHJ with no subscribe branch is the correct empty state.

Same ban on `flatEngine.ts` `refreshMarks` / `renderMarks`.

---

## 5. Command phrases already parsed — where civic strings go

Parser: `src/lib/intel/commands.ts` `parseCommand`. Dispatch: OverlayHud footer form → `runCommand(text)`. Local regex first; unknown may hit Grok `interpretCommand` only if a key exists.

**Order (do not reorder in KIT-01):**

1. Reset: `reset` / `home` / `full globe` / `zoom out` / `globe view`
2. Radio: pause/stop/mute, next/prev station, **preset name + play|put on|tune|radio|spin**, **ccr/creedence**, `radio on` / `play radio` / `open radio` / `tuner`
3. Next contact / cockpit / hud / detection
4. Scenes: `orbital watch` / `show me space` / `space missions` · `night watch` / `night vision over` · `fire line` / `show me fires` / `wildfire`
5. Styles: normal/crt/nvg/flir/noir/snow (with style|switch|set|mode|vision, or ≤3 words)
6. **Layer on/off** — only if text has on/off words, then first `LAYERS` regex hit
7. `how many` counts (flights / vessels / satellites)
8. Track nearest (ISS / vessel / sat / flight)
9. FlyTo: `take me to|fly to|go to|show me|open|jump to|navigate to …`
10. Lat,lon coords
11. Bare places: tokyo / austin / lax / jfk / heathrow / singapore / dubai / sydney / iss / new york / nyc
12. `{ type: "unknown", text }`

Current `LAYERS` regexes: military (before flights), flights/aircraft/planes/ads-b, vessels/ships/ais, satellites/orbit, earthquakes/seismic, fires/wildfires/firms, launches/space missions/rockets.

**KIT-01 add here:** two rows at the **top** of `LAYERS` (same on/off gate, so `show` / `hide` / `enable` / `disable` / `turn on` / `turn off` work). Suggested, do not steal later kits:

- legislatures: `legislatures?` / `kept harvest` / `LEG` — **not** `/desk/`, **not** `/open/`, **not** `/corpus/`
- permits: `permits?` / `\bahj\b` / `permit harbor` — **not** `building desk` (KIT-04)

`show legislatures` hits layer (has `show`) and never reaches flyTo. `put on creedence` stays radio (earlier, and `put on` is not a layer on-word).

**Do not add in KIT-01:**

| Phrase | Owner | Why not now |
| --- | --- | --- |
| `corpus` | not in any kit grammar | Operator word for `vendor/kept/_out/`. Mapping it to LEG would be invented. Later: LEG on + atlas drawer, never a harvest dump. |
| `desks` / `building desk {place}` | KIT-02 `{ type: "desk" }`, KIT-04 search | A KIT-01 `/desks?/` layer regex would steal those phrases. |
| `open korea`, `score the sitting in …`, `compare A and B`, `find AHJ in …`, `take me to the chamber in …` | KIT-05 (+ KIT-03/04 data) | `open` is already flyTo. Do not extend `CommandAction` this sitting. |
| `yo tokyo` as a local fly | KIT-00 residual | Logged, not this kit. |

Unknown civic strings must keep falling through to `unknown` → existing shrug toast / comms, not a crash.

---

## KIT-01 touch list (repeat, paste-ready)

```
src/lib/intel/types.ts
src/lib/intel/store.ts
src/components/intel/OverlayHud.tsx
src/lib/intel/commands.ts
```

---

## Survival P0s (repeat)

- Globe orbits (Cesium mounted; no new homepage).
- `put on creedence` still radio `ccr`.
- LEG/AHJ default **off**; toggling them updates rail + store only; **no pins**.
- No Rest dump (14925). No capital loop (194). No member pins.
- No skill-brand strings in UI copy.
- FLT/MIL/AIS/SAT/EQ/FIR/MSN, R tuner, G comms, styles 1–6, first-run four cards, command bar all still work.

---

## Do-not-touch (this sitting)

- `src/components/intel/GlobeCanvas.tsx` — boot only; **do not start a pin loop here**
- `src/lib/intel/globeEngine.ts` — entity/billboard subscribe; civic draw is KIT-03/06
- `src/lib/intel/flatEngine.ts` — mark rebuild on any layer flip; no civic marks
- `src/components/intel/IntelApp.tsx`
- `src/routes/index.tsx`
- `src/components/intel/RadioDeck.tsx`, `src/lib/intel/radio.ts`, `radioPlayer.ts`
- `src/components/intel/CommsChat.tsx`, `src/lib/intel/comms.ts`
- `src/components/intel/FirstRun.tsx` — four cards stay
- `src/lib/permit/places-rest.ts` and other permit catalog modules
- `vendor/kept/kits/`, `vendor/kept/_out/`
- `package.json`, live grok.me, gevradio remix
- No `npm install`, no git push, no invented sitting names, no 16k-pin dump

---

## Verdict — can the shell accept corpus as layers/drawers?

**Yes, as layers + later drawers. Not as a new site. Not as pins this sitting.**

The cockpit already has the plugin shape: `LayerId` + `LAYER_META` + store `Record<LayerId, LayerState>` + OverlayHud rail + `{ type: "layer"; id; on }` command. Corpus (`vendor/kept/_out/`: 33 packages, 194 capitals, permit-index rest 14925) is harvest on disk, PARK, not wired. KIT-01 registers LEG/AHJ default off. KIT-02 is the one drawer. KIT-03/04/06 attach data under marker budgets. Homepage stays the globe.

---

## E / I / A

**E.** Disk: `LayerId` is seven intel ids; `LAYER_ORDER` matches; store defaults all off; KIT-00 smoke “Seven intel layers only. No LEG/AHJ.”; parser has no legislature/permit/corpus/desks phrases; Creedence is a radio preset parsed before layers; globeEngine subscribe is seven explicit loads; GlobeCanvas has no entity loop; `_out` 33/33 PARK, capitals 194, rest 14925.

**I.** KIT-01 is a type/rail/parser sitting. The shell can carry corpus as two off layers without drawing. The failure mode is adding a GlobeCanvas/globeEngine loop that walks Rest or harvests when AHJ/LEG flips on.

**A.** Accept KIT-01 on the four-file list. Default OFF. No pins. Do not parse `corpus` or `desks` yet. Park bots. Do not start KIT-02.

**Stop.**
