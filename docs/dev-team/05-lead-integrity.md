# LEAD 05 — INTEGRITY

**Seat:** Lead 05 Integrity  
**Target class:** public-suite  
**Tree:** `REPO_ROOT`  
**Write:** this file only. No `src/`. No `_out/`. No `kits/`.  
**Specialists:** 26 fence `src`, 27 secrets/OPSEC, 30 refuse list  
**Kernel:** `<HOST_TREE>/HARD-RULES.md` §1. Corpus: `docs/corpus-audit/10-opsec.md`. UI: `src/components/intel/CorpusPanel.tsx`.

This sitting is doctrine for implementers (KIT-02 next; KIT-03+ later). Do not ship around it.

---

## Promote

| Surface | Verdict | Basis |
|---------|---------|-------|
| localhost `:8080` smoke | **yes** (field-gated) | E — CorpusPanel already counts-only; 10-opsec lift condition |
| live `https://gevradio.grok.me` | **NO** | E — `ARCHIVE.md` D-251; `_out/HANDOFF.md` “Do not merge into live gevradio”; `vendor/kept/OPSEC.md` |

Localhost may bind `_out` **counts + honest holes + delayed 501 integers**. Live gevradio is not a write target, not a remix, not an iframe, not a deploy of this tree.

**Quarantine (corpus-as-dashboard):** lifted **only while** the UI stays field-gated. Ungated `notes[]` / host paths / fill diaries / operator markdown / Rest pins **re-quarantines** the public surface.

---

## Integrity kernel (must survive every kit)

From HARD-RULES §1.3. Non-negotiable on the public door.

1. **Tri-state only where claims are scored:** Supported / Unproven / Disputed (`+1` / `0` / `−1`). Do not invent a fourth “pretty much” state.
2. **Basis kinds:** Evidence / Inference / Assumption. Label them. Do not launder I/A as E.
3. **Clean-share / readiness gates** block a false complete picture.
4. **Primary records beat commentary.**
5. **Human final call.** Software never auto-truths.
6. Prefer honest **“we do not know yet.”**
7. **No private PII** in samples or demos.

§1.1 Geographic agnosticism: **no municipality names** in product UI, samples, demos, packs, or public docs. State / national is fine. Users type their own locality freeform. Exception on disk (not for raw UI): D-109 permit catalog rows and D-115 national-legislature catalog. Exclusion *lists of US cities used as iso2 anti-collision notes* are **catalog-adjacent audit trails**, not product samples — **hide them**.

§1.2 Public vs operator: plain civic tooling on the door. Skill brands, multi-agent theater, confessional / political framing stay private.

§1.5 Secrets: no keys, tokens, OAuth in git, UI, or chat exports.

---

## Tri-state claims (this tree, 2026-08-29)

Score only these. Do not pad with extra scored claims.

| Claim | State | Score | Basis |
|-------|-------|-------|-------|
| CorpusPanel copy is counts + holes; does not dump permit `notes` city lists, 501 node names, or host paths | **Supported** | +1 | **E** — `CorpusPanel.tsx` + `corpus.ts` |
| LEG / AHJ registered, default **off**, no civic pins this sitting | **Supported** | +1 | **E** — `types.ts` `LAYER_META`, `store.ts` `defaultLayers()`, OverlayHud `LAYER_ORDER` |
| Permit Rest is a count, not a map (14925) | **Supported** | +1 | **E** — `permit-index.json` `honesty.rest_is_count_not_map: true` |
| 501 graph is public filings, not an influence score | **Supported** | +1 | **E** — panel copy + 17 holes; WAVE-501 PASS |
| No skill brands in `src/` product strings | **Supported** | +1 | **E** — scan: no AOS / Sub8 / Eagle Eye / FROGNET / GOYNET / Layer-0 / gevradio / keptglobal / CoS |
| No secrets in `_out` JSON/MD | **Supported** | +1 | **E** — seat 09 + 10-opsec secret regex |
| localhost smoke OK if field-gated | **Supported** | +1 | **E/I** — panel already gated; 00-SYNTHESIS promote |
| live gevradio remix / overwrite | **Disputed** as a product action (forbidden) | **−1** | **E** — D-251. Treat any later kit that opens live gevradio as a write target as a **stop** |
| Corpus can back a public dashboard with raw pack `notes[]` | **Disputed** | **−1** | **E** — fj/cl/nz (and kin) enumerate US AHJ slugs |
| Empty KIT-02 drawer is a selected civic desk | **Unproven** until copy is the honest placeholder | **0** | **A** — drawer does not exist yet (`src/components/desks/` absent) |
| Country-native AHJs for zero-count iso2 | **Unproven** (honest zero) | **0** | **E** — permit packs `counts` 0/0/0/0 + hole “no invented AHJs” |
| Sitting rosters for cl / fj / nl / th / tz | **Unproven** (members 0, no invented roster) | **0** | **E** — kit packs |
| 163 atlas rows without kits are “coming soon complete” | **Disputed** | **−1** | **E** — `kit_on_disk: false`. Padding is a kernel fail |

