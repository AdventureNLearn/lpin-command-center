# LEAD 06 CORPUS — KIT-02 empty drawer (public-suite)

Seat: LEAD 06 CORPUS. Coordinator: Host Grok Build.
Target class: public-suite. Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`.
Date: 2026-08-29. This file only. Did not edit `src/` or `_out/`. Did not load `votes.json`.

Claim: **corpus is stable enough for KIT-02 empty drawer.**

---

## GO / NO-GO

**GO.**

The civic index is already wired. `src/lib/intel/corpus.ts` reads four `_out` files and lazy-loads 501. `CorpusPanel` is in the HUD and stays. KIT-02 is a chrome shell with `desk: null`. It does **not** need `packages/{iso}.json`. Empty-state copy is already specified. Do not wait on fills, Rest, or fat kits.

Not GO for KIT-03+ adapters, Rest pins, or per-iso package import.

---

## Nesting (do not collapse)

```
196 atlas rows          ← vendor/kept/_out/atlas.json
 └── 33 kits on disk    ← kit_on_disk true + packages/_index.json
      └── 12 fills      ← extras: br ca cn de fr gb it kr pl tw ua us
```

**12 fills ⊂ 33 kits ⊂ 196 atlas.**

| Arithmetic | Meaning | UI |
| ---: | --- | --- |
| 196 − 33 = **163** | listed without a kit | empty desk, not a stub |
| 33 − 12 = **21** | kit on disk, no fill | hole, not a fail |
| remaining_count **0** | 33/33 packaged | **not** 196/196 |

Fills: `us ca kr gb de br ua fr cn it tw pl`. HANDOFF: **no ng/tr/mx fill**. ng/tr/mx are in the 33; they are fill holes, not missing kits.

Repo-root `packages/_index.json` does **not** exist. Authority is `vendor/kept/_out/packages/_index.json`.

---

## What may read this sitting vs later

Civic JSON surface is `vendor/kept/_out/` only. Gold kits under `vendor/kept/kits/{iso}/` are later. `votes.json` is never a HUD import.

### This sitting (KIT-02 empty DeskDrawer)

| Surface | Read | Why |
| --- | --- | --- |
| `src/lib/intel/corpus.ts` `loadCorpusSummary()` | **yes** (already eager) | counts only |
| `atlas.json` | via summary | 196 / 33 / 163 |
| `capitals.json` | via summary | 194 delayed; do not plot |
| `permit-index.json` | via summary | 79 / 462 / 699 / 14925; lock 2026-08-18 |
| `packages/_index.json` | via summary | 33 iso2, remaining 0, 12 fill extras, row hole sums |
| `501-links.json` | **corpus panel only, lazy** | not DeskDrawer |
| `CorpusPanel` | **stays** | HUD index; not DeskDrawer |
| Store `corpusOpen` | stays | do not reuse for `desk` |

KIT-02 store (new, separate flag):

```
desk: null | { system: "kept" | "permit"; id: string }
```

Default **null**. File: `src/components/desks/DeskDrawer.tsx` (does not exist yet). Right-side dark panel. Esc closes. Mobile = bottom sheet **above** the command bar. Globe stays mounted. Not a route. Not the Layers rail. Not CorpusPanel.

When `desk === null`, render empty-state copy. Do not resolve iso2. Do not import a package file.

### Later (not KIT-02)

| Kit | Surface | Read later | Still never |
| --- | --- | --- | --- |
| **KIT-03** KeptAdapter | fat `vendor/kept/kits/{iso}/members.json`, `meta.json`, `parties.json`, `pledges.json`, `sources.json`; optional `_out/packages/{iso}.json` as **index/holes strip only** | yes, after empty drawer | `votes.json` in HUD; invented sittings; member pins |
| **KIT-03** atlas miss | atlas row only (`name`, `iso2`, `un_member`, `kit_on_disk: false`) | honest empty | stub kit |
| **KIT-04** PermitAdapter | `places.ts` + extra + more **after Rest import is split** | typeahead Core/Extra/More | `places-rest.ts` on first paint; `places.ts` **today** still concatenates Rest — split first |
| **KIT-04** permit package | `{iso}-permit.json` as country-native count card | optional footnote | treating US AHJs as world AHJs |
| **KIT-05** | civic grammar `open korea`, `find AHJ in …` | later | stealing `corpus` / `desks` in KIT-02 |
| **KIT-06** | zoom-gated Rest | opt-in after search/county camera | 16,165 / 14,925 pins |
| fills | `{iso}-fill.json` | hole-detail pane | “country finished” |
| 501 | already lazy in CorpusPanel | stay counts + `holes[].what` | node-name dump, donors, influence score |

### Forbidden every sitting

- `packages/{iso}.json` from KIT-02
- `{iso}-permit.json` / `{iso}-fill.json` from KIT-02
- `vendor/kept/kits/**/votes.json`
- `src/lib/permit/places-rest.ts` (and current `places.ts`, which pulls Rest)
- live gevradio remix; skill brands; invented members/donors/fees
- iframe keptglobal / hivepermitdev
- unmounting Cesium for a desk homepage

---

## KIT-02 must NOT load `packages/{iso}.json`

`corpus.ts` already obeys this. Static imports are only:

- `vendor/kept/_out/atlas.json`
- `vendor/kept/_out/capitals.json`
- `vendor/kept/_out/permit-index.json`
- `vendor/kept/_out/packages/_index.json`

No glob. No `packages/us.json`. Per-iso kit JSON is object counts + holes for **KIT-03 index strip**, not an empty drawer. Loading one iso “just to populate the header” is how KIT-02 becomes KIT-03.

Seat 11 load-usability listed eager `{iso}.json` as a later smoke option. **Override for KIT-02:** do not. Inventory is `_index.json`.

---

## Corpus panel stays. Lazy 501 stays.

Already shipped (read-only this seat):

- `src/components/intel/CorpusPanel.tsx` — OverlayHud aside; `show corpus` / Esc
- `loadCorpusSummary()` at render
- `load501Summary()` = `await import(".../501-links.json")` on panel open (not module top)
- 501 UI: nodes / edges / fec / usaspending / hole **what** lines. No names.

KIT-02 does not replace, hide, or merge this panel. Opening DeskDrawer should close comms/radio/layer rail/corpus the same way other decks already mutex. Corpus button and `corpusOpen` remain.

501 expected after lazy load: **199 nodes · 215 edges (186 fec / 29 spending) · 17 holes**. WAVE-501 US PASS. Not an influence score.

---

## Empty-state copy (KIT-02 `desk === null` and honest holes)

Plain civic language. No brands. No “complete.” Recommended strings (from corpus-audit 14; not yet in `src/`):

**Drawer default (no desk selected):**

> No desk selected.
> 12 ingest audits · 33 kits · 196 listed desks.
> 33 legislature kits on disk; others listed without a kit.

**Footer honesty strip (always on):**

> Rest 14925 is a count, not a map. Country kits are not US permit desks. Factory URLs not verified. Fees omitted.

**If KIT-02 later sets `desk` to an atlas iso among the 163 (still no package load):**

> Listed. No legislature kit on disk. Missing is not complete.

**If `desk` is one of the 33 with sitting 0 (cl, fj, nl, th, tz) — KIT-03, not KIT-02:**

> Kit folder on disk. Member list is empty. Sitting 0 is honest.

**If `desk` is one of the 12 fills — later hole pane:**

> Kit on disk. Ingest leftovers were left as holes; they were not turned into new rows.

**Do not say:** “196 kits,” “coverage complete,” “coming soon,” “unscored,” product/skill brands, FROGNET, GOYNET, Layer-0.

Permit tab empty (`system: "permit"`, no id):

> No building desk selected. Catalog lock 2026-08-18. Core 79 · Extra 462 · More 699 · Rest 14925 (count only).

---

## Disk evidence used (no votes.json)

| Source | Fact |
| --- | --- |
| `vendor/kept/_out/HANDOFF.md` | 33/33 PASS, remaining 0, WAVE-501 US PASS, 12 fills, no ng/tr/mx fill |
| `vendor/kept/_out/packages/_index.json` | `kit_on_disk_count` 33, `remaining_count` 0, extras 12 fills, all rows PASS |
| `docs/corpus-audit/00-SYNTHESIS.md` | Atlas 196 / 33 kits / 163 holes; 501 199/215 (186+29)/17; KIT-01 + corpus panel this sitting, not KIT-02+ |
| `src/lib/intel/corpus.ts` | eager four files; lazy 501; no `{iso}.json` |
| `src/components/intel/CorpusPanel.tsx` | HUD panel exists |
| `src/components/desks/` | **absent** — KIT-02 create target |
| repo `packages/_index.json` | **absent** |

Permit-index: core **79** / extra **462** / more **699** / rest **14925**; `rest_is_count_not_map: true`; `factory_urls_verified: false`; lock **2026-08-18**.

Capitals: **194** delayed points vs 196 atlas (unsourced omitted; NR+PS in synthesis).

---

## File-touch map for KIT-02 implementers (seats 07–10, 31)

This seat does not patch `src/`. Host / KIT-02 seats write later.

**Likely new:** `src/components/desks/DeskDrawer.tsx`

**Likely extend (chrome only):** intel store (`desk` + setter, default null); OverlayHud mount + Esc mutex; optional command `open desk` / `close desk` without loading iso JSON.

**Do not touch this sitting:** `corpus.ts` import list (keep lazy 501, keep no `{iso}.json`); `GlobeCanvas` / `globeEngine`; `places-rest.ts` / `places.ts`; `vendor/kept/_out/**`; `vendor/kept/kits/**`; `package.json`; live gevradio.

**Do not:** npm install, git push, plot capitals, enable LEG/AHJ drawing, copy harvest members.

---

## E / I / A

**E — Evidence**

- `_out` HANDOFF + `_index`: 33/33 PASS, remaining 0, 12 fill extras, WAVE-501 PASS.
- Atlas 196 / kits 33 / fills 12 nest on disk. Symmetric kit-dir vs atlas-true = 0.
- `corpus.ts` static-imports atlas, capitals, permit-index, `packages/_index.json` only. `load501Summary` is dynamic import.
- Grep of `src/**/*.ts(x)`: no `packages/{iso}` import. Only `_index.json`.
- `CorpusPanel` mounts from OverlayHud; `corpusOpen` default false.
- No `src/components/desks/`.
- `votes.json` not opened this seat.

**I — Inference**

- Empty drawer needs chrome + copy + a null desk pointer. Index counts already in `loadCorpusSummary()`. Per-iso package JSON adds object-key drift (cl/fj/nl/th/tz) and is KIT-03’s holes strip, not KIT-02.
- Collapsing 12/33/196 into one “ready” number would lie. Remaining-0 is the 33, not the atlas.
- Corpus panel is the data-slot proof; DeskDrawer is the plugin-slot proof. Merging them would skip KIT-02 later or pretend smoke was the drawer.

**A — Assumption**

- KIT-02 implementers will keep CorpusPanel and lazy 501, and will not “warm” `{iso}.json` behind the empty state.
- `places.ts` Rest concatenation is a KIT-04 split, not a KIT-02 import.
- Operators will not treat GO-on-empty-drawer as KIT-03/04 done.

---

## Stop

KIT-02 = empty kept/permit drawers + honesty copy + 12 ⊂ 33 ⊂ 196 from the **index**. Corpus panel stays. Lazy 501 stays. **Do not load `packages/{iso}.json`.** Do not start KIT-03.
