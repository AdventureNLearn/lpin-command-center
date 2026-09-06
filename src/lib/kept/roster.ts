const memberLoaders = import.meta.glob("../../../vendor/kept/kits/*/members.json");

export type RosterItem = {
  id: string;
  name: string;
  url?: string;
  caucus?: string;
  seat?: string;
};

export type KeptRoster = {
  iso2: string;
  items: RosterItem[];
  named: number;
  claimed: number;
  sourceUrl?: string;
  retrieved?: string;
  hole: string | null;
};

type MembersFile = {
  iso2?: string;
  source_url?: string;
  retrieved?: string;
  claimed_seats?: number;
  items?: {
    id?: string;
    name?: string;
    roster_url?: string;
    caucus?: string;
    constituency_label?: string;
  }[];
};

export async function loadKeptRoster(iso2: string): Promise<KeptRoster> {
  const id = iso2.toLowerCase();
  const needle = `/kits/${id}/members.json`;
  let loader: (() => Promise<unknown>) | undefined;
  for (const [path, load] of Object.entries(memberLoaders)) {
    if (path.replace(/\\/g, "/").endsWith(needle)) {
      loader = load as () => Promise<unknown>;
      break;
    }
  }
  if (!loader) {
    return {
      iso2: id,
      items: [],
      named: 0,
      claimed: 0,
      hole: "We do not have sitting names yet.",
    };
  }
  const mod = (await loader()) as { default?: MembersFile } & MembersFile;
  const data = mod.default ?? mod;
  const raw = Array.isArray(data.items) ? data.items : [];
  const items: RosterItem[] = [];
  for (const it of raw) {
    const name = (it.name ?? "").trim();
    if (!name) continue;
    const caucus = (it.caucus ?? "").trim();
    const seat = (it.constituency_label ?? "").trim();
    items.push({
      id: String(it.id ?? name),
      name,
      url: it.roster_url,
      caucus: caucus || undefined,
      seat: seat || undefined,
    });
  }
  const claimed = data.claimed_seats ?? items.length;
  const hole =
    items.length === 0
      ? "We do not have sitting names yet."
      : claimed > items.length
        ? `${items.length} named of ${claimed} seats. Vacancies not invented.`
        : null;
  return {
    iso2: id,
    items,
    named: items.length,
    claimed,
    sourceUrl: data.source_url,
    retrieved: data.retrieved,
    hole,
  };
}
