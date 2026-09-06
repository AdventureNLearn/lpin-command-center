# SEAT 11 — ATLAS JOIN (KIT-03 prep)

Target class: public-suite. Tree: this app. Corpus: `vendor/kept/_out/` + `vendor/kept/kits/` dirs (names only). Bots PARK.
Seat writes this file only. Disk mined 2026-08-29. No network. Did not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, `package.json`, or live grok.me.
Did **not** load `votes.json` (any kit). Did not glob kit objects into a roster.

Claim under audit: atlas `kit_on_disk` **33 true / 163 false** joins 1:1 to `packages/_index.json` and to `vendor/kept/kits/{iso2}/` dirs.
KIT-03 prep claim: dashboard must **not** stub the 163.

---

## E — Evidence

Join key: lowercase `iso2` (`^[a-z]{2}$`). Authority this sitting: `_out/atlas.json` flags + `_out/packages/_index.json` inventory + on-disk kit **directories** (exclude `_template`).

### Parse

| Source | Path | Bytes | Shape | Kit-ready | Holes |
| --- | --- | ---: | --- | ---: | ---: |
| atlas | `vendor/kept/_out/atlas.json` | 38842 | array n=**196**, unique iso2 **196** | **33** `kit_on_disk: true` | **163** `kit_on_disk: false` |
| packages index | `vendor/kept/_out/packages/_index.json` | 11074 | object, wave `PACKAGE-TZ` | `kit_on_disk_count` **33**, `rows` 33, all `kit_package`+`permit_package` PASS | `remaining_count` **0** |
| kit dirs | `vendor/kept/kits/` | — | dirs, not a JSON array | **33** iso2 dirs + `_template` | none of the 163 false iso2 have a dir |
| kit packages | `vendor/kept/_out/packages/{iso}.json` | — | 33 files | **33** | 0 unexpected extras |
| permit packages | `vendor/kept/_out/packages/{iso}-permit.json` | — | 33 files | **33** | 0 unexpected extras |
| fills | `vendor/kept/_out/packages/{iso}-fill.json` | — | 12 files (index `extras`) | overlay, not a 34th kit | 21 of 33 have no fill |

33 + 163 = 196. 193 `un_member: true` + 3 false (`ps`, `tw`, `va`) = 196. `tw` is the only non-UN row that is kit-ready.

Atlas row keys (196/196): `iso2`, `name`, `un_member`, `kit_on_disk`, `source_url`, `retrieved`. No lat/lon. Duplicate iso2: 0. Empty names: 0. Non-boolean `kit_on_disk`: 0. `retrieved`: all `2026-08-29`. Index `generated_at`: `2026-08-29T22:22:28.283Z`. Packages dir: **79** files = 33 + 33 + 12 + `_index.json`. Other names: 0.

### Join (set equality)

True iso2 (33), identical across atlas-true / index `kit_on_disk` / index `rows[].iso2` / kit dirs excl `_template` / `{iso}.json` / `{iso}-permit.json`:

`ar au br ca cl cn de eg es fj fr gb gh id il in it jp ke kr mx ng nl nz ph pl th tr tw tz ua us za`

| Diff | Count |
| --- | ---: |
| atlas true − index `kit_on_disk` | **0** |
| atlas true − index `rows[].iso2` | **0** |
| atlas true − kit dirs (excl `_template`) | **0** |
| atlas true − `{iso}.json` | **0** |
| atlas true − `{iso}-permit.json` | **0** |
| kit dir not atlas true | **0** |
| atlas false with kit dir | **0** |
| atlas false with `{iso}.json` | **0** |
| `_template` in atlas | **0** (correctly excluded) |

Every one of the 33 kit dirs has `meta.json` (presence only). Filename listing (contents not loaded): `committees.json` / `ethics.json` / `gap.json` / `institutional.json` / `issues.json` / `members.json` / `meta.json` / `money.json` / `parties.json` / `pledges.json` / `sources.json` / `votes.json` present on **33/33**. Extra objects on **5** dirs only (`cl fj nl th tz`): `filers.json`, `lobby.json`, `orgs.json`. `votes.json` **filename** present 33/33; **file not opened**.

### 163 false iso2 (honest holes)

`ad ae af ag al am ao at az ba bb bd be bf bg bh bi bj bn bo bs bt bw by bz cd cf cg ch ci cm co cr cu cv cy cz dj dk dm do dz ec ee er et fi fm ga gd ge gm gn gq gr gt gw gy hn hr ht hu ie iq ir is jm jo kg kh ki km kn kp kw kz la lb lc li lk lr ls lt lu lv ly ma mc md me mg mh mk ml mm mn mr mt mu mv mw my mz na ne ni no np nr om pa pe pg pk ps pt pw py qa ro rs ru rw sa sb sc sd se sg si sk sl sm sn so sr ss st sv sy sz td tg tj tl tm tn to tt tv ug uy uz va vc ve vn vu ws ye zm zw`

None of these have `vendor/kept/kits/{iso2}/` or `packages/{iso}.json`. Same six atlas keys as true rows. They are listed desks without a legislature kit, not missing files to invent.

