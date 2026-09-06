# SEAT 02 — CAPITALS

Date: 2026-08-29  
Tree: `C:\AOS\ops\local-reason-bridge\sandbox\work\groks-eye-view-next`  
Corpus: `vendor/kept/_out/`  
Files read (not rewritten): `capitals.json`, `atlas.json`, `HANDOFF.md`, `FEED-AUDIT.md`, `AUDIT.md`, `AUDIT-LOG.md`, `STATUS.md`  
Method: PowerShell `ConvertFrom-Json` join on iso2 (case-insensitive). No network. No src edit.

**Labels:** **E** evidence on disk this sit. **I** inference from that evidence. **A** not verified on this disk.

---

## Verdict

**PASS**

`capitals.json` is a closed WAVE-2 delayed-point set: 194/194 rows parse, match `count`, carry valid lat/lon, join 1:1 into `atlas.json`, and omit the two atlas iso2 that lack sourced coordinates. Size matches HANDOFF. Plot the 194. Do not invent NR or PS.

---

## Tri-state

**Claim:** capitals can plot as delayed points without guessing.

**YES** — for the 194 `points[]` rows. Each has numeric lat/lon in range, `kind=capital`, `freshness=delayed`, and an atlas iso2. No (0,0). No swap flags. No missing fields.

**Not YES for the whole atlas.** NR and PS have no rows here. That is omit, not a plot. Guessing Yaren or Ramallah would be a fail.

Unknown / cannot-say does not apply to the 194: coordinates are on disk.

---

## File identity vs HANDOFF

| Check | Disk | Prior claim | Label |
|---|---|---|---|
| Path | `vendor/kept/_out/capitals.json` | HANDOFF WAVE-2 | E |
| Bytes | **63816** (no BOM; first bytes `7B 0A 20` = `{\n `) | HANDOFF 63816; FEED-AUDIT 63816 | E |
| mtime | 2026-08-29 10:41:40 | FEED-AUDIT `2026-08-29T10:41:40-04:00` | E |
| atlas.json | 38842 bytes, mtime 10:34:44 | HANDOFF 38842 | E |

Current `HANDOFF.md` line for this file is only: `capitals.json — capital points. WAVE-2. 63816 bytes.` It does **not** name 194, Natural Earth, delayed, or nr+ps. Those live on the JSON itself and on the join, below.

---

## 1. Parse / schema

Wrapper object, not a bare array. **E**

```
schema        gev.capitals.v1
generated     2026-08-29
freshness     delayed
source        naturalearth
source_url    https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_populated_places.geojson
note          "City-level capital points, not parcel-accurate. Countries without sourced capital coordinates omitted. No permit pins."
count         194
points        194  (matches count)
```

Per-point keys, uniform on all 194 rows: `iso2`, `name`, `lat`, `lon`, `kind`, `source_url`, `retrieved`, `freshness`. **E**

| Field | Observed | Label |
|---|---|---|
| iso2 | 194 unique, all `^[A-Z]{2}$` (uppercase). 0 dups, 0 empty | E |
| name | 194 non-empty strings | E |
| lat, lon | JSON numbers (none integer-truncated) | E |
| kind | `capital` × 194 | E |
| freshness | `delayed` × 194 | E |
| retrieved | `2026-08-29` × 194 | E |
| source_url | same NE 50m geojson URL × 194 | E |

`kind` is present and required. No extra keys. No permit fields. Matches the file note “No permit pins.” **E**

Atlas counterpart (join key only): bare array of **196** objects. Keys uniform: `iso2`, `name`, `un_member`, `kit_on_disk`, `source_url`, `retrieved`. Atlas iso2 is **lowercase** `^[a-z]{2}$`. Atlas has no lat/lon. **E**

---

## 2. Join to atlas.json by iso2

Join key: `iso2` uppercased. Capitals AD ↔ atlas ad. **E**

