# KIT-02 — DeskDrawer UI (empty chrome)

Seat: 08 · band: KIT-02 (07–10, 31) · class: public-suite · date: 2026-08-29  
Coordinator: Host Grok Build. One writer per file.  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
This file only. Did not edit `src/`, `_out/`, or `kits/`.

Claim: **DeskDrawer is a dark cockpit panel with three slots. It is not a Kept page.**

KIT-02 handoff (`Active/Handoffs/gevradio-unification/KIT-02-desk-drawer.md`): one slide-over that can host Kept or Permit content without unmounting Cesium. Header = system label (Legislature / Building desk) + close. Body = adapter slot. Footer = honesty strip. Placeholder **“No desk selected.”** is allowed. Mobile = bottom sheet that does not permanently cover the command bar. Not a new route. Not an iframe of keptglobal.

This seat is the **geometry + chrome** contract. Store/open-close is a sibling KIT-02 seat. Adapters are KIT-03 / KIT-04. Do not implement here.

---

## 1. Copy these two panels — then diverge

Mount the same way `CorpusPanel` and `CommsChat` already mount: overlay `aside.panel` from `OverlayHud`, pointer-events on the panel only (`src/styles.css` `.intel-hud` is `pointer-events: none`; `.panel` / `[role="dialog"]` are `auto`). Globe stays the canvas under the HUD.

**Copy (desktop width + right dock):** `CommsChat.tsx` and `CorpusPanel.tsx` both use `md:inset-x-auto md:top-20 md:right-4 md:w-[22rem]`. That is the KIT-02 desktop box.

**Copy (column overflow):** `CorpusPanel.tsx` — not `CommsChat.tsx`.

```tsx
<aside
  className="panel corpus-panel absolute inset-x-3 top-28 bottom-28 z-20 flex min-h-0 flex-col overflow-hidden p-3 sm:top-16 md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]"
  role="dialog"
  aria-label="Corpus"
>
```

Body scroller in that file:

```tsx
<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
```

**Do not copy** `CommsChat.tsx` `bottom-24`, missing `min-h-0` on the aside, or OverlayHud’s `!chatOpen` footer gate. Comms is allowed to hide the command bar. KIT-02 is not.

---

## 2. Geometry (load-bearing)

| Viewport | Box | Tokens |
| --- | --- | --- |
| Desktop `md` (768px+) | Right dock, **22rem** wide | `md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]` |
| **390px** smoke (narrow) | Bottom sheet **above** the command bar | `inset-x-3 top-28 bottom-28` (full width minus 0.75rem gutters). Not a new route. Not full-viewport. Globe visible in the header gap and around the insets. |
| All | Sit above the command bar | **`bottom-28`** (7rem / 112px). Not `bottom-24`. |
| All | Flex that can shrink | aside: `flex min-h-0 flex-col overflow-hidden`. Body: `min-h-0 flex-1 overflow-y-auto overscroll-contain`. Header + footer: `shrink-0`. |

Proposed class (implement later; this seat does not patch `src/`):

```
panel desk-drawer absolute inset-x-3 top-28 bottom-28 z-20 flex min-h-0 flex-col overflow-hidden p-3 sm:top-16 md:inset-x-auto md:top-20 md:right-4 md:bottom-28 md:w-[22rem]
```

That is `CorpusPanel` with the class name swapped. Keep `z-20`. Command bar is `z-30` (`OverlayHud.tsx` `<footer className="absolute right-3 bottom-3 left-3 z-30 …">`). Drawer never wins the footer stack.

### Why `bottom-28`, not Comms `bottom-24`

Command bar (`OverlayHud.tsx`): `absolute … bottom-3` / `md:bottom-4`, `z-30`. Inner panel is `flex flex-col gap-2 p-2 md:flex-row` with `min-h-10` style chips + `min-h-11` form. At **390px** that column stacks (~40px + 8px gap + 44px + padding + credit line) and is taller than `bottom-24` (96px). `bottom-28` (112px) is the live clearance already used by:

- `CorpusPanel` (`bottom-28` / `md:bottom-28`)
- tracked card (`absolute bottom-28 left-3`)
- cockpit readouts (`absolute bottom-28`)

