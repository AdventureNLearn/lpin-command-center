/** Words on the glass. Everyday language. No internal labels. */

export const PRODUCT_NAME = "Lily Pad Intelligence Network";
export const PRODUCT_SHORT = "LPIN";
export const NETWORK_NAME = "GOYNET";
export const NETWORK_LONG = "Governance, Operations and Yields Network";
export const CREDIT =
  "Lily Pad Intelligence Network. Powered by GOYNET (Governance, Operations and Yields). Created with the AOS Hive-Brain.";

export const HOW_TO = [
  "Name the question you are trying to answer.",
  "Open the desk that matches that kind of question.",
  "Write what you found. If you quote a rule or a record, paste the official link next to it.",
  "A blank box means we do not know yet. Leave it blank. Do not guess to make it look finished.",
  "If the same fact shows up on two desks, that is a lead — not proof.",
  "You decide. This tool never closes the call for you.",
] as const;

export const PILLARS: {
  id: "governance" | "operations" | "yields";
  label: string;
  ask: string;
  deskIds: string[];
}[] = [
  {
    id: "governance",
    label: "Governance",
    ask: "Who may act, and what is actually written?",
    deskIds: ["legal", "regulatory", "jurisdictional", "governance", "fifty", "opencells", "kept"],
  },
  {
    id: "operations",
    label: "Operations",
    ask: "What is happening on the ground, and what was built?",
    deskIds: ["technical", "operational", "engineering", "lpin-jobsite", "insind"],
  },
  {
    id: "yields",
    label: "Yields",
    ask: "Where did the money and the permissions go?",
    deskIds: ["commerce", "permit", "lpin-claims"],
  },
];

export const LANE_PLAIN: Record<string, { label: string; ask: string }> = {
  statute: { label: "The written rule", ask: "What does the text actually say?" },
  rule: { label: "Who can require it", ask: "Who has the power to make this stick?" },
  feed: { label: "What the data shows", ask: "Is this a live reading, a delay, or a model?" },
  stack: { label: "Which level", ask: "City, county, state, or national?" },
  field: { label: "On the ground", ask: "What is actually happening out there?" },
  infra: { label: "Built vs planned", ask: "Was this built as drawn, or is that unknown?" },
  money: { label: "The money path", ask: "Invoice, grant, or guess?" },
  roster: { label: "Who sits", ask: "Who is on the roll, as filed?" },
  fifty: { label: "Level × process", ask: "Which level, and which kind of action?" },
  cells: { label: "Quote or blank", ask: "Do we have the official text, or not yet?" },
};

export const COLLISION_HINT =
  "The same source showed up in two places. That is a lead, not proof. You still decide.";

export const NOT_PROVEN = "Not proven yet. Link the official page if you have it.";
export const YOU_DECIDE = "Guidance only. Not legal advice. Not a score. You keep the call.";
