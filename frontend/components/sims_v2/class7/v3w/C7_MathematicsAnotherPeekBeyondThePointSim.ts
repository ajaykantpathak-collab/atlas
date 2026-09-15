import type { SimDef } from '../../engine/types';
import C7_MathematicsAnotherPeekBeyondThePointSim from '../../../simulations/c6_12/C7_MathematicsAnotherPeekBeyondThePointSim';

/** v3 wrapped master — C7_MathematicsAnotherPeekBeyondThePointSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsanotherpeekbeyondthepointsim: SimDef = {
    id: 'v3w_c7_mathematicsanotherpeekbeyondthepointsim',
    title: 'Another Peek Beyond The Point',
    subtitle: 'Covers the representation and location of terminating decimal numbers up to hundredths on.',
    classLevel: 7, subject: 'mathematics', topic: 'Locating Decimals on the Number Line',
    chapters: [],
    nodeIds: ['c7_math_ch03_006', 'c7_math_ch03_008', 'c7_math_ch12_005', 'c7_math_ch03_001', 'c7_math_ch03_002', 'c7_math_ch03_003', 'c7_math_ch03_004', 'c7_math_ch03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are measuring a piece of ribbon for your craft project, and it measures 3.4 cm long.', goal: 'Master Another Peek Beyond The Point.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Locating decimals on the number line.', text: 'Locating decimals on the number line involves identifying the precise position of a decimal number between two integers by dividing the unit distance into ten equal tenths segments and further into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch03_006', title: 'Locating decimals on the number line.',
          scaffold: { problem: 'Priya wants to locate the point representing $2.8$ kg of rice on a number line marked in whole kilograms.',
            steps: [
            { text: 'Identify the two whole numbers between which $2.8$ lies, which are $2$ and $3$.' },
            { text: 'Divide the distance between $2$ and $3$ on the number line into $10$ equal sub-intervals representing tenths ($0.1$.' },
            { text: 'Start at the integer $2$ (representing $2.0$) and count $8$ subdivision tick marks to the right.' },
            { text: 'Mark the exact position at the $8$th tick mark and label it as $2.8$.' },
            { text: 'Verify that $2.8$ is $2$ whole units plus $\\frac{8}{10}$ of a unit, which is just $2$ ticks short of $3.0$.', faded: true, blankAnswer: 'Point located at $8$ tenths to the right of $2$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_008', title: 'The addition of decimal numbers is the.',
          scaffold: { problem: 'Priya went to the market and bought $2.5\\text{ kg}$ of potatoes, $1.75\\text{ kg}$ of tomatoes, and $0.325\\text{ kg}$ of green chillies.',
            steps: [
            { text: 'Identify the given quantities and their units: Potatoes = $2.5\\text{ kg}$, Tomatoes = $1.75\\text{ kg}$, Chillies =.' },
            { text: 'Append placeholder zeros so all numbers have the same number of decimal places (three places, matching thousandths):.' },
            { text: 'Set up the vertical addition column aligning the decimal points:' },
            { text: 'Add column by column from right to left:' },
            { text: 'Place the decimal point directly aligned with the column, yielding $4.575\\text{ kg}$.', faded: true, blankAnswer: '$4.575\\text{ kg}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_005', title: 'Dividing a decimal number by another.',
          scaffold: { problem: 'A tailor has a ribbon of length $12.6$ metres. She wants to cut pieces that are $0.3$ metres long. How many pieces of ribbon can she cut?',
            steps: [
            { text: 'Identify the given values: Total length of ribbon (dividend) = $12.6$ m, length of each piece (divisor) = $0.3$ m.' },
            { text: 'Write the division expression as a fraction: $\\frac{12.6}{0.3}$.' },
            { text: 'Multiply both the numerator and the denominator by $10$ to eliminate the decimal point in the divisor: $\\frac{12.6.' },
            { text: 'Perform the whole-number division $126 \\div 3$. Since $12 \\div 3 = 4$ and $6 \\div 3 = 2$, the result is $42$.' },
            { text: 'Verify the result with units: $42 \\text{ pieces} \\times 0.3 \\text{ m/piece} = 12.6 \\text{ m}$, which matches the.', faded: true, blankAnswer: '42 pieces' }
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
        { type: 'scaffold', nodeId: 'c7_math_ch03_002', title: 'The tenth part represents one of ten.',
          scaffold: { problem: 'Amit measures a wooden stick and finds it is 4 centimetres and 3 millimetres long.',
            steps: [
            { text: 'Identify the whole centimetres and the fractional part. Whole part = $4\\text{ cm}$, fractional part = $3\\text{ mm} =.' },
            { text: 'Write the combined measurement as a mixed number: $4\\frac{3}{10}\\text{ cm}$.' },
            { text: 'Convert the fraction part $\\frac{3}{10}$ into its decimal equivalent using place value: $\\frac{3}{10} = 0.3$.' },
            { text: 'Combine the whole number and the decimal part: $4 + 0.3 = 4.3$.' },
            { text: 'Verify the result with proper units: The total length is $4.3\\text{ cm}$, where 4 is in the units place and 3 is in the.', faded: true, blankAnswer: '$4.3\\text{ cm}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch03_003', title: 'A hundredth part is one of one hundred.',
          scaffold: { problem: 'Aarav has a ribbon of length 4 metres and 25 centimetres. Express the 25 centimetres part as a fraction of a metre, write it as a decimal,.',
            steps: [
            { text: 'Identify the relationship between centimetres and metres. We know that 100 centimetres = 1 metre, so 1 centimetre =.' },
            { text: 'Express 25 centimetres as a fraction of a metre: $\\frac{25}{100}$ metre.' },
            { text: 'Convert the fraction $\\frac{25}{100}$ into decimal notation by placing 25 in the hundredths position: $0.25$ metre.' },
            { text: 'Add the whole metres (4) to the decimal part ($0.25$): $4 + 0.25 = 4.25$ metres.' },
            { text: 'Verify the result by checking place values: 4 is in the ones place, 2 is in the tenths place ($\\frac{2}{10}$ or 20 cm),.', faded: true, blankAnswer: '$4.25$ metres' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch03_008', title: 'Identify each idea',
          dissect: { specimen: 'Another Peek Beyond The Point', spots: [
            { id: 's1', label: 'Locating decimals on the number', prompt: 'Which idea is this? — Locating decimals on the number line involves identifying the precise position of a.', answer: 'Locating decimals on the number', options: ['Locating decimals on the number', 'The addition of decimal numbers', 'Dividing a decimal number by', 'The need for smaller units'] },
            { id: 's2', label: 'The addition of decimal numbers', prompt: 'Which idea is this? — The addition of decimal numbers is the mathematical process of combining two or more.', answer: 'The addition of decimal numbers', options: ['The addition of decimal numbers', 'Locating decimals on the number', 'Dividing a decimal number by', 'The need for smaller units'] },
            { id: 's3', label: 'Dividing a decimal number by', prompt: 'Which idea is this? — Dividing a decimal number by another decimal number involves converting the divisor into.', answer: 'Dividing a decimal number by', options: ['Dividing a decimal number by', 'Locating decimals on the number', 'The addition of decimal numbers', 'The need for smaller units'] },
            { id: 's4', label: 'The need for smaller units', prompt: 'Which idea is this? — The need for smaller units arises when whole numbers and standard large measurement units.', answer: 'The need for smaller units', options: ['The need for smaller units', 'Locating decimals on the number', 'The addition of decimal numbers', 'Dividing a decimal number by'] },
            { id: 's5', label: 'The tenth part represents one', prompt: 'Which idea is this? — The tenth part represents one of ten equal parts of a whole unit, expressed as the.', answer: 'The tenth part represents one', options: ['The tenth part represents one', 'Locating decimals on the number', 'The addition of decimal numbers', 'Dividing a decimal number by'] },
            { id: 's6', label: 'A hundredth part is one', prompt: 'Which idea is this? — A hundredth part is one of one hundred equal parts of a whole, represented as the.', answer: 'A hundredth part is one', options: ['A hundredth part is one', 'Locating decimals on the number', 'The addition of decimal numbers', 'Dividing a decimal number by'] }
          ] } }
    ],
    explore: { component: C7_MathematicsAnotherPeekBeyondThePointSim, prompt: 'Explore the interactive — Another Peek Beyond The Point' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch03_006', difficulty: 'standard',
          question: 'Locating decimals on the number line involves identifying the precise position.',
          hint: 'Review c6_math_ch03_037 to practice dividing number line intervals into fractions before.',
          misconception: 'Students often miscount the tick marks on a number line because they count the *lines* (lines drawn) rather than the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Locating decimals on the number line involves identifying the precise position of a',
                  options: ['Locating decimals on the number line involves identifying the precise position of a', 'The addition of decimal numbers is the mathematical process of combining two or more', 'Dividing a decimal number by another decimal number involves converting the divisor into', 'The need for smaller units arises when whole numbers and standard large measurement units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often miscount the tick marks on a number line because they count the *lines* (lines drawn) rather than the *spaces* (intervals.' }
          ],
            remediations: { 'students-often-miscount-the-tick': { steps: ['Remind the student to use a "hop" method instead of counting tick marks directly.', 'Say: "Put your pencil tip on the whole number $1$.', 'Do not count that line as a jump.', 'As you move your pencil to the first small line to the right, say \'one hop, that\'s $1.1$\'.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_008', difficulty: 'standard',
          question: 'The addition of decimal numbers is the mathematical process of combining two or.',
          hint: 'Review c7_math_ch03_004 to practice identifying place values before attempting addition.',
          misconception: 'Students frequently misalign decimal numbers by right-justifying them as if they were whole numbers (treating $12.4 +.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The addition of decimal numbers is the mathematical process of combining two or more',
                  options: ['The addition of decimal numbers is the mathematical process of combining two or more', 'Locating decimals on the number line involves identifying the precise position of a', 'Dividing a decimal number by another decimal number involves converting the divisor into', 'The need for smaller units arises when whole numbers and standard large measurement units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misalign decimal numbers by right-justifying them as if they were whole numbers (treating $12.4 + 3.15$ as $12.4 +.' }
          ],
            remediations: { 'students-frequently-misalign-decimal-numbers': { steps: ['When a student makes a right-alignment error, have them draw vertical grid lines for each place value column:.', 'Physically force them to write the decimal points in the exact same vertical grid column before writing any digits.', 'Remind them: "The decimal point is the anchor; never move the anchor, fill empty spaces with placeholder zeros instead!"'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_005', difficulty: 'standard',
          question: 'Dividing a decimal number by another decimal number involves converting the.',
          hint: 'Review c7_math_ch12_001 to practice shifting decimal points when multiplying by powers of.',
          misconception: 'Students often shift the decimal point in the divisor to make it a whole number but forget to shift the decimal point.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dividing a decimal number by another decimal number involves converting the divisor into',
                  options: ['Dividing a decimal number by another decimal number involves converting the divisor into', 'Locating decimals on the number line involves identifying the precise position of a', 'The addition of decimal numbers is the mathematical process of combining two or more', 'The need for smaller units arises when whole numbers and standard large measurement units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often shift the decimal point in the divisor to make it a whole number but forget to shift the decimal point in the dividend by.' }
          ],
            remediations: { 'students-often-shift-the-decimal': { steps: ['If a student makes this error, guide them back to fraction notation.', 'Ask them to write the division as a fraction: $\\frac{4.5}{0.2}$.', 'Remind them of the golden rule of fractions: whatever you multiply the denominator by to clear the decimal, you MUST.', 'Say: "If we multiply the bottom by $10$ to make it $2$, we must multiply the top by $10$ to make it $45$.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_001', difficulty: 'standard',
          question: 'The need for smaller units arises when whole numbers and standard large.',
          hint: 'Review c6_math_ch03_029 (Introduction to Fractions) to reinforce how a single unit can be.',
          misconception: 'Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers rather than parts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The need for smaller units arises when whole numbers and standard large measurement units',
                  options: ['The need for smaller units arises when whole numbers and standard large measurement units', 'Locating decimals on the number line involves identifying the precise position of a', 'The addition of decimal numbers is the mathematical process of combining two or more', 'Dividing a decimal number by another decimal number involves converting the divisor into'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the smaller fractional parts (tenths, hundredths) as independent whole numbers rather than parts of a whole, leading.' }
          ],
            remediations: { 'students-often-treat-the-smaller': { steps: ['When a student struggles with smaller units, guide them back to physical partitioning: take a paper strip, fold it into.', 'Ask them: \'If I have 3 full strips and 4 tiny segments, can I write this as 34?\' Show them that 34 is a large whole.', 'Reinforce that the denominator tells us how many equal pieces make one whole.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_002', difficulty: 'standard',
          question: 'The tenth part represents one of ten equal parts of a whole unit, expressed as.',
          hint: 'Review c6_math_ch03_029 (Introduction to Fractions) and c6_math_ch04_042 (Introduction to.',
          misconception: 'Students often write the fraction $\\frac{1}{10}$ as decimal $0.01$ instead of $0.1$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tenth part represents one of ten equal parts of a whole unit, expressed as the',
                  options: ['The tenth part represents one of ten equal parts of a whole unit, expressed as the', 'Locating decimals on the number line involves identifying the precise position of a', 'The addition of decimal numbers is the mathematical process of combining two or more', 'Dividing a decimal number by another decimal number involves converting the divisor into'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the fraction $\\frac{1}{10}$ as decimal $0.01$ instead of $0.1$.' }
          ],
            remediations: { 'students-often-write-the-fraction': { steps: ['Remind the student to count the number of zeros in the denominator of the fraction $\\frac{1}{10}$.', 'Show them a place value chart where the column immediately to the right of the decimal point is labelled "Tenths" and.', 'Have them practice writing fractions like $\\frac{1}{10}, \\frac{2}{10}, \\frac{9}{10}$ directly as $0.1, 0.2, 0.9$.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch03_003', difficulty: 'standard',
          question: 'A hundredth part is one of one hundred equal parts of a whole, represented as.',
          hint: 'Review c7_math_ch03_002 to reinforce how a single whole is divided into 10 equal parts.',
          misconception: 'Students frequently misinterpret the place value of zeros in decimals, writing $\\frac{6}{100}$ as $0.6$ instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A hundredth part is one of one hundred equal parts of a whole, represented as the',
                  options: ['A hundredth part is one of one hundred equal parts of a whole, represented as the', 'Locating decimals on the number line involves identifying the precise position of a', 'The addition of decimal numbers is the mathematical process of combining two or more', 'Dividing a decimal number by another decimal number involves converting the divisor into'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misinterpret the place value of zeros in decimals, writing $\\frac{6}{100}$ as $0.6$ instead of $0.06$.' }
          ],
            remediations: { 'students-frequently-misinterpret-the-place': { steps: ['If a student writes $\\frac{6}{100}$ as $0.6$, guide them back to the fraction meaning: ask them "What is.', 'Then ask "Is $\\frac{6}{100}$ ten times smaller than $\\frac{6}{10}$?" Show them a 10x10 grid where 6 out of 100 squares.', 'Emphasize that because there are no full columns (tenths) shaded, we must write a $0$ in the tenths place to hold the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
