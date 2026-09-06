# Hour 0 DEVELOP — seat 04 `CommsChat.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/CommsChat.tsx` only  
**Clock:** `loop/CLOCK.md` · hour 0 develop

## Act

1. **Chip labels name the tool.** Card chip is `{system} · {title}` (`kept` | `permit` | `jobsite` | `intel`). Spine: bubble link names tool + place/object. Aria includes system on Card / Fly / Open desk.
2. **Open desk chip kept.** Desk still opens via `applyAction desk` + optional layer on. Globe stays up.
3. **Fly matches `InsightCard.fly`.** ISS `q` → `trackNearest iss` (lookupPlace ISS is the 0,0 preset). Else coord-first: `lat`/`lon` → `engine.flyTo(lon, lat, height ?? 80_000)` (Kept kits use 1.2Mm). Else trimmed `q` → `applyAction flyTo`. No q and no coord → no Fly chip. Click only; no auto-zoom.

## Not this seat

InsightCard chrome, comms parser, insight-local, store, styles, live gevradio, Rest dump, insind.

## Verify

`npx.cmd tsc --noEmit` PASS.
