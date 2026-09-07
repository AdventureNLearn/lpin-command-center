# SEAT 13 — CAPITALS GATE

Seat: 13 · band: later kits (11–25) · class: public-suite  
Date: 2026-08-29  
Tree: `REPO_ROOT`  
Corpus: `vendor/kept/_out/` (read-only)  
This sitting writes: this file only. Prep. **Do not implement KIT-03+.** No `src/` edits.

**Labels:** **E** on disk this sit. **I** from that evidence. **A** not verified on this disk.

Claim: **KIT-01/02 must not plot capitals. KIT-03 may plot at most one `Contact` per `kit_on_disk` country, using sourced capital coords. NR and PS stay omitted.**

---

## Verdict

**PASS (gate closed).**

`capitals.json` is a closed WAVE-2 delayed-point set: schema `gev.capitals.v1`, `count` **194** = `points.length`, every row `kind=capital` and `freshness=delayed`. Join to atlas is 194/196; the two atlas holes are **NR** and **PS** (unsourced — omit, do not invent). All **33** `kit_on_disk` countries have a capital row; package `capital` lat/lon/name match the file 33/33.

Plot permission is **not** “draw the 194.” That count is the sourced-coord inventory. Civic LEG drawing is KIT-03 only, and the budget is **≤ 33** country `Contact`s (one per kit). KIT-01 and KIT-02 stay at **zero** civic billboards.

---

## 1. Schema (`gev.capitals.v1`)

Path: `vendor/kept/_out/capitals.json`. Wrapper object, not a bare array. **E**

| Field | Value | Label |
| --- | --- | --- |
| `schema` | `gev.capitals.v1` | E |
| `generated` | `2026-08-29` | E |
| `freshness` (wrapper) | `delayed` | E |
| `source` | `naturalearth` | E |
| `source_url` | NE 50m populated-places geojson | E |
| `note` | City-level, not parcel-accurate. Countries without sourced capital coordinates omitted. No permit pins. | E |
| `count` | **194** | E |
| `points.length` | **194** (matches `count`) | E |
| bytes | **63816** (HANDOFF WAVE-2) | E |

Per-point keys, uniform on all 194: `iso2`, `name`, `lat`, `lon`, `kind`, `source_url`, `retrieved`, `freshness`. **E**

| Point field | Observed | Label |
| --- | --- | --- |
| `iso2` | 194 unique, `^[A-Z]{2}$`, 0 dups | E |
| `name` | 194 non-empty strings | E |
| `lat`, `lon` | JSON numbers, in range, no (0,0) | E |
| `kind` | `capital` × 194 | E |
| `freshness` | `delayed` × 194 | E |
| `retrieved` | `2026-08-29` × 194 | E |

File `kind` is the **coordinate class** (`capital`). It is **not** a `Contact.kind`. Civic pins use `Contact.kind = "legislature"`. Do not mint `kind: "capital"` contacts, permit pins, or member pins from this file.

Atlas counterpart: 196 rows, iso2 **lowercase**, no lat/lon. Join key = `iso2` folded. Capitals AD ↔ atlas `ad`. **E**

`src/lib/intel/corpus.ts` already static-imports this file and exposes **`count` only** (`CorpusSummary.capitals`). CorpusPanel renders `194 delayed points`. That is a count card, not a plot. **E**

---

## 2. Join — 194 sourced, 2 omitted, 33 kits

| Side | n | Unique iso2 | Label |
| --- | ---: | ---: | --- |
| atlas.json | 196 | 196 | E |
| capitals.json `points` | 194 | 194 | E |
| inner join | 194 | 194 | E |
| atlas \ capitals | **2** | **NR, PS** | E |
| capitals \ atlas | **0** | — | E |
| `kit_on_disk` true | 33 | 33 | E |
| kit ∩ capitals | **33/33** | 33 | E |
| kit missing a capital | **0** | — | E |

Atlas `kit_on_disk` true (same 33 as `packages/_index.json`):

`ar au br ca cl cn de eg es fj fr gb gh id il in it jp ke kr mx ng nl nz ph pl th tr tw tz ua us za`

NR and PS are atlas rows, `kit_on_disk: false`, and **absent** from `points[]`. **E**

