# SEAT 03 — PERMIT INDEX

Target class: public-suite. Tree: this app. Bots PARK.
Audited: `vendor/kept/_out/permit-index.json` vs `src/lib/permit/` catalog.
Date: 2026-08-29. Seat did not edit `src/`, kits, `_out/`, `package.json`, or live grok.me.
Seat did not import or rewrite `places-rest.ts`. Rest ids and pin rows are not copied here.

**VERDICT: AUDIT PASS**

permit-index.json is a WAVE-3 count card. Index counts equal independent unique-id counts on disk. Sum is 16165. The card is 1477 bytes, not a Rest pin dump. `factory_urls_verified` is JSON `false` and must stay false.

---

## Verdict

PASS. Host `_out/permit-index.json` matches the on-disk place catalog as unique place-id counts.

- Index `counts.core + extra + more + rest` = 79 + 462 + 699 + 14925 = **16165**.
- Disk unique ids (same four layers, no cross-layer overlap, no intra-layer dups) = **16165**.
- `honesty.rest_is_count_not_map` is `true`. Card holds integers, not Rest rows.
- `honesty.factory_urls_verified` is `false`. Do not treat catalog portal/department URLs as live.
- `honesty.fees_invented` is `false`. No fee amounts in the card.
- `honesty.counted_from_disk` is `true`. Catalog `LastWriteTime` dates are 2026-08-18 (`lock_date`).

This is a count card, not a map, not a URL liveness check, not a fee schedule.

---

## Count table (index vs disk)

Method: `places.ts` unique `id` with `kind` `city|county|district` (CORE_PLACES; there is no `places-core.ts`). `places-extra.ts` / `places-more.ts` unique `p("id")` calls. `places-rest.ts` count-only via Select-String `p("id")` (calls and unique; ids not listed).

| Layer | Index | Disk unique | Disk calls / matches | Delta | Catalog file | File bytes | Catalog mtime (local) |
| --- | ---: | ---: | ---: | ---: | --- | ---: | --- |
| core | 79 | 79 | 79 kind-id objects | 0 | `src/lib/permit/places.ts` | 40666 | 2026-08-18T19:39:03 |
| extra | 462 | 462 | 462 `p("id")` | 0 | `src/lib/permit/places-extra.ts` | 69888 | 2026-08-18T19:37:36 |
| more | 699 | 699 | 699 `p("id")` | 0 | `src/lib/permit/places-more.ts` | 103630 | 2026-08-18T19:37:36 |
| rest | 14925 | 14925 | 14925 `p("id")` | 0 | `src/lib/permit/places-rest.ts` | 3372392 | 2026-08-18T19:37:36 |
| **sum** | **16165** | **16165** | **16165** | **0** | | | |

Index file: `vendor/kept/_out/permit-index.json` — **1477 bytes**, mtime 2026-08-29T10:46:26-04:00 (`written_at` matches). HANDOFF WAVE-3 size 1477 bytes matches.

Layer uniqueness (ids not listed):

- core ∩ extra = 0, core ∩ more = 0, extra ∩ more = 0
- rest ∩ core = 0, rest ∩ extra = 0, rest ∩ more = 0
- rest internal duplicate `p("id")` = 0
- extra `export function p(` is 1 line and is not a place call

Kind totals (counts only; rest names/ids omitted):

| Layer | city | county | district | total |
| --- | ---: | ---: | ---: | ---: |
| core | 76 | 2 | 1 | 79 |
| extra | 411 | 51 | 0 | 462 |
| more | 563 | 127 | 9 | 699 |
| rest | 12030 | 2895 | 0 | 14925 |

`catalog_paths` (4) all exist on disk. `places.ts` exports `PLACES = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES, ...REST_PLACES]`. Combined catalog length on disk is the same 16165 unique ids.

---

## Honesty flags

Read from `permit-index.json` `honesty` (literals, not inferred):

