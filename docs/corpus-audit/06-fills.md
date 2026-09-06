# Seat 06 — fill files vs gold kits

Target class: public-suite. Tree: this app. Corpus: `vendor/kept/_out/`. Bots PARK.
Mined disk only. Did not edit `src/`, `vendor/kept/kits/`, `vendor/kept/_out/`, `package.json`, or live grok.me.
`votes.json` was never loaded: filesystem metadata + first ~6 header lines only.

Claim under audit: **fills are ingest-drop records, not a second harvest.**

## 12-row table

All 12 `packages/*-fill.json` files exist. Top-level keys are the same on every file: `iso2, wave, hole_type, retrieved, source, read_only, did_not_rewrite, counts, log, summary, notes`. None carry `items`, `members`, or a pledge-row array. `hole_type` is `ingest-drop` on all 12. `retrieved` is `2026-08-29`. Every log row is `action: left`. `summary.restored` is 0 on all 12. Byte sizes match `AUDIT-LOG.md` FILL-* blocks.

Local times are host ET (UTC−4). Fill mtimes are the FILL-wave writes, not this corpus-audit sitting.

| iso | bytes | fill mtime ET | wave | restored | leftover holes | minted pledges / sitting names | evid S/U/D/H | kit members LastWriteTime ET / bytes | kit votes LastWriteTime ET / bytes |
|-----|------:|---------------|------|--------:|---------------:|--------------------------------|--------------|--------------------------------------|------------------------------------|
| us | 9870 | 2026-08-29 12:32:44 | WAVE-FILL-US | 0 | 19 | no | 17/2/0/0 | 2026-08-21 11:36:34 / 157076 | 2026-08-21 11:36:34 / 8131988 |
| ca | 10931 | 2026-08-29 12:45:45 | WAVE-FILL-CA | 0 | 21 | no | 15/6/0/0 | 2026-08-21 01:21:25 / 139296 | 2026-08-21 01:21:26 / 4815804 |
| kr | 10603 | 2026-08-29 12:55:15 | WAVE-FILL-KR | 0 | 16 | no | 14/2/0/0 | 2026-08-21 10:52:10 / 136184 | 2026-08-21 10:52:28 / 6659775 |
| gb | 14191 | 2026-08-29 13:04:57 | WAVE-FILL-GB | 0 | 21 | no | 19/2/0/0 | 2026-08-21 01:32:59 / 235069 | 2026-08-21 01:33:22 / 33325777 |
| de | 12579 | 2026-08-29 13:14:45 | WAVE-FILL-DE | 0 | 19 | no | 18/1/0/0 | 2026-08-21 04:06:41 / 209333 | 2026-08-21 04:06:48 / 3882012 |
| br | 17049 | 2026-08-29 13:24:07 | WAVE-FILL-BR | 0 | 19 | no | 17/2/0/0 | 2026-08-21 01:25:38 / 179351 | 2026-08-21 01:25:37 / 59081350 |
| ua | 13622 | 2026-08-29 13:36:37 | WAVE-FILL-UA | 0 | 17 | no | 17/0/0/0 | 2026-08-21 03:24:58 / 214968 | 2026-08-21 01:20:52 / 90993406 |
| fr | 15685 | 2026-08-29 13:48:36 | WAVE-FILL-FR | 0 | 19 | no | 18/1/0/0 | 2026-08-21 01:18:20 / 249980 | 2026-08-21 01:18:27 / 33516386 |
| cn | 18083 | 2026-08-29 13:57:50 | WAVE-FILL-CN | 0 | 19 | no | 18/1/0/0 | 2026-08-21 01:19:10 / 1502571 | 2026-08-21 01:19:10 / 67763 |
| it | 15190 | 2026-08-29 17:00:04 | WAVE-FILL-IT | 0 | 19 | no | 18/1/0/0 | 2026-08-21 06:25:51 / 138809 | 2026-08-21 06:25:50 / 5281811 |
| tw | 19356 | 2026-08-29 17:07:46 | WAVE-FILL-TW | 0 | 21 | no | 20/1/0/0 | 2026-08-21 01:28:47 / 55432 | 2026-08-21 01:21:39 / 4105282 |
| pl | 19335 | 2026-08-29 17:17:07 | WAVE-FILL-PL | 0 | 21 | no | 20/1/0/0 | 2026-08-21 01:19:45 / 176645 | 2026-08-21 01:19:45 / 33593835 |

