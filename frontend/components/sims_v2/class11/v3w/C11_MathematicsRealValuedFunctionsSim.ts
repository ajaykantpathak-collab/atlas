import type { SimDef } from '../../engine/types';
import C11_MathematicsRealValuedFunctionsSim from '../../../simulations/c6_12/C11_MathematicsRealValuedFunctionsSim';

/** v3 wrapped master — C11_MathematicsRealValuedFunctionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsrealvaluedfunctionssim: SimDef = {
    id: 'v3w_c11_mathematicsrealvaluedfunctionssim',
    title: 'Trigonometric Functions: sin, cos, tan Definition',
    subtitle: 'This node covers the unit-circle definitions of \\(\\sin x, \\cos x, \\tan x\\) and their.',
    classLevel: 11, subject: 'mathematics', topic: 'Trigonometric Functions: sin, cos, tan Definition',
    chapters: [],
    nodeIds: ['c11_math_cbse_03_003', 'c11_math_cbse_03_005', 'c11_math_cbse_03_007', 'c11_math_cbse_03_008', 'c11_math_cbse_03_009', 'c11_math_cbse_06_006', 'c11_math_cbse_02_006', 'c11_math_cbse_02_007', 'c11_math_cbse_02_008', 'c11_math_cbse_02_009', 'c11_math_cbse_02_010', 'c11_math_cbse_02_012', 'c11_math_cbse_03_004', 'c11_math_cbse_03_006', 'c11_math_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a giant Ferris wheel at a fair in Delhi with radius 10 metres.', goal: 'Master Trigonometric Functions: sin, cos, tan Definition.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'For any angle \\(x\\) measured in radians, let.', text: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle \\(x^2 + y^2 = 1\\) such that the arc length from \\((1,0)\\) to \\(P\\) along the circle is \\(x\\) (anticlockwise.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_003', title: 'For any angle \\(x\\) measured in.',
          scaffold: { problem: 'A point \\(P\\) on the unit circle corresponds to an angle of \\(\\frac{2\\pi}{3}\\) radians.',
            steps: [
            { text: 'Identify the quadrant. \\(\\frac{2\\pi}{3} = 120^\\circ\\), which lies between \\(\\frac{\\pi}{2}\\) and \\(\\pi\\) → Quadrant II.' },
            { text: 'Find the reference angle. Reference angle = \\(\\pi - \\frac{2\\pi}{3} = \\frac{\\pi}{3}\\).' },
            { text: 'Recall the coordinates for \\(\\frac{\\pi}{3}\\) on the unit circle: \\(\\left(\\cos \\frac{\\pi}{3}, \\sin \\frac{\\pi}{3}\\right).' },
            { text: 'Apply quadrant signs. In QII, \\(x\\) (cosine) is negative, \\(y\\) (sine) is positive.' },
            { text: 'Compute \\(\\tan = \\frac{\\sin}{\\cos} = \\frac{\\sqrt{3}/2}{-1/2} = -\\sqrt{3}\\).' },
            { text: 'Compute reciprocals: \\(\\cosec = \\frac{1}{\\sin} = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}\\), \\(\\sec = \\frac{1}{\\cos} =.', faded: true, blankAnswer: '\\(\\sin \\frac{2\\pi}{3} = \\frac{\\sqrt{3}}{2}\\), \\(\\cos.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_005', title: 'Trigonometric functions of any angle.',
          scaffold: { problem: 'A wind turbine blade in Gujarat has length 40 m. At a certain instant, the blade makes an angle of \\(210^\\circ\\) with the positive x-axis.',
            steps: [
            { text: 'Identify given: radius \\(r = 40\\) m, angle \\(\\theta = 210^\\circ\\).' },
            { text: 'Convert angle to radians (optional but good practice): \\(210^\\circ = 210 \\times \\frac{\\pi}{180} = \\frac{7\\pi}{6}\\) rad.' },
            { text: 'Determine quadrant: \\(\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}\\) lies in QIII (between \\(\\pi\\) and \\(\\frac{3\\pi}{2}\\)).' },
            { text: 'Find reference angle: \\(\\alpha = \\frac{7\\pi}{6} - \\pi = \\frac{\\pi}{6}\\).' },
            { text: 'Apply sign rule: \\(\\sin \\frac{7\\pi}{6} = -\\sin \\frac{\\pi}{6} = -\\frac{1}{2}\\).' },
            { text: 'Compute height: \\(y = 40 \\times (-\\frac{1}{2}) = -20\\) m. The negative sign means the tip is 20 m below ground level.', faded: true, blankAnswer: '-20 m (20 metres below ground level)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_007', title: 'The domain of a trigonometric function.',
          scaffold: { problem: 'A Ferris wheel at a fair in Mumbai has a radius of 10 m. The centre of the wheel is 12 m above the ground.',
            steps: [
            { text: 'Identify the trigonometric function involved: h(θ) = 12 - 10 cos θ. The core function is cos θ.' },
            { text: 'Recall the domain of cos θ: all real numbers (θ ∈ ℝ). Since the wheel rotates continuously in both directions (though.' },
            { text: 'Recall the range of cos θ: [-1, 1]. So -1 ≤ cos θ ≤ 1.' },
            { text: 'Apply the transformation to find the range of h: multiply the inequality by -10 (reversing inequality signs): 10 ≥ -10.' },
            { text: 'Interpret: The passenger\'s height varies between 2 m (bottom) and 22 m (top). Domain: ℝ; Range: [2, 22] metres.', faded: true, blankAnswer: 'Domain: ℝ (all real numbers); Range: [2, 22] metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_008', title: 'The Pythagorean identities are three.',
          scaffold: { problem: 'A kite is flying at a height of 75 metres above the ground, attached to a string inclined at an angle \\(x\\) to the horizontal.',
            steps: [
            { text: 'Identify given and unknown. Given: \\(\\cosec x = \\frac{5}{3}\\), height (opposite side) = 75 m.' },
            { text: 'Use reciprocal identity: \\(\\sin x = \\frac{1}{\\cosec x} = \\frac{3}{5}\\).' },
            { text: 'Use Pythagorean identity \\(\\sin^2 x + \\cos^2 x = 1\\) to find \\(\\cos x\\).' },
            { text: 'In the right triangle, \\(\\sin x = \\frac{\\text{height}}{\\text{string length}} \\Rightarrow \\frac{3}{5} =.' },
            { text: '\\(\\cos x = \\frac{\\text{horizontal distance}}{\\text{string length}} \\Rightarrow \\frac{4}{5} = \\frac{\\text{horizontal.', faded: true, blankAnswer: 'String length = 125 m, horizontal distance = 100 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_009', title: 'The sum and difference formulas for.',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a temple tower from two points on the ground.',
            steps: [
            { text: 'Identify given values: tan α = 3/4, tan β = 4/3. Both angles are acute (positive tangent in QI), so α, β ∈ (0°, 90°).' },
            { text: 'Write the tangent sum formula: tan(α+β) = (tan α + tan β) / (1 - tan α tan β). Check domain: α, β, α+β ≠ 90° + n·180°.' },
            { text: 'Substitute values: tan(α+β) = (3/4 + 4/3) / (1 - (3/4)(4/3)) = (9/12 + 16/12) / (1 - 12/12) = (25/12) / (1 - 1) =.' },
            { text: 'Division by zero means tan(α+β) is undefined → α+β = 90° (or 270°, but α+β < 180°). So α+β = 90° exactly.' },
            { text: 'Interpretation: The lines of sight from A and B to the tower top are perpendicular (form a right angle).', faded: true, blankAnswer: 'tan(α+β) is undefined (approaches ∞); α+β = 90°. The lines.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_006', title: 'A linear inequality in two variables is.',
          scaffold: { problem: 'A small bakery in Mumbai makes two types of cookies: chocolate chip (₹20 profit per pack) and oatmeal (₹15 profit per pack).',
            steps: [
            { text: 'Define variables. Let x = packs of chocolate chip cookies, y = packs of oatmeal cookies. Both ≥ 0.' },
            { text: 'Write constraints. Flour: 200x + 100y ≤ 5000 → divide by 100: 2x + y ≤ 50.' },
            { text: 'Graph each boundary line. For 2x+y=50: intercepts (0,50) and (25,0). Solid line (≤).' },
            { text: 'Find corner points by solving intersections. (0,0) from axes. (25,0) from 2x+y=50 and y=0. (0,20) from x+2y=40 and x=0.' },
            { text: 'Verify all corners satisfy all constraints. (0,0)✓, (25,0)✓, (0,20)✓, (20,10)✓.', faded: true, blankAnswer: 'Inequalities: 2x + y ≤ 50, x + 2y ≤ 40, x ≥ 0, y ≥ 0..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_03_005', title: 'Identify each idea',
          dissect: { specimen: 'Trigonometric Functions: sin, cos, tan Definition', spots: [
            { id: 's1', label: 'For any angle x measured', prompt: 'Which idea is this? — For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle.', answer: 'For any angle x measured', options: ['For any angle x measured', 'Trigonometric functions of any angle', 'The domain of a trigonometric', 'The Pythagorean identities are three'] },
            { id: 's2', label: 'Trigonometric functions of any angle', prompt: 'Which idea is this? — Trigonometric functions of any angle are defined using the unit circle: for an angle.', answer: 'Trigonometric functions of any angle', options: ['Trigonometric functions of any angle', 'For any angle x measured', 'The domain of a trigonometric', 'The Pythagorean identities are three'] },
            { id: 's3', label: 'The domain of a trigonometric', prompt: 'Which idea is this? — The domain of a trigonometric function is the set of all real numbers (angles in radians).', answer: 'The domain of a trigonometric', options: ['The domain of a trigonometric', 'For any angle x measured', 'Trigonometric functions of any angle', 'The Pythagorean identities are three'] },
            { id: 's4', label: 'The Pythagorean identities are three', prompt: 'Which idea is this? — The Pythagorean identities are three fundamental equations relating the squares of.', answer: 'The Pythagorean identities are three', options: ['The Pythagorean identities are three', 'For any angle x measured', 'Trigonometric functions of any angle', 'The domain of a trigonometric'] },
            { id: 's5', label: 'The sum and difference formulas', prompt: 'Which idea is this? — The sum and difference formulas for trigonometric functions express the sine, cosine,.', answer: 'The sum and difference formulas', options: ['The sum and difference formulas', 'For any angle x measured', 'Trigonometric functions of any angle', 'The domain of a trigonometric'] },
            { id: 's6', label: 'A linear inequality in two', prompt: 'Which idea is this? — A linear inequality in two variables is an inequality of the form ax + by < c, ax + by >.', answer: 'A linear inequality in two', options: ['A linear inequality in two', 'For any angle x measured', 'Trigonometric functions of any angle', 'The domain of a trigonometric'] }
          ] } }
    ],
    explore: { component: C11_MathematicsRealValuedFunctionsSim, prompt: 'Explore the interactive — Trigonometric Functions: sin, cos, tan Definition' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_03_003', difficulty: 'standard',
          question: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the.',
          hint: 'If stuck, review the conversion between degrees and radians (c11_math_cbse_03_002) and.',
          misconception: 'Students often treat \\(\\sin x\\) and \\(\\cos x\\) as only the ratios \\(\\frac{\\text{opposite}}{\\text{hypotenuse}}\\) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle',
                  options: ['For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'Trigonometric functions of any angle are defined using the unit circle: for an angle', 'The domain of a trigonometric function is the set of all real numbers (angles in radians)', 'The Pythagorean identities are three fundamental equations relating the squares of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat \\(\\sin x\\) and \\(\\cos x\\) as only the ratios \\(\\frac{\\text{opposite}}{\\text{hypotenuse}}\\) and.' }
          ],
            remediations: { 'students-often-treat-sin-x': { steps: ['Return to the unit circle diagram: draw the angle in standard position, identify the quadrant, and mark the coordinates.', 'Explicitly state: "In this quadrant, \\(a\\) is positive/negative and \\(b\\) is positive/negative." 3.', 'Use the definition \\(\\cos x = a, \\sin x = b\\) to assign signs.', 'Practice with quadrantal angles first (\\(0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\)) where coordinates are \\((\\pm1,.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_005', difficulty: 'standard',
          question: 'Trigonometric functions of any angle are defined using the unit circle: for an.',
          hint: 'If stuck, revisit the unit circle definition (c11_math_cbse_03_003) and the standard.',
          misconception: 'Students often treat the reduction formulas mechanically without visualizing the unit circle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trigonometric functions of any angle are defined using the unit circle: for an angle',
                  options: ['Trigonometric functions of any angle are defined using the unit circle: for an angle', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'The domain of a trigonometric function is the set of all real numbers (angles in radians)', 'The Pythagorean identities are three fundamental equations relating the squares of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the reduction formulas mechanically without visualizing the unit circle.' }
          ],
            remediations: { 'students-often-treat-the-reduction': { steps: ['If a student cannot correctly evaluate trig functions for non-acute angles: 1.', 'Draw the unit circle and mark the given angle (convert to degrees if needed).', 'Identify the quadrant of the terminal side.', 'Find the reference angle (acute angle between terminal side and x-axis).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_007', difficulty: 'standard',
          question: 'The domain of a trigonometric function is the set of all real numbers (angles.',
          hint: 'Revisit the unit circle definition in c11_math_cbse_03_003 and the sign rules in.',
          misconception: 'Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting that sec x = 1/cos x.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the function y = sec x in set notation.', answer: 'Domain: {x ∈ ℝ | x ≠ (2n+1)π/2, n ∈ ℤ}',
                  options: ['Domain: {x ∈ ℝ | x ≠ (2n+1)π/2, n ∈ ℤ}', 'Domain: all real numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting that sec x = 1/cos x.' },
                { id: 'b', prompt: 'Find the domain of the function f(x) = tan x + cot x.', answer: 'tan x is undefined at x = (2n+1)π/2',
                  options: ['tan x is undefined at x = (2n+1)π/2', 'all real numbers except nπ'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting that sec x = 1/cos x.' }
          ],
            remediations: { 'students-often-write-the-range': { steps: ['If a student makes this error, do the following: 1) Draw a unit circle and mark a point with cos x = 1/2.', '2) Make a table: cos x = 1, 1/2, 1/4, 0.1 → sec x = 1, 2, 4, 10.', 'Show that as cos x → 0⁺, sec x → +∞.', '3) Repeat for negative cos x.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_008', difficulty: 'standard',
          question: 'The Pythagorean identities are three fundamental equations relating the squares.',
          hint: 'If stuck, revisit c11_math_cbse_03_005 (Trigonometric Functions of Any Angle) to review.',
          misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(\\sqrt{1 - \\cos^2 x}\\) and \\(\\sin x\\). Are they equivalent for all \\(x\\)?', answer: 'They are NOT equivalent for all \\(x\\)',
                  options: ['They are NOT equivalent for all \\(x\\)', 'yes, they are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant to determine the.' }
          ],
            remediations: { 'students-mechanically-apply-sin-x': { steps: ['**Revisit the unit circle**: Draw the unit circle, mark an angle in QIII (e.g., \\(210^\\circ\\)), and show that the.', 'Compute \\(\\cos^2 x + \\sin^2 x\\) numerically to verify it equals 1.', '**Practice sign determination**: Give 5 problems where \\(\\cos x\\) or \\(\\sin x\\) is given with quadrant, and the student.', 'Example: "\\(\\cos x = -\\frac{5}{13}\\), QII → \\(\\sin x = +\\frac{12}{13}\\) because sine is positive in QII." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(\\sqrt{1 - \\cos^2 x}\\) and \\(\\sin x\\). Are they equivalent for all \\(x\\)?', answer: 'They are NOT equivalent for all \\(x\\)',
                  options: ['They are NOT equivalent for all \\(x\\)', 'yes, they are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant to determine the.' }
          ],
            remediations: { 'students-mechanically-apply-sin-x': { steps: ['**Revisit the unit circle**: Draw the unit circle, mark an angle in QIII (e.g., \\(210^\\circ\\)), and show that the.', 'Compute \\(\\cos^2 x + \\sin^2 x\\) numerically to verify it equals 1.', '**Practice sign determination**: Give 5 problems where \\(\\cos x\\) or \\(\\sin x\\) is given with quadrant, and the student.', 'Example: "\\(\\cos x = -\\frac{5}{13}\\), QII → \\(\\sin x = +\\frac{12}{13}\\) because sine is positive in QII." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_009', difficulty: 'standard',
          question: 'The sum and difference formulas for trigonometric functions express the sine,.',
          hint: 'Revisit c11_math_cbse_03_006 (Signs in Quadrants) and c11_math_cbse_03_008 (Pythagorean.',
          misconception: 'Students incorrectly distribute trigonometric functions over addition: sin(x+y) = sin x + sin y, cos(x+y) = cos x + cos.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum and difference formulas for trigonometric functions express the sine, cosine,',
                  options: ['The sum and difference formulas for trigonometric functions express the sine, cosine,', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'Trigonometric functions of any angle are defined using the unit circle: for an angle', 'The domain of a trigonometric function is the set of all real numbers (angles in radians)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly distribute trigonometric functions over addition: sin(x+y) = sin x + sin y, cos(x+y) = cos x + cos y, tan(x+y) = tan x.' }
          ],
            remediations: { 'students-incorrectly-distribute-trigonometric-fu': { steps: ['Have the student compute sin(30°+60°) numerically using calculator (sin 90° = 1) and compare with sin 30° + sin 60°.', 'Use the unit circle diagram from NCERT Fig 3.14: show that rotating by x then y gives coordinates (cos(x+y), sin(x+y)),.', 'Practice the "target-oriented" proof method: write LHS and RHS separately, simplify LHS step-by-step to match RHS,.', 'Drill the sign pattern in tan(x±y): "plus in numerator, minus in denominator for sum; minus in numerator, plus in.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_006', difficulty: 'standard',
          question: 'A linear inequality in two variables is an inequality of the form ax + by < c,.',
          hint: 'If stuck, revisit Class 9 Chapter 2 (Linear Polynomials) nodes c9_math_ch2_5 and.',
          misconception: 'Students incorrectly believe that the inequality symbol (≤ or ≥) directly indicates "shade below" or "shade above" the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear inequality in two variables is an inequality of the form ax + by < c, ax + by >',
                  options: ['A linear inequality in two variables is an inequality of the form ax + by < c, ax + by >', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'Trigonometric functions of any angle are defined using the unit circle: for an angle', 'The domain of a trigonometric function is the set of all real numbers (angles in radians)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly believe that the inequality symbol (≤ or ≥) directly indicates "shade below" or "shade above" the line.' }
          ],
            remediations: { 'students-incorrectly-believe-that-the': { steps: ['If a student makes this error, immediately have them test the origin (0,0) in the ORIGINAL inequality before any.', 'For -2x + 3y ≥ 6: 0 ≥ 6 is false, so origin is NOT in solution region.', 'Then ask: "Does your shaded region contain the origin?" If their shaded region contains the origin, it\'s wrong.', 'Force them to use the test-point method EVERY time, regardless of the inequality form.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
