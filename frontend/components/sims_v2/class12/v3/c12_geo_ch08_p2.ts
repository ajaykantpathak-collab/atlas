import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch08_p2: SimDef = {
    id: 'v3_c12_geo_ch08_p2',
    title: 'Transport and Communication · Part 2/2',
    subtitle: '40 km that cost a farmer ₹60 a quintal — distance has a price',
    classLevel: 12, subject: 'geography', topic: 'Transport and Communication · Part 2/2',
    chapters: ['c12_geo_ch08'],
    nodeIds: ['c12_geo_cbse_08_007', 'c12_geo_cbse_08_008', 'c12_geo_cbse_08_009', 'c12_geo_cbse_08_010', 'c12_geo_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Transport geographer', intro: 'Coal from Jharkhand, workers from Bihar, cane from UP — an economy is only as big as what it can move.', goal: 'Explain transport\'s economic role — place utility, friction of distance — and choose modes by freight logic, not habit.' },
    discovery: {
        question: 'A cane farmer earns ₹60 less per quintal because the monsoon kills the unpaved road to the mill. No lorry, no toll — so where did the \'transport cost\' come from?',
        options: ['Economic distance, not physical — bad transport shrinks the effective price and reshapes what he plants next season; friction of distance is a real cost', 'Nowhere — he saved fuel', 'The mill cheated him', 'Roads don\'t affect prices'],
        answer: 'Economic distance, not physical — bad transport shrinks the effective price and reshapes what he plants next season; friction of distance is a real cost',
        hook: 'Accessibility ≠ connectivity: a kachha road links a village yet gives it near-zero access in the rains. And \'cheapest mode\' needs nuance — rivers win on line-haul cost but lose to double handling and seasonal flow; that\'s why the freight corridor beats the highway for bulk.',
    },
    teaching: [
        { title: 'Major Ocean Routes and Shipping Canals (Suez, Panama)', text: 'Major ocean routes are the principal sea lanes used for global maritime trade, connecting major industrial regions and ports across continents.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Move goods like a planner: price the gap between jaggery unit and sugar mill, pit the Golden Quadrilateral against the Dedicated Freight Corridor, and design a logistics plan for a limestone district off the rail map.',
        labels: ['Major Ocean Routes', 'Communication: Personal vs Mass', 'Satellite Communication and Its', 'Internet and Digital Communication', 'Role of Transport'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_007', title: 'Major Ocean Routes and Shipping Canals (Suez, Panama)',
          caseStudy: { intro: 'Start by asking students to observe a world map and trace the shortest sea path from Mumbai to London. They will notice the route goes through the Suez Canal.',
            decisions: [{ prompt: 'Name the two major shipping canals that connect the Atlantic Ocean to the Indian Ocean and the Atlantic Ocean to the Pacific Ocean.', options: [
                { text: 'The Suez Canal connects the Mediterranean Sea (Atlantic) to the Red Sea (Indian Ocean),', outcome: 'The Suez Canal connects the Mediterranean Sea (Atlantic) to the Red Sea (Indian Ocean), and the.' },
                { text: 'Panama serves Europe-Asia trade', outcome: 'Not quite — Students often think the Suez and Panama Canals are similar in that both connect two oceans.', reveals: 'the-suez-and-panama-canals' },
                { text: 'the Suez and Panama Canals are similar in that both connect two oceans directly', outcome: 'Not quite — Students often think the Suez and Panama Canals are similar in that both connect two oceans.', reveals: 'the-suez-and-panama-canals' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_008', title: 'Communication: Personal vs Mass Communication',
          caseStudy: { intro: 'Start by observing how you communicate daily: a WhatsApp message to a friend (personal) vs. reading a news article on your phone (mass).',
            decisions: [{ prompt: 'What is the fundamental difference between personal communication and mass communication in terms of audience and direction of flow?', options: [
                { text: 'Personal communication is two-way between specific individuals or small groups (e.g., a', outcome: 'Personal communication is two-way between specific individuals or small groups (e.g., a phone.' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often think mass communication is only \'old media\' (TV, radio, newspapers) and personal.', reveals: 'mass-communication-is-only-old' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_009', title: 'Satellite Communication and Its Global Significance',
          caseStudy: { intro: 'Imagine you are in a village in Arunachal Pradesh where no mobile tower reaches — yet your teacher streams a live lecture from Delhi via a dish antenna on the.',
            decisions: [{ prompt: 'What is the approximate altitude of a geostationary communication satellite above Earth\'s equator, and why must it orbit exactly in the.', options: [
                { text: 'A geostationary satellite orbits at ~35,786 km above the equator', outcome: 'A geostationary satellite orbits at ~35,786 km above the equator.' },
                { text: 'satellite communication means only satellite phones used by the military', outcome: 'Not quite — Students think "satellite communication means only satellite phones used by the military" — they.', reveals: 'satellite-communication-means-only-satellite' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_010', title: 'Internet and Digital Communication Networks',
          caseStudy: { intro: 'Open your smartphone and observe the signal bars — that tiny icon represents a vast invisible geography: a fiber-optic cable landing in Mumbai or Chennai.',
            decisions: [{ prompt: 'Define "last-mile connectivity" in the context of India\'s digital communication networks and name the two primary technologies used.', options: [
                { text: 'Last-mile connectivity is the final leg of the network that delivers internet from the', outcome: 'Last-mile connectivity is the final leg of the network that delivers internet from the local.' },
                { text: 'satellite only', outcome: 'Not quite — Students equate "internet penetration" with "broadband subscription" and assume urban-rural gap.', reveals: 'students-equate-internet-penetration-with' },
                { text: 'optical fiber only', outcome: 'Not quite — Students equate "internet penetration" with "broadband subscription" and assume urban-rural gap.', reveals: 'students-equate-internet-penetration-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_011', title: 'Role of Transport and Communication in Globalisation',
          caseStudy: { intro: 'Observe a smartphone in your hand: its components were designed in California, fabricated in Taiwan, assembled in China using rare earths from Australia and.',
            decisions: [{ prompt: '**REMEMBER level**: Name the two major undersea fibre-optic cable landing stations on India\'s west coast and two on the east coast that.', options: [
                { text: '**Correct answer**: West coast', outcome: '**Correct answer**: West coast — Mumbai (multiple cables: SEA-ME-WE 3, 4, 5; I-ME-WE; TIC; EIG.' },
                { text: 'Mumbai and Chennai', outcome: 'Not quite — **Students think "globalisation = internet" and believe physical transport (ships, rail, trucks).', reveals: 'students-think-globalisation-internet-and' },
                { text: 'Bengaluru', outcome: 'Not quite — **Students think "globalisation = internet" and believe physical transport (ships, rail, trucks).', reveals: 'students-think-globalisation-internet-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a logistics internship, your team must move 2,500 tonnes of coal 1,500 km to a southern port. A colleague argues for booking 100 trucks because \'each truck arrives faster than a train, so road wins on speed.\'',
            decisions: [{ prompt: 'How do you evaluate that argument?', options: [
                { text: 'Send it by rail — one broad-gauge rake of 58 wagons carries the whole consignment in a single movement, and for bulk commodities over long hauls capacity and cost-per-tonne beat per-vehicle speed; road\'s door-to-door flexibility doesn\'t change that physics.', outcome: 'The chapter\'s comparison is about matching mode to cargo: rail is high-capacity long-distance haulage, while a hundred trucks is a hundred vehicle movements doing one rake\'s work.' },
                { text: 'Back the trucks — faster per vehicle means the coal arrives sooner, and that\'s what the client pays for.', outcome: 'Per-vehicle speed confuses unit velocity with consignment throughput; coordinating 100 truck trips over 1,500 km is slower, costlier and more failure-prone than one scheduled rake for bulk freight.', reveals: 'speed-beats-capacity' },
                { text: 'Recommend converting any metre-gauge section on the route to broad gauge first so the line runs faster.', outcome: 'Gauge conversion is about interoperability and axle-load, not speed, and Project Unigauge\'s own economics show conversion is only justified where traffic density repays the cost — it\'s a separate decision from this consignment.', reveals: 'broad-gauge-equals-faster' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'You can now argue transport as place utility — the multiplier that turns stranded resources into markets. Distance is economic, not just metric.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_007', difficulty: 'standard',
          question: 'Major ocean routes are the principal sea lanes used for global maritime trade.',
          hint: 'If stuck, revisit the Class 11 node on Water Transport (c11_geo_cbse_21_004) and the.',
          misconception: 'Students often think the Suez and Panama Canals are similar in that both connect two oceans directly.',
          parts: [
                { id: 'a', prompt: 'A ship travels from Rotterdam (Netherlands) to Yokohama (Japan).', answer: 'Distance saved = 17,000 - 11,000 = 6,000 nautical miles',
                  options: ['Distance saved = 17,000 - 11,000 = 6,000 nautical miles', 'Panama serves Europe-Asia trade', 'the Suez and Panama Canals are similar in that both connect two oceans directly'],
                  hint: 'If stuck, revisit the Class 11 node on Water Transport (c11_geo_cbse_21_004) and the sibling node.',
                  misconception: 'Students often think the Suez and Panama Canals are similar in that both connect two oceans directly.' }
          ],
            remediations: { 'the-suez-and-panama-canals': { steps: ['Remediation: 1) Use a world map to trace the two canals and label the water bodies they connect.', '2) Create a comparison table: location, connecting water bodies, lock vs sea-level, major trade routes served.', '3) Revisit Class 11 node c11_geo_cbse_21_004 (Water Transport) for basics of ocean routes.', '4) Practice with a map-based question: "Mark the Suez and Panama Canals and draw the Europe-Asia route via Suez and the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Suez and Panama Canals are similar in that both connect two oceans directly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The expansion of the Panama Canal in 2016 to accommodate New Panamax ships has reduced the relevance of the Suez Canal for Asia-Europe.', answer: 'The statement is false',
                  options: ['The statement is false', 'Panama serves Europe-Asia trade', 'the Suez and Panama Canals are similar in that both connect two oceans directly'],
                  hint: 'If stuck, revisit the Class 11 node on Water Transport (c11_geo_cbse_21_004) and the sibling node.',
                  misconception: 'Students often think the Suez and Panama Canals are similar in that both connect two oceans directly.' }
          ],
            remediations: { 'the-suez-and-panama-canals': { steps: ['Remediation: 1) Use a world map to trace the two canals and label the water bodies they connect.', '2) Create a comparison table: location, connecting water bodies, lock vs sea-level, major trade routes served.', '3) Revisit Class 11 node c11_geo_cbse_21_004 (Water Transport) for basics of ocean routes.', '4) Practice with a map-based question: "Mark the Suez and Panama Canals and draw the Europe-Asia route via Suez and the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_008', difficulty: 'standard',
          question: 'Personal communication involves direct exchange of information between.',
          hint: 'If stuck, review the table of communication modes in Class 10 Geography Chapter 7 (node.',
          misconception: 'Students often think mass communication is only \'old media\' (TV, radio, newspapers) and personal communication is only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Personal communication involves direct exchange of information between individuals or',
                  options: ['Personal communication involves direct exchange of information between individuals or', 'Transport is the physical movement of people, goods, and services from one location to', 'Land transport comprises roadways and railways that move people and goods over the', 'Water transport refers to the movement of goods and passengers over water bodies'],
                  hint: 'If stuck, review the table of communication modes in Class 10 Geography Chapter 7 (node.',
                  misconception: 'Students often think mass communication is only \'old media\' (TV, radio, newspapers) and personal communication is only \'new media\'.' }
          ],
            remediations: { 'mass-communication-is-only-old': { steps: ['Revisit Class 10 node c10_geo_cbse_07_007 and Class 11 node c11_geo_cbse_21_007 to review basic definitions and.', 'Create a two-column table: list 5 communication acts you did today (e.g., called mom, watched news, posted.', 'Discuss with a peer why some acts are ambiguous (e.g., Instagram post to 500 followers).', 'Re-attempt Diagnostic Questions 2 and 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_009', difficulty: 'standard',
          question: 'Satellite communication is a mode of telecommunication that uses artificial.',
          hint: 'Review Class 11 Geography c11_geo_cbse_26_002 (spaceborne platforms) and Class 11 Physics.',
          misconception: 'Students think "satellite communication means only satellite phones used by the military" — they miss that DTH TV (Tata.',
          parts: [
                { id: 'a', prompt: 'What is the approximate altitude of a geostationary communication satellite above Earth\'s equator, and why must it orbit exactly in the equatorial plane?', answer: 'A geostationary satellite orbits at ~35,786 km above the equator',
                  options: ['A geostationary satellite orbits at ~35,786 km above the equator', 'satellite communication means only satellite phones used by the military'],
                  hint: 'Review Class 11 Geography c11_geo_cbse_26_002 (spaceborne platforms) and Class 11 Physics.',
                  misconception: 'Students think "satellite communication means only satellite phones used by the military" — they miss that DTH TV (Tata Play, Dish TV).' },
                { id: 'b', prompt: 'Compare the latency (signal round-trip time) for a voice call routed via a GEO satellite versus a LEO constellation (e.g., Starlink at 550 km).', answer: 'GEO round-trip: 2 × 35,786 km / (3×10^5 km/s) ≈ 239 ms',
                  options: ['GEO round-trip: 2 × 35,786 km / (3×10^5 km/s) ≈ 239 ms', 'latency is the same', 'LEO has higher latency', 'satellite communication means only satellite phones used by the military'],
                  hint: 'Review Class 11 Geography c11_geo_cbse_26_002 (spaceborne platforms) and Class 11 Physics.',
                  misconception: 'Students think "satellite communication means only satellite phones used by the military" — they miss that DTH TV (Tata Play, Dish TV).' }
          ],
            remediations: { 'satellite-communication-means-only-satellite': { steps: ['Revisit c11_geo_cbse_26_002 (Remote Sensing Platforms) to distinguish satellite types by payload.', 'Use ISRO\'s "Satellite Missions" webpage to list 5 communication satellites (GSAT series) and 5 remote-sensing.', 'Visit a local bank ATM or DTH installer — ask them to show the VSAT/dish and explain which satellite it points.', 'Re-attempt Diagnostic Question 2 to verify footprint understanding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_010', difficulty: 'standard',
          question: 'Internet and Digital Communication Networks refer to the interconnected global.',
          hint: 'If stuck on "why fiber doesn\'t reach every village", revisit c12_geo_cbse_08_008.',
          misconception: 'Students equate "internet penetration" with "broadband subscription" and assume urban-rural gap is only about.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Internet and Digital Communication Networks refer to the interconnected global',
                  options: ['Internet and Digital Communication Networks refer to the interconnected global', 'Transport is the physical movement of people, goods, and services from one location to', 'Land transport comprises roadways and railways that move people and goods over the', 'Water transport refers to the movement of goods and passengers over water bodies'],
                  hint: 'If stuck on "why fiber doesn\'t reach every village", revisit c12_geo_cbse_08_008 (communication.',
                  misconception: 'Students equate "internet penetration" with "broadband subscription" and assume urban-rural gap is only about affordability.' }
          ],
            remediations: { 'students-equate-internet-penetration-with': { steps: ['Revisit c12_geo_cbse_08_008 (Personal vs Mass Communication) to recall the hierarchy: personal → mass → digital.', 'On a map of India, plot submarine cable landing stations (Mumbai, Chennai, Kochi, Tuticorin, Thiruvananthapuram) and.', 'Use TRAI\'s "MySpeed" app data (publicly available) to compare median download speeds in your district vs a metro.', 'Re-attempt Diagnostic Question 3 with a new location (e.g., Lakshadweep vs Gujarat) to internalize the physics.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_08_011', difficulty: 'standard',
          question: 'Transport and communication systems act as the circulatory and nervous systems.',
          hint: 'If stuck on modal choice (ship vs rail vs air), revisit **c12_geo_cbse_08_003** (Water.',
          misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less.',
          parts: [
                { id: 'a', prompt: '**REMEMBER level**: Name the two major undersea fibre-optic cable landing stations on India\'s west coast and two on the east coast that carry the bulk.', answer: '**Correct answer**: West coast',
                  options: ['**Correct answer**: West coast', 'Mumbai and Chennai', 'Bengaluru', 'globalisation = internet'],
                  hint: 'If stuck on modal choice (ship vs rail vs air), revisit **c12_geo_cbse_08_003** (Water Transport).',
                  misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less important because.' },
                { id: 'b', prompt: '**APPLY level**: A garment exporter in Tiruppur (Tamil Nadu) ships 500 TEUs (twenty-foot equivalent units) of cotton knitwear monthly to Los Angeles via JNPT.', answer: '**Correct working**: Step 1: Daily demand = 500/30 = 16.67 TEU/day',
                  options: ['**Correct working**: Step 1: Daily demand = 500/30 = 16.67 TEU/day', 'globalisation = internet', 'everything is digital now'],
                  hint: 'If stuck on modal choice (ship vs rail vs air), revisit **c12_geo_cbse_08_003** (Water Transport).',
                  misconception: '**Students think "globalisation = internet" and believe physical transport (ships, rail, trucks) is becoming less important because.' }
          ],
            remediations: { 'students-think-globalisation-internet-and': { steps: ['**Step 1**: Revisit the smartphone component journey in the Walkthrough.', 'Physically trace *each* component on a world map (use an atlas or Google Earth) — mark the mine, factory, port, cable.', '**Step 2**: Review **c12_geo_cbse_08_003** (Water Transport) and **c12_geo_cbse_08_010** (Internet and Digital.', 'Make a two-column table: "What moves by ship/cable?" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
