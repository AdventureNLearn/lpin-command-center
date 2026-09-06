# 07 — SME desks as research lenses

**Product:** LPIN · **SoT:** `src/lib/lin/network.ts` `SME_DESKS` · **UI already live:** `DeskDrawer` `LinBody` (topic, cell notes, URL+quote attach). **Do not rebuild attach.** **D-272:** collision = association.

One named topic. Eight method desks. Notes are not claims. A quote without a URL is not Supported. Empty cells stay empty. Human final call.

## One topic, eight lenses

`research <topic>` (or Network topic field) is the session key. Opening a desk does not start a new topic. Each desk is a **lane** on that topic, not a homepage and not a score.

| Desk | Lane | Collect (cells) | May score |
|------|------|-----------------|-----------|
| Legal | Statute | Instrument attach · Status line · Repeal/sunset · Conflict of laws · Holding vs dicta | Yes |
| Regulatory | Rule | Rule docket · Permit pathway · Grant eligibility · Enforcement posture · Variance/waiver | Yes |
| Technical | Feed | Feed honesty · Inspection lookup · Catalog lock date · Sensor vs record · Kill switch | No |
| Jurisdictional | Stack | Local · County · State · Federal · Process lane | Yes |
| Operational | Field | Jobsite pack · Inspection sequence · Change order · Stop-work · Closeout | Yes |
| Engineering | Infra | As-built · Drainage path · Load path · Right-of-way · Spec vs field | No |
| Commerce | Money | Invoice path · Grant/settlement · Procurement · Insurance/bond · Public filing count | Yes |
| Governance | Roster | Roster · Instrument · Influence label · Claim board · Open cell | Yes |

A copied instrument from the wrong desk is a defect. Empty catalog beats the wrong file.

## What already exists (do not spec twice)

LinBody already: kernel list, five open cells with notes (`noteKey(deskId, cellId)`), attach form (https URL + smallest quote, retrieved date, desk-scoped sources), honesty footer, `open <desk> desk`. Cap 24 sources / session. Note max 400. Quote max 500. Topic required before attach.

## Collect rules (per desk)

- **Legal:** primary instrument + status in the same sentence (live / not law / repealed / bill). Secondary commentary never outranks the instrument.
- **Regulatory:** issuing body before the nickname. Permit ≠ statute. Grant eligibility ≠ lawful. Proposed / interim / final / stayed named.
- **Technical:** live / delayed / simulated / off on every feed. File presence is not a grade. Typed lookup only. 403 / empty index is not a page of records.
- **Jurisdictional:** layer before the act. City contract ≠ county grant ≠ state statute. User types locality. Not-retrieved is a finding.
- **Operational:** field records beat commentary. Photo ≠ permit ≠ occupancy. Sequence scope → pathway → evidence → package. Incomplete packs stay empty.
- **Engineering:** pattern ≠ sealed drawing. As-built beats brochure. Hydrology, load, and ROW are different claims. Not engineer of record.
- **Commerce:** follow the invoice. Eligible ≠ expended. Public filing counts only. No named private donors. Factory URL is not a login.
- **Governance:** roster as filed, delayed. Organization ≠ statute. Presence ≠ capture. Influence is a label, not a score. Bots propose; human attaches.

## Collision = association

Same URL **or** same operative quote on ≥2 desks = **association**, not Supported, not a merge, not a score. Show the desks that hold it. Do not auto-truth. Software never closes the claim.

Wrong-desk attach stays on the desk that took it; move is a human act. Same influence is not the same law.

## Honesty

Local network. Not legal advice. Not a government site. Not a score. Technical and Engineering never mint civic scores. Tutor/Learn cannot mint Supported. Globe stays up. Zero orbit pins from these desks.

## Not this file

New grok.me · iframe reference hosts · src patches · Fifty/Open Cells method packs (separate desks) · cloud sync · donor lists · nationwide dumps.
