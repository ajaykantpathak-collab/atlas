import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch06_p1: SimDef = {
    id: 'v3_c6_math_ch06_p1',
    title: 'Ratio and Proportion · Part 1/2',
    subtitle: 'This node covers the definition of ratios, representation (colon, fraction, words), and.',
    classLevel: 6, subject: 'mathematics', topic: 'Ratio and Proportion · Part 1/2',
    chapters: ['c6_math_ch06'],
    nodeIds: ['c6_math_ch06_062', 'c6_math_ch06_063', 'c6_math_ch06_064', 'c6_math_ch06_065', 'c6_math_ch06_066', 'c6_math_ch06_067'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are making lemonade and you need to mix 2 cups of sugar for every 6 cups of water.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'One recipe card says mix 2 cups of sugar for every 6 cups of water. Another says 1 to 3. Your cousin insists the second drink is weaker. Are they right?',
        options: ['No — 2:6 simplifies to 1:3, so both drinks have exactly the same sweetness', 'Yes — smaller numbers always mean a weaker mix', 'Yes — the second recipe forgot half the sugar', 'No — the first drink is actually weaker'],
        answer: 'No — 2:6 simplifies to 1:3, so both drinks have exactly the same sweetness',
        hook: 'A ratio is a relationship, not a shopping list — it simplifies like a fraction. But order matters (2 sugar to 6 water is not 6 to 2), and the units must match before you compare.',
    },
    teaching: [
        { title: 'Introduction to Ratio', text: 'A ratio is a way to compare two quantities of the same kind by showing how many times one quantity contains the other, usually written as a fraction or with a colon.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch06_062', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Rescue a recipe mix-up — rewrite 2:6 in simplest form, then catch the error when someone compares 2 metres of ribbon to 50 centimetres of lace as 2:50.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch06_063', title: 'Equivalent Ratios and Proportion',
          scaffold: { problem: 'A shopkeeper sells 5 pencils for ₹10. If a student buys 15 pencils, how much should they pay if the ratio of pencils to price remains.',
            steps: [
            { text: 'Identify given ratio: 5 pencils : ₹10.' },
            { text: 'Set up proportion: 5/10 = 15/x, where x is the cost for 15 pencils.' },
            { text: 'Apply cross-product rule: $5 \\times x = 10 \\times 15$.' },
            { text: 'Compute: $5x = 150$, so $x = 150 / 5$.' },
            { text: 'Result: x = 30.', faded: true, blankAnswer: '₹30' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch06_064', title: 'Unitary Method',
          scaffold: { problem: 'If 7 kg of potatoes cost 140 rupees, what is the cost of 12 kg of potatoes?',
            steps: [
            { text: 'Identify given (7 kg = 140 rupees) and target (12 kg = ?).' },
            { text: 'Find cost of 1 kg (unit value) by dividing total cost by quantity.' },
            { text: '140 ÷ 7 = 20 rupees per kg.' },
            { text: 'Multiply unit value by target quantity (20 × 12).' },
            { text: 'Result is 240 rupees.', faded: true, blankAnswer: '240 rupees.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch06_065', title: 'Direct Proportion',
          scaffold: { problem: 'A recipe for 4 people requires 200g of flour. How much flour is needed for 10 people?',
            steps: [
            { text: 'Identify given (4 people = 200g) and target (10 people = ?g).' },
            { text: 'Set up proportion: 4/200 = 10/x.' },
            { text: 'Simplify the first ratio: 4/200 = 1/50.' },
            { text: 'Solve 1/50 = 10/x, so x = 10 * 50 = 500g.' },
            { text: 'Verify: 500/10 = 50, which matches 200/4 = 50.', faded: true, blankAnswer: '500g' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch06_066', title: 'Inverse Proportion',
          scaffold: { problem: 'A contractor hires 6 laborers to build a wall in 10 days. If he wants to finish the wall in 5 days, how many laborers does he need?',
            steps: [
            { text: 'Identify given values: 6 laborers, 10 days.' },
            { text: 'Calculate total work: $6 \\times 10 = 60$ laborer-days.' },
            { text: 'Set up the equation with the new time: $x \\times 5 = 60$.' },
            { text: 'Solve for $x$: $x = 60 / 5 = 12$.' },
            { text: 'Interpretation: He needs 12 laborers to finish in 5 days.', faded: true, blankAnswer: '12 laborers.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch06_067', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch06_062', title: 'Use it in the wild',
          caseStudy: { intro: 'A juice recipe mixes 500 ml of water with 200 ml of concentrate. Making a bigger batch, a cousin pours 1.5 litres of water but says \'a big batch needs a different ratio, so I\'ll just add a whole extra bottle of concentrate.\'',
            decisions: [{ prompt: 'Will the bigger batch taste the same?', options: [
                { text: 'Only if the ratio is preserved — 500:200 simplifies to 5:2, and 1500:600 simplifies to the same 5:2, so the larger pitcher needs 600 ml of concentrate, not a random \'extra bottle.\' Taste lives in the proportion: multiply both parts by the same number and the flavour survives; change one part alone and it does not.', outcome: 'Equal ratios are what \'the same taste\' means mathematically — scaling both quantities by three keeps the drink identical, just more of it.' },
                { text: 'The cousin is right — a bigger batch needs a new, stronger ratio to taste the same.', outcome: 'Same taste means same ratio — adding extra concentrate without matching the water makes the batch stronger, not identical.', reveals: 'bigger-needs-stronger' },
                { text: 'Any amount of concentrate works since it is just flavouring — the water quantity decides the taste.', outcome: 'The ratio of the two parts IS the taste — too little concentrate makes it watery, too much makes it overpowering.', reveals: 'ratio-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch06_067', title: 'The bigger picture',
          caseStudy: { intro: 'Two different-looking ratios can hide the same relationship. Simplify first, match the units, and the truth pours out.',
            decisions: [{ prompt: 'What comes next? Ratio and Proportion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Ratio and Proportion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch06_062', difficulty: 'standard',
          question: 'A ratio is a way to compare two quantities of the same kind by showing how many.',
          hint: 'Review the "simplifying fractions" section in your fraction chapter.',
          misconception: 'Students often forget to convert units before writing a ratio, or they treat a ratio like a set of independent numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A ratio is a way to compare two quantities of the same kind by showing how many times one',
                  options: ['A ratio is a way to compare two quantities of the same kind by showing how many times one', 'Equivalent ratios are two or more ratios that represent the same relative value, like', 'The unitary method is a problem-solving technique where you first find the value of a', 'Two quantities are in direct proportion if they change in the same direction—when one'],
                  hint: 'Review the "simplifying fractions" section in your fraction chapter.',
                  misconception: 'Students often forget to convert units before writing a ratio, or they treat a ratio like a set of independent numbers.' }
          ],
            remediations: { 'students-often-forget-to-convert': { steps: ['First, ask the student to identify the units of both items.', 'If they are different, explain that you cannot compare "apples to oranges" or "meters to centimeters" directly.', 'Have them convert the larger unit into the smaller unit first, then write the ratio and simplify it by finding common.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_063', difficulty: 'standard',
          question: 'Equivalent ratios are two or more ratios that represent the same relative.',
          hint: 'Review the concept of Equivalent Fractions.',
          misconception: 'Students often try to add the same number to both parts of a ratio to find an equivalent ratio (e.g., changing 2:3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equivalent ratios are two or more ratios that represent the same relative value, like',
                  options: ['Equivalent ratios are two or more ratios that represent the same relative value, like', 'A ratio is a way to compare two quantities of the same kind by showing how many times one', 'The unitary method is a problem-solving technique where you first find the value of a', 'Two quantities are in direct proportion if they change in the same direction—when one'],
                  hint: 'Review the concept of Equivalent Fractions.',
                  misconception: 'Students often try to add the same number to both parts of a ratio to find an equivalent ratio (e.g., changing 2:3 to 3:4).' }
          ],
            remediations: { 'students-often-try-to-add': { steps: ['Explain that a ratio represents a "multiplicative" relationship, not an "additive" one.', 'Show them that 2/3 is not 3/4 by checking the cross-products: $2 \\times 4 = 8$ but $3 \\times 3 = 9$.', 'Remind them that they must use a multiplication table to find equivalent values.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_064', difficulty: 'standard',
          question: 'The unitary method is a problem-solving technique where you first find the.',
          hint: 'Review basic division facts (multiplication tables).',
          misconception: 'Students often confuse which number to divide by which. For example, if 4 pens cost 20 rupees, they might calculate 4.',
          parts: [
                { id: 'a', prompt: 'If 4 pens cost 20 rupees, what is the first step you take to find the cost of 9 pens?', answer: 'The first step is to calculate the cost of 1 pen by dividing 20 by 4',
                  options: ['The first step is to calculate the cost of 1 pen by dividing 20 by 4', 'adding 4 and 9'],
                  hint: 'Review basic division facts (multiplication tables).',
                  misconception: 'Students often confuse which number to divide by which. For example, if 4 pens cost 20 rupees, they might calculate 4 ÷ 20 = 0.2 instead.' }
          ],
            remediations: { 'students-often-confuse-which-number': { steps: ['Ask the student to label the units: "20 rupees" and "4 pens." Ask: "If you want the price of one pen, should you divide.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_065', difficulty: 'standard',
          question: 'Two quantities are in direct proportion if they change in the same.',
          hint: 'Review "Chapter 6: Ratio" specifically the section on equivalent ratios.',
          misconception: 'Students often try to use addition instead of multiplication. For example, if 2 pens cost 10 rupees, they might think 4.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Two quantities are in direct proportion if they change in the same direction—when one',
                  options: ['Two quantities are in direct proportion if they change in the same direction—when one', 'A ratio is a way to compare two quantities of the same kind by showing how many times one', 'Equivalent ratios are two or more ratios that represent the same relative value, like', 'The unitary method is a problem-solving technique where you first find the value of a'],
                  hint: 'Review "Chapter 6: Ratio" specifically the section on equivalent ratios.',
                  misconception: 'Students often try to use addition instead of multiplication. For example, if 2 pens cost 10 rupees, they might think 4 pens cost 12 rupees.' }
          ],
            remediations: { 'students-often-try-to-use': { steps: ['If a student adds instead of multiplying, ask them: "If 2 pens cost 10 rupees, and you want to buy 0 pens, would you.', 'Then, show that 4 pens is just 2 sets of "2 pens," so you must pay 2 sets of "10 rupees."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_066', difficulty: 'standard',
          question: 'Inverse proportion is a relationship between two quantities where an increase.',
          hint: 'Review the multiplication of two numbers to find a product.',
          misconception: 'Students often try to use the "cross-multiplication" method from direct proportion ($a/b = c/d$) for inverse problems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Inverse proportion is a relationship between two quantities where an increase in one',
                  options: ['Inverse proportion is a relationship between two quantities where an increase in one', 'A ratio is a way to compare two quantities of the same kind by showing how many times one', 'Equivalent ratios are two or more ratios that represent the same relative value, like', 'The unitary method is a problem-solving technique where you first find the value of a'],
                  hint: 'Review the multiplication of two numbers to find a product.',
                  misconception: 'Students often try to use the "cross-multiplication" method from direct proportion ($a/b = c/d$) for inverse problems.' }
          ],
            remediations: { 'students-often-try-to-use': { steps: ['Ask the student to calculate the "Total Work" first.', 'Tell them: "If 2 workers work for 4 days, how many \'worker-days\' of effort are needed?" Once they calculate 8, ask: "If.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch06_067', difficulty: 'standard',
          question: 'A part-to-part ratio compares two specific groups or quantities within a whole.',
          hint: 'Review basic addition and the concept of "grouping" items.',
          misconception: 'Students often mistake part-to-part for part-to-whole by using the second part of the ratio as the denominator.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A part-to-part ratio compares two specific groups or quantities within a whole, while a',
                  options: ['A part-to-part ratio compares two specific groups or quantities within a whole, while a', 'A ratio is a way to compare two quantities of the same kind by showing how many times one', 'Equivalent ratios are two or more ratios that represent the same relative value, like', 'The unitary method is a problem-solving technique where you first find the value of a'],
                  hint: 'Review basic addition and the concept of "grouping" items.',
                  misconception: 'Students often mistake part-to-part for part-to-whole by using the second part of the ratio as the denominator.' }
          ],
            remediations: { 'students-often-mistake-part-to': { steps: ['If a student makes this error, have them physically draw the items or list them out.', 'Ask them, "Is the total number of items just the oranges, or is it the apples AND the oranges combined?" Once they.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
