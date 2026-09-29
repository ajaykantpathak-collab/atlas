import type { SimDef } from '../../engine/types';
import C7_MathematicsComparingQuantitiesSim from '../../../simulations/c6_12/C7_MathematicsComparingQuantitiesSim';

/** v3 wrapped master — C7_MathematicsComparingQuantitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicscomparingquantitiessim: SimDef = {
    id: 'v3w_c7_mathematicscomparingquantitiessim',
    title: 'Real-Life Applications of Large Numbers (Population, Distance)',
    subtitle: 'Covers the interpretation, estimation, and arithmetic operations (addition, subtraction,.',
    classLevel: 7, subject: 'mathematics', topic: 'Real-Life Applications of Large Numbers (Population, Distance)',
    chapters: [],
    nodeIds: ['c7_math_ch01_009', 'c7_math_ch03_007', 'c7_math_ch02_003', 'c7_math_ch02_009', 'c7_math_ch01_005', 'c7_math_ch03_001', 'c7_math_ch03_005', 'c7_math_ch03_008', 'c7_math_ch03_009', 'c7_math_ch09_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine your school headmaster announces that a massive cricket stadium in Mumbai can hold $1,00,000$ people,.', goal: 'Master Real-Life Applications of Large Numbers (Population, Distance).' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Real-life applications of large numbers.', text: 'Real-life applications of large numbers involve using numbers in lakhs and crores to quantify and interpret massive quantities from the physical world, such as national populations, inter-city.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch01_009', title: 'Real-life applications of large numbers.',
          scaffold: { problem: 'According to a census report, State A has a population of $3,82,54,120$ and State B has a population of $2,15,48,900$.',
            steps: [
            { text: 'Identify the given values: Population of State A ($P_A$) = $3,82,54,120$; Population of State B ($P_B$) = $2,15,48,900$.' },
            { text: 'For part (a), set up the addition aligning columns from the ones place: $3,82,54,120 + 2,15,48,900$.' },
            { text: 'Compute addition: $0+0=0$, $2+0=2$, $1+9=10$ (write $0$, carry $1$), $4+8+1=13$ (write $3$, carry $1$), $5+4+1=10$.' },
            { text: 'For part (b), set up subtraction for the difference: $3,82,54,120 - 2,15,48,900$.' },
            { text: 'Compute subtraction with borrowing where necessary: Ones: $0-0=0$, Tens: $2-0=2$, Hundreds: $1-9$ (borrow $1$ from.', faded: true, blankAnswer: '(a) Combined population = $5,98,03,020$ persons; (b).' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_007', title: 'Comparing and ordering decimals.',
          scaffold: { problem: 'Rahul bought three pieces of ribbon measuring $3.25\\text{ m}$, $3.09\\text{ m}$, and $3.2\\text{ m}$ for a craft project.',
            steps: [
            { text: 'Identify the given numbers: $3.25$, $3.09$, and $3.2$.' },
            { text: 'Pad the numbers with trailing zeros so all have two decimal places: $3.25$, $3.09$, and $3.20$.' },
            { text: 'Compare the whole number parts: all are $3$, so move to the tenths place.' },
            { text: 'Compare the tenths place: $3.25$ has $2$, $3.20$ has $2$, and $3.09$ has $0$. Thus, $3.09$ is the smallest.' },
            { text: 'Compare the remaining two numbers ($3.25$ and $3.20$) at the hundredths place: $5 > 0$, so $3.25 > 3.20$.', faded: true, blankAnswer: '$3.25\\text{ m} > 3.2\\text{ m} > 3.09\\text{ m}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_003', title: 'Comparing arithmetic expressions.',
          scaffold: { problem: 'Amit has ₹100. He compares two possible book purchases to see which costs less: Expression A is $4 \\times 15 + 3 \\times 10$ (4 notebooks at.',
            steps: [
            { text: 'Write down Expression A ($4 \\times 15 + 3 \\times 10$) and Expression B ($2 \\times 25 + 4 \\times 12$).' },
            { text: 'Evaluate Expression A by performing multiplications first: $4 \\times 15 = 60$ and $3 \\times 10 = 30$.' },
            { text: 'Complete Expression A by adding the products: $60 + 30 = 90$.' },
            { text: 'Evaluate Expression B by performing multiplications first: $2 \\times 25 = 50$ and $4 \\times 12 = 48$.' },
            { text: 'Complete Expression B by adding the products: $50 + 48 = 98$.' },
            { text: 'Compare the final values: $90 < 98$, so Expression A < Expression B.', faded: true, blankAnswer: '$4 \\times 15 + 3 \\times 10 < 2 \\times 25 + 4 \\times 12$ (90.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_009', title: 'Relational reasoning without computing.',
          scaffold: { problem: 'Without computing the exact totals, determine which expression is greater: $A = 48 \\times 25$ or $B = 46 \\times 25$.',
            steps: [
            { text: 'Identify the common component in both expressions, which is the multiplier $25$.' },
            { text: 'Write down the differing components, which are the multiplicands $48$ and $46$.' },
            { text: 'Compare the differing components: since $48 > 46$ and the multiplier $25$ is a positive number, scaling $48$ by $25$.' },
            { text: 'State the relational conclusion: $48 \\times 25 > 46 \\times 25$, therefore Expression A is greater than Expression B.', faded: true, blankAnswer: 'Expression A ($48 \\times 25$) is greater.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_005', title: 'Comparing and ordering large numbers.',
          scaffold: { problem: 'Two large steel manufacturing plants reported their annual production numbers.',
            steps: [
            { text: 'Identify the given values and align them by place value: Plant X = 3,42,15,680 and Plant Y = 3,42,18,210.' },
            { text: 'Compare digits from left to right. Both have 3 in the Crores place, 4 in the Ten-Lakhs place, and 2 in the Lakhs place.' },
            { text: 'Move to the Ten-Thousands place. Plant X has \'1\', while Plant Y has \'1\' as well.' },
            { text: 'Subtract Plant X from Plant Y to find the difference: 3,42,18,210 - 3,42,15,680 = 2,530 tonnes.' },
            { text: 'Verify the result: 3,42,18,210 is greater than 3,42,15,680 by 2,530 tonnes of steel.', faded: true, blankAnswer: 'Plant Y produced more steel by 2,530 tonnes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_001', title: 'The need for smaller units arises when.',
          scaffold: { problem: 'Priya has a ribbon that is 2 meters long, but after cutting a piece, the remaining length is past 1 meter and sits at the 7th small.',
            steps: [
            { text: 'Identify the whole number of meters completed, which is 1 whole meter.' },
            { text: 'Identify the total number of equal parts into which the next whole meter is divided, which is 10 parts.' },
            { text: 'Count the specific number of small parts beyond the whole meter, which is 7 parts.' },
            { text: 'Express the fractional part using the smaller unit as $\\frac{7}{10}$ of a meter.' },
            { text: 'Combine the whole number and the fractional part to write the complete measurement as $1\\frac{7}{10}$ meters, noting.', faded: true, blankAnswer: '$1\\frac{7}{10}$ meters' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch03_007', title: 'Identify each idea',
          dissect: { specimen: 'Real-Life Applications of Large Numbers (Population, Distance)', spots: [
            { id: 's1', label: 'Real-life applications of large numbers', prompt: 'Which idea is this? — Real-life applications of large numbers involve using numbers in lakhs and crores to.', answer: 'Real-life applications of large numbers', options: ['Real-life applications of large numbers', 'Comparing and ordering decimals involves', 'Comparing arithmetic expressions involves evaluating', 'Relational reasoning without computing full'] },
            { id: 's2', label: 'Comparing and ordering decimals involves', prompt: 'Which idea is this? — Comparing and ordering decimals involves determining the relative magnitude of two or.', answer: 'Comparing and ordering decimals involves', options: ['Comparing and ordering decimals involves', 'Real-life applications of large numbers', 'Comparing arithmetic expressions involves evaluating', 'Relational reasoning without computing full'] },
            { id: 's3', label: 'Comparing arithmetic expressions involves evaluating', prompt: 'Which idea is this? — Comparing arithmetic expressions involves evaluating two separate expressions using the.', answer: 'Comparing arithmetic expressions involves evaluating', options: ['Comparing arithmetic expressions involves evaluating', 'Real-life applications of large numbers', 'Comparing and ordering decimals involves', 'Relational reasoning without computing full'] },
            { id: 's4', label: 'Relational reasoning without computing full', prompt: 'Which idea is this? — Relational reasoning without computing full values is the mathematical technique of.', answer: 'Relational reasoning without computing full', options: ['Relational reasoning without computing full', 'Real-life applications of large numbers', 'Comparing and ordering decimals involves', 'Comparing arithmetic expressions involves evaluating'] },
            { id: 's5', label: 'Comparing and ordering large numbers', prompt: 'Which idea is this? — Comparing and ordering large numbers involves determining whether a large number is.', answer: 'Comparing and ordering large numbers', options: ['Comparing and ordering large numbers', 'Real-life applications of large numbers', 'Comparing and ordering decimals involves', 'Comparing arithmetic expressions involves evaluating'] },
            { id: 's6', label: 'The need for smaller units', prompt: 'Which idea is this? — The need for smaller units arises when whole numbers and standard large measurement units.', answer: 'The need for smaller units', options: ['The need for smaller units', 'Real-life applications of large numbers', 'Comparing and ordering decimals involves', 'Comparing arithmetic expressions involves evaluating'] }
          ] } }
    ],
    explore: { component: C7_MathematicsComparingQuantitiesSim, prompt: 'Explore the interactive — Real-Life Applications of Large Numbers (Population, Distance)' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch01_009', difficulty: 'standard',
          question: 'Real-life applications of large numbers involve using numbers in lakhs and.',
          hint: 'Review place value alignment and grouping in c7_math_ch01_003 before attempting.',
          misconception: 'Students often misalign place value columns when setting up vertical addition or subtraction for large numbers (lakhs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Real-life applications of large numbers involve using numbers in lakhs and crores to',
                  options: ['Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Comparing and ordering decimals involves determining the relative magnitude of two or', 'Comparing arithmetic expressions involves evaluating two separate expressions using the', 'Relational reasoning without computing full values is the mathematical technique of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often misalign place value columns when setting up vertical addition or subtraction for large numbers (lakhs and crores) because.' }
          ],
            remediations: { 'students-often-misalign-place-value': { steps: ['To fix misalignment errors, have the student draw vertical grid lines representing the Indian place value chart (Cores,.', 'Instruct them to always write the numbers starting from the Ones place (right to left) into the grid before performing.', 'Remind them to fill empty higher-place columns with blank space or zeros, ensuring units match units, tens match tens,.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_007', difficulty: 'standard',
          question: 'Comparing and ordering decimals involves determining the relative magnitude of.',
          hint: 'Review c7_math_ch03_004 to practice reading decimal place values and padding numbers with.',
          misconception: 'Students often ignore place value length and compare decimals as if they were whole numbers based on the digits after.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering decimals involves determining the relative magnitude of two or',
                  options: ['Comparing and ordering decimals involves determining the relative magnitude of two or', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Comparing arithmetic expressions involves evaluating two separate expressions using the', 'Relational reasoning without computing full values is the mathematical technique of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often ignore place value length and compare decimals as if they were whole numbers based on the digits after the decimal point.' }
          ],
            remediations: { 'students-often-ignore-place-value': { steps: ['When a student struggles, stop and have them rewrite all decimal numbers with an equal number of decimal places by.', 'Guide them to read the numbers aloud as fractions or place-value names (e.g., read $14.2$ as "14 and 20 hundredths" and.', 'Then have them compare the whole number part first, then the tenths column, then the hundredths column step by step.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_003', difficulty: 'standard',
          question: 'Comparing arithmetic expressions involves evaluating two separate expressions.',
          hint: 'Review evaluating arithmetic expressions using order of operations (c7_math_ch02_002).',
          misconception: 'Students often evaluate expressions strictly from left to right across the entire string without respecting brackets or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing arithmetic expressions involves evaluating two separate expressions using the',
                  options: ['Comparing arithmetic expressions involves evaluating two separate expressions using the', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Comparing and ordering decimals involves determining the relative magnitude of two or', 'Relational reasoning without computing full values is the mathematical technique of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often evaluate expressions strictly from left to right across the entire string without respecting brackets or the order of.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Remind the student to always use parentheses or underline operations that must be done first according to BODMAS/PEMDAS.', 'Have them write out the intermediate step for each expression on separate lines before looking at the comparison sign.', 'Say: "Evaluate the left side completely into a single number, then evaluate the right side completely into a single.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_009', difficulty: 'standard',
          question: 'Relational reasoning without computing full values is the mathematical.',
          hint: 'Review c7_math_ch02_003 and c7_math_ch02_004 to strengthen skills in comparing.',
          misconception: 'Students often assume that an expression containing larger individual numbers or more digits overall must always.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Relational reasoning without computing full values is the mathematical technique of',
                  options: ['Relational reasoning without computing full values is the mathematical technique of', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Comparing and ordering decimals involves determining the relative magnitude of two or', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that an expression containing larger individual numbers or more digits overall must always evaluate to a greater.' }
          ],
            remediations: { 'an-expression-containing-larger-individual': { steps: ['Guide the student to break down the expressions into corresponding parts and examine the effect of each operation.', 'Ask: "What are we starting with, and how much are we taking away or adding in each expression?" Show them how to.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_005', difficulty: 'standard',
          question: 'Comparing and ordering large numbers involves determining whether a large.',
          hint: 'Review place value columns and digit-by-digit comparison from c6_math_ch01_004 (Comparing.',
          misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering large numbers involves determining whether a large number is',
                  options: ['Comparing and ordering large numbers involves determining whether a large number is', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Comparing and ordering decimals involves determining the relative magnitude of two or', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they look at the last few.' }
          ],
            remediations: { 'students-often-compare-large-numbers': { steps: ['Guide the student by writing both numbers vertically, aligned perfectly by place value columns from left to right.', 'Say: "Cover all digits with your hand except the leftmost column.', 'Compare those two digits first.', 'Only if they are equal do you uncover the next column to the right." Have them practice this column-by-column masking.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_001', difficulty: 'standard',
          question: 'The need for smaller units arises when whole numbers and standard large.',
          hint: 'Review c6_math_ch03_029 (Introduction to Fractions) to reinforce how a single unit can be.',
          misconception: 'Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers rather than parts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The need for smaller units arises when whole numbers and standard large measurement units',
                  options: ['The need for smaller units arises when whole numbers and standard large measurement units', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Comparing and ordering decimals involves determining the relative magnitude of two or', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers rather than parts of a whole, leading.' }
          ],
            remediations: { 'students-often-treat-the-smaller': { steps: ['When a student struggles with smaller units, guide them back to physical partitioning: take a paper strip, fold it into.', 'Ask them: \'If I have 3 full strips and 4 tiny segments, can I write this as 34?\' Show them that 34 is a large whole.', 'Reinforce that the denominator tells us how many equal pieces make one whole.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
