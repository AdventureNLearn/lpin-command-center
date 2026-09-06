#!/usr/bin/env node
/** Fill BG, DK, GR. Official/Wikipedia/Wikidata only. No invented names. */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const KITS = join(ROOT, "vendor", "kept", "kits");
const UA = "LPIN-CommandCenter/0.1 (https://github.com/AdventureNLearn/lpin-command-center; BG-DK-GR fill)";
const TODAY = new Date().toISOString().slice(0, 10);

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

function lab(row, key) {
  const v = (row[key]?.value || "").trim();
  if (!v || /^Q\d+$/.test(v)) return "";
  return v;
}

function partiesFrom(iso2, items, source) {
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

function writeDesk({ iso2, name, chamber, seats, web, source, items, note }) {
  const dir = join(KITS, iso2);
  const parties = partiesFrom(iso2, items, source);
  writeJson(join(dir, "members.json"), {
    iso2,
    sitting: items.length > 0,
    source_url: source,
    retrieved: TODAY,
    incomplete: items.length !== seats,
    claimed_seats: seats,
    chambers: [chamber],
    items,
  });
  writeJson(join(dir, "parties.json"), parties);
  writeJson(join(dir, "sources.json"), {
    iso2,
    items: [
      { id: "roster", label: chamber, url: source, kind: "primary", basis: "Evidence" },
      web && web !== source
        ? { id: "official", label: `${chamber} site`, url: web, kind: "primary", basis: "Evidence" }
        : null,
    ].filter(Boolean),
    incomplete: false,
  });
  writeJson(join(dir, "institutional.json"), {
    iso2,
    kit: "institutional",
    incomplete: true,
    retrieved: TODAY,
    houses: [],
    seats,
    items: [{ id: iso2, name: chamber, kind: "parliament", seats, url: web || source }],
    note: "Unicameral national legislature.",
  });
  writeJson(join(dir, "gap.json"), {
    iso2,
    items: [
      { id: "votes", hole: "No sourced roll-call file.", basis: "Evidence" },
      { id: "pledges", hole: "No sourced quote+URL pledges.", basis: "Evidence" },
      { id: "ethics", hole: "No sourced ethics filings.", basis: "Evidence" },
      { id: "money", hole: "No sourced money file.", basis: "Evidence" },
    ],
    incomplete: true,
    retrieved: TODAY,
    note: `Fill ${TODAY}. Sitting ${items.length} of ${seats}. Vacancies not invented.`,
  });
  writeJson(join(dir, "meta.json"), {
    iso2,
    name,
    region: "",
    chamber,
    houses: "unicameral",
    system: "",
    seats,
    election: "",
    session: "",
    kit: "map",
    lang: ["en"],
    threshold: 5,
    counts: {
      members: items.length,
      sitting: items.length,
      votes: 0,
      committees: 0,
      key_votes: 0,
      sourced_quotes: 0,
      pledged: 0,
    },
    capabilities: ["members", "pledges", "votes", "issues", "gap", "caucus", "committees", "ethics", "money", "method"],
    basis: "Evidence",
    incomplete: true,
    lane: "lpin-wikidata-fill",
    source_live: null,
    note: note || `Unicameral fill ${TODAY}. Sitting ${items.length} of ${seats}. Votes/pledges not invented.`,
    roster_source: source,
  });
  return { iso2, sitting: items.length, claimed: seats, parties: parties.items.length, source };
}

async function wikiText(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Wikipedia ${res.status}`);
  const json = await res.json();
  return json.parse?.wikitext?.["*"] || "";
}

function parseFolketing(wikitext) {
  const items = [];
  const seen = new Set();
  const rows = wikitext.split(/\n\|-\s*/);
  for (const row of rows) {
    const links = [...row.matchAll(/\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g)];
    const nameLink = links.find((l) => {
      const raw = `${l[1]} ${l[2] || ""}`;
      return !/constituency|folketing|denmark|file:|image:|list of|social democrats|venstre|moderates/i.test(raw);
    });
    if (!nameLink) continue;
    const name = (nameLink[1] || "").replace(/\s+\(.*\)$/, "").trim();
    if (!name) continue;
    const partyM = row.match(/\[\[([^\]|]+\(Denmark\))\|([^\]]+)\]\]/) || row.match(/\[\[([^\]|]+)\|([^\]]+)\]\]/);
    const caucus = partyM ? partyM[2].trim() : "";
    const seatM = [...row.matchAll(/\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g)].pop();
    const seat = seatM ? (seatM[2] || seatM[1]).replace(/\s*\(Folketing constituency\)/, "").trim() : "";
    const id = slug(name);
    if (seen.has(id)) continue;
    seen.add(id);
    items.push({
      id,
      name,
      sitting: true,
      party_id: caucus ? slug(caucus) : "unknown",
      caucus,
      constituency_label: seat,
      chamber: "Folketing",
      lang: ["da", "en"],
      roster_url: `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`,
    });
  }
  return items;
}

async function sparql(query) {
  const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`;
  let last = "SPARQL failed";
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json", "User-Agent": UA },
    });
    if (res.ok) return (await res.json()).results?.bindings ?? [];
    last = `SPARQL ${res.status}`;
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, (res.status === 429 ? 8000 : 2500) * (i + 1)));
      continue;
    }
    throw new Error(last);
  }
  throw new Error(last);
}

