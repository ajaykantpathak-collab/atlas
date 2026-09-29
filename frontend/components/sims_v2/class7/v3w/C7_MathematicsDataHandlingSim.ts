import type { SimDef } from '../../engine/types';
import C7_MathematicsDataHandlingSim from '../../../simulations/c6_12/C7_MathematicsDataHandlingSim';

/** v3 wrapped master — C7_MathematicsDataHandlingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsdatahandlingsim: SimDef = {
    id: 'v3w_c7_mathematicsdatahandlingsim',
    title: 'Rounding Numbers to Nearest 10, 100, 1000',
    subtitle: 'Covers rounding whole numbers up to 8 digits to the nearest 10, 100, and 1000.',
    classLevel: 7, subject: 'mathematics', topic: 'Rounding Numbers to Nearest 10, 100, 1000',
    chapters: [],
    nodeIds: ['c7_math_ch01_007', 'c7_math_ch01_009', 'c7_math_ch01_011', 'c7_math_ch15_005', 'c7_math_ch15_008', 'c7_math_ch15_009', 'c7_math_ch13_001', 'c7_math_ch13_002', 'c7_math_ch13_003', 'c7_math_ch13_004', 'c7_math_ch13_005', 'c7_math_ch13_006', 'c7_math_ch13_007', 'c7_math_ch13_008', 'c7_math_ch13_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a school sports day in Delhi, and the announcer says approximately 4,376 people are.', goal: 'Master Rounding Numbers to Nearest 10, 100, 1000.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Rounding a number to the nearest 10, 100, or.', text: 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate, cleaner multiple of 10, 100, or 1000 that is closest in value to the original number, using standard.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch01_007', title: 'Rounding a number to the nearest 10,.',
          scaffold: { problem: 'A textile mill in Gujarat produced 4,683 metres of cotton cloth in a week.',
            steps: [
            { text: 'Identify the target place value for rounding, which is the hundreds place. In 4,683, the hundreds digit is 6.' },
            { text: 'Identify the test digit in the place immediately to the right of the hundreds place, which is the tens digit (8).' },
            { text: 'Apply the rounding rule to the test digit. Since 8 is greater than or equal to 5, we must round up by adding 1 to the.' },
            { text: 'Replace all digits to the right of the hundreds place with zeros, keeping digits to the left unchanged ($4$ remains.' },
            { text: 'Verify the result. The number 4,683 lies between 4,600 and 4,700, and is closer to 4,700.', faded: true, blankAnswer: '4,700 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch01_009', title: 'Real-life applications of large numbers.',
          scaffold: { problem: 'According to a census report, State A has a population of $3,82,54,120$ and State B has a population of $2,15,48,900$.',
            steps: [
            { text: 'Identify the given values: Population of State A ($P_A$) = $3,82,54,120$; Population of State B ($P_B$) = $2,15,48,900$.' },
            { text: 'For part (a), set up the addition aligning columns from the ones place: $3,82,54,120 + 2,15,48,900$.' },
            { text: 'Compute addition: $0+0=0$, $2+0=2$, $1+9=10$ (write $0$, carry $1$), $4+8+1=13$ (write $3$, carry $1$), $5+4+1=10$.' },
            { text: 'For part (b), set up subtraction for the difference: $3,82,54,120 - 2,15,48,900$.' },
            { text: 'Compute subtraction with borrowing where necessary: Ones: $0-0=0$, Tens: $2-0=2$, Hundreds: $1-9$ (borrow $1$ from.', faded: true, blankAnswer: '(a) Combined population = $5,98,03,020$ persons; (b).' }
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
        { type: 'scaffold', nodeId: 'c7_math_ch15_005', title: 'Equations with variables on both sides.',
          scaffold: { problem: 'Riya saves rupees 50 in her piggy bank and adds rupees 20 every week.',
            steps: [
            { text: 'Identify the given values and let $w$ represent the number of weeks. Riya\'s total savings = $50 + 20w$.' },
            { text: 'Set up the equation where both savings are equal: $50 + 20w = 20 + 30w$.' },
            { text: 'Subtract $20w$ from both sides to collect the variable terms on the right side: $50 = 20 + 30w - 20w \\implies 50 = 20 +.' },
            { text: 'Subtract $20$ from both sides to isolate the variable term: $50 - 20 = 10w \\implies 30 = 10w$.' },
            { text: 'Divide both sides by $10$ to solve for $w$: $w = 30 \\div 10 = 3$.', faded: true, blankAnswer: 'After 3 weeks' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_008', title: 'Verifying solutions of equations is the.',
          scaffold: { problem: 'Verify whether $x = 3$ is a solution for the equation $5x - 4 = 2x + 5$.',
            steps: [
            { text: 'Identify the Left-Hand Side (LHS) as $5x - 4$ and the Right-Hand Side (RHS) as $2x + 5$.' },
            { text: 'Substitute the test value $x = 3$ into the Left-Hand Side: LHS = $5(3) - 4$.' },
            { text: 'Evaluate LHS using multiplication and subtraction: LHS = $15 - 4 = 11$.' },
            { text: 'Substitute the test value $x = 3$ into the Right-Hand Side: RHS = $2(3) + 5$.' },
            { text: 'Evaluate RHS using multiplication and addition: RHS = $6 + 5 = 11$.' },
            { text: 'Compare LHS and RHS: Since $11 = 11$, LHS = RHS, confirming $x = 3$ is a valid solution.', faded: true, blankAnswer: 'Yes, $x = 3$ is a solution because LHS = 11 and RHS = 11.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_009', title: 'Matchstick patterns and generalisation.',
          scaffold: { problem: 'A row of interlocking pentagons is built with matchsticks. 1 pentagon uses 5 matchsticks, 2 connected pentagons use 9 matchsticks, and 3.',
            steps: [
            { text: 'Identify the given values and tabulate the terms. Term 1 ($n=1$) = 5, Term 2 ($n=2$) = 9, Term 3 ($n=3$) = 13.' },
            { text: 'Find the common difference between consecutive terms: $9 - 5 = 4$ and $13 - 9 = 4$. This gives the coefficient $a = 4$.' },
            { text: 'Test the term rule $4n + b$ using $n = 1$: $4(1) + b = 5$, which means $4 + b = 5$, so $b = 1$.' },
            { text: 'Substitute $n = 18$ into the expression to find the total matchsticks: $4(18) + 1$.' },
            { text: 'Compute the final value: $4 \\times 18 = 72$, then $72 + 1 = 73$ matchsticks.', faded: true, blankAnswer: 'Expression: $4n + 1$; Total matchsticks for 18 pentagons =.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch01_009', title: 'Identify each idea',
          dissect: { specimen: 'Rounding Numbers to Nearest 10, 100, 1000', spots: [
            { id: 's1', label: 'Rounding a number to the', prompt: 'Which idea is this? — Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,.', answer: 'Rounding a number to the', options: ['Rounding a number to the', 'Real-life applications of large numbers', 'Operations with large numbers multiplication', 'Equations with variables on both'] },
            { id: 's2', label: 'Real-life applications of large numbers', prompt: 'Which idea is this? — Real-life applications of large numbers involve using numbers in lakhs and crores to.', answer: 'Real-life applications of large numbers', options: ['Real-life applications of large numbers', 'Rounding a number to the', 'Operations with large numbers multiplication', 'Equations with variables on both'] },
            { id: 's3', label: 'Operations with large numbers multiplication', prompt: 'Which idea is this? — Operations with large numbers: multiplication and division involves finding the product.', answer: 'Operations with large numbers multiplication', options: ['Operations with large numbers multiplication', 'Rounding a number to the', 'Real-life applications of large numbers', 'Equations with variables on both'] },
            { id: 's4', label: 'Equations with variables on both', prompt: 'Which idea is this? — Equations with variables on both sides are algebraic equations that contain the same.', answer: 'Equations with variables on both', options: ['Equations with variables on both', 'Rounding a number to the', 'Real-life applications of large numbers', 'Operations with large numbers multiplication'] },
            { id: 's5', label: 'Verifying solutions of equations is', prompt: 'Which idea is this? — Verifying solutions of equations is the process of testing whether a specific numerical.', answer: 'Verifying solutions of equations is', options: ['Verifying solutions of equations is', 'Rounding a number to the', 'Real-life applications of large numbers', 'Operations with large numbers multiplication'] },
            { id: 's6', label: 'Matchstick patterns and generalisation involve', prompt: 'Which idea is this? — Matchstick patterns and generalisation involve observing visual geometric arrangements.', answer: 'Matchstick patterns and generalisation involve', options: ['Matchstick patterns and generalisation involve', 'Rounding a number to the', 'Real-life applications of large numbers', 'Operations with large numbers multiplication'] }
          ] } }
    ],
    explore: { component: C7_MathematicsDataHandlingSim, prompt: 'Explore the interactive — Rounding Numbers to Nearest 10, 100, 1000' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch01_007', difficulty: 'standard',
          question: 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an.',
          hint: 'Review place value columns (tens, hundreds, thousands) using place-value charts before.',
          misconception: 'Students often look at the final digit or the largest digit of a number rather than the specific test digit immediately.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,',
                  options: ['Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Operations with large numbers: multiplication and division involves finding the product', 'Equations with variables on both sides are algebraic equations that contain the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often look at the final digit or the largest digit of a number rather than the specific test digit immediately to the right of the.' }
          ],
            remediations: { 'students-often-look-at-the': { steps: ['If a student struggles, guide them to underline the target place value first and circle the test digit immediately to.', 'Have them physically cover all digits to the left of the target place so they are not distracted.', 'Ask them: \'Is the circled digit 5 or more?', 'If yes, add 1 to the underlined digit.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_009', difficulty: 'standard',
          question: 'Real-life applications of large numbers involve using numbers in lakhs and.',
          hint: 'Review place value alignment and grouping in c7_math_ch01_003 before attempting.',
          misconception: 'Students often misalign place value columns when setting up vertical addition or subtraction for large numbers (lakhs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Real-life applications of large numbers involve using numbers in lakhs and crores to',
                  options: ['Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'Operations with large numbers: multiplication and division involves finding the product', 'Equations with variables on both sides are algebraic equations that contain the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often misalign place value columns when setting up vertical addition or subtraction for large numbers (lakhs and crores) because.' }
          ],
            remediations: { 'students-often-misalign-place-value': { steps: ['To fix misalignment errors, have the student draw vertical grid lines representing the Indian place value chart (Cores,.', 'Instruct them to always write the numbers starting from the Ones place (right to left) into the grid before performing.', 'Remind them to fill empty higher-place columns with blank space or zeros, ensuring units match units, tens match tens,.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch01_011', difficulty: 'standard',
          question: 'Operations with large numbers: multiplication and division involves finding the.',
          hint: 'Review c6_math_ch01_010 and c6_math_ch01_011 to practice standard multiplication and long.',
          misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Operations with large numbers: multiplication and division involves finding the product',
                  options: ['Operations with large numbers: multiplication and division involves finding the product', 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Equations with variables on both sides are algebraic equations that contain the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently drop a place-holder zero in the quotient during long division when a brought-down digit is smaller than the divisor, or.' }
          ],
            remediations: { 'students-frequently-drop-a-place': { steps: ['Guide the student by rewriting the division step-by-step using explicit place-value columns.', 'Say: "Let\'s check each digit from left to right.', 'When we bring down a digit and it is less than our divisor, what must we write in the quotient before bringing down the.', 'Always write a 0 to hold that place value, then bring down the next digit." Practice estimating the quotient first.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_005', difficulty: 'standard',
          question: 'Equations with variables on both sides are algebraic equations that contain the.',
          hint: 'Review c7_math_ch15_004 on inverse operations and c6_math_ch02_019 on integer addition.',
          misconception: 'Students frequently make a sign error when transposing a term across the equals sign or when moving a variable term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equations with variables on both sides are algebraic equations that contain the same',
                  options: ['Equations with variables on both sides are algebraic equations that contain the same', 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Operations with large numbers: multiplication and division involves finding the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently make a sign error when transposing a term across the equals sign or when moving a variable term with a negative.' }
          ],
            remediations: { 'students-frequently-make-a-sign': { steps: ['If a student struggles with variables on both sides, pause and use the physical balance scale model.', 'Write the equation and physically draw a dividing line at the equals sign.', 'Instruct the student to write down every single operation explicitly (e.g., write "+ 2x" or "- 5" under both sides of.', 'Emphasize the golden rule of algebra: "Whatever you do to one side of the balance to get rid of a term, you must do the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_008', difficulty: 'standard',
          question: 'Verifying solutions of equations is the process of testing whether a specific.',
          hint: 'Review c6_math_ch05_053 for basic variable substitution and evaluation of algebraic terms.',
          misconception: 'Students often make the error of substituting the test value into only one side of the equation (usually the side.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Verifying solutions of equations is the process of testing whether a specific numerical',
                  options: ['Verifying solutions of equations is the process of testing whether a specific numerical', 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Operations with large numbers: multiplication and division involves finding the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often make the error of substituting the test value into only one side of the equation (usually the side containing the variable).' }
          ],
            remediations: { 'students-often-make-the-error': { steps: ['If a student struggles, guide them to use a physical two-column layout on their page.', 'Write "LHS =" on the left side and "RHS =" on the right side.', 'Instruct them to draw a vertical line between them, substitute the value into each column completely independent of the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_009', difficulty: 'standard',
          question: 'Matchstick patterns and generalisation involve observing visual geometric.',
          hint: 'Review c6_math_ch12_122 to practice finding differences in geometric number sequences.',
          misconception: 'Students frequently multiply the number of matchsticks in a single isolated geometric shape by the number of terms $n$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matchstick patterns and generalisation involve observing visual geometric arrangements',
                  options: ['Matchstick patterns and generalisation involve observing visual geometric arrangements', 'Rounding a number to the nearest 10, 100, or 1000 means replacing it with an approximate,', 'Real-life applications of large numbers involve using numbers in lakhs and crores to', 'Operations with large numbers: multiplication and division involves finding the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently multiply the number of matchsticks in a single isolated geometric shape by the number of terms $n$ (writing $4n$ for.' }
          ],
            remediations: { 'students-frequently-multiply-the-number': { steps: ['Ask the student to physically draw 2 connected squares side-by-side and count the exact matchsticks line by line.', 'Show them that while an isolated square has 4 sticks, joining a second square only adds 3 new sticks because one stick.', 'Guide them to write the expression as: (sticks per new shape $\\times n$) + (starting adjustment).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
