import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch04_p1: SimDef = {
    id: 'v3_c12_math_ch04_p1',
    title: 'Determinants · Part 1/2',
    subtitle: 'One number decides if the prices even exist',
    classLevel: 12, subject: 'mathematics', topic: 'Determinants · Part 1/2',
    chapters: ['c12_math_ch04'],
    nodeIds: ['c12_math_cbse_04_001', 'c12_math_cbse_04_002', 'c12_math_cbse_04_003', 'c12_math_cbse_04_004', 'c12_math_cbse_04_005', 'c12_math_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Determinant evaluator', intro: 'Before you solve a system, one scalar quietly tells you whether a unique solution exists at all.', goal: 'Compute determinants of order 1, 2 and 3 — and understand why squareness is the entry fee.' },
    discovery: {
        question: 'Two pens and five notebooks cost ₹110; three pens and two cost ₹70. Before solving for prices, one number already promises a unique answer exists. Which?',
        options: ['The determinant — |A| = ad−bc = −11 ≠ 0 certifies the system won\'t collapse into contradiction or infinity', 'The total ₹180', 'The coefficient 2', 'The larger price'],
        answer: 'The determinant — |A| = ad−bc = −11 ≠ 0 certifies the system won\'t collapse into contradiction or infinity',
        hook: 'Only square matrices earn a determinant — a 2×3 grid can\'t be expanded because the recursion needs equal rows and columns. And |A| isn\'t modulus: it can be negative, and a non-zero value is the green light for unique solutions.',
    },
    teaching: [
        { title: 'Determinant of a Square Matrix: Definition', text: 'A determinant is a scalar value (real or complex) associated uniquely with every square matrix A = [aᵢⱼ] of order n, denoted by |A|, det A, or Δ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_04_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Compute the gateway number: evaluate 2×2 determinants by ad−bc with the sign order right, expand a 3×3 along any row, and explain why every expansion converges on the same value.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_001', title: 'Determinant of a Square Matrix: Definition',
          scaffold: { problem: 'A small farmer sells two crops: wheat and rice. In Week 1, he sells 3 quintals of wheat and 2 quintals of rice for ₹18,000.',
            steps: [
            { text: 'Identify the variables — let x = price per quintal of wheat (₹), y = price per quintal of rice (₹).' },
            { text: 'Write in matrix form AX = B. Coefficient matrix A = [[3, 2], [1, 4]], variable matrix X = [[x], [y]], constant matrix.' },
            { text: 'Recognize A is a 2×2 square matrix, so its determinant exists. Apply the definition: |A| = a₁₁a₂₂ − a₂₁a₁₂.' },
            { text: 'Substitute entries: a₁₁ = 3, a₁₂ = 2, a₂₁ = 1, a₂₂ = 4. Compute |A| = (3)(4) − (1)(2) = 12 − 2 = 10.' },
            { text: 'Since |A| = 10 ≠ 0, the matrix is non-singular. By the invertibility condition, a unique solution exists for x and y.', faded: true, blankAnswer: 'A = [[3, 2], [1, 4]], |A| = 10, unique solution exists.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_002', title: 'Determinant of 2x2 and 3x3 Matrices',
          scaffold: { problem: 'A civil engineer is checking the stability of a triangular support bracket with vertices at coordinates A(2, −1), B(5, 3), C(−2, 4).',
            steps: [
            { text: 'Write the 3×3 matrix with coordinates and a column of 1s as per the area formula.' },
            { text: 'Choose expansion along column 3 (all entries are 1, but signs alternate: +, −, +).' },
            { text: 'Compute minors: M₁₃ = |5 3; −2 4| = 5×4 − 3×(−2) = 20 + 6 = 26. M₂₃ = |2 −1; −2 4| = 2×4 − (−1)(−2) = 8 − 2 = 6.' },
            { text: 'Apply cofactor signs: C₁₃ = (+1)×26 = 26; C₂₃ = (−1)×6 = −6; C₃₃ = (+1)×11 = 11.' },
            { text: 'Determinant = 1×26 + 1×(−6) + 1×11 = 31. Area = ½ × |31| = 15.5 m².', faded: true, blankAnswer: '15.5 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_003', title: 'Properties of Determinants',
          scaffold: { problem: 'A triangular plot of land has vertices at \\((10, 20)\\), \\((30, 40)\\), and \\((50, 60)\\).',
            steps: [
            { text: 'Write the area formula using determinant: \\(\\text{Area} = \\frac{1}{2} \\left| \\begin{vmatrix} 10 & 20 & 1 \\\\ 30 & 40 & 1.' },
            { text: 'Apply \\(C_1 \\leftarrow C_1 - 10C_3\\) and \\(C_2 \\leftarrow C_2 - 20C_3\\) (Property 6) to simplify first two columns.' },
            { text: 'Observe that \\(C_1\\) and \\(C_2\\) are now identical (both have entries 0, 20, 40). By Property 3, the determinant is 0.' },
            { text: 'Therefore, area = \\(\\frac{1}{2} \\times 0 = 0\\) square units.' },
            { text: 'Interpret: The three points are collinear, so the triangle has zero area.', faded: true, blankAnswer: '0 square units (points are collinear).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_004', title: 'Area of Triangle Using Determinants',
          scaffold: { problem: 'A triangular plot of land in a housing society has corners at GPS coordinates A(3, 8), B(−4, 2), and C(5, 1) (in metres).',
            steps: [
            { text: 'Write the determinant matrix with vertices as rows and a column of 1s: |3 8 1; −4 2 1; 5 1 1|' },
            { text: 'Expand along the third column (C₃) since it has three 1s: Δ = 1·|−4 2; 5 1| − 1·|3 8; 5 1| + 1·|3 8; −4 2|' },
            { text: 'Compute each 2×2 determinant: |−4 2; 5 1| = (−4)(1) − (2)(5) = −4 − 10 = −14; |3 8; 5 1| = (3)(1) − (8)(5) = 3 − 40.' },
            { text: 'Sum with alternating signs: Δ = 1(−14) − 1(−37) + 1(38) = −14 + 37 + 38 = 61' },
            { text: 'Area = ½|Δ| = ½ × 61 = 30.5 m². Perimeter = 36.5 m (given). Fencing cost = 36.5 × 150 = ₹5,475.', faded: true, blankAnswer: 'Area = 30.5 m²; Total fencing cost = ₹5,475' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_005', title: 'Minors and Cofactors of a Matrix',
          scaffold: { problem: 'A civil engineer is analyzing a triangular support structure with vertices at coordinates (3, -2), (1, 4), and (-2, 1).',
            steps: [
            { text: 'Identify the matrix and the chosen expansion column. Matrix \\(A = \\begin{bmatrix} 3 & -2 & 1 \\\\ 1 & 4 & 1 \\\\ -2 & 1 & 1.' },
            { text: 'Compute minors for each element in Column 3 by deleting respective row and column 3.' },
            { text: 'Apply cofactor signs \\((-1)^{i+3}\\) for each element.' },
            { text: 'Compute determinant as sum of products: \\(\\Delta = a_{13}A_{13} + a_{23}A_{23} + a_{33}A_{33} = 1(9) + 1(1) + 1(14).' },
            { text: 'Area = \\(\\frac{1}{2} |\\Delta| = \\frac{1}{2} \\times 24 = 12\\) square metres.', faded: true, blankAnswer: '12 square metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_006', title: 'Adjoint of a Matrix: Definition',
          scaffold: { problem: 'Find the adjoint of matrix A = [[3, -2, 1], [2, 0, -1], [1, 4, 2]] and verify that A(adj A) = |A|I.',
            steps: [
            { text: 'Write down matrix A and identify it is 3×3. We will compute all 9 cofactors A_{ij}.' },
            { text: 'Compute minors M_{ij} by deleting i-th row and j-th column, then find cofactors A_{ij} = (-1)^{i+j} M_{ij}.' },
            { text: 'Form cofactor matrix C = [[4, -5, 8], [8, 5, -14], [2, 5, 4]].' },
            { text: 'Transpose C to get adj A = [[4, 8, 2], [-5, 5, 5], [8, -14, 4]].' },
            { text: 'Verify by computing |A| and A(adj A).', faded: true, blankAnswer: 'adj A = [[4, 8, 2], [-5, 5, 5], [8, -14, 4]]; |A| = 30.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_04_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Surveying a triangular plot, two juniors compute the same 3×3 coordinate determinant — one expands along row 1, the other along column 3 — and get different values. Both insist their method is \'more reliable.\'',
            decisions: [{ prompt: 'Can a determinant depend on which line you expand along?', options: [
                { text: 'No — the value is invariant under choice of row or column, so at least one expansion carries a sign or arithmetic slip; rerun with the sign pattern (+ − + / − + − / + − +) marked and pick the line with the most zeros to minimise where errors breed.', outcome: 'The chapter\'s invariance is the tie-breaker: same matrix, same determinant — disagreement between expansion lines is a computation audit flag, not a methodological debate.' },
                { text: 'Yes — different lines weight different elements, so mild variation is expected.', outcome: 'Expansion is a theorem, not an estimator: every row and column expansion returns the identical scalar, so \'mild variation\' means a mistake, not a methodological difference.', reveals: 'line-choice-changes-value' },
                { text: 'Average the two results to cancel out the line bias.', outcome: 'There\'s no bias to cancel — the determinant is a single number; averaging a right answer with a wrong one manufactures a third wrong answer.', reveals: 'average-the-disagreement' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a determinant as a solvability certificate — the single number that decides whether the system has one answer or none.',
            decisions: [{ prompt: 'What comes next? Determinants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Determinants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_04_001', difficulty: 'standard',
          question: 'A determinant is a scalar value (real or complex) associated uniquely with.',
          hint: 'If stuck, revisit "Types of Matrices" (Class 12 Chapter 3) to reinforce square vs.',
          misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute.',
          parts: [
                { id: 'a', prompt: 'What is the determinant of the matrix A = [7] (a 1×1 matrix), and why does the definition of determinant require the matrix to be square?', answer: 'The determinant of A = [7] is 7',
                  options: ['The determinant of A = [7] is 7', 'determinant is 0', 'non-square matrices have determinants'],
                  hint: 'If stuck, revisit "Types of Matrices" (Class 12 Chapter 3) to reinforce square vs.',
                  misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute the determinant of.' },
                { id: 'b', prompt: 'A student writes: "The determinant of matrix A = [[1, 2, 3], [4, 5, 6]] is 1(5) − 2(4) = −3." Explain why this statement is mathematically incorrect, and state.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the formula is wrong', 'determinant is undefined', 'undefined'],
                  hint: 'If stuck, revisit "Types of Matrices" (Class 12 Chapter 3) to reinforce square vs.',
                  misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute the determinant of.' }
          ],
            remediations: { 'students-treat-a-as-the': { steps: ['If the student confuses |A| with modulus or applies the formula to non-square matrices: 1.', 'Revisit the definition: "Only square matrices have determinants" — have the student list 5 matrices (mix of square and.', 'For sign errors in 2×2: drill the formula |A| = a₁₁a₂₂ − a₂₁a₁₂ with 10 varied examples, emphasizing "product of main.', 'For 3×3 cofactor signs: draw the 3×3 sign matrix | + − + | | − + − | | + − + | and have the student expand the same.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute.',
          parts: [
                { id: 'a', prompt: 'A student computes the determinant of B = | 2 1 3 | | 4 2 6 | | 1 0 1 | by expanding along the first row and gets |B| = 2(2·1 − 6·0) − 1(4·1 − 6·1) + 3(4·0.', answer: 'The claim is **correct**',
                  options: ['The claim is **correct**', 'the claim is wrong'],
                  hint: 'If stuck, revisit "Types of Matrices" (Class 12 Chapter 3) to reinforce square vs.',
                  misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute the determinant of.' }
          ],
            remediations: { 'students-treat-a-as-the': { steps: ['If the student confuses |A| with modulus or applies the formula to non-square matrices: 1.', 'Revisit the definition: "Only square matrices have determinants" — have the student list 5 matrices (mix of square and.', 'For sign errors in 2×2: drill the formula |A| = a₁₁a₂₂ − a₂₁a₁₂ with 10 varied examples, emphasizing "product of main.', 'For 3×3 cofactor signs: draw the 3×3 sign matrix | + − + | | − + − | | + − + | and have the student expand the same.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_002', difficulty: 'standard',
          question: 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value.',
          hint: 'Revisit c10_math_cbse_04_005 (quadratic formula derivation) and c9_math_ch4_8.',
          misconception: 'Students consistently mishandle the (−1)ⁱ⁺ʲ sign factor when expanding 3×3 determinants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted',
                  options: ['The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted', 'A determinant is a scalar value (real or complex) associated uniquely with every square', 'Properties of determinants are a set of algebraic rules that describe how the value of a', 'The area of a triangle with vertices at coordinates (x₁, y₁), (x₂, y₂), and (x₃, y₃) is'],
                  hint: 'Revisit c10_math_cbse_04_005 (quadratic formula derivation) and c9_math_ch4_8 (factorisation.',
                  misconception: 'Students consistently mishandle the (−1)ⁱ⁺ʲ sign factor when expanding 3×3 determinants.' }
          ],
            remediations: { 'students-consistently-mishandle-the-1': { steps: ['Have the student write the 3×3 sign matrix explicitly: [ + − + ] [ − + − ] [ + − + ] 2.', 'Make them circle the (i,j) position of each element in the chosen expansion row/column and read off the sign from the.', 'Practice three expansions of the same numerical matrix along R1, R2, C1 — verifying all give identical results.', 'Drill: "Sign = + if (row+col) is even, − if odd." Repeat until automatic.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_003', difficulty: 'standard',
          question: 'Properties of determinants are a set of algebraic rules that describe how the.',
          hint: 'Revisit c12_math_cbse_04_002: practice expanding \\(3 \\times 3\\) determinants along.',
          misconception: 'Students often believe that Property 6 allows them to add a multiple of row \\(i\\) to row \\(j\\) **and simultaneously**.',
          parts: [
                { id: 'a', prompt: 'State Property 4 of determinants: If each element of a row (or column) of a determinant is multiplied by a scalar \\(k\\), what happens to the value of the.', answer: 'The value of the determinant gets multiplied by \\(k\\)',
                  options: ['The value of the determinant gets multiplied by \\(k\\)', 'the determinant does not change', 'it gets multiplied by \\(k^n\\)'],
                  hint: 'Revisit c12_math_cbse_04_002: practice expanding \\(3 \\times 3\\) determinants along different.',
                  misconception: 'Students often believe that Property 6 allows them to add a multiple of row \\(i\\) to row \\(j\\) **and simultaneously** change row \\(i\\).' },
                { id: 'b', prompt: 'Explain why Property 6 (adding a multiple of one row to another row) does not change the value of the determinant, using the concept of linearity.', answer: 'The determinant is a multilinear function of its rows',
                  options: ['The determinant is a multilinear function of its rows', 'the operation always changes the value'],
                  hint: 'Revisit c12_math_cbse_04_002: practice expanding \\(3 \\times 3\\) determinants along different.',
                  misconception: 'Students often believe that Property 6 allows them to add a multiple of row \\(i\\) to row \\(j\\) **and simultaneously** change row \\(i\\).' }
          ],
            remediations: { 'property-6-allows-them-to': { steps: ['Have the student write down each property in their own words with a \\(2 \\times 2\\) example.', 'Give a \\(3 \\times 3\\) determinant with an obvious common factor in one row; ask them to factor it out (Property 4) and.', 'Provide a determinant where \\(R_2 = 2R_1\\); ask them to use Property 6 to create a zero row and conclude the.', 'Finally, give a mixed exercise where they must choose the correct sequence of properties to simplify a determinant with.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_004', difficulty: 'standard',
          question: 'The area of a triangle with vertices at coordinates (x₁, y₁), (x₂, y₂), and.',
          hint: 'If stuck on determinant expansion, revisit c12_math_cbse_04_002 (Determinant of 2x2 and.',
          misconception: 'Students often write the determinant as |x₁ y₁; x₂ y₂; x₃ y₃| (a 3×2 matrix) or forget the column of 1s entirely.',
          parts: [
                { id: 'a', prompt: 'Explain why we take the absolute value of the determinant when computing area, and why we must consider both positive and negative values of the determinant.', answer: 'Area is a positive physical quantity, so we take |det|',
                  options: ['Area is a positive physical quantity, so we take |det|', 'determinant is always positive'],
                  hint: 'If stuck on determinant expansion, revisit c12_math_cbse_04_002 (Determinant of 2x2 and 3x3.',
                  misconception: 'Students often write the determinant as |x₁ y₁; x₂ y₂; x₃ y₃| (a 3×2 matrix) or forget the column of 1s entirely, computing |x₁ y₁; x₂ y₂|.' }
          ],
            remediations: { 'students-often-write-the-determinant': { steps: ['If the student forgets the column of 1s: Return to c9_math_ch1_11 (Area of a Triangle Using Coordinates: Formula) and.', 'Then show how adding a column of 1s converts this to a 3×3 determinant.', 'If the student misses the ± when area is given: Use a number line analogy — the perpendicular distance from the third.', 'Practice Exercise 4.2 Q3 from NCERT with both positive and negative determinant values.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_005', difficulty: 'standard',
          question: 'The **minor** \\(M_{ij}\\) of an element \\(a_{ij}\\) in a square matrix is the.',
          hint: 'Revisit c12_math_cbse_04_002 Example 3 and 4 — practice expanding \\(3 \\times 3\\).',
          misconception: '**Sign error in cofactor formula**: Students mechanically write \\(A_{ij} = (-1)^{i+j} M_{ij}\\) but then compute.',
          parts: [
                { id: 'a', prompt: 'Given \\(\\Delta = \\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix}\\), a student claims that \\(a A_{11} + b A_{12} + c A_{13} = d A_{11} +.', answer: 'The claim is false',
                  options: ['The claim is false', 'cofactor of element in Row 1', 'cofactor used in Row 1 expansion'],
                  hint: 'Revisit c12_math_cbse_04_002 Example 3 and 4 — practice expanding \\(3 \\times 3\\) determinants along.',
                  misconception: '**Sign error in cofactor formula**: Students mechanically write \\(A_{ij} = (-1)^{i+j} M_{ij}\\) but then compute \\((-1)^{i+j}\\) incorrectly.' }
          ],
            remediations: { 'sign-error-in-cofactor-formula': { steps: ['If a student makes the sign error, have them write the \\(3 \\times 3\\) checkerboard sign matrix explicitly.', 'Then for each element, the cofactor sign is exactly the sign in that position.', 'Practice: give five elements from random positions in a \\(3 \\times 3\\) matrix and ask for the sign only (not the minor).', 'Once signs are automatic, return to full minor+cofactor computation.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_006', difficulty: 'standard',
          question: 'The adjoint of a square matrix \\( A = [a_{ij}]_{n \\times n} \\) is the transpose.',
          hint: 'If stuck, revisit c12_math_cbse_04_005 (Minors and Cofactors) and practice the sign.',
          misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor.',
          parts: [
                { id: 'a', prompt: 'Find \\( \\text{adj } A \\) for \\( A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{bmatrix} \\). Show all cofactor calculations.', answer: 'Cofactors: \\( A_{11} = -24, A_{12} = 20, A_{13} = -5 \\)',
                  options: ['Cofactors: \\( A_{11} = -24, A_{12} = 20, A_{13} = -5 \\)', 'adjoint', 'transpose', 'is just the transpose of \\( A \\) shows confusion between transpose and adjoint'],
                  hint: 'If stuck, revisit c12_math_cbse_04_005 (Minors and Cofactors) and practice the sign pattern.',
                  misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor matrix.' },
                { id: 'b', prompt: 'If \\( A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\), verify algebraically that \\( A(\\text{adj } A) = |A|I \\).', answer: '\\( \\text{adj } A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)',
                  options: ['\\( \\text{adj } A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)', 'adjoint', 'transpose'],
                  hint: 'If stuck, revisit c12_math_cbse_04_005 (Minors and Cofactors) and practice the sign pattern.',
                  misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor matrix.' }
          ],
            remediations: { 'students-often-confuse-adjoint-with': { steps: ['If a student confuses adjoint with transpose: (1) Make them compute the cofactor matrix explicitly for a \\( 2 \\times 2.', '(2) Have them verify \\( A(\\text{adj } A) = |A|I \\) with their wrong answer — it will fail.', '(3) Revisit node c12_math_cbse_04_005 (Minors and Cofactors) and re-do 3 examples of cofactor calculation with emphasis.', '(4) Re-diagnostic: Ask them to find \\( \\text{adj } A \\) for \\( A = \\begin{bmatrix} 2 & -1 \\\\ 3 & 4 \\end{bmatrix} \\) and.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
