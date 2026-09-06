# Cycle 2 — coordinator useful-tool execute

**Class:** public-suite WIP · not a ship  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Law:** `USEFUL-TOOL.md` everyday + serious  
**Loop:** iterate → audit → forecast → execute

## Iterate

Cycle 1 20 seats finished copy on CLOCK files. DeskDrawer was not in CLOCK. Drawer still printed `{named} of {seats}` (France = 595 of 0). `who sits in France` did not strip to a kit. AskPond closed the desk when opening comms. Dark comms ignored fly-ask.

## Audit

| Audience | Gap | Mark |
|----------|-----|------|
| Everyday | `who sits in {country}` → card | FAIL until strip |
| Everyday | Look here optional | KEEP (Japan chip no yank) |
| Everyday | Honest empty / not 595 of 0 | FAIL until keptCountLine on drawer |
| Serious | Sourced sitting names | Drawer listed names only; kit has caucus + seat |
| Serious | Comms + desk together | AskPond `setDesk(null)` FAIL |
| Serious | Delayed / as-filed | KEEP source register; need retrieved date |

## Forecast

See `FORECAST.md`. Next smoke when globe is awake. Not a ship.

## Execute

- `desks.ts` `keptCountLine` + optional `session`
- `roster.ts` caucus / constituency as filed; empty = we do not have sitting names yet
- `DeskDrawer` honest count, chamber in capital, names with caucus · seat, comms stay open
- `LayerSubs` hint = keptCountLine
- `comms.ts` dark/live fly-ask via `parseCommand`; card from stripped text
- `insight-local` strip `who sits in`
- `CommsChat` Show on the map + Looking at
- Command hint: find a building desk

## Verify

- `tsc --noEmit` PASS
- `node --test scripts/insight-local.test.mjs` 4/4
- Playwright 1440 `?globe=1`: Japan card no yank; desk 465 of 465 named + districts; France 595 named (not of 0); comms stay open
