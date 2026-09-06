# H05 — Drawer surfaces (`DeskDrawer` modes)

Seat: **H05** · band: Harden · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: **`docs/harden/05-drawer.md` only.** No `src/` edit. No Playwright.

Claim: **one panel, seven live modes.** The shell is KIT-02 chrome (right 22rem / 390px sheet / `z-20`). The body is no longer “No desk selected.” It is a prefix router on `desk.id`. Four bugs are on disk and named once: **dead ends**, **missing Esc / no back stack**, **390px overflow**, **duplicate `PermitHits`**.

Do not treat CorpusPanel, the `L` layer rail, or a keptglobal iframe as this drawer.

---

## 0. Shared chrome (every mode)

File: `src/components/desks/DeskDrawer.tsx`. Mount: `OverlayHud.tsx` sibling of Comms / Radio / Corpus. Store: `desk: null | { system: "kept" | "permit"; id: string }`. Visibility is `desk !== null`.

| Slot | Disk |
| --- | --- |
| Box | `panel desk-drawer absolute inset-x-3 top-28 bottom-28 z-20 flex min-h-0 flex-col overflow-hidden p-3 sm:top-16 md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]` |
| Header | kicker **Legislature** / **Building desk**; subtitle `keptDeskByIso(id)?.name` else **Globe stays up**; `X` → `setDesk(null)` |
| Body | `min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1` |
| Footer | `shrink-0` honesty. Kept: “Delayed register… Not an influence score.” Permit: `DISCLAIMER` (`src/lib/permit/types.ts`) |
| Dialog | `role="dialog"` `aria-label={title}`. No `aria-modal`. No focus trap. No auto-focus. No keydown in this file. |

Router (L317–327):

```
kept + id.startsWith("compare:") → CompareShell
kept + id nonempty               → KeptBody (iso roster)
kept + id === ""                 → KeptAtlas (empty / A–Z)
permit                           → PermitBody(id)
```

`PermitBody` (L193–210):

```
id.startsWith("search:")    → PermitHits
id.startsWith("playbook:")  → playbook chrome + nested PermitHome
getSearchablePlace(id)      → PermitCard
else                        → PermitHome   (empty id, unknown id)
```

Entry (not this file; surfaces consume these ids):

| Phrase / action | Store |
| --- | --- |
| `open legislature desk` / `open kept desk` | `{ system: "kept", id: "" }` |
| `open building desk` / `open permit desk` | `{ system: "permit", id: "" }` |
| `close desk` | `null` |
| `open {kit}` / `score the sitting in` / `take me to the chamber in` / pin **Open desk** | `{ system: "kept", id: iso2 }` |
| `compare {a} and {b}` | `{ system: "kept", id: "compare:{a}:{b}" }` |
| `find AHJ in {q}` / `building desk {q}` (0 or N hits) | `{ system: "permit", id: "search:{q}" }` |
| same, exact or unique hit | `{ system: "permit", id: place.id }` → card |
| `{kind} permit playbook` | `{ system: "permit", id: "playbook:{kind}" }` |

Globe stays mounted. Footer command bar stays mounted (`!chatOpen` only). `setDesk` mutexes `corpusOpen`. G / R **keys** also `setDesk(null)`. Header Radio / Comms / Layers **buttons** do not.

---

## 1. Mode inventory (seven)

| # | Mode | `system` | `id` | Body | Enter |
| --- | ---: | --- | --- | --- | --- |
| 1 | **Kept empty / A–Z** | `kept` | `""` | `KeptAtlas` | empty kept desk command |
| 2 | **Kept iso roster** | `kept` | ISO2 (`us`, `ca`, …) | `KeptBody` | atlas row, `keptOpen`, LEG pin **Open desk**, compare jump |
| 3 | **Compare shell** | `kept` | `compare:{a}:{b}` | `CompareShell` | `compare canada and japan` |
| 4 | **Permit home** | `permit` | `""` or unknown | `PermitHome` | empty building desk; unknown place id |
| 5 | **`search:`** | `permit` | `search:{q}` | `PermitHits` only | `find AHJ in` / `building desk` with 0 or many hits |
| 6 | **`playbook:`** | `permit` | `playbook:{kind}` | label + summary + **nested `PermitHome`** | `{kind} permit playbook` |
| 7 | **Place card** | `permit` | Core/Extra/More place id | `PermitCard` | unique/exact search, typeahead click, `openPermit` |

Prefixes win: `compare:` is not an ISO; `search:` / `playbook:` are not place ids.

