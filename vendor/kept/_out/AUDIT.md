# AUDIT
WAVE: WAVE-501 US
FILE_UNDER_AUDIT: vendor/kept/_out/501-links.json and packages/_index.json
VERDICT: AUDIT PASS
HONEST_HOLES: 17

## Fail checks
- nodes+edges+holes present: PASS - nodes 199 edges 215 holes 17
- 501-links size: PASS - 126062 @ 21:22:31 ET; prior 125973 PASS is stale
- hole-13 extra: PASS - edges_with_program_area 9; live_split infrastructure 6 law_enforcement 3 matches live parse
- hole 17: PASS - dropped 18 kept 9
- program_area from filing language: PASS - 9 remaining tags map from CFDA; dropped CFDAs still untagged
- forbidden names: PASS - no c3 Sch B, no c4/c5/c6 donors, no leaks, no DAF
- addresses: PASS - no address fields
- influence keys: PASS - no influence/score/quid/pagerank/centrality
- invented sitting names: PASS - 0 person nodes
- kit rewritten: PASS - this sit did not read or write kits
- src touched: PASS - this sit did not read or write src
- _index last_audit: PASS - WAVE-501 US PASS nodes 199 edges 215 holes 17 bytes 126062
- _index 33/33: PASS - kit_on_disk_count 33 remaining 0
- last_package_audit: PASS - PACKAGE-TZ
- last_fill_audit: PASS - FILL-PL
- 501-links.json rewritten by Integrity: PASS - did not rewrite
- _index.json rewritten by Integrity: PASS - did not rewrite

## Honest holes
- 990 Part VII officer names not invented
- FEC Form 1 treasurer names not invented
- 990 Schedule I org grants not invented
- 990-PF Schedule B not invented
- Form 8872 not retrieved
- FEC IND itemized persons not ingested
- DCCC/NRCC 24K beyond top 20 incomplete
- PAC 24K beyond top 5 incomplete
- c3 Sch B forbidden omitted
- c4/c5/c6 donors forbidden omitted
- member_id join incomplete on unjoined candidate committees
- 990 Schedule I purpose/program omitted
- USAspending not a full inventory
- USAspending member_id omitted when CD is 90/98/null
- program_area omitted on 18 USAspending edges after BLOCK
- _index status_vs_disk noted 125973 vs 126062; this sit supersedes that size

## Notes
AUDIT PASS
- 501-links.json 126062 bytes 21:22:31 ET
- packages/_index.json 12105 bytes 21:24:18 ET
- iso2 us; nodes 199 (committee 166, org 33); edges 215 (fec 186, usaspending 29)
- program_area 9: infrastructure 6, law_enforcement 3
- prior PASS on 125973 superseded
