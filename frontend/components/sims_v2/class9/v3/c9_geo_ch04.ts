import type { SimDef } from '../../engine/types';

/** v3 generated — c9_geo_ch04 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_geo_ch04: SimDef = {
    id: 'v3_c9_geo_ch04',
    title: 'Life on Earth',
    subtitle: 'This node covers the global distribution and climatic characteristics of major.',
    classLevel: 9, subject: 'geography', topic: 'Life on Earth',
    chapters: ['c9_geo_ch04'],
    nodeIds: ['c9_geo_ch4_1', 'c9_geo_ch4_2', 'c9_geo_ch4_3', 'c9_geo_ch4_4', 'c9_geo_ch4_5', 'c9_geo_ch4_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Start by asking students to recall the weather in their own city—Is it hot and wet like Mumbai, or cold and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What are the two main climatic factors that determine the distribution of major biomes across the world?',
        options: ['The two main climatic factors are temperature and precipitation (rainfall)', 'temperature', 'rainfall'],
        answer: 'The two main climatic factors are temperature and precipitation (rainfall)',
        hook: 'Students often think that deserts are defined solely by high temperature and believe that all hot regions are deserts.',
    },
    teaching: [
        { title: 'Major Biomes of the World: Distribution and Characteristics', text: 'Biomes are large natural communities of vegetation and wildlife adapted to specific climatic conditions, particularly temperature and precipitation, and are distributed globally in predictable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_geo_ch4_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['Major Biomes of', 'Biosphere Reserves in India', 'Forests and Ecotourism', 'Forest Dwellers: Livelihoods', 'Forest and Wildlife Conservation', 'Government Initiatives for Forest'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_geo_ch4_1', title: 'Major Biomes of the World: Distribution and Characteristics',
          caseStudy: { intro: 'Start by asking students to recall the weather in their own city—Is it hot and wet like Mumbai, or cold and dry like Leh?',
            decisions: [{ prompt: 'What are the two main climatic factors that determine the distribution of major biomes across the world?', options: [
                { text: 'The two main climatic factors are temperature and precipitation (rainfall)', outcome: 'The two main climatic factors are temperature and precipitation (rainfall).' },
                { text: 'temperature', outcome: 'Not quite — Students often think that deserts are defined solely by high temperature and believe that all hot.', reveals: 'deserts-are-defined-solely-by' },
                { text: 'rainfall', outcome: 'Not quite — Students often think that deserts are defined solely by high temperature and believe that all hot.', reveals: 'deserts-are-defined-solely-by' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch4_2', title: 'Biosphere Reserves in India',
          caseStudy: { intro: 'Imagine you are standing at the edge of the **Sundarbans** in West Bengal — you see dense mangroves (Core), then a belt where forest guards patrol and.',
            decisions: [{ prompt: 'Name the three zones of a UNESCO Biosphere Reserve in the correct order from the centre outward, and state the one primary activity.', options: [
                { text: 'The three zones from centre outward are: **Core Zone** (strictly protected, no human', outcome: 'The three zones from centre outward are: **Core Zone** (strictly protected, no human activity.' },
                { text: 'tourism allowed in Core Zone', outcome: 'Not quite — Students think **Biosphere Reserves and National Parks are the same thing, just with a fancier.', reveals: 'biosphere-reserves-and-national-parks' },
                { text: 'Biosphere Reserve', outcome: 'Not quite — Students think **Biosphere Reserves and National Parks are the same thing, just with a fancier.', reveals: 'biosphere-reserves-and-national-parks' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch4_3', title: 'Forests and Ecotourism',
          scaffold: { problem: 'In the Periyar Tiger Reserve, ecotourism generated ₹80 lakh in a year.',
            steps: [
            { text: 'Identify total ecotourism revenue = ₹80,00,000' },
            { text: 'Calculate conservation share = 70% of 80,00,000 = ₹56,00,000' },
            { text: 'Calculate amount for local distribution = 30% of 80,00,000 = ₹24,00,000' },
            { text: 'Divide by number of families = 24,00,000 ÷ 16' },
            { text: 'Compute per family amount = ₹1,50,000', faded: true, blankAnswer: 'Each tribal family receives ₹1.5 lakh per year from.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch4_4', title: 'Forest Dwellers: Livelihoods and Challenges',
          scaffold: { problem: 'In a village in Gadchiroli, Maharashtra, forest dwellers collect 150 kg of tendu leaves, 80 kg of mahua seeds, and 40 kg of gum karaya in.',
            steps: [
            { text: 'Identify the NTFPs collected and their respective quantities: tendu leaves (150 kg), mahua seeds (80 kg), gum karaya.' },
            { text: 'Recall the income formula: Income = Σ (quantity × price per unit).' },
            { text: 'Apply the formula to each product: Tendu: 150 × 25 = ₹3,750; Mahua: 80 × 35 = ₹2,800; Gum: 40 × 120 = ₹4,800.' },
            { text: 'Sum the incomes: ₹3,750 + ₹2,800 + ₹4,800 = ₹11,350 total annual income.' },
            { text: 'Interpret the result and explain unreliability: Income depends on seasonal flowering, rainfall, and market.', faded: true, blankAnswer: '₹11,350; this income is unreliable due to ecological.' }
            ] } },
        { type: 'case', nodeId: 'c9_geo_ch4_5', title: 'Forest and Wildlife Conservation',
          caseStudy: { intro: 'Start by observing a local park or grove where trees are cut for firewood but new saplings are planted—ask what keeps it green over time.',
            decisions: [{ prompt: 'What is the primary goal of forest and wildlife conservation in India?', options: [
                { text: 'The primary goal is to maintain biodiversity, prevent species extinction, and ensure', outcome: 'The primary goal is to maintain biodiversity, prevent species extinction, and ensure sustainable.' },
                { text: 'to stop all human activity in forests', outcome: 'Not quite — Students often think forest conservation means creating inviolate wilderness areas where humans are.', reveals: 'forest-conservation-means-creating-inviolate' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch4_6', title: 'Government Initiatives for Forest Dwellers',
          caseStudy: { intro: 'Start with a real observation: ask students if they have seen a "patta" (land document) for a house or farm — most have.',
            decisions: [{ prompt: 'What are the three types of forest rights recognised under the Forest Rights Act, 2006?', options: [
                { text: 'The three types are: (1) Individual Forest Rights (IFR)', outcome: 'The three types are: (1) Individual Forest Rights (IFR) — right to hold and live on forest land for.' },
                { text: 'right to education', outcome: 'Not quite — Students think FRA 2006 "distributes forest land to tribals" like a land-reform scheme — i.e., the.', reveals: 'fra-2006-distributes-forest-land' },
                { text: 'right to jobs', outcome: 'Not quite — Students think FRA 2006 "distributes forest land to tribals" like a land-reform scheme — i.e., the.', reveals: 'fra-2006-distributes-forest-land' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch4_6', title: 'You made it',
          caseStudy: { intro: 'You finished Life on Earth — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch4_1', difficulty: 'standard',
          question: 'Biomes are large natural communities of vegetation and wildlife adapted.',
          hint: 'Review how temperature and rainfall vary with latitude and seasons, especially the.',
          misconception: 'Students often think that deserts are defined solely by high temperature and believe that all hot regions are deserts.',
          parts: [
                { id: 'a', prompt: 'What are the two main climatic factors that determine the distribution of major biomes across the world?', answer: 'The two main climatic factors are temperature and precipitation (rainfall)',
                  options: ['The two main climatic factors are temperature and precipitation (rainfall)', 'temperature', 'rainfall'],
                  hint: 'Review how temperature and rainfall vary with latitude and seasons, especially the concepts.',
                  misconception: 'Students often think that deserts are defined solely by high temperature and believe that all hot regions are deserts, leading them.' },
                { id: 'b', prompt: 'A city has an average annual temperature of 25°C and annual rainfall of 200 cm. Based on this data, which biome is most likely found here? Show your reasoning.', answer: 'The biome is tropical rainforest',
                  options: ['The biome is tropical rainforest', 'desert', 'grassland'],
                  hint: 'Review how temperature and rainfall vary with latitude and seasons, especially the concepts.',
                  misconception: 'Students often think that deserts are defined solely by high temperature and believe that all hot regions are deserts, leading them.' }
          ],
            remediations: { 'deserts-are-defined-solely-by': { steps: ['Use a world climate map showing temperature and precipitation side by side.', 'Highlight the Amazon Basin (high temp, high rain → rainforest) and the Sahara (high temp, low rain → desert).', 'Then, use a Venn diagram: one circle for "high temperature", one for "low rainfall", overlap = desert.', 'Ask: "Is the Amazon in the overlap?" Guide students to see that high temperature alone is insufficient—low rainfall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch4_2', difficulty: 'standard',
          question: 'A Biosphere Reserve is a designated area of terrestrial and coastal/marine.',
          hint: 'Revisit **c6_geography_ch01_001** (India\'s physical diversity) and **c8_geo_ch1_7**.',
          misconception: 'Students think **Biosphere Reserves and National Parks are the same thing, just with a fancier international label.**.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, locate and label the following three biosphere reserves, identifying the biogeographic zone each represents: (a) Cold Desert, (b).', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'Biosphere Reserve'],
                  hint: 'Revisit **c6_geography_ch01_001** (India\'s physical diversity) and **c8_geo_ch1_7** (sustainable.',
                  misconception: 'Students think **Biosphere Reserves and National Parks are the same thing, just with a fancier international label.** Specifically, they.' }
          ],
            remediations: { 'biosphere-reserves-and-national-parks': { steps: ['** Draw a **three-circle target diagram** on paper. Label rings: Core (Red), Buffer (Yellow), Transition (Green). **', '** Take **Nilgiri BR** map (from NCERT Atlas or internet). Shade Core (Silent Valley NP + Mukurthi NP), Buffer.', '** Write one sentence per zone: "Core = Zero disturbance," "Buffer = Science + Tradition," "Transition = Homes + Farms.', '** Compare with **Bandipur National Park** (adjacent) — note Bandipur has *no* Transition Zone; villages were.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch4_3', difficulty: 'standard',
          question: 'Forests and ecotourism refer to the sustainable use of forest ecosystems for.',
          hint: 'If stuck, revisit c9_geo_ch4_1 (Major Biomes of the World) to review the features and.',
          misconception: 'Students often believe that any tourism activity in a forest area qualifies as ecotourism, such as jeep safaris with.',
          parts: [
                { id: 'a', prompt: 'Why is community involvement essential in ecotourism projects near forests?', answer: 'Community involvement ensures that local people benefit economically from forest',
                  options: ['Community involvement ensures that local people benefit economically from forest', 'it makes tourism more fun for visitors'],
                  hint: 'If stuck, revisit c9_geo_ch4_1 (Major Biomes of the World) to review the features and distribution.',
                  misconception: 'Students often believe that any tourism activity in a forest area qualifies as ecotourism, such as jeep safaris with loud noises, plastic.' }
          ],
            remediations: { 'any-tourism-activity-in-a': { steps: ['Use a map of Periyar Tiger Reserve showing zones: core (no tourism), buffer (guided walks only), and transition (tribal.', 'Ask students to locate where a plastic bottle factory or a jeep track would go – they’ll see it violates zonation.', 'Then, show photos of real ecotourism: tribal guides explaining medicinal plants, solar-powered huts, and women’s.', 'This grounds the abstract criteria in tangible, observable practices they can compare against.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch4_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any tourism activity in a forest area qualifies as ecotourism, such as jeep safaris with.',
          parts: [
                { id: 'a', prompt: 'A proposal suggests building a luxury resort inside a national park to boost ecotourism income. Evaluate this idea based on ecotourism principles.', answer: 'This idea violates ecotourism principles',
                  options: ['This idea violates ecotourism principles', 'bringing more money'],
                  hint: 'If stuck, revisit c9_geo_ch4_1 (Major Biomes of the World) to review the features and distribution.',
                  misconception: 'Students often believe that any tourism activity in a forest area qualifies as ecotourism, such as jeep safaris with loud noises, plastic.' }
          ],
            remediations: { 'any-tourism-activity-in-a': { steps: ['Use a map of Periyar Tiger Reserve showing zones: core (no tourism), buffer (guided walks only), and transition (tribal.', 'Ask students to locate where a plastic bottle factory or a jeep track would go – they’ll see it violates zonation.', 'Then, show photos of real ecotourism: tribal guides explaining medicinal plants, solar-powered huts, and women’s.', 'This grounds the abstract criteria in tangible, observable practices they can compare against.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch4_4', difficulty: 'standard',
          question: 'Forest dwellers are indigenous or tribal communities living within or adjacent.',
          hint: 'If stuck, revisit c6_geography_ch04_021 on types of farming to clarify how shifting.',
          misconception: 'Students often believe that forest dwellers live deep inside dense, unbroken forests and rely primarily on hunting.',
          parts: [
                { id: 'a', prompt: 'A forest-dwelling village in Odisha collects 200 kg of mahua flowers, 50 kg of honey, and 30 kg of lac in a season.', answer: 'Mahua: 200 × 40 = ₹8,000',
                  options: ['Mahua: 200 × 40 = ₹8,000', 'adds quantities first (e'],
                  hint: 'If stuck, revisit c6_geography_ch04_021 on types of farming to clarify how shifting cultivation.',
                  misconception: 'Students often believe that forest dwellers live deep inside dense, unbroken forests and rely primarily on hunting large animals for food.' }
          ],
            remediations: { 'forest-dwellers-live-deep-inside': { steps: ['Use a map of Madhya Pradesh showing forest cover, tribal population density, and protected areas.', 'Ask students to overlay these layers and observe that high tribal populations exist in mixed forest zones, not just.', 'Then, show images of weekly haats (markets) where forest dwellers sell tamarind, honey, and brooms—emphasizing.', 'Conclude by having them list five NTFPs used in their own homes to ground the concept in daily life.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch4_5', difficulty: 'standard',
          question: 'Forest and wildlife conservation is the planned management and protection.',
          hint: 'If stuck, revisit c9_geo_ch4_4 on forest dwellers’ livelihoods to understand how.',
          misconception: 'Students often think forest conservation means creating inviolate wilderness areas where humans are completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Forest and wildlife conservation is the planned management and protection of forest',
                  options: ['Forest and wildlife conservation is the planned management and protection of forest', 'Biomes are large natural communities of vegetation and wildlife adapted to specific', 'A Biosphere Reserve is a designated area of terrestrial and coastal/marine ecosystems', 'Forests and ecotourism refer to the sustainable use of forest ecosystems for tourism'],
                  hint: 'If stuck, revisit c9_geo_ch4_4 on forest dwellers’ livelihoods to understand how communities.',
                  misconception: 'Students often think forest conservation means creating inviolate wilderness areas where humans are completely excluded, believing that any.' }
          ],
            remediations: { 'forest-conservation-means-creating-inviolate': { steps: ['Use a map of Periyar Tiger Reserve showing core zone (no habitation) and buffer zone where tribals collect honey and.', 'Explain: "Here, humans aren’t removed—they’re partners.', 'Their knowledge helps spot fires and poachers.', 'Remove them, and illegal cutting increases." Then contrast with a reserve where eviction led to encroachment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch4_6', difficulty: 'standard',
          question: 'Government initiatives for forest dwellers refer to the legal and policy.',
          hint: 'Revisit c9_geo_ch4_4 (Forest Dwellers: Livelihoods and Challenges) — specifically the.',
          misconception: 'Students think FRA 2006 "distributes forest land to tribals" like a land-reform scheme — i.e., the state *gives* new.',
          parts: [
                { id: 'a', prompt: 'What are the three types of forest rights recognised under the Forest Rights Act, 2006?', answer: 'The three types are: (1) Individual Forest Rights (IFR)',
                  options: ['The three types are: (1) Individual Forest Rights (IFR)', 'right to education', 'right to jobs', 'distributes forest land to tribals'],
                  hint: 'Revisit c9_geo_ch4_4 (Forest Dwellers: Livelihoods and Challenges) — specifically the section.',
                  misconception: 'Students think FRA 2006 "distributes forest land to tribals" like a land-reform scheme — i.e., the state *gives* new land.' },
                { id: 'b', prompt: 'Why does the Forest Rights Act, 2006 require the Gram Sabha to initiate the verification of forest rights claims instead of the Forest Department?', answer: 'Because the Gram Sabha',
                  options: ['Because the Gram Sabha', 'Gram Sabha is faster', 'Forest Department is corrupt', 'distributes forest land to tribals'],
                  hint: 'Revisit c9_geo_ch4_4 (Forest Dwellers: Livelihoods and Challenges) — specifically the section.',
                  misconception: 'Students think FRA 2006 "distributes forest land to tribals" like a land-reform scheme — i.e., the state *gives* new land.' }
          ],
            remediations: { 'fra-2006-distributes-forest-land': { steps: ['Show a sample FRA title (patta) — point out it lists *survey number, extent, GPS coordinates* of *existing*.', 'Use the "three-generations" timeline: draw a family tree (great-grandfather → grandfather → father → student) and mark.', 'Contrast with a welfare scheme (e.g., PM Awas Yojana) where the state *builds/gives* a house — FRA gives a *document*.', 'Assign a map exercise: overlay FRA titles (from state govt. portals) on forest cover map — students see titles cluster.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
