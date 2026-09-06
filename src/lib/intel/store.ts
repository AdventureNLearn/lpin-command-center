import { create } from "zustand";
import type {
  DetectionBox,
  EngineApi,
  Freshness,
  DeskSystem,
  LayerId,
  MapSourceId,
  StyleId,
  Tracked,
} from "./types";

export type Peek = { contact: Tracked; x: number; y: number; sticky?: boolean };
import type { Insight } from "./insight";
import { sealInsight } from "./honesty";
import { LAYER_META } from "./types";
import { STREAM_CAP } from "@/lib/kept/streams";
import { keptDeskByIso } from "@/lib/kept/desks";

const FIRST_RUN_KEY = "grok-eye:hide-first-run";

export type LayerState = {
  on: boolean;
  count: number;
  freshness: Freshness;
  detail: string;
};

type IntelState = {
  ready: boolean;
  bootStatus: string;
  bootPct: number;
  style: StyleId;
  mapSource: MapSourceId;
  hud: boolean;
  detection: boolean;
  detectionDensity: number;
  detections: DetectionBox[];
  cockpit: boolean;
  cleanUi: boolean;
  firstRun: boolean;
  command: string;
  commandHint: string;
  toast: string;
  placeName: string;
  cam: { lat: number; lon: number; height: number; heading: number };
  tracked: Tracked | null;
  peek: Peek | null;
  insight: Insight | null;
  layers: Record<LayerId, LayerState>;
  corpusOpen: boolean;
  guideOpen: boolean;
  desk: null | { system: DeskSystem; id: string };
  permitRest: boolean;
  streamPins: string[];
  weather: { temp: string; wind: string; sky: string } | null;
  engine: EngineApi | null;
  setEngine: (api: EngineApi | null) => void;
  setReady: (v: boolean) => void;
  setBoot: (s: string, pct?: number) => void;
  setStyle: (s: StyleId) => void;
  setMapSource: (s: MapSourceId) => void;
  setHud: (v: boolean) => void;
  setDetection: (v: boolean) => void;
  setDensity: (n: number) => void;
  setDetections: (d: DetectionBox[]) => void;
  setCockpit: (v: boolean) => void;
  setCleanUi: (v: boolean) => void;
  dismissFirstRun: (persist: boolean) => void;
  setCommand: (s: string) => void;
  setHint: (s: string) => void;
  setToast: (s: string) => void;
  setPlace: (s: string) => void;
  setCam: (c: IntelState["cam"]) => void;
  setTracked: (t: Tracked | null) => void;
  setPeek: (p: Peek | null) => void;
  setInsight: (i: Insight | null) => void;
  setLayer: (id: LayerId, patch: Partial<LayerState>) => void;
  setCorpusOpen: (v: boolean) => void;
  setGuideOpen: (v: boolean) => void;
  setDesk: (d: IntelState["desk"]) => void;
  setPermitRest: (v: boolean) => void;
  pinStream: (iso2: string) => void;
  unpinStream: (iso2: string) => void;
  setWeather: (w: IntelState["weather"]) => void;
};

/** One-key merge. Insight dismiss/set must not drop desk, engine, or peek. Comms is `useComms`. */
function oneKey<K extends "insight" | "peek">(
  key: K,
  value: IntelState[K],
): Pick<IntelState, K> {
  return { [key]: value } as Pick<IntelState, K>;
}

/** KIT-12: turning a layer on turns every other layer off. Count patches do not. */
function withExclusiveOn(
  layers: Record<LayerId, LayerState>,
  id: LayerId,
  row: LayerState,
): Record<LayerId, LayerState> {
  const next = { ...layers };
  for (const k of Object.keys(next) as LayerId[]) {
    if (k !== id && next[k].on) next[k] = { ...next[k], on: false, freshness: "off" };
  }
  next[id] = row;
  return next;
}

function defaultLayers(): Record<LayerId, LayerState> {
  return {
    flights: { on: false, count: 0, freshness: "off", detail: LAYER_META.flights.source },
    military: { on: false, count: 0, freshness: "off", detail: LAYER_META.military.source },
    vessels: { on: false, count: 0, freshness: "off", detail: LAYER_META.vessels.source },
    satellites: { on: false, count: 0, freshness: "off", detail: LAYER_META.satellites.source },
    earthquakes: { on: false, count: 0, freshness: "off", detail: LAYER_META.earthquakes.source },
    fires: { on: false, count: 0, freshness: "off", detail: LAYER_META.fires.source },
    launches: { on: false, count: 0, freshness: "off", detail: LAYER_META.launches.source },
    legislatures: { on: false, count: 0, freshness: "off", detail: LAYER_META.legislatures.source },
    permits: { on: false, count: 0, freshness: "off", detail: LAYER_META.permits.source },
    jobsite: { on: false, count: 0, freshness: "off", detail: LAYER_META.jobsite.source },
    insind: { on: false, count: 0, freshness: "off", detail: LAYER_META.insind.source },
  };
}

