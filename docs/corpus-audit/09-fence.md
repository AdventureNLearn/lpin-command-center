# SEAT 09 — FENCE

Target class: public-suite  
Tree: `REPO_ROOT`  
Corpus: `vendor/kept/_out/`  
Bots: PARK (`vendor/kept/_out/STATUS.md` STATUS: PARK, writers: none)  
Mined: 2026-08-29 18:56:33 -04:00 (Eastern Daylight Time)  
Method: disk only. PowerShell `LastWriteTime` / `Length`. Content scan of `_out` (not `kits`). No network. No revert.

Host law: bots must not edit `src/`; must not rewrite `votes.json` / `members.json`; no secrets in `_out`.

## Verdict

**PASS**

## E/I/A

**E** — Established from disk mtimes and `_out` content scan. Not inferred. Not assumed.

## Fence held: corpus is `_out`-only

**HELD** (tri-state: HELD / BREACHED / UNKNOWN)

Bot writers after host FEED sitting (~11:37 ET) stayed in `vendor/kept/_out/`. `src/` has no file after the 11:37 cutoff. Kit `votes.json` / `members.json` were not rewritten after 2026-08-22. W1–W3 atlas files still carry morning mtimes. `_out` has no secret values.

---

## 1. Newest 15 files under `src/` (LastWriteTime)

Cutoff: host feed sitting ended ~**2026-08-29 11:37:00 -04:00**. Anything later = possible bot/`src` leak (report, do not revert).

`src/` file count: **82**. Files with `LastWriteTime` after cutoff: **0**.

| LastWriteTime | bytes | path |
|---|---:|---|
| 2026-08-29 11:33:32.077 -04:00 | 47032 | `src/lib/intel/globeEngine.ts` |
| 2026-08-29 11:33:16.119 -04:00 | 13595 | `src/lib/feeds/flights.ts` |
| 2026-08-29 11:30:12.760 -04:00 | 22425 | `src/lib/intel/flatEngine.ts` |
| 2026-08-29 11:29:10.684 -04:00 | 1851 | `src/lib/intel/flightView.ts` |
| 2026-08-29 11:17:54.457 -04:00 | 10063 | `src/styles.css` |
| 2026-08-29 11:17:54.457 -04:00 | 948 | `src/lib/intel/viewport.ts` |
| 2026-08-29 11:13:53.344 -04:00 | 4312 | `src/components/intel/FeedUnlock.tsx` |
| 2026-08-29 11:13:15.300 -04:00 | 2500 | `src/lib/intel/feedKeys.ts` |
| 2026-08-29 11:13:15.271 -04:00 | 4992 | `src/lib/intel/types.ts` |
| 2026-08-29 11:04:33.556 -04:00 | 472 | `src/lib/intel/phone.ts` |
| 2026-08-29 10:50:08.847 -04:00 | 1741 | `src/routeTree.gen.ts` |
| 2026-08-29 07:07:29.714 -04:00 | 231 | `src/routes/index.tsx` |
| 2026-08-29 07:07:29.714 -04:00 | 1958 | `src/routes/__root.tsx` |
| 2026-08-29 07:07:29.712 -04:00 | 311 | `src/router.tsx` |
| 2026-08-29 07:07:29.712 -04:00 | 206 | `src/lib/vendor/wasm-stub.js` |

Newest `src` file is `globeEngine.ts` at **11:33:32.077**, **~3.5 min before** 11:37. Matches `vendor/kept/_out/AUDIT.md` note “newest src 11:33 host FEED globeEngine.ts”. **No bot/`src` leak.**

---

## 2. `votes.json` / `members.json` under `vendor/kept/kits/` (metadata only)

Flag: any `LastWriteTime` after **2026-08-22**.

Counts: **34** `votes.json`, **34** `members.json` (33 ISO2 kits + `_template`). After 2026-08-22: **0**.

Newest pair:

