import { create } from "zustand";
import { askGrok } from "@/lib/feeds/chat";
import { findStation, useRadio } from "./radio";
import { flash, useIntel } from "./store";
import { LAYER_META, type CommandAction, type LayerId } from "./types";
import type { GlobeContext } from "@/lib/feeds/chat";
import {
  askedToMove,
  insightFromFlyQuery,
  parseInsightTag,
  type Insight,
} from "./insight";
import { insightFromUserText } from "./insight-local";
import { parseCommand } from "./commands";

export type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  insights?: Insight[];
};

type CommsState = {
  open: boolean;
  pending: boolean;
  messages: ChatMsg[];
  draft: string;
  sent: number;
  setOpen: (v: boolean) => void;
  setDraft: (s: string) => void;
  send: (text?: string) => Promise<void>;
};

const GREETING: ChatMsg = {
  id: "greet",
  role: "assistant",
  text: "Ask in plain English. Planes, a country legislature, a building desk, the ISS. I will put a card on the globe. You press Look here if you want the map to follow — I will not yank it. Incomplete files stay empty. Radio is the other dial.",
};

function nid() {
  return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function snapshot(): GlobeContext {
  const s = useIntel.getState();
  const r = useRadio.getState();
  const st = findStation(r.stationId, r.custom);
  const tracked = s.tracked
    ? {
        kind: s.tracked.kind,
        name: s.tracked.name,
        meta: s.tracked.meta,
        lat: s.tracked.lat,
        lon: s.tracked.lon,
        altM: s.tracked.altM,
        heading: s.tracked.heading,
        speedMs: s.tracked.speedMs,
        source: s.tracked.source,
        freshness: s.tracked.freshness,
      }
    : null;
  const layers = (Object.keys(s.layers) as LayerId[]).map((id) => ({
    id,
    on: s.layers[id].on,
    count: s.layers[id].count,
    detail: s.layers[id].detail,
  }));
  return {
    place: s.placeName,
    style: s.style,
    cam: s.cam,
    tracked,
    weather: s.weather,
    layers,
    radio: st ? { station: st.name, playing: r.playing } : null,
  };
}

const LAYER_IDS: LayerId[] = [
  "flights",
  "military",
  "vessels",
  "satellites",
  "earthquakes",
  "fires",
  "launches",
  "legislatures",
  "permits",
  "jobsite",
  "insind",
];

/** Chat punches a layer only on show/hide. "show me" is fly-adjacent, not a layer ask. */
export function askedToToggleLayer(userText: string): boolean {
  if (/\bshow me\b/i.test(userText)) return false;
  return /\b(show|hide|enable|disable|turn on|turn off|light up|layer on|layer off)\b/i.test(userText);
}

function insightFromLayer(id: LayerId): Insight {
  const meta = LAYER_META[id];
  const system: Insight["system"] =
    id === "legislatures"
      ? "kept"
      : id === "permits"
        ? "permit"
        : id === "jobsite"
          ? "jobsite"
          : id === "insind"
            ? "insind"
            : "intel";
  const body =
    system === "intel"
      ? "Public feed. Show on the map if you want. I will not turn it on unless you asked."
      : "On-disk file. Show on the map or open the file. Incomplete stays empty.";
  return {
    id: `ins-${Date.now().toString(36)}`,
    title: meta.label,
    body,
    system,
    layer: id,
    source: `${meta.source} · ${meta.freshness}`,
  };
}

function stripFlyAsk(text: string): string {
  return text
    .replace(
      /^(?:please\s+)?(?:take me to|fly (?:me )?to|go to|go there(?:\s+to)?|jump to|navigate to|bring (?:me|us) to|show me on the globe)\s+/i,
      "",
    )
    .trim();
}

function flyAskAction(text: string): CommandAction | null {
  if (!askedToMove(text)) return null;
  const cmd = parseCommand(text);
  if (
    cmd.type === "flyTo" ||
    cmd.type === "trackNearest" ||
    cmd.type === "keptOpen" ||
    cmd.type === "flyToCoord"
  ) {
    return cmd;
  }
  return null;
}

function cardForAsk(text: string, action: CommandAction | null): Insight | null {
  if (action?.type === "keptOpen") {
    const fromIso = insightFromUserText(action.iso2);
    if (fromIso) return fromIso;
  }
  const stripped = stripFlyAsk(text);
  return (
    (stripped && stripped !== text ? insightFromUserText(stripped) : null) ??
    insightFromUserText(text) ??
    (action?.type === "flyTo" ? insightFromFlyQuery(action.q) : null)
  );
}

function insightFromTrackKind(kind: "flight" | "vessel" | "satellite" | "iss"): Insight {
  if (kind === "iss") {
    return {
      id: `ins-${Date.now().toString(36)}`,
      title: "ISS",
      body: "Live contact. Look here tracks the station. No auto-track.",
      system: "intel",
      q: "ISS",
      layer: "satellites",
      source: "Live intel · public feeds",
    };
  }
  const id: LayerId = kind === "vessel" ? "vessels" : kind === "flight" ? "flights" : "satellites";
  return insightFromLayer(id);
}

/** Stranger path: English asks that dark-comms can still card. No roast. No demo city. */
export function suggestionChips(): string[] {
  const s = useIntel.getState();
  const r = useRadio.getState();
  const chips: string[] = [];
  if (s.tracked) {
    chips.push(`What is on ${s.tracked.name}?`);
    if (s.tracked.kind === "flight" || s.tracked.kind === "military") {
      chips.push("How high is this plane?");
    }
    if (s.tracked.kind === "satellite") chips.push("How fast is this satellite?");
    if (s.tracked.kind === "earthquake") chips.push("What does the quake feed say?");
    if (s.tracked.kind === "fire") chips.push("What does the fire feed say?");
  } else if (s.placeName && s.placeName !== "Earth") {
    chips.push(`What's over ${s.placeName}?`);
    chips.push(`Anything flying over ${s.placeName}?`);
  } else {
    chips.push("What's over Japan?");
    chips.push("What's the ISS doing right now?");
    chips.push("Any planes up?");
  }
  if (!r.playing) chips.push("Put on Creedence.");
  return chips.slice(0, 4);
}

function parseTaggedAction(
  raw: string,
  userText: string,
): { text: string; action: CommandAction | null; insight: Insight | null } {
  const insighted = parseInsightTag(raw);
  let rest = insighted.text;
  const match = rest.match(/<<ACTION:(\{[\s\S]*?\})>>/);
  if (!match) return { text: rest.trim(), action: null, insight: insighted.insight };
  rest = rest.replace(match[0], "").trim();
  const text = rest;
  try {
    const o = JSON.parse(match[1]) as {
      type?: string;
      q?: string;
      kind?: string;
      on?: boolean;
      style?: string;
      id?: string;
    };
    const type = o.type ?? "";
    if (type === "flyTo" && o.q) {
      if (askedToMove(userText)) return { text, action: { type: "flyTo", q: o.q }, insight: insighted.insight };
      return { text, action: null, insight: insighted.insight ?? insightFromFlyQuery(o.q) };
    }
    if (type === "reset") {
      if (/\b(reset|home|full globe|zoom out|globe view)\b/i.test(userText)) {
        return { text, action: { type: "reset" }, insight: insighted.insight };
      }
      return { text, action: null, insight: insighted.insight };
    }
    if (type === "next") {
      if (/\bnext (contact|aircraft|plane)\b/i.test(userText)) {
        return { text, action: { type: "next" }, insight: insighted.insight };
      }
      return { text, action: null, insight: insighted.insight };
    }
    if (type === "cockpit") {
      if (/\b(cockpit|map view)\b/i.test(userText)) {
        return { text, action: { type: "cockpit", on: Boolean(o.on) }, insight: insighted.insight };
      }
      return { text, action: null, insight: insighted.insight };
    }
    if (
      type === "trackNearest" &&
      (o.kind === "flight" || o.kind === "vessel" || o.kind === "satellite" || o.kind === "iss")
    ) {
      if (askedToMove(userText) || /\b(track|lock|grab|follow)\b/i.test(userText)) {
        return { text, action: { type: "trackNearest", kind: o.kind }, insight: insighted.insight };
      }
      return {
        text,
        action: null,
        insight: insighted.insight ?? insightFromTrackKind(o.kind),
      };
    }
    if (
      type === "style" &&
      (o.style === "normal" ||
        o.style === "crt" ||
        o.style === "nvg" ||
        o.style === "flir" ||
        o.style === "noir" ||
        o.style === "snow")
    ) {
      return { text, action: { type: "style", style: o.style }, insight: insighted.insight };
    }
    if (type === "radio") {
      return {
        text,
        action: { type: "radio", id: typeof o.id === "string" ? o.id : undefined, on: o.on },
        insight: insighted.insight,
      };
    }
    if (type === "layer" && typeof o.id === "string" && LAYER_IDS.includes(o.id as LayerId)) {
      const id = o.id as LayerId;
      const on = Boolean(o.on);
      if (askedToToggleLayer(userText)) {
        return { text, action: { type: "layer", id, on }, insight: insighted.insight };
      }
      const insight = insighted.insight
        ? { ...insighted.insight, layer: insighted.insight.layer ?? id }
        : insightFromLayer(id);
      return { text, action: null, insight };
    }
    return { text, action: null, insight: insighted.insight };
  } catch {
    return { text, action: null, insight: insighted.insight };
  }
}

export const useComms = create<CommsState>((set, get) => ({
  open: false,
  pending: false,
  messages: [GREETING],
  draft: "",
  sent: 0,
  setOpen: (open) => set({ open }),
  setDraft: (draft) => set({ draft }),
  send: async (raw) => {
    const text = (raw ?? get().draft).trim();
    if (!text || get().pending) return;
    if (get().sent >= 24) {
      flash("That's enough questions for now. Try again in a few minutes.");
      return;
    }
    const user: ChatMsg = { id: nid(), role: "user", text: text.slice(0, 500) };
    const history = [...get().messages.filter((m) => m.id !== "greet"), user].slice(-8);
    set({
      draft: "",
      pending: true,
      sent: get().sent + 1,
      messages: [...get().messages, user],
    });
    const ctx = snapshot();
    try {
      const res = await askGrok({
        data: {
          messages: history.map((m) => ({ role: m.role, content: m.text })),
          context: ctx,
        },
      });
      if (!res.ok) {
        const action = flyAskAction(text);
        const local = cardForAsk(text, action);
        const insights = local ? [local] : undefined;
        set({
          pending: false,
          messages: [
            ...get().messages,
            {
              id: nid(),
              role: "assistant",
              text: local
                ? `${res.error || "No live answer."} This card is from kits and catalog on this machine, not a live Grok turn.`
                : res.error || "No live answer. The globe still works.",
              insights,
            },
          ],
        });
        if (local) useIntel.getState().setInsight(local);
        if (action) {
          const { applyAction } = await import("./runCommand");
          await applyAction(action, text);
        }
        return;
      }
      const parsed = parseTaggedAction(res.text, text);
      const fallbackAction = parsed.action ? null : flyAskAction(text);
      const local = cardForAsk(text, fallbackAction ?? parsed.action);
      const civic = local && local.system !== "intel";
      const insight = civic ? local : (parsed.insight ?? local ?? null);
      const insights = insight ? [insight] : undefined;
      set({
        pending: false,
        messages: [
          ...get().messages,
          {
            id: nid(),
            role: "assistant",
            text:
              parsed.text ||
              (insight
                ? "Named from this turn. Look here if you want the map to follow."
                : "I do not have that on disk yet. Incomplete stays empty."),
            insights,
          },
        ],
      });
      if (insight) useIntel.getState().setInsight(insight);
      const action = parsed.action ?? fallbackAction;
      if (action) {
        const { applyAction } = await import("./runCommand");
        await applyAction(action, text);
      }
    } catch {
      const action = flyAskAction(text);
      const local = cardForAsk(text, action);
      set({
        pending: false,
        messages: [
          ...get().messages,
          {
            id: nid(),
            role: "assistant",
            text: local
              ? "No live answer. This card is from kits and catalog on this machine. The globe still works."
              : "No live answer. The globe still works.",
            insights: local ? [local] : undefined,
          },
        ],
      });
      if (local) useIntel.getState().setInsight(local);
      if (action) {
        const { applyAction } = await import("./runCommand");
        await applyAction(action, text);
      }
    }
  },
}));
