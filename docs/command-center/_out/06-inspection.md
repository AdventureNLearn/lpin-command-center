# LPIN Inspection desk

**Seat 06** · **Product:** LPIN Intelligence Network  
**Tree:** `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
**Method source (copy-from, not write target):** https://insind.grok.me — title **Inspection Index**  
**This file only.** Do not patch `src/`.

Fold existing `InsindBody` typed VIN / plate / USDOT lookup as the **LPIN Inspection desk**. Globe stays `/`. One drawer. Not a score. Not a new homepage.

```
PACK ID: insind
LIVE HOST: https://insind.grok.me
FAMILY / LANE: LPIN civic (method: Inspection Index)
TITLE AS LIVE: Inspection Index
SHELL: gev-command-center
CARD KIND: pack-briefing | insight
LAYER ID / KIND: insind / insind  (rail chip INX; default off)
CONTACT MAPPING: none at orbit. VIN / plate / USDOT is not a coordinate.
MARKER BUDGET AT GLOBAL ZOOM: 0
DATA MODULE PATH: src/lib/insind/lookup.ts
LAZY? yes
DRAWER ADAPTER: InsindBody — type VIN, plate, USDOT, MC, or company name. Nothing loads until you do. Honest hole if no rows.
HOLO CARD:
  kicker: Inspection desk
  title: typed query or Inspection desk
  body: Public FMCSA files, last two years, as published. Same vehicle may appear under more than one company.
  honesty: Public FMCSA inspection files, last two years. Not a score. Not a government site. Human final call.
  actions: Open the file · Look here only if q is a resolvable place (never a VIN)
KERNEL: inherit LPIN honesty. Presence of a public file is not a score (docs/command-center/06-LABELS.md).
RADIO: none. Never steal Creedence.
COMMAND PHRASES: show insind · hide insind · open inspection desk {query}
FRESHNESS: delayed
PUBLIC COPY CONSTRAINTS: no municipality samples; no PII; no skill brands; no nationwide dump
P0 KILL SWITCH: hide insind / close desk. Do not unmount Cesium. Do not steal radio.
IFRAME: never
HOMEPAGE SWAP: never
```

## On this tree (Evidence)

- `lookupInsind` — query ≥3 chars after normalize; `rows: []`; `incomplete: true`; `INSIND_EMPTY` = no match on disk; we do not invent inspections.
- `DeskDrawer` header **Inspection desk**; footer `INSIND_HONESTY`; `InsindBody` Look up. Empty: no nationwide files, no iframe of the live index.
- Layer sub: Open inspection desk · Type VIN/plate/USDOT. No pins.
- Commands already parse `open inspection desk` / `show|hide insind`. KIT-11: layer default off, 0 first-paint dump.

## Method (live host)

FMCSA publishes two public files (VIN+plate; company USDOT+date). The live index matches on inspection ID and shows the last two years. Charts and timeline stay **there**. This cockpit copies the typed-lookup method only.

## Refuse

Iframe insind.grok.me. Nationwide VIN/inspection dump. Orbit pins. Score a listing, person, or town. `flyTo` on VIN/plate/USDOT. Merge Claims, Jobsite, Permit, or IDWT into inspection rows. Unmount Cesium.

Empty / not-retrieved is a finding. Human final call.
