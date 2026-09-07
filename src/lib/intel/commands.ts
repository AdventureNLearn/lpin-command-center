import type { CommandAction, LayerId, SceneId, StyleId } from "./types";
import { PRESET_STATIONS } from "./radio";
import { matchKeptDesk } from "@/lib/kept/desks";
import { PROJECT_KINDS } from "@/lib/permit/playbooks";
import { matchLinCommand } from "@/lib/lin/network";
import { parseResearchCommand } from "@/lib/lin/session";
import { parseWorkbookCommand } from "@/lib/lin/workbook";

const LAYERS: { re: RegExp; id: LayerId }[] = [
  { re: /military|mil(?:itary)? (?:ads-?b|flights?|traffic)/i, id: "military" },
  { re: /flights?|aircraft|planes?|ads-?b/i, id: "flights" },
  { re: /vessels?|ships?|ais|maritime/i, id: "vessels" },
  { re: /satellites?|orbit/i, id: "satellites" },
  { re: /earthquakes?|seismic|quakes?/i, id: "earthquakes" },
  { re: /fires?|wildfires?|firms/i, id: "fires" },
  { re: /launches?|space missions?|rockets?/i, id: "launches" },
  { re: /legislatures?|\bleg\b|kept harvest/i, id: "legislatures" },
  { re: /permits?|\bahj\b|permit harbor/i, id: "permits" },
  { re: /jobsites?|\bclaims?\b/i, id: "jobsite" },
  { re: /insind|inspection index|\binspections?\b/i, id: "insind" },
];

const STYLES: { re: RegExp; style: StyleId }[] = [
  { re: /\b(normal|optical|daylight|reset style)\b/i, style: "normal" },
  { re: /\b(crt|retro|scanline)\b/i, style: "crt" },
  { re: /\b(nvg|night vision|green)\b/i, style: "nvg" },
  { re: /\b(flir|thermal|ironbow)\b/i, style: "flir" },
  { re: /\b(noir|black and white|mono)\b/i, style: "noir" },
  { re: /\b(snow|winter|ice)\b/i, style: "snow" },
];

const SCENES: { re: RegExp; id: SceneId }[] = [
  { re: /orbital watch|show me space|space missions/i, id: "orbital" },
  { re: /night watch|night vision over/i, id: "night" },
  { re: /fire line|show me fires|wildfire/i, id: "fire" },
];

