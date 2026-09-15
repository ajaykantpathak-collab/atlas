import type { SimDef } from '../../engine/types';
import C7_MathematicsExtendCongruenceSimpleSim from '../../../simulations/c6_12/C7_MathematicsExtendCongruenceSimpleSim';

/** v3 wrapped master — C7_MathematicsExtendCongruenceSimpleSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsextendcongruencesimplesim: SimDef = {
    id: 'v3w_c7_mathematicsextendcongruencesimplesim',
    title: 'Extend Congruence Simple',
    subtitle: 'Covers the exterior angle theorem for triangles in Euclidean plane geometry, including.',
    classLevel: 7, subject: 'mathematics', topic: 'Exterior Angle Property of a Triangle',
    chapters: [],
    nodeIds: ['c7_math_ch07_008', 'c7_math_ch07_001', 'c7_math_ch07_002', 'c7_math_ch07_004', 'c7_math_ch07_010', 'c7_math_ch15_004', 'c7_math_ch15_009', 'c7_math_ch05_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine standing at the corner of a triangular park in your neighborhood, walking along one side, and then.', goal: 'Master Extend Congruence Simple.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The exterior angle property of a triangle.', text: 'The exterior angle property of a triangle states that if any side of a triangle is produced (extended), the exterior angle so formed is equal to the sum of the two interior opposite angles.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch07_008', title: 'The exterior angle property of a.',
          scaffold: { problem: 'In a school triangular courtyard in Jaipur, side $AB$ is produced to point $D$ to form exterior angle $\\angle CBD$.',
            steps: [
            { text: 'Identify the exterior angle and its two interior opposite angles from the problem description: Exterior angle is.' },
            { text: 'State the exterior angle property formula: $\\text{Exterior } \\angle CBD = \\angle A + \\angle C$.' },
            { text: 'Substitute the known numerical values into the equation: $\\angle CBD = 45^\\circ + 65^\\circ$.' },
            { text: 'Perform the addition computation: $45 + 65 = 110$.' },
            { text: 'Verify with units and interpret: The exterior angle is $110^\\circ$, which is greater than each individual interior.', faded: true, blankAnswer: '$110^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_001', title: 'A triangle is a closed, two-dimensional.',
          scaffold: { problem: 'Rahul is drawing a triangular garden bed in his backyard in Jaipur. He labels the three corners of the garden as L, M, and N.',
            steps: [
            { text: 'Identify the given information from the problem statement. The corners are L, M, and N, which form a triangle.' },
            { text: 'Recall the definition of vertices. Vertices are the corner points where the lines meet, which are points L, M, and N.' },
            { text: 'Recall the definition of sides. Sides are the line segments connecting the vertices, which are line segment LM, line.' },
            { text: 'Recall the definition of interior angles. Interior angles are formed at each vertex between adjacent sides, represented.' },
            { text: 'Write down the final symbolic representation of the triangle combining all parts: $\\triangle LMN$.', faded: true, blankAnswer: 'Vertices: L, M, N; Sides: LM, MN, NL; Angles: $\\angle LMN$,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_002', title: 'An equilateral triangle is a special.',
          scaffold: { problem: 'Priya wants to make a triangular banner for her school sports day in the shape of an equilateral triangle.',
            steps: [
            { text: 'Identify the given information. The shape is an equilateral triangle, so all 3 sides are equal in length, and side $s =.' },
            { text: 'Identify what needs to be calculated. The total outer edge length, which is the perimeter of the triangle.' },
            { text: 'Write down the formula for the perimeter of an equilateral triangle: $\\text{Perimeter} = 3 \\times s$.' },
            { text: 'Substitute the given value into the formula: $\\text{Perimeter} = 3 \\times 45$.' },
            { text: 'Compute the final product: $3 \\times 45 = 135\\text{ cm}$, and verify units.', faded: true, blankAnswer: '135 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_004', title: 'Triangles are classified based on the.',
          scaffold: { problem: 'A triangular garden bed in a park has sides measuring $12\\text{ m}$, $9\\text{ m}$, and $12\\text{ m}$.',
            steps: [
            { text: 'Identify the given side lengths of the triangular garden: $\\text{Side}_1 = 12\\text{ m}$, $\\text{Side}_2 = 9\\text{ m}$,.' },
            { text: 'Compare the side lengths to classify the triangle. Since two sides are equal ($12\\text{ m}$ and $12\\text{ m}$) and one.' },
            { text: 'Set up the formula for total fencing, which is the perimeter of the triangle: $\\text{Perimeter} = \\text{Side}_1 +.' },
            { text: 'Substitute the values into the formula and compute: $\\text{Perimeter} = 12 + 9 + 12 = 33\\text{ m}$.' },
            { text: 'State the final classification and total fencing requirement with correct units.', faded: true, blankAnswer: 'Isosceles triangle; Total fencing required is $33\\text{ m}$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_010', title: 'Constructing a triangle given two sides.',
          scaffold: { problem: 'Construct $\\triangle PQR$ where side $PQ = 7\\text{ cm}$, side $PR = 5\\text{ cm}$, and the included angle $\\angle QPR = 60^\\circ$.',
            steps: [
            { text: 'Identify given parameters: side $PQ = 7\\text{ cm}$ (base line), side $PR = 5\\text{ cm}$, and included angle $\\angle P =.' },
            { text: 'Draw a baseline segment $PQ$ of length $7\\text{ cm}$ using a ruler, marking endpoints $P$ and $Q$.' },
            { text: 'Place the center of the protractor at vertex $P$, align the baseline with $PQ$, measure an angle of $60^\\circ$, make a.' },
            { text: 'Open your compass to a radius of $5\\text{ cm}$ using a ruler, place the metal pointer at vertex $P$, and cut an arc on.' },
            { text: 'Connect vertex $R$ to vertex $Q$ with a straight line segment, and measure segment $QR$ with a ruler to find its.', faded: true, blankAnswer: 'Triangle $PQR$ is successfully constructed with $QR \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_004', title: 'Solving linear equations using inverse.',
          scaffold: { problem: 'Riya went to the market and bought some identical notebooks. Each notebook costs ₹25, and she also paid a delivery charge of ₹15.',
            steps: [
            { text: 'Translate the word problem into a linear equation: $25n + 15 = 140$.' },
            { text: 'Identify the operations acting on $n$: first multiplied by 25, then 15 is added.' },
            { text: 'Apply the inverse of adding 15 (which is subtracting 15) to both sides: $25n + 15 - 15 = 140 - 15$, which simplifies to.' },
            { text: 'Apply the inverse of multiplying by 25 (which is dividing by 25) to both sides: $\\frac{25n}{25} = \\frac{125}{25}$,.' },
            { text: 'Verify the result by substituting $n = 5$ back into the original expression: $25(5) + 15 = 125 + 15 = 140$, confirming.', faded: true, blankAnswer: '5 notebooks' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch07_001', title: 'Identify each idea',
          dissect: { specimen: 'Extend Congruence Simple', spots: [
            { id: 's1', label: 'The exterior angle property of', prompt: 'Which idea is this? — The exterior angle property of a triangle states that if any side of a triangle is.', answer: 'The exterior angle property of', options: ['The exterior angle property of', 'A triangle is a closed', 'An equilateral triangle is a', 'Triangles are classified based on'] },
            { id: 's2', label: 'A triangle is a closed', prompt: 'Which idea is this? — A triangle is a closed, two-dimensional geometric polygon formed by three intersecting.', answer: 'A triangle is a closed', options: ['A triangle is a closed', 'The exterior angle property of', 'An equilateral triangle is a', 'Triangles are classified based on'] },
            { id: 's3', label: 'An equilateral triangle is a', prompt: 'Which idea is this? — An equilateral triangle is a special three-sided polygon in which all three sides are.', answer: 'An equilateral triangle is a', options: ['An equilateral triangle is a', 'The exterior angle property of', 'A triangle is a closed', 'Triangles are classified based on'] },
            { id: 's4', label: 'Triangles are classified based on', prompt: 'Which idea is this? — Triangles are classified based on the equality of their side lengths into three types: an.', answer: 'Triangles are classified based on', options: ['Triangles are classified based on', 'The exterior angle property of', 'A triangle is a closed', 'An equilateral triangle is a'] },
            { id: 's5', label: 'Constructing a triangle given two', prompt: 'Which idea is this? — Constructing a triangle given two sides and the included angle (SAS) involves drawing a.', answer: 'Constructing a triangle given two', options: ['Constructing a triangle given two', 'The exterior angle property of', 'A triangle is a closed', 'An equilateral triangle is a'] },
            { id: 's6', label: 'Solving linear equations using inverse', prompt: 'Which idea is this? — Solving linear equations using inverse operations involves applying opposite arithmetic.', answer: 'Solving linear equations using inverse', options: ['Solving linear equations using inverse', 'The exterior angle property of', 'A triangle is a closed', 'An equilateral triangle is a'] }
          ] } }
    ],
    explore: { component: C7_MathematicsExtendCongruenceSimpleSim, prompt: 'Explore the interactive — Extend Congruence Simple' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch07_008', difficulty: 'standard',
          question: 'The exterior angle property of a triangle states that if any side of a triangle.',
          hint: 'Review c6_math_ch05_056 for solving linear equations and c6_math_ch07_072 for angle.',
          misconception: 'Students frequently confuse the adjacent interior angle with the interior opposite angles.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The exterior angle property of a triangle states that if any side of a triangle is',
                  options: ['The exterior angle property of a triangle states that if any side of a triangle is', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the adjacent interior angle with the interior opposite angles.' }
          ],
            remediations: { 'students-frequently-confuse-the-adjacent': { steps: ['If a student makes this error, pause and have them highlight the vertex where the exterior angle is located.', 'Remind them: "Your exterior angle lives on a straight line outside the triangle.', 'Look across the triangle—away from the line you are standing on—to find the *remote* pair of angles." Have them.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_001', difficulty: 'standard',
          question: 'A triangle is a closed, two-dimensional geometric polygon formed by three.',
          hint: 'Review basic geometry terms in c6_math_ch07_070 to practice identifying points, line.',
          misconception: 'Students often confuse the perimeter or area calculations with the basic structural components of a triangle, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting',
                  options: ['A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'The exterior angle property of a triangle states that if any side of a triangle is', 'An equilateral triangle is a special three-sided polygon in', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the perimeter or area calculations with the basic structural components of a triangle, or they mix up the labels of.' }
          ],
            remediations: { 'students-often-confuse-the-perimeter': { steps: ['If a student struggles to identify sides and vertices, draw a triangle on paper and physically point to the sharp.', 'Say: "A vertex is a corner point.', 'A side is the straight road connecting two corners.', 'To name a side, just use the two corner letters, like side AB." Practice tracing each side with a colored pencil to.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_002', difficulty: 'standard',
          question: 'An equilateral triangle is a special three-sided polygon in which all three.',
          hint: 'Review c6_math_ch07_080 and c6_math_ch11_118 to practice basic compass settings and arc.',
          misconception: 'Students often believe that if they draw three lines of any random length that meet at three corners, they can force.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An equilateral triangle is a special three-sided polygon in',
                  options: ['An equilateral triangle is a special three-sided polygon in', 'The exterior angle property of a triangle states that if any side of a triangle is', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if they draw three lines of any random length that meet at three corners, they can force them to form an.' }
          ],
            remediations: { 'if-they-draw-three-lines': { steps: ['Guide the student back to the definition of compass construction.', 'Say: "Remember that the compass radius represents the side length of your triangle.', 'If your base line segment is AB = 6 cm, your compass must be opened to exactly 6 cm from the scale before you place the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_004', difficulty: 'standard',
          question: 'Triangles are classified based on the equality of their side lengths into three.',
          hint: 'Review c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and.',
          misconception: 'Students often confuse an isosceles triangle with a scalene triangle when the orientation of the triangle is tilted or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Triangles are classified based on the equality of their side lengths into three types: an',
                  options: ['Triangles are classified based on the equality of their side lengths into three types: an', 'The exterior angle property of a triangle states that if any side of a triangle is', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse an isosceles triangle with a scalene triangle when the orientation of the triangle is tilted or rotated, failing to.' }
          ],
            remediations: { 'students-often-confuse-an-isosceles': { steps: ['If a student struggles, take a physical ruler and measure each side of the triangle explicitly in front of them.', 'Ask them to write down the three side lengths side-by-side (e.g., $5\\text{ cm}$, $5\\text{ cm}$, $8\\text{ cm}$).', 'Guide them to count how many numbers match: if zero match, it is scalene; if two match, it is isosceles; if all three.', 'Reassure them to rely on the written numbers rather than visual appearances.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_010', difficulty: 'standard',
          question: 'Constructing a triangle given two sides and the included angle (SAS) involves.',
          hint: 'Review c6_math_ch07_072 on measuring angles and c6_math_ch11_115 on constructing angles.',
          misconception: 'Students frequently measure the second side length along the wrong ray or measure the included angle from the wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing a triangle given two sides and the included angle (SAS) involves drawing a',
                  options: ['Constructing a triangle given two sides and the included angle (SAS) involves drawing a', 'The exterior angle property of a triangle states that if any side of a triangle is', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently measure the second side length along the wrong ray or measure the included angle from the wrong vertex.' }
          ],
            remediations: { 'students-frequently-measure-the-second': { steps: ['Remind the student to trace the letters of the given sides: the shared letter in the two side names is always the.', 'Say: "Look at your given sides $AB$ and $BC$.', 'Which letter appears in both?', 'That means your protractor must sit on vertex $B$ to measure the $60^\\circ$ angle." Have them circle the common vertex.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_004', difficulty: 'standard',
          question: 'Solving linear equations using inverse operations involves applying opposite.',
          hint: 'Review c7_math_ch15_002 to practice the balance model before moving to algorithmic.',
          misconception: 'Students often apply the wrong inverse operation or forget to change the sign when moving terms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Solving linear equations using inverse operations involves applying opposite arithmetic',
                  options: ['Solving linear equations using inverse operations involves applying opposite arithmetic', 'The exterior angle property of a triangle states that if any side of a triangle is', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply the wrong inverse operation or forget to change the sign when moving terms.' }
          ],
            remediations: { 'students-often-apply-the-wrong': { steps: ['Guide the student by asking: "What operation was originally done to the variable in this equation?" Have them write.', 'Then ask: "What is the exact opposite (inverse) of that operation?" (e.g., "Subtracted 6").', 'Remind them to apply that inverse operation to both sides simultaneously to keep the equation balanced.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