| LastWriteTime | bytes | path |
|---|---:|---|
| 2026-08-21 15:27:01.110 -04:00 | 36 | `vendor/kept/kits/cl/votes.json` |
| 2026-08-21 15:27:01.107 -04:00 | 36 | `vendor/kept/kits/cl/members.json` |

Full metadata, newest first (no contents dumped):

| LastWriteTime | bytes | path |
|---|---:|---|
| 2026-08-21 15:27:01 -04:00 | 36 | `vendor/kept/kits/cl/votes.json` |
| 2026-08-21 15:27:01 -04:00 | 36 | `vendor/kept/kits/cl/members.json` |
| 2026-08-21 15:26:30 -04:00 | 56 | `vendor/kept/kits/fj/votes.json` |
| 2026-08-21 15:26:30 -04:00 | 56 | `vendor/kept/kits/fj/members.json` |
| 2026-08-21 15:24:58 -04:00 | 34 | `vendor/kept/kits/nl/votes.json` |
| 2026-08-21 15:24:58 -04:00 | 34 | `vendor/kept/kits/nl/members.json` |
| 2026-08-21 15:24:43 -04:00 | 34 | `vendor/kept/kits/tz/votes.json` |
| 2026-08-21 15:24:43 -04:00 | 34 | `vendor/kept/kits/tz/members.json` |
| 2026-08-21 13:13:28 -04:00 | 113503 | `vendor/kept/kits/ar/votes.json` |
| 2026-08-21 13:13:28 -04:00 | 98316 | `vendor/kept/kits/ar/members.json` |
| 2026-08-21 11:36:34 -04:00 | 8131988 | `vendor/kept/kits/us/votes.json` |
| 2026-08-21 11:36:34 -04:00 | 157076 | `vendor/kept/kits/us/members.json` |
| 2026-08-21 10:52:28 -04:00 | 6659775 | `vendor/kept/kits/kr/votes.json` |
| 2026-08-21 10:52:10 -04:00 | 136184 | `vendor/kept/kits/kr/members.json` |
| 2026-08-21 08:50:15 -04:00 | 67309417 | `vendor/kept/kits/es/votes.json` |
| 2026-08-21 06:25:51 -04:00 | 138809 | `vendor/kept/kits/it/members.json` |
| 2026-08-21 06:25:50 -04:00 | 5281811 | `vendor/kept/kits/it/votes.json` |
| 2026-08-21 06:25:12 -04:00 | 288166 | `vendor/kept/kits/tr/members.json` |
| 2026-08-21 06:22:31 -04:00 | 1426353 | `vendor/kept/kits/tr/votes.json` |
| 2026-08-21 05:36:26 -04:00 | 20537 | `vendor/kept/kits/id/votes.json` |
| 2026-08-21 04:06:48 -04:00 | 3882012 | `vendor/kept/kits/de/votes.json` |
| 2026-08-21 04:06:41 -04:00 | 209333 | `vendor/kept/kits/de/members.json` |
| 2026-08-21 03:49:58 -04:00 | 140692 | `vendor/kept/kits/es/members.json` |
| 2026-08-21 03:24:58 -04:00 | 214968 | `vendor/kept/kits/ua/members.json` |
| 2026-08-21 01:33:22 -04:00 | 33325777 | `vendor/kept/kits/gb/votes.json` |
| 2026-08-21 01:32:59 -04:00 | 235069 | `vendor/kept/kits/gb/members.json` |
| 2026-08-21 01:28:47 -04:00 | 55432 | `vendor/kept/kits/tw/members.json` |
| 2026-08-21 01:25:38 -04:00 | 179351 | `vendor/kept/kits/br/members.json` |
| 2026-08-21 01:25:37 -04:00 | 59081350 | `vendor/kept/kits/br/votes.json` |
| 2026-08-21 01:22:58 -04:00 | 52454 | `vendor/kept/kits/in/votes.json` |
| 2026-08-21 01:22:58 -04:00 | 213576 | `vendor/kept/kits/in/members.json` |
| 2026-08-21 01:21:39 -04:00 | 4105282 | `vendor/kept/kits/tw/votes.json` |
| 2026-08-21 01:21:26 -04:00 | 4815804 | `vendor/kept/kits/ca/votes.json` |
| 2026-08-21 01:21:25 -04:00 | 139296 | `vendor/kept/kits/ca/members.json` |
| 2026-08-21 01:20:52 -04:00 | 90993406 | `vendor/kept/kits/ua/votes.json` |
| 2026-08-21 01:20:38 -04:00 | 243497 | `vendor/kept/kits/id/members.json` |
| 2026-08-21 01:20:33 -04:00 | 194877 | `vendor/kept/kits/mx/votes.json` |
| 2026-08-21 01:20:33 -04:00 | 216128 | `vendor/kept/kits/mx/members.json` |
| 2026-08-21 01:20:22 -04:00 | 141766 | `vendor/kept/kits/jp/votes.json` |
| 2026-08-21 01:20:22 -04:00 | 196180 | `vendor/kept/kits/jp/members.json` |
| 2026-08-21 01:19:57 -04:00 | 160625 | `vendor/kept/kits/eg/votes.json` |
| 2026-08-21 01:19:57 -04:00 | 327116 | `vendor/kept/kits/eg/members.json` |
| 2026-08-21 01:19:45 -04:00 | 33593835 | `vendor/kept/kits/pl/votes.json` |
| 2026-08-21 01:19:45 -04:00 | 176645 | `vendor/kept/kits/pl/members.json` |
| 2026-08-21 01:19:10 -04:00 | 39282 | `vendor/kept/kits/ke/votes.json` |
| 2026-08-21 01:19:10 -04:00 | 140682 | `vendor/kept/kits/ke/members.json` |
| 2026-08-21 01:19:10 -04:00 | 67763 | `vendor/kept/kits/cn/votes.json` |
| 2026-08-21 01:19:10 -04:00 | 1502571 | `vendor/kept/kits/cn/members.json` |
| 2026-08-21 01:18:44 -04:00 | 337364 | `vendor/kept/kits/il/votes.json` |
| 2026-08-21 01:18:44 -04:00 | 40542 | `vendor/kept/kits/il/members.json` |
| 2026-08-21 01:18:41 -04:00 | 37597 | `vendor/kept/kits/ph/votes.json` |
| 2026-08-21 01:18:41 -04:00 | 147553 | `vendor/kept/kits/ph/members.json` |
| 2026-08-21 01:18:34 -04:00 | 29917 | `vendor/kept/kits/za/votes.json` |
| 2026-08-21 01:18:29 -04:00 | 155421 | `vendor/kept/kits/nz/votes.json` |
| 2026-08-21 01:18:29 -04:00 | 51109 | `vendor/kept/kits/nz/members.json` |
| 2026-08-21 01:18:27 -04:00 | 33516386 | `vendor/kept/kits/fr/votes.json` |
| 2026-08-21 01:18:20 -04:00 | 249980 | `vendor/kept/kits/fr/members.json` |
| 2026-08-21 01:16:22 -04:00 | 1141543 | `vendor/kept/kits/au/votes.json` |
| 2026-08-21 01:16:22 -04:00 | 65075 | `vendor/kept/kits/au/members.json` |
| 2026-08-21 00:49:27 -04:00 | 184643 | `vendor/kept/kits/za/members.json` |
| 2026-08-21 00:36:35 -04:00 | 369370 | `vendor/kept/kits/ng/votes.json` |
| 2026-08-21 00:36:35 -04:00 | 161931 | `vendor/kept/kits/ng/members.json` |
| 2026-08-21 00:20:56 -04:00 | 79043 | `vendor/kept/kits/gh/votes.json` |
| 2026-08-21 00:20:56 -04:00 | 119760 | `vendor/kept/kits/gh/members.json` |
| 2026-08-20 19:54:56 -04:00 | 34 | `vendor/kept/kits/_template/votes.json` |
| 2026-08-20 19:54:56 -04:00 | 34 | `vendor/kept/kits/th/votes.json` |
| 2026-08-20 19:54:56 -04:00 | 34 | `vendor/kept/kits/th/members.json` |
| 2026-08-20 19:54:56 -04:00 | 34 | `vendor/kept/kits/_template/members.json` |

