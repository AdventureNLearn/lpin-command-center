import { createServerFn } from "@tanstack/react-start";
import { cached, fetchJson, stale } from "./http";
import type { FlightSample } from "@/lib/intel/types";
import { REGION_CAP, flightView, inView, type FlightView } from "@/lib/intel/flightView";

type OpenSky = {
  time?: number;
  states?: Array<Array<string | number | boolean | null>>;
};

type AdsbAc = {
  hex?: string;
  flight?: string;
  lat?: number;
  lon?: number;
  alt_baro?: number | "ground";
  alt_geom?: number;
  track?: number;
  gs?: number;
  baro_rate?: number;
  r?: string;
  t?: string;
  dbFlags?: number;
};

type Adsb = { ac?: AdsbAc[]; aircraft?: AdsbAc[] };

type AviationLive = {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  direction?: number;
  speed_horizontal?: number;
  speed_vertical?: number;
  is_ground?: boolean;
};

type AviationFlight = {
  flight?: { iata?: string; icao?: string; number?: string };
  airline?: { iata?: string; icao?: string; name?: string };
  departure?: { iata?: string; icao?: string };
  aircraft?: { icao24?: string; registration?: string };
  live?: AviationLive | null;
};

type AviationFlights = {
  data?: AviationFlight[];
  results?: AviationFlight[];
  error?: { code?: string; message?: string };
};

const ADSB_BASES = [
  "https://opendata.adsb.fi/api/v2",
  "https://api.adsb.lol/v2",
];

let skyToken: { value: string; exp: number } | null = null;

function aircraftList(data: Adsb | null | undefined): AdsbAc[] {
  if (!data) return [];
  return data.ac ?? data.aircraft ?? [];
}

