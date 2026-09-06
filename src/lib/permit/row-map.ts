export interface RowDesk {
  name: string;
}

export interface RowMetro {
  id: string;
  placeId: string;
  title: string;
  body: string;
  desks: string[];
}

export const ROW_INTRO =
  "A building permit almost never authorizes work in the public right-of-way, on a utility pole, or under a municipal franchise. Those are separate desks. Confirm which office issues the street-opening, excavation, pole-attachment, or franchise consent for the parcel before you cut pavement or hang fiber.";

export const ROW_STATUS =
  "Franchise / ROW map is partial (national overlay + selected major cities). Not a fee schedule. Not a certified login.";

export const ROW_NATIONAL_OVERLAY = [
  "Building department — structures on private property",
  "Public works / transportation — street opening, sidewalk, driveway, traffic control",
  "Utility / franchise administrator — municipal consent to occupy ROW",
  "State DOT — work in a state highway right-of-way",
  "811 / One Call — locate, not a permit",
  "Pole owner (IOU, co-op, or municipal utility) — attachment, not an AHJ stamp",
];

export const ROW_NATIONAL_LINKS = [
  {
    id: "call-811",
    label: "Call 811 before you dig",
    url: "https://call811.com/",
    note: "Utility locate. Separate from every permit listed here.",
  },
  {
    id: "fcc",
    label: "FCC — wireless siting / local authority overview",
    url: "https://www.fcc.gov/",
    note: "Federal overlay. Does not replace a local ROW or building permit.",
  },
  {
    id: "fhwa",
    label: "FHWA right-of-way",
    url: "https://www.fhwa.dot.gov/programadmin/utility.cfm",
    note: "Federal-aid highway ROW context. State DOT still issues the occupancy permit.",
  },
];

