# Cycle · seat 18 · `src/components/intel/FirstRun.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** iterate → audit → forecast → execute · one writer · this file only  
**Authority:** `docs/session-chat-globe/USEFUL-TOOL.md`

## Iterate

Hour 0: click-fly kept; mount / Esc / explore do not fly. Card titles already everyday (See the planes / See orbit / Quakes and fire / Just the globe). Leftover: kicker, heading, body, toasts, HUD place still theater.

## Audit

| Audience | Disk before this cycle | Bar |
|----------|------------------------|-----|
| Everyday | Four card titles/copy already public-feed. Kicker “orbital shitpost”, body “Feels classified”, toasts (“backyard”, “space junk”, “orbital grass”) = classified theater. | FAIL copy · GO titles |
| Serious | ADS-B “not for navigation” on the plane card. Flashes not delayed/sourced. Place “New York corridor” = municipality sample. Click-fly is human pick, not load auto-zoom. | FAIL toast/place · GO camera law |

## Forecast

Keep four titles and click-fly. Rewrite chrome + toasts to public / delayed / not-navigation. Drop municipality from place. Esc and empty globe stay no-camera.

## Execute

- Kicker **Public feeds**. Heading **Where to start**. Body: public sources, not classified, not navigation, pick to look or skip empty.
- Toasts: ADS-B not-nav · TLE/ISS when the feed has it · USGS/EONET delayed · empty globe ask Grok.
- Place after planes: **East coast** (same `flyTo` coords). California / Orbital unchanged.
- Titles, four cards, `picked` guard, no `useEffect` fly: unchanged.

## Verify

`node.exe node_modules\typescript\bin\tsc --noEmit` → **0** after this edit.

## Not this seat

`OverlayHud` Esc / hydrate. InsightCard **Look here**. Chat SYSTEM. `scenes.ts`. Command hint.
