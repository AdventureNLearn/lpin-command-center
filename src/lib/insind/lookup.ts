/** Inspection Index adapter. User-typed lookup only. No nationwide dump. No iframe. */

export const INSIND_HONESTY =
  "Public FMCSA inspection files, last two years. Not a score. Not a government site. Human final call.";

export const INSIND_EMPTY = "No match on disk. We do not invent inspections.";

export type InsindHit = {
  id: string;
  query: string;
  rows: never[];
  incomplete: true;
  honesty: typeof INSIND_HONESTY;
};

export function normalizeInsindQuery(q: string): string {
  return q.trim().replace(/\s+/g, " ").slice(0, 80);
}

/**
 * VIN / plate / USDOT / MC / company name as typed.
 * This tree has no inspection corpus. Honest hole. 0 pins.
 */
export function lookupInsind(q: string): InsindHit | null {
  const query = normalizeInsindQuery(q);
  if (query.length < 3) return null;
  return {
    id: `insind:${query.toLowerCase()}`,
    query,
    rows: [],
    incomplete: true,
    honesty: INSIND_HONESTY,
  };
}
