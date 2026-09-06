# 18 — Civic commands (KIT-05 prep)

Seat: 18 · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: **this file only**. No `src/` edits. Do not implement KIT-02+. Do not start KIT-05.

Sources: `src/lib/intel/commands.ts`, `src/lib/intel/runCommand.ts`, `src/lib/intel/types.ts`, `src/lib/intel/store.ts`, Handoffs `gevradio-unification/KIT-05-command-grammar.md`, `KIT-02-desk-drawer.md`, `KIT-01-layer-registry.md`, `KIT-03-kept-desks.md`, `KIT-04-permit-search.md`, `GROK_BUILD_HANDOFF.md` §2 UX grammar.

---

## E — Evidence

### Parser order today (`parseCommand`)

Local regex first. Footer form → `runCommand` → `parseCommand`. Unknown may hit Grok `interpretCommand` only if a key exists. Civic layers are **not** a new bar.

Order that matters for civic strings (do not reorder as a drive-by):

1. Reset / radio (includes `put on` + station, `open radio`) / next / cockpit / HUD
2. **Corpus panel** (`{ type: "corpus"; on }`) — live
3. Detection
4. **Early LEG/AHJ** — if an on-word or off-word is present, then legislature nouns or permit nouns → `{ type: "layer"; id; on }`
5. Scenes / styles
6. Generic `LAYERS` loop (LEG/AHJ rows exist here too; early branch already ate them)
7. Counts / track nearest
8. **FlyTo** `^(?:take me to|fly to|go to|show me|open|jump to|navigate to)\s+(.+)$`
9. Coords / bare places / `{ type: "unknown" }`

Layer on-words (KIT-01 lock): `on|enable|show|turn on|light up`.  
Layer off-words: `off|disable|hide|turn off`.  
**`open` is not a layer on-word.** `put on` is radio, not civic.

`CommandAction` today has `layer` + `corpus`. It does **not** have `{ type: "desk"; system: "kept" | "permit"; q: string }` (handoff §2; KIT-02). Store has `corpusOpen`, not `desk`. No `src/components/desks/`.

Comms tagged-action allowlist still hardcodes the seven intel layer ids. Command bar does not go through that list.

### Already live — LEG / AHJ / corpus

| Phrase (and obvious synonyms) | Action today | Apply |
| --- | --- | --- |
| `show legislatures` · `show legislature` · `show leg` · `enable/turn on/light up` + those nouns | `{ type: "layer", id: "legislatures", on: true }` | Rail + store. Flash “Legislatures on”. **No pins. No drawer.** |
| `hide legislatures` · `hide legislature` · `hide leg` · `disable/turn off/off` + those nouns | layer LEG off | Flash “Legislatures off” |
| `show kept desk(s)` · `show kept harvest` (and hide/off forms) | layer LEG — noun `kept desks?` / `kept harvest` is already in the live regex | Same as LEG toggle. **Steals “desk” under `show`.** |
| `show permits` · `show permit` · `show ahj` · `show permit harbor` (+ enable/on/turn on/light up) | `{ type: "layer", id: "permits", on: true }` | Rail + store. Flash “Permits on”. **No AHJ pins.** |
| `hide permits` · `hide permit` · `hide ahj` · `hide permit harbor` (+ disable/off) | layer AHJ off | Flash “Permits off” |
| `show corpus` · `open corpus` · `corpus on` · `intel corpus` · bare `corpus` | `{ type: "corpus", on: true }` | `setCorpusOpen(true)`. Closes comms + radio picker. **Not DeskDrawer.** |
| `hide corpus` · `close corpus` · `corpus off` | corpus off | Panel closed |

`show legislatures` never reaches flyTo because `\bshow\b` gates the early layer branch. That is intentional (seat 12). KIT-03 later reuses the **same** phrase to light country markers; it does not become a desk-open.

### KIT-02 desk (next implement — empty drawer only)

KIT-02: one `DeskDrawer`, globe mounted, Esc closes, store `{ desk: null | { system: "kept" | "permit"; id: string } }`. Header labels **Legislature** / **Building desk**. Done when a debug control **or command** can open/close an empty Kept drawer and an empty Permit drawer.

Reserved phrases (not live). Must parse **before** flyTo `open …`. Must **not** use `show`/`hide` (those are layers).

| Phrase | Intended action | Must not become |
| --- | --- | --- |
| `open legislature desk` · `open kept desk` | `{ type: "desk", system: "kept", q: "" }` empty Kept drawer | flyTo `"legislature desk"` (what happens **today**) |
| `close legislature desk` · `close kept desk` | desk null | corpus / layer |
| `open building desk` (no place) | `{ type: "desk", system: "permit", q: "" }` empty Permit drawer | flyTo `"building desk"` (today) · KIT-04 search |
| `close building desk` | desk null | — |

KIT-02 must **not** bind `open korea`, `find AHJ in …`, or `building desk {place}`. Those need KIT-03/04 data. Empty drawer ≠ country desk ≠ AHJ search.

### KIT-05 later (depends KIT-03 + KIT-04)

Handoff `KIT-05-command-grammar.md` “add” list vs this tree:

