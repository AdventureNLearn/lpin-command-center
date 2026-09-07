# SEAT 19 — runCommand (later-kits prep)

Seat: 19 RUNCOMMAND. Band: later kits 11–25. Coordinator: Host Grok Build.
Target class: public-suite. Tree: `REPO_ROOT`.
Date: 2026-08-29. **This file only.** Did not edit `src/`, `_out/`, or `kits/`. Do not implement KIT-03+.

Claim: **corpus and radio already apply before engine-null. Desk actions must too. Grok output is only a `CommandAction` after `fromUnknown`. `applyAction` must switch every variant.**

---

## Scope

Prep for KIT-02 empty drawer and KIT-05 civic grammar. Dispatch lives in `src/lib/intel/runCommand.ts`. Parser is `commands.ts`. Types are `CommandAction` / `VoiceAction` in `types.ts`.

Not this sitting: DeskDrawer chrome, adapters, pins, Rest, `packages/{iso}.json`, live gevradio.

---

## Current dispatch (disk)

Two entry points:

| Path | File | Gate |
| --- | --- | --- |
| Command bar / cockpit key | `OverlayHud.tsx` `submit` → `runCommand(text)` | **engine must exist before parse** |
| Comms tagged `<<ACTION:…>>` | `comms.ts` → `applyAction(action)` | radio / corpus run without engine |

`runCommand` (lines 62–75):

```ts
const engine = useIntel.getState().engine;
if (!engine) return;
let action = parseCommand(text);
if (action.type === "unknown") {
  const ai = await interpretCommand({ data: { text } });
  if (ai.ok) action = fromUnknown(ai.action);
}
await applyAction(action, text);
```

`applyAction` (lines 77–181):

1. `type === "radio"` — `useRadio` play/pause/next/prev + flash. **return.** No engine.
2. `type === "corpus"` — `setCorpusOpen`, mutex comms + radio picker, flash. **return.** No engine.
3. `if (!engine) return;`
4. `switch (action.type)` — reset, flyTo, flyToCoord, style, layer, trackNearest, cockpit, hud, detection, scene, next, count, unknown.

Engine is `useIntel.engine`. Set by `globeEngine.ts` / `flatEngine.ts` after boot; **cleared to `null` on teardown** (globe ~1427, flat ~701). HMR, unmount, and boot-before-ready are real null windows.

Store today: `corpusOpen` + `setCorpusOpen`. **No `desk`.** No `src/components/desks/`.

---

## Hole 1 — command bar is stricter than applyAction

Radio and corpus are HUD. `applyAction` already treats them that way. `runCommand` does not.

If `engine` is null, the command bar never reaches `parseCommand`. `put on creedence` and `show corpus` silent-return. Comms can still `applyAction` a radio tag. The two pipes disagree.

Desk is the same class of action as corpus: store + drawer, not `EngineApi`. Putting it in the post-engine switch (or leaving `runCommand` gated) means `open desk` / KIT-05 `open korea` die whenever Cesium is not mounted.

Store-only cases already behind engine-null (related, not the required fix): `hud`, `detection`, `count`. Do not use those as a pattern for desk.

---

## Hole 2 — `fromUnknown` is the only Grok → CommandAction gate

Local `parseCommand` returns a `CommandAction`. Grok `interpretCommand` returns a `VoiceAction` (`type: string` plus optional `q`, `kind`, `on`, `style`, `id`). `runCommand` assigns `action = fromUnknown(ai.action)` only when local type is `unknown`.

`fromUnknown` today (lines 35–60), in order:

| Voice `type` | Becomes | Guard |
| --- | --- | --- |
| `flyTo` | `{ type: "flyTo", q }` | `q` stringified |
| `trackNearest` | same | kind ∈ flight \| vessel \| satellite \| iss |
| `cockpit` / `hud` / `detection` / `corpus` | same | `Boolean(on)` |
| `style` | same | `isStyle` |
| `layer` | same | `isLayer` → `id in LAYER_META` |
| `reset` / `next` | same | — |
| `scene` | same | orbital \| night \| fire |
| `radio` | same | `id` string or omit; `on` passthrough |
| `count` | same | flights \| vessels \| satellites |
| else | `{ type: "unknown", text: raw.q }` | — |

Not mapped: **`desk`**, **`flyToCoord`** (VoiceAction has no lat/lon).