KIT-02 **must keep the command bar usable while the desk is open** (handoff Do #2 / #4). OverlayHud currently hides the footer only when `chatOpen`. Do **not** add `desk` to that hide. Radio and Corpus already leave the footer up. DeskDrawer matches them.

390px is the **smoke width** from corpus-audit pickup-plan step 11, not a Tailwind breakpoint and not a sheet height. Do not introduce `h-[390px]`. The sheet is the band between `top-28` and `bottom-28` at that width.

### Why `min-h-0` + `overflow-hidden`

Three-slot column: header (shrink-0) + body (flex-1, adapter later) + footer honesty (shrink-0). Without `min-h-0` on the flex parent, the body will not shrink; the honesty strip is pushed through the command bar or clipped. `CorpusPanel` already has this. `CommsChat` puts `min-h-0` only on `.comms-log` and has no footer slot — do not copy that for a three-slot drawer.

`overflow-hidden` on the aside; `overflow-y-auto overscroll-contain` on the body only. Header and honesty stay on screen while adapter content (later) scrolls.

---

## 3. Three slots

File to create later: `src/components/desks/DeskDrawer.tsx`. Directory does not exist today. `role="dialog"`. `aria-label` follows the header system label.

### Header — `shrink-0`

System label + close. Same row pattern as Corpus / Comms: kicker left, `X` button right (`grid size-9 place-items-center text-muted`, `aria-label="Close desk"`).

| `desk.system` | Header kicker (public civic copy) |
| --- | --- |
| `"kept"` | **Legislature** |
| `"permit"` | **Building desk** |

Do not print Kept, Permit Helper, hivepermitdev, keptglobal, FROGNET, GOYNET, Layer-0, or skill brands. Optional one-line subtitle may name the selected id later; KIT-02 empty state has no subtitle beyond the kicker.

Close sets the sibling-seat store to `desk: null` (handoff: `{ desk: null | { system: "kept" | "permit"; id: string } }`). Esc close is OverlayHud stack — not this file’s geometry, but the X must exist.

### Body — `min-h-0 flex-1 overflow-y-auto`

Adapter slot. KIT-02 content is the literal string:

> No desk selected.

No roster. No AHJ typeahead. No `packages/{iso}.json`. No `members.json`. Empty kept drawer and empty permit drawer share this body. System only changes the header (and later the adapter). A debug control / command that opens `{ system: "kept", id: "" }` vs `{ system: "permit", id: "" }` is enough to prove both shells.

### Footer — `shrink-0` honesty slot

Always rendered when the drawer is open. Empty `null` children are fine this sitting; the **slot** must exist so KIT-03/04 can drop strips without a layout rewrite.

KIT-02 may already fill it (from LEAD 06; not invented here):

> Rest 14925 is a count, not a map. Country kits are not US permit desks. Factory URLs not verified. Fees omitted.

Always-on later (KIT-04): Permit `DISCLAIMER` from `src/lib/permit/types.ts`. Do not put that text in the header. Do not hide the footer when the body is the empty placeholder.

---

## 4. Dark cockpit chrome — not Kept cream

Reuse GEV `.panel` tokens. Do not import Kept theme, serif, or gold.

| | GEV cockpit (use) | Kept (`keptglobal/public/styles.css`, do not use) |
| --- | --- | --- |
| Page | `--color-void` `#07090c` | light `--bg` `#efeae1` |
| Panel | `--color-panel` `#0e1218` · `--color-panel-2` `#141a22` | `--paper` cream / gold wash |
| Ink | `--color-fg` `#d7e0ea` · muted `#7d8b99` | `--ink` `#1d1a16` / `#ece7dc` |
| Accent | `#7ee0a8` (HUD green) | `--gold` `#d4b48a` / `#7a5a2e` |
| Type | IBM Plex Sans + Barlow Condensed + IBM Plex Mono (`.kicker` / `.hud-num`) | Source Serif 4 / Noto Serif |
| Panel chrome | `.panel`: 88% panel mix, `border-line`, `radius-md`, blur(10px) | sticky cream header + brand-aside gold |

Optional CSS: `.desk-drawer { background: color-mix(in oklab, var(--color-panel) 96%, transparent); }` next to `.comms-panel, .radio-panel`. Do not restyle `html/body` or add a cream theme for civic mode. KIT-03 handoff: “Do not restyle the whole app cream.”

---

## 5. What this is / is not

| Surface | Role | KIT-02 |
| --- | --- | --- |
| `src/routes/index.tsx` | `IntelApp` only | **no new route** |
| `IntelApp.tsx` | `GlobeCanvas` + HUD | globe stays mounted |
| OverlayHud layer rail (`L`) | Open sources | **not** DeskDrawer |
| `CorpusPanel` | HUD index (`corpusOpen`) | **stays**; do not merge |
| `CommsChat` / `RadioDeck` | right 22rem / tuner | stay reachable; mutex later |
| Command bar footer | `z-30`, usable | **visible** while desk open |
| `src/components/desks/DeskDrawer.tsx` | this chrome | **create** (later implement) |
| KeptAdapter / PermitAdapter | body slot | KIT-03 / KIT-04 |

Same physical slot as Comms + Corpus (`md:right-4 md:w-[22rem]`). Do not stack two right-22rem panels. Mutex (close comms / radio picker / layer rail / corpus when desk opens, and vice versa) is a sibling KIT-02 seat. Geometry assumes one occupant.

---

## 6. File-touch map (implement later — not this seat)

**Create:** `src/components/desks/DeskDrawer.tsx`

**Extend:** `OverlayHud.tsx` — mount next to `<CommsChat />` / `<CorpusPanel />`. Do not hide the command footer on desk open.

**Optional:** `src/styles.css` `.desk-drawer` background mix only. Prefer existing `.panel`.

**Do not touch this sitting:** `GlobeCanvas.tsx`, `globeEngine.ts`, `corpus.ts`, `places.ts` / `places-rest.ts`, `vendor/kept/**`, `package.json`, `src/routes/index.tsx`, Kept cream CSS, live gevradio.

**Do not:** iframe keptglobal / hivepermitdev; navigate away from `IntelApp`; plot capitals or Rest pins; load fat kits; invent sitting names; print skill brands.

---

## 7. Smoke the chrome (when a later turn implements)

1. Desktop: drawer is **right 22rem**, `md:right-4`, globe still orbits to the left.
2. Width **390px**: drawer is a bottom sheet; command bar still visible and typeable; no horizontal trap. `bottom-28` clearance holds.
3. Header reads **Legislature** on empty kept open, **Building desk** on empty permit open. Close X works.
4. Body is exactly **No desk selected.**
5. Honesty footer slot is on screen (not scrolled away, not under the command bar).
6. Chrome is void/panel/green HUD — no cream, no serif, no gold.
7. Radio still plays. Cesium still mounted. No new route.

Stop. Do not start KIT-03 adapters in the same turn.

---

## E / I / A

**E — Evidence (disk, this tree + KIT-02 handoff)**

- Handoff `KIT-02-desk-drawer.md`: right-side dark cockpit chrome (not Kept cream); Esc; globe mounted; command bar usable; header Legislature / Building desk + close; body adapter slot; footer honesty; mobile bottom sheet that does not permanently cover the command bar; placeholder “No desk selected.”; no new route; no keptglobal iframe.
- `CommsChat.tsx` L33: `md:w-[22rem] md:right-4` **and** `bottom-24`. OverlayHud L609: command `<footer>` omitted while `chatOpen`.
- `CorpusPanel.tsx` L24–25: `md:w-[22rem] md:right-4 md:bottom-28` plus `flex min-h-0 flex-col overflow-hidden`. L46: body `min-h-0 flex-1 overflow-y-auto overscroll-contain`.
- OverlayHud command footer L610: `bottom-3` / `md:bottom-4`, `z-30`, stacked `flex-col` below `md`. Tracked card L515 and cockpit L588 already use `bottom-28`.
- `.intel-hud` pointer-events none; `.panel` / `[role="dialog"]` auto. `.panel` = `--color-panel` `#0e1218`. Kept light theme `--bg` `#efeae1`, `--gold` `#d4b48a`, Source Serif.
- `src/routes/index.tsx` = `IntelApp`. `IntelApp.tsx` = `GlobeCanvas` + `OverlayHud`. No `src/components/desks/`. Store has `corpusOpen`, not `desk`. `CommandAction` has `corpus`, not `{ type: "desk" }`.
- LEAD 06: empty body copy “No desk selected.”; honesty strip; CorpusPanel stays; do not load `packages/{iso}.json`.

**I — Inference**

- 22rem right dock is already the cockpit’s civic/comms column. Inventing a wider Kept-style page would cover Earth and break radio/comms reachability.
- Comms `bottom-24` + hidden footer is a chat-mode exception. KIT-02’s “command bar stays usable” forces Corpus-like `bottom-28` and a visible footer, especially at 390px where the bar stacks.
- `min-h-0` is what makes a three-slot drawer honest: the footer slot cannot exist if the body is an unconstrained flex child.
- Header labels are system names in public civic language, not product names. Body placeholder is enough to prove two empty shells. Chrome tokens already on `.panel`; cream would be a second homepage.

**A — Assumption**

- Sibling KIT-02 seats will add `desk` on the intel store and Esc/mutex without changing this box.
- Implementers will clone `CorpusPanel` geometry, not `CommsChat` bottom/footer behavior.
- Operators will not treat this empty chrome as KIT-03/04 done.
- 390px smoke is a width check, not a request for a 390px-tall sheet or a custom breakpoint.

---

## Stop

KIT-02 UI = **right 22rem** / **390px bottom sheet** / **`bottom-28`** / **`min-h-0` overflow**. Header Legislature | Building desk + close. Body **No desk selected.** Footer honesty slot. Dark cockpit `.panel`, not Kept cream. Globe stays. Command bar stays. This seat wrote the contract only.
