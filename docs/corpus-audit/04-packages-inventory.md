# SEAT 04 — Packages inventory

Target class: public-suite. Tree: this app. Corpus: `vendor/kept/_out/`. Bots PARK.
Seat writes this file only. Disk mined 2026-08-29. No network. `_out/` not edited.

Claim under audit: HANDOFF `packages: 33/33 PASS, remaining 0`.
Tri-state claim: "package inventory is complete for the 33 on-disk kits".

## Verdict

**PASS**

HANDOFF 33/33 PASS remaining 0 is **confirmed**. Not BLOCK.

**Tri-state:** TRUE — package inventory is complete for the 33 on-disk kits.

Missing `{iso}-fill.json` files (ng, tr, mx, and 18 other on-disk kits) are **holes, not fails**. Fill is not a kit-pair completeness criterion.

## Counts on disk

Path: `vendor/kept/_out/packages/`

| Class | Pattern | Count |
| --- | --- | ---: |
| kit package | `{iso}.json` | 33 |
| permit package | `{iso}-permit.json` | 33 |
| fill record | `{iso}-fill.json` | 12 |
| index | `_index.json` | 1 |
| unexpected extra | other names | 0 |
| **total files** | (Force listing, no hidden extras) | **79** |

Identity: `33 + 33 + 12 + 1 = 79`. No uppercase names. No case-fold duplicate basenames. No duplicate filenames.

## `_index.json` parse

| Field | Value |
| --- | --- |
| path | `vendor/kept/_out/packages/_index.json` |
| size | 11074 bytes (matches HANDOFF) |
| `generated_at` | `2026-08-29T22:22:28.283Z` |
| `wave` | `PACKAGE-TZ` |
| `kit_on_disk_count` | **33** |
| `kit_on_disk` length | 33 |
| `rows` length | 33 |
| `remaining` | `[]` |
| `remaining_count` | **0** |
| `duplicates` | `[]` |
| `extras` length | 12 (all fill files; expected) |
| `status_vs_disk` | `[]` |
| `mtime_drift` | `[]` |
| `last_audit` | wave `PACKAGE-TZ`, verdict **PASS**, iso2 `tz`, honest_holes 18 |
| `last_fill_audit` | wave `FILL-PL`, verdict PASS, iso2 `pl`, honest_holes 21 |

`kit_on_disk_count` equals `kit_on_disk` length, equals `rows` length, equals disk `{iso}.json` count, equals disk `{iso}-permit.json` count.

`kit_on_disk` iso2 set equals `rows[].iso2` set equals disk kit iso2 set. No index-only iso. No disk-only iso.

Every row: `kit_package: true`, `permit_package: true`, `audit: "PASS"`. No non-PASS row.

Duplicate iso2 in `kit_on_disk`: none. Duplicate iso2 in `rows`: none.

## Pairing

Every `kit_on_disk` iso has both `{iso}.json` and `{iso}-permit.json` on disk (`Test-Path` per iso). Missing kit: none. Missing permit: none.

## Inventory table (33 on-disk kits)

Fill column is presence of `{iso}-fill.json`. Fill absence is a hole, not a fail.

| iso2 | `{iso}.json` | `{iso}-permit.json` | `{iso}-fill.json` | row.audit | kit holes | fill |
| --- | --- | --- | --- | --- | ---: | --- |
| ar | yes (1854) | yes (1047) | **no** | PASS | 11 | hole |
| au | yes (1879) | yes (888) | **no** | PASS | 11 | hole |
| br | yes (1761) | yes (841) | yes (17049) | PASS | 8 | present |
| ca | yes (1850) | yes (889) | yes (10931) | PASS | 9 | present |
| cl | yes (2605) | yes (1425) | **no** | PASS | 18 | hole |
| cn | yes (2027) | yes (783) | yes (18083) | PASS | 11 | present |
| de | yes (1940) | yes (825) | yes (12579) | PASS | 10 | present |
| eg | yes (1870) | yes (852) | **no** | PASS | 11 | hole |
| es | yes (1974) | yes (894) | **no** | PASS | 12 | hole |
| fj | yes (2591) | yes (2602) | **no** | PASS | 18 | hole |
| fr | yes (1839) | yes (824) | yes (15685) | PASS | 9 | present |
| gb | yes (1925) | yes (819) | yes (14191) | PASS | 10 | present |
| gh | yes (1869) | yes (1110) | **no** | PASS | 11 | hole |
| id | yes (2140) | yes (992) | **no** | PASS | 14 | hole |
| il | yes (1930) | yes (933) | **no** | PASS | 11 | hole |
| in | yes (1956) | yes (934) | **no** | PASS | 12 | hole |
| it | yes (1899) | yes (804) | yes (15190) | PASS | 9 | present |
| jp | yes (1872) | yes (871) | **no** | PASS | 11 | hole |
| ke | yes (1972) | yes (970) | **no** | PASS | 12 | hole |
| kr | yes (1822) | yes (810) | yes (10603) | PASS | 9 | present |
| mx | yes (1986) | yes (985) | **no** | PASS | 12 | hole (HANDOFF-named) |
| ng | yes (1960) | yes (831) | **no** | PASS | 12 | hole (HANDOFF-named) |
| nl | yes (2597) | yes (1248) | **no** | PASS | 18 | hole |
| nz | yes (1867) | yes (1228) | **no** | PASS | 11 | hole |
| ph | yes (2023) | yes (1036) | **no** | PASS | 13 | hole |
| pl | yes (1754) | yes (808) | yes (19335) | PASS | 10 | present |
| th | yes (2597) | yes (2769) | **no** | PASS | 18 | hole |
| tr | yes (2024) | yes (882) | **no** | PASS | 12 | hole (HANDOFF-named) |
| tw | yes (1913) | yes (760) | yes (19356) | PASS | 11 | present |
| tz | yes (2603) | yes (2761) | **no** | PASS | 18 | hole |
| ua | yes (1934) | yes (793) | yes (13622) | PASS | 10 | present |
| us | yes (1789) | yes (920) | yes (9870) | PASS | 9 | present |
| za | yes (1992) | yes (930) | **no** | PASS | 12 | hole |

