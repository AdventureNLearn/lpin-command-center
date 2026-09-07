# Seat 11 — Load usability

Target class: public-suite. Tree: `REPO_ROOT`.  
Corpus: `vendor/kept/_out/`. Bots PARK. Gold-kit `votes.json` not opened. `src/` not edited.

**Claim under test:** every corpus JSON parses, and the parsed set is small enough for a localhost Vite smoke dashboard without a JSON worker.

**Method:** Windows PowerShell 5.1.26100 `ConvertFrom-Json` and node v24.18.0 `JSON.parse` on every `*.json` under `_out/` (recursive). Markdown excluded from the byte budget. `vendor/kept/kits/**/votes.json` listed by `Length` only — not read, not parsed.

---

## Parse results

83 / 83 `_out` JSON files: **PARSE_OK** on both engines. Parse fail: **0**. Empty / whitespace-only: **0**. UTF-8 BOM on JSON: **0**.

### Top-level

| File | Bytes | Engines | Shape | Notes |
|------|------:|---------|-------|-------|
| `atlas.json` | 38,842 | PS+node OK | array n=196 | `kit_on_disk` 33 true / 163 false |
| `capitals.json` | 63,816 | PS+node OK | object `gev.capitals.v1` | `count` 194 = `points.length`; `freshness` delayed |
| `permit-index.json` | 1,477 | PS+node OK | object | `counts.core/extra/more/rest`; `rest_is_count_not_map` true |
| `501-links.json` | 125,973 | PS+node OK | object | iso2 `us`; nodes 199, edges 215, holes 17 |
| `packages/_index.json` | 11,074 | PS+node OK | object | `kit_on_disk_count` 33, `remaining_count` 0, extras 12 fills |

HANDOFF byte claims match disk for all five.

### packages/*.json — kit (33)

All PARSE_OK. Keys: `iso2, kit_on_disk, objects, capital, holes, retrieved, source`. Every row `kit_on_disk=true` and has a `capital` object. No empty file.

| File | Bytes | Kit holes (array n) |
|------|------:|--------------------:|
| `packages/ar.json` | 1,854 | 8 |
| `packages/au.json` | 1,879 | 8 |
| `packages/br.json` | 1,761 | 7 |
| `packages/ca.json` | 1,850 | 8 |
| `packages/cl.json` | 2,605 | 15 |
| `packages/cn.json` | 2,027 | 10 |
| `packages/de.json` | 1,940 | 9 |
| `packages/eg.json` | 1,870 | 8 |
| `packages/es.json` | 1,974 | 9 |
| `packages/fj.json` | 2,591 | 15 |
| `packages/fr.json` | 1,839 | 8 |
| `packages/gb.json` | 1,925 | 9 |
| `packages/gh.json` | 1,869 | 8 |
| `packages/id.json` | 2,140 | 11 |
| `packages/il.json` | 1,930 | 8 |
| `packages/in.json` | 1,956 | 9 |
| `packages/it.json` | 1,899 | 8 |
| `packages/jp.json` | 1,872 | 8 |
| `packages/ke.json` | 1,972 | 9 |
| `packages/kr.json` | 1,822 | 8 |
| `packages/mx.json` | 1,986 | 9 |
| `packages/ng.json` | 1,960 | 9 |
| `packages/nl.json` | 2,597 | 15 |
| `packages/nz.json` | 1,867 | 8 |
| `packages/ph.json` | 2,023 | 10 |
| `packages/pl.json` | 1,754 | 7 |
| `packages/th.json` | 2,597 | 15 |
| `packages/tr.json` | 2,024 | 9 |
| `packages/tw.json` | 1,913 | 8 |
| `packages/tz.json` | 2,603 | 15 |
| `packages/ua.json` | 1,934 | 9 |
| `packages/us.json` | 1,789 | 7 |
| `packages/za.json` | 1,992 | 9 |

Kit class: n=33, bytes=66,614, min=1,754 (`pl.json`), max=2,605 (`cl.json`).

