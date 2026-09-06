# CYCLE 1 — seat 08 `src/lib/kept/desks.ts`

**Class:** public-suite WIP · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Law:** `USEFUL-TOOL.md` · 33 kits · iterate → audit → forecast → execute  
**Owns:** this note + `src/lib/kept/desks.ts` only.

## Iterate (hour 0 leftover)

Matcher `in`/`it` English already null. Cap 33 already. Seats fallback `0 → named` was the hour-0 harden. It over-completes kits whose chamber size is filed **0**.

## Audit (33 kits, named / seats as filed)

| Class | iso2 | named | seats filed | Hour 0 display | Honest |
|-------|------|------:|------------:|----------------|--------|
| Chamber 0, roster fat | fr ke gh id tr | 595 / 348 / 275 / 569 / 591 | 0 | N of N named | **N named** (size unknown) |
| Chamber 0, empty | fj nl tz | 0 | 0 | no sourced roster | same |
| No seats key | th | 0 | — | no sourced roster | same |
| Empty names, chamber known | cl | 0 | 155 | no sourced roster (globe) | same; drawer still 0 of 155 |
| Over-count as filed | us kr | 437 / 302 | 435 / 300 | N of S | **keep both** — do not trim |
| Vacancy as filed | in ca il ng | 540/543, 338/343, 118/120, 358/360 | as filed | N of S | keep |

33 after `kit_on_disk` ∩ capital ∩ `slice(0, 33)`. Holes stay listed, not plotted.

## Forecast

- Everyday: empty kit says we do not have names. Fat kit with unknown chamber does **not** look 100% seated.
- Serious: delayed / sourced / hole. No invented sittings. No invented house size.
- Next: DeskDrawer / LayerSubs / insight-local still interpolate `{named} of {seats}`. Switch those to `keptCountLine` (not this seat).

## Execute

- `seats` = filed number only if `> 0`; else **0**. Do not copy `named`.
- Export `keptCountLine`: named 0 → `no sourced roster`; seats 0 → `{n} named`; else `{n} of {s} named`.
- `keptContact` uses that line. Cap 33 unchanged. Matcher unchanged.

**Close:** FR/KE/GH/ID/TR no longer fake a full house. Not a ship.
