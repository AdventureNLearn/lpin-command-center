# SEAT H09 — DEDUPE

Seat: **H09 DEDUPE** · harden pass (15 seats, host) · class: public-suite · date: 2026-08-29  
Coordinator: Host Grok Build. Tree: `REPO_ROOT`  
**This file only.** Did not edit `src/`, `_out/`, `kits/`, or sibling harden seats. Coordinator writes `src/` after audits.

Claim: **four named twins are real. Two are surgical. One is dead code. One is parser grammar that must stay two-pass.** Rank is for the coordinator, not a license to refactor engines.

---

## Verdict

**AUDIT DONE.** Four hunts confirmed on disk. Rank below. No `src/` this seat.

| Hunt | Disk | Rank | Why |
| --- | --- | --- | --- |
| Layer on/off parsed twice (`commands.ts`) | **E** — identical on/off regexes at 127–128 and 151–152 | **Share the two regexes. Keep two-pass.** | Grammar, not waste. Folding the LEG/AHJ special-case into `LAYERS` would move civic toggles after scenes/styles and drop the `!/\bdesk\b/` guard unless it is copied. |
| `keptDesks()` rebuilt every call | **E** — no cache; `capMap()` + glob scan per call | **Surgical memo.** | Atlas / capitals / `meta.json` glob are eager static. ≤33 rows. Safe to build once. Do not merge globe vs flat pin loops. |
| OverlayHud G/R/L close lists | **E** — six copies; keyboard closes `desk`, toolbar buttons do not | **Surgical helper.** | List drift is a mutex bug, not style. Helper must preserve G/R = close-others *on open only*, L = always. Do not fold Esc into it. |
| `permit-pins.ts` dummy loop | **E** — `stateCounts()` dead; comment says dummy | **Delete the dead function.** | Never called. `permitMarks` uses `buildStateCounts()`. Do not wire pins. KIT-06 is later. |

---

## E / I / A

**E — Evidence (this tree, this sitting)**  
Line numbers from the four files as read. No tests assert these paths (`parseCommand` has no spec). `permitMarks` / `permitContact` have **zero importers** outside `permit-pins.ts` (engine not wired; harden README).

**I — Inference**  
Duplicates that already disagree (G/R/L button vs key) will keep drifting. A helper that is not used on every open path is not a helper.

**A — Assumption**  
Coordinator is the only later `src/` writer. KIT-06 may diverge the two featured-pin loops in `permitMarks`; do not “unify” them ahead of that kit. Parser order (radio → corpus → desk → LEG special-case → scenes → styles → `LAYERS` → flyTo) stays P0.

---

## 1. Layer on/off parsed twice — `src/lib/intel/commands.ts`

### E

On-words and off-words are the same string twice:

```
127–128   layerOn  = /\b(on|enable|show|turn on|light up)\b/i
          layerOff = /\b(off|disable|hide|turn off)\b/i
129–136   if (layerOn \|\| layerOff) {
            legislatures?|\bleg\b|kept harvest  AND  !/\bdesk\b/  → layer legislatures
            permits?|\bahj\b|permit harbor                         → layer permits
          }

138–149   SCENES, then STYLES

151–152   on  = /\b(on|enable|show|turn on|light up)\b/i   // same
          off = /\b(off|disable|hide|turn off)\b/i         // same
153–157   if (on \|\| off) { for (const l of LAYERS) … }
```

`LAYERS` rows 14–15 are the same civic regexes as the special-case, minus the desk guard:

```
14  { re: /legislatures?|\bleg\b|kept harvest/i, id: "legislatures" }
15  { re: /permits?|\bahj\b|permit harbor/i,     id: "permits" }
```

`kept desks?` is **already gone** from both (docs/dev-team still mention it; disk does not). Desk phrases return earlier (79–86). There is no `parseCommand` unit test.

### I

