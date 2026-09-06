import { CORE_PLACES } from "./places-core";
import { EXTRA_PLACES } from "./places-extra";
import { MORE_PLACES } from "./places-more";
import type { PlaceDesk } from "./types";

export type PermitLayer = "core" | "extra" | "more" | "rest";
export type PermitChip = "higher" | "mid" | "provisional";

/** Core + Extra + More only. Rest is a count, never in this list. */
const SEARCHABLE: PlaceDesk[] = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES];
const BY_ID = new Map(SEARCHABLE.map((p) => [p.id, p]));
const CORE_IDS = new Set(CORE_PLACES.map((p) => p.id));
const EXTRA_IDS = new Set(EXTRA_PLACES.map((p) => p.id));
const MORE_IDS = new Set(MORE_PLACES.map((p) => p.id));
const CORE_NAMES = new Set(CORE_PLACES.map((p) => p.name.toLowerCase()));
const EXTRA_MORE_NAMES = new Set(
  [...EXTRA_PLACES, ...MORE_PLACES].map((p) => p.name.toLowerCase()),
);

const HIT_CAP = 40;
/** Chat substring floor. 2-letter state codes do not mint a desk.id. */
const CHAT_MIN = 3;

export const FEATURED_AHJ_IDS = [
  "fl-miami",
  "fl-miami-dade",
  "ny-nyc",
  "ca-los-angeles",
  "tx-houston",
  "il-chicago",
  "wa-seattle",
  "ga-atlanta",
  "pa-philadelphia",
  "az-phoenix",
  "co-denver",
  "dc-washington",
] as const;

const FEATURED_AHJ_SET = new Set<string>(FEATURED_AHJ_IDS);

export const SEARCH_LITE_COUNTS = {
  core: CORE_PLACES.length,
  extra: EXTRA_PLACES.length,
  more: MORE_PLACES.length,
  searchable: SEARCHABLE.length,
  featured: FEATURED_AHJ_IDS.length,
} as const;

export function permitLayer(id: string): PermitLayer | undefined {
  if (CORE_IDS.has(id)) return "core";
  if (EXTRA_IDS.has(id)) return "extra";
  if (MORE_IDS.has(id)) return "more";
  return undefined;
}

export function isCoreAhj(id: string): boolean {
  return CORE_IDS.has(id);
}

export function permitChip(id: string, rest = false): PermitChip {
  if (rest) return "provisional";
  return permitLayer(id) === "core" ? "higher" : "mid";
}

export function ahjCountByState(): Map<string, number> {
  const m = new Map<string, number>();
  for (const p of SEARCHABLE) m.set(p.state, (m.get(p.state) ?? 0) + 1);
  return m;
}

export function getSearchablePlace(id: string): PlaceDesk | undefined {
  return BY_ID.get(id);
}

/**
 * PlaceDesk has no lat/lon. Extra/More have none.
 * Look-here numbers live in permit-pins FEATURED_COORDS — this module does not invent any.
 * Those coords are for a user-picked desk, not empty-state examples.
 */
export function ahjHasFeaturedCoords(id: string): boolean {
  return FEATURED_AHJ_SET.has(id);
}

function matchBlob(p: PlaceDesk, q: string, compact: string): boolean {
  const blob = `${p.name} ${p.state} ${p.county ?? ""} ${p.ahjName} ${p.portalName}`.toLowerCase();
  return blob.includes(q) || p.id.includes(compact);
}

function filterHits(pool: PlaceDesk[], q: string): PlaceDesk[] {
  const compact = q.replace(/\s+/g, "-");
  return pool.filter((p) => matchBlob(p, q, compact)).slice(0, HIT_CAP);
}

function pickFromHits(hits: PlaceDesk[], query: string): PlaceDesk | undefined {
  if (!hits.length) return undefined;
  const low = query.trim().toLowerCase();
  const compact = low.replace(/\s+/g, "-");
  const exact = hits.find((h) => h.name.toLowerCase() === low || h.id === low || h.id === compact);
  if (hits.length === 1) return hits[0];
  return exact;
}

/** Drawer typeahead. Empty q = no city samples. Extra/More included. Rest never. */
export function searchAhj(query: string): PlaceDesk[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return filterHits(SEARCHABLE, q);
}

/** Command-bar unique/exact pick from Core/Extra/More. Empty miss. No Rest. */
export function pickAhj(query: string): PlaceDesk | undefined {
  const q = query.trim();
  if (!q) return undefined;
  return pickFromHits(searchAhj(q), q);
}

function parseChatQuery(raw: string): { q: string; state?: string } {
  const t = raw.trim().toLowerCase();
  const m = t.match(/^(.+?)(?:[, ]+)([a-z]{2})$/);
  if (m && m[1].trim().length >= 2) return { q: m[1].trim(), state: m[2].toUpperCase() };
  return { q: t };
}

/** Name / id only. Not ahjName or portal — those steal on "building". Extra/More never in the pool. */
function chatMatch(p: PlaceDesk, q: string, compact: string): boolean {
  const name = p.name.toLowerCase();
  if (name === q || p.id === q || p.id === compact) return true;
  if (q.length < CHAT_MIN) return false;
  return name.includes(q) || p.id.includes(compact);
}

function filterChatHits(q: string, state?: string): PlaceDesk[] {
  const compact = q.replace(/\s+/g, "-");
  const pool = state ? CORE_PLACES.filter((p) => p.state === state) : CORE_PLACES;
  return pool.filter((p) => chatMatch(p, q, compact)).slice(0, HIT_CAP);
}

function pickFromHitsChat(hits: PlaceDesk[], q: string, compact: string): PlaceDesk | undefined {
  if (!hits.length) return undefined;
  const exactName = hits.filter((h) => h.name.toLowerCase() === q);
  if (exactName.length === 1) return exactName[0];
  if (exactName.length > 1) return undefined;
  const exactId = hits.find((h) => h.id === q || h.id === compact);
  if (exactId) return exactId;
  if (hits.length === 1 && CORE_IDS.has(hits[0].id)) return hits[0];
  return undefined;
}

/** Core typeahead. Extra/More stay the drawer. Empty = no city samples. */
export function searchAhjCore(query: string): PlaceDesk[] {
  const raw = query.trim();
  if (!raw) return [];
  const { q, state } = parseChatQuery(raw);
  return filterChatHits(q, state);
}

/** Extra/More exact name that is not a Core name — chat miss (York ≠ New York City). */
function isDrawerOnlyName(q: string): boolean {
  return EXTRA_MORE_NAMES.has(q) && !CORE_NAMES.has(q);
}

/**
 * Chat Insight pick. Core only. Extra/More = miss. Ambiguous names (two Portlands) = miss.
 * No invented coords. Rest never.
 */
export function pickAhjCore(query: string): PlaceDesk | undefined {
  const raw = query.trim();
  if (!raw) return undefined;
  const { q, state } = parseChatQuery(raw);
  if (isDrawerOnlyName(q)) return undefined;
  const compact = q.replace(/\s+/g, "-");
  const pick = pickFromHitsChat(filterChatHits(q, state), q, compact);
  if (!pick || !CORE_IDS.has(pick.id)) return undefined;
  return pick;
}
