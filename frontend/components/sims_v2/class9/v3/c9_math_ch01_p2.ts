import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch01_p2: SimDef = {
    id: 'v3_c9_math_ch01_p2',
    title: 'Coordinate Geometry · Part 2/2',
    subtitle: 'An address for every point on the page',
    classLevel: 9, subject: 'mathematics', topic: 'Coordinate Geometry · Part 2/2',
    chapters: ['c9_math_ch01'],
    nodeIds: ['c9_math_ch1_5', 'c9_math_ch1_6', 'c9_math_ch1_7', 'c9_math_ch1_8', 'c9_math_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mapmaker inventing coordinates', intro: 'One number line can only mark points along itself. Cross it with a second one and suddenly every point on the page gets its own unique address — if you read the pair in the right order.', goal: 'Understand the Cartesian plane — x and y axes, origin (0,0), and ordered pairs as signed distances from each axis, with order and sign carrying direction.' },
    discovery: {
        question: 'Is the point (3, 5) the same spot as (5, 3)? They use the same two numbers, after all.',
        options: ['No — coordinates are an ordered pair: the first number is always distance from the y-axis, the second from the x-axis; swapping teleports the point', 'Yes — same numbers, same point', 'Only sometimes, on Tuesdays', 'Yes, as long as both are positive'],
        answer: 'No — coordinates are an ordered pair: the first number is always distance from the y-axis, the second from the x-axis; swapping teleports the point',
        hook: 'A coordinate is an address, not a shopping list — order is everything. \'x walks horizontally, y climbs vertically.\' And the origin isn\'t (1,1): it\'s (0,0), the one spot sitting exactly ON both axes.',
    },
    teaching: [
        { title: 'Distance Between Two Points on a Line Parallel to an Axis', text: 'The distance between two points on a line parallel to the x-axis is the absolute difference of their x-coordinates, since their y-coordinates are equal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch1_5', title: 'Your mission',
          mission: { widget: 'globe', validate: 'globe:tilt=60',
            instruction: 'On the lab: tilt the axis — which hemisphere gets more light?.',
        context: 'Build the Cartesian plane yourself: draw the two axes crossing at (0,0), plot points that live on the axes (why does everything on the x-axis end in 0?), and describe a bench\'s location for a phone call using two perpendicular distances.',
            observePrompt: 'What did the globe interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_5', title: 'Distance Between Two Points on a Line Parallel to an Axis',
          scaffold: { problem: 'Two trees are planted on the same east-west boundary line of a farm.',
            steps: [
            { text: 'Identify the given coordinates: A(15, 10) and B(-8, 10). Note the y-coordinates are both 10.' },
            { text: 'Since y-coordinates are equal, the trees lie on a horizontal line (parallel to x-axis).' },
            { text: 'Substitute x₁ = 15, x₂ = -8 into the formula: Distance = |-8 - 15|.' },
            { text: 'Compute the subtraction inside absolute value: -8 - 15 = -23. Then take absolute value: |-23| = 23.' },
            { text: 'Interpret the result: The distance between the trees is 23 metres.', faded: true, blankAnswer: '23 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_6', title: 'Distance Formula: Applications and Word Problems',
          scaffold: { problem: 'A town planner marks the locations of a hospital \\(H(3, 4)\\), a fire station \\(F(7, 1)\\), and a police station \\(P(1, 2)\\) on a coordinate.',
            steps: [
            { text: 'Identify the coordinates: \\(P(1,2)\\), \\(H(3,4)\\), \\(F(7,1)\\). The route is \\(P \\to H \\to F \\to P\\).' },
            { text: 'Write the distance formula for each pair. \\(PH = \\sqrt{(3-1)^2 + (4-2)^2}\\), \\(HF = \\sqrt{(7-3)^2 + (1-4)^2}\\), \\(FP.' },
            { text: 'Substitute and simplify each:' },
            { text: 'Add the three distances: Total distance = \\(2\\sqrt{2} + 5 + \\sqrt{37}\\) km.' },
            { text: 'Approximate for practical interpretation: \\(2\\sqrt{2} \\approx 2.828\\), \\(\\sqrt{37} \\approx 6.083\\).', faded: true, blankAnswer: 'Total distance = \\(5 + 2\\sqrt{2} + \\sqrt{37}\\) km (exact) ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_7', title: 'Section Formula: Internal Division of a Line Segment',
          scaffold: { problem: 'A telephone company wants to install a relay tower on the straight line between two villages.',
            steps: [
            { text: 'Identify the given values: A(x₁, y₁) = (–4, 7), B(x₂, y₂) = (8, –5), ratio m:n = 3:2 (AP:PB = 3:2).' },
            { text: 'Write the section formula for internal division: x = (mx₂ + nx₁)/(m+n), y = (my₂ + ny₁)/(m+n).' },
            { text: 'Substitute the values: x = (3×8 + 2×(–4))/(3+2) = (24 – 8)/5 = 16/5 = 3.2; y = (3×(–5) + 2×7)/5 = (–15 + 14)/5 = –1/5.' },
            { text: 'Verify the result lies between A and B: x-coordinate 3.2 is between –4 and 8; y-coordinate –0.2 is between –5 and 7.' },
            { text: 'State the answer with units: The tower should be installed at (3.2, –0.2) or (16/5, –1/5).', faded: true, blankAnswer: '(16/5, –1/5) or (3.2, –0.2)' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_8', title: 'Midpoint Formula: Special Case of Section Formula',
          scaffold: { problem: 'A straight highway connects City P at (12, -8) and City Q at (-4, 16) on a state map.',
            steps: [
            { text: 'Identify the given endpoints: P(12, -8) and Q(-4, 16). The rest house is at the midpoint M.' },
            { text: 'Apply the midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).' },
            { text: 'Substitute coordinates: x = (12 + (-4))/2 = 8/2 = 4; y = (-8 + 16)/2 = 8/2 = 4. So M = (4, 4).' },
            { text: 'Find distance from P to M using distance formula: √[(4-12)² + (4-(-8))²] = √[(-8)² + (12)²] = √[64 + 144] = √208 = 4√13.' },
            { text: 'Convert to kilometres: 4√13 units × 5 km/unit = 20√13 km ≈ 72.11 km. Since M is midpoint, distance to Q is the same.', faded: true, blankAnswer: 'Rest house at (4, 4); distance from each city = 20√13 km (≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch1_9', title: 'Coordinates of Points Trisecting a Line Segment',
          scaffold: { problem: 'A straight walking path in a park runs from the gate at coordinates (2, 5) to a fountain at (11, 14).',
            steps: [
            { text: 'Identify the endpoints: A(2, 5) and B(11, 14). We need two points P and Q that trisect AB.' },
            { text: 'Recall that trisection means dividing into three equal parts. The point closer to A divides AB in the ratio 1:2 (AP:PB.' },
            { text: 'Apply the section formula for P (ratio 1:2). x_P = (1·x₂ + 2·x₁)/(1+2) = (1·11 + 2·2)/3 = (11+4)/3 = 15/3 = 5.' },
            { text: 'Apply the section formula for Q (ratio 2:1). x_Q = (2·x₂ + 1·x₁)/3 = (2·11 + 1·2)/3 = (22+2)/3 = 24/3 = 8.' },
            { text: 'Verify by checking distances: AP = √((5-2)²+(8-5)²) = √(9+9) = √18. PQ = √((8-5)²+(11-8)²) = √(9+9) = √18.', faded: true, blankAnswer: 'The benches should be placed at (5, 8) and (8, 11).' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch1_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch1_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Marking seating spots on graph paper for a school drill, the PE teacher reads \'(3, 5): three right, five up from the origin.\' A student plots it as three up and five right, arguing \'3 and 5 are 3 and 5 — same point either way.\'',
            decisions: [{ prompt: 'Does the order inside the pair matter?', options: [
                { text: 'Completely — (3, 5) means 3 units from the vertical axis then 5 from the horizontal one; (5, 3) is a different square entirely. The pair is ordered by convention — horizontal first, vertical second — and only the line y = x is where a swap coincidentally lands on the same spot.', outcome: 'This applies the fixed convention that makes coordinates unambiguous — shared language, not personal preference.' },
                { text: 'The student is right — the pair is just the two numbers, and the point exists wherever you place them.', outcome: 'Coordinates are signed distances from specific axes; swapping them moves the point, which is why the convention exists.', reveals: 'order-doesnt-matter' },
                { text: 'Neither is standard — teachers let each student choose which number goes horizontal.', outcome: 'The convention is universal: x first, y second; letting everyone choose would make every shared map meaningless.', reveals: 'axes-are-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Two number lines at right angles = an address system for every point in the universe of a page. First number: how far sideways from the y-axis. Second: how far up or down from the x-axis. Order matters, signs matter.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'globe', prompt: 'Explore the globe interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'globe', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch1_5', difficulty: 'standard',
          question: 'The distance between two points on a line parallel to the x-axis is the.',
          hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) and c9_math_ch1_3.',
          misconception: 'Students often subtract coordinates in the wrong order and forget the absolute value, writing distance = y₁ - y₂ (or x₁.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points on a line parallel to the x-axis is the absolute',
                  options: ['The distance between two points on a line parallel to the x-axis is the absolute', 'The Cartesian coordinate system is a two-dimensional plane formed by two perpendicular', 'Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only if the sum of', 'The area of a triangle with vertices at coordinates \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and'],
                  hint: 'If stuck, revisit c6_math_ch02_025 (Absolute Value of Integers) and c9_math_ch1_3 (Quadrants and.',
                  misconception: 'Students often subtract coordinates in the wrong order and forget the absolute value, writing distance = y₁ - y₂ (or x₁ - x₂) which can.' }
          ],
            remediations: { 'students-often-subtract-coordinates-in': { steps: ['If a student gives a negative distance, ask: "Can the length of a segment be negative?', 'What does the absolute value bars mean?" Guide them to place the larger coordinate first or use | |.', 'If they use the full formula, ask: "What is (x₂-x₁) when x-coordinates are same?', 'What does the formula become then?" Have them derive the simplified rule from the general formula once, then practice 5.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_6', difficulty: 'standard',
          question: 'The distance formula calculates the length of the line segment joining two.',
          hint: 'If stuck, revisit c9_math_ch1_4 (derivation) to see the right triangle, and.',
          misconception: 'Students often incorrectly apply the distance formula when one or both points have negative coordinates.',
          parts: [
                { id: 'a', prompt: 'A student claims that the distance between \\(A(1, 2)\\) and \\(B(4, 6)\\) is 7 because \\(4-1=3\\) and \\(6-2=4\\) and \\(3+4=7\\).', answer: 'The student incorrectly added the horizontal and vertical differences (Manhattan',
                  options: ['The student incorrectly added the horizontal and vertical differences (Manhattan', 'the answer is 7, they are confusing the sum of legs with the hypotenuse'],
                  hint: 'If stuck, revisit c9_math_ch1_4 (derivation) to see the right triangle, and c6_math_ch05_057.',
                  misconception: 'Students often incorrectly apply the distance formula when one or both points have negative coordinates.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['If a student makes sign errors with negative coordinates, have them rewrite the substitution step explicitly: "\\(x_1.', 'Use a number line to show that the distance between -3 and 1 is 4, not -2.', 'For the squaring error, remind them: "If \\(\\sqrt{A} = d\\), then \\(A = d^2\\).', 'The square root covers the whole sum, so squaring removes it entirely." Practice 5 problems where coordinates are.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_7', difficulty: 'standard',
          question: 'The section formula for internal division states that if a point P(x, y).',
          hint: 'If stuck, revisit ratio and proportion (c6_math_ch06_062, c6_math_ch06_063) and practice.',
          misconception: 'The most frequent error is swapping the ratio weights: students write x = (mx₁ + nx₂)/(m+n) instead of (mx₂.',
          parts: [
                { id: 'a', prompt: 'Explain why the section formula uses a weighted average with the ratio parts swapped: the x-coordinate of the first point is multiplied by n (the second part.', answer: 'Because the point P divides AB in the ratio m:n, meaning AP:PB = m:n',
                  options: ['Because the point P divides AB in the ratio m:n, meaning AP:PB = m:n', 'm goes with the first point'],
                  hint: 'If stuck, revisit ratio and proportion (c6_math_ch06_062, c6_math_ch06_063) and practice dividing.',
                  misconception: 'The most frequent error is swapping the ratio weights: students write x = (mx₁ + nx₂)/(m+n) instead of (mx₂ + nx₁)/(m+n).' }
          ],
            remediations: { 'the-most-frequent-error-is': { steps: ['To fix this, draw a number line with points A and B.', 'Show that if m > n, P is closer to B, so B\'s coordinate should have more influence (larger weight).', 'Write the formula as: coordinate of P = (weight for B × B + weight for A × A) / (sum of weights).', 'Emphasize: "The weight for B is the part of the ratio corresponding to AP, which is m." Practice with a specific.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_8', difficulty: 'standard',
          question: 'The midpoint formula is a special case of the section formula for internal.',
          hint: 'If stuck, revisit c9_math_ch1_7 (Section Formula: Internal Division) and practice.',
          misconception: 'Students often treat the midpoint formula as (x₁ + x₂, y₁ + y₂) — i.e., they add the coordinates but forget to divide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The midpoint formula is a special case of the section formula for internal division where',
                  options: ['The midpoint formula is a special case of the section formula for internal division where', 'The Cartesian coordinate system is a two-dimensional plane formed by two perpendicular', 'Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) are collinear if and only if the sum of', 'The area of a triangle with vertices at coordinates \\(A(x_1, y_1)\\), \\(B(x_2, y_2)\\), and'],
                  hint: 'If stuck, revisit c9_math_ch1_7 (Section Formula: Internal Division) and practice substituting m=1.',
                  misconception: 'Students often treat the midpoint formula as (x₁ + x₂, y₁ + y₂) — i.e., they add the coordinates but forget to divide by 2.' }
          ],
            remediations: { 'students-often-treat-the-midpoint': { steps: ['Ask them to find the midpoint of (0,0) and (10,0) on a number line. They will say 5.', 'Show that (0+10)/2 = 5, but (0+10) = 10 which is the endpoint.', 'Generalize: midpoint = (sum)/2. For sign errors:', 'Use a number line to show -3 and 1 have midpoint -1.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch1_9', difficulty: 'standard',
          question: 'If a line segment joining points A(x₁, y₁) and B(x₂, y₂) is divided into three.',
          hint: 'Revisit c9_math_ch1_7 (Section Formula) and practice with ratios 1:2 and 2:1 on a number.',
          misconception: 'Students often swap the ratios: they use 1:2 for the point nearer to B and 2:1 for the point nearer to A.',
          parts: [
                { id: 'a', prompt: 'State the ratios in which the two points of trisection divide a line segment internally.', answer: 'The two points of trisection divide the segment in the ratios 1:2 and 2:1',
                  options: ['The two points of trisection divide the segment in the ratios 1:2 and 2:1', 'three equal parts'],
                  hint: 'Revisit c9_math_ch1_7 (Section Formula) and practice with ratios 1:2 and 2:1 on a number line.',
                  misconception: 'Students often swap the ratios: they use 1:2 for the point nearer to B and 2:1 for the point nearer to A.' }
          ],
            remediations: { 'students-often-swap-the-ratios': { steps: ['Draw a number line from 0 to 3.', 'Show that the segment from 0 to 1 is 1 part, 1 to 2 is 1 part, 2 to 3 is 1 part.', 'The point at 1 divides 0-3 in ratio 1:2 (left part:right part).', 'The point at 2 divides in ratio 2:1.'], labTask: { instruction: 'On the interactive: tilt the axis — which hemisphere gets more light? — then check.', widget: 'globe', validate: 'globe:tilt=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
