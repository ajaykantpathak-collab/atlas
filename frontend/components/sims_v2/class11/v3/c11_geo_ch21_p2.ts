import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch21_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch21_p2: SimDef = {
    id: 'v3_c11_geo_ch21_p2',
    title: 'Transport and Communication · Part 2/2',
    subtitle: 'Separate information flow from freight — and see why rail still beats road per ton-km.',
    classLevel: 11, subject: 'geography', topic: 'Transport and Communication · Part 2/2',
    chapters: ['c11_geo_ch21'],
    nodeIds: ['c11_geo_cbse_21_007', 'c11_geo_cbse_21_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a transport planner choosing between modes', intro: 'Your message reaches Leh instantly; your parcel takes the long road. Two different networks, two different physics.', goal: 'Differentiate transport from communication, compare modal shares, and classify India\'s road hierarchy.' },
    discovery: {
        question: '\'With Digital India, why bother building roads — everything travels by internet now.\' What\'s the flaw?',
        options: ['Data flows digitally but grain, coal and machinery can\'t be emailed — physical freight still needs track and tarmac', 'Nothing — communication has replaced transport', 'Roads are only for passengers anyway', 'The internet can\'t reach villages, so roads are for data too'],
        answer: 'Data flows digitally but grain, coal and machinery can\'t be emailed — physical freight still needs track and tarmac',
        hook: 'And \'fastest\' isn\'t \'best\' — air carries under 1% of freight, while rail hauls a ton six times more efficiently per kilometre than road.',
    },
    teaching: [
        { title: 'Communication: Personal and Mass Communication (Post, Telecom, Media)', text: 'Communication in geography refers to the transmission and exchange of information, ideas, and messages across space through established networks and technologies, encompassing personal communication.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_21_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compare road and rail modal shares for freight and passengers, then classify a district road and judge Bharatmala\'s corridor logic.',
        labels: ['Communication: Personal and Mass', 'Trade and International Connectivity'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_21_007', title: 'Communication: Personal and Mass Communication (Post, Telecom, Media)',
          scaffold: { problem: 'A tribal block in Chhattisgarh (population 85,000 across 45 villages) has 22,000 wireless subscribers, 0 wireline, 3,200 inactive.',
            steps: [
            { text: 'Calculate active wireless connections = 22,000 - 3,200 = 18,800.' },
            { text: 'Broadband Readiness Index = (FTTH × 0.5 + Wireless Broadband × 0.3 + Wi-Fi × 0.2) per 1000.' },
            { text: 'Communication Accessibility Index (weights: wireless 0.4, FTTH% 0.3, community radio 0.2, PO-Aadhaar 0.1).' },
            { text: 'Diagnosis: Middle-mile (BharatNet) exists but last-mile (FTTH, Wi-Fi) absent.' },
            { text: 'Priority 1: USOF-funded 4G tower saturation (target 95% village coverage) — addresses primary access gap.' },
            { text: 'Verify: Tower saturation raises wireless tele-density to ~55%. Wi-Fi + FTTH push BRI to >150/1000.', faded: true, blankAnswer: 'Tele-density 22.1%, BRI 42.5/1000, CAI 39.5/100. Priority.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_21_008', title: 'Trade and International Connectivity: Ports and Trade Routes',
          scaffold: { problem: 'Analyse the shift in India\'s crude oil import sources from West Asia (Persian Gulf) to Russia (Baltic/Black Sea) post-2022 and its impact.',
            steps: [
            { text: 'Identify the three ports: Vadinar (Gujarat, west coast), Mundra (Gujarat, west coast), Paradip (Odisha, east coast).' },
            { text: 'Recall the two source ports: Ras Tanura (Saudi Arabia, Persian Gulf) and Novorossiysk (Russia, Black Sea).' },
            { text: 'Determine the sea route for each pair. Ras Tanura to Indian west coast ports: direct across Arabian Sea.' },
            { text: 'Calculate approximate distances using great-circle/nautical charts.' },
            { text: 'Convert distance to sailing days at 12 knots (typical VLCC speed).' },
            { text: 'Interpret: The shift increases voyage time 3-fold for west coast ports, raising freight cost and inventory holding.', faded: true, blankAnswer: 'The shift adds 8-10 days sailing time for west coast ports.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_21_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a \'Digital India\' debate, the opposition argues: \'With 5G and fibre everywhere, communication has replaced transport — who needs roads when information travels instantly? And for what freight remains, air is best because it\'s fastest.\'',
            decisions: [{ prompt: 'How do you answer both claims?', options: [
                { text: 'Separate the two systems: communication moves information, transport moves mass — you can\'t email foodgrains, coal or machinery. And \'fastest\' isn\'t \'best\': transport utility is a function of cost, speed, capacity and accessibility — air carries under 1% of freight by volume. Networks also follow geography: rail clusters in the Northern Plains and thins across the Himalaya and Thar — the imprint of terrain on economy.', outcome: 'The debate reframes: digital flow and physical flow are different circulatory systems, and mode choice is a cost-capacity trade-off, not a speed contest.' },
                { text: 'Concede communication replaces much transport — most \'movement\' today is data, so roads matter less.', outcome: 'Data replaces some travel demand but not goods flow: the physical economy still runs on roads, rail and ships — information can\'t carry a sack of grain.', reveals: 'communication-replaces-transport' },
                { text: 'Accept the air argument for high-value goods — speed is the whole point of freight.', outcome: 'Speed is one variable among four: for bulk goods, cost per tonne and capacity dominate — that\'s why coal moves by rail, not runway.', reveals: 'air-is-best-because-fastest' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_21_008', title: 'You made it',
          caseStudy: { intro: 'The rail map is geography\'s signature — lines bunch on the plains and shy from the hills because networks follow cost, not wishes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_007', difficulty: 'standard',
          question: 'Communication in geography refers to the transmission and exchange.',
          hint: 'Revisit Class 10 "Transport and Communication" (c10_geo_cbse_07_007) section.',
          misconception: 'Students believe "Digital India" means every village has high-speed internet.',
          parts: [
                { id: 'a', prompt: 'Define tele-density and explain why it is measured per 100 population rather than per square kilometer in geographical analysis of communication networks.', answer: 'Tele-density = (Total telephone connections / Total population) × 100',
                  options: ['Tele-density = (Total telephone connections / Total population) × 100', 'per sq km', 'Digital India', '"Digital India" means every village has high-speed internet'],
                  hint: 'Revisit Class 10 "Transport and Communication" (c10_geo_cbse_07_007) section on "Communication.',
                  misconception: 'Students believe "Digital India" means every village has high-speed internet.' },
                { id: 'b', prompt: 'Calculate the effective tele-density for a district with population 12.5 lakh, 8.2 lakh wireless subscribers, 45,000 wireline subscribers, and 1.8 lakh.', answer: 'Step 1: Total active connections = (8,20,000 + 45,000) – 1,80,000 = 6,85,000',
                  options: ['Step 1: Total active connections = (8,20,000 + 45,000) – 1,80,000 = 6,85,000', 'Digital India', '"Digital India" means every village has high-speed internet'],
                  hint: 'Revisit Class 10 "Transport and Communication" (c10_geo_cbse_07_007) section on "Communication.',
                  misconception: 'Students believe "Digital India" means every village has high-speed internet.' }
          ],
            remediations: { 'digital-india-means-every-village': { steps: ['Open TRAI\'s "Indian Telecom Services Performance Indicators" latest quarter report.', 'Compare "Internet Subscribers" vs "Broadband Subscribers (≥512 kbps)" for a rural-heavy state (e.g., Bihar, Odisha).', 'Map the gap to BharatNet\'s "GP lit" vs "FTTH connections" data from BBNL dashboard.', 'Visit a nearby village — count households with Wi-Fi router vs only mobile hotspot.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Digital India" means every village has high-speed internet.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India Post\'s transformation into a payments bank and logistics hub has made it more relevant for rural financial inclusion than for.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'Digital India', '"Digital India" means every village has high-speed internet'],
                  hint: 'Revisit Class 10 "Transport and Communication" (c10_geo_cbse_07_007) section on "Communication.',
                  misconception: 'Students believe "Digital India" means every village has high-speed internet.' }
          ],
            remediations: { 'digital-india-means-every-village': { steps: ['Open TRAI\'s "Indian Telecom Services Performance Indicators" latest quarter report.', 'Compare "Internet Subscribers" vs "Broadband Subscribers (≥512 kbps)" for a rural-heavy state (e.g., Bihar, Odisha).', 'Map the gap to BharatNet\'s "GP lit" vs "FTTH connections" data from BBNL dashboard.', 'Visit a nearby village — count households with Wi-Fi router vs only mobile hotspot.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_008', difficulty: 'standard',
          question: 'Trade and International Connectivity through ports refers to the network.',
          hint: 'If stuck, revisit the "Ports and their Hinterlands" section in the Class 10 Waterways.',
          misconception: 'Students often believe that a "major port" is defined solely by the volume of cargo it handles.',
          parts: [
                { id: 'a', prompt: 'Name the two major ports on the east coast of India that handle the largest volume of iron ore exports, and state the primary hinterland region for each.', answer: 'The two major ports are Paradip (Odisha) and Visakhapatnam (Andhra Pradesh)',
                  options: ['The two major ports are Paradip (Odisha) and Visakhapatnam (Andhra Pradesh)', 'major port', 'Chennai or Kolkata', 'a "major port" is defined solely by the volume of cargo it handles'],
                  hint: 'If stuck, revisit the "Ports and their Hinterlands" section in the Class 10 Waterways chapter.',
                  misconception: 'Students often believe that a "major port" is defined solely by the volume of cargo it handles.' },
                { id: 'b', prompt: 'A container ship departs from Mundra Port (Gujarat) for Jebel Ali (UAE) carrying 8,000 TEUs. The voyage distance is 1,150 nautical miles.', answer: 'Step 1: Sailing time at 18 knots = 1,150 nm / 18 knots = 63.89 hours ≈ 2.66 days',
                  options: ['Step 1: Sailing time at 18 knots = 1,150 nm / 18 knots = 63.89 hours ≈ 2.66 days', 'major port', 'a "major port" is defined solely by the volume of cargo it handles'],
                  hint: 'If stuck, revisit the "Ports and their Hinterlands" section in the Class 10 Waterways chapter.',
                  misconception: 'Students often believe that a "major port" is defined solely by the volume of cargo it handles.' }
          ],
            remediations: { 'a-major-port-is-defined': { steps: ['Show the student the list of 12 Major Ports from the Ministry of Ports, Shipping and Waterways website and the list.', 'Ask them to compare cargo volumes (e.g., Mundra ~150 MTPA vs Kolkata ~60 MTPA) and note the discrepancy.', 'Explain the legislative basis: Major Port Authorities Act, 2021 vs State Maritime Board Acts.', 'Have them re-classify a given set of ports (e.g., Krishnapatnam, Gangavaram, Hazira) using the correct legal criterion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
