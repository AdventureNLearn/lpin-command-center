# Hour 0 · seat 17 · `src/styles.css`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** develop (CLOCK T+0) · one writer · this file only

## Done

- `.holo-insight` is a **1440×900 default**, not a 390-first rule plus `@media (min-width: 768px)`.
- Docks **left of** the 22rem comms/desk rail: `right: calc(22rem + 1.5rem)`.
- `bottom: 10rem` (160px) clears the command bar at 1440×900 (~16px footer offset + ~60px row panel + ~20px coords ≈ 96px) plus `.holo-card` drop-shadow (`0 18px 40px`) and the 8px `holo-in` dip. Was `7.5rem` / 120px — shadow painted into the bar.
- `z-index: 26` stays under the footer `z-30`. Peek (`.holo-card` without `.holo-insight`) unchanged.

## Verify

`tsc --noEmit` **PASS** (local `typescript/bin/tsc`, 2026-08-30 hour 0). CSS-only.

## Not this seat

Peek pointer placement. InsightCard markup / `.holo-grab` 100% stack (seat 03). OverlayHud footer hide while comms (seat 10). 390 layout. Live gevradio.
