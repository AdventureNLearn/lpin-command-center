# SEAT 22 — STREAMS (KIT-07 prep)

Seat: 22 · band: later kits (11–25) · date: 2026-08-29  
Tree: `REPO_ROOT`  
Kit: `KIT-07-kept-streams.md` (depends on KIT-03). FEATURE_KITS: **Streams (max 8) + compare**.  
This sitting writes: **this file only**. No `src/` edits. No `_out/` edits. No `kits/` edits. **Do not implement.**

**VERDICT: PREP ONLY. Not this sitting.**

KIT-07 is a later drawer feature. Pin cap is **eight** country desks. Theme lanes are the **six** Kept names already on the kit. Two spare slots in the cap stay empty. Do not invent a seventh or eighth theme. `501-links.json` is a US **filings graph**, not a stream.

---

## Claim

A later KIT-07 turn can put Kept Streams + Compare inside the Kept drawer (after KIT-03 desks exist) without turning the globe into a spreadsheet, without auto-pinning eight desks, and without treating WAVE-501 as a money stream.

**Tri-state: HOLE** (contract exists; data and chrome are later). Implementation is a later sitting. Not BLOCK: this seat does not need streams on disk to prove the corpus.

---

## 1. Kit text (load-bearing)

Source: `<HOST_TREE>/KIT-07-kept-streams.md`.

Depends on **KIT-03**. Execute only that kit when its turn comes. Goal: bring Kept’s Streams and Compare into the **drawer** without turning the globe into a spreadsheet.

**Do**

1. Streams: operator pins up to **eight** country desks. Themes stay Kept’s: pipes, shared names, regulatory ties, infrastructure, awards, intel/FOIA gates.
2. Shared names = **folded-stem co-occurrence**. Label it that way. Not the same legal entity. Not a score.
3. Compare: **two** desks, pledge-vs-own-pledge, sourced fields only.
4. Pipeline / Method remain **read-only honesty pages** inside the drawer (how to complete a pack, primary-register rule).
5. Ask-the-pond stays **optional and key-gated**.

**Do not**

- Multiply PAC + award + seat into an influence score.
- Print FOIA as if the app filed it.
- Auto-pin eight desks for the user.

**Done when (later sitting):** operator can pin two countries, open compare, and see sourced holes instead of padded cells. Globe + radio still live. Stop.

HANDOFF (`GROK_BUILD_HANDOFF.md` §2): Kept adapter sections include “pipes, streams pin (max 8), method / source list”. Compare stays a Kept feature (two desks, not a fake world ranking). First-pass build: **do not skip ahead to Streams scoring UI.**

KIT-05 parser already names `compare {country} and {country}` as **opens compare shell; data fill is KIT-07**. Parser is not this seat.

---

## 2. Max 8 — what the cap is

The eight is a **pin cap**, not a license to mint eight new products.

| Slot | Kind | Name | This sitting |
| --- | --- | --- | --- |
| 1–8 | **Pins** | Operator-chosen ISO2 desks | **0**. Do not auto-fill. |
| A | Theme | **Pipes** — campaign cash ≠ lobbying ≠ grants ≠ contracts ≠ 990 | Later. Honest empty OK. |
| B | Theme | **Shared names** — folded-stem co-occurrence | Later. Label, do not equate. |
| C | Theme | **Regulatory ties** | Later. Sourced register rows only. |
| D | Theme | **Infrastructure** | Later. Filing language only. |
| E | Theme | **Awards** — grant/contract ids as filed | Later. Not a 501 network. |
| F | Theme | **Intel / FOIA gates** | Later. Do not claim the app filed FOIA. |
| — | Spare | *(two unused theme slots inside the pin cap)* | **Leave empty.** Do not invent. |
| — | Same kit, not a stream | **Compare** — exactly two desks, pledge vs own pledge | Later. Not keptglobal’s ≤4. |
| — | Honesty pages, not streams | **Pipeline / Method** | Later read-only. |
| — | Optional | **Ask-the-pond** | Key-gated only. |

**Not streams (do not spend a pin or a theme slot on these):**

