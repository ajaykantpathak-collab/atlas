import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch10_p3 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch10_p3: SimDef = {
    id: 'v3_c11_math_ch10_p3',
    title: 'Straight Lines · Part 3/3',
    subtitle: 'Learn that a point on an axis belongs to no quadrant at all.',
    classLevel: 11, subject: 'mathematics', topic: 'Straight Lines · Part 3/3',
    chapters: ['c11_math_ch10'],
    nodeIds: ['c11_math_cbse_10_013', 'c11_math_cbse_10_014', 'c11_math_cbse_10_015', 'c11_math_cbse_10_016'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a navigator reading signed distances from two axes', intro: 'Cinema seat = row plus seat number; a plane point = x then y — and the border seats belong to no quadrant.', goal: 'Plot points, classify quadrants and axes, and apply the distance formula.' },
    discovery: {
        question: 'Where does the point (0, −5) lie — fourth quadrant, since its y is negative?',
        options: ['Nowhere in a quadrant — it sits on the negative y-axis; quadrants need both coordinates non-zero', 'Fourth quadrant — negative y decides it', 'Third quadrant — negatives mean III', 'Second quadrant — axes count as quadrants'],
        answer: 'Nowhere in a quadrant — it sits on the negative y-axis; quadrants need both coordinates non-zero',
        hook: 'Axes are the borders, not the countries — and (3, 2) is not (2, 3); the ordered pair\'s order is the point\'s whole identity.',
    },
    teaching: [
        { title: 'Normal Form of a Line', text: 'The normal form of a straight line is the equation x cos α + y sin α = p, where p is the perpendicular distance from the origin to the line (p ≥ 0), and α is the angle that this perpendicular makes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_10_013', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Plot A(2,3), B(−2,3), C(−2,−3), D(2,−3) to see the square, then find the x-axis point equidistant from (2,3) and (4,5).',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_013', title: 'Normal Form of a Line',
          scaffold: { problem: 'A straight road passes through the points (4, 0) and (0, 3) on a city map where the origin is the town hall.',
            steps: [
            { text: 'Find the equation of the line through (4,0) and (0,3) using two-point form: (y - 0)/(3 - 0) = (x - 4)/(0 - 4) → y/3.' },
            { text: 'Compute the normalizing factor √(A² + B²) = √(3² + 4²) = √(9 + 16) = √25 = 5.' },
            { text: 'Since C = -12 < 0, divide the entire equation by +5 (positive root) to make the constant positive: (3x + 4y - 12)/5 = 0.' },
            { text: 'Compare with x cos α + y sin α = p. We have cos α = 3/5, sin α = 4/5, p = 12/5 = 2.4.' },
            { text: 'Interpret: The shortest distance from town hall (origin) to the road is 2.4 units (say km).', faded: true, blankAnswer: 'Normal form: (3/5)x + (4/5)y = 12/5 or 0.6x + 0.8y = 2.4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_014', title: 'Distance of a Point from a Line',
          scaffold: { problem: 'A straight road passes through points \\(A(1, 2)\\) and \\(B(4, 6)\\). A school is located at \\(P(-2, 3)\\).',
            steps: [
            { text: 'Find the equation of the line (road) through A and B. Slope \\(m = \\frac{6-2}{4-1} = \\frac{4}{3}\\).' },
            { text: 'Convert to general form \\(Ax+By+C=0\\). Multiply by 3: \\(3y - 6 = 4x - 4\\) → \\(4x - 3y + 2 = 0\\). So \\(A=4, B=-3, C=2\\).' },
            { text: 'Identify point coordinates: \\(x_1 = -2, y_1 = 3\\).' },
            { text: 'Apply distance formula: \\(d = \\frac{|4(-2) + (-3)(3) + 2|}{\\sqrt{4^2 + (-3)^2}} = \\frac{|-8 -9 + 2|}{\\sqrt{16+9}}.' },
            { text: 'Interpret: The shortest distance from the school to the road is 3 units (e.g., km).', faded: true, blankAnswer: '3 units' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_015', title: 'Distance Between Parallel Lines',
          scaffold: { problem: 'A road in a city plan is bordered by two parallel boundary lines.',
            steps: [
            { text: 'Verify the lines are parallel. First line: \\(A_1 = 3, B_1 = -4\\). Second line: \\(A_2 = 6, B_2 = -8\\).' },
            { text: 'The distance formula requires identical \\(A, B\\) coefficients.' },
            { text: 'Identify constants: For first line \\(C_1 = 12\\). For the scaled second line \\(C_2 = -2.5\\).' },
            { text: 'Apply the formula \\(d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}} = \\frac{|12 - (-2.5)|}{\\sqrt{3^2 + (-4)^2}}.' },
            { text: 'Convert to metres: \\(2.9 \\text{ units} \\times 10 \\text{ m/unit} = 29 \\text{ metres}\\).', faded: true, blankAnswer: '29 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_016', title: 'Locus of a Point: Definition and Examples',
          scaffold: { problem: 'A lamp post is to be placed on a straight road (the x-axis) such that it is equidistant from two houses located at A(2, 5) and B(8, 1).',
            steps: [
            { text: 'Identify the geometric condition. The lamp post L lies on x-axis (y = 0) and is equidistant from A(2, 5) and B(8, 1).' },
            { text: 'Find the midpoint M of AB using section formula (internal division, ratio 1:1). M = ((2+8)/2, (5+1)/2) = (5, 3).' },
            { text: 'Find slope of AB. m_AB = (1 - 5)/(8 - 2) = -4/6 = -2/3. The perpendicular bisector has slope m = -1/m_AB = 3/2.' },
            { text: 'Write equation of perpendicular bisector through M(5, 3) with slope 3/2 using point-slope form: y - 3 = (3/2)(x - 5).' },
            { text: 'Find lamp post coordinates. Since it lies on x-axis, y = 0. Substitute in locus equation: 3x - 0 - 9 = 0 → x = 3.' },
            { text: 'Verify. Distance from (3,0) to A(2,5) = √[(3-2)²+(0-5)²] = √26. Distance to B(8,1) = √[(3-8)²+(0-1)²] = √26.', faded: true, blankAnswer: 'Locus equation: 3x - 2y - 9 = 0; Lamp post coordinates: (3.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_10_016', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Plotting points for a geometry lab, a student marks the y-axis point 5 units up as (5, 0), places (−2, 0) \'in the second quadrant\', and for \'a point on the x-axis equidistant from A and B\' introduces two variables (x, y).',
            decisions: [{ prompt: 'Which coordinate conventions did he scramble?', options: [
                { text: 'Reset the conventions: (x, y) is (distance from y-axis, distance from x-axis) — a point on the y-axis has x = 0, so it\'s (0, 5). Points on axes belong to NO quadrant: (−2, 0) sits on the negative x-axis, the boundary between II and III. And \'on the x-axis\' fixes y = 0 — write the point (x, 0), then one equation in one variable solves it.', outcome: 'The lab sheet corrects: coordinates are an ordered address, axes are boundaries not regions, and a condition like \'on the x-axis\' should be used to eliminate a variable.' },
                { text: 'Keep (5, 0) for the y-axis point — the \'5\' is just the distance up.', outcome: 'First coordinate is always the x-measure: y-axis points have x = 0, so the address is (0, 5) — swapping loses the point entirely.', reveals: 'swapped-axis-coordinates' },
                { text: 'Keep \'second quadrant\' for (−2, 0) — negative x means left side, and left-top is quadrant II.', outcome: 'Quadrants are open regions: y = 0 puts the point ON the axis, a boundary shared by II and III — it belongs to neither.', reveals: 'axis-points-in-quadrants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_10_016', title: 'You made it',
          caseStudy: { intro: 'Distance is just Pythagoras on a grid — horizontal leg, vertical leg, hypotenuse — no special case for points on axes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_10_013', difficulty: 'standard',
          question: 'The normal form of a straight line is the equation x cos α + y sin α = p, where.',
          hint: 'If stuck, revisit c11_math_cbse_10_007 (perpendicular lines condition) and.',
          misconception: 'Students incorrectly apply the sign rule when converting from general form Ax + By + C = 0 to normal form.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: L₁: x cos 30° + y sin 30° = 4 and L₂: x cos 210° + y sin 210° = 4. Are these the same line or different lines?', answer: 'They are different lines',
                  options: ['They are different lines', 'same line'],
                  hint: 'If stuck, revisit c11_math_cbse_10_007 (perpendicular lines condition) and c11_math_cbse_10_002.',
                  misconception: 'Students incorrectly apply the sign rule when converting from general form Ax + By + C = 0 to normal form.' }
          ],
            remediations: { 'students-incorrectly-apply-the-sign': { steps: ['If a student gets negative p or wrong α, follow these steps: 1) Write the general form Ax + By + C = 0 clearly.', 'If C > 0, multiply the whole equation by -1 first (making C negative), THEN divide by +√(A²+B²).', 'If C < 0, directly divide by +√(A²+B²).', '4) The resulting equation will have positive constant = p.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_014', difficulty: 'standard',
          question: 'The perpendicular distance from a point \\(P(x_1, y_1)\\) to a line \\(L: Ax +.',
          hint: 'Review the conversion between different forms of a line (nodes c11_math_cbse_10_009.',
          misconception: 'Students often forget to convert the line equation to the general form \\(Ax+By+C=0\\) before identifying \\(A, B, C\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The perpendicular distance from a point \\(P(x_1, y_1)\\) to a line \\(L: Ax + By + C = 0\\)',
                  options: ['The perpendicular distance from a point \\(P(x_1, y_1)\\) to a line \\(L: Ax + By + C = 0\\)', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division gives the coordinates of a point P(x, y) that'],
                  hint: 'Review the conversion between different forms of a line (nodes c11_math_cbse_10_009.',
                  misconception: 'Students often forget to convert the line equation to the general form \\(Ax+By+C=0\\) before identifying \\(A, B, C\\).' }
          ],
            remediations: { 'students-often-forget-to-convert': { steps: ['If a student makes the conversion error, guide them through a two-step process: (1) Write the line equation with all.', '(2) Identify \\(A, B, C\\) as the coefficients of \\(x, y,\\) and the constant term respectively.', 'Practice with multiple forms: slope-intercept, intercept form, normal form.', 'For absolute value errors, emphasize that distance is a length and cannot be negative; show a case where.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_015', difficulty: 'standard',
          question: 'The distance between two parallel lines is the length of the perpendicular.',
          hint: 'If stuck, revisit c11_math_cbse_10_014 (Distance of a Point from a Line) and practice.',
          misconception: 'Students apply the distance formula \\(d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}\\) directly to parallel lines given.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two parallel lines is the length of the perpendicular segment drawn',
                  options: ['The distance between two parallel lines is the length of the perpendicular segment drawn', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division gives the coordinates of a point P(x, y) that'],
                  hint: 'If stuck, revisit c11_math_cbse_10_014 (Distance of a Point from a Line) and practice: "Find.',
                  misconception: 'Students apply the distance formula \\(d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}\\) directly to parallel lines given in different scaled.' }
          ],
            remediations: { 'students-apply-the-distance-formula': { steps: ['If a student makes this error, do NOT just say "divide by 2." Instead: 1) Ask: "Are these two equations representing.', '2) Point out: "The line hasn\'t changed, but \\(C\\) changed from 10 to 5.', 'Distance cannot depend on how we write the equation." 3) Show: "The formula uses the normal vector \\((A, B)\\).', 'If we scale the equation, the normal scales too, so \\(\\sqrt{A^2 + B^2}\\) scales, but \\(C_1 - C_2\\) also scales — the.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_016', difficulty: 'standard',
          question: 'The locus of a point is the set of all points in a plane that satisfy a given.',
          hint: 'If stuck, revisit c11_math_cbse_10_002 (Distance Formula) and practice radical equations.',
          misconception: 'Students often treat locus problems as "find the equation of a line/circle" without first identifying the geometric.',
          parts: [
                { id: 'a', prompt: 'Explain why the equation obtained after simplifying the condition PA = PB for points A(1, 2) and B(5, 6) represents the perpendicular bisector of AB, and not.', answer: 'The condition PA = PB means P is equidistant from A and B',
                  options: ['The condition PA = PB means P is equidistant from A and B', 'it passes through midpoint so it\'s the bisector', 'all points on any line through midpoint are equidistant'],
                  hint: 'If stuck, revisit c11_math_cbse_10_002 (Distance Formula) and practice radical equations: isolate.',
                  misconception: 'Students often treat locus problems as "find the equation of a line/circle" without first identifying the geometric shape from the.' },
                { id: 'b', prompt: 'A point P moves such that the sum of its distances from two fixed points A(-4, 0) and B(4, 0) is always 10.', answer: 'Let P(x, y)',
                  options: ['Let P(x, y)', 'it\'s a circle because distance sum is constant'],
                  hint: 'If stuck, revisit c11_math_cbse_10_002 (Distance Formula) and practice radical equations: isolate.',
                  misconception: 'Students often treat locus problems as "find the equation of a line/circle" without first identifying the geometric shape from the.' }
          ],
            remediations: { 'students-often-treat-locus-problems': { steps: ['If a student makes the cross-term error, guide them through: (1) Write the condition with radicals explicitly: √A + √B.', '(2) Isolate one radical: √A = k - √B.', '(3) Square both sides: A = k² + B - 2k√B.', '(4) Isolate the remaining radical: 2k√B = k² + B - A.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
