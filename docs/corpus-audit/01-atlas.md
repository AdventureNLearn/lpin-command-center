# SEAT 01 — ATLAS

Target class: public-suite. Tree: this app. Corpus: `vendor/kept/_out/`. Bots PARK.
Seat writes this file only. Disk mined 2026-08-29. No network. Did not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, `package.json`, or live grok.me.

Claim under audit: HANDOFF `atlas.json — country/place atlas. WAVE-1. 38842 bytes.`
Tri-state claim: "atlas is a usable country index for a dashboard".

## Verdict

**PASS**

Atlas parses, row counts are internally consistent, `kit_on_disk: true` iso2 set equals on-disk kit directories (excluding `_template`), no duplicate iso2, no empty names, WAVE-1 byte claim matches. Not BLOCK.

**Tri-state (+1 / 0 / −1):** **+1** — atlas is a usable country index for a dashboard.

Usable here means: unique `iso2` keys, non-empty names, boolean UN and kit flags, stable 6-field schema, joinable to `vendor/kept/kits/{iso2}/`. It is **not** a geo layer (no lat/lon) and **not** a full ISO 3166-1 inventory. Those are holes, not fails.

## Numbers

| Item | Value | Label |
| --- | ---: | --- |
| path | `vendor/kept/_out/atlas.json` | EVIDENCE |
| bytes (`Get-Item.Length` = `ReadAllBytes.Length`) | **38842** | EVIDENCE |
| UTF-8 BOM | none (first bytes `5B 0A 20` = `[\n `) | EVIDENCE |
| line endings | LF only, no CR | EVIDENCE |
| JSON shape | array of objects, starts `[` ends `]` | EVIDENCE |
| lines | 1570 | EVIDENCE |
| rows | **196** | EVIDENCE |
| unique `iso2` | **196** | EVIDENCE |
| `kit_on_disk` true | **33** | EVIDENCE |
| `kit_on_disk` false | **163** | EVIDENCE |
| `kit_on_disk` other/null | **0** | EVIDENCE |
| `un_member` true | **193** | EVIDENCE |
| `un_member` false | **3** | EVIDENCE |
| `un_member` other/null | **0** | EVIDENCE |
| duplicate `iso2` groups | **0** | EVIDENCE |
| empty / whitespace `name` | **0** | EVIDENCE |
| empty `iso2` | **0** | EVIDENCE |
| `iso2` not `^[a-z]{2}$` | **0** | EVIDENCE |
| kit dirs under `vendor/kept/kits/` (all) | 34 | EVIDENCE |
| kit dirs excluding `_template` | **33** | EVIDENCE |
| atlas-true vs disk-dir set mismatch | **0** | EVIDENCE |
| iso2 sort | ascending `ad` … `zw` | EVIDENCE |

33 + 163 = 196. 193 + 3 = 196. 196 unique = 196 rows.

### `un_member: false` (3)

| iso2 | name | kit_on_disk | source_url |
| --- | --- | --- | --- |
| ps | State of Palestine | false | `https://www.un.org/en/about-us/non-member-states` |
| tw | Taiwan | **true** | `https://www.iso.org/obp/ui/#iso:code:3166:TW` |
| va | Holy See | false | `https://www.un.org/en/about-us/non-member-states` |

**INFERENCE:** 193 `un_member: true` rows are the UN membership set as of retrieve date; ps/va are UN observer non-members; tw is ISO 3166 TW, not a UN member. **ASSUMPTION:** live UN/ISO pages were not fetched this seat (no network). Membership counts were not re-verified off-disk.

### `source_url` split

| source_url | n | `un_member` |
| --- | ---: | --- |
| `https://www.un.org/en/about-us/member-states` | 193 | true |
| `https://www.un.org/en/about-us/non-member-states` | 2 | false (ps, va) |
| `https://www.iso.org/obp/ui/#iso:code:3166:TW` | 1 | false (tw) |

