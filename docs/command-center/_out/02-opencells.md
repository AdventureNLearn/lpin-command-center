# Open Cells — LPIN method

**Lane:** Cells · **System:** `opencells` · **Kicker:** Open Cells  
**Title:** Quoted, or open  
**Module:** `src/lib/lin/opencells.ts` · **Desk id:** `opencells`  
**Reference host (method source, not this screen):** opencells.grok.me

Native LPIN drawer on the globe. Quote + URL, or leave open. No iframe. No homepage swap. Marker budget at orbit: **0**.

## Screen

A clause is here only when a human attaches the primary text. A gap is a gap, not a finding. Bots may propose. They do not close a cell.

Attach — all of these, or the cell stays **open**:

1. Name country + instrument (user types; this product does not sample places).
2. Official page URL (`http://` or `https://`), not a news rewrite.
3. Smallest operative quote.
4. Status in the **same sentence**.
5. Retrieval date.

A quote without a URL is not Supported. Notes without a source are notes, not claims.

## Status

`open` · `quoted` · `bill` · `repealed`

| Status | Meaning | Score |
|--------|---------|-------|
| open | No primary attached. Leave it. | none |
| quoted | Quote + URL on the official page. | Supported on that cell only |
| bill | Not law. Say **bill** in the same sentence. | not law |
| repealed | Not live. Say **repealed** in the same sentence. | not live |

Coverage of quoted cells is a count of attachments. **It is not a ranking of freedom.** Do not choropleth. Do not pin unquoted countries. Country pick is typed lookup of quoted instruments, not a flyTo dump.

## Kernel

1. A quote without a URL is not Supported.
2. A bill is not law. Name the status in the same sentence.
3. Same influence is not the same law.
4. An organization is not a statute. Presence is not capture.
5. Human attaches every card. Open cells stay open.
6. Coverage of quotes is not a ranking of freedom.

## Commands

| Phrase | Effect |
|--------|--------|
| `open cells desk` | Open this drawer. Globe stays mounted. |
| `open cells` / `cells desk` / `opencells` | Same desk. |
| `show opencells` | Layer on **if** wired. **0 pins.** Not a ranking map. |
| `hide opencells` | Layer off. P0 with `close desk`. |
| `close desk` | Close drawer. Do not unmount Cesium. Do not steal radio. |

Topic first: `research <topic>`. Look here only if the user typed a resolvable place.

## Honesty

Public method. Not a score. Not a ranking of freedom. Human attaches every card. Human final call. Freshness: **delayed**. Radio, if any, is extra — never steal Creedence.

Card: kicker **Open Cells** · actions Open the file · Show layer (0 pins). Tutor cannot mint Supported. Collision (same URL or quote on ≥2 desks) is association, not Supported. Keep a separate `LayerId` from Fifty.

## As-built (honest)

Desk is live via `open cells desk` (LIN drawer: kernel, cells, URL+quote attach, device-local). Cells on disk: Quoted instrument · Open cell · Status line · Retrieval date. Drawer today labels a cell **open** or **noted**; the four statuses live in `OPENCELLS_STATUSES` and must be named on the quote line. `show opencells` / `hide opencells` are pack phrases — no `LayerId` yet, and must stay 0 pins if added.

## Refuse

Iframe of the old host. Freedom choropleth. Targeting lists. Org-as-statute. Influence as identity. Municipality samples. Slogans. Skill brands. Auto-attach. Pins for unquoted countries.
