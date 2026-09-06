# 13 — Drawer / adapter contract

Seat: 13 · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
Corpus: `vendor/kept/_out/` · kits (fat, later): `vendor/kept/kits/{iso}/`  
This file is the contract. It does not patch `src/`.

Shell + plugins (handoff §§0–2): homepage stays the Cesium globe. Civic work is a layer + a drawer. One panel, two adapters. Radio / comms / command bar stay reachable. Honest incomplete beats padded complete.

---

## Tri-state

Claim: **a corpus panel + KIT-01 is enough smoke without KIT-02–09.**

| State | Meaning |
| --- | --- |
| **PASS** | Enough to *prove* the corpus is the base of an integrated intelligence dashboard. |
| HOLE | Enough for proof, not a shipped civic product. |
| BLOCK | Would fail a P0 (globe dead, 16k pins, iframe-as-integration, invented names). |

**Verdict: PASS (honest-incomplete).**  
Smoke this sitting = one corpus panel in the existing HUD + KIT-01 layer slots (LEG / AHJ **default off**, zero Rest pins). That is the smallest surface. KIT-02–04 are the later drawer/adapters. KIT-05–09 stay later. Not BLOCK: this does not require those kits to prove the corpus is wired into the cockpit.

---

## 1. Smallest smoke surface this sitting

Not a new homepage. Not a new route. Not KIT-02 `DeskDrawer`. Not keptglobal / hivepermitdev in an iframe.

**Put one corpus panel inside the existing OverlayHud layer-rail** (`L` / Layers, already `drawerOpen` in `src/components/intel/OverlayHud.tsx`). Globe stays mounted (`IntelApp` = `GlobeCanvas` + HUD). Command bar stays the footer. Radio and comms stay the existing decks.

The panel proves four on-disk facts and nothing else:

| Widget | What it shows | Why it is enough |
| --- | --- | --- |
| 33 desks | `kit_on_disk` ISO2 list | Scoring kits exist in this tree |
| Holes | Per-desk hole counts + last-audit | Honest incomplete is visible |
| Permit counts | Core / Extra / More / Rest as **counts** | AHJ catalog is indexed; Rest is not a map |
| 501 stats | US nodes / edges / holes | Public-filing graph is indexed, not scored |

Layers **LEG** and **AHJ** may appear on the rail (KIT-01) but stay **off**. No country markers. No AHJ pins. **Zero Rest pins.** Empty contact arrays are fine.

That is the integrated-dashboard proof: cockpit + corpus index + plugin slots, without unmounting Earth.

---

## 2. Smoke-this-sitting vs later-kits

| | Smoke this sitting | Later kits |
| --- | --- | --- |
| **KIT-00** | Already the shell lock. Globe / radio / comms / first-run survive. | — |
| **KIT-01** | **In smoke.** `LayerId` += `legislatures` \| `permits`. Rail short `LEG` / `AHJ`. Default **off**. No fetch, no pins. | — |
| **Corpus panel** | **In smoke.** Counts + holes + 501 stats in the existing HUD. Reads `_out` index files only. | — |
| **KIT-02** | Out. Placeholder “No desk selected” is not required to prove the corpus. | `src/components/desks/DeskDrawer.tsx`. Right-side dark panel. Esc closes. Store `{ desk: null \| { system: "kept" \| "permit"; id: string } }`. Mobile = bottom sheet that does **not** cover the command bar. |
| **KIT-03** | Out. Do not load `members.json` / `votes.json` into the HUD. | Kept adapter. Country `Contact` (≤ ~200) on capital/chamber. Roster from **fat kits**. |
| **KIT-04** | Out. Permit-index is a **count card**, not search. | Permit adapter. Typeahead Core + Extra + More. Confidence chips. Disclaimer always on. |
| **KIT-05** | Out. | Civic command grammar (`open korea`, `find AHJ in fort pierce`). |
| **KIT-06** | Out. Rest stays a count. | Zoom-gated clustered pins. Rest only after search / state pack / county-scale camera. |
| **KIT-07–09** | Out. | Streams/compare (max 8), one-click/PWA, add-a-feature template. |

KIT-02 is the *drawer*. KIT-03 / KIT-04 are the *adapters*. Smoke uses neither. Do not pretend the Layers rail is DeskDrawer.

---

## 3. Data sources per widget

Read `_out` for smoke. Read `vendor/kept/kits/{iso}` only in later KIT-03. Search `src/lib/permit/places*.ts` only in later KIT-04, and never Rest on first paint.