| KIT-05 phrase | Today | Owner when kits run |
| --- | --- | --- |
| `show legislatures` / `hide legislatures` | **Already live** (KIT-01) | Keep as **layer**. Do not rebind to desk. KIT-03: same phrase lights ≤~200 country contacts. |
| `show permits` / `hide permits` | **Already live** (KIT-01) | Keep as **layer**. KIT-06 owns pins. |
| `open {country or capital}` e.g. `open korea` | flyTo place (`open korea` → `q: "korea"`) | KIT-05: open Kept desk for that pack + fly. Needs KIT-03. **Do not steal in KIT-02.** |
| `score the sitting in {country}` | unknown (Grok shrug unless keyed) | KIT-05 local parse. Honesty / sourced pledges. Not a score invention. |
| `compare {country} and {country}` | unknown | KIT-05 opens compare **shell**; data fill is KIT-07. |
| `find AHJ in {place}` e.g. `find AHJ in fort pierce` | unknown (no on/off word, so not a layer) | KIT-04 search + KIT-05 parse. Core/Extra/More only. |
| `building desk {place}` e.g. `building desk miami-dade` | unknown | KIT-04/05 permit desk. Distinct from bare `open building desk` (KIT-02 empty). |
| `{project} permit playbook` e.g. `roof permit playbook` | unknown | KIT-05 + `playbooks.ts`. |
| `take me to the chamber in {place}` | flyTo remainder (`q: "the chamber in brasilia"`) | KIT-05 must intercept **before** generic `take me to`. |

Rules from KIT-05 (still bind later): local parser first; unknown civic → existing unknown, not a crash; do not steal radio (`put on`, station names); do not steal styles (`nvg`, `flir`). Done when ≥5 civic phrases execute **and** intel/radio still execute. Two of those five (`show/hide legislatures`, `show/hide permits`) are already satisfied.

### Collision — `show legislatures` vs `open legislature desk`

This is the load-bearing split. Verbs are different on purpose.

| | `show legislatures` | `open legislature desk` |
| --- | --- | --- |
| Verb class | `show` = **layer on-word** | `open` = **not** a layer on-word. Today a **flyTo** verb. Also corpus (`open corpus`) and radio (`open radio`) earlier in the parser. |
| Live parse | `{ type: "layer", id: "legislatures", on: true }` | `{ type: "flyTo", q: "legislature desk" }` — geocodes a nonsense place |
| Live apply | LEG rail/store only. Zero entities. | `engine.lookupPlace("legislature desk")` |
| KIT-02 | **Leave it.** Opening the empty drawer with `show` would hide the layer toggle. | **Reserve this.** Match `open (the )?(legislature\|kept) desk` **before** generic `open …`. Empty Kept drawer, globe mounted. |
| KIT-03 | Same phrase **lights country markers**. Click marker → drawer. Command stays a layer. | Still the empty/Atlas drawer opener, not `open korea`. |
| KIT-05 | Already done. Listing it again in the kit file is a synonym reminder, not a rebind. | Must **not** treat `legislature desk` as `{country or capital}`. Require the `desk` token. `open korea` is the country form. |

Sibling collisions to keep in the same rule:

- `show kept desks` is **already** LEG layer. KIT-02 drawer uses `open kept desk`, never `show kept desks`.
- `open legislatures` (no `desk`) is flyTo `"legislatures"` today. Do not use it. Layer = `show`; drawer = `open legislature desk`; country = `open korea`.
- `open korea` must remain flyTo until KIT-05. KIT-02 must not swallow every `open {word}`.
- `open corpus` / `open radio` stay earlier than desk and flyTo.
- `find AHJ in …` is safe from the layer branch (no on/off word). `show ahj` is the layer.
- `take me to the chamber in …` will steal from generic flyTo if KIT-05 is sloppy; match `chamber` first.

Parser insert order when KIT-02 / KIT-05 actually run (prep only — do not code now):

```
radio / corpus          (live — do not move)
layer show|hide LEG/AHJ (live — do not move)
open|close legislature desk | kept desk     → desk kept   (KIT-02)
open|close building desk $                  → desk permit (KIT-02, no place)
building desk {place}                       → permit q    (KIT-04/05)
find AHJ in {place}                         → permit q    (KIT-04/05)
score the sitting in {country}              → KIT-05
compare {a} and {b}                         → KIT-05/07
{project} permit playbook                   → KIT-05
take me to the chamber in {place}           → KIT-05 (before generic take me to)
open {atlas country|capital}                → desk kept + fly (KIT-05)
generic open|show me|take me to|fly to …    → flyTo (live)
```

---

## I — Inference

Civic grammar is already two products sharing one bar: **layers** (`show`/`hide`) and **places** (`open`/`take me to`). Corpus is a third, already fenced (`open corpus` ≠ LEG). KIT-02 is a fourth: **empty drawer chrome**, which only stays safe if it takes the long `open … desk` form and leaves `show legislatures` / `open korea` alone.

KIT-05’s paste list duplicates KIT-01’s live show/hide pairs. Implementing those again as desk-open would break the layer rail and KIT-03’s “`show legislatures` lights country markers.” The real KIT-05 work is the placeful phrases (`open korea`, `find AHJ in …`, chamber, score, compare, playbook) after adapters exist.

Today’s bug-shaped leftover is `open legislature desk` → flyTo. That is the KIT-02 command hole, not a KIT-05 hole.

---

## A — Action

Prep only. Next writers:

1. **KIT-02 (seats 07–10 / 31):** add `{ type: "desk" }` + phrases `open/close legislature desk` and `open/close building desk` (no place). Parse them before flyTo. Do **not** bind `show legislatures`, `show permits`, `open korea`, `open corpus`, or `/desks?/` as a layer synonym.
2. **KIT-05 (later, after KIT-03/04):** keep live show/hide as layers. Add the placeful list. Special-case `open {country}` after the `… desk` matchers. Intercept `take me to the chamber in` before generic flyTo. Unknown civic still shrugs.
3. **Do not** this sitting: edit `commands.ts`, extend `CommandAction`, create `DeskDrawer`, enable LEG/AHJ drawing, import Rest.

**Stop.**
