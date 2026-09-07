# SEAT 26 — FENCE SRC

Target class: public-suite  
Tree: `REPO_ROOT`  
Seat: 26 Fence. Write this file only. No `src/` edits this sit.  
Mined: 2026-08-29 19:23:34 -04:00 (Eastern Daylight Time)  
Method: disk `LastWriteTime` / `Length` / SHA-256. Content scan of named civic files + `globeEngine.ts`. No network. No revert.

Host law this sit: host civic HUD (KIT-01 layers + corpus panel) may move. `globeEngine.ts` must stay the 11:33 host FEED snapshot. KIT-02 (`DeskDrawer`, `{ type: "desk" }`) stays off.

## Verdict

**PASS** — globeEngine not rewritten after 11:33 host FEED. KIT-02 absent from engine and civic files.

## E / I / A

**E** — Established from disk mtimes, sizes, hashes, and string scan. Not inferred.  
**I** — Host civic sitting after PARK moved seven HUD files; engine was left alone.  
**A** — Do not open KIT-02. Do not add LEG/AHJ subscribe branches in `globeEngine.ts`.

---

## 1. Newest `src/` mtimes (E)

`src/` file count: **84** (was **82** at seat-09 fence; +`corpus.ts` + `CorpusPanel.tsx`).

Cutoff: host FEED `globeEngine.ts` **2026-08-29 11:33:32.077 -04:00**. Bot fence in `FEED-AUDIT.md` is **11:37:00**. Anything on `globeEngine.ts` later than 11:33:32.077 = FLAG.

Files with `LastWriteTime` **after 11:37:00**: **7** (all host civic).  
Files with `LastWriteTime` **after 11:33:32.077**: **7** (same seven).  
`globeEngine.ts` equals the FEED stamp, not later.

Newest 15:

| LastWriteTime | bytes | path | band |
|---|---:|---|---|
| 2026-08-29 19:16:00.507 -04:00 | 6329 | `src/lib/intel/commands.ts` | civic |
| 2026-08-29 19:15:43.056 -04:00 | 4631 | `src/components/intel/CorpusPanel.tsx` | civic |
| 2026-08-29 19:15:43.056 -04:00 | 28766 | `src/components/intel/OverlayHud.tsx` | civic |
| 2026-08-29 19:06:25.719 -04:00 | 4695 | `src/lib/intel/corpus.ts` | civic |
| 2026-08-29 19:05:42.378 -04:00 | 5301 | `src/lib/intel/store.ts` | civic |
| 2026-08-29 19:05:42.373 -04:00 | 6215 | `src/lib/intel/runCommand.ts` | civic |
| 2026-08-29 19:05:15.000 -04:00 | 5414 | `src/lib/intel/types.ts` | civic |
| 2026-08-29 11:33:32.077 -04:00 | 47032 | `src/lib/intel/globeEngine.ts` | FEED engine |
| 2026-08-29 11:33:16.119 -04:00 | 13595 | `src/lib/feeds/flights.ts` | FEED |
| 2026-08-29 11:30:12.760 -04:00 | 22425 | `src/lib/intel/flatEngine.ts` | FEED engine |
| 2026-08-29 11:29:10.684 -04:00 | 1851 | `src/lib/intel/flightView.ts` | FEED |
| 2026-08-29 11:17:54.457 -04:00 | 10063 | `src/styles.css` | pre-FEED |
| 2026-08-29 11:17:54.457 -04:00 | 948 | `src/lib/intel/viewport.ts` | pre-FEED |
| 2026-08-29 11:13:53.344 -04:00 | 4312 | `src/components/intel/FeedUnlock.tsx` | pre-FEED |
| 2026-08-29 11:13:15.300 -04:00 | 2500 | `src/lib/intel/feedKeys.ts` | pre-FEED |

Seat-09 fence newest-src claim (`globeEngine.ts` 11:33:32.077 / 47032) still matches **this file**. It is no longer the newest `src/` file because host civic HUD landed at 19:05–19:16.

---

## 2. Host civic vs globeEngine (E)

Civic set named by host: `types.ts`, `store.ts`, `commands.ts`, `runCommand.ts`, `OverlayHud.tsx`, `corpus.ts`, `CorpusPanel.tsx`.

| file | LastWriteTime | bytes | SHA-256 | vs 11:33 FEED |
|---|---|---:|---|---|
| `src/lib/intel/types.ts` | 19:05:15.000 | 5414 | `E994DE90695D835832774197790278947AF1DCDB92FEAD46EB5D50D65A2561E9` | **after** (host) |
| `src/lib/intel/store.ts` | 19:05:42.378 | 5301 | `991FA6055279B8C561F238A8F55CFDD783CF768D8A7FDFEEE83A45778A077DBE` | **after** (host) |
| `src/lib/intel/runCommand.ts` | 19:05:42.373 | 6215 | `4D434C1100A146B12CC34015DB6190E1E3DACB4A790A84A4CBD859BEEC2118E7` | **after** (host) |
| `src/lib/intel/corpus.ts` | 19:06:25.719 | 4695 | `10973AA5752A0D004AACAC4D86EF0D1B5640C9110D6C902F11409C1B4787B51D` | **after** (host; new file) |
| `src/components/intel/OverlayHud.tsx` | 19:15:43.056 | 28766 | `2DBB68E959E597A6FC19758923E36F72724C12564B2FA95F8B81F408F0A275EE` | **after** (host) |
| `src/components/intel/CorpusPanel.tsx` | 19:15:43.056 | 4631 | `93D4B6740787FF5406B21C2E580A3686382E50A641724AC1397228C99D8E8A72` | **after** (host; new file) |
| `src/lib/intel/commands.ts` | 19:16:00.507 | 6329 | `30CFEFE0938A4AF0488C7FBDB672C5C2EB89ECDC6E4E7A5E515F6C8593737685` | **after** (host) |
| `src/lib/intel/globeEngine.ts` | 11:33:32.077 | 47032 | `02D9E0497451F4A246444B5EDB98AB00C49D6387FF64821A61F295413352A677` | **same** |

