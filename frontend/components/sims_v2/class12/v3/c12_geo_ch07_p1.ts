import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch07_p1: SimDef = {
    id: 'v3_c12_geo_ch07_p1',
    title: 'Tertiary and Quaternary Activities · Part 1/2',
    subtitle: 'You can\'t warehouse a haircut — the economics of the invisible',
    classLevel: 12, subject: 'geography', topic: 'Tertiary and Quaternary Activities · Part 1/2',
    chapters: ['c12_geo_ch07'],
    nodeIds: ['c12_geo_cbse_07_001', 'c12_geo_cbse_07_002', 'c12_geo_cbse_07_003', 'c12_geo_cbse_07_004', 'c12_geo_cbse_07_005', 'c12_geo_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Service-sector analyst', intro: 'No smokestacks, no harvests — yet this sector carries more than half of India\'s economy. Learn to see the invisible.', goal: 'Define tertiary activities, classify trade/transport/communication/services, and explain their rise with development.' },
    discovery: {
        question: 'A shampoo bottle can sit in a warehouse for months. A haircut can\'t. What makes services behave so differently from goods?',
        options: ['Simultaneity — a service is produced and consumed in the same instant; intangibility alone doesn\'t explain why it can\'t be stored', 'Services are just intangible', 'Barbers refuse to stock', 'Goods are heavier'],
        answer: 'Simultaneity — a service is produced and consumed in the same instant; intangibility alone doesn\'t explain why it can\'t be stored',
        hook: '\'Tertiary\' isn\'t just IT parks and banks — street vendors, rickshaw pullers and ASHA workers are ~80% of India\'s services workforce. And its geography is flipped: a steel plant chases ore and coal, while a software park chases skill and connectivity — footloose, not bolted to a mine.',
    },
    teaching: [
        { title: 'Tertiary Activities: Definition and Types', text: 'Tertiary activities are service-sector economic activities that provide intangible outputs — such as expertise, care, transport, communication, finance, and trade — to satisfy human wants directly.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_07_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Deconstruct a city morning into its sector anatomy — metro, messaging, markets, mentoring — then test why a sector can deliver 54% of GDP yet only a third of the jobs.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_001', title: 'Tertiary Activities: Definition and Types',
          scaffold: { problem: 'Using the PLFS 2022-23 data below, calculate TSI and TER for India and interpret the gap.',
            steps: [
            { text: 'Identify formula for TSI = (Tertiary GVA / Total GVA) × 100' },
            { text: 'Substitute values: (81 / 150) × 100 = 54%' },
            { text: 'Identify formula for TER = (Tertiary Workers / Total Workers) × 100' },
            { text: 'Substitute values: (182 / 568) × 100 = 32.04% ≈ 32%' },
            { text: 'Interpret: TSI (54%) > TER (32%) means tertiary sector generates more value per worker — it is capital/skill-intensive.', faded: true, blankAnswer: 'TSI = 54%, TER = 32%. Gap = 22 pp. Interpretation: Tertiary.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_002', title: 'Trade and Commerce as Tertiary Activities',
          caseStudy: { intro: 'Observe your local weekly market (haat) or a nearby shopping mall — notice how vegetables from surrounding villages, clothes from Surat or Tirupur, and.',
            decisions: [{ prompt: 'Define trade as a tertiary activity and distinguish it from primary and secondary activities using one example each from the Indian context.', options: [
                { text: 'Trade is a tertiary activity', outcome: 'Trade is a tertiary activity because it provides the service of exchanging goods and services.' },
                { text: 'handling goods', outcome: 'Not quite — Students believe "trade = international trade only" and equate tertiary trade activities solely.', reveals: 'trade-international-trade-only-and' },
                { text: 'making goods', outcome: 'Not quite — Students believe "trade = international trade only" and equate tertiary trade activities solely.', reveals: 'trade-international-trade-only-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_003', title: 'Transport as a Service: Modes and Significance',
          caseStudy: { intro: 'Observe a delivery truck, a freight train, and an airplane at your nearest city — all moving goods but chosen for different reasons.',
            decisions: [{ prompt: 'Name the five principal modes of world transportation and state the primary medium (land, water, air) for each.', options: [
                { text: 'The five principal modes are: (1) Roadways', outcome: 'The five principal modes are: (1) Roadways — land, (2) Railways — land, (3) Waterways (inland and.' },
                { text: 'trucks', outcome: 'Not quite — Students often think "transport mode choice is based solely on speed or cost alone" and cite.', reveals: 'transport-mode-choice-is-based' },
                { text: 'transport mode choice is based solely on speed or cost alone', outcome: 'Not quite — Students often think "transport mode choice is based solely on speed or cost alone" and cite.', reveals: 'transport-mode-choice-is-based' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_004', title: 'Communication Services: Personal and Mass Communication',
          caseStudy: { intro: 'Begin by observing your own smartphone: you can video-call a relative in another state, stream a live news broadcast from Delhi, and access a government portal.',
            decisions: [{ prompt: 'Name the two vital man-made navigation canals that serve as gateways of commerce for the eastern and western worlds, and state which ocean.', options: [
                { text: 'The Suez Canal (connects Mediterranean Sea to Red Sea/Indian Ocean) and the Panama Canal', outcome: 'The Suez Canal (connects Mediterranean Sea to Red Sea/Indian Ocean) and the Panama Canal (connects.' },
                { text: 'mass communication', outcome: 'Not quite — Students often think "mass communication" means only television and radio, and that "personal.', reveals: 'mass-communication-means-only-television' },
                { text: 'personal communication', outcome: 'Not quite — Students often think "mass communication" means only television and radio, and that "personal.', reveals: 'mass-communication-means-only-television' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_07_005', title: 'Services: Professional, Business and Personal Services',
          scaffold: { problem: 'A dermatology clinic (professional service) needs ₹50 lakh/year revenue to cover costs.',
            steps: [
            { text: 'Calculate revenue per patient per year = ₹1,000 × 2 = ₹2,000.' },
            { text: 'Calculate patients needed = ₹50,00,000 / ₹2,000 = 2,500 patients/year.' },
            { text: 'Calculate required population with skin concerns = 2,500 patients (assuming 100% capture).' },
            { text: 'Since only 15% population has skin concerns, total population needed = 2,500 / 0.15 = 16,667.' },
            { text: 'City has 10 lakh → 1.5 lakh potential patients → far exceeds threshold.', faded: true, blankAnswer: 'Yes, city is sufficient. Minimum population needed.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_006', title: 'Quaternary Activities: Concept and Characteristics',
          caseStudy: { intro: 'Observe a software engineer in Bengaluru writing code for a global fintech platform, a researcher in Pune developing drought-resistant crops, and a financial.',
            decisions: [{ prompt: 'Define quaternary activities and name two characteristics that distinguish them from tertiary activities.', options: [
                { text: 'Quaternary activities are knowledge-based economic activities involving creation,', outcome: 'Quaternary activities are knowledge-based economic activities involving creation, processing, and.' },
                { text: 'quaternary = banking services', outcome: 'Not quite — Students equate \'quaternary activities\' with \'IT/software services\' only, ignoring that financial.', reveals: 'students-equate-quaternary-activities-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college incubation cell is helping a farmer collective export Alphonso mangoes to the Gulf. A junior\'s plan books the cheapest surface freight and lists the route as \'port to port\', with no mention of cold storage, customs, or ripening at the destination.',
            decisions: [{ prompt: 'What does the tertiary-activities framework flag in this plan?', options: [
                { text: 'That trade is door-to-door spatial transfer, not port-to-port — perishable mangoes need reefer trucks, phytosanitary certification, cold-chain continuity and ripening chambers as auxiliary services, so the \'cheapest\' leg can be the most expensive failure.', outcome: 'The chapter treats transport, banking, insurance and customs as the enabling services that make exchange real; for a 3–4 week shelf-life fruit, transferability — not distance — decides whether the trade exists at all.' },
                { text: 'Approve it — trade just means buying cheap here and selling dear there; the rest is logistics detail.', outcome: 'That reduces trade to arbitrage and deletes exactly what makes it tertiary: the value is added by services bridging space, and without them the mangoes arrive as pulp, not product.', reveals: 'trade-equals-arbitrage' },
                { text: 'Switch the plan to domestic mandis only — exports are what \'trade\' really means, but they\'re too complex for a small collective.', outcome: 'Both the premise and retreat are wrong: domestic wholesale and retail are trade too — employing far more people than foreign trade — and perishability can be engineered with a cold chain, not avoided by staying local.', reveals: 'only-exports-are-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now sort any activity by intangibility and simultaneity — and explain why service-led growth can still be jobless in the formal count.',
            decisions: [{ prompt: 'What comes next? Tertiary and Quaternary Activities · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tertiary and Quaternary Activities · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_001', difficulty: 'standard',
          question: 'Tertiary activities are service-sector economic activities that provide.',
          hint: 'If unsure, re-read c11_geo_cbse_16_005 Section "Occupational Structure of Population" and.',
          misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal.',
          parts: [
                { id: 'a', prompt: 'Why can a haircut not be stored like a manufactured shampoo bottle? Explain using a characteristic unique to tertiary activities.', answer: 'Correct: "Services are non-storable (perishable)',
                  options: ['Correct: "Services are non-storable (perishable)', 'A wrong answer citing'],
                  hint: 'If unsure, re-read c11_geo_cbse_16_005 Section "Occupational Structure of Population" and memorise.',
                  misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal services (street vendors.' }
          ],
            remediations: { 'students-equate-tertiary-activities-solely': { steps: ['Revisit c11_geo_cbse_16_005 (occupational structure) and map India\'s workforce distribution by sector *and* rural/urban.', 'Use NSSO/PLFS unit-level data (open source) to extract rural tertiary employment by sub-type; create a bar chart.', 'Visit a nearby village haat or interview a gig worker; classify their activity into the four sub-types.', 'Re-attempt Diagnostic Q3 with this expanded mental model.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s tertiary sector contributes ~54% to GDP but employs only ~32% of the workforce (PLFS 2022-23); therefore, tertiary growth has.', answer: 'Correct evaluation: "Partly true but incomplete',
                  options: ['Correct evaluation: "Partly true but incomplete', 'A wrong answer blaming only', 'ignores structural dualism'],
                  hint: 'If unsure, re-read c11_geo_cbse_16_005 Section "Occupational Structure of Population" and memorise.',
                  misconception: 'Students equate "tertiary activities" solely with "white-collar office jobs" (IT, banking) and exclude informal services (street vendors.' }
          ],
            remediations: { 'students-equate-tertiary-activities-solely': { steps: ['Revisit c11_geo_cbse_16_005 (occupational structure) and map India\'s workforce distribution by sector *and* rural/urban.', 'Use NSSO/PLFS unit-level data (open source) to extract rural tertiary employment by sub-type; create a bar chart.', 'Visit a nearby village haat or interview a gig worker; classify their activity into the four sub-types.', 'Re-attempt Diagnostic Q3 with this expanded mental model.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_002', difficulty: 'standard',
          question: 'Trade and commerce as tertiary activities refer to the buying, selling, and.',
          hint: 'If stuck on classification: Re-read c12_geo_cbse_07_001 and make a 3-column table.',
          misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.',
          parts: [
                { id: 'a', prompt: 'Define trade as a tertiary activity and distinguish it from primary and secondary activities using one example each from the Indian context.', answer: 'Trade is a tertiary activity',
                  options: ['Trade is a tertiary activity', 'handling goods', 'making goods', 'trade = international trade only'],
                  hint: 'If stuck on classification: Re-read c12_geo_cbse_07_001 and make a 3-column table.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' },
                { id: 'b', prompt: 'Explain why the concept of "comparative advantage" is necessary but not sufficient to explain India\'s export of software services to the USA, while India.', answer: 'Comparative advantage explains why India specialises in software (skilled',
                  options: ['Comparative advantage explains why India specialises in software (skilled', 'trade = international trade only'],
                  hint: 'If stuck on classification: Re-read c12_geo_cbse_07_001 and make a 3-column table.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' },
                { id: 'c', prompt: 'Using the map of India\'s major ports (Mumbai, Chennai, Kolkata, Vishakhapatnam, Kandla, Kochi), calculate the approximate coastal shipping distance between.', answer: 'Distance = 1,800 km',
                  options: ['Distance = 1,800 km', 'trade = international trade only'],
                  hint: 'If stuck on classification: Re-read c12_geo_cbse_07_001 and make a 3-column table.',
                  misconception: 'Students believe "trade = international trade only" and equate tertiary trade activities solely with exports/imports.' }
          ],
            remediations: { 'trade-international-trade-only-and': { steps: ['Revisit c12_geo_cbse_07_001 (Tertiary Activities: Definition and Types) — list 10 services you used this week (haircut.', 'Visit a local mandi or wholesale market — observe the auction, loading, invoicing, and truck dispatch.', 'Re-attempt Diagnostic Question 1 and 6 — you must now distinguish trade (exchange service) from transport (movement.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_003', difficulty: 'standard',
          question: 'Transport as a service is an organised tertiary activity that provides the.',
          hint: 'Review the modal characteristics table in Class 10 Geography Chapter 7 (Transport) and.',
          misconception: 'Students often think "transport mode choice is based solely on speed or cost alone" and cite examples like "air.',
          parts: [
                { id: 'a', prompt: 'Name the five principal modes of world transportation and state the primary medium (land, water, air) for each.', answer: 'The five principal modes are: (1) Roadways',
                  options: ['The five principal modes are: (1) Roadways', 'trucks', 'transport mode choice is based solely on speed or cost alone', 'air is fastest so best for everything'],
                  hint: 'Review the modal characteristics table in Class 10 Geography Chapter 7 (Transport) and Class 11.',
                  misconception: 'Students often think "transport mode choice is based solely on speed or cost alone" and cite examples like "air is fastest so best for.' },
                { id: 'b', prompt: 'A manufacturer in Ludhiana (Punjab) needs to ship 500 tonnes of machine parts (high value, low volume) to a port for export to Europe.', answer: 'Step 1: Identify cargo characteristics',
                  options: ['Step 1: Identify cargo characteristics', 'transport mode choice is based solely on speed or cost alone', 'air is fastest so best for everything', 'ship is cheapest so best for everything'],
                  hint: 'Review the modal characteristics table in Class 10 Geography Chapter 7 (Transport) and Class 11.',
                  misconception: 'Students often think "transport mode choice is based solely on speed or cost alone" and cite examples like "air is fastest so best for.' },
                { id: 'c', prompt: 'Compare the Rhine Waterway and the Volga Waterway in terms of (a) economic hinterland served, (b) connectivity to ocean routes, and (c) volume of traffic.', answer: 'economic hinterland served, (',
                  options: ['economic hinterland served, (', 'transport mode choice is based solely on speed or cost alone', 'air is fastest so best for everything', 'ship is cheapest so best for everything'],
                  hint: 'Review the modal characteristics table in Class 10 Geography Chapter 7 (Transport) and Class 11.',
                  misconception: 'Students often think "transport mode choice is based solely on speed or cost alone" and cite examples like "air is fastest so best for.' }
          ],
            remediations: { 'transport-mode-choice-is-based': { steps: ['If the student cannot apply modal choice criteria: (1) Revisit Class 10 node c10_geo_cbse_07_001 (Transport: Importance.', '(2) Create a 5x4 comparison table: Modes (rows) vs Criteria — Distance range, Volume capacity, Cost per tonne-km.', '(3) Re-attempt Diagnostic Question 3 with the table.', '(4) If still stuck, review the concept of "friction of distance" from c11_geo_cbse_01_009 (Geography as an Integrating.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_004', difficulty: 'standard',
          question: 'Communication services are tertiary activities that enable the exchange.',
          hint: 'If unclear on tertiary vs secondary activities, revisit c12_geo_cbse_07_001; if unsure.',
          misconception: 'Students often think "mass communication" means only television and radio, and that "personal communication" is only.',
          parts: [
                { id: 'a', prompt: 'Explain why the unit cost and time of communication become invariant with distance when using satellite communication, unlike land-based telegraph or telephone.', answer: 'Satellites in geostationary orbit cover a fixed footprint on Earth',
                  options: ['Satellites in geostationary orbit cover a fixed footprint on Earth', 'satellites make distance irrelevant', 'mass communication', 'personal communication'],
                  hint: 'If unclear on tertiary vs secondary activities, revisit c12_geo_cbse_07_001; if unsure how.',
                  misconception: 'Students often think "mass communication" means only television and radio, and that "personal communication" is only postal letters.' },
                { id: 'b', prompt: 'Compare the spatial distribution of optic fiber cable (OFC) networks and satellite communication footprints in India.', answer: 'OFC networks follow transport corridors (highways, railways) and are dense in',
                  options: ['OFC networks follow transport corridors (highways, railways) and are dense in', 'mass communication', 'personal communication'],
                  hint: 'If unclear on tertiary vs secondary activities, revisit c12_geo_cbse_07_001; if unsure how.',
                  misconception: 'Students often think "mass communication" means only television and radio, and that "personal communication" is only postal letters.' }
          ],
            remediations: { 'mass-communication-means-only-television': { steps: ['If the student cannot distinguish modern communication modes or explain the geography of digital divide: 1.', 'Revisit c11_geo_cbse_21_007 (Class 11 Communication) to recall basic definitions of personal vs mass communication.', 'Use a physical map of India: mark OFC landing stations (Mumbai, Chennai, Kochi, Tuticorin) and trace how cables follow.', 'Watch a 5-min video on "How undersea cables are laid" to visualise the physical geography of the internet.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_005', difficulty: 'standard',
          question: 'Professional, business, and personal services are specialized tertiary.',
          hint: 'If stuck on location logic, revisit Class 11 Urban Settlements node c11_geo_cbse_17_003.',
          misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services.',
          parts: [
                { id: 'a', prompt: 'A student classifies "software development for a multinational corporation" as a personal service because it involves individual programmers writing code.', answer: 'Incorrect',
                  options: ['Incorrect', 'business services = services provided by businesses'],
                  hint: 'If stuck on location logic, revisit Class 11 Urban Settlements node c11_geo_cbse_17_003 (central.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms.' },
                { id: 'b', prompt: 'Given: Town A (population 50,000, avg. income ₹15,000/month) and City B (population 5 million, avg. income ₹40,000/month).', answer: 'Step 1: Calculate businesses in Town A = 50,000/500 = 100',
                  options: ['Step 1: Calculate businesses in Town A = 50,000/500 = 100', 'ignores that Town A cannot meet minimum demand'],
                  hint: 'If stuck on location logic, revisit Class 11 Urban Settlements node c11_geo_cbse_17_003 (central.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms.' },
                { id: 'c', prompt: 'Compare the locational pattern of a hair salon chain (personal service) vs. a management consulting firm (business service) across a state.', answer: 'Factor 1: Threshold population',
                  options: ['Factor 1: Threshold population', 'competition', 'business services = services provided by businesses'],
                  hint: 'If stuck on location logic, revisit Class 11 Urban Settlements node c11_geo_cbse_17_003 (central.',
                  misconception: 'Students think "business services = services provided by businesses" and classify *all* private-sector services (including salons, gyms.' }
          ],
            remediations: { 'business-services-services-provided-by': { steps: ['Revisit c12_geo_cbse_07_001 (Tertiary Activities: Definition and Types) to relearn the three-fold classification.', 'Draw a two-axis graph (x-axis: client type B2C→B2B; y-axis: skill low→high) and plot 10 local services.', 'Re-attempt Diagnostic Q1 and Q5. If still confused, review Class 11 central place theory (c11_geo_cbse_17_003) for.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_07_006', difficulty: 'standard',
          question: 'Quaternary activities are knowledge-based economic activities that involve the.',
          hint: 'If unable to classify occupations, revisit Class 11 node c11_geo_cbse_16_005.',
          misconception: 'Students equate \'quaternary activities\' with \'IT/software services\' only, ignoring that financial modeling.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Quaternary activities are knowledge-based economic activities that involve the creation,',
                  options: ['Quaternary activities are knowledge-based economic activities that involve the creation,', 'Tertiary activities are service-sector economic activities that provide intangible outputs', 'Trade and commerce as tertiary activities refer to the buying, selling, and exchange of', 'Transport as a service is an organised tertiary activity that provides the network of'],
                  hint: 'If unable to classify occupations, revisit Class 11 node c11_geo_cbse_16_005 (Occupational.',
                  misconception: 'Students equate \'quaternary activities\' with \'IT/software services\' only, ignoring that financial modeling, pharmaceutical R&D.' }
          ],
            remediations: { 'students-equate-quaternary-activities-with': { steps: ['Revisit node c12_geo_cbse_07_001 (Tertiary Activities) and list 5 tertiary services — classify each as \'routine\'.', 'Map 3 Indian cities (Bengaluru, Mumbai, Delhi) and identify 2 quaternary clusters in each (e.g., Whitefield.', 'Re-attempt Diagnostic Question 2 with this spatial lens. If still stuck, review Class 11 node c11_geo_cbse_17_004.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
