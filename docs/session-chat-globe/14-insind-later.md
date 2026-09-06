# Seat 14 — Later Inspection Index (D-257)

**Target class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** Coordinator owns `src/`. Live gevradio frozen. No remix. No Bogpulse.  
**Live later host:** https://insind.grok.me — copy-from, not write target, not this homepage.

## Verdict this sitting

**NO-GO to implement.** Spine is not green for this adapter. Do not add `insind` to `InsightSystem`, `LayerId`, commands, drawer, or pins. Do not iframe the live site. Do not dump nationwide inspections. Do not invent rows. Write nothing under `src/`.

This sitting may only **name** the later contract so a future named kit plugs into the **same Insight card**.

## What it is (title-probed 2026-08-30, not invented)

Independent open-source index of FMCSA **public** inspection files (last two years). User types VIN, plate, USDOT, MC, or company name. Match on inspection ID. Charts/timeline live on that site. **Not a score. Not a government site.** Same vehicle may appear under more than one company.

GEV is the cockpit. Insind later = layer + drawer. Globe stays homepage. Same zoom grammar.

## Adapter (later) — same Insight card, not a fifth UI

Do not ship a new card. Extend existing `Insight` only when named:

| Field | Later value |
|-------|-------------|
| `system` | `insind` then. Today the union is `intel \| kept \| permit \| jobsite` — leave it. A chat mention this sitting is `intel` with **no** desk. |
| `q` | User-typed VIN/plate/USDOT/MC/name, or a **place** the user asked to fly. A VIN is not a coordinate. Empty `q` → no Fly. |
| `layer` | `insind` later. Default **off**. |
| `desk` | `{ system: "insind", id }` later. Open desk = drawer. Globe stays up. |
| `source` | Honesty string. Public rows as published. Incomplete = empty. Human final call. |

Spine controls stay four: bubble link sets the card (does not fly); **Fly** only if `q` is a resolvable **place**; **Open desk** later; **Show layer** later still **0 orbit pins**. Dismiss clears the card. Chat stays. Peek stays Peek.

Zoom: same jobsite row. 0 pins at orbit. Fly only if the user typed a resolvable place **and** pressed Fly (or said fly / take me / go there). No auto-zoom. No 16k inspection pins. City zoom cap TBD in the named kit.

## This sitting — do not

- Implement Inspection Index.
- Iframe https://insind.grok.me as homepage, cockpit, or card body.
- Add layer `insind`, kind, contacts, or a first-paint fetch.
- Merge LPIN, IDWT, or jobsite packs into inspection rows.
- Invent violations, scores, or municipality samples.
- Treat VIN/plate/USDOT as a `flyTo` query.

## Leftovers (named kit later)

Pickup: `Active/Handoffs/WEEK-SCHEDULE-2026-08-31.md`. Kit default Thu 09-03. **Implement only when named.**

1. Fill `docs/KIT-09-TEMPLATE.md` → kit file. Lazy module `src/lib/insind/`.
2. Coordinator pass: extend `InsightSystem` / desk union / `LayerId` — one tree, no second homepage.
3. Commands: `show insind` / `hide insind` / `open inspection desk {query}` — user-typed only.
4. Search: VIN / plate / USDOT / MC / company name. Honest hole if no match.
5. Pins: **0** at orbit. City zoom later, cap in the kit. No Rest dump.
6. Honesty strip: public files, last two years, not a score, not a government site, human final call.
7. P0 kill: `hide insind` / close desk. Do not unmount Cesium. Do not steal radio.
8. OPSEC gate before any public-facing change. No PII in samples.

## GO only when

Spine done-when is green **and** the operator names the Inspection Index kit. Until then this file is the fence: **NO-GO**.
