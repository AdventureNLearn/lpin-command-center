# 4h seat 03 — de · eg · es

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Write:** this file only. No `src/`. No live gevradio. No Bogpulse. No 163 holes.

Probe: atlas + package `kit_on_disk`, `meta` named/seats vs `members.json` counts (not a name dump), capital join, chat-card GO/NO-GO. Did **not** load `votes.json` bodies (ES ~67 MB).

## Verdict

| iso2 | kit_on_disk | named / seats | capital join | chat-card |
|------|-------------|---------------|--------------|-----------|
| de | true | 630 / 630 | GO | **GO** |
| eg | true | 596 / 596 | GO | **GO** |
| es | true | 350 / 350 | GO | **GO** |

**Seat GO.** Leftovers below are coordinator / harvest debris, not missing kits.

## kit_on_disk

Atlas `vendor/kept/_out/atlas.json`: `de` `eg` `es` all `kit_on_disk: true`, UN member, retrieved 2026-08-29. Packages same flag. Dirs `vendor/kept/kits/{de,eg,es}/` on disk (12 kit json + leftovers). These three sit in the Kept 33. They are **not** empty map-seeds (`cl fj nl th tz`). Neighbors `dk` `ee` `et` are atlas false — no desk, no fly.

## named / seats

Card authority is `keptDesks()`: `named` = `meta.counts.members`, `seats` = `meta.seats`. Not `coverage.json` (stale). Not votes. Not Rest.

| iso2 | chamber | meta named | meta seats | members.items | claimed_seats |
|------|---------|-----------:|-----------:|--------------:|---------------|
| de | Bundestag | 630 | 630 | 630 named, 630 unique ids, sitting true | **null** — do not invent |
| eg | House of Representatives | 596 | 596 | 596 / 596 | 596 even |
| es | Congreso de los Diputados | 350 | 350 | 350 / 350 | 350 even |

Members files: `sitting: true`, `incomplete: false`, retrieved 2026-08-20, sourced `source_url`. Meta `incomplete: true` on all three — honest incomplete kit, sourced roster. Card body: `{chamber} · {named} of {seats} named`. Drawer `loadKeptRoster`: DE claimed falls back to items (630), hole null; EG/ES even, hole null. Do not pad. Do not mint a second house.

## capital join

`capitals.json` points (iso2 folded) match package `capital` name / lat / lon **3/3**. `kind: capital`, delayed Natural Earth, retrieved 2026-08-29. No (0,0).

| iso2 | lat | lon |
|------|-----|-----|
| de | 52.523765 | 13.399603 |
| eg | 30.051906 | 31.248022 |
| es | 40.401972 | -3.685298 |

Fly (opt-in) uses **these** coords at **1_200_000**. Not `lookupPlace(q)`. Not a member pin. Not Rest AHJ homonyms.

## chat-card GO / NO-GO

**GO** if chat names iso2, exact country name, or unique capital label (none of these three are P0 place tokens). `matchKeptDesk` then `keptDeskByIso`. `insightFromUserText` already prefers Kept before AHJ.

```
<<INSIGHT:{"title":"Germany","body":"Bundestag · 630 of 630 named","system":"kept","q":"Germany","layer":"legislatures","desk":{"system":"kept","id":"de"},"source":"Kept harvest / public registers"}>>
```

Same shape: Egypt / `eg` / 596 of 596; Spain / `es` / 350 of 350. Link sets the card. Globe does **not** move. **Fly** = desk lat/lon + 1.2Mm. **Open desk** = `setDesk({ system:"kept", id })`. No `keptOpen`. No auto-zoom.

| Query | Card |
| --- | --- |
| `de` `eg` `es` | iso2 exact among 33 → GO |
| country name exact | GO |
| capital exact | GO (kept before search-lite) |
| `dk` `ee` `et` | hole — no desk, no q, no 34th kit |
| Rest homonym | **NO-GO** path. search-lite is not Rest. Do not reorder AHJ ahead of Kept. |

## Leftovers (not card NO-GO)

- `de/gap.json.tmp` leftover; package: not packaged.
- `es/votes.json.apply-tmp` leftover (~27 MB). Do not fight. Package hole: votes items 1968 vs `meta.counts.votes` 470. Chat must not open votes.
- `coverage.json` lags kits — ignore for named/seats.
- DE `claimed_seats: null` is filed; 630 is items + meta.seats only.
- Coordinator: Kept Fly = desk coords + LEG_H; chat never `keptOpen`.

**Close:** three kits on disk, named = seats, capital join exact, chat-card **GO**.
