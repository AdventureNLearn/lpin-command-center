# Seat 06 — Store cursor

**Class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Evidence:** `src/lib/intel/store.ts` (Zustand `useIntel`)  
**Spine:** `docs/session-chat-globe/00-SPINE.md`  
**This sitting:** no `src/` writes. Live gevradio frozen. No remix. No Bogpulse.

## Verdict: GO

Four cursors are already separate keys. Insight is one slot. Dismiss is `setInsight(null)` and patches only that key. Comms is a different store (`useComms` in `comms.ts`). Globe mount is `engine: EngineApi | null`. This file’s law is already true on disk.

## Four objects — do not merge

| Cursor | Store | Meaning | Not |
|--------|-------|---------|-----|
| `insight` | `Insight \| null` (L47) | Conversation card. Last write wins. | Not Peek. Not a homepage. |
| `peek` | `Peek \| null` (L46) | Pointer hover `{ contact, x, y }` (L12) | Not conversation. 5s / Grab is UI. |
| `desk` | `{ system, id } \| null` (L50) | Civic drawer: kept / permit / jobsite | Mutex only vs `corpusOpen` (L173–176). |
| `tracked` | `Tracked \| null` (L45) | Live follow lock (`Contact`) | Camera/entity, not the card. |

Isolated setters (L168–170): `setTracked` → `{ tracked }`; `setPeek` → `{ peek }`; `setInsight` → `{ insight }`.  
`setDesk` (L175–176) only flips `corpusOpen` off when a desk opens. It does not touch insight, peek, tracked, engine, or chat.

## One active Insight

Slot is singular, not `Insight[]`. Chat bubbles may keep `insights?: Insight[]` on `ChatMsg` as chip history. Globe card = `useIntel.insight` only. A bubble “Card · title” re-calls `setInsight(insight)` — overwrite, no stack. Grok send already does that last-write (`comms.ts` `setInsight(parsed.insight)`).

## Dismiss law

`setInsight(null)` clears the card. Required, and already true in `store.ts`:

1. Do **not** close comms. `open` is not an `IntelState` field.
2. Do **not** `setEngine(null)`. Cesium stays mounted. Radio stays.
3. Do **not** clear `desk`, `peek`, `tracked`, layers, or cockpit.
4. Fly / Open desk / Show layer are other setters. Dismiss is not their inverse.

## Leftovers (coordinator)

1. No named `dismissInsight()`. Keep `setInsight(null)` thin — do not bundle side effects.
2. Peek + Insight can both be non-null (two holo cards). Optional later: `setInsight` may clear peek; never merge Peek into Insight; never clear insight from peek timeout.
3. Escape in OverlayHud skips insight and closes comms first if open. Do not “fix” that by coupling this store to `useComms`.
4. `cockpit: true` hides the cards in UI while the store still holds them. Fine. Unmount is never dismiss.
5. `runCommand` still `setDesk` without requiring an Insight (spine: civic desks through the card). Command leftover, not a store-shape miss.
6. Do not add `insight: Insight[]`. History belongs on comms messages.

## NO-GO if

Peek merged into Insight · dismiss closes comms or drops `engine` · stacked globe cards · second camera store · `src/` from this seat · live gevradio / Bogpulse.
