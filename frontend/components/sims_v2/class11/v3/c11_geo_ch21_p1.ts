import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch21_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch21_p1: SimDef = {
    id: 'v3_c11_geo_ch21_p1',
    title: 'Transport and Communication · Part 1/2',
    subtitle: 'Separate information flow from freight — and see why rail still beats road per ton-km.',
    classLevel: 11, subject: 'geography', topic: 'Transport and Communication · Part 1/2',
    chapters: ['c11_geo_ch21'],
    nodeIds: ['c11_geo_cbse_21_001', 'c11_geo_cbse_21_002', 'c11_geo_cbse_21_003', 'c11_geo_cbse_21_004', 'c11_geo_cbse_21_005', 'c11_geo_cbse_21_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a transport planner choosing between modes', intro: 'Your message reaches Leh instantly; your parcel takes the long road. Two different networks, two different physics.', goal: 'Differentiate transport from communication, compare modal shares, and classify India\'s road hierarchy.' },
    discovery: {
        question: '\'With Digital India, why bother building roads — everything travels by internet now.\' What\'s the flaw?',
        options: ['Data flows digitally but grain, coal and machinery can\'t be emailed — physical freight still needs track and tarmac', 'Nothing — communication has replaced transport', 'Roads are only for passengers anyway', 'The internet can\'t reach villages, so roads are for data too'],
        answer: 'Data flows digitally but grain, coal and machinery can\'t be emailed — physical freight still needs track and tarmac',
        hook: 'And \'fastest\' isn\'t \'best\' — air carries under 1% of freight, while rail hauls a ton six times more efficiently per kilometre than road.',
    },
    teaching: [
        { title: 'Transport: Importance and Modes in India', text: 'Transport refers to the system of moving people, goods, and services from one location to another using various modes (road, rail, water, air, pipeline) over a network of infrastructure; in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_21_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compare road and rail modal shares for freight and passengers, then classify a district road and judge Bharatmala\'s corridor logic.',
        labels: ['Transport: Importance and Modes', 'Road Transport: Classification', 'Railways: Network, Gauge Systems', 'Water Transport: Inland Waterways', 'Air Transport: Domestic', 'Pipeline Transport: Oil'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_21_001', title: 'Transport: Importance and Modes in India',
          scaffold: { problem: 'A fertilizer plant in Panipat (Haryana) needs to transport 1 million tonnes of urea annually to farmers in Bihar.',
            steps: [
            { text: 'Identify the commodity (urea – bagged, non-perishable, high volume, medium value) and origin-destination (Panipat.' },
            { text: 'Recall modal characteristics: Rail economical for long-haul bulk; Road essential for last-mile distribution.' },
            { text: 'Calculate Option A cost: 1,000,000 tonnes × 1,000 km × ₹1.40 = ₹1,400 crore (but assumes rail reaches every village.' },
            { text: 'Calculate Option B cost: Rail leg = 1,000,000 × 1,000 × ₹1.40 = ₹1,400 crore; Road leg = 1,000,000 × 50 × ₹2.80 = ₹140.' },
            { text: 'Interpret: Option B is realistic; the 10% cost premium over hypothetical direct rail is the \'last-mile penalty\' that.', faded: true, blankAnswer: 'Option B (Rail + Road) at ₹1,540 crore is the only feasible.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_21_002', title: 'Road Transport: Classification of Roads (National, State, District, Rural)',
          caseStudy: { intro: 'Imagine traveling from your village to the nearest city: you start on a narrow, unpaved track, then join a wider paved road with yellow milestones, and finally.',
            decisions: [{ prompt: 'List the five categories of road classification in India in descending order of their administrative hierarchy and typical design standards.', options: [
                { text: 'Correct order: National Highways (NH) > State Highways (SH) > Major District Roads (MDR)', outcome: 'Correct order: National Highways (NH) > State Highways (SH) > Major District Roads (MDR) > Other.' },
                { text: 'National Highways are always the widest and best-maintained roads', outcome: 'Not quite — Students often think "National Highways are always the widest and best-maintained roads" and "State.', reveals: 'national-highways-are-always-the' },
                { text: 'State Highways are inferior', outcome: 'Not quite — Students often think "National Highways are always the widest and best-maintained roads" and "State.', reveals: 'national-highways-are-always-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_21_004', title: 'Water Transport: Inland Waterways and Ocean Routes',
          scaffold: { problem: 'Determine the feasibility of shifting 3 million tonnes/year of fly ash from a thermal plant at Ramagundam (Telangana, on Godavari).',
            steps: [
            { text: 'Identify the complete multimodal chain for water option: Ramagundam → (barge NW-4) → Rajahmundry → (barge canal) →.' },
            { text: 'Calculate water leg distances and costs: NW-4 river 300 km × ₹0.50 = ₹150/t; canal 150 km × ₹0.50 = ₹75/t; coastal 1400.' },
            { text: 'Calculate transshipment costs: Assume barge-to-ship at Krishnapatnam (₹80/t) + ship-to-rail at Mundra (₹120/t) = ₹200/t.' },
            { text: 'Add last-mile rail Mundra to plant (assume 50 km × ₹1.40 = ₹70/t).' },
            { text: 'Calculate all-rail cost: 1100 km × ₹1.40 = ₹1540/tonne. No transshipment.' },
            { text: 'Compare: Water saves ₹695/tonne (45% cheaper). Annual saving = 3 Mt × ₹695 = ₹2085 crore.', faded: true, blankAnswer: 'Water multimodal cost ₹845/tonne vs Rail ₹1540/tonne →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_21_006', title: 'Pipeline Transport: Oil and Gas Networks in India',
          scaffold: { problem: 'The Kandla–Bhatinda petroleum product pipeline (1,100 km, 18-inch) transports 6 MMTPA of diesel/petrol from Kandla (import terminal).',
            steps: [
            { text: 'Identify number of pump stations: 1,100 km / 100 km = 11 intervals → 11 stations.' },
            { text: 'Calculate running power per station: 2 pumps × 1.8 MW = 3.6 MW = 3,600 kW.' },
            { text: 'Total running power: 11 stations × 3,600 kW = 39,600 kW.' },
            { text: 'Annual operating hours: 365 days × 24 h × 0.92 utilisation = 8,059.2 hours.' },
            { text: 'Annual energy consumption: 39,600 kW × 8,059.2 h = 319,144,320 kWh ≈ 319.1 GWh.' },
            { text: 'Annual electricity cost: 319.144 × 10⁶ kWh × ₹6.50/kWh = ₹2,074.44 crore.' },
            { text: 'Rail cost for comparison: 6 × 10⁶ tonnes × 1,100 km × ₹1.50/tonne-km = ₹9,900 crore.' },
            { text: 'Pipeline transport cost (energy only) is ~21% of rail cost; adding O&M (~₹0.20/tonne-km) still keeps pipeline <30%.', faded: true, blankAnswer: 'Annual electricity cost ≈ ₹2,074 crore. Pipeline energy.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_21_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a \'Digital India\' debate, the opposition argues: \'With 5G and fibre everywhere, communication has replaced transport — who needs roads when information travels instantly? And for what freight remains, air is best because it\'s fastest.\'',
            decisions: [{ prompt: 'How do you answer both claims?', options: [
                { text: 'Separate the two systems: communication moves information, transport moves mass — you can\'t email foodgrains, coal or machinery. And \'fastest\' isn\'t \'best\': transport utility is a function of cost, speed, capacity and accessibility — air carries under 1% of freight by volume. Networks also follow geography: rail clusters in the Northern Plains and thins across the Himalaya and Thar — the imprint of terrain on economy.', outcome: 'The debate reframes: digital flow and physical flow are different circulatory systems, and mode choice is a cost-capacity trade-off, not a speed contest.' },
                { text: 'Concede communication replaces much transport — most \'movement\' today is data, so roads matter less.', outcome: 'Data replaces some travel demand but not goods flow: the physical economy still runs on roads, rail and ships — information can\'t carry a sack of grain.', reveals: 'communication-replaces-transport' },
                { text: 'Accept the air argument for high-value goods — speed is the whole point of freight.', outcome: 'Speed is one variable among four: for bulk goods, cost per tonne and capacity dominate — that\'s why coal moves by rail, not runway.', reveals: 'air-is-best-because-fastest' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_21_006', title: 'The bigger picture',
          caseStudy: { intro: 'The rail map is geography\'s signature — lines bunch on the plains and shy from the hills because networks follow cost, not wishes.',
            decisions: [{ prompt: 'What comes next? Transport and Communication · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Transport and Communication · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_001', difficulty: 'standard',
          question: 'Transport refers to the system of moving people, goods, and services from one.',
          hint: 'Revisit Class 6 Physical Divisions of India (c6_geography_ch01_001) and Class 10.',
          misconception: 'Students think \'transport\' and \'communication\' are interchangeable or that communication (internet, mobile) replaces.',
          parts: [
                { id: 'a', prompt: 'Given: Road transport carries 65% of freight and 80% of passenger traffic in India, but railways carry 35% of freight and 15% of passengers.', answer: 'Step 1: Freight share Road = 65%, Rail = 35%',
                  options: ['Step 1: Freight share Road = 65%, Rail = 35%', 'with digital India, we don\'t need roads'],
                  hint: 'Revisit Class 6 Physical Divisions of India (c6_geography_ch01_001) and Class 10 Manufacturing.',
                  misconception: 'Students think \'transport\' and \'communication\' are interchangeable or that communication (internet, mobile) replaces physical transport.' }
          ],
            remediations: { 'transport-and-communication-are-interchangeable': { steps: ['Use a physical map of India (topographical sheet 1:250,000) and trace the route of a coal wagon from Jharia (Jharkhand).', 'Calculate cost per tonne for each leg using published tariffs (rail ₹1.5, road ₹3.0, coastal ship ₹0.8).', 'Discuss why the coal doesn\'t go by air or pipeline.', 'Relate to the concept of \'modal choice matrix\' (distance vs. value/weight ratio).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_002', difficulty: 'standard',
          question: 'Road classification in India is an administrative and functional categorization.',
          hint: 'Revisit Class 10 Geography Chapter 7 (Roadways classification) and Class 10 Civics.',
          misconception: 'Students often think "National Highways are always the widest and best-maintained roads" and "State Highways are.',
          parts: [
                { id: 'a', prompt: 'Why are National Highways numbered with a systematic north-south (odd numbers) and east-west (even numbers) grid, while State Highways lack a uniform national.', answer: 'National Highways form a national grid requiring a unified navigation system',
                  options: ['National Highways form a national grid requiring a unified navigation system', 'NH numbering is random', 'SHs follow the same grid', 'National Highways are always the widest and best-maintained roads'],
                  hint: 'Revisit Class 10 Geography Chapter 7 (Roadways classification) and Class 10 Civics Chapter 2.',
                  misconception: 'Students often think "National Highways are always the widest and best-maintained roads" and "State Highways are inferior." In reality.' },
                { id: 'b', prompt: 'A road connects the district headquarters of Bhilwara (Rajasthan) to the nearby town of Shahpura, carries moderate traffic (300 PCUs/day), and is maintained.', answer: 'Major District Road (MDR)',
                  options: ['Major District Road (MDR)', 'National Highways are always the widest and best-maintained roads', 'State Highways are inferior'],
                  hint: 'Revisit Class 10 Geography Chapter 7 (Roadways classification) and Class 10 Civics Chapter 2.',
                  misconception: 'Students often think "National Highways are always the widest and best-maintained roads" and "State Highways are inferior." In reality.' }
          ],
            remediations: { 'national-highways-are-always-the': { steps: ['Show a map of India\'s NH network with the 2010 numbering. Ask students to trace NH 44 (N-S) and NH 27 (E-W) and verify.', 'Compare a well-maintained SH (e.g., Mumbai-Pune Expressway) with a poorly maintained NH stretch.', 'Use a district map to identify MDR vs ODR based on whether they connect to taluka HQ or just villages.', 'Assign a mini-case: "Classify the road from your village to the nearest town" using three criteria: administrative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_003', difficulty: 'standard',
          question: 'Railways in India refer to the network of rail tracks, stations, and rolling.',
          hint: 'If stuck, revisit Class 10 Geography Chapter 7 (Transport) section on railways and Class.',
          misconception: 'Students often think that \'gauge\' refers to the distance between the outer edges of the rails, but it is actually the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Railways in India refer to the network of rail tracks, stations, and rolling stock that',
                  options: ['Railways in India refer to the network of rail tracks, stations, and rolling stock that', 'Transport refers to the system of moving people, goods, and services from one location to', 'Road classification in India is an administrative and functional categorization of roads', 'Water transport is the movement of people and goods via navigable water bodies,'],
                  hint: 'If stuck, revisit Class 10 Geography Chapter 7 (Transport) section on railways and Class 9 Physical.',
                  misconception: 'Students often think that \'gauge\' refers to the distance between the outer edges of the rails, but it is actually the distance between the.' }
          ],
            remediations: { 'gauge-refers-to-the-distance': { steps: ['Use a physical model or diagram showing cross-section of rails to demonstrate inner-face measurement.', 'Take a simple network diagram (e.g., a Y-junction) and calculate both route length and running track length to clarify.', 'Refer to the latest Indian Railway Statistical Summary to see actual numbers and practice converting between them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_004', difficulty: 'standard',
          question: 'Water transport is the movement of people and goods via navigable water bodies.',
          hint: 'If stuck, revisit Class 9 \'Drainage\' chapter (river regimes) and Class 6 \'Coastal Plains\'.',
          misconception: 'Students believe \'inland waterways\' only mean rivers like Ganga/Brahmaputra, and that \'canals\' are artificial channels.',
          parts: [
                { id: 'a', prompt: 'List the three National Waterways operational in India as of 2014 (before the 2016 Act declared 111 NWs) and the primary river system each utilizes.', answer: 'Correct answer: NW-1 (Ganga-Bhagirathi-Hooghly: Prayagraj-Haldia, 1620 km), NW-2',
                  options: ['Correct answer: NW-1 (Ganga-Bhagirathi-Hooghly: Prayagraj-Haldia, 1620 km), NW-2', 'NW-4 or NW-5 as pre-2016 operational'],
                  hint: 'If stuck, revisit Class 9 \'Drainage\' chapter (river regimes) and Class 6 \'Coastal Plains\'.',
                  misconception: 'Students believe \'inland waterways\' only mean rivers like Ganga/Brahmaputra, and that \'canals\' are artificial channels like the.' },
                { id: 'b', prompt: 'A thermal power plant in Bihar needs 5 million tonnes of coal annually from Talcher (Odisha).', answer: 'Step 1: Route A (All rail) = 800 km × ₹1.5 = ₹1200/tonne',
                  options: ['Step 1: Route A (All rail) = 800 km × ₹1.5 = ₹1200/tonne', 'coastal shipping serves inland directly'],
                  hint: 'If stuck, revisit Class 9 \'Drainage\' chapter (river regimes) and Class 6 \'Coastal Plains\'.',
                  misconception: 'Students believe \'inland waterways\' only mean rivers like Ganga/Brahmaputra, and that \'canals\' are artificial channels like the.' }
          ],
            remediations: { 'inland-waterways-only-mean-rivers': { steps: ['On India\'s physical map, trace NW-3 (Kottapuram-Kollam) – note it runs parallel to coast through Vembanad Lake.', 'Compare with NW-1 (Ganga) – one is tidal/estuarine, the other fluvial.', 'Read IWAI\'s \'Classification of Inland Waterways\' (Class I-VII) – see how tidal canals have different depth/draft.', 'Watch a 5-min video of Kerala houseboats vs Ganga barges – observe water level stability.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_005', difficulty: 'standard',
          question: 'Air transport refers to the movement of passengers and cargo by aircraft.',
          hint: 'Review Class 11 Chapter 2 (Structure and Physiography) and Class 10 Chapter 7 (Transport).',
          misconception: 'Students often think international airports are only in metropolitan cities (Delhi, Mumbai, Chennai, Kolkata).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Air transport refers to the movement of passengers and cargo by aircraft, providing rapid',
                  options: ['Air transport refers to the movement of passengers and cargo by aircraft, providing rapid', 'Transport refers to the system of moving people, goods, and services from one location to', 'Road classification in India is an administrative and functional categorization of roads', 'Railways in India refer to the network of rail tracks, stations, and rolling stock that'],
                  hint: 'Review Class 11 Chapter 2 (Structure and Physiography) and Class 10 Chapter 7 (Transport) for.',
                  misconception: 'Students often think international airports are only in metropolitan cities (Delhi, Mumbai, Chennai, Kolkata).' }
          ],
            remediations: { 'international-airports-are-only-in': { steps: ['Show a map of India\'s international airports (including non-metros).', 'For each non-metro international airport, identify the unique demand generator (e.g., Kochi → Gulf migrants; Amritsar →.', 'Have students plot these on a blank map and annotate the factor.', 'Discuss how physical geography (coastal location, border proximity) and human geography (diaspora, religion, tourism).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_006', difficulty: 'standard',
          question: 'Pipeline transport is a mode of transportation that uses a network of connected.',
          hint: 'If stuck, revisit Class 10 Chapter 7 (c10_geo_cbse_07_004) for pipeline basics and Class.',
          misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas.',
          parts: [
                { id: 'a', prompt: 'A 1,200 km crude oil pipeline of 18-inch diameter operates at 6 MMTPA capacity.', answer: 'Step 1: Total pump power = 8 stations × 2.5 MW = 20 MW (1200/150 = 8 intervals)',
                  options: ['Step 1: Total pump power = 8 stations × 2.5 MW = 20 MW (1200/150 = 8 intervals)', 'HBJ pipeline carries crude oil to Barauni refinery'],
                  hint: 'If stuck, revisit Class 10 Chapter 7 (c10_geo_cbse_07_004) for pipeline basics and Class 11 Chapter.',
                  misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas interchangeably.' }
          ],
            remediations: { 'students-conflate-pipeline-as-a': { steps: ['Draw a 3-column table on paper: Column A = Pipeline Name, Column B = Commodity (Crude Oil / Petroleum Products.', 'On an outline map of India, plot the 3 trunk oil pipelines (red) and 2 trunk gas pipelines (blue) with arrows showing.', 'For each pipeline, write one sentence: "This pipeline exists because [source] produces [commodity] and [destination].', 'Re-attempt Diagnostic Questions 1 and 4. The act of mapping commodity-to-use logic breaks the "generic pipe".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_21_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The National Gas Grid (NGG) and City Gas Distribution (CGD) network will make pipeline transport the backbone of India\'s energy.', answer: 'Judgement: Largely valid but constrained by last-mile economics',
                  options: ['Judgement: Largely valid but constrained by last-mile economics', 'HBJ pipeline carries crude oil to Barauni refinery'],
                  hint: 'If stuck, revisit Class 10 Chapter 7 (c10_geo_cbse_07_004) for pipeline basics and Class 11 Chapter.',
                  misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas interchangeably.' },
                { id: 'b', prompt: 'Design a pipeline corridor proposal for transporting natural gas from the Krishna-Godavari (KG) Basin offshore fields to the upcoming petrochemical cluster.', answer: 'Good answer criteria: (1) Waypoint 1: KG-D6 onshore terminal (Kakinada/Ravva)',
                  options: ['Good answer criteria: (1) Waypoint 1: KG-D6 onshore terminal (Kakinada/Ravva)', 'HBJ pipeline carries crude oil to Barauni refinery'],
                  hint: 'If stuck, revisit Class 10 Chapter 7 (c10_geo_cbse_07_004) for pipeline basics and Class 11 Chapter.',
                  misconception: 'Students conflate "pipeline" as a single generic network and assume all pipelines carry both oil and gas interchangeably.' }
          ],
            remediations: { 'students-conflate-pipeline-as-a': { steps: ['Draw a 3-column table on paper: Column A = Pipeline Name, Column B = Commodity (Crude Oil / Petroleum Products.', 'On an outline map of India, plot the 3 trunk oil pipelines (red) and 2 trunk gas pipelines (blue) with arrows showing.', 'For each pipeline, write one sentence: "This pipeline exists because [source] produces [commodity] and [destination].', 'Re-attempt Diagnostic Questions 1 and 4. The act of mapping commodity-to-use logic breaks the "generic pipe".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
