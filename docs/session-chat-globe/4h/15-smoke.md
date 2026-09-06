# 4h / 15 — PC 1440 smoke (dark comms + local Insight)

**Class:** public-suite WIP · localhost · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Rest. Not `scripts/browser-smoke.mjs` (1280×800 / 390).  
**Plan:** `../15-smoke.md`. Leftover 1 is on disk: `insight-local.ts` + `comms.ts` `!res.ok` → `insightFromUserText`.

## Verdict: **GO**

XAI **dark**. Local Insight is live. 1440×900 `?globe=1` sitting GO on the 4h lines. Not a ship.

## How

Viewport **1440×900**, desktop UA, `http://127.0.0.1:8080/?globe=1`. **Just the globe** (not Planes / Space / Yelling). Header place **Earth** before comms. Type tokyo / canada / japan in **comms**, never the bar. `take me to` on the bar after close.

`askedToMove("what's over tokyo")` **false** · `askedToMove("take me to sydney")` **true** (`scripts/insight-local.test.mjs` PASS).

## Lines

| # | Action | Result |
|---|--------|--------|
| 1 | Open comms | Panel `aria-label="Grok comms"`. Local greeting. Command bar **gone** (`!chatOpen`). Canvas **1**. Place **Earth**. |
| 2 | Comms `what's over tokyo` | Camera **unchanged** `18.000°N 32.000°W` · 22 Mm. Place still Earth. No 2.6s `flyTo`. Dark bubble + **KEPT** card **Japan** · 465 of 465 named · **Fly** + **Open desk**. |
| 3 | Comms `canada` · `japan` | **Canada** House of Commons · 338 of 343 named. **Japan** House of Representatives · 465 of 465. Both 33-kit desk cards. Camera still. |
| 4 | Click **Fly** (Canada card) | Camera **45.419°N 75.702°W** · **1_200_000** m (kit lat/lon, LEG_H). Opt-in only. |
| 5 | Close comms. Bar `take me to sydney` | Place **Sydney**. `33.940°S 151.175°E` · 10 km. Globe still mounted. Bar back. |

Dark copy: `Comms are dark in this environment. The globe still works. Card is from the on-disk kits, not a live Grok turn.`

## Tokyo is a kit card, not the city preset

`insightFromUserText` strips `what's over`, then `matchKeptDesk("tokyo")` unique capital-includes → **jp** (not `locations.ts` nrt). 4h bar: named kit → card, no auto-zoom. **GO**. Seat 08 leftover “bare tokyo stays P0 Narita” is still true on the **bar** (`commands.ts` `^(tokyo|…)$` → `flyTo`). Comms local path prefers the 33.

## Fail closed (none this sitting)

Auto-fly on `what's over tokyo` · canada/japan with no desk card · Fly shrug · `take me to` dead on the **bar** · globe unmounted · `?globe=1` went flat · 390 as this sitting.

## Leftovers (coordinator `src/`, not this file)

1. Dark comms + fly-ask (`take me to …` **in chat**): `askedToMove` → `insightFromUserText` **null**; `!res.ok` skips `parseTaggedAction`. Bar still flies. Optional: dark asked-to-move could `applyAction({type:"flyTo"})` without a key.
2. Kept **Fly** uses `engine.flyTo(lon,lat,LEG_H)` and does **not** `setPlace`. Header stayed **Earth** after the Canada fly. Bar `lookupPlace` does set place (Sydney).
3. Footer cam hides while comms open (`!chatOpen`). Line 2 used header place + close-then-footer.
4. `insight-local.test.mjs` only hits `askedToMove`, not `insightFromUserText` (vite `import.meta.glob`).

**Close:** Dark comms paints the same Insight card. No auto-zoom. Fly is a click. `take me to` still flies from the bar. Not a ship.
