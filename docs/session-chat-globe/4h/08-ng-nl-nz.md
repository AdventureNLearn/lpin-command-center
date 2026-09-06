# 4h seat 08 — ng nl nz

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes.

4h bar: chat names a kit country → Insight card. Open desk. Fly opt-in at **1_200_000** using kit lat/lon. Holes stay holes.

## Verdict

| iso2 | Kit | Named / seats | Capital join | Chat → card | Open desk | Fly 1.2Mm |
|------|-----|---------------|--------------|-------------|-----------|-----------|
| ng | fat scoring | 358 named · 360 claimed | GO | GO iso2 / name / capital | GO as filed | GO opt-in |
| nl | empty map-seed | **0 named · honest hole** | GO as filed | GO iso2 / meta name / capital | GO hole copy | GO opt-in |
| nz | fat (tag still `map`) | 123 of 123 | GO | GO iso2 / name / capital | GO | GO opt-in |

**Seat: GO as disk contract.** Empty NL is a desk, not a missing country. Do not invent a Tweede Kamer roster.

## Named / seats (E)

Do not dump sitting names here. Do not invent NG’s 2 vacancies or an NL sitting list.

| | ng | nl | nz |
| --- | --- | --- | --- |
| `members.json` | 161931 B · `sitting` true · `claimed_seats` 360 · 358 named | **34 B** `{ "iso2":"nl","items":[] }` | 51109 B · `sitting` true · `claimed_seats` 123 · 123 named |
| package `members.json` | filled 358 · hole `358 claimed_seats 360; vacancies not padded` | empty 0 · `items 0; sitting 0; no invented roster` | filled 123 · no members hole |
| `meta.json` | Nigeria · House of Representatives · seats 360 · sitting 358 · kit `scoring` | Netherlands · Tweede Kamer · seats 0 · sitting 0 · kit `map` · `incomplete` true | New Zealand · House of Representatives · seats 123 · sitting 123 · kit `map` |
| drawer | names as filed; 358/360 hole visible | `No sourced sitting names on disk. Seat left empty.` | 123 of 123 named |

Card body (`insightFromUserText` ← `keptDesks`): `named` = `meta.counts.members`, `seats` = `meta.seats`.

- ng: `House of Representatives · 358 of 360 named` **GO**
- nl: `Tweede Kamer · no sourced roster` **GO** (`named === 0`)
- nz: `House of Representatives · 123 of 123 named` **GO**

## Capital join (E)

All three `kit_on_disk` ∩ `capitals.json`. Package `capital` matches WAVE-2 points. Delayed. One `leg-{iso}` Contact. **No member pins.**

| iso2 | desk name (meta) | atlas name | capital (NE, as filed) | lat | lon |
|------|------------------|------------|------------------------|-----|-----|
| ng | Nigeria | Nigeria | Abuja | 9.085279 | 7.531382 |
| nl | Netherlands | Netherlands (Kingdom of the) | Amsterdam | 52.351915 | 4.914694 |
| nz | New Zealand | New Zealand | Wellington | -41.299988 | 174.783266 |

Fly uses these coords + `LEG_H` `1_200_000`, not `lookupPlace`. Do not “correct” NL to another city. Atlas long form is not `desk.name`.

## Chat-card GO / NO-GO

Path: `insightFromUserText` → `matchKeptDesk` **before** search-lite / presets. Comms `setInsight` only. **Does not fly.** Card **Fly** uses the lat/lon branch (`InsightCard`), not `lookupPlace`. **Open desk** = `setDesk` + LEG on. Dark comms still gets this local card.

| User text | Card | Why |
|-----------|------|-----|
| `ng` / `Nigeria` / `Abuja` | **GO** kept | iso2 exact · name exact · capital exact (no P0 preset) |
| `nl` / `Netherlands` / `Amsterdam` | **GO** kept + hole body | same; empty roster is still a desk |
| `nz` / `New Zealand` / `Wellington` | **GO** kept | same; kept beats search-lite `fl-wellington` |
| `holland` | **NO-GO** | alias not on disk |
| `Netherlands (Kingdom of the)` | **NO-GO** | desk.name is meta `Netherlands`, not atlas long form |
| `rotterdam` | **NO-GO** kept | P0 port preset, not Tweede Kamer |
| invented NL names / 163 holes | **NO-GO** | seed `items: []`; do not fly capitals.json for holes |

## Leftovers (coordinator `src/`, not this seat)

1. NL atlas long-name / `holland` aliases — optional. Do **not** mint 150 seats or sitting names.
2. 1 NG name field starts with a comma; still counted named. Do not rewrite the roster.
3. Bare `new` unique-includes NZ; `well` unique-includes Wellington. Optional tighten. Do not steal NYC preset from `new york`.
4. Grok `<<INSIGHT>>` still needs `keptDeskByIso` gate (seat 08 leftover). This seat does not patch.

**Close:** ng fat, nl empty hole, nz fat. All three Fly opt-in at 1.2Mm from sourced capitals. Not a ship.
