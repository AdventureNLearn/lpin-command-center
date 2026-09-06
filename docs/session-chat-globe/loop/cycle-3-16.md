# Hour 3 AUDIT — seat 16 `store.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/intel/store.ts` only  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Phase:** hour 3 audit-heavy · no new features

## Verdict: **GO**

No FAIL leftover in this file. Note and stop. `src/` not edited this hour.

## Checklist

| Law | Disk | |
|-----|------|---|
| `setInsight` does not fly | `oneKey("insight")` only. No `engine.flyTo` / `lookupPlace` / `setCam`. | **PASS** |
| `setInsight` does not drop desk | Patch is `{ insight }`. Desk key not in `oneKey`. | **PASS** |
| `setInsight` does not drop comms | `useComms` not imported. `open` is not `IntelState`. | **PASS** |
| Peek ≠ Insight | `oneKey<"insight" \| "peek">` — cannot name both. | **PASS** |
| permits rail off → `permitRest` false | `setLayer`: `id === "permits" && row.on === false` → `{ layers, permitRest: false }` | **PASS** |
| Rail on does not opt Rest in | `on: true` returns `{ layers }` only. | **PASS** |
| `commandHint` everyday | `"ask Grok · canada · put on creedence · find a building desk"` — no AHJ jargon, no sample city. | **PASS** |
| `setDesk` does not close comms | `{ desk, corpusOpen }` mutex only. No `useComms`. | **PASS** |

Everyday: card is a cursor, not a yank. Serious: Rest stays drawer opt-in; comms can stay open with a desk.

## Execute

None. GO → stop.

## Not this file

OverlayHud Esc vs insight. InsightCard Look here. Drawer Rest checkbox copy.

## Ship?

no
