# SEAT 10 — OPSEC / PROMOTE READINESS

Target class: public-suite.
Tree: `REPO_ROOT`
Corpus: `vendor/kept/_out/` (HANDOFF 2026-08-29; WAVE-501 US AUDIT PASS; packages 33/33 PASS).
Bots: PARK. This seat writes this file only.

Hard-rules applied: no municipality names in product samples/packs/**public UI**, except Permit catalog data (D-109) and Kept national-legislature catalog (D-115). No PII. No secrets. No skill brands in public UI. Live `gevradio.grok.me` is not this tree (D-251).

---

## Verdicts

| Gate | State |
|------|--------|
| (a) localhost smoke | **yes** (field-gated; see UI table) |
| (b) live gevradio | **no** |
| Corpus can back a localhost intelligence dashboard without OPSEC fail | **quarantine** |

No secrets, no private-person PII, no invented sitting names in `_out` packs. Fail mode is **display**: some permit `notes` enumerate US AHJ city/county slugs as exclusions. That is catalog-adjacent (D-109), not a leak of private data, and **not safe to render raw in a public dashboard**.

---

## 1. Sample permit packages — exclusion city lists

Mined: `vendor/kept/_out/packages/{fj,cl,il,in,ar,nz}-permit.json`. All six are country iso2 packs against the US AHJ catalog. Country-native counts are **0/0/0/0**. Holes say no invented AHJs. `notes` also say rest is a count, not a map; no pin list; no GeoJSON.

| Pack | US city names listed as EXCLUSIONS? | What the notes actually hold | Public-dashboard safe? |
|------|--------------------------------------|------------------------------|------------------------|
| `fj-permit` | **yes** | FL mistaken for FJ. Enumerates **100** `fl-*` AHJ slugs (core 12 / extra 32 / more 56) plus rest **238** as a count (338 total). | **No** — hide slug list |
| `cl-permit` | **yes** | CO mistaken for CL. Enumerates **26** `co-*` AHJ slugs (core 1 / extra 11 / more 14) plus rest **115** (141 total). | **No** — hide slug list |
| `il-permit` | **counts only** | IL-as-Illinois excluded: core 1 / extra 12 / more 19 / rest 381. No city slugs. | **Partial** — state + counts OK; do not expand |
| `in-permit` | **counts only** | IN-as-Indiana excluded: core 1 / extra 7 / more 12 / rest 192. No city slugs. | **Partial** — same |
| `ar-permit` | **counts only** | AR-as-Arkansas excluded: core 1 / extra 7 / more 9 / rest 369. No city slugs. | **Partial** — same |
| `nz-permit` | **yes** | NY/NJ/NM/NH mistaken-prefix exclusions. Core **5 named** US AHJs (incl. unslugged Buffalo label) plus extra/more/rest as **state counts** (rest 1783). | **No** — hide named cores |

Catalog-adjacent: the lists exist so iso2 collision is auditable. They are **not** D-109 product samples of those countries, and they **are** US municipality names inside a pack.

**Recommend:** hide exclusion city/slug lists in UI. Show `counts` (all zero for these iso2) + the **honest hole** sentence (country ≠ US state code; no invented AHJs). Do not paste `notes[0]` onto a public dashboard.

Same pattern exists outside the six-pack (not required, still a UI gate): `gh-permit` (NH slugs), `nl-permit` (US places named Holland/Nederland), `ph-permit` (two PA cores named), `th-permit` and `tz-permit` (111 TX/TN slugs each), `mx-permit` (NM + US towns named Mexico, names only). `us-permit` is D-109 counts (core 79 / extra 462 / more 680 / rest 14855) with rest **not copied** — UI-safe as counts; do not dump rest pins.

---

## 2. `501-links.json` — delayed filing graph

File: `vendor/kept/_out/501-links.json` (iso2 `us`; nodes **199** = committee 166 + org 33; edges **215** = fec contributed 186 + usaspending granted 29; holes **17**; WAVE-501 PASS).

Committee names are public US FEC entities (party committees, PACs, candidate committees). **OK for delayed layer. Not a municipal leak.**

Residential-looking name scan:

- **No** street / apt / email / phone / SSN / donor-address fields on nodes or edges.
- `place_of_performance` is `{state_code, congressional_code, country_name}` only — no city, no street.
- Holes explicitly omit: 990 Part VII officer names, FEC Form 1 treasurer names, FEC IND itemized persons, 501(c)(3) Sch B, c4/c5/c6 donors, addresses. `named_donors false` is not the omit reason.
- `member_id` joins only to bioguides **already in** `kits/us/members.json` (84 committee nodes joined; 51 candidate committees unjoined). **No new sitting names.**
- First-name committee titles (`MARIE FOR CONGRESS`, `JASMINE FOR US`, `NELLA FOR SENATE`, …) are FEC legal names, not private persons.

**Flag (municipal org nodes, not residential PII):** six USAspending recipients are local governments — `COUNTY OF MAUI`, `CITY OF CHICAGO`, `CITY OF MILWAUKEE`, `CITY OF SANTA MONICA`, `CITY OF TORRANCE`, `MARLBORO CITY`. Public award permalinks. `MARLBORO CITY` is the only small-place label; still a Byrne JAG recipient, not a home address. Delayed layer OK. Do not treat these as D-109 permit pins or product samples.

---

## 3. `packages/*.json` kit files — sittings invented? members 0 honest?

33 kit packages. These files are **object counts + holes + one national capital**. They do **not** contain member name arrays, first/last fields, or sitting rosters.

**Members 0, honest (no invented roster):** `cl`, `fj`, `nl`, `th`, `tz` — `members.json` state `empty`, count `0`, hole `items 0; sitting 0; no invented roster`. Matching `meta.json` holes: seed / map-only seed, `sitting 0`. Pledges/votes holes: no invented pledges / yeas.

**Members filled (D-115 national-legislature counts, not invented in `_out`):** 28 kits, including the sample countries `ar` 257, `il` 118, `in` 540, `nz` 123, and `us` 437. Vacancies **not padded** where claimed_seats > items (`ca` 338/343, `cn` 2849/2977, `id` 569/580, `il` 118/120, `in` 540/543, `ke` 348/349, `mx` 496/500, `ng` 358/360, `tr` 591/600, `ua` 392/450, `za` 398/400). `ph` 317 vs claimed 316 left as a hole, not trimmed.

Sitting names are **not** present in these pack files. Capital `name` is the national capital (D-115 / capitals layer), not a municipal sample.

`named_donors false` appears across money holes and fill logs — correct omit of private donors.

Fill files (`*-fill.json`, 12) are ingest-drop diaries. `us-fill.json` `log[]` names sitting members already in the US kit plus leftover `*.house.gov` URLs that were **not** minted into pledges. That is D-115 catalog-adjacent and **internal-only** (do not render the per-member leftover diary on a public dashboard).

---

## Other OPSEC

- **Secrets:** no API keys, tokens, vault passwords, Sub8 keys, or `Bearer` dumps in `_out` json/md. `PASTE-FOR-ANL-FEEDS.md` and `FEED-AUDIT.md` state keys stay in browser/env, never in git/STATUS/AUDIT. Policy mentions only.
- **Skill brands in public UI:** none in `src/` (no AOS / Sub8 / Eagle Eye / gevradio / keptglobal / CoS). Operator chrome **does** exist in internal markdown: `HANDOFF.md`, `STATUS.md`, `PASTE-FOR-ANL-FEEDS.md`, `REACH.md` (ANL / CoS / Grok Build / gevradio / AOS / Eagle Eye as a never-list). Do not surface those files in product UI.
- **Host paths:** `permit-index.json` `catalog_paths` and `packages/_index.json` `extras[].paths` must stay relative repo paths. Absolute `C:\AOS\...` host strings are forbidden inventory (reject, do not embed).
- **Atlas / capitals:** `atlas.json` 196 countries (iso2, name, un_member, kit_on_disk). `capitals.json` 194 capital points, `freshness: delayed`, `kind: capital` only, “not parcel-accurate. No permit pins.” National capitals, not AHJ samples.
- **Pins:** rest contents not copied anywhere in `_out`. Do not dump 16k pins. Do not remix live gevradio (D-251).

---

## UI-safe vs internal-only fields

**UI-safe (localhost intelligence dashboard, delayed layer):**

- Kit pack `iso2`, `objects.*.state`, `objects.*.count`, hole `reason` (object-level).
- Permit pack `counts.*` and hole `reason` (zero + “no invented AHJs”).
- National capital `name` / lat / lon from kit packs or `capitals.json` (delayed).
- `atlas.json` country rows.
- `501-links.json` committee/PAC names, FEC/USAspending `source_url`, amounts, years, `program_area` / `issue_id` already on the file, `member_id` only when joined. Municipal **org** award recipients as delayed public-entity nodes — not as permit pins.
- `us-permit` / `permit-index.json` **counts** (rest is a count, not a map).

**Internal-only (hide from public UI; OK on disk for audit):**

- Permit `notes` strings that enumerate US AHJ slugs or named US cities as exclusions (fj, cl, nz, plus gh/nl/ph/th/tz/mx).
- `permit-index.json` `catalog_paths` and `_index.json` `paths` if they contain absolute `C:\AOS\...` host strings (must stay relative).
- Fill-file `log[]` per-member leftover URL diaries.
- `HANDOFF.md` / `STATUS.md` / `PASTE-FOR-ANL-FEEDS.md` / `REACH.md` / `AUDIT*.md` operator chrome.
- Any rest pin / GeoJSON expansion of `places-rest.ts` (not in `_out`; do not create).
- Private-donor names (already omitted; keep omitted).
- Unjoined FEC treasurer / 990 officer / Sch B / IND person names (already holes; do not invent).

**Not in this corpus / do not invent:** country-native permit rows for zero-count iso2; sitting rosters for cl/fj/nl/th/tz; live gevradio remix.

---

## Promote readiness

### (a) localhost smoke — **yes**

KIT-00 on `:8080` may bind `_out` counts, honest holes, delayed atlas/capitals, and delayed 501 committee graph **if** permit `notes` city lists and operator markdown are not rendered. No secrets to leak. Members-0 kits stay empty. Do not npm-install extra, do not push, do not dump rest pins.

### (b) live gevradio — **no**

D-251 binds. `ARCHIVE.md`: this tree is a new app; live `https://gevradio.grok.me` is **not** remixed and is **not** the write target. `vendor/kept/OPSEC.md`: live remix at keptglobal.grok.me is not this tree until promote + OPSEC gate. HANDOFF: “Do not merge into live gevradio.”

---

## E / I / A

**Evidence**

- Six sample `*-permit.json` files on disk 2026-08-29; fj/cl/nz `notes` enumerate US AHJ slugs or named US cores; il/in/ar use exclusion **counts** only.
- `501-links.json`: 199 nodes / 215 edges / 17 holes; no address fields; municipal orgs are USAspending recipients; 51 candidate committees lack `member_id` without minting names.
- 33 kit packs: 5 members-0 with `no invented roster`; 28 filled counts; no sitting-name fields in pack JSON.
- Secret regex over `_out` json/md: no hits. `src/` skill-brand grep: no hits.
- `ARCHIVE.md` / `HANDOFF.md` / `vendor/kept/OPSEC.md`: D-251 do-not-remix.

**Inference**

- Municipality names in permit `notes` are anti-collision audit trails, not country-native catalogs. Showing them in product UI would still violate the public-doc municipality rule.
- 501 municipal org labels are public award recipients, not residential PII; still must not be reused as D-109 pins.
- Empty member kits are honest incomplete state, not a promote blocker for localhost.

**Assumption**

- A localhost “intelligence dashboard” will bind `_out` JSON rather than `vendor/kept/kits/` blobs or `places-rest.ts`.
- Smoke does not scrape, does not copy env keys into `_out`, and does not publish this tree to gevradio.
- D-115 public-official names remain catalog-legal if later loaded from kits, with money still `named_donors false`.

---

## Tri-state

**Question:** can this corpus back a localhost intelligence dashboard without OPSEC fail?

**Answer: quarantine.**

Not **no**: no secrets, no private PII, no invented sittings, 501 delayed layer is public-entity, members-0 is honest.

Not **yes**: ungated render of permit `notes` (and host-path / fill-diary / operator-chrome files) **would** put US municipality lists and skill-seat chrome in a public-suite UI.

**Lift quarantine when** the dashboard shows counts + honest holes only, keeps 501 on a delayed public-entity layer, never dumps rest pins, and never remotes to live gevradio (D-251).
