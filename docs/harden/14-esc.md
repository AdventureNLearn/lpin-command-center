# SEAT H14 — ESC / MUTEX / 390

Seat: H14 · band: Harden (15) · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
This sitting writes: **this file only**. No `src/` edit. Coordinator patches OverlayHud after audits.

Lead SoT: `docs/dev-team/01-lead-integration.md` §4 Esc stack, §3 mutex, §5 footer `z-30` vs sheet `z-20`.  
Disk SoT: `src/components/intel/OverlayHud.tsx` `onKey`, toolbar clicks, footer gate; `src/components/desks/DeskDrawer.tsx` chrome.

---

## Claim under test

**Esc peels front-most overlays in lead-01 order; G / R / L (and their toolbar twins) keep corpus vs desk vs layer-rail exclusive; at 390px the command footer (`z-30`) stays hittable over the desk sheet (`z-20` `bottom-28`). Comms is the only surface allowed to hide that footer.**

| State | Meaning |
| --- | --- |
| **PASS** | Esc order = lead 01. Keys + buttons + store all close the other exclusive panels. Desk never hides the bar. |
| HOLE | Esc order is right, but a click / command / gate still lets two exclusive panels coexist, or comms can hide the bar while desk is still up. |
| BLOCK | Esc peels cockpit/track/rail before desk, or desk `z ≥ 30`, or desk copies the comms footer gate. |

**Verdict: HOLE.**  
Esc order on disk **matches lead 01** (desk before corpus). Do not reorder. The hole is mutex: G / R / L **keys** close desk; Radio / Comms / Layers **buttons** do not; the layer-rail render gate still omits `!desk`; `runCommand` cannot see HUD-local `drawerOpen`. That leak is what makes the comms-hides-footer stress real at 390px.

---

## 1. Esc order vs lead 01 — not wrong; do not expand a reorder

Lead 01 required (KIT-02, OverlayHud only, return after first hit, no second `window` listener in DeskDrawer):

1. comms  
2. radio picker  
3. first-run  
4. **`desk !== null` → `setDesk(null)`**  
5. `corpusOpen` → `setCorpusOpen(false)`  
6. cockpit  
7. tracked  
8. layer rail `drawerOpen`

Disk (`OverlayHud.tsx` L113–128), one `keydown`, capture default, Esc **before** the typing skip:

```
if (e.key === "Escape") {
  if (useComms.getState().open) { setOpen(false); return; }          // 1
  if (useRadio.getState().picker) { setPicker(false); return; }      // 2
  if (firstRun) dismissFirstRun(false);                              // 3
  else if (desk) setDesk(null);                                      // 4
  else if (corpusOpen) setCorpusOpen(false);                         // 5
  else if (cockpit) engine?.enterCockpit(false);                     // 6
  else if (tracked) engine?.track(null);                             // 7
  else setDrawerOpen(false);                                         // 8
  return;
}
```

Comms / radio `return` immediately. Steps 3–8 share `if` / `else if` then one `return`. Same “first hit wins.”

`grep keydown` across `src/**/*.tsx`: **only** OverlayHud. DeskDrawer close `X` calls `setDesk(null)` (L310). No capture listener. No `stopPropagation` on Esc / G / R / L / `/`.

`/` still focuses the command bar while desk is open (Esc block returns first; `/` is after `if (typing) return`). Footer stays mounted unless comms — see §4.

### Lead 04 is the rejected stack, not a live bug

Seat 04 (`docs/dev-team/04-lead-hud.md` §3) asked **corpus then desk**. Seat 09 recorded pre-KIT-02 corpus-before-desk. Seat 29 collision map: pick **one** OverlayHud stack; do not add a DeskDrawer listener. Coordinator (`docs/dev-team/00-coord.md`): “Esc closes desk before corpus.”

Disk = **01**, not 04. Store already forbids both flags (`store.ts` L152–155: `setCorpusOpen(true)` nulls `desk`; `setDesk(non-null)` sets `corpusOpen: false`). Desk-then-corpus is belt-and-suspenders if those setters leak. It is not a peel of the index before the civic modal.