Subtitle hole (all non-iso-kept modes): header stays **Globe stays up**. Permit place name, playbook label, compare pair, and search query never reach the kicker row.

---

## 2. Modes (expand; bugs pointed, not re-invented)

### 2.1 Kept empty / A–Z — `KeptAtlas`

Body: “No desk selected.” then **Kits on disk** (A–Z `localeCompare`, `keptDesks()` cap 33) then **Listed without a kit** (`keptAtlasHoles()`, atlas `kit_on_disk: false`).

Kit row: `min-h-9` full-width button → turn LEG on if off, `setDesk({ kept, iso2 })`, `flyTo(lon, lat, 1_200_000)`. Hole row: name only, **not a button**.

Bugs here: **dead end** = 163 hole names with no action and no “why empty” beyond the kicker. **390px** = 33 × 36px + 163 muted lines in one scroller, plus `min-h-9` under the 44px touch floor. Esc/back does not return here from a roster (see §3.2). No `PermitHits`.

### 2.2 Kept iso roster — `KeptBody`

`keptDeskByIso` miss → one line, “Listed without a kit on disk.” Hit → chamber name, `{named} of {seats}`, optional `sourceUrl`, pledge honesty, `loadKeptRoster` (lazy `members.json`). Empty sitting = hole string. Fat US roster is hundreds of `<li>` (package count **437**), each a name or outbound `roster_url`.

Bugs here: **dead end** on unknown ISO (command can still set `id`; atlas holes cannot, but `keptOpen` with a non-kit token can). **390px** = unvirtualized roster + outbound links with no `truncate` on the name line. No Back to A–Z. Esc closes the desk, not the roster.

### 2.3 Compare shell — `CompareShell`

`spec.split(":")` → `parts[1]`, `parts[2]`. Title is `{a.name} · {b.name}` or the raw ISO. Copy: “Streams/compare is not filled yet. Co-occurrence is not a quid. Not an influence score.” Two `min-h-11` buttons: **Open {name}** → `{ kept, iso2 }` (leaves compare). Missing ISO → no button.

Bugs here: **dead end** is the product. KIT-07 was two desks *inside* the drawer (`docs/dev-team/22-streams.md`); this shell is a label plus two exits. **Missing Esc** = no return to compare after Open, no return to A–Z. Empty `compare::` renders two empty slots and nothing to tap.

### 2.4 Permit home — `PermitHome`

Local `q` input (`min-h-11`, “Find AHJ…”). Always mounts **`PermitHits query={q}`**. Separately calls `searchAhj(q)` for empty-state copy. `q === ""` → `searchAhj` returns **12** `FEATURED_AHJ_IDS` (not an empty list). Featured honesty: “Featured core metros. Extra/More searchable. Rest is a count, not in this list.” Zero typed hits: “No Core/Extra/More hit.”

Bugs here: **duplicate `PermitHits`** (component + second `searchAhj`). Empty query is not empty — 12 × `min-h-11` featured rows. **390px** = input + 12 hits + honesty + `DISCLAIMER` footer. Click is one-way to the card (`openPermit`). Esc from the input closes the **desk** (window handler runs before the typing skip), not the query.

### 2.5 `search:` — `PermitHits` only

`id.slice(7)` is the frozen command string. **No input.** Count line “{n} AHJ hits · Rest not searched.” Up to **40** `min-h-11` rows (`searchAhj` `.slice(0, 40)`): name, state, chip, kind, `ahjName`. Click → `openPermit` (store id = place id, `lookupPlace`).

Bugs here: **dead end** if `n === 0` (command flash still opened the drawer; no refine, no home). **Dead end** if `n > 0` after click (query discarded). **Duplicate `PermitHits`** is this component, reused by home and playbook. **Missing Esc** = no step back to home with the query in the input. **390px** = 40 × 44px + two-line labels; name span is not `truncate`; chip is inline.

### 2.6 `playbook:` — label + nested home

`getPlaybook(id.slice(9))`. Unknown kind → “Playbook” / “Unknown work kind.” Known → `{label}` + `{summary}` only (no steps, inspections, documents). Copy: “Pick an AHJ to attach this playbook. Rest is not searched.” Then **`<PermitHome />`** (input + `PermitHits` + featured).

Bugs here: **dead end** — `openPermit` writes `{ permit, place.id }` and **drops** `playbook:{kind}`. Place card’s `<select>` is local `useState("")`, so the playbook is not attached. **Duplicate `PermitHits`** via nested home. **390px** = playbook header + home input + featured/hits + drawer `DISCLAIMER` (stacked chrome). Unknown kind is a labeled brick with the same home nest.

### 2.7 Place card — `PermitCard`

