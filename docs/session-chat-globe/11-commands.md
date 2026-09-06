# Seat 11 — Command grammar (bar vs chat)

**Target class:** public-suite WIP · tree `sandbox/work/groks-eye-view-next`  
**Writer:** seat 11 · this file only · no `src/` · no live gevradio · no Bogpulse  
**Verdict:** **GO** for chat fly-ask vs Insight. **NO-GO** to treat the bar as the same parser.

## Two pipes (do not merge)

| Pipe | Entry | Parse | Camera |
|------|-------|-------|--------|
| **Bar** | OverlayHud footer → `runCommand` | `parseCommand` (`commands.ts`), first match. Unknown → `interpretCommand` (`world.ts`) then `applyAction`. | Immediate. **No** `askedToMove`. |
| **Chat** | `useComms.send` → `askGrok` | Tags in `comms.parseTaggedAction`. | `flyTo` ACTION only if `askedToMove(userText)`. Else Insight + Fly. |

Comms open unmounts the bar (`OverlayHud` `!chatOpen`). Both later call the same `applyAction`.

## Chat fly-ask — `askedToMove` (`insight.ts` 29–32)

```
/\b(fly|take me|go to|jump to|navigate|show me on the globe|move (the )?globe|bring (us|me) to)\b/i
```

| User text | Gate | Result |
|-----------|------|--------|
| `take me to …` | true | `<<ACTION:flyTo>>` still flies (`comms.ts` 121–122). Spine done-when #4. |
| `fly to …` / `go to …` / `jump to …` | true | fly |
| `show me on the globe …` | true | fly |
| `what's over tokyo` | **false** | Insight, not fly. Stray `flyTo` tag → `insightFromFlyQuery` (`insight.ts` 76–86, `comms.ts` 123). |
| `show me tokyo` (no “on the globe”) | **false** | Insight. **Bar would fly.** |
| `open …` / bare place | **false** | Insight. **Bar may fly or open a desk.** |

Spine law: fly / take me / go there / show me on the globe. Gate extras: `jump to`, `navigate`, `move globe`, `bring … to`. No exact `go there` (only `go to`).

## Bar fly phrases — `commands.ts` 204–216

After radio / HUD / desk / layer / scene / style / count / track, first match:

1. Prefix `^(?:take me to|fly to|go to|show me|open|jump to|navigate to)\s+(.+)$` → `{ type: "flyTo", q }`
2. `lat, lon` → `flyToCoord` (apply height 80_000)
3. Bare **only** (whole string): `tokyo|austin|lax|jfk|heathrow|singapore|dubai|sydney|iss|new york|nyc` → `flyTo`

`take me to the chamber in {place}` is **keptOpen** (`commands.ts` 113–118), **before** the fly prefix. Not a camera phrase.

## Bar phrases that are not fly (still execute)

reset / home / full globe · radio on/off/next/prev/`put on creedence` · next contact · cockpit · hud · corpus · streams · method · close/open desk · `find ahj in` / `building desk` · `score the sitting in` · `compare A and B` · `{kind} permit playbook` · layer on/off (`show` ≠ `open`) · style · scene · `how many` count · track ISS / nearest flight|ship|sat.

## Insight-not-fly (chat only)

`what's over {place}` · `what's the tea on {place}` · `anything flying over {place}` · roast / why / story · civic ask with no fly-ask verb. Grok appends `<<INSIGHT>>`. Link sets the card. **Fly** on the card is the human zoom.

Chips in `comms.suggestionChips` already talk, they do not fly.

## Leftovers (coordinator)

1. Bar unknown (`what's over tokyo`) can still fly via `interpretCommand` — mapper has no `askedToMove`.
2. `show me {q}` flies on the bar; chat needs `show me on the globe`.
3. Chat ACTION `trackNearest|style|layer|cockpit|radio|reset|next` is **not** gated (only `flyTo` is).
4. No unit test of `parseCommand` / `askedToMove` (`docs/harden/12-tests.md`).

Do not invent a second camera. Do not teach the bar to chat-parse. Bar stays explicit cockpit; chat stays opt-in fly.