Human final call on every scored civic sentence. Prefer the hole over a filled blank.

---

## UI-safe vs internal-only fields

Bind the **left** column in product UI. The **right** column stays on disk for audit. Loaders that `JSON.parse` a pack must **project** — never `JSON.stringify` the file into a panel.

### Atlas / kit index (`atlas.json`, `packages/_index.json`, `packages/{iso}.json`)

| UI-safe | Internal-only |
|---------|----------------|
| `iso2`, country `name`, `un_member`, `kit_on_disk` | `_index.json` `extras[].paths` (reject absolute `C:\AOS\...`) |
| `kit_on_disk_count` (33), `remaining_count` (0), atlas row count (196) | Fill-file `log[]` leftover URL diaries (`*-fill.json`) |
| `objects.*.state`, `objects.*.count` | Operator chrome in HANDOFF / STATUS / PASTE / REACH / AUDIT*.md |
| Object-level `holes[].reason` (counts, “items 0”, “no invented roster”) | Fat `vendor/kept/kits/{iso}/members.json` **name arrays** until KIT-03 + human review |
| National capital `name` / lat / lon from kit pack or `capitals.json` (`kind: capital`, `freshness: delayed`) | Invented sittings for empty kits; whip marks; donor names |

**Do not** treat `_out/packages/{iso}.json` as a substitute for fat `votes.json` / `members.json`. Index ≠ roster.

### Permit index + permit packs

| UI-safe | Internal-only — **hide** |
|---------|--------------------------|
| `counts.core` / `extra` / `more` / `rest` | `notes[]` strings that enumerate US AHJ **slugs or named US cities** as iso2 exclusions |
| `lock_date` (`2026-08-18`) | `permit-index.json` `catalog_paths` (relative only; never `C:\AOS\...`) |
| `honesty.rest_is_count_not_map` (true) | `places-rest.ts` rows / ids / GeoJSON / pin arrays |
| `honesty.factory_urls_verified` (false) | Expanding “rest N” into a pin list |
| `honesty.fees_invented` (false); “fees omitted” | Fee tables |
| Hole `reason` at object level: country ≠ US state code; **no invented AHJs**; counts stay zero | Pasting `notes[0]` onto a dashboard |
| `us-permit` **counts** (core 79 / extra 462 / more 680 / rest 14855) as a US-slice footnote, labeled as such | Treating US-only counts as the global card (global more 699 / rest 14925) |

**Exclusion city lists — hide, do not render, do not copy into UI fixtures.**

Mined in `docs/corpus-audit/10-opsec.md`. Pattern: country iso2 pack vs US AHJ catalog; country-native counts **0/0/0/0**.

| Pack | Leak shape | Public UI |
|------|------------|-----------|
| `fj-permit` | ~100 `fl-*` AHJ slugs + rest count | **hide list**; counts 0 + hole sentence |
| `cl-permit` | `co-*` AHJ slugs + rest count | **hide list** |
| `nz-permit` | named US cores (NY/NJ/NM/NH collision) + state counts | **hide named cores** |
| `il-permit`, `in-permit`, `ar-permit` | exclusion **counts** only (no slugs) | **partial** — state-level counts OK; do not expand |
| Same pattern (not the six-pack, still a gate): `gh-permit`, `nl-permit`, `ph-permit`, `th-permit`, `tz-permit`, `mx-permit` | slug / named-US-place exclusions | **hide lists** |

**Recommend for every permit pack in UI:** show `counts.*` (often all zero) + the **honest hole** sentence. Never `notes.join(" ")`. Never a `<details>` that dumps slugs “for power users.”

KIT-04 typeahead (later) may show a **user-typed** locality that hits CORE/EXTRA/MORE catalog rows (D-109). That is not permission to print the anti-collision exclusion lists. Rest stays out of first paint.

### 501 delayed filings (`501-links.json`)

