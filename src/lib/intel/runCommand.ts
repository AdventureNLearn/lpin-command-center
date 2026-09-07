import { parseCommand } from "./commands";
import { playScene } from "./scenes";
import { flash, useIntel } from "./store";
import { findStation, useRadio } from "./radio";
import { useComms } from "./comms";
import { interpretCommand } from "@/lib/feeds/world";
import {
  LAYER_META,
  type CommandAction,
  type LayerId,
  type SceneId,
  type StyleId,
  type VoiceAction,
} from "./types";
import { searchAhj } from "@/lib/permit/search-lite";
import { searchRestAhj } from "@/lib/permit/rest-search";
import { keptDeskByIso } from "@/lib/kept/desks";
import { STREAM_CAP } from "@/lib/kept/streams";
import { askedToMove } from "./insight";
import { linDeskById } from "@/lib/lin/network";
import { SENSE_LANES } from "@/lib/lin/protocol";
import { sealInsight } from "./honesty";
import { useLin } from "@/lib/lin/session";
import { useWorkbook } from "@/lib/lin/workbook";

function isLayer(v: unknown): v is LayerId {
  return typeof v === "string" && v in LAYER_META;
}

function isStyle(v: unknown): v is StyleId {
  return (
    v === "normal" ||
    v === "crt" ||
    v === "nvg" ||
    v === "flir" ||
    v === "noir" ||
    v === "snow"
  );
}

function isScene(v: unknown): v is SceneId {
  return v === "orbital" || v === "night" || v === "fire";
}

function fromUnknown(raw: VoiceAction): CommandAction {
  const type = raw.type || "unknown";
  if (type === "flyTo") return { type: "flyTo", q: String(raw.q ?? "") };
  if (type === "trackNearest") {
    const kind = raw.kind;
    if (kind === "flight" || kind === "vessel" || kind === "satellite" || kind === "iss") {
      return { type: "trackNearest", kind };
    }
  }
  if (type === "cockpit") return { type: "cockpit", on: Boolean(raw.on) };
  if (type === "style" && isStyle(raw.style)) return { type: "style", style: raw.style };
  if (type === "layer" && isLayer(raw.id)) return { type: "layer", id: raw.id, on: Boolean(raw.on) };
  if (type === "reset") return { type: "reset" };
  if (type === "hud") return { type: "hud", on: Boolean(raw.on) };
  if (type === "detection") return { type: "detection", on: Boolean(raw.on) };
  if (type === "scene" && isScene(raw.id)) return { type: "scene", id: raw.id };
  if (type === "next") return { type: "next" };
  if (type === "radio") {
    return { type: "radio", id: typeof raw.id === "string" ? raw.id : undefined, on: raw.on };
  }
  if (type === "corpus") return { type: "corpus", on: Boolean(raw.on) };
  if (type === "permitSearch") {
    return { type: "permitSearch", q: String(raw.q ?? ""), rest: Boolean(raw.kind === "rest" || raw.on) };
  }
  if (type === "keptOpen") return { type: "keptOpen", iso2: String(raw.id ?? raw.q ?? "") };
  if (type === "keptCompare") {
    const parts = String(raw.q ?? "").split(",");
    return { type: "keptCompare", a: parts[0] ?? "", b: parts[1] ?? "" };
  }
  if (type === "permitPlaybook") return { type: "permitPlaybook", kind: String(raw.id ?? raw.q ?? "") };
  if (type === "streams") return { type: "streams", on: Boolean(raw.on) };
  if (type === "streamPin") return { type: "streamPin", on: Boolean(raw.on), iso2: typeof raw.id === "string" ? raw.id : undefined };
  if (type === "method") return { type: "method", on: Boolean(raw.on) };
  if (type === "workbook") {
    return { type: "workbook", country: String(raw.q ?? raw.id ?? ""), industry: String(raw.kind ?? "") };
  }
  if (type === "research") return { type: "research", topic: String(raw.q ?? "") };
  if (type === "lanes") return { type: "lanes" };
  if (type === "guide") return { type: "guide" };
  if (type === "desk") {
    if (raw.on === false) return { type: "desk", on: false };
    const system =
      raw.id === "permit" || raw.kind === "permit"
        ? "permit"
        : raw.id === "jobsite" || raw.kind === "jobsite"
          ? "jobsite"
          : raw.id === "insind" || raw.kind === "insind"
            ? "insind"
            : raw.id === "lin" || raw.kind === "lin"
              ? "lin"
              : "kept";
    const id = typeof raw.q === "string" ? raw.q : "";
    return { type: "desk", on: true, system, id };
  }
  if (type === "count" && (raw.kind === "flights" || raw.kind === "vessels" || raw.kind === "satellites")) {
    return { type: "count", kind: raw.kind };
  }
  return { type: "unknown", text: String(raw.q ?? "") };
}

