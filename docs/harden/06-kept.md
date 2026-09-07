# SEAT H06 — KEPT HONESTY

Seat: **H06 KEPT HONESTY** · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
This sitting writes **this file only**. No `src/` edits. No `_out/` rewrite. No `kits/` rewrite.

Probe: `src/lib/kept/desks.ts`, `src/lib/kept/roster.ts`, `src/lib/intel/globeEngine.ts` `loadLegislatures`, plus the call sites that consume them (`flatEngine`, `commands.ts`, `DeskDrawer.tsx`). Gold kits: **metadata + empty `members.json` only**. **Did not load `votes.json` bodies** (any iso, including `_template`).

---

## Confirm (this sitting)

| Claim | Disk | Verdict |
| --- | --- | --- |
| Hard cap **33** civic desks | `keptDesks()` walks atlas `kit_on_disk` ∩ capital point, then `slice(0, 33)`. Globe + phone plot that array only. | **PASS** |
| **163** holes not plotted | `keptAtlasHoles()` is A–Z text in the drawer. No `leg-` entity, no flyTo, no `setDesk` from the hole list. | **PASS** |
| Empty kits honest | Five on-disk kits (`cl fj nl th tz`) have `items: []`. Contact meta = `no sourced roster`. Roster hole = `No sourced sitting names on disk. Seat left empty.` No invented names. | **PASS** |
| `matchKeptDesk` will not steal **tokyo** | Bare `tokyo` never calls it (P0 flyTo). Capital substring needs `q.length >= 4` **and** a unique hit, so `to` / `tok` / `kyo` miss. `open tokyo` is KIT-05 capital-exact → `jp`, not the KIT-00 place token. | **PASS** |

**Tri-state:** **PASS** — LEG can light 33 delayed country contacts without padding the 163, without minting empty-kit deputies, and without eating the KIT-00 `tokyo` fly.

---

## E — Evidence (this tree, this sit)

### 1. Cap 33

`keptDesks()` (`src/lib/kept/desks.ts`):

1. Eager-import `atlas.json` + `capitals.json` + `kits/*/meta.json` (not members, **not votes**).
2. Skip any atlas row with `kit_on_disk` falsy.
3. Skip any true row with no capital point (iso2 case-fold).
4. One `KeptDesk` per remaining row.
5. **`return out.slice(0, 33)`**.

Node join this sitting (atlas + capitals + kit dirs + meta; no vote bodies):

| Inventory | n |
| ---: | ---: |
| atlas rows / unique iso2 | **196 / 196** |
| `kit_on_disk: true` | **33** |
| `kit_on_disk: false` | **163** |
| kit dirs excluding `_template` | **33** |
| `_index.json` `kit_on_disk_count` / `rows` / `remaining_count` | **33 / 33 / 0** |
| true ∩ kit dir mismatch | **0** |
| extra kit dirs | **0** |
| true rows missing a capital | **0** |
| desks before slice | **33** |
| desks after `slice(0, 33)` | **33** |

True iso2 set equals kit dirs equals atlas-true:

`ar au br ca cl cn de eg es fj fr gb gh id il in it jp ke kr mx ng nl nz ph pl th tr tw tz ua us za`

`un_member: false`: `ps` (hole), `tw` (in the 33), `va` (hole).

`loadLegislatures` (`globeEngine.ts`): `purgeExtras("leg-")`; if LEG off, `count: 0` and return; if on, one billboard per `keptDesks()` with id `leg-{iso2}`, kind from `keptContact`, icon `icons.desk`. Layer detail: `` `${desks.length} kits on disk` ``. Subscribe fires **only** when `layers.legislatures.on` flips. Store default: `{ on: false, count: 0, freshness: "off" }`. Not called at boot. Phone `flatEngine` uses the same `keptDesks()` list (`leg-{iso2}`, kind `legislature`). No second walk of `capitals.json` (194 points). No member pins.

