# Hour 3 AUDIT — seat 09 `LayerSubs.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**File owned:** `src/components/intel/LayerSubs.tsx` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** audit-heavy · no new features

## Verdict: **GO**

No FAIL leftover in this file. Did not edit `src/`. Did not run a no-op `tsc`.

## Audit

| Bar | Mark | Disk |
|-----|------|------|
| Legislature hints use `keptCountLine` (not `{named} of 0`) | **GO** | Import + `hint={keptCountLine(d)}` (`LayerSubs.tsx` 1, 51). Helper: named 0 → `no sourced roster`; seats ≤ 0 → `{n} named`; else `{n} of {s} named`. |
| Featured cities / By state English | **GO** | Kickers `Featured cities` / `By state` (72, 93). |
| Jobsite opens empty desk, no pins, no fly | **GO** | One kid: `setDesk({ system: "jobsite", id: "" })`. No `engine`, no `flyTo`, no `track`, no `lookupPlace`. Hint: “Type a pack. No pins.” |
| Permit featured Core only | **GO** | City kids = `FEATURED_AHJ_IDS` with coords **and** `permitLayer(id) === "core"` (77). Extra/More are counts on state rows, not city buttons. |
| No Rest | **GO** | No `rest-search` / `places-rest` / `setPermitRest`. State hint “Rest not mapped”. |

## Audiences (this rail)

| Audience | Check | Mark |
|----------|--------|------|
| Everyday | English section labels | GO |
| Everyday | Honest hole, not a fake pack | GO jobsite |
| Serious | 33 kits, hole language | GO via `keptCountLine` |
| Serious | Core/featured, Rest a count | GO |
| Serious | Human click, no auto-zoom from this file | GO (LEG/AHJ/track still **explicit** click fly) |

## Execute

**Stop.** No patch.

## Not this seat

Chat must not call these click handlers. `keptCountLine` body is `desks.ts`. DeskDrawer / InsightCard / comms / Rest search-lite. OverlayHud Esc. Smoke T+3:45.
