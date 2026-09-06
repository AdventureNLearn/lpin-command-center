import atlasJson from "../../../vendor/kept/_out/atlas.json";
import capitalsJson from "../../../vendor/kept/_out/capitals.json";
import permitIndexJson from "../../../vendor/kept/_out/permit-index.json";
import packageIndexJson from "../../../vendor/kept/_out/packages/_index.json";

type AtlasRow = { iso2: string; name: string; kit_on_disk?: boolean };
type CapitalsFile = { count?: number; points?: unknown[] };
type PermitIndexFile = {
  lock_date?: string;
  counts?: { core?: number; extra?: number; more?: number; rest?: number };
  honesty?: { rest_is_count_not_map?: boolean; factory_urls_verified?: boolean };
};
type PackageIndexFile = {
  wave?: string;
  kit_on_disk_count?: number;
  remaining_count?: number;
  extras?: { iso2?: string }[];
  rows?: { holes?: number }[];
};
type Five01File = {
  nodes?: unknown[];
  edges?: { rel?: string }[];
  holes?: { what?: string }[];
};

export type CorpusSummary = {
  kitsOnDisk: number;
  atlasRows: number;
  capitals: number;
  permit: { core: number; extra: number; more: number; rest: number; lockDate: string };
  packageHoles: number;
  remaining: number;
  fillIsos: string[];
  missingFillNote: string;
  wave: string;
  holes: string[];
  error?: string;
};

export type Five01Summary = {
  nodes: number;
  edges: number;
  fec: number;
  usaspending: number;
  holes: number;
  holeWhat: string[];
};

const atlas = atlasJson as AtlasRow[];
const capitals = capitalsJson as CapitalsFile;
const permitIndex = permitIndexJson as PermitIndexFile;
const packageIndex = packageIndexJson as PackageIndexFile;

export function loadCorpusSummary(): CorpusSummary {
  try {
    const atlasRows = Array.isArray(atlas) ? atlas.length : 0;
    const kitsOnDisk =
      typeof packageIndex.kit_on_disk_count === "number"
        ? packageIndex.kit_on_disk_count
        : atlas.filter((r) => r.kit_on_disk).length;
    const capCount =
      typeof capitals.count === "number"
        ? capitals.count
        : Array.isArray(capitals.points)
          ? capitals.points.length
          : 0;
    const core = permitIndex.counts?.core ?? 0;
    const extra = permitIndex.counts?.extra ?? 0;
    const more = permitIndex.counts?.more ?? 0;
    const rest = permitIndex.counts?.rest ?? 0;
    const fillIsos = (packageIndex.extras ?? [])
      .map((e) => (e.iso2 ?? "").toLowerCase())
      .filter(Boolean)
      .sort();
    const packageHoles = (packageIndex.rows ?? []).reduce((n, r) => n + (r.holes ?? 0), 0);
    const holes: string[] = [
      `${atlasRows - kitsOnDisk} atlas rows have no kit on disk`,
      `${capCount} capital points vs ${atlasRows} atlas rows (unsourced omitted)`,
      `Rest ${rest} is a count, not a map`,
      "Factory portal URLs are not verified; fees omitted",
      "Country kits are not US permit desks; many country AHJ catalogs are zero",
    ];
    if (!fillIsos.includes("ng") || !fillIsos.includes("tr") || !fillIsos.includes("mx")) {
      holes.push("No ng/tr/mx fill files");
    }
    return {
      kitsOnDisk,
      atlasRows,
      capitals: capCount,
      permit: {
        core,
        extra,
        more,
        rest,
        lockDate: permitIndex.lock_date ?? "2026-08-18",
      },
      packageHoles,
      remaining: packageIndex.remaining_count ?? 0,
      fillIsos,
      missingFillNote: "no ng/tr/mx fill",
      wave: packageIndex.wave ?? "PACKAGE-TZ",
      holes,
    };
  } catch (err) {
    return {
      kitsOnDisk: 0,
      atlasRows: 0,
      capitals: 0,
      permit: { core: 0, extra: 0, more: 0, rest: 0, lockDate: "" },
      packageHoles: 0,
      remaining: 0,
      fillIsos: [],
      missingFillNote: "",
      wave: "",
      holes: [],
      error: err instanceof Error ? err.message : "corpus failed to load",
    };
  }
}

export async function load501Summary(): Promise<Five01Summary | { error: string }> {
  try {
    const mod = (await import("../../../vendor/kept/_out/501-links.json")) as {
      default?: Five01File;
    } & Five01File;
    const data: Five01File = mod.default ?? mod;
    const nodes = Array.isArray(data.nodes) ? data.nodes.length : 0;
    const edges = Array.isArray(data.edges) ? data.edges : [];
    let fec = 0;
    let usaspending = 0;
    for (const e of edges) {
      if (e.rel === "contributed") fec += 1;
      else if (e.rel === "granted") usaspending += 1;
    }
    const holeWhat = (data.holes ?? [])
      .map((h) => (h.what ?? "").trim())
      .filter(Boolean);
    return {
      nodes,
      edges: edges.length,
      fec,
      usaspending,
      holes: holeWhat.length,
      holeWhat,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "501 failed to load" };
  }
}
