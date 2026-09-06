# SEAT 08 — Kept adapter

**Target:** public-suite WIP · tree `sandbox/work/groks-eye-view-next` · **this file only**. No `src/`. No live gevradio. No Bogpulse.

A Grok turn about a legislature becomes **one Insight** (`system: "kept"`, `desk.id` = kit **iso2**). Globe does not move. Drawer does not pop. Fly is opt-in at **1_200_000**. Honest holes stay holes.

## GO / NO-GO

**GO as contract.** Disk already has the 33-desk join, LegKids click path, and DeskDrawer `KeptBody`. Chat must **not** reuse `keptOpen` / LegKids.

**NO-GO to ship until coordinator:**

1. Chat never calls `applyAction({ type: "keptOpen" })` (that path **auto-flies**).
2. Kept **Fly** uses desk `lon/lat` + `1_200_000`, not `flyTo`/`lookupPlace`.
3. `desk.id` is gated by `keptDeskByIso`. Fake / hole iso2 dropped.

## Resolve (Grok text → Insight)

Use `matchKeptDesk(q)` then `keptDeskByIso`. Matcher (`src/lib/kept/desks.ts`): length ≥ 2; iso2 exact among **33**; exact name or capitalName; else unique name-includes or (q ≥ 4 and unique capital-includes). Ambiguous / hole → `null`.

| Hit | Insight |
| --- | --- |
| kit iso2 (`jp`, `Japan`, unique capital) | `system: "kept"`, `layer: "legislatures"`, `desk: { system: "kept", id: desk.iso2 }`, `q` = desk.name (not a city preset), `title` = desk.name, `body` = `{chamber} · {named} of {seats} named` or `no sourced roster` when `named === 0`, `source` = `Kept harvest / public registers` |
| atlas hole (`andorra`, `ad`) | card **without** `desk` and **without** `q`. Body: `Listed without a kit on disk.` Do not fly capitals.json for the 163. |
| empty kit (`cl` `fj` `nl` `th` `tz`) | **is** a desk. Same card. Drawer hole stays `No sourced sitting names on disk. Seat left empty.` |

Do not emit `desk.id` of `streams` / `method` / `compare:` from a legislature turn. Do not mint iso2. Cap remains `keptDesks()` → atlas `kit_on_disk` ∩ capital → `slice(0, 33)`.

Tag shape (spoken text first; this line stripped):

```
<<INSIGHT:{"title":"Japan","body":"National Diet · N of S named","system":"kept","q":"Japan","layer":"legislatures","desk":{"system":"kept","id":"jp"},"source":"Kept harvest / public registers"}>>
```

## Fly is opt-in at 1_200_000

Spine: country legislature default height **1_200_000**, auto-fly **No**. Evidence: `LayerSubs.tsx` `LEG_H = 1_200_000`; LegKids `flyTo(d.lon, d.lat, LEG_H)` + `setDesk({ system: "kept", id: d.iso2 })` + `track(leg-${iso2})`; `runCommand` `keptOpen` same height; `DeskDrawer` KeptAtlas kit buttons same. Those are **explicit clicks**. Chat sets the card only.

**Fly** on the card: if `keptDeskByIso(desk.id)` exists → `setLayer("legislatures", { on: true, freshness: "delayed" })` (33 delayed `leg-{iso2}` billboards, not 16k members) → `engine.flyTo(desk.lon, desk.lat, 1_200_000)` → optional `track(leg-${iso2})`. Never `lookupPlace(q)` — `tokyo` is Narita 14_000 (`locations.ts` `nrt`); Diet fly is JP capital delayed NE, country height.

User-asked “take me / fly / go there / show me on the globe / take me to the chamber in …” may still fly at **1_200_000** after the same resolve. Still no surprise drawer: card first; **Open desk** is the drawer.

## Open desk (globe stays)

`setDesk({ system: "kept", id: iso2 })` only. `KeptBody` already: name, chamber, `{named} of {seats} named`, lazy `loadKeptRoster`, vacancy copy, empty ul if no names. OverlayHud “Open desk” on a tracked `legislature` already strips `leg-`. Chat **Open desk** is that, not `keptOpen`.

## Holes stay holes

`keptAtlasHoles()` = 163 name-sort `<li>` — **no** onClick, **no** fly, **no** setDesk. `pinStream` already refuses non-desks. Chat must not invent members, sittings, or a 34th kit (`_template` is not an atlas iso).

## Leftovers (coordinator)

- `InsightCard` / bubble **Fly** = `applyAction({ type: "flyTo", q })` → `lookupPlace` at preset/48k. Kept Fly must be LEG_H + desk coords.
- `parseInsightTag` does not run `keptDeskByIso`; Grok can smuggle `desk.id: "ad"`. Gate it.
- `commands.ts` `open {q}` / `take me to the chamber in {q}` / `score the sitting in {q}` → `keptOpen` (fly + drawer + close comms). Chat path must not. Command path: fly-ask may keep LEG_H fly; still emit Insight, do not yank the drawer.
- `chat.ts` SYSTEM example is intel Tokyo; no kept iso2 example.
- Bare `tokyo` stays P0 Narita. `open tokyo` is Japan desk (capital-exact) — do not steal the P0 token from chat Fly `q`.
