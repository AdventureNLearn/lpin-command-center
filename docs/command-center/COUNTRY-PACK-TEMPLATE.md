# Country pack template — United States is the bar (D-284)

**Sequence:** countries first. The US kit is the **most complete pack we have**, not a finished one. Any user fills **their country** with that same **degree of attention and detail**. They type their own county / locality; we do not seed municipality names.

**Exemplar:** `vendor/kept/kits/us/`  
**Blank copy:** `vendor/kept/kits/_template/`  
**Machine list:** `docs/command-center/country-pack-template.json`

## Why US first

The US pack is the deepest *method* example on this tree: clerk URLs on votes, quote+URL pledges, FEC source-type buckets with no named private donors, sitting names as filed, every object file present, holes named. It is **not** finished (House-only sitting file, thin ethics/lobby samples, Senate names not in this members file, county AHJ still user-typed). It is **not** a claim that every country looks like Congress.

**Attention bar (copy this, not a fake “done”):**

1. Every object file exists.  
2. Filled rows have an official `source_url` and a `retrieved` date.  
3. Empty means hole, not zero invented.  
4. Votes and pledges are never made up. Money is buckets, not named donors.  
5. Incomplete stays `incomplete: true` until it is actually earned.

## Object set (every ISO folder)

| File | US example (as filed) | Replicate by |
|---|---|---|
| `meta.json` | United States, bicameral, session, counts, capabilities, incomplete | Name, houses, seats, retrieved, honest_complete only if earned |
| `institutional.json` | Congress, House, Senate, official URLs | National houses + official web |
| `members.json` | 437 sitting House kit | Sitting names from official or Wikidata; vacancies not invented |
| `parties.json` | From caucus | Count seats from members; do not invent parties |
| `votes.json` | 849 clerk rolls | Official roll-call only; cap samples; never invent yeas |
| `pledges.json` | 297 quote+URL | Quote + official URL only |
| `committees.json` | 28 | Official committee list |
| `ethics.json` | Public disclosure categories, no annex | Public classes only |
| `money.json` | FEC buckets, `named_donors: false` | Source-type buckets, no named private donors |
| `issues.json` | Shared scoring labels | Copy taxonomy; do not invent country policy |
| `sources.json` | congress.gov, house.gov, senate.gov, Wikidata | Merge official URLs |
| `gap.json` | Holes named | Empty category = hole |
| `filers.json` / `lobby.json` / `orgs.json` | Thin even on US | Official register or honest empty |

## Subnational (county / locality)

US method: **state** is the nationwide empty-desk pack. The user **types** county or place. Product samples do not name a municipality.

When replicating globally: national kit first; then first-level subnational (state/province) if an official list exists; locality stays user-typed.

## How a user populates their country

1. Copy `_template` to `kits/{iso2}/`.  
2. Fill `institutional` + `sources` from the official parliament/gazette.  
3. Sitting `members` (current term).  
4. `parties` from those members.  
5. Official `votes` / `committees` / `ethics` / `money` if HTTP 200; else honest empty.  
6. Attach quote+URL in the workbook.  
7. Do not copy US issue fights as if they were local law.  
8. Retrieved date on every file. Stale is incomplete.

## Reasoning (same as the toolkit)

Primary record. Quote+URL or open cell. Status in the same sentence. Dirt is not shingles. Field is not boardroom. Human final call.