If Grok emits `{ type: "desk", … }` it becomes `unknown` and the HUD shrugs. Civic grammar cannot ride the AI fallback until `fromUnknown` accepts desk.

`interpretCommand` system prompt (`world.ts` ~406) lists `flyTo|trackNearest|cockpit|style|layer|reset|hud|detection|count|scene|next|radio|unknown`. **No `corpus`. No `desk`.** Adjacent follow-on when desk ships; this seat’s contract is still: never assign a raw VoiceAction to `CommandAction`.

`comms.ts` `parseTaggedAction` is a third allowlist: radio yes; corpus no; desk no; layer ids still the seven intel layers (no legislatures / permits). Comms must not bypass `fromUnknown` with a wider JSON parse.

---

## Hole 3 — switch is not exhaustive under extension

`tsconfig` is `strict` but has no `never` default. Today the early radio/corpus returns narrow those two out, and the remaining union is fully cased. Adding `{ type: "desk" }` **does not fail typecheck** if the switch is left alone.

Failure mode:

1. Desk lands on `CommandAction`.
2. No early HUD branch.
3. `if (!engine) return` drops it, or engine exists and no `case "desk"` → silent no-op.
4. Command bar looks dead. No flash.

Required later: every `CommandAction["type"]` is a `case`, including HUD types, **or** `default: { const _: never = action }`. Prefer `never` so the next variant cannot ship as a shrug.

Do not fold desk into `layer` or `corpus`. Lead 06: `corpusOpen` stays; `desk` is a separate pointer.

---

## Desk action (later, not this sitting)

Store contract (KIT-02, lead 06):

```
desk: null | { system: "kept" | "permit"; id: string }
```

Suggested `CommandAction` (do not add until the drawer exists):

```ts
| { type: "desk"; on: false }
| { type: "desk"; on: true; system?: "kept" | "permit"; id?: string }
```

| Utterance | Owner | Action |
| --- | --- | --- |
| `open desk` / `close desk` / `show desk` / `hide desk` | KIT-02 | `on` only. `desk` stays `null`. Empty copy. No iso JSON. |
| `open korea` | KIT-05 | `system: "kept"`, `id: "kr"`. Parse **before** flyTo (`open` is already a flyTo prefix in `commands.ts` ~136). |
| `find AHJ in fort pierce` | KIT-05 | `system: "permit"`, place id after KIT-04 search. Never Rest on first paint. |
| `building desk {place}` | KIT-04 | Do not steal in KIT-02. |

`fromUnknown` for Grok (reuse VoiceAction fields; do not invent lat/lon):

- `type === "desk"`
- `on: Boolean(raw.on)` — missing `on` with an `id` still means open
- `system` from `raw.kind` when `kept` \| `permit`
- `id` when `typeof raw.id === "string"`

Apply **before** engine-null, same block as radio/corpus:

- `on === false` → `desk = null`, close drawer, flash
- else → open drawer; set `desk` only when `system` + `id` present; otherwise leave `null` (empty state)
- Mutex: close comms, radio picker, layer rail, **corpus** (CorpusPanel stays a separate deck)
- **Do not** call `engine.flyTo` / `lookupPlace` from the desk case. Camera is a later sequenced `flyTo` / `flyToCoord`, after the drawer is open
- **Do not** import `packages/{iso}.json`, fat kits, or `places-rest.ts`

---

## applyAction shape (later implement)

HUD first, globe second, never mixed:

```
switch (action.type) {
  case "radio":   /* useRadio */          return;
  case "corpus":  /* setCorpusOpen */     return;
  case "desk":    /* setDesk / drawer */  return;
  default: break;
}
if (!engine) return;
switch (action.type) {
  case "radio":
  case "corpus":
  case "desk":
    return;
  case "reset": …
  case "flyTo": …
  case "flyToCoord": …
  case "style": …
  case "layer": …
  case "trackNearest": …
  case "cockpit": …
  case "hud": …
  case "detection": …
  case "scene": …
  case "next": …
  case "count": …
  case "unknown": …
  default: {
    const _: never = action;
    void _;
  }
}
```

`runCommand` must parse + `fromUnknown` **then** `applyAction`. Drop the top-of-function `if (!engine) return`. Engine-null belongs inside `applyAction` after HUD cases.