| UI-safe (localhost, delayed layer) | Internal-only / never invent |
|------------------------------------|------------------------------|
| Integers: nodes **199**, edges **215**, fec **186**, usaspending **29**, holes **17** | Node/edge **name dumps** on the smoke card |
| `holes[].what` (omit-reasons already on file) | 990 Part VII officer names, FEC Form 1 treasurer names, FEC IND persons, 501(c)(3) Sch B, c4/c5/c6 donors, addresses |
| Committee/PAC **legal names** + `source_url` only if a later kit explicitly opens a **delayed public-entity** layer (not smoke) | `place_of_performance` expanded to city/street (file has state/congress/country only — keep it that way) |
| `member_id` **only when already joined** to kit bioguides | Minting names for the 51 unjoined candidate committees |
| Copy: **“Public filings. Not an influence score.”** | Scoring language, influence meters, “captured” rhetoric |

Municipal **org** award recipients exist on the graph (local governments). Delayed public-entity nodes, **not** D-109 permit pins, **not** product samples. Smoke stays counts + hole list (current CorpusPanel). Do not plot them as AHJ.

### Capitals / globe

| UI-safe | Internal-only / forbidden |
|---------|---------------------------|
| Count 194 delayed capital points; hole vs 196 atlas (nr, ps omitted) | Plotting capitals while LEG is off |
| Label: delayed, not parcel-accurate, **no permit pins** | Member pins; 16k Rest desks; GeoJSON dump |
| LEG/AHJ **off** until a later kit draws under budget | `globeEngine` subscribe that walks `_out/capitals.json` or `places-rest.ts` on layer flip |

---

## CorpusPanel copy (lock this honesty)

Current panel (`src/components/intel/CorpusPanel.tsx`) is the public-suite reference. KIT-02+ must not regress it.

**Keep:**

- Kicker **Corpus**. Sub: **“Delayed archive · not live hosts.”**
- Kits `kitsOnDisk / atlasRows` (33 / 196).
- Capitals **“N delayed points”** — not “live cities.”
- Permits **core / extra / more / rest as counts**. Lock date.
- Fills: record count + missing-fill note (`no ng/tr/mx fill`).
- 501: `nodes · edges (fec / spending) · holes`. **“Public filings. Not an influence score.”**
- **Honest holes** list from `summary.holes` (rest is a count; factory URLs unverified; country kits are not US permit desks).
- Closing hole: **“Legislature and permit layers start off. Nothing from this panel is plotted.”**
- Fail copy: **“Archive did not load. Globe stays up.”** — globe survival > corpus chrome.

**Do not add to this panel:**

- Permit pack `notes[]`.
- 501 node/edge names.
- `catalog_paths` / `C:\AOS\...`.
- Skill brands, bot names, gevradio, keptglobal, hivepermitdev.
- A pin button. A “load Rest” control. An iframe.

Loader (`src/lib/intel/corpus.ts`) already projects counts. Keep it a projector. Do not pass through raw pack JSON.

---

## Skill brands — never list (public UI)

Public copy = plain civic tooling: legislatures, permits, corpus, honesty holes, delayed, off.

**Refuse in UI, toasts, first-run, command hints, OG title, footers, radio copy:**

| Class | Examples (operator chrome — do not print) |
|-------|-------------------------------------------|
| Machine / skill | AOS, AOS brain, Sub8, Eagle Eye, Layer-0 |
| Swarm / theater | FROGNET, GOYNET, CoS, Grok Build, ANL bot names, seat numbers as product nav |
| Live remix hosts | gevradio, `gevradio.grok.me`, keptglobal, `keptglobal.grok.me`, hivepermitdev |
| Investigator legal names | any |
| Pattern-lab | multi-agent theater, confessional / political framing |

**Allowed as catalog source attribution only** (already in `LAYER_META`, do not expand into nav):

- LEG source: `Kept harvest / public registers` (delayed).
- AHJ source: `Permit Harbor catalog (locked 2026-08-18)` (delayed).

Do not turn “Kept” / “Permit Harbor” into toolbar brands, splash, or footers. Do not iframe those hosts as “integration” (`docs/corpus-audit/13-drawer-contract.md`).

Radio stays **music**. Do not merge scoring language into tuner copy.

OG `src/lib/og/site.json` title **Grok's Eye View** is the public app name. Do not add skill chrome there.

KIT-00 first-run is **frozen** (four cards). Do not add civic first-run cards that name municipalities as product samples. Existing intel fly-tos (command hint `yo tokyo`, first-run corridor) are not a license to add civic city samples.

---

## KIT-02 placeholder copy (honest empty desk)

KIT-02 is `src/components/desks/DeskDrawer.tsx` — **one panel, two adapters, empty this kit.** Store: `{ desk: null | { system: "kept" | "permit"; id: string } }`. Right-side cockpit chrome. Esc closes. Mobile = bottom sheet that **does not cover the command bar**. Globe stays mounted. Not a new route.