VA has a sourced capital (Vatican City) but `kit_on_disk: false`. TW has both kit and capital (Taipei). **E**

---

## 3. Gate — who may plot

| Kit | Plot capitals / civic country markers? | Budget |
| --- | --- | --- |
| **KIT-00** | No | 0 |
| **KIT-01** LayerIds LEG/AHJ | **No.** Register layers. Default **off**. Empty contacts. Toggling LEG/AHJ updates rail + store only. | **0** billboards |
| **KIT-02** empty DeskDrawer | **No.** Chrome + `desk: null`. Do not walk `capitals.json` `points`, do not flyTo a capital, do not mint `Contact`s. | **0** |
| **KIT-03** KeptAdapter | **Yes, later.** At most **one** `Contact` per `kit_on_disk` country, coords from this file (or matching package `capital`). LEG on. | **≤ 33** |
| KIT-04+ | Not this file. AHJ is permit catalog. Rest is KIT-06 zoom gate. | 0 from capitals |

Handoff “≤ ~200 country markers” is a **16k-pin ceiling**, not permission to dump 194 delayed cities as LEG desks. **I**

Corpus-audit seat 02 said “plot the 194” as WAVE-2 coordinate truth (do not invent NR/PS). **This gate tightens civic drawing:** sourced ≠ plotted. The 161 non-kit capitals stay in the file for join/honesty; they are not KIT-03 `Contact`s.

---

## 4. KIT-01 / KIT-02 — must NOT plot

Current shell (read-only this seat):

- `LayerId` already includes `legislatures` / `permits`. Store defaults both `on: false`, `count: 0`, `freshness: "off"`. OverlayHud `LAYER_ORDER` appends them. **E**
- `globeEngine.ts` `useIntel.subscribe` loads flights / military / vessels / sats / quakes / fires / launches only. **No** `layers.legislatures` / `layers.permits` branch. **E**
- `flatEngine.ts` has no civic marks. **E**
- `GlobeCanvas.tsx` is a boot wrapper; no pin loop. **E**
- `src/components/desks/` is absent. **E**
- `corpus.ts` does not iterate `points[]`. **E**

**Forbidden in KIT-01 and KIT-02 (and this prep sitting):**

1. `if (s.layers.legislatures.on)` that adds Cesium entities or flat marks.
2. Looping `capitals.json` `points` (194 or 33) into `viewer.entities` / `Contact[]`.
3. Geocoding country names, interpolating neighbors, or copying a nearby capital onto NR/PS.
4. Member pins from `vendor/kept/kits/{iso}/members.json`.
5. Permit pins from `places-rest.ts` / `places.ts` (Rest is concatenated today).
6. Treating CorpusPanel’s “194 delayed points” as a draw instruction.
7. Default-on LEG/AHJ.

KIT-01 toggling LEG with **no** subscribe branch is the correct empty state. KIT-02 must not “warm” a capital flyTo to fill the empty drawer. Lead 06 already: do not plot capitals this sitting.

---

## 5. KIT-03 — at most one `Contact` per kit country

Prep only. Do not write the adapter this sitting.

### Filter

```
atlas.kit_on_disk === true
  AND packages/_index.json kit_on_disk contains iso2
  AND capitals.points has that iso2 (fold case)
→ mint 1 Contact
```

Max minted = **33**. Not 194. Not 196. Not member count.

If a future kit iso lacked a capital row: **omit that iso from the globe** (honest empty in the drawer). Do not guess a city. Today that set is empty. **E** (33/33) / **A** (future kits).

### Coords

Use `capitals.json` `lat`/`lon` for that iso2. Package `{iso}.json` `capital.{name,lat,lon,kind}` matches the file on all 33 — either copy is the same point; the WAVE-2 file is canonical. **E**

Do not:

- reverse-geocode
- “correct” TZ to Dodoma, NL to The Hague, or ZA to Cape Town / Bloemfontein (NE city choice is what is on disk)
- use chamber / member / parcel coords
- plot more than one marker per iso (no capital + chamber pair)

### `Contact` shape (KIT-03 later)

`src/lib/intel/types.ts` `Contact` is the mint type. Suggested mapping — do not invent extra kinds:

