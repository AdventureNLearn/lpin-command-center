/** Jobsite / claims packs. Lazy. No first-paint dump. No municipality samples. */

export const JOBSITE_HONESTY =
  "Guidance only. Not a live claims desk. Incomplete packs stay empty.";

/** Everyday empty. Serious users still get JOBSITE_HONESTY + rows []. */
export const JOBSITE_EMPTY = "We do not have that pack yet.";

export type JobsiteRow = {
  id: string;
  label: string;
  source: string;
  basis: "sourced" | "empty";
};

export type JobsitePack = {
  id: string;
  title: string;
  locality: string;
  rows: JobsiteRow[];
  incomplete: true;
  honesty: typeof JOBSITE_HONESTY;
};

export function normalizeJobsiteQuery(q: string): string {
  return q.trim().replace(/\s+/g, " ").slice(0, 80);
}

/** Only pack constructor. Honesty stamped. Rows stay empty. */
function holePack(locality: string): JobsitePack {
  return {
    id: `hole:${locality.toLowerCase()}`,
    title: JOBSITE_EMPTY,
    locality,
    rows: [],
    incomplete: true,
    honesty: JOBSITE_HONESTY,
  };
}

/**
 * Nothing is on disk. A typed name becomes a pack header plus an honest hole.
 * Do not invent claims. Do not pin. Do not merge LPIN or IDWT.
 */
export function lookupPack(q: string): JobsitePack | null {
  const locality = normalizeJobsiteQuery(q);
  if (!locality) return null;
  return holePack(locality);
}
