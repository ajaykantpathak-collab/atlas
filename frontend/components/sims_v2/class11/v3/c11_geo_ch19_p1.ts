import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch19_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch19_p1: SimDef = {
    id: 'v3_c11_geo_ch19_p1',
    title: 'Mineral and Energy Resources · Part 1/2',
    subtitle: 'See why ore grade isn\'t the whole story — and why mineral wealth maps onto ancient rock.',
    classLevel: 11, subject: 'geography', topic: 'Mineral and Energy Resources · Part 1/2',
    chapters: ['c11_geo_ch19'],
    nodeIds: ['c11_geo_cbse_19_001', 'c11_geo_cbse_19_002', 'c11_geo_cbse_19_003', 'c11_geo_cbse_19_004', 'c11_geo_cbse_19_005', 'c11_geo_cbse_19_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economic geologist siting a steel plant', intro: 'A freight train of reddish ore rolls past — that colour is haematite, and its home ground decides where India\'s steel towns live.', goal: 'Map India\'s mineral belts and explain how mode of occurrence shapes mining and industry.' },
    discovery: {
        question: 'Magnetite carries 72% iron against haematite\'s 70% — so why do Bhilai and Rourkela run on haematite?',
        options: ['Odisha\'s haematite comes as massive high-grade lumps ready for the furnace; Kudremukh\'s magnetite is fine-grained and needs costly beneficiation', 'Haematite is magnetically easier to handle', 'Magnetite is too rare in India to use', 'Steel plants were built before magnetite was discovered'],
        answer: 'Odisha\'s haematite comes as massive high-grade lumps ready for the furnace; Kudremukh\'s magnetite is fine-grained and needs costly beneficiation',
        hook: 'Purity on paper loses to processability in the field — and to the brute fact that 90% of India\'s metallic wealth sits in one north-eastern peninsular belt.',
    },
    teaching: [
        { title: 'Minerals: Distribution and Mode of Occurrence in India', text: 'Minerals are naturally occurring inorganic substances with a definite chemical composition and crystalline structure, found in the Earth\'s crust.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_19_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Pin Bailadila, Khetri, Jharia and Mumbai High to their belts, then test whether minerals are \'evenly distributed for balanced development.\'',
        labels: ['Minerals: Distribution and Mode', 'Iron Ore (Haematite, Magnetite),', 'Non-Ferrous Minerals: Copper, Lead,', 'Non-Metallic Minerals: Mica', 'Conventional Energy: Coal Distribution', 'Conventional Energy: Petroleum'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_001', title: 'Minerals: Distribution and Mode of Occurrence in India',
          caseStudy: { intro: 'Imagine holding a piece of magnetite from the Bailadila mines in Chhattisgarh – its heavy, metallic feel hints at the intense geological forces that.',
            decisions: [{ prompt: 'Name the three major mineral belts of India and state the dominant rock system associated with each belt.', options: [
                { text: 'The three major mineral belts are: (1) North-Eastern Peninsular Belt (Chotanagpur', outcome: 'The three major mineral belts are: (1) North-Eastern Peninsular Belt (Chotanagpur Plateau).' },
                { text: 'mode of occurrence', outcome: 'Not quite — Students often believe that "mode of occurrence" only means the physical shape of the ore body.', reveals: 'mode-of-occurrence-only-means' },
                { text: 'states instead of belts, or confusing rock systems', outcome: 'Not quite — Students often believe that "mode of occurrence" only means the physical shape of the ore body.', reveals: 'mode-of-occurrence-only-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_002', title: 'Iron Ore (Haematite, Magnetite), Manganese and Bauxite Distribution',
          caseStudy: { intro: 'Observe a railway freight train loaded with reddish ore passing through your region – that colour signals haematite from Odisha or Jharkhand.',
            decisions: [{ prompt: 'Name the two main types of iron ore found in India and state the primary geological formation that hosts the high-grade haematite deposits.', options: [
                { text: 'The two main types are haematite (Fe₂O₃) and magnetite (Fe₃O₄)', outcome: 'The two main types are haematite (Fe₂O₃) and magnetite (Fe₃O₄).' },
                { text: 'magnetite in Odisha', outcome: 'Not quite — Students often believe that "magnetite is superior to haematite because it has higher iron content.', reveals: 'magnetite-is-superior-to-haematite' },
                { text: 'haematite in Vindhyans', outcome: 'Not quite — Students often believe that "magnetite is superior to haematite because it has higher iron content.', reveals: 'magnetite-is-superior-to-haematite' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_003', title: 'Non-Ferrous Minerals: Copper, Lead, Zinc in India',
          caseStudy: { intro: 'Begin by asking the student to open a physical map of India and trace the Aravalli Range from Gujarat to Delhi, then locate the Singhbhum region in Jharkhand.',
            decisions: [{ prompt: 'Name the three major copper-producing belts in India and the state each belongs to.', options: [
                { text: 'The three major copper belts are: (1) Singhbhum belt in Jharkhand, (2) Khetri belt in', outcome: 'The three major copper belts are: (1) Singhbhum belt in Jharkhand, (2) Khetri belt in Rajasthan.' },
                { text: 'Khetri is the only copper mine in Rajasthan', outcome: 'Not quite — Students often think “Khetri is the only copper mine in Rajasthan” and miss the newer.', reveals: 'khetri-is-the-only-copper' },
                { text: 'Bauxite regions like Koraput or Lohardaga', outcome: 'Not quite — Students often think “Khetri is the only copper mine in Rajasthan” and miss the newer.', reveals: 'khetri-is-the-only-copper' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_004', title: 'Non-Metallic Minerals: Mica and Limestone Distribution',
          caseStudy: { intro: 'Observe the cement factory near your town or the electrical switchboard at home — both depend on minerals you cannot see as metal.',
            decisions: [{ prompt: 'Name the three major geological formations in India that host economically viable limestone deposits and state the dominant geological.', options: [
                { text: 'The three major limestone-hosting formations are: (1) Vindhyan Supergroup (Proterozoic,', outcome: 'The three major limestone-hosting formations are: (1) Vindhyan Supergroup (Proterozoic, 1600–1000.' },
                { text: 'non-metallic', outcome: 'Not quite — Students believe limestone and mica are both "non-metallic" so they occur together in the same.', reveals: 'limestone-and-mica-are-both' },
                { text: 'Gondwana or Deccan Traps', outcome: 'Not quite — Students believe limestone and mica are both "non-metallic" so they occur together in the same.', reveals: 'limestone-and-mica-are-both' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_19_005', title: 'Conventional Energy: Coal Distribution and Types in India',
          scaffold: { problem: 'A 2000 MW thermal power plant in Maharashtra currently uses Korba coal (GCV 22 MJ/kg, 35% ash) at 85% plant load factor.',
            steps: [
            { text: 'Calculate daily energy output = 2000 MW × 0.85 PLF × 86400 s = 146,880,000 MJ.' },
            { text: 'Heat input required = 146,880,000 / 0.38 = 386,526,316 MJ.' },
            { text: 'Current coal mass = 386,526,316 / 22 = 17,569,378 kg = 17,569 t/day. Ash = 17,569 × 0.35 = 6,149 t/day.' },
            { text: 'Blended CV = (0.8×22) + (0.2×25) = 22.6 MJ/kg. Blended ash% = (0.8×35) + (0.2×10) = 30%.' },
            { text: 'New coal mass = 386,526,316 / 22.6 = 17,102,934 kg = 17,103 t/day. New ash = 17,103 × 0.30 = 5,131 t/day.' },
            { text: 'Change: Coal saving = 466 t/day; Ash reduction = 1,018 t/day (16.6% less).', faded: true, blankAnswer: 'Daily coal consumption decreases by 466 tonnes (2.7%).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_19_006', title: 'Conventional Energy: Petroleum and Natural Gas Reserves',
          scaffold: { problem: 'A student claims "Assam has the oldest oil field (Digboi, 1889) so it must still be India\'s largest producer." Use geological and.',
            steps: [
            { text: 'Identify the claim\'s two assertions — (a) Digboi is oldest (true, 1889), (b) therefore Assam is largest producer (needs.' },
            { text: 'Recall geological difference: Assam-Arakan is a foreland basin with Miocene reservoirs; Mumbai Offshore is a rift.' },
            { text: 'Compare reservoir quality: Mumbai High\'s Lakshmi Formation limestone has 15-25% porosity from karstification vs Assam\'s.' },
            { text: 'Compare trap size: Mumbai High is a single giant anticline (200 km²) vs Assam\'s many smaller faulted anticlines.' },
            { text: 'Check production data: Mumbai Offshore contributes ~40% of India\'s crude; Assam ~12% (ONGC 2023 data).' },
            { text: 'Conclude: Basin-scale geology (reservoir quality, trap size) outweighs historical discovery sequence for production.', faded: true, blankAnswer: 'The claim is false. Mumbai Offshore (Bombay High).' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a minerals-of-India quiz prep, a teammate argues: \'Magnetite has 72% iron vs haematite\'s 70%, so it\'s clearly the better ore — strange that Bhilai and Rourkela run on haematite.\' He also calls a hydrothermal gold-quartz vein and a sedimentary iron bed \'the same thing — both flat tabular bodies.\'',
            decisions: [{ prompt: 'What is he missing about ores and occurrence?', options: [
                { text: 'Separate purity from usability: Kudremukh magnetite is fine-grained and needs costly beneficiation/pelletisation, while Odisha\'s haematite occurs as massive high-grade lumps feeding blast furnaces directly. And mode of occurrence is genetic, not just shape — the gold vein is epigenetic (formed after the host rock) while the iron bed is syngenetic (formed with it), which predicts different associated minerals and mining methods.', outcome: 'The steel-plant \'paradox\' resolves: economics picks processability over percentage, and occurrence type is about origin, not silhouette.' },
                { text: 'Agree magnetite is better — higher iron percentage should decide which ore plants use.', outcome: 'Chemical purity isn\'t metallurgical usability: disseminated magnetite must be ground and pelletised, while lump haematite goes straight to the furnace.', reveals: 'magnetite-better-than-haematite' },
                { text: 'Let the vein-bed equivalence stand — if two ore bodies look tabular, they\'re the same mode of occurrence.', outcome: 'Shape is surface; genesis is the category: epigenetic veins and syngenetic beds imply different host processes, mineral associations and mining approaches.', reveals: 'occurrence-is-just-shape' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_006', title: 'The bigger picture',
          caseStudy: { intro: 'India\'s mineral map is lopsided by geology — the Gangetic plain is rich in everything except ore.',
            decisions: [{ prompt: 'What comes next? Mineral and Energy Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mineral and Energy Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_001', difficulty: 'standard',
          question: 'Minerals are naturally occurring inorganic substances with a definite chemical.',
          hint: 'If stuck, revise Class 9 "Physical Features of India" (c9_geo_ch1_1, c9_geo_ch1_4).',
          misconception: 'Students often believe that "mode of occurrence" only means the physical shape of the ore body (e.g., vein vs.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label the following: (a) Bailadila iron ore mines, (b) Khetri copper mines, (c) Jharia coalfield, (d) Mumbai High.', answer: 'Bailadila iron ore mines, (',
                  options: ['Bailadila iron ore mines, (', 'mode of occurrence', '"mode of occurrence" only means the physical shape of the ore body (e'],
                  hint: 'If stuck, revise Class 9 "Physical Features of India" (c9_geo_ch1_1, c9_geo_ch1_4) focusing on the.',
                  misconception: 'Students often believe that "mode of occurrence" only means the physical shape of the ore body (e.g., vein vs.' }
          ],
            remediations: { 'mode-of-occurrence-only-means': { steps: ['Draw a cross-section showing a hydrothermal vein cutting across strata vs. a sedimentary bed conformable with strata.', 'Use the Bailadila (BIF bed) vs. Kolar (gold vein) comparison to label each with process: syngenetic vs. epigenetic.', 'Practice classifying five Indian mineral occurrences (e.g., mica in pegmatite, petroleum in anticline, placer monazite.', 'Verify with teacher using NCERT Table 19.1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "mode of occurrence" only means the physical shape of the ore body (e.g., vein vs.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s mineral wealth is evenly distributed across all states, ensuring balanced regional development." Use evidence from the three.', answer: 'The statement is false',
                  options: ['The statement is false', 'mode of occurrence', '"mode of occurrence" only means the physical shape of the ore body (e'],
                  hint: 'If stuck, revise Class 9 "Physical Features of India" (c9_geo_ch1_1, c9_geo_ch1_4) focusing on the.',
                  misconception: 'Students often believe that "mode of occurrence" only means the physical shape of the ore body (e.g., vein vs.' }
          ],
            remediations: { 'mode-of-occurrence-only-means': { steps: ['Draw a cross-section showing a hydrothermal vein cutting across strata vs. a sedimentary bed conformable with strata.', 'Use the Bailadila (BIF bed) vs. Kolar (gold vein) comparison to label each with process: syngenetic vs. epigenetic.', 'Practice classifying five Indian mineral occurrences (e.g., mica in pegmatite, petroleum in anticline, placer monazite.', 'Verify with teacher using NCERT Table 19.1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_002', difficulty: 'standard',
          question: 'Iron ore (primarily haematite Fe₂O₃ and magnetite Fe₃O₄), manganese (Mn), and.',
          hint: 'If stuck, revisit the concept of "lateritisation" in Class 9 (c9_geo_ch1_7 Weathering).',
          misconception: 'Students often believe that "magnetite is superior to haematite because it has higher iron content (72% vs 70%)" and.',
          parts: [
                { id: 'a', prompt: 'Name the two main types of iron ore found in India and state the primary geological formation that hosts the high-grade haematite deposits of the.', answer: 'The two main types are haematite (Fe₂O₃) and magnetite (Fe₃O₄)',
                  options: ['The two main types are haematite (Fe₂O₃) and magnetite (Fe₃O₄)', 'magnetite in Odisha', 'haematite in Vindhyans'],
                  hint: 'If stuck, revisit the concept of "lateritisation" in Class 9 (c9_geo_ch1_7 Weathering) and Class 10.',
                  misconception: 'Students often believe that "magnetite is superior to haematite because it has higher iron content (72% vs 70%)" and therefore wonder why.' },
                { id: 'b', prompt: 'Why does the Kudremukh region in Karnataka produce magnetite instead of haematite, even though both are iron oxides?', answer: 'Kudremukh\'s magnetite occurs in the Bababudan Group of the Dharwar Supergroup',
                  options: ['Kudremukh\'s magnetite occurs in the Bababudan Group of the Dharwar Supergroup', 'magnetite is always richer', 'Kudremukh is closer to the coast'],
                  hint: 'If stuck, revisit the concept of "lateritisation" in Class 9 (c9_geo_ch1_7 Weathering) and Class 10.',
                  misconception: 'Students often believe that "magnetite is superior to haematite because it has higher iron content (72% vs 70%)" and therefore wonder why.' },
                { id: 'c', prompt: 'Using the concept of "supergene enrichment", explain why the manganese deposits of the Balaghat district (Madhya Pradesh) are higher in grade than the primary.', answer: 'Primary Gondite rocks (spessartite-quartz rock) contain ~15-20% Mn',
                  options: ['Primary Gondite rocks (spessartite-quartz rock) contain ~15-20% Mn', 'magmatic differentiation', 'hydrothermal veins'],
                  hint: 'If stuck, revisit the concept of "lateritisation" in Class 9 (c9_geo_ch1_7 Weathering) and Class 10.',
                  misconception: 'Students often believe that "magnetite is superior to haematite because it has higher iron content (72% vs 70%)" and therefore wonder why.' }
          ],
            remediations: { 'magnetite-is-superior-to-haematite': { steps: ['Draw a two-column table – "Chemical Fe%" vs "Metallurgical Usability" – and fill with Kudremukh magnetite (72%, needs.', 'Visit the NCERT Class 11 India: Physical Environment textbook Figure 19.3 (iron ore distribution) and trace the railway.', 'Read the caption on "beneficiation" in the textbook.', 'Re-attempt Diagnostic Question 2 with this lens.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_003', difficulty: 'standard',
          question: 'Non-ferrous minerals are metallic minerals that do not contain iron as a major.',
          hint: 'Revise c11_geo_cbse_19_001 (mode of occurrence) and c9_geo_ch1_2 (plate tectonics/craton.',
          misconception: 'Students often think “Khetri is the only copper mine in Rajasthan” and miss the newer Kolihan-Chandmari deposits; they.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) Khetri copper mines, (b) Zawar lead-zinc mines, (c) Malanjkhand copper mine.', answer: 'Khetri copper mines, (',
                  options: ['Khetri copper mines, (', 'Khetri is the only copper mine in Rajasthan'],
                  hint: 'Revise c11_geo_cbse_19_001 (mode of occurrence) and c9_geo_ch1_2 (plate tectonics/craton formation).',
                  misconception: 'Students often think “Khetri is the only copper mine in Rajasthan” and miss the newer Kolihan-Chandmari deposits; they also confuse the.' }
          ],
            remediations: { 'khetri-is-the-only-copper': { steps: ['Draw a two-column table — “Craton” vs “Mineral Belt” — and fill: Aravalli Craton → Khetri Cu, Zawar Pb-Zn; Singhbhum.', 'On a blank outline map, shade the two cratons in different colours, then plot only the mines belonging to each.', 'Write one sentence per craton linking rock type (metavolcanics/dolomites) to metal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_004', difficulty: 'standard',
          question: 'Non-metallic minerals are naturally occurring inorganic substances lacking.',
          hint: 'Review c11_geo_cbse_19_001 (mode of occurrence) and c10_geo_cbse_05_009 (Chota Nagpur.',
          misconception: 'Students believe limestone and mica are both "non-metallic" so they occur together in the same regions — e.g., they.',
          parts: [
                { id: 'a', prompt: 'Using the production data below, calculate the percentage share of the top three limestone-producing states and explain why this concentration matters for.', answer: 'Top three share = 28% + 20% + 13% = 61%',
                  options: ['Top three share = 28% + 20% + 13% = 61%', 'non-metallic'],
                  hint: 'Review c11_geo_cbse_19_001 (mode of occurrence) and c10_geo_cbse_05_009 (Chota Nagpur mineral belt).',
                  misconception: 'Students believe limestone and mica are both "non-metallic" so they occur together in the same regions — e.g., they mark Koderma on.' }
          ],
            remediations: { 'limestone-and-mica-are-both': { steps: ['On a blank outline map of India, shade the Archaean gneissic complex (Chota Nagpur, Dharwar, Aravalli) in pink — this.', 'Shade the Vindhyan, Cuddapah, and Bijawar basins in light blue — this is the ONLY cement-grade limestone terrain.', 'Overlay the two maps — zero overlap confirms mutually exclusive genesis.', 'Write one-sentence geological reason beside each shade: "Mica: late-stage pegmatite crystallisation in Archaean.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_005', difficulty: 'standard',
          question: 'Coal in India is a conventional fossil fuel formed from plant remains.',
          hint: 'If stuck on coal type differences, revisit the coalification series diagram (peat →.',
          misconception: 'Students believe "Jharia is the largest coalfield in India" because it is famous for coking coal.',
          parts: [
                { id: 'a', prompt: 'Name the two geological formations hosting coal in India and state the approximate percentage of total reserves each holds.', answer: 'Correct: Gondwana formation holds ~98% of reserves',
                  options: ['Correct: Gondwana formation holds ~98% of reserves', 'Jharia is the largest coalfield in India', '"Jharia is the largest coalfield in India"'],
                  hint: 'If stuck on coal type differences, revisit the coalification series diagram (peat → lignite →.',
                  misconception: 'Students believe "Jharia is the largest coalfield in India" because it is famous for coking coal.' },
                { id: 'b', prompt: 'A thermal power plant in Tamil Nadu sources coal from Neyveli (Lignite).', answer: '(1) Energy output/day = 1000 MW × 86400 s = 86,400,000 MJ',
                  options: ['(1) Energy output/day = 1000 MW × 86400 s = 86,400,000 MJ', 'Jharia is the largest coalfield in India', '"Jharia is the largest coalfield in India"'],
                  hint: 'If stuck on coal type differences, revisit the coalification series diagram (peat → lignite →.',
                  misconception: 'Students believe "Jharia is the largest coalfield in India" because it is famous for coking coal.' }
          ],
            remediations: { 'jharia-is-the-largest-coalfield': { steps: ['Open India\'s coal reserve table (latest Coal Directory) and sort by \'proved reserves\' - note Singrauli > Jharia >.', 'On a map, trace the Singrauli-Korba corridor and mark Vindhyachal, Rihand, Sipat, Korba power plants - observe they are.', 'Contrast with Jharia: mark Tata Steel Jamshedpur, SAIL Bokaro, Durgapur - note they are 100-200 km away but linked.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_006', difficulty: 'standard',
          question: 'Petroleum and natural gas are naturally occurring hydrocarbon mixtures.',
          hint: 'Revisit c9_geo_ch1_2 (plate tectonics) for basin formation mechanisms and.',
          misconception: 'Students believe petroleum and natural gas are found in "underground lakes" or "pools" (like water aquifers) and that.',
          parts: [
                { id: 'a', prompt: 'Given: India\'s proven crude oil reserves = 600 million tonnes (approx.), annual production = 30 million tonnes.', answer: 'R/P ratio = 600 / 30 = 20 years',
                  options: ['R/P ratio = 600 / 30 = 20 years', 'underground lakes'],
                  hint: 'Revisit c9_geo_ch1_2 (plate tectonics) for basin formation mechanisms and c11_geo_cbse_19_001 (mode.',
                  misconception: 'Students believe petroleum and natural gas are found in "underground lakes" or "pools" (like water aquifers) and that drilling anywhere.' }
          ],
            remediations: { 'petroleum-and-natural-gas-are': { steps: ['Use a clear plastic container with layered sand (reservoir), clay (cap rock), and coloured water (oil) to demonstrate.', 'On an outline map of India, plot only the *proven* reserve fields (not prospective areas) and calculate total proven.', 'Contrast with a "resource" map showing sedimentary basin extents — visually showing that <10% of basin area has proven.', 'Re-read NCERT Class 11 Chapter 19 section "Petroleum and Natural Gas" focusing on the terms "proven reserves,".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