---

## File-touch map (later sitting, not now)

| File | Why |
| --- | --- |
| `src/lib/intel/runCommand.ts` | HUD-before-engine; `fromUnknown` desk; exhaustive switch |
| `src/lib/intel/types.ts` | `{ type: "desk" }` on `CommandAction` when KIT-02 ships |
| `src/lib/intel/commands.ts` | KIT-02 `open desk` / `close desk` **before** flyTo `open`. KIT-05 civic phrases later |
| `src/lib/intel/store.ts` | `desk` + setter. Do not reuse `corpusOpen` |
| `src/lib/feeds/world.ts` | prompt union += `corpus` \| `desk` (follow-on) |
| `src/lib/intel/comms.ts` | tagged allowlist: corpus, desk, LEG/AHJ ids (follow-on; still via typed actions) |

**Do not touch from a runCommand sitting:** `GlobeCanvas.tsx`, `globeEngine.ts`, `flatEngine.ts`, `places.ts` / `places-rest.ts`, `corpus.ts` import list, `vendor/kept/**`, `package.json`.

---

## Do-not

- Do not implement KIT-03+ from this file.
- Do not plot capitals or Rest because a desk command succeeded.
- Do not steal `put on` / Creedence. Radio stays first in the local parser.
- Do not map `corpus` → desk or desk → LEG layer.
- Do not assign `ai.action` to `CommandAction` without `fromUnknown`.
- Do not add a `default` that flashes unknown for unhandled typed actions — that hides exhaustiveness failures.
- Do not iframe keptglobal / hivepermitdev. Do not unmount the globe for a desk route.

---

## E / I / A

**E — Evidence**

- `runCommand.ts` 62–64: `if (!engine) return` before `parseCommand`.
- `applyAction` 80–110: radio and corpus return before 111 `if (!engine) return`.
- `fromUnknown` 35–60: maps radio + corpus; else `unknown`. No desk. No flyToCoord.
- `CommandAction` (`types.ts` 141–156): flyTo, flyToCoord, trackNearest, cockpit, style, layer, reset, hud, detection, count, scene, next, radio, corpus, unknown. **No desk.**
- Store: `corpusOpen` default false. No `desk`. `src/components/desks/` absent.
- `commands.ts` 73–76: corpus on/off. 136–139: `open …` is flyTo. No desk phrases.
- `interpretCommand` prompt: no corpus, no desk.
- `comms.ts` `parseTaggedAction`: radio yes; corpus/desk/LEG/AHJ no.
- Engines set `engine` null on cleanup (`globeEngine.ts` ~1427, `flatEngine.ts` ~701).
- OverlayHud command bar calls `runCommand` only (`submit` ~214).
- Lead 06: KIT-02 store is `desk: null | { system, id }`; CorpusPanel stays; empty drawer loads no `{iso}.json`.
- KIT-05 grammar (`docs/corpus-audit/13-drawer-contract.md`): `open korea`, `find AHJ in fort pierce`.

**I — Inference**

- Radio and corpus are the proof that HUD commands must not depend on Cesium. Desk is a third HUD command. The command-bar early return already breaks the first two during engine-null; copying that gate to desk would ship a drawer that only opens while Earth is mounted.
- Grok will emit civic `type` strings once KIT-05 exists. Without `fromUnknown`, those strings never become `CommandAction` and the operator sees a shrug instead of an empty desk.
- A non-exhaustive switch lets `{ type: "desk" }` compile and do nothing. `never` is the cheap fence.
- Camera fly is a different action. Sequencing flyTo after desk-open is KIT-05, not a reason to hold desk behind `EngineApi`.

**A — Assumption**

- KIT-02 implementers add `open desk` / `close desk` only, `desk === null`, honesty copy, no package load.
- KIT-05 later steals `open {place}` from flyTo for kept iso2, after the HUD branch exists.
- `fromUnknown` remains the single Grok coercion; comms tags stay a typed allowlist, not a back door.
- This seat does not patch `src/`. Host / KIT-02 / KIT-05 write the diff from this contract.

---

## Stop

Prep only. **Corpus/radio already apply before engine-null; desk must too.** Coerce Grok with `fromUnknown`. Switch every `CommandAction`. Do not start DeskDrawer, KIT-03 adapters, or pins from seat 19.
