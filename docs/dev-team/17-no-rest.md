# SEAT 17 — NO-REST IMPORT GRAPH

Seat: 17 (later kits, prep only). Coordinator: Host Grok Build.
Target class: public-suite. Tree: `REPO_ROOT`.
Date: 2026-08-29. This file only. Did not edit `src/`, `_out/`, or `kits/`.

Claim: **first-paint OverlayHud / corpus do not import Rest. `places.ts` does. KIT-02 / KIT-04 must not import Rest.**

---

## Verdict

**NOT BLOCK.** OverlayHud and corpus do **not** import `places-rest.ts` (direct, barrel, or transitive).

**BLOCK would fire if** `OverlayHud.tsx`, `CorpusPanel.tsx`, or `src/lib/intel/corpus.ts` imported `places-rest`, `places.ts`, or `catalog.ts`. They do not.

KIT-02 / KIT-04 files are **absent**. They cannot import Rest today. They **must not** when written.

---

## Does `places.ts` pull Rest?

**Yes.** Static ESM import + concatenation. Any importer of `places.ts` ships the 3.37 MB Rest catalog.

```4:4:src/lib/permit/places.ts
import { REST_PLACES } from "./places-rest";
```

```636:636:src/lib/permit/places.ts
export const PLACES: PlaceDesk[] = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES, ...REST_PLACES];
```

`searchPlaces` / `getPlace` / `placeLayer` / `placesInState` all walk `PLACES`. There is no `places-core.ts`. CORE (79) lives in the same module that static-imports Rest.

---

## Import graph (disk, 2026-08-29)

Grep of `src/**/*.{ts,tsx}` and `scripts/**/*.mjs` for `places-rest`, `from "./places"`, `@/lib/permit`.

```
FIRST PAINT (Vite HUD / globe) — Rest NOT in graph
==================================================
src/routes/index.tsx
  └── IntelApp.tsx
        ├── GlobeCanvas.tsx  → dynamic cesium / globeEngine / flatEngine
        ├── DetectionOverlay.tsx
        └── OverlayHud.tsx
              ├── CorpusPanel.tsx
              │     └── @/lib/intel/corpus.ts
              │           eager:  _out/atlas.json
              │           eager:  _out/capitals.json
              │           eager:  _out/permit-index.json   ← rest COUNT only
              │           eager:  _out/packages/_index.json
              │           lazy:   _out/501-links.json
              ├── CommsChat / RadioDeck / FirstRun / FeedUnlock
              └── @/lib/intel/{geo,runCommand,scenes,share,store,comms,radio,types}
                  @/lib/feeds/world

  OverlayHud.tsx  — 0 hits for places-rest | lib/permit | from ".../places"
  CorpusPanel.tsx — 0 hits
  corpus.ts       — 0 hits (permit.rest is permit-index.json number)
  globeEngine.ts  — 0 hits
  store.ts        — 0 hits
  IntelApp.tsx    — 0 hits

POISON CHAIN (not reachable from HUD today)
===========================================
places-rest.ts  (REST_PLACES, 3,372,392 B, 14925 p("id"))
  import type { PlaceDesk } from "./types"
  import { p } from "./places-extra"          ← helper only; extra does not import rest

places.ts
  import EXTRA_PLACES from "./places-extra"
  import MORE_PLACES  from "./places-more"
  import REST_PLACES  from "./places-rest"    ← PULLS REST
  CORE_PLACES inlined (79)
  export PLACES = [...CORE, ...EXTRA, ...MORE, ...REST]

catalog.ts
  import { getPlace, PLACES, searchPlaces } from "./places"   ← PULLS REST
  + playbooks, states, resources, types

  NO src/ component, route, or intel module imports catalog.ts.

SAFE LEAVES (do not pull Rest if imported alone)
================================================
places-extra.ts  → types only. EXTRA_PLACES + p()
places-more.ts   → types + p from extra. Does NOT import rest
types.ts         → types only
playbooks.ts / states.ts / resources.ts / row-map.ts
  → no places* import. row-map.ts has zero importers in src/.

OFF-BUNDLE READERS (not Vite ESM)
=================================
scripts/permit/catalog-integrity.test.mjs
  readFileSync("src/lib/permit/places-rest.ts") + regex p("id")
  same for places.ts / extra / more. Text parse, not import.

docs/corpus-audit/smoke-corpus.mjs
  readFileSync OverlayHud.tsx
  fail if hud.includes("places-rest")

vendor/kept/_out/permit-index.json
  catalog_paths[] lists the four files as disk paths (not JS imports)
  counts.rest = 14925; honesty.rest_is_count_not_map = true
```

