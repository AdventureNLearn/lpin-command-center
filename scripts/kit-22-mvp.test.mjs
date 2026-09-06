import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-22 MVP research session: URL required, topic command, cells writable", () => {
  const session = readFileSync(join(ROOT, "src/lib/lin/session.ts"), "utf8");
  assert.match(session, /A quote without an official link is not proven/);
  assert.match(session, /parseResearchCommand/);
  assert.match(session, /lin:mvp-session/);

  const commands = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(commands, /parseResearchCommand/);
  assert.match(commands, /type: "research"/);

  const types = readFileSync(join(ROOT, "src/lib/intel/types.ts"), "utf8");
  assert.match(types, /type: "research"/);

  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /Add an official link/);
  assert.match(drawer, /useLin/);
  assert.match(drawer, /textarea/);
});
