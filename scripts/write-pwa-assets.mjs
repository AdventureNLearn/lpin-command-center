import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "__grok");

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function pngRGBA(w, h, paint) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    const row = y * (w * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < w; x++) {
      const [r, g, b, a] = paint(x, y, w, h);
      const o = row + 1 + x * 4;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
      raw[o + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function ring(x, y, cx, cy, r, t) {
  const d = Math.hypot(x - cx, y - cy);
  return Math.abs(d - r) <= t;
}

function iconPaint(x, y, w, h) {
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;
  const s = w / 32;
  if (ring(x, y, cx, cy, 9.25 * s, 1.4 * s)) return [126, 224, 168, 255];
  if (ring(x, y, cx, cy, 5 * s, 1.1 * s)) return [126, 224, 168, 255];
  if (Math.hypot(x - cx, y - cy) <= 2.4 * s) return [126, 224, 168, 255];
  if (Math.abs(x - cx) <= 1.1 * s && (y < 6 * s || y > h - 6 * s)) return [126, 224, 168, 255];
  if (Math.abs(y - cy) <= 1.1 * s && (x < 6 * s || x > w - 6 * s)) return [126, 224, 168, 255];
  return [7, 9, 12, 255];
}

function devicePaint(x, y, w, h) {
  const m = 18;
  const inFrame = x > m && x < w - m && y > m && y < h - m;
  if (!inFrame) return [7, 9, 12, 255];
  const cx = w / 2;
  const cy = h / 2;
  if (ring(x, y, cx, cy, Math.min(w, h) * 0.22, 3)) return [126, 224, 168, 200];
  return [14, 18, 24, 255];
}

mkdirSync(join(OUT, "install", "assets", "homescreen"), { recursive: true });
writeFileSync(join(OUT, "icon-180.png"), pngRGBA(180, 180, iconPaint));
writeFileSync(join(OUT, "install", "assets", "homescreen", "ob-phone.png"), pngRGBA(338, 294, devicePaint));
writeFileSync(join(OUT, "install", "assets", "homescreen", "ob-ipad.png"), pngRGBA(634, 294, devicePaint));
console.log("wrote PWA pngs");
