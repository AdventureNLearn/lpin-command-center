# 08 — Live cockpit inventory (stays)

**Tree:** `REPO_ROOT`  
**Product:** LPIN. HUD title is **LPIN NETWORK** (`OverlayHud` boot + header). Document title / Talk SYSTEM: **LPIN Intelligence Network**. Not GEV on chrome.  
**Verdict:** these surfaces **stay**. Packs ride them. Do not replace `/`, iframe hosts, or unmount Cesium.

| Surface | Live in `src/` | Stay |
|---------|----------------|------|
| Globe | `GlobeCanvas` → Cesium PC / flat tiles phone. Homepage `/`. | Yes |
| Exclusive layers | `store.withExclusiveOn` — one rail on at a time; civic default **off**. `L` rail. | Yes |
| Radio | `RadioDeck` + Exclusive.radio presets. `R`, play/pause, next/prev. | Yes |
| Peek | `PeekCard` hover/click · 5s hold · `.holo-card` | Yes |
| Insight | `InsightCard` from comms / bar / desks. Esc peels card first. | Yes |
| Look here | Opt-in fly on Peek + Insight + Comms. **No auto-zoom.** | Yes |
| Comms | `CommsChat` Grok jump-seat (`G`). Fly only if asked. | Yes |

Layers (exclusive, `LAYER_ORDER`): FLT · MIL · AIS · SAT · EQ · FIR · MSN · LEG · AHJ · JOB · INX. Styles 1–6: normal CRT NVG FLIR noir snow. Scenes: orbital / night / fire.

## Commands (bar → `parseCommand` / `runCommand`)

`reset` `home` `full globe` · `radio on/off` `next/prev station` `put on creedence` · `enter cockpit` `exit cockpit` `map view` · `hud on/off` · `corpus` `corpus off` · `streams` `pin stream` · `method` / `pipeline` · `close desk` · `research <topic>` (`look up` / `investigate`) · `open legislature desk` `open building desk` `open jobsite desk` `open inspection desk` · `open network` `open legal|regulatory|technical|jurisdictional|operational|engineering|commerce|governance desk` `open fifty desk` `open cells desk` · `find ahj in` `find rest ahj in` `building desk {q}` · `score the sitting in` `take me to the chamber in` `compare A and B` · `{kind} permit playbook` · `detection on/off` · `show/hide {layer}` · `how many flights|ships|sats` · `track ISS` / nearest flight|ship|sat · `next contact` · `fly to` `take me to` `go to` `jump to` `navigate to` `bring me to {q}` · `lat, lon` · bare `tokyo|austin|lax|jfk|heathrow|singapore|dubai|sydney|iss|new york|nyc`.

Chat ACTION allowlist: `flyTo` (asked-gate) · `trackNearest` `style` `layer` `cockpit` `radio` `reset` `next`. Civic desks via Insight, not chat JSON.

Keys: `/` bar · `?` help · `Esc` insight→comms→radio→first-run→desk→corpus→cockpit→track→rail · `G` Talk · `R` radio · `N` Network · `L` layer rail · `H` HUD · `D` detect · `C` cockpit · `1–6` style.

**Stay law:** globe is `/`. Radio stays. Exclusive rail stays. Peek + Insight + Look here stay. Comms stays beside the desk. **LPIN** is the name on the HUD.
