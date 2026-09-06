/** LPIN Fifty method — jurisdiction × process. Native, not a grok.me link. */

export const FIFTY_JURIS = [
  { id: "local", label: "Local" },
  { id: "county", label: "County" },
  { id: "state", label: "State" },
  { id: "federal", label: "Federal" },
] as const;

export const FIFTY_PROCESS = [
  { id: "funding", label: "Funding" },
  { id: "grants", label: "Grants" },
  { id: "permitting", label: "Permitting" },
  { id: "installation", label: "Installation" },
  { id: "privacy", label: "Privacy" },
  { id: "legislation", label: "Legislation" },
] as const;

export type FiftyJurisId = (typeof FIFTY_JURIS)[number]["id"];
export type FiftyProcessId = (typeof FIFTY_PROCESS)[number]["id"];

export function fiftyCellId(j: FiftyJurisId, p: FiftyProcessId): string {
  return `${j}-x-${p}`;
}

export const FIFTY_KERNEL = [
  "Two axes: jurisdiction and process. Do not collapse them into a vendor map.",
  "A city contract is not a county grant and not a state statute.",
  "Not retrieved is a finding. It is not “nothing happened.”",
  "User types locality. Product samples stay geographically agnostic.",
  "Not legal advice. Not a live camera registry. Human final call.",
] as const;
