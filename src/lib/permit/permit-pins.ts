import type { Tracked } from "@/lib/intel/types";
import { ahjCountByState } from "./search-lite";

/** Approximate points for Look here after a user picks that desk. Not empty-state pins. Not parcels. Not Rest. */
export const FEATURED_COORDS: Record<string, { lat: number; lon: number }> = {
  "fl-miami": { lat: 25.76, lon: -80.19 },
  "fl-miami-dade": { lat: 25.55, lon: -80.63 },
  "ny-nyc": { lat: 40.71, lon: -74.01 },
  "ca-los-angeles": { lat: 34.05, lon: -118.24 },
  "tx-houston": { lat: 29.76, lon: -95.37 },
  "il-chicago": { lat: 41.88, lon: -87.63 },
  "wa-seattle": { lat: 47.61, lon: -122.33 },
  "ga-atlanta": { lat: 33.75, lon: -84.39 },
  "pa-philadelphia": { lat: 39.95, lon: -75.17 },
  "az-phoenix": { lat: 33.45, lon: -112.07 },
  "co-denver": { lat: 39.74, lon: -104.99 },
  "dc-washington": { lat: 38.91, lon: -77.04 },
};

/** Geographic centers for cluster billboards. Not AHJ parcels. */
export const STATE_CENTROIDS: Record<string, { lat: number; lon: number }> = {
  AL: { lat: 32.8, lon: -86.8 },
  AK: { lat: 64.2, lon: -153.5 },
  AZ: { lat: 34.3, lon: -111.7 },
  AR: { lat: 34.9, lon: -92.4 },
  CA: { lat: 37.2, lon: -119.5 },
  CO: { lat: 39.0, lon: -105.5 },
  CT: { lat: 41.6, lon: -72.7 },
  DE: { lat: 39.0, lon: -75.5 },
  DC: { lat: 38.91, lon: -77.04 },
  FL: { lat: 28.1, lon: -81.8 },
  GA: { lat: 32.7, lon: -83.4 },
  HI: { lat: 20.8, lon: -156.3 },
  ID: { lat: 44.4, lon: -114.6 },
  IL: { lat: 40.0, lon: -89.3 },
  IN: { lat: 39.9, lon: -86.3 },
  IA: { lat: 42.0, lon: -93.5 },
  KS: { lat: 38.5, lon: -98.3 },
  KY: { lat: 37.8, lon: -85.7 },
  LA: { lat: 31.0, lon: -92.0 },
  ME: { lat: 45.3, lon: -69.2 },
  MD: { lat: 39.0, lon: -76.7 },
  MA: { lat: 42.2, lon: -71.5 },
  MI: { lat: 44.3, lon: -85.4 },
  MN: { lat: 46.3, lon: -94.3 },
  MS: { lat: 32.7, lon: -89.7 },
  MO: { lat: 38.4, lon: -92.5 },
  MT: { lat: 47.1, lon: -109.6 },
  NE: { lat: 41.5, lon: -99.8 },
  NV: { lat: 39.3, lon: -116.6 },
  NH: { lat: 43.7, lon: -71.6 },
  NJ: { lat: 40.2, lon: -74.7 },
  NM: { lat: 34.4, lon: -106.1 },
  NY: { lat: 42.9, lon: -75.5 },
  NC: { lat: 35.6, lon: -79.4 },
  ND: { lat: 47.4, lon: -100.5 },
  OH: { lat: 40.3, lon: -82.8 },
  OK: { lat: 35.6, lon: -97.5 },
  OR: { lat: 43.9, lon: -120.6 },
  PA: { lat: 40.9, lon: -77.8 },
  RI: { lat: 41.7, lon: -71.5 },
  SC: { lat: 33.9, lon: -80.9 },
  SD: { lat: 44.4, lon: -100.2 },
  TN: { lat: 35.8, lon: -86.0 },
  TX: { lat: 31.5, lon: -99.3 },
  UT: { lat: 39.3, lon: -111.7 },
  VT: { lat: 44.1, lon: -72.7 },
  VA: { lat: 37.5, lon: -78.6 },
  WA: { lat: 47.4, lon: -120.5 },
  WV: { lat: 38.6, lon: -80.6 },
  WI: { lat: 44.6, lon: -89.8 },
  WY: { lat: 43.0, lon: -107.6 },
  PR: { lat: 18.2, lon: -66.5 },
  VI: { lat: 18.3, lon: -64.8 },
  GU: { lat: 13.4, lon: 144.8 },
  AS: { lat: -14.3, lon: -170.7 },
  MP: { lat: 15.2, lon: 145.8 },
};

export type PermitMark = {
  id: string;
  lat: number;
  lon: number;
  label: string;
  kind: "core" | "cluster";
  placeId?: string;
  state?: string;
  count?: number;
};

/** Nationwide state packs at every height. Named cities appear only after the user types or picks a desk. */
export function permitMarks(_heightM: number): PermitMark[] {
  const out: PermitMark[] = [];
  const counts = ahjCountByState();
  for (const [code, pos] of Object.entries(STATE_CENTROIDS)) {
    const n = counts.get(code) ?? 0;
    if (n < 1) continue;
    out.push({
      id: `ahj-st-${code}`,
      lat: pos.lat,
      lon: pos.lon,
      label: `${code} · ${n}`,
      kind: "cluster",
      state: code,
      count: n,
    });
  }
  return out;
}

export function permitContact(mark: PermitMark): Tracked {
  return {
    id: mark.id,
    kind: "permit",
    name: mark.label,
    meta:
      mark.kind === "cluster"
        ? `State pack cluster · Rest not mapped`
        : `Catalog point · approximate`,
    lat: mark.lat,
    lon: mark.lon,
    altM: 0,
    heading: 0,
    speedMs: 0,
    vertMs: 0,
    source: "Permit Harbor catalog (locked 2026-08-18)",
    freshness: "delayed",
  };
}
