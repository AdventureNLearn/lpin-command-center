# Hour 0 · seat 02 · `src/lib/intel/insight.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only

## Done

- `askedToMove` now treats spine **go there** as a fly-ask (`go (to|there)`). `go to` still matches. `what's over tokyo` still false.
- `parseInsightTag` still copies optional `lat` / `lon` / `height` onto the existing `Insight` object. Finite numbers only; lat ∈ [−90, 90], lon ∈ [−180, 180]; pair dropped if either invalid; height only if finite and > 0.
- **No schema expand.** No new public fields. Peek stays out. `insind` stays out.

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` — **PASS** (exit 0). PowerShell blocked `npx.ps1`; same `tsc --noEmit` via the local binary. Local stdin smoke: `go there` / `go to` true; `what's over tokyo` / `show me tokyo` / `going to paris` false; tag lat/lon/height pair kept; lon 200 / height −1 / unpaired lat dropped.

## Not this seat

Chat SYSTEM copy, `comms.ts` ACTION gate, InsightCard Fly click, command-bar prefixes. Seat 19 owns `scripts/insight-local.test.mjs` (`go there` case not added here).
