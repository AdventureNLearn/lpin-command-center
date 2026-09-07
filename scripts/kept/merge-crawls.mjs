#!/usr/bin/env node
/** Merge _out/crawls into empty kit objects. Never overwrite harvest or non-empty files. */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const CRAWLS = join(ROOT, "docs", "command-center", "_out", "crawls");
const TODAY = new Date().toISOString().slice(0, 10);
const TOPICS = ["votes", "pledges", "committees", "ethics", "money", "lobby", "filers", "orgs"];
const HARVEST = new Set(
  "ar au br ca cn de dk eg es fr gb gh id il in it jp ke kr mx ng nz ph pl tr tw ua us za".split(" ")
);

function readJson(p, fb) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fb;
  }
}
function writeJson(p, v) {
  writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
}
function filled(obj) {
  return ((obj && (obj.buckets || obj.items)) || []).length > 0;
}
/** Official natural-person lobby/filer/ethics rows stay out of samples (OPSEC). */
function isPersonName(x) {
  const kind = String(x.kind || "");
  const name = String(x.name || "").trim();
  const blob = `${kind} ${name} ${x.id || ""}`;
  if (/registered-lobbyist|natural.?person|persona natural/i.test(blob)) return true;
  if (/^\d{5,}[-.]?\d*[A-Za-z]?$/.test(name)) return true;
  if (/^[\p{L}][\p{L}'’. -]*,\s*[\p{L}][\p{L}'’. -]*$/u.test(name)) return true;
  if (/\b(party|partido|committee|commission|org|ltd|inc|corp|association|union|register|inscripci[oó]n|gestor|minister|ministry|dataset|host)\b/i.test(name)) {
    return false;
  }
  return /^(?:[\p{Lu}][\p{L}'’.-]+)(?:\s+(?:de|del|van|von|da|dos|di|le|la|el)){0,1}\s+[\p{Lu}][\p{L}'’.-]+$/u.test(name);
}
function isPiiSample(topic, items) {
  if (topic !== "lobby" && topic !== "filers" && topic !== "ethics") return false;
  return items.some(isPersonName);
}

const files = existsSync(CRAWLS)
  ? readdirSync(CRAWLS).filter((f) => f.endsWith(".json") && f !== "_summary.json")
  : [];
const stats = { crawls: files.length, written: {}, skipped: {}, pii: 0, harvest_votes: 0 };
for (const t of TOPICS) {
  stats.written[t] = 0;
  stats.skipped[t] = 0;
}

for (const f of files) {
  const iso = f.replace(/\.json$/, "");
  const crawl = readJson(join(CRAWLS, f), null);
  if (!crawl || !crawl.collected) continue;
  const dir = join(KITS, iso);
  if (!existsSync(dir)) continue;
  for (const t of TOPICS) {
    const kitP = join(dir, `${t}.json`);
    const kit = readJson(kitP, { iso2: iso, items: [] });
    if (filled(kit)) {
      stats.skipped[t]++;
      continue;
    }
    const col = crawl.collected[t];
    const src = crawl.sources && crawl.sources[t];
    const items = (col && (col.items || col.buckets)) || [];
    if (!items.length) {
      // Harvest protect: never rewrite existing empty notes. Stub only if missing.
      if (!existsSync(kitP)) {
        const empty = {
          iso2: iso,
          items: [],
          incomplete: true,
          retrieved: TODAY,
          note: (src && src.note) || `No sourced ${t} for this ISO. Not invented.`,
        };
        if (src && src.url) empty.source_url = src.url;
        writeJson(kitP, empty);
      }
      stats.skipped[t]++;
      continue;
    }
    if (HARVEST.has(iso) && t === "votes") {
      stats.skipped[t]++;
      stats.harvest_votes++;
      continue;
    }
    if (isPiiSample(t, items) || /no PII|natural-?person/i.test(String(kit.note || ""))) {
      stats.skipped[t]++;
      stats.pii++;
      continue;
    }
    const out = {
      iso2: iso,
      source_url: (col && col.source_url) || (src && src.url) || "",
      retrieved: TODAY,
      incomplete: true,
      items: t === "money" && col.buckets ? undefined : items.slice(0, t === "votes" ? 50 : t === "committees" ? 80 : 40),
    };
    if (t === "money" && (col.buckets || []).length) {
      delete out.items;
      out.named_donors = false;
      out.buckets = col.buckets;
      out.unit = col.unit || "";
      out.note = col.note || "Official source-type buckets. Named private donors not collected.";
    } else {
      out.note = col.note || `Capped sample from official source.`;
    }
    writeJson(kitP, out);
    stats.written[t]++;
    const sourcesP = join(dir, "sources.json");
    const sources = readJson(sourcesP, { iso2: iso, items: [] });
    const id = `official-${t}`;
    if (!(sources.items || []).some((x) => x.id === id) && out.source_url) {
      sources.items = sources.items || [];
      sources.items.push({
        id,
        label: `Official ${t}`,
        url: out.source_url,
        kind: "primary",
        basis: "Evidence",
      });
      writeJson(sourcesP, sources);
    }
  }
}
writeJson(join(CRAWLS, "_summary.json"), { retrieved: TODAY, ...stats });
console.log(JSON.stringify(stats, null, 2));
