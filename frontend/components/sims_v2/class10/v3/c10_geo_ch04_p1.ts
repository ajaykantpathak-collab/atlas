import type { SimDef } from '../../engine/types';

/** v3 generated — c10_geo_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_geo_ch04_p1: SimDef = {
    id: 'v3_c10_geo_ch04_p1',
    title: 'Agriculture · Part 1/2',
    subtitle: 'Run the sector that feeds a billion on a fifth of the economy',
    classLevel: 10, subject: 'geography', topic: 'Agriculture · Part 1/2',
    chapters: ['c10_geo_ch04'],
    nodeIds: ['c10_geo_cbse_04_001', 'c10_geo_cbse_04_002', 'c10_geo_cbse_04_003', 'c10_geo_cbse_04_004', 'c10_geo_cbse_04_005', 'c10_geo_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an agricultural planner', intro: 'Nearly half of India\'s workers still farm, yet farming earns less than a fifth of the national income. Somewhere between the field and the GDP figure lies the real story of Indian agriculture.', goal: 'Weigh agriculture\'s true economic roles — employment, food security, raw materials, exports — and understand farming types, cropping seasons and reform debates.' },
    discovery: {
        question: 'Agriculture employs about 43% of India\'s workers but produces only around 18% of the country\'s GVA. If farming is so \'unproductive,\' why can\'t India simply shift those workers into factories and services?',
        options: ['Agriculture also feeds the nation, supplies raw material to industries and earns export income — and manufacturing can\'t absorb that many workers quickly', 'It actually can — economists just refuse to admit it', 'Farm workers refuse all other jobs by tradition alone', 'The 18% figure is a data error; farms produce most of GDP'],
        answer: 'Agriculture also feeds the nation, supplies raw material to industries and earns export income — and manufacturing can\'t absorb that many workers quickly',
        hook: 'A sector can shrink in GDP share while its importance grows — your breakfast, your cotton shirt and India\'s rice exports all start in a field.',
    },
    teaching: [
        { title: 'Agriculture: Importance in the Indian Economy', text: 'Agriculture in the Indian economy refers to the primary sector activity that engages nearly 43% of the workforce (Periodic Labour Force Survey 2022-23), contributes approximately 18% to the Gross.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_geo_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow one grain of wheat through India\'s farm economy: choose between subsistence and commercial farming logic, match crops to soils and seasons, and judge which reforms actually help the farmer.',
        labels: ['Agriculture: Importance in', 'Types of Farming: Primitive', 'Cropping Patterns: Rabi, Kharif', 'Major Crops: Rice, Wheat,', 'Major Crops: Pulses, Sugarcane,', 'Major Crops: Rubber, Cotton'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_001', title: 'Agriculture: Importance in the Indian Economy',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to list everything they ate for breakfast and trace each item (wheat roti, rice idli, milk, sugar, cotton.',
            decisions: [{ prompt: 'State the approximate percentage of India\'s workforce engaged in agriculture according to the latest Periodic Labour Force Survey.', options: [
                { text: 'Correct answer: Workforce engagement ~43% (PLFS 2022-23)', outcome: 'Correct answer: Workforce engagement ~43% (PLFS 2022-23); GVA share ~18% (2023-24, First Advance.' },
                { text: '60% workforce, 30% GDP', outcome: 'Not quite — Students believe "agriculture is unimportant because its GDP share is only 18%".', reveals: 'agriculture-is-unimportant-because-its' },
                { text: 'agriculture is unimportant', outcome: 'Not quite — Students believe "agriculture is unimportant because its GDP share is only 18%".', reveals: 'agriculture-is-unimportant-because-its' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_002', title: 'Types of Farming: Primitive Subsistence, Intensive Subsistence, Commercial',
          caseStudy: { intro: 'Observe the fields around your village or during a train journey: you see tiny fragmented plots worked by hand with family labour in the hills of Northeast.',
            decisions: [{ prompt: 'Name the type of farming practised in the hilly regions of Northeast India where farmers clear a patch of forest, burn the vegetation, and.', options: [
                { text: 'Correct answer: Primitive subsistence farming (also called shifting cultivation or jhum', outcome: 'Correct answer: Primitive subsistence farming (also called shifting cultivation or jhum.' },
                { text: 'intensive subsistence', outcome: 'Not quite — Students often think "intensive subsistence farming" means using modern machinery and chemical.', reveals: 'intensive-subsistence-farming-means-using' },
                { text: 'commercial farming', outcome: 'Not quite — Students often think "intensive subsistence farming" means using modern machinery and chemical.', reveals: 'intensive-subsistence-farming-means-using' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_geo_cbse_04_003', title: 'Cropping Patterns: Rabi, Kharif and Zaid Crops',
          scaffold: { problem: 'A farmer in Ludhiana (Punjab) has 10 hectares of land with assured canal irrigation. He currently grows Rice (Kharif) and Wheat (Rabi).',
            steps: [
            { text: 'Identify Net Sown Area (NSA) = 10 ha (total land cultivated at least once).' },
            { text: 'Calculate current Gross Cropped Area (GCA) = Area under Kharif (10 ha) + Area under Rabi (10 ha) = 20 ha.' },
            { text: 'Current Cropping Intensity = (GCA / NSA) × 100 = (20/10) × 100 = 200%.' },
            { text: 'With Zaid on 4 ha, additional area = 4 ha. New GCA = 20 + 4 = 24 ha.' },
            { text: 'New Cropping Intensity = (24/10) × 100 = 240%.', faded: true, blankAnswer: 'Current intensity = 200%. New intensity after adding Zaid.' }
            ] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_004', title: 'Major Crops: Rice, Wheat, Maize and Millets (Conditions and Distribution)',
          caseStudy: { intro: 'Begin with a real-world observation: ask the student to recall the last meal they ate — chances are it contained rice or wheat (roti).',
            decisions: [{ prompt: 'Name the two main cropping seasons in India and state which season rice and wheat are primarily grown in.', options: [
                { text: 'The two main cropping seasons are Kharif (monsoon season, June–October) and Rabi (winter', outcome: 'The two main cropping seasons are Kharif (monsoon season, June–October) and Rabi (winter season.' },
                { text: 'dry, barren lands', outcome: 'Not quite — Students often believe millets are grown only in "dry, barren lands" and therefore assume they need.', reveals: 'millets-are-grown-only-in' },
                { text: 'drought-tolerant', outcome: 'Not quite — Students often believe millets are grown only in "dry, barren lands" and therefore assume they need.', reveals: 'millets-are-grown-only-in' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_005', title: 'Major Crops: Pulses, Sugarcane, Oilseeds, Tea and Coffee',
          caseStudy: { intro: 'Imagine you\'re traveling from the fertile plains of Uttar Pradesh where sugarcane towers over fields, to the rolling hills of Assam where tea bushes carpet the.',
            decisions: [{ prompt: 'Name the two main cropping seasons in which pulses are grown in India, and give one example of a pulse crop for each season.', options: [
                { text: 'Pulses are grown in both Kharif (e.g., arhar/tur, urad, moong) and Rabi (e.g.,', outcome: 'Pulses are grown in both Kharif (e.g., arhar/tur, urad, moong) and Rabi (e.g., gram/chana, masoor.' },
                { text: 'only Kharif', outcome: 'Not quite — Students believe **all oilseeds are Kharif crops** because groundnut (the most cited example).', reveals: 'all-oilseeds-are-kharif-crops' },
                { text: '**all oilseeds are Kharif crops**', outcome: 'Not quite — Students believe **all oilseeds are Kharif crops** because groundnut (the most cited example).', reveals: 'all-oilseeds-are-kharif-crops' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_006', title: 'Major Crops: Rubber, Cotton and Jute (Conditions and Distribution)',
          caseStudy: { intro: 'Imagine you are travelling from Kerala’s misty hills (where rubber trees bleed latex into coconut shells) to Gujarat’s black cotton soil plains (where white.',
            decisions: [{ prompt: 'Name the type of soil most suitable for cotton cultivation in India and state the ideal temperature range for its growth.', options: [
                { text: '**Correct answer:** Black soil (regur soil) is most suitable for cotton', outcome: '**Correct answer:** Black soil (regur soil) is most suitable for cotton.' },
                { text: 'alluvial soil', outcome: 'Not quite — **Students think cotton is only a Kharif crop everywhere in India.** **Reality:** In **North India.', reveals: 'students-think-cotton-is-only' },
                { text: 'laterite soil', outcome: 'Not quite — **Students think cotton is only a Kharif crop everywhere in India.** **Reality:** In **North India.', reveals: 'students-think-cotton-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'Chemical fertilisers and pesticides tripled India\'s harvest — and are now linked to soil decline and farmer debt. A farmer choosing organic feeds fewer people but farms sustainably.',
            decisions: [{ prompt: 'Can a farmer afford to farm the \'right\' way?', options: [
                { text: 'Go organic — soil is the real capital', outcome: 'Right for the long term; the farmer eating this year faces yields that drop before they recover.' },
                { text: 'Keep chemicals — yields first, fix soil later', outcome: 'The survival argument; \'later\' has been postponed for fifty years and the soil keeps score.' },
                { text: 'Transition with support — don\'t ask farmers to pay for the change alone', outcome: 'The policy answer — subsidies for the transition period; the question is whether policy arrives before the soil runs out.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teenager reads two headlines on the same day: \'Country records highest-ever foodgrain harvest\' and \'Farmers in several districts protest rising debt.\' She asks her family how both can be true at once.',
            decisions: [{ prompt: 'What explains record production alongside farmer distress?', options: [
                { text: 'Output and income are different things — a record harvest can still leave farmers behind if input costs (seed, fertiliser, diesel, borewell water) rise faster than crop prices, if small holdings keep earnings thin, or if water-intensive cropping quietly eats the groundwater that future farming depends on. Indian agriculture can be a victim of its own success.', outcome: 'The chapter\'s point exactly: production statistics measure grain, not the grower\'s prosperity — distress and bumper harvests can genuinely coexist.' },
                { text: 'They cannot both be true — a record harvest means every farmer earned more, so the protests must be exaggerated.', outcome: 'Higher national output says nothing about per-farmer income; most farmers work tiny plots, and costs can outrun prices even in a bumper year.', reveals: 'output-equals-income' },
                { text: 'The protests must be about something else entirely — agriculture that produces record food cannot have problems.', outcome: 'Rising debt, groundwater depletion and volatile prices are precisely the problems that record production can mask rather than solve.', reveals: 'record-harvest-no-problems' }
            ] }] } },
        { type: 'case', nodeId: 'c10_geo_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Two in five Indians work the land to feed all of us. Agriculture\'s share of GDP fell — its responsibility never did.',
            decisions: [{ prompt: 'What comes next? Agriculture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Agriculture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_001', difficulty: 'standard',
          question: 'Agriculture in the Indian economy refers to the primary sector activity that.',
          hint: 'If stuck, revisit c7_geo_ch04_001 (Agriculture in India: Importance and Characteristics).',
          misconception: 'Students believe "agriculture is unimportant because its GDP share is only 18%".',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage of India\'s workforce engaged in agriculture according to the latest Periodic Labour Force Survey (2022-23), and the sector\'s.', answer: 'Correct answer: Workforce engagement ~43% (PLFS 2022-23)',
                  options: ['Correct answer: Workforce engagement ~43% (PLFS 2022-23)', '60% workforce, 30% GDP', 'agriculture is unimportant', '"agriculture is unimportant'],
                  hint: 'If stuck, revisit c7_geo_ch04_001 (Agriculture in India: Importance and Characteristics) and.',
                  misconception: 'Students believe "agriculture is unimportant because its GDP share is only 18%".' },
                { id: 'b', prompt: 'Explain why agriculture\'s share in India\'s GDP has declined from over 50% at Independence to around 18% today, even though total foodgrain production has.', answer: 'Correct answer: The decline is a *relative* share effect',
                  options: ['Correct answer: The decline is a *relative* share effect', 'production has fallen', 'farmers are leaving agriculture so output drops', 'agriculture is unimportant'],
                  hint: 'If stuck, revisit c7_geo_ch04_001 (Agriculture in India: Importance and Characteristics) and.',
                  misconception: 'Students believe "agriculture is unimportant because its GDP share is only 18%".' },
                { id: 'c', prompt: 'Given that India exported agricultural products worth ₹3.12 lakh crore in 2023-24 (approx.', answer: 'Step 1: Agricultural exports = ₹3.12 lakh crore = 11% of total exports',
                  options: ['Step 1: Agricultural exports = ₹3.12 lakh crore = 11% of total exports', 'agriculture is unimportant', '"agriculture is unimportant'],
                  hint: 'If stuck, revisit c7_geo_ch04_001 (Agriculture in India: Importance and Characteristics) and.',
                  misconception: 'Students believe "agriculture is unimportant because its GDP share is only 18%".' }
          ],
            remediations: { 'agriculture-is-unimportant-because-its': { steps: ['Show the student a 2-column table: Column A = "GDP Share (18%)", Column B = "Workforce (43%), Food Security (100%.', 'Ask: "If agriculture collapsed tomorrow, which column would cause immediate national crisis?"', 'Map each item in Column B to a prior node: workforce → c6_geography_ch04_021 (subsistence farming), food security →.', 'Have them rewrite the definition using "backbone" as *multidimensional dependence*, not *GDP percentage*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "agriculture is unimportant because its GDP share is only 18%".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Food security in India is achieved solely because agriculture produces enough foodgrains." Provide two arguments against this view.', answer: 'Correct evaluation: The statement is *false*',
                  options: ['Correct evaluation: The statement is *false*', 'agriculture is unimportant', '"agriculture is unimportant'],
                  hint: 'If stuck, revisit c7_geo_ch04_001 (Agriculture in India: Importance and Characteristics) and.',
                  misconception: 'Students believe "agriculture is unimportant because its GDP share is only 18%".' }
          ],
            remediations: { 'agriculture-is-unimportant-because-its': { steps: ['Show the student a 2-column table: Column A = "GDP Share (18%)", Column B = "Workforce (43%), Food Security (100%.', 'Ask: "If agriculture collapsed tomorrow, which column would cause immediate national crisis?"', 'Map each item in Column B to a prior node: workforce → c6_geography_ch04_021 (subsistence farming), food security →.', 'Have them rewrite the definition using "backbone" as *multidimensional dependence*, not *GDP percentage*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_002', difficulty: 'standard',
          question: 'Primitive subsistence farming is a traditional self-sufficient agricultural.',
          hint: 'If stuck, revisit c6_geography_ch04_021 (Types of Farming: Subsistence vs Commercial) and.',
          misconception: 'Students often think "intensive subsistence farming" means using modern machinery and chemical inputs intensively like.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab owns 50 hectares of irrigated land, uses tractors, combine harvesters, HYV wheat seeds, chemical fertilisers, and sells the entire produce.', answer: 'Correct answer: Commercial farming',
                  options: ['Correct answer: Commercial farming', 'intensive subsistence', 'primitive subsistence', 'intensive subsistence farming'],
                  hint: 'If stuck, revisit c6_geography_ch04_021 (Types of Farming: Subsistence vs Commercial) and.',
                  misconception: 'Students often think "intensive subsistence farming" means using modern machinery and chemical inputs intensively like commercial farming.' }
          ],
            remediations: { 'intensive-subsistence-farming-means-using': { steps: ['Draw a three-column table on paper with headers: Primitive Subsistence, Intensive Subsistence, Commercial.', 'For each column, fill in these rows using your textbook: Landholding size, Labour source, Capital/technology, Market.', 'Colour-code: green for primitive (forest/hills), yellow for intensive (plains), red for commercial (well-connected.', 'On an outline map of India, shade three patches: Northeast hills (primitive), Gangetic plains/coastal Kerala.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_003', difficulty: 'standard',
          question: 'Cropping pattern refers to the yearly sequence and spatial arrangement of crops.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 4 (Climate) node c9_geo_ch2_7 "Indian.',
          misconception: 'Students think Zaid is just "summer crops" and confuse it with Kharif because both occur in hot months.',
          parts: [
                { id: 'a', prompt: 'A farmer in central Maharashtra has irrigation facilities. He wants to grow a crop during March to June.', answer: 'Suitable Zaid crop: Watermelon / Muskmelon / Cucumber / Fodder maize',
                  options: ['Suitable Zaid crop: Watermelon / Muskmelon / Cucumber / Fodder maize', 'summer crops', 'Zaid is just "summer crops" and confuse it with Kharif'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 4 (Climate) node c9_geo_ch2_7 "Indian Monsoon: Onset.',
                  misconception: 'Students think Zaid is just "summer crops" and confuse it with Kharif because both occur in hot months.' }
          ],
            remediations: { 'zaid-is-just-summer-crops': { steps: ['Draw a 12-month timeline on paper. Mark monsoon onset (June) and withdrawal (Oct).', 'Shade Kharif (Jun-Oct), Rabi (Nov-Apr), and identify the gap (Mar-Jun) as Zaid.', 'List temperature curve: peak heat in May.', 'Match crops to each shaded zone using thermal requirement: heat-tolerant short-duration crops only in Zaid.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_004', difficulty: 'standard',
          question: 'Major crops (Rice, Wheat, Maize, Millets) are staple food grains whose.',
          hint: 'If stuck, revisit c6_geography_ch03_018 (Climate and Agriculture) and c10_geo_cbse_04_003.',
          misconception: 'Students often believe millets are grown only in "dry, barren lands" and therefore assume they need no water at all.',
          parts: [
                { id: 'a', prompt: 'A farmer in central Maharashtra (Deccan Plateau) wants to grow a cereal crop that can withstand dry conditions, high temperatures, and poor soils.', answer: 'Millets (specifically Bajra or Jowar) are most suitable',
                  options: ['Millets (specifically Bajra or Jowar) are most suitable', 'dry, barren lands', 'drought-tolerant', 'zero water need'],
                  hint: 'If stuck, revisit c6_geography_ch03_018 (Climate and Agriculture) and c10_geo_cbse_04_003 (Cropping.',
                  misconception: 'Students often believe millets are grown only in "dry, barren lands" and therefore assume they need no water at all.' }
          ],
            remediations: { 'millets-are-grown-only-in': { steps: ['Show the student the India rainfall map (Class 9 Monsoon node) and the millet distribution map side-by-side.', 'Highlight that major millet belts (Karnataka plateau, Maharashtra interior, Tamil Nadu hills) receive 60–100 cm — not.', 'Explain "drought-tolerant" means surviving dry spells within a season, not growing without rain.', 'Have the student re-draw the millet distribution on a blank outline map using the corrected rainfall threshold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_005', difficulty: 'standard',
          question: 'Major commercial and food crops including pulses (protein-rich legumes grown.',
          hint: 'Review c10_geo_cbse_04_003 (Cropping Patterns) and c6_geography_ch03_018 (Climate and.',
          misconception: 'Students believe **all oilseeds are Kharif crops** because groundnut (the most cited example) is Kharif.',
          parts: [
                { id: 'a', prompt: 'Name the two main cropping seasons in which pulses are grown in India, and give one example of a pulse crop for each season.', answer: 'Pulses are grown in both Kharif (e.g., arhar/tur, urad, moong) and Rabi (e.g.,',
                  options: ['Pulses are grown in both Kharif (e.g., arhar/tur, urad, moong) and Rabi (e.g.,', 'only Kharif', '**all oilseeds are Kharif crops**'],
                  hint: 'Review c10_geo_cbse_04_003 (Cropping Patterns) and c6_geography_ch03_018 (Climate and Agriculture).',
                  misconception: 'Students believe **all oilseeds are Kharif crops** because groundnut (the most cited example) is Kharif.' }
          ],
            remediations: { 'all-oilseeds-are-kharif-crops': { steps: ['Draw a two-column table — left column: crop name; right column: season (Kharif/Rabi/Both).', 'On an outline map of India, mark three distinct symbols for tea (▲), coffee (●), and oilseeds (■) in their actual.', 'For each symbol, write the *one* unique condition that separates it from the others (e.g., coffee: "shade + laterite.', 'Practice two board-style questions: "Which oilseed is Rabi?" and "Why no coffee in Assam?" — answer using the unique.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_geo_cbse_04_006', difficulty: 'standard',
          question: 'This node covers the specific geographical conditions (temperature, rainfall.',
          hint: 'If stuck, revisit **c10_geo_cbse_04_003 (Cropping Patterns)** for season logic and.',
          misconception: '**Students think cotton is only a Kharif crop everywhere in India.** **Reality:** In **North India (Punjab, Haryana.',
          parts: [
                { id: 'a', prompt: 'Name the type of soil most suitable for cotton cultivation in India and state the ideal temperature range for its growth.', answer: '**Correct answer:** Black soil (regur soil) is most suitable for cotton',
                  options: ['**Correct answer:** Black soil (regur soil) is most suitable for cotton', 'alluvial soil', 'laterite soil', 'cotton is only a Kharif crop everywhere in India'],
                  hint: 'If stuck, revisit **c10_geo_cbse_04_003 (Cropping Patterns)** for season logic and.',
                  misconception: '**Students think cotton is only a Kharif crop everywhere in India.** **Reality:** In **North India (Punjab, Haryana, Rajasthan)**, cotton.' },
                { id: 'b', prompt: 'A farmer in Tamil Nadu wants to grow rubber. Using the data below, decide if the location is suitable. Give two reasons.', answer: '**Step 1:** Check temperature',
                  options: ['**Step 1:** Check temperature', 'suitable because temperature and soil match', 'cotton is only a Kharif crop everywhere in India'],
                  hint: 'If stuck, revisit **c10_geo_cbse_04_003 (Cropping Patterns)** for season logic and.',
                  misconception: '**Students think cotton is only a Kharif crop everywhere in India.** **Reality:** In **North India (Punjab, Haryana, Rajasthan)**, cotton.' }
          ],
            remediations: { 'students-think-cotton-is-only': { steps: ['** Open India\'s cropping season map (NCERT Fig 4.6 or similar). Trace cotton sowing/harvesting months state-wise. **', '** Overlay temperature/rainfall graphs for: (a) Punjab (b) Maharashtra (c) Tamil Nadu.', '** Write a 3-row table: State | Sowing Month | Harvest Month | Season Label (Kharif/Rabi). **', '** Memorise the **exception**: "Cotton is a Kharif crop in most of India, but a Rabi crop in Tamil Nadu due.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
