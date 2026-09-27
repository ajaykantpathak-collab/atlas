import type { SimDef } from '../../engine/types';
import C12_MathsMaximaMinimaSurfacesSim from '../../../simulations/three/C12_MathsMaximaMinimaSurfacesSim';

/** v3 wrapped master — C12_MathsMaximaMinimaSurfacesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathsmaximaminimasurfacessim: SimDef = {
    id: 'v3w_c12_mathsmaximaminimasurfacessim',
    title: 'Maxima Minima Surfaces',
    subtitle: 'This node covers: instantaneous rate of change dy/dx, chain rule for parametric rates.',
    classLevel: 12, subject: 'mathematics', topic: 'Rate of Change of Quantities',
    chapters: [],
    nodeIds: ['c12_math_cbse_06_001', 'c12_math_cbse_06_002', 'c12_math_cbse_06_003', 'c12_math_cbse_06_006', 'c12_math_cbse_06_007', 'c12_math_cbse_06_008', 'c12_math_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are filling a spherical balloon with helium at a steady rate of 900 cm³/s.', goal: 'Master Maxima Minima Surfaces.' },
    discovery: {
        question: 'A cube\'s volume V = x³ where x is the edge length. If the volume increases at 9 cm³/s, a student writes dx/dt = 9 / (3x²) and then substitutes x = 10 to get.',
        options: ['Yes, the method and answer are correct', 'rate of change of volume', 'rate of change of edge'],
        answer: 'Yes, the method and answer are correct',
        hook: 'Students write dA/dt = 2πr instead of dA/dt = 2πr (dr/dt) when differentiating A = πr² with respect to time.',
    },
    teaching: [
        { title: 'The rate of change of a quantity y with.', text: 'The rate of change of a quantity y with respect to another quantity x is defined as the derivative dy/dx (or f\'(x)) where y = f(x).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_002', title: 'A function \\( f \\) is **strictly.',
          scaffold: { problem: 'A company\'s profit (in ₹ lakhs) from producing \\( x \\) hundred units of a product is given by \\( P(x) = 2x^3 - 9x^2 + 12x + 1 \\).',
            steps: [
            { text: 'Identify the function and its domain. \\( P(x) = 2x^3 - 9x^2 + 12x + 1 \\), \\( x \\ge 0 \\) (production cannot be negative).' },
            { text: 'Compute the derivative. \\( P\'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2) \\).' },
            { text: 'Find critical points by solving \\( P\'(x) = 0 \\). \\( 6(x-1)(x-2) = 0 \\implies x = 1, 2 \\).' },
            { text: 'Make a sign chart for \\( P\'(x) \\) on \\( [0, \\infty) \\). Test points: \\( x=0.5 \\in (0,1) \\Rightarrow P\'(0.5) =.' },
            { text: 'Write intervals with correct brackets (function is continuous).', faded: true, blankAnswer: 'Increasing on \\( [0, 1] \\) and \\( [2, \\infty) \\);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_003', title: 'The First Derivative Test determines.',
          scaffold: { problem: 'A manufacturer finds that the profit (in rupees) from selling \\(x\\) units of a product is given by \\(P(x) = -2x^3 + 21x^2 - 60x + 100\\).',
            steps: [
            { text: 'Compute the first derivative \\(P\'(x) = \\frac{d}{dx}(-2x^3 + 21x^2 - 60x + 100) = -6x^2 + 42x - 60\\).' },
            { text: 'Find critical points by solving \\(P\'(x) = 0\\): \\(-6x^2 + 42x - 60 = 0 \\Rightarrow x^2 - 7x + 10 = 0 \\Rightarrow.' },
            { text: 'Factor \\(P\'(x)\\) completely: \\(P\'(x) = -6(x-2)(x-5)\\). The leading coefficient \\(-6 < 0\\).' },
            { text: 'Construct sign chart for \\(P\'(x)\\) on intervals \\((-\\infty, 2)\\), \\((2, 5)\\), \\((5, \\infty)\\):' },
            { text: 'Apply First Derivative Test: At \\(x=2\\), \\(P\'(x)\\) changes from \\(-\\) to \\(+\\) ⇒ local minimum.' },
            { text: 'Compute maximum profit: \\(P(5) = -2(125) + 21(25) - 60(5) + 100 = -250 + 525 - 300 + 100 = 75\\) rupees.' },
            { text: 'Interpret: Since \\(x\\) represents units sold, \\(x=5\\) is valid. Maximum profit is ₹75 at 5 units.', faded: true, blankAnswer: 'Maximum profit of ₹75 occurs at 5 units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_006', title: 'The differential of a function y = f(x).',
          scaffold: { problem: 'A spherical soap bubble\'s radius increases from 5 cm to 5.02 cm due to heating.',
            steps: [
            { text: 'Identify the function and known values. Surface area of sphere: S(r) = 4πr². Initial radius r₀ = 5 cm.' },
            { text: 'Compute the derivative S\'(r) = d/dr (4πr²) = 8πr.' },
            { text: 'Evaluate derivative at r₀ = 5: S\'(5) = 8π(5) = 40π cm²/cm.' },
            { text: 'Compute differential dS = S\'(5) Δr = (40π)(0.02) = 0.8π ≈ 2.513 cm². This is the approximate increase in surface area.' },
            { text: 'Compute actual increase for verification: S(5.02) - S(5) = 4π(5.02)² - 4π(5)² = 4π(25.2004 - 25) = 4π(0.2004) = 0.8016π.' },
            { text: 'Compute percentage error in approximation: |Approx - Actual|/|Actual| × 100% = |0.8π - 0.8016π|/(0.8016π) × 100% =.', faded: true, blankAnswer: 'Approximate increase ≈ 2.513 cm² (or 0.8π cm²). Actual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_007', title: 'Word problems on maxima and minima.',
          scaffold: { problem: 'A square piece of tin of side 18 cm is to be made into a box without a top by cutting a square from each corner and folding up the flaps.',
            steps: [
            { text: 'Let x cm be the side of the square cut from each corner. After cutting and folding, the box has length = (18 - 2x) cm,.' },
            { text: 'Volume V(x) = x(18 - 2x)² = x(324 - 72x + 4x²) = 4x³ - 72x² + 324x. Practical domain: 0 < x < 9 (since 2x < 18).' },
            { text: 'Differentiate: V\'(x) = 12x² - 144x + 324 = 12(x² - 12x + 27) = 12(x - 3)(x - 9). Set V\'(x) = 0 → x = 3 or x = 9.' },
            { text: 'Second derivative test: V\'\'(x) = 24x - 144. V\'\'(3) = 72 - 144 = -72 < 0. So x = 3 gives local maximum.' },
            { text: 'Check endpoints for absolute maximum: V(0) = 0, V(3) = 3 × 12² = 432 cm³, V(9) = 0.', faded: true, blankAnswer: 'Cut squares of side 3 cm. Maximum volume = 432 cm³.' }
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
        { type: 'dissect', nodeId: 'c12_math_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Maxima Minima Surfaces', spots: [
            { id: 's1', label: 'The rate of change of', prompt: 'Which idea is this? — The rate of change of a quantity y with respect to another quantity x is defined as the.', answer: 'The rate of change of', options: ['The rate of change of', 'A function f', 'The First Derivative Test determines', 'The differential of a function'] },
            { id: 's2', label: 'A function f', prompt: 'Which idea is this? — A function \\( f \\) is **strictly increasing** on an interval \\( I \\) if for any \\( x_1,.', answer: 'A function f', options: ['A function f', 'The rate of change of', 'The First Derivative Test determines', 'The differential of a function'] },
            { id: 's3', label: 'The First Derivative Test determines', prompt: 'Which idea is this? — The First Derivative Test determines the nature of a critical point \\(c\\) (where.', answer: 'The First Derivative Test determines', options: ['The First Derivative Test determines', 'The rate of change of', 'A function f', 'The differential of a function'] },
            { id: 's4', label: 'The differential of a function', prompt: 'Which idea is this? — The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a.', answer: 'The differential of a function', options: ['The differential of a function', 'The rate of change of', 'A function f', 'The First Derivative Test determines'] },
            { id: 's5', label: 'Word problems on maxima and', prompt: 'Which idea is this? — Word problems on maxima and minima involve translating a real-world situation into a.', answer: 'Word problems on maxima and', options: ['Word problems on maxima and', 'The rate of change of', 'A function f', 'The First Derivative Test determines'] },
            { id: 's6', label: 'A critical point of a', prompt: 'Which idea is this? — A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(.', answer: 'A critical point of a', options: ['A critical point of a', 'The rate of change of', 'A function f', 'The First Derivative Test determines'] }
          ] } }
    ],
    explore: { component: C12_MathsMaximaMinimaSurfacesSim, prompt: 'Explore the interactive — Maxima Minima Surfaces' },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_06_002', difficulty: 'standard',
          question: 'A function \\( f \\) is **strictly increasing** on an interval \\( I \\) if for any.',
          hint: 'If stuck, review derivative rules (product, quotient, chain) from c11_math_cbse_13_009.',
          misconception: '**“If \\( f\'(x) \\ge 0 \\), the function is strictly increasing.”** Many students write \\( f\'(x) \\ge 0 \\) as the condition.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( f\'(x) > 0 \\) on an interval implies the function is strictly increasing there. Use the Mean Value Theorem in your reasoning.', answer: '**Correct explanation:** Take any \\( x_1 < x_2 \\) in the interval',
                  options: ['**Correct explanation:** Take any \\( x_1 < x_2 \\) in the interval', 'positive slope means going up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“If \\( f\'(x) \\ge 0 \\), the function is strictly increasing.”** Many students write \\( f\'(x) \\ge 0 \\) as the condition for *strict*.' }
          ],
            remediations: { 'if-f-x-ge-0': { steps: ['**Revisit derivative rules** (sum, product, quotient, chain) using c11_math_cbse_13_007, c11_math_cbse_13_009,.', '**Practice sign analysis** of quadratic/cubic polynomials: solve \\( f\'(x)=0 \\), plot roots on a number line, test one.', 'Use c11_math_cbse_06_003 (linear inequalities) and c11_math_cbse_06_008 (quadratic inequalities) for the algebraic.', '**Re‑read the Mean Value Theorem** (NCERT Class 12 Chapter 5) to understand *why* \\( f\'>0 \\) forces \\( f(x_2)>f(x_1) \\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_003', difficulty: 'standard',
          question: 'The First Derivative Test determines the nature of a critical point \\(c\\).',
          hint: 'If stuck, revisit "Increasing and Decreasing Functions" (c12_math_cbse_06_002) to.',
          misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).',
          parts: [
                { id: 'a', prompt: 'A student claims: "If \\(f\'(c) = 0\\), then \\(c\\) must be either a local maximum or a local minimum." Is this statement true?', answer: '**Answer:** False',
                  options: ['**Answer:** False', 'derivative zero ⇒ extremum', '"derivative zero ⇒ extremum"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' },
                { id: 'b', prompt: 'Compare the First Derivative Test and the Second Derivative Test. When would you prefer the First Derivative Test over the Second Derivative Test?', answer: '**Answer:** The First Derivative Test uses sign change of \\(f\'(x)\\)',
                  options: ['**Answer:** The First Derivative Test uses sign change of \\(f\'(x)\\)', 'Second Derivative Test is always easier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' }
          ],
            remediations: { 'misconception-critical-points-only-occur': { steps: ['If a student dismisses non-differentiable points: 1.', '**Revisit definition:** Show the NCERT note: "A point \\(c\\) in the domain of a function \\(f\\) at which either.', '**Concrete example:** Work \\(f(x)=|x-2|\\) step-by-step: domain \\(\\mathbb{R}\\), \\(f\'(x)=1\\) for \\(x>2\\), \\(f\'(x)=-1\\).', 'Sign chart: \\(-\\) to \\(+\\) at \\(x=2\\) ⇒ local (and absolute) minimum at \\(x=2\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).',
          parts: [
                { id: 'a', prompt: 'A student solved \\(f(x) = |x^2 - 4|\\) for local extrema and wrote: "\\(f\'(x) = 2x\\) for \\(x>2\\) and \\(x<-2\\), and \\(f\'(x) = -2x\\) for \\(-2<x<2\\).', answer: '**Errors:** 1',
                  options: ['**Errors:** 1', 'non-differentiable ⇒ not extrema', '"non-differentiable ⇒ not extrema"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' },
                { id: 'b', prompt: 'Compare the First Derivative Test and the Second Derivative Test. When would you prefer the First Derivative Test over the Second Derivative Test?', answer: '**Answer:** The First Derivative Test uses sign change of \\(f\'(x)\\)',
                  options: ['**Answer:** The First Derivative Test uses sign change of \\(f\'(x)\\)', 'Second Derivative Test is always easier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Critical points only occur where \\(f\'(x)=0\\).' }
          ],
            remediations: { 'misconception-critical-points-only-occur': { steps: ['If a student dismisses non-differentiable points: 1.', '**Revisit definition:** Show the NCERT note: "A point \\(c\\) in the domain of a function \\(f\\) at which either.', '**Concrete example:** Work \\(f(x)=|x-2|\\) step-by-step: domain \\(\\mathbb{R}\\), \\(f\'(x)=1\\) for \\(x>2\\), \\(f\'(x)=-1\\).', 'Sign chart: \\(-\\) to \\(+\\) at \\(x=2\\) ⇒ local (and absolute) minimum at \\(x=2\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_006', difficulty: 'standard',
          question: 'The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx =.',
          hint: 'If stuck on derivative computation, revisit Class 11 differentiation rules.',
          misconception: 'Students treat dy = f\'(x)dx as an exact equality Δy = f\'(x)Δx and use it for large Δx, e.g., approximating √50 using.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a',
                  options: ['The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a', 'The rate of change of a quantity y with respect to another quantity x is defined as the', 'A function \\( f \\) is **strictly increasing** on an interval \\( I \\) if for any \\( x_1,', 'The First Derivative Test determines the nature of a critical point \\(c\\) (where'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat dy = f\'(x)dx as an exact equality Δy = f\'(x)Δx and use it for large Δx, e.g., approximating √50 using x₀=16 (Δx=34) giving.' }
          ],
            remediations: { 'students-treat-dy-f-x': { steps: ['If a student chooses a base point where |Δx|/x₀ > 10% or gets wrong error propagation: 1.', 'Revisit **c11_math_cbse_13_007** (Derivative of Polynomial Functions) to recompute f\'(x) correctly.', 'Revisit **c11_math_cbse_13_009** (Algebra of Derivatives) for chain rule on composite functions like √(x²+1).', 'Do a re-diagnostic: "Approximate √17 using x₀=16.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_007', difficulty: 'standard',
          question: 'Word problems on maxima and minima involve translating a real-world situation.',
          hint: 'If stuck on formulating the objective function, revisit Class 10 quadratic word problems.',
          misconception: 'Students often forget to check endpoints when finding absolute maxima/minima on a closed interval.',
          parts: [
                { id: 'a', prompt: 'A student solves the problem: "Find two positive numbers whose sum is 20 and product is maximum." They write: let numbers be x and y, x+y=20, P=xy.', answer: 'No, the solution is incomplete',
                  options: ['No, the solution is incomplete', 'minimum at x=10'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to check endpoints when finding absolute maxima/minima on a closed interval.' }
          ],
            remediations: { 'students-often-forget-to-check': { steps: ['Take the end points of the interval.', 'Calculate values at all points.', 'Identify max/min." (3) Have them re-solve 3 problems from Exercise 6.3 (Q13, Q17, Q21) writing explicitly: "Critical.'] } } },
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
            remediations: { 'misconception-every-point-where-f': { steps: ['If a student cannot distinguish critical points from inflection points or forgets to test sign change: 1.', 'Revisit **c12_math_cbse_06_003** (First Derivative Test) and **c12_math_cbse_06_004** (Second Derivative Test) to.', 'Practice the **sign chart method** for \\( f\' \\) and \\( f\'\' \\) on the same number line: draw a line, mark critical.', 'Do a targeted re-diagnostic: "Find inflection points of \\( f(x)=x^4-4x^3 \\) and explain why \\( x=0 \\) is an inflection.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
