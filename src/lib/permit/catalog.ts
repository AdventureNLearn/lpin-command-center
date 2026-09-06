import { getPlace, PLACES, searchPlaces } from "./places";
import { getPlaybook, PLAYBOOKS } from "./playbooks";
import { getState, STATES } from "./states";
import { NATIONAL_LINKS } from "./resources";
import type { OfficialLink, PlaceDesk, Playbook, ProjectKind, StateDesk } from "./types";

export interface CatalogHit {
  kind: "place" | "state" | "playbook";
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export function uniqueStrings(values: Array<string | undefined | null>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    const v = value?.trim();
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

export interface CombinedDesk {
  state: StateDesk;
  place?: PlaceDesk;
  playbook?: Playbook;
  permits: string[];
  holdPoints: string[];
  links: OfficialLink[];
}

export function buildDesk(stateCode: string, placeId?: string | null, kind?: string | null): CombinedDesk | undefined {
  const state = getState(stateCode);
  if (!state) return undefined;
  const place = placeId ? getPlace(placeId) : undefined;
  const playbook = kind ? getPlaybook(kind) : undefined;
  const permits = uniqueStrings([
    ...state.commonPermits,
    ...(place?.extraPermits ?? []),
    ...(playbook?.relatedPermits ?? []),
  ]);
  const holdPoints = uniqueStrings([
    ...state.holdPoints,
    ...(place?.extraHolds ?? []),
    ...(playbook?.inspections.map((h) => h.label) ?? []),
  ]);
  const links = dedupeLinks([
    ...(place
      ? [
          { id: "portal", label: place.portalName, url: place.portalUrl, note: "Official application / inspection portal." },
          { id: "dept", label: `${place.ahjName} (department)`, url: place.departmentUrl, note: "Building department home." },
          ...place.extraLinks,
        ]
      : []),
    ...state.links,
    ...NATIONAL_LINKS,
  ]);
  return { state, place, playbook, permits, holdPoints, links };
}

export function dedupeLinks(links: OfficialLink[]): OfficialLink[] {
  const out: OfficialLink[] = [];
  const seen = new Set<string>();
  for (const link of links) {
    const key = link.url.replace(/\/+$/, "").toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(link);
  }
  return out;
}

export function searchCatalog(query: string): CatalogHit[] {
  const q = query.trim().toLowerCase();
  const hits: CatalogHit[] = [];

  if (!q) {
    for (const state of STATES) {
      hits.push({
        kind: "state",
        id: state.code,
        title: state.name,
        subtitle: state.modelBase,
        href: `/state/${state.code}`,
      });
    }
    return hits;
  }

  for (const place of searchPlaces(q)) {
    hits.push(placeHit(place));
  }

  for (const state of STATES) {
    const blob = `${state.code} ${state.name} ${state.modelBase}`.toLowerCase();
    if (blob.includes(q)) {
      hits.push({
        kind: "state",
        id: state.code,
        title: state.name,
        subtitle: state.modelBase,
        href: `/state/${state.code}`,
      });
    }
  }

  for (const book of PLAYBOOKS) {
    const blob = `${book.label} ${book.summary} ${book.relatedPermits.join(" ")}`.toLowerCase();
    if (blob.includes(q) || book.id.includes(q.replace(/\s+/g, "-"))) {
      hits.push({
        kind: "playbook",
        id: book.id,
        title: book.label,
        subtitle: book.summary,
        href: `/guide/${book.id}`,
      });
    }
  }

  return hits.slice(0, 40);
}

function placeHit(place: PlaceDesk): CatalogHit {
  return {
    kind: "place",
    id: place.id,
    title: `${place.name}, ${place.state}`,
    subtitle: place.ahjName,
    href: `/place/${place.id}`,
  };
}

export const FEATURED_PLACE_IDS = [
  "fl-miami",
  "fl-miami-dade",
  "ny-nyc",
  "ca-los-angeles",
  "tx-houston",
  "il-chicago",
  "wa-seattle",
  "ga-atlanta",
  "pa-philadelphia",
  "az-phoenix",
  "co-denver",
  "dc-washington",
] as const;

export const FEATURED_PLACES: PlaceDesk[] = FEATURED_PLACE_IDS.map((id) => getPlace(id)).filter(
  (p): p is PlaceDesk => Boolean(p),
);

export function placeCount(): number {
  return PLACES.length;
}

export function stateCount(): number {
  return STATES.length;
}

export function playbookCount(): number {
  return PLAYBOOKS.length;
}

export function isProjectKind(value: string): value is ProjectKind {
  return Boolean(getPlaybook(value));
}

export function defaultProjectTitle(kind: string | undefined, placeLabel: string): string {
  const book = kind ? getPlaybook(kind) : undefined;
  if (book) return `${book.label} — ${placeLabel}`;
  return `Permit file — ${placeLabel}`;
}
