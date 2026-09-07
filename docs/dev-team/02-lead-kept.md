# LEAD 02 — KEPT (KIT-03 data contract)

Seat: **02 LEAD KEPT** · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
This sitting writes **this file only**. No `src/`, `_out/`, `kits/`, `package.json`. No npm, no git push, no grok.me.

Specialists (prep only, later kits): **11** atlas join · **12** members honesty · **13** capitals · **14** us-kit shape · **22** streams · **23** 501.

Gold kits: `vendor/kept/kits/` — **metadata only**. `votes.json` = mtime / 3-line head / byte length. Do not load vote bodies into the model or the HUD.

---

## GO / NO-GO

**NO-GO: do not implement KIT-03 this sitting.**

KIT-03 **must wait for KIT-02**.

| Gate | Disk now | Why it blocks KIT-03 |
| --- | --- | --- |
| KIT-01 layer registry | **landed** (`LayerId` has `legislatures` / `permits`; rail LEG/AHJ default **off**) | Needed, already present. Not sufficient. |
| KIT-02 DeskDrawer | **absent** — `src/components/desks/` does not exist; store has `corpusOpen`, not `desk` | KIT-03 click path is “flyTo + open DeskDrawer with Kept adapter.” No drawer = no adapter host. |
| KIT-03 KeptAdapter + country Contacts | **not started** — `src/lib/kept/` does not exist; `globeEngine` does not subscribe to LEG | This contract is the later kit. Do not start it in the same turn as the contract. |

FEATURE_KITS: one kit per turn. KIT-03 depends on KIT-02. KIT-07 streams depend on KIT-03. Do not skip the drawer because a corpus panel already exists.

**This sitting = PASS as a contract.** Implement = **NO-GO** until KIT-02 `DeskDrawer` opens/closes empty Kept and Permit slots with the globe still mounted.

---

## E / I / A key

- **E** — on this disk this sit (file bytes, parse, join, mtime).
- **I** — inference from that evidence (how a later loader should behave).
- **A** — not verified here (live UN/ISO pages, chamber parcel coords, off-tree harvest).

---

## Sources (read, not rewritten)

| Path | Use |
| --- | --- |
| `<HOST_TREE>/KIT-03-kept-desks.md` | Kit goal. Depends on KIT-02. |
| same dir `KIT-02-desk-drawer.md` | Drawer shell KIT-03 must plug into. |
| same dir `FEATURE_KITS.md` | One kit per turn; KIT-03 after KIT-02; KIT-07 after KIT-03. |
| same dir `KIT-07-kept-streams.md` | Streams later. No influence score. |
| `vendor/kept/_out/HANDOFF.md` | 33/33 PASS, remaining 0. WAVE-501 US PASS. Do not edit src/kits from that handoff. |
| `vendor/kept/_out/atlas.json` | 196 country rows. 33 true / 163 false. |
| `vendor/kept/_out/packages/_index.json` | 33 `kit_on_disk`, `remaining_count: 0`. |
| `vendor/kept/_out/capitals.json` | 194 delayed capital points. Coordinate source for later Contacts. **Do not plot this sitting.** |
| `vendor/kept/_out/packages/{iso}.json` | Index/holes + `capital` point. Not a fat roster. |
| `vendor/kept/kits/{iso}/meta.json` | Chamber, kit type, counts, incomplete. |
| `vendor/kept/kits/{iso}/members.json` | Keys + counts only (honesty). Names as filed stay on disk until KIT-03 adapter. |
| `vendor/kept/kits/{iso}/votes.json` | **mtime / head / bytes only.** Never import. |
| `docs/corpus-audit/01-atlas.md`, `02-capitals.md`, `04-packages-inventory.md`, `05-package-schema.md`, `07-wave-501.md`, `11-load-usability.md`, `13-drawer-contract.md`, `14-gaps-196.md` | Prior seat facts this contract restates, does not reopen. |

