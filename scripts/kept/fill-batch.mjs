#!/usr/bin/env node
/**
 * Complete one ISO kit: every chamber, every object file.
 * Wikidata only. Never invent votes, pledges, ethics, or money.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const TPL = join(KITS, "_template");
const REPORT = join(ROOT, "docs", "command-center", "_out", "kit-fill");
const UA = "LPIN-CommandCenter/0.1 (full-ISO corpus fill; AdventureNLearn; Wikidata only)";
const TODAY = new Date().toISOString().slice(0, 10);
const SPARQL = "https://query.wikidata.org/sparql";
const OBJECTS = [
  "committees.json",
  "ethics.json",
  "filers.json",
  "gap.json",
  "institutional.json",
  "issues.json",
  "lobby.json",
  "members.json",
  "money.json",
  "orgs.json",
  "parties.json",
  "pledges.json",
  "sources.json",
  "votes.json",
];

const isos = process.argv.slice(2).map((s) => s.toLowerCase()).filter(Boolean);
if (!isos.length) {
  console.error("usage: node scripts/kept/fill-batch.mjs iso iso ...");
  process.exit(1);
}

function slug(s) {
  return (
    String(s || "")
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "unknown"
  );
}

function writeJson(p, v) {
  mkdirSync(join(p, ".."), { recursive: true });
  writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
}

function readJson(p, fallback) {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function qidFromUri(uri) {
  const m = String(uri || "").match(/\/(Q\d+)$/);
  return m ? m[1] : "";
}

function lab(row, key) {
  const v = (row[key]?.value || "").trim();
  if (!v || /^Q\d+$/.test(v)) return "";
  return v;
}

async function sparql(query) {
  const url = `${SPARQL}?format=json&query=${encodeURIComponent(query)}`;
  let last = "SPARQL failed";
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json", "User-Agent": UA },
    });
    if (res.ok) {
      const json = await res.json();
      return json.results?.bindings ?? [];
    }
    last = `SPARQL ${res.status}`;
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
      continue;
    }
    throw new Error(last);
  }
  throw new Error(last);
}

async function countryQid(iso2) {
  const rows = await sparql(`SELECT ?c WHERE { ?c wdt:P297 "${iso2.toUpperCase()}" } LIMIT 1`);
  return qidFromUri(rows[0]?.c?.value);
}

async function bodies(countryId) {
  const rows = await sparql(`SELECT DISTINCT ?body ?bodyLabel ?seats ?web ?kind WHERE {
    {
      wd:${countryId} wdt:P194 ?body .
      BIND("parliament" AS ?kind)
    } UNION {
      wd:${countryId} wdt:P194 ?parl .
      ?parl wdt:P527 ?body .
      BIND("chamber" AS ?kind)
    } UNION {
      ?body wdt:P31/wdt:P279* wd:Q37516 .
      ?body wdt:P1001 wd:${countryId} .
      BIND("upper" AS ?kind)
    } UNION {
      ?body wdt:P31/wdt:P279* wd:Q637846 .
      ?body wdt:P1001 wd:${countryId} .
      BIND("lower" AS ?kind)
    }
    OPTIONAL { ?body wdt:P1342 ?seats }
    OPTIONAL { ?body wdt:P856 ?web }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } LIMIT 20`);
  const out = [];
  const seen = new Set();
  for (const row of rows) {
    const qid = qidFromUri(row.body?.value);
    if (!qid || seen.has(qid)) continue;
    seen.add(qid);
    out.push({
      qid,
      label: lab(row, "bodyLabel") || qid,
      seats: row.seats?.value ? Number(row.seats.value) : 0,
      web: row.web?.value || "",
      kind: row.kind?.value || "body",
    });
  }
  return out;
}

async function sittingMembers(body) {
  const rows = await sparql(`SELECT DISTINCT ?person ?personLabel ?partyLabel ?districtLabel WHERE {
    ?person wdt:P39 ?pos .
    ?pos wdt:P361 wd:${body.qid} .
    OPTIONAL { ?person wdt:P102 ?party }
    OPTIONAL { ?person p:P39 ?st . ?st ps:P39 ?pos . ?st pq:P768 ?district }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } LIMIT 800`);
  const out = [];
  const seen = new Set();
  for (const row of rows) {
    const name = lab(row, "personLabel");
    if (!name) continue;
    const id = slug(`${name}-${body.qid}`);
    if (seen.has(id)) continue;
    seen.add(id);
    const caucus = lab(row, "partyLabel");
    const seat = lab(row, "districtLabel");
    out.push({
      id,
      name,
      sitting: true,
      party_id: caucus ? slug(caucus) : "unknown",
      caucus,
      constituency_label: seat,
      chamber: body.label,
      lang: ["en"],
      roster_url: row.person?.value || "",
    });
  }
  return out;
}

async function committeesFor(body) {
  const rows = await sparql(`SELECT DISTINCT ?c ?cLabel WHERE {
    { ?c wdt:P361 wd:${body.qid} } UNION { wd:${body.qid} wdt:P527 ?c }
    ?c wdt:P31/wdt:P279* wd:Q2987826 .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } LIMIT 80`);
  const out = [];
  const seen = new Set();
  for (const row of rows) {
    const name = lab(row, "cLabel");
    if (!name) continue;
    const id = slug(name);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ id, name, chamber: body.label, url: row.c?.value || "" });
  }
  return out;
}

function ensureObjects(iso2, dir) {
  for (const file of OBJECTS) {
    const dest = join(dir, file);
    if (existsSync(dest)) continue;
    const tpl = join(TPL, file);
    if (existsSync(tpl)) copyFileSync(tpl, dest);
    else writeJson(dest, { iso2, items: [], incomplete: true });
    const obj = readJson(dest, { iso2, items: [] });
    obj.iso2 = iso2;
    writeJson(dest, obj);
  }
}

function partiesFromMembers(iso2, items, source) {
  const counts = new Map();
  for (const it of items) {
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

function harvestProtected(dir) {
  const votes = readJson(join(dir, "votes.json"), { items: [] });
  const members = readJson(join(dir, "members.json"), { items: [], source_url: "" });
  const nVotes = (votes.items || []).length;
  const url = String(members.source_url || "");
  const nMem = (members.items || []).length;
  if (nVotes >= 10) return true;
  if (nMem >= 20 && url && !/wikidata\.org/i.test(url)) return true;
  return false;
}

function emptyNote(iso2, field) {
  return {
    iso2,
    items: [],
    incomplete: true,
    retrieved: TODAY,
    note: `No sourced ${field} for this ISO. Not invented.`,
  };
}

async function fillOne(iso2) {
  const dir = join(KITS, iso2);
  mkdirSync(dir, { recursive: true });
  ensureObjects(iso2, dir);
  const atlas = readJson(join(ROOT, "vendor", "kept", "_out", "atlas.json"), []);
  const atlasRow = atlas.find((r) => r.iso2.toLowerCase() === iso2);
  const meta = readJson(join(dir, "meta.json"), { iso2, counts: {} });
  meta.iso2 = iso2;
  meta.name = meta.name && meta.name !== iso2 ? meta.name : atlasRow?.name || iso2;
  const protect = harvestProtected(dir);
  const report = {
    iso2,
    protect,
    chambers: 0,
    members: 0,
    parties: 0,
    committees: 0,
    sources: 0,
    status: "ok",
  };
  try {
    const cq = await countryQid(iso2);
    const houseList = cq ? await bodies(cq) : [];
    report.chambers = houseList.length;
    const primary = houseList.find((b) => b.kind === "parliament") || houseList[0];
    const source = primary
      ? `https://www.wikidata.org/wiki/${primary.qid}`
      : cq
        ? `https://www.wikidata.org/wiki/${cq}`
        : "";

    let members = [];
    if (!protect) {
      const seenName = new Set();
      for (const body of houseList) {
        const chunk = await sittingMembers(body);
        for (const m of chunk) {
          const key = `${m.name}|${m.chamber}`;
          if (seenName.has(key)) continue;
          seenName.add(key);
          members.push(m);
        }
      }
      writeJson(join(dir, "members.json"), {
        iso2,
        sitting: members.length > 0,
        source_url: source,
        retrieved: TODAY,
        incomplete: true,
        claimed_seats: houseList.reduce((n, b) => n + (b.seats || 0), 0) || members.length,
        chambers: houseList.map((b) => b.label),
        items: members,
      });
    }
    const memFile = readJson(join(dir, "members.json"), { items: [] });
    report.members = (memFile.items || []).length;

    const partyFile = partiesFromMembers(iso2, memFile.items || [], memFile.source_url || source);
    if (!protect || (readJson(join(dir, "parties.json"), { items: [] }).items || []).length === 0) {
      writeJson(join(dir, "parties.json"), partyFile);
    }
    report.parties = (readJson(join(dir, "parties.json"), { items: [] }).items || []).length;

    let comm = [];
    for (const body of houseList) comm = comm.concat(await committeesFor(body));
    const seenC = new Set();
    comm = comm.filter((c) => {
      if (seenC.has(c.id)) return false;
      seenC.add(c.id);
      return true;
    });
    const existingC = readJson(join(dir, "committees.json"), { items: [] });
    if (comm.length >= (existingC.items || []).length) {
      writeJson(join(dir, "committees.json"), {
        iso2,
        source_url: source,
        retrieved: TODAY,
        incomplete: true,
        items: comm,
      });
    }
    report.committees = (readJson(join(dir, "committees.json"), { items: [] }).items || []).length;

    const sourceItems = [];
    if (source) sourceItems.push({ id: "wikidata", label: "Wikidata legislature", url: source, kind: "primary", basis: "Evidence" });
    for (const b of houseList) {
      if (b.web) {
        sourceItems.push({
          id: slug(`official-${b.qid}`),
          label: b.label,
          url: b.web,
          kind: "primary",
          basis: "Evidence",
        });
      }
      sourceItems.push({
        id: slug(`wd-${b.qid}`),
        label: `${b.label} (Wikidata)`,
        url: `https://www.wikidata.org/wiki/${b.qid}`,
        kind: "index",
        basis: "Evidence",
      });
    }
    writeJson(join(dir, "sources.json"), { iso2, items: sourceItems, incomplete: false });
    report.sources = sourceItems.length;

    const chamberNames = houseList.map((b) => b.label).filter(Boolean);
    const houses = houseList.filter((b) => b.kind === "chamber" || b.kind === "upper" || b.kind === "lower");
    writeJson(join(dir, "institutional.json"), {
      iso2,
      kit: "institutional",
      incomplete: true,
      retrieved: TODAY,
      country_qid: cq ? `https://www.wikidata.org/wiki/${cq}` : "",
      bodies: houseList,
      houses: houses.map((b) => b.label),
      seats: houseList.reduce((n, b) => n + (b.seats || 0), 0),
      items: houseList.map((b) => ({
        id: b.qid,
        name: b.label,
        kind: b.kind,
        seats: b.seats,
        url: b.web || `https://www.wikidata.org/wiki/${b.qid}`,
      })),
      note: "Legislature structure from Wikidata P194/P527/houses. Not a score.",
    });

    const sitting = report.members;
    const votesN = (readJson(join(dir, "votes.json"), { items: [] }).items || []).length;
    const pledgesN = (readJson(join(dir, "pledges.json"), { items: [] }).items || []).length;
    const ethicsN = (readJson(join(dir, "ethics.json"), { items: [] }).items || []).length;
    const moneyN = (readJson(join(dir, "money.json"), { items: [] }).items || []).length;
    const gapItems = [];
    if (sitting === 0) gapItems.push({ id: "members", hole: "No sourced sitting names.", basis: "Evidence" });
    if (votesN === 0) gapItems.push({ id: "votes", hole: "No sourced roll-call file.", basis: "Evidence" });
    if (pledgesN === 0) gapItems.push({ id: "pledges", hole: "No sourced quote+URL pledges.", basis: "Evidence" });
    if (ethicsN === 0) gapItems.push({ id: "ethics", hole: "No sourced ethics filings.", basis: "Evidence" });
    if (moneyN === 0) gapItems.push({ id: "money", hole: "No sourced money file.", basis: "Evidence" });
    if (report.committees === 0) gapItems.push({ id: "committees", hole: "No sourced committee list.", basis: "Evidence" });
    writeJson(join(dir, "gap.json"), {
      iso2,
      items: gapItems,
      incomplete: gapItems.length > 0,
      retrieved: TODAY,
      note: `Full-ISO fill ${TODAY}. Chambers: ${chamberNames.join(" · ") || "none"}. Sitting ${sitting}. Empty objects not invented.`,
    });

    for (const field of ["ethics", "money", "lobby", "filers", "orgs", "issues", "pledges"]) {
      const p = join(dir, `${field}.json`);
      const cur = readJson(p, { items: [] });
      if ((cur.items || []).length) continue;
      writeJson(p, emptyNote(iso2, field));
    }
    if (!protect && votesN === 0) writeJson(join(dir, "votes.json"), emptyNote(iso2, "votes"));

    meta.chamber = primary?.label || meta.chamber || "Legislature";
    meta.houses = houses.length >= 2 ? "bicameral" : houses.length === 1 || houseList.length === 1 ? "unicameral" : meta.houses || "";
    meta.seats = houseList.reduce((n, b) => n + (b.seats || 0), 0) || meta.seats || sitting;
    meta.lang = meta.lang?.length ? meta.lang : ["en"];
    meta.threshold = meta.threshold || 5;
    meta.kit = meta.kit || "map";
    meta.basis = "Evidence";
    meta.incomplete = true;
    meta.roster_source = source || meta.roster_source;
    meta.counts = {
      ...(meta.counts ?? {}),
      members: sitting,
      sitting,
      committees: report.committees,
      votes: votesN,
      pledged: pledgesN,
    };
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
    meta.note = protect
      ? meta.note
      : `Full-ISO Wikidata fill ${TODAY}. ${chamberNames.length} bodies. Sitting ${sitting}. Votes/pledges/ethics/money not invented.`;
    writeJson(join(dir, "meta.json"), meta);
  } catch (err) {
    report.status = "error";
    report.error = err instanceof Error ? err.message : String(err);
  }
  writeJson(join(REPORT, `${iso2}.json`), report);
  return report;
}

mkdirSync(REPORT, { recursive: true });
const results = [];
for (const iso of isos) {
  results.push(await fillOne(iso));
}
const summary = {
  at: new Date().toISOString(),
  n: results.length,
  ok: results.filter((r) => r.status === "ok").length,
  protected: results.filter((r) => r.protect).length,
  error: results.filter((r) => r.status === "error").length,
  members: results.reduce((n, r) => n + (r.members || 0), 0),
  chambers: results.reduce((n, r) => n + (r.chambers || 0), 0),
  results,
};
writeJson(join(REPORT, `_batch-${isos[0]}-${isos.length}.json`), summary);
console.log(JSON.stringify(summary, null, 2));
