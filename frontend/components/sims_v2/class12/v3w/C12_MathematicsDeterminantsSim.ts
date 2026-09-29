import type { SimDef } from '../../engine/types';
import C12_MathematicsDeterminantsSim from '../../../simulations/c6_12/C12_MathematicsDeterminantsSim';

/** v3 wrapped master — C12_MathematicsDeterminantsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsdeterminantssim: SimDef = {
    id: 'v3w_c12_mathematicsdeterminantssim',
    title: 'Determinant of a Square Matrix: Definition',
    subtitle: 'This node covers the definition of determinant for square matrices of order 1, 2, and 3;.',
    classLevel: 12, subject: 'mathematics', topic: 'Determinant of a Square Matrix: Definition',
    chapters: [],
    nodeIds: ['c12_math_cbse_04_001', 'c12_math_cbse_04_002', 'c12_math_cbse_04_003', 'c12_math_cbse_04_004', 'c12_math_cbse_04_005', 'c12_math_cbse_04_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are running a small stationery shop and need to find the individual prices of pens and notebooks.', goal: 'Master Determinant of a Square Matrix: Definition.' },
    discovery: {
        question: 'What is the determinant of the matrix A = [7] (a 1×1 matrix), and why does the definition of determinant require the matrix to be square?',
        options: ['The determinant of A = [7] is 7', 'determinant is 0', 'non-square matrices have determinants'],
        answer: 'The determinant of A = [7] is 7',
        hook: 'Students treat |A| as the modulus (absolute value) of the matrix and write |A| = ± value, or they attempt to compute.',
    },
    teaching: [
        { title: 'A determinant is a scalar value (real or.', text: 'A determinant is a scalar value (real or complex) associated uniquely with every square matrix A = [aᵢⱼ] of order n, denoted by |A|, det A, or Δ.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_001', title: 'A determinant is a scalar value (real.',
          scaffold: { problem: 'A small farmer sells two crops: wheat and rice. In Week 1, he sells 3 quintals of wheat and 2 quintals of rice for ₹18,000.',
            steps: [
            { text: 'Identify the variables — let x = price per quintal of wheat (₹), y = price per quintal of rice (₹).' },
            { text: 'Write in matrix form AX = B. Coefficient matrix A = [[3, 2], [1, 4]], variable matrix X = [[x], [y]], constant matrix B.' },
            { text: 'Recognize A is a 2×2 square matrix, so its determinant exists. Apply the definition: |A| = a₁₁a₂₂ − a₂₁a₁₂.' },
            { text: 'Substitute entries: a₁₁ = 3, a₁₂ = 2, a₂₁ = 1, a₂₂ = 4. Compute |A| = (3)(4) − (1)(2) = 12 − 2 = 10.' },
            { text: 'Since |A| = 10 ≠ 0, the matrix is non-singular. By the invertibility condition, a unique solution exists for x and y.', faded: true, blankAnswer: 'A = [[3, 2], [1, 4]], |A| = 10, unique solution exists.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_002', title: 'The determinant of a 2×2 matrix A =.',
          scaffold: { problem: 'A civil engineer is checking the stability of a triangular support bracket with vertices at coordinates A(2, −1), B(5, 3), C(−2, 4) in.',
            steps: [
            { text: 'Write the 3×3 matrix with coordinates and a column of 1s as per the area formula.' },
            { text: 'Choose expansion along column 3 (all entries are 1, but signs alternate: +, −, +).' },
            { text: 'Compute minors: M₁₃ = |5 3; −2 4| = 5×4 − 3×(−2) = 20 + 6 = 26. M₂₃ = |2 −1; −2 4| = 2×4 − (−1)(−2) = 8 − 2 = 6.' },
            { text: 'Apply cofactor signs: C₁₃ = (+1)×26 = 26; C₂₃ = (−1)×6 = −6; C₃₃ = (+1)×11 = 11.' },
            { text: 'Determinant = 1×26 + 1×(−6) + 1×11 = 31. Area = ½ × |31| = 15.5 m².', faded: true, blankAnswer: '15.5 m²' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_004', title: 'The area of a triangle with vertices at.',
          scaffold: { problem: 'A triangular plot of land in a housing society has corners at GPS coordinates A(3, 8), B(−4, 2), and C(5, 1) (in metres).',
            steps: [
            { text: 'Write the determinant matrix with vertices as rows and a column of 1s: |3 8 1; −4 2 1; 5 1 1|' },
            { text: 'Expand along the third column (C₃) since it has three 1s: Δ = 1·|−4 2; 5 1| − 1·|3 8; 5 1| + 1·|3 8; −4 2|' },
            { text: 'Compute each 2×2 determinant: |−4 2; 5 1| = (−4)(1) − (2)(5) = −4 − 10 = −14; |3 8; 5 1| = (3)(1) − (8)(5) = 3 − 40 =.' },
            { text: 'Sum with alternating signs: Δ = 1(−14) − 1(−37) + 1(38) = −14 + 37 + 38 = 61' },
            { text: 'Area = ½|Δ| = ½ × 61 = 30.5 m². Perimeter = 36.5 m (given). Fencing cost = 36.5 × 150 = ₹5,475.', faded: true, blankAnswer: 'Area = 30.5 m²; Total fencing cost = ₹5,475' }
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
        { type: 'dissect', nodeId: 'c12_math_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Determinant of a Square Matrix: Definition', spots: [
            { id: 's1', label: 'A determinant is a scalar', prompt: 'Which idea is this? — A determinant is a scalar value (real or complex) associated uniquely with every square.', answer: 'A determinant is a scalar', options: ['A determinant is a scalar', 'The determinant of a 22', 'Properties of determinants are a', 'The area of a triangle'] },
            { id: 's2', label: 'The determinant of a 22', prompt: 'Which idea is this? — The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted.', answer: 'The determinant of a 22', options: ['The determinant of a 22', 'A determinant is a scalar', 'Properties of determinants are a', 'The area of a triangle'] },
            { id: 's3', label: 'Properties of determinants are a', prompt: 'Which idea is this? — Properties of determinants are a set of algebraic rules that describe how the value of a.', answer: 'Properties of determinants are a', options: ['Properties of determinants are a', 'A determinant is a scalar', 'The determinant of a 22', 'The area of a triangle'] },
            { id: 's4', label: 'The area of a triangle', prompt: 'Which idea is this? — The area of a triangle with vertices at coordinates (x₁, y₁), (x₂, y₂), and (x₃, y₃) is.', answer: 'The area of a triangle', options: ['The area of a triangle', 'A determinant is a scalar', 'The determinant of a 22', 'Properties of determinants are a'] },
            { id: 's5', label: 'The minor M_ij of an', prompt: 'Which idea is this? — The **minor** \\(M_{ij}\\) of an element \\(a_{ij}\\) in a square matrix is the determinant.', answer: 'The minor M_ij of an', options: ['The minor M_ij of an', 'A determinant is a scalar', 'The determinant of a 22', 'Properties of determinants are a'] },
            { id: 's6', label: 'The inverse of a square', prompt: 'Which idea is this? — The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying.', answer: 'The inverse of a square', options: ['The inverse of a square', 'A determinant is a scalar', 'The determinant of a 22', 'Properties of determinants are a'] }
          ] } }
    ],
    explore: { component: C12_MathematicsDeterminantsSim, prompt: 'Explore the interactive — Determinant of a Square Matrix: Definition' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_math_cbse_04_002', difficulty: 'standard',
          question: 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad −.',
          hint: 'Revisit c10_math_cbse_04_005 (quadratic formula derivation) and c9_math_ch4_8.',
          misconception: 'Students consistently mishandle the (−1)ⁱ⁺ʲ sign factor when expanding 3×3 determinants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted',
                  options: ['The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted', 'A determinant is a scalar value (real or complex) associated uniquely with every square', 'Properties of determinants are a set of algebraic rules that describe how the value of a', 'The area of a triangle with vertices at coordinates (x₁, y₁), (x₂, y₂), and (x₃, y₃) is'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently mishandle the (−1)ⁱ⁺ʲ sign factor when expanding 3×3 determinants.' }
          ],
            remediations: { 'students-consistently-mishandle-the-1': { steps: ['Have the student write the 3×3 sign matrix explicitly: [ + − + ] [ − + − ] [ + − + ] 2.', 'Make them circle the (i,j) position of each element in the chosen expansion row/column and read off the sign from the.', 'Practice three expansions of the same numerical matrix along R1, R2, C1 — verifying all give identical results.', 'Drill: "Sign = + if (row+col) is even, − if odd." Repeat until automatic.'] } } },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_04_004', difficulty: 'standard',
          question: 'The area of a triangle with vertices at coordinates (x₁, y₁), (x₂, y₂), and.',
          hint: 'If stuck on determinant expansion, revisit c12_math_cbse_04_002 (Determinant of 2x2 and.',
          misconception: 'Students often write the determinant as |x₁ y₁; x₂ y₂; x₃ y₃| (a 3×2 matrix) or forget the column of 1s entirely,.',
          parts: [
                { id: 'a', prompt: 'Explain why we take the absolute value of the determinant when computing area, and why we must consider both positive and negative values of the determinant.', answer: 'Area is a positive physical quantity, so we take |det|',
                  options: ['Area is a positive physical quantity, so we take |det|', 'determinant is always positive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the determinant as |x₁ y₁; x₂ y₂; x₃ y₃| (a 3×2 matrix) or forget the column of 1s entirely, computing |x₁ y₁; x₂ y₂|.' }
          ],
            remediations: { 'students-often-write-the-determinant': { steps: ['If the student forgets the column of 1s: Return to c9_math_ch1_11 (Area of a Triangle Using Coordinates: Formula) and.', 'Then show how adding a column of 1s converts this to a 3×3 determinant.', 'If the student misses the ± when area is given: Use a number line analogy — the perpendicular distance from the third.', 'Practice Exercise 4.2 Q3 from NCERT with both positive and negative determinant values.'] } } },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_04_007', difficulty: 'standard',
          question: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix.',
          hint: 'If stuck on cofactor signs or determinant calculation, revisit c12_math_cbse_04_005.',
          misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying',
                  options: ['The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying', 'A determinant is a scalar value (real or complex) associated uniquely with every square', 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted', 'Properties of determinants are a set of algebraic rules that describe how the value of a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.' }
          ],
            remediations: { 'students-compute-the-cofactor-matrix': { steps: ['Remediation: Return to c12_math_cbse_04_006 (Adjoint of a Matrix) and re-derive adj A for a 3×3 matrix step by step:.', 'Use a matrix with distinct off-diagonal cofactors (e.g., A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]) so the transpose.', 'Re-do Diagnostic Question 3 with this matrix.', 'Then re-attempt Diagnostic Question 5 with |A| ≠ 1 to force the division step.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