`keptContact`: one `Tracked`, `id: leg-{iso2}`, `kind: "legislature"`, `freshness: "delayed"`, `source: "Kept harvest / public registers"`. `named === 0` → meta `no sourced roster`; else `{named} of {seats} named`.

Click `leg-` → `setDesk({ system: "kept", id: iso2 })`. OverlayHud “Open desk” strips `leg-` the same way. That iso2 is already a plotted kit.

### 2. 163 holes are listed, not plotted

`keptAtlasHoles()`: atlas rows with `!kit_on_disk`, `{ iso2, name }`, name-sort. **163** on this disk (sample: Andorra, United Arab Emirates, Afghanistan).

`DeskDrawer` `KeptAtlas`: “Kits on disk” are **buttons** (enable LEG, `setDesk` that iso, `flyTo` capital). “Listed without a kit” is `<li>{h.name}</li>` — **no** `onClick`, **no** `flyTo`, **no** `setDesk`.

A hole iso in `KeptBody`: `keptDeskByIso` is null (lookup is `keptDesks().find`) → copy **“Listed without a kit on disk.”** `loadKeptRoster` with no `kits/{iso}/members.json` loader returns the same hole string, `items: []`, `named: 0`, `claimed: 0`.

Commands: `matchKeptDesk` searches **only** the 33 desks. `open andorra` / `open ad` do not mint an `ad` kit (Andorra is a hole; see §4 for the `ad` substring quirk). Holes stay empty.

Capitals.json still has delayed points for most of the 163. **Those points are not entities.** 194 − 33 = **161** sourced capitals stay off the globe until a kit exists. `nr` and `ps` have no capital row; they are already in the 163.

Do not mint `_template` onto false rows. `_template` is a 34th directory, not an atlas iso. `keptDesks` never iterates the glob keys as countries.

### 3. Empty kits honest (five of the 33, not of the 163)

`kit_on_disk: true` and `members.json` `items: []`:

| iso2 | members bytes | file iso2 | `meta.counts.members/sitting` | `meta.seats` | Globe meta | Drawer count | Roster hole after lazy load |
| --- | ---: | --- | --- | ---: | --- | --- | --- |
| cl | 36 | cl | 0 / 0 | 155 | Camara de Diputados · no sourced roster | 0 of 155 named | No sourced sitting names on disk. Seat left empty. |
| fj | 56 | fj | 0 / 0 | 0 | Parliament of Fiji · no sourced roster | 0 of 0 named | same |
| nl | 34 | nl | 0 / 0 | 0 | Tweede Kamer · no sourced roster | 0 of 0 named | same |
| th | 34 | **xx** leftover | 0 / 0 | (absent → 0) | Legislature · no sourced roster (`chamber` empty → default) | 0 of 0 named | same |
| tz | 34 | tz | 0 / 0 | 0 | National Assembly · no sourced roster | 0 of 0 named | same |

`cl/members.json` entire file: `{ "iso2": "cl", "items": [] }`. Same empty shape for `nl` / `tz`. `fj` adds `incomplete: true`. `th` still has template `iso2: "xx"` — a **kit-file hole**, not a 163 hole. Loader keys by path `/kits/th/members.json`, ignores the leftover `"xx"`, still returns empty items. Does **not** backfill Thai names.

`loadKeptRoster` skips blank `name`. Does not pad `items` to `claimed_seats` or `meta.seats`. Vacancy copy when claimed > named: `{n} named of {claimed} seats. Vacancies not invented.` Chile has no `claimed_seats` on the members file, so claimed falls back to `items.length` (0); the empty-items sentence wins. Chile’s **155** is meta chamber size on the count line, not 155 invented deputies.

These five **are plotted** when LEG is on (they are kits). Honest empty inside a true kit ≠ missing kit. Click still opens the drawer with the hole sentence and no `<ul>` of names (`roster.items.length > 0` is the only name list).

