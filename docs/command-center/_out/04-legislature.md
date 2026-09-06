# LPIN Legislature desk — fold Kept

**Seat:** 04 legislature · **Product:** LPIN · **Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** Do not patch `src/`. Do not iframe. Do not restart harvest.

**Verdict: FOLD.** Roster / streams / compare already live in one `DeskDrawer`. Host them as the LPIN **Legislature** file. Method source stays off-glass.

Method source (ops, not HUD): keptglobal.grok.me — copy method, not the live app. Gold kits: `vendor/kept/kits/` + `vendor/kept/_out/`. Harvest **shelved**. Do not unshelve. Do not recreate Kept 50.

```
PACK ID: kept
FAMILY / LANE: LPIN Legislature (Roster lane). Not a new pack.
PUBLIC KICKER: Legislature
SHELL: existing DeskDrawer
CARD KIND: insight | peek
LAYER ID / KIND: legislatures / legislature
CONTACT MAPPING: 33 delayed country desks (kit ∩ capital). 163 holes listed, not plotted.
MARKER BUDGET AT GLOBAL ZOOM: 0 unless LEG on (then 33, not members)
DATA: src/lib/kept/desks.ts · roster.ts · streams.ts
LAZY: members.json / pledges.json per open iso only. Never votes.json.
DRAWER: KeptAtlas | KeptBody | StreamsPanel | CompareShell | MethodPanel
HOLO CARD:
  kicker: Legislature
  title: chamber / country as filed
  body: {chamber} · {named} of {seats} named  |  no sourced roster
  honesty: Delayed register. Incomplete files stay empty. Not an influence score.
KERNEL: as filed, not a pledge score. Vacancies not invented. Human final call.
COMMAND PHRASES: open legislature desk · open streams · compare {a} and {b} · score the sitting in {q} · take me to the chamber in {q} · show legislatures · hide legislatures
FRESHNESS: delayed
IFRAME: never
HOMEPAGE SWAP: never
HARVEST: no restart
```

## Already on disk (reuse, do not fork)

| Mode | `desk` | Body |
|------|--------|------|
| Atlas | `{ system: "kept", id: "" }` | `KeptAtlas` — kits A–Z; holes text-only |
| Roster | `{ system: "kept", id: iso2 }` | `KeptBody` — chamber, count line, lazy roster, pin (cap 8) |
| Streams | `id: "streams"` | Six themes (pipes, shared names, regulatory, infra, awards, FOIA). No auto-pin. Not a globe spreadsheet. |
| Compare | `id: "compare:{a}:{b}"` | Two desks only. Pledge vs own sourced sentences. Folded-stem ≠ same entity. Holes listed. |
| Method | `id: "method"` \| `"pipeline"` | Read-only pipeline. Not a harvest UI. |

Store system stays `"kept"`. Public kicker is **Legislature** (Streams / Compare / Method when those ids are open). Footer stays the delayed-register sentence.

## HUD law

Public glass: Legislature, Streams, Compare, Method, country names, count lines.  
**Never print a host URL** (no grok.me, no keptglobal) on kicker, subtitle, layer chip, honesty strip, or command bar. Source-register links on a named member are public-register URLs from disk, not the method host.

Lane: **Roster**. SME sibling is Governance. Collision = same URL/quote in ≥2 desks → association, not Supported.

## Do not

- New drawer, new `src/lib/packs/kept/`, iframe, Cesium unmount, auto-zoom on open.
- Influence score. Mix PAC + awards + seats. Claim the app filed FOIA.
- Plot 163 holes, 16k members, or capitals without a kit.
- Mint sitting names. Pad empty kits (`cl fj nl th tz` stay named 0).
- Put Kept / harvest / skill brands on the HUD.

**Coordinator merge:** labels already map `kept` → Legislature (`06-LABELS.md`). No `src/` from this seat. Execute only if a HUD string still leaks a host — then strip, do not rebuild.
