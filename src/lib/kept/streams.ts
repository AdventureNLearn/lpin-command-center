import { keptDeskByIso, type KeptDesk } from "./desks";
import { loadKeptRoster } from "./roster";

export const STREAM_CAP = 8;

export const STREAM_THEMES = [
  {
    id: "pipes",
    label: "Pipes",
    note: "Campaign cash ≠ lobbying ≠ grants ≠ contracts ≠ 990. Not mixed into a score.",
  },
  {
    id: "names",
    label: "Shared names",
    note: "Folded-stem co-occurrence. Not the same legal entity. Not a score.",
  },
  {
    id: "reg",
    label: "Regulatory ties",
    note: "Sourced register rows only. Empty if the pack has none.",
  },
  {
    id: "infra",
    label: "Infrastructure",
    note: "Filing language only. Not a project map.",
  },
  {
    id: "awards",
    label: "Awards",
    note: "Grant/contract ids as filed. Not a 501 network.",
  },
  {
    id: "foia",
    label: "Intel / FOIA gates",
    note: "This app does not file FOIA. Gates stay empty until a sourced pack says otherwise.",
  },
] as const;

const pledgeLoaders = import.meta.glob("../../../vendor/kept/kits/*/pledges.json");

type PledgeFile = {
  iso2?: string;
  incomplete?: boolean;
  items?: { member_id?: string; issue_id?: string; sourceUrl?: string }[];
};

export type PledgePack = {
  iso2: string;
  count: number;
  incomplete: boolean;
  issues: string[];
};

export async function loadPledgePack(iso2: string): Promise<PledgePack> {
  const id = iso2.toLowerCase();
  const needle = `/kits/${id}/pledges.json`;
  let loader: (() => Promise<unknown>) | undefined;
  for (const [path, load] of Object.entries(pledgeLoaders)) {
    if (path.replace(/\\/g, "/").endsWith(needle)) {
      loader = load as () => Promise<unknown>;
      break;
    }
  }
  if (!loader) return { iso2: id, count: 0, incomplete: true, issues: [] };
  const mod = (await loader()) as { default?: PledgeFile } & PledgeFile;
  const data = mod.default ?? mod;
  const items = Array.isArray(data.items) ? data.items : [];
  const issues = [...new Set(items.map((i) => i.issue_id).filter((x): x is string => Boolean(x)))];
  return {
    iso2: id,
    count: items.length,
    incomplete: data.incomplete !== false,
    issues,
  };
}

export function foldStem(name: string): string {
  const parts = name.trim().toLowerCase().split(/\s+/);
  const last = (parts[parts.length - 1] ?? "").replace(/[^a-z]/g, "");
  return last.length >= 3 ? last : "";
}

export type ComparePack = {
  a: KeptDesk | null;
  b: KeptDesk | null;
  holes: string[];
  sharedStems: string[];
  sharedIssues: string[];
  pledgesA: number;
  pledgesB: number;
};

export async function comparePacks(isoA: string, isoB: string): Promise<ComparePack> {
  const a = keptDeskByIso(isoA);
  const b = keptDeskByIso(isoB);
  const [ra, rb, pa, pb] = await Promise.all([
    loadKeptRoster(isoA),
    loadKeptRoster(isoB),
    loadPledgePack(isoA),
    loadPledgePack(isoB),
  ]);
  const holes: string[] = [];
  if (!a) holes.push(`${isoA} has no kit on disk.`);
  if (!b) holes.push(`${isoB} has no kit on disk.`);
  if (a && a.named === 0) holes.push(`${a.name}: no sourced sitting names.`);
  if (b && b.named === 0) holes.push(`${b.name}: no sourced sitting names.`);
  if (a && a.seats > a.named) holes.push(`${a.name}: ${a.named} named of ${a.seats} seats. Vacancies not invented.`);
  if (b && b.seats > b.named) holes.push(`${b.name}: ${b.named} named of ${b.seats} seats. Vacancies not invented.`);
  if (pa.incomplete) holes.push(`${isoA} pledges marked incomplete.`);
  if (pb.incomplete) holes.push(`${isoB} pledges marked incomplete.`);
  if (pa.count === 0) holes.push(`${isoA}: no sourced pledge sentences.`);
  if (pb.count === 0) holes.push(`${isoB}: no sourced pledge sentences.`);

  const stemsA = new Set(ra.items.map((i) => foldStem(i.name)).filter(Boolean));
  const sharedStems = [...new Set(rb.items.map((i) => foldStem(i.name)).filter((s) => s && stemsA.has(s)))];
  const issuesA = new Set(pa.issues);
  const sharedIssues = pb.issues.filter((x) => issuesA.has(x));

  return {
    a,
    b,
    holes,
    sharedStems: sharedStems.slice(0, 12),
    sharedIssues: sharedIssues.slice(0, 12),
    pledgesA: pa.count,
    pledgesB: pb.count,
  };
}
