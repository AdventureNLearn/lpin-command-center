# LPIN — Building desk (Permit fold)

**Product:** LPIN. **This file only.** No `src/`.  
**Method source (ops, not HUD):** hivepermitdev.grok.me — copy method, not the live app. Lock 2026-08-18.  
**Fold:** Permit search is already LPIN. LIN opens it as a **native** kicker **Building desk**. Host URL never appears on the HUD.

## Already on disk (do not fork)

`PermitBody` in `src/components/desks/DeskDrawer.tsx`: `search:` → `PermitHits`; `playbook:` → playbook + `PermitHome`; `{st}-{slug}` → `PermitCard` via `getSearchablePlace`; empty/unknown → `PermitHome`. Header kicker **Building desk**. Footer exact `DISCLAIMER`. Globe stays mounted.

Search is `search-lite.ts` (Core+Extra+More, 1240). Empty q = 12 featured. Hits cap 40. Rest is a **count**, lazy 20-cap checkbox — not first-paint, not a map.

Commands (bar): `open building desk` / `open permit desk` / `open ahj desk` → `{type:"desk", system:"permit"}`. `find AHJ in {q}` / `building desk {q}` → `permitSearch` (**bar only**). Cards: `system:"permit"` → kicker **Building desk**; open via `applyAction({type:"desk", on:true, system:"permit", id})`.

## How LIN opens it

LIN Network civic tools and LIN commands treat this as a native LPIN drawer, not a remote site.

1. Tap **Building desk** on Network, or `open building desk`, or Insight `desk:{system:"permit", id}`.
2. `setDesk({ system: "permit", id })`. Do **not** keep `system:"lin"` for this tool. Do **not** iframe the method host.
3. **id**
   - empty → `PermitHome` (typeahead).
   - LIN topic set → `search:{topic}` (`PermitBody` already routes `search:`). Same topic-pass as jobsite/insind; today `openCivicRef` skips permit — that is the hole.
   - Core/Extra/More `{st}-{slug}` → `PermitCard`. LIN and chat never send a Rest id.
   - `playbook:{kind}` stays command bar.
4. **HUD (public)**
   - Kicker: **Building desk** (exact). Not “Permit Harbor”, not “AHJ”, not the host.
   - Subtitle: place name if a card; else **Globe stays up**.
   - Network list: kicker + one civic sentence (“Find a city or building desk”). Drop `{title} · {host}`.
   - `CIVIC_REFS.host` is ops metadata. It must not render on drawer header, Network list, Insight kicker, OverlayHud, or flash.
   - Flash: **Building desk**.
5. Look here only if the user named a place **and** opted in. Featured-core height **80_000**. Orbit/city pins stay the **12** featured cores.

## NO-GO

Iframe or navigate to hivepermitdev as integration. Rest dump (`places-rest.ts`, 14,925 / 16,165 entities). Chat/`openCivicRef` never `setPermitRest(true)`. Municipality demo packs. Invented lat/lon. Certified factory URLs (`factory_urls_verified` stays false). Unlabeled mix. Skill brands. New `/place/` route. Auto-zoom or surprise drawer from chat. Chat must not emit `permitSearch`.
