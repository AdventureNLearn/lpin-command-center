# SEAT 14 — US KIT SHAPE

Seat: 14 · band: later kits (11–25) · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
Prep only. Do not implement KIT-03. No `src/` edit. `votes.json` body not dumped.

Claim: `_out/packages/us.json` is the US stack **index/holes card**. The KIT-03 KeptAdapter roster lives in the **gold kit** `vendor/kept/kits/us/`, not in the package dump.

---

## Verdict

**PASS** (dual layer, not one JSON). Not BLOCK. Not implement.

Package envelope keys are the index contract. Gold `meta.json` + fat object files are the desk contract. A loader that treats `packages/us.json` as a roster will find **zero names**. A loader that reads `vendor/kept/kits/us/members.json` finds 437 filed items.

**Tri-state (TRUE / HOLD / FALSE):** **TRUE** for “KIT-03 reads gold kits, not `_out` package dumps, for rosters.”

---

## 1. Two files, two jobs

| Layer | Path | Bytes | Job for KIT-03 |
| --- | --- | ---: | --- |
| Package dump | `vendor/kept/_out/packages/us.json` | 1,789 | Index + holes + one capital point. **Not a roster.** |
| Gold meta | `vendor/kept/kits/us/meta.json` | 1,250 | Desk identity. Chamber, seats, counts, capabilities, `incomplete`. |
| Gold objects | `vendor/kept/kits/us/{object}.json` | 12 files | Fat records. Roster = `members.json` (157,076 B). |
| Stale sidecar | `vendor/kept/kits/us.json` (file, not folder) | — | **Do not read.** Live-sibling counts from 2026-08-20 (`members` 525 / `sitting` 431 / `votes` 1878). Folder is authority. |

HANDOFF: `packages/{iso}.json` is “object counts and holes.” Explicit: **No kit dumps. No names.** `source` on the US package is `"vendor/kept/kits/us"`.

Drawer contract (seat 13) already split the layers. This seat names the **object keys** so the later adapter cannot confuse them.

---

## 2. Package dump — `packages/us.json` object keys

Top-level keys (7), in file order:

```
iso2, kit_on_disk, objects, capital, holes, retrieved, source
```

| Key | Value on disk |
| --- | --- |
| `iso2` | `"us"` |
| `kit_on_disk` | `true` |
| `objects` | map of **12** filenames → `{ state, count }` |
| `capital` | `{ name, lat, lon, kind }` |
| `holes` | 7 × `{ object, reason }` |
| `retrieved` | `"2026-08-29"` |
| `source` | `"vendor/kept/kits/us"` |

Absent on this file: `items`, `name` (country), `counts`, `capabilities`, `roster`, `sitting`, `pins`, `kit`, `seats`. No member names. No vote rows.

### `objects` map — US stack (12). No `filers` / `lobby` / `orgs`

| object | state | count | hole reason (if listed) |
| --- | --- | ---: | --- |
| `committees.json` | filled | 28 | — |
| `ethics.json` | filled | 15 | `incomplete true` |
| `gap.json` | seeded | 0 | `items 0` |
| `institutional.json` | empty | 0 | `items 0` |
| `issues.json` | filled | 13 | — |
| `members.json` | filled | **437** | — (count only; no names here) |
| `meta.json` | filled | 21 | `incomplete true` |
| `money.json` | seeded | 4 | `sitting_total_reconstructed null` |
| `parties.json` | filled | 3 | — |
| `pledges.json` | filled | 297 | `incomplete true` |
| `sources.json` | filled | 1238 | — |
| `votes.json` | filled | 849 | `incomplete true; selected 849 claimed 1878` |

Stat keys are exactly `state,count`. `state` ∈ {`empty`,`seeded`,`filled`}.

**E:** `objects["meta.json"].count === 21` equals gold `meta.json` top-level key count (below). For list files, `count` is payload cardinality (`items.length` or money `buckets.length`), not key count.

### `capital` keys

```
name, lat, lon, kind
```

Value: `name` `"Washington,  D.C."` (double space), `lat` 38.901495, `lon` -77.011364, `kind` `"capital"`. Same point as `_out/capitals.json` iso2 `"US"`. FlyTo later. **Not a smoke pin. Not a member pin.**

### `holes[]` item keys

```
object, reason
```

Seven holes. Honest incomplete on ethics / gap / institutional / money / pledges / votes / meta. Members is filled 437 and has **no** hole row.

---

## 3. Gold meta — `kits/us/meta.json` head (all 21 keys)

File is 41 lines / 1,250 bytes. Read in full (no items array). Keys in file order:

