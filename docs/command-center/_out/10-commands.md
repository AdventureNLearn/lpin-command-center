# LPIN MVP commands

**SoT:** `src/lib/intel/commands.ts` · `parseResearchCommand` · `matchLinCommand`  
**Must work:** every phrase below. Do not patch `src/` from this seat.

## Add (call out)

| Phrase | Action | Notes |
|--------|--------|--------|
| `research <topic>` | `research` | also `look up` / `investigate` |
| `open fifty desk` | `desk` lin/`fifty` | alias `open fifty` |
| `open cells desk` | `desk` lin/`opencells` | alias `open cells` |
| `run lanes` | **not parsed** | must work on MVP (sense lanes, not AIS) |

## Globe / radio / chrome

`reset` `home` `full globe` `zoom out` `globe view` · `radio on` `play radio` `open radio` `tuner` · `pause/stop/mute radio` `radio off` · `next/skip station` `radio next/back` `previous/last station` · `play`/`put on`/`tune`/`spin` + station (≥3 chars) · `play/put on/spin (some) ccr|creedence` · `next contact/aircraft/plane` · `(enter) cockpit` · `exit/leave cockpit` `map view` · `show/hide hud` `hud on/off` · `corpus` `intel corpus` `show/open/close corpus` `corpus on/off` · `show/open/hide/close streams` `streams` `streams off` · `pin stream` `pin to streams` `unpin stream` `unpin from streams` · `method` `pipeline` `show/open/hide/close method` `method off` `open/show pipeline` · `close/hide desk` `desk off` `close drawer(s)` · `detection on/off` `detect on/off` `show detections`

## Desks (LIN + civic)

`open network` `open lin` `open command center` `open (lpin) intelligence network` · `open legal|regulatory|technical|jurisdictional|operational|engineering|commerce|finance|governance desk` · `open legislature/kept desk` `kept desk` `legislature desk` · `(open) building|permit|ahj desk` · `(open) jobsite|claims [desk] [id]` · `(open) inspection|insind [desk] [id]` · `find [rest] ahj in <q>` · `building desk <q>` · `score the sitting in <desk>` · `take me to the chamber in <desk>` · `compare <a> and <b>` · `<project-kind> permit playbook` · `open <kept country>` (after exclusions)

## Layers / scenes / style / track / fly

`show/hide/enable/disable/turn on|off/light up` + military|flights|vessels|satellites|earthquakes|fires|launches|legislatures|permits|jobsites|insind · scenes: `orbital watch` `show me space` `space missions` `night watch` `night vision over` `fire line` `show me fires` `wildfire` · styles (or ≤3 tokens): normal|optical|daylight|crt|nvg|night vision|flir|thermal|noir|snow · `how many` flights|ships|sats · `track/follow/find iss` `iss` · nearest/track ship|sat|aircraft · `take me to|fly to|go to|jump to|navigate to|bring me to|show me on the globe <q>` · `lat,lon` · `tokyo|austin|lax|jfk|heathrow|singapore|dubai|sydney|new york|nyc` · bare `show me` = unknown (not flyTo)

## Collisions (flag)

- **research first:** `research legal` is a topic, not Legal desk. Same for `research fifty|cells|lanes`.
- **look up** steals place-lookup; flyTo needs `fly to` / `take me to`, not `look up`.
- **open fifty / open cells** already LIN; pack phrases **`show fifty` `hide fifty` `show opencells` `hide opencells` are not in the parser** (unknown). `hide fifty` ≠ `close desk`.
- **run lanes** vs modeled **shipping lanes** (vessels copy) vs Fifty host `/lanes/*` vs protocol sense lanes. Must not toggle AIS.
- **open finance desk** = commerce (alias), not a ninth SME.
- **open network/command center** after `open radio`; `method`/`pipeline` reserved, not LIN.
- **building desk** exact = permit drawer; **building desk &lt;q&gt;** = permitSearch.
- **take me to the chamber in** beats **take me to** flyTo.
- **show me fires/space** = scene; **show fires** = layer; **show me** alone unknown.
- **night vision** (≤3 tokens) = style; **night vision over** = night scene.
- **space missions** as scene before layer unless on/off present.
- **jobsite/claims/inspection** desk match is start-anchored; `show jobsite` (no `desk`) = layer.
- **open &lt;kept&gt;** excludes `fifty|opencells|open cells|network|legal|…` so those stay LIN.
- **iss** bare = track ISS, not flyTo city list.
- **stack/field/money** aliases can open jurisdictional/operational/commerce if phrased as `open <alias>`.
