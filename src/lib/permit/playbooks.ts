import type { InspectionHold, Playbook, ProcessStep, ProjectKind } from "./types";

const PREP = (extra: ProcessStep[] = []): ProcessStep[] => [
  {
    id: "who-is-ahj",
    phase: "prepare",
    title: "Confirm the Authority Having Jurisdiction",
    detail:
      "City limits, unincorporated county, and special districts are different desks. Use the address, not the mailing city. If two portals look plausible, call both and ask which one issues the permit for that folio / parcel.",
    owner: "Owner or GC",
  },
  {
    id: "need-permit",
    phase: "prepare",
    title: "Decide whether the work is permitted",
    detail:
      "Most structural, MEP, envelope, and change-of-use work needs a permit. Cosmetic finishes usually do not. When in doubt, ask the building department in writing and keep the answer with the job file.",
    owner: "Owner or designer",
  },
  {
    id: "licensed-parties",
    phase: "prepare",
    title: "Line up the people who can pull the permit",
    detail:
      "Many AHJs only issue to a licensed contractor, a registered design professional, or an owner-builder who signs an affidavit. Check the state license and any local business tax receipt before you apply.",
    owner: "GC / trades",
  },
  ...extra,
];

const APPLY: ProcessStep[] = [
  {
    id: "assemble",
    phase: "apply",
    title: "Assemble the submittal",
    detail:
      "Application, site plan or survey, construction drawings, product approvals, energy forms, and owner / contractor affidavits. Incomplete packages are the most common reason a file sits.",
    owner: "Applicant",
  },
  {
    id: "file",
    phase: "apply",
    title: "File in the official portal",
    detail:
      "Create the account on the AHJ portal, pay the intake fee, and keep the record number. Do not start work. A complete application is not a permit.",
    owner: "Applicant",
  },
];

const REVIEW: ProcessStep[] = [
  {
    id: "plan-review",
    phase: "review",
    title: "Plan review and corrections",
    detail:
      "Building, zoning, fire, flood, and trade reviewers may each comment. Answer every comment in writing, cloud the sheets, and resubmit the full corrected set the AHJ asked for.",
    owner: "Designer + applicant",
  },
  {
    id: "issuance",
    phase: "review",
    title: "Issuance and job-site posting",
    detail:
      "Pay remaining fees, print or download the approved set, and post the permit card where the inspector can see it. The stamped set is the only legal job copy.",
    owner: "Applicant",
  },
];

const CLOSE: ProcessStep[] = [
  {
    id: "finals",
    phase: "closeout",
    title: "Final inspections",
    detail:
      "Trade finals usually precede the building final. Do not conceal failed work. Bring the approved set, prior tickets, and special-inspection reports.",
    owner: "GC",
  },
  {
    id: "close-file",
    phase: "closeout",
    title: "Close the file",
    detail:
      "Ask the department to final the permit. Collect the certificate of occupancy, certificate of completion, or finaled card. Keep as-builts, product approvals, and elevation certificates with the property.",
    owner: "Owner + GC",
  },
];

function holds(list: InspectionHold[]): InspectionHold[] {
  return list;
}

