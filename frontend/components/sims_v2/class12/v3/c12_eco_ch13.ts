import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch13 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch13: SimDef = {
    id: 'v3_c12_eco_ch13',
    title: 'Under British colonial rule, the Indian economy.',
    subtitle: 'This node covers the overall nature of the Indian economy under British rule, the core.',
    classLevel: 12, subject: 'economics', topic: 'Under British colonial rule, the Indian economy.',
    chapters: ['c12_eco_ch13'],
    nodeIds: ['c12_eco_cbse_13_001', 'c12_eco_cbse_13_002', 'c12_eco_cbse_13_003', 'c12_eco_cbse_13_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Before the British arrived, India had an independent economy where agriculture was the main source.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Under British colonial rule, the Indian.', text: 'Under British colonial rule, the Indian economy was characterized as a **colonial, backward, semi-feudal, and stagnant economy**, where the fundamental economic policies pursued by the colonial.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_13_001', title: 'Under British colonial rule, the Indian.',
          caseStudy: { intro: 'Before the British arrived, India had an independent economy where agriculture was the main source of livelihood, yet our manufacturing sector was globally.',
            decisions: [{ prompt: 'State the primary objective of the economic policies pursued by the colonial government in India.', options: [
                { text: '**Model Answer**: The primary objective of the colonial government\'s economic policies', outcome: '**Model Answer**: The primary objective of the colonial government\'s economic policies was.' },
                { text: 'to modernize India\'s infrastructure', outcome: 'Not quite — Believing that the British modern infrastructure projects (like railways, telegraphs, and ports).', reveals: 'believing-that-the-british-modern' },
                { text: 'to establish modern industries in India', outcome: 'Not quite — Believing that the British modern infrastructure projects (like railways, telegraphs, and ports).', reveals: 'believing-that-the-british-modern' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_13_002', title: '* **Agricultural Stagnation**: A state.',
          caseStudy: { intro: 'Before the British arrived, India\'s rural economy was self-sustaining, and its handloom textiles were celebrated globally for their exquisite quality.',
            decisions: [{ prompt: 'What was the primary objective of the "two-fold motive" of de-industrialisation pursued by the colonial government in India?', options: [
                { text: 'The primary objective of the two-fold motive was: 1', outcome: 'The primary objective of the two-fold motive was: 1. To reduce India to the status of a mere.' },
                { text: 'to sell British goods', outcome: 'Not quite — Believing that the "commercialisation of agriculture" was a positive, modernizing economic reform.', reveals: 'believing-that-the-commercialisation-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_13_003', title: 'Under British colonial rule.',
          caseStudy: { intro: 'Every time you board a train today, you are using a network whose foundations were laid in 1850.',
            decisions: [{ prompt: 'What was the primary objective behind the development of infrastructure (roads, railways, ports, etc.) by the colonial government in India?', options: [
                { text: 'The primary objective was not to provide basic amenities to the Indian public, but to', outcome: 'The primary objective was not to provide basic amenities to the Indian public, but to subserve.' },
                { text: 'to modernize the Indian economy', outcome: 'Not quite — The belief that the British built the railways as a benevolent "gift" to modernize India and.', reveals: 'the-belief-that-the-british' },
                { text: 'to help Indian traders', outcome: 'Not quite — The belief that the British built the railways as a benevolent "gift" to modernize India and.', reveals: 'the-belief-that-the-british' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_13_004', title: 'Deindustrialisation and the drain of.',
          caseStudy: { intro: '1. Picture the weaver of Bengal in 1800 — world-famous muslin, thriving handloom industry. 2.',
            decisions: [{ prompt: 'What was deindustrialisation in colonial India?', options: [
                { text: 'The collapse of traditional handicraft industries', outcome: 'The collapse of traditional handicraft industries — especially textiles — under machine-made.' },
                { text: 'colonial India was simply \'undeveloped\'', outcome: 'Not quite — Students think colonial India was simply \'undeveloped\' — as if industry had never existed.', reveals: 'colonial-india-was-simply-undeveloped' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_13_004', title: 'You made it',
          caseStudy: { intro: 'You finished Under British colonial rule, the Indian economy. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_13_001', difficulty: 'standard',
          question: 'Under British colonial rule, the Indian economy was characterized as.',
          hint: 'None',
          misconception: 'Believing that the British modern infrastructure projects (like railways, telegraphs, and ports) were introduced out.',
          parts: [
                { id: 'a', prompt: 'Consider the individual estimators of India\'s national income during the colonial period: Dadabhai Naoroji, William Digby, Findlay Shirras, V.K.R.V.', answer: '**Model Answer**: 1',
                  options: ['**Model Answer**: 1', 'most systematic/statistically significant'],
                  hint: 'None',
                  misconception: 'Believing that the British modern infrastructure projects (like railways, telegraphs, and ports) were introduced out of benevolence.' }
          ],
            remediations: { 'believing-that-the-british-modern': { steps: ['Remind the student that the British did not have a developmental mandate in India.', 'Have them write down the term "Feeder Economy" and trace how every policy—whether building railways to transport raw.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_13_002', difficulty: 'standard',
          question: '* **Agricultural Stagnation**: A state of negligible or zero growth in the.',
          hint: 'Explain that food crops are grown to feed the farmer\'s family directly, while cash crops.',
          misconception: 'Believing that the "commercialisation of agriculture" was a positive, modernizing economic reform that brought.',
          parts: [
                { id: 'a', prompt: 'What was the primary objective of the "two-fold motive" of de-industrialisation pursued by the colonial government in India?', answer: 'The primary objective of the two-fold motive was: 1',
                  options: ['The primary objective of the two-fold motive was: 1', 'to sell British goods'],
                  hint: 'Explain that food crops are grown to feed the farmer\'s family directly, while cash crops must.',
                  misconception: 'Believing that the "commercialisation of agriculture" was a positive, modernizing economic reform that brought prosperity and market.' },
                { id: 'b', prompt: 'Why did the commercialisation of agriculture under British rule fail to improve the economic condition of Indian farmers?', answer: 'The commercialisation of agriculture failed to benefit Indian farmers because: 1',
                  options: ['The commercialisation of agriculture failed to benefit Indian farmers because: 1', 'commercialisation made farmers rich but they wasted their money'],
                  hint: 'Explain that food crops are grown to feed the farmer\'s family directly, while cash crops must.',
                  misconception: 'Believing that the "commercialisation of agriculture" was a positive, modernizing economic reform that brought prosperity and market.' }
          ],
            remediations: { 'believing-that-the-commercialisation-of': { steps: ['Remind the student that commercialisation under colonial rule was **forced**, not voluntary.', 'Explain that farmers did not get to keep the profits of cash crops like indigo; instead, they were paid nominal wages.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_13_003', difficulty: 'standard',
          question: 'Under British colonial rule, infrastructure development refers to the.',
          hint: 'None',
          misconception: 'The belief that the British built the railways as a benevolent "gift" to modernize India and improve the lives of its.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Under British colonial rule, infrastructure development refers to the construction of',
                  options: ['Under British colonial rule, infrastructure development refers to the construction of', 'Under British colonial rule, the Indian economy was characterized as a **colonial,', '* **Agricultural Stagnation**: A state of negligible or zero growth in the agricultural', 'Deindustrialisation and the drain of wealth describe two colonial mechanisms: the'],
                  hint: 'None',
                  misconception: 'The belief that the British built the railways as a benevolent "gift" to modernize India and improve the lives of its citizens.' }
          ],
            remediations: { 'the-belief-that-the-british': { steps: ['Remind the student that every colonial infrastructure project had a strategic or economic motive benefiting Britain.', 'Have them list the specific colonial purpose behind roads (army mobilization/raw material extraction) and telegraphs.', 'Emphasize that any positive side effects (like long-distance travel) were purely incidental.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_13_004', difficulty: 'standard',
          question: 'Deindustrialisation and the drain of wealth describe two colonial mechanisms.',
          hint: 'Work step by step.',
          misconception: 'Students think colonial India was simply \'undeveloped\' — as if industry had never existed.',
          parts: [
                { id: 'a', prompt: 'What was deindustrialisation in colonial India?', answer: 'The collapse of traditional handicraft industries',
                  options: ['The collapse of traditional handicraft industries', 'colonial India was simply \'undeveloped\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think colonial India was simply \'undeveloped\' — as if industry had never existed.' },
                { id: 'b', prompt: 'Explain the \'drain of wealth\' in one sentence.', answer: 'India\'s economic surplus',
                  options: ['India\'s economic surplus', 'colonial India was simply \'undeveloped\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think colonial India was simply \'undeveloped\' — as if industry had never existed.' }
          ],
            remediations: { 'colonial-india-was-simply-undeveloped': { steps: ['Separate the two mechanisms first — deindustrialisation killed the industries; the drain exported the surplus.', 'Then connect: that\'s why agriculture had to absorb everyone and the economy stagnated.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think colonial India was simply \'undeveloped\' — as if industry had never existed.',
          parts: [
                { id: 'a', prompt: 'True or False: Colonial India\'s export surplus was reinvested in Indian industry.', answer: 'False — the surplus was drained to Britain',
                  options: ['False — the surplus was drained to Britain', 'colonial India was simply \'undeveloped\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think colonial India was simply \'undeveloped\' — as if industry had never existed.' }
          ],
            remediations: { 'colonial-india-was-simply-undeveloped': { steps: ['Separate the two mechanisms first — deindustrialisation killed the industries; the drain exported the surplus.', 'Then connect: that\'s why agriculture had to absorb everyone and the economy stagnated.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
