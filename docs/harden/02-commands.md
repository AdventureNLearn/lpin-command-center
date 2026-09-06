# SEAT H02 — COMMAND COLLISIONS

Seat: H02 · harden 02 of 15 · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: **this file only**. No `src/` edits.

Sources (read fully): `src/lib/intel/commands.ts`, `src/lib/intel/runCommand.ts`.  
Join: `src/lib/intel/types.ts` `CommandAction`, `src/lib/kept/desks.ts` `matchKeptDesk`, `src/lib/intel/radio.ts` `PRESET_STATIONS`, `src/lib/permit/search-lite.ts` `searchAhj`.

---

## E — Evidence

Pipe: OverlayHud footer → `runCommand(text)` → `parseCommand` (local regex, first match wins) → if `unknown`, Grok `interpretCommand` then `fromUnknown` → `applyAction`. HUD cases (radio, corpus, desk, permitSearch, keptOpen, keptCompare, permitPlaybook) return before `if (!engine)`. Globe cases sit in the post-engine `switch`.

### Parser order on disk (`parseCommand`, `commands.ts` 33–196)

| # | Lines | Gate | Action |
| --- | ---: | --- | --- |
| 0 | 34–35 | empty trim | `{ type: "unknown" }` |
| 1 | 37–39 | `reset\|home\|full globe\|zoom out\|globe view` | `reset` |
| 2 | 40–63 | radio pause / next / prev / **preset + `play\|put on\|tune\|radio\|spin`** / ccr\|creedence / `radio on\|play radio\|open radio\|tuner` | `radio` |
| 3 | 64–72 | next contact · enter/exit cockpit | `next` / `cockpit` |
| 4 | 73–74 | hide/show hud | `hud` |
| 5 | 75–78 | hide/close/show/open corpus · bare `corpus` | `corpus` |
| 6 | 79–87 | `close desk\|hide desk\|desk off\|close drawers?` · `open (legislature\|kept) desk` · `^(open )?(building\|permit\|ahj) desk$` | `desk` |
| 7 | 88–91 | `^find ahj in {place}$` · `^building desk {place}$` | `permitSearch` |
| 8 | 92–116 | `score the sitting in` · `take me to the chamber in` · `compare a and b` · `{kind} permit playbook` | `keptOpen` / `keptCompare` / `permitPlaybook` |
| 9 | 117–121 | `^open {q}$` then `matchKeptDesk(q)` (denylist radio/corpus/*desk) | `keptOpen` **or fall through** |
| 10 | 122–125 | detection on/off | `detection` |
| 11 | 127–136 | **early LEG/AHJ layer-on block** (`on\|enable\|show\|turn on\|light up` / `off\|disable\|hide\|turn off`) | `layer` legislatures\|permits |
| 12 | 138–149 | SCENES · STYLES | `scene` / `style` |
| 13 | 151–157 | **generic `LAYERS` loop** (same on/off words; all nine layer ids) | `layer` |
| 14 | 159–179 | how many · track ISS / nearest | `count` / `trackNearest` |
| 15 | 181–184 | `take me to\|fly to\|go to\|show me\|open\|jump to\|navigate to {q}` | `flyTo` |
| 16 | 186–193 | lat,lon · bare `tokyo\|austin\|lax\|jfk\|heathrow\|singapore\|dubai\|sydney\|iss\|new york\|nyc` | `flyToCoord` / `flyTo` |
| 17 | 195 | else | `unknown` |

Layer on-words (both blocks): `on|enable|show|turn on|light up`.  
Layer off-words: `off|disable|hide|turn off`.  
**`open` is not a layer on-word.** `\bon\b` **is**, and it matches the `on` inside **`put on`**.

`LAYERS` rows (`commands.ts` 6–16): military, flights, vessels, satellites, earthquakes, fires, launches, **legislatures** (`legislatures?|\bleg\b|kept harvest`), **permits** (`permits?|\bahj\b|permit harbor`).

### Phrase → action (live)

Apply column is `applyAction` in `runCommand.ts`. Engine-null is silent only after the HUD returns.

| Phrase (and obvious synonyms) | Parse | Apply today |
| --- | --- | --- |
| `reset` · `home` · `full globe` · `zoom out` · `globe view` | `reset` | `engine.resetGlobe` · flash “Full globe” |
| `pause radio` · `stop radio` · `radio off` · `mute radio` | `radio` on false | pause · “Radio off” |
| `next station` · `skip station` · `radio next` | `radio` id next | `next()` |
| `previous station` · `last station` · `radio back` | `radio` id prev | `prev()` |
| `{station} + play\|put on\|tune\|radio\|spin` (name/id/alias, len≥3) | `radio` id station | `play(id)` · “{name} on the wire” |
| `put on creedence` · `play ccr` · `spin some creedence` · bare `ccr`/`creedence` | `radio` id `ccr` | station Creedence. **P0.** |
| `radio on` · `play radio` · `open radio` · `tuner` | `radio` on true | play current |
| `next contact` · `next aircraft` · `next plane` | `next` | `engine.nextContact` |
| `cockpit` · `enter cockpit` (no `exit`) | `cockpit` on | enter + maybe track flight |
| `exit cockpit` · `leave cockpit` · `map view` | `cockpit` off | map view |
| `hide hud` · `hud off` / `show hud` · `hud on` | `hud` | `setHud` |
| `show corpus` · `open corpus` · `corpus on` · `intel corpus` · bare `corpus` | `corpus` on | `setCorpusOpen(true)` · close comms + radio picker. **Does not close desk.** |
| `hide corpus` · `close corpus` · `corpus off` | `corpus` off | panel closed |
| `close desk` · `hide desk` · `desk off` · `close drawer(s)` | `desk` on false | `setDesk(null)` · “Desk closed” |
| `open legislature desk` · `open kept desk` · bare `kept desk` / `legislature desk` | `desk` on, system `kept` | empty Kept drawer · “Legislature desk”. **Does not close corpus.** |
| `open building desk` · `open permit desk` · `open ahj desk` · bare `building/permit/ahj desk` | `desk` on, system `permit` | empty Permit drawer · “Building desk” |
| `find AHJ in {place}` | `permitSearch` q | `searchAhj` · `setDesk({ system: "permit", id })` · optional `lookupPlace` |
| `building desk {place}` (no leading `open`) | `permitSearch` q | same |
| `score the sitting in {place}` · `take me to the chamber in {place}` | `keptOpen` iso2 if `matchKeptDesk` hits, else unknown | LEG on + Kept desk id=iso2 + flyTo capital 1.2Mm |
| `compare {a} and {b}` | `keptCompare` if both desks match | desk id `compare:a:b` · “Compare shell · streams not filled” |
| `{project} permit playbook` (`PROJECT_KINDS` ids, hyphens optional) | `permitPlaybook` | desk id `playbook:{kind}` |
| **`open tokyo`** | **`keptOpen` iso2 `jp`** (Tokyo is JP capital) | **JP desk + LEG on + flyTo Tokyo.** Not `flyTo`. |
| **`open canada`** | **`keptOpen` iso2 `ca`** (country name) | CA desk + LEG on + flyTo **Ottawa** |
| `open korea` | `keptOpen` `kr` (unique substring of meta name `Korea, Republic of`) | KR desk + LEG on + flyTo Seoul |
| `open japan` · `open ca` · `open jp` | `keptOpen` (country / iso2) | same family |
| `open ottawa` | `keptOpen` `ca` (capital name) | same steal as tokyo |
| `open radio` / `open corpus` / `open legislature desk` | already returned in #2 / #5 / #6 | not keptOpen (denylist on the remainder) |
| `detection on` · `detect on` · `show detections` / off | `detection` | `setDetection` |
| **`show legislatures`** · `show legislature` · `show leg` · `enable/turn on/light up` + those · `show kept harvest` | **`layer` id `legislatures` on** (early block #11) | rail + flash “Legislatures on”. **No drawer.** |
| `hide legislatures` · `hide leg` · `hide kept harvest` | layer legislatures off | “Legislatures off” |
| **`open legislature desk`** | **`desk` kept** (#6, before layers and flyTo) | empty drawer. LEG rail unchanged. |
| **`show ahj`** · `show permits` · `show permit harbor` | **`layer` id `permits` on** | rail + “Permits on”. **No AHJ search.** |
| **`find AHJ in miami`** | **`permitSearch`** | Building desk + `searchAhj("miami")` |
| `hide permits` · `hide ahj` | layer permits off | — |
| `show flights` · `enable vessels` · `hide fires` · … | `layer` via generic loop #13 | `setLayer` + `LAYER_META[id].label` |
| `show me space` · `orbital watch` · `space missions` | `scene` orbital (after early LEG/AHJ, **before** generic layers) | `playScene` |
| `show me fires` · `fire line` · `wildfire` | `scene` fire | same |
| `show fires` (no `me`) | `layer` fires (scene regex needs `show me fires`) | layer, not scene |
| `nvg` · `night vision` · `flir` · `crt` · short style tokens | `style` | `engine.setStyle` |
| `how many flights/ships/sats` | `count` | flash drawn count (needs engine) |
| `track iss` · bare `iss` · `show/find/follow iss` | `trackNearest` iss | satellites layer + track |
| `fly to tokyo` · `take me to tokyo` · `show me tokyo` · `go to / jump to / navigate to {q}` | `flyTo` q | `engine.lookupPlace` |
| `open {q}` when `matchKeptDesk` misses | `flyTo` q (prefix `open` in #15) | geocode |
| `35.68, 139.75` | `flyToCoord` | `engine.flyTo` |
| bare `tokyo` · `austin` · `nyc` · … | `flyTo` | lookupPlace. **P0 city list. Not used when prefixed with `open`.** |
| `yo tokyo` | **unknown** (not a local phrase) | Grok, else shrug “Try Tokyo.” |

`fromUnknown` (`runCommand.ts` 37–74) maps Grok `VoiceAction` → `CommandAction`. Desk ignores `raw.system` (VoiceAction has no `system`; uses `raw.id` / `raw.kind` === `"permit"` else kept). `keptOpen` takes `raw.id ?? raw.q`. Unmapped types become unknown.

### Two layer-on blocks (duplicate)

**Block A** — `commands.ts` 127–136, after civic `open` / detection:

```
layerOn = /\b(on|enable|show|turn on|light up)\b/i
layerOff = /\b(off|disable|hide|turn off)\b/i
if (layerOn || layerOff) {
  legislatures? | \bleg\b | kept harvest   AND NOT \bdesk\b  → layer legislatures
  permits? | \bahj\b | permit harbor                         → layer permits
}
```

**Block B** — `commands.ts` 151–157, after scenes/styles, same on/off words, loop `LAYERS` (includes the same two civic rows, **no desk guard**).

| Phrase | Block A | Block B |
| --- | --- | --- |
| `show legislatures` · `hide permits` · `show ahj` | **returns here** | never reached |
| `show flights` · `hide satellites` | no civic noun → fall through | **returns here** |
| `show legislature desk` | **skipped** (`\bdesk\b`) | **`layer` legislatures** (`legislatures?` matches, no guard) |
| `show kept desk` | no (`kept harvest` only; `kept desks?` was dropped) | no → unknown |
| `put on legislatures` | **`layer` on** because `\bon\b` matches **`put on`** | would too |

Block A is Block B’s civic rows plus a desk-guard that the generic loop immediately undoes for `show legislature desk`. Dead duplicate for every LEG/AHJ phrase that does **not** contain `desk`.

`matchKeptDesk` (`desks.ts` 93–107): iso2 exact → name or **capitalName** exact → unique substring (name, or capital if q length ≥ 4). Kits on disk + capital points: JP capital **Tokyo**, CA capital **Ottawa**, CA name **Canada**. `keptDesks()` caps at 33.

---

## Collisions (flagged)

### 1. `open tokyo` vs `open canada`

Same matcher (`commands.ts` 117–121): `^open\s+(.+)$` → `matchKeptDesk`. Capitals and countries are one bucket.

| Utterance | Operator intent (P0 / KIT-05) | Live parse | Live apply |
| --- | --- | --- | --- |
| `open tokyo` | **flyTo city** (hint `yo tokyo`; bare `tokyo` is still flyTo) | `keptOpen` `jp` | JP drawer + LEG on + camera to Tokyo 1.2Mm |
| `fly to tokyo` · `show me tokyo` · bare `tokyo` | flyTo | `flyTo` | `lookupPlace("tokyo")` — **correct** |
| `open canada` | **Kept desk for CA** | `keptOpen` `ca` | CA drawer + LEG on + camera to **Ottawa** — **correct civic** |
| `open ottawa` | city (same class as tokyo) | `keptOpen` `ca` | stolen, same as tokyo |
| `open paris` · `open seoul` · `open cairo` · `open berlin` | city | `keptOpen` if that kit is on disk | stolen |
| `open japan` · `open korea` · `open kr` | country desk | `keptOpen` | intended |

`open` is also a flyTo prefix at #15. keptOpen is **earlier**, so any capital that `matchKeptDesk` accepts never geocodes as a place. Desk apply still flies to the capital, so the globe “works” while the drawer + LEG rail steal the P0 city phrase.

Surgical: on the **`^open {q}$` arm only**, match **iso2 or country `name`**, never `capitalName`. Leave capital matching on `score the sitting in` and `take me to the chamber in`. Then `open tokyo` falls through to flyTo; `open canada` stays keptOpen.

### 2. `show legislatures` vs `open legislature desk`

Verbs are the split. Live parse already honors it **if** the desk matcher stays before layers and flyTo.

| | `show legislatures` | `open legislature desk` |
| --- | --- | --- |
| Verb | `show` = layer on-word | `open` = not a layer on-word |
| Parse | `#11` `{ type: "layer", id: "legislatures", on: true }` | `#6` `{ type: "desk", on: true, system: "kept" }` |
| Apply | LEG rail only | empty Kept drawer, LEG rail unchanged |
| Must not | open DeskDrawer | toggle the layer / flyTo `"legislature desk"` |

Siblings:

- `show legislature desk` — **collision leftover**: A skips (`desk`), B still emits layer. Either bind it as layer **in one place** (drop the guard) or as desk/unknown **in one place** (guard the `LAYERS` row too). Do not leave both.
- `open legislatures` (no `desk`) — flyTo `"legislatures"` today. Do not teach it.
- `show kept harvest` — layer. `open kept desk` — desk. `show kept desks` — **unknown** (`kept desks?` is no longer in the regex).
- Permit twin: `open building desk` is empty permit desk (anchored `$`, so `open building desk miami` is **not** empty desk). That remainder is denylisted from keptOpen, then **flyTo** `"building desk miami"`. Intended search is `building desk miami` (**no** `open`). Flag: `open building desk {place}` ≠ `building desk {place}`.

### 3. `find AHJ` vs layer AHJ

| Phrase | Parse | Not |
| --- | --- | --- |
| `show ahj` · `show permits` · `enable permit harbor` | `layer` `permits` on | search / drawer |
| `hide ahj` · `hide permits` | layer off | — |
| `find AHJ in {place}` | `permitSearch` | layer (`find` is not an on-word — **safe from both layer blocks**) |
| `find AHJ` (no `in`) | unknown | do not add as layer |
| `open ahj desk` | empty permit `desk` | layer / flyTo |
| `open ahj` | flyTo `"ahj"` (no kept desk named ahj) | — |

Keep **`show` = layer**, **`find AHJ in` = search**. Do not add `ahj` to flyTo or keptOpen. Do not add `find` to layer on-words.

### 4. `put on` vs civic (and intel layers)

Radio #2 requires a **station token** and `play|put on|tune|radio|spin`. `put on creedence` returns `radio` `ccr` before any layer test. **P0 holds for Creedence.**

Layer on-words still include `\bon\b`. `put on` contains a word-bounded `on`. Any `put on {layer-noun}` that is **not** a station is civic/intel layer-on:

| Phrase | Today | Should be |
| --- | --- | --- |
| `put on creedence` · `put on ccr` · `put on swamp rock` | radio (station arm first) | radio |
| `put on legislatures` · `put on permits` · `put on ahj` | **layer on** (Block A) | unknown or radio-miss — **not** civic layer |
| `put on flights` · `put on fires` | **layer on** (Block B) | not a layer verb |
| `turn on legislatures` · `legislatures on` | layer on | layer on (intended) |

KIT-00 lock: layer on-words are `on|enable|show|turn on|light up` and **`put on` is radio, not civic**. The lock is violated by `\bon\b` matching inside `put on`.

Surgical: in **both** (or the surviving one) on-word tests, drop bare `on` after `put`:

```
/(?<!\bput )(?<!\bput on )\b(enable|show|turn on|light up)\b|\b(?<!put )on\b/i
```

Simpler equivalent: `\b(enable|show|turn on|light up)\b` **or** `(^|[\s])on\b` where the previous token is not `put`. Do **not** add `open` to that list.

### Other live steals (narrow)

- `show me fires` = scene; `show fires` = layer. Leave it; `show me` is a flyTo prefix **after** scenes.
- `go to green` matches style `green` via `to\b` before flyTo.
- Bare `iss` is `trackNearest`, not the flyTo shortcut that lists `iss`.
- Corpus on does not `setDesk(null)`; desk on does not `setCorpusOpen(false)`. Mutex hole in **apply**, not parse.
- `yo tokyo` is unknown locally. Hint lies; not a collision inside `parseCommand`.

---

## Deduplicate the two layer-on blocks

Do **not** keep A and B. One loop.

1. **Delete Block A** (`commands.ts` 127–136).
2. **Keep Block B** (generic `LAYERS` 151–157) as the only on/off layer matcher.
3. On the legislatures `LAYERS` row only, require `!/\bdesk\b/i` **if** the chosen product is “phrases with `desk` are never LEG layer.” If the chosen product is “`show legislature desk` stays layer,” **drop the desk-guard entirely** — desk open already returned at #6 (`open … desk` / `hide desk`). The guard does not protect `open legislature desk`; it only forks `show legislature desk` between A and B.
4. Fix `\bon\b` vs `put on` in that single test (collision 4).
5. Do **not** add `/desks?/` back onto the legislatures row (`show kept desks` must not become a drawer, and must not fight `hide desk`).

After the cut, civic show/hide still work: `show legislatures` / `show ahj` hit the same `LAYERS` rows they already hit in B. Scenes stay **before** the loop so `show me fires` / `show me space` remain scenes.

---

## Surgical parser order (propose — do not patch this sitting)

Reorder **nothing** above radio. Insertions already on disk stay; only collapse the duplicate and stop `open {capital}` from beating flyTo.

```
1  empty → unknown
2  reset
3  radio          pause/next/prev / put on|play|tune|radio|spin + station / ccr / open radio
4  next · cockpit · hud
5  corpus         hide/close before show/open
6  desk           close/hide desk · open (legislature|kept) desk · ^(open )?(building|permit|ahj) desk$
7  permitSearch   ^find ahj in {place}$ · ^building desk {place}$
8  kept civic     score the sitting in · take me to the chamber in · compare · {kind} permit playbook
9  detection
10 layers ONCE    on-words: enable|show|turn on|light up|(?<!put )on
                  off-words: off|disable|hide|turn off
                  loop LAYERS (LEG/AHJ rows live here; no second civic block)
11 scenes · styles
12 count · trackNearest
13 open {iso2|country name} → keptOpen     ← NOT capitalName
14 flyTo prefixes   take me to|fly to|go to|show me|open|jump to|navigate to
15 coords · bare P0 cities (tokyo, austin, …)
16 unknown → Grok fromUnknown
```

What this order changes vs disk:

| Move | Why |
| --- | --- |
| Drop Block A; keep one `LAYERS` loop at step 10 | collision 2 leftover + duplicate |
| Detection before layers (already almost there) | `show detections` already returned; no steal |
| `open {q}` keptOpen **after** layers, **before** flyTo, **country/iso2 only** | `open canada` desk; `open tokyo` flyTo |
| Radio unmoved | P0 Creedence |
| Desk unmoved (after corpus, before find AHJ, before layers, before flyTo) | `open legislature desk` ≠ `show legislatures` |
| `find AHJ in` unmoved (before layers and flyTo) | `find` never hits `\bahj\b` layer |

Do **not**: add `open` to layer on-words; bind `show legislatures` to desk; let `matchKeptDesk` capitals ride the generic `open` arm; steal `put on`; parse Rest; touch `globeEngine.ts`.

---

## I — Inference

The bar is four products sharing one first-match regex: **radio**, **intel layers**, **HUD chrome** (corpus/desk), **place** (flyTo vs country desk). Collisions are not missing phrases; they are the same token (`open`, `on`, `ahj`, `desk`) claimed twice.

`open` is the dangerous verb. It already means radio, corpus, empty desk, country desk, and flyTo. The country arm used `matchKeptDesk`’s capital names, so every P0 capital-as-city (`tokyo`, and the same class: `ottawa`, `seoul`, `paris`) became KIT-05. `canada` is the intended form of that arm; `tokyo` is not.

`show` vs `open` for legislatures is already correct on the happy path. The duplicate layer-on blocks are the only reason `show legislature desk` is a different parse than the early guard claims. One loop ends that.

`put on creedence` is safe only because the station loop is first. The civic/intel layer tests still treat `put on` as `on`. That is a latent P0: a future station rename, or `put on` + a layer noun, flips radio into a rail toggle.

---

## A — Action

Coordinator, later `src/` sitting (not this file):

1. **Delete** the early LEG/AHJ block (`commands.ts` 127–136). Keep one `LAYERS` on/off loop. Decide the `desk` guard once.
2. **Narrow** `^open {q}$` keptOpen to iso2 + country `name`. Capitals stay flyTo unless the phrase is `score the sitting in` / `take me to the chamber in`.
3. **Stop** `\bon\b` from matching `put on` in the surviving layer on-word test.
4. **Do not rebind** `show legislatures` / `show ahj` / `put on creedence` / `open radio` / `open corpus`.
5. Optional apply hygiene (same sitting if touching `runCommand.ts`): opening desk closes corpus; opening corpus closes desk; `fromUnknown` desk reads a real system field.

Acceptance when implemented:

| # | Phrase | Must remain / become |
| --- | --- | --- |
| 1 | `put on creedence` | radio `ccr` |
| 2 | `show legislatures` | layer legislatures on — not desk |
| 3 | `open legislature desk` | desk kept — not layer, not flyTo |
| 4 | `show ahj` / `hide permits` | layer permits |
| 5 | `find AHJ in miami` | permitSearch — not layer |
| 6 | `open canada` | keptOpen `ca` |
| 7 | `open tokyo` · `fly to tokyo` · bare `tokyo` | **flyTo**, not JP desk |
| 8 | `put on legislatures` | not layer on |

**Stop.** No `src/` from this seat.
