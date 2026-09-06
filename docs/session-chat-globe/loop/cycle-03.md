# Cycle 1 — seat 03 `InsightCard.tsx`

**Class:** public-suite WIP · **Not a ship**  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**File owned:** `src/components/intel/InsightCard.tsx` only

## Iterate

Hour 0: ISS Fly → `trackNearest iss` (not 0,0). Peek not imported.  
This cycle: buttons already **Look here** / **Open the file** / **Show on the map** / **Close**. Kickers already Legislature / Building desk / Jobsite / Live map. Toasts still said “Flying to” and raw `layer on`.

## Audit vs everyday + serious

| Audience | Check | Disk |
|----------|--------|------|
| Everyday | Card, not a yank | **GO** — Look here is a click |
| Everyday | Press Look here; they never have to | **GO** — label exact; hidden unless `q` or lat/lon |
| Everyday | Open legislature / building desk | **GO** — Open the file on `desk` |
| Everyday | Planes / quakes / fire as public feeds | **GO** action (Show on the map). Toast was **FAIL** (`flights on`) |
| Everyday | Honest empty, not fake complete | **GO** — card renders `source`; does not score |
| Serious | Delayed / sourced / hole on the glass | **GO** — `holo-hint` is `insight.source` |
| Serious | No auto-score / auto-truth / auto-zoom | **GO** |
| Serious | Human final call on Look here / Open the file | **GO** |
| Serious | ISS is a live contact, not 0,0 | **GO** (hour 0) |
| Both | Peek ≠ Insight | **GO** — Peek not imported |

**Verdict:** GO on controls. Toast copy was the leftover this seat could execute.

## Forecast

Keep the four button labels exact. Reword toasts to match Look here / Show on the map. Do not add Peek, a fifth button, or a second homepage.

## Execute

- `Flying to …` → `Looking at …` (ISS → `Looking at the ISS`)
- `${layer} on` → `${LAYER_META[id].label} on the map`
- Buttons unchanged: Look here / Open the file / Show on the map / Close

`tsc --noEmit` after this file: **this file clean**. Tree FAIL is `PeekCard.tsx` (`satFreshness`, seat 11) — not this writer.

## Leftovers (not this seat)

- Bubble chips still omit Show on the map (`CommsChat.tsx`).
- `applyAction` desk still closes comms (serious: keep chat + desk).
- ISS body in `insight-local.ts` still says “Fly tracks”.
