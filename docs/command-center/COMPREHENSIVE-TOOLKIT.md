# Comprehensive civic toolkit — standing goal (D-284)

**Target class:** public-suite  
**Motto:** From the dirt to the shingles. From the field to the boardroom. Accuracy and transparency.

## Goal (set early)

Populate **literally everything this desk covers** as a living catalog the user can **focus**, not a thin demo they have to invent around.

Covered data points (same reasoning logic on every one):

| Point | What “full” means | Honest empty until |
|---|---|---|
| Law | Primary instruments, status in the same sentence | Quote + official URL |
| Permitting | AHJ, pathway, issuance vs application | Named AHJ + portal as unverified until used |
| Trades | License class × issuing body, dirt→shingles stack | Official roster or license board |
| Industries | Sector catalog (ISIC/NAICS index) × jurisdiction | Official classification + local overlay |
| Regulations | Issuing body, docket, proposed/interim/final/stayed | Official gazette / docket |
| Legislature | 196 kits, all chambers, votes/committees as filed | Already in progress |
| Funding / political / corporate | Buckets, sittings, registers | Already in progress |

## Sequence (D-284)

**Countries first.** The United States kit is the **most complete pack we have, not a finished one**. A user anywhere fills **their country** with that same attention (sourced, dated, honest empty). They type their own county or place — we do not seed municipality names. Law, permitting, trades, industries, and regulations hang off a country pack; they do not replace it.

See `COUNTRY-PACK-TEMPLATE.md` and `country-pack-template.json`. Exemplar: `vendor/kept/kits/us/`.

The human **narrows** (country, then industry, trade, job). The toolkit **aims at complete**. Incomplete stays empty. Never invent to look finished. **Informed to the day** = every claim carries `retrieved`; stale is incomplete, not auto-refreshed theater.

This will take years of refining. The goal is locked now so later sittings do not shrink it back to a 12-industry picker or skip the country bar.

## Reasoning (accuracy + efficiency)

Shared across Field and Boardroom:

1. Primary record beats commentary.  
2. Quote + official URL, or the cell stays open.  
3. Status in the same sentence.  
4. Tri-state + basis kinds. Human final call.  
5. Do not skip a stack layer (dirt ≠ shingles; field ≠ boardroom; a trade quote ≠ a permit).  
6. Source-then-collect. HTTP 403 is a miss.

Code spine: `src/lib/lin/toolkit.ts`  
Workbook lenses consume it. Grok chat must reason with it. Fill agents collect toward it.

## Do not

- Invent trades, licenses, dockets, or gazettes.  
- Collapse industry × jurisdiction × trade into one “score.”  
- Put municipality names in samples.  
- Push AdventureNLearn/groks-eye-view.
