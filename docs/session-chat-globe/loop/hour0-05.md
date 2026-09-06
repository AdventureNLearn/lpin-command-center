# Hour 0 · seat 05 · `src/lib/intel/comms.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only

## Done

- ACTION `layer` no longer surprise-toggles. Apply only if the user asked show / hide / enable / disable / turn on / turn off / light up / layer on / layer off (`askedToToggleLayer`).
- `show me` is fly-adjacent, not a layer ask (spine: show me on the globe). Unasked `<<ACTION:{"type":"layer",…}>>` → `action: null` + Insight with `layer` so the card can **Show layer**.
- `flyTo` stays gated on `askedToMove`. Unasked flyTo still cards via `insightFromFlyQuery`.
- Dark comms (`!res.ok` and catch) still attach `insightFromUserText` (33 kits / search-lite / presets). No auto-fly. Globe still works.
- `trackNearest` gate left as-is (askedToMove or track/lock/grab/follow). Peek still not a comms path.

## Verify

`npm.cmd run typecheck` (`tsc --noEmit`) **PASS**.

## Not this seat

Chat SYSTEM copy (`chat.ts`), InsightCard Show-layer click, command-bar `parseCommand` layer phrases, OverlayHud Esc, seat 19 tests.
