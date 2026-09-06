# Cycle 1 — seat 16 iterate → audit → forecast → execute

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/intel/store.ts` only  
**Clock:** hour 1 · `PHASE.json` iterate-audit-forecast-execute  
**Audiences:** `USEFUL-TOOL.md` everyday + serious

## Iterate (hour 0 leftover)

Hour 0 fenced `setInsight` / `setPeek` via `oneKey`. Dismiss still `{ insight }` only. Comms stays `useComms`.

Named leftover: `setLayer("permits", { on: false })` did **not** force `permitRest: false` (`harden/11-store.md`). OverlayHud Esc vs insight is a HUD seat — not this file.

Command hint already has no sample city (`ask Grok · canada · put on creedence · find AHJ in a place you type`). Kept.

## Audit

| Audience | Store law | Disk |
|----------|-----------|------|
| Everyday: card not yank | `setInsight` does not call engine | **PASS** `oneKey("insight")` |
| Everyday: Look here optional | Fly is card/HUD, not this file | N/A (seat 03) |
| Everyday: honest empty / hole | desks are ids; store does not invent rows | **PASS** |
| Serious: no Rest dump | rail ≠ Rest; layer off must kill Rest | **FAIL** until this execute |
| Serious: comms open with desk | `setDesk` does not import `useComms` | **PASS** |
| Serious: no auto-zoom / auto-truth | store has no camera apply | **PASS** |
| Peek ≠ Insight | two keys, `oneKey` cannot name both | **PASS** |
| 33 kits | `pinStream` still `keptDeskByIso` | **PASS** |

`setLayer(..., { on: true })` still must **not** set `permitRest`. `setPermitRest` still must **not** open desk / corpus / clear insight / drop engine.

## Forecast

This execute: permits rail off → `permitRest: false`. One fuse.

Not this file: empty-state desk copy, bubble chip labels, InsightCard Look here, HUD Esc vs insight, `pickAhjCore` chat path.

## Execute

`setLayer`: if `id === "permits"` and merged `on === false`, patch `{ layers, permitRest: false }`. Rail on leaves Rest as the last explicit opt-in (drawer checkbox / command-bar Rest search).

`setPermitRest` remains `{ permitRest }` only.

## Verify

`tsc --noEmit` **PASS** (node `typescript/bin/tsc`, cycle 1).

## Ship?

no · localhost · cycle 1
