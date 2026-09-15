import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch18_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch18_p2: SimDef = {
    id: 'v3_c11_geo_ch18_p2',
    title: 'Land Resources and Agriculture · Part 2/2',
    subtitle: 'Tell resting land from abandoned land — and read nine categories of use as one ledger.',
    classLevel: 11, subject: 'geography', topic: 'Land Resources and Agriculture · Part 2/2',
    chapters: ['c11_geo_ch18'],
    nodeIds: ['c11_geo_cbse_18_007', 'c11_geo_cbse_18_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a land-use auditor reading a district\'s fields', intro: 'Your district\'s scrub became a housing colony in ten years — the nine-fold classification is how India keeps score of that swap.', goal: 'Distinguish land-use categories and evaluate the limits of expanding cultivation.' },
    discovery: {
        question: 'A brown, empty field after harvest looks like wasted land. Should every fallow be ploughed immediately?',
        options: ['No — current fallow is deliberate moisture-saving for the next crop; forcing it into use degrades rainfed soils', 'Yes — idle land produces nothing', 'Yes — food demand leaves no room for rest', 'No — because fallow land is legally forest'],
        answer: 'No — current fallow is deliberate moisture-saving for the next crop; forcing it into use degrades rainfed soils',
        hook: 'Fallow isn\'t the same as culturable waste either — one year of rest versus five-plus years abandoned are two different categories with different stories.',
    },
    teaching: [
        { title: 'Green Revolution and Its Impact on Indian Agriculture', text: 'The Green Revolution in India (mid-1960s onwards) refers to the technological transformation of agriculture through the introduction of High-Yielding Variety (HYV) seeds (primarily wheat and rice).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_18_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute cropping intensity and irrigated share for a state, then test whether 25 million hectares of \'fallow\' is really a food-security reserve.',
        labels: ['Green Revolution and Its', 'Agricultural Development: Technological'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_007', title: 'Green Revolution and Its Impact on Indian Agriculture',
          caseStudy: { intro: 'Begin with a real-world observation: show students a photograph of a Punjab wheat field in April — golden, uniform, heavily irrigated — and contrast it with.',
            decisions: [{ prompt: 'What were the three core technological components of the Green Revolution package introduced in India during the mid-1960s?', options: [
                { text: 'The three core components were: (1) High-Yielding Variety (HYV) seeds of wheat and rice', outcome: 'The three core components were: (1) High-Yielding Variety (HYV) seeds of wheat and rice (e.g.' },
                { text: 'better seeds', outcome: 'Not quite — Students often believe the Green Revolution was a uniform national success that "modernized" all.', reveals: 'the-green-revolution-was-a' },
                { text: 'tractors', outcome: 'Not quite — Students often believe the Green Revolution was a uniform national success that "modernized" all.', reveals: 'the-green-revolution-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_008', title: 'Agricultural Development: Technological and Institutional Reforms',
          caseStudy: { intro: 'Observe a farmer in your district using a smartphone to check mandi prices on e-NAM before selling wheat, while his neighbour still relies on the local.',
            decisions: [{ prompt: 'Define "institutional reform" in the context of Indian agricultural development and name three distinct institutional reforms implemented.', options: [
                { text: 'Institutional reforms are changes in rules, organizations, and governance structures that', outcome: 'Institutional reforms are changes in rules, organizations, and governance structures that alter.' },
                { text: 'drip irrigation', outcome: 'Not quite — Students believe **"technological reforms increase productivity, institutional reforms ensure.', reveals: 'technological-reforms-increase-productivity' },
                { text: 'technological reforms increase productivity, institutional reforms ensure equity', outcome: 'Not quite — Students believe **"technological reforms increase productivity, institutional reforms ensure.', reveals: 'technological-reforms-increase-productivity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a village development project, a volunteer proposes: \'That uncultivated field is wasted land — get it ploughed this season.\' A teammate\'s report also lumps \'fallow\' and \'culturable waste\' together as \'unused farmland.\'',
            decisions: [{ prompt: 'What do the land-use categories actually mean?', options: [
                { text: 'Distinguish them: current fallow is a deliberate rest — one agricultural year uncultivated to conserve moisture, standard practice in rainfed farming. Culturable waste is land idle 5+ years due to constraints like salinity or waterlogging. Forcing all fallow into continuous cropping without irrigation caused yield collapse in Vidarbha and Bundelkhand within years.', outcome: 'The project pivots: fallow is management, not waste — and falling culturable waste can mean healthy reclamation or harmful diversion, depending on where the land went.' },
                { text: 'Back the ploughing plan — idle farmland is wasted potential in a hungry country.', outcome: 'Fallow is how rainfed soil recovers moisture and organic matter; removing it without assured irrigation degrades the very soil you\'re trying to use.', reveals: 'fallow-is-wasted-land' },
                { text: 'Keep the merged category — fallow and culturable waste are both just unused fields.', outcome: 'The statistics distinguish them for a reason: one year of rest is strategy; five-plus idle years signals constraint — the trends mean opposite things.', reveals: 'fallow-equals-culturable-waste' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_18_008', title: 'You made it',
          caseStudy: { intro: 'Land is a zero-sum ledger — every hectare that becomes a colony or solar park was once fallow, grazing or sown.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_007', difficulty: 'standard',
          question: 'The Green Revolution in India (mid-1960s onwards) refers to the technological.',
          hint: 'If stuck, revisit c11_geo_cbse_18_005 (Major Crops: Rice, Wheat) to review the.',
          misconception: 'Students often believe the Green Revolution was a uniform national success that "modernized" all Indian agriculture.',
          parts: [
                { id: 'a', prompt: 'Why did the Green Revolution initially succeed spectacularly in Punjab, Haryana, and Western Uttar Pradesh but bypassed eastern India (e.g., Bihar, Eastern.', answer: 'The northwestern region had a unique combination of preconditions: (a) reliable',
                  options: ['The northwestern region had a unique combination of preconditions: (a) reliable', 'soil fertility', 'rainfall', 'modernized'],
                  hint: 'If stuck, revisit c11_geo_cbse_18_005 (Major Crops: Rice, Wheat) to review the geographical.',
                  misconception: 'Students often believe the Green Revolution was a uniform national success that "modernized" all Indian agriculture.' },
                { id: 'b', prompt: 'Using the data below, calculate the percentage increase in wheat yield for Punjab between 1960-61 and 1990-91, and explain why this increase was not replicated.', answer: '**Calculation:** Punjab: ((3800 - 1200) / 1200) × 100 = 216.7% increase',
                  options: ['**Calculation:** Punjab: ((3800 - 1200) / 1200) × 100 = 216.7% increase', 'modernized'],
                  hint: 'If stuck, revisit c11_geo_cbse_18_005 (Major Crops: Rice, Wheat) to review the geographical.',
                  misconception: 'Students often believe the Green Revolution was a uniform national success that "modernized" all Indian agriculture.' }
          ],
            remediations: { 'the-green-revolution-was-a': { steps: ['Have the student map the spread of HYV wheat and rice using district-level data (available in Agricultural Statistics.', 'Compare two district profiles — e.g., Ludhiana (Punjab) vs. Gaya (Bihar) — on irrigation %, fertilizer use, credit.', 'Ask: "If the technology was so good, why didn\'t farmers in Gaya adopt it?" Guide them to identify missing preconditions.', 'Show a time-series graph of groundwater depth in Punjab vs. Bihar — link extraction to energy subsidy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_008', difficulty: 'standard',
          question: 'Agricultural development in India refers to the systematic transformation.',
          hint: 'If stuck, revisit **c11_geo_cbse_18_007** focusing on the "institutional package".',
          misconception: 'Students believe **"technological reforms increase productivity, institutional reforms ensure equity"** as separate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Agricultural development in India refers to the systematic transformation of farming',
                  options: ['Agricultural development in India refers to the systematic transformation of farming', 'Land utilisation pattern in India refers to the classification of the total geographical', 'Land use categories in India refer to the systematic classification of the country\'s', 'Agriculture in the Indian economy refers to the primary sector activity encompassing crop'],
                  hint: 'If stuck, revisit **c11_geo_cbse_18_007** focusing on the "institutional package".',
                  misconception: 'Students believe **"technological reforms increase productivity, institutional reforms ensure equity"** as separate, sequential tracks.' }
          ],
            remediations: { 'technological-reforms-increase-productivity': { steps: ['** Map your state\'s **agricultural institutional landscape**—list active FPOs, KCC penetration (% of operational.', '** Interview **one smallholder** (≤2 ha) about their credit source, marketing channel, insurance experience, and land.', '** Plot findings on a **2x2 matrix**: Technology Adoption (High/Low) × Institutional Access (High/Low).', '** Re-read the **Doubling Farmers\' Income (DFI) Committee Report (2018) Volume III** on "Institutional Reforms"—focus.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_18_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"technological reforms increase productivity, institutional reforms ensure equity"** as separate.',
          parts: [
                { id: 'a', prompt: 'Design a **context-specific agricultural development package** for a tribal district in Odisha (predominantly rainfed, 80% smallholders, 60% forest land, low.', answer: '**Technological:** 1',
                  options: ['**Technological:** 1', 'technological reforms increase productivity, institutional reforms ensure equity'],
                  hint: 'If stuck, revisit **c11_geo_cbse_18_007** focusing on the "institutional package".',
                  misconception: 'Students believe **"technological reforms increase productivity, institutional reforms ensure equity"** as separate, sequential tracks.' }
          ],
            remediations: { 'technological-reforms-increase-productivity': { steps: ['** Map your state\'s **agricultural institutional landscape**—list active FPOs, KCC penetration (% of operational.', '** Interview **one smallholder** (≤2 ha) about their credit source, marketing channel, insurance experience, and land.', '** Plot findings on a **2x2 matrix**: Technology Adoption (High/Low) × Institutional Access (High/Low).', '** Re-read the **Doubling Farmers\' Income (DFI) Committee Report (2018) Volume III** on "Institutional Reforms"—focus.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