export function hydrateFirstRun() {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(FIRST_RUN_KEY) === "1") {
      useIntel.setState({ firstRun: false });
    }
  } catch {
    /* ignore */
  }
}

export const useIntel = create<IntelState>((set) => ({
  ready: false,
  bootStatus: "Waking globe",
  bootPct: 4,
  style: "normal",
  mapSource: "satellite",
  hud: true,
  detection: false,
  detectionDensity: 50,
  detections: [],
  cockpit: false,
  cleanUi: false,
  firstRun: true,
  command: "",
  commandHint: "name your question · open legal desk · find a building desk",
  toast: "",
  placeName: "Earth",
  cam: { lat: 20, lon: -30, height: 20_000_000, heading: 0 },
  tracked: null,
  peek: null,
  insight: null,
  layers: defaultLayers(),
  corpusOpen: false,
  guideOpen: false,
  desk: null,
  permitRest: false,
  streamPins: [],
  weather: null,
  engine: null,
  setEngine: (engine) => set({ engine }),
  setReady: (ready) => set({ ready }),
  setBoot: (bootStatus, pct) =>
    set((s) => ({
      bootStatus,
      bootPct: pct == null ? s.bootPct : Math.min(100, Math.max(s.bootPct, pct)),
    })),
  setStyle: (style) => set({ style }),
  setMapSource: (mapSource) => set({ mapSource }),
  setHud: (hud) => set({ hud }),
  setDetection: (detection) => set({ detection }),
  setDensity: (detectionDensity) => set({ detectionDensity }),
  setDetections: (detections) => set({ detections }),
  setCockpit: (cockpit) => set({ cockpit }),
  setCleanUi: (cleanUi) => set({ cleanUi }),
  dismissFirstRun: (persist) => {
    if (persist && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(FIRST_RUN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    set({ firstRun: false });
  },
  setCommand: (command) => set({ command }),
  setHint: (commandHint) => set({ commandHint }),
  setToast: (toast) => set({ toast }),
  setPlace: (placeName) => set({ placeName }),
  setCam: (cam) => set({ cam }),
  setTracked: (tracked) => set({ tracked }),
  setPeek: (peek) => set(oneKey("peek", peek)),
  setInsight: (insight) => set(oneKey("insight", insight ? sealInsight(insight) : null)),
  setLayer: (id, patch) =>
    set((s) => {
      const row = { ...s.layers[id], ...patch };
      const layers =
        patch.on === true
          ? withExclusiveOn(s.layers, id, row)
          : { ...s.layers, [id]: row };
      // Rail off is the Rest dump hard stop. Rail on does not opt Rest in.
      if (!layers.permits.on && s.permitRest) return { layers, permitRest: false };
      return { layers };
    }),
  setCorpusOpen: (corpusOpen) =>
    set((s) => ({ corpusOpen, desk: corpusOpen ? null : s.desk })),
  setGuideOpen: (guideOpen) => set({ guideOpen }),
  setDesk: (desk) =>
    set((s) => ({ desk, corpusOpen: desk ? false : s.corpusOpen })),
  setPermitRest: (permitRest) => set({ permitRest }),
  pinStream: (iso2) =>
    set((s) => {
      const id = iso2.toLowerCase();
      if (!keptDeskByIso(id)) return s;
      if (s.streamPins.includes(id) || s.streamPins.length >= STREAM_CAP) return s;
      return { streamPins: [...s.streamPins, id] };
    }),
  unpinStream: (iso2) =>
    set((s) => ({ streamPins: s.streamPins.filter((x) => x !== iso2.toLowerCase()) })),
  setWeather: (weather) => set({ weather }),
}));

let toastTimer: number | undefined;
export function flash(message: string) {
  useIntel.getState().setToast(message);
  if (typeof window === "undefined") return;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => useIntel.getState().setToast(""), 2800);
}
