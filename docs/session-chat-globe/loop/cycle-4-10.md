# Hour 4 POLISH — seat 10 OverlayHud

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/OverlayHud.tsx`  
**Phase:** polish-closeout · no new features · no FORECAST.md

## Verdict: **GO** (still)

Hour 3 GO holds. Esc-dismiss is not FAIL. **No `src/` edit.** Stop.

## Re-check (disk)

| Claim | State | Evidence |
|-------|--------|----------|
| Talk / G keeps desk | **GO** | G L158–166 and Talk L347–357: `setOpen` without `setDesk(null)`. |
| Esc peels insight first; globe stays | **GO** | L120–125 `setInsight(null)` only. No `resetGlobe`. `<InsightCard />` still mounted L741. |
| L / Layers exclusive vs desk | **GO** | Open rail closes desk; gate `!desk`; desk effect closes rail. |
| Everyday copy | **GO** | Boot “Waking the globe”. Talk. Public feeds. Hint still `placeholder={hint}`. |

## Execute

None. Esc-dismiss polish only if FAIL — it is not. Copy leftovers named in hour 3 (Corpus label, cockpit kicker, radio-vs-desk mutex) stay out of this polish.

`tsc --noEmit` N/A (no edit).

OPSEC: localhost. Live gevradio frozen.
