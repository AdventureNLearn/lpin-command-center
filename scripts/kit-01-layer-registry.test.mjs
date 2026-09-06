import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-01 LayerId + Kind + LAYER_META LEG/AHJ delayed", () => {
  const types = readFileSync(join(ROOT, "src/lib/intel/types.ts"), "utf8");
  assert.match(types, /\| "legislatures"/);
  assert.match(types, /\| "permits"/);
  assert.match(types, /\| "legislature"/);
  assert.match(types, /\| "permit"/);
  assert.match(types, /short: "LEG"/);
  assert.match(types, /Kept harvest \/ public registers/);
  assert.match(types, /short: "AHJ"/);
  assert.match(types, /Permit Harbor catalog \(locked 2026-08-18\)/);
  assert.match(types, /legislatures: \{[\s\S]*?freshness: "delayed"/);
  assert.match(types, /permits: \{[\s\S]*?freshness: "delayed"/);
  assert.doesNotMatch(types, /places-rest/);
});

test("KIT-01 store defaults LEG/AHJ off", () => {
  const store = readFileSync(join(ROOT, "src/lib/intel/store.ts"), "utf8");
  assert.match(
    store,
    /legislatures: \{ on: false, count: 0, freshness: "off", detail: LAYER_META\.legislatures\.source \}/,
  );
  assert.match(
    store,
    /permits: \{ on: false, count: 0, freshness: "off", detail: LAYER_META\.permits\.source \}/,
  );
});

test("KIT-01 OverlayHud rail includes LEG/AHJ next to intel layers", () => {
  const hud = readFileSync(join(ROOT, "src/components/intel/OverlayHud.tsx"), "utf8");
  assert.match(hud, /"legislatures"/);
  assert.match(hud, /"permits"/);
  assert.match(hud, /LAYER_ORDER\.map/);
  assert.match(hud, /setLayer\(id,/);
});

test("KIT-01 commands emit layer on/off for show/hide legislatures and permits", () => {
  const cmd = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(cmd, /id: "legislatures"/);
  assert.match(cmd, /id: "permits"/);
  assert.match(cmd, /\{ type: "layer", id: "legislatures", on: layerOn \}/);
  assert.match(cmd, /\{ type: "layer", id: "permits", on: layerOn \}/);
  const run = readFileSync(join(ROOT, "src/lib/intel/runCommand.ts"), "utf8");
  assert.match(run, /case "layer":/);
  assert.match(run, /LAYER_META\[action\.id\]\.freshness/);
});
