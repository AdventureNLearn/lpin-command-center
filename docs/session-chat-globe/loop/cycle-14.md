# Cycle 1 — seat 14 `packs.ts`

**Class:** public-suite WIP · **Not a ship**  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**File owned:** `src/lib/jobsite/packs.ts` only  
**No LPIN ingest.** No pins. No Rest. No insind.

## Iterate

Hour 0 bound `JOBSITE_HONESTY` on the only pack return. Rows `[]`. Title was “No pack on disk” (engineer).

## Audit

| Audience | Check | Disk |
|----------|--------|------|
| Everyday | Hear “we don’t have that pack yet” | **FAIL** — title was “No pack on disk” |
| Everyday | Honest empty, not a fake complete picture | PASS — `rows: []`, `incomplete: true` |
| Serious | Delayed / sourced / hole language | PASS — `JOBSITE_HONESTY` stamped |
| Serious | No invented claims / no LPIN | PASS |

DeskDrawer body copy and `insight-local` body are other seats.

## Forecast

Everyday empty copy on the pack title: `JOBSITE_EMPTY`. Honesty strip stays for serious users. Rows stay empty.

## Execute

- `JOBSITE_EMPTY` = “We do not have that pack yet.”
- `holePack` title is that constant. Card + desk h2 pick it up.
- `honesty` still `JOBSITE_HONESTY`. `rows` still `[]`. Empty query still `null`.

`npx.cmd tsc --noEmit` after this file. **packs.ts: 0 errors.** Tree FAIL is seat 11 `PeekCard.tsx` (`satFreshness`). Did not patch it.
