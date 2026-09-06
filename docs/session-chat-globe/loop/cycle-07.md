# Cycle — seat 07 `runCommand.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Writer:** this file + `src/lib/intel/runCommand.ts` only  
**Law:** `USEFUL-TOOL.md` serious #4 — keep Grok comms open while a desk is open.

## Iterate

Hour 0: Insight `{ type: "desk" }` used `hushPicker(false)` so Open the file did not `setOpen(false)`. `permitSearch` / `keptOpen` still passed `true` (fly mutex). Corpus still closes comms.

## Audit

| Path | Camera | Comms before | Comms after hour 0 |
|------|--------|--------------|--------------------|
| Insight / bubble **Open the file** → `{ type: "desk" }` | none | open | stayed open |
| Bar `find ahj in` / `building desk` → `permitSearch` | `lookupPlace` KEEP | closed (bar unmounts) | `setOpen(false)` redundant + leak if comms were open |
| Bar `open canada` / chamber → `keptOpen` | `flyTo` 1.2Mm KEEP | closed | same leak class |
| Chat ACTION allowlist | no `desk` / `permitSearch` / `keptOpen` | — | not this seat |

Everyday: card, then Open the file, chat stays. Serious: sourced desk + comms together. No auto-zoom from desk.

## Forecast

Execute: civic desks never close comms. Radio picker still yields. Keep bar cameras. Do not add chat `permitSearch`.

Not this seat: OverlayHud `g` still `setDesk(null)` when opening comms (inverse mutex). Empty-state drawer copy.

## Execute

`hushPicker()` is radio-only. `desk` / `permitSearch` / `keptOpen` / `keptCompare` / `permitPlaybook` / `streams` / `method` do not call `setOpen(false)`. Corpus mutex unchanged. `lookupPlace` and kept `flyTo` unchanged. `fromUnknown` still maps `permitSearch` for the bar only.

## Verify

`tsc --noEmit` FAIL is `PeekCard.tsx:93` `satFreshness` (seat 11), not this file. `runCommand.ts` has no diagnostics. Corpus is the only remaining `setOpen(false)` in this file.
