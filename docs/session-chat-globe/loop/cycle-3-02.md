# Hour 3 AUDIT · seat 02 · `src/lib/intel/insight.ts`

**Class:** public-suite WIP · **Not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Law:** `docs/session-chat-globe/USEFUL-TOOL.md` · this file only · no new features  
**Loop:** iterate → audit → forecast → execute

## Iterate

Disk functions this seat owns:

- `askedToMove` — `\b(fly|take me|go (to|there)|jump to|navigate|show me on the globe|move (the )?globe|bring (us|me) to)\b`
- `parseInsightTag` — four systems only; empty/whitespace `desk.id` dropped; civic `system` must match `desk.system`; intel + civic desk still legal; lat/lon finite+ranged+paired; height finite `> 0`
- `insightFromFlyQuery` — unasked flyTo becomes a card: *Named this place. Look here if you want the globe to follow.* · source delayed

Schema: `id title body system q? lat? lon? height? layer? desk? source`. No `basis`. No tri-state fields. No `insind`.

## Audit (GO / NO-GO)

| Check | Result |
|-------|--------|
| `askedToMove("look here")` is **not** a fly-ask | **GO** false |
| `go there` / `take me` / `fly` / `show me on the globe` **are** fly-asks | **GO** true |
| Everyday English ask (what’s over / who sits) does not yank | **GO** (existing tests) |
| Empty / whitespace `desk.id` dropped | **GO** no desk |
| No schema bloat (no basis / tri-state / insind) | **GO** |
| `insightFromFlyQuery` copy is **Look here**, not Fly | **GO** |
| Source delayed | **GO** |

**Verdict: GO.** No FAIL leftover in this file.

## Forecast

None this hour. Card click **Look here** stays opt-in. Do not teach `askedToMove` “look here”. Do not add evidence-gate fields.

## Execute

Stop. No edit to `src/lib/intel/insight.ts`.

## Verify

- `scripts/insight-local.test.mjs` **PASS** 4/4 (includes `look here` false; `go there` true).
- Hour-3 stdin audit: all GO.
- `node .\node_modules\typescript\bin\tsc --noEmit` **PASS** (exit 0). No src edit this fire.
