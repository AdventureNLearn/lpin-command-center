# Grok's Eye View — self-contained archive

**Status:** Open kit work (D-254). D-251 still binds: this is a new app.  
**This tree is a new app.** Live https://gevradio.grok.me is **not** remixed and is **not** the write target.

## What this is

A hard copy of the cockpit plus vendored civic catalogs so the product can be finished even if grok.me hosts or GitHub remotes go dark.

| Piece | On disk here | Live host (read-only reference) |
|-------|----------------|----------------------------------|
| Shell | cloned `AdventureNLearn/groks-eye-view` @ `224ea59` | https://gevradio.grok.me |
| Permit catalog | `src/lib/permit/` (16,165 desks, lock 2026-08-18) | https://hivepermitdev.grok.me |
| Kept gold kits | `vendor/kept/kits/` (34 iso folders, ~378 MB) | https://keptglobal.grok.me |
| Integrity test | `scripts/permit/catalog-integrity.test.mjs` | — |

Remote `upstream` = public groks-eye-view. **Do not push this tree there.**

## Do not load on first paint

- `src/lib/permit/places-rest.ts` (~3.3 MB)
- `vendor/kept/kits/*/votes.json` (some 30–87 MB)

## Honest holes (fill later, not now)

- Live Kept atlas claims **196** desks. This disk has **34** kit folders (28 harvest + BATCH1 map stubs). World atlas JSON is not fully vendored.
- Chamber/capital coordinates are not a packed file yet.
- Shell live feeds (flights, sats, quakes) still call public APIs at runtime. Optional keys stay in the browser (`OpenSky`, `AISStream`, `FIRMS`).

## Pickup

1. Host: `npm run dev` (:8080) → KIT-00 on **localhost** → then KIT-01 only.
2. Optional Bot: this tree only. Read `vendor/kept/_out/PASTE-FOR-ANL-FEEDS.md`. Write `_out/` only.
3. Do not push `upstream`.