**Do not expand a reorder.** Expanding here would fight the lead this seat is scored against.

### Esc while typing

Esc is handled **before** `tag === INPUT || TEXTAREA`. AHJ search inside DeskDrawer (`PermitHome` input) still peels. Command-bar typing still peels. Playbook `<select>` is not in the typing skip; letters can fire while it is focused — pre-existing HUD pattern, not an Esc-order miss.

---

## 2. G / R / L vs corpus vs desk vs layers

Exclusive set (lead 01 §3): **at most one of** corpus panel, desk drawer, comms, radio picker, layer rail. Cockpit / track / first-run are later Esc peels, not this mutex.

`drawerOpen` is **HUD-local** `useState`. `corpusOpen` and `desk` are store. Comms / radio picker are other stores. Store can mutex desk ↔ corpus. It cannot close the rail or comms.

### Keys (OverlayHud `onKey`)

| Key | On-open closes | Desk |
| --- | --- | --- |
| `G` (skip `firstRun`) | radio picker, rail, corpus, **desk** | `setDesk(null)` only if `next` (L136–145) |
| `R` (skip `firstRun`) | comms, rail, corpus, **desk** | `setDesk(null)` only if `next` (L147–157) |
| `L` (no `firstRun` guard) | comms, picker, corpus, **desk** | `setDesk(null)` **always**, including rail-off (L170–177) |

G / R match lead 01 rule 4 (“when turning **on**”). L is stricter than that rule (closes desk even when turning the rail off). Meaning of G / R / L is unchanged: comms / tuner / Open-sources. **No desk letter.** `D` is still Detection (L181–183). DeskDrawer adds none.

### Buttons (same file, **not** the same closes)

| Control | On-open closes | `setDesk(null)` |
| --- | --- | --- |
| Radio stations (L299–307) | comms, rail, corpus | **missing** |
| Comms (L322–330) | radio, rail, corpus | **missing** |
| Corpus (L342–349) | comms, radio, rail | **store** (`setCorpusOpen(true)` → `desk: null`) |
| Layers (L361–366) | comms, radio, corpus | **missing** |

Corpus button is covered by the store setter. Radio / Comms / Layers buttons are the hole: keys close desk, clicks do not.

### Render gates

| Surface | Gate now | `!desk` |
| --- | --- | --- |
| Layer rail | `drawerOpen && !chatOpen && !radioOpen && !corpusOpen` (L395) | **missing** |
| Tracked card | `tracked && !chatOpen && !radioOpen && !corpusOpen && !desk` (L520) | present |
| Footer | `!clean && !chatOpen` (L629) | must stay **absent** (desk must not hide the bar) |
| DeskDrawer | `if (!desk) return null` | n/a |
| CorpusPanel | `if (!open) return null` | n/a |

Lead 01 rule 7: hide rail **and** tracked card when `desk` is set (`… && !desk`). Tracked got the patch. Rail did not. Opening a desk via command / engine / tracked “Open desk” while `drawerOpen` is true paints **rail + desk** at `z-20`.

### Command / store paths (cannot see `drawerOpen`)

`runCommand.ts` desk / kept / permit branches: `setDesk` + comms off + picker off. Corpus branch: `setCorpusOpen` (store nulls desk) + comms off + picker off. **No rail close** — HUD-local. Seat 09 already named the fix: OverlayHud `useEffect` `if (desk) setDrawerOpen(false)`, or lift the rail. Neither exists.

Tracked “Open desk” (L561–574) only `setDesk({ system: "kept", id })`. Store nulls corpus. Card is already behind `!chatOpen && !radioOpen`. Rail can still be up.

### firstRun

Lead 01 rule 9: do not open desk while `firstRun` (same guard as G / R). G / R skip firstRun. L does not. `runCommand` does not. OverlayHud does not block `setDesk` during firstRun. Esc still peels first-run **before** desk, so a leaked pair costs two Esc hits. Secondary hole, not an Esc-order miss.

---

## 3. Footer `z-30` vs drawer `z-20` `bottom-28`

### Disk stack (do not invert)

