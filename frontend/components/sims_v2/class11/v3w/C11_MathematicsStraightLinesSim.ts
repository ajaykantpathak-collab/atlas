import type { SimDef } from '../../engine/types';
import C11_MathematicsStraightLinesSim from '../../../simulations/c6_12/C11_MathematicsStraightLinesSim';

/** v3 wrapped master — C11_MathematicsStraightLinesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsstraightlinessim: SimDef = {
    id: 'v3w_c11_mathematicsstraightlinessim',
    title: 'Straight Lines',
    subtitle: 'Covers the distance formula in a 2D Cartesian coordinate system, its algebraic.',
    classLevel: 11, subject: 'mathematics', topic: 'Distance Between Two Points',
    chapters: [],
    nodeIds: ['c11_math_cbse_10_002', 'c11_math_cbse_10_007', 'c11_math_cbse_10_009', 'c11_math_cbse_10_010', 'c11_math_cbse_10_011', 'c11_math_cbse_10_012', 'c11_math_cbse_10_013', 'c11_math_cbse_11_009', 'c11_math_cbse_02_006', 'c11_math_cbse_10_001', 'c11_math_cbse_10_003', 'c11_math_cbse_10_004', 'c11_math_cbse_10_005', 'c11_math_cbse_10_006', 'c11_math_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at your school gate (point A) and your friend is at the bus stop (point B).', goal: 'Master Straight Lines.' },
    discovery: {
        question: 'State the condition for two lines with slopes m₁ and m₂ to be (i) parallel, (ii) perpendicular. What is the slope of a line parallel to the y-axis?',
        options: ['(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)', 'm₁ = -m₂ for perpendicular', 'slope of y-axis is 0'],
        answer: '(i) m₁ = m₂; (ii) m₁ × m₂ = -1 (provided neither is vertical)',
        hook: 'Students often think that perpendicular lines have slopes that are just "negative" of each other (m₂ = -m₁) instead of.',
    },
    teaching: [
        { title: 'The distance between two points \\(P(x_1,.', text: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian plane is the length of the straight line segment joining them, given by \\(PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 -.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_002', title: 'The distance between two points.',
          scaffold: { problem: 'A rectangular park in Delhi has corners at A(1, 2), B(5, 2), C(5, 6), D(1, 6) (coordinates in 100-metre units).',
            steps: [
            { text: 'Identify coordinates of midpoints. Midpoint of AB: \\(M = \\left(\\frac{1+5}{2}, \\frac{2+2}{2}\\right) = (3, 2)\\).' },
            { text: 'Note that both midpoints have same x-coordinate (3), so the segment MN is vertical.' },
            { text: 'Alternatively, apply distance formula: \\(MN = \\sqrt{(3-3)^2 + (6-2)^2} = \\sqrt{0 + 16} = 4\\) units.' },
            { text: 'Convert units: 1 unit = 100 metres, so length = \\(4 \\times 100 = 400\\) metres.' },
            { text: 'Verify: The path runs vertically through the centre of the park from y=2 to y=6, spanning 4 units of 100m each. Correct.', faded: true, blankAnswer: '400 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_007', title: 'Two non-vertical lines are parallel if.',
          scaffold: { problem: 'A railway track runs along the line 2x - 3y + 6 = 0. A new parallel track is to be laid passing through the station at (4, -1).',
            steps: [
            { text: 'Identify the slope of the given line. Rewrite 2x - 3y + 6 = 0 in slope-intercept form: 3y = 2x + 6 → y = (2/3)x + 2.' },
            { text: 'Since the new track is parallel, it has the same slope m = 2/3.' },
            { text: 'Use point-slope form with point (4, -1): y - (-1) = (2/3)(x - 4) → y + 1 = (2/3)(x - 4).' },
            { text: 'Simplify to general form: 3(y + 1) = 2(x - 4) → 3y + 3 = 2x - 8 → 2x - 3y - 11 = 0.' },
            { text: 'Verify: slope of new line is -A/B = -2/(-3) = 2/3, matches. Point (4, -1) satisfies: 2(4) - 3(-1) - 11 = 8 + 3 - 11 =.', faded: true, blankAnswer: '2x - 3y - 11 = 0' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_011', title: 'The slope-intercept form of a straight.',
          scaffold: { problem: 'A mobile phone plan charges a fixed monthly rental of ₹299 plus ₹1.50 per minute of calls.',
            steps: [
            { text: 'Identify the fixed cost (y-intercept) = ₹299 (cost when minutes = 0)' },
            { text: 'Identify the rate per minute (slope) = ₹1.50/minute' },
            { text: 'Write the equation in slope-intercept form: C = 1.50m + 299' },
            { text: 'For bill ₹479, substitute C = 479: 479 = 1.50m + 299' },
            { text: 'Solve: 1.50m = 180 → m = 180/1.50 = 120 minutes' },
            { text: 'Verify: 120 × 1.50 + 299 = 180 + 299 = 479 ✓', faded: true, blankAnswer: 'Equation: C = 1.5m + 299; Slope = 1.5 ₹/min; y-intercept =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_10_012', title: 'The intercept form of a straight line.',
          scaffold: { problem: 'A straight line passes through the point (4, -2) and its intercepts on the axes are equal in magnitude but opposite in sign.',
            steps: [
            { text: 'Let the intercepts be \\(a\\) and \\(b\\). Given \\(|a| = |b|\\) and opposite signs, so \\(b = -a\\).' },
            { text: 'Write the intercept form: \\(\\frac{x}{a} + \\frac{y}{-a} = 1\\) which simplifies to \\(\\frac{x - y}{a} = 1\\) or \\(x - y =.' },
            { text: 'Substitute the given point (4, -2): \\(4 - (-2) = a\\) → \\(a = 6\\).' },
            { text: 'Since \\(b = -a\\), \\(b = -6\\). Intercept form: \\(\\frac{x}{6} + \\frac{y}{-6} = 1\\) or \\(\\frac{x}{6} - \\frac{y}{6} = 1\\).' },
            { text: 'Convert to general form: Multiply by 6: \\(x - y = 6\\) → \\(x - y - 6 = 0\\).' },
            { text: 'Verify: x-intercept (set y=0): x=6 ✓; y-intercept (set x=0): -y=6 → y=-6 ✓; point (4,-2): 4-(-2)=6 ✓.', faded: true, blankAnswer: 'Intercept form: \\(\\frac{x}{6} - \\frac{y}{6} = 1\\); General.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_10_007', title: 'Identify each idea',
          dissect: { specimen: 'Straight Lines', spots: [
            { id: 's1', label: 'The distance between two points', prompt: 'Which idea is this? — The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian.', answer: 'The distance between two points', options: ['The distance between two points', 'Two non-vertical lines are parallel', 'The point-slope form of a', 'The two-point form gives the'] },
            { id: 's2', label: 'Two non-vertical lines are parallel', prompt: 'Which idea is this? — Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂).', answer: 'Two non-vertical lines are parallel', options: ['Two non-vertical lines are parallel', 'The distance between two points', 'The point-slope form of a', 'The two-point form gives the'] },
            { id: 's3', label: 'The point-slope form of a', prompt: 'Which idea is this? — The point-slope form of a straight line states that if a line has slope \\(m\\) and passes.', answer: 'The point-slope form of a', options: ['The point-slope form of a', 'The distance between two points', 'Two non-vertical lines are parallel', 'The two-point form gives the'] },
            { id: 's4', label: 'The two-point form gives the', prompt: 'Which idea is this? — The two-point form gives the equation of a straight line passing through two distinct.', answer: 'The two-point form gives the', options: ['The two-point form gives the', 'The distance between two points', 'Two non-vertical lines are parallel', 'The point-slope form of a'] },
            { id: 's5', label: 'The slope-intercept form of a', prompt: 'Which idea is this? — The slope-intercept form of a straight line is the equation y = mx + c, where m is the.', answer: 'The slope-intercept form of a', options: ['The slope-intercept form of a', 'The distance between two points', 'Two non-vertical lines are parallel', 'The point-slope form of a'] },
            { id: 's6', label: 'The intercept form of a', prompt: 'Which idea is this? — The intercept form of a straight line is the equation of a line that makes non-zero.', answer: 'The intercept form of a', options: ['The intercept form of a', 'The distance between two points', 'Two non-vertical lines are parallel', 'The point-slope form of a'] }
          ] } }
    ],
    explore: { component: C11_MathematicsStraightLinesSim, prompt: 'Explore the interactive — Straight Lines' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_10_002', difficulty: 'standard',
          question: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch1_4 (Distance Formula: Derivation Using.',
          misconception: 'Students often incorrectly apply the distance formula when one or both points lie on an axis.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian',
                  options: ['The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂)', 'The point-slope form of a straight line states that if a line has slope \\(m\\) and passes', 'The two-point form gives the equation of a straight line passing through two distinct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly apply the distance formula when one or both points lie on an axis.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['If a student struggles with axis points: 1) Have them plot (0, -2) and (0, 4) on graph paper and count squares.', '2) Show that the distance formula gives \\(\\sqrt{(0-0)^2 + (4 - (-2))^2} = \\sqrt{36} = 6\\), matching the count.', '3) Emphasise that the formula works for ALL points; the zero difference in x is automatic.', 'For the equidistant problem: 1) Ask "What is the y-coordinate of ANY point on the x-axis?" (Answer: 0).'] } } },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_10_009', difficulty: 'standard',
          question: 'The point-slope form of a straight line states that if a line has slope \\(m\\).',
          hint: 'If stuck, revisit the slope formula (c11_math_cbse_10_006) and practice substituting.',
          misconception: 'Students often write the point-slope form as \\(y - y_1 = m(x + x_1)\\) or \\(y + y_1 = m(x - x_1)\\) by misplacing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The point-slope form of a straight line states that if a line has slope \\(m\\) and passes',
                  options: ['The point-slope form of a straight line states that if a line has slope \\(m\\) and passes', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂)', 'The two-point form gives the equation of a straight line passing through two distinct'],
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
            remediations: { 'students-often-write-the-two': { steps: ['If a student makes the sign error, have them compute the slope twice: once as \\(\\frac{y_2 - y_1}{x_2 - x_1}\\) and once.', 'Then emphasise that the point-slope form must use the same point that was used as the "first" point in the slope.', 'For the vertical line case, draw a vertical line on graph paper, pick two points on it, and ask them to compute the.', 'They will see the denominator is zero.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_011', difficulty: 'standard',
          question: 'The slope-intercept form of a straight line is the equation y = mx + c, where m.',
          hint: 'If stuck, revisit c11_math_cbse_10_006 (Slope of a Line) to reinforce m = (y₂-y₁)/(x₂-x₁).',
          misconception: 'Students treat the slope-intercept form y = mx + c as only applicable when the y-intercept is positive.',
          parts: [
                { id: 'a', prompt: 'Write the slope-intercept form of a line with slope 3/4 and y-intercept -2. Then state the coordinates of the point where this line crosses the y-axis.', answer: 'The equation is y = (3/4)x - 2',
                  options: ['The equation is y = (3/4)x - 2', 'intercept = -2 means x = -2', '"intercept = -2 means x = -2"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope-intercept form y = mx + c as only applicable when the y-intercept is positive.' }
          ],
            remediations: { 'students-treat-the-slope-intercept': { steps: ['Have the student write the conversion steps vertically: 2x + 3y - 6 = 0 → 3y = -2x + 6 → y = (-2/3)x + 2.', 'Circle the coefficient of x including its sign: (-2/3). Say: "This ENTIRE number, with its sign, is m."', 'Circle the constant term including its sign: +2. Say: "This ENTIRE number, with its sign, is c."', 'Practice with 5 equations where m and c have various sign combinations: (+, +), (+, -), (-, +), (-, -), (0, +).', 'For each, ask: "If m = -2/3, what is tan θ? What quadrant is θ in?" This forces sign awareness.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the slope-intercept form y = mx + c as only applicable when the y-intercept is positive.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Find the equation of the line with x-intercept 4 and y-intercept -3." Their working: "x-intercept = 4 means point (4, 0).', answer: 'The student\'s answer y = (3/4)x - 3 is INCORRECT',
                  options: ['The student\'s answer y = (3/4)x - 3 is INCORRECT', 'incorrect', 'x-intercept means something else, or that slope should be negative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the slope-intercept form y = mx + c as only applicable when the y-intercept is positive.' }
          ],
            remediations: { 'students-treat-the-slope-intercept': { steps: ['Have the student write the conversion steps vertically: 2x + 3y - 6 = 0 → 3y = -2x + 6 → y = (-2/3)x + 2.', 'Circle the coefficient of x including its sign: (-2/3). Say: "This ENTIRE number, with its sign, is m."', 'Circle the constant term including its sign: +2. Say: "This ENTIRE number, with its sign, is c."', 'Practice with 5 equations where m and c have various sign combinations: (+, +), (+, -), (-, +), (-, -), (0, +).', 'For each, ask: "If m = -2/3, what is tan θ? What quadrant is θ in?" This forces sign awareness.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_10_012', difficulty: 'standard',
          question: 'The intercept form of a straight line is the equation of a line that makes.',
          hint: 'If stuck, revisit c11_math_cbse_10_010 (Two-Point Form) and practice deriving intercept.',
          misconception: 'Students confuse the intercept form \\(\\frac{x}{a} + \\frac{y}{b} = 1\\) with the general form \\(Ax + By = C\\) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The intercept form of a straight line is the equation of a line that makes non-zero',
                  options: ['The intercept form of a straight line is the equation of a line that makes non-zero', 'The distance between two points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\) in the Cartesian', 'Two non-vertical lines are parallel if and only if their slopes are equal (m₁ = m₂)', 'The point-slope form of a straight line states that if a line has slope \\(m\\) and passes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the intercept form \\(\\frac{x}{a} + \\frac{y}{b} = 1\\) with the general form \\(Ax + By = C\\) and directly read intercepts as.' }
          ],
            remediations: { 'students-confuse-the-intercept-form': { steps: ['If a student makes this error, have them: (1) Find intercepts by substitution method first (set x=0, find y; set y=0,.', '(2) Write the intercept form using those values as denominators.', '(3) Compare with the original equation to see the division step needed.', '(4) Practice converting 5 equations from general to intercept form by dividing by the constant term, then verify by.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
