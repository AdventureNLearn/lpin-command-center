/** LPIN Open Cells method — quote with URL or leave open. Native, not a grok.me link. */

export const OPENCELLS_KERNEL = [
  "A quote without a URL is not Supported.",
  "A bill is not law. Name the status in the same sentence.",
  "Same influence is not the same law.",
  "An organization is not a statute. Presence is not capture.",
  "Human attaches every card. Open cells stay open.",
  "Coverage of quotes is not a ranking of freedom.",
] as const;

export const OPENCELLS_STATUSES = ["open", "quoted", "bill", "repealed"] as const;
export type OpenCellStatus = (typeof OPENCELLS_STATUSES)[number];
