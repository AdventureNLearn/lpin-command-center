# Seat 05 — Bubble links

**Class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Authority:** `00-SPINE.md` · this file  
**Evidence:** `src/components/intel/CommsChat.tsx` (read-only)  
**Not written:** `src/`, live gevradio, Bogpulse

## Verdict: GO

Grok bubbles already show **Card** / **Fly** chips from `message.insights`. Card sets the store Insight. Fly is click-only and hidden without `q`. The bubble does not auto-move the camera.

## Contract (this seat)

| Chip | When | Click |
|------|------|-------|
| `Card · {title}` | each item in `m.insights` | `useIntel.getState().setInsight(insight)` — no camera |
| `Fly` | same, and `insight.q` truthy | `applyAction({ type: "flyTo", q }, q)` + flash — opt-in |

Peek stays a different object. Do not put Peek controls in the bubble.

## Disk — `CommsChat.tsx`

- L61–76: log maps every message; if `m.insights?.length`, render `InsightChips` per insight under `m.text` in that bubble.
- L68: kicker is `You` / `Grok`. Chips belong on the Grok bubble because only assistant msgs get `insights` today.
- L134–157 `InsightChips`: Card always; Fly wrapped in `{insight.q ? … : null}`.
- Card `onClick` (L140) is **only** `setInsight(insight)`. No `applyAction`, no `engine.flyTo`.
- Fly `onClick` (L148–151) is an explicit button. No `useEffect` fly. No mount-time camera.

## Attach path (chips starve without it)

`src/lib/intel/comms.ts`: `ChatMsg.insights?: Insight[]`. `send()` L217–223 attaches `[parsed.insight]` on the assistant row after `parseTaggedAction`. Greeting has no insights — correct, no chips. Empty parse → no chip row.

## Leftovers (not this seat’s `src/` write)

1. **Auto-card vs Card click.** `comms.ts` L225 calls `setInsight` on parse, so the holo card can appear without pressing Card. Spine wants the glass card; this seat says Card click sets the store. After **Dismiss**, Card is the re-open. Auto-set is **not** auto-fly.
2. **Spine table vs sitting brief.** Spine: bubble link sets Insight only; **Fly lives on the card**. Sitting brief: bubble must show **Card/Fly**. Disk matches the sitting brief (Fly also on `InsightCard.tsx`). Coordinator pick one; do not drop bubble Fly without a spine edit.
3. **Tool name missing.** Spine: link names **tool + place/object**. Disk is `Card · {insight.title}` only — no `system` / `layer` / `desk`. Holo kicker already has `system`. Optional: `Card · permit · {title}`.
4. **No lat/lon chip.** Fly is gated on `q` only. Insight has no coord field (`03`). Coordinate-only insights would hide Fly.
5. **Role gate.** Chips render for any role with `insights`. Users never get them. Keep it that way.
6. **Open desk** is card-only (`04`). Not a bubble miss.

## Do not

- No `src/` from this seat. No live gevradio. No remix. No Bogpulse.
- Do not auto-fly on Card or on insight attach.
- Do not merge Peek into bubble chips.

## Handoff

Bubble path for done-when #1 (link, no yank) is on disk. Coordinator: keep Card = store only; Fly = click only; resolve leftovers 1–2 before calling that item closed.
