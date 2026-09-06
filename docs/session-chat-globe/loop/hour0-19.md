# Hour 0 · seat 19 · `scripts/insight-local.test.mjs`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only

## Done

- `scripts/insight-local.test.mjs` is `node:test` (not a lone assert script).
- **Does not import** `src/lib/intel/insight-local.ts`. That file is TypeScript with Vite `@/` aliases (`@/lib/kept/desks`, permit search-lite, jobsite packs). Node 24 type-stripping still cannot resolve `@/lib` (`ERR_MODULE_NOT_FOUND`).
- Imports `askedToMove` from `insight.ts` only. Strip-types works on that file (type-only `LayerId` import; no `@/` paths). Node 24.18.0 default strip.
- Cases: `what's over tokyo` / `show me tokyo` / `going to paris` false; `take me` / `fly` / `go to` / **`go there`** (seat 02) / `jump to` / `navigate` / `show me on the globe` / `move (the )?globe` / `bring (me|us) to` true.
- Source-read check that `insight-local.ts` still short-circuits `askedToMove(text)` to `null` (no auto-card on fly-ask).

## Verify

`node --test .\scripts\insight-local.test.mjs` — **PASS** (3 tests, 0 fail, Node 24.18.0). `tsc --noEmit` N/A for this `.mjs` (tsconfig `include` is `src` / `server` / vendor JSON). No `src/` writes.

## Not this seat

`insight.ts` regex, `insight-local.ts` card mint, `comms.ts` ACTION gate, command bar. Live gevradio frozen.