Two-pass is how `show legislatures` stays a **layer** while `open legislature desk` stays a **desk**, and how civic on/off wins *before* scenes/styles. The waste is the **copied regex**, not the second pass.

If coordinator naively deletes 127–136:

- `show legislatures` still works via `LAYERS` (after styles).
- `show legislature desk` today skips the special-case (`\bdesk\b`) then **still** becomes `{ type: "layer", id: "legislatures" }` via `LAYERS` (no desk guard on the row). Seat 10 called that conservative / leave-as-layer. Collapsing *and* adding `!/\bdesk\b/` to the `LAYERS` legislatures row would change that phrase to unknown/flyTo.

### A

Operators will not treat `show` as a drawer verb. Do not add `open` to on-words (would steal `open legislature desk` and collide with flyTo).

### Rank

**Surgical:** one `ON_RE` / `OFF_RE` (and reuse `LAYERS[legislatures].re` / `LAYERS[permits].re` in the special-case). Touch: `commands.ts` only.

**Leave-it:** two-pass order. Do not fold special-case into the generic loop unless a later seat adds parser tests *and* copies the desk guard onto the legislatures row *and* accepts civic toggles running after styles.

---

## 2. `keptDesks()` rebuilt every call — `src/lib/kept/desks.ts`

### E

```
47–53   capMap()        new Map from capitals.points every call
55–79   keptDesks()     atlas walk, kit_on_disk, capMap(), metaFor(iso2) per row, slice(0, 33)
25–31   metaFor()       Object.entries(metaGlob) linear scan per iso2
88–91   keptDeskByIso   keptDesks().find
93–107  matchKeptDesk   keptDesks() then three finds
```

Call sites this sitting:

| File | When |
| --- | --- |
| `globeEngine.ts` 904 | `loadLegislatures()` on `layers.legislatures.on` flip only |
| `flatEngine.ts` 662 | `refreshMarks()` on any layer `.on` flip |
| `DeskDrawer.tsx` 17, 215–216, 251, 292 | every render of kept body / compare / atlas / header |
| `commands.ts` 94–119 | `matchKeptDesk` on score / chamber / compare / `open {q}` |
| `runCommand.ts` 148 | `keptDeskByIso` on `keptOpen` |

Inputs are static: `import atlas.json`, `import capitals.json`, `import.meta.glob(..., { eager: true })`. No invalidation API.

Globe vs flat pin loops are **cousins, not copies**: Cesium `entities.add` + `keptContact` (`globeEngine.ts` 893–927) vs 2D `{ id, lat, lon, label, kind, color }` (`flatEngine.ts` 661–677).

### I

Cost is small (≤33 desks, ~34 meta files) but the rebuild is on the command parser and on every DeskDrawer render. Memo is one module-level array. Merging the two engine loops would couple Cesium to the flat fallback — that is not dedupe.

### A

Kits are not hot-reloaded in this host. If they ever are, the memo needs a bust; they are not, today.

### Rank

**Surgical:** compute once (`const KEPT = buildKeptDesks()` or lazy `let cache`). `keptDeskByIso` / `matchKeptDesk` read the cache. Touch: `desks.ts` only.

**Leave-it:** globeEngine `loadLegislatures` vs flatEngine legislatures block. `keptAtlasHoles()` (atlas filter, no meta) may stay uncached.

---

## 3. OverlayHud G/R/L close lists — `src/components/intel/OverlayHud.tsx`

### E

Six copies of “close the other chrome.” They are **not the same list**.

| Path | When | comms | radio | L-rail | corpus | **desk** |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **G key** 136–145 | open only | keep | close | close | close | **close** |
| **R key** 147–156 | open only | close | keep | close | close | **close** |
| **L key** 170–176 | **always** (toggle) | close | close | toggle | close | **close** |
| **G button** 322–330 | open only | keep | close | close | close | **leave** |
| **R button** 299–307 | open only | close | keep | close | close | **leave** |
| **L button** 361–365 | **always** | close | close | toggle | close | **leave** |

