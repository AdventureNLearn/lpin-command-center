/** Comprehensive civic toolkit spine. Goal is full coverage; focus is the user's. Not a score. */

export const TOOLKIT_GOAL =
  "Countries first. The US kit is the most complete pack we have — not finished. Match that degree of attention on every country. Law, permitting, trades, industries, and regulations hang off that pack. Every cell is sourced or honestly empty. Accurate as of its retrieved date.";

export const COUNTRY_EXEMPLAR = {
  iso2: "us",
  path: "vendor/kept/kits/us",
  template: "vendor/kept/kits/_template",
  complete: false,
  note: "Most complete pack on disk, still incomplete. Copy the attention (sourced, dated, honest empty), not a fake done flag. Users type their own county.",
} as const;

export const TOOLKIT_MOTTO = "From the dirt to the shingles. From the field to the boardroom. Accuracy and transparency.";

/** Construction stack. Do not skip a layer when reasoning a job. */
export const DIRT_TO_SHINGLES = [
  { id: "dirt", label: "Dirt", ask: "Site, soils, grading, drainage. What is on the ground?" },
  { id: "foundation", label: "Foundation", ask: "What bears the load, and who stamped it?" },
  { id: "structure", label: "Structure", ask: "Framing, MEP rough. Built as drawn, or unknown?" },
  { id: "envelope", label: "Envelope", ask: "Weather barrier, openings, assemblies as approved." },
  { id: "shingles", label: "Shingles", ask: "Closeout, roof, final. Certificate of occupancy is not a punch list." },
] as const;

/** Civic stack. Do not skip a layer when reasoning authority or money. */
export const FIELD_TO_BOARDROOM = [
  { id: "field", label: "Field", ask: "What is actually happening on the job? Inspection, as-built, photo." },
  { id: "desk", label: "Desk", ask: "Who issues, who inspects, which portal? A URL is not an approval." },
  { id: "boardroom", label: "Boardroom", ask: "Who sits, what they passed, what they funded. Roster and minutes as filed." },
] as const;

/** Every data point in this product reasons with the same logic. */
export const DATA_POINTS = [
  { id: "law", label: "Law", desk: "legal", rule: "Quote the instrument. Status in the same sentence: live, bill, repealed, stayed." },
  { id: "permitting", label: "Permitting", desk: "permit", rule: "Name the AHJ before the nickname. A complete application is not a permit." },
  { id: "trades", label: "Trades", desk: "operational", rule: "License class and issuing body. A trade quote is not a building permit." },
  { id: "industries", label: "Industries", desk: "regulatory", rule: "Sector is not a statute. Route industry × jurisdiction. Empty beats the wrong rule." },
  { id: "regulations", label: "Regulations", desk: "regulatory", rule: "Issuing body before the rule nickname. Proposed, interim, final, stayed." },
  { id: "legislature", label: "Legislature", desk: "governance", rule: "Roster as filed. Vacancies not invented. Votes only with a clerk URL." },
  { id: "funding", label: "Funding", desk: "commerce", rule: "Source-type buckets. Named private donors stay off this board." },
  { id: "political", label: "Political", desk: "governance", rule: "Sitting, votes, pledges — quote plus URL, or blank." },
  { id: "corporate", label: "Corporate", desk: "commerce", rule: "Lobby, orgs, filers. Presence is not capture." },
] as const;

export const REASONING = [
  "Primary record beats commentary.",
  "Quote plus official URL, or the cell stays open.",
  "Status in the same sentence as the instrument.",
  "Tri-state where scored: Supported / Unproven / Disputed. Basis: Evidence / Inference / Assumption.",
  "Do not skip a stack layer. Dirt is not shingles. Field is not boardroom.",
  "Retrieved date is part of the claim. Stale is incomplete, not false.",
  "The human focuses the toolkit. The catalog aims at everything. Software never auto-truths.",
] as const;

/** Official classification indexes — source map, not a filled country overlay. */
export const CLASSIFICATION_SOURCES = [
  { id: "isic", label: "ISIC Rev. 4", url: "https://unstats.un.org/unsd/classifications/Econ/isic", kind: "industry" },
  { id: "naics", label: "NAICS", url: "https://www.census.gov/naics/", kind: "industry" },
  { id: "soc", label: "SOC / trades index", url: "https://www.bls.gov/soc/", kind: "trades" },
] as const;

export const TRADE_FAMILIES = [
  { id: "electrical", label: "Electrical" },
  { id: "plumbing", label: "Plumbing" },
  { id: "mechanical", label: "Mechanical" },
  { id: "structural", label: "Structural" },
  { id: "roofing", label: "Roofing" },
  { id: "excavation", label: "Excavation" },
  { id: "concrete", label: "Concrete" },
  { id: "carpentry", label: "Carpentry" },
  { id: "fire", label: "Fire protection" },
  { id: "low-voltage", label: "Low voltage" },
] as const;
