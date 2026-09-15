import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch05_p1: SimDef = {
    id: 'v3_c10_geo_ch05_p1',
    title: 'Minerals and Energy Resources · Part 1/2',
    subtitle: 'Spend a one-time geological inheritance wisely',
    classLevel: 10, subject: 'geography', topic: 'Minerals and Energy Resources · Part 1/2',
    chapters: ['c10_geo_ch05'],
    nodeIds: ['c10_geo_cbse_05_001', 'c10_geo_cbse_05_002', 'c10_geo_cbse_05_003', 'c10_geo_cbse_05_004', 'c10_geo_cbse_05_005', 'c10_geo_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mineral resources geologist', intro: 'Under India\'s soils lies a portfolio millions of years in the making — iron, manganese, bauxite, mica, coal. Your job is to find it, classify it, and explain why \'we\'ll just find more\' is a dangerous plan.', goal: 'Define minerals, master their modes of occurrence and Indian distribution, and argue for conservation of an effectively non-renewable endowment.' },
    discovery: {
        question: 'The iron in your bike, the mica in old electricals, the salt in the sea — all minerals, all \'dug up.\' Yet geologists say minerals are a \'one-time inheritance\': once mined, they\'re gone. If minerals form naturally, why can\'t the Earth just make more?',
        options: ['They form over geological timescales of millions of years — trivially renewable to Earth, effectively non-renewable to us', 'Mining permanently stops all mineral formation worldwide', 'Earth does make them fast, but companies hide new deposits', 'Only metals are finite; other minerals regrow like forests'],
        answer: 'They form over geological timescales of millions of years — trivially renewable to Earth, effectively non-renewable to us',
        hook: 'Earth IS making more minerals right now — it just works on a clock of millions of years while we mine on a clock of decades. Finite isn\'t about geology; it\'s about timescale.',
    },
    teaching: [
        { title: 'Minerals: Definition, Types and Mode of Occurrence', text: 'A mineral is a naturally occurring, inorganic solid with a definite chemical composition and an ordered atomic arrangement (crystalline structure), formed through geological processes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hunt India\'s minerals from veins and lodes to alluvial sands: classify metallic and non-metallic finds, place iron ore and bauxite belts on the map, then decide how to use a finite inheritance.',
        labels: ['Minerals: Definition, Types', 'Iron Ore: Types (Haematite,', 'Other Metallic Minerals: Manganese,', 'Non-Metallic Minerals: Mica', 'Conventional Energy Sources: Coal,', 'Non-Conventional Energy: Solar, Wind'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_001', title: 'Minerals: Definition, Types and Mode of Occurrence',
          caseStudy: { intro: 'Imagine you are travelling through the Chotanagpur plateau in Jharkhand and see trucks carrying reddish ore from open-cast mines — that is iron ore (haematite).',
            decisions: [{ prompt: 'Define a mineral in geographical terms. Give two examples of ferrous metallic minerals found in India.', options: [
                { text: 'A mineral is a naturally occurring inorganic solid with a definite chemical composition', outcome: 'A mineral is a naturally occurring inorganic solid with a definite chemical composition and.' },
                { text: 'minerals are only metals', outcome: 'Not quite — Students believe "mode of occurrence" and "distribution" are the same — they list states where.', reveals: 'mode-of-occurrence-and-distribution' },
                { text: 'coal is a mineral', outcome: 'Not quite — Students believe "mode of occurrence" and "distribution" are the same — they list states where.', reveals: 'mode-of-occurrence-and-distribution' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_002', title: 'Iron Ore: Types (Haematite, Magnetite) and Distribution in India',
          caseStudy: { intro: 'Observe a rusty nail (reddish-brown) and a magnet sticking to a refrigerator — these everyday objects hint at the two faces of iron ore: haematite (like rust).',
            decisions: [{ prompt: 'Name the two main types of iron ore found in India and state the typical iron percentage range for each.', options: [
                { text: 'Haematite (Fe₂O₃)', outcome: 'Haematite (Fe₂O₃) — 60–70% iron; Magnetite (Fe₃O₄) — up to 72% iron.' },
                { text: 'limonite/siderite as main types, or swapping percentages', outcome: 'Not quite — Students believe **magnetite is the main ore mined in India** because its iron content (72%).', reveals: 'magnetite-is-the-main-ore' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_003', title: 'Other Metallic Minerals: Manganese, Bauxite and Copper',
          caseStudy: { intro: 'Look at a stainless steel spoon, an aluminium foil wrapper, and an electrical wire in your home — these everyday items contain manganese, bauxite (aluminium.',
            decisions: [{ prompt: 'Name the geological system in which manganese ore deposits are predominantly found in India and name two major manganese-producing states.', options: [
                { text: 'Manganese deposits are predominantly found in the Dharwar and Cuddapah systems of the', outcome: 'Manganese deposits are predominantly found in the Dharwar and Cuddapah systems of the Peninsular.' },
                { text: 'manganese is found in the Himalayan region', outcome: 'Not quite — Students often think bauxite is a primary mineral formed directly from magma like iron ore, and.', reveals: 'bauxite-is-a-primary-mineral' },
                { text: 'iron ore belts', outcome: 'Not quite — Students often think bauxite is a primary mineral formed directly from magma like iron ore, and.', reveals: 'bauxite-is-a-primary-mineral' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_004', title: 'Non-Metallic Minerals: Mica and Limestone',
          caseStudy: { intro: 'Look at the electrical switchboard in your classroom — the insulating sheets inside are likely made of mica from Jharkhand\'s Koderma mines.',
            decisions: [{ prompt: 'Name the two major mica-producing belts in India and the specific mineral property that makes mica indispensable in the electrical and.', options: [
                { text: 'The two major mica-producing belts are: (1) Koderma-Gaya-Hazaribagh belt in', outcome: 'The two major mica-producing belts are: (1) Koderma-Gaya-Hazaribagh belt in Jharkhand/Bihar, and.' },
                { text: 'minor minerals', outcome: 'Not quite — Students believe mica and limestone are "minor minerals" with limited industrial use because they.', reveals: 'mica-and-limestone-are-minor' },
                { text: 'with limestone\'s', outcome: 'Not quite — Students believe mica and limestone are "minor minerals" with limited industrial use because they.', reveals: 'mica-and-limestone-are-minor' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_05_005', title: 'Conventional Energy Sources: Coal, Petroleum and Natural Gas',
          scaffold: { problem: 'A student is given an outline map of India with four locations marked: A (Jharia), B (Mumbai High), C (Digboi), D (Singrauli).',
            steps: [
            { text: 'Recall that Jharia and Singrauli are in the Damodar Valley and Son Valley respectively — both are Gondwana rift basins.' },
            { text: 'Recall that Mumbai High is offshore in the Arabian Sea, and Digboi is in Assam — both are sedimentary basins formed.' },
            { text: 'Assign geological periods: Jharia and Singrauli = Gondwana (Permian, ~250 Ma); Mumbai High = Tertiary (Miocene, ~20.' },
            { text: 'Explain distribution: Gondwana coalfields occur where ancient rivers deposited plant matter in subsiding basins on the.' },
            { text: 'Verify with map: Jharia (Jharkhand), Singrauli (MP/UP) — both on plateau; Mumbai High (offshore Maharashtra); Digboi.', faded: true, blankAnswer: 'A (Jharia) = Coalfield, Gondwana; B (Mumbai High) = Oil.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_006', title: 'Non-Conventional Energy: Solar, Wind and Tidal Energy',
          caseStudy: { intro: 'Look at your own rooftop or a neighbour\'s house — you have likely seen blue-black rectangular panels angled towards the sun; those are solar photovoltaic.',
            decisions: [{ prompt: 'Name the three non-conventional energy sources covered in this chapter and state one major geographical requirement for each to.', options: [
                { text: 'The three sources are solar energy (requires high solar insolation > 5 kWh/m²/day and', outcome: 'The three sources are solar energy (requires high solar insolation > 5 kWh/m²/day and 300.' },
                { text: 'biogas', outcome: 'Not quite — Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline".', reveals: 'india-has-huge-tidal-energy' },
                { text: 'geothermal', outcome: 'Not quite — Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline".', reveals: 'india-has-huge-tidal-energy' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'A mining region\'s economy runs on coal — jobs, power, the town\'s whole life. The coal must eventually end; the question is whether the town ends with it.',
            decisions: [{ prompt: 'How does a place survive the end of its reason to exist?', options: [
                { text: 'Mine until it\'s gone — don\'t kill the town early', outcome: 'The survival answer; \'until it\'s gone\' guarantees the town dies with no preparation at all.' },
                { text: 'Transition now — painful but survivable', outcome: 'The just-transition answer — works only if the \'just\' is funded; retraining programs have a poor record without it.' },
                { text: 'Mine smarter AND build what comes next in parallel', outcome: 'The parallel-track answer — the town doesn\'t stop living while it changes; it requires believing in a future it can\'t yet see.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a school trip, students learn that gold was once panned from the sands of one river but is blasted out of deep rock at a famous goldfield nearby. A student asks why the same metal needs such different ways of getting it.',
            decisions: [{ prompt: 'What decides how a mineral is extracted?', options: [
                { text: 'Its mode of occurrence — where the mineral sits in the earth. In river sands the metal is a placer deposit: rock eroded long ago left heavy grains concentrated in the sediment, so simple panning works. In the goldfield it lies in veins and lodes inside rock, so shafts and blasting are needed. The same mineral, two different geological settings, two different methods.', outcome: 'The chapter\'s key idea: minerals occur as veins and lodes in cracks, as layers or beds, as residual masses, or as alluvial placers — and the occurrence dictates the mining technique and its cost.' },
                { text: 'It is just the company\'s preference — any mineral can be panned or mined either way depending on budget.', outcome: 'You cannot pan metal still locked inside solid rock, and digging shafts for loose river sand would be absurd — geology fixes the menu of methods.', reveals: 'method-is-preference' },
                { text: 'River gold and mine gold must be different minerals, since they are found so differently.', outcome: 'Same metal, different occurrence — rivers merely collect and concentrate gold eroded from rock elsewhere.', reveals: 'different-site-different-mineral' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every mineral you use was made once and will never be remade in human time. Conservation isn\'t green idealism here — it\'s arithmetic.',
            decisions: [{ prompt: 'What comes next? Minerals and Energy Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Minerals and Energy Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_001', difficulty: 'standard',
          question: 'A mineral is a naturally occurring, inorganic solid with a definite chemical.',
          hint: 'If stuck, revisit Class 8 "Classification by Exhaustibility: Renewable and Non-Renewable".',
          misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found.',
          parts: [
                { id: 'a', prompt: 'Bauxite in the Amarkantak plateau (Madhya Pradesh) is found as a residual mass in laterite soil.', answer: 'Mode: Residual mass (formed by weathering)',
                  options: ['Mode: Residual mass (formed by weathering)', 'alluvial deposit', 'reveals confusion between transported vs', 'distribution'],
                  hint: 'If stuck, revisit Class 8 "Classification by Exhaustibility: Renewable and Non-Renewable".',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore.' },
                { id: 'b', prompt: 'Compare the mode of occurrence of mica in Jharkhand (Koderma) with that of coal in the Damodar Valley. How does the difference affect the mining technique used?', answer: 'Mica occurs in veins/lodes within pegmatite intrusions (igneous)',
                  options: ['Mica occurs in veins/lodes within pegmatite intrusions (igneous)', 'mode of occurrence', 'distribution', 'iron ore in Odisha'],
                  hint: 'If stuck, revisit Class 8 "Classification by Exhaustibility: Renewable and Non-Renewable".',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore.' }
          ],
            remediations: { 'mode-of-occurrence-and-distribution': { steps: ['Draw a cross-section diagram showing the five modes labelled with geological agents (magmatic, sedimentary, weathering.', 'On an outline map of India, mark one location for each mode (e.g., Khetri for veins, Bailadila for beds, Panchpatmali.', 'Write a one-sentence definition for each mode linking process to form.', 'Practice converting a distribution statement ("Mica in Jharkhand") into a mode statement ("Mica in veins/lodes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found.',
          parts: [
                { id: 'a', prompt: '"Ocean water contains vast quantities of dissolved minerals like magnesium and bromine, yet commercial extraction is limited." Evaluate this statement.', answer: 'The statement is valid',
                  options: ['The statement is valid', 'it\'s easy because ocean is big', 'mode of occurrence', 'distribution'],
                  hint: 'If stuck, revisit Class 8 "Classification by Exhaustibility: Renewable and Non-Renewable".',
                  misconception: 'Students believe "mode of occurrence" and "distribution" are the same — they list states where a mineral is found (e.g., "iron ore.' }
          ],
            remediations: { 'mode-of-occurrence-and-distribution': { steps: ['Draw a cross-section diagram showing the five modes labelled with geological agents (magmatic, sedimentary, weathering.', 'On an outline map of India, mark one location for each mode (e.g., Khetri for veins, Bailadila for beds, Panchpatmali.', 'Write a one-sentence definition for each mode linking process to form.', 'Practice converting a distribution statement ("Mica in Jharkhand") into a mode statement ("Mica in veins/lodes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_002', difficulty: 'standard',
          question: 'Iron ore is a naturally occurring solid material from which metallic iron can.',
          hint: 'If stuck, revisit **c6_geography_ch01_004** (Peninsular Plateau) and.',
          misconception: 'Students believe **magnetite is the main ore mined in India** because its iron content (72%) is higher than haematite.',
          parts: [
                { id: 'a', prompt: 'Name the two main types of iron ore found in India and state the typical iron percentage range for each.', answer: 'Haematite (Fe₂O₃)',
                  options: ['Haematite (Fe₂O₃)', 'limonite/siderite as main types, or swapping percentages'],
                  hint: 'If stuck, revisit **c6_geography_ch01_004** (Peninsular Plateau) and **c10_geo_cbse_05_001** (mode.',
                  misconception: 'Students believe **magnetite is the main ore mined in India** because its iron content (72%) is higher than haematite (60–70%).' },
                { id: 'b', prompt: 'Why are India\'s major iron-ore deposits concentrated in the Peninsular Plateau and not in the Himalayas or the Northern Plains?', answer: 'The Peninsular Plateau consists of ancient Precambrian crystalline rocks',
                  options: ['The Peninsular Plateau consists of ancient Precambrian crystalline rocks', 'high rainfall', 'volcanic activity'],
                  hint: 'If stuck, revisit **c6_geography_ch01_004** (Peninsular Plateau) and **c10_geo_cbse_05_001** (mode.',
                  misconception: 'Students believe **magnetite is the main ore mined in India** because its iron content (72%) is higher than haematite (60–70%).' }
          ],
            remediations: { 'magnetite-is-the-main-ore': { steps: ['Make a two-column table — Haematite vs Magnetite — with rows: Iron %, Colour, Streak, Magnetism, **Major Indian Belt**.', 'On a political map, colour-code the four belts; write "H" or "M" inside each belt.', 'Read NCERT page 52 (Minerals and Energy Resources) — highlight the line: "Haematite is the most important industrial.', 'Practice a 3-mark question: "Why is haematite more important than magnetite in India despite lower iron content?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_003', difficulty: 'standard',
          question: 'Manganese, bauxite, and copper are key metallic minerals in India formed.',
          hint: 'Revisit node c10_geo_cbse_05_001 "Mode of Occurrence" section and Class 9 weathering.',
          misconception: 'Students often think bauxite is a primary mineral formed directly from magma like iron ore, and therefore look for.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label the following: (a) The largest manganese-producing district in Odisha, (b) The main bauxite mining region.', answer: 'The largest manganese-producing district in Odisha, (',
                  options: ['The largest manganese-producing district in Odisha, (', 'iron ore belts'],
                  hint: 'Revisit node c10_geo_cbse_05_001 "Mode of Occurrence" section and Class 9 weathering (c9_geo_ch1_7).',
                  misconception: 'Students often think bauxite is a primary mineral formed directly from magma like iron ore, and therefore look for it in the same "iron ore.' }
          ],
            remediations: { 'bauxite-is-a-primary-mineral': { steps: ['Take a physical map of India and shade the Deccan Trap region (Maharashtra, Gujarat, MP).', 'Overlay the laterite/bauxite occurrences — they sit on the flat-topped hills of the traps (e.g., Amarkantak, Maikal.', 'Contrast with the iron ore map (c10_geo_cbse_05_002) — iron is in the Dharwar schists of Singhbhum-Keonjhar, not on the.', 'Write the rule: "Bauxite = laterite on elevated, well-drained surfaces in high rainfall zones; Iron = banded iron.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_004', difficulty: 'standard',
          question: 'Non-metallic minerals are naturally occurring inorganic substances that do not.',
          hint: 'Revisit c10_geo_cbse_05_001 (mode of occurrence) and c7_geo_ch01_006 (Peninsular Plateau.',
          misconception: 'Students believe mica and limestone are "minor minerals" with limited industrial use because they are non-metallic.',
          parts: [
                { id: 'a', prompt: 'Name the two major mica-producing belts in India and the specific mineral property that makes mica indispensable in the electrical and electronics industry.', answer: 'The two major mica-producing belts are: (1) Koderma-Gaya-Hazaribagh belt in',
                  options: ['The two major mica-producing belts are: (1) Koderma-Gaya-Hazaribagh belt in', 'minor minerals', 'with limestone\'s', 'Rajasthan as a major mica belt or citing hardness as the key property'],
                  hint: 'Revisit c10_geo_cbse_05_001 (mode of occurrence) and c7_geo_ch01_006 (Peninsular Plateau divisions).',
                  misconception: 'Students believe mica and limestone are "minor minerals" with limited industrial use because they are non-metallic.' },
                { id: 'b', prompt: 'Explain why limestone deposits are concentrated in sedimentary basins of the Peninsular Plateau (like Cuddapah and Vindhyan systems) rather than in the.', answer: 'Limestone in Peninsular India formed in stable, shallow marine basins (Cuddapah,',
                  options: ['Limestone in Peninsular India formed in stable, shallow marine basins (Cuddapah,', 'Himalayas have no limestone', 'Peninsular rocks are older', 'minor minerals'],
                  hint: 'Revisit c10_geo_cbse_05_001 (mode of occurrence) and c7_geo_ch01_006 (Peninsular Plateau divisions).',
                  misconception: 'Students believe mica and limestone are "minor minerals" with limited industrial use because they are non-metallic.' },
                { id: 'c', prompt: 'A cement factory requires limestone with ≥90% CaCO₃ and low silica (<2%).', answer: 'Sample A meets specifications (92% CaCO₃ ≥ 90%, 1.5% SiO₂ < 2%)',
                  options: ['Sample A meets specifications (92% CaCO₃ ≥ 90%, 1.5% SiO₂ < 2%)', 'minor minerals', 'with limestone\'s'],
                  hint: 'Revisit c10_geo_cbse_05_001 (mode of occurrence) and c7_geo_ch01_006 (Peninsular Plateau divisions).',
                  misconception: 'Students believe mica and limestone are "minor minerals" with limited industrial use because they are non-metallic.' }
          ],
            remediations: { 'mica-and-limestone-are-minor': { steps: ['On an outline map of India, shade the Chota Nagpur Plateau (Jharkhand) and Eastern Ghats (Andhra Pradesh) — mark mica.', 'Shade Cuddapah Basin (AP), Vindhyan Basin (MP/UP), and Kachchh (Gujarat) — mark limestone quarries as blue squares.', 'Write one industrial use next to each symbol: "Electrical insulation — Bengaluru" near mica; "Cement — Mumbai" near.', 'Recite: "Mica = veins in crystalline rocks; Limestone = beds in sedimentary basins." Repeat until the spatial-pattern.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_005', difficulty: 'standard',
          question: 'Conventional energy sources are non-renewable fossil fuels — coal, petroleum.',
          hint: 'If stuck, revisit c8_geo_ch1_10 (Non-Renewable Resources) and c6_geography_ch01_004.',
          misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil.',
          parts: [
                { id: 'a', prompt: 'A thermal power plant in Jharkhand burns bituminous coal with 75% carbon content.', answer: 'Step 1: Convert tonnes to kg: 5,000 tonnes = 5,000 × 1,000 = 5,000,000 kg',
                  options: ['Step 1: Convert tonnes to kg: 5,000 tonnes = 5,000 × 1,000 = 5,000,000 kg', 'coal, petroleum, and natural gas are found together in the same places'],
                  hint: 'If stuck, revisit c8_geo_ch1_10 (Non-Renewable Resources) and c6_geography_ch01_004 (Peninsular.',
                  misconception: 'Students believe "coal, petroleum, and natural gas are found together in the same places" because they are all \'fossil fuels\'.' }
          ],
            remediations: { 'coal': { steps: ['On an outline map of India, mark all Gondwana coalfields (Jharia, Bokaro, Raniganj, Singrauli, Talcher) in black and.', 'Overlay the geological map — notice coalfields align with Damodar/Mahanadi/Godavari rift valleys (continental.', 'Write one sentence for each: "Coal = land plants in river deltas" and "Petroleum = marine plankton in shallow seas".', 'Memorise the mnemonic: "Gondwana = Coal on Land; Tertiary/Offshore = Oil in Sea".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_05_006', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable, inexhaustible energy resources.',
          hint: 'If stuck, revisit Class 9 Atmosphere chapter (c9_geo_ch2_3, c9_geo_ch2_4) for pressure.',
          misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) the state with the highest installed wind power capacity, (b) the mountain pass enabling wind funneling in that.', answer: 'the state with the highest installed wind power capacity, (',
                  options: ['the state with the highest installed wind power capacity, (', 'interior Madhya Pradesh', 'Sunderbans', 'India has huge tidal energy potential'],
                  hint: 'If stuck, revisit Class 9 Atmosphere chapter (c9_geo_ch2_3, c9_geo_ch2_4) for pressure gradients.',
                  misconception: 'Students believe that "India has huge tidal energy potential because it has a 7,500 km coastline" — they confuse coastline length with.' }
          ],
            remediations: { 'india-has-huge-tidal-energy': { steps: ['Show the student a tidal range map of India (from NCERT Class 10 Fig 5.12 or MNRE atlas) — highlight that only Gujarat.', 'Use a simple funnel diagram — pour water into a wide tray vs a narrow-necked bottle — to demonstrate how constriction.', 'Have them calculate theoretical power: P = 0.5 × ρ × A × v³ — show that at v = 1 m/s (typical open coast), power.', 'Assign a 3-mark board-style question: "Why is tidal energy restricted to Gujarat?" — require the three keywords.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
