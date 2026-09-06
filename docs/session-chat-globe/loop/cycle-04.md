# Cycle 1 — seat 04 `CommsChat.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**File owned:** `src/components/intel/CommsChat.tsx` only

## Iterate

Hour 0 left jargon on the bubble: `Card · {title}` and `kept|permit|jobsite|intel` in aria. Fly/desk chips already said Look here / Open the file.

## Audit

| Audience | Check | Disk |
|----------|--------|------|
| Everyday | Plain English chips | **FAIL** identity chip still said Card |
| Everyday | Look here is optional | PASS — click only, no auto-zoom |
| Everyday | Open a legislature / building desk | PASS action; copy was Open the file |
| Serious | Human final call on fly / desk | PASS |
| Serious | Comms stay open with a desk | PASS |

Leftover (not this execute): no “Show on the map” chip for layer-only intel. InsightCard has it. Seat 03 owns the card.

## Forecast

Replace Card / system codes with English tool names (Legislature, Building desk, Jobsite, Live map). Keep **Look here** and **Open the file** exact.

## Execute

- Identity chip: `{tool} · {title}`
- Look here / Open the file unchanged
- Aria in English

`npx.cmd tsc --noEmit` PASS.
