import type { SimDef } from '../../engine/types';

/** v3 generated — c6_biology_ch01 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_biology_ch01: SimDef = {
    id: 'v3_c6_biology_ch01',
    title: 'Mindful Eating — Food Components',
    subtitle: 'This node covers the sources of food — plant and animal origins — and the.',
    classLevel: 6, subject: 'biology', topic: 'Mindful Eating — Food Components',
    chapters: ['c6_biology_ch01'],
    nodeIds: ['c6_biology_ch01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Take any meal you ate today — rice, dal, a glass of milk, maybe an egg.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Name the two ultimate sources of all food on Earth.',
        options: ['Plants and animals', 'the shop', 'the kitchen'],
        answer: 'Plants and animals',
        hook: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every.',
    },
    teaching: [
        { title: 'Where does food come from?', text: 'Food is any substance that a living organism consumes to obtain energy for life processes, raw materials for growth and repair, and protection against diseases.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_biology_ch01_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c6_biology_ch01_001', title: 'Where does food come from?',
          caseStudy: { intro: 'Take any meal you ate today — rice, dal, a glass of milk, maybe an egg. Now play detective and trace each item back to where it really began.',
            decisions: [{ prompt: 'Name the two ultimate sources of all food on Earth.', options: [
                { text: 'Plants and animals', outcome: 'Plants and animals. All food items trace back either to a plant source or to an animal source — and.' },
                { text: 'the shop', outcome: 'Not quite — Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and.', reveals: 'food-comes-from-the-shop' },
                { text: 'the kitchen', outcome: 'Not quite — Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and.', reveals: 'food-comes-from-the-shop' }
            ] }] } },
        { type: 'case', nodeId: 'c6_biology_ch01_001', title: 'You made it',
          caseStudy: { intro: 'You finished Mindful Eating — Food Components — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch01_001', difficulty: 'standard',
          question: 'Food is any substance that a living organism consumes to obtain energy for life.',
          hint: 'If stuck, revisit "living vs non-living" — the idea that all living things need energy.',
          misconception: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every.',
          parts: [
                { id: 'a', prompt: 'Name the two ultimate sources of all food on Earth.', answer: 'Plants and animals',
                  options: ['Plants and animals', 'the shop', 'the kitchen', 'from the shop'],
                  hint: 'If stuck, revisit "living vs non-living" — the idea that all living things need energy.',
                  misconception: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every ingredient in a packet.' },
                { id: 'b', prompt: 'Why are plants called producers?', answer: 'Plants are called producers',
                  options: ['Plants are called producers', 'because they give us vegetables', 'from the shop', 'from the kitchen'],
                  hint: 'If stuck, revisit "living vs non-living" — the idea that all living things need energy.',
                  misconception: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every ingredient in a packet.' }
          ],
            remediations: { 'food-comes-from-the-shop': { steps: ['Ask the student: "What did you eat yesterday?" and pick one item, like a glass of milk.', 'Trace it backwards together: milk → cow → grass → sunlight.', 'Repeat with a second item until the student sees the plant-or-animal pattern on their own.', 'Then ask them to trace one food entirely alone to confirm the idea has landed.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c6_biology_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every.',
          parts: [
                { id: 'a', prompt: 'Is honey a plant product or an animal product? Explain.', answer: 'Honey is an animal product',
                  options: ['Honey is an animal product', 'plant product', 'animal product', 'from the shop'],
                  hint: 'If stuck, revisit "living vs non-living" — the idea that all living things need energy.',
                  misconception: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every ingredient in a packet.' },
                { id: 'b', prompt: 'What would happen to animals if all green plants disappeared?', answer: 'All animals would eventually die',
                  options: ['All animals would eventually die', 'animals would eat other food', 'from the shop', 'from the kitchen'],
                  hint: 'If stuck, revisit "living vs non-living" — the idea that all living things need energy.',
                  misconception: 'Students often believe that food comes "from the shop" or "from the kitchen." Shops only store and sell food — every ingredient in a packet.' }
          ],
            remediations: { 'food-comes-from-the-shop': { steps: ['Ask the student: "What did you eat yesterday?" and pick one item, like a glass of milk.', 'Trace it backwards together: milk → cow → grass → sunlight.', 'Repeat with a second item until the student sees the plant-or-animal pattern on their own.', 'Then ask them to trace one food entirely alone to confirm the idea has landed.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
