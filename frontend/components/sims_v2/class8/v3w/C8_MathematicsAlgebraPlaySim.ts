import type { SimDef } from '../../engine/types';
import C8_MathematicsAlgebraPlaySim from '../../../simulations/c6_12/C8_MathematicsAlgebraPlaySim';

/** v3 wrapped master — C8_MathematicsAlgebraPlaySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsalgebraplaysim: SimDef = {
    id: 'v3w_c8_mathematicsalgebraplaysim',
    title: 'Algebra Play',
    subtitle: 'This node covers explaining given number tricks using algebra (single variable, linear.',
    classLevel: 8, subject: 'mathematics', topic: 'Think of a Number Tricks: Algebraic Explanation',
    chapters: [],
    nodeIds: ['c8_math_ch13_1', 'c8_math_ch13_4', 'c8_math_ch5_11'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine your friend says: "Think of a number. Multiply it by 3. Add 6. Divide by 3.', goal: 'Master Algebra Play.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'A "Think of a Number" trick is a sequence of.', text: 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an unknown number (represented by a variable) that always produces a predictable result regardless of the starting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch13_1', title: 'A "Think of a Number" trick is a.',
          scaffold: { problem: 'A magician says: "Think of a number. Multiply it by 6. Add 24. Divide by 6. Subtract your original number.',
            steps: [
            { text: 'Let the unknown number be \\(x\\). Write down the starting expression: \\(x\\).' },
            { text: 'Apply "Multiply by 6" → \\(6x\\). Apply "Add 24" → \\(6x + 24\\).' },
            { text: 'Apply "Divide by 6" → \\((6x + 24) / 6\\). Use distributive property: \\(6x/6 + 24/6 = x + 4\\).' },
            { text: 'Apply "Subtract the original number" → \\((x + 4) - x\\). Combine like terms: \\(x - x + 4 = 4\\).' },
            { text: 'The final expression is 4, a constant with no \\(x\\). This proves the trick always gives 4.', faded: true, blankAnswer: 'The final answer is always 4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_4', title: 'A number pyramid is a triangular.',
          scaffold: { problem: 'In a 3-row number pyramid, the bottom row has numbers 4, x, and 7. The top number is 30. Find the value of x.',
            steps: [
            { text: 'Understand the pyramid structure. A 3-row pyramid has bottom row with 3 numbers. Let the bottom row be: 4, x, 7.' },
            { text: 'Write expressions for the second row using the rule: each number is the sum of the two below. Second row left = 4 + x.' },
            { text: 'Write expression for the top number: sum of the two numbers in the second row. Top = (4 + x) + (x + 7).' },
            { text: 'Simplify the expression: 4 + x + x + 7 = 2x + 11. Set this equal to the given top value 30: 2x + 11 = 30.' },
            { text: 'Solve the linear equation: 2x = 30 - 11 = 19 => x = 19/2 = 9.5. Verify: bottom: 4, 9.5, 7; second: 13.5, 16.5; top: 30.', faded: true, blankAnswer: 'x = 9.5' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_11', title: 'A cryptarithm is a mathematical puzzle.',
          scaffold: { problem: 'Solve the cryptarithm AB + BA = 121. Find A and B (distinct digits).',
            steps: [
            { text: 'Express AB and BA using place value: AB = 10A + B, BA = 10B + A.' },
            { text: 'Set up the equation: (10A + B) + (10B + A) = 121.' },
            { text: 'Simplify: 11A + 11B = 121, so A + B = 11.' },
            { text: 'List digit pairs that sum to 11: (2,9), (3,8), (4,7), (5,6), (6,5), (7,4), (8,3), (9,2).' },
            { text: 'Check if additional constraints narrow it down. Since the problem states "distinct digits" but gives no further.', faded: true, blankAnswer: 'A + B = 11. With the constraint "A is prime," A = 2, B = 9..' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch13_4', title: 'Identify each idea',
          dissect: { specimen: 'Algebra Play', spots: [
            { id: 's1', label: 'A Think of a Number', prompt: 'Which idea is this? — A "Think of a Number" trick is a sequence of arithmetic operations performed on an.', answer: 'A Think of a Number', options: ['A Think of a Number', 'A number pyramid is a', 'A cryptarithm is a mathematical'] },
            { id: 's2', label: 'A number pyramid is a', prompt: 'Which idea is this? — A number pyramid is a triangular arrangement of numbers where each number in a higher row.', answer: 'A number pyramid is a', options: ['A number pyramid is a', 'A Think of a Number', 'A cryptarithm is a mathematical'] },
            { id: 's3', label: 'A cryptarithm is a mathematical', prompt: 'Which idea is this? — A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,.', answer: 'A cryptarithm is a mathematical', options: ['A cryptarithm is a mathematical', 'A Think of a Number', 'A number pyramid is a'] }
          ] } }
    ],
    explore: { component: C8_MathematicsAlgebraPlaySim, prompt: 'Explore the interactive — Algebra Play' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch13_1', difficulty: 'standard',
          question: 'A "Think of a Number" trick is a sequence of arithmetic operations performed on.',
          hint: 'Review c7_math_ch04_006 (Simplification of Algebraic Expressions: Like Terms) and.',
          misconception: 'Students often write the algebraic expression incorrectly when a multiplication step follows an addition step.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an',
                  options: ['A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'A number pyramid is a triangular arrangement of numbers where each number in a higher row', 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the algebraic expression incorrectly when a multiplication step follows an addition step.' }
          ],
            remediations: { 'students-often-write-the-algebraic': { steps: ['If a student writes \\(x + 5 \\times 3\\) for "Add 5, then multiply by 3", do this: (1) Have them act out the trick with a.', '(2) Show that \\(x + 5 \\times 3\\) with \\(x = 4\\) gives \\(4 + 15 = 19\\), not 27.', '(3) Explain: "The multiplication applies to the WHOLE result so far, not just the 5.', 'We need brackets: \\(3 \\times (x + 5)\\)." (4) Practice 3 similar tricks step by step, insisting on writing the.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_4', difficulty: 'standard',
          question: 'A number pyramid is a triangular arrangement of numbers where each number in a.',
          hint: 'Review solving linear equations (c7_math_ch15_003) and combining like terms.',
          misconception: 'Students often incorrectly assume that the pyramid rule applies horizontally (e.g., adding adjacent numbers in the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A number pyramid is a triangular arrangement of numbers where each number in a higher row',
                  options: ['A number pyramid is a triangular arrangement of numbers where each number in a higher row', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly assume that the pyramid rule applies horizontally (e.g., adding adjacent numbers in the same row) instead of.' }
          ],
            remediations: { 'students-often-incorrectly-assume-that': { steps: ['To fix: 1) Draw the pyramid and physically point to the two numbers that sum to the number above.', '2) Use a color-coding system: each cell gets a unique color; write the algebraic expression for that cell in that color.', '3) Practice with a 3-row pyramid where all bottom numbers are known, compute upwards, then replace one known with a.', '4) Emphasize that each cell has exactly one value, so if we express it in two ways (e.g., as a sum and as a variable),.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_11', difficulty: 'standard',
          question: 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation.',
          hint: 'If students cannot set up the column equation, review place value (c6_math_ch01_003) and.',
          misconception: 'Students treat cryptarithms as trial-and-error guessing games, randomly assigning digits to letters and checking if the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,',
                  options: ['A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'A number pyramid is a triangular arrangement of numbers where each number in a higher row'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat cryptarithms as trial-and-error guessing games, randomly assigning digits to letters and checking if the arithmetic works.' }
          ],
            remediations: { 'students-treat-cryptarithms-as-trial': { steps: ['Start with a trivial cryptarithm: A + A = 4.', 'The student immediately sees A = 2.', 'Build to AB + B = 33: 10A + B + B = 33, so 10A + 2B = 33.', 'Since 2B is even and 33 is odd, 10A must be odd, so A is odd.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
