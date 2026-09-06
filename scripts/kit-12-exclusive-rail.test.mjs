import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-12 setLayer exclusive only when patch.on === true", () => {
  const store = readFileSync(join(ROOT, "src/lib/intel/store.ts"), "utf8");
  assert.match(store, /function withExclusiveOn/);
  assert.match(store, /patch\.on === true/);
  assert.match(store, /on: false, freshness: "off"/);
  assert.match(store, /!layers\.permits\.on && s\.permitRest/);
});

test("KIT-12 FirstRun enables one layer per card", () => {
  const first = readFileSync(join(ROOT, "src/components/intel/FirstRun.tsx"), "utf8");
  assert.match(first, /setLayer\("flights"/);
  assert.match(first, /setLayer\("satellites"/);
  assert.match(first, /setLayer\("earthquakes"/);
  assert.doesNotMatch(first, /setLayer\("vessels"/);
  assert.doesNotMatch(first, /setLayer\("launches"/);
  assert.doesNotMatch(first, /setLayer\("fires"/);
  assert.match(first, /See quakes/);
});

test("KIT-12 scenes and share keep a single layer", () => {
  const scenes = readFileSync(join(ROOT, "src/lib/intel/scenes.ts"), "utf8");
  assert.match(scenes, /setLayer\("fires"/);
  assert.doesNotMatch(scenes, /setLayer\("earthquakes"/);
  const share = readFileSync(join(ROOT, "src/lib/intel/share.ts"), "utf8");
  assert.match(share, /params\.set\("l", on\[0\]\)/);
  assert.match(share, /\.slice\(0, 1\)/);
  const engine = readFileSync(join(ROOT, "src/lib/intel/globeEngine.ts"), "utf8");
  assert.match(engine, /share\.layers\?\.\[0\]/);
});
