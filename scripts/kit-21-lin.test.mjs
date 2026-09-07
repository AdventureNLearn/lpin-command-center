import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-21 LIN: eight SME desks, labeled, 0 pins, no iframe hosts", () => {
  const net = readFileSync(join(ROOT, "src/lib/lin/network.ts"), "utf8");
  for (const id of [
    "legal",
    "regulatory",
    "technical",
    "jurisdictional",
    "operational",
    "engineering",
    "commerce",
    "governance",
  ]) {
    assert.match(net, new RegExp(`id: "${id}"`));
  }
  assert.match(net, /id: "fifty"/);
  assert.match(net, /id: "opencells"/);
  assert.match(net, /id: "workbook"/);
  assert.match(net, /role: "reference"/);
  assert.doesNotMatch(net, /iframe/i);
  assert.match(net, /Human final call/);

  const types = readFileSync(join(ROOT, "src/lib/intel/types.ts"), "utf8");
  assert.match(types, /\| "lin"/);

  const store = readFileSync(join(ROOT, "src/lib/intel/store.ts"), "utf8");
  assert.doesNotMatch(store, /lin: \{ on: true/);

  const commands = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(commands, /matchLinCommand/);

  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /LinBody/);
  assert.doesNotMatch(drawer, /fifty\.grok\.me\/["']/);
});

test("KIT-21 LIN: local product name, grok.me hosts stay reference", () => {
  const root = readFileSync(join(ROOT, "src/routes/__root.tsx"), "utf8");
  assert.match(root, /Lily Pad Intelligence Network/);
  const site = readFileSync(join(ROOT, "src/lib/og/site.json"), "utf8");
  assert.match(site, /Lily Pad Intelligence Network/);
});