export const ROW_METROS: RowMetro[] = [
  {
    id: "nyc",
    placeId: "ny-nyc",
    title: "New York City — street, franchise, and fiber",
    body: "DOB issues the building permit. Work in the mapped street typically needs NYC DOT. Franchise / concession occupancy and some telecom paths are a different consent. FDNY and Landmarks can still appear as extra agencies.",
    desks: ["NYC DOB (building)", "NYC DOT (street / sidewalk)", "Franchise / concession (occupancy of City property)", "FDNY", "Landmarks if designated"],
  },
  {
    id: "la",
    placeId: "ca-los-angeles",
    title: "Los Angeles — BOE / street use vs LADBS",
    body: "LADBS is the building AHJ. Excavation and A-permits in the public way typically run through the Bureau of Engineering / street-use path, not the building ticket.",
    desks: ["LADBS (building)", "LA BOE / street use", "LADOT if traffic control", "Bureau of Street Lighting for some pole work"],
  },
  {
    id: "chicago",
    placeId: "il-chicago",
    title: "Chicago — CDOT / OUC vs Buildings",
    body: "Chicago DOB is the building desk. Opening the street or occupying the public way is usually CDOT. Office of Underground Coordination (OUC) is a common extra hold for excavation.",
    desks: ["Chicago DOB", "CDOT public way", "OUC for underground coordination"],
  },
  {
    id: "houston",
    placeId: "tx-houston",
    title: "Houston — HPC vs public-works utility",
    body: "Houston Permitting Center handles the building side. Utility and pavement cuts in the city ROW are a public-works / utility-permitting path. Harris County is a different AHJ outside city limits.",
    desks: ["Houston Permitting Center", "Houston Public Works utility / ROW", "Harris County outside the city"],
  },
  {
    id: "miami",
    placeId: "fl-miami",
    title: "Miami / Miami-Dade — city, county, and ROW split",
    body: "City of Miami iBuild is not Miami-Dade RER and is not Miami Beach. Street work may sit with city Public Works or the county, depending on the right-of-way owner. Unincorporated Miami-Dade is a different building AHJ.",
    desks: ["City of Miami Building (iBuild)", "Miami-Dade RER Building", "City or County Public Works for ROW", "FDOT if a state road"],
  },
  {
    id: "seattle",
    placeId: "wa-seattle",
    title: "Seattle — SDCI vs SDOT Street Use",
    body: "SDCI issues the building permit. Occupying the street, sidewalk, or planting strip is typically SDOT Street Use. WA L&I may still handle some electrical work.",
    desks: ["Seattle SDCI", "SDOT Street Use", "WA L&I electrical (some jobs)"],
  },
  {
    id: "atlanta",
    placeId: "ga-atlanta",
    title: "Atlanta — building vs ATL DOT / public works",
    body: "City building is one desk. Work in the city right-of-way is usually transportation / public works. Confirm whether the road is city, county, or GDOT.",
    desks: ["Atlanta building / site development", "ATL DOT or public works ROW", "GDOT on state routes"],
  },
  {
    id: "denver",
    placeId: "co-denver",
    title: "Denver — Development Services vs DOTI",
    body: "Denver Development Services is the building path. Street occupancy, excavation, and utility in the public way typically run through DOTI.",
    desks: ["Denver Development Services", "DOTI right-of-way"],
  },
  {
    id: "phoenix",
    placeId: "az-phoenix",
    title: "Phoenix — Planning & Development vs Street Transportation",
    body: "Planning & Development is the building AHJ. Cuts, hauling, and occupancy in the city street are Street Transportation / ROW, not the building ticket.",
    desks: ["Phoenix Planning & Development", "Street Transportation / ROW"],
  },
  {
    id: "dc",
    placeId: "dc-washington",
    title: "Washington, DC — DOB vs DDOT public space",
    body: "DOB issues construction permits. Occupying public space — sidewalk, tree space, curb cut, excavation — is typically DDOT public space, a separate consent.",
    desks: ["DC DOB", "DDOT public space", "Pepco / other pole owners for attachments"],
  },
  {
    id: "sf",
    placeId: "ca-san-francisco",
    title: "San Francisco — DBI vs Public Works excavation",
    body: "DBI is the building official. Excavation in the public right-of-way is typically Public Works. Planning remains a separate entitlements lane.",
    desks: ["SF DBI", "SF Public Works excavation / street-space", "SF Planning"],
  },
  {
    id: "dallas",
    placeId: "tx-dallas",
    title: "Dallas — building vs public works ROW",
    body: "Building permits and public-right-of-way occupancy are different files. Confirm whether the street is city, county, or TxDOT before you cut.",
    desks: ["Dallas building inspection", "Public works / ROW", "TxDOT on state routes"],
  },
  {
    id: "boston",
    placeId: "ma-boston",
    title: "Boston — ISD vs Public Works / occupancy",
    body: "Inspectional Services is the building AHJ. Occupying the sidewalk or opening the street is typically Public Works or a separate occupancy permit.",
    desks: ["Boston ISD", "Public Works / street occupancy"],
  },
  {
    id: "austin",
    placeId: "tx-austin",
    title: "Austin — Development Services vs ROW Management",
    body: "Development Services Center is the building path. Right-of-way management is a separate Austin Transportation / ROW desk for cuts and occupancy.",
    desks: ["Austin Development Services", "ROW Management / ATD"],
  },
  {
    id: "philadelphia",
    placeId: "pa-philadelphia",
    title: "Philadelphia — L&I vs Streets",
    body: "Licenses & Inspections is the building AHJ. Opening the cartway or occupying the sidewalk is typically Streets Department, not the L&I ticket.",
    desks: ["Philadelphia L&I", "Streets Department"],
  },
  {
    id: "fort-pierce",
    placeId: "fl-fort-pierce",
    title: "Fort Pierce / St. Lucie — city, county, FDOT",
    body: "City of Fort Pierce Planning / Building is not St. Lucie County and is not FDOT. A US-1 or state-road cut is usually an FDOT occupancy, not the city building ticket. Confirm who owns the pavement before you saw-cut.",
    desks: ["Fort Pierce Planning / Building", "St. Lucie County Building (outside city)", "FDOT District 4 on state roads", "811 locate"],
  },
];

export function rowMetroForPlace(placeId: string): RowMetro | undefined {
  return ROW_METROS.find((m) => m.placeId === placeId) ??
    (placeId === "fl-miami-dade" ? ROW_METROS.find((m) => m.id === "miami") : undefined);
}
