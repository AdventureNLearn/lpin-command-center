# Hour 0 — seat 16 DEVELOP

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Owned file:** `src/lib/intel/store.ts`  
**Clock:** `loop/CLOCK.md` · hour 0 · phase develop  
**OPSEC:** N/A (sandbox, no public surface)

## Assigned

`setInsight` must not clear desk / comms / engine. Peek independent.

## Change

`oneKey<"insight" | "peek">` returns `Pick<IntelState, K>` — a single-key Zustand merge.

| Setter | Patch | Does not touch |
|--------|-------|----------------|
| `setInsight` | `{ insight }` | `desk`, `engine`, `peek`, `tracked`, layers, cockpit |
| `setPeek` | `{ peek }` | `insight` (timeout / hover cannot dismiss the card) |

Comms is not on `IntelState`. `open` lives on `useComms` in `comms.ts`. This file still does not import it. Dismiss remains `setInsight(null)` — no `dismissInsight()`, no `setEngine(null)`, no `setDesk(null)`.

`setDesk` still only mutexes `corpusOpen`. `setEngine` still `{ engine }`.

## Verify

- `tsc --noEmit` **PASS** (node `typescript/bin/tsc`, 2026-08-30 hour 0).
- Peek ≠ Insight: two keys, two setters, `oneKey` cannot name both.
- No live gevradio. No Rest dump. No insind.

## Leftovers (not this hour)

`setLayer("permits", { on: false })` still does not force `permitRest: false` (harden/11). OverlayHud Esc vs insight is a HUD seat.
