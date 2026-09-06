import atlasJson from "../../../vendor/kept/_out/atlas.json";
import capitalsJson from "../../../vendor/kept/_out/capitals.json";
import type { Tracked } from "@/lib/intel/types";
import { matchPreset } from "@/lib/intel/locations";

type AtlasRow = { iso2: string; name: string; kit_on_disk?: boolean };
type CapitalPt = { iso2: string; name: string; lat: number; lon: number };
type CapitalsFile = { points?: CapitalPt[] };
type MetaFile = {
  iso2?: string;
  name?: string;
  chamber?: string;
  seats?: number;
  session?: string;
  counts?: { members?: number; sitting?: number };
  roster_source?: string;
};

const atlas = atlasJson as AtlasRow[];
const capitals = capitalsJson as CapitalsFile;

const metaGlob = import.meta.glob<MetaFile>("../../../vendor/kept/kits/*/meta.json", {
  eager: true,
  import: "default",
});

function metaFor(iso2: string): MetaFile | null {
  const needle = `/kits/${iso2}/meta.json`;
  for (const [path, mod] of Object.entries(metaGlob)) {
    if (path.replace(/\\/g, "/").endsWith(needle)) return mod;
  }
  return null;
}

export type KeptDesk = {
  iso2: string;
  name: string;
  capitalName: string;
  chamber: string;
  seats: number;
  named: number;
  lat: number;
  lon: number;
  sourceUrl?: string;
  session?: string;
};

export type AtlasHole = { iso2: string; name: string };

function capMap(): Map<string, CapitalPt> {
  const m = new Map<string, CapitalPt>();
  for (const p of capitals.points ?? []) {
    m.set(p.iso2.toLowerCase(), p);
  }
  return m;
}

let cachedDesks: KeptDesk[] | null = null;

export function keptDesks(): KeptDesk[] {
  if (cachedDesks) return cachedDesks;
  const caps = capMap();
  const out: KeptDesk[] = [];
  for (const row of atlas) {
    if (!row.kit_on_disk) continue;
    const iso2 = row.iso2.toLowerCase();
    const cap = caps.get(iso2);
    if (!cap) continue;
    const meta = metaFor(iso2);
    const named = meta?.counts?.members ?? meta?.counts?.sitting ?? 0;
    const filed = meta?.seats;
    const seats = typeof filed === "number" && filed > 0 ? filed : 0;
    const session = typeof meta?.session === "string" ? meta.session.trim() : "";
    out.push({
      iso2,
      name: meta?.name ?? row.name,
      capitalName: cap.name,
      chamber: meta?.chamber ?? "Legislature",
      seats,
      named,
      lat: cap.lat,
      lon: cap.lon,
      sourceUrl: meta?.roster_source,
      session: session || undefined,
    });
  }
  cachedDesks = out.slice(0, 33);
  return cachedDesks;
}

export function keptAtlasHoles(): AtlasHole[] {
  return atlas
    .filter((r) => !r.kit_on_disk)
    .map((r) => ({ iso2: r.iso2.toLowerCase(), name: r.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function keptDeskByIso(iso2: string): KeptDesk | null {
  const id = iso2.toLowerCase();
  return keptDesks().find((d) => d.iso2 === id) ?? null;
}

/** Everyday names → iso2 on disk. Not a new kit. Not DPRK. */
const EVERYDAY_ISO: Record<string, string> = {
  uk: "gb",
  britain: "gb",
  "great britain": "gb",
  usa: "us",
  america: "us",
  "united states": "us",
  "south korea": "kr",
  korea: "kr",
  turkey: "tr",
  turkiye: "tr",
  "türkiye": "tr",
};

export function matchKeptDesk(query: string): KeptDesk | null {
  const q = query.trim().toLowerCase().replace(/[?.!]+$/g, "").replace(/^the\s+/, "");
  if (q.length < 2) return null;
  const alias = EVERYDAY_ISO[q];
  if (alias) return keptDeskByIso(alias);
  const desks = keptDesks();
  // iso2 exact only when the query is exactly 2 letters. English "in"/"it" are not India/Italy.
  if (q.length === 2) {
    if (q === "in" || q === "it") return null;
    return desks.find((d) => d.iso2 === q) ?? null;
  }
  const preset = matchPreset(q);
  const exact = desks.find((d) => {
    if (d.name.toLowerCase() === q) return true;
    if (preset) return false;
    return d.capitalName.toLowerCase() === q;
  });
  if (exact) return exact;
  const named = desks.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      (q.length >= 4 && d.capitalName.toLowerCase().includes(q)),
  );
  return named.length === 1 ? named[0] : null;
}

/** Everyday empty vs serious as-filed. Never mint a chamber size from the roster. */
export function keptCountLine(desk: KeptDesk): string {
  if (desk.named === 0) return "no sourced roster";
  if (desk.seats <= 0) return `${desk.named} named`;
  return `${desk.named} of ${desk.seats} named`;
}

export function keptContact(desk: KeptDesk): Tracked {
  const hole = keptCountLine(desk);
  return {
    id: `leg-${desk.iso2}`,
    kind: "legislature",
    name: desk.name,
    meta: `${desk.chamber} · ${hole}`,
    lat: desk.lat,
    lon: desk.lon,
    altM: 0,
    heading: 0,
    speedMs: 0,
    vertMs: 0,
    country: desk.iso2.toUpperCase(),
    source: "Kept harvest / public registers",
    freshness: "delayed",
  };
}
