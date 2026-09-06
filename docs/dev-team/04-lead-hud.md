# LEAD 04 — HUD / P0 lock (KIT-02 empty drawers)

Seat: 04 HUD/P0 · class: public-suite · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: **this file only**. Do not edit `src/`.  
Specialists named (18 commands, 19 runCommand, 25 P0 reconfirm, 28 usability 390): **not on disk** at write time (`docs/dev-team/` had README only). This lead is grounded in OverlayHud / commands / runCommand / RadioDeck / CommsChat / CorpusPanel as they exist now.

KIT-02 is the **empty** kept / permit desk drawer. It is **not** CorpusPanel. It is **not** LEG/AHJ pins. Fail any P0 below → **NO-GO** and stop the kit.

---

## 1. P0 survival list (must still work after KIT-02)

Fail closed. Civic chrome is not worth a dead cockpit.

| # | P0 | How it works **now** (disk) | KIT-02 must |
| --- | --- | --- | --- |
| **P0-GLOBE** | Homepage is Earth. Orbit drag, scroll zoom. Cesium (or flat fallback) stays mounted. | `IntelApp` = `GlobeCanvas` + `DetectionOverlay` + `OverlayHud`. `/` → `<IntelApp />`. HUD is `pointer-events: none` except `.panel` / controls (`styles.css` `.intel-hud` z-index **4**). | Do **not** add a route, unmount canvas, or replace `/` with a desk page. Drawer is overlay chrome. Globe stays visible around it. |
| **P0-CREEDENCE** | Command bar `put on creedence` (also `play` / `spin` / bare `ccr`/`creedence`) plays station **ccr**. Tuner stays music. | `commands.ts` radio block **before** layers: station name + `play\|put on\|tune\|radio\|spin`, then `/^(play \|put on \|spin )?(some )?(ccr\|creedence)$/i` → `{ type: "radio", id: "ccr", on: true }`. `radio.ts` aliases `ccr`, `creedence`, `swamp rock`. `runCommand` radio branch **does not use the engine**. Layer on-words are only `on\|enable\|show\|turn on\|light up` — **`put on` is not a layer verb**. | Do **not** reorder parser so civic `open` / `show` / `desk` / `kept` runs before radio. Do **not** steal `put on`. Do **not** put scoring copy in RadioDeck. |
| **P0-COMMS** | `G` toggles Grok comms. Header Comms button. Esc closes comms **first**. | OverlayHud window `keydown`: `G`/`R` skip during `firstRun`; opening one closes the other **and** L-rail **and** `corpusOpen`. `CommsChat` is `aside.comms-panel` **z-20**, `md:w-[22rem]`, `bottom-24`. Footer **hides while comms is open** (`{!clean && !chatOpen && (`). | Desk must **not** bind `G`. Opening comms must **close desk**. Opening desk must close comms (same mutex as corpus). Do **not** hide the command bar when desk is open (comms is the only overlay that hides footer; copy corpus, not comms). |
| **P0-CMDBAR** | Footer command bar is always the globe input (when not in comms / clean). `/` focuses it. 390px must still type. | Footer `absolute … z-30`. Header also `z-30`. Toast `z-30`. All overlay panels are **z-20**. Command submit → `runCommand(text)`. Hint: `yo tokyo · put on creedence · find a plane`. | Desk **z-20 or lower**. Never `z-30` / `z-40`. Never `inset-0` over the footer. Mobile = bottom sheet with `bottom-24` or `bottom-28` (corpus already uses `bottom-28`). Pointer-events on the panel only. |

**Also still live (not optional):** `R` tuner, `L` Open-sources rail, styles **1–6**, first-run **four cards**, FLT/MIL/AIS/SAT/EQ/FIR/MSN, LEG/AHJ **default off / no pins**, corpus panel on/off, Esc stack, no 16k Rest dump, no skill brands.

---

## 2. How KIT-02 drawer must **not** steal G / R / L or bury footer `z-30`

### 2.1 Hotkeys — OverlayHud is the only window listener

Today **one** `window` `keydown` exists, in `OverlayHud.tsx`. RadioDeck / CommsChat / CorpusPanel add **none**. Keep it that way.

Current letter map (do not remap, do not add a desk letter):

