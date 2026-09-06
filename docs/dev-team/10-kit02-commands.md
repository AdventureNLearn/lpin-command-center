# KIT-02 COMMANDS — desk open/close (Seat 10)

Seat: 10 · band: KIT-02 · class: public-suite · date: 2026-08-29
Coordinator: Host Grok Build. Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`
This file only. Did not edit `src/`, `_out/`, or `kits/`.

Claim: **extend `CommandAction` with desk open/close. Four phrases. Do not steal `show legislatures`. Apply before the engine-null return, like corpus.**

---

## GO / NO-GO

**GO for the command contract.** Parser, union, and apply site are already the corpus shape. Desk is HUD chrome, not a globe verb.

Not GO for KIT-03 iso resolve, KIT-04 typeahead, KIT-05 `open korea` / `find AHJ in …`, or any `packages/{iso}.json` load from a phrase.

---

## 1. `CommandAction` (add this sitting)

Today (`src/lib/intel/types.ts` lines 141–156): flyTo, flyToCoord, trackNearest, cockpit, style, layer, reset, hud, detection, count, scene, next, radio, **corpus**, unknown. No `desk`.

KIT-00 / 12-kit00-contract forbade `{ type: "desk" }` in KIT-01. This is that sitting.

Add a two-variant arm. Do not put `id` on the action (KIT-04 / 05). Do not reuse `{ type: "layer"; id: "legislatures" }` or `{ type: "corpus" }`.

```ts
| { type: "desk"; on: true; system: "kept" | "permit" }
| { type: "desk"; on: false }
```

| Field | Open | Close |
| --- | --- | --- |
| `type` | `"desk"` | `"desk"` |
| `on` | `true` | `false` |
| `system` | `"kept"` (legislature) or `"permit"` (building) | omitted |

`VoiceAction` may add optional `system?: string`. `fromUnknown` maps `type === "desk"` the same way it already maps `corpus` (`runCommand.ts` line 55). Do not invent a second action name (`drawer`, `desks`, `ahjDesk`).

Store (sibling KIT-02 seats 07–09 / 31; commands need the setter):

```
desk: null | { system: "kept" | "permit"; id: string }
```

Command semantics (so open-empty ≠ closed):

| Phrase result | Store | Drawer |
| --- | --- | --- |
| open legislature / building desk | `{ system, id: "" }` | open, empty adapter, header from `system` |
| close / hide desk | `null` | closed |

Lead 06 empty-copy (“No desk selected.”) is `desk !== null && desk.id === ""`, not `desk === null`. Closed is `null`. Do not load iso JSON to fill `id`.

---

## 2. Phrases (must)

Local regex in `src/lib/intel/commands.ts` `parseCommand`. Command bar already feeds `runCommand(text)`.

| Utterance | Action |
| --- | --- |
| `open legislature desk` | `{ type: "desk", on: true, system: "kept" }` |
| `open building desk` | `{ type: "desk", on: true, system: "permit" }` |
| `close desk` | `{ type: "desk", on: false }` |
| `hide desk` | `{ type: "desk", on: false }` |

Suggested matchers (trim already happened). Open is **anchored** so KIT-04 can later take `open building desk {place}` without this sitting swallowing the place. Close is word-bounded, like corpus.

```ts
if (/^(close desk|hide desk|desk off)\b/i.test(text)) {
  return { type: "desk", on: false };
}
if (/^open (?:the )?(legislature|kept) desk\s*[.!?]*$/i.test(text)) {
  return { type: "desk", on: true, system: "kept" };
}
if (/^open (?:the )?(building|permit|ahj) desk\s*[.!?]*$/i.test(text)) {
  return { type: "desk", on: true, system: "permit" };
}
```

Optional aliases (same actions; not required): `open the legislature desk`, `open kept desk`, `open permit desk`, `open ahj desk`, `desk off`.

Do **not** add as desk-open: `show legislatures`, `show legislature`, `show legislature desk`, `open korea`, `open radio`, `open corpus`, `open desks`, bare `desks`.

---

## 3. Parse slot — after corpus, before LEG layer, before flyTo

Current `parseCommand` order (do not shuffle KIT-00/01):

1. empty → unknown
2. reset / radio (includes `open radio`) / next / cockpit / hud
3. **corpus** (`hide corpus|close corpus|corpus off` then `show corpus|open corpus|…`)
4. detection
5. **LEG/AHJ special-case** if on/off words (`on|enable|show|turn on|light up` / `off|disable|hide|turn off`)
6. scenes / styles
7. generic `LAYERS` loop (legislatures regex includes `kept desks?`)
8. counts / track
9. **flyTo** `take me to|fly to|go to|show me|open|jump to|navigate to …`
10. coords / bare places / unknown

**Insert desk immediately after corpus (step 3), before detection and before the LEG special-case.** Same HUD-chrome family as hud/corpus. Consequences:

- `open radio` / `open corpus` already returned.
- `hide desk` never reaches the LEG special-case or the `LAYERS` loop.
- `open legislature desk` never reaches flyTo (`open` + rest).
- `show legislatures` has no `desk` and uses `show`, not `open` → still step 5.

### Must not steal `show legislatures` (KIT-01 layer)

That phrase is already a layer toggle:

```
commands.ts 82–87
layerOn includes `show`
legislatures regex: legislatures? | \blegislature\b | \bleg\b | kept desks? | kept harvest
→ { type: "layer", id: "legislatures", on: true }
```

Rules that keep it:

1. Desk **open** verb is `open`, never `show`. Layer on-words stay `on|enable|show|turn on|light up`. **Do not add `open` to that list** (would steal `open legislature desk` into LEG on, and would collide with flyTo).
2. Desk matchers require the word `desk`. `show legislatures` has none.
3. Do not add `/desks?/` to the legislatures or permits `LAYERS` rows. KIT-01 already owns `kept desks?` as a **layer** synonym — leave it.
4. Close matcher is the contiguous phrase `hide desk` / `close desk`. Do **not** use `/\b(hide|close).*\bdesk\b/` — that would steal `hide kept desks` (KIT-01 layer off).

| Phrase | Keep as | Not |
| --- | --- | --- |
| `show legislatures` | `{ type: "layer", id: "legislatures", on: true }` | desk |
| `hide legislatures` | `{ type: "layer", id: "legislatures", on: false }` | desk |
| `show kept desks` | layer legislatures on (`kept desks?`) | desk |
| `hide kept desks` | layer legislatures off | `hide desk` |
| `show permits` / `hide permits` | layer `permits` | desk |
| `open korea` | flyTo `q="korea"` (KIT-05 later) | desk |
| `open radio` | radio on | desk |
| `open corpus` | corpus on | desk |
| `hide hud` | hud off | desk |
| `hide corpus` | corpus off | desk |
| `open building desk miami` | unknown / flyTo this sitting; KIT-04 later | empty permit desk |

`show legislature desk` is **not** a required phrase. Conservative: leave it as layer (has `show` + `legislature`). Do not teach `show` to open the drawer.

---

## 4. Apply before engine-null, like corpus

`applyAction` (`src/lib/intel/runCommand.ts`):

```
radio  → handle, return
corpus → setCorpusOpen, mutex, flash, return
if (!engine) return;
switch (reset / flyTo / layer / …)
```

Desk is HUD chrome. Globe engine must not be required. **Add a `desk` branch immediately after `corpus`, before `if (!engine) return`.**

```ts
if (action.type === "desk") {
  if (!action.on) {
    useIntel.getState().setDesk(null);
    flash("Desk closed");
    return;
  }
  useIntel.getState().setDesk({ system: action.system, id: "" });
  if (action.on) {
    useComms.getState().setOpen(false);
    useRadio.getState().setPicker(false);
    useIntel.getState().setCorpusOpen(false);
  }
  flash(action.system === "permit" ? "Building desk" : "Legislature desk");
  return;
}
if (!engine) return;
```

Mutex matches corpus-on (comms + radio picker) plus **close corpus**. Opening corpus should close desk from OverlayHud / `setCorpusOpen` (sibling seat). Do not `setLayer("legislatures"|"permits")`. Do not `engine.lookupPlace`. Do not import permit/kept JSON.

`fromUnknown`: if `raw.type === "desk"`, map `on === false` → close; else `system` from `raw.system` or `raw.id` when that string is `"kept"` | `"permit"` (default `"kept"` only when `on` is true).

### `runCommand` engine guard (do not make desk worse than corpus)

```
runCommand(text) {
  if (!useIntel.getState().engine) return;  // existing, line 63–64
  parse → maybe Grok → applyAction
}
```

The bar already drops corpus/radio too while Cesium is booting. KIT-02 must not add a **third** engine gate inside the desk branch. Lifting the `runCommand` guard so chrome actions parse during boot is optional and out of this seat; if done, radio / corpus / desk must all lift together.

---

## 5. File-touch map (implementer; this seat did not patch)

| File | Change |
| --- | --- |
| `src/lib/intel/types.ts` | `CommandAction` desk variants. Optional `VoiceAction.system`. |
| `src/lib/intel/commands.ts` | Four phrases after corpus, before detection / LEG special-case / flyTo. |
| `src/lib/intel/runCommand.ts` | `fromUnknown` desk. `applyAction` desk **before** `if (!engine) return`. |

Needs sibling store setter `setDesk` (seats 07–09 / 31). OverlayHud Esc / mount / mutex on G/R/L/corpus button is those seats, not a parser job. Do not bind `D` (already detection). Do not steal `L` (layers) or `G` / `R`.

**Do not touch:** `GlobeCanvas.tsx`, `globeEngine.ts`, `flatEngine.ts`, `corpus.ts` import list, `places.ts` / `places-rest.ts`, `vendor/kept/**`, `package.json`, live gevradio. `comms.ts` tagged-action allowlist still omits LEG/AHJ/corpus; command bar does not use it. Leave it unless a later seat adds `desk` there.

---

## 6. Do-not

- Do not steal `show legislatures` / `hide legislatures` / `show kept desks`.
- Do not add `open` to layer on-words.
- Do not add `/desks?/` to `LAYERS`.
- Do not parse `open korea` or `open building desk {place}` this sitting.
- Do not fly, pin, `setLayer`, or load `{iso}.json` from a desk phrase.
- Do not apply desk inside the `switch` after `if (!engine) return`.
- Do not reuse `corpusOpen` as the desk flag.
- Do not iframe keptglobal / hivepermitdev. No skill brands. No invented sittings.

---

## 7. E / I / A

**E — Evidence (this tree, this sitting)**

- `CommandAction` has `corpus` and no `desk` (`types.ts` 141–156). KIT-01 was forbidden from adding `{ type: "desk" }` (`docs/corpus-audit/12-kit00-contract.md`).
- `parseCommand` LEG special-case (`commands.ts` 82–91) + `LAYERS` legislatures row (`kept desks?`, **not** bare `desk`) already emit `{ type: "layer", id: "legislatures", on }` for `show legislatures`.
- FlyTo prefix includes `open` (`commands.ts` 136–139). **Current steal:** `open legislature desk` → `{ type: "flyTo", q: "legislature desk" }`; `open building desk` → flyTo `"building desk"`. `close desk` / `hide desk` → unknown.
- `applyAction` runs `radio` then `corpus` then `if (!engine) return` (`runCommand.ts` 80–111). Corpus does not need the globe. Desk is the same class of chrome.
- Store has `corpusOpen` + `setCorpusOpen`. No `desk` / `setDesk` yet. Lead 06 specifies `desk: null \| { system: "kept" \| "permit"; id: string }`.
- OverlayHud Esc stack: comms → radio picker → first-run → **corpus** → cockpit → track → layer rail. Corpus button mutexes comms/radio/layer rail. `D` is detection. `L` is layers.
- KIT-05 civic grammar (`open korea`, `find AHJ in …`) is explicitly later (`12-kit00-contract.md`, Lead 06).

**I — Inference**

- Empty drawer needs a chrome verb, not a layer verb. `show` already means layer-on. `open … desk` is the unused verb, except flyTo currently eats it — so desk must parse **before** flyTo.
- Tight `hide desk` (contiguous) plus requiring `desk` on open is enough to keep KIT-01 `show/hide legislatures` and `kept desks?`. A greedy `/desk/` layer row is how those phrases die.
- Apply-before-engine-null is the corpus lesson: boot or a missing Cesium token must not leave the operator unable to close HUD chrome. Putting desk in the post-engine `switch` would.

**A — Assumption**

- Drawer seats ship `setDesk` in the same implement turn so `applyAction` typechecks.
- KIT-04 will insert `open building desk {place}` **above** the anchored empty-open matcher; anchored KIT-02 leaves that slot empty.
- Operators will not treat `open legislature desk` as `LEG` on. Rail and drawer stay distinct.

---

## 8. Acceptance (verifiable when implemented)

| # | Check | Pass |
| --- | --- | --- |
| 1 | `open legislature desk` | `{ type: "desk", on: true, system: "kept" }`; drawer open; flash “Legislature desk”; **LEG rail unchanged** |
| 2 | `open building desk` | `{ type: "desk", on: true, system: "permit" }`; not flyTo |
| 3 | `close desk` / `hide desk` | `{ type: "desk", on: false }`; `desk === null` |
| 4 | `show legislatures` | still `{ type: "layer", id: "legislatures", on: true }`; does **not** open DeskDrawer |
| 5 | `hide legislatures` / `show kept desks` | still layer; not desk |
| 6 | `open korea` | still flyTo |
| 7 | `open radio` / `open corpus` / `hide hud` | unchanged |
| 8 | desk apply with `engine === null` | still sets store (same as corpus); no throw |
| 9 | no `setLayer`, no camera, no `{iso}.json`, no Rest | — |
| 10 | globe / Creedence / command bar | P0 still hold |

---

## Stop

KIT-02 commands = `{ type: "desk" }` + four phrases + apply-before-engine-null. **`show legislatures` stays KIT-01 layer.** Do not start KIT-03/04/05 grammar. Do not patch `src/` from this seat.
