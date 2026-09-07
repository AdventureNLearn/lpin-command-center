# SEAT 24 — PWA / KIT-08 PREP

Seat: 24 · band: later kits (11–25, prep only) · class: public-suite · date: 2026-08-29  
Tree: `REPO_ROOT`  
Write: this file only. No `src/` edits. No `_out/` edits. No `public/` assets.  
Did not implement KIT-08. Did not fix the PWA icon.

**Claim:** platform PWA chrome is already wired (manifest + `?install=1` tutorial). The apple-touch icon is a **known KIT-00 residual 404**, not a shell fail. KIT-08 is a **later** one-click / truth-card sitting on **this new host**, not a gevradio remix.

**Verdict:** PREP ONLY. Do not patch PWA this sitting.

---

## Scope

FEATURE_KITS index (`gevradio-unification/FEATURE_KITS.md`):

| Kit | Name | Depends | Adds |
| --- | --- | --- | --- |
| **KIT-08** | One-click + PWA | KIT-00 | Remix / install checklist |

BUILD-PLAN order 8 and MANAGE-AND-GROK-BOT kit 8: **One-click / PWA truth card (new host, not gevradio remix).**

This tree is that new host (`ARCHIVE.md`, D-251 / D-254). Live `https://gevradio.grok.me` is a frozen reference. Do not remix it. Do not overwrite it.

`docs/dev-team/README.md`: seats 11–25 prep only. Do not implement KIT-03+. KIT-08 is after streams (KIT-07) in the kit **order**, but it **depends only on KIT-00**. Still: one kit per later Build turn. Do not batch KIT-03–08. Do not start KIT-08 from this file.

Owner paste (do not execute): `gevradio-unification/KIT-08-one-click.md`. Stale line in that paste — “Keep Grok Remix working on the **gevradio** host” — is overridden by D-251 / BUILD-PLAN / this seat. Path C in `GROK_BUILD_HANDOFF.md` (“Add to Home Screen from the remixed gevradio host”) is the same stale host.

---

## E — Evidence

### KIT-00 residual: `/__grok/icon-180.png` 404

Logged, not a KIT-00 fail. Same class on live and on this clone.

| Smoke | Target | Residual |
| --- | --- | --- |
| `KIT-00-SMOKE-2026-08-29.md` | live gevradio | `__grok/icon-180.png` 404 (PWA icon). **KIT-08 later.** |
| `KIT-00-SMOKE-LOCALHOST-2026-08-29.md` | `http://127.0.0.1:8080/` this tree | 12× `cesiumStatic/*` 404 **+** `__grok/icon-180.png` 404 — same class as live KIT-00. |

KIT-00 localhost otherwise green: globe, first-run four cards + Esc, NVG3/Normal1, Creedence, comms, FLT `adsb.lol`, 390px command bar, `tokyo` local fly. Civic not started.

### Head / manifest point at a file that is not on disk

References (read, not patched):

| File | What it asks for |
| --- | --- |
| `src/routes/__root.tsx` | `<link rel="apple-touch-icon" href="/__grok/icon-180.png">` plus manifest |
| `scripts/grok-pwa-shared.mjs` `grokPwaHeadTags` | same apple-touch-icon + `/__grok/manifest.webmanifest` |
| `scripts/grok-pwa-shared.mjs` `renderWebManifest` | `icons[0].src = "/__grok/icon-180.png"` (180×180 PNG) |
| `scripts/install-page.html` | apple-touch-icon + `/__grok/install/styles.css` + homescreen assets |

`public/` on this tree:

- `public/favicon.svg`
- `public/og.jpg`
- **no** `public/__grok/`
- **no** `public/__grok/icon-180.png`
- **no** `public/__grok/install/styles.css`
- **no** `public/__grok/install/assets/homescreen/*`

Vite `public/` is the only static mount. The 404 is the missing PNG, not a missing plugin.

### What the plugin actually serves

Split (comments in-tree):

- Dev/preview: `scripts/grok-pwa-plugin.mjs` (`grokPwaPlugin()` in `vite.config.ts`, before Start/Nitro).
- Deployed: `server/middleware/grok-pwa.ts` (Nitro `serverDir: "./server"`).
- Shared: `scripts/grok-pwa-shared.mjs`.

Served dynamically (200, not a public file):

- `/__grok/manifest.webmanifest` and `/__grok/manifest.json` → `renderWebManifest(host)`
- document `?install=1&platform=ios` (or `install=true`) → `scripts/install-page.html` with `{{APP_NAME}}` / `{{APP_URL}}`

Not served by the plugin:

- `/__grok/icon-180.png`
- `/__grok/install/styles.css`
- `/__grok/install/assets/homescreen/{logo-grok.svg,ob-phone.png,ob-ipad.png,glass-puzzle.svg,glass-share.svg,plus.svg}`

`isInstallQuery` is **iOS-only**. `/?install=1` alone and `platform=android` are false. Desktop install page is “open this on iPhone or iPad.”

`appNameFromHost("localhost:8080")` → `"Grok App"`. Real product name is `"Grok's Eye View"` (`src/routes/__root.tsx`, `src/lib/og/site.json` `title`). Slug-from-host is for `*.grok.me` published apps, not this clone.

Theme-color: HUD `#07090c` vs PWA inject `#000000`. Cosmetic; not a P0.

### Tripwire that would fail if run

