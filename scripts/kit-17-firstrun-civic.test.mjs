import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-17 FirstRun has civic cards; one layer each", () => {
  const first = readFileSync(join(ROOT, "src/components/intel/FirstRun.tsx"), "utf8");
  assert.match(first, /Who sits where/);
  assert.match(first, /Find a building desk/);
  assert.match(first, /setLayer\("legislatures"/);
  assert.match(first, /setLayer\("permits"/);
  assert.match(first, /resetGlobe/);
  assert.doesNotMatch(first, /setLayer\("vessels"/);
  assert.doesNotMatch(first, /places-rest/);
  assert.doesNotMatch(first, /Featured cores/);
  assert.doesNotMatch(first, /East coast/);
  assert.doesNotMatch(first, /California/);
});

test("KIT-17 empty building desk lists states, not sample cities", () => {
  const lite = readFileSync(join(ROOT, "src/lib/permit/search-lite.ts"), "utf8");
  assert.match(lite, /if \(!q\) return \[\];/);
  assert.doesNotMatch(lite, /function featuredPlaces/);
  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /Type a state or place/);
  assert.match(drawer, /Nationwide catalog/);
  assert.doesNotMatch(drawer, /Featured core metros/);
  const subs = readFileSync(join(ROOT, "src/components/intel/LayerSubs.tsx"), "utf8");
  assert.match(subs, /By state/);
  assert.doesNotMatch(subs, /Featured cities/);
  const pins = readFileSync(join(ROOT, "src/lib/permit/permit-pins.ts"), "utf8");
  assert.match(pins, /Nationwide state packs/);
  assert.doesNotMatch(pins, /for \(const id of FEATURED_AHJ_IDS\)/);
});
