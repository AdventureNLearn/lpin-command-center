# Command Center — GEV cockpit

**Class:** public-suite WIP · **Tree:** this archive app  
**Decision:** D-268 Open · D-269 Open (Civic / LPIN baseline) · **Depends:** KIT-00 shell, KIT-09 template, KIT-12 exclusive rail  
**Live copy-from (frozen):** https://gevradio.grok.me  
**This sitting:** ingest + template. **Do not patch `src/`.**

The Command Center is **this globe**, not a new homepage. grok.me tools become **context packs**. They ride the existing GEV UI: Cesium globe, holographic floating cards (`InsightCard` / `PeekCard`), desk drawer, command bar, radio.

← `01-WORKDESK-GENERATOR.md` · `04-GROK-ME-PACKS.md` · `05-CIVIC-COMMAND-CENTER.md` · `docs/KIT-09-TEMPLATE.md`

---

## Shape

| Surface | Stays | Packs add |
|---------|-------|-----------|
| Homepage | Cesium globe | Never a pack URL as `/` |
| Floating cards | `.holo-card` glass · Look here optional · no auto-zoom | Pack briefing on the same card |
| Peek | Hover/click a contact · 5s hold | Pack contacts only if the pack named a `Kind` and a budget |
| Desk drawer | One panel, globe mounted | Pack file: kernel, open cells, typed lookup |
| Comms | Grok chat beside the desk | Pack may propose an Insight; camera stays opt-in |
| Radio | Creedence / existing deck | Pack stations are extra, never steal the deck |
| Layers | Exclusive rail · default off for civic | One pack layer at a time. **0 orbit pins** unless the pack says typed fly |

## What a context pack is

A **scrubbed, lazy module** that describes one grok.me tool so the cockpit can show it without iframe, without a second engine, and without dumping its map.

Live host remains SoT for that tool. This tree **copies the method**, not the live app.

## Named packs this sitting (ingest only)

| Pack | Live | Status |
|------|------|--------|
| `fifty` | https://fifty.grok.me | Ingested · `02-PACK-FIFTY.md` · not in `src/` |
| `opencells` | https://opencells.grok.me | Ingested · `03-PACK-OPENCELLS.md` · not in `src/` |
| `insind` | https://insind.grok.me | KIT-11 already on disk · still 0 orbit pins · no iframe |
| Kept / Permit | keptglobal · hivepermitdev | Existing drawers. Not new packs |
| `lpin` | https://lpin-v2-map.grok.me | D-269 labeled Claims + Jobsite packs · `10-PACK-LPIN.md` · trees not merged |
| `tutor` | groktutor.grok.me | D-269 later Learn pack · remotes frozen · cannot score claims |

Swamp Duty and Doinks stay **out**. LPIN / Tutor compose **only** as labeled systems (`06-LABELS.md`).

## P0 refuse

- Remix or overwrite gevradio / grokseyeview.
- Iframe fifty / opencells / insind / keptglobal / hivepermitdev / lpin-v2-map / groktutor as the cockpit.
- 19,000 city pins, nationwide VIN dump, 16k Rest pins, country-freedom ranking pins.
- Municipality names as product samples.
- Skill brands on public copy.
- New route that unmounts Cesium.
- Auto-zoom on pack open.
- Treat a collision (same kernel on two hosts) as a merge.

## GO to implement

Operator names **KIT-19** or **KIT-20** execute. Until then this folder is the fence: **NO-GO** on `src/`.