| Surface | Classes | z |
| --- | --- | ---: |
| `.intel-hud` | `position:absolute; inset:0; z-index:4; pointer-events:none` | 4 |
| Boot veil | `z-40` | 40 |
| Header toolbar | `absolute … top-3 … z-30` | **30** |
| **Command footer** | `absolute right-3 bottom-3 left-3 z-30` | **30** |
| Toast | `z-30` | 30 |
| DeskDrawer | `inset-x-3 top-28 bottom-28 z-20` · `md:… md:bottom-28 md:w-[22rem]` | **20** |
| CorpusPanel | same box as desk | 20 |
| CommsChat | `top-32 bottom-24 z-20` | 20 |
| RadioDeck | `top-32 … z-20`, **no** `bottom-*` | 20 |
| Layer rail | `top-32 left-3 z-20`, no `bottom-*` | 20 |
| Tracked card | `bottom-28 z-10` | 10 |

DeskDrawer L296 copies CorpusPanel L24. Inner scroller `min-h-0 flex-1 overflow-y-auto overscroll-contain`. Header `shrink-0`. No `.desk-drawer` rule in `styles.css` (optional 7th file unused). Pointer-events stay on `.panel` / `[role="dialog"]` only.

Footer is **not** gated on `desk` or `corpusOpen`. Copy corpus, not comms. Lead 01 / 04 / 28 all require that.

### 390px geometry (stacked chrome; `sm`/`md` off)

Footer inner: `flex-col gap-2 p-2` → style chips `min-h-10` + gap + command `min-h-11` + padding ≈ 108px, coords ≈ 20px, `bottom-3` = 12px → chrome top ≈ **140px** from the viewport bottom.

Desk / corpus `bottom-28` = **112px**. Last ~28px of the sheet sits **under** the bar. Usability is **`z-30 > z-20`**, not spatial clearance. Lead 01 allowed this copy of corpus (`bottom-36` preferred, `bottom-28` acceptable because the bar still paints and hit-tests). Seat 28 already scored that pattern PASS for KIT-02.

Fail this seat if the sheet is raised to `z-30` / `z-40`, uses `inset-0` / `bottom-0`, or the footer gate grows `\|\| desk`. None of those are on disk. Geometry of an **exclusive** desk sheet is therefore PASS.

---

## 4. Stress: comms hides footer

Comms is the **only** overlay that unmounts the command bar:

```
{!clean && !chatOpen && (
  <footer className="absolute … z-30">
```

`CommsChat` has its own input (`bottom-24 z-20`). That exception is P0-COMMS. Desk must not inherit it.

### Intended path (keys)

Desk open → press **G**: key sets `setDesk(null)` then opens comms. Footer hides **because comms is open**, desk is gone. 390px: chat sheet only. Pass.

Desk open → command `close desk` / Esc: desk null, footer still up. Pass.

Comms open → command `open legislature desk` / `open building desk`: `runCommand` closes comms, opens desk. Footer **returns**. Pass.

### Failed path (button leak)

Desk open → click **Comms** in the header (L322–330):

1. `setOpen(true)`  
2. picker / rail / corpus closed  
3. **`desk` left set**  
4. Footer unmounts (`chatOpen`)  
5. `CommsChat` (`z-20` `bottom-24`) **and** `DeskDrawer` (`z-20` `bottom-28`) both render  

At **390px** that is the stress: no command bar, two overlapping sheets, header still `z-30`. `/` focuses a footer that is not in the tree. Esc peels comms first (lead 01), footer comes back **under** the still-open desk; second Esc closes desk. Recoverable. Not exclusive. Not 390px-safe while the leak holds.

Same class of leak: click **Layers** with desk open (rail + desk, footer still up — visual collision, bar survives). Click **Radio** with desk open (picker + desk, footer still up). G / R **keys** would have closed desk.

RadioDeck still has no `bottom-*` (lead 01 HOLE vs the bar, saved by z-index). Out of this seat’s patch list except: do not copy it.

---

## 5. Coordinator patch list (not this sitting)

One file: `src/components/intel/OverlayHud.tsx`. Do **not** add a DeskDrawer keydown. Do **not** change Esc order vs lead 01. Do **not** gate the footer on `desk`.