| Widget | File (absolute under this tree) | Fields to render | Do not load |
| --- | --- | --- | --- |
| 33 desks | `vendor/kept/_out/packages/_index.json` | `kit_on_disk` (33 ISO2), `kit_on_disk_count: 33`, `remaining_count: 0`, `last_audit` PACKAGE-TZ PASS | `vendor/kept/index.json` claimed 19 scoring kits / sitting tallies (stale vs `_out`) |
| Desk holes | `_index.json` `rows[]` (`iso2`, `holes`, `audit`) plus `packages/{iso}.json` `holes[]` | Object-level holes (`items 0`, `incomplete true`, `selected 849 claimed 1878`). ISO2 only. | `vendor/kept/kits/{iso}/members.json` names; do not invent sittings |
| Atlas holes (empty desks) | `vendor/kept/_out/atlas.json` | 196 rows; `kit_on_disk` true = 33, false = 163; `un_member` true = 193, false = 3 (`ps`, `tw`, `va`) | Padding the 163 into fake rosters |
| Permit count card | `vendor/kept/_out/permit-index.json` | `counts.core 79`, `extra 462`, `more 699`, `rest 14925`; `honesty.rest_is_count_not_map: true`; `factory_urls_verified: false`; `lock_date: 2026-08-18` | `src/lib/permit/places-rest.ts` (no pin list, no GeoJSON) |
| US permit slice (optional footnote) | `vendor/kept/_out/packages/us-permit.json` | US-only 50+DC: core 79, extra 462, more **680**, rest **14855**. Holes: 19 territory rows omitted from more; 70 PR omitted from rest. Matches global − US-only deltas. | Treating US-only as the global card |
| Non-US permit honesty | e.g. `packages/tz-permit.json` | All zeros. Hole: “US AHJ catalog has no Tanzania AHJs… Country-native catalogs stay zero.” TZ ≠ TX/TN. | Copying Texas/Tennessee AHJs onto TZ |
| 501 stats | `vendor/kept/_out/501-links.json` + `_out/AUDIT.md` | `iso2: us`; nodes **199** (committee 166, org 33); edges **215** (fec 186, usaspending 29); holes **17**. WAVE-501 AUDIT PASS. | Node/edge dumps, Sch B / c4–c6 donors, addresses, 990 Part VII names |
| Capital points (KIT-03 later, not smoke pins) | `vendor/kept/_out/capitals.json` | `count: 194`, `kind: capital`, delayed, Natural Earth, “not parcel-accurate. No permit pins.” | Plotting them while LEG is off |

### Package vs fat kit (load-bearing)

`packages/us.json` is the **index/holes layer**:

- `kit_on_disk: true`
- object counts only (`members.json` 437 filled, `votes.json` 849 filled, `sources.json` 1238, …)
- `holes[]` includes `votes.json`: `incomplete true; selected 849 claimed 1878`
- `source: "vendor/kept/kits/us"`
- capital point for later flyTo, not a smoke pin

`vendor/kept/kits/us/votes.json` is the **fat record** (clerk roll-call items + `source_url`).  
`vendor/kept/kits/us/members.json` is the **fat roster** (`claimed_seats: 435`, items named as filed; package count 437).  
`_out` packages are **not** a replacement for those files.

---

## 4. Later adapter contract (KIT-02 / 03 / 04)

From handoff §2. Do not build this sitting.

```
[ Cesium globe + existing intel layers ]
        ▲
[ Overlay HUD — command bar, styles, radio, comms, layer rail ]
        │
        ├── Layer LEG  (KIT-01 now / markers KIT-03 later)  default OFF
        ├── Layer AHJ  (KIT-01 now / pins KIT-04+06 later)  default OFF
        └── DeskDrawer (KIT-02) — one panel, two adapters
              ├── KeptAdapter  (KIT-03)
              └── PermitAdapter (KIT-04)
```

### KIT-03 — KeptAdapter

1. If `atlas.json` row `kit_on_disk === true` **and** `vendor/kept/kits/{iso}/` exists: read **fat** `members.json` / `meta.json` / `parties.json` / `pledges.json` / `sources.json` (and related objects as filed). Names as filed. Visible hole if a seat is unnamed. `source_url` where present.
2. Else: **honest empty** from atlas (`name`, `iso2`, `un_member`, `kit_on_disk: false`, UN/ISO `source_url`). No invented members.
3. At most one `Contact` per country pack, kind `legislature`, on `capitals.json` / package `capital`. Global zoom + LEG on = those contacts only. **No member pins.**
4. `_out/packages/{iso}.json` stays the index/holes strip (counts + hole reasons). It does **not** stand in for fat `votes.json`.

### KIT-04 — PermitAdapter

1. Search `src/lib/permit/places.ts` (CORE) + `places-extra.ts` + `places-more.ts`.
2. **Never** import or search `places-rest.ts` on first paint. Rest is the count on `permit-index.json` until KIT-06 opt-in.
3. Results: name, kind, state, portal URL, confidence chip — core = higher; extra/more = mid; rest (later) = provisional research seed.
4. Card: AHJ + portal + `DISCLAIMER` from `src/lib/permit/types.ts` always visible. Factory URLs stay unverified. No fee tables.
5. Disk note for the later split: `places.ts` today static-imports `REST_PLACES` and concatenates it into `PLACES` / `searchPlaces`. KIT-04 must **break that import** before the globe bundles Rest. Smoke must not import `places.ts` at all (that would pull Rest now).

