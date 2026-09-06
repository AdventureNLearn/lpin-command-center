# 4h / 07 — ke · kr · mx (Kept kit honesty)

**Seat:** 07 · **Class:** public-suite WIP · localhost · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163-hole plot.  
**4h bar:** Chat names a kit country → card. Open desk. Fly opt-in at 1.2Mm using kit lat/lon.  
**Law:** `4H-PUSH.md` · `00-SPINE.md` · `08-kept.md`. Coordinator owns `src/`.

## Verdict

| Gate | ke | kr | mx |
|------|----|----|----|
| `kit_on_disk` | **GO** | **GO** | **GO** |
| Capital join | **GO** | **GO** | **GO** |
| Named / seats | **NO-GO** card copy (`seats: 0`) | **GO** with leftover 302/300 | **GO** 496 of 500 |
| Chat-card | **GO** iso2 / country | **GO** `kr` / korea | **GO** iso2 / country |

Seat: **GO as 4h kit** (all three are desks). **NO-GO to ship** KE body until `meta.seats` is statutory 349, not 0.

## kit_on_disk

Atlas `kit_on_disk: true` (retrieved 2026-08-29). Folders `vendor/kept/kits/{ke,kr,mx}/` each have the 12 gold objects. Packages match. `_template` is not an iso. **kp** is `kit_on_disk: false` — hole, not a 34th kit. Sidecar `kits/kr.json` is stale (320/24); desk glob is `kits/*/meta.json`.

| iso | atlas name | meta.name | kit | chamber |
|-----|------------|-----------|-----|---------|
| ke | Kenya | Kenya | map | National Assembly |
| kr | Republic of Korea | Korea, Republic of | scoring | National Assembly |
| mx | Mexico | Mexico | scoring | Cámara de Diputados |

## Named / seats (do not pad)

`desks.ts`: `named = meta.counts.members`, `seats = meta.seats ?? named`. Drawer lazy-loads `members.json` (blank names skipped). **No votes.json in HUD.** No member pins.

| | ke | kr | mx |
|--|----|----|----|
| `members.json` items named | **348** / 348 | **302** / 302 | **496** / 496 |
| `claimed_seats` | 349 | **absent** | 500 |
| `meta.counts.members` / sitting | 348 / 348 | 302 / 302 | 496 / 496 |
| `meta.seats` | **0** | 300 | 500 |
| Desk copy today | `348 of 0 named` | `302 of 300 named` | `496 of 500 named` |
| Roster hole | `348 named of 349 seats. Vacancies not invented.` | none (claimed defaults to 302) | `496 named of 500 seats. Vacancies not invented.` |

KE: 348 sitting, one statutory seat not padded. MX: 4 vacant not padded. KR: sit 302 vs statutory 300 — do not drop names. Ethics / named_votes / named_donors stay holes.

## Capital join

`keptDesks()` = atlas `kit_on_disk` ∩ `capitals.json` (iso2 fold) ∩ meta. All three join. Package `capital` lat/lon/name match the points. Kind `capital`, freshness delayed, not (0,0). Fly uses **desk lon/lat**, country height **1_200_000**, not a city preset.

| iso | capitals iso2 | lat | lon | match vs package |
|-----|---------------|-----|-----|------------------|
| ke | KE | −1.281401 | 36.814711 | equal |
| kr | KR | 37.568295 | 126.997785 | equal |
| mx | MX | 19.444388 | −99.132934 | equal |

`locations.ts` has **no** steal for these three (unlike `nrt` / Tokyo). Capital-name exact still resolves the desk (`matchKeptDesk`).

## Chat-card GO / NO-GO

Local path: `insightFromUserText` → `matchKeptDesk` → Insight `system:"kept"`, `layer:"legislatures"`, `desk.id` = iso2, `q` = desk.name, **lat/lon/height = LEG_H**. Dark comms still cards (`comms.ts`). Globe does **not** auto-fly. **Open desk** is the drawer. **Fly** on the card uses coords + 1.2Mm when lat/lon present.

| User text | Resolve | Card |
|-----------|---------|------|
| `ke` / Kenya | exact iso2 / name | **GO** |
| `kr` / korea / Korea, Republic of | iso2 / unique includes / exact meta name | **GO** |
| `south korea` | no iso, name, or unique include | **NO-GO** leftover (no card) |
| `mx` / Mexico / capital exact | iso2 / name / capital | **GO** |
| `kp` / north korea | not in `keptDesks()` | hole card **without** desk/`q` — do not fly |

Do not emit `desk.id` `streams` / `method` / `compare:` from a legislature turn. Do not mint sitting names. Chat must not call `keptOpen` (that path auto-flies + closes comms).

## Leftovers (coordinator `src/`, not this file)

1. KE `meta.seats: 0` → glass body `348 of 0 named`. Bind seats to `claimed_seats` 349 (or members file), not the empty map-seed field.
2. KR members file omits `claimed_seats`; roster looks complete at 302 while meta.seats is 300.
3. Grok `<<INSIGHT>>` without lat/lon falls through InsightCard `flyTo`/`lookupPlace` — Kept Fly must stay LEG_H + desk coords.
4. `south korea` unmatched. Optional alias only if unique among the 33; never bind **kp**.
5. `setDesk` does not gate `keptDeskByIso`; Grok can smuggle a hole iso. Gate it.

**Close:** ke/kr/mx are three of the 33. Kits on disk. Capitals join. Cards for named countries. KE seat count is the honesty bug. Not a ship.
