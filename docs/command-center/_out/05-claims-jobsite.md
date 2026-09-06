# 05 — LPIN Claims & Jobsite

**Product:** LPIN · **UI:** this tree (Command Center) · **Records SoT / method:** https://lpin-v2-map.grok.me  
**This file only.** No `src/` · no iframe · no LPIN git merge · no 16k pins · no municipality samples.

## Verdict: **GO** to fold (Host / KIT-20). Honest hole until packs exist.

Live host stays method/SoT for Claims & Jobsite **records**. This cockpit copies the method onto GEV glass. Do not iframe `lpin-v2-map`. Do not swap `/`. Trees stay unmerged (`09-LPIN-BASELINE.md`, `10-PACK-LPIN.md`).

## Disk (one adapter, mixed label today)

| Piece | Evidence |
|-------|----------|
| Pack constructor | `src/lib/jobsite/packs.ts` — `lookupPack` → `hole:{locality}`, `rows: []`, `incomplete: true`. “Nothing is on disk.” |
| Honesty | `JOBSITE_HONESTY` = Guidance only. Not a live claims desk. Incomplete packs stay empty. `JOBSITE_EMPTY` = We do not have that pack yet. |
| Drawer | `DeskDrawer.tsx` `JobsiteBody` — type → `normalizeJobsiteQuery` (80) → `setDesk({ system: "jobsite", id })`. Footer = honesty. Title today is always **Jobsite desk**. |
| Layer | `store.ts` `jobsite` `{ on: false, count: 0 }`. `LAYER_META.jobsite` = User-typed pack. No first-paint dump. `globeEngine.ts` has **no** jobsite branch. |
| Commands | `open jobsite desk` / `open claims desk` / `{name}` → same `system: "jobsite"`. `show`/`hide jobsite` (and claims without desk) = layer only. |
| Civic refs | `CIVIC_REFS` already: `lpin-claims` kicker **Claims** → `jobsite`/`claims`; `lpin-jobsite` kicker **Jobsite** → `jobsite`/`""`. |
| Card hole | `InsightCard` / `CommsChat` kicker always **Jobsite**. `honesty.ts` score 0 · evidence · “honest hole”. |

`src/lib/packs/lpin/` does **not** exist. KIT-10 is the adapter. Do not fork a second homepage.

## Fold: two labeled kickers, same `JobsiteBody`

Reuse `packs.ts` + `JobsiteBody`. Public mouth never says “LPIN” as a mixed kicker (`06-LABELS.md`).

| Kicker | When | Surface | Layer | Score |
|--------|------|---------|-------|-------|
| **Claims** | `open claims desk` · ref `lpin-claims` · desk.id `claims` or typed claim | **file** | none (no claims pin layer) | Yes only on a sourced row; hole = no score |
| **Jobsite** | `open jobsite desk` · `show jobsite` · ref `lpin-jobsite` | pack header + rows or empty | `jobsite` default **off**, orbit **0** | Pack rows only; empty = no score |

Host wire (not this seat): card / peek / chat / drawer header take the kicker from command or `CIVIC_REFS`, not a single “Jobsite desk” for claims. Footer stays `JOBSITE_HONESTY` until a sourced pack exists. Cross-lane link may change kicker (Learn / Building desk); unlabeled mix is a defect.

## Hole until packs exist

Typed locality → header + empty list. Do not invent claims. Do not pin. Look here only if the **user** typed a resolvable place — never a jobsite pin, never a sample muni.

```
system: "jobsite"     // existing union; labels split in chrome
desk: { system: "jobsite", id }   // "claims" | "" | normalizeJobsiteQuery
layer: "jobsite"      // Jobsite only; Claims stays drawer-only
source: JOBSITE_HONESTY
```

## Commands / kill

`show claims` · `open claims desk` · `show jobsite` · `hide jobsite` · `open jobsite desk` [`{name}`]  
P0: close desk / hide jobsite. Do not unmount Cesium. Do not steal radio.

## P0 refuse

Iframe lpin-v2-map · merge `LPINsuite_v2` · first-paint dump · Tutor minting Supported on a Claims card · auto-zoom · IDWT.
