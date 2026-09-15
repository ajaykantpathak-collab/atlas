import type { SimDef } from '../../engine/types';
import C12_AppliedMathsDifferentiationApplicationsSim from '../../../simulations/c6_12/C12_AppliedMathsDifferentiationApplicationsSim';

/** v3 wrapped master — C12_AppliedMathsDifferentiationApplicationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsdifferentiationapplicationssim: SimDef = {
    id: 'v3w_c12_appliedmathsdifferentiationapplicationssim',
    title: 'Applied Maths Differentiation Applications',
    subtitle: 'This node covers the derivation and application of derivatives of the six inverse.',
    classLevel: 12, subject: 'science', topic: 'Derivatives of Inverse Trigonometric Functions',
    chapters: [],
    nodeIds: ['c12_math_cbse_05_008', 'c12_math_cbse_05_011', 'c12_math_cbse_05_012', 'c12_math_cbse_05_013', 'c12_math_cbse_06_005', 'c12_math_cbse_07_008', 'c12_math_cbse_10_005', 'c12_math_cbse_06_001', 'c12_math_cbse_07_009', 'c12_math_cbse_07_010', 'c12_math_cbse_05_001', 'c12_math_cbse_05_002', 'c12_math_cbse_05_003', 'c12_math_cbse_05_004', 'c12_math_cbse_05_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are designing a roller coaster track where the banking angle \\( \\theta \\) at any point depends on.', goal: 'Master Applied Maths Differentiation Applications.' },
    discovery: {
        question: 'What is the mathematical definition of the second order derivative of a function \\(y = f(x)\\)? Write the notation used for it.',
        options: ['The second order derivative is the derivative of the first derivative:', 'square of first derivative', 'derivative of \\(y\\) with respect to \\(x^2\\)'],
        answer: 'The second order derivative is the derivative of the first derivative:',
        hook: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).',
    },
    teaching: [
        { title: 'The derivative of an inverse trigonometric.', text: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x \\), \\( \\tan^{-1}x \\), \\( \\cot^{-1}x \\), \\( \\sec^{-1}x \\), or \\( \\csc^{-1}x \\) is obtained by differentiating.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_008', title: 'The derivative of an inverse.',
          scaffold: { problem: 'A camera is mounted on a pole 10 metres high. A car moves away from the pole at 20 m/s.',
            steps: [
            { text: 'Identify given and unknown. Given: pole height = 10 m, dx/dt = 20 m/s (car moving away), x = 15 m at the instant of.' },
            { text: 'Write the relationship. tan θ = 10/x ⇒ θ = tan⁻¹(10/x). This is an inverse trigonometric function of x.' },
            { text: 'Differentiate with respect to time t using chain rule. dθ/dt = dθ/dx · dx/dt. First find dθ/dx = d/dx[tan⁻¹(10/x)].' },
            { text: 'Apply chain rule to tan⁻¹(10/x). Let u = 10/x. d/dx[tan⁻¹u] = (1/(1+u²)) · du/dx. Here du/dx = -10/x².' },
            { text: 'Substitute x = 15 m and dx/dt = 20 m/s. dθ/dt = (-10/(15²+100)) × 20 = (-10/325) × 20 = -200/325 = -8/13 rad/s.', faded: true, blankAnswer: '-8/13 rad/s (angle of depression decreasing at 8/13 rad/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_011', title: 'The second order derivative of a.',
          scaffold: { problem: 'A particle moves along a straight line such that its displacement \\(s\\) (in metres) at time \\(t\\) (in seconds) is given by \\(s(t) = 4t^3 -.',
            steps: [
            { text: 'Write the given displacement function: \\(s(t) = 4t^3 - 15t^2 + 18t + 5\\).' },
            { text: 'Find velocity \\(v(t) = \\frac{ds}{dt}\\) by differentiating once using power rule and sum rule:' },
            { text: 'Find acceleration \\(a(t) = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}\\) by differentiating velocity:' },
            { text: 'Evaluate at \\(t = 2\\):' },
            { text: 'Interpret: At \\(t=2\\) s, the particle is moving forward (positive velocity) and speeding up (positive acceleration,.', faded: true, blankAnswer: 'Velocity = 6 m/s, Acceleration = 18 m/s². The particle is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_012', title: 'Rolle\'s Theorem states that if a.',
          scaffold: { problem: 'Verify Rolle\'s Theorem for f(x) = x³ − 6x² + 11x − 6 on [1, 3]. Find all values of c ∈ (1, 3) satisfying f\'(c) = 0.',
            steps: [
            { text: 'Check condition 1 — f(x) is a polynomial, so it is continuous on the closed interval [1, 3].' },
            { text: 'Check condition 2 — f(x) is a polynomial, so it is differentiable on the open interval (1, 3) (in fact on ℝ).' },
            { text: 'Check condition 3 — f(1) = 1 − 6 + 11 − 6 = 0, f(3) = 27 − 54 + 33 − 6 = 0. Thus f(1) = f(3) = 0.' },
            { text: 'All conditions satisfied. Compute derivative: f\'(x) = 3x² − 12x + 11.' },
            { text: 'Set f\'(c) = 0 ⇒ 3c² − 12c + 11 = 0 ⇒ c = [12 ± √(144 − 132)]/6 = [12 ± √12]/6 = 2 ± √3/3.' },
            { text: 'Check interval membership: √3/3 ≈ 0.577, so c₁ = 2 − 0.577 = 1.423 ∈ (1, 3), c₂ = 2 + 0.577 = 2.577 ∈ (1, 3).', faded: true, blankAnswer: 'c = 2 − √3/3 and c = 2 + √3/3 (both in (1, 3))' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_013', title: 'The Mean Value Theorem (MVT) states: If.',
          scaffold: { problem: 'Verify the Mean Value Theorem for \\( f(x) = \\sqrt{x} \\) on the interval \\([1, 4]\\). Find the value(s) of \\( c \\).',
            steps: [
            { text: 'Check hypotheses. \\( f(x) = \\sqrt{x} \\) is continuous on \\([1, 4]\\) (square root function is continuous for \\( x \\ge 0.' },
            { text: 'Compute endpoints. \\( f(1) = 1 \\), \\( f(4) = 2 \\).' },
            { text: 'Compute secant slope. \\( \\frac{f(4)-f(1)}{4-1} = \\frac{2-1}{3} = \\frac{1}{3} \\).' },
            { text: 'Find derivative. \\( f\'(x) = \\frac{1}{2\\sqrt{x}} \\). Set \\( f\'(c) = \\frac{1}{3} \\Rightarrow \\frac{1}{2\\sqrt{c}} =.' },
            { text: 'Verify \\( c \\in (1, 4) \\). Yes, \\( 2.25 \\in (1, 4) \\). MVT verified.', faded: true, blankAnswer: '\\( c = \\frac{9}{4} \\) (or 2.25)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_005', title: 'For a curve y = f(x) differentiable at.',
          scaffold: { problem: 'A roller coaster track follows the curve y = x³ - 6x² + 9x + 2 (metres).',
            steps: [
            { text: 'Find the point of tangency. Substitute x = 2 into the curve: y = (2)³ - 6(2)² + 9(2) + 2 = 8 - 24 + 18 + 2 = 4.' },
            { text: 'Differentiate the curve to find the slope function. f\'(x) = d/dx(x³ - 6x² + 9x + 2) = 3x² - 12x + 9.' },
            { text: 'Evaluate the derivative at x = 2 to get the tangent slope. f\'(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3.' },
            { text: 'Write the tangent equation using point-slope form: y - 4 = -3(x - 2). Simplify: y - 4 = -3x + 6 → 3x + y - 10 = 0.' },
            { text: 'Find the normal slope using perpendicular condition: m_normal = -1/m_tangent = -1/(-3) = 1/3.' },
            { text: 'Write the normal equation: y - 4 = (1/3)(x - 2). Simplify: 3y - 12 = x - 2 → x - 3y + 10 = 0.' },
            { text: 'Find the angle with positive x-axis. tan θ = m_tangent = -3. Since slope is negative, θ is in second quadrant: θ = π -.', faded: true, blankAnswer: 'Tangent: 3x + y - 10 = 0; Normal: x - 3y + 10 = 0; Angle:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_008', title: 'The Fundamental Theorem of Calculus.',
          scaffold: { problem: 'A car starts from rest and its acceleration (in m/s²) at time \\( t \\) seconds is given by \\( a(t) = 6t - 2 \\) for \\( 0 \\le t \\le 5 \\).',
            steps: [
            { text: 'Since acceleration is the derivative of velocity, the velocity at time \\( x \\) is the integral of acceleration from 0.' },
            { text: 'Compute the integral: \\( \\int_0^x (6t - 2) \\, dt = \\left[ 3t^2 - 2t \\right]_0^x = 3x^2 - 2x \\).' },
            { text: 'By the First Fundamental Theorem, the derivative of \\( v(x) \\) with respect to \\( x \\) is the integrand evaluated at \\(.' },
            { text: 'Directly differentiate \\( v(x) = 3x^2 - 2x \\) to get \\( v\'(x) = 6x - 2 \\), which matches \\( a(x) \\).', faded: true, blankAnswer: '\\( v(x) = 3x^2 - 2x \\) m/s; acceleration at time \\( x \\) is.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_05_011', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Differentiation Applications', spots: [
            { id: 's1', label: 'The derivative of an inverse', prompt: 'Which idea is this? — The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x.', answer: 'The derivative of an inverse', options: ['The derivative of an inverse', 'The second order derivative of', 'Rolles Theorem states that if', 'The Mean Value Theorem MVT'] },
            { id: 's2', label: 'The second order derivative of', prompt: 'Which idea is this? — The second order derivative of a function \\(y = f(x)\\) is the derivative of its first.', answer: 'The second order derivative of', options: ['The second order derivative of', 'The derivative of an inverse', 'Rolles Theorem states that if', 'The Mean Value Theorem MVT'] },
            { id: 's3', label: 'Rolles Theorem states that if', prompt: 'Which idea is this? — Rolle\'s Theorem states that if a real-valued function f is continuous on the closed.', answer: 'Rolles Theorem states that if', options: ['Rolles Theorem states that if', 'The derivative of an inverse', 'The second order derivative of', 'The Mean Value Theorem MVT'] },
            { id: 's4', label: 'The Mean Value Theorem MVT', prompt: 'Which idea is this? — The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed.', answer: 'The Mean Value Theorem MVT', options: ['The Mean Value Theorem MVT', 'The derivative of an inverse', 'The second order derivative of', 'Rolles Theorem states that if'] },
            { id: 's5', label: 'For a curve y', prompt: 'Which idea is this? — For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the straight line.', answer: 'For a curve y', options: ['For a curve y', 'The derivative of an inverse', 'The second order derivative of', 'Rolles Theorem states that if'] },
            { id: 's6', label: 'The Fundamental Theorem of Calculus', prompt: 'Which idea is this? — The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous.', answer: 'The Fundamental Theorem of Calculus', options: ['The Fundamental Theorem of Calculus', 'The derivative of an inverse', 'The second order derivative of', 'Rolles Theorem states that if'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsDifferentiationApplicationsSim, prompt: 'Explore the interactive — Applied Maths Differentiation Applications' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_05_008', difficulty: 'standard',
          question: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\(.',
          hint: 'Review implicit differentiation (c12_math_cbse_05_007) and the principal value branch.',
          misconception: 'Students write \\( \\frac{d}{dx}(\\sin^{-1}(2x)) = \\frac{1}{\\sqrt{1-(2x)^2}} \\) forgetting the chain rule factor of 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x',
                  options: ['The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first', 'Rolle\'s Theorem states that if a real-valued function f is continuous on the closed', 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write \\( \\frac{d}{dx}(\\sin^{-1}(2x)) = \\frac{1}{\\sqrt{1-(2x)^2}} \\) forgetting the chain rule factor of 2.' }
          ],
            remediations: { 'students-write-frac-d-dx': { steps: ['If a student makes the chain rule error, have them redo c12_math_cbse_05_006 (Chain Rule) with 5 practice problems of.', 'If they confuse \\( \\sin^{-1} \\) with \\( \\csc \\), revisit c11_math_cbse_03_003 (Trigonometric Functions Definition) and.', 'For sign errors in radicals, make them explicitly write the principal value range for each inverse trig function and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_011', difficulty: 'standard',
          question: 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its.',
          hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions.',
          misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).',
          parts: [
                { id: 'a', prompt: 'What is the mathematical definition of the second order derivative of a function \\(y = f(x)\\)? Write the notation used for it.', answer: 'The second order derivative is the derivative of the first derivative:',
                  options: ['The second order derivative is the derivative of the first derivative:', 'square of first derivative', 'derivative of \\(y\\) with respect to \\(x^2\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'b', prompt: 'Explain why the second derivative of any linear function \\(f(x) = ax + b\\) is zero. What does this mean geometrically for the graph of the function?', answer: 'For \\(f(x) = ax + b\\), the first derivative \\(f\'(x) = a\\) is a constant',
                  options: ['For \\(f(x) = ax + b\\), the first derivative \\(f\'(x) = a\\) is a constant', 'second derivative is \\(a\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'c', prompt: 'Find the second order derivative of \\(y = x^3 \\log x\\) (where \\(\\log\\) denotes natural logarithm). Show all steps.', answer: 'Step 1: \\(y = x^3 \\log x\\)',
                  options: ['Step 1: \\(y = x^3 \\log x\\)', 'forget the chain/product rule on the second pass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' }
          ],
            remediations: { 'misconception-frac-d-2y-dx': { steps: ['**Revisit notation:** Write \\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)\\) explicitly on paper every.', 'Say aloud: "derivative of the derivative." 2.', '**Drill first-derivative rules:** Do 5 quick problems from c12_math_cbse_05_006 (Chain Rule) and c12_math_cbse_05_010.', '**Practice the parametric second-derivative pattern:** For \\(x = f(t), y = g(t)\\), write the template: \\(\\frac{dy}{dx}.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_012', difficulty: 'standard',
          question: 'Rolle\'s Theorem states that if a real-valued function f is continuous on the.',
          hint: 'If stuck, revisit c12_math_cbse_05_005 (Differentiability at a Point) to practice.',
          misconception: 'Students often write "f is differentiable on [a, b]" instead of "f is differentiable on (a, b)" when stating the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rolle\'s Theorem states that if a real-valued function f is continuous on the closed',
                  options: ['Rolle\'s Theorem states that if a real-valued function f is continuous on the closed', 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first', 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "f is differentiable on [a, b]" instead of "f is differentiable on (a, b)" when stating the theorem.' }
          ],
            remediations: { 'students-often-write-f-is': { steps: ['If a student cannot correctly apply Rolle\'s Theorem: (1) Make them write the three conditions as a checklist: [ ].', '[ ] Differentiable on (a,b)?', '(2) For each condition, have them explicitly test it — e.g., for differentiability, compute left and right derivatives.', '(3) Practice with f(x) = x^{2/3} on [−1,1] (fails differentiability at 0) and f(x) = {x² if x≤1, 2−x if x>1} on [0,2].'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_013', difficulty: 'standard',
          question: 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the.',
          hint: 'Revisit Rolle\'s Theorem (c12_math_cbse_05_012) and practice checking.',
          misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed',
                  options: ['The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed', 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first', 'Rolle\'s Theorem states that if a real-valued function f is continuous on the closed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c) =.' }
          ],
            remediations: { 'specific-error-students-frequently-write': { steps: ['**Revisit Rolle\'s Theorem (c12_math_cbse_05_012):** Ensure you can state it and verify its conditions.', 'MVT proof is a direct application of Rolle\'s Theorem to a modified function.', '**Practice Condition-Checking:** For 5 different functions on given intervals, explicitly write: "Continuous on [a,b].', 'Differentiable on (a,b) because..." before attempting to find \\( c \\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c).',
          parts: [
                { id: 'a', prompt: 'A student claims: "The function \\( f(x) = \\frac{1}{x} \\) on \\([-1, 1]\\) satisfies the Mean Value Theorem because it is differentiable everywhere except at 0,.', answer: '**Correct Answer:** The student is INCORRECT',
                  options: ['**Correct Answer:** The student is INCORRECT', 'differentiable almost everywhere', 'differentiable on the whole open interval'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c) =.' }
          ],
            remediations: { 'specific-error-students-frequently-write': { steps: ['**Revisit Rolle\'s Theorem (c12_math_cbse_05_012):** Ensure you can state it and verify its conditions.', 'MVT proof is a direct application of Rolle\'s Theorem to a modified function.', '**Practice Condition-Checking:** For 5 different functions on given intervals, explicitly write: "Continuous on [a,b].', 'Differentiable on (a,b) because..." before attempting to find \\( c \\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_005', difficulty: 'standard',
          question: 'For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the.',
          hint: 'If stuck on differentiation, revisit c11_math_cbse_13_009 (Algebra of Derivatives).',
          misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀),.',
          parts: [
                { id: 'a', prompt: 'State the equation of the normal to the curve y = f(x) at the point (x₀, y₀) when f\'(x₀) = 2.', answer: 'The normal equation is y - y₀ = -1/2 (x - x₀)',
                  options: ['The normal equation is y - y₀ = -1/2 (x - x₀)', 'negative slope', 'negative reciprocal slope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' },
                { id: 'b', prompt: 'A student writes the tangent to y = x² at (2, 4) as y = 4x. Is this correct? Explain why or why not using the point-slope form.', answer: 'No, it\'s incorrect',
                  options: ['No, it\'s incorrect', 'negative slope', 'negative reciprocal slope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' },
                { id: 'c', prompt: 'Find the equation of the tangent to the curve y = 3x² - 4x + 5 at the point where x = 2.', answer: 'Step 1: y = 3x² - 4x + 5, so y₀ = 3(4) - 8 + 5 = 9',
                  options: ['Step 1: y = 3x² - 4x + 5, so y₀ = 3(4) - 8 + 5 = 9', 'negative slope', 'negative reciprocal slope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' }
          ],
            remediations: { 'students-consistently-write-the-normal': { steps: ['Have them plot y = x² and draw tangent at (1, 1) with slope 2.', 'Ask them to draw a perpendicular line and estimate its slope visually (should be -1/2).', 'Review c11_math_cbse_10_007: if m₁m₂ = -1, then m₂ = -1/m₁.', 'Practice 5 problems where f\'(x₀) = 2, 3, -1/2, -4, 1/3, writing both tangent and normal each time.', 'Re-attempt DIAGNOSTIC_QUESTION_1 and DIAGNOSTIC_QUESTION_5.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀),.',
          parts: [
                { id: 'a', prompt: 'A solution claims: "The normal to y = √x at (4, 2) has equation y - 2 = -4(x - 4) because f\'(x) = 1/(2√x), f\'(4) = 1/4, so normal slope = -4." Identify if this.', answer: 'The solution is correct',
                  options: ['The solution is correct', 'negative slope', 'negative reciprocal slope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀), confusing "negative.' }
          ],
            remediations: { 'students-consistently-write-the-normal': { steps: ['Have them plot y = x² and draw tangent at (1, 1) with slope 2.', 'Ask them to draw a perpendicular line and estimate its slope visually (should be -1/2).', 'Review c11_math_cbse_10_007: if m₁m₂ = -1, then m₂ = -1/m₁.', 'Practice 5 problems where f\'(x₀) = 2, 3, -1/2, -4, 1/3, writing both tangent and normal each time.', 'Re-attempt DIAGNOSTIC_QUESTION_1 and DIAGNOSTIC_QUESTION_5.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_008', difficulty: 'standard',
          question: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a.',
          hint: 'Review the definition of derivative as a limit and the geometric interpretation of the.',
          misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous',
                  options: ['The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first', 'Rolle\'s Theorem states that if a real-valued function f is continuous on the closed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.' }
          ],
            remediations: { 'students-often-confuse-the-variable': { steps: ['If a student makes the above errors, take them through the following steps: (1) Write the area function \\( A(x) =.', '(2) For chain rule cases, set \\( u = g(x) \\) and write \\( A(g(x)) = \\int_a^{g(x)} f(t) \\, dt \\).', 'Then compute \\( \\frac{d}{dx} A(g(x)) = A\'(g(x)) \\cdot g\'(x) = f(g(x)) \\cdot g\'(x) \\).', '(3) Practice with simple functions like \\( f(t) = t \\) and \\( g(x) = x^2 \\) to see the pattern.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
