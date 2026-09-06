# Hour 3 AUDIT — seat 17 `styles.css`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/styles.css` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** hour 3 audit-heavy · no new features

No FORECAST.md. No other CLOCK files.

## Verdict: **GO**

No FAIL leftover in this file. Note and stop. `src/` not edited this hour. `tsc --noEmit` not re-run (no edit).

## Checklist

| Check | Disk | |
|-------|------|---|
| PC `.holo-insight` docked | Unscoped 1440 default: `right: calc(22rem + 1.5rem)`, `bottom: 10rem`, `z-index: 26` (footer command bar `z-30`). No `@media (min-width: 768px)` 390-first wrap. | **GO** |
| Actions in a row, not a Grab stack | `.holo-actions` flex wrap. `.holo-insight .holo-grab` `width:auto; flex:1 1 auto; margin-top:0`. InsightCard buttons live in `.holo-actions`. | **GO** |
| max-height scroll | `max-height: calc(100svh - 10rem - 5rem); overflow-y: auto`. Long source/body stays above the command-bar band. | **GO** |
| Peek not using `holo-insight` | PeekCard `className="holo-card holo-peek"` + inline `left/top`. No `.holo-insight` class. Peek `.holo-grab` keeps `width:100%`. | **GO** |
| No new homepage CSS | No desk-route / full-viewport / second-shell rules. Globe shell + overlays only. | **GO** |

Everyday: card sits above the command bar so they can still type; Look here is a row control, not a yank. Serious: evidence-gate copy scrolls inside the glass; comms 22rem rail stays clear; no auto-truth chrome.

## Execute

None. GO → stop.

## Leftovers (not FAIL this hour)

- `.holo-grab` still uppercase Grab chrome on Insight buttons (named by seat 03). Not in this hour’s GO/NO-GO list.
- `.holo-title { white-space: nowrap }` can clip civic titles. Not this hour.
- OverlayHud `!chatOpen` unmounts the command bar. Not this file.
- 390. Out of sitting.

## Ship?

no
