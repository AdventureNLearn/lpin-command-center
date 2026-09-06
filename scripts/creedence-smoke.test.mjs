import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("creedence smoke writer and layer hooks exist", () => {
  const smoke = readFileSync(join(ROOT, "scripts/creedence-smoke.mjs"), "utf8");
  assert.match(smoke, /SMOKE\.md/);
  assert.match(smoke, /Who sits where/);
  assert.match(smoke, /data-beside-desk/);
  assert.match(smoke, /kind: "HOLE"/);
  assert.doesNotMatch(smoke, /KIT-18/);
  const hud = readFileSync(join(ROOT, "src/components/intel/OverlayHud.tsx"), "utf8");
  assert.match(hud, /data-layer=\{id\}/);
  assert.match(hud, /data-on=\{st\.on \? "true" : "false"\}/);
  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /data-desk=\{desk\.system\}/);
});
