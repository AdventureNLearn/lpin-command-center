import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-13 PeekCard is every kind, Look here / Follow / Open desk, no camera on mount", () => {
  const peek = readFileSync(join(ROOT, "src/components/intel/PeekCard.tsx"), "utf8");
  assert.doesNotMatch(peek, /kind !== "satellite"/);
  assert.match(peek, /Look here/);
  assert.match(peek, /Follow this/);
  assert.match(peek, /Open the file/);
  assert.match(peek, /No camera on mount/);
  assert.match(peek, /sticky/);
  assert.match(peek, /engine\.flyTo\(c\.lon, c\.lat/);
  assert.match(peek, /engine\.track\(c\.id\)/);
});

test("KIT-13 globe click peeks, does not track; hover any contact", () => {
  const engine = readFileSync(join(ROOT, "src/lib/intel/globeEngine.ts"), "utf8");
  assert.match(engine, /function pickContactId/);
  assert.doesNotMatch(engine, /function pickSatId/);
  assert.match(engine, /sticky: true/);
  const click = engine.slice(engine.indexOf("LEFT_CLICK") - 400, engine.indexOf("LEFT_CLICK") + 80);
  assert.doesNotMatch(click, /\btrack\(id\)/);
  assert.doesNotMatch(engine, /viewer\.flyTo\(ent/);
});

test("KIT-13 store Peek sticky; flat click peeks", () => {
  const store = readFileSync(join(ROOT, "src/lib/intel/store.ts"), "utf8");
  assert.match(store, /sticky\?: boolean/);
  const flat = readFileSync(join(ROOT, "src/lib/intel/flatEngine.ts"), "utf8");
  assert.match(flat, /peekMark\(hit/);
  assert.match(flat, /function peekMark/);
});