| Side | Rows | Unique iso2 |
|---|---|---|
| atlas.json | 196 | 196 |
| capitals.json `points` | 194 | 194 |
| inner join | 194 | 194 |
| atlas minus capitals | **2** | NR, PS |
| capitals minus atlas | **0** | — |

Atlas mix: un_member true 193 / false 3 (ps, tw, va). kit_on_disk true 33 / false 163. All 33 kit countries have a capital row. **E**

UN members with a capital: 192. Non-UN with a capital: TW (Taipei), VA (Vatican City). Arithmetic: 192 + 2 = 194 = file count. **I**

### Join table — holes only

| iso2 | atlas name | un_member | kit_on_disk | atlas source | capital row | plot |
|---|---|---|---|---|---|---|
| NR | Naoero | true | false | UN member-states | **absent** | omit |
| PS | State of Palestine | false | false | UN non-member-states | **absent** | omit |

### Join table — non-UN atlas rows that *do* join

| iso2 | atlas name | un_member | kit | capital | lat | lon |
|---|---|---|---|---|---|---|
| TW | Taiwan | false | true | Taipei | 25.035833 | 121.568333 |
| VA | Holy See | false | false | Vatican City | 41.903282 | 12.453387 |

### Join table — summary

| Class | n | Plot from this file |
|---|---|---|
| atlas ∩ capitals | 194 | yes, delayed city points |
| atlas \ capitals | 2 (NR, PS) | no — omit |
| capitals \ atlas | 0 | n/a |
| kit_on_disk ∩ capitals | 33/33 | yes |

XK, EH, HK, MO, PR and other non-atlas territories are on neither file. Not holes in this join. **E**

---

## 3. Lat/lon validity

| Test | Result | Label |
|---|---|---|
| lat range | **-41.299988 … 64.150024** (all in [-90, 90]) | E |
| lon range | **-175.220565 … 179.216647** (all in [-180, 180]) | E |
| (0, 0) | **0** | E |
| lat==0 or lon==0 | **0** | E |
| \|lat\|<0.5 and \|lon\|<0.5 | **0** | E |
| lat out of range / lon out of range | **0 / 0** | E |
| classic swap (lat outside ±90, lon inside ±90) | **0** | E |
| integer-only coords | **0** | E |

Extremes are named cities in the right basins, not null-island or axis-swap wrecks. **E** + **I** (name vs hemisphere)

| iso2 | name | lat | lon | why listed |
|---|---|---|---|---|
| NZ | Wellington | -41.299988 | 174.783266 | southernmost |
| IS | Reykjavík | 64.150024 | -21.950015 | northernmost |
| TO | Nuku'alofa | -21.138512 | -175.220565 | westmost |
| TV | Funafuti | -8.516652 | 179.216647 | eastmost |

Swap-risk class (near equator or prime meridian) still looks like the named city, not a swapped pair. Quito is lat≈-0.21 lon≈-78.5 (if swapped, lat would be illegal). London is lat≈51.50 lon≈-0.12. Nairobi lat≈-1.28 lon≈36.81. Singapore lat≈1.29 lon≈103.85. **E**

Spot-check vs well-known city positions (tolerance 2°, 43 distinct iso2 including US GB FR DE JP CN AU NZ BR ZA IN RU EG CA MX AR CL KE NG IL TW KR VA IS TO FJ IE PT ES IT NL BE UA PL TR SA ID PH TH SG GH SN): **no SWAPPED, no MISS**. **I** (auditor memory of city coords, not a second file on disk). Largest named drift in that set is TZ (see holes).

---

## 4. “194 Natural Earth delayed; nr+ps omitted”

### What the files actually say

**Confirmed on `capitals.json` (E):**

- `"count": 194` and `points.length == 194`
- `"source": "naturalearth"`
- `"freshness": "delayed"` (wrapper and every point)
- `"source_url"` is the NE 50m populated-places geojson
- `"note"`: countries without sourced capital coordinates **omitted**; city-level not parcel-accurate; no permit pins

