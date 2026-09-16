import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch06_p2: SimDef = {
    id: 'v3_c6_math_ch06_p2',
    title: 'Ratio and Proportion · Part 2/2',
    subtitle: 'This node covers basic ratio representation and simple proportion problems using.',
    classLevel: 6, subject: 'mathematics', topic: 'Ratio and Proportion · Part 2/2',
    chapters: ['c6_math_ch06'],
    nodeIds: ['c6_math_ch06_068', 'c6_math_ch06_062'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'If your mother uses 2 cups of sugar for a cake that serves 4 people, how much sugar do you need for 8 people?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'One recipe card says mix 2 cups of sugar for every 6 cups of water. Another says 1 to 3. Your cousin insists the second drink is weaker. Are they right?',
        options: ['No — 2:6 simplifies to 1:3, so both drinks have exactly the same sweetness', 'Yes — smaller numbers always mean a weaker mix', 'Yes — the second recipe forgot half the sugar', 'No — the first drink is actually weaker'],
        answer: 'No — 2:6 simplifies to 1:3, so both drinks have exactly the same sweetness',
        hook: 'A ratio is a relationship, not a shopping list — it simplifies like a fraction. But order matters (2 sugar to 6 water is not 6 to 2), and the units must match before you compare.',
    },
    teaching: [
        { title: 'Problem Solving with Ratio and Proportion', text: 'Ratio is a mathematical way of comparing two quantities of the same kind by division, showing how many times one quantity contains the other.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch06_068', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Rescue a recipe mix-up — rewrite 2:6 in simplest form, then catch the error when someone compares 2 metres of ribbon to 50 centimetres of lace as 2:50.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch06_068', title: 'Problem Solving with Ratio and Proportion',
          scaffold: { problem: 'A recipe for 6 people requires 300 grams of rice. How many grams of rice are needed for 15 people?',
            steps: [
            { text: 'Identify given ratio (300g : 6 people).' },
            { text: 'Find the amount per person (300 ÷ 6 = 50g per person).' },
            { text: 'Multiply the amount per person by the new number of people (50g × 15).' },
            { text: 'Compute the total (750g).' },
            { text: 'Interpret: 15 people need 750 grams of rice.', faded: true, blankAnswer: '750 grams' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch06_069', title: 'Real-Life Applications of Ratio and Proportion',
          scaffold: { problem: 'A local bakery makes a special batter using 3 cups of flour for every 2 cups of milk.',
            steps: [
            { text: 'Identify the ratio: 3 parts flour to 2 parts milk.' },
            { text: 'Determine the multiplier: 12 (new flour) ÷ 3 (original flour) = 4.' },
            { text: 'Apply the multiplier to the milk: 2 (original milk) × 4 = 8.' },
            { text: 'Verify: 12:8 simplifies by dividing by 4 to get 3:2, which matches the original.', faded: true, blankAnswer: '8 cups of milk.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch06_069', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch06_068', title: 'Use it in the wild',
          caseStudy: { intro: 'A juice recipe mixes 500 ml of water with 200 ml of concentrate. Making a bigger batch, a cousin pours 1.5 litres of water but says \'a big batch needs a different ratio, so I\'ll just add a whole extra bottle of concentrate.\'',
            decisions: [{ prompt: 'Will the bigger batch taste the same?', options: [
                { text: 'Only if the ratio is preserved — 500:200 simplifies to 5:2, and 1500:600 simplifies to the same 5:2, so the larger pitcher needs 600 ml of concentrate, not a random \'extra bottle.\' Taste lives in the proportion: multiply both parts by the same number and the flavour survives; change one part alone and it does not.', outcome: 'Equal ratios are what \'the same taste\' means mathematically — scaling both quantities by three keeps the drink identical, just more of it.' },
                { text: 'The cousin is right — a bigger batch needs a new, stronger ratio to taste the same.', outcome: 'Same taste means same ratio — adding extra concentrate without matching the water makes the batch stronger, not identical.', reveals: 'bigger-needs-stronger' },
                { text: 'Any amount of concentrate works since it is just flavouring — the water quantity decides the taste.', outcome: 'The ratio of the two parts IS the taste — too little concentrate makes it watery, too much makes it overpowering.', reveals: 'ratio-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch06_069', title: 'You made it',
          caseStudy: { intro: 'Two different-looking ratios can hide the same relationship. Simplify first, match the units, and the truth pours out.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch06_068', difficulty: 'standard',
          question: 'Ratio is a mathematical way of comparing two quantities of the same kind.',
          hint: 'Review simplifying fractions by dividing by the Highest Common Factor.',
          misconception: 'Students often try to solve proportion problems by adding the same number to both sides of a ratio instead.',
          parts: [
                { id: 'a', prompt: 'If 5 notebooks cost 100 rupees, how much will 8 notebooks cost?', answer: 'Each notebook costs 20 rupees, so 8 notebooks cost 160 rupees',
                  options: ['Each notebook costs 20 rupees, so 8 notebooks cost 160 rupees', 'unit rate'],
                  hint: 'Review simplifying fractions by dividing by the Highest Common Factor.',
                  misconception: 'Students often try to solve proportion problems by adding the same number to both sides of a ratio instead of multiplying/dividing.' }
          ],
            remediations: { 'students-often-try-to-solve': { steps: ['Ask the student to draw the ratio as groups of items.', 'For 2:3, draw two circles and three squares.', 'If they need to reach 4 circles, ask them how many groups of the "original" ratio they now have.', 'Seeing that the entire "set" is doubled helps them realize they must also double the squares to reach six.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_068', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often try to solve proportion problems by adding the same number to both sides of a ratio instead.',
          parts: [
                { id: 'a', prompt: 'Can you have a ratio between 5 apples and 3 kilograms of rice? Why or why not?', answer: 'No, because ratios compare quantities of the same kind',
                  options: ['No, because ratios compare quantities of the same kind', 'weight'],
                  hint: 'Review simplifying fractions by dividing by the Highest Common Factor.',
                  misconception: 'Students often try to solve proportion problems by adding the same number to both sides of a ratio instead of multiplying/dividing.' }
          ],
            remediations: { 'students-often-try-to-solve': { steps: ['Ask the student to draw the ratio as groups of items.', 'For 2:3, draw two circles and three squares.', 'If they need to reach 4 circles, ask them how many groups of the "original" ratio they now have.', 'Seeing that the entire "set" is doubled helps them realize they must also double the squares to reach six.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_069', difficulty: 'standard',
          question: 'Ratio is a mathematical way to compare two quantities of the same kind.',
          hint: 'Review simplifying fractions (e.g., how 4/8 becomes 1/2).',
          misconception: 'Students often use addition instead of multiplication when solving proportions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ratio is a mathematical way to compare two quantities of the same kind by division,',
                  options: ['Ratio is a mathematical way to compare two quantities of the same kind by division,', 'A ratio is a way to compare two quantities of the same kind by showing how many times one', 'Equivalent ratios are two or more ratios that represent the same relative value, like', 'The unitary method is a problem-solving technique where you first find the value of a'],
                  hint: 'Review simplifying fractions (e.g., how 4/8 becomes 1/2).',
                  misconception: 'Students often use addition instead of multiplication when solving proportions.' }
          ],
            remediations: { 'students-often-use-addition-instead': { steps: ['If the student adds, ask them to draw the ratio using blocks: "Show me 2 blocks of orange juice and 5 blocks of water.', 'Now, show me 6 blocks of orange juice.', 'How many groups of 2-blocks did you make?" This forces them to see that they have created 3 identical sets of the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
