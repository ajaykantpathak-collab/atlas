import type { SimDef } from '../../engine/types';
import C7_MathematicsUnderstandingPercentageFractionSim from '../../../simulations/c6_12/C7_MathematicsUnderstandingPercentageFractionSim';

/** v3 wrapped master — C7_MathematicsUnderstandingPercentageFractionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsunderstandingpercentagefractionsim: SimDef = {
    id: 'v3w_c7_mathematicsunderstandingpercentagefractionsim',
    title: 'Tenth Part: Understanding 1/10 as a Decimal',
    subtitle: 'Covers the understanding, representation, and conversion of tenths ($\\frac{1}{10}$ and.',
    classLevel: 7, subject: 'mathematics', topic: 'Tenth Part: Understanding 1/10 as a Decimal',
    chapters: [],
    nodeIds: ['c7_math_ch03_002', 'c7_math_ch01_001', 'c7_math_ch01_004', 'c7_math_ch01_005', 'c7_math_ch01_010', 'c7_math_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a stationery shop to buy a pencil, and the shopkeeper tells you it costs one rupee, but you.', goal: 'Master Tenth Part: Understanding 1/10 as a Decimal.' },
    discovery: {
        question: 'What is the place value of the digit 7 in the number $4,73,52,100$ according to the Indian numbering system?',
        options: ['The place value of 7 is $70,00,000$ (Seventy Lakhs)', 'Three crore four lakh', 'four lakh'],
        answer: 'The place value of 7 is $70,00,000$ (Seventy Lakhs)',
        hook: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.',
    },
    teaching: [
        { title: 'The tenth part represents one of ten equal.', text: 'The tenth part represents one of ten equal parts of a whole unit, expressed as the fraction $\\frac{1}{10}$ or as the decimal number $0.1$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch03_002', title: 'The tenth part represents one of ten.',
          scaffold: { problem: 'Amit measures a wooden stick and finds it is 4 centimetres and 3 millimetres long.',
            steps: [
            { text: 'Identify the whole centimetres and the fractional part. Whole part = $4\\text{ cm}$, fractional part = $3\\text{ mm} =.' },
            { text: 'Write the combined measurement as a mixed number: $4\\frac{3}{10}\\text{ cm}$.' },
            { text: 'Convert the fraction part $\\frac{3}{10}$ into its decimal equivalent using place value: $\\frac{3}{10} = 0.3$.' },
            { text: 'Combine the whole number and the decimal part: $4 + 0.3 = 4.3$.' },
            { text: 'Verify the result with proper units: The total length is $4.3\\text{ cm}$, where 4 is in the units place and 3 is in the.', faded: true, blankAnswer: '$4.3\\text{ cm}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_001', title: 'The lakh is a unit in the Indian.',
          scaffold: { problem: 'A real estate developer in Jaipur sold plots of land worth a total of ₹ $4,50,000$.',
            steps: [
            { text: 'Identify the given number and separate it into periods according to the Indian system: $4,50,000$.' },
            { text: 'Determine the value of the digits in each place: The digit 4 is in the lakh place ($4 \\times 1,00,000$), and the digit.' },
            { text: 'Write the number in words by reading the periods: Four lakh fifty thousand.' },
            { text: 'Write the expanded form by summing the product of each digit and its place value: $(4 \\times 1,00,000) + (5 \\times.' },
            { text: 'Verify the total magnitude: $4,00,000 + 50,000 = 4,50,000$ rupees.', faded: true, blankAnswer: 'Four lakh fifty thousand; Expanded form: $4,00,000 + 50,000$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_004', title: 'A crore is an 8-digit number in the.',
          scaffold: { problem: 'A state government allocates funds of 7 crore 45 lakh 12 thousand 300 rupees for building highways.',
            steps: [
            { text: 'Identify the digits for each period from the given statement: Crores period = 7, Lakhs period = 45, Thousands period =.' },
            { text: 'Arrange the digits into the Indian place value chart: $7,45,12,300$.' },
            { text: 'Determine the place value of the digit in the crores place: Digit 7 is in the crores place, so its place value is $7.' },
            { text: 'Determine the place value of the digit in the thousands place: Digit 2 is in the thousands place, so its place value is.' },
            { text: 'Add the two place values: $7,00,00,000 + 2,000 = 7,00,02,000$.', faded: true, blankAnswer: '$7,45,12,300$; Sum of place values = $7,00,02,000$ rupees' }
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
        { type: 'scaffold', nodeId: 'c7_math_ch01_010', title: 'Operations with large numbers involving.',
          scaffold: { problem: 'A major infrastructure project in India had a total sanctioned budget of ₹$7,54,32,100$.',
            steps: [
            { text: 'Identify the given values. Total budget (minuend) = ₹$7,54,32,100$; Amount spent (subtrahend) = ₹$2,89,45,650$.' },
            { text: 'Set up the vertical subtraction problem, aligning columns from ones to crores.' },
            { text: 'Perform subtraction column by column from right to left, borrowing where necessary.' },
            { text: 'Continue borrowing across columns: Hundreds ($0-6$ needs borrow, goes to thousands column), proceeding leftward through.' },
            { text: 'Verify the result by adding the remainder to the amount spent: $4,64,86,450 + 2,89,45,650 = 7,54,32,100$.', faded: true, blankAnswer: '₹$4,64,86,450$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_011', title: 'Operations with large numbers:.',
          scaffold: { problem: 'A textile mill in Surat weaves 2,45,810 metres of fabric every month. What is the total length of fabric woven in 2 years and 6 months?',
            steps: [
            { text: 'Convert the total time into months. 2 years = $2 \\times 12 = 24$ months. Total months = $24 + 6 = 30$ months.' },
            { text: 'Set up the multiplication expression: $2,45,810 \\times 30$. We can split this as $2,45,810 \\times 3 \\times 10$.' },
            { text: 'Multiply $2,45,810$ by 3: $0 \\times 3 = 0$, $1 \\times 3 = 3$, $8 \\times 3 = 24$ (write 4, carry 2), $5 \\times 3 = 15 +.' },
            { text: 'Multiply the result by 10 (accounting for the zero in 30): $7,37,430 \\times 10 = 73,74,300$.' },
            { text: 'Verify with estimation: $2,50,000 \\times 30 = 75,00,000$, which is very close to our calculated exact value of.', faded: true, blankAnswer: '73,74,300 metres' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch01_001', title: 'Identify each idea',
          dissect: { specimen: 'Tenth Part: Understanding 1/10 as a Decimal', spots: [
            { id: 's1', label: 'The tenth part represents one', prompt: 'Which idea is this? — The tenth part represents one of ten equal parts of a whole unit, expressed as the.', answer: 'The tenth part represents one', options: ['The tenth part represents one', 'The lakh is a unit', 'A crore is an 8-digit', 'Comparing and ordering large numbers'] },
            { id: 's2', label: 'The lakh is a unit', prompt: 'Which idea is this? — The lakh is a unit in the Indian numbering system equal to one hundred thousand.', answer: 'The lakh is a unit', options: ['The lakh is a unit', 'The tenth part represents one', 'A crore is an 8-digit', 'Comparing and ordering large numbers'] },
            { id: 's3', label: 'A crore is an 8-digit', prompt: 'Which idea is this? — A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten.', answer: 'A crore is an 8-digit', options: ['A crore is an 8-digit', 'The tenth part represents one', 'The lakh is a unit', 'Comparing and ordering large numbers'] },
            { id: 's4', label: 'Comparing and ordering large numbers', prompt: 'Which idea is this? — Comparing and ordering large numbers involves determining whether a large number is.', answer: 'Comparing and ordering large numbers', options: ['Comparing and ordering large numbers', 'The tenth part represents one', 'The lakh is a unit', 'A crore is an 8-digit'] },
            { id: 's5', label: 'Operations with large numbers involving', prompt: 'Which idea is this? — Operations with large numbers involving addition and subtraction require combining or.', answer: 'Operations with large numbers involving', options: ['Operations with large numbers involving', 'The tenth part represents one', 'The lakh is a unit', 'A crore is an 8-digit'] },
            { id: 's6', label: 'Operations with large numbers multiplication', prompt: 'Which idea is this? — Operations with large numbers: multiplication and division involves finding the product.', answer: 'Operations with large numbers multiplication', options: ['Operations with large numbers multiplication', 'The tenth part represents one', 'The lakh is a unit', 'A crore is an 8-digit'] }
          ] } }
    ],
    explore: { component: C7_MathematicsUnderstandingPercentageFractionSim, prompt: 'Explore the interactive — Tenth Part: Understanding 1/10 as a Decimal' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch03_002', difficulty: 'standard',
          question: 'The tenth part represents one of ten equal parts of a whole unit, expressed as.',
          hint: 'Review c6_math_ch03_029 (Introduction to Fractions) and c6_math_ch04_042 (Introduction to.',
          misconception: 'Students often write the fraction $\\frac{1}{10}$ as decimal $0.01$ instead of $0.1$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tenth part represents one of ten equal parts of a whole unit, expressed as the',
                  options: ['The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten', 'Comparing and ordering large numbers involves determining whether a large number is'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the fraction $\\frac{1}{10}$ as decimal $0.01$ instead of $0.1$.' }
          ],
            remediations: { 'students-often-write-the-fraction': { steps: ['Remind the student to count the number of zeros in the denominator of the fraction $\\frac{1}{10}$.', 'Show them a place value chart where the column immediately to the right of the decimal point is labelled "Tenths" and.', 'Have them practice writing fractions like $\\frac{1}{10}, \\frac{2}{10}, \\frac{9}{10}$ directly as $0.1, 0.2, 0.9$.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_001', difficulty: 'standard',
          question: 'The lakh is a unit in the Indian numbering system equal to one hundred thousand.',
          hint: 'Review place value columns from ones to ten-thousands using base-10 blocks or expanded.',
          misconception: 'Students frequently misplace commas or miscount zeros when writing and reading numbers involving lakhs, writing numbers.',
          parts: [
                { id: 'a', prompt: 'Explain why the number $1,00,000$ is called "one hundred thousand" in terms of smaller place values. How many ten-thousand notes make one lakh?', answer: 'One lakh is equal to 10 ten-thousands',
                  options: ['One lakh is equal to 10 ten-thousands', '100 ten-thousands'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misplace commas or miscount zeros when writing and reading numbers involving lakhs, writing numbers like $10,0,000$ or.' }
          ],
            remediations: { 'students-frequently-misplace-commas-or': { steps: ['Direct the student to draw the Indian Place Value Chart with columns: Lakhs, Ten Thousands, Thousands, Hundreds, Tens,.', 'Have them write $1$ under the Lakhs column and fill all remaining columns to the right with zeros, explicitly counting.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_004', difficulty: 'standard',
          question: 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs.',
          hint: 'Review place value columns from ones to ten lakhs using c7_math_ch01_002 before tackling.',
          misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.',
          parts: [
                { id: 'a', prompt: 'What is the place value of the digit 7 in the number $4,73,52,100$ according to the Indian numbering system?', answer: 'The place value of 7 is $70,00,000$ (Seventy Lakhs)',
                  options: ['The place value of 7 is $70,00,000$ (Seventy Lakhs)', 'Three crore four lakh', 'four lakh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' },
                { id: 'b', prompt: 'Compare the numbers $8,12,04,500$ and $8,02,99,999$ and explain which one is larger without looking at the last four digits.', answer: '$8,12,04,500$ is larger',
                  options: ['$8,12,04,500$ is larger', 'Three crore four lakh', 'four lakh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' }
          ],
            remediations: { 'students-often-write-8-digit': { steps: ['Guide the student to draw the Indian Place Value chart with columns: TC (Ten Crores - leave blank for 8 digits), C.', 'Ask them to map each spoken word ("three crore" -> 3 under C; "four lakh" -> 4 under L, leaving TL as 0).', 'Explicitly point out that every period except the hundreds/ones must hold two digits, so single-digit values like 4.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.',
          parts: [
                { id: 'a', prompt: 'A student writes the number "Four crore twenty lakh five thousand six" as $4,20,50,006$. Evaluate whether this is correct and justify your reasoning.', answer: 'This is incorrect',
                  options: ['This is incorrect', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' },
                { id: 'b', prompt: 'Create an 8-digit number where the digit in the ten-crores place is impossible in the standard Indian system, explain why, and then write a valid 8-digit.', answer: 'An 8-digit number cannot have a digit in the "ten-crores" place',
                  options: ['An 8-digit number cannot have a digit in the "ten-crores" place', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' },
                { id: 'c', prompt: 'Compare the numbers $8,12,04,500$ and $8,02,99,999$ and explain which one is larger without looking at the last four digits.', answer: '$8,12,04,500$ is larger',
                  options: ['$8,12,04,500$ is larger', 'Three crore four lakh', 'four lakh', 'forty lakh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write 8-digit numbers by inserting zeros incorrectly when a period is empty.' }
          ],
            remediations: { 'students-often-write-8-digit': { steps: ['Guide the student to draw the Indian Place Value chart with columns: TC (Ten Crores - leave blank for 8 digits), C.', 'Ask them to map each spoken word ("three crore" -> 3 under C; "four lakh" -> 4 under L, leaving TL as 0).', 'Explicitly point out that every period except the hundreds/ones must hold two digits, so single-digit values like 4.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_005', difficulty: 'standard',
          question: 'Comparing and ordering large numbers involves determining whether a large.',
          hint: 'Review place value columns and digit-by-digit comparison from c6_math_ch01_004 (Comparing.',
          misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing and ordering large numbers involves determining whether a large number is',
                  options: ['Comparing and ordering large numbers involves determining whether a large number is', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they look at the last few.' }
          ],
            remediations: { 'students-often-compare-large-numbers': { steps: ['Guide the student by writing both numbers vertically, aligned perfectly by place value columns from left to right.', 'Say: "Cover all digits with your hand except the leftmost column.', 'Compare those two digits first.', 'Only if they are equal do you uncover the next column to the right." Have them practice this column-by-column masking.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_010', difficulty: 'standard',
          question: 'Operations with large numbers involving addition and subtraction require.',
          hint: 'Review place value columns from ones to crores and practice simple borrowing across zeros.',
          misconception: 'Students frequently mismanage "zero placeholders" during multi-step borrowing in subtraction with large numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Operations with large numbers involving addition and subtraction require combining or',
                  options: ['Operations with large numbers involving addition and subtraction require combining or', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently mismanage "zero placeholders" during multi-step borrowing in subtraction with large numbers.' }
          ],
            remediations: { 'students-frequently-mismanage-zero-placeholders': { steps: ['Guide the student by rewriting the number with zeros explicitly expanded or by using color-coded columns.', 'Tell the student: "Stop and look at the neighbor.', 'If your top digit is smaller than the bottom digit, you must borrow.', 'Cross out the neighbor, reduce it by $1$, and give $10$ to your current column.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_011', difficulty: 'standard',
          question: 'Operations with large numbers: multiplication and division involves finding the.',
          hint: 'Review c6_math_ch01_010 and c6_math_ch01_011 to practice standard multiplication and long.',
          misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Operations with large numbers: multiplication and division involves finding the product',
                  options: ['Operations with large numbers: multiplication and division involves finding the product', 'The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'The lakh is a unit in the Indian numbering system equal to one hundred thousand', 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller than the divisor, or.' }
          ],
            remediations: { 'students-frequently-drop-a-place': { steps: ['Guide the student by rewriting the division step-by-step using explicit place-value columns.', 'Say: "Let\'s check each digit from left to right.', 'When we bring down a digit and it is less than our divisor, what must we write in the quotient before bringing down the.', 'Always write a 0 to hold that place value, then bring down the next digit." Practice estimating the quotient first.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