Corpus **button** (342–348) does not call `setDesk(null)`; store `setCorpusOpen(true)` already nulls `desk` (`store.ts` 152–155). Corpus **command** uses that setter. Toolbar G/R/L do not.

Esc (113–127) is an **ordered stack**, not a mutex: comms → radio → first-run → desk → corpus → cockpit → track → L-rail. One close per key. Do not merge with G/R/L.

`drawerOpen` is OverlayHud local state. `runCommand` cannot close the L-rail without lifting it. `runCommand.ts` 114–169 repeats `setOpen(false)` + `setPicker(false)` on corpus / desk / permitSearch / keptOpen / keptCompare / permitPlaybook — two-liners with unique `setDesk` / flash / layer. Separate, smaller twin.

Seat 04 already locked: G/R close others **on open**; L **always** closes comms + radio + corpus. Disk matches that for keys. Buttons forgot `setDesk`.

### I

A helper used only on keys would freeze the bug. The surgical move is one `mutexOpen(keep)` called from **keys and buttons**. G/R wrap it in `if (next)`. L calls it after toggle with no `if`. Esc stays a stack.

### A

P0: do not remap G/R/L, do not add a desk letter, do not hide the footer when desk is open (comms is the only overlay that unmounts the command bar).

### Rank

**Surgical:** helper in `OverlayHud.tsx` (~8 lines). Buttons gain `setDesk(null)` as a consequence, not as a separate feature. Optional later: `closeHudChrome()` in `runCommand.ts` for the five command branches — only if OverlayHud is already consistent.

**Leave-it:** Esc order. `drawerOpen` remaining local. Corpus/desk store mutex (`setCorpusOpen` / `setDesk` already cross-clear). Do not lift L-rail into zustand this pass.

---

## 4. Permit-pins dummy loop — `src/lib/permit/permit-pins.ts`

### E

```
94–107  stateCounts()
          cachedCounts short-circuit
          for (const p of searchAhj("a").concat(searchAhj("e")).concat(searchAhj("i"))) {
            /* dummy — don't use this */
          }
          void m
          then a new Map of STATE_CENTROIDS keys → 0
          cachedCounts = that zero map

109–118  buildStateCounts()   real: FEATURED_AHJ_IDS → getSearchablePlace → count by state
120–169  permitMarks()        orbit → 12 featured cores; state-scale → all centroids + buildStateCounts; else featured again, slice 50
```

`stateCounts` is **never called**. `searchAhj` is imported **only** for that loop. `permitMarks` / `permitContact` have no other importers (KIT-06 draft; engine not wired).

`searchAhj("a"|"e"|"i")` each walks SEARCHABLE (CORE+EXTRA+MORE, 1240) and `.slice(0, 40)`. Concat = ≤120 desks, discarded. Not Rest (`places-rest.ts` is not in `search-lite.ts`).

Orbit loop (124–137) and street loop (155–168) are the same 12-core builder; caps differ (`slice(0, 12)` vs `slice(0, 50)`). State-scale uses `Math.max(counts.get(code) ?? 0, 1)` so every centroid bills **at least 1** even when `buildStateCounts` has 0 — policy lie, not a twin.

### I

The dummy is a leftover that would become a silent scan if someone “fixed” the empty loop and then still returned zeros. Deleting `stateCounts` + `cachedCounts` + the `searchAhj` import is the whole job. Extracting the featured-core builder is optional and **premature**: KIT-06 zoom bands are supposed to diverge (0 Rest at orbit; clusters at state; cap ~50 at county).

### A

Coordinator does not implement KIT-06 in this harden pass. Do not import `permit-pins` from `globeEngine` / `flatEngine` as a “cleanup.”

### Rank

**Surgical:** delete `stateCounts` (and unused import). Touch: `permit-pins.ts` only.

