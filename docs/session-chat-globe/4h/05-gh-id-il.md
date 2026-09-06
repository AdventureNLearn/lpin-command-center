# 4h seat 05 — gh · id · il

**Class:** public-suite WIP · localhost only · **this file only**.  
**Tree:** `sandbox/work/groks-eye-view-next`. No `src/`. No live gevradio. No Bogpulse. No 163 holes.  
**Kits:** Ghana · Indonesia · Israel. Authority: `vendor/kept/kits/{iso2}/` + atlas ∩ capitals. Not stale `coverage.json`.

## Scoreboard

| iso2 | kit_on_disk | named/seats (desk card) | capital join | chat-card |
|------|-------------|-------------------------|--------------|-----------|
| **gh** | **GO** | **NO-GO** copy (`275 of 0`) | **GO** | **GO** name / `gh` / capital |
| **id** | **GO** | **NO-GO** copy (`569 of 0`) | **GO** | **GO** name / capital; not `ind` |
| **il** | **GO** | **GO** (`118 of 120`) | **GO** | **GO** name / `il` / capital |

Seat: kit_on_disk **GO** · capital join **GO** · named/seats **PARTIAL** · country-name card **GO**. Not a ship.

## kit_on_disk

Atlas `kit_on_disk: true` for all three; all in the 33. Folders on disk (12 json each). Empty-kit list is `cl fj nl th tz` — **not** this trio. `_template` is not an iso.

| iso2 | atlas name | chamber | kit | members named / claimed | honest_complete |
|------|------------|---------|-----|-------------------------|-----------------|
| gh | Ghana | Parliament of Ghana | map | 275 / 275 | true |
| id | Indonesia | DPR | map | 569 / 580 | true |
| il | Israel | Knesset | scoring | 118 / 120 | true |

`id` leftover: `votes.json.tmp` (package: leftover tmp not packaged).

## named / seats

`keptDesks()`: `named = meta.counts.members`; `seats = meta.seats ?? named`. `??` does not treat **0** as missing. Names as filed. Do not pad vacancies.

| iso2 | meta.seats | counts.members | items | claimed_seats | desk named/seats | card body |
|------|----------:|---------------:|------:|--------------:|------------------|-----------|
| gh | 0 | 275 | 275 | 275 | **275 / 0** | `Parliament of Ghana · 275 of 0 named` |
| id | 0 | 569 | 569 | 580 | **569 / 0** | `DPR · 569 of 0 named` |
| il | 120 | 118 | 118 | 120 | **118 / 120** | `Knesset · 118 of 120 named` |

Drawer (`loadKeptRoster`) is already honest: gh hole `null`; id `569 named of 580 seats. Vacancies not invented.`; il `118 named of 120 seats. Vacancies not invented.` Packages record those vacancy holes. **Card must not print `of 0`.** Coordinator: treat `meta.seats === 0` as missing (prefer `claimed_seats`).

## capital join

All 3 = atlas ∩ `capitals.json` ∩ package `capital`. Delayed NE points. City-level, not parcel. Fly from desk coords, not `lookupPlace`.

| iso2 | capitalName | lat | lon | package match |
|------|-------------|-----|-----|---------------|
| gh | Accra | 5.551981 | -0.218662 | 3/3 |
| id | Jakarta | -6.172472 | 106.827492 | 3/3 |
| il | Jerusalem | 31.778408 | 35.206626 | 3/3 |

`locations.ts` has **no** Accra / Jakarta / Jerusalem P0 presets. Card `q` is desk **name**, not the capital string.

## chat-card GO / NO-GO

`insightFromUserText` → `matchKeptDesk` first. Local card: `system:"kept"`, `desk.id` iso2, `layer:"legislatures"`, `q` = country name, lat/lon = capital, `height` = **1_200_000**. `InsightCard` Fly uses lat/lon/height when present. Open desk = `keptDeskByIso`. No auto-fly unless `askedToMove`.

| Query | Verdict |
|-------|---------|
| `ghana` / `indonesia` / `israel` | **GO** name-exact card + desk + opt-in Fly 1.2Mm |
| `gh` | **GO** iso2 |
| capital-name exact | **GO** (no preset block) |
| `ind` | **NO-GO** (India + Indonesia includes) |
| fly / take me / go there + country | ACTION path; not this card |
| auto-zoom from a name-only turn | **NO-GO** |
| GH/ID body `N of 0 named` | **NO-GO** honesty |
| atlas hole iso (`ad`) | **NO-GO** desk/q (08-kept); not this trio |
| Rest NY `jerusalem` row | **NO-GO** civic path (`search-lite` only) |

**Leftover:** bare `id` / `il` are iso2-exact hits (English tokens). 08-kept specifies that; do not mint a 34th kit. Grok `<<INSIGHT>>` without lat/lon still Fly-via-`q` — keep country `q` + coords/height.

## Leftovers (coordinator `src/`, not this file)

1. `meta.seats === 0` → gh/id card `of 0`.  
2. `id` `votes.json.tmp`.  
3. `coverage.json` lags kit objects — do not drive the card.  
4. Common-word iso2 `id`/`il`.  
5. Do not plot 163 holes. Do not import Rest.

**Close:** Three kits on disk, three capitals joined, IL roster honest. GH/ID card seats are a copy hole. Country-name chat card is **GO**. Not a ship.
