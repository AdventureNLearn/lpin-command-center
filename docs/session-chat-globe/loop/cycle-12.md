# Cycle 1 · seat 12 · `src/lib/intel/commands.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** iterate → audit → forecast → execute  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**This file only.** Chat parser is not this file.

## Iterate (hour 0 leftover)

- `show me {q}` no longer `flyTo`. Seat 07 skips AI fly on that phrase.
- `open {q}` was still a bar **flyTo** prefix. Not a fly-ask.
- `show me iss` still **trackNearest** via `show` on the ISS arm.

## Audit

Everyday: card, Look here optional, no yank. Serious: no auto-zoom.  
Bar fly-ask = take me / fly / go to|there / jump / navigate / bring me|us / show me on the globe.  
`open` = desk. `show me {q}` = not camera. Bare `tokyo` = explicit bar go (KEEP).

## Forecast

Drop `open` from fly prefixes. Stop leftover `open` / `show me` from coord-steal. Drop `show` from ISS track. Add `go there` and `bring me|us to`. Keep chamber / scenes / bare P0.

## Execute

| Phrase | `parseCommand` |
|--------|----------------|
| `take me to` · `fly to` · `go to` · `go there` · `jump to` · `navigate to` · `bring me to` · `bring us to` · `show me on the globe` | **flyTo** |
| `show me {q}` · leftover `open {q}` | **unknown** (not flyTo) |
| bare `tokyo` (P0 list) | **flyTo** KEEP |
| `take me to the chamber in` | **keptOpen** KEEP |
| `show me fires` / `show me space` | **scene** KEEP |
| `track iss` / bare `iss` | **trackNearest** KEEP |
| `show me iss` | **unknown** (no longer track) |

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` — **PASS** (exit 0).

## Not this seat

`open {capital}` still **keptOpen** earlier if `matchKeptDesk` hits; `applyAction` may still fly 1.2Mm (seat 07). Unknown leftover `open {q}` can still hit `interpretCommand`.
