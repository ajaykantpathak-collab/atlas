import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch07_p1: SimDef = {
    id: 'v3_c7_math_ch07_p1',
    title: 'A Tale of Three Intersecting Lines · Part 1/2',
    subtitle: 'Covers the basic definition, components (vertices, sides, angles), and standard notation.',
    classLevel: 7, subject: 'mathematics', topic: 'A Tale of Three Intersecting Lines · Part 1/2',
    chapters: ['c7_math_ch07'],
    nodeIds: ['c7_math_ch07_001', 'c7_math_ch07_002', 'c7_math_ch07_003', 'c7_math_ch07_004', 'c7_math_ch07_005', 'c7_math_ch07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are sitting in your school classroom, and you look at the corner where two walls meet the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You have two straight sticks and try to fence off a flat region on your desk. No matter how you place them, space stays open. Why does closing a shape demand at least three sticks?',
        options: ['Two segments can only make an angle or an open path — three is the minimum needed to close a boundary, and that shape is a triangle', 'Two sticks can close a shape if they are long enough', 'One stick can close a shape if it bends', 'You need four — three is too few'],
        answer: 'Two segments can only make an angle or an open path — three is the minimum needed to close a boundary, and that shape is a triangle',
        hook: 'The triangle is the simplest closed polygon: exactly 3 vertices, 3 straight sides, 3 interior angles. Curve one side and it stops being a triangle — and side AB is the same segment as BA, just named from the other end.',
    },
    teaching: [
        { title: 'Triangle: Definition, Vertices, Sides and Angles', text: 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting straight line segments, having exactly three vertices, three sides, and three interior angles.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch07_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Name a triangle PQR completely — list its three vertices, three sides, and three angles — then explain why a shape with one curved side fails the test.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_001', title: 'Triangle: Definition, Vertices, Sides and Angles',
          scaffold: { problem: 'Rahul is drawing a triangular garden bed in his backyard in Jaipur. He labels the three corners of the garden as L, M, and N.',
            steps: [
            { text: 'Identify the given information from the problem statement. The corners are L, M, and N, which form a triangle.' },
            { text: 'Recall the definition of vertices. Vertices are the corner points where the lines meet, which are points L, M, and N.' },
            { text: 'Recall the definition of sides. Sides are the line segments connecting the vertices, which are line segment LM, line.' },
            { text: 'Recall the definition of interior angles. Interior angles are formed at each vertex between adjacent sides, represented.' },
            { text: 'Write down the final symbolic representation of the triangle combining all parts: $\\triangle LMN$.', faded: true, blankAnswer: 'Vertices: L, M, N; Sides: LM, MN, NL; Angles: $\\angle LMN$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_002', title: 'Equilateral Triangles: Construction and Properties',
          scaffold: { problem: 'Priya wants to make a triangular banner for her school sports day in the shape of an equilateral triangle.',
            steps: [
            { text: 'Identify the given information. The shape is an equilateral triangle, so all 3 sides are equal in length, and side $s.' },
            { text: 'Identify what needs to be calculated. The total outer edge length, which is the perimeter of the triangle.' },
            { text: 'Write down the formula for the perimeter of an equilateral triangle: $\\text{Perimeter} = 3 \\times s$.' },
            { text: 'Substitute the given value into the formula: $\\text{Perimeter} = 3 \\times 45$.' },
            { text: 'Compute the final product: $3 \\times 45 = 135\\text{ cm}$, and verify units.', faded: true, blankAnswer: '135 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_003', title: 'Constructing Triangles Using Compass and Ruler',
          scaffold: { problem: 'Construct triangle PQR with side lengths PQ = 6 cm, QR = 5 cm, and PR = 4 cm using a ruler and compass.',
            steps: [
            { text: 'Identify given dimensions: base side PQ = 6 cm, side QR = 5 cm, side PR = 4 cm.' },
            { text: 'Draw a straight line segment PQ of length 6 cm using a ruler and label endpoints P and Q.' },
            { text: 'Open the compass to a radius of 4 cm. Place the compass needle on point P and draw an arc above the line segment PQ.' },
            { text: 'Open the compass to a radius of 5 cm. Place the compass needle on point Q and draw an arc to intersect the first arc.' },
            { text: 'Join point P to R and point Q to R using a ruler to complete triangle PQR, then calculate perimeter: Perimeter =.', faded: true, blankAnswer: 'Triangle PQR constructed successfully with a perimeter.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_004', title: 'Types of Triangles: Based on Sides (Equilateral, Isosceles, Scalene)',
          scaffold: { problem: 'A triangular garden bed in a park has sides measuring $12\\text{ m}$, $9\\text{ m}$, and $12\\text{ m}$.',
            steps: [
            { text: 'Identify the given side lengths of the triangular garden: $\\text{Side}_1 = 12\\text{ m}$, $\\text{Side}_2 = 9\\text{ m}$.' },
            { text: 'Compare the side lengths to classify the triangle. Since two sides are equal ($12\\text{ m}$ and $12\\text{ m}$) and one.' },
            { text: 'Set up the formula for total fencing, which is the perimeter of the triangle: $\\text{Perimeter} = \\text{Side}_1.' },
            { text: 'Substitute the values into the formula and compute: $\\text{Perimeter} = 12 + 9 + 12 = 33\\text{ m}$.' },
            { text: 'State the final classification and total fencing requirement with correct units.', faded: true, blankAnswer: 'Isosceles triangle; Total fencing required is $33\\text{ m}$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_005', title: 'Types of Triangles: Based on Angles (Acute, Right, Obtuse)',
          scaffold: { problem: 'A carpenter cuts a triangular wooden brace for a shelf in his workshop in Delhi.',
            steps: [
            { text: 'List all the given interior angle measurements of the triangular brace: $\\angle 1 = 42^\\circ$, $\\angle 2 = 48^\\circ$.' },
            { text: 'Compare each individual angle against the benchmark angle of $90^\\circ$: $42^\\circ < 90^\\circ$, $48^\\circ < 90^\\circ$.' },
            { text: 'Identify the maximum or largest angle among the three values, which is $90^\\circ$.' },
            { text: 'Apply the classification rule: since the largest angle is exactly equal to $90^\\circ$, the triangle is classified as.' },
            { text: 'Verify the angle sum property: $42^\\circ + 48^\\circ + 90^\\circ = 180^\\circ$, confirming the triangle is geometrically.', faded: true, blankAnswer: 'Right-angled triangle' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_006', title: 'Constructions Related to Altitudes of Triangles',
          scaffold: { problem: 'Construct an altitude from vertex $A$ to base $BC$ in an acute triangle $ABC$ where side $BC = 8\\text{ cm}$, and calculate the height.',
            steps: [
            { text: 'Identify given values: base $BC = 8\\text{ cm}$, total $\\text{Area} = 24\\text{ cm}^2$, and we need to find altitude $h$.' },
            { text: 'Write down the formula relating area, base, and altitude: $\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times h$.' },
            { text: 'Substitute the known values into the equation: $24 = \\frac{1}{2} \\times 8 \\times h$.' },
            { text: 'Simplify and solve the algebraic equation: $24 = 4 \\times h$, which gives $h = \\frac{24}{4} = 6\\text{ cm}$.' },
            { text: 'Verify by checking backward: $\\frac{1}{2} \\times 8\\text{ cm} \\times 6\\text{ cm} = 24\\text{ cm}^2$, which matches the.', faded: true, blankAnswer: '$6\\text{ cm}$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch07_006', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a craft model of a triangular warning sign labelled P, Q and R, Simran\'s teammate says: \'The side opposite corner Q is QR, and to edge the sign we need to cover 4 border pieces, one per corner plus the frame.\'',
            decisions: [{ prompt: 'Which parts of his statement need fixing?', options: [
                { text: 'Both: the side opposite vertex Q is the one that does not touch it — PR — and edging a triangle covers its 3 sides, since a triangle has exactly 3 vertices, 3 sides and 3 angles.', outcome: 'This applies the definitions precisely: a side is named by the two vertices it joins, \'opposite\' means across from the vertex, and the boundary is 3 sides.' },
                { text: 'Only the count is wrong — the opposite side to Q really is QR because it shares the letter Q.', outcome: 'Sharing the letter is exactly why QR is adjacent to Q, not opposite; the opposite side never touches that vertex.', reveals: 'shared-letter-is-opposite' },
                { text: 'Only the naming is wrong — a triangle has 4 border pieces if you count the corner points as separate pieces.', outcome: 'Vertices are points, not border pieces; the perimeter is made of the 3 sides alone, so 4 strips would have nothing to cover.', reveals: 'vertices-are-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Three sticks, three corners, one closed region — the triangle is where all of geometry begins.',
            decisions: [{ prompt: 'What comes next? A Tale of Three Intersecting Lines · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Tale of Three Intersecting Lines · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch07_001', difficulty: 'standard',
          question: 'A triangle is a closed, two-dimensional geometric polygon formed by three.',
          hint: 'Review basic geometry terms in c6_math_ch07_070 to practice identifying points, line.',
          misconception: 'Students often confuse the perimeter or area calculations with the basic structural components of a triangle, or they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting',
                  options: ['A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Review basic geometry terms in c6_math_ch07_070 to practice identifying points, line segments, and.',
                  misconception: 'Students often confuse the perimeter or area calculations with the basic structural components of a triangle, or they mix up the labels.' }
          ],
            remediations: { 'students-often-confuse-the-perimeter': { steps: ['If a student struggles to identify sides and vertices, draw a triangle on paper and physically point to the sharp.', 'Say: "A vertex is a corner point.', 'A side is the straight road connecting two corners.', 'To name a side, just use the two corner letters, like side AB." Practice tracing each side with a colored pencil.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_002', difficulty: 'standard',
          question: 'An equilateral triangle is a special three-sided polygon in which all three.',
          hint: 'Review c6_math_ch07_080 and c6_math_ch11_118 to practice basic compass settings and arc.',
          misconception: 'Students often believe that if they draw three lines of any random length that meet at three corners, they can force.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An equilateral triangle is a special three-sided polygon in',
                  options: ['An equilateral triangle is a special three-sided polygon in', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle', 'Triangles are classified based on the equality of their side lengths into three types: an'],
                  hint: 'Review c6_math_ch07_080 and c6_math_ch11_118 to practice basic compass settings and arc.',
                  misconception: 'Students often believe that if they draw three lines of any random length that meet at three corners, they can force them to form.' }
          ],
            remediations: { 'if-they-draw-three-lines': { steps: ['Guide the student back to the definition of compass construction.', 'Say: "Remember that the compass radius represents the side length of your triangle.', 'If your base line segment is AB = 6 cm, your compass must be opened to exactly 6 cm from the scale before you place the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_003', difficulty: 'standard',
          question: 'Constructing triangles using a ruler and compass involves accurately drawing.',
          hint: 'Review basic line segment construction and compass radius measurement from.',
          misconception: 'Students often confuse the compass setting with the total length of the baseline, or they measure the compass radius.',
          parts: [
                { id: 'a', prompt: 'What tool is used alongside an ungraduated ruler to draw arcs of precise radii when constructing triangles?', answer: 'a compass',
                  options: ['a compass', 'protractor'],
                  hint: 'Review basic line segment construction and compass radius measurement from c6_math_ch11_114.',
                  misconception: 'Students often confuse the compass setting with the total length of the baseline, or they measure the compass radius starting from the 1.' }
          ],
            remediations: { 'students-often-confuse-the-compass': { steps: ['If a student makes the ruler-zero error or arc-intersection error, guide them step by step: "Let us look at your.', 'Place the sharp metal tip of your compass precisely on the 0 cm mark of your ruler, not the 1 cm mark.', 'Now, stretch the pencil end until it touches the exact graduation matching your required side length, such as 6 cm.', 'Check that the distance between the needle and pencil tip is truly 6 cm.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_004', difficulty: 'standard',
          question: 'Triangles are classified based on the equality of their side lengths into three.',
          hint: 'Review c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and.',
          misconception: 'Students often confuse an isosceles triangle with a scalene triangle when the orientation of the triangle is tilted.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Triangles are classified based on the equality of their side lengths into three types: an',
                  options: ['Triangles are classified based on the equality of their side lengths into three types: an', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle'],
                  hint: 'Review c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practicing.',
                  misconception: 'Students often confuse an isosceles triangle with a scalene triangle when the orientation of the triangle is tilted or rotated, failing.' }
          ],
            remediations: { 'students-often-confuse-an-isosceles': { steps: ['If a student struggles, take a physical ruler and measure each side of the triangle explicitly in front of them.', 'Ask them to write down the three side lengths side-by-side (e.g., $5\\text{ cm}$, $5\\text{ cm}$, $8\\text{ cm}$).', 'Guide them to count how many numbers match: if zero match, it is scalene; if two match, it is isosceles; if all three.', 'Reassure them to rely on the written numbers rather than visual appearances.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_005', difficulty: 'standard',
          question: 'Triangles based on angles are classified into three types: an acute-angled.',
          hint: 'Review c6_math_ch07_072 to practice identifying acute, right, and obtuse angles.',
          misconception: 'Students often look at only one angle or confuse classification by sides (scalene, isosceles, equilateral) with.',
          parts: [
                { id: 'a', prompt: 'What do we call a triangle in which all three interior angles measure less than $90^\\circ$?', answer: 'It is called an acute-angled triangle',
                  options: ['It is called an acute-angled triangle', 'right-angled triangle'],
                  hint: 'Review c6_math_ch07_072 to practice identifying acute, right, and obtuse angles individually before.',
                  misconception: 'Students often look at only one angle or confuse classification by sides (scalene, isosceles, equilateral) with classification by angles.' }
          ],
            remediations: { 'students-often-look-at-only': { steps: ['When a student makes this error, guide them through a step-by-step checklist: 1.', 'Ask the student to list all three angle measurements of the triangle on their slate.', 'Have them use a pencil to point to the largest angle among the three.', 'Ask: "Is this largest angle less than, equal to, or greater than $90^\\circ$?" 4.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_006', difficulty: 'standard',
          question: 'An altitude of a triangle is a perpendicular line segment drawn from a vertex.',
          hint: 'Review c6_math_ch07_081 (Constructing Perpendicular Lines and Bisectors) to practice.',
          misconception: 'Students often confuse altitudes with medians or angle bisectors, drawing a line from a vertex to the opposite side\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An altitude of a triangle is a perpendicular line segment drawn from a vertex of the',
                  options: ['An altitude of a triangle is a perpendicular line segment drawn from a vertex of the', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle'],
                  hint: 'Review c6_math_ch07_081 (Constructing Perpendicular Lines and Bisectors) to practice dropping.',
                  misconception: 'Students often confuse altitudes with medians or angle bisectors, drawing a line from a vertex to the opposite side\'s midpoint instead.' }
          ],
            remediations: { 'students-often-confuse-altitudes-with': { steps: ['Guide the student back to the definition of perpendicular lines using a set-square.', 'Say: "Let\'s check our angle first.', 'Put your set-square\'s right-angle corner at the vertex and slide it along the base until it touches the opposite corner.', 'If it doesn\'t make a square $90^\\circ$ corner with the base line, it is not an altitude.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
