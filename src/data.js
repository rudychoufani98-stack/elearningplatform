// ESG course content ("Creating Our Sustainability Pathway") presented inside
// the Skykapital Europe platform design. No backend — seeds CourseContext.

import { client } from "./config/clients.js";

export { client };

export const platform = {
  brand: "Skykapital Europe",
  center: client.center,
  series: client.series,
};

export const course = {
  title: client.courseTitle,
  subtitle: client.courseSubtitle,
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
    title: "ESG and E&S Fundamentals",
    type: "quiz",
    duration: "25–30 min",
    status: "not_started",
    score: { earned: 0, total: 12 },
    icon: "foundation",
    summary: "What responsible infrastructure actually requires — and why the money depends on it.",
    video: { id: "AkbGz3CYvqE", title: "Environmental, Social and Governance (ESG) — framework & standards" },
    tldr: "ESG is the discipline of making sure somebody asks three ordinary questions before the first excavator arrives — Who uses this land? What happens to this hole when we finish? Who has agreed to this? — and that the answers are written down, acted on, and checked.",
    glossary: [
      { term: "ESG", plain: "Environmental, Social and Governance — the lens used to judge whether an organisation makes its money without destroying things, harming people, or depending on dishonesty." },
      { term: "E&S", plain: "Environmental and Social — the project-level scope that lenders assess and monitor contractually. Not 'ESG minus the G': governance is fully present, under names like management system and monitoring." },
      { term: "IFC Performance Standards", plain: "Eight standards (PS1–PS8, revised 2012) that are the international benchmark for managing E&S risk on financed projects." },
      { term: "Equator Principles (EP4)", plain: "The framework banks apply before financing large projects. In most African countries it means: national law PLUS the IFC Performance Standards PLUS the EHS Guidelines." },
      { term: "Mitigation hierarchy", plain: "The fixed order for dealing with harm: Avoid → Minimise → Restore → Compensate. The order is binding, not advisory." },
      { term: "IESC", plain: "Independent Environmental and Social Consultant — appointed by and reporting to the lenders. Not the contractor's adviser: their job is to give lenders an accurate picture." },
      { term: "Full replacement cost", plain: "What compensation must equal under PS5: the cost of an equivalent NEW asset, without deduction for depreciation, plus transaction costs." },
      { term: "ESMS", plain: "Environmental and Social Management System — the machinery PS1 requires: policy, risk identification, plans, capacity, emergency preparedness, engagement, monitoring." },
    ],
    overview:
      "ESG stands for Environmental, Social and Governance — the non-financial dimensions along which a project is judged by banks, insurers, regulators, clients and communities. This module is the foundation of the pathway: what ESG and E&S actually mean, where the rules come from, which rulebook applies on your project, and the one tool — the mitigation hierarchy — that runs through everything. If you have ever been told to do something on site because an auditor was coming, and nobody told you why, this module is the answer to that question.",
    lesson: [
      {
        heading: "Why this module exists",
        body: "A contractor opens a borrow pit to win laterite for an embankment. The land is scrubby, apparently unused, and nobody complains at first. Six weeks later the pit is twelve metres deep and full of standing water. Two children drown in it. The community blocks the haul road; work stops on a fourteen-kilometre section. The lender's monitoring consultant finds no management plan, no closure design, no fencing, and no record that anyone ever asked who used that land. The technical work was sound — the embankment was well built — but the project failed anyway: months of delay, a suspended disbursement, a compensation claim, and a story that follows the contractor into its next tender. Nothing in that sequence required specialist knowledge to prevent. It required someone to ask, before the first excavator arrived: Who uses this land? What happens to this hole when we finish? Who has agreed to this?",
        image: "/images/course-hero.jpg",
        caption: "One unplanned borrow pit can stop a fourteen-kilometre section.",
      },
      {
        heading: "What ESG actually is — three pillars, seen on site",
        body: "For most of the twentieth century a company was assessed on one question: does it make money? ESG adds a second, now asked with equal seriousness: is that money made in a way that does not destroy things, harm people, or depend on dishonesty? On a road project, the three pillars look like this:",
        points: [
          "Environmental — our effect on the physical and living world: dust over a settlement, silt in a stream, a wetland drained, a borrow pit left open, fuel in the soil, trees cleared without a count.",
          "Social — how we treat the people we employ and the people who live with our impacts: a worker without a harness on a bridge deck, a camp with one latrine for eighty men, a farmer whose field is now a haul road, waiting for a payment.",
          "Governance — whether our systems, records and decisions are honest and verifiable: a payment to accelerate a permit, a safety register filled in on Friday for the whole week, a grievance logged as closed that was never resolved.",
        ],
        image: "/images/esg-environment.jpg",
        caption: "Three pillars, one project — and all three are audited.",
      },
      {
        heading: "The correction that matters most: E&S is not ESG minus the G",
        body: "You will often hear that E&S is simply ESG without governance. That is wrong, and the mistake causes real confusion. E&S is not a smaller version of ESG — it is a different unit of analysis. ESG assesses an organisation; E&S assesses a project. Governance is fully present at project level, under different names: management system, organisational capacity, competency, accountability, monitoring, reporting. IFC Performance Standard 1 requires an Environmental and Social Management System whose elements — policy, risk identification, management programmes, capacity and competency, emergency preparedness, stakeholder engagement, monitoring and review — ARE governance, described in project language. The honest formulation: E&S is the project-level, contractually binding scope that lenders assess and monitor. ESG is the broader corporate-level lens, much of which is voluntary. Governance runs through both. And do not confuse either with CSR: a school built as a goodwill gesture is a choice; a resettlement obligation under a financing agreement is a debt.",
        image: "/images/esg-governance.jpg",
        caption: "A company can score well on ESG and still fail an E&S audit — ratings measure disclosure; audits measure reality.",
      },
      {
        heading: "Where the rules came from: two family trees",
        body: "People tell the history of ESG as one story beginning with a UN report in 2004. In fact there are two lineages, and the one that governs your working life is the older one:",
        points: [
          "The investor lineage — 'Who Cares Wins' (2004) coined the acronym ESG; the Principles for Responsible Investment (2006) followed, then ratings and disclosure regimes. Powerful, but mostly not enforceable against a site foreman.",
          "The project finance lineage — the one that reaches your site: the World Bank's Operational Policies (1980s–90s) created impact assessment and resettlement practice; the Equator Principles (2003, EP4 since 2020) committed private banks; the IFC Performance Standards (2006, revised 2012) became the reference benchmark.",
          "The Africa lens — the African Development Bank runs its own Integrated Safeguards System, updated in 2023 with ten Operational Safeguards. On co-financed projects you may be assessed against both; where they differ, the more stringent applies.",
          "The IFC is a member of the World Bank GROUP — not the World Bank itself. The World Bank lends to governments (ESF, ten standards); the IFC finances private companies (eight Performance Standards). Knowing who finances your project tells you which rulebook you are audited against.",
        ],
        image: "/images/lm2.jpg",
        caption: "Two family trees — investor pressure, and the project-finance rules that reach your site.",
      },
      {
        heading: "Which rulebook applies to you — the single most important rule",
        body: "Equator Principles 4, Principle 3, distinguishes Designated Countries (robust environmental and social governance) from Non-Designated Countries. Almost all African countries — Nigeria, Ghana, Kenya, Senegal, Côte d'Ivoire, Tanzania — are Non-Designated. The consequence is direct and non-negotiable:",
        points: [
          "On a financed project, the applicable standard is host country law PLUS the IFC Performance Standards PLUS the World Bank Group EHS Guidelines.",
          "Where the two differ, the MORE STRINGENT requirement applies.",
          "Compliance with national law is necessary. It is not sufficient.",
          "Example: a contractor in Nigeria obtains its EIA certificate and considers the environmental question settled. It is not — the certificate satisfies the EIA Act but says nothing about PS6 on biodiversity, PS5 on resettlement, or the EHS Guidelines on emissions. A valid national permit closes a legal question; it closes no lender finding.",
        ],
        image: "/images/lm11.jpg",
        caption: "National permit in hand — and the lender's assessment has not even started.",
      },
      {
        heading: "E for Environmental — the eight areas you are accountable for",
        points: [
          "Air quality and dust — haul roads, crushing and earthworks settling on homes, crops and drying food (PS3, EHS Guidelines 1.1).",
          "Water — sediment run-off, concrete washout, fuel and oil, untreated camp sewage, over-abstraction from a source a village depends on (PS3, EHS 1.3–1.4).",
          "Noise and vibration — night piling near homes, blasting cracking walls. Sleep disruption is a health impact, not an inconvenience (PS3, PS4, EHS 1.7).",
          "Land, soil and erosion — stripped slopes gullying in the first heavy rain, topsoil buried instead of stockpiled, contaminated ground at fuel points (PS3, PS1).",
          "Borrow pits and quarries — the single most under-managed issue on African road projects: unlicensed extraction, no closure design, open water, drowning risk (PS1, PS3, PS4, PS5).",
          "Biodiversity and habitat — clearance without survey, wetlands crossed without design, critical habitat encountered late, invasive species on imported fill (PS6).",
          "Waste and hazardous materials — used oil poured on roads for dust suppression, bitumen drums reused for drinking water, no manifest, no licensed disposal (PS3, EHS 1.6).",
          "Climate and greenhouse gases — unquantified emissions; flood and heat exposure designed for yesterday's climate rather than the asset's design life (PS3, EP4).",
        ],
        image: "/images/lm9.jpg",
        caption: "Silt fences and a settlement pond cost a fraction of one percent of a section — the failure costs a work stoppage and a community that never forgives.",
      },
      {
        heading: "S for Social — your workforce",
        body: "PS2 governs labour and working conditions, extending to workers engaged by subcontractors — subcontracting transfers the work, never the obligation:",
        points: [
          "Written terms of employment in a language the worker understands; wages in full, on time, without unlawful deduction.",
          "Occupational health and safety through the hierarchy: eliminate, control at source, minimise, and only then PPE. A helmet is the last line of defence, not the strategy.",
          "Freedom of association, non-discrimination, and absolute prohibitions on child labour and forced labour (withheld passports and recruitment fees are forced-labour indicators, whatever they are called locally).",
          "Worker accommodation to the IFC/EBRD standard — floor area, sanitation ratios, and management separated from employment so losing a bed does not mean losing the job.",
          "A worker grievance mechanism, separate from the community one, operating without retaliation.",
        ],
        image: "/images/esg-social.jpg",
        caption: "PS2 follows the worker — including every subcontractor's worker on your project.",
      },
      {
        heading: "S for Social — communities, land and livelihoods",
        body: "The Social pillar is the one that most often stops a project. The highest-risk area on almost every road project is land, governed by PS5:",
        points: [
          "Community safety (PS4) — construction haulage on public roads kills more people on African road projects than any on-site hazard. Traffic management, speed governors and school-hours restrictions are not optional refinements.",
          "Labour influx — a camp of hundreds beside a village of two thousand changes prices, water, disease and politics. Predictable, manageable — not an accident.",
          "Sexual exploitation, abuse and harassment — its own prevention architecture: signed code of conduct, training, survivor-centred reporting, referral pathway that exists BEFORE an incident.",
          "PS5: compensation at FULL REPLACEMENT COST — an equivalent new house, no deduction for depreciation. The most frequently mishandled calculation on the continent.",
          "PS5: possession of land only AFTER compensation is available. Entering land before payment is among the most serious findings a lender can make.",
          "PS5: eligibility extends to people WITHOUT legal title — informal traders, pastoralists, seasonal users. A census at 10 a.m. on a market day systematically misses them.",
          "Livelihoods must be RESTORED, not merely compensated — a trader needs a functioning place to trade, not only a cash sum.",
        ],
        image: "/images/esg-social.jpg",
        caption: "A census that missed 63 households is not a rounding error — it is a legitimacy problem.",
      },
      {
        heading: "G for Governance — and what a failure actually costs",
        body: "Governance determines whether the other two pillars are real or decorative. Four components: ethics and anti-corruption (a facilitation payment is unlawful under most financing agreements, whatever local practice tolerates); record integrity (a falsified record is treated more seriously than the failure it hides); accountability (an E&S manager with no budget and no authority is a documented non-conformity); and speak-up channels (if the first person to use one is punished, the channel is dead and everyone knows it). And forget the myth that one small bribe collapses the loan overnight. The real mechanism is slower and more sobering:",
        points: [
          "1. Detection — audit, complaint, supervision engineer, or the lenders' IESC on a site visit.",
          "2. Finding — recorded as a non-conformity with a severity rating; the report goes to the lenders.",
          "3. Corrective action — into the ESAP with a named owner and deadline. Most issues are resolved here.",
          "4. Escalation — persistent or severe failure triggers formal notice, with a cure period.",
          "5. Financial consequence — suspended disbursement, additional conditions, and in the extreme, an event of default.",
          "The realistic risk is cumulative: a pattern of small failures builds a monitoring record that makes the next disbursement conditional and the next contract unwinnable.",
        ],
        image: "/images/esg-governance.jpg",
        caption: "Not one envelope collapsing a project — a pattern of small failures closing doors.",
      },
      {
        heading: "The one tool that runs through everything: the mitigation hierarchy",
        body: "If you remember a single technical concept from this pathway, remember this. PS1 requires the hierarchy to be applied to every identified risk and impact — favouring avoidance over minimisation, with compensation only for what remains. Worked example — a wetland on the alignment:",
        points: [
          "1. AVOID — realign the road around the wetland. Always the first question, and the one most often skipped because the alignment is treated as fixed before anyone has looked.",
          "2. MINIMISE — reduce the crossing width, build a viaduct, restrict works to the dry season.",
          "3. RESTORE — reinstate hydrological connectivity, replant native species, regrade temporary access.",
          "4. COMPENSATE / OFFSET — deliver an equivalent gain elsewhere, to a measurable no-net-loss objective. Cash alone is not an offset.",
          "The order is BINDING, not advisory — a reviewer will ask what avoidance options were considered and why they were rejected, and expects a documented answer.",
          "It applies to people too: resettlement is step four, not step one. A thirty-metre alignment shift that avoids twelve houses is worth more than any compensation package.",
          "It applies to safety: if your strategy begins and ends with issuing helmets, you have started at step four.",
        ],
        image: "/images/lm2.jpg",
        caption: "Avoid → Minimise → Restore → Compensate. The hierarchy fails on timing, not ignorance.",
      },
      {
        heading: "The chain of obligation: how a rule reaches your site",
        body: "E&S requirements do not arrive from nowhere. They flow down a chain — and understanding it explains why the requirement cannot be waived by the person standing in front of you:",
        points: [
          "1. Lenders — a financing agreement with conditions precedent, E&S covenants, an action plan and reporting obligations.",
          "2. Borrower / concessionaire — passes obligations into the construction contract, plus a duty to supervise and report.",
          "3. EPC contractor — turns them into management plans: ESMP, traffic, waste, borrow pits, camp, code of conduct.",
          "4. Subcontractors and suppliers — flow-down clauses, induction, right of audit.",
          "5. The individual on site — a specific instruction: wet this haul road, log this grievance, stop if you uncover a burial.",
          "The obligation flows down but the liability does NOT flow away: if a subcontractor employs a fifteen-year-old, the finding is against the project. Naming the subcontractor is an explanation, not a defence.",
          "Everything above the last link is a plan. Only what the operator does on the ground is performance — that is why ESG being everybody's job is a structural fact, not a slogan.",
        ],
        image: "/images/lm13.jpg",
        caption: "Five links from the loan agreement to the person holding the hose.",
      },
      {
        heading: "Who checks — and the rule that decides how you are judged",
        body: "Five layers of checking: your own E&S team; the client's supervision engineer; the lenders' Independent Environmental and Social Consultant (IESC — not your adviser, not there to help you pass); the national regulators; and the communities themselves, through the grievance mechanism, the road block, the press and the DFIs' accountability mechanisms. And one rule decides everything:",
        points: [
          "A problem you found, recorded and were already correcting is evidence of a functioning management system.",
          "The identical problem, discovered by the IESC with no trace in your records, is evidence that the system does not work.",
          "Same facts. Opposite conclusion about your organisation.",
          "Systems that under-report are treated as systems that cannot be relied upon at all — an unrecorded incident that surfaces later is treated as concealment, a governance finding of a higher order than the original issue.",
        ],
        image: "/images/lm9.jpg",
        caption: "Disclosed versus discovered — the difference between a working system and a broken one.",
      },
      {
        heading: "Six things people believe that are not true",
        points: [
          "'ESG is just public relations.' On a financed project it is a binding contractual condition with money attached.",
          "'ESG slows us down.' Done early it is close to cost-neutral; done late it becomes rework, stoppage and retrofit. The delay people remember is E&S having been left too late.",
          "'That is the ESG team's job.' The ESG team designs and verifies. It cannot wet a haul road, refuse an unsafe lift, or stop a grader at a burial site.",
          "'We comply with national law, so we are fine.' In a Non-Designated Country: national law PLUS the Performance Standards PLUS the EHS Guidelines, the more stringent prevailing.",
          "'It is the subcontractor's problem.' The finding is recorded against the project. Always.",
          "'If we do not write it down, it did not happen.' The opposite is true — and this is the most damaging belief on the list.",
        ],
        image: "/images/esg-environment.jpg",
        caption: "Six myths — each one has ended careers and stopped projects.",
      },
      {
        heading: "Job aid: five questions before you break ground",
        body: "These five questions cover the majority of what goes wrong on infrastructure sites. If any answer is no or unclear — stop and build the record first:",
        points: [
          "1. Is this activity, at this location, inside the assessed and approved scope? New borrow pits, camps, access tracks and spoil areas are usually the answer — and usually no.",
          "2. Who USES this land, and how do I know? Not who owns it. Ask women, pastoralists and youth separately, away from whoever stands to benefit from the answer.",
          "3. Have I applied the hierarchy in order — and written down what I rejected at each step and why?",
          "4. What happens to this when we finish? Design the closure now: a pit designed only for maximum yield cannot be safely closed at any price.",
          "5. If the IESC asked me today, could I show the record? Whatever the substance, a missing record is a governance finding.",
          "And one rule that overrides all five: if you find a problem, DISCLOSE it.",
        ],
        image: "/images/lm13.jpg",
        caption: "Print this. It fits on one page and it prevents most of what goes wrong.",
      },
    ],
    objectives: [
      "Define ESG and E&S accurately, and explain the difference between them without guessing.",
      "Name the three main rulebooks that govern a financed infrastructure project, and say which one applies where you work.",
      "Apply the mitigation hierarchy to a real site decision, in the correct order.",
      "Trace the chain of obligation from a lender's loan agreement to a specific task on your site.",
      "Identify where national law sets a lower bar than international standards, and explain which one applies on a financed project.",
      "Recognise the practical consequences of a non-conformity, and describe the process that follows one.",
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
    title: "The rulebooks",
    type: "quiz",
    duration: "25–30 min",
    status: "not_started",
    score: { earned: 0, total: 20 },
    icon: "gavel",
    summary: "Where national law stops and the lender standard begins.",
    video: { id: "xd9KRup3zaY", title: "IFC Performance Standards on Environmental & Social Sustainability" },
    tldr: "Module 1 ended with a proposition most people accept without fully believing: complying with national law is necessary but not sufficient. This module makes it operational — four tiers of requirement apply at once, and where they diverge, the one that protects people and the environment more is the one that governs.",
    glossary: [
      { term: "The four tiers", plain: "National law (protects you from prosecution), lender standards (protect your disbursement), the project contract (protects your payment certificate), and good practice (protects you when nothing else anticipated the situation)." },
      { term: "Non-Designated Country", plain: "EP4's category for countries without 'robust' E&S governance — every Sub-Saharan African country. Consequence: national law PLUS the Performance Standards PLUS the EHS Guidelines." },
      { term: "More-stringent test", plain: "When two rules address the same requirement, the one that gives the better outcome for the affected person or the environment governs — not the one that is easier for the project." },
      { term: "Category A / B / C", plain: "EP4's risk label. A = highest potential impacts, fullest obligations. Most major road and PPP projects are Category A." },
      { term: "Supplementary assessment", plain: "The extra study prepared to lender scope when the national EIA covers less than the standards require. Normal practice, not a sign of failure." },
      { term: "Corrective framing", plain: "The honest posture when gaps are found mid-construction: state what happened, fix what can still be fixed, plan the rest with owners and deadlines. Lenders penalise the disguise, not the fact." },
      { term: "GIIP", plain: "Good International Industry Practice — the professional skill and foresight a competent reviewer expects, applied when no written rule anticipated the situation." },
      { term: "Mineral title", plain: "The licence needed to extract laterite, sand or rock — even for your own project's borrow pit. A landowner's consent does not replace it." },
    ],
    overview:
      "On a financed infrastructure project, four distinct bodies of requirement apply simultaneously: national law, the lender standards, the project contract, and good international industry practice. They come from different authorities, are enforced by different people, and satisfying one has no effect on the others. This module shows where they live, how to run the more-stringent test, the six areas where national frameworks characteristically fall short — and why a valid national permit closes no lender finding.",
    lesson: [
      {
        heading: "The mistake this module exists to prevent",
        body: "A project team obtains its environmental approval from the national regulator, files it, and treats the environmental and social question as settled. Months later, an independent consultant produces thirty findings, none of which the permit addressed — several requiring work already built to be modified. Nobody in that team was negligent. They complied with the law they knew applied. The failure was one of scope: they did not know that three further tiers of requirement existed above the one they had satisfied.",
        image: "/images/lm5.jpg",
        caption: "Fully lawful and substantially non-compliant — both can be true at the same time.",
      },
      {
        heading: "Four rulebooks, not one",
        body: "Four distinct bodies of requirement apply simultaneously, from different authorities, enforced by different people:",
        points: [
          "1. National law — statutes, regulations and permit conditions. Enforced by regulators, inspectorates and courts, with criminal and administrative sanction. Protects you from prosecution.",
          "2. Lender standards — the IFC Performance Standards, the EHS Guidelines, and where applicable the AfDB Safeguards. Made contractually binding by the financing agreement; enforced through the IESC, the ESAP and covenants. Protects your disbursement.",
          "3. The project contract — the construction contract, the ESMP and the project's own plans. Enforced by the employer's engineer, with power to instruct and sometimes to suspend. Protects your payment certificate.",
          "4. Good international industry practice — the skill and foresight expected of competent professionals. Applied by the IESC, and if it comes to it, by a court. Protects you when something happens that none of the first three anticipated.",
          "Neither tier displaces another. Both the PS Overview and the EHS Guidelines state the rule: where requirements diverge, the more stringent governs.",
        ],
        image: "/images/esg-governance.jpg",
        caption: "Satisfying one tier has no effect on the other three.",
      },
      {
        heading: "EP4 Principle 3: the two categories of country",
        body: "The Equator Principles are how the Performance Standards reach commercial bank financing, and Principle 3 is the single most consequential provision for anyone working in Africa. It divides the world into Designated Countries (essentially the high-income OECD, where national law is deemed sufficient) and Non-Designated Countries. Every country in Sub-Saharan Africa is Non-Designated. The consequence is not a matter of interpretation: the Performance Standards apply in full, in addition to national law, contractually. A team that has read the national statute and stopped has read about one quarter of what applies to it. And a point of self-respect worth holding: the classification concerns the enforcement environment, not the quality of national legislation — and its practical effect is that communities on these projects receive MORE protection than national law alone would give them, particularly on land and labour. Arguing against it would be arguing for less protection for the people living beside the alignment.",
        image: "/images/course-hero.jpg",
        caption: "Non-Designated status means a higher standard of protection for the people beside the alignment.",
      },
      {
        heading: "The rest of EP4, briefly",
        points: [
          "P1 Categorisation — projects rated A, B or C by potential impact. Most major road and PPP work is Category A, which brings the fullest obligations.",
          "P2 Assessment — proportionate to risk, to the applicable standards, now including climate risk. Why the national EIA is often insufficient in scope.",
          "P4 ESMS and Action Plan — the ESAP that governs your corrective actions exists because of this principle.",
          "P5 Stakeholder engagement — effective and ONGOING. One consultation event at design stage does not satisfy it.",
          "P6 Grievance mechanism — the community GRM you operate is an EP4 obligation as well as a PS1 one.",
          "P7–P9 Independent review and monitoring — the IESC before financial close and throughout construction.",
          "P8 Covenants — the mechanism that converts a standard into money.",
          "P10 Transparency — why documents you consider internal become publicly available.",
        ],
        image: "/images/lm2.jpg",
        caption: "Ten principles — and every one of them eventually reaches the site.",
      },
      {
        heading: "Running the more-stringent test",
        body: "The rule is easy to state and harder to apply, because most people compare two documents and pick the one they prefer. The test asks a different question, in five steps:",
        points: [
          "1. Identify the SPECIFIC requirement — not 'compensation' but 'how is the value of a demolished dwelling calculated'.",
          "2. State what national law requires, with the source: statute, section, permit condition.",
          "3. State what the Performance Standard or EHS Guideline requires, with the paragraph.",
          "4. Ask which outcome is better FOR THE AFFECTED PERSON or the receiving environment — that, not which is easier for the project, is what stringency means.",
          "5. Apply that one, document the comparison, and retain it. The written comparison turns a defensible position into a demonstrable one.",
        ],
        image: "/images/lm9.jpg",
        caption: "Stringency is measured from the affected person's side of the fence.",
      },
      {
        heading: "Three traps everyone falls into",
        points: [
          "'The standards are silent, so national law governs.' Often false: PS5 specifies no valuation METHOD but requires the OUTCOME to equal full replacement cost. Silence on method is not silence on requirement.",
          "'National law is stricter here, so the standard falls away.' The stricter provision governs that one requirement only. A country with a stricter effluent limit still owes everything else in PS3.",
          "'The regulator approved it.' A regulator approves against the only standard it administers. Its approval is conclusive of tier 1 and irrelevant to tier 2 — it has no power to waive standards that were never its to apply.",
          "Field example — night works noise: the national regulation sets one limit day and night; the EHS Guidelines set a substantially lower night limit. The night limit governs. Get it wrong and the works proceed lawfully, generate a stream of grievances, and end in retrospective mitigation at far greater cost.",
        ],
        image: "/images/lm11.jpg",
        caption: "Lawful under the permit, non-compliant under the loan — the most common field misunderstanding.",
      },
      {
        heading: "Gap 1 — the assessment is environmental, not environmental AND social",
        body: "Most national regimes are ENVIRONMENTAL impact assessment regimes: the statute, the schedules and the reviewing authority are oriented to biophysical impact. The lender expects an environmental AND SOCIAL assessment where the social analysis is a full parallel workstream: displacement and land, livelihoods, labour, community health and safety, gender, vulnerable groups, cultural heritage, engagement and grievance. The consequence is structural: a perfectly compliant national EIA can contain no resettlement analysis, no labour risk assessment and no engagement plan. It is not deficient against the law it was written for — it is answering a narrower question. The same is true of engagement: national law requires a participation EVENT (a display period, a hearing); PS1 requires a continuous PROCESS across the project life — which is why a project can hold every permit and have no functioning engagement at the moment it starts affecting people.",
        image: "/images/esg-social.jpg",
        caption: "A statutory hearing at design stage is an event. PS1 requires a process.",
      },
      {
        heading: "Gap 2 — land, compensation and resettlement (the widest and most expensive)",
        points: [
          "Valuation: national practice applies depreciation to structures; PS5 requires full replacement cost with NO deduction, plus transaction costs.",
          "Eligibility: national schemes recognise title holders; PS5 extends to those with recognisable claims AND those with no legal right at all.",
          "Instrument: many jurisdictions require no resettlement plan whatsoever; PS5 requires a RAP or LRP with entitlements, budget, timetable and monitoring.",
          "Cut-off date: rarely defined nationally; PS5 requires one, established and COMMUNICATED.",
          "Livelihoods: national law pays cash once; PS5 requires restoration, monitored to an agreed completion point.",
          "And the one that creates irreversible problems: PS5 requires possession of land only AFTER compensation is available. Paying afterwards remedies the amount, not the breach — the person was deprived of any real choice. Site teams cross this threshold on programme pressure without knowing it exists.",
        ],
        image: "/images/esg-social.jpg",
        caption: "Entering land before payment cannot be corrected retrospectively.",
      },
      {
        heading: "Gap 3 — labour and working conditions",
        points: [
          "Scope: several national statutes define the protected 'worker' narrowly; PS2 draws no distinction and extends to workers engaged by third parties.",
          "Age and hazardous work: national thresholds sit below eighteen for work that is hazardous in practice; ILO Convention 182 (via PS2) covers any person under eighteen. Night work at a crusher is hazardous work whatever the national threshold says.",
          "Worker accommodation: rarely regulated nationally in detail; the IFC/EBRD guidance note governs floor area, sanitation, and separating accommodation from employment.",
          "Worker grievance mechanism: usually not statutory; PS2 requires one, without retaliation, separate from the community channel.",
          "Statutory contributions (pension, social insurance, levies): verify REMITTANCE, not deduction — non-remittance is a legal breach and PS2 evidence simultaneously.",
        ],
        image: "/images/lm13.jpg",
        caption: "PS2 follows every worker on the project — including the labour supplier's.",
      },
      {
        heading: "Gaps 4, 5 and 6 — biodiversity, heritage, cumulative impacts, and numbers",
        points: [
          "Biodiversity: national regimes protect gazetted areas and listed species; PS6 classifies ALL habitat (modified, natural, critical) with progressively stricter requirements and a no-net-loss / net-gain objective that requires quantification. A project can hold every clearance and be sitting in unscreened critical habitat.",
          "Cultural heritage: national law protects declared monuments; PS8 protects tangible and intangible heritage broadly, and the chance find procedure is the operative control — the sites that matter are the ones nobody knew about.",
          "Cumulative impacts: national assessment is project-specific; PS1 requires assessment in combination with other projects and induced development — which on a road corridor routinely produces larger impacts than the road itself.",
          "Numeric limits: compare parameter by parameter, never document by document. Where a national limit is absent, the EHS Guideline fills the space; where both exist, the more stringent applies; a less stringent level needs a full, health-based, documented justification.",
        ],
        image: "/images/esg-environment.jpg",
        caption: "On most projects, at least one parameter is monitored against the weaker limit — a finding waiting to be made.",
      },
      {
        heading: "Closing the gap: supplementary assessment or corrective framing",
        body: "What to do about the gaps depends on one fact: whether construction has started. BEFORE construction, the normal instrument is a supplementary assessment — it does not reopen the national approval; it addresses, to lender scope, what the national instrument did not cover: social impact, resettlement instrument, engagement plan, grievance mechanism, labour assessment, community safety, biodiversity, heritage, cumulative impacts, and a consolidated ESMP. Holding a national EIA plus a supplementary ESIA is normal practice, not failure. AFTER construction has started, the analysis cannot be presented as pre-construction due diligence, because it is not — any competent reviewer sees through that framing and it damages everything else in the submission. The correct posture is corrective: state what occurred, assess what can still be avoided on the remaining works, quantify what must be restored or compensated, and set a time-bound plan with owners. Lenders penalise the disguise, not the fact. And on sequencing: analytical work before approval (counting assets, verifying schedules) is defensible; acts that create facts (paying compensation, taking land, clearing vegetation) are not. Counting is not taking.",
        image: "/images/lm2.jpg",
        caption: "Counting is not taking — the distinction reviewers examine on the dates.",
      },
      {
        heading: "Jurisdiction file: Nigeria",
        body: "Nigeria in one paragraph — the same exercise should be run and documented for every country you work in. Nigerian law requires: an EIA before listed projects (EIA Act, Cap E12 — an environmental statute; it requires no resettlement plan and no engagement plan); NESREA enforcement and sectoral regulations, PLUS state-level agencies with independent powers — a federal approval does not dispose of state requirements; a MINERAL TITLE for extracting laterite, sand or rock (Minerals and Mining Act 2007) — a borrow pit without one is unlawful extraction and an unassessed activity at the same time; compensation on revocation of a right of occupancy (Land Use Act 1978) — directed at unexhausted improvements, not bare land value; core employment protections (Labour Act) with a narrower 'worker' definition than PS2; verified remittance of pension, social insurance and levies; and lawful handling of personal data (NDPA 2023) — which covers your resettlement census and grievance register. What Nigerian law does NOT require: a RAP, full replacement cost without depreciation, eligibility without title, a communicated cut-off date, livelihood restoration, an engagement plan, or a grievance mechanism. All seven exist on a financed Nigerian project because the Performance Standards exist and the financing agreement makes them binding.",
        image: "/images/lm5.jpg",
        caption: "Seven requirements that exist only because the financing agreement says so.",
      },
      {
        heading: "Job aid: the applicable-requirements test",
        body: "Run these six questions whenever someone tells you something is approved, permitted or agreed:",
        points: [
          "1. Which tier is this approval from? A permit is tier 1 — it says nothing about tiers 2, 3 or 4.",
          "2. What exactly does each tier say? Statute section on one side, PS paragraph or EHS table on the other. You cannot run the test on a summary.",
          "3. Which outcome is better for the affected person or the environment? If the honest answer is the standard — apply it, and record the comparison.",
          "4. Is this activity inside the approved assessment scope? New pits, camps, tracks and spoil areas usually are not.",
          "5. Does it need a separate authorisation nobody mentioned? Mineral title, water abstraction, waste carrier licensing, state-level approval.",
          "6. Has anything been done before it was authorised? Establish the dates, characterise the sequence accurately, and separate analysis from acts that created facts.",
          "The sentence to keep: a permit closes a legal question. It does not close a lender finding — and the regulator that issued it has no power to waive a standard it was never given to apply.",
        ],
        image: "/images/lm9.jpg",
        caption: "Six questions that close the gap before an auditor finds it open.",
      },
    ],
    objectives: [
      "Name the four tiers of requirement on a financed project, and say which document each one lives in.",
      "Explain the Designated / Non-Designated distinction under EP4 and its effect in your jurisdiction.",
      "Run the more-stringent test on a concrete requirement and reach a defensible, documented answer.",
      "Identify the six areas where national frameworks characteristically fall short of the Performance Standards.",
      "Explain why a valid national permit closes no lender finding.",
      "Describe what a supplementary assessment is, and when corrective framing is the honest posture.",
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
      {
        heading: "Deep dive — anatomy of a covenant package",
        body: "What do these obligations actually look like in a real facility agreement? Typical shape and numbers:",
        points: [
          "Conditions precedent: 10–20 E&S actions before first drawdown (permits valid, ESMS staffed, grievance mechanism live).",
          "Reporting: monthly or quarterly self-monitoring reports, in a format annexed to the loan.",
          "Incident notification: serious events (fatality, major spill, community conflict) reported within 24–48 hours.",
          "IESC visits: every 6 months is common for Category A/B — with full access to site, records and people.",
          "ESAP: typically 20–40 actions at signing, each with an owner and deadline; progress reviewed at every report.",
          "The lesson: none of this is exotic — it is a calendar of ordinary discipline. Projects fail covenants through neglect, not through impossibility.",
        ],
        image: "/images/lm14.jpg",
        caption: "A covenant package is a calendar of discipline: report, notify, host, close actions.",
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
      {
        heading: "Deep dive — when an incident happens",
        body: "The ESMS is judged in the ten minutes after something goes wrong. The response sequence every worker should know:",
        points: [
          "1 · People first — stop the task, secure the area, give first aid, count heads.",
          "2 · Stop the spread — contain the spill, isolate the energy, close the road; prevent a second victim.",
          "3 · Notify — supervisor immediately; serious events reach management the same day and lenders within 24–48 h (Module 3).",
          "4 · Preserve & investigate — photos, witness notes, then root cause: ask 'why?' five times, past 'human error' to the system gap.",
          "5 · Corrective actions — with owners and deadlines, into the CAR register; verified closed, not just promised.",
          "6 · Share the lesson — tomorrow's toolbox talk tells every crew what was learned; the KPI trend (Module 5) shows if it worked.",
        ],
        image: "/images/lm11.jpg",
        caption: "People → containment → notify → root cause → actions → shared lesson.",
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
      {
        heading: "Deep dive — building the monthly report, step by step",
        body: "How the report actually comes together on a well-run project — a repeatable monthly rhythm:",
        points: [
          "Days 1–25 — site teams fill the daily forms as work happens; nothing is reconstructed later.",
          "Day 26 — the ESG/HSE manager compiles and CHECKS: do hours worked look right? Any outlier begging a question?",
          "Day 27 — the narrative is written: every red or amber number gets its explanation and its corrective action beside it.",
          "Day 28 — the project director reads and signs; accountability means reading before signing.",
          "Submission — to the lenders on the agreed date; late is itself a finding.",
          "Archive — the report and its evidence filed where the IESC can trace every number back to a form. That traceability IS the credibility.",
        ],
        image: "/images/esg-reporting.jpg",
        caption: "Collect daily → compile → explain the reds → sign → submit on time → archive the proof.",
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
    { title: "What is ESG? — and what it is not", icon: "eco", doc: "what-is-esg" },
    { title: "E, S and G on site — the field guide", icon: "description", doc: "esg-impacts-guide" },
    { title: "The mitigation hierarchy & the chain of obligation", icon: "sticky_note_2", doc: "mitigation-hierarchy" },
  ],
  m2: [
    { title: "The four rulebooks & the more-stringent test", icon: "menu_book", doc: "ifc-equator-reference" },
    { title: "Jurisdiction file: Nigeria — law vs lender standards", icon: "gavel", doc: "nigeria-legal" },
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
        title: `${client.clientShort} Code of Conduct`,
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
    title: `${client.clientShort} Code of Conduct`,
    org: client.clientLegal,
    ref: client.codeOfConduct.ref,
    owner: client.codeOfConduct.owner,
    accent: "#6366f1",
    pdf: client.codeOfConduct.pdf,
    acknowledge: true,
    intro:
      `The ethical principles and behavioural standards expected of all ${client.clientShort} employees, contractors, consultants, suppliers and partners, across every operation and project site. It is part of the company's ESMS and is read alongside the ESMS policies and HR Employment Handbook.`,
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
    title: "What is ESG? — and what it is not",
    org: "Module 1 · reading 1 of 3 — start here",
    accent: "#06b6d4",
    image: "/images/esg-environment.jpg",
    intro:
      "ESG stands for Environmental, Social and Governance — the three non-financial dimensions along which a project is judged by banks, insurers, regulators, clients and communities. This reading explains what each pillar means on a construction site, the correction that matters most (E&S is NOT ESG minus the G), where the rules actually came from, and an honest answer to the question everyone asks but rarely out loud.",
    sections: [
      {
        title: "Why this discipline exists — a story that happens more often than the industry admits",
        body: [
          "A contractor opens a borrow pit to win laterite for an embankment. The land is scrubby, apparently unused, and nobody complains at first. Six weeks later the pit is twelve metres deep and full of standing water. Two children drown in it. The community blocks the haul road. Work stops on a fourteen-kilometre section. The lender's monitoring consultant arrives and finds no borrow pit management plan, no closure design, no fencing, no record of any consultation — and no evidence that anyone ever asked who used that land.",
          "The project's technical work was sound. The embankment was well built. But the project had failed anyway, and the failure was expensive: months of delay, a suspended disbursement, a compensation claim, and a story that will follow the contractor into its next tender.",
          "Nothing in that sequence required specialist knowledge to prevent. It required someone to ask, before the first excavator arrived, three ordinary questions: Who uses this land? What happens to this hole when we finish? Who has agreed to this? ESG is the discipline of making sure somebody asks those questions — and that the answers are written down, acted on, and checked.",
        ],
      },
      {
        title: "The three pillars, in site language",
        body: "For most of the twentieth century a company was assessed on one question: does it make money? ESG adds a second, asked with equal seriousness: is that money made in a way that does not destroy things, harm people, or depend on dishonesty?",
        points: [
          "Environmental — our effect on the physical and living world. On a road project: dust over a settlement, silt in a stream, a wetland drained, a borrow pit left open, fuel in the soil, trees cleared without a count.",
          "Social — how we treat the people we employ and the people who live with our impacts: a worker without a harness on a bridge deck, a camp with one latrine for eighty men, a farmer whose field is now a haul road, waiting for a payment.",
          "Governance — whether our systems, records and decisions are honest and verifiable: a payment to accelerate a permit, a safety register filled in on Friday for the whole week, a grievance logged as closed that was never resolved.",
        ],
      },
      {
        title: "The correction that matters most: E&S is not 'ESG minus the G'",
        body: [
          "You will very often hear that E&S is simply ESG without governance. That is wrong, and the mistake causes real confusion. E&S is not a smaller version of ESG — it is a different unit of analysis. ESG assesses an ORGANISATION. E&S assesses a PROJECT. Governance is fully present in both; at project level it appears under different names: management system, organisational capacity, competency, accountability, monitoring, reporting.",
          "IFC Performance Standard 1 requires an Environmental and Social Management System whose elements are: policy; identification of risks and impacts; management programmes; organisational capacity and competency; emergency preparedness and response; stakeholder engagement; and monitoring and review. Read that list again — it is governance, described in project language.",
          "So the honest formulation: E&S is the project-level, contractually binding scope that lenders assess and monitor. ESG is the broader corporate-level lens, much of which is voluntary. Governance runs through both.",
        ],
        example:
          "A useful test: can a company score well on ESG and still fail an E&S audit? Yes — routinely. A contractor may have an excellent published sustainability report and an appalling worker camp. Ratings measure disclosure; audits measure reality.",
      },
      {
        title: "Two more terms you will hear",
        points: [
          "Sustainability and CSR — looser umbrella terms for voluntary initiatives, donations and reporting. Do not confuse a school built as a goodwill gesture with a resettlement obligation owed under a financing agreement: one is a choice, the other is a debt.",
          "HSE / EHS / SHEQ — the safety and environment function most sites already have. It overlaps with E&S but is narrower: it typically stops at the site gate, whereas E&S extends to everyone the project affects — including people who will never set foot on the site.",
        ],
      },
      {
        title: "Where the rules came from: two family trees",
        body: [
          "People often tell the history of ESG as a single story beginning with a UN report in 2004. That is tidy, and misleading, because it merges two lineages that developed separately. The investor lineage: 'Who Cares Wins' (2004) coined the acronym and argued E&S+G factors are financially material; the Principles for Responsible Investment followed in 2006, then ratings and disclosure regimes. Powerful — but mostly not enforceable against a site foreman.",
          "The project finance lineage is the one that reaches your site, and it is older. The World Bank's Operational Policies (1980s–90s) created impact assessment (OP 4.01) and resettlement practice (OP 4.12 — people displaced by a project must be compensated and their livelihoods restored, whether or not they hold legal title). Private banks adopted the Equator Principles in 2003 (EP4 since 2020). The IFC published its Performance Standards in 2006, revised 2012 — the reference benchmark everything else points to.",
          "The Africa lens: the African Development Bank operates its own Integrated Safeguards System, updated in 2023 with ten Operational Safeguards. On co-financed projects you may be assessed against both frameworks — where they differ, the more stringent applies. And a precision worth having: the IFC is a member of the World Bank GROUP, not the World Bank itself. The World Bank lends to governments (its ESF has ten standards); the IFC finances private companies (eight Performance Standards). Knowing which institution finances your project tells you which rulebook you are audited against.",
        ],
      },
      {
        title: "An honest answer to an honest question: is ESG a foreign agenda?",
        body: [
          "This question is asked in every training room on the continent, usually not out loud, and it deserves a straight answer. What is fair in it: the industrial infrastructure of Europe and North America was built without impact assessment, without resettlement standards, and frequently with labour conditions that would today constitute serious violations. That asymmetry is real. So is the capacity cost: standards written in Washington carry assumptions about specialists and data that fall hardest on local contractors.",
          "What is not accurate: the substance is not imported. African states legislated environmental protection on their own authority — Nigeria's EIA regime dates from 1992, Kenya's framework from 1999. The African Development Bank, headquartered in Abidjan, runs its own safeguards. The African Charter on Human and Peoples' Rights (Nairobi, 1981) recognised the right to a satisfactory environment before equivalent European instruments did. And most importantly: the costs of unmanaged impacts are borne locally. The communities of the Niger Delta did not need a Performance Standard to know what happens when extraction proceeds without control — they needed one to be ENFORCED.",
          "The honest position: these standards are a body of accumulated learning about how large projects harm people — much of it paid for by African communities. The legitimate complaint is not that they are too demanding; it is that they arrived late, are applied unevenly, and the capacity to meet them has been under-invested in. The correct response is to build the capacity — which is what this pathway is for.",
        ],
      },
      {
        title: "Six things people believe that are not true",
        points: [
          "“ESG is just public relations.” On a financed project it is a binding contractual condition with money attached — conditions precedent, covenants and disbursement tests are legal instruments.",
          "“ESG slows us down.” Done early it is close to cost-neutral. Done late it becomes rework, stoppage and retrofit — the delay people remember is E&S having been left too late.",
          "“That is the ESG team's job.” The ESG team designs and verifies. It cannot wet a haul road, refuse an unsafe lift, log a grievance honestly or stop a grader at a burial site.",
          "“We comply with national law, so we are fine.” On almost any financed African project: national law PLUS the IFC Performance Standards PLUS the EHS Guidelines, the more stringent prevailing.",
          "“It is the subcontractor's problem.” The finding is recorded against the project. Naming the subcontractor is an explanation, not a defence.",
          "“If we do not write it down, it did not happen.” The opposite is true — an unrecorded incident that surfaces later is treated as concealment, a governance finding of a higher order than the original issue.",
        ],
      },
    ],
    relatedModules: ["m1", "m4", "m3"],
  },

  "esg-impacts-guide": {
    title: "E, S and G on site — the field guide",
    org: "Module 1 · reading 2 of 3",
    accent: "#06b6d4",
    image: "/images/lm3.jpg",
    intro:
      "The three pillars in operational depth: the eight environmental areas you are accountable for, the social requirements that most often stop a project, the four components of governance with what a failure actually costs — and the six actors watching, each holding a different instrument of pressure.",
    sections: [
      {
        title: "E — the eight areas you are accountable for",
        points: [
          "Air quality and dust — haul roads, crushing, earthworks settling on homes, crops and drying food; exhaust from plant (PS3; EHS Guidelines 1.1).",
          "Water — sediment run-off turning a stream brown, concrete washout raising pH, fuel and oil from workshops, untreated camp sewage, over-abstraction from a source a village depends on (PS3; EHS 1.3–1.4).",
          "Noise and vibration — night piling near homes, blasting cracking walls. Sleep disruption is a health impact, not an inconvenience (PS3, PS4; EHS 1.7 sets day AND night limits by receptor).",
          "Land, soil and erosion — stripped slopes gullying in the first heavy rain, topsoil buried instead of stockpiled, contaminated ground at fuel points (PS3, PS1).",
          "Borrow pits and quarries — the single most under-managed issue on African road projects: unlicensed extraction, no closure design, open water bodies, drowning risk, permanent land loss (PS1, PS3, PS4, PS5).",
          "Biodiversity and habitat — clearance without survey, wetlands crossed without hydrological design, critical habitat encountered late, invasive species on plant and imported fill (PS6).",
          "Waste and hazardous materials — used oil poured on roads for dust suppression, bitumen drums reused for drinking water, no segregation, no manifest, no licensed disposal route (PS3; EHS 1.6).",
          "Climate and greenhouse gases — unquantified emissions from plant, haulage, cement and clearance; flood and heat exposure designed for yesterday's climate rather than the asset's design life (PS3; EP4 climate risk assessment).",
        ],
        example:
          "On a coastal section, earthworks ran through the rainy season without silt fencing. Sediment reached a fishing creek; the community reported a collapse in catch and skin complaints among children. The fix — silt fences, check dams, a settlement pond — would have cost a fraction of one percent of the section value and taken four days. What it actually cost: a work stoppage, a corrective action plan, an imposed monitoring programme, and a community relationship that never fully recovered. That gap between prevention cost and failure cost is the entire economic argument for this pathway.",
      },
      {
        title: "S — your workforce (PS2)",
        points: [
          "Written terms of employment, in a language the worker understands; wages in full, on time, without unlawful deduction; hours within limits.",
          "Occupational health and safety through the hierarchy: eliminate, control at source, minimise, and only then PPE. A helmet is the last line of defence, not the strategy.",
          "Freedom of association without interference or retaliation — even where national law restricts it, alternative means to organise must not be restricted.",
          "Non-discrimination in recruitment, pay, training and promotion. Absolute prohibitions on child labour and forced labour (ILO 138/182 and 29/105) — withheld passports, debt bondage and recruitment fees are forced-labour indicators, whatever they are called locally.",
          "Worker accommodation to the IFC/EBRD standard: floor area, sanitation ratios, ventilation, food safety — and accommodation management SEPARATED from employment, so losing a bed does not mean losing the job.",
          "A worker grievance mechanism — separate from the community one, without retaliation, not impeding other remedies.",
          "Contractors and supply chain: PS2 extends to workers engaged by third parties. Subcontracting does not transfer the obligation — it transfers only the work.",
        ],
      },
      {
        title: "S — the communities around you (PS4, PS8)",
        points: [
          "Community health and safety: on a road project the dominant risk is TRAFFIC — construction haulage on public roads kills more people on African road projects than any single on-site hazard. Traffic management, speed governors, banned overtaking zones, driver rotation and school-hours restrictions are not optional refinements.",
          "Labour influx: several hundred workers beside a village of two thousand changes prices, water availability, disease transmission, sexual dynamics and local politics. Predictable and manageable — not an accident.",
          "Sexual exploitation, abuse and harassment: a distinct risk category with its own architecture — a code of conduct signed by every worker, mandatory training, a survivor-centred confidential reporting channel, and a referral pathway that exists BEFORE an incident.",
          "Security and human rights: assess risks, screen for past abuses, train in use of force, provide a grievance channel; where public security forces protect the project, the Voluntary Principles are the operative reference.",
          "Cultural heritage (PS8): a chance find procedure — what happens when a grader exposes a burial, a shrine or an artefact — must exist, be known to the operator, and stop the work.",
        ],
      },
      {
        title: "S — land and livelihoods (PS5): the highest-risk area on almost every road project",
        points: [
          "Compensation at FULL REPLACEMENT COST: market value plus transaction costs, WITHOUT deduction for depreciation. A twenty-year-old house is compensated at the cost of an equivalent NEW house. The most frequently mishandled calculation on the continent.",
          "Possession of land only AFTER compensation has been made available. Entering land before payment is one of the clearest and most serious findings a lender can make.",
          "Eligibility is NOT restricted to title holders: PS5 extends to recognisable claims under national law AND to those with no legal right at all. A cut-off date is established and communicated to fix eligibility.",
          "Livelihoods must be RESTORED, not merely compensated: a trader who loses a roadside stall needs a functioning place to trade, not only a cash sum.",
          "Vulnerable groups (PS1): female-headed households, the elderly, people with disabilities, pastoralists, informal traders. A census at ten in the morning on a market day systematically misses several of these categories — a methodological failure with real consequences.",
        ],
        example:
          "A resettlement census recorded 412 affected households. A verification eight months later found 63 more — almost all women running informal roadside trade and pastoralist families using seasonal grazing. The consequence was not only a compensation shortfall: once a community learns the count was wrong, every subsequent figure the project publishes is disbelieved, including the correct ones.",
      },
      {
        title: "G — the four components, and what a failure actually costs",
        body: "Governance is whether the environmental and social commitments are real or decorative. Four components: ethics and anti-corruption (a facilitation payment is unlawful under most financing agreements even where local practice tolerates it); record integrity (a falsified record is treated MORE seriously than the underlying failure, because it destroys the credibility of every other record); accountability (an E&S manager with no budget and no authority is a documented non-conformity); and speak-up channels (if the first person to use one is identified and punished, the channel is dead and everyone knows it). Forget the myth that one small bribe collapses the loan overnight — the actual mechanism is slower and more sobering:",
        points: [
          "1. Detection — internal audit, a complaint, the supervision engineer, or the lenders' IESC on a site visit.",
          "2. Finding — recorded as a non-conformity with a severity rating; the report goes to the lenders.",
          "3. Corrective action — into the ESAP with a named owner and a deadline. Most issues are resolved here.",
          "4. Escalation — persistent or severe failure triggers formal notice, with a cure period under the financing agreement.",
          "5. Financial consequence — suspended disbursement, additional conditions, and in the extreme an event of default.",
          "The realistic risk is cumulative: a pattern of small failures builds a monitoring record that makes the next disbursement conditional and the next contract unwinnable.",
        ],
      },
      {
        title: "Who cares about ESG — and what each of them can do to you",
        points: [
          "Lenders and investors — withhold a disbursement, impose conditions, require corrective actions at your cost, and in extremis declare default.",
          "Regulators — fines, stop-work notices, permit revocation, criminal prosecution of officers in some jurisdictions.",
          "Communities — block access, escalate to media and civil society, file with a lender's accountability mechanism, litigate.",
          "Client and host government — withhold certification and payment, apply penalties, exclude from future tenders.",
          "Workers — leave, strike, report externally; on a tight labour market, attrition of skilled staff is a direct commercial cost.",
          "Insurers and future clients — price up cover, decline cover, or disqualify at prequalification on past E&S performance.",
          "Only ONE of those six is a regulator. The idea that E&S is a matter between a company and a government agency is thirty years out of date.",
        ],
      },
      {
        title: "What good performance buys",
        points: [
          "Fewer people are harmed — the first reason, and it needs no financial justification.",
          "The money keeps flowing — disbursement is conditional, and meeting E&S conditions is what converts a signed facility into cash.",
          "The programme holds — blockades, stop-work notices and investigations are among the largest AND most preventable sources of delay.",
          "The next contract becomes winnable — E&S performance is now a prequalification criterion on most donor-funded and PPP tenders.",
          "It is cheaper — prevention costs are small, known and budgetable; remediation costs are large, unbudgeted, and arrive with legal and reputational consequences attached.",
        ],
        example:
          "A single construction fatality typically produces: an immediate stoppage, a regulatory investigation, a root-cause investigation, a lender notification, a special report, a corrective action plan, a settlement with the family — and a permanent entry in the incident record disclosed at every future prequalification. The measures that would have prevented it are almost always known, cheap, and already identified in a risk assessment somebody signed.",
      },
    ],
    relatedModules: ["m1"],
  },

  "mitigation-hierarchy": {
    title: "The mitigation hierarchy & the chain of obligation",
    org: "Module 1 · reading 3 of 3 — keep this at your post",
    accent: "#06b6d4",
    image: "/images/lm8.jpg",
    intro:
      "If you remember one technical concept from the whole pathway, make it the mitigation hierarchy — the organising logic of the entire discipline, and the thing auditors most reliably find missing. This reading also traces how a rule travels from a loan agreement in a bank to a specific instruction on your site, who checks, and the five questions to ask before you break ground.",
    sections: [
      {
        title: "The hierarchy: four steps, strictly in order",
        body: "PS1 requires the mitigation hierarchy to be applied to every identified risk and impact — favouring avoidance over minimisation, with compensation or offset only for residual impacts. Worked example: a wetland on the alignment.",
        points: [
          "1 · AVOID — can we design the impact out entirely? Realign the road around the wetland. Always the first question, and the one most often skipped because the alignment is treated as fixed before anyone has looked.",
          "2 · MINIMISE — reduce the crossing width, build a viaduct rather than an embankment, restrict works to the dry season, prohibit night lighting near the water.",
          "3 · RESTORE — reinstate hydrological connectivity, replant native species, regrade and revegetate temporary access.",
          "4 · COMPENSATE / OFFSET — deliver an equivalent gain elsewhere, to a measurable no-net-loss objective. Cash alone is not an offset.",
        ],
      },
      {
        title: "Three rules people get wrong",
        points: [
          "The order is BINDING, not advisory. You may not jump to compensation because it is cheaper or faster — a reviewer will ask what avoidance options were considered and why they were rejected, and expects a documented answer.",
          "It applies to PEOPLE as well as habitats: PS5 opens with a requirement to avoid displacement through alternative designs. Resettlement is step four, not step one — a thirty-metre alignment shift that avoids twelve houses is worth more than any compensation package.",
          "It applies to SAFETY: eliminate the hazard, then engineer controls, then administrative controls, then PPE. If your strategy begins and ends with issuing helmets, you started at step four.",
          "Why the hierarchy really fails: not ignorance, but timing — steps one and two require a decision earlier, by someone more senior. That is why the questions must be asked before the excavator arrives.",
        ],
      },
      {
        title: "The chain of obligation: how a rule reaches your site",
        points: [
          "1 · Lenders — a financing agreement with conditions precedent, E&S covenants, an action plan and reporting obligations.",
          "2 · Borrower / concessionaire — passes obligations into the construction contract, plus a duty to supervise and report.",
          "3 · EPC contractor — turns them into management plans: ESMP, traffic, waste, borrow pits, camp, code of conduct.",
          "4 · Subcontractors and suppliers — flow-down clauses, induction, right of audit.",
          "5 · The individual on site — a specific instruction: wet this haul road, log this grievance, do not enter that land, stop if you uncover a burial.",
          "The obligation flows down but the liability does NOT flow away: if a subcontractor employs a fifteen-year-old, the finding is against the project.",
          "Everything above the last link is a plan. Only what the operator does on the ground is performance — 'ESG is everybody's job' is a structural fact about how the chain terminates, not a slogan.",
        ],
      },
      {
        title: "Who checks — and the rule that decides how you are judged",
        points: [
          "Internal: your own E&S/HSE team — inspections, monitoring, self-monitoring reports to the lenders on a defined cycle.",
          "Client side: the employer's engineer, with authority to instruct and sometimes to suspend.",
          "Lender side: the IESC — appointed by and reporting to the lenders. Not your adviser, not there to help you pass: their function is to give lenders an accurate picture.",
          "Regulators: environmental agency, labour inspectorate, minerals authority, water regulator — independent powers of inspection and sanction.",
          "Communities: the grievance mechanism — and when that fails, the road block, the press, and the DFIs' accountability mechanisms.",
          "THE RULE: a problem you found, recorded and were correcting is evidence of a working system. The identical problem discovered by the IESC, absent from your records, is evidence the system does not work. Same facts — opposite conclusion about your organisation. Disclose.",
        ],
      },
      {
        title: "Case in point: the borrow pit at Km 214",
        body: [
          "You are eleven weeks behind on embankment. Your quarry manager finds a laterite source 800 m from the alignment: it cuts haulage by 19 km and recovers five weeks. A community leader says the land is unused, asks for two million naira to the community development committee, and offers to sign a consent letter. There is no management plan, the site is not in the approved ESIA, a seasonal stream runs 120 m east, and the minerals office takes eight weeks to issue a permit. The IESC visits in six weeks.",
          "Run the framework: step one of the hierarchy is not 'how do we manage this pit' but 'do we NEED this pit' — an already-permitted source, a commercial quarry, reused cut material. 'Uncultivated' is a claim, not a finding: scrubland is grazed, gathered, crossed and held sacred — none of which appears in one visit with the person who wants the payment. The lump-sum payment is not compensation: PS5 entitlements are calculated per affected person and paid directly; a community benefit is a separate, transparent negotiation, never a substitute. The consent letter is worth less than nothing — in a dispute it proves the project knew consent was required and chose the cheapest route to it.",
          "Nobody in this scenario is a bad actor. Almost every serious E&S failure looks exactly like this from the inside: individually reasonable decisions, under real pressure, by people who were not asked the question that mattered. That is why the framework exists as standing requirements rather than individual judgement.",
        ],
      },
      {
        title: "Job aid: five questions before you break ground",
        points: [
          "1 · Is this activity, at this location, inside the assessed and approved scope? New pits, camps, access tracks and spoil areas are usually the answer — and usually no. If unclear: stop, screen, notify.",
          "2 · Who USES this land, and how do I know? Not who owns it. Ask women, pastoralists and youth separately, away from whoever benefits from the answer. An informal user is still an affected person under PS5.",
          "3 · What is the impact, and have I applied the hierarchy IN ORDER — with what I rejected at each step written down?",
          "4 · What happens to this when we finish? Design the closure NOW — a pit designed only for maximum yield cannot be safely closed at any price.",
          "5 · If the IESC asked me today, could I show the record? The permit, the plan, the consultation record, the grievance log, the monitoring data.",
          "And the rule that overrides all five: if you find a problem, DISCLOSE it.",
        ],
      },
    ],
    relatedModules: ["m1"],
  },

  "ifc-equator-reference": {
    title: "The four rulebooks & the more-stringent test",
    org: "Module 2 · reading 1 of 2",
    accent: "#f59e0b",
    image: "/images/lm5.jpg",
    intro:
      "On a financed infrastructure project, four distinct bodies of requirement apply simultaneously — and satisfying one has no effect on the others. This reference explains the four tiers, the EP4 rule that decides which standards apply in Africa, how to run the more-stringent test properly, and the six areas where national frameworks characteristically fall short.",
    sections: [
      {
        title: "Four rulebooks, not one",
        points: [
          "Tier 1 · National law — statutes, regulations and permit conditions, enforced by regulators and courts with criminal and administrative sanction. Protects you from prosecution.",
          "Tier 2 · Lender standards — the IFC Performance Standards, the WBG EHS Guidelines, and where applicable the AfDB Safeguards; incorporated by reference into the financing agreement and enforced through the IESC, the ESAP and covenants. Protects your disbursement.",
          "Tier 3 · The project contract — the construction contract, the ESMP and the project's own plans, enforced by the employer's engineer with power to instruct and sometimes suspend. Protects your payment certificate.",
          "Tier 4 · Good international industry practice — the skill and foresight expected of competent professionals, applied by the IESC and, if it comes to it, a court. Protects you when something happens that none of the first three anticipated.",
          "Neither tier displaces another: the PS Overview requires compliance with national law IN ADDITION to the standards, and the EHS Guidelines expect whichever level is MORE STRINGENT to be achieved.",
        ],
      },
      {
        title: "EP4 Principle 3: the two categories of country",
        body: [
          "The Equator Principles are how the Performance Standards reach commercial bank financing, and Principle 3 is the single most consequential provision for anyone working in Africa. It divides the world into Designated Countries — essentially the high-income OECD, where national law is deemed to deliver equivalent protection — and Non-Designated Countries. Every country in Sub-Saharan Africa is Non-Designated.",
          "The consequence is direct and non-negotiable: on an EP-financed project, the applicable standard is host country law TOGETHER WITH the IFC Performance Standards and the WBG EHS Guidelines. A team that has read the national statute and stopped there has read about one quarter of what applies to it.",
          "A point of self-respect as well as compliance: the classification concerns the ENFORCEMENT environment, not the substance of national legislation — Nigeria's assessment statute is not weaker than a French one in what it requires; the gap is in resourcing and consistency of enforcement. And the practical effect of Non-Designated status is that communities receive MORE protection than national law alone would give them, particularly on land and labour.",
        ],
      },
      {
        title: "The rest of EP4, briefly",
        points: [
          "P1 Categorisation — A, B or C by magnitude of risk. Most major road and PPP work is Category A, with the fullest obligations.",
          "P2 Assessment — proportionate to risk, to the applicable standards, including climate risk for defined categories.",
          "P4 ESMS and Action Plan — the ESAP that governs your corrective actions exists because of this principle.",
          "P5 Stakeholder engagement — effective and ONGOING; one consultation event at design stage does not satisfy it.",
          "P6 Grievance mechanism — the community GRM is an EP4 obligation as well as a PS1 one.",
          "P7 & P9 Independent review and monitoring — the IESC before financial close and throughout the loan.",
          "P8 Covenants — the mechanism that converts a standard into money.",
          "P10 Reporting — why documents you consider internal become publicly available.",
        ],
      },
      {
        title: "Running the more-stringent test — five steps",
        points: [
          "1 · Identify the SPECIFIC requirement. Not 'compensation' — 'how is the value of a demolished dwelling calculated'.",
          "2 · State what national law requires, with the source: statute, section, regulation or permit condition.",
          "3 · State what the Performance Standard or EHS Guideline requires, with the paragraph.",
          "4 · Ask which outcome is better FOR THE AFFECTED PERSON or the receiving environment — that, not which is easier for the project, is what stringency means.",
          "5 · Apply that one, document the comparison, and retain it. The written comparison turns a defensible position into a demonstrable one.",
        ],
      },
      {
        title: "Three traps",
        points: [
          "“The standards are silent, so national law governs.” Often false: PS5 specifies no valuation method but requires the OUTCOME to equal full replacement cost. Silence on method is not silence on requirement.",
          "“National law is stricter here, so the standard falls away.” The stricter provision governs that requirement only — a stricter effluent limit does not disapply the rest of PS3.",
          "“The regulator approved it.” A regulator approves against the only standard it administers. Its approval is conclusive of tier 1 and irrelevant to tier 2 — it has no power to waive standards that were never its to apply.",
        ],
        example:
          "Night works on an urban section: the national regulation sets one noise limit with no day/night distinction; the EHS Guidelines set a substantially lower night-time limit by receptor type. The night limit governs. Get it wrong and the works proceed lawfully, generate a stream of grievances, and end in a finding requiring retrospective mitigation at far greater cost.",
      },
      {
        title: "The six gaps where national frameworks fall short",
        points: [
          "1 · Scope of assessment — national regimes are ENVIRONMENTAL; lenders expect environmental AND SOCIAL, with displacement, labour, community safety, gender and engagement as full workstreams. A compliant national EIA can contain none of these.",
          "2 · Land and resettlement — the widest gap: depreciation applied vs full replacement cost; title holders only vs occupants without title; no statutory resettlement plan vs RAP/LRP; no cut-off date; cash once vs livelihood restoration. And the irreversible one: possession only AFTER compensation.",
          "3 · Labour — narrow 'worker' definitions vs PS2's third-party coverage; national age thresholds vs ILO 182 (hazardous work under eighteen); accommodation standards; worker grievance mechanism; verify REMITTANCE of contributions, not deduction.",
          "4 · Engagement — national law requires a participation EVENT (display, hearing); PS1 requires a continuous PROCESS with a stakeholder plan, local-language disclosure and a grievance mechanism through construction, when grievances actually arise.",
          "5 · Biodiversity, heritage, cumulative impacts — PS6 classifies ALL habitat with a no-net-loss objective; PS8 requires a chance find procedure; PS1 requires cumulative assessment — induced development along a corridor routinely outweighs the road itself.",
          "6 · Numeric limits — compare parameter by parameter, never document by document; where a national limit is absent, the EHS Guideline fills the space; a less stringent level needs a full, health-based, documented justification.",
        ],
      },
      {
        title: "Closing the gap: supplementary assessment, or corrective framing",
        body: [
          "Before construction: the normal instrument is a SUPPLEMENTARY ASSESSMENT — it does not reopen the national approval; it addresses, to lender scope, what the national instrument did not cover: social impact, a resettlement instrument, an engagement plan and grievance mechanism, labour and community-safety assessments, biodiversity, heritage, cumulative impacts, and a consolidated ESMP. Holding a national EIA plus a supplementary ESIA is normal, expected practice — not a sign of failure.",
          "After construction has started: the analysis cannot be presented as pre-construction due diligence, because it is not — any competent reviewer sees through that framing, and it converts technical findings into a credibility finding about the whole E&S function. The correct posture is CORRECTIVE: state what occurred, assess what can still be avoided on the remaining works, quantify what must be restored or compensated, and set a time-bound plan with named owners. Lenders penalise the disguise, not the fact.",
          "On sequencing, the distinction reviewers examine on the dates: analytical work before approval (enumerating assets, verifying schedules) is generally defensible. Acts that create legal or physical facts (paying compensation, taking possession, clearing vegetation) are not. Counting is not taking.",
        ],
      },
    ],
    relatedModules: ["m2"],
  },

  "nigeria-legal": {
    title: "Jurisdiction file: Nigeria — and the applicable-requirements test",
    org: "Module 2 · reading 2 of 2",
    accent: "#f59e0b",
    image: "/images/lm5.jpg",
    intro:
      "Nigeria in operational depth — the environmental, land and labour tiers, what Nigerian law requires and what it does not — plus the one-page test to run whenever someone tells you something is approved, permitted or agreed. The method matters more than the content: the same file should be built for every country you operate in.",
    sections: [
      {
        title: "The environmental tier",
        points: [
          "EIA Act, Cap E12 (originally Decree 86 of 1992) — an environmental impact assessment before listed projects, administered by the Federal Ministry of Environment. Note the scope: it is an ENVIRONMENTAL statute — it requires no resettlement plan, no engagement plan, no labour assessment.",
          "NESREA Act 2007 — the national enforcement agency and its sectoral regulations, including the Construction Sector Regulations 2011 (oil and gas sits outside NESREA's remit, under separate regulators).",
          "State environmental agencies — independent powers in every state: a federal approval does NOT dispose of state requirements, and a corridor crossing several states must establish the position state by state.",
          "Minerals and Mining Act 2007 — frequently missed and directly relevant: extracting laterite, sand, gravel or rock requires a mineral title from the Mining Cadastre Office. A borrow pit without one is unlawful extraction (tier 1) and an unassessed activity (tier 2) at the same time. A landowner's consent does not confer a mineral right.",
          "Climate Change Act 2021 — national climate governance architecture, with obligations on larger entities.",
        ],
      },
      {
        title: "The land tier",
        points: [
          "Land Use Act 1978 — vests all land in each state's Governor, held in trust. Compensation on revocation of a right of occupancy is directed at UNEXHAUSTED IMPROVEMENTS — crops and structures — not the market value of bare land.",
          "Against PS5 this produces every sub-gap in the book: depreciation applied to structures, and occupants without a certificate of occupancy — frequently the MAJORITY of those affected on a road corridor — outside the statutory scheme.",
          "No Nigerian statute requires a Resettlement Action Plan. Where a RAP exists on a Nigerian project, it exists because a lender required it. Its absence is simultaneously NOT a breach of Nigerian law AND a red-flag non-conformity under PS5 — both statements are true at once.",
        ],
      },
      {
        title: "The labour and social tier",
        points: [
          "Labour Act, Cap L1 — core protections, with a 'worker' definition narrower than the PS2 concept and exemptions on young persons for family and agricultural undertakings.",
          "Child Rights Act 2003 — defines a child as under eighteen, but it is federal legislation requiring STATE-level adoption, which has been uneven: verify per state. PS2 and ILO 182 apply uniformly regardless.",
          "Employee's Compensation Act 2010 (NSITF), Pension Reform Act 2014, training levy, housing fund — verify REMITTANCE, not deduction: non-remittance is a tier 1 breach and PS2 evidence simultaneously.",
          "Collective agreements through the joint industrial council — PS2 expressly requires terms consistent with applicable collective agreements.",
          "Nigeria Data Protection Act 2023 — directly engaged by resettlement censuses, grievance registers, worker records and community photography: lawful basis, retention, security and data-subject rights apply to files projects historically treated as ordinary paperwork.",
        ],
      },
      {
        title: "The Nigeria position in one paragraph",
        body: "Nigerian law requires: an EIA before listed projects, a mineral title for extraction, compensation on revocation of occupancy rights, core employment protections, statutory contributions, and lawful handling of personal data. It does NOT require: a resettlement action plan, full replacement cost without depreciation, eligibility for occupants without title, a communicated cut-off date, livelihood restoration, a stakeholder engagement plan, or a grievance mechanism. Every one of those seven requirements exists on a financed Nigerian project — and every one exists because the Performance Standards exist and the financing agreement makes them binding.",
      },
      {
        title: "Around the region — same method, different statutes",
        points: [
          "Ghana — EPA assessment regime; Land Act 2020. Customary and stool land tenure sits alongside the statutory regime and must be mapped before any land access.",
          "Kenya — EMCA 1999 (NEMA); Land Act 2012 with the National Land Commission. The 2010 Constitution's environmental right and participation obligations are actively litigated.",
          "Senegal — Code de l'environnement; the national domain regime means much occupied land is untitled, sharply raising the PS5 eligibility gap.",
          "Côte d'Ivoire — Code de l'environnement (Loi 96-766); the purge of customary rights operates on fixed values generally BELOW full replacement cost.",
          "Tanzania — Environmental Management Act 2004; Land Act and Village Land Act 1999: the relevant land authority is often the village council.",
          "Best practice: a one-page jurisdiction file per country, owned by a named person, dated, reviewed annually. It takes a day to build and removes an entire class of avoidable error.",
        ],
      },
      {
        title: "Job aid: the applicable-requirements test",
        body: "Run these six questions whenever someone tells you something is approved, permitted or agreed:",
        points: [
          "1 · Which tier is this approval from? A permit is tier 1 — it says nothing about tiers 2, 3 or 4. Do not record the matter as closed.",
          "2 · What exactly does each tier say? Statute section on one side, PS paragraph or EHS table on the other. You cannot run the test on a summary.",
          "3 · Which outcome is better for the affected person or the environment? If the honest answer is the standard — apply it, and record the comparison.",
          "4 · Is this activity inside the approved assessment scope? New pits, camps, tracks and spoil areas usually are not.",
          "5 · Does it need a separate authorisation nobody mentioned? Mineral title, water abstraction, waste carrier licensing, state-level approval.",
          "6 · Has anything been done before it was authorised? Establish the dates; separate analytical activity from acts that created facts.",
          "The sentence to keep: a permit closes a legal question. It does not close a lender finding — and the regulator that issued it has no power to waive a standard it was never given to apply.",
        ],
      },
    ],
    relatedModules: ["m2"],
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
      // ——— E.1 Multiple choice, single answer (14 in bank, 5 served) ———
      {
        "fmt": "mcq", "difficulty": "easy", "tag": "Pillars",
        "prompt": "Which of these is a GOVERNANCE failure, rather than Environmental or Social?",
        "options": [
          "A safety register completed on Friday for the whole week",
          "Sediment run-off reaching a stream",
          "One latrine for eighty men in a worker camp",
          "Night piling next to homes"
        ],
        "correct": 0,
        "tip": "The failure is in the integrity of the record, not in what the record describes. The others are E or S impacts."
      },
      {
        "fmt": "mcq", "difficulty": "easy", "tag": "E&S vs ESG",
        "prompt": "E&S is best described as…",
        "options": [
          "The project-level scope lenders assess and monitor contractually",
          "ESG with the Governance pillar removed",
          "A voluntary corporate reporting framework",
          "The site HSE function under another name"
        ],
        "correct": 0,
        "tip": "Governance is fully present at project level — as management system, capacity, monitoring and review. And E&S reaches beyond the site gate, unlike HSE."
      },
      {
        "fmt": "mcq", "difficulty": "medium", "tag": "E&S vs ESG",
        "prompt": "ESG assesses a ______ and E&S assesses a ______.",
        "options": [
          "Company; project",
          "Project; company",
          "Regulator; lender",
          "Country; company"
        ],
        "correct": 0,
        "tip": "The unit of analysis is what separates the two terms — not the number of pillars."
      },
      {
        "fmt": "mcq", "difficulty": "hard", "tag": "E&S vs ESG",
        "prompt": "Can a company score well on ESG and still fail an E&S audit?",
        "options": [
          "Yes, routinely — ratings measure disclosure; audits measure site reality",
          "No, since ESG includes E&S",
          "Only if the rating agency made an error",
          "Only on Category C projects"
        ],
        "correct": 0,
        "tip": "A contractor may publish an excellent sustainability report and run an appalling worker camp."
      },
      {
        "fmt": "mcq", "difficulty": "easy", "tag": "The rules",
        "prompt": "Under EP4, Nigeria, Ghana, Kenya and Senegal are…",
        "options": [
          "Non-Designated Countries",
          "Designated Countries",
          "Exempt from the Equator Principles",
          "Classified case by case per project"
        ],
        "correct": 0,
        "tip": "Non-Designated status is what brings the Performance Standards into full application, on top of national law."
      },
      {
        "fmt": "mcq", "difficulty": "medium", "tag": "The rules",
        "prompt": "The IFC is…",
        "options": [
          "The private sector arm of the World Bank Group",
          "A department of the World Bank lending to governments",
          "An agency of the United Nations",
          "The body that licenses national regulators"
        ],
        "correct": 0,
        "tip": "The World Bank lends to governments under the ESF. The IFC finances companies under the Performance Standards."
      },
      {
        "fmt": "mcq", "difficulty": "easy", "tag": "The rules",
        "prompt": "The Equator Principles were first adopted in 2003. The IFC Performance Standards were first issued in…",
        "options": [
          "2006, and revised in 2012",
          "2004, following the Who Cares Wins report",
          "1992, with the first EIA laws",
          "2020, with EP4"
        ],
        "correct": 0,
        "tip": "Who Cares Wins (2004) is an investor text — it coined 'ESG' but is not the source of project finance standards."
      },
      {
        "fmt": "mcq", "difficulty": "easy", "tag": "Hierarchy",
        "prompt": "The mitigation hierarchy, in order, is…",
        "options": [
          "Avoid, minimise, restore, compensate",
          "Assess, mitigate, monitor, report",
          "Plan, do, check, act",
          "Compensate, restore, minimise, avoid"
        ],
        "correct": 0,
        "tip": "'Assess–mitigate–monitor–report' describes a management cycle, not the hierarchy. And the order is binding, never reversed."
      },
      {
        "fmt": "mcq", "difficulty": "medium", "tag": "Hierarchy",
        "prompt": "Applied to occupational safety, the mitigation hierarchy means…",
        "options": [
          "Eliminate the hazard first; personal protective equipment last",
          "Issue correct PPE first; engineer controls if budget allows",
          "Train workers first, then assess the hazard",
          "Insure the risk, then reduce it"
        ],
        "correct": 0,
        "tip": "A safety strategy that begins with helmets has started at step four."
      },
      {
        "fmt": "mcq", "difficulty": "hard", "tag": "Hierarchy",
        "prompt": "You may move to compensation before avoidance…",
        "options": [
          "Never — unless avoidance has been considered and documented as not feasible",
          "Whenever compensation costs less than redesign",
          "When the client approves the payment",
          "When construction has already started"
        ],
        "correct": 0,
        "tip": "Cost is a factor within feasibility. It is not a licence to skip a step — and the reviewer will ask for the documented comparison."
      },
      {
        "fmt": "mcq", "difficulty": "easy", "tag": "Chain of obligation",
        "prompt": "In the chain of obligation, requirements originate with…",
        "options": [
          "The lenders, through the financing agreement",
          "The site HSE team",
          "The national regulator",
          "The subcontractors' method statements"
        ],
        "correct": 0,
        "tip": "The HSE team implements requirements — it does not create them. They flow down from the financing agreement."
      },
      {
        "fmt": "mcq", "difficulty": "medium", "tag": "Chain of obligation",
        "prompt": "Why does the LAST link in the chain — the person on site — matter most?",
        "options": [
          "Only what happens on the ground is performance; everything above is a plan",
          "Site staff carry personal legal liability for every breach",
          "The last link writes the monitoring reports",
          "Lenders only ever inspect the site level"
        ],
        "correct": 0,
        "tip": "Personal liability exists in some jurisdictions, but that is not why the last link matters. Plans only become performance at the ground."
      },
      {
        "fmt": "mcq", "difficulty": "medium", "tag": "Law vs standards",
        "prompt": "A twenty-two year old house must be demolished for the road. It is compensated at…",
        "options": [
          "The cost of an equivalent new structure, no depreciation, plus transaction costs",
          "Market value less depreciation for age and condition",
          "The rateable value in the state valuation schedule",
          "A goodwill amount agreed with the community leader"
        ],
        "correct": 0,
        "tip": "Depreciated valuation is standard national practice — and it is exactly the gap PS5's full replacement cost closes."
      },
      {
        "fmt": "mcq", "difficulty": "hard", "tag": "Governance",
        "prompt": "Which statement about the consequences of a governance failure is most accurate?",
        "options": [
          "It normally enters a defined process: finding, corrective action, escalation, financial consequence if uncured",
          "Any bribe triggers immediate default across the loan",
          "It is a matter for internal discipline and does not concern lenders",
          "It only matters if a regulator becomes involved"
        ],
        "correct": 0,
        "tip": "Overstating the consequence is counterproductive. The realistic risk is cumulative, not catastrophic — a record that makes the next disbursement conditional."
      },
      // ——— E.2 Multiple response (5 in bank, 2 served) ———
      {
        "fmt": "multi", "type": "multi", "difficulty": "medium", "tag": "ESMS",
        "prompt": "Which of these are elements of the management system PS1 requires? Select all that apply.",
        "options": [
          "Policy",
          "Organisational capacity and competency",
          "Monitoring and review",
          "A published sustainability report",
          "An ESG rating from an external agency",
          "Emergency preparedness and response"
        ],
        "correct": [0, 1, 2, 5],
        "tip": "An external rating measures disclosure at company level — no standard requires one. And emergency preparedness IS one of the seven elements; on a construction project it is among the most consequential."
      },
      {
        "fmt": "multi", "type": "multi", "difficulty": "medium", "tag": "Hierarchy",
        "prompt": "A settlement lies 40 m from a proposed crusher. Which of these are STEP ONE — avoidance — rather than later steps? Select all that apply.",
        "options": [
          "Relocate the crusher to a site 2 km away",
          "Source aggregate from an existing commercial quarry",
          "Install acoustic screening around the crusher",
          "Restrict crushing to daytime hours",
          "Redesign the pavement to reduce aggregate demand",
          "Compensate affected households for noise disturbance"
        ],
        "correct": [0, 1, 4],
        "tip": "Screening and daytime hours are legitimate — and they are step two, minimisation: they reduce the impact rather than removing it. Compensation is step four."
      },
      {
        "fmt": "multi", "type": "multi", "difficulty": "medium", "tag": "Chain of obligation",
        "prompt": "Which of these can result in a finding recorded against YOUR project? Select all that apply.",
        "options": [
          "A labour supplier withholding passports from its workers",
          "A quarry operator supplying you without an extraction licence",
          "A subcontractor's uninsured vehicle injuring a pedestrian on your haul route",
          "A neighbouring farmer burning crop residue",
          "A community member's unrelated land dispute with the state",
          "Your catering contractor's kitchen failing a hygiene inspection"
        ],
        "correct": [0, 1, 2, 5],
        "tip": "The farmer and the land dispute arise neither from the project nor from a party engaged by it. Over-inclusion is a real error too: treat every local issue as your finding and you lose the ability to prioritise the ones that are."
      },
      {
        "fmt": "multi", "type": "multi", "difficulty": "hard", "tag": "Law vs standards",
        "prompt": "Your project holds a valid national environmental permit. Which of these questions does that permit leave OPEN? Select all that apply.",
        "options": [
          "Whether compensation was calculated at full replacement cost",
          "Whether occupants without title were included in the register",
          "Whether the project complies with the national EIA statute",
          "Whether a worker grievance mechanism exists",
          "Whether habitat classification was screened under PS6",
          "Whether the environmental fee was paid to the regulator"
        ],
        "correct": [0, 1, 3, 4],
        "tip": "The EIA statute and the fee are the only questions the permit actually answers. Every other option sits in a tier the regulator does not administer."
      },
      {
        "fmt": "multi", "type": "multi", "difficulty": "hard", "tag": "Disclosure",
        "prompt": "Which of these make a DISCLOSED finding better received than a discovered one? Select all that apply.",
        "options": [
          "It shows the detection mechanism works",
          "It shows escalation happened",
          "It shows corrective action was already under way",
          "It reduces the technical severity of the underlying issue",
          "It means the finding will not appear in the report",
          "It preserves confidence in the project's other records"
        ],
        "correct": [0, 1, 2, 5],
        "tip": "Disclosure does not reduce severity and does not remove the finding from the report — believing it does is why teams conceal. What it changes is the conclusion drawn about the organisation."
      },
      // ——— E.3 Sequencing (3 in bank, 1 served) ———
      {
        "fmt": "order", "type": "order", "difficulty": "medium", "tag": "Hierarchy",
        "prompt": "A borrow pit will remove seasonal grazing land. Put these in the required order.",
        "items": [
          "Use an existing licensed quarry instead",
          "Reduce the pit footprint and avoid the main grazing corridor",
          "Reinstate and revegetate the pit on completion",
          "Compensate the herders for the loss of grazing"
        ],
        "tip": "Avoid, minimise, restore, compensate — and this is a SOCIAL impact: the hierarchy applies identically. PS5 requires displacement to be avoided through alternative designs before compensation is considered."
      },
      {
        "fmt": "order", "type": "order", "difficulty": "easy", "tag": "Chain of obligation",
        "prompt": "Put the chain of obligation in order — from where a requirement originates to where it is performed.",
        "items": [
          "The financing agreement between lenders and borrower",
          "The construction contract between borrower and contractor",
          "The EPC contractor's management plans",
          "The subcontract with the earthworks company",
          "The plant operator wetting the haul road"
        ],
        "tip": "Obligations flow down this chain. Liability does not flow back up it."
      },
      {
        "fmt": "order", "type": "order", "difficulty": "hard", "tag": "Disclosure",
        "prompt": "You discover an unrecorded diesel spill at a fuel point. Put these in a sensible order.",
        "items": [
          "Make the area safe and stop the source",
          "Record it in the incident register",
          "Notify the engineer and your E&S lead",
          "Sample the soil and define the extent",
          "Investigate the cause and define corrective action"
        ],
        "tip": "Making safe always comes first. Recording BEFORE notifying matters: a notification without a register entry reads as reconstruction after the fact."
      },
      // ——— E.4 Categorisation (4 in bank, 2 served) ———
      {
        "fmt": "cat", "type": "categorize", "difficulty": "medium", "tag": "Pillars",
        "prompt": "Sort each situation into Environmental, Social or Governance.",
        "categories": [
          { "id": "e", "label": "Environmental" },
          { "id": "s", "label": "Social" },
          { "id": "g", "label": "Governance" }
        ],
        "items": [
          { "id": "piling", "text": "Night piling near homes", "cat": "e" },
          { "id": "grievance", "text": "A grievance logged as closed that was never resolved", "cat": "g" },
          { "id": "favours", "text": "A supervisor demanding favours for shifts", "cat": "s" },
          { "id": "drums", "text": "Bitumen drums reused for drinking water", "cat": "e" },
          { "id": "gift", "text": "A gift accepted from a supplier during tender", "cat": "g" },
          { "id": "school", "text": "A haul route past a school at closing time", "cat": "s" },
          { "id": "seeds", "text": "Invasive seeds carried in on imported fill", "cat": "e" }
        ],
        "tip": "The drums are Environmental as a contamination pathway — and they also raise community health under PS4. Real issues rarely sit in one pillar."
      },
      {
        "fmt": "cat", "type": "categorize", "difficulty": "medium", "tag": "Hierarchy",
        "prompt": "Avoidance — or something later in the hierarchy?",
        "categories": [
          { "id": "avoid", "label": "Avoidance (step 1)" },
          { "id": "later", "label": "Later step" }
        ],
        "items": [
          { "id": "shift", "text": "Shift the alignment 30 m to miss twelve houses", "cat": "avoid" },
          { "id": "pay", "text": "Pay full replacement cost for the twelve houses", "cat": "later" },
          { "id": "bridge", "text": "Choose a bridge over an embankment across the wetland", "cat": "later" },
          { "id": "spur", "text": "Delete a spur road that serves no traffic demand", "cat": "avoid" },
          { "id": "water", "text": "Water the haul road to suppress dust", "cat": "later" },
          { "id": "fund", "text": "Fund restoration of an equivalent wetland", "cat": "later" }
        ],
        "tip": "The bridge is frequently miscategorised: it reduces the footprint and the hydrological interruption, but it does not remove the crossing — minimisation, not avoidance."
      },
      {
        "fmt": "cat", "type": "categorize", "difficulty": "hard", "tag": "Law vs standards",
        "prompt": "Does national compliance SETTLE this — or is the lender standard still open?",
        "categories": [
          { "id": "settled", "label": "Settled" },
          { "id": "open", "label": "Standard still open" }
        ],
        "items": [
          { "id": "permit", "text": "Environmental permit obtained for the alignment", "cat": "open" },
          { "id": "depr", "text": "Compensation paid per the state schedule, with depreciation", "cat": "open" },
          { "id": "fees", "text": "Environmental fees paid to the regulator", "cat": "settled" },
          { "id": "register", "text": "Register limited to certificate-of-occupancy holders", "cat": "open" },
          { "id": "licence", "text": "Extraction licence obtained for a borrow pit — is its SCOPE assessed?", "cat": "open" },
          { "id": "hearing", "text": "Public hearing held at design stage", "cat": "open" }
        ],
        "tip": "The extraction licence settles the LEGAL question and says nothing about whether the pit sits inside the assessed scope — the standard stays open. The fee is the one card the regulator fully answers."
      },
      {
        "fmt": "cat", "type": "categorize", "difficulty": "medium", "tag": "Chain of obligation",
        "prompt": "Who enforces this — the regulator, or the lenders?",
        "categories": [
          { "id": "lenders", "label": "The lenders" },
          { "id": "regulator", "label": "The regulator" }
        ],
        "items": [
          { "id": "cp", "text": "Conditions precedent to first disbursement", "cat": "lenders" },
          { "id": "stopwork", "text": "A stop-work notice for unlicensed extraction", "cat": "regulator" },
          { "id": "esap", "text": "The Environmental and Social Action Plan", "cat": "lenders" },
          { "id": "fine", "text": "A fine for exceeding a permitted effluent limit", "cat": "regulator" },
          { "id": "iesc", "text": "A finding raised by the independent consultant", "cat": "lenders" },
          { "id": "prosecution", "text": "Prosecution of an officer for falsified monitoring returns", "cat": "regulator" }
        ],
        "tip": "Both routes can be triggered by one event: an unlicensed pit produces a regulator's notice AND a lender's finding from a single omission."
      },
      // ——— E.5 Visual / tap (2 in bank, 1 served) ———
      {
        "fmt": "tap", "type": "diagramtap", "difficulty": "medium", "tag": "Spot the site",
        "prompt": "Five things seen on one site. Four are findings — tap the ONE that is NOT a finding.",
        "boxes": [
          "An unfenced flooded excavation beside a footpath",
          "A fuel drum on bare ground, no bund",
          "A worker at height without fall protection",
          "A water bowser suppressing dust beside housing",
          "A skip of mixed, unsegregated waste"
        ],
        "correct": 3,
        "hint": "Not everything on a site is a finding.",
        "tip": "Dust suppression beside housing is exactly what is expected — a compliant control. The other four are findings under PS4, PS3, PS2 and PS3 respectively."
      },
      {
        "fmt": "tap", "type": "diagramtap", "difficulty": "hard", "tag": "The borrow pit file",
        "prompt": "A proposed borrow pit's file contains: the national environmental approval, a landowner's consent letter, and the construction contract with ESMP. All four documents below are missing — tap the one whose absence breaks the LAW and the STANDARDS at the same time.",
        "boxes": [
          "Extraction / mineral title from the minerals authority",
          "Pit management and closure plan",
          "Screening confirming the pit is inside the assessed scope",
          "Independent record of who uses the land"
        ],
        "correct": 0,
        "hint": "One of these is a criminal matter as well as a lender finding.",
        "tip": "Without a mineral title, extraction is unlawful under national law AND the pit is an unassessed activity under PS1 — two findings from one omission. The other three are serious lender findings. And note: the consent letter in the file is worth less than it looks — one signature from one interested party is not a consultation record."
      },
      // ——— E.6 Scenario, best first action (2 in bank, 1 served) ———
      {
        "fmt": "scenario", "difficulty": "hard", "tag": "Scenario — Km 214",
        "prompt": "You are eleven weeks behind on embankment. Your quarry manager finds a laterite source 800 m off the alignment that would recover five weeks. A community leader says the land is unused, offers a letter of consent, and asks for a payment to the community development committee. The site is not in the approved assessment. The IESC visits in six weeks. What do you do FIRST?",
        "options": [
          "Establish who actually uses the land, independently of the leader, before anything else",
          "Take the letter, make the payment, start, and add the pit to the next assessment revision",
          "Start extraction and apply for the permit in parallel, since permitting takes ten weeks",
          "Decline the site entirely and absorb the eleven-week delay"
        ],
        "correct": 0,
        "tip": "Option b fails on three counts at once: a lump payment to a committee is not compensation, one interested signature is not consultation, and a later revision does not make the activity assessed. Option c creates two findings from one decision. Option d is not wrong — just premature: you cannot know if the site is usable until someone establishes who uses it."
      },
      {
        "fmt": "scenario", "difficulty": "hard", "tag": "Scenario — the labour supplier",
        "prompt": "Your earthworks subcontractor brought in twenty workers through a labour supplier. Your foreman reports two of them look young, and the supplier holds their identity documents. The subcontractor says this is the supplier's arrangement and none of your business. What do you do FIRST?",
        "options": [
          "Suspend the affected workers' deployment, verify ages directly, require the documents returned — then address the supplier contractually",
          "Accept it: the employment relationship is between the workers and the supplier",
          "Report it to the labour inspectorate and let them handle it",
          "Raise it at the next monthly subcontractor meeting"
        ],
        "correct": 0,
        "tip": "PS2 extends to workers engaged by third parties — the finding lands on the project regardless of who signed the contract. Withheld identity documents are a forced-labour indicator: a monthly meeting is the wrong instrument for something that requires action this afternoon. Notifying the inspectorate is a legitimate LATER step."
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
