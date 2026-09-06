/** LPIN Intelligence Network — one LPIN platform. Prior grok.me tools are methods, not the product. */

import type { DeskSystem } from "@/lib/intel/types";

export const LIN_NAME = "Lily Pad Intelligence Network";
export const LIN_SHORT = "LPIN";
export const LIN_HONESTY =
  "Guidance only. Not legal advice. Not a government site. Not a score. Empty means we do not know yet. You keep the call.";

export type LinDeskId =
  | "network"
  | "legal"
  | "regulatory"
  | "technical"
  | "jurisdictional"
  | "operational"
  | "engineering"
  | "commerce"
  | "governance"
  | "fifty"
  | "opencells";

export type LinCell = {
  id: string;
  label: string;
  status: "open";
};

export type LinRef = {
  name: string;
  host: string;
  role: "reference";
};

export type LinDesk = {
  id: LinDeskId;
  kicker: string;
  title: string;
  field: string;
  aliases: string[];
  kernel: string[];
  cells: LinCell[];
  references: LinRef[];
  mayScore: boolean;
  honesty: string;
  command: string;
};

export type CivicRef = {
  id: string;
  kicker: string;
  title: string;
  host: string;
  role: "reference";
  opens: { system: DeskSystem; id: string };
};

function cells(...labels: string[]): LinCell[] {
  return labels.map((label) => ({
    id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    label,
    status: "open" as const,
  }));
}

function ref(name: string, host: string): LinRef {
  return { name, host, role: "reference" };
}

