# Hour 0 · seat 09 · `src/components/intel/LayerSubs.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only  
**No Rest.** No insind. No live gevradio.

## Done

- **Clicks may still fly.** LEG country `flyTo` `LEG_H` + desk + `track(leg-*)`. Featured AHJ `CITY_H`. State pack `STATE_H`. Live “Track nearest” is a click (`NEAREST` = flights / vessels / satellites only).
- **Jobsite kids: open desk only.** One button, `setDesk({ system: "jobsite", id: "" })`. No `flyTo`, no `track`, no `lookupPlace`, no pins. Hint: “Type a pack. No pins.”
- **Do not add Rest.** No `rest-search` / `places-rest` / `setPermitRest`. Featured city kids = `FEATURED_AHJ_IDS` with coords **and** `permitLayer === "core"`. State-pack hint stays “Rest not mapped”. Extra/More stay counts, not city buttons.
- Civic layers never fall through to LiveKids (`CIVIC` guard + switch).

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` **PASS** (exit 0). PowerShell blocked `npx.ps1`; local `typescript/bin/tsc`.

## Not this seat

Chat must not call these click handlers (`01-nav-policy.md`). InsightCard Fly / comms ACTION / search-lite Rest fence / `globeEngine.nextContact` (flights+MIL only). OverlayHud Esc.