Fat kits lazy-load `members.json` only for the open iso2 (`import.meta.glob` without `eager`). This seat did not dump those name arrays. `src/` has **zero** `votes.json` imports.

### 4. `matchKeptDesk` vs tokyo

Matcher (`desks.ts`): trim + lower + strip trailing `?.!`; reject `q.length < 2`; then iso2 exact among the **33**; then exact `name` **or** `capitalName`; then unique `name.includes(q)` or (`q.length >= 4` and `capitalName.includes(q)`). Ambiguous includes → `null`.

JP on disk: name `Japan`, capitalName `Tokyo` (capitals.json `JP`, lat 35.686963, lon 139.749462, delayed NE). Preset `nrt` is also labeled Tokyo but at Narita 35.772, 140.3929 (`locations.ts`). Two Tokyos; different coords.

Simulated matcher this sitting (same rules, 33 desks):

| query | result |
| --- | --- |
| `tokyo` / `Tokyo` | **jp** (exact capitalName) |
| `japan` / `jp` | jp |
| `to` / `tok` / `kyo` | **null** (capital includes gated at length 4) |
| `toky` | jp (length ≥ 4, unique capital includes) |
| `austin` `lax` `jfk` `heathrow` `singapore` `dubai` `sydney` `iss` `new york` `nyc` `nrt` | **null** |
| `andorra` | **null** (hole, not a desk) |
| `open tokyo` as the query string | **null** (verb is not stripped inside the matcher) |

Parser (`commands.ts`) is what strips the verb:

- `score the sitting in {q}` / `take me to the chamber in {q}` / `compare {a} and {b}` / `open {q}` (after empty-desk phrases) call `matchKeptDesk` on the **remainder**.
- If that returns null, `open {q}` **falls through**. Later: generic flyTo `take me to|fly to|go to|show me|open|jump to|navigate to`, then coords, then the **bare-place list** `tokyo|austin|lax|jfk|heathrow|singapore|dubai|sydney|iss|new york|nyc`.

So:

| Phrase | Calls `matchKeptDesk`? | Action |
| --- | --- | --- |
| `tokyo` | **no** | `{ type: "flyTo", q: "tokyo" }` — KIT-00 P0 |
| `yo tokyo` | no | unknown (Grok residual; do not patch here) |
| `fly to tokyo` / `show me tokyo` / `go to tokyo` | no | flyTo remainder |
| `open tokyo` | **yes** (`q=tokyo`) | `{ type: "keptOpen", iso2: "jp" }` — KIT-05 `open {capital}` |
| `open japan` | yes | keptOpen jp |
| `take me to the chamber in tokyo` | yes | keptOpen jp (chamber phrase, intentional) |

Bare `tokyo` is **not** stolen. Short prefixes of Tokyo do **not** unique-match Japan. `open tokyo` opening the Japan desk is capital-exact grammar, not the P0 place token. Other P0 bare places (`austin`, `singapore`, `sydney`, `dubai`, `nyc`) are not capital names of the 33, so `open austin` still falls through to flyTo.

`src/` does not import `votes.json`. This sitting did not parse vote bodies.

---

## I — Inference

- Nested honesty: **196 listed → 33 kits on disk (cap) → 28 fat rosters + 5 empty seeds**. Remaining-0 on `_index` means the 33 are packaged, not 196/196.
- LEG on draws **≤ 33** delayed country billboards. Empty kits still get one capital contact; the drawer tells the truth. The 163 never become `leg-` ids.
- Names exist only after `loadKeptRoster` for an open kit iso2, and only as filed. Globe labels are country names. No 16k member pins. No influence score in this path.
- `slice(0, 33)` is a hard cap if atlas-true ever exceeds 33; today the join is exactly 33 so the slice does not drop a kit.
- Matcher is desk-scoped. It cannot plot a hole. It can open a kit by country, iso2, or unique capital. That is why `open tokyo` is Japan and `tokyo` is still Narita flyTo.

