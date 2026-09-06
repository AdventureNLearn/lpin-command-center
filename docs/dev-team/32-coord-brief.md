# SEAT 32 — COORDINATOR COMMS / STANDUP

Seat: **32 COMMS**. Coordinator: Host Grok Build (this TUI).
Target class: public-suite. Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`.
Date: 2026-08-29. **This file only.** No `src/`, `_out/`, `kits/`. Fence band (26–30, 32).

Law: `docs/dev-team/README.md` — one tree, one writer per file, write only `docs/dev-team/<NN>-*.md`.

---

## Gate (read first)

**KIT-02 empty DeskDrawer: GO.** 01 / 04 / 05 all GO. Implement this sitting.

| Lead | File | Verdict for *this* sitting |
| --- | --- | --- |
| **01 INTEGRATION** | `01-lead-integration.md` | **GO** — empty drawer, ≤8 files, globe + radio + command bar survive |
| **04 HUD / P0** | `04-lead-hud.md` | **GO** — empty shell only; any P0 fail = stop |
| **05 INTEGRITY** | `05-lead-integrity.md` | **GO** — localhost field-gated; copy is “No desk selected.”; B01–B17 bind |
| 02 KEPT | `02-lead-kept.md` | **NO-GO implement KIT-03** — wait for drawer |
| 03 PERMIT | `03-lead-permit.md` | **NO-GO KIT-04 / KIT-06** — wait for drawer, then search, then zoom |
| 06 CORPUS | `06-lead-corpus.md` | **GO** empty drawer; **do not** load `packages/{iso}.json` |

Park everything else. One kit per turn (`FEATURE_KITS.md`). Corpus BASE + KIT-01 already landed. Bots PARK.

---

## 5-line standup (paste)

```
GEV 32-seat 2026-08-29 · tree groks-eye-view-next · bots PARK · live gevradio NO.
KIT-01 LEG/AHJ off + CorpusPanel BASE are on disk. Next kit = KIT-02 empty DeskDrawer only.
01/04/05 GO. Implement empty kept/permit drawers this sitting. Park KIT-03+ adapters, Rest, pins, npm, git push.
Collisions: no 6th toolbar button (04); CommandAction = seat 10 `on`+`system`; Esc desk-before-corpus (01/09); empty-open is `{system,id:""}` not `desk:null`.
Smoke: globe orbits · Creedence from bar · 390px types · `open legislature desk` / `open building desk` / `close desk` · corpus mutex · zero Rest pins.
```

---

## Org chart 01–31

Coordinator (Host) is the **only** `src/` writer after GO. Seats 01–31 write docs. Seat 32 writes this brief.

Reporting lines are from lead files. Band is from `docs/dev-team/README.md`. File = on-disk `docs/dev-team/<NN>-*.md` at write time.

### Leads 01–06 — domain audit + file-touch map. No `src/` edits.

| Seat | Role | Specialists | File | This sitting |
| --- | --- | --- | --- | --- |
| **01** | INTEGRATION | 07 08 09 10 29 31 | `01-lead-integration.md` | **GO** KIT-02. File cap 6–7. Mount in OverlayHud. |
| **02** | KEPT | 11 12 13 14 22 23 | `02-lead-kept.md` | Contract only. **Do not** implement KIT-03. |
| **03** | PERMIT | 15 16 17 20 21 | `03-lead-permit.md` | Contract only. **Do not** implement KIT-04/06. |
| **04** | HUD / P0 | 18 19 25 28 | `04-lead-hud.md` | **GO** empty drawer. P0 globe / Creedence / G R L / footer z-30. |
| **05** | INTEGRITY | 26 27 30 | `05-lead-integrity.md` | **GO** field-gated. Refuse B01–B17. Live gevradio **NO**. |
| **06** | CORPUS | (index / 501 already in HUD) | `06-lead-corpus.md` | **GO** empty drawer. CorpusPanel stays. No `{iso}.json`. |

### KIT-02 07–10, 31 — empty desk drawer contract (next implement)

| Seat | Job | File | This sitting |
| --- | --- | --- | --- |
| **07** | Shell mount | `07-kit02-shell.md` | Mount `<DeskDrawer />` in OverlayHud next to CorpusPanel. Not IntelApp. Not a route. |
| **08** | Drawer UI | `08-kit02-drawer-ui.md` | Copy CorpusPanel geometry. Header Legislature / Building desk. Body “No desk selected.” Dark cockpit, not Kept cream. |
| **09** | Store `desk` | `09-kit02-store.md` | `desk: DeskSel \| null`. `setDesk` clears `corpusOpen`. Visibility = `desk !== null`. |
| **10** | Commands | `10-kit02-commands.md` | `{ type: "desk"; on; system? }`. Four phrases. After corpus, before LEG, before flyTo. |
| **31** | Smoke checklist | `31-kit02-smoke.md` | Host ticks after implement. Manual localhost. No Playwright. |

### Later kits 11–25 — prep only. Do not implement KIT-03+.

| Seat | Job | File | Kit later |
| --- | --- | --- | --- |
| **11** | Atlas join | `11-atlas-join.md` | KIT-03. 196 / 33 / 163. Do not stub 163. |
| **12** | Members honesty | `12-members-honesty.md` | KIT-03. Names as filed or honest hole. No invented sittings. |
| **13** | Capitals gate | `13-capitals-gate.md` | KIT-03. 194 delayed. NR+PS omitted. **Do not plot now.** |
| **14** | US kit shape | `14-us-kit-shape.md` | KIT-03. Package = index/holes. Roster = gold kit. No votes body. |
| **15** | Places layers | `15-places-layers.md` | KIT-04. Core+Extra+More = 1240. Rest stays count. |
| **16** | Confidence chips | `16-confidence.md` | KIT-04. core=higher · extra/more=mid · rest=provisional later. |
| **17** | No-Rest import | `17-no-rest.md` | KIT-02/04 must not import `places-rest` or current `places.ts`. |
| **18** | Civic commands | `18-civic-commands.md` | KIT-05 prep. `show legislatures` stays **layer**. Drawer = `open … desk`. |
| **19** | runCommand | `19-runcommand.md` | Desk apply before `if (!engine) return`, like corpus/radio. |
| **20** | Zoom gate | `20-zoom-gate.md` | KIT-06. Reuse flights 2000 km height gate. 0 Rest at orbit. |
| **21** | Pin budget | **pending** | Named by 03. KIT-06 marker cap. Prep only if/when filed. |
| **22** | Streams | **pending** | Named by 02. KIT-07. Max 8. Co-occurrence ≠ score. |
| **23** | 501 fence | `23-501.md` | Counts 199/215/17 already in CorpusPanel. **Not** DeskDrawer. |
| **24** | PWA / KIT-08 | `24-pwa.md` | Later truth card on **this** host. Do not remix live gevradio. Icon 404 is KIT-00 residual. |
| **25** | P0 reconfirm | `25-p0.md` | KIT-00 localhost lock still binds. Do not weaken the 5-line shell smoke. |

### Fence 26–30 — collision, OPSEC, P0, refuse (32 = this seat)

| Seat | Job | File | This sitting |
| --- | --- | --- | --- |
| **26** | Fence `src` | `26-fence-src.md` | **PASS.** `globeEngine.ts` still 11:33 FEED. This wave does not write `src/` from seats. Host KIT-02 is the next implement. |
| **27** | OPSEC / secrets | `27-opsec.md` | `_out` secrets occupancy 0. Hide permit exclusion city lists. Live gevradio **no**. |
| **28** | Usability 390px | `28-usability-390.md` | Copy CorpusPanel `bottom-28` / z-20. Footer stays z-30. Do not copy RadioDeck or Comms. |
| **29** | Collision | **pending** | Named by 01. Resolve 01↔04 Esc / debug-button / `CommandAction` if filed; until then use **Picks** below. |
| **30** | Refuse list | `30-refuse.md` | Numbered do-not. FEATURE_KITS P0s are stop-the-kit. |

**32** = this file (comms / standup). Not a `src/` seat.

---

## Comms rules (one file per seat)

1. **One writer per file.** Seat NN writes only `docs/dev-team/<NN>-*.md`. Do not patch a sibling’s file. Do not “fix” their GO.
2. **This wave, seats 01–31 do not edit `src/`, `_out/`, `kits/`, `package.json`.** Host implements KIT-02 from the GO briefs after this standup.
3. **Later-kit seats (11–25) prep only.** A prep file is not a license to start KIT-03+.
4. **Fence seats (26–30, 32) do not patch `src/`.** 26 reports; 27 scans; 28 geometry; 30 refuse; 32 comms. 29 collision (when filed) narrows, does not relax, 01.
5. **Leads set doctrine. Specialists confirm or tighten.** If a specialist contradicts a lead P0, the **lead P0 wins** (04 said this explicitly for HUD). If two leads collide, use **Picks** below until 29 files.
6. **Filename:** `<NN>-<slug>.md` under `docs/dev-team/`. One file. Do not dump into README.
7. **Label E / I / A.** Do not launder inference as disk evidence.
8. **No skill brands / swarm names / FROGNET / GOYNET / Layer-0** in product copy or in public-facing samples inside these briefs.
9. **Do not** npm install, git push, remix live gevradio / keptglobal / hivepermitdev, iframe those hosts, load `votes.json` bodies, or paste Rest id lists.
10. **Bots stay PARK.** CoS does not start Grok Build. Host is the serial `src/` writer. One kit per turn.

---

## How leads differ from specialists

| | Leads 01–06 | Specialists |
| --- | --- | --- |
| Job | Domain **audit + file-touch map + GO / NO-GO** | One surface. Confirm, measure, or write the contract slice. |
| Scope | Whole kit boundary (what may be touched, what is later) | Named files / counts / geometry / refuse rows |
| `src/` | Never this wave | Never this wave |
| GO power | **01 / 04 / 05 gate KIT-02 implement.** 02/03 gate later kits. 06 gates corpus load. | Cannot authorize a kit. Cannot relax a lead refuse. |
| Conflict | Doctrine. 04 P0 list wins over HUD specialists 18/19/25/28. | Narrow the lead. If they contradict a P0, ignore the contradiction. |

Specialist bands still bind: a KIT-02 specialist (07–10, 31) is **not** a lead. Their contracts are inputs to Host. Later-kit specialists must not be implemented “while we’re in the store anyway.”

---

## THIS sitting — implement vs park

### Implement (Host, after this brief)

Empty **KIT-02 DeskDrawer** only. Kit file: `Active/Handoffs/gevradio-unification/KIT-02-desk-drawer.md`.

**Picks** (01/04/05 GO plus KIT-02 seats; 29 pending):

| Collision | Pick | Why |
| --- | --- | --- |
| Toolbar debug button | **Park it.** Commands only. | 04 P0: no 6th always-visible button at 390px. 31 allows either; prefer command bar. |
| `CommandAction` | Seat **10**: `{ type: "desk"; on: true; system: "kept" \| "permit" } \| { type: "desk"; on: false }` | 10 owns commands. 04 same shape. Do not use 01’s `desk:` payload or 18’s `q`. |
| Store | Seat **09**: `desk: DeskSel \| null`, default `null`. `setDesk` ↔ `setCorpusOpen` mutex. | Visibility is `desk !== null`. Empty-open = `{ system, id: "" }`. Closed = `null` (do not render). |
| Esc order | **01 / 09**: comms → radio → first-run → **desk** → corpus → cockpit → track → L-rail | Civic modal first. 04 put corpus before desk — HUD preference, not a P0 fail. 29 may override. |
| Header copy | **01 / 08**: **Legislature** / **Building desk** | Proves both empty adapters. 05’s bare `Desk` is the closed state, which we do not render. |
| Body | **No desk selected.** | 01 04 05 06 08 31 agree. |
| Honesty footer | `Empty drawer. Nothing plotted. Rest 14925 is a count, not a map. Country kits are not US permit desks.` | 05 + 06. No city lists. No 501 graph. |
| Geometry | Copy **CorpusPanel**: `z-20`, mobile `bottom-28` (prefer `bottom-36` if bar still traps), `md:right-4 md:w-[22rem] md:bottom-28`. Footer **z-30** stays mounted. | 04 08 28. Do **not** copy Comms (hides footer) or RadioDeck (no bottom inset). 09’s `bottom-24` is wrong. |
| Phrases | Seat **10** musts + 01/31 aliases that do not steal layers | See list below. |

**Must parse** (after corpus, before LEG special-case, before flyTo `open`):

- `open legislature desk` / `open kept desk` / `open kept drawer` → kept empty
- `open building desk` / `open permit desk` → permit empty
- `close desk` / `hide desk` / `desk off` / `close drawer` → `null`

**Must not parse as desk:** `show legislatures`, `show kept desks`, `show permits`, `open korea`, `open corpus`, `open radio`, `put on creedence`, `building desk {place}`, `find AHJ in …`.

**Touch (max 8, prefer 6):**

1. `src/components/desks/DeskDrawer.tsx` — **NEW**
2. `src/lib/intel/store.ts` — `desk` + `setDesk`
3. `src/lib/intel/types.ts` — `CommandAction` desk arm
4. `src/lib/intel/commands.ts` — phrases; **do not** drop `kept desks?` from LEG (10: leave the layer synonym)
5. `src/lib/intel/runCommand.ts` — apply desk before engine-null; `fromUnknown` accepts `type === "desk"`
6. `src/components/intel/OverlayHud.tsx` — mount, Esc, mutex G/R/L/corpus/comms/radio; gate rail + tracked with `!desk`; **no new letter hotkey**; **no toolbar button**

Optional 7: `src/styles.css` `.desk-drawer` only if Tailwind cannot clear 390px. Slot 8 unused.

### Park

- KIT-03 KeptAdapter, country Contacts, `src/lib/kept/`, capitals loop, member pins, `members.json` names
- KIT-04 search, `places.ts` / `places-rest.ts` import, confidence chips in UI, fee tables
- KIT-05 `open korea` / `find AHJ in …` / playbooks
- KIT-06 zoom-gated Rest / pin budget
- KIT-07 streams/compare · KIT-08 PWA truth card · KIT-09 template
- 501 graph in the drawer (CorpusPanel lazy counts stay)
- `packages/{iso}.json` / `{iso}-permit.json` / `{iso}-fill.json` / `votes.json` HUD
- Live gevradio remix, iframe keptglobal / hivepermitdev, npm install, git push, Playwright MCP
- LEG/AHJ drawing; default-on; first-run civic cards; skill brands

Fail closed / revert civic diff if: globe unmounts, Creedence dies, footer hidden or z ≤ sheet, Rest in the module graph, new route, iframe, >8 files, adapters that load fat kits.

---

## Smoke (Host ticks — from 01 + 31)

Start (Windows KIT-00 residual):

```
node.exe scripts/with-app-env.mjs node.exe node_modules/vite/bin/vite.js dev --host 0.0.0.0 --port 8080
```

http://127.0.0.1:8080/ — Earth must orbit **before** civic ticks.

1. Globe orbits with desk open. No new route. Cesium still in `IntelApp`.
2. `open legislature desk` / `open building desk` / `close desk`. Header Legislature vs Building desk. Body “No desk selected.”
3. Esc: comms, radio, first-run, **desk**, corpus, cockpit, track, layer rail.
4. 390px: type in the command bar; Play still hits; sheet does not win z-index.
5. `show corpus` closes desk; opening desk closes corpus. `put on creedence` still `ccr`. LEG/AHJ still off. No Rest pins.

Also still live (25): four first-run cards, NVG3/Normal1, G comms, R tuner, FLT, styles 1–6. Do not patch `yo tokyo` or adsb.lol as a drive-by.

---

## E / I / A

**E — Evidence**

- `docs/dev-team/README.md`: bands 01–06 leads, 07–10+31 KIT-02, 11–25 later, 26–30+32 fence. One writer per file.
- 01 §6 **GO**; 04 §6 **GO**; 05 one-line verdict authorizes empty “No desk selected” and blocks B01–B17; 06 **GO** empty drawer / no `{iso}.json`.
- 02 **NO-GO** KIT-03 implement; 03 **NO-GO** KIT-04/06 implement.
- Disk: KIT-01 LayerIds + CorpusPanel + `corpusOpen` exist. `src/components/desks/DeskDrawer.tsx` **present** (mounted in OverlayHud). `globeEngine.ts` mtime 11:33 FEED (26). `_out` STATUS PARK. 33/33 packages. WAVE-501 PASS.
- FEATURE_KITS: KIT-02 depends on KIT-01; one kit per turn.
- Files on disk at this write: 01–20, 23–28, 30–31. **Pending:** 21, 22, 29.

**I — Inference**

- Empty drawer is HUD chrome. Six files are enough. Adapters would explode the file cap and the P0 surface.
- 01/04/05 all GO means Host is authorized. Remaining pending seats (21/22/29) are later-kit or collision; they do not veto empty chrome.
- Named collisions are HOLE not BLOCK if Host takes the conservative picks (no extra button, seat-10 action, 09 store, 01 Esc, CorpusPanel geometry).

**A — Assumption**

- Host implements from this brief in the **same** sitting as authorized, then stops. Operators will not treat “No desk selected.” as KIT-03/04 done.
- Seat 29, if it files after this, may tighten Esc/debug; it may not reopen Rest, adapters, or live gevradio.
- Tailwind z-20 / footer z-30 is enough; `styles.css` stays unused unless 390px still traps the bar.

---

## Stop

Seat 32 wrote comms only. **Coordinator implements KIT-02 empty drawers now.** Do not start KIT-03. Do not import Rest. Do not remix live gevradio.
