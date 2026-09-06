import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = join(root, "vendor", "kept", "_out");
const atlas = JSON.parse(readFileSync(join(out, "atlas.json"), "utf8"));
const capitals = JSON.parse(readFileSync(join(out, "capitals.json"), "utf8"));
const permit = JSON.parse(readFileSync(join(out, "permit-index.json"), "utf8"));
const index = JSON.parse(readFileSync(join(out, "packages", "_index.json"), "utf8"));
const five = JSON.parse(readFileSync(join(out, "501-links.json"), "utf8"));
const types = readFileSync(join(root, "src", "lib", "intel", "types.ts"), "utf8");
const hud = readFileSync(join(root, "src", "components", "intel", "OverlayHud.tsx"), "utf8");

const fail = [];
if (atlas.length !== 196) fail.push(`atlas ${atlas.length} != 196`);
if (index.kit_on_disk_count !== 33) fail.push(`kits ${index.kit_on_disk_count} != 33`);
if (capitals.count !== 194) fail.push(`capitals ${capitals.count} != 194`);
const c = permit.counts;
if (c.core !== 79 || c.extra !== 462 || c.more !== 699 || c.rest !== 14925) {
  fail.push(`permit counts ${JSON.stringify(c)}`);
}
if (five.nodes.length !== 199 || five.edges.length !== 215 || five.holes.length !== 17) {
  fail.push(`501 ${five.nodes.length}/${five.edges.length}/${five.holes.length}`);
}
if (!types.includes('"legislatures"') || !types.includes('"permits"')) fail.push("LayerId missing LEG/AHJ");
if (!hud.includes("CorpusPanel")) fail.push("HUD missing CorpusPanel");
if (hud.includes("places-rest")) fail.push("HUD imported places-rest");

if (fail.length) {
  console.error("FAIL\n" + fail.join("\n"));
  process.exit(1);
}
console.log("PASS 33/196 kits · 194 capitals · 79/462/699/14925 permits · 199/215/17 filings · LEG/AHJ+corpus in HUD");
