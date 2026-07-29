// ESG course content ("Creating Our Sustainability Pathway") presented inside
// the Skykapital Europe platform design. No backend — seeds CourseContext.

export const platform = {
  brand: "Skykapital Europe",
  center: "Skykapital ESG Learning Center",
  series: "ESG Foundation Series",
};

export const course = {
  title: "Creating Our Sustainability Pathway",
  subtitle: "Embrace the journey",
  learner: "Alexandre",
  totalQuizPoints: 48,
  duration: "60–70 min",
  level: "Foundation",
  accreditation: "Logged as training evidence",
  hero: "/images/course-hero.jpg",
  overview:
    "Five modules take you from what ESG means on a PPP construction project, through the rules that apply, to the the contractor financing case, the management system that runs it, and the KPIs that lenders review. Work through them in order — each one builds on the last.",
  instructor: {
    name: "Dr. Amina Okonkwo",
    role: "Lead, ESG Management System",
    bio: "Dr. Okonkwo has 20+ years across IFC Performance Standards, Equator Principles reporting and community engagement on major infrastructure projects in West Africa.",
  },
};

// Path order (order) is fixed and independent of the internal code (LM#).
// The ESG course — 5 modules in a fixed learning path. Each module
// carries its own on-screen lesson (rich `lesson` sections) + objectives; its
// quiz lives in `quizzes` (keyed by id).
export const modules = [
  {
    id: "m1",
    code: "M1",
    order: 1,
    title: "Understanding ESG in PPP construction",
    type: "quiz",
    duration: "12–15 min",
    status: "not_started",
    score: { earned: 0, total: 20 },
    icon: "foundation",
    summary: "Environmental footprint and social impacts, seen on site.",
    video: { id: "AkbGz3CYvqE", title: "Environmental, Social and Governance (ESG) — framework & standards" },
    tldr: "Construction changes the world around it — the air, the water, and people's lives. This module teaches you to see those changes (impacts), know who feels them (stakeholders), and deal with them in the right order (avoid first, compensate last).",
    glossary: [
      { term: "ESG", plain: "Environment, Social, Governance — how we treat the planet, people, and how honestly we run the business." },
      { term: "Impact", plain: "Any change the project causes — good or bad. Dust in the air, a job created, a stream polluted." },
      { term: "Stakeholder", plain: "Anyone the project touches, or who can touch the project: neighbours, workers, landowners, banks, government." },
      { term: "Vulnerable group", plain: "People least able to cope when things go wrong — the elderly, the poor, female-headed households. They get extra attention." },
      { term: "Mitigation hierarchy", plain: "The fixed order for dealing with harm: Avoid it → make it smaller → repair it → compensate. Never start at the end." },
      { term: "Host community", plain: "The people who live around the site and experience the project every single day." },
    ],
    overview:
      "ESG stands for Environmental, Social and Governance. This module focuses on the two you see most on a PPP construction project — the environmental footprint and the social impacts — explained through everyday realities like dust, effluents, worker camps, subcontractors, land and communities. (Governance is covered by the Code of Conduct and the modules that follow.)",
    lesson: [
      {
        heading: "The three pillars of ESG",
        body: "ESG has three dimensions: Environmental (our effect on air, water, soil, biodiversity and waste), Social (our effect on people — workers, host communities, landowners and vulnerable groups), and Governance (how we run the business — ethics, anti-corruption and accountability). On site, the Environmental and Social pillars are the ones you meet every day, so this module starts there.",
        image: "/images/course-hero.jpg",
        caption: "Environmental, Social and Governance — three pillars, one PPP project.",
      },
      {
        heading: "The environmental footprint on site",
        points: [
          "Air — dust from earthworks, haulage and crushing; exhaust from generators and plant.",
          "Water — effluents, worker-camp wastewater, concrete washout, sediment run-off.",
          "Soil & land — excavation, erosion, and contamination from fuels and oils.",
          "Biodiversity — vegetation clearing and disturbance of habitats.",
          "Waste — construction debris, hazardous waste (oils, chemicals) and camp domestic waste.",
        ],
        image: "/images/lm11.jpg",
        caption: "Dust rising from aggregate handling — the everyday environmental footprint of a site.",
      },
      {
        heading: "The social impacts",
        points: [
          "Workers — health & safety, fair labour conditions, and worker camps.",
          "Communities — noise, dust, traffic, access to roads and water, and in-migration.",
          "Landowners — land acquisition, compensation and loss of livelihood.",
          "Vulnerable groups — those least able to cope, who need special attention.",
          "Subcontractors — much site work is subcontracted, and their conduct is the contractor’s responsibility.",
        ],
        image: "/images/esg-social.jpg",
        caption: "Workers, host communities and landowners all feel the project's social impacts.",
      },
      {
        heading: "Meet the stakeholders",
        body: "A stakeholder is anyone affected by the project — or who can affect it. Each group cares about something different, and good projects know what:",
        points: [
          "Host community — the people living around the site: they feel the dust, traffic and noise, and want jobs, safety and respect.",
          "Workers — direct and subcontracted: safe conditions, fair pay, a way to raise concerns.",
          "Landowners & land users — fair process and compensation when the project needs their land.",
          "Vulnerable groups — the elderly, the poor, female-headed households: least able to cope, first to be hurt, easiest to overlook.",
          "Regulators — NESREA and the permit authorities (Module 2): compliance, on paper and in the field.",
          "Lenders — the banks financing the work (Module 3): ESG performance that protects their money and their name.",
        ],
        image: "/images/esg-governance.jpg",
        caption: "Six audiences, six expectations — and the project answers to all of them.",
      },
      {
        heading: "Three ideas to carry forward",
        points: [
          "Stakeholders — anyone affected by, or who can affect, the project.",
          "Impacts — the changes (good or bad) our activities cause.",
          "The mitigation hierarchy — Avoid → Minimise → Restore → Offset, always tried in that order.",
        ],
        image: "/images/esg-environment.jpg",
        caption: "Stakeholders, impacts, and the mitigation hierarchy — the vocabulary of every module ahead.",
      },
      {
        heading: "The mitigation hierarchy in practice",
        body: "A worked example. The road alignment crosses a stream the village uses for water. Apply the hierarchy in order:",
        points: [
          "AVOID — can the alignment shift 200 m to miss the stream entirely? Always ask this first.",
          "MINIMISE — if not: build in the dry season, install silt fences, ban refuelling near the water.",
          "RESTORE — after the crossing is built: re-vegetate the banks, restore the flow.",
          "OFFSET — for what cannot be undone: improve the village's water supply elsewhere.",
          "The order is the discipline: offsetting first is just paying to cause harm.",
        ],
        image: "/images/lm2.jpg",
        caption: "One stream crossing, four steps — always in this order.",
      },
      {
        heading: "Construction brings benefits too",
        body: "ESG is not only about harm. Projects create jobs, local procurement, skills and lasting infrastructure. Good management means avoiding the negatives while enhancing these positives for the host community — that balance is what “sustainability” means in practice.",
        image: "/images/lm2.jpg",
        caption: "Jobs, skills and lasting infrastructure are real benefits of the project too.",
      },
      {
        heading: "Everyone's job on site",
        points: [
          "Spot — notice hazards and impacts as they arise (a leaking drum, dust drifting to homes).",
          "Report — raise it through the site's channels, however small it seems.",
          "Mitigate — apply the agreed control, from wetting a haul road to bunding a fuel store.",
          "ESG is everyone's responsibility, not only the ESG team's.",
        ],
        image: "/images/lm13.jpg",
        caption: "Hard hats on, eyes open — managing ESG is everyone's job on site.",
      },
    ],
    objectives: [
      "Tell environmental and social impacts apart on a PPP construction project.",
      "Name the main footprint areas: air, water, soil, biodiversity, waste.",
      "Identify key stakeholder groups, including vulnerable groups.",
      "Apply the mitigation hierarchy in the correct order.",
    ],
    activities: [
      {
        type: "order",
        title: "Order the mitigation hierarchy",
        prompt: "Drag the steps into the correct order — the most preferred first.",
        items: ["Avoid", "Minimise", "Restore", "Offset"],
      },
      {
        type: "categorize",
        title: "Environmental or social?",
        prompt: "Drag each impact into the column it belongs to.",
        categories: [
          { id: "env", label: "Environmental" },
          { id: "soc", label: "Social" },
        ],
        items: [
          { id: "dust", text: "Dust from earthworks", cat: "env" },
          { id: "washout", text: "Concrete washout / effluent", cat: "env" },
          { id: "clearing", text: "Vegetation clearing", cat: "env" },
          { id: "land", text: "Land acquisition & compensation", cat: "soc" },
          { id: "camp", text: "Worker-camp conditions", cat: "soc" },
          { id: "traffic", text: "Noise & traffic for neighbours", cat: "soc" },
        ],
      },
      {
        type: "hotspot",
        title: "Spot the ESG issues on site",
        prompt: "Click each marker to identify the environmental (E) or social (S) issue.",
        image: "/images/lm4.jpg",
        hotspots: [
          { x: 26, y: 34, kind: "E", label: "Dust from earthworks", detail: "Uncontrolled dust harms air quality and nearby homes — suppress it with water." },
          { x: 58, y: 28, kind: "E", label: "Exposed spoil & run-off", detail: "Loose soil erodes into waterways — use silt fences and cover stockpiles." },
          { x: 47, y: 68, kind: "S", label: "Workers near plant", detail: "Workers close to moving plant need PPE, exclusion zones and safe systems of work." },
          { x: 82, y: 58, kind: "S", label: "Community edge", detail: "Traffic and noise reach neighbours — manage access and engage the community." },
          { x: 14, y: 62, kind: "E", label: "Fuel / oil storage", detail: "Fuel must be bunded with spill kits nearby to prevent soil and water contamination." },
        ],
      },
      {
        type: "fillblank",
        title: "Complete the mitigation hierarchy",
        prompt: "Fill each blank so the order is correct.",
        segments: [
          "The mitigation hierarchy is ",
          { options: ["Avoid", "Offset"], correct: 0 },
          " → ",
          { options: ["Minimise", "Restore"], correct: 0 },
          " → ",
          { options: ["Restore", "Avoid"], correct: 0 },
          " → ",
          { options: ["Offset", "Minimise"], correct: 0 },
          ".",
        ],
        tip: "Avoid → Minimise → Restore → Offset.",
      },
      {
        type: "swipe",
        title: "Myth or fact? — ESG basics",
        prompt: "Six quick statements. Call each one: myth or fact?",
        cards: [
          { text: "ESG is just paperwork for the head office.", truth: false, tip: "Myth — ESG lives on site: dust control, safe scaffolds, respectful community relations. Every worker owns a piece of it." },
          { text: "Dust from haulage is an environmental impact.", truth: true, tip: "Fact — it degrades air quality; that's the E in ESG." },
          { text: "A subcontractor's conduct is not the main contractor's problem.", truth: false, tip: "Myth — subcontractor conduct is the contractor's responsibility, full stop." },
          { text: "Good ESG performance helps win future work.", truth: true, tip: "Fact — reputation and a clean record win bids." },
          { text: "Offsetting is the first step when facing an impact.", truth: false, tip: "Myth — offsetting is the LAST resort. Avoid comes first." },
          { text: "Vulnerable groups deserve special attention.", truth: true, tip: "Fact — impacts hit hardest those least able to cope." },
        ],
      },
      {
        type: "memory",
        title: "Memory: the vocabulary of ESG",
        prompt: "Flip two cards at a time — match each term to its meaning.",
        pairs: [
          { a: "ESG", b: "Planet, people, honest business" },
          { a: "Impact", b: "A change the project causes" },
          { a: "Stakeholder", b: "Anyone the project touches" },
          { a: "Avoid", b: "First step of the hierarchy" },
          { a: "Offset", b: "Last-resort compensation" },
          { a: "Host community", b: "Lives right next to the site" },
        ],
      },
    ],
  },
  {
    id: "m2",
    code: "M2",
    order: 2,
    title: "The regulatory framework",
    type: "quiz",
    duration: "12–14 min",
    status: "not_started",
    score: { earned: 0, total: 20 },
    icon: "gavel",
    summary: "Nigerian law, international standards, and the stricter rule.",
    video: { id: "xd9KRup3zaY", title: "IFC Performance Standards on Environmental & Social Sustainability" },
    tldr: "Two rulebooks apply to the project at the same time: the country's laws (the floor) and the international standards the banks demand (the higher bar). When they disagree, you follow whichever protects people and nature more. That's the whole module in one sentence.",
    glossary: [
      { term: "EIA / ESIA", plain: "The big study done BEFORE building: what will this project change, and how will we manage it? No approval, no works." },
      { term: "NESREA", plain: "Nigeria's environmental watchdog — it sets the rules and enforces them." },
      { term: "Permit", plain: "Official permission with conditions attached — for discharging water, handling waste, taking water. Break the condition, break the law." },
      { term: "IFC Performance Standards", plain: "Eight international rules (PS1–PS8) that lender-financed projects must follow — the global benchmark." },
      { term: "Equator Principles", plain: "The rulebook banks use to apply the IFC standards when deciding and monitoring project loans." },
      { term: "Category A / B / C", plain: "The risk label lenders give a project: A = high risk (full scrutiny), B = medium, C = minimal." },
    ],
    overview:
      "ESG performance is governed by both Nigerian law and international standards. This module covers the Nigerian baseline, the international standards lenders rely on, and the golden rule when the two differ.",
    lesson: [
      {
        heading: "The Nigerian baseline",
        points: [
          "EIA Act — requires an Environmental Impact Assessment and approval before major projects proceed.",
          "NESREA — the National Environmental Standards and Regulations Enforcement Agency sets and enforces environmental standards.",
          "Permits & approvals — projects must operate within their environmental, discharge and waste permit conditions.",
        ],
        image: "/images/lm5.jpg",
        caption: "Nigerian law sets the legal floor: the EIA Act, NESREA and permit conditions.",
      },
      {
        heading: "The ESIA journey — from idea to approval",
        body: "The EIA Act's centrepiece is the Environmental (& Social) Impact Assessment. It follows a fixed journey before major works may start:",
        points: [
          "Screening — does this project need a full assessment? (Major infrastructure: yes.)",
          "Scoping — which impacts matter here? Sets the study's boundaries.",
          "Baseline studies — measure the environment and communities BEFORE work starts (air, water, biodiversity, livelihoods).",
          "Impact assessment — predict the changes the project will cause, good and bad.",
          "The ESMP — the management plan: how each impact will be avoided, minimised, restored or offset.",
          "Disclosure & consultation — affected communities see the findings and comment.",
          "Approval — the regulator signs off; its conditions become binding.",
        ],
        image: "/images/lm12.jpg",
        caption: "A new road through farmland — exactly what the ESIA measures before works begin.",
      },
      {
        heading: "International standards",
        points: [
          "IFC Performance Standards — eight standards that are the global benchmark for managing ESG risk on financed projects.",
          "Equator Principles — how banks apply the IFC PS to decide and monitor project finance, categorising projects A / B / C by risk.",
        ],
        image: "/images/lm2.jpg",
        caption: "The IFC PS and Equator Principles are the global benchmark lenders rely on.",
      },
      {
        heading: "The eight Performance Standards at a glance",
        points: [
          "PS1 — Assessment & management of E&S risks: the overarching system (your ESMS serves this).",
          "PS2 — Labour & working conditions: fair treatment, hours, no child or forced labour.",
          "PS3 — Resource efficiency & pollution prevention: emissions, effluents, waste.",
          "PS4 — Community health, safety & security: protecting the people around the project.",
          "PS5 — Land acquisition & involuntary resettlement: fair process and compensation.",
          "PS6 — Biodiversity conservation: habitats, species, no net loss.",
          "PS7 — Indigenous Peoples: respect and Free, Prior and Informed Consent (FPIC).",
          "PS8 — Cultural heritage: protect it, including chance finds during excavation.",
        ],
        image: "/images/lm3.jpg",
        caption: "Eight standards, one system: PS1 manages, PS2–PS8 protect. Full examples in the Library.",
      },
      {
        heading: "Equator categories — A, B, C",
        body: "Under the Equator Principles, lenders classify every project by its ESG risk before financing. The category decides how much scrutiny follows:",
        points: [
          "Category A — significant, diverse or irreversible potential impacts. Full ESIA, an IESC, the works.",
          "Category B — limited, site-specific, manageable impacts. Proportionate assessment and monitoring.",
          "Category C — minimal or no adverse impacts. Light-touch review.",
          "A large PPP road or bridge is typically Category A or B — expect the full audit machinery of Module 3.",
        ],
        image: "/images/course-hero.jpg",
        caption: "A, B or C — the risk category set at appraisal drives everything that follows.",
      },
      {
        heading: "The stricter-standard rule",
        body: "Where Nigerian law and an international standard differ, the project applies whichever requirement gives greater protection — usually the international standard. Lenders require this, so “we already meet local law” is not enough on its own.",
        image: "/images/lm3.jpg",
        caption: "When the two differ, apply whichever requirement protects people and environment more.",
      },
      {
        heading: "Permits in practice",
        points: [
          "An approved EIA before major works begin.",
          "Discharge / effluent permits for wastewater.",
          "Waste handling and disposal approvals.",
          "Approvals for borrow pits, quarries and water abstraction.",
          "Operating outside a permit condition is a breach — and a finding for the IESC.",
        ],
        image: "/images/esg-pollution.jpg",
        caption: "Permits govern discharge, waste, water abstraction, borrow pits and quarries.",
      },
      {
        heading: "Why two layers of rules",
        body: "Nigerian law is the legal minimum everyone must meet; the lenders add the international standards on top as a condition of financing. Picture local law as the floor and the IFC / Equator standards as the higher bar the contractor has committed to clear.",
        image: "/images/course-hero.jpg",
        caption: "Local law is the floor; the international standards are the higher bar the contractor clears.",
      },
    ],
    objectives: [
      "Identify the key Nigerian ESG laws and bodies (EIA Act, NESREA, permits).",
      "Explain the role of the IFC Performance Standards and Equator Principles.",
      "Apply the stricter-standard rule when requirements differ.",
    ],
    activities: [
      {
        type: "categorize",
        title: "Nigerian law or international standard?",
        prompt: "Drag each item into where it comes from.",
        categories: [
          { id: "ng", label: "Nigerian law" },
          { id: "int", label: "International standard" },
        ],
        items: [
          { id: "eia", text: "EIA Act", cat: "ng" },
          { id: "nesrea", text: "NESREA", cat: "ng" },
          { id: "permit", text: "Discharge permit", cat: "ng" },
          { id: "ifcps", text: "IFC Performance Standards", cat: "int" },
          { id: "equator", text: "Equator Principles", cat: "int" },
        ],
      },
      {
        type: "scenario",
        title: "Which rule do you follow?",
        intro:
          "On dust control, the IFC standard is stricter than the local permit limit.",
        steps: [
          {
            prompt: "Local law allows more dust than the IFC standard — which do you apply?",
            options: [
              { text: "The stricter IFC standard", outcome: "good", feedback: "Correct — where they differ, apply whichever gives greater protection." },
              { text: "The looser local limit", outcome: "bad", feedback: "No — lenders require the stricter of the two, so following the looser limit breaches the loan." },
            ],
          },
        ],
      },
      {
        type: "checklist",
        title: "Permits before works begin",
        prompt: "Tick only what is genuinely required before starting major works — watch for traps.",
        items: [
          { text: "Approved EIA", required: true, note: "The EIA Act requires an approved EIA before major works." },
          { text: "Discharge / effluent permit", required: true, note: "Needed wherever wastewater is released." },
          { text: "Waste handling approval", required: true, note: "Hazardous and general waste must go to licensed disposal." },
          { text: "A social-media marketing plan", required: false, note: "Useful maybe, but not a legal permit." },
          { text: "The MD's personal tax return", required: false, note: "Irrelevant to starting works." },
          { text: "Water abstraction licence (if drawing water)", required: true, note: "Required where the project abstracts water." },
        ],
      },
      {
        type: "match",
        title: "Match the authority to its role",
        prompt: "Choose what each body or law does.",
        items: [
          { prompt: "NESREA", options: ["Sets and enforces environmental standards", "Approves bank loans", "Builds the roads"], correct: 0, tip: "NESREA is the environmental enforcement agency." },
          { prompt: "The EIA Act", options: ["Requires an approved EIA before major works", "Sets interest rates", "Issues passports"], correct: 0, tip: "An approved EIA is a precondition for major projects." },
          { prompt: "The Equator Principles", options: ["Guide the banks financing the project", "Are a Nigerian tax", "Regulate wages"], correct: 0, tip: "A lender framework built on the IFC PS." },
        ],
      },
      {
        type: "swipe",
        title: "Myth or fact? — the rules",
        prompt: "Six statements about the regulatory framework. Myth or fact?",
        cards: [
          { text: "Meeting local law is always enough for a financed project.", truth: false, tip: "Myth — lenders require the international standards on top; apply the stricter rule." },
          { text: "There are eight IFC Performance Standards.", truth: true, tip: "Fact — PS1 to PS8, from management systems to cultural heritage." },
          { text: "Category A means minimal ESG risk.", truth: false, tip: "Myth — A is the HIGHEST risk category; C is minimal." },
          { text: "Major works need an approved EIA first.", truth: true, tip: "Fact — the EIA Act makes approval a precondition." },
          { text: "FPIC concerns Indigenous Peoples.", truth: true, tip: "Fact — Free, Prior and Informed Consent, central to PS7." },
          { text: "When two rules conflict, pick the cheaper one.", truth: false, tip: "Myth — always the more protective requirement." },
        ],
      },
      {
        type: "memory",
        title: "Memory: the rulebook",
        prompt: "Match each rule or body to what it is.",
        pairs: [
          { a: "EIA", b: "The study before major works" },
          { a: "NESREA", b: "Nigeria's environmental watchdog" },
          { a: "IFC PS", b: "The eight lender standards" },
          { a: "Equator Principles", b: "How banks apply the PS" },
          { a: "Category A", b: "Highest project risk" },
          { a: "Stricter rule", b: "Follow the more protective" },
        ],
      },
    ],
  },
  {
    id: "m3",
    code: "M3",
    order: 3,
    title: "ESG and the financing",
    type: "quiz",
    duration: "13–15 min",
    status: "not_started",
    score: { earned: 0, total: 20 },
    icon: "account_balance",
    summary: "ESDD, the IESC, audits — how lenders check, and why it keeps the money flowing.",
    tldr: "The banks lending the money treat ESG failures as a risk to their money. So they investigate before lending (ESDD), write ESG promises into the loan, and send an independent checker (IESC) to audit the site for as long as the loan lasts. Do well and money flows; hide problems and it stops.",
    glossary: [
      { term: "ESDD", plain: "Environmental & Social Due Diligence — the lenders' investigation of the project's risks BEFORE they commit money." },
      { term: "IESC", plain: "Independent Environmental & Social Consultant — the lenders' eyes on site. Works for the banks, not for the contractor." },
      { term: "ESAP", plain: "The fix-it list: every gap found, turned into an action with an owner, a deadline, and proof when done." },
      { term: "Covenant", plain: "A promise written into the loan. Breaking it (a 'breach') can freeze the money." },
      { term: "Conditions precedent", plain: "Things that must be DONE before the bank releases the first payment." },
      { term: "Disbursement", plain: "A release of loan money. Each one depends on the project keeping its ESG promises." },
      { term: "Self-monitoring report", plain: "The project's own regular report card to the lenders — verified by the IESC." },
    ],
    overview:
      "Large infrastructure projects are rarely paid for in cash — they are financed by lenders who apply the IFC Performance Standards and Equator Principles. And lenders don't just trust: they audit. Before financing, they run an ESDD (Environmental & Social Due Diligence); during the project, an IESC (Independent Environmental & Social Consultant) visits the site and verifies everything. This module follows the money — who lends it, what they ask for, who audits it, and what happens when ESG slips.",
    lesson: [
      {
        heading: "The money story — how a PPP is paid for",
        body: "In a Public-Private Partnership, a public asset (a road, a bridge, a water network) is built with private financing. Banks and development lenders put up most of the money and are repaid over many years. Because their money is at risk for so long, lenders care deeply about anything that could stop the project — including environmental and social failures.",
        image: "/images/course-hero.jpg",
        caption: "A PPP: public infrastructure, private financing — repaid over decades.",
      },
      {
        heading: "Why lenders care about ESG",
        body: "Banks that follow the Equator Principles require their borrowers to meet the IFC Performance Standards. For a lender, ESG risk IS financial risk: a community blockade stops construction, a pollution fine drains cash, a safety disaster halts the project and makes headlines. So lenders build ESG straight into the loan agreement.",
        image: "/images/lm2.jpg",
        caption: "For a lender, an ESG failure is a financial failure — so ESG goes into the loan.",
      },
      {
        heading: "ESDD — the lenders' due diligence",
        body: "Before a bank commits a single dollar, it runs an ESDD — an Environmental & Social Due Diligence. Specialist consultants review the project's ESIA, permits, land acquisition, management plans and track record, and assess the gaps against the IFC Performance Standards and Equator Principles.",
        points: [
          "ESDD = the lenders' investigation of the project's E&S risks BEFORE financing.",
          "It asks: what are the risks, are they well managed, and what is missing?",
          "The gaps found become the ESAP — the fix-it list with deadlines.",
          "The ESDD also drives the project's Equator category (A / B / C) and the strictness of the conditions.",
        ],
        image: "/images/lm1.jpg",
        caption: "The ESDD: lenders investigate the project's E&S risks before the money moves.",
      },
      {
        heading: "The IESC — the lenders' eyes on site",
        body: "Once the loan is signed, the lenders don't just trust — they verify. An IESC (Independent Environmental & Social Consultant) is a specialist firm engaged to monitor the project on the lenders' behalf, for the life of the loan. It is not part of the contractor and not paid to please it — independence is the whole point.",
        points: [
          "The IESC answers to the lenders, not the contractor.",
          "It reviews records and self-monitoring reports, visits the site, and interviews workers and communities.",
          "It verifies ESAP progress and flags non-compliances directly to the banks.",
          "Transparency with the IESC builds the trust that keeps funds flowing.",
        ],
        image: "/images/lm5.jpg",
        caption: "The IESC checks the project on the lenders' behalf — independence is the point.",
      },
      {
        heading: "Audits — who checks what, when",
        body: "A financed project is audited continuously, by several layers of checkers. Expect it, prepare for it, and treat every audit as a chance to prove the system works:",
        points: [
          "BEFORE financing — the ESDD: the lenders' consultants audit the project's ESIA, permits, plans and record.",
          "DURING the project — IESC site visits: typically every 6–12 months (more often for Category A), walking the site, checking records, talking to workers and communities.",
          "EVERY period — lender reviews: the self-monitoring report and ESAP progress are checked against the loan's ESG conditions.",
          "CONTINUOUSLY — internal audits: the contractor's own ESMS audits and inspections (Module 4) catch issues before external auditors do.",
          "Audit findings become corrective actions with deadlines — usually added to the ESAP and tracked to closure.",
        ],
        image: "/images/lm9.jpg",
        caption: "ESDD before, IESC visits during, lender reviews every period, internal audits always.",
      },
      {
        heading: "ESG loan conditions & the ESAP",
        points: [
          "The loan agreement contains ESG conditions (covenants) the contractor must meet.",
          "An ESAP — Environmental & Social Action Plan — lists the corrective actions to complete, each with an owner and a deadline.",
          "Self-monitoring reports go to the lenders; the IESC verifies them; they feed the KPIs (Module 5).",
        ],
        image: "/images/esg-reporting.jpg",
        caption: "Covenants, the ESAP and self-monitoring reports — ESG on paper, with deadlines.",
      },
      {
        heading: "The ESG covenant cycle",
        points: [
          "Appraisal — lenders assess the project's ESG risk before committing.",
          "Conditions precedent — certain ESG actions must be done before the first disbursement.",
          "Disbursement — funds are released as milestones and conditions are met.",
          "Ongoing monitoring — self-monitoring reports and IESC visits run throughout the loan.",
        ],
        image: "/images/lm3.jpg",
        caption: "Appraise → conditions precedent → disburse → monitor: the cycle runs for the life of the loan.",
      },
      {
        heading: "The stakes — what happens when ESG slips",
        body: "Meeting the ESG conditions keeps loan disbursements flowing. Falling short can trigger covenant breaches, withheld disbursements, or even default. An unreported incident discovered by the IESC is worse than the incident itself — it breaks the trust the whole arrangement is built on.",
        image: "/images/esg-pollution.jpg",
        caption: "A covenant breach can freeze the money — honesty costs less than concealment.",
      },
      {
        heading: "Reputation — winning the next project",
        body: "Beyond the loan itself, a public ESG incident — a polluted stream, a community protest — damages the contractor's ability to win future work and stains the lenders' own ESG standing. A clean ESG record is a commercial asset: it wins bids, lowers financing costs and opens doors with international clients.",
        image: "/images/esg-social.jpg",
        caption: "Communities remember. A clean ESG record wins the next bid.",
      },
    ],
    objectives: [
      "Explain why lenders impose ESG requirements on the contractor.",
      "Define the ESDD and how it shapes the loan's conditions.",
      "Describe the role of the IESC and the ESAP.",
      "Explain the audit layers: ESDD, IESC visits, lender reviews, internal audits.",
      "Link self-monitoring reports to continued financing.",
      "Recognise the consequences of poor ESG performance.",
    ],
    activities: [
      {
        type: "scenario",
        title: "On-site decision: an ESG breach",
        intro:
          "A subcontractor has been discharging untreated wastewater near a community stream. You are the contractor’s site ESG officer.",
        steps: [
          {
            prompt: "What do you do first?",
            options: [
              { text: "Stop the discharge immediately and contain it", outcome: "good", feedback: "Correct — halt and contain the harm first. That's the mitigation hierarchy in action." },
              { text: "Wait for the next monthly report to mention it", outcome: "bad", feedback: "Delay lets the impact grow and risks a covenant breach when the IESC finds it." },
              { text: "Ignore it — it's the subcontractor's problem", outcome: "bad", feedback: "Subcontractor conduct is the contractor’s responsibility; this exposes the contractor directly." },
            ],
          },
          {
            prompt: "The community has complained. What next?",
            options: [
              { text: "Log it in the grievance mechanism and respond", outcome: "good", feedback: "Right — the grievance mechanism records and resolves concerns transparently." },
              { text: "Offer cash quietly to keep it off the record", outcome: "bad", feedback: "Off-record payments breach the Code of Conduct and destroy lender trust." },
            ],
          },
          {
            prompt: "How should this reach the lenders?",
            options: [
              { text: "Record the incident and corrective action in the self-monitoring report / ESAP", outcome: "good", feedback: "Exactly — transparent reporting plus a closed corrective action keeps financing flowing." },
              { text: "Leave it out so the report looks clean", outcome: "bad", feedback: "If the IESC later finds it, credibility collapses and disbursements can be withheld." },
            ],
          },
        ],
      },
      {
        type: "scenario",
        title: "Role-play: you are the lender",
        intro:
          "You are the bank's reviewer. The contractor requests its next disbursement. The IESC report shows: dust controls in place, two community grievances open past their deadline, and one unreported spill found during a site visit.",
        steps: [
          {
            prompt: "What is your decision as the lender?",
            options: [
              { text: "Withhold the disbursement until the grievances and spill are resolved and reported", outcome: "good", feedback: "Correct — overdue grievances and an unreported spill are covenant issues; release only once the ESAP actions close." },
              { text: "Release the full amount — the dust controls look fine", outcome: "bad", feedback: "Risky — ignoring the unreported spill and overdue grievances is exactly what erodes lender confidence." },
              { text: "Release everything and don't mention the spill", outcome: "bad", feedback: "No — tolerating a hidden incident exposes the lender too." },
            ],
          },
        ],
      },
      {
        type: "match",
        title: "Match the financing term to its meaning",
        prompt: "Choose the correct definition for each.",
        items: [
          { prompt: "ESDD", options: ["The lenders' E&S due diligence before financing", "A site safety drill", "A type of permit"], correct: 0, tip: "Environmental & Social Due Diligence — the lenders' pre-financing investigation of the project's E&S risks." },
          { prompt: "IESC", options: ["Independent consultant who monitors for the lenders", "A contractor manager", "A government inspector"], correct: 0, tip: "Independent Environmental & Social Consultant." },
          { prompt: "ESAP", options: ["A plan of corrective ESG actions with deadlines", "A payment schedule", "A safety poster"], correct: 0, tip: "Environmental & Social Action Plan." },
          { prompt: "Self-monitoring report", options: ["The contractor’s own ESG performance report to lenders", "A lender advert", "A tax return"], correct: 0, tip: "Verified by the IESC." },
        ],
      },
      {
        type: "swipe",
        title: "Myth or fact? — the financing",
        prompt: "Six statements about lenders and audits. Myth or fact?",
        cards: [
          { text: "The IESC works for the contractor.", truth: false, tip: "Myth — the IESC is independent and answers to the LENDERS." },
          { text: "The ESDD happens before the money is committed.", truth: true, tip: "Fact — due diligence first; its findings shape the ESAP and the loan conditions." },
          { text: "Hiding a small incident is safer than reporting it.", truth: false, tip: "Myth — an incident the IESC finds later costs far more than one reported honestly." },
          { text: "A covenant breach can freeze disbursements.", truth: true, tip: "Fact — and persistent breaches can escalate to default." },
          { text: "Conditions precedent are completed after the loan ends.", truth: false, tip: "Myth — they must be done BEFORE money moves." },
          { text: "Transparent reporting builds lender trust.", truth: true, tip: "Fact — honesty plus a corrective plan is exactly what keeps funds flowing." },
        ],
      },
      {
        type: "memory",
        title: "Memory: the financing vocabulary",
        prompt: "Match each financing term to its meaning.",
        pairs: [
          { a: "ESDD", b: "Due diligence before lending" },
          { a: "IESC", b: "The lenders' site monitor" },
          { a: "ESAP", b: "Fix-it list with deadlines" },
          { a: "Covenant", b: "A promise in the loan" },
          { a: "Condition precedent", b: "Done before first payment" },
          { a: "Disbursement", b: "A release of loan money" },
        ],
      },
    ],
  },
  {
    id: "m4",
    code: "M4",
    order: 4,
    title: "The ESMS",
    type: "quiz",
    duration: "12–14 min",
    status: "not_started",
    score: { earned: 0, total: 20 },
    icon: "schema",
    summary: "The ESMS: strategic objectives, the policy suite, and the rules everyone works by.",
    video: { id: "Kwh8wGWLMrs", title: "Working at height — site safety essentials" },
    tldr: "The ESMS is the machine that turns good intentions into daily behaviour: policies say what we stand for, plans say how, training makes sure everyone knows, grievance channels catch problems, and audits check it's real. It runs on a simple loop — Plan, Do, Check, Act — forever.",
    glossary: [
      { term: "ESMS", plain: "Environmental & Social Management System — all the policies, plans, roles and routines that manage ESG day to day." },
      { term: "PDCA", plain: "Plan–Do–Check–Act: plan it, do it, check it worked, fix what didn't. Then repeat, forever." },
      { term: "RACI", plain: "A chart that ends 'I thought someone else had it': who's Responsible, who's Accountable, who's Consulted, who's Informed." },
      { term: "Grievance mechanism", plain: "The safe, formal way for ANYONE — worker or neighbour — to complain and get an answer. No retaliation, ever." },
      { term: "Toolbox talk", plain: "A short safety chat with the crew before work starts — small, daily, and one of the most powerful tools on site." },
      { term: "GBVSH", plain: "Gender-Based Violence & Sexual Harassment — zero tolerance, confidential reporting, survivor support." },
      { term: "Flow-down", plain: "Making subcontractors follow the same rules — through contracts, training and audits. Their conduct is our responsibility." },
    ],
    overview:
      "The Environmental & Social Management System (ESMS) is how a company turns ESG requirements into everyday practice. It starts with strategic E&S objectives, is written down as a suite of policies — from environment and safety to labour, inclusion and anti-corruption — and is lived on site through roles, plans, training, a grievance mechanism, and control of subcontractors. This module is based on a real ESMS policy suite used on lender-financed construction projects.",
    lesson: [
      {
        heading: "What the ESMS is",
        body: "The ESMS is the system — policy, plans, procedures and roles — that a company uses to manage ESG on the ground. It is anchored in international frameworks: the IFC Performance Standards, Equator Principles IV, ISO 14001 and ISO 45001, the ILO conventions, the UN Guiding Principles on Business and Human Rights, and the Voluntary Principles on Security and Human Rights. It runs on a continual-improvement loop: Plan → Do → Check → Act.",
        image: "/images/lm3.jpg",
        caption: "The ESMS turns standards on paper into practice on site.",
      },
      {
        heading: "Strategic E&S objectives",
        body: "The ESMS starts with a set of strategic objectives, set by top management, that everything else serves:",
        points: [
          "Compliance with legal and regulatory requirements — national and international.",
          "Sustainable resource management — efficient use of energy, water and materials.",
          "Pollution prevention and effective waste management.",
          "Biodiversity conservation — protect and restore natural habitats.",
          "Community engagement and local development.",
          "Health and safety — for workers, contractors and communities.",
          "Economic and social benefits — local jobs, local procurement, livelihoods.",
          "Continuous improvement, capacity building, and climate mitigation & adaptation.",
        ],
        image: "/images/esg-environment.jpg",
        caption: "Ten strategic objectives, signed by the Managing Director, drive the whole system.",
      },
      {
        heading: "The policy suite — one system, many policies",
        body: "A real ESMS is written down as a family of policies that cover every ESG risk. Each is short, signed by top management, and applies to employees AND subcontractors:",
        points: [
          "Environmental & Social Policy — stewardship, waste via certified disposers, biodiversity (No Net Loss).",
          "CASHES Policy — Community Affairs, Safety, Health, Environment & Security in one commitment.",
          "Occupational Health & Safety — zero harm, and every worker's RIGHT TO STOP unsafe work.",
          "Human Resources — fair hiring, working hours, leave, freedom of association.",
          "Equality, Diversity & Inclusion + GBVSH — respect, women's empowerment, zero tolerance for harassment.",
          "Alcohol & Drugs, Smoke-Free, HIV/AIDS — health and fitness for work.",
          "Subcontractor & Third-Party, Anti-Bribery, Anti-Money-Laundering, Code of Conduct — integrity across the chain.",
        ],
        image: "/images/esg-governance.jpg",
        caption: "One system, ~14 policies — every ESG risk has a written commitment behind it.",
      },
      {
        heading: "Rules you should know by heart",
        body: "A few concrete rules from the policy suite that everyone on a site is expected to know:",
        points: [
          "Safety first — any worker may STOP WORK under dangerous conditions; management must respond.",
          "Working hours — no more than 48 regular + 12 overtime hours a week, and at least one rest day every seven.",
          "Zero alcohol — a Blood Alcohol Concentration of 0.00 is required on site; random screening applies to everyone.",
          "Zero tolerance for GBV and sexual harassment — mandatory training, confidential reporting, survivor support.",
          "No child or forced labour — anywhere in the operation or its supply chain.",
          "No bribes, no facilitation payments, no cash transactions — gifts must be modest, approved and declared.",
          "PPE is provided and must be worn; toolbox talks and inductions are mandatory.",
        ],
        image: "/images/esg-social.jpg",
        caption: "Right to stop work, 48+12 hour cap, BAC 0.00, zero tolerance for GBVSH — non-negotiables.",
      },
      {
        heading: "Worked example — working at height & mandatory PPE",
        body: "Falls from height are the #1 killer on construction sites worldwide — which is why the OHS policy treats height work as a special regime. Picture the crew fixing roof tiles in the photo: before the first tile moves, ALL of this must be true:",
        points: [
          "Mandatory PPE for everyone on site, every day: hard hat, hi-vis vest, safety boots — plus gloves and eye protection for the task.",
          "At height (any work where a fall can injure — typically 1.8 m and above), PPE alone is NOT enough: a safety harness clipped to a solid anchor point, or guardrails/edge protection, is mandatory.",
          "The scaffold or platform must be complete and INSPECTED — a tagged scaffold, not a plank on two drums.",
          "A permit to work at height and a toolbox talk on the task before starting.",
          "No harness, no anchor, no inspection = no work — and any worker who spots it may STOP the job. That is the right to stop work in action.",
          "The supervisor is Responsible for checking all of this daily; the site manager is Accountable (RACI in action).",
        ],
        image: "/images/lm13.jpg",
        caption: "Hard hats and hi-vis on the roof — but height work also demands harness/edge protection, an inspected platform and a permit.",
      },
      {
        heading: "Roles & responsibilities (RACI)",
        body: "A RACI chart makes ownership clear for every ESG activity: who is Responsible (does the work), Accountable (owns the outcome), Consulted, and Informed. Top management is ultimately accountable; ESG/HSE managers run the system; supervisors enforce it daily; every worker owns their part.",
        image: "/images/lm4.jpg",
        caption: "Everyone has a defined ESG role — accountability sits at the top.",
      },
      {
        heading: "The grievance mechanism",
        body: "A safe channel for workers AND communities to raise concerns — grievance boxes, email, or anonymously — and have them investigated and resolved. Retaliation against anyone who reports in good faith is strictly prohibited. Subcontractors must run their own mechanism and cooperate with the project-level one.",
        image: "/images/esg-social.jpg",
        caption: "Anyone can raise a concern, safely and without retaliation — that is the test of trust.",
      },
      {
        heading: "Subcontractors & third parties",
        points: [
          "Every subcontractor signs a formal agreement flowing down E&S, HSE and labour obligations.",
          "Suppliers sign a Supplier Code of Conduct — ethical sourcing, fair labour, road safety.",
          "Local hiring target: at least 50% local employment, with commitments to female participation.",
          "All workers formally employed, registered for social security, fairly paid, and given PPE.",
          "Non-conformances must be closed by deadline — repeated failure means penalties or termination.",
        ],
        image: "/images/lm2.jpg",
        caption: "The same standards flow down the chain — through contracts, training and audits.",
      },
      {
        heading: "Documents vs behaviour",
        body: "An ESMS only works if it is lived, not filed. A shelf full of policies means nothing if the haul road isn't watered or the grievance box is never emptied. The real test is what happens on site every day — that is why training, toolbox talks and audits matter as much as the documents.",
        image: "/images/lm8.jpg",
        caption: "The ESMS is tested on the ground, not on the shelf.",
      },
      {
        heading: "How it keeps improving",
        points: [
          "Internal audits and site inspections check what is really happening.",
          "Non-conformances trigger corrective actions with owners and deadlines.",
          "KPIs (Module 5) track performance; management review adjusts the plans.",
          "Policies are reviewed periodically — that is the Check → Act half of PDCA in practice.",
        ],
        image: "/images/esg-reporting.jpg",
        caption: "Audit → correct → review → improve: the loop never stops.",
      },
    ],
    objectives: [
      "Describe the purpose, standards base and main elements of the ESMS.",
      "Name the key policies in an ESMS policy suite and what each covers.",
      "Recall the concrete site rules: right to stop work, hours cap, BAC 0.00, zero tolerance for GBVSH.",
      "Use a RACI to assign ESG responsibilities.",
      "Explain the grievance mechanism and how subcontractors are controlled.",
    ],
    activities: [
      {
        type: "order",
        title: "Order the PDCA cycle",
        prompt: "Drag the ESMS improvement cycle into the right order.",
        items: ["Plan", "Do", "Check", "Act"],
      },
      {
        type: "scenario",
        title: "A worker raises a grievance",
        intro:
          "A worker reports, through the grievance box, that a subcontractor is skipping safety briefings.",
        steps: [
          {
            prompt: "What is the right first step?",
            options: [
              { text: "Log the grievance and investigate the subcontractor", outcome: "good", feedback: "Correct — the grievance mechanism must record and act on concerns, and subcontractors are the contractor’s responsibility." },
              { text: "Ignore it — it's the subcontractor's problem", outcome: "bad", feedback: "No — subcontractor conduct is flowed down to the contractor; ignoring it is an ESMS failure." },
              { text: "Find out who complained and warn them", outcome: "bad", feedback: "Never — retaliation destroys the grievance mechanism and breaches the Code of Conduct." },
            ],
          },
        ],
      },
      {
        type: "match",
        title: "Match the RACI role",
        prompt: "Choose what each RACI letter means.",
        items: [
          { prompt: "R — Responsible", options: ["Does the work", "Owns the outcome", "Is kept informed"], correct: 0, tip: "Responsible = does the task." },
          { prompt: "A — Accountable", options: ["Owns the outcome", "Does the work", "Is only consulted"], correct: 0, tip: "Accountable = answerable for the result." },
          { prompt: "C — Consulted", options: ["Gives input before a decision", "Does the work", "Owns the outcome"], correct: 0, tip: "Consulted = asked for input." },
        ],
      },
      {
        type: "match",
        title: "Which policy covers it?",
        prompt: "Match each situation to the ESMS policy that governs it.",
        items: [
          { prompt: "A worker refuses to climb unsafe scaffolding", options: ["Occupational Health & Safety", "Anti-Money-Laundering", "Smoke-Free"], correct: 0, tip: "The OHS policy gives every worker the right to stop unsafe work." },
          { prompt: "A supplier offers an expensive gift before a tender", options: ["Anti-Bribery & Anti-Corruption", "HIV/AIDS", "Environmental & Social"], correct: 0, tip: "Gifts intended to influence decisions are prohibited by the anti-bribery policy." },
          { prompt: "A subcontractor pays workers cash, off the books", options: ["Subcontractor & Third-Party + HR", "Smoke-Free", "Biodiversity"], correct: 0, tip: "All workers must be formally employed, registered and fairly paid — flowed down by contract." },
          { prompt: "Oil drums must be disposed of", options: ["Environmental & Social (certified disposers)", "EDI", "Alcohol & Drugs"], correct: 0, tip: "Waste goes only to government-certified disposal companies." },
        ],
      },
      {
        type: "swipe",
        title: "Myth or fact? — the rules everyone works by",
        prompt: "Six statements from the policy suite. Myth or fact?",
        cards: [
          { text: "Any worker can stop work under dangerous conditions.", truth: true, tip: "Fact — the OHS policy protects that right, and management must respond." },
          { text: "The alcohol limit on site is BAC 0.05.", truth: false, tip: "Myth — it's 0.00. Zero tolerance, including subcontractors." },
          { text: "Retaliating against someone who filed a grievance is forbidden.", truth: true, tip: "Fact — no retaliation, ever; it's the mechanism's foundation." },
          { text: "Subcontractors are exempt from the ESMS.", truth: false, tip: "Myth — the same standards flow down through contracts, training and audits." },
          { text: "PDCA stops once the first cycle is complete.", truth: false, tip: "Myth — it loops forever; that's what 'continual improvement' means." },
          { text: "Toolbox talks are short daily safety chats with the crew.", truth: true, tip: "Fact — small, daily, and among the most powerful tools on site." },
        ],
      },
      {
        type: "memory",
        title: "Memory: the ESMS toolkit",
        prompt: "Match each piece of the system to what it does.",
        pairs: [
          { a: "ESMS", b: "The daily ESG machine" },
          { a: "PDCA", b: "Plan, Do, Check, Act" },
          { a: "RACI", b: "The who-does-what chart" },
          { a: "Grievance", b: "A complaint, safely raised" },
          { a: "Toolbox talk", b: "Daily crew safety chat" },
          { a: "Flow-down", b: "Same rules for subcontractors" },
        ],
      },
    ],
  },
  {
    id: "m5",
    code: "M5",
    order: 5,
    title: "KPIs and reporting",
    type: "quiz",
    duration: "10–12 min",
    status: "not_started",
    score: { earned: 0, total: 20 },
    icon: "monitoring",
    summary: "The ESG scoreboard: KPIs, how they're calculated, and what lenders read.",
    video: { id: "OT3gsCbCKdI", title: "Sustainability 101 — ESG reporting" },
    tldr: "KPIs are the project's scoreboard. Every form filled at the site gate becomes a number; the numbers become trends; the trends tell you where to act BEFORE something goes wrong — and they tell the lenders the project deserves its financing. One rule above all: the numbers must be honest.",
    glossary: [
      { term: "KPI", plain: "Key Performance Indicator — a number that tracks something that matters: injuries, spills, complaints, local jobs." },
      { term: "LTIFR", plain: "Lost-Time Injury Frequency Rate: injuries serious enough to miss work, per million hours worked. The flagship safety number." },
      { term: "Leading indicator", plain: "Measures prevention — near-misses reported, training done. It warns you BEFORE the accident." },
      { term: "Lagging indicator", plain: "Counts what already happened — injuries, spills. Useful, but it's looking in the rear-view mirror." },
      { term: "Near-miss", plain: "An incident that ALMOST hurt someone. Lots of near-miss reports = a healthy site that sees its risks." },
      { term: "Trend", plain: "The direction of a number over months. 2 → 5 → 9 complaints is an alarm even if each one was handled." },
    ],
    overview:
      "What gets measured gets managed. KPIs are the project's ESG scoreboard: they turn thousands of daily actions — inductions, inspections, grievances, spills — into numbers that show whether the system is working. This module covers the KPI families, how the key ones are actually calculated, where the data comes from, and how the numbers travel from a site form to a lender's desk.",
    lesson: [
      {
        heading: "Why measure at all",
        body: "You cannot manage what you cannot see. A site runs on thousands of small events a week; KPIs compress them into a picture management can act on. They also serve three audiences at once: the site (fix problems early), management (steer resources), and the lenders (verify the loan's ESG conditions are being met). One set of honest numbers serves all three.",
        image: "/images/esg-reporting.jpg",
        caption: "One honest scoreboard serves the site, management and the lenders.",
      },
      {
        heading: "The four KPI families",
        points: [
          "Safety — LTIFR, TRIR, near-misses reported, toolbox talks held, drills completed.",
          "Environment — spills (number & volume), waste by type and destination, water and energy use, dust/noise complaints.",
          "Social — grievances raised and closed on time, local employment %, female participation %, training hours, community meetings held.",
          "Compliance — permit status, ESAP actions closed by deadline, audit findings open/closed.",
        ],
        image: "/images/lm8.jpg",
        caption: "Safety, environment, social, compliance — every pillar gets a number.",
      },
      {
        heading: "Leading vs lagging — the two directions of time",
        body: "Lagging indicators count what has already happened: injuries, spills, complaints. Leading indicators measure what you do to PREVENT those things: near-misses reported, inspections done, training delivered. A site with rising near-miss reports and falling injuries is usually a HEALTHY site — people are looking, reporting and fixing before harm occurs.",
        points: [
          "Lagging: lost-time injuries, spills, grievances received.",
          "Leading: near-misses reported, training hours, inspections completed, drills held.",
          "Track both — leading indicators buy you the time to act.",
        ],
        image: "/images/lm4.jpg",
        caption: "Leading indicators look forward; lagging ones look back. You need both.",
      },
      {
        heading: "How a KPI is actually calculated — LTIFR",
        body: "LTIFR — the Lost-Time Injury Frequency Rate — is the flagship safety KPI. It counts lost-time injuries per million hours worked, so sites of different sizes can be compared fairly. Example: a project works 500,000 hours in a quarter and records 1 lost-time injury. LTIFR = 1 ÷ 500,000 × 1,000,000 = 2.0. A target might be 'LTIFR below 1.0' — this quarter misses it, and the report must say why and what changes.",
        image: "/images/lm3.jpg",
        caption: "LTIFR = lost-time injuries × 1,000,000 ÷ hours worked — size-adjusted, comparable.",
      },
      {
        heading: "Targets, thresholds and trends",
        points: [
          "Every KPI needs a target (e.g. grievances closed within 30 days: ≥ 90%).",
          "Thresholds turn numbers into signals: green (on target), amber (watch), red (act now).",
          "The TREND matters more than a single month — three amber months are a red flag.",
          "Zero is not always good: zero grievances usually means the mechanism isn't trusted, not that everyone is happy.",
        ],
        image: "/images/esg-environment.jpg",
        caption: "Targets make numbers mean something; trends tell you where you're heading.",
      },
      {
        heading: "Where the data comes from",
        body: "KPIs are only as good as the forms behind them. On a real project the sources are mundane and daily:",
        points: [
          "VHSE daily/weekly forms — hours worked, incidents, near-misses, inspections.",
          "HSE reports — incident investigations, drill records, waste and water logs.",
          "HR workbook — headcount, local employment, female participation, training registers.",
          "Grievance register — every complaint, its date, owner and closure.",
          "If it wasn't written down when it happened, it didn't happen — reconstructed data is guessed data.",
        ],
        image: "/images/lm10.jpg",
        caption: "KPIs are born on the road and at the site gate, not in the head office.",
      },
      {
        heading: "The reporting chain",
        body: "Site teams collect the data daily. The ESG/HSE manager checks and compiles it monthly. It becomes the self-monitoring report, signed off by the project director, sent to the lenders and verified by the IESC against the loan's ESG conditions and the ESAP (Module 3).",
        image: "/images/lm2.jpg",
        caption: "Form → register → report → lender: the same number travels the whole chain.",
      },
      {
        heading: "Turning data into decisions",
        body: "Numbers only matter if they change something. A rising near-miss trend in one work area prompts a targeted toolbox talk before an injury happens. A grievance backlog triggers extra community-relations capacity. A dashboard makes those trends visible at a glance — and management review (Module 4's Check → Act) turns them into actions.",
        image: "/images/esg-reporting.jpg",
        caption: "A trend caught early is an injury prevented — that is what KPIs are for.",
      },
      {
        heading: "Data quality matters",
        points: [
          "Accurate — measured, not guessed.",
          "Timely — reported on schedule, not months late.",
          "Verifiable — backed by records the IESC can check.",
          "Consistent — same definitions every period, or the trend is fiction.",
          "Garbage in, garbage out: unreliable data erodes lender trust faster than a bad number reported honestly.",
        ],
        image: "/images/esg-pollution.jpg",
        caption: "Accurate, timely, verifiable, consistent — or the numbers are worthless.",
      },
      {
        heading: "Closing the loop",
        body: "KPIs feed back into the ESMS (Plan-Do-Check-Act) and into financing decisions — tying straight back to Module 3. Reliable self-monitoring is what sustains lender trust and keeps disbursements flowing. The scoreboard isn't paperwork; it's the project's licence to keep building.",
        image: "/images/course-hero.jpg",
        caption: "The loop closes: site data → ESMS improvement → lender confidence → financing.",
      },
    ],
    objectives: [
      "Identify the main ESG KPI categories.",
      "Explain who collects and who reports the data.",
      "Describe what lenders review, and why it matters.",
    ],
    activities: [
      {
        type: "categorize",
        title: "Leading or lagging indicator?",
        prompt: "Drag each KPI into the right type.",
        categories: [
          { id: "lead", label: "Leading (predicts)" },
          { id: "lag", label: "Lagging (looks back)" },
        ],
        items: [
          { id: "nm", text: "Near-misses reported", cat: "lead" },
          { id: "train", text: "Safety training hours", cat: "lead" },
          { id: "insp", text: "Inspections completed", cat: "lead" },
          { id: "lti", text: "Lost-time injuries", cat: "lag" },
          { id: "spill", text: "Spills recorded", cat: "lag" },
        ],
      },
      {
        type: "order",
        title: "The reporting flow",
        prompt: "Put the reporting chain in order, from site to lender.",
        items: [
          "Site teams collect the data",
          "ESG/HSE managers compile it",
          "Self-monitoring report is produced",
          "Lenders and the IESC review it",
        ],
      },
      {
        type: "slider",
        title: "Estimate the KPI",
        prompt: "On a project this size, roughly how many community grievances might be logged in a year?",
        min: 0,
        max: 100,
        step: 1,
        answer: 30,
        unit: "",
        tip: "Dozens a year is normal and healthy — it means people trust the mechanism. Zero is often a red flag that it isn't being used.",
      },
      {
        type: "match",
        title: "Match the KPI to what it tells you",
        prompt: "Choose what each number really means.",
        items: [
          { prompt: "LTIFR rising over three months", options: ["People are getting hurt — investigate and act now", "The site is getting safer", "Nothing — it's a leading indicator"], correct: 0, tip: "LTIFR is a lagging safety rate — a rising trend means injuries are happening." },
          { prompt: "Near-miss reports doubled, injuries at zero", options: ["A healthy reporting culture — people see and flag risk", "The site became twice as dangerous", "The data must be wrong"], correct: 0, tip: "More near-miss reporting with no injuries usually means eyes are open, not danger rising." },
          { prompt: "Zero grievances for six months straight", options: ["Probably a trust problem — check the mechanism is known and safe", "Perfect community relations", "The register can be closed"], correct: 0, tip: "Silence is rarely satisfaction — verify people know and trust the channel." },
          { prompt: "ESAP actions: 9 of 10 closed, 1 overdue", options: ["Report it with a recovery plan — flag it before the IESC finds it", "Hide the overdue one", "Close it without evidence"], correct: 0, tip: "An overdue action flagged early with a plan is manageable; a hidden one is a trust problem." },
        ],
      },
      {
        type: "swipe",
        title: "Myth or fact? — the numbers",
        prompt: "Six statements about KPIs and reporting. Myth or fact?",
        cards: [
          { text: "Zero grievances always means the community is happy.", truth: false, tip: "Myth — silence usually means the mechanism isn't known or trusted." },
          { text: "LTIFR is measured per million hours worked.", truth: true, tip: "Fact — injuries × 1,000,000 ÷ hours worked, so projects of any size compare fairly." },
          { text: "Near-misses are lagging indicators.", truth: false, tip: "Myth — they're LEADING: they warn you before the injury happens." },
          { text: "A trend over months matters more than one month's number.", truth: true, tip: "Fact — 2 → 5 → 9 is an alarm even if each month looked handled." },
          { text: "Estimating hours worked is fine if you're busy.", truth: false, tip: "Myth — hours are the denominator of every safety rate; guessed hours = fictional KPIs." },
          { text: "Every red KPI should sit next to its corrective action.", truth: true, tip: "Fact — a red number with a plan builds trust; a red number alone raises questions." },
        ],
      },
      {
        type: "memory",
        title: "Memory: the numbers game",
        prompt: "Match each KPI term to its meaning.",
        pairs: [
          { a: "KPI", b: "A number that matters" },
          { a: "LTIFR", b: "Injuries per million hours" },
          { a: "Leading", b: "Warns before the accident" },
          { a: "Lagging", b: "Counts what happened" },
          { a: "Near-miss", b: "Almost an accident" },
          { a: "Trend", b: "Direction over months" },
        ],
      },
    ],
  },
  {
    id: "m6",
    code: "M6",
    order: 6,
    title: "Capstone: the full ESG simulation",
    type: "capstone",
    duration: "10–15 min",
    status: "not_started",
    score: { earned: 0, total: 10 },
    icon: "sports_esports",
    summary: "Ten live ESG decisions that decide whether the financing holds.",
    tldr: "No more reading — this is the game. Twelve situations from the whole course land on your desk, one by one. Every decision moves the project's financing health up or down. Get 10 of 12 right and the lenders stay with you.",
    glossary: [
      { term: "Financing health", plain: "The meter in the simulation — it stands for the lenders' confidence in the project. Good calls raise it, bad calls sink it." },
      { term: "Good call", plain: "The decision the course taught: protect people first, follow the stricter rule, report honestly, use the grievance mechanism." },
    ],
    overview:
      "The capstone brings the whole pathway together. You play the contractor’s site ESG lead through twelve real decisions on a lender-financed PPP project — each one moves the project's financing health. Score at least 10 of 12 to pass and keep the lenders on side.",
    lesson: [
      {
        heading: "How the capstone works",
        body: "There is no reading here — this module IS the simulation. You'll face ten situations drawn from Modules 1–5: environmental impacts, the rules, the financing, the ESMS and the KPIs. Choose wisely; the lenders are watching.",
        image: "/images/course-hero.jpg",
        caption: "Twelve live decisions on a financed project — everything you've learned, applied.",
      },
      {
        heading: "What you'll need",
        points: [
          "The mitigation hierarchy and E vs S impacts (Module 1).",
          "The stricter-standard rule and the standards (Module 2).",
          "How ESG keeps the financing flowing (Module 3).",
          "The ESMS, grievances and subcontractor control (Module 4).",
          "Honest KPIs and reporting (Module 5).",
        ],
        image: "/images/lm2.jpg",
        caption: "Five modules of knowledge, one project to protect.",
      },
    ],
    objectives: [
      "Apply ESG judgement across the whole project lifecycle.",
      "Protect the project's financing through good ESG decisions.",
    ],
  },
];