| Flag | Index value | Seat check | Stay |
| --- | --- | --- | --- |
| `factory_urls_verified` | `false` | Boolean false in JSON. Catalog URLs were not fetched this seat (no network). | **must stay false** |
| `fees_invented` | `false` | Card has no fee fields or amounts. | stay false |
| `rest_is_count_not_map` | `true` | Card `counts.rest` is the integer 14925. No Rest id list, no GeoJSON, no coordinate pairs, no pin array. Word "pin"/"GeoJSON" appears only in honesty notes denying a map. | stay true |
| `counted_from_disk` | `true` | Independent recount matches. Catalog mtimes are 2026-08-18. | stay true |

Honesty notes on the card (paraphrase, not a Rest dump):

- core is CORE_PLACES in `places.ts`
- extra/more/rest counted as unique `p("id")` calls
- rest counted only; contents not copied; no pin/GeoJSON map
- factory URLs not verified
- fees not present as counted catalog numbers
- `lock_date` 2026-08-18 is catalog `LastWriteTime`, not a lock-date comment string in the TS files
- counted records are unique place ids, not lines

`places-rest.ts` on disk is a large catalog module (~3.37 MB, 14934 lines). That file is **not** the count card. The count card is 1477 bytes. Do not paste Rest into dashboards from either file.

---

## E / I / A

| Item | E (exists on disk) | I (indexed in permit-index.json) | A (actual, independently counted) |
| --- | --- | --- | --- |
| Count card | `_out/permit-index.json` 1477 B | owner `permit-index`, wave 3 | same file; 7 top-level keys; counts are Int32 |
| core | `places.ts` exists | 79 | 79 unique CORE_PLACES ids |
| extra | `places-extra.ts` exists | 462 | 462 unique `p("id")` |
| more | `places-more.ts` exists | 699 | 699 unique `p("id")` |
| rest | `places-rest.ts` exists (not opened into this report) | 14925 as a count | 14925 unique `p("id")`; count-only |
| sum | four catalog files + one card | 16165 | 16165 |
| Rest pins on the card | no pin payload | `rest_is_count_not_map: true` | no Rest pins in the 1477-byte JSON |
| Factory URL liveness | catalog URLs exist in src (not copied here) | `factory_urls_verified: false` | not verified; leave false |
| Fees | none on the card | `fees_invented: false` | none counted |

E, I, and A agree on counts. E/I/A disagree on URL liveness by design: indexed as unverified, actual unverified.

---

## Tri-state

**Claim:** permit-index is a safe count card for a dashboard (no Rest pins).

**Tri-state: YES**

Reasons:

1. The dashboard artifact is 1477 bytes (~1.5 KB), not a 16k pin dump.
2. Rest is an integer (14925), not a map of Rest pins.
3. Index vs disk unique ids match at 16165 with zero layer overlap.
4. No coordinate-pair arrays, no GeoJSON, no Rest id list in the card.

Dashboard rules that keep YES:

- Show layer counts and the 16165 sum. Do not expand Rest.
- Do not fetch or display factory portal URLs as live (`factory_urls_verified` stays false).
- Do not invent fees.
- Do not import `places-rest.ts` into the dashboard.

---

## Method (disk only)

- Read `vendor/kept/_out/permit-index.json` in full (1477 bytes).
- Read `vendor/kept/_out/HANDOFF.md` (WAVE-3, 1477 bytes).
- Counted `places.ts` with regex `id: "…", name: "…", kind: "(city\|county\|district)"`.
- Counted extra/more/rest with Select-String `p("id")`. Rest: counts only; no id dump; no rewrite; no import.
- Overlap sets compared without listing Rest ids.
- No network. No npm install. No git push.

---

## Honest holes (not a fail)

- Factory portal/department URLs are not live-checked.
- Rest is a count, not a plottable AHJ map.
- Fees are absent.
- `lock_date` is a filesystem date, not an in-file lock stamp.

No invented sitting names. No Rest pin dump. No src write.
