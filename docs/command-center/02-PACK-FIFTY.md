# Pack — Fifty

Filled from `01-WORKDESK-GENERATOR.md`. Named for ingest 2026-09-06 (D-268). **Not in `src/`.**

Live: https://fifty.grok.me  
Retrieved: 2026-09-06 · title **FIFTY** · 200  
Missed by grok.me inventory 2026-09-04 (that list had 15 hosts; this host was not on it).

```
PACK ID: fifty
LIVE HOST: https://fifty.grok.me
FAMILY / LANE: GEV pack (later civic briefing)
TITLE AS LIVE: FIFTY
AS-OF DATE: Sunday, September 6, 2026 (homepage)
SHELL: gev-command-center
CARD KIND: pack-briefing
LAYER ID / KIND: fifty / fifty
CONTACT MAPPING: none at orbit. User-typed state / jurisdiction is a drawer lookup, not a flyTo. Never 19,000 city pins.
MARKER BUDGET AT GLOBAL ZOOM: 0
DATA MODULE PATH: src/lib/packs/fifty/
LAZY? yes
DRAWER ADAPTER: today’s action (generic, no muni sample) · jurisdiction × process stack · state board counts · honesty strip. No iframe of fifty.grok.me.
HOLO CARD:
  kicker: Fifty
  title: Fifty legislatures, one briefing
  body: State-level public briefing on automated plate cameras as a class. Empty is a finding.
  honesty: Public briefing. Not legal advice. Not a live camera registry. Not an official third-party product. Claims labeled. Human final call.
  actions: Open the file · Show layer (0 pins) · Look here only if the user typed a resolvable place
KERNEL: inherit GEV honesty. Live page already labels claims and treats “not retrieved” as empty, not “nothing happened.”
RADIO: extra (live page names a classic-rock stream). Never steal Creedence.
COMMAND PHRASES: show fifty · hide fifty · open fifty desk
FRESHNESS: delayed
PUBLIC COPY CONSTRAINTS: national / state-level only. No municipality names as samples. No skill brands. No petition spam in the cockpit. No vendor map as the globe.
P0 KILL SWITCH: hide fifty / close desk. Do not unmount Cesium. Do not steal radio.
IFRAME: never
HOMEPAGE SWAP: never
```

## What the live desk is (Evidence — homepage 2026-09-06)

Public briefing desk. Two axes: **jurisdiction** (local / county / state / federal) and **process** (funding, grants, permitting, installation, privacy, legislation). Board counts on the homepage: executive pause, ALPR statute, bill this cycle, local drops, **not retrieved**. Radio on the page. Disclaimer: not legal advice, not a live camera registry.

Linked routes (linked, not all fetched this sitting): `/stack`, `/states`, `/lanes/*`.

## What we do not copy into the pack

- City-by-city “local drop” names.
- A pin per incorporated place.
- Petition text as cockpit chrome.
- Any claim that a state with “not retrieved” has no activity.

## Collision (association, not a merge)

Same sitting as Open Cells: civic briefing + radio + labeled claims + honest empty + grok.me. See WD Growth Log 2026-09-06. Do not fold the two packs into one layer.
