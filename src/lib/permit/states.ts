import type { OfficialLink, StateDesk } from "./types";

const ICC: OfficialLink = {
  id: "icc",
  label: "ICC public codes",
  url: "https://codes.iccsafe.org/",
  note: "Read-only model codes. Confirm the edition your AHJ adopted.",
};

const OSHA: OfficialLink = {
  id: "osha",
  label: "OSHA construction standards",
  url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926",
  note: "Federal jobsite safety — separate from the building permit.",
};

const ADA: OfficialLink = {
  id: "ada",
  label: "ADA Standards",
  url: "https://www.access-board.gov/ada/",
  note: "Federal accessibility. Many AHJs also enforce a local accessibility path.",
};

const EPA: OfficialLink = {
  id: "epa",
  label: "EPA construction stormwater",
  url: "https://www.epa.gov/npdes/stormwater-discharges-construction-activities",
  note: "Federal CGP overview. Check your state construction general permit.",
};

const NFPA: OfficialLink = {
  id: "nfpa",
  label: "NFPA free access",
  url: "https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards",
  note: "Index of fire standards. Free-access terms set by NFPA.",
};

function s(partial: StateDesk): StateDesk {
  return {
    ...partial,
    links: [...partial.links, ICC, OSHA, ADA, EPA, NFPA],
  };
}

/** All 50 states + DC + 5 inhabited territories. Cycle notes adapted from LPINv3 jurisdiction packs. */
export const TERRITORY_CODES = new Set(["AS", "GU", "MP", "PR", "VI"]);

export function isTerritory(code: string): boolean {
  return TERRITORY_CODES.has(code.toUpperCase());
}

