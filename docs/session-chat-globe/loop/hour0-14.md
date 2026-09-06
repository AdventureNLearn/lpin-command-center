# Hour 0 · seat 14 · `src/lib/jobsite/packs.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only  
**No LPIN ingest.** No Rest. No insind. No live gevradio.

## Done

- `lookupPack` still returns `null` on empty query.
- Typed name still returns `id: hole:{locality}`, title “No pack on disk”, `incomplete: true`.
- **One constructor** `holePack` is the only pack return. `honesty` is always `JOBSITE_HONESTY` (type `typeof JOBSITE_HONESTY`).
- **Rows stay `[]`.** No samples. No pins. No LPIN/IDWT merge.

## Verify

`npm run typecheck` after this file. **packs.ts: 0 errors.** Tree FAIL is seat 16 `store.ts` (syntax, not this file). Did not patch it.

## Not this seat

`insight-local.ts` still hardcodes `source: "Jobsite · guidance only"` (4h leftover 3). Seat 01 owns that file. DeskDrawer footer already uses `JOBSITE_HONESTY`.
