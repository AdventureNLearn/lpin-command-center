# 4h seat 11 — ua us za

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes.

4h bar: chat names a kit country → Insight card. Open desk. Fly opt-in at **1_200_000** using kit lat/lon. Holes stay holes.

## Verdict

| iso2 | kit_on_disk | Named / seats | Capital join | Chat → card | Open desk | Fly 1.2Mm |
|------|-------------|---------------|--------------|-------------|-----------|-----------|
| ua | true · dir + package | 392 named · 450 claimed | GO | GO iso2 / Ukraine / Kyiv | GO as filed | GO opt-in |
| us | true · dir + package | **437 named · 435 seats** | GO | GO iso2 / United States / Washington | GO as filed | GO opt-in |
| za | true · dir + package | 398 named · 400 claimed | GO | GO iso2 / South Africa / Pretoria | GO as filed | GO opt-in |

**Seat: GO as disk contract.** All three are fat kits in the 33. `kits/us.json` leftover is **not** a 34th kit. Coordinator leftovers below are not a kit rewrite.

## Named / seats (E)

Do not dump sitting names. Do not invent UA’s 58 wartime vacancies, US extra rows, or ZA’s 2.

| | ua | us | za |
| --- | --- | --- | --- |
| `members.json` | 214968 B · items **392** named · `claimed_seats` 450 | 157076 B · items **437** named · `claimed_seats` 435 | 184643 B · items **398** named · `claimed_seats` 400 |
| package `members.json` | filled 392 · hole `392 claimed_seats 450` | filled 437 · **no members hole** | filled 398 · hole `398 of 400; vacancies not padded` |
| `meta.json` | Ukraine · Verkhovna Rada · seats 450 · sitting 392 · kit `map` | United States · House of Representatives · seats **435** · sitting **437** · kit `scoring` | South Africa · National Assembly · seats 400 · sitting 398 · kit `scoring` |
| drawer | `392 named of 450 seats. Vacancies not invented.` | 437 names; claimed 435 → **no** vacancy sentence | `398 named of 400 seats. Vacancies not invented.` |

Card body (`insightFromUserText` ← `keptDesks`): `named` = `meta.counts.members`, `seats` = `meta.seats`.

- ua: `Verkhovna Rada · 392 of 450 named` **GO**
- za: `National Assembly · 398 of 400 named` **GO**
- us: `House of Representatives · 437 of 435 named` **leftover** — both numbers as filed; not trimmed, not padded with senators.

## Capital join (E)

All three `kit_on_disk` ∩ `capitals.json`. Package `capital` name/lat/lon/kind match WAVE-2. Delayed. One `leg-{iso}` Contact. **No member pins.**

| iso2 | desk name (meta) | atlas name | capital (NE, as filed) | lat | lon |
|------|------------------|------------|------------------------|-----|-----|
| ua | Ukraine | Ukraine | Kyiv | 50.435313 | 30.514682 |
| us | United States | United States of America | Washington,  D.C. | 38.901495 | -77.011364 |
| za | South Africa | South Africa | Pretoria | -25.704975 | 28.227483 |

US capital string has **two spaces** after the comma. Do **not** “correct” ZA to another city. NE point on disk is the fly target.

## Chat-card GO / NO-GO

Path: `insightFromUserText` → `matchKeptDesk` → card `system:"kept"`, `desk.id` iso2, `lat/lon`, `height` 1_200_000. Comms `setInsight` only. **Does not fly.** Card **Fly** uses the lat/lon branch (`InsightCard`), not `lookupPlace`. **Open desk** = `setDesk` + LEG on. Dark comms still gets this local card. Iso2 exact runs **before** preset includes, so `us` is the US desk, not Austin.

| User text | Card | Why |
|-----------|------|-----|
| `ua` / `Ukraine` / `Kyiv` | **GO** kept | iso2 exact · name exact · capital exact |
| `us` / `United States` / `washington` | **GO** kept | iso2 wins Austin-includes; unique capital includes |
| `za` / `South Africa` / `Pretoria` | **GO** kept | same |
| `kiev` | **NO-GO** | filed capital is Kyiv |
| `united states of america` / `usa` / `america` | **NO-GO** | desk.name is meta `United States`, not atlas long form |
| `united` | **NO-GO** | ambiguous `gb` + `us` |
| `washington dc` | **NO-GO** | capital is `Washington,  D.C.` (comma + double space) |
| `cape town` / other-city ZA | **NO-GO** | not the capital row; do not mint |
| `austin` / `nyc` / `new york` | **NO-GO** kept | P0 presets; matcher does not steal |

## Leftovers (coordinator `src/`, not this seat)

1. US card `437 of 435 named` — use `claimed_seats` / items, or keep both as filed with a visible hole.
2. Atlas long-name / `usa` alias — optional. Do not steal P0 `austin` from `us`.
3. `lookupPlace("Ukraine")` is the Eastern Europe region preset (49, 31), not Kyiv. Local card already carries Kyiv + `LEG_H`; Grok `<<INSIGHT>>` without lat/lon must not Fly via `q`.
4. `kits/us.json` leftover scoring card (`local_members: []`). Atlas `kit_on_disk` describes the **dir**. Do not count it as a 34th kit.
5. Grok tag still needs `keptDeskByIso` gate (seat 08 leftover). This seat does not patch.

**Close:** ua / us / za fat on disk. Fly opt-in at 1.2Mm from sourced capitals. Not a ship.