HANDOFF mtime **E:** `HANDOFF.md` 1420 B 2026-08-29 18:40:44; `atlas.json` 38842 B 10:34:44; `_index.json` 11074 B 18:22:28; `capitals.json` 63816 B 10:41:40.

---

## 1. Atlas join — 33 on-disk vs 163 holes

**E.** `atlas.json` is a 196-row array. Schema (6 keys every row): `iso2`, `name`, `un_member`, `kit_on_disk`, `source_url`, `retrieved`. iso2 lowercase `^[a-z]{2}$`. No lat/lon.

| Count | Value |
| ---: | --- |
| atlas rows | **196** |
| unique iso2 | **196** |
| `kit_on_disk: true` | **33** |
| `kit_on_disk: false` | **163** |
| `un_member: true` | **193** |
| `un_member: false` | **3** (`ps`, `tw`, `va`) |

33 + 163 = 196. 193 + 3 = 196.

`packages/_index.json`: `kit_on_disk_count: 33`, `remaining_count: 0`, `rows.length: 33`, last_audit PACKAGE-TZ PASS. Remaining-0 means the **33** are packaged. It does **not** mean 196/196.

True iso2 set (dirs under `vendor/kept/kits/` excluding `_template`) **equals** atlas true **equals** `_index.kit_on_disk`:

`ar au br ca cl cn de eg es fj fr gb gh id il in it jp ke kr mx ng nl nz ph pl th tr tw tz ua us za`

Mismatch atlas-true vs kit-dir: **0**. Extra kit dirs: **0**. `_template` is not an atlas row.

`un_member: false`:

| iso2 | name | kit_on_disk |
| --- | --- | --- |
| ps | State of Palestine | false (in the 163) |
| tw | Taiwan | **true** (in the 33) |
| va | Holy See | false (in the 163) |

**I.** Nested honesty, not interchangeable numbers:

```
196 listed desks     ← atlas.json
 └── 33 kits on disk ← kit dir + packages/{iso}.json + {iso}-permit.json
      └── 12 fills   ← ingest-drop only (not a KIT-03 plot set)
```

