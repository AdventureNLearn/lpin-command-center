# SEAT 29 — COLLISION MAP (KIT-02 sitting)

Seat: 29 · band: Fence (26–30, 32) · job: collision  
Coordinator: Host Grok Build · date: 2026-08-29  
Target class: public-suite  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This sitting writes: **this file only**. No `src/` edits. No `_out/` edits. No `kits/` edits.

D-156: **one writer per file.** Identical prompt head; `resume_from`; do not two-write an authority object.

---

## Law (this sitting)

Two phases. Same writer table.

| Phase | Who writes | What |
| --- | --- | --- |
| **Audits (this 32-seat fan-out)** | Seats 01–32 | Only `docs/dev-team/<NN>-*.md` (one file per seat). |
| **After audits (KIT-02 implement)** | **Coordinator Host only** | The src allowlist in §2. Nobody else touches `src/`. |

- Specialists / leads write **`docs/dev-team` only**. They do not patch `src/` even if their contract names a src path.
- `src/lib/intel/globeEngine.ts` = **nobody** this sitting (both phases).
- `vendor/kept/_out/**` = **nobody** (PARK).
- `vendor/kept/kits/**` = **nobody**.
- One writer per file. A second seat on the same path is a D-156 fail, not a merge.

Bands (`docs/dev-team/README.md`):

| Band | Seats | Job | Writes |
| --- | --- | --- | --- |
| Coordinator | Host | Only src writer after audits | src allowlist + this README (already written) |
| Leads | 01–06 | Domain audit + file-touch map | `docs/dev-team/0N-*.md` |
| KIT-02 | 07–10, 31 | Empty desk drawer **contract** | `docs/dev-team/0N-*.md` / `31-*.md` |
| Later kits | 11–25 | Prep only. Do not implement KIT-03+ | `docs/dev-team/1N-*.md` / `2N-*.md` |
| Fence | 26–30, 32 | Collision, OPSEC, P0, refuse, comms | `docs/dev-team/2N-*.md` / `32-*.md` |

---

## 1. `docs/dev-team` → only-writer (D-156)

One file per seat. Glob `docs/dev-team/<NN>-*.md` is **Seat NN only**. Do not add a second `NN-` file. Do not rewrite a sibling’s file.

Disk snapshot at this seat’s write (plus this file). Missing seats still own their glob if they arrive later.

| File | Only-writer | Band |
| --- | --- | --- |
| `docs/dev-team/README.md` | **Coordinator** (already written; freeze) | Host |
| `docs/dev-team/01-lead-integration.md` | Seat 01 | Leads |
| `docs/dev-team/02-*.md` | Seat 02 | Leads |
| `docs/dev-team/03-*.md` | Seat 03 | Leads |
| `docs/dev-team/04-lead-hud.md` | Seat 04 | Leads |
| `docs/dev-team/05-lead-integrity.md` | Seat 05 | Leads |
| `docs/dev-team/06-lead-corpus.md` | Seat 06 | Leads |
| `docs/dev-team/07-kit02-shell.md` | Seat 07 | KIT-02 |
| `docs/dev-team/08-kit02-drawer-ui.md` | Seat 08 | KIT-02 |
| `docs/dev-team/09-kit02-store.md` | Seat 09 | KIT-02 |
| `docs/dev-team/10-*.md` | Seat 10 | KIT-02 |
| `docs/dev-team/11-atlas-join.md` | Seat 11 | Later |
| `docs/dev-team/12-members-honesty.md` | Seat 12 | Later |
| `docs/dev-team/13-capitals-gate.md` | Seat 13 | Later |
| `docs/dev-team/14-us-kit-shape.md` | Seat 14 | Later |
| `docs/dev-team/15-places-layers.md` | Seat 15 | Later |
| `docs/dev-team/16-confidence.md` | Seat 16 | Later |
| `docs/dev-team/17-no-rest.md` | Seat 17 | Later |
| `docs/dev-team/18-civic-commands.md` | Seat 18 | Later |
| `docs/dev-team/19-runcommand.md` | Seat 19 | Later |
| `docs/dev-team/20-zoom-gate.md` | Seat 20 | Later |
| `docs/dev-team/21-*.md` | Seat 21 | Later |
| `docs/dev-team/22-*.md` | Seat 22 | Later |
| `docs/dev-team/23-501.md` | Seat 23 | Later |
| `docs/dev-team/24-*.md` | Seat 24 | Later |
| `docs/dev-team/25-p0.md` | Seat 25 | Later |
| `docs/dev-team/26-fence-src.md` | Seat 26 | Fence |
| `docs/dev-team/27-opsec.md` | Seat 27 | Fence |
| `docs/dev-team/28-usability-390.md` | Seat 28 | Fence |
| `docs/dev-team/29-collision.md` | **Seat 29** (this file) | Fence |
| `docs/dev-team/30-refuse.md` | Seat 30 | Fence |
| `docs/dev-team/31-*.md` | Seat 31 | KIT-02 |
| `docs/dev-team/32-*.md` | Seat 32 | Fence |
| `docs/dev-team/_find-kit07.txt` | **nobody** (stray; not authority) | — |

