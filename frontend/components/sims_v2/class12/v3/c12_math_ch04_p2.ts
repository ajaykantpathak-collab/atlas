import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch04_p2: SimDef = {
    id: 'v3_c12_math_ch04_p2',
    title: 'Determinants · Part 2/2',
    subtitle: 'One number decides if the prices even exist',
    classLevel: 12, subject: 'mathematics', topic: 'Determinants · Part 2/2',
    chapters: ['c12_math_ch04'],
    nodeIds: ['c12_math_cbse_04_007', 'c12_math_cbse_04_008', 'c12_math_cbse_04_009', 'c12_math_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Determinant evaluator', intro: 'Before you solve a system, one scalar quietly tells you whether a unique solution exists at all.', goal: 'Compute determinants of order 1, 2 and 3 — and understand why squareness is the entry fee.' },
    discovery: {
        question: 'Two pens and five notebooks cost ₹110; three pens and two cost ₹70. Before solving for prices, one number already promises a unique answer exists. Which?',
        options: ['The determinant — |A| = ad−bc = −11 ≠ 0 certifies the system won\'t collapse into contradiction or infinity', 'The total ₹180', 'The coefficient 2', 'The larger price'],
        answer: 'The determinant — |A| = ad−bc = −11 ≠ 0 certifies the system won\'t collapse into contradiction or infinity',
        hook: 'Only square matrices earn a determinant — a 2×3 grid can\'t be expanded because the recursion needs equal rows and columns. And |A| isn\'t modulus: it can be negative, and a non-zero value is the green light for unique solutions.',
    },
    teaching: [
        { title: 'Inverse of a Matrix Using Adjoint', text: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying A A⁻¹ = A⁻¹ A = Iₙ, and exists if and only if |A| ≠ 0 (A is non-singular).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_04_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Compute the gateway number: evaluate 2×2 determinants by ad−bc with the sign order right, expand a 3×3 along any row, and explain why every expansion converges on the same value.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_007', title: 'Inverse of a Matrix Using Adjoint',
          scaffold: { problem: 'A small shop sells three items: notebooks (₹x each), pens (₹y each), and erasers (₹z each).',
            steps: [
            { text: 'Write the system as AX = B. A = [[2, 1, 3], [1, 2, 1], [3, 1, 2]], X = [x, y, z]ᵀ, B = [13, 8, 13]ᵀ.' },
            { text: 'Compute |A|. Expand along R1: |A| = 2(4-1) - 1(2-3) + 3(1-6) = 2(3) - 1(-1) + 3(-5) = 6 + 1 - 15 = -8 ≠ 0.' },
            { text: 'Find cofactor matrix.' },
            { text: 'Adjoint = transpose of cofactor matrix = [[3, 1, -5], [1, -5, 1], [-5, 1, 3]] (symmetric here).' },
            { text: 'A⁻¹ = (1/-8) adj A = [[-3/8, -1/8, 5/8], [-1/8, 5/8, -1/8], [5/8, -1/8, -3/8]].' },
            { text: 'X = A⁻¹B = (1/-8)[[3,1,-5],[1,-5,1],[-5,1,3]] [13,8,13]ᵀ = (1/-8)[39+8-65, 13-40+13, -65+8+39]ᵀ = (1/-8)[-18, -14.' },
            { text: 'x = ₹2.25, y = ₹1.75, z = ₹2.25. Verify: 2(2.25)+1.75+3(2.25)=4.5+1.75+6.75=13 ✓.', faded: true, blankAnswer: 'Notebook = ₹2.25, Pen = ₹1.75, Eraser = ₹2.25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_008', title: 'Solution of System of Linear Equations: Matrix Method',
          scaffold: { problem: 'A shopkeeper sells two types of pens: gel and ball. 5 gel pens and 3 ball pens cost ₹110. 2 gel pens and 4 ball pens cost ₹70.',
            steps: [
            { text: 'Let \\(x\\) = cost of one gel pen (₹), \\(y\\) = cost of one ball pen (₹).' },
            { text: 'Write in matrix form \\(AX = B\\): \\(A = \\begin{bmatrix}5 & 3\\\\2 & 4\\end{bmatrix}\\), \\(X.' },
            { text: 'Compute \\(|A| = (5)(4) - (3)(2) = 20 - 6 = 14 \\neq 0\\). So \\(A^{-1}\\) exists.' },
            { text: 'Find cofactors: \\(A_{11}=4, A_{12}=-2, A_{21}=-3, A_{22}=5\\). Cofactor matrix = \\(\\begin{bmatrix}4 & -2\\\\-3 &.' },
            { text: '\\(A^{-1} = \\frac{1}{14}\\begin{bmatrix}4 & -3\\\\-2 & 5\\end{bmatrix}\\).' },
            { text: '\\(X = A^{-1}B = \\frac{1}{14}\\begin{bmatrix}4 & -3\\\\-2 & 5\\end{bmatrix}\\begin{bmatrix}110\\\\70\\end{bmatrix}.' },
            { text: 'Interpret: Gel pen costs ₹\\(115/7\\) (≈ ₹16.43), ball pen costs ₹\\(65/7\\) (≈ ₹9.29).', faded: true, blankAnswer: 'Gel pen = ₹\\(115/7\\) (≈ ₹16.43), Ball pen = ₹\\(65/7\\) (≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_009', title: 'Cramer\'s Rule for Solving Linear Equations',
          scaffold: { problem: 'A stationery shop sells pens and notebooks. 5 pens and 3 notebooks cost ₹140. 2 pens and 4 notebooks cost ₹110.',
            steps: [
            { text: 'Let x = cost of one pen (₹), y = cost of one notebook (₹). Form equations: 5x + 3y = 140 and 2x + 4y = 110.' },
            { text: 'Write coefficient matrix A = [[5, 3], [2, 4]] and constant matrix B = [[140], [110]].' },
            { text: 'For x, replace column 1 of A with B: Δₓ = det([[140, 3], [110, 4]]) = 140×4 − 3×110 = 560 − 330 = 230.' },
            { text: 'For y, replace column 2 of A with B: Δᵧ = det([[5, 140], [2, 110]]) = 5×110 − 140×2 = 550 − 280 = 270.' },
            { text: 'Verify: 5(115/7) + 3(135/7) = (575 + 405)/7 = 980/7 = 140 ✓. 2(115/7) + 4(135/7) = (230 + 540)/7 = 770/7 = 110 ✓.', faded: true, blankAnswer: 'Pen costs ₹115/7 (≈ ₹16.43), Notebook costs ₹135/7 (≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_010', title: 'Consistency of System of Linear Equations',
          scaffold: { problem: 'A small bakery in Mumbai sells three types of cakes: Chocolate (₹x), Vanilla (₹y), Strawberry (₹z).',
            steps: [
            { text: 'Write the system in matrix form AX = B.' },
            { text: 'Compute |A| by expanding along first row.' },
            { text: 'Since |A| = 4 ≠ 0, the system has a unique solution (consistent). Prices can be determined uniquely.' },
            { text: 'Find A⁻¹ = (adj A)/|A|. First compute cofactors:' },
            { text: 'X = A⁻¹B = (1/4)[[3, -1, -1], [-1, 3, -1], [-1, -1, 3]] [180, 150, 150]ᵀ.', faded: true, blankAnswer: 'Consistent with unique solution: Chocolate cake ₹60.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_04_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Surveying a triangular plot, two juniors compute the same 3×3 coordinate determinant — one expands along row 1, the other along column 3 — and get different values. Both insist their method is \'more reliable.\'',
            decisions: [{ prompt: 'Can a determinant depend on which line you expand along?', options: [
                { text: 'No — the value is invariant under choice of row or column, so at least one expansion carries a sign or arithmetic slip; rerun with the sign pattern (+ − + / − + − / + − +) marked and pick the line with the most zeros to minimise where errors breed.', outcome: 'The chapter\'s invariance is the tie-breaker: same matrix, same determinant — disagreement between expansion lines is a computation audit flag, not a methodological debate.' },
                { text: 'Yes — different lines weight different elements, so mild variation is expected.', outcome: 'Expansion is a theorem, not an estimator: every row and column expansion returns the identical scalar, so \'mild variation\' means a mistake, not a methodological difference.', reveals: 'line-choice-changes-value' },
                { text: 'Average the two results to cancel out the line bias.', outcome: 'There\'s no bias to cancel — the determinant is a single number; averaging a right answer with a wrong one manufactures a third wrong answer.', reveals: 'average-the-disagreement' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You can now read a determinant as a solvability certificate — the single number that decides whether the system has one answer or none.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_04_007', difficulty: 'standard',
          question: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix.',
          hint: 'If stuck on cofactor signs or determinant calculation, revisit c12_math_cbse_04_005.',
          misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying',
                  options: ['The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying', 'A determinant is a scalar value (real or complex) associated uniquely with every square', 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted', 'Properties of determinants are a set of algebraic rules that describe how the value of a'],
                  hint: 'If stuck on cofactor signs or determinant calculation, revisit c12_math_cbse_04_005 (Minors and.',
                  misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.' }
          ],
            remediations: { 'students-compute-the-cofactor-matrix': { steps: ['Remediation: Return to c12_math_cbse_04_006 (Adjoint of a Matrix) and re-derive adj A for a 3×3 matrix step by step.', 'Use a matrix with distinct off-diagonal cofactors (e.g., A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]) so the transpose.', 'Re-do Diagnostic Question 3 with this matrix.', 'Then re-attempt Diagnostic Question 5 with |A| ≠ 1 to force the division step.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_008', difficulty: 'standard',
          question: 'The matrix method solves a system of linear equations \\(AX = B\\) by computing.',
          hint: 'Revisit **c12_math_cbse_04_007** (Inverse of a Matrix Using Adjoint) and.',
          misconception: 'Students often compute the cofactor matrix correctly but forget to **transpose** it to get the adjoint.',
          parts: [
                { id: 'a', prompt: 'A student writes the system \\(3x - 2y = 7, \\; 5x + 4y = 1\\) as \\(AX = B\\) with \\(A = \\begin{bmatrix}3 & -2\\\\5 & 4\\end{bmatrix}\\), \\(X.', answer: 'The adjoint of \\(A\\) should be \\(\\begin{bmatrix}4 & 2\\\\-5 & 3\\end{bmatrix}\\)?',
                  options: ['The adjoint of \\(A\\) should be \\(\\begin{bmatrix}4 & 2\\\\-5 & 3\\end{bmatrix}\\)?', 'yes it\'s correct'],
                  hint: 'Revisit **c12_math_cbse_04_007** (Inverse of a Matrix Using Adjoint) and **c12_math_cbse_04_003**.',
                  misconception: 'Students often compute the cofactor matrix correctly but forget to **transpose** it to get the adjoint.' }
          ],
            remediations: { 'students-often-compute-the-cofactor': { steps: ['If a student makes the adjoint transpose error: (1) Have them write the definition: "Adjoint of \\(A\\) is the transpose.', '(3) Re-solve a 3×3 system step-by-step, explicitly writing the cofactor matrix and then its transpose.', '(4) Give a diagnostic: "Find adjoint of \\(\\begin{bmatrix}1 & 0 & 2\\\\-1 & 3 & 1\\\\2 & 1 & 0\\end{bmatrix}\\)" and check.', 'If they still err, revisit node **c12_math_cbse_04_006** (Adjoint definition) and **c12_math_cbse_04_005** (Minors and.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_009', difficulty: 'standard',
          question: 'Cramer\'s Rule states that for a system of n linear equations in n variables.',
          hint: 'If stuck on determinant computation, revisit c12_math_cbse_04_002 (3×3 determinant.',
          misconception: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.',
          parts: [
                { id: 'a', prompt: 'Compare Cramer\'s Rule and the Matrix Inverse Method (X = A⁻¹B) for solving a 3×3 system.', answer: 'you only need the value of one variable, say y?',
                  options: ['you only need the value of one variable, say y?', 'Cramer\'s Rule is always better', 'Inverse method is always better'],
                  hint: 'If stuck on determinant computation, revisit c12_math_cbse_04_002 (3×3 determinant expansion) and.',
                  misconception: 'The most frequent error is replacing the wrong column when forming Δₓ, Δᵧ, Δz.' }
          ],
            remediations: { 'the-most-frequent-error-is': { steps: ['If a student consistently replaces the wrong column: Have them write the coefficient matrix with variable labels above.', 'Then practice: "To find x, which column has x-coefficients?', 'So replace Column 1 with constants." Use color-coding: highlight the x-column in blue, constants in red, then show the.', 'For sign errors in 3×3 expansion: drill the checkerboard sign pattern (+ − + / − + − / + − +) and have them write the.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_010', difficulty: 'standard',
          question: 'A system of linear equations AX = B is **consistent** if at least one solution.',
          hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent.',
          misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).',
          parts: [
                { id: 'a', prompt: 'State the three cases for consistency of a system AX = B with square matrix A, giving the condition on |A| and (adj A)B for each case.', answer: 'Case 1: |A| ≠ 0 → unique solution (consistent)',
                  options: ['Case 1: |A| ≠ 0 → unique solution (consistent)', 'Case 3 is always consistent', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent System).',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'b', prompt: 'For the system x + 2y = 3 and 2x + 4y = 7, write the matrix form AX = B, compute |A| and (adj A)B, and state whether the system is consistent or inconsistent.', answer: 'A = [[1, 2], [2, 4]], B = [3, 7]ᵀ',
                  options: ['A = [[1, 2], [2, 4]], B = [3, 7]ᵀ', 'infinitely many solutions', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent System).',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'c', prompt: 'Determine the consistency of the system: 2x – y + 3z = 5, 4x – 2y + 6z = 10, 6x – 3y + 9z = 15. Show all steps including computation of |A| and (adj A)B.', answer: 'A = [[2, -1, 3], [4, -2, 6], [6, -3, 9]], B = [5, 10, 15]ᵀ',
                  options: ['A = [[2, -1, 3], [4, -2, 6], [6, -3, 9]], B = [5, 10, 15]ᵀ', 'inconsistent because |A|=0', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent System).',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'd', prompt: 'Compare the consistency conditions for a 2×2 system and a 3×3 system. Are the criteria exactly the same?', answer: 'The criteria are identical in form: |A| ≠ 0 → unique',
                  options: ['The criteria are identical in form: |A| ≠ 0 → unique', 'the criteria are exactly the same for all n', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent System).',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' }
          ],
            remediations: { 'if-a-0-then-the': { steps: ['If a student makes this error: (1) Have them revisit node c12_math_cbse_04_007 (Inverse of a Matrix Using Adjoint).', '(2) Revisit node c10_math_cbse_03_003 (Inconsistent System: Parallel Lines) and c10_math_cbse_03_004 (Dependent System.', '(3) Practice the decision tree: compute |A| → if ≠0 stop (unique); if =0 compute (adj A)B → if ≠0 stop (inconsistent).', '(4) Re-diagnostic: give a system where |A| = 0, (adj A)B = 0 but constants break proportionality (like Diagnostic 6).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).',
          parts: [
                { id: 'a', prompt: 'A student solves the system x + y + z = 6, 2x + 2y + 2z = 12, 3x + 3y + 3z = 18 and writes: "|A| = 0, so the system has no solution." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent System).',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' },
                { id: 'b', prompt: 'Construct a 3×3 system of linear equations that has |A| = 0 and (adj A)B = 0 but is INCONSISTENT. Explain why your example works.', answer: 'Example: x + y + z = 1, 2x + 2y + 2z = 2, 3x + 3y + 3z = 5',
                  options: ['Example: x + y + z = 1, 2x + 2y + 2z = 2, 3x + 3y + 3z = 5', 'if |A| = 0 then the system is automatically inconsistent (no solution)'],
                  hint: 'Revisit c12_math_cbse_04_006 (Adjoint of a Matrix) and c10_math_cbse_03_003 (Inconsistent System).',
                  misconception: 'Students often believe that if |A| = 0 then the system is automatically inconsistent (no solution).' }
          ],
            remediations: { 'if-a-0-then-the': { steps: ['If a student makes this error: (1) Have them revisit node c12_math_cbse_04_007 (Inverse of a Matrix Using Adjoint).', '(2) Revisit node c10_math_cbse_03_003 (Inconsistent System: Parallel Lines) and c10_math_cbse_03_004 (Dependent System.', '(3) Practice the decision tree: compute |A| → if ≠0 stop (unique); if =0 compute (adj A)B → if ≠0 stop (inconsistent).', '(4) Re-diagnostic: give a system where |A| = 0, (adj A)B = 0 but constants break proportionality (like Diagnostic 6).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
