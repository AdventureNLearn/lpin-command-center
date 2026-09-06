import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-18 presence module is the world bar, not a Shadertoy engine", () => {
  const src = readFileSync(join(ROOT, "src/lib/intel/presence.ts"), "utf8");
  assert.match(src, /export const PRESENCE_KIT = "KIT-18"/);
  assert.match(src, /export function applyPresenceAtmosphere/);
  assert.match(src, /civic_in_world/);
  assert.match(src, /honest_empty/);
  assert.match(src, /iframe shadertoy/);
  assert.match(src, /second engine/);
  assert.doesNotMatch(src, /iframe src=.*shadertoy/i);
});

test("KIT-18 globe applies presence atmosphere; shell is the world", () => {
  const globe = readFileSync(join(ROOT, "src/lib/intel/globeEngine.ts"), "utf8");
  assert.match(globe, /applyPresenceAtmosphere/);
  assert.match(globe, /data-presence/);
  const app = readFileSync(join(ROOT, "src/components/intel/IntelApp.tsx"), "utf8");
  assert.match(app, /data-presence="world"/);
  const canvas = readFileSync(join(ROOT, "src/components/intel/GlobeCanvas.tsx"), "utf8");
  assert.match(canvas, /data-presence-surface="globe"/);
});

test("KIT-18 surfaces tag peek, insight, desk, firstrun, comms", () => {
  const peek = readFileSync(join(ROOT, "src/components/intel/PeekCard.tsx"), "utf8");
  assert.match(peek, /data-presence-surface="peek"/);
  const insight = readFileSync(join(ROOT, "src/components/intel/InsightCard.tsx"), "utf8");
  assert.match(insight, /data-presence-surface="insight"/);
  const desk = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(desk, /data-presence-surface="desk"/);
  const first = readFileSync(join(ROOT, "src/components/intel/FirstRun.tsx"), "utf8");
  assert.match(first, /data-presence-surface="firstrun"/);
  const comms = readFileSync(join(ROOT, "src/components/intel/CommsChat.tsx"), "utf8");
  assert.match(comms, /data-presence-surface="comms"/);
});

test("KIT-18 bus contract exists and ANL owns the score file", () => {
  const json = JSON.parse(
    readFileSync(join(ROOT, "vendor/kept/_out/build/presence-contract.json"), "utf8"),
  );
  assert.equal(json.kit, "KIT-18");
  assert.equal(json.engine, "cesium");
  assert.equal(json.anl_writes, "PRESENCE-SCORE.md");
  assert.ok(json.not.includes("iframe shadertoy"));
  assert.equal(json.surfaces.length, 6);
  const md = readFileSync(join(ROOT, "vendor/kept/_out/build/PRESENCE-CONTRACT.md"), "utf8");
  assert.match(md, /PRESENCE-SCORE\.md/);
  assert.match(md, /Host writes this file/);
});
