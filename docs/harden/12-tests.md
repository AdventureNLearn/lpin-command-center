# SEAT H12 — TESTS

Seat: **H12 TESTS** · harden pass · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
This sitting writes: **this file only**. No `src/` edits. No new `*.test.*`. Coordinator adds tests later.

**Claim:** Catalog integrity is the only civic node test. `parseCommand` has none. Five cheap `node --test` cases would lock desk/layer order, Creedence, core parse, ROOT, and the Rest fence.

**Verdict:** PREP READY. Do not implement this sitting.

---

## E — Evidence

### `npm test` surface (`package.json`)

```
node --test 'scripts/**/*.test.mjs'
&& node --experimental-strip-types --test
     src/lib/app-data/app-data.test.ts
     src/lib/auth/gate-identity.test.ts
```

Civic coverage under that glob is one file: `scripts/permit/catalog-integrity.test.mjs`. No `commands.test.*`. No `parseCommand` string in any `*.test.mjs` / `*.test.ts`.

`docs/corpus-audit/smoke-corpus.mjs` is a manual HUD/index check. It is **not** on the `test` script.

This sitting ran `node --test scripts/permit/catalog-integrity.test.mjs`: **9 pass / 0 fail**, ~113 ms.

### ROOT path (load-bearing)

`scripts/permit/catalog-integrity.test.mjs` lines 7–11:

```js
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function read(rel) {
  return readFileSync(`${ROOT}/${rel}`, "utf8");
}
```

| Step | Value |
| --- | --- |
| `import.meta.url` | `…/scripts/permit/catalog-integrity.test.mjs` |
| `dirname` | `…/scripts/permit` |
| `..` | `…/scripts` |
| `..` | repo root (`groks-eye-view-next`) |

Two-up is correct **only while** the file stays in `scripts/permit/`. A move to `scripts/` would point ROOT at `scripts/` and every `read()` would 404. Forward-slash `${ROOT}/${rel}` is what Windows just used successfully.

### places-core parse (text, not ESM)

The test does **not** `import { CORE_PLACES }`. It `readFileSync`s four catalog files plus `states.ts` and regex-parses them. Rest (~3.3 MB) stays a string.

```js
function parseCorePlaces(src) {
  const re =
    /id:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]+)",\s*kind:\s*"(city|county|district)",\s*state:\s*"([A-Z]{2})"/g;
  // …
}
```

Called as `parseCorePlaces(read("src/lib/permit/places-core.ts"))`.

Coupling (**E**): every Core desk today puts `id`, `name`, `kind`, `state` on **one line**, in that order (`places-core.ts` `CORE_PLACES`). `kind` includes `district` (`dc-washington`). extraLinks `{ id: "bldg", label: … }` do not match (no `name`/`kind`/`state`).

Floor, not exact:

```js
assert.ok(core.length >= 70, `core places too small: ${core.length}`);
```

`vendor/kept/_out/permit-index.json` `counts.core` = **79**. Same-line `id`+`name` rows in `places-core.ts` = **79**. Slack = 9 deleted Core rows would still pass.

Sibling parsers: `parseFactoryPlaces` for extra/more/rest (`p("id", …)`); `parseCoreUrls` for `portalUrl|departmentUrl: "https:…"`. Factory URL test walks extra+more+rest **from the parse**, not from an import.

### `parseCommand` — no unit tests

`export function parseCommand` lives only in `src/lib/intel/commands.ts` (line 33). Call site: `runCommand.ts` line 77. Docs mention it (`docs/dev-team/10-kit02-commands.md`, `19-runcommand.md`). **Zero test files.**

Civic order on disk now (after corpus, before flyTo `open`):

| Phrase | Action |
| --- | --- |
| `close desk` / `hide desk` / `desk off` / `close drawer(s)` | `{ type: "desk", on: false }` |
| `open legislature desk` / `open kept desk` | `{ type: "desk", on: true, system: "kept" }` |
| `open building desk` / `open permit desk` / `open ahj desk` | `{ type: "desk", on: true, system: "permit" }` |
| `show legislatures` (has `show`, no `desk`) | `{ type: "layer", id: "legislatures", on: true }` |
| `put on creedence` / `ccr` | `{ type: "radio", id: "ccr", on: true }` |

Module graph if someone `import`s `parseCommand` from Node:

- `@/lib/kept/desks` — Vite `import.meta.glob` on `vendor/kept/kits/*/meta.json` + `@/` alias (tsconfig `paths` only)
- `@/lib/permit/playbooks` — same `@/` miss
- `./radio` — zustand store (Node-ok, not needed for desk/layer asserts)

**E:** a real `parseCommand("open legislature desk")` call is not cheap until a loader or a split. Source-scan of `commands.ts` is cheap and matches the catalog-integrity house style.

### What already tests (do not duplicate)

Script tests: brand-check, browser-smoke-verdict, check-auth-invariant, grok-pwa-plugin, migration-plan, preview, sign-out-plan, with-app-env, write-atomic, **catalog-integrity**.  
Src tests: app-data, gate-identity.  
Not tests: Playwright MCP, `scripts/browser-smoke.mjs`, Cesium boot.

---

## I — Interpretation

