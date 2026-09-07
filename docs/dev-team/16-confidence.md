# SEAT 16 — CONFIDENCE CHIPS

Seat: 16 · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
Band: later kits (11–25). **Prep only. Do not implement KIT-03+.**  
This sitting writes: this file only. No `src/`, `_out/`, `kits/`, or `package.json` edits.

Parent: `docs/corpus-audit/13-drawer-contract.md` KIT-04 PermitAdapter.  
Index: `vendor/kept/_out/permit-index.json`. Disclaimer: `src/lib/permit/types.ts`.

**VERDICT: PREP PASS (honest-incomplete)**

Chip tokens are layer-authored, not live-checked. Core = **higher**. Extra and more = **mid**. Rest = **provisional**, later (not first paint). Factory URLs stay unverified. `DISCLAIMER` is always on. Do not treat a chip as an HTTP 200.

---

## Claim

KIT-04 result rows and AHJ cards can show a three-state confidence chip from `placeLayer(id)` without fetching portals, inventing fees, or importing Rest.

**Tri-state: YES** (contract). Implementation is a later KIT-04 turn, not this seat.

---

## Chip map (load-bearing)

| Catalog layer | Count (index) | Chip token | When it appears | Meaning |
| --- | ---: | --- | --- | --- |
| **core** | 79 | `higher` | KIT-04 first paint | Hand-authored `CORE_PLACES` in `places.ts`. Named portal vs department pages, extra notes / holds / links where filed. Still not a live login. |
| **extra** | 462 | `mid` | KIT-04 first paint | Named factory `p()` desks in `places-extra.ts`. One URL for portal and department. Guidance only. |
| **more** | 699 | `mid` | KIT-04 first paint | Named factory `p()` desks in `places-more.ts` (typically remaining 50k+ cities, extra counties, territories). Same factory shape as extra. |
| **rest** | 14925 | `provisional` | **Later** (KIT-06 opt-in only) | Census-gazetteer factory seed. Research starting point, not a verified AHJ. Count on the index until then. |

Search surface for KIT-04: **core + extra + more only** (79 + 462 + 699 = **1240**). Rest stays the integer **14925** on the count card until KIT-06.

Chip is **catalog layer**, not:

- URL liveness (`honesty.factory_urls_verified` is `false`)
- fee accuracy (`honesty.fees_invented` is `false`; no fee tables)
- a map (`honesty.rest_is_count_not_map` is `true`)
- legal advice (`DISCLAIMER`)

Extra and more share **mid**. Do not invent a fourth token. Do not promote extra/more to higher because the hostname looks official.

---

## Honesty (literals from `permit-index.json`)

File: `vendor/kept/_out/permit-index.json` (1477 bytes, wave 3, `lock_date` 2026-08-18).

| Flag | Value | Chip consequence |
| --- | --- | --- |
| `factory_urls_verified` | **`false`** | Must stay false. Do not green a chip, badge a portal, or copy “verified” next to `portalUrl` / `departmentUrl`. Integrity tests only check `https://` shape, not fetch. |
| `fees_invented` | `false` | Stay false. Chip is not a fee grade. No fee amounts on the card. |
| `rest_is_count_not_map` | `true` | Stay true. No Rest chip on first paint. No Rest pin, GeoJSON, or id dump from this seat. |
| `counted_from_disk` | `true` | Layer counts 79 / 462 / 699 / 14925 = **16165**. Chip buckets use those layers, not line counts. |

Honesty notes on the card (paraphrase): factory URLs **not** verified; do not treat `portalUrl` / `departmentUrl` as live; rest counted only; fees not present as catalog numbers.

UI honesty strip (KIT-04 footer, always):

- Factory portal URLs are not verified.
- Rest is a count, not a map.
- Fees omitted.
- Guidance only — see `DISCLAIMER`.

---

## DISCLAIMER (always on)

Exact export from `src/lib/permit/types.ts` (do not rewrite, shorten, or hide behind the chip):

> Guidance only — not legal advice, not a city login, and not a substitute for the adopted code or the Authority Having Jurisdiction. Confirm editions, fees, and procedures with the local building department before you apply or cover work.

Rules:

1. Visible on every AHJ card, every result pane, every empty “no desk selected” permit drawer.
2. Visible for `higher`, `mid`, and later `provisional` alike. A higher chip does not retire the disclaimer.
3. Not a toast. Not a first-run-only. Not replaced by “confirm city vs county” factory notes.
4. Today: exported, **unused in any UI component**. KIT-04 must import this constant. Do not duplicate a paraphrase in `src/`.

---

## Where the chip goes (later KIT-04)

Do not build this sitting. Contract for the implementer:

1. **Typeahead results** (core / extra / more): name, kind, state, portal URL, **confidence chip**.
2. **Card**: AHJ name + portal link + chip + `DISCLAIMER`. No fee table. Link is unverified.
3. **Drawer footer**: honesty strip (`factory_urls_verified: false`, rest-is-count, fees omitted).
4. **Featured empty-query hits** (`FEATURED_PLACE_IDS` in `catalog.ts`) are core ids → all **higher**. Still unverified URLs. Still disclaimer.
5. Rest rows, if KIT-06 ever returns them: chip **provisional** + label “research seed”. Never on first paint. Never from `searchPlaces` as it exists today (that function concatenates Rest).

Display copy (do not invent skill brands):

