import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch19_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch19_p2: SimDef = {
    id: 'v3_c11_geo_ch19_p2',
    title: 'Mineral and Energy Resources · Part 2/2',
    subtitle: 'See why ore grade isn\'t the whole story — and why mineral wealth maps onto ancient rock.',
    classLevel: 11, subject: 'geography', topic: 'Mineral and Energy Resources · Part 2/2',
    chapters: ['c11_geo_ch19'],
    nodeIds: ['c11_geo_cbse_19_007', 'c11_geo_cbse_19_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an economic geologist siting a steel plant', intro: 'A freight train of reddish ore rolls past — that colour is haematite, and its home ground decides where India\'s steel towns live.', goal: 'Map India\'s mineral belts and explain how mode of occurrence shapes mining and industry.' },
    discovery: {
        question: 'Magnetite carries 72% iron against haematite\'s 70% — so why do Bhilai and Rourkela run on haematite?',
        options: ['Odisha\'s haematite comes as massive high-grade lumps ready for the furnace; Kudremukh\'s magnetite is fine-grained and needs costly beneficiation', 'Haematite is magnetically easier to handle', 'Magnetite is too rare in India to use', 'Steel plants were built before magnetite was discovered'],
        answer: 'Odisha\'s haematite comes as massive high-grade lumps ready for the furnace; Kudremukh\'s magnetite is fine-grained and needs costly beneficiation',
        hook: 'Purity on paper loses to processability in the field — and to the brute fact that 90% of India\'s metallic wealth sits in one north-eastern peninsular belt.',
    },
    teaching: [
        { title: 'Non-Conventional Energy: Solar, Wind, Tidal, Geothermal, Nuclear', text: 'Non-conventional energy sources are renewable, eco-friendly alternatives to fossil fuels that harness natural processes such as solar radiation, wind kinetic energy, tidal movements, geothermal heat.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_19_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Pin Bailadila, Khetri, Jharia and Mumbai High to their belts, then test whether minerals are \'evenly distributed for balanced development.\'',
        labels: ['Non-Conventional Energy: Solar, Wind,', 'Conservation of Mineral'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_007', title: 'Non-Conventional Energy: Solar, Wind, Tidal, Geothermal, Nuclear',
          caseStudy: { intro: 'Start by observing solar panels on rooftops in your neighbourhood or wind turbines along the highway to Tamil Nadu.',
            decisions: [{ prompt: 'What is the fundamental difference between conventional and non-conventional energy sources in terms of renewability and environmental.', options: [
                { text: 'Conventional sources (coal, petroleum) are finite, non-renewable, and emit greenhouse', outcome: 'Conventional sources (coal, petroleum) are finite, non-renewable, and emit greenhouse gases.' },
                { text: 'non-conventional are cheaper', outcome: 'Not quite — Students think "non-conventional energy" means "unlimited and free everywhere." They ignore that.', reveals: 'non-conventional-energy-means-unlimited' },
                { text: 'non-conventional energy', outcome: 'Not quite — Students think "non-conventional energy" means "unlimited and free everywhere." They ignore that.', reveals: 'non-conventional-energy-means-unlimited' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_19_008', title: 'Conservation of Mineral and Energy Resources: Need and Methods',
          scaffold: { problem: 'India\'s steel sector aims to increase scrap-based production from 15% to 30% by 2030 (National Steel Policy).',
            steps: [
            { text: 'Target scrap-based steel = 30% × 125 Mt = 37.5 Mt/yr. Current = 18.75 Mt/yr. Additional scrap-based steel = 18.75 Mt/yr.' },
            { text: 'Additional scrap required = 18.75 Mt steel × 1.1 t scrap/t steel = 20.625 Mt/yr scrap.' },
            { text: 'Iron ore conserved = 18.75 Mt steel × 1.6 t ore/t steel = 30 Mt/yr iron ore (avoided mining).' },
            { text: 'Emission reduction = 18.75 Mt × (2.2 - 0.6) tCO2/t = 18.75 × 1.6 = 30 Mt CO2/yr.' },
            { text: 'Verify: Scrap availability? India generates ~25 Mt/yr ferrous scrap, imports 7 Mt/yr.', faded: true, blankAnswer: '(a) 20.625 Mt/yr additional scrap, (b) 30 Mt/yr iron ore.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a minerals-of-India quiz prep, a teammate argues: \'Magnetite has 72% iron vs haematite\'s 70%, so it\'s clearly the better ore — strange that Bhilai and Rourkela run on haematite.\' He also calls a hydrothermal gold-quartz vein and a sedimentary iron bed \'the same thing — both flat tabular bodies.\'',
            decisions: [{ prompt: 'What is he missing about ores and occurrence?', options: [
                { text: 'Separate purity from usability: Kudremukh magnetite is fine-grained and needs costly beneficiation/pelletisation, while Odisha\'s haematite occurs as massive high-grade lumps feeding blast furnaces directly. And mode of occurrence is genetic, not just shape — the gold vein is epigenetic (formed after the host rock) while the iron bed is syngenetic (formed with it), which predicts different associated minerals and mining methods.', outcome: 'The steel-plant \'paradox\' resolves: economics picks processability over percentage, and occurrence type is about origin, not silhouette.' },
                { text: 'Agree magnetite is better — higher iron percentage should decide which ore plants use.', outcome: 'Chemical purity isn\'t metallurgical usability: disseminated magnetite must be ground and pelletised, while lump haematite goes straight to the furnace.', reveals: 'magnetite-better-than-haematite' },
                { text: 'Let the vein-bed equivalence stand — if two ore bodies look tabular, they\'re the same mode of occurrence.', outcome: 'Shape is surface; genesis is the category: epigenetic veins and syngenetic beds imply different host processes, mineral associations and mining approaches.', reveals: 'occurrence-is-just-shape' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_19_008', title: 'You made it',
          caseStudy: { intro: 'India\'s mineral map is lopsided by geology — the Gangetic plain is rich in everything except ore.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_007', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable, eco-friendly alternatives.',
          hint: 'Review Class 10 Geography Chapter 5 (Minerals and Energy Resources) nodes.',
          misconception: 'Students think "non-conventional energy" means "unlimited and free everywhere." They ignore that each source has strict.',
          parts: [
                { id: 'a', prompt: 'Given a map of India showing average annual wind speed at 50m height, identify two states with the highest wind energy potential and explain the topographic.', answer: 'Tamil Nadu and Gujarat have the highest potential',
                  options: ['Tamil Nadu and Gujarat have the highest potential', 'non-conventional energy', 'unlimited and free everywhere', '"non-conventional energy" means "unlimited and free everywhere'],
                  hint: 'Review Class 10 Geography Chapter 5 (Minerals and Energy Resources) nodes c10_geo_cbse_05_006 and.',
                  misconception: 'Students think "non-conventional energy" means "unlimited and free everywhere." They ignore that each source has strict geographical.' }
          ],
            remediations: { 'non-conventional-energy-means-unlimited': { steps: ['Use India\'s solar radiation map and wind atlas maps side by side.', 'Have students mark high-potential zones for each.', 'Then overlay land use, population density, and grid connectivity maps.', 'Discuss why high potential ≠ high installed capacity (e.g., Gujarat vs Rajasthan solar).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "non-conventional energy" means "unlimited and free everywhere." They ignore that each source has strict.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Nuclear energy is a non-conventional source because uranium is abundant in India." Is this correct? Justify.', answer: 'Incorrect',
                  options: ['Incorrect', 'non-conventional energy', 'unlimited and free everywhere', '"non-conventional energy" means "unlimited and free everywhere'],
                  hint: 'Review Class 10 Geography Chapter 5 (Minerals and Energy Resources) nodes c10_geo_cbse_05_006 and.',
                  misconception: 'Students think "non-conventional energy" means "unlimited and free everywhere." They ignore that each source has strict geographical.' }
          ],
            remediations: { 'non-conventional-energy-means-unlimited': { steps: ['Use India\'s solar radiation map and wind atlas maps side by side.', 'Have students mark high-potential zones for each.', 'Then overlay land use, population density, and grid connectivity maps.', 'Discuss why high potential ≠ high installed capacity (e.g., Gujarat vs Rajasthan solar).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_19_008', difficulty: 'standard',
          question: 'Conservation of mineral and energy resources refers to the systematic.',
          hint: 'If stuck, revisit c11_geo_cbse_19_001 (mode of occurrence) and c10_geo_cbse_05_008.',
          misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.',
          parts: [
                { id: 'a', prompt: 'A thermal power plant in Tamil Nadu currently burns 5 million tonnes/year of imported coal (GCV 6200 kcal/kg, ash 10%).', answer: 'Step 1: Energy required = 5 Mt × 6200 = 31,000 million kcal/year',
                  options: ['Step 1: Energy required = 5 Mt × 6200 = 31,000 million kcal/year', 'import substitution', 'conservation = reducing consumption'],
                  hint: 'If stuck, revisit c11_geo_cbse_19_001 (mode of occurrence) and c10_geo_cbse_05_008 (conservation.',
                  misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.' },
                { id: 'b', prompt: 'Compare the conservation effectiveness of: (a) increasing aluminium recycling rate from 30% to 60% in India, versus (b) substituting copper with aluminium.', answer: 'increasing aluminium recycling rate from 30% to 60% in India, versus (',
                  options: ['increasing aluminium recycling rate from 30% to 60% in India, versus (', 'conservation = reducing consumption'],
                  hint: 'If stuck, revisit c11_geo_cbse_19_001 (mode of occurrence) and c10_geo_cbse_05_008 (conservation.',
                  misconception: 'Students think "conservation = reducing consumption" and equate it with austerity or lifestyle sacrifice.' }
          ],
            remediations: { 'conservation-reducing-consumption-and-equate': { steps: ['Revisit Class 10 node c10_geo_cbse_05_008 — list the 6 conservation methods taught there.', 'For each method, ask "At which stage of the resource lifecycle does this act?" (exploration → extraction → processing →.', 'Map Indian examples to each stage: exploration (National Mineral Exploration Trust), extraction (coal washing.', 'Identify the missing stage — "design for recycling" (upstream) — and research India\'s Resource Efficiency Policy (NITI.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
