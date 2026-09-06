# Workdesk Generator — template

Filled from KIT-09. This is how a grok.me tool becomes a **context pack** on the GEV Command Center.

**One pack file per tool. Implement only when the operator names that pack.**  
Globe stays the homepage. Cards stay `.holo-card`. Drawer stays one panel.

---

## Blank (copy)

```
PACK ID: (slug, lowercase, no spaces)
LIVE HOST: https://<name>.grok.me
FAMILY / LANE: (GEV pack | Kept | Permit | later | other-lane-do-not-fold)
TITLE AS LIVE: (from <title>, do not invent)
AS-OF DATE: (from the live page, or Unproven)
SHELL: gev-command-center
CARD KIND: insight | peek | pack-briefing
LAYER ID / KIND:
CONTACT MAPPING: (one Contact per what? none at orbit is the default)
MARKER BUDGET AT GLOBAL ZOOM: 0
DATA MODULE PATH: src/lib/packs/<id>/
LAZY? yes
DRAWER ADAPTER: (kernel, open cells, typed lookup, honest hole)
HOLO CARD:
  kicker:
  title:
  body: (≤240 chars, no muni sample)
  honesty: (one sentence)
  actions: Look here (only if q is a place) | Open the file | Show layer
KERNEL: inherit GEV honesty | copy pack kernel (must match integrity: tri-state, basis, human final call, honest gap)
RADIO: none | extra stations (never steal Creedence)
COMMAND PHRASES:
FRESHNESS: live | delayed | simulated | off
PUBLIC COPY CONSTRAINTS:
P0 KILL SWITCH: hide <layer> / close desk. Do not unmount Cesium. Do not steal radio.
IFRAME: never
HOMEPAGE SWAP: never
CONTEXT PACK FILES (later, when named):
  manifest.json
  honesty.md
  cells.json      (open slots allowed; empty is a finding)
  radio.json      (optional)
```

---

## Generator steps (Host)

1. Title-probe the live host. 404 = not a pack.
2. Read the live homepage + one method/stack route. Mine local dumps first (D-156).
3. Classify lane. Other-lane (LPIN, Tutor, games) → stop.
4. Fill this template. Scrub L0 / PII / municipality samples **before** any wiki or `src/` path.
5. Add a row to `04-GROK-ME-PACKS.md`. Add a kit file only if the operator named it.
6. Layer default **off**. Marker budget **0** at orbit unless the operator names a typed fly.
7. OPSEC gate before any public-facing copy.

Do not generate `src/` from this file automatically. The filled template is the contract. KIT-19 (or a later pack kit) is the execute.

---

## Card mapping (existing UI — do not invent a fourth chrome)

| Pack need | Existing widget |
|-----------|-----------------|
| Briefing / “what is this desk” | `InsightCard` (`.holo-card.holo-insight`) |
| Hover a mapped contact | `PeekCard` (`.holo-card.holo-peek`) |
| Open the file | `DeskDrawer` · `insight.desk` |
| Optional camera | Look here / askedToMove only |
| Typed search | Drawer lookup, honest hole |
| Claims | `score` + `basis` sealed by honesty, never a model tag |

Extend `InsightSystem` with `"pack"` only in the named execute kit. Until then a chat mention of a pack is `intel` with **no** desk.

---

## Integrity (every pack)

1. Tri-state where scored: Supported / Unproven / Disputed.
2. Basis: Evidence / Inference / Assumption.
3. A quote without a URL is not Supported.
4. Empty / not-retrieved is a finding. Do not copy an instrument from the wrong place.
5. Human final call. Software never auto-truths.
6. Prefer an honest gap over a finished-looking chart.
