# Cycle 1 — seat 09 `LayerSubs.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**File owned:** `src/components/intel/LayerSubs.tsx` only

## Iterate

Hour 0: clicks still fly; jobsite desk only; no Rest. Kickers were catalog jargon: “Featured cores” / “State packs”.

## Audit

| Audience | Check | Disk |
|----------|--------|------|
| Everyday | English section labels | **FAIL** kickers said cores / packs |
| Everyday | Honest hole, not a fake picture | PASS jobsite “Type a pack. No pins.” |
| Everyday | Card not a yank from this rail | N/A — rail clicks may fly (explicit) |
| Serious | Featured Core only, Rest a count | PASS `permitLayer === "core"`; hint Rest not mapped |
| Serious | Human final call | PASS — click only |
| Serious | Jobsite 0 pins | PASS `setDesk` empty id; no `flyTo` |

## Forecast

Rename the two kickers to everyday English. Leave jobsite open-desk-only. Do not add Rest.

## Execute

- Kicker “Featured cores” → **Featured cities**
- Kicker “State packs” → **By state**
- Jobsite still one button: `setDesk({ system: "jobsite", id: "" })`. No camera. No pins.

`node .\node_modules\typescript\bin\tsc --noEmit` PASS.