---

## A — Not verified here

- Live UN / chamber drift after kit retrieve 2026-08-20/21 and capitals retrieve 2026-08-29.
- Parcel-accurate Diet / Commons coordinates (NE city points only).
- Whether operators later want hollow pins on the 163. Default on disk: **no**.
- Full fat `members.json` name lists (not dumped). `claimed_seats` vs items on the 28 fat kits (prior seat 12 table; not re-counted as a name dump).
- `votes.json` completeness / clerk totals (package holes only; bodies not loaded).
- Browser smoke that `tokyo` still flies with LEG on (parser order is on disk; this seat did not run Playwright).
- `open london` → GB desk (London is GB capital; `london` is not on the bare-place list). Sibling of tokyo, not a P0 token.

---

## Side notes (honest, not a fail of the four claims)

- **`open ad`:** `name.includes("ad")` with no minimum length uniquely hits **Canada** among the 33. Andorra stays a hole (`keptDeskByIso("ad")` is null). Not a tokyo steal; do not treat as a kit for `ad`.
- **Chile count line vs globe meta:** drawer prints `0 of 155 named` from `meta.seats`; billboard prints `no sourced roster` because `named === 0`. No names minted.
- **US over-claim:** meta `seats` 435, `counts.members` 437 → `{named} of {seats}` = `437 of 435 named`. Both numbers as filed; not trimmed, not padded with senators.
- **`th` iso2 `"xx"`** in members (and historically votes head): leftover template. Empty items. Do not backfill.

---

## Do-not

- Do not plot the 163. Do not copy `_template` or US objects onto false iso2.
- Do not invent sitting names for `cl fj nl th tz` or for vacancy gaps (`ca` 338/343, etc.).
- Do not load `votes.json` into the HUD, the matcher, or this model beyond mtime/head/bytes.
- Do not pin members, 501 nodes, or Rest from Kept.
- Do not compute an influence score.
- Do not put `matchKeptDesk` in front of the bare-place list. Do not drop `tokyo` from that list to “fix” `open tokyo`.
- Do not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, or `package.json` from this seat.

---

## Sources (read, not rewritten)

| Path | Use |
| --- | --- |
| `src/lib/kept/desks.ts` | Cap 33, holes export, matcher, `keptContact` |
| `src/lib/kept/roster.ts` | Lazy members; empty / vacancy hole strings; no votes glob |
| `src/lib/intel/globeEngine.ts` | `loadLegislatures` plots `keptDesks()` only; LEG default off |
| `src/lib/intel/flatEngine.ts` | Same 33 marks on phone |
| `src/lib/intel/commands.ts` | Civic `open` / chamber / compare vs bare `tokyo` flyTo |
| `src/components/desks/DeskDrawer.tsx` | Hole list is text; empty kit body has no name `<ul>` |
| `vendor/kept/_out/atlas.json` | 196 / 33 / 163 flags (no lat/lon) |
| `vendor/kept/_out/capitals.json` | JP `Tokyo` delayed point; 194 total, not a plot set |
| `vendor/kept/kits/{cl,fj,nl,th,tz}/members.json` | Entire empty files |
| `vendor/kept/kits/{cl,fj,nl,th,tz,jp}/meta.json` | counts / seats / chamber; no roster dump |
| `docs/dev-team/02-lead-kept.md`, `11-atlas-join.md`, `12-members-honesty.md` | Prior contract this seat checks against live `src/` |

**E.** Atlas 196 = 33 kits + 163 holes. `keptDesks` caps at 33 and joins 33/33. `loadLegislatures` draws that list only. Five empty kits say empty. Bare `tokyo` is flyTo; matcher does not see it.

**I.** Honesty is nested counts plus empty copy, not a 196-pin globe.

**A.** Live registers and parcel coords stay out of band.

Stop.