`getSearchablePlace` only (Core/Extra/More; Rest never). Name + chip, AHJ/kind, portal (`portal not verified`), department URL, optional state pack (`commonPermits` first 8), playbook `<select>` + **summary only**.

Bugs here: playbook picker does not write the store; choosing a kind is a dead summary. No Back to home / `search:` / `playbook:`. Header subtitle still **Globe stays up** (iso-only `selected`). `h2` has no `truncate`; URLs wrap or overflow at 390px. Esc closes the desk.

`openPermit` (L89–93) is the one-way valve used by home, search, and playbook.

---

## 3. Bugs (named once, then mapped)

### 3.1 Dead ends

A surface that cannot complete the job it names, and cannot go up one level without destroying `desk`.

| Dead end | Why | Exit today |
| --- | --- | --- |
| Compare shell | Honesty says streams not filled. Open A / Open B is a leave, not a compare. | X / Esc / Open {desk} |
| `playbook:` “attach” | Clicking an AHJ overwrites `id`; card select starts empty | X / Esc / accidently a card |
| `search:` with 0 hits | Frozen query, no input, no home | X / Esc / new command |
| `search:` after a click | Query gone; card has no Back | X / Esc |
| Kept unknown ISO | “Listed without a kit on disk.” | X / Esc |
| Atlas holes (163) | Names only | none (not controls) |
| Place-card playbook | `book.summary` only; no steps | change select / X |
| Header subtitle | Permit / compare / search / playbook never named in the kicker | none |

Not dead ends: empty kept A–Z (kits are buttons), permit home with featured 12 (hits are buttons), unique `find AHJ in miami` (opens the card). Those still inherit **no Back**.

### 3.2 Missing Esc / no back stack

OverlayHud **does** close the desk on Escape (`OverlayHud.tsx` L113–127): comms → radio picker → **first-run** → **desk** → corpus → cockpit → track → L-rail. `DeskDrawer` correctly adds **no** second `window` listener (KIT-02 contract).

What is missing is **mode Esc**, not **desk Esc**:

1. **One stack slot.** `Escape` is always `setDesk(null)`. It never steps `place → search|home`, `roster → atlas`, `compare → atlas`, `playbook → home`. There is no Back control in any of the seven bodies. `X` is the same nuke.
2. **first-run eats the first Esc** while `firstRun` is true (`if (firstRun) dismissFirstRun; else if (desk) setDesk(null)`). Footer is still up during first-run, so a desk can open underneath. First Esc dismisses the cards, not the desk.
3. **`<select>` is not in the typing set** (`INPUT` / `TEXTAREA` only). Esc while the playbook dropdown is open still hits the window handler and can close the **desk** instead of cancelling the native list.
4. **Input Esc is desk-close**, not clear-query. Permit home is the only in-drawer field; Esc does not blur → clear → close.
5. **No dialog cancel semantics.** `role="dialog"` without `aria-modal`, without focus move, without Esc on the aside. Close is a window global. Screen-reader “escape the dialog” is the same as “destroy the desk.”

Mutex (surface, not a second Esc bug): G / R **keys** close the desk; header Radio / Comms / Layers **buttons** do not (`OverlayHud.tsx` L300–366). Layer rail is gated `!chatOpen && !radioOpen && !corpusOpen` — **not** `!desk`. Two `z-20` panels can paint together. That is how Esc/mutex holes show up on the sheet, not a separate product.

### 3.3 390px overflow

390px is below `sm` / `md`. All `sm:` / `md:` branches off. The drawer copies **CorpusPanel** (`top-28 bottom-28 z-20`, inner scroll). Seat 28 already measured the stacked command footer at ~**140px** from the bottom vs `bottom-28` = **112px**. Last ~**28px** of the aside sits **under** the `z-30` bar. Paint/hit-test of the **bar** still wins. Paint of the **drawer footer** loses.

DeskDrawer makes that overlap load-bearing: honesty / `DISCLAIMER` is `footer.shrink-0` at the bottom of the aside. `DISCLAIMER` is two wrapped sentences at ~330px inner width → footer grows, overlap grows, body shrinks.

Inner scroller (`min-h-0` + `overflow-y-auto` + aside `overflow-hidden`) **does** stop the body from growing the sheet. It does **not** fix:

