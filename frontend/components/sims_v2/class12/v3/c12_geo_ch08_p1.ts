import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch08_p1: SimDef = {
    id: 'v3_c12_geo_ch08_p1',
    title: 'Transport and Communication · Part 1/2',
    subtitle: '40 km that cost a farmer ₹60 a quintal — distance has a price',
    classLevel: 12, subject: 'geography', topic: 'Transport and Communication · Part 1/2',
    chapters: ['c12_geo_ch08'],
    nodeIds: ['c12_geo_cbse_08_001', 'c12_geo_cbse_08_002', 'c12_geo_cbse_08_003', 'c12_geo_cbse_08_004', 'c12_geo_cbse_08_005', 'c12_geo_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Transport geographer', intro: 'Coal from Jharkhand, workers from Bihar, cane from UP — an economy is only as big as what it can move.', goal: 'Explain transport\'s economic role — place utility, friction of distance — and choose modes by freight logic, not habit.' },
    discovery: {
        question: 'A cane farmer earns ₹60 less per quintal because the monsoon kills the unpaved road to the mill. No lorry, no toll — so where did the \'transport cost\' come from?',
        options: ['Economic distance, not physical — bad transport shrinks the effective price and reshapes what he plants next season; friction of distance is a real cost', 'Nowhere — he saved fuel', 'The mill cheated him', 'Roads don\'t affect prices'],
        answer: 'Economic distance, not physical — bad transport shrinks the effective price and reshapes what he plants next season; friction of distance is a real cost',
        hook: 'Accessibility ≠ connectivity: a kachha road links a village yet gives it near-zero access in the rains. And \'cheapest mode\' needs nuance — rivers win on line-haul cost but lose to double handling and seasonal flow; that\'s why the freight corridor beats the highway for bulk.',
    },
    teaching: [
        { title: 'Transport: Definition and Importance in Economy', text: 'Transport is the physical movement of people, goods, and services from one location to another using various modes (road, rail, water, air, pipeline) across space.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Move goods like a planner: price the gap between jaggery unit and sugar mill, pit the Golden Quadrilateral against the Dedicated Freight Corridor, and design a logistics plan for a limestone district off the rail map.',
        labels: ['Transport: Definition and Importance', 'Modes of Transport: Land', 'Modes of Transport: Water', 'Modes of Transport: Air', 'Major Trans-Continental Railways', 'Major Trans-Continental Highways'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_08_001', title: 'Transport: Definition and Importance in Economy',
          scaffold: { problem: 'A cement plant in Satna (Madhya Pradesh) sources limestone from a quarry 25 km away (by road) and sells cement to a distributor in Varanasi.',
            steps: [
            { text: 'Calculate annual road transport cost (Option A) = Rate × Distance × Annual Volume = ₹3.50 × 25 km × 4,000,000 tonnes.' },
            { text: 'Calculate present value of Option A over 20 years at 10%: PV = Annual Cost × [1 - (1+r)^-n]/r = ₹35 cr × [1.' },
            { text: 'Calculate annual rail transport cost (Option B, excluding capital) = (Rate × Distance + Terminal) × Volume = (₹1.20.' },
            { text: 'Present value of Option B operating cost = ₹44 cr × 8.5136 = ₹374.60 crore.' },
            { text: 'Compare: Option A PV = ₹297.98 crore; Option B PV = ₹494.60 crore.' },
            { text: 'Sensitivity check: At what volume does rail become cheaper? Set PV_A = PV_B → 3.50×25×V×8.5136 = 120.', faded: true, blankAnswer: 'Option A (road transport) minimizes present value cost.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_002', title: 'Modes of Transport: Land Transport (Roadways and Railways)',
          caseStudy: { intro: 'Start with a real observation: "Open Google Maps on your phone and search your hometown.',
            decisions: [{ prompt: 'A student sees "NH-44" on a map. What does the "NH" prefix indicate, and which authority is responsible for its construction and.', options: [
                { text: 'Correct: NH = National Highway', outcome: 'Correct: NH = National Highway; constructed and maintained by the National Highways Authority.' },
                { text: 'State PWD', outcome: 'Not quite — Students think "National Highways are the widest/best roads" and "Railways are always cheaper than.', reveals: 'national-highways-are-the-widest' },
                { text: 'District Administration', outcome: 'Not quite — Students think "National Highways are the widest/best roads" and "Railways are always cheaper than.', reveals: 'national-highways-are-the-widest' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_003', title: 'Modes of Transport: Water Transport (Inland and Oceanic)',
          caseStudy: { intro: 'Observe a barge loaded with coal moving slowly on the Ganga near Varanasi — note its draft, the river’s seasonal depth, and the lack of locks.',
            decisions: [{ prompt: 'Name the three categories of ports based on cargo handled, and give one example of each from the NCERT text.', options: [
                { text: 'Correct: Industrial Ports (e.g., handling bulk grain, ore, oil), Commercial Ports (e.g.,', outcome: 'Correct: Industrial Ports (e.g., handling bulk grain, ore, oil), Commercial Ports (e.g.' },
                { text: 'major/minor ports', outcome: 'Not quite — Students think “inland water transport is only for bulk goods like coal and sand” and overlook its.', reveals: 'inland-water-transport-is-only' },
                { text: 'natural/artificial harbours', outcome: 'Not quite — Students think “inland water transport is only for bulk goods like coal and sand” and overlook its.', reveals: 'inland-water-transport-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_005', title: 'Major Trans-Continental Railways of the World',
          caseStudy: { intro: 'Imagine you are shipping wheat from a farm in Krasnoyarsk, Siberia to a port in Vladivostok for export — the only viable land route is the Trans-Siberian.',
            decisions: [{ prompt: 'Name the terminal cities of the Trans-Siberian Railway and state its total length.', options: [
                { text: 'Moscow (west) to Vladivostok (east), 9,289 km', outcome: 'Moscow (west) to Vladivostok (east), 9,289 km. A wrong answer (e.g., St.' },
                { text: 'trans-continental railway', outcome: 'Not quite — Students think "trans-continental railway" means a single company\'s track from coast to coast.', reveals: 'trans-continental-railway-means-a' },
                { text: '"trans-continental railway" means a single company\'s track from coast to coast', outcome: 'Not quite — Students think "trans-continental railway" means a single company\'s track from coast to coast.', reveals: 'trans-continental-railway-means-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_006', title: 'Major Trans-Continental Highways and Road Networks',
          caseStudy: { intro: 'Imagine a truck driver starting from Lisbon, Portugal, and driving eastward across Europe, Russia, and Siberia to reach Vladivostok on the Pacific — a single.',
            decisions: [{ prompt: 'Name the trans-continental highway that links the Atlantic and Pacific coasts of Canada and state its approximate length.', options: [
                { text: 'The Trans-Canada Highway links St', outcome: 'The Trans-Canada Highway links St. John’s (Newfoundland, Atlantic) to Victoria (British Columbia.' },
                { text: 'the Alaska Highway or giving a length of 5,000 km', outcome: 'Not quite — Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay.', reveals: 'the-pan-american-highway-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a logistics internship, your team must move 2,500 tonnes of coal 1,500 km to a southern port. A colleague argues for booking 100 trucks because \'each truck arrives faster than a train, so road wins on speed.\'',
            decisions: [{ prompt: 'How do you evaluate that argument?', options: [
                { text: 'Send it by rail — one broad-gauge rake of 58 wagons carries the whole consignment in a single movement, and for bulk commodities over long hauls capacity and cost-per-tonne beat per-vehicle speed; road\'s door-to-door flexibility doesn\'t change that physics.', outcome: 'The chapter\'s comparison is about matching mode to cargo: rail is high-capacity long-distance haulage, while a hundred trucks is a hundred vehicle movements doing one rake\'s work.' },
                { text: 'Back the trucks — faster per vehicle means the coal arrives sooner, and that\'s what the client pays for.', outcome: 'Per-vehicle speed confuses unit velocity with consignment throughput; coordinating 100 truck trips over 1,500 km is slower, costlier and more failure-prone than one scheduled rake for bulk freight.', reveals: 'speed-beats-capacity' },
                { text: 'Recommend converting any metre-gauge section on the route to broad gauge first so the line runs faster.', outcome: 'Gauge conversion is about interoperability and axle-load, not speed, and Project Unigauge\'s own economics show conversion is only justified where traffic density repays the cost — it\'s a separate decision from this consignment.', reveals: 'broad-gauge-equals-faster' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue transport as place utility — the multiplier that turns stranded resources into markets. Distance is economic, not just metric.',
            decisions: [{ prompt: 'What comes next? Transport and Communication · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Transport and Communication · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_001', difficulty: 'standard',
          question: 'Transport is the physical movement of people, goods, and services from one.',
          hint: 'If stuck on "why transport matters economically," revisit Class 11 node.',
          misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise.',
          parts: [
                { id: 'a', prompt: 'A farmer in western Uttar Pradesh grows sugarcane. The nearest sugar mill is 40 km away by road, but the road is unpaved and becomes unusable in monsoon.', answer: 'Correct answer: Implicit transport cost = ₹340 – ₹280 = ₹60/quintal',
                  options: ['Correct answer: Implicit transport cost = ₹340 – ₹280 = ₹60/quintal', 'loss due to middlemen', 'transport importance = connectivity', 'it connects places'],
                  hint: 'If stuck on "why transport matters economically," revisit Class 11 node c11_geo_cbse_21_001 and.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error.' },
                { id: 'b', prompt: 'Compare the economic role of the Golden Quadrilateral (NHAI highway network) with the Dedicated Freight Corridor (DFC) railway.', answer: 'Correct answer: The DFC contributes more to manufacturing competitiveness',
                  options: ['Correct answer: The DFC contributes more to manufacturing competitiveness', 'highways are better', 'transport importance = connectivity', 'it connects places'],
                  hint: 'If stuck on "why transport matters economically," revisit Class 11 node c11_geo_cbse_21_001 and.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error.' }
          ],
            remediations: { 'transport-importance-connectivity-and-write': { steps: ['If the student cannot articulate the economic role beyond "connectivity": (1) Revisit Class 11 node c11_geo_cbse_21_001.', '(2) Draw a simple diagram: Resource region → Transport link → Market region.', 'Label "high transport cost" and "low transport cost" arrows; write the effect on price gap and trade volume.', '(3) Re-attempt Diagnostic Question 3 (farmer example) with a different crop (e.g., milk in Gujarat) to internalize.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Inland water transport is the cheapest mode, so India should shift all bulk freight from rail to rivers." Consider at least three.', answer: 'Correct evaluation: The statement is flawed',
                  options: ['Correct evaluation: The statement is flawed', 'transport importance = connectivity', 'it connects places'],
                  hint: 'If stuck on "why transport matters economically," revisit Class 11 node c11_geo_cbse_21_001 and.',
                  misconception: 'Students think "transport importance = connectivity" and write vague statements like "it connects places." The precise geographical error.' }
          ],
            remediations: { 'transport-importance-connectivity-and-write': { steps: ['If the student cannot articulate the economic role beyond "connectivity": (1) Revisit Class 11 node c11_geo_cbse_21_001.', '(2) Draw a simple diagram: Resource region → Transport link → Market region.', 'Label "high transport cost" and "low transport cost" arrows; write the effect on price gap and trade volume.', '(3) Re-attempt Diagnostic Question 3 (farmer example) with a different crop (e.g., milk in Gujarat) to internalize.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_002', difficulty: 'standard',
          question: 'Land transport comprises roadways and railways that move people and goods over.',
          hint: 'If road hierarchy is fuzzy: Revisit c10_geo_cbse_07_002 and draw the 5-level pyramid with.',
          misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1).',
          parts: [
                { id: 'a', prompt: 'A student sees "NH-44" on a map. What does the "NH" prefix indicate, and which authority is responsible for its construction and maintenance?', answer: 'Correct: NH = National Highway',
                  options: ['Correct: NH = National Highway', 'State PWD', 'District Administration', 'which authority maintains this road?'],
                  hint: 'If road hierarchy is fuzzy: Revisit c10_geo_cbse_07_002 and draw the 5-level pyramid with.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' },
                { id: 'b', prompt: 'A freight consignment of 2,500 tonnes of coal must move from Jharsuguda (Odisha) to Tuticorin (Tamil Nadu).', answer: 'Step 1: Railway capacity per rake = 58 wagons × 68 t = 3,944 tonnes',
                  options: ['Step 1: Railway capacity per rake = 58 wagons × 68 t = 3,944 tonnes', '2,500/68 = 37 wagons', 'National Highways are the widest/best roads', 'Railways are always cheaper than roads'],
                  hint: 'If road hierarchy is fuzzy: Revisit c10_geo_cbse_07_002 and draw the 5-level pyramid with.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' },
                { id: 'c', prompt: 'Compare the Konkan Railway (Roha–Thokur) and the Himalayan Railway (Jammu–Baramulla–Srinagar) on THREE parameters: gauge, terrain challenge, and strategic.', answer: 'Correct: | Parameter | Konkan Railway | Himalayan Railway (USBRL) |',
                  options: ['Correct: | Parameter | Konkan Railway | Himalayan Railway (USBRL) |', 'BG is faster', 'BG is cheaper to build', 'National Highways are the widest/best roads'],
                  hint: 'If road hierarchy is fuzzy: Revisit c10_geo_cbse_07_002 and draw the 5-level pyramid with.',
                  misconception: 'Students think "National Highways are the widest/best roads" and "Railways are always cheaper than roads." Reality: (1) NH width varies.' }
          ],
            remediations: { 'national-highways-are-the-widest': { steps: ['If student confuses road hierarchy: Draw a 5-level pyramid on paper — NH (top, 1.5 lakh km), SH (2nd, 1.8 lakh km), MDR.', 'Label each with: Authority (NHAI/PWD/ZP), Funding (Central/State/District), Typical width, Function.', 'Then take a 50 km journey on Google Maps from your town to nearest city — trace the road categories you travel on.', 'If student thinks rail always cheaper: Calculate cost for 3 scenarios using ₹/tonne-km: (a) Coal 1,000 km, 3,000 t; (b).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_003', difficulty: 'standard',
          question: 'Water transport refers to the movement of goods and passengers over water.',
          hint: 'If unable to locate or classify Indian waterways/ports, revisit c11_geo_cbse_21_004 and.',
          misconception: 'Students think “inland water transport is only for bulk goods like coal and sand” and overlook its growing role.',
          parts: [
                { id: 'a', prompt: 'A bulk carrier loads 150,000 tonnes of iron ore at Port Hedland (Australia) for Qingdao (China).', answer: 'Step 1: Distance = 4,800 nautical miles',
                  options: ['Step 1: Distance = 4,800 nautical miles', 'inland water transport is only for bulk goods like coal and sand'],
                  hint: 'If unable to locate or classify Indian waterways/ports, revisit c11_geo_cbse_21_004 and.',
                  misconception: 'Students think “inland water transport is only for bulk goods like coal and sand” and overlook its growing role in containerised cargo.' }
          ],
            remediations: { 'inland-water-transport-is-only': { steps: ['Revisit c11_geo_cbse_21_004 (Water Transport: Inland Waterways and Ocean Routes) — focus on the table of India’s.', 'On a physical map of India, trace NW-1 (Ganga), NW-2 (Brahmaputra), NW-3 (Kerala backwaters) and mark seasonal depth.', 'On a world outline map, draw the pre-2024 and post-2024 Europe-Asia routes; calculate the extra distance and time for.', 'Re-attempt Diagnostic Questions 2, 4, and 5 with these maps. If still stuck, review the “Types of Port” section.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_004', difficulty: 'standard',
          question: 'Air transport is the movement of passengers and cargo by aircraft (airplanes.',
          hint: 'If stuck, review the comparison table of transport modes from Class 10 Chapter 7.',
          misconception: 'Students often think pipelines are only for oil and gas, and forget they also transport water, slurry (coal, iron ore).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Air transport is the movement of passengers and cargo by aircraft (airplanes,',
                  options: ['Air transport is the movement of passengers and cargo by aircraft (airplanes,', 'Transport is the physical movement of people, goods, and services from one location to', 'Land transport comprises roadways and railways that move people and goods over the', 'Water transport refers to the movement of goods and passengers over water bodies'],
                  hint: 'If stuck, review the comparison table of transport modes from Class 10 Chapter 7 (Transport) and.',
                  misconception: 'Students often think pipelines are only for oil and gas, and forget they also transport water, slurry (coal, iron ore), and even milk.' }
          ],
            remediations: { 'pipelines-are-only-for-oil': { steps: ['Revisit Class 10 node c10_geo_cbse_07_004 (Pipelines) and c10_geo_cbse_07_006 (Airways) for basic definitions.', 'Review Class 11 nodes c11_geo_cbse_21_005 and c11_geo_cbse_21_006 for Indian networks.', 'Create a comparison table: parameters (speed, cost, capacity, commodity type, environmental impact) for air vs pipeline.', 'Practice map work: locate major airports (Delhi, Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad) and pipeline networks.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_005', difficulty: 'standard',
          question: 'A trans-continental railway is a continuous rail network spanning an entire.',
          hint: 'If stuck, revisit c8_geo_ch2_8 (Mountain Ranges of the World) and c11_geo_cbse_09_002.',
          misconception: 'Students think "trans-continental railway" means a single company\'s track from coast to coast.',
          parts: [
                { id: 'a', prompt: 'Name the terminal cities of the Trans-Siberian Railway and state its total length.', answer: 'Moscow (west) to Vladivostok (east), 9,289 km',
                  options: ['Moscow (west) to Vladivostok (east), 9,289 km', 'trans-continental railway', '"trans-continental railway" means a single company\'s track from coast to coast'],
                  hint: 'If stuck, revisit c8_geo_ch2_8 (Mountain Ranges of the World) and c11_geo_cbse_09_002 (Himalayan.',
                  misconception: 'Students think "trans-continental railway" means a single company\'s track from coast to coast.' },
                { id: 'b', prompt: 'Compare the economic rationale for building the Australian Trans-Continental Railway (Port Augusta to Kalgoorlie) with that of the Trans-Siberian Railway.', answer: 'Similarity: Both linked isolated resource-rich interiors (gold fields in WA',
                  options: ['Similarity: Both linked isolated resource-rich interiors (gold fields in WA', 'trans-continental railway', '"trans-continental railway" means a single company\'s track from coast to coast'],
                  hint: 'If stuck, revisit c8_geo_ch2_8 (Mountain Ranges of the World) and c11_geo_cbse_09_002 (Himalayan.',
                  misconception: 'Students think "trans-continental railway" means a single company\'s track from coast to coast.' }
          ],
            remediations: { 'trans-continental-railway-means-a': { steps: ['Revisit c11_geo_cbse_21_003 (Railways: Network, Gauge Systems) to recall gauge standardisation issues.', 'Use a physical world map (not political) to trace each railway\'s actual alignment against mountain ranges, rivers, and.', 'For each railway, write one sentence linking a physical barrier to a specific engineering solution (e.g.', 'Re-attempt Diagnostic Questions 3 and 6 using the map.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_006', difficulty: 'standard',
          question: 'Major trans-continental highways are long-distance, high-standard road networks.',
          hint: 'Review world physical maps (Class 6–8) and the core-periphery model from Class 12 Human.',
          misconception: 'Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay (Alaska) to Ushuaia.',
          parts: [
                { id: 'a', prompt: 'Name the trans-continental highway that links the Atlantic and Pacific coasts of Canada and state its approximate length.', answer: 'The Trans-Canada Highway links St',
                  options: ['The Trans-Canada Highway links St', 'the Alaska Highway or giving a length of 5,000 km'],
                  hint: 'Review world physical maps (Class 6–8) and the core-periphery model from Class 12 Human Geography.',
                  misconception: 'Students often think the Pan-American Highway is a single, continuous, paved road from Prudhoe Bay (Alaska) to Ushuaia (Argentina).' }
          ],
            remediations: { 'the-pan-american-highway-is': { steps: ['Open a political world map and physically trace the Pan-American Highway from Alaska to Argentina; mark the Darién Gap.', 'Watch a 5-minute documentary clip on the Darién Gap (e.g., BBC “World’s Most Dangerous Road”) to visualise the.', 'Re-draw the route on a blank outline map, labelling the gap and noting “ferry/ship required.” 4.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
