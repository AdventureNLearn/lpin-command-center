# Seat 04 — Holo card UI

**Target:** public-suite WIP · `sandbox/work/groks-eye-view-next`  
**Law:** Peek ≠ Insight. Shared glass chrome only. No merge. PC cockpit (`?globe=1`).  
**Verdict: GO** — two objects already on disk; coordinator may keep this split.

## Two objects (do not merge)

| | Peek | Insight |
|---|---|---|
| File | `src/components/intel/PeekCard.tsx` | `src/components/intel/InsightCard.tsx` |
| Store | `peek: { contact, x, y }` | `insight: Insight` |
| Mount | OverlayHud L728 then L729, both siblings | same |
| Class | `holo-card` only | `holo-card holo-insight` |
| Life | hover → 5s meter → fade / Grab | sticky until Dismiss |
| Move | Grab → `engine.track` | Fly only if `q` |

Shared CSS in `styles.css` `.holo-card` (L251–269): glass gradient, 20px blur, z-index 26, width `min(18.75rem, …)`. Chrome is shared. Objects are not.

## Peek — pointer / 5s / Grab (keep)

- Globe `MOUSE_MOVE` (`globeEngine.ts` ~L1383–1398) peeks **satellites only**; cockpit / already-tracked skip.
- `HOLD_MS = 5000`, `FADE_MS = 420`. Card hover `setHeld(true)` pauses the meter. Leave resumes. `data-leaving` then `setPeek(null)`.
- Position: pointer + 18px, flip if near edges (`cardW=300`, `cardH=252`).
- One control: **Grab**. Track, clear peek, flash. Does **not** `setInsight`.
- Hidden when `cockpit`. Hint: “Closes in 5s unless you grab”.

## Insight — sticky glass (keep)

- No timer, no `data-leaving`. Renders while `insight` set; bubble **Card · title** or `comms.ts` `setInsight`.
- Controls in `.holo-actions`: **Fly** (`q` → `applyAction flyTo` — opt-in, no auto-zoom), **Open desk** (`desk` → layer on + drawer, globe stays), **Show layer** (layer without desk), **Dismiss** → `setInsight(null)` only (chat stays).
- Kicker `{system} · card`; body in `.holo-meta`; honesty in `.holo-hint` (`insight.source`).

## PC vs comms panel

Comms: `md:right-4 md:w-[22rem] md:bottom-24` (z-20).  
`.holo-insight` `@media (min-width: 768px)`: `right: calc(22rem + 1.5rem); bottom: 7.5rem` — docks **left of** the 22rem jump-seat, not inside it. Narrow: `left: 1rem; bottom: 7rem` (not this sitting’s phone layout). DeskDrawer uses the same 22rem right column; Open desk must not become a second homepage.

## Leftovers (coordinator / later seats, not this file)

1. Fly / Open desk / Dismiss all use `.holo-grab` (uppercase Grab chrome). Peek owns Grab; Insight should not look like Grab.
2. Insight offset does not collapse when comms is closed — empty right gutter.
3. Peek + Insight both z-26; pointer Peek can cover sticky Insight.
4. Bubble **Fly** chip (`CommsChat` InsightChips) flies without the card — seat 05.
5. Title `white-space: nowrap` will clip civic titles.

No `src/` from this seat. No live gevradio. No Bogpulse.