// A distinct accent colour per module (by id). Used for icon tiles, chart
// bars, lesson banners and card headers so each module is recognisable.
export const moduleAccents = {
  m1: "#06b6d4", // cyan — ESG in construction
  m2: "#f59e0b", // amber — regulatory framework
  m3: "#10b981", // emerald — financing
  m4: "#a855f7", // purple — the ESMS
  m5: "#3b82f6", // blue — KPIs & reporting
  m6: "#c99a2e", // gold — capstone
};

// Construction & public-infrastructure photos per module (royalty-free,
// Unsplash). Files live in /public/images and are served from the site root.
export const moduleImages = {
  m1: "/images/lm4.jpg", // managed construction site, work crew
  m2: "/images/lm5.jpg", // modern public/civic building (regulation)
  m3: "/images/lm2.jpg", // financial district (the financing)
  m4: "/images/lm3.jpg", // workers in PPE on site (ESMS in practice)
  m5: "/images/lm8.jpg", // solar array (measurable performance)
  m6: "/images/lm14.jpg", // capstone — the whole project, aerial Lagos highway
};

export const libraryItems = [
  {
    title: "Signed ESMS policy suite & Code of Conduct",
    note: "The governing policies, countersigned.",
    icon: "policy",
    accent: "#6366f1",
    doc: "code-of-conduct",
  },
  {
    title: "ESG Standards Foundation Reference",
    note: "IFC PS & Equator Principles, consolidated.",
    icon: "menu_book",
    accent: "#0ea5e9",
  },
  {
    title: "Security & Human Rights Handbook",
    note: "Voluntary Principles in practice.",
    icon: "shield",
    accent: "#10b981",
  },
  {
    title: "Job-aids A–E — keep at your post",
    note: "One-page reminders for daily tasks.",
    icon: "sticky_note_2",
    accent: "#f59e0b",
  },
  {
    title: "KPI sources — VHSE form, HSE report, HR workbook",
    note: "Where every reported number comes from.",
    icon: "bar_chart",
    accent: "#ef4444",
  },
  {
    title: "Conference pre-read pack — your workshop group",
    note: "Read before the next ESG workshop.",
    icon: "folder",
    accent: "#a855f7",
  },
];

