# HOUR 0 — seat 08 `src/lib/kept/desks.ts`

**Class:** public-suite WIP · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Phase:** Develop (CLOCK T+0)  
**This file + owned src only.** No live gevradio. No 163 holes. No Rest.

## Harden

| Rule | Disk after hour 0 |
|------|-------------------|
| `meta.seats === 0` (or missing / non-number) | `seats` = `named` (`counts.members` then `sitting`). Chile 155 stays 155. FJ/NL/TH/TZ 0 → 0. |
| Cap | atlas `kit_on_disk` ∩ capital, then `slice(0, 33)`. Still 33. `_template` not an iso. |
| `matchKeptDesk` 2-letter | iso2 **exact only**. Query must be exactly 2 letters. |
| English `in` / `it` | **null**. Not India. Not Italy. `keptDeskByIso("in"\|"it")` still works (explicit iso, not query). |
| Query length ≥ 3 | name / capital exact, then unique includes (capital includes still ≥ 4). No iso2 path. |

## Matcher table

| query | result |
|-------|--------|
| `in` `it` | **null** (English) |
| `jp` `us` `gb` `id` `cl` | exact kit iso2 |
| `ad` `to` `xx` | **null** (not a kit iso2; no name-includes at length 2) |
| `india` `new delhi` `delhi` | in |
| `italy` `rome` | it |
| `japan` | jp |
| `tokyo` | jp (capital exact unless preset short-circuits exact; includes still unique) |
| `ind` | **null** (India + Indonesia) |
| `andorra` | **null** (hole) |

Bare comms leftover from `4h/06-in-it-jp.md` §1 is closed in this matcher. Country names still GO.

## Do-not

- Do not raise the 33 cap. Do not plot the 163.
- Do not invent FJ/NL/TH/TZ sittings when seats fall back to 0.
- Do not case-split `IN` vs `in` — matcher lowercases.
- Do not own `commands.ts` / `insight-local.ts` this hour.

**Close:** seats fallback kept; cap 33 kept; `in`/`it` no longer steal desks. Not a ship.