### KIT-02 — DeskDrawer shell

Right-side cockpit chrome (not Kept cream). Header = Legislature / Building desk. Footer = honesty strip. Globe stays mounted. Not a router change (`src/routes/index.tsx` remains `IntelApp` only).

---

## 5. Do-not

- Do not iframe `keptglobal.grok.me` or `hivepermitdev.grok.me` as the “integration.”
- Do not add a civic homepage or a route that unmounts Cesium.
- Do not treat this HUD panel as KIT-02 DeskDrawer, or skip KIT-02 later because smoke existed.
- Do not plot Rest-layer pins. Do not dump 16,165 / 14,925 desks onto the globe.
- Do not import `places-rest.ts` (or current `places.ts`, which pulls Rest) on first paint.
- Do not substitute `_out/packages/{iso}.json` for fat `votes.json` / `members.json`.
- Do not invent sitting names, whip marks, donors, lobby clients, or awards.
- Do not pad the 163 `kit_on_disk: false` atlas rows into fake-complete kits.
- Do not mark factory / Rest portal URLs verified. Do not add unsourced fees.
- Do not merge scoring language into radio copy. Tuner stays music.
- Do not print skill brands, swarm names, investigator legal names, or pattern-lab chrome.
- Do not remix live gevradio from this contract. Do not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, or `package.json` from this seat.
- Do not enable LEG/AHJ on by default.

---

## 6. E / I / A

**E — Evidence (disk, this tree)**

- Handoff §§0–2: shell + plugins; DeskDrawer = one panel, two adapters; homepage is the globe.
- FEATURE_KITS: KIT-02 drawer, KIT-03 Kept desks, KIT-04 permit search (Core/Extra/More, not Rest).
- `src/lib/intel/types.ts`: `LayerId` is still the seven intel layers. No `legislatures` / `permits`.
- `OverlayHud.tsx`: `LAYER_ORDER` is those seven; `drawerOpen` is the left **Open sources** rail (`L`), not a civic desk.
- `IntelApp.tsx` / `src/routes/index.tsx`: globe + HUD only. No `src/components/desks/`.
- KIT-00 localhost smoke: civic not started; no LEG/AHJ on the rail.
- `_out/HANDOFF.md`: 33/33 PASS, remaining 0; WAVE-501 US AUDIT PASS; next is Grok Build wiring, not src from bots.
- `_out/packages/_index.json`: 33 `kit_on_disk`, `remaining_count: 0`.
- `_out/permit-index.json`: 79 / 462 / 699 / 14925; Rest is a count; factory URLs not verified.
- `_out/packages/us.json`: index/holes; fat source `vendor/kept/kits/us`.
- `_out/501-links.json` + `AUDIT.md`: 199 / 215 / 17, PASS.

**I — Inference**

- The cheapest proof that “the corpus is the base of the dashboard” is to *show the index in the cockpit that already exists*, not to ship adapters.
- KIT-01 is the plugin-slot proof (layers exist, default off). The corpus panel is the data-slot proof (`_out` is readable without Kept/Permit homepages).
- KIT-02–04 remain necessary for *using* a desk; they are not necessary for *this sitting’s smoke*.

**A — Assumption**

- A static JSON panel in OverlayHud can be added in a later wiring turn without this audit seat touching `src/`.
- Operators will not treat PASS-on-smoke as KIT-02–04 done.
- `places.ts` Rest concatenation will be split in KIT-04, not papered over by searching Rest “just this once.”

---

## 7. Current HUD vs future drawer (do not conflate)

| Surface | Exists now | Role |
| --- | --- | --- |
| OverlayHud layer-rail (`L`) | Yes | Intel layers + **smoke corpus panel** (this sitting) + KIT-01 LEG/AHJ toggles default off |
| Command bar (footer) | Yes | Stays usable. Civic grammar is KIT-05 |
| RadioDeck / CommsChat | Yes | Stay reachable while any panel is open |
| DeskDrawer | No | KIT-02. Hosts KeptAdapter + PermitAdapter |
| LEG markers | No | KIT-03. ≤ ~200 capitals. Default off until then |
| AHJ pins | No | KIT-04 search; KIT-06 zoom gate. Rest never on first paint |

---

## 8. Smoke checklist (when a later turn implements this contract)

1. Globe still orbits. Radio still plays. Four original first-run cards still present.
2. Layers rail still has the original seven sources. LEG / AHJ exist and are **off**.
3. Corpus panel (same HUD, globe mounted) shows **33** desks, hole counts, permit-index **79 / 462 / 699 / 14925**, 501 **199 / 215 / 17**.
4. Rest pin count on the globe = **0**.
5. No iframe of keptglobal or hivepermitdev.
6. No `members.json` name dump, no `votes.json` in the HUD, no `places-rest` import.

Stop. Do not start KIT-02 in the same turn.
