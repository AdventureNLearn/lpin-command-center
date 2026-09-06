#!/usr/bin/env node
/** Promote 17 sourced Wikidata kits to gold object shape. No invented votes or pledges. */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const TPL = join(KITS, "_template");
const INDEX = join(ROOT, "vendor", "kept", "index.json");
const PKG = join(ROOT, "vendor", "kept", "_out", "packages", "_index.json");

const PROMOTE = [
  "se",
  "sk",
  "ve",
  "np",
  "mt",
  "jm",
  "me",
  "kz",
  "kh",
  "hn",
  "mg",
  "td",
  "ga",
  "ht",
  "ma",
  "gy",
  "jo",
  "th",
];

const OBJECTS = [
  "committees.json",
  "ethics.json",
  "filers.json",
  "gap.json",
  "institutional.json",
  "issues.json",
  "lobby.json",
  "money.json",
  "orgs.json",
  "pledges.json",
  "votes.json",
];

function writeJson(p, v) {
  writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
}

function slug(s) {
  return (
    String(s || "unknown")
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "unknown"
  );
}

function partiesFromMembers(iso2, members, source) {
  const counts = new Map();
  for (const it of members.items ?? []) {
    const name = (it.caucus || "").trim();
    if (!name) continue;
    const id = it.party_id && it.party_id !== "unknown" ? it.party_id : slug(name);
    const row = counts.get(id) ?? { id, name, seats: 0, source_url: source };
    row.seats += 1;
    counts.set(id, row);
  }
  return {
    iso2,
    source_url: source,
    items: [...counts.values()].sort((a, b) => b.seats - a.seats),
    incomplete: true,
  };
}

function promote(iso2) {
  const dir = join(KITS, iso2);
  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf8"));
  if (meta.lane === "gold-kit-8103") return { iso2, status: "already-gold" };
  const members = JSON.parse(readFileSync(join(dir, "members.json"), "utf8"));
  const sitting = (members.items ?? []).length;
  const source = members.source_url || meta.roster_source || "";
  for (const file of OBJECTS) {
    const dest = join(dir, file);
    if (existsSync(dest)) continue;
    copyFileSync(join(TPL, file), dest);
    const obj = JSON.parse(readFileSync(dest, "utf8"));
    obj.iso2 = iso2;
    writeJson(dest, obj);
  }
  writeJson(join(dir, "parties.json"), partiesFromMembers(iso2, members, source));
  meta.kit = "scoring";
  meta.lane = "gold-kit-8103";
  meta.threshold = 5;
  meta.basis = "Evidence";
  meta.incomplete = true;
  meta.honest_complete = false;
  meta.capabilities = [
    "members",
    "pledges",
    "votes",
    "issues",
    "gap",
    "caucus",
    "committees",
    "ethics",
    "money",
    "method",
  ];
  meta.counts = {
    ...(meta.counts ?? {}),
    members: sitting,
    sitting,
    votes: 0,
    committees: 0,
    key_votes: 0,
    sourced_quotes: 0,
    pledged: 0,
  };
  meta.note = `Gold object shape 2026-09-06. Sitting ${sitting} from Wikidata. Votes/pledges/money empty — not invented.`;
  writeJson(join(dir, "meta.json"), meta);
  return { iso2, status: "promoted", sitting, chamber: meta.chamber, parties: partiesFromMembers(iso2, members, source).items.length };
}

const results = PROMOTE.map(promote);
const gold = [];
const { readdirSync } = await import("node:fs");
for (const d of readdirSync(KITS, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name === "_template") continue;
  const m = JSON.parse(readFileSync(join(KITS, d.name, "meta.json"), "utf8"));
  if (m.lane === "gold-kit-8103") gold.push(d.name);
}
gold.sort();

const index = JSON.parse(readFileSync(INDEX, "utf8"));
index.updated = "2026-09-06";
index.local_gold_kits = gold;
index.local_gold_count = gold.length;
index.named_scoring_note = `Local gold kits = ${gold.length}. Live keptglobal homepage claim stays 19 until that host is updated.`;
writeJson(INDEX, index);

const pkg = JSON.parse(readFileSync(PKG, "utf8"));
pkg.gold_kits = gold;
pkg.gold_kit_count = gold.length;
pkg.populated_at = new Date().toISOString();
writeJson(PKG, pkg);

console.log(JSON.stringify({ gold: gold.length, results }, null, 2));