### packages/*.json — permit (33)

All PARSE_OK. Keys: `iso2, source, retrieved, lock_date, counts, factory_urls_verified, paths, holes, notes`. Smallest corpus JSON is here. No empty file.

| File | Bytes | Hole objects |
|------|------:|-------------:|
| `packages/ar-permit.json` | 1,047 | 1 |
| `packages/au-permit.json` | 888 | 1 |
| `packages/br-permit.json` | 841 | 1 |
| `packages/ca-permit.json` | 889 | 1 |
| `packages/cl-permit.json` | 1,425 | 1 |
| `packages/cn-permit.json` | 783 | 1 |
| `packages/de-permit.json` | 825 | 1 |
| `packages/eg-permit.json` | 852 | 1 |
| `packages/es-permit.json` | 894 | 1 |
| `packages/fj-permit.json` | 2,602 | 1 |
| `packages/fr-permit.json` | 824 | 1 |
| `packages/gb-permit.json` | 819 | 1 |
| `packages/gh-permit.json` | 1,110 | 1 |
| `packages/id-permit.json` | 992 | 1 |
| `packages/il-permit.json` | 933 | 1 |
| `packages/in-permit.json` | 934 | 1 |
| `packages/it-permit.json` | 804 | 1 |
| `packages/jp-permit.json` | 871 | 1 |
| `packages/ke-permit.json` | 970 | 1 |
| `packages/kr-permit.json` | 810 | 1 |
| `packages/mx-permit.json` | 985 | 1 |
| `packages/ng-permit.json` | 831 | 1 |
| `packages/nl-permit.json` | 1,248 | 1 |
| `packages/nz-permit.json` | 1,228 | 1 |
| `packages/ph-permit.json` | 1,036 | 1 |
| `packages/pl-permit.json` | 808 | 1 |
| `packages/th-permit.json` | 2,769 | 1 |
| `packages/tr-permit.json` | 882 | 1 |
| `packages/tw-permit.json` | 760 | 1 |
| `packages/tz-permit.json` | 2,761 | 1 |
| `packages/ua-permit.json` | 793 | 1 |
| `packages/us-permit.json` | 920 | 2 |
| `packages/za-permit.json` | 930 | 1 |

Permit class: n=33, bytes=36,064, min=760 (`tw-permit.json`), max=2,769 (`th-permit.json`). `us-permit.json` is the only permit file with 2 hole objects (territory rows omitted from US-only). Larger fj/th/tz permit files are longer *notes/reason text*, not pin lists.

### packages/*.json — fill (12)

All PARSE_OK. Keys: `iso2, wave, hole_type, retrieved, source, read_only, did_not_rewrite, counts, log, summary, notes`. `hole_type` = ingest-drop. Present: `br ca cn de fr gb it kr pl tw ua us`. Absent (HANDOFF): no `ng`/`tr`/`mx` fill, and 18 other ready isos also have no fill file.

| File | Bytes | `summary.left` |
|------|------:|---------------:|
| `packages/br-fill.json` | 17,049 | 19 |
| `packages/ca-fill.json` | 10,931 | 21 |
| `packages/cn-fill.json` | 18,083 | 19 |
| `packages/de-fill.json` | 12,579 | 19 |
| `packages/fr-fill.json` | 15,685 | 19 |
| `packages/gb-fill.json` | 14,191 | 21 |
| `packages/it-fill.json` | 15,190 | 19 |
| `packages/kr-fill.json` | 10,603 | 16 |
| `packages/pl-fill.json` | 19,335 | 21 |
| `packages/tw-fill.json` | 19,356 | 21 |
| `packages/ua-fill.json` | 13,622 | 17 |
| `packages/us-fill.json` | 9,870 | 19 |

Fill class: n=12, bytes=176,494. Mild size outliers vs kit/permit (mean of all 83 files = 6,269 B; pl/tw fills ≈ 19 KB). Still two orders below a worker threshold.

### Parse fails / empty / huge

