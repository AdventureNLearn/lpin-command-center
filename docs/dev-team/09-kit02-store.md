# 09 — KIT-02 store (desk field)

Seat: 09 · band: KIT-02 · date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This file is the **intel-store contract** for the empty DeskDrawer. It does not patch `src/`.

One field opens the drawer. `corpusOpen` already exists and stays the corpus panel. Do **not** reuse it.

---

## E — Evidence (disk, this tree)

Read `src/lib/intel/store.ts` (`IntelState`, `useIntel`). Civic overlay flags today:

| Flag | Where | Type | Default | Setter |
| --- | --- | --- | --- | --- |
| `corpusOpen` | `useIntel` | `boolean` | `false` | `setCorpusOpen(v: boolean)` — **naive**: `set({ corpusOpen })` only |
| `desk` | **absent** | — | — | — |
| Layer rail | `OverlayHud.tsx` local `useState` `drawerOpen` | `boolean` | `false` | `setDrawerOpen` — **not** on `IntelState` |
| Comms | `src/lib/intel/comms.ts` `useComms` | `open: boolean` | `false` | `setOpen(v)` — naive |
| Radio picker | `src/lib/intel/radio.ts` `useRadio` | `picker: boolean` | `false` | `setPicker(v)` — naive |

`setCorpusOpen` does **not** close comms, radio picker, or the layer rail. Mutual exclusion for corpus is call-site:

- `OverlayHud.tsx` G / R / L / Corpus buttons and those keys close the other three when **opening**.
- Esc order today: comms → radio picker → first-run → **corpus** → cockpit → track → layer rail (`setDrawerOpen(false)`).
- `runCommand.ts` `{ type: "corpus" }` calls `setCorpusOpen` and, if on, `useComms.setOpen(false)` + `useRadio.setPicker(false)`. It does **not** close `drawerOpen` (HUD-local).

`CorpusPanel` reads `s.corpusOpen` only. No `src/components/desks/`. `CommandAction` has `{ type: "corpus"; on: boolean }` and **no** `{ type: "desk" }`.

`comms.ts` already `import { useIntel } from "./store"`. `store.ts` must **not** import `comms.ts` (cycle). Radio picker and layer rail are the same class of problem: store setter can close **same-store** flags; cross-store / HUD-local closes stay at OverlayHud + `runCommand`, matching corpus.

Handoff / FEATURE_KITS (later implement, not this file): DeskDrawer = `desk: null | { system: "kept" | "permit"; id: string }`. Corpus pickup (`docs/corpus-audit/15-pickup-plan.md`): `corpusOpen` + `setCorpusOpen`; **do not reuse** `desk: { system, id }`.

---

## I — Inference

KIT-02 visibility is `desk !== null`. Corpus visibility is `corpusOpen === true`. Two booleans mashed into one flag would make Esc, G/R/L, and the corpus button unable to tell “archive panel” from “civic desk.”

`setDesk` can atomically clear `corpusOpen` (same zustand object). It cannot legally `useComms` from `store.ts`. So the **store-owned** exclusion is desk ↔ corpus. The **session-owned** exclusion (desk vs comms vs radio picker vs layer rail) is the same OverlayHud / `runCommand` pattern corpus already uses, with `setDesk(null)` added on those open paths.

Layer rail stays HUD-local unless a HUD seat lifts it. This store seat does **not** add `layerRailOpen`. Opening a desk still **must** close that rail; OverlayHud does it.

---

## A — Assumption

Implementers of DeskDrawer / OverlayHud / commands will call `setDesk` (never `setCorpusOpen(true)` to mean a desk). KIT-03/04 fill `id`; KIT-02 may open `{ system, id: "" }` as the empty shell. Operators will not treat this contract as shipped `src/`.

---

## 1. Exact types (add next to `IntelState`)

```ts
export type DeskSystem = "kept" | "permit";

export type DeskSel = {
  system: DeskSystem;
  id: string;
};
```

