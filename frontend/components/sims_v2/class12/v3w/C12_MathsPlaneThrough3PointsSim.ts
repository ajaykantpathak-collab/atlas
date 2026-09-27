import type { SimDef } from '../../engine/types';
import C12_MathsPlaneThrough3PointsSim from '../../../simulations/three/C12_MathsPlaneThrough3PointsSim';

/** v3 wrapped master — C12_MathsPlaneThrough3PointsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathsplanethrough3pointssim: SimDef = {
    id: 'v3w_c12_mathsplanethrough3pointssim',
    title: 'Plane Through3Points',
    subtitle: 'This node covers the derivation, interpretation, and conversion to normal form of a plane.',
    classLevel: 12, subject: 'mathematics', topic: 'Equation of a Plane in Normal Form',
    chapters: [],
    nodeIds: ['c12_math_cbse_11_006', 'c12_math_cbse_11_007', 'c12_math_cbse_11_009', 'c12_math_cbse_10_008', 'c12_math_cbse_11_003', 'c12_math_cbse_11_001', 'c12_math_cbse_11_002', 'c12_math_cbse_11_004', 'c12_math_cbse_11_008', 'c12_math_cbse_11_010', 'c12_math_cbse_10_003', 'c12_math_cbse_12_002', 'c12_math_cbse_12_003', 'c12_math_cbse_12_004', 'c12_math_cbse_12_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a kite flying at a height of 50 metres above a flat ground, with its string held at the origin.', goal: 'Master Plane Through3Points.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The normal form of a plane is the equation.', text: 'The normal form of a plane is the equation of a plane expressed in terms of a unit normal vector \\(\\hat{\\mathbf{n}} = (l, m, n)\\) (where \\(l, m, n\\) are direction cosines of the normal) and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_009', title: 'The angle between two planes is defined.',
          scaffold: { problem: 'A roof has two sloping sections. One section lies in the plane \\( 2x - y + 2z = 6 \\) and the other in the plane \\( 3x + 6y - 2z = 9 \\).',
            steps: [
            { text: 'Identify the coefficients of the Cartesian equations. For plane 1: \\( a_1=2, b_1=-1, c_1=2 \\).' },
            { text: 'Write the formula for the cosine of the angle between two planes: \\( \\cos \\theta = \\frac{|a_1a_2 + b_1b_2 +.' },
            { text: 'Compute the numerator: \\( |(2)(3) + (-1)(6) + (2)(-2)| = |6 - 6 - 4| = |-4| = 4 \\).' },
            { text: 'Compute the denominator: \\( \\sqrt{2^2+(-1)^2+2^2} = \\sqrt{4+1+4} = \\sqrt{9} = 3 \\); \\( \\sqrt{3^2+6^2+(-2)^2} =.' },
            { text: '\\( \\cos \\theta = \\frac{4}{21} \\approx 0.190476 \\). Then \\( \\theta = \\cos^{-1}(0.190476) \\approx 79.0^\\circ \\).', faded: true, blankAnswer: '\\( 79.0^\\circ \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_10_008', title: 'The vector equation of a line in.',
          scaffold: { problem: 'A drone takes off from a point A(2, -1, 3) on the school roof and flies in a straight line towards point B(5, 2, -1) on the water tank.',
            steps: [
            { text: 'Identify position vectors of A and B. **a = 2i - j + 3k**, **b = 5i + 2j - k**.' },
            { text: 'Write vector equation using point A and direction vector: **r = a + λ(b - a) = (2i - j + 3k) + λ(3i + 3j - 4k)**.' },
            { text: 'For λ = 2, substitute: **r = (2i - j + 3k) + 2(3i + 3j - 4k) = (2+6)i + (-1+6)j + (3-8)k = 8i + 5j - 5k**.' },
            { text: 'Distance from A = |λ| × |direction vector|. |direction| = √(3²+3²+(-4)²) = √(9+9+16) = √34.' },
            { text: 'Substitute λ = 7/√34 into **r** to get coordinates: **r = (2i - j + 3k) + (7/√34)(3i + 3j - 4k)** = (2 + 21/√34)i + (-1.', faded: true, blankAnswer: 'Vector equation: **r = (2i - j + 3k) + λ(3i + 3j - 4k)**..' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_001', title: 'Direction cosines of a line are the.',
          scaffold: { problem: 'A drone flies from point A(2, -1, 3) to point B(5, 2, -1). Find the direction cosines of its path.',
            steps: [
            { text: 'Identify coordinates: A(2, -1, 3), B(5, 2, -1).' },
            { text: 'Compute direction ratios: x₂-x₁ = 3, y₂-y₁ = 3, z₂-z₁ = -4.' },
            { text: 'Compute distance AB = √(3²+3²+(-4)²) = √(9+9+16) = √34.' },
            { text: 'Direction cosines: l = 3/√34, m = 3/√34, n = -4/√34.' },
            { text: 'Verify: l²+m²+n² = (9+9+16)/34 = 34/34 = 1.', faded: true, blankAnswer: 'Direction cosines are (3/√34, 3/√34, -4/√34).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_11_007', title: 'Identify each idea',
          dissect: { specimen: 'Plane Through3Points', spots: [
            { id: 's1', label: 'The normal form of a', prompt: 'Which idea is this? — The normal form of a plane is the equation of a plane expressed in terms of a unit normal.', answer: 'The normal form of a', options: ['The normal form of a', 'A plane in three-dimensional space', 'The angle between two planes', 'The vector equation of a'] },
            { id: 's2', label: 'A plane in three-dimensional space', prompt: 'Which idea is this? — A plane in three-dimensional space is uniquely determined if it passes through a given.', answer: 'A plane in three-dimensional space', options: ['A plane in three-dimensional space', 'The normal form of a', 'The angle between two planes', 'The vector equation of a'] },
            { id: 's3', label: 'The angle between two planes', prompt: 'Which idea is this? — The angle between two planes is defined as the acute angle between their normal vectors.', answer: 'The angle between two planes', options: ['The angle between two planes', 'The normal form of a', 'A plane in three-dimensional space', 'The vector equation of a'] },
            { id: 's4', label: 'The vector equation of a', prompt: 'Which idea is this? — The vector equation of a line in three-dimensional space is given by **r = a + λ b**,.', answer: 'The vector equation of a', options: ['The vector equation of a', 'The normal form of a', 'A plane in three-dimensional space', 'The angle between two planes'] },
            { id: 's5', label: 'The angle between two lines', prompt: 'Which idea is this? — The angle between two lines in three-dimensional space is defined as the acute angle.', answer: 'The angle between two lines', options: ['The angle between two lines', 'The normal form of a', 'A plane in three-dimensional space', 'The angle between two planes'] },
            { id: 's6', label: 'Direction cosines of a line', prompt: 'Which idea is this? — Direction cosines of a line are the cosines of the angles made by the line with the.', answer: 'Direction cosines of a line', options: ['Direction cosines of a line', 'The normal form of a', 'A plane in three-dimensional space', 'The angle between two planes'] }
          ] } }
    ],
    explore: { component: C12_MathsPlaneThrough3PointsSim, prompt: 'Explore the interactive — Plane Through3Points' },
    challenges: [
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
                  options: ['A plane in three-dimensional space is uniquely determined if it passes through a given', 'The normal form of a plane is the equation of a plane expressed in terms of a unit normal', 'The angle between two planes is defined as the acute angle between their normal vectors', 'The vector equation of a line in three-dimensional space is given by **r = a + λ b**,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.' }
          ],
            remediations: { 'students-frequently-confuse-the-normal': { steps: ['If a student makes the sign error in the Cartesian form, have them explicitly write the substitution step: \\(x - x_1 =.', 'Then multiply by \\(A, B, C\\).', 'For the normal vector confusion, ask: "Does the given vector lie *in* the plane or stand *perpendicular* to it?" If.', 'If it lies in the plane, we need another vector to compute the normal via cross product.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_009', difficulty: 'standard',
          question: 'The angle between two planes is defined as the acute angle between their normal.',
          hint: 'Revisit c12_math_cbse_11_006 to practice identifying normal vectors from plane equations,.',
          misconception: 'Students often confuse the angle between planes with the angle between their normal vectors without the absolute value.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two planes is defined as the acute angle between their normal vectors',
                  options: ['The angle between two planes is defined as the acute angle between their normal vectors', 'The normal form of a plane is the equation of a plane expressed in terms of a unit normal', 'A plane in three-dimensional space is uniquely determined if it passes through a given', 'The vector equation of a line in three-dimensional space is given by **r = a + λ b**,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the angle between planes with the angle between their normal vectors without the absolute value.' }
          ],
            remediations: { 'students-often-confuse-the-angle': { steps: ['If a student forgets the absolute value, have them draw two intersecting planes and their normals: show that the.', 'Make them write the definition: "Angle between planes = acute angle between normals".', 'For normal vector confusion, revisit c12_math_cbse_11_006 (Equation of a Plane in Normal Form) and c12_math_cbse_11_007.', 'For perpendicular condition errors, give a targeted drill: "Write the condition for perpendicular planes in words: \'Sum.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_008', difficulty: 'standard',
          question: 'The vector equation of a line in three-dimensional space is given by **r = a +.',
          hint: 'Revisit c12_math_cbse_10_003 (vector addition) and c12_math_cbse_10_007 (section formula).',
          misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: L₁: **r = (i + 2j + 3k) + λ(2i + 3j + 4k)** and L₂: **r = (2i + 4j + 5k) + μ(4i + 6j + 8k)**.', answer: 'The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**',
                  options: ['The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**', 'intersecting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to subtract the.' }
          ],
            remediations: { 'students-often-write-the-cartesian': { steps: ['If a student makes the above error, have them: (1) Plot the point (x₁, y₁, z₁) and the origin on a 3D sketch.', '(2) Show that the vector from origin to a general point on the line is **a + λb**, not **λb**.', '(3) Derive Cartesian by equating components: x = x₁ + λa ⇒ λ = (x - x₁)/a.', '(4) Practice 5 conversions where the point is not the origin, e.g., through (2, -1, 3) parallel to (1, 2, -2).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: L₁: **r = (i + 2j + 3k) + λ(2i + 3j + 4k)** and L₂: **r = (2i + 4j + 5k) + μ(4i + 6j + 8k)**.', answer: 'The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**',
                  options: ['The direction vectors are **b₁ = 2i + 3j + 4k** and **b₂ = 4i + 6j + 8k = 2b₁**', 'intersecting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Cartesian form as **x/1 = y/2 = z/(-2)** directly from **r = λ(i + 2j - 2k)**, forgetting to subtract the.' }
          ],
            remediations: { 'students-often-write-the-cartesian': { steps: ['If a student makes the above error, have them: (1) Plot the point (x₁, y₁, z₁) and the origin on a 3D sketch.', '(2) Show that the vector from origin to a general point on the line is **a + λb**, not **λb**.', '(3) Derive Cartesian by equating components: x = x₁ + λa ⇒ λ = (x - x₁)/a.', '(4) Practice 5 conversions where the point is not the origin, e.g., through (2, -1, 3) parallel to (1, 2, -2).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_003', difficulty: 'standard',
          question: 'The angle between two lines in three-dimensional space is defined as the acute.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (direction cosines/ratios) and.',
          misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two lines in three-dimensional space is defined as the acute angle',
                  options: ['The angle between two lines in three-dimensional space is defined as the acute angle', 'The normal form of a plane is the equation of a plane expressed in terms of a unit normal', 'A plane in three-dimensional space is uniquely determined if it passes through a given', 'The angle between two planes is defined as the acute angle between their normal vectors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta =.' }
          ],
            remediations: { 'misconception-the-angle-between-two': { steps: ['If a student forgets the absolute value, have them draw two lines in 2D with slopes \\(m_1=1\\) (45°) and \\(m_2=-1\\).', 'The angle between them is 90°, but the dot product of direction vectors \\((1,1)\\) and \\((1,-1)\\) is 0, giving.', 'Then take \\((1,1)\\) and \\((-1,-1)\\) (same line, opposite direction): dot product = -2, magnitudes \\(\\sqrt{2}\\) each,.', 'This visual demonstration forces the absolute value.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_001', difficulty: 'standard',
          question: 'Direction cosines of a line are the cosines of the angles made by the line with.',
          hint: 'Review 3D coordinates (c11_math_cbse_12_001) and 3D distance formula.',
          misconception: 'Students often confuse direction ratios with direction cosines.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Direction cosines of a line are the cosines of the angles made by the line with the',
                  options: ['Direction cosines of a line are the cosines of the angles made by the line with the', 'The normal form of a plane is the equation of a plane expressed in terms of a unit normal', 'A plane in three-dimensional space is uniquely determined if it passes through a given', 'The angle between two planes is defined as the acute angle between their normal vectors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse direction ratios with direction cosines.' }
          ],
            remediations: { 'students-often-confuse-direction-ratios': { steps: ['If a student makes this error, have them first compute the magnitude of the direction ratios vector √(a²+b²+c²).', 'Then divide each component by that magnitude to get the direction cosines.', 'Emphasize that direction cosines are the components of a unit vector along the line.', 'Practice with multiple examples where they compute both direction ratios and direction cosines for the same line, and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
