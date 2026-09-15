import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch05_p1: SimDef = {
    id: 'v3_c12_geo_ch05_p1',
    title: 'Primary Activities · Part 1/2',
    subtitle: 'Farm, forest, mine and sea — the economy\'s first gear',
    classLevel: 12, subject: 'geography', topic: 'Primary Activities · Part 1/2',
    chapters: ['c12_geo_ch05'],
    nodeIds: ['c12_geo_cbse_05_001', 'c12_geo_cbse_05_002', 'c12_geo_cbse_05_003', 'c12_geo_cbse_05_004', 'c12_geo_cbse_05_005', 'c12_geo_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Economic geographer', intro: 'Everything on your breakfast plate began as someone\'s direct negotiation with nature. Follow it back to the source.', goal: 'Classify primary activities across farm, forest, mine and sea, and read how physical and human factors shape each.' },
    discovery: {
        question: 'Honey gathered in the Sundarbans, oil drilled at Bombay High, sheep grazing in Ladakh, cotton woven on a Tamil Nadu loom — which one is NOT a primary activity?',
        options: ['The weaving — transforming raw material into cloth is secondary; primary means taking directly from farm, forest, mine or sea', 'The oil drilling — machines disqualify it', 'The sheep — herding is a service', 'The honey — too small-scale'],
        answer: 'The weaving — transforming raw material into cloth is secondary; primary means taking directly from farm, forest, mine or sea',
        hook: '\'Primary\' ≠ \'agriculture\' — it\'s four resource bases: farm, forest, mine, sea. Machines don\'t disqualify an activity; production order does. And ~45% of India\'s workforce still lives in this sector, so \'declining GDP share\' isn\'t \'declining significance\'.',
    },
    teaching: [
        { title: 'Primary Activities: Definition and Characteristics', text: 'Primary activities are economic activities that involve the direct extraction, harvesting, or collection of natural resources from the Earth\'s surface, subsurface, or oceans without significant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read landscapes like a geographer: match Punjab\'s green rectangles, Bastar\'s ash-clearings, Rajasthan\'s radial tracks and Uttarakhand\'s terraces to their activities — physical template versus human rewrite.',
        labels: ['Primary Activities: Definition', 'Hunting and Gathering: Primitive', 'Pastoralism: Nomadic Herding', 'Subsistence Agriculture: Shifting Cultivation', 'Subsistence Agriculture: Sedentary Farming', 'Plantation Agriculture: Characteristics'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_001', title: 'Primary Activities: Definition and Characteristics',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to list everything they consumed for breakfast — tea (plantation agriculture), wheat toast (commercial grain.',
            decisions: [{ prompt: 'Which of the following is NOT a primary activity: (a) collecting honey from wild beehives in the Sundarbans, (b) weaving cotton cloth on.', options: [
                { text: 'Correct answer: (b) weaving cotton cloth on a handloom', outcome: 'Correct answer: (b) weaving cotton cloth on a handloom. This is a secondary activity because.' },
                { text: 'working with natural materials', outcome: 'Not quite — Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing.', reveals: 'primary-activities-only-agriculture-and' },
                { text: 'extracting natural materials', outcome: 'Not quite — Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing.', reveals: 'primary-activities-only-agriculture-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_002', title: 'Hunting and Gathering: Primitive Forms of Primary Activity',
          caseStudy: { intro: 'Imagine watching a documentary clip of the San people in the Kalahari Desert digging for tubers and tracking antelope with bows — notice how every movement.',
            decisions: [{ prompt: 'Name any two regions in the world where hunting and gathering is still practiced today.', options: [
                { text: 'Correct answer: Arctic region (Inuit), Kalahari Desert (San Bushmen), Amazon/Congo basins', outcome: 'Correct answer: Arctic region (Inuit), Kalahari Desert (San Bushmen), Amazon/Congo basins (Pygmies.' },
                { text: 'Punjab plains', outcome: 'Not quite — Students often think hunting and gathering is synonymous with “primitive” in a derogatory sense and.', reveals: 'hunting-and-gathering-is-synonymous' },
                { text: 'Gangetic valley', outcome: 'Not quite — Students often think hunting and gathering is synonymous with “primitive” in a derogatory sense and.', reveals: 'hunting-and-gathering-is-synonymous' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_003', title: 'Pastoralism: Nomadic Herding and Commercial Livestock Rearing',
          caseStudy: { intro: 'Begin with a real-world observation: In the Himalayan foothills, you see Gujjar families moving with buffalo herds between summer and winter pastures, while.',
            decisions: [{ prompt: 'Define nomadic herding and state two regions where it is traditionally practiced.', options: [
                { text: 'Nomadic herding is a subsistence pastoral system where herders move cyclically with their', outcome: 'Nomadic herding is a subsistence pastoral system where herders move cyclically with their livestock.' },
                { text: 'wandering aimlessly', outcome: 'Not quite — Students often think nomadic herding is "wandering aimlessly" rather than a highly structured.', reveals: 'nomadic-herding-is-wandering-aimlessly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_004', title: 'Subsistence Agriculture: Shifting Cultivation (Slash and Burn)',
          caseStudy: { intro: 'Begin by asking students to observe a forested hill slope in Northeast India (e.g., Nagaland) where patches of cleared land appear at different stages.',
            decisions: [{ prompt: 'What is the local name for shifting cultivation in the northeastern states of India?', options: [
                { text: 'The local name is "jhum" or "jhum cultivation"', outcome: 'The local name is "jhum" or "jhum cultivation". A wrong answer (e.g., "podu", "bewar", "kumri").' },
                { text: 'shifting cultivation is inherently destructive and primitive', outcome: 'Not quite — Students often think shifting cultivation is inherently destructive and primitive.', reveals: 'shifting-cultivation-is-inherently-destructive' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_05_005', title: 'Subsistence Agriculture: Sedentary Farming',
          scaffold: { problem: 'A village in the Krishna-Godavari delta has a net sown area of 800 hectares.',
            steps: [
            { text: 'Identify net sown area (NSA) = 800 ha (given).' },
            { text: 'Compute gross cropped area (GCA) by summing area under each crop season: kharif rice 750 + rabi rice 700 + summer.' },
            { text: 'Apply formula: Cropping Intensity = (GCA / NSA) × 100 = (1650 / 800) × 100 = 206.25%.' },
            { text: 'Interpret: Intensity > 200% means most land is cropped twice and some thrice — hallmark of intensive subsistence.' },
            { text: 'Verify: Check that GCA > NSA (yes) and that the crops are food staples (rice, pulses) consistent with subsistence.', faded: true, blankAnswer: 'Cropping intensity = 206.25%. This indicates highly.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_006', title: 'Plantation Agriculture: Characteristics and Distribution',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to examine a tea packet or coffee jar — note the estate name (e.g., "Makaibari Tea Estate, Darjeeling") and.',
            decisions: [{ prompt: 'Name the four major plantation crops of India and the primary state associated with each.', options: [
                { text: 'Tea — Assam/West Bengal (Darjeeling)', outcome: 'Tea — Assam/West Bengal (Darjeeling); Coffee — Karnataka (Kodagu); Rubber — Kerala; Sugarcane.' },
                { text: 'Tea — Kerala', outcome: 'Not quite — Students equate "plantation agriculture" with "any large farm" — e.g., calling a 500-ha wheat farm.', reveals: 'students-equate-plantation-agriculture-with' },
                { text: 'Coffee — Assam', outcome: 'Not quite — Students equate "plantation agriculture" with "any large farm" — e.g., calling a 500-ha wheat farm.', reveals: 'students-equate-plantation-agriculture-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A resource company scouting a dry savanna reports the land is \'virtually empty — under one person per sq km — and unproductive,\' so acquiring it for a project should be simple. You know scattered forager camps use the area seasonally.',
            decisions: [{ prompt: 'How does the geography of hunting and gathering change the assessment?', options: [
                { text: 'Low density is carrying capacity, not emptiness — wild resources are dispersed and unpredictable, so a small forager group legitimately needs a vast range; \'unproductive\' land is the group\'s entire food system, as with the San in the Kalahari.', outcome: 'The chapter explains why such activity survives only in marginal environments and why densities stay under one per sq km: the land is fully used, just at an extensive intensity that maps and headcounts miss.' },
                { text: 'Agree — with under a person per sq km, the camps are a rounding error and relocation is trivial.', outcome: 'That misreads the density: the small number is the *result* of needing huge area per person; displacing the group means taking away an enormous foraging territory, not a tiny plot.', reveals: 'low-density-equals-unused' },
                { text: 'The camps are pastoralists moving herds, so buying grazing rights covers their use anyway.', outcome: 'Foragers aren\'t pastoralists — they depend on wild game and plants, not domesticated herds; the distinction matters because fencing \'grazing land\' still removes the wild tubers and game they actually live on.', reveals: 'forager-equals-pastoralist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now classify any livelihood by its order of production — and read a satellite image\'s geometry as an economy.',
            decisions: [{ prompt: 'What comes next? Primary Activities · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Primary Activities · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_001', difficulty: 'standard',
          question: 'Primary activities are economic activities that involve the direct extraction.',
          hint: 'If stuck, revisit Class 10 "Types of Farming" (c10_geo_cbse_04_002) and Class 11 "Land.',
          misconception: 'Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing, forestry, hunting.',
          parts: [
                { id: 'a', prompt: 'Which of the following is NOT a primary activity: (a) collecting honey from wild beehives in the Sundarbans, (b) weaving cotton cloth on a handloom in Tamil.', answer: 'Correct answer: (b) weaving cotton cloth on a handloom',
                  options: ['Correct answer: (b) weaving cotton cloth on a handloom', 'working with natural materials', 'extracting natural materials', 'primary activities = only agriculture'],
                  hint: 'If stuck, revisit Class 10 "Types of Farming" (c10_geo_cbse_04_002) and Class 11 "Land Use.',
                  misconception: 'Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing, forestry, hunting, gathering.' },
                { id: 'b', prompt: 'A satellite image shows a landscape with: (i) geometric rectangular fields of uniform green in Punjab, (ii) irregular forest clearings with ash-enriched soil.', answer: '(i) Punjab rectangles → extensive commercial grain farming (wheat/rice)',
                  options: ['(i) Punjab rectangles → extensive commercial grain farming (wheat/rice)', 'primary activities = only agriculture'],
                  hint: 'If stuck, revisit Class 10 "Types of Farming" (c10_geo_cbse_04_002) and Class 11 "Land Use.',
                  misconception: 'Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing, forestry, hunting, gathering.' },
                { id: 'c', prompt: 'Compare the resource base and economic logic of two primary activities: (a) deep-shaft coal mining in Jharkhand\'s Dhanbad region, and (b) plantation tea.', answer: 'Both are primary',
                  options: ['Both are primary', 'mining isn\'t primary', 'primary activities = only agriculture'],
                  hint: 'If stuck, revisit Class 10 "Types of Farming" (c10_geo_cbse_04_002) and Class 11 "Land Use.',
                  misconception: 'Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing, forestry, hunting, gathering.' }
          ],
            remediations: { 'primary-activities-only-agriculture-and': { steps: ['Revisit the NCERT Class 12 Chapter 4 opening paragraphs — highlight the four resource bases (farm, forest, mine, sea).', 'Use the diagnostic question 1 as a flashcard drill — create 10 local examples (e.g., "collecting tendu leaves.', 'Draw a concept map with "Primary Activities" at center, four branches (agriculture, forestry, mining, fishing), and two.', 'Re-attempt diagnostic question 1 and 4; if still confused, watch the 10-minute NCERT explainer video "Primary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing, forestry, hunting.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Primary activities are declining in economic importance globally, so Class 12 geography should spend less time on them." Use evidence.', answer: 'The statement is flawed for three reasons',
                  options: ['The statement is flawed for three reasons', 'share in GDP', 'geographical significance', 'primary activities = only agriculture'],
                  hint: 'If stuck, revisit Class 10 "Types of Farming" (c10_geo_cbse_04_002) and Class 11 "Land Use.',
                  misconception: 'Students believe "primary activities = only agriculture" and forget mining, quarrying, fishing, forestry, hunting, gathering.' }
          ],
            remediations: { 'primary-activities-only-agriculture-and': { steps: ['Revisit the NCERT Class 12 Chapter 4 opening paragraphs — highlight the four resource bases (farm, forest, mine, sea).', 'Use the diagnostic question 1 as a flashcard drill — create 10 local examples (e.g., "collecting tendu leaves.', 'Draw a concept map with "Primary Activities" at center, four branches (agriculture, forestry, mining, fishing), and two.', 'Re-attempt diagnostic question 1 and 4; if still confused, watch the 10-minute NCERT explainer video "Primary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_002', difficulty: 'standard',
          question: 'Hunting and gathering is the most primitive primary activity where humans.',
          hint: 'If stuck, revisit the concept of “environmental carrying capacity” from Class 11.',
          misconception: 'Students often think hunting and gathering is synonymous with “primitive” in a derogatory sense and assume it exists.',
          parts: [
                { id: 'a', prompt: 'Why do hunting and gathering societies typically have very low population densities (often less than 1 person per sq km)?', answer: 'Correct answer: Because wild resources are dispersed and unpredictable',
                  options: ['Correct answer: Because wild resources are dispersed and unpredictable', 'they choose to have few children', 'primitive', 'it exists only in tropical rainforests'],
                  hint: 'If stuck, revisit the concept of “environmental carrying capacity” from Class 11.',
                  misconception: 'Students often think hunting and gathering is synonymous with “primitive” in a derogatory sense and assume it exists only in tropical.' },
                { id: 'b', prompt: 'A map shows three marked areas: (A) Siberian tundra, (B) Indo-Gangetic plain, (C) Central Australian desert.', answer: 'Correct answer: (A) Siberian tundra and (C) Central Australian desert',
                  options: ['Correct answer: (A) Siberian tundra and (C) Central Australian desert', 'primitive', 'it exists only in tropical rainforests'],
                  hint: 'If stuck, revisit the concept of “environmental carrying capacity” from Class 11.',
                  misconception: 'Students often think hunting and gathering is synonymous with “primitive” in a derogatory sense and assume it exists only in tropical.' }
          ],
            remediations: { 'hunting-and-gathering-is-synonymous': { steps: ['If a student holds this misconception: (1) Show a world map with three distinct hunter-gatherer groups marked (Inuit.', '(2) Have them complete a comparison table: “Domesticated animals?', 'Mobility driver?” for hunter-gatherers vs.', '(3) Re-attempt Diagnostic Question 3 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_003', difficulty: 'standard',
          question: 'Pastoralism is a primary economic activity centered on raising livestock.',
          hint: 'If stuck, revisit Class 6 "Types of Farming: Subsistence vs Commercial".',
          misconception: 'Students often think nomadic herding is "wandering aimlessly" rather than a highly structured, knowledge-intensive.',
          parts: [
                { id: 'a', prompt: 'A pastoral community in Rajasthan moves its 500 sheep between summer pastures in the Aravalli hills (elevation 1,200 m) and winter pastures in the Thar Desert.', answer: 'Elevation difference = 1,000 m',
                  options: ['Elevation difference = 1,000 m', 'wandering aimlessly', 'ignores the lapse rate or misapplies it (e'],
                  hint: 'If stuck, revisit Class 6 "Types of Farming: Subsistence vs Commercial" (c6_geography_ch04_021) and.',
                  misconception: 'Students often think nomadic herding is "wandering aimlessly" rather than a highly structured, knowledge-intensive system with fixed.' }
          ],
            remediations: { 'nomadic-herding-is-wandering-aimlessly': { steps: ['If the student holds the "aimless wandering" misconception, have them trace a documented transhumance route (e.g.', 'Then compare with a ranching map of the Pampas (c11_geo_cbse_09_005) to contrast mobility vs.', 'Re-diagnostic: ask them to explain why the Gaddis cannot simply settle in one valley.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_004', difficulty: 'standard',
          question: 'Shifting cultivation, also known as slash-and-burn agriculture, is.',
          hint: 'Review Class 6 "Types of Farming: Subsistence vs Commercial" (c6_geography_ch04_021) and.',
          misconception: 'Students often think shifting cultivation is inherently destructive and primitive.',
          parts: [
                { id: 'a', prompt: 'What is the local name for shifting cultivation in the northeastern states of India?', answer: 'The local name is "jhum" or "jhum cultivation"',
                  options: ['The local name is "jhum" or "jhum cultivation"', 'shifting cultivation is inherently destructive and primitive'],
                  hint: 'Review Class 6 "Types of Farming: Subsistence vs Commercial" (c6_geography_ch04_021) and Class 11.',
                  misconception: 'Students often think shifting cultivation is inherently destructive and primitive.' },
                { id: 'b', prompt: 'Why do shifting cultivators abandon a field after 2-3 years of cultivation?', answer: 'Soil fertility declines rapidly',
                  options: ['Soil fertility declines rapidly', 'because of weed infestation', 'because they own new land', 'shifting cultivation is inherently destructive and primitive'],
                  hint: 'Review Class 6 "Types of Farming: Subsistence vs Commercial" (c6_geography_ch04_021) and Class 11.',
                  misconception: 'Students often think shifting cultivation is inherently destructive and primitive.' }
          ],
            remediations: { 'shifting-cultivation-is-inherently-destructive': { steps: ['If the student holds this misconception, have them: 1) Study the nutrient cycle diagram in tropical rainforest soils.', '2) Compare jhum fallow periods in 1950 vs 2020 using census data.', '3) Read a case study of the "Nagaland Empowerment of People through Economic Development (NEPED)" project that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_005', difficulty: 'standard',
          question: 'Subsistence agriculture: sedentary farming is a primary activity where farmers.',
          hint: 'If unsure, review Class 10 node c10_geo_cbse_04_002 (Types of Farming) and Class 11 node.',
          misconception: 'Students often equate "intensive subsistence farming" with "intensive commercial farming" (e.g., greenhouse.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subsistence agriculture: sedentary farming is a primary activity where farmers',
                  options: ['Subsistence agriculture: sedentary farming is a primary activity where farmers', 'Primary activities are economic activities that involve the direct extraction,', 'Hunting and gathering is the most primitive primary activity where humans obtain food by', 'Pastoralism is a primary economic activity centered on raising livestock on natural'],
                  hint: 'If unsure, review Class 10 node c10_geo_cbse_04_002 (Types of Farming) and Class 11 node.',
                  misconception: 'Students often equate "intensive subsistence farming" with "intensive commercial farming" (e.g., greenhouse horticulture or poultry.' }
          ],
            remediations: { 'students-often-equate-intensive-subsistence': { steps: ['Revisit node c12_geo_cbse_05_004 (Shifting Cultivation) and create a two-column table contrasting shifting vs.', 'Open the NCERT India: People and Economy Chapter 5 map "Major Areas of Subsistence Agriculture" and trace the boundary.', 'Solve a mini-case: "A family in Bihar has 0.8 ha, grows rice and wheat, uses a diesel pump.', 'Re-attempt Diagnostic Questions 2 and 3; if still incorrect, watch the 10-min video "Intensive Subsistence Farming.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_05_006', difficulty: 'standard',
          question: 'Plantation agriculture is a capital-intensive, export-oriented commercial.',
          hint: 'If confused between plantation and commercial sugarcane, revisit c10_geo_cbse_04_005.',
          misconception: 'Students equate "plantation agriculture" with "any large farm" — e.g., calling a 500-ha wheat farm in Punjab or.',
          parts: [
                { id: 'a', prompt: 'Name the four major plantation crops of India and the primary state associated with each.', answer: 'Tea — Assam/West Bengal (Darjeeling)',
                  options: ['Tea — Assam/West Bengal (Darjeeling)', 'Tea — Kerala', 'Coffee — Assam', 'distinguish plantation from commercial grain farming'],
                  hint: 'If confused between plantation and commercial sugarcane, revisit c10_geo_cbse_04_005 (sugarcane.',
                  misconception: 'Students equate "plantation agriculture" with "any large farm" — e.g., calling a 500-ha wheat farm in Punjab or a sugarcane cooperative.' },
                { id: 'b', prompt: 'Why are plantations absent in the Indo-Gangetic Plain despite its fertile alluvial soil and high population density?', answer: 'Plantations require perennial crops needing frost-free, high-rainfall (>200 cm),',
                  options: ['Plantations require perennial crops needing frost-free, high-rainfall (>200 cm),', 'lack of labour', 'poor soil fertility', 'distinguish plantation from commercial grain farming'],
                  hint: 'If confused between plantation and commercial sugarcane, revisit c10_geo_cbse_04_005 (sugarcane.',
                  misconception: 'Students equate "plantation agriculture" with "any large farm" — e.g., calling a 500-ha wheat farm in Punjab or a sugarcane cooperative.' },
                { id: 'c', prompt: 'A company plans a new rubber plantation. They have two sites: Site A — 500 m elevation, 250 cm annual rainfall, lateritic soil, 24°C mean temperature, 15°.', answer: 'Site A is suitable',
                  options: ['Site A is suitable', 'distinguish plantation from commercial grain farming'],
                  hint: 'If confused between plantation and commercial sugarcane, revisit c10_geo_cbse_04_005 (sugarcane.',
                  misconception: 'Students equate "plantation agriculture" with "any large farm" — e.g., calling a 500-ha wheat farm in Punjab or a sugarcane cooperative.' }
          ],
            remediations: { 'students-equate-plantation-agriculture-with': { steps: ['Revisit c12_geo_cbse_05_001 (Primary Activities definition) to recall the commercial vs. subsistence divide.', 'Use a table to contrast plantation (tea/coffee/rubber) vs. commercial grain (wheat/corn) vs.', 'On an India map, shade only the Western Ghats, Assam hills, and Andamans — label "Plantation Zone."', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, review Class 10 cash crops node c10_geo_cbse_04_005 for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