Oldest window is 2026-08-20 19:54. Newest window is 2026-08-21 15:27. **No rewrite after 2026-08-22.** Kits not rewritten by PARK-wave bots.

---

## 3. Secret-like scan — `vendor/kept/_out/` only (not `kits`)

Scope: 90 files under `vendor/kept/_out/`. Patterns: `sk-` key material, Bearer tokens, `AVIATIONSTACK_ACCESS_KEY` with a value, localStorage dumps. Policy mentions of Aviationstack without values are OK.

| pattern | hits | notes |
|---|---:|---|
| `sk-[A-Za-z0-9_-]{8,}` / `sk_live_` / `sk_test_` | 0 | no OpenAI-style secret keys |
| `Bearer` + token | 0 | none |
| `AVIATIONSTACK_ACCESS_KEY` (any) | 0 | identifier absent; no `=` / `:` value |
| `AVIATIONSTACK_ACCESS_KEY` with a value | 0 | none |
| `localStorage` | 1 | policy line only |
| `xai-` / `gsk_` / `AKIA` / PEM private key / JWT `eyJ…` | 0 | none |

`localStorage` hit (policy, not a dump):

- `vendor/kept/_out/PASTE-FOR-ANL-FEEDS.md:38` — “Confirm no API keys, tokens, or localStorage dumps appear in `_out/`”

