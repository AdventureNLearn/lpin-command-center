# SEAT 05 — PACKAGE SCHEMA

Target class: public-suite. Tree: this app. Corpus: `vendor/kept/_out/`. Bots PARK.
Seat writes this file only. Disk mined 2026-08-29. No network. Did not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, `package.json`, or live grok.me.

Sampled: `us`, `fj`, `cl`, `nl`, `th`, `tz` kit+permit pairs, plus one fill (`us-fill.json`). Cross-checked all 33 kit packages and 33 permit packages for keys, sizes, and members counts.

Claim under audit: HANDOFF `packages/{iso}.json` is the US stack (object counts and holes); `{iso}-permit.json` is permit counts and holes.
Tri-state claim: "packages are a stable loader contract".

## Verdict

**PASS** (dual contract, not one flattened JSON). Not BLOCK.

Kit envelope is 33/33 identical. Permit envelope is 33/33 identical. Shared keys `iso2`, `holes`, `retrieved`, `source` never go missing. Permit files are count cards (largest 2769 bytes). Members count 0 is empty, not an invented roster. No sitting-names arrays in any package file.

**Tri-state (TRUE / HOLD / FALSE):** **HOLD**

A loader that branches on filename (`{iso}.json` vs `{iso}-permit.json`) and types a two-member union is stable. A loader that treats kit and permit as one optional bag, or that hard-closes `objects` to the 12 US files, is not. Fill is a third kind (out of the union). See [Tri-state](#tri-state).

## Schema contract

Two kinds. Filename is the operational discriminant. Do not merge into one optional interface.

### Shared envelope (kit + permit)

Present on all 66 kit+permit files:

| Field | Type | Kit | Permit |
| --- | --- | --- | --- |
| `iso2` | string `^[a-z]{2}$` | yes | yes |
| `holes` | `{ object: string, reason: string }[]` | yes | yes |
| `retrieved` | string `YYYY-MM-DD` | yes (`2026-08-29`) | yes (`2026-08-29`) |
| `source` | string | `vendor/kept/kits/{iso}` | `src/lib/permit/` |

Hole item keys are exactly `object,reason` on every holes array (66 files). No extra hole fields.

### Kit package — `{iso}.json`

All 33:

```
iso2, kit_on_disk, objects, capital, holes, retrieved, source
```

- `kit_on_disk`: JSON boolean `true` (33/33).
- `objects`: map of filename → `{ state, count }`. Stat keys are exactly `state,count` (411/411 stats). `state` ∈ {`empty`,`seeded`,`filled`}. `count` is a number.
- `capital`: `{ name, lat, lon, kind }` with `kind` = `"capital"` (33/33).

`iso2` matches the filename (33/33).

### Permit package — `{iso}-permit.json`

All 33:

```
iso2, source, retrieved, lock_date, counts, factory_urls_verified, paths, holes, notes
```

- `lock_date`: `2026-08-18` (33/33). Catalog lock, same as WAVE-3 permit-index.
- `counts`: exactly `{ core, extra, more, rest }` (33/33). Integers. Not a place list.
- `factory_urls_verified`: JSON `false` (33/33). Must stay false.
- `paths`: four strings, same order: `places.ts`, `places-extra.ts`, `places-more.ts`, `places-rest.ts` under `src/lib/permit/`.
- `notes`: four strings. Always includes “Rest is a count, not a map” / “contents not copied” and “No pin list. No GeoJSON.” (wording varies; US uses “Rest is a count, not a map”).
- No `objects`. No `capital`. No `kit_on_disk`.

`iso2` matches `{iso}-permit.json` (33/33).

### Fill peek — `{iso}-fill.json` (not in the kit/permit union)

`us-fill.json` keys:

```
iso2, wave, hole_type, retrieved, source, read_only, did_not_rewrite, counts, log, summary, notes
```

No `objects`, no `capital`, no `holes`. `counts` is kit-tally fields (`sources_items`, `pledges_items`, …), not `{core,extra,more,rest}`. `hole_type` = `ingest-drop`. `summary.restored` = 0, `summary.left` = 19. All 12 fills on disk share this key set (seat 06 owns the 12-row table). A kit/permit loader must ignore `*-fill.json`.

### Proposed TypeScript (markdown only — no `src/` edit)

Yes: one union, no optional chaos. Discriminate on `kit_on_disk` vs `lock_date` (or on filename before parse). `objects` is a map, not a 12-key closed object, because five countries carry three extra files.

```ts
type Iso2 = string; // lowercase ISO 3166-1 alpha-2 as used in this corpus

interface Hole {
  object: string;
  reason: string;
}

interface PackageEnvelope {
  iso2: Iso2;
  retrieved: string; // YYYY-MM-DD
  source: string;
  holes: Hole[];
}

type KitObjectState = "empty" | "seeded" | "filled";

interface KitObjectStat {
  state: KitObjectState;
  count: number;
}

/** 12 US-stack files, always present. */
interface CoreKitObjects {
  "committees.json": KitObjectStat;
  "ethics.json": KitObjectStat;
  "gap.json": KitObjectStat;
  "institutional.json": KitObjectStat;
  "issues.json": KitObjectStat;
  "members.json": KitObjectStat;
  "meta.json": KitObjectStat;
  "money.json": KitObjectStat;
  "parties.json": KitObjectStat;
  "pledges.json": KitObjectStat;
  "sources.json": KitObjectStat;
  "votes.json": KitObjectStat;
}

/** cl, fj, nl, th, tz only. */
interface MapSeedKitObjects extends CoreKitObjects {
  "filers.json": KitObjectStat;
  "lobby.json": KitObjectStat;
  "orgs.json": KitObjectStat;
}

interface CapitalPoint {
  name: string;
  lat: number;
  lon: number;
  kind: "capital";
}

interface KitPackage extends PackageEnvelope {
  kit_on_disk: true;
  objects: CoreKitObjects | MapSeedKitObjects;
  capital: CapitalPoint;
}

interface PermitCounts {
  core: number;
  extra: number;
  more: number;
  rest: number;
}

interface PermitPackage extends PackageEnvelope {
  lock_date: string; // 2026-08-18
  counts: PermitCounts;
  factory_urls_verified: false;
  paths: string[];
  notes: string[];
}

type CountryPackage = KitPackage | PermitPackage;

function isKitPackage(p: CountryPackage): p is KitPackage {
  return "kit_on_disk" in p;
}

function isPermitPackage(p: CountryPackage): p is PermitPackage {
  return "lock_date" in p && "counts" in p && !("kit_on_disk" in p);
}
```

A single flattened interface with optional `objects?`, `capital?`, `counts?`, `lock_date?`, `kit_on_disk?` is the optional chaos this seat rejects. Fill stays a separate type (`FillPackage`); do not bolt it onto `CountryPackage`.

Loader rule: `objects` as `Record<string, KitObjectStat>` is also legal and avoids the 12-vs-15 split. Either the union-of-maps above or `Record<string, KitObjectStat>` — not `Partial<CoreKitObjects>`.

## Drift table

Sampled six. Sweep of all 33 confirmed the same two kit object-key sets.

### Envelope presence (must-verify keys)

| Key | us kit | fj kit | cl kit | nl kit | th kit | tz kit | us permit | fj/cl/nl/th/tz permit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `iso2` | us | fj | cl | nl | th | tz | us | matches file |
| `objects` | 12 files | 15 | 15 | 15 | 15 | 15 | **absent** | **absent** |
| `holes` | 7 | 15 | 15 | 15 | 15 | 15 | 2 | 1 |
| `capital` | yes | yes | yes | yes | yes | yes | **absent** | **absent** |
| `retrieved` | 2026-08-29 | same | same | same | same | same | same | same |
| `source` | `kits/us` | `kits/fj` | `kits/cl` | `kits/nl` | `kits/th` | `kits/tz` | `src/lib/permit/` | `src/lib/permit/` |
| `counts` | **absent** | **absent** | **absent** | **absent** | **absent** | **absent** | 79/462/680/14855 | **0/0/0/0** |
| `kit_on_disk` | true | true | true | true | true | true | **absent** | **absent** |
| `lock_date` | **absent** | **absent** | **absent** | **absent** | **absent** | **absent** | 2026-08-18 | 2026-08-18 |

**EVIDENCE:** common keys across *both* kinds are only `iso2`, `holes`, `retrieved`, `source`. `objects` and `capital` are kit-only. `counts` is permit-only (and fill, different shape).

### Kit `objects` key-set drift (all 33)

| Set | n | iso2 | Extra files |
| --- | ---: | --- | --- |
| US stack (12) | 28 | ar au br ca cn de eg es fr gb gh id il in it jp ke kr mx ng nz ph pl tr tw ua us za | — |
| Map-seed (15) | 5 | **cl fj nl th tz** | `filers.json`, `lobby.json`, `orgs.json` |

HANDOFF says kit format is the US stack. Disk: five later packages keep the `_template` extra files (counts 0). **INFERENCE:** those five are map-only seeds, not a second harvest. Loader must not require exactly 12 keys and must not invent rows for the extras.

### Sample object counts (kit)

| object | us | fj | cl | nl | th | tz |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| members.json | filled **437** | empty **0** | empty **0** | empty **0** | empty **0** | empty **0** |
| meta.json | filled 21 | filled 22 | filled 20 | filled 20 | filled **12** | filled 20 |
| sources.json | filled 1238 | seeded 0 | empty 0 | empty 0 | empty 0 | seeded 0 |
| votes.json | filled 849 | empty 0 | empty 0 | empty 0 | empty 0 | empty 0 |
| pledges.json | filled 297 | empty 0 | empty 0 | empty 0 | empty 0 | empty 0 |
| filers/lobby/orgs | **absent** | seeded 0 | seeded 0 | seeded 0 | seeded 0 | seeded 0 |

State enum on all kits: filled 268, seeded 77, empty 66. No other state strings.

Value (not schema) capital notes: us name is `Washington,  D.C.` (double space). nl `Amsterdam`. tz `Dar es Salaam`. Schema is still `{name,lat,lon,kind:"capital"}`.

### Holes-array policy drift

| | US-stack kits | Map-seed kits (cl fj nl th tz) | Non-US permits | us-permit |
| --- | --- | --- | --- | --- |
| holes listed | incomplete/empty objects only | **every** object, including filled meta | 1 (no country AHJs) | 2 (territory omit from US-only) |

us kit holes = 7 of 12 objects (no members hole: members is filled 437). Map-seed kits list 15/15, including `members.json` `items 0; sitting 0; no invented roster` and filled `meta.json` `incomplete true`.

### `_index.json` `holes` vs array lengths

`_index.json` `rows[].holes` is the audit **honest_holes** integer, not `kit.holes.length + permit.holes.length`.

| iso2 | index.holes | kit.holes.len | permit.holes.len | sum |
| --- | ---: | ---: | ---: | ---: |
| us | 9 | 7 | 2 | **9** (match) |
| gb, ca | 10, 9 | 9, 8 | 1, 1 | match |
| **cl fj nl th tz** | **18** | 15 | 1 | **16** (off by 2) |
| ar, au | 11 | 8 | 1 | 9 (off by 2) |
| za | 12 | 9 | 1 | 10 (off by 2) |

**INFERENCE:** a loader that displays `holes.length` from the package file will not match the inventory row. Treat index `holes` as audit metadata. **ASSUMPTION:** the extra honest_holes on map-seed sits are the collision note + map-only-seed note in AUDIT-LOG, not extra array items.

## Members.json count 0 — no invented rosters

Package files contain **no** JSON keys `names`, `roster`, `sitting`, `pins`, `geojson`. Kit-package arrays are `holes` only. Permit arrays are `paths`, `holes`, `notes`. Fill arrays are `read_only`, `did_not_rewrite`, `log`, `notes`. No sitting-names arrays anywhere in `packages/`.

Countries with `objects["members.json"].count === 0` (exactly five, all in the sample):

| iso2 | package state | package count | hole reason | kit `members.json` peek (items only) |
| --- | --- | ---: | --- | --- |
| cl | empty | 0 | `items 0; sitting 0; no invented roster` | `{ iso2:"cl", items:[] }` |
| fj | empty | 0 | same | `{ iso2:"fj", items:[], incomplete:true }` |
| nl | empty | 0 | same | `{ iso2:"nl", items:[] }` |
| th | empty | 0 | same | `{ iso2:"xx", items:[] }` template leftover iso |
| tz | empty | 0 | same | `{ iso2:"tz", items:[] }` |

**EVIDENCE:** count 0 means empty `items`, not a padded roster. Kit peek was `items` length + `iso2` field only; no names copied here.

th kit `members.json` still has template `iso2: "xx"` (`vendor/kept/kits/_template/members.json` is the same shape). Package `th.json` `iso2` is `"th"`. That is a **kit-file hole**, not a package-schema fail, and not an invented roster. Do not backfill names.

us members count 437 is a count on the package, not a names array. Fill log strings may mention existing kit members in ingest-drop hole text; that is not a roster array (seat 06). This seat does not dump those strings.

## Permit files — counts only, collisions, sizes

### Counts

| iso2 | core | extra | more | rest | nonzero |
| --- | ---: | ---: | ---: | ---: | --- |
| **us** | 79 | 462 | 680 | **14855** | yes |
| other 32 (incl. fj cl nl th tz) | 0 | 0 | 0 | 0 | **no** |

US-only rest 14855 = permit-index rest 14925 minus 70 PR rows (us-permit hole). More 680 = index more 699 minus 19 territory rows (second us-permit hole). **EVIDENCE** that country permits are filtered counts, not copies of Rest.

Non-US `counts` all zero is the honest country-native hole: “Country-native catalogs stay zero.” Zero is a count, not a missing file.

### ISO collisions (notes on disk, not counted as that country)

| iso2 | Collision written in permit `holes[0].reason` / `notes[0]` | Counted as this iso2 |
| --- | --- | --- |
| **fj** | **FJ ≠ FL.** Fiji, not Florida. FL Florida AHJs excluded (notes list core 12 + extra 32 + more 56 + rest 238 = 338). | 0 |
| **cl** | **CL ≠ CO.** Chile, not Colorado. CO Colorado AHJs excluded (core 1 + extra 11 + more 14 + rest 115 = 141). | 0 |
| nl | NL is Netherlands, not a US state, not Canadian NL. Holland/Nederland US lookalikes excluded (rest 11). | 0 |
| th | TH is Thailand, not TX or TN. Texas + Tennessee excluded (1223 + 280). | 0 |
| tz | TZ is Tanzania, not Texas. Same TX/TN exclusion counts as th. | 0 |
| us | no collision note (this *is* the US catalog; US-only = 50 states + DC) | 79/462/680/14855 |

Excluded id tokens live in `notes[0]` as a collision log, **not** as `counts` and **not** as a pin/GeoJSON array. This report does not dump those id lists.

au-permit (out of sample, same contract): “AU is Australia, not a US state, not Austria (AT).” Same four-note shape.

### File sizes — Rest-dump flag (>50 KB)

None. All 33 permit files are under 3 KB.

| file | bytes | vs 50 KB |
| --- | ---: | --- |
| th-permit.json (largest) | 2769 | ok |
| tz-permit.json | 2761 | ok |
| fj-permit.json | 2602 | ok |
| cl-permit.json | 1425 | ok |
| nl-permit.json | 1248 | ok |
| us-permit.json | 920 | ok |
| tw-permit.json (smallest) | 760 | ok |
| **any permit >50 KB** | **0** | — |

A Rest pin dump would resemble `src/lib/permit/places-rest.ts` (~3.37 MB), not a 1–3 KB count card. th/tz/fj notes are long because they list *excluded* US ids; still count-not-map, still << 50 KB.

Permit top-level arrays: `paths` n=4, `holes` n=1 (us n=2), `notes` n=4. No pin array. No GeoJSON. No coordinates.

## Fill peek (`us-fill.json`)

9870 bytes. WAVE-FILL-US. `hole_type`: ingest-drop. `source`: `vendor/kept/kits/us`. `retrieved`: 2026-08-29.

Not a kit package and not a permit package:

- no `objects` / `capital` / `holes`
- `counts` keys are kit URL/tally fields, not permit layers
- `log` n=19, every sampled action is `left`; `summary.restored` = 0
- `did_not_rewrite` includes `vendor/kept/kits/us`, `votes.json`, `members.json`, `src/`, `packages/us.json`, `packages/us-permit.json`

**EVIDENCE:** fill is an ingest-drop ledger over an existing kit. It is not a second harvest and not a loader payload for LEG/AHJ. One log row has an extra `also` key (string array of leftover index URLs). Still no names/roster array.

## E / I / A

| Item | E (exists on disk) | I (inference) | A (assumption / actual count) |
| --- | --- | --- | --- |
| Kit envelope | 33/33 keys `iso2,kit_on_disk,objects,capital,holes,retrieved,source` | US stack is the kit *envelope*, not the objects map | Envelope is the loader constant |
| Permit envelope | 33/33 keys `iso2,source,retrieved,lock_date,counts,factory_urls_verified,paths,holes,notes` | Count card, not a map | Independently: all counts are integers; rest never an array |
| Shared keys | `iso2,holes,retrieved,source` on 66 files | Kit ≠ permit; do not optional-merge | Dual union is the type |
| objects map | 28 kits × 12 files; 5 kits × 15 files; stats always `{state,count}` | Map-seed extras are `_template` leftovers at count 0 | Do not close the 12-key object; use map or 12\|15 union |
| members count 0 | cl fj nl th tz count 0, hole text forbids invented roster; package has no names array | Empty is honest | Kit `items:[]` peeked; th kit iso2 `xx` is template, not a roster |
| Permit zeros | 32 countries 0/0/0/0; us 79/462/680/14855 | Non-US AHJs were not invented from US catalog | Collision notes (FJ≠FL, CL≠CO, …) explain the zeros |
| Rest dump | permit max 2769 B; 0 files >50 KB | Rest is count-not-map | `places-rest.ts` is the 3.37 MB catalog; packages do not copy it |
| Fill | us-fill 9870 B, restored 0, no objects/capital | Third kind | Out of `CountryPackage` |
| Index holes int | cl/fj/nl/th/tz index 18 vs array sum 16 | honest_holes ≠ holes.length | Loader should not equate them |
| Factory URLs | `factory_urls_verified: false` 33/33 | Unverified | Stay false; no network this seat |
| Capital points | 33/33 `{name,lat,lon,kind:"capital"}` | Kit packages can place a capital without a roster | Value spelling (DC double-space, NL/TZ city choice) is data, not schema |

E, I, and A agree: two stable envelopes, nested objects-map drift that is enumerable, permit zeros that are honest, no Rest dump, no invented sitting-names arrays.

## Tri-state

**Claim:** packages are a stable loader contract.

**Tri-state: HOLD**

Reasons for not TRUE:

1. Kit and permit are two JSON shapes. Shared keys are four. A single optional interface is chaos.
2. `objects` is not a closed 12-key US stack. Five iso2 add `filers.json` / `lobby.json` / `orgs.json`.
3. `{iso}-fill.json` is a third shape. Filename suffix is part of the contract.
4. `_index.json` `holes` is not `holes.length`.

Reasons for not FALSE:

1. Per-kind top-level keys never drifted (33 kit, 33 permit, 12 fill).
2. Hole item `{object,reason}`, kit stat `{state,count}`, capital `{name,lat,lon,kind}`, permit `counts` `{core,extra,more,rest}` are closed.
3. `iso2` always matches the filename.
4. Permit files are count cards (all < 3 KB). Rest is an integer. Collision notes (FJ≠FL, CL≠CO) keep US AHJs off the wrong iso2.
5. members count 0 is empty `items`, with an explicit no-invented-roster hole. No sitting-names arrays in packages.
6. A TypeScript discriminated union (above) types both kit and permit without optionals.

Loader that keeps HOLD from becoming FALSE: parse by suffix; type `CountryPackage = KitPackage | PermitPackage`; treat `objects` as a map; do not import Rest; do not mint members when count is 0; do not treat fill as a kit.

## Honest holes (not a fail)

- Country-native permit catalogs are zero (32/33). US catalog is not Chile/Fiji/Netherlands/Thailand/Tanzania.
- Map-seed kits (cl fj nl th tz) have members 0. Incomplete beats fake-complete.
- th kit `members.json` iso2 is still `xx` (template). Package iso2 is `th`.
- Index honest_holes can exceed package `holes.length`.
- Fill exists for 12/33 kits only (seat 04/06).
- Factory URLs unverified. Fees omitted. Rest is not a map.
- Capital *values* (US double-space; NL Amsterdam; TZ Dar es Salaam) are not schema keys.

## Method (disk only)

- Read `vendor/kept/_out/HANDOFF.md`, `packages/_index.json`, sampled kit+permit JSON in full, `us-fill.json` in full.
- PowerShell: `Get-ChildItem` lengths; `ConvertFrom-Json` key unions; members counts; permit `counts`; hole key sets; array property names (values not dumped).
- Grep `packages/` for `"names"\s*:`, `"roster"\s*:`, `"sitting"\s*:`, `"pins"\s*:`. Zero key hits.
- Peeked kit `members.json` for the five count-0 iso2: `items` length and `iso2` field only. No roster dump.
- Did not import or copy `places-rest.ts`. Did not dump excluded AHJ id lists. Did not npm install, git push, or edit `src/`.

No invented sitting names. No 16k pin dump. No src write.
