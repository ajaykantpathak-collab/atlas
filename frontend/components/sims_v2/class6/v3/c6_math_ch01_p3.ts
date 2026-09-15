import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch01_p3: SimDef = {
    id: 'v3_c6_math_ch01_p3',
    title: 'Number System · Part 3/3',
    subtitle: 'Covers the definitions and identification of factors, multiples, and prime numbers.',
    classLevel: 6, subject: 'mathematics', topic: 'Number System · Part 3/3',
    chapters: ['c6_math_ch01'],
    nodeIds: ['c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you have 12 chocolate bars to share equally among friends.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A stadium holds thousands of cheering people and the organizer announces the crowd size minutes after the gates close. Nobody counted heads one by one — so how did they get a number?',
        options: ['They counted a small sample area, estimated the rest, and got a close-enough total fast', 'They made up a random big number', 'They weighed the stadium before and after', 'They asked every person to raise a hand at once'],
        answer: 'They counted a small sample area, estimated the rest, and got a close-enough total fast',
        hook: 'Estimation is not random guessing. It is a logical shortcut — when exact counting is slow or impossible, a smart about-value is enough to plan with.',
    },
    teaching: [
        { title: 'Factors and Multiples', text: 'A factor is a whole number that divides another number exactly, leaving no remainder. A multiple is the product obtained when you multiply a given whole number by any other whole number.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch01_013', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Face a crowd too big to count — pick a sample patch, scale it up, and defend your estimated total against someone demanding an exact count.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch01_014', title: 'Divisibility Rules',
          caseStudy: { intro: 'Imagine you have a basket of 150 mangoes and you need to share them equally among 3 friends.',
            decisions: [{ prompt: 'What is the rule to check if a number is divisible by 5?', options: [
                { text: 'A number is divisible by 5 if its last digit is either 0 or 5', outcome: 'A number is divisible by 5 if its last digit is either 0 or 5.' },
                { text: 'any even number is divisible by 5', outcome: 'Not quite — Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.', reveals: 'students-often-try-to-apply' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_015', title: 'Prime Factorisation, HCF and LCM',
          scaffold: { problem: 'A tailor has two pieces of fabric, one 24 metres and the other 36 metres long.',
            steps: [
            { text: 'Prime factorise 24: 24 = 2 × 12 = 2 × 2 × 6 = 2 × 2 × 2 × 3.' },
            { text: 'Prime factorise 36: 36 = 2 × 18 = 2 × 2 × 9 = 2 × 2 × 3 × 3.' },
            { text: 'Identify common prime factors: Both share two 2s and one 3.' },
            { text: 'Multiply common factors: 2 × 2 × 3 = 12.' },
            { text: 'The maximum strip length is 12 metres.', faded: true, blankAnswer: '12 metres.' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch01_015', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At the stationery shop, a student holds a ₹200 note and wants 4 pens at ₹15 each plus 2 notebooks at ₹30 each. The queue behind is growing and the shopkeeper is waiting.',
            decisions: [{ prompt: 'How can she quickly know whether ₹200 is enough?', options: [
                { text: 'Estimate — 4 pens cost about 4 × 15 = ₹60 and the notebooks about 2 × 30 = ₹60, so roughly ₹120, comfortably inside ₹200. Estimation is not guessing: it is a quick, close-enough calculation that answers the actual question — \'can I afford this\' — without needing the exact figure.', outcome: 'Mental rounding gives the answer in seconds, and ₹120 versus ₹200 leaves no doubt — the right tool for a decision that needs a fast approximate answer.' },
                { text: 'She cannot know until the shopkeeper computes the exact total — estimation is just guessing.', outcome: 'Estimation is structured arithmetic with rounded numbers, not a guess — 4 × 15 and 2 × 30 are already easy, and the rough total settles the question.', reveals: 'estimation-is-guessing' },
                { text: 'She should just hand over the ₹200 and trust the change will be roughly right.', outcome: 'Skipping the estimate means she cannot catch a billing error — the quick mental total is exactly what protects her change.', reveals: 'never-check-the-total' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch01_015', title: 'You made it',
          caseStudy: { intro: 'Numbers are tools, not just symbols — they tell you if you have enough money, enough time, and roughly how many people showed up.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch01_013', difficulty: 'standard',
          question: 'A factor is a whole number that divides another number exactly, leaving.',
          hint: 'Review basic division facts (e.g., 20 ÷ 4 = 5).',
          misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A factor is a whole number that divides another number exactly, leaving no remainder',
                  options: ['A factor is a whole number that divides another number exactly, leaving no remainder', 'Numbers in our everyday life are specific values used to represent quantity, order, or', 'Natural numbers are the counting numbers starting from 1 (1, 2, 3...), while whole', 'The face value of a digit is its own value regardless of its position, while the place'],
                  hint: 'Review basic division facts (e.g., 20 ÷ 4 = 5).',
                  misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.' }
          ],
            remediations: { 'students-often-confuse-factors-and': { steps: ['Ask the student to write the multiplication fact 2 × 6 = 12.', 'Label 2 and 6 as "Factors" and 12 as the "Multiple." Have them check divisibility: "Does 12 divide by 2?'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.',
          parts: [
                { id: 'a', prompt: 'If a number is prime, what can you say about its factors?', answer: 'A prime number has exactly two factors: 1 and the number itself',
                  options: ['A prime number has exactly two factors: 1 and the number itself', 'many factors'],
                  hint: 'Review basic division facts (e.g., 20 ÷ 4 = 5).',
                  misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.' }
          ],
            remediations: { 'students-often-confuse-factors-and': { steps: ['Ask the student to write the multiplication fact 2 × 6 = 12.', 'Label 2 and 6 as "Factors" and 12 as the "Multiple." Have them check divisibility: "Does 12 divide by 2?'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_014', difficulty: 'standard',
          question: 'Divisibility rules are simple patterns or shortcuts that allow you to check.',
          hint: 'Review the definitions of even numbers (0, 2, 4, 6, 8) and basic addition of single-digit.',
          misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.',
          parts: [
                { id: 'a', prompt: 'What is the rule to check if a number is divisible by 5?', answer: 'A number is divisible by 5 if its last digit is either 0 or 5',
                  options: ['A number is divisible by 5 if its last digit is either 0 or 5', 'any even number is divisible by 5'],
                  hint: 'Review the definitions of even numbers (0, 2, 4, 6, 8) and basic addition of single-digit numbers.',
                  misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.' },
                { id: 'b', prompt: 'Compare the rules for 2 and 5. What do they have in common?', answer: 'Both rules depend only on the last digit of the number',
                  options: ['Both rules depend only on the last digit of the number', 'last digit', 'sum of digits'],
                  hint: 'Review the definitions of even numbers (0, 2, 4, 6, 8) and basic addition of single-digit numbers.',
                  misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.' }
          ],
            remediations: { 'students-often-try-to-apply': { steps: ['If a student applies the wrong rule, ask them to list the first five multiples of 3.', 'Then, have them calculate the digit sums of those multiples (e.g., 12 -> 1+2=3, 15 -> 1+5=6).', 'Once they see the pattern that digit sums of multiples of 3 are always multiples of 3, they will stop using the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_015', difficulty: 'standard',
          question: 'Prime factorisation is the process of breaking down a composite number into.',
          hint: 'Review basic division and prime number identification.',
          misconception: 'Students often stop factorising too early, such as writing 12 = 3 × 4 and claiming they are done.',
          parts: [
                { id: 'a', prompt: 'What is the prime factorisation of 20?', answer: '20 = 2 × 2 × 5 or 2² × 5',
                  options: ['20 = 2 × 2 × 5 or 2² × 5', 'building blocks'],
                  hint: 'Review basic division and prime number identification.',
                  misconception: 'Students often stop factorising too early, such as writing 12 = 3 × 4 and claiming they are done.' }
          ],
            remediations: { 'students-often-stop-factorising-too': { steps: ['Ask the student to circle all the prime numbers in their list.', 'If they see a number that is not circled (like 4 or 6), ask them: "Can this number be broken into even smaller pieces?".', 'Use the example of 12: "If 4 is 2 × 2, then replacing 4 in your original list gives you 3 × 2 × 2, which are all.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