```
iso2, name, region, chamber, houses, system, seats, election,
session, kit, lang, threshold, counts, capabilities, basis,
incomplete, lane, source_live, note, roster_source, honest_complete
```

| Key | Value |
| --- | --- |
| `iso2` | `"us"` |
| `name` | `"United States"` |
| `region` | `"americas"` |
| `chamber` | `"House of Representatives"` |
| `houses` | `"bicameral"` |
| `system` | `"presidential"` |
| `seats` | **435** |
| `election` | `"competitive"` |
| `session` | `"118th–119th (2023–2026)"` |
| `kit` | `"scoring"` |
| `lang` | `["en"]` |
| `threshold` | 6 |
| `counts` | object (6 keys, below) |
| `capabilities` | 8 strings |
| `basis` | `"Evidence"` |
| `incomplete` | `true` |
| `lane` | `"gold-kit-8103"` |
| `source_live` | `https://kepthor2326.grok.me` |
| `note` | honest-complete harvest note (2026-08-21) |
| `roster_source` | unitedstates/congress-legislators `legislators-current.json` |
| `honest_complete` | `true` |

`counts` keys:

```
members, sitting, votes, committees, key_votes, sourced_quotes
```

Values: members **437**, sitting **437**, votes **849**, committees **28**, key_votes **829**, sourced_quotes **291**.

`capabilities`: `members`, `pledges`, `votes`, `issues`, `gap`, `caucus`, `ask-grok`, `method`.

Template `kits/_template/meta.json` is a subset (`iso2,chamber,session,kit,lang,threshold,counts,basis,incomplete`). US gold adds desk geography, `lane`, `roster_source`, and the honest-complete flag. CATALOG `desk` fields match this file; CATALOG does not list `lane` / `roster_source` / `honest_complete`.

**Both `incomplete: true` and `honest_complete: true` are on disk.** Incomplete is the harvest hole (votes selected 849 / claimed 1878; pledges not a full House). Honest-complete is the gold-kit lane flag (do not pad). KIT-03 must surface the hole, not drop the flag.

---

## 4. Gold folder vs package `objects` (same 12 names)

`vendor/kept/kits/us/` files on disk:

| File | Bytes | Gold top-level keys (items not dumped) | Payload n | Matches package count |
| --- | ---: | --- | ---: | --- |
| `meta.json` | 1,250 | 21 keys above | — | 21 keys |
| `members.json` | 157,076 | `iso2, sitting, source_url, retrieved, incomplete, claimed_seats, items, note` | **437** items | 437 |
| `parties.json` | 709 | `iso2, source_url, items, incomplete` | 3 | 3 |
| `pledges.json` | 140,645 | `iso2, incomplete, note, items` | 297 | 297 |
| `votes.json` | **8,131,988** | envelope only — see §5 | selected 849 | 849 |
| `gap.json` | 899 | `iso2, items, incomplete, examined_pairs, retrieved, note` | 0 | 0 |
| `issues.json` | 1,165 | `iso2, items, incomplete` | 13 | 13 |
| `committees.json` | 25,904 | `iso2, items, incomplete, claimed, retrieved, source_url, membership_url, origin, note` | 28 | 28 |
| `ethics.json` | 3,909 | `iso2, incomplete, note, items` | 15 | 15 |
| `money.json` | 796 | `iso2, named_donors, unit, sitting_total_reconstructed, buckets, source_url, note` | 4 buckets | 4 |
| `sources.json` | 192,841 | `iso2, items, retrieved` | 1238 | 1238 |
| `institutional.json` | 133 | `iso2, kit, items, incomplete, note` | 0 | 0 |

No `filers.json` / `lobby.json` / `orgs.json` (those exist only on map-seed kits cl/fj/nl/th/tz). US is the 12-file stack HANDOFF named.

### Roster item keys (field names only — no name dump)

`members.json` item:

```
id, name, sitting, party_id, caucus, constituency_label, chamber, term, lang, roster_url
```

Envelope also: `claimed_seats: 435`, `incomplete: false`, `retrieved: "2026-08-20"`, `sitting: true`. Trailing `note`: currently sitting only; party is profile, not the score.

**E:** package count 437 = `items.length`. Meta `seats` 435 = `claimed_seats`. Sitting listed 437 vs House 435 is an honest overcount on disk (delegates / extra rows as filed), not a package invention. KIT-03 shows names as filed and a visible hole if a claimed seat is unnamed. Do not mint 435 − n.

Other item key sets (heads, not dumps):

