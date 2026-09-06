# Hour 0 · seat 13 · `src/lib/intel/globeEngine.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only  
**Verdict:** **GO**

No `src/` edit. No jobsite pin branch. Peek stays hover. `flyTo` is the existing camera primitive.

## Jobsite — 0 engine entities

`grep` of `globeEngine.ts` for `jobsite` = **0**. Subscribe (1451–1489) loads flights, military, vessels, satellites, earthquakes, fires, launches, legislatures, permits. **No `jobsite`.** Entity prefixes: `flt-` `mil-` `ves-` `sat-` `orbit-` `eq-` `fire-` `msn-` `leg-` `ahj-`. No `job-`. KIT-10 / 4h-14: do **not** add `loadJobsite()`. Layer on still 0 pins (`store.ts` default `{ on: false, count: 0 }`).

## Peek / hover — no bug

| Path | Disk |
|------|------|
| Spawn | `MOUSE_MOVE` 1383–1398 → `pickSatId` (sats map only, 24px) → `currentContact` → `kind === "satellite"` only |
| Skip | cockpit · already tracked · same peek id · 50 ms throttle |
| Clear | `track()` 1188 `setPeek(null)`. PeekCard 5 s hold / Grab. No comms `setPeek` |
| Click | LEFT_CLICK 1365–1379 `track(id)` + LEG/AHJ desk. Peek ≠ Insight |

## flyTo — no bug

`flyTo` 1276–1284: drop `trackedEntity`, cockpit off, `lookAtTransform(IDENTITY)`, `camera.flyTo`. Callers: `lookupPlace` (preset / geocode), share-hash restore, `EngineApi`. Unasked chat fly is a comms gate, not this file. Geocode height `48_000` vs featured AHJ `80_000` stays a nav leftover — not a broken fly.

## Not this seat

`comms.ts` ACTION gate · InsightCard Fly · `packs.ts` hole · `flatEngine.ts` twin · insind.

OPSEC: localhost harden. No municipality samples. Live gevradio frozen.
