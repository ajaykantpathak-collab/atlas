import type { SimDef } from '../../engine/types';
import C7_MathematicsMultiplicationDivisionDecimalSim from '../../../simulations/c6_12/C7_MathematicsMultiplicationDivisionDecimalSim';

/** v3 wrapped master — C7_MathematicsMultiplicationDivisionDecimalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsmultiplicationdivisiondecimalsim: SimDef = {
    id: 'v3w_c7_mathematicsmultiplicationdivisiondecimalsim',
    title: 'Operations with Large Numbers: Multiplication and Division',
    subtitle: 'Covers multiplication and division of whole numbers up to 8 digits (crores) in the Indian.',
    classLevel: 7, subject: 'mathematics', topic: 'Operations with Large Numbers: Multiplication and Division',
    chapters: [],
    nodeIds: ['c7_math_ch01_011', 'c7_math_ch08_003', 'c7_math_ch12_004', 'c7_math_ch12_006', 'c7_math_ch12_007', 'c7_math_ch12_008', 'c7_math_ch12_009', 'c7_math_ch12_010', 'c7_math_ch10_002', 'c7_math_ch02_002', 'c7_math_ch02_008', 'c7_math_ch01_009', 'c7_math_ch01_006', 'c7_math_ch03_001', 'c7_math_ch12_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine your city\'s municipal corporation collects water bills from 35,420 households every single month, and.', goal: 'Master Operations with Large Numbers: Multiplication and Division.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Operations with large numbers:.', text: 'Operations with large numbers: multiplication and division involves finding the product of multi-digit numbers (up to 8 digits and beyond, into lakhs and crores) or sharing/distributing a large total.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch01_011', title: 'Operations with large numbers:.',
          scaffold: { problem: 'A textile mill in Surat weaves 2,45,810 metres of fabric every month. What is the total length of fabric woven in 2 years and 6 months?',
            steps: [
            { text: 'Convert the total time into months. 2 years = $2 \\times 12 = 24$ months. Total months = $24 + 6 = 30$ months.' },
            { text: 'Set up the multiplication expression: $2,45,810 \\times 30$. We can split this as $2,45,810 \\times 3 \\times 10$.' },
            { text: 'Multiply $2,45,810$ by 3: $0 \\times 3 = 0$, $1 \\times 3 = 3$, $8 \\times 3 = 24$ (write 4, carry 2), $5 \\times 3 = 15 +.' },
            { text: 'Multiply the result by 10 (accounting for the zero in 30): $7,37,430 \\times 10 = 73,74,300$.' },
            { text: 'Verify with estimation: $2,50,000 \\times 30 = 75,00,000$, which is very close to our calculated exact value of.', faded: true, blankAnswer: '73,74,300 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch08_003', title: 'Multiplying two fractions involves.',
          scaffold: { problem: 'Riya buys $\\frac{3}{4}$ kg of sweets. Her brother eats $\\frac{2}{3}$ of these sweets.',
            steps: [
            { text: 'Identify the given quantities: Total sweets bought = $\\frac{3}{4}$ kg, fraction eaten by brother = $\\frac{2}{3}$ of the.' },
            { text: 'Determine the operation required: Finding a fraction of a fraction requires multiplication, so we need to compute.' },
            { text: 'Apply the numerator and denominator rule: Multiply numerators together and denominators together: $\\frac{2 \\times 3}{3.' },
            { text: 'Compute the intermediate product: $\\frac{6}{12}$.' },
            { text: 'Simplify the fraction by dividing the numerator and denominator by their greatest common divisor, 6: $\\frac{6 \\div.', faded: true, blankAnswer: '$\\frac{1}{2}$ kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_004', title: 'Decimal division by a whole number is.',
          scaffold: { problem: 'A roll of ribbon is $9.36$ metres long. If Sunita cuts it into $4$ equal pieces for a craft project, what is the length of each piece?',
            steps: [
            { text: 'Identify the given values: Total length = $9.36$ m, Number of pieces = $4$.' },
            { text: 'Set up the long division problem as $9.36 \\div 4$.' },
            { text: 'Divide the whole number part ($9$ ones $\\div 4$): $9 \\div 4 = 2$ with a remainder of $1$.' },
            { text: 'Bring down the tenths digit ($3$) to make $13$ tenths; $13 \\div 4 = 3$ tenths with a remainder of $1$ tenth.' },
            { text: 'Bring down the hundredths digit ($6$) to combine with the remainder, making $16$ hundredths; $16 \\div 4 = 4$.', faded: true, blankAnswer: '2.34 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_006', title: 'Multiplying a decimal number by 10,.',
          scaffold: { problem: 'A school ordered $100$ science textbooks, and each textbook weighs $1.25$ kg. What is the total weight of the books in kilograms?',
            steps: [
            { text: 'Identify given information. Weight of one textbook = $1.25$ kg; number of textbooks = $100$.' },
            { text: 'Determine the mathematical operation required. Finding the total weight for multiple items requires multiplication:.' },
            { text: 'Count the number of zeros in the multiplier ($100$ has two zeros), which tells us to shift the decimal point two places.' },
            { text: 'Perform the shift algebraically: starting at $1.25$, move the decimal point past $2$ and $5$, resulting in $125$.' },
            { text: 'Verify with units: $1.25 \\text{ kg} \\times 100 = 125 \\text{ kg}$.', faded: true, blankAnswer: '$125 \\text{ kg}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_007', title: 'Estimation and verification in decimal.',
          scaffold: { problem: 'Sunita buys 4.7 kg of apples at ₹82.50 per kg. She calculates the total cost as ₹3,877.50.',
            steps: [
            { text: 'Identify given values and goal. Quantity = 4.7 kg, Price per kg = ₹82.50. Calculated Total = ₹3,877.50.' },
            { text: 'Round each decimal to a convenient whole number for estimation. 4.7 rounds up to 5 kg.' },
            { text: 'Perform exact calculation to find the true product. $4.7 \\times 82.50$: First compute $47 \\times 825 = 38,775$.' },
            { text: 'Compare exact calculation ($38.775$) with estimate ($\\text{₹}400$).' },
            { text: 'Verify using inverse operation (division). Divide exact total by quantity: $38.775 \\div 4.7 = 82.50$, confirming the.', faded: true, blankAnswer: 'The correct total cost is ₹38.78 (or ₹38.775), and Sunita\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch12_008', title: 'Solving word problems involving decimal.',
          scaffold: { problem: 'A container holds $12.5\\text{ litres}$ of mustard oil. If $1\\text{ litre}$ of oil has a mass of $0.92\\text{ kg}$, what is the total mass of.',
            steps: [
            { text: 'Identify given values: Volume of oil = $12.5\\text{ litres}$, Mass of $1\\text{ litre}$ = $0.92\\text{ kg}$.' },
            { text: 'Determine operation: To find the total mass, multiply the volume by the mass per litre ($12.5 \\times 0.92$).' },
            { text: 'Perform multiplication ignoring decimals: $125 \\times 92$.' },
            { text: 'Count total decimal places: $12.5$ has $1$ decimal place and $0.92$ has $2$ decimal places, total = $3$ decimal places.' },
            { text: 'Interpret the result with units: The total mass is $11.5\\text{ kg}$.', faded: true, blankAnswer: '$11.5\\text{ kg}$' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch08_003', title: 'Identify each idea',
          dissect: { specimen: 'Operations with Large Numbers: Multiplication and Division', spots: [
            { id: 's1', label: 'Operations with large numbers multiplication', prompt: 'Which idea is this? — Operations with large numbers: multiplication and division involves finding the product.', answer: 'Operations with large numbers multiplication', options: ['Operations with large numbers multiplication', 'Multiplying two fractions involves multiplying', 'Decimal division by a whole', 'Multiplying a decimal number by'] },
            { id: 's2', label: 'Multiplying two fractions involves multiplying', prompt: 'Which idea is this? — Multiplying two fractions involves multiplying their numerators together to form the new.', answer: 'Multiplying two fractions involves multiplying', options: ['Multiplying two fractions involves multiplying', 'Operations with large numbers multiplication', 'Decimal division by a whole', 'Multiplying a decimal number by'] },
            { id: 's3', label: 'Decimal division by a whole', prompt: 'Which idea is this? — Decimal division by a whole number is the process of splitting a decimal quantity into a.', answer: 'Decimal division by a whole', options: ['Decimal division by a whole', 'Operations with large numbers multiplication', 'Multiplying two fractions involves multiplying', 'Multiplying a decimal number by'] },
            { id: 's4', label: 'Multiplying a decimal number by', prompt: 'Which idea is this? — Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by.', answer: 'Multiplying a decimal number by', options: ['Multiplying a decimal number by', 'Operations with large numbers multiplication', 'Multiplying two fractions involves multiplying', 'Decimal division by a whole'] },
            { id: 's5', label: 'Estimation and verification in decimal', prompt: 'Which idea is this? — Estimation and verification in decimal operations involve rounding numbers before.', answer: 'Estimation and verification in decimal', options: ['Estimation and verification in decimal', 'Operations with large numbers multiplication', 'Multiplying two fractions involves multiplying', 'Decimal division by a whole'] },
            { id: 's6', label: 'Solving word problems involving decimal', prompt: 'Which idea is this? — Solving word problems involving decimal multiplication and division requires translating.', answer: 'Solving word problems involving decimal', options: ['Solving word problems involving decimal', 'Operations with large numbers multiplication', 'Multiplying two fractions involves multiplying', 'Decimal division by a whole'] }
          ] } }
    ],
    explore: { component: C7_MathematicsMultiplicationDivisionDecimalSim, prompt: 'Explore the interactive — Operations with Large Numbers: Multiplication and Division' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch01_011', difficulty: 'standard',
          question: 'Operations with large numbers: multiplication and division involves finding the.',
          hint: 'Review c6_math_ch01_010 and c6_math_ch01_011 to practice standard multiplication and long.',
          misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Operations with large numbers: multiplication and division involves finding the product',
                  options: ['Operations with large numbers: multiplication and division involves finding the product', 'Multiplying two fractions involves multiplying their numerators together to form the new', 'Decimal division by a whole number is the process of splitting a decimal quantity into a', 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller than the divisor, or.' }
          ],
            remediations: { 'students-frequently-drop-a-place': { steps: ['Guide the student by rewriting the division step-by-step using explicit place-value columns.', 'Say: "Let\'s check each digit from left to right.', 'When we bring down a digit and it is less than our divisor, what must we write in the quotient before bringing down the.', 'Always write a 0 to hold that place value, then bring down the next digit." Practice estimating the quotient first.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch08_003', difficulty: 'standard',
          question: 'Multiplying two fractions involves multiplying their numerators together to.',
          hint: 'Review c6_math_ch03_030 for converting mixed fractions and c6_math_ch01_015 for finding.',
          misconception: 'Students frequently multiply the numerators but mistakenly add the denominators together (e.g., calculating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying two fractions involves multiplying their numerators together to form the new',
                  options: ['Multiplying two fractions involves multiplying their numerators together to form the new', 'Operations with large numbers: multiplication and division involves finding the product', 'Decimal division by a whole number is the process of splitting a decimal quantity into a', 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently multiply the numerators but mistakenly add the denominators together (e.g., calculating $\\frac{2}{3} \\times.' }
          ],
            remediations: { 'students-frequently-multiply-the-numerators': { steps: ['Remind the student that multiplication is an independent operation that scales quantities without needing common.', 'Show them visually with a grid: shade $\\frac{2}{3}$ vertically and $\\frac{4}{5}$ horizontally to prove that the.', 'Emphasize the verbal rule: "Top times top, bottom times bottom."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_004', difficulty: 'standard',
          question: 'Decimal division by a whole number is the process of splitting a decimal.',
          hint: 'Review c7_math_ch12_001 to solidify decimal place value before attempting division.',
          misconception: 'Students frequently misplace the decimal point in the quotient when the whole number part of the dividend is smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decimal division by a whole number is the process of splitting a decimal quantity into a',
                  options: ['Decimal division by a whole number is the process of splitting a decimal quantity into a', 'Operations with large numbers: multiplication and division involves finding the product', 'Multiplying two fractions involves multiplying their numerators together to form the new', 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misplace the decimal point in the quotient when the whole number part of the dividend is smaller than the divisor.' }
          ],
            remediations: { 'students-frequently-misplace-the-decimal': { steps: ['If a student misplaces the decimal point, pause and ask them to estimate the answer first using whole numbers or bounds.', 'No, so our answer must be less than $1$.").', 'Guide them to write a $0$ in the ones place before looking at the tenths column, and mandate checking every division.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_006', difficulty: 'standard',
          question: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to.',
          hint: 'Review place value columns (tenths, hundredths, thousandths) and how each position is 10.',
          misconception: 'Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by',
                  options: ['Multiplying a decimal number by 10, 100, or 1000 shifts the decimal point to the right by', 'Operations with large numbers: multiplication and division involves finding the product', 'Multiplying two fractions involves multiplying their numerators together to form the new', 'Decimal division by a whole number is the process of splitting a decimal quantity into a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often miscount the number of zeros in powers of 10 or confuse the direction of the shift, especially when trailing or leading.' }
          ],
            remediations: { 'students-often-miscount-the-number': { steps: ['If a student struggles with shift direction or adding place holders, have them physically write the number on squared.', 'Instruct them: "For multiplication (making the number bigger), slide your finger to the right by as many jumps as there.', 'For division (making the number smaller), slide your finger to the left.', 'If you run out of digits while jumping, fill the empty grid boxes with zeros."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_007', difficulty: 'standard',
          question: 'Estimation and verification in decimal operations involve rounding numbers.',
          hint: 'Review rounding decimals (c6_math_ch04_050) and basic decimal multiplication placement.',
          misconception: 'Students frequently misplace the decimal point in multiplication or division and fail to use estimation as a sanity.',
          parts: [
                { id: 'a', prompt: 'When dividing $45.6$ by $3.8$, Priya gets an exact quotient of $1.2$. Use estimation to analyze why Priya\'s answer is mathematically impossible.', answer: 'The correct answer is B',
                  options: ['The correct answer is B', 'division always increases values, confusing it with multiplication'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misplace the decimal point in multiplication or division and fail to use estimation as a sanity check.' }
          ],
            remediations: { 'students-frequently-misplace-the-decimal': { steps: ['Stop the student immediately when an unreasonable number is written down.', 'Say: "Let\'s pause and estimate first before looking at all the digits.', 'What whole numbers are these decimals closest to?" Guide them to round each factor to the nearest whole number (e.g.,.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently misplace the decimal point in multiplication or division and fail to use estimation as a sanity.',
          parts: [
                { id: 'a', prompt: 'When dividing $45.6$ by $3.8$, Priya gets an exact quotient of $1.2$. Use estimation to analyze why Priya\'s answer is mathematically impossible.', answer: 'The correct answer is B',
                  options: ['The correct answer is B', 'division always increases values, confusing it with multiplication'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently misplace the decimal point in multiplication or division and fail to use estimation as a sanity check.' }
          ],
            remediations: { 'students-frequently-misplace-the-decimal': { steps: ['Stop the student immediately when an unreasonable number is written down.', 'Say: "Let\'s pause and estimate first before looking at all the digits.', 'What whole numbers are these decimals closest to?" Guide them to round each factor to the nearest whole number (e.g.,.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch12_008', difficulty: 'standard',
          question: 'Solving word problems involving decimal multiplication and division requires.',
          hint: 'Review decimal place value and decimal multiplication/division rules in c7_math_ch12_003.',
          misconception: 'Students often misplace the decimal point during division in word problems because they forget to scale both the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Solving word problems involving decimal multiplication and division requires translating',
                  options: ['Solving word problems involving decimal multiplication and division requires translating', 'Operations with large numbers: multiplication and division involves finding the product', 'Multiplying two fractions involves multiplying their numerators together to form the new', 'Decimal division by a whole number is the process of splitting a decimal quantity into a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often misplace the decimal point during division in word problems because they forget to scale both the dividend and the divisor.' }
          ],
            remediations: { 'students-often-misplace-the-decimal': { steps: ['Remind the student to always convert the divisor into a whole number first by shifting the decimal point to the right.', 'Count how many decimal places the divisor has, and shift the decimal point in the dividend by the exact same number of.', 'Say: "Before you divide, clear the decimal from the number you are dividing *by* (the divisor) by multiplying both.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
