import type { SimDef } from '../../engine/types';
import C12_GeographyTertiaryQuaternarySim from '../../../simulations/c6_12/C12_GeographyTertiaryQuaternarySim';

/** v3 wrapped master — C12_GeographyTertiaryQuaternarySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographytertiaryquaternarysim: SimDef = {
    id: 'v3w_c12_geographytertiaryquaternarysim',
    title: 'Tertiary Activities: Definition and Types',
    subtitle: 'Covers: definition, key characteristics (intangibility, non-storability, simultaneity of.',
    classLevel: 12, subject: 'geography', topic: 'Tertiary Activities: Definition and Types',
    chapters: [],
    nodeIds: ['c12_geo_cbse_07_001', 'c12_geo_cbse_07_002', 'c12_geo_cbse_07_005', 'c12_geo_cbse_07_006', 'c12_geo_cbse_07_007', 'c12_geo_cbse_07_010', 'c12_geo_cbse_07_011', 'c12_geo_cbse_06_007', 'c12_geo_cbse_06_011', 'c12_geo_cbse_02_009', 'c12_geo_cbse_07_009', 'c12_geo_cbse_07_003', 'c12_geo_cbse_07_004', 'c12_geo_cbse_06_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a typical urban morning: a student uses a metro (transport), checks WhatsApp (communication), buys.', goal: 'Master Tertiary Activities: Definition and Types.' },
    discovery: {
        question: 'Evaluate the statement: "India\'s tertiary sector contributes ~54% to GDP but employs only ~32% of the workforce (PLFS 2022-23); therefore, tertiary growth has.',
        options: ['Correct evaluation: "Partly true but incomplete', 'A wrong answer blaming only', 'ignores structural dualism'],
        answer: 'Correct evaluation: "Partly true but incomplete',
        hook: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal.',
    },
    teaching: [
        { title: 'Tertiary activities are service-sector.', text: 'Tertiary activities are service-sector economic activities that provide intangible outputs — such as expertise, care, transport, communication, finance, and trade — to satisfy human wants directly or.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_001', title: 'Tertiary activities are service-sector.',
          scaffold: { problem: 'Using the PLFS 2022-23 data below, calculate TSI and TER for India and interpret the gap.',
            steps: [
            { text: 'Identify formula for TSI = (Tertiary GVA / Total GVA) × 100' },
            { text: 'Substitute values: (81 / 150) × 100 = 54%' },
            { text: 'Identify formula for TER = (Tertiary Workers / Total Workers) × 100' },
            { text: 'Substitute values: (182 / 568) × 100 = 32.04% ≈ 32%' },
            { text: 'Interpret: TSI (54%) > TER (32%) means tertiary sector generates more value per worker — it is capital/skill-intensive;.', faded: true, blankAnswer: 'TSI = 54%, TER = 32%. Gap = 22 pp. Interpretation: Tertiary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_002', title: 'Trade and commerce as tertiary.',
          scaffold: { problem: 'A farmer in Nashik (Maharashtra) grows 50 tonnes of grapes. He can sell to: (A) Local mandi at ₹40/kg, (B) Mumbai wholesale market (180 km.',
            steps: [
            { text: 'Identify all costs and revenues for each option. Option A: Revenue ₹40/kg, no transport cost (local), no cold storage.' },
            { text: 'Option B (Mumbai by road): Distance 180 km. Road transport cost = (180/100) × ₹2.50 = ₹4.50/kg.' },
            { text: 'Option B (Mumbai by rail): Rail cost = (180/100) × ₹1.20 = ₹2.16/kg. Cold storage ₹3/kg. Revenue ₹55/kg.' },
            { text: 'Option C (Export via JNPT): Road to JNPT = 200 km (NH66). Road transport = (200/100) × ₹2.50 = ₹5/kg.' },
            { text: 'Compare nets: A = ₹40, B_road = ₹47.50, B_rail = ₹49.84, C = ₹15. Maximum is Option B by rail (Mumbai wholesale).' },
            { text: 'Interpret geographically — high sea freight cost (distance) and port charges erode export premium; domestic rail-linked.', faded: true, blankAnswer: 'Sell to Mumbai wholesale market via rail (₹49.84/kg net)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_005', title: 'Professional, business, and personal.',
          scaffold: { problem: 'A dermatology clinic (professional service) needs ₹50 lakh/year revenue to cover costs.',
            steps: [
            { text: 'Calculate revenue per patient per year = ₹1,000 × 2 = ₹2,000.' },
            { text: 'Calculate patients needed = ₹50,00,000 / ₹2,000 = 2,500 patients/year.' },
            { text: 'Calculate required population with skin concerns = 2,500 patients (assuming 100% capture).' },
            { text: 'Since only 15% population has skin concerns, total population needed = 2,500 / 0.15 = 16,667.' },
            { text: 'City has 10 lakh → 1.5 lakh potential patients → far exceeds threshold.', faded: true, blankAnswer: 'Yes, city is sufficient. Minimum population needed =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_006', title: 'Quaternary activities are.',
          scaffold: { problem: 'Classify each of the following roles as Primary, Secondary, Tertiary (routine), or Quaternary.',
            steps: [
            { text: 'Identify the core output of each role — natural resource, physical good, routine service, new knowledge/design, or.' },
            { text: 'Match output to sector definition: Primary = nature-dependent extraction; Secondary = material transformation; Tertiary.' },
            { text: 'Apply to (i): Geologist uses specialized earth science knowledge to locate minerals — creates geological knowledge, not.' },
            { text: 'Apply to (ii): Worker transforms raw materials into batteries using standardized processes — physical transformation,.' },
            { text: 'Apply to (iii): Agent follows scripts to resolve tickets — routine service delivery, tertiary (routine), despite tech.' },
            { text: 'Apply to (iv): Researcher develops new battery chemistries using electrochemistry theory — creates new knowledge,.' },
            { text: 'Apply to (v): Planner integrates climate science, engineering, policy to design novel township — synthesizes.', faded: true, blankAnswer: '(i) Quaternary — creates geological knowledge using.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_007', title: 'Quaternary activities are.',
          scaffold: { problem: 'A Bengaluru-based startup develops AI-based crop-disease detection for Indian farmers.',
            steps: [
            { text: 'Identify core activity — AI model development for agriculture.' },
            { text: 'Break into sub-sectors: (a) R&D (computer vision, plant pathology), (b) IT services (cloud deployment, app interface),.' },
            { text: 'Trace value chain: University research (IISc/IIT) → startup R&D → cloud infrastructure (AWS/Azure India regions) →.' },
            { text: 'Locate geographically: R&D in Bengaluru (talent + VC), data annotation in Tier-2 (Mysuru, Hubballi — lower cost), field.' },
            { text: 'Verify quaternary criteria at each link — all involve specialized knowledge creation/processing, not routine service.', faded: true, blankAnswer: 'Quaternary activity (AI agri-tech). Sub-sectors: R&D, IT.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_010', title: 'Quaternary activities involve highly.',
          scaffold: { problem: 'A state government wants to develop a quaternary activity hub in a tier-2 city.',
            steps: [
            { text: 'Identify the key agglomeration factors for quaternary activities from NCERT: proximity to universities, high-speed.' },
            { text: 'Define quantitative thresholds: at least one nationally ranked university (NIRF top 100) within 50 km; broadband.' },
            { text: 'Apply to a specific tier-2 city (e.g., Coimbatore): check NIRF rankings of nearby colleges (PSG Tech, CIT), BSNL/Airtel.' },
            { text: 'Assess gaps: if graduate output is 3,000, propose university-industry partnership to increase relevant courses; if.' },
            { text: 'Synthesize into a viability report: the city meets educational threshold but needs digital infrastructure upgrade and.', faded: true, blankAnswer: 'Coimbatore has strong engineering colleges and.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Tertiary Activities: Definition and Types', spots: [
            { id: 's1', label: 'Tertiary activities are service-sector economic', prompt: 'Which idea is this? — Tertiary activities are service-sector economic activities that provide intangible.', answer: 'Tertiary activities are service-sector economic', options: ['Tertiary activities are service-sector economic', 'Trade and commerce as tertiary', 'Professional business and personal services', 'Quaternary activities are knowledge-based economic'] },
            { id: 's2', label: 'Trade and commerce as tertiary', prompt: 'Which idea is this? — Trade and commerce as tertiary activities refer to the buying, selling, and exchange of.', answer: 'Trade and commerce as tertiary', options: ['Trade and commerce as tertiary', 'Tertiary activities are service-sector economic', 'Professional business and personal services', 'Quaternary activities are knowledge-based economic'] },
            { id: 's3', label: 'Professional business and personal services', prompt: 'Which idea is this? — Professional, business, and personal services are specialized tertiary activities that.', answer: 'Professional business and personal services', options: ['Professional business and personal services', 'Tertiary activities are service-sector economic', 'Trade and commerce as tertiary', 'Quaternary activities are knowledge-based economic'] },
            { id: 's4', label: 'Quaternary activities are knowledge-based economic', prompt: 'Which idea is this? — Quaternary activities are knowledge-based economic activities that involve the creation,.', answer: 'Quaternary activities are knowledge-based economic', options: ['Quaternary activities are knowledge-based economic', 'Tertiary activities are service-sector economic', 'Trade and commerce as tertiary', 'Professional business and personal services'] },
            { id: 's5', label: 'Quaternary activities involve highly skilled', prompt: 'Which idea is this? — Quaternary activities involve highly skilled professionals engaged in knowledge-based.', answer: 'Quaternary activities involve highly skilled', options: ['Quaternary activities involve highly skilled', 'Tertiary activities are service-sector economic', 'Trade and commerce as tertiary', 'Professional business and personal services'] }
          ] } }
    ],
    explore: { component: C12_GeographyTertiaryQuaternarySim, prompt: 'Explore the interactive — Tertiary Activities: Definition and Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_001', difficulty: 'standard',
          question: 'Tertiary activities are service-sector economic activities that provide.',
          hint: 'If unsure, re-read c11_geo_cbse_16_005 Section "Occupational Structure of Population" and.',
          misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal.',
          parts: [
                { id: 'a', prompt: 'Why can a haircut not be stored like a manufactured shampoo bottle? Explain using a characteristic unique to tertiary activities.', answer: 'Correct: "Services are non-storable (perishable)',
                  options: ['Correct: "Services are non-storable (perishable)', 'A wrong answer citing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal services (street vendors,.' }
          ],
            remediations: { 'students-equate-tertiary-activities-solely': { steps: ['Revisit c11_geo_cbse_16_005 (occupational structure) and map India\'s workforce distribution by sector *and* rural/urban.', 'Use NSSO/PLFS unit-level data (open source) to extract rural tertiary employment by sub-type; create a bar chart.', 'Visit a nearby village haat or interview a gig worker; classify their activity into the four sub-types.', 'Re-attempt Diagnostic Q3 with this expanded mental model.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s tertiary sector contributes ~54% to GDP but employs only ~32% of the workforce (PLFS 2022-23); therefore, tertiary growth has.', answer: 'Correct evaluation: "Partly true but incomplete',
                  options: ['Correct evaluation: "Partly true but incomplete', 'A wrong answer blaming only', 'ignores structural dualism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal services (street vendors,.' }
          ],
            remediations: { 'students-equate-tertiary-activities-solely': { steps: ['Revisit c11_geo_cbse_16_005 (occupational structure) and map India\'s workforce distribution by sector *and* rural/urban.', 'Use NSSO/PLFS unit-level data (open source) to extract rural tertiary employment by sub-type; create a bar chart.', 'Visit a nearby village haat or interview a gig worker; classify their activity into the four sub-types.', 'Re-attempt Diagnostic Q3 with this expanded mental model.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_002', difficulty: 'standard',
          question: 'Trade and commerce as tertiary activities refer to the buying, selling, and.',
          hint: 'If stuck on classification: Re-read c12_geo_cbse_07_001 and make a 3-column table.',
          misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.',
          parts: [
                { id: 'a', prompt: 'Define trade as a tertiary activity and distinguish it from primary and secondary activities using one example each from the Indian context.', answer: 'Trade is a tertiary activity',
                  options: ['Trade is a tertiary activity', 'handling goods', 'making goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' },
                { id: 'b', prompt: 'Explain why the concept of "comparative advantage" is necessary but not sufficient to explain India\'s export of software services to the USA, while India.', answer: 'Comparative advantage explains why India specialises in software (skilled',
                  options: ['Comparative advantage explains why India specialises in software (skilled', 'trade = international trade only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' },
                { id: 'c', prompt: 'Using the map of India\'s major ports (Mumbai, Chennai, Kolkata, Vishakhapatnam, Kandla, Kochi), calculate the approximate coastal shipping distance between.', answer: 'Distance = 1,800 km',
                  options: ['Distance = 1,800 km', 'trade = international trade only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' }
          ],
            remediations: { 'trade-international-trade-only-and': { steps: ['Revisit c12_geo_cbse_07_001 (Tertiary Activities: Definition and Types) — list 10 services you used this week (haircut,.', 'Visit a local mandi or wholesale market — observe the auction, loading, invoicing, and truck dispatch.', 'Re-attempt Diagnostic Question 1 and 6 — you must now distinguish trade (exchange service) from transport (movement.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.',
          parts: [
                { id: 'a', prompt: 'Design a trade flow map for a hypothetical Indian agri-export startup selling mangoes from Ratnagiri (Maharashtra) to Dubai (UAE) and London (UK).', answer: 'to Dubai (UA',
                  options: ['to Dubai (UA', 'trade = international trade only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' }
          ],
            remediations: { 'trade-international-trade-only-and': { steps: ['Revisit c12_geo_cbse_07_001 (Tertiary Activities: Definition and Types) — list 10 services you used this week (haircut,.', 'Visit a local mandi or wholesale market — observe the auction, loading, invoicing, and truck dispatch.', 'Re-attempt Diagnostic Question 1 and 6 — you must now distinguish trade (exchange service) from transport (movement.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_005', difficulty: 'standard',
          question: 'Professional, business, and personal services are specialized tertiary.',
          hint: 'If stuck on location logic, revisit Class 11 Urban Settlements node c11_geo_cbse_17_003.',
          misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services.',
          parts: [
                { id: 'a', prompt: 'A student classifies "software development for a multinational corporation" as a personal service because it involves individual programmers writing code.', answer: 'Incorrect',
                  options: ['Incorrect', 'business services = services provided by businesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms,.' },
                { id: 'b', prompt: 'Given: Town A (population 50,000, avg. income ₹15,000/month) and City B (population 5 million, avg. income ₹40,000/month).', answer: 'Step 1: Calculate businesses in Town A = 50,000/500 = 100',
                  options: ['Step 1: Calculate businesses in Town A = 50,000/500 = 100', 'ignores that Town A cannot meet minimum demand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms,.' },
                { id: 'c', prompt: 'Compare the locational pattern of a hair salon chain (personal service) vs. a management consulting firm (business service) across a state.', answer: 'Factor 1: Threshold population',
                  options: ['Factor 1: Threshold population', 'competition', 'business services = services provided by businesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms,.' }
          ],
            remediations: { 'business-services-services-provided-by': { steps: ['Revisit c12_geo_cbse_07_001 (Tertiary Activities: Definition and Types) to relearn the three-fold classification.', 'Draw a two-axis graph (x-axis: client type B2C→B2B; y-axis: skill low→high) and plot 10 local services.', 'Re-attempt Diagnostic Q1 and Q5. If still confused, review Class 11 central place theory (c11_geo_cbse_17_003) for.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The rapid growth of app-based gig services (food delivery, ride-hailing, home repairs) represents a shift from personal services to business.', answer: 'Unsound',
                  options: ['Unsound', 'business services = services provided by businesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms,.' },
                { id: 'b', prompt: 'Design a service location plan for a new district (population 2 lakh, mixed income) that currently has no professional services.', answer: 'which professional service to prioritize, (',
                  options: ['which professional service to prioritize, (', 'business services = services provided by businesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms,.' }
          ],
            remediations: { 'business-services-services-provided-by': { steps: ['Revisit c12_geo_cbse_07_001 (Tertiary Activities: Definition and Types) to relearn the three-fold classification.', 'Draw a two-axis graph (x-axis: client type B2C→B2B; y-axis: skill low→high) and plot 10 local services.', 'Re-attempt Diagnostic Q1 and Q5. If still confused, review Class 11 central place theory (c11_geo_cbse_17_003) for.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_006', difficulty: 'standard',
          question: 'Quaternary activities are knowledge-based economic activities that involve the.',
          hint: 'If unable to classify occupations, revisit Class 11 node c11_geo_cbse_16_005.',
          misconception: 'Students equate \'quaternary activities\' with \'IT/software services\' only, ignoring that financial modeling,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Quaternary activities are knowledge-based economic activities that involve the creation,',
                  options: ['Quaternary activities are knowledge-based economic activities that involve the creation,', 'Tertiary activities are service-sector economic activities that provide intangible outputs', 'Trade and commerce as tertiary activities refer to the buying, selling, and exchange of', 'Professional, business, and personal services are specialized tertiary activities that'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'quaternary activities\' with \'IT/software services\' only, ignoring that financial modeling, pharmaceutical R&D,.' }
          ],
            remediations: { 'students-equate-quaternary-activities-with': { steps: ['Revisit node c12_geo_cbse_07_001 (Tertiary Activities) and list 5 tertiary services — classify each as \'routine\' or.', 'Map 3 Indian cities (Bengaluru, Mumbai, Delhi) and identify 2 quaternary clusters in each (e.g., Whitefield +.', 'Re-attempt Diagnostic Question 2 with this spatial lens. If still stuck, review Class 11 node c11_geo_cbse_17_004.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_007', difficulty: 'standard',
          question: 'Quaternary activities are knowledge-based economic activities that involve the.',
          hint: 'If classification fails, revisit c12_geo_cbse_07_006\'s criteria table and.',
          misconception: 'Students equate "quaternary" with "IT/software only" and treat all computer-based work as quaternary.',
          parts: [
                { id: 'a', prompt: 'Why do quaternary activities cluster in specific urban regions like Bengaluru, Hyderabad, and Pune despite being theoretically footloose?', answer: 'Clustering occurs due to: (1) knowledge spillovers from proximity to',
                  options: ['Clustering occurs due to: (1) knowledge spillovers from proximity to', 'cheap labor', 'English language'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "quaternary" with "IT/software only" and treat all computer-based work as quaternary.' }
          ],
            remediations: { 'students-equate-quaternary-with-it': { steps: ['Revisit node c12_geo_cbse_07_006 (quaternary concept) and create a two-column table: Tertiary vs Quaternary with.', 'Take 5 local service examples (Zomato delivery, TCS research lab, hospital, patent attorney, call center) and classify.', 'Re-attempt Diagnostic Q1 and Q2. If still stuck, map India\'s STPI locations and overlay with engineering college.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_010', difficulty: 'standard',
          question: 'Quaternary activities involve highly skilled professionals engaged in.',
          hint: 'Revisit node c12_geo_cbse_07_006 for quaternary characteristics and c12_geo_cbse_07_009.',
          misconception: 'Students often think "quaternary activities = only IT/software jobs" and "quinary activities = only politicians".',
          parts: [
                { id: 'a', prompt: 'Given a map showing the percentage of workforce in quaternary activities across Indian states, identify the top three states and explain the geographical.', answer: 'Top states: Karnataka, Maharashtra, Telangana',
                  options: ['Top states: Karnataka, Maharashtra, Telangana', 'high literacy', 'quaternary activities = only IT/software jobs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "quaternary activities = only IT/software jobs" and "quinary activities = only politicians".' }
          ],
            remediations: { 'quaternary-activities-only-it-software': { steps: ['If the student holds this misconception, have them: (1) List 10 professions from the NCERT textbook\'s examples of.', '(2) Read the definition of quinary activities in node c12_geo_cbse_07_009 and identify three non-political roles.', '(3) Re-attempt Diagnostic Question 1 and 2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
