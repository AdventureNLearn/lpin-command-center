# Session spine — chat follows the globe (opt-in fly)

**Target class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Window:** this sitting (operator: 15 seats, ~4h build-out)  
**Live gevradio:** frozen copy-from. Do not remix.

## What the operator asked

One cockpit. Permit Helper, legislation tracker, mapping layers, jobsite (and later Inspection Index) all use the **same globe** and the **same zoom grammar when it is insightful**.

Grok comms is the conductor:

1. You talk to Grok in the app.
2. Grok answers in the jump-seat chat.
3. A **link** appears on that answer (and a holographic glass card on the globe).
4. The link names the tool + the place/object. It does **not** yank the camera by default.
5. The glass card has **Fly** if a coordinate or place query exists. You press it if you want to go. Same for **Open desk**.

Today the opposite happens: Grok may emit `<<ACTION:{"type":"flyTo"...}>>` and the globe **auto-flies**. That is the bug relative to this sitting.

## Law

- Globe stays homepage. Radio stays. Cesium stays mounted.
- **No auto-zoom** unless the human said fly / take me / go there / show me on the globe.
- **No 16k pins.** No Rest dump. No municipality samples invented for demos.
- Jobsite packs stay honest holes until packs exist. LPIN live site is not this homepage.
- Inspection Index (insind.grok.me) is a later adapter, same card shape, not this sitting’s implement unless named after the spine is green.
- PC cockpit (`?globe=1` / desktop UA). Do not treat this sitting as a phone layout.
- One writer per authority file.

## One object: Insight

Every tool emits the same card, not a new homepage.

```
Insight {
  id, title, body
  system: intel | kept | permit | jobsite
  q?: place or query (Fly uses this)
  layer?: LayerId
  desk?: { system, id }
  source: honesty string
}
```

| Control | Does |
|---------|------|
| Link in Grok bubble | Sets the active Insight (card). Does not fly. |
| **Fly** on the card | `flyTo` / track. Only if `q` or lat/lon exists. |
| **Open desk** | DeskDrawer for kept / permit / jobsite. Globe stays up. |
| **Show layer** | `setLayer` on. Still 0 orbit pins for jobsite. |
| Dismiss | Clears the card. Chat stays. |

Satellite **Peek** (hover, 5s, Grab) stays a different object. Do not merge Peek into Insight. Peek is pointer. Insight is conversation.

## Zoom grammar (shared)

Use existing heights. Do not invent a second camera.

| Insight | Default height | Auto-fly? |
|---------|----------------|-----------|
| Live contact (plane, sat) | track entity | No — Fly/Grab |
| Country legislature | 1_200_000 | No — Fly |
| State pack | 700_000 | No — Fly |
| Featured AHJ / city zoom | 80_000 | No — Fly |
| Jobsite | 0 pins; fly only if user typed a resolvable place | No |
| Orbit / “the planet” | reset / no-op | No |

Layer-sub clicks that already fly (LEG country, AHJ core) may stay as **explicit clicks**. Chat must not reuse that path without the card.

## Chat protocol

Grok may append **one** last line, stripped before display:

```
<<INSIGHT:{"title":"…","body":"…","system":"permit","q":"…","layer":"permits"}>>
```

`<<ACTION:flyTo>>` is allowed **only** when the user asked to move. Otherwise a flyTo tag is downgraded to an Insight with Fly available.

Allowed ACTION types when the user asked: flyTo, trackNearest, style, layer, cockpit, radio, reset, next. Civic desks go through Insight, not a surprise drawer.

## Seats (15). Coordinator owns `src/`.

Each seat writes **only** `docs/session-chat-globe/{NN}-{slug}.md`. GO / NO-GO / leftovers. No `src/` edits. No live gevradio. No Bogpulse.

| NN | Seat | File |
|----|------|------|
| 01 | Nav policy (fly vs card vs nothing) | `01-nav-policy.md` |
| 02 | Chat protocol / tags | `02-chat-protocol.md` |
| 03 | Insight schema | `03-insight-schema.md` |
| 04 | Holo card UI | `04-holo-card.md` |
| 05 | Bubble links | `05-bubble-links.md` |
| 06 | Store cursor | `06-store.md` |
| 07 | Permit adapter | `07-permit.md` |
| 08 | Kept adapter | `08-kept.md` |
| 09 | Jobsite adapter | `09-jobsite.md` |
| 10 | Live intel layers | `10-intel-layers.md` |
| 11 | Command grammar | `11-commands.md` |
| 12 | Globe + PC mode | `12-globe-pc.md` |
| 13 | Honesty / OPSEC | `13-honesty.md` |
| 14 | Later: Inspection Index | `14-insind-later.md` |
| 15 | Smoke plan | `15-smoke.md` |

## Done-when (this sitting)

1. Grok reply about a place/tool shows a link; globe does not move by itself.
2. Glass card appears; **Fly** moves the camera; dismiss leaves chat.
3. Permit / Kept / Jobsite can open from a card without a second homepage.
4. User-asked “take me to …” still flies (old ACTION path).
5. Creedence / globe still work. `tsc --noEmit` green. Desktop 1440×900, not 390.
