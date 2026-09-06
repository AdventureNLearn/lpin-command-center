import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("KIT-11 insind LayerId default off, 0 first-paint dump", () => {
  const types = readFileSync(join(ROOT, "src/lib/intel/types.ts"), "utf8");
  assert.match(types, /\| "insind"/);
  assert.match(types, /short: "INX"/);
  const store = readFileSync(join(ROOT, "src/lib/intel/store.ts"), "utf8");
  assert.match(store, /insind: \{ on: false/);
  const lookup = readFileSync(join(ROOT, "src/lib/insind/lookup.ts"), "utf8");
  assert.match(lookup, /rows: \[\]/);
  assert.doesNotMatch(lookup, /places-rest/);
  assert.doesNotMatch(lookup, /insind\.grok\.me/);
});