| Field | Value |
| --- | --- |
| `id` | one per iso, stable (e.g. `leg-us`) |
| `kind` | `"legislature"` — **not** file `kind` `"capital"` |
| `name` | atlas country `name` (desk), capital city in `meta` |
| `lat` / `lon` | capital point numbers |
| `altM` / `heading` / `speedMs` / `vertMs` | 0 |
| `onGround` | true |
| `country` | iso2 |
| `source` | `LAYER_META.legislatures.source` (Kept harvest / public registers) |
| `freshness` | `"delayed"` |
| `extra` | optional `capital` city name, `iso2`; no member lists |

Global zoom + LEG on = these ≤33 contacts only. **No member pins.** Roster lives in DeskDrawer (fat kits), not on the globe.

### Allowed plot roster (33)

Join: capitals iso2 uppercase ↔ `_index.kit_on_disk` lowercase. **E**

| iso2 | atlas desk | capital (NE city) | lat | lon |
| --- | --- | --- | ---: | ---: |
| AR | Argentina | Buenos Aires | -34.600556 | -58.399477 |
| AU | Australia | Canberra | -35.283029 | 149.129026 |
| BR | Brazil | Brasília | -15.781394 | -47.917998 |
| CA | Canada | Ottawa | 45.418643 | -75.701961 |
| CL | Chile | Santiago | -33.448068 | -70.668987 |
| CN | China (the People's Republic of) | Beijing | 39.930838 | 116.38634 |
| DE | Germany | Berlin | 52.523765 | 13.399603 |
| EG | Egypt | Cairo | 30.051906 | 31.248022 |
| ES | Spain | Madrid | 40.401972 | -3.685298 |
| FJ | Fiji | Suva | -18.133016 | 178.441707 |
| FR | France | Paris | 48.868639 | 2.33139 |
| GB | United Kingdom of Great Britain and Northern Ireland | London | 51.501941 | -0.118668 |
| GH | Ghana | Accra | 5.551981 | -0.218662 |
| ID | Indonesia | Jakarta | -6.172472 | 106.827492 |
| IL | Israel | Jerusalem | 31.778408 | 35.206626 |
| IN | India | New Delhi | 28.600023 | 77.19998 |
| IT | Italy | Rome | 41.897902 | 12.481313 |
| JP | Japan | Tokyo | 35.686963 | 139.749462 |
| KE | Kenya | Nairobi | -1.281401 | 36.814711 |
| KR | Republic of Korea | Seoul | 37.568295 | 126.997785 |
| MX | Mexico | Mexico City | 19.444388 | -99.132934 |
| NG | Nigeria | Abuja | 9.085279 | 7.531382 |
| NL | Netherlands (Kingdom of the) | Amsterdam | 52.351915 | 4.914694 |
| NZ | New Zealand | Wellington | -41.299988 | 174.783266 |
| PH | Philippines | Manila | 14.606105 | 120.980271 |
| PL | Poland | Warsaw | 52.251947 | 20.998054 |
| TH | Thailand | Bangkok | 13.751945 | 100.514699 |
| TR | Türkiye | Ankara | 39.929184 | 32.862446 |
| TW | Taiwan | Taipei | 25.035833 | 121.568333 |
| TZ | United Republic of Tanzania | Dar es Salaam | -6.798067 | 39.266396 |
| UA | Ukraine | Kyiv | 50.435313 | 30.514682 |
| US | United States of America | Washington,  D.C. | 38.901495 | -77.011364 |
| ZA | South Africa | Pretoria | -25.704975 | 28.227483 |

US name on disk is `Washington,  D.C.` (two spaces). Cosmetic. Coords as filed. **E**

---

## 6. Omit NR / PS (unsourced)

| iso2 | atlas name | un_member | kit_on_disk | capital row | plot |
| --- | --- | --- | --- | --- | --- |
| NR | Naoero | true | false | **absent** | **omit** |
| PS | State of Palestine | false | false | **absent** | **omit** |

File note: “Countries without sourced capital coordinates omitted.” **E**

Do not mint Yaren, Ramallah, East Jerusalem, or any interpolated neighbor. Guessing coords is a fail even if labeled delayed.

NR and PS are also not kits. Double reason to stay off the globe: unsourced **and** no `kit_on_disk`. **E**

Per-iso2 *why* NE omitted them is **not** on disk (NE geojson is not in this tree). **A**. The omit is the correct behavior given the note.

---

## 7. Also not plotted as KIT-03 LEG contacts

| Class | n | Why not |
| --- | ---: | --- |
| Non-kit atlas ∩ capitals (e.g. VA, most UN members) | 161 | No country pack. Honest empty desk, not a fake LEG pin. |
| XK / EH / HK / MO / PR | 0 on both files | Out of this join. Do not add. |
| Members / votes / committees | fat kits | Drawer only. No globe pins. |
| Permit AHJ / Rest | permit-index + places* | Different layer. Rest count 14925 is not a map. |

Drawing 194 `kind=capital` points as a “delayed overlay” under LEG would put 161 countries on the globe that have no kit. That lies about coverage. **I**

---

## 8. Fail checks (this gate)

| Check | Result |
| --- | --- |
| JSON parses; `count` == `points.length` == 194 | PASS |
| schema `gev.capitals.v1`; wrapper `freshness=delayed`; every point `kind=capital`, `freshness=delayed` | PASS |
| bytes == HANDOFF 63816 | PASS |
| NR, PS absent from `points`; present on atlas; not kits | PASS |
| kit_on_disk ∩ capitals = 33/33; package `capital` matches file | PASS |
| lat/lon in range; no (0,0) | PASS |
| globeEngine / flatEngine have no LEG/AHJ entity branch today | PASS |
| corpus.ts uses count, not a point loop | PASS |
| KIT-01/02 plot permission | **denied** |
| KIT-03 plot permission | **≤ 1 Contact × 33 kits, sourced coords only** |
| Invented NR/PS coords | **denied** |

---

## 9. Later file-touch (KIT-03 implementers — not this sitting)

Do not execute now.

**Likely:** a kept adapter that joins `_index.kit_on_disk` → `capitals.json` points → ≤33 `Contact`s; `globeEngine` / `flatEngine` subscribe on `layers.legislatures.on`; prune on off.

**Do not:** start that loop from KIT-01/02; import `places-rest.ts`; dump `members.json` onto entities; default LEG on; rewrite `_out/capitals.json`.

---

## E / I / A

**E — Evidence (disk, this tree)**

- `vendor/kept/_out/capitals.json`: `schema=gev.capitals.v1`, `count=194`, `points.length=194`, `freshness=delayed` on wrapper and every point, `source=naturalearth`, note omits unsourced countries and forbids permit pins. 63816 bytes.
- Join to `atlas.json` (196): 194 inner, 0 extras, holes **NR** (Naoero) and **PS** (State of Palestine) only. Both `kit_on_disk: false`.
- `packages/_index.json` `kit_on_disk` 33; every kit iso has a capital point; every `packages/{iso}.json` `capital` name/lat/lon/kind matches the WAVE-2 point.
- `corpus.ts` imports capitals for **count**; CorpusPanel shows “194 delayed points”; no entity mint.
- `globeEngine.ts` subscribe is seven intel loads only. No legislatures/permits branch. `src/components/desks/` absent.
- KIT-01 types/rail exist; LEG/AHJ default **off**, `count: 0`.

**I — Inference**

- 194 is the sourced-coord inventory. Plotting it as LEG would mark 161 non-kit countries as desks.
- One `Contact` per kit country (33) is the honest globe: kits that exist, delayed city points, no member swarm, no Rest dump.
- KIT-01/02 plot is the failure mode that turns empty layers into a 194- or 16k-pin loop. Keep subscribe empty until KIT-03.
- NR/PS omit is join evidence plus the file note, not a missing geocode job.

**A — Assumption**

- KIT-03 implementers will fold iso2 case, copy lat/lon as filed (including TZ Dar es Salaam, NL Amsterdam, ZA Pretoria), and will not “fix” NE city choice.
- Operators will not treat this PASS as KIT-03 shipped.
- No later wave will add NR/PS coords without a sourced row in this file.

---

## Stop

Prep only. This file is the plot gate. **KIT-01/02: zero capital/`Contact` plots.** **KIT-03 (later): ≤ 1 legislature `Contact` per `kit_on_disk` country, coords from `capitals.json`.** **Omit NR and PS.** Do not implement the adapter this sitting. Do not edit `src/`, `_out/`, or `kits/`.