| Class | Count | Files |
|-------|------:|-------|
| PARSE_FAIL | 0 | — |
| EMPTY | 0 | — |
| `_out` size-class outlier (>100 KB) | 1 | `501-links.json` 125,973 B (123.0 KiB) |
| `_out` >3× mean | 5 | `501-links.json`, `capitals.json` 63,816, `atlas.json` 38,842, `tw-fill.json` 19,356, `pl-fill.json` 19,335 |
| Huge vs Vite main thread | 0 in `_out` | — |
| Huge, **not loaded** (policy) | 34 `votes.json` + `places-rest.ts` | kits votes total 355,064,486 B (~338.6 MiB), largest `kits/ua/votes.json` 90,993,406 B; `src/lib/permit/places-rest.ts` 3,372,392 B (~3.29 MiB) |

No corpus JSON is a load-risk outlier. `501-links.json` is the largest `_out` JSON and is still main-thread-safe. The actual huge files are gold-kit votes and Rest places — out of this loader on purpose.

---

## Size budget

`_out` JSON only (md excluded):

| Bucket | Files | Bytes | KiB |
|--------|------:|------:|----:|
| All `_out` `*.json` | 83 | 520,354 | 508.2 |
| Eager recommended (atlas + capitals + permit-index + packages/_index + 33 kit + 33 permit) | 70 | 217,887 | 212.8 |
| Same without capitals overlay | 69 | 154,071 | 150.5 |
| Eager + 12 fills | 82 | 394,381 | 385.1 |
| Lazy `501-links.json` | 1 | 125,973 | 123.0 |
| `_out` `*.md` (not imported) | 7 | 20,991 | 20.5 |

**Is 508 KiB small enough to import from the Vite app without a worker?** Yes, for localhost smoke. Vite already ships Cesium workers for the globe; a JSON parse worker is not justified under 0.5 MiB. First-paint cost of the 213 KiB eager set is in the same band as a small CSS bundle. `501-links.json` at 123 KiB is fine as a *dynamic* import, not as a blocking first-paint module.

Do not compare this budget to Rest or votes:

- `places-rest.ts` 3.29 MiB — never import for smoke.
- `vendor/kept/kits/**/votes.json` ~339 MiB across 34 files — never import, never parse (this seat did not).

`tsconfig.json` `include` is `src` + `server` only; `resolveJsonModule` is not set. That is a *host wiring* note, not a parse fail. Smoke can `fetch` the JSON as static files or Vite-import it from a route that is allowed to see `vendor/kept/_out/`. This seat does not add that route.

---

## Recommended loader

```
eager  import  atlas.json
eager  import  capitals.json          // optional overlay; freshness=delayed
eager  import  permit-index.json
eager  import  packages/_index.json
eager  import  packages/{iso}.json          // 33 kit summaries, ~65 KiB total
eager  import  packages/{iso}-permit.json   // 33 permit counts, ~35 KiB total
lazy   import  501-links.json               // US graph; counts card can wait
opt    import  packages/{iso}-fill.json     // hole-detail pane only
never  import  src/lib/permit/places-rest.ts
never  import  vendor/kept/kits/**/votes.json
never  fetch   live gevradio.grok.me as a write/overwrite target
```

Use `packages/_index.json` as the inventory. Do not glob `kits/` from the app. Do not sum the 33 permit packages into a global desk count (core/extra would repeat the US catalog); the permit *card* reads `permit-index.json`.

---

## Smoke dashboard — show today (no pins)

All of the following is already on disk and parsed.

1. **Country list — 33 ready / 163 hole.** `atlas.json` n=196 unique iso2. `kit_on_disk=true` (33): ar au br ca cl cn de eg es fj fr gb gh id il in it jp ke kr mx ng nl nz ph pl th tr tw tz ua us za. `kit_on_disk=false` (163). UN members 193; not-UN 3 = ps, tw, va (only tw is ready). Card: `33 / 196 ready`, `163 hole`. Do not invent kits for the 163.

