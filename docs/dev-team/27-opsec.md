# SEAT 27 — OPSEC / SECRETS

Seat: FENCE 27 OPSEC. Coordinator: Host Grok Build.
Target class: public-suite.
Tree: `REPO_ROOT`.
Corpus: `vendor/kept/_out/` (HANDOFF 2026-08-29; WAVE-501 US AUDIT PASS; packages 33/33 PASS).
Date: 2026-08-29. This file only. Did not edit `src/`, `_out/`, or `kits/`.

Hard-rules: no secrets in git/`_out`. No API key values printed here. FeedUnlock localStorage = occupancy only. KIT-02 UI must not render permit exclusion city lists. Live `gevradio.grok.me` is not this tree (D-251).

---

## Verdicts

| Gate | State |
|------|--------|
| `_out` `sk-` / `Bearer` values | **PASS** — occupancy 0 |
| FeedUnlock localStorage in tree | **occupancy only** — no values |
| KIT-02 UI may render permit exclusion city lists | **must not** (drawer not shipped; gate binds) |
| (b) live gevradio | **no** |
| Localhost field-gated smoke (counts + holes) | **yes**, if KIT-02 keeps the gate |

**Promote:** localhost yes (field-gated). Live gevradio **no**.

---

## 1. `_out` secret scan — occupancy

Scope: **90** files under `vendor/kept/_out/` (json/md). Disk only. No network. Values not copied.

| pattern | hits | files | occupancy |
|---|---:|---:|---|
| `sk-[A-Za-z0-9_-]{8,}` | 0 | 0 | empty |
| `sk_live_` / `sk_test_` | 0 | 0 | empty |
| `Bearer` | 0 | 0 | empty |
| `Authorization` | 0 | 0 | empty |
| `AVIATIONSTACK_ACCESS_KEY` (any) | 0 | 0 | empty |
| `xai-` long / `gsk_` / `AKIA` / PEM private / JWT `eyJ…` | 0 | 0 | empty |
| `api[_-]?key\s*[:=]` | 0 | 0 | empty |
| `localStorage` | 1 | 1 | policy line, not a dump |

`localStorage` occupancy: `vendor/kept/_out/PASTE-FOR-ANL-FEEDS.md` line 38 — “Confirm no API keys, tokens, or localStorage dumps appear in `_out/`”.

Aviationstack occupancy (identifier only, no values): `FEED-AUDIT.md` line 14; `PASTE-FOR-ANL-FEEDS.md` lines 16 and 39.

HANDOFF: “No kit dumps. No names. No secrets. No host-runbook.” FEED-AUDIT: “no key dumps in `_out`: policy mentions only … no values copied.”

**Secret scan: PASS.** Zero `sk-` values. Zero `Bearer` values.

---

## 2. FeedUnlock localStorage — occupancy only

No API key values appear in `FeedUnlock.tsx` comments, `feedKeys.ts` comments, or `_out`. Occupancy:

| slot | occupancy |
|------|-----------|
| `src/lib/intel/feedKeys.ts` | one `localStorage` key name; five empty-string fields; `getItem` + `setItem` |
| `src/components/intel/FeedUnlock.tsx` | form bound to those five fields; password inputs for secrets; **0** comments with values |
| `OverlayHud.tsx` | mounts `<FeedUnlock />` in the layers rail |
| `vendor/kept/_out/` | 1 policy mention of `localStorage`; 0 dumps |
| git / STATUS / AUDIT | policy: keys stay in browser / process env, never here |

Runtime occupancy is the operator’s browser only. This seat did not read, print, or copy those values.

---

## 3. KIT-02 UI must not render permit exclusion city lists

KIT-02 target: `src/components/desks/DeskDrawer.tsx`. **Absent** today (`src/components/desks/` does not exist; intel store has no `desk` pointer). Corpus HUD is not the drawer.