`scripts/grok-pwa-plugin.test.mjs` “nitro middleware and its bundled assets exist” does `readFileSync(public/__grok/icon-180.png)` and `readFileSync(public/__grok/install/styles.css)`. Those paths are absent. Logged. **Not this sitting.**

### First-run / share vs install

- `src/components/intel/FirstRun.tsx`: four cards only (Planes / Space junk / Planet yelling / Just the globe). KIT-00 lock: do not replace them. Handoff *may* add an install card later; that is KIT-08, not now.
- `src/lib/intel/share.ts`: camera hash (`lat/lon/h/s/l/t`). Clipboard share. Not Add to Home Screen.
- Repo-root `README.md`: `npm install && npm run dev`. No PWA / Remix / handoff-pack lines.

### Host fence (do not remix gevradio)

- `ARCHIVE.md`: this tree is a **new app**. Live gevradio is **not** remixed and is **not** the write target.
- `docs/corpus-audit/10-opsec.md`: promote localhost field-gated; live gevradio **no** (D-251).
- MANAGE OPSEC: localhost kit work is N/A for public ship **until KIT-08 / a named host**.
- KIT-08 original “keep Remix on gevradio” is **out**. New named host later. Frozen: gevradio, keptglobal, hivepermitdev.

No service worker / workbox / `vite-plugin-pwa` in this tree. “Installed” for Path C means standalone display + Add to Home Screen, not an offline cache.

---

## I — Inference

1. **404 is expected until KIT-08.** Head and manifest always request `/__grok/icon-180.png`. The plugin never generates that PNG. KIT-00 correctly parked it. Filling `public/__grok/` now would be implementing KIT-08 by stealth.

2. **Chrome is already the platform path.** KIT-08 does not invent a second PWA stack. Keep `grokPwaPlugin`, `server/middleware/grok-pwa.ts`, `install-page.html`. Add the missing static icon (and install CSS/art if the tutorial is kept). Do not swap in Workbox.

3. **Truth card ≠ icon.** KIT-08 done-when (paste): Remix preview still publishes, and an in-app Install / Fork card tells the truth in **six lines or fewer**. On **this** tree that card must name this host / this README, not gevradio. Suggested later copy (do not land now): Remix this cockpit · local `npm install && npm run dev` from `groks-eye-view-next` · civic data = vendored Kept harvests + permit catalog · paste pack = unification folder. No invented ports, no personal machine paths, no `.env` secrets.

4. **Do not replace FirstRun’s four cards.** KIT-00 survival. Prefer a small `?` panel, or a fifth card that does not delete the four. Command bar / globe / radio / comms stay.

5. **Name the app.** Later install chrome should use `Grok's Eye View`, not localhost `"Grok App"`.

6. **Mobile width is already a P0.** Civic drawers at 390px (single panel, globe behind, command bar not covered) is KIT-02 / seat 28, not a reason to start PWA early.

7. **Kits 6–8 are polish.** First-pass usable = 0–5. Do not jump to KIT-08 because an icon 404 is visible in DevTools.

---

## A — Action (later KIT-08 sitting — not now)

**This sitting: stop.** Do not add the PNG. Do not edit `__root.tsx`. Do not touch `scripts/grok-pwa-*`. Do not add an Install card. Do not rewrite README. Do not `npm install`. Do not `git push`. Do not open live gevradio as a write target.

When a later turn **is** KIT-08 (shell still green, one kit only):

1. Confirm KIT-00 P0s still pass on `:8080` (globe, Creedence, comms, first-run four, 390px). If red, stop.
2. Add `public/__grok/icon-180.png` (180×180) so apple-touch-icon + manifest stop 404ing. Add `public/__grok/install/styles.css` + homescreen assets if `?install=1&platform=ios` stays in the product.
3. Keep the existing grok-pwa plugin / Nitro middleware / install-page. Do not add a service worker unless asked.
4. In-app **Install / Fork** card (`?` panel preferred) — six lines, this tree, no gevradio remix instructions, no secrets.
5. README snippet → handoff pack. No personal paths.
6. Manifest / apple-mobile-web-app-title: **Grok's Eye View** even on localhost.
7. Smoke: `/__grok/icon-180.png` **200**; `/__grok/manifest.webmanifest` names the app; iOS tutorial still renders; globe/radio/comms still work at 390px; no skill brands.

**Do not in KIT-08 either:** remix/overwrite gevradio · iframe keptglobal/hivepermitdev · 16k Rest pins · invent sittings · skill/swarm chrome · batch with KIT-07/09.

---

## E / I / A (short)

**E.** KIT-00 live + localhost both logged `__grok/icon-180.png` 404 as residual, KIT-08 later. This tree links that URL from `__root.tsx`, `grok-pwa-shared.mjs`, and `install-page.html`. `public/` has favicon + og.jpg only. Plugin serves manifest + iOS install HTML, not the PNG. `public/__grok/` tripwire in `grok-pwa-plugin.test.mjs` would fail. FirstRun is four cards. README has no PWA card. D-251: new app, not gevradio remix.

**I.** Icon 404 is missing static chrome on an otherwise locked shell. KIT-08 is the sitting that adds the icon + a six-line truth card on **this** host. Doing it now would skip kit order and touch `src/` / `public/` from a prep seat.

**A.** Park PWA. Prep file only. Later KIT-08 implementer fills `public/__grok/icon-180.png`, keeps grok-pwa, writes the truth card for `groks-eye-view-next`, never remotes to live gevradio.

**Stop.**