export const PLAYBOOKS: Playbook[] = [
  {
    id: "new-home",
    label: "New one- or two-family home",
    summary: "Full building permit plus trade permits, staged inspections, and a certificate of occupancy.",
    typicallyNeedsPermit: "Almost always. Temporary power, well/septic, and driveway / ROW permits are often separate.",
    relatedPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Roofing", "Driveway / ROW"],
    documents: [
      "Signed application and owner / contractor affidavits",
      "Site plan or survey with setbacks, trees, and utilities",
      "Architectural, structural, and energy drawings",
      "Product approvals for roof, openings, and envelope (especially coastal / HVHZ)",
      "Septic or sewer availability; well or water tap",
    ],
    steps: [
      ...PREP([
        {
          id: "zoning",
          phase: "prepare",
          title: "Clear zoning, flood, and utilities first",
          detail:
            "Setbacks, lot coverage, flood zone, and water/sewer letters stop more new-home files than framing details. Get them before you pay for a full drawing set.",
          owner: "Owner / civil",
        },
      ]),
      ...APPLY,
      ...REVIEW,
      {
        id: "build-sequence",
        phase: "build",
        title: "Build only what the last ticket allows",
        detail:
          "Foundation before slab cover. Framing before MEP concealment. Envelope and insulation before drywall. Do not bury work the inspector has not seen.",
        owner: "GC",
      },
      ...CLOSE,
    ],
    inspections: holds([
      { id: "footing", label: "Footing / foundation", when: "Forms and steel in, before concrete", prep: ["Approved set on site", "Rebar tied, clearances checked", "Safe access"] },
      { id: "slab", label: "Slab / underground", when: "Plumbing under slab tested, vapor barrier in", prep: ["Under-slab plumbing test", "Vapor barrier continuous", "Termite treatment if required"] },
      { id: "framing", label: "Framing / shear", when: "Shell up, before concealment", prep: ["Hold-downs and straps", "Shear nailing per schedule", "Truss layout matches drawings"] },
      { id: "rough", label: "MEP rough-in", when: "All rough complete, walls open", prep: ["Pressure / continuity tests", "Firestopping at penetrations", "Covers off"] },
      { id: "insul", label: "Insulation / envelope", when: "Before drywall", prep: ["R-value as specified", "Air barrier continuous", "Openings sealed"] },
      { id: "final", label: "Finals + CO", when: "Ready to occupy", prep: ["Life safety devices work", "Address posted", "Prior tickets closed"] },
    ]),
    closeout: [
      "Building final and all trade finals passed",
      "Certificate of Occupancy or equivalent issued",
      "Elevation certificate if the lot is in a flood zone",
      "As-builts and energy certificates to the owner",
    ],
    watchouts: [
      "Starting before issuance is the fastest way to a stop-work order.",
      "Temporary power is usually its own ticket.",
      "Impact windows, roof products, and HVHZ approvals are not interchangeable with inland listings.",
    ],
  },
  {
    id: "addition",
    label: "Addition or structural remodel",
    summary: "New conditioned area or structural change. Plan review plus the same inspection spine as new work on the affected area.",
    typicallyNeedsPermit: "Yes whenever you add area, change structure, or open the envelope.",
    relatedPermits: ["Building", "Electrical", "Plumbing", "Mechanical"],
    documents: ["Existing survey", "Proposed plans showing existing vs. new", "Structural calcs if required", "Energy forms for the added envelope"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "tie-in", phase: "build", title: "Protect the existing house",
      detail: "Tie-ins, bearing, and weather protection at the existing roof/wall are the usual failure points. Keep the existing occupied area safe and dry.",
      owner: "GC",
    }, ...CLOSE],
    inspections: holds([
      { id: "footing", label: "Footing / foundation", when: "Before concrete", prep: ["Lines and grades", "Steel in place"] },
      { id: "framing", label: "Framing", when: "Before concealment", prep: ["Tie-in details visible", "Load path continuous"] },
      { id: "rough", label: "MEP rough", when: "Walls open", prep: ["Tests complete", "Penetrations firestopped"] },
      { id: "final", label: "Final", when: "Ready to use the new space", prep: ["Smoke/CO as required", "Egress intact"] },
    ]),
    closeout: ["Finaled building permit", "Updated CO if occupancy or area changed"],
    watchouts: ["Zoning setbacks and lot coverage kill additions that the structure could otherwise support.", "Opening a load-bearing wall is not a cosmetic remodel."],
  },
  {
    id: "interior-remodel",
    label: "Interior remodel",
    summary: "Kitchen, bath, or layout change. Permit trigger is usually plumbing, electrical, mechanical, or moving walls.",
    typicallyNeedsPermit: "Yes if you move walls, add circuits, relocate plumbing, or change occupancy. Paint, cabinets, and flooring usually no.",
    relatedPermits: ["Building", "Electrical", "Plumbing", "Mechanical"],
    documents: ["Scope letter or simple plans", "Existing layout vs. proposed", "Product cut sheets for new fixtures / appliances"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "open-walls", phase: "build", title: "Keep work visible until rough passes",
      detail: "Do not hang drywall or set cabinets over uninspected rough-in. Photograph everything before cover.",
      owner: "GC / trades",
    }, ...CLOSE],
    inspections: holds([
      { id: "rough", label: "Rough MEP / framing", when: "Walls open", prep: ["Approved set", "Tests done", "Safe access"] },
      { id: "final", label: "Final", when: "Fixtures set, devices on", prep: ["GFCI/AFCI where required", "Anti-scald if required"] },
    ]),
    closeout: ["Trade finals and building final if a building permit was issued"],
    watchouts: ["A kitchen that only replaces cabinets may still need a permit if you move the sink or range.", "Condo / HOA approval is not a building permit."],
  },
  {
    id: "roof",
    label: "Roof replacement",
    summary: "Re-roof or recover. Fast permit in many cities; product approval and fastening are the hold points.",
    typicallyNeedsPermit: "Yes in almost every US city. Overlay vs. tear-off rules vary.",
    relatedPermits: ["Roofing", "Building"],
    documents: ["Product approval / NOA / Florida product approval where required", "Fastening schedule", "Existing roof photo set", "Contractor license"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "dry-in", phase: "build", title: "Call the dry-in / in-progress inspection",
      detail: "Many coastal AHJs want to see underlayment and fastening before the finished roof goes on. Do not finish over an uninspected deck.",
      owner: "Roofer",
    }, ...CLOSE],
    inspections: holds([
      { id: "dryin", label: "Dry-in / in-progress", when: "Deck exposed or underlayment in", prep: ["Product papers on site", "Fasteners match the approval"] },
      { id: "final", label: "Roof final", when: "System complete", prep: ["Flashing done", "Debris off site"] },
    ]),
    closeout: ["Finaled roofing permit", "Manufacturer / NOA paperwork to the owner"],
    watchouts: ["In HVHZ and many coastal zones, a roofing product that is 'code listed' elsewhere may still be rejected.", "More than two layers is often prohibited."],
  },
  {
    id: "electrical",
    label: "Electrical service or rewire",
    summary: "Service change, panel, or new circuits. Licensed electrician in most states.",
    typicallyNeedsPermit: "Yes for service equipment, new circuits, and most panel work. Device swaps often no.",
    relatedPermits: ["Electrical", "Building (if structural or occupancy)"],
    documents: ["Load calculation for service changes", "Riser / one-line if required", "Utility disconnect / reconnect letter"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "utility", phase: "build", title: "Coordinate the utility",
      detail: "The city ticket and the utility disconnect are different clocks. Do not leave the house dark overnight without a plan.",
      owner: "Electrician",
    }, ...CLOSE],
    inspections: holds([
      { id: "rough", label: "Rough electrical", when: "Boxes and cable in, covers off", prep: ["Cable supported", "Boxes flush", "Grounding visible"] },
      { id: "service", label: "Service / meter", when: "Gear set, bonding complete", prep: ["Clearances", "Utility ready"] },
      { id: "final", label: "Electrical final", when: "Devices on, labels done", prep: ["Panel directory", "GFCI/AFCI"] },
    ]),
    closeout: ["Electrical final", "Utility reconnect"],
    watchouts: ["Owner-builder electrical is restricted in many states.", "A generator or solar interconnection is usually a second ticket."],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    summary: "Repipe, water heater, sewer, or fixture relocation.",
    typicallyNeedsPermit: "Yes for water heaters, sewer/water service, and relocated fixtures. Faucet swaps usually no.",
    relatedPermits: ["Plumbing"],
    documents: ["Isometric or simple riser if required", "Water heater spec / pan / T&P routing", "Backflow data if required"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "test", phase: "build", title: "Pressure-test before concealment",
      detail: "Have the test on the gauge when the inspector arrives. Underground work is inspected before backfill.",
      owner: "Plumber",
    }, ...CLOSE],
    inspections: holds([
      { id: "ug", label: "Underground", when: "Before backfill", prep: ["Bedding correct", "Test on"] },
      { id: "rough", label: "Rough plumbing", when: "Walls open", prep: ["Test on", "Supports in"] },
      { id: "final", label: "Plumbing final", when: "Fixtures set", prep: ["T&P to approved termination", "Backflow if required"] },
    ]),
    closeout: ["Plumbing final"],
    watchouts: ["Water heaters have pan, T&P, expansion, and combustion-air rules that fail more finals than the tank itself."],
  },
  {
    id: "hvac",
    label: "HVAC / mechanical",
    summary: "Change-out or new system. Energy and condensate paths are the usual comments.",
    typicallyNeedsPermit: "Yes for new equipment and most change-outs. Filter swaps no.",
    relatedPermits: ["Mechanical", "Electrical (if new circuit)", "Building (if structural curb / roof)"],
    documents: ["Manual J / S / D where required", "Equipment specs", "Line-set and condensate routing"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "set", phase: "build", title: "Set equipment to the approved location",
      detail: "Moving a condenser or attic air handler after review is a revision, not a field option.",
      owner: "Mechanical contractor",
    }, ...CLOSE],
    inspections: holds([
      { id: "rough", label: "Rough mechanical", when: "Ducts and lines in", prep: ["Supports", "Combustion air", "Condensate to approved receptor"] },
      { id: "final", label: "Mechanical final", when: "Running and accessible", prep: ["Disconnects", "Platforms / service access"] },
    ]),
    closeout: ["Mechanical final", "Energy forms if the AHJ collected them"],
    watchouts: ["A like-for-like change-out can still fail if the new SEER / line-set / condensate does not match the submittal."],
  },
  {
    id: "solar",
    label: "Rooftop solar",
    summary: "PV plus often a main-breaker or service change. Building, electrical, and sometimes fire.",
    typicallyNeedsPermit: "Yes. Interconnection with the utility is a separate process.",
    relatedPermits: ["Electrical", "Building / roof attachment", "Fire (access pathways)"],
    documents: ["Site plan with fire setbacks", "Structural attachment / racking approval", "One-line diagram", "Module / inverter cut sheets"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "utility-int", phase: "build", title: "File interconnection in parallel",
      detail: "The city can final the install and the utility can still refuse to energize. Start interconnection when the permit is issued.",
      owner: "Solar contractor",
    }, ...CLOSE],
    inspections: holds([
      { id: "attach", label: "Attachment / racking", when: "Before modules if required", prep: ["Flashing visible", "Layout matches plan"] },
      { id: "final", label: "Electrical / building final", when: "Labeled and ready", prep: ["Rapid shutdown labels", "Directory", "Access pathways"] },
    ]),
    closeout: ["AHJ finals", "Utility Permission to Operate"],
    watchouts: ["HOA and historic reviews are not the AHJ. You often need both.", "Roof remaining life should be settled before you penetrate a five-year-old roof."],
  },
  {
    id: "deck-fence",
    label: "Deck, porch, or fence",
    summary: "Decks usually need a building permit. Fences often need zoning review even when no building permit is required.",
    typicallyNeedsPermit: "Decks: usually yes above a height/area threshold. Fences: zoning / height / front-yard rules even if no building ticket.",
    relatedPermits: ["Building", "Zoning / fence permit", "ROW if on the property line"],
    documents: ["Simple plan with height and setbacks", "Footer / ledger details for decks", "Neighbor / easement notes"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "call-before", phase: "build", title: "Call 811 before you dig footings",
      detail: "Footings and fence posts hit utilities. 811 is not the building department.",
      owner: "Installer",
    }, ...CLOSE],
    inspections: holds([
      { id: "footing", label: "Footing", when: "Holes open", prep: ["Depth and diameter", "811 marks visible"] },
      { id: "final", label: "Final", when: "Guards and stairs done", prep: ["Guard height", "Graspable handrail"] },
    ]),
    closeout: ["Finaled permit or zoning approval letter"],
    watchouts: ["A 6-foot fence in the front yard is a common zoning violation even when the side yard is legal.", "Attached decks that lean on the house ledger fail more inspections than freestanding ones."],
  },
  {
    id: "pool",
    label: "Swimming pool or spa",
    summary: "Building plus electrical (bonding), barrier, and often plumbing / gas.",
    typicallyNeedsPermit: "Yes. Barrier and bonding are life-safety, not optional upgrades.",
    relatedPermits: ["Building / pool", "Electrical", "Plumbing", "Gas"],
    documents: ["Pool plan with barrier", "Steel / plumbing layout", "Equipment pad", "Existing survey"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "barrier", phase: "build", title: "Keep the barrier legal the whole time",
      detail: "A temporary fence is often required as soon as the hole is a hazard. Final barrier rules apply before CO / final.",
      owner: "Pool contractor",
    }, ...CLOSE],
    inspections: holds([
      { id: "steel", label: "Steel / underground", when: "Before shotcrete", prep: ["Bonding visible", "Plumbing under pressure"] },
      { id: "deck", label: "Deck / barrier", when: "Before plaster if required", prep: ["Bonding grid", "Gate hardware"] },
      { id: "final", label: "Final / electrical final", when: "Water in, equipment running", prep: ["Alarm / gate", "Equipotential bonding"] },
    ]),
    closeout: ["Pool final and electrical final", "Barrier certification if the AHJ issues one"],
    watchouts: ["A screen enclosure is usually a second structural permit.", "Neighbor drainage complaints start on the day you pump the hole."],
  },
  {
    id: "adu",
    label: "Accessory dwelling unit",
    summary: "New dwelling on the same lot. Zoning first, then a full residential permit path.",
    typicallyNeedsPermit: "Yes. Many cities also require a zoning or ADU-specific review before building.",
    relatedPermits: ["Zoning / ADU", "Building", "Electrical", "Plumbing", "Mechanical"],
    documents: ["Proof of primary dwelling", "Parking / utility capacity", "Full residential drawing set", "Owner-occupancy affidavit if required"],
    steps: [
      ...PREP([{
        id: "adu-zone", phase: "prepare", title: "Win the zoning / ADU screen first",
        detail: "Lot size, owner occupancy, parking, and utility capacity kill more ADUs than the building code. Do not bid a foundation on a maybe.",
        owner: "Owner / planner",
      }]),
      ...APPLY, ...REVIEW, {
        id: "adu-build", phase: "build", title: "Treat it like a small house",
        detail: "Same inspection spine as new residential. Separate address and utility meters if the AHJ requires them.",
        owner: "GC",
      }, ...CLOSE,
    ],
    inspections: holds([
      { id: "footing", label: "Foundation", when: "Before concrete", prep: ["Approved set", "Survey stakes"] },
      { id: "framing", label: "Framing", when: "Before concealment", prep: ["Fire separation if attached"] },
      { id: "rough", label: "MEP rough", when: "Walls open", prep: ["Separate services if required"] },
      { id: "final", label: "Final + CO", when: "Habitable", prep: ["Smoke/CO", "Address", "Easement access"] },
    ]),
    closeout: ["Certificate of Occupancy for the ADU", "Updated property record if the assessor requires it"],
    watchouts: ["A 'guest house' that has a kitchen is an ADU in most codes.", "HOA CC&Rs can prohibit what zoning now allows."],
  },
  {
    id: "demo",
    label: "Demolition",
    summary: "Full or interior demo. Utilities, asbestos, and rodent letters are the usual prerequisites.",
    typicallyNeedsPermit: "Yes for structural demolition. Interior non-structural demo may still need a notice.",
    relatedPermits: ["Demolition", "ROW / dumpster", "Asbestos notification"],
    documents: ["Utility disconnect letters", "Asbestos survey if required", "Site / pedestrian protection plan", "Dumpster / haul route"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "soft-demo", phase: "build", title: "Do not start structural demo on a pending file",
      detail: "Soft demo of finishes is sometimes allowed; taking out bearing or the roof is not. Ask in writing.",
      owner: "Demo contractor",
    }, ...CLOSE],
    inspections: holds([
      { id: "pre", label: "Pre-demo / utilities", when: "Before wrecking", prep: ["Disconnect letters", "Barricades"] },
      { id: "final", label: "Final / lot restore", when: "Site safe", prep: ["Hole filled or protected", "ROW clean"] },
    ]),
    closeout: ["Finaled demo permit", "Waste / asbestos manifests"],
    watchouts: ["A dumpster in the street is a ROW permit, not part of the demo ticket.", "Party-wall and adjacent-property notices are required in many cities."],
  },
  {
    id: "commercial-ti",
    label: "Commercial tenant improvement",
    summary: "Change of tenant or layout in an existing commercial shell. Fire, accessibility, and CO are the closeout.",
    typicallyNeedsPermit: "Yes for almost any commercial alteration. Change of use is a bigger review than a like-for-like TI.",
    relatedPermits: ["Building", "Electrical", "Plumbing", "Mechanical", "Fire", "Sign", "Health (food)"],
    documents: ["Existing CO / use", "Architectural + life-safety plan", "Accessibility path", "Fire sprinkler / alarm shops", "Health plans if food"],
    steps: [
      ...PREP([{
        id: "use", phase: "prepare", title: "Lock the occupancy and use",
        detail: "A salon is not a restaurant. Change of use triggers parking, restrooms, accessibility, and fire in ways a vanilla TI does not.",
        owner: "Owner / architect",
      }]),
      ...APPLY, ...REVIEW, {
        id: "ti-build", phase: "build", title: "Special inspections and fire shops run in parallel",
        detail: "Do not wait until the building final to discover the sprinkler shop was never approved.",
        owner: "GC",
      }, ...CLOSE,
    ],
    inspections: holds([
      { id: "framing", label: "Framing / shaft", when: "Before concealment", prep: ["Rated assemblies visible"] },
      { id: "rough", label: "MEP + fire rough", when: "Ceilings open", prep: ["Shops on site", "Tests"] },
      { id: "above", label: "Above-ceiling", when: "Before tiles", prep: ["Supports", "Firestopping"] },
      { id: "final", label: "Finals + CO / TCO", when: "Ready for staff or public", prep: ["Exit signs", "Fire panel clear", "Accessibility path"] },
    ]),
    closeout: ["Certificate of Occupancy or TCO", "Fire final", "Health final if applicable", "As-builts to the landlord"],
    watchouts: ["A TCO has an expiration and a punch list. It is not a permanent CO.", "Landlord approval is not the AHJ."],
  },
  {
    id: "window-door",
    label: "Windows, doors, or shutters",
    summary: "Opening replacement. Energy and wind/impact product approvals are the usual comments.",
    typicallyNeedsPermit: "Yes in most cities when you change size or go to the exterior. Same-size replacement still often needs a permit in coastal / HVHZ zones.",
    relatedPermits: ["Building", "Window / shutter"],
    documents: ["Product approval / NOA / Florida product approval", "Opening schedule", "Existing photos"],
    steps: [...PREP(), ...APPLY, ...REVIEW, {
      id: "install", phase: "build", title: "Install to the approval, not the brochure",
      detail: "Anchor type, edge distance, and buck details are in the product approval. Substituting screws is a failed inspection.",
      owner: "Installer",
    }, ...CLOSE],
    inspections: holds([
      { id: "open", label: "Opening / frame", when: "Before interior finish if required", prep: ["Anchors visible"] },
      { id: "final", label: "Final", when: "Flashed and operational", prep: ["Labels left on until inspected", "Egress openings work"] },
    ]),
    closeout: ["Finaled permit", "Product labels / approvals to the owner"],
    watchouts: ["Bedroom egress size can shrink illegally if you pick the wrong replacement unit.", "Shutters and impact glass are not automatically interchangeable."],
  },
];

const BY_ID = new Map(PLAYBOOKS.map((p) => [p.id, p]));

export function getPlaybook(id: string): Playbook | undefined {
  return BY_ID.get(id as ProjectKind);
}

export const PROJECT_KINDS = PLAYBOOKS.map((p) => ({ id: p.id, label: p.label }));
