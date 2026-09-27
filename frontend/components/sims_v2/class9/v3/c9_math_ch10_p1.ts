import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch10_p1: SimDef = {
    id: 'v3_c9_math_ch10_p1',
    title: 'Lines and Angles · Part 1/2',
    subtitle: 'This node covers the definitions, notations, and basic properties of rays, line segments.',
    classLevel: 9, subject: 'mathematics', topic: 'Lines and Angles · Part 1/2',
    chapters: ['c9_math_ch10'],
    nodeIds: ['c9_math_ch10_1', 'c9_math_ch10_10', 'c9_math_ch10_2', 'c9_math_ch10_3', 'c9_math_ch10_4', 'c9_math_ch10_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Riya is standing at the school gate (point A) and shines a torch straight towards the library building — the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Name the geometric figure represented by each: (i) The edge of a ruler from the 2 cm mark to the 8 cm mark.',
        options: ['(i) Line segment', 'lying on a curve', 'lying on a straight line'],
        answer: '(i) Line segment',
        hook: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing.',
    },
    teaching: [
        { title: 'Basic Terms: Ray, Line Segment, Collinear Points', text: 'A **ray** is a part of a line that starts at a fixed point (called the initial point or endpoint) and extends infinitely in one direction; it is denoted by $\\overrightarrow{AB}$ where A is the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch10_1', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_1', title: 'Basic Terms: Ray, Line Segment, Collinear Points',
          scaffold: { problem: 'A straight road runs from the village centre (point V) to the highway (point H), a distance of 4.8 km.',
            steps: [
            { text: 'Identify the given information — V and H are endpoints of the road, distance VH = 4.8 km; M is a point on the road.' },
            { text: 'The road from V to H is a straight path with two fixed ends, so it is a line segment denoted $\\overline{VH}$ (or.' },
            { text: 'Since M lies between V and H on the same straight road, the points V, M, H are collinear by definition (all lie on one.' },
            { text: 'Compute MH = VH − VM = 4.8 km − 1.5 km = 3.3 km.' },
            { text: 'Verify — VM + MH = 1.5 + 3.3 = 4.8 km = VH. All distances are positive and consistent.', faded: true, blankAnswer: '(a) $\\overline{VH}$ (b) MH = 3.3 km (c) Yes, V, M, H are.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_10', title: 'Angle Sum Property of a Triangle',
          scaffold: { problem: 'A triangular traffic sign board has two angles measuring 45° and 75°.',
            steps: [
            { text: 'Identify what is given — two interior angles (45°, 75°) and an exterior angle (120°) adjacent to the third interior.' },
            { text: 'Use the linear pair property to find the third interior angle: interior angle + exterior angle = 180° → interior angle.' },
            { text: 'Verify using the angle sum property: 45° + 75° + 60° = 180°. The sum is 180°, so the triangle is valid.' },
            { text: 'Interpret the result — the third interior angle is 60°, and since the angles sum to 180°, the support rod is correctly.' },
            { text: 'State the answer with units: Third interior angle = 60°.', faded: true, blankAnswer: '60°' }
            ] } },
        { type: 'case', nodeId: 'c9_math_ch10_2', title: 'Types of Angles: Acute, Obtuse, Right, Reflex',
          caseStudy: { intro: 'Imagine you\'re setting up a badminton net in school and need to check if the pole is perfectly vertical—you\'d use a protractor to measure the angle between the.',
            decisions: [{ prompt: 'What is the measure of a right angle in degrees?', options: [
                { text: 'A right angle measures exactly 90°', outcome: 'A right angle measures exactly 90°. If a student answers "less than 90°" or "more than 90°", they.' },
                { text: 'less than 90°', outcome: 'Not quite — Students often believe that any angle greater than 90° is reflex, incorrectly extending the reflex.', reveals: 'any-angle-greater-than-90' },
                { text: 'more than 90°', outcome: 'Not quite — Students often believe that any angle greater than 90° is reflex, incorrectly extending the reflex.', reveals: 'any-angle-greater-than-90' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_3', title: 'Complementary and Supplementary Angles',
          scaffold: { problem: 'A ramp for wheelchair access in a Mumbai railway station must make an angle of 15° with the horizontal ground for safety.',
            steps: [
            { text: 'Identify the right angle (90°) between the ramp and the vertical support beam.' },
            { text: 'The ramp makes 15° with the ground. The support beam, ramp, and ground form a right triangle.' },
            { text: 'In this triangle, the angle between ramp and ground (15°) and the angle between support beam and ground are the two.' },
            { text: 'Let the required angle be $x$. Then $15^\\circ + x = 90^\\circ$ → $x = 90^\\circ - 15^\\circ = 75^\\circ$.' },
            { text: 'Verify: $15^\\circ + 75^\\circ = 90^\\circ$ ✓. The support beam makes a 75° angle with the ground.', faded: true, blankAnswer: '75°' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_4', title: 'Adjacent Angles and Linear Pairs',
          scaffold: { problem: 'A folding chair has two legs hinged at the top. When fully open, the legs form a straight line on the ground.',
            steps: [
            { text: 'Identify the given: Two angles form a linear pair → their sum = 180° (Linear Pair Axiom).' },
            { text: 'Set up the equation: (5x – 15) + (3x + 25) = 180.' },
            { text: 'Simplify: 5x + 3x – 15 + 25 = 180 → 8x + 10 = 180.' },
            { text: 'Solve for x: 8x = 170 → x = 21.25.' },
            { text: 'Find each angle: ∠1 = 5(21.25) – 15 = 106.25 – 15 = 91.25°. ∠2 = 3(21.25) + 25 = 63.75 + 25 = 88.75°.', faded: true, blankAnswer: 'x = 21.25; angles are 91.25° and 88.75°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch10_5', title: 'Vertically Opposite Angles Theorem',
          scaffold: { problem: 'Two roads, Road A and Road B, cross each other at a junction in Jaipur.',
            steps: [
            { text: 'Visualise the junction as two intersecting lines. Label the intersection point O.' },
            { text: 'The given angle (65°) is between northbound (OA) and eastbound (OB) — call this ∠AOB = 65°.' },
            { text: 'The required angle is between southbound (OC, opposite OA) and westbound (OD, opposite OB) — this is ∠COD.' },
            { text: '∠AOB and ∠COD are vertically opposite angles (formed by opposite rays).' },
            { text: 'Verify: The other two angles (∠BOC and ∠DOA) are linear pairs with 65°, so each = 115°.', faded: true, blankAnswer: '65°' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch10_5', title: 'Rapid check',
          drill: { kind: 'linear2', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch10_5', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Lines and Angles like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Lines and Angles · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Lines and Angles · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch10_1', difficulty: 'standard',
          question: 'A **ray** is a part of a line that starts at a fixed point (called the initial.',
          hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and.',
          misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing.',
          parts: [
                { id: 'a', prompt: 'Name the geometric figure represented by each: (i) The edge of a ruler from the 2 cm mark to the 8 cm mark.', answer: '(i) Line segment',
                  options: ['(i) Line segment', 'lying on a curve', 'lying on a straight line', 'a ray has a second endpoint'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing $\\overrightarrow{AB}.' },
                { id: 'b', prompt: 'Explain why $\\overrightarrow{AB}$ and $\\overrightarrow{BA}$ are different rays, but $\\overline{AB}$ and $\\overline{BA}$ represent the same line segment.', answer: '$\\overrightarrow{AB}$ has initial point A and extends infinitely through B;',
                  options: ['$\\overrightarrow{AB}$ has initial point A and extends infinitely through B;', 'order of endpoints changes the segment'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing $\\overrightarrow{AB}.' },
                { id: 'c', prompt: 'Points A, B, C lie on a line such that B is between A and C. If AB = 3.5 cm and BC = 4.2 cm, find AC. Then state whether A, B, C are collinear and justify.', answer: 'Since B lies between A and C on the same line, AC = AB + BC = 3.5 + 4.2 = 7.7 cm',
                  options: ['Since B lies between A and C on the same line, AC = AB + BC = 3.5 + 4.2 = 7.7 cm', 'difference of segments'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing $\\overrightarrow{AB}.' },
                { id: 'd', prompt: 'In the figure, line l passes through points P and Q. Point R is marked not on line l.', answer: 'Collinear means a **single** straight line passes through **all three** points',
                  options: ['Collinear means a **single** straight line passes through **all three** points', 'pairwise collinear', 'collinear as a set of three'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing $\\overrightarrow{AB}.' }
          ],
            remediations: { 'students-treat-ray-notation-overrightarrow': { steps: ['Ask the student to physically act out a ray — stand at a spot (initial point), point one arm straight, and walk forward.', 'Use two coloured pens — red for initial point, blue for direction — and have them write the notation as "Red letter.', 'For collinearity, give three dots on paper — two on a straight line, one off it — and ask them to place a ruler: "Can.', 'Practice 5 notation drills: convert description to symbol (e.g.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing.',
          parts: [
                { id: 'a', prompt: 'A classmate draws $\\overrightarrow{XY}$ and labels the initial point as Y and the arrow pointing towards X. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'it\'s fine, order doesn\'t matter'],
                  hint: 'Revisit c6_math_ch07_070 (Introduction to Geometry: Points, Lines, Line Segments) and practice.',
                  misconception: 'Students treat ray notation $\\overrightarrow{AB}$ as commutative like segment notation $\\overline{AB}$, writing $\\overrightarrow{AB}.' }
          ],
            remediations: { 'students-treat-ray-notation-overrightarrow': { steps: ['Ask the student to physically act out a ray — stand at a spot (initial point), point one arm straight, and walk forward.', 'Use two coloured pens — red for initial point, blue for direction — and have them write the notation as "Red letter.', 'For collinearity, give three dots on paper — two on a straight line, one off it — and ask them to place a ruler: "Can.', 'Practice 5 notation drills: convert description to symbol (e.g.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_10', difficulty: 'standard',
          question: 'The Angle Sum Property of a Triangle states that the sum of the three interior.',
          hint: 'Revisit c9_math_ch10_7 (Alternate Interior Angles) and c9_math_ch10_4 (Linear Pairs).',
          misconception: 'Students often incorrectly apply the angle sum property when a triangle has an exterior angle shown.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Angle Sum Property of a Triangle states that the sum of the three interior angles of',
                  options: ['The Angle Sum Property of a Triangle states that the sum of the three interior angles of', 'A **ray** is a part of a line that starts at a fixed point (called the initial point or', 'An acute angle measures greater than 0° and less than 90°', 'Two angles are **complementary** if the sum of their measures is exactly 90°'],
                  hint: 'Revisit c9_math_ch10_7 (Alternate Interior Angles) and c9_math_ch10_4 (Linear Pairs) — practice.',
                  misconception: 'Students often incorrectly apply the angle sum property when a triangle has an exterior angle shown.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['If a student makes this error, draw the triangle with the exterior angle clearly marked.', 'Ask: "Does this 110° angle lie *inside* the triangle?" (No).', '"What angle *is* inside at that vertex?" Guide them to see the linear pair: the interior angle + 110° = 180°.', 'Then have them rewrite the angle sum using the correct interior angle (70°).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_2', difficulty: 'standard',
          question: 'An acute angle measures greater than 0° and less than 90°; an obtuse angle.',
          hint: 'If stuck, revisit comparing and ordering decimal numbers (c6_math_ch04_044) to build.',
          misconception: 'Students often believe that any angle greater than 90° is reflex, incorrectly extending the reflex category to include.',
          parts: [
                { id: 'a', prompt: 'What is the measure of a right angle in degrees?', answer: 'A right angle measures exactly 90°',
                  options: ['A right angle measures exactly 90°', 'less than 90°', 'more than 90°'],
                  hint: 'If stuck, revisit comparing and ordering decimal numbers (c6_math_ch04_044) to build precision.',
                  misconception: 'Students often believe that any angle greater than 90° is reflex, incorrectly extending the reflex category to include obtuse angles (e.g.' }
          ],
            remediations: { 'any-angle-greater-than-90': { steps: ['To fix this, explicitly compare angles using a protractor: have the student measure 120° and 240°, then ask: "Is 120°.', 'Yes—so it is reflex." Emphasize that reflex means "more than half a full turn" (i.e., >180°), not just "wider than.', 'Practice with sorting cards showing angle measures and sorting into <90°, 90°–180°, >180° bins.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_3', difficulty: 'standard',
          question: 'Two angles are **complementary** if the sum of their measures is exactly 90°.',
          hint: 'If stuck, revisit **c6_math_ch05_056 (Linear Equations in One Variable)** — practice.',
          misconception: 'Students believe complementary angles must be **adjacent** (share a vertex and arm).',
          parts: [
                { id: 'a', prompt: 'State the exact sum condition that defines a pair of complementary angles and a pair of supplementary angles. No calculation needed.', answer: 'Complementary angles sum to 90°',
                  options: ['Complementary angles sum to 90°', 'complementary = 180°', 'pairs summing to a special angle', 'complementary angles must be **adjacent** (share a vertex and arm)'],
                  hint: 'If stuck, revisit **c6_math_ch05_056 (Linear Equations in One Variable)** — practice forming.',
                  misconception: 'Students believe complementary angles must be **adjacent** (share a vertex and arm).' },
                { id: 'b', prompt: 'Explain why two angles measuring 40° and 50° are complementary, but two angles measuring 40° and 140° are NOT supplementary — even though 40° appears in both.', answer: '40° + 50° = 90° → complementary',
                  options: ['40° + 50° = 90° → complementary', 'not supplementary', 'already used', 'complementary angles must be **adjacent** (share a vertex and arm)'],
                  hint: 'If stuck, revisit **c6_math_ch05_056 (Linear Equations in One Variable)** — practice forming.',
                  misconception: 'Students believe complementary angles must be **adjacent** (share a vertex and arm).' },
                { id: 'c', prompt: 'The measure of an angle is 5 times the measure of its complement. Find the measures of both angles.', answer: 'Let the angle be $x$',
                  options: ['Let the angle be $x$', 'complementary angles must be **adjacent** (share a vertex and arm)'],
                  hint: 'If stuck, revisit **c6_math_ch05_056 (Linear Equations in One Variable)** — practice forming.',
                  misconception: 'Students believe complementary angles must be **adjacent** (share a vertex and arm).' }
          ],
            remediations: { 'complementary-angles-must-be-adjacent': { steps: ['Draw two separate angles on the board: ∠X = 30° (top left), ∠Y = 60° (bottom right), no common vertex.', 'Ask: "Do these sum to 90°?" → Yes.', '"Are they complementary?" → Yes, by definition.', 'Contrast with adjacent pair: ∠P = 30°, ∠Q = 60° sharing a vertex.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_4', difficulty: 'standard',
          question: 'Two angles are **adjacent** if they share a common vertex, a common arm, and.',
          hint: 'If stuck, revisit c9_math_ch10_1 (rays and collinear points) and c6_math_ch05_057.',
          misconception: 'Students consistently treat "linear pair" and "supplementary angles" as synonyms.',
          parts: [
                { id: 'a', prompt: 'In the figure, ray OC stands on line AB. ∠AOC = 3x + 10° and ∠COB = 5x – 30°. Are ∠AOC and ∠COB a linear pair? Justify your answer using the definition.', answer: 'Yes, they form a linear pair',
                  options: ['Yes, they form a linear pair', 'yes because they add to 180°'],
                  hint: 'If stuck, revisit c9_math_ch10_1 (rays and collinear points) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students consistently treat "linear pair" and "supplementary angles" as synonyms.' },
                { id: 'b', prompt: 'Two angles ∠PQR and ∠RQS share vertex Q and arm QR. Their non-common arms QP and QS are NOT opposite rays. Can ∠PQR and ∠RQS be a linear pair?', answer: 'No, they cannot be a linear pair',
                  options: ['No, they cannot be a linear pair', 'yes if they sum to 180°', 'supplementary = linear pair, missing the geometric necessity of opposite rays'],
                  hint: 'If stuck, revisit c9_math_ch10_1 (rays and collinear points) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students consistently treat "linear pair" and "supplementary angles" as synonyms.' },
                { id: 'c', prompt: 'Compare: In Figure 1, ray OP stands on line XY. In Figure 2, rays OP and OQ are drawn such that ∠XOP = 110° and ∠POQ = 70°.', answer: 'Only in Figure 1',
                  options: ['Only in Figure 1', 'both, because both sum to 180°'],
                  hint: 'If stuck, revisit c9_math_ch10_1 (rays and collinear points) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students consistently treat "linear pair" and "supplementary angles" as synonyms.' }
          ],
            remediations: { 'students-consistently-treat-linear-pair': { steps: ['Have the student physically model with two pencils: place them tip-to-tip (common vertex), align one pencil as the.', 'Now rotate slightly so the line breaks — they\'re still adjacent, but NOT a linear pair.', 'Draw three cases on paper: (a) adjacent + opposite rays (linear pair), (b) adjacent but NOT opposite rays (just.', 'Drill the definition chant: "Linear pair = Adjacent + Opposite Rays = 180°".'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch10_5', difficulty: 'standard',
          question: 'When two straight lines intersect at a point, the pairs of non-adjacent angles.',
          hint: 'Revisit c9_math_ch10_4 (Adjacent Angles and Linear Pairs) and practice identifying linear.',
          misconception: 'Students **confuse vertically opposite angles with linear pairs**: when given ∠AOC = 70°, they write ∠BOD = 110° (using.',
          parts: [
                { id: 'a', prompt: 'Two lines intersect at a point. One angle is 40°. Find the measures of the other three angles. Show all steps.', answer: 'Let the given angle be ∠1 = 40°',
                  options: ['Let the given angle be ∠1 = 40°', 'all four angles are equal'],
                  hint: 'Revisit c9_math_ch10_4 (Adjacent Angles and Linear Pairs) and practice identifying linear pairs.',
                  misconception: 'Students **confuse vertically opposite angles with linear pairs**: when given ∠AOC = 70°, they write ∠BOD = 110° (using linear pair sum).' }
          ],
            remediations: { 'students-confuse-vertically-opposite-angles': { steps: ['Draw two intersecting lines and label all four angles 1, 2, 3, 4 clockwise.', 'Ask: "Which angles share a common arm?" → 1 & 2, 2 & 3, 3 & 4, 4 & 1 (these are linear pairs).', 'Ask: "Which angles are opposite each other?" → 1 & 3, 2 & 4 (these are vertically opposite).', 'Use coloured pencils: shade linear pairs in one colour, vertically opposite in another.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