All 196 rows `retrieved`: `2026-08-29`.

### UTF-8 names (3 non-ASCII)

| iso2 | name | extra UTF-8 bytes |
| --- | --- | ---: |
| ci | Côte D'Ivoire | 1 (`ô` C3 B4) |
| la | Lao People’s Democratic Republic | 2 (U+2019 E2 80 99) |
| tr | Türkiye | 1 (`ü` C3 BC) |

Byte/char delta 38842 − 38838 = 4, matches those extra bytes. File is UTF-8 without BOM.

## WAVE-1 size claim

HANDOFF: `atlas.json — country/place atlas. WAVE-1. 38842 bytes.`

FEED-AUDIT.md (read, not edited): `atlas.json on disk 38842 bytes mtime 2026-08-29T10:34:44-04:00`.

This seat: `Get-Item` Length **38842**, `ReadAllBytes` Length **38842**, LastWriteTime `2026-08-29T10:34:44.6973352-04:00`.

**EVIDENCE: CONFIRM.** Byte claim matches. mtime matches FEED-AUDIT to the second.

## Kit directories vs `kit_on_disk: true`

Disk dirs at `vendor/kept/kits/` excluding `_template` (Force listing):

`ar, au, br, ca, cl, cn, de, eg, es, fj, fr, gb, gh, id, il, in, it, jp, ke, kr, mx, ng, nl, nz, ph, pl, th, tr, tw, tz, ua, us, za`

Atlas `kit_on_disk: true` iso2 (sorted): **identical set**. Count 33 = 33.

| Diff | Count | isos |
| --- | ---: | --- |
| in atlas true, not a kit dir | **0** | — |
| kit dir, not atlas true | **0** | — |
| `_template` in atlas | **0** | correctly excluded |

**EVIDENCE:** sets equal.

Cross-check (not a fail criterion for this seat): `packages/_index.json` `kit_on_disk` array is the same 33 iso2, `kit_on_disk_count: 33`. **EVIDENCE** of internal corpus agreement.

Every one of the 33 kit dirs has `meta.json`. That is kit-presence, not atlas schema.

## Schema

Every row has exactly these six keys. Key union across 196 rows is those six. Each key present 196/196. No extra keys.

| Field | Type on disk | Missing | Empty | Notes |
| --- | --- | ---: | ---: | --- |
| `iso2` | string | 0 | 0 | lowercase ISO 3166-1 alpha-2 |
| `name` | string | 0 | 0 | min length 4, max 52 |
| `un_member` | boolean | 0 | n/a | not string `"true"` |
| `kit_on_disk` | boolean | 0 | n/a | not string `"true"` |
| `source_url` | string | 0 | 0 | three URL values, all https |
| `retrieved` | string | 0 | 0 | all `2026-08-29` |

Required fields for a country index: **present on all rows.** True-row schema equals false-row schema. Only boolean `kit_on_disk` (and for tw/ps/va, `un_member` + `source_url`) differ.

### One `kit_on_disk: true` row (first true in file order: ar)

```json
{
  "iso2": "ar",
  "name": "Argentina",
  "un_member": true,
  "kit_on_disk": true,
  "source_url": "https://www.un.org/en/about-us/member-states",
  "retrieved": "2026-08-29"
}
```

File lines 59–65. Second true example `us` (lines 1467–1472): name `United States of America`, same six keys, `kit_on_disk: true`.

### One `kit_on_disk: false` row (first row in file: ad)

```json
{
  "iso2": "ad",
  "name": "Andorra",
  "un_member": true,
  "kit_on_disk": false,
  "source_url": "https://www.un.org/en/about-us/member-states",
  "retrieved": "2026-08-29"
}
```

File lines 3–8. Last row `zw` Zimbabwe is also `kit_on_disk: false`, same keys.

### Cross cell: kit true and UN false

