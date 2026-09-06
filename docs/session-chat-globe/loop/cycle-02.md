# Cycle · seat 02 · `src/lib/intel/insight.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Loop:** iterate → audit → forecast → execute  
**Audience:** `docs/session-chat-globe/USEFUL-TOOL.md`  
**Law:** this file only. No schema bloat. Peek ≠ Insight. No auto-zoom.

## Iterate

Hour 0 already: `askedToMove` matches spine **go there**; tag `lat`/`lon`/`height` pass through (finite, ranged, paired). Schema unchanged (`id title body system q? lat? lon? height? layer? desk? source`).

## Audit (everyday + serious)

| Audience | Need | Disk before this cycle |
|----------|------|------------------------|
| Everyday | English ask → card, not yank. **Look here** is optional. | `askedToMove("what's over tokyo")` false. Unasked flyTo → `insightFromFlyQuery`. Copy still said **Fly**. |
| Everyday | No blank drawer | Tag `desk.id: ""` still minted a desk. |
| Serious | Delayed / sourced / hole. No auto-truth. | Default source already `delayed`. `insightFromFlyQuery` source was `opt-in fly`. |
| Serious | Human final call | `look here` in chat is **not** a fly-ask (card click). Civic tag with mismatched desk (kept card + permit desk) still parsed. |
| Both | No schema bloat | Do **not** add basis / tri-state / insind. Evidence-gate stays copy + source string. |

Leftovers left on other seats: `keptDeskByIso` smuggle (`ad`), InsightCard / chips, SYSTEM voice, `insight-local` jobsite empty id.

## Forecast

Patch parser honesty only: drop empty desk id; drop civic `system`/`desk.system` mismatch (intel + civic desk stays legal); unique `nid`; Look-here copy on the unasked fly card; delayed source. Do not add fields. Do not teach `askedToMove` “look here” (that would yank).

## Execute

- Empty / whitespace `desk.id` → no desk (Open the file stays hidden).
- `system` kept\|permit\|jobsite requires matching `desk.system`; intel may still carry a civic desk.
- `nid()` = time + seq (same-ms tags no longer collide).
- Title blank → `"Insight"`. Source blank → `"Grok comms · delayed"`.
- `insightFromFlyQuery`: body *Named this place. Look here if you want the globe to follow.* · source delayed.
- `askedToMove` unchanged this cycle (`go there` already in). `look here` stays false.

## Verify

- `insight.ts` has no `tsc` diagnostics. Tree `tsc --noEmit` **FAIL** in `PeekCard.tsx` (`satFreshness` — seat 11). Not this file. Did not touch it.
- Stdin smoke: empty desk dropped; kept+permit desk dropped; intel+kept desk kept; lat/lon/height pair kept; blank title → Insight; unique nid; Look here + delayed; `insind` out; `askedToMove("look here")` false; `go there` true.
- `scripts/insight-local.test.mjs` (askedToMove) **PASS** 3/3.
