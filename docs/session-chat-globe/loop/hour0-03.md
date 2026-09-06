# Hour 0 — seat 03 InsightCard

**Phase:** develop · **Not a ship** · **Class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/InsightCard.tsx`

## Harden

- Fly still uses `lat` / `lon` / `height` when present (`engine.flyTo`, height default `80_000`).
- If `q` is ISS (`iss` / `the iss` / `international space station`, optional parenthetical), Fly calls `applyAction({ type: "trackNearest", kind: "iss" })`. Does **not** `flyTo` / `lookupPlace("ISS")` → locations preset `0,0` / `2_000_000`.
- ISS `q` is checked **before** lat/lon so a tagged `q:"ISS"` with dummy `0,0` still tracks the contact.
- Peek is not imported. PeekCard stays a sibling on OverlayHud. Peek ≠ Insight.

## tsc

`npm run typecheck` (`tsc --noEmit`) **PASS** 2026-08-30 after this file.

## Leftovers (not this seat)

- Bubble Fly chip in `CommsChat.tsx` still `flyTo` on `q`. Same ISS 0,0 leak if chips fire without the card.
- `insight-local.ts` ISS utterance often has no `q` (layer-only card) — Fly hidden until a later seat fills `q:"ISS"`.
