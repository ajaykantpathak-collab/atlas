import type { SimDef } from '../../engine/types';
import C12_MathematicsGeometryFormsPlaneSim from '../../../simulations/c6_12/C12_MathematicsGeometryFormsPlaneSim';

/** v3 wrapped master — C12_MathematicsGeometryFormsPlaneSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsgeometryformsplanesim: SimDef = {
    id: 'v3w_c12_mathematicsgeometryformsplanesim',
    title: 'Geometry Forms Plane',
    subtitle: 'This node covers only the shortest distance between two **skew lines** (non-parallel,.',
    classLevel: 12, subject: 'mathematics', topic: 'Shortest Distance Between Two Skew Lines',
    chapters: [],
    nodeIds: ['c12_math_cbse_11_004', 'c12_math_cbse_10_005', 'c12_math_cbse_10_007', 'c12_math_cbse_11_003', 'c12_math_cbse_11_006', 'c12_math_cbse_11_007', 'c12_math_cbse_11_008', 'c12_math_cbse_11_009', 'c12_math_cbse_11_010', 'c12_math_cbse_10_008', 'c12_math_cbse_04_004', 'c12_math_cbse_11_001', 'c12_math_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are an architect designing a modern building in Mumbai.', goal: 'Master Geometry Forms Plane.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The shortest distance between two skew lines.', text: 'The shortest distance between two skew lines in three-dimensional space is the length of the unique line segment that is perpendicular to both lines.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_004', title: 'The shortest distance between two skew.',
          scaffold: { problem: 'Two water pipelines in a housing society in Pune are laid along skew lines.',
            steps: [
            { text: 'Find direction vectors. For pipeline A: \\(\\vec{b_1} = \\vec{AB} = (4-1)\\hat{i} + (5-2)\\hat{j} + (6-3)\\hat{k} = 3\\hat{i}.' },
            { text: 'Check if lines are parallel. \\(\\vec{b_1} = \\vec{b_2}\\), so direction ratios are proportional → lines are parallel, not.' },
            { text: 'Choose position vectors: \\(\\vec{a_1} = \\vec{OA} = \\hat{i} + 2\\hat{j} + 3\\hat{k}\\); \\(\\vec{a_2} = \\vec{OC} = 2\\hat{i} +.' },
            { text: 'Compute \\(\\vec{b_1} \\times \\vec{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 3 & 3 \\\\ 3 & 3 & 4.' },
            { text: '\\(|\\vec{b_1} \\times \\vec{b_2}| = \\sqrt{3^2 + (-3)^2 + 0^2} = \\sqrt{18} = 3\\sqrt{2}\\).' },
            { text: '\\(\\vec{a_2} - \\vec{a_1} = (2-1)\\hat{i} + (3-2)\\hat{j} + (1-3)\\hat{k} = \\hat{i} + \\hat{j} - 2\\hat{k}\\).' },
            { text: '\\((\\vec{b_1} \\times \\vec{b_2}) \\cdot (\\vec{a_2} - \\vec{a_1}) = (3)(1) + (-3)(1) + (0)(-2) = 3 - 3 = 0\\).' },
            { text: '\\(d = \\frac{|0|}{3\\sqrt{2}} = 0\\). Distance zero means lines intersect! Check: Solve for intersection.', faded: true, blankAnswer: '\\(d = \\frac{1}{\\sqrt{2}} \\approx 0.707\\) metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_005', title: 'The vector (cross) product of two.',
          scaffold: { problem: 'A force **F** = (2**î** + 3**ĵ** − **k̂**) N acts at a point with position vector **r** = (**î** − 2**ĵ** + 4**k̂**) m relative to the.',
            steps: [
            { text: 'Identify given vectors in component form: **r** = 1**î** − 2**ĵ** + 4**k̂**, **F** = 2**î** + 3**ĵ** − 1**k̂**.' },
            { text: 'Set up the determinant for cross product: **τ** = det |**î** **ĵ** **k̂**; 1 −2 4; 2 3 −1|.' },
            { text: 'Expand using cofactor expansion (+ − + for first row): **τ** = **î**[ (−2)(−1) − (4)(3) ] − **ĵ**[ (1)(−1) − (4)(2) ] +.' },
            { text: 'Compute each component: **î**[2 − 12] = −10**î**; −**ĵ**[−1 − 8] = −**ĵ**(−9) = +9**ĵ**; **k̂**[3 + 4] = 7**k̂**.' },
            { text: 'Magnitude |**τ**| = √[(−10)² + 9² + 7²] = √(100+81+49) = √230 ≈ 15.17 N·m.', faded: true, blankAnswer: '**τ** = −10**î** + 9**ĵ** + 7**k̂** N·m; |**τ**| = √230 N·m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_007', title: 'The section formula for vectors gives.',
          scaffold: { problem: 'A drone flies from point P(3, -2, 5) to point Q(-1, 4, -3). It stops at a point R that divides the journey internally in the ratio 2:3.',
            steps: [
            { text: 'Write position vectors of P and Q. **a** = 3**i** - 2**j** + 5**k**, **b** = -**i** + 4**j** - 3**k**.' },
            { text: 'Identify the formula for internal division. **r** = (m**b** + n**a**)/(m+n) with m=2, n=3.' },
            { text: 'Substitute values. **r** = (2(-**i**+4**j**-3**k**) + 3(3**i**-2**j**+5**k**))/(2+3).' },
            { text: 'Simplify numerator: 2(-**i**+4**j**-3**k**) = -2**i**+8**j**-6**k**; 3(3**i**-2**j**+5**k**) = 9**i**-6**j**+15**k**.' },
            { text: 'Divide by 5. **r** = (7/5)**i** + (2/5)**j** + (9/5)**k**. Coordinates: (1.4, 0.4, 1.8).', faded: true, blankAnswer: 'Position vector = (7/5)**i** + (2/5)**j** + (9/5)**k**;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_003', title: 'The angle between two lines in.',
          scaffold: { problem: 'A telephone tower in Delhi is supported by two guy wires. One wire runs along the line \\(\\frac{x-10}{2} = \\frac{y-5}{-1} = \\frac{z}{3}\\).',
            steps: [
            { text: 'Identify that the angle between the wires is the angle between their direction vectors.' },
            { text: 'Write the formula for the cosine of the angle: \\(\\cos\\theta = \\frac{|a_1a_2 + b_1b_2 +.' },
            { text: 'Substitute the direction ratios: Numerator = \\(|2(1) + (-1)(2) + 3(-2)| = |2 - 2 - 6| = |-6| = 6\\).' },
            { text: 'Compute magnitudes: \\(\\sqrt{2^2+(-1)^2+3^2} = \\sqrt{4+1+9} = \\sqrt{14}\\); \\(\\sqrt{1^2+2^2+(-2)^2} = \\sqrt{1+4+4} =.' },
            { text: '\\(\\cos\\theta = \\frac{6}{\\sqrt{14} \\times 3} = \\frac{2}{\\sqrt{14}} = \\frac{2\\sqrt{14}}{14} = \\frac{\\sqrt{14}}{7}\\).', faded: true, blankAnswer: '\\(\\theta = \\cos^{-1}\\left(\\frac{\\sqrt{14}}{7}\\right).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_006', title: 'The normal form of a plane is the.',
          scaffold: { problem: 'A plane is at a distance of 7 units from the origin. The normal to the plane from the origin has direction ratios 3, -4, 12.',
            steps: [
            { text: 'The direction ratios of the normal are given as 3, -4, 12. To get the unit normal vector, we need the direction.' },
            { text: 'The direction cosines are \\(l = 3/13\\), \\(m = -4/13\\), \\(n = 12/13\\).' },
            { text: 'The perpendicular distance from the origin is given as \\(d = 7\\) units.' },
            { text: 'Write the vector form: \\(\\mathbf{r} \\cdot \\hat{\\mathbf{n}} = d\\) where \\(\\hat{\\mathbf{n}} = \\frac{3}{13}\\mathbf{i} -.' },
            { text: 'Write the Cartesian form by substituting \\(\\mathbf{r} = x\\mathbf{i}+y\\mathbf{j}+z\\mathbf{k}\\): \\(\\frac{3}{13}x -.', faded: true, blankAnswer: 'Vector form: \\(\\mathbf{r} \\cdot \\left(.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_007', title: 'A plane in three-dimensional space is.',
          scaffold: { problem: 'Find the vector and Cartesian equations of the plane passing through the point \\((2, -3, 1)\\) and perpendicular to the line with direction.',
            steps: [
            { text: 'Identify the given point \\((x_1, y_1, z_1) = (2, -3, 1)\\) and the normal vector direction ratios \\(A=4, B=-2, C=5\\).' },
            { text: 'Write the Cartesian form using \\(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\\).' },
            { text: 'Expand and simplify: \\(4x - 8 - 2y - 6 + 5z - 5 = 0 \\Rightarrow 4x - 2y + 5z - 19 = 0\\).' },
            { text: 'For the vector equation, write the normal vector \\(\\mathbf{n} = 4\\mathbf{i} - 2\\mathbf{j} + 5\\mathbf{k}\\) and point\'s.' },
            { text: 'The vector equation is \\(\\mathbf{r} \\cdot (4\\mathbf{i} - 2\\mathbf{j} + 5\\mathbf{k}) = 19\\).', faded: true, blankAnswer: 'Vector equation: \\(\\mathbf{r} \\cdot (4\\mathbf{i} -.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_10_005', title: 'Identify each idea',
          dissect: { specimen: 'Geometry Forms Plane', spots: [
            { id: 's1', label: 'The shortest distance between two', prompt: 'Which idea is this? — The shortest distance between two skew lines in three-dimensional space is the length of.', answer: 'The shortest distance between two', options: ['The shortest distance between two', 'The vector cross product of', 'The section formula for vectors', 'The angle between two lines'] },
            { id: 's2', label: 'The vector cross product of', prompt: 'Which idea is this? — The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×.', answer: 'The vector cross product of', options: ['The vector cross product of', 'The shortest distance between two', 'The section formula for vectors', 'The angle between two lines'] },
            { id: 's3', label: 'The section formula for vectors', prompt: 'Which idea is this? — The section formula for vectors gives the position vector of a point R that divides the.', answer: 'The section formula for vectors', options: ['The section formula for vectors', 'The shortest distance between two', 'The vector cross product of', 'The angle between two lines'] },
            { id: 's4', label: 'The angle between two lines', prompt: 'Which idea is this? — The angle between two lines in three-dimensional space is defined as the acute angle.', answer: 'The angle between two lines', options: ['The angle between two lines', 'The shortest distance between two', 'The vector cross product of', 'The section formula for vectors'] },
            { id: 's5', label: 'The normal form of a', prompt: 'Which idea is this? — The normal form of a plane is the equation of a plane expressed in terms of a unit normal.', answer: 'The normal form of a', options: ['The normal form of a', 'The shortest distance between two', 'The vector cross product of', 'The section formula for vectors'] },
            { id: 's6', label: 'A plane in three-dimensional space', prompt: 'Which idea is this? — A plane in three-dimensional space is uniquely determined if it passes through a given.', answer: 'A plane in three-dimensional space', options: ['A plane in three-dimensional space', 'The shortest distance between two', 'The vector cross product of', 'The section formula for vectors'] }
          ] } }
    ],
    explore: { component: C12_MathematicsGeometryFormsPlaneSim, prompt: 'Explore the interactive — Geometry Forms Plane' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_11_004', difficulty: 'standard',
          question: 'The shortest distance between two skew lines in three-dimensional space is the.',
          hint: 'If stuck, revisit vector algebra (cross product, scalar triple product) and practice.',
          misconception: 'Students often mistakenly use the formula for parallel lines \\(d = \\frac{|\\vec{b} \\times (\\vec{a_2} -.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The shortest distance between two skew lines in three-dimensional space is the length of',
                  options: ['The shortest distance between two skew lines in three-dimensional space is the length of', 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The section formula for vectors gives the position vector of a point R that divides the', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mistakenly use the formula for parallel lines \\(d = \\frac{|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|}{|\\vec{b}|}\\) for skew.' }
          ],
            remediations: { 'students-often-mistakenly-use-the': { steps: ['If a student makes the above errors: 1.', '**Revisit cross product**: Go to Class 11 Vector Algebra (not in provided nodes, but conceptually) or practice.', 'Use node c11_math_cbse_12_002 (distance in 3D) to recall vector operations.', '**Practice absolute value**: Solve 5 problems where the dot product yields negative; emphasize that distance =.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_005', difficulty: 'standard',
          question: 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by.',
          hint: 'If stuck, revisit 3×3 determinant expansion (Class 12 Determinants chapter) and the.',
          misconception: 'Students often write the cross product expansion as (a₂b₃ − a₃b₂)**î** + (a₁b₃ − a₃b₁)**ĵ** + (a₁b₂ − a₂b₁)**k̂** —.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×',
                  options: ['The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The shortest distance between two skew lines in three-dimensional space is the length of', 'The section formula for vectors gives the position vector of a point R that divides the', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the cross product expansion as (a₂b₃ − a₃b₂)**î** + (a₁b₃ − a₃b₁)**ĵ** + (a₁b₂ − a₂b₁)**k̂** — missing the **minus.' }
          ],
            remediations: { 'students-often-write-the-cross': { steps: ['If a student makes the sign error in the **ĵ** component, have them re-derive the 3×3 determinant expansion step by.', 'Explicitly write: **î**(a₂b₃) + **ĵ**(a₃b₁) + **k̂**(a₁b₂) − **î**(a₃b₂) − **ĵ**(a₁b₃) − **k̂**(a₂b₁), then group by.', 'For order confusion, practice the right-hand rule physically: fingers from **a** to **b**, thumb gives **a** × **b**.', 'Drill 5 problems where they must state the direction before computing.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_007', difficulty: 'standard',
          question: 'The section formula for vectors gives the position vector of a point R that.',
          hint: 'If stuck, revisit c12_math_cbse_10_002 (position vectors) and c12_math_cbse_10_003.',
          misconception: 'Students consistently write the external division formula as **r** = (m**a** - n**b**)/(m-n) instead of **r** = (m**b**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The section formula for vectors gives the position vector of a point R that divides the',
                  options: ['The section formula for vectors gives the position vector of a point R that divides the', 'The shortest distance between two skew lines in three-dimensional space is the length of', 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The angle between two lines in three-dimensional space is defined as the acute angle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the external division formula as **r** = (m**a** - n**b**)/(m-n) instead of **r** = (m**b** - n**a**)/(m-n),.' }
          ],
            remediations: { 'students-consistently-write-the-external': { steps: ['Revisit the derivation in NCERT Section 10.5.3 (Case II): draw the directed line OP, OQ, OR.', 'Write vector equations: **r** = **a** + **PR**, **b** = **a** + **PQ**.', 'For external division PR:RQ = m:n, so **PR** = (m/(m-n))**PQ**.', 'Substitute **PQ** = **b** - **a** to get **r** = **a** + (m/(m-n))(**b** - **a**) = (m**b** - n**a**)/(m-n).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_003', difficulty: 'standard',
          question: 'The angle between two lines in three-dimensional space is defined as the acute.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (direction cosines/ratios) and.',
          misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two lines in three-dimensional space is defined as the acute angle',
                  options: ['The angle between two lines in three-dimensional space is defined as the acute angle', 'The shortest distance between two skew lines in three-dimensional space is the length of', 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The section formula for vectors gives the position vector of a point R that divides the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta =.' }
          ],
            remediations: { 'misconception-the-angle-between-two': { steps: ['If a student forgets the absolute value, have them draw two lines in 2D with slopes \\(m_1=1\\) (45°) and \\(m_2=-1\\).', 'The angle between them is 90°, but the dot product of direction vectors \\((1,1)\\) and \\((1,-1)\\) is 0, giving.', 'Then take \\((1,1)\\) and \\((-1,-1)\\) (same line, opposite direction): dot product = -2, magnitudes \\(\\sqrt{2}\\) each,.', 'This visual demonstration forces the absolute value.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_006', difficulty: 'standard',
          question: 'The normal form of a plane is the equation of a plane expressed in terms of a.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) and.',
          misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).',
          parts: [
                { id: 'a', prompt: 'Convert the plane equation \\(2x - 3y + 6z - 14 = 0\\) to normal form and state the perpendicular distance from the origin and the direction cosines of the unit.', answer: 'Given: \\(2x - 3y + 6z - 14 = 0\\) → \\(2x - 3y + 6z = 14\\)',
                  options: ['Given: \\(2x - 3y + 6z - 14 = 0\\) → \\(2x - 3y + 6z = 14\\)', 'any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).' },
                { id: 'b', prompt: 'A plane has normal form \\(\\frac{1}{3}x - \\frac{2}{3}y - \\frac{2}{3}z = 4\\). Another plane has equation \\(2x - 4y - 4z = 24\\). Are they the same plane?', answer: 'Yes, they represent the same plane',
                  options: ['Yes, they represent the same plane', 'any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).' }
          ],
            remediations: { 'any-equation-of-the-form': { steps: ['If a student makes the sign error, have them re-derive the normal form from the geometric definition: the plane is the.', 'Write the general equation as \\(\\mathbf{r} \\cdot \\mathbf{n} = -D\\) where \\(\\mathbf{n}=(A,B,C)\\).', 'Then \\(\\mathbf{r} \\cdot \\frac{\\mathbf{n}}{|\\mathbf{n}|} = \\frac{-D}{|\\mathbf{n}|}\\).', 'For the right side to be the positive distance \\(d\\), we need \\(\\frac{-D}{|\\mathbf{n}|} \\ge 0\\), so we must choose the.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).',
          parts: [
                { id: 'a', prompt: 'A student converts \\(x + 2y - 2z + 3 = 0\\) to normal form and writes: \\(\\frac{1}{3}x + \\frac{2}{3}y - \\frac{2}{3}z = 1\\). Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).' },
                { id: 'b', prompt: 'A plane has normal form \\(\\frac{1}{3}x - \\frac{2}{3}y - \\frac{2}{3}z = 4\\). Another plane has equation \\(2x - 4y - 4z = 24\\). Are they the same plane?', answer: 'Yes, they represent the same plane',
                  options: ['Yes, they represent the same plane', 'any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any equation of the form \\(Ax+By+Cz=D\\) is in normal form if \\(D>0\\).' }
          ],
            remediations: { 'any-equation-of-the-form': { steps: ['If a student makes the sign error, have them re-derive the normal form from the geometric definition: the plane is the.', 'Write the general equation as \\(\\mathbf{r} \\cdot \\mathbf{n} = -D\\) where \\(\\mathbf{n}=(A,B,C)\\).', 'Then \\(\\mathbf{r} \\cdot \\frac{\\mathbf{n}}{|\\mathbf{n}|} = \\frac{-D}{|\\mathbf{n}|}\\).', 'For the right side to be the positive distance \\(d\\), we need \\(\\frac{-D}{|\\mathbf{n}|} \\ge 0\\), so we must choose the.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_007', difficulty: 'standard',
          question: 'A plane in three-dimensional space is uniquely determined if it passes through.',
          hint: 'Review vector dot product and the derivation of the normal form of a plane.',
          misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A plane in three-dimensional space is uniquely determined if it passes through a given',
                  options: ['A plane in three-dimensional space is uniquely determined if it passes through a given', 'The shortest distance between two skew lines in three-dimensional space is the length of', 'The vector (cross) product of two non-zero vectors **a** and **b**, denoted by **a** ×', 'The section formula for vectors gives the position vector of a point R that divides the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.' }
          ],
            remediations: { 'students-frequently-confuse-the-normal': { steps: ['If a student makes the sign error in the Cartesian form, have them explicitly write the substitution step: \\(x - x_1 =.', 'Then multiply by \\(A, B, C\\).', 'For the normal vector confusion, ask: "Does the given vector lie *in* the plane or stand *perpendicular* to it?" If.', 'If it lies in the plane, we need another vector to compute the normal via cross product.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
