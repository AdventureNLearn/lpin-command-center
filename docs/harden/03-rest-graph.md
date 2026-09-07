# SEAT H03 — REST IMPORT GRAPH

Seat: **H03**. Coordinator: Host Grok Build.
Target class: public-suite. Tree: `REPO_ROOT`.
Date: 2026-08-29. **This file only.** Did not edit `src/`. Did not copy `places-rest.ts`.

Claim: **first-paint OverlayHud graph must not include Rest.** `search-lite` is the HUD path. `places.ts` still concatenates Rest. **BLOCK** if `OverlayHud.tsx` / `runCommand.ts` / `globeEngine.ts` import `places.ts` or `catalog.ts`.

---

## Verdict

**NOT BLOCK.** OverlayHud, runCommand, and globeEngine do **not** import `places.ts` or `catalog.ts`. First-paint HUD does **not** reach `places-rest.ts`.

**WATCH:** `places.ts` still static-imports `REST_PLACES` and concatenates it into `PLACES`. `catalog.ts` still imports `places.ts`. That poison chain is on disk but unreachable from HUD / globe / runCommand.

**BLOCK would fire if** `OverlayHud.tsx`, `src/lib/intel/runCommand.ts`, or `src/lib/intel/globeEngine.ts` imported `places.ts` or `catalog.ts`. They do not.

---

## Who imports what (grep, this sitting)

Grep of `src/**/*.{ts,tsx}` and `scripts/**/*.mjs` for `places-rest`, `from "./places"`, `@/lib/permit/places`, `catalog`, `search-lite`, `permit-pins`. Rest rows / ids / URLs are **not** listed here.

### Who imports `places-rest.ts`

| Importer | How | Pulls Rest into first-paint HUD? |
| --- | --- | --- |
| `src/lib/permit/places.ts` | `import { REST_PLACES } from "./places-rest"` | **Yes, if `places.ts` is imported.** HUD does not import it. |
| `scripts/permit/catalog-integrity.test.mjs` | `readFileSync` + regex `p("id")` | No (node test, not Vite). |
| OverlayHud / runCommand / globeEngine | — | **No.** |
| DeskDrawer / search-lite / permit-pins | — | **No.** |

### Who imports `places.ts`

| Importer | How | Pulls Rest? |
| --- | --- | --- |
| `src/lib/permit/catalog.ts` | `from "./places"` (`getPlace`, `PLACES`, `searchPlaces`) | **Yes.** Catalog is an orphan: no HUD / route / engine importer. |
| OverlayHud / runCommand / globeEngine | — | **No.** |

### Who imports `catalog.ts`

| Importer | How |
| --- | --- |
| *(none in `src/`)* | Zero `from "…catalog"` hits. |

### Who imports `search-lite.ts`

| Importer | How | Pulls Rest? |
| --- | --- | --- |
| `src/components/desks/DeskDrawer.tsx` | `getSearchablePlace`, `permitChip`, `searchAhj` | **No.** Lite = core + extra + more. |
| `src/lib/intel/runCommand.ts` | `searchAhj` | **No.** |
| `src/lib/permit/permit-pins.ts` | `FEATURED_AHJ_IDS`, `getSearchablePlace`, `searchAhj` | **No.** (lite, OK) |

### Who imports `permit-pins.ts`

| Importer | How |
| --- | --- |
| *(none in `src/`)* | Draft. Engine not wired (`docs/harden/README.md`). |

Reverse leaves: `places-rest.ts` and `places-more.ts` import factory `p` from `places-extra.ts`. Extra does **not** import Rest. Importing extra / more / core alone is Rest-safe.

---

## First-paint HUD graph (Rest must not appear)

```
src/routes/index.tsx
  └── IntelApp.tsx
        ├── GlobeCanvas.tsx
        │     └── dynamic import globeEngine.ts / flatEngine.ts
        │           globeEngine: feeds, shaders, store, kept/desks, cesium
        │           ──x  places.ts
        │           ──x  catalog.ts
        │           ──x  places-rest.ts
        │           ──x  permit-pins.ts   (unwired)
        └── OverlayHud.tsx
              ├── DeskDrawer.tsx
              │     └── @/lib/permit/search-lite
              │           └── places-core.ts
              │           └── places-extra.ts
              │           └── places-more.ts
              │           └── types.ts
              │           ──x  places.ts
              │           ──x  catalog.ts
              │           ──x  places-rest.ts
              ├── runCommand.ts
              │     └── searchAhj from @/lib/permit/search-lite   (same lite graph)
              │     ──x  places.ts
              │     ──x  catalog.ts
              └── CorpusPanel.tsx → corpus.ts
                    eager: _out/permit-index.json   ← rest COUNT only
                    ──x  places-rest.ts
```

`OverlayHud.tsx` line 18 mounts `DeskDrawer`; line 24 imports `runCommand`; line 702 renders `<DeskDrawer />`. OverlayHud source itself has **0** hits for `places-rest` | `lib/permit` | `places.ts` | `catalog.ts`. Smoke: `docs/corpus-audit/smoke-corpus.mjs` fails if OverlayHud text contains `places-rest`.

