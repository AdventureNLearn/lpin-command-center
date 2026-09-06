import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-14 honesty module seals score/basis and ignores model scores", () => {
  const hon = readFileSync(join(ROOT, "src/lib/intel/honesty.ts"), "utf8");
  assert.match(hon, /export function sealInsight/);
  assert.match(hon, /export function peekHonesty/);
  assert.match(hon, /as filed/);
  assert.match(hon, /portal not verified/);
  assert.match(hon, /honest hole/);
  assert.match(hon, /as feed, not navigation/);
  assert.match(hon, /Ignores any model-supplied score/);
  const insight = readFileSync(join(ROOT, "src/lib/intel/insight.ts"), "utf8");
  assert.match(insight, /score\?: -1 \| 0 \| 1/);
  assert.doesNotMatch(insight, /o\.score/);
});

test("KIT-14 store seals on setInsight; civic disk wins Grok tag", () => {
  const store = readFileSync(join(ROOT, "src/lib/intel/store.ts"), "utf8");
  assert.match(store, /sealInsight/);
  const comms = readFileSync(join(ROOT, "src/lib/intel/comms.ts"), "utf8");
  assert.match(comms, /const civic = local && local\.system !== "intel"/);
  assert.match(comms, /civic \? local : \(parsed\.insight/);
  assert.doesNotMatch(comms, /parsed\.insight \? null : cardForAsk/);
});

test("KIT-14 Peek and Insight show +1/0/−1; empty desk has no Open the file", () => {
  const peek = readFileSync(join(ROOT, "src/components/intel/PeekCard.tsx"), "utf8");
  assert.match(peek, /formatHonesty/);
  assert.match(peek, /data-score/);
  const card = readFileSync(join(ROOT, "src/components/intel/InsightCard.tsx"), "utf8");
  assert.match(card, /data-score/);
  assert.match(card, /insight\.desk\?\.id/);
});