export function parseCommand(raw: string): CommandAction {
  const text = raw.trim();
  if (!text) return { type: "unknown", text };

  if (/^(reset|home|full globe|zoom out|globe view)\b/i.test(text)) {
    return { type: "reset" };
  }
  if (/\b(pause radio|stop radio|radio off|mute radio)\b/i.test(text)) {
    return { type: "radio", on: false };
  }
  if (/\b(next station|skip station|radio next)\b/i.test(text)) {
    return { type: "radio", id: "next", on: true };
  }
  if (/\b(previous station|last station|radio back)\b/i.test(text)) {
    return { type: "radio", id: "prev", on: true };
  }
  for (const st of PRESET_STATIONS) {
    const names = [st.name, st.id, ...(st.aliases ?? [])]
      .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .filter((n) => n.length >= 3);
    const nameRe = new RegExp(`\\b(${names.join("|")})\\b`, "i");
    if (nameRe.test(text) && /\b(play|put on|tune|radio|spin)\b/i.test(text)) {
      return { type: "radio", id: st.id, on: true };
    }
  }
  if (/^(play |put on |spin )?(some )?(ccr|creedence)$/i.test(text)) {
    return { type: "radio", id: "ccr", on: true };
  }
  if (/^(radio on|play radio|open radio|tuner)\b/i.test(text)) {
    return { type: "radio", on: true };
  }
  if (/\b(next contact|next aircraft|next plane)\b/i.test(text)) {
    return { type: "next" };
  }
  if (/\b(enter )?cockpit\b/i.test(text) && !/\bexit\b/i.test(text)) {
    return { type: "cockpit", on: true };
  }
  if (/\b(exit cockpit|leave cockpit|map view)\b/i.test(text)) {
    return { type: "cockpit", on: false };
  }
  if (/\b(hide hud|hud off)\b/i.test(text)) return { type: "hud", on: false };
  if (/\b(show hud|hud on)\b/i.test(text)) return { type: "hud", on: true };
  if (/\b(hide corpus|close corpus|corpus off)\b/i.test(text)) return { type: "corpus", on: false };
  if (/^(corpus)$/i.test(text) || /\b(show corpus|open corpus|corpus on|intel corpus)\b/i.test(text)) {
    return { type: "corpus", on: true };
  }
  if (/^(show streams|open streams|streams)$/i.test(text)) return { type: "streams", on: true };
  if (/^(hide streams|close streams|streams off)$/i.test(text)) return { type: "streams", on: false };
  if (/^(pin stream|pin to streams)$/i.test(text)) return { type: "streamPin", on: true };
  if (/^(unpin stream|unpin from streams)$/i.test(text)) return { type: "streamPin", on: false };
  if (/^(show method|open method|method|pipeline|open pipeline|show pipeline)$/i.test(text)) {
    return { type: "method", on: true };
  }
  if (/^(hide method|close method|method off)$/i.test(text)) return { type: "method", on: false };
  if (/\b(close desk|hide desk|desk off|close drawers?)\b/i.test(text)) {
    return { type: "desk", on: false };
  }
  const wb = parseWorkbookCommand(text);
  if (wb === "open") return { type: "workbook" };
  if (wb && typeof wb === "object") return { type: "workbook", country: wb.country, industry: wb.industry };
  const research = parseResearchCommand(text);
  if (research) return { type: "research", topic: research };
  if (/^(run lanes|show lanes|open lanes|arm lanes|lanes)$/i.test(text)) return { type: "lanes" };
  if (/^(open guide|show guide|instruction guide|how to use)$/i.test(text)) {
    return { type: "guide" };
  }
  if (/^(show fifty|open fifty)$/i.test(text)) return { type: "desk", on: true, system: "lin", id: "fifty" };
  if (/^(hide fifty)$/i.test(text)) return { type: "desk", on: false };
  if (/^(show opencells|show open cells)$/i.test(text)) {
    return { type: "desk", on: true, system: "lin", id: "opencells" };
  }
  if (/^(hide opencells|hide open cells)$/i.test(text)) return { type: "desk", on: false };
  if (/\bopen (legislature|kept) desk\b/i.test(text) || /^(kept desk|legislature desk)$/i.test(text)) {
    return { type: "desk", on: true, system: "kept" };
  }
  if (/^(open )?(building|permit|ahj) desk$/i.test(text)) {
    return { type: "desk", on: true, system: "permit" };
  }
  const jobOpen = text.match(/^(?:open )?(jobsite|claims)(?: desk)?(?:\s+(.+))?$/i);
  if (jobOpen && !/^(show|hide|enable|disable|turn)\b/i.test(text)) {
    const typed = jobOpen[2]?.trim() ?? "";
    const id = typed || (jobOpen[1].toLowerCase() === "claims" ? "claims" : "");
    return { type: "desk", on: true, system: "jobsite", id };
  }
  const insOpen = text.match(/^(?:open )?(?:inspection|insind)(?: desk)?(?:\s+(.+))?$/i);
  if (insOpen && !/^(show|hide|enable|disable|turn)\b/i.test(text)) {
    return { type: "desk", on: true, system: "insind", id: insOpen[1]?.trim() ?? "" };
  }
  const lin = matchLinCommand(text);
  if (lin) {
    return { type: "desk", on: true, system: "lin", id: lin.id };
  }
  const restAhj = text.match(/^find rest ahj in\s+(.+)$/i);
  if (restAhj?.[1]) return { type: "permitSearch", q: restAhj[1].trim(), rest: true };
  const ahjIn = text.match(/^find ahj in\s+(.+)$/i);
  if (ahjIn?.[1]) return { type: "permitSearch", q: ahjIn[1].trim() };
  const bldg = text.match(/^building desk\s+(.+)$/i);
  if (bldg?.[1]) return { type: "permitSearch", q: bldg[1].trim() };
  const sits = text.match(
    /^(?:who sits(?: in)?|who's in|who is in|tell me about|look up)\s+(.+)$/i,
  );
  if (sits?.[1]) {
    const desk = matchKeptDesk(sits[1]);
    if (desk) return { type: "keptOpen", iso2: desk.iso2 };
  }
  const score = text.match(/^score the sitting in\s+(.+)$/i);
  if (score?.[1]) {
    const desk = matchKeptDesk(score[1]);
    if (desk) return { type: "keptOpen", iso2: desk.iso2 };
    return { type: "unknown", text };
  }
  const chamber = text.match(/^take me to the chamber in\s+(.+)$/i);
  if (chamber?.[1]) {
    const desk = matchKeptDesk(chamber[1]);
    if (desk) return { type: "keptOpen", iso2: desk.iso2 };
    return { type: "unknown", text };
  }
  const cmp = text.match(/^compare\s+(.+?)\s+and\s+(.+)$/i);
  if (cmp?.[1] && cmp[2]) {
    const a = matchKeptDesk(cmp[1]);
    const b = matchKeptDesk(cmp[2]);
    if (a && b) return { type: "keptCompare", a: a.iso2, b: b.iso2 };
    return { type: "unknown", text };
  }
  const kindAlt = PROJECT_KINDS.map((k) => k.id.replace(/-/g, "[- ]?")).join("|");
  const play = text.match(new RegExp(`^(${kindAlt})\\s+permit playbook$`, "i"));
  if (play?.[1]) {
    const kind = PROJECT_KINDS.find((k) => k.id.replace(/-/g, "") === play[1].toLowerCase().replace(/[-\s]/g, ""));
    if (kind) return { type: "permitPlaybook", kind: kind.id };
  }
  const opened = text.match(/^open\s+(.+)$/i);
  if (
    opened?.[1] &&
    !/^(radio|corpus|legislature desk|kept desk|building desk|permit desk|ahj desk|jobsite desk|claims desk|jobsite|claims|inspection desk|insind|streams|method|pipeline|network|lin|legal|regulatory|technical|jurisdictional|operational|engineering|commerce|finance|governance|fifty|opencells|open cells|command center)\b/i.test(
      opened[1],
    )
  ) {
    const desk = matchKeptDesk(opened[1]);
    if (desk) return { type: "keptOpen", iso2: desk.iso2 };
  }
  if (/^open\b/i.test(text)) return { type: "unknown", text };
  if (/\b(detection on|detect on|show detections?)\b/i.test(text)) {
    return { type: "detection", on: true };
  }
  if (/\b(detection off|detect off)\b/i.test(text)) return { type: "detection", on: false };

  const layerOn = /\b(on|enable|show|turn on|light up)\b/i.test(text);
  const layerOff = /\b(off|disable|hide|turn off)\b/i.test(text);
  if (layerOn || layerOff) {
    if (/legislatures?|\bleg\b|kept harvest/i.test(text) && !/\bdesk\b/i.test(text)) {
      return { type: "layer", id: "legislatures", on: layerOn };
    }
    if (/permits?|\bahj\b|permit harbor/i.test(text)) {
      return { type: "layer", id: "permits", on: layerOn };
    }
    if (/jobsites?|\bclaims?\b/i.test(text) && !/\bdesk\b/i.test(text)) {
      return { type: "layer", id: "jobsite", on: layerOn };
    }
    if (/insind|inspection index|\binspections?\b/i.test(text) && !/\bdesk\b/i.test(text)) {
      return { type: "layer", id: "insind", on: layerOn };
    }
  }

  for (const sc of SCENES) {
    if (sc.re.test(text)) return { type: "scene", id: sc.id };
  }

  for (const s of STYLES) {
    if (s.re.test(text) && /style|switch|set|mode|vision|to\b/i.test(text)) {
      return { type: "style", style: s.style };
    }
    if (s.re.test(text) && text.split(/\s+/).length <= 3) {
      return { type: "style", style: s.style };
    }
  }

  const on = /\b(on|enable|show|turn on|light up)\b/i.test(text);
  const off = /\b(off|disable|hide|turn off)\b/i.test(text);
  if (on || off) {
    for (const l of LAYERS) {
      if (l.re.test(text)) return { type: "layer", id: l.id, on };
    }
  }

  if (/\bhow many\b/i.test(text)) {
    if (/flight|plane|aircraft/i.test(text)) return { type: "count", kind: "flights" };
    if (/ship|vessel/i.test(text)) return { type: "count", kind: "vessels" };
    if (/sat/i.test(text)) return { type: "count", kind: "satellites" };
  }

  if (/\b(iss|international space station)\b/i.test(text) && /\b(track|follow|find)\b/i.test(text)) {
    return { type: "trackNearest", kind: "iss" };
  }
  if (/\btrack (the )?iss\b/i.test(text) || /^iss$/i.test(text)) {
    return { type: "trackNearest", kind: "iss" };
  }
  if (/\b(nearest|closest).*(ship|vessel)|track.*(ship|vessel)/i.test(text)) {
    return { type: "trackNearest", kind: "vessel" };
  }
  if (/\b(nearest|closest).*(sat)|track.*(sat)/i.test(text)) {
    return { type: "trackNearest", kind: "satellite" };
  }
  if (/\b(nearest|track).*(aircraft|flight|plane)|select the nearest/i.test(text)) {
    return { type: "trackNearest", kind: "flight" };
  }

  // Bar fly-ask only. show me {q} is not flyTo. leftover open already returned unknown.
  const go = text.match(
    /^(?:take me to|fly to|go (?:to|there)|show me on the globe|jump to|navigate to|bring (?:me|us) to)\s+(.+)$/i,
  );
  if (go?.[1]) return { type: "flyTo", q: go[1].replace(/[?.!]+$/, "").trim() };
  if (/^show me\b/i.test(text)) return { type: "unknown", text };

  const coord = text.match(/(-?\d{1,3}\.\d+)\s*[, ]\s*(-?\d{1,3}\.\d+)/);
  if (coord) {
    return { type: "flyToCoord", lat: Number(coord[1]), lon: Number(coord[2]) };
  }

  if (/^(tokyo|austin|lax|jfk|heathrow|singapore|dubai|sydney|iss|new york|nyc)$/i.test(text)) {
    return { type: "flyTo", q: text };
  }

  return { type: "unknown", text };
}
