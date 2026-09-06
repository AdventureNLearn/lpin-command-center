/** LPIN parallel research protocol. Collision-sense on. Agent cap lifted for this build (D-272). */

import type { LinDeskId } from "./network";
import type { LinSource } from "./session";

/** Public HUD names. Never “agents” / “swarm” on the glass. */
export const SENSE_LANES: { id: string; label: string; deskId: LinDeskId }[] = [
  { id: "statute", label: "Statute", deskId: "legal" },
  { id: "rule", label: "Rule", deskId: "regulatory" },
  { id: "feed", label: "Feed", deskId: "technical" },
  { id: "stack", label: "Stack", deskId: "jurisdictional" },
  { id: "field", label: "Field", deskId: "operational" },
  { id: "infra", label: "Infra", deskId: "engineering" },
  { id: "money", label: "Money", deskId: "commerce" },
  { id: "roster", label: "Roster", deskId: "governance" },
  { id: "fifty", label: "Fifty", deskId: "fifty" },
  { id: "cells", label: "Cells", deskId: "opencells" },
];

export type LaneState = "idle" | "armed" | "done";

export type CollisionHit = {
  key: string;
  kind: "url" | "quote";
  lanes: string[];
  hint: string;
};

export function collisionsFromSources(sources: LinSource[]): CollisionHit[] {
  const byUrl = new Map<string, Set<string>>();
  const byQuote = new Map<string, Set<string>>();
  for (const s of sources) {
    const url = s.url.trim().toLowerCase();
    const quote = s.quote.trim().toLowerCase().slice(0, 80);
    if (url) {
      const set = byUrl.get(url) ?? new Set();
      set.add(s.deskId);
      byUrl.set(url, set);
    }
    if (quote.length >= 12) {
      const set = byQuote.get(quote) ?? new Set();
      set.add(s.deskId);
      byQuote.set(quote, set);
    }
  }
  const hits: CollisionHit[] = [];
  for (const [key, lanes] of byUrl) {
    if (lanes.size >= 2) {
      hits.push({
        key,
        kind: "url",
        lanes: [...lanes],
        hint: "Same URL in ≥2 desks. Association, not Supported.",
      });
    }
  }
  for (const [key, lanes] of byQuote) {
    if (lanes.size >= 2) {
      hits.push({
        key,
        kind: "quote",
        lanes: [...lanes],
        hint: "Same quote in ≥2 desks. Association, not Supported.",
      });
    }
  }
  return hits;
}

export const SPAWN_LAW = {
  tree: "sandbox/work/groks-eye-view-next",
  product: "LPIN",
  collision: true,
  agentCap: null,
  childWrites: "docs/command-center/_out/<seat>.md",
  publicHud: "lanes, not agents",
} as const;
