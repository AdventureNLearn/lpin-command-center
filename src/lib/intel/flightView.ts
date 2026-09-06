import { haversineM } from "./geo";
import { PRESETS } from "./locations";

/** Above this camera height, do not fetch or plot live traffic. */
export const ORBIT_M = 2_000_000;
export const REGION_CAP = 120;

export type FlightView = {
  lat: number;
  lon: number;
  heightM: number;
  lamin: number;
  lamax: number;
  lomin: number;
  lomax: number;
  distNm: number;
  orbit: boolean;
  iata?: string;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function wrapLon(lon: number) {
  const x = ((((lon + 180) % 360) + 360) % 360) - 180;
  return x;
}

export function flightView(lat: number, lon: number, heightM: number): FlightView {
  const orbit = !Number.isFinite(heightM) || heightM > ORBIT_M;
  const deg = clamp((heightM / 111_000) * 0.5, 1.4, 8);
  const distNm = clamp(heightM / 1852 * 0.32, 70, 280);
  const view: FlightView = {
    lat,
    lon,
    heightM,
    orbit,
    distNm,
    lamin: clamp(lat - deg, -89.5, 89.5),
    lamax: clamp(lat + deg, -89.5, 89.5),
    lomin: wrapLon(lon - deg),
    lomax: wrapLon(lon + deg),
  };
  if (!orbit) {
    const iata = nearestIata(lat, lon, distNm * 1852);
    if (iata) view.iata = iata;
  }
  return view;
}

function nearestIata(lat: number, lon: number, maxM: number): string | undefined {
  let best: { id: string; d: number } | undefined;
  for (const p of PRESETS) {
    if (p.kind !== "airport" && p.kind !== "city") continue;
    if (!/^[a-z]{3}$/.test(p.id)) continue;
    const d = haversineM(lat, lon, p.lat, p.lon);
    if (d > maxM) continue;
    if (!best || d < best.d) best = { id: p.id, d };
  }
  return best?.id.toUpperCase();
}

export function inView(lat: number, lon: number, view: FlightView): boolean {
  if (view.orbit) return false;
  return haversineM(view.lat, view.lon, lat, lon) <= view.distNm * 1852;
}