| Surface | Why it is not KIT-07 |
| --- | --- |
| `vendor/kept/_out/501-links.json` | US public-filing **graph**. Counts already on CorpusPanel. See §3. |
| Radio “streams” (`src/lib/intel/radio.ts`) | Audio URLs. Tuner stays music. |
| AIS `stream.aisstream.io` | Live boats. Intel layer. |
| Permit Rest / AHJ pins | KIT-04 / KIT-06. |
| `votes.json` dump in the HUD | KIT-03+ still must not. |
| keptglobal `#/compare` (≤4 desks) | Frozen reference. GEV compare is **two** desks. Do not iframe. |

Do not pad themes to eight with “501”, “radio”, “coverage”, or “influence”.

---

## 3. `501-links` is a filings graph, not a stream

File: `vendor/kept/_out/501-links.json` (125973 bytes, iso2 `us`, retrieved 2026-08-29). WAVE-501 US **AUDIT PASS**. Companion seat: `docs/dev-team/23-501.md`.

| Field | Disk |
| --- | ---: |
| nodes | 199 (committee 166, org 33) |
| edges | 215 |
| fec / `rel=contributed` | 186 |
| usaspending / `rel=granted` | 29 |
| holes | 17 |
| influence / score / quid / pagerank / centrality keys | **0** |

It is two filing families in one JSON (FEC 24K and USAspending awards) plus honest holes. Zero node overlap between the two families. Co-occurrence is not a quid.

**Already wired (leave it):** `src/lib/intel/corpus.ts` `load501Summary()` is a **lazy** `import()`. Returns counts + hole `what` only. `CorpusPanel` prints `199 nodes · 215 edges (186 fec / 29 spending) · 17 holes` and “Public filings. Not an influence score.” No graph. No node-name dump.

**KIT-07 must not:**

- Import `501-links.json` into DeskDrawer or a streams pane.
- Draw nodes/edges, force-layout, or rank “influence.”
- Treat `rel=granted` as the Awards **stream**. Awards theme, when built, reads sourced kit rows (award id + `source_url`) or stays a hole. It does not replay this graph.
- Treat `rel=contributed` as the Pipes **stream**. Pipes stay separate buckets (`money.json` `named_donors: false`).
- Merge PAC + award + seat because they share a file.

HANDOFF: “Pipes stay separate: campaign cash ≠ lobbying ≠ grants ≠ contracts ≠ 990.” That sentence is the streams contract. 501-links is the **index of some US filings**, not those pipes.

---

## 4. Disk vs later (what exists now)

Civic code: KIT-01 LayerIds + corpus panel are on disk. `CommandAction` has `corpus`, not `desk`, not `compare`, not `stream`. No `src/components/desks/`. No `src/lib/kept/`. Store has no `streamPins`.

### Theme fuel on disk (fat kits — KIT-03+ reads, not this sitting)

Do not open `votes.json` for a HUD. Counts below are from `_out/packages/{iso}.json` object rows and file presence, not a name dump.

| Object | Where | Stream use later | Honest hole now |
| --- | --- | --- | --- |
| `money.json` | all 33 kits | Pipes (source-type buckets) | US: 4 FEC House buckets, `named_donors: false`, `sitting_total_reconstructed` null |
| `lobby.json` | **cl, fj, nl, th, tz** + `_template` only | Pipes / regulatory | `items: []`, `incomplete: true` |
| `orgs.json` | same five | 501/NGO rows (EIN + 990 URL) | empty; churches that do not file stay empty |
| `filers.json` | same five | Itemized **public** filers | `named_public_filers: false`, items 0 |
| `pledges.json` | 33 kits | Compare (sentence + `https` URL) | US package `filled` 297, `incomplete true`; party ticket is not a pledge |
| `gap.json` | 33 kits | Compare (broke **own** pledge) | US `items: []` after 7228 pairs examined — honest empty |
| `issues.json` | 33 kits | Labels only (border, energy, …) | Do not mint new ids from committee names |
| `sources.json` | 33 kits | Method page | provenance URLs |
| `institutional.json` | 33 kits | not a stream | US `items: []`, claimed 0 |
| `ethics.json` | 33 kits | not a stream | public categories; no confidential annex |
| `501-links.json` | `_out/` only | **not a stream** | corpus counts + 17 `what` lines |

