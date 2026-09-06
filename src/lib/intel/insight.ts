import type { DeskSystem, LayerId } from "./types";

export type InsightSystem = "intel" | "kept" | "permit" | "jobsite" | "insind" | "lin";

export type Insight = {
  id: string;
  title: string;
  body: string;
  system: InsightSystem;
  q?: string;
  lat?: number;
  lon?: number;
  height?: number;
  layer?: LayerId;
  desk?: { system: DeskSystem; id: string };
  source: string;
  /** Filled by sealInsight. Never trust a model tag for these. */
  score?: -1 | 0 | 1;
  basis?: "evidence" | "inference" | "assumption";
};

const CIVIC_LAYERS: LayerId[] = [
  "flights",
  "military",
  "vessels",
  "satellites",
  "earthquakes",
  "fires",
  "launches",
  "legislatures",
  "permits",
  "jobsite",
  "insind",
];

let seq = 0;
function nid() {
  return `ins-${Date.now().toString(36)}-${(seq++).toString(36)}`;
}

export function askedToMove(userText: string): boolean {
  return /\b(fly|take me|go (to|there)|jump to|navigate|show me on the globe|move (the )?globe|bring (us|me) to)\b/i.test(
    userText,
  );
}

export function parseInsightTag(raw: string): { text: string; insight: Insight | null } {
  const match = raw.match(/<<INSIGHT:(\{[\s\S]*?\})>>/);
  if (!match) return { text: raw.trim(), insight: null };
  const text = raw.replace(match[0], "").trim();
  try {
    const o = JSON.parse(match[1]) as Record<string, unknown>;
    const system = o.system;
    if (
      system !== "intel" &&
      system !== "kept" &&
      system !== "permit" &&
      system !== "jobsite" &&
      system !== "insind" &&
      system !== "lin"
    ) {
      return { text, insight: null };
    }
    const layer = typeof o.layer === "string" && CIVIC_LAYERS.includes(o.layer as LayerId)
      ? (o.layer as LayerId)
      : undefined;
    let desk: Insight["desk"];
    if (o.desk && typeof o.desk === "object") {
      const d = o.desk as { system?: string; id?: string };
      const id = String(d.id ?? "").trim().slice(0, 80);
      if (
        id &&
        (d.system === "kept" ||
          d.system === "permit" ||
          d.system === "jobsite" ||
          d.system === "insind" ||
          d.system === "lin") &&
        (system === "intel" || d.system === system)
      ) {
        desk = { system: d.system, id };
      }
    }
    const title = String(o.title ?? "").trim().slice(0, 80) || "Insight";
    const body = String(o.body ?? "").trim().slice(0, 240);
    const q = typeof o.q === "string" && o.q.trim() ? o.q.trim().slice(0, 80) : undefined;
    const latN =
      typeof o.lat === "number" && Number.isFinite(o.lat) && o.lat >= -90 && o.lat <= 90 ? o.lat : undefined;
    const lonN =
      typeof o.lon === "number" && Number.isFinite(o.lon) && o.lon >= -180 && o.lon <= 180 ? o.lon : undefined;
    const pair = latN != null && lonN != null;
    const height =
      typeof o.height === "number" && Number.isFinite(o.height) && o.height > 0 ? o.height : undefined;
    return {
      text,
      insight: {
        id: nid(),
        title,
        body,
        system,
        q,
        lat: pair ? latN : undefined,
        lon: pair ? lonN : undefined,
        height,
        layer,
        desk,
        source: String(o.source ?? "Grok comms · delayed").trim().slice(0, 120) || "Grok comms · delayed",
      },
    };
  } catch {
    return { text, insight: null };
  }
}

/** Chat flyTo with no fly-ask becomes a card instead of a camera yank. */
export function insightFromFlyQuery(q: string): Insight {
  return {
    id: nid(),
    title: q,
    body: "Named this place. Look here if you want the globe to follow.",
    system: "intel",
    q,
    source: "Grok comms · delayed",
  };
}