| Overflow | Mode | Disk |
| --- | --- | --- |
| Footer under command bar | all | `bottom-28` vs stacked footer ~140px |
| Not a bottom sheet | all | `top-28`…`bottom-28` covers most of a 390×844 globe (seat 01 wanted `top-auto` + `max-h-[min(50vh,24rem)]`; not on disk) |
| 33 × `min-h-9` + 163 holes | A–Z | one list |
| Fat roster (US **437** names) | iso roster | no windowing, name line not truncated |
| 12 featured × `min-h-11` | permit home, playbook nest | empty query is 12 rows |
| 40 × `min-h-11` two-line rows | `search:`, home, playbook | `searchAhj` cap 40 |
| Stacked chrome | playbook | playbook header + `PermitHome` + `PermitHits` + drawer header + `DISCLAIMER` |
| Horizontal | card, hits | `h2` / name span without `truncate`; chip inline; portal URL; state-pack join |

Do not copy RadioDeck (no `bottom-*`) or Comms (`bottom-24` + hidden footer). Do not raise the sheet to `z-30`. Horizontal trap = `overflow-x` on the aside or dropping `inset-x-3`; neither is on the class string today — the risk is **child** width (chips, URLs), not the box.

### 3.4 Duplicate `PermitHits`

One component, three mounts, two searches.

```
PermitHits({ query })           // L95 — searchAhj + list
PermitHome                      // L186 — always <PermitHits query={q} />
                                // L176 — ALSO const hits = searchAhj(q)  (empty-state only)
PermitBody search:              // L194 — <PermitHits query={id.slice(7)} />
PermitBody playbook:            // L203 — <PermitHome /> → another PermitHits
```

Consequences (do not re-list as new bugs):

- **Double `searchAhj`** on every home keystroke (home + child).
- **Playbook = home = hits.** Featured 12 (or 40 matches) render under a playbook that cannot attach them.
- **`search:` is hits without home.** Same list, no input — the duplicate without the typeahead.
- Empty `q` is featured metros, so “duplicate hits” is visible on **first paint** of building desk, not only after typing.

Dedup later (not this seat): one search surface; `search:` should be home with `q` prefilled; `playbook:` should not nest home, or home must pass the playbook id into `openPermit`.

---

## 4. Bug × mode (do not expand twice)

| | Dead end | Missing Esc / Back | 390px overflow | Duplicate `PermitHits` |
| --- | --- | --- | --- | --- |
| Kept A–Z | hole list inert | no Back from roster/compare | 33 kits + 163 holes; `min-h-9` | — |
| Iso roster | unknown ISO one-liner | Esc nukes desk | fat `members.json` | — |
| Compare | shell not a compare | Open A/B is leave | two `min-h-11` + honesty | — |
| Permit home | click is one-way | Esc closes desk, not query | 12 featured × 44px + `DISCLAIMER` | **yes** (hits + second `searchAhj`) |
| `search:` | 0 hits / no refine | no home, no input | 40 × 44px | **yes** (this *is* `PermitHits`) |
| `playbook:` | attach drops `id` | no Back; select Esc | nested home + hits | **yes** (nested `PermitHome`) |
| Place card | playbook = summary only | no Back to query | `h2` / URLs; footer overlap | — (list unmounted) |

Shared across all seven: footer `DISCLAIMER`/honesty under the 390px command bar; header subtitle blind for non-iso-kept; Esc = `setDesk(null)` only.

---

## 5. What this is / is not

| Surface | Role | H05 |
| --- | --- | --- |
| `DeskDrawer.tsx` | one panel, seven modes | **this file** |
| OverlayHud Esc | desk-close, not mode-back | hole in §3.2 |
| CorpusPanel | archive index | not a desk mode |
| Layer rail (`L`) | Open sources | not DeskDrawer; not mutexed vs desk on the **button** |
| `search-lite.ts` | Core+Extra+More, featured 12, cap 40, **no Rest** | keep |
| `places-rest.ts` | 14925 count | **must stay out** of every mode |
| KIT-07 streams | two-desk compare **inside** the drawer | CompareShell is a placeholder, not that kit |

Do not: iframe keptglobal / hivepermitdev; add `/place/{id}` routes; import Rest to “fill” empty search; pad 163 atlas holes; print skill brands; treat this audit as a `src/` patch.

---

## E / I / A

**E — Evidence (this tree, source read only)**