`system` is a string literal union only. No `"corpus"`, `"layer"`, `"leg"`, `"ahj"`.  
`id` is an opaque string. Kept later = atlas ISO2 (`"kr"`, `"us"`). Permit later = catalog place id (`"fl-fort-pierce"`). Empty KIT-02 shell may use `id: ""`. Do not invent a third system to mean “drawer open, nothing selected.”

---

## 2. Exact `IntelState` fields / setters

**Keep unchanged (names, types, defaults):** `ready`, `bootStatus`, `bootPct`, `style`, `mapSource`, `hud`, `detection`, `detectionDensity`, `detections`, `cockpit`, `cleanUi`, `firstRun`, `command`, `commandHint`, `toast`, `placeName`, `cam`, `tracked`, `layers`, `weather`, `engine`, and every existing setter except the `setCorpusOpen` patch below.

**Keep — corpus is not a desk:**

| Field | Type | Default | Setter |
| --- | --- | --- | --- |
| `corpusOpen` | `boolean` | `false` | `setCorpusOpen: (v: boolean) => void` |

**Add:**

| Field | Type | Default | Setter |
| --- | --- | --- | --- |
| `desk` | `DeskSel \| null` | `null` | `setDesk: (desk: DeskSel \| null) => void` |

Paste-ready slice:

```ts
type IntelState = {
  // …existing fields…
  corpusOpen: boolean;
  desk: DeskSel | null;
  setCorpusOpen: (v: boolean) => void;
  setDesk: (desk: DeskSel | null) => void;
  // …rest unchanged…
};
```

Initial state:

```ts
corpusOpen: false,
desk: null,
```

**Do not add** `deskOpen`, `drawerOpen`, `layerRailOpen`, `activePanel`, or a second boolean that means “DeskDrawer visible.” Visibility **is** `desk !== null`.

---

## 3. Exact setter bodies (store.ts)

Same-store mutual exclusion only. No `useComms` / `useRadio` imports in this file.

```ts
setCorpusOpen: (corpusOpen) =>
  set(corpusOpen ? { corpusOpen: true, desk: null } : { corpusOpen: false }),

setDesk: (desk) =>
  set(desk ? { desk, corpusOpen: false } : { desk: null }),
```

Rules:

| Call | Result |
| --- | --- |
| `setDesk({ system: "kept", id: "kr" })` | `desk` that object, `corpusOpen: false` |
| `setDesk({ system: "permit", id: "fl-fort-pierce" })` | same, permit |
| `setDesk({ system: "kept", id: "" })` | drawer **open**, empty shell (KIT-02) |
| `setDesk(null)` | drawer **closed**. Does **not** set `corpusOpen: true` |
| `setCorpusOpen(true)` | corpus on, `desk: null` |
| `setCorpusOpen(false)` | corpus off. Does **not** open a desk |

`setDesk` replaces the whole `DeskSel`. No `patchDesk`. Switching kept → permit is one `setDesk({ system: "permit", id })`.

Do not persist `desk` (no `localStorage`). `FIRST_RUN_KEY` stays the only persist in this file.

---

## 4. Opening desk closes corpus, comms, radio picker, layer rail

Whenever `desk` becomes non-null, **all four** of these must be off. Split by owner:

| Surface | How it closes | Owner |
| --- | --- | --- |
| Corpus | `setDesk` sets `corpusOpen: false` | **store.ts** (this contract) |
| Comms | `useComms.getState().setOpen(false)` | OverlayHud + `runCommand` (do not import comms from store) |
| Radio picker | `useRadio.getState().setPicker(false)` | OverlayHud + `runCommand` |
| Layer rail | `setDrawerOpen(false)` | OverlayHud (`drawerOpen` is HUD-local today) |

Required HUD / command helper (not a store field). Call this on every **open-desk** path, after or around `setDesk(sel)`:

```ts
function closeExclusiveForDesk() {
  useComms.getState().setOpen(false);
  useRadio.getState().setPicker(false);
  setDrawerOpen(false); // OverlayHud only
}
```

