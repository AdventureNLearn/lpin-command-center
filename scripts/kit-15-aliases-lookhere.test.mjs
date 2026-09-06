import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-15 everyday aliases map to on-disk iso2", () => {
  const desks = readFileSync(join(ROOT, "src/lib/kept/desks.ts"), "utf8");
  assert.match(desks, /uk: "gb"/);
  assert.match(desks, /usa: "us"/);
  assert.match(desks, /"south korea": "kr"/);
  assert.match(desks, /turkey: "tr"/);
  assert.match(desks, /EVERYDAY_ISO\[q\]/);
  assert.match(desks, /keptDeskByIso\(alias\)/);
});

test("KIT-15 permit Look here uses featured coords; jobsite offers q", () => {
  const local = readFileSync(join(ROOT, "src/lib/intel/insight-local.ts"), "utf8");
  assert.match(local, /FEATURED_COORDS/);
  assert.match(local, /lat: pt\?\.lat/);
  assert.match(local, /q: place \|\| undefined/);
  assert.match(local, /Look here uses the typed place/);
});