- `DeskDrawer.tsx` L16–78 `KeptBody`; L80–87 `Chip`; L89–93 `openPermit` (store id = `place.id`, drops prefix); L95–121 `PermitHits`; L123–172 `PermitCard` (local playbook state, `book.summary` only); L174–191 `PermitHome` (`searchAhj` + always `<PermitHits />`); L193–211 `PermitBody` prefix router; L213–248 `CompareShell`; L250–285 `KeptAtlas` A–Z + inert holes; L287–336 shell geometry, header, footer.
- `runCommand.ts` L123–169: empty desk `id: ""`; `permitSearch` → place id or `search:{q}`; `keptOpen` iso; `keptCompare` → `compare:{a}:{b}`; `permitPlaybook` → `playbook:{kind}`.
- `commands.ts` L79–121: empty open/close; `find AHJ in`; `building desk {q}`; sitting/chamber/`open {kit}`; `compare X and Y`; `{kind} permit playbook`.
- `search-lite.ts`: `SEARCHABLE` = Core+Extra+More; `searchAhj("")` = 12 featured; typed cap 40; `permitChip` core=higher else mid; no `places-rest`.
- `playbooks.ts`: 14 `PLAYBOOKS`; `getPlaybook` Map lookup; playbook **body in the drawer is summary only**.
- `types.ts` `DISCLAIMER` long sentence (drawer footer, every permit mode).
- `OverlayHud.tsx` L109–128 Esc stack (first-run before desk); L131 typing skip INPUT/TEXTAREA only; L136–176 G/R keys close desk, L key closes desk; L300–366 header Radio/Comms/Layers **do not** `setDesk(null)`; L395 layer rail not gated on `!desk`; L520 tracked card **is** `!desk`; L629 footer `!chatOpen` only, `z-30`; L702 `<DeskDrawer />`.
- `store.ts` L154–155 `setDesk` clears `corpusOpen`; default `desk: null`.
- `desks.ts` `keptDesks()` slice 33; `keptAtlasHoles()` all `kit_on_disk: false`; `keptDeskByIso` null → KeptBody dead line.
- Geometry twins `CorpusPanel.tsx` L24–25 / L46. Seat 28: stacked footer ~140px vs `bottom-28` 112px. Seat 01: preferred `bottom-36` / `max-h-[min(50vh,24rem)]` / `top-auto` — **not** on the class string.
- KIT-07 contract (`docs/dev-team/22-streams.md`): compare is two desks inside the drawer, later. On disk: placeholder shell.

**I — Inference**

- Seven modes are one `id` string with prefixes, not seven routes. That is why Back cannot exist without a stack: overwriting `id` is the only navigation, and it is one-way (`openPermit`, Open {name}).
- Duplicate `PermitHits` is the permit-side navigation bug in component form: home, command-search, and playbook all dump the same list, so playbook cannot “attach” and `search:` cannot refine.
- Missing Esc is not “OverlayHud forgot the desk.” It is “desk has no inner stack, and first-run / `<select>` steal or over-close.” Fixing a second window listener would race the HUD (KIT-02 forbid). Fix is Back in-panel + Esc peels one mode, then `null`.
- 390px overflow is two layers: (1) inherited CorpusPanel overlap (honesty under the bar), worse here because `DISCLAIMER` wraps; (2) mode content (437 names, 40 × 44px, nested playbook+home+hits) that the inner scroller can clip but cannot make usable. A true bottom sheet (`top-auto` + max-height) is still absent; the sheet is a second column on a 390px globe.
- Dead ends cluster on the **prefix modes** (compare / search / playbook) that the empty-KIT-02 shell never had. A–Z kits and featured AHJs still work as pickers.

**A — Assumption**

- Coordinator patches `src/` in a later harden turn from this file. This seat does not. Operators will not treat CompareShell copy as KIT-07 done, or playbook summary as a full playbook, or featured 12 as Rest.
- `1rem = 16px` still holds; 390×844 is the stacked-chrome case. Landscape 390 remains “inner-scroll, do not cover the bar.”
- Rest stays a count. Dedup of `PermitHits` must not be “search Rest so the list is never empty.”
- first-run is usually dismissed before civic use; the Esc hole still exists because the footer is live underneath it.

---

## Tri-state

Claim: **DeskDrawer is one panel with seven modes; dead ends, missing mode-Esc, 390px overflow, and duplicate `PermitHits` are on disk.**

| State | Meaning |
| --- | --- |
| **PASS** | Modes exist, globe mounted, Rest not searched, command bar z-30, Esc closes the desk |
| HOLE | Inner Back/Esc, compare/playbook attach, 390px footer overlap, `PermitHits` reused three ways |
| BLOCK | Globe unmounted, Rest in the module graph, sheet `z ≥ 30`, command bar hidden |

**Verdict: PASS (honest-incomplete) on shell; HOLE on the four named bugs.**  
Not BLOCK: Cesium stays; `search-lite` does not import Rest; footer stays mounted; OverlayHud Esc still closes the desk.

Stop. Do not patch `DeskDrawer.tsx` from this seat.
