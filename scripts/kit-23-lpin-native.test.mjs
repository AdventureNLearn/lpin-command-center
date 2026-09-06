import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-23 LPIN native Fifty/OpenCells/lanes, not outbound hosts as product", () => {
  const fifty = readFileSync(join(ROOT, "src/lib/lin/fifty.ts"), "utf8");
  assert.match(fifty, /FIFTY_JURIS/);
  assert.match(fifty, /FIFTY_PROCESS/);
  const proto = readFileSync(join(ROOT, "src/lib/lin/protocol.ts"), "utf8");
  assert.match(proto, /collisionsFromSources/);
  assert.match(proto, /SENSE_LANES/);
  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /FiftyBoard/);
  assert.match(drawer, /OpenCellsBoard/);
  assert.match(drawer, /LanesPanel/);
  assert.match(drawer, /How to use this/);
  const cmds = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(cmds, /run lanes|arm lanes/);
});