/** Eight SME desks. Method depth. No invented records. */
export const SME_DESKS: LinDesk[] = [
  {
    id: "legal",
    kicker: "Legal",
    title: "Legal desk",
    field: "Primary instruments, status in the same sentence, quote with URL.",
    aliases: ["law", "statute", "legal desk"],
    kernel: [
      "A quote without a URL is not Supported.",
      "A bill is not law. Name the status in the same sentence: live, not law, repealed, bill.",
      "Secondary commentary never outranks the instrument.",
      "Same influence is not the same law.",
      "Human final call. This desk proposes. It does not close a claim.",
    ],
    cells: cells(
      "Instrument attach",
      "Status line",
      "Repeal / sunset",
      "Conflict of laws",
      "Holding vs dicta",
    ),
    references: [ref("Open Cells method", "opencells.grok.me"), ref("LPIN Claims", "lpin-v2-map.grok.me")],
    mayScore: true,
    honesty: LIN_HONESTY,
    command: "open legal desk",
  },
  {
    id: "regulatory",
    kicker: "Regulatory",
    title: "Regulatory desk",
    field: "Industry × jurisdiction routing. A permit is not a statute. A grant is not a license.",
    aliases: ["regulation", "rulemaking", "regulatory desk"],
    kernel: [
      "Name the issuing body before the rule nickname.",
      "Proposed, interim, final, stayed — status in the same sentence.",
      "Eligible use of a grant is a policy choice, not a finding that the project is lawful.",
      "A factory URL is not a login and not an approval.",
      "Empty catalog beats a copied instrument from the wrong desk.",
    ],
    cells: cells(
      "Rule docket",
      "Permit pathway",
      "Grant eligibility",
      "Enforcement posture",
      "Variance / waiver",
    ),
    references: [ref("Permit Harbor", "hivepermitdev.grok.me"), ref("Fifty stack", "fifty.grok.me")],
    mayScore: true,
    honesty: LIN_HONESTY,
    command: "open regulatory desk",
  },
  {
    id: "technical",
    kicker: "Technical",
    title: "Technical desk",
    field: "Feeds, inspections, catalogs. Presence of a file is not a grade.",
    aliases: ["tech", "feeds", "technical desk"],
    kernel: [
      "Live / delayed / simulated / off must be visible on every feed.",
      "A public inspection file is not a score and not a government site.",
      "No nationwide VIN or inspection dump. Typed lookup only.",
      "Modeled tracks stay labeled modeled.",
      "Do not treat a 403 or an empty index as a page of records.",
    ],
    cells: cells(
      "Feed honesty",
      "Inspection lookup",
      "Catalog lock date",
      "Sensor vs record",
      "Kill switch",
    ),
    references: [
      ref("Inspection Index", "insind.grok.me"),
      ref("GEV feeds (copy-from)", "gevradio.grok.me"),
    ],
    mayScore: false,
    honesty: "Public files and feeds as labeled. Not a score. Not navigation. Human final call.",
    command: "open technical desk",
  },
  {
    id: "jurisdictional",
    kicker: "Jurisdictional",
    title: "Jurisdictional desk",
    field: "Who may act: local, county, state, federal. A contract is not a highway permit.",
    aliases: ["jurisdiction", "authority", "jurisdictional desk", "stack"],
    kernel: [
      "Name the layer before the act: local, county, state, federal.",
      "A city contract is not a county grant and not a state statute.",
      "Users type locality. This product does not sample municipality names.",
      "Not retrieved is a finding. It is not “nothing happened.”",
      "Two axes: jurisdiction and process. Do not collapse them into a vendor map.",
    ],
    cells: cells("Local", "County", "State", "Federal", "Process lane"),
    references: [ref("Fifty", "fifty.grok.me"), ref("Open Cells map coverage", "opencells.grok.me")],
    mayScore: true,
    honesty: LIN_HONESTY,
    command: "open jurisdictional desk",
  },
  {
    id: "operational",
    kicker: "Operational",
    title: "Operational desk",
    field: "Jobsite, construction oversight, field sequence. Incomplete packs stay empty.",
    aliases: ["operations", "field", "operational desk"],
    kernel: [
      "Primary field records beat commentary.",
      "A photo is not a permit. A permit is not occupancy.",
      "Sequence: scope → pathway → evidence → package. Do not skip to a score.",
      "Guidance only until a pack exists. Honest hole over a finished-looking board.",
      "Human final call on the ground.",
    ],
    cells: cells("Jobsite pack", "Inspection sequence", "Change order", "Stop-work", "Closeout"),
    references: [ref("LPIN Jobsite", "lpin-v2-map.grok.me")],
    mayScore: true,
    honesty: "Guidance only. Not a live claims desk. Incomplete packs stay empty.",
    command: "open operational desk",
  },
  {
    id: "engineering",
    kicker: "Engineering",
    title: "Engineering desk",
    field: "Infrastructure method: drainage, structures, as-builts. Lore is not a stamped plan.",
    aliases: ["engineer", "infrastructure", "drainage", "engineering desk"],
    kernel: [
      "A pattern is not a sealed drawing.",
      "As-built beats brochure. Missing as-built is an open cell.",
      "Hydrology, load, and right-of-way are different claims. Label which one you are making.",
      "Vendor cut sheets are not a statute and not a field measurement.",
      "Prefer an honest gap over a finished-looking chart.",
    ],
    cells: cells("As-built", "Drainage path", "Load path", "Right-of-way", "Spec vs field"),
    references: [ref("LPIN Jobsite", "lpin-v2-map.grok.me")],
    mayScore: false,
    honesty: "Method only. Not a stamped plan. Not an engineer of record. Human final call.",
    command: "open engineering desk",
  },
  {
    id: "commerce",
    kicker: "Commerce",
    title: "Commerce & finance desk",
    field: "Money path: invoice, grant, forfeiture, insurance. Counts, not private donors.",
    aliases: ["finance", "commerce", "money", "procurement", "commerce desk", "finance desk"],
    kernel: [
      "Follow the invoice. A grant is not a finding of guilt.",
      "Public filing graphs are counts. Named private donors do not belong here.",
      "Factory URLs are not logins.",
      "Eligible use ≠ expended. Name which one you have.",
      "Empty beats a copied instrument from the wrong account.",
    ],
    cells: cells("Invoice path", "Grant / settlement", "Procurement", "Insurance / bond", "Public filing count"),
    references: [ref("Fifty funding/grants lanes", "fifty.grok.me")],
    mayScore: true,
    honesty: "Public money path as labeled. Not a donor list. Not a credit rating. Human final call.",
    command: "open commerce desk",
  },
  {
    id: "governance",
    kicker: "Governance",
    title: "Governance desk",
    field: "Who sits, what they may pass, influence vs identity. Roster as filed.",
    aliases: ["government", "governance desk"],
    kernel: [
      "An organization is not a statute. Presence is not capture.",
      "Classifications can share machinery. They are not the same law.",
      "Roster as filed, delayed. Invented sitting names are a defect.",
      "Claims use tri-state and basis. Software never auto-truths.",
      "Bots propose. A human attaches every card.",
    ],
    cells: cells("Roster", "Instrument", "Influence label", "Claim board", "Open cell"),
    references: [
      ref("Kept legislatures", "keptglobal.grok.me"),
      ref("LPIN Claims", "lpin-v2-map.grok.me"),
      ref("Open Cells", "opencells.grok.me"),
    ],
    mayScore: true,
    honesty: "Delayed registers and labeled claims. Not an influence score. Human final call.",
    command: "open governance desk",
  },
];

