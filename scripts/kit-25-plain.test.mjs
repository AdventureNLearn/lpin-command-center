import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-25 Lily Pad / GOYNET plain how-to, no swarm chrome on HUD", () => {
  const plain = readFileSync(join(ROOT, "src/lib/lin/plain.ts"), "utf8");
  assert.match(plain, /Lily Pad Intelligence Network/);
  assert.match(plain, /Governance, Operations and Yields/);
  const methods = readFileSync(join(ROOT, "src/lib/lin/methods.ts"), "utf8");
  assert.match(methods, /You decide/);
  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /MethodCard/);
  assert.match(drawer, /How to use this/);
  assert.doesNotMatch(drawer, /SME desks/);
  const install = readFileSync(join(ROOT, "src/components/intel/InstallCard.tsx"), "utf8");
  assert.match(install, /Instruction guide/);
  assert.match(install, /CREDIT/);
  const credit = readFileSync(join(ROOT, "src/lib/lin/plain.ts"), "utf8");
  assert.match(credit, /AOS Hive-Brain/);
  assert.match(credit, /GOYNET/);
});