| Token | Visible label | Tone |
| --- | --- | --- |
| `higher` | Higher | Named core desk. Confirm with the department. |
| `mid` | Mid | Factory-named desk. Confirm portal and edition. |
| `provisional` | Provisional | Research seed. Confirm AHJ at the parcel. Later only. |

Do not use traffic-light “live / stale / dead”. Do not say “verified”.

---

## On-disk helpers vs this map

`src/lib/permit/places.ts` already exports layer + a **two-state** helper. Prep only — **do not patch this sitting**.

```ts
export function placeLayer(id: string): "core" | "extra" | "more" | "rest" | undefined {
  if (!BY_ID.has(id)) return undefined;
  if (CORE_IDS.has(id)) return "core";
  if (EXTRA_IDS.has(id)) return "extra";
  if (MORE_IDS.has(id)) return "more";
  return "rest";
}

export function portalConfidence(id: string): "higher" | "provisional" {
  return placeLayer(id) === "core" ? "higher" : "provisional";
}
```

| Item | On disk now | This contract |
| --- | --- | --- |
| `placeLayer` | four layers | keep; chip source of truth |
| `portalConfidence` | `core → higher`, else `provisional` | **wrong vs map**: extra/more must be `mid`, rest `provisional` |
| `searchPlaces` | `PLACES` includes Rest, slice 80 | KIT-04 must not call this until Rest is split out of the import |
| `PLACES` | `[...CORE, ...EXTRA, ...MORE, ...REST]` | KIT-04 breaks the Rest import before the globe bundles Rest |
| `DISCLAIMER` | exported, no UI import | always render |
| URL liveness | none | none. Flag stays false |

KIT-04 later change (not this file’s job): widen `portalConfidence` to `"higher" | "mid" | "provisional"` using the table above. Do not “fix” it by marking extra/more higher. Do not fetch.

Factory `p()` in `places-extra.ts` sets `portalUrl` and `departmentUrl` to the **same** `url`. Core objects often split them. That authorship gap is why extra/more are mid, not higher. Rest file comment: “Official-looking department landing pages” generated from Census gazetteers — provisional, later.

---

## E / I / A

| Item | E (exists on disk) | I (indexed / contracted) | A (actual for chips) |
| --- | --- | --- | --- |
| Count card | `permit-index.json` 1477 B | owner `permit-index`, wave 3 | same file; counts Int32 |
| core | `places.ts` `CORE_PLACES` (no `places-core.ts`) | 79 | **higher** chip. 79 desks |
| extra | `places-extra.ts` `p("id")` | 462 | **mid** chip. 462 desks |
| more | `places-more.ts` `p("id")` | 699 | **mid** chip. 699 desks |
| rest | `places-rest.ts` exists (~3.37 MB); **not opened into this report as a dump** | 14925 as a count; `rest_is_count_not_map: true` | **provisional**, later. Not a first-paint chip |
| sum | four catalog files | 16165 | 16165 unique ids; first-paint chips cover 1240 |
| `placeLayer` | exported four-way | KIT-04 search core/extra/more | layer → chip |
| `portalConfidence` | binary higher/provisional | drawer contract: core=higher, extra/more=mid, rest=provisional later | **mismatch**; later widen; not this seat |
| Factory URL liveness | URLs in catalog; integrity test is `https` shape only | `factory_urls_verified: false` | **not verified**. Chip ≠ live |
| Fees | none on the card | `fees_invented: false` | none. Chip ≠ fee |
| `DISCLAIMER` | `types.ts` const | “always visible” on KIT-04 card | unused in UI today; must ship with every chip |
| Rest pins | no pin payload on the card | rest is count | no Rest chips, pins, or ids in this doc |

E, I, and A agree on counts and on “URLs unverified.” E/I/A disagree on `portalConfidence`: evidence is two-state; contract is three-state. Actual KIT-04 must follow **this map**, not the current helper.

---

## Do-not

- Do not implement PermitAdapter, DeskDrawer, or chip chrome from this seat.
- Do not edit `src/lib/permit/places.ts` `portalConfidence` this sitting.
- Do not import `places-rest.ts` (or current `places.ts`, which pulls Rest) into a HUD or globe bundle.
- Do not list Rest ids, coordinates, or “official-looking” hostnames here.
- Do not fetch factory / core / Rest URLs to “upgrade” a chip.
- Do not mark any URL verified. `factory_urls_verified` stays **false**.
- Do not invent fees, sittings, or a live city login.
- Do not plot 16,165 / 14,925 pins.
- Do not iframe hivepermitdev as the chip UI.
- Do not hide `DISCLAIMER` when the chip is higher.
- Do not use skill brands, swarm names, or investigator legal names in chip copy.

---

## Later implement checklist (KIT-04, not now)

1. Split Rest out of `PLACES` / `searchPlaces` before any permit search ships.
2. Typeahead: core + extra + more only. Chip from `placeLayer`: higher / mid / mid.
3. Card: AHJ + unverified portal + chip + exact `DISCLAIMER`.
4. Footer honesty: factory URLs not verified; rest is a count; fees omitted.
5. Widen `portalConfidence` to three tokens. Tests: core → higher; extra → mid; more → mid; rest → provisional (and rest not returned).
6. KIT-06 may add provisional rest chips after search / state pack / county-scale camera — never on first paint.

Stop. Seat 16 does not start KIT-04.
