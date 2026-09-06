# Seat 15 — Smoke plan (PC 1440)

**Class:** public-suite WIP · tree `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No Playwright. No live gevradio. No Bogpulse.  
**Verdict: GO** to run. Sitting GO only if lines 1–5 PASS. XAI dark → line 3 SKIP (see fallback).

## How

Viewport **1440×900**, desktop UA. `http://127.0.0.1:8080/?globe=1` (`phone.ts`: globe=1 → Cesium).  
Start: `node.exe scripts/with-app-env.mjs node.exe node_modules/vite/bin/vite.js dev --host 0.0.0.0 --port 8080`  
Esc first-run (or **Just the globe**). Do not pick Planes/Space/Yelling — those fly (`FirstRun.tsx`). Header place **Earth** (`OverlayHud` L286). Note footer lat/lon/alt **before** G (L697; footer dies while comms open). Not 390. Not `scripts/browser-smoke.mjs` (1280×800).

Chat phrase (no fly-ask; `askedToMove` false — seat 11): `what's over tokyo`  
Bar fly: `take me to sydney` · radio: `put on creedence`  
Presets on disk: `commands.ts` 204–216 · `locations.ts` nrt/sydney.

## 5-line PC 1440

| # | Action | Expect |
|---|--------|--------|
| 1 | **G** or header Comms | `aria-label="Grok comms"`. Local greeting. Command bar gone (`!chatOpen`). Cesium still mounted. |
| 2 | Comms: `what's over tokyo`. No fly / take me / go to / jump to / navigate. | Camera **unchanged**. Header place still Earth. No 2.6s `flyTo`. |
| 3 | Same Grok reply | Bubble `Card · {title}` (`CommsChat` InsightChips). `.holo-insight` with **Fly**. Peek is not this card. |
| 4 | Click **Fly** (card or bubble) | Camera moves. Place **Tokyo**. Dismiss → card gone, chat stays. |
| 5 | `take me to sydney` still flies. Close comms. Bar `put on creedence`. | Place **Sydney**. Station **Creedence** / `ccr`. Globe up. |

`npm run typecheck` (`tsc --noEmit`) after implement — spine done-when 5, not a sixth browser line.

## XAI may be dark

`chat.ts` L108: no `XAI_API_KEY` → `"Comms are dark in this environment. The globe still works."`  
`comms.send` on `!res.ok`: error bubble only — **no** `parseTaggedAction`, **no** `setInsight`.  
`world.ts` `interpretCommand` also dark.

**Local-parse fallback that exists:** command bar `parseCommand` — `take me to …` / bare `tokyo` / `put on creedence`. No Grok.

**Does not exist:** comms local Insight when dark. Do not console-`setInsight` and tick line 3.

Dark ticks: 1 PASS · 2 camera-unchanged PASS (error, no fly) · 3 **SKIP** · 4 via bar `take me to sydney` PASS · 5 PASS. Sitting **NO-GO** on spine done-when 1–2 until key is live or leftover 1 ships. Type line 2 in **comms**, never the bar (`interpretCommand` can still fly).

## Fail closed

Auto-fly on `what's over tokyo` · live comms with no card+link · Fly on tokyo preset shrugs · `take me to` dead on chat **and** bar · Creedence dead · globe unmounted · `?globe=1` went flat · Playwright as proof · 390 as this sitting.

## 5-line log

```
1. Comms open (G, 1440×900 ?globe=1):
2. what's over tokyo → camera:
3. Card + link / Fly moves:
4. take me to sydney (chat live / bar fallback):
5. put on creedence:
XAI: live / dark    tsc --noEmit:
```

## Leftovers

1. Dark comms: if `!askedToMove` and the utterance names a preset (`tokyo`), `insightFromFlyQuery` so line 3 is not key-gated. Not on disk. `matchPreset` of the whole sentence will miss.
2. Footer cam hides with comms — line 2 is header place + eyeball.
3. No unit test of `askedToMove` / `parseTaggedAction` (seats 02 / 11).

**E** 2026-08-30: `comms.ts` send + parseTaggedAction · `insight.ts` askedToMove · `chat.ts` SYSTEM/dark · `commands.ts` take-me-to · `radio.ts` ccr · OverlayHud G + `!chatOpen` footer · InsightCard / InsightChips · `phone.ts` globe=1 · seat 12 1440.

Stop. Manual localhost. Live gevradio **no**.
