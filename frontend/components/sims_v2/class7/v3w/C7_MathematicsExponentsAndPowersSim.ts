import type { SimDef } from '../../engine/types';
import C7_MathematicsExponentsAndPowersSim from '../../../simulations/c6_12/C7_MathematicsExponentsAndPowersSim';

/** v3 wrapped master — C7_MathematicsExponentsAndPowersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsexponentsandpowerssim: SimDef = {
    id: 'v3w_c7_mathematicsexponentsandpowerssim',
    title: 'Exponents And Powers',
    subtitle: 'Covers multiplication and division of finite decimals by positive powers of 10 (10, 100,.',
    classLevel: 7, subject: 'mathematics', topic: 'Shifting Decimal Point When Multiplying/Dividing by 10, 100, 1000',
    chapters: [],
    nodeIds: ['c7_math_ch12_006', 'c7_math_ch04_007', 'c7_math_ch02_002', 'c7_math_ch11_008', 'c7_math_ch12_001', 'c7_math_ch12_002', 'c7_math_ch12_005', 'c7_math_ch04_008', 'c7_math_ch01_009', 'c7_math_ch02_008', 'c7_math_ch04_006', 'c7_math_ch01_002', 'c7_math_ch01_008', 'c7_math_ch11_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at the vegetable market buying tomatoes, and the shopkeeper tells you that 1 kg costs ₹45.85,.', goal: 'Master Exponents And Powers.' },
    discovery: {
        question: 'What does the letter \'D\' stand for in the BODMAS rule used for evaluating arithmetic expressions?',
        options: ['The letter \'D\' stands for Division', 'Decimal', 'Double'],
        answer: 'The letter \'D\' stands for Division',
        hook: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of.',
    },
    teaching: [
        { title: 'Multiplying a decimal number by 10, 100, or.', text: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by 1, 2, or 3 places respectively, while dividing by 10, 100, or 1000 shifts the decimal point to the left by 1,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch12_006', title: 'Multiplying a decimal number by 10,.',
          scaffold: { problem: 'A school ordered $100$ science textbooks, and each textbook weighs $1.25$ kg. What is the total weight of the books in kilograms?',
            steps: [
            { text: 'Identify given information. Weight of one textbook = $1.25$ kg; number of textbooks = $100$.' },
            { text: 'Determine the mathematical operation required. Finding the total weight for multiple items requires multiplication:.' },
            { text: 'Count the number of zeros in the multiplier ($100$ has two zeros), which tells us to shift the decimal point two places.' },
            { text: 'Perform the shift algebraically: starting at $1.25$, move the decimal point past $2$ and $5$, resulting in $125$.' },
            { text: 'Verify with units: $1.25 \\text{ kg} \\times 100 = 125 \\text{ kg}$.', faded: true, blankAnswer: '$125 \\text{ kg}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_007', title: 'Combining like terms is the algebraic.',
          scaffold: { problem: 'Riya went to the market and bought $5x$ notebooks and $3y$ pens. Later, she bought another $2x$ notebooks and lost $y$ pens.',
            steps: [
            { text: 'Translate the word problem into an initial algebraic expression: $5x + 3y + 2x - y$.' },
            { text: 'Identify and group the like terms together: $(5x + 2x) + (3y - y)$.' },
            { text: 'Combine the coefficients of the $x$ terms: $5 + 2 = 7$, giving $7x$.' },
            { text: 'Combine the coefficients of the $y$ terms (remembering that $-y$ has an invisible coefficient of $-1$): $3 - 1 = 2$,.' },
            { text: 'Write the final combined expression with all simplified parts: $7x + 2y$.', faded: true, blankAnswer: '$7x + 2y$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_002', title: 'Evaluating an arithmetic expression.',
          scaffold: { problem: 'Riya went to a book fair in Kolkata and bought 4 storybooks at ₹50 each and 3 science comics at ₹30 each.',
            steps: [
            { text: 'Identify the given expression: $4 \\times 50 + 3 \\times 30 + 20 - 15$.' },
            { text: 'Apply BODMAS by identifying multiplication operations that must be computed first: $4 \\times 50$ and $3 \\times 30$.' },
            { text: 'Compute the multiplications: $4 \\times 50 = 200$ and $3 \\times 30 = 90$, so the expression updates to $200 + 90 + 20 -.' },
            { text: 'Perform addition and subtraction from left to right: first compute $200 + 90 = 290$, then $290 + 20 = 310$, and finally.' },
            { text: 'Verify the steps and append the correct unit (rupees): Total amount paid is ₹295.', faded: true, blankAnswer: '₹295' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch11_008', title: 'Finding the Least Common Multiple (LCM).',
          scaffold: { problem: 'Two runner athletes are training on a circular running track at a local sports stadium in Delhi.',
            steps: [
            { text: 'Identify the numbers to find the LCM for, which are 40 and 60 seconds.' },
            { text: 'Find the prime factorisation of 40 by dividing by prime numbers: $40 \\div 2 = 20$, $20 \\div 2 = 10$, $10 \\div 2 = 5$,.' },
            { text: 'Find the prime factorisation of 60 by dividing by prime numbers: $60 \\div 2 = 30$, $30 \\div 2 = 15$, $15 \\div 3 = 5$,.' },
            { text: 'List all unique prime factors (2, 3, and 5) and select the highest power for each: for 2 it is $2^3$, for 3 it is.' },
            { text: 'Multiply these highest powers together: $LCM = 2^3 \\times 3^1 \\times 5^1 = 8 \\times 3 \\times 5 = 24 \\times 5 = 120$.', faded: true, blankAnswer: '120 seconds' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_001', title: 'Decimals are an extension of our place.',
          scaffold: { problem: 'Rahul bought a notebook for ₹35.5, a pen for ₹12.75, and an eraser for ₹2.025.',
            steps: [
            { text: 'Align the decimal numbers by their decimal points to add them properly: $35.500 + 12.750 + 2.025$.' },
            { text: 'Add the thousandths place: $0 + 0 + 5 = 5$.' },
            { text: 'Add the hundredths place: $0 + 5 + 2 = 7$; add the tenths place: $5 + 7 + 0 = 12$ (write $2$, carry over $1$ to the.' },
            { text: 'Add the whole number part with the carry over: $35 + 12 + 2 + 1 = 50$, giving a total of $50.275$ rupees.' },
            { text: 'Express the decimal fraction part ($0.275$) as a fraction: $\\frac{275}{1,000}$, and simplify by dividing numerator and.', faded: true, blankAnswer: '₹50.275 (Fifty rupees and two hundred seventy-five.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_002', title: 'Multiplying a decimal number by a whole.',
          scaffold: { problem: 'A school cooperative store sells a geometry box for ₹54.50. If a teacher purchases 6 geometry boxes for the classroom, what is the total.',
            steps: [
            { text: 'Identify the given values: cost of one geometry box = ₹54.50, number of boxes = 6.' },
            { text: 'Set up the multiplication expression: $54.50 \\times 6$.' },
            { text: 'Multiply the numbers without the decimal point: $5450 \\times 6$.' },
            { text: 'Count the decimal places in the original decimal factor ($54.50$ has two decimal places).' },
            { text: 'Place the decimal point two places from the right in the product $32700$, resulting in $327.00$, with units in rupees.', faded: true, blankAnswer: '₹327.00' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch04_007', title: 'Identify each idea',
          dissect: { specimen: 'Exponents And Powers', spots: [
            { id: 's1', label: 'Multiplying a decimal number by', prompt: 'Which idea is this? — Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by.', answer: 'Multiplying a decimal number by', options: ['Multiplying a decimal number by', 'Combining like terms is the', 'Evaluating an arithmetic expression requires', 'Finding the Least Common Multiple'] },
            { id: 's2', label: 'Combining like terms is the', prompt: 'Which idea is this? — Combining like terms is the algebraic process of simplifying expressions by adding or.', answer: 'Combining like terms is the', options: ['Combining like terms is the', 'Multiplying a decimal number by', 'Evaluating an arithmetic expression requires', 'Finding the Least Common Multiple'] },
            { id: 's3', label: 'Evaluating an arithmetic expression requires', prompt: 'Which idea is this? — Evaluating an arithmetic expression requires computing its final numerical value by.', answer: 'Evaluating an arithmetic expression requires', options: ['Evaluating an arithmetic expression requires', 'Multiplying a decimal number by', 'Combining like terms is the', 'Finding the Least Common Multiple'] },
            { id: 's4', label: 'Finding the Least Common Multiple', prompt: 'Which idea is this? — Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each.', answer: 'Finding the Least Common Multiple', options: ['Finding the Least Common Multiple', 'Multiplying a decimal number by', 'Combining like terms is the', 'Evaluating an arithmetic expression requires'] },
            { id: 's5', label: 'Decimals are an extension of', prompt: 'Which idea is this? — Decimals are an extension of our place value system used to represent numbers smaller.', answer: 'Decimals are an extension of', options: ['Decimals are an extension of', 'Multiplying a decimal number by', 'Combining like terms is the', 'Evaluating an arithmetic expression requires'] }
          ] } }
    ],
    explore: { component: C7_MathematicsExponentsAndPowersSim, prompt: 'Explore the interactive — Exponents And Powers' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch12_006', difficulty: 'standard',
          question: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to.',
          hint: 'Review place value columns (tenths, hundredths, thousandths) and how each position is 10.',
          misconception: 'Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by',
                  options: ['Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by', 'Combining like terms is the algebraic process of simplifying expressions by adding or', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when trailing or leading.' }
          ],
            remediations: { 'students-often-miscount-the-number': { steps: ['If a student struggles with shift direction or adding place holders, have them physically write the number on squared.', 'Instruct them: "For multiplication (making the number bigger), slide your finger to the right by as many jumps as there.', 'For division (making the number smaller), slide your finger to the left.', 'If you run out of digits while jumping, fill the empty grid boxes with zeros."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_007', difficulty: 'standard',
          question: 'Combining like terms is the algebraic process of simplifying expressions by.',
          hint: 'Review c7_math_ch04_002 to practice identifying coefficients and variable parts correctly.',
          misconception: 'Students frequently add or multiply the variables themselves along with the coefficients, or they combine terms with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Combining like terms is the algebraic process of simplifying expressions by adding or',
                  options: ['Combining like terms is the algebraic process of simplifying expressions by adding or', 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently add or multiply the variables themselves along with the coefficients, or they combine terms with different exponents.' }
          ],
            remediations: { 'students-frequently-add-or-multiply': { steps: ['If a student struggles, guide them to circle or underline like terms using different shapes or colors (e.g., box all.', 'Remind them that variables represent labels or units that never change during addition or subtraction—only the number.', 'Have them practice integer operations separately before applying them to coefficients.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_002', difficulty: 'standard',
          question: 'Evaluating an arithmetic expression requires computing its final numerical.',
          hint: 'Review c6_math_ch02_022 and c6_math_ch02_019 to ensure solid foundational computation.',
          misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of.',
          parts: [
                { id: 'a', prompt: 'What does the letter \'D\' stand for in the BODMAS rule used for evaluating arithmetic expressions?', answer: 'The letter \'D\' stands for Division',
                  options: ['The letter \'D\' stands for Division', 'Decimal', 'Double'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of multiplication and.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Circle all multiplication and division chunks (e.g., $5 \\times 2$).', 'Calculate those chunks first.', 'Rewrite the expression with the new values.', 'Now do addition and subtraction from left to right.\' Practice this boxing technique with 3 mixed-operation problems.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch11_008', difficulty: 'standard',
          question: 'Finding the Least Common Multiple (LCM) by prime factorisation involves.',
          hint: 'Review c6_math_ch01_015 to practice breaking numbers down into prime factors using.',
          misconception: 'Students often confuse the rules for LCM and HCF when looking at prime factorisation forms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each',
                  options: ['Finding the Least Common Multiple (LCM) by prime factorisation involves expressing each', 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by', 'Combining like terms is the algebraic process of simplifying expressions by adding or', 'Evaluating an arithmetic expression requires computing its final numerical value by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the rules for LCM and HCF when looking at prime factorisation forms.' }
          ],
            remediations: { 'students-often-confuse-the-rules': { steps: ['Remind the student of what a "multiple" means: it must be a number that is *larger* than or equal to the given numbers,.', 'Tell them: "For LCM, think \'L\' for \'Largest power\' of every prime factor." Have them write out both prime.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_001', difficulty: 'standard',
          question: 'Decimals are an extension of our place value system used to represent numbers.',
          hint: 'Review c6_math_ch04_043 to practice identifying place values of digits to the right of.',
          misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater.',
          parts: [
                { id: 'a', prompt: 'What is the place value of the digit $7$ in the decimal number $45.278$?', answer: 'The correct answer is hundredths (or $\\frac{7}{100}$ or $0.07$)',
                  options: ['The correct answer is hundredths (or $\\frac{7}{100}$ or $0.07$)', 'tenths', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' },
                { id: 'b', prompt: 'Convert the mixed fraction $5 \\frac{3}{8}$ into a decimal number by finding an equivalent fraction with a denominator of $1,000$.', answer: 'The correct answer is $5.375$',
                  options: ['The correct answer is $5.375$', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' },
                { id: 'c', prompt: 'Analyze the number $8.452$. How many times larger is the value of the digit $4$ in the tenths place than the value of the digit $2$ in the thousandths place?', answer: 'The correct answer is $200$ times larger',
                  options: ['The correct answer is $200$ times larger', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' }
          ],
            remediations: { 'the-longer-a-decimal-number': { steps: ['Remind the student to pad shorter decimals with zeros on the right so that every number being compared has the same.', 'Ask them: "Which is larger, $500$ parts out of $1,000$ or $452$ parts out of $1,000$?" Emphasize that we always compare.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following student statement: "To order the decimals $0.5, 0.45$, and $0.512$ from least to greatest, I just look at the last digit, so the order.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' },
                { id: 'b', prompt: 'Create a decimal number that satisfies all three conditions: (1) It has three decimal places, (2) The digit in the hundredths place is twice the digit in the.', answer: 'An expected correct answer is $4.521$ (since digits are $4, 5, 2, 1$',
                  options: ['An expected correct answer is $4.521$ (since digits are $4, 5, 2, 1$', 'the longer a decimal number is, the larger its value (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that the longer a decimal number is, the larger its value (e.g., believing $0.452$ is greater than $0.5$ because.' }
          ],
            remediations: { 'the-longer-a-decimal-number': { steps: ['Remind the student to pad shorter decimals with zeros on the right so that every number being compared has the same.', 'Ask them: "Which is larger, $500$ parts out of $1,000$ or $452$ parts out of $1,000$?" Emphasize that we always compare.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_002', difficulty: 'standard',
          question: 'Multiplying a decimal number by a whole number involves multiplying the numbers.',
          hint: 'Review whole number multiplication algorithms and place value expansion from Class 6.',
          misconception: 'Students often align the decimal points vertically as they do in addition and subtraction, or they miscount the total.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying a decimal number by a whole number involves multiplying the numbers as if',
                  options: ['Multiplying a decimal number by a whole number involves multiplying the numbers as if', 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by', 'Combining like terms is the algebraic process of simplifying expressions by adding or', 'Evaluating an arithmetic expression requires computing its final numerical value by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often align the decimal points vertically as they do in addition and subtraction, or they miscount the total number of decimal.' }
          ],
            remediations: { 'students-often-align-the-decimal': { steps: ['Remind the student to ignore the decimal point initially and perform standard whole-number multiplication: write $125.', 'Next, instruct them to count the exact number of digits to the right of the decimal point in the original decimal.', 'Finally, have them start from the rightmost digit of the product and count back that exact number of places to insert.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
