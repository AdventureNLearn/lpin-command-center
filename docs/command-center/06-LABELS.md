# Labels — every surface names its system

**Decision:** D-269 · Unlabeled mix is the old refuse. **Labeled composition** is this sitting.

Public copy is plain civic language. Ops names (CIC, ORCH, Seat 07, AOS brain, skill brands) never appear in the HUD, cards, drawer, X blurb, or grok.me chrome.

---

## Required fields (every Insight, Peek kicker, drawer header, layer rail chip)

| Field | Rule |
|-------|------|
| `system` | One id from the toolkit table in `05-CIVIC-COMMAND-CENTER.md` |
| Public kicker | Exact string from that table (Claims, Jobsite, Building desk, …) |
| Honesty strip | One sentence: what the record is, what it is not, human final call |
| Score / basis | Only if the system is allowed to score (see below) |
| Freshness | live / delayed / simulated / off |

If a control cannot name `system`, it does not ship.

---

## Who may score a claim

| System | May set `score` + `basis` | Why |
|--------|---------------------------|-----|
| `lpin-claims` | Yes | This is the civic claims desk |
| `lpin-jobsite` | Yes, on pack rows only | Guidance, not a live claims desk if the pack is incomplete |
| `opencells` | Yes, on quoted cells only | Quote+URL → Supported; open cell → no score |
| `fifty` | Yes, on packed instruments only | Empty / not-retrieved → no score |
| `insind` | No (presence of a public file is not a score) | Not a government site; not a grade |
| `permit` | Confidence chip on the match, not a moral score | Catalog match ≠ approved permit |
| `kept` | Roster as filed, not a pledge score | Harvest shelved |
| `tutor` | **Never** | Lessons are not civic truth |
| `intel` | Feed honesty only (live / delayed / modeled) | A blip is not a civic claim |

A Tutor lesson may **explain** how scoring works. It may not write `score: 1` onto a Claims card.

---

## Cross-lane talk (insightful, still labeled)

Allowed: a Claims card **links** “Learn this method” → Tutor lesson, kicker stays **Learn**.  
Allowed: a Jobsite card **links** “Building desk” → Permit search, kicker stays **Building desk**.  
Forbidden: one card that is secretly Claims+Tutor+Permit with no kicker change.  
Forbidden: flying the globe because a lesson mentioned a place (Look here still requires a place **and** the user).

---

## Public vs ops register

| Register | May say | Surfaces |
|----------|---------|----------|
| public mouth | LPIN Civic Intelligence, Command Center, Claims, Jobsite, the tool names above | grok.me, X profile, public GitHub |
| operator-internal | Seat roster, D-ids, KIT-20, AOS brain, civic-intelligence skill | this tree, WD, vault Active |

Mixing them on the glass card is an OPSEC stop.
