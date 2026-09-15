import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch07_p2: SimDef = {
    id: 'v3_c7_math_ch07_p2',
    title: 'A Tale of Three Intersecting Lines · Part 2/2',
    subtitle: 'Covers interior angles of Euclidean triangles in a plane, including numerical problems.',
    classLevel: 7, subject: 'mathematics', topic: 'A Tale of Three Intersecting Lines · Part 2/2',
    chapters: ['c7_math_ch07'],
    nodeIds: ['c7_math_ch07_007', 'c7_math_ch07_008', 'c7_math_ch07_009', 'c7_math_ch07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are cutting a triangular slice of a paratha for lunch, and you want to check if the corners fit.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You have two straight sticks and try to fence off a flat region on your desk. No matter how you place them, space stays open. Why does closing a shape demand at least three sticks?',
        options: ['Two segments can only make an angle or an open path — three is the minimum needed to close a boundary, and that shape is a triangle', 'Two sticks can close a shape if they are long enough', 'One stick can close a shape if it bends', 'You need four — three is too few'],
        answer: 'Two segments can only make an angle or an open path — three is the minimum needed to close a boundary, and that shape is a triangle',
        hook: 'The triangle is the simplest closed polygon: exactly 3 vertices, 3 straight sides, 3 interior angles. Curve one side and it stops being a triangle — and side AB is the same segment as BA, just named from the other end.',
    },
    teaching: [
        { title: 'Angle Sum Property of a Triangle', text: 'The Angle Sum Property of a triangle states that the interior angles of any triangle always add up to exactly $180^\\circ$.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch07_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Name a triangle PQR completely — list its three vertices, three sides, and three angles — then explain why a shape with one curved side fails the test.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_007', title: 'Angle Sum Property of a Triangle',
          scaffold: { problem: 'In a triangular park shaped like $\\triangle ABC$, angle $\\angle A = 48^\\circ$ and angle $\\angle B = 72^\\circ$.',
            steps: [
            { text: 'Identify the given values: $\\angle A = 48^\\circ$, $\\angle B = 72^\\circ$, and the total interior angle sum of any.' },
            { text: 'Write down the angle sum property equation: $\\angle A + \\angle B + \\angle C = 180^\\circ$.' },
            { text: 'Substitute the known values into the equation: $48^\\circ + 72^\\circ + \\angle C = 180^\\circ$.' },
            { text: 'Perform addition for the known angles: $120^\\circ + \\angle C = 180^\\circ$.' },
            { text: 'Isolate $\\angle C$ by subtracting $120^\\circ$ from $180^\\circ$: $\\angle C = 180^\\circ - 120^\\circ = 60^\\circ$.', faded: true, blankAnswer: '60^\\circ' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_008', title: 'Exterior Angle Property of a Triangle',
          scaffold: { problem: 'In a school triangular courtyard in Jaipur, side $AB$ is produced to point $D$ to form exterior angle $\\angle CBD$.',
            steps: [
            { text: 'Identify the exterior angle and its two interior opposite angles from the problem description: Exterior angle.' },
            { text: 'State the exterior angle property formula: $\\text{Exterior } \\angle CBD = \\angle A + \\angle C$.' },
            { text: 'Substitute the known numerical values into the equation: $\\angle CBD = 45^\\circ + 65^\\circ$.' },
            { text: 'Perform the addition computation: $45 + 65 = 110$.' },
            { text: 'Verify with units and interpret: The exterior angle is $110^\\circ$, which is greater than each individual interior.', faded: true, blankAnswer: '$110^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_009', title: 'Constructing Triangles Given Side Lengths (SSS)',
          scaffold: { problem: 'Construct triangle $\\triangle ABC$ where side $AB = 7\\text{ cm}$, side $BC = 5\\text{ cm}$, and side $AC = 6\\text{ cm}$.',
            steps: [
            { text: 'Identify given information and verify the triangle inequality.' },
            { text: 'Draw a baseline segment $AB$ of length 7 cm using a ruler and a sharp pencil, marking endpoints $A$ and $B$.' },
            { text: 'To find vertex $C$, set the compass width to $AC = 6\\text{ cm}$ using the ruler.' },
            { text: 'Reset the compass width to $BC = 5\\text{ cm}$ using the ruler.' },
            { text: 'Use a ruler to join vertex $C$ to vertex $A$ and vertex $C$ to vertex $B$, completing triangle $\\triangle ABC$ with.', faded: true, blankAnswer: 'Triangle $\\triangle ABC$ successfully constructed with $AB.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch07_010', title: 'Constructing Triangles Given Two Sides and Included Angle (SAS)',
          scaffold: { problem: 'Construct $\\triangle PQR$ where side $PQ = 7\\text{ cm}$, side $PR = 5\\text{ cm}$, and the included angle $\\angle QPR = 60^\\circ$.',
            steps: [
            { text: 'Identify given parameters: side $PQ = 7\\text{ cm}$ (base line), side $PR = 5\\text{ cm}$, and included angle $\\angle.' },
            { text: 'Draw a baseline segment $PQ$ of length $7\\text{ cm}$ using a ruler, marking endpoints $P$ and $Q$.' },
            { text: 'Place the center of the protractor at vertex $P$, align the baseline with $PQ$, measure an angle of $60^\\circ$, make.' },
            { text: 'Open your compass to a radius of $5\\text{ cm}$ using a ruler, place the metal pointer at vertex $P$, and cut an arc.' },
            { text: 'Connect vertex $R$ to vertex $Q$ with a straight line segment, and measure segment $QR$ with a ruler to find its.', faded: true, blankAnswer: 'Triangle $PQR$ is successfully constructed with $QR \\approx.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch07_010', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a craft model of a triangular warning sign labelled P, Q and R, Simran\'s teammate says: \'The side opposite corner Q is QR, and to edge the sign we need to cover 4 border pieces, one per corner plus the frame.\'',
            decisions: [{ prompt: 'Which parts of his statement need fixing?', options: [
                { text: 'Both: the side opposite vertex Q is the one that does not touch it — PR — and edging a triangle covers its 3 sides, since a triangle has exactly 3 vertices, 3 sides and 3 angles.', outcome: 'This applies the definitions precisely: a side is named by the two vertices it joins, \'opposite\' means across from the vertex, and the boundary is 3 sides.' },
                { text: 'Only the count is wrong — the opposite side to Q really is QR because it shares the letter Q.', outcome: 'Sharing the letter is exactly why QR is adjacent to Q, not opposite; the opposite side never touches that vertex.', reveals: 'shared-letter-is-opposite' },
                { text: 'Only the naming is wrong — a triangle has 4 border pieces if you count the corner points as separate pieces.', outcome: 'Vertices are points, not border pieces; the perimeter is made of the 3 sides alone, so 4 strips would have nothing to cover.', reveals: 'vertices-are-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch07_010', title: 'You made it',
          caseStudy: { intro: 'Three sticks, three corners, one closed region — the triangle is where all of geometry begins.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch07_007', difficulty: 'standard',
          question: 'The Angle Sum Property of a triangle states that the interior angles of any.',
          hint: 'Review c6_math_ch05_057 for solving linear equations and c6_math_ch07_072 for measuring.',
          misconception: 'Students frequently confuse the angle sum property of a triangle ($180^\\circ$) with the angle sum of a quadrilateral.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Angle Sum Property of a triangle states that the interior angles of any triangle',
                  options: ['The Angle Sum Property of a triangle states that the interior angles of any triangle', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle'],
                  hint: 'Review c6_math_ch05_057 for solving linear equations and c6_math_ch07_072 for measuring angles with.',
                  misconception: 'Students frequently confuse the angle sum property of a triangle ($180^\\circ$) with the angle sum of a quadrilateral ($360^\\circ$) or.' }
          ],
            remediations: { 'students-frequently-confuse-the-angle': { steps: ['If a student struggles, take a physical piece of paper cut into a triangle, tear off the three corners, and physically.', 'Remind them: "Every single triangle in the universe has three angles that must add up to a straight line.', 'If I give you two angles, your job is first to add those two together, and then find out how much more is needed.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_008', difficulty: 'standard',
          question: 'The exterior angle property of a triangle states that if any side of a triangle.',
          hint: 'Review c6_math_ch05_056 for solving linear equations and c6_math_ch07_072 for angle.',
          misconception: 'Students frequently confuse the adjacent interior angle with the interior opposite angles.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The exterior angle property of a triangle states that if any side of a triangle is',
                  options: ['The exterior angle property of a triangle states that if any side of a triangle is', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle'],
                  hint: 'Review c6_math_ch05_056 for solving linear equations and c6_math_ch07_072 for angle measurements.',
                  misconception: 'Students frequently confuse the adjacent interior angle with the interior opposite angles.' }
          ],
            remediations: { 'students-frequently-confuse-the-adjacent': { steps: ['If a student makes this error, pause and have them highlight the vertex where the exterior angle is located.', 'Remind them: "Your exterior angle lives on a straight line outside the triangle.', 'Look across the triangle—away from the line you are standing on—to find the *remote* pair of angles." Have them.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_009', difficulty: 'standard',
          question: 'Constructing a triangle using the Side-Side-Side (SSS) criterion involves.',
          hint: 'Review c6_math_ch07_070 for precise ruler measurements and c6_math_ch07_113 for basic.',
          misconception: 'Students often confuse which compass radius corresponds to which vertex when swinging intersecting arcs for SSS.',
          parts: [
                { id: 'a', prompt: 'What geometric tool is primarily used to measure and transfer an exact side length of a triangle from your ruler onto your construction paper when doing an SSS.', answer: 'a pair of compasses',
                  options: ['a pair of compasses', 'a protractor', 'a set square'],
                  hint: 'Review c6_math_ch07_070 for precise ruler measurements and c6_math_ch07_113 for basic compass arc.',
                  misconception: 'Students often confuse which compass radius corresponds to which vertex when swinging intersecting arcs for SSS construction.' },
                { id: 'b', prompt: 'If you are given three side lengths of 3 cm, 4 cm, and 8 cm, why is it impossible to construct a triangle using these lengths, even if you use a sharp pencil.', answer: 'that it violates the Triangle Inequality Property',
                  options: ['that it violates the Triangle Inequality Property', 'the lines are too short', 'you need a protractor'],
                  hint: 'Review c6_math_ch07_070 for precise ruler measurements and c6_math_ch07_113 for basic compass arc.',
                  misconception: 'Students often confuse which compass radius corresponds to which vertex when swinging intersecting arcs for SSS construction.' }
          ],
            remediations: { 'students-often-confuse-which-compass': { steps: ['To fix this error, guide the student to label the vertices of their baseline first (e.g., let baseline be $XY$).', 'Have them explicitly write down the mapping: "Radius from $X$ must equal side $XZ$ (6 cm)" and "Radius from $Y$ must.', 'Make them trace the line segments with their finger from the vertex point to the compass measurement to reinforce the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse which compass radius corresponds to which vertex when swinging intersecting arcs for SSS.',
          parts: [
                { id: 'a', prompt: 'A student attempts to construct $\\triangle ABC$ with $AB = 7\\text{ cm}$, $BC = 4\\text{ cm}$, and $AC = 2\\text{ cm}$.', answer: 'The failure occurred',
                  options: ['The failure occurred', 'a broken compass', 'not pressing hard enough'],
                  hint: 'Review c6_math_ch07_070 for precise ruler measurements and c6_math_ch07_113 for basic compass arc.',
                  misconception: 'Students often confuse which compass radius corresponds to which vertex when swinging intersecting arcs for SSS construction.' }
          ],
            remediations: { 'students-often-confuse-which-compass': { steps: ['To fix this error, guide the student to label the vertices of their baseline first (e.g., let baseline be $XY$).', 'Have them explicitly write down the mapping: "Radius from $X$ must equal side $XZ$ (6 cm)" and "Radius from $Y$ must.', 'Make them trace the line segments with their finger from the vertex point to the compass measurement to reinforce the.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch07_010', difficulty: 'standard',
          question: 'Constructing a triangle given two sides and the included angle (SAS) involves.',
          hint: 'Review c6_math_ch07_072 on measuring angles and c6_math_ch11_115 on constructing angles.',
          misconception: 'Students frequently measure the second side length along the wrong ray or measure the included angle from the wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Constructing a triangle given two sides and the included angle (SAS) involves drawing a',
                  options: ['Constructing a triangle given two sides and the included angle (SAS) involves drawing a', 'A triangle is a closed, two-dimensional geometric polygon formed by three intersecting', 'An equilateral triangle is a special three-sided polygon in', 'Constructing triangles using a ruler and compass involves accurately drawing a triangle'],
                  hint: 'Review c6_math_ch07_072 on measuring angles and c6_math_ch11_115 on constructing angles before.',
                  misconception: 'Students frequently measure the second side length along the wrong ray or measure the included angle from the wrong vertex.' }
          ],
            remediations: { 'students-frequently-measure-the-second': { steps: ['Remind the student to trace the letters of the given sides: the shared letter in the two side names is always the.', 'Say: "Look at your given sides $AB$ and $BC$.', 'Which letter appears in both?', 'That means your protractor must sit on vertex $B$ to measure the $60^\\circ$ angle." Have them circle the common vertex.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
