import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-16 comms shifts beside desk; Talk does not close desk", () => {
  const comms = readFileSync(join(ROOT, "src/components/intel/CommsChat.tsx"), "utf8");
  assert.match(comms, /data-beside-desk/);
  assert.match(comms, /md:right-\[calc\(22rem\+1rem\)\]/);
  const hud = readFileSync(join(ROOT, "src/components/intel/OverlayHud.tsx"), "utf8");
  const talk = hud.slice(hud.indexOf('aria-label="Talk to Grok"'), hud.indexOf('aria-label="Talk to Grok"') + 900);
  assert.doesNotMatch(talk, /setDesk\(null\)/);
  const insight = readFileSync(join(ROOT, "src/components/intel/InsightCard.tsx"), "utf8");
  assert.match(insight, /data-rail/);
  const css = readFileSync(join(ROOT, "src/styles.css"), "utf8");
  assert.match(css, /data-rail="both"/);
});