**A.** Live UN membership page not re-fetched. Names as stored (Côte D'Ivoire, Türkiye, apostrophe forms).

### 163 holes stay empty

Do not mint stub kits from `_template`. Do not copy US objects onto false rows. Do not invent members, sittings, pledges, or votes for the 163.

False-row schema is the same six keys. None of the 163 have `vendor/kept/kits/{iso2}/` or `packages/{iso}.json`.

Five of the **33** (`cl fj nl th tz`) have `meta.counts.sitting = 0`. They are kits-on-disk with empty rosters, **not** part of the 163. Honest empty inside a true kit ≠ missing kit.

Dirt (not extra iso2): leftover files `vendor/kept/kits/ca.json`, `kr.json`, `us.json`; tmp `de/gap.json.tmp`, `es/votes.json.apply-tmp`, `id/votes.json.tmp`. Ignore. Authority is the iso directory + `_out`.

---

## 2. Capitals — delayed, not plotted until KIT-03

**E.** `capitals.json` schema `gev.capitals.v1`. Wrapper: `freshness: delayed`, `source: naturalearth`, `count: 194` = `points.length`. Note on file: “City-level capital points, not parcel-accurate. Countries without sourced capital coordinates omitted. **No permit pins.**”

Per-point keys: `iso2` (uppercase), `name`, `lat`, `lon`, `kind: capital`, `source_url`, `retrieved`, `freshness: delayed`. Join atlas by iso2 **case-fold**. Capitals minus atlas: **0**. Atlas minus capitals: **nr**, **ps**. All **33** kit countries have a capital row.

Package `capital` on every `{iso}.json` matches that delayed city point (US name has two spaces: `Washington,  D.C.`).

**This sitting:** do not plot. Corpus panel may print **194** vs **196**. LEG stays off. `globeEngine` subscribe has no `layers.legislatures` branch. `flatEngine.refreshMarks` has no civic marks.

**KIT-03 later (I):**

1. Capitals are the **coordinate source**, not a second pin layer.
2. Keep `Contact.freshness = "delayed"`. Label delayed. Not live. Not parcel.
3. Omit NR and PS. Do not guess Yaren or Ramallah.
4. Do not treat TZ Dar es Salaam / NL Amsterdam / ZA Pretoria as a fail — they are sourced NE city points. Honesty note in the drawer, not a second pin.
5. Do not plot Rest / AHJ from this file.

---

## 3. Contact budget — max 1 per country

KIT-03: “Build at most one `Contact` per country pack. Place it on a capital / chamber coordinate. Kind `legislature`. Meta = chamber name + honesty counts (e.g. ‘338 of 343 named’). Global zoom + LEG on = those country contacts only. **No member pins.**”

Existing `Contact` (**E**, `src/lib/intel/types.ts`):

```
id, kind, name, meta, lat, lon, altM, heading, speedMs, vertMs,
country?, source, freshness, extra?
Kind already includes "legislature"
```

**Contract for later KIT-03 (I):**

| Rule | Value |
| --- | --- |
| Max Contacts of kind `legislature` | **1 per iso2** |
| KIT-03 v1 plot set | **33** = atlas `kit_on_disk` ∩ capitals (33/33) |
| 163 holes | A–Z list in the drawer as honest empty. **No Contact** that pretends a pack exists. |
| NR, PS | No capital → no Contact. |
| Member / seat pins | **0** forever in this kit |
| Vote / 501 / permit pins | **0** |
| Hard cap | ≤ 33 civic billboards this kit. Never 16k. Never roster-length. |

Worked example that KIT-03 already named (**E**, package holes + members counts, no roster dump):

- **ca:** package `capital` Ottawa 45.418643, −75.701961. `members.json` items **338**, `claimed_seats` **343**. Package hole `items 338 claimed_seats 343`. Contact meta: chamber `House of Commons` + **“338 of 343 named.”**
- **kr:** package `capital` Seoul 37.568295, 126.997785. items **302**. `claimed_seats` null; `meta.seats` 300. Meta: chamber + named/claimed as filed, not padded to 300.

Suggested Contact (markdown only, not minted this sitting):

| Field | Rule |
| --- | --- |
| `id` | `leg-{iso2}` |
| `kind` | `"legislature"` |
| `name` | atlas `name` (country), not a member name |
| `meta` | `{chamber} · {named} of {claimed} named` or `roster empty` / `no kit` |
| `lat`/`lon` | package `capital` or capitals.json (same delayed point) |
| `altM` | 0 |
| `heading`/`speedMs`/`vertMs` | 0 |
| `country` | iso2 lowercase |
| `source` | `LAYER_META.legislatures.source` = “Kept harvest / public registers” |
| `freshness` | `"delayed"` |
| `extra.iso2` | iso2 |
| `extra.kit_on_disk` | `"true"` / `"false"` |

Click: `flyTo` capital + `desk = { system: "kept", id: iso2 }`. That store field is **KIT-02**. Do not invent a second panel.

---

## 4. Fat kit vs package index

**E.** Two layers. Do not substitute.

| Layer | Path | What it is |
| --- | --- | --- |
| Index / holes | `vendor/kept/_out/packages/{iso}.json` | `kit_on_disk`, `objects` filename→`{state,count}`, `capital`, `holes[]`, `retrieved`, `source` |
| Fat harvest | `vendor/kept/kits/{iso}/` | `meta.json`, `members.json`, `parties.json`, `pledges.json`, `sources.json`, … |
| Votes (fat, huge) | `vendor/kept/kits/{iso}/votes.json` | Clerk/roll-call. **Never HUD-import.** |

US example: package `members.json` count 437, `votes.json` count 849, hole `votes.json incomplete true; selected 849 claimed 1878`, `source: "vendor/kept/kits/us"`. Fat `meta.json` `counts.votes: 849`, `incomplete: true`. Package is not the roll-call file.

Object-key drift (**E**, seat 05): 28 kits have the 12-file US stack; **cl fj nl th tz** also carry empty `filers.json` / `lobby.json` / `orgs.json`. Loader: `objects` is a map, not a closed 12-key type.

`meta.kit` on disk: **scoring 14** / **map 19**. All 33 `incomplete: true` at meta level. `members.json.incomplete` is often `false` when the roster file itself is filled — still show meta + package holes.

---

## 5. Members honesty (counts only — specialist 12 owns the full table)

**E.** Template `members.json` is `{ iso2, items: [] }`. Filled kits add `sitting`, `source_url`, `retrieved`, `incomplete`, `claimed_seats`, `note`, `items[]`. Item keys (first row, 28 filled kits): `id, name, sitting, party_id, caucus, constituency_label, chamber, term, lang, roster_url`.

Named vs blank `name` on disk: **unnamed items = 0** across the 33 files. Holes are **claimed_seats − items**, not blank-name rows. Do not pad items to claimed. Visible hole in the drawer.

| iso2 | items named | claimed_seats | honesty |
| --- | ---: | ---: | --- |
| ar | 257 | 257 | even |
| au | 151 | 151 | even |
| br | 513 | 513 | even |
| **ca** | **338** | **343** | **5 unnamed seats — KIT-03 example string** |
| cl | 0 | null | empty kit (sitting 0) |
| cn | 2849 | 2977 | 128 unnamed seats |
| de | 630 | null | claimed missing; do not invent |
| eg | 596 | 596 | even |
| es | 350 | 350 | even |
| fj | 0 | null | empty kit |
| fr | 595 | null | claimed missing |
| gb | 650 | null | claimed missing |
| gh | 275 | 275 | even |
| id | 569 | 580 | 11 |
| il | 118 | 120 | 2 |
| in | 540 | 543 | 3 |
| it | 400 | null | claimed missing |
| jp | 465 | 465 | even |
| ke | 348 | 349 | 1 |
| kr | 302 | null | meta.seats 300 — do not pad or trim |
| mx | 496 | 500 | 4 |
| ng | 358 | 360 | 2 |
| nl | 0 | null | empty kit |
| nz | 123 | 123 | even |
| ph | 317 | 316 | 1 over claimed — show both numbers, do not delete |
| pl | 460 | 460 | even |
| th | 0 | null | empty kit; `iso2: "xx"` leftover in members/votes head |
| tr | 591 | 600 | 9 |
| tw | 113 | 113 | even |
| tz | 0 | null | empty kit |
| ua | 392 | 450 | 58; members note says wartime vacant not padded |
| us | 437 | 435 | 2 over claimed (package count 437; meta.seats 435) |
| za | 398 | 400 | 2 |

Empty kits `cl fj nl th tz`: `items: []`. Drawer: “roster empty,” atlas name, chamber if meta has one, `source_url` if any. **No invented names.**

KIT-03 adapter load (later): **fat** `members.json` / `meta.json` / `parties.json` / `pledges.json` / `sources.json` **lazy per iso2**. Names as filed. `source_url` where present. Method one-liner: score against own sourced pledges, never the ticket. That is **not** an influence score.

Do not dump the US 437 (or CN 2849) names into OverlayHud / corpus panel.

---

## 6. votes.json — mtime / head / bytes only

**Never** `import` / parse vote bodies for KIT-03. Seat 11: gold-kit votes ~339 MiB across 34 files; largest `kits/ua/votes.json` 90,993,406 B.

Head shape (3 lines, **E**, no body): `{` then `"iso2": "{iso}"` then chamber/sitting/items. Empty kits: `items: []`. `th` votes head still `iso2: "xx"`.

Use package `objects["votes.json"].count` + hole reason in the honesty strip. Do not render roll-calls in KIT-03.

---

## 7. No influence score

**E.** KIT-03 do-not: “Do not compute an influence score.” KIT-07: “Do not multiply PAC + award + seat into an influence score.” WAVE-501 JSON: 0 keys named `influence` / `score` / `quid` / `pagerank` / `centrality` (seat 07).

KIT-03 may show: named/claimed, chamber, sourced pledges vs own pledges, package holes.  
KIT-03 may **not** show: rank, color-by-score, PAC+award+seat product, whip invention, donor heat.

501-links is **not** a KIT-03 globe layer. Specialist 23: counts card only, delayed, US-only.

---

## 8. US kit shape (specialist 14)

**E.** `packages/us.json` + `kits/us/meta.json` (no votes body):

- `kit: scoring`, `chamber: House of Representatives`, `houses: bicameral`, `seats: 435`, `session: 118th–119th (2023–2026)`
- `counts.members/sitting: 437`, `votes: 849`, `incomplete: true`, `honest_complete: true`
- package objects: committees 28 filled, ethics 15 filled, gap 0 seeded, institutional 0 empty, issues 13, members 437, meta 21, money 4 seeded, parties 3, pledges 297, sources 1238, votes 849
- capital Washington, D.C. 38.901495, −77.011364 (delayed NE)
- holes include votes `selected 849 claimed 1878`, pledges incomplete, money `sitting_total_reconstructed null`
- roster_source on meta is the public legislators-current JSON. Do not fetch it live from this contract.

**I.** US is the fattest scoring example, not the template for the 163. Country-native catalogs stay country-native. Do not copy US AHJs onto TZ (TZ ≠ TX/TN).

---

## 9. Streams (specialist 22) — not KIT-03

KIT-07 depends on KIT-03. Max **8** pinned desks. Shared names = folded-stem co-occurrence, labeled that way, not the same legal entity, not a score. Compare = two desks, pledge-vs-own-pledge. Do not auto-pin eight. Do not enable this kit now.

---

## 10. 501 (specialist 23) — not KIT-03

**E.** `vendor/kept/_out/501-links.json` 125973 B, mtime 2026-08-29 18:38:37. iso2 `us`. nodes **199** (committee 166, org 33), edges **215** (fec 186, usaspending 29), holes **17**. WAVE-501 AUDIT PASS. No influence field.

KIT-03: do not plot 501 nodes. Corpus panel already has a counts card. Lazy load. No node-name dump in civic copy this sitting.

---

## File-touch map — KIT-03 later (not this sitting)

KIT-02 must create first: `src/components/desks/DeskDrawer.tsx`, store `desk: null | { system: "kept" | "permit"; id: string }`, OverlayHud mount, Esc close, bottom sheet above the command bar.

Then KIT-03 (one turn, after KIT-02 green):

### New

| File | Why |
| --- | --- |
| `src/lib/kept/types.ts` | Atlas row, kit package, member item, honesty counts. No vote item type. |
| `src/lib/kept/index.ts` | Join atlas (196) + `_index` (33) + capitals (194). Export 33 pack ids + 163 holes. Eager, small. |
| `src/lib/kept/toContact.ts` | Map one pack → one `Contact`. Cap 1. Delayed. |
| `src/lib/kept/loadKit.ts` | **Lazy** fat `meta` / `members` / `parties` / `pledges` / `sources` for **one** iso2. Never glob votes. Never eager-import CN 1.5 MB members at first paint. |
| `src/components/desks/KeptAdapter.tsx` | Header country/chamber; roster as filed; unnamed-seat hole; `source_url`; method one-liner; A–Z country list including 163 empties. |

### Touch

| File | Why |
| --- | --- |
| `src/lib/intel/globeEngine.ts` | Subscribe `layers.legislatures`. Draw ≤33 extras. Click → flyTo + `desk={kept, iso2}`. Purge on LEG off. Prefix `leg-`. |
| `src/lib/intel/flatEngine.ts` | Phone marks for LEG, same 33-cap. Today any layer flip already re-paints intel marks; do not dump members. |
| `src/lib/intel/store.ts` | LEG `count` = contacts drawn (0 or 33). `on: false` default unchanged. Desk field is KIT-02’s. |
| `src/lib/intel/icons.ts` | One civic icon kind (chamber mark). Do not reuse plane. |
| `src/components/desks/DeskDrawer.tsx` | Slot KeptAdapter when `desk.system === "kept"`. |
| `src/lib/intel/commands.ts` | `show legislatures` already emits layer on (KIT-01). Do not steal KIT-05 grammar (`open korea` as desk) unless that kit is in the same later turn — default **no**. |

### Do not touch (KIT-03)

- `src/components/intel/GlobeCanvas.tsx` (mount-only)
- `src/lib/permit/**`, `places-rest.ts`, `places.ts`
- `src/routes/index.tsx`, new civic homepage
- `vendor/kept/_out/**`, `vendor/kept/kits/**` (read-only)
- `package.json`, lockfile, live gevradio
- `votes.json` (any iso, including `_template`)
- KIT-04/06/07 files

### Load budget (I)

| Eager | atlas.json, capitals.json (coords only), packages/_index.json, 33× packages/{iso}.json (~65 KiB) |
| Lazy | fat members/meta/parties **for the open desk only** |
| Never | votes.json (~339 MiB), 501 as a globe graph, Rest places, live harvest fetch |

---

## Specialist briefs (prep files only — they write `docs/dev-team/<NN>-*.md`)

Do not implement. Do not invent roster names.

| Seat | File | Job |
| --- | --- | --- |
| 11 atlas join | `11-atlas-join.md` | Confirm 196 / 33 / 163; true-set equality vs kit dirs vs `_index`; 3 non-UN; leftover `ca.json`/`kr.json`/`us.json`. |
| 12 members honesty | `12-members-honesty.md` | claimed vs items table; empty five; no pad; unnamed-seat UI copy; do not paste name lists. |
| 13 capitals | `13-capitals.md` | 194 delayed NE; nr+ps omit; 33/33 kits join; case-fold; **plot later, not now**. |
| 14 us-kit shape | `14-us-kit-shape.md` | package vs fat; 437 vs 435; votes count 849 / claimed 1878 as a hole string; no vote body. |
| 22 streams | `22-streams.md` | KIT-07 depends on KIT-03. Max 8. Co-occurrence ≠ identity ≠ score. **Out of this kit.** |
| 23 501 | `23-501.md` | 199 / 215 / 17. No influence. Not a LEG pin. Lazy counts only. |

---

## Do-not (this sitting and KIT-03)

- Do not implement KIT-03 before KIT-02 DeskDrawer exists.
- Do not plot capitals while LEG is off / this sitting.
- Do not mint more than one `Contact` per country.
- Do not pin members, votes, PACs, or Rest.
- Do not pad the 163 into fake-complete kits.
- Do not invent sitting names, whip marks, donors, lobby clients, or awards.
- Do not load `votes.json` into the HUD or into this model beyond mtime/head/bytes.
- Do not compute an influence score. Do not color desks by PAC+award+seat.
- Do not iframe keptglobal / hivepermitdev. Do not restyle cream.
- Do not enable Streams/compare (KIT-07).
- Do not merge scoring sermons into RadioDeck.
- Do not print investigator legal names, skill brands, FROGNET/GOYNET, Layer-0.

---

## E / I / A (seat verdict)

**E.** Atlas 196 = 33 kits + 163 holes. Capitals 194 delayed, nr+ps omitted, 33/33 kits join. Packages 33/33 PASS remaining 0. Gold kit dirs match. DeskDrawer and `src/lib/kept/` absent. LEG LayerId exists, default off, no engine branch. Canada 338/343 named is on disk. votes.json is huge; 501 has no influence key.

**I.** KIT-03 is a 33-contact delayed LEG layer plus a fat-kit adapter inside the KIT-02 drawer, with a 196-row A–Z list that leaves 163 empty. Capitals.json is the lat/lon source, not a 194-desk claim. Package JSON is the holes strip, not the roster.

**A.** Chamber parcel coordinates, live register drift after retrieve 2026-08-20/29, and whether operators will later want hollow markers on the 163 are out of this sit. Default: no hollow pins.

**Tri-state (contract quality):** **PASS** — later KIT-03 can load without guessing.  
**Tri-state (implement now):** **NO-GO** — wait for KIT-02.

Stop.
