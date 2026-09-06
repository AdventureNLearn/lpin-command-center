# 4h seat 10 — tr tw tz

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes.

4h bar: chat names a kit country → Insight card. Open desk. Fly opt-in at **1_200_000** using kit lat/lon. Holes stay holes.

## Verdict

| iso2 | Kit | Named / seats | Capital join | Chat → card | Open desk | Fly 1.2Mm |
|------|-----|---------------|--------------|-------------|-----------|-----------|
| tr | fat | 591 named · 600 claimed | GO | GO iso2 / filed name / capital | GO as filed | GO opt-in |
| tw | fat | 113 of 113 | GO | GO iso2 / name / capital | GO | GO opt-in |
| tz | empty map-seed | **0 named · honest hole** | GO as filed | GO iso2 / meta name / capital | GO hole copy | GO opt-in |

**Seat: GO as disk contract.** Empty TZ is a desk, not a missing country. Coordinator leftovers below are not a kit rewrite.

## Named / seats (E)

Do not dump sitting names here. Do not invent the 9 TR vacancies or a TZ roster.

| | tr | tw | tz |
| --- | --- | --- | --- |
| `members.json` | 288166 B · `sitting` true · `claimed_seats` 600 · items filled | 55432 B · `sitting` true · `claimed_seats` 113 · items filled | **34 B** `{ "iso2":"tz","items":[] }` |
| package `members.json` | filled 591 · hole `591 of 600; vacancies not padded` | filled 113 · no members hole | empty 0 · `items 0; sitting 0; no invented roster` |
| `meta.json` | Türkiye · Grand National Assembly · `counts.members` 591 · **`seats` 0** · kit tag `map` (stale vs fat file) | Taiwan · Legislative Yuan · seats 113 · sitting 113 · kit `scoring` | Tanzania · National Assembly · seats 0 · sitting 0 · kit `map` · `incomplete` true |
| drawer | names as filed; 591/600 hole visible | 113 of 113 named | `No sourced sitting names on disk. Seat left empty.` |

Card body (`insightFromUserText` ← `keptDesks`): `named` = `meta.counts.members`, `seats` = `meta.seats`.

- tw: `Legislative Yuan · 113 of 113 named` **GO**
- tz: `National Assembly · no sourced roster` **GO** (`named === 0`)
- tr: `Grand National Assembly · 591 of 0 named` **leftover** — `meta.seats` is 0, not 600. Package hole is the honest ratio.

## Capital join (E)

All three `kit_on_disk` ∩ `capitals.json`. Package `capital` matches WAVE-2 points. Delayed. One `leg-{iso}` Contact. **No member pins.**

| iso2 | desk name (meta) | atlas name | capital (NE, as filed) | lat | lon |
|------|------------------|------------|------------------------|-----|-----|
| tr | Türkiye | Türkiye | Ankara | 39.929184 | 32.862446 |
| tw | Taiwan | Taiwan | Taipei | 25.035833 | 121.568333 |
| tz | Tanzania | United Republic of Tanzania | Dar es Salaam | -6.798067 | 39.266396 |

Do **not** “correct” TZ to another city. NE point on disk is the fly target. TW atlas `un_member: false` still has a kit — still a desk.

## Chat-card GO / NO-GO

Path: `insightFromUserText` → `matchKeptDesk` → card `system:"kept"`, `desk.id` iso2, `lat/lon`, `height` 1_200_000. Comms `setInsight` only. **Does not fly.** Card **Fly** uses the lat/lon branch (`InsightCard`), not `lookupPlace`. **Open desk** = `setDesk` + LEG on. Dark comms still gets this local card.

| User text | Card | Why |
|-----------|------|-----|
| `tr` / `Türkiye` / `Ankara` | **GO** kept | iso2 exact · name exact · capital exact (no P0 preset) |
| `tw` / `Taiwan` / `Taipei` | **GO** kept | same |
| `tz` / `Tanzania` / `Dar es Salaam` | **GO** kept + hole body | same; empty roster is still a desk |
| `turkey` (ASCII) | **NO-GO** | filed name is Türkiye; not iso2 |
| `United Republic of Tanzania` | **NO-GO** | desk.name is meta `Tanzania`, not atlas long form |
| other-city TZ alias | **NO-GO** | not a capital row; do not mint |

## Leftovers (coordinator `src/`, not this seat)

1. TR card `591 of 0 named` — use claimed_seats / package hole, not `meta.seats` 0.
2. ASCII `turkey` alias — optional. Do not steal Rest `tx-turkey` (search-lite must stay Rest-free).
3. TZ atlas long-name alias — optional. Do not change fly coords.
4. Grok `<<INSIGHT>>` still needs `keptDeskByIso` gate (seat 08 leftover). This seat does not patch.

**Close:** tr fat, tw fat, tz empty hole. All three Fly opt-in at 1.2Mm from sourced capitals. Not a ship.
