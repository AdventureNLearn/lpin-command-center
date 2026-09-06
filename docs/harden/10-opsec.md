# SEAT H10 — OPSEC COPY (HUD)

Seat: **H10 OPSEC COPY**. Coordinator: Host Grok Build.
Target class: public-suite.
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`.
Date: 2026-08-29. **This file only.** Did not edit `src/`, `_out/`, or `kits/`. Did not print secrets.

Surfaces scanned: `src/components/desks/DeskDrawer.tsx`, `src/components/intel/CorpusPanel.tsx`, `src/components/intel/OverlayHud.tsx` (plus the loaders they call: `corpus.ts`, `desks.ts`, `roster.ts`, `search-lite.ts`). No network.

Hard-rules: no skill brands on the door. No influence score. Factory portal URLs stay **not** verified. Do not dump permit pack `notes[]` city/slug lists. Do not paste `meta.source_live` grok.me hosts into HUD. Live `gevradio.grok.me` is not this tree (D-251).

---

## Verdicts

| Gate | State | Basis |
|------|--------|-------|
| Skill brands in DeskDrawer / CorpusPanel / OverlayHud | **PASS** — occupancy 0 | **E** |
| Influence score (meter / rank / quid) | **PASS** — denial copy only | **E** |
| Factory URLs labelled verified | **PASS** — copy is “not verified” | **E** |
| Permit pack `notes[]` city dumps in HUD | **PASS** — not imported, not rendered | **E** |
| `source_live` grok.me hosts in HUD / `src/` | **PASS** — occupancy 0 | **E** |
| (a) localhost `:8080` smoke | **yes** (field-gated) | **E/I** |
| (b) live gevradio / keptglobal / hivepermitdev | **NO** | **E** |

**Promote: localhost only.** Live remix hosts are not a write target, not an iframe, not a deploy of this tree.

Quarantine on corpus-as-dashboard stays **lifted only while** these three surfaces stay field-gated. Ungated pack `notes[]`, host paths, `source_live` URLs, or a “verified” factory badge **re-quarantines**.

---

## 1. Skill brands — occupancy 0

Never-list on product strings: AOS / Sub8 / Eagle Eye / FROGNET / GOYNET / Layer-0 / gevradio / keptglobal / hivepermitdev / CoS / ANL / kepthor / swarm names / investigator legal names (except the existing public credit).

| File | hits |
|------|-----:|
| `DeskDrawer.tsx` | 0 |
| `CorpusPanel.tsx` | 0 |
| `OverlayHud.tsx` | 0 |

**E.** OverlayHud public chrome is `GROK'S EYE VIEW`, Layers / Corpus / Comms / Radio, `LAYER_META` “Kept harvest / public registers” and “Permit Harbor catalog (locked 2026-08-18)”. Footer credit is Bilawal Sidhu’s public GitHub (required). Radio station “Eagles” lives in `radio.ts`, not these three files, and is a music preset — not Eagle Eye.

**I.** Operator chrome still exists in internal markdown (`HANDOFF.md`, `STATUS.md`, `REACH.md`, `ARCHIVE.md`). Do not surface those files from HUD.

**A.** Later kit copy that pastes harvest-host names or skill-seat chrome into a toast / kicker is a fail even if the three files stay clean today.

---

## 2. Influence score — denial only, no meter

| Surface | Copy on disk | Score UI? |
|---------|--------------|-----------|
| CorpusPanel 501 block | “Public filings. Not an influence score.” | **no** — integers + hole `what` only |
| DeskDrawer kept footer | “Delayed register. Incomplete files stay empty. Not an influence score.” | **no** |
| DeskDrawer `CompareShell` | “Streams/compare is not filled yet. Co-occurrence is not a quid. Not an influence score.” | **no** |
| OverlayHud | 0 `influence` / `score` / `quid` strings | **no** |

**E.** CorpusPanel lazy-loads 501 **counts** (`nodes · edges (fec / spending) · holes`) and hole sentences. It does not render node names, amounts, or a rank. DeskDrawer compare is two open-desk buttons, not a PAC+award+seat product. WAVE-501 JSON has 0 keys named `influence` / `score` / `quid` / `pagerank` / `centrality` (corpus-audit seat 07).