`docs/corpus-audit/**` = **nobody this sitting**. Prior 15-seat audit. Freeze. Do not rewrite to “win” a KIT-02 argument.

---

## 2. KIT-02 src allowlist → Coordinator only (after audits)

Empty drawer. Max **7** files. Slot 8 unused. FEATURE_KITS: one kit per turn. Stop before adapters.

| File | Only-writer | Why this sitting |
| --- | --- | --- |
| `src/components/desks/DeskDrawer.tsx` | **Coordinator** (NEW) | Empty panel. `role="dialog"`. z-20. Placeholder “No desk selected.” No adapters. |
| `src/lib/intel/store.ts` | **Coordinator** | Add `desk` + `setDesk`. Do **not** reuse `corpusOpen`. Do not lift OverlayHud `drawerOpen`. |
| `src/lib/intel/types.ts` | **Coordinator** | Add `{ type: "desk"; … }` on `CommandAction` only. Do **not** add LayerIds. |
| `src/lib/intel/commands.ts` | **Coordinator** | Empty open/close phrases **after** radio + corpus, **before** flyTo `open` / LEG `kept desks?`. |
| `src/lib/intel/runCommand.ts` | **Coordinator** | Apply `desk` with radio/corpus (store-only; no engine). `fromUnknown` must accept `desk`. |
| `src/components/intel/OverlayHud.tsx` | **Coordinator** | Mount `<DeskDrawer />` after `<CorpusPanel />`. Esc + G/R/L mutex. No new letter hotkey. |
| `src/styles.css` | **Coordinator** (optional 7th) | `.desk-drawer` inset only if corpus classes cannot clear 390px. Prefer skip. |

If a 7th file is not needed, skip `styles.css`. Do **not** spend a slot on `IntelApp`, `GlobeCanvas`, `CorpusPanel`, or a smoke `.mjs`.

---

## 3. Nobody this sitting (PARK / freeze / later kit)

Coordinator does not write these after audits either. Specialists do not write them at all.

### Engines / globe (P0 pin-loop scare)

| File | Only-writer |
| --- | --- |
| `src/lib/intel/globeEngine.ts` | **nobody** |
| `src/lib/intel/flatEngine.ts` | **nobody** |
| `src/components/intel/GlobeCanvas.tsx` | **nobody** |

Seat 26 fence: `globeEngine.ts` is still the 11:33 host FEED snapshot (47032 bytes). No LEG/AHJ subscribe. No capitals loop. No Rest entities.

### Shell that must stay composition-locked

| File | Only-writer |
| --- | --- |
| `src/components/intel/IntelApp.tsx` | **nobody** |
| `src/routes/index.tsx` | **nobody** |
| `src/routes/__root.tsx` | **nobody** |
| `src/router.tsx` | **nobody** |
| `src/routeTree.gen.ts` | **nobody** |

Mount DeskDrawer **inside OverlayHud**. Do not add a civic route. Do not unmount `GlobeCanvas`.

### KIT-01 corpus BASE (already shipped; freeze)

| File | Only-writer |
| --- | --- |
| `src/lib/intel/corpus.ts` | **nobody** |
| `src/components/intel/CorpusPanel.tsx` | **nobody** |

Do not merge corpus into desk. Do not add `{iso}.json` imports. Lazy 501 stays counts-only.

### Radio / comms / first-run (P0)

| File | Only-writer |
| --- | --- |
| `src/components/intel/RadioDeck.tsx` | **nobody** |
| `src/lib/intel/radio.ts` | **nobody** |
| `src/lib/intel/radioPlayer.ts` | **nobody** |
| `src/components/intel/CommsChat.tsx` | **nobody** |
| `src/lib/intel/comms.ts` | **nobody** |
| `src/components/intel/FirstRun.tsx` | **nobody** |
| `src/components/intel/DetectionOverlay.tsx` | **nobody** |
| `src/components/intel/FeedUnlock.tsx` | **nobody** |
| `src/lib/intel/feedKeys.ts` | **nobody** |
| `src/lib/intel/share.ts` | **nobody** |
| `src/lib/og/site.json` | **nobody** |

