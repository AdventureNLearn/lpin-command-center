import type { OfficialLink, ProcessStep } from "./types";

export const NATIONAL_LINKS: OfficialLink[] = [
  {
    id: "icc",
    label: "ICC public codes",
    url: "https://codes.iccsafe.org/",
    note: "Read-only model codes. Confirm the edition your AHJ adopted.",
  },
  {
    id: "fema-flood",
    label: "FEMA Flood Map Service Center",
    url: "https://msc.fema.gov/portal/home",
    note: "Check whether the parcel sits in a mapped flood zone before you design.",
  },
  {
    id: "call-811",
    label: "Call 811 before you dig",
    url: "https://call811.com/",
    note: "Utility locate. Separate from the building permit — still required.",
  },
  {
    id: "osha",
    label: "OSHA construction standards",
    url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926",
    note: "Federal jobsite safety — a different lane from the building official.",
  },
  {
    id: "ada",
    label: "ADA Standards",
    url: "https://www.access-board.gov/ada/",
    note: "Federal accessibility. Many AHJs also enforce a local accessibility path.",
  },
  {
    id: "epa-cgp",
    label: "EPA construction stormwater",
    url: "https://www.epa.gov/npdes/stormwater-discharges-construction-activities",
    note: "Federal CGP overview. Check your state construction general permit.",
  },
  {
    id: "energy-codes",
    label: "DOE Building Energy Codes",
    url: "https://www.energycodes.gov/",
    note: "Status of state energy-code adoption. Confirm the local path.",
  },
  {
    id: "nfpa",
    label: "NFPA free access",
    url: "https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards",
    note: "Index of fire standards. Free-access terms set by NFPA.",
  },
];

export const FIND_AHJ_STEPS: ProcessStep[] = [
  {
    id: "use-the-address",
    phase: "prepare",
    title: "Use the job address, not the mailing city",
    detail:
      "A Miami mailing address can sit in Coral Gables, Miami Beach, or unincorporated Miami-Dade. The folio / parcel / city-limits line decides the desk — not the post office.",
    owner: "Owner or GC",
  },
  {
    id: "city-or-county",
    phase: "prepare",
    title: "Decide city limits vs. unincorporated county",
    detail:
      "Inside a city, the municipal building department usually issues. Outside, it is often the county. Consolidated governments (Jacksonville, Nashville, Indianapolis, Denver, New Orleans) collapse that split — still confirm.",
    owner: "Owner or GC",
  },
  {
    id: "extra-desks",
    phase: "prepare",
    title: "Name the extra desks",
    detail:
      "Floodplain, historic, zoning, fire, health, and right-of-way are frequently separate counters. A building permit does not automatically clear them.",
    owner: "Designer",
  },
  {
    id: "confirm-voice",
    phase: "prepare",
    title: "Confirm in writing if two portals look plausible",
    detail:
      "Call or email both departments with the address and folio. Ask: “Which office issues the building permit for this parcel?” Keep the answer in the job file.",
    owner: "Applicant",
  },
];

export const PHASES: Array<{
  id: ProcessStep["phase"];
  title: string;
  summary: string;
}> = [
  {
    id: "prepare",
    title: "Prepare",
    summary: "Confirm the AHJ, whether the work is permitted, and who can pull the ticket. Clear zoning, flood, and utilities before you pay for a full set.",
  },
  {
    id: "apply",
    title: "Apply",
    summary: "Assemble a complete submittal and file it in the official portal. Pay intake. Keep the record number. A complete application is not a permit.",
  },
  {
    id: "review",
    title: "Review",
    summary: "Answer every comment, cloud the sheets, and resubmit the set the AHJ asked for. Issuance comes after fees and a stamped job copy.",
  },
  {
    id: "build",
    title: "Build",
    summary: "Build only what the last ticket allows. Call inspections before you conceal work. The approved set on site is the only legal job copy.",
  },
  {
    id: "closeout",
    title: "Close out",
    summary: "Trade finals, then building final. Ask the department to close the file. Keep the CO / CC, as-builts, and product papers with the property.",
  },
];

export const FIELD_TRUTHS = [
  "The Authority Having Jurisdiction is a desk, not a vibe. Name it.",
  "Starting before issuance is the fastest path to a stop-work order.",
  "A passed inspection is a ticket, not a conversation.",
  "The stamped set on site is the only legal job copy.",
  "A permit is not closed until the department finals it.",
  "Guidance here is not the adopted code. Confirm the edition on the permit.",
];

export function suggestedAhjSearch(city: string, stateCode: string): string {
  const place = city.trim();
  const st = stateCode.trim().toUpperCase();
  if (!place) return `${st} building department permit portal`;
  return `${place} ${st} building department permit portal`;
}

/** Honest status for franchise / ROW / fiber. Partial — do not treat as certified logins. */
export const ROW_FIBER_STATUS =
  "Partial — national + selected major cities. Street, excavation, and telecom franchise work is often a different counter from the building AHJ.";