US package objects do **not** include lobby / orgs / filers. Those files exist as empty templates on five kits. Empty is a pass.

Keptglobal live compare (`public/app.js`) is **≤4** desks and a `#/compare` route. Frozen reference. GEV KIT-07 is **two** desks inside DeskDrawer. Do not copy the four-up grid onto the globe.

No folded-stem engine in this tree. Shared-names later is a labeled co-occurrence list, or a hole.

---

## 5. Later file-touch (not this sitting)

Do **not** execute from this file. When KIT-03 desks exist and a later turn runs KIT-07 only:

**Likely extend**

- intel store: `streamPins: string[]` (ISO2, **max 8**, default `[]`); `compare: null \| { a: string; b: string }`
- `src/lib/intel/types.ts` `CommandAction` compare (KIT-05 may add the parse; this kit fills data)
- KeptAdapter inside `DeskDrawer`: pin control, six theme panes, two-desk compare, Method/Pipeline honesty, Ask only if key
- Optional `src/lib/kept/streams.ts`: folded-stem label + pin cap helper. Lazy. No first-paint.

**Do not touch**

- `GlobeCanvas.tsx` / `globeEngine.ts` / `flatEngine.ts` (no stream pins on Earth; country markers stay KIT-03 ≤ ~200)
- `corpus.ts` 501 loader (leave lazy, counts-only)
- `CorpusPanel.tsx` (stay HUD index)
- `radio.ts` / `RadioDeck.tsx`
- `src/lib/permit/places-rest.ts` / current `places.ts`
- `vendor/kept/_out/**`, `vendor/kept/kits/**`
- `package.json`, live gevradio, iframe of keptglobal

**Commands (KIT-05, data KIT-07):** `compare canada and japan` opens the two-desk shell. Pin/unpin is drawer UI, not auto-LEG. Do not steal `put on` / station names.

Smoke when that later sitting runs (not now): pin two of the 33 `kit_on_disk` isos → compare shows sourced pledge holes, not padded cells; ninth pin refused; LEG/AHJ drawing unchanged; Creedence still plays; 501 panel still counts-only; zero Rest pins.

---

## 6. E / I / A

**E — Evidence (disk, this tree)**

- KIT-07: pin ≤8 country desks; six named themes; shared names = folded-stem co-occurrence; compare = two desks; no influence product; no auto-pin; no FOIA-as-filed.
- FEATURE_KITS + BUILD-PLAN: KIT-07 = streams/compare (max 8). Depends on KIT-03. One kit per turn. Later-kits band = prep only.
- `src/components/desks/` absent. `CommandAction` has no desk/compare/stream. `store.ts` has no `streamPins`.
- `_out/501-links.json`: 199 / 215 (186+29) / 17. No score keys. CorpusPanel already prints counts. `load501Summary` does not return names.
- US `money.json`: buckets, `named_donors: false`. Lobby/orgs/filers: five kits, all empty items.
- keptglobal compare is a `#/compare` route, cap 4. HANDOFF GEV compare is two desks.
- Radio “stream” strings are audio. AIS stream is boats.

**I — Inference**

- The cheapest lie is to treat 501-links (or radio streams) as KIT-07. That would skip desks, skip the pin cap, and invite a scoring UI the first-pass build already forbids.
- Six themes + an eight-pin board is already the kit. Filling two spare theme slots with 501/radio/coverage would be invented product.
- Compare at two desks (not four) is a narrowing vs keptglobal, not a hole to “fix.”
- Empty lobby/orgs/filers and empty US gap are valid stream output: sourced holes, not padded cells.
- Streams live in the Kept drawer. Putting them on Cesium would be the spreadsheet the kit forbids.

**A — Assumption**

- Operators will not treat this prep file as KIT-07 done.
- KIT-03 will exist before anyone pins a desk. This seat does not create desks.
- Seat 23 keeps 501 on the corpus panel; this seat does not reopen that graph.
- A later implementer will refuse a 9th pin in the store, not in copy only.

---

## Stop

Prep only. **Max 8 pinned desks. Six Kept themes. Compare is two desks.** Pipeline/Method are honesty pages. Ask is key-gated. **`501-links` is a filings graph, not a stream.** Do not implement. Do not auto-pin. Do not score. Globe stays the homepage.
