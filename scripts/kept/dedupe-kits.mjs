#!/usr/bin/env node
/** Dedupe kit objects by id then name+chamber. Never shrink harvest votes>=10. */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const TODAY = new Date().toISOString().slice(0, 10);
const CATS = ["members", "parties", "committees", "ethics", "pledges", "lobby", "filers", "orgs", "votes"];

function readJson(p, fb) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fb;
  }
}
function keyOf(it) {
  const id = String(it.id ?? "").trim().toLowerCase();
  if (id) return `id:${id}`;
  const name = String(it.name ?? it.title ?? it.quote ?? "").trim().toLowerCase();
  const extra = String(it.chamber ?? it.date ?? it.url ?? it.source_url ?? "").trim().toLowerCase();
  return `n:${name}|${extra}`;
}

const dirs = readdirSync(KITS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "_template")
  .map((d) => d.name);
const stats = { kits: dirs.length, removed: {}, files: 0 };
for (const c of CATS) stats.removed[c] = 0;

for (const iso of dirs) {
  const dir = join(KITS, iso);
  for (const c of CATS) {
    const p = join(dir, `${c}.json`);
    if (!existsSync(p)) continue;
    const j = readJson(p, null);
    if (!j || !Array.isArray(j.items) || j.items.length < 2) continue;
    if (c === "votes" && j.items.length >= 10) continue;
    const seen = new Set();
    const next = [];
    for (const it of j.items) {
      const k = keyOf(it);
      if (seen.has(k)) continue;
      seen.add(k);
      next.push(it);
    }
    const drop = j.items.length - next.length;
    if (!drop) continue;
    j.items = next;
    j.incomplete = true;
    j.note = [j.note, `Deduped ${drop} duplicate ${c} rows ${TODAY}.`].filter(Boolean).join(" ");
    writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
    stats.removed[c] += drop;
    stats.files++;
  }
}
const out = join(ROOT, "docs", "command-center", "_out", "polish", "_dedupe.json");
writeFileSync(out, JSON.stringify({ retrieved: TODAY, ...stats }, null, 2) + "\n");
console.log(JSON.stringify(stats, null, 2));