**Not named anywhere in `_out/` comments (E, absence):** no file lists `NR`, `PS`, or `nr+ps` as an omit list. `HANDOFF.md` does not mention 194 / Natural Earth / delayed / nr+ps. `FEED-AUDIT.md` only re-states size+mtime. `AUDIT.md` / `AUDIT-LOG.md` / `STATUS.md` are WAVE-501 / PARK, not WAVE-2.

**Confirmed by join, not by a comment (I):** the only atlas iso2 missing from capitals are **NR** and **PS**. That is the omit set relative to atlas.

### Why omitted (honest)

File-level reason only: *“Countries without sourced capital coordinates omitted.”* **E**

Per-iso2 why is **not** on disk. This sit does not fetch Natural Earth. Do not treat the following as retrieved NE facts:

- NR / Naoero / Yaren may be absent from NE 50m admin-0 capitals because the island is small. **A**
- PS / State of Palestine may lack an ISO_A2=PS capital feature in that extract. **A**

What is allowed: leave NR and PS as holes. What is not allowed: mint coordinates. The omit is the correct WAVE-2 behavior given the note.

---

## Honest holes

1. **NR (Naoero)** — UN member on atlas; no capital point. Omit. Do not guess Yaren. **E**
2. **PS (State of Palestine)** — atlas non-member; no capital point. Omit. Do not guess Ramallah / East Jerusalem. **E**
3. **City-level, not parcel** — file note. These are NE populated-place coords, not AHJ / building pins. **E**
4. **Delayed** — every row `freshness=delayed`. Not live. **E**
5. **TZ plots Dar es Salaam** (`-6.798067, 39.266396`), not Dodoma. Still a sourced NE city point; not a guess; not a swap. Official-capital drift vs NE extract. **E** (name+coords on file) / **I** (Dodoma is the usual statutory capital)
6. **NL plots Amsterdam**, not The Hague. Same class as TZ: NE city choice, plottable. **E** / **I**
7. **ZA plots Pretoria** only (not Cape Town / Bloemfontein). Admin capital from NE. **E**
8. **US name** is `Washington,  D.C.` (two spaces after the comma). Cosmetic. Coords 38.901495, -77.011364. **E**
9. **Six names equal the atlas country name** (city-state / microstate NE labels): AD Andorra, DJ Djibouti, LU Luxembourg, MC Monaco, SG Singapore, SM San Marino. Not a join miss. **E**
10. **iso2 case** — capitals uppercase, atlas lowercase. Join must fold case. **E**
11. **Prior-session omit list not written into HANDOFF** — nr+ps is true on join, unnamed in the closeout text. **E**
12. **NE source geojson is not in this tree** — cannot re-derive the 194 from upstream this sit. **E**
13. No XK / EH / HK / MO / PR rows on either file. Out of scope for this join. **E**

None of these are invented points. None block plotting the 194.

---

## Fail checks (this seat)

| Check | Result |
|---|---|
| JSON parses | PASS |
| `count` == `points.length` == 194 | PASS |
| schema keys present (iso2, name, lat, lon, kind) | PASS |
| bytes == HANDOFF 63816 | PASS |
| join capitals ⊂ atlas | PASS (0 extras) |
| atlas holes named and omitted, not filled | PASS (NR, PS) |
| lat/lon in range, no 0,0, no swap flag | PASS |
| freshness delayed on all plottable rows | PASS |
| no permit pins / no sitting names | PASS |
| no guessed NR/PS coords in file | PASS |

---

## Plot rule (for later seats, not executed here)

1. Draw the 194 delayed `kind=capital` points as-is. **YES**
2. Label them delayed / city-level. **YES**
3. Skip NR and PS. **YES**
4. Do not interpolate, do not copy a neighbor, do not geocode from the country name. **required**
5. Fold iso2 case when joining atlas. **required**

---

## Stop

Corpus files not modified. `src/` not touched. This file is the only write.