Exactly one: `tw` Taiwan. Schema still the six keys; `source_url` is the ISO OBP permalink, not the UN member-states URL.

## Mismatches

**None on the fail criteria.**

| Check | Result |
| --- | --- |
| duplicate iso2 | none |
| empty name | none |
| kit_on_disk true vs kit dirs (excl `_template`) | equal 33/33 |
| WAVE-1 38842 bytes | match |
| schema true vs false | same 6 keys |
| non-boolean flags | none |

Not a mismatch, recorded as dirt (see holes): three leftover **files** at `vendor/kept/kits/` root (`ca.json` 1002, `kr.json` 1247, `us.json` 788). These are not directories, so they are outside the iso2-dir comparison. Atlas does not list them. Parallel dirs `ca/`, `kr/`, `us/` exist and match atlas true.

## Honest holes

1. **No coordinates, region, capital, population, or flag.** A globe/map dashboard still needs `capitals.json` (WAVE-2) or another geo file. Atlas is an index, not a feature collection. **EVIDENCE** (key union has no geo fields).
2. **Not a full ISO 3166-1 list.** 196 rows = 193 UN members + ps + va + tw. Missing common dashboard codes such as `hk`, `mo`, `pr`, `xk`, `eh`, `gu`, `mp`, and other territories. **INFERENCE** from the iso2 set on disk; live ISO list not fetched.
3. **163/196 countries have no kit** (`kit_on_disk: false`). Dashboard coverage of kits is 33 countries. Flag is accurate; coverage is sparse. **EVIDENCE**.
4. **Leftover kit-root JSON files** `ca.json`, `kr.json`, `us.json` sit beside the directories. Atlas `kit_on_disk` does not describe files, only the dir iso2 set. **EVIDENCE**.
5. **Kit-dir tmp dirt** (not an atlas join miss): `de/gap.json.tmp`, `es/*.apply-tmp`, `id/*.tmp`. Atlas still points at those iso2 correctly.
6. **Source URLs not re-fetched.** This seat did not confirm UN member-states HTML still lists 193 or that names match current UN short names. Côte D'Ivoire / Türkiye / apostrophe forms are as stored. **ASSUMPTION:** retrieve-date snapshot is the intended truth.
7. **This app's `src/` does not reference `atlas.json` by name** (workspace search of ts/tsx/js/mjs). **EVIDENCE** of no in-tree import. Usable *as an index file* ≠ already wired into the live dashboard. Wiring is out of this seat.
8. **WAVE-1 holes from FEED-AUDIT** (`W1-W3 holes not filled`) were not expanded in `_out/` this sit. This seat did not open a new kit.

## Tri-state: "atlas is a usable country index for a dashboard"

| State | Meaning |
| --- | --- |
| +1 | unique iso2+name index with accurate kit/UN flags, dashboard-joinable |
| 0 | parseable but missing join keys or contradictory kit flags |
| −1 | broken JSON, dups, empty names, or kit_on_disk lies about disk |

**Score: +1**

**ASSUMPTION:** "country index" means iso2 → name + flags, not a map layer and not ISO-territory completeness.

A dashboard can: list 196 countries, filter UN members, filter the 33 kit countries, join `vendor/kept/kits/{iso2}/` and `packages/{iso2}.json`. It cannot: plot capitals from this file alone, or show HK/XK/EH as rows.

## Evidence log (tools)

- `Get-Item` / `[IO.File]::ReadAllBytes` on `vendor/kept/_out/atlas.json`
- UTF-8 `ConvertFrom-Json` row/key/dup/empty/type counts
- `Get-ChildItem -Directory -Force` and `-File -Force` on `vendor/kept/kits/`
- HashSet iso2 compare atlas-true vs dirs excl `_template`
- `read_file` / `grep` on atlas.json, HANDOFF.md, FEED-AUDIT.md, `packages/_index.json`
- Did not npm install, git push, edit kits, edit `_out`, or hit the network