| Key | Owner | Effect |
| --- | --- | --- |
| `Escape` | OverlayHud | Stack in §3 |
| `/` | OverlayHud | Focus command bar |
| `G` | OverlayHud | Toggle comms; on-open closes radio + L-rail + corpus |
| `R` | OverlayHud | Toggle radio picker; on-open closes comms + L-rail + corpus |
| `L` | OverlayHud | Toggle layer rail; **always** closes comms + radio + corpus (toggle, not “if opening”) |
| `1–6` | styles | Normal/CRT/NVG/FLIR/Noir/Snow |
| `H` `D` `C` `N` | HUD / detect / cockpit / next | Already claimed. **`D` is Detection, not desk.** |
| Arrow L/R | radio picker only | Station prev/next |

**Hard rules for `src/components/desks/DeskDrawer.tsx`:**

1. **No** `window.addEventListener("keydown")`. **No** capture-phase listener. **No** `stopPropagation` on `G`/`R`/`L`/`/`/`Escape`.
2. **No** new hotkey (`K`, `D`, `P`, `B`, …). Desk opens from **command phrases** (+ optional in-panel close `X`). **No sixth toolbar button** (390px already has Play + Radio + Comms + Corpus + Layers; Share/Reset hide below `sm`).
3. If the empty drawer later grows an input: OverlayHud already skips letter keys when `target` is `INPUT`/`TEXTAREA` (**after** Esc). That is how G/R/L stay safe while typing. Do not bypass it.
4. OverlayHud **must** add `setDesk(null)` (or equivalent) next to every existing `setCorpusOpen(false)` in the **G / R / L / corpus / radio / comms** open paths — same mutex as corpus. Do **not** change what `G`/`R`/`L` *mean*.

### 2.2 Z-index — footer stays on top

Stack as shipped:

| Surface | z | Role |
| --- | --- | --- |
| Boot overlay | **z-40** | Blocks until globe ready |
| Header toolbar | **z-30** | Radio / Comms / Corpus / Layers |
| Footer command bar | **z-30** | **P0-CMDBAR** |
| Toast | **z-30** | Flash |
| Comms / Radio / Corpus / L-rail / FirstRun / tracked card | **z-20** | Overlays |
| `.intel-hud` | css z-index **4** | Whole HUD over globe |

KIT-02 DeskDrawer = **z-20** (`className` sibling of `corpus-panel` / `comms-panel`).  

**Do not:** `z-30`, `z-40`, `z-[…]` ≥ 30, `fixed inset-0`, a full-viewport sheet, or a modal that covers `footer`. Header and footer must remain clickable **through** an open desk (they already sit above z-20). Radio panel today has no `bottom-*` and relies on `max-height: min(70vh, 36rem)` + footer z-30; **do not copy that**. Copy **CorpusPanel**: `top-28 bottom-28` (mobile) / `md:top-20 md:right-4 md:bottom-28 md:w-[22rem]`.

Comms is the exception that **unmounts** the footer (`!chatOpen`). Desk is **not** a chat. **Footer stays mounted when desk is open.** That is the 390px P0.

---

## 3. Esc order with `corpusOpen` + `desk`

**As shipped** (`OverlayHud.tsx` Escape handler):

1. `useComms.open` → close comms, return  
2. `useRadio.picker` → close picker, return  
3. `firstRun` → `dismissFirstRun(false)`  
4. **else** `corpusOpen` → `setCorpusOpen(false)`  
5. **else** `cockpit` → `engine.enterCockpit(false)`  
6. **else** `tracked` → `engine.track(null)`  
7. **else** `setDrawerOpen(false)` (L-rail)

**KIT-02 required order** (insert desk; do not reorder the rest):

1. comms  
2. radio picker  
3. first-run  
4. **`corpusOpen`** (smoke index panel — already a store flag; **do not reuse for desk**)  
5. **`desk`** (KIT-02; close to `null`)  
6. cockpit  
7. tracked  
8. L-rail (`drawerOpen`)

Mutex: at most one of { comms, radio picker, corpus, desk, L-rail } is the “exclusive panel.” Opening any of them closes the others. Cockpit / track / first-run stay as they are (Esc peels them after the exclusive panels).

