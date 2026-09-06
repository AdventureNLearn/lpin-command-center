import { keptCountLine, keptDeskByIso, matchKeptDesk, type KeptDesk } from "@/lib/kept/desks";
import { FEATURED_COORDS } from "@/lib/permit/permit-pins";
import { pickAhjCore } from "@/lib/permit/search-lite";
import { JOBSITE_HONESTY, lookupPack } from "@/lib/jobsite/packs";
import { INSIND_EMPTY, INSIND_HONESTY, lookupInsind } from "@/lib/insind/lookup";
import { PRESETS } from "./locations";
import { askedToMove, type Insight } from "./insight";
import { LAYER_META, type LayerId } from "./types";

const LEG_H = 1_200_000;
const CITY_H = 80_000;
const JOBSITE_WORDS = /\b(?:jobsite|claims?\s+desk|claim\s+pack)\b/i;
const INSIND_WORDS = /\b(?:insind|inspection index|inspection desk|usdot|fmcsa)\b/i;

function nid() {
  return `ins-${Date.now().toString(36)}`;
}

function strip(text: string): string {
  return text
    .trim()
    .replace(/[?.!]+$/g, "")
    .replace(
      /^(what's over|what is over|whats over|what's in|what is in|whats in|who sits in|who sits|who's in|who is in|tell me about|anything (?:on|over|in)|how about|look (?:at|up)|score the sitting in|take me to the chamber in)\s+/i,
      "",
    )
    .replace(/^(in|at|on)\s+/i, "")
    .trim();
}

/** Comms leftover `in`/`it` is an English particle, not India/Italy iso2. */
function isParticleIso(q: string): boolean {
  return /^(in|it)$/i.test(q);
}

function keptRosterLine(kept: KeptDesk): string {
  const line = keptCountLine(kept);
  if (line === "no sourced roster") return "No sitting names on disk yet";
  if (kept.seats <= 0) return `${kept.named} sitting names as filed`;
  if (kept.named === kept.seats) return `${kept.named} sitting names as filed`;
  return `${line} — vacancies not invented`;
}

function keptInsight(kept: KeptDesk): Insight {
  return {
    id: nid(),
    title: kept.name,
    body: `${kept.chamber} in ${kept.capitalName}. ${keptRosterLine(kept)}. Delayed public register, not a live roll. Look here if you want the globe to follow. Open the file to read names — empty means we do not have them.`,
    system: "kept",
    q: kept.name,
    lat: kept.lat,
    lon: kept.lon,
    height: LEG_H,
    layer: "legislatures",
    desk: { system: "kept", id: kept.iso2 },
    source: "Kept kit on disk · delayed",
  };
}

const INTEL_LAYERS = {
  flights:
    "Public aircraft positions. Not for navigation. We do not follow a plane unless you pick one.",
  satellites: "Public satellite orbits. Not classified. Hover peek is separate from this card.",
  vessels: "Shipping lanes on this globe. Modeled, not a live naval plot.",
  earthquakes: "Quake points from a public feed. Not an alert service.",
  fires: "Fire detections from a public feed. Not a dispatch board.",
} as const;

function intelLayerInsight(layer: keyof typeof INTEL_LAYERS): Insight {
  const meta = LAYER_META[layer as LayerId];
  return {
    id: nid(),
    title: meta.label,
    body: `${INTEL_LAYERS[layer]} ${meta.source} · ${meta.freshness}. Show on the map if you want.`,
    system: "intel",
    layer,
    source: `${meta.source} · ${meta.freshness}`,
  };
}

function jobsiteLocality(q: string): string {
  return q
    .replace(JOBSITE_WORDS, " ")
    .replace(/\b(?:claims?|desk|pack)\b/gi, " ")
    .replace(/^(in|at|on)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Local card from user text. Only the 33 on-disk Kept kits. No auto-fly. */
export function insightFromUserText(text: string): Insight | null {
  if (!text.trim() || askedToMove(text)) return null;
  const q = strip(text);
  if (q.length < 2) return null;

  if (INSIND_WORDS.test(text)) {
    const q2 = strip(text).replace(INSIND_WORDS, " ").replace(/\s+/g, " ").trim();
    const hit = lookupInsind(q2.length >= 3 ? q2 : "lookup");
    return {
      id: nid(),
      title: "Inspection Index",
      body: `${INSIND_EMPTY} Type a VIN, plate, USDOT, MC, or company name. Zero pins at orbit. Not a score. Look here does not fly a VIN.`,
      system: "insind",
      desk: { system: "insind", id: hit?.query ?? "" },
      layer: "insind",
      source: INSIND_HONESTY,
    };
  }

  if (JOBSITE_WORDS.test(text)) {
    const pack = lookupPack(jobsiteLocality(q));
    const place = pack?.locality ?? "";
    return {
      id: nid(),
      title: place || "Jobsite desk",
      body: pack
        ? `We don't have a claims pack for this place yet. Open the file and the list is empty — not a complete picture. No pins, no invented rows. Look here uses the typed place, not a jobsite pin.`
        : "Type a place you care about. We don't have that pack yet. Nothing loads until you do.",
      system: "jobsite",
      q: place || undefined,
      desk: place ? { system: "jobsite", id: place } : undefined,
      layer: "jobsite",
      source: JOBSITE_HONESTY,
    };
  }

  if (isParticleIso(q)) return null;

  // Comms tokyo is the JP kept desk. Command-bar tokyo stays Narita (nrt).
  if (/^tokyo(?:\s+japan)?$/i.test(q)) {
    const jp = keptDeskByIso("jp");
    if (jp) return keptInsight(jp);
  }

  const kept = matchKeptDesk(q);
  if (kept) return keptInsight(kept);

  const pick = pickAhjCore(q);
  if (pick) {
    const pt = FEATURED_COORDS[pick.id];
    return {
      id: nid(),
      title: `${pick.name}, ${pick.state}`,
      body: `${pick.ahjName} is a catalog row, not a parcel pin and not a login. Portal not verified. Look here if you want. Confirm with the local office before you file.`,
      system: "permit",
      q: `${pick.name} ${pick.state}`,
      lat: pt?.lat,
      lon: pt?.lon,
      height: CITY_H,
      layer: "permits",
      desk: { system: "permit", id: pick.id },
      source: "Permit Harbor catalog · delayed",
    };
  }

  if (/\biss\b|international space station/i.test(text)) {
    return {
      id: nid(),
      title: "ISS",
      body: "International Space Station. Public tracking feed — not navigation, not classified. Look here follows the station. No auto-track.",
      system: "intel",
      q: "ISS",
      layer: "satellites",
      source: "Live intel · public feeds",
    };
  }

  if (/\b(planes?|flights?|satellites?|ships?|vessels?|quakes?|fires?)\b/i.test(text)) {
    const layer = /\bsat/i.test(text)
      ? "satellites"
      : /\b(ship|vessel)/i.test(text)
        ? "vessels"
        : /\bquake/i.test(text)
          ? "earthquakes"
          : /\bfire/i.test(text)
            ? "fires"
            : "flights";
    return intelLayerInsight(layer);
  }

  const low = q.toLowerCase();
  const preset = PRESETS.find(
    (p) => p.name.toLowerCase() === low || p.id === low || (low.length >= 4 && p.name.toLowerCase().includes(low)),
  );
  if (preset && preset.kind !== "orbit") {
    if (preset.id === "nrt" && /^tokyo/i.test(low)) return null;
    return {
      id: nid(),
      title: preset.name,
      body: "A named place on this globe — not a legislature or building desk. Look here if you want to go. Optional.",
      system: "intel",
      q: preset.name,
      lat: preset.lat,
      lon: preset.lon,
      height: preset.height,
      source: "Grok comms · Look here optional",
    };
  }

  return null;
}
