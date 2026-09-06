# AUDIT-LOG
Append-only. One block per sit.

## 2026-08-29T12:07-04:00 PACKAGE-TW
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/tw.json (1913) packages/tw-permit.json (760)
sweep: no duplicate iso2 package files; no ACK mtime drift; STATUS matches disk
permit: counts 0; no invented TW AHJs; rest not dumped

## 2026-08-29T12:14-04:00 PACKAGE-PL
VERDICT: AUDIT PASS
HONEST_HOLES: 10
files: packages/pl.json (1754) packages/pl-permit.json (808)
sweep: no duplicate iso2 files; no ACK mtime drift; STATUS matches disk
permit: counts 0; Poland ME/NY excluded; rest not dumped

## 2026-08-29T12:17-04:00 PACKAGE-NG
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/ng.json (1960) packages/ng-permit.json (831)
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; no invented Nigeria AHJs; rest not dumped

## 2026-08-29T12:21-04:00 PACKAGE-TR
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/tr.json (2024) packages/tr-permit.json (882)
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Turkey TX excluded; rest not dumped

## 2026-08-29T12:24-04:00 PACKAGE-MX
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/mx.json (1986) packages/mx-permit.json (985)
TR ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; NM and US Mexico towns excluded; rest not dumped

## 2026-08-29T12:27-04:00 PACKAGE-EG
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/eg.json (1870) packages/eg-permit.json (852)
MX ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; US Egypt towns excluded; rest not dumped
pledges hunt-stop omitted, not a fail

## 2026-08-29T12:33-04:00 FILL-US
VERDICT: AUDIT PASS
HONEST_HOLES: 19
file: packages/us-fill.json (9870)
kits/us untouched (members 157076 votes 8131988 dates 2026-08-21)
restored 0; left 19 ingest-drop holes; no minted pledges or sitting names
us.json and us-permit.json mtimes unchanged


## 2026-08-29T12:40-04:00 PACKAGE-ES
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/es.json (1974) packages/es-permit.json (894)
EG ACK: audit=PASS; mtimes unchanged
MX ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; US Spain / Espanola excluded; rest not dumped
re-sit after host reconnect; not claimed from disconnected listing

## 2026-08-29T12:47-04:00 FILL-CA
VERDICT: AUDIT PASS
HONEST_HOLES: 21
file: packages/ca-fill.json (10931)
kits/ca untouched (members 139296 votes 4815804 dates 2026-08-21)
restored 0; left 21 ingest-drop holes; no minted pledges or sitting names
ca.json and ca-permit.json mtimes unchanged
ES ACK: audit=PASS; mtimes unchanged

## 2026-08-29T12:49-04:00 PACKAGE-JP
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/jp.json (1872) packages/jp-permit.json (871)
FILL-CA ACK: audit=PASS; ca-fill.json mtime unchanged
ES ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; no invented Japan AHJs; rest not dumped

## 2026-08-29T12:56-04:00 FILL-KR
VERDICT: AUDIT PASS
HONEST_HOLES: 16
file: packages/kr-fill.json (10603)
kits/kr untouched (members 136184 votes 6659775 dates 2026-08-21)
restored 0; left 16 ingest-drop holes; no minted pledges or sitting names
kr.json and kr-permit.json mtimes unchanged
JP ACK: audit=PASS; mtimes unchanged

## 2026-08-29T12:59-04:00 PACKAGE-IL
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/il.json (1930) packages/il-permit.json (933)
FILL-KR ACK: audit=PASS; kr-fill.json mtime unchanged
JP ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Illinois AHJs excluded not counted as Israel; rest not dumped
pledges hunt-stop omitted, not a fail

## 2026-08-29T13:05-04:00 FILL-GB
VERDICT: AUDIT PASS
HONEST_HOLES: 21
file: packages/gb-fill.json (14191)
kits/gb untouched (members 235069 votes 33325777 dates 2026-08-21)
restored 0; left 21 ingest-drop holes; no minted pledges or sitting names
gb.json and gb-permit.json mtimes unchanged
IL ACK: audit=PASS; mtimes unchanged

## 2026-08-29T13:09-04:00 PACKAGE-IN
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/in.json (1956) packages/in-permit.json (934)
FILL-GB ACK: audit=PASS; gb-fill.json mtime unchanged
IL ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Indiana AHJs excluded not counted as India; rest not dumped

## 2026-08-29T13:16-04:00 FILL-DE
VERDICT: AUDIT PASS
HONEST_HOLES: 19
file: packages/de-fill.json (12579)
kits/de untouched (members 209333 votes 3882012 dates 2026-08-21)
restored 0; left 19 ingest-drop holes; no minted pledges or sitting names
de.json and de-permit.json mtimes unchanged
IN ACK: audit=PASS; mtimes unchanged

## 2026-08-29T13:18-04:00 PACKAGE-ID
VERDICT: AUDIT PASS
HONEST_HOLES: 14
files: packages/id.json (2140) packages/id-permit.json (992)
FILL-DE ACK: audit=PASS; de-fill.json mtime unchanged
IN ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Idaho AHJs excluded not counted as Indonesia; rest not dumped

