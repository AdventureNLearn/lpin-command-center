# SEAT 12 — Members honesty (KIT-03 prep)

Seat: 12 · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
Band: later kits (11–25). **Prep only. Do not implement KIT-03.**  
Write: this file only. No `src/`. No `_out/` rewrite. No `kits/` rewrite.

Probe this sitting: **metadata** + `members.json` **HEAD/schema** for `us`, `ca`, `cl` (fat vs empty).  
**Did not load** full `votes.json` (US ~8.1 MB, CA ~4.8 MB). Schema from first ~40 lines only.

---

## Deliverable — when KIT-03 may list names vs honest hole

**Never invent sitting names.** Honest incomplete beats a padded roster.

| Situation | KIT-03 may list names? | What to show |
| --- | --- | --- |
| Fat kit: `kit_on_disk: true` **and** `vendor/kept/kits/{iso}/members.json` has `items.length > 0` with filed `name` + `source_url` / `retrieved` | **Yes — as filed only** | Drawer roster = `items[].name` (and `id`, `chamber`, `party_id` / `caucus`, `constituency_label`, `roster_url` if present). Show `source_url`. Visible hole if `claimed_seats` > items (unnamed seats). **No member pins on the globe.** |
| Empty kit on disk: `kit_on_disk: true` but `members.json` `items: []` (map-seed) | **No** | Honest hole sentence from the package (`items 0; sitting 0; no invented roster`). Country `Contact` at capital only. Do not mint deputies. |
| Atlas row `kit_on_disk: false` (163 desks) | **No** | Atlas card: `name`, `iso2`, `un_member`, `kit_on_disk: false`, UN `source_url`. No kit dir. No stub from `_template`. |
| Package / `_index` counts only | **No** | Counts + hole reasons. `_out/packages/{iso}.json` is **not** a roster. |
| `votes.json` (fat or empty) | **No** | Do not load votes into the HUD/drawer as names. Join `member_id` only to ids **already in** fat `members.json`. Clerk totals / dropped-unmapped notes stay holes. **No invented yeas.** |
| Vacant seats inside a fat kit | **No pad** | List sourced items. Leave the gap visible (`ca`: 338 of 343). Do not invent the rest. |
| Senate / other house not in the sitting kit | **No** | US sitting kit is House-filed (437). Do not add 100 senators from vote titles or memory. |

Globe (LEG on, later): **at most one** `Contact` per country, kind `legislature`, on `capitals.json` / package `capital`. Cap ≤ ~200 country markers. **No member pins. No 16k Rest pins.**

Drawer (KeptAdapter, later): names **only** from fat `members.json` items as filed.

---

## E — Evidence (disk, this tree)

### Probe limits

| File | What this seat opened | What it did not |
| --- | --- | --- |
| `vendor/kept/kits/us/members.json` | HEAD + item schema (157076 B, LWT 2026-08-21 11:36:34) | No full roster dump in this file |
| `vendor/kept/kits/ca/members.json` | HEAD + item schema (139296 B, LWT 2026-08-21 01:21:25) | Same |
| `vendor/kept/kits/cl/members.json` | Entire file (36 B, LWT 2026-08-21 15:27:01) — empty | — |
| `vendor/kept/kits/{us,ca,cl}/votes.json` | **Metadata + first ~40 lines (schema)** | **Full body** (US 8131988 B, CA 4815804 B) |
| `vendor/kept/_out/packages/{us,ca,cl}.json` | objects / holes / capital | Name arrays (none exist) |
| `vendor/kept/kits/{us,ca,cl}/meta.json` | counts + roster_source + notes | — |
| `vendor/kept/_out/atlas.json` | HEAD schema + known 196/33/163 from seat 14 | Not re-parsed as a name list |
| Other kits’ `members.json` | **Length + mtime only** | Bodies |

Gold window: kit `members.json` / `votes.json` LastWriteTime is **2026-08-20 or 2026-08-21**, not rewritten 2026-08-29. Package `retrieved: 2026-08-29` is the **index** layer, not a kit rewrite.

### Fat vs empty (us / ca / cl)

