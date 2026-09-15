import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch07_p1: SimDef = {
    id: 'v3_c10_geo_ch07_p1',
    title: 'Lifelines of National Economy · Part 1/2',
    subtitle: 'Move a nation\'s goods across five kinds of lifelines',
    classLevel: 10, subject: 'geography', topic: 'Lifelines of National Economy · Part 1/2',
    chapters: ['c10_geo_ch07'],
    nodeIds: ['c10_geo_cbse_07_001', 'c10_geo_cbse_07_002', 'c10_geo_cbse_07_003', 'c10_geo_cbse_07_004', 'c10_geo_cbse_07_005', 'c10_geo_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a national logistics planner', intro: 'A fish caught in Kerala, a passenger flying to Delhi, gas flowing under Gujarat — all of it is transport doing one job: connecting where things are made to where they are needed.', goal: 'Compare the five modes of transport and communication in India, and explain why each earns the title \'lifeline of the national economy.\'' },
    discovery: {
        question: 'India has roads, railways, waterways, airways and even pipelines. A fisherman\'s catch, a software engineer\'s commute and crude oil bound for a refinery all travel differently — yet the chapter calls ALL of them \'lifelines.\' What makes a mode of transport earn that title?',
        options: ['It links production centres with consumption centres — moving goods, people and services so the economy actually functions', 'It must be government-owned and nationally funded', 'Only modes that cross state borders count as lifelines', 'It must carry passengers, not just cargo'],
        answer: 'It links production centres with consumption centres — moving goods, people and services so the economy actually functions',
        hook: 'A mango that can\'t reach a market is just a falling fruit. Transport is what turns geography into an economy — every mode is a different kind of vein in the same body.',
    },
    teaching: [
        { title: 'Transport: Importance and Various Modes', text: 'Transport refers to the movement of goods, services, and people from one location to another using various modes such as roadways, railways, waterways, airways, and pipelines.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Route a week of Indian life — farm produce to mandis, coal to power plants, crude through pipelines, passengers by rail and air — and match each cargo to the mode that fits it best.',
        labels: ['Transport: Importance and Various', 'Roadways: Classification of Roads', 'Railways: Network, Gauge System', 'Pipelines: Transportation of Crude', 'Waterways: Inland and Ocean', 'Airways: Domestic and International'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_001', title: 'Transport: Importance and Various Modes',
          caseStudy: { intro: 'Imagine you order a textbook online from Delhi while living in a village in Kerala — it arrives in three days.',
            decisions: [{ prompt: 'Define the term "lifeline of national economy" in the context of transport. Why is transport given this label?', options: [
                { text: 'Transport is called the lifeline of national economy', outcome: 'Transport is called the lifeline of national economy because it connects production areas with.' },
                { text: 'transport helps people travel', outcome: 'Not quite — Students think "roadways are the most important mode because they are everywhere" and write this.', reveals: 'roadways-are-the-most-important' },
                { text: 'roadways are the most important mode', outcome: 'Not quite — Students think "roadways are the most important mode because they are everywhere" and write this.', reveals: 'roadways-are-the-most-important' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_07_002', title: 'Roadways: Classification of Roads in India (National, State, District, Rural)',
          scaffold: { problem: 'The state of Kerala has a total road length of 3,31,372 km (as per latest data) and a geographical area of 38,852 sq km.',
            steps: [
            { text: 'Identify the formula for road density: (Total Road Length / Total Area) × 100.' },
            { text: 'Plug in Kerala\'s values: (3,31,372 / 38,852) × 100.' },
            { text: 'Compute: 3,31,372 ÷ 38,852 = 8.53; 8.53 × 100 = 853 km/100 sq km.' },
            { text: 'Compare: Kerala\'s 853 km/100 sq km is far above the national average of ~150 km/100 sq km.' },
            { text: 'Geographical reasoning: Kerala\'s high density is due to (a) high population density requiring intense local.', faded: true, blankAnswer: 'Kerala\'s road density = 853 km/100 sq km, which is ~5.7.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_07_003', title: 'Railways: Network, Gauge System and Significance in India',
          scaffold: { problem: 'Using the railway network density formula, compare the network density of Uttar Pradesh (route length ~9,000 km, area ~240,928 sq km) and.',
            steps: [
            { text: 'Convert areas to 1000 sq km units. UP = 240,928 / 1000 = 240.928; Rajasthan = 342,239 / 1000 = 342.239.' },
            { text: 'Apply formula for UP: Density = 9,000 km / 240.928 = 37.36 km per 1000 sq km.' },
            { text: 'Apply formula for Rajasthan: Density = 5,800 km / 342.239 = 16.95 km per 1000 sq km.' },
            { text: 'Compare: UP density is 2.2 times Rajasthan\'s.' },
            { text: 'Link to physiography: UP lies entirely in Northern Plains (c6_geography_ch01_003) — flat, fertile, high population.' },
            { text: 'Verify with map: Northern Railway zone (HQ Delhi) covers UP densely; North Western Railway (HQ Jaipur) covers Rajasthan.', faded: true, blankAnswer: 'UP network density = 37.4 km/1000 sq km; Rajasthan = 17.0.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_004', title: 'Pipelines: Transportation of Crude Oil, Petroleum Products and Gas',
          caseStudy: { intro: 'Look at the LPG cylinder in your kitchen or the petrol pump near your school — the fuel inside traveled thousands of kilometers without a single truck or train.',
            decisions: [{ prompt: 'Name the three major pipeline networks in India for transporting crude oil, petroleum products, and natural gas as per the NCERT textbook.', options: [
                { text: 'The three major networks are: (1) Naharkatiya (Assam) to Barauni (Bihar) and Haldia (West', outcome: 'The three major networks are: (1) Naharkatiya (Assam) to Barauni (Bihar) and Haldia (West Bengal).' },
                { text: 'city gas pipelines or missing the HVJ', outcome: 'Not quite — Students think pipelines only transport crude oil and confuse the HVJ pipeline (gas) with oil.', reveals: 'pipelines-only-transport-crude-oil' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_005', title: 'Waterways: Inland and Ocean Routes in India',
          caseStudy: { intro: 'Observe a barge loaded with coal moving silently on the Ganga near Varanasi — it carries the equivalent of 50 truckloads while consuming a fraction of the.',
            decisions: [{ prompt: 'Name the National Waterway that runs on the Ganga-Bhagirathi-Hooghly river system from Prayagraj to Haldia, and state its number and.', options: [
                { text: 'National Waterway 1 (NW-1) on the Ganga-Bhagirathi-Hooghly system from Prayagraj to', outcome: 'National Waterway 1 (NW-1) on the Ganga-Bhagirathi-Hooghly system from Prayagraj to Haldia.' },
                { text: 'NW-2 or confusing the terminal points', outcome: 'Not quite — Students believe all declared National Waterways are currently operational for commercial cargo.', reveals: 'all-declared-national-waterways-are' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_006', title: 'Airways: Domestic and International Air Transport',
          caseStudy: { intro: 'Imagine you need to travel from Delhi to Port Blair in the Andaman Islands — a road or rail journey is impossible, and a ship takes days; only a flight covers.',
            decisions: [{ prompt: 'Name the authority responsible for creating, upgrading, maintaining, and managing civil aviation infrastructure in India.', options: [
                { text: 'Airports Authority of India (AAI)', outcome: 'Airports Authority of India (AAI). A wrong answer like "Air India" or "Ministry of Civil Aviation".' },
                { text: 'Air India', outcome: 'Not quite — Students often think "Air India" and "Airports Authority of India" are the same entity because both.', reveals: 'air-india-and-airports-authority' },
                { text: 'Ministry of Civil Aviation', outcome: 'Not quite — Students often think "Air India" and "Airports Authority of India" are the same entity because both.', reveals: 'air-india-and-airports-authority' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family\'s small farm business must send two consignments to a distant city: crates of ripe mangoes that spoil in two days, and a large load of cheap building stone that can take a week. A cousin advises sending \'everything by truck — road is always best.\'',
            decisions: [{ prompt: 'How should the family actually choose between road, rail, coastal shipping and air?', options: [
                { text: 'Match the mode to the cargo — the mangoes are perishable and high-value, so speed justifies the dearer option: refrigerated trucking or air gets them there inside the spoiling window. The stone is bulky, heavy and cheap, where cost per tonne matters far more than speed — rail or coastal shipping, the cheapest per tonne-kilometre for long hauls, is the right fit.', outcome: 'Transport choice trades cost against time and cargo character: road gives door-to-door flexibility, rail and waterways win on bulk, air wins on urgency — no single mode is \'always best.\'' },
                { text: 'The cousin is right — road is always best because only trucks offer door-to-door delivery.', outcome: 'Door-to-door convenience does not beat cost for a week\'s-worth of cheap stone, and may be too slow for mangoes on a very long haul — the cargo decides, not the convenience.', reveals: 'road-always-best' },
                { text: 'They should send both by air — fastest is always safest for business.', outcome: 'Flying cheap building stone would cost more than the stone earns — speed matters only when the cargo\'s value or perishability demands it.', reveals: 'fastest-always-best' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Roads knit villages to towns, rails move the bulk, pipes flow invisibly underground. Together they are why a country this size behaves like one economy.',
            decisions: [{ prompt: 'What comes next? Lifelines of National Economy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Lifelines of National Economy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_001', difficulty: 'standard',
          question: 'Transport refers to the movement of goods, services, and people from one.',
          hint: 'If stuck, revisit c6_geography_ch01_001 to c6_geography_ch01_007 and draw a quick sketch.',
          misconception: 'Students think "roadways are the most important mode because they are everywhere" and write this in board exams.',
          parts: [
                { id: 'a', prompt: 'Define the term "lifeline of national economy" in the context of transport. Why is transport given this label?', answer: 'Transport is called the lifeline of national economy',
                  options: ['Transport is called the lifeline of national economy', 'transport helps people travel', 'roadways are the most important mode'],
                  hint: 'If stuck, revisit c6_geography_ch01_001 to c6_geography_ch01_007 and draw a quick sketch map.',
                  misconception: 'Students think "roadways are the most important mode because they are everywhere" and write this in board exams.' },
                { id: 'b', prompt: 'A farmer in Punjab wants to send 50 tonnes of wheat to a port in Gujarat for export. The distance is ~1,200 km.', answer: 'Railways are most economical for bulk goods over long distances',
                  options: ['Railways are most economical for bulk goods over long distances', 'bulk + long distance = rail', 'roadways are the most important mode'],
                  hint: 'If stuck, revisit c6_geography_ch01_001 to c6_geography_ch01_007 and draw a quick sketch map.',
                  misconception: 'Students think "roadways are the most important mode because they are everywhere" and write this in board exams.' }
          ],
            remediations: { 'roadways-are-the-most-important': { steps: ['Revisit Class 6 node c6_geography_ch01_003 (Northern Plains) and c6_geography_ch01_004 (Peninsular Plateau) — note.', 'On a physical map of India, trace the Golden Quadrilateral (road) and the Delhi-Mumbai/Howrah-Delhi rail corridors.', 'Memorise the freight statistic: Railways = ~60% freight tonne-km, Roads = ~30%, Pipelines/Waterways = ~10%.', 'Practice writing: "Roads provide ubiquitous connectivity; railways provide high-capacity trunk routes."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "roadways are the most important mode because they are everywhere" and write this in board exams.',
          parts: [
                { id: 'a', prompt: 'Design a multi-modal transport plan for moving 10,000 tonnes of iron ore from a mine in Odisha (inland) to a steel plant in Tamil Nadu (coastal), 1,500.', answer: 'Leg 1: Mine to nearest railhead (Odisha)',
                  options: ['Leg 1: Mine to nearest railhead (Odisha)', 'roadways are the most important mode'],
                  hint: 'If stuck, revisit c6_geography_ch01_001 to c6_geography_ch01_007 and draw a quick sketch map.',
                  misconception: 'Students think "roadways are the most important mode because they are everywhere" and write this in board exams.' }
          ],
            remediations: { 'roadways-are-the-most-important': { steps: ['Revisit Class 6 node c6_geography_ch01_003 (Northern Plains) and c6_geography_ch01_004 (Peninsular Plateau) — note.', 'On a physical map of India, trace the Golden Quadrilateral (road) and the Delhi-Mumbai/Howrah-Delhi rail corridors.', 'Memorise the freight statistic: Railways = ~60% freight tonne-km, Roads = ~30%, Pipelines/Waterways = ~10%.', 'Practice writing: "Roads provide ubiquitous connectivity; railways provide high-capacity trunk routes."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_002', difficulty: 'standard',
          question: 'Road classification in India is the administrative categorization of roads.',
          hint: 'Revisit Class 6 "Physical Divisions of India" (c6_geography_ch01_001-007) and Class 9.',
          misconception: 'Students often think "State Highways are always wider/better than National Highways" because the word \'State\' sounds.',
          parts: [
                { id: 'a', prompt: 'A district in Maharashtra has a total road length of 2,450 km and an area of 10,500 sq km. Calculate its road density (km per 100 sq km).', answer: 'Step 1: Road density formula = (Total road length / Total area) × 100',
                  options: ['Step 1: Road density formula = (Total road length / Total area) × 100', 'State Highways are always wider/better than National Highways'],
                  hint: 'Revisit Class 6 "Physical Divisions of India" (c6_geography_ch01_001-007) and Class 9 "Plains.',
                  misconception: 'Students often think "State Highways are always wider/better than National Highways" because the word \'State\' sounds larger than.' }
          ],
            remediations: { 'state-highways-are-always-wider': { steps: ['Show a side-by-side satellite image strip of NH 44 (near Agra) and a State Highway (e.g., SH 30 in MP) on Google Earth.', 'Have the student trace the administrative authority: NH → NHAI (central), SH → State PWD.', 'Use the mnemonic "National = Nation-wide = Highest standard".', 'Practice with 5 map-based questions identifying highway category from legend symbols and numbering.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_003', difficulty: 'standard',
          question: 'Indian Railways is the state-owned railway system of India, operating on.',
          hint: 'If stuck, revisit c6_geography_ch01_003 (Northern Plains) and c6_geography_ch01_004.',
          misconception: 'Students believe "meter gauge" means the track is 1 meter wide (1000 mm) — correct — but then assume "broad gauge".',
          parts: [
                { id: 'a', prompt: 'A freight train loads 4,500 tonnes of coal at Jharsuguda (Odisha) on broad gauge and must reach a power plant in Tamil Nadu.', answer: 'Additional cost = 4,500 tonnes × ₹150/tonne = ₹6,75,000',
                  options: ['Additional cost = 4,500 tonnes × ₹150/tonne = ₹6,75,000', 'analyze', 'meter gauge', 'broad gauge'],
                  hint: 'If stuck, revisit c6_geography_ch01_003 (Northern Plains) and c6_geography_ch01_004 (Peninsular.',
                  misconception: 'Students believe "meter gauge" means the track is 1 meter wide (1000 mm) — correct — but then assume "broad gauge" is simply "wider than.' }
          ],
            remediations: { 'meter-gauge-means-the-track': { steps: ['Create a 3-column table: Gauge Name | Width (mm) | Width (ft-in) | Example Route.', 'On a physical map of India (c7_geo_ch01_003), shade Northern Plains green, Peninsular Plateau yellow, Himalayas brown.', 'Write one sentence per gauge: "Broad gauge dominates plains because _____"; "Meter gauge existed in plateau because.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_004', difficulty: 'standard',
          question: 'Pipelines are a mode of transport consisting of a system of pipes, pumps, and.',
          hint: 'If stuck, revisit c8_geo_ch1_10 (Non-Renewable Resources: Coal, Petroleum, Natural Gas).',
          misconception: 'Students think pipelines only transport crude oil and confuse the HVJ pipeline (gas) with oil pipelines.',
          parts: [
                { id: 'a', prompt: 'Why are pipelines considered more economical than railways for transporting petroleum products over long distances, despite their high initial construction.', answer: 'Pipelines have very low running costs (energy for pumping vs',
                  options: ['Pipelines have very low running costs (energy for pumping vs', 'high initial cost', 'continuous flow'],
                  hint: 'If stuck, revisit c8_geo_ch1_10 (Non-Renewable Resources: Coal, Petroleum, Natural Gas) to recall.',
                  misconception: 'Students think pipelines only transport crude oil and confuse the HVJ pipeline (gas) with oil pipelines.' }
          ],
            remediations: { 'pipelines-only-transport-crude-oil': { steps: ['Take an outline map of India. Plot the three networks in three colors: Blue (Naharkatiya-Barauni-Haldia), Red.', 'At each major node, write the resource (crude/gas) and the consumer (refinery/fertilizer/power).', 'Draw a 50km buffer along HVJ — shade the districts it passes through; list two crops and one mineral found there.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_005', difficulty: 'standard',
          question: 'Waterways in India comprise inland waterways (navigable rivers, canals.',
          hint: 'Revisit c7_geo_ch01_009 (Rivers of India) and c6_geography_ch03_016 (Monsoons) to refresh.',
          misconception: 'Students believe all declared National Waterways are currently operational for commercial cargo throughout their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Waterways in India comprise inland waterways (navigable rivers, canals, backwaters, and',
                  options: ['Waterways in India comprise inland waterways (navigable rivers, canals, backwaters, and', 'Transport refers to the movement of goods, services, and people from one location to', 'Road classification in India is the administrative categorization of roads based on their', 'Indian Railways is the state-owned railway system of India, operating on a multi-gauge'],
                  hint: 'Revisit c7_geo_ch01_009 (Rivers of India) and c6_geography_ch03_016 (Monsoons) to refresh river.',
                  misconception: 'Students believe all declared National Waterways are currently operational for commercial cargo throughout their length.' }
          ],
            remediations: { 'all-declared-national-waterways-are': { steps: ['Open the Inland Waterways Authority of India (IWAI) website\'s "National Waterways" map — filter by "Operational".', 'Cross-reference with Class 7 river regime maps (c7_geo_ch01_009) to see which NWs lie on perennial Himalayan rivers.', 'For each NW, note the "least available depth" (LAD) maintained — if <1.5 m, it\'s not commercially viable.', 'Write a 3-column table: NW Number | River System | Operational Status (Full/Partial/Planned) to internalise the gap.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_07_006', difficulty: 'standard',
          question: 'Airways refer to the mode of transport that uses aircraft (aeroplanes.',
          hint: 'Revisit c6_geography_ch01_006 (Islands) and c6_geography_ch01_002 (Himalayan Region).',
          misconception: 'Students often think "Air India" and "Airports Authority of India" are the same entity because both have "Air India".',
          parts: [
                { id: 'a', prompt: 'Name the authority responsible for creating, upgrading, maintaining, and managing civil aviation infrastructure in India.', answer: 'Airports Authority of India (AAI)',
                  options: ['Airports Authority of India (AAI)', 'Air India', 'Ministry of Civil Aviation', 'Airports Authority of India'],
                  hint: 'Revisit c6_geography_ch01_006 (Islands) and c6_geography_ch01_002 (Himalayan Region) to visualize.',
                  misconception: 'Students often think "Air India" and "Airports Authority of India" are the same entity because both have "Air India" in their names (Air.' },
                { id: 'b', prompt: 'A student wants to fly from Mumbai to Dubai. Identify the airport code for the departure airport and name the international airport in Dubai.', answer: 'Departure: Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM)',
                  options: ['Departure: Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM)', 'Air India', 'Airports Authority of India', 'Air India manages airports'],
                  hint: 'Revisit c6_geography_ch01_006 (Islands) and c6_geography_ch01_002 (Himalayan Region) to visualize.',
                  misconception: 'Students often think "Air India" and "Airports Authority of India" are the same entity because both have "Air India" in their names (Air.' }
          ],
            remediations: { 'air-india-and-airports-authority': { steps: ['Create a two-column table: "AAI (Infrastructure)" vs "Air India / Private Airlines (Operations)" — list 3 functions.', 'On an outline map of India, mark 5 international airports with their IATA codes and 3 UDAN-served tier-2 cities.', 'Read the NCERT paragraph on "Airways" and highlight every sentence that mentions a specific agency/role; convert each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
