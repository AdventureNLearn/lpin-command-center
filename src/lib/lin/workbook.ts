/** Device-local research workbook. Country × industry. Not a score. */

import { create } from "zustand";
import { matchKeptDesk } from "@/lib/kept/desks";

const KEY = "lin:workbook";
const NOTE_MAX = 400;
const QUOTE_MAX = 500;
const SOURCE_CAP = 48;

export const INDUSTRIES = [
  { id: "energy", label: "Energy" },
  { id: "defense", label: "Defense" },
  { id: "finance", label: "Finance" },
  { id: "telecom", label: "Telecom" },
  { id: "health", label: "Health" },
  { id: "agriculture", label: "Agriculture" },
  { id: "mining", label: "Mining" },
  { id: "construction", label: "Construction" },
  { id: "transport", label: "Transport" },
  { id: "water", label: "Water" },
  { id: "education", label: "Education" },
  { id: "elections", label: "Elections" },
] as const;

export type IndustryId = (typeof INDUSTRIES)[number]["id"];

export type LensId =
  | "law"
  | "permitting"
  | "trades"
  | "regulations"
  | "funding"
  | "political"
  | "corporate";

export const LENSES: { id: LensId; label: string; ask: string }[] = [
  { id: "law", label: "Law", ask: "Quote the instrument. Status in the same sentence: live, bill, repealed, stayed." },
  { id: "permitting", label: "Permitting", ask: "Name the AHJ. A complete application is not a permit. Dirt is not shingles." },
  { id: "trades", label: "Trades", ask: "License class and issuing body. A trade quote is not a building permit." },
  { id: "regulations", label: "Regulations", ask: "Issuing body before the nickname. Proposed, interim, final, stayed." },
  { id: "funding", label: "Funding", ask: "Public money, subsidy, campaign totals as filed. Named private donors stay off this board." },
  { id: "political", label: "Political", ask: "Who sits, what they voted, what they pledged — quote plus URL, or blank." },
  { id: "corporate", label: "Corporate", ask: "Lobby register, registered orgs, filers. Presence is not capture." },
];

export type WorkbookSource = {
  id: string;
  url: string;
  quote: string;
  retrieved: string;
  tab: string;
  basis: "evidence" | "inference" | "assumption";
  claim: -1 | 0 | 1;
};

export type Workbook = {
  title: string;
  countryIso2: string;
  countryName: string;
  industryId: string;
  industryLabel: string;
  tab: "country" | "industry" | LensId;
  notes: Record<string, string>;
  sources: WorkbookSource[];
};

const empty: Workbook = {
  title: "",
  countryIso2: "",
  countryName: "",
  industryId: "",
  industryLabel: "",
  tab: "country",
  notes: {},
  sources: [],
};

export function matchIndustry(raw: string): { id: IndustryId; label: string } | null {
  const q = raw.trim().toLowerCase();
  if (!q) return null;
  return INDUSTRIES.find((i) => i.id === q || i.label.toLowerCase() === q) ?? null;
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

function load(): Workbook {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const p = JSON.parse(raw) as Partial<Workbook>;
    return {
      title: typeof p.title === "string" ? p.title.slice(0, 160) : "",
      countryIso2: typeof p.countryIso2 === "string" ? p.countryIso2.slice(0, 2).toLowerCase() : "",
      countryName: typeof p.countryName === "string" ? p.countryName.slice(0, 80) : "",
      industryId: typeof p.industryId === "string" ? p.industryId.slice(0, 32) : "",
      industryLabel: typeof p.industryLabel === "string" ? p.industryLabel.slice(0, 40) : "",
      tab:
        p.tab === "industry" ||
        p.tab === "law" ||
        p.tab === "permitting" ||
        p.tab === "trades" ||
        p.tab === "regulations" ||
        p.tab === "funding" ||
        p.tab === "political" ||
        p.tab === "corporate"
          ? p.tab
          : "country",
      notes: p.notes && typeof p.notes === "object" ? p.notes : {},
      sources: Array.isArray(p.sources) ? p.sources.slice(0, SOURCE_CAP) : [],
    };
  } catch {
    return empty;
  }
}

function save(w: Workbook) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(w));
  } catch {
    /* ignore */
  }
}

type State = Workbook & {
  setTab: (tab: Workbook["tab"]) => void;
  setNote: (cell: string, text: string) => void;
  addSource: (tab: string, url: string, quote: string) => string | null;
  removeSource: (id: string) => void;
  openFacets: (country: string, industry: string) => string | null;
  clear: () => void;
};

export const useWorkbook = create<State>((set, get) => ({
  ...empty,
  setTab: (tab) => {
    const next = { ...get(), tab };
    save(next);
    set({ tab });
  },
  setNote: (cell, text) => {
    const notes = { ...get().notes };
    const v = text.trim().slice(0, NOTE_MAX);
    if (v) notes[cell] = v;
    else delete notes[cell];
    const next = { ...get(), notes };
    save(next);
    set({ notes });
  },
  addSource: (tab, url, quote) => {
    const err = sourceValid(url, quote);
    if (err) return err;
    const cur = get();
    if (cur.sources.length >= SOURCE_CAP) return "Source cap is 48 on this workbook.";
    const src: WorkbookSource = {
      id: `wb-${Date.now().toString(36)}`,
      url: url.trim(),
      quote: quote.trim().slice(0, QUOTE_MAX),
      retrieved: new Date().toISOString().slice(0, 10),
      tab,
      basis: "evidence",
      claim: 0,
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
  openFacets: (country, industry) => {
    const desk = matchKeptDesk(country);
    const ind = matchIndustry(industry);
    if (!desk && !ind) return "Name a country on disk, an industry, or both.";
    const countryIso2 = desk?.iso2 ?? "";
    const countryName = desk?.name ?? "";
    const industryId = ind?.id ?? "";
    const industryLabel = ind?.label ?? "";
    const title = [countryName || countryIso2, industryLabel].filter(Boolean).join(" · ");
    const next: Workbook = {
      ...get(),
      title,
      countryIso2,
      countryName,
      industryId,
      industryLabel,
      tab: desk ? "country" : "industry",
    };
    save(next);
    set(next);
    return null;
  },
  clear: () => {
    save(empty);
    set({ ...empty });
  },
}));

export function hydrateWorkbook() {
  const s = load();
  useWorkbook.setState(s);
}

export function workbookClip() {
  const w = useWorkbook.getState();
  return {
    title: w.title,
    country: w.countryIso2,
    industry: w.industryId,
    tab: w.tab,
    source_n: w.sources.length,
  };
}

/** “research energy in Ireland” / “open workbook” */
export function parseWorkbookCommand(
  text: string,
): { country: string; industry: string } | "open" | null {
  const t = text.trim();
  if (/^(?:open )?(?:the )?workbook(?: desk)?$/i.test(t)) return "open";
  const inCountry = t.match(/^(?:research|workbook)\s+(.+?)\s+in\s+(.+)$/i);
  if (inCountry?.[1] && inCountry[2]) {
    return { industry: inCountry[1].trim(), country: inCountry[2].trim() };
  }
  const pair = t.match(/^workbook\s+([a-z]{2}|[a-z][a-z ]+?)\s+([a-z][a-z]+)$/i);
  if (pair?.[1] && pair[2]) return { country: pair[1].trim(), industry: pair[2].trim() };
  return null;
}
