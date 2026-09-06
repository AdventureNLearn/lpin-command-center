import type { PlaceDesk } from "./types";
import { CORE_PLACES } from "./places-core";
import { EXTRA_PLACES } from "./places-extra";
import { MORE_PLACES } from "./places-more";
import { REST_PLACES } from "./places-rest";

export const PLACES: PlaceDesk[] = [...CORE_PLACES, ...EXTRA_PLACES, ...MORE_PLACES, ...REST_PLACES];

const BY_ID = new Map(PLACES.map((p) => [p.id, p]));
const STATE_INDEX = new Map<string, PlaceDesk[]>();
for (const place of PLACES) {
  const list = STATE_INDEX.get(place.state);
  if (list) list.push(place);
  else STATE_INDEX.set(place.state, [place]);
}
for (const list of STATE_INDEX.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name));
}

const CORE_IDS = new Set(CORE_PLACES.map((p) => p.id));
const EXTRA_IDS = new Set(EXTRA_PLACES.map((p) => p.id));
const MORE_IDS = new Set(MORE_PLACES.map((p) => p.id));

export function getPlace(id: string): PlaceDesk | undefined {
  return BY_ID.get(id);
}

export function placeLayer(id: string): "core" | "extra" | "more" | "rest" | undefined {
  if (!BY_ID.has(id)) return undefined;
  if (CORE_IDS.has(id)) return "core";
  if (EXTRA_IDS.has(id)) return "extra";
  if (MORE_IDS.has(id)) return "more";
  return "rest";
}

export function portalConfidence(id: string): "higher" | "provisional" {
  return placeLayer(id) === "core" ? "higher" : "provisional";
}

export function placesInState(code: string): PlaceDesk[] {
  return STATE_INDEX.get(code.toUpperCase()) ?? [];
}

export function searchPlaces(query: string): PlaceDesk[] {
  const q = query.trim().toLowerCase();
  if (!q) return PLACES.slice(0, 40);
  const compact = q.replace(/\s+/g, "-");
  return PLACES.filter((p) => {
    const blob = `${p.name} ${p.state} ${p.county ?? ""} ${p.ahjName} ${p.portalName}`.toLowerCase();
    return blob.includes(q) || p.id.includes(compact);
  }).slice(0, 80);
}