Mutex desk vs comms/radio from OverlayHud + `runCommand` only. Do not bind `G` / `R` / `L` / `D`. Do not steal `put on`. Four first-run cards stay.

### Permit catalog / Rest (KIT-04 / KIT-06 later)

| File | Only-writer |
| --- | --- |
| `src/lib/permit/places-rest.ts` | **nobody** |
| `src/lib/permit/places.ts` | **nobody** |
| `src/lib/permit/places-extra.ts` | **nobody** |
| `src/lib/permit/places-more.ts` | **nobody** |
| `src/lib/permit/catalog.ts` | **nobody** |
| `src/lib/permit/types.ts` | **nobody** |
| `src/lib/permit/**` (remainder) | **nobody** |

`places.ts` still concatenates Rest. Importing it is a first-paint Rest dump. KIT-02 must not import any of these.

### Kept adapters / fat kits (KIT-03 later)

| File / tree | Only-writer |
| --- | --- |
| `src/lib/kept/**` (absent) | **nobody** (do not create) |
| `src/components/desks/*Adapter*` | **nobody** (do not create) |
| `src/components/desks/KeptPanel.tsx` | **nobody** |
| `src/components/desks/PermitPanel.tsx` | **nobody** |
| `vendor/kept/kits/**` | **nobody** |
| `vendor/kept/kits/**/votes.json` | **nobody** |
| `vendor/kept/kits/**/members.json` | **nobody** |

### Corpus PARK

| File / tree | Only-writer |
| --- | --- |
| `vendor/kept/_out/**` | **nobody (PARK)** |
| `vendor/kept/_out/packages/{iso}.json` | **nobody** |
| `vendor/kept/_out/packages/{iso}-permit.json` | **nobody** |
| `vendor/kept/_out/packages/{iso}-fill.json` | **nobody** |
| `vendor/kept/_out/501-links.json` | **nobody** (corpus panel already lazy-reads; do not rewrite) |
| `vendor/kept/_out/STATUS.md` | **nobody** (`STATUS: PARK`, `writers: none`) |

### Tooling / live / lockfiles

| File / tree | Only-writer |
| --- | --- |
| `package.json` | **nobody** |
| `package-lock.json` | **nobody** |
| `vite.config.ts` | **nobody** |
| `tsconfig.json` | **nobody** |
| `scripts/**` | **nobody** |
| `src/lib/feeds/**` | **nobody** |
| `src/lib/auth/**` | **nobody** |
| live `gevradio.grok.me` | **nobody** (D-251) |
| `upstream` groks-eye-view | **nobody** |

Do not: `npm install`, git push, iframe keptglobal / hivepermitdev, 16k pins, invented sitting names.

---

## 4. Glob owners (catch-all)

Anything not named in §1–§3 still has one writer:

| Glob | Only-writer this sitting |
| --- | --- |
| `docs/dev-team/<NN>-*.md` | Seat NN |
| `src/**` except §2 allowlist | **nobody** |
| `src/**` on §2 allowlist | **Coordinator** after audits |
| `vendor/kept/_out/**` | **nobody (PARK)** |
| `vendor/kept/kits/**` | **nobody** |
| `docs/corpus-audit/**` | **nobody** |
| `node_modules/**` | **nobody** |

Two specialists must not both “plan to edit” the same src path as if they owned it. Plans live in their own `NN-*.md`. The path still has one writer: Coordinator or nobody.

---

## 5. Hot files (why they collide if two writers)

These are the files every band wants to touch. D-156 answer is already in §2–§3. This section is the map of **claims**, not extra writers.

| File | Who talks about it | Who writes |
| --- | --- | --- |
| `OverlayHud.tsx` | 01, 04, 07, 08, 09, 25, 28 | Coordinator |
| `store.ts` | 01, 04, 06, 09 | Coordinator |
| `types.ts` | 01, 04, 09, 18 | Coordinator |
| `commands.ts` | 01, 04, 18 | Coordinator |
| `runCommand.ts` | 01, 04, 19 | Coordinator |
| `DeskDrawer.tsx` | 01, 04, 06, 07, 08, 05 | Coordinator (NEW) |
| `globeEngine.ts` | 07, 13, 20, 25, 26 | **nobody** |
| `_out/**` | 06, 11–14, 23, 27 | **nobody (PARK)** |
| `places-rest.ts` / `places.ts` | 15, 16, 17, 20, 30 | **nobody** |
| `CorpusPanel.tsx` / `corpus.ts` | 06, 23 | **nobody** |
| `RadioDeck.tsx` / `CommsChat.tsx` | 04, 25, 32 | **nobody** |