**I.** The phrase “Not an influence score” is a fence, not a score. Removing it, adding a meter, or coloring desks by filings would fail this gate.

**A.** KIT-07 streams (max 8, later) stay co-occurrence ≠ quid. Do not compute an influence score in the drawer.

---

## 3. Factory verified — must stay false

On-disk honesty: `vendor/kept/_out/permit-index.json` `honesty.factory_urls_verified` is JSON **`false`**. Must stay false. This seat does not reprint catalog portal URLs.

HUD occupancy:

| Surface | What the operator sees |
|---------|------------------------|
| CorpusPanel honesty list (via `corpus.ts`) | “Factory portal URLs are not verified; fees omitted” |
| DeskDrawer `PermitCard` | portal link + **“portal not verified”** |
| OverlayHud | no “verified” string |

`corpus.ts` **types** `factory_urls_verified` on the permit-index shape and **does not** pass the boolean into the panel. The hole string is hardcoded denial. Chips in DeskDrawer are `higher` / `mid` from catalog **layer** (`permitChip`), not HTTP 200.

**E.** No “factory verified” badge. No green liveness. Fees omitted.

**I.** Labelling extra/more portals “verified” because a `p()` URL exists would be a certified-fake portal (FEATURE_KITS P0).

**A.** Integrity tests that only check `https://` shape are not a fetch. Do not upgrade a chip after a live GET.

---

## 4. Permit `notes[]` city dumps — not on screen

Two different `notes` arrays exist. Only the **pack exclusion lists** are the OPSEC fail. Do not dump either into HUD flavor.

### 4.1 Pack `notes[]` (iso2 `*-permit.json`) — hide

Country packs carry `notes` that enumerate **US AHJ slugs or named US cores** as iso2 anti-collision logs (fj / cl / nz named or slugged; th / tz / gh / nl / ph / mx kin; il / in / ar **counts only**). Those lists are catalog-adjacent audit trails, **not** country-native AHJs, **not** D-109 product samples.

**E.** `DeskDrawer.tsx` does not import `packages/{iso}-permit.json`. `CorpusPanel` / `corpus.ts` bind `permit-index.json` **counts** (core / extra / more / rest) + lock date. OverlayHud does not read packs. `src/` has **0** `place.notes` / `notes[` / `honesty.notes` / `catalog_paths` renders.

**I.** An empty or filled drawer that `JSON.stringify`s a pack “for honesty” would put US city/slug lists on a public-suite panel.

**Bind (still):**

- Do not render `notes[]` from `packages/{iso}-permit.json`.
- Do not list excluded US city/county slugs or `fl-*` / `co-*` / `tx-*` / `tn-*` style tokens.
- Rest stays a **count** (14925), not a map. Do not dump Rest ids.
- `permit-index.json` `catalog_paths` (absolute host paths) stay internal.

This report does **not** copy those slug lists.

### 4.2 D-109 `PlaceDesk.notes[]` — also not rendered

`PermitCard` shows name, state, chip, AHJ, kind, portal (unverified), department, state pack (`modelBase` + `commonPermits` slice), playbook. It does **not** map `place.notes`. `PermitHome` featured cores and search hits are D-109 catalog rows (allowed exception for municipality names). That is **not** a pack exclusion dump.

**A.** A later “debug notes” line on the card would still be a city dump. Keep `notes[]` off-screen. Featured search remains Core/Extra/More; Rest not searched (copy already says so).

---

## 5. `source_live` grok.me — occupancy 0 in HUD

Kit `meta.json` and `vendor/kept/index.json` carry a `source_live` field. Some gold kits point at harvest/remix **grok.me** siblings. Those hosts are **not this tree** until promote + OPSEC gate (`vendor/kept/OPSEC.md`). This seat does not paste the host strings.

