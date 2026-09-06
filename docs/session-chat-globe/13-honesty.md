# SEAT 13 — Honesty / OPSEC (Insight + Grok comms)

**Target class:** public-suite WIP · **tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse.

Law: HARD-RULES §1.1–1.3 · KIT-10 honesty · `vendor/kept/OPSEC.md` · `vendor/kept/_out/permit-index.json` · SYSTEM in `src/lib/feeds/chat.ts`.

## Verdicts

| Gate | State | Basis |
|------|--------|-------|
| Insight **body** is guidance, not a certified fact | **NO-GO** until SYSTEM + parser bind | **E** SYSTEM has no guidance fence; `parseInsightTag` copies `body` raw (240) |
| Human final call (Fly / Open desk / Show layer) | **GO** on card clicks | **E** `InsightCard.tsx` buttons; auto-fly only if `askedToMove` |
| Grok must not certify fake portals | **NO-GO** until SYSTEM forbids it | **E** SYSTEM omits factory honesty; desk copy already says “portal not verified” |
| No invented claims / jobsite packs | **GO** on disk packs; **leftover** on Grok body | **E** `lookupPack` always `incomplete: true`, `rows: []` |
| No skill brands in public UI | **GO** occupancy 0 in `src/` | **E** grep AOS/Sub8/Eagle Eye/FROGNET/keptglobal/hivepermitdev/CoS/ANL = 0 |
| No demo municipalities minted for this sitting | **GO** catalog exception only; **leftover** SYSTEM `q:"Tokyo"` | **E** HARD-RULES §1.1; D-109 catalog; user types locality |
| `factory_urls_verified` | **GO** stays JSON `false` | **E** `permit-index.json` honesty |
| Live gevradio / keptglobal / hivepermitdev | **NO** write / iframe | **E** D-251; `vendor/kept/OPSEC.md` |

**This sitting:** contract **GO**. Coordinator must patch SYSTEM + (optional) body sanitizer before comms ship. Do not ship Insight as a truth badge.

## Bind (coordinator `src/`, not this seat)

1. **Body = guidance.** `Insight.body` is a hint on the glass card (`InsightCard` `holo-meta`). It does not score a claim, verify a portal, file a permit, or fill a jobsite pack. Spoken chat may be funny; the card stays humble. `source` is the honesty string (spine). Default already: `"Grok comms · delayed"`.
2. **Human final call.** Link in the bubble sets the card. **Fly** / **Open desk** / **Show layer** are clicks. `<<ACTION:flyTo>>` only when the user asked (`askedToMove` in `insight.ts`). Software never auto-truths HARD-RULES §1.3.5.
3. **Portals stay unverified.** `honesty.factory_urls_verified: false` (lock 2026-08-18). Integrity tests check `https://` shape, not fetch. `PermitCard` already appends “portal not verified”. `DISCLAIMER` (`types.ts`): “Guidance only — not legal advice, not a city login…”. Grok **must not** emit body/source containing “verified”, “live portal”, “confirmed AHJ site”, or “I checked the login”. Chips `higher`/`mid` are catalog layer, not HTTP 200 (`docs/dev-team/16-confidence.md`).
4. **No invented claims.** Jobsite: `JOBSITE_HONESTY` = “Guidance only. Not a live claims desk. Incomplete packs stay empty.” (`packs.ts`, KIT-10). Insight `system:"jobsite"` with no pack on disk → hole, 0 pins, 0 rows. Do not mint claims, fees, sitting names, donors, or AHJs. Names as filed or a visible hole.
5. **No skill brands / no demo towns.** Public chrome = plain civic tooling. Never-list stays off the door. Do not seed INSIGHT `q`/`title` with canned US city packs. User-typed locality is allowed (jobsite hole header). Permit Core/Extra/More names are D-109 catalog, not this sitting’s demo list. Do not render pack `notes[]` exclusion slugs (`docs/harden/10-opsec.md`).
6. **Rest is a count.** 14925, not a map. No 16k pins. Peek ≠ Insight.

## SYSTEM leftover (must land in `chat.ts` SYSTEM)

Today SYSTEM teaches INSIGHT/ACTION and “nothing classified / not for navigation.” It does **not** say: body is guidance; human flies; factory URLs unverified; jobsite packs empty; no skill brands; no invented claims. Coordinator adds those sentences. Drop canned city `q` from the prompt example; use a placeholder the user already typed.

Optional parser: if `body`/`source` matches `/verif(y|ied)|certified|live portal/i` on `system:"permit"`, rewrite to DISCLAIMER-class guidance. Do not invent a truth chip.

## Leftovers (not this file)

- Client sanitizer for fake-portal language (coord `insight.ts`).
- SYSTEM honesty paragraph (coord `chat.ts`).
- Inspection Index honesty = seat 14, later.
- Do not promote this tree to live gevradio.

**Close:** Desk honesty on disk is **PASS**. Comms Insight is **NO-GO** until Grok cannot certify portals or mint claims. Human still presses Fly.