function fromOpenSky(row: Array<string | number | boolean | null>): FlightSample | null {
  const lat = Number(row[6]);
  const lon = Number(row[5]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const call = String(row[1] ?? "").trim() || String(row[0] ?? "UNKN");
  const alt = Number(row[13] ?? row[7] ?? 0);
  return {
    id: String(row[0] ?? call),
    callsign: call,
    origin: String(row[2] ?? ""),
    lat,
    lon,
    altM: Number.isFinite(alt) ? alt : 0,
    heading: Number(row[10] ?? 0) || 0,
    speedMs: Number(row[9] ?? 0) || 0,
    vertMs: Number(row[11] ?? 0) || 0,
    onGround: Boolean(row[8]),
    military: false,
    ts: Number(row[4] ?? Date.now() / 1000) * 1000,
  };
}

function fromAdsb(ac: AdsbAc, military: boolean): FlightSample | null {
  if (ac.lat == null || ac.lon == null) return null;
  const alt = ac.alt_baro === "ground" ? 0 : Number(ac.alt_geom ?? ac.alt_baro ?? 0);
  const altM = Number.isFinite(alt) ? alt * 0.3048 : 0;
  return {
    id: String(ac.hex ?? ac.flight ?? Math.random()),
    callsign: String(ac.flight ?? ac.r ?? ac.hex ?? "UNKN").trim(),
    origin: String(ac.t ?? ""),
    lat: ac.lat,
    lon: ac.lon,
    altM,
    heading: Number(ac.track ?? 0) || 0,
    speedMs: (Number(ac.gs ?? 0) || 0) * 0.514444,
    vertMs: (Number(ac.baro_rate ?? 0) || 0) * 0.00508,
    onGround: ac.alt_baro === "ground" || altM < 20,
    military: military || Boolean(ac.dbFlags && ac.dbFlags & 1),
    ts: Date.now(),
  };
}

async function openskyAuthHeader(id?: string, secret?: string): Promise<Record<string, string>> {
  const clientId = (id || process.env.OPENSKY_CLIENT_ID || "").trim();
  const clientSecret = (secret || process.env.OPENSKY_CLIENT_SECRET || "").trim();
  if (!clientId || !clientSecret) return {};
  if (skyToken && Date.now() < skyToken.exp - 20_000) {
    return { Authorization: `Bearer ${skyToken.value}` };
  }
  const res = await fetch(
    "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    },
  );
  if (!res.ok) throw new Error(`OpenSky auth ${res.status}`);
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new Error("OpenSky token missing");
  skyToken = {
    value: json.access_token,
    exp: Date.now() + Math.max(60, json.expires_in ?? 1800) * 1000,
  };
  return { Authorization: `Bearer ${skyToken.value}` };
}

function fromAviation(row: AviationFlight): FlightSample | null {
  const live = row.live;
  const lat = Number(live?.latitude);
  const lon = Number(live?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const call =
    String(row.flight?.iata ?? row.flight?.icao ?? row.aircraft?.registration ?? "").trim() || "UNKN";
  const alt = Number(live?.altitude ?? 0);
  const kmh = Number(live?.speed_horizontal ?? 0);
  return {
    id: String(row.aircraft?.icao24 ?? row.flight?.icao ?? call),
    callsign: call,
    origin: String(row.departure?.iata ?? row.airline?.iata ?? ""),
    lat,
    lon,
    altM: Number.isFinite(alt) ? alt : 0,
    heading: Number(live?.direction ?? 0) || 0,
    speedMs: Number.isFinite(kmh) ? kmh / 3.6 : 0,
    vertMs: Number(live?.speed_vertical ?? 0) || 0,
    onGround: Boolean(live?.is_ground) || (Number.isFinite(alt) && alt < 20),
    military: false,
    ts: Date.now(),
  };
}

async function pullAviationstack(key?: string, view?: FlightView): Promise<FlightSample[]> {
  const access = (key || process.env.AVIATIONSTACK_ACCESS_KEY || "").trim();
  if (!access) throw new Error("Aviationstack key missing");
  const url = new URL("https://api.aviationstack.com/v1/flights");
  url.searchParams.set("access_key", access);
  url.searchParams.set("flight_status", "active");
  url.searchParams.set("limit", "100");
  if (view?.iata) url.searchParams.set("dep_iata", view.iata);
  const data = await fetchJson<AviationFlights>(url.toString(), { timeoutMs: 10_000 });
  if (data.error?.message) throw new Error(data.error.message);
  const rows = data.data ?? data.results ?? [];
  const out: FlightSample[] = [];
  for (const row of rows) {
    const f = fromAviation(row);
    if (!f) continue;
    if (view && !inView(f.lat, f.lon, view)) continue;
    out.push(f);
  }
  if (!out.length) throw new Error("Aviationstack live positions empty");
  return out;
}

async function pullOpenSky(id?: string, secret?: string, view?: FlightView): Promise<FlightSample[]> {
  const headers = await openskyAuthHeader(id, secret).catch(() => ({} as Record<string, string>));
  const url = new URL("https://opensky-network.org/api/states/all");
  if (view && view.lomin < view.lomax) {
    url.searchParams.set("lamin", view.lamin.toFixed(3));
    url.searchParams.set("lomin", view.lomin.toFixed(3));
    url.searchParams.set("lamax", view.lamax.toFixed(3));
    url.searchParams.set("lomax", view.lomax.toFixed(3));
  }
  const data = await fetchJson<OpenSky>(url.toString(), {
    timeoutMs: 9_000,
    headers,
  });
  const out: FlightSample[] = [];
  for (const row of data.states ?? []) {
    const f = fromOpenSky(row);
    if (f) out.push(f);
  }
  return out;
}

async function pullAdsbPoint(base: string, lat: number, lon: number, dist: number): Promise<FlightSample[]> {
  const data = await fetchJson<Adsb>(`${base}/lat/${lat}/lon/${lon}/dist/${dist}`, {
    timeoutMs: 7_000,
  });
  const out: FlightSample[] = [];
  for (const ac of aircraftList(data)) {
    const f = fromAdsb(ac, false);
    if (f) out.push(f);
  }
  return out;
}

async function pullAdsbRegion(view: FlightView): Promise<{ flights: FlightSample[]; source: string }> {
  const dist = Math.round(view.distNm);
  for (const base of ADSB_BASES) {
    try {
      const flights = await pullAdsbPoint(base, view.lat, view.lon, dist);
      if (flights.length) {
        return {
          flights,
          source: base.includes("adsb.fi") ? "adsb.fi region" : "adsb.lol region",
        };
      }
    } catch {
      /* next base */
    }
  }
  throw new Error("ADS-B region empty");
}

async function pullMil(): Promise<{ flights: FlightSample[]; source: string }> {
  const errors: string[] = [];
  for (const base of ADSB_BASES) {
    try {
      const data = await fetchJson<Adsb>(`${base}/mil`, { timeoutMs: 8_000 });
      const out: FlightSample[] = [];
      for (const ac of aircraftList(data)) {
        const f = fromAdsb(ac, true);
        if (f) out.push(f);
      }
      if (out.length) {
        return {
          flights: out,
          source: base.includes("adsb.fi") ? "adsb.fi military" : "adsb.lol military",
        };
      }
    } catch (err) {
      errors.push(err instanceof Error ? err.message : "mil failed");
    }
  }
  throw new Error(errors[0] || "Military ADS-B empty");
}

function capFlights(flights: FlightSample[]): FlightSample[] {
  const air = flights.filter((f) => !f.onGround);
  const pool = air.length ? air : flights;
  if (pool.length <= REGION_CAP) return pool;
  const step = pool.length / REGION_CAP;
  const sampled: FlightSample[] = [];
  for (let i = 0; i < REGION_CAP; i++) sampled.push(pool[Math.floor(i * step)]!);
  return sampled;
}

function flightKey(f: FlightSample) {
  const hex = f.id.replace(/^0+/, "").toLowerCase();
  if (/^[a-f0-9]{6,}$/.test(hex)) return `h:${hex.slice(-6)}`;
  const call = f.callsign.replace(/[^a-z0-9]/gi, "").toUpperCase();
  if (call.length >= 3) return `c:${call}`;
  return `i:${hex || "unk"}`;
}

function mergeFlights(parts: FlightSample[][]) {
  const map = new Map<string, FlightSample>();
  for (const part of parts) {
    for (const f of part) {
      const k = flightKey(f);
      const prev = map.get(k);
      if (!prev) {
        map.set(k, f);
        continue;
      }
      const betterCall = f.callsign.length > prev.callsign.length;
      map.set(k, betterCall ? { ...f, id: prev.id } : prev);
    }
  }
  return capFlights([...map.values()]);
}

export const getFlights = createServerFn({ method: "POST" })
  .validator((input: {
    aviationstack?: string;
    openskyId?: string;
    openskySecret?: string;
    lat?: number;
    lon?: number;
    heightM?: number;
  } | undefined) => ({
    aviationstack: String(input?.aviationstack ?? "").slice(0, 80),
    openskyId: String(input?.openskyId ?? "").slice(0, 120),
    openskySecret: String(input?.openskySecret ?? "").slice(0, 200),
    lat: Number(input?.lat),
    lon: Number(input?.lon),
    heightM: Number(input?.heightM),
  }))
  .handler(async ({ data }) => {
  const lat = Number.isFinite(data.lat) ? data.lat : 18;
  const lon = Number.isFinite(data.lon) ? data.lon : -32;
  const heightM = Number.isFinite(data.heightM) ? data.heightM : 22_000_000;
  const view = flightView(lat, lon, heightM);
  if (view.orbit) {
    return {
      flights: [] as FlightSample[],
      source: "Zoom in for live traffic",
      at: Date.now(),
      freshness: "off" as const,
    };
  }

  const av = Boolean(data.aviationstack || process.env.AVIATIONSTACK_ACCESS_KEY);
  const osCred = Boolean(data.openskyId && data.openskySecret) || Boolean(process.env.OPENSKY_CLIENT_ID);
  const cacheKey = `flights:${view.lat.toFixed(1)}:${view.lon.toFixed(1)}:${Math.round(view.distNm)}`;
  const ttl = av ? 90_000 : 16_000;
  return cached(cacheKey, ttl, async () => {
    const parts: FlightSample[][] = [];
    const sources: string[] = [];

    try {
      const { flights, source } = await pullAdsbRegion(view);
      parts.push(flights);
      sources.push(source);
    } catch {
      /* optional */
    }

    // One writer per contact. Do not stack three planet dumps. Fill only if thin.
    if (mergeFlights(parts).length < 20 && av) {
      try {
        parts.push(await pullAviationstack(data.aviationstack, view));
        sources.push(view.iata ? `Aviationstack ${view.iata}` : "Aviationstack");
      } catch {
        /* optional */
      }
    }

    if (mergeFlights(parts).length < 15 && osCred) {
      try {
        const os = await pullOpenSky(data.openskyId, data.openskySecret, view);
        if (os.length) {
          parts.push(os);
          sources.push("OpenSky region");
        }
      } catch {
        /* optional */
      }
    }

    const flights = mergeFlights(parts);
    if (!flights.length) {
      const prev = stale<{ flights: FlightSample[]; source: string; at: number }>(cacheKey);
      if (prev?.flights.length) return { ...prev, freshness: "delayed" as const };
      throw new Error("No traffic in this region");
    }
    return {
      flights,
      source: sources.join(" · ") || "region",
      at: Date.now(),
      freshness: "live" as const,
    };
  }).catch((err: unknown) => ({
    flights: [] as FlightSample[],
    source: "unavailable",
    at: Date.now(),
    freshness: "error" as const,
    error: err instanceof Error ? err.message : "Flight feed failed",
  }));
});

export const getMilitary = createServerFn({ method: "GET" }).handler(async () => {
  return cached("military", 20_000, async () => {
    const { flights, source } = await pullMil();
    return {
      flights: capFlights(flights),
      source,
      at: Date.now(),
      freshness: "live" as const,
    };
  }).catch((err: unknown) => ({
    flights: [] as FlightSample[],
    source: "unavailable",
    at: Date.now(),
    freshness: "error" as const,
    error: err instanceof Error ? err.message : "Military feed failed",
  }));
});
