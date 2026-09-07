# H11 — STORE / TYPES

Seat: **H11 STORE/TYPES**. Harden pass. Coordinator: Host Grok Build.
Tree: `REPO_ROOT`
Date: 2026-08-29. **This file only.** Did not edit `src/`.

Claim: **`CommandAction` variants all reach `applyAction`. Desk ↔ corpus mutex is store-atomic, HUD-leaky. No `permitRest` flag. Switch has no `never` default.**

---

## Verdict

| Check | State |
| --- | --- |
| Every `CommandAction` type has a handler | **PASS** — 19 types; 7 HUD early-returns + 12 post-engine cases. No silent typed arm today. |
| Early returns before `if (!engine) return` | **PASS for HUD civic** — radio, corpus, desk, permitSearch, keptOpen, keptCompare, permitPlaybook. **WATCH** — `layer` / `hud` / `detection` / `count` / `unknown` are store-or-flash only but sit behind engine-null. |
| desk vs `corpusOpen` mutex | **PASS in `store.ts`.** **WATCH in OverlayHud** — keys close desk; G/R/L **buttons** do not; layer rail has no `!desk`. |
| `permitRest` for KIT-06 | **FAIL / missing.** Store has `layers.permits.on` only. Rest opt-in has nowhere to hang. |
| Exhaustive switch | **FAIL / hole.** No `default: { const _: never = action }`. Next variant compiles as a silent no-op. |

**GO for KIT-02 desk field as shipped.** `desk` exists, setters mutex corpus, apply is before engine-null.

**NO-GO to wire KIT-06 Rest pins** until `permitRest: false` lands and `layers.permits.on` is forbidden as the Rest-load trigger.

---

## Scope

Read this sitting: `src/lib/intel/store.ts`, `types.ts`, `runCommand.ts` (`runCommand` + `applyAction` + `fromUnknown`), `commands.ts`, OverlayHud mutex call-sites, `comms.ts` tagged allowlist, globeEngine subscribe.

Not this sitting: engine pin loops, `places-rest.ts` import split, DeskDrawer chrome, `src/` patches.

---

## 1. Store today (`IntelState`)

`src/lib/intel/store.ts`. Civic overlay flags:

| Field | Type | Default | Setter |
| --- | --- | --- | --- |
| `corpusOpen` | `boolean` | `false` | `setCorpusOpen` |
| `desk` | `null \| { system: "kept" \| "permit"; id: string }` | `null` | `setDesk` |
| `layers.legislatures` | `LayerState` | `on: false` | `setLayer` |
| `layers.permits` | `LayerState` | `on: false` | `setLayer` |
| **`permitRest`** | **absent** | — | — |

`desk` is inline on `IntelState`. Seat 09 asked for exported `DeskSel` / `DeskSystem`. Not exported. Harmless for compile; KIT-06/07 importers will re-inline.

`defaultLayers()` is `Record<LayerId, LayerState>` — exhaustive. New `LayerId` fails typecheck until a row exists. That fence does **not** exist for Rest opt-in, because Rest is not a layer id (and must not become one: `permits` already means the AHJ rail).

No persist except `FIRST_RUN_KEY`. Desk and corpus reset on reload. Correct.

---

## 2. `CommandAction` inventory vs handlers

`types.ts` 141–162. Nineteen `type` discriminants (desk is two arms of one `type`):

| `type` | Parser | `fromUnknown` | `applyAction` | Engine required? |
| --- | --- | --- | --- | --- |
| `flyTo` | yes | yes (`q`) | switch | yes (`lookupPlace`) |
| `flyToCoord` | yes (lat/lon regex) | **no** | switch | yes (`flyTo`) |
| `trackNearest` | yes | kind ∈ flight\|vessel\|satellite\|iss | switch | yes |
| `cockpit` | yes | `Boolean(on)` | switch | yes |
| `style` | yes | `isStyle` | switch | yes |
| `layer` | yes | `isLayer` → `id in LAYER_META` | switch | **store-only, gated** |
| `reset` | yes | yes | switch | yes |
| `hud` | yes | `Boolean(on)` | switch | **store-only, gated** |
| `detection` | yes | `Boolean(on)` | switch | **store-only, gated** |
| `count` | yes | kind ∈ flights\|vessels\|satellites | switch | **store-only, gated** |
| `scene` | yes | `isScene` | switch | yes (`playScene`) |
| `next` | yes | yes | switch | yes |
| `radio` | yes | yes | **early return** | no |
| `corpus` | yes | yes | **early return** | no |
| `desk` | yes | yes | **early return** | no |
| `permitSearch` | yes | `q` | **early return** | optional `lookupPlace` |
| `keptOpen` | yes | `id ?? q` as iso2 | **early return** | optional `flyTo` |
| `keptCompare` | yes | `q` split on `,` | **early return** | no |
| `permitPlaybook` | yes | `id ?? q` as kind | **early return** | no |
| `unknown` | yes | fallback | switch | **flash-only, gated** |

