# 4h seat 09 — ph / pl / th

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas dump.

Harden bar: chat names a kit country → Insight card. **Open desk**. **Fly** opt-in at **1_200_000** using desk lat/lon. Empty roster stays empty.

## Scoreboard

| iso2 | named / seats | Capital join | Chat-card |
|------|---------------|--------------|-----------|
| **ph** | **317 / 317** | GO · Manila 14.606105, 120.980271 | **GO** fat desk |
| **pl** | **460 / 460** | GO · Warsaw 52.251947, 20.998054 | **GO** fat desk |
| **th** | **0 / 0** | GO · Bangkok 13.751945, 100.514699 | **GO** empty desk |

All three: atlas `kit_on_disk: true` ∩ `capitals.json` → `keptDesks()` (cap 33). **Not** atlas holes. `locations.ts` has no Manila / Warsaw / Bangkok presets, so capital-exact match is not stolen.

## ph — Philippines (map)

Chamber **House of Representatives**. Session 20th Congress (2025–). `meta.seats` 317 · `counts.members`/`sitting` 317. Package `members.json` filled **317**.

`kits/ph/members.json`: **317** named items, `iso2: "ph"`, Wikipedia roster, retrieved 2026-08-20.

Honesty leftover (do not pad, do not drop): `claimed_seats` **316** vs 317 items. Package hole `items 317 claimed_seats 316`. Card uses meta **317 of 317**.

Gap 0. Votes 67, named yeas 0 (journals totals — not invented). `named_donors` false. Money 0.

Resolve: `ph` · `Philippines` · `Manila`. Card: `system: "kept"`, `desk.id: "ph"`, `q: "Philippines"`, `layer: "legislatures"`, body `House of Representatives · 317 of 317 named`, lat/lon capital, height `1_200_000`.

## pl — Poland (map)

Chamber **Sejm**. Session 10th Sejm (2023–2027). **460 of 460** named. `claimed_seats` 460. Package members filled 460. Roster `https://api.sejm.gov.pl/sejm/term10/MP`.

Gap 0 after 1154 same-issue pair exam. Votes 921 clerk nominative. Pledges 22 on disk (coverage.json still says 0 — stale vs kit). `named_donors` false.

Resolve: `pl` · `Poland` · `Warsaw`. Card: `desk.id: "pl"`, body `Sejm · 460 of 460 named`. Same Fly height.

## th — Thailand (empty roster · honest hole)

**Is a desk.** BATCH 1 map-only seed from `_template`. Sitting 0. Do **not** invent members, pledges, or yeas.

- `kits/th/members.json` (34 B): `{ "iso2": "xx", "items": [] }` — template iso leftover, **not** a 34th kit.
- Meta: chamber blank → desk chamber fallback **Legislature**. `seats` absent → seats = named = **0**.
- Package hole: `items 0; sitting 0; no invented roster`. Capital join **GO**.
- `vendor/kept/index.json` omits `th` (ph/pl listed). `coverage.json` has no `th` row. Kit dir + atlas + capitals are the authority.

Resolve: `th` · `Thailand` · `Bangkok`. Card: title Thailand, body `Legislature · no sourced roster`, `desk.id: "th"`, `q: "Thailand"`, Fly still allowed at 1.2Mm (country pin, 0 member pins).

Open desk: `KeptBody` empty list + `No sourced sitting names on disk. Seat left empty.`

## Chat-card

`insightFromUserText` → `matchKeptDesk` → `setInsight`. `askedToMove` short-circuits to ACTION; otherwise **no auto-zoom**. Dark comms in `comms.ts` still mints this local card.

**GO** for ph / pl / th on iso2, country name, unique capital. **Open desk** is `setDesk({ system: "kept", id })`, not `keptOpen` (that path auto-flies).

**NO-GO to ship** until coordinator: Grok `<<INSIGHT>>` `desk.id` gated by `keptDeskByIso`; Fly without lat/lon must not `lookupPlace(q)` (country name ≠ city preset).

## Leftovers (not this file)

- PH `claimed_seats` 316 vs 317 named.
- TH members `iso2: "xx"`. Do not refill.
- coverage.json / index.json lag the kits.
- 0 globe pins for sitting names.

**Close:** three kits join. Two fat rosters. TH empty is a hole, not a skip. Chat-card contract **GO**. Not a ship.
