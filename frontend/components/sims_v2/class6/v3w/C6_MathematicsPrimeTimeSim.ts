import type { SimDef } from '../../engine/types';
import C6_MathematicsPrimeTimeSim from '../../../simulations/c6_12/C6_MathematicsPrimeTimeSim';

/** v3 wrapped master — C6_MathematicsPrimeTimeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicsprimetimesim: SimDef = {
    id: 'v3w_c6_mathematicsprimetimesim',
    title: 'Factors and Multiples',
    subtitle: 'Covers the definitions and identification of factors, multiples, and prime numbers.',
    classLevel: 6, subject: 'mathematics', topic: 'Factors and Multiples',
    chapters: [],
    nodeIds: ['c6_math_ch01_013', 'c6_math_ch01_014', 'c6_math_ch01_015', 'c6_math_ch01_001', 'c6_math_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you have 12 chocolate bars to share equally among friends.', goal: 'Master Factors and Multiples.' },
    discovery: {
        question: 'Compare the rules for 2 and 5. What do they have in common?',
        options: ['Both rules depend only on the last digit of the number', 'last digit', 'sum of digits'],
        answer: 'Both rules depend only on the last digit of the number',
        hook: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.',
    },
    teaching: [
        { title: 'A factor is a whole number that divides.', text: 'A factor is a whole number that divides another number exactly, leaving no remainder. A multiple is the product obtained when you multiply a given whole number by any other whole number.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch01_013', title: 'A factor is a whole number that divides.',
          scaffold: { problem: 'Radha has 20 metres of ribbon. She wants to cut it into equal pieces such that no ribbon is wasted.',
            steps: [
            { text: 'Identify that we need factors of 20.' },
            { text: 'Test divisibility by checking integers starting from 1.' },
            { text: '20 ÷ 1 = 20, 20 ÷ 2 = 10, 20 ÷ 4 = 5.' },
            { text: 'List the pairs: (1, 20), (2, 10), (4, 5).' },
            { text: 'Conclude the possible lengths are 1m, 2m, 4m, 5m, 10m, and 20m.', faded: true, blankAnswer: '1m, 2m, 4m, 5m, 10m, 20m' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_014', title: 'Divisibility rules are simple patterns.',
          scaffold: { problem: 'A library has 435 books. Can they be placed in 3 equal stacks?',
            steps: [
            { text: 'Identify the total (435) and the divisor (3).' },
            { text: 'Apply the divisibility rule for 3 (sum of digits).' },
            { text: 'Add the digits: 4 + 3 + 5 = 12.' },
            { text: 'Check if 12 is divisible by 3: 12 ÷ 3 = 4 (remainder 0).' },
            { text: 'Conclude that since the sum is divisible, the original number is divisible.', faded: true, blankAnswer: 'Yes, they can be placed in 3 equal stacks.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_015', title: 'Prime factorisation is the process of.',
          scaffold: { problem: 'A tailor has two pieces of fabric, one 24 metres and the other 36 metres long.',
            steps: [
            { text: 'Prime factorise 24: 24 = 2 × 12 = 2 × 2 × 6 = 2 × 2 × 2 × 3.' },
            { text: 'Prime factorise 36: 36 = 2 × 18 = 2 × 2 × 9 = 2 × 2 × 3 × 3.' },
            { text: 'Identify common prime factors: Both share two 2s and one 3.' },
            { text: 'Multiply common factors: 2 × 2 × 3 = 12.' },
            { text: 'The maximum strip length is 12 metres.', faded: true, blankAnswer: '12 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch01_001', title: 'Numbers in our everyday life are.',
          scaffold: { problem: 'You need to buy 4 pens at ₹15 each and 2 notebooks at ₹30 each. You have a ₹200 note. Estimate if you have enough money.',
            steps: [
            { text: 'Identify costs: 4 pens at 15 = 60; 2 notebooks at 30 = 60.' },
            { text: 'Sum the costs: 60 + 60 = 120.' },
            { text: 'Compare total cost (120) with available money (200).' },
            { text: 'Since 120 is less than 200, you have enough.', faded: true, blankAnswer: 'Yes, you have enough; total cost is ₹120.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_math_ch01_014', title: 'Identify each idea',
          dissect: { specimen: 'Factors and Multiples', spots: [
            { id: 's1', label: 'A factor is a whole', prompt: 'Which idea is this? — A factor is a whole number that divides another number exactly, leaving no remainder.', answer: 'A factor is a whole', options: ['A factor is a whole', 'Divisibility rules are simple patterns', 'Prime factorisation is the process', 'Numbers in our everyday life'] },
            { id: 's2', label: 'Divisibility rules are simple patterns', prompt: 'Which idea is this? — Divisibility rules are simple patterns or shortcuts that allow you to check if one number.', answer: 'Divisibility rules are simple patterns', options: ['Divisibility rules are simple patterns', 'A factor is a whole', 'Prime factorisation is the process', 'Numbers in our everyday life'] },
            { id: 's3', label: 'Prime factorisation is the process', prompt: 'Which idea is this? — Prime factorisation is the process of breaking down a composite number into a product of.', answer: 'Prime factorisation is the process', options: ['Prime factorisation is the process', 'A factor is a whole', 'Divisibility rules are simple patterns', 'Numbers in our everyday life'] },
            { id: 's4', label: 'Numbers in our everyday life', prompt: 'Which idea is this? — Numbers in our everyday life are specific values used to represent quantity, order, or.', answer: 'Numbers in our everyday life', options: ['Numbers in our everyday life', 'A factor is a whole', 'Divisibility rules are simple patterns', 'Prime factorisation is the process'] },
            { id: 's5', label: 'Division is the mathematical process', prompt: 'Which idea is this? — Division is the mathematical process of splitting a total quantity into equal groups or.', answer: 'Division is the mathematical process', options: ['Division is the mathematical process', 'A factor is a whole', 'Divisibility rules are simple patterns', 'Prime factorisation is the process'] }
          ] } }
    ],
    explore: { component: C6_MathematicsPrimeTimeSim, prompt: 'Explore the interactive — Factors and Multiples' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch01_013', difficulty: 'standard',
          question: 'A factor is a whole number that divides another number exactly, leaving no.',
          hint: 'Review basic division facts (e.g., 20 ÷ 4 = 5).',
          misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A factor is a whole number that divides another number exactly, leaving no remainder',
                  options: ['A factor is a whole number that divides another number exactly, leaving no remainder', 'Divisibility rules are simple patterns or shortcuts that allow you to check if one number', 'Prime factorisation is the process of breaking down a composite number into a product of', 'Numbers in our everyday life are specific values used to represent quantity, order, or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.' }
          ],
            remediations: { 'students-often-confuse-factors-and': { steps: ['Ask the student to write the multiplication fact 2 × 6 = 12.', 'Label 2 and 6 as "Factors" and 12 as the "Multiple." Have them check divisibility: "Does 12 divide by 2?'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.',
          parts: [
                { id: 'a', prompt: 'If a number is prime, what can you say about its factors?', answer: 'A prime number has exactly two factors: 1 and the number itself',
                  options: ['A prime number has exactly two factors: 1 and the number itself', 'many factors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse factors and multiples, thinking that because 2 × 6 = 12, then 12 is a factor of 2.' }
          ],
            remediations: { 'students-often-confuse-factors-and': { steps: ['Ask the student to write the multiplication fact 2 × 6 = 12.', 'Label 2 and 6 as "Factors" and 12 as the "Multiple." Have them check divisibility: "Does 12 divide by 2?'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_014', difficulty: 'standard',
          question: 'Divisibility rules are simple patterns or shortcuts that allow you to check if.',
          hint: 'Review the definitions of even numbers (0, 2, 4, 6, 8) and basic addition of single-digit.',
          misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.',
          parts: [
                { id: 'a', prompt: 'What is the rule to check if a number is divisible by 5?', answer: 'A number is divisible by 5 if its last digit is either 0 or 5',
                  options: ['A number is divisible by 5 if its last digit is either 0 or 5', 'any even number is divisible by 5'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.' },
                { id: 'b', prompt: 'Compare the rules for 2 and 5. What do they have in common?', answer: 'Both rules depend only on the last digit of the number',
                  options: ['Both rules depend only on the last digit of the number', 'last digit', 'sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.' }
          ],
            remediations: { 'students-often-try-to-apply': { steps: ['If a student applies the wrong rule, ask them to list the first five multiples of 3.', 'Then, have them calculate the digit sums of those multiples (e.g., 12 -> 1+2=3, 15 -> 1+5=6).', 'Once they see the pattern that digit sums of multiples of 3 are always multiples of 3, they will stop using the.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.',
          parts: [
                { id: 'a', prompt: 'Compare the rules for 2 and 5. What do they have in common?', answer: 'Both rules depend only on the last digit of the number',
                  options: ['Both rules depend only on the last digit of the number', 'last digit', 'sum of digits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often try to apply the "last digit" rule (used for 2 and 5) to the number 3.' }
          ],
            remediations: { 'students-often-try-to-apply': { steps: ['If a student applies the wrong rule, ask them to list the first five multiples of 3.', 'Then, have them calculate the digit sums of those multiples (e.g., 12 -> 1+2=3, 15 -> 1+5=6).', 'Once they see the pattern that digit sums of multiples of 3 are always multiples of 3, they will stop using the.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_015', difficulty: 'standard',
          question: 'Prime factorisation is the process of breaking down a composite number into a.',
          hint: 'Review basic division and prime number identification.',
          misconception: 'Students often stop factorising too early, such as writing 12 = 3 × 4 and claiming they are done.',
          parts: [
                { id: 'a', prompt: 'What is the prime factorisation of 20?', answer: '20 = 2 × 2 × 5 or 2² × 5',
                  options: ['20 = 2 × 2 × 5 or 2² × 5', 'building blocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often stop factorising too early, such as writing 12 = 3 × 4 and claiming they are done.' }
          ],
            remediations: { 'students-often-stop-factorising-too': { steps: ['Ask the student to circle all the prime numbers in their list.', 'If they see a number that is not circled (like 4 or 6), ask them: "Can this number be broken into even smaller pieces?".', 'Use the example of 12: "If 4 is 2 × 2, then replacing 4 in your original list gives you 3 × 2 × 2, which are all.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_001', difficulty: 'standard',
          question: 'Numbers in our everyday life are specific values used to represent quantity,.',
          hint: 'Review basic place value (thousands, ten-thousands) to ensure you can compare magnitudes.',
          misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.',
          parts: [
                { id: 'a', prompt: 'Counting one by one is slow and prone to error, while estimation gives us a useful "about" value that is sufficient for planning.', answer: '**Correct Answer:** It is more efficient to estimate',
                  options: ['**Correct Answer:** It is more efficient to estimate', 'estimating is always more accurate than counting', 'estimation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' }
          ],
            remediations: { 'estimation-is-just-a-wild': { steps: ['To fix this, guide the student to "break it down." Ask: "How many breaths do you take in one minute?" (Measure it).', 'Then, ask: "How many minutes are in an hour?" (60).', 'Finally, multiply the two.', 'Show them that estimation is actually "calculated guessing" based on smaller, measurable facts.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.',
          parts: [
                { id: 'a', prompt: 'An example is 121. It is a palindrome because it reads the same forward and backward (1-2-1).', answer: '**Correct Answer:** A 3-digit palindrome is 121',
                  options: ['**Correct Answer:** A 3-digit palindrome is 121', 'estimation', '"estimation" is just a wild guess with no logical basis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' },
                { id: 'b', prompt: 'Counting one by one is slow and prone to error, while estimation gives us a useful "about" value that is sufficient for planning.', answer: '**Correct Answer:** It is more efficient to estimate',
                  options: ['**Correct Answer:** It is more efficient to estimate', 'estimating is always more accurate than counting', 'estimation', '"estimation" is just a wild guess with no logical basis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "estimation" is just a wild guess with no logical basis.' }
          ],
            remediations: { 'estimation-is-just-a-wild': { steps: ['To fix this, guide the student to "break it down." Ask: "How many breaths do you take in one minute?" (Measure it).', 'Then, ask: "How many minutes are in an hour?" (60).', 'Finally, multiply the two.', 'Show them that estimation is actually "calculated guessing" based on smaller, measurable facts.'] } } },
        { type: 'subpart', nodeId: 'c6_math_ch01_011', difficulty: 'standard',
          question: 'Division is the mathematical process of splitting a total quantity into equal.',
          hint: 'Review the "multiplication facts" for the specific divisor (e.g., if dividing by 13,.',
          misconception: 'Students often "drop" a number and forget to place a placeholder zero in the quotient.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Division is the mathematical process of splitting a total quantity into equal groups or',
                  options: ['Division is the mathematical process of splitting a total quantity into equal groups or', 'A factor is a whole number that divides another number exactly, leaving no remainder', 'Divisibility rules are simple patterns or shortcuts that allow you to check if one number', 'Prime factorisation is the process of breaking down a composite number into a product of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often "drop" a number and forget to place a placeholder zero in the quotient.' }
          ],
            remediations: { 'students-often-drop-a-number': { steps: ['If a student gets 12 instead of 102, ask them to check their work by multiplying their answer (12) by the divisor (8).', 'When they see 12 * 8 = 96, which is not 816, explain that the quotient must be closer to the original number.', 'Remind them: "Every time you bring down a digit, you MUST put a digit in the quotient, even if that digit is a zero."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
