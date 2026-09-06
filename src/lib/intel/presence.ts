import type { StyleId } from "./types";

/** KIT-18. Shadertoy is the craft bar, not an engine. Cesium globe stays the world. */
export const PRESENCE_KIT = "KIT-18";
export const PRESENCE_BAR = "shadertoy-grade";
export const PRESENCE_REF = "https://www.shadertoy.com/results?query=mountain";

export type PresenceSurfaceId =
  | "globe"
  | "peek"
  | "insight"
  | "desk"
  | "firstrun"
  | "comms";

export type PresenceSurface = {
  id: PresenceSurfaceId;
  idea: string;
  civic: string;
  empty: string;
  stop: string;
};

export const PRESENCE_SURFACES: PresenceSurface[] = [
  {
    id: "globe",
    idea: "Live Earth: depth, sky, light, motion",
    civic: "Layers sit on the globe",
    empty: "163 desk holes stay empty",
    stop: "iframe Shadertoy. Second engine. Wallpaper over the globe",
  },
  {
    id: "peek",
    idea: "Holo card on the contact. Camera stays",
    civic: "Honesty chip rides the contact",
    empty: "No pick = no card",
    stop: "Auto-zoom. Fake complete Peek",
  },
  {
    id: "insight",
    idea: "One card. Look here is optional",
    civic: "Evidence / Inference / Assumption on the card",
    empty: "No disk = hole, not a mint",
    stop: "Auto-truth from Grok tag",
  },
  {
    id: "desk",
    idea: "One drawer. Globe stays mounted",
    civic: "Roster / AHJ / jobsite / insind as filed",
    empty: "Named 0 stays named 0",
    stop: "Spreadsheet homepage",
  },
  {
    id: "firstrun",
    idea: "One layer each. One start",
    civic: "Who sits where / Find a building desk",
    empty: "Skip = empty globe is honest",
    stop: "Two layers on from first-run",
  },
  {
    id: "comms",
    idea: "Talk beside the desk, not on top of it",
    civic: "Civic card wins a Grok tag",
    empty: "Dark comms = local kit card",
    stop: "22rem stack over the globe",
  },
];

export type PresenceAtmosphere = {
  lighting: boolean;
  atmosphereLight: number;
  sky: boolean;
  groundAtmosphere: boolean;
  fog: boolean;
};

/** World substrate under each grade. CRT is a screen look; lighting stays off. */
export const PRESENCE_ATMOSPHERE: Record<StyleId, PresenceAtmosphere> = {
  normal: {
    lighting: true,
    atmosphereLight: 18,
    sky: true,
    groundAtmosphere: true,
    fog: true,
  },
  crt: {
    lighting: false,
    atmosphereLight: 10,
    sky: true,
    groundAtmosphere: true,
    fog: true,
  },
  nvg: {
    lighting: true,
    atmosphereLight: 8,
    sky: true,
    groundAtmosphere: true,
    fog: true,
  },
  flir: {
    lighting: true,
    atmosphereLight: 12,
    sky: true,
    groundAtmosphere: true,
    fog: true,
  },
  noir: {
    lighting: true,
    atmosphereLight: 6,
    sky: true,
    groundAtmosphere: true,
    fog: true,
  },
  snow: {
    lighting: true,
    atmosphereLight: 16,
    sky: true,
    groundAtmosphere: true,
    fog: true,
  },
};

export const PRESENCE_SCORE_FIELDS = [
  "craft",
  "civic_in_world",
  "honest_empty",
  "clutter",
] as const;

export type PresenceScoreField = (typeof PRESENCE_SCORE_FIELDS)[number];

export const PRESENCE_STOP = [
  "iframe shadertoy",
  "second engine",
  "admin chrome",
  "live gevradio remix",
  "rest pin dump",
  "presence panel",
] as const;

type PresenceViewer = {
  scene: {
    fog: { enabled: boolean };
    skyAtmosphere?: { show: boolean } | null;
    globe: {
      enableLighting: boolean;
      atmosphereLightIntensity: number;
      showGroundAtmosphere: boolean;
    };
  };
};

export function applyPresenceAtmosphere(
  viewer: PresenceViewer,
  style: StyleId,
  phone: boolean,
): void {
  const p = PRESENCE_ATMOSPHERE[style];
  viewer.scene.globe.enableLighting = p.lighting && !phone;
  viewer.scene.globe.atmosphereLightIntensity = phone
    ? Math.min(8, p.atmosphereLight)
    : p.atmosphereLight;
  if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = phone ? false : p.sky;
  viewer.scene.fog.enabled = phone ? false : p.fog;
  viewer.scene.globe.showGroundAtmosphere = phone ? false : p.groundAtmosphere;
}

export function presenceContract() {
  return {
    kit: PRESENCE_KIT,
    bar: PRESENCE_BAR,
    ref: PRESENCE_REF,
    engine: "cesium",
    not: [...PRESENCE_STOP],
    surfaces: PRESENCE_SURFACES,
    score_fields: [...PRESENCE_SCORE_FIELDS],
    anl_writes: "PRESENCE-SCORE.md",
    dom: {
      shell: "[data-presence=world]",
      surfaces: "[data-presence-surface]",
    },
  };
}
