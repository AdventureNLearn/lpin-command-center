# SEAT 07 — Permit adapter (chat → Insight)

**Target:** public-suite WIP · `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse.  
**Object:** one Insight. Not a second homepage. Not `permitSearch`.

## Verdict

**GO** as adapter law. Grok turn → `<<INSIGHT:…>>` with `system:"permit"` → card. Optional `desk.id`. Optional `q`. Fly only if `q`. Height = featured-core **80_000**. Open desk → existing `PermitBody`. **No Rest dump. No 16k pins. No auto-zoom. No surprise drawer.**

**NO-GO** if chat applies `{type:"permitSearch"}`, auto-`setDesk`, auto-`lookupPlace`, imports `catalog.ts` / `places.ts` / `places-rest.ts`, or plots 14925 / 16165 entities.

## Path (Grok turn → card)

1. Bubble last line (stripped): `<<INSIGHT:{"title":"…","body":"…","system":"permit","q":"…","layer":"permits","desk":{"system":"permit","id":""}}>>`
2. `parseInsightTag` (`src/lib/intel/insight.ts`) already accepts `system:"permit"`, optional `q`, optional `desk`. Civic ACTION from chat is **not** a desk open (`comms.ts` `parseTaggedAction` allowlist: flyTo / track / style / layer / cockpit / radio / reset / next). Unasked `flyTo` downgrades to a card (`insightFromFlyQuery` — leftover: that helper is `system:"intel"`).
3. `useComms.send` `setInsight` + bubble chip. Chip sets cursor only (`CommsChat` InsightChips). Does **not** fly. Does **not** `setDesk`.
4. **Open desk** (card only): `applyAction({ type:"desk", on:true, system:"permit", id })`. Globe stays mounted. `DeskDrawer` L740 → `PermitBody({ id })`.
5. **Fly** (card only, iff `q`): featured-core height **80_000** (`LayerSubs` `CITY_H`; spine “Featured AHJ / city zoom”). Prefer `FEATURED_COORDS[id]` when `desk.id` is in `FEATURED_AHJ_IDS` (`permit-pins.ts`). Else `engine.flyTo` / `lookupPlace` still at **80_000**, never `globeEngine.lookupPlace`’s **48_000** geocode path.

Empty `desk.id` → `PermitHome` (featured 12 typeahead). `search:{q}` → `PermitHits`. Bare `{st}-{slug}` → `PermitCard` via `getSearchablePlace`. `playbook:{kind}` stays command-bar, not chat.

## Disk (do not fork)

| Piece | Evidence |
| --- | --- |
| PermitBody | `DeskDrawer.tsx` L277–294: `search:` / `playbook:` / card / home |
| permitSearch | `commands.ts` L101–106 → `runCommand.ts` L154–176: `searchAhj` then **auto** `setDesk` + `lookupPlace`. **Command bar only.** Chat must not emit or apply this type. |
| AhjKids | `LayerSubs.tsx` L63–112: explicit click `flyTo(c.lon,c.lat,CITY_H)` + `setDesk({system:"permit", id})`. Spine: layer-sub click may stay. Chat must not reuse without the card. |
| Search | `search-lite.ts`: Core+Extra+More **1240**, empty q = 12 cores, slice 40. No Rest in `SEARCHABLE`. |
| Rest | `rest-search.ts` lazy 20-cap. Drawer checkbox. Chat never `setPermitRest(true)`. |
| Pins | `permitMarks`: orbit/city ≤ **12** cores, state clusters, label cap 50. Not 16165. `PlaceDesk` has no lat/lon (`types.ts`). |
| Honesty | Footer = exact `DISCLAIMER`. Chip higher/mid. `factory_urls_verified` stays false. Source string on the card. |

## Leftovers (coordinator `src/`, not this seat)

- `InsightCard.fly` / bubble Fly call `applyAction({type:"flyTo", q})` → `lookupPlace` @ **48_000**. Permit Fly must lock **80_000**.
- `insightFromFlyQuery` always `intel`. Permit-shaped unasked flyTo should land `system:"permit"` + `layer:"permits"` when the turn is civic AHJ.
- Prompt (`feeds/chat.ts`) shows an intel example; permit example should include optional `desk.id` from Core/Extra/More only — never a Rest id.
- Do not widen `parseTaggedAction` to `permitSearch` / `desk`. Civic desks go through Insight.

## Do-not

No municipality demo packs. No Rest in first-paint chat graph. No `/place/` routes. No hivepermitdev iframe. No Peek merge.
