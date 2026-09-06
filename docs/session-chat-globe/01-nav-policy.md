# 01 — Nav policy (fly vs card vs nothing)

**Seat:** 01 · **Class:** public-suite WIP · **Tree:** `sandbox/work/groks-eye-view-next`  
**Verdict:** **GO** (policy). Coordinator owns `src/`. Live gevradio frozen.

## When the globe moves

| Outcome | Trigger | Camera |
|---------|---------|--------|
| **MOVE** | Human asked fly / take me / go to / jump / navigate / *show me on the globe* / move the globe / bring us|me to (`askedToMove` in `insight.ts:29–32`). Same if they **click** Fly, LEG/AHJ sub, kit row, globe entity, FirstRun pick, scene phrase, or share-hash restore. | Existing `engine.flyTo` / `lookupPlace` / `trackNearest` → `viewer.flyTo`. Heights: LEG `1_200_000`, state `700_000`, featured AHJ `80_000` (`LayerSubs.tsx:8–10`). |
| **CARD** | Chat names a place/tool and did **not** ask to move. `<<ACTION:flyTo>>` with no fly-ask. Civic mention without a fly verb. | **No camera.** Set Insight. Fly on the card if `q` or lat/lon exists. |
| **NOTHING** | No `q`, no coord, orbit/“the planet”, jobsite with no resolvable pack point, honest hole, layer on/off with no place, Peek hover. | No-op. Do not invent pins. |

**Law:** Chat never auto-flies. Explicit LEG/AHJ **clicks** may still fly. Peek stays pointer (`PeekCard.tsx` Grab → `track`, no `flyTo`). Insight is conversation. Do not merge them.

## Call sites (disk)

| Site | Evidence | Mark |
|------|----------|------|
| Comms `ACTION` flyTo + `askedToMove` | `comms.ts:121–122` then `applyAction` | **KEEP** |
| Comms `ACTION` flyTo, no fly-ask | `comms.ts:123` → `insightFromFlyQuery` | **CARD** (already) |
| Comms other ACTION (`trackNearest`, `reset`, `next`, `cockpit`) | `comms.ts:125–134` apply with **no** `askedToMove` | **CARD** if place-ish; **REMOVE** camera unless user asked. `trackNearest` flies (`globeEngine.ts:1252`) |
| Insight **Fly** | `InsightCard.tsx:10–13` | **KEEP** |
| Bubble **Fly** chip | `CommsChat.tsx:144–154` | **KEEP** |
| Bubble **Card** chip | `CommsChat.tsx:137–143` `setInsight` only | **CARD** |
| LayerSubs LEG country | `LayerSubs.tsx:50–54` click → `flyTo` `LEG_H` + desk + `track(leg-*)` | **KEEP** |
| LayerSubs AHJ featured | `LayerSubs.tsx:81–85` `CITY_H` | **KEEP** |
| LayerSubs AHJ state pack | `LayerSubs.tsx:101–104` `STATE_H` | **KEEP** |
| LayerSubs jobsite | `LayerSubs.tsx:115–126` `setDesk` only | **NOTHING** |
| LayerSubs live “Track nearest” | `LayerSubs.tsx:136–141` | **KEEP** (click) |
| Peek Grab | `PeekCard.tsx:68–71` `engine.track` | **KEEP** (Peek, not Insight) |
| Globe LEFT_CLICK entity | `globeEngine.ts:1365–1379` `track(id)` + LEG/AHJ desk | **KEEP** (click; Cesium follow) |
| Command bar fly verbs | `commands.ts:204–207` + `runCommand.ts:251–253` | **KEEP** |
| Bare P0 place list | `commands.ts:214–216` | **KEEP** in command bar; chat must **CARD** |
| `open` / `show me` as fly prefixes | `commands.ts:204–207` (`show me` ≠ spine “on the globe”) | **CARD** in chat; bar **KEEP** only if fly-ask |
| `keptOpen` always `flyTo` 1.2Mm | `runCommand.ts:178–186` (`open canada`, chamber) | **KEEP** if `askedToMove` or LayerSubs-class click; else **CARD** + desk. `take me to the chamber in` is a fly-ask (`commands.ts:113–117`) |
| `permitSearch` auto `lookupPlace` | `runCommand.ts:164,175` | **REMOVE** auto-fly → **CARD** + desk unless asked |
| DeskDrawer kit button | `DeskDrawer.tsx:595–601` | **KEEP** (click) |
| DeskDrawer permit hit | `DeskDrawer.tsx:122–126` `lookupPlace` | **KEEP** (click) |
| Jobsite lookup | `KIT-10-jobsite.md`; `packs.ts:26–40` no coords; drawer `DeskDrawer.tsx:627–632` | **NOTHING**. Fly only later if user typed a place `lookupPlace` already resolves — still opt-in Fly, not auto |
| FirstRun / scenes / share hash | `FirstRun.tsx:44,50,56`; `scenes.ts:16–38`; `globeEngine.ts:1548–1549` | **KEEP** (user pick / restore). Not a chat path |
| Engine primitives | `globeEngine.ts:1276–1320` `flyTo`/`resetGlobe`/`lookupPlace` | **KEEP** as camera. Callers apply this table. Geocode height `48_000` ≠ featured `80_000` — leftover |
| `flatEngine.ts` twin | `flatEngine.ts:256–322` | Same table. Not a second grammar |

Chat must **not** call LayerSubs click handlers. Link in bubble → Insight only (`00-SPINE.md`).

## Leftovers (coordinator)

1. Gate **all** comms ACTION cameras on `askedToMove`, not only `flyTo`.
2. Stop `permitSearch` / unasked `keptOpen` from yanking the camera.
3. Align `askedToMove` with command-bar prefixes (`show me` vs `show me on the globe`).
4. `lookupPlace` geocode `48_000` vs AHJ `80_000`.
5. `world.ts` interpretCommand can still emit `flyTo`; command-bar unknown must not become a silent fly.

**NO-GO if:** chat `ACTION:flyTo` moves the globe without a fly-ask, or jobsite grows orbit pins. Disk already cards unasked comms flyTo (`comms.ts:121–123`). Remaining leaks are `trackNearest`/`reset` tags, `permitSearch`, and `keptOpen`.