| Object | Item / bucket keys |
| --- | --- |
| `parties.json` | `id, name, seats, source_url` |
| `pledges.json` | `id, member_id, issue_id, sentence, sourceUrl, date, term, lang` |
| `issues.json` | `id, label_en, label_ko` |
| `committees.json` | `id, name, chamber, seats, chair_id, member_ids, origin, source_url` |
| `ethics.json` | `member_id, category, public, amount_band, origin, source_url` |
| `money.json` buckets | `label, amount` (`named_donors: false`) |
| `sources.json` | `url, kind, basis` |
| `gap.json` / `institutional.json` | `items: []` |

Money `sitting_total_reconstructed` is JSON `null` — matches the package hole. Do not invent a reconstructed total.

---

## 5. `votes.json` — envelope only, body not loaded

Filesystem: `vendor/kept/kits/us/votes.json` **8,131,988** bytes (~7.76 MiB). Seat 06 already recorded that Length (gold window 2026-08-21). This seat did not dump `items[]`.

Envelope keys (keys-only; values that are scalars / counts, not row text):

```
iso2, chamber, session, items, incomplete, claimed, floor_index,
selected, with_positions, origin_counts, by_issue, retrieved, note
```

| Envelope field | Value (not a row dump) |
| --- | --- |
| `iso2` | `"us"` |
| `chamber` | `"United States Congress"` |
| `session` | `"118th–119th (2023–2026)"` |
| `items.length` | 849 |
| `incomplete` | `true` |
| `claimed` / `floor_index` | 1878 / 1878 |
| `selected` | 849 |
| `with_positions` | 829 |
| `origin_counts` keys | `clerk, reconstructed` |
| `by_issue` keys | 13 issue ids (same set as `issues.json`) |
| `retrieved` | `"2026-08-21"` |

First-item **key names only** (no title / no member dump):

```
id, date, title, issue_id, origin, bill_id, source_url, congress,
chamber, senate_vote_number, senate_session, vote_question, recorded, note
```

CATALOG `votes` fields also list `member_id, position, missed, aligned_with_pledge`. Those scoring fields are **not** on the first item’s key set. **I:** US gold `votes.json` items are floor-roll envelopes; per-member positions are not this file’s first-paint shape. KIT-03 must not invent yeas.

Package hole already states the cardinality: `selected 849 claimed 1878`. That is enough for an honesty strip without parsing 8 MB.

---

## 6. KIT-03 adapter — read gold kits, not `_out` dumps

Prep. Do not write `src/lib/kept/**` this sitting.

```
OverlayHud
  └── DeskDrawer (KIT-02, later)
        └── KeptAdapter (KIT-03, later)
              ├── index  ← vendor/kept/_out/packages/{iso}.json   (counts + holes)
              ├── point  ← capitals.json / package.capital        (one Contact)
              └── roster ← vendor/kept/kits/{iso}/*.json          (fat objects)
```

### Load

1. **Index first.** `packages/us.json` (and `_index.json` / atlas) for `kit_on_disk`, object states, hole reasons, capital. Small. Main-thread safe (seat 11: this file 1,789 B).
2. **Roster from gold.** If atlas `kit_on_disk === true` **and** `vendor/kept/kits/{iso}/` exists: read fat `meta.json`, `members.json`, `parties.json`, `pledges.json`, `sources.json`, and related objects **as filed**. Names as filed. `source_url` / `roster_url` where present.
3. **Else honest empty** from atlas (`name`, `iso2`, `un_member`, `kit_on_disk: false`). No invented members.
4. **One Contact** per country pack, kind `legislature`, on the capital point. Global zoom + LEG on = those contacts only (≤ ~200). **No member pins.** `members.json` feeds the drawer, not the globe.
5. **Do not parse `votes.json` on first paint.** Use package `objects["votes.json"].count` (849) + hole text (`selected 849 claimed 1878`) until a later votes pane opt-in. 8.1 MB is the US floor dump; other isos are larger (seat 11: kits votes total ~338 MiB).
6. **`packages/{iso}.json` does not stand in for fat files.** It has no `items`. Substituting it for `members.json` / `votes.json` yields an empty desk with a fake “complete” count.

### Count meaning (do not flatten)

| Signal | Where | US value | Meaning |
| --- | --- | ---: | --- |
| House seats | gold `meta.seats` / `members.claimed_seats` | 435 | claimed chamber size |
| Roster rows | gold `members.items.length` / package `objects.members.json.count` / `meta.counts.members` | 437 | filed sitting rows |
| Vote rows selected | package count / gold envelope `selected` / `meta.counts.votes` | 849 | items kept in gold file |
| Vote floor claimed | package hole / gold `claimed` + `floor_index` | 1878 | full index not on disk |
| Key votes | `meta.counts.key_votes` | 829 | `with_positions` on votes envelope |
| Sidecar `kits/us.json` | **ignore** | 525 / 431 / 1878 | stale sibling snapshot |