**Leave-it:** dual featured loops until KIT-06. `STATE_CENTROIDS` vs `capitals.json` (different domains). `FEATURED_COORDS` vs `FEATURED_AHJ_IDS` (coords belong here; ids belong in `search-lite.ts`). Do not “fix” the `max(..., 1)` cluster counts here.

---

## Ranked for coordinator (src later)

Order is risk × payoff. One file per row. Do not open engines to “while we’re here.”

| # | Do | File | Size | Risk | Skip if |
| ---: | --- | --- | --- | --- | --- |
| **1** | `mutexOpen(keep)` for G/R/L **keys and buttons**. Preserve on-open vs always. Buttons pick up `setDesk(null)`. | `src/components/intel/OverlayHud.tsx` | ~15 lines net | Low if Esc is untouched. **P0-COMMS / P0 letter map.** | Helper would also close desk on L-close and that is rejected — then only add `setDesk(null)` to G/R **open** paths and leave L as-is. |
| **2** | Delete dead `stateCounts` + `cachedCounts` + `searchAhj` import. | `src/lib/permit/permit-pins.ts` | delete ~15 | None (uncalled). | Someone already wired `stateCounts` (they have not). |
| **3** | Memo `keptDesks()` once at module load. | `src/lib/kept/desks.ts` | ~8 | None on this host (static glob). | Hot-reload of kits is invented. |
| **4** | `ON_RE` / `OFF_RE` constants; special-case uses `LAYERS` regexes. **Keep two-pass.** | `src/lib/intel/commands.ts` | ~6 | Parser P0 (Creedence, desk vs layer, flyTo `open`). | Any urge to delete the special-case without tests. |

**Do not ship as this pass:**

| Leave | Why |
| --- | --- |
| Two-pass layer grammar | Desk guard + scenes/styles order. Regex share ≠ pass merge. |
| globeEngine vs flatEngine LEG pins | Different backends. ≤33. |
| `permitMarks` dual featured loops | KIT-06 bands will split them. |
| Wire `permit-pins` into an engine | Next kit, not harden-09. 0 Rest at orbit still binds. |
| Esc stack → mutex helper | One-close-per-key vs close-others. |
| `runCommand` mutex two-liners | Optional after OverlayHud is consistent. Unique flash/layer per branch. |
| `Math.max(..., 1)` cluster counts | Honesty/policy, not duplication. |
| Lift `drawerOpen` into zustand | Out of scope. |

---

## Coordinator-only src later

Seats do not patch. When Host takes this rank:

1. OverlayHud helper first (visible mutex drift).
2. Dead `stateCounts` delete (no behavior).
3. `keptDesks` memo (no behavior).
4. Command regex constants last (parser; smoke `put on creedence`, `show legislatures`, `open legislature desk`, `hide desk`, `hide kept desks` if that alias is still wanted — on disk it is **not** in the LEG regex anymore).

Smoke after (manual localhost, no Playwright from this seat): globe orbits · Creedence from the bar · G opens comms and closes desk · R / L same mutex · toolbar buttons match keys · `show legislatures` still layer · `open legislature desk` still desk · LEG/AHJ still default off · no Rest pins · `permit-pins.ts` still unwired.

Fail closed / revert the civic diff if: globe unmounts, Creedence dies, G/R/L remap, footer z ≤ sheet, Rest in the module graph, engines start importing `permit-pins`.

---

## Do-not

- Do not edit `src/` from this seat.
- Do not fold LEG/AHJ special-case into `LAYERS` without parser tests.
- Do not add `open` to layer on-words.
- Do not merge Cesium and flat legislature loops.
- Do not implement KIT-06, Rest, or pin-budget “while deleting dummy.”
- Do not paste Rest id lists. No skill brands. No live gevradio remix.
- Do not treat docs/dev-team `kept desks?` notes as current disk — the live regex is `legislatures?|\bleg\b|kept harvest` only.