// Library organised BY module — one line per module, each listing the
// documents related to it. An item with `doc` links to its in-app reading
// (see `documents`); the rest are placeholders ("coming soon").
export const libraryByModule = {
  m1: [
    { title: "What is ESG? — start here", icon: "eco", doc: "what-is-esg" },
    { title: "ESG impacts field guide", icon: "description", doc: "esg-impacts-guide" },
    { title: "Mitigation hierarchy job-aid", icon: "sticky_note_2", doc: "mitigation-hierarchy" },
  ],
  m2: [
    { title: "ESG Standards Foundation Reference (IFC PS & Equator Principles)", icon: "menu_book", doc: "ifc-equator-reference" },
    { title: "Nigerian ESG legal register (EIA Act, NESREA, permits)", icon: "gavel", doc: "nigeria-legal" },
  ],
  m3: [
    { title: "Loan ESG conditions — summary", icon: "account_balance", doc: "loan-esg-conditions" },
    { title: "ESAP — Environmental & Social Action Plan template", icon: "checklist", doc: "esap-template" },
    { title: "Self-monitoring report template", icon: "assignment", doc: "self-monitoring-template" },
  ],
  m4: [
    { title: "Signed ESMS policy suite & Code of Conduct", icon: "policy", doc: "code-of-conduct" },
    { title: "RACI matrix — ESG responsibilities", icon: "grid_view", doc: "raci-matrix" },
    { title: "Grievance mechanism procedure", icon: "forum", doc: "grievance-procedure" },
    { title: "Subcontractor ESG requirements", icon: "engineering", doc: "subcontractor-esg" },
  ],
  m5: [
    { title: "KPI sources — VHSE form, HSE report, HR workbook", icon: "bar_chart", doc: "kpi-sources" },
    { title: "KPI definitions & targets", icon: "monitoring", doc: "kpi-definitions" },
  ],
  m6: [
    { title: "Launch the capstone simulation", icon: "sports_esports", to: "/capstone" },
  ],
};

