# Cycle 1 · seat 17 · `src/styles.css`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** iterate → audit → forecast → execute · one writer · this file only  
**Audience:** `USEFUL-TOOL.md` everyday + serious

## Iterate

Hour 0: `.holo-insight` is 1440-default (`right: calc(22rem + 1.5rem)`, `bottom: 10rem`, `z-index: 26`). Peek stays `.holo-card` without this class.

Leftover in this file: `.holo-grab { width:100% }` stacked Look here / Open the file / Close into a tall Grab column. Card drop-shadow `0 18px 40px` still reached toward the command bar (gap 64px vs ~58px shadow).

## Audit

PC 1440×900, comms closed (everyday types in the bar; card still up):

| | Measure |
|--|---------|
| Command bar | footer `md:bottom-4` z-30 · row panel ~60px + coords ~20px ≈ **96px** |
| Card box | bottom **10rem / 160px** · grows up · z-26 |
| Horizontal | card 18.75rem parked left of 22rem rail **overlaps** centered `max-w-3xl` bar in X |
| Vertical | 64px gap — only protection |
| Risk | stacked 44px Grab buttons + downward glow paint the bar |

Serious path (desk + comms): bar unmounts while chat open — not this file. 390 not this sitting.

## Forecast

Keep rail dock + 10rem. Unstack insight actions into `.holo-actions` row. Shorten downward shadow so glow cannot paint the bar. Cap height so long evidence-gate copy scrolls inside the card, never into the footer band.

## Execute

- `.holo-insight .holo-grab`: `width:auto; flex:1 1 auto; margin-top:0` — Look here / Open the file / Close sit in a row. Peek Grab stays 100% width.
- Downward shadow `0 6px 16px` (was inherited `0 18px 40px`).
- `max-height: calc(100svh - 10rem - 5rem); overflow-y: auto`.

## Verify

`tsc --noEmit` **PASS** (local `typescript/bin/tsc`, 2026-08-30 cycle 1). CSS-only.

## Not this seat

Peek pointer placement. InsightCard labels (seat 03). OverlayHud `!chatOpen` footer hide. 390. Live gevradio.