**All current variants are handled.** The civic HUD family is in front of engine-null, matching seat 19 / 10. Globe verbs stay in the switch.

### Early-return block (`applyAction` 92–171)

Order: radio → corpus → desk → permitSearch → keptOpen → keptCompare → permitPlaybook → `if (!engine) return` → switch.

`runCommand` (76–87) no longer top-gates on engine. Command bar can parse `open corpus` / `open legislature desk` / `put on creedence` during boot. That is the intended lift.

### Still behind engine-null (WATCH)

`layer`, `hud`, `detection`, `count`, `unknown` do not call `EngineApi`. During HMR / teardown / boot-before-ready they silent-return. Consequence for this seat: `show permits` / `show legislatures` / `hud off` die while Cesium is null. Do not copy that pattern onto `permitRest`. If Rest opt-in is a store flag, apply it **before** engine-null.

`keptOpen` already turns LEG on (`setLayer("legislatures", { on: true })`) without waiting for engine. Permit Rest must not get an equivalent “layer on ⇒ dump.”

---

## 3. Exhaustive-switch holes

`tsconfig` is `strict`. No `noFallthroughCasesInSwitch`. No `never` default. ESLint does not enforce exhaustiveness.

Control flow today:

1. Seven `if (action.type === …) return` arms narrow those types out.
2. `switch (action.type)` lists the remaining twelve.
3. No `default`.

So **this sitting typechecks**. Adding `{ type: "permitRest" }` (or any new arm) to `CommandAction` will **not** fail `tsc` if both the if-chain and the switch are left alone.

Failure mode (seat 19, still live):

1. New variant lands on the union.
2. No early HUD branch.
3. `if (!engine) return` drops it, **or** engine exists and no `case` → silent no-op.
4. Command bar looks dead. No flash.

Required later (host, not this file):

```ts
default: {
  const _: never = action;
  void _;
}
```

Prefer `never` over a `default` that flashes unknown. Flashing unknown **hides** the miss.

HUD types that already returned should still appear as empty `case "radio": case "corpus": … return` in the post-engine switch so the `never` assignment stays honest, **or** keep the if-chain and `never`-assert after it. Either fence. Today there is neither.

`fromUnknown` is a second non-exhaustive table (if-chain on `raw.type: string`). Missing maps:

| Voice `type` | Becomes |
| --- | --- |
| `flyToCoord` | `unknown` (VoiceAction has no lat/lon) |
| anything not listed | `unknown` |

Civic types **are** mapped (desk, permitSearch, keptOpen, keptCompare, permitPlaybook, corpus). Grok prompt (`world.ts` ~406) still lists only `flyTo|trackNearest|cockpit|style|layer|reset|hud|detection|count|scene|next|radio|unknown`. No corpus, desk, civic grammar. AI fallback cannot emit those types until the prompt union grows. Local parser already emits them; that is enough for the bar.

`comms.ts` `parseTaggedAction` is a **third** allowlist: radio yes; corpus / desk / permitSearch / keptOpen / keptCompare / permitPlaybook / hud / detection / count / scene / flyToCoord **no**. Layer ids still the seven intel layers (no `legislatures` / `permits`). Comms can `applyAction` a typed object without `fromUnknown`. Do not widen that JSON parse as a back door for Rest.

`VoiceAction` is `{ type: string; q?; kind?; on?; style?; id? }`. No `system`, `iso2`, `lat`, `lon`, `a`/`b`. `fromUnknown` stuffs civic fields into `id`/`q`/`kind`. Fragile, not a silent miss today.

---

## 4. Desk vs `corpusOpen` mutex

### Store-owned (PASS)

```
setCorpusOpen: (corpusOpen) =>
  set((s) => ({ corpusOpen, desk: corpusOpen ? null : s.desk })),
setDesk: (desk) =>
  set((s) => ({ desk, corpusOpen: desk ? false : s.corpusOpen })),
```

| Call | Result |
| --- | --- |
| `setDesk(non-null)` | `corpusOpen: false` |
| `setCorpusOpen(true)` | `desk: null` |
| `setDesk(null)` | does **not** open corpus |
| `setCorpusOpen(false)` | does **not** open desk |

Visibility: DeskDrawer `if (!desk) return null`. CorpusPanel `if (!open) return null`. OverlayHud mounts both (`701–702`). Same-store mutex is what keeps the two `.panel` drawers from stacking. Do not reuse `corpusOpen` for desks.

`applyAction` corpus-on does not call `setDesk(null)` — it relies on the setter. Desk-on / permitSearch / keptOpen / keptCompare / permitPlaybook all `setDesk(...)` and so close corpus. Correct. Store does not import `comms.ts` (no cycle).

