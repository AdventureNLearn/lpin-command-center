# 4h 01 — AR AU BR (chat Insight)

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Write:** this file only. No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes.  
**Bar:** Chat names a kit country → same Insight card. Open desk. Fly opt-in at **1_200_000** using kit lat/lon. Holes stay holes.

`named` = `meta.counts.members` (`desks.ts`). `seats` = `meta.seats`. Card body = `{chamber} · {named} of {seats} named`, or **`no sourced roster`** when named = 0.

## Scoreboard

| iso2 | kit_on_disk | named / seats | capital join | chat card |
|------|-------------|---------------|--------------|-----------|
| ar | **true** · `vendor/kept/kits/ar/` | **257 / 257** | Buenos Aires match | **GO** |
| au | **true** · `vendor/kept/kits/au/` | **151 / 151** | Canberra match | **GO** |
| br | **true** · `vendor/kept/kits/br/` | **513 / 513** | Brasília match | **GO** |

Join (all three): atlas `kit_on_disk: true` ∩ `_index.kit_on_disk` ∩ `capitals.json` point (iso2 fold) ∩ package `capital` name/lat/lon. Members.json `"name"` key count equals meta.named. None are named = 0.

## AR — Argentina

- **kit_on_disk:** true (atlas, `_index`, package `source: vendor/kept/kits/ar`). Fat 12-file dir. `members.json` 98316 B, sitting true, `claimed_seats` 257, name keys 257. Not a seed.
- **named/seats:** 257 / 257. Chamber `Cámara de Diputados`. Session Período 144 (2026). `honest_complete` true; `incomplete` true still.
- **Capital join:** NE delayed Buenos Aires **−34.600556, −58.399477**. Package capital identical. Desk Fly uses that point, not a city preset.
- **Named 0?** **No.** Do not swap in the votes hole (`meta.note`: clerk totals 154, **named 0**, yeas unpublished). Card named is the roster, not yeas.

```
Insight { title: "Argentina",
  body: "Cámara de Diputados · 257 of 257 named. Fly if you want the globe to follow.",
  system: "kept", q: "Argentina",
  lat: -34.600556, lon: -58.399477, height: 1_200_000,
  layer: "legislatures", desk: { system: "kept", id: "ar" },
  source: "Kept kit on disk · delayed" }
controls: Fly · Open desk · Dismiss. No auto-fly. No Show layer (desk present).
```

**GO.** Chat `ar` / `Argentina` / `Buenos Aires` → this card. Open desk `ar`.

## AU — Australia

- **kit_on_disk:** true. Fat dir. `members.json` 65075 B, sitting true, `claimed_seats` 151, name keys 151.
- **named/seats:** 151 / 151. Chamber `House of Representatives`. Session 48th Parliament (2025–2028). `houses`/`system` empty in meta — **not** a roster hole.
- **Capital join:** NE delayed Canberra **−35.283029, 149.129026**. Package capital identical.
- **Named 0?** **No.** Votes 354 / key_votes 238 stay a desk hole (`named_donors` false). Card does not load `votes.json` (1.1 MB).

```
Insight { title: "Australia",
  body: "House of Representatives · 151 of 151 named. Fly if you want the globe to follow.",
  system: "kept", q: "Australia",
  lat: -35.283029, lon: 149.129026, height: 1_200_000,
  layer: "legislatures", desk: { system: "kept", id: "au" },
  source: "Kept kit on disk · delayed" }
```

**GO.** Chat `au` / `Australia` / `Canberra` → this card. `sydney` stays the city preset (capital is Canberra). Leftover, not NO-GO: `aus` name-includes Australia while AIRPORT_INDEX `aus` is Austin — Kept matcher runs first.

## BR — Brazil

- **kit_on_disk:** true. Fat dir. `members.json` 179351 B, sitting true, `claimed_seats` 513, name keys 513.
- **named/seats:** 513 / 513. Chamber `Câmara dos Deputados`. Session 57 2023-2027.
- **Capital join:** NE delayed Brasília **−15.781394, −47.917998**. Package capital identical.
- **Named 0?** **No.** Votes 41700 / named 1117 is a clerk-join leftover. Do not parse `votes.json` (59 MB) for the card. Money `named_donors` false stays a desk hole.

```
Insight { title: "Brazil",
  body: "Câmara dos Deputados · 513 of 513 named. Fly if you want the globe to follow.",
  system: "kept", q: "Brazil",
  lat: -15.781394, lon: -47.917998, height: 1_200_000,
  layer: "legislatures", desk: { system: "kept", id: "br" },
  source: "Kept kit on disk · delayed" }
```

**GO.** Chat `br` / `Brazil` / `Brasília` → this card. Open desk `br`.

## Leftovers (coordinator · not this seat)

1. Grok `<<INSIGHT>>` without lat/lon still Flies via `lookupPlace(q)` at city height. Kept Fly must keep **LEG_H + desk coords** (`insight-local` already sets them).
2. One `leg-{iso2}` contact. No member pins. No Rest. No 163 fly.
3. AR vote named-0, AU/BR donor holes, empty `institutional`/`gap` stay **desk** holes. Chat named is members.
4. `aus` vs Austin — gate later. Do not ship this sitting.
