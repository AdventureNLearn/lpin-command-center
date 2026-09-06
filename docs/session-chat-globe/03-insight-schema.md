# Seat 03 — Insight schema

**Target class:** public-suite WIP  
**Tree:** `sandbox/work/groks-eye-view-next`  
**Authority:** `00-SPINE.md` One object: Insight  
**Verdict:** **GO**

Disk type matches the spine card. Peek stays a different object. Inspection Index is not in the union (later adapter).

## Spine object vs `src/lib/intel/insight.ts`

```
Insight { id, title, body, system, q?, layer?, desk?, source }
```

| Field | Spine | Disk (`Insight`) |
|-------|-------|------------------|
| id, title, body | required | `string` |
| system | intel \| kept \| permit \| jobsite | `InsightSystem` — same four |
| q? | place / query (Fly) | `string` optional |
| layer? | LayerId | `LayerId` from `types.ts` |
| desk? | `{ system, id }` | `{ system: "kept"\|"permit"\|"jobsite"; id: string }` |
| source | honesty string | `string` |

No extra public fields. No missing spine fields. Parser fills `id` (`ins-` + time) and defaults `source` when the tag omits them.

## Desk systems

Spine Open desk: kept / permit / jobsite. Globe stays up.

- `Insight.desk.system` = `"kept" | "permit" | "jobsite"` — **intel cannot be a desk**.
- Store cursor (`store.ts`): `desk: null | { system: "kept" | "permit" | "jobsite"; id: string }` — **same union**.
- `CommandAction` desk-on: same three systems; `id?` is optional there, required on Insight + store.

`parseInsightTag` rejects any other `system`. Desk object only accepted for the three civic systems.

## Layer ids (`src/lib/intel/types.ts`)

Closed `LayerId`: `flights | military | vessels | satellites | earthquakes | fires | launches | legislatures | permits | jobsite`.

Spine example `layer: "permits"` is in the set. `Kind` is 1:1 with those ten (singular civic names). Insight does not invent a second layer enum. `CIVIC_LAYERS` in `insight.ts` is that full list (name leftover — not civic-only).

## Peek ≠ Insight

Store holds both: `peek: Peek | null` (`{ contact, x, y }`) and `insight: Insight | null`. `setPeek` / `setInsight` are separate. Do not merge.

## Fly / height (not schema fields)

Spine Fly: only if `q` or lat/lon exists. Disk Fly path on the card is `q` → `flyTo`. Insight has **no** `lat` / `lon` / `height`. `flyToCoord` lives on `CommandAction`, not on the card type. Zoom heights stay the shared camera table — do not add a second camera field here.

## Leftovers (coordinator; not NO-GO)

1. Card Fly cannot use lat/lon; only `q`. If a turn has coords and no query, Fly stays hidden unless `q` is filled.
2. Empty `desk.id` (`""`) parses as a desk. Store requires `id: string` and will open a drawer with a blank id.
3. `Insight.system` is not cross-checked against `Insight.desk.system` (intel + permit desk is legal to the parser).
4. `CommandAction` desk `id?` vs Insight/store required `id`.
5. Tag JSON has no `id`; clock-based ids can collide if two tags land in the same ms.
6. `insind` / Inspection Index **must stay out** of `InsightSystem` this sitting.

## GO means

Reuse `Insight` as the one card. Do not add Peek fields, insind, or a parallel homepage type. Adapters (seats 07–09, 14) emit this shape. `src/` is coordinator-owned.
