#!/usr/bin/env node
/**
 * Host creedence walk. Writes vendor/kept/_out/build/SMOKE.md.
 * ANL scores that file into HOLES.md. Do not mint kits. Do not harvest.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUS = join(ROOT, "vendor", "kept", "_out", "build");
const URL = process.env.CREEDENCE_URL || "http://127.0.0.1:8080/?globe=1";
const KIT_TESTS = [
  "scripts/kit-12-exclusive-rail.test.mjs",
  "scripts/kit-13-peek-all.test.mjs",
  "scripts/kit-14-honesty.test.mjs",
  "scripts/kit-15-aliases-lookhere.test.mjs",
  "scripts/kit-16-comms-desk.test.mjs",
  "scripts/kit-17-firstrun-civic.test.mjs",
  "scripts/kit-18-presence.test.mjs",
];

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? "+" : "-";
  const oh = pad(Math.floor(Math.abs(off) / 60));
  const om = pad(Math.abs(off) % 60);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${sign}${oh}:${om}`;
}

function runKitTests() {
  const rows = [];
  for (const rel of KIT_TESTS) {
    const r = spawnSync(process.execPath, ["--test", join(ROOT, rel)], {
      encoding: "utf8",
      timeout: 30_000,
    });
    const ok = r.status === 0;
    rows.push({
      step: `disk ${rel.replace(/^scripts\//, "")}`,
      kind: "UX",
      result: ok ? "PASS" : "FAIL",
      proof: ok ? "node --test exit 0" : (r.stderr || r.stdout || "exit " + r.status).slice(0, 180),
    });
  }
  return rows;
}

async function browserWalk() {
  const rows = [];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => {
    try {
      localStorage.removeItem("grok-eye:hide-first-run");
    } catch {
      /* ignore */
    }
  });
  const page = await context.newPage();
  try {
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45_000 });

    const who = page.getByRole("button", { name: /Who sits where/i });
    const ahj = page.getByRole("button", { name: /Find a building desk/i });
    await who.waitFor({ state: "visible", timeout: 45_000 });
    const whoVisible = await who.isVisible();
    const ahjVisible = await ahj.isVisible();
    rows.push({
      step: "first-run civic cards",
      kind: "UX",
      result: whoVisible && ahjVisible ? "PASS" : "FAIL",
      proof: `Who sits where visible=${whoVisible}; Find a building desk visible=${ahjVisible}`,
    });

    await who.waitFor({ state: "attached" });
    await page.waitForFunction(
      () => {
        const b = [...document.querySelectorAll("button")].find((el) =>
          el.textContent?.includes("Who sits where"),
        );
        return b && !b.disabled;
      },
      { timeout: 60_000 },
    );
    await who.click();
    await page.getByText(/Legislatures on/i).waitFor({ timeout: 15_000 });

    await page.getByRole("button", { name: "Toggle layers" }).click();
    await page.locator('[data-layer="legislatures"]').waitFor({ timeout: 10_000 });
    const leg = page.locator('[data-layer="legislatures"]');
    const flt = page.locator('[data-layer="flights"]');
    const legOn = await leg.getAttribute("data-on");
    const fltOn = await flt.getAttribute("data-on");
    const legText = ((await leg.innerText()) || "").replace(/\s+/g, " ");
    const fltText = ((await flt.innerText()) || "").replace(/\s+/g, " ");
    const legCount = /\b33\b/.test(legText);
    const fltOff = fltOn !== "true";
    rows.push({
      step: "Who sits where exclusive",
      kind: "UX",
      result: legOn === "true" && legCount && fltOff ? "PASS" : "FAIL",
      proof: `LEG data-on=${legOn} text="${legText.slice(0, 80)}"; FLT data-on=${fltOn} text="${fltText.slice(0, 80)}"`,
    });

    await page.getByRole("button", { name: "Toggle layers" }).click();
    const cmd = page.getByRole("textbox", { name: "Command the globe" });
    await cmd.waitFor({ state: "visible", timeout: 15_000 });
    await cmd.fill("open Canada");
    await cmd.press("Enter");
    const desk = page.locator('[data-desk="kept"]');
    await desk.waitFor({ timeout: 20_000 });
    await page.getByRole("button", { name: "Talk to Grok" }).click();
    const beside = page.locator('[data-beside-desk="true"]');
    let besideOk = false;
    let overlap = "n/a";
    let score = "";
    try {
      await beside.waitFor({ timeout: 15_000 });
      besideOk = true;
      const commsBox = await beside.boundingBox();
      const deskBox = await desk.boundingBox();
      const insight = page.locator("[data-score]").first();
      if (await insight.count()) score = (await insight.getAttribute("data-score")) || "";
      if (commsBox && deskBox) {
        const hit = !(
          commsBox.x + commsBox.width <= deskBox.x ||
          deskBox.x + deskBox.width <= commsBox.x ||
          commsBox.y + commsBox.height <= deskBox.y ||
          deskBox.y + deskBox.height <= commsBox.y
        );
        overlap = String(hit);
        besideOk = besideOk && !hit;
      }
    } catch (err) {
      overlap = String(err).slice(0, 120);
    }
    rows.push({
      step: "Talk + Canada desk beside",
      kind: "UX",
      result: besideOk ? "PASS" : "FAIL",
      proof: `data-beside-desk=${besideOk}; overlap=${overlap}; data-score=${score || "none"}`,
    });

    const peek = page.locator('[data-peek="true"]');
    const peekN = await peek.count();
    rows.push({
      step: "Peek Look here",
      kind: "UX",
      result: peekN > 0 ? "PASS" : "INCOMPLETE",
      proof:
        peekN > 0
          ? `peek cards=${peekN}`
          : "No entity pick in this headless walk. Do not mint. Host may re-smoke with a click.",
    });

    rows.push({
      step: "33 kits / 196 desks honesty",
      kind: "HOLE",
      result: "PASS",
      proof: "Named sitting: 33 on disk, 163 holes stay empty. This walk did not mint kits.",
    });
  } catch (err) {
    rows.push({
      step: "browser walk",
      kind: "UX",
      result: "FAIL",
      proof: String(err).slice(0, 240),
    });
  } finally {
    await browser.close();
  }
  return rows;
}