Catalog tests prove **file text** still looks like a catalog. They do not prove the command bar. They do not prove Core count 79. They do not prove ROOT still points at the repo if the test file moves. They do not prove HUD/search-lite stay Rest-free (`smoke-corpus.mjs` checks HUD but is off `npm test`).

`>= 70` is a silent-undercount hole: a Prettier wrap that splits `id`/`name`/`kind`/`state` across lines would drop `core.length` toward 0 and only fail if it fell under 70. An exact `=== 79` plus an independent `id`+`name` count would catch format drift.

KIT-00/02 landmines that have no machine check today:

- `show legislatures` stolen as desk
- `open legislature desk` falling through to flyTo `open`
- `put on creedence` lost
- empty string not `{ type: "unknown" }`

Do not launder a source-scan as a runtime parse. Label those tests **contract/source**. A later sitting may add a real import after desks is stubbed or `parseCommand` no longer pulls Vite-only modules.

Cheap means: `node:test` + `node:assert/strict` + `readFileSync`; no Playwright; no Cesium; no `import` of `places-rest.ts` / `places.ts` / `catalog.ts`; new files under `scripts/**/*.test.mjs` so they auto-join `npm test` without a `package.json` edit.

---

## A — Action

Coordinator may add these **five** tests. This seat does not implement them. Do not start KIT-06 from this file. Do not rewrite catalog rows.

| # | Test | File (suggested) | Assert | Cheap because |
| --- | --- | --- | --- | --- |
| 1 | **parseCommand desk vs layer (source)** | `scripts/intel/parse-command.test.mjs` | `commands.ts` still contains, in this order inside `parseCommand`: close-desk regex → open `(legislature\|kept) desk` → open `(building\|permit\|ahj) desk` → LEG special-case `legislatures?` **and** `!/\bdesk\b/` → flyTo `open` group. `show legislatures` must not appear as a desk arm. | `readFileSync` only. No `@/`, no glob, no Rest. |
| 2 | **parseCommand KIT-00 survival (source)** | same file | CCR arm `put on` / `creedence` / `id: "ccr"` still **before** generic `radio on`. Corpus show/hide arms still present. Empty early-return `{ type: "unknown"` still first body statement after trim. | Same. Locks Creedence + corpus so civic regex inserts cannot steal them. |
| 3 | **parseCorePlaces exact 79 + format tripwire** | `scripts/permit/catalog-integrity.test.mjs` (add, do not replace) | `core.length === 79` (bind `permit-index.json` `counts.core`, not `>= 70`). Independent count of `id: "…", name:` equals `core.length` (catches a wrap that the kind/state regex misses). `parseCoreUrls.length >= 79` stays. | Already parsed. No ESM of `places-core.ts`. |
| 4 | **ROOT two-up tripwire** | same catalog file or `scripts/permit/root-path.test.mjs` | `existsSync(join(ROOT, "package.json"))`, `join(ROOT, "src/lib/permit/places-core.ts")`, `join(ROOT, "src/lib/intel/commands.ts")`. `basename(dirname(fileURLToPath(import.meta.url))) === "permit"` so a move fails closed. | `existsSync` only. |
| 5 | **Rest fence + featured Core ids** | `scripts/permit/search-lite-fence.test.mjs` | `search-lite.ts`, `permit-pins.ts`, `OverlayHud.tsx`, `commands.ts` contain neither `places-rest` nor `REST_PLACES` nor `from "./places"`. `search-lite.ts` still imports `places-core` / `places-extra` / `places-more`. All 12 `FEATURED_AHJ_IDS` appear in `parseCorePlaces` ids. | Text scan + existing Core parse. Does not import Extra/More/Rest modules. Lifts the HUD half of `smoke-corpus.mjs` onto `npm test`. |

### Do not add (not cheap / wrong sitting)

| Idea | Why not |
| --- | --- |
| `import { parseCommand } from "../../src/lib/intel/commands.ts"` | Vite `@/` + `import.meta.glob` in `desks.ts`. Fail closed or pull kits. |
| `import { PLACES } from "../../src/lib/permit/places.ts"` | Static Rest concat. First-paint law. |
| Playwright command-bar smoke | Parked. Seat 31 is manual. |
| Exact extra/more/rest counts in T3 | Factory parse already floors them; Rest walk is already in catalog-integrity. Do not print Rest ids. |
| `package.json` `test` glob change | Unnecessary if files live under `scripts/**/*.test.mjs`. |

### Later (not this sitting)

If coordinator wants a **runtime** `parseCommand()` call: add a Node `--import` alias for `@/` **and** stub `desks.ts` / `playbooks.ts`, or split the regex table from Vite-only imports. Then assert the table in E (`open legislature desk` → kept desk, `show legislatures` → LEG layer, `put on creedence` → `ccr`). Until then, T1–T2 are source contracts. Label them **I** if cited as “parser behavior,” **E** if cited as “these regexes still exist in this order.”

---

## Basis key

| Mark | Meaning |
| --- | --- |
| **E** | Read on disk this sitting, or the 9-pass catalog run. |
| **I** | Follows from E (ROOT move breaks reads; `>= 70` hides Core loss; Node cannot cheaply import `parseCommand`). |
| **A** | Coordinator work after this audit. Five tests above. Not implemented here. |
