# Seat 09 — Jobsite adapter

**Target:** public-suite WIP · `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/` writes. Live gevradio frozen. No remix. No Bogpulse.

## Verdict: **GO**

KIT-10 is already the adapter. Insight `system: "jobsite"` must reuse it, not grow a second homepage, pack dump, or pin loop.

## Disk (this sitting)

| Claim | Evidence |
|-------|----------|
| Typed pack is an honest hole | `src/lib/jobsite/packs.ts` — `lookupPack` returns header + `rows: []`, `incomplete: true`, `id: hole:{locality}`. Comment: “Nothing is on disk.” |
| No samples / no pins / no LPIN / no IDWT | same file: “Do not invent claims. Do not pin. Do not merge LPIN or IDWT.” `JOBSITE_HONESTY` matches KIT-10. |
| 0 globe entities | `globeEngine.ts` subscribe has flights…launches + LEG + AHJ. **No `jobsite` branch.** `grep jobsite globeEngine.ts` = 0. |
| Layer default off, count 0 | `store.ts` `defaultLayers().jobsite` `{ on: false, count: 0, freshness: "off" }`. `LAYER_META.jobsite.source` = “User-typed pack. No first-paint dump.” |
| Desk exists | `DeskDrawer.tsx` `JobsiteBody` — type → `normalizeJobsiteQuery` (trim, 80 chars) → `setDesk({ system: "jobsite", id })` → hole copy. Footer = `JOBSITE_HONESTY`. |
| Commands | KIT-10 + `commands.ts`: `show/hide jobsite` = layer only; `open jobsite desk` / `open claims desk` / `open jobsite desk {name}` = drawer. `runCommand` desk path **does not** `lookupPlace`. |
| Layer kids | `LayerSubs.tsx` `JobsiteKids`: one “Open jobsite desk”, `id: ""`. Hint: “Type a pack. No pins.” |
| Insight already names the system | `insight.ts` `InsightSystem` includes `jobsite`; desk union includes `jobsite`; `CIVIC_LAYERS` includes `jobsite`. `InsightCard` Open desk already calls `applyAction({ type: "desk", system, id })`. |

`docs/KIT-10-jobsite.md` (2026-08-30): layer default off, 0 orbit pins, no first-paint dump, no invented claims. Kill switch: `hide jobsite` / close desk. Do not unmount Cesium. Do not steal radio.

## Adapter (coordinator wires; do not invent)

Same Insight object as spine. Jobsite fill:

```
system: "jobsite"
layer: "jobsite"          // Show layer / Open desk may setLayer on. Still 0 pins.
desk: { system: "jobsite", id }   // id = user-typed locality after normalizeJobsiteQuery, or ""
q?: only if the *user* typed a place this turn that lookupPlace can resolve
source: JOBSITE_HONESTY
title / body: pack title + hole copy; never a claims row
```

| Control | Jobsite |
|---------|---------|
| Link in bubble | `setInsight`. No camera. No pins. |
| **Open desk** | `setDesk({ system: "jobsite", id })`. Globe stays. `lookupPack(id)` if id; empty prompt if not. |
| **Show layer** | `setLayer("jobsite", { on: true })`. Count stays 0. **Do not** add `loadJobsite()` to `globeEngine.ts`. |
| **Fly** | Only if `q` is set **and** that `q` is the user’s typed resolvable place. Never a preset from `locations.ts` / `commands.ts` demo fly list. Never Grok-invented locality. Fail Fly → flash, card stays. |
| Dismiss | Clear card. Chat + radio stay. |

Add `insightFromJobsite(typed)` next to `insightFromFlyQuery` (that helper is `system: "intel"` — do not reuse it for claims). Call `lookupPack`; never geocode unless Fly.

Chat: `<<INSIGHT:… "system":"jobsite" …>>` is the path. `<<ACTION:flyTo>>` only if the user asked to move **and** `q` is their typed place. Downgrade otherwise.

## Leftovers (not this seat)

- No `insightFromJobsite` yet; `lookupPack` is drawer-only.
- Generic Insight **Fly** = `flyTo` → `lookupPlace` → intel presets. Coordinator must gate jobsite `q` or Fly will hit demo cities.
- `chat.ts` SYSTEM example desk is permit-only; jobsite desk `{system,id}` not shown.
- Packs remain empty until a later named kit ships sourced rows. Do not fill them this sitting.
- Inspection Index is seat 14, not this adapter.
