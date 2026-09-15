import type { SimDef } from '../../engine/types';
import C8_MathematicsDataHandlingSim from '../../../simulations/c6_12/C8_MathematicsDataHandlingSim';

/** v3 wrapped master — C8_MathematicsDataHandlingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsdatahandlingsim: SimDef = {
    id: 'v3w_c8_mathematicsdatahandlingsim',
    title: 'Data Handling',
    subtitle: 'Covers simple interest applications with annual rates, time periods in years/months/days,.',
    classLevel: 8, subject: 'mathematics', topic: 'Applications of Simple Interest in Real Life',
    chapters: [],
    nodeIds: ['c8_math_ch8_10', 'c8_math_ch8_4', 'c8_math_ch14_6', 'c8_math_ch6_2'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine your older sibling wants to buy a second-hand scooter for ₹45,000 but only has ₹30,000 saved.', goal: 'Master Data Handling.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Simple interest applications involve using.', text: 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times T}{100}\\) to solve real-world financial problems where interest is calculated only on the original principal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch8_10', title: 'Simple interest applications involve.',
          scaffold: { problem: 'Arjun takes a loan of ₹80,000 from a bank at 7.5% simple interest per annum to start a small business.',
            steps: [
            { text: 'Identify given values: Principal P = ₹80,000, Rate R = 7.5% per annum, Time = 3 years 4 months.' },
            { text: 'Convert time to years: 4 months = 4/12 year = 1/3 year ≈ 0.3333 years. So T = 3 + 1/3 = 10/3 years (or 3.333... years).' },
            { text: 'Write the simple interest formula: SI = (P × R × T) / 100.' },
            { text: 'Substitute values: SI = (80000 × 7.5 × 10/3) / 100. Simplify stepwise: 80000 × 7.5 = 600,000; 600,000 × 10/3 =.' },
            { text: 'Find total Amount A = P + SI = 80,000 + 20,000 = ₹100,000. Verify: Interest per year = 80,000 × 7.5% = 6,000.', faded: true, blankAnswer: '₹1,00,000 (one lakh rupees)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch8_4', title: 'Finding the percentage of a given.',
          scaffold: { problem: 'A school has 800 students. On a particular day, 15% of the students were absent. How many students were present that day?',
            steps: [
            { text: 'Identify the given quantity (total students = 800) and the percentage to find (15% absent).' },
            { text: 'Convert 15% to a fraction: 15% = 15/100. Simplify if possible: 15/100 = 3/20.' },
            { text: 'Multiply the fraction by the total quantity: Number absent = (3/20) × 800.' },
            { text: 'Compute: (3 × 800) / 20 = 2400 / 20 = 120. So 120 students were absent.' },
            { text: 'Find present students: Total - Absent = 800 - 120 = 680. Answer with units: 680 students.', faded: true, blankAnswer: '680 students' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch14_6', title: 'A trapezium is a quadrilateral with.',
          scaffold: { problem: 'A field is in the shape of a trapezium. Its parallel sides are 25 m and 35 m. The perpendicular distance between them is 12 m.',
            steps: [
            { text: 'Identify given values: a = 25 m, b = 35 m, h = 12 m. Rate = ₹50/m².' },
            { text: 'Write the trapezium area formula: Area = ½ × (a + b) × h.' },
            { text: 'Substitute: Area = ½ × (25 + 35) × 12 = ½ × 60 × 12.' },
            { text: 'Compute stepwise: ½ × 60 = 30; 30 × 12 = 360 m².' },
            { text: 'Calculate cost: Cost = Area × Rate = 360 × 50 = ₹18,000.', faded: true, blankAnswer: '₹18,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch6_2', title: 'The distributive property of.',
          scaffold: { problem: 'A school orders uniform cloth for Class 8. Each student needs \\(2.5\\) metres of shirt cloth (cost ₹\\(x\\) per metre) and \\(1.2\\) metres of.',
            steps: [
            { text: 'Identify the cost per student: Shirt cloth cost = \\(2.5 \\times x = 2.5x\\), Trouser cloth cost = \\(1.2 \\times y =.' },
            { text: 'Identify the multiplier: Number of students \\(c = 40\\). Total cost expression = \\(40 \\times (2.5x + 1.2y)\\).' },
            { text: 'Apply distributive property: Multiply \\(40\\) by each term inside the bracket: \\(40 \\times 2.5x + 40 \\times 1.2y\\).' },
            { text: 'Compute the coefficients: \\(40 \\times 2.5 = 100\\), so first term is \\(100x\\).' },
            { text: 'Write final expanded expression: \\(100x + 48y\\) rupees. Verify: If \\(x=100, y=150\\), per student = \\(250+180=430\\),.', faded: true, blankAnswer: '\\(100x + 48y\\) rupees' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch8_4', title: 'Identify each idea',
          dissect: { specimen: 'Data Handling', spots: [
            { id: 's1', label: 'Simple interest applications involve using', prompt: 'Which idea is this? — Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times.', answer: 'Simple interest applications involve using', options: ['Simple interest applications involve using', 'Finding the percentage of a', 'A trapezium is a quadrilateral', 'The distributive property of multiplication'] },
            { id: 's2', label: 'Finding the percentage of a', prompt: 'Which idea is this? — Finding the percentage of a given quantity means calculating the part of the quantity.', answer: 'Finding the percentage of a', options: ['Finding the percentage of a', 'Simple interest applications involve using', 'A trapezium is a quadrilateral', 'The distributive property of multiplication'] },
            { id: 's3', label: 'A trapezium is a quadrilateral', prompt: 'Which idea is this? — A trapezium is a quadrilateral with exactly one pair of parallel sides.', answer: 'A trapezium is a quadrilateral', options: ['A trapezium is a quadrilateral', 'Simple interest applications involve using', 'Finding the percentage of a', 'The distributive property of multiplication'] },
            { id: 's4', label: 'The distributive property of multiplication', prompt: 'Which idea is this? — The distributive property of multiplication over addition states that multiplying a sum.', answer: 'The distributive property of multiplication', options: ['The distributive property of multiplication', 'Simple interest applications involve using', 'Finding the percentage of a', 'A trapezium is a quadrilateral'] }
          ] } }
    ],
    explore: { component: C8_MathematicsDataHandlingSim, prompt: 'Explore the interactive — Data Handling' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch8_10', difficulty: 'standard',
          question: 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R.',
          hint: 'Revisit c8_math_ch8_9 (Simple Interest: Formula and Calculation) and c8_math_ch8_3.',
          misconception: 'Students often use the time value directly without converting months to years (e.g., using T=6 for 6 months instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times',
                  options: ['Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times', 'Finding the percentage of a given quantity means calculating the part of the quantity', 'A trapezium is a quadrilateral with exactly one pair of parallel sides', 'The distributive property of multiplication over addition states that multiplying a sum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often use the time value directly without converting months to years (e.g., using T=6 for 6 months instead of T=0.5) OR they.' }
          ],
            remediations: { 'students-often-use-the-time': { steps: ['If a student uses months directly as years: Ask "What does \'per annum\' mean?', 'If you keep money for 6 months, is that a full year?" Guide them to write "6 months = 6/12 year = 0.5 year" before.', 'If they forget /100: Ask "Is 6% equal to 6 or 0.06?" Show that \\(6\\% = \\frac{6}{100}\\), so the formula has /100 built.', 'Have them redo the problem writing the rate as a fraction \\(\\frac{R}{100}\\) to see the 100 in the denominator.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_4', difficulty: 'standard',
          question: 'Finding the percentage of a given quantity means calculating the part of the.',
          hint: 'Revisit c8_math_ch8_3 (converting percentages to fractions/decimals) and c6_math_ch03_035.',
          misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200 =.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical expression for finding 15% of 80 kg?', answer: 'The expression is (15/100) × 80 kg or 0.15 × 80 kg',
                  options: ['The expression is (15/100) × 80 kg or 0.15 × 80 kg', 'per cent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200 = 3000 instead of.' }
          ],
            remediations: { 'students-often-treat-the-percentage': { steps: ['If a student makes this error, have them rewrite the percentage as a fraction over 100 every single time for a week.', 'Say: "Write 15% as 15/100.', 'Now read it: \'15 per 100\'.', 'So 15/100 × 200." Do 5 problems daily where step 1 is mandatory: "Write percentage as fraction/decimal".'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch8_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200 =.',
          parts: [
                { id: 'a', prompt: 'A student solved "Find 40% of 250" as follows: 40% = 40/100 = 2/5, then 2/5 of 250 = 2 × 50 = 100. Is this correct? Justify.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'you must use 40/100'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the percentage number as a whole number multiplier, e.g., calculating 15% of 200 as 15 × 200 = 3000 instead of.' }
          ],
            remediations: { 'students-often-treat-the-percentage': { steps: ['If a student makes this error, have them rewrite the percentage as a fraction over 100 every single time for a week.', 'Say: "Write 15% as 15/100.', 'Now read it: \'15 per 100\'.', 'So 15/100 × 200." Do 5 problems daily where step 1 is mandatory: "Write percentage as fraction/decimal".'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch14_6', difficulty: 'standard',
          question: 'A trapezium is a quadrilateral with exactly one pair of parallel sides.',
          hint: 'Revisit c8_math_ch14_3 (parallelogram area) and the "two trapeziums make a parallelogram".',
          misconception: 'Students often confuse the height with the slanted side length.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A trapezium is a quadrilateral with exactly one pair of parallel sides',
                  options: ['A trapezium is a quadrilateral with exactly one pair of parallel sides', 'Simple interest applications involve using the formula \\(SI = \\frac{P \\times R \\times', 'Finding the percentage of a given quantity means calculating the part of the quantity', 'The distributive property of multiplication over addition states that multiplying a sum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the height with the slanted side length.' }
          ],
            remediations: { 'students-often-confuse-the-height': { steps: ['Draw a trapezium on grid paper.', 'Shade the perpendicular height with a dashed line and label it h.', 'Colour the slanted sides differently.', 'Ask: "If I tilt a book, does its height change?'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch6_2', difficulty: 'standard',
          question: 'The distributive property of multiplication over addition states that.',
          hint: 'Revisit c7_math_ch02_006 (Distributive Property in Arithmetic Expressions) for the.',
          misconception: '**Incomplete Distribution with Negative Terms:** Students correctly distribute a positive multiplier (e.g.,.',
          parts: [
                { id: 'a', prompt: 'State the algebraic rule for expanding \\((x + y) \\times z\\). Write the expanded form without using brackets.', answer: 'The expanded form is \\(xz + yz\\) (or \\(zx + zy\\))',
                  options: ['The expanded form is \\(xz + yz\\) (or \\(zx + zy\\))', 'incomplete distribution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Incomplete Distribution with Negative Terms:** Students correctly distribute a positive multiplier (e.g., \\(3(x+2)=3x+6\\)) but fail when.' }
          ],
            remediations: { 'incomplete-distribution-with-negative-terms': { steps: ['Revert to arithmetic: Ask the student to compute \\(-2 \\times (3 - 5)\\) numerically.', 'First do bracket: \\(3-5=-2\\), then \\(-2 \\times -2 = 4\\).', 'Now distribute: \\(-2 \\times 3 + (-2) \\times (-5) = -6 + 10 = 4\\).', 'Use the "area model" (rectangle): Draw a rectangle with sides \\(-2\\) and \\((x-5)\\).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