`search-lite.ts` concatenates `CORE_PLACES + EXTRA_PLACES + MORE_PLACES` only. `searchAhj` caps at 40. No Rest import.

### Poison chain (not reachable from HUD today)

```
catalog.ts ──► places.ts ──► places-rest.ts   (~3.37 MB)
                 └── also CORE / EXTRA / MORE (named layers; Rest is the fuse)
```

`places.ts` line 5: `import { REST_PLACES } from "./places-rest"`.  
`places.ts` line 7: `PLACES = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES, ...REST_PLACES]`.  
Any Vite import of `places.ts` or `catalog.ts` ships Rest. First-paint does not take that edge.

---

## `permit-pins.ts` and searchAhj

`src/lib/permit/permit-pins.ts` imports `searchAhj` from `./search-lite`. **Lite, OK.** Featured coords + state centroids; `permitMarks` walks `FEATURED_AHJ_IDS` (12 Core metros), not Rest. Zero `src/` importers. KIT-06 must not wire this file through `places.ts` / `catalog.ts`. Wiring through lite stays Rest-free.

---

## BLOCK check (this seat)

| File | `places.ts` | `catalog.ts` | `places-rest.ts` | `search-lite.ts` |
| --- | --- | --- | --- | --- |
| `OverlayHud.tsx` | no | no | no | no (transitive via DeskDrawer only) |
| `runCommand.ts` | no | no | no | **yes** (`searchAhj`) |
| `globeEngine.ts` | no | no | no | no |

No BLOCK.

---

## Off-bundle / count (not an import)

- `corpus.ts` reads `permitIndex.counts.rest` from `_out/permit-index.json`. Honesty copy: “Rest *n* is a count, not a map.” Not `places-rest.ts`.
- Integrity test parses Rest as text. Must stay out of the globe bundle.
- `LAYER_META.permits` source string is a label, not a module.

Sizes (cite only; Rest body not copied):

| File | Bytes |
| --- | ---: |
| `places-rest.ts` | 3,372,392 |
| `places-more.ts` | 103,630 |
| `places-extra.ts` | 69,888 |
| `places-core.ts` | 38,757 |
| `permit-pins.ts` | 5,564 |
| `catalog.ts` | 4,760 |
| `places.ts` | 1,907 |
| `search-lite.ts` | 1,658 |

---

## E / I / A

**E — Evidence**

- `places.ts` line 5 static-imports `REST_PLACES`. Line 7 concatenates Rest into `PLACES`. `searchPlaces` / `getPlace` walk that array.
- Only TS importer of `places.ts` is `catalog.ts`. Zero TS importers of `catalog.ts`. Zero HUD / runCommand / globeEngine importers of either.
- OverlayHud → DeskDrawer + runCommand → `search-lite` → core / extra / more. No Rest.
- globeEngine import list: world/flights/ais feeds, shaders, icons, store, flightView, geo, locations, vessels, share, phone, viewport, types, kept/desks, satellite.js, cesium. No permit catalog/places.
- `permit-pins.ts` imports `searchAhj` from search-lite (lite, OK) and is unwired.
- `places-rest.ts` 3,372,392 B. Integrity test `readFileSync` only. OverlayHud string scan rejects `places-rest`.

**I — Inference**

- First-paint HUD is Rest-clean **because** KIT-04 search went through `search-lite`, not `places.ts` / `catalog.ts`. The fuse is still the `places.ts` barrel.
- Importing current `catalog.ts` or `places.ts` from OverlayHud, runCommand, globeEngine, DeskDrawer, or permit-pins would silently put ~3.37 MB Rest on first paint even with AHJ off.
- `permit-pins` staying unwired is load-bearing until KIT-06. If the engine later imports it, the import must stay lite.

**A — Action**

- Do **not** import `places.ts` or `catalog.ts` from OverlayHud, runCommand, globeEngine, DeskDrawer, or first paint. That is BLOCK.
- Keep Rest a count until explicit KIT-06 opt-in (lazy `import("./places-rest")` only). Never first paint.
- Do not copy, list, or paste `places-rest.ts` ids / hostnames / pin rows into HUD copy or this tree’s docs.
- Coordinator may later delete the Rest concat from `places.ts` or leave `catalog.ts` orphaned. Either way, HUD must keep using lite.

---

## Tri-state

| State | Meaning |
| --- | --- |
| **PASS / NOT BLOCK** | OverlayHud / runCommand / globeEngine do not import `places.ts` or `catalog.ts`. First-paint graph has no Rest. (This sitting.) |
| **WATCH** | `places.ts` still concatenates Rest; `catalog.ts` still imports `places.ts`. Fuse remains. `permit-pins.ts` exists but is not imported. |
| **BLOCK** | OverlayHud, runCommand, or globeEngine gains a `places.ts` / `catalog.ts` import (or any first-paint edge to `places-rest.ts`). Stop. Do not ship. |
