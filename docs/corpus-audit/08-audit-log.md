# Seat 08 — AUDIT-LOG vs disk

Target class: public-suite.
Tree: `REPO_ROOT`
Corpus: `vendor/kept/_out/`
Mined: 2026-08-29. Bots PARK. No network. No writes under `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`.

Sources read: `AUDIT-LOG.md`, `AUDIT.md`, `STATUS.md`, `FEED-AUDIT.md`, `HANDOFF.md`, `packages/_index.json`, on-disk package/501/atlas files.

---

## ACK list

`AUDIT-LOG.md` is 13505 bytes, UTF-8 BOM, 38 unique sit headings, mtime 2026-08-29T18:39:58-04:00. Header: "Append-only. One block per sit." First sit is PACKAGE-TW at 12:07 ET, not WAVE-1.

38 sits. 37 AUDIT PASS. 1 AUDIT BLOCK (historical, superseded). 0 current BLOCK.

### PACKAGE (23 sits)

| sit | verdict | holes | logged files (bytes) |
|---|---|---|---|
| 12:07 PACKAGE-TW | PASS | 11 | tw.json 1913, tw-permit.json 760 |
| 12:14 PACKAGE-PL | PASS | 10 | pl.json 1754, pl-permit.json 808 |
| 12:17 PACKAGE-NG | PASS | 12 | ng.json 1960, ng-permit.json 831 |
| 12:21 PACKAGE-TR | PASS | 12 | tr.json 2024, tr-permit.json 882 |
| 12:24 PACKAGE-MX | PASS | 12 | mx.json 1986, mx-permit.json 985 |
| 12:27 PACKAGE-EG | PASS | 11 | eg.json 1870, eg-permit.json 852 |
| 12:40 PACKAGE-ES | PASS | 12 | es.json 1974, es-permit.json 894 |
| 12:49 PACKAGE-JP | PASS | 11 | jp.json 1872, jp-permit.json 871 |
| 12:59 PACKAGE-IL | PASS | 11 | il.json 1930, il-permit.json 933 |
| 13:09 PACKAGE-IN | PASS | 12 | in.json 1956, in-permit.json 934 |
| 13:18 PACKAGE-ID | PASS | 14 | id.json 2140, id-permit.json 992 |
| 13:31 PACKAGE-AU | PASS | 11 | au.json 1879, au-permit.json 888 |
| 13:41 PACKAGE-ZA | PASS | 12 | za.json 1992, za-permit.json 930 |
| 13:52 PACKAGE-KE | PASS | 12 | ke.json 1972, ke-permit.json 970 |
| 16:55 PACKAGE-PH | PASS | 13 | ph.json 2023, ph-permit.json 1036 |
| 17:04 PACKAGE-GH | PASS | 11 | gh.json 1869, gh-permit.json 1110 |
| 17:11 PACKAGE-AR | PASS | 11 | ar.json 1854, ar-permit.json 1047 |
| 17:21 PACKAGE-NZ | PASS | 11 | nz.json 1867, nz-permit.json 1228 |
| 17:31 PACKAGE-CL | PASS | 18 | cl.json 2605, cl-permit.json 1425 |
| 17:35 PACKAGE-FJ | PASS | 18 | fj.json 2591, fj-permit.json 2602 |
| 17:39 PACKAGE-NL | PASS | 18 | nl.json 2597, nl-permit.json 1248 |
| 17:44 PACKAGE-TH | PASS | 18 | th.json 2597, th-permit.json 2769 |
| 18:21 PACKAGE-TZ | PASS | 18 | tz.json 2603, tz-permit.json 2761 |

PACKAGE-TZ is last package sit. Log notes "re-sit after host reconnect; verdict from disk this sit." TH ACK carried forward as PASS.

Not in AUDIT-LOG as PACKAGE sits (files exist on disk, earlier mtimes ~11:43–12:02 ET, before this log starts): US, CA, KR, GB, DE, BR, UA, FR, CN, IT. Those ten are the kit packages that later received FILL sits.

### FILL (12 sits)

| sit | verdict | holes | logged file (bytes) |
|---|---|---|---|
| 12:33 FILL-US | PASS | 19 | us-fill.json 9870 |
| 12:47 FILL-CA | PASS | 21 | ca-fill.json 10931 |
| 12:56 FILL-KR | PASS | 16 | kr-fill.json 10603 |
| 13:05 FILL-GB | PASS | 21 | gb-fill.json 14191 |
| 13:16 FILL-DE | PASS | 19 | de-fill.json 12579 |
| 13:25 FILL-BR | PASS | 19 | br-fill.json 17049 |
| 13:37 FILL-UA | PASS | 17 | ua-fill.json 13622 |
| 13:49 FILL-FR | PASS | 19 | fr-fill.json 15685 |
| 13:58 FILL-CN | PASS | 19 | cn-fill.json 18083 |
| 17:01 FILL-IT | PASS | 19 | it-fill.json 15190 |
| 17:09 FILL-TW | PASS | 21 | tw-fill.json 19356 |
| 17:18 FILL-PL | PASS | 21 | pl-fill.json 19335 |

