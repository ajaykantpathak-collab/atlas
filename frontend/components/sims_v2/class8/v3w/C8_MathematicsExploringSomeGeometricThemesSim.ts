import type { SimDef } from '../../engine/types';
import C8_MathematicsExploringSomeGeometricThemesSim from '../../../simulations/c6_12/C8_MathematicsExploringSomeGeometricThemesSim';

/** v3 wrapped master — C8_MathematicsExploringSomeGeometricThemesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsexploringsomegeometricthemessim: SimDef = {
    id: 'v3w_c8_mathematicsexploringsomegeometricthemessim',
    title: 'Placing Plus and Minus Signs Between Four Consecutive Numbers',
    subtitle: 'This node covers the exploration of sign patterns between exactly four consecutive.',
    classLevel: 8, subject: 'mathematics', topic: 'Placing Plus and Minus Signs Between Four Consecutive Numbers',
    chapters: [],
    nodeIds: ['c8_math_ch5_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you have four consecutive locker numbers: 12, 13, 14, 15.', goal: 'Master Placing Plus and Minus Signs Between Four Consecutive Numbers.' },
    discovery: {
        question: 'For the four consecutive numbers 5, 6, 7, 8, how many different expressions can be formed by placing + or - signs in the three gaps between them?',
        options: ['Answer: 8 expressions', 'negative first number', 'there are 4 gaps instead of 3'],
        answer: 'Answer: 8 expressions',
        hook: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading.',
    },
    teaching: [
        { title: 'Given four consecutive integers \\(n, n+1,.', text: 'Given four consecutive integers \\(n, n+1, n+2, n+3\\), placing plus or minus signs between them creates an expression of the form \\(n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\) where each \\(\\pm\\) is.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch5_6', title: 'Given four consecutive integers \\(n,.',
          scaffold: { problem: 'A teacher writes four consecutive numbers on the board: 7, 8, 9, 10.',
            steps: [
            { text: 'Identify the four consecutive numbers: n=7, so numbers are 7, 8, 9, 10.' },
            { text: 'List all 8 sign patterns systematically: (+,+,+), (+,+,-), (+,-,+), (+,-,-), (-,+,+), (-,+,-), (-,-,+), (-,-,-).' },
            { text: 'Compute each expression using integer rules:' },
            { text: 'Collect the set of values: {-10, -4, -2, 0, 14, 16, 18, 34}. Observe all are even.' },
            { text: 'Verify parity using algebraic reasoning: each expression = 7(1+s₁+s₂+s₃) + (s₁+2s₂+3s₃).', faded: true, blankAnswer: 'The 8 values are -10, -4, -2, 0, 14, 16, 18, 34. All are.' }
            ] } }
    ],
    explore: { component: C8_MathematicsExploringSomeGeometricThemesSim, prompt: 'Explore the interactive — Placing Plus and Minus Signs Between Four Consecutive Numbers' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch5_6', difficulty: 'standard',
          question: 'Given four consecutive integers \\(n, n+1, n+2, n+3\\), placing plus or minus.',
          hint: 'Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and.',
          misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading.',
          parts: [
                { id: 'a', prompt: 'For the four consecutive numbers 5, 6, 7, 8, how many different expressions can be formed by placing + or - signs in the three gaps between them?', answer: 'Answer: 8 expressions',
                  options: ['Answer: 8 expressions', 'negative first number', 'there are 4 gaps instead of 3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' },
                { id: 'b', prompt: 'For the consecutive numbers 10, 11, 12, 13, find the value of the expression with signs: \\(10 - 11 - 12 + 13\\).', answer: 'Step 1: \\(10 - 11 = -1\\) Step 2: \\(-1 - 12 = -13\\) Step 3: \\(-13 + 13 = 0\\)',
                  options: ['Step 1: \\(10 - 11 = -1\\) Step 2: \\(-1 - 12 = -13\\) Step 3: \\(-13 + 13 = 0\\)', 'negative first number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' }
          ],
            remediations: { 'students-treat-the-first-number': { steps: ['If the student includes a sign before the first number, draw a physical representation: write the four numbers on cards.', 'Place sign cards only in the gaps.', 'Emphasize: "The first number starts the expression; we only choose what happens *between* numbers." Then list the 3.', 'Count: 3 gaps × 2 choices = 8.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For any four consecutive numbers, the largest possible value is always the sum of all four, and the smallest is always the first minus the.', answer: 'The claim is CORRECT',
                  options: ['The claim is CORRECT', 'negative first number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' },
                { id: 'b', prompt: 'Create a new problem: Choose four consecutive numbers such that one of the 8 possible values equals exactly 100.', answer: 'Good answer: Let the numbers be \\(n, n+1, n+2, n+3\\)',
                  options: ['Good answer: Let the numbers be \\(n, n+1, n+2, n+3\\)', 'negative first number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' }
          ],
            remediations: { 'students-treat-the-first-number': { steps: ['If the student includes a sign before the first number, draw a physical representation: write the four numbers on cards.', 'Place sign cards only in the gaps.', 'Emphasize: "The first number starts the expression; we only choose what happens *between* numbers." Then list the 3.', 'Count: 3 gaps × 2 choices = 8.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
