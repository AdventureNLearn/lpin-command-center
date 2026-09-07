# LPIN Civic Command Center

Lily Pad Intelligence Network — a board for honest questions over a real 3D Earth.
Governance, operations, and yields. Public sources only. Empty means we do not
know yet. You keep the call.

**Globe inspired by [Bilawal Sidhu](https://github.com/bilawalsidhu)’s
[God's Eye View](https://github.com/bilawalsidhu/gods-eye-view)** (MIT).
The original is the source of the idea and the feeling. This is a separate
civic command center, not a copy of that source tree. If you like the globe
concept, go star his project.

> Public data · guidance only · not legal advice · not for navigation.

## Try it

- First look: **Lily Pad Intelligence Network**, **See the planes**, **See orbit**, or just the globe
- Drag to orbit, scroll to zoom, click a contact to lock it
- **Board (N)** — civic desks. Honest empty. You keep the call.
- **Layers (L)** — exclusive feed rail. Nothing dumps at orbital zoom.
- **Talk (G)** / **Radio (R)** / **Corpus**
- Styles **1–6** — Normal / CRT / NVG / FLIR / Noir / Snow
- Command bar: a place, a desk, or a question

## Run

```bash
npm install
npm run dev
```

Cesium assets are copied from `node_modules/cesium` at dev/build time. No
Google 3D tiles, no accounts, no database.

## This tree

Private working copy of the Command Center. Live gevradio is a frozen
reference — do not overwrite it. Do not push `AdventureNLearn/groks-eye-view`.
Civic data is vendored (Kept harvests + permit catalog). No secrets in this file.

Optional: `XAI_API_KEY` on the server lets Talk answer questions about the
globe, and lets the command bar parse free-form language. Local parsers and
the radio still work without it.

## Stack

TanStack Start · React 19 · CesiumJS · satellite.js · Zustand

## Credits

See [CREDITS.md](./CREDITS.md). Original:
[github.com/bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view).

## License

[MIT](./LICENSE) for this source. Third-party feeds and imagery stay under
their own terms.
