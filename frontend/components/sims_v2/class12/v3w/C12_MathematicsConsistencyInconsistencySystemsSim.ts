import type { SimDef } from '../../engine/types';
import C12_MathematicsConsistencyInconsistencySystemsSim from '../../../simulations/c6_12/C12_MathematicsConsistencyInconsistencySystemsSim';

/** v3 wrapped master — C12_MathematicsConsistencyInconsistencySystemsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsconsistencyinconsistencysystemssim: SimDef = {
    id: 'v3w_c12_mathematicsconsistencyinconsistencysystemssim',
    title: 'Consistency Inconsistency Systems',
    subtitle: 'This node covers solving systems of linear equations in two or three variables using the.',
    classLevel: 12, subject: 'mathematics', topic: 'Solution of System of Linear Equations: Matrix Method',
    chapters: [],
    nodeIds: ['c12_math_cbse_04_008', 'c12_math_cbse_04_009', 'c12_math_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you go to a stationery shop and buy 2 pens and 3 pencils for ₹35, while your friend buys 4 pens and 1.', goal: 'Master Consistency Inconsistency Systems.' },
    discovery: {
        question: 'Compare Cramer\'s Rule and the Matrix Inverse Method (X = A⁻¹B) for solving a 3×3 system.',
        options: ['you only need the value of one variable, say y?', 'Cramer\'s Rule is always better', 'Inverse method is always better'],
        answer: 'you only need the value of one variable, say y?',
        hook: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.',
    },
    teaching: [
        { title: 'The matrix method solves a system of linear.', text: 'The matrix method solves a system of linear equations \\(AX = B\\) by computing \\(X = A^{-1}B\\), where \\(A\\) is the coefficient matrix, \\(X\\) is the column matrix of variables, and \\(B\\) is the column.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_008', title: 'The matrix method solves a system of.',
          scaffold: { problem: 'A shopkeeper sells two types of pens: gel and ball. 5 gel pens and 3 ball pens cost ₹110. 2 gel pens and 4 ball pens cost ₹70.',
            steps: [
            { text: 'Let \\(x\\) = cost of one gel pen (₹), \\(y\\) = cost of one ball pen (₹).' },
            { text: 'Write in matrix form \\(AX = B\\): \\(A = \\begin{bmatrix}5 & 3\\\\2 & 4\\end{bmatrix}\\), \\(X =.' },
            { text: 'Compute \\(|A| = (5)(4) - (3)(2) = 20 - 6 = 14 \\neq 0\\). So \\(A^{-1}\\) exists.' },
            { text: 'Find cofactors: \\(A_{11}=4, A_{12}=-2, A_{21}=-3, A_{22}=5\\). Cofactor matrix = \\(\\begin{bmatrix}4 & -2\\\\-3 &.' },
            { text: '\\(A^{-1} = \\frac{1}{14}\\begin{bmatrix}4 & -3\\\\-2 & 5\\end{bmatrix}\\).' },
            { text: '\\(X = A^{-1}B = \\frac{1}{14}\\begin{bmatrix}4 & -3\\\\-2 & 5\\end{bmatrix}\\begin{bmatrix}110\\\\70\\end{bmatrix} =.' },
            { text: 'Interpret: Gel pen costs ₹\\(115/7\\) (≈ ₹16.43), ball pen costs ₹\\(65/7\\) (≈ ₹9.29).', faded: true, blankAnswer: 'Gel pen = ₹\\(115/7\\) (≈ ₹16.43), Ball pen = ₹\\(65/7\\) (≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_009', title: 'Cramer\'s Rule states that for a system.',
          scaffold: { problem: 'A stationery shop sells pens and notebooks. 5 pens and 3 notebooks cost ₹140. 2 pens and 4 notebooks cost ₹110.',
            steps: [
            { text: 'Let x = cost of one pen (₹), y = cost of one notebook (₹). Form equations: 5x + 3y = 140 and 2x + 4y = 110.' },
            { text: 'Write coefficient matrix A = [[5, 3], [2, 4]] and constant matrix B = [[140], [110]].' },
            { text: 'For x, replace column 1 of A with B: Δₓ = det([[140, 3], [110, 4]]) = 140×4 − 3×110 = 560 − 330 = 230.' },
            { text: 'For y, replace column 2 of A with B: Δᵧ = det([[5, 140], [2, 110]]) = 5×110 − 140×2 = 550 − 280 = 270.' },
            { text: 'Verify: 5(115/7) + 3(135/7) = (575 + 405)/7 = 980/7 = 140 ✓. 2(115/7) + 4(135/7) = (230 + 540)/7 = 770/7 = 110 ✓.', faded: true, blankAnswer: 'Pen costs ₹115/7 (≈ ₹16.43), Notebook costs ₹135/7 (≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_010', title: 'A system of linear equations AX = B is.',
          scaffold: { problem: 'A small bakery in Mumbai sells three types of cakes: Chocolate (₹x), Vanilla (₹y), Strawberry (₹z).',
            steps: [
            { text: 'Write the system in matrix form AX = B.' },
            { text: 'Compute |A| by expanding along first row.' },
            { text: 'Since |A| = 4 ≠ 0, the system has a unique solution (consistent). Prices can be determined uniquely.' },
            { text: 'Find A⁻¹ = (adj A)/|A|. First compute cofactors:' },
            { text: 'X = A⁻¹B = (1/4)[[3, -1, -1], [-1, 3, -1], [-1, -1, 3]] [180, 150, 150]ᵀ.', faded: true, blankAnswer: 'Consistent with unique solution: Chocolate cake ₹60,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_04_009', title: 'Identify each idea',
          dissect: { specimen: 'Consistency Inconsistency Systems', spots: [
            { id: 's1', label: 'The matrix method solves a', prompt: 'Which idea is this? — The matrix method solves a system of linear equations \\(AX = B\\) by computing \\(X =.', answer: 'The matrix method solves a', options: ['The matrix method solves a', 'Cramers Rule states that for', 'A system of linear equations'] },
            { id: 's2', label: 'Cramers Rule states that for', prompt: 'Which idea is this? — Cramer\'s Rule states that for a system of n linear equations in n variables represented.', answer: 'Cramers Rule states that for', options: ['Cramers Rule states that for', 'The matrix method solves a', 'A system of linear equations'] },
            { id: 's3', label: 'A system of linear equations', prompt: 'Which idea is this? — A system of linear equations AX = B is **consistent** if at least one solution exists.', answer: 'A system of linear equations', options: ['A system of linear equations', 'The matrix method solves a', 'Cramers Rule states that for'] }
          ] } }
    ],
    explore: { component: C12_MathematicsConsistencyInconsistencySystemsSim, prompt: 'Explore the interactive — Consistency Inconsistency Systems' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_04_008', difficulty: 'standard',
          question: 'The matrix method solves a system of linear equations \\(AX = B\\) by computing.',
          hint: 'Revisit **c12_math_cbse_04_007** (Inverse of a Matrix Using Adjoint) and.',
          misconception: 'Students often compute the cofactor matrix correctly but forget to **transpose** it to get the adjoint.',
          parts: [
                { id: 'a', prompt: 'A student writes the system \\(3x - 2y = 7, \\; 5x + 4y = 1\\) as \\(AX = B\\) with \\(A = \\begin{bmatrix}3 & -2\\\\5 & 4\\end{bmatrix}\\), \\(X =.', answer: 'The adjoint of \\(A\\) should be \\(\\begin{bmatrix}4 & 2\\\\-5 & 3\\end{bmatrix}\\)?',
                  options: ['The adjoint of \\(A\\) should be \\(\\begin{bmatrix}4 & 2\\\\-5 & 3\\end{bmatrix}\\)?', 'yes it\'s correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often compute the cofactor matrix correctly but forget to **transpose** it to get the adjoint.' }
          ],
            remediations: { 'students-often-compute-the-cofactor': { steps: ['If a student makes the adjoint transpose error: (1) Have them write the definition: "Adjoint of \\(A\\) is the transpose.', '(3) Re-solve a 3×3 system step-by-step, explicitly writing the cofactor matrix and then its transpose.', '(4) Give a diagnostic: "Find adjoint of \\(\\begin{bmatrix}1 & 0 & 2\\\\-1 & 3 & 1\\\\2 & 1 & 0\\end{bmatrix}\\)" and check if.', 'If they still err, revisit node **c12_math_cbse_04_006** (Adjoint definition) and **c12_math_cbse_04_005** (Minors and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_009', difficulty: 'standard',
          question: 'Cramer\'s Rule states that for a system of n linear equations in n variables.',
          hint: 'If stuck on determinant computation, revisit c12_math_cbse_04_002 (3×3 determinant.',
          misconception: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.',
          parts: [
                { id: 'a', prompt: 'Compare Cramer\'s Rule and the Matrix Inverse Method (X = A⁻¹B) for solving a 3×3 system.', answer: 'you only need the value of one variable, say y?',
                  options: ['you only need the value of one variable, say y?', 'Cramer\'s Rule is always better', 'Inverse method is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.' }
          ],
            remediations: { 'the-most-frequent-error-is': { steps: ['If a student consistently replaces the wrong column: Have them write the coefficient matrix with variable labels above.', 'Then practice: "To find x, which column has x-coefficients?', 'So replace Column 1 with constants." Use color-coding: highlight the x-column in blue, constants in red, then show the.', 'For sign errors in 3×3 expansion: drill the checkerboard sign pattern (+ − + / − + − / + − +) and have them write the.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.',
          parts: [
                { id: 'a', prompt: 'Compare Cramer\'s Rule and the Matrix Inverse Method (X = A⁻¹B) for solving a 3×3 system.', answer: 'you only need the value of one variable, say y?',
                  options: ['you only need the value of one variable, say y?', 'Cramer\'s Rule is always better', 'Inverse method is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.' }
          ],
            remediations: { 'the-most-frequent-error-is': { steps: ['If a student consistently replaces the wrong column: Have them write the coefficient matrix with variable labels above.', 'Then practice: "To find x, which column has x-coefficients?', 'So replace Column 1 with constants." Use color-coding: highlight the x-column in blue, constants in red, then show the.', 'For sign errors in 3×3 expansion: drill the checkerboard sign pattern (+ − + / − + − / + − +) and have them write the.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_010', difficulty: 'standard',
          question: 'A system of linear equations AX = B is **consistent** if at least one solution.',
          hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent.',
          misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).',
          parts: [
                { id: 'a', prompt: 'State the three cases for consistency of a system AX = B with square matrix A, giving the condition on |A| and (adj A)B for each case.', answer: 'Case 1: |A| ≠ 0 → unique solution (consistent)',
                  options: ['Case 1: |A| ≠ 0 → unique solution (consistent)', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'b', prompt: 'For the system x + 2y = 3 and 2x + 4y = 7, write the matrix form AX = B, compute |A| and (adj A)B, and state whether the system is consistent or inconsistent.', answer: 'A = [[1, 2], [2, 4]], B = [3, 7]ᵀ',
                  options: ['A = [[1, 2], [2, 4]], B = [3, 7]ᵀ', 'infinitely many solutions', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'c', prompt: 'Determine the consistency of the system: 2x – y + 3z = 5, 4x – 2y + 6z = 10, 6x – 3y + 9z = 15. Show all steps including computation of |A| and (adj A)B.', answer: 'A = [[2, -1, 3], [4, -2, 6], [6, -3, 9]], B = [5, 10, 15]ᵀ',
                  options: ['A = [[2, -1, 3], [4, -2, 6], [6, -3, 9]], B = [5, 10, 15]ᵀ', 'inconsistent because |A|=0', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' }
          ],
            remediations: { 'if-a-0-then-the': { steps: ['If a student makes this error: (1) Have them revisit node c12_math_cbse_04_007 (Inverse of a Matrix Using Adjoint) to.', '(2) Revisit node c10_math_cbse_03_003 (Inconsistent System: Parallel Lines) and c10_math_cbse_03_004 (Dependent System:.', '(3) Practice the decision tree: compute |A| → if ≠0 stop (unique); if =0 compute (adj A)B → if ≠0 stop (inconsistent);.', '(4) Re-diagnostic: give a system where |A| = 0, (adj A)B = 0 but constants break proportionality (like Diagnostic 6).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).',
          parts: [
                { id: 'a', prompt: 'A student solves the system x + y + z = 6, 2x + 2y + 2z = 12, 3x + 3y + 3z = 18 and writes: "|A| = 0, so the system has no solution." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'b', prompt: 'Construct a 3×3 system of linear equations that has |A| = 0 and (adj A)B = 0 but is INCONSISTENT. Explain why your example works.', answer: 'Example: x + y + z = 1, 2x + 2y + 2z = 2, 3x + 3y + 3z = 5',
                  options: ['Example: x + y + z = 1, 2x + 2y + 2z = 2, 3x + 3y + 3z = 5', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' }
          ],
            remediations: { 'if-a-0-then-the': { steps: ['If a student makes this error: (1) Have them revisit node c12_math_cbse_04_007 (Inverse of a Matrix Using Adjoint) to.', '(2) Revisit node c10_math_cbse_03_003 (Inconsistent System: Parallel Lines) and c10_math_cbse_03_004 (Dependent System:.', '(3) Practice the decision tree: compute |A| → if ≠0 stop (unique); if =0 compute (adj A)B → if ≠0 stop (inconsistent);.', '(4) Re-diagnostic: give a system where |A| = 0, (adj A)B = 0 but constants break proportionality (like Diagnostic 6).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