**When `desk === null` (the whole of KIT-02):**

| Slot | Copy (use exactly or shorter) | Forbidden substitutes |
|------|-------------------------------|------------------------|
| Header | `Desk` | skill brands; “Hive”; “Layer-0”; host URLs |
| Tabs (visible, empty) | `Legislature` · `Building` | “KeptGlobal”; “Permit Harbor” as tab titles |
| Body | **`No desk selected`** | “Select Korea”; a default iso2; a fake roster; “Loading 196 desks…” |
| Honesty strip | `Empty drawer. Nothing plotted.` | “Complete coverage”; influence scores; “all AHJs loaded” |
| Empty-search | `Type a place. Nothing is selected yet.` | Prefill with a municipality sample |
| Error | `Desk did not load. Globe stays up.` | Silent empty that looks like zero sittings scored |

**Do not:**

- Invent a selected desk so the drawer looks finished.
- Render permit `notes[]` “while empty” as flavor text.
- Show 163 atlas holes as a clickable city list.
- Auto-select `us` because it has the most rows.
- Parse `desks` / `building desk` in KIT-01 (already reserved). KIT-02 owns `{ type: "desk" }` when it exists.

KIT-03/04 fill the adapters **behind** this placeholder. Until then the honest sentence **“No desk selected”** is the product.

---

## Block list — later kits that would violate

If a later kit does any row below, **stop the kit**. Do not “just this once.” Escalate to Working Document / this lead. Specialists 26 / 27 / 30 treat these as refuse + fence fails.

| ID | Violation | Kits most likely to hit it | Stop condition |
|----|-----------|----------------------------|----------------|
| B01 | Render permit exclusion **city/slug lists** (`notes[]` on fj/cl/nz/gh/nl/ph/th/tz/mx, or any new pack that copies the pattern) | KIT-02 flavor, KIT-04 search “debug”, KIT-05 command echo | Hide lists. Counts + hole sentence only |
| B02 | Dump Rest (14925) as pins, GeoJSON, or first-paint import of `places-rest.ts` / current `places.ts` (concatenates Rest) | KIT-04, KIT-06 | Rest is a count until zoom-gated opt-in; split the import first |
| B03 | Remix / overwrite / iframe **live gevradio** (or keptglobal / hivepermitdev as the integration) | any “ship it” kit, KIT-07+ PWA | D-251. localhost only |
| B04 | Skill brands in UI (table above) | all | Public civic language only |
| B05 | Invent sitting names, pledges, yeas, donors, lobby clients, awards | KIT-03, KIT-05, 501 follow-ons | Members-0 kits stay empty; named_donors stays false |
| B06 | Pad 163 `kit_on_disk: false` atlas rows into stub-complete kits | KIT-03 “fill the globe” | Show nested **12 / 33 / 196** (or 33 / 196 + 163 holes). Do not mint |
| B07 | Auto-truth / auto-score (skip human final call; hide Unproven) | KIT-05 compare, streams | Tri-state + E/I/A on scored claims |
| B08 | Secrets in UI, git, `_out`, toasts (keys, Bearer, localStorage dumps, Sub8) | FeedUnlock copy-paste, KIT-07 | OS/user secret store only |
| B09 | Host paths `C:\AOS\...` in product | any index pretty-printer | Strip `catalog_paths` / `extras[].paths` |
| B10 | Fill-file per-member leftover URL diaries on a dashboard | KIT-03 “sources” | Internal-only |
| B11 | 501 as an **influence score**; dump Sch B / IND / 990 officers / addresses | 501 layer kits | Counts + “not an influence score”; delayed public-entity only |
| B12 | Civic pins while LEG/AHJ off; member pins; capital loop > ~194 | KIT-01 regression, KIT-03, KIT-06 | Default off. KIT-03 ≤ ~200 country contacts. No member pins |
| B13 | New homepage / route that unmounts Cesium; command bar covered; radio/comms stolen | KIT-02 drawer, KIT-07 | Globe + R + G + `/` survive |
| B14 | `npm install` / `package.json` churn / `git push` / upstream groks-eye-view as a write | any | Out of scope this program |
| B15 | Operator markdown (HANDOFF, STATUS, PASTE-FOR-ANL-FEEDS, REACH, AUDIT*) surfaced as UI | corpus “advanced” | Internal-only |
| B16 | Municipality names as **product samples** (demos, placeholders, OG, first-run civic cards) | KIT-04 typeahead fixtures, KIT-05 grammar docs in UI | User types freeform. Catalog hit may show the matched D-109 row; do not seed the box with a city |
| B17 | Fence breach: bots/`src` writes; rewrite `votes.json` / `members.json` | all | Seat 09 fence. PARK. Report, do not revert from this band |

