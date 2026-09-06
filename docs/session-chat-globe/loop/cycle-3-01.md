# Hour 3 · seat 01 · insight-local.ts (AUDIT)

**Class:** public-suite WIP · not a ship · 33 kits · no live gevradio · no Rest · no insind
**File:** `src/lib/intel/insight-local.ts` only. Law: `USEFUL-TOOL.md`. No new features.

## Iterate
Read file vs USEFUL-TOOL. Cycle-1 bodies on disk. Who-sits prefixes (`who sits in` / `who sits` / `who's in` / `who is in`) on `strip`. `keptCountLine` from desks.ts. `askedToMove` still nulls this function (no camera). Peek ≠ Insight.

## Audit

| Bar | Verdict | Evidence |
|-----|---------|----------|
| Everyday “what’s over Japan” → card, not yank | **GO** | `askedToMove` false. Strip → `Japan`. `matchKeptDesk` name-exact `jp`. Returns Insight only. |
| Everyday “who sits in Canada” → card, not yank | **GO** | Strip `who sits in` → `Canada`. Kit name Canada. 338 of 343 + vacancies not invented. |
| Everyday “who sits in France” → card, not yank | **GO** | Strip → `France`. `seats` filed 0; `keptRosterLine` uses `keptCountLine` + `seats <= 0` → `595 sitting names as filed` (no `of 0`). |
| Look here optional (copy) | **GO** | Bodies: “if you want” / “Optional” / ISS “No auto-track.” Chrome is seat 03. |
| Serious keptCountLine honesty | **GO** | Empty → everyday hole; full → as filed; named &lt; seats → `{line} — vacancies not invented`. No minted chamber size. |
| Permit unverified · no Rest | **GO** | `pickAhjCore` only. Body: portal not verified. Empty query undefined. |
| Jobsite hole | **GO** | Jobsite words only. No `q`. “We don’t have a claims pack… empty — not a complete picture. No pins.” Source `JOBSITE_HONESTY`. |
| ISS no auto-track | **GO** | Card + `q:"ISS"`. Body “No auto-track.” This file never `track` / `flyTo`. |
| No Rest · no demo city | **GO** | No Rest import. No canned city without the user typing it. Comms `tokyo` → `jp`, not Narita. |
| Particles `in`/`it` ≠ India/Italy | **GO** | `isParticleIso` nulls leftover `in`/`it`. “who sits in” + particle leftover nulls. Names `India`/`Italy` still GO. |

## Forecast
Leftover in this file only (not FAIL vs this hour’s bars): intel-layer `source` is still the string `Live intel · public feeds` even when `LAYER_META.freshness` is `simulated` (vessels) — the body already prints `source · freshness`; preset `source` still says `opt-in fly` while the body says Look here; permit `source` still `Permit Harbor catalog · delayed` while unverified sits in the body. No listed bar fails. Do not patch.

## Execute
No `src` edit. GO → stop. Not a ship.
