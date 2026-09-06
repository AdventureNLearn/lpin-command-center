/** Device-local research session. Not a score. Not a cloud brain. */

import { create } from "zustand";
import type { LinDeskId } from "./network";

const KEY = "lin:mvp-session";
const TOPIC_MAX = 120;
const QUOTE_MAX = 500;
const NOTE_MAX = 400;
const SOURCE_CAP = 24;

export type LinSource = {
  id: string;
  url: string;
  quote: string;
  retrieved: string;
  deskId: LinDeskId;
};

export type LinSession = {
  topic: string;
  notes: Record<string, string>;
  sources: LinSource[];
  armed: string[];
};

const empty: LinSession = { topic: "", notes: {}, sources: [], armed: [] };

export function noteKey(deskId: string, cellId: string): string {
  return `${deskId}:${cellId}`;
}

export function normalizeTopic(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, TOPIC_MAX);
}

export function sourceValid(url: string, quote: string): string | null {
  const u = url.trim();
  const q = quote.trim();
  if (!u) return "A quote without an official link is not proven.";
  if (!/^https?:\/\//i.test(u) || /\s/.test(u)) return "URL must start with http(s)://";
  if (/^javascript:/i.test(u)) return "That URL is not allowed.";
  if (!q) return "Quote the smallest operative passage.";
  return null;
}

function load(): LinSession {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const p = JSON.parse(raw) as Partial<LinSession>;
    const topic = typeof p.topic === "string" ? normalizeTopic(p.topic) : "";
    const notes: Record<string, string> = {};
    if (p.notes && typeof p.notes === "object") {
      for (const [k, v] of Object.entries(p.notes)) {
        if (typeof v === "string" && v.trim()) notes[k] = v.trim().slice(0, NOTE_MAX);
      }
    }
    const sources = Array.isArray(p.sources)
      ? p.sources
          .filter(
            (s): s is LinSource =>
              !!s &&
              typeof s.id === "string" &&
              typeof s.url === "string" &&
              typeof s.quote === "string" &&
              typeof s.deskId === "string" &&
              !sourceValid(s.url, s.quote),
          )
          .slice(0, SOURCE_CAP)
      : [];
    const armed = Array.isArray(p.armed)
      ? p.armed.filter((x): x is string => typeof x === "string").slice(0, 16)
      : [];
    return { topic, notes, sources, armed };
  } catch {
    return empty;
  }
}

function save(s: LinSession) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

type LinState = LinSession & {
  setTopic: (topic: string) => void;
  setNote: (deskId: string, cellId: string, text: string) => void;
  addSource: (deskId: LinDeskId, url: string, quote: string) => string | null;
  removeSource: (id: string) => void;
  toggleArm: (laneId: string) => void;
  armAll: (laneIds: string[]) => void;
  clearArms: () => void;
  clear: () => void;
};

export const useLin = create<LinState>((set, get) => ({
  ...empty,
  setTopic: (topic) => {
    const next = { ...get(), topic: normalizeTopic(topic) };
    save(next);
    set({ topic: next.topic });
  },
  setNote: (deskId, cellId, text) => {
    const key = noteKey(deskId, cellId);
    const notes = { ...get().notes };
    const v = text.trim().slice(0, NOTE_MAX);
    if (v) notes[key] = v;
    else delete notes[key];
    const next = { ...get(), notes };
    save(next);
    set({ notes });
  },
  addSource: (deskId, url, quote) => {
    const err = sourceValid(url, quote);
    if (err) return err;
    const cur = get();
    if (cur.sources.length >= SOURCE_CAP) return "Source cap is 24 on this desk.";
    const src: LinSource = {
      id: `src-${Date.now().toString(36)}`,
      url: url.trim(),
      quote: quote.trim().slice(0, QUOTE_MAX),
      retrieved: new Date().toISOString().slice(0, 10),
      deskId,
    };
    const sources = [...cur.sources, src];
    save({ ...cur, sources });
    set({ sources });
    return null;
  },
  removeSource: (id) => {
    const sources = get().sources.filter((s) => s.id !== id);
    save({ ...get(), sources });
    set({ sources });
  },
  toggleArm: (laneId) => {
    const cur = get().armed;
    const armed = cur.includes(laneId) ? cur.filter((x) => x !== laneId) : [...cur, laneId];
    save({ ...get(), armed });
    set({ armed });
  },
  armAll: (laneIds) => {
    save({ ...get(), armed: [...laneIds] });
    set({ armed: [...laneIds] });
  },
  clearArms: () => {
    save({ ...get(), armed: [] });
    set({ armed: [] });
  },
  clear: () => {
    save(empty);
    set({ ...empty });
  },
}));

export function hydrateLin() {
  const s = load();
  useLin.setState({ topic: s.topic, notes: s.notes, sources: s.sources, armed: s.armed });
}

export function parseResearchCommand(text: string): string | null {
  const m = text.trim().match(/^(?:research|look up|investigate)\s+(.+)$/i);
  const topic = m?.[1] ? normalizeTopic(m[1]) : "";
  return topic || null;
}
