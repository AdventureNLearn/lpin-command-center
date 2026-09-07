import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-26 workbook desk, lenses, no influence score", () => {
  const wb = readFileSync(join(ROOT, "src/lib/lin/workbook.ts"), "utf8");
  assert.match(wb, /lin:workbook/);
  assert.match(wb, /funding/);
  assert.match(wb, /political/);
  assert.match(wb, /corporate/);
  assert.match(wb, /permitting/);
  assert.match(wb, /trades/);
  assert.match(wb, /Never one score|not a score/i);
  const toolkit = readFileSync(join(ROOT, "src/lib/lin/toolkit.ts"), "utf8");
  assert.match(toolkit, /DIRT_TO_SHINGLES/);
  assert.match(toolkit, /FIELD_TO_BOARDROOM/);
  assert.match(toolkit, /COUNTRY_EXEMPLAR/);
  assert.match(toolkit, /iso2: "us"/);
  assert.match(toolkit, /complete: false/);
  assert.match(toolkit, /Primary record beats commentary/);
  const pack = readFileSync(join(ROOT, "docs/command-center/country-pack-template.json"), "utf8");
  assert.match(pack, /"exemplar_iso2": "us"/);
  const net = readFileSync(join(ROOT, "src/lib/lin/network.ts"), "utf8");
  assert.match(net, /id: "workbook"/);
  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /WorkbookBody/);
  const commands = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(commands, /parseWorkbookCommand/);
  const chat = readFileSync(join(ROOT, "src/lib/feeds/chat.ts"), "utf8");
  assert.match(chat, /Research workbook/);
  assert.match(chat, /Countries first/);
  assert.match(chat, /Never one influence score/);
  assert.doesNotMatch(chat, /iframe/i);
});
