#!/usr/bin/env node
/** Fill atlas holes from Wikidata only. Never invent names. Skip kits already on disk. */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const ATLAS = join(ROOT, "vendor", "kept", "_out", "atlas.json");
const INDEX = join(ROOT, "vendor", "kept", "_out", "packages", "_index.json");
const OUT = join(ROOT, "vendor", "kept", "_out", "POPULATE-HOLES.json");
const UA = "LPIN-CommandCenter/0.1 (private corpus fill; AdventureNLearn; sourced Wikidata only)";
const TODAY = new Date().toISOString().slice(0, 10);
const SPARQL = "https://query.wikidata.org/sparql";
const CONCURRENCY = 2;

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

function qidFromUri(uri) {
  const m = String(uri || "").match(/\/(Q\d+)$/);
  return m ? m[1] : "";
}

async function sparql(query) {
  const url = `${SPARQL}?format=json&query=${encodeURIComponent(query)}`;
  let last = "SPARQL failed";
  for (let i = 0; i < 3; i++) {
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json", "User-Agent": UA },
    });
    if (res.ok) {
      const json = await res.json();
      return json.results?.bindings ?? [];
    }
    last = `SPARQL ${res.status}`;
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
      continue;
    }
    throw new Error(last);
  }
  throw new Error(last);
}

async function countryQid(iso2) {
  const rows = await sparql(
    `SELECT ?c WHERE { ?c wdt:P297 "${iso2.toUpperCase()}" } LIMIT 1`,
  );
  return qidFromUri(rows[0]?.c?.value);
}

async function legislature(countryId) {
  const rows = await sparql(
    `SELECT ?leg ?legLabel WHERE {
      wd:${countryId} wdt:P194 ?leg .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    } LIMIT 5`,
  );
  const first = rows[0];
  return {
    qid: qidFromUri(first?.leg?.value),
    label: first?.legLabel?.value || "",
  };
}

async function sittingMembers(legQid, countryId) {
  // Truthy P39 is the current rank. Full statements without P582 still include history.
  const primary = `SELECT DISTINCT ?person ?personLabel ?partyLabel ?districtLabel WHERE {
    ?person wdt:P39 ?pos .
    ?pos wdt:P361 wd:${legQid} .
    OPTIONAL { ?person p:P39 ?st . ?st ps:P39 ?pos . ?st pq:P4100 ?party }
    OPTIONAL { ?person p:P39 ?st2 . ?st2 ps:P39 ?pos . ?st2 pq:P768 ?district }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } LIMIT 800`;
  let rows = await sparql(primary);
  if (rows.length) return rows;
  const fallback = `SELECT DISTINCT ?person ?personLabel WHERE {
    ?person wdt:P39 ?pos .
    ?pos wdt:P17 wd:${countryId} .
    ?pos wdt:P279* wd:Q486839 .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } LIMIT 800`;
  return sparql(fallback);
}

function bindName(row) {
  const name = (row.personLabel?.value || "").trim();
  if (!name || /^Q\d+$/.test(name)) return null;
  const person = row.person?.value || "";
  const caucus = (row.partyLabel?.value || "").trim();
  const seat = (row.districtLabel?.value || "").trim();
  return {
    id: slug(name),
    name,
    sitting: true,
    party_id: caucus && !/^Q\d+$/.test(caucus) ? slug(caucus) : "unknown",
    caucus: caucus && !/^Q\d+$/.test(caucus) ? caucus : "",
    constituency_label: seat && !/^Q\d+$/.test(seat) ? seat : "",
    chamber: "",
    lang: ["en"],
    roster_url: person,
  };
}

function writeKit(iso2, name, chamber, members, sourceUrl, note) {
  const dir = join(KITS, iso2);
  mkdirSync(dir, { recursive: true });
  const unique = [];
  const seen = new Set();
  for (const m of members) {
    const key = m.id;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({ ...m, chamber: chamber || m.chamber });
  }
  writeJson(join(dir, "members.json"), {
    iso2,
    sitting: unique.length > 0,
    source_url: sourceUrl,
    retrieved: TODAY,
    incomplete: unique.length === 0,
    claimed_seats: unique.length,
    items: unique,
  });
  writeJson(join(dir, "meta.json"), {
    iso2,
    name,
    region: "",
    chamber: chamber || "Legislature",
    houses: "",
    system: "",
    seats: unique.length,
    election: "",
    session: "",
    kit: unique.length ? "map" : "map",
    lang: ["en"],
    threshold: 5,
    counts: {
      members: unique.length,
      sitting: unique.length,
      votes: 0,
      committees: 0,
      key_votes: 0,
      sourced_quotes: 0,
    },
    capabilities: ["members"],
    basis: "Evidence",
    incomplete: true,
    lane: "lpin-wikidata-fill",
    source_live: null,
    note,
    roster_source: sourceUrl,
  });
  writeJson(join(dir, "sources.json"), {
    iso2,
    items: sourceUrl
      ? [{ id: "wikidata", label: "Wikidata sitting members", url: sourceUrl }]
      : [],
  });
  writeJson(join(dir, "parties.json"), { iso2, items: [] });
}

