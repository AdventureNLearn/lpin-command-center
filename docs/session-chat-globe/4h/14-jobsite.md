# 4h / 14 — Jobsite (typed hole · 0 pins · Insight desk only)

**Class:** public-suite WIP · localhost · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No LPIN pack ingest. No Rest. No Inspection Index. No live gevradio.  
**4h bar (4H-PUSH):** Typed pack → honest hole. 0 pins.  
**Law:** `00-SPINE.md` Insight · KIT-10 · `09-jobsite.md`. Insind stays `14-insind-later.md`.

## Verdict: **GO** as 4h bar

Disk is already a typed hole with **0** orbit pins. The civic path is the same Insight card, **Open desk** only. Chat does not fly, pin, fill rows, or open a second homepage.

**NO-GO if:** pins appear, `lookupPack` returns rows, LPIN/IDWT merge, chat auto-`setDesk` / auto-fly, municipality samples, or `insind` joins the union.

## 4h object — desk, not Fly

```
system: "jobsite"
layer: "jobsite"
desk: { system: "jobsite", id }   // normalizeJobsiteQuery, or ""
source: JOBSITE_HONESTY
title / body: hole copy. Never a claims row.
q: omit
```

No `q`, no lat/lon on the 4h jobsite card. `InsightCard` hides **Fly** unless `q` or coord exists. **Show layer** is hidden when `desk` is set. Open desk may `setLayer("jobsite", { on: true })`; count stays **0**.

| Control | 4h jobsite |
|---------|------------|
| Bubble link | `setInsight`. No camera. No pins. No drawer. |
| **Open desk** | `setDesk({ system: "jobsite", id })`. Globe stays. `JobsiteBody` → `lookupPack`. |
| **Show layer** (rail / bar) | Layer on, count 0. Do **not** add a `globeEngine` branch. |
| **Fly** | Absent on the local card. Only if the user asked to move **and** typed a resolvable place. Never presets. Never a Grok-invented locality. |
| Dismiss | Clear card. Radio stays. |

Dark comms: `insightFromUserText` matches `jobsite|claims desk|claim pack`, calls `lookupPack`, emits `system:"jobsite"` **without** `q`. That is the 4h local card.

## Disk (do not fork, do not fill)

| Claim | Evidence |
|-------|----------|
| Typed name → honest hole | `packs.ts` `lookupPack` → `id: hole:{locality}`, `rows: []`, `incomplete: true`, title “No pack on disk”. Do not invent, pin, or merge LPIN/IDWT. |
| Query cap | `normalizeJobsiteQuery` trim, 80 chars. Empty → `null` → empty-desk prompt. |
| 0 globe entities | `globeEngine.ts` subscribe: flights…launches + LEG + AHJ. **No `jobsite`.** grep = 0. |
| Layer off, count 0 | `defaultLayers().jobsite` `{ on: false, count: 0 }`. Source: “User-typed pack. No first-paint dump.” |
| Desk | `JobsiteBody`: type → lookup → hole copy. Footer = `JOBSITE_HONESTY`. Empty id = nothing loads until you type. |
| Layer kids | `JobsiteKids`: one “Open jobsite desk”, `id: ""`. Hint: “Type a pack. No pins.” |
| Bar (not chat) | `show/hide jobsite` = layer; `open jobsite desk {name}` = drawer. Desk path does **not** `lookupPlace`. |

KIT-10 kill: `hide jobsite` / close desk. Do not unmount Cesium. Do not steal radio.

## Chat vs bar

Chat: `<<INSIGHT:{"system":"jobsite",…}>>` then the human presses **Open desk**. Do not emit `ACTION:desk` or `ACTION:flyTo` from a jobsite turn. Unasked flyTo downgrades to a card; that helper must not grow pins.

Bar may open the drawer immediately. That is the command pipe, not comms.

## Do-not (4h)

No pack rows. No municipality samples. No LPIN live site as this homepage. No 16k / Rest / IDWT. No `insind` this sitting. Do not seed `q` from `locations.ts`. Peek ≠ Insight.

## Leftovers (coordinator `src/`, not this file)

1. Grok can still put `q` on a jobsite tag → **Fly** → `lookupPlace` / presets. Gate: omit `q` unless `askedToMove` and the user typed the place.
2. Local matcher needs the words jobsite / claims desk / claim pack. Bare locality is kept/permit/preset — leave it.
3. `insight-local` `source` is `"Jobsite · guidance only"`, not `JOBSITE_HONESTY`. Bind the constant.
4. Open desk `applyAction` closes comms. Globe stays; jump-seat hides. Optional: keep chat open like Dismiss.
5. Packs stay empty until a later named kit ships **sourced** rows. Not this 4h. Not LPIN ingest.

**Close:** 4h jobsite is a **typed hole behind Open desk**. Zero pins. Not a ship.