| Layer | `source_live` occupancy |
|-------|-------------------------|
| `src/**/*.ts(x)` | **0** |
| DeskDrawer / CorpusPanel / OverlayHud | **0** |
| `desks.ts` `MetaFile` | fields: iso2, name, chamber, seats, counts, `roster_source` — **no** `source_live` |
| DeskDrawer source link | `members.json` `source_url` (public register, e.g. congress-legislators) via `roster.ts` |
| OverlayHud tracked `source` | hardcoded “Kept harvest / public registers” (`keptContact`) |
| CorpusPanel kicker | “Delayed archive · not live hosts” |

**E.** HUD does not iframe keptglobal / hivepermitdev / gevradio. OverlayHud has **0** `grok.me` strings. FeedUnlock (mounted in OverlayHud layer rail) points at public vendor signup pages; keys stay in browser localStorage occupancy; toast: “Keys stay on this phone.” No values in comments.

**I.** Wiring `meta.source_live` as the “Source register” href would put a grok.me harvest host on the public door.

**A.** Smoke does not fetch those hosts as a write target. Do not treat localhost as a host deploy.

---

## 6. Promote

### (a) localhost — **yes**, field-gated

KIT-00 / civic HUD on `:8080` may show:

- OverlayHud globe chrome, layers default, LEG/AHJ source strings as written.
- CorpusPanel counts + honest holes + delayed 501 integers + “not an influence score.”
- DeskDrawer kept roster as filed (D-115) or honest empty; permit Core/Extra/More search with “portal not verified” + `DISCLAIMER`.

No secrets in these files. No pack city lists. No `source_live` hosts. Members-0 kits stay empty. Do not npm-install extra, do not `git push`, do not dump Rest pins.

### (b) live gevradio — **NO**

D-251 binds. `ARCHIVE.md`: this tree is a new app; live `https://gevradio.grok.me` is **not** remixed and is **not** the write target. HANDOFF: “Do not merge into live gevradio.” `vendor/kept/OPSEC.md`: live remix at keptglobal is not this tree until promote + OPSEC gate.

`src/` has **0** `gevradio` hits. Do not iframe keptglobal or hivepermitdev as the integration.

---

## E / I / A

**E — Evidence**

- Three HUD files scanned 2026-08-29: skill-brand occupancy 0; `grok.me` / `source_live` occupancy 0; OverlayHud `verified` occupancy 0.
- Influence language is three denial sentences (CorpusPanel + DeskDrawer footer + CompareShell). No meter.
- Factory copy is “not verified” / “are not verified.” `factory_urls_verified` stays false on the index and is not shown as true.
- Pack `notes[]` not imported. `PermitCard` does not render `place.notes`. Corpus projector uses counts + hardcoded holes, not `catalog_paths`.
- DeskDrawer exists and is mounted from OverlayHud after CorpusPanel. Adapters are live; the notes gate still holds.
- `ARCHIVE.md` / HANDOFF / `vendor/kept/OPSEC.md`: live gevradio not this tree.

**I — Inference**

- Fail mode is **display**, not a secret already in git: pasting pack `notes[]`, `source_live`, or a verified-factory badge would put operator/harvest chrome and US city lists on a public-suite UI.
- Denial copy (“not an influence score”, “portal not verified”, “not live hosts”) is load-bearing. Deleting it without adding a stronger fence is a regression.
- Featured D-109 cores in the building desk are catalog-legal; pack exclusion lists are not.

**A — Assumption**

- Later kits keep projecting: counts + holes + public-register `source_url` / `roster_source`. They do not bind `source_live`, pack `notes[]`, fill diaries, or `_out` operator markdown.
- Smoke does not scrape, does not copy env/localStorage keys into `_out` or this file, and does not publish this tree to gevradio.
- This seat does not prove git index vs working tree; occupancy is disk content of the named HUD files and their loaders.

---

## Close

VERDICT: **PASS** on the five HUD gates. **Promote localhost only** (field-gated). **NO** on live gevradio / keptglobal / hivepermitdev.

E/I/A: **E** for occupancy 0 on brands, `source_live`, pack `notes[]`, and verified-factory claims in the three surfaces. **I** that the gate holds only while those fields stay off-screen.