## 2026-08-29T13:25-04:00 FILL-BR
VERDICT: AUDIT PASS
HONEST_HOLES: 19
file: packages/br-fill.json (17049)
kits/br untouched (members 179351 votes 59081350 dates 2026-08-21)
restored 0; left 19 ingest-drop holes; no minted pledges or sitting names
br.json and br-permit.json mtimes unchanged
ID ACK: audit=PASS; mtimes unchanged

## 2026-08-29T13:31-04:00 PACKAGE-AU
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/au.json (1879) packages/au-permit.json (888)
FILL-BR ACK: audit=PASS; br-fill.json mtime unchanged
ID ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Austria AT not counted as Australia; rest not dumped

## 2026-08-29T13:37-04:00 FILL-UA
VERDICT: AUDIT PASS
HONEST_HOLES: 17
file: packages/ua-fill.json (13622)
kits/ua untouched (members 214968 votes 90993406 dates 2026-08-21)
restored 0; left 17 ingest-drop holes; no minted pledges or sitting names
ua.json and ua-permit.json mtimes unchanged
AU ACK: audit=PASS; mtimes unchanged

## 2026-08-29T13:41-04:00 PACKAGE-ZA
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/za.json (1992) packages/za-permit.json (930)
FILL-UA ACK: audit=PASS; ua-fill.json mtime unchanged
AU ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Zambia ZM and Zimbabwe ZW not counted as South Africa; rest not dumped

## 2026-08-29T13:49-04:00 FILL-FR
VERDICT: AUDIT PASS
HONEST_HOLES: 19
file: packages/fr-fill.json (15685)
kits/fr untouched (members 249980 votes 33516386 dates 2026-08-21)
restored 0; left 19 ingest-drop holes; no minted pledges or sitting names
fr.json and fr-permit.json mtimes unchanged
ZA ACK: audit=PASS; mtimes unchanged

## 2026-08-29T13:52-04:00 PACKAGE-KE
VERDICT: AUDIT PASS
HONEST_HOLES: 12
files: packages/ke.json (1972) packages/ke-permit.json (970)
FILL-FR ACK: audit=PASS; fr-fill.json mtime unchanged
ZA ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Kentucky KY and Kenai AK not counted as Kenya; rest not dumped

## 2026-08-29T13:58-04:00 FILL-CN
VERDICT: AUDIT PASS
HONEST_HOLES: 19
file: packages/cn-fill.json (18083)
kits/cn untouched (members 1502571 votes 67763 dates 2026-08-21)
restored 0; left 19 ingest-drop holes; no minted pledges or sitting names
cn.json and cn-permit.json mtimes unchanged
KE ACK: audit=PASS; mtimes unchanged

## 2026-08-29T16:55-04:00 PACKAGE-PH
VERDICT: AUDIT PASS
HONEST_HOLES: 13
files: packages/ph.json (2023) packages/ph-permit.json (1036)
FILL-CN ACK: audit=PASS; cn-fill.json mtime unchanged
KE ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Pennsylvania PA not counted as Philippines; rest not dumped

## 2026-08-29T17:01-04:00 FILL-IT
VERDICT: AUDIT PASS
HONEST_HOLES: 19
file: packages/it-fill.json (15190)
kits/it untouched (members 138809 votes 5281811 dates 2026-08-21)
restored 0; left 19 ingest-drop holes; no minted pledges or sitting names
it.json and it-permit.json mtimes unchanged
PH ACK: audit=PASS; mtimes unchanged
FILL-CN ACK: audit=PASS; cn-fill.json mtime unchanged

## 2026-08-29T17:04-04:00 PACKAGE-GH
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/gh.json (1869) packages/gh-permit.json (1110)
FILL-IT ACK: audit=PASS; it-fill.json mtime unchanged
PH ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; New Hampshire NH not counted as Ghana; rest not dumped

## 2026-08-29T17:09-04:00 FILL-TW
VERDICT: AUDIT PASS
HONEST_HOLES: 21
file: packages/tw-fill.json (19356)
kits/tw untouched (members 55432 votes 4105282 dates 2026-08-20/21)
restored 0; left 21 ingest-drop holes; no minted pledges or sitting names
tw.json and tw-permit.json mtimes unchanged
GH ACK: audit=PASS; mtimes unchanged
FILL-IT ACK: audit=PASS; it-fill.json mtime unchanged

## 2026-08-29T17:11-04:00 PACKAGE-AR
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/ar.json (1854) packages/ar-permit.json (1047)
FILL-TW ACK: audit=PASS; tw-fill.json mtime unchanged
GH ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Arkansas AR not counted as Argentina; rest not dumped

