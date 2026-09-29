import type { SimDef } from '../../engine/types';
import C12_AppliedMathsMatricesConceptNotationSim from '../../../simulations/c6_12/C12_AppliedMathsMatricesConceptNotationSim';

/** v3 wrapped master — C12_AppliedMathsMatricesConceptNotationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsmatricesconceptnotationsim: SimDef = {
    id: 'v3w_c12_appliedmathsmatricesconceptnotationsim',
    title: 'Matrix: Definition and Types',
    subtitle: 'This node covers the definition of a matrix, order of a matrix, notation a_ij, and the.',
    classLevel: 12, subject: 'science', topic: 'Matrix: Definition and Types',
    chapters: [],
    nodeIds: ['c12_math_cbse_03_001', 'c12_math_cbse_03_010', 'c12_math_cbse_04_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the class monitor and need to record the marks of 40 students in 5 subjects.', goal: 'Master Matrix: Definition and Types.' },
    discovery: {
        question: 'A student writes: "The matrix B = [5] is a row matrix because it has one row." Is this correct? Explain why or why not.',
        options: ['The statement is incorrect', 'only a row matrix', 'the first subscript is column and the second is row (i'],
        answer: 'The statement is incorrect',
        hook: 'Students confuse the notation a_ij: they think the first subscript is column and the second is row (i.e., a_ij =.',
    },
    teaching: [
        { title: 'A matrix is an ordered rectangular array of.', text: 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and columns, denoted by a capital letter. The individual items are called elements or entries.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_010', title: 'Elementary transformations (or.',
          scaffold: { problem: 'A small factory in Pune produces three products (P₁, P₂, P₃) using three raw materials (R₁, R₂, R₃).',
            steps: [
            { text: 'Identify the operations in order: (i) Swap product order so P₃ is first → this is R₁ ↔ R₃.' },
            { text: 'Start with M = [[2, 3, 1], [1, 2, 2], [3, 1, 3]]. Apply R₁ ↔ R₃: new matrix = [[3, 1, 3], [1, 2, 2], [2, 3, 1]].' },
            { text: 'Apply R₂ → 2R₂: multiply second row by 2 → [[3, 1, 3], [2, 4, 4], [2, 3, 1]].' },
            { text: 'Apply R₃ → R₃ - 2R₁: new R₃ = [2,3,1] - 2×[3,1,3] = [2-6, 3-2, 1-6] = [-4, 1, -5].' },
            { text: 'Verify each operation was applied to the current matrix, not the original.', faded: true, blankAnswer: 'Final matrix = [[3, 1, 3], [2, 4, 4], [-4, 1, -5]]' }
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
        { type: 'dissect', nodeId: 'c12_math_cbse_03_010', title: 'Identify each idea',
          dissect: { specimen: 'Matrix: Definition and Types', spots: [
            { id: 's1', label: 'A matrix is an ordered', prompt: 'Which idea is this? — A matrix is an ordered rectangular array of numbers or functions arranged in rows and.', answer: 'A matrix is an ordered', options: ['A matrix is an ordered', 'Elementary transformations or elementary operations', 'A determinant is a scalar'] },
            { id: 's2', label: 'Elementary transformations or elementary operations', prompt: 'Which idea is this? — Elementary transformations (or elementary operations) of a matrix are three specific.', answer: 'Elementary transformations or elementary operations', options: ['Elementary transformations or elementary operations', 'A matrix is an ordered', 'A determinant is a scalar'] },
            { id: 's3', label: 'A determinant is a scalar', prompt: 'Which idea is this? — A determinant is a scalar value (real or complex) associated uniquely with every square.', answer: 'A determinant is a scalar', options: ['A determinant is a scalar', 'A matrix is an ordered', 'Elementary transformations or elementary operations'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsMatricesConceptNotationSim, prompt: 'Explore the interactive — Matrix: Definition and Types' },
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
            remediations: { 'students-treat-a-as-the': { steps: ['If the student confuses |A| with modulus or applies the formula to non-square matrices: 1.', 'Revisit the definition: "Only square matrices have determinants" — have the student list 5 matrices (mix of square and.', 'For sign errors in 2×2: drill the formula |A| = a₁₁a₂₂ − a₂₁a₁₂ with 10 varied examples, emphasizing "product of main.', 'For 3×3 cofactor signs: draw the 3×3 sign matrix | + − + | | − + − | | + − + | and have the student expand the same.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
