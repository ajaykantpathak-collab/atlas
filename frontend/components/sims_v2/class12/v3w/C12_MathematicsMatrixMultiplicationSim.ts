import type { SimDef } from '../../engine/types';
import C12_MathematicsMatrixMultiplicationSim from '../../../simulations/c6_12/C12_MathematicsMatrixMultiplicationSim';

/** v3 wrapped master — C12_MathematicsMatrixMultiplicationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsmatrixmultiplicationsim: SimDef = {
    id: 'v3w_c12_mathematicsmatrixmultiplicationsim',
    title: 'Matrix: Definition and Types',
    subtitle: 'This node covers the definition of a matrix, order of a matrix, notation a_ij, and the.',
    classLevel: 12, subject: 'mathematics', topic: 'Matrix: Definition and Types',
    chapters: [],
    nodeIds: ['c12_math_cbse_03_001', 'c12_math_cbse_03_003', 'c12_math_cbse_03_004', 'c12_math_cbse_03_005', 'c12_math_cbse_03_006', 'c12_math_cbse_03_007', 'c12_math_cbse_03_008', 'c12_math_cbse_03_010', 'c12_math_cbse_04_003', 'c12_math_cbse_01_009', 'c12_math_cbse_03_002', 'c12_math_cbse_03_009', 'c12_math_cbse_03_011', 'c12_math_cbse_04_001', 'c12_math_cbse_04_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the class monitor and need to record the marks of 40 students in 5 subjects.', goal: 'Master Matrix: Definition and Types.' },
    discovery: {
        question: 'A student writes: "The matrix B = [5] is a row matrix because it has one row." Is this correct? Explain why or why not.',
        options: ['The statement is incorrect', 'only a row matrix', 'the first subscript is column and the second is row (i'],
        answer: 'The statement is incorrect',
        hook: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij =.',
    },
    teaching: [
        { title: 'A matrix is an ordered rectangular array of.', text: 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and columns, denoted by a capital letter. The individual items are called elements or entries.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_001', title: 'A matrix is an ordered rectangular.',
          scaffold: { problem: 'A school has 3 sections (A, B, C) in Class 12. Each section has students opting for 4 streams: Science, Commerce, Humanities, Vocational.',
            steps: [
            { text: 'Identify what constitutes rows and columns. Here, sections (3) are rows, streams (4) are columns. Order = 3 × 4.' },
            { text: 'Write the matrix with brackets. Row 1 = Section A data: [40, 25, 15, 10]. Row 2 = Section B data: [35, 30, 20, 5].' },
            { text: 'Write the complete matrix: A = [[40, 25, 15, 10], [35, 30, 20, 5], [30, 20, 25, 15]].' },
            { text: 'Verify order: 3 rows, 4 columns → 3 × 4. Total elements = 12.' },
            { text: 'Locate Commerce in Section B: Commerce is column 2, Section B is row 2 → element a_22 = 30.', faded: true, blankAnswer: 'Matrix A = [[40, 25, 15, 10], [35, 30, 20, 5], [30, 20, 25,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_003', title: 'Two matrices A = [aij] and B = [bij].',
          scaffold: { problem: 'A school store sells notebooks and pens. The sales data for Monday and Tuesday are recorded in matrices:',
            steps: [
            { text: 'Identify orders. M is 2×2 (2 rows, 2 columns). T is 2×2. Orders match → equality possible.' },
            { text: 'Write element-wise equality equations from M = T:' },
            { text: 'Solve: x = 45, y = 15.' },
            { text: 'Verify all four positions: M = [[45,30],[20,15]], T = [[45,30],[20,15]] → identical.' },
            { text: 'Interpret: On Tuesday, Class 11 bought 45 notebooks (same as Monday) and Class 12 bought 15 pens (same as Monday).', faded: true, blankAnswer: 'x = 45 notebooks, y = 15 pens.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_004', title: 'Matrix addition is defined for two.',
          scaffold: { problem: 'A school canteen sells three snacks (Samosa, Sandwich, Juice) on two days (Monday, Tuesday). The sales (in pieces) are recorded as matrices:',
            steps: [
            { text: 'Verify both matrices have the same order. \\(M\\) is \\(3 \\times 2\\), \\(N\\) is \\(3 \\times 2\\) → addition is defined.' },
            { text: 'Write the sum matrix \\(T = M + N\\) by adding corresponding entries.' },
            { text: 'Compute each element:' },
            { text: 'Assemble the total matrix:' },
            { text: 'Interpret: Combined Samosa sales = 170 (Mon), 140 (Tue); Sandwich = 130, 140; Juice = 270, 230.', faded: true, blankAnswer: '\\(\\begin{bmatrix} 170 & 140 \\\\ 130 & 140 \\\\ 270 & 230.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_005', title: 'Matrix multiplication is a binary.',
          scaffold: { problem: 'A bookshop in Mumbai sells three types of notebooks: Classmate (₹60), Navneet (₹55), and Sundaram (₹50).',
            steps: [
            { text: 'Identify the matrices. Q (rows = days, columns = notebook types) = [[20, 15, 10], [25, 10, 15]].' },
            { text: 'Check compatibility: Q is 2×3, P is 3×1 → inner dimensions match (3=3), product R = QP will be 2×1.' },
            { text: 'Compute first entry (Monday revenue): r_11 = 20×60 + 15×55 + 10×50 = 1200 + 825 + 500 = 2525.' },
            { text: 'Compute second entry (Tuesday revenue): r_21 = 25×60 + 10×55 + 15×50 = 1500 + 550 + 750 = 2800.' },
            { text: 'Write result: R = [[2525], [2800]] rupees. Interpret: Monday revenue ₹2525, Tuesday revenue ₹2800.', faded: true, blankAnswer: 'Monday revenue = ₹2525, Tuesday revenue = ₹2800.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_006', title: 'Scalar multiplication of a matrix is.',
          scaffold: { problem: 'A small bakery tracks daily production of three items — bread loaves, croissants, and muffins — over 4 days (Mon-Thu) in a 3×4 matrix P.',
            steps: [
            { text: 'Identify scalar k = 3 and matrix P of order 3×4. Write down the definition: (3P)ᵢⱼ = 3 × Pᵢⱼ for all i=1..3, j=1..4.' },
            { text: 'Multiply each element of P by 3 systematically. Row 1 (bread): 3×50=150, 3×60=180, 3×55=165, 3×65=195.' },
            { text: 'Assemble H = 3P =' },
            { text: 'Holiday Monday is column 1 of H: 150 (bread) + 90 (croissants) + 60 (muffins) = 300 items.' },
            { text: 'Verify by computing 3 × (Mon total from P) = 3 × (50+30+20) = 3×100 = 300. Matches.', faded: true, blankAnswer: 'Holiday production matrix H =' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_007', title: 'Matrix multiplication is.',
          scaffold: { problem: 'A school bookstore sells 3 items: notebooks (₹40), pens (₹10), and erasers (₹5).',
            steps: [
            { text: 'Write order matrix O = [[30, 50, 20], [25, 40, 15]] (rows = classes, columns = items).' },
            { text: 'Discount matrices: D_X = diag(0.9, 0.95, 1.0), D_Y = diag(0.95, 0.95, 0.95). Both are 3×3 diagonal.' },
            { text: 'Compute revenue without discount: R = O × P = [[30×40 + 50×10 + 20×5], [25×40 + 40×10 + 15×5]] = [[1200+500+100],.' },
            { text: 'For Scheme X: First apply discount to prices: P_X = D_X × P = [[0.9×40], [0.95×10], [1.0×5]] = [[36], [9.5], [5]].' },
            { text: 'Alternative order: Apply discount to order quantities? O × D_X is not defined (2×3 × 3×3 = 2×3, but that would discount.', faded: true, blankAnswer: 'Scheme X revenue: Class 12A = ₹1655, Class 12B = ₹1355..' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_03_003', title: 'Identify each idea',
          dissect: { specimen: 'Matrix: Definition and Types', spots: [
            { id: 's1', label: 'A matrix is an ordered', prompt: 'Which idea is this? — A matrix is an ordered rectangular array of numbers or functions arranged in rows and.', answer: 'A matrix is an ordered', options: ['A matrix is an ordered', 'Two matrices A aij', 'Matrix addition is defined for', 'Matrix multiplication is a binary'] },
            { id: 's2', label: 'Two matrices A aij', prompt: 'Which idea is this? — Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the same.', answer: 'Two matrices A aij', options: ['Two matrices A aij', 'A matrix is an ordered', 'Matrix addition is defined for', 'Matrix multiplication is a binary'] },
            { id: 's3', label: 'Matrix addition is defined for', prompt: 'Which idea is this? — Matrix addition is defined for two matrices of the same order: if \\(A = [a_{ij}]_{m.', answer: 'Matrix addition is defined for', options: ['Matrix addition is defined for', 'A matrix is an ordered', 'Two matrices A aij', 'Matrix multiplication is a binary'] },
            { id: 's4', label: 'Matrix multiplication is a binary', prompt: 'Which idea is this? — Matrix multiplication is a binary operation that produces a matrix from two matrices.', answer: 'Matrix multiplication is a binary', options: ['Matrix multiplication is a binary', 'A matrix is an ordered', 'Two matrices A aij', 'Matrix addition is defined for'] },
            { id: 's5', label: 'Scalar multiplication of a matrix', prompt: 'Which idea is this? — Scalar multiplication of a matrix is the operation of multiplying every element of an m ×.', answer: 'Scalar multiplication of a matrix', options: ['Scalar multiplication of a matrix', 'A matrix is an ordered', 'Two matrices A aij', 'Matrix addition is defined for'] },
            { id: 's6', label: 'Matrix multiplication is non-commutative meaning', prompt: 'Which idea is this? — Matrix multiplication is non-commutative, meaning that for two matrices A and B where.', answer: 'Matrix multiplication is non-commutative meaning', options: ['Matrix multiplication is non-commutative meaning', 'A matrix is an ordered', 'Two matrices A aij', 'Matrix addition is defined for'] }
          ] } }
    ],
    explore: { component: C12_MathematicsMatrixMultiplicationSim, prompt: 'Explore the interactive — Matrix: Definition and Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_03_001', difficulty: 'standard',
          question: 'A matrix is an ordered rectangular array of numbers or functions arranged in.',
          hint: 'If stuck on a_ij notation, revisit Class 9 coordinate geometry (c9_math_ch1_1,.',
          misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij =.',
          parts: [
                { id: 'a', prompt: 'What is the order of the matrix A = [a_ij] where i = 1, 2, 3 and j = 1, 2, 3, 4? How many elements does it contain?', answer: 'The order is 3 × 4 (3 rows, 4 columns) and it contains 3 × 4 = 12 elements',
                  options: ['The order is 3 × 4 (3 rows, 4 columns) and it contains 3 × 4 = 12 elements', 'the first subscript is column and the second is row (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij = element in column i, row.' },
                { id: 'b', prompt: 'A student writes: "The matrix B = [5] is a row matrix because it has one row." Is this correct? Explain why or why not.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'only a row matrix', 'the first subscript is column and the second is row (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij = element in column i, row.' }
          ],
            remediations: { 'students-confuse-the-notation-a': { steps: ['If a student writes the transpose of the required matrix in construction problems: (1) Make them write "i = row, j =.', '(2) Have them draw a 2×3 grid and physically label row 1, row 2 and column 1, column 2, column 3.', '(3) Practice 5 construction problems where they must first write the order, then the general element formula, then.', '(4) Re-diagnostic: give a_ij = 2i - j for a 3×2 matrix and check if they produce 3 rows and 2 columns correctly.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij =.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If A = [[1, 2], [3, 4]] and B = [[1, 2], [3, 4]], then A = B because they look the same." Is this reasoning sufficient for board exam marks?', answer: 'The reasoning is insufficient',
                  options: ['The reasoning is insufficient', 'the first subscript is column and the second is row (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij = element in column i, row.' }
          ],
            remediations: { 'students-confuse-the-notation-a': { steps: ['If a student writes the transpose of the required matrix in construction problems: (1) Make them write "i = row, j =.', '(2) Have them draw a 2×3 grid and physically label row 1, row 2 and column 1, column 2, column 3.', '(3) Practice 5 construction problems where they must first write the order, then the general element formula, then.', '(4) Re-diagnostic: give a_ij = 2i - j for a 3×2 matrix and check if they produce 3 rows and 2 columns correctly.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_003', difficulty: 'standard',
          question: 'Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the.',
          hint: 'If stuck, revisit c12_math_cbse_03_001 (Matrix: Definition and Types) to practice writing.',
          misconception: 'Students often believe that if "most" corresponding elements match, the matrices are "almost equal" or that they can.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the same',
                  options: ['Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the same', 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and', 'Matrix addition is defined for two matrices of the same order: if \\(A = [a_{ij}]_{m', 'Matrix multiplication is a binary operation that produces a matrix from two matrices'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if "most" corresponding elements match, the matrices are "almost equal" or that they can ignore order mismatch.' }
          ],
            remediations: { 'if-most-corresponding-elements-match': { steps: ['If a student exhibits the above misconception: 1.', 'Make them write the definition verbatim: "Two matrices are equal IF AND ONLY IF (i) same order, (ii) all corresponding.', 'Give a counterexample: A = [1 2] (1×2), B = [[1], [2]] (2×1).', 'Both have elements 1 and 2." Student says yes.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if "most" corresponding elements match, the matrices are "almost equal" or that they can.',
          parts: [
                { id: 'a', prompt: 'A student solves [[x+2, 3], [4, y-1]] = [[5, 3], [4, 2]] and writes: "x+2 = 5 ⇒ x = 3; y-1 = 2 ⇒ y = 3. Check: 3 = 3 and 4 = 4 are true.', answer: 'The solution is correct and complete',
                  options: ['The solution is correct and complete', 'verification is unnecessary', 'they forgot to check order'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if "most" corresponding elements match, the matrices are "almost equal" or that they can ignore order mismatch.' }
          ],
            remediations: { 'if-most-corresponding-elements-match': { steps: ['If a student exhibits the above misconception: 1.', 'Make them write the definition verbatim: "Two matrices are equal IF AND ONLY IF (i) same order, (ii) all corresponding.', 'Give a counterexample: A = [1 2] (1×2), B = [[1], [2]] (2×1).', 'Both have elements 1 and 2." Student says yes.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_004', difficulty: 'standard',
          question: 'Matrix addition is defined for two matrices of the same order: if \\(A =.',
          hint: 'If stuck, review **c12_math_cbse_03_003 (Equality of Matrices)** to practice matching.',
          misconception: 'Students frequently attempt to add matrices of different orders, arguing that "both have 6 elements".',
          parts: [
                { id: 'a', prompt: 'Explain why the sum of a \\(2 \\times 3\\) matrix and a \\(3 \\times 2\\) matrix is not defined, even though both have 6 elements.', answer: 'Matrix addition requires corresponding positions to represent the same quantity',
                  options: ['Matrix addition requires corresponding positions to represent the same quantity', 'they have the same number of elements so it should work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently attempt to add matrices of different orders, arguing that "both have 6 elements".' }
          ],
            remediations: { 'students-frequently-attempt-to-add': { steps: ['Revisit **c12_math_cbse_03_003 (Equality of Matrices)** to reinforce that matrices are equal only when corresponding.', 'Practice integer/decimal addition/subtraction with signed numbers using **c6_math_ch02_019** and **c6_math_ch04_046**.', 'Work through 5 simple \\(2 \\times 2\\) matrix addition/subtraction problems, explicitly writing each element\'s.', 'Re-attempt Diagnostic Question 3 and 5; if errors persist, use colour-coding (e.g., red for row 1, blue for row 2) to.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_005', difficulty: 'standard',
          question: 'Matrix multiplication is a binary operation that produces a matrix from two.',
          hint: 'Revisit matrix order and addition in nodes c12_math_cbse_03_001 and c12_math_cbse_03_004;.',
          misconception: 'Students often multiply matrices element-wise (Hadamard product) instead of using the row-by-column dot product.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matrix multiplication is a binary operation that produces a matrix from two matrices',
                  options: ['Matrix multiplication is a binary operation that produces a matrix from two matrices', 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and', 'Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the same', 'Matrix addition is defined for two matrices of the same order: if \\(A = [a_{ij}]_{m'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply matrices element-wise (Hadamard product) instead of using the row-by-column dot product.' }
          ],
            remediations: { 'students-often-multiply-matrices-element': { steps: ['If a student multiplies element-wise, immediately contrast with a 2×2 numerical example showing the two results differ.', 'Have them write the definition: "c_ik = sum over j of a_ij b_jk" and trace the indices with a finger on paper.', 'Revisit node c12_math_cbse_03_004 (addition) to remind them that addition is element-wise but multiplication is not.', 'Then re-do Diagnostic Question 3 step-by-step, verbalizing each row-column pair.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_006', difficulty: 'standard',
          question: 'Scalar multiplication of a matrix is the operation of multiplying every element.',
          hint: 'Revisit c12_math_cbse_03_004 (matrix addition/subtraction) and c6_math_ch02_024 (integer.',
          misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.',
          parts: [
                { id: 'a', prompt: 'Explain why k(A + B) = kA + kB holds for matrices A and B of the same order, but (k + l)A = kA + lA requires A to be a matrix and k, l to be scalars.', answer: 'k(A + B) = kA + kB works',
                  options: ['k(A + B) = kA + kB works', 'multiply rows by columns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' },
                { id: 'b', prompt: 'Given matrices A (2×3) and B (2×3), and scalars k = 2, l = -3. Compare the results of (k + l)A and kA + lA.', answer: '(k + l)A = (2 - 3)A = (-1)A = -A',
                  options: ['(k + l)A = (2 - 3)A = (-1)A = -A', 'multiply rows by columns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' }
          ],
            remediations: { 'students-confuse-scalar-multiplication-ka': { steps: ['Have them compute 2 × ⎡1 2⎤ ⎣3 4⎦ by writing "2×1, 2×2, 2×3, 2×4" explicitly — no shortcuts.', 'Give them A = ⎡2⎤ ⎣3⎦ , B = ⎡1⎤ ⎣4⎦ and ask for 3A - 2B. Force them to write 3A = ⎡6⎤ ⎣9⎦ and 2B = ⎡2⎤ ⎣8⎦ on separate.', 'Show the distributive property failure: compute 2(A+B) and 2A+2B side-by-side to prove they match.', 'Assign re-diagnostic: "Compute 4X - 3Y where X = ⎡1 -1⎤ ⎣2 3⎦ , Y = ⎡0 2⎤ ⎣-1 1⎦ and show every intermediate matrix.".'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.',
          parts: [
                { id: 'a', prompt: 'A student solves for X in the equation 2X + 3A = 5B where A = ⎡1 2⎤ ⎣3 4⎦ , B = ⎡2 0⎤ ⎣1 3⎦ and writes: 2X = 5B - 3A X = (5B - 3A)/2 Is this correct?', answer: 'The step X = (5B - 3A)/2 is notationally incorrect',
                  options: ['The step X = (5B - 3A)/2 is notationally incorrect', 'multiply rows by columns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' },
                { id: 'b', prompt: 'Construct a real-world problem (Indian context: rupees, items, quantities) that requires scalar multiplication of a matrix and addition of two scaled matrices.', answer: 'Problem: A stationery shop sells notebooks (₹40), pens (₹10), and erasers (₹5)',
                  options: ['Problem: A stationery shop sells notebooks (₹40), pens (₹10), and erasers (₹5)', 'multiply rows by columns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' },
                { id: 'c', prompt: 'Given matrices A (2×3) and B (2×3), and scalars k = 2, l = -3. Compare the results of (k + l)A and kA + lA.', answer: '(k + l)A = (2 - 3)A = (-1)A = -A',
                  options: ['(k + l)A = (2 - 3)A = (-1)A = -A', 'multiply rows by columns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' }
          ],
            remediations: { 'students-confuse-scalar-multiplication-ka': { steps: ['Have them compute 2 × ⎡1 2⎤ ⎣3 4⎦ by writing "2×1, 2×2, 2×3, 2×4" explicitly — no shortcuts.', 'Give them A = ⎡2⎤ ⎣3⎦ , B = ⎡1⎤ ⎣4⎦ and ask for 3A - 2B. Force them to write 3A = ⎡6⎤ ⎣9⎦ and 2B = ⎡2⎤ ⎣8⎦ on separate.', 'Show the distributive property failure: compute 2(A+B) and 2A+2B side-by-side to prove they match.', 'Assign re-diagnostic: "Compute 4X - 3Y where X = ⎡1 -1⎤ ⎣2 3⎦ , Y = ⎡0 2⎤ ⎣-1 1⎦ and show every intermediate matrix.".'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_007', difficulty: 'standard',
          question: 'Matrix multiplication is non-commutative, meaning that for two matrices A and B.',
          hint: 'If matrix multiplication itself is shaky, revisit c12_math_cbse_03_005 and practice 5-10.',
          misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.',
          parts: [
                { id: 'a', prompt: 'Given matrices A (2×3) and B (3×2), which of the following statements is correct?', answer: '(b)',
                  options: ['Correct answer: (b)', 'non-commutative', 'never commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' },
                { id: 'b', prompt: 'If A = [[1, 2], [3, 4]] and B = [[2, 0], [0, 2]], compute AB and BA. Are they equal? Explain why this specific pair commutes while most matrix pairs do not.', answer: 'AB = [[2, 4], [6, 8]], BA = [[2, 4], [6, 8]]',
                  options: ['AB = [[2, 4], [6, 8]], BA = [[2, 4], [6, 8]]', 'they commute because both are 2×2', 'non-commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' },
                { id: 'c', prompt: 'Find 2×2 matrices A and B such that AB = O (zero matrix) but A ≠ O and B ≠ O. Verify your answer by computing AB.', answer: 'Example: A = [[1, 2], [2, 4]], B = [[2, -1], [-1, 0.5]]',
                  options: ['Example: A = [[1, 2], [2, 4]], B = [[2, -1], [-1, 0.5]]', 'AB = O implies A = O or B = O', 'non-commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' }
          ],
            remediations: { 'if-ab-and-ba-are': { steps: ['Have the student compute AB and BA for A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]] explicitly, showing each entry.', 'Ask "Why are (1,1) entries different?" — because AB uses row 1 of A with column 1 of B, while BA uses row 1 of B with.', 'Show that for diagonal D = [[2, 0], [0, 3]], DA = [[2, 4], [6, 12]] and AD = [[2, 4], [6, 12]] — they match because D.', 'Assign practice: find 3 pairs of 2×2 matrices that commute and 3 that don\'t, with full working.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If A and B are both 3×3 matrices and AB = BA, then A and B must be diagonal matrices." Evaluate this claim.', answer: 'The claim is false',
                  options: ['The claim is false', 'confuses', 'non-commutative', 'never commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if AB and BA are both defined and of the same order (e.g., both 2×2), then AB = BA must hold.' }
          ],
            remediations: { 'if-ab-and-ba-are': { steps: ['Have the student compute AB and BA for A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]] explicitly, showing each entry.', 'Ask "Why are (1,1) entries different?" — because AB uses row 1 of A with column 1 of B, while BA uses row 1 of B with.', 'Show that for diagonal D = [[2, 0], [0, 3]], DA = [[2, 4], [6, 12]] and AD = [[2, 4], [6, 12]] — they match because D.', 'Assign practice: find 3 pairs of 2×2 matrices that commute and 3 that don\'t, with full working.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
