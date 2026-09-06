import { keptDeskByIso, matchKeptDesk } from "@/lib/kept/desks";
import type { Insight } from "./insight";
import type { Kind, Tracked } from "./types";

export type ClaimScore = -1 | 0 | 1;
export type BasisKind = "evidence" | "inference" | "assumption";

export type Honesty = {
  score: ClaimScore;
  basis: BasisKind;
  label: string;
};

const HONEST_RE =
  /delayed|as filed|hole|unverified|not verified|public feed|modeled|not navigation|named 0|no kit/i;

export function formatHonesty(h: Honesty): string {
  const n = h.score === 1 ? "+1" : h.score === -1 ? "−1" : "0";
  const b = h.basis === "evidence" ? "Evidence" : h.basis === "inference" ? "Inference" : "Assumption";
  return `${n} ${b} · ${h.label}`;
}

function liveFeed(kind: Kind, freshness: string): Honesty | null {
  if (kind === "vessel" || freshness === "simulated") {
    return { score: 0, basis: "inference", label: "modeled, not live AIS" };
  }
  if (
    kind === "flight" ||
    kind === "military" ||
    kind === "satellite" ||
    kind === "earthquake" ||
    kind === "fire" ||
    kind === "launch" ||
    freshness === "live"
  ) {
    return { score: 1, basis: "evidence", label: "as feed, not navigation" };
  }
  return null;
}

export function peekHonesty(c: Tracked): Honesty {
  if (c.kind === "legislature") {
    const iso = c.id.startsWith("leg-") ? c.id.slice(4) : "";
    const kept = iso ? keptDeskByIso(iso) : null;
    if (!kept) return { score: 0, basis: "assumption", label: "no kit on disk" };
    if (kept.named > 0) return { score: 1, basis: "evidence", label: "as filed" };
    return { score: 0, basis: "evidence", label: "named 0" };
  }
  if (c.kind === "permit") return { score: 0, basis: "evidence", label: "portal not verified" };
  if (c.kind === "jobsite" || c.kind === "insind") {
    return { score: 0, basis: "evidence", label: "honest hole" };
  }
  return liveFeed(c.kind, c.freshness) ?? { score: 0, basis: "assumption", label: "unscored" };
}

function insightHonesty(ins: Insight): Honesty {
  if (ins.system === "kept") {
    const kept = ins.desk ? keptDeskByIso(ins.desk.id) : matchKeptDesk(ins.q ?? ins.title);
    if (kept && kept.named > 0) return { score: 1, basis: "evidence", label: "as filed" };
    if (kept) return { score: 0, basis: "evidence", label: "named 0" };
    return { score: 0, basis: "assumption", label: "no kit on disk" };
  }
  if (ins.system === "permit") return { score: 0, basis: "evidence", label: "portal not verified" };
  if (ins.system === "jobsite" || ins.system === "insind") {
    return { score: 0, basis: "evidence", label: "honest hole" };
  }
  if (ins.system === "lin") {
    return { score: 0, basis: "evidence", label: "not proven yet" };
  }
  if (ins.layer === "vessels") return { score: 0, basis: "inference", label: "modeled, not live AIS" };
  if (
    ins.layer === "flights" ||
    ins.layer === "military" ||
    ins.layer === "satellites" ||
    ins.layer === "earthquakes" ||
    ins.layer === "fires" ||
    ins.layer === "launches"
  ) {
    return { score: 1, basis: "evidence", label: "as feed, not navigation" };
  }
  return { score: 0, basis: "assumption", label: "unscored" };
}

/** Disk / feed honesty. Drops empty desks. Ignores any model-supplied score. */
export function sealInsight(ins: Insight): Insight {
  const desk = ins.desk && ins.desk.id.trim() ? ins.desk : undefined;
  const h = insightHonesty({ ...ins, desk });
  const source = HONEST_RE.test(`${ins.body} ${ins.source}`) ? ins.source : `${ins.source} · ${h.label}`;
  return { ...ins, desk, score: h.score, basis: h.basis, source };
}