Sizes in bytes. Kit holes from `_index.json` `rows[].holes`.

## Fill files (12)

HANDOFF claim: `us ca kr gb de br ua fr cn it tw pl`. Disk match: exact, 12, none missing, none extra.

Index `extras[]` lists the same 12 as `kind: "fill file (not kit_package)"`, all `audit: "PASS"`. Expected extras, not unexpected files.

| iso2 | file | extra.holes |
| --- | --- | ---: |
| br | br-fill.json | 19 |
| ca | ca-fill.json | 21 |
| cn | cn-fill.json | 19 |
| de | de-fill.json | 19 |
| fr | fr-fill.json | 19 |
| gb | gb-fill.json | 21 |
| it | it-fill.json | 19 |
| kr | kr-fill.json | 16 |
| pl | pl-fill.json | 21 |
| tw | tw-fill.json | 21 |
| ua | ua-fill.json | 17 |
| us | us-fill.json | 19 |

### Fill holes (not fails)

21 of 33 on-disk kits have no `{iso}-fill.json`:

`ar au cl eg es fj gh id il in jp ke mx ng nl nz ph th tr tz za`

HANDOFF: "No ng/tr/mx fill." Confirmed absent. Those three plus the other 18 listed above are ingest-drop holes. They do not break 33/33 kit+permit completeness.

## Duplicates and unexpected extras

| Check | Result |
| --- | --- |
| Duplicate `{iso}.json` | none |
| Duplicate `{iso}-permit.json` | none |
| Duplicate `{iso}-fill.json` | none |
| Duplicate iso2 in `kit_on_disk` / `rows` | none |
| Unexpected extra files | **none** |
| Expected extras | `_index.json` + 12 fill files |
| Index `duplicates` | empty (matches disk) |
| Index `extras` | 12 fills only (matches disk) |

## HANDOFF vs disk

| HANDOFF claim | Disk / index | Result |
| --- | --- | --- |
| packages 33/33 PASS | 33 kit + 33 permit, every row PASS | CONFIRM |
| remaining 0 | `remaining: []`, `remaining_count: 0` | CONFIRM |
| `_index.json` rebuilt from disk, 33 kit_on_disk rows | 33/33/33 match | CONFIRM |
| last_audit PACKAGE-TZ PASS | `last_audit.wave=PACKAGE-TZ`, `verdict=PASS`, `iso2=tz` | CONFIRM |
| 33 `{iso}.json` | 33 | CONFIRM |
| 33 `{iso}-permit.json` | 33 | CONFIRM |
| 12 fill: us ca kr gb de br ua fr cn it tw pl | exact set on disk | CONFIRM |
| No ng/tr/mx fill | those three absent | CONFIRM (hole) |

## E / I / A

**E (evidence)**

- PowerShell `Get-ChildItem -Force` on `vendor/kept/_out/packages/`: 79 files.
- Classified counts: 33 `{iso}.json`, 33 `{iso}-permit.json`, 12 `{iso}-fill.json`, 1 `_index.json`, 0 other.
- Parsed `_index.json`: `kit_on_disk_count=33`, `rows=33`, `remaining=[]`, `remaining_count=0`, `last_audit.verdict=PASS`, `last_audit.wave=PACKAGE-TZ`.
- Per-iso `Test-Path` for `{iso}.json` and `{iso}-permit.json` over all 33 `kit_on_disk` values: all present.
- Fill set on disk equals HANDOFF list of 12. `ng-fill.json` / `tr-fill.json` / `mx-fill.json` do not exist.
- HANDOFF.md line: `packages: 33/33 PASS, remaining 0`. STATUS.md: `ACK PACKAGE-TZ: PASS holes 18. remaining 0. PASS 33/33.`
- `_index.json` size 11074 bytes as claimed.

**I (inference)**

- Package inventory completeness for the 33 on-disk kits means each listed iso has both kit and permit files and an index row, with remaining empty. That condition holds, so the HANDOFF 33/33 claim is true.
- Fill files are an overlay (`extras`, "not kit_package"). Their absence does not falsify kit inventory completeness.

**A (assumption)**

- Seat scope is inventory (names, pairing, counts, remaining), not inner object-count honesty of each `{iso}.json` / permit / fill body.
- `{iso}` means lowercase ISO 3166-1 alpha-2 as used in this corpus. No other package naming scheme is in this folder.

## Checks run

1. List all files in `packages/`. Count `{iso}.json`, `{iso}-permit.json`, `{iso}-fill.json`, `_index.json`.
2. Parse `_index.json`: `kit_on_disk_count`, `rows`, `last_audit`, `remaining`.
3. Every `kit_on_disk` iso has both `{iso}.json` and `{iso}-permit.json`.
4. Duplicate iso2 files? Unexpected extra files?
5. HANDOFF 33/33 PASS remaining 0: confirm or BLOCK.
6. Fill files claimed us ca kr gb de br ua fr cn it tw pl: confirm 12; missing fills as holes not fails.

## Close

Inventory PASS. 33/33 kit+permit pairs on disk match `_index.json`. Remaining 0. No duplicate iso2. No unexpected extras. Twelve fills present as claimed. Twenty-one fill absences are holes.

Tri-state on "package inventory is complete for the 33 on-disk kits": **TRUE**.
