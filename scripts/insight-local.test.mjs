// insight-local.ts is TypeScript with Vite @/ aliases — do not import it here.
// askedToMove lives in insight.ts; Node 24 strips those types, no @/ paths.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { askedToMove } from "../src/lib/intel/insight.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INSIGHT_LOCAL = join(ROOT, "src/lib/intel/insight-local.ts");

test("insight-local.ts is TypeScript; this .mjs does not import it", () => {
  const src = readFileSync(INSIGHT_LOCAL, "utf8");
  assert.match(src, /from "@\/lib\/kept\/desks"/);
  assert.match(src, /from "@\/lib\/permit\/search-lite"/);
  assert.match(src, /from "@\/lib\/jobsite\/packs"/);
  assert.match(src, /from "\.\/insight"/);
  assert.match(src, /export function insightFromUserText/);
  assert.match(src, /if \(!text\.trim\(\) \|\| askedToMove\(text\)\) return null/);
  assert.match(src, /pickAhjCore/);
  assert.doesNotMatch(src, /searchAhj\b/);
  assert.match(src, /JOBSITE_HONESTY/);
  assert.match(src, /Look here/);
  assert.match(src, /who sits in/);
  assert.match(src, /q:\s*"ISS"/);
  assert.match(src, /No auto-track/);
});

test("askedToMove is false unless the human asked to fly", () => {
  assert.equal(askedToMove("what's over tokyo"), false);
  assert.equal(askedToMove("what's over Japan"), false);
  assert.equal(askedToMove("who sits in Canada"), false);
  assert.equal(askedToMove("look here"), false);
  assert.equal(askedToMove("show me tokyo"), false);
  assert.equal(askedToMove("going to paris"), false);
  assert.equal(askedToMove("open japan"), false);
  assert.equal(askedToMove(""), false);
});

test("askedToMove is true for spine fly-ask phrases", () => {
  assert.equal(askedToMove("take me to sydney"), true);
  assert.equal(askedToMove("fly to the iss"), true);
  assert.equal(askedToMove("go to paris"), true);
  assert.equal(askedToMove("go there"), true);
  assert.equal(askedToMove("jump to tokyo"), true);
  assert.equal(askedToMove("navigate to the iss"), true);
  assert.equal(askedToMove("show me on the globe"), true);
  assert.equal(askedToMove("move the globe"), true);
  assert.equal(askedToMove("move globe"), true);
  assert.equal(askedToMove("bring me to sydney"), true);
  assert.equal(askedToMove("bring us to sydney"), true);
});

test("useful-tool surfaces: honest counts, sourced sitting, dark fly-ask", () => {
  const drawer = readFileSync(join(ROOT, "src/components/desks/DeskDrawer.tsx"), "utf8");
  assert.match(drawer, /keptCountLine/);
  assert.match(drawer, /desk\.chamber\} in \{desk\.capitalName/);
  assert.match(drawer, /m\.caucus \|\| m\.seat/);
  assert.doesNotMatch(drawer, /\{desk\.named\} of \{desk\.seats\} named/);
  assert.match(drawer, /setOpen\(true\);\s*\n\s*\}/);
  const layers = readFileSync(join(ROOT, "src/components/intel/LayerSubs.tsx"), "utf8");
  assert.match(layers, /keptCountLine/);
  const comms = readFileSync(join(ROOT, "src/lib/intel/comms.ts"), "utf8");
  assert.match(comms, /function flyAskAction/);
  assert.match(comms, /parseCommand/);
  const roster = readFileSync(join(ROOT, "src/lib/kept/roster.ts"), "utf8");
  assert.match(roster, /constituency_label/);
  assert.match(roster, /We do not have sitting names yet/);
});

test("D-282 who sits in any kit; shrug has no municipality sample", () => {
  const commands = readFileSync(join(ROOT, "src/lib/intel/commands.ts"), "utf8");
  assert.match(commands, /who sits(?: in)?/);
  const run = readFileSync(join(ROOT, "src/lib/intel/runCommand.ts"), "utf8");
  assert.match(run, /Name a country, a state, or a layer/);
  assert.doesNotMatch(run, /Try Tokyo/);
  const chat = readFileSync(join(ROOT, "src/lib/feeds/chat.ts"), "utf8");
  assert.match(chat, /196 legislature kits/);
  assert.doesNotMatch(chat, /33-kit country/);
});
