import type { SimDef } from '../../engine/types';
import C12_MathsLinesPlanesSpaceSim from '../../../simulations/three/C12_MathsLinesPlanesSpaceSim';

/** v3 wrapped master — C12_MathsLinesPlanesSpaceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathslinesplanesspacesim: SimDef = {
    id: 'v3w_c12_mathslinesplanesspacesim',
    title: 'Lines Planes Space',
    subtitle: 'This node covers the derivation and application of vector and Cartesian equations of a.',
    classLevel: 12, subject: 'mathematics', topic: 'Equation of a Line in 3D Space',
    chapters: [],
    nodeIds: ['c12_math_cbse_11_002', 'c12_math_cbse_11_003', 'c12_math_cbse_11_004', 'c12_math_cbse_11_007', 'c12_math_cbse_11_008', 'c12_math_cbse_11_009', 'c12_math_cbse_11_010', 'c12_math_cbse_11_005', 'c12_math_cbse_11_006', 'c12_math_cbse_10_001', 'c12_math_cbse_10_002', 'c12_math_cbse_10_008', 'c12_math_cbse_11_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a drone flying from your school rooftop (point A) in a fixed direction (vector \\(\\vec{b}\\)) — its.', goal: 'Master Lines Planes Space.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The equation of a line in 3D space describes.', text: 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on a straight line.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_002', title: 'The equation of a line in 3D space.',
          scaffold: { problem: '** A telephone wire is stretched between two poles. The base of the first pole is at \\(A(10, 5, 0)\\) metres and the base of the second pole.',
            steps: [
            { text: 'Coordinates of attachment points: \\(A\'(10, 5, 8)\\) and \\(B\'(25, -3, 6)\\) (adding z-coordinates for height).' },
            { text: 'Direction vector \\(\\overrightarrow{A\'B\'} = (25-10)\\hat{i} + (-3-5)\\hat{j} + (6-8)\\hat{k} = 15\\hat{i} - 8\\hat{j} -.' },
            { text: 'Vector equation using point A\': \\(\\vec{r} = (10\\hat{i} + 5\\hat{j} + 8\\hat{k}) + \\lambda(15\\hat{i} - 8\\hat{j} -.' },
            { text: 'For the bird, x-coordinate = 16. From parametric: \\(x = 10 + 15\\lambda = 16 \\Rightarrow 15\\lambda = 6 \\Rightarrow.' },
            { text: 'Find z-coordinate (height): \\(z = 8 + (-2)\\lambda = 8 - 2 \\times 0.4 = 8 - 0.8 = 7.2\\) m.', faded: true, blankAnswer: '** Vector equation: \\(\\vec{r} = (10\\hat{i} + 5\\hat{j} +.' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_007', title: 'A plane in three-dimensional space is.',
          scaffold: { problem: 'Find the vector and Cartesian equations of the plane passing through the point \\((2, -3, 1)\\) and perpendicular to the line with direction.',
            steps: [
            { text: 'Identify the given point \\((x_1, y_1, z_1) = (2, -3, 1)\\) and the normal vector direction ratios \\(A=4, B=-2, C=5\\).' },
            { text: 'Write the Cartesian form using \\(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\\).' },
            { text: 'Expand and simplify: \\(4x - 8 - 2y - 6 + 5z - 5 = 0 \\Rightarrow 4x - 2y + 5z - 19 = 0\\).' },
            { text: 'For the vector equation, write the normal vector \\(\\mathbf{n} = 4\\mathbf{i} - 2\\mathbf{j} + 5\\mathbf{k}\\) and point\'s.' },
            { text: 'The vector equation is \\(\\mathbf{r} \\cdot (4\\mathbf{i} - 2\\mathbf{j} + 5\\mathbf{k}) = 19\\).', faded: true, blankAnswer: 'Vector equation: \\(\\mathbf{r} \\cdot (4\\mathbf{i} -.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_11_008', title: 'The distance of a point \\( P(x_1, y_1,.',
          scaffold: { problem: 'A drone is flying at coordinates (3, -2, 5) in a coordinate system where the ground is the plane 2x - y + 2z = 10.',
            steps: [
            { text: 'Write the plane equation in standard form: 2x - y + 2z - 10 = 0. Identify A=2, B=-1, C=2, D=-10.' },
            { text: 'Substitute the drone\'s coordinates into the numerator: |2(3) + (-1)(-2) + 2(5) - 10| = |6 + 2 + 10 - 10| = |8| = 8.' },
            { text: 'Compute the denominator: sqrt(2^2 + (-1)^2 + 2^2) = sqrt(4 + 1 + 4) = sqrt(9) = 3.' },
            { text: 'Distance = 8/3 units.' },
            { text: 'Interpret: The drone is 8/3 metres (or units) perpendicularly above the sloping ground.', faded: true, blankAnswer: '8/3 units' }
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
        { type: 'dissect', nodeId: 'c12_math_cbse_11_003', title: 'Identify each idea',
          dissect: { specimen: 'Lines Planes Space', spots: [
            { id: 's1', label: 'The equation of a line', prompt: 'Which idea is this? — The equation of a line in 3D space describes the set of all points (x, y, z) that lie on.', answer: 'The equation of a line', options: ['The equation of a line', 'The angle between two lines', 'The shortest distance between two', 'A plane in three-dimensional space'] },
            { id: 's2', label: 'The angle between two lines', prompt: 'Which idea is this? — The angle between two lines in three-dimensional space is defined as the acute angle.', answer: 'The angle between two lines', options: ['The angle between two lines', 'The equation of a line', 'The shortest distance between two', 'A plane in three-dimensional space'] },
            { id: 's3', label: 'The shortest distance between two', prompt: 'Which idea is this? — The shortest distance between two skew lines in three-dimensional space is the length of.', answer: 'The shortest distance between two', options: ['The shortest distance between two', 'The equation of a line', 'The angle between two lines', 'A plane in three-dimensional space'] },
            { id: 's4', label: 'A plane in three-dimensional space', prompt: 'Which idea is this? — A plane in three-dimensional space is uniquely determined if it passes through a given.', answer: 'A plane in three-dimensional space', options: ['A plane in three-dimensional space', 'The equation of a line', 'The angle between two lines', 'The shortest distance between two'] },
            { id: 's5', label: 'The distance of a point', prompt: 'Which idea is this? — The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz + D = 0 \\) is.', answer: 'The distance of a point', options: ['The distance of a point', 'The equation of a line', 'The angle between two lines', 'The shortest distance between two'] },
            { id: 's6', label: 'The angle between two planes', prompt: 'Which idea is this? — The angle between two planes is defined as the acute angle between their normal vectors.', answer: 'The angle between two planes', options: ['The angle between two planes', 'The equation of a line', 'The angle between two lines', 'The shortest distance between two'] }
          ] } }
    ],
    explore: { component: C12_MathsLinesPlanesSpaceSim, prompt: 'Explore the interactive — Lines Planes Space' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_11_002', difficulty: 'standard',
          question: 'The equation of a line in 3D space describes the set of all points (x, y, z).',
          hint: 'Revisit **c11_math_cbse_12_003** (Section Formula in 3D) to practice vector subtraction.',
          misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y -.',
          parts: [
                { id: 'a', prompt: 'The Cartesian equation of a line is \\(\\frac{x - 1}{3} = \\frac{y + 2}{-4} = \\frac{z - 5}{2}\\).', answer: '**Answer:** Yes, the student is correct',
                  options: ['**Answer:** Yes, the student is correct', '\\(y_1 = 2\\) instead of \\(-2\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z -.' },
                { id: 'b', prompt: 'Two lines are given: \\(L_1: \\frac{x - 2}{1} = \\frac{y + 3}{2} = \\frac{z - 1}{-2}\\) and \\(L_2: \\vec{r} = (4\\hat{i} - \\hat{j} + 3\\hat{k}) + \\mu(2\\hat{i} +.', answer: '**Answer:** Yes, \\(L_1\\) and \\(L_2\\) are parallel',
                  options: ['**Answer:** Yes, \\(L_1\\) and \\(L_2\\) are parallel', 'not parallel because the numbers are different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z -.' }
          ],
            remediations: { 'sign-errors-in-cartesian-form': { steps: ['If a student makes the sign error in Cartesian numerators: 1.', 'Have them rewrite the equation as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}\\) explicitly, then match.', 'Practice 5 examples where coordinates are negative: e.g., point \\((-2, 3, -5)\\) with direction ratios \\(1, -2, 4\\) →.', 'Ask them to state \\(x_1, y_1, z_1\\) from the equation.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y -.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: \\(L_1: \\frac{x - 2}{1} = \\frac{y + 3}{2} = \\frac{z - 1}{-2}\\) and \\(L_2: \\vec{r} = (4\\hat{i} - \\hat{j} + 3\\hat{k}) + \\mu(2\\hat{i} +.', answer: '**Answer:** Yes, \\(L_1\\) and \\(L_2\\) are parallel',
                  options: ['**Answer:** Yes, \\(L_1\\) and \\(L_2\\) are parallel', 'not parallel because the numbers are different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z -.' }
          ],
            remediations: { 'sign-errors-in-cartesian-form': { steps: ['If a student makes the sign error in Cartesian numerators: 1.', 'Have them rewrite the equation as \\(\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}\\) explicitly, then match.', 'Practice 5 examples where coordinates are negative: e.g., point \\((-2, 3, -5)\\) with direction ratios \\(1, -2, 4\\) →.', 'Ask them to state \\(x_1, y_1, z_1\\) from the equation.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_003', difficulty: 'standard',
          question: 'The angle between two lines in three-dimensional space is defined as the acute.',
          hint: 'If stuck, revisit c12_math_cbse_11_001 (direction cosines/ratios) and.',
          misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two lines in three-dimensional space is defined as the acute angle',
                  options: ['The angle between two lines in three-dimensional space is defined as the acute angle', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The shortest distance between two skew lines in three-dimensional space is the length of', 'A plane in three-dimensional space is uniquely determined if it passes through a given'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The angle between two lines is given by \\(\\cos\\theta =.' }
          ],
            remediations: { 'misconception-the-angle-between-two': { steps: ['If a student forgets the absolute value, have them draw two lines in 2D with slopes \\(m_1=1\\) (45°) and \\(m_2=-1\\).', 'The angle between them is 90°, but the dot product of direction vectors \\((1,1)\\) and \\((1,-1)\\) is 0, giving.', 'Then take \\((1,1)\\) and \\((-1,-1)\\) (same line, opposite direction): dot product = -2, magnitudes \\(\\sqrt{2}\\) each,.', 'This visual demonstration forces the absolute value.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_004', difficulty: 'standard',
          question: 'The shortest distance between two skew lines in three-dimensional space is the.',
          hint: 'If stuck, revisit vector algebra (cross product, scalar triple product) and practice.',
          misconception: 'Students often mistakenly use the formula for parallel lines \\(d = \\frac{|\\vec{b} \\times (\\vec{a_2} -.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The shortest distance between two skew lines in three-dimensional space is the length of',
                  options: ['The shortest distance between two skew lines in three-dimensional space is the length of', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle', 'A plane in three-dimensional space is uniquely determined if it passes through a given'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mistakenly use the formula for parallel lines \\(d = \\frac{|\\vec{b} \\times (\\vec{a_2} - \\vec{a_1})|}{|\\vec{b}|}\\) for skew.' }
          ],
            remediations: { 'students-often-mistakenly-use-the': { steps: ['If a student makes the above errors: 1.', '**Revisit cross product**: Go to Class 11 Vector Algebra (not in provided nodes, but conceptually) or practice.', 'Use node c11_math_cbse_12_002 (distance in 3D) to recall vector operations.', '**Practice absolute value**: Solve 5 problems where the dot product yields negative; emphasize that distance =.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_007', difficulty: 'standard',
          question: 'A plane in three-dimensional space is uniquely determined if it passes through.',
          hint: 'Review vector dot product and the derivation of the normal form of a plane.',
          misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A plane in three-dimensional space is uniquely determined if it passes through a given',
                  options: ['A plane in three-dimensional space is uniquely determined if it passes through a given', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle', 'The shortest distance between two skew lines in three-dimensional space is the length of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the normal vector of a plane with direction vectors lying in the plane.' }
          ],
            remediations: { 'students-frequently-confuse-the-normal': { steps: ['If a student makes the sign error in the Cartesian form, have them explicitly write the substitution step: \\(x - x_1 =.', 'Then multiply by \\(A, B, C\\).', 'For the normal vector confusion, ask: "Does the given vector lie *in* the plane or stand *perpendicular* to it?" If.', 'If it lies in the plane, we need another vector to compute the normal via cross product.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_008', difficulty: 'standard',
          question: 'The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz + D.',
          hint: 'If stuck, revisit the normal form of a plane (c12_math_cbse_11_006) and practice finding.',
          misconception: 'Students often forget to convert the plane equation to the form \\( Ax+By+Cz+D=0 \\) before substituting, leading to sign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz + D = 0 \\) is',
                  options: ['The distance of a point \\( P(x_1, y_1, z_1) \\) from a plane \\( Ax + By + Cz + D = 0 \\) is', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle', 'The shortest distance between two skew lines in three-dimensional space is the length of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to convert the plane equation to the form \\( Ax+By+Cz+D=0 \\) before substituting, leading to sign errors in \\( D \\).' }
          ],
            remediations: { 'students-often-forget-to-convert': { steps: ['If a student makes the sign error with \\( D \\), have them rewrite the plane equation as \\( Ax+By+Cz+D=0 \\) by moving.', 'Then explicitly identify \\( D \\) as the constant term on the left.', 'Practice with 5 planes where the constant is on the right side (e.g., \\( 3x+4y=12 \\), \\( x-y+z=5 \\), \\( 2x=7 \\)) and.', 'For the absolute value error, remind them that distance is always non-negative, and ask them to test a point on the.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_11_009', difficulty: 'standard',
          question: 'The angle between two planes is defined as the acute angle between their normal.',
          hint: 'Revisit c12_math_cbse_11_006 to practice identifying normal vectors from plane equations,.',
          misconception: 'Students often confuse the angle between planes with the angle between their normal vectors without the absolute value.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The angle between two planes is defined as the acute angle between their normal vectors',
                  options: ['The angle between two planes is defined as the acute angle between their normal vectors', 'The equation of a line in 3D space describes the set of all points (x, y, z) that lie on', 'The angle between two lines in three-dimensional space is defined as the acute angle', 'The shortest distance between two skew lines in three-dimensional space is the length of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the angle between planes with the angle between their normal vectors without the absolute value.' }
          ],
            remediations: { 'students-often-confuse-the-angle': { steps: ['If a student forgets the absolute value, have them draw two intersecting planes and their normals: show that the.', 'Make them write the definition: "Angle between planes = acute angle between normals".', 'For normal vector confusion, revisit c12_math_cbse_11_006 (Equation of a Plane in Normal Form) and c12_math_cbse_11_007.', 'For perpendicular condition errors, give a targeted drill: "Write the condition for perpendicular planes in words: \'Sum.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