Totals: restored **0**. Leftover holes **231**. Fill files on disk **12/12**. No extra `*-fill.json`.

Each fill `counts` block is a read of the existing kit (pledge/vote/ethics/source tallies). It is not a new harvest payload. Notes on all 12 include “Did not invent pledges, sitting names, fees, AHJs.” Log reasons repeatedly refuse restore because restore would mint a pledge or sitting name. That is the honest-hole path.

## Kit mtime check

Gold window required: `vendor/kept/kits/{iso}/members.json` and `votes.json` LastWriteTime still **2026-08-20 or 2026-08-21**, not rewritten this sitting (2026-08-29).

| iso | members LastWriteTime ET | members UTC | votes LastWriteTime ET | votes UTC | members.json `retrieved` (head) | votes.json `retrieved` (head) | gold window | rewritten 2026-08-29 |
|-----|--------------------------|-------------|------------------------|-----------|---------------------------------|-------------------------------|-------------|----------------------|
| us | 2026-08-21 11:36:34 | 2026-08-21T15:36:34Z | 2026-08-21 11:36:34 | 2026-08-21T15:36:34Z | 2026-08-20 | (not in first 6 lines) | PASS | no |
| ca | 2026-08-21 01:21:25 | 2026-08-21T05:21:25Z | 2026-08-21 01:21:26 | 2026-08-21T05:21:26Z | 2026-08-20 | 2026-08-20 | PASS | no |
| kr | 2026-08-21 10:52:10 | 2026-08-21T14:52:10Z | 2026-08-21 10:52:28 | 2026-08-21T14:52:28Z | 2026-08-20 | 2026-08-21 | PASS | no |
| gb | 2026-08-21 01:32:59 | 2026-08-21T05:32:59Z | 2026-08-21 01:33:22 | 2026-08-21T05:33:22Z | 2026-08-20 | 2026-08-20 | PASS | no |
| de | 2026-08-21 04:06:41 | 2026-08-21T08:06:41Z | 2026-08-21 04:06:48 | 2026-08-21T08:06:48Z | 2026-08-20 | 2026-08-20 | PASS | no |
| br | 2026-08-21 01:25:38 | 2026-08-21T05:25:38Z | 2026-08-21 01:25:37 | 2026-08-21T05:25:37Z | 2026-08-20 | 2026-08-21 | PASS | no |
| ua | 2026-08-21 03:24:58 | 2026-08-21T07:24:58Z | 2026-08-21 01:20:52 | 2026-08-21T05:20:52Z | 2026-08-20 | (not in first 6 lines) | PASS | no |
| fr | 2026-08-21 01:18:20 | 2026-08-21T05:18:20Z | 2026-08-21 01:18:27 | 2026-08-21T05:18:27Z | 2026-08-20 | 2026-08-21 | PASS | no |
| cn | 2026-08-21 01:19:10 | 2026-08-21T05:19:10Z | 2026-08-21 01:19:10 | 2026-08-21T05:19:10Z | 2026-08-20 | 2026-08-20 | PASS | no |
| it | 2026-08-21 06:25:51 | 2026-08-21T10:25:51Z | 2026-08-21 06:25:50 | 2026-08-21T10:25:50Z | 2026-08-20 | 2026-08-21 | PASS | no |
| tw | 2026-08-21 01:28:47 | 2026-08-21T05:28:47Z | 2026-08-21 01:21:39 | 2026-08-21T05:21:39Z | 2026-08-20 | 2026-08-21 | PASS | no |
| pl | 2026-08-21 01:19:45 | 2026-08-21T05:19:45Z | 2026-08-21 01:19:45 | 2026-08-21T05:19:45Z | 2026-08-20 | 2026-08-21 | PASS | no |

Member/vote byte sizes match the FILL-* `AUDIT-LOG.md` lines (`kits/{iso} untouched (members N votes N dates 2026-08-21)` / `2026-08-20/21`). TW and PL log those dates as 2026-08-20/21 because `members.json` `retrieved` is 2026-08-20 while LastWriteTime is 2026-08-21. That is still the gold window.

