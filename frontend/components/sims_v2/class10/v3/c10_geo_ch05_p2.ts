import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch05_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch05_p2: SimDef = {
    id: 'v3_c10_geo_ch05_p2',
    title: 'Minerals and Energy Resources · Part 2/2',
    subtitle: 'Spend a one-time geological inheritance wisely',
    classLevel: 10, subject: 'geography', topic: 'Minerals and Energy Resources · Part 2/2',
    chapters: ['c10_geo_ch05'],
    nodeIds: ['c10_geo_cbse_05_007', 'c10_geo_cbse_05_008', 'c10_geo_cbse_05_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mineral resources geologist', intro: 'Under India\'s soils lies a portfolio millions of years in the making — iron, manganese, bauxite, mica, coal. Your job is to find it, classify it, and explain why \'we\'ll just find more\' is a dangerous plan.', goal: 'Define minerals, master their modes of occurrence and Indian distribution, and argue for conservation of an effectively non-renewable endowment.' },
    discovery: {
        question: 'The iron in your bike, the mica in old electricals, the salt in the sea — all minerals, all \'dug up.\' Yet geologists say minerals are a \'one-time inheritance\': once mined, they\'re gone. If minerals form naturally, why can\'t the Earth just make more?',
        options: ['They form over geological timescales of millions of years — trivially renewable to Earth, effectively non-renewable to us', 'Mining permanently stops all mineral formation worldwide', 'Earth does make them fast, but companies hide new deposits', 'Only metals are finite; other minerals regrow like forests'],
        answer: 'They form over geological timescales of millions of years — trivially renewable to Earth, effectively non-renewable to us',
        hook: 'Earth IS making more minerals right now — it just works on a clock of millions of years while we mine on a clock of decades. Finite isn\'t about geology; it\'s about timescale.',
    },
    teaching: [
        { title: 'Non-Conventional Energy: Geothermal, Biogas and Nuclear Energy', text: 'Non-conventional energy sources are renewable or inexhaustible energy alternatives to fossil fuels; geothermal energy harnesses heat from Earth\'s interior (magma, hot rocks, hot springs), biogas.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hunt India\'s minerals from veins and lodes to alluvial sands: classify metallic and non-metallic finds, place iron ore and bauxite belts on the map, then decide how to use a finite inheritance.',
        labels: ['Non-Conventional Energy: Geothermal, Biogas', 'Conservation of Minerals', 'Distribution of Mineral Resources'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_007', title: 'Non-Conventional Energy: Geothermal, Biogas and Nuclear Energy',
          scaffold: { problem: 'A farmer in Punjab has 30 buffaloes. Each produces 12 kg dung daily. The village plans a community biogas plant.',
            steps: [
            { text: 'Calculate daily dung production = 30 × 12 = 360 kg/day' },
            { text: 'Calculate daily biogas yield = 360 × 0.035 = 12.6 m³/day' },
            { text: 'Households served = 12.6 ÷ 1.5 = 8.4 → 8 households (integer)' },
            { text: 'Daily slurry mass = 360 × 0.80 = 288 kg/day; Annual slurry = 288 × 365 = 105,120 kg/year' },
            { text: 'Nitrogen in slurry = 105,120 × 0.015 = 1,576.8 kg N/year' },
            { text: 'Wheat N requirement = 5 ha × 120 kg/ha = 600 kg N/year; 1,576.8 > 600 → sufficient', faded: true, blankAnswer: '8 households can be served; yes, slurry provides 1,577.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_008', title: 'Conservation of Minerals and Energy Resources: Need and Methods',
          caseStudy: { intro: 'Imagine you are in a household in Jharkhand where electricity cuts are frequent, and you see diesel generators running for hours — burning fossil fuel that.',
            decisions: [{ prompt: 'State the primary geological reason why minerals like haematite and bauxite are considered non-renewable resources.', options: [
                { text: 'Correct answer: Minerals like haematite and bauxite form through extremely slow', outcome: 'Correct answer: Minerals like haematite and bauxite form through extremely slow geological.' },
                { text: 'they are deep underground', outcome: 'Not quite — Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic".', reveals: 'conservation-of-minerals-means-only' },
                { text: 'we use them fast', outcome: 'Not quite — Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic".', reveals: 'conservation-of-minerals-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_009', title: 'Distribution of Mineral Resources in India: Chota Nagpur Plateau',
          caseStudy: { intro: 'Begin by showing a satellite image of eastern India at night — the Chota Nagpur region glows with industrial towns like Jamshedpur, Bokaro, Dhanbad, and.',
            decisions: [{ prompt: 'Name the states that share the Chota Nagpur Plateau and identify the single most important mineral that gave this region the nickname "Ruhr.', options: [
                { text: 'The Chota Nagpur Plateau spreads across Jharkhand, northern Odisha, West Bengal (western', outcome: 'The Chota Nagpur Plateau spreads across Jharkhand, northern Odisha, West Bengal (western part), and.' },
                { text: 'iron ore', outcome: 'Not quite — Students often think **all minerals in Chota Nagpur occur together in the same rock layer**,.', reveals: 'all-minerals-in-chota-nagpur' },
                { text: 'manganese', outcome: 'Not quite — Students often think **all minerals in Chota Nagpur occur together in the same rock layer**,.', reveals: 'all-minerals-in-chota-nagpur' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'A mining region\'s economy runs on coal — jobs, power, the town\'s whole life. The coal must eventually end; the question is whether the town ends with it.',
            decisions: [{ prompt: 'How does a place survive the end of its reason to exist?', options: [
                { text: 'Mine until it\'s gone — don\'t kill the town early', outcome: 'The survival answer; \'until it\'s gone\' guarantees the town dies with no preparation at all.' },
                { text: 'Transition now — painful but survivable', outcome: 'The just-transition answer — works only if the \'just\' is funded; retraining programs have a poor record without it.' },
                { text: 'Mine smarter AND build what comes next in parallel', outcome: 'The parallel-track answer — the town doesn\'t stop living while it changes; it requires believing in a future it can\'t yet see.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a school trip, students learn that gold was once panned from the sands of one river but is blasted out of deep rock at a famous goldfield nearby. A student asks why the same metal needs such different ways of getting it.',
            decisions: [{ prompt: 'What decides how a mineral is extracted?', options: [
                { text: 'Its mode of occurrence — where the mineral sits in the earth. In river sands the metal is a placer deposit: rock eroded long ago left heavy grains concentrated in the sediment, so simple panning works. In the goldfield it lies in veins and lodes inside rock, so shafts and blasting are needed. The same mineral, two different geological settings, two different methods.', outcome: 'The chapter\'s key idea: minerals occur as veins and lodes in cracks, as layers or beds, as residual masses, or as alluvial placers — and the occurrence dictates the mining technique and its cost.' },
                { text: 'It is just the company\'s preference — any mineral can be panned or mined either way depending on budget.', outcome: 'You cannot pan metal still locked inside solid rock, and digging shafts for loose river sand would be absurd — geology fixes the menu of methods.', reveals: 'method-is-preference' },
                { text: 'River gold and mine gold must be different minerals, since they are found so differently.', outcome: 'Same metal, different occurrence — rivers merely collect and concentrate gold eroded from rock elsewhere.', reveals: 'different-site-different-mineral' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_009', title: 'You made it',
          caseStudy: { intro: 'Every mineral you use was made once and will never be remade in human time. Conservation isn\'t green idealism here — it\'s arithmetic.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_007', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable or inexhaustible energy.',
          hint: 'If stuck on geothermal distribution, revisit c9_geo_ch1_5 (volcanoes) and c9_geo_ch1_2.',
          misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this.',
          parts: [
                { id: 'a', prompt: 'Name the two experimental geothermal energy projects in India and the states where they are located.', answer: 'Correct: Manikaran (Himachal Pradesh) and Puga Valley (Ladakh)',
                  options: ['Correct: Manikaran (Himachal Pradesh) and Puga Valley (Ladakh)', 'Manikaran in Uttarakhand', 'Tattapani in Chhattisgarh', 'non-conventional = renewable'],
                  hint: 'If stuck on geothermal distribution, revisit c9_geo_ch1_5 (volcanoes) and c9_geo_ch1_2 (plate.',
                  misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this chapter.' },
                { id: 'b', prompt: 'A village has 50 cattle. Each cow produces 10 kg dung/day. If 1 kg dung yields 0.04 m³ biogas, calculate the daily biogas potential.', answer: 'Step 1: Total dung = 50 × 10 = 500 kg/day',
                  options: ['Step 1: Total dung = 50 × 10 = 500 kg/day', 'non-conventional = renewable'],
                  hint: 'If stuck on geothermal distribution, revisit c9_geo_ch1_5 (volcanoes) and c9_geo_ch1_2 (plate.',
                  misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this chapter.' }
          ],
            remediations: { 'non-conventional-renewable-and-therefore': { steps: ['Re-read NCERT page 54-55 (energy resources table) and highlight the column "Renewable/Non-renewable".', 'Make a 2×2 matrix: Conventional-Renewable (none), Conventional-Non-renewable (coal, petroleum).', 'Practise writing: "Nuclear is non-conventional because it uses advanced fission technology and has low carbon.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Nuclear energy is non-conventional because it does not emit CO₂ during electricity generation." Is this justification sufficient for.', answer: 'Insufficient',
                  options: ['Insufficient', 'non-conventional = renewable'],
                  hint: 'If stuck on geothermal distribution, revisit c9_geo_ch1_5 (volcanoes) and c9_geo_ch1_2 (plate.',
                  misconception: 'Students think "non-conventional = renewable" and therefore classify nuclear energy as renewable because it\'s in this chapter.' }
          ],
            remediations: { 'non-conventional-renewable-and-therefore': { steps: ['Re-read NCERT page 54-55 (energy resources table) and highlight the column "Renewable/Non-renewable".', 'Make a 2×2 matrix: Conventional-Renewable (none), Conventional-Non-renewable (coal, petroleum).', 'Practise writing: "Nuclear is non-conventional because it uses advanced fission technology and has low carbon.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_008', difficulty: 'standard',
          question: 'Conservation of minerals and energy resources refers to the planned and.',
          hint: 'If stuck, revisit c8_geo_ch1_3 (renewable vs non-renewable classification) and.',
          misconception: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral.',
          parts: [
                { id: 'a', prompt: 'State the primary geological reason why minerals like haematite and bauxite are considered non-renewable resources.', answer: 'Correct answer: Minerals like haematite and bauxite form through extremely slow',
                  options: ['Correct answer: Minerals like haematite and bauxite form through extremely slow', 'they are deep underground', 'we use them fast', 'conservation of minerals'],
                  hint: 'If stuck, revisit c8_geo_ch1_3 (renewable vs non-renewable classification) and c10_geo_cbse_05_005.',
                  misconception: 'Students think "conservation of minerals" means only "do not use them" or "recycle paper/plastic", missing that mineral conservation.' }
          ],
            remediations: { 'conservation-of-minerals-means-only': { steps: ['Revisit c8_geo_ch1_3 (renewable vs non-renewable) and c8_geo_ch1_11 (conservation principles) to rebuild the.', 'Create a two-column table: "Mineral Conservation Method" vs "Energy Conservation Method" with 3 rows each, using NCERT.', 'Practice one case-based question on "How does improving thermal power plant efficiency conserve both coal and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_009', difficulty: 'standard',
          question: 'The Chota Nagpur Plateau is a mineral-rich physiographic region in eastern.',
          hint: 'If stuck, revisit Class 6 node c6_geography_ch01_004 (Peninsular Plateau) and Class 9.',
          misconception: 'Students often think **all minerals in Chota Nagpur occur together in the same rock layer**, so they write "iron ore.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) the Chota Nagpur Plateau boundary, (b) three major coalfields, (c) two iron‑ore mining centres, (d) one.', answer: 'the Chota Nagpur Plateau boundary, (',
                  options: ['the Chota Nagpur Plateau boundary, (', 'iron ore and coal are found in the same mines', 'mica is mined from coal seams'],
                  hint: 'If stuck, revisit Class 6 node c6_geography_ch01_004 (Peninsular Plateau) and Class 9 node.',
                  misconception: 'Students often think **all minerals in Chota Nagpur occur together in the same rock layer**, so they write "iron ore and coal are found.' },
                { id: 'b', prompt: 'Compare the mineral assemblage of the Chota Nagpur Plateau with that of the Odisha‑Jharkhand belt (often treated separately in textbooks).', answer: 'Both belts share the **Iron Ore Group (Archaean)** host rocks, hence similar',
                  options: ['Both belts share the **Iron Ore Group (Archaean)** host rocks, hence similar', 'Odisha has no coal', 'iron ore and coal are found in the same mines', 'mica is mined from coal seams'],
                  hint: 'If stuck, revisit Class 6 node c6_geography_ch01_004 (Peninsular Plateau) and Class 9 node.',
                  misconception: 'Students often think **all minerals in Chota Nagpur occur together in the same rock layer**, so they write "iron ore and coal are found.' }
          ],
            remediations: { 'all-minerals-in-chota-nagpur': { steps: ['Draw a simple geological cross‑section on the board — label "Archaean basement (iron ore)" at bottom, "Gondwana.', 'Use two coloured pencils (red for metallic, black for coal) on a blank outline map of the plateau; plot actual mining.', 'Ask student to explain why Jharia (coal) and Noamundi (iron) are 150 km apart though both in "Chota Nagpur".', 'Assign a 3‑sentence write‑up: "Coal and iron ore formed in different geological periods and rock types; therefore they.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
