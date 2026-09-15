import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch03_p1: SimDef = {
    id: 'v3_c10_geo_ch03_p1',
    title: 'Water Resources · Part 1/2',
    subtitle: 'Solve why a wet city still runs dry',
    classLevel: 10, subject: 'geography', topic: 'Water Resources · Part 1/2',
    chapters: ['c10_geo_ch03'],
    nodeIds: ['c10_geo_cbse_03_001', 'c10_geo_cbse_03_002', 'c10_geo_cbse_03_003', 'c10_geo_cbse_03_004', 'c10_geo_cbse_03_005', 'c10_geo_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a water resources investigator', intro: 'Three-fourths of Earth\'s surface is water, yet your city\'s taps run at fixed hours. Your task is to find where the water actually goes — and why \'enough\' on paper means scarcity in pipes.', goal: 'Separate physical from economic scarcity, weigh the promises and costs of multipurpose dams, and make the case for rainwater harvesting.' },
    discovery: {
        question: 'Bengaluru gets decent monsoon rain and sits near rivers, yet apartment blocks there queue for water tankers. Meanwhile some genuinely dry regions manage fine. How can a water-rich place run out of water?',
        options: ['Scarcity can be economic, not just physical — poor infrastructure, pollution and over-extraction can make available water unusable or unreachable', 'Tanker mafias secretly export the city\'s water at night', 'Rain in cities instantly evaporates before touching the ground', 'Rivers legally belong only to the states they originate in'],
        answer: 'Scarcity can be economic, not just physical — poor infrastructure, pollution and over-extraction can make available water unusable or unreachable',
        hook: 'Running out of water isn\'t only about rain — a city can stand beside a river and still thirst if the water is polluted, over-pumped or never harvested.',
    },
    teaching: [
        { title: 'Water Scarcity: Causes and the Need for Conservation', text: 'Water scarcity is the condition where the available freshwater resources in a region are insufficient to meet the human and ecological demand for water, arising either from a physical shortage.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_03_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Investigate why a rain-blessed city still buys tanker water: trace over-exploited aquifers, polluted rivers and missing storage, then design a fix using dams and rooftop harvesting wisely.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_001', title: 'Water Scarcity: Causes and the Need for Conservation',
          caseStudy: { intro: 'Begin with a real-world observation: a Class 10 student in Bengaluru notices that despite heavy monsoon rains, their apartment complex faces water cuts.',
            decisions: [{ prompt: 'Define water scarcity and state the two main types of water scarcity recognized in geography.', options: [
                { text: 'Water scarcity is the shortage of freshwater resources to meet standard demand', outcome: 'Water scarcity is the shortage of freshwater resources to meet standard demand.' },
                { text: 'low rainfall', outcome: 'Not quite — Students believe water scarcity occurs only in low-rainfall areas (deserts) and that high-rainfall.', reveals: 'water-scarcity-occurs-only-in' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_002', title: 'Multipurpose River Projects: Dams and Their Multiple Uses',
          caseStudy: { intro: 'Imagine you are standing near the Bhakra Dam in Himachal Pradesh during October — the reservoir is full after the monsoon, water is being released into canals.',
            decisions: [{ prompt: 'Name any two multipurpose river projects in India and state the river on which each is built.', options: [
                { text: 'Correct answer: Bhakra Nangal Project on the Sutlej River (Himachal Pradesh/Punjab) and', outcome: 'Correct answer: Bhakra Nangal Project on the Sutlej River (Himachal Pradesh/Punjab) and Hirakud.' },
                { text: 'Tehri Dam on Ganga', outcome: 'Not quite — Students often think "multipurpose project" means the dam itself has multiple physical structures.', reveals: 'multipurpose-project-means-the-dam' },
                { text: 'Farakka Barrage', outcome: 'Not quite — Students often think "multipurpose project" means the dam itself has multiple physical structures.', reveals: 'multipurpose-project-means-the-dam' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_003', title: 'Dams: Social and Environmental Problems of Large Dams',
          caseStudy: { intro: 'Imagine you visit a village near the Sardar Sarovar Dam on the Narmada River.',
            decisions: [{ prompt: 'Name two social problems and two environmental problems caused by the construction of large dams in India.', options: [
                { text: 'Social problems: (1) Displacement of local communities (tribal and rural populations)', outcome: 'Social problems: (1) Displacement of local communities (tribal and rural populations) leading.' },
                { text: 'pollution', outcome: 'Not quite — Students often think that "environmental problems of dams" only mean "water pollution" or "less.', reveals: 'environmental-problems-of-dams-only' },
                { text: 'cost overruns', outcome: 'Not quite — Students often think that "environmental problems of dams" only mean "water pollution" or "less.', reveals: 'environmental-problems-of-dams-only' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_03_004', title: 'Rainwater Harvesting: Traditional Methods (Khadins, Johads, Tanks)',
          scaffold: { problem: 'A Khadin in Jaisalmer district has a catchment area of 1.5 km².',
            steps: [
            { text: 'Identify the given values: Rainfall = 200 mm, Catchment area = 1.5 km², Runoff coefficient = 0.2.' },
            { text: 'Recall the formula: Runoff volume = Rainfall × Catchment area × Runoff coefficient.' },
            { text: 'Apply the formula: Runoff volume = 200 × 1.5 × 0.2 = 60 million litres.' },
            { text: 'Convert farmland area to hectares: 50 hectares (given).' },
            { text: 'Calculate water per hectare: 60 million litres / 50 hectares = 1.2 million litres per hectare.' },
            { text: 'Interpret: This amount can support one crop cycle of drought-resistant crops like bajra.', faded: true, blankAnswer: 'Annual harvestable volume = 60 million litres; Water.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_03_005', title: 'Rainwater Harvesting: Modern Methods and Rooftop Harvesting',
          scaffold: { problem: 'A residential building in Bengaluru has a roof area of 350 m². The city receives 900 mm annual rainfall.',
            steps: [
            { text: 'Convert rainfall to metres: 900 mm = 0.9 m.' },
            { text: 'Calculate theoretical rainfall volume on roof: Volume = Area × Rainfall = 350 m² × 0.9 m = 315 m³.' },
            { text: 'Apply runoff coefficient for tiled roof (C = 0.80): Harvestable volume = 315 m³ × 0.80 = 252 m³.' },
            { text: 'Convert to litres: 252 m³ × 1000 = 2,52,000 litres per year.' },
            { text: 'Calculate total annual demand: 12 flats × 4 persons × 135 LPCD × 365 days = 23,65,200 litres.' },
            { text: 'Compare: Harvested (2,52,000 L) vs Demand (23,65,200 L). Percentage met = (2,52,000 ÷ 23,65,200) × 100 ≈ 10.65%.', faded: true, blankAnswer: '(a) 2,52,000 litres. (b) No. (c) ≈ 10.7% of annual demand.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_03_006', title: 'Water Conservation: Need and Methods in Daily Life',
          scaffold: { problem: 'A family of four in Hyderabad uses 650 litres/day from municipal supply.',
            steps: [
            { text: 'Calculate baseline per activity using frequency × flow × duration. Verify total = 650 L/day.' },
            { text: 'Apply each intervention to its activity: dual-flush saves 70% of flush volume (weighted avg 3.9 L vs 10 L); shower time.' },
            { text: 'Compute new activity volumes: Flush: 30 × 3.9 = 117 L; Shower: 2 × 5 × 8 = 80 L; Kitchen: 10 × 4 = 40 L; Washer: 60.' },
            { text: 'Sum new total = 117 + 80 + 40 + 60 + 25 + 0 = 322 L/day.' },
            { text: 'Saving % = [(650 - 322) / 650] × 100 = 50.5%. Interpret: halves municipal demand, reduces tanker dependence in summer.', faded: true, blankAnswer: 'New daily consumption = 322 L/day (80.5 lpcd). Percentage.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_001', title: 'A real-world call',
          caseStudy: { intro: 'A dam will irrigate 200 villages downstream but submerge 30 upstream. The math is clear; the homes are not.',
            decisions: [{ prompt: 'How should the decision be made?', options: [
                { text: 'Build it — 200 villages outweigh 30', outcome: 'The utilitarian answer; it treats \'villages\' as interchangeable units and ignores that the 30 lose everything while the 200 gain somewhat.' },
                { text: 'Don\'t build — displacement is a wrong no benefit erases', outcome: 'The rights-first answer; principled, but the 200 downstream villages\' water shortage is also a harm, just a quieter one.' },
                { text: 'Build only if the displaced get a real share', outcome: 'The just-compensation answer — land for land, a stake in the dam\'s benefits — rarely offered fully, which is why this question keeps returning.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family in a hill city that gets generous monsoon rain faces strict water rationing every May and June. A visiting cousin laughs: \'You people get more rain than we do — how can you have a water shortage?\'',
            decisions: [{ prompt: 'How can heavy annual rainfall and real water scarcity coexist?', options: [
                { text: 'Rainfall volume is not the same as usable supply — the rain arrives in a few months while demand runs all year, and if the city depends on springs and has too little storage, the water simply isn\'t there in summer. Scarcity can be seasonal, infrastructural or caused by polluted sources, not just by low rain — the same reason a humid coastal district can suffer shortage if its groundwater is contaminated.', outcome: 'This is the chapter\'s core distinction: scarcity is about water being available, storable and safe when needed — not just how much falls from the sky.' },
                { text: 'The cousin is right — shortage in a high-rainfall city is impossible, so the rationing must be a billing error.', outcome: 'High rainfall with poor storage and seasonal sources is a textbook scarcity pattern — cities like Shimla face exactly this every summer.', reveals: 'scarcity-needs-drought' },
                { text: 'The only real cause is people wasting water — rain amount is irrelevant either way.', outcome: 'Overuse worsens scarcity but is not the only cause — seasonal timing, storage gaps and water quality create scarcity even where rain is abundant.', reveals: 'only-waste-causes-scarcity' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Freshwater is renewable but not infinite. The crisis isn\'t that the sky forgot us — it\'s that we paved the catchments, poisoned the rivers and pumped the aquifers dry.',
            decisions: [{ prompt: 'What comes next? Water Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Water Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_001', difficulty: 'standard',
          question: 'Water scarcity is the condition where the available freshwater resources in.',
          hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism".',
          misconception: 'Students believe water scarcity occurs only in low-rainfall areas (deserts) and that high-rainfall regions are immune.',
          parts: [
                { id: 'a', prompt: 'Define water scarcity and state the two main types of water scarcity recognized in geography.', answer: 'Water scarcity is the shortage of freshwater resources to meet standard demand',
                  options: ['Water scarcity is the shortage of freshwater resources to meet standard demand', 'low rainfall'],
                  hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) for.',
                  misconception: 'Students believe water scarcity occurs only in low-rainfall areas (deserts) and that high-rainfall regions are immune.' }
          ],
            remediations: { 'water-scarcity-occurs-only-in': { steps: ['Show a map of India with annual rainfall isohyets and overlay districts reporting water scarcity (from NITI Aayog.', 'Use a simple water budget diagram for their own city: Input (rainfall, imported water) vs Output (evaporation, runoff.', 'Compare with the Falkenmark Water Stress Indicator (1700 m³/person/year = stress, 1000 = scarcity, 500 = absolute.', 'Have them interview a local resident or check municipal water supply schedule to connect data to lived experience.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe water scarcity occurs only in low-rainfall areas (deserts) and that high-rainfall regions are immune.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India’s water scarcity is mainly caused by low rainfall." Provide three counter-arguments with specific Indian examples.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'water availability', 'rainfall amount'],
                  hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) for.',
                  misconception: 'Students believe water scarcity occurs only in low-rainfall areas (deserts) and that high-rainfall regions are immune.' }
          ],
            remediations: { 'water-scarcity-occurs-only-in': { steps: ['Show a map of India with annual rainfall isohyets and overlay districts reporting water scarcity (from NITI Aayog.', 'Use a simple water budget diagram for their own city: Input (rainfall, imported water) vs Output (evaporation, runoff.', 'Compare with the Falkenmark Water Stress Indicator (1700 m³/person/year = stress, 1000 = scarcity, 500 = absolute.', 'Have them interview a local resident or check municipal water supply schedule to connect data to lived experience.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_002', difficulty: 'standard',
          question: 'A multipurpose river project is a large-scale hydraulic engineering structure.',
          hint: 'If stuck, revisit c10_geo_cbse_03_001 (water scarcity causes) and c7_geo_ch01_009 (rivers.',
          misconception: 'Students often think "multipurpose project" means the dam itself has multiple physical structures (e.g., separate dams.',
          parts: [
                { id: 'a', prompt: 'Why are multipurpose river projects called "multipurpose"? Explain with any three purposes they serve.', answer: 'Correct answer: They are called multipurpose',
                  options: ['Correct answer: They are called multipurpose', 'only for irrigation', 'provides employment', 'multipurpose project'],
                  hint: 'If stuck, revisit c10_geo_cbse_03_001 (water scarcity causes) and c7_geo_ch01_009 (rivers of India).',
                  misconception: 'Students often think "multipurpose project" means the dam itself has multiple physical structures (e.g., separate dams for irrigation and.' },
                { id: 'b', prompt: 'The Bhakra Nangal Project irrigates 1.5 million hectares. If the cropping intensity increases from 100% to 150% due to assured water supply, calculate the.', answer: 'Step 1: Identify given data',
                  options: ['Step 1: Identify given data', 'multipurpose project', '"multipurpose project" means the dam itself has multiple physical structures (e'],
                  hint: 'If stuck, revisit c10_geo_cbse_03_001 (water scarcity causes) and c7_geo_ch01_009 (rivers of India).',
                  misconception: 'Students often think "multipurpose project" means the dam itself has multiple physical structures (e.g., separate dams for irrigation and.' },
                { id: 'c', prompt: 'Compare the Damodar Valley Project and the Sardar Sarovar Project in terms of (a) river system, (b) primary region benefitted, and (c) one major controversy.', answer: 'river system, (',
                  options: ['river system, (', 'multipurpose project', 'swaps rivers or regions shows poor map awareness', '"multipurpose project" means the dam itself has multiple physical structures (e'],
                  hint: 'If stuck, revisit c10_geo_cbse_03_001 (water scarcity causes) and c7_geo_ch01_009 (rivers of India).',
                  misconception: 'Students often think "multipurpose project" means the dam itself has multiple physical structures (e.g., separate dams for irrigation and.' }
          ],
            remediations: { 'multipurpose-project-means-the-dam': { steps: ['Show a cross-section diagram of Bhakra Dam — label the reservoir, spillway, irrigation outlets (canals), and penstocks.', 'Trace the path of water for each use: "Same water → canal for irrigation → penstock for power → spillway for flood.', 'Use a simple analogy: "Like a household water tank supplying kitchen, bathroom, and garden through different pipes.', 'Practice labeling a blank cross-section diagram from memory.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_003', difficulty: 'standard',
          question: 'Large dams are massive barriers built across rivers to store water for.',
          hint: 'If stuck, revisit c10_geo_cbse_03_002 (Multipurpose River Projects) and c9_geo_ch1_8.',
          misconception: 'Students often think that "environmental problems of dams" only mean "water pollution" or "less water downstream." They.',
          parts: [
                { id: 'a', prompt: 'The Tehri Dam on the Bhagirathi River submerged the old Tehri town and 100+ villages.', answer: 'Step 1: Convert reservoir capacity to m³: 2.6 km³ = 2.6 × 10⁹ m³',
                  options: ['Step 1: Convert reservoir capacity to m³: 2.6 km³ = 2.6 × 10⁹ m³', 'environmental problems of dams', 'water pollution', 'less water downstream'],
                  hint: 'If stuck, revisit c10_geo_cbse_03_002 (Multipurpose River Projects) and c9_geo_ch1_8 (River erosion.',
                  misconception: 'Students often think that "environmental problems of dams" only mean "water pollution" or "less water downstream." They miss that large.' },
                { id: 'b', prompt: 'Compare the social impacts of the Sardar Sarovar Dam (Narmada) and the Hirakud Dam (Mahanadi) on displaced communities.', answer: 'Both dams displaced thousands (Sardar Sarovar: ~250,000',
                  options: ['Both dams displaced thousands (Sardar Sarovar: ~250,000', 'Hirakud was smaller', 'Narmada had more water', 'environmental problems of dams'],
                  hint: 'If stuck, revisit c10_geo_cbse_03_002 (Multipurpose River Projects) and c9_geo_ch1_8 (River erosion.',
                  misconception: 'Students often think that "environmental problems of dams" only mean "water pollution" or "less water downstream." They miss that large.' }
          ],
            remediations: { 'environmental-problems-of-dams-only': { steps: ['Draw a cross-section diagram of a dam, reservoir, command area, and downstream delta.', 'Label groundwater table before and after dam construction; show capillary rise bringing salts to surface in command.', 'Trace sediment path: river → reservoir (trapped) → delta (starved).', 'Use the Sardar Sarovar case: map the Narmada command area in Gujarat (waterlogging) and the Narmada estuary (reduced.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_004', difficulty: 'standard',
          question: 'Rainwater harvesting is the technique of collecting and storing rainwater for.',
          hint: 'Review the water cycle and monsoon rainfall distribution from Class 9 (c9_geo_ch2_7) and.',
          misconception: 'Students often think Khadins, Johads, and Tanks are interchangeable names for the same thing — just "old ponds.".',
          parts: [
                { id: 'a', prompt: 'Name the traditional rainwater harvesting structure that is a long earthen embankment built across a slope in the Thar Desert to capture runoff for agriculture.', answer: 'Khadin',
                  options: ['Khadin', 'old ponds', 'Khadins, Johads, and Tanks are interchangeable names for the same thing'],
                  hint: 'Review the water cycle and monsoon rainfall distribution from Class 9 (c9_geo_ch2_7) and the.',
                  misconception: 'Students often think Khadins, Johads, and Tanks are interchangeable names for the same thing — just "old ponds." In reality, each is.' },
                { id: 'b', prompt: 'A village in the Deccan Plateau receives 800 mm of annual rainfall, mostly in three monsoon months.', answer: 'Step 1: Rainfall volume over catchment = 800 mm × 2 km² = 1600 million litres',
                  options: ['Step 1: Rainfall volume over catchment = 800 mm × 2 km² = 1600 million litres', 'old ponds', 'Khadins, Johads, and Tanks are interchangeable names for the same thing'],
                  hint: 'Review the water cycle and monsoon rainfall distribution from Class 9 (c9_geo_ch2_7) and the.',
                  misconception: 'Students often think Khadins, Johads, and Tanks are interchangeable names for the same thing — just "old ponds." In reality, each is.' },
                { id: 'c', prompt: 'Compare the suitability of Khadins and Tanks for regions with (a) low annual rainfall (<250 mm) and sandy soil, and (b) moderate rainfall (600-800 mm) and.', answer: 'low annual rainfall (<250 mm) and sandy soil, and (',
                  options: ['low annual rainfall (<250 mm) and sandy soil, and (', 'old ponds', 'Khadins, Johads, and Tanks are interchangeable names for the same thing'],
                  hint: 'Review the water cycle and monsoon rainfall distribution from Class 9 (c9_geo_ch2_7) and the.',
                  misconception: 'Students often think Khadins, Johads, and Tanks are interchangeable names for the same thing — just "old ponds." In reality, each is.' }
          ],
            remediations: { 'khadins': { steps: ['If a student confuses the three, have them draw a three-column table with headings: Structure, Region, Topography.', 'Fill it using textbook descriptions and map atlases.', 'Then ask them to locate one example of each on an outline map of India (e.g., Khadin in Jaisalmer, Johad in Alwar, Tank.', 'This visual-spatial exercise anchors each term to its unique geography.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_005', difficulty: 'standard',
          question: 'Rainwater harvesting (modern methods) refers to the scientifically designed.',
          hint: 'Revisit c6_geography_ch02_010 (rainfall measurement) and c8_geo_ch1_3 (renewable.',
          misconception: 'Students think "rooftop rainwater harvesting = putting a drum under a pipe." They miss that a **functional system.',
          parts: [
                { id: 'a', prompt: 'A house in Chennai has a flat roof area of 120 m². The average annual rainfall is 1400 mm. The runoff coefficient for a concrete roof is 0.85.', answer: 'Step 1: Convert rainfall to meters: 1400 mm = 1.4 m',
                  options: ['Step 1: Convert rainfall to meters: 1400 mm = 1.4 m', 'rooftop rainwater harvesting = putting a drum under a pipe', '"rooftop rainwater harvesting = putting a drum under a pipe'],
                  hint: 'Revisit c6_geography_ch02_010 (rainfall measurement) and c8_geo_ch1_3 (renewable resources).',
                  misconception: 'Students think "rooftop rainwater harvesting = putting a drum under a pipe." They miss that a **functional system requires five integrated.' },
                { id: 'b', prompt: 'Compare rooftop harvesting with a recharge pit versus rooftop harvesting with a storage tank in terms of (a) space requirement, (b) water availability during.', answer: 'space requirement, (',
                  options: ['space requirement, (', 'both are equally suitable', 'rooftop rainwater harvesting = putting a drum under a pipe', '"rooftop rainwater harvesting = putting a drum under a pipe'],
                  hint: 'Revisit c6_geography_ch02_010 (rainfall measurement) and c8_geo_ch1_3 (renewable resources).',
                  misconception: 'Students think "rooftop rainwater harvesting = putting a drum under a pipe." They miss that a **functional system requires five integrated.' }
          ],
            remediations: { 'rooftop-rainwater-harvesting-putting-a': { steps: ['Show a 2-minute video of a working rooftop system (e.g., from Jal Shakti Ministry) — pause at each component.', 'Give the student a diagram with one component missing (e.g., no first-flush) and ask: "What will happen to water.', 'Have them build a tabletop model using a plastic tray (roof), straw (pipe), bottle with hole and cap (first-flush).', 'Pour muddy water; observe output. This tactile sequence converts the abstract "drum under pipe" mental model into.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_03_006', difficulty: 'standard',
          question: 'Water conservation in daily life refers to the deliberate reduction of water.',
          hint: 'If stuck on quantification, revisit c10_geo_cbse_03_005 worked examples on rooftop.',
          misconception: 'Students believe "water conservation means using less water for everything" and write answers like "take shorter baths.',
          parts: [
                { id: 'a', prompt: 'A household of four in Bengaluru receives 135 lpcd (litres per capita per day) from Cauvery supply but supplements with a borewell.', answer: 'Original shower use: 12 min × 8 L/min = 96 L/day total → 24 lpcd',
                  options: ['Original shower use: 12 min × 8 L/min = 96 L/day total → 24 lpcd', 'water conservation means using less water for everything', 'take shorter baths, don\'t wash cars'],
                  hint: 'If stuck on quantification, revisit c10_geo_cbse_03_005 worked examples on rooftop rainwater.',
                  misconception: 'Students believe "water conservation means using less water for everything" and write answers like "take shorter baths, don\'t wash cars".' },
                { id: 'b', prompt: 'Explain why replacing a single-flush toilet (10 L/flush) with a dual-flush toilet (3 L/6 L) in a household of five saves more water annually than fixing.', answer: 'Assume 5 flushes/person/day',
                  options: ['Assume 5 flushes/person/day', 'compare and justify', 'water conservation means using less water for everything', 'take shorter baths, don\'t wash cars'],
                  hint: 'If stuck on quantification, revisit c10_geo_cbse_03_005 worked examples on rooftop rainwater.',
                  misconception: 'Students believe "water conservation means using less water for everything" and write answers like "take shorter baths, don\'t wash cars".' }
          ],
            remediations: { 'water-conservation-means-using-less': { steps: ['Revisit c10_geo_cbse_03_001 (water scarcity causes) — identify whether scarcity in your region is physical (low.', 'Use your home water bill or society meter: calculate actual lpcd for last 3 months.', 'Pick ONE high-use activity (shower, toilet, garden) and measure its flow rate (bucket + stopwatch).', 'Apply one efficiency upgrade (aerator, dual-flush converter, drip kit for pots) and re-measure after 2 weeks.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
