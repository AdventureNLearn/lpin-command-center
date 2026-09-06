import type { PlaceDesk } from "./types";

const restCache = new Map<string, PlaceDesk>();

export function rememberRestPlace(place: PlaceDesk) {
  restCache.set(place.id, place);
}

export function getCachedRestPlace(id: string): PlaceDesk | undefined {
  return restCache.get(id);
}

export async function searchRestAhj(query: string): Promise<PlaceDesk[]> {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return [];
  const mod = await import("./places-rest");
  const rest = mod.REST_PLACES;
  const compact = q.replace(/\s+/g, "-");
  const hits: PlaceDesk[] = [];
  for (const p of rest) {
    const blob = `${p.name} ${p.state} ${p.county ?? ""} ${p.ahjName}`.toLowerCase();
    if (blob.includes(q) || p.id.includes(compact)) {
      rememberRestPlace(p);
      hits.push(p);
    }
    if (hits.length >= 20) break;
  }
  return hits;
}
