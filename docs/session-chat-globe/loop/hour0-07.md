# Hour 0 — seat 07 `runCommand.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Writer:** seat 07 · this file + `src/lib/intel/runCommand.ts` only  
**Phase:** Develop T+0

## Landed

Insight **Open desk** uses `{ type: "desk" }` (`InsightCard` / bubble). That path no longer `setOpen(false)`. Comms stays if already open. Radio picker still yields.

| Action | Camera | Comms |
|--------|--------|-------|
| `permitSearch` | **KEEP** `lookupPlace` (command bar) | close (fly) |
| `keptOpen` | **KEEP** `flyTo` 1.2Mm (bar / click-class) | close (fly) |
| `desk` / `keptCompare` / `permitPlaybook` / `streams` / `method` | none | **skip** `setOpen(false)` |
| `corpus` | none | still mutex-close |

Did **not** add chat `permitSearch`. `fromUnknown` still maps it for the bar AI fallback only. `parseTaggedAction` allowlist is not this seat.

## Do-not (held)

- No chat `permitSearch` / `keptOpen` apply.
- No Rest dump. No auto-zoom from Insight Open desk.
- Live gevradio frozen. No other `src/` files.

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` PASS (cwd tree). Host `npm.ps1` blocked by execution policy — local tsc used.
