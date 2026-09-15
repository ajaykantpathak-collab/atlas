import type { SimDef } from '../../engine/types';
import C12_MathematicsAreaUnderSimpleSim from '../../../simulations/c6_12/C12_MathematicsAreaUnderSimpleSim';

/** v3 wrapped master — C12_MathematicsAreaUnderSimpleSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsareaundersimplesim: SimDef = {
    id: 'v3w_c12_mathematicsareaundersimplesim',
    title: 'Area Under Simple',
    subtitle: 'This node covers the definition and geometric interpretation of area under a simple curve.',
    classLevel: 12, subject: 'mathematics', topic: 'Area Under Simple Curves: Definition',
    chapters: [],
    nodeIds: ['c12_math_cbse_08_001', 'c12_math_cbse_07_007', 'c12_math_cbse_05_010', 'c12_math_cbse_04_002', 'c12_math_cbse_08_002', 'c12_math_cbse_08_003', 'c12_math_cbse_08_004', 'c12_math_cbse_08_005', 'c12_math_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are designing a curved garden bed along the side of a rectangular plot in your school.', goal: 'Master Area Under Simple.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The area under a simple curve y = f(x) from.', text: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is defined as the definite integral ∫_a^b f(x) dx, which represents the limit of the sum of areas of.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_001', title: 'The area under a simple curve y = f(x).',
          scaffold: { problem: 'A rectangular field has a curved drainage ditch along one side.',
            steps: [
            { text: 'Identify the curve and bounds. The curve is y = 3 - x^2. The bounds are x = -√3 and x = √3 (where y = 0).' },
            { text: 'Write the integral: A = ∫_{-√3}^{√3} (3 - x^2) dx.' },
            { text: 'Find the antiderivative: ∫(3 - x^2) dx = 3x - x^3/3.' },
            { text: 'Evaluate at bounds: [3x - x^3/3]_{-√3}^{√3} = (3√3 - (√3)^3/3) - (3(-√3) - (-√3)^3/3) = (3√3 - 3√3/3) - (-3√3 + 3√3/3).' },
            { text: 'Interpret: Area = 4√3 ≈ 6.928 m². This is the cross-sectional area; multiply by length for volume.', faded: true, blankAnswer: '4√3 m² (approx. 6.93 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_007', title: 'The definite integral of a continuous.',
          scaffold: { problem: 'A farmer wants to find the exact area of a plot bounded by the curve \\(y = 2x + 1\\), the x-axis, and the lines \\(x = 1\\) and \\(x = 4\\).',
            steps: [
            { text: 'Identify the interval \\([a, b] = [1, 4]\\) and function \\(f(x) = 2x + 1\\).' },
            { text: 'The right endpoint of the \\(i\\)-th subinterval is \\(x_i = a + i\\Delta x = 1 + \\frac{3i}{n}\\).' },
            { text: 'Write the Riemann sum: \\(\\sum_{i=1}^n f(x_i) \\Delta x = \\sum_{i=1}^n \\left[2\\left(1 + \\frac{3i}{n}\\right) + 1\\right].' },
            { text: 'Simplify the sum: \\(\\frac{9}{n} \\sum_{i=1}^n 1 + \\frac{18}{n^2} \\sum_{i=1}^n i = \\frac{9}{n} \\cdot n + \\frac{18}{n^2}.' },
            { text: 'Take the limit as \\(n \\to \\infty\\): \\(\\lim_{n\\to\\infty} \\left(9 + 9\\left(1 + \\frac{1}{n}\\right)\\right) = 9 + 9 = 18\\).', faded: true, blankAnswer: '18 square units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_010', title: 'If two variables \\(x\\) and \\(y\\) are.',
          scaffold: { problem: 'A particle moves along a curve such that its coordinates at time \\(t\\) seconds are \\(x = 2t^2 + 3t\\) metres and \\(y = t^3 - 4t\\) metres.',
            steps: [
            { text: 'Identify the parametric equations: \\(x = 2t^2 + 3t\\), \\(y = t^3 - 4t\\).' },
            { text: 'Differentiate \\(x\\) and \\(y\\) with respect to \\(t\\): \\(\\frac{dx}{dt} = 4t + 3\\), \\(\\frac{dy}{dt} = 3t^2 - 4\\).' },
            { text: 'Write the formula for \\(\\frac{dy}{dx}\\): \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2 - 4}{4t + 3}\\).' },
            { text: 'Substitute \\(t = 2\\): \\(\\frac{dy}{dx} = \\frac{3(4) - 4}{4(2) + 3} = \\frac{12 - 4}{8 + 3} = \\frac{8}{11}\\).' },
            { text: 'Interpret: The slope of the tangent at \\(t = 2\\) is \\(\\frac{8}{11}\\) (dimensionless).', faded: true, blankAnswer: '\\(\\frac{8}{11}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_002', title: 'The determinant of a 2×2 matrix A =.',
          scaffold: { problem: 'A civil engineer is checking the stability of a triangular support bracket with vertices at coordinates A(2, −1), B(5, 3), C(−2, 4) in.',
            steps: [
            { text: 'Write the 3×3 matrix with coordinates and a column of 1s as per the area formula.' },
            { text: 'Choose expansion along column 3 (all entries are 1, but signs alternate: +, −, +).' },
            { text: 'Compute minors: M₁₃ = |5 3; −2 4| = 5×4 − 3×(−2) = 20 + 6 = 26. M₂₃ = |2 −1; −2 4| = 2×4 − (−1)(−2) = 8 − 2 = 6.' },
            { text: 'Apply cofactor signs: C₁₃ = (+1)×26 = 26; C₂₃ = (−1)×6 = −6; C₃₃ = (+1)×11 = 11.' },
            { text: 'Determinant = 1×26 + 1×(−6) + 1×11 = 31. Area = ½ × |31| = 15.5 m².', faded: true, blankAnswer: '15.5 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_002', title: 'The area between a curve y = f(x) and.',
          scaffold: { problem: 'Find the area of the region bounded by the curve y = 6 - x - x^2 and the x-axis.',
            steps: [
            { text: 'Find the x-intercepts by solving 6 - x - x^2 = 0 → x^2 + x - 6 = 0 → (x+3)(x-2)=0 → x = -3, x = 2.' },
            { text: 'Since f(x) ≥ 0 on [-3, 2], the area is simply ∫_{-3}^2 (6 - x - x^2) dx.' },
            { text: 'Compute the antiderivative: ∫(6 - x - x^2) dx = 6x - x^2/2 - x^3/3.' },
            { text: 'Evaluate from -3 to 2: [6(2) - (2)^2/2 - (2)^3/3] - [6(-3) - (-3)^2/2 - (-3)^3/3] = [12 - 2 - 8/3] - [-18 - 9/2 + 27/3].' },
            { text: 'The area is 125/6 square units.', faded: true, blankAnswer: '125/6 square units' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_003', title: 'The area between two curves y = f(x).',
          scaffold: { problem: 'Find the area of the region bounded by the curves y = x² - 4x + 3 and y = -x² + 2x + 3.',
            steps: [
            { text: 'Find intersection points by equating the two functions: x² - 4x + 3 = -x² + 2x + 3 → 2x² - 6x = 0 → 2x(x - 3) = 0 → x =.' },
            { text: 'Determine which curve is upper on [0, 3]. Test x = 1: y₁ = 1 - 4 + 3 = 0; y₂ = -1 + 2 + 3 = 4.' },
            { text: 'Set up the integral for area using vertical strips: Area = ∫[0 to 3] [(-x² + 2x + 3) - (x² - 4x + 3)] dx = ∫[0 to 3].' },
            { text: 'Integrate term by term: ∫(-2x² + 6x) dx = -2(x³/3) + 6(x²/2) = -2x³/3 + 3x².' },
            { text: 'Evaluate from 0 to 3: [-2(27)/3 + 3(9)] - [0] = [-18 + 27] = 9 square units.', faded: true, blankAnswer: '9 square units' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_07_007', title: 'Identify each idea',
          dissect: { specimen: 'Area Under Simple', spots: [
            { id: 's1', label: 'The area under a simple', prompt: 'Which idea is this? — The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is.', answer: 'The area under a simple', options: ['The area under a simple', 'The definite integral of a', 'If two variables x and', 'The determinant of a 22'] },
            { id: 's2', label: 'The definite integral of a', prompt: 'Which idea is this? — The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the.', answer: 'The definite integral of a', options: ['The definite integral of a', 'The area under a simple', 'If two variables x and', 'The determinant of a 22'] },
            { id: 's3', label: 'If two variables x and', prompt: 'Which idea is this? — If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\).', answer: 'If two variables x and', options: ['If two variables x and', 'The area under a simple', 'The definite integral of a', 'The determinant of a 22'] },
            { id: 's4', label: 'The determinant of a 22', prompt: 'Which idea is this? — The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted.', answer: 'The determinant of a 22', options: ['The determinant of a 22', 'The area under a simple', 'The definite integral of a', 'If two variables x and'] },
            { id: 's5', label: 'The area between a curve', prompt: 'Which idea is this? — The area between a curve y = f(x) and the x-axis from x = a to x = b is given by the.', answer: 'The area between a curve', options: ['The area between a curve', 'The area under a simple', 'The definite integral of a', 'If two variables x and'] },
            { id: 's6', label: 'The area between two curves', prompt: 'Which idea is this? — The area between two curves y = f(x) and y = g(x) from x = a to x = b, where f(x) ≥ g(x).', answer: 'The area between two curves', options: ['The area between two curves', 'The area under a simple', 'The definite integral of a', 'If two variables x and'] }
          ] } }
    ],
    explore: { component: C12_MathematicsAreaUnderSimpleSim, prompt: 'Explore the interactive — Area Under Simple' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_08_001', difficulty: 'standard',
          question: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on.',
          hint: 'If stuck, revisit the evaluation of definite integrals (Chapter 7) and practice sketching.',
          misconception: 'Students often think that the definite integral ∫_a^b f(x) dx always gives the geometric area, even when f(x) is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is',
                  options: ['The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)', 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the definite integral ∫_a^b f(x) dx always gives the geometric area, even when f(x) is negative on part of the.' }
          ],
            remediations: { 'the-definite-integral-a-b': { steps: ['If a student makes this error, first have them sketch the curve and shade the region.', 'Ask: "Is the curve above or below the x-axis?" Then guide them to split the integral at the x-intercepts: Area = ∫_a^c.', 'Practice with y = cos x from 0 to 2π: identify roots at π/2 and 3π/2, set up three integrals with absolute values, and.', 'Emphasize that the integral gives signed area; geometric area is the sum of absolute values.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_007', difficulty: 'standard',
          question: 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is.',
          hint: 'If stuck, revisit the formulas for \\(\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\\), \\(\\sum i^2 =.',
          misconception: 'Students often write the Riemann sum as \\(\\sum f(x_i)\\) without the \\(\\Delta x\\) factor, or they use \\(\\Delta x =.',
          parts: [
                { id: 'a', prompt: 'Compare the right-endpoint sum and the midpoint sum for \\(f(x)=x^2\\) on \\([0,1]\\) with \\(n=4\\). Which is larger?', answer: 'Right-endpoint: \\(\\Delta x=0.25\\), \\(x_i=0.25,0.5,0.75,1.0\\)',
                  options: ['Right-endpoint: \\(\\Delta x=0.25\\), \\(x_i=0.25,0.5,0.75,1.0\\)', 'right-endpoint is always larger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Riemann sum as \\(\\sum f(x_i)\\) without the \\(\\Delta x\\) factor, or they use \\(\\Delta x = \\frac{b}{n}\\) instead of.' }
          ],
            remediations: { 'students-often-write-the-riemann': { steps: ['If a student drops \\(\\Delta x\\) or uses the wrong \\(\\Delta x\\): 1.', 'Ask: "What are the units of the sum?', 'Height is in metres, width must be in metres, so area is m².', 'What is \\(\\Delta x\\) in your sum?" 2.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the Riemann sum as \\(\\sum f(x_i)\\) without the \\(\\Delta x\\) factor, or they use \\(\\Delta x =.',
          parts: [
                { id: 'a', prompt: 'Compare the right-endpoint sum and the midpoint sum for \\(f(x)=x^2\\) on \\([0,1]\\) with \\(n=4\\). Which is larger?', answer: 'Right-endpoint: \\(\\Delta x=0.25\\), \\(x_i=0.25,0.5,0.75,1.0\\)',
                  options: ['Right-endpoint: \\(\\Delta x=0.25\\), \\(x_i=0.25,0.5,0.75,1.0\\)', 'right-endpoint is always larger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Riemann sum as \\(\\sum f(x_i)\\) without the \\(\\Delta x\\) factor, or they use \\(\\Delta x = \\frac{b}{n}\\) instead of.' }
          ],
            remediations: { 'students-often-write-the-riemann': { steps: ['If a student drops \\(\\Delta x\\) or uses the wrong \\(\\Delta x\\): 1.', 'Ask: "What are the units of the sum?', 'Height is in metres, width must be in metres, so area is m².', 'What is \\(\\Delta x\\) in your sum?" 2.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_010', difficulty: 'standard',
          question: 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable.',
          hint: 'If stuck, revisit c12_math_cbse_05_006 (Chain Rule) and practice differentiating.',
          misconception: 'Students often forget that \\(\\frac{dy}{dx}\\) in parametric form is a function of the parameter \\(t\\), not \\(x\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)',
                  options: ['If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget that \\(\\frac{dy}{dx}\\) in parametric form is a function of the parameter \\(t\\), not \\(x\\).' }
          ],
            remediations: { 'students-often-forget-that-frac': { steps: ['If a student inverts the quotient, have them re-derive the formula from the chain rule: \\(\\frac{dy}{dt} = \\frac{dy}{dx}.', 'Then isolate \\(\\frac{dy}{dx}\\) step by step.', 'If they substitute \\(t\\) too early, give them \\(x = t^2, y = t^3\\) and ask for \\(\\frac{dy}{dx}\\) at \\(t = -1\\).', 'Show that substituting \\(t = \\sqrt{x}\\) gives the wrong sign.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_04_002', difficulty: 'standard',
          question: 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad −.',
          hint: 'Revisit c10_math_cbse_04_005 (quadratic formula derivation) and c9_math_ch4_8.',
          misconception: 'Students consistently mishandle the (−1)ⁱ⁺ʲ sign factor when expanding 3×3 determinants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted',
                  options: ['The determinant of a 2×2 matrix A = [[a, b], [c, d]] is the scalar value ad − bc, denoted', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently mishandle the (−1)ⁱ⁺ʲ sign factor when expanding 3×3 determinants.' }
          ],
            remediations: { 'students-consistently-mishandle-the-1': { steps: ['Have the student write the 3×3 sign matrix explicitly: [ + − + ] [ − + − ] [ + − + ] 2.', 'Make them circle the (i,j) position of each element in the chosen expansion row/column and read off the sign from the.', 'Practice three expansions of the same numerical matrix along R1, R2, C1 — verifying all give identical results.', 'Drill: "Sign = + if (row+col) is even, − if odd." Repeat until automatic.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_002', difficulty: 'standard',
          question: 'The area between a curve y = f(x) and the x-axis from x = a to x = b is given.',
          hint: 'If stuck, revisit definite integration techniques (Class 12 Chapter 7) and practice.',
          misconception: 'Students often compute the area as simply ∫_a^b f(x) dx without checking if f(x) changes sign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area between a curve y = f(x) and the x-axis from x = a to x = b is given by the',
                  options: ['The area between a curve y = f(x) and the x-axis from x = a to x = b is given by the', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often compute the area as simply ∫_a^b f(x) dx without checking if f(x) changes sign.' }
          ],
            remediations: { 'students-often-compute-the-area': { steps: ['If a student makes this error, first have them graph the function to visually see regions above and below the x-axis.', 'Then, explicitly find all x-intercepts in the interval.', 'Next, set up separate integrals for each subinterval, and before summing, take the absolute value of each integral.', 'Practice with functions that have both positive and negative parts, like y = sin x on [0, 2π] or y = x^2 - 1 on [-2, 2].'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_003', difficulty: 'standard',
          question: 'The area between two curves y = f(x) and y = g(x) from x = a to x = b, where.',
          hint: 'Revisit c12_math_cbse_08_002 (Area Between Curve and X-Axis) and practice splitting.',
          misconception: 'Students consistently write Area = ∫[a to b] [f(x) - g(x)] dx without verifying which function is greater on the.',
          parts: [
                { id: 'a', prompt: 'State the formula for the area between two curves y = f(x) and y = g(x) from x = a to x = b, assuming f(x) ≥ g(x) on [a, b].', answer: 'Area = ∫[a to b] [f(x) - g(x)] dx',
                  options: ['Area = ∫[a to b] [f(x) - g(x)] dx', 'Area = ∫[a to b] [g(x) - f(x)] dx'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write Area = ∫[a to b] [f(x) - g(x)] dx without verifying which function is greater on the interval, and without.' }
          ],
            remediations: { 'students-consistently-write-area-a': { steps: ['If a student makes the upper/lower confusion error: Step 1 — Have them sketch both curves accurately on graph paper for.', 'Step 2 — Pick a test x-value in each subinterval (e.g., midpoint) and evaluate both functions numerically.', 'Step 3 — Label the higher value as "upper" and lower as "lower" on the sketch.', 'Step 4 — Rewrite the integral as ∫(upper - lower) dx.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