### Who imports `places-rest.ts`?

| Importer | How | Pulls Rest into HUD bundle? |
| --- | --- | --- |
| `src/lib/permit/places.ts` | `import { REST_PLACES } from "./places-rest"` | **Yes, if `places.ts` is imported.** Today nothing in HUD does. |
| `scripts/permit/catalog-integrity.test.mjs` | `readFileSync` + regex | No (node test, not Vite). |
| OverlayHud / CorpusPanel / corpus.ts | — | **No.** |
| KIT-02 `DeskDrawer.tsx` | file absent | n/a |
| KIT-04 `PermitAdapter` | file absent | n/a |

### Who imports `places.ts`?

| Importer | How | Pulls Rest? |
| --- | --- | --- |
| `src/lib/permit/catalog.ts` | `from "./places"` | **Yes** (catalog is currently an orphan: no HUD/route importer). |
| OverlayHud / corpus / globe | — | **No.** |
| KIT-02 / KIT-04 | absent | n/a |

Reverse: `places-rest.ts` and `places-more.ts` import `p` from `places-extra.ts`. Extra does **not** import Rest. Importing extra or more alone is Rest-safe.

---

## KIT-02 / KIT-04 must not import Rest

| Kit | Target file (not written) | Allowed reads | Forbidden |
| --- | --- | --- | --- |
| **KIT-02** DeskDrawer | `src/components/desks/DeskDrawer.tsx` | empty chrome; `desk: null`; honesty copy; OverlayHud mount | `places-rest.ts`, `places.ts`, `catalog.ts`, `{iso}.json`, `votes.json` |
| **KIT-04** PermitAdapter | under DeskDrawer (later) | CORE + extra + more **after Rest is split out of `places.ts`**; count card = `permit-index.json` | `places-rest.ts` on first paint; current `places.ts`; current `catalog.ts` |

KIT-02 empty drawer does not need any `src/lib/permit/places*` module. Permit tab copy can quote the count card: core **79** · extra **462** · more **699** · rest **14925** (count only), lock **2026-08-18**.

KIT-04 cannot `import { searchPlaces } from "@/lib/permit/places"` until `places.ts` stops static-importing `REST_PLACES`. That single line is the 16k-pin / 3.37 MiB bundle fuse.

Suggested later split (not this seat):

1. Move `CORE_PLACES` to a Rest-free module (or delete the Rest import from `places.ts`).
2. `PLACES` for typeahead = CORE + EXTRA + MORE only.
3. `catalog.ts` must follow the split or stay unimported.
4. Rest stays a count until KIT-06 opt-in (search / state pack / county-scale camera). Never first paint.

---

## First-paint vs count

`corpus.ts` **does** mention `rest` as an integer from `_out/permit-index.json`:

```67:70:src/lib/intel/corpus.ts
    const core = permitIndex.counts?.core ?? 0;
    const extra = permitIndex.counts?.extra ?? 0;
    const more = permitIndex.counts?.more ?? 0;
    const rest = permitIndex.counts?.rest ?? 0;
```

That is the count card (`honesty.rest_is_count_not_map: true`). It is **not** an import of `places-rest.ts`. OverlayHud mounts `<CorpusPanel />` (line 681) and toggles `corpusOpen`. LAYER_META `permits` source string is `"Permit Harbor catalog (locked 2026-08-18)"` — a label, not a module.