/** Radio picker yields. Civic desks never close Grok comms (Insight Open the file). */
function hushPicker() {
  useRadio.getState().setPicker(false);
}

export async function runCommand(text: string) {
  let action = parseCommand(text);
  if (action.type === "unknown") {
    const skipAiFly = /^show me\b/i.test(text) && !/on the globe/i.test(text);
    if (!skipAiFly) {
      try {
        const ai = await interpretCommand({ data: { text } });
        if (ai.ok) action = fromUnknown(ai.action);
      } catch {
        /* local only */
      }
    }
  }
  await applyAction(action, text);
}

export async function applyAction(action: CommandAction, raw = "") {
  const s = useIntel.getState();
  const engine = s.engine;
  if (action.type === "radio") {
    if (action.on === false) {
      useRadio.getState().pause();
      flash("Radio off");
    } else if (action.id === "next") {
      useRadio.getState().next();
      const id = useRadio.getState().stationId;
      const st = findStation(id, useRadio.getState().custom);
      flash(st ? `${st.name} on the wire` : "Next station");
    } else if (action.id === "prev") {
      useRadio.getState().prev();
      const id = useRadio.getState().stationId;
      const st = findStation(id, useRadio.getState().custom);
      flash(st ? `${st.name} on the wire` : "Previous station");
    } else {
      useRadio.getState().play(action.id);
      const id = action.id ?? useRadio.getState().stationId;
      const st = findStation(id, useRadio.getState().custom);
      flash(st ? `${st.name} on the wire` : "Radio on");
    }
    return;
  }
  if (action.type === "corpus") {
    useIntel.getState().setCorpusOpen(action.on);
    if (action.on) {
      useComms.getState().setOpen(false);
      useRadio.getState().setPicker(false);
    }
    flash(action.on ? "Corpus" : "Corpus closed");
    return;
  }
  if (action.type === "workbook") {
    const country = action.country ?? "";
    const industry = action.industry ?? "";
    if (country || industry) {
      const err = useWorkbook.getState().openFacets(country, industry);
      if (err) {
        flash(err);
        return;
      }
    }
    useIntel.getState().setDesk({ system: "lin", id: "workbook" });
    const w = useWorkbook.getState();
    useIntel.getState().setInsight(
      sealInsight({
        id: "lin-workbook",
        title: w.title || "Research workbook",
        body: "Country and industry stay on separate tabs. Law, permitting, trades, regulations, funding, political, and corporate are separate lenses — not one score. Dirt is not shingles. Paste an official URL and the smallest quote. Blank means we do not know yet.",
        system: "lin",
        desk: { system: "lin", id: "workbook" },
        q: w.title || undefined,
        source: "Local workbook · delayed",
      }),
    );
    hushPicker();
    flash(w.title ? `Workbook · ${w.title}` : "Workbook");
    return;
  }
  if (action.type === "research") {
    useLin.getState().setTopic(action.topic);
    useIntel.getState().setDesk({ system: "lin", id: "network" });
    useIntel.getState().setInsight(
      sealInsight({
        id: `lin-research`,
        title: action.topic,
        body: "Your question is on the board. Open a desk. Add an official link before you treat anything as proven.",
        system: "lin",
        desk: { system: "lin", id: "network" },
        q: action.topic,
        source: "Local network · delayed",
      }),
    );
    hushPicker();
    flash(`Research · ${action.topic}`);
    return;
  }
  if (action.type === "lanes") {
    const lin = useLin.getState();
    if (!lin.armed.length) lin.armAll(SENSE_LANES.map((l) => l.id));
    useIntel.getState().setDesk({ system: "lin", id: "network" });
    hushPicker();
    flash("Several angles");
    return;
  }
  if (action.type === "guide") {
    useIntel.getState().setGuideOpen(true);
    hushPicker();
    flash("Instruction guide");
    return;
  }
  if (action.type === "desk") {
    if (action.on) {
      const topic = useLin.getState().topic;
      let id = action.id ?? "";
      if (action.system === "permit" && !id && topic) id = `search:${topic}`;
      if (action.system === "jobsite" && !id && topic) id = topic;
      if (action.system === "insind" && !id && topic) id = topic;
      useIntel.getState().setDesk({ system: action.system, id });
      hushPicker();
      if (action.system === "lin") {
        const d = linDeskById(id);
        useIntel.getState().setInsight(
          sealInsight({
            id: `lin-${d?.id ?? "network"}`,
            title: topic || d?.title || "LPIN Intelligence Network",
            body: topic
              ? `${d?.kicker ?? "Board"}: “${topic}”. Add an official link before you treat it as proven.`
              : (d?.field ?? "Open a desk. Leave blanks blank. You keep the call."),
            system: "lin",
            desk: { system: "lin", id: d?.id ?? "network" },
            q: topic || undefined,
            source: "Local network · delayed",
          }),
        );
        flash(d ? `${d.kicker} desk` : "Network desk");
      } else {
        flash(
          action.system === "kept"
            ? "Legislature desk"
            : action.system === "jobsite"
              ? "Jobsite desk"
              : action.system === "insind"
                ? "Inspection desk"
                : "Building desk",
        );
      }
    } else {
      useIntel.getState().setDesk(null);
      flash("Desk closed");
    }
    return;
  }
  if (action.type === "permitSearch") {
    if (action.rest) {
      useIntel.getState().setPermitRest(true);
      const restHits = await searchRestAhj(action.q);
      const exact = restHits.find((h) => h.name.toLowerCase() === action.q.toLowerCase());
      const pick = restHits.length === 1 ? restHits[0] : exact;
      const id = pick ? pick.id : `search:${action.q}`;
      useIntel.getState().setDesk({ system: "permit", id });
      hushPicker();
      flash(
        pick
          ? `${pick.name}, ${pick.state} · Rest provisional`
          : `Rest AHJ · ${restHits.length} hits`,
      );
      if (askedToMove(raw) && pick && engine) void engine.lookupPlace(`${pick.name} ${pick.state}`);
      return;
    }
    const hits = searchAhj(action.q);
    const exact = hits.find((h) => h.name.toLowerCase() === action.q.toLowerCase());
    const pick = hits.length === 1 ? hits[0] : exact;
    const id = pick ? pick.id : `search:${action.q}`;
    useIntel.getState().setDesk({ system: "permit", id });
    hushPicker();
    flash(pick ? `${pick.name}, ${pick.state}` : `AHJ search · ${hits.length} hits`);
    if (askedToMove(raw) && pick && engine) void engine.lookupPlace(`${pick.name} ${pick.state}`);
    return;
  }
  if (action.type === "keptOpen") {
    const desk = keptDeskByIso(action.iso2);
    useIntel.getState().setLayer("legislatures", { on: true, freshness: "delayed" });
    useIntel.getState().setDesk({ system: "kept", id: action.iso2 });
    hushPicker();
    flash(desk ? desk.name : action.iso2);
    if (askedToMove(raw) && desk && engine) engine.flyTo(desk.lon, desk.lat, 1_200_000);
    return;
  }
  if (action.type === "keptCompare") {
    useIntel.getState().setDesk({ system: "kept", id: `compare:${action.a}:${action.b}` });
    hushPicker();
    flash("Compare · sourced holes only");
    return;
  }
  if (action.type === "permitPlaybook") {
    useIntel.getState().setDesk({ system: "permit", id: `playbook:${action.kind}` });
    hushPicker();
    flash(`${action.kind} playbook`);
    return;
  }
  if (action.type === "streams") {
    useIntel.getState().setDesk(action.on ? { system: "kept", id: "streams" } : null);
    if (action.on) hushPicker();
    flash(action.on ? "Streams" : "Streams closed");
    return;
  }
  if (action.type === "method") {
    useIntel.getState().setDesk(action.on ? { system: "kept", id: "method" } : null);
    if (action.on) hushPicker();
    flash(action.on ? "Method" : "Method closed");
    return;
  }
  if (action.type === "streamPin") {
    const iso = action.iso2 || (s.desk?.system === "kept" && s.desk.id.length === 2 ? s.desk.id : "");
    if (!iso || !keptDeskByIso(iso)) {
      flash("Open a country desk first");
      return;
    }
    if (action.on) {
      const pins = useIntel.getState().streamPins;
      if (pins.includes(iso.toLowerCase())) {
        flash(`Already pinned ${iso}`);
        return;
      }
      if (pins.length >= STREAM_CAP) {
        flash("Eight pins is the cap");
        return;
      }
      useIntel.getState().pinStream(iso);
      flash(`Pinned ${iso} (${useIntel.getState().streamPins.length}/8)`);
    } else {
      useIntel.getState().unpinStream(iso);
      flash(`Unpinned ${iso}`);
    }
    return;
  }
  if (!engine) return;

  switch (action.type) {
    case "reset":
      engine.resetGlobe();
      flash("Full globe");
      break;
    case "flyTo":
      await engine.lookupPlace(action.q);
      break;
    case "flyToCoord":
      engine.flyTo(action.lon, action.lat, action.height ?? 80_000);
      if (action.name) s.setPlace(action.name);
      break;
    case "style":
      engine.setStyle(action.style);
      flash(`Style · ${action.style.toUpperCase()}`);
      break;
    case "layer":
      s.setLayer(action.id, {
        on: action.on,
        freshness: action.on ? LAYER_META[action.id].freshness : "off",
      });
      flash(`${LAYER_META[action.id].label} ${action.on ? "on" : "off"}`);
      break;
    case "trackNearest": {
      const need: LayerId =
        action.kind === "vessel" ? "vessels" : action.kind === "flight" ? "flights" : "satellites";
      if (!s.layers[need].on) {
        s.setLayer(need, { on: true, freshness: LAYER_META[need].freshness });
        await new Promise((r) => setTimeout(r, 900));
      }
      const ok = engine.trackNearest(action.kind);
      flash(ok ? `Tracking nearest ${action.kind}` : `No ${action.kind} in catalog yet`);
      break;
    }
    case "cockpit":
      if (action.on && !s.tracked) {
        s.setLayer("flights", { on: true, freshness: "live" });
        await new Promise((r) => setTimeout(r, 800));
        engine.trackNearest("flight");
      }
      engine.enterCockpit(action.on);
      flash(action.on ? "Cockpit" : "Map view");
      break;
    case "hud":
      s.setHud(action.on);
      break;
    case "detection":
      s.setDetection(action.on);
      flash(action.on ? "Detection on" : "Detection off");
      break;
    case "scene":
      await playScene(action.id);
      break;
    case "next":
      engine.nextContact();
      break;
    case "count": {
      const n =
        s.layers[
          action.kind === "flights" ? "flights" : action.kind === "vessels" ? "vessels" : "satellites"
        ].count;
      flash(`${n} ${action.kind} currently drawn`);
      break;
    }
    case "unknown":
      flash(raw ? `Grok shrugged at “${raw}”. Name a country, a state, or a layer.` : "Grok shrugged.");
      break;
  }
}