`did_not_rewrite` on every fill lists `vendor/kept/kits/{iso}`, `votes.json`, `members.json`, and `src/`. Disk agrees.

## Honest holes vs fake-complete

No fill looks like a closed harvest. Pattern on all 12:

- Restore rule stated in notes: restore a URL the kit already has in `sources.json`, or leave the hole.
- Zero URLs restored onto scoring citations. Existing pledges/votes already carry http(s); leftover member-site, index, companion, and speech URLs were left.
- Restore was refused where it would mint a pledge, a second pledge, a sitting name, an AHJ, or a floor row. Phrase used: incomplete beats fake-complete.
- Empty `institutional.json` / honest-empty `gap.json` / roster vacancies are labeled not ingest-drop and were not padded.
- Unproven leftover pages were not recrawled.

That is honest incomplete, not fake-complete. Invented sitting names would be BLOCK. None found.

## Kits with no fill (21 of 33) — expected holes

`packages/_index.json` `kit_on_disk` is 33 ISO2. Fills exist only for the 12 above. The other 21 have kit + permit packages and no `*-fill.json`. HANDOFF already records “No ng/tr/mx fill.” Absence of a fill is an expected hole, not a missing gold kit.

| no-fill iso | members LastWriteTime date | votes LastWriteTime date | gold window |
|-------------|----------------------------|--------------------------|-------------|
| ar | 2026-08-21 | 2026-08-21 | yes |
| au | 2026-08-21 | 2026-08-21 | yes |
| cl | 2026-08-21 | 2026-08-21 | yes |
| eg | 2026-08-21 | 2026-08-21 | yes |
| es | 2026-08-21 | 2026-08-21 | yes |
| fj | 2026-08-21 | 2026-08-21 | yes |
| gh | 2026-08-21 | 2026-08-21 | yes |
| id | 2026-08-21 | 2026-08-21 | yes |
| il | 2026-08-21 | 2026-08-21 | yes |
| in | 2026-08-21 | 2026-08-21 | yes |
| jp | 2026-08-21 | 2026-08-21 | yes |
| ke | 2026-08-21 | 2026-08-21 | yes |
| mx | 2026-08-21 | 2026-08-21 | yes |
| ng | 2026-08-21 | 2026-08-21 | yes |
| nl | 2026-08-21 | 2026-08-21 | yes |
| nz | 2026-08-21 | 2026-08-21 | yes |
| ph | 2026-08-21 | 2026-08-21 | yes |
| th | 2026-08-20 | 2026-08-20 | yes |
| tr | 2026-08-21 | 2026-08-21 | yes |
| tz | 2026-08-21 | 2026-08-21 | yes |
| za | 2026-08-21 | 2026-08-21 | yes |

List: **ar au cl eg es fj gh id il in jp ke mx ng nl nz ph th tr tz za**.

## E / I / A

- **E.** 12 fill files under `vendor/kept/_out/packages/`. Each is an ingest-drop log: `restored=0`, leftover holes 16–21, all `action=left`, no member/pledge arrays. Fill byte sizes match `AUDIT-LOG.md`. Matching gold `members.json` / `votes.json` LastWriteTime is 2026-08-21 (retrieved heads 2026-08-20 or 2026-08-21). None rewritten 2026-08-29. 21 of 33 kits have no fill file. HANDOFF names the same 12 fills.
- **I.** FILL waves examined leftover kit URLs and declined to mint. They did not harvest a second roster, pledge set, or vote floor into the gold kits or into the fill files.
- **A.** A “second harvest” would rewrite kit `members.json`/`votes.json` or emit fill payloads with new sitting names/pledge rows. This seat did not re-fetch the web and did not open multi-MB `votes.json` bodies.

## Tri-state — “fills are ingest-drop records, not a second harvest”

**CONFIRMED.**

Not UNPROVEN: every fill declares `hole_type: ingest-drop`, restores 0, and leaves leftover holes. Not BLOCK: no fill minted pledges or sitting names; gold kits still dated 2026-08-20/21.

## Verdict

**PASS.** 12/12 fills are ingest-drop records. Restored 0. Honest leftover holes 231. Gold kits untouched this sitting. 21 kits without fills are expected holes. No BLOCK.
