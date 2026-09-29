import type { SimDef } from '../../engine/types';
import C12_MathematicsTypesVectorsequalSim from '../../../simulations/c6_12/C12_MathematicsTypesVectorsequalSim';

/** v3 wrapped master — C12_MathematicsTypesVectorsequalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicstypesvectorsequalsim: SimDef = {
    id: 'v3w_c12_mathematicstypesvectorsequalsim',
    title: 'Vectors: Definition and Types',
    subtitle: 'This node covers: definition of vector, directed line segment, magnitude, and the six.',
    classLevel: 12, subject: 'mathematics', topic: 'Vectors: Definition and Types',
    chapters: [],
    nodeIds: ['c12_math_cbse_10_001', 'c12_math_cbse_03_001', 'c12_math_cbse_03_002', 'c12_math_cbse_10_002', 'c12_math_cbse_10_003', 'c12_math_cbse_10_004', 'c12_math_cbse_10_005', 'c12_math_cbse_10_006', 'c12_math_cbse_10_007', 'c12_math_cbse_10_008', 'c12_math_cbse_05_012', 'c12_math_cbse_04_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a cricket bowler running up to deliver the ball. The scoreboard shows his speed: 140 km/h — that\'s a.', goal: 'Master Vectors: Definition and Types.' },
    discovery: {
        question: 'Two vectors **a** and **b** are drawn in a plane. **a** starts at (1,2) and ends at (4,6). **b** starts at (-2,-1) and ends at (1,3).',
        options: ['Yes, **a** and **b** are equal', 'No, because they start at different points', 'Yes, because both have magnitude 5'],
        answer: 'Yes, **a** and **b** are equal',
        hook: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
    },
    teaching: [
        { title: 'A vector is a quantity that possesses both.', text: 'A vector is a quantity that possesses both magnitude (a non-negative real number representing length or size) and direction (orientation in space).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_001', title: 'A vector is a quantity that possesses.',
          scaffold: { problem: 'A hiker walks 3 km due east from base camp to a waterfall, then 4 km due north to a viewpoint.',
            steps: [
            { text: 'Draw coordinate axes with base camp at origin O(0,0). East = +x, North = +y.' },
            { text: 'Vector **a** = displacement from O to A = directed line segment OA. Magnitude |**a**| = 3 km (scale: 3 cm).' },
            { text: '(i) **a** is a non-zero vector (magnitude 3 ≠ 0). It has definite direction (east).' },
            { text: '(ii) **a** is along x-axis, **b** is along y-axis. They are perpendicular, not parallel to the same line.' },
            { text: '(iii) Zero vector would occur if the hiker returned to a point and stayed there (e.g., displacement from viewpoint to.' },
            { text: '(iv) Unit vector in direction of **a** = **â** = **a**/|**a**|.', faded: true, blankAnswer: '(i) **a** is a non-zero, non-unit free vector. (ii) **a**.' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_002', title: 'A matrix is classified by its shape: a.',
          scaffold: { problem: 'A school library has 4 sections: Fiction, Science, History, Arts.',
            steps: [
            { text: 'Identify the data for Monday — four numbers (25, 18, 12, 30) corresponding to 4 sections.' },
            { text: 'Write Monday\'s row matrix: M = [25 18 12 30]. Order = 1 × 4.' },
            { text: 'Identify the data for Tuesday — four numbers (22, 20, 15, 28).' },
            { text: 'Write Tuesday\'s column matrix: T = [[22], [20], [15], [28]]. Order = 4 × 1.' },
            { text: 'Verify: M has 1 row, 4 columns → row matrix. T has 4 rows, 1 column → column matrix.', faded: true, blankAnswer: 'Monday: M = [25 18 12 30], order 1 × 4 (row matrix)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_002', title: 'The position vector of a point P(x, y,.',
          scaffold: { problem: 'A drone takes off from a warehouse at the origin O(0, 0, 0) and hovers at point P.',
            steps: [
            { text: 'Identify given data. Coordinates of P: x = 12, y = -4, z = 3. Scale: 1 unit = 10 m.' },
            { text: 'Compute the magnitude (distance from origin). \\(r = |\\vec{OP}| = \\sqrt{x^2 + y^2 + z^2} = \\sqrt{12^2 + (-4)^2 + 3^2} =.' },
            { text: 'Find direction cosines using \\(l = \\frac{x}{r}, m = \\frac{y}{r}, n = \\frac{z}{r}\\).' },
            { text: 'Find direction angles. \\(\\alpha = \\cos^{-1}(l) = \\cos^{-1}(12/13) \\approx 22.6^\\circ\\), \\(\\beta = \\cos^{-1}(m) =.' },
            { text: 'Interpret results. The drone is 130 m from the warehouse. Its position vector points mostly along +x (acute angle),.', faded: true, blankAnswer: '(i) \\(\\vec{OP} = 12\\hat{i} - 4\\hat{j} + 3\\hat{k}\\) (ii) 130.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_003', title: 'The triangle law of vector addition.',
          scaffold: { problem: 'A man walks 3 km due east, then 4 km due north. Find his resultant displacement from the starting point using the triangle law.',
            steps: [
            { text: 'Identify the two displacement vectors: \\(\\vec{OA} = 3\\,\\text{km}\\) east, \\(\\vec{AB} = 4\\,\\text{km}\\) north.' },
            { text: 'Apply triangle law: place tail of \\(\\vec{AB}\\) at head of \\(\\vec{OA}\\). The resultant \\(\\vec{OB}\\) is from O to B.' },
            { text: 'Use Pythagoras theorem (since angle is 90°): \\(|\\vec{OB}| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5\\,\\text{km}\\).' },
            { text: 'Find direction: \\(\\tan\\phi = \\frac{4}{3} \\Rightarrow \\phi = \\tan^{-1}(4/3) \\approx 53.1°\\) north of east.' },
            { text: 'Interpret: The man is 5 km away from start at an angle 53.1° north of east.', faded: true, blankAnswer: '5 km at 53.1° north of east.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_004', title: 'The scalar (dot) product of two.',
          scaffold: { problem: 'A drone flies from point A(2, -1, 3) to point B(5, 2, -1) in metres.',
            steps: [
            { text: 'Find the displacement vector \\(\\vec{d} = \\vec{B} - \\vec{A} = (5-2)\\hat{i} + (2-(-1))\\hat{j} + (-1-3)\\hat{k} = 3\\hat{i}.' },
            { text: 'Write the force vector \\(\\vec{F} = 4\\hat{i} - 3\\hat{j} + 2\\hat{k}\\) N.' },
            { text: 'Compute the dot product \\(\\vec{F} \\cdot \\vec{d} = (4)(3) + (-3)(3) + (2)(-4) = 12 - 9 - 8 = -5\\).' },
            { text: 'The work done is \\(-5\\) joules. The negative sign means the wind opposes the motion overall.' },
            { text: 'Verify units: N × m = J. The magnitude is small, consistent with the drone\'s small displacement.', faded: true, blankAnswer: '-5 J' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_03_001', title: 'Identify each idea',
          dissect: { specimen: 'Vectors: Definition and Types', spots: [
            { id: 's1', label: 'A vector is a quantity', prompt: 'Which idea is this? — A vector is a quantity that possesses both magnitude (a non-negative real number.', answer: 'A vector is a quantity', options: ['A vector is a quantity', 'A matrix is an ordered', 'A matrix is classified by', 'The position vector of a'] },
            { id: 's2', label: 'A matrix is an ordered', prompt: 'Which idea is this? — A matrix is an ordered rectangular array of numbers or functions arranged in rows and.', answer: 'A matrix is an ordered', options: ['A matrix is an ordered', 'A vector is a quantity', 'A matrix is classified by', 'The position vector of a'] },
            { id: 's3', label: 'A matrix is classified by', prompt: 'Which idea is this? — A matrix is classified by its shape: a **row matrix** has exactly one row (order 1 × n),.', answer: 'A matrix is classified by', options: ['A matrix is classified by', 'A vector is a quantity', 'A matrix is an ordered', 'The position vector of a'] },
            { id: 's4', label: 'The position vector of a', prompt: 'Which idea is this? — The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0) is the.', answer: 'The position vector of a', options: ['The position vector of a', 'A vector is a quantity', 'A matrix is an ordered', 'A matrix is classified by'] },
            { id: 's5', label: 'The triangle law of vector', prompt: 'Which idea is this? — The triangle law of vector addition states that if two vectors are represented as two.', answer: 'The triangle law of vector', options: ['The triangle law of vector', 'A vector is a quantity', 'A matrix is an ordered', 'A matrix is classified by'] },
            { id: 's6', label: 'The scalar dot product of', prompt: 'Which idea is this? — The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by.', answer: 'The scalar dot product of', options: ['The scalar dot product of', 'A vector is a quantity', 'A matrix is an ordered', 'A matrix is classified by'] }
          ] } }
    ],
    explore: { component: C12_MathematicsTypesVectorsequalSim, prompt: 'Explore the interactive — Vectors: Definition and Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_10_001', difficulty: 'standard',
          question: 'A vector is a quantity that possesses both magnitude (a non-negative real.',
          hint: 'If stuck, revisit c9_math_ch1_4 (distance formula derivation) and c11_math_cbse_12_002.',
          misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
          parts: [
                { id: 'a', prompt: 'Two vectors **a** and **b** are drawn in a plane. **a** starts at (1,2) and ends at (4,6). **b** starts at (-2,-1) and ends at (1,3).', answer: 'Yes, **a** and **b** are equal',
                  options: ['Yes, **a** and **b** are equal', 'No, because they start at different points', 'Yes, because both have magnitude 5'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' },
                { id: 'b', prompt: 'Draw a vector **v** of magnitude 6 cm making an angle of 30° with the positive x-axis.', answer: 'a unit vector in the direction of **v**, (',
                  options: ['a unit vector in the direction of **v**, (', 'unit vector', 'vector of unit length in same direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' }
          ],
            remediations: { 'if-two-vectors-have-the': { steps: ['If a student confuses equality with same magnitude only: Step 1 — Draw two vectors of length 5 cm on board: one.', 'Ask: "Are these equal?" Student says no.', 'Both have magnitude 5." Guide them to say: "Directions are different." Step 2 — Write definition: **a** = **b** ⇔.', 'Step 3 — Give practice: "Give an example of two vectors with same magnitude but not equal." For collinear.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Two vectors are equal if they have the same magnitude." Another student writes: "Two vectors are collinear if they have the same direction.".', answer: 'First statement is FALSE',
                  options: ['First statement is FALSE', 'If two vectors have the same magnitude, they are equal', 'coinitial', 'collinear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "If two vectors have the same magnitude, they are equal." This is wrong — equality requires BOTH magnitude AND.' }
          ],
            remediations: { 'if-two-vectors-have-the': { steps: ['If a student confuses equality with same magnitude only: Step 1 — Draw two vectors of length 5 cm on board: one.', 'Ask: "Are these equal?" Student says no.', 'Both have magnitude 5." Guide them to say: "Directions are different." Step 2 — Write definition: **a** = **b** ⇔.', 'Step 3 — Give practice: "Give an example of two vectors with same magnitude but not equal." For collinear.'] } } },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_03_002', difficulty: 'standard',
          question: 'A matrix is classified by its shape: a **row matrix** has exactly one row.',
          hint: 'If stuck on order or indices, revisit **c12_math_cbse_03_001** (Matrix: Definition and.',
          misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it.',
          parts: [
                { id: 'a', prompt: 'State the order and type of each matrix: (i) A = [2 −5 0 7], (ii) B = [[3], [−1], [4]], (iii) C = [[1, 2], [3, 4]], (iv) D = [[5, 0], [0, −2]].', answer: '(i) Order 1 × 4, row matrix',
                  options: ['(i) Order 1 × 4, row matrix', 'C is diagonal', 'square'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' },
                { id: 'b', prompt: 'A student writes: "Matrix M = [[0, 0], [0, 0]] is a diagonal matrix because all its diagonal elements are zero." Is this correct?', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'no, diagonal elements must be non-zero', 'square matrix'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' },
                { id: 'c', prompt: 'Construct a 3 × 3 diagonal matrix whose diagonal entries are the first three prime numbers.', answer: 'First three primes: 2, 3, 5',
                  options: ['First three primes: 2, 3, 5', 'diagonal entries', 'first column entries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' }
          ],
            remediations: { 'confusing-square-matrix-with-diagonal': { steps: ['Revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) — focus on the definition of order (m × n) and how.', 'Label positions (1,1), (1,2), (1,3), (2,1), etc.', 'Write "MUST BE ZERO" on all off-diagonal cells.', 'Take 5 random matrices from NCERT Exercise 3.1.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it.',
          parts: [
                { id: 'a', prompt: 'A JEE-style question: "Let A be a 3 × 3 diagonal matrix with diagonal entries 1, 2, 3.', answer: 'A = diag(1, 2, 3) = [[1,0,0],[0,2,0],[0,0,3]]',
                  options: ['A = diag(1, 2, 3) = [[1,0,0],[0,2,0],[0,0,3]]', 'B is diagonal because row operations preserve diagonal structure', 'square matrix', 'diagonal matrix'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Confusing "square matrix" with "diagonal matrix":** Students see a 2×2 matrix like [[1, 2], [3, 4]] and call it "diagonal" because it\'s.' }
          ],
            remediations: { 'confusing-square-matrix-with-diagonal': { steps: ['Revisit **c12_math_cbse_03_001** (Matrix: Definition and Types) — focus on the definition of order (m × n) and how.', 'Label positions (1,1), (1,2), (1,3), (2,1), etc.', 'Write "MUST BE ZERO" on all off-diagonal cells.', 'Take 5 random matrices from NCERT Exercise 3.1.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_002', difficulty: 'standard',
          question: 'The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0).',
          hint: 'If stuck, revisit c11_math_cbse_12_001 (3D coordinates) and c11_math_cbse_12_002 (3D.',
          misconception: 'Students confuse **direction ratios** with **direction cosines**.',
          parts: [
                { id: 'a', prompt: 'Find the position vector of a point P which is at a distance 13 units from the origin and has direction cosines \\(\\left(\\frac{3}{13}, \\frac{-4}{13},.', answer: 'Given \\(r = 13\\) and \\(l = \\frac{3}{13}, m = \\frac{-4}{13}, n = \\frac{12}{13}\\)',
                  options: ['Given \\(r = 13\\) and \\(l = \\frac{3}{13}, m = \\frac{-4}{13}, n = \\frac{12}{13}\\)', 'position vector', 'unit vector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' },
                { id: 'b', prompt: 'Two vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) have direction cosines \\((l_1, m_1, n_1)\\) and \\((l_2, m_2, n_2)\\) respectively.', answer: '(A)',
                  options: ['Correct answer: (A)', 'position vector of P', 'unit vector along OP'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' }
          ],
            remediations: { 'students-confuse-direction-ratios-with': { steps: ['If a student makes the above errors: 1.', '**Revisit c11_math_cbse_12_001** (Coordinates of a Point in 3D Space) — ensure they can plot points and identify.', '**Revisit c11_math_cbse_12_002** (Distance Between Two Points in 3D) — practice magnitude calculation.', '**Do this remedial drill**: Take vector \\(\\vec{v} = -2\\hat{i} + 3\\hat{j} - 6\\hat{k}\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse **direction ratios** with **direction cosines**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If a vector has direction ratios 1, 2, 2, then its direction cosines are \\(\\frac{1}{3}, \\frac{2}{3}, \\frac{2}{3}\\) because \\(1^2+2^2+2^2=9\\).', answer: 'The claim is NOT always correct',
                  options: ['The claim is NOT always correct', 'position vector of P', 'unit vector along OP'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' },
                { id: 'b', prompt: 'Construct a problem where a point P in 3D space has integer coordinates, its distance from the origin is an integer, and its direction cosines are all distinct.', answer: 'Example: P(2, 3, 6)',
                  options: ['Example: P(2, 3, 6)', 'position vector of P', 'unit vector along OP'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' },
                { id: 'c', prompt: 'Two vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) have direction cosines \\((l_1, m_1, n_1)\\) and \\((l_2, m_2, n_2)\\) respectively.', answer: '(A)',
                  options: ['Correct answer: (A)', 'position vector of P', 'unit vector along OP'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse **direction ratios** with **direction cosines**.' }
          ],
            remediations: { 'students-confuse-direction-ratios-with': { steps: ['If a student makes the above errors: 1.', '**Revisit c11_math_cbse_12_001** (Coordinates of a Point in 3D Space) — ensure they can plot points and identify.', '**Revisit c11_math_cbse_12_002** (Distance Between Two Points in 3D) — practice magnitude calculation.', '**Do this remedial drill**: Take vector \\(\\vec{v} = -2\\hat{i} + 3\\hat{j} - 6\\hat{k}\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_003', difficulty: 'standard',
          question: 'The triangle law of vector addition states that if two vectors are represented.',
          hint: 'Revisit c12_math_cbse_10_001 for vector definitions and c12_math_cbse_10_002 for position.',
          misconception: 'Students often place vectors tail-to-tail when applying the triangle law, effectively using the parallelogram.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The triangle law of vector addition states that if two vectors are represented as two',
                  options: ['The triangle law of vector addition states that if two vectors are represented as two', 'A vector is a quantity that possesses both magnitude (a non-negative real number', 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and', 'A matrix is classified by its shape: a **row matrix** has exactly one row (order 1 × n),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often place vectors tail-to-tail when applying the triangle law, effectively using the parallelogram construction but then taking.' }
          ],
            remediations: { 'students-often-place-vectors-tail': { steps: ['If a student makes the tail-to-tail error, have them physically act out the displacement: walk 3 steps forward, then 4.', 'For magnitude addition error, revisit c12_math_cbse_10_001 (vectors have direction) and c12_math_cbse_10_002 (position.', 'Practice drawing vectors head-to-tail for 5 different angle values and measure the resultant with a ruler to see it’s.', 'Re-do the cosine rule derivation from the triangle to reinforce the formula.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_004', difficulty: 'standard',
          question: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\),.',
          hint: 'If stuck, revisit c12_math_cbse_10_002 (position vector and direction cosines) and.',
          misconception: 'Students often think the dot product of two vectors is a vector, writing \\(\\vec{a} \\cdot \\vec{b} = (a_1b_1)\\hat{i} +.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by',
                  options: ['The scalar (dot) product of two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), denoted by', 'A vector is a quantity that possesses both magnitude (a non-negative real number', 'A matrix is an ordered rectangular array of numbers or functions arranged in rows and', 'A matrix is classified by its shape: a **row matrix** has exactly one row (order 1 × n),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the dot product of two vectors is a vector, writing \\(\\vec{a} \\cdot \\vec{b} = (a_1b_1)\\hat{i} + (a_2b_2)\\hat{j} +.' }
          ],
            remediations: { 'the-dot-product-of-two': { steps: ['If a student writes the dot product as a vector, immediately ask: "What is the result of multiplying a 1×3 row matrix.', 'The dot product is exactly that." Then re-derive the component form from the distributive property: \\(\\vec{a} \\cdot.', 'Since \\(\\hat{i}\\cdot\\hat{i}=1\\) and \\(\\hat{i}\\cdot\\hat{j}=0\\), only \\(a_1b_1+a_2b_2+a_3b_3\\) remains.', 'For the angle error, draw two vectors tail-to-tail, measure the angle, then translate one vector to head-to-head and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