### Session-owned (WATCH)

Same-store cannot close comms, radio picker, or HUD-local `drawerOpen`. That is OverlayHud + `applyAction`.

| Open path | Closes corpus | Closes desk | Closes comms | Closes picker | Closes layer rail |
| --- | --- | --- | --- | --- | --- |
| `setDesk` / civic apply | yes (store) | — | yes (apply) | yes (apply) | **no** |
| `setCorpusOpen(true)` / corpus apply | — | yes (store) | yes (apply) | yes (apply) | HUD corpus **button** yes; command no |
| Esc | after desk | after first-run | first | second | last |
| Key **G** / **R** (open) | yes | **yes** | yes | yes | yes |
| Button comms / radio (open) | yes | **no** | yes | yes | yes |
| Key **L** | yes | **yes** (always, even on close) | yes | yes | toggle |
| Button Layers | yes | **no** | yes | yes | toggle |
| Corpus button (open) | — | yes (store) | yes | yes | yes |

Layer rail render (`OverlayHud` 395):

```
drawerOpen && !chatOpen && !radioOpen && !corpusOpen
```

**No `!desk`.** Track card (520) **does** have `!desk`.

No `useEffect(() => { if (desk) setDrawerOpen(false) })`. A command `open legislature desk` while the rail is up leaves **both** panels up (left rail + right desk). Seat 09 required that close.

Button vs key split: operator on a pointer device can open comms or radio **over** an open desk. Keys cannot. Store mutex does not save this; `useComms.open` / `useRadio.picker` are other stores.

Esc order matches seat 09: comms → picker → first-run → **desk** → corpus → cockpit → track → rail.

---

## 5. Missing `permitRest` (KIT-06)

KIT-06 (leads 03 / 20 / 21, harden README): Rest is a **count** (14925) until explicit opt-in search / state pack / county-scale camera. Orbit Rest entities = 0. `layers.permits.on` already means “AHJ rail lit.” It must **not** mean “load `places-rest.ts`.”

Disk today:

- `IntelState` has no `permitRest`, `restOptIn`, `restEnabled`.
- `CommandAction` has no Rest arm.
- `globeEngine.ts` subscribe watches seven intel layers + **legislatures**. **No `layers.permits` branch.** `flatEngine.ts` same: LEG marks, no AHJ marks.
- Permit search is `search-lite.ts` (Core+Extra+More only). `applyAction` `permitSearch` does not import Rest.

That empty AHJ draw is correct **until** someone wires KIT-06 onto `if (s.layers.permits.on)`. Without a second flag, that `if` is the 16k fuse.

### Flag to add (host, later sitting — not this file)

```ts
permitRest: boolean;          // default false
setPermitRest: (v: boolean) => void
```

Rules:

| Rule | Why |
| --- | --- |
| Default **`false`** | First paint, orbital camera (`cam.height` 20e6), and `show permits` must stay Rest-off. |
| Do **not** persist | Same as desk. Reload must not resurrect Rest. |
| `setLayer("permits", { on: true })` does **not** set `permitRest` | Rail ≠ Rest dump. |
| `setLayer("permits", { on: false })` **must** force `permitRest: false` | Layer off is the hard stop. |
| `setPermitRest(true)` only after explicit Rest search **or** county-scale (`cam.height ≤ 80_000`) plus operator opt-in | KIT-06 contract. |
| Engine Rest branch | `layers.permits.on && permitRest && !orbit && sourced coords`. All four. Missing coords ⇒ no pin (PlaceDesk has no lat/lon). |
| No `CommandAction { type: "permitRest" }` this kit | A voice dump (`show rest` / `load rest`) is how 14925 lands. Opt-in is a drawer control or a typed search path, not a globe verb. |
| Do not add `LayerId: "rest"` | Would require `defaultLayers` + rail row + `LAYER_META`. Rest is not an open-source live layer. |

`setPermitRest` may live next to `setDesk`. It must **not** open a desk or corpus. Mutex is irrelevant; this flag is a load gate, not a panel.

Until the flag exists, KIT-06 **must not** subscribe to `layers.permits.on` for entity add. Draft `permit-pins.ts` may stay unwired.

---

## 6. Type nits (same files, not blockers)

- `desk` shape not exported (`DeskSel` / `DeskSystem` from seat 09). Inline union is the live contract.
- `VoiceAction` is a stringly bag. Civic `fromUnknown` overloads `id` / `q` / `kind`. Typed `CommandAction` is the real union; keep coercion in `fromUnknown` only.
- `EngineApi` has no desk / Rest methods. Correct: chrome is store, Rest is a later gated subscribe.
- `Kind` includes `"permit"` / `"legislature"`. Tracked LEG contacts exist (`keptContact`). No permit `Contact`s yet — do not mint them from Rest rows without coords.

---