Aviationstack policy mentions (no values; OK):

- `vendor/kept/_out/FEED-AUDIT.md:14` — host law: ADS-B then Aviationstack if thin
- `vendor/kept/_out/PASTE-FOR-ANL-FEEDS.md:16` — feed waterfall
- `vendor/kept/_out/PASTE-FOR-ANL-FEEDS.md:39` — same host law

**Secret scan: PASS.** No keys, no Bearer tokens, no Aviationstack values, no localStorage dumps.

---

## 4. W1–W3 atlas mtimes (must still be morning ~10:34–10:46 ET)

Expected from `vendor/kept/_out/FEED-AUDIT.md`: atlas 38842 @ 10:34:44; capitals 63816 @ 10:41:40; permit-index 1477 @ 10:46:26. Flag rewrite.

| file | LastWriteTime | bytes | wave | rewrite? |
|---|---|---:|---|---|
| `vendor/kept/_out/atlas.json` | 2026-08-29 10:34:44.697 -04:00 | 38842 | W1 | **no** |
| `vendor/kept/_out/capitals.json` | 2026-08-29 10:41:40.041 -04:00 | 63816 | W2 | **no** |
| `vendor/kept/_out/permit-index.json` | 2026-08-29 10:46:26.403 -04:00 | 1477 | W3 | **no** |

Mtimes and sizes match FEED-AUDIT. Still morning W1–W3. **Not rewritten** after PARK-wave package / 501 work (`_index.json` 18:22, `501-links.json` 18:38, `HANDOFF.md` 18:40, `STATUS.md` 18:52).

---

## Fail checks

| check | result |
|---|---|
| `src/` after 2026-08-29 11:37 ET | PASS — 0 files; newest 11:33:32 globeEngine.ts |
| `votes.json` / `members.json` after 2026-08-22 | PASS — newest 2026-08-21 15:27 cl |
| secrets in `_out` | PASS — policy mentions only |
| atlas / capitals / permit-index rewrite | PASS — still 10:34:44 / 10:41:40 / 10:46:26 |

## Honest holes

- This seat does not prove git index vs working tree; fence is LastWriteTime + `_out` content.
- `kits/` other JSON (issues, money, …) not in this seat’s rewrite flag. Only `votes.json` and `members.json`.
- No revert performed (nothing to revert).

## Close

VERDICT: **PASS**  
E/I/A: **E**  
fence held: corpus is `_out`-only: **HELD**
