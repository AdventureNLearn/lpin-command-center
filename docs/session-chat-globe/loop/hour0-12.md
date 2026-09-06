# Hour 0 · seat 12 · `src/lib/intel/commands.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only  
**Chat parser is not this file.** No `askedToMove`. No INSIGHT tags.

## Done

Bar fly prefixes after radio / HUD / desk / layer / scene / track:

| Phrase | `parseCommand` |
|--------|----------------|
| `take me to {q}` · `fly to` · `go to` · `jump to` · `navigate to` · `open {q}` (if not kept desk) | **flyTo** KEEP |
| `show me on the globe {q}` | **flyTo** (fly-ask) |
| `show me {q}` (no “on the globe”) | **unknown** — not flyTo. Coords cannot steal it. |
| bare `tokyo` · `austin` · `lax` · `jfk` · `heathrow` · `singapore` · `dubai` · `sydney` · `iss` · `new york` · `nyc` | **flyTo** KEEP |
| `take me to the chamber in {place}` | **keptOpen** (earlier arm) KEEP |
| `show me fires` · `show me space` | **scene** (earlier arm) KEEP |

## Verify

`node .\node_modules\typescript\bin\tsc --noEmit` — **PASS** (exit 0). Local prefix smoke: take me / fly / go / jump / navigate / show me on the globe → flyTo; `show me tokyo` / `show me 35.68, 139.75` → unknown; bare `tokyo` / `NYC` → flyTo; chamber phrase stays keptOpen.

## Not this seat

`runCommand` still sends **unknown** through `interpretCommand` (world.ts). Keyed mapper may still emit flyTo for `show me tokyo`. Seat 07 owns that pipe. Chat `askedToMove` is `insight.ts` (seat 02).
