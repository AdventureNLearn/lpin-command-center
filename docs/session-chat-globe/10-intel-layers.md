# Seat 10 — Live intel layers (FLT / MIL / AIS / SAT / EQ / FIR / MSN)

**Target class:** public-suite WIP · **tree:** `sandbox/work/groks-eye-view-next`  
**This sitting writes this file only.** No `src/`. No live gevradio. No Bogpulse.

## Verdict: NO-GO (chat auto-track)

Engine + `LAYER_META` + Peek isolation are **GO**. Chat-follows-globe is **NO-GO**: unasked `<<ACTION:trackNearest>>` still runs. Peek/Grab stay pointer-only — do not merge into Insight.

## Law

Chat may **Show layer** or **offer Fly/track**. Peek/Grab stays pointer-only. **No auto-track from chat unless asked.**

| Control | Live intel |
|---------|------------|
| Bubble link | Sets Insight. Camera stays. |
| **Show layer** | `setLayer(id, on)`. No track. No Peek. |
| **Fly** on card | `trackNearest` for FLT / AIS / SAT / ISS. `flyTo` / `flyToCoord` only if a named place or coord (EQ / FIR / MSN). |
| **Grab** | PeekCard only. Chat never `setPeek`. |
| ACTION `layer` | Only if the user asked show / hide / enable / disable. |
| ACTION `trackNearest` | Only if the user asked track / follow / nearest / lock / ISS-follow. Else downgrade to Insight with Fly. |

Asked-to-track is **not** `askedToMove`. `insight.ts` 29–32 is fly / take me / go to / show me on the globe — no `track|follow`.

## Evidence (disk)

**LAYER_META** `src/lib/intel/types.ts` 181–191. Store defaults **off** (`store.ts` 86–92). Rail `LAYER_ORDER` (`OverlayHud.tsx` 44–55) lists the seven first.

| short | LayerId | source string | freshness |
|-------|---------|---------------|-----------|
| FLT | flights | Aviationstack / ADS-B | live |
| MIL | military | adsb.fi military | live |
| AIS | vessels | Modeled shipping lanes | simulated |
| SAT | satellites | CelesTrak SGP4 | live |
| EQ | earthquakes | USGS 24h | live |
| FIR | fires | NASA EONET | live |
| MSN | launches | Launch Library 2 | live |

**trackNearest** kinds are `flight | vessel | satellite | iss` only (`types.ts` 146, 173). `globeEngine.ts` 1216–1254: nearest to camera, turns that layer on, `track` + `viewer.flyTo(ent)`. `runCommand.ts` 269–278 same + 900 ms wait if the layer was off. **No MIL / EQ / FIR / MSN kind.** `LayerSubs.tsx` 12–16 `NEAREST` is flights / vessels / satellites; the other intel rows get “Next in view” only.

**PeekCard** `src/components/intel/PeekCard.tsx`: 5 s hold, **Grab** → `engine.track(c.id)` then `setPeek(null)`. Spawn is pointer: `globeEngine.ts` 1383–1398 `MOUSE_MOVE` → `pickSatId` (sats map only, 1351–1361) → `contact.kind !== "satellite"` return. OverlayHud mounts Peek and Insight as siblings (728–729). Spine: Peek is pointer; Insight is conversation.

**Chat path (the bug).** `comms.ts` 121–124 gates `flyTo` with `askedToMove`; 130–135 applies `trackNearest` with **no** ask check. `chat.ts` SYSTEM still lists `trackNearest` as an allowed ACTION. `InsightCard.tsx` Fly is `applyAction({ type:"flyTo", q })` — ISS `q` hits `locations.ts` preset `iss` at 0,0 / 2_000_000, **not** `trackNearest("iss")`. Card has Show layer; **no Track**.

First-run Space (`FirstRun.tsx` 50) and scene `orbital` (`scenes.ts` 20) auto-track ISS after an **explicit click**. Not chat. Leave.

## Per-layer (chat)

| | Show layer | Offer Fly/track | Peek from chat |
|--|------------|-----------------|----------------|
| FLT | `flights` | Track nearest flight | never |
| MIL | `military` | Offer FLT track (engine already folds MIL into `kind:"flight"`). Do not invent a MIL kind. | never |
| AIS | `vessels` | Track nearest vessel. Honesty: modeled unless AISStream key. | never |
| SAT | `satellites` | Track nearest sat / ISS | never (pointer Peek only) |
| EQ | `earthquakes` | Fly only if card has `q` or lat/lon | never |
| FIR | `fires` | same | never |
| MSN | `launches` | same | never |

ISS is SAT, not a LayerId. Command-bar `iss` is `trackNearest` (`commands.ts` 191–192). Chat “what’s the ISS doing” must emit Insight, not ACTION.

## Leftovers (coordinator / `src/`, not this file)

1. Gate `trackNearest` in `comms.ts` like `flyTo`. Add `askedToTrack` (`track|follow|nearest|lock` + ISS follow).
2. Unasked `trackNearest` → Insight `{ system:"intel", layer, source }` whose Fly calls `trackNearest`, never `lookupPlace("iss")`.
3. Optional Insight `kind` (or Fly maps layer→kind). Do not invent a second card.
4. Unasked ACTION `layer` → Show layer on the card.
5. Peek never from chat. Grab is not an Insight button.
6. Do not retarget FLT adsb.lol vs adsb.fi, or FIR EONET vs FIRMS, this sitting.
7. AIS `LAYER_META` says simulated; `ais.ts` can go live with a key — card `source` follows store `detail` / `freshness`.

**Done-when:** “what’s the ISS doing” / “any planes up” show a link + glass card and the globe does not track; Fly / Show layer wait for the human; Peek is still hover-only; “track the ISS” still tracks.
