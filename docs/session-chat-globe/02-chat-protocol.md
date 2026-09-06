# Seat 02 — Chat protocol / tags

**Class:** public-suite WIP · **Tree:** `sandbox/work/groks-eye-view-next`  
**Live gevradio:** frozen. No remix. No `src/` writes.  
**Verdict: GO** — SYSTEM and parser match the spine. Coordinator already wired INSIGHT.

## INSIGHT vs ACTION

| Tag | Wire | Camera | Desk |
|-----|------|--------|------|
| `<<INSIGHT:{json}>>` | last line; stripped | never | optional `desk`; Open desk on card |
| `<<ACTION:{json}>>` | last line; stripped | `flyTo` only if asked | none (not in allowlist) |

INSIGHT fields on disk (`src/lib/intel/insight.ts` `parseInsightTag`): `title`, `body`, `system` (`intel\|kept\|permit\|jobsite`), optional `q`, `layer` (civic LayerId), optional `desk` `{system,id}`. Invalid `system` → tag stripped, no card.

ACTION allowlist (`comms.ts` `parseTaggedAction` + SYSTEM): `flyTo` (needs `q`), `trackNearest`, `style`, `layer`, `cockpit`, `radio`, `reset`, `next`. Civic `desk` / `keptOpen` / `permitSearch` are **not** parsed from chat JSON — desks go through INSIGHT.

## When ACTION flyTo is allowed

Spine: auto-fly **only** if the human said fly / take me / go there / show me on the globe.

Gate is `askedToMove(userText)` in `insight.ts`:

```
/\b(fly|take me|go to|jump to|navigate|show me on the globe|move (the )?globe|bring (us|me) to)\b/i
```

- **Asked + `<<ACTION:{"type":"flyTo","q"}>>`** → `applyAction` flyTo (old path). Done-when 4.
- **Not asked + flyTo tag** → `action: null`, `insightFromFlyQuery(q)` (card + Fly). This is the sitting bugfix.
- **INSIGHT only** → `setInsight`; globe still. Fly is a click (`InsightCard` / bubble chip).
- Chat `send()` does **not** run `parseCommand`. “take me to …” in the bubble flies **only** if Grok emits ACTION and the gate passes.

## SYSTEM ↔ parser ↔ spine

`src/lib/feeds/chat.ts` `SYSTEM` (L52–66): do not fly unless they asked go/fly/take me/show me on the globe; prefer one last `<<INSIGHT:…>>`; ACTION only when asked; same ACTION type list; “Do not emit ACTION flyTo for a normal question.”

Parser order: `parseInsightTag` then ACTION regex; tags stripped before `ChatMsg.text`; `setInsight` then optional `applyAction`. Match.

Spine shorthand `<<ACTION:flyTo>>` is not the wire. Real wire is JSON `{"type":"flyTo","q"}` in both SYSTEM and parser.

## Coordinator already wired INSIGHT

Yes, end-to-end in this tree (not leftover for seat 02):

- Prompt: `chat.ts` SYSTEM INSIGHT example + prefer-INSIGHT.
- Parse: `insight.ts` + `comms.ts` `parseTaggedAction`.
- Store: `useIntel.setInsight` on send (`comms.ts` L225).
- Bubble link: `CommsChat` `InsightChips` → Card / Fly-if-`q`.
- Glass card: `InsightCard.tsx` Fly / Open desk / Show layer / Dismiss.

## Leftovers (not seat-02 blockers)

1. `askedToMove` has `go to`, not spine’s “go there”. `show me {place}` without “on the globe” does **not** unlock chat flyTo (SYSTEM agrees; command bar `commands.ts` still treats `show me` as flyTo — seat 11).
2. Non-flyTo ACTION (`radio`, `style`, `layer`, `trackNearest`, `reset`, `next`, `cockpit`) apply with **no** asked-gate. SYSTEM says punch radio only when asked; parser does not enforce.
3. SYSTEM: one last line. Parser will accept **both** tags in one reply (INSIGHT then ACTION).
4. Asked-to-move + INSIGHT-only (no ACTION) → card, no auto-fly. Prompt does not say “if they asked, emit ACTION.”
5. No unit test hits `parseTaggedAction` / `askedToMove` (grep: only the three src files).
6. `world.ts` command-mapper prompt still lists flyTo with no INSIGHT — not the comms path.

**Out of scope:** bubble UI (05), schema (03), card chrome (04), command bar (11).
