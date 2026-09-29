import type { SimDef } from '../../engine/types';
import C7_MathematicsLargeNumbersAroundUsSim from '../../../simulations/c6_12/C7_MathematicsLargeNumbersAroundUsSim';

/** v3 wrapped master — C7_MathematicsLargeNumbersAroundUsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicslargenumbersaroundussim: SimDef = {
    id: 'v3w_c7_mathematicslargenumbersaroundussim',
    title: 'Place Value System: Extending to 6 and 7 Digits',
    subtitle: 'Covers 6-digit (lakhs) and 7-digit (ten lakhs) whole numbers within the Indian numeration.',
    classLevel: 7, subject: 'mathematics', topic: 'Place Value System: Extending to 6 and 7 Digits',
    chapters: [],
    nodeIds: ['c7_math_ch01_002', 'c7_math_ch01_003', 'c7_math_ch01_004', 'c7_math_ch01_005', 'c7_math_ch01_006', 'c7_math_ch01_008', 'c7_math_ch01_009', 'c7_math_ch01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine the ticket collector at a busy railway station in Mumbai announces that 4,52,389 passengers traveled.', goal: 'Master Place Value System: Extending to 6 and 7 Digits.' },
    discovery: {
        question: 'Explain why the digit \'5\' has a different value in the number 5,23,456 depending on which position it occupies.',
        options: ['The first \'5\' is in the Lakhs place, meaning it represents $5 \\times 1,00,000 =', 'face value', 'place value'],
        answer: 'The first \'5\' is in the Lakhs place, meaning it represents $5 \\times 1,00,000 =',
        hook: 'Students frequently misplace commas or misread 6 and 7-digit numbers by treating them like the International system.',
    },
    teaching: [
        { title: 'The place value system extends to 6-digit.', text: 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the Indian numbering system, where each digit\'s position to the left represents a value ten times greater than the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch01_002', title: 'The place value system extends to.',
          scaffold: { problem: 'A textile mill in Gujarat produced 8,45,612 meters of cloth in a year.',
            steps: [
            { text: 'Identify the given number and the new 7-digit number: Original is 8,45,612; New number with Ten Lakhs digit is.' },
            { text: 'Write out the place value expansion for 58,45,612: $5 \\times 10,00,000 + 8 \\times 1,00,000 + 4 \\times 10,000 + 5 \\times.' },
            { text: 'Identify the two place values where the digit \'5\' appears: one is in the Lakhs place ($5 \\times 1,00,000 = 5,00,000$).' },
            { text: 'Calculate the difference between these two place values: $50,00,000 - 5,00,000 = 45,00,000$.' },
            { text: 'Verify the result by checking column positions; the Ten Lakhs place is ten times the Lakhs place, so $50,00,000 -.', faded: true, blankAnswer: 'Expanded form: $5 \\times 10,00,000 + 8 \\times 1,00,000 + 4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_003', title: 'Reading and writing large numbers in.',
          scaffold: { problem: 'A city municipal corporation collected taxes amounting to `7845210` rupees last year.',
            steps: [
            { text: 'Identify the digits and write them down: 7845210.' },
            { text: 'Apply Indian system comma placement rules, starting from the right. Count 3 digits and place the first comma: 7845,210.' },
            { text: 'Identify the value of each period based on the commas: \'78\' is in the Lakhs period, \'45\' is in the Thousands period,.' },
            { text: 'Translate each group into words: 78 is "Seventy-eight lakh", 45 is "forty-five thousand", and 210 is "two hundred ten".' },
            { text: 'Combine all parts into the final written form: Seventy-eight lakh forty-five thousand two hundred ten rupees.', faded: true, blankAnswer: 'Seventy-eight lakh forty-five thousand two hundred ten.' }
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
        { type: 'scaffold', nodeId: 'c7_math_ch01_006', title: 'Estimation and approximation of large.',
          scaffold: { problem: 'A textile mill in Gujarat produced 47,82,345 metres of fabric this year.',
            steps: [
            { text: 'Identify the target place value for rounding, which is the \'lakhs\' place.' },
            { text: 'Look at the digit immediately to the right of the lakhs place (the ten-thousands place).' },
            { text: 'Apply the rounding rule. Since 8 is greater than or equal to 5, we round up the lakhs digit by adding 1 (7 + 1 = 8).' },
            { text: 'Replace all digits to the right of the lakhs place with zeros, keeping the digits to the left unchanged.' },
            { text: 'Verify the result: 47,82,345 is clearly between 47,00,000 and 48,00,000, and since 82,345 is greater than 50,000, it is.', faded: true, blankAnswer: '48,00,000 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_008', title: 'Patterns in products involve.',
          scaffold: { problem: 'A school is ordering notebooks. Pack A costs ₹9 $\\times$ ₹11, Pack B costs ₹99 $\\times$ ₹111, and Pack C costs ₹999 $\\times$ ₹1111.',
            steps: [
            { text: 'Identify the given sequence of product expressions: $9 \\times 11 = 99$, $99 \\times 111 = 10989$, $999 \\times 1111 =.' },
            { text: 'Rewrite the factors using powers of 10 or algebraic components, noting that $9999 = 10000 - 1$ and $11111 = 11111$.' },
            { text: 'Apply the pattern rule where the product of $n$ nines and $(n+1)$ ones yields a structure of leading ones, a zero,.' },
            { text: 'Verify algebraically by substituting $(10000 - 1) \\times 11111 = (10000 \\times 11111) - 11111 = 111110000 - 11111$.' },
            { text: 'Perform the subtraction: $111110000 - 00011111 = 111098889$ (Wait: let\'s recalculate accurately: $111110000 - 11111 =.', faded: true, blankAnswer: '₹110998889' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch01_003', title: 'Identify each idea',
          dissect: { specimen: 'Place Value System: Extending to 6 and 7 Digits', spots: [
            { id: 's1', label: 'The place value system extends', prompt: 'Which idea is this? — The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the.', answer: 'The place value system extends', options: ['The place value system extends', 'Reading and writing large numbers', 'A crore is an 8-digit', 'Comparing and ordering large numbers'] },
            { id: 's2', label: 'Reading and writing large numbers', prompt: 'Which idea is this? — Reading and writing large numbers in the Indian numbering system involves grouping digits.', answer: 'Reading and writing large numbers', options: ['Reading and writing large numbers', 'The place value system extends', 'A crore is an 8-digit', 'Comparing and ordering large numbers'] },
            { id: 's3', label: 'A crore is an 8-digit', prompt: 'Which idea is this? — A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten.', answer: 'A crore is an 8-digit', options: ['A crore is an 8-digit', 'The place value system extends', 'Reading and writing large numbers', 'Comparing and ordering large numbers'] },
            { id: 's4', label: 'Comparing and ordering large numbers', prompt: 'Which idea is this? — Comparing and ordering large numbers involves determining whether a large number is.', answer: 'Comparing and ordering large numbers', options: ['Comparing and ordering large numbers', 'The place value system extends', 'Reading and writing large numbers', 'A crore is an 8-digit'] },
            { id: 's5', label: 'Estimation and approximation of large', prompt: 'Which idea is this? — Estimation and approximation of large numbers involves replacing an exact large number.', answer: 'Estimation and approximation of large', options: ['Estimation and approximation of large', 'The place value system extends', 'Reading and writing large numbers', 'A crore is an 8-digit'] },
            { id: 's6', label: 'Patterns in products involve discovering', prompt: 'Which idea is this? — Patterns in products involve discovering, analyzing, and generalizing regularities or.', answer: 'Patterns in products involve discovering', options: ['Patterns in products involve discovering', 'The place value system extends', 'Reading and writing large numbers', 'A crore is an 8-digit'] }
          ] } }
    ],
    explore: { component: C7_MathematicsLargeNumbersAroundUsSim, prompt: 'Explore the interactive — Place Value System: Extending to 6 and 7 Digits' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch01_002', difficulty: 'standard',
          question: 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs).',
          hint: 'Review place value columns (Ones, Tens, Hundreds, Thousands, Ten Thousands) from.',
          misconception: 'Students frequently misplace commas or misread 6 and 7-digit numbers by treating them like the International system.',
          parts: [
                { id: 'a', prompt: 'Explain why the digit \'5\' has a different value in the number 5,23,456 depending on which position it occupies.', answer: 'The first \'5\' is in the Lakhs place, meaning it represents $5 \\times 1,00,000 =',
                  options: ['The first \'5\' is in the Lakhs place, meaning it represents $5 \\times 1,00,000 =', 'face value', 'place value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misplace commas or misread 6 and 7-digit numbers by treating them like the International system (grouping by threes.' }
          ],
            remediations: { 'students-frequently-misplace-commas-or': { steps: ['When a student struggles with place values or misplaces commas in 6- and 7-digit numbers, guide them back to the basic.', 'Have them physically place digits from right to left, noting that the comma separates the periods (the first comma.', 'If they drop zeros in expanded form, have them write out all place values vertically, including those multiplied by.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_003', difficulty: 'standard',
          question: 'Reading and writing large numbers in the Indian numbering system involves.',
          hint: 'Review place value columns from right to left (Ones, Tens, Hundreds, Thousands,.',
          misconception: 'Students often misplace commas or misread numbers by treating all periods as groups of three digits (like the.',
          parts: [
                { id: 'a', prompt: 'What are the four main periods in the Indian numeration system, starting from the rightmost group?', answer: 'The four main periods are Ones, Thousands, Lakhs, and Crores',
                  options: ['The four main periods are Ones, Thousands, Lakhs, and Crores', 'Units, Tens, Hundreds, Thousands'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often misplace commas or misread numbers by treating all periods as groups of three digits (like the International system) or by.' }
          ],
            remediations: { 'students-often-misplace-commas-or': { steps: ['If a student struggles with placeholder zeros, have them draw a blank place value chart with columns for Crores (Ten.', 'Guide them to write the given word digits under the correct column heading first, and explicitly instruct them to write.'] } } },
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
                  options: ['Comparing and ordering large numbers involves determining whether a large number is', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits', 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often compare large numbers by looking at the total number of digits ignoring place value alignment, or they look at the last few.' }
          ],
            remediations: { 'students-often-compare-large-numbers': { steps: ['Guide the student by writing both numbers vertically, aligned perfectly by place value columns from left to right.', 'Say: "Cover all digits with your hand except the leftmost column.', 'Compare those two digits first.', 'Only if they are equal do you uncover the next column to the right." Have them practice this column-by-column masking.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_006', difficulty: 'standard',
          question: 'Estimation and approximation of large numbers involves replacing an exact large.',
          hint: 'Review place value columns and basic rounding rules from c6_math_ch01_006 before tackling.',
          misconception: 'Students frequently look at the wrong digit when deciding whether to round up or down—for instance, looking at the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Estimation and approximation of large numbers involves replacing an exact large number',
                  options: ['Estimation and approximation of large numbers involves replacing an exact large number', 'The place value system extends to 6-digit (lakhs) and 7-digit (ten lakhs) numbers in the', 'Reading and writing large numbers in the Indian numbering system involves grouping digits', 'A crore is an 8-digit number in the Indian numbering system equal to 100 lakhs or ten'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently look at the wrong digit when deciding whether to round up or down—for instance, looking at the digit in the units or.' }
          ],
            remediations: { 'students-frequently-look-at-the': { steps: ['When a student makes a rounding error, guide them using a visual arrow technique: "Put your finger on the target place.', 'Now, draw an arrow to the immediate right neighbor.', 'Ask: Is this circled digit 5 or more?', 'If yes, add 1 to your target digit and change all digits to the right of the target to zeros.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_008', difficulty: 'standard',
          question: 'Patterns in products involve discovering, analyzing, and generalizing.',
          hint: 'Review none to practice identifying core sequence rules and number relationships.',
          misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or.',
          parts: [
                { id: 'a', prompt: 'What is the product of $111 \\times 111$ based on the pattern where $1 \\times 1 = 1$, $11 \\times 11 = 121$, and $1111 \\times 1111 = 12321$?', answer: 'The correct answer is $12321$',
                  options: ['The correct answer is $12321$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' },
                { id: 'b', prompt: 'Calculate the product of $9999 \\times 9999$ by expressing one factor as $(10000 - 1)$ and applying algebraic expansion.', answer: 'The correct answer is $99980001$',
                  options: ['The correct answer is $99980001$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' },
                { id: 'c', prompt: 'Analyze the pattern: $1 \\times 9 + 2 = 11$, $12 \\times 9 + 3 = 111$, $123 \\times 9 + 4 = 1111$. Predict the 5th line of this pattern and verify its correctness.', answer: 'The correct answer is $12345 \\times 9 + 6 = 111111$',
                  options: ['The correct answer is $12345 \\times 9 + 6 = 111111$', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' }
          ],
            remediations: { 'number-patterns-in-products-continue': { steps: ['Stop and have the student write out the multiplication step-by-step using the distributive property, such as breaking.', 'Show them that $99 \\times 99$ means $(100 - 1) \\times 99 = 9900 - 99$, which equals $9801$ (or $99 \\times 99 = 9801$),.', 'Emphasize that patterns are shorthand for true arithmetic calculations, not magical tricks.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or.',
          parts: [
                { id: 'a', prompt: 'Evaluate the student claim: "When multiplying any number by 11, you just write the number twice side-by-side, so $45 \\times 11 = 4545$." Is this correct, and.', answer: 'The claim is false',
                  options: ['The claim is false', 'number patterns in products continue purely by visual guesswork (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that number patterns in products continue purely by visual guesswork (e.g., adding zeros or sticking digits together).' }
          ],
            remediations: { 'number-patterns-in-products-continue': { steps: ['Stop and have the student write out the multiplication step-by-step using the distributive property, such as breaking.', 'Show them that $99 \\times 99$ means $(100 - 1) \\times 99 = 9900 - 99$, which equals $9801$ (or $99 \\times 99 = 9801$),.', 'Emphasize that patterns are shorthand for true arithmetic calculations, not magical tricks.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
