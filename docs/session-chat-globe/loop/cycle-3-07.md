# Hour 3 audit — seat 07 `runCommand.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Writer:** this file + `src/lib/intel/runCommand.ts` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`

## GO / NO-GO

| Check | Disk before | Verdict | Execute |
|-------|-------------|---------|---------|
| Civic `desk` / `permitSearch` / `keptOpen` must **not** close comms | `hushPicker()` radio-only; corpus still `setOpen(false)` | **GO** | none |
| `keptOpen` auto `flyTo` 1.2Mm on `open Canada` (no fly-ask) | always `engine.flyTo` | **FAIL** vs human-final-call / no auto-zoom | desk + LEG layer; camera **only** if `askedToMove(raw)` |
| `permitSearch` auto `lookupPlace` | always geocode on pick | **FAIL** same class | `lookupPlace` only if `askedToMove(raw)` |
| Corpus may close comms | `setOpen(false)` when corpus on | **GO** | held |
| No Rest dump from this file | `searchRestAhj` + `setPermitRest(true)` | **FAIL** | lite `searchAhj` only; Rest import dropped |

Everyday: `open Canada` opens the file, globe stays. Look here is optional.  
Serious: 33-kit desk, no auto-zoom, comms can stay, Core/featured search not Rest.

## Execute (this file)

- Import `askedToMove`. `keptOpen`: `flyTo` iff asked (`take me to the chamber in …` still flies).
- `permitSearch`: no Rest branch; `lookupPlace` iff asked.
- `fromUnknown` still maps `permitSearch` for the bar. Chat path not added.

## Held (not this seat)

OverlayHud `g` still `setDesk(null)` when opening comms. `find rest ahj in` still parses `rest: true` in `commands.ts`; this file ignores it and uses lite.

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` **PASS** (cwd tree). Corpus is the only `setOpen(false)` in this file.
