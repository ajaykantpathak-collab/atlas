import type { SimDef } from '../../engine/types';
import C11_MathematicsDerivativesSumDifferenceSim from '../../../simulations/c6_12/C11_MathematicsDerivativesSumDifferenceSim';

/** v3 wrapped master — C11_MathematicsDerivativesSumDifferenceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsderivativessumdifferencesim: SimDef = {
    id: 'v3w_c11_mathematicsderivativessumdifferencesim',
    title: 'Derivative of Polynomial Functions',
    subtitle: 'Covers differentiation of polynomial functions in standard form using algebraic.',
    classLevel: 11, subject: 'mathematics', topic: 'Derivative of Polynomial Functions',
    chapters: [],
    nodeIds: ['c11_math_cbse_13_007', 'c11_math_cbse_13_009', 'c11_math_cbse_13_010', 'c11_math_cbse_02_006', 'c11_math_cbse_02_007', 'c11_math_cbse_02_011', 'c11_math_cbse_13_006', 'c11_math_cbse_13_008', 'c11_math_cbse_13_001', 'c11_math_cbse_02_005', 'c11_math_cbse_02_010', 'c11_math_cbse_02_008', 'c11_math_cbse_02_012', 'c11_math_cbse_09_002', 'c11_math_cbse_09_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a toy rocket launched vertically from a school playground; its height in metres after t seconds is.', goal: 'Master Derivative of Polynomial Functions.' },
    discovery: {
        question: 'Consider the function h: ℝ → ℝ defined by h(x) = f(x) + g(x) where f is the identity function and g is the constant function 5. Is h one-one? Is h onto?',
        options: ['h(x) = x+5', 'it\'s shifted up', 'it\'s not the identity'],
        answer: 'h(x) = x+5',
        hook: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.',
    },
    teaching: [
        { title: 'The derivative of a polynomial function f(x).', text: 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} + ...', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_007', title: 'The derivative of a polynomial function.',
          scaffold: { problem: 'A particle moves along a straight line such that its displacement s (in metres) from a fixed point O at time t (in seconds) is given by.',
            steps: [
            { text: 'Identify the given polynomial function s(t) = 4t^3 - 15t^2 + 12t + 7.' },
            { text: 'Differentiate s(t) term by term using the power rule d/dt(t^n) = n t^{n-1} and constant multiple rule: d/dt(4t^3) =.' },
            { text: 'Combine to get velocity function: v(t) = s\'(t) = 12t^2 - 30t + 12.' },
            { text: 'Differentiate v(t) to get acceleration function: a(t) = v\'(t) = d/dt(12t^2) - d/dt(30t) + d/dt(12) = 24t - 30.' },
            { text: 'Evaluate at t = 2: v(2) = 12(2)^2 - 30(2) + 12 = 48 - 60 + 12 = 0 m/s. a(2) = 24(2) - 30 = 48 - 30 = 18 m/s².' },
            { text: 'Interpret: At t = 2 s, the particle is momentarily at rest (velocity zero) but accelerating at 18 m/s², meaning it is.', faded: true, blankAnswer: 'Velocity at t = 2 s is 0 m/s; acceleration at t = 2 s is 18.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_009', title: 'The algebra of derivatives provides.',
          scaffold: { problem: 'The volume of a cuboid is given by \\(V(x) = (2x^2 + 3x)(x - 4)\\) cubic metres, where \\(x\\) is a design parameter in metres.',
            steps: [
            { text: 'Identify the two functions: \\(u(x) = 2x^2 + 3x\\) and \\(v(x) = x - 4\\).' },
            { text: 'Differentiate each function using the power rule: \\(u\'(x) = 4x + 3\\), \\(v\'(x) = 1\\).' },
            { text: 'Apply the product rule: \\(V\'(x) = u\'(x)v(x) + u(x)v\'(x) = (4x+3)(x-4) + (2x^2+3x)(1)\\).' },
            { text: 'Expand and simplify: \\((4x^2 - 16x + 3x - 12) + (2x^2 + 3x) = 4x^2 - 13x - 12 + 2x^2 + 3x = 6x^2 - 10x - 12\\).' },
            { text: 'Evaluate at \\(x = 2\\): \\(V\'(2) = 6(4) - 10(2) - 12 = 24 - 20 - 12 = -8\\) m³/m.', faded: true, blankAnswer: '\\(-8\\) m³/m' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_010', title: 'The derivative of a trigonometric.',
          scaffold: { problem: 'Find the derivative of f(x) = sin x + cos x from first principles. Verify using the algebra of derivatives.',
            steps: [
            { text: 'Write the first principle definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h = lim(h→0) [sin(x+h) + cos(x+h) - sin x - cos.' },
            { text: 'Use trigonometric identities: sin(x+h) = sin x cos h + cos x sin h; cos(x+h) = cos x cos h - sin x sin h.' },
            { text: 'Group terms with sin x and cos x: = lim(h→0) [sin x (cos h - 1) + cos x (sin h - 1) + cos x sin h - sin x sin h]/h.' },
            { text: 'Apply standard limits: lim(h→0) (cos h - 1)/h = 0; lim(h→0) sin h/h = 1.' },
            { text: 'Verify using algebra of derivatives: d/dx(sin x) + d/dx(cos x) = cos x + (-sin x) = cos x - sin x. Both methods match.', faded: true, blankAnswer: 'f\'(x) = cos x - sin x' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_006', title: 'A real-valued function is a relation f.',
          scaffold: { problem: 'A taxi service in Delhi charges a flat booking fee of ₹50 plus ₹12 per kilometre. Write the total fare as a function of distance travelled.',
            steps: [
            { text: 'Identify the components: flat fee = ₹50 (does not depend on distance) → constant function C(d) = 50.' },
            { text: 'Write the total fare function F(d) = C(d) + V(d) = 50 + 12d, where d ≥ 0 (distance in km).' },
            { text: 'For d = 15 km, compute F(15) = 50 + 12(15) = 50 + 180 = ₹230.' },
            { text: 'For fare = ₹290, solve 50 + 12d = 290 → 12d = 240 → d = 20 km.' },
            { text: 'Verify: F(20) = 50 + 12(20) = 50 + 240 = 290 ✓. Interpret: constant part is fixed cost, identity part (scaled) is.', faded: true, blankAnswer: 'Fare function F(d) = 50 + 12d; for 15 km fare = ₹230; for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_007', title: 'A polynomial function is a real-valued.',
          scaffold: { problem: 'A ball is thrown upward from a 20 m high building in Delhi with initial velocity 15 m/s.',
            steps: [
            { text: 'Identify the quadratic function: \\( h(t) = -5t^2 + 15t + 20 \\). Coefficients: \\( a = -5 \\), \\( b = 15 \\), \\( c = 20 \\).' },
            { text: 'Convert to vertex form by completing the square: \\( h(t) = -5(t^2 - 3t) + 20 = -5[(t - 1.5)^2 - 2.25] + 20 = -5(t -.' },
            { text: 'Maximum height = 31.25 m at \\( t = 1.5 \\) s. (Vertex \\( k \\)-value gives max since \\( a < 0 \\)).' },
            { text: 'Ball hits ground when \\( h(t) = 0 \\): \\( -5t^2 + 15t + 20 = 0 \\) → divide by -5: \\( t^2 - 3t - 4 = 0 \\) → \\( (t-4)(t+1).' },
            { text: 'Contextual domain: \\( 0 \\leq t \\leq 4 \\). Range: \\( 0 \\leq h \\leq 31.25 \\).', faded: true, blankAnswer: '(a) \\( h(t) = -5(t - 1.5)^2 + 31.25 \\) (b) Max height 31.25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_011', title: 'A real function is a rule that assigns.',
          scaffold: { problem: 'A Delhi Metro fare system charges ₹10 for the first 2 km, ₹5 per km for the next 3 km, and ₹8 per km thereafter.',
            steps: [
            { text: 'Define the piecewise function from the fare rules. For 0 ≤ d ≤ 2: C(d) = 10 (constant).' },
            { text: 'Verify continuity at boundaries: At d = 2, left: C(2) = 10; right: 5(2) = 10 ✓.' },
            { text: 'Graph each segment. Segment 1 (0 ≤ d ≤ 2): Horizontal line y = 10 from (0,10) to (2,10) — solid dots at both ends.' },
            { text: 'Find fare for 7.5 km: d = 7.5 > 5, so C(7.5) = 8(7.5) - 15 = 60 - 15 = ₹45.' },
            { text: 'Find distance for ₹65 fare: Solve C(d) = 65. Try segment 3: 8d - 15 = 65 → 8d = 80 → d = 10 km. Check: 10 > 5, valid.', faded: true, blankAnswer: 'C(d) = {10 for 0≤d≤2; 5d for 2<d≤5; 8d-15 for d>5}. Fare.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_13_009', title: 'Identify each idea',
          dissect: { specimen: 'Derivative of Polynomial Functions', spots: [
            { id: 's1', label: 'The derivative of a polynomial', prompt: 'Which idea is this? — The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} + ...', answer: 'The derivative of a polynomial', options: ['The derivative of a polynomial', 'The algebra of derivatives provides', 'The derivative of a trigonometric', 'A real-valued function is a'] },
            { id: 's2', label: 'The algebra of derivatives provides', prompt: 'Which idea is this? — The algebra of derivatives provides rules to differentiate combinations of functions.', answer: 'The algebra of derivatives provides', options: ['The algebra of derivatives provides', 'The derivative of a polynomial', 'The derivative of a trigonometric', 'A real-valued function is a'] },
            { id: 's3', label: 'The derivative of a trigonometric', prompt: 'Which idea is this? — The derivative of a trigonometric function f(x) at a point x is the limit of the.', answer: 'The derivative of a trigonometric', options: ['The derivative of a trigonometric', 'The derivative of a polynomial', 'The algebra of derivatives provides', 'A real-valued function is a'] },
            { id: 's4', label: 'A real-valued function is a', prompt: 'Which idea is this? — A real-valued function is a relation f from a non-empty set A ⊆ ℝ to a set B ⊆ ℝ such.', answer: 'A real-valued function is a', options: ['A real-valued function is a', 'The derivative of a polynomial', 'The algebra of derivatives provides', 'The derivative of a trigonometric'] },
            { id: 's5', label: 'A polynomial function is a', prompt: 'Which idea is this? — A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\).', answer: 'A polynomial function is a', options: ['A polynomial function is a', 'The derivative of a polynomial', 'The algebra of derivatives provides', 'The derivative of a trigonometric'] },
            { id: 's6', label: 'A real function is a', prompt: 'Which idea is this? — A real function is a rule that assigns to each real number x in its domain exactly one.', answer: 'A real function is a', options: ['A real function is a', 'The derivative of a polynomial', 'The algebra of derivatives provides', 'The derivative of a trigonometric'] }
          ] } }
    ],
    explore: { component: C11_MathematicsDerivativesSumDifferenceSim, prompt: 'Explore the interactive — Derivative of Polynomial Functions' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_13_007', difficulty: 'standard',
          question: 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} + ...',
          hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_8, c8_math_ch2_9) and.',
          misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3).',
          parts: [
                { id: 'a', prompt: 'Explain why the derivative of a constant term (like +7) is zero, using the concept of slope of a tangent line.', answer: 'The graph of y = 7 is a horizontal line',
                  options: ['The graph of y = 7 is a horizontal line', 'the derivative of 7 is 7'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3) or as 15x^3.' },
                { id: 'b', prompt: 'Two students differentiate f(x) = (x^2 + 3x)(2x - 1). Student A expands first: f(x) = 2x^3 + 5x^2 - 3x, then differentiates to get 6x^2 + 10x - 3.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'both are correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3) or as 15x^3.' }
          ],
            remediations: { 'students-frequently-write-the-derivative': { steps: ['Multiply the coefficient by the exponent: 5 × 3 = 15.', 'Keep x and reduce exponent by 1: x^(3-1) = x^2.', 'Combine: 15x^2." Use colour coding: coefficient in red, exponent in blue.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3).',
          parts: [
                { id: 'a', prompt: 'Two students differentiate f(x) = (x^2 + 3x)(2x - 1). Student A expands first: f(x) = 2x^3 + 5x^2 - 3x, then differentiates to get 6x^2 + 10x - 3.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'both are correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3) or as 15x^3.' }
          ],
            remediations: { 'students-frequently-write-the-derivative': { steps: ['Multiply the coefficient by the exponent: 5 × 3 = 15.', 'Keep x and reduce exponent by 1: x^(3-1) = x^2.', 'Combine: 15x^2." Use colour coding: coefficient in red, exponent in blue.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_009', difficulty: 'standard',
          question: 'The algebra of derivatives provides rules to differentiate combinations of.',
          hint: 'If stuck, revisit the power rule for negative and fractional exponents (from derivative.',
          misconception: 'The most persistent error is \\((uv)\' = u\'v\'\\) — students multiply the derivatives instead of using the cross-sum \\(u\'v.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The algebra of derivatives provides rules to differentiate combinations of functions',
                  options: ['The algebra of derivatives provides rules to differentiate combinations of functions', 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} +', 'The derivative of a trigonometric function f(x) at a point x is the limit of the', 'A real-valued function is a relation f from a non-empty set A ⊆ ℝ to a set B ⊆ ℝ such'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most persistent error is \\((uv)\' = u\'v\'\\) — students multiply the derivatives instead of using the cross-sum \\(u\'v + uv\'\\).' }
          ],
            remediations: { 'the-most-persistent-error-is': { steps: ['If a student writes \\((uv)\' = u\'v\'\\), immediately stop and do this: 1.', 'Take a simple product \\(f(x) = x \\cdot x = x^2\\).', 'Ask: "What is \\(f\'(x)\\)?" They\'ll say \\(2x\\).', 'Now apply their wrong rule: \\(u=x, v=x\\), so \\(u\'=1, v\'=1\\), their rule gives \\(1 \\cdot 1 = 1\\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_010', difficulty: 'standard',
          question: 'The derivative of a trigonometric function f(x) at a point x is the limit of.',
          hint: 'If stuck, revisit c11_math_cbse_13_003 (Limits of Trigonometric Functions) to master the.',
          misconception: 'Students write d/dx(sin 2x) = cos 2x by blindly applying d/dx(sin x) = cos x, treating 2x as if it were just x.',
          parts: [
                { id: 'a', prompt: 'Explain why we cannot directly substitute h = 0 in the difference quotient [sin(x+h) - sin x]/h when finding the derivative of sin x from first principles, and.', answer: 'Direct substitution gives 0/0, an indeterminate form',
                  options: ['Direct substitution gives 0/0, an indeterminate form', 'we factor out h'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write d/dx(sin 2x) = cos 2x by blindly applying d/dx(sin x) = cos x, treating 2x as if it were just x.' }
          ],
            remediations: { 'students-write-d-dx-sin': { steps: ['When a student writes d/dx(sin 2x) = cos 2x, immediately stop and ask: "What is the definition of derivative?', 'Write lim(h→0) [sin 2(x+h) - sin 2x]/h." Guide them to expand sin(2x+2h) = sin 2x cos 2h + cos 2x sin 2h.', 'Then split: sin 2x (cos 2h - 1)/h + cos 2x (sin 2h)/h.', 'Now multiply and divide by 2: 2 sin 2x (cos 2h - 1)/(2h) + 2 cos 2x (sin 2h)/(2h).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_006', difficulty: 'standard',
          question: 'A real-valued function is a relation f from a non-empty set A ⊆ ℝ to a set B ⊆.',
          hint: 'If stuck, revisit c11_math_cbse_02_005 (function definition, domain, range) and.',
          misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the identity function f: ℝ → ℝ defined by f(x) = x and the constant function g: ℝ → ℝ defined by g(x) = 7.', answer: 'Domain of f = ℝ, Range of f = ℝ',
                  options: ['Domain of f = ℝ, Range of f = ℝ', 'a constant function can take multiple values'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' },
                { id: 'b', prompt: 'Let f(x) = x (identity) and g(x) = 3 (constant). Compute (f+g)(x), (f−g)(x), (f·g)(x), and (f/g)(x). State the domain of each resulting function.', answer: '(f+g)(x) = x+3, domain ℝ',
                  options: ['(f+g)(x) = x+3, domain ℝ', 'denominator ≠ 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' },
                { id: 'c', prompt: 'Consider the function h: ℝ → ℝ defined by h(x) = f(x) + g(x) where f is the identity function and g is the constant function 5. Is h one-one? Is h onto?', answer: 'h(x) = x+5',
                  options: ['h(x) = x+5', 'it\'s shifted up', 'it\'s not the identity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' }
          ],
            remediations: { 'if-a-function-satisfies-f': { steps: ['If a student exhibits the fixed-point misconception: (1) Write the definition of identity function: f: ℝ→ℝ, f(x)=x.', 'Ask: "Is f(2)=2?" Compute f(2)=4.', '"Since 4≠2, f is not the identity function." (3) Explain: fixed points are where graph y=f(x) meets y=x; identity.', '(4) Practice: give 3 functions (x², x³, |x|, 2x) and ask which are identity.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The function f(x) = x² is an identity function because when x=1, f(1)=1, and when x=0, f(0)=0, so it returns the same value." Evaluate this.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'f(x)=x for some x', 'f(x)=x for all x'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' }
          ],
            remediations: { 'if-a-function-satisfies-f': { steps: ['If a student exhibits the fixed-point misconception: (1) Write the definition of identity function: f: ℝ→ℝ, f(x)=x.', 'Ask: "Is f(2)=2?" Compute f(2)=4.', '"Since 4≠2, f is not the identity function." (3) Explain: fixed points are where graph y=f(x) meets y=x; identity.', '(4) Practice: give 3 functions (x², x³, |x|, 2x) and ask which are identity.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_007', difficulty: 'standard',
          question: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R}.',
          hint: 'If stuck, revisit Class 10 Chapter 2 (Polynomials) for zeros and factorisation, and Class.',
          misconception: 'Students treat the expression \\( f(x) = ax^2 + bx + c \\) and the function \\( f \\) as interchangeable without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)',
                  options: ['A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)', 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} +', 'The algebra of derivatives provides rules to differentiate combinations of functions', 'The derivative of a trigonometric function f(x) at a point x is the limit of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the expression \\( f(x) = ax^2 + bx + c \\) and the function \\( f \\) as interchangeable without considering domain.' }
          ],
            remediations: { 'students-treat-the-expression-f': { steps: ['If a student simplifies \\( \\frac{x^2-1}{x-1} \\) to \\( x+1 \\) and says domain is \\( \\mathbb{R} \\), stop them.', 'Ask: "What is \\( g(1) \\)?" They\'ll say 0.', 'Then ask: "Can we divide by \\( g(1) \\)?" No.', 'So \\( x=1 \\) is not in the domain of \\( f/g \\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_011', difficulty: 'standard',
          question: 'A real function is a rule that assigns to each real number x in its domain.',
          hint: 'If stuck, review c9_math_ch1_1 (Cartesian Coordinate System) and c9_math_ch2_5 (Graph of.',
          misconception: 'Students incorrectly graph the greatest integer function f(x) = [x] by drawing solid dots at both ends of each.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A real function is a rule that assigns to each real number x in its domain exactly one',
                  options: ['A real function is a rule that assigns to each real number x in its domain exactly one', 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} +', 'The algebra of derivatives provides rules to differentiate combinations of functions', 'The derivative of a trigonometric function f(x) at a point x is the limit of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly graph the greatest integer function f(x) = [x] by drawing solid dots at both ends of each horizontal segment, e.g., at.' }
          ],
            remediations: { 'students-incorrectly-graph-the-greatest': { steps: ['Have the student write the definition: [x] = greatest integer ≤ x.', 'Test specific values: [1.2] = 1, [1] = 1, [0.999] = 0, [-0.5] = -1, [-1] = -1.', 'Plot these points on a number line, then on Cartesian plane.', 'For interval [1, 2), every x gives y = 1 → horizontal line at y = 1 from x = 1 (included, solid dot) to x = 2.', 'Repeat for [-1, 0), [0, 1), [2, 3).', 'Explicitly state: "At x = integer n, the function value is n (solid dot at (n, n)), but just before n, the value is n-1.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
