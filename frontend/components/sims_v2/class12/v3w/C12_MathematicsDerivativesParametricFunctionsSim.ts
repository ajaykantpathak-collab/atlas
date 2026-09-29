import type { SimDef } from '../../engine/types';
import C12_MathematicsDerivativesParametricFunctionsSim from '../../../simulations/c6_12/C12_MathematicsDerivativesParametricFunctionsSim';

/** v3 wrapped master — C12_MathematicsDerivativesParametricFunctionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsderivativesparametricfunctionssim: SimDef = {
    id: 'v3w_c12_mathematicsderivativesparametricfunctionssim',
    title: 'Rate of Change of Quantities',
    subtitle: 'This node covers: instantaneous rate of change dy/dx, chain rule for parametric rates.',
    classLevel: 12, subject: 'mathematics', topic: 'Rate of Change of Quantities',
    chapters: [],
    nodeIds: ['c12_math_cbse_06_001', 'c12_math_cbse_06_008', 'c12_math_cbse_05_004', 'c12_math_cbse_05_005', 'c12_math_cbse_05_006', 'c12_math_cbse_05_007', 'c12_math_cbse_05_009', 'c12_math_cbse_05_010', 'c12_math_cbse_05_011', 'c12_math_cbse_06_002', 'c12_math_cbse_06_003', 'c12_math_cbse_06_004', 'c12_math_cbse_06_007', 'c12_math_cbse_07_010', 'c12_math_cbse_06_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are filling a spherical balloon with helium at a steady rate of 900 cm³/s.', goal: 'Master Rate of Change of Quantities.' },
    discovery: {
        question: 'A cube\'s volume V = x³ where x is the edge length. If the volume increases at 9 cm³/s, a student writes dx/dt = 9 / (3x²) and then substitutes x = 10 to get.',
        options: ['Yes, the method and answer are correct', 'rate of change of volume', 'rate of change of edge'],
        answer: 'Yes, the method and answer are correct',
        hook: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.',
    },
    teaching: [
        { title: 'The rate of change of a quantity y with.', text: 'The rate of change of a quantity y with respect to another quantity x is defined as the derivative dy/dx (or f\'(x)) where y = f(x).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_001', title: 'The rate of change of a quantity y with.',
          scaffold: { problem: 'A spherical balloon is being inflated at 900 cm³/s. Find the rate at which the radius increases when the radius is 15 cm.',
            steps: [
            { text: 'Identify known and unknown. Given: dV/dt = 900 cm³/s (rate of volume increase). Find: dr/dt when r = 15 cm.' },
            { text: 'Write the geometric relation. Volume of sphere: V = (4/3)πr³.' },
            { text: 'Differentiate both sides with respect to time t using chain rule.' },
            { text: 'Substitute known values. 900 = 4π(15)² (dr/dt) = 4π(225) (dr/dt) = 900π (dr/dt).' },
            { text: 'Solve for dr/dt. dr/dt = 900 / (900π) = 1/π cm/s ≈ 0.318 cm/s.', faded: true, blankAnswer: 'dr/dt = 1/π cm/s ≈ 0.318 cm/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_008', title: 'A **critical point** of a function \\(.',
          scaffold: { problem: 'A rectangular sheet of tin 45 cm by 24 cm is to be made into an open-top box by cutting equal squares from each corner and folding up the.',
            steps: [
            { text: 'Let \\( x \\) cm be the side of the square cut from each corner.' },
            { text: 'Volume \\( V(x) = x(45 - 2x)(24 - 2x) = x(1080 - 90x - 48x + 4x^2) = 4x^3 - 138x^2 + 1080x \\).' },
            { text: 'Find critical points: \\( V\'(x) = 12x^2 - 276x + 1080 = 12(x^2 - 23x + 90) = 12(x - 5)(x - 18) \\).' },
            { text: 'Use second derivative test: \\( V\'\'(x) = 24x - 276 \\). At \\( x = 5 \\), \\( V\'\'(5) = 120 - 276 = -156 < 0 \\) → local.' },
            { text: 'Check endpoints (though volume → 0 as \\( x \\to 0^+ \\) or \\( x \\to 12^- \\), so local max is absolute max).', faded: true, blankAnswer: 'Side of square to be cut off = 5 cm. Maximum volume = \\(.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_004', title: 'A function \\( f \\) is differentiable at.',
          scaffold: { problem: 'A toy car moves along a straight track. Its position (in cm) at time \\( t \\) (in seconds) is given by \\( s(t) = \\begin{cases} t^2, & 0 \\le.',
            steps: [
            { text: 'Identify the function and the point. We need to check differentiability of \\( s(t) \\) at \\( t=2 \\).' },
            { text: 'Write the left-hand derivative (for \\( h \\to 0^- \\), we use \\( t=2+h \\le 2 \\), so the first piece \\( t^2 \\)).' },
            { text: 'Write the right-hand derivative (for \\( h \\to 0^+ \\), we use \\( t=2+h > 2 \\), so the second piece \\( 4t-4 \\)).' },
            { text: 'Compare. Both one-sided derivatives exist, are finite, and equal 4 cm/s.' },
            { text: 'Verify continuity (optional but good practice): \\( \\lim_{t \\to 2^-} s(t) = 4 \\), \\( \\lim_{t \\to 2^+} s(t) = 4 \\), \\(.', faded: true, blankAnswer: 'Yes, the velocity is well-defined at \\( t=2 \\) seconds and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_005', title: 'A function \\( f \\) is differentiable at.',
          scaffold: { problem: 'A toy car moves along a straight track. Its position (in metres) at time \\( t \\) seconds is given by \\( s(t) = \\begin{cases} t^2, & 0 \\le t.',
            steps: [
            { text: 'Check continuity at \\( t = 2 \\). \\( s(2) = 2^2 = 4 \\). LHL = \\( \\lim_{t\\to 2^-} t^2 = 4 \\).' },
            { text: 'Compute left-hand derivative (LHD) at \\( t=2 \\) using definition: LHD = \\( \\lim_{h\\to 0^-} \\frac{s(2+h)-s(2)}{h} \\).' },
            { text: 'Compute right-hand derivative (RHD) at \\( t=2 \\): RHD = \\( \\lim_{h\\to 0^+} \\frac{s(2+h)-s(2)}{h} \\).' },
            { text: 'Compare LHD and RHD. Both equal 4. Therefore, \\( s \\) is differentiable at \\( t=2 \\) and \\( s\'(2) = 4 \\) m/s.' },
            { text: 'Interpret: The velocity at exactly 2 seconds is 4 m/s. The motion is smooth (no jerk) at that instant.', faded: true, blankAnswer: 'Yes, velocity exists at \\( t=2 \\) s and equals 4 m/s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_006', title: 'The chain rule states that if a.',
          scaffold: { problem: 'The radius \\( r \\) (in cm) of a circular oil spill increases with time \\( t \\) (in minutes) as \\( r(t) = 3t + 2 \\).',
            steps: [
            { text: 'Identify the composite relationship: \\( A \\) is a function of \\( r \\), and \\( r \\) is a function of \\( t \\).' },
            { text: 'Apply the chain rule: \\( \\frac{dA}{dt} = \\frac{dA}{dr} \\cdot \\frac{dr}{dt} \\).' },
            { text: 'Compute \\( \\frac{dA}{dr} = \\frac{d}{dr}(\\pi r^2) = 2\\pi r \\).' },
            { text: 'Compute \\( \\frac{dr}{dt} = \\frac{d}{dt}(3t + 2) = 3 \\).' },
            { text: 'Multiply: \\( \\frac{dA}{dt} = 2\\pi r \\cdot 3 = 6\\pi r \\). Substitute \\( r = 3(4) + 2 = 14 \\) cm.', faded: true, blankAnswer: '\\( 84\\pi \\) cm²/min (approximately 263.9 cm²/min).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_007', title: 'An implicit function is a relationship.',
          scaffold: { problem: 'A circular track has equation x² + y² = 100 (metres). Find the slope of the tangent at the point (6, 8) and interpret its meaning for a.',
            steps: [
            { text: 'Write the given implicit relation: x² + y² = 100. Identify that we need dy/dx at (6, 8).' },
            { text: 'Differentiate both sides with respect to x: d/dx(x²) + d/dx(y²) = d/dx(100).' },
            { text: 'Apply derivatives: 2x + 2y·(dy/dx) = 0. (Chain rule on y² gives 2y·dy/dx).' },
            { text: 'Solve for dy/dx: 2y·(dy/dx) = -2x → dy/dx = -x/y.' },
            { text: 'Substitute the point (6, 8): dy/dx = -6/8 = -3/4. The negative slope means the track curves downward as x increases; a.', faded: true, blankAnswer: 'dy/dx = -3/4 at (6, 8). Slope is -0.75 (dimensionless).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Rate of Change of Quantities', spots: [
            { id: 's1', label: 'The rate of change of', prompt: 'Which idea is this? — The rate of change of a quantity y with respect to another quantity x is defined as the.', answer: 'The rate of change of', options: ['The rate of change of', 'A critical point of a', 'A function f', 'The chain rule states that'] },
            { id: 's2', label: 'A critical point of a', prompt: 'Which idea is this? — A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(.', answer: 'A critical point of a', options: ['A critical point of a', 'The rate of change of', 'A function f', 'The chain rule states that'] },
            { id: 's3', label: 'A function f', prompt: 'Which idea is this? — A function \\( f \\) is differentiable at a point \\( c \\) in its domain if the limit \\(.', answer: 'A function f', options: ['A function f', 'The rate of change of', 'A critical point of a', 'The chain rule states that'] },
            { id: 's4', label: 'The chain rule states that', prompt: 'Which idea is this? — The chain rule states that if a function \\( y = f(x) \\) is a composite of two functions.', answer: 'The chain rule states that', options: ['The chain rule states that', 'The rate of change of', 'A critical point of a', 'A function f'] },
            { id: 's5', label: 'An implicit function is a', prompt: 'Which idea is this? — An implicit function is a relationship between variables x and y expressed as f(x, y) = 0.', answer: 'An implicit function is a', options: ['An implicit function is a', 'The rate of change of', 'A critical point of a', 'A function f'] }
          ] } }
    ],
    explore: { component: C12_MathematicsDerivativesParametricFunctionsSim, prompt: 'Explore the interactive — Rate of Change of Quantities' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_06_001', difficulty: 'standard',
          question: 'The rate of change of a quantity y with respect to another quantity x is.',
          hint: 'If stuck on chain rule, revisit c11_math_cbse_13_009 and practice 10 composite function.',
          misconception: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.',
          parts: [
                { id: 'a', prompt: 'State the formula for the rate of change of y with respect to x when both x and y are functions of a parameter t.', answer: 'The formula is dy/dx = (dy/dt) / (dx/dt), valid only when dx/dt ≠ 0',
                  options: ['The formula is dy/dx = (dy/dt) / (dx/dt), valid only when dx/dt ≠ 0', 'cancel dt'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.' },
                { id: 'b', prompt: 'A cube\'s volume V = x³ where x is the edge length. If the volume increases at 9 cm³/s, a student writes dx/dt = 9 / (3x²) and then substitutes x = 10 to get.', answer: 'Yes, the method and answer are correct',
                  options: ['Yes, the method and answer are correct', 'rate of change of volume', 'rate of change of edge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.' }
          ],
            remediations: { 'students-write-da-dt-2': { steps: ['Revisit Class 11 node c11_math_cbse_13_009 (Algebra of Derivatives: Chain Rule) — redo the 5 chain rule examples there.', 'Practice 3 problems where you MUST write the chain rule step as d/dt [f(r)] = f\'(r) · dr/dt before substituting numbers.', 'Re-diagnostic: Solve "A square\'s side increases at 2 cm/s.', 'Find dA/dt when s = 5 cm" — if you write dA/dt = 2s instead of 2s · ds/dt, repeat step 1.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_008', difficulty: 'standard',
          question: 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the.',
          hint: 'If stuck, review derivative rules from **c11_math_cbse_13_009** and the first/second.',
          misconception: '**Misconception:** "Every point where \\( f\'\'(x)=0 \\) is an inflection point." **Reality:** \\( f\'\'(x)=0 \\) is only a.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( f(x)=x^3 \\) has a critical point at \\( x=0 \\) but it is NOT a local maximum or minimum. What is it instead?', answer: '\\( f\'(x)=3x^2 \\), so \\( f\'(0)=0 \\) → critical point',
                  options: ['\\( f\'(x)=3x^2 \\), so \\( f\'(0)=0 \\) → critical point', 'it\'s a minimum because \\( f\'\'(0)=0 \\) and \\( f\'\'\'(0)>0 \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Every point where \\( f\'\'(x)=0 \\) is an inflection point." **Reality:** \\( f\'\'(x)=0 \\) is only a *candidate*; the.' }
          ],
            remediations: { 'misconception-every-point-where-f': { steps: ['If a student cannot distinguish critical points from inflection points or forgets to test sign change: 1.', 'Revisit **c12_math_cbse_06_003** (First Derivative Test) and **c12_math_cbse_06_004** (Second Derivative Test) to.', 'Practice the **sign chart method** for \\( f\' \\) and \\( f\'\' \\) on the same number line: draw a line, mark critical.', 'Do a targeted re-diagnostic: "Find inflection points of \\( f(x)=x^4-4x^3 \\) and explain why \\( x=0 \\) is an inflection.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_004', difficulty: 'standard',
          question: 'A function \\( f \\) is differentiable at a point \\( c \\) in its domain if the.',
          hint: 'Revisit one-sided limits (c12_math_cbse_05_002) and the definition of continuity.',
          misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.',
          parts: [
                { id: 'a', prompt: 'State the definition of the derivative of a function \\( f \\) at a point \\( x = c \\) using the limit of the difference quotient.', answer: 'The derivative is \\( f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h)-f(c)}{h} \\)',
                  options: ['The derivative is \\( f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h)-f(c)}{h} \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' },
                { id: 'b', prompt: 'The function \\( f(x) = |x-2| \\) is continuous at \\( x=2 \\) but not differentiable there.', answer: 'For \\( x<2 \\), \\( f(x)=2-x \\)',
                  options: ['For \\( x<2 \\), \\( f(x)=2-x \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' }
          ],
            remediations: { 'if-a-function-is-continuous': { steps: ['If a student confuses continuity with differentiability, first revisit the definition of continuity.', 'Then explicitly compute left and right derivatives for \\( f(x)=|x| \\) at 0, showing the algebraic step \\( |h|/h = -1 \\).', 'Next, practice piecewise functions: give \\( f(x) = \\begin{cases} x^2 & x \\le 0 \\\\ x & x > 0 \\end{cases} \\) and have the.', 'Finally, ask them to state in their own words: "Continuity is necessary but not sufficient for differentiability."'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.',
          parts: [
                { id: 'a', prompt: 'The function \\( f(x) = |x-2| \\) is continuous at \\( x=2 \\) but not differentiable there.', answer: 'For \\( x<2 \\), \\( f(x)=2-x \\)',
                  options: ['For \\( x<2 \\), \\( f(x)=2-x \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' }
          ],
            remediations: { 'if-a-function-is-continuous': { steps: ['If a student confuses continuity with differentiability, first revisit the definition of continuity.', 'Then explicitly compute left and right derivatives for \\( f(x)=|x| \\) at 0, showing the algebraic step \\( |h|/h = -1 \\).', 'Next, practice piecewise functions: give \\( f(x) = \\begin{cases} x^2 & x \\le 0 \\\\ x & x > 0 \\end{cases} \\) and have the.', 'Finally, ask them to state in their own words: "Continuity is necessary but not sufficient for differentiability."'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_005', difficulty: 'standard',
          question: 'A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if.',
          hint: 'If stuck, revisit c11_math_cbse_13_008 (Derivative Using First Principle) and.',
          misconception: 'Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if both the',
                  options: ['A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if both the', 'The rate of change of a quantity y with respect to another quantity x is defined as the', 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(', 'A function \\( f \\) is differentiable at a point \\( c \\) in its domain if the limit \\('],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function is differentiable.' }
          ],
            remediations: { 'if-the-derivatives-of-the': { steps: ['If a student makes this error, guide them through the following steps: 1.', 'Revisit the definition of derivative at a point: \\( f\'(c) = \\lim_{h\\to 0} \\frac{f(c+h)-f(c)}{h} \\).', 'Emphasize that \\( f(c) \\) must exist and the limit must exist.', 'Show that if \\( f \\) is not continuous at \\( c \\), then \\( \\lim_{h\\to 0} f(c+h) \\neq f(c) \\), so the numerator \\(.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_006', difficulty: 'standard',
          question: 'The chain rule states that if a function \\( y = f(x) \\) is a composite of two.',
          hint: 'If stuck, revisit Class 11 derivatives of standard functions (c11_math_cbse_13_010) and.',
          misconception: 'Students often write \\( \\frac{d}{dx} \\sin(x^2) = \\cos(x^2) \\) (forgetting the inner derivative \\( 2x \\)) or \\(.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The chain rule states that if a function \\( y = f(x) \\) is a composite of two functions',
                  options: ['The chain rule states that if a function \\( y = f(x) \\) is a composite of two functions', 'The rate of change of a quantity y with respect to another quantity x is defined as the', 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(', 'A function \\( f \\) is differentiable at a point \\( c \\) in its domain if the limit \\('],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\( \\frac{d}{dx} \\sin(x^2) = \\cos(x^2) \\) (forgetting the inner derivative \\( 2x \\)) or \\( \\frac{d}{dx} \\sin(x^2) =.' }
          ],
            remediations: { 'students-often-write-frac-d': { steps: ['If a student makes the above errors, guide them through a "layer-peeling" exercise: 1.', 'Write the function as a composition of two functions: \\( y = f(u), u = g(x) \\).', 'Explicitly state \\( f(u) \\) and \\( g(x) \\).', 'Compute \\( \\frac{dy}{du} \\) and \\( \\frac{du}{dx} \\) separately.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_007', difficulty: 'standard',
          question: 'An implicit function is a relationship between variables x and y expressed as.',
          hint: 'Revisit c12_math_cbse_05_006 (Chain Rule) and practice "identify the inner function".',
          misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx,.',
          parts: [
                { id: 'a', prompt: 'Explain why we write d/dx(y²) = 2y · dy/dx instead of just 2y when differentiating x² + y² = 25 implicitly.', answer: 'Because y is a function of x, not an independent variable',
                  options: ['Because y is a function of x, not an independent variable', 'y is just a variable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' },
                { id: 'b', prompt: 'Compare the process and result of finding dy/dx for x² + y² = 25 by (a) implicit differentiation and (b) solving for y explicitly then differentiating.', answer: 'implicit differentiation and (',
                  options: ['implicit differentiation and (', 'they\'re always the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' }
          ],
            remediations: { 'students-consistently-forget-to-apply': { steps: ['Have the student identify every term containing y in the equation.', 'For each such term, write the derivative as (derivative w.r.t y) × (dy/dx).', 'Practice with simple cases: d/dx(y) = dy/dx, d/dx(y²) = 2y·dy/dx, d/dx(sin y) = cos y·dy/dx.', 'Revisit c12_math_cbse_05_006 (Chain Rule) and do 5 drill problems where they only identify the chain rule factors.', 'Return to implicit differentiation with this explicit "tag each y-term" habit.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx,.',
          parts: [
                { id: 'a', prompt: 'Compare the process and result of finding dy/dx for x² + y² = 25 by (a) implicit differentiation and (b) solving for y explicitly then differentiating.', answer: 'implicit differentiation and (',
                  options: ['implicit differentiation and (', 'they\'re always the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' }
          ],
            remediations: { 'students-consistently-forget-to-apply': { steps: ['Have the student identify every term containing y in the equation.', 'For each such term, write the derivative as (derivative w.r.t y) × (dy/dx).', 'Practice with simple cases: d/dx(y) = dy/dx, d/dx(y²) = 2y·dy/dx, d/dx(sin y) = cos y·dy/dx.', 'Revisit c12_math_cbse_05_006 (Chain Rule) and do 5 drill problems where they only identify the chain rule factors.', 'Return to implicit differentiation with this explicit "tag each y-term" habit.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