1. Radio / Comms toolbar `if (next)` blocks: add `useIntel.getState().setDesk(null)` next to the existing `setCorpusOpen(false)` (mirror G / R keys).  
2. Layers toolbar: add `setDesk(null)` next to `setCorpusOpen(false)` (mirror L).  
3. Rail gate L395: `&& !desk` (same as tracked L520).  
4. `useEffect(() => { if (desk) setDrawerOpen(false); }, [desk])` so `runCommand` / engine / tracked “Open desk” close the HUD-local rail.  
5. Optional: `firstRun` guard on opening desk (commands + L), matching G / R. Not required to close the 390px stress.

Do not raise `.desk-drawer` above `z-20`. Do not switch it to Comms `bottom-24`. Do not hide the footer when `desk` is set.

---

## E / I / A

**E — Evidence (this tree, 2026-08-29)**

- `OverlayHud.tsx` L113–128: Esc comms → radio → firstRun → **desk** → corpus → cockpit → track → `setDrawerOpen(false)`. Matches `docs/dev-team/01-lead-integration.md` §4. Conflicts with `04-lead-hud.md` §3 (corpus then desk); coordinator picked 01.  
- Only one `window` `keydown` in `src/`. DeskDrawer has none. Close `X` is `setDesk(null)`.  
- G / R keys `if (next)` include `setDesk(null)` (L143, L154). L key always `setDesk(null)` (L175). Radio / Comms / Layers **buttons** omit it (L299–307, L322–330, L361–366). Corpus button is covered by `store.ts` L152–153.  
- Rail gate L395 omits `!desk`. Tracked gate L520 includes it. Footer L629 is `!clean && !chatOpen` only.  
- `DeskDrawer.tsx` L296: `bottom-28 z-20` copy of CorpusPanel. Footer L630: `z-30`. CommsChat L33: `bottom-24 z-20` and OverlayHud hides footer while `chatOpen`.  
- `runCommand.ts` desk/corpus branches close comms + picker, not `drawerOpen`. `setDesk` / `setCorpusOpen` mutex each other only.  
- `00-coord.md`: “Esc closes desk before corpus. Footer z-30. Corpus mutex.” KIT-02 already on disk.

**I — Inference**

- Esc order is not the defect. Expanding a desk↔corpus swap would undo lead 01 and the coordinator pick for a stack that already peels the civic modal first.  
- Mutex was patched on the **key** paths and the **store** corpus↔desk pair, then not copied to the **click** paths or the rail **gate**. Operators using the header at 390px (where G / R / L are the same five `size-11` targets) hit the hole; keyboard users do not.  
- Comms hiding the footer is lawful **only** when comms is the exclusive panel. The Comms button is the path that makes that exception steal the 390px bar while DeskDrawer is still mounted. That is the stress this seat was asked to name.  
- `z-20` / `z-30` + corpus `bottom-28` still hold for an exclusive desk sheet. Do not spend `styles.css` unless a later kit grows the honesty list through the footer band **and** someone raises z.

**A — Assumption**

- Host patches OverlayHud from §5 after this 15-seat harden, without waiting for a second Esc-order vote.  
- Operators will not treat two Esc hits (comms then desk) as the mutex working.  
- Playbook `<select>` letter-leak and RadioDeck unbounded bottom stay out of this file’s pass/fail.  
- Lead 04 corpus-then-desk is historical; this seat does not reopen it.

---

## Tri-state (scored)

| Subclaim | State |
| --- | --- |
| Esc order vs lead 01 | **PASS** (desk before corpus; one listener) |
| G / R / L **keys** close desk | **PASS** |
| G / R / L **buttons** + rail gate + command rail close | **HOLE** |
| Desk `z-20` `bottom-28` vs footer `z-30`; desk does not hide footer | **PASS** (when exclusive) |
| Comms-hides-footer stress with desk still up | **HOLE** (Comms click) |

**Overall: HOLE.** Not BLOCK: Esc does not peel cockpit before desk; sheet is not `z-30`; globe stays mounted.

Stop. Do not patch `src/` from this seat. Do not start a second OverlayHud listener.
