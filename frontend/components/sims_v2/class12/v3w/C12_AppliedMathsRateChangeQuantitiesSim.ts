import type { SimDef } from '../../engine/types';
import C12_AppliedMathsRateChangeQuantitiesSim from '../../../simulations/c6_12/C12_AppliedMathsRateChangeQuantitiesSim';

/** v3 wrapped master — C12_AppliedMathsRateChangeQuantitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsratechangequantitiessim: SimDef = {
    id: 'v3w_c12_appliedmathsratechangequantitiessim',
    title: 'Rate of Change of Quantities',
    subtitle: 'This node covers: instantaneous rate of change dy/dx, chain rule for parametric rates.',
    classLevel: 12, subject: 'science', topic: 'Rate of Change of Quantities',
    chapters: [],
    nodeIds: ['c12_math_cbse_06_001', 'c12_math_cbse_06_006', 'c12_math_cbse_06_007', 'c12_math_cbse_05_011'],
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_011', title: 'The second order derivative of a.',
          scaffold: { problem: 'A particle moves along a straight line such that its displacement \\(s\\) (in metres) at time \\(t\\) (in seconds) is given by \\(s(t) = 4t^3 -.',
            steps: [
            { text: 'Write the given displacement function: \\(s(t) = 4t^3 - 15t^2 + 18t + 5\\).' },
            { text: 'Find velocity \\(v(t) = \\frac{ds}{dt}\\) by differentiating once using power rule and sum rule:' },
            { text: 'Find acceleration \\(a(t) = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}\\) by differentiating velocity:' },
            { text: 'Evaluate at \\(t = 2\\):' },
            { text: 'Interpret: At \\(t=2\\) s, the particle is moving forward (positive velocity) and speeding up (positive acceleration,.', faded: true, blankAnswer: 'Velocity = 6 m/s, Acceleration = 18 m/s². The particle is.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_06_006', title: 'Identify each idea',
          dissect: { specimen: 'Rate of Change of Quantities', spots: [
            { id: 's1', label: 'The rate of change of', prompt: 'Which idea is this? — The rate of change of a quantity y with respect to another quantity x is defined as the.', answer: 'The rate of change of', options: ['The rate of change of', 'The differential of a function', 'Word problems on maxima and', 'The second order derivative of'] },
            { id: 's2', label: 'The differential of a function', prompt: 'Which idea is this? — The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a.', answer: 'The differential of a function', options: ['The differential of a function', 'The rate of change of', 'Word problems on maxima and', 'The second order derivative of'] },
            { id: 's3', label: 'Word problems on maxima and', prompt: 'Which idea is this? — Word problems on maxima and minima involve translating a real-world situation into a.', answer: 'Word problems on maxima and', options: ['Word problems on maxima and', 'The rate of change of', 'The differential of a function', 'The second order derivative of'] },
            { id: 's4', label: 'The second order derivative of', prompt: 'Which idea is this? — The second order derivative of a function \\(y = f(x)\\) is the derivative of its first.', answer: 'The second order derivative of', options: ['The second order derivative of', 'The rate of change of', 'The differential of a function', 'Word problems on maxima and'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsRateChangeQuantitiesSim, prompt: 'Explore the interactive — Rate of Change of Quantities' },
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
        { type: 'subpart', nodeId: 'c12_math_cbse_06_006', difficulty: 'standard',
          question: 'The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx =.',
          hint: 'If stuck on derivative computation, revisit Class 11 differentiation rules.',
          misconception: 'Students treat dy = f\'(x)dx as an exact equality Δy = f\'(x)Δx and use it for large Δx, e.g., approximating √50 using.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a',
                  options: ['The differential of a function y = f(x) is defined as dy = f\'(x) dx, where dx = Δx is a', 'The rate of change of a quantity y with respect to another quantity x is defined as the', 'Word problems on maxima and minima involve translating a real-world situation into a', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first'],
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
            remediations: { 'misconception-frac-d-2y-dx': { steps: ['**Revisit notation:** Write \\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)\\) explicitly on paper every.', 'Say aloud: "derivative of the derivative." 2.', '**Drill first-derivative rules:** Do 5 quick problems from c12_math_cbse_05_006 (Chain Rule) and c12_math_cbse_05_010.', '**Practice the parametric second-derivative pattern:** For \\(x = f(t), y = g(t)\\), write the template: \\(\\frac{dy}{dx}.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
