# Cycle 1 · seat 05 · `src/lib/intel/comms.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Audiences:** everyday + serious (`USEFUL-TOOL.md`)  
**Phase:** iterate → audit → forecast → execute · this file only

## Iterate

Hour 0 already gated ACTION `layer` and `flyTo`. Greeting is already plain English (Look here optional, incomplete stays empty). Dark comms already attached `insightFromUserText`. Left as cockpit slang: roast chips, “Comms dark / Copy that”, unasked `reset`/`next`/`cockpit` (cockpit auto-tracks a plane), unasked `trackNearest` card with `q:"flight"` (Look here geocodes “flight”).

## Audit

| USEFUL-TOOL | Disk | Mark |
|-------------|------|------|
| Plain English ask → card, not yank | greeting + flyTo/layer gates | **KEEP** greeting |
| Look here optional | greeting names it | **KEEP** |
| Honest empty / delayed kits | dark `insightFromUserText` | **KEEP** local cards |
| Stranger chips | roast / tea / classified-planes | **FAIL** everyday |
| No auto-zoom | unasked cockpit/reset/next still apply | **FAIL** |
| ISS / 33-kit card without fly | unasked trackNearest used `insightFromFlyQuery(kind)` | **FAIL** (`q:"flight"`) |

## Forecast

Next cycle: radio/style still unasked (not camera). Bubble chip labels are seat 04. SYSTEM Grok-voice is seat 06. Smoke: dark “What’s over Japan?” / ISS / any planes still card.

## Execute

- Greeting **unchanged**.
- Dark `!res.ok` + catch still `insightFromUserText` + `setInsight`. Copy: files on this machine, globe still works.
- Chips: Japan / ISS / any planes (dark-cardable). No roast. No demo city. Creedence only if radio off.
- Unasked `trackNearest` → ISS card or layer card, not `flyTo "flight"`.
- Unasked `reset` / `next` / `cockpit` dropped (cockpit was a silent track).
- Empty Grok text: Look here optional, or honest empty.

## Verify

`npm.cmd run typecheck` (`tsc --noEmit`) **PASS**.

## Not this seat

`chat.ts` SYSTEM, InsightCard labels, CommsChat bubble chips, `insight-local.ts` strip, command bar.