async function fillDenmark() {
  const source = "https://en.wikipedia.org/wiki/List_of_members_of_the_Folketing,_2026–present";
  const items = parseFolketing(await wikiText("List of members of the Folketing, 2026–present"));
  return writeDesk({
    iso2: "dk",
    name: "Denmark",
    chamber: "Folketing",
    seats: 179,
    web: "https://www.ft.dk/",
    source,
    items,
    note: `72nd Folketing Wikipedia list ${TODAY}. Sitting ${items.length} of 179. Votes/pledges not invented.`,
  });
}

async function fillBulgaria() {
  const source = "https://www.wikidata.org/wiki/Q18924508";
  const rows = await sparql(`SELECT DISTINCT ?person ?personLabel ?partyLabel WHERE {
    ?person p:P39 ?st .
    ?st ps:P39 wd:Q18924508 .
    FILTER NOT EXISTS { ?st pq:P582 ?end }
    ?st pq:P580 ?start .
    FILTER(?start >= "2026-04-01T00:00:00Z"^^xsd:dateTime)
    OPTIONAL { ?person wdt:P102 ?party }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en,bg". }
  } LIMIT 400`);
  const items = [];
  const seen = new Set();
  for (const row of rows) {
    const name = lab(row, "personLabel");
    if (!name) continue;
    const id = slug(name);
    if (seen.has(id)) continue;
    seen.add(id);
    const caucus = lab(row, "partyLabel");
    items.push({
      id,
      name,
      sitting: true,
      party_id: caucus ? slug(caucus) : "unknown",
      caucus,
      constituency_label: "",
      chamber: "National Assembly of Bulgaria",
      lang: ["bg", "en"],
      roster_url: row.person?.value || "",
    });
  }
  return writeDesk({
    iso2: "bg",
    name: "Bulgaria",
    chamber: "National Assembly of Bulgaria",
    seats: 240,
    web: "https://www.parliament.bg/",
    source,
    items,
    note: `52nd assembly Wikidata P39 start>=2026-04-01 ${TODAY}. Sitting ${items.length} of 240. Vacancies not invented.`,
  });
}

async function fillGreece() {
  const source = "https://www.wikidata.org/wiki/Q18915989";
  const rows = await sparql(`SELECT DISTINCT ?person ?personLabel ?partyLabel WHERE {
    ?person wdt:P39 wd:Q18915989 .
    OPTIONAL { ?person wdt:P102 ?party }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en,el". }
  } LIMIT 400`);
  const items = [];
  const seen = new Set();
  for (const row of rows) {
    const name = lab(row, "personLabel");
    if (!name) continue;
    const id = slug(name);
    if (seen.has(id)) continue;
    seen.add(id);
    const caucus = lab(row, "partyLabel");
    items.push({
      id,
      name,
      sitting: true,
      party_id: caucus ? slug(caucus) : "unknown",
      caucus,
      constituency_label: "",
      chamber: "Hellenic Parliament",
      lang: ["el", "en"],
      roster_url: row.person?.value || "",
    });
  }
  return writeDesk({
    iso2: "gr",
    name: "Greece",
    chamber: "Hellenic Parliament",
    seats: 300,
    web: "https://www.hellenicparliament.gr/",
    source,
    items,
    note: `Hellenic Parliament Wikidata P39 Q18915989 ${TODAY}. Sitting ${items.length} of 300. Vacancies not invented.`,
  });
}

const results = [];
results.push(await fillDenmark());
results.push(await fillBulgaria());
results.push(await fillGreece());
console.log(JSON.stringify({ at: new Date().toISOString(), results }, null, 2));
