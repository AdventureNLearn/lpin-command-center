export type AdoptionModel = "statewide" | "statewide-local-admin" | "home-rule";

export interface OfficialLink {
  id: string;
  label: string;
  url: string;
  note: string;
}

export interface StateDesk {
  code: string;
  name: string;
  adoption: AdoptionModel;
  modelBase: string;
  typicalCycleYears: number | null;
  lastKnownEffective?: string;
  nextExpectedWindow?: string;
  notes: string[];
  commonPermits: string[];
  holdPoints: string[];
  links: OfficialLink[];
}

export interface PlaceDesk {
  id: string;
  name: string;
  kind: "city" | "county" | "district";
  state: string;
  county?: string;
  populationRank?: number;
  ahjName: string;
  portalName: string;
  portalUrl: string;
  departmentUrl: string;
  phone?: string;
  notes: string[];
  extraLinks: OfficialLink[];
  extraPermits?: string[];
  extraHolds?: string[];
}

export type ProjectKind =
  | "new-home"
  | "addition"
  | "interior-remodel"
  | "roof"
  | "electrical"
  | "plumbing"
  | "hvac"
  | "solar"
  | "deck-fence"
  | "pool"
  | "adu"
  | "demo"
  | "commercial-ti"
  | "window-door";

export interface ProcessStep {
  id: string;
  phase: "prepare" | "apply" | "review" | "build" | "closeout";
  title: string;
  detail: string;
  owner: string;
}

export interface InspectionHold {
  id: string;
  label: string;
  when: string;
  prep: string[];
}

export interface Playbook {
  id: ProjectKind;
  label: string;
  summary: string;
  typicallyNeedsPermit: string;
  relatedPermits: string[];
  documents: string[];
  steps: ProcessStep[];
  inspections: InspectionHold[];
  closeout: string[];
  watchouts: string[];
}

export const DISCLAIMER =
  "Guidance only — not legal advice, not a city login, and not a substitute for the adopted code or the Authority Having Jurisdiction. Confirm editions, fees, and procedures with the local building department before you apply or cover work.";
