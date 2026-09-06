import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function read(rel) {
  return readFileSync(`${ROOT}/${rel}`, "utf8");
}

function parseStates(src) {
  const states = [];
  const re = /code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) states.push({ code: m[1], name: m[2] });
  return states;
}

function parseCorePlaces(src) {
  const places = [];
  const re =
    /id:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]+)",\s*kind:\s*"(city|county|district)",\s*state:\s*"([A-Z]{2})"/g;
  let m;
  while ((m = re.exec(src))) {
    places.push({ id: m[1], name: m[2], kind: m[3], state: m[4] });
  }
  return places;
}

function parseFactoryPlaces(src) {
  const places = [];
  const re =
    /p\(\s*"([a-z0-9-]+)",\s*"([^"]+)",\s*"(city|county|district)",\s*"([A-Z]{2})",\s*"([^"]+)",\s*"([^"]+)",\s*"(https:[^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    places.push({
      id: m[1],
      name: m[2],
      kind: m[3],
      state: m[4],
      ahj: m[5],
      portal: m[6],
      url: m[7],
    });
  }
  return places;
}

function parseCoreUrls(src) {
  const urls = [];
  const re = /(?:portalUrl|departmentUrl):\s*"(https:[^"]+)"/g;
  let m;
  while ((m = re.exec(src))) urls.push(m[1]);
  return urls;
}

const states = parseStates(read("src/lib/permit/states.ts"));
const core = parseCorePlaces(read("src/lib/permit/places-core.ts"));
const extra = parseFactoryPlaces(read("src/lib/permit/places-extra.ts"));
const more = parseFactoryPlaces(read("src/lib/permit/places-more.ts"));
const rest = parseFactoryPlaces(read("src/lib/permit/places-rest.ts"));
const places = [...core, ...extra, ...more, ...rest];

test("parses a complete catalog", () => {
  assert.equal(states.length, 56, `expected 50 states + DC + 5 territories, got ${states.length}`);
  assert.ok(core.length >= 70, `core places too small: ${core.length}`);
  assert.ok(extra.length >= 400, `extra places too small: ${extra.length}`);
  assert.ok(more.length >= 600, `more places too small: ${more.length}`);
  assert.ok(rest.length >= 10000, `rest places too small: ${rest.length}`);
  assert.ok(places.length >= 15000, `total places too small: ${places.length}`);
});

test("every state and territory has a unique 2-letter code", () => {
  const codes = states.map((s) => s.code);
  assert.equal(new Set(codes).size, codes.length);
  for (const required of ["AL", "WY", "DC", "PR", "GU", "VI", "AS", "MP"]) {
    assert.ok(codes.includes(required), `missing ${required}`);
  }
});

test("place ids are unique across core, extra, more, and rest", () => {
  const seen = new Map();
  const dups = [];
  for (const place of places) {
    if (seen.has(place.id)) dups.push(place.id);
    else seen.set(place.id, place);
  }
  assert.deepEqual(dups, [], `duplicate ids: ${dups.join(", ")}`);
});

test("place id prefix matches the state code", () => {
  const bad = places.filter((p) => !p.id.startsWith(`${p.state.toLowerCase()}-`));
  assert.deepEqual(
    bad.map((p) => `${p.id} (${p.state})`),
    [],
  );
});

test("every place belongs to a known state or territory", () => {
  const codes = new Set(states.map((s) => s.code));
  const orphans = places.filter((p) => !codes.has(p.state));
  assert.deepEqual(
    orphans.map((p) => `${p.id} → ${p.state}`),
    [],
  );
});

test("every state and territory has at least one named AHJ", () => {
  const byState = new Map(states.map((s) => [s.code, 0]));
  for (const place of places) {
    byState.set(place.state, (byState.get(place.state) ?? 0) + 1);
  }
  const empty = [...byState.entries()].filter(([, n]) => n < 1).map(([code]) => code);
  assert.deepEqual(empty, []);
});

test("no duplicate name + state + kind desks", () => {
  const seen = new Map();
  const dups = [];
  for (const place of places) {
    const key = `${place.state}|${place.kind}|${place.name.toLowerCase()}`;
    if (seen.has(key)) dups.push(`${place.id} / ${seen.get(key)} (${key})`);
    else seen.set(key, place.id);
  }
  assert.deepEqual(dups, []);
});

test("factory places use https official urls", () => {
  const bad = [...extra, ...more, ...rest].filter((p) => !/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}/i.test(p.url));
  assert.deepEqual(
    bad.map((p) => `${p.id} ${p.url}`),
    [],
  );
});

test("core place portals are https", () => {
  const urls = parseCoreUrls(read("src/lib/permit/places-core.ts"));
  assert.ok(urls.length >= core.length);
  const bad = urls.filter((url) => !url.startsWith("https://"));
  assert.deepEqual(bad, []);
});
