import type { SimDef } from '../../engine/types';
import C12_AppliedMathsAdjointInverseMatrixSim from '../../../simulations/c6_12/C12_AppliedMathsAdjointInverseMatrixSim';

/** v3 wrapped master — C12_AppliedMathsAdjointInverseMatrixSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsadjointinversematrixsim: SimDef = {
    id: 'v3w_c12_appliedmathsadjointinversematrixsim',
    title: 'Applied Maths Adjoint Inverse Matrix',
    subtitle: 'Covers finding inverses of 2×2 and 3×3 matrices using elementary row operations (the.',
    classLevel: 12, subject: 'science', topic: 'Inverse of a Matrix by Elementary Operations',
    chapters: [],
    nodeIds: ['c12_math_cbse_03_011', 'c12_math_cbse_04_001', 'c12_math_cbse_04_003', 'c12_math_cbse_04_005', 'c12_math_cbse_04_006', 'c12_math_cbse_04_007', 'c12_math_cbse_04_008', 'c12_math_cbse_04_010', 'c12_math_cbse_03_004', 'c12_math_cbse_03_005', 'c12_math_cbse_03_006', 'c12_math_cbse_03_010', 'c12_math_cbse_04_009', 'c12_math_cbse_03_001', 'c12_math_cbse_03_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you have ₹500 to split between two investment schemes giving 8% and 10% returns, and you want exactly.', goal: 'Master Applied Maths Adjoint Inverse Matrix.' },
    discovery: {
        question: 'State the exact condition for a square matrix A to have an inverse, and write the starting augmented matrix setup for finding A⁻¹ by elementary row operations.',
        options: ['A square matrix A has an inverse iff it is non-singular (det(A) ≠ 0)', 'write [I | A]', 'add to eliminate'],
        answer: 'A square matrix A has an inverse iff it is non-singular (det(A) ≠ 0)',
        hook: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution.',
    },
    teaching: [
        { title: 'The inverse of a square matrix A (denoted.', text: 'The inverse of a square matrix A (denoted A⁻¹) is a square matrix of the same order such that AA⁻¹ = A⁻¹A = I, where I is the identity matrix.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_011', title: 'The inverse of a square matrix A.',
          scaffold: { problem: 'A small factory produces two products P and Q. Each unit of P requires 2 hours on Machine A and 1 hour on Machine B.',
            steps: [
            { text: 'Let x = units of P, y = units of Q. Equations: 2x + y = 100 (Machine A), x + 3y = 120 (Machine B).' },
            { text: 'Set up augmented matrix [A | I] = [2 1 | 1 0; 1 3 | 0 1].' },
            { text: 'Swap rows to get 1 in top-left: R₁ ↔ R₂ → [1 3 | 0 1; 2 1 | 1 0].' },
            { text: 'Eliminate below pivot: R₂ → R₂ - 2R₁ → [1 3 | 0 1; 0 -5 | 1 -2].' },
            { text: 'Make pivot 1 in row 2: R₂ → (-1/5)R₂ → [1 3 | 0 1; 0 1 | -1/5 2/5].' },
            { text: 'Eliminate above pivot: R₁ → R₁ - 3R₂ → [1 0 | 3/5 -1/5; 0 1 | -1/5 2/5].' },
            { text: 'Thus A⁻¹ = [[3/5, -1/5], [-1/5, 2/5]] = (1/5)[[3, -1], [-1, 2]].' },
            { text: 'Compute [x; y] = A⁻¹[100; 120] = (1/5)[[3, -1], [-1, 2]] [100; 120] = (1/5)[300-120; -100+240] = (1/5)[180; 140] = [36;.' },
            { text: 'Verify: Machine A: 2(36) + 28 = 72 + 28 = 100 ✓. Machine B: 36 + 3(28) = 36 + 84 = 120 ✓.', faded: true, blankAnswer: 'Produce 36 units of P and 28 units of Q. A⁻¹ = (1/5)[[3,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_001', title: 'A determinant is a scalar value (real.',
          scaffold: { problem: 'A small farmer sells two crops: wheat and rice. In Week 1, he sells 3 quintals of wheat and 2 quintals of rice for ₹18,000.',
            steps: [
            { text: 'Identify the variables — let x = price per quintal of wheat (₹), y = price per quintal of rice (₹).' },
            { text: 'Write in matrix form AX = B. Coefficient matrix A = [[3, 2], [1, 4]], variable matrix X = [[x], [y]], constant matrix B.' },
            { text: 'Recognize A is a 2×2 square matrix, so its determinant exists. Apply the definition: |A| = a₁₁a₂₂ − a₂₁a₁₂.' },
            { text: 'Substitute entries: a₁₁ = 3, a₁₂ = 2, a₂₁ = 1, a₂₂ = 4. Compute |A| = (3)(4) − (1)(2) = 12 − 2 = 10.' },
            { text: 'Since |A| = 10 ≠ 0, the matrix is non-singular. By the invertibility condition, a unique solution exists for x and y.', faded: true, blankAnswer: 'A = [[3, 2], [1, 4]], |A| = 10, unique solution exists.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_003', title: 'Properties of determinants are a set of.',
          scaffold: { problem: 'A triangular plot of land has vertices at \\((10, 20)\\), \\((30, 40)\\), and \\((50, 60)\\).',
            steps: [
            { text: 'Write the area formula using determinant: \\(\\text{Area} = \\frac{1}{2} \\left| \\begin{vmatrix} 10 & 20 & 1 \\\\ 30 & 40 & 1.' },
            { text: 'Apply \\(C_1 \\leftarrow C_1 - 10C_3\\) and \\(C_2 \\leftarrow C_2 - 20C_3\\) (Property 6) to simplify first two columns.' },
            { text: 'Observe that \\(C_1\\) and \\(C_2\\) are now identical (both have entries 0, 20, 40). By Property 3, the determinant is 0.' },
            { text: 'Therefore, area = \\(\\frac{1}{2} \\times 0 = 0\\) square units.' },
            { text: 'Interpret: The three points are collinear, so the triangle has zero area.', faded: true, blankAnswer: '0 square units (points are collinear).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_005', title: 'The **minor** \\(M_{ij}\\) of an element.',
          scaffold: { problem: 'A civil engineer is analyzing a triangular support structure with vertices at coordinates (3, -2), (1, 4), and (-2, 1).',
            steps: [
            { text: 'Identify the matrix and the chosen expansion column. Matrix \\(A = \\begin{bmatrix} 3 & -2 & 1 \\\\ 1 & 4 & 1 \\\\ -2 & 1 & 1.' },
            { text: 'Compute minors for each element in Column 3 by deleting respective row and column 3.' },
            { text: 'Apply cofactor signs \\((-1)^{i+3}\\) for each element.' },
            { text: 'Compute determinant as sum of products: \\(\\Delta = a_{13}A_{13} + a_{23}A_{23} + a_{33}A_{33} = 1(9) + 1(1) + 1(14) =.' },
            { text: 'Area = \\(\\frac{1}{2} |\\Delta| = \\frac{1}{2} \\times 24 = 12\\) square metres.', faded: true, blankAnswer: '12 square metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_006', title: 'The adjoint of a square matrix \\( A =.',
          scaffold: { problem: 'Find the adjoint of matrix A = [[3, -2, 1], [2, 0, -1], [1, 4, 2]] and verify that A(adj A) = |A|I.',
            steps: [
            { text: 'Write down matrix A and identify it is 3×3. We will compute all 9 cofactors A_{ij}.' },
            { text: 'Compute minors M_{ij} by deleting i-th row and j-th column, then find cofactors A_{ij} = (-1)^{i+j} M_{ij}.' },
            { text: 'Form cofactor matrix C = [[4, -5, 8], [8, 5, -14], [2, 5, 4]].' },
            { text: 'Transpose C to get adj A = [[4, 8, 2], [-5, 5, 5], [8, -14, 4]].' },
            { text: 'Verify by computing |A| and A(adj A).', faded: true, blankAnswer: 'adj A = [[4, 8, 2], [-5, 5, 5], [8, -14, 4]]; |A| = 30;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_007', title: 'The inverse of a square matrix A of.',
          scaffold: { problem: 'A small shop sells three items: notebooks (₹x each), pens (₹y each), and erasers (₹z each).',
            steps: [
            { text: 'Write the system as AX = B. A = [[2, 1, 3], [1, 2, 1], [3, 1, 2]], X = [x, y, z]ᵀ, B = [13, 8, 13]ᵀ.' },
            { text: 'Compute |A|. Expand along R1: |A| = 2(4-1) - 1(2-3) + 3(1-6) = 2(3) - 1(-1) + 3(-5) = 6 + 1 - 15 = -8 ≠ 0.' },
            { text: 'Find cofactor matrix.' },
            { text: 'Adjoint = transpose of cofactor matrix = [[3, 1, -5], [1, -5, 1], [-5, 1, 3]] (symmetric here).' },
            { text: 'A⁻¹ = (1/-8) adj A = [[-3/8, -1/8, 5/8], [-1/8, 5/8, -1/8], [5/8, -1/8, -3/8]].' },
            { text: 'X = A⁻¹B = (1/-8)[[3,1,-5],[1,-5,1],[-5,1,3]] [13,8,13]ᵀ = (1/-8)[39+8-65, 13-40+13, -65+8+39]ᵀ = (1/-8)[-18, -14,.' },
            { text: 'x = ₹2.25, y = ₹1.75, z = ₹2.25. Verify: 2(2.25)+1.75+3(2.25)=4.5+1.75+6.75=13 ✓.', faded: true, blankAnswer: 'Notebook = ₹2.25, Pen = ₹1.75, Eraser = ₹2.25.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_04_001', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Adjoint Inverse Matrix', spots: [
            { id: 's1', label: 'The inverse of a square', prompt: 'Which idea is this? — The inverse of a square matrix A (denoted A⁻¹) is a square matrix of the same order such.', answer: 'The inverse of a square', options: ['The inverse of a square', 'A determinant is a scalar', 'Properties of determinants are a', 'The minor M_ij of an'] },
            { id: 's2', label: 'A determinant is a scalar', prompt: 'Which idea is this? — A determinant is a scalar value (real or complex) associated uniquely with every square.', answer: 'A determinant is a scalar', options: ['A determinant is a scalar', 'The inverse of a square', 'Properties of determinants are a', 'The minor M_ij of an'] },
            { id: 's3', label: 'Properties of determinants are a', prompt: 'Which idea is this? — Properties of determinants are a set of algebraic rules that describe how the value of a.', answer: 'Properties of determinants are a', options: ['Properties of determinants are a', 'The inverse of a square', 'A determinant is a scalar', 'The minor M_ij of an'] },
            { id: 's4', label: 'The minor M_ij of an', prompt: 'Which idea is this? — The **minor** \\(M_{ij}\\) of an element \\(a_{ij}\\) in a square matrix is the determinant.', answer: 'The minor M_ij of an', options: ['The minor M_ij of an', 'The inverse of a square', 'A determinant is a scalar', 'Properties of determinants are a'] },
            { id: 's5', label: 'The adjoint of a square', prompt: 'Which idea is this? — The adjoint of a square matrix \\( A = [a_{ij}]_{n \\times n} \\) is the transpose of the.', answer: 'The adjoint of a square', options: ['The adjoint of a square', 'The inverse of a square', 'A determinant is a scalar', 'Properties of determinants are a'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsAdjointInverseMatrixSim, prompt: 'Explore the interactive — Applied Maths Adjoint Inverse Matrix' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_03_011', difficulty: 'standard',
          question: 'The inverse of a square matrix A (denoted A⁻¹) is a square matrix of the same.',
          hint: 'If stuck, go back to c12_math_cbse_03_010 and practice: (1) reducing a 3×3 matrix to.',
          misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution.',
          parts: [
                { id: 'a', prompt: 'State the exact condition for a square matrix A to have an inverse, and write the starting augmented matrix setup for finding A⁻¹ by elementary row operations.', answer: 'A square matrix A has an inverse iff it is non-singular (det(A) ≠ 0)',
                  options: ['A square matrix A has an inverse iff it is non-singular (det(A) ≠ 0)', 'write [I | A]', 'add to eliminate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution phase).' },
                { id: 'b', prompt: 'Find the inverse of A = [[2, 3], [1, 2]] using elementary row operations. Show every step with the operation notation (e.g., R₁ ↔ R₂, R₁ → R₁/2, R₂ → R₂ - R₁).', answer: 'Start: [2 3 | 1 0',
                  options: ['Start: [2 3 | 1 0', 'add to eliminate', 'subtract the multiple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution phase).' },
                { id: 'c', prompt: 'Matrix B = [[1, 2, 3], [2, 4, 6], [1, 0, -1]]. Without computing the determinant, use elementary row operations to determine whether B⁻¹ exists.', answer: 'Start: [1 2 3 | 1 0 0',
                  options: ['Start: [1 2 3 | 1 0 0', 'add to eliminate', 'subtract the multiple'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently make sign errors when eliminating entries above the pivot in the final steps (back-substitution phase).' }
          ],
            remediations: { 'students-frequently-make-sign-errors': { steps: ['If a student makes sign errors in back-substitution: 1) Have them practice the 2×2 case repeatedly with the mantra "new.', '2) Use colour coding: highlight the pivot column, circle the entry to eliminate, write the operation explicitly before.', '3) For zero-pivot issues: give 3 matrices where the first pivot is zero — force them to identify the swap row (R₁ ↔ R₂.', '4) Revisit node c12_math_cbse_03_010 (Elementary Transformations) and redo the row operation drills there.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_001', difficulty: 'standard',
          question: 'A determinant is a scalar value (real or complex) associated uniquely with.',
          hint: 'If stuck, revisit "Types of Matrices" (Class 12 Chapter 3) to reinforce square vs.',
          misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute.',
          parts: [
                { id: 'a', prompt: 'What is the determinant of the matrix A = [7] (a 1×1 matrix), and why does the definition of determinant require the matrix to be square?', answer: 'The determinant of A = [7] is 7',
                  options: ['The determinant of A = [7] is 7', 'determinant is 0', 'non-square matrices have determinants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute the determinant of a.' },
                { id: 'b', prompt: 'A student writes: "The determinant of matrix A = [[1, 2, 3], [4, 5, 6]] is 1(5) − 2(4) = −3." Explain why this statement is mathematically incorrect, and state.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the formula is wrong', 'determinant is undefined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute the determinant of a.' }
          ],
            remediations: { 'students-treat-a-as-the': { steps: ['If the student confuses |A| with modulus or applies the formula to non-square matrices: 1.', 'Revisit the definition: "Only square matrices have determinants" — have the student list 5 matrices (mix of square and.', 'For sign errors in 2×2: drill the formula |A| = a₁₁a₂₂ − a₂₁a₁₂ with 10 varied examples, emphasizing "product of main.', 'For 3×3 cofactor signs: draw the 3×3 sign matrix | + − + | | − + − | | + − + | and have the student expand the same.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute.',
          parts: [
                { id: 'a', prompt: 'A student computes the determinant of B = | 2 1 3 | | 4 2 6 | | 1 0 1 | by expanding along the first row and gets |B| = 2(2·1 − 6·0) − 1(4·1 − 6·1) + 3(4·0 −.', answer: 'The claim is **correct**',
                  options: ['The claim is **correct**', 'the claim is wrong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute the determinant of a.' }
          ],
            remediations: { 'students-treat-a-as-the': { steps: ['If the student confuses |A| with modulus or applies the formula to non-square matrices: 1.', 'Revisit the definition: "Only square matrices have determinants" — have the student list 5 matrices (mix of square and.', 'For sign errors in 2×2: drill the formula |A| = a₁₁a₂₂ − a₂₁a₁₂ with 10 varied examples, emphasizing "product of main.', 'For 3×3 cofactor signs: draw the 3×3 sign matrix | + − + | | − + − | | + − + | and have the student expand the same.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_003', difficulty: 'standard',
          question: 'Properties of determinants are a set of algebraic rules that describe how the.',
          hint: 'Revisit c12_math_cbse_04_002: practice expanding \\(3 \\times 3\\) determinants along.',
          misconception: 'Students often believe that Property 6 allows them to add a multiple of row \\(i\\) to row \\(j\\) **and simultaneously**.',
          parts: [
                { id: 'a', prompt: 'State Property 4 of determinants: If each element of a row (or column) of a determinant is multiplied by a scalar \\(k\\), what happens to the value of the.', answer: 'The value of the determinant gets multiplied by \\(k\\)',
                  options: ['The value of the determinant gets multiplied by \\(k\\)', 'the determinant does not change', 'it gets multiplied by \\(k^n\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Property 6 allows them to add a multiple of row \\(i\\) to row \\(j\\) **and simultaneously** change row \\(i\\).' },
                { id: 'b', prompt: 'Explain why Property 6 (adding a multiple of one row to another row) does not change the value of the determinant, using the concept of linearity of.', answer: 'The determinant is a multilinear function of its rows',
                  options: ['The determinant is a multilinear function of its rows', 'the operation always changes the value'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Property 6 allows them to add a multiple of row \\(i\\) to row \\(j\\) **and simultaneously** change row \\(i\\).' }
          ],
            remediations: { 'property-6-allows-them-to': { steps: ['Have the student write down each property in their own words with a \\(2 \\times 2\\) example.', 'Give a \\(3 \\times 3\\) determinant with an obvious common factor in one row; ask them to factor it out (Property 4) and.', 'Provide a determinant where \\(R_2 = 2R_1\\); ask them to use Property 6 to create a zero row and conclude the.', 'Finally, give a mixed exercise where they must choose the correct sequence of properties to simplify a determinant with.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_005', difficulty: 'standard',
          question: 'The **minor** \\(M_{ij}\\) of an element \\(a_{ij}\\) in a square matrix is the.',
          hint: 'Revisit c12_math_cbse_04_002 Example 3 and 4 — practice expanding \\(3 \\times 3\\).',
          misconception: '**Sign error in cofactor formula**: Students mechanically write \\(A_{ij} = (-1)^{i+j} M_{ij}\\) but then compute.',
          parts: [
                { id: 'a', prompt: 'Given \\(\\Delta = \\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix}\\), a student claims that \\(a A_{11} + b A_{12} + c A_{13} = d A_{11} + e.', answer: 'The claim is false',
                  options: ['The claim is false', 'cofactor of element in Row 1', 'cofactor used in Row 1 expansion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Sign error in cofactor formula**: Students mechanically write \\(A_{ij} = (-1)^{i+j} M_{ij}\\) but then compute \\((-1)^{i+j}\\) incorrectly.' }
          ],
            remediations: { 'sign-error-in-cofactor-formula': { steps: ['If a student makes the sign error, have them write the \\(3 \\times 3\\) checkerboard sign matrix explicitly:.', 'Then for each element, the cofactor sign is exactly the sign in that position.', 'Practice: give five elements from random positions in a \\(3 \\times 3\\) matrix and ask for the sign only (not the minor).', 'Once signs are automatic, return to full minor+cofactor computation.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Sign error in cofactor formula**: Students mechanically write \\(A_{ij} = (-1)^{i+j} M_{ij}\\) but then compute.',
          parts: [
                { id: 'a', prompt: 'Given \\(\\Delta = \\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix}\\), a student claims that \\(a A_{11} + b A_{12} + c A_{13} = d A_{11} + e.', answer: 'The claim is false',
                  options: ['The claim is false', 'cofactor of element in Row 1', 'cofactor used in Row 1 expansion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Sign error in cofactor formula**: Students mechanically write \\(A_{ij} = (-1)^{i+j} M_{ij}\\) but then compute \\((-1)^{i+j}\\) incorrectly.' }
          ],
            remediations: { 'sign-error-in-cofactor-formula': { steps: ['If a student makes the sign error, have them write the \\(3 \\times 3\\) checkerboard sign matrix explicitly:.', 'Then for each element, the cofactor sign is exactly the sign in that position.', 'Practice: give five elements from random positions in a \\(3 \\times 3\\) matrix and ask for the sign only (not the minor).', 'Once signs are automatic, return to full minor+cofactor computation.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_006', difficulty: 'standard',
          question: 'The adjoint of a square matrix \\( A = [a_{ij}]_{n \\times n} \\) is the transpose.',
          hint: 'If stuck, revisit c12_math_cbse_04_005 (Minors and Cofactors) and practice the sign.',
          misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor.',
          parts: [
                { id: 'a', prompt: 'Find \\( \\text{adj } A \\) for \\( A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{bmatrix} \\). Show all cofactor calculations.', answer: 'Cofactors: \\( A_{11} = -24, A_{12} = 20, A_{13} = -5 \\)',
                  options: ['Cofactors: \\( A_{11} = -24, A_{12} = 20, A_{13} = -5 \\)', 'adjoint', 'transpose'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor matrix.' },
                { id: 'b', prompt: 'If \\( A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\), verify algebraically that \\( A(\\text{adj } A) = |A|I \\).', answer: '\\( \\text{adj } A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)',
                  options: ['\\( \\text{adj } A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)', 'adjoint', 'transpose'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor matrix.' }
          ],
            remediations: { 'students-often-confuse-adjoint-with': { steps: ['If a student confuses adjoint with transpose: (1) Make them compute the cofactor matrix explicitly for a \\( 2 \\times 2.', '(2) Have them verify \\( A(\\text{adj } A) = |A|I \\) with their wrong answer — it will fail.', '(3) Revisit node c12_math_cbse_04_005 (Minors and Cofactors) and re-do 3 examples of cofactor calculation with emphasis.', '(4) Re-diagnostic: Ask them to find \\( \\text{adj } A \\) for \\( A = \\begin{bmatrix} 2 & -1 \\\\ 3 & 4 \\end{bmatrix} \\) and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor.',
          parts: [
                { id: 'a', prompt: 'If \\( A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\), verify algebraically that \\( A(\\text{adj } A) = |A|I \\).', answer: '\\( \\text{adj } A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)',
                  options: ['\\( \\text{adj } A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)', 'adjoint', 'transpose'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "adjoint" with "transpose". They compute \\( A^T \\) instead of the transpose of the cofactor matrix.' }
          ],
            remediations: { 'students-often-confuse-adjoint-with': { steps: ['If a student confuses adjoint with transpose: (1) Make them compute the cofactor matrix explicitly for a \\( 2 \\times 2.', '(2) Have them verify \\( A(\\text{adj } A) = |A|I \\) with their wrong answer — it will fail.', '(3) Revisit node c12_math_cbse_04_005 (Minors and Cofactors) and re-do 3 examples of cofactor calculation with emphasis.', '(4) Re-diagnostic: Ask them to find \\( \\text{adj } A \\) for \\( A = \\begin{bmatrix} 2 & -1 \\\\ 3 & 4 \\end{bmatrix} \\) and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_007', difficulty: 'standard',
          question: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix.',
          hint: 'If stuck on cofactor signs or determinant calculation, revisit c12_math_cbse_04_005.',
          misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying',
                  options: ['The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying', 'The inverse of a square matrix A (denoted A⁻¹) is a square matrix of the same order such', 'A determinant is a scalar value (real or complex) associated uniquely with every square', 'Properties of determinants are a set of algebraic rules that describe how the value of a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.' }
          ],
            remediations: { 'students-compute-the-cofactor-matrix': { steps: ['Remediation: Return to c12_math_cbse_04_006 (Adjoint of a Matrix) and re-derive adj A for a 3×3 matrix step by step:.', 'Use a matrix with distinct off-diagonal cofactors (e.g., A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]) so the transpose.', 'Re-do Diagnostic Question 3 with this matrix.', 'Then re-attempt Diagnostic Question 5 with |A| ≠ 1 to force the division step.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