Smoke gate already on disk: `docs/corpus-audit/smoke-corpus.mjs` fails if OverlayHud source contains `places-rest`.

Sizes (this tree):

| File | Bytes |
| --- | ---: |
| `places-rest.ts` | 3,372,392 |
| `places-more.ts` | 103,630 |
| `places-extra.ts` | 69,888 |
| `places.ts` | 40,666 |
| `catalog.ts` | 4,760 |
| `corpus.ts` | 4,695 |
| `CorpusPanel.tsx` | 4,631 |
| `permit-index.json` | ~1.5 KB |

---

## Do-not (this seat and KIT-02/04)

- Do not import `places-rest.ts` into OverlayHud, corpus, DeskDrawer, globeEngine, or first paint.
- Do not import current `places.ts` or `catalog.ts` until Rest is split.
- Do not treat `permit-index.json` `catalog_paths` as permission to ESM-import those files.
- Do not plot 14,925 / 16,165 pins. Rest is a count.
- Do not implement KIT-03+ from this seat. No `src/` edit.

---

## E / I / A

**E — Evidence**

- `places.ts` line 4: `import { REST_PLACES } from "./places-rest"`. Line 636 concatenates Rest into `PLACES`. CORE 79 is in the same file.
- Only TS importer of `places.ts` is `catalog.ts`. Zero HUD / route / intel importers of `catalog.ts`, `places.ts`, or `places-rest.ts`.
- OverlayHud imports: lucide, CommsChat, **CorpusPanel**, FirstRun, FeedUnlock, RadioDeck, intel geo/runCommand/scenes/share/store/comms/radio/types, feeds/world. No permit path.
- `corpus.ts` static-imports four `_out` JSON files; lazy-imports `501-links.json` only. `permit.rest` is `permitIndex.counts.rest`.
- Select-String of OverlayHud, CorpusPanel, corpus.ts, IntelApp, globeEngine, flatEngine, store, runCommand, `src/routes/index.tsx`: **0** matches for `places-rest` / `lib/permit`.
- `src/components/desks/` absent. No PermitAdapter.
- `places-rest.ts` 3,372,392 B; 14,925 `p("` calls. `permit-index.json` rest 14925, `rest_is_count_not_map: true`.
- Off-bundle: `catalog-integrity.test.mjs` `readFileSync` of Rest; `smoke-corpus.mjs` HUD string scan.

**I — Inference**

- First paint is Rest-clean. The fuse is `places.ts`, not OverlayHud. Wiring KIT-04 to `searchPlaces` *before* the split would silently bundle 3.37 MiB and make Rest searchable on first typeahead.
- KIT-02 empty drawer has no reason to touch `src/lib/permit/` at all. Honesty copy can quote the count card.
- Extra / more are Rest-safe leaves. CORE is not, until it leaves `places.ts` (or Rest leaves `places.ts`).

**A — Assumption**

- Host / KIT-04 will split the Rest import before any PermitAdapter ships. They will not “lazy-import Rest just in case.”
- Operators will not treat `catalog.ts` existing on disk as first-paint. It stays unimported until split.
- This seat writes only this file. No `src/` edit. No npm. No git push.

---

## Tri-state

**Question:** do OverlayHud / corpus already import Rest?

| State | Meaning |
| --- | --- |
| **PASS / NOT BLOCK** | No OverlayHud / corpus / IntelApp / globeEngine import of `places-rest` or `places.ts`. (This sitting.) |
| **WATCH** | `places.ts` still concatenates Rest; `catalog.ts` still imports `places.ts`. KIT-04 must split first. |
| **BLOCK** | OverlayHud, CorpusPanel, or `corpus.ts` gains a Rest / `places.ts` / `catalog.ts` import. Stop. Do not ship KIT-02/04 on that graph. |
