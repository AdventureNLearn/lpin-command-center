# 04 — fj / fr / gb (4h harden)

**Class:** public-suite WIP · localhost only  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes.  
**Seat:** 04 · iso2 `fj` `fr` `gb` · 2026-08-30  
**Bar:** chat names a kit country → Insight card. Open desk. Fly opt-in **1.2Mm** from kit lat/lon. Holes stay holes.

Labels: **E** on-disk this sit. **I** from that. **A** not verified here.

## Scoreboard

| iso2 | Desk | named / seats (meta) | `members.json` | Capital join | Chat-card |
| --- | --- | --- | --- | --- | --- |
| **fj** | empty kit | 0 / 0 | 56 B, `items: []` | Suva delayed NE | **GO** hole |
| **fr** | fat | 595 / **0** | 249980 B, 595 named | Paris delayed NE | **GO** card |
| **gb** | fat | 650 / 650 | 235069 B, 650 named | London delayed NE | **GO** card |

All three: atlas `kit_on_disk: true`, UN members, in `keptDesks()` (kit ∩ capital, slice 33). Not the 163. **E**

## Named / seats

`desks.ts`: `named = meta.counts.members ?? sitting`; `seats = meta.seats ?? named` (`0` is kept, not nullish). Drawer names come from lazy `members.json` (`roster.ts`), never this note.

| | **fj** | **fr** | **gb** |
| --- | ---: | ---: | ---: |
| `meta.kit` / chamber | map · Parliament of Fiji | map · Assemblée nationale | map · House of Commons |
| `counts.members` / sitting | 0 / 0 | 595 / 595 | 650 / 650 |
| `meta.seats` | 0 | **0** | 650 |
| Card body (`named===0` hole else `N of S named`) | `no sourced roster` | **`595 of 0 named`** | `650 of 650 named` |
| Roster items / named / `claimed_seats` | 0 / 0 / absent | 595 / 595 / **null** | 650 / 650 / **null** |
| Drawer hole | `No sourced sitting names on disk. Seat left empty.` | none (`claimed` falls back to 595) | none (same → 650) |
| Package members | empty 0 · `items 0; sitting 0; no invented roster` | filled 595 | filled 650 |
| `roster_source` / retrieved | null | Wikidata Q3044918 · 2026-08-20 | members-api Commons current · 2026-08-20 |

**fj is a desk with an empty roster, not a missing country.** Do not mint sitting names. **E**  
**fr leftover:** meta `seats: 0` vs 595 filed names → card says `595 of 0 named`. Drawer lists 595. Do not “fix” by padding seats in this file. **E**  
**gb** Commons 650 as filed. Do not add Lords. **A** not this sit.

## Capital join

`capitals.json` ∩ atlas ∩ package capital. Kind `capital`, freshness `delayed`, Natural Earth. No (0,0).

| iso2 | atlas name | capital | lat | lon |
| --- | --- | --- | ---: | ---: |
| fj | Fiji | Suva | -18.133016 | 178.441707 |
| fr | France | Paris | 48.868639 | 2.33139 |
| gb | United Kingdom of Great Britain and Northern Ireland | London | 51.501941 | -0.118668 |

Desk `name` prefers meta (`Fiji` / `France` / `United Kingdom`), not the long UN atlas string. Fly uses these coords + `LEG_H` `1_200_000`, not `lookupPlace`. **E**

## Chat-card GO / NO-GO

Local path: `insightFromUserText` → `matchKeptDesk` **before** presets. No auto-fly. Card `system: kept`, `layer: legislatures`, `desk.id` = iso2, `height: 1_200_000`. **Open desk** = `setDesk`. **Fly** on card: lat/lon path (`InsightCard`) → desk point at 1.2Mm.

| Query | Card | Why |
| --- | --- | --- |
| `fj` `fiji` `suva` | **GO** Fiji hole | iso2 / name / capital-exact (no Suva preset) |
| `fr` `france` `paris` | **GO** France fat | same; no Paris preset |
| `gb` `united kingdom` | **GO** UK fat | iso2 / exact name |
| `london` | **GO** UK fat | capital-includes after exact; kept beats city preset 14k |
| `uk` | **NO-GO** | name-includes hits **United Kingdom and Ukraine** → `null` |
| `britain` `england` `lhr` `heathrow` | **NO-GO** kept | no unique desk; LHR is airport preset only |
| `ad` / 163 atlas holes | **NO-GO** desk | no `desk.id`; do not fly capitals.json for holes |
| invented FJ names | **NO-GO** | seed `items: []`; sitting 0 honest |

Dark comms with no tag still gets this local card for the three. Grok `<<INSIGHT>>` without lat/lon + `q: London` still falls through to `flyTo`/`lookupPlace` (14k leftover). Coordinator, not this seat.

## Leftovers (coord `src/`)

1. FR `meta.seats: 0` vs 595 named — card math lies; do not invent a 595th seat field here.  
2. Gate Grok `desk.id` with `keptDeskByIso` (`fj` is a real empty desk; `uk` is not an iso2).  
3. Do not plot member pins. Do not plot the 163. Do not rewrite kits.

**This sitting:** docs only. **GO** to card the three kits. **fj** stays an honest empty roster.