KIT-00 residuals (`yo tokyo` without Grok parse; Windows `npm run dev` ENOENT) are **not** integrity blocks and **not** drive-by fixes.

---

## Specialist jobs (26 / 27 / 30)

Write only your `docs/dev-team/<NN>-*.md`. Confirm or tighten this lead. Do not edit `src/` or `_out/`.

### 26 — fence `src`

- Reconfirm: this 32-seat wave does **not** write `src/`. Newest civic-touch files are host KIT-01 (`legislatures` / `permits` in types, store, OverlayHud, commands) plus CorpusPanel — already on disk.
- Fail if a sibling seat’s diff opens a `globeEngine` / `flatEngine` civic pin loop, imports `places-rest.ts`, or creates `src/components/desks/` **this wave** (KIT-02 is next implement, not this lead band).
- Fence held = `_out`-only corpus + docs/dev-team comms. Kit `votes.json` / `members.json` remain frozen (newest 2026-08-21 per seat 09).

### 27 — secrets / OPSEC

- Re-scan `_out` for `sk-` / Bearer / PEM / JWT / `AVIATIONSTACK_ACCESS_KEY=` values / localStorage dumps. Policy mentions without values are OK.
- Reconfirm FeedUnlock keeps secrets in the browser, never in `_out` or git.
- Municipality gate: any UI path that prints permit `notes[]` or Rest ids is an OPSEC fail even if “the catalog already has them.”
- Host-path gate: `catalog_paths` / extras `paths` never in DOM.

### 30 — refuse list

- Publish the B01–B17 table (or a strict superset) as the implementer refuse list.
- Include the skill-brand never-list and the KIT-02 **“No desk selected”** copy.
- Include: no live gevradio; no iframe of keptglobal / hivepermitdev; no invented sittings; no Rest first paint; no 16k pins; no auto-truth.
- If a later kit brief contradicts this list, the refuse list wins until Working Document says otherwise.

---

## E / I / A

**Evidence**

- HARD-RULES §1.1–1.5: no municipality names in public UI; public vs operator chrome; tri-state + E/I/A; human final call; no secrets.
- `docs/corpus-audit/10-opsec.md`: fj/cl/nz `notes` enumerate US AHJ slugs or named cores; il/in/ar counts-only; 501 has no address fields; five members-0 kits honest; secrets 0; skill brands 0 in `src/`; localhost yes field-gated; live gevradio no.
- `CorpusPanel.tsx`: delayed archive copy; permit counts not notes; 501 integers + “not an influence score”; holes include “nothing from this panel is plotted.”
- `corpus.ts`: projector over atlas / capitals / permit-index / `_index`; lazy 501 counts; no `notes[]` pass-through.
- `permit-index.json`: 79 / 462 / 699 / 14925; `rest_is_count_not_map: true`; `factory_urls_verified: false`; `catalog_paths` are relative repo paths (never `C:\AOS\...`).
- `_index.json` `extras[].paths`: relative fill-file paths — reject absolute `C:\AOS\...`.
- `ARCHIVE.md` / HANDOFF / `vendor/kept/OPSEC.md`: this tree is a new app; do not remix live gevradio / keptglobal until promote + OPSEC gate.
- `LAYER_META` LEG/AHJ delayed civic labels; store defaults `on: false`.
- No `src/components/desks/` on disk. Drawer contract (`13-drawer-contract.md`) names placeholder **“No desk selected.”**

**Inference**

- Municipality names in permit `notes` are anti-collision audit trails. Showing them still violates the public-UI municipality rule.
- A pretty-printer that renders “the whole JSON” will fail B01 and B09 on the first KIT-02/04 pass.
- Honest empty drawer copy is the only KIT-02 deliverable that cannot violate civic OPSEC, because it selects nothing.
- 501 municipal org labels are public award recipients, not residential PII, and still must not become AHJ pins.

**Assumption**

- KIT-02 implementers will read this file before creating `DeskDrawer.tsx`.
- Localhost smoke will not scrape, will not copy env keys into `_out`, and will not publish this tree to gevradio.
- D-115 public-official names remain catalog-legal if later loaded from fat kits, with money still `named_donors false` and human final call.
- Specialists 26 / 27 / 30 will write refuse/fence/secrets files that **narrow**, not relax, this lead.

---

## Verdict (one line)

**Localhost yes, field-gated. Live gevradio NO. Hide exclusion city lists. No skill brands. KIT-02 says “No desk selected.” Later kits that violate B01–B17 are blocked.**

Stop. This seat does not implement.
