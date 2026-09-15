import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch10_p2: SimDef = {
    id: 'v3_c11_math_ch10_p2',
    title: 'Straight Lines · Part 2/3',
    subtitle: 'Learn that a point on an axis belongs to no quadrant at all.',
    classLevel: 11, subject: 'mathematics', topic: 'Straight Lines · Part 2/3',
    chapters: ['c11_math_ch10'],
    nodeIds: ['c11_math_cbse_10_007', 'c11_math_cbse_10_008', 'c11_math_cbse_10_009', 'c11_math_cbse_10_010', 'c11_math_cbse_10_011', 'c11_math_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a navigator reading signed distances from two axes', intro: 'Cinema seat = row plus seat number; a plane point = x then y — and the border seats belong to no quadrant.', goal: 'Plot points, classify quadrants and axes, and apply the distance formula.' },
    discovery: {
        question: 'Where does the point (0, −5) lie — fourth quadrant, since its y is negative?',
        options: ['Nowhere in a quadrant — it sits on the negative y-axis; quadrants need both coordinates non-zero', 'Fourth quadrant — negative y decides it', 'Third quadrant — negatives mean III', 'Second quadrant — axes count as quadrants'],
        answer: 'Nowhere in a quadrant — it sits on the negative y-axis; quadrants need both coordinates non-zero',
        hook: 'Axes are the borders, not the countries — and (3, 2) is not (2, 3); the ordered pair\'s order is the point\'s whole identity.',
    },
    teaching: [
        { title: 'Slope: Parallel and Perpendicular Lines', text: 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂). Two non-vertical lines are perpendicular if and only if the product of their slopes is -1 (m₁ × m₂ = -1).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_10_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Plot A(2,3), B(−2,3), C(−2,−3), D(2,−3) to see the square, then find the x-axis point equidistant from (2,3) and (4,5).',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_007', title: 'Slope: Parallel and Perpendicular Lines',
          scaffold: { problem: 'A railway track runs along the line 2x - 3y + 6 = 0. A new parallel track is to be laid passing through the station at (4, -1).',
            steps: [
            { text: 'Identify the slope of the given line. Rewrite 2x - 3y + 6 = 0 in slope-intercept form: 3y = 2x + 6 → y = (2/3)x + 2.' },
            { text: 'Since the new track is parallel, it has the same slope m = 2/3.' },
            { text: 'Use point-slope form with point (4, -1): y - (-1) = (2/3)(x - 4) → y + 1 = (2/3)(x - 4).' },
            { text: 'Simplify to general form: 3(y + 1) = 2(x - 4) → 3y + 3 = 2x - 8 → 2x - 3y - 11 = 0.' },
            { text: 'Verify: slope of new line is -A/B = -2/(-3) = 2/3, matches. Point (4, -1) satisfies: 2(4) - 3(-1) - 11 = 8 + 3 - 11.', faded: true, blankAnswer: '2x - 3y - 11 = 0' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_008', title: 'Angle Between Two Lines',
          scaffold: { problem: 'A ramp for wheelchair access in a Delhi metro station must make an angle of 30° with the horizontal ground.',
            steps: [
            { text: 'Identify given values: slope of walkway m₁ = 1/√3, angle θ = 30°, tan 30° = 1/√3. Let ramp slope = m₂.' },
            { text: 'Use the angle formula tan θ = |(m₁ - m₂)/(1 + m₁m₂)|. Substitute: 1/√3 = |(1/√3 - m₂)/(1 + (1/√3)m₂)|.' },
            { text: 'Remove absolute value by considering two cases: Case A: (1/√3 - m₂)/(1 + m₂/√3) = 1/√3.' },
            { text: 'Solve Case A: Cross-multiply: √3(1/√3 - m₂) = 1 + m₂/√3 → 1 - √3 m₂ = 1 + m₂/√3 → -√3 m₂ - m₂/√3 = 0 → m₂(-√3 - 1/√3).' },
            { text: 'Solve Case B: Cross-multiply: √3(1/√3 - m₂) = -1 - m₂/√3 → 1 - √3 m₂ = -1 - m₂/√3 → 2 = √3 m₂ - m₂/√3 = m₂(√3 - 1/√3).' },
            { text: 'Verify both solutions: For m₂ = 0, tan θ = |(1/√3 - 0)/(1 + 0)| = 1/√3 → θ = 30° ✓.', faded: true, blankAnswer: 'The two possible slopes for the ramp are m₂ = 0 and m₂.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_009', title: 'Various Forms of Line: Point-Slope Form',
          scaffold: { problem: 'A ramp for a wheelchair is to be built with a slope of 1/12 (rise:run).',
            steps: [
            { text: 'Identify the given slope m = 1/12 and the point (x_1, y_1) = (2, 0.5). Note: horizontal distance is x, height is y.' },
            { text: 'Write the point-slope form: y - y_1 = m(x - x_1).' },
            { text: 'Substitute the values: y - 0.5 = (1/12)(x - 2).' },
            { text: 'Simplify to slope-intercept form: y = (1/12)x - 2/12 + 0.5 = (1/12)x - 1/6 + 1/2 = (1/12)x + 1/3.' },
            { text: 'To find the height at x = 5, substitute x = 5: y = (1/12)*5 + 1/3 = 5/12 + 4/12 = 9/12 = 0.75 metres.' },
            { text: 'Interpret: The ramp height at 5 metres from the wall is 0.75 m.', faded: true, blankAnswer: 'Equation: y = (1/12)x + 1/3; Height at x=5 m is 0.75 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_010', title: 'Various Forms of Line: Two-Point Form',
          scaffold: { problem: 'A straight railway track passes through two stations A and B. Station A is located at coordinates (2 km, 3 km) and station B at (8 km, 15.',
            steps: [
            { text: 'Identify the coordinates: \\(A(2, 3)\\) and \\(B(8, 15)\\). Let \\((x_1, y_1) = (2, 3)\\) and \\((x_2, y_2) = (8, 15)\\).' },
            { text: 'Compute the slope \\(m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{15 - 3}{8 - 2} = \\frac{12}{6} = 2\\).' },
            { text: 'Use the two-point form: \\(y - y_1 = m(x - x_1) \\Rightarrow y - 3 = 2(x - 2)\\).' },
            { text: 'Simplify to slope-intercept form: \\(y - 3 = 2x - 4 \\Rightarrow y = 2x - 1\\).' },
            { text: 'The y-intercept is \\(c = -1\\). The track crosses the y-axis at \\((0, -1)\\).', faded: true, blankAnswer: 'Equation: \\(y = 2x - 1\\); y-intercept distance = 1 km.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_011', title: 'Various Forms of Line: Slope-Intercept Form',
          scaffold: { problem: 'A mobile phone plan charges a fixed monthly rental of ₹299 plus ₹1.50 per minute of calls.',
            steps: [
            { text: 'Identify the fixed cost (y-intercept) = ₹299 (cost when minutes = 0)' },
            { text: 'Identify the rate per minute (slope) = ₹1.50/minute' },
            { text: 'Write the equation in slope-intercept form: C = 1.50m + 299' },
            { text: 'For bill ₹479, substitute C = 479: 479 = 1.50m + 299' },
            { text: 'Solve: 1.50m = 180 → m = 180/1.50 = 120 minutes' },
            { text: 'Verify: 120 × 1.50 + 299 = 180 + 299 = 479 ✓', faded: true, blankAnswer: 'Equation: C = 1.5m + 299; Slope = 1.5 ₹/min; y-intercept.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_012', title: 'Various Forms of Line: Intercept Form',
          scaffold: { problem: 'A straight line passes through the point (4, -2) and its intercepts on the axes are equal in magnitude but opposite in sign.',
            steps: [
            { text: 'Let the intercepts be \\(a\\) and \\(b\\). Given \\(|a| = |b|\\) and opposite signs, so \\(b = -a\\).' },
            { text: 'Write the intercept form: \\(\\frac{x}{a} + \\frac{y}{-a} = 1\\) which simplifies to \\(\\frac{x - y}{a} = 1\\) or \\(x -.' },
            { text: 'Substitute the given point (4, -2): \\(4 - (-2) = a\\) → \\(a = 6\\).' },
            { text: 'Since \\(b = -a\\), \\(b = -6\\). Intercept form: \\(\\frac{x}{6} + \\frac{y}{-6} = 1\\) or \\(\\frac{x}{6} - \\frac{y}{6} = 1\\).' },
            { text: 'Convert to general form: Multiply by 6: \\(x - y = 6\\) → \\(x - y - 6 = 0\\).' },
            { text: 'Verify: x-intercept (set y=0): x=6 ✓; y-intercept (set x=0): -y=6 → y=-6 ✓; point (4,-2): 4-(-2)=6 ✓.', faded: true, blankAnswer: 'Intercept form: \\(\\frac{x}{6} - \\frac{y}{6} = 1\\); General.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_10_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Plotting points for a geometry lab, a student marks the y-axis point 5 units up as (5, 0), places (−2, 0) \'in the second quadrant\', and for \'a point on the x-axis equidistant from A and B\' introduces two variables (x, y).',
            decisions: [{ prompt: 'Which coordinate conventions did he scramble?', options: [
                { text: 'Reset the conventions: (x, y) is (distance from y-axis, distance from x-axis) — a point on the y-axis has x = 0, so it\'s (0, 5). Points on axes belong to NO quadrant: (−2, 0) sits on the negative x-axis, the boundary between II and III. And \'on the x-axis\' fixes y = 0 — write the point (x, 0), then one equation in one variable solves it.', outcome: 'The lab sheet corrects: coordinates are an ordered address, axes are boundaries not regions, and a condition like \'on the x-axis\' should be used to eliminate a variable.' },
                { text: 'Keep (5, 0) for the y-axis point — the \'5\' is just the distance up.', outcome: 'First coordinate is always the x-measure: y-axis points have x = 0, so the address is (0, 5) — swapping loses the point entirely.', reveals: 'swapped-axis-coordinates' },
                { text: 'Keep \'second quadrant\' for (−2, 0) — negative x means left side, and left-top is quadrant II.', outcome: 'Quadrants are open regions: y = 0 puts the point ON the axis, a boundary shared by II and III — it belongs to neither.', reveals: 'axis-points-in-quadrants' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'Distance is just Pythagoras on a grid — horizontal leg, vertical leg, hypotenuse — no special case for points on axes.',
            decisions: [{ prompt: 'What comes next? Straight Lines · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Straight Lines · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_10_007', difficulty: 'standard',
          question: 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁.',
          hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and.',
          misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead.',
          parts: [
                { id: 'a', prompt: 'State the condition for two lines with slopes m₁ and m₂ to be (i) parallel, (ii) perpendicular. What is the slope of a line parallel to the y-axis?', answer: '(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)',
                  options: ['(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)', 'm₁ = -m₂ for perpendicular', 'slope of y-axis is 0', 'negative'],
                  hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and practice.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' },
                { id: 'b', prompt: 'Explain why the product of slopes of two perpendicular lines is -1, using the concept of inclination angles.', answer: 'If lines have inclinations θ₁ and θ₂, perpendicular means θ₂ = θ₁ + 90°',
                  options: ['If lines have inclinations θ₁ and θ₂, perpendicular means θ₂ = θ₁ + 90°', 'negative'],
                  hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and practice.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' },
                { id: 'c', prompt: 'Line L₁ passes through (2, 5) and (4, 9). Line L₂ passes through (1, 3) and (5, 11). Are L₁ and L₂ parallel, perpendicular, or neither? Show your calculations.', answer: 'Slope of L₁ = (9-5)/(4-2) = 4/2 = 2',
                  options: ['Slope of L₁ = (9-5)/(4-2) = 4/2 = 2', 'negative'],
                  hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and practice.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' },
                { id: 'd', prompt: 'Given line L: 3x - 4y + 7 = 0. Find the slope of a line perpendicular to L. Then write the equation of the line through (2, -3) that is perpendicular to L.', answer: 'Rewrite L as 4y = 3x + 7 → y = (3/4)x + 7/4, so m_L = 3/4',
                  options: ['Rewrite L as 4y = 3x + 7 → y = (3/4)x + 7/4, so m_L = 3/4', 'negative'],
                  hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and practice.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' }
          ],
            remediations: { 'perpendicular-lines-have-slopes-that': { steps: ['If a student writes m₂ = -m₁ for perpendicular, ask: "If one line has slope 2, what angle does it make with the x-axis?', 'What angle would a line with slope -2 make?', 'Approximately -63° (or 117°).', 'Now compute the negative reciprocal: -1/2.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead.',
          parts: [
                { id: 'a', prompt: 'Create a real-world problem involving parallel or perpendicular lines in coordinate geometry (e.g., roads, architecture, sports).', answer: 'Example: A straight road runs along the line y = 0.5x + 10 (in km)',
                  options: ['Example: A straight road runs along the line y = 0.5x + 10 (in km)', 'negative'],
                  hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and practice.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' }
          ],
            remediations: { 'perpendicular-lines-have-slopes-that': { steps: ['If a student writes m₂ = -m₁ for perpendicular, ask: "If one line has slope 2, what angle does it make with the x-axis?', 'What angle would a line with slope -2 make?', 'Approximately -63° (or 117°).', 'Now compute the negative reciprocal: -1/2.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_008', difficulty: 'standard',
          question: 'The angle between two intersecting lines is defined as the acute angle θ (0° ≤.',
          hint: 'If stuck, revisit c11_math_cbse_10_006 (slope definition and calculation) and Class 10.',
          misconception: 'Students incorrectly apply the formula tan θ = (m₁ - m₂)/(1 + m₁m₂) without absolute value, then report a negative.',
          parts: [
                { id: 'a', prompt: 'Line L₁ passes through (2, 3) and (5, 7). Line L₂ has equation 2x - 3y + 6 = 0.', answer: 'Slope of L₁: m₁ = (7-3)/(5-2) = 4/3',
                  options: ['Slope of L₁: m₁ = (7-3)/(5-2) = 4/3', 'obtuse'],
                  hint: 'If stuck, revisit c11_math_cbse_10_006 (slope definition and calculation) and Class 10 trigonometry.',
                  misconception: 'Students incorrectly apply the formula tan θ = (m₁ - m₂)/(1 + m₁m₂) without absolute value, then report a negative angle or an obtuse angle.' }
          ],
            remediations: { 'students-incorrectly-apply-the-formula': { steps: ['If a student omits the absolute value, have them: (1) Draw two intersecting lines with slopes 1 and 2 on graph paper.', '(2) Compute both tan(θ₁ - θ₂) and tan(θ₂ - θ₁) to see they are opposites.', '(3) Explain that the formula without absolute value gives the directed angle from line 2 to line 1, but "angle between.', '(4) Practice 5 problems where they must explicitly write "| |" and state "acute angle = tan⁻¹(|...|)".'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_009', difficulty: 'standard',
          question: 'The point-slope form of a straight line states that if a line has slope \\(m\\).',
          hint: 'If stuck, revisit the slope formula (c11_math_cbse_10_006) and practice substituting.',
          misconception: 'Students often write the point-slope form as \\(y - y_1 = m(x + x_1)\\) or \\(y + y_1 = m(x - x_1)\\) by misplacing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The point-slope form of a straight line states that if a line has slope \\(m\\) and passes',
                  options: ['The point-slope form of a straight line states that if a line has slope \\(m\\) and passes', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division gives the coordinates of a point P(x, y) that'],
                  hint: 'If stuck, revisit the slope formula (c11_math_cbse_10_006) and practice substituting negative.',
                  misconception: 'Students often write the point-slope form as \\(y - y_1 = m(x + x_1)\\) or \\(y + y_1 = m(x - x_1)\\) by misplacing the signs of the.' }
          ],
            remediations: { 'students-often-write-the-point': { steps: ['To fix this, have the student explicitly write down the coordinates of the given point as \\((x_1, y_1)\\) with their.', 'Then write the formula \\(y - y_1 = m(x - x_1)\\).', 'Substitute the values step by step: if \\(x_1 = -2\\), then \\(x - (-2) = x + 2\\).', 'Practice with points having negative coordinates until the substitution becomes automatic.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_010', difficulty: 'standard',
          question: 'The two-point form gives the equation of a straight line passing through two.',
          hint: 'If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) and c11_math_cbse_10_009.',
          misconception: 'Students often write the two-point form as \\(y - y_1 = \\frac{y_2 - y_1}{x_1 - x_2}(x - x_1)\\) (swapping the.',
          parts: [
                { id: 'a', prompt: 'Explain why the two-point form \\(y - y_1 = \\frac{y_2 - y_1}{x_2 - x_1}(x - x_1)\\) fails when \\(x_1 = x_2\\), and describe the geometric meaning of this failure.', answer: 'The formula fails',
                  options: ['The formula fails', 'the line doesn\'t exist', 'the slope is zero'],
                  hint: 'If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) and c11_math_cbse_10_009 (Point-Slope.',
                  misconception: 'Students often write the two-point form as \\(y - y_1 = \\frac{y_2 - y_1}{x_1 - x_2}(x - x_1)\\) (swapping the x-differences) and do not.' }
          ],
            remediations: { 'students-often-write-the-two': { steps: ['If a student makes the sign error, have them compute the slope twice: once as \\(\\frac{y_2 - y_1}{x_2 - x_1}\\) and once.', 'Then emphasise that the point-slope form must use the same point that was used as the "first" point in the slope.', 'For the vertical line case, draw a vertical line on graph paper, pick two points on it, and ask them to compute the.', 'They will see the denominator is zero.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_011', difficulty: 'standard',
          question: 'The slope-intercept form of a straight line is the equation y = mx + c, where.',
          hint: 'If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) to reinforce m = (y₂-y₁)/(x₂-x₁).',
          misconception: 'Students treat the slope-intercept form y = mx + c as only applicable when the y-intercept is positive.',
          parts: [
                { id: 'a', prompt: 'Write the slope-intercept form of a line with slope 3/4 and y-intercept -2. Then state the coordinates of the point where this line crosses the y-axis.', answer: 'The equation is y = (3/4)x - 2',
                  options: ['The equation is y = (3/4)x - 2', 'intercept = -2 means x = -2', '"intercept = -2 means x = -2"'],
                  hint: 'If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) to reinforce m = (y₂-y₁)/(x₂-x₁) = tan θ.',
                  misconception: 'Students treat the slope-intercept form y = mx + c as only applicable when the y-intercept is positive.' }
          ],
            remediations: { 'students-treat-the-slope-intercept': { steps: ['Have the student write the conversion steps vertically: 2x + 3y - 6 = 0 → 3y = -2x + 6 → y = (-2/3)x + 2.', 'Circle the coefficient of x including its sign: (-2/3). Say: "This ENTIRE number, with its sign, is m."', 'Circle the constant term including its sign: +2. Say: "This ENTIRE number, with its sign, is c."', 'Practice with 5 equations where m and c have various sign combinations: (+, +), (+, -), (-, +), (-, -), (0, +).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_012', difficulty: 'standard',
          question: 'The intercept form of a straight line is the equation of a line that makes.',
          hint: 'If stuck, revisit c11_math_cbse_10_010 (Two-Point Form) and practice deriving intercept.',
          misconception: 'Students confuse the intercept form \\(\\frac{x}{a} + \\frac{y}{b} = 1\\) with the general form \\(Ax + By = C\\) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The intercept form of a straight line is the equation of a line that makes non-zero',
                  options: ['The intercept form of a straight line is the equation of a line that makes non-zero', 'In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'The section formula for internal division gives the coordinates of a point P(x, y) that'],
                  hint: 'If stuck, revisit c11_math_cbse_10_010 (Two-Point Form) and practice deriving intercept form.',
                  misconception: 'Students confuse the intercept form \\(\\frac{x}{a} + \\frac{y}{b} = 1\\) with the general form \\(Ax + By = C\\) and directly read intercepts.' }
          ],
            remediations: { 'students-confuse-the-intercept-form': { steps: ['If a student makes this error, have them: (1) Find intercepts by substitution method first (set x=0, find y; set y=0.', '(2) Write the intercept form using those values as denominators.', '(3) Compare with the original equation to see the division step needed.', '(4) Practice converting 5 equations from general to intercept form by dividing by the constant term, then verify.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