// Company policies & official documents, grouped by category. An item with a
// `doc` key links to its in-app reading (see `documents` below); others are
// placeholders ("coming soon") ready to be filled as documents are provided.
export const resourceCategories = [
  {
    title: "Governance & Ethics",
    items: [
      {
        title: "HITECH Code of Conduct",
        note: "Ethical standards for all staff, contractors & partners.",
        icon: "gavel",
        accent: "#6366f1",
        doc: "code-of-conduct",
      },
      {
        title: "Anti-Bribery, Anti-Corruption & AML Policy",
        note: "Bribery, conflicts of interest, KYC and AML controls.",
        icon: "account_balance",
        accent: "#f43f5e",
      },
      {
        title: "Whistleblowing Policy",
        note: "How to report concerns safely and without retaliation.",
        icon: "campaign",
        accent: "#0ea5e9",
      },
    ],
  },
  {
    title: "Health, Safety & Environment",
    items: [
      {
        title: "HSE Policy",
        note: "Safe systems of work, PPE and incident reporting.",
        icon: "health_and_safety",
        accent: "#10b981",
      },
      {
        title: "Environmental & Social Policy",
        note: "Pollution prevention, resource use and ESG commitments.",
        icon: "eco",
        accent: "#22c55e",
      },
      {
        title: "Emergency Preparedness & Response Plan",
        note: "Roles and procedures for accidents and emergencies.",
        icon: "emergency",
        accent: "#f59e0b",
      },
    ],
  },
  {
    title: "People & Community",
    items: [
      {
        title: "HR Employment Handbook",
        note: "Fair labour, working hours, rights and conduct.",
        icon: "groups",
        accent: "#a855f7",
      },
      {
        title: "GBVH / Anti-Harassment Policy",
        note: "Zero tolerance for harassment and gender-based violence.",
        icon: "diversity_3",
        accent: "#ec4899",
      },
      {
        title: "Community Grievance Mechanism (GRM)",
        note: "How host communities raise and resolve concerns.",
        icon: "forum",
        accent: "#14b8a6",
      },
    ],
  },
  {
    title: "Management System",
    items: [
      {
        title: "ESMS Manual",
        note: "The Environmental & Social Management System.",
        icon: "autorenew",
        accent: "#06b6d4",
      },
      {
        title: "Construction Environmental & Social Management Plan (CESMP)",
        note: "Project-specific ESG controls on site.",
        icon: "engineering",
        accent: "#3b82f6",
      },
    ],
  },
];

// The eight IFC Performance Standards — plain-language meaning + a concrete
// construction example for each. Used by the reference reading and the match
// exercise in Module 2.
export const ifcStandards = [
  {
    n: 1,
    title: "Assessment & Management of E&S Risks",
    plain:
      "The master standard: run a system (the ESMS) that finds, assesses and manages every E&S risk across the whole project.",
    example:
      "The contractor keeps a risk register, management plans and monitoring for a new road — one system covering all the other standards.",
  },
  {
    n: 2,
    title: "Labour & Working Conditions",
    plain:
      "Treat workers fairly and safely: fair pay and hours, no child or forced labour, safe conditions, and a grievance channel for workers.",
    example:
      "Giving every worker a written contract and PPE, and a way to report problems without fear of being sacked.",
  },
  {
    n: 3,
    title: "Resource Efficiency & Pollution Prevention",
    plain:
      "Use resources efficiently and prevent pollution of air, water and land; manage waste, emissions and greenhouse gases.",
    example:
      "Suppressing dust, reusing water, and sending used oil and chemicals only to licensed disposal.",
  },
  {
    n: 4,
    title: "Community Health, Safety & Security",
    plain:
      "Protect the surrounding community from project hazards; manage traffic, emergencies and security — with force only ever proportionate.",
    example:
      "Speed limits and signage where haul trucks pass a village, and guards trained never to use excessive force.",
  },
  {
    n: 5,
    title: "Land Acquisition & Involuntary Resettlement",
    plain:
      "Avoid or minimise displacing people; where unavoidable, compensate fairly and help restore their livelihoods.",
    example:
      "Paying fair compensation and helping a farmer re-establish income after land is taken for a bridge approach.",
  },
  {
    n: 6,
    title: "Biodiversity Conservation",
    plain:
      "Protect ecosystems and biodiversity; avoid critical habitat and manage living natural resources sustainably.",
    example:
      "Rerouting the works to avoid a wetland, and replanting the vegetation that had to be cleared.",
  },
  {
    n: 7,
    title: "Indigenous Peoples",
    plain:
      "Respect the rights, cultures and lands of Indigenous Peoples, and obtain Free, Prior & Informed Consent (FPIC) where required.",
    example:
      "Consulting an Indigenous community and securing FPIC before any work touches their ancestral land.",
  },
  {
    n: 8,
    title: "Cultural Heritage",
    plain:
      "Protect cultural heritage, and follow a chance-find procedure if artefacts are uncovered during works.",
    example:
      "Stopping excavation and calling in experts the moment a burial site or artefact is discovered.",
  },
];

// Equator Principles risk categories.
export const equatorCategories = [
  {
    id: "A",
    label: "Category A",
    color: "#f43f5e",
    level: "High risk",
    desc: "Potential significant adverse impacts that are diverse, irreversible or unprecedented.",
    example: "A new highway cutting through sensitive habitat and communities.",
  },
  {
    id: "B",
    label: "Category B",
    color: "#f59e0b",
    level: "Medium risk",
    desc: "Limited, mostly site-specific, largely reversible impacts that are readily managed.",
    example: "Upgrading an existing factory or widening a short road section.",
  },
  {
    id: "C",
    label: "Category C",
    color: "#10b981",
    level: "Low risk",
    desc: "Minimal or no adverse environmental or social impacts.",
    example: "A small office fit-out with no ground works.",
  },
];

// "Choose the right example" exercise: match a scenario to its Performance
// Standard. correct = index of the right option.
export const psMatchItems = [
  {
    prompt: "A worker gets a written contract, PPE, and a safe way to raise complaints.",
    options: ["PS2 — Labour & Working Conditions", "PS3 — Pollution Prevention", "PS5 — Land & Resettlement", "PS8 — Cultural Heritage"],
    correct: 0,
    tip: "Fair, safe treatment of workers is PS2.",
  },
  {
    prompt: "A farmer is fairly compensated and helped to restore income after land is taken.",
    options: ["PS4 — Community Health & Safety", "PS5 — Land Acquisition & Resettlement", "PS2 — Labour", "PS6 — Biodiversity"],
    correct: 1,
    tip: "Land take and livelihood restoration is PS5.",
  },
  {
    prompt: "Dust is suppressed and used oil is sent only to a licensed disposal site.",
    options: ["PS6 — Biodiversity", "PS7 — Indigenous Peoples", "PS3 — Resource Efficiency & Pollution Prevention", "PS1 — Assessment"],
    correct: 2,
    tip: "Preventing pollution and managing waste is PS3.",
  },
  {
    prompt: "Excavation stops immediately when a burial site is uncovered.",
    options: ["PS8 — Cultural Heritage", "PS4 — Community Health & Safety", "PS5 — Land & Resettlement", "PS2 — Labour"],
    correct: 0,
    tip: "Chance-find procedures for heritage are PS8.",
  },
  {
    prompt: "The team secures Free, Prior & Informed Consent before working on ancestral land.",
    options: ["PS5 — Land & Resettlement", "PS7 — Indigenous Peoples", "PS3 — Pollution Prevention", "PS1 — Assessment"],
    correct: 1,
    tip: "FPIC and Indigenous rights are PS7.",
  },
  {
    prompt: "Speed limits and signage are added where haul trucks pass a village.",
    options: ["PS2 — Labour", "PS6 — Biodiversity", "PS4 — Community Health, Safety & Security", "PS8 — Cultural Heritage"],
    correct: 2,
    tip: "Protecting the surrounding community is PS4.",
  },
];

// Capstone simulation — 5 ESG decisions on a PPP project that together decide
// whether the financing keeps flowing. Need `passNeeded` good calls to pass.
export const capstoneSim = {
  intro:
    "You are the contractor’s site ESG lead on a lender-financed PPP road. Twelve situations land on your desk over the project. Each decision moves the project's financing health up or down. Keep the lenders' confidence — make at least 10 good calls out of 12.",
  passNeeded: 10,
  steps: [
    {
      prompt: "Monday — dust from earthworks is drifting over the neighbouring village.",
      options: [
        { text: "Start dust suppression and inform the community", good: true, feedback: "Good — you avoided/minimised the impact and engaged the community (Modules 1 & 4)." },
        { text: "Wait to see if anyone complains", good: false, feedback: "Poor — the impact grows and the IESC will flag it (Module 1)." },
      ],
    },
    {
      prompt: "Tuesday — a subcontractor is skipping safety briefings.",
      options: [
        { text: "Enforce the standard through their contract and retrain", good: true, feedback: "Good — subcontractor conduct is the contractor’s responsibility (Module 4)." },
        { text: "Leave it — they're a separate company", good: false, feedback: "Poor — their breach is your breach in the lenders' eyes (Module 4)." },
      ],
    },
    {
      prompt: "Wednesday — the local permit allows more effluent than the IFC standard.",
      options: [
        { text: "Apply the stricter IFC standard", good: true, feedback: "Good — where they differ, the stricter rule applies (Module 2)." },
        { text: "Follow the looser local limit to save money", good: false, feedback: "Poor — lenders require the stricter standard; this breaches the loan (Module 2)." },
      ],
    },
    {
      prompt: "Thursday — a community member files a grievance about road access.",
      options: [
        { text: "Log it in the grievance mechanism and respond", good: true, feedback: "Good — transparent, retaliation-free grievance handling (Modules 1 & 4)." },
        { text: "Offer a quiet cash payment to drop it", good: false, feedback: "Poor — off-record payments breach the Code of Conduct (Governance)." },
      ],
    },
    {
      prompt: "Friday — a minor spill occurred. What goes in the self-monitoring report?",
      options: [
        { text: "Record the spill and the corrective action taken", good: true, feedback: "Good — honest reporting keeps lender trust and disbursements flowing (Modules 3 & 5)." },
        { text: "Leave it out so the report looks clean", good: false, feedback: "Poor — if the IESC finds it later, credibility and financing collapse (Module 3)." },
      ],
    },
    {
      prompt: "A community elder asks to meet about noise near the school.",
      options: [
        { text: "Meet, listen, and agree working-hour limits", good: true, feedback: "Good — proactive engagement is the heart of the Social pillar (Module 1)." },
        { text: "Decline — you're too busy building", good: false, feedback: "Poor — ignoring the community breeds grievances and reputational risk." },
      ],
    },
    {
      prompt: "The IESC schedules a site visit next week.",
      options: [
        { text: "Get records and the ESAP up to date and be transparent", good: true, feedback: "Good — transparency with the lenders' monitor sustains trust (Module 3)." },
        { text: "Hide the open issues until they leave", good: false, feedback: "Poor — concealment discovered by the IESC can trigger default (Module 3)." },
      ],
    },
    {
      prompt: "Hazardous waste (used oil, chemicals) is piling up on site.",
      options: [
        { text: "Store it safely and use a licensed disposal contractor", good: true, feedback: "Good — proper waste management is core to the Environmental pillar (Module 1)." },
        { text: "Burn it on site to clear space", good: false, feedback: "Poor — that's illegal pollution and a serious ESG breach." },
      ],
    },
    {
      prompt: "A worker reports that scaffolding looks unsafe.",
      options: [
        { text: "Stop that work, inspect and fix it before restarting", good: true, feedback: "Good — worker safety comes first; the grievance was acted on (Modules 2 & 4)." },
        { text: "Keep going to hold the schedule", good: false, feedback: "Poor — a preventable injury would stop the site and breach the loan." },
      ],
    },
    {
      prompt: "Local law is silent on a risk, but the IFC standard addresses it.",
      options: [
        { text: "Apply the IFC standard anyway", good: true, feedback: "Good — meet the higher bar even where local law is silent (Module 2)." },
        { text: "Do nothing — the law doesn't require it", good: false, feedback: "Poor — lenders expect the international standard regardless." },
      ],
    },
    {
      prompt: "Myth or fact? A colleague says: “Hiding one bad monthly report is safer than showing it to the IESC.”",
      options: [
        { text: "Myth — show the real records; a hidden problem found later destroys all trust", good: true, feedback: "Correct call — transparency plus a recovery plan keeps the lenders on side (Module 3)." },
        { text: "Fact — protect the project's image this month", good: false, feedback: "Wrong call — when the IESC finds it, every past report becomes suspect and disbursements freeze." },
      ],
    },
    {
      prompt: "Myth or fact? The foreman says: “Zero grievances this quarter means the community is happy.”",
      options: [
        { text: "Myth — silence often means the mechanism isn't known or trusted; go check awareness", good: true, feedback: "Correct call — a healthy project RECEIVES grievances and closes them on time (Modules 4 & 5)." },
        { text: "Fact — no news is good news", good: false, feedback: "Wrong call — an unused mechanism is a warning sign, not a win." },
      ],
    },
  ],
};

