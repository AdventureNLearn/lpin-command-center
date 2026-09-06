# 13 — Intel layers (FLT / MIL / AIS / SAT / EQ / FIR / MSN)

**Seat:** 13 · **Class:** public-suite WIP · **Tree:** `sandbox/work/groks-eye-view-next`  
**This sitting writes this file only.** No `src/`. No live gevradio. Coordinator owns `src/`.

## Verdict: GO (no unasked track)

`trackNearest` is **gated** in `comms.ts`. Chat **Show layer** / offer Fly. Peek stays hover. Seat 10 (`10-intel-layers.md`) was NO-GO on unasked track — that leak is closed.

## 4h bar

| Bar | Disk |
|-----|------|
| Show layer | `InsightCard.tsx` 28–54 `setLayer(id, { on: true })`. No track. No Peek. |
| Offer track | Fly if `q` or lat/lon. LayerSubs “Track nearest” is a **click** (`LayerSubs.tsx` 12–16, 140). |
| Peek stays hover | `globeEngine.ts` 1383–1397 `MOUSE_MOVE` → `pickSatId` → `kind === "satellite"` only. |
| No unasked track | `comms.ts` 131–144. |

## Gate (`comms.ts`)

`parseTaggedAction` accepts `trackNearest` only for `flight | vessel | satellite | iss`.

Apply **only if** `askedToMove(userText)` **or** `/\b(track|lock|grab|follow)\b/i` on the user turn (`comms.ts` 135–136). Else `action: null` and a card: `insighted.insight ?? insightFromFlyQuery(iss → "ISS" else kind)` (`comms.ts` 138–144). Camera does not move.

`flyTo` already cards when unasked (`comms.ts` 122–124). Asked “track the ISS” / “follow that plane” still runs `applyAction` → `runCommand.ts` 269–277 (layer on + `engine.trackNearest`).

**Not asked:** “what’s the ISS doing” / “any planes up” must not track. Parser drops the ACTION.

Peek is pointer. `setPeek` callers: `globeEngine.ts` 1397 spawn, 1188 clear on `track()`, `PeekCard.tsx` 49/70. **No comms path.** OverlayHud mounts Peek + Insight as siblings (728–729). 5 s hold, Grab → `engine.track`. Do not merge Peek into Insight.

## Per-layer (chat)

| short | LayerId | Show layer | Offer Fly/track | Peek from chat |
|-------|---------|------------|-----------------|----------------|
| FLT | flights | on | nearest flight (asked) | never |
| MIL | military | on | offer FLT track; no MIL kind | never |
| AIS | vessels | on | nearest vessel (asked). Honesty: modeled unless key | never |
| SAT | satellites | on | nearest sat / ISS (asked) | never (hover Peek) |
| EQ | earthquakes | on | Fly only if `q` or lat/lon | never |
| FIR | fires | same | same | never |
| MSN | launches | same | same | never |

ISS is SAT, not a LayerId. Command-bar `iss` / `track iss` is `trackNearest` (`commands.ts` 188–192) — typed bar, not chat.

`insight-local.ts` 81–98: unasked `iss\|planes\|flights\|satellites\|ships\|vessels\|quakes\|fires` → Insight `{ system:"intel", layer }` body “No auto-track.” ISS string falls through to **flights** (no `\bsat`). Card still Show layer, no track.

## Leftovers (coordinator / `src/`, not this file)

1. Card Fly is `applyAction({ type:"flyTo", q })` (`InsightCard.tsx` 17–18). Unasked ISS card `q:"ISS"` hits `locations.ts` preset 0,0 / 2_000_000 — **not** `trackNearest("iss")`. No Track button.
2. ACTION `layer` still applies with no ask (`comms.ts` 164–177). 4h bar is Show layer on the card; auto-on is leftover.
3. Ask regex includes `grab` (Peek’s word) and omits `nearest`. `askedToMove` also opens track.
4. Bubble chips: Card + Fly, no Show layer (`CommsChat.tsx` 134–181).
5. Do not retarget FLT/FIR this sitting.

**Done-when:** unasked live-intel chat shows a link + glass card; globe does not track; Show layer / Fly wait for the human; Peek is still hover; “track the ISS” still tracks.