## 2026-08-29T17:18-04:00 FILL-PL
VERDICT: AUDIT PASS
HONEST_HOLES: 21
file: packages/pl-fill.json (19335)
kits/pl untouched (members 176645 votes 33593835 dates 2026-08-20/21)
restored 0; left 21 ingest-drop holes; no minted pledges or sitting names
pl.json and pl-permit.json mtimes unchanged
AR ACK: audit=PASS; mtimes unchanged
FILL-TW ACK: audit=PASS; tw-fill.json mtime unchanged

## 2026-08-29T17:21-04:00 PACKAGE-NZ
VERDICT: AUDIT PASS
HONEST_HOLES: 11
files: packages/nz.json (1867) packages/nz-permit.json (1228)
FILL-PL ACK: audit=PASS; pl-fill.json mtime unchanged
AR ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; NY NJ NM NH not counted as New Zealand; rest not dumped

## 2026-08-29T17:31-04:00 PACKAGE-CL
VERDICT: AUDIT PASS
HONEST_HOLES: 18
files: packages/cl.json (2605) packages/cl-permit.json (1425)
FILL-PL ACK: audit=PASS; pl-fill.json mtime unchanged
NZ ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Colorado CO not counted as Chile; no US state codes copied onto CL; rest not dumped
map-only seed members 0: honest, not a fail

## 2026-08-29T17:35-04:00 PACKAGE-FJ
VERDICT: AUDIT PASS
HONEST_HOLES: 18
files: packages/fj.json (2591) packages/fj-permit.json (2602)
CL ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Florida FL not counted as Fiji; no US state codes copied onto FJ; rest not dumped
map-only seed members 0: honest, not a fail

## 2026-08-29T17:39-04:00 PACKAGE-NL
VERDICT: AUDIT PASS
HONEST_HOLES: 18
files: packages/nl.json (2597) packages/nl-permit.json (1248)
FJ ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; US Holland/Nederland lookalikes not counted as Netherlands; no US state codes copied onto NL; rest not dumped
map-only seed members 0: honest, not a fail

## 2026-08-29T17:44-04:00 PACKAGE-TH
VERDICT: AUDIT PASS
HONEST_HOLES: 18
files: packages/th.json (2597) packages/th-permit.json (2769)
NL ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Texas TX and Tennessee TN not counted as Thailand; no US state codes copied onto TH; rest not dumped
map-only seed members 0: honest, not a fail

## 2026-08-29T18:21-04:00 PACKAGE-TZ
VERDICT: AUDIT PASS
HONEST_HOLES: 18
files: packages/tz.json (2603) packages/tz-permit.json (2761)
TH ACK: audit=PASS; mtimes unchanged
sweep: no duplicate iso2 files; no ACK mtime drift
permit: counts 0; Texas TX and Tennessee TN not counted as Tanzania; no US state codes copied onto TZ; rest not dumped
map-only seed members 0: honest, not a fail
re-sit after host reconnect; verdict from disk this sit

## 2026-08-29T18:34-04:00 WAVE-501 US
VERDICT: AUDIT PASS
HONEST_HOLES: 15
files: 501-links.json (99759) 18:31:44
TZ ACK: audit=PASS; mtimes unchanged
kits/us members.json votes.json issues.json money.json dates 2026-08-20/21 unchanged
JOIN: 84 member_ids all in kits/us/members.json; no new sitting names
issue_id: education israel already in issues.json; program_area 0
no person nodes; no addresses; forbidden donor names omitted
named_donors false is not an omit reason

## 2026-08-29T18:36-04:00 WAVE-501 US
VERDICT: AUDIT BLOCK
HONEST_HOLES: 16
files: 501-links.json (126063) 18:34:23
prior 99759 PASS stale
block: program_area not from filing language on 18 of 27 tagged USAspending edges (CDBG as infrastructure; disaster grants as public_safety from recipient name; opioid/SAMHSA/transit as law_enforcement; NSF TIP and Byrne JAG as retail_theft)
JOIN: 100 member_ids all in kits/us/members.json
kits/us not rewritten; 501-links.json not rewritten

## 2026-08-29T18:39-04:00 WAVE-501 US
VERDICT: AUDIT PASS
HONEST_HOLES: 17
files: 501-links.json (125973) 18:38:37
prior BLOCK on 126063 superseded
program_area: 9 remaining tags map from CFDA; 18 invented tags dropped and omitted
JOIN: 100 member_ids all in kits/us/members.json
kits/us not rewritten; 501-links.json not rewritten by Integrity

## 2026-08-29T21:25-04:00 WAVE-501 US
VERDICT: AUDIT PASS
HONEST_HOLES: 17
files: 501-links.json (126062) 21:22:31; packages/_index.json (12105) 21:24:18
prior 125973 PASS superseded
hole-13 extra edges_with_program_area 9 matches live infra 6 law_enforcement 3
hole 17 dropped 18 kept 9
_index last_audit WAVE-501 US PASS 199/215/17; kit_on_disk 33/33 remaining 0; last_package_audit PACKAGE-TZ; last_fill_audit FILL-PL
program_area 9 map from CFDA; 18 invented tags still omitted
no influence keys; no addresses; 0 person nodes
Integrity did not rewrite 501-links.json or _index.json