Seat-09 sizes for comparison: `types.ts` was 4992 @ 11:13:15.271; now 5414 @ 19:05:15. `globeEngine.ts` 47032 @ 11:33:32.077 **unchanged**.

Adjacent engines that must also stay off KIT-02:

| file | LastWriteTime | bytes | note |
|---|---|---:|---|
| `src/lib/intel/flatEngine.ts` | 11:30:12.760 | 22425 | no `legislatures` / `permits` |
| `src/components/intel/GlobeCanvas.tsx` | 07:07:29.679 | 2047 | boot wrapper only |
| `src/lib/intel/share.ts` | 07:07:29.707 | 1988 | auto-follow, not this sit |
| `src/components/intel/DetectionOverlay.tsx` | 07:07:29.677 | 837 | auto-follow, not this sit |

### Civic contents (E, scan)

- `LayerId` / `Kind` include `legislatures` / `permits` and `legislature` / `permit`.
- `LAYER_META` has LEG / AHJ source strings. `defaultLayers()` both `on: false`, count 0.
- `CommandAction` has `{ type: "corpus"; on: boolean }`. **No** `{ type: "desk" }`.
- Store has `corpusOpen` / `setCorpusOpen`. **No** `desk` field.
- OverlayHud `LAYER_ORDER` appends `legislatures`, `permits`. Mounts `<CorpusPanel />`.
- `runCommand` corpus branch toggles the HUD panel; does not call the engine.
- `corpus.ts` reads `_out` JSON (atlas / capitals / permit-index / packages/_index). Lazy 501.

### globeEngine contents (E, scan)

`useIntel.subscribe` still seven intel layers only: flights, military, vessels, satellites, earthquakes, fires, launches. No LEG/AHJ branch.

String hits in `src/lib/intel/globeEngine.ts`:

| needle | count |
|---|---:|
| `legislatures` | 0 |
| `permits` | 0 |
| `DeskDrawer` | 0 |
| `KIT-02` | 0 |
| `corpus` | 0 |
| `places-rest` | 0 |
| `capitals.json` | 0 |
| `type: "desk"` | 0 |
| `kept desks` | 0 |

`src/components/desks/` does not exist. No `*Desk*` file under `src/`.

---

## 3. FLAG: globeEngine after 11:33 host FEED?

**NO FLAG.**

`globeEngine.ts` LastWriteTime is **2026-08-29 11:33:32.077 -04:00**, 47032 bytes — identical to seat-09 fence and to `AUDIT.md` “newest src 11:33 host FEED globeEngine.ts”. Not rewritten during the 19:05–19:16 civic HUD sit.

Do not confuse “newest `src/` is now civic” with “engine was touched.” The seven files after 11:37 are the civic set only.

---

## 4. KIT-02 stay-off (E then I)

**E.** No `DeskDrawer`. No `{ type: "desk" }`. No `src/components/desks/`. globeEngine has no civic pin loop and no desk store.

**I.** KIT-01 + corpus panel live in HUD/store/commands. That is not KIT-02. Engine subscribe would be the leak path for 16k Rest pins; it was not opened.

**A.** Next implement for KIT-02 is seats 07–10 / 31 (`docs/dev-team/README.md`). This fence: refuse engine edits and refuse a desk command type.

Honest phrase, not a drawer: `commands.ts` layer regex includes `kept desks?` as a **legislatures** alias. That is KIT-01 parse, not `DeskDrawer`.

---

## Fail checks

| check | result |
|---|---|
| `globeEngine.ts` LastWriteTime after 11:33:32.077 | **PASS** — exact FEED stamp |
| civic seven after 11:37 | expected host HUD; not an engine leak |
| KIT-02 / `DeskDrawer` / `{ type: "desk" }` in civic or engine | **PASS** — absent |
| globeEngine LEG/AHJ / capitals / places-rest subscribe | **PASS** — 0 hits |
| `flatEngine.ts` / `GlobeCanvas.tsx` after 11:33 | **PASS** — still 11:30 / 07:07 |

## Honest holes

- Fence is LastWriteTime + hash + string scan. Not git index vs working tree.
- Did not dump civic or engine source. Did not execute the app.
- `kept desks?` alias in `commands.ts` is a phrase, not KIT-02; later seats must not treat it as a drawer stub.

## Close

VERDICT: **PASS**  
E/I/A: **E** (mtimes/hashes/scan) · **I** (civic HUD vs frozen engine) · **A** (keep globeEngine off KIT-02)  
globeEngine after 11:33 host FEED: **NO**  
KIT-02 on globeEngine: **OFF**
