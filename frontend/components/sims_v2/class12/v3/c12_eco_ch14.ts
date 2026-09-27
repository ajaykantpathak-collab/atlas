import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch14 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch14: SimDef = {
    id: 'v3_c12_eco_ch14',
    title: 'The **Goals of the Five-Year Plans** (also.',
    subtitle: '* **Includes**: The four core goals (Growth, Modernization, Self-reliance, Equity).',
    classLevel: 12, subject: 'economics', topic: 'The **Goals of the Five-Year Plans** (also.',
    chapters: ['c12_eco_ch14'],
    nodeIds: ['c12_eco_cbse_14_001', 'c12_eco_cbse_14_002', 'c12_eco_cbse_14_003', 'c12_eco_cbse_14_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'When India gained independence in 1947, its economy was stagnant, backward, and deeply unequal.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'The **Goals of the Five-Year Plans**.', text: 'The **Goals of the Five-Year Plans** (also known as the long-term goals of planning or **Perspective Plan** goals) are the four foundational objectives designed to guide India\'s economic development.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_14_002', title: '**Land Reforms** refer to institutional.',
          caseStudy: { intro: 'In 1950, over 70% of India\'s population depended on farming, yet agricultural productivity was extremely low due to colonial exploitation.',
            decisions: [{ prompt: 'What is meant by the term "marketable surplus" in the context of the Green Revolution?', options: [
                { text: '**Model Answer**: Marketable surplus refers to the portion of agricultural produce', outcome: '**Model Answer**: Marketable surplus refers to the portion of agricultural produce which is sold.' },
                { text: 'the total crop harvested by the farmer', outcome: 'Not quite — Believing that the Green Revolution immediately benefited all Indian farmers equally and solved all.', reveals: 'believing-that-the-green-revolution' },
                { text: 'the excess crop that rots in godowns', outcome: 'Not quite — Believing that the Green Revolution immediately benefited all Indian farmers equally and solved all.', reveals: 'believing-that-the-green-revolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_14_003', title: 'The **Industry and Trade Policy.',
          caseStudy: { intro: 'Suppose you want to open a small bakery in your neighborhood, but the government tells you exactly how many loaves of bread you are allowed to bake each day.',
            decisions: [{ prompt: 'Define \'Import Substitution\' as a trade policy instrument used in India between 1950 and 1990.', options: [
                { text: '**Model Answer:** Import substitution is an inward-looking trade strategy aimed at', outcome: '**Model Answer:** Import substitution is an inward-looking trade strategy aimed at replacing.' },
                { text: 'stopping all trade', outcome: 'Not quite — The belief that industrial licensing under IPR 1956 was only required when an entrepreneur wanted.', reveals: 'the-belief-that-industrial-licensing' },
                { text: 'export promotion', outcome: 'Not quite — The belief that industrial licensing under IPR 1956 was only required when an entrepreneur wanted.', reveals: 'the-belief-that-industrial-licensing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_14_004', title: 'You made it',
          caseStudy: { intro: 'You finished The **Goals of the Five-Year Plans** (also. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_14_001', difficulty: 'standard',
          question: 'The **Goals of the Five-Year Plans** (also known as the long-term goals.',
          hint: 'None',
          misconception: 'Believing that "Modernization" refers solely to purchasing modern machinery, computers, or advanced technology.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **Goals of the Five-Year Plans** (also known as the long-term goals of planning or',
                  options: ['The **Goals of the Five-Year Plans** (also known as the long-term goals of planning or', '**Land Reforms** refer to institutional changes aimed at changing the ownership of', 'The **Industry and Trade Policy (1950-1990)** refers to the state-directed economic', 'The major strategies of Indian planning (1950-1990) were: land reforms abolishing'],
                  hint: 'None',
                  misconception: 'Believing that "Modernization" refers solely to purchasing modern machinery, computers, or advanced technology.' }
          ],
            remediations: { 'believing-that-modernization-refers-solely': { steps: ['If the student struggles with this, remind them that NCERT explicitly defines Modernization as having two distinct.', 'Give them the example of a highly automated factory that refuses to hire women; explain that under Indian planning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_14_002', difficulty: 'standard',
          question: '**Land Reforms** refer to institutional changes aimed at changing the ownership.',
          hint: 'None',
          misconception: 'Believing that the Green Revolution immediately benefited all Indian farmers equally and solved all agricultural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Land Reforms** refer to institutional changes aimed at changing the ownership of',
                  options: ['**Land Reforms** refer to institutional changes aimed at changing the ownership of', 'The **Goals of the Five-Year Plans** (also known as the long-term goals of planning or', 'The **Industry and Trade Policy (1950-1990)** refers to the state-directed economic', 'The major strategies of Indian planning (1950-1990) were: land reforms abolishing'],
                  hint: 'None',
                  misconception: 'Believing that the Green Revolution immediately benefited all Indian farmers equally and solved all agricultural disparities.' }
          ],
            remediations: { 'believing-that-the-green-revolution': { steps: ['Remind the student that HYV seeds required expensive inputs like chemical fertilizers, pesticides, and reliable.', 'This created a high risk of widening the gap between rich and poor farmers, and made small farmers vulnerable to pest.', 'Explain that it was only through government intervention—providing low-interest loans and subsidized fertilizers—that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_14_003', difficulty: 'standard',
          question: 'The **Industry and Trade Policy (1950-1990)** refers to the state-directed.',
          hint: 'None',
          misconception: 'The belief that industrial licensing under IPR 1956 was only required when an entrepreneur wanted to set up a brand-new.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **Industry and Trade Policy (1950-1990)** refers to the state-directed economic',
                  options: ['The **Industry and Trade Policy (1950-1990)** refers to the state-directed economic', 'The **Goals of the Five-Year Plans** (also known as the long-term goals of planning or', '**Land Reforms** refer to institutional changes aimed at changing the ownership of', 'The major strategies of Indian planning (1950-1990) were: land reforms abolishing'],
                  hint: 'None',
                  misconception: 'The belief that industrial licensing under IPR 1956 was only required when an entrepreneur wanted to set up a brand-new factory or business.' }
          ],
            remediations: { 'the-belief-that-industrial-licensing': { steps: ['Remind the student that the government controlled all aspects of industrial capacity.', 'Under IPR 1956, a license was mandatory for: (1) starting a new industry, (2) expanding the production capacity of.', 'Emphasize that even if you already owned a successful factory, you could not produce a single unit above your licensed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'The belief that industrial licensing under IPR 1956 was only required when an entrepreneur wanted to set up a brand-new.',
          parts: [
                { id: 'a', prompt: 'Distinguish between \'Tariffs\' and \'Quotas\' as protective trade barriers. How did they help domestic industries?', answer: '**Model Answer:** * **Tariffs:** These are taxes imposed on imported goods',
                  options: ['**Model Answer:** * **Tariffs:** These are taxes imposed on imported goods', 'quantity limits'],
                  hint: 'None',
                  misconception: 'The belief that industrial licensing under IPR 1956 was only required when an entrepreneur wanted to set up a brand-new factory or business.' }
          ],
            remediations: { 'the-belief-that-industrial-licensing': { steps: ['Remind the student that the government controlled all aspects of industrial capacity.', 'Under IPR 1956, a license was mandatory for: (1) starting a new industry, (2) expanding the production capacity of.', 'Emphasize that even if you already owned a successful factory, you could not produce a single unit above your licensed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_14_004', difficulty: 'standard',
          question: 'The major strategies of Indian planning (1950-1990) were: land reforms.',
          hint: 'Work step by step.',
          misconception: 'Students memorise the three strategies as separate facts without seeing the trade-offs — Green Revolution = \'good\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The major strategies of Indian planning (1950-1990) were: land reforms abolishing',
                  options: ['The major strategies of Indian planning (1950-1990) were: land reforms abolishing', 'The **Goals of the Five-Year Plans** (also known as the long-term goals of planning or', '**Land Reforms** refer to institutional changes aimed at changing the ownership of', 'The **Industry and Trade Policy (1950-1990)** refers to the state-directed economic'],
                  hint: 'Recall the definition.',
                  misconception: 'Students memorise the three strategies as separate facts without seeing the trade-offs — Green Revolution = \'good\', import substitution.' }
          ],
            remediations: { 'students-memorise-the-three-strategies': { steps: ['Draw the ledger for each strategy: what it solved on the left, what it created on the right.', 'Food self-sufficiency vs regional inequality; self-reliance vs inefficiency.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
