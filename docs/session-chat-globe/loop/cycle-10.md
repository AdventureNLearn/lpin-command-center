# Cycle — seat 10 OverlayHud

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/OverlayHud.tsx`  
**Phase:** iterate → audit → forecast → execute  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`

## Iterate (hour 0)

Esc peels Insight first (`setInsight(null)` only). Globe stays. `<InsightCard />` stays mounted. Command hint is store-owned and already everyday — this file only reads `placeholder={hint}`.

## Audit (USEFUL-TOOL)

| Audience | OverlayHud |
|----------|------------|
| Everyday | Boot kicker was skill-chrome (“all-seeing meme”). Rail said “Open sources” not public feeds. Talk control said “Comms”. Hint already everyday — leave it. |
| Serious | **FAIL:** G key + Talk button `setDesk(null)` — could not keep Grok open on a 33-kit desk. Esc already left chat+desk on insight dismiss. Rail could stack with desk (`!desk` missing). |

Peek ≠ Insight. No auto-zoom from this file. No command-hint rewrite.

## Forecast

Execute this file: comms+desk together; rail exclusive vs desk; everyday boot/feeds/Talk copy. Esc order unchanged. Hint untouched.

Next cycle (not this file): empty-state desk body, stranger smoke, radio still mutex vs desk.

## Execute

- G / Talk: open chat without `setDesk(null)`. Corpus/radio/rail still yield.
- L / Layers: opening the rail closes desk. `useEffect` + gate `!desk` so a command-path desk cannot stack the rail.
- Boot kicker “Waking the globe”. Rail kicker “Public feeds”. Toolbar “Talk”.
- Esc still: insight (if card paints) → install → comms → radio → first-run → desk → corpus → cockpit → tracked → rail.

## Verify

`tsc --noEmit` PASS (local `typescript/bin/tsc`).

OPSEC: localhost, not public. No municipality samples. Live gevradio frozen.