async function fillOne(row) {
  const iso2 = row.iso2.toLowerCase();
  const name = row.name;
  try {
    const existing = JSON.parse(readFileSync(join(KITS, iso2, "meta.json"), "utf8"));
    if (existing.lane !== "lpin-wikidata-fill") {
      return { iso2, name, status: "skip-existing" };
    }
    const sitting = existing.counts?.sitting ?? 0;
    if (sitting > 0 && sitting <= 400) {
      return { iso2, name, status: "skip-ok", sitting };
    }
  } catch {
    /* hole */
  }
  try {
    const cq = await countryQid(iso2);
    if (!cq) {
      writeKit(iso2, name, "", [], "", "No Wikidata country for this ISO. Honest empty.");
      return { iso2, name, status: "stub-no-country", sitting: 0 };
    }
    const leg = await legislature(cq);
    const source = leg.qid
      ? `https://www.wikidata.org/wiki/${leg.qid}`
      : `https://www.wikidata.org/wiki/${cq}`;
    let rows = [];
    if (leg.qid) rows = await sittingMembers(leg.qid, cq);
    const members = rows.map(bindName).filter(Boolean);
    const note = members.length
      ? `Wikidata sitting pull ${TODAY}. ${members.length} named. Vacancies not invented.`
      : "Wikidata returned no sitting names. Honest empty. Not a complete roster.";
    writeKit(iso2, name, leg.label, members, source, note);
    return {
      iso2,
      name,
      status: members.length ? "filled" : "stub-empty",
      sitting: members.length,
      chamber: leg.label,
      source,
    };
  } catch (err) {
    writeKit(
      iso2,
      name,
      "",
      [],
      "",
      `Pull failed (${err instanceof Error ? err.message : "error"}). Honest empty.`,
    );
    return { iso2, name, status: "stub-error", sitting: 0, error: String(err) };
  }
}

async function pool(items, n, fn) {
  const out = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: n }, () => worker()));
  return out;
}

const atlas = JSON.parse(readFileSync(ATLAS, "utf8"));
const holes = atlas.filter((r) => {
  try {
    const m = JSON.parse(readFileSync(join(KITS, r.iso2.toLowerCase(), "meta.json"), "utf8"));
    if (m.lane !== "lpin-wikidata-fill") return false;
    const s = m.counts?.sitting ?? 0;
    return s === 0 || s > 400;
  } catch {
    return true;
  }
});
const results = await pool(holes, CONCURRENCY, fillOne);

const onDisk = new Set(
  readdirSync(KITS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "_template")
    .map((d) => d.name.toLowerCase()),
);
for (const row of atlas) {
  row.kit_on_disk = onDisk.has(row.iso2.toLowerCase());
}
writeJson(ATLAS, atlas);

const index = JSON.parse(readFileSync(INDEX, "utf8"));
const kitList = [...onDisk].sort();
index.kit_on_disk = kitList;
index.kit_on_disk_count = kitList.length;
index.remaining_count = atlas.filter((r) => !r.kit_on_disk).length;
index.populated_at = new Date().toISOString();
writeJson(INDEX, index);

const summary = {
  at: new Date().toISOString(),
  holes_in: holes.length,
  filled: results.filter((r) => r.status === "filled").length,
  stub_empty: results.filter((r) => r.status === "stub-empty").length,
  stub_error: results.filter((r) => r.status === "stub-error").length,
  skip_existing: results.filter((r) => r.status === "skip-existing").length,
  kit_on_disk_count: kitList.length,
  atlas_rows: atlas.length,
  sitting_total: results.reduce((n, r) => n + (r.sitting || 0), 0),
  results,
};
writeJson(OUT, summary);
console.log(
  JSON.stringify(
    {
      filled: summary.filled,
      stub_empty: summary.stub_empty,
      stub_error: summary.stub_error,
      kits: summary.kit_on_disk_count,
      sitting_total: summary.sitting_total,
    },
    null,
    2,
  ),
);
