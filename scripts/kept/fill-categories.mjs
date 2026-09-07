#!/usr/bin/env node
/** Fill empty kit categories from members + shared issue taxonomy. No invented votes. */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const TODAY = new Date().toISOString().slice(0, 10);
const ISSUES = JSON.parse(readFileSync(join(KITS, "us", "issues.json"), "utf8")).items;

function writeJson(p, v) {
  writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
}
function readJson(p, fb) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fb;
  }
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

const dirs = readdirSync(KITS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "_template")
  .map((d) => d.name);

let issuesN = 0;
let partiesN = 0;
let gapN = 0;
for (const iso of dirs) {
  const dir = join(KITS, iso);
  const issues = readJson(join(dir, "issues.json"), { items: [] });
  if (!(issues.items || []).length) {
    writeJson(join(dir, "issues.json"), {
      iso2: iso,
      items: ISSUES.map((x) => ({ ...x })),
      incomplete: false,
      note: "Shared scoring issue list. Country pledges/votes still empty until sourced.",
    });
    issuesN++;
  }
  const mem = readJson(join(dir, "members.json"), { items: [] });
  const parties = readJson(join(dir, "parties.json"), { items: [] });
  if (!(parties.items || []).length && (mem.items || []).length) {
    const counts = new Map();
    for (const it of mem.items) {
      const name = (it.caucus || "").trim();
      if (!name) continue;
      const id = it.party_id && it.party_id !== "unknown" ? it.party_id : slug(name);
      const row = counts.get(id) ?? { id, name, seats: 0, source_url: mem.source_url || "" };
      row.seats += 1;
      counts.set(id, row);
    }
    writeJson(join(dir, "parties.json"), {
      iso2: iso,
      source_url: mem.source_url || "",
      items: [...counts.values()].sort((a, b) => b.seats - a.seats),
      incomplete: true,
    });
    partiesN++;
  }
  const votesN = (readJson(join(dir, "votes.json"), { items: [] }).items || []).length;
  const pledgesN = (readJson(join(dir, "pledges.json"), { items: [] }).items || []).length;
  const ethicsN = (readJson(join(dir, "ethics.json"), { items: [] }).items || []).length;
  const money = readJson(join(dir, "money.json"), {});
  const moneyN = (money.buckets || money.items || []).length;
  const commN = (readJson(join(dir, "committees.json"), { items: [] }).items || []).length;
  const lobbyN = (readJson(join(dir, "lobby.json"), { items: [] }).items || []).length;
  const filersN = (readJson(join(dir, "filers.json"), { items: [] }).items || []).length;
  const orgsN = (readJson(join(dir, "orgs.json"), { items: [] }).items || []).length;
  const holes = [];
  if (!(mem.items || []).length) holes.push({ id: "members", hole: "No sourced sitting names.", basis: "Evidence" });
  if (!votesN) holes.push({ id: "votes", hole: "No sourced roll-call file.", basis: "Evidence" });
  if (!pledgesN) holes.push({ id: "pledges", hole: "No sourced quote+URL pledges.", basis: "Evidence" });
  if (!ethicsN) holes.push({ id: "ethics", hole: "No sourced ethics filings.", basis: "Evidence" });
  if (!moneyN) holes.push({ id: "money", hole: "No sourced money file.", basis: "Evidence" });
  if (!commN) holes.push({ id: "committees", hole: "No sourced committee list.", basis: "Evidence" });
  if (!lobbyN) holes.push({ id: "lobby", hole: "No sourced lobby register.", basis: "Evidence" });
  if (!filersN) holes.push({ id: "filers", hole: "No sourced filer list.", basis: "Evidence" });
  if (!orgsN) holes.push({ id: "orgs", hole: "No sourced org list.", basis: "Evidence" });
  writeJson(join(dir, "gap.json"), {
    iso2: iso,
    items: holes,
    incomplete: holes.length > 0,
    retrieved: TODAY,
    note: `Category coverage ${TODAY}. Empty categories are holes, not zeros invented.`,
  });
  gapN++;
}
console.log(JSON.stringify({ kits: dirs.length, issues_written: issuesN, parties_written: partiesN, gaps_written: gapN }, null, 2));
