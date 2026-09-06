# What :8103 collects (full corpus)

Authority: **this local gold kit** at http://127.0.0.1:8103/ — not the live remixes.  
Machine list: `CATALOG.json`. Populate: `node harvest/populate-full.mjs`.

Ask Grok, login, and follow-lists are **HOLD** on this kit. They are not harvested.

## Objects the gold desk uses

| Object | File | :8103 view | Scoring? |
|--------|------|------------|----------|
| Legislature / desk | `meta.json` | Home, Compare, Map | kit flag + threshold |
| Members | `members.json` | Members | roster only |
| Parties / caucus | `parties.json` | Members (profile line) | **never** |
| Pledges | `pledges.json` | Members, Issues, Method | sentence + `https` URL |
| Votes | `votes.json` | Votes | mapped to a pledge |
| Gap | `gap.json` | Members / Votes | broke *own* pledge |
| Issues | `issues.json` | Issues | labels only |
| Committees | `committees.json` | Committees | gold surface |
| Ethics | `ethics.json` | Ethics | public categories |
| Money | `money.json` | Money | occupation buckets; **no named private donors** |
| Sources | `sources.json` | Method | provenance |
| Institutional | `institutional.json` | Home stat | 0 kits claimed |

## Field notes (from this kit)

- **Rate:** `kept / (kept + broke)`. Missed and unscored do not move it. Hide % below threshold (US 6, CA/KR 5, else 5).
- **Vote origin:** `clerk` \| `hansard` \| `nec` \| `reconstructed`.
- **Party ticket** is collected for the profile and is not the test (`:8103` footer + method).
- **Gap** is own-pledge break, not party-platform break.
- **Ethics:** public categories only. No confidential annex. No invented dollars. Estimate bands labeled estimate.
- **Map:** region + kit flag. No municipality pins.
- **Compare:** ≤4 desks; members / votes / committees / capabilities.
- **Institutional kits:** claimed 0 on home. Still a file so the gold kit can carry the flag.
- National legislatures + public-official names + constituency **labels** are catalog data (D-115). No municipality *samples*.

## Empty vs seeded

`populate-full.mjs` seeds desk meta, issue tags, source URLs, and KR money buckets from the :8103 sibling snapshots. Member / pledge / vote / gap / party / committee / ethics **rows** stay empty until a primary record exists. Incomplete is a state.