export interface RowFiberNote {
  id: string;
  scope: "national" | "metro";
  placeId?: string;
  label: string;
  url: string;
  note: string;
}

export const ROW_FIBER_NOTES: RowFiberNote[] = [
  {
    id: "nat-811",
    scope: "national",
    label: "Call 811 before you dig",
    url: "https://call811.com/",
    note: "Utility locate. Separate from the building permit — still required for most excavation.",
  },
  {
    id: "nat-fcc",
    scope: "national",
    label: "FCC — communications / pole attachments",
    url: "https://www.fcc.gov/",
    note: "Federal overlay for telecom. Local ROW and franchise still control the street and the pole in the right-of-way.",
  },
  {
    id: "nat-fhwa",
    scope: "national",
    label: "FHWA — utilities in highway ROW",
    url: "https://www.fhwa.dot.gov/programadmin/utility.cfm",
    note: "State DOT ROW is a different desk from the municipal building official. Confirm before you occupy a state road.",
  },
  {
    id: "metro-nyc",
    scope: "metro",
    placeId: "ny-nyc",
    label: "NYC DOT — streets and sidewalks",
    url: "https://www.nyc.gov/html/dot/html/permits/permits.shtml",
    note: "Street opening, sidewalk, and franchise occupancy are DOT, not DOB. Confirm the current permit type on the DOT site.",
  },
  {
    id: "metro-la",
    scope: "metro",
    placeId: "ca-los-angeles",
    label: "Los Angeles Streets / BOE",
    url: "https://streetsla.lacity.org/",
    note: "Excavation, U-permit, and franchise in the public way are not LADBS building tickets.",
  },
  {
    id: "metro-chicago",
    scope: "metro",
    placeId: "il-chicago",
    label: "Chicago CDOT",
    url: "https://www.chicago.gov/city/en/depts/cdot.html",
    note: "Public-way opening and occupancy sit with CDOT. Building is a separate department.",
  },
  {
    id: "metro-houston",
    scope: "metro",
    placeId: "tx-houston",
    label: "Houston Public Works",
    url: "https://www.houstonpermittingcenter.org/",
    note: "ROW / utility in the street is often a different queue from the building permit even when both are filed at the Permitting Center. Confirm the record type.",
  },
  {
    id: "metro-miami",
    scope: "metro",
    placeId: "fl-miami",
    label: "City of Miami — right-of-way",
    url: "https://www.miami.gov/",
    note: "iBuild is the building portal. Street / franchise work is a separate city counter — confirm before you cut pavement.",
  },
  {
    id: "metro-miami-dade",
    scope: "metro",
    placeId: "fl-miami-dade",
    label: "Miami-Dade Transportation & Public Works",
    url: "https://www.miamidade.gov/global/transportation/home.page",
    note: "County ROW and the county building department (RER) are different desks.",
  },
  {
    id: "metro-seattle",
    scope: "metro",
    placeId: "wa-seattle",
    label: "Seattle SDOT",
    url: "https://www.seattle.gov/transportation",
    note: "Street-use and utility permits are SDOT. SDCI issues the building permit.",
  },
  {
    id: "metro-dc",
    scope: "metro",
    placeId: "dc-washington",
    label: "DDOT",
    url: "https://ddot.dc.gov/",
    note: "Public-space and occupancy permits are DDOT. DOB is the building official.",
  },
  {
    id: "metro-denver",
    scope: "metro",
    placeId: "co-denver",
    label: "Denver DOTI",
    url: "https://www.denvergov.org/Government/Agencies-Departments-Offices/Department-of-Transportation-and-Infrastructure",
    note: "ROW / excavation is DOTI. Community Planning and Development is the building AHJ.",
  },
  {
    id: "metro-phoenix",
    scope: "metro",
    placeId: "az-phoenix",
    label: "Phoenix Street Transportation",
    url: "https://www.phoenix.gov/streets",
    note: "Street cuts and occupancy are not the Planning & Development building ticket.",
  },
  {
    id: "metro-philadelphia",
    scope: "metro",
    placeId: "pa-philadelphia",
    label: "Philadelphia Streets Department",
    url: "https://www.phila.gov/departments/department-of-streets/",
    note: "Street opening / dumpster / occupancy is Streets. L&I is the building official.",
  },
  {
    id: "metro-atlanta",
    scope: "metro",
    placeId: "ga-atlanta",
    label: "Atlanta Department of Transportation",
    url: "https://www.atlantaga.gov/government/departments/transportation",
    note: "ROW / lane closure is ATLDOT. Office of Buildings is a different counter.",
  },
];

export function rowNotesForPlace(placeId: string): RowFiberNote[] {
  return ROW_FIBER_NOTES.filter((n) => n.scope === "national" || n.placeId === placeId);
}