`runCommand` has no `setDrawerOpen`. If a command opens a desk, either: OverlayHud `useEffect` `if (desk) setDrawerOpen(false)`, or lift rail later. Store seat does not lift the rail.

Radio **playback** (`playing`) stays up. Only the **picker** closes. Command bar stays mounted (`footer` `z-30`). Globe stays mounted.

---

## 5. Mutual exclusion (reverse)

At most one of: desk drawer, corpus panel, comms, radio picker, layer rail.

| When this opens | Must also |
| --- | --- |
| `setDesk(non-null)` | `corpusOpen: false` (store) + comms off + picker off + rail off |
| `setCorpusOpen(true)` | `desk: null` (store) + comms off + picker off + rail off (existing HUD corpus button already does the last three) |
| Comms on (`G` / comms button) | `setDesk(null)` **and** existing `setPicker(false)`, `setDrawerOpen(false)`, `setCorpusOpen(false)` |
| Radio picker on (`R` / station button) | `setDesk(null)` **and** existing comms / rail / corpus closes |
| Layer rail on (`L` / Layers) | `setDesk(null)` **and** existing comms / picker / corpus closes |

Esc (OverlayHud; not a store method). Insert desk **after** first-run, **before** corpus:

1. comms `setOpen(false)`
2. radio `setPicker(false)`
3. first-run `dismissFirstRun(false)`
4. **`desk` → `setDesk(null)`**
5. corpus `setCorpusOpen(false)`
6. cockpit
7. track
8. layer rail `setDrawerOpen(false)`

`DeskDrawer` close control calls `setDesk(null)` only.

Gating in OverlayHud (when HUD seat wires it): layer rail and track card already `&& !chatOpen && !radioOpen && !corpusOpen`. Add `&& !desk`. CorpusPanel stays `corpusOpen`. DeskDrawer mounts on `desk !== null` only.

---

## 6. Do not reuse `corpusOpen` for desks

Forbidden:

- `if (corpusOpen) return <DeskDrawer />`
- `setCorpusOpen(true)` to mean “open kept/permit”
- Encoding system/id in `command`, `toast`, `tracked`, `layers.legislatures`, or `layers.permits`
- Treating `drawerOpen` (Open sources rail, `L`) as DeskDrawer
- A boolean `deskOpen` beside `desk` (split brain)
- Importing `places-rest.ts` / fat `members.json` from the store

`CorpusPanel` continues to subscribe to `corpusOpen`.  
`DeskDrawer` (KIT-02, other seat) subscribes to `desk`.  
`setLayer("legislatures" | "permits", { on })` does **not** call `setDesk`. Layers default off stay KIT-01.

---

## 7. Out of this file (other KIT-02 seats)

Not store fields. Listed so this contract is not stretched:

- `src/components/desks/DeskDrawer.tsx` — right-side `.panel`, empty kept/permit chrome, Esc via HUD stack, mobile bottom sheet **above** command bar (`bottom-24`).
- `CommandAction` `{ type: "desk"; system: DeskSystem; id: string } \| { type: "desk"; on: false }` in `types.ts` / `commands.ts` / `runCommand.ts` — dispatch **must** call `setDesk` then `closeExclusiveForDesk`.
- Adapter bodies (KIT-03 Kept, KIT-04 permit search). Empty shell is enough for KIT-02.
- Camera / `setLayer` / Rest pins / iframes of keptglobal or hivepermitdev.

---

## 8. Implementer checklist (later `src/` turn)

1. `src/lib/intel/store.ts` only for fields/setters in §§1–3.
2. `desk === null` on boot. `corpusOpen` still `false`.
3. `setDesk(non-null)` ⇒ `corpusOpen === false`.
4. `setCorpusOpen(true)` ⇒ `desk === null`.
5. Open desk ⇒ comms closed, radio **picker** closed, layer rail closed. Radio may keep playing. Footer command bar reachable.
6. Open G / R / L / Corpus ⇒ `desk === null`.
7. No cycle: `store.ts` does not import `comms.ts`.
8. No `src/` from this seat.

Stop. Do not implement DeskDrawer from this file.
