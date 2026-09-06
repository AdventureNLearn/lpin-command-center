/** How each desk works — steps anyone can follow and copy. */

import type { LinDeskId } from "./network";

export type PlainMethod = {
  id: string;
  for: string;
  steps: string[];
  done: string;
  not: string;
};

export const METHODS: Record<string, PlainMethod> = {
  network: {
    id: "network",
    for: "Start here. This is the whole board.",
    steps: [
      "Write the question in plain words.",
      "Pick Governance, Operations, or Yields — or pick a desk by name.",
      "Fill only what you can back up. Leave the rest blank.",
      "Look from more than one angle before you decide.",
    ],
    done: "You can say what you know, what you do not know, and what you will do next. You decide.",
    not: "Not a verdict machine. Not a government site.",
  },
  legal: {
    id: "legal",
    for: "Find the actual written rule.",
    steps: [
      "Name the law or order, not a nickname.",
      "Open the official page. Not a news rewrite.",
      "Copy the smallest sentence that does the work. Paste the link.",
      "Say in the same breath whether it is in force, a bill, or repealed.",
    ],
    done: "A quote plus a link, with status in the same line.",
    not: "A news story is not the law. A bill is not the law.",
  },
  regulatory: {
    id: "regulatory",
    for: "See who can require something, and by what process.",
    steps: [
      "Name the body that issues the rule, then the rule.",
      "Say if it is proposed, final, paused, or withdrawn.",
      "A permit is not a statute. A grant is not a license.",
      "If the catalog has no row, say so. Do not copy a row from the wrong place.",
    ],
    done: "You know who the authority is, and whether a path exists.",
    not: "A website login is not an approval.",
  },
  technical: {
    id: "technical",
    for: "Read sensors and public files without turning them into a grade.",
    steps: [
      "Say if the feed is live, delayed, modeled, or off.",
      "Look up one thing at a time (a vehicle, a file, a reading).",
      "A file that exists is not a score.",
      "If nothing matches, leave it empty.",
    ],
    done: "You can describe what the public file or feed shows, and what it does not.",
    not: "Not for navigation. Not a government grade.",
  },
  jurisdictional: {
    id: "jurisdictional",
    for: "Name which level of government you are talking about.",
    steps: [
      "Pick local, county, state, or national before you pick the act.",
      "A city contract is not a state law. A grant is not a permit.",
      "You type the place. This board does not invent one.",
      "“Not found here” means this board does not have it — not that nothing happened.",
    ],
    done: "The level and the kind of act are named, or honestly blank.",
    not: "Not a map of every town.",
  },
  operational: {
    id: "operational",
    for: "Track what is happening on a job or in the field.",
    steps: [
      "Write the sequence: what was asked, what was allowed, what was done.",
      "A photo is not a permit. A permit is not occupancy.",
      "If the pack is empty, say you do not have it yet.",
    ],
    done: "A clear sequence, or an honest empty pack.",
    not: "Not a live claims office.",
  },
  engineering: {
    id: "engineering",
    for: "Compare what was drawn with what was built.",
    steps: [
      "Ask for the as-built, not the brochure.",
      "Keep water, load, and land rights as separate questions.",
      "If there is no as-built, the box stays open.",
    ],
    done: "You know whether a drawing was checked in the field, or that you do not know.",
    not: "Not a stamped plan. Not an engineer of record.",
  },
  commerce: {
    id: "commerce",
    for: "Follow the money without turning people into a list.",
    steps: [
      "Invoice, grant, or settlement — name which one you have.",
      "Counts are fine. Private donor names do not belong here.",
      "“Allowed to spend” is not the same as “spent.”",
    ],
    done: "A money path with a public source, or a blank.",
    not: "Not a credit rating. Not a donor roll.",
  },
  governance: {
    id: "governance",
    for: "See who sits, and what they actually passed.",
    steps: [
      "Use the public roll as filed. Do not invent names.",
      "A group is not a law. Being present is not capture.",
      "Score a claim only with a quote and a link.",
    ],
    done: "Roster as filed, plus any quoted act — or empty.",
    not: "Not an influence score.",
  },
  fifty: {
    id: "fifty",
    for: "Split a problem by level of government and kind of process.",
    steps: [
      "Pick the row: local, county, state, or national.",
      "Pick the column: money, grant, permit, install, privacy, or legislation.",
      "Fill only that square. A city deal is not a highway permit.",
      "Empty squares mean not found on this board.",
    ],
    done: "Each square is filled or honestly empty. No pin dump.",
    not: "Not a live camera list. Not legal advice.",
  },
  opencells: {
    id: "opencells",
    for: "Put the official text on the table, or leave the square open.",
    steps: [
      "Name the country and the instrument.",
      "Find the official page.",
      "Quote the smallest working sentence. Paste the link.",
      "If you cannot, leave it open. Do not fill it from memory.",
    ],
    done: "Quoted with a link, or still open.",
    not: "Not a ranking of freedom. Not a targeting list.",
  },
};

export function methodFor(id: string | LinDeskId): PlainMethod {
  return METHODS[id] ?? METHODS.network;
}