## E / I / A

**E — Evidence (this tree, this sitting)**

- `store.ts` 42–43, 115–116, 152–155: `corpusOpen` + `desk`; setters mutex one way each; no `permitRest`.
- `types.ts` 141–162: 19 `CommandAction` types including desk two-arm, permitSearch, keptOpen, keptCompare, permitPlaybook. No Rest type.
- `runCommand.ts` 76–87: parse → maybe Grok `fromUnknown` → `applyAction`. No top-level engine gate.
- `runCommand.ts` 89–171: seven HUD early-returns, then `if (!engine) return` (171), then switch 173–240. Switch cases = reset, flyTo, flyToCoord, style, layer, trackNearest, cockpit, hud, detection, scene, next, count, unknown. **No `default` / `never`.**
- `fromUnknown` 36–74: maps civic types + radio/corpus; **not** `flyToCoord`. Else `unknown`.
- `tsconfig.json`: `strict` true; no exhaustiveness flag.
- OverlayHud Esc 113–127: desk before corpus. Keys G/R/L close desk (136–176). Buttons comms/radio/layers (299–366) close corpus, **not** desk. Rail gate 395 omits `!desk`. Track card 520 includes `!desk`. Mounts CorpusPanel + DeskDrawer 701–702.
- `globeEngine.ts` 1355–1395: subscribe flights…launches + legislatures. **Zero `layers.permits`. Zero `permitRest`.**
- `search-lite.ts`: SEARCHABLE = Core+Extra+More. Rest file not imported from intel store/runCommand.
- `world.ts` 406: Grok type union omits corpus/desk/civic.
- `comms.ts` 94–144: tagged allowlist omits civic HUD types and LEG/AHJ layer ids.
- Harden README: KIT-06 zoom gate is the next kit; `permit-pins.ts` draft, engine not wired.

**I — Inference**

- Handlers cover the **current** union. The hole is **extension**: without `never`, KIT-06 (or a careless Rest command) can join `CommandAction` and do nothing — or worse, a later subscribe can treat `layers.permits.on` as permission to plot 14925 because no second flag exists to say no.
- Desk ↔ corpus is solved at the zustand object. OverlayHud buttons were updated for corpus in KIT-01 and only half-updated for desk (keys yes, clicks no). That is a HUD bug, not a store-shape bug, but it is the mutex the operator actually feels.
- `layer` behind engine-null is the wrong analog for Rest. Rest opt-in is a store boolean. If it is applied in the post-engine switch, boot/HMR cannot even *record* the opt-in, and a later engine subscribe that keys off `permits.on` alone will load Rest as soon as the globe appears.
- Two flags is the cheap fence: rail (`layers.permits.on`) vs dump (`permitRest`). One flag cannot express “AHJ on at orbit, Rest still a count.”

**A — Assumption**

- Host adds `permitRest: false` + setter **before** any `layers.permits` entity loop. Coordinator does not invent Census coordinates.
- Host adds `default: never` when the next `CommandAction` arm is touched, not as a drive-by in an unrelated kit.
- OverlayHud button mutex (`setDesk(null)` on G/R/L open, rail `&& !desk`, `useEffect` close rail on desk) is a HUD seat, not a store field.
- This seat does not patch `src/`. No Rest import. No pin loop. No live gevradio.

---

## Actions (host, later `src/` turn)

1. **Store.** Add `permitRest: boolean` default `false` and `setPermitRest`. On `setLayer("permits", { on: false })`, also `permitRest: false`. Do not flip it from `setLayer(..., { on: true })`.
2. **Switch.** After HUD early-returns, `default: { const _: never = action }`. Keep civic applies **before** engine-null.
3. **Mutex HUD.** G/R/L **buttons** must `setDesk(null)` when opening, matching the keys. Layer rail: `&& !desk`. `if (desk) setDrawerOpen(false)`.
4. **Do not** add `{ type: "permitRest" }` or `LayerId: "rest"`. Do not subscribe globe to Rest until (1) exists and the four-part engine gate is written.
5. Optional: lift `layer` / `hud` / `detection` / `count` / `unknown` above engine-null (same class as corpus). Not required to ship `permitRest`.

---

## Do-not

- Do not reuse `corpusOpen` for desks or Rest.
- Do not treat `layers.permits.on` as Rest permission.
- Do not import `places-rest.ts` from `store.ts` / `types.ts` / `runCommand.ts`.
- Do not assign raw `VoiceAction` or comms JSON to `CommandAction` without a typed gate.
- Do not add a switch `default` that flashes unknown for unhandled typed actions.
- Do not iframe keptglobal / hivepermitdev. Do not plot 16165 / 14925.

---

## Stop

H11 = store/types audit. **Variants handled; mutex store-solid HUD-leaky; `permitRest` missing; switch not exhaustive.** File written. No `src/` edit.