Current HUD (`CorpusPanel` + `loadCorpusSummary`) reads atlas / capitals / permit-index / `_index.json` and lazy-loads 501 **counts**. It does **not** import `packages/{iso}-permit.json` and does **not** render `notes[]`.

On-disk fail mode is **display**, not a private-data leak. All 33 `*-permit.json` files carry `notes` (4 strings each). Long `notes` occupancy (chars, no city text dumped here):

| iso2 | notes_chars | why long |
|------|------------:|----------|
| th, tz | 2112 each | US AHJ slug exclusion lists |
| fj | 1947 | same |
| cl | 751 | same |
| nz, nl | 601 / 592 | named US cores / name collisions |
| gh, ph, mx | 474 / 388 / 362 | slug or name exclusions |
| il, in, ar | 306 / 311 / 381 | exclusion **counts** only |

Country-native `counts` on those packs are **0/0/0/0** except `us` (79/462/680/14855). `holes[].reason` is the honest sentence (iso2 ≠ US state code; no invented AHJs). `notes[0]` is the anti-collision audit trail and **must not** be pasted into product UI.

**KIT-02 bind (seats 07–10, 31):**

- Do not render `notes[]` from `packages/{iso}-permit.json`.
- Do not list excluded US city/county slugs, named cores, or `fl-*` / `co-*` / `tx-*` / `tn-*` style tokens.
- Empty drawer may show index counts + honesty strip already specified by LEAD 06 (`Rest 14925 is a count, not a map. Country kits are not US permit desks.`).
- Do not load `packages/{iso}.json` or `*-permit.json` to populate an empty drawer (LEAD 06). Permit **counts** live on `permit-index.json`.
- KIT-04 later: search Core/Extra/More; still do not dump Rest; still do not dump exclusion `notes`.

---

## 4. Live gevradio — **no**

D-251 binds. `ARCHIVE.md`: this tree is a new app; live `https://gevradio.grok.me` is **not** remixed and is **not** the write target. `HANDOFF.md`: “Do not merge into live gevradio.” `vendor/kept/OPSEC.md`: live remix at keptglobal.grok.me is not this tree until promote + OPSEC gate.

`src/` has **0** `gevradio` string hits. Radio presets stream public Exclusive Radio URLs, not gevradio.

Do not push `upstream`. Do not treat localhost KIT-02 as a host deploy.

---

## E / I / A

**E — Evidence**

- 90 `_out` files scanned 2026-08-29: `sk-` occupancy 0; `Bearer` occupancy 0; `localStorage` occupancy 1 policy line.
- FeedUnlock / `feedKeys.ts`: no key values in comments; five empty default fields; password inputs; `_out` has no dumps.
- 33 permit packs on disk; `notes` char occupancy peaks on th/tz/fj (2112/2112/1947); CorpusPanel does not import those files.
- `src/components/desks/` absent. KIT-02 not shipped.
- `ARCHIVE.md` / `HANDOFF.md` / `vendor/kept/OPSEC.md`: live gevradio not this tree. `src/` gevradio hits 0.

**I — Inference**

- Secrets fail mode for this sitting is **copying browser keys into `_out` or markdown**, not a key already in the corpus.
- Municipality names in permit `notes` are collision logs. Rendering them in KIT-02 would still put US city lists in public-suite UI.
- An empty DeskDrawer that only shows index counts cannot leak those lists; loading `*-permit.json` “just for honesty” would.

**A — Assumption**

- KIT-02 implementers follow LEAD 06 (no `{iso}.json` / `*-permit.json` on the empty drawer) and this gate (no `notes[]` city lists).
- Smoke does not scrape, does not copy env/localStorage keys into `_out`, and does not publish this tree to gevradio.
- This seat does not prove git index vs working tree; occupancy is disk content.

---

## Close

VERDICT: **PASS** on secrets occupancy; **NO** on live gevradio; KIT-02 **must not** render permit exclusion city lists.

E/I/A: **E** for the scan and the absent drawer. **I** that KIT-02 stays safe only if `notes[]` stay off-screen.