| | **us (fat)** | **ca (fat)** | **cl (empty)** |
| --- | --- | --- | --- |
| `members.json` bytes | 157076 | 139296 | **36** |
| Top-level keys | `iso2`, `sitting`, `source_url`, `retrieved`, `incomplete`, `claimed_seats`, `items` | same | **`iso2`, `items` only** |
| `sitting` | `true` | `true` | **absent** |
| `source_url` | `https://unitedstates.github.io/congress-legislators/legislators-current.json` | `https://www.ourcommons.ca/members/en/search/csv` | **absent** |
| `retrieved` | `2026-08-20` | `2026-08-20` | **absent** |
| `incomplete` (members file) | `false` | `false` | **absent** |
| `claimed_seats` | 435 | 343 | **absent** |
| `items` | non-empty objects | non-empty objects | **`[]`** |
| Package `objects.members.json` | filled **437** | filled **338** | empty **0** |
| Package members hole | **none** | `items 338 claimed_seats 343` | `items 0; sitting 0; no invented roster` |
| `meta.json` `kit` | `scoring` | `scoring` | `map` |
| `meta.counts.members` / `sitting` | 437 / 437 | 338 / 338 | **0 / 0** |
| `meta.seats` | 435 | 343 | 155 |
| `meta.roster_source` | congress-legislators URL | ourcommons CSV | **`null`** |
| `meta.source_live` | kepthor URL | kepthoc URL | **`null`** |
| `meta.note` (honesty) | Sit 437. named_donors false | Sit 338. No invented yeas | Seed from `_template`. Sitting 0. No invented pledges/yeas. Honest incomplete |
| Capital (package) | Washington, D.C. | Ottawa | Santiago |
| `_index.json` holes | 9 | 9 | **18** |

`cl/members.json` entire file:

```json
{ "iso2": "cl", "items": [] }
```

Same empty shape as `_template/members.json` (`iso2: "xx"`, `items: []`, 34 B). `cl` is 36 B because `iso2` is `"cl"`.

### Item schema (fat HEAD only — field names, not a roster)

First `items[]` object on **us** and **ca** uses the same keys:

`id`, `name`, `sitting`, `party_id`, `caucus`, `constituency_label`, `chamber`, `term`, `lang`, `roster_url`

This seat does **not** copy those `name` strings here. KIT-03 lists them from disk when it implements, not from this prep note.

US `chamber` on the first items is `House of Representatives`. CA is `House of Commons`. That is the filed sitting house — not a license to invent the other house.

### votes.json — metadata + schema head only (not a name source)

| | us | ca | cl |
| --- | ---: | ---: | ---: |
| bytes | **8131988** | **4815804** | **36** |
| LWT | 2026-08-21 11:36:34 | 2026-08-21 01:21:26 | 2026-08-21 15:27:01 |
| package state / count | filled 849 | filled 173 | empty 0 |
| package votes hole | `incomplete true; selected 849 claimed 1878` | none | `items 0; no invented yeas` |

Schema from **first ~40 lines**:

- **us** top-level: `iso2`, `chamber`, `session`, `items[]`. First item keys include `id`, `date`, `title`, `origin: "clerk"`, `source_url` (Senate LIS XML), `congress`, `chamber: "senate"`, `recorded: { yea, nay }`. **No `positions[].name`.** First-item `note` (quoted, not expanded): *Sitting kit is House-only (437); senator names dropped unmapped. Totals from clerk XML. Yeas not invented.*
- **ca** top-level: `iso2`, `session`, `source_url` (OpenParliament), `retrieved: 2026-08-20`, `incomplete: false`, `items[]`. First item has `positions[]` of `{ member_id, position }` only (`yea` / `nay` / `paired`). **No sitting names in the vote head.**
- **cl** entire file: `{ "iso2": "cl", "items": [] }` — same empty as template votes (`iso2: "xx"`).

KIT-03 must not parse the multi-MB vote bodies to mint a roster. CA `member_id` joins only to ids already in fat `ca/members.json`. US Senate roll-calls stay **totals + dropped-unmapped**, not a Senate sitting list.

### Empty vs fat across the 33 (metadata, not a name dump)

`members.json` Length on disk:

| Band | n | iso2 | bytes |
| --- | ---: | --- | --- |
| Empty / template-sized | **5** + `_template` | `th` `nl` `tz` (34), `cl` (36), `fj` (56) | 34–56 |
| Fat | **28** | remaining kit dirs | 40542 (`il`) … 1502571 (`cn`) |

Seat 14: sitting > 0 = **28**; sitting = 0 = **5** (`cl`, `fj`, `nl`, `th`, `tz`). Seat 05/10: those five packages `members.json` state `empty`, count `0`, hole `items 0; sitting 0; no invented roster`. `th` kit `iso2` is still `"xx"` (template leftover) — kit-file hole, **do not backfill names**.

