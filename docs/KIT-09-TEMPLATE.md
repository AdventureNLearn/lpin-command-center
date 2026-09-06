# KIT-09 — Add-a-feature template (filled)

Globe stays the homepage. New data is a layer and/or a drawer. No second engine. No first-paint dumps. No skill brands. No invented records. One kit file per feature. Implement only when the operator names that kit.

## Blank (copy)

```
FEATURE NAME:
LAYER ID / KIND:
CONTACT MAPPING: (one Contact per what?)
MARKER BUDGET AT GLOBAL ZOOM:
DATA MODULE PATH: src/lib/<name>/
LAZY? yes/no
DRAWER ADAPTER: what the panel shows
HONESTY STRIP: one sentence
COMMAND PHRASES:
FRESHNESS: live | delayed | simulated | off
PUBLIC COPY CONSTRAINTS:
P0 KILL SWITCH: (what we turn off if the globe dies)
```

## Filled next candidate (do not build until named)

```
FEATURE NAME: Jobsite / claims
LAYER ID / KIND: jobsite / jobsite
CONTACT MAPPING: one Contact per user-typed jobsite or claim pack, never a municipality sample
MARKER BUDGET AT GLOBAL ZOOM: 0 (city zoom later; no Rest-style dump)
DATA MODULE PATH: src/lib/jobsite/
LAZY? yes
DRAWER ADAPTER: pack header, sourced rows or honest hole, locality typed by the user
HONESTY STRIP: Guidance only. Not a live claims desk. Incomplete packs stay empty.
COMMAND PHRASES: show jobsite · hide jobsite · open jobsite desk
FRESHNESS: delayed
PUBLIC COPY CONSTRAINTS: plain civic tooling; no skill brands; no vault cases; do not merge IDWT
P0 KILL SWITCH: setLayer jobsite off. Do not unmount Cesium. Do not steal radio.
```

KIT-10 (2026-08-30): layer in the rail default **off**. `src/lib/jobsite/packs.ts` lazy lookup. Drawer. **0** pins. Honest hole.

Later fits (still not this kit): orbit-desk rooms; extra radio nets as RadioDeck stations.

**KIT-19 (D-268):** Command Center + Workdesk Generator. grok.me tools become context packs on the existing holo-cards + drawer. Blank pack template: `docs/command-center/01-WORKDESK-GENERATOR.md`. Fifty + Open Cells ingested, not in `src/`.
