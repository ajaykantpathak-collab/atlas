import type { SimDef } from '../../engine/types';

/** v3 generated — c8_eco_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_eco_ch03_p2: SimDef = {
    id: 'v3_c8_eco_ch03_p2',
    title: 'India\'s Urban Landscape · Part 2/2',
    subtitle: 'What actually makes a town a town',
    classLevel: 8, subject: 'economics', topic: 'India\'s Urban Landscape · Part 2/2',
    chapters: ['c8_eco_ch03'],
    nodeIds: ['c8_eco_ch3_4', 'c8_eco_ch3_5', 'c8_eco_ch3_6', 'c8_eco_ch3_7', 'c8_eco_ch3_8', 'c8_eco_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a census classification officer', intro: 'A crowded village and a small town can look identical from a bus window. Your job: apply the three official tests and find out which settlements truly crossed the line.', goal: 'Understand the Census criteria separating urban from rural India — population size, density and occupational structure — and how infrastructure shifts drive urbanisation.' },
    discovery: {
        question: 'A village has 10,000 residents — bigger than many towns — yet the Census still calls it rural. What gives?',
        options: ['80% of its workers still farm — a place is only urban when at least 75% of male workers do non-agricultural work', 'The Census just hasn\'t updated its records yet', 'It\'s rural because it lacks a shopping mall', 'Any place with fields nearby is automatically rural'],
        answer: '80% of its workers still farm — a place is only urban when at least 75% of male workers do non-agricultural work',
        hook: 'Big doesn\'t mean urban. The Census demands all three at once: 5,000+ people, 400+ per sq km, AND three-quarters of male workers off the farm. Miss one and you\'re still a village.',
    },
    teaching: [
        { title: 'Urbanisation: Process and Causes', text: 'Urbanisation is the process by which an increasing percentage of a country\'s total population comes to live in areas classified as urban.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_eco_ch3_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit Settlement Z — 6,000 people on 20 sq km with 80% in factories — and decide if it earns \'town\' status. Then predict whether a new hospital and college could flip a rural block urban within ten years.',
        labels: ['Urbanisation: Process and Causes', 'Cities as Centres', 'Urban Infrastructure: Transport, Communication,', 'Urban Planning: Designing Cities', 'Challenges of Urbanisation: Housing,', 'Slums and Informal Settlements'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_eco_ch3_7', title: 'Urban Planning: Designing Cities for Better Living',
          scaffold: { problem: 'A municipal authority is planning a new municipal zone covering a total plot area of 50,000 square meters.',
            steps: [
            { text: 'Identify given variables: Plot Area = 50,000 sq. m; Initial FSI = 2.5; Apartment unit size = 100 sq. m.' },
            { text: 'Recall the formula: $\\text{FSI} = \\frac{\\text{Total Built-up Area}}{\\text{Total Plot Area}}$, which rearranges.' },
            { text: 'Calculate initial total built-up area: $50,000 \\text{ sq. m} \\times 2.5 = 125,000 \\text{ sq. m}$.' },
            { text: 'Calculate the initial number of apartments: $\\frac{125,000 \\text{ sq. m}}{100 \\text{ sq.' },
            { text: 'Calculate built-up area under new FSI (4.0): $50,000 \\text{ sq. m} \\times 4.0 = 200,000 \\text{ sq. m}$.' },
            { text: 'Calculate total apartments under FSI 4.0: $\\frac{200,000}{100} = 2,000 \\text{ apartments}$.', faded: true, blankAnswer: '1. Initial Built-up Area = 125,000 sq. meters' }
            ] } },
        { type: 'case', nodeId: 'c8_eco_ch3_8', title: 'Challenges of Urbanisation: Housing, Traffic, Pollution',
          caseStudy: { intro: 'Imagine Rohan’s family moving from a quiet village in Bihar to Bengaluru for a job.',
            decisions: [{ prompt: 'What is a "negative externality" in the context of urban traffic and pollution?', options: [
                { text: 'A negative externality is an unintended cost imposed on third parties (the general', outcome: 'A negative externality is an unintended cost imposed on third parties (the general public) by.' },
                { text: 'something bad that happens in a city', outcome: 'Not quite — Students often believe that traffic congestion and pollution are simply "natural" outcomes.', reveals: 'traffic-congestion-and-pollution-are' },
                { text: 'natural', outcome: 'Not quite — Students often believe that traffic congestion and pollution are simply "natural" outcomes.', reveals: 'traffic-congestion-and-pollution-are' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch3_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A village of 8,000 people gets concrete roads, 4G towers and a new mall, while 80% of its workers still farm wheat and its homes spread over 25 sq km. Its sarpanch declares it is now officially a city.',
            decisions: [{ prompt: 'Does the Census definition back him up?', options: [
                { text: 'No — urban classification needs all three criteria together: at least 5,000 people, density of 400 per sq km, and 75% of male main workers in non-farm jobs. This village passes only the population test; 8,000 over 25 sq km is 320 per sq km, and 80% farming fails the occupation test.', outcome: 'This applies the conjunctive criteria rather than judging by modern looks — amenities do not reclassify a settlement.' },
                { text: 'Yes — paved roads, malls and smartphones are what make a place urban; paperwork thresholds are outdated.', outcome: 'Urban status is structural, not cosmetic: it is defined by how densely people live and how they earn their living, and this village\'s economy is still agricultural.', reveals: 'gadgets-make-a-city' },
                { text: 'Yes — with 8,000 people it clears the population bar, and the Census only requires one of the three criteria.', outcome: 'The three criteria must hold simultaneously; meeting population while failing density and occupation still leaves it rural.', reveals: 'one-criterion-enough' }
            ] }] } },
        { type: 'case', nodeId: 'c8_eco_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Urban isn\'t a look, it\'s a livelihood. When workers leave farms for factories and services, density climbs — and only then does a settlement officially become a town.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_eco_ch3_4', difficulty: 'standard',
          question: 'Urbanisation is the process by which an increasing percentage of a country\'s.',
          hint: 'If you are stuck, review the differences in density and livelihoods in node c8_eco_ch3_1.',
          misconception: 'Students often believe that urbanisation is driven *only* by rural-to-urban migration (people physically packing up and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urbanisation is the process by',
                  options: ['Urbanisation is the process by', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government'],
                  hint: 'If you are stuck, review the differences in density and livelihoods in node c8_eco_ch3_1, and look.',
                  misconception: 'Students often believe that urbanisation is driven *only* by rural-to-urban migration (people physically packing up and moving to existing.' }
          ],
            remediations: { 'urbanisation-is-driven-only-by': { steps: ['When a student struggles with this concept, use the "Three-Box City" visual model: 1.', 'Draw three boxes on a board: **Box A (New Babies)**, **Box B (Travelers)**, and **Box C (New Boundaries)**.', 'Provide a concrete scenario: "City Metro grew by 10,000 people this year." 3.', 'Distribute the growth: - Explain that 5,000 children were born to parents who already lived in the city (**Box.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_5', difficulty: 'standard',
          question: 'Cities are non-agricultural economic hubs where diverse secondary.',
          hint: 'If stuck, review c7_eco_ch02_009 to recall how secondary sector factories turn raw.',
          misconception: 'Students often think that the urban economy consists only of high-paying formal jobs (like corporate offices, banks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cities are non-agricultural economic hubs where diverse secondary (manufacturing and',
                  options: ['Cities are non-agricultural economic hubs where diverse secondary (manufacturing and', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government'],
                  hint: 'If stuck, review c7_eco_ch02_009 to recall how secondary sector factories turn raw materials into.',
                  misconception: 'Students often think that the urban economy consists only of high-paying formal jobs (like corporate offices, banks, and large factories).' }
          ],
            remediations: { 'the-urban-economy-consists-only': { steps: ['Trace the economic linkages in a daily urban routine: 1) A bank executive (formal tertiary sector) earns a salary; 2).', 'Show students that if informal services vanish, formal workers\' cost of living rises dramatically, forcing formal.', 'Use a simple flow diagram connecting formal offices, informal service providers, and local factories.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_6', difficulty: 'standard',
          question: 'Urban infrastructure refers to the foundational physical networks and public.',
          hint: 'If stuck, review Class 7 node `c7_eco_ch03_001` to refresh the foundational components.',
          misconception: 'Students frequently confuse **explicit monetary costs** (out-of-pocket ticket prices or utility tariffs) with **total.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Urban infrastructure refers to the foundational physical networks and public utility',
                  options: ['Urban infrastructure refers to the foundational physical networks and public utility', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government'],
                  hint: 'If stuck, review Class 7 node `c7_eco_ch03_001` to refresh the foundational components of physical.',
                  misconception: 'Students frequently confuse **explicit monetary costs** (out-of-pocket ticket prices or utility tariffs) with **total economic costs**.' }
          ],
            remediations: { 'students-frequently-confuse-explicit-monetary': { steps: ['Set up a side-by-side comparative table analyzing two factory workers: - **Worker 1** uses a ₹15 slow bus that takes.', '- **Worker 2** uses a ₹40 metro line taking 30 minutes.', 'Demonstrate through simple arithmetic that Worker 2 saves 4 full hours per day.', 'Show that if Worker 2 uses those 4 hours to work overtime at ₹60/hour, they earn an extra ₹240, easily offsetting the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_7', difficulty: 'standard',
          question: 'Urban planning is the spatial and economic process of designing land use.',
          hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban.',
          misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through.',
          parts: [
                { id: 'a', prompt: 'What is the primary objective of land-use zoning in urban planning? 1. To increase the purchase price of all vacant land uniformly 2.', answer: 'Option 2 is correct',
                  options: ['Option 2 is correct', 'beautifying'],
                  hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban Infrastructure).',
                  misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through parks and modern.' },
                { id: 'b', prompt: 'Why does unplanned urban sprawl lead to higher long-term municipal infrastructure costs compared to compact, planned urban growth? 1.', answer: 'Option 3 is correct',
                  options: ['Option 3 is correct', 'beautifying'],
                  hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban Infrastructure).',
                  misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through parks and modern.' },
                { id: 'c', prompt: 'A planned township of 20,000 people adopts "Mixed-Use Development" where commercial markets are within 1 km of residential clusters.', answer: 'Option 2 is correct',
                  options: ['Option 2 is correct', 'beautifying'],
                  hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban Infrastructure).',
                  misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through parks and modern.' },
                { id: 'd', prompt: 'Analyze the economic trade-off a municipal planner faces when increasing the Floor Space Index (FSI) from 1.5 to 3.5 in a congested central business district.', answer: 'Option 2 is correct',
                  options: ['Option 2 is correct', 'beautifying'],
                  hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban Infrastructure).',
                  misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through parks and modern.' }
          ],
            remediations: { 'urban-planning-is-purely-an': { steps: ['Realize spatial economic costs**: Ask the student to calculate how much time and money they waste if their school.', 'Connect land use to negative externalities**: Present a scenario where a tannery opens next to a dairy farm, polluting.', 'Analyze density metrics**: Use a simple physical example: building 4 floors on a 100 sq.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through.',
          parts: [
                { id: 'a', prompt: 'City A invests 80% of its transport budget in building elevated multi-lane highways for private cars.', answer: 'City B will perform better economically and socially',
                  options: ['City B will perform better economically and socially', 'beautifying'],
                  hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban Infrastructure).',
                  misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through parks and modern.' },
                { id: 'b', prompt: 'Design a basic 4-point urban land-allocation strategy for a newly planned tier-3 town in India that balances industrial development, residential affordability.', answer: 'A strong strategy must include: 1',
                  options: ['A strong strategy must include: 1', 'beautifying'],
                  hint: 'If stuck, review node `c8_eco_ch3_3` (Population Density) and `c8_eco_ch3_6` (Urban Infrastructure).',
                  misconception: 'Students often think that urban planning is purely an architectural exercise aimed at "beautifying" a city through parks and modern.' }
          ],
            remediations: { 'urban-planning-is-purely-an': { steps: ['Realize spatial economic costs**: Ask the student to calculate how much time and money they waste if their school.', 'Connect land use to negative externalities**: Present a scenario where a tannery opens next to a dairy farm, polluting.', 'Analyze density metrics**: Use a simple physical example: building 4 floors on a 100 sq.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_8', difficulty: 'standard',
          question: 'The challenges of urbanisation refer to the critical socioeconomic and.',
          hint: 'If you are stuck, review how public utilities and physical infrastructure function, and.',
          misconception: 'Students often believe that traffic congestion and pollution are simply "natural" outcomes of having a large.',
          parts: [
                { id: 'a', prompt: 'Why does rapid migration to Indian cities lead to high housing prices and the growth of informal settlements (slums)?', answer: 'Housing supply is highly inelastic in the short run',
                  options: ['Housing supply is highly inelastic in the short run', 'people prefer not to pay rent', 'natural'],
                  hint: 'If you are stuck, review how public utilities and physical infrastructure function, and why they.',
                  misconception: 'Students often believe that traffic congestion and pollution are simply "natural" outcomes of having a large population, and that the only.' },
                { id: 'b', prompt: 'Compare two policy options to reduce urban air pollution: - **Policy A:** Charging a "pollution tax" on private diesel cars entering the city center.', answer: '**Policy A** directly addresses the economic cause of pollution',
                  options: ['**Policy A** directly addresses the economic cause of pollution', 'natural'],
                  hint: 'If you are stuck, review how public utilities and physical infrastructure function, and why they.',
                  misconception: 'Students often believe that traffic congestion and pollution are simply "natural" outcomes of having a large population, and that the only.' }
          ],
            remediations: { 'traffic-congestion-and-pollution-are': { steps: ['If a student struggles with this concept, remediate by using the "Shared Playground" analogy: 1.', '**The Scenario:** Imagine a school playground that is free for everyone.', 'Initially, 10 kids play comfortably.', '**The Problem:** Soon, 100 kids try to use it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_eco_ch3_9', difficulty: 'standard',
          question: 'A slum or informal settlement is a densely populated urban residential area.',
          hint: 'If struggling, review rural-urban migration drivers (`c8_eco_ch3_12`) and general urban.',
          misconception: 'Students frequently assume that slum dwellers pay nothing for basic utilities because they live informally, or that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A slum or informal settlement is a densely populated urban residential area characterized',
                  options: ['A slum or informal settlement is a densely populated urban residential area characterized', 'An urban area is a human settlement characterized by high population density,', 'A Smart City is an urban area that uses digital technology, information and communication', 'Urban Local Bodies (ULBs) are constitutionally mandated local self-government'],
                  hint: 'If struggling, review rural-urban migration drivers (`c8_eco_ch3_12`) and general urban housing.',
                  misconception: 'Students frequently assume that slum dwellers pay nothing for basic utilities because they live informally, or that informal settlements.' }
          ],
            remediations: { 'students-frequently-assume-that-slum': { steps: ['To correct this misconception, use a structured step-by-step contrast table: 1.', '**Compare Unit Prices:** Show the cost per liter of vendor water (₹1.50/L) vs municipal water (₹0.03/L).', 'Calculate how an informal family spending ₹3,000/month on water pays a far higher fraction of income than.', '**Examine Livelihood Integration:** List essential city service roles filled by informal settlement residents (bus.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