export const STATES: StateDesk[] = [
  s({
    code: "AL", name: "Alabama", adoption: "statewide-local-admin",
    modelBase: "Alabama Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local administration.", "Confirm the adopted edition with the local building department."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "al-bc", label: "Alabama Building Commission", url: "https://bc.alabama.gov/", note: "State code path." },
      { id: "al-lic", label: "Alabama Licensing Board for General Contractors", url: "https://genconbd.alabama.gov/", note: "Contractor licensing." },
    ],
  }),
  s({
    code: "AK", name: "Alaska", adoption: "statewide-local-admin",
    modelBase: "Alaska Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Cold-climate and seismic paths are frequently material.", "Confirm edition and local amendments with the AHJ."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "ak-com", label: "Alaska DCCED", url: "https://www.commerce.alaska.gov/", note: "State commerce / licensing." },
    ],
  }),
  s({
    code: "AZ", name: "Arizona", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    nextExpectedWindow: "Local only — varies by municipality",
    notes: ["Primarily local adoption for private construction.", "Confirm the city or county adopted edition and amendments."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "az-roc", label: "Arizona Registrar of Contractors", url: "https://roc.az.gov/", note: "Contractor licensing." },
    ],
  }),
  s({
    code: "AR", name: "Arkansas", adoption: "statewide-local-admin",
    modelBase: "Arkansas Fire Prevention Code / I-Codes as adopted", typicalCycleYears: 3,
    notes: ["Statewide minimum codes with local enforcement.", "Confirm the current edition with the local department."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ar-labor", label: "Arkansas Department of Labor", url: "https://www.labor.arkansas.gov/", note: "State labor / code path." },
    ],
  }),
  s({
    code: "CA", name: "California", adoption: "statewide-local-admin",
    modelBase: "California Building Standards Code (Title 24) — 2025 edition",
    typicalCycleYears: 3, lastKnownEffective: "2026-01-01",
    nextExpectedWindow: "Residential code changes largely paused through ~June 2031 (except emergencies / wildfire mitigation)",
    notes: [
      "Statewide Title 24 with local administration and amendments.",
      "Energy (Part 6) and accessibility (Ch 11A/11B) paths are frequently material.",
      "Recent legislation paused most residential code changes through approximately June 2031.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire", "Energy"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation / Title 24", "Final"],
    links: [
      { id: "ca-bsc", label: "California Building Standards Commission", url: "https://www.dgs.ca.gov/BSC", note: "Title 24 process." },
      { id: "ca-cslb", label: "Contractors State License Board", url: "https://www.cslb.ca.gov/", note: "Contractor licensing." },
      { id: "ca-energy", label: "California Energy Commission", url: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", note: "Title 24 Part 6." },
    ],
  }),
  s({
    code: "CO", name: "Colorado", adoption: "home-rule",
    modelBase: "Local adoption with state influence on some occupancies", typicalCycleYears: null,
    nextExpectedWindow: "Local only — snow load and energy vary by elevation",
    notes: ["Largely local AHJ adoption.", "Snow load and energy paths vary by elevation — confirm with the local AHJ."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "co-dora", label: "Colorado DORA", url: "https://dora.colorado.gov/", note: "Professional licensing." },
    ],
  }),
  s({
    code: "CT", name: "Connecticut", adoption: "statewide-local-admin",
    modelBase: "Connecticut State Building Code (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide building code with local administration.", "Confirm the current edition and any local amendments."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "ct-osbi", label: "Office of the State Building Inspector", url: "https://portal.ct.gov/DAS/Office-of-the-State-Building-Inspector", note: "State building code." },
    ],
  }),
  s({
    code: "DE", name: "Delaware", adoption: "statewide-local-admin",
    modelBase: "Delaware Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "de-osfc", label: "Delaware State Fire Marshal", url: "https://statefiremarshal.delaware.gov/", note: "Fire / construction path." },
    ],
  }),
  s({
    code: "DC", name: "District of Columbia", adoption: "statewide-local-admin",
    modelBase: "DC Construction Codes", typicalCycleYears: 3,
    notes: ["The District maintains its own construction codes under DOB administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire", "C of O"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final", "C of O"],
    links: [
      { id: "dc-dob", label: "DC Department of Buildings", url: "https://dob.dc.gov/", note: "Permits and inspections." },
    ],
  }),
  s({
    code: "FL", name: "Florida", adoption: "statewide-local-admin",
    modelBase: "Florida Building Code (FBC) — 8th Edition (2023), based on 2021 I-Codes",
    typicalCycleYears: 3, lastKnownEffective: "2023-12-31",
    nextExpectedWindow: "9th Edition (2026) Florida Building Commission process — confirm effective date on the permit",
    notes: [
      "Single statewide Florida Building Code; cities and counties administer permits and inspections locally.",
      "Where HVHZ applies, product-approval / NOA rules stack on the base FBC path.",
      "Roof systems, openings, and wind-borne debris protection are common coastal hold points.",
      "Flood design (where mapped) often runs in parallel with structural and envelope reviews.",
    ],
    commonPermits: ["Building", "Roofing", "Electrical", "Plumbing", "Mechanical", "Fire", "Window / shutter", "Flood / elevation path"],
    holdPoints: ["Footing", "Foundation", "Framing", "Roof dry-in", "Window / opening", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "fl-fbc", label: "Florida Building Commission", url: "https://www.floridabuilding.org/", note: "Statewide FBC process — not a local AHJ login." },
      { id: "fl-dbpr", label: "MyFloridaLicense (DBPR)", url: "https://www.myfloridalicense.com/", note: "Contractor and professional licenses." },
      { id: "fl-product", label: "Florida Product Approval", url: "https://www.floridabuilding.org/pr/pr_app_srch.aspx", note: "Product approval search used on many envelope assemblies." },
    ],
  }),
  s({
    code: "GA", name: "Georgia", adoption: "statewide-local-admin",
    modelBase: "Georgia State Minimum Standard Codes (based on I-Codes)", typicalCycleYears: 3,
    notes: ["State minimum standard codes; locals administer and may amend."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "ga-dca", label: "Georgia DCA", url: "https://www.dca.ga.gov/", note: "State community affairs / codes." },
      { id: "ga-sos", label: "Georgia Secretary of State licensing", url: "https://sos.ga.gov/", note: "Professional licensing." },
    ],
  }),
  s({
    code: "HI", name: "Hawaii", adoption: "statewide-local-admin",
    modelBase: "Hawaii State Building Code (I-Codes based)", typicalCycleYears: 3,
    notes: ["State codes administered largely at the county level.", "Wind, seismic, and flood provisions are frequently material."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "hi-sbcc", label: "Hawaii State Building Code Council", url: "https://ags.hawaii.gov/bcc/", note: "State code council." },
    ],
  }),
  s({
    code: "ID", name: "Idaho", adoption: "statewide-local-admin",
    modelBase: "Idaho Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "id-dbs", label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/", note: "Building safety / licensing." },
    ],
  }),
  s({
    code: "IL", name: "Illinois", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    notes: ["Most of Illinois is local adoption; some large municipalities keep distinct paths.", "Illinois Plumbing Code is often statewide even when building codes are local."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "il-idfpr", label: "IDFPR", url: "https://idfpr.illinois.gov/", note: "Professional regulation." },
    ],
  }),
  s({
    code: "IN", name: "Indiana", adoption: "statewide-local-admin",
    modelBase: "Indiana Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide building codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "in-dhs", label: "Indiana Department of Homeland Security", url: "https://www.in.gov/dhs/", note: "State fire / building codes." },
    ],
  }),
  s({
    code: "IA", name: "Iowa", adoption: "statewide-local-admin",
    modelBase: "Iowa State Building Code (where applicable) / local I-Codes", typicalCycleYears: 3,
    notes: ["Mix of state building code applicability and local adoption.", "Confirm which codes apply to your occupancy with the local AHJ."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ia-dps", label: "Iowa Department of Inspections, Appeals, and Licensing", url: "https://dial.iowa.gov/", note: "State building code bureau path." },
    ],
  }),
  s({
    code: "KS", name: "Kansas", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    notes: ["Primarily local adoption. Confirm the city or county edition."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ks-sfm", label: "Kansas State Fire Marshal", url: "https://firemarshal.ks.gov/", note: "State fire path." },
    ],
  }),
  s({
    code: "KY", name: "Kentucky", adoption: "statewide-local-admin",
    modelBase: "Kentucky Building Code / Residential Code", typicalCycleYears: 3,
    notes: ["Statewide building and residential codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ky-dhbc", label: "KY Housing, Buildings and Construction", url: "https://dhbc.ky.gov/", note: "State building department." },
    ],
  }),
  s({
    code: "LA", name: "Louisiana", adoption: "statewide-local-admin",
    modelBase: "Louisiana State Uniform Construction Code", typicalCycleYears: 3,
    notes: ["Statewide uniform construction code with local administration.", "Wind and flood provisions are frequently material on the coast."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "la-lsuccc", label: "LSUCCC", url: "https://lsuccc.dps.louisiana.gov/", note: "Uniform construction code council." },
      { id: "la-lslbc", label: "Louisiana Licensing Board for Contractors", url: "https://lslbc.louisiana.gov/", note: "Contractor licensing." },
    ],
  }),
  s({
    code: "ME", name: "Maine", adoption: "statewide-local-admin",
    modelBase: "Maine Uniform Building and Energy Code (MUBEC)", typicalCycleYears: 3,
    notes: ["MUBEC with local administration. Confirm enforcement status for smaller towns."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "me-mubec", label: "Maine Office of State Fire Marshal", url: "https://www.maine.gov/dps/fmo/", note: "MUBEC / fire marshal." },
    ],
  }),
  s({
    code: "MD", name: "Maryland", adoption: "statewide-local-admin",
    modelBase: "Maryland Building Performance Standards (based on I-Codes)", typicalCycleYears: 3,
    notes: ["Statewide building performance standards with local administration and amendments."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "md-dllr", label: "Maryland Labor", url: "https://www.labor.maryland.gov/", note: "Codes / licensing path." },
    ],
  }),
  s({
    code: "MA", name: "Massachusetts", adoption: "statewide-local-admin",
    modelBase: "Massachusetts State Building Code (based on I-Codes)", typicalCycleYears: 3,
    notes: ["Statewide code with local enforcement.", "Some municipalities adopt stretch energy provisions."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "ma-bbrs", label: "Board of Building Regulations and Standards", url: "https://www.mass.gov/orgs/board-of-building-regulations-and-standards", note: "State building code." },
    ],
  }),
  s({
    code: "MI", name: "Michigan", adoption: "statewide-local-admin",
    modelBase: "Michigan Building / Residential / Rehab codes", typicalCycleYears: 3,
    notes: ["Statewide construction codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "mi-bcc", label: "Michigan Bureau of Construction Codes", url: "https://www.michigan.gov/lara/bureau-list/bcc", note: "State construction codes." },
    ],
  }),
  s({
    code: "MN", name: "Minnesota", adoption: "statewide-local-admin",
    modelBase: "Minnesota State Building Code", typicalCycleYears: 3,
    notes: ["Statewide building code with local administration.", "Cold-climate energy and envelope paths are frequently material."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "mn-dli", label: "Minnesota DLI", url: "https://www.dli.mn.gov/", note: "State building code." },
    ],
  }),
  s({
    code: "MS", name: "Mississippi", adoption: "statewide-local-admin",
    modelBase: "Mississippi Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ms-sbcc", label: "Mississippi State Board of Contractors", url: "https://www.msboc.us/", note: "Contractor licensing." },
    ],
  }),
  s({
    code: "MO", name: "Missouri", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    notes: ["Primarily local adoption. Confirm the city or county edition."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "mo-pr", label: "Missouri Division of Professional Registration", url: "https://pr.mo.gov/", note: "Licensing." },
    ],
  }),
  s({
    code: "MT", name: "Montana", adoption: "statewide-local-admin",
    modelBase: "Montana Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "mt-bsd", label: "Montana Building Codes Program", url: "https://bsd.dli.mt.gov/", note: "State building codes." },
    ],
  }),
  s({
    code: "NE", name: "Nebraska", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    notes: ["Primarily local adoption. Confirm the municipal edition."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ne-sfm", label: "Nebraska State Fire Marshal", url: "https://sfm.nebraska.gov/", note: "State fire path." },
    ],
  }),
  s({
    code: "NV", name: "Nevada", adoption: "statewide-local-admin",
    modelBase: "Nevada Building Codes (I-Codes based) / local amendments", typicalCycleYears: 3,
    notes: ["Statewide frameworks with significant local administration and amendments."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "nv-nscb", label: "Nevada State Contractors Board", url: "https://www.nvcontractorsboard.com/", note: "Contractor licensing." },
    ],
  }),
  s({
    code: "NH", name: "New Hampshire", adoption: "statewide-local-admin",
    modelBase: "New Hampshire State Building Code", typicalCycleYears: 3,
    notes: ["Statewide building code with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "nh-osb", label: "NH Office of the State Fire Marshal", url: "https://www.nh.gov/safety/divisions/firesafety/", note: "State building / fire codes." },
    ],
  }),
  s({
    code: "NJ", name: "New Jersey", adoption: "statewide-local-admin",
    modelBase: "New Jersey Uniform Construction Code", typicalCycleYears: 3,
    notes: ["Statewide UCC with local construction officials."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "nj-dca", label: "NJ DCA Codes", url: "https://www.nj.gov/dca/divisions/codes/", note: "Uniform Construction Code." },
    ],
  }),
  s({
    code: "NM", name: "New Mexico", adoption: "statewide-local-admin",
    modelBase: "New Mexico Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide building codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "nm-cid", label: "NM Construction Industries Division", url: "https://www.rld.nm.gov/construction-industries/", note: "State CID / licensing." },
    ],
  }),
  s({
    code: "NY", name: "New York", adoption: "statewide-local-admin",
    modelBase: "NYS Uniform Code (statewide framework)", typicalCycleYears: 3,
    notes: [
      "The Uniform Code is the statewide framework with local enforcement.",
      "Some large municipalities maintain separate construction codes.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "ny-dos", label: "NYS Building Standards and Codes", url: "https://dos.ny.gov/building-standards-and-codes", note: "Uniform Code." },
    ],
  }),
  s({
    code: "NC", name: "North Carolina", adoption: "statewide-local-admin",
    modelBase: "North Carolina Building / Residential Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local enforcement; residential review cycles have lengthened in recent years."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "nc-osfm", label: "NC Office of State Fire Marshal", url: "https://www.ncosfm.gov/", note: "State codes." },
    ],
  }),
  s({
    code: "ND", name: "North Dakota", adoption: "statewide-local-admin",
    modelBase: "North Dakota Building Codes (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "nd-ag", label: "North Dakota State Fire Marshal", url: "https://attorneygeneral.nd.gov/public-safety/fire-marshal/", note: "State fire marshal." },
    ],
  }),
  s({
    code: "OH", name: "Ohio", adoption: "statewide-local-admin",
    modelBase: "Ohio Building Code / Residential Code", typicalCycleYears: 3,
    notes: ["Statewide building and residential codes with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "oh-bbs", label: "Ohio Board of Building Standards", url: "https://com.ohio.gov/divisions-and-programs/industrial-compliance/boards/board-of-building-standards", note: "State building standards." },
    ],
  }),
  s({
    code: "OK", name: "Oklahoma", adoption: "statewide-local-admin",
    modelBase: "Oklahoma Building Codes (I-Codes based) / local amendments", typicalCycleYears: 3,
    notes: ["Statewide frameworks with local administration and amendments."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ok-ccib", label: "Oklahoma Construction Industries Board", url: "https://cib.ok.gov/", note: "Trade licensing." },
    ],
  }),
  s({
    code: "OR", name: "Oregon", adoption: "statewide-local-admin",
    modelBase: "Oregon Structural Specialty Code / Residential Specialty Code", typicalCycleYears: 3,
    notes: ["Statewide specialty codes with local administration.", "Energy and seismic paths are frequently material."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "or-bcd", label: "Oregon Building Codes Division", url: "https://www.oregon.gov/bcd", note: "Statewide specialty codes." },
    ],
  }),
  s({
    code: "PA", name: "Pennsylvania", adoption: "statewide-local-admin",
    modelBase: "Pennsylvania Uniform Construction Code (UCC)", typicalCycleYears: 3,
    notes: ["UCC is the statewide framework; local enforcement and limited opt-outs exist.", "Confirm enforcement status with the local code official."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "pa-dli", label: "PA Labor & Industry — UCC", url: "https://www.dli.pa.gov/ucc/Pages/default.aspx", note: "Uniform Construction Code." },
    ],
  }),
  s({
    code: "RI", name: "Rhode Island", adoption: "statewide-local-admin",
    modelBase: "Rhode Island State Building Code", typicalCycleYears: 3,
    notes: ["Statewide building code with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ri-dbr", label: "RI Building Code Commission", url: "https://dbr.ri.gov/building-code-commission", note: "State building code." },
    ],
  }),
  s({
    code: "SC", name: "South Carolina", adoption: "statewide-local-admin",
    modelBase: "South Carolina Building Codes (based on I-Codes)", typicalCycleYears: 3,
    notes: ["State-adopted codes with local administration.", "Coastal and flood provisions are frequently material on the coast."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "sc-llr", label: "SC LLR / Building Codes Council", url: "https://llr.sc.gov/", note: "State codes and licensing." },
    ],
  }),
  s({
    code: "SD", name: "South Dakota", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    notes: ["Primarily local adoption. Confirm the municipal edition."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "sd-dps", label: "South Dakota DPS", url: "https://dps.sd.gov/", note: "State public safety." },
    ],
  }),
  s({
    code: "TN", name: "Tennessee", adoption: "statewide-local-admin",
    modelBase: "Tennessee Building Codes (I-Codes based) / local adoption paths", typicalCycleYears: 3,
    notes: ["Statewide frameworks with substantial local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "tn-sfm", label: "TN State Fire Marshal", url: "https://www.tn.gov/commerce/fire-prevention.html", note: "State fire marshal / codes." },
    ],
  }),
  s({
    code: "TX", name: "Texas", adoption: "home-rule",
    modelBase: "Local adoption of IBC / IRC / NEC (no single statewide building code for all cities)",
    typicalCycleYears: null,
    notes: [
      "Texas does not impose one statewide building code on all cities.",
      "Municipal and county adoptions and amendment calendars differ.",
      "Texas Accessibility Standards apply where TAS is triggered.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire", "Sign"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "SWPPP / erosion", "Final"],
    links: [
      { id: "tx-tdlr", label: "Texas Department of Licensing and Regulation", url: "https://www.tdlr.texas.gov/", note: "Electricians, HVAC, TAS, and other trades." },
      { id: "tx-tmb", label: "Texas Windstorm Insurance Association", url: "https://www.twia.org/", note: "Coastal windstorm path — not a building department." },
    ],
  }),
  s({
    code: "UT", name: "Utah", adoption: "statewide-local-admin",
    modelBase: "Utah State Construction Code (I-Codes based)", typicalCycleYears: 3,
    notes: ["Statewide construction code with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "ut-ubcc", label: "Utah Uniform Building Code Commission", url: "https://cop.utah.gov/", note: "State construction code." },
    ],
  }),
  s({
    code: "VT", name: "Vermont", adoption: "statewide-local-admin",
    modelBase: "Vermont Fire & Building Safety Code / energy paths", typicalCycleYears: 3,
    notes: ["Statewide fire and building safety paths with local administration.", "Energy paths are frequently material."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "vt-dfs", label: "Vermont Division of Fire Safety", url: "https://firesafety.vermont.gov/", note: "State fire / building safety." },
    ],
  }),
  s({
    code: "VA", name: "Virginia", adoption: "statewide-local-admin",
    modelBase: "Virginia Uniform Statewide Building Code (USBC)", typicalCycleYears: 3,
    notes: ["Statewide USBC with local building departments."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "va-dhcd", label: "Virginia DHCD — USBC", url: "https://www.dhcd.virginia.gov/usbc", note: "Uniform Statewide Building Code." },
      { id: "va-dpb", label: "Virginia DPOR", url: "https://www.dpor.virginia.gov/", note: "Contractor licensing." },
    ],
  }),
  s({
    code: "WA", name: "Washington", adoption: "statewide-local-admin",
    modelBase: "Washington State Building Code (based on IBC/IRC)", typicalCycleYears: 3,
    notes: ["Statewide code with local administration — confirm city amendments.", "Washington energy code paths are frequently material."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "wa-sbcc", label: "Washington State Building Code Council", url: "https://sbcc.wa.gov/", note: "State building / energy codes." },
      { id: "wa-lni", label: "WA L&I electrical", url: "https://lni.wa.gov/licensing-permits/electrical/", note: "State electrical permits in many jurisdictions." },
    ],
  }),
  s({
    code: "WV", name: "West Virginia", adoption: "statewide-local-admin",
    modelBase: "West Virginia State Building Code", typicalCycleYears: 3,
    notes: ["Statewide building code with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "wv-sfm", label: "WV State Fire Marshal", url: "https://firemarshal.wv.gov/", note: "State fire marshal / codes." },
    ],
  }),
  s({
    code: "WI", name: "Wisconsin", adoption: "statewide-local-admin",
    modelBase: "Wisconsin Commercial Building Code / Uniform Dwelling Code", typicalCycleYears: 3,
    notes: ["Statewide commercial and dwelling code paths with local administration."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Insulation", "Final"],
    links: [
      { id: "wi-dsps", label: "Wisconsin DSPS", url: "https://dsps.wi.gov/", note: "Commercial building / UDC." },
    ],
  }),
  s({
    code: "WY", name: "Wyoming", adoption: "home-rule",
    modelBase: "Local adoption of model codes", typicalCycleYears: null,
    notes: ["Primarily local adoption. Confirm the city or county edition."],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Footing", "Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "wy-wsfm", label: "Wyoming State Fire Marshal", url: "https://wsfm.wyo.gov/", note: "State fire marshal." },
    ],
  }),
  s({
    code: "AS", name: "American Samoa", adoption: "statewide-local-admin",
    modelBase: "American Samoa building / public-works codes (I-Codes influence)", typicalCycleYears: null,
    notes: [
      "Territorial public works administers most building permits.",
      "Confirm the current edition and whether the work is on territorial or village land.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical"],
    holdPoints: ["Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "as-gov", label: "American Samoa Government", url: "https://www.americansamoa.gov/", note: "Territorial government home." },
    ],
  }),
  s({
    code: "GU", name: "Guam", adoption: "statewide-local-admin",
    modelBase: "Guam building code (I-Codes based)", typicalCycleYears: 3,
    notes: [
      "Island-wide administration through Guam DPW Building Permits & Inspection.",
      "Typhoon, seismic, and flood paths are frequently material.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire"],
    holdPoints: ["Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "gu-dpw", label: "Guam Department of Public Works", url: "https://dpw.guam.gov/", note: "Building permits and inspection." },
    ],
  }),
  s({
    code: "MP", name: "Northern Mariana Islands", adoption: "statewide-local-admin",
    modelBase: "CNMI building / public-works codes (I-Codes influence)", typicalCycleYears: null,
    notes: [
      "Commonwealth public works / building safety issues most construction permits.",
      "Typhoon and seismic provisions are frequently material on Saipan, Tinian, and Rota.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical"],
    holdPoints: ["Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "mp-gov", label: "CNMI Government", url: "https://gov.mp/", note: "Commonwealth government home." },
    ],
  }),
  s({
    code: "PR", name: "Puerto Rico", adoption: "statewide-local-admin",
    modelBase: "Puerto Rico Building Code (I-Codes based) administered through OGPe", typicalCycleYears: 3,
    notes: [
      "OGPe (Oficina de Gerencia de Permisos) is the primary territorial permit desk.",
      "Municipalities may still hold related local reviews. Confirm both counters.",
      "Wind, flood, and seismic paths are frequently material.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire", "OGPe consultation"],
    holdPoints: ["Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "pr-ogpe", label: "OGPe — Oficina de Gerencia de Permisos", url: "https://www.ogpe.pr.gov/", note: "Territorial permit management office." },
      { id: "pr-jp", label: "Junta de Planificación", url: "https://jp.pr.gov/", note: "Planning board." },
    ],
  }),
  s({
    code: "VI", name: "U.S. Virgin Islands", adoption: "statewide-local-admin",
    modelBase: "USVI building / DPNR construction codes (I-Codes based)", typicalCycleYears: 3,
    notes: [
      "DPNR administers construction permitting across St. Thomas, St. John, and St. Croix.",
      "Hurricane, flood, and coastal setback reviews are common extra lanes.",
    ],
    commonPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Coastal / CZM"],
    holdPoints: ["Foundation", "Framing", "MEP rough", "Final"],
    links: [
      { id: "vi-dpnr", label: "USVI DPNR", url: "https://dpnr.vi.gov/", note: "Planning and natural resources / construction permits." },
    ],
  }),
];

const BY_CODE = new Map(STATES.map((st) => [st.code, st]));

export function getState(code: string): StateDesk | undefined {
  return BY_CODE.get(code.toUpperCase());
}

export function adoptionLabel(model: StateDesk["adoption"]): string {
  if (model === "statewide") return "Statewide code";
  if (model === "statewide-local-admin") return "Statewide code, local administration";
  return "Home-rule / local adoption";
}
