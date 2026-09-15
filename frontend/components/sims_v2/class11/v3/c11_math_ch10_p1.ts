import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch10_p1: SimDef = {
    id: 'v3_c11_math_ch10_p1',
    title: 'Straight Lines · Part 1/3',
    subtitle: 'Learn that a point on an axis belongs to no quadrant at all.',
    classLevel: 11, subject: 'mathematics', topic: 'Straight Lines · Part 1/3',
    chapters: ['c11_math_ch10'],
    nodeIds: ['c11_math_cbse_10_001', 'c11_math_cbse_10_002', 'c11_math_cbse_10_003', 'c11_math_cbse_10_004', 'c11_math_cbse_10_005', 'c11_math_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a navigator reading signed distances from two axes', intro: 'Cinema seat = row plus seat number; a plane point = x then y — and the border seats belong to no quadrant.', goal: 'Plot points, classify quadrants and axes, and apply the distance formula.' },
    discovery: {
        question: 'Where does the point (0, −5) lie — fourth quadrant, since its y is negative?',
        options: ['Nowhere in a quadrant — it sits on the negative y-axis; quadrants need both coordinates non-zero', 'Fourth quadrant — negative y decides it', 'Third quadrant — negatives mean III', 'Second quadrant — axes count as quadrants'],
        answer: 'Nowhere in a quadrant — it sits on the negative y-axis; quadrants need both coordinates non-zero',
        hook: 'Axes are the borders, not the countries — and (3, 2) is not (2, 3); the ordered pair\'s order is the point\'s whole identity.',
    },
    teaching: [
        { title: 'Coordinate Axes and Coordinates of a Point', text: 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x, y) where x (the abscissa) is the signed perpendicular distance from the y-axis, and y (the ordinate) is the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_10_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Plot A(2,3), B(−2,3), C(−2,−3), D(2,−3) to see the square, then find the x-axis point equidistant from (2,3) and (4,5).',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_001', title: 'Coordinate Axes and Coordinates of a Point',
          scaffold: { problem: 'A city planner uses a coordinate grid to design a park. The main gate is at the origin O(0,0). The x-axis runs East, the y-axis runs North.',
            steps: [
            { text: 'Identify the axes and positive directions. x-axis: East positive, West negative.' },
            { text: 'Convert real distances to grid units using scale 1 unit = 10 m.' },
            { text: 'Playground: 40 m West → x = −4 units; 20 m South → y = −2 units. Coordinates: (−4, −2).' },
            { text: 'Cafeteria: on Eastern boundary (x-axis) and 60 m East → x = 6 units, y = 0. Coordinates: (6, 0).' },
            { text: 'Verify each point lies in the correct quadrant or axis: Fountain (5,3) in Quadrant I, Playground (−4,−2) in Quadrant.', faded: true, blankAnswer: 'Fountain: (5, 3); Playground: (−4, −2); Cafeteria: (6, 0).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_002', title: 'Distance Between Two Points',
          scaffold: { problem: 'A rectangular park in Delhi has corners at A(1, 2), B(5, 2), C(5, 6), D(1, 6) (coordinates in 100-metre units).',
            steps: [
            { text: 'Identify coordinates of midpoints. Midpoint of AB: \\(M = \\left(\\frac{1+5}{2}, \\frac{2+2}{2}\\right) = (3, 2)\\).' },
            { text: 'Note that both midpoints have same x-coordinate (3), so the segment MN is vertical.' },
            { text: 'Alternatively, apply distance formula: \\(MN = \\sqrt{(3-3)^2 + (6-2)^2} = \\sqrt{0 + 16} = 4\\) units.' },
            { text: 'Convert units: 1 unit = 100 metres, so length = \\(4 \\times 100 = 400\\) metres.' },
            { text: 'Verify: The path runs vertically through the centre of the park from y=2 to y=6, spanning 4 units of 100m each. Correct.', faded: true, blankAnswer: '400 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_003', title: 'Section Formula: Internal Division',
          scaffold: { problem: 'A triangular park has vertices at A(2, 3), B(8, -1), and C(4, 7).',
            steps: [
            { text: 'Find midpoint M of BC using midpoint formula: M = ((8+4)/2, (-1+7)/2) = (12/2, 6/2) = (6, 3)' },
            { text: 'Identify the segment for section formula: A(2, 3) to M(6, 3), ratio m:n = 2:1 (from A)' },
            { text: 'Apply section formula for internal division: x = (mx₂ + nx₁)/(m+n), y = (my₂ + ny₁)/(m+n)' },
            { text: 'Substitute values: x = (2×6 + 1×2)/(2+1) = (12+2)/3 = 14/3; y = (2×3 + 1×3)/(3) = (6+3)/3 = 9/3 = 3' },
            { text: 'Verify the ratio using distance formula: AM = √[(6-2)² + (3-3)²] = 4; fountain to M = √[(6-14/3)² + (3-3)²] = √[(4/3)²].' },
            { text: 'State final answer with units: Fountain at (14/3, 3) or (4.67, 3) in coordinate units', faded: true, blankAnswer: 'Fountain coordinates: (14/3, 3) or approximately (4.67, 3)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_004', title: 'Section Formula: External Division',
          scaffold: { problem: 'A straight road passes through two milestones A(3, 7) and B(11, 19).',
            steps: [
            { text: 'Identify given points A(3, 7), B(11, 19). The condition AC = 3 × BC with C beyond B means C divides AB externally.' },
            { text: 'Write the external division formula: x = (mx₂ - nx₁)/(m - n), y = (my₂ - ny₁)/(m - n).' },
            { text: 'Substitute values: x = (3×11 - 1×3)/(3 - 1) = (33 - 3)/2 = 30/2 = 15. y = (3×19 - 1×7)/(3 - 1) = (57 - 7)/2 = 50/2 = 25.' },
            { text: 'Verify the result. Distance AB = √((11-3)² + (19-7)²) = √(64 + 144) = √208.' },
            { text: 'Interpret: Milestone C is at (15, 25), which lies on the line beyond B as required.', faded: true, blankAnswer: 'C(15, 25)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_005', title: 'Area of Triangle Using Coordinates',
          scaffold: { problem: 'A triangular plot of land in Gurugram has corners marked by GPS coordinates: A(3, 5), B(9, 2), C(4, 10).',
            steps: [
            { text: 'Identify the given coordinates: A(3,5), B(9,2), C(4,10). Note the cost rate: ₹15,000/m².' },
            { text: 'Write the area formula: Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|.' },
            { text: 'Substitute the coordinates carefully: x₁=3, y₁=5; x₂=9, y₂=2; x₃=4, y₃=10. Area = ½ |3(2−10) + 9(10−5) + 4(5−2)|.' },
            { text: 'Compute inside brackets: 3(−8) + 9(5) + 4(3) = −24 + 45 + 12 = 33.' },
            { text: 'Apply absolute value and ½: Area = ½ × |33| = 16.5 square metres.' },
            { text: 'Compute cost: Cost = Area × Rate = 16.5 × 15,000 = ₹2,47,500.', faded: true, blankAnswer: '₹2,47,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_006', title: 'Slope of a Line: Definition and Formula',
          scaffold: { problem: 'A hill road in Himachal Pradesh rises from an elevation of 1,200 metres at the 5 km marker to 1,650 metres at the 12 km marker.',
            steps: [
            { text: 'Identify the two points. Let x be distance along road (km), y be elevation (m). Point A: (5, 1200), Point B: (12, 1650).' },
            { text: 'Write the slope formula: m = (y₂ - y₁)/(x₂ - x₁). Substitute: m = (1650 - 1200)/(12 - 5).' },
            { text: 'Compute numerator (rise): 1650 - 1200 = 450 m. Compute denominator (run): 12 - 5 = 7 km = 7000 m.' },
            { text: 'Calculate slope: m = 450/7000 = 45/700 = 9/140 ≈ 0.0643. As a ratio: 1 : 15.56 (since 1/0.0643 ≈ 15.56).' },
            { text: 'Interpret: For every 100 metres horizontally, the road rises about 6.43 metres.', faded: true, blankAnswer: 'Slope = 9/140 ≈ 0.0643; Ratio = 1 : 15.56; Percentage grade.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_10_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Plotting points for a geometry lab, a student marks the y-axis point 5 units up as (5, 0), places (−2, 0) \'in the second quadrant\', and for \'a point on the x-axis equidistant from A and B\' introduces two variables (x, y).',
            decisions: [{ prompt: 'Which coordinate conventions did he scramble?', options: [
                { text: 'Reset the conventions: (x, y) is (distance from y-axis, distance from x-axis) — a point on the y-axis has x = 0, so it\'s (0, 5). Points on axes belong to NO quadrant: (−2, 0) sits on the negative x-axis, the boundary between II and III. And \'on the x-axis\' fixes y = 0 — write the point (x, 0), then one equation in one variable solves it.', outcome: 'The lab sheet corrects: coordinates are an ordered address, axes are boundaries not regions, and a condition like \'on the x-axis\' should be used to eliminate a variable.' },
                { text: 'Keep (5, 0) for the y-axis point — the \'5\' is just the distance up.', outcome: 'First coordinate is always the x-measure: y-axis points have x = 0, so the address is (0, 5) — swapping loses the point entirely.', reveals: 'swapped-axis-coordinates' },
                { text: 'Keep \'second quadrant\' for (−2, 0) — negative x means left side, and left-top is quadrant II.', outcome: 'Quadrants are open regions: y = 0 puts the point ON the axis, a boundary shared by II and III — it belongs to neither.', reveals: 'axis-points-in-quadrants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Distance is just Pythagoras on a grid — horizontal leg, vertical leg, hypotenuse — no special case for points on axes.',
            decisions: [{ prompt: 'What comes next? Straight Lines · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Straight Lines · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_10_001', difficulty: 'standard',
          question: 'In the Cartesian coordinate system, a point is uniquely identified by.',
          hint: 'If stuck, review Class 9 Maths Chapter 3 (Coordinate Geometry): plotting points and.',
          misconception: 'Students often write coordinates as (y, x) instead of (x, y), especially when the point is on an axis (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'What are the coordinates of a point that lies on the positive x-axis at a distance of 5 units from the origin?', answer: 'The coordinates are (5, 0)',
                  options: ['The coordinates are (5, 0)', 'the first coordinate is vertical distance'],
                  hint: 'If stuck, review Class 9 Maths Chapter 3 (Coordinate Geometry): plotting points and identifying.',
                  misconception: 'Students often write coordinates as (y, x) instead of (x, y), especially when the point is on an axis (e.g., writing (0, 5) for a point.' }
          ],
            remediations: { 'students-often-write-coordinates-as': { steps: ['If a student writes (y, x), have them physically walk the steps: "Start at origin, move 3 steps right (x), then 2 steps.', 'Now write the numbers in the order you moved." Use a grid on the floor with tape.', 'For axis confusion, ask: "If you are on the y-axis, how far are you from the y-axis?', 'So x = 0." For quadrant numbering, draw the axes, label I at top-right, then go anticlockwise: II top-left, III.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_002', difficulty: 'standard',
          question: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch1_4 (Distance Formula: Derivation Using.',
          misconception: 'Students often incorrectly apply the distance formula when one or both points lie on an axis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian',
                  options: ['The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The section formula for internal division gives the coordinates of a point P(x, y) that', 'If a point P(x, y) divides the line segment joining two points A(x₁, y₁) and B(x₂, y₂)'],
                  hint: 'If stuck, revisit Class 9 node c9_math_ch1_4 (Distance Formula: Derivation Using Pythagoras.',
                  misconception: 'Students often incorrectly apply the distance formula when one or both points lie on an axis.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['If a student struggles with axis points: 1) Have them plot (0, -2) and (0, 4) on graph paper and count squares.', '2) Show that the distance formula gives \\(\\sqrt{(0-0)^2 + (4 - (-2))^2} = \\sqrt{36} = 6\\), matching the count.', '3) Emphasise that the formula works for ALL points; the zero difference in x is automatic.', 'For the equidistant problem: 1) Ask "What is the y-coordinate of ANY point on the x-axis?" (Answer: 0).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_003', difficulty: 'standard',
          question: 'The section formula for internal division gives the coordinates of a point P(x.',
          hint: 'Review Class 8 proportional reasoning (c8_math_ch7_5, c8_math_ch7_7) and Class 9.',
          misconception: 'Students consistently reverse the weights in the section formula, writing x = (mx₁ + nx₂)/(m+n) instead of x = (mx₂.',
          parts: [
                { id: 'a', prompt: 'The midpoint of AB is M(3, 4). Point P divides AB internally in the ratio 1:3. If A has coordinates (1, 2), find the coordinates of B and P.', answer: 'Using midpoint formula: (1+x₂)/2 = 3 → x₂ = 5',
                  options: ['Using midpoint formula: (1+x₂)/2 = 3 → x₂ = 5', 'midpoint', 'internal division in given ratio'],
                  hint: 'Review Class 8 proportional reasoning (c8_math_ch7_5, c8_math_ch7_7) and Class 9 coordinate.',
                  misconception: 'Students consistently reverse the weights in the section formula, writing x = (mx₁ + nx₂)/(m+n) instead of x = (mx₂ + nx₁)/(m+n).' }
          ],
            remediations: { 'students-consistently-reverse-the-weights': { steps: ['Have the student draw the line segment with A on left, B on right. Mark point P closer to A.', 'Write the similar triangle proportion: (x - x₁)/(x₂ - x) = m/n.', 'Cross-multiply: n(x - x₁) = m(x₂ - x).', 'Expand: nx - nx₁ = mx₂ - mx.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_004', difficulty: 'standard',
          question: 'If a point P(x, y) divides the line segment joining two points A(x₁, y₁) and.',
          hint: 'Review the derivation of internal division formula (c11_math_cbse_10_003) and practice.',
          misconception: 'Students consistently write the external division formula as ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)) - identical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'If a point P(x, y) divides the line segment joining two points A(x₁, y₁) and B(x₂, y₂)',
                  options: ['If a point P(x, y) divides the line segment joining two points A(x₁, y₁) and B(x₂, y₂)', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division gives the coordinates of a point P(x, y) that'],
                  hint: 'Review the derivation of internal division formula (c11_math_cbse_10_003) and practice directed.',
                  misconception: 'Students consistently write the external division formula as ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)) - identical to internal division.' }
          ],
            remediations: { 'students-consistently-write-the-external': { steps: ['Have the student draw a number line with points A=0, B=10. Ask: "Where is the point that divides AB externally in ratio.', 'Derive the formula using directed distances: AP = 3k, PB = 2k, but for external beyond B, AB = AP - PB = k.', 'Practice with m<n (point beyond A) to show denominator becomes negative.', 'Give 5 problems mixing internal and external, requiring the student to first decide which formula applies by checking.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_005', difficulty: 'standard',
          question: 'The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and.',
          hint: 'If stuck, revisit Class 10 determinant expansion (c10_math_cbse_02_007 Division Algorithm.',
          misconception: 'Students often write the area formula as ½ [x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)] without absolute value, then get.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃)',
                  options: ['The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃)', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division gives the coordinates of a point P(x, y) that'],
                  hint: 'If stuck, revisit Class 10 determinant expansion (c10_math_cbse_02_007 Division Algorithm for.',
                  misconception: 'Students often write the area formula as ½ [x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)] without absolute value, then get a negative answer and.' }
          ],
            remediations: { 'students-often-write-the-area': { steps: ['If a student gives negative area or forgets absolute value: 1) Ask them to plot the three points roughly and trace the.', '3) Make them write the formula with | | explicitly every time until it becomes automatic.', '4) Give a problem where they must find k such that area = 5, forcing them to write |expression| = 10 and split into two.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_006', difficulty: 'standard',
          question: 'The slope (or gradient) of a non-vertical line is defined as the tangent of the.',
          hint: 'If stuck, revisit Class 9 "Graph of a Linear Equation in Two Variables" (c9_math_ch2_5).',
          misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator.',
          parts: [
                { id: 'a', prompt: 'State the formula for the slope of a line passing through points A(x₁, y₁) and B(x₂, y₂). What is the slope of a horizontal line?', answer: 'The slope formula is m = (y₂ - y₁)/(x₂ - x₁) for x₁ ≠ x₂',
                  options: ['The slope formula is m = (y₂ - y₁)/(x₂ - x₁) for x₁ ≠ x₂', 'zero slope', 'undefined slope', 'vertical line slope is 0 or ∞'],
                  hint: 'If stuck, revisit Class 9 "Graph of a Linear Equation in Two Variables" (c9_math_ch2_5) and.',
                  misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator and denominator).' },
                { id: 'b', prompt: 'A line makes an angle of 135° with the positive x-axis. What is its slope?', answer: 'The slope is m = tan 135° = tan(180° - 45°) = -tan 45° = -1',
                  options: ['The slope is m = tan 135° = tan(180° - 45°) = -tan 45° = -1', 'upward'],
                  hint: 'If stuck, revisit Class 9 "Graph of a Linear Equation in Two Variables" (c9_math_ch2_5) and.',
                  misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator and denominator).' },
                { id: 'c', prompt: 'Two students calculate the slope of the line through A(3, 7) and B(3, -2). Student 1 writes m = (-2 - 7)/(3 - 3) = -9/0 = 0.', answer: 'Student 2 is correct',
                  options: ['Student 2 is correct', 'zero divided by a number', 'a number divided by zero'],
                  hint: 'If stuck, revisit Class 9 "Graph of a Linear Equation in Two Variables" (c9_math_ch2_5) and.',
                  misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator and denominator).' }
          ],
            remediations: { 'students-consistently-subtract-coordinates-in': { steps: ['If a student makes the order/substitution error, do not just say "remember rise over run".', 'Instead: (1) Have them label points clearly as (x₁, y₁) and (x₂, y₂) before substituting.', '(2) Make them write the formula m = (y₂ - y₁)/(x₂ - x₁) every time.', '(3) Use a coloured pencil: highlight y-coordinates in one colour, x-coordinates in another.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