`drawerOpen` is **local React state**, not the intel store. Command `show corpus` therefore cannot clear it; the rail is gated `drawerOpen && !chatOpen && !radioOpen && !corpusOpen`. KIT-02 must extend that gate with `&& !desk` (and/or a `useEffect` that `setDrawerOpen(false)` when desk becomes non-null). Same for the tracked card gate.

---

## 4. Command phrases for **empty** kept / permit drawers

Empty = store `{ system: "kept" | "permit"; id: string } | null` with **`id` empty / unused**. Placeholder copy: **“No desk selected.”** Honesty strip: drawers are empty this kit; no roster, no AHJ search, no pins. Do **not** fly the camera. Do **not** `setLayer` LEG/AHJ from the drawer.

### 4.1 Parse **before** layer-on and **before** flyTo `open …`

Landmines already on disk:

| Phrase | What happens **today** | KIT-02 |
| --- | --- | --- |
| `put on creedence` | radio `ccr` (good) | Untouchable. Radio block stays first. |
| `open kept desk` | **flyTo** `q="kept desk"` (`open` is a flyTo verb) | Desk parser **must** win. |
| `show kept desk` / `show kept desks` | **layer legislatures on** (`kept desks?` in LEG regex) | Desk parser **must** win. Then **narrow** LEG regex: drop `kept desks?`; keep `legislatures?`, `\bleg\b`, `kept harvest`. |
| `show permits` / `show legislatures` | layers (good) | Leave. |
| `show corpus` / `open corpus` | `{ type: "corpus" }` | Leave. Corpus ≠ desk. |
| `open korea` / `show me Tokyo` | flyTo | **KIT-05**. Do **not** eat `open <place>`. |

New `CommandAction` (do **not** reuse `{ type: "corpus" }`):

```ts
{ type: "desk"; on: boolean; system?: "kept" | "permit" }
```

`on: false` → `desk = null`. `on: true` without `system` → empty drawer, no adapter. `system: "kept"` / `"permit"` → empty drawer **showing that adapter’s empty state**.

### 4.2 Allowed phrases (local parser; exact-ish; case-insensitive)

**Close (any system):**

- `hide desk` · `close desk` · `desk off` · `hide desks` · `close desks`

**Open empty drawer (no system):**

- `^desk$` · `^desks$`  
- `show desk` · `open desk` · `desk on` · `show desks` · `open desks`

**Open empty Kept drawer:**

- `kept desk` · `show kept desk` · `open kept desk` · `legislature desk` · `show legislature desk`

**Open empty Permit drawer:**

- `permit desk` · `show permit desk` · `open permit desk` · `building desk` · `ahj desk` · `show building desk`

Bare `corpus` stays corpus. Bare `tuner` / `radio on` stay radio. `show kept harvest` stays LEG layer.

**Forbidden this kit:** `open korea`, `building desk {place}`, `find AHJ in …`, `score the sitting`, member/sitting names, any phrase that plots.

### 4.3 `runCommand` apply (seat 19)

Handle `desk` **with radio/corpus**, **before** `if (!engine) return` in `applyAction`. Opening desk: `setDesk(...)`, `setCorpusOpen(false)`, `useComms.setOpen(false)`, `useRadio.setPicker(false)`, flash `Desk` / `Kept desk` / `Permit desk` / `Desk closed`. Do **not** require engine. `fromUnknown` must accept `type === "desk"` so Grok interpret cannot crash; unknown civic still shrugs.

`runCommand()` today early-returns if `engine` is null (radio/corpus already live with that). Do not make desk worse; do not “fix” that as a drive-by.

---

## 5. File-touch list (KIT-02 only)

**Touch:**

| File | Why |
| --- | --- |
| `src/components/desks/DeskDrawer.tsx` | **New.** Empty panel. `role="dialog"`. z-20. bottom-28. “No desk selected.” Close `X`. |
| `src/lib/intel/store.ts` | `desk: null \| { system: "kept" \| "permit"; id: string }` + setter. Default **null**. **Do not** reuse `corpusOpen`. |
| `src/lib/intel/types.ts` | `{ type: "desk"; on: boolean; system?: "kept" \| "permit" }` on `CommandAction`. |
| `src/lib/intel/commands.ts` | Phrases in §4 **after** radio/creedence **and** corpus, **before** LEG `kept desks?` / flyTo `open`. Narrow `kept desks?`. |
| `src/lib/intel/runCommand.ts` | `applyAction` + `fromUnknown` for `desk`. |
| `src/components/intel/OverlayHud.tsx` | Mount `<DeskDrawer />` next to Comms/Radio/Corpus. Esc §3. Mutex on G/R/L/corpus/radio/comms. Gate L-rail + tracked card with `!desk`. **Do not** add a toolbar button. **Do not** change G/R/L meaning. |

