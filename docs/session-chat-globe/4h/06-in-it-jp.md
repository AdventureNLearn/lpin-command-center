# 4h seat 06 — in it jp

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes.

4h bar: chat names a kit country → Insight card. Open desk. Fly opt-in at **1_200_000** using kit lat/lon. Holes stay holes.

## Verdict

| iso2 | Kit | Named / seats | Capital join | Chat → card | Open desk | Fly 1.2Mm |
|------|-----|---------------|--------------|-------------|-----------|-----------|
| in | fat | 540 of 543 | GO | GO iso2 / name / capital | GO + vacancy hole | GO opt-in |
| it | fat roster · thin money | 400 of 400 | GO | GO iso2 / name / capital | GO | GO opt-in |
| jp | fat | 465 of 465 | GO | GO iso2 / name / capital | GO | GO opt-in |

**Seat: GO as disk contract.** All three are in the 33. IN vacancy is a hole, not a pad. IT `honest_empty` is pledges/donors, not an empty sitting.

## Named / seats (E)

Do not dump sitting names here. Do not invent 3 IN vacancies, an upper house, or extra Diet/Camera rows.

| | in | it | jp |
| --- | --- | --- | --- |
| `members.json` | 213576 B · sitting true · `claimed_seats` 543 · 540 named · 0 blank | 138809 B · sitting true · `claimed_seats` **null** · 400 named | 196180 B · sitting true · `claimed_seats` 465 · 465 named |
| package `members.json` | filled 540 · hole `items 540 claimed_seats 543; vacancies not padded` | filled 400 · no members hole | filled 465 · no members hole |
| `meta.json` | India · Lok Sabha · seats 543 · members 540 · kit `scoring` | Italy · Camera dei Deputati · seats 400 · members 400 · kit `map` · `thin` / `honest_empty` | Japan · House of Representatives · seats 465 · members 465 · kit `scoring` |
| drawer | `540 named of 543 seats. Vacancies not invented.` | 400 of 400 named (`claimed` falls back to items.length) | 465 of 465 named |

Card body (`insightFromUserText` ← `keptDesks`): `named` = `meta.counts.members`, `seats` = `meta.seats`.

- in: `Lok Sabha · 540 of 543 named` **GO**
- it: `Camera dei Deputati · 400 of 400 named` **GO** — do not treat `honest_empty` as a roster hole
- jp: `House of Representatives · 465 of 465 named` **GO** — filed chamber, not “National Diet”

## Capital join (E)

All three `kit_on_disk` ∩ `capitals.json`. Package `capital` matches WAVE-2 points. Delayed. One `leg-{iso}` Contact. **No member pins.**

| iso2 | desk name | atlas name | capital (NE, as filed) | lat | lon |
|------|-----------|------------|------------------------|-----|-----|
| in | India | India | New Delhi | 28.600023 | 77.19998 |
| it | Italy | Italy | Rome | 41.897902 | 12.481313 |
| jp | Japan | Japan | Tokyo | 35.686963 | 139.749462 |

## Chat-card GO / NO-GO

Path: `insightFromUserText` → `matchKeptDesk` → card `system:"kept"`, `desk.id` iso2, `lat/lon`, `height` 1_200_000. Comms `setInsight` only. **Does not fly.** Card **Fly** uses the lat/lon branch (`InsightCard`), not `lookupPlace`. **Open desk** = `setDesk` + LEG on. Dark comms still gets this local card.

| User text | Card | Why |
|-----------|------|-----|
| `in` / `India` / `New Delhi` / `delhi` | **GO** kept | iso2 exact · name exact · capital exact / unique includes (≥4) |
| `it` / `Italy` / `Rome` | **GO** kept | same |
| `jp` / `Japan` / `tokyo` | **GO** kept | iso2 / name; `tokyo` capital-includes after P0 preset skips exact |
| `roma` | **NO-GO** | filed capital is Rome |
| `ind` | **NO-GO** | ambiguous vs Indonesia (`id`) name-includes |
| `nrt` | **NO-GO** kept | airport preset, not a desk |

## Leftovers (coordinator `src/`, not this seat)

1. Bare comms `in` / `it` as English particles steal India / Italy (iso2 exact, length 2).
2. Comms `tokyo` is the JP kept card at delayed NE + 1.2Mm. Command-bar bare `tokyo` stays Narita 14k. Do not merge.
3. Grok `<<INSIGHT>>` without lat/lon still `lookupPlace(q)` on Fly (seat 08 leftover). Local user-text path is GO.
4. `parseInsightTag` still lacks `keptDeskByIso` gate.

**Close:** in fat 540/543, it fat 400/400 (thin money), jp fat 465/465. All three Fly opt-in at 1.2Mm from sourced capitals. Not a ship.
