# SEAT H15 — COORD NEXT STEP
This file only. No `src/` edits.

**E — Evidence.** FEATURE_KITS: after KIT-05, next is KIT-06 (depends KIT-04). Draft `src/lib/permit/permit-pins.ts` exists; `globeEngine.ts` subscribe has LEG, not `layers.permits`. `parseCommand` double-handles LEG/AHJ (early civic branch + `LAYERS` loop). Cluster counts dummy: `stateCounts()` discards `searchAhj("a"|"e"|"i")` then zeros centroids; `buildStateCounts()` walks only 12 `FEATURED_AHJ_IDS` and `Math.max(n, 1)` labels every pack.

**I — Intent.** Harden first, then one kit. Never 16 165 / 14 925 pins.

**A — Action.** Dedupe parser. Fix permit-pins counts. Finish KIT-06 only: lazy Rest search + zoom-gated clusters. Park KIT-07.