**Optional 7th:** `src/styles.css` `.desk-panel` max-height only if corpus/comms classes are not enough. Prefer reuse.

**Do not touch:**

- `RadioDeck.tsx`, `radio.ts`, `radioPlayer.ts`  
- `CommsChat.tsx` (mutex from OverlayHud / runCommand is enough)  
- `CorpusPanel.tsx` / `corpus.ts` (smoke index stays)  
- `GlobeCanvas.tsx`, `globeEngine.ts`, `flatEngine.ts`  
- `IntelApp.tsx`, `src/routes/index.tsx`  
- `FirstRun.tsx` (four cards stay)  
- `src/lib/permit/places-rest.ts`, `places.ts` (Rest dump)  
- `vendor/kept/**`, `package.json`, live gevradio  

---

## 6. GO / NO-GO KIT-02

**GO** — empty DeskDrawer shell **only**, if every gate in this file holds.

**NO-GO** (any one = stop, do not ship the kit):

- Globe unmounted / new homepage / new route  
- `put on creedence` no longer radio `ccr`  
- DeskDrawer binds `G`/`R`/`L` or any new letter hotkey  
- Desk panel `z-30+` or covers footer at 390px  
- Command bar hidden because desk is open  
- Esc skips `corpusOpen` or peels cockpit before desk  
- Toolbar grows a 6th always-visible button  
- CorpusPanel treated as DeskDrawer, or `corpusOpen` reused as `desk`  
- LEG/AHJ pins, capitals loop, `places-rest` / `places.ts` import, members/votes dump  
- Parser steals `put on`, `open <place>`, `show corpus`, `show legislatures` / `show permits`  
- Skill brands / invented sittings / iframe of keptglobal or hivepermitdev  
- KIT-03–06 adapters, typeahead, zoom-gated Rest  

Corpus BASE + KIT-01 are **already in the tree**. KIT-02 is the next implement (seats 07–10, 31). This lead **authorizes the empty shell**. It does **not** authorize adapters or pins.

---

## 7. E / I / A

**E — Evidence (this tree, 2026-08-29)**

- `IntelApp.tsx`: globe + detection + HUD only.  
- OverlayHud: `G`/`R`/`L` mutex with `corpusOpen`; Esc comms → radio → first-run → corpus → cockpit → track → L-rail. Footer **z-30**, panels **z-20**. Footer gated `!chatOpen` only. Corpus button exists; **no** desk store field. `LAYER_ORDER` is nine ids including `legislatures` / `permits`.  
- `commands.ts`: Creedence regex before layers; corpus on/off; LEG `kept desks?`; flyTo includes `open`. No `desk` action.  
- `runCommand.ts`: radio + corpus apply before engine switch; no desk.  
- RadioDeck / CommsChat: no keydown; radio z-20; comms `bottom-24`.  
- CorpusPanel: z-20, `bottom-28`, store `corpusOpen`.  
- `store.ts`: `corpusOpen: false`; layers LEG/AHJ default off. No `desk`.  
- `docs/dev-team/`: README only at write; specialists 18/19/25/28 absent.

**I — Inference**

- The HUD already has the plugin shape for a **fourth exclusive overlay** (corpus). KIT-02 is the same shape with a **new store field** and **no new hotkey**. The failure modes are (1) a capture listener stealing G/R/L, (2) z-index burying the command bar, (3) parser order eating Creedence / flyTo / LEG, (4) merging desk into corpus.

**A — Assumption**

- Implementers follow the file-touch list and empty-only copy. Seats 18/19/25/28 will not contradict this lock; if they do, **this P0 list wins**. 390px is verified by not covering `footer.z-30` and not adding toolbar chrome.

**Stop.** Empty drawers only. Park pins. Park adapters.
