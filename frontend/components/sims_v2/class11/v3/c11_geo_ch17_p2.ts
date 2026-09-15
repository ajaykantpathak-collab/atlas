import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch17_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch17_p2: SimDef = {
    id: 'v3_c11_geo_ch17_p2',
    title: 'Human Settlements · Part 2/2',
    subtitle: 'Apply the real urban test — and read why villages take the shapes they do.',
    classLevel: 11, subject: 'geography', topic: 'Human Settlements · Part 2/2',
    chapters: ['c11_geo_ch17'],
    nodeIds: ['c11_geo_cbse_17_007', 'c11_geo_cbse_17_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a census classifier judging borderline settlements', intro: 'Big village or small town? The Census has a checklist, and headcount is only one line on it.', goal: 'Apply the Census of India\'s urban criteria and interpret rural settlement patterns.' },
    discovery: {
        question: 'A UP village holds 12,000 people and calls itself rural. Surely a settlement that big is urban?',
        options: ['No — Census needs all three tests: 5,000+ people, 75%+ male workers in non-farm jobs, and 400+/km² density — or a statutory town status', 'Yes — population size alone decides urban', 'Yes — anything over 10,000 is a town', 'No — only because it lacks a railway station'],
        answer: 'No — Census needs all three tests: 5,000+ people, 75%+ male workers in non-farm jobs, and 400+/km² density — or a statutory town status',
        hook: 'A statutory town of 4,800 counts as urban while a farming village of 12,000 stays rural — governance and occupation outrank headcount.',
    },
    teaching: [
        { title: 'Problems of Rural Settlements: Infrastructure and Migration', text: 'Problems of rural settlements refer to the persistent deficiencies in physical infrastructure (roads, electricity, water supply, sanitation, healthcare, education) and socio-economic services that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_17_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Run the three census tests on two settlements, then read village shapes — linear along a contour, circular around a fort or spring — as adaptive design.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_007', title: 'Problems of Rural Settlements: Infrastructure and Migration',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to compare their village/native place with the nearest city — list three facilities available in the city but.',
            decisions: [{ prompt: 'State the four broad categories of physical infrastructure whose deficiency is most commonly reported in Indian villages according.', options: [
                { text: 'The four categories are: (1) Transport connectivity (all-weather roads, public', outcome: 'The four categories are: (1) Transport connectivity (all-weather roads, public transport), (2).' },
                { text: 'roads and electricity', outcome: 'Not quite — Students often think rural infrastructure problems are solely about "lack of funds" and that.', reveals: 'rural-infrastructure-problems-are-solely' },
                { text: 'lack of funds', outcome: 'Not quite — Students often think rural infrastructure problems are solely about "lack of funds" and that.', reveals: 'rural-infrastructure-problems-are-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_008', title: 'Smart Cities Mission and Urban Planning Initiatives',
          caseStudy: { intro: 'Observe your nearest city — perhaps the state capital or a million-plus city — and list three daily frustrations: unreliable water supply, traffic congestion.',
            decisions: [{ prompt: 'Name the three types of area-based development models permitted under the Smart Cities Mission and give the typical area range (in acres).', options: [
                { text: 'The three models are: (1) Retrofitting (50–500 acres)', outcome: 'The three models are: (1) Retrofitting (50–500 acres) — upgrading existing built-up areas with.' },
                { text: 'Smart City = IT City', outcome: 'Not quite — Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV.', reveals: 'smart-city-it-city-i' },
                { text: '"Smart City = IT City"', outcome: 'Not quite — Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV.', reveals: 'smart-city-it-city-i' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is categorising settlements from census data. A student flags Gahmar in UP — over 25,000 residents — as \'obviously urban, it\'s bigger than many towns.\' He also claims village shapes are decided purely by physical geography: \'linear means river, circular means lake.\'',
            decisions: [{ prompt: 'What rules actually classify settlements and shape village patterns?', options: [
                { text: 'Apply the full criteria: a census town needs population ≥5,000 AND ≥75% non-agricultural workers AND density ≥400/km², plus administrative status — Gahmar stays rural because most residents farm and it has a Gram Panchayat. And patterns aren\'t physical only: British revenue grids, defence needs, caste segregation and new highways reshape villages — many \'rectangular\' Ganga-plain villages went linear via ribbon development along a road.', outcome: 'Both instincts corrected: size alone doesn\'t make a town, and settlement patterns are adaptive responses where human agency can override the landscape.' },
                { text: 'Agree Gahmar is urban — any settlement with tens of thousands of people is a town.', outcome: 'Census definition is economic and administrative, not just numerical: 25,000 farmers under a panchayat remain a rural village.', reveals: 'big-village-is-urban' },
                { text: 'Accept the pattern rules — rivers make linear villages, lakes make circular ones, relief decides.', outcome: 'Physical setting proposes but society disposes: defence forts, land-revenue grids, caste hamlets and new transport corridors all reshape the geometry.', reveals: 'patterns-are-physical-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_17_008', title: 'You made it',
          caseStudy: { intro: 'Villages string along roads, huddle round water, or ring a fort — the pattern is an answer to the land and the society, never an accident.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_007', difficulty: 'standard',
          question: 'Problems of rural settlements refer to the persistent deficiencies in physical.',
          hint: 'If stuck, revisit the push-pull framework from Class 12 Fundamentals of Human Geography.',
          misconception: 'Students often think rural infrastructure problems are solely about "lack of funds" and that migration is always.',
          parts: [
                { id: 'a', prompt: 'State the four broad categories of physical infrastructure whose deficiency is most commonly reported in Indian villages according to Census 2011 and NFHS-5.', answer: 'The four categories are: (1) Transport connectivity (all-weather roads, public',
                  options: ['The four categories are: (1) Transport connectivity (all-weather roads, public', 'roads and electricity', 'lack of funds'],
                  hint: 'If stuck, revisit the push-pull framework from Class 12 Fundamentals of Human Geography Chapter 2.',
                  misconception: 'Students often think rural infrastructure problems are solely about "lack of funds" and that migration is always a negative outcome.' },
                { id: 'b', prompt: 'Explain why rural out-migration in India is predominantly male-driven and seasonal/circular in the agricultural belts of Bihar and Uttar Pradesh, but.', answer: 'In the Indo-Gangetic plains, male seasonal migration to Punjab/Haryana/Delhi for',
                  options: ['In the Indo-Gangetic plains, male seasonal migration to Punjab/Haryana/Delhi for', 'poverty', 'lack of funds'],
                  hint: 'If stuck, revisit the push-pull framework from Class 12 Fundamentals of Human Geography Chapter 2.',
                  misconception: 'Students often think rural infrastructure problems are solely about "lack of funds" and that migration is always a negative outcome.' },
                { id: 'c', prompt: 'A village in Maharashtra\'s Marathwada region has 1,200 households. Census data shows 38% households have at least one member migrated for >6 months in a year.', answer: 'Step 1: Migrant households = 1,200 × 0.38 = 456',
                  options: ['Step 1: Migrant households = 1,200 × 0.38 = 456', 'lack of funds'],
                  hint: 'If stuck, revisit the push-pull framework from Class 12 Fundamentals of Human Geography Chapter 2.',
                  misconception: 'Students often think rural infrastructure problems are solely about "lack of funds" and that migration is always a negative outcome.' }
          ],
            remediations: { 'rural-infrastructure-problems-are-solely': { steps: ['Revisit the "infrastructure-migration feedback loop" diagram — draw it for two contrasting villages (one with good.', 'Use NFHS-5 district factsheets (available online) to compare two districts in your state on % households with piped.', 'Read the "Migration in India 2020-21" PLFS report summary (MoSPI) to understand circular vs permanent migration streams.', 'Discuss with a peer: "If you were the Sarpanch with ₹50 lakh untied funds, what would you build first and why?" — this.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_008', difficulty: 'standard',
          question: 'The Smart Cities Mission (launched 2015) is a Government of India urban renewal.',
          hint: 'Revisit c11_geo_cbse_17_006 (Problems of Urban Settlements) and c10_civ_cbse_02_008.',
          misconception: 'Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV, Wi-Fi, and mobile apps.',
          parts: [
                { id: 'a', prompt: 'Name the three types of area-based development models permitted under the Smart Cities Mission and give the typical area range (in acres) for each.', answer: 'The three models are: (1) Retrofitting (50–500 acres)',
                  options: ['The three models are: (1) Retrofitting (50–500 acres)', 'Smart City = IT City', '"Smart City = IT City"'],
                  hint: 'Revisit c11_geo_cbse_17_006 (Problems of Urban Settlements) and c10_civ_cbse_02_008.',
                  misconception: 'Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV, Wi-Fi, and mobile apps.' },
                { id: 'b', prompt: 'Explain why the Smart Cities Mission uses a "Challenge Method" (competitive selection) instead of allocating funds to all ULBs based on population.', answer: 'The Challenge Method ensures competitive federalism: cities must demonstrate',
                  options: ['The Challenge Method ensures competitive federalism: cities must demonstrate', 'to save money', 'only developed cities win', 'Smart City = IT City'],
                  hint: 'Revisit c11_geo_cbse_17_006 (Problems of Urban Settlements) and c10_civ_cbse_02_008.',
                  misconception: 'Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV, Wi-Fi, and mobile apps.' },
                { id: 'c', prompt: 'A Tier-2 city (population 8 lakh) is selected in Round 2. Its SCP allocates ₹2,000 crore: 70% for area-based development (ABD) in a 120-acre retrofitting zone.', answer: 'Step 1: ABD allocation = 70% of ₹2,000 crore = ₹1,400 crore',
                  options: ['Step 1: ABD allocation = 70% of ₹2,000 crore = ₹1,400 crore', 'Smart City = IT City', '"Smart City = IT City"'],
                  hint: 'Revisit c11_geo_cbse_17_006 (Problems of Urban Settlements) and c10_civ_cbse_02_008.',
                  misconception: 'Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV, Wi-Fi, and mobile apps.' }
          ],
            remediations: { 'smart-city-it-city-i': { steps: ['Download the *Smart Cities Mission Guidelines (2015)* — read Section 3.2 (Area-Based Development) and Table 1.', 'Pick one Round-1 city (e.g., Bhubaneswar, Pune, Jaipur). Open its Smart City Proposal (SCP) PDF from smartcities.gov.in.', 'Highlight every physical infrastructure item (water, sewerage, roads, housing, parks) in yellow; highlight ICT items.', 'Count pages/yellow vs blue — you\'ll see 80%+ yellow.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_17_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV, Wi-Fi, and mobile apps.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Smart Cities Mission solves urban problems by importing Western technology; Indian cities just need better apps and sensors." Use.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'people-first, technology-last', 'Smart City = IT City', '"Smart City = IT City"'],
                  hint: 'Revisit c11_geo_cbse_17_006 (Problems of Urban Settlements) and c10_civ_cbse_02_008.',
                  misconception: 'Students think "Smart City = IT City" — i.e., the Mission is primarily about installing CCTV, Wi-Fi, and mobile apps.' }
          ],
            remediations: { 'smart-city-it-city-i': { steps: ['Download the *Smart Cities Mission Guidelines (2015)* — read Section 3.2 (Area-Based Development) and Table 1.', 'Pick one Round-1 city (e.g., Bhubaneswar, Pune, Jaipur). Open its Smart City Proposal (SCP) PDF from smartcities.gov.in.', 'Highlight every physical infrastructure item (water, sewerage, roads, housing, parks) in yellow; highlight ICT items.', 'Count pages/yellow vs blue — you\'ll see 80%+ yellow.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
