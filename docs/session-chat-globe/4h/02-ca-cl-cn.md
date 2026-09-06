# 4h seat 02 — ca · cl · cn

**Class:** public-suite WIP · localhost only · **not a ship**  
**Tree:** `sandbox/work/groks-eye-view-next`  
**This file only.** No `src/`. No live gevradio. No Bogpulse. No 163 atlas holes. No sitting-name dump.

Law: `4H-PUSH.md` Kept bar · `00-SPINE.md` Insight · `08-kept.md` resolve · `desks.ts` / `roster.ts`.

Desk formula (**E**): `named` = `meta.counts.members` else sitting; `seats` = `meta.seats` else named. Capital join = atlas `kit_on_disk` ∩ `capitals.json` iso2-fold ∩ package `capital` lat/lon. Chat does not reuse `keptOpen`.

| iso2 | kit_on_disk | named / seats | capital join | chat-card |
|------|-------------|---------------|--------------|-----------|
| ca | **true** | **338 / 343** | **GO** CA = package | **GO** fat |
| cl | **true** | **0 / 155** | **GO** CL = package | **GO** empty roster |
| cn | **true** | **2849 / 2977** | **GO** CN = package | **GO** fat |

## ca — Canada

- **kit_on_disk:** atlas `ca` true · `_index` kit_package true · dir `vendor/kept/kits/ca/` (12 objects). Sidecar `kits/ca.json` is **not** the desk (stale counts 240 / 216). Glob is `kits/*/meta.json`.
- **named / seats:** meta `counts.members` 338, `seats` 343, chamber `House of Commons`, kit `scoring`. `members.json` 139296 B, `claimed_seats` 343, `sitting` true, `retrieved` 2026-08-20. Package members filled 338; hole `items 338 claimed_seats 343`. Vacancies not invented. Do not mint the other house. Do not load `votes.json` (4.8 MB) as names.
- **capital join:** `capitals.json` CA 45.418643, −75.701961 = package `capital`. `keptDeskByIso("ca")` lat/lon from that point. Height **1_200_000**.
- **chat-card GO.** Resolve: `ca` (iso2 first, beats California preset), `Canada` (name exact). Card `q` = desk.name `Canada`, not the capital token. Body `House of Commons · 338 of 343 named`. `desk.id` `ca`. Fly opt-in desk coords. Open desk lists filed names only; five unnamed seats stay a hole.

## cl — Chile (empty roster; still a desk)

- **kit_on_disk:** atlas `cl` true · `_index` kit_package true, holes 18 · dir `vendor/kept/kits/cl/` (15 files, template extras filers/lobby/orgs). Seed `map` kit. **Not** an atlas hole.
- **named / seats:** meta members/sitting **0 / 0**, `seats` 155, chamber `Camara de Diputados` (as filed). `members.json` entire file `{ "iso2": "cl", "items": [] }` (36 B). Package members empty; hole `items 0; sitting 0; no invented roster`. Roster loader: 0 named → `No sourced sitting names on disk. Seat left empty.`
- **capital join:** `capitals.json` CL −33.448068, −70.668987 = package `capital`. One country `Contact` only. **0 member pins.**
- **chat-card GO** (empty roster ≠ NO-GO). Resolve: `cl`, `Chile`. Same Insight shape; `named === 0` → body `no sourced roster` (contact meta may prefix chamber). `q` `Chile`. Fly still opt-in at 1.2 Mm. Open desk is the hole sentence, empty `ul`. **NO-GO:** Wikipedia / `_template` / CA-CN fat backfill.

## cn — China

- **kit_on_disk:** atlas `cn` true · `_index` kit_package true, holes 11 · dir `vendor/kept/kits/cn/` (12 objects). Desk **name** is meta `China` (atlas label is longer — do not require it).
- **named / seats:** meta `counts.members` 2849, `seats` 2977, chamber `National People's Congress`, kit `scoring`, `incomplete` true. `members.json` 1502571 B, `claimed_seats` 2977. Package members filled 2849; hole `items 2849 claimed_seats 2977`. Vacancies not padded. Votes 82 totals, named 0 — not a second roster. Money 0 honest empty. No 2849 pins.
- **capital join:** `capitals.json` CN 39.930838, 116.38634 = package `capital`.
- **chat-card GO.** Resolve: `cn`, `China`. Card `q` `China`. Body `National People's Congress · 2849 of 2977 named`. `desk.id` `cn`. Fly desk coords at 1.2 Mm, not `lookupPlace`.

## Chat-card (shared)

**GO** when chat names the kit country → one Insight, globe does not move, Open desk, Fly opt-in.

```
<<INSIGHT:{"title":"Canada","body":"House of Commons · 338 of 343 named","system":"kept","q":"Canada","layer":"legislatures","desk":{"system":"kept","id":"ca"},"source":"Kept harvest / public registers"}>>
```

Same shape for `cl` / `cn` (`title`/`q`/`desk.id` from the desk; CL body `no sourced roster`).

**NO-GO:** `applyAction keptOpen` (auto-flies) · card Fly via `lookupPlace` · `desk.id` not in `keptDeskByIso` · invent CL names · plot 163 holes · member pins · sidecar `kits/ca.json` · canned municipality `q` · live gevradio.

Capital-token resolve (`matchKeptDesk` capital exact; no presets on these three) may hit the desk; the card still titles the **country**. Bare `ch` is ambiguous (Chile + China includes) → no card.

## Leftovers (coordinator `src/`, not this seat)

1. Kept Fly = desk lon/lat + `LEG_H`, never preset/48k.
2. Gate `desk.id` through `keptDeskByIso` (no smuggled hole iso).
3. Atlas long CN label is not `desk.name`; matcher is `China` / `cn`.
4. Ignore `vendor/kept/kits/ca.json`.

**Close:** all three are `kit_on_disk` desks with sourced capitals. CA and CN are fat with visible vacancy holes. CL is an honest empty roster **and** a GO card. Not a ship.
