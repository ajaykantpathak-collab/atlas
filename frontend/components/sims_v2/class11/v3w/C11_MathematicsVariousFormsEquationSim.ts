import type { SimDef } from '../../engine/types';
import C11_MathematicsVariousFormsEquationSim from '../../../simulations/c6_12/C11_MathematicsVariousFormsEquationSim';

/** v3 wrapped master — C11_MathematicsVariousFormsEquationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsvariousformsequationsim: SimDef = {
    id: 'v3w_c11_mathematicsvariousformsequationsim',
    title: 'Various Forms Equation',
    subtitle: 'Covers slope criteria for parallelism and perpendicularity of straight lines in the.',
    classLevel: 11, subject: 'mathematics', topic: 'Slope: Parallel and Perpendicular Lines',
    chapters: [],
    nodeIds: ['c11_math_cbse_10_007', 'c11_math_cbse_10_005', 'c11_math_cbse_10_006', 'c11_math_cbse_10_008', 'c11_math_cbse_10_009', 'c11_math_cbse_10_010', 'c11_math_cbse_10_011', 'c11_math_cbse_10_012', 'c11_math_cbse_10_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are designing a rectangular garden bed in your backyard.', goal: 'Master Various Forms Equation.' },
    discovery: {
        question: 'State the condition for two lines with slopes m₁ and m₂ to be (i) parallel, (ii) perpendicular. What is the slope of a line parallel to the y-axis?',
        options: ['(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)', 'm₁ = -m₂ for perpendicular', 'slope of y-axis is 0'],
        answer: '(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)',
        hook: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of.',
    },
    teaching: [
        { title: 'Two non-vertical lines are parallel if and.', text: 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂). Two non-vertical lines are perpendicular if and only if the product of their slopes is -1 (m₁ × m₂ = -1).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_007', title: 'Two non-vertical lines are parallel if.',
          scaffold: { problem: 'A railway track runs along the line 2x - 3y + 6 = 0. A new parallel track is to be laid passing through the station at (4, -1).',
            steps: [
            { text: 'Identify the slope of the given line. Rewrite 2x - 3y + 6 = 0 in slope-intercept form: 3y = 2x + 6 → y = (2/3)x + 2.' },
            { text: 'Since the new track is parallel, it has the same slope m = 2/3.' },
            { text: 'Use point-slope form with point (4, -1): y - (-1) = (2/3)(x - 4) → y + 1 = (2/3)(x - 4).' },
            { text: 'Simplify to general form: 3(y + 1) = 2(x - 4) → 3y + 3 = 2x - 8 → 2x - 3y - 11 = 0.' },
            { text: 'Verify: slope of new line is -A/B = -2/(-3) = 2/3, matches. Point (4, -1) satisfies: 2(4) - 3(-1) - 11 = 8 + 3 - 11 =.', faded: true, blankAnswer: '2x - 3y - 11 = 0' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_005', title: 'The area of a triangle with vertices at.',
          scaffold: { problem: 'A triangular plot of land in Gurugram has corners marked by GPS coordinates: A(3, 5), B(9, 2), C(4, 10).',
            steps: [
            { text: 'Identify the given coordinates: A(3,5), B(9,2), C(4,10). Note the cost rate: ₹15,000/m².' },
            { text: 'Write the area formula: Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|.' },
            { text: 'Substitute the coordinates carefully: x₁=3, y₁=5; x₂=9, y₂=2; x₃=4, y₃=10. Area = ½ |3(2−10) + 9(10−5) + 4(5−2)|.' },
            { text: 'Compute inside brackets: 3(−8) + 9(5) + 4(3) = −24 + 45 + 12 = 33.' },
            { text: 'Apply absolute value and ½: Area = ½ × |33| = 16.5 square metres.' },
            { text: 'Compute cost: Cost = Area × Rate = 16.5 × 15,000 = ₹2,47,500.', faded: true, blankAnswer: '₹2,47,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_006', title: 'The slope (or gradient) of a.',
          scaffold: { problem: 'A hill road in Himachal Pradesh rises from an elevation of 1,200 metres at the 5 km marker to 1,650 metres at the 12 km marker.',
            steps: [
            { text: 'Identify the two points. Let x be distance along road (km), y be elevation (m). Point A: (5, 1200), Point B: (12, 1650).' },
            { text: 'Write the slope formula: m = (y₂ - y₁)/(x₂ - x₁). Substitute: m = (1650 - 1200)/(12 - 5).' },
            { text: 'Compute numerator (rise): 1650 - 1200 = 450 m. Compute denominator (run): 12 - 5 = 7 km = 7000 m.' },
            { text: 'Calculate slope: m = 450/7000 = 45/700 = 9/140 ≈ 0.0643. As a ratio: 1 : 15.56 (since 1/0.0643 ≈ 15.56).' },
            { text: 'Interpret: For every 100 metres horizontally, the road rises about 6.43 metres.', faded: true, blankAnswer: 'Slope = 9/140 ≈ 0.0643; Ratio = 1 : 15.56; Percentage grade.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_008', title: 'The angle between two intersecting.',
          scaffold: { problem: 'A ramp for wheelchair access in a Delhi metro station must make an angle of 30° with the horizontal ground.',
            steps: [
            { text: 'Identify given values: slope of walkway m₁ = 1/√3, angle θ = 30°, tan 30° = 1/√3. Let ramp slope = m₂.' },
            { text: 'Use the angle formula tan θ = |(m₁ - m₂)/(1 + m₁m₂)|. Substitute: 1/√3 = |(1/√3 - m₂)/(1 + (1/√3)m₂)|.' },
            { text: 'Remove absolute value by considering two cases: Case A: (1/√3 - m₂)/(1 + m₂/√3) = 1/√3.' },
            { text: 'Solve Case A: Cross-multiply: √3(1/√3 - m₂) = 1 + m₂/√3 → 1 - √3 m₂ = 1 + m₂/√3 → -√3 m₂ - m₂/√3 = 0 → m₂(-√3 - 1/√3) =.' },
            { text: 'Solve Case B: Cross-multiply: √3(1/√3 - m₂) = -1 - m₂/√3 → 1 - √3 m₂ = -1 - m₂/√3 → 2 = √3 m₂ - m₂/√3 = m₂(√3 - 1/√3) =.' },
            { text: 'Verify both solutions: For m₂ = 0, tan θ = |(1/√3 - 0)/(1 + 0)| = 1/√3 → θ = 30° ✓.', faded: true, blankAnswer: 'The two possible slopes for the ramp are m₂ = 0 and m₂ =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_009', title: 'The point-slope form of a straight line.',
          scaffold: { problem: 'A ramp for a wheelchair is to be built with a slope of 1/12 (rise:run).',
            steps: [
            { text: 'Identify the given slope m = 1/12 and the point (x_1, y_1) = (2, 0.5). Note: horizontal distance is x, height is y.' },
            { text: 'Write the point-slope form: y - y_1 = m(x - x_1).' },
            { text: 'Substitute the values: y - 0.5 = (1/12)(x - 2).' },
            { text: 'Simplify to slope-intercept form: y = (1/12)x - 2/12 + 0.5 = (1/12)x - 1/6 + 1/2 = (1/12)x + 1/3.' },
            { text: 'To find the height at x = 5, substitute x = 5: y = (1/12)*5 + 1/3 = 5/12 + 4/12 = 9/12 = 0.75 metres.' },
            { text: 'Interpret: The ramp height at 5 metres from the wall is 0.75 m.', faded: true, blankAnswer: 'Equation: y = (1/12)x + 1/3; Height at x=5 m is 0.75 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_010', title: 'The two-point form gives the equation.',
          scaffold: { problem: 'A straight railway track passes through two stations A and B. Station A is located at coordinates (2 km, 3 km) and station B at (8 km, 15.',
            steps: [
            { text: 'Identify the coordinates: \\(A(2, 3)\\) and \\(B(8, 15)\\). Let \\((x_1, y_1) = (2, 3)\\) and \\((x_2, y_2) = (8, 15)\\).' },
            { text: 'Compute the slope \\(m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{15 - 3}{8 - 2} = \\frac{12}{6} = 2\\).' },
            { text: 'Use the two-point form: \\(y - y_1 = m(x - x_1) \\Rightarrow y - 3 = 2(x - 2)\\).' },
            { text: 'Simplify to slope-intercept form: \\(y - 3 = 2x - 4 \\Rightarrow y = 2x - 1\\).' },
            { text: 'The y-intercept is \\(c = -1\\). The track crosses the y-axis at \\((0, -1)\\).', faded: true, blankAnswer: 'Equation: \\(y = 2x - 1\\); y-intercept distance = 1 km.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_10_005', title: 'Identify each idea',
          dissect: { specimen: 'Various Forms Equation', spots: [
            { id: 's1', label: 'Two non-vertical lines are parallel', prompt: 'Which idea is this? — Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂).', answer: 'Two non-vertical lines are parallel', options: ['Two non-vertical lines are parallel', 'The area of a triangle', 'The slope or gradient of', 'The angle between two intersecting'] },
            { id: 's2', label: 'The area of a triangle', prompt: 'Which idea is this? — The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃).', answer: 'The area of a triangle', options: ['The area of a triangle', 'Two non-vertical lines are parallel', 'The slope or gradient of', 'The angle between two intersecting'] },
            { id: 's3', label: 'The slope or gradient of', prompt: 'Which idea is this? — The slope (or gradient) of a non-vertical line is defined as the tangent of the angle of.', answer: 'The slope or gradient of', options: ['The slope or gradient of', 'Two non-vertical lines are parallel', 'The area of a triangle', 'The angle between two intersecting'] },
            { id: 's4', label: 'The angle between two intersecting', prompt: 'Which idea is this? — The angle between two intersecting lines is defined as the acute angle θ (0° ≤ θ ≤ 90°).', answer: 'The angle between two intersecting', options: ['The angle between two intersecting', 'Two non-vertical lines are parallel', 'The area of a triangle', 'The slope or gradient of'] },
            { id: 's5', label: 'The point-slope form of a', prompt: 'Which idea is this? — The point-slope form of a straight line states that if a line has slope \\(m\\) and passes.', answer: 'The point-slope form of a', options: ['The point-slope form of a', 'Two non-vertical lines are parallel', 'The area of a triangle', 'The slope or gradient of'] },
            { id: 's6', label: 'The two-point form gives the', prompt: 'Which idea is this? — The two-point form gives the equation of a straight line passing through two distinct.', answer: 'The two-point form gives the', options: ['The two-point form gives the', 'Two non-vertical lines are parallel', 'The area of a triangle', 'The slope or gradient of'] }
          ] } }
    ],
    explore: { component: C11_MathematicsVariousFormsEquationSim, prompt: 'Explore the interactive — Various Forms Equation' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_10_007', difficulty: 'standard',
          question: 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ =.',
          hint: 'If stuck, review c11_math_cbse_10_006 (Slope of a Line: Definition and Formula) and.',
          misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of.',
          parts: [
                { id: 'a', prompt: 'State the condition for two lines with slopes m₁ and m₂ to be (i) parallel, (ii) perpendicular. What is the slope of a line parallel to the y-axis?', answer: '(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)',
                  options: ['(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)', 'm₁ = -m₂ for perpendicular', 'slope of y-axis is 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' },
                { id: 'b', prompt: 'Explain why the product of slopes of two perpendicular lines is -1, using the concept of inclination angles.', answer: 'If lines have inclinations θ₁ and θ₂, perpendicular means θ₂ = θ₁ + 90°',
                  options: ['If lines have inclinations θ₁ and θ₂, perpendicular means θ₂ = θ₁ + 90°', 'negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' },
                { id: 'c', prompt: 'Line L₁ passes through (2, 5) and (4, 9). Line L₂ passes through (1, 3) and (5, 11). Are L₁ and L₂ parallel, perpendicular, or neither? Show your calculations.', answer: 'Slope of L₁ = (9-5)/(4-2) = 4/2 = 2',
                  options: ['Slope of L₁ = (9-5)/(4-2) = 4/2 = 2', 'negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' }
          ],
            remediations: { 'perpendicular-lines-have-slopes-that': { steps: ['If a student writes m₂ = -m₁ for perpendicular, ask: "If one line has slope 2, what angle does it make with the x-axis?', 'What angle would a line with slope -2 make?', 'Approximately -63° (or 117°).', 'Now compute the negative reciprocal: -1/2.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of.',
          parts: [
                { id: 'a', prompt: 'Create a real-world problem involving parallel or perpendicular lines in coordinate geometry (e.g., roads, architecture, sports).', answer: 'Example: A straight road runs along the line y = 0.5x + 10 (in km)',
                  options: ['Example: A straight road runs along the line y = 0.5x + 10 (in km)', 'negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of negative reciprocals.' }
          ],
            remediations: { 'perpendicular-lines-have-slopes-that': { steps: ['If a student writes m₂ = -m₁ for perpendicular, ask: "If one line has slope 2, what angle does it make with the x-axis?', 'What angle would a line with slope -2 make?', 'Approximately -63° (or 117°).', 'Now compute the negative reciprocal: -1/2.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_005', difficulty: 'standard',
          question: 'The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and.',
          hint: 'If stuck, revisit Class 10 determinant expansion (c10_math_cbse_02_007 Division Algorithm.',
          misconception: 'Students often write the area formula as ½ [x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)] without absolute value, then get a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃)',
                  options: ['The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃)', 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂)', 'The slope (or gradient) of a non-vertical line is defined as the tangent of the angle of', 'The angle between two intersecting lines is defined as the acute angle θ (0° ≤ θ ≤ 90°)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the area formula as ½ [x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)] without absolute value, then get a negative answer and.' }
          ],
            remediations: { 'students-often-write-the-area': { steps: ['If a student gives negative area or forgets absolute value: 1) Ask them to plot the three points roughly and trace the.', '3) Make them write the formula with | | explicitly every time until it becomes automatic.', '4) Give a problem where they must find k such that area = 5, forcing them to write |expression| = 10 and split into two.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_006', difficulty: 'standard',
          question: 'The slope (or gradient) of a non-vertical line is defined as the tangent of the.',
          hint: 'If stuck, revisit Class 9 "Graph of a Linear Equation in Two Variables" (c9_math_ch2_5).',
          misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator.',
          parts: [
                { id: 'a', prompt: 'State the formula for the slope of a line passing through points A(x₁, y₁) and B(x₂, y₂). What is the slope of a horizontal line?', answer: 'The slope formula is m = (y₂ - y₁)/(x₂ - x₁) for x₁ ≠ x₂',
                  options: ['The slope formula is m = (y₂ - y₁)/(x₂ - x₁) for x₁ ≠ x₂', 'zero slope', 'undefined slope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator and denominator) or.' },
                { id: 'b', prompt: 'A line makes an angle of 135° with the positive x-axis. What is its slope?', answer: 'The slope is m = tan 135° = tan(180° - 45°) = -tan 45° = -1',
                  options: ['The slope is m = tan 135° = tan(180° - 45°) = -tan 45° = -1', 'upward'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator and denominator) or.' },
                { id: 'c', prompt: 'Two students calculate the slope of the line through A(3, 7) and B(3, -2). Student 1 writes m = (-2 - 7)/(3 - 3) = -9/0 = 0.', answer: 'Student 2 is correct',
                  options: ['Student 2 is correct', 'zero divided by a number', 'a number divided by zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently subtract coordinates in the wrong order: they compute m = (x₂ - x₁)/(y₂ - y₁) (swapping numerator and denominator) or.' }
          ],
            remediations: { 'students-consistently-subtract-coordinates-in': { steps: ['If a student makes the order/substitution error, do not just say "remember rise over run".', 'Instead: (1) Have them label points clearly as (x₁, y₁) and (x₂, y₂) before substituting.', '(2) Make them write the formula m = (y₂ - y₁)/(x₂ - x₁) every time.', '(3) Use a coloured pencil: highlight y-coordinates in one colour, x-coordinates in another.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_008', difficulty: 'standard',
          question: 'The angle between two intersecting lines is defined as the acute angle θ (0° ≤.',
          hint: 'If stuck, revisit c11_math_cbse_10_006 (slope definition and calculation) and Class 10.',
          misconception: 'Students incorrectly apply the formula tan θ = (m₁ - m₂)/(1 + m₁m₂) without absolute value, then report a negative.',
          parts: [
                { id: 'a', prompt: 'Line L₁ passes through (2, 3) and (5, 7). Line L₂ has equation 2x - 3y + 6 = 0.', answer: 'Slope of L₁: m₁ = (7-3)/(5-2) = 4/3',
                  options: ['Slope of L₁: m₁ = (7-3)/(5-2) = 4/3', 'obtuse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the formula tan θ = (m₁ - m₂)/(1 + m₁m₂) without absolute value, then report a negative angle or an obtuse angle.' }
          ],
            remediations: { 'students-incorrectly-apply-the-formula': { steps: ['If a student omits the absolute value, have them: (1) Draw two intersecting lines with slopes 1 and 2 on graph paper,.', '(2) Compute both tan(θ₁ - θ₂) and tan(θ₂ - θ₁) to see they are opposites.', '(3) Explain that the formula without absolute value gives the directed angle from line 2 to line 1, but "angle between.', '(4) Practice 5 problems where they must explicitly write "| |" and state "acute angle = tan⁻¹(|...|)".'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly apply the formula tan θ = (m₁ - m₂)/(1 + m₁m₂) without absolute value, then report a negative.',
          parts: [
                { id: 'a', prompt: 'Line L₁ passes through (2, 3) and (5, 7). Line L₂ has equation 2x - 3y + 6 = 0.', answer: 'Slope of L₁: m₁ = (7-3)/(5-2) = 4/3',
                  options: ['Slope of L₁: m₁ = (7-3)/(5-2) = 4/3', 'obtuse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the formula tan θ = (m₁ - m₂)/(1 + m₁m₂) without absolute value, then report a negative angle or an obtuse angle.' }
          ],
            remediations: { 'students-incorrectly-apply-the-formula': { steps: ['If a student omits the absolute value, have them: (1) Draw two intersecting lines with slopes 1 and 2 on graph paper,.', '(2) Compute both tan(θ₁ - θ₂) and tan(θ₂ - θ₁) to see they are opposites.', '(3) Explain that the formula without absolute value gives the directed angle from line 2 to line 1, but "angle between.', '(4) Practice 5 problems where they must explicitly write "| |" and state "acute angle = tan⁻¹(|...|)".'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_009', difficulty: 'standard',
          question: 'The point-slope form of a straight line states that if a line has slope \\(m\\).',
          hint: 'If stuck, revisit the slope formula (c11_math_cbse_10_006) and practice substituting.',
          misconception: 'Students often write the point-slope form as \\(y - y_1 = m(x + x_1)\\) or \\(y + y_1 = m(x - x_1)\\) by misplacing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The point-slope form of a straight line states that if a line has slope \\(m\\) and passes',
                  options: ['The point-slope form of a straight line states that if a line has slope \\(m\\) and passes', 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂)', 'The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃)', 'The slope (or gradient) of a non-vertical line is defined as the tangent of the angle of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the point-slope form as \\(y - y_1 = m(x + x_1)\\) or \\(y + y_1 = m(x - x_1)\\) by misplacing the signs of the.' }
          ],
            remediations: { 'students-often-write-the-point': { steps: ['To fix this, have the student explicitly write down the coordinates of the given point as \\((x_1, y_1)\\) with their.', 'Then write the formula \\(y - y_1 = m(x - x_1)\\).', 'Substitute the values step by step: if \\(x_1 = -2\\), then \\(x - (-2) = x + 2\\).', 'Practice with points having negative coordinates until the substitution becomes automatic.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_010', difficulty: 'standard',
          question: 'The two-point form gives the equation of a straight line passing through two.',
          hint: 'If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) and c11_math_cbse_10_009.',
          misconception: 'Students often write the two-point form as \\(y - y_1 = \\frac{y_2 - y_1}{x_1 - x_2}(x - x_1)\\) (swapping the.',
          parts: [
                { id: 'a', prompt: 'Explain why the two-point form \\(y - y_1 = \\frac{y_2 - y_1}{x_2 - x_1}(x - x_1)\\) fails when \\(x_1 = x_2\\), and describe the geometric meaning of this failure.', answer: 'The formula fails',
                  options: ['The formula fails', 'the line doesn\'t exist', 'the slope is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the two-point form as \\(y - y_1 = \\frac{y_2 - y_1}{x_1 - x_2}(x - x_1)\\) (swapping the x-differences) and do not.' }
          ],
            remediations: { 'students-often-write-the-two': { steps: ['If a student makes the sign error, have them compute the slope twice: once as \\(\\frac{y_2 - y_1}{x_2 - x_1}\\) and once.', 'Then emphasise that the point-slope form must use the same point that was used as the "first" point in the slope.', 'For the vertical line case, draw a vertical line on graph paper, pick two points on it, and ask them to compute the.', 'They will see the denominator is zero.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