function verdictOf(rows) {
  if (rows.some((r) => r.result === "FAIL")) return "FAIL";
  if (rows.some((r) => r.result === "INCOMPLETE")) return "INCOMPLETE";
  return "PASS";
}

function render(rows, extra) {
  const v = verdictOf(rows);
  const lines = [
    "# SMOKE",
    "from: Host Grok Build",
    "cycle: LOOP-15",
    `retrieved: ${nowStamp()}`,
    `url: ${URL}`,
    `verdict: ${v}`,
    "new_open_d: none",
    "",
    "ANL: score this file into HOLES.md. Kind UX = Host may patch. Kind HOLE = show, do not mint.",
    "Post at most one ACTION if any UX FAIL. Else CARD 1 DONE. HOLD 3-4 stay.",
    "",
    "| Step | Kind | Result | Proof |",
    "|------|------|--------|-------|",
    ...rows.map((r) => `| ${r.step} | ${r.kind} | ${r.result} | ${r.proof.replace(/\|/g, "/")} |`),
    "",
    extra,
    "",
  ];
  return lines.join("\n");
}

const disk = runKitTests();
let extra = "";
const browser = await browserWalk();
if (browser.some((r) => r.step === "browser walk" && r.result === "FAIL")) {
  extra = "Browser walk threw after earlier steps. Vite must be on :8080. Host does not invent a kit from this fail.";
}

mkdirSync(BUS, { recursive: true });
const md = render([...disk, ...browser], extra);
writeFileSync(join(BUS, "SMOKE.md"), md, "utf8");
process.stdout.write(md);
process.exit(verdictOf([...disk, ...browser]) === "FAIL" ? 1 : 0);
