# Hour 3 AUDIT — seat 10 OverlayHud

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/OverlayHud.tsx`  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** audit-heavy · no new features · no FORECAST/CLOCK edit

## Verdict: **GO**

No FAIL leftover in this file against the named claims. **No `src/` edit.** Stop.

## Named claims (disk)

| Claim | State | Evidence |
|-------|--------|----------|
| G / Talk opens comms without `setDesk(null)` | **GO** | G key L158–166: `setOpen` then radio/rail/corpus yield. Talk button L349–357: same. Neither calls `setDesk`. `setCorpusOpen(false)` keeps `desk` (store: false → `s.desk`). Serious #4: Grok can stay on a 33-kit drawer. |
| L / Layers exclusive vs desk | **GO** | L191–198 and Layers L388–394: opening rail `setDesk(null)`. Gate L434 `&& !desk`. `useEffect` L216–218 closes rail when desk is set. Command-path desk cannot stack the rail. |
| Esc peels insight first; globe stays | **GO** | L120–125: if `insight && !cockpit` → `setInsight(null)` only, return. Chat, desk, engine untouched. No `resetGlobe`. No `GlobeCanvas` (IntelApp sibling). `<InsightCard />` stays mounted L741. |
| Boot / Talk / Public feeds English, not skill-chrome | **GO** | Boot kicker L259 “Waking the globe”. Toolbar L347–361 title/aria/label “Talk to Grok” / “Talk”. Rail kicker L438 “Public feeds”. No “all-seeing meme”, no “Comms”, no “Open sources”. |
| Command hint store-owned | **GO** | `hint = useIntel(s => s.commandHint)` L75. Input `placeholder={hint}` L695. This file does not hardcode the hint. Do not rewrite. |

## USEFUL-TOOL (this file only)

- **Everyday:** talk control is English; public feeds kicker matches planes/quakes/fire as feeds; hint not rewritten here. Card/Look here live on InsightCard, not this peel.
- **Serious:** comms+desk on G/Talk. Esc dismiss is not auto-zoom. Human Fly / Open desk stay on the card.

## Not FAIL of the named list (do not patch this hour)

Radio R + picker button still `setDesk(null)` (mutex, not comms). L still closes comms when the rail opens. Toolbar still says “Corpus”. Cockpit kicker “You are the plane now”. Footer still hides while `chatOpen` (comms has its own input). Empty-state desk body is DeskDrawer.

## Execute

None. GO → note and stop. `tsc --noEmit` N/A (no edit).

OPSEC: localhost harden. No municipality samples. Live gevradio frozen.