// Reference documents rendered as in-app readings. `keyPoints` is a faithful
// summary for on-screen study; the full signed source is embedded via `pdf`.
export const documents = {
  "code-of-conduct": {
    title: "HITECH Code of Conduct",
    org: "HITECH Construction Company Limited — Builders & Civil Engineers",
    ref: "IMS-HSE-Pol-014 · Version 1 · April 2025",
    owner: "Approved by Dany Abboud, Managing Director",
    accent: "#6366f1",
    pdf: "/docs/hitech-code-of-conduct.pdf",
    acknowledge: true,
    intro:
      "The ethical principles and behavioural standards expected of all HITECH employees, contractors, consultants, suppliers and partners, across every operation and project site in Nigeria and internationally. It is part of HITECH’s ESMS and is read alongside the ESMS policies and HR Employment Handbook.",
    sections: [
      {
        title: "Commitment & compliance",
        points: [
          "Conduct business with integrity, professionalism and sustainability.",
          "Comply with national laws, IFC Performance Standards, ILO Core Conventions, Equator Principles IV, the UN Guiding Principles (UNGPs) and the Voluntary Principles on Security & Human Rights (VPSHR).",
          "Meet anti-corruption, AML, sanctions and OHS requirements, including project-specific CESMPs.",
        ],
      },
      {
        title: "Health, Safety & Environment",
        points: [
          "Follow safe work procedures and use PPE at all times.",
          "Take part in toolbox talks, risk assessments and safety training.",
          "Report unsafe acts or incidents immediately; follow site traffic, security and emergency rules.",
          "Protect environmental resources and avoid pollution or waste. Smoking only in designated areas; drugs and alcohol strictly prohibited.",
        ],
      },
      {
        title: "Human rights & fair labour",
        points: [
          "No child labour or forced labour in any form.",
          "No discrimination, harassment or abuse of power; fair recruitment, equal pay and safe conditions.",
          "Uphold freedom of association, collective bargaining, rest days and just working hours.",
        ],
      },
      {
        title: "Gender-based violence & harassment (GBVH)",
        points: [
          "Zero tolerance for sexual harassment, abuse and gender-based violence.",
          "Complete GBVSH training; refrain from unwanted attention, harassment or coercion.",
          "Respect the dignity of women and all vulnerable groups at work and in the community.",
        ],
      },
      {
        title: "Anti-bribery, anti-corruption & AML",
        points: [
          "No bribery, kickbacks, facilitation payments or conflicts of interest.",
          "No dealings involving criminal proceeds or sanctioned parties; gifts must not influence decisions.",
          "KYC and AML/ABC screening required; all payments traceable through approved channels.",
        ],
      },
      {
        title: "Community, confidentiality & third parties",
        points: [
          "Respect local customs and cultural heritage; protect community access to water, roads and utilities.",
          "Handle grievances through the defined Grievance Redress Mechanism (GRM).",
          "Protect personal data and confidential information; use company systems responsibly.",
          "Suppliers and subcontractors must sign the Supplier Code, train staff and cooperate in audits.",
        ],
      },
      {
        title: "Reporting, whistleblowing & enforcement",
        points: [
          "Report violations to the HSE Manager, HR Manager or Managing Director, or via grievance boxes / anonymous channels.",
          "Retaliation against whistleblowers is prohibited; reports are handled confidentially.",
          "Breaches may lead to warnings, suspension, dismissal, contract termination or legal action.",
        ],
      },
    ],
    relatedModules: ["m4", "m1", "m2"],
  },

  "what-is-esg": {
    title: "What is ESG?",
    org: "The complete primer — start here",
    accent: "#06b6d4",
    image: "/images/esg-environment.jpg",
    intro:
      "ESG stands for Environmental, Social and Governance. It is the framework the world now uses to judge whether a business is run responsibly — not just whether it makes money, but how it makes it: what it does to the planet, how it treats people, and whether it is governed honestly. This primer explains each pillar in plain language, with real examples from PPP construction, so you can see exactly what ESG means on the ground.",
    sections: [
      {
        title: "So what actually is ESG?",
        body: [
          "For most of the last century a company was judged on one question: is it profitable? ESG adds a second, equally important question — is that profit made responsibly? It breaks that down into three measurable dimensions: Environmental, Social and Governance.",
          "Think of ESG as a report card for how a company behaves. A firm can be highly profitable and still score badly on ESG — for example if it pollutes rivers, mistreats workers, or hides bribery. Increasingly, banks, investors, governments and communities refuse to work with companies that score badly, because poor ESG is a warning sign of future trouble.",
          "In construction ESG is not abstract. It is dust over a village, a worker without a harness, a stream turned brown by run-off, a land-owner waiting for fair compensation, or a bribe offered to speed up a permit. ESG is simply the discipline of managing all of that well.",
        ],
      },
      {
        title: "Where ESG came from",
        body: [
          "The term “ESG” was popularised in a 2004 United Nations report, “Who Cares Wins”, which argued that environmental, social and governance factors are financially material — they affect a company's long-term value and risk. Investors realised a company ignoring these issues was a riskier bet.",
          "For big infrastructure and PPP projects, the practical rulebook came from development finance. The IFC (part of the World Bank) published its Performance Standards, and the world's major banks adopted the Equator Principles — agreeing to fund large projects only if they manage their environmental and social risks properly.",
        ],
      },
      {
        title: "E — Environmental",
        body: "The Environmental pillar is our impact on the natural world: air, water, soil, biodiversity, climate and waste. On a construction site these impacts are large and immediate — and mostly preventable with the right controls.",
        image: "/images/esg-pollution.jpg",
        points: [
          "Air — dust from earthworks and haulage; exhaust and carbon emissions from plant and generators.",
          "Water — effluent, concrete washout and sediment run-off that can pollute streams communities depend on.",
          "Land & biodiversity — erosion, fuel spills, and clearing vegetation and habitats.",
          "Waste & climate — construction and hazardous waste, and the project's greenhouse-gas footprint.",
        ],
        example:
          "On a road project, uncontrolled earthworks send dust over a nearby village and silt into a river used for drinking water. The fix is cheap — wetting haul roads, silt fences, settlement ponds — but only if someone plans and enforces it. That is the Environmental pillar in action.",
      },
      {
        title: "S — Social",
        body: "The Social pillar is about people — everyone affected by the project, both your own workforce and the communities and individuals around the site.",
        image: "/images/esg-social.jpg",
        points: [
          "Workers — health & safety, fair pay and hours, decent worker-camp conditions, and no forced or child labour.",
          "Communities — managing noise, traffic and access; engaging honestly; running a real grievance mechanism.",
          "Land & livelihoods — fair treatment when land is acquired and people are resettled or lose income.",
          "Vulnerable groups — extra care for those least able to cope, and preventing gender-based violence and harassment.",
        ],
        example:
          "A contractor hires 200 local workers but houses them in an overcrowded camp with poor sanitation, and a supervisor demands favours for shifts. Both are Social failures — they harm real people, breach the Code of Conduct, and can halt the project's financing.",
      },
      {
        title: "G — Governance",
        body: "The Governance pillar is how the organisation is run — the systems, ethics and accountability that keep the other two pillars honest. Without good governance, environmental and social promises are just words on paper.",
        image: "/images/esg-governance.jpg",
        points: [
          "Ethics & anti-corruption — no bribery, kickbacks or facilitation payments; clear conflict-of-interest rules.",
          "Transparency & reporting — honest data and records that others can verify.",
          "Accountability — clear roles, oversight, and real consequences for breaches.",
          "Whistleblowing — safe channels to report wrongdoing without retaliation.",
        ],
        example:
          "A site manager pays a small bribe to speed up a permit. It seems harmless, but it is a Governance failure: it breaks the law and the Code of Conduct, and if a lender's auditor finds it, it can trigger a default across the whole loan. Good governance means escalating the delay through proper channels instead.",
      },
      {
        title: "ESG vs “E&S” vs sustainability",
        body: [
          "You will hear several similar terms. “E&S” (Environmental & Social) is what lenders and the IFC call the risks of a specific project — the E and the S of ESG, without the G. This is what the IESC assesses on our sites.",
          "“ESG” is the broader, company-level lens that adds Governance. “Sustainability” and “CSR” are looser umbrella terms for the same goal. This pathway uses ESG as the umbrella and goes deepest on the E&S topics, because that is what keeps our financing flowing.",
        ],
      },
      {
        title: "Who cares about ESG — and why",
        body: "ESG is not a box-ticking exercise for regulators alone. A whole chain of people rely on it, and each one can stop the project if it fails.",
        image: "/images/esg-reporting.jpg",
        points: [
          "Lenders & investors — they require it as a loan condition; poor ESG means withheld funds or default.",
          "Regulators — Nigerian law (EIA Act, NESREA) and permits set the legal minimum.",
          "Communities — the people who live with our impacts every day.",
          "Clients & governments — a PPP client's reputation rides on the project.",
          "Employees — people want to work safely and for an ethical employer.",
        ],
      },
      {
        title: "ESG on a PPP construction project",
        body: "A PPP (Public-Private Partnership) project — a road, bridge, hospital or power plant built for public use with private financing — is exactly where ESG bites hardest, because lenders and the public are both watching.",
        image: "/images/lm4.jpg",
        points: [
          "It is written into the loan: the ESAP lists the ESG actions the contractor must complete, on deadlines.",
          "It is checked independently: an IESC monitors ESG performance for the lenders.",
          "It is measured: KPIs track safety, environment, grievances and compliance.",
          "It is everyone's job: from the operator wetting a road to the director signing the report.",
        ],
        example:
          "On a PPP hospital build the loan releases money in stages. Before each release, the lender's consultant checks that ESG actions — dust control, worker safety, community grievances closed — are on track. Good ESG literally unlocks the next payment.",
      },
      {
        title: "Why good ESG pays off (and poor ESG costs)",
        points: [
          "Protects people and the environment — fewer injuries, less pollution, healthier communities.",
          "Keeps financing flowing — meeting ESG conditions unlocks loan disbursements.",
          "Protects reputation — one viral incident can lose future contracts.",
          "Saves money — preventing a spill or accident is far cheaper than cleaning up or compensating.",
          "Poor ESG costs: covenant breaches, withheld funds, fines, work stoppages, lawsuits and lost bids.",
        ],
        example:
          "A single fatal accident can stop a site for weeks, trigger an investigation, breach the loan, and cost far more than the safety measures that would have prevented it. ESG is risk management with a conscience.",
      },
      {
        title: "Common myths about ESG",
        points: [
          "“ESG is just PR.” No — on financed projects it is a binding loan condition with real money attached.",
          "“ESG slows us down.” Done early, it prevents the delays, stoppages and rework that poor ESG causes.",
          "“ESG is the ESG team's job.” No — every role on site owns a piece of it.",
          "“We follow local law, so we're fine.” Lenders require the stricter of local law or international standards.",
        ],
      },
      {
        title: "Key terms to remember",
        points: [
          "ESG — Environmental, Social, Governance.",
          "E&S — the Environmental & Social risks lenders assess on a project.",
          "IFC Performance Standards — the eight international benchmarks for managing E&S risk.",
          "Equator Principles — how banks apply the IFC PS to project finance.",
          "ESMS — the Environmental & Social Management System that runs it all day to day.",
          "IESC — the Independent Environmental & Social Consultant who monitors for lenders.",
          "ESAP — the Environmental & Social Action Plan: corrective actions with deadlines.",
        ],
      },
    ],
    relatedModules: ["m1", "m4", "m3"],
  },

  "esg-impacts-guide": {
    title: "ESG impacts field guide",
    org: "Module 1 · quick reference for the site",
    accent: "#06b6d4",
    image: "/images/lm3.jpg",
    intro:
      "A quick field reference to the environmental and social impacts you meet on a PPP construction site, and the first control for each.",
    sections: [
      {
        title: "Air",
        points: [
          "Impacts: dust from earthworks and haulage; exhaust from plant and generators.",
          "First controls: wet-suppress haul roads, cover loads, maintain and switch off idle plant.",
        ],
      },
      {
        title: "Water",
        points: [
          "Impacts: effluent, concrete washout, worker-camp wastewater, sediment run-off.",
          "First controls: bund and contain, use settlement ponds, never discharge to a stream.",
        ],
      },
      {
        title: "Land, soil & biodiversity",
        points: [
          "Impacts: erosion, fuel/oil spills, spoil, vegetation clearing.",
          "First controls: spill kits, bunded fuel stores, erosion control, limit clearing to the footprint.",
        ],
      },
      {
        title: "Waste",
        points: [
          "Impacts: construction debris, hazardous waste (oils, chemicals), domestic camp waste.",
          "First controls: segregate at source, store safely, use licensed disposal only.",
        ],
      },
      {
        title: "Social",
        points: [
          "Impacts: worker safety, community disturbance (noise, traffic), land, vulnerable groups.",
          "First controls: PPE and safe systems of work, community engagement, the grievance mechanism.",
        ],
      },
    ],
    relatedModules: ["m1"],
  },

  "mitigation-hierarchy": {
    title: "Mitigation hierarchy job-aid",
    org: "Module 1 · keep this at your post",
    accent: "#06b6d4",
    image: "/images/lm8.jpg",
    intro:
      "Tackle any impact in this order — Avoid → Minimise → Restore → Offset. Always start at the top and only move down when you must.",
    sections: [
      {
        title: "1 · Avoid",
        points: [
          "Design or plan the impact out entirely — the best and cheapest option.",
          "Examples: reroute a haul road away from a stream; reschedule noisy work away from prayer times.",
        ],
      },
      {
        title: "2 · Minimise",
        points: [
          "Reduce what you can't avoid.",
          "Examples: dust suppression, noise barriers, speed limits, PPE, containment.",
        ],
      },
      {
        title: "3 · Restore / Remediate",
        points: [
          "Repair the damage that still occurs.",
          "Examples: rehabilitate borrow pits, replant cleared areas, clean up a spill.",
        ],
      },
      {
        title: "4 · Offset",
        points: [
          "Compensate for the residual impact that remains — the last resort.",
          "Examples: biodiversity offset elsewhere, community compensation.",
        ],
      },
    ],
    relatedModules: ["m1"],
  },

  "ifc-equator-reference": {
    title: "ESG Standards Foundation Reference",
    org: "Module 2 · IFC Performance Standards & Equator Principles",
    accent: "#f59e0b",
    image: "/images/lm1.jpg",
    intro:
      "Every PPP construction project sits inside a regulatory framework with two layers: Nigerian law, and the international standards that lenders require on top. This reference explains that framework, walks through all eight IFC Performance Standards with a real example for each, shows how the Equator Principles categorise a project, and finishes with a short practice exercise.",
    sections: [
      {
        title: "The framework at a glance",
        body: [
          "Two rulebooks apply to our projects at the same time. Nigerian law (the EIA Act, NESREA and the permit system) sets the legal minimum. On top of that, because our projects are financed by banks, the lenders require international standards — the IFC Performance Standards, applied through the Equator Principles.",
          "The chart below shows how these two layers stack up, and the rule that decides which one wins when they differ.",
        ],
      },
      { component: "reg-framework" },
      {
        title: "The IFC Performance Standards — with examples",
        body: "The IFC Performance Standards are eight international benchmarks for managing E&S risk on a financed project. PS1 is the overarching system; PS2–PS8 each cover a specific area. Here is what each one means in plain terms, with a construction example.",
      },
      { component: "ps-cards" },
      {
        title: "The Equator Principles",
        body: [
          "The Equator Principles are the framework the world's major banks use to decide whether to finance a large project, and to monitor it afterwards. Their core requirement is simple: to get the loan, the borrower must meet the IFC Performance Standards.",
          "The first thing a lender does is categorise the project by how much E&S risk it carries — which sets how much assessment and monitoring it will face.",
        ],
      },
      { component: "equator-categories" },
      {
        title: "How it all connects on site",
        points: [
          "The lender categorises the project (A / B / C) and requires the relevant IFC Performance Standards.",
          "An ESIA (Environmental & Social Impact Assessment) identifies the impacts; an ESMP sets the controls.",
          "The IESC monitors performance, and self-monitoring reports prove the standards are being met.",
          "Where Nigerian law and a standard differ, the stricter requirement always applies.",
        ],
      },
      { component: "ps-match" },
    ],
    relatedModules: ["m2", "m3"],
  },

  "nigeria-legal": {
    title: "Nigerian ESG legal register",
    org: "Module 2 · EIA Act, NESREA, permits",
    accent: "#f59e0b",
    image: "/images/lm5.jpg",
    intro:
      "The Nigerian legal baseline for environmental and social performance — the floor every project must clear before international standards are added on top.",
    sections: [
      {
        title: "EIA Act",
        points: [
          "Requires an approved Environmental Impact Assessment before major projects proceed.",
        ],
      },
      {
        title: "NESREA",
        points: [
          "The National Environmental Standards and Regulations Enforcement Agency — sets and enforces environmental standards.",
        ],
      },
      {
        title: "Permits & approvals",
        points: [
          "EIA approval, discharge/effluent permits, waste handling, water abstraction, borrow pits.",
          "Operating outside a permit condition is a breach — and a finding for the IESC.",
        ],
      },
      {
        title: "Land & the stricter-standard rule",
        points: [
          "The Land Use Act governs land acquisition and compensation.",
          "Where Nigerian law and an international standard differ, apply the more protective one.",
        ],
      },
    ],
    relatedModules: ["m2", "m1"],
  },
  "loan-esg-conditions": {
    title: "Loan ESG conditions — summary",
    org: "Module 3 · What the facility agreement asks of the project",
    accent: "#10b981",
    image: "/images/lm2.jpg",
    intro:
      "When lenders finance a project, the loan (facility) agreement carries a set of ESG conditions. This summary explains the main types of condition you will meet, in plain language, and what each one means for the site.",
    sections: [
      {
        title: "Where the conditions come from",
        body: [
          "During the ESDD (the lenders' Environmental & Social Due Diligence), consultants review the project's ESIA, permits, plans and track record against the IFC Performance Standards and Equator Principles.",
          "What the ESDD finds shapes everything: the project's Equator category (A / B / C), the corrective actions in the ESAP, and the conditions written into the loan.",
        ],
        image: "/images/lm1.jpg",
      },
      {
        title: "Conditions precedent (CPs)",
        body: "Actions that must be completed BEFORE money moves — either before signing or before the first disbursement.",
        points: [
          "An approved ESIA and the key environmental permits in place.",
          "The ESMS established, with named ESG/HSE staff.",
          "Priority ESAP actions closed (the 'do this first' list).",
          "A working grievance mechanism for workers and communities.",
        ],
        example:
          "The first drawdown is blocked until the project submits proof that its EIA approval is valid and its grievance mechanism is live. No proof, no funds.",
      },
      {
        title: "Ongoing covenants",
        body: "Promises that apply for the LIFE of the loan — breaking one is a covenant breach.",
        points: [
          "Comply with applicable E&S law AND the IFC Performance Standards (the stricter-standard rule).",
          "Implement the ESMS and the management plans (CESMP, waste, traffic, emergency…).",
          "Deliver the ESAP actions by their deadlines.",
          "Maintain the grievance mechanism and keep engaging affected communities.",
          "Give the IESC access to the site, records and people.",
        ],
      },
      {
        title: "Reporting & notification covenants",
        points: [
          "Submit self-monitoring reports on schedule (monthly or quarterly).",
          "Notify lenders of serious incidents — a fatality, a major spill, a community conflict — within a fixed short deadline (often 24–48 hours).",
          "Report honestly: an incident found later by the IESC is far more damaging than one reported on time.",
        ],
        example:
          "A fuel truck overturns and spills near a stream. The covenant requires notification within 48 hours — the site reports it the same day, with the containment actions taken. Trust preserved.",
      },
      {
        title: "What happens on a breach",
        points: [
          "Step 1 — the lenders ask for a corrective action plan with deadlines (often added to the ESAP).",
          "Step 2 — disbursements can be withheld until the actions close.",
          "Step 3 — persistent or serious failure can become an event of default: the loan can be called in.",
          "At every step, transparency and fast corrective action are what bring the project back.",
        ],
        image: "/images/esg-pollution.jpg",
      },
    ],
    relatedModules: ["m3", "m2", "m5"],
  },
  "esap-template": {
    title: "ESAP — Environmental & Social Action Plan",
    org: "Module 3 · Template & guide",
    accent: "#10b981",
    image: "/images/esg-reporting.jpg",
    intro:
      "The ESAP is the project's fix-it list: every gap the ESDD found, turned into a concrete action with an owner, a deadline and evidence of completion. It is agreed with the lenders and usually annexed to the loan agreement — which makes it binding.",
    sections: [
      {
        title: "The columns every ESAP has",
        points: [
          "# — action ID, so everyone refers to the same item.",
          "Action — what must be done, written so completion can be verified.",
          "Reference — the standard it serves (e.g. IFC PS2, PS4) or the ESDD finding.",
          "Responsible — ONE named owner (a role, not a committee).",
          "Deadline — a date, or a milestone ('before first drawdown', 'before earthworks').",
          "Status — open / in progress / completed / overdue.",
          "Evidence — the proof: a record, a photo, a report the IESC can check.",
        ],
      },
      {
        title: "Example rows",
        body: "Three typical ESAP actions, the way they would actually be written:",
        points: [
          "#04 · Recruit and appoint a site GBVSH focal point (PS2) — HR Manager — before mobilisation — Evidence: appointment letter + training record.",
          "#11 · Install bunding and spill kits at all fuel storage areas (PS3) — Site Manager — within 60 days — Evidence: photos + inspection checklist.",
          "#17 · Establish the community grievance mechanism and publicise it in local languages (PS1/PS4) — Community Relations — before first disbursement — Evidence: procedure, register, awareness materials.",
        ],
        example:
          "Notice the pattern: verifiable action + one owner + a real deadline + named evidence. 'Improve safety culture' is not an ESAP action; 'deliver induction training to 100% of workers by 30 June, evidenced by signed registers' is.",
      },
      {
        title: "How the ESAP lives during the project",
        points: [
          "Reviewed at every reporting period — each action's status is updated in the self-monitoring report.",
          "Verified by the IESC on site visits — evidence is checked, not just claimed.",
          "New actions can be added after incidents, audits or IESC findings.",
          "An action is only closed when the EVIDENCE exists — not when the work is merely promised.",
        ],
        image: "/images/lm4.jpg",
      },
      {
        title: "Golden rules",
        points: [
          "One owner per action — shared ownership means no ownership.",
          "Deadlines tied to project milestones beat calendar dates that slip.",
          "Keep the evidence as you go; reconstructing it later is painful.",
          "An overdue action flagged early, with a recovery plan, is manageable. A hidden one is a trust problem.",
        ],
      },
    ],
    relatedModules: ["m3", "m4", "m5"],
  },
  "self-monitoring-template": {
    title: "Self-monitoring report — template & guide",
    org: "Module 3 · What goes in, who reads it",
    accent: "#10b981",
    image: "/images/lm8.jpg",
    intro:
      "The self-monitoring report is the project's regular account of its own ESG performance, sent to the lenders and verified by the IESC. It is the main channel through which site reality reaches the people financing the work.",
    sections: [
      {
        title: "The standard structure",
        points: [
          "1 · Period & summary — the reporting month/quarter and the headlines, good and bad.",
          "2 · KPIs — safety (LTIFR, near-misses), environment (spills, waste, water), social (grievances raised/closed, local employment, training hours). See Module 5.",
          "3 · Incidents & near-misses — what happened, root cause, corrective action, status.",
          "4 · Grievances — new, open and closed, with resolution times.",
          "5 · ESAP progress — status of every action, evidence attached.",
          "6 · Permits & compliance — permit status, inspections, any non-compliances.",
          "7 · Training & engagement — inductions, toolbox talks, community meetings held.",
          "8 · Photos & annexes — the visual evidence trail.",
        ],
      },
      {
        title: "The golden rules",
        points: [
          "Honest — report the bad month. A concealed incident found by the IESC costs far more than the incident itself.",
          "On time — a late report is itself a covenant issue.",
          "Evidence-backed — every number traceable to a register, checklist or record.",
          "Consistent — same definitions every period, so trends are real (Module 5: garbage in, garbage out).",
        ],
        example:
          "A report states 'zero incidents' for a period in which the IESC later finds an unreported lost-time injury. Result: every other number in every past report is now in doubt — and disbursements pause while everything is re-verified.",
      },
      {
        title: "Who does what",
        points: [
          "Site teams — collect the raw data daily (VHSE forms, registers, checklists).",
          "ESG/HSE manager — compiles, checks and owns the report.",
          "Project director — signs it off; accountability sits at the top.",
          "Lenders & IESC — review it against the loan's ESG conditions and the ESAP.",
        ],
        image: "/images/lm4.jpg",
      },
      {
        title: "A reviewer's eye",
        body: "Lenders read reports the way you should write them: they scan the KPI trends first, then check whether incidents match the narrative, then verify ESAP deadlines. A report that acknowledges problems and shows the corrective path builds MORE confidence than one that is suspiciously perfect.",
      },
    ],
    relatedModules: ["m3", "m5", "m4"],
  },
  "kpi-sources": {
    title: "KPI sources — VHSE form, HSE report, HR workbook",
    org: "Module 5 · Where every number is born",
    accent: "#3b82f6",
    image: "/images/lm4.jpg",
    intro:
      "Every KPI on the dashboard starts life as an entry on a site form. This guide maps the main data sources: what each one captures, who fills it in, and how often. If the form is wrong, every number downstream is wrong.",
    sections: [
      {
        title: "The VHSE form — the daily pulse",
        body: "The Vehicle/HSE daily and weekly forms are the site's heartbeat. Filled in by supervisors at the workface.",
        points: [
          "Hours worked (the denominator of LTIFR and TRIR — get this wrong and every rate is wrong).",
          "Incidents and near-misses, however small.",
          "Inspections carried out, unsafe conditions found and fixed.",
          "Vehicle and plant checks, PPE compliance.",
        ],
        example:
          "A supervisor logs '2 near-misses at the culvert crossing' on Tuesday's VHSE form. By month-end that entry is part of the near-miss KPI, has triggered a toolbox talk, and appears — anonymised — in the lenders' report. One form entry, three uses.",
      },
      {
        title: "The HSE report — incidents & environment",
        points: [
          "Incident investigations — what happened, root cause, corrective action, closure evidence.",
          "Emergency drills — held, attendance, lessons.",
          "Environmental logs — spills (number & volume), waste by type and licensed destination, water abstraction, dust/noise monitoring.",
          "Permit inspections and any non-compliances.",
        ],
      },
      {
        title: "The HR workbook — the people numbers",
        points: [
          "Headcount by category — direct, subcontracted, and where they're from.",
          "Local employment % (the ≥50% target lives here) and female participation %.",
          "Training registers — inductions, toolbox talks, role-specific training hours.",
          "Working hours compliance — the 48+12 cap and rest days (Module 4).",
        ],
      },
      {
        title: "The grievance register",
        points: [
          "Every complaint — from workers or the community — with date received, description, owner.",
          "Action taken, date closed, and whether closed within the target window.",
          "Feeds the grievance KPIs: received, closed on time, average days to close.",
        ],
      },
      {
        title: "Rules of the source",
        points: [
          "Record it when it happens — reconstructed data is guessed data.",
          "One definition per field — a 'near-miss' must mean the same thing on every crew.",
          "Keep the paper (or the app record) — the IESC audits sources, not summaries.",
        ],
        image: "/images/lm5.jpg",
      },
    ],
    relatedModules: ["m5", "m4", "m3"],
  },
  "kpi-definitions": {
    title: "KPI definitions & targets",
    org: "Module 5 · The dictionary of the dashboard",
    accent: "#3b82f6",
    image: "/images/lm8.jpg",
    intro:
      "A KPI is only useful if everyone calculates it the same way. This register defines the core ESG KPIs, how each is computed, and a typical target. (Targets shown are illustrative — each project agrees its own with the lenders.)",
    sections: [
      {
        title: "Safety KPIs",
        points: [
          "LTIFR — lost-time injuries × 1,000,000 ÷ hours worked. Typical target: < 1.0.",
          "TRIR — all recordable injuries × 1,000,000 ÷ hours worked. Trends matter more than the level.",
          "Near-misses reported — count per month. Target: HIGH and rising is healthy (people are reporting).",
          "Toolbox talks held — count vs plan. Target: 100% of plan.",
          "Emergency drills — held vs scheduled. Target: 100%.",
        ],
        example:
          "500,000 hours worked this quarter, 1 lost-time injury → LTIFR = 2.0. Against a target of < 1.0 that's red: the report must explain the injury, the root cause, and the fix.",
      },
      {
        title: "Environmental KPIs",
        points: [
          "Spills — number and volume, by severity; target: zero significant spills.",
          "Waste — tonnes by type, % to licensed disposal; target: 100% licensed.",
          "Water use — m³ abstracted vs permit limit; target: within permit, always.",
          "Dust/noise complaints — count; target: falling trend, all responded to.",
        ],
      },
      {
        title: "Social KPIs",
        points: [
          "Grievances received — count. Zero usually means the mechanism isn't trusted.",
          "Grievances closed on time — % closed within the window (e.g. 30 days). Target: ≥ 90%.",
          "Local employment — % of workforce from host communities. Target: ≥ 50%.",
          "Female participation — % of workforce. Target: agreed per project, trending up.",
          "Training hours — per worker per month, from the HR workbook.",
        ],
      },
      {
        title: "Compliance KPIs",
        points: [
          "Permits valid — all required permits current. Target: 100%, no exceptions.",
          "ESAP actions closed by deadline — %. Target: 100%; every overdue action explained.",
          "Audit findings — open vs closed, aging. Target: none older than the agreed window.",
        ],
      },
      {
        title: "Reading the dashboard",
        points: [
          "Green = on target · Amber = watch, explain in the report · Red = act now, tell the lenders first.",
          "Compare against the trend, not just the target — three ambers in a row is a red.",
          "Every red number in a report should sit next to its corrective action.",
        ],
        image: "/images/esg-reporting.jpg",
      },
    ],
    relatedModules: ["m5", "m3"],
  },
  "raci-matrix": {
    title: "RACI matrix — ESG responsibilities",
    org: "Module 4 · Who does what, and who answers for it",
    accent: "#8b5cf6",
    image: "/images/lm4.jpg",
    intro:
      "A RACI chart removes the most dangerous phrase on a site: 'I thought someone else was handling it.' For every ESG activity it names who is Responsible, Accountable, Consulted and Informed — one letter per person, one A per row.",
    sections: [
      {
        title: "The four letters",
        points: [
          "R — Responsible: does the work. There can be several Rs.",
          "A — Accountable: owns the outcome and answers for it. Exactly ONE per activity.",
          "C — Consulted: gives input before the decision (two-way).",
          "I — Informed: told after the fact (one-way).",
        ],
      },
      {
        title: "A typical ESG RACI",
        body: "Illustrative rows for a construction project (each project tailors its own):",
        points: [
          "ESG policy & objectives — A: Managing Director · R: ESG/HSE Manager · C: Project Directors · I: all staff.",
          "Environmental permits — A: Project Director · R: ESG/HSE Manager · C: consultants · I: lenders.",
          "Daily site inspections — A: Site Manager · R: HSE Supervisors · C: foremen · I: ESG/HSE Manager.",
          "Grievance handling — A: ESG/HSE Manager · R: Community Relations Officer · C: HR · I: Project Director.",
          "Subcontractor ESG compliance — A: Project Director · R: HSE Unit + contract managers · C: procurement · I: lenders via reports.",
          "Self-monitoring report — A: Project Director (signs) · R: ESG/HSE Manager (compiles) · C: site teams · I: lenders & IESC.",
        ],
        example:
          "Note the pattern: accountability climbs (Director level), responsibility sits with the specialist who does the work, and the lenders appear as Informed — through the reports of Module 3.",
      },
      {
        title: "Rules that make a RACI work",
        points: [
          "Exactly one A per row — two owners is no owner.",
          "Every worker appears somewhere: ESG is everyone's job (Module 1), and the RACI shows each person their part.",
          "Review it when people change — a RACI naming someone who left is a gap, not a chart.",
          "Top management holds the ultimate A: accountability sits at the top (Module 4).",
        ],
        image: "/images/esg-governance.jpg",
      },
    ],
    relatedModules: ["m4", "m1"],
  },
  "grievance-procedure": {
    title: "Grievance mechanism procedure",
    org: "Module 4 · How a concern becomes a resolution",
    accent: "#8b5cf6",
    image: "/images/esg-social.jpg",
    intro:
      "The grievance mechanism is the project's safety valve: a safe, known, free way for any worker or community member to raise a concern and have it answered. Its two non-negotiables come straight from the policy suite: confidentiality, and zero retaliation.",
    sections: [
      {
        title: "Who can use it, and how",
        points: [
          "Anyone — workers (direct or subcontracted), community members, suppliers.",
          "Channels: grievance boxes on site, email, phone, in person to the Community Relations Officer — or anonymously.",
          "In appropriate local languages, publicised where people actually see it.",
          "Free to use, and usable without fear: retaliation against anyone who reports in good faith is strictly prohibited.",
        ],
      },
      {
        title: "The six steps",
        points: [
          "1 · Receive & register — every grievance is logged with a date and reference number, whoever it comes from.",
          "2 · Acknowledge — the person is told it was received, and by when to expect an answer.",
          "3 · Investigate — the owner looks into the facts; serious cases (GBVSH, safety) escalate immediately.",
          "4 · Resolve & respond — action is taken and explained to the person who raised it.",
          "5 · Close — with the person's acknowledgement where possible, inside the target window (e.g. 30 days).",
          "6 · Learn — trends feed the KPIs (Module 5) and the management review (Module 4).",
        ],
        example:
          "A villager reports trucks speeding through the market at school closing time. Registered Monday, acknowledged Tuesday, investigated with the traffic plan that week — speed limits enforced, a flagman posted, response delivered, closed in 12 days. The trend ('traffic complaints') appears in the month's KPIs.",
      },
      {
        title: "Special cases",
        points: [
          "GBVSH — confidential channels, survivor support, immediate escalation to the focal point (never handled informally).",
          "Whistleblowing (bribery, fraud) — may go directly to top management; whistleblowers are protected.",
          "Subcontractor workers — must be able to use the project mechanism, not only their employer's.",
        ],
      },
      {
        title: "What good looks like",
        points: [
          "Grievances ARRIVE — zero received usually means zero trust, not zero problems.",
          "Closed on time — ≥ 90% within the window is a typical target.",
          "No retaliation, ever — one retaliation destroys years of trust.",
          "Reported honestly to lenders — grievance numbers are a standing KPI in the self-monitoring report.",
        ],
        image: "/images/lm8.jpg",
      },
    ],
    relatedModules: ["m4", "m5", "m1"],
  },
  "subcontractor-esg": {
    title: "Subcontractor ESG requirements",
    org: "Module 4 · The same standards, flowed down the chain",
    accent: "#8b5cf6",
    image: "/images/lm2.jpg",
    intro:
      "Much of the work on a construction project is done by subcontractors — but responsibility is not subcontracted with it. The main contractor answers to the lenders for everything that happens on site, so its ESG standards flow down the chain through contracts, training and audits.",
    sections: [
      {
        title: "Before they start",
        points: [
          "Signed Subcontractor Agreement — E&S, HSE, labour and grievance obligations written into the contract.",
          "Suppliers sign the Supplier Code of Conduct — ethical sourcing, fair labour, road safety.",
          "Due diligence & screening — counterparties checked (including against sanctions lists) before onboarding.",
          "HSE induction for every subcontracted worker before their first shift.",
        ],
      },
      {
        title: "The standing requirements",
        points: [
          "Local hiring — target at least 50% local employment, with commitments to female participation.",
          "Formal employment — all workers registered for social security, fairly paid, given PPE.",
          "An appointed HSE Supervisor, daily toolbox talks, risk assessments and safety reporting.",
          "Their own grievance mechanism, cooperating with the project-level one.",
          "HSE documentation delivered to the main contractor's HSE unit.",
        ],
        example:
          "A subcontractor mobilises 40 workers for earthworks. Before day one: contract signed, all 40 inducted and issued PPE, an HSE supervisor named, 22 of the 40 hired from the host community. That is the standard working normally.",
      },
      {
        title: "Checking and enforcement",
        points: [
          "Routine inspections, document reviews and audits by the main contractor.",
          "Non-conformances must be closed within set deadlines.",
          "Repeated failure → penalties or contract termination.",
          "Remember Module 1: a subcontractor's conduct is the main contractor's responsibility — there is no 'their problem' on a financed project.",
        ],
        image: "/images/lm4.jpg",
      },
    ],
    relatedModules: ["m4", "m1", "m3"],
  },
};