Matches HANDOFF fill list: us ca kr gb de br ua fr cn it tw pl. No ng/tr/mx fill. `_index.json` extras = those 12 fill files, remaining_count 0.

### WAVE-501 (3 sits)

| sit | verdict | holes | 501-links.json |
|---|---|---|---|
| 18:34 WAVE-501 US | PASS | 15 | 99759 bytes @ 18:31:44 (later marked stale) |
| 18:36 WAVE-501 US | **BLOCK** | 16 | 126063 bytes @ 18:34:23. Block: program_area not from filing language on 18 of 27 tagged USAspending edges. Integrity did not rewrite the file this sit. |
| 18:39 WAVE-501 US | PASS | 17 | 125973 bytes @ 18:38:37. Prior BLOCK on 126063 superseded. 18 invented tags dropped. |

Current wave is the 18:39 PASS. BLOCK is retained in the log, not deleted.

### FEED / W1–W3

No WAVE-1 / WAVE-2 / WAVE-3 / FEED-AUDIT sit in `AUDIT-LOG.md`. FEED-AUDIT lives in its own file (mtime 11:40:02 ET, 1027 bytes), before this log starts.

### Any BLOCK?

Yes, one historical: WAVE-501 US at 18:36, superseded by WAVE-501 US PASS at 18:39. Current STATUS is PARK, not BLOCK. No package or fill BLOCK.

---

## STATUS match

`STATUS.md` (462 bytes, mtime 2026-08-29T18:52:06-04:00):

| claim | STATUS | disk / closeout | match |
|---|---|---|---|
| PARK | `STATUS: PARK` | HANDOFF next = ANL Grok Build; writers benched | YES |
| writers none | `writers: none` | benched Atlas, Capitals, Permit Index, Integrity, Packages, Country Permit, Package Index, Record Fill, 501 Links | YES |
| remaining 0 | `remaining 0` on PACKAGE-TZ ACK | `_index.json` remaining=[] remaining_count=0; HANDOFF remaining 0 | YES |
| ACK 33/33 | `PASS 33/33` | `_index.json` kit_on_disk_count=33; 33 `xx.json` + 33 `xx-permit.json` on disk; HANDOFF `packages: 33/33 PASS` | YES |
| WAVE-501 | `ACK WAVE-501 US: PASS nodes 199 edges 215 filings fec 186 usaspending 29 holes 17` | `501-links.json` iso2=us nodes=199 (committee 166, org 33) edges=215 (fec/contributed 186, usaspending/granted 29) holes=17; AUDIT.md VERDICT AUDIT PASS HONEST_HOLES 17; last log sit PASS | YES |
| PACKAGE-TZ | `ACK PACKAGE-TZ: PASS holes 18` | last package sit PASS holes 18; `_index.json` last_audit PACKAGE-TZ PASS holes 18 | YES |

HANDOFF (`packages: 33/33 PASS, remaining 0`, `wave: WAVE-501 US AUDIT PASS`) agrees with STATUS and with the last AUDIT-LOG sit. `_index.json` wave field is still PACKAGE-TZ (generated 18:22:28 ET, before WAVE-501) — expected for the package inventory, not a STATUS miss.

---

## Spot-check (last 4 package ACKs)

Last four PACKAGE sits in log order: FJ, NL, TH, TZ. Task also named TZ and fj/nl/th.

| ACK | logged bytes | disk bytes | disk mtime (ET) | exists, size>0 |
|---|---|---|---|---|
| PACKAGE-FJ 17:35 PASS holes 18 | fj.json 2591, fj-permit.json 2602 | 2591, 2602 | 17:32:23, 17:33:47 | YES |
| PACKAGE-NL 17:39 PASS holes 18 | nl.json 2597, nl-permit.json 1248 | 2597, 1248 | 17:36:31, 17:37:48 | YES |
| PACKAGE-TH 17:44 PASS holes 18 | th.json 2597, th-permit.json 2769 | 2597, 2769 | 17:40:28, 17:42:33 | YES |
| PACKAGE-TZ 18:21 PASS holes 18 | tz.json 2603, tz-permit.json 2761 | 2603, 2761 | 17:45:14, 17:46:47 | YES |

Byte-for-byte match on all eight files. ACK timestamps are after file mtimes (TZ re-sit is 36 min after write, as logged). `_index.json` rows fj/nl/th/tz all audit=PASS holes=18.

Integrity extras on first sits (not a rewrite check, a size lock): PACKAGE-TW/PL logged sizes still match disk (1913/760, 1754/808). FILL-US/CN/PL logged sizes still match. Zero-length files under `_out/`: none.

---

## FEED-AUDIT vs disk

