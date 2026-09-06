# Cycle 1 — seat 11 PeekCard

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/components/intel/PeekCard.tsx` only  
**Clock:** iterate → audit → forecast → execute (`USEFUL-TOOL.md`)

## Iterate (hour 0 leftover)

PeekCard was operator chrome: kicker `Peek · satellite · live`, button **Grab**, hint “Closes in 5s unless you grab”, speed `kts`. Law already held: Peek ≠ Insight, Grab = `engine.track`, insight may stay, no auto-fly.

## Audit vs two audiences

| Audience | Need | Disk before this cycle |
|----------|------|------------------------|
| Everyday | Hover a satellite → English card. Follow is optional. No yank. | Card existed. Copy was Peek/Grab/kts. |
| Serious | Live feed named. NORAD + source stay. No auto-track. No auto-truth. | Meta NORAD, source CelesTrak, track only on click. |

Hover pick (`globeEngine`) is still seat 13 — not this file.

## Forecast

English satellite card. **Follow this** → `track` (not Insight **Look here** / `flyTo`). Insight may stay open. Holes elsewhere stay holes.

## Execute

- Kicker `Satellite · live feed` (delayed / modeled / feed error / off).
- Where / How high / How fast (knots). Source unchanged.
- Button **Follow this**. Flash `Following {name}`. No engine: “The globe isn't ready yet”.
- Hint: 5 seconds / stay here to keep this open.
- Still no `flyTo`, no `setInsight`, no insight visibility gate.

## Verification

- `npm.cmd run typecheck` (`tsc --noEmit`) PASS.

## Leftovers (not this file)

1. SAT hover pick / operator FAIL → `globeEngine.ts`.
2. Esc-dismiss → T+4 polish.
3. Flat / phone: no hover peek (this sitting).
