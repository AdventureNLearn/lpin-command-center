# 4h/12 — Permit (featured/core search-lite)

**Class:** public-suite WIP · 4h harden · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Rest dump.  
**Bar:** Featured/Core `search-lite` → Insight card + desk. No Rest. No auto-fly from chat.  
**Parent:** `07-permit.md` (adapter). This seat **narrows chat** to featured 12 + core 79.

## Verdict

**GO** as 4h law. Chat names a featured/core AHJ → `system:"permit"` card. Open desk. Fly opt-in at **80_000**. Extra/More stay the drawer. Rest stays a **count**.

**NO-GO** if chat applies `{type:"permitSearch"}`, auto-`lookupPlace`, `setPermitRest(true)`, imports `catalog.ts` / `places.ts` / `places-rest.ts`, or plots 14925 / 16165 entities.

## Chat → card (no auto-fly)

1. Live last line (stripped): `<<INSIGHT:{"title":"…","body":"…","system":"permit","q":"…","layer":"permits","desk":{"system":"permit","id":"<core-id>"}}>>`
2. Dark comms: `insightFromUserText` (`insight-local.ts` L64–78) `searchAhj` → same card. No camera.
3. `parseInsightTag` already takes `system:"permit"`. ACTION allowlist has **no** `permitSearch` / `desk`. Unasked `flyTo` → card.
4. Bubble chip / `setInsight` only. **Does not fly. Does not `setDesk`.**
5. **Open desk** (card): `applyAction({type:"desk", on:true, system:"permit", id})` → `PermitBody`. Globe stays.
6. **Fly** (card, iff `q` or featured coord): `CITY_H` **80_000**. Prefer `FEATURED_COORDS[id]` for the 12.

Empty `desk.id` → `PermitHome` (featured 12). Bare core `{st}-{slug}` → `PermitCard` via `getSearchablePlace`. `search:{q}` / `playbook:` stay command-bar, not chat.

## Toolset — featured/core only

| Slice | Count | Chat `desk.id` |
|-------|------:|----------------|
| Featured `FEATURED_AHJ_IDS` | 12 | **yes** — empty `searchAhj` |
| Core `CORE_PLACES` | 79 | **yes** — named id |
| Extra | 462 | **no** — drawer leftover |
| More | 699 | **no** — drawer leftover |
| Rest | 14925 | **never** — count, not a map |
| Sum | 16165 | “16k” = Rest dump. Do not. |

`search-lite.ts`: `SEARCHABLE` = core+extra+more (**1240**), **no Rest**. Empty q = 12 featured. Typed q = substring, slice 40. 4h chat treats extra/more hits as **miss** (no `desk.id` from those layers). Pins (`permitMarks`): orbit/city ≤ **12** featured cores. Not 16165.

## Disk (do not fork)

| Piece | Evidence |
|-------|----------|
| PermitBody | `DeskDrawer.tsx` L277–294 |
| search-lite | `search-lite.ts` L9–60. No Rest in `SEARCHABLE`. |
| Featured coords | `permit-pins.ts` `FEATURED_COORDS` · 12 |
| AhjKids click | `LayerSubs.tsx` L63–112 `CITY_H` — **KEEP** (click). Chat must not reuse. |
| permitSearch | `runCommand.ts` L154–176 auto `setDesk` + `lookupPlace` — **command bar only** |
| Rest opt-in | `rest-search.ts` lazy 20-cap. Drawer checkbox L256–262. Chat never. |
| Poison | `catalog.ts` → `places.ts` → `places-rest.ts` (16165 concat). HUD must not import. |

## Leftover vs 16k Rest (coordinator `src/`)

1. **Rest 14925 is a count** (`permit-index.json` `rest_is_count_not_map: true`). Do not dump `places-rest.ts`. Drawer cap stays 20.
2. `search-lite` still hits Extra/More (1240). Narrow chat pick to featured/core; extra/more stay typeahead in the desk.
3. `permitSearch` still yanks the camera (`lookupPlace`). Chat must not emit it; bar should CARD unless asked.
4. Card Fly via `applyAction flyTo` → `lookupPlace` @ **48_000**. Permit Fly must lock **80_000** / `FEATURED_COORDS`.
5. `insightFromUserText` can pick extra/more; `insightFromFlyQuery` always `intel`. Civic AHJ → `system:"permit"` + `layer:"permits"` + core `desk.id` only.
6. `PermitBody` `getCachedRestPlace` can render a Rest id if one lands. Chat must never send one.
7. SYSTEM example is intel; permit `desk.id` from featured/core only. Do not widen `parseTaggedAction` to `permitSearch`.

## Do-not

No municipality demo packs. No Rest in first-paint chat graph. No `/place/` routes. No hivepermitdev iframe. No Peek merge. No 16k pins. `factory_urls_verified` stays false.