Atlas (`vendor/kept/_out/atlas.json` HEAD): `{ iso2, name, un_member, kit_on_disk, source_url, retrieved }`. **196** rows, **33** `kit_on_disk: true`, **163** false. False rows have **no** `vendor/kept/kits/{iso2}/` and **no** `packages/{iso}.json`. Example false row (`ad`): country name + UN member-states `source_url` only.

Capitals (`capitals.json`): schema `gev.capitals.v1`, **count 194**, `kind: capital`, delayed Natural Earth, “No permit pins.” Country/capital labels are **not** sitting names.

Packages contain **no** `names` / `roster` / sitting-name arrays. Object counts only. Fills (`*-fill.json`) are ingest-drop diaries, not rosters; leftover `*.house.gov` lines stay internal (seat 10). `501-links.json` `member_id` joins only to bioguides already in `kits/us/members.json` — **no new sitting names**.

### KIT-03 contract already on disk (not implemented)

Seat 13 (`docs/corpus-audit/13-drawer-contract.md`):

1. Fat kit on disk → names as filed; visible hole if a seat is unnamed; `source_url` where present.
2. Else honest empty from atlas. No invented members.
3. At most one country `Contact`. **No member pins.**
4. `_out/packages/{iso}.json` does not stand in for fat `votes.json` / `members.json`.

Smoke / KIT-01: do **not** load `members.json` / `votes.json` into the HUD.

---

## I — Inference

- **Fat** means a sourced `items[]` with `name` as filed plus a roster `source_url` / `retrieved`. That is the only path KIT-03 has to print a person. `us` and `ca` qualify. `cl` does not — `kit_on_disk` is true, but the roster file is an empty seed.
- **Empty kit ≠ missing country.** Chile still gets one capital contact (Santiago) and the hole sentence. Filling `items` from Wikipedia, memory, or `_template` would be an invented roster.
- **163 atlas-false rows** are listed desks without kits. Showing 196 tiles means 163 stay empty. Copying US/CA objects into those dirs would fake coverage.
- **Vacancy math is a hole, not a todo.** CA 338/343: list 338, show five unnamed. Do not invent five MPs. US `claimed_seats` 435 vs filed items/meta **437**: package has **no** members hole; votes head calls the sitting kit House-only (437). List 437 as filed. Do **not** trim to 435. Do **not** add 100 senators.
- **Votes are not a second roster.** US head already drops senator names as unmapped and records clerk yea/nay totals. CA head is `member_id` + position. Loading the 8 MB / 5 MB files to discover names would both blow the HUD budget and invent houses the members file did not file.
- **Globe vs drawer.** Names belong in the Kept drawer after a desk is selected. LEG markers are country contacts (≤ ~200). A pin per member is out of KIT-03 (and would dump hundreds of US/CA points on first paint).

---

## A — Assumption / later action (not this sitting)

- KIT-03 implementer reads **fat** `vendor/kept/kits/{iso}/members.json` only when the empty/fat gate above is **fat**, and only after KIT-02 DeskDrawer exists. This seat does not add `src/lib/kept/**`.
- Loader treats `items: []` as a display hole even if `meta.seats` is 155 (`cl`) or package `kit_on_disk` is true.
- `positions[].member_id` in CA votes (and any later vote join) is allowed only as a lookup into already-filed member `id`s. Unjoined ids stay unjoined — same pattern as 501 (84 joined / 51 unjoined, no new names).
- Operators will not treat this prep file as a roster. It on purpose **does not** paste sitting names.
- Gold files stay 2026-08-20/21. A “second harvest” to close `cl` / 163 / CA vacancies is out of band and would be a kit rewrite (fence).

---

## Do-not (seat 12 and KIT-03)

- Do not invent sitting names, whip marks, yeas, pledges, or donors.
- Do not pad `claimed_seats` − `items.length` with guessed people.
- Do not use `_template` or US/CA fat files to backfill `cl` `fj` `nl` `th` `tz` or the 163.
- Do not treat `_out/packages/{iso}.json` counts as a name list.
- Do not load full `votes.json` into the HUD or this prep.
- Do not plot member pins. Do not plot Rest.
- Do not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, or `package.json` from this seat.
- Do not implement KIT-03 in this band.

**This sitting:** file written. Gate is the table at the top. Names as filed, or an honest hole.
)