2. **Capital delayed points — optional overlay.** `capitals.json` 194 points, every point `kind=capital` and `freshness=delayed`. Atlas rows with no capital point: `nr` (Naoero), `ps` (State of Palestine). Capitals with no atlas row: 0. Draw only if the HUD labels them delayed city-level points, not parcel pins.

3. **Permit count card.** From `permit-index.json` (lock_date 2026-08-18): core **79**, extra **462**, more **699**, rest **14925** (count only). `honesty.rest_is_count_not_map=true`. `factory_urls_verified=false`. Total unique desks 16,165. `us-permit.json` is a US-only subset (more 680, rest 14,855) with 2 honest holes — do not draw it as the global card.

4. **Package holes.** `packages/_index.json`: 33/33 PASS, `remaining_count` 0, last_audit PACKAGE-TZ PASS. `rows[].holes` sum **393**. Fill extras 12, fill-hole sum **231**. Fill files present for 12 isos; **21 ready isos have no fill file** (ar au cl eg es fj gh id il in jp ke mx ng nl nz ph th tr tz za). Kit-package hole arrays (7–15 per iso) are displayable as a table. Do not close holes in the UI.

5. **501 node/edge counts.** `501-links.json` iso2 `us`: nodes **199** (committee 166, org 33), edges **215** (fec `contributed` 186, usaspending `granted` 29), holes **17**. WAVE-501 PASS. Card the integers. Do not dump node names as a sitting roster.

---

## Smoke dashboard — must not show

- **Rest pins.** `rest=14925` is a count, not a map. No pin list, no GeoJSON, contents not copied. `places-rest.ts` stays out of the bundle. Do not dump 16k pins.
- **Invented rosters.** No new sitting names. Do not parse `votes.json` / `members.json` to populate the 163 hole countries. 501 committee/org strings stay off the smoke cards; counts only.
- **Live gevradio overwrite.** This tree is a new app. Do not remix or write https://gevradio.grok.me. Do not treat this dashboard as a host deploy.

---

## Verdict

**PASS.** Every `_out` JSON parses on PowerShell `ConvertFrom-Json` and node `JSON.parse`. No empty files. No huge load-risk outlier inside the corpus. 508 KiB total JSON is importable on the Vite main thread; the 213 KiB eager set is the right first paint.

Honest holes (display, do not fill): 163 atlas holes, 2 missing capital points, 21 missing fill files, rest-is-count, 501 is US-only, capitals delayed, `tsconfig` does not yet include `vendor/` for typed JSON imports.

---

## E / I / A

**E.** 83/83 `_out` JSON PARSE_OK × 2 engines; 520,354 bytes JSON; atlas 196 = 33 ready / 163 hole; capitals 194 delayed; permit-index 79/462/699/14925 rest-not-map; packages 33 kit + 33 permit + 12 fill + `_index`, remaining 0; 501 nodes 199 / edges 215 (fec 186, usaspending 29) / holes 17. Gold-kit votes.json not parsed (34 files, 355,064,486 bytes). `places-rest.ts` 3,372,392 bytes not imported.

**I.** The corpus is loadable for a localhost smoke dashboard today without a JSON worker, if the loader follows the size budget. Completeness holes are already structured fields (`kit_on_disk`, `holes`, `freshness`, `rest_is_count_not_map`). Parse success is not permission to draw Rest pins, invent rosters, or overwrite live gevradio.

**A.** Host may wire a localhost smoke view that eager-imports atlas / capitals / permit-index / packages (kit+permit+_index), lazy-imports 501-links, and never imports places-rest or votes.json. This seat writes only this file. No `src/` edit. No npm. No git push.

---

## Tri-state

**Question:** corpus is loadable for a localhost smoke dashboard.

| State | Meaning |
|-------|---------|
| YES | Parses, sized for Vite main thread, dashboard cards exist without pins |
| DELAYED | Parses but a required card is missing or too large to import without a worker |
| NO | Parse fail, empty required file, or only loadable via forbidden Rest/votes |

**YES.**
