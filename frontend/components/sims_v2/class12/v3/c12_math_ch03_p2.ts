import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch03_p2: SimDef = {
    id: 'v3_c12_math_ch03_p2',
    title: 'Matrices · Part 2/2',
    subtitle: 'The 1×1 matrix is every type at once',
    classLevel: 12, subject: 'mathematics', topic: 'Matrices · Part 2/2',
    chapters: ['c12_math_ch03'],
    nodeIds: ['c12_math_cbse_03_007', 'c12_math_cbse_03_008', 'c12_math_cbse_03_009', 'c12_math_cbse_03_010', 'c12_math_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Matrix architect', intro: 'A grid of numbers becomes powerful the moment its rows and columns get rules.', goal: 'Read matrix order, build matrices from element formulas, and classify the seven types precisely.' },
    discovery: {
        question: 'Flip a matrix, multiply by its inverse — what do you always get back?',
        options: ['The identity matrix — ones down the diagonal', 'The zero matrix', 'The original matrix', 'A random matrix'],
        answer: 'The identity matrix — ones down the diagonal',
        hook: 'The identity matrix is the \'1\' of matrix world — everything times it stays itself. That single idea solves equations in 3 unknowns.',
    },
    teaching: [
        { title: 'Properties of Matrix Multiplication: Non-Commutativity', text: 'Matrix multiplication is non-commutative, meaning that for two matrices A and B where both products AB and BA are defined, it is generally true that AB ≠ BA.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_03_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Build matrices from formulas: compute a_ij = (i−2j)² cell by cell, classify P and Q through the diagonal→scalar→identity chain, and write matrix equality the way the marking scheme wants it.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_007', title: 'Properties of Matrix Multiplication: Non-Commutativity',
          scaffold: { problem: 'A school bookstore sells 3 items: notebooks (₹40), pens (₹10), and erasers (₹5).',
            steps: [
            { text: 'Write order matrix O = [[30, 50, 20], [25, 40, 15]] (rows = classes, columns = items).' },
            { text: 'Discount matrices: D_X = diag(0.9, 0.95, 1.0), D_Y = diag(0.95, 0.95, 0.95). Both are 3×3 diagonal.' },
            { text: 'Compute revenue without discount: R = O × P = [[30×40 + 50×10 + 20×5], [25×40 + 40×10 + 15×5]] = [[1200+500+100].' },
            { text: 'For Scheme X: First apply discount to prices: P_X = D_X × P = [[0.9×40], [0.95×10], [1.0×5]] = [[36], [9.5], [5]].' },
            { text: 'Alternative order: Apply discount to order quantities? O × D_X is not defined (2×3 × 3×3 = 2×3, but that would discount.', faded: true, blankAnswer: 'Scheme X revenue: Class 12A = ₹1655, Class 12B = ₹1355.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_008', title: 'Transpose of a Matrix: Definition and Properties',
          scaffold: { problem: 'A school stores the fees (in rupees) for three classes (VI, VII, VIII) in two terms (Term 1, Term 2) as a matrix \\(F = \\begin{bmatrix} 5000.',
            steps: [
            { text: 'Identify the given matrix \\(F\\) has order \\(3 \\times 2\\) (3 classes, 2 terms).' },
            { text: 'To swap rows and columns, write the first row of \\(F\\) as the first column of \\(F\'\\), the second row as the second.' },
            { text: '\\(F\' = \\begin{bmatrix} 5000 & 6000 & 7000 \\\\ 5500 & 6500 & 7500 \\end{bmatrix}\\).' },
            { text: 'Verify order: \\(F\'\\) has 2 rows (terms) and 3 columns (classes), so order is \\(2 \\times 3\\).' },
            { text: 'Interpret: The entry in row 1, column 2 of \\(F\'\\) is 6000, which is the Term 1 fee for Class VII — consistent with the.', faded: true, blankAnswer: '\\(F\' = \\begin{bmatrix} 5000 & 6000 & 7000 \\\\ 5500 & 6500 &.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_009', title: 'Symmetric and Skew-Symmetric Matrices',
          scaffold: { problem: 'A structural engineer models the stiffness of a triangular truss with matrix \\( K = \\begin{bmatrix} 10 & -2 & 1 \\\\ -3 & 8 & -4 \\\\ 2 & -1 &.',
            steps: [
            { text: 'Write down \\( K \\) and compute its transpose \\( K\' \\) by interchanging rows and columns.' },
            { text: 'Add \\( K \\) and \\( K\' \\) element-wise to get \\( K+K\' \\), then multiply by \\( \\frac{1}{2} \\) to obtain \\( K_s \\).' },
            { text: 'Subtract \\( K\' \\) from \\( K \\) element-wise to get \\( K-K\' \\), then multiply by \\( \\frac{1}{2} \\) to obtain \\( K_a \\).' },
            { text: 'Check \\( K_s \\) is symmetric (\\( K_s\' = K_s \\)) and \\( K_a \\) is skew-symmetric (\\( K_a\' = -K_a \\)).' },
            { text: 'Add \\( K_s + K_a \\) and confirm it equals original \\( K \\).', faded: true, blankAnswer: '\\( K\' = \\begin{bmatrix} 10 & -3 & 2 \\\\ -2 & 8 & -1 \\\\ 1 &.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_010', title: 'Elementary Transformations of a Matrix',
          scaffold: { problem: 'A small factory in Pune produces three products (P₁, P₂, P₃) using three raw materials (R₁, R₂, R₃).',
            steps: [
            { text: 'Identify the operations in order: (i) Swap product order so P₃ is first → this is R₁ ↔ R₃.' },
            { text: 'Start with M = [[2, 3, 1], [1, 2, 2], [3, 1, 3]]. Apply R₁ ↔ R₃: new matrix = [[3, 1, 3], [1, 2, 2], [2, 3, 1]].' },
            { text: 'Apply R₂ → 2R₂: multiply second row by 2 → [[3, 1, 3], [2, 4, 4], [2, 3, 1]].' },
            { text: 'Apply R₃ → R₃ - 2R₁: new R₃ = [2,3,1] - 2×[3,1,3] = [2-6, 3-2, 1-6] = [-4, 1, -5].' },
            { text: 'Verify each operation was applied to the current matrix, not the original.', faded: true, blankAnswer: 'Final matrix = [[3, 1, 3], [2, 4, 4], [-4, 1, -5]]' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_011', title: 'Inverse of a Matrix by Elementary Operations',
          scaffold: { problem: 'A small factory produces two products P and Q. Each unit of P requires 2 hours on Machine A and 1 hour on Machine B.',
            steps: [
            { text: 'Let x = units of P, y = units of Q. Equations: 2x + y = 100 (Machine A), x + 3y = 120 (Machine B).' },
            { text: 'Set up augmented matrix [A | I] = [2 1 | 1 0; 1 3 | 0 1].' },
            { text: 'Swap rows to get 1 in top-left: R₁ ↔ R₂ → [1 3 | 0 1; 2 1 | 1 0].' },
            { text: 'Eliminate below pivot: R₂ → R₂ - 2R₁ → [1 3 | 0 1; 0 -5 | 1 -2].' },
            { text: 'Make pivot 1 in row 2: R₂ → (-1/5)R₂ → [1 3 | 0 1; 0 1 | -1/5 2/5].' },
            { text: 'Eliminate above pivot: R₁ → R₁ - 3R₂ → [1 0 | 3/5 -1/5; 0 1 | -1/5 2/5].' },
            { text: 'Thus A⁻¹ = [[3/5, -1/5], [-1/5, 2/5]] = (1/5)[[3, -1], [-1, 2]].' },
            { text: 'Compute [x; y] = A⁻¹[100; 120] = (1/5)[[3, -1], [-1, 2]] [100; 120] = (1/5)[300-120; -100+240] = (1/5)[180; 140] = [36.' },
            { text: 'Verify: Machine A: 2(36) + 28 = 72 + 28 = 100 ✓. Machine B: 36 + 3(28) = 36 + 84 = 120 ✓.', faded: true, blankAnswer: 'Produce 36 units of P and 28 units of Q. A⁻¹ = (1/5)[[3.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_03_011', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab teammate calls a 4×4 sensor table \'a diagonal matrix because the diagonal is all filled in\', while another insists a zero-filled grid \'can\'t be diagonal — the diagonal\'s empty.\'',
            decisions: [{ prompt: 'What does the diagonal-matrix definition actually check?', options: [
                { text: 'The off-diagonals — a square matrix is diagonal exactly when every i≠j entry is zero; the main diagonal can hold anything including zeros, so the full-diagonal table isn\'t diagonal if off-diagonals carry data, and the all-zero grid is.', outcome: 'The chapter\'s test runs on the positions you aren\'t looking at: \'diagonal\' is a statement about empty off-diagonals, not about a populated principal diagonal.' },
                { text: 'The first teammate is right — a matrix with a complete diagonal is by definition diagonal.', outcome: 'That inverts the condition: diagonal entries may be anything, but off-diagonal entries must be zero — a table full of sensor cross-talk fails precisely because its off-diagonals are live.', reveals: 'full-diagonal-equals-diagonal' },
                { text: 'The second teammate is right — zero diagonal means no diagonal to speak of.', outcome: 'The definition never asks the diagonal to be non-zero; an all-zero square matrix satisfies aᵢⱼ=0 for i≠j vacuously and is diagonal — and also scalar and identity-like degenerate cases at once.', reveals: 'zero-diagonal-not-diagonal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'Rows, columns, determinants — you just learned the algebra that runs every 3D game and every neural network.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_03_007', difficulty: 'standard',
          question: 'Matrix multiplication is non-commutative, meaning that for two matrices A and.',
          hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
          misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.',
          parts: [
                { id: 'a', prompt: 'Given matrices A (2×3) and B (3×2), which of the following statements is correct?', answer: 'Correct answer: (b)',
                  options: ['Correct answer: (b)', 'non-commutative', 'never commutative', 'matrix multiplication is commutative when both products exist'],
                  hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' },
                { id: 'b', prompt: 'If A = [[1, 2], [3, 4]] and B = [[2, 0], [0, 2]], compute AB and BA. Are they equal? Explain why this specific pair commutes while most matrix pairs do not.', answer: 'AB = [[2, 4], [6, 8]], BA = [[2, 4], [6, 8]]',
                  options: ['AB = [[2, 4], [6, 8]], BA = [[2, 4], [6, 8]]', 'they commute because both are 2×2', 'non-commutative', 'never commutative'],
                  hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' },
                { id: 'c', prompt: 'Find 2×2 matrices A and B such that AB = O (zero matrix) but A ≠ O and B ≠ O. Verify your answer by computing AB.', answer: 'Example: A = [[1, 2], [2, 4]], B = [[2, -1], [-1, 0.5]]',
                  options: ['Example: A = [[1, 2], [2, 4]], B = [[2, -1], [-1, 0.5]]', 'AB = O implies A = O or B = O', 'non-commutative', 'never commutative'],
                  hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' },
                { id: 'd', prompt: 'Let A = [[1, 2], [3, 4]] and B = [[a, b], [c, d]]. Find conditions on a, b, c, d such that AB = BA. How many independent parameters does the solution have?', answer: 'AB = [[a+2c, b+2d], [3a+4c, 3b+4d]], BA = [[a+3b, 2a+4b], [c+3d, 2c+4d]]',
                  options: ['AB = [[a+2c, b+2d], [3a+4c, 3b+4d]], BA = [[a+3b, 2a+4b], [c+3d, 2c+4d]]', 'only scalar matrices commute', 'non-commutative', 'never commutative'],
                  hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' }
          ],
            remediations: { 'if-ab-and-ba-are': { steps: ['Have the student compute AB and BA for A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]] explicitly, showing each entry.', 'Ask "Why are (1,1) entries different?" — because AB uses row 1 of A with column 1 of B, while BA uses row 1 of B with.', 'Show that for diagonal D = [[2, 0], [0, 3]], DA = [[2, 4], [6, 12]] and AD = [[2, 4], [6, 12]] — they match because.', 'Assign practice: find 3 pairs of 2×2 matrices that commute and 3 that don\'t, with full working.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If A and B are both 3×3 matrices and AB = BA, then A and B must be diagonal matrices." Evaluate this claim.', answer: 'The claim is false',
                  options: ['The claim is false', 'confuses', 'non-commutative', 'never commutative'],
                  hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' }
          ],
            remediations: { 'if-ab-and-ba-are': { steps: ['Have the student compute AB and BA for A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]] explicitly, showing each entry.', 'Ask "Why are (1,1) entries different?" — because AB uses row 1 of A with column 1 of B, while BA uses row 1 of B with.', 'Show that for diagonal D = [[2, 0], [0, 3]], DA = [[2, 4], [6, 12]] and AD = [[2, 4], [6, 12]] — they match because.', 'Assign practice: find 3 pairs of 2×2 matrices that commute and 3 that don\'t, with full working.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_008', difficulty: 'standard',
          question: 'The transpose of a matrix \\(A = [a_{ij}]_{m \\times n}\\) is the matrix \\(A\'\\).',
          hint: 'If stuck, review matrix multiplication (c12_math_cbse_03_005) and matrix addition.',
          misconception: 'Students frequently write \\((AB)\' = A\'B\'\\) instead of \\((AB)\' = B\'A\'\\).',
          parts: [
                { id: 'a', prompt: 'Explain why \\((A\')\' = A\\) is always true for any matrix \\(A\\). Use the definition of transpose in your explanation.', answer: 'Transpose swaps rows and columns: \\((A\')_{ij} = a_{ji}\\)',
                  options: ['Transpose swaps rows and columns: \\((A\')_{ij} = a_{ji}\\)', 'it\'s a property'],
                  hint: 'If stuck, review matrix multiplication (c12_math_cbse_03_005) and matrix addition.',
                  misconception: 'Students frequently write \\((AB)\' = A\'B\'\\) instead of \\((AB)\' = B\'A\'\\).' }
          ],
            remediations: { 'students-frequently-write-ab-a': { steps: ['Revisit the definition of matrix multiplication (node c12_math_cbse_03_005) and explicitly write the \\((i,k)\\)-th.', 'Write the \\((k,i)\\)-th element of \\((AB)\'\\) as \\(\\sum_j a_{ij}b_{jk}\\).', 'Write the \\((k,i)\\)-th element of \\(B\'A\'\\) as \\(\\sum_j b_{kj}a_{ji} = \\sum_j a_{ij}b_{jk}\\) (since \\(b_{kj}.', 'Conclude that the two sums are identical, so \\((AB)\' = B\'A\'\\).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_009', difficulty: 'standard',
          question: 'A square matrix \\( A = [a_{ij}] \\) is **symmetric** if \\( A\' = A \\), i.e., \\.',
          hint: 'If stuck, go back to **c12_math_cbse_03_008** and practice: "Given \\( A = \\begin{bmatrix}.',
          misconception: '**Exact error:** Students write \\( (A - A\')\' = A\' - A \\) and stop, claiming this proves \\( A - A\' \\) is skew-symmetric.',
          parts: [
                { id: 'a', prompt: 'If \\( A = \\begin{bmatrix} 0 & 2 & -3 \\\\ -2 & 0 & 4 \\\\ 3 & -4 & 0 \\end{bmatrix} \\), is \\( A \\) symmetric, skew-symmetric, or neither?', answer: '\\( A\' = \\begin{bmatrix} 0 & -2 & 3 \\\\ 2 & 0 & -4 \\\\ -3 & 4 & 0 \\end{bmatrix} \\)',
                  options: ['\\( A\' = \\begin{bmatrix} 0 & -2 & 3 \\\\ 2 & 0 & -4 \\\\ -3 & 4 & 0 \\end{bmatrix} \\)', 'skew-symmetric, or computes transpose incorrectly (sign errors)'],
                  hint: 'If stuck, go back to **c12_math_cbse_03_008** and practice: "Given \\( A = \\begin{bmatrix} 2 & -1 \\\\.',
                  misconception: '**Exact error:** Students write \\( (A - A\')\' = A\' - A \\) and stop, claiming this proves \\( A - A\' \\) is skew-symmetric — but they miss the.' }
          ],
            remediations: { 'exact-error-students-write-a': { steps: ['Revisit **c12_math_cbse_03_008** (Transpose of a Matrix) — practice computing transposes and verifying \\( (A\')\' = A \\).', 'Do 5 drill problems: given random square matrices, compute \\( A+A\' \\) and \\( A-A\' \\), then check symmetry by comparing.', 'Re-derive the decomposition theorem step-by-step: start with \\( A = \\frac{1}{2}(A+A\') + \\frac{1}{2}(A-A\') \\), prove.', 'Re-diagnostic: Use **DIAGNOSTIC_QUESTION_4** — if student cannot complete the proof independently, repeat step 2 with.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_010', difficulty: 'standard',
          question: 'Elementary transformations (or elementary operations) of a matrix are three.',
          hint: 'If stuck, revisit c12_math_cbse_03_006 (Scalar Multiplication) and c12_math_cbse_03_004.',
          misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.',
          parts: [
                { id: 'a', prompt: 'What are the three elementary row operations on a matrix? Write the standard notation for each.', answer: 'The three elementary row operations are: (1) Interchange of two rows: Rᵢ ↔ Rⱼ',
                  options: ['The three elementary row operations are: (1) Interchange of two rows: Rᵢ ↔ Rⱼ', 'non-zero'],
                  hint: 'If stuck, revisit c12_math_cbse_03_006 (Scalar Multiplication) and c12_math_cbse_03_004 (Matrix.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' },
                { id: 'b', prompt: 'Explain why multiplying a row by zero (Rᵢ → 0·Rᵢ) is NOT allowed as an elementary transformation, even though it seems like a special case of Rᵢ → kRᵢ.', answer: 'Multiplying a row by zero destroys information',
                  options: ['Multiplying a row by zero destroys information', 'it\'s allowed because k can be any number'],
                  hint: 'If stuck, revisit c12_math_cbse_03_006 (Scalar Multiplication) and c12_math_cbse_03_004 (Matrix.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' }
          ],
            remediations: { 'students-often-write-r-r': { steps: ['If a student struggles with the non-zero scalar condition or sequential application: 1.', 'Have them revisit c12_math_cbse_03_004 (Matrix Addition) and c12_math_cbse_03_006 (Scalar Multiplication) to reinforce.', 'Practice with a 2×2 matrix: write A, apply R₁ → 0·R₁, then ask "Can you get back A?" — physically demonstrate.', 'For sequential errors: give a 3-step sequence on a 3×3 matrix; have them circle which matrix each operation acts.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_011', difficulty: 'standard',
          question: 'The inverse of a square matrix A (denoted A⁻¹) is a square matrix of the same.',
          hint: 'If stuck, go back to c12_math_cbse_03_010 and practice: (1) reducing a 3×3 matrix.',
          misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution.',
          parts: [
                { id: 'a', prompt: 'State the exact condition for a square matrix A to have an inverse, and write the starting augmented matrix setup for finding A⁻¹ by elementary row operations.', answer: 'A square matrix A has an inverse iff it is non-singular (det(A) ≠ 0)',
                  options: ['A square matrix A has an inverse iff it is non-singular (det(A) ≠ 0)', 'write [I | A]', 'add to eliminate', 'subtract the multiple'],
                  hint: 'If stuck, go back to c12_math_cbse_03_010 and practice: (1) reducing a 3×3 matrix to row-echelon.',
                  misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution phase).' },
                { id: 'b', prompt: 'Find the inverse of A = [[2, 3], [1, 2]] using elementary row operations. Show every step with the operation notation (e.g., R₁ ↔ R₂, R₁ → R₁/2, R₂ → R₂ - R₁).', answer: 'Start: [2 3 | 1 0',
                  options: ['Start: [2 3 | 1 0', 'add to eliminate', 'subtract the multiple'],
                  hint: 'If stuck, go back to c12_math_cbse_03_010 and practice: (1) reducing a 3×3 matrix to row-echelon.',
                  misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution phase).' },
                { id: 'c', prompt: 'Matrix B = [[1, 2, 3], [2, 4, 6], [1, 0, -1]]. Without computing the determinant, use elementary row operations to determine whether B⁻¹ exists.', answer: 'Start: [1 2 3 | 1 0 0',
                  options: ['Start: [1 2 3 | 1 0 0', 'add to eliminate', 'subtract the multiple'],
                  hint: 'If stuck, go back to c12_math_cbse_03_010 and practice: (1) reducing a 3×3 matrix to row-echelon.',
                  misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution phase).' }
          ],
            remediations: { 'students-frequently-make-sign-errors': { steps: ['If a student makes sign errors in back-substitution: 1) Have them practice the 2×2 case repeatedly with the mantra "new.', '2) Use colour coding: highlight the pivot column, circle the entry to eliminate, write the operation explicitly before.', '3) For zero-pivot issues: give 3 matrices where the first pivot is zero — force them to identify the swap row (R₁ ↔ R₂.', '4) Revisit node c12_math_cbse_03_010 (Elementary Transformations) and redo the row operation drills there.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
