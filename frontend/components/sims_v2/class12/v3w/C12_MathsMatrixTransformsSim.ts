import type { SimDef } from '../../engine/types';
import C12_MathsMatrixTransformsSim from '../../../simulations/three/C12_MathsMatrixTransformsSim';

/** v3 wrapped master — C12_MathsMatrixTransformsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathsmatrixtransformssim: SimDef = {
    id: 'v3w_c12_mathsmatrixtransformssim',
    title: 'Elementary Transformations of a Matrix',
    subtitle: 'This node covers the definition, notation, and application of the three elementary.',
    classLevel: 12, subject: 'mathematics', topic: 'Elementary Transformations of a Matrix',
    chapters: [],
    nodeIds: ['c12_math_cbse_03_010', 'c12_math_cbse_03_001', 'c12_math_cbse_03_005', 'c12_math_cbse_03_008', 'c12_math_cbse_07_005', 'c12_math_cbse_09_006', 'c12_math_cbse_04_003', 'c12_math_cbse_04_006', 'c12_math_cbse_04_008', 'c12_math_cbse_04_009', 'c12_math_cbse_04_010', 'c12_math_cbse_03_002', 'c12_math_cbse_03_003', 'c12_math_cbse_03_004', 'c12_math_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re a cryptographer in Bengaluru trying to decode a message encoded as a 3×3 matrix.', goal: 'Master Elementary Transformations of a Matrix.' },
    discovery: {
        question: 'A student writes: "The matrix B = [5] is a row matrix because it has one row." Is this correct? Explain why or why not.',
        options: ['The statement is incorrect', 'only a row matrix', 'the first subscript is column and the second is row (i'],
        answer: 'The statement is incorrect',
        hook: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij =.',
    },
    teaching: [
        { title: 'Elementary transformations (or elementary.', text: 'Elementary transformations (or elementary operations) of a matrix are three specific operations that can be applied to the rows or columns of a matrix without changing its fundamental properties.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_010', title: 'Elementary transformations (or.',
          scaffold: { problem: 'A small factory in Pune produces three products (P₁, P₂, P₃) using three raw materials (R₁, R₂, R₃).',
            steps: [
            { text: 'Identify the operations in order: (i) Swap product order so P₃ is first → this is R₁ ↔ R₃.' },
            { text: 'Start with M = [[2, 3, 1], [1, 2, 2], [3, 1, 3]]. Apply R₁ ↔ R₃: new matrix = [[3, 1, 3], [1, 2, 2], [2, 3, 1]].' },
            { text: 'Apply R₂ → 2R₂: multiply second row by 2 → [[3, 1, 3], [2, 4, 4], [2, 3, 1]].' },
            { text: 'Apply R₃ → R₃ - 2R₁: new R₃ = [2,3,1] - 2×[3,1,3] = [2-6, 3-2, 1-6] = [-4, 1, -5].' },
            { text: 'Verify each operation was applied to the current matrix, not the original.', faded: true, blankAnswer: 'Final matrix = [[3, 1, 3], [2, 4, 4], [-4, 1, -5]]' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_001', title: 'A matrix is an ordered rectangular.',
          scaffold: { problem: 'A school has 3 sections (A, B, C) in Class 12. Each section has students opting for 4 streams: Science, Commerce, Humanities, Vocational.',
            steps: [
            { text: 'Identify what constitutes rows and columns. Here, sections (3) are rows, streams (4) are columns. Order = 3 × 4.' },
            { text: 'Write the matrix with brackets. Row 1 = Section A data: [40, 25, 15, 10]. Row 2 = Section B data: [35, 30, 20, 5].' },
            { text: 'Write the complete matrix: A = [[40, 25, 15, 10], [35, 30, 20, 5], [30, 20, 25, 15]].' },
            { text: 'Verify order: 3 rows, 4 columns → 3 × 4. Total elements = 12.' },
            { text: 'Locate Commerce in Section B: Commerce is column 2, Section B is row 2 → element a_22 = 30.', faded: true, blankAnswer: 'Matrix A = [[40, 25, 15, 10], [35, 30, 20, 5], [30, 20, 25,.' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_008', title: 'The transpose of a matrix \\(A =.',
          scaffold: { problem: 'A school stores the fees (in rupees) for three classes (VI, VII, VIII) in two terms (Term 1, Term 2) as a matrix \\(F = \\begin{bmatrix} 5000.',
            steps: [
            { text: 'Identify the given matrix \\(F\\) has order \\(3 \\times 2\\) (3 classes, 2 terms).' },
            { text: 'To swap rows and columns, write the first row of \\(F\\) as the first column of \\(F\'\\), the second row as the second.' },
            { text: '\\(F\' = \\begin{bmatrix} 5000 & 6000 & 7000 \\\\ 5500 & 6500 & 7500 \\end{bmatrix}\\).' },
            { text: 'Verify order: \\(F\'\\) has 2 rows (terms) and 3 columns (classes), so order is \\(2 \\times 3\\).' },
            { text: 'Interpret: The entry in row 1, column 2 of \\(F\'\\) is 6000, which is the Term 1 fee for Class VII — consistent with the.', faded: true, blankAnswer: '\\(F\' = \\begin{bmatrix} 5000 & 6000 & 7000 \\\\ 5500 & 6500 &.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_005', title: 'Standard integrals of trigonometric.',
          scaffold: { problem: 'A particle moves along a straight line with velocity v(t) = 4 sin(3t) + 2 cos(3t) m/s. Find its displacement function s(t) given s(0) = 0.',
            steps: [
            { text: 'Write the displacement as the antiderivative of velocity: s(t) = ∫ v(t) dt = ∫ [4 sin(3t) + 2 cos(3t)] dt.' },
            { text: 'Use linearity of integration: s(t) = 4 ∫ sin(3t) dt + 2 ∫ cos(3t) dt.' },
            { text: 'Apply the standard integrals with linear arguments: ∫ sin(3t) dt = –(1/3) cos(3t) + C₁, ∫ cos(3t) dt = (1/3) sin(3t) +.' },
            { text: 'Substitute: s(t) = 4[–(1/3) cos(3t)] + 2[(1/3) sin(3t)] + C = –(4/3) cos(3t) + (2/3) sin(3t) + C.' },
            { text: 'Use initial condition s(0)=0: 0 = –(4/3) cos 0 + (2/3) sin 0 + C = –4/3 + C ⇒ C = 4/3.', faded: true, blankAnswer: 's(t) = (2/3) sin(3t) – (4/3) cos(3t) + 4/3 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_006', title: 'A first-order, first-degree.',
          scaffold: { problem: '** A curve passes through the point \\((1, 2)\\). At any point \\((x, y)\\) on the curve, the slope of the tangent is given by \\(\\frac{x^2 +.',
            steps: [
            { text: 'Write the differential equation: \\(\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}\\).' },
            { text: 'Substitute \\(y = vx\\) ⇒ \\(\\frac{dy}{dx} = v + x\\frac{dv}{dx}\\).' },
            { text: 'Equate: \\(v + x\\frac{dv}{dx} = \\frac{1+v^2}{2v}\\). Subtract \\(v\\): \\(x\\frac{dv}{dx} = \\frac{1+v^2}{2v} - v =.' },
            { text: 'Separate variables: \\(\\frac{2v}{1 - v^2} dv = \\frac{dx}{x}\\).' },
            { text: 'Integrate both sides: \\(\\int \\frac{2v}{1 - v^2} dv = \\int \\frac{dx}{x}\\).' },
            { text: 'Substitute back \\(v = y/x\\): \\(x\\left(1 - \\frac{y^2}{x^2}\\right) = C_1\\) ⇒ \\(x \\cdot \\frac{x^2 - y^2}{x^2} = C_1\\) ⇒.' },
            { text: 'Use initial condition \\((1, 2)\\): \\(1^2 - 2^2 = C_1 \\cdot 1\\) ⇒ \\(1 - 4 = C_1\\) ⇒ \\(C_1 = -3\\).' },
            { text: 'Particular solution: \\(x^2 - y^2 = -3x\\) or \\(x^2 + 3x - y^2 = 0\\).', faded: true, blankAnswer: '** \\(x^2 + 3x - y^2 = 0\\) (or \\(y^2 = x^2 + 3x\\))' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_03_001', title: 'Identify each idea',
          dissect: { specimen: 'Elementary Transformations of a Matrix', spots: [
            { id: 's1', label: 'Elementary transformations or elementary operations', prompt: 'Which idea is this? — Elementary transformations (or elementary operations) of a matrix are three specific.', answer: 'Elementary transformations or elementary operations', options: ['Elementary transformations or elementary operations', 'A matrix is an ordered', 'Matrix multiplication is a binary', 'The transpose of a matrix'] },
            { id: 's2', label: 'A matrix is an ordered', prompt: 'Which idea is this? — A matrix is an ordered rectangular array of numbers or functions arranged in rows and.', answer: 'A matrix is an ordered', options: ['A matrix is an ordered', 'Elementary transformations or elementary operations', 'Matrix multiplication is a binary', 'The transpose of a matrix'] },
            { id: 's3', label: 'Matrix multiplication is a binary', prompt: 'Which idea is this? — Matrix multiplication is a binary operation that produces a matrix from two matrices.', answer: 'Matrix multiplication is a binary', options: ['Matrix multiplication is a binary', 'Elementary transformations or elementary operations', 'A matrix is an ordered', 'The transpose of a matrix'] },
            { id: 's4', label: 'The transpose of a matrix', prompt: 'Which idea is this? — The transpose of a matrix \\(A = [a_{ij}]_{m \\times n}\\) is the matrix \\(A\'\\) (or \\(A^T\\)).', answer: 'The transpose of a matrix', options: ['The transpose of a matrix', 'Elementary transformations or elementary operations', 'A matrix is an ordered', 'Matrix multiplication is a binary'] },
            { id: 's5', label: 'Standard integrals of trigonometric functions', prompt: 'Which idea is this? — Standard integrals of trigonometric functions are the antiderivatives of the six basic.', answer: 'Standard integrals of trigonometric functions', options: ['Standard integrals of trigonometric functions', 'Elementary transformations or elementary operations', 'A matrix is an ordered', 'Matrix multiplication is a binary'] },
            { id: 's6', label: 'A first-order first-degree differential equation', prompt: 'Which idea is this? — A first-order, first-degree differential equation of the form \\(\\frac{dy}{dx} = F(x, y)\\).', answer: 'A first-order first-degree differential equation', options: ['A first-order first-degree differential equation', 'Elementary transformations or elementary operations', 'A matrix is an ordered', 'Matrix multiplication is a binary'] }
          ] } }
    ],
    explore: { component: C12_MathsMatrixTransformsSim, prompt: 'Explore the interactive — Elementary Transformations of a Matrix' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_03_010', difficulty: 'standard',
          question: 'Elementary transformations (or elementary operations) of a matrix are three.',
          hint: 'If stuck, revisit c12_math_cbse_03_006 (Scalar Multiplication) and c12_math_cbse_03_004.',
          misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.',
          parts: [
                { id: 'a', prompt: 'What are the three elementary row operations on a matrix? Write the standard notation for each.', answer: 'The three elementary row operations are: (1) Interchange of two rows: Rᵢ ↔ Rⱼ',
                  options: ['The three elementary row operations are: (1) Interchange of two rows: Rᵢ ↔ Rⱼ', 'non-zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' },
                { id: 'b', prompt: 'Explain why multiplying a row by zero (Rᵢ → 0·Rᵢ) is NOT allowed as an elementary transformation, even though it seems like a special case of Rᵢ → kRᵢ.', answer: 'Multiplying a row by zero destroys information',
                  options: ['Multiplying a row by zero destroys information', 'it\'s allowed because k can be any number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' }
          ],
            remediations: { 'students-often-write-r-r': { steps: ['If a student struggles with the non-zero scalar condition or sequential application: 1.', 'Have them revisit c12_math_cbse_03_004 (Matrix Addition) and c12_math_cbse_03_006 (Scalar Multiplication) to reinforce.', 'Practice with a 2×2 matrix: write A, apply R₁ → 0·R₁, then ask "Can you get back A?" — physically demonstrate.', 'For sequential errors: give a 3-step sequence on a 3×3 matrix; have them circle which matrix each operation acts on.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I apply R₁ → R₁ + 2R₂ and then R₂ → R₂ - 3R₁ to a matrix, the net effect is the same as applying R₂ → R₂ - 3R₁ first and then R₁ → R₁ +.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'they\'re the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' }
          ],
            remediations: { 'students-often-write-r-r': { steps: ['If a student struggles with the non-zero scalar condition or sequential application: 1.', 'Have them revisit c12_math_cbse_03_004 (Matrix Addition) and c12_math_cbse_03_006 (Scalar Multiplication) to reinforce.', 'Practice with a 2×2 matrix: write A, apply R₁ → 0·R₁, then ask "Can you get back A?" — physically demonstrate.', 'For sequential errors: give a 3-step sequence on a 3×3 matrix; have them circle which matrix each operation acts on.'] } } },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_03_005', difficulty: 'standard',
          question: 'Matrix multiplication is a binary operation that produces a matrix from two.',
          hint: 'Revisit matrix order and addition in nodes c12_math_cbse_03_001 and c12_math_cbse_03_004;.',
          misconception: 'Students often multiply matrices element-wise (Hadamard product) instead of using the row-by-column dot product.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matrix multiplication is a binary operation that produces a matrix from two matrices',
                  options: ['Matrix multiplication is a binary operation that produces a matrix from two matrices', 'Elementary transformations (or elementary operations) of a matrix are three specific', 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and', 'The transpose of a matrix \\(A = [a_{ij}]_{m \\times n}\\) is the matrix \\(A\'\\) (or \\(A^T\\))'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply matrices element-wise (Hadamard product) instead of using the row-by-column dot product.' }
          ],
            remediations: { 'students-often-multiply-matrices-element': { steps: ['If a student multiplies element-wise, immediately contrast with a 2×2 numerical example showing the two results differ.', 'Have them write the definition: "c_ik = sum over j of a_ij b_jk" and trace the indices with a finger on paper.', 'Revisit node c12_math_cbse_03_004 (addition) to remind them that addition is element-wise but multiplication is not.', 'Then re-do Diagnostic Question 3 step-by-step, verbalizing each row-column pair.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_008', difficulty: 'standard',
          question: 'The transpose of a matrix \\(A = [a_{ij}]_{m \\times n}\\) is the matrix \\(A\'\\).',
          hint: 'If stuck, review matrix multiplication (c12_math_cbse_03_005) and matrix addition.',
          misconception: 'Students frequently write \\((AB)\' = A\'B\'\\) instead of \\((AB)\' = B\'A\'\\).',
          parts: [
                { id: 'a', prompt: 'Explain why \\((A\')\' = A\\) is always true for any matrix \\(A\\). Use the definition of transpose in your explanation.', answer: 'Transpose swaps rows and columns: \\((A\')_{ij} = a_{ji}\\)',
                  options: ['Transpose swaps rows and columns: \\((A\')_{ij} = a_{ji}\\)', 'it\'s a property'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write \\((AB)\' = A\'B\'\\) instead of \\((AB)\' = B\'A\'\\).' }
          ],
            remediations: { 'students-frequently-write-ab-a': { steps: ['Revisit the definition of matrix multiplication (node c12_math_cbse_03_005) and explicitly write the \\((i,k)\\)-th.', 'Write the \\((k,i)\\)-th element of \\((AB)\'\\) as \\(\\sum_j a_{ij}b_{jk}\\).', 'Write the \\((k,i)\\)-th element of \\(B\'A\'\\) as \\(\\sum_j b_{kj}a_{ji} = \\sum_j a_{ij}b_{jk}\\) (since \\(b_{kj} =.', 'Conclude that the two sums are identical, so \\((AB)\' = B\'A\'\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_005', difficulty: 'standard',
          question: 'Standard integrals of trigonometric functions are the antiderivatives of the.',
          hint: 'If stuck, review the derivatives of sin x, cos x, tan x, cot x, sec x, cosec x.',
          misconception: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus.',
          parts: [
                { id: 'a', prompt: 'Write the indefinite integral of sec x tan x with respect to x, including the constant of integration.', answer: '∫ sec x tan x dx = sec x + C',
                  options: ['∫ sec x tan x dx = sec x + C', 'sec²x + C', 'tan x + C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus sign) and ∫ cos x dx =.' }
          ],
            remediations: { 'the-most-pervasive-error-is': { steps: ['Have the student write the six derivatives of trig functions from memory (Class 11 node c11_math_cbse_13_010).', 'For each derivative, explicitly write the reverse statement: "Since d/dx[–cos x] = sin x, therefore ∫ sin x dx = –cos x.', 'Practice five linear-argument integrals (e.g., ∫ cos(5x) dx, ∫ sec(2x)tan(2x) dx) side-by-side, forcing the student to.', 'Re-attempt Diagnostic Questions 1, 3, and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_006', difficulty: 'standard',
          question: 'A first-order, first-degree differential equation of the form \\(\\frac{dy}{dx} =.',
          hint: 'If stuck on the substitution step, immediately review **c11_math_cbse_13_009** (Product.',
          misconception: '**Misconception:** "After substituting \\(y = vx\\), the derivative is \\(\\frac{dy}{dx} = v\\) (forgetting the product rule.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** The differential equation \\(\\frac{dy}{dx} = \\frac{x^2 + y^2}{xy}\\) is homogeneous.', answer: 'Because \\(F(x, y) = \\frac{x^2 + y^2}{xy}\\) satisfies \\(F(\\lambda x, \\lambda y) =',
                  options: ['Because \\(F(x, y) = \\frac{x^2 + y^2}{xy}\\) satisfies \\(F(\\lambda x, \\lambda y) =', 'we substitute to make it linear', 'we substitute to remove \\(y\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "After substituting \\(y = vx\\), the derivative is \\(\\frac{dy}{dx} = v\\) (forgetting the product rule term.' }
          ],
            remediations: { 'misconception-after-substituting-y-vx': { steps: ['**Revisit product rule differentiation:** Go to **c11_math_cbse_13_009** (Algebra of Derivatives: Sum, Difference,.', '**Re-do the substitution step slowly:** For a simple homogeneous DE (e.g., \\(\\frac{dy}{dx} = \\frac{y}{x}\\)), write \\(y.', 'Say aloud: "\\(v\\) is a function of \\(x\\), so I must use the product rule." 3.', '**Re-diagnostic:** Solve \\(\\frac{dy}{dx} = \\frac{x+y}{x-y}\\) from scratch, showing the product rule step.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
