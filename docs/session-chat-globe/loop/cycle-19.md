# Cycle 1 — seat 19 `scripts/insight-local.test.mjs`

**Class:** public-suite WIP · **Not a ship**  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**File owned:** `scripts/insight-local.test.mjs` only

## Iterate

Hour 0 locked `askedToMove` and documented that `insight-local.ts` is TS (`@/` aliases; this `.mjs` does not import it). Missed USEFUL-TOOL everyday questions and CLOCK execute (`pickAhjCore`, ISS card, Look here).

## Audit

| Audience | Check | Disk |
|----------|--------|------|
| Everyday | “what’s over Japan” / “who sits in Canada” → card, not yank | Hour 0 only tested tokyo; **gap** |
| Everyday | Look here optional — typing it is not a fly-ask | **gap** |
| Everyday | Honest hole / delayed copy in local cards | source-read did not lock Look here / JOBSITE_HONESTY |
| Serious | No auto-zoom unless askedToMove | PASS hour 0 spine phrases |
| Serious | Chat permit is Core only | source-read still allowed `searchAhj` |

## Forecast

Add everyday non-fly cases. Source-read `pickAhjCore` (no `searchAhj`), Look here, JOBSITE_HONESTY, ISS `q:"ISS"` / No auto-track. Still do not import the TS local file.

## Execute

- False: `what's over Japan`, `who sits in Canada`, `look here`
- Source-read: `pickAhjCore`, no `searchAhj`, `Look here`, `JOBSITE_HONESTY`, ISS card
- `node --test .\scripts\insight-local.test.mjs` **PASS** (3 tests, Node 24.18.0). `tsc --noEmit` N/A (`.mjs`, not in tsconfig include). No `src/` writes.