`un_member: false` inside this 163: `ps` (State of Palestine), `va` (Holy See). `tw` (Taiwan) is kit-true, not in the 163.

### Extra kits-root JSON leftovers

`Get-ChildItem` files at `vendor/kept/kits/` (not directories): **3**. No other root files.

| File | Bytes | iso2 | `kit` | `incomplete` | Parallel dir | In atlas true? |
| --- | ---: | --- | --- | --- | --- | --- |
| `ca.json` | 1002 | ca | scoring | true | `kits/ca/` yes | yes |
| `kr.json` | 1247 | kr | scoring | true | `kits/kr/` yes | yes |
| `us.json` | 788 | us | scoring | true | `kits/us/` yes | yes |

These are leftover scoring-card JSON beside existing dirs. `local_members` on all three is `[]`. Atlas `kit_on_disk` describes **directories**, not these files. They are not a 34th / 35th / 36th country kit. KIT-03 join must not treat them as fat kits and must not count them as extra iso2.

`_template/` is a 34th **directory**, not a country. Template objects exist (`members.json`, `votes.json`, …). Do not copy `_template` onto the 163.

Kit-dir tmp dirt (not a join miss; filenames only): `de/gap.json.tmp`, `es/votes.json.apply-tmp`, `id/votes.json.tmp`.

Index `extras[]`: 12 fill files (`kind: "fill file (not kit_package)"`) for `br ca cn de fr gb it kr pl tw ua us`. Not leftover kits-root JSON. Fill absence on the other 21 ready isos is a hole, not a fail of this join.

### Dashboard today does not stub the 163

`src/lib/intel/corpus.ts` eager-imports `atlas.json` + `packages/_index.json` only. `kitsOnDisk` = index `kit_on_disk_count` (33). `atlasRows` = atlas length (196). Honesty line: `` `${atlasRows - kitsOnDisk} atlas rows have no kit on disk` `` → **163**. `CorpusPanel` renders `33 / 196` and that hole list. No `vendor/kept/kits` import in `src/`. No loop minting empty kits / `_template` copies / leftover `ca.json|kr.json|us.json` as country packs. No `votes.json` load.

That is the honest card. KIT-03 must keep it.

---

## I — Inference

The three inventories agree. Coverage is **33 ready / 163 hole / 196 listed**. ARCHIVE “34 kit folders” is stale: 33 iso dirs + `_template`, plus three leftover scoring files that are not dirs.

A dashboard that draws 196 tiles (or KIT-03 country `Contact`s) can attach a fat kit only when **both** `atlas.kit_on_disk === true` **and** `vendor/kept/kits/{iso2}/` exists. The other 163 stay **honest empty** (`name`, `iso2`, `un_member`, `kit_on_disk: false`, `source_url`). Filling them from `_template`, leftover scoring cards, US objects, or invented members/pledges/votes would turn holes into fakes.

Leftover `kits/ca.json|kr.json|us.json` are dirt on already-true isos. They do not close any of the 163. Do not glob `kits/*.json`. Do not glob `kits/` from the app for inventory — `_index.json` + atlas flags are the roster.

KIT-03 is country contacts (≤ ~200; capitals file is 194 delayed points), not member pins and not a votes table. `packages/{iso}.json` is the index/holes strip. Fat roster later reads kit objects **except** this sitting already forbade `votes.json`. Opening `votes.json` is out of KIT-03 first paint.

---

## A — Action (KIT-03 later sitting; this seat does not implement)

1. **Join, do not stub.** Walk atlas 196. Ready = 33 true ∩ kit dir ∩ package row. Hole = 163 false. Never mint a kit, never copy `_template`, never clone US/CA/KR cards onto a false iso2.
2. **Ready path.** `kit_on_disk === true` and `vendor/kept/kits/{iso2}/` exists → one country `Contact` (kind `legislature`) on `capitals.json` / package `capital` if present. Names as filed from fat `meta.json` / `members.json` / `parties.json` / `pledges.json` / `sources.json` when that sitting loads them. Visible hole if a seat is unnamed.
3. **Hole path.** Else → atlas fields only. Empty roster. Empty drawer. No invented sitting names.
4. **Ignore leftovers.** Do not import `vendor/kept/kits/ca.json`, `kr.json`, `us.json`. Do not count `_template`. Do not treat tmp (`*.tmp`, `*.apply-tmp`) as objects.
5. **Do not load `votes.json`.** Not for the HUD, not to populate the 163, not to “complete” the 33. Package `holes[]` already cards vote incompleteness.
6. **Keep the card.** `33 / 196` and `163 atlas rows have no kit on disk` stay true even after country markers exist. LEG default off. No member pins. No 16k Rest pins.
7. **Inventory source.** `packages/_index.json` + `atlas.json`. Do not glob `kits/` from the app. Do not use stale `vendor/kept/index.json` claimed scoring/roster counts.

Out of this seat: no `src/` edits, no `_out` edits, no kit writes, no KIT-03 code.
