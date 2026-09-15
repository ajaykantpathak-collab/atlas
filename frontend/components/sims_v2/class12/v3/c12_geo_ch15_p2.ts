import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch15_p2: SimDef = {
    id: 'v3_c12_geo_ch15_p2',
    title: 'Transport and Communication in India · Part 2/2',
    subtitle: 'Rail is \'the backbone\' — but roads carry 70% of the freight',
    classLevel: 12, subject: 'geography', topic: 'Transport and Communication in India · Part 2/2',
    chapters: ['c12_geo_ch15'],
    nodeIds: ['c12_geo_cbse_15_007', 'c12_geo_cbse_15_008', 'c12_geo_cbse_15_009', 'c12_geo_cbse_15_010', 'c12_geo_cbse_15_011', 'c12_geo_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Transport planner', intro: 'Milk by highway, coal by rail, oil by pipeline — every commodity votes for a mode. Learn what it\'s voting for.', goal: 'Analyse India\'s five transport modes by physiography, cost logic and regional fit.' },
    discovery: {
        question: 'Rail is cheaper per tonne-km for bulk over distance — yet roads carry ~70% of India\'s freight. Why does the \'expensive\' mode win?',
        options: ['Total logistics beat line-haul — door-to-door reach, small consignments and last-mile access outweigh the railway\'s per-km edge under 500 km', 'Roads are actually cheaper', 'Railways are broken', 'Trucks are faster'],
        answer: 'Total logistics beat line-haul — door-to-door reach, small consignments and last-mile access outweigh the railway\'s per-km edge under 500 km',
        hook: '\'Backbone of transport\' misleads: roads move ~85% of passengers and 70% of freight by volume. And mode choice is physiography in disguise — pipelines hug the flat west where the oil is, air links the Northeast where terrain defeats roads, waterways idle at 1% not for lack of rivers but for lack of dredging.',
    },
    teaching: [
        { title: 'Water Transport: Major and Minor Sea Ports of India', text: 'Major sea ports in India are ports administered by the Central Government under the Major Port Trusts Act, 1963, handling significant volumes of international trade cargo; minor sea ports are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_15_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Route India\'s cargo like a planner: split freight from passenger logic, justify why pipelines live where they do, and design a multimodal chain from Bellary\'s ore to Kolkata\'s docks.',
        labels: ['Water Transport: Major', 'Air Transport: Domestic', 'Pipeline Transport: Oil', 'Communication in India: Personal', 'Communication: Postal, Telecom', 'International Trade and Connectivity'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_007', title: 'Water Transport: Major and Minor Sea Ports of India',
          caseStudy: { intro: 'Look at the label on any imported product in your home — electronics, fuel, fertiliser, or fruit — and trace its journey: it arrived at an Indian sea port.',
            decisions: [{ prompt: 'Name the 12 major ports of India and identify which six are on the east coast and which six are on the west coast.', options: [
                { text: 'East coast (6): Kolkata-Haldia (West Bengal), Paradip (Odisha), Visakhapatnam (Andhra', outcome: 'East coast (6): Kolkata-Haldia (West Bengal), Paradip (Odisha), Visakhapatnam (Andhra Pradesh).' },
                { text: 'major port = bigger port', outcome: 'Not quite — Students believe "major port = bigger port" and "minor port = smaller port" in physical size.', reveals: 'major-port-bigger-port-and' },
                { text: 'minor port = smaller port', outcome: 'Not quite — Students believe "major port = bigger port" and "minor port = smaller port" in physical size.', reveals: 'major-port-bigger-port-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_008', title: 'Air Transport: Domestic and International Connectivity',
          caseStudy: { intro: 'Begin by asking students to observe a flight tracking app or airport departure board — notice how Delhi, Mumbai, Bengaluru, and Chennai dominate departures.',
            decisions: [{ prompt: 'Name the organisation responsible for providing air traffic services and aeronautical communication in Indian airspace, and state the year.', options: [
                { text: 'Correct answer: Airport Authority of India (AAI)', outcome: 'Correct answer: Airport Authority of India (AAI); 1911 (airmail between Prayagraj and Naini, 10.' },
                { text: 'Ministry of Civil Aviation', outcome: 'Not quite — Students believe "UDAN made flying cheap for everyone" — they confuse the capped fare (₹2,500 per.', reveals: 'udan-made-flying-cheap-for' },
                { text: 'UDAN made flying cheap for everyone', outcome: 'Not quite — Students believe "UDAN made flying cheap for everyone" — they confuse the capped fare (₹2,500 per.', reveals: 'udan-made-flying-cheap-for' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_15_009', title: 'Pipeline Transport: Oil and Gas Networks in India',
          scaffold: { problem: 'A new fertilizer plant is proposed at Gorakhpur (eastern Uttar Pradesh).',
            steps: [
            { text: 'Calculate spur capital cost = 150 km × ₹8 crore/km = ₹1,200 crore.' },
            { text: 'Convert gas demand to mass flow: 2 MMSCMD = 2×10⁶ m³/day × 0.72 kg/m³ = 1,440,000 kg/day = 1,440 tonnes/day.' },
            { text: 'Annual gas throughput = 1,440 tonnes/day × 330 days = 475,200 tonnes/year.' },
            { text: 'Annual road transport cost (if LNG by road from nearest terminal, say 300 km away) = 475,200 tonnes × 300.' },
            { text: 'Annual pipeline transport cost = 475,200 tonnes × 150 km × ₹0.12/tonne-km = ₹8.55 crore/year.' },
            { text: 'Annual saving = ₹570.24 - ₹8.55 = ₹561.69 crore/year. Payback period = ₹1,200 crore / ₹561.69 crore/year ≈ 2.1 years.', faded: true, blankAnswer: 'Spur capital cost ₹1,200 crore; annual transport cost.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_010', title: 'Communication in India: Personal and Mass Communication',
          caseStudy: { intro: 'Begin by asking students to list every way they communicated yesterday — WhatsApp, Instagram, a phone call, watching the news on TV, hearing a radio jingle.',
            decisions: [{ prompt: 'In which year did radio broadcasting begin in India, and by which organisation?', options: [
                { text: 'Radio broadcasting began in India in 1923 by the Radio Club of Bombay', outcome: 'Radio broadcasting began in India in 1923 by the Radio Club of Bombay.' },
                { text: 'mass communication = television only', outcome: 'Not quite — Students often think "mass communication = television only" and "personal communication = mobile.', reveals: 'mass-communication-television-only-and' },
                { text: 'personal communication = mobile phones only', outcome: 'Not quite — Students often think "mass communication = television only" and "personal communication = mobile.', reveals: 'mass-communication-television-only-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_15_011', title: 'Communication: Postal, Telecom and Digital Networks',
          scaffold: { problem: 'A telecom operator plans to deploy 4G towers in a hilly district of Uttarakhand (area 3,000 km², population 6 lakh, 60% rural).',
            steps: [
            { text: 'Geographic coverage requirement: District area / coverage per tower = 3,000 / 10 = 300 towers for full area coverage.' },
            { text: 'Total connections needed for viability: 300 towers × 200 subscribers = 60,000 connections.' },
            { text: 'Current connections = 55% of 6 lakh = 3.3 lakh (330,000). So subscriber base is sufficient for 330,000 / 200 = 1,650.' },
            { text: 'However, rural population is 3.6 lakh (60%). If rural tele-density is 40%, rural connections = 1.44 lakh.' },
            { text: 'Interpretation: The operator will deploy only ~180 towers in rural areas, leaving coverage gaps.', faded: true, blankAnswer: '300 towers needed for full geographic coverage; only 180.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_012', title: 'International Trade and Connectivity: Role of Transport',
          caseStudy: { intro: 'Look at the label on your shirt or phone — chances are it travelled thousands of kilometres by ship before reaching you.',
            decisions: [{ prompt: 'What percentage of India\'s foreign trade by volume and by value moves through oceanic routes, according to the NCERT textbook?', options: [
                { text: 'Approximately 95% by volume and 70% by value', outcome: 'Approximately 95% by volume and 70% by value. A wrong answer (e.g., 50% volume, 90% value) reveals.' },
                { text: 'international trade = ports only', outcome: 'Not quite — Students believe "international trade = ports only" and ignore the role of air cargo complexes.', reveals: 'international-trade-ports-only-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate presenting on Indian transport claims: \'National Highways are the country\'s real road network — they\'re the longest roads, which is why they carry the most traffic.\'',
            decisions: [{ prompt: 'What does the road-hierarchy data actually show?', options: [
                { text: 'The reverse — NH are only about 2% of road length yet carry ~40% of traffic; rural roads are the longest by far, so the network is a hierarchy where few high-order links concentrate flow while many low-order links provide access.', outcome: 'The chapter\'s key statistic inverts the intuition: strategic importance and physical extent are different variables — arteries are short, capillaries are vast.' },
                { text: 'Agree — the roads carrying 40% of traffic must logically be the longest network.', outcome: 'That\'s conflating traffic share with length: NH hit 40% of traffic on barely 2% of the kilometres precisely because the hierarchy funnels flow onto few corridors.', reveals: 'traffic-equals-length' },
                { text: 'Argue the fix is converting rural roads into highways so length and traffic match.', outcome: 'The tiers exist because the functions differ — rural roads give pervasive last-mile access at low volume; upgrading them to corridor standards spends highway money on capillary traffic and solves a non-problem.', reveals: 'upgrade-every-road' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_012', title: 'You made it',
          caseStudy: { intro: 'You can now pick the right mode by cost, terrain and commodity — and explain why the \'luxury\' of air travel is integration in the Northeast.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_007', difficulty: 'standard',
          question: 'Major sea ports in India are ports administered by the Central Government under.',
          hint: 'If unable to explain why Chennai needs artificial harbour while Mumbai has natural.',
          misconception: 'Students believe "major port = bigger port" and "minor port = smaller port" in physical size or cargo volume.',
          parts: [
                { id: 'a', prompt: 'A shipment of iron ore from Bellary-Hospet region (Karnataka) is exported to Japan.', answer: 'Mormugao Port (Goa)',
                  options: ['Mormugao Port (Goa)', 'Chennai', 'New Mangalore', 'resource-port linkage'],
                  hint: 'If unable to explain why Chennai needs artificial harbour while Mumbai has natural harbour, revisit.',
                  misconception: 'Students believe "major port = bigger port" and "minor port = smaller port" in physical size or cargo volume.' }
          ],
            remediations: { 'major-port-bigger-port-and': { steps: ['Revisit c11_geo_cbse_08_007 (India\'s Coastline Length and Maritime Significance) to map coastline states.', 'Use the "Major Ports of India" map in NCERT Class 12 (Fig. 7.8) — trace each port\'s hinterland railway line on an atlas.', 'Create a 3-column table: Port | Administrative Control (Major/Minor) | Top 2 Cargo Types.', 'Re-attempt Diagnostic Question 2 and 5. If still stuck, watch the 10-min PIB video "Sagarmala: Port-led Development".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "major port = bigger port" and "minor port = smaller port" in physical size or cargo volume.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Developing minor ports under State PPP models (e.g., Mundra, Krishnapatnam, Kakinada) has reduced congestion at major ports and.', answer: 'Support: (1) Mundra (Gujarat, minor port) handled 155 MMT in 2022-23',
                  options: ['Support: (1) Mundra (Gujarat, minor port) handled 155 MMT in 2022-23', 'all minor ports are small', 'major port = bigger port', 'minor port = smaller port'],
                  hint: 'If unable to explain why Chennai needs artificial harbour while Mumbai has natural harbour, revisit.',
                  misconception: 'Students believe "major port = bigger port" and "minor port = smaller port" in physical size or cargo volume.' },
                { id: 'b', prompt: 'Design a proposal for a new minor port on the Odisha coast between Paradip and Visakhapatnam.', answer: 'location coordinates, (',
                  options: ['location coordinates, (', 'major port = bigger port', 'minor port = smaller port'],
                  hint: 'If unable to explain why Chennai needs artificial harbour while Mumbai has natural harbour, revisit.',
                  misconception: 'Students believe "major port = bigger port" and "minor port = smaller port" in physical size or cargo volume.' }
          ],
            remediations: { 'major-port-bigger-port-and': { steps: ['Revisit c11_geo_cbse_08_007 (India\'s Coastline Length and Maritime Significance) to map coastline states.', 'Use the "Major Ports of India" map in NCERT Class 12 (Fig. 7.8) — trace each port\'s hinterland railway line on an atlas.', 'Create a 3-column table: Port | Administrative Control (Major/Minor) | Top 2 Cargo Types.', 'Re-attempt Diagnostic Question 2 and 5. If still stuck, watch the 10-min PIB video "Sagarmala: Port-led Development".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_008', difficulty: 'standard',
          question: 'Air transport in India refers to the system of domestic and international.',
          hint: 'If stuck on network hierarchy, revisit c11_geo_cbse_17_005 (metropolitan cities) and draw.',
          misconception: 'Students believe "UDAN made flying cheap for everyone" — they confuse the capped fare (₹2,500 per hour of flight) with.',
          parts: [
                { id: 'a', prompt: 'Name the organisation responsible for providing air traffic services and aeronautical communication in Indian airspace, and state the year when air transport.', answer: 'Correct answer: Airport Authority of India (AAI)',
                  options: ['Correct answer: Airport Authority of India (AAI)', 'Ministry of Civil Aviation', 'UDAN made flying cheap for everyone', 'UDAN reduced airfares nationwide'],
                  hint: 'If stuck on network hierarchy, revisit c11_geo_cbse_17_005 (metropolitan cities) and draw.',
                  misconception: 'Students believe "UDAN made flying cheap for everyone" — they confuse the capped fare (₹2,500 per hour of flight) with universal low fares.' },
                { id: 'b', prompt: 'A student is given a map of India showing 12 airports: 4 metro hubs (Delhi, Mumbai, Chennai, Kolkata), 4 tier-2 cities (Bengaluru, Hyderabad, Ahmedabad, Pune).', answer: 'Correct working: Step 1: Locate airports by region',
                  options: ['Correct working: Step 1: Locate airports by region', 'UDAN made flying cheap for everyone', 'UDAN reduced airfares nationwide'],
                  hint: 'If stuck on network hierarchy, revisit c11_geo_cbse_17_005 (metropolitan cities) and draw.',
                  misconception: 'Students believe "UDAN made flying cheap for everyone" — they confuse the capped fare (₹2,500 per hour of flight) with universal low fares.' }
          ],
            remediations: { 'udan-made-flying-cheap-for': { steps: ['Revisit c11_geo_cbse_21_005 (Class 11 Air Transport) — re-read the NCERT paragraph on UDAN and Pawan Hans; note the.', 'On a political map of India, mark: 4 metro hubs, 4 tier-2 cities, 4 UDAN airports (Jharsuguda, Pasighat, Tezu, Rupsi).', 'Calculate great circle distances (use Google Earth ruler tool) between each UDAN airport and its nearest metro hub.', 'Write a 50-word explanation of why Jharsuguda connects to Kolkata, not Delhi.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_009', difficulty: 'standard',
          question: 'Pipeline transport in India refers to the network of cross-country pipelines.',
          hint: 'If unable to locate hydrocarbon basins or fertilizer plants, revisit c11_geo_cbse_19_006.',
          misconception: 'Students believe pipelines are "just buried pipes" and that any liquid/gas can be pumped through the same network.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pipeline transport in India refers to the network of cross-country pipelines used for',
                  options: ['Pipeline transport in India refers to the network of cross-country pipelines used for', 'Transport in India refers to the system of moving people, goods, and services across the', 'Road transport classification in India is a hierarchical administrative framework', 'The Golden Quadrilateral (GQ) is a 5,846 km long 4/6-lane high-density national highway'],
                  hint: 'If unable to locate hydrocarbon basins or fertilizer plants, revisit c11_geo_cbse_19_006 (resource.',
                  misconception: 'Students believe pipelines are "just buried pipes" and that any liquid/gas can be pumped through the same network.' }
          ],
            remediations: { 'pipelines-are-just-buried-pipes': { steps: ['Revisit c11_geo_cbse_19_006 (Petroleum and Natural Gas Reserves) to confirm which basins produce oil vs gas — this.', 'On a blank outline map, draw ONLY the HVJ pipeline from memory; verify against textbook Fig.', 'List 5 downstream industries supplied by HVJ (fertilizer, power, petrochemical) and locate them on the same map.', 'Re-attempt Diagnostic Question 3 and 6. If branch pipelines or flow direction are still wrong, review GAIL\'s official.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_010', difficulty: 'standard',
          question: 'Communication in India refers to the systems and networks that enable the.',
          hint: 'If unclear on personal vs. mass distinction, review **c11_hs_cbse_06_003** (Levels.',
          misconception: 'Students often think "mass communication = television only" and "personal communication = mobile phones only," ignoring.',
          parts: [
                { id: 'a', prompt: 'In which year did radio broadcasting begin in India, and by which organisation?', answer: 'Radio broadcasting began in India in 1923 by the Radio Club of Bombay',
                  options: ['Radio broadcasting began in India in 1923 by the Radio Club of Bombay', 'mass communication = television only', 'personal communication = mobile phones only'],
                  hint: 'If unclear on personal vs. mass distinction, review **c11_hs_cbse_06_003** (Levels.',
                  misconception: 'Students often think "mass communication = television only" and "personal communication = mobile phones only," ignoring that **radio.' },
                { id: 'b', prompt: 'Why is satellite communication described as "vital for the country due to economic and strategic reasons" in the NCERT text?', answer: 'Satellite communication is vital',
                  options: ['Satellite communication is vital', 'TV signals', 'weather', 'mass communication = television only'],
                  hint: 'If unclear on personal vs. mass distinction, review **c11_hs_cbse_06_003** (Levels.',
                  misconception: 'Students often think "mass communication = television only" and "personal communication = mobile phones only," ignoring that **radio.' },
                { id: 'c', prompt: 'A village in Arunachal Pradesh at 2,500 m elevation has no mobile towers, no landline, and receives only intermittent radio signals.', answer: 'Satellite-based television (Doordarshan via INSAT) would be most reliable',
                  options: ['Satellite-based television (Doordarshan via INSAT) would be most reliable', 'ignores the physics of terrestrial wave propagation in mountains', 'ignores infrastructure dependency', 'personal communication = mobile phones only'],
                  hint: 'If unclear on personal vs. mass distinction, review **c11_hs_cbse_06_003** (Levels.',
                  misconception: 'Students often think "mass communication = television only" and "personal communication = mobile phones only," ignoring that **radio.' },
                { id: 'd', prompt: 'Compare the spatial distribution patterns of radio vs. television penetration in India as implied by their historical rollout (radio: 1923 Bombay → 1930.', answer: 'Radio spread gradually via terrestrial transmitters',
                  options: ['Radio spread gradually via terrestrial transmitters', 'both reached villages at the same time', 'mass communication = television only', 'personal communication = mobile phones only'],
                  hint: 'If unclear on personal vs. mass distinction, review **c11_hs_cbse_06_003** (Levels.',
                  misconception: 'Students often think "mass communication = television only" and "personal communication = mobile phones only," ignoring that **radio.' }
          ],
            remediations: { 'mass-communication-television-only-and': { steps: ['Revisit **c11_hs_cbse_06_004** (Mass Communication) and **c11_hs_cbse_06_009** (Media Types) to rebuild the personal vs.', 'mass distinction with concrete examples.', 'Create a two-column table: Column A = System (Radio, TV, Satellite, Internet, Post, Telephone); Column.', 'Fill using NCERT text + Class 11 Home Science nodes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_011', difficulty: 'standard',
          question: 'Communication networks in India comprise the integrated systems of postal.',
          hint: 'If stuck on tele-density calculation or digital divide analysis, revisit the definition.',
          misconception: 'Students often think "digital network" means only mobile internet (4G/5G) and overlook the critical role of optical.',
          parts: [
                { id: 'a', prompt: 'Name the two satellite systems operated by India for communication and remote sensing, and state one primary function of each.', answer: 'Correct answer: Indian National Satellite System (INSAT)',
                  options: ['Correct answer: Indian National Satellite System (INSAT)', 'digital network'],
                  hint: 'If stuck on tele-density calculation or digital divide analysis, revisit the definition.',
                  misconception: 'Students often think "digital network" means only mobile internet (4G/5G) and overlook the critical role of optical fibre backbone.' }
          ],
            remediations: { 'digital-network-means-only-mobile': { steps: ['Revisit c11_geo_cbse_21_007 (Class 11 Communication overview) and c10_geo_cbse_07_007 (Class 10 Communication).', 'Use the TRAI quarterly report (latest) to extract tele-density and internet subscriber data for 5 states — plot on.', 'Visit the BharatNet dashboard (bbnl.nic.in) to check GP connectivity status for your district; note the gap between.', 'Re-attempt Diagnostic Questions 2 and 4 with this data.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_012', difficulty: 'standard',
          question: 'International trade and connectivity in India refers to the system of transport.',
          hint: 'If stuck on mode-choice logic, revisit the "Transport: Importance and Various Modes".',
          misconception: 'Students believe "international trade = ports only" and ignore the role of air cargo complexes (like Delhi, Mumbai.',
          parts: [
                { id: 'a', prompt: 'What percentage of India\'s foreign trade by volume and by value moves through oceanic routes, according to the NCERT textbook?', answer: 'Approximately 95% by volume and 70% by value',
                  options: ['Approximately 95% by volume and 70% by value', 'international trade = ports only'],
                  hint: 'If stuck on mode-choice logic, revisit the "Transport: Importance and Various Modes" section.',
                  misconception: 'Students believe "international trade = ports only" and ignore the role of air cargo complexes (like Delhi, Mumbai, Bengaluru) for.' },
                { id: 'b', prompt: 'Compare the strategic significance of the Chabahar Port (Iran) and the India-Myanmar-Thailand Trilateral Highway for India\'s connectivity.', answer: 'Chabahar Port provides maritime access to Afghanistan and Central Asia bypassing',
                  options: ['Chabahar Port provides maritime access to Afghanistan and Central Asia bypassing', 'international trade = ports only'],
                  hint: 'If stuck on mode-choice logic, revisit the "Transport: Importance and Various Modes" section.',
                  misconception: 'Students believe "international trade = ports only" and ignore the role of air cargo complexes (like Delhi, Mumbai, Bengaluru) for.' }
          ],
            remediations: { 'international-trade-ports-only-and': { steps: ['If the student cannot differentiate trade volume vs value shares by mode, or cannot name three cross-border.', '(2) Study the map on NCERT p.82 showing major ports and international airports.', '(3) Read the PIB release on "Bharatmala Pariyojana" and "Sagarmala" for corridor logic.', '(4) Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
