import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch15_p1: SimDef = {
    id: 'v3_c12_geo_ch15_p1',
    title: 'Transport and Communication in India · Part 1/2',
    subtitle: 'Rail is \'the backbone\' — but roads carry 70% of the freight',
    classLevel: 12, subject: 'geography', topic: 'Transport and Communication in India · Part 1/2',
    chapters: ['c12_geo_ch15'],
    nodeIds: ['c12_geo_cbse_15_001', 'c12_geo_cbse_15_002', 'c12_geo_cbse_15_003', 'c12_geo_cbse_15_004', 'c12_geo_cbse_15_005', 'c12_geo_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Transport planner', intro: 'Milk by highway, coal by rail, oil by pipeline — every commodity votes for a mode. Learn what it\'s voting for.', goal: 'Analyse India\'s five transport modes by physiography, cost logic and regional fit.' },
    discovery: {
        question: 'Rail is cheaper per tonne-km for bulk over distance — yet roads carry ~70% of India\'s freight. Why does the \'expensive\' mode win?',
        options: ['Total logistics beat line-haul — door-to-door reach, small consignments and last-mile access outweigh the railway\'s per-km edge under 500 km', 'Roads are actually cheaper', 'Railways are broken', 'Trucks are faster'],
        answer: 'Total logistics beat line-haul — door-to-door reach, small consignments and last-mile access outweigh the railway\'s per-km edge under 500 km',
        hook: '\'Backbone of transport\' misleads: roads move ~85% of passengers and 70% of freight by volume. And mode choice is physiography in disguise — pipelines hug the flat west where the oil is, air links the Northeast where terrain defeats roads, waterways idle at 1% not for lack of rivers but for lack of dredging.',
    },
    teaching: [
        { title: 'Transport in India: Importance and Modes', text: 'Transport in India refers to the system of moving people, goods, and services across the country\'s diverse physiographic regions using five primary modes — road, rail, water, air, and pipeline — each.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Route India\'s cargo like a planner: split freight from passenger logic, justify why pipelines live where they do, and design a multimodal chain from Bellary\'s ore to Kolkata\'s docks.',
        labels: ['Transport in India: Importance', 'Road Transport: Classification (National,', 'Road Transport: Golden Quadrilateral', 'Railways in India: Network,', 'Railways: Recent Developments (Metro,', 'Water Transport: Inland Waterways'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_15_001', title: 'Transport in India: Importance and Modes',
          scaffold: { problem: 'A fertilizer plant in Panipat (Haryana) requires 2 million tonnes of natural gas annually.',
            steps: [
            { text: 'Identify the commodity — natural gas (gaseous, continuous flow required, hazardous if leaked).' },
            { text: 'Recall transport mode characteristics — pipelines are purpose-built for gases/liquids over long distances with low unit.' },
            { text: 'Map the route — KG Basin to Panipat ~1,800 km via East-West Pipeline (part of national gas grid); Rajasthan fields.' },
            { text: 'Compare alternatives — Rail (CNG cascades): high cost, limited capacity, safety risk.' },
            { text: 'Conclude — Pipeline is optimal. The East-West Pipeline (now part of national gas grid) connects KG Basin to North.', faded: true, blankAnswer: 'Pipeline transport via the national gas grid (East-West.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_15_002', title: 'Road Transport: Classification (National, State, District, Rural Highways)',
          scaffold: { problem: 'A district in the Western Ghats has 1,200 km of Rural Roads, 180 km of Major District Roads, 90 km of State Highways, and 45 km of National.',
            steps: [
            { text: 'Recall road density formula = (road length in km / area in km²) × 100 → gives km per 100 km².' },
            { text: 'Calculate for each tier: Rural = (1200/8500)×100 = 14.1 km/100 km²; District = (180/8500)×100 = 2.1; SH = (90/8500)×100.' },
            { text: 'Compute Rural density as % of national average: (14.1 / 180) × 100 = 7.8% — severely deficient.' },
            { text: 'Analyse terrain: Western Ghats = steep slopes (>25°), high rainfall (2000-4000 mm), dense forest, landslide-prone.' },
            { text: 'Verify: Low rural density aligns with NCERT statement "rural roads\' density very low in hilly, plateau and forested.', faded: true, blankAnswer: '(a) Rural: 14.1, District: 2.1, SH: 1.1, NH: 0.53 km/100.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_15_003', title: 'Road Transport: Golden Quadrilateral and North-South, East-West Corridors',
          scaffold: { problem: 'A logistics firm ships 20 tonnes of automotive components from Pune (on GQ Mumbai–Chennai arm) to Chennai.',
            steps: [
            { text: 'Identify the two scenarios — pre-GQ (old NH-4) and post-GQ (upgraded NH-48) — and list given parameters for each.' },
            { text: 'Compute transit time for each: pre = 1,150 ÷ 45 = 25.56 h; post = 1,080 ÷ 75 = 14.4 h.' },
            { text: 'Compute fuel consumption: pre = 1,150 ÷ 3.5 = 328.6 litres; post = 1,080 ÷ 4.2 = 257.1 litres.' },
            { text: 'Compute fuel cost: pre = 328.6 × 90 = ₹29,574; post = 257.1 × 90 = ₹23,139.' },
            { text: 'Compute driver wage cost: pre = 25.56 × 500 = ₹12,780; post = 14.4 × 500 = ₹7,200.' },
            { text: 'Total trip cost: pre = 29,574 + 12,780 = ₹42,354; post = 23,139 + 7,200 = ₹30,339.' },
            { text: 'Per-tonne cost: pre = 42,354 ÷ 20 = ₹2,118; post = 30,339 ÷ 20 = ₹1,517.' },
            { text: 'Saving = 2,118 – 1,517 = ₹601 per tonne (28.4% reduction).', faded: true, blankAnswer: '₹601 per tonne saving (28.4% reduction), driven by 43.6%.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_004', title: 'Railways in India: Network, Gauge Systems and Significance',
          caseStudy: { intro: 'Begin by observing a railway map of India (e.g., Survey of India toposheet or IRCTC route map).',
            decisions: [{ prompt: 'Name the three gauge categories of Indian Railways with their track widths in metres, and state the total route length of each as per.', options: [
                { text: 'Broad gauge: 1.676 m, 63,950 km', outcome: 'Broad gauge: 1.676 m, 63,950 km; Metre gauge: 1.000 m, 2,402 km; Narrow gauge: 0.762 m / 0.610.' },
                { text: 'gauge conversion is complete', outcome: 'Not quite — Students often think "gauge conversion is complete" or "metre gauge no longer exists." In reality.', reveals: 'gauge-conversion-is-complete-or' },
                { text: 'metre gauge no longer exists', outcome: 'Not quite — Students often think "gauge conversion is complete" or "metre gauge no longer exists." In reality.', reveals: 'gauge-conversion-is-complete-or' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_15_005', title: 'Railways: Recent Developments (Metro, Dedicated Freight Corridors)',
          scaffold: { problem: 'The Eastern DFC runs 1,856 km from Ludhiana to Dankuni. A double-stack container train (90 wagons, 25 tonne axle load) carries 13,500.',
            steps: [
            { text: 'Trucks needed = Train payload / Truck payload = 13,500 / 25 = 540 trucks.' },
            { text: 'Train time = Distance / Speed = 1,856 km / 100 kmph = 18.56 hours. Truck time = 1,856 km / 60 kmph = 30.93 hours.' },
            { text: 'Daily tonne-km shifted = 50 trains × 13,500 tonnes × 1,856 km = 1,253,280,000 tonne-km/day.' },
            { text: 'Daily CO2 saving = Daily tonne-km × (80 - 15) g/tonne-km = 1.25328e9 × 65 g = 81,463,200,000 g = 81,463 tonnes CO2/day.' },
            { text: 'Annual CO2 reduction = 81,463 × 365 ≈ 29.7 million tonnes CO2/year.', faded: true, blankAnswer: '(a) 540 trucks, (b) 12.37 hours, (c) ~29.7 million tonnes.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_006', title: 'Water Transport: Inland Waterways and National Waterways',
          caseStudy: { intro: 'Observe a river or canal near your town — notice whether boats or barges ply on it, what they carry, and how the water level changes across seasons.',
            decisions: [{ prompt: 'Name the river stretch designated as National Waterway 1 (NW1) and state its total navigable length.', options: [
                { text: 'NW1 is the Prayagraj–Haldia stretch of the Ganga–Bhagirathi–Hooghly river system, with a', outcome: 'NW1 is the Prayagraj–Haldia stretch of the Ganga–Bhagirathi–Hooghly river system, with a total.' },
                { text: 'National Waterway', outcome: 'Not quite — Students often believe that “National Waterway” means the entire river from source to mouth.', reveals: 'national-waterway-means-the-entire' },
                { text: 'the Brahmaputra or giving a shorter length', outcome: 'Not quite — Students often believe that “National Waterway” means the entire river from source to mouth.', reveals: 'national-waterway-means-the-entire' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate presenting on Indian transport claims: \'National Highways are the country\'s real road network — they\'re the longest roads, which is why they carry the most traffic.\'',
            decisions: [{ prompt: 'What does the road-hierarchy data actually show?', options: [
                { text: 'The reverse — NH are only about 2% of road length yet carry ~40% of traffic; rural roads are the longest by far, so the network is a hierarchy where few high-order links concentrate flow while many low-order links provide access.', outcome: 'The chapter\'s key statistic inverts the intuition: strategic importance and physical extent are different variables — arteries are short, capillaries are vast.' },
                { text: 'Agree — the roads carrying 40% of traffic must logically be the longest network.', outcome: 'That\'s conflating traffic share with length: NH hit 40% of traffic on barely 2% of the kilometres precisely because the hierarchy funnels flow onto few corridors.', reveals: 'traffic-equals-length' },
                { text: 'Argue the fix is converting rural roads into highways so length and traffic match.', outcome: 'The tiers exist because the functions differ — rural roads give pervasive last-mile access at low volume; upgrading them to corridor standards spends highway money on capillary traffic and solves a non-problem.', reveals: 'upgrade-every-road' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now pick the right mode by cost, terrain and commodity — and explain why the \'luxury\' of air travel is integration in the Northeast.',
            decisions: [{ prompt: 'What comes next? Transport and Communication in India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Transport and Communication in India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_001', difficulty: 'standard',
          question: 'Transport in India refers to the system of moving people, goods, and services.',
          hint: 'If stuck, review c11_geo_cbse_09_001 to c11_geo_cbse_09_008 (Physiographic Divisions) and.',
          misconception: 'Students believe "railways are the backbone of India\'s transport" and therefore carry the majority of both passengers.',
          parts: [
                { id: 'a', prompt: 'Name the five major modes of transport in India and state the approximate percentage of freight traffic carried by roads according to recent data.', answer: 'The five major modes are road, rail, water, air, and pipeline',
                  options: ['The five major modes are road, rail, water, air, and pipeline', 'railways are the backbone of India\'s transport', 'backbone', 'which mode carries maximum freight?'],
                  hint: 'If stuck, review c11_geo_cbse_09_001 to c11_geo_cbse_09_008 (Physiographic Divisions) and.',
                  misconception: 'Students believe "railways are the backbone of India\'s transport" and therefore carry the majority of both passengers and freight.' },
                { id: 'b', prompt: 'Why does road transport carry a higher share of freight traffic (70%) than railways (approx 30%) despite railways being cheaper per tonne-km for bulk goods.', answer: 'Road transport dominates freight',
                  options: ['Road transport dominates freight', 'cost per km', 'railways are the backbone of India\'s transport', 'backbone'],
                  hint: 'If stuck, review c11_geo_cbse_09_001 to c11_geo_cbse_09_008 (Physiographic Divisions) and.',
                  misconception: 'Students believe "railways are the backbone of India\'s transport" and therefore carry the majority of both passengers and freight.' }
          ],
            remediations: { 'railways-are-the-backbone-of': { steps: ['If the student cannot differentiate modal shares, have them: (1) Revisit c11_geo_cbse_21_001 (Class 11 Transport.', '(2) Create a comparison table: Mode | % Passenger | % Freight | Typical Distance | Typical Commodity.', '(3) Practice a board-style question: "Analyze the reasons for roads carrying 70% freight despite higher per-tonne-km.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "railways are the backbone of India\'s transport" and therefore carry the majority of both passengers.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Air transport in India is a luxury for the rich and has no role in national integration." Use geographical and socio-economic.', answer: 'The statement is false',
                  options: ['The statement is false', 'railways are the backbone of India\'s transport', 'backbone', 'which mode carries maximum freight?'],
                  hint: 'If stuck, review c11_geo_cbse_09_001 to c11_geo_cbse_09_008 (Physiographic Divisions) and.',
                  misconception: 'Students believe "railways are the backbone of India\'s transport" and therefore carry the majority of both passengers and freight.' },
                { id: 'b', prompt: 'Design a multimodal transport corridor for moving iron ore from Bellary (Karnataka) to a steel plant in Jamshedpur (Jharkhand) and then finished steel.', answer: 'Leg 1 (Bellary to Chennai/Krishnapatnam port): Rail',
                  options: ['Leg 1 (Bellary to Chennai/Krishnapatnam port): Rail', 'railways are the backbone of India\'s transport', 'backbone', 'which mode carries maximum freight?'],
                  hint: 'If stuck, review c11_geo_cbse_09_001 to c11_geo_cbse_09_008 (Physiographic Divisions) and.',
                  misconception: 'Students believe "railways are the backbone of India\'s transport" and therefore carry the majority of both passengers and freight.' }
          ],
            remediations: { 'railways-are-the-backbone-of': { steps: ['If the student cannot differentiate modal shares, have them: (1) Revisit c11_geo_cbse_21_001 (Class 11 Transport.', '(2) Create a comparison table: Mode | % Passenger | % Freight | Typical Distance | Typical Commodity.', '(3) Practice a board-style question: "Analyze the reasons for roads carrying 70% freight despite higher per-tonne-km.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_002', difficulty: 'standard',
          question: 'Road transport classification in India is a hierarchical administrative.',
          hint: 'If stuck on hierarchy logic, revisit c11_geo_cbse_21_002 (Class 11 Road Transport) and.',
          misconception: 'Students believe "State Highways are always wider/better than National Highways" because they see well-maintained SH.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution assign National Highways to the Union List while State Highways fall under the State List?', answer: 'National Highways enable *inter-state* economic integration (common market) and',
                  options: ['National Highways enable *inter-state* economic integration (common market) and', 'funding capacity', 'State Highways are always wider/better than National Highways', 'Other Roads'],
                  hint: 'If stuck on hierarchy logic, revisit c11_geo_cbse_21_002 (Class 11 Road Transport) and draw the.',
                  misconception: 'Students believe "State Highways are always wider/better than National Highways" because they see well-maintained SH in their state while.' },
                { id: 'b', prompt: 'Using Table 7.1 data, calculate: (a) the percentage share of State Highways in total road length, (b) the ratio of Rural Roads (Other Roads) length to National.', answer: 'the percentage share of State Highways in total road length, (',
                  options: ['the percentage share of State Highways in total road length, (', 'State Highways are always wider/better than National Highways', 'Other Roads'],
                  hint: 'If stuck on hierarchy logic, revisit c11_geo_cbse_21_002 (Class 11 Road Transport) and draw the.',
                  misconception: 'Students believe "State Highways are always wider/better than National Highways" because they see well-maintained SH in their state while.' },
                { id: 'c', prompt: 'Compare rural road density in the Indo-Gangetic Plain vs the Himalayan region.', answer: 'Indo-Gangetic Plain: high rural road density',
                  options: ['Indo-Gangetic Plain: high rural road density', 'State Highways are always wider/better than National Highways', 'Other Roads'],
                  hint: 'If stuck on hierarchy logic, revisit c11_geo_cbse_21_002 (Class 11 Road Transport) and draw the.',
                  misconception: 'Students believe "State Highways are always wider/better than National Highways" because they see well-maintained SH in their state while.' }
          ],
            remediations: { 'state-highways-are-always-wider': { steps: ['Revisit c11_geo_cbse_21_002 (Class 11 Road Transport classification) — re-read the hierarchy table and memorise the 5.', 'Open morth.nic.in → "National Highway Details" → find your state\'s NH numbers and lengths; trace one NH on Google Maps.', 'Compare PMGSY (rural roads) vs NHAI websites — note the *different* funding mechanisms (central sponsorship vs central.', 'Re-attempt Diagnostic Q3 with fresh data from the latest Annual Report (2023-24 if available) to practice statistical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_003', difficulty: 'standard',
          question: 'The Golden Quadrilateral (GQ) is a 5,846 km long 4/6-lane high-density national.',
          hint: 'If stuck, revisit c12_geo_cbse_15_002 (Road Classification) for NH vs SH distinction and.',
          misconception: 'Students commonly believe the Golden Quadrilateral is a "new road built from scratch" rather than an **upgradation.',
          parts: [
                { id: 'a', prompt: 'A freight truck travels from Delhi to Chennai via the Golden Quadrilateral (GQ) arm.', answer: 'Step 1: Pre-GQ time = 2,350 km ÷ 40 km/h = 58.75 hours',
                  options: ['Step 1: Pre-GQ time = 2,350 km ÷ 40 km/h = 58.75 hours', 'time = distance/speed'],
                  hint: 'If stuck, revisit c12_geo_cbse_15_002 (Road Classification) for NH vs SH distinction and.',
                  misconception: 'Students commonly believe the Golden Quadrilateral is a "new road built from scratch" rather than an **upgradation of existing National.' }
          ],
            remediations: { 'students-commonly-believe-the-golden': { steps: ['Revisit c12_geo_cbse_15_002 (Road Transport Classification) to recall that National Highways are pre-existing central.', 'On a physical map of India, trace NH-2 (Delhi–Kolkata), NH-8 (Delhi–Mumbai), NH-4 (Mumbai–Chennai), NH-5.', 'Use Google Earth street view on any GQ urban stretch (e.g., NH-48 near Gurugram) to observe service roads, flyovers.', 'Re-attempt Diagnostic Question 2 and 4, explicitly linking alignment to pre-existing highway numbers and terrain.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_004', difficulty: 'standard',
          question: 'Indian Railways is the state-owned railway system of India, operating a network.',
          hint: 'If unable to link gauge distribution to terrain, review Class 11 nodes.',
          misconception: 'Students often think "gauge conversion is complete" or "metre gauge no longer exists." In reality, as of 2019-20, 2,402.',
          parts: [
                { id: 'a', prompt: 'Name the three gauge categories of Indian Railways with their track widths in metres, and state the total route length of each as per 2019-20 data.', answer: 'Broad gauge: 1.676 m, 63,950 km',
                  options: ['Broad gauge: 1.676 m, 63,950 km', 'gauge conversion is complete', 'metre gauge no longer exists', '"gauge conversion is complete" or "metre gauge no longer exists'],
                  hint: 'If unable to link gauge distribution to terrain, review Class 11 nodes c11_geo_cbse_09_001.',
                  misconception: 'Students often think "gauge conversion is complete" or "metre gauge no longer exists." In reality, as of 2019-20, 2,402 km of metre gauge.' },
                { id: 'b', prompt: 'Explain why the railway network density is high in the Northern Plains but low in the Himalayan region and the Thar Desert.', answer: 'Northern Plains: flat terrain, fertile soil, high population density,',
                  options: ['Northern Plains: flat terrain, fertile soil, high population density,', 'plains are flat', 'gauge conversion is complete', 'metre gauge no longer exists'],
                  hint: 'If unable to link gauge distribution to terrain, review Class 11 nodes c11_geo_cbse_09_001.',
                  misconception: 'Students often think "gauge conversion is complete" or "metre gauge no longer exists." In reality, as of 2019-20, 2,402 km of metre gauge.' },
                { id: 'c', prompt: 'Using the 17 railway zones table (NCERT Table 7.2), identify which zone headquarters is located in a city that is NOT a state capital.', answer: 'Zones with headquarters in non-state-capital cities: Central (Mumbai CST',
                  options: ['Zones with headquarters in non-state-capital cities: Central (Mumbai CST', 'gauge conversion is complete', 'metre gauge no longer exists', '"gauge conversion is complete" or "metre gauge no longer exists'],
                  hint: 'If unable to link gauge distribution to terrain, review Class 11 nodes c11_geo_cbse_09_001.',
                  misconception: 'Students often think "gauge conversion is complete" or "metre gauge no longer exists." In reality, as of 2019-20, 2,402 km of metre gauge.' }
          ],
            remediations: { 'gauge-conversion-is-complete-or': { steps: ['Revisit NCERT Table 7.2 (railway zones) and the gauge length data (broad 63,950 km, metre 2,402 km, narrow 1,604 km).', 'On a physical map of India (Class 11 physiography map), shade areas with metre/narrow gauge — you will see they cluster.', 'Watch a 5-min video on "Indian Railways gauge conversion" (e.g., Press Information Bureau clips) to see ongoing.', 'Re-attempt Diagnostic Questions 1 and 4. If still stuck, review Class 11 node c11_geo_cbse_21_003 (Railways: Network.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_005', difficulty: 'standard',
          question: 'Recent developments in Indian railways refer to the modernization initiatives.',
          hint: 'Revisit c12_geo_cbse_15_004 (railway zones, gauge conversion) and c12_geo_cbse_15_003.',
          misconception: 'Students think "Dedicated Freight Corridor" means a completely new railway line built from scratch on a new alignment.',
          parts: [
                { id: 'a', prompt: 'Name the two Dedicated Freight Corridors currently under implementation in India and state their terminal points.', answer: 'Eastern DFC: Ludhiana (Punjab) to Dankuni (West Bengal), ~1,856 km',
                  options: ['Eastern DFC: Ludhiana (Punjab) to Dankuni (West Bengal), ~1,856 km', 'Dedicated Freight Corridor'],
                  hint: 'Revisit c12_geo_cbse_15_004 (railway zones, gauge conversion) and c12_geo_cbse_15_003 (Golden.',
                  misconception: 'Students think "Dedicated Freight Corridor" means a completely new railway line built from scratch on a new alignment.' },
                { id: 'b', prompt: 'Why does the Western DFC terminate at JNPT (Navi Mumbai) rather than Mumbai Central or Churchgate?', answer: 'JNPT is India\'s largest container port handling ~55% of containerized EXIM cargo',
                  options: ['JNPT is India\'s largest container port handling ~55% of containerized EXIM cargo', 'Mumbai Central is bigger', 'Dedicated Freight Corridor', 'in passenger-rail terms'],
                  hint: 'Revisit c12_geo_cbse_15_004 (railway zones, gauge conversion) and c12_geo_cbse_15_003 (Golden.',
                  misconception: 'Students think "Dedicated Freight Corridor" means a completely new railway line built from scratch on a new alignment.' },
                { id: 'c', prompt: 'A Metro Rail project in a Tier-2 city (population 1.5 million) proposes a 25 km elevated corridor at ₹250 crore/km.', answer: 'Step 1: Bus passengers shifting = 25% of 300,000 = 75,000 passengers/day',
                  options: ['Step 1: Bus passengers shifting = 25% of 300,000 = 75,000 passengers/day', 'Dedicated Freight Corridor'],
                  hint: 'Revisit c12_geo_cbse_15_004 (railway zones, gauge conversion) and c12_geo_cbse_15_003 (Golden.',
                  misconception: 'Students think "Dedicated Freight Corridor" means a completely new railway line built from scratch on a new alignment.' }
          ],
            remediations: { 'dedicated-freight-corridor-means-a': { steps: ['Open the DFCCIL official map (dfccil.com) and toggle the "alignment" layer — trace both corridors on a printed outline.', 'Watch the 5-minute DFCCIL animation video showing "greenfield vs brownfield" sections.', 'Re-attempt Diagnostic Question 2 and 4.', 'If still confused, revisit c12_geo_cbse_15_004 (conventional railway network) to recall existing trunk routes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_15_006', difficulty: 'standard',
          question: 'Inland waterways are navigable river stretches, canals, backwaters, and creeks.',
          hint: 'If stuck, revisit c11_geo_cbse_09_009 (Drainage Systems) and draw longitudinal profiles.',
          misconception: 'Students often believe that “National Waterway” means the entire river from source to mouth is navigable.',
          parts: [
                { id: 'a', prompt: 'A fertilizer plant at Phulpur (Uttar Pradesh) needs to move 50,000 tonnes of raw material from Haldia port.', answer: 'Step 1: Total distance = 560 + 460 + 600 = 1,620 km',
                  options: ['Step 1: Total distance = 560 + 460 + 600 = 1,620 km', 'National Waterway', '“National Waterway” means the entire river from source to mouth is navigable'],
                  hint: 'If stuck, revisit c11_geo_cbse_09_009 (Drainage Systems) and draw longitudinal profiles of Ganga.',
                  misconception: 'Students often believe that “National Waterway” means the entire river from source to mouth is navigable.' }
          ],
            remediations: { 'national-waterway-means-the-entire': { steps: ['Open the outline map of India’s rivers (Class 11 drainage chapter).', 'Mark the five NW stretches exactly as per Table 7.3 — use a ruler to measure approximate lengths.', 'For each NW, write the limiting factor upstream (e.g., Farakka barrage for NW1, Dibrugarh for NW2).', 'Re-attempt Diagnostic Question 1 and 4. If still incorrect, revisit c11_geo_cbse_09_009 (Himalayan vs Peninsular.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