// Per-module question banks, keyed by module id. Each question:
// { tag, prompt, options[4], correct (index), tip (shown after answering) }.
export const quizzes = {
  "m1": {
    "passMark": 0.8,
    "questions": [
      {
        "tag": "Basics",
        "prompt": "True or false: ESG stands for Environmental, Social and Governance.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "E = Environmental, S = Social, G = Governance."
      },
      {
        "tag": "Pillars",
        "image": "/images/esg-governance.jpg",
        "prompt": "Which ESG pillar covers ethics and anti-corruption?",
        "options": [
          "Governance",
          "Environmental",
          "Social",
          "Financial"
        ],
        "correct": 0,
        "tip": "How the business is run — ethics, anti-corruption, oversight — is Governance."
      },
      {
        "tag": "Social",
        "prompt": "Which of these is a SOCIAL impact?",
        "options": [
          "Worker-camp conditions",
          "Dust emissions",
          "Soil erosion",
          "Concrete washout"
        ],
        "correct": 0,
        "tip": "Worker conditions affect people — a social impact."
      },
      {
        "tag": "Environmental",
        "prompt": "The environmental footprint includes all of these EXCEPT:",
        "options": [
          "Bribery",
          "Air",
          "Water",
          "Waste"
        ],
        "correct": 0,
        "tip": "Bribery is a governance issue, not an environmental footprint."
      },
      {
        "tag": "Subcontractors",
        "prompt": "True or false: a subcontractor's conduct on site is the contractor’s responsibility.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "Their conduct is flowed down to the contractor."
      },
      {
        "tag": "Stakeholders",
        "prompt": "A 'stakeholder' is…",
        "options": [
          "Anyone affected by, or who can affect, the project",
          "Only the shareholders",
          "Only the government",
          "Only the workers"
        ],
        "correct": 0,
        "tip": "Stakeholders include workers, communities, lenders, regulators and more."
      },
      {
        "tag": "Mitigation",
        "image": "/images/lm4.jpg",
        "prompt": "What is the FIRST step of the mitigation hierarchy?",
        "options": [
          "Avoid",
          "Offset",
          "Restore",
          "Minimise"
        ],
        "correct": 0,
        "tip": "Always try to avoid the impact first."
      },
      {
        "tag": "Mitigation",
        "difficulty": "medium",
        "prompt": "'Offset' in the mitigation hierarchy is…",
        "options": [
          "The last resort for residual impacts",
          "The first thing to try",
          "A type of permit",
          "A KPI"
        ],
        "correct": 0,
        "tip": "You only offset what you couldn't avoid, minimise or restore."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "prompt": "Which of these are ENVIRONMENTAL impacts?",
        "options": [
          "Dust",
          "Effluent to a stream",
          "Unpaid wages",
          "Clearing habitat"
        ],
        "correct": [
          0,
          1,
          3
        ],
        "tip": "Unpaid wages is a social/labour impact."
      },
      {
        "tag": "Vulnerable",
        "prompt": "Vulnerable groups need…",
        "options": [
          "Extra care, as they are least able to cope",
          "No special attention",
          "To be excluded",
          "Higher wages than others"
        ],
        "correct": 0,
        "tip": "Impacts hit vulnerable groups hardest."
      },
      {
        "tag": "Community",
        "image": "/images/esg-social.jpg",
        "prompt": "The people who live around a site and feel its impacts are the…",
        "options": [
          "Host community",
          "Lenders",
          "Regulators",
          "Shareholders"
        ],
        "correct": 0,
        "tip": "The host community lives with the project every day."
      },
      {
        "tag": "Benefits",
        "prompt": "True or false: good ESG can help the contractor win future work.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "Reputation and a clean ESG record win bids."
      },
      {
        "tag": "On site",
        "prompt": "Noise and traffic disturbing neighbours is mainly a…",
        "options": [
          "Social / community impact",
          "Governance issue",
          "Financial risk",
          "Cultural heritage issue"
        ],
        "correct": 0,
        "tip": "It affects the surrounding people — social."
      },
      {
        "tag": "Everyone",
        "image": "/images/lm13.jpg",
        "prompt": "Whose job is ESG on site?",
        "options": [
          "Everyone's",
          "Only the ESG team's",
          "Only management's",
          "Only the lender's"
        ],
        "correct": 0,
        "tip": "Every role owns a piece of ESG."
      },
      {
        "tag": "Basics",
        "prompt": "What does “ESG” stand for?",
        "options": [
          "Environmental, Social and Governance",
          "Engineering, Safety and Growth",
          "Energy, Sustainability and Green",
          "Ethics, Standards and Guidance"
        ],
        "correct": 0,
        "tip": "ESG = Environmental, Social and Governance. On site, the Environmental and Social pillars are the ones you meet most."
      },
      {
        "tag": "Environmental",
        "image": "/images/esg-pollution.jpg",
        "prompt": "Which of these is an ENVIRONMENTAL impact on a construction site?",
        "options": [
          "Dust from earthworks and haulage",
          "Unpaid overtime",
          "A land-compensation dispute",
          "Harassment at the worker camp"
        ],
        "correct": 0,
        "tip": "Dust affects air quality — an environmental impact. The others are social impacts."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Put the mitigation hierarchy in the correct order — most preferred first.",
        "items": [
          "Avoid",
          "Minimise",
          "Restore",
          "Offset"
        ],
        "hint": "Think: don't cause it → shrink what's left → repair the damage → compensate only as a last resort.",
        "tip": "Always try to avoid the impact first; offsetting is the last resort."
      },
      {
        "tag": "Water",
        "difficulty": "medium",
        "prompt": "Concrete washout, camp wastewater and sediment run-off mainly threaten…",
        "options": [
          "Water",
          "Air",
          "Biodiversity only",
          "Cultural heritage"
        ],
        "correct": 0,
        "tip": "These are effluents that pollute water if they are not controlled."
      },
      {
        "tag": "Mitigation hierarchy",
        "difficulty": "hard",
        "prompt": "What is the correct order of the mitigation hierarchy?",
        "options": [
          "Avoid → Minimise → Restore → Offset",
          "Offset → Restore → Minimise → Avoid",
          "Minimise → Avoid → Offset → Restore",
          "Restore → Avoid → Offset → Minimise"
        ],
        "correct": 0,
        "tip": "Always try to avoid first; offsetting is the last resort."
      },
      {
        "tag": "Stakeholders",
        "prompt": "“Vulnerable groups” are best described as…",
        "options": [
          "People least able to cope with impacts, who need special attention",
          "The project's senior managers",
          "The lenders financing the project",
          "The largest subcontractors"
        ],
        "correct": 0,
        "tip": "Vulnerable groups need particular care because impacts hit them hardest."
      },
      {
        "tag": "Footprint",
        "type": "multi",
        "prompt": "Which of these are ENVIRONMENTAL impacts?",
        "options": [
          "Dust from haulage",
          "Concrete washout into a stream",
          "Unfair dismissal of a worker",
          "Clearing vegetation"
        ],
        "correct": [
          0,
          1,
          3
        ],
        "tip": "Dust, effluent and vegetation clearing are environmental. Unfair dismissal is a social impact."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the definition of ESG.",
        "segments": [
          "ESG stands for ",
          {
            "options": [
              "Environmental",
              "Engineering"
            ],
            "correct": 0
          },
          ", ",
          {
            "options": [
              "Social",
              "Safety"
            ],
            "correct": 0
          },
          " and ",
          {
            "options": [
              "Governance",
              "Growth"
            ],
            "correct": 0
          },
          "."
        ],
        "hint": "Think about the planet, people, and how the business is run.",
        "tip": "ESG = Environmental, Social and Governance."
      },
      {
        "type": "hotspot",
        "tag": "Spot it",
        "prompt": "Tap the spot showing an ENVIRONMENTAL (air) impact on this site.",
        "image": "/images/lm4.jpg",
        "zones": [
          {
            "x": 26,
            "y": 34,
            "label": "Dust from earthworks",
            "correct": true
          },
          {
            "x": 47,
            "y": 68,
            "label": "Workers near plant (social)"
          },
          {
            "x": 82,
            "y": 58,
            "label": "Community edge (social)"
          }
        ],
        "hint": "Air quality is an environmental impact — look for dust.",
        "tip": "Dust from earthworks harms air quality — an environmental impact."
      },
      {
        "tag": "Solve it",
        "image": "/images/esg-pollution.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: dust from your haul trucks is drifting over the homes along this road. Applying the mitigation hierarchy, what do you consider FIRST?",
        "options": [
          "Whether the haul route can avoid the homes entirely",
          "Offering compensation to the residents",
          "Planting trees somewhere else as an offset",
          "Nothing — dust is normal on projects"
        ],
        "correct": 0,
        "hint": "The hierarchy has a fixed order — which step comes before all others?",
        "tip": "AVOID comes first: can the route bypass the homes? Only then minimise (wet the road, slow the trucks), restore, and offset last."
      },
      {
        "tag": "Solve it",
        "image": "/images/esg-social.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: community members walk this route daily — the same road your trucks now use. What is the right response?",
        "options": [
          "Speed limits, flagmen and community engagement about safe timings",
          "Keep normal truck speeds — schedule is priority",
          "Ban residents from using the road",
          "Wait until an accident happens, then react"
        ],
        "correct": 0,
        "hint": "Minimise the risk AND talk to the people affected.",
        "tip": "Community health & safety: control the hazard (speed, flagmen, timings) and engage the community — never shift the burden onto them."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "You notice a leaking fuel drum on site. Put your response in the right order.",
        "items": [
          "Spot — notice the leak",
          "Report — raise it through site channels",
          "Mitigate — contain it with the spill kit",
          "Share — the lesson goes into the toolbox talk"
        ],
        "hint": "It's the 'everyone's job' routine from the lesson: see it, say it, sort it, spread it.",
        "tip": "Spot → Report → Mitigate → Share: every worker's ESG routine."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the stakeholder rule.",
        "segments": [
          "A ",
          {
            "options": [
              "stakeholder",
              "shareholder"
            ],
            "correct": 0
          },
          " is anyone affected by the project, and ",
          {
            "options": [
              "vulnerable",
              "wealthy"
            ],
            "correct": 0
          },
          " groups need special attention because impacts hit them hardest."
        ],
        "hint": "Think about who feels the project — and who can cope least.",
        "tip": "Stakeholders = anyone affected or able to affect the project; vulnerable groups are least able to cope."
      },
      {
        "type": "categorize",
        "tag": "Puzzle",
        "prompt": "Sort each impact: Environmental or Social?",
        "categories": [
          {
            "id": "env",
            "label": "Environmental"
          },
          {
            "id": "soc",
            "label": "Social"
          }
        ],
        "items": [
          {
            "text": "Fuel spill into the soil",
            "cat": "env"
          },
          {
            "text": "A land-compensation dispute",
            "cat": "soc"
          },
          {
            "text": "Generator exhaust fumes",
            "cat": "env"
          },
          {
            "text": "In-migration pressure on the village",
            "cat": "soc"
          }
        ],
        "hint": "Nature = environmental; people = social.",
        "tip": "Spills and fumes hit the environment; land disputes and in-migration hit people."
      },
      {
        "type": "diagramtap",
        "tag": "Tap the diagram",
        "prompt": "The mitigation hierarchy. Tap the step where you COMPENSATE for what could not be prevented or repaired.",
        "boxes": [
          "Avoid",
          "Minimise",
          "Restore",
          "Offset"
        ],
        "correct": 3,
        "hint": "It's the last resort.",
        "tip": "Offset = compensating for residual impacts — always the final step, never the first."
      },
      {
        "type": "connect",
        "tag": "Link them",
        "prompt": "Link each ESG pillar to its example.",
        "pairs": [
          {
            "l": "Environmental",
            "r": "Concrete washout reaching a stream"
          },
          {
            "l": "Social",
            "r": "Worker-camp living conditions"
          },
          {
            "l": "Governance",
            "r": "Refusing a facilitation payment"
          }
        ],
        "hint": "Nature, people, honest business — in that order.",
        "tip": "E = the stream, S = the workers, G = the ethics."
      }
    ]
  },
  "m2": {
    "passMark": 0.8,
    "questions": [
      {
        "tag": "Two layers",
        "prompt": "True or false: Nigerian law is the maximum standard the contractor has to meet.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "tip": "Local law is the minimum (the floor); lenders require international standards on top."
      },
      {
        "tag": "IFC",
        "prompt": "PS8 concerns…",
        "options": [
          "Cultural Heritage",
          "Labour",
          "Water use",
          "Financing"
        ],
        "correct": 0,
        "tip": "PS8 — Cultural Heritage, incl. chance-find procedures."
      },
      {
        "tag": "IFC",
        "difficulty": "hard",
        "prompt": "FPIC — central to PS7 — stands for…",
        "options": [
          "Free, Prior and Informed Consent",
          "Final Project Inspection Certificate",
          "Fixed Price Import Contract",
          "Formal Public Investment Clause"
        ],
        "correct": 0,
        "tip": "FPIC applies to Indigenous Peoples (PS7)."
      },
      {
        "tag": "Nigeria",
        "image": "/images/lm5.jpg",
        "prompt": "NESREA's role is to…",
        "options": [
          "Set and enforce environmental standards",
          "Supply electricity",
          "Regulate banks",
          "Build roads"
        ],
        "correct": 0,
        "tip": "NESREA is the environmental enforcement agency."
      },
      {
        "tag": "Nigeria",
        "image": "/images/esg-environment.jpg",
        "prompt": "The EIA Act requires…",
        "options": [
          "An approved EIA before major works begin",
          "A tax return",
          "A marketing plan",
          "A dividend policy"
        ],
        "correct": 0,
        "tip": "An approved EIA is a precondition for major projects."
      },
      {
        "tag": "Equator",
        "prompt": "Equator Principles Category A means…",
        "options": [
          "High, diverse or irreversible risk",
          "No risk",
          "Medium risk",
          "Purely financial risk"
        ],
        "correct": 0,
        "tip": "A = highest E&S risk."
      },
      {
        "tag": "Equator",
        "prompt": "Category C projects have…",
        "options": [
          "Minimal or no adverse impact",
          "The highest risk",
          "Medium risk",
          "Unknown risk"
        ],
        "correct": 0,
        "tip": "C = minimal/no impact."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "prompt": "Which of these are Nigerian legal instruments/bodies?",
        "options": [
          "EIA Act",
          "NESREA",
          "IFC Performance Standards",
          "Land Use Act"
        ],
        "correct": [
          0,
          1,
          3
        ],
        "tip": "IFC PS is international, not Nigerian law."
      },
      {
        "tag": "Stricter rule",
        "prompt": "True or false: when local law and an international standard conflict, the contractor follows the cheaper option.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "tip": "You apply the stricter, more protective requirement."
      },
      {
        "tag": "Equator",
        "prompt": "The Equator Principles are used by…",
        "options": [
          "Banks, to assess and monitor project finance",
          "Road contractors, to price jobs",
          "Tax authorities",
          "Insurers only"
        ],
        "correct": 0,
        "tip": "They are a lender framework."
      },
      {
        "tag": "IFC",
        "difficulty": "medium",
        "prompt": "PS3 is about…",
        "options": [
          "Resource Efficiency & Pollution Prevention",
          "Cultural Heritage",
          "Indigenous Peoples",
          "Labour"
        ],
        "correct": 0,
        "tip": "PS3 — pollution prevention, resources, emissions."
      },
      {
        "tag": "Nigeria",
        "prompt": "Which Nigerian law requires an approved Environmental Impact Assessment before a major project proceeds?",
        "options": [
          "The EIA Act",
          "The Land Use Act",
          "The Finance Act",
          "The Evidence Act"
        ],
        "correct": 0,
        "tip": "The EIA Act makes an approved EIA a precondition for major projects."
      },
      {
        "tag": "Regulator",
        "prompt": "NESREA is Nigeria's…",
        "options": [
          "Environmental standards & regulations enforcement agency",
          "National power utility",
          "Stock-market regulator",
          "Road-safety corps"
        ],
        "correct": 0,
        "tip": "NESREA sets and enforces environmental standards."
      },
      {
        "tag": "International",
        "image": "/images/lm2.jpg",
        "prompt": "The IFC Performance Standards are…",
        "options": [
          "The international benchmark for managing ESG risk on financed projects",
          "A Nigerian tax code",
          "An accounting standard",
          "A trade-union charter"
        ],
        "correct": 0,
        "tip": "There are eight IFC PS — the global reference for financed projects."
      },
      {
        "tag": "Equator",
        "prompt": "Under the Equator Principles, lenders categorise a project by…",
        "options": [
          "Its level of ESG risk (A / B / C)",
          "Its loan size only",
          "The borrower's age",
          "The time of year"
        ],
        "correct": 0,
        "tip": "Category A = highest risk, C = minimal — it reflects ESG risk, not money."
      },
      {
        "tag": "Stricter rule",
        "prompt": "When Nigerian law and an international standard differ, the contractor applies…",
        "options": [
          "The stricter, more protective requirement",
          "Whichever is cheaper",
          "Only local law",
          "Neither"
        ],
        "correct": 0,
        "tip": "Lenders require the more stringent standard to be met."
      },
      {
        "tag": "PS",
        "prompt": "Which is one of the eight IFC Performance Standards?",
        "options": [
          "Labour & Working Conditions",
          "Corporate Tax Planning",
          "Advertising Standards",
          "Shareholder Dividends"
        ],
        "correct": 0,
        "tip": "PS2 is Labour & Working Conditions — the others aren't IFC PS."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Order the assessment process on a project.",
        "items": [
          "Assess the impacts (ESIA)",
          "Set the controls (ESMP)",
          "Monitor performance",
          "Report to the lender"
        ],
        "hint": "You can't control what you haven't assessed, and you can't report what you haven't monitored.",
        "tip": "Assess → control → monitor → report."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the stricter-standard rule.",
        "segments": [
          "Where local law and an international standard differ, the contractor applies the ",
          {
            "options": [
              "stricter",
              "cheaper"
            ],
            "correct": 0
          },
          " requirement — usually the ",
          {
            "options": [
              "international",
              "local"
            ],
            "correct": 0
          },
          " standard."
        ],
        "hint": "Lenders always want the more protective option.",
        "tip": "Apply the stricter, more protective requirement — usually the international standard."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm3.jpg",
        "difficulty": "hard",
        "prompt": "SOLVE THE CASE: during excavation on this building site, workers uncover old pottery and carved stones. What applies, and what do you do?",
        "options": [
          "PS8 chance-find: stop work at that spot, protect the find, notify the authorities",
          "Keep digging — the schedule is tight",
          "PS6 biodiversity: relocate the stones to a forest",
          "Sell the artifacts to fund community projects"
        ],
        "correct": 0,
        "hint": "Cultural heritage has its own Performance Standard — and a fixed procedure for surprises.",
        "tip": "PS8 Cultural Heritage: a chance-find procedure means stop at the spot, protect, and notify — works resume once cleared."
      },
      {
        "tag": "Solve it",
        "image": "/images/esg-environment.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: the road alignment must cross this green corridor. Under PS6, the project's biodiversity goal is…",
        "options": [
          "No net loss — avoid, minimise, then restore or offset habitat",
          "Clear it quickly before anyone objects",
          "Pay a fine and proceed",
          "Biodiversity only matters in national parks"
        ],
        "correct": 0,
        "hint": "Think of the mitigation hierarchy applied to nature.",
        "tip": "PS6 aims for no net loss of biodiversity — the mitigation hierarchy applied to habitats and species."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Put the ESIA journey in the correct order.",
        "items": [
          "Screening — is a full assessment needed?",
          "Baseline studies — measure before works",
          "Impact assessment — predict the changes",
          "Approval — the regulator signs off"
        ],
        "hint": "You can't assess impacts before you know the starting point.",
        "tip": "Screen → baseline → assess → approve: no major works before the ESIA is approved."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the Equator categories.",
        "segments": [
          "Category ",
          {
            "options": [
              "A",
              "C"
            ],
            "correct": 0
          },
          " projects carry the highest ESG risk, while Category ",
          {
            "options": [
              "C",
              "A"
            ],
            "correct": 0
          },
          " projects have minimal or no adverse impacts."
        ],
        "hint": "The alphabet runs from most to least risky.",
        "tip": "A = significant/irreversible risk, B = limited and manageable, C = minimal."
      },
      {
        "type": "hotspot",
        "tag": "Spot it",
        "prompt": "The ESIA baseline team surveys this area. Tap the PROJECT FOOTPRINT itself — the corridor the works will occupy.",
        "image": "/images/lm12.jpg",
        "zones": [
          {
            "x": 47,
            "y": 62,
            "label": "The road corridor",
            "correct": true
          },
          {
            "x": 15,
            "y": 45,
            "label": "Farmland (part of the surroundings studied)"
          },
          {
            "x": 85,
            "y": 30,
            "label": "Distant fields (wider study area)"
          }
        ],
        "hint": "The footprint is the land the works themselves take — the strip being built.",
        "tip": "The corridor is the project footprint; the ESIA studies it AND the surrounding area it affects."
      },
      {
        "type": "categorize",
        "tag": "Puzzle",
        "prompt": "Sort each rule: Nigerian law or international standard?",
        "categories": [
          {
            "id": "ng",
            "label": "Nigerian law"
          },
          {
            "id": "int",
            "label": "International standard"
          }
        ],
        "items": [
          {
            "text": "EIA Act approval",
            "cat": "ng"
          },
          {
            "text": "IFC PS6 no-net-loss of biodiversity",
            "cat": "int"
          },
          {
            "text": "NESREA enforcement notice",
            "cat": "ng"
          },
          {
            "text": "Equator Category A scrutiny",
            "cat": "int"
          }
        ],
        "hint": "Acts and agencies are national; PS and Equator come from the lenders' world.",
        "tip": "The EIA Act and NESREA are the Nigerian floor; IFC PS and Equator are the international bar."
      },
      {
        "type": "diagramtap",
        "tag": "Tap the diagram",
        "prompt": "The ESIA journey. Tap the step where you measure the environment BEFORE any works begin.",
        "boxes": [
          "Screening",
          "Baseline studies",
          "Impact assessment",
          "Approval"
        ],
        "correct": 1,
        "hint": "You need a 'before' picture to predict the changes.",
        "tip": "Baseline studies capture the starting point — air, water, biodiversity, livelihoods — before works."
      },
      {
        "type": "connect",
        "tag": "Link them",
        "prompt": "Link each body or rule to what it does.",
        "pairs": [
          {
            "l": "NESREA",
            "r": "Enforces Nigerian environmental standards"
          },
          {
            "l": "EIA Act",
            "r": "Requires an approved study before major works"
          },
          {
            "l": "IFC PS",
            "r": "The eight lender benchmark standards"
          },
          {
            "l": "Equator Principles",
            "r": "How banks apply the standards to loans"
          }
        ],
        "hint": "Two are Nigerian, two are international.",
        "tip": "NESREA enforces, the EIA Act requires the study, the IFC PS set the bar, Equator applies it to finance."
      }
    ]
  },
  "m3": {
    "passMark": 0.8,
    "questions": [
      {
        "tag": "Why it matters",
        "prompt": "True or false: good ESG performance helps keep loan disbursements flowing.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "Meeting ESG conditions unlocks each disbursement."
      },
      {
        "tag": "Conditions",
        "image": "/images/lm14.jpg",
        "prompt": "'Conditions precedent' are ESG actions completed…",
        "options": [
          "Before the first disbursement",
          "After the loan ends",
          "Only by the lender",
          "Never"
        ],
        "correct": 0,
        "tip": "They must be met before money is released."
      },
      {
        "tag": "Honesty",
        "prompt": "True or false: hiding an incident from the report is safer than reporting it.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "tip": "If the IESC finds it later, trust collapses — report honestly."
      },
      {
        "tag": "Why lenders care",
        "image": "/images/lm2.jpg",
        "prompt": "Lenders build ESG into the loan because…",
        "options": [
          "ESG risk is financial and reputational risk",
          "It is a legal tax",
          "It is charity",
          "There is no reason"
        ],
        "correct": 0,
        "tip": "Poor ESG threatens repayment and reputation."
      },
      {
        "tag": "Reputation",
        "prompt": "Reputational damage from an incident mainly affects…",
        "options": [
          "Future bids and the lender's ESG standing",
          "Nothing",
          "Only the weather",
          "Only payroll"
        ],
        "correct": 0,
        "tip": "A public incident costs future work and trust."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "prompt": "Which can result from a serious ESG failure?",
        "options": [
          "Withheld funds",
          "Covenant breach",
          "Lost future work",
          "A guaranteed pay rise"
        ],
        "correct": [
          0,
          1,
          2
        ],
        "tip": "A pay rise is not a consequence of failure."
      },
      {
        "tag": "Reporting",
        "image": "/images/esg-reporting.jpg",
        "prompt": "ESG performance data reaches lenders mainly through…",
        "options": [
          "Self-monitoring reports",
          "Social media",
          "Rumours",
          "TV adverts"
        ],
        "correct": 0,
        "tip": "Compiled site data → self-monitoring reports."
      },
      {
        "tag": "IESC",
        "prompt": "True or false: the IESC is an internal employee of the contractor.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "tip": "It is INDEPENDENT — it works for the lenders."
      },
      {
        "tag": "Financing",
        "image": "/images/course-hero.jpg",
        "prompt": "A PPP project is…",
        "options": [
          "A public asset built with private financing",
          "A private house",
          "A tax scheme",
          "A charity"
        ],
        "correct": 0,
        "tip": "Public-Private Partnership."
      },
      {
        "tag": "Why lenders care",
        "difficulty": "medium",
        "prompt": "Lenders that follow the Equator Principles require the contractor to meet…",
        "options": [
          "The IFC Performance Standards",
          "Nigerian tax law only",
          "ISO 9001",
          "No ESG rules"
        ],
        "correct": 0,
        "tip": "Equator-Principles banks require borrowers to meet the IFC PS."
      },
      {
        "tag": "IESC",
        "prompt": "An IESC is…",
        "options": [
          "An Independent Environmental & Social Consultant who monitors for the lenders",
          "An internal auditor of the contractor",
          "A government inspector",
          "A subcontractor"
        ],
        "correct": 0,
        "tip": "The IESC checks the contractor’s ESG performance on the lenders' behalf."
      },
      {
        "tag": "ESAP",
        "prompt": "An ESAP is…",
        "options": [
          "An Environmental & Social Action Plan — corrective actions with deadlines",
          "A payment schedule",
          "A marketing plan",
          "A safety poster"
        ],
        "correct": 0,
        "tip": "The ESAP lists what the contractor must fix, and by when."
      },
      {
        "tag": "Monitoring",
        "prompt": "The contractor mainly demonstrates ongoing ESG compliance to lenders through…",
        "options": [
          "Self-monitoring reports, verified by the IESC",
          "Press releases",
          "Social-media posts",
          "Verbal updates"
        ],
        "correct": 0,
        "tip": "Self-monitoring reports feed the KPIs and the lenders' review."
      },
      {
        "tag": "Stakes",
        "prompt": "A serious, unresolved ESG failure can lead to…",
        "options": [
          "Withheld disbursements, covenant breach or loan default",
          "A bonus for the team",
          "Automatic extra funding",
          "No consequences"
        ],
        "correct": 0,
        "tip": "Good ESG management is what keeps the financing flowing."
      },
      {
        "tag": "Honesty",
        "difficulty": "hard",
        "prompt": "The contractor leaves an incident out of the self-monitoring report and the IESC later finds it. The likely result?",
        "options": [
          "Lost credibility and withheld disbursements",
          "A reward for tidy paperwork",
          "Nothing at all",
          "A lower interest rate"
        ],
        "correct": 0,
        "tip": "Transparency is what keeps lender trust — hiding issues is far worse than reporting them."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Order the ESG covenant cycle over the life of the loan.",
        "items": [
          "Appraisal",
          "Conditions precedent",
          "Disbursement",
          "Ongoing monitoring"
        ],
        "hint": "Follow the money: the lender checks first, sets conditions, then releases funds, then keeps watching.",
        "tip": "Assessed up front, conditions met, money released, then monitored throughout."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the financing sentence.",
        "segments": [
          "The ",
          {
            "options": [
              "IESC",
              "IFC"
            ],
            "correct": 0
          },
          " monitors ESG performance for the lenders, while an ",
          {
            "options": [
              "ESAP",
              "ESIA"
            ],
            "correct": 0
          },
          " lists corrective actions with deadlines."
        ],
        "hint": "One is the lenders' independent monitor; the other is an action plan.",
        "tip": "The IESC monitors for the lenders; the ESAP is the corrective-action plan with deadlines."
      },
      {
        "tag": "ESDD",
        "prompt": "An ESDD is…",
        "options": [
          "The lenders' Environmental & Social Due Diligence before financing",
          "A daily site drill",
          "A discharge permit",
          "The contractor's marketing review"
        ],
        "correct": 0,
        "tip": "ESDD = the lenders' investigation of the project's E&S risks before committing funds."
      },
      {
        "tag": "ESDD",
        "difficulty": "medium",
        "prompt": "The gaps found during the ESDD typically become…",
        "options": [
          "The ESAP — corrective actions with deadlines",
          "A press release",
          "A bonus plan",
          "Nothing — they are ignored"
        ],
        "correct": 0,
        "tip": "ESDD findings feed the ESAP, which is written into the loan."
      },
      {
        "tag": "ESDD",
        "difficulty": "medium",
        "prompt": "When does the ESDD happen?",
        "options": [
          "Before the loan is committed",
          "Only after project completion",
          "Only when an accident occurs",
          "Never — lenders don't check"
        ],
        "correct": 0,
        "tip": "Due diligence comes first — it shapes the Equator category and the loan's ESG conditions."
      },
      {
        "tag": "Audits",
        "difficulty": "medium",
        "prompt": "How is a lender-financed project audited over its life?",
        "options": [
          "ESDD before financing, IESC site visits during, lender reviews every period, plus internal audits",
          "One audit at the very end",
          "Only if the community complains",
          "It isn't — reports are taken on trust"
        ],
        "correct": 0,
        "tip": "Several layers of checking run continuously: ESDD → IESC visits → periodic lender reviews → the contractor's own internal audits."
      },
      {
        "tag": "Audits",
        "prompt": "An IESC site visit finds a non-compliance. What normally happens to it?",
        "options": [
          "It becomes a corrective action with a deadline, usually added to the ESAP",
          "It is deleted from the report",
          "Nothing — findings are informal",
          "The IESC fixes it itself"
        ],
        "correct": 0,
        "tip": "Audit findings turn into tracked corrective actions — closed with evidence."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm2.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: this bridge is lender-financed and the first drawdown is next month. The grievance mechanism isn't running yet. What happens?",
        "options": [
          "The disbursement is blocked — a working grievance mechanism is a condition precedent",
          "Nothing — grievances can wait until the bridge is done",
          "The lender pays anyway and adds interest",
          "The community must build its own mechanism"
        ],
        "correct": 0,
        "hint": "Some ESG actions must exist BEFORE money moves.",
        "tip": "Conditions precedent must be met before the first disbursement — a live grievance mechanism is a classic CP."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm5.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: the IESC arrives tomorrow for a site visit. Two grievances are overdue and one corrective action slipped. What do you show them?",
        "options": [
          "Everything — the full records, plus your recovery plan for the overdue items",
          "Only the good files; hide the overdue items",
          "Nothing — make them ask in writing",
          "A staged tour avoiding the problem areas"
        ],
        "correct": 0,
        "hint": "The IESC reports to the lenders either way — the only variable is your credibility.",
        "tip": "Transparency plus a recovery plan builds trust; anything hidden and later found destroys it."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "From audit finding to closure — put the steps in order.",
        "items": [
          "IESC finds a non-compliance",
          "Corrective action added to the ESAP with a deadline",
          "Action completed and evidence collected",
          "IESC verifies and closes the finding"
        ],
        "hint": "A finding isn't closed when the work is done — it's closed when it's verified.",
        "tip": "Finding → ESAP action → evidence → verified closure: that's the audit loop."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the audit timeline.",
        "segments": [
          "The ",
          {
            "options": [
              "ESDD",
              "ESAP"
            ],
            "correct": 0
          },
          " happens before financing, and the ",
          {
            "options": [
              "IESC",
              "IFC"
            ],
            "correct": 0
          },
          " audits the project throughout the loan."
        ],
        "hint": "One is due diligence, the other is the lenders' monitor.",
        "tip": "ESDD before the money moves; IESC watching for as long as it flows."
      },
      {
        "type": "categorize",
        "tag": "Puzzle",
        "prompt": "Sort each event: BEFORE financing or DURING the project?",
        "categories": [
          {
            "id": "before",
            "label": "Before financing"
          },
          {
            "id": "during",
            "label": "During the project"
          }
        ],
        "items": [
          {
            "text": "ESDD investigation",
            "cat": "before"
          },
          {
            "text": "Equator category assigned",
            "cat": "before"
          },
          {
            "text": "IESC site visits",
            "cat": "during"
          },
          {
            "text": "Self-monitoring reports",
            "cat": "during"
          }
        ],
        "hint": "Due diligence and categorisation come first; monitoring runs while money flows.",
        "tip": "ESDD and the A/B/C category happen at appraisal; IESC visits and reports run for the life of the loan."
      },
      {
        "type": "diagramtap",
        "tag": "Tap the diagram",
        "prompt": "The ESG covenant cycle. Tap the stage where the ESDD happens.",
        "boxes": [
          "Appraisal",
          "Conditions precedent",
          "Disbursement",
          "Ongoing monitoring"
        ],
        "correct": 0,
        "hint": "Due diligence means checking BEFORE committing.",
        "tip": "The ESDD is the lenders' investigation at appraisal — before anything is signed or paid."
      },
      {
        "type": "diagramtap",
        "tag": "Tap the diagram",
        "prompt": "Same cycle. Tap the stage where money is actually released.",
        "boxes": [
          "Appraisal",
          "Conditions precedent",
          "Disbursement",
          "Ongoing monitoring"
        ],
        "correct": 2,
        "hint": "Dis-burse = pay out.",
        "tip": "Disbursement is the release of funds — earned by meeting the conditions, kept by ongoing performance."
      },
      {
        "type": "connect",
        "tag": "Link them",
        "prompt": "Link each financing term to its meaning.",
        "pairs": [
          {
            "l": "ESDD",
            "r": "The lenders' check before financing"
          },
          {
            "l": "IESC",
            "r": "Independent monitor working for the banks"
          },
          {
            "l": "ESAP",
            "r": "Corrective actions with owners and deadlines"
          },
          {
            "l": "Covenant",
            "r": "A binding promise inside the loan"
          }
        ],
        "hint": "Check, checker, fix-list, promise.",
        "tip": "ESDD before, IESC during, ESAP to fix, covenants to hold it all together."
      }
    ]
  },
  "m4": {
    "passMark": 0.8,
    "questions": [
      {
        "tag": "What it is",
        "prompt": "True or false: the ESMS only works if it is lived on site, not just filed.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "A binder on a shelf changes nothing — behaviour does."
      },
      {
        "tag": "Grievance",
        "image": "/images/esg-social.jpg",
        "prompt": "A grievance mechanism must be…",
        "options": [
          "Safe and free from retaliation",
          "For employees only",
          "Kept secret",
          "Paid to use"
        ],
        "correct": 0,
        "tip": "Anyone affected must be able to raise concerns safely."
      },
      {
        "tag": "Subcontractors",
        "prompt": "Subcontractors are held to the contractor’s standards through…",
        "options": [
          "Contracts, training and audits",
          "Nothing",
          "A verbal reminder only",
          "An exemption"
        ],
        "correct": 0,
        "tip": "Standards are flowed down and checked."
      },
      {
        "tag": "Plans",
        "difficulty": "medium",
        "prompt": "Management plans (CESMP, waste, traffic) set out…",
        "options": [
          "How each risk is controlled",
          "The project budget",
          "Only the schedule",
          "The canteen menu"
        ],
        "correct": 0,
        "tip": "They translate risks into controls."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "prompt": "Which of these are elements of the ESMS?",
        "options": [
          "Policy",
          "Training",
          "Grievance mechanism",
          "Dividend policy"
        ],
        "correct": [
          0,
          1,
          2
        ],
        "tip": "Dividends aren't part of the ESMS."
      },
      {
        "tag": "Governance",
        "prompt": "Who is ultimately accountable for ESG on the project?",
        "options": [
          "Top management",
          "The newest worker",
          "The community",
          "The bank"
        ],
        "correct": 0,
        "tip": "Accountability sits at the top."
      },
      {
        "tag": "Grievance",
        "prompt": "True or false: it's acceptable to retaliate against a worker who raises a minor grievance.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "tip": "Never — retaliation destroys the mechanism and breaches the Code of Conduct."
      },
      {
        "tag": "Emergency",
        "prompt": "Emergency preparedness covers…",
        "options": [
          "Plans and drills for incidents like spills or fires",
          "Payroll",
          "Marketing",
          "Sales targets"
        ],
        "correct": 0,
        "tip": "It readies the team for accidents and emergencies."
      },
      {
        "tag": "Training",
        "image": "/images/lm9.jpg",
        "prompt": "ESMS training includes…",
        "options": [
          "Inductions and toolbox talks",
          "Only a final exam",
          "Nothing",
          "Managers only"
        ],
        "correct": 0,
        "tip": "Everyone is trained for their role."
      },
      {
        "tag": "Purpose",
        "difficulty": "medium",
        "prompt": "The overall aim of running the ESMS on PDCA is…",
        "options": [
          "Continual improvement",
          "To eliminate reporting",
          "To maximise output only",
          "A one-time audit"
        ],
        "correct": 0,
        "tip": "PDCA keeps performance improving."
      },
      {
        "tag": "Ownership",
        "prompt": "True or false: subcontractors are exempt from the contractor’s ESG rules.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "tip": "They must meet the same standards."
      },
      {
        "tag": "What it is",
        "image": "/images/lm3.jpg",
        "prompt": "The ESMS is…",
        "options": [
          "The system the contractor uses to manage ESG in daily practice",
          "A one-off report",
          "An accounting ledger",
          "A marketing brochure"
        ],
        "correct": 0,
        "tip": "Policy, plans, procedures and roles — run on Plan-Do-Check-Act."
      },
      {
        "tag": "RACI",
        "prompt": "A RACI chart clarifies…",
        "options": [
          "Who is Responsible, Accountable, Consulted and Informed",
          "The project budget",
          "The site layout",
          "The delivery schedule"
        ],
        "correct": 0,
        "tip": "RACI assigns clear ownership for each ESG activity."
      },
      {
        "tag": "Grievances",
        "prompt": "A grievance mechanism lets workers and communities…",
        "options": [
          "Raise concerns safely and have them resolved, without retaliation",
          "Buy company shares",
          "Skip required training",
          "Set their own pay"
        ],
        "correct": 0,
        "tip": "It must be accessible and retaliation-free."
      },
      {
        "tag": "Subcontractors",
        "prompt": "How are subcontractors held to the contractor’s ESG standards?",
        "options": [
          "Flowed down through contracts, training and audits",
          "They are exempt",
          "Only by a verbal reminder",
          "They are not"
        ],
        "correct": 0,
        "tip": "Their conduct is the contractor’s responsibility."
      },
      {
        "tag": "Improvement",
        "prompt": "The ESMS continually improves through which cycle?",
        "options": [
          "Plan – Do – Check – Act",
          "Buy – Build – Sell",
          "Start – Stop",
          "Plan – Approve – Forget"
        ],
        "correct": 0,
        "tip": "PDCA turns the ESMS into a system that keeps getting better."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "prompt": "Which of these are parts of the ESMS?",
        "options": [
          "Management plans",
          "Grievance mechanism",
          "Training",
          "The company's dividend policy"
        ],
        "correct": [
          0,
          1,
          2
        ],
        "hint": "One option is about paying shareholders — nothing to do with managing E&S.",
        "tip": "Plans, grievances and training are ESMS elements; dividends are not."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Order the PDCA improvement cycle.",
        "items": [
          "Plan",
          "Do",
          "Check",
          "Act"
        ],
        "tip": "Plan it, do it, check it, then act on what you learned."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the improvement cycle.",
        "segments": [
          "The ESMS runs on the ",
          {
            "options": [
              "Plan",
              "Buy"
            ],
            "correct": 0
          },
          " – Do – ",
          {
            "options": [
              "Check",
              "Sell"
            ],
            "correct": 0
          },
          " – Act cycle for continual improvement."
        ],
        "hint": "It's a four-step loop that keeps performance improving.",
        "tip": "Plan – Do – Check – Act (PDCA) drives continual improvement."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm4.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: a worker on this site is told to enter an unshored trench and refuses because it looks unsafe. Under the OHS policy, the worker is…",
        "options": [
          "Right — every worker may stop work under dangerous conditions, and management must address it",
          "Wrong — only supervisors can stop work",
          "Wrong — refusing work is always misconduct",
          "Right, but he should be sent home unpaid"
        ],
        "correct": 0,
        "hint": "The policy gives one powerful right to EVERY worker.",
        "tip": "The right to stop unsafe work belongs to every worker — management must promptly address the concern, never punish it."
      },
      {
        "tag": "Solve it",
        "image": "/images/esg-governance.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: these community members are upset about night-time noise and want answers. The correct channel is…",
        "options": [
          "The grievance mechanism — register it, acknowledge, investigate, respond and close",
          "A quiet cash payment to the loudest person",
          "Ignore them — they're not employees",
          "Tell security to keep them away"
        ],
        "correct": 0,
        "hint": "There is one formal door for every complaint, from anyone.",
        "tip": "Community complaints go through the grievance mechanism — registered, acknowledged, investigated, resolved, no retaliation."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Put the grievance steps in the correct order.",
        "items": [
          "Receive & register the complaint",
          "Acknowledge it to the person",
          "Investigate the facts",
          "Resolve, respond and close"
        ],
        "hint": "You can't investigate what you haven't logged.",
        "tip": "Register → acknowledge → investigate → resolve & close — inside the target window, with no retaliation."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the site rules.",
        "segments": [
          "The alcohol limit on site is BAC ",
          {
            "options": [
              "0.00",
              "0.05"
            ],
            "correct": 0
          },
          ", and subcontractors must target at least ",
          {
            "options": [
              "50%",
              "10%"
            ],
            "correct": 0
          },
          " local employment."
        ],
        "hint": "Zero tolerance, and half the workforce.",
        "tip": "BAC 0.00 — zero tolerance; local hiring target ≥ 50% of the workforce."
      },
      {
        "type": "categorize",
        "tag": "Puzzle",
        "prompt": "Sort each situation into the RACI letter that fits the person described.",
        "categories": [
          {
            "id": "r",
            "label": "Responsible (does it)"
          },
          {
            "id": "a",
            "label": "Accountable (answers for it)"
          }
        ],
        "items": [
          {
            "text": "HSE supervisor doing the daily inspection",
            "cat": "r"
          },
          {
            "text": "Project director signing the report",
            "cat": "a"
          },
          {
            "text": "Community officer logging a grievance",
            "cat": "r"
          },
          {
            "text": "Managing Director owning the ESG policy",
            "cat": "a"
          }
        ],
        "hint": "Doing the work vs owning the outcome.",
        "tip": "R does the task; A owns the result — exactly one A per activity."
      },
      {
        "type": "multi",
        "tag": "PPE",
        "prompt": "Which PPE is mandatory for EVERYONE on site, every day?",
        "options": [
          "Hard hat",
          "Hi-vis vest",
          "Safety boots",
          "A necktie"
        ],
        "correct": [
          0,
          1,
          2
        ],
        "hint": "Think of the basics you must wear just to walk onto the site.",
        "tip": "Hard hat, hi-vis and safety boots are the everyday minimum; gloves and eye protection are added per task."
      },
      {
        "tag": "Work at height",
        "prompt": "True or false: PPE alone is enough for working at height.",
        "options": [
          "True",
          "False"
        ],
        "correct": 1,
        "hint": "A hard hat doesn't stop a fall.",
        "tip": "Myth — at height you also need a harness clipped to an anchor point or guardrails, an inspected platform, and a permit to work."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm13.jpg",
        "difficulty": "hard",
        "prompt": "SOLVE THE CASE: this crew is about to fix roof tiles. They have hard hats and hi-vis — what must ALSO be true before the first tile moves?",
        "options": [
          "Harness anchored (or edge protection), an inspected tagged platform, and a permit to work at height",
          "Nothing — hard hats cover it",
          "Only a verbal OK from the foreman",
          "They should work faster to spend less time at height"
        ],
        "correct": 0,
        "hint": "Falls are the #1 killer on construction sites — PPE is just the start.",
        "tip": "Height work demands fall protection (harness/guardrails), an inspected platform and a permit — no anchor, no inspection, no work."
      },
      {
        "type": "diagramtap",
        "tag": "Tap the diagram",
        "prompt": "The PDCA loop. Tap the step where you MEASURE whether the plan actually worked.",
        "boxes": [
          "Plan",
          "Do",
          "Check",
          "Act"
        ],
        "correct": 2,
        "hint": "Monitoring and review live here.",
        "tip": "Check = measure performance against the plan; Act then fixes what Check found."
      },
      {
        "type": "connect",
        "tag": "Link them",
        "prompt": "Link each policy to its headline rule.",
        "pairs": [
          {
            "l": "OHS policy",
            "r": "Any worker may stop unsafe work"
          },
          {
            "l": "Alcohol & drugs",
            "r": "BAC 0.00 — zero tolerance"
          },
          {
            "l": "Subcontractor policy",
            "r": "Target at least 50% local hiring"
          },
          {
            "l": "GBVSH policy",
            "r": "Zero tolerance, confidential reporting"
          }
        ],
        "hint": "Each policy has one rule to know by heart.",
        "tip": "Stop-work right, zero alcohol, 50% local, zero tolerance for GBVSH."
      },
      {
        "tag": "Safety rule",
        "prompt": "A worker sees a dangerous condition. Under the OHS policy they may…",
        "options": [
          "Stop work immediately — it is their right",
          "Keep working and mention it next week",
          "Only stop if a manager agrees first",
          "Never stop work"
        ],
        "correct": 0,
        "tip": "Every worker has the right to stop work under dangerous conditions; management must respond promptly."
      },
      {
        "tag": "Working hours",
        "difficulty": "medium",
        "prompt": "The HR policy caps working time at…",
        "options": [
          "48 regular + 12 overtime hours a week, with 1 rest day in 7",
          "60 regular hours, no rest days",
          "40 hours with unlimited overtime",
          "No limit if the project is late"
        ],
        "correct": 0,
        "tip": "Max 48 regular + 12 overtime hours per week, and at least one rest day every seven days."
      },
      {
        "tag": "Alcohol & drugs",
        "prompt": "The Blood Alcohol Concentration (BAC) allowed on site is…",
        "options": [
          "0.00 — zero tolerance",
          "0.05",
          "0.08",
          "Whatever local law allows"
        ],
        "correct": 0,
        "tip": "BAC 0.00 is required on site; 0.01 or higher means immediate removal from the project."
      },
      {
        "tag": "GBVSH",
        "prompt": "The policy on gender-based violence and sexual harassment is…",
        "options": [
          "Zero tolerance — with training, confidential reporting and survivor support",
          "Handled informally between colleagues",
          "Only for managers",
          "Only investigated if there are witnesses"
        ],
        "correct": 0,
        "tip": "Zero tolerance: mandatory training, confidential channels, survivor support, no retaliation."
      },
      {
        "tag": "Local hiring",
        "difficulty": "medium",
        "prompt": "The subcontractor policy sets a local employment target of at least…",
        "options": [
          "50%",
          "5%",
          "10%",
          "90%"
        ],
        "correct": 0,
        "tip": "Subcontractors must target at least 50% local employment, with commitments to female participation."
      },
      {
        "tag": "Integrity",
        "difficulty": "medium",
        "prompt": "Under the anti-corruption and AML policies, which payment is acceptable?",
        "options": [
          "A documented bank transfer to a screened supplier",
          "A small cash 'facilitation payment' to speed a permit",
          "A generous gift to win a contract",
          "A payment to a sanctioned entity, if discreet"
        ],
        "correct": 0,
        "tip": "No bribes, no facilitation payments, no cash — only traceable payments to screened counterparties."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "difficulty": "medium",
        "prompt": "Which of these are real rules from the ESMS policy suite?",
        "options": [
          "Right to stop unsafe work",
          "BAC 0.00 on site",
          "At least one rest day every 7 days",
          "Free unlimited overtime"
        ],
        "correct": [
          0,
          1,
          2
        ],
        "hint": "Three protect workers; one would exploit them.",
        "tip": "Stop-work right, zero alcohol and the rest-day rule are real; overtime is capped at 12h/week."
      }
    ]
  },
  "m5": {
    "passMark": 0.8,
    "questions": [
      {
        "tag": "Basics",
        "prompt": "True or false: what gets measured gets managed.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "KPIs make performance visible so it can be improved."
      },
      {
        "tag": "Leading",
        "image": "/images/lm10.jpg",
        "difficulty": "hard",
        "prompt": "Which is a LEADING indicator?",
        "options": [
          "Near-misses reported",
          "Fatalities",
          "Lost-time injuries",
          "Recordable injuries"
        ],
        "correct": 0,
        "tip": "Leading indicators act before an incident."
      },
      {
        "tag": "Environment",
        "image": "/images/esg-pollution.jpg",
        "prompt": "Environmental KPIs include…",
        "options": [
          "Emissions, water, waste and spills",
          "Clicks and page views",
          "Gross margin",
          "Font sizes"
        ],
        "correct": 0,
        "tip": "They quantify the footprint."
      },
      {
        "tag": "Reporting",
        "image": "/images/esg-reporting.jpg",
        "prompt": "Who compiles site data into the reports?",
        "options": [
          "ESG/HSE managers",
          "The bank",
          "The media",
          "No one"
        ],
        "correct": 0,
        "tip": "Site teams collect; managers compile."
      },
      {
        "tag": "Review",
        "prompt": "Lenders and the IESC review reports against…",
        "options": [
          "The loan's ESG conditions and ESAP",
          "The weather",
          "Competitor prices",
          "Staff holidays"
        ],
        "correct": 0,
        "tip": "Performance is checked against agreed conditions."
      },
      {
        "type": "multi",
        "tag": "Select all",
        "prompt": "Which of these are LEADING indicators?",
        "options": [
          "Near-misses reported",
          "Training hours",
          "Inspections completed",
          "Lost-time injuries"
        ],
        "correct": [
          0,
          1,
          2
        ],
        "tip": "Lost-time injuries are lagging."
      },
      {
        "tag": "Data quality",
        "prompt": "True or false: unreliable KPI data erodes lender trust.",
        "options": [
          "True",
          "False"
        ],
        "correct": 0,
        "tip": "Garbage in, garbage out — data must be reliable."
      },
      {
        "tag": "Loop",
        "prompt": "KPIs ultimately feed back into…",
        "options": [
          "The ESMS and financing decisions",
          "Nothing",
          "Payroll only",
          "Marketing only"
        ],
        "correct": 0,
        "tip": "They close the loop back to the ESMS and lenders."
      },
      {
        "tag": "Data quality",
        "prompt": "Good ESG data must be…",
        "options": [
          "Accurate, timely and verifiable",
          "Vague and late",
          "Hidden from the IESC",
          "Estimated once a year"
        ],
        "correct": 0,
        "tip": "The IESC must be able to check it."
      },
      {
        "tag": "Reporting",
        "prompt": "The reporting chain STARTS with…",
        "options": [
          "Site teams collecting the data",
          "The lender",
          "The IESC",
          "The media"
        ],
        "correct": 0,
        "tip": "Data starts at the source — the site."
      },
      {
        "tag": "KPIs",
        "difficulty": "medium",
        "prompt": "TRIR, spills and grievances-closed are examples of…",
        "options": [
          "ESG KPIs",
          "Tax codes",
          "Marketing metrics",
          "Loan terms"
        ],
        "correct": 0,
        "tip": "They measure ESG performance."
      },
      {
        "tag": "Safety KPI",
        "prompt": "Which is a common SAFETY KPI?",
        "options": [
          "LTIFR (lost-time injury frequency rate)",
          "Gross profit margin",
          "Website visits",
          "Office rent"
        ],
        "correct": 0,
        "tip": "LTIFR tracks lost-time injuries per hours worked."
      },
      {
        "tag": "Leading",
        "prompt": "Which is a LEADING (proactive) indicator?",
        "options": [
          "Near-misses reported / training hours",
          "Number of injuries",
          "Number of fatalities",
          "LTIFR"
        ],
        "correct": 0,
        "tip": "Leading indicators predict; lagging ones (injuries) look back."
      },
      {
        "type": "categorize",
        "tag": "Puzzle",
        "prompt": "Sort each indicator into leading or lagging.",
        "categories": [
          {
            "id": "lead",
            "label": "Leading (predicts)"
          },
          {
            "id": "lag",
            "label": "Lagging (looks back)"
          }
        ],
        "items": [
          {
            "text": "Near-misses reported",
            "cat": "lead"
          },
          {
            "text": "Safety training hours",
            "cat": "lead"
          },
          {
            "text": "Lost-time injuries",
            "cat": "lag"
          },
          {
            "text": "Number of spills",
            "cat": "lag"
          }
        ],
        "hint": "Ask: does it happen BEFORE an incident (leading) or COUNT one that already happened (lagging)?",
        "tip": "Leading indicators are things you do before an incident; lagging ones count what already happened."
      },
      {
        "tag": "Reporting",
        "prompt": "The contractor’s ESG performance data reaches lenders mainly via…",
        "options": [
          "Self-monitoring reports",
          "Newspaper adverts",
          "Word of mouth",
          "The company website"
        ],
        "correct": 0,
        "tip": "Site data is compiled into self-monitoring reports."
      },
      {
        "tag": "Review",
        "prompt": "Lenders and the IESC review the reports against…",
        "options": [
          "The loan's ESG conditions and ESAP progress",
          "The weather",
          "Competitor prices",
          "Staff holidays"
        ],
        "correct": 0,
        "tip": "They check performance against the agreed conditions."
      },
      {
        "tag": "Loop",
        "prompt": "KPIs ultimately feed back into…",
        "options": [
          "The ESMS and financing decisions (continuous improvement)",
          "Nothing",
          "Only payroll",
          "Marketing only"
        ],
        "correct": 0,
        "tip": "KPIs close the loop back to Module 3 and the ESMS."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the indicators sentence.",
        "segments": [
          {
            "options": [
              "Leading",
              "Lagging"
            ],
            "correct": 0
          },
          " indicators act before an incident, while ",
          {
            "options": [
              "lagging",
              "leading"
            ],
            "correct": 0
          },
          " indicators count what has already happened."
        ],
        "hint": "Near-misses come before; injuries come after.",
        "tip": "Leading indicators are proactive; lagging indicators look back at what happened."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm8.jpg",
        "difficulty": "hard",
        "prompt": "SOLVE THE CASE: trucks pass this street daily. Traffic complaints were 2 in May, 5 in June, 9 in July — all answered on time. What is the KPI telling you?",
        "options": [
          "A worsening trend — act now, even though each complaint was handled",
          "Nothing — every complaint was closed on time",
          "Good news — people enjoy complaining",
          "The data must be wrong"
        ],
        "correct": 0,
        "hint": "Look at the direction of the numbers, not just each month's closure rate.",
        "tip": "The TREND is the signal: 2→5→9 is a red flag even with perfect closure — fix the cause (speeds, routes, timings), not just the complaints."
      },
      {
        "tag": "Solve it",
        "image": "/images/lm4.jpg",
        "difficulty": "medium",
        "prompt": "SOLVE THE CASE: this crew reported 12 near-misses this month and zero injuries. The neighbouring crew reported zero of each. Who worries you more?",
        "options": [
          "The crew reporting nothing — silence usually means non-reporting, not safety",
          "The crew with 12 near-misses — they're clearly dangerous",
          "Neither — zero injuries is all that matters",
          "Both equally"
        ],
        "correct": 0,
        "hint": "A healthy reporting culture LOOKS worse on paper.",
        "tip": "High near-miss reporting with no injuries = a crew that sees and reports risk. Zero-zero usually means nobody is reporting."
      },
      {
        "type": "order",
        "tag": "Puzzle",
        "prompt": "Put the reporting chain in order — from site to lender.",
        "items": [
          "Site teams fill the daily forms",
          "The ESG/HSE manager checks and compiles",
          "The project director signs off",
          "Lenders and the IESC review the report"
        ],
        "hint": "The number travels up: form → compiler → signature → reader.",
        "tip": "Form → compile → sign → review: the same number travels the whole chain, so it must be right at the source."
      },
      {
        "type": "fillblank",
        "tag": "Fill the blanks",
        "prompt": "Complete the LTIFR formula.",
        "segments": [
          "LTIFR = lost-time injuries × ",
          {
            "options": [
              "1,000,000",
              "100"
            ],
            "correct": 0
          },
          " ÷ ",
          {
            "options": [
              "hours worked",
              "number of workers"
            ],
            "correct": 0
          },
          "."
        ],
        "hint": "It's a rate per million hours, not per person.",
        "tip": "LTIFR = lost-time injuries × 1,000,000 ÷ hours worked — size-adjusted so projects can be compared."
      },
      {
        "type": "categorize",
        "tag": "Puzzle",
        "prompt": "Sort each number into the KPI family it belongs to.",
        "categories": [
          {
            "id": "saf",
            "label": "Safety"
          },
          {
            "id": "soc",
            "label": "Social"
          }
        ],
        "items": [
          {
            "text": "LTIFR",
            "cat": "saf"
          },
          {
            "text": "Grievances closed on time",
            "cat": "soc"
          },
          {
            "text": "Toolbox talks held",
            "cat": "saf"
          },
          {
            "text": "Local employment %",
            "cat": "soc"
          }
        ],
        "hint": "Injuries and talks protect workers; grievances and hiring concern people around the project.",
        "tip": "LTIFR and toolbox talks are safety KPIs; grievance closure and local employment are social KPIs."
      },
      {
        "type": "diagramtap",
        "tag": "Tap the diagram",
        "prompt": "The reporting chain. Tap the link where the data is VERIFIED for the lenders.",
        "boxes": [
          "Site forms",
          "ESG manager compiles",
          "Director signs",
          "IESC verifies"
        ],
        "correct": 3,
        "hint": "Verification is independent — it doesn't happen inside the project.",
        "tip": "The IESC independently verifies the reports on the lenders' behalf — the last link before the banks rely on the numbers."
      },
      {
        "type": "connect",
        "tag": "Link them",
        "prompt": "Link each KPI to what it tells you.",
        "pairs": [
          {
            "l": "LTIFR",
            "r": "Lost-time injuries per million hours"
          },
          {
            "l": "Near-misses reported",
            "r": "Leading signal — eyes are open"
          },
          {
            "l": "Grievances closed on time",
            "r": "The mechanism is working"
          },
          {
            "l": "Local employment %",
            "r": "Community benefit from hiring"
          }
        ],
        "hint": "One safety rate, one leading signal, two social measures.",
        "tip": "LTIFR looks back, near-misses look forward, grievances and hiring measure the social side."
      }
    ]
  }
};
