import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-24 integration: topic-pass permit, claims kicker, arm lanes, show fifty", () => {
  const civic = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(civic, /search:\$\{topic\}/);
  assert.match(civic, /Claims/);
  const cmds = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(cmds, /show fifty/);
  assert.match(cmds, /arm lanes/);
  const lanes = readFileSync(join(ROOT, "src/components/lin/LanesPanel.tsx"), "utf8");
  assert.match(lanes, /armAll/);
  assert.match(lanes, /toggleArm/);
  const session = readFileSync(join(ROOT, "src/lib/lin/session.ts"), "utf8");
  assert.match(session, /armed:/);
  const run = readFileSync(join(ROOT, "src/lib/intel/runCommand.ts"), "utf8");
  assert.match(run, /search:\$\{topic\}/);
});
