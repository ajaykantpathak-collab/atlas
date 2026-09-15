import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch03_p1: SimDef = {
    id: 'v3_c12_math_ch03_p1',
    title: 'Matrices · Part 1/2',
    subtitle: 'The 1×1 matrix is every type at once',
    classLevel: 12, subject: 'mathematics', topic: 'Matrices · Part 1/2',
    chapters: ['c12_math_ch03'],
    nodeIds: ['c12_math_cbse_03_001', 'c12_math_cbse_03_002', 'c12_math_cbse_03_003', 'c12_math_cbse_03_004', 'c12_math_cbse_03_005', 'c12_math_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Matrix architect', intro: 'A grid of numbers becomes powerful the moment its rows and columns get rules.', goal: 'Read matrix order, build matrices from element formulas, and classify the seven types precisely.' },
    discovery: {
        question: 'Flip a matrix, multiply by its inverse — what do you always get back?',
        options: ['The identity matrix — ones down the diagonal', 'The zero matrix', 'The original matrix', 'A random matrix'],
        answer: 'The identity matrix — ones down the diagonal',
        hook: 'The identity matrix is the \'1\' of matrix world — everything times it stays itself. That single idea solves equations in 3 unknowns.',
    },
    teaching: [
        { title: 'Matrix: Definition and Types', text: 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and columns, denoted by a capital letter. The individual items are called elements or entries.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_03_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Build matrices from formulas: compute a_ij = (i−2j)² cell by cell, classify P and Q through the diagonal→scalar→identity chain, and write matrix equality the way the marking scheme wants it.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_001', title: 'Matrix: Definition and Types',
          scaffold: { problem: 'A school has 3 sections (A, B, C) in Class 12. Each section has students opting for 4 streams: Science, Commerce, Humanities, Vocational.',
            steps: [
            { text: 'Identify what constitutes rows and columns. Here, sections (3) are rows, streams (4) are columns. Order = 3 × 4.' },
            { text: 'Write the matrix with brackets. Row 1 = Section A data: [40, 25, 15, 10]. Row 2 = Section B data: [35, 30, 20, 5].' },
            { text: 'Write the complete matrix: A = [[40, 25, 15, 10], [35, 30, 20, 5], [30, 20, 25, 15]].' },
            { text: 'Verify order: 3 rows, 4 columns → 3 × 4. Total elements = 12.' },
            { text: 'Locate Commerce in Section B: Commerce is column 2, Section B is row 2 → element a_22 = 30.', faded: true, blankAnswer: 'Matrix A = [[40, 25, 15, 10], [35, 30, 20, 5], [30, 20, 25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_002', title: 'Types of Matrices: Row, Column, Square, Diagonal',
          scaffold: { problem: 'A school library has 4 sections: Fiction, Science, History, Arts.',
            steps: [
            { text: 'Identify the data for Monday — four numbers (25, 18, 12, 30) corresponding to 4 sections.' },
            { text: 'Write Monday\'s row matrix: M = [25 18 12 30]. Order = 1 × 4.' },
            { text: 'Identify the data for Tuesday — four numbers (22, 20, 15, 28).' },
            { text: 'Write Tuesday\'s column matrix: T = [[22], [20], [15], [28]]. Order = 4 × 1.' },
            { text: 'Verify: M has 1 row, 4 columns → row matrix. T has 4 rows, 1 column → column matrix.', faded: true, blankAnswer: 'Monday: M = [25 18 12 30], order 1 × 4 (row matrix).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_003', title: 'Equality of Matrices',
          scaffold: { problem: 'A school store sells notebooks and pens. The sales data for Monday and Tuesday are recorded in matrices:',
            steps: [
            { text: 'Identify orders. M is 2×2 (2 rows, 2 columns). T is 2×2. Orders match → equality possible.' },
            { text: 'Write element-wise equality equations from M = T:' },
            { text: 'Solve: x = 45, y = 15.' },
            { text: 'Verify all four positions: M = [[45,30],[20,15]], T = [[45,30],[20,15]] → identical.' },
            { text: 'Interpret: On Tuesday, Class 11 bought 45 notebooks (same as Monday) and Class 12 bought 15 pens (same as Monday).', faded: true, blankAnswer: 'x = 45 notebooks, y = 15 pens.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_004', title: 'Operations on Matrices: Addition and Subtraction',
          scaffold: { problem: 'A school canteen sells three snacks (Samosa, Sandwich, Juice) on two days (Monday, Tuesday). The sales (in pieces) are recorded as matrices:',
            steps: [
            { text: 'Verify both matrices have the same order. \\(M\\) is \\(3 \\times 2\\), \\(N\\) is \\(3 \\times 2\\) → addition is defined.' },
            { text: 'Write the sum matrix \\(T = M + N\\) by adding corresponding entries.' },
            { text: 'Compute each element:' },
            { text: 'Assemble the total matrix:' },
            { text: 'Interpret: Combined Samosa sales = 170 (Mon), 140 (Tue); Sandwich = 130, 140; Juice = 270, 230.', faded: true, blankAnswer: '\\(\\begin{bmatrix} 170 & 140 \\\\ 130 & 140 \\\\ 270 & 230.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_005', title: 'Multiplication of Matrices: Definition and Properties',
          scaffold: { problem: 'A bookshop in Mumbai sells three types of notebooks: Classmate (₹60), Navneet (₹55), and Sundaram (₹50).',
            steps: [
            { text: 'Identify the matrices. Q (rows = days, columns = notebook types) = [[20, 15, 10], [25, 10, 15]].' },
            { text: 'Check compatibility: Q is 2×3, P is 3×1 → inner dimensions match (3=3), product R = QP will be 2×1.' },
            { text: 'Compute first entry (Monday revenue): r_11 = 20×60 + 15×55 + 10×50 = 1200 + 825 + 500 = 2525.' },
            { text: 'Compute second entry (Tuesday revenue): r_21 = 25×60 + 10×55 + 15×50 = 1500 + 550 + 750 = 2800.' },
            { text: 'Write result: R = [[2525], [2800]] rupees. Interpret: Monday revenue ₹2525, Tuesday revenue ₹2800.', faded: true, blankAnswer: 'Monday revenue = ₹2525, Tuesday revenue = ₹2800.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_006', title: 'Scalar Multiplication of Matrices',
          scaffold: { problem: 'A small bakery tracks daily production of three items — bread loaves, croissants, and muffins — over 4 days (Mon-Thu) in a 3×4 matrix P.',
            steps: [
            { text: 'Identify scalar k = 3 and matrix P of order 3×4. Write down the definition: (3P)ᵢⱼ = 3 × Pᵢⱼ for all i=1..3, j=1..4.' },
            { text: 'Multiply each element of P by 3 systematically. Row 1 (bread): 3×50=150, 3×60=180, 3×55=165, 3×65=195.' },
            { text: 'Assemble H = 3P =' },
            { text: 'Holiday Monday is column 1 of H: 150 (bread) + 90 (croissants) + 60 (muffins) = 300 items.' },
            { text: 'Verify by computing 3 × (Mon total from P) = 3 × (50+30+20) = 3×100 = 300. Matches.', faded: true, blankAnswer: 'Holiday production matrix H =' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_03_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab teammate calls a 4×4 sensor table \'a diagonal matrix because the diagonal is all filled in\', while another insists a zero-filled grid \'can\'t be diagonal — the diagonal\'s empty.\'',
            decisions: [{ prompt: 'What does the diagonal-matrix definition actually check?', options: [
                { text: 'The off-diagonals — a square matrix is diagonal exactly when every i≠j entry is zero; the main diagonal can hold anything including zeros, so the full-diagonal table isn\'t diagonal if off-diagonals carry data, and the all-zero grid is.', outcome: 'The chapter\'s test runs on the positions you aren\'t looking at: \'diagonal\' is a statement about empty off-diagonals, not about a populated principal diagonal.' },
                { text: 'The first teammate is right — a matrix with a complete diagonal is by definition diagonal.', outcome: 'That inverts the condition: diagonal entries may be anything, but off-diagonal entries must be zero — a table full of sensor cross-talk fails precisely because its off-diagonals are live.', reveals: 'full-diagonal-equals-diagonal' },
                { text: 'The second teammate is right — zero diagonal means no diagonal to speak of.', outcome: 'The definition never asks the diagonal to be non-zero; an all-zero square matrix satisfies aᵢⱼ=0 for i≠j vacuously and is diagonal — and also scalar and identity-like degenerate cases at once.', reveals: 'zero-diagonal-not-diagonal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Rows, columns, determinants — you just learned the algebra that runs every 3D game and every neural network.',
            decisions: [{ prompt: 'What comes next? Matrices · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Matrices · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_03_001', difficulty: 'standard',
          question: 'A matrix is an ordered rectangular array of numbers or functions arranged.',
          hint: 'If stuck on a_ij notation, revisit Class 9 coordinate geometry (c9_math_ch1_1.',
          misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij.',
          parts: [
                { id: 'a', prompt: 'What is the order of the matrix A = [a_ij] where i = 1, 2, 3 and j = 1, 2, 3, 4? How many elements does it contain?', answer: 'The order is 3 × 4 (3 rows, 4 columns) and it contains 3 × 4 = 12 elements',
                  options: ['The order is 3 × 4 (3 rows, 4 columns) and it contains 3 × 4 = 12 elements', 'the first subscript is column and the second is row (i'],
                  hint: 'If stuck on a_ij notation, revisit Class 9 coordinate geometry (c9_math_ch1_1, c9_math_ch1_2) and.',
                  misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij = element in column i, row.' },
                { id: 'b', prompt: 'A student writes: "The matrix B = [5] is a row matrix because it has one row." Is this correct? Explain why or why not.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'only a row matrix', 'the first subscript is column and the second is row (i'],
                  hint: 'If stuck on a_ij notation, revisit Class 9 coordinate geometry (c9_math_ch1_1, c9_math_ch1_2) and.',
                  misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij = element in column i, row.' }
          ],
            remediations: { 'students-confuse-the-notation-a': { steps: ['If a student writes the transpose of the required matrix in construction problems: (1) Make them write "i = row,.', '(2) Have them draw a 2×3 grid and physically label row 1, row 2 and column 1, column 2, column 3.', '(3) Practice 5 construction problems where they must first write the order, then the general element formula, then.', '(4) Re-diagnostic: give a_ij = 2i - j for a 3×2 matrix and check if they produce 3 rows and 2 columns correctly.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If A = [[1, 2], [3, 4]] and B = [[1, 2], [3, 4]], then A = B because they look the same." Is this reasoning sufficient for board exam marks?', answer: 'The reasoning is insufficient',
                  options: ['The reasoning is insufficient', 'the first subscript is column and the second is row (i'],
                  hint: 'If stuck on a_ij notation, revisit Class 9 coordinate geometry (c9_math_ch1_1, c9_math_ch1_2) and.',
                  misconception: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij = element in column i, row.' }
          ],
            remediations: { 'students-confuse-the-notation-a': { steps: ['If a student writes the transpose of the required matrix in construction problems: (1) Make them write "i = row,.', '(2) Have them draw a 2×3 grid and physically label row 1, row 2 and column 1, column 2, column 3.', '(3) Practice 5 construction problems where they must first write the order, then the general element formula, then.', '(4) Re-diagnostic: give a_ij = 2i - j for a 3×2 matrix and check if they produce 3 rows and 2 columns correctly.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_002', difficulty: 'standard',
          question: 'A matrix is classified by its shape: a **row matrix** has exactly one row.',
          hint: 'If stuck on order or indices, revisit **c12_math_cbse_03_001** (Matrix: Definition and.',
          misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call.',
          parts: [
                { id: 'a', prompt: 'State the order and type of each matrix: (i) A = [2 −5 0 7], (ii) B = [[3], [−1], [4]], (iii) C = [[1, 2], [3, 4]], (iv) D = [[5, 0], [0, −2]].', answer: '(i) Order 1 × 4, row matrix',
                  options: ['(i) Order 1 × 4, row matrix', 'C is diagonal', 'square', 'diagonal'],
                  hint: 'If stuck on order or indices, revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) and.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' },
                { id: 'b', prompt: 'A student writes: "Matrix M = [[0, 0], [0, 0]] is a diagonal matrix because all its diagonal elements are zero." Is this correct?', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'no, diagonal elements must be non-zero', 'square matrix', 'diagonal matrix'],
                  hint: 'If stuck on order or indices, revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) and.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' },
                { id: 'c', prompt: 'Construct a 3 × 3 diagonal matrix whose diagonal entries are the first three prime numbers.', answer: 'First three primes: 2, 3, 5',
                  options: ['First three primes: 2, 3, 5', 'diagonal entries', 'first column entries', 'square matrix'],
                  hint: 'If stuck on order or indices, revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) and.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' },
                { id: 'd', prompt: 'Matrix P is 4 × 4. Matrix Q is 1 × 4. Matrix R is 4 × 1. Which of the following sums are defined? (i) P + Q, (ii) Q + R, (iii) P + (transpose of Q).', answer: '(i) Not defined: P is 4 × 4 (square), Q is 1 × 4 (row)',
                  options: ['(i) Not defined: P is 4 × 4 (square), Q is 1 × 4 (row)', 'both have 4 rows', 'square matrix', 'diagonal matrix'],
                  hint: 'If stuck on order or indices, revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) and.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' }
          ],
            remediations: { 'confusing-square-matrix-with-diagonal': { steps: ['Revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) — focus on the definition of order (m × n) and how.', 'Label positions (1,1), (1,2), (1,3), (2,1), etc.', 'Write "MUST BE ZERO" on all off-diagonal cells.', 'Take 5 random matrices from NCERT Exercise 3.1.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_003', difficulty: 'standard',
          question: 'Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the.',
          hint: 'If stuck, revisit c12_math_cbse_03_001 (Matrix: Definition and Types) to practice writing.',
          misconception: 'Students often believe that if "most" corresponding elements match, the matrices are "almost equal" or that they can.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the same',
                  options: ['Two matrices A = [aij] and B = [bij] are equal if and only if (i) they have the same', 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and', 'A matrix is classified by its shape: a **row matrix** has exactly one row (order 1 × n),', 'Matrix addition is defined for two matrices of the same order: if \\(A = [a_{ij}]_{m'],
                  hint: 'If stuck, revisit c12_math_cbse_03_001 (Matrix: Definition and Types) to practice writing orders.',
                  misconception: 'Students often believe that if "most" corresponding elements match, the matrices are "almost equal" or that they can ignore order mismatch.' }
          ],
            remediations: { 'if-most-corresponding-elements-match': { steps: ['If a student exhibits the above misconception: 1.', 'Make them write the definition verbatim: "Two matrices are equal IF AND ONLY IF (i) same order, (ii) all corresponding.', 'Give a counterexample: A = [1 2] (1×2), B = [[1], [2]] (2×1).', 'Both have elements 1 and 2." Student says yes.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_004', difficulty: 'standard',
          question: 'Matrix addition is defined for two matrices of the same order: if \\(A.',
          hint: 'If stuck, review **c12_math_cbse_03_003 (Equality of Matrices)** to practice matching.',
          misconception: 'Students frequently attempt to add matrices of different orders, arguing that "both have 6 elements".',
          parts: [
                { id: 'a', prompt: 'Explain why the sum of a \\(2 \\times 3\\) matrix and a \\(3 \\times 2\\) matrix is not defined, even though both have 6 elements.', answer: 'Matrix addition requires corresponding positions to represent the same quantity',
                  options: ['Matrix addition requires corresponding positions to represent the same quantity', 'they have the same number of elements so it should work'],
                  hint: 'If stuck, review **c12_math_cbse_03_003 (Equality of Matrices)** to practice matching corresponding.',
                  misconception: 'Students frequently attempt to add matrices of different orders, arguing that "both have 6 elements".' }
          ],
            remediations: { 'students-frequently-attempt-to-add': { steps: ['Revisit **c12_math_cbse_03_003 (Equality of Matrices)** to reinforce that matrices are equal only when corresponding.', 'Practice integer/decimal addition/subtraction with signed numbers using **c6_math_ch02_019** and **c6_math_ch04_046**.', 'Work through 5 simple \\(2 \\times 2\\) matrix addition/subtraction problems, explicitly writing each element\'s.', 'Re-attempt Diagnostic Question 3 and 5; if errors persist, use colour-coding (e.g., red for row 1, blue for row 2).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_005', difficulty: 'standard',
          question: 'Matrix multiplication is a binary operation that produces a matrix from two.',
          hint: 'Revisit matrix order and addition in nodes c12_math_cbse_03_001 and c12_math_cbse_03_004.',
          misconception: 'Students often multiply matrices element-wise (Hadamard product) instead of using the row-by-column dot product.',
          parts: [
                { id: 'a', prompt: 'What is the necessary and sufficient condition for the product of two matrices A (m × n) and B (p × q) to be defined? State the order of the resulting matrix.', answer: 'The product AB is defined only when n = p (columns of A equal rows of B)',
                  options: ['The product AB is defined only when n = p (columns of A equal rows of B)', 'm = p or that the product is always defined'],
                  hint: 'Revisit matrix order and addition in nodes c12_math_cbse_03_001 and c12_math_cbse_03_004; practice.',
                  misconception: 'Students often multiply matrices element-wise (Hadamard product) instead of using the row-by-column dot product.' }
          ],
            remediations: { 'students-often-multiply-matrices-element': { steps: ['If a student multiplies element-wise, immediately contrast with a 2×2 numerical example showing the two results differ.', 'Have them write the definition: "c_ik = sum over j of a_ij b_jk" and trace the indices with a finger on paper.', 'Revisit node c12_math_cbse_03_004 (addition) to remind them that addition is element-wise but multiplication is not.', 'Then re-do Diagnostic Question 3 step-by-step, verbalizing each row-column pair.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_006', difficulty: 'standard',
          question: 'Scalar multiplication of a matrix is the operation of multiplying every element.',
          hint: 'Revisit c12_math_cbse_03_004 (matrix addition/subtraction) and c6_math_ch02_024 (integer.',
          misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.',
          parts: [
                { id: 'a', prompt: 'Explain why k(A + B) = kA + kB holds for matrices A and B of the same order, but (k + l)A = kA + lA requires A to be a matrix and k, l to be scalars.', answer: 'k(A + B) = kA + kB works',
                  options: ['k(A + B) = kA + kB works', 'multiply rows by columns'],
                  hint: 'Revisit c12_math_cbse_03_004 (matrix addition/subtraction) and c6_math_ch02_024 (integer operation.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' },
                { id: 'b', prompt: 'Given matrices A (2×3) and B (2×3), and scalars k = 2, l = -3. Compare the results of (k + l)A and kA + lA.', answer: '(k + l)A = (2 - 3)A = (-1)A = -A',
                  options: ['(k + l)A = (2 - 3)A = (-1)A = -A', 'multiply rows by columns'],
                  hint: 'Revisit c12_math_cbse_03_004 (matrix addition/subtraction) and c6_math_ch02_024 (integer operation.',
                  misconception: 'Students confuse scalar multiplication kA with matrix multiplication A × B.' }
          ],
            remediations: { 'students-confuse-scalar-multiplication-ka': { steps: ['Have them compute 2 × ⎡1 2⎤ ⎣3 4⎦ by writing "2×1, 2×2, 2×3, 2×4" explicitly — no shortcuts.', 'Give them A = ⎡2⎤ ⎣3⎦ , B = ⎡1⎤ ⎣4⎦ and ask for 3A - 2B. Force them to write 3A = ⎡6⎤ ⎣9⎦ and 2B = ⎡2⎤ ⎣8⎦ on separate.', 'Show the distributive property failure: compute 2(A+B) and 2A+2B side-by-side to prove they match.', 'Assign re-diagnostic: "Compute 4X - 3Y where X = ⎡1 -1⎤ ⎣2 3⎦ , Y = ⎡0 2⎤ ⎣-1 1⎦ and show every intermediate matrix.".'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