Seat 19 / 18 write **prep** for dispatch/parser. They do not become the src writer. Coordinator still owns `runCommand.ts` / `commands.ts` on the implement turn.

Seat 26 “KIT-02 stay-off” is the **audit-wave** fence: specialists do not create `DeskDrawer` or `{ type: "desk" }` during the fan-out. After audits, Coordinator may add those on the §2 allowlist. Seat 26 does **not** own `globeEngine.ts`; nobody does.

---

## 6. Contract collisions (docs disagree; still one src writer)

Not D-156 file collisions. Coordinator picks one when implementing OverlayHud / types / commands. Later-kit seats do not re-patch.

| Topic | Seat 01 | Seat 04 | Seat 09 / others | Coordinator pick (I) |
| --- | --- | --- | --- | --- |
| Esc order | desk **then** corpus | corpus **then** desk | 09 records today’s corpus-before-desk | OverlayHud is one file. Pick **one** stack. Do not add a second `keydown` in DeskDrawer. |
| `CommandAction` | `{ type: "desk"; desk: null \| DeskSel }` | `{ type: "desk"; on: boolean; system?: … }` | Handoff: `{ type: "desk"; system; q }` | One shape. Store still `desk: DeskSel \| null` (09). Parser must not steal `put on` / `open <place>` / `show corpus` / `show legislatures`. |
| Toolbar debug | one Desk (debug) control OK | **no** sixth always-visible button | 07: optional later | 390px already has Play + Radio + Comms + Corpus + Layers. Prefer **commands only** unless a control fits without stealing G/R/L. |
| `kept desks?` | do not steal LEG on/off | **narrow** LEG regex; drop `kept desks?` | 18: KIT-05 owns `open korea` | Coordinator may narrow LEG **only** as needed so `open kept desk` is a desk action. Do not eat `show legislatures`. |
| Honesty copy | kept/permit footer strings | “No desk selected.” + “Empty drawer. Nothing plotted.” | 05 / 06 longer corpus strings | Empty KIT-02 body is **“No desk selected.”** Do not dump `notes[]` or 501 names. |

If 07–10 / 31 never write, Host still implements from 01 + 04 + 09 + this map. Collision seat does not veto src; it vetoes a **second writer**.

---

## E / I / A

**E — Evidence (this tree, 2026-08-29)**

- `docs/dev-team/README.md`: Coordinator is Host Grok Build. One tree. One writer per file. Specialists write `docs/dev-team/<NN>-*.md` only. Never `src/`, `_out/`, `kits/`.
- D-156 (`ops/CACHE-PREFIX.md`): one writer per authority file.
- `_out/STATUS.md`: **PARK**, `writers: none`.
- `src/components/desks/` **absent**. `store.ts` has `corpusOpen`, no `desk`. `CommandAction` has `corpus`, no `desk`.
- `globeEngine.ts` LastWriteTime 2026-08-29 11:33:32.077, 47032 bytes (seat 26). No `legislatures` / `permits` / `DeskDrawer` strings.
- KIT-01 + corpus BASE already in seven civic files (types, store, commands, runCommand, OverlayHud, corpus.ts, CorpusPanel). That sitting’s writers are done; those files are not open to specialists.
- FEATURE_KITS: KIT-02 = empty DeskDrawer, globe mounted. KIT-03+ later.
- Multiple `docs/dev-team/NN-*.md` already on disk; each NN is unique. `_find-kit07.txt` is not an `NN-` seat file.

**I — Inference**

- The collision that would kill the sitting is two agents writing `OverlayHud.tsx` or `store.ts` at once, or a later-kit seat “helpfully” adding a `globeEngine` LEG branch.
- Empty drawer is HUD chrome. It does not need `_out` writes, kit rewrites, or entity loops.
- Docs can all describe OverlayHud. That is not two writers. The implement turn has one.

**A — Assumption**

- After this fan-out, Coordinator implements KIT-02 from the allowlist and the lead contracts, without waiting for missing seats 02/03/10/21/22/24/31/32.
- Operators will not treat “No desk selected.” as KIT-03/04 done.
- Seat 26 will not read this map as permission to edit `globeEngine.ts` in order to “keep KIT-02 off.”

---

## Stop

One writer per file. Coordinator is the only `src/` writer after audits. `globeEngine.ts` = nobody. `_out` = nobody (PARK). Specialists stay in `docs/dev-team/<NN>-*.md`. Do not start KIT-03.