`FEED-AUDIT.md` still says atlas/capitals/permit-index were not rewritten that wave, and src was not bot-edited. Disk still agrees:

| claim | FEED-AUDIT | disk now |
|---|---|---|
| atlas.json 38842 @ 2026-08-29T10:34:44-04:00, not rewritten | yes | 38842 bytes, mtime 10:34:44.697-04:00. Unchanged. |
| capitals.json 63816 @ 10:41:40-04:00, not rewritten | yes | 63816 bytes, mtime 10:41:40.041-04:00. Unchanged. |
| permit-index.json 1477 @ 10:46:26-04:00, not rewritten | yes | 1477 bytes, mtime 10:46:26.403-04:00. Unchanged. |
| src not edited by Bots after 11:37:00-04:00 | yes | newest src is `src/lib/intel/globeEngine.ts` 11:33:32 ET; `src/lib/feeds/flights.ts` 11:33:16. No src file after 11:37. |
| FEED-AUDIT.md is the only file Integrity wrote that wave | yes | FEED-AUDIT mtime 11:40:02 still 1027 bytes. Not rewritten during package/501 waves. |
| VERDICT AUDIT PASS | yes | still AUDIT PASS, HONEST_HOLES 0 this wave |

HANDOFF file-list bytes for atlas/capitals/permit-index/FEED-AUDIT match. AUDIT.md current-wave note "newest src 11:33 host FEED globeEngine.ts" matches disk.

---

## Log integrity (append-only)

No obvious rewrite of early waves.

- 38 headings, 38 unique. Timestamps strictly increasing (12:07 → 18:39 ET). No duplicated sit clocks.
- Opening block is still PACKAGE-TW 12:07 PASS with original sizes; those files are unchanged on disk.
- Historical WAVE-501 BLOCK at 18:36 is still in the file. Later PASS appended under a new heading instead of editing the BLOCK block. Log mtime 18:39:58 matches the last sit clock 18:39.
- Front gap, not a splice: WAVE-1/2/3 and the first ten PACKAGE sits (us/ca/kr/gb/de/br/ua/fr/cn/it) are absent. Those kit files mtime 11:43–12:02, FEED-AUDIT 11:40, log starts 12:07. Looks like the log was opened at the package-TW sit, not that early blocks were overwritten.
- Mid-day gap FILL-CN 13:58 → PACKAGE-PH 16:55 (~3h). No heading collision, no backdated sits. PH/KE sizes still match.
- AUDIT.md is current-wave only (WAVE-501 PASS). That is the documented split vs append-only AUDIT-LOG.

Cannot re-hash the superseded 501-links sizes 99759 and 126063; only 125973 remains on disk.

---

## Verdict

Seat 08: **AUDIT PASS**.

STATUS is PARK, writers none, remaining 0, ACK 33/33, WAVE-501 US PASS. Last four package ACKs (FJ, NL, TH, TZ) exist on disk with logged sizes > 0. FEED-AUDIT claims still hold. One historical BLOCK is in the log and is superseded. Closeout documents agree with each other and with disk.

Honest holes this seat: AUDIT-LOG does not contain W1–W3 or the first ten PACKAGE sits; those ACKs cannot be replayed from this file. Superseded 501-links byte counts 99759/126063 are not on disk.

---

## E / I / A

**E (evidence, disk)**

- STATUS PARK; writers none; remaining 0; PASS 33/33; ACK WAVE-501 US PASS nodes 199 edges 215 fec 186 usaspending 29 holes 17; ACK PACKAGE-TZ PASS holes 18.
- 501-links.json 125973 bytes @ 18:38:37 ET; parsed counts match STATUS.
- `_index.json` kit_on_disk_count 33, remaining_count 0, last_audit PACKAGE-TZ PASS holes 18.
- FJ/NL/TH/TZ kit+permit files exist, sizes equal logged bytes, all > 0.
- atlas 38842 / capitals 63816 / permit-index 1477 mtimes unchanged from FEED-AUDIT.
- No src mtime after 11:37 ET. Newest src 11:33:32 globeEngine.ts.
- AUDIT-LOG 38 sits, timestamps monotonic, BLOCK retained, last sit WAVE-501 PASS.

**I (inference)**

- Log was opened at PACKAGE-TW, not rewritten to hide W1–W3. Front gap is omission of pre-TW package ACKs, not an in-place edit of early waves.
- WAVE-501 BLOCK → PASS is append-only supersession. Current closeout is the 18:39 PASS.
- `_index.json` still tagged PACKAGE-TZ because it was rebuilt at 18:22, before WAVE-501. Not a remaining-count lie.

**A (assumption)**

- Host timezone for STATUS/log clocks is America/New_York (UTC−4) on 2026-08-29. Disk LastWriteTime on this box matched those −04:00 stamps.
- "writers none" means no live bot writer, not that files cannot be read.

---

## Tri-state

**bot closeout is internally consistent: PASS**