export const METHOD_DESKS: LinDesk[] = [
  {
    id: "fifty",
    kicker: "Fifty",
    title: "Fifty — state briefing method",
    field: "Jurisdiction × process. Empty / not-retrieved is a finding.",
    aliases: ["fifty desk", "fifty"],
    kernel: [
      "Two axes: jurisdiction (local, county, state, federal) and process (funding, grants, permitting, installation, privacy, legislation).",
      "A city contract is not a highway permit. A grant is not a statute.",
      "Not retrieved means this desk has no packed instrument — not “nothing happened.”",
      "National / state-level only in product samples. User types locality.",
      "Not legal advice. Not a live camera registry.",
    ],
    cells: cells("Local", "County", "State", "Federal", "Funding", "Grants", "Permitting", "Legislation"),
    references: [ref("Fifty (reference host)", "fifty.grok.me")],
    mayScore: true,
    honesty: "Public briefing method. Not legal advice. Not a live registry. Claims labeled.",
    command: "open fifty desk",
  },
  {
    id: "opencells",
    kicker: "Open Cells",
    title: "Open Cells — quote or leave open",
    field: "A clause is here only when the primary text is attached.",
    aliases: ["open cells", "cells desk", "opencells"],
    kernel: [
      "A quote without a URL is not Supported.",
      "A bill is not law. Name the status in the same sentence.",
      "Same influence is not the same law.",
      "An organization is not a statute. Presence is not capture.",
      "Human attaches every card. Open cells stay open.",
      "Coverage of quotes is not a ranking of freedom.",
    ],
    cells: cells("Quoted instrument", "Open cell", "Status line", "Retrieval date"),
    references: [ref("Open Cells (reference host)", "opencells.grok.me")],
    mayScore: true,
    honesty: "Public method. Not a score. Not a ranking. Human final call.",
    command: "open cells desk",
  },
];

export const CIVIC_REFS: CivicRef[] = [
  {
    id: "lpin-claims",
    kicker: "Claims",
    title: "Claims file",
    host: "lpin-v2-map.grok.me",
    role: "reference",
    opens: { system: "jobsite", id: "claims" },
  },
  {
    id: "lpin-jobsite",
    kicker: "Jobsite",
    title: "Jobsite pack",
    host: "lpin-v2-map.grok.me",
    role: "reference",
    opens: { system: "jobsite", id: "" },
  },
  {
    id: "permit",
    kicker: "Building desk",
    title: "Find a building desk",
    host: "hivepermitdev.grok.me",
    role: "reference",
    opens: { system: "permit", id: "" },
  },
  {
    id: "kept",
    kicker: "Legislature",
    title: "Roster as filed",
    host: "keptglobal.grok.me",
    role: "reference",
    opens: { system: "kept", id: "" },
  },
  {
    id: "insind",
    kicker: "Inspection Index",
    title: "Typed lookup, not a score",
    host: "insind.grok.me",
    role: "reference",
    opens: { system: "insind", id: "" },
  },
];

export const NETWORK_DESK: LinDesk = {
  id: "network",
  kicker: "Network",
  title: LIN_NAME,
  field: "Civic command center. SME desks plus labeled civic tools. Globe stays up.",
  aliases: ["lin", "network", "intelligence", "lpin", "command center", "intelligence network"],
  kernel: [
    "This is the local LPIN Intelligence Network. Live grok.me hosts are reference, not this homepage.",
    "Every card names its system. Unlabeled mix is a defect.",
    "Tri-state where scored. Tutor/Learn cannot mint Supported.",
    "Zero orbit pins from this network. Look here only if the user typed a place.",
    "Human final call.",
  ],
  cells: SME_DESKS.map((d) => ({ id: d.id, label: d.kicker, status: "open" as const })),
  references: [
    ref("GEV UI copy-from", "gevradio.grok.me"),
    ref("LPIN civic SoT", "lpin-v2-map.grok.me"),
  ],
  mayScore: false,
  honesty: LIN_HONESTY,
  command: "open network",
};

const ALL: LinDesk[] = [NETWORK_DESK, ...SME_DESKS, ...METHOD_DESKS];

export function allLinDesks(): LinDesk[] {
  return ALL;
}

export function linDeskById(id: string): LinDesk | undefined {
  const key = id.trim().toLowerCase();
  if (!key || key === "network" || key === "lin" || key === "index") return NETWORK_DESK;
  return ALL.find((d) => d.id === key);
}

export function matchLinDesk(raw: string): LinDesk | undefined {
  const q = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (!q) return NETWORK_DESK;
  for (const d of ALL) {
    if (d.id === q) return d;
    if (d.kicker.toLowerCase() === q) return d;
    if (d.aliases.some((a) => a.toLowerCase() === q)) return d;
    if (q === `${d.kicker.toLowerCase()} desk`) return d;
  }
  for (const d of ALL) {
    if (d.aliases.some((a) => q.includes(a.toLowerCase()))) return d;
  }
  return undefined;
}

/** Parse “open legal desk” / “open network” / “open cells desk”. */
export function matchLinCommand(text: string): LinDesk | undefined {
  const t = text.trim();
  if (/^(?:open )?(?:the )?(?:lpin )?intelligence network(?: desk)?$/i.test(t)) return NETWORK_DESK;
  if (/^(?:open )?(?:the )?(?:lin|network|command center)(?: desk)?$/i.test(t)) return NETWORK_DESK;
  if (/^(?:open )?(?:the )?open cells(?: desk)?$/i.test(t) || /^open cells desk$/i.test(t)) {
    return linDeskById("opencells");
  }
  const m = t.match(/^(?:open )?(?:the )?([a-z][a-z- ]+?)(?: desk)?$/i);
  if (!m?.[1]) return undefined;
  if (/^(show|hide|enable|disable|turn|find|compare|play|radio|corpus|streams|method)\b/i.test(t)) {
    return undefined;
  }
  return matchLinDesk(m[1]);
}