### Stale sidecar (collision)

`vendor/kept/kits/us.json` keys: `iso2, kit, source, method, session, threshold, counts, roster, rolls, issues, capabilities, local_members, incomplete, note`. `local_members: []`. `counts.members` 525 / `sitting` 431 / `votes` 1878. Note says “Counts from live sibling 2026-08-20. Member rows wait on Sub8 harvest.” Folder `kits/us/meta.json` is 2026-08-21 gold. KIT-03 path is `kits/{iso}/`, never `kits/{iso}.json`.

---

## 7. Do-not

- Do not implement KIT-03 / `src/lib/kept/**` from this file.
- Do not treat `_out/packages/us.json` as a roster, vote list, or pledge list.
- Do not load `votes.json` body into the HUD or the globe.
- Do not plot 437 member pins. One capital Contact.
- Do not read `vendor/kept/kits/us.json` (sidecar) as the desk.
- Do not invent sitting names, yeas, donors, or a reconstructed money total.
- Do not pad `claimed_seats` 435 against 437 filed rows, or 1878 claimed votes against 849 selected.
- Do not import Rest / `places-rest.ts`. That is KIT-04/06.
- Do not enable LEG on by default. Markers are a later sitting.
- Do not dump member names into this (or any) prep doc.

---

## 8. E / I / A

| Item | E (exists on disk) | I (inference) | A (assumption / actual count) |
| --- | --- | --- | --- |
| Package top-level keys | `iso2, kit_on_disk, objects, capital, holes, retrieved, source` | Index card, not a kit | 7 keys. 1,789 B. `source` points at gold folder |
| Package `objects` keys | 12 filenames; each `{state,count}` | US stack is the kit *envelope of files*, not a closed TS object for all 33 | No filers/lobby/orgs on US. Count 437 is not a names array |
| Package holes | 7 × `{object,reason}` | Members filled ⇒ no members hole | votes hole carries selected/claimed; enough without opening the fat file |
| Gold `meta.json` keys | 21 keys listed in §3 | Package `meta` count 21 **is** key cardinality | `incomplete` + `honest_complete` both true; show the hole |
| Gold folder files | same 12 names as `objects` | Adapter path = `vendor/kept/kits/us/` | Byte sum dominated by votes.json 8,131,988 |
| Roster | `members.json` keys + `items` n=437; item field names only | Package cannot supply this | `claimed_seats` 435 vs 437 items is filed overcount, not a fail |
| Votes envelope | keys in §5; `items.length` 849; Length 8,131,988 | First-paint must not JSON.parse this | Floor claimed 1878 stays a hole. No yea invention |
| CATALOG vs votes item0 | CATALOG lists `member_id, position, …`; item0 keys do not | US votes items are floor rolls | Scoring alignment is later; not a globe payload |
| Sidecar `kits/us.json` | stale counts 525/431/1878; `local_members: []` | Live-sibling leftover | Ignore. Folder wins |
| Capital | package + `capitals.json` `"US"` same lat/lon | One Contact, kind legislature | Name spelling has a double space; do not “fix” |
| KIT-03 load split | seat 13 contract + HANDOFF “no kit dumps” | `_out` = smoke index; gold = desk | Roster from fat kits. Package dumps never stand in |

E, I, and A agree: KIT-03 KeptAdapter reads **gold kits** for rosters. `_out/packages/us.json` is counts + holes + one capital. `votes.json` stays Length + envelope + package hole until a later opt-in pane.

---

## 9. Method (disk only)

- Read `vendor/kept/_out/packages/us.json` in full.
- Read `vendor/kept/kits/us/meta.json` in full (head = whole file).
- Read gold object **heads** (`members`, `parties`, `pledges`, `issues`, `committees`, `ethics`, `money`, `sources`, `gap`, `institutional`) for top-level keys and first-item **key names**. No roster dump. No pledge-sentence dump in this file beyond shape.
- `votes.json`: filesystem Length + envelope keys + `items.length` + first-item **key names**. Body / titles / positions not copied here.
- Cross-check: `_out/HANDOFF.md`, `packages/_index.json` US row (holes 9 = kit 7 + permit 2), `capitals.json` `"US"`, `CATALOG.json` object field lists, `kits/_template/meta.json`, stale `kits/us.json` sidecar, seats 05 / 11 / 13.
- Did not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, or `package.json`. Did not implement KIT-03.

No invented sitting names. No 16k pin dump. No src write.
