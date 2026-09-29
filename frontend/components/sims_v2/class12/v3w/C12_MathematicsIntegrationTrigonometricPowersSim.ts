import type { SimDef } from '../../engine/types';
import C12_MathematicsIntegrationTrigonometricPowersSim from '../../../simulations/c6_12/C12_MathematicsIntegrationTrigonometricPowersSim';

/** v3 wrapped master — C12_MathematicsIntegrationTrigonometricPowersSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicsintegrationtrigonometricpowerssim: SimDef = {
    id: 'v3w_c12_mathematicsintegrationtrigonometricpowerssim',
    title: 'Standard Integrals of Trigonometric Functions',
    subtitle: 'This node covers the indefinite integrals of sin x, cos x, tan x, cot x, sec x, cosec x.',
    classLevel: 12, subject: 'mathematics', topic: 'Standard Integrals of Trigonometric Functions',
    chapters: [],
    nodeIds: ['c12_math_cbse_07_005', 'c12_math_cbse_09_002', 'c12_math_cbse_09_007', 'c12_math_cbse_07_001', 'c12_math_cbse_07_002', 'c12_math_cbse_07_003', 'c12_math_cbse_07_004', 'c12_math_cbse_07_006', 'c12_math_cbse_07_007', 'c12_math_cbse_07_011', 'c12_math_cbse_06_006', 'c12_math_cbse_07_008', 'c12_math_cbse_07_009', 'c12_math_cbse_07_010', 'c12_math_cbse_08_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a physics problem: a particle\'s velocity is given by v(t) = 5 sin(2t) m/s.', goal: 'Master Standard Integrals of Trigonometric Functions.' },
    discovery: {
        question: 'Write the indefinite integral of sec x tan x with respect to x, including the constant of integration.',
        options: ['∫ sec x tan x dx = sec x + C', 'sec²x + C', 'tan x + C'],
        answer: '∫ sec x tan x dx = sec x + C',
        hook: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus.',
    },
    teaching: [
        { title: 'Standard integrals of trigonometric.', text: 'Standard integrals of trigonometric functions are the antiderivatives of the six basic trigonometric functions (sin x, cos x, tan x, cot x, sec x, cosec x) and their linear transformations (e.g.,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_005', title: 'Standard integrals of trigonometric.',
          scaffold: { problem: 'A particle moves along a straight line with velocity v(t) = 4 sin(3t) + 2 cos(3t) m/s. Find its displacement function s(t) given s(0) = 0.',
            steps: [
            { text: 'Write the displacement as the antiderivative of velocity: s(t) = ∫ v(t) dt = ∫ [4 sin(3t) + 2 cos(3t)] dt.' },
            { text: 'Use linearity of integration: s(t) = 4 ∫ sin(3t) dt + 2 ∫ cos(3t) dt.' },
            { text: 'Apply the standard integrals with linear arguments: ∫ sin(3t) dt = –(1/3) cos(3t) + C₁, ∫ cos(3t) dt = (1/3) sin(3t) +.' },
            { text: 'Substitute: s(t) = 4[–(1/3) cos(3t)] + 2[(1/3) sin(3t)] + C = –(4/3) cos(3t) + (2/3) sin(3t) + C.' },
            { text: 'Use initial condition s(0)=0: 0 = –(4/3) cos 0 + (2/3) sin 0 + C = –4/3 + C ⇒ C = 4/3.', faded: true, blankAnswer: 's(t) = (2/3) sin(3t) – (4/3) cos(3t) + 4/3 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_002', title: 'The degree of a differential equation.',
          scaffold: { problem: 'Find the order and degree (if defined) of the differential equation: (d²y/dx²)² + 3(dy/dx)³ + 2y = sin x.',
            steps: [
            { text: 'Identify all derivative terms: (d²y/dx²)², (dy/dx)³. The term sin x does not contain derivatives.' },
            { text: 'Determine the highest order derivative: d²y/dx² (second derivative). So order = 2.' },
            { text: 'Check if the equation is a polynomial in derivatives: (d²y/dx²)² is (y\'\')² — polynomial (power 2).' },
            { text: 'Since it is a polynomial in derivatives, degree is defined. The highest order derivative is d²y/dx².' },
            { text: 'Verify: Order = 2 (positive integer), Degree = 2 (positive integer). Both satisfy NCERT note.', faded: true, blankAnswer: 'Order = 2, Degree = 2' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_007', title: 'A first-order linear differential.',
          scaffold: { problem: 'A bacteria culture grows at a rate proportional to its current population, but a constant harvesting rate of 100 bacteria per hour is.',
            steps: [
            { text: 'Let \\(N(t)\\) be population at time \\(t\\) hours. Growth rate = \\(0.1 N\\), harvesting rate = 100.' },
            { text: 'Rewrite as linear DE: \\(\\frac{dN}{dt} - 0.1N = -100\\). Here \\(P = -0.1\\), \\(Q = -100\\).' },
            { text: 'Integrating factor \\(\\text{I.F.} = e^{\\int -0.1 \\, dt} = e^{-0.1t}\\).' },
            { text: 'Multiply: \\(e^{-0.1t} \\frac{dN}{dt} - 0.1 e^{-0.1t} N = -100 e^{-0.1t}\\). Left side is \\(\\frac{d}{dt}(N e^{-0.1t})\\).' },
            { text: 'Integrate: \\(N e^{-0.1t} = \\int -100 e^{-0.1t} \\, dt = \\frac{-100}{-0.1} e^{-0.1t} + C = 1000 e^{-0.1t} + C\\).' },
            { text: 'Solve for \\(N\\): \\(N = 1000 + C e^{0.1t}\\). Use initial condition \\(N(0)=5000\\): \\(5000 = 1000 + C \\Rightarrow C =.' },
            { text: '\\(N(t) = 1000 + 4000 e^{0.1t}\\). At \\(t=2\\): \\(N(2) = 1000 + 4000 e^{0.2} \\approx 1000 + 4000 \\times 1.2214 = 1000 +.', faded: true, blankAnswer: 'Approximately 5886 bacteria after 2 hours.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_001', title: 'Integration is the inverse process of.',
          scaffold: { problem: 'A particle moves along a straight line with acceleration \\(a(t) = 6t - 4\\) m/s².',
            steps: [
            { text: 'Write the integral for velocity: \\(v(t) = \\int a(t)\\,dt = \\int (6t - 4)\\,dt\\).' },
            { text: 'Integrate term by term: \\(\\int 6t\\,dt = 6 \\cdot \\frac{t^2}{2} = 3t^2\\); \\(\\int -4\\,dt = -4t\\).' },
            { text: 'Combine and add constant: \\(v(t) = 3t^2 - 4t + C\\).' },
            { text: 'Use initial condition \\(v(0) = 5\\): \\(5 = 3(0)^2 - 4(0) + C \\Rightarrow C = 5\\).' },
            { text: 'Write the final velocity function: \\(v(t) = 3t^2 - 4t + 5\\) m/s.', faded: true, blankAnswer: '\\(v(t) = 3t^2 - 4t + 5\\) m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_002', title: 'Integration by substitution is a.',
          scaffold: { problem: 'A car\'s velocity is given by v(t) = 3t² cos(t³ + 2) m/s. Find the displacement from t = 0 to t = 1 s.',
            steps: [
            { text: 'Identify the integral for displacement: s = ∫_0^1 v(t) dt = ∫_0^1 3t² cos(t³ + 2) dt.' },
            { text: 'Notice the inner function t³ + 2 and its derivative 3t². Set u = t³ + 2, so du = 3t² dt.' },
            { text: 'Change limits: when t = 0, u = 0³ + 2 = 2; when t = 1, u = 1³ + 2 = 3.' },
            { text: 'Substitute: ∫_0^1 3t² cos(t³ + 2) dt = ∫_2^3 cos u du.' },
            { text: 'Integrate: ∫ cos u du = sin u |_2^3 = sin 3 - sin 2.', faded: true, blankAnswer: 'sin 3 - sin 2 meters' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_003', title: 'Integration by partial fractions is a.',
          scaffold: { problem: 'A factory\'s marginal cost function is \\( MC(x) = \\frac{4x+5}{x^2+3x+2} \\) rupees per unit, where x is the number of units produced (in.',
            steps: [
            { text: 'Recognize that total cost is the integral of marginal cost: \\( C(x) = \\int MC(x) \\, dx = \\int \\frac{4x+5}{x^2+3x+2} \\,.' },
            { text: 'Factor the denominator: \\( x^2+3x+2 = (x+1)(x+2) \\). The integrand is proper (degree 1 < degree 2).' },
            { text: 'Set up partial fractions: \\( \\frac{4x+5}{(x+1)(x+2)} = \\frac{A}{x+1} + \\frac{B}{x+2} \\).' },
            { text: 'Equate numerators: \\( 4x+5 = A(x+2) + B(x+1) = (A+B)x + (2A+B) \\). Solve: \\( A+B=4 \\), \\( 2A+B=5 \\) → \\( A=1, B=3 \\).' },
            { text: 'Integrate: \\( \\int \\left( \\frac{1}{x+1} + \\frac{3}{x+2} \\right) dx = \\log|x+1| + 3\\log|x+2| + K \\).' },
            { text: 'Apply fixed cost: When \\( x=0 \\), \\( C(0) = 10000 \\). So \\( 10000 = \\log|1| + 3\\log|2| + K = 3\\log 2 + K \\) → \\( K =.' },
            { text: 'Total cost function: \\( C(x) = \\log|x+1| + 3\\log|x+2| + 10000 - 3\\log 2 \\) rupees.', faded: true, blankAnswer: '\\( C(x) = \\log|x+1| + 3\\log|x+2| + 10000 - 3\\log 2 \\).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Standard Integrals of Trigonometric Functions', spots: [
            { id: 's1', label: 'Standard integrals of trigonometric functions', prompt: 'Which idea is this? — Standard integrals of trigonometric functions are the antiderivatives of the six basic.', answer: 'Standard integrals of trigonometric functions', options: ['Standard integrals of trigonometric functions', 'The degree of a differential', 'A first-order linear differential equation', 'Integration is the inverse process'] },
            { id: 's2', label: 'The degree of a differential', prompt: 'Which idea is this? — The degree of a differential equation is the highest positive integral power of the.', answer: 'The degree of a differential', options: ['The degree of a differential', 'Standard integrals of trigonometric functions', 'A first-order linear differential equation', 'Integration is the inverse process'] },
            { id: 's3', label: 'A first-order linear differential equation', prompt: 'Which idea is this? — A first-order linear differential equation is an equation of the form \\(\\frac{dy}{dx} +.', answer: 'A first-order linear differential equation', options: ['A first-order linear differential equation', 'Standard integrals of trigonometric functions', 'The degree of a differential', 'Integration is the inverse process'] },
            { id: 's4', label: 'Integration is the inverse process', prompt: 'Which idea is this? — Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek.', answer: 'Integration is the inverse process', options: ['Integration is the inverse process', 'Standard integrals of trigonometric functions', 'The degree of a differential', 'A first-order linear differential equation'] },
            { id: 's5', label: 'Integration by substitution is a', prompt: 'Which idea is this? — Integration by substitution is a technique where we change the variable of integration to.', answer: 'Integration by substitution is a', options: ['Integration by substitution is a', 'Standard integrals of trigonometric functions', 'The degree of a differential', 'A first-order linear differential equation'] },
            { id: 's6', label: 'Integration by partial fractions is', prompt: 'Which idea is this? — Integration by partial fractions is a technique to integrate a proper rational function.', answer: 'Integration by partial fractions is', options: ['Integration by partial fractions is', 'Standard integrals of trigonometric functions', 'The degree of a differential', 'A first-order linear differential equation'] }
          ] } }
    ],
    explore: { component: C12_MathematicsIntegrationTrigonometricPowersSim, prompt: 'Explore the interactive — Standard Integrals of Trigonometric Functions' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_07_005', difficulty: 'standard',
          question: 'Standard integrals of trigonometric functions are the antiderivatives of the.',
          hint: 'If stuck, review the derivatives of sin x, cos x, tan x, cot x, sec x, cosec x.',
          misconception: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus.',
          parts: [
                { id: 'a', prompt: 'Write the indefinite integral of sec x tan x with respect to x, including the constant of integration.', answer: '∫ sec x tan x dx = sec x + C',
                  options: ['∫ sec x tan x dx = sec x + C', 'sec²x + C', 'tan x + C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus sign) and ∫ cos x dx =.' }
          ],
            remediations: { 'the-most-pervasive-error-is': { steps: ['Have the student write the six derivatives of trig functions from memory (Class 11 node c11_math_cbse_13_010).', 'For each derivative, explicitly write the reverse statement: "Since d/dx[–cos x] = sin x, therefore ∫ sin x dx = –cos x.', 'Practice five linear-argument integrals (e.g., ∫ cos(5x) dx, ∫ sec(2x)tan(2x) dx) side-by-side, forcing the student to.', 'Re-attempt Diagnostic Questions 1, 3, and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_002', difficulty: 'standard',
          question: 'The degree of a differential equation is the highest positive integral power of.',
          hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order.',
          misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative.".',
          parts: [
                { id: 'a', prompt: 'State the degree of the differential equation: (d²y/dx²)³ + 2(dy/dx)² + 3y = 0. Is the degree defined? Justify in one sentence.', answer: 'The degree is 3',
                  options: ['The degree is 3', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' },
                { id: 'b', prompt: 'Consider the differential equation: sin(dy/dx) + y = 0. A student claims the degree is 1 because dy/dx appears to the first power.', answer: 'The degree is NOT DEFINED',
                  options: ['The degree is NOT DEFINED', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' },
                { id: 'c', prompt: 'Find the order and degree (if defined) of: (d³y/dx³)² + (d²y/dx²)³ + (dy/dx)⁴ + y⁵ = 0.', answer: 'Order = 3 (highest derivative is d³y/dx³)',
                  options: ['Order = 3 (highest derivative is d³y/dx³)', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' }
          ],
            remediations: { 'students-consistently-confuse-highest-power': { steps: ['If a student cannot correctly identify degree: (1) Revisit c12_math_cbse_09_001 to ensure order identification is solid.', '(2) Practice the "Polynomial Check" algorithm: List every derivative term; ask: "Is this term a constant times.', '(3) Do 5 targeted exercises from Exercise 9.1 (Q1, Q4, Q6, Q9, Q11) writing the justification for each.', '(4) Re-diagnostic: Give the equation (d³y/dx³)² + sin(d²y/dx²) + y = 0 and ask for order and degree with justification.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative.".',
          parts: [
                { id: 'a', prompt: 'A student solves Exercise 9.1 Q11: "The degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0 is (A) 3 (B) 2 (C) 1 (D) not defined.".', answer: 'not defined." They choose (',
                  options: ['not defined." They choose (', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' },
                { id: 'b', prompt: 'Construct a differential equation of order 2 and degree 3 that is a polynomial in derivatives.', answer: 'Example of order 2, degree 3: (d²y/dx²)³ + x(dy/dx) + y = 0',
                  options: ['Example of order 2, degree 3: (d²y/dx²)³ + x(dy/dx) + y = 0', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' }
          ],
            remediations: { 'students-consistently-confuse-highest-power': { steps: ['If a student cannot correctly identify degree: (1) Revisit c12_math_cbse_09_001 to ensure order identification is solid.', '(2) Practice the "Polynomial Check" algorithm: List every derivative term; ask: "Is this term a constant times.', '(3) Do 5 targeted exercises from Exercise 9.1 (Q1, Q4, Q6, Q9, Q11) writing the justification for each.', '(4) Re-diagnostic: Give the equation (d³y/dx³)² + sin(d²y/dx²) + y = 0 and ask for order and degree with justification.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_007', difficulty: 'standard',
          question: 'A first-order linear differential equation is an equation of the form.',
          hint: 'If stuck, revisit Class 11 derivative rules (c11_math_cbse_13_009) and integration of.',
          misconception: 'Students often write the solution as \\(y = \\frac{1}{\\text{I.F.}} \\int Q \\cdot \\text{I.F.} \\, dx + C\\) instead of \\(y =.',
          parts: [
                { id: 'a', prompt: 'Explain why the equation \\(\\frac{dy}{dx} + y^2 = x\\) is NOT a linear differential equation, even though it has \\(\\frac{dy}{dx}\\) and \\(y\\) terms.', answer: 'The term \\(y^2\\) makes the equation nonlinear',
                  options: ['The term \\(y^2\\) makes the equation nonlinear', 'it has \\(y^2\\) so it\'s nonlinear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the solution as \\(y = \\frac{1}{\\text{I.F.}} \\int Q \\cdot \\text{I.F.} \\, dx + C\\) instead of \\(y =.' }
          ],
            remediations: { 'students-often-write-the-solution': { steps: ['Re-derive the integrating factor method from scratch: start with \\(\\frac{dy}{dx} + Py = Q\\), multiply by unknown.', 'Show that \\(\\frac{d}{dx}(y g) = Q g\\) leads to \\(y g = \\int Q g \\, dx + C\\).', 'Emphasize that \\(C\\) is added *inside* the expression before dividing by \\(g\\).', 'Practice two problems where \\(P\\) is a function of \\(x\\) (e.g., \\(\\frac{dy}{dx} + \\frac{2}{x}y = x^3\\)) and explicitly.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_001', difficulty: 'standard',
          question: 'Integration is the inverse process of differentiation: given a function.',
          hint: 'If stuck, revisit Class 11 derivative formulas (c11_math_cbse_13_007,.',
          misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x >.',
          parts: [
                { id: 'a', prompt: 'What is the most general antiderivative of \\(f(x) = \\cos x\\)? Write the answer in the standard notation for an indefinite integral.', answer: '\\(\\int \\cos x\\,dx = \\sin x + C\\)',
                  options: ['\\(\\int \\cos x\\,dx = \\sin x + C\\)', '\\(\\sin x\\)', '\\(-\\sin x + C\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x > 0\\).' },
                { id: 'b', prompt: 'Two students compute \\(\\int \\sec^2 x\\,dx\\). Student A writes \\(\\tan x + C\\). Student B writes \\(-\\cot x + C\\). Are both correct?', answer: 'Only Student A is correct',
                  options: ['Only Student A is correct', 'both are correct confuses the derivatives of \\(\\tan x\\) and \\(\\cot x\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x > 0\\).' }
          ],
            remediations: { 'students-often-write-int-frac': { steps: ['If a student misses the constant \\(C\\), have them differentiate \\(F(x) = x^2\\) and \\(G(x) = x^2 + 5\\) and observe both.', 'Then ask: "If I only give you \\(2x\\), which one is the original?', 'Both are possible, so we write \\(x^2 + C\\)." For the chain rule error, have them differentiate \\(\\sin(2x)\\) and see the.', 'Then ask: "What must we multiply by to cancel that \\(2\\)?" Guide them to \\(\\frac{1}{2}\\sin(2x)\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x >.',
          parts: [
                { id: 'a', prompt: 'Two students compute \\(\\int \\sec^2 x\\,dx\\). Student A writes \\(\\tan x + C\\). Student B writes \\(-\\cot x + C\\). Are both correct?', answer: 'Only Student A is correct',
                  options: ['Only Student A is correct', 'both are correct confuses the derivatives of \\(\\tan x\\) and \\(\\cot x\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x > 0\\).' }
          ],
            remediations: { 'students-often-write-int-frac': { steps: ['If a student misses the constant \\(C\\), have them differentiate \\(F(x) = x^2\\) and \\(G(x) = x^2 + 5\\) and observe both.', 'Then ask: "If I only give you \\(2x\\), which one is the original?', 'Both are possible, so we write \\(x^2 + C\\)." For the chain rule error, have them differentiate \\(\\sin(2x)\\) and see the.', 'Then ask: "What must we multiply by to cancel that \\(2\\)?" Guide them to \\(\\frac{1}{2}\\sin(2x)\\).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_002', difficulty: 'standard',
          question: 'Integration by substitution is a technique where we change the variable of.',
          hint: 'If stuck, review the chain rule (c11_math_cbse_13_009) and basic integration formulas.',
          misconception: 'Students often forget to change the differential dx when substituting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration by substitution is a technique where we change the variable of integration to',
                  options: ['Integration by substitution is a technique where we change the variable of integration to', 'Standard integrals of trigonometric functions are the antiderivatives of the six basic', 'The degree of a differential equation is the highest positive integral power of the', 'A first-order linear differential equation is an equation of the form \\(\\frac{dy}{dx} +'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to change the differential dx when substituting.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['If a student makes the differential error, have them practice the step: "Write u = ..., then du = ...', 'dx, so dx = du / ..." explicitly.', 'For limit errors, have them create a table: x = a → u = g(a), x = b → u = g(b).', 'Emphasize that after substitution, the integral is entirely in u with u-limits.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_003', difficulty: 'standard',
          question: 'Integration by partial fractions is a technique to integrate a proper rational.',
          hint: 'If stuck, revisit factorisation of quadratics (c9_math_ch4_8) and solving linear.',
          misconception: 'Students often write the partial fraction form for a repeated linear factor \\( (x-a)^2 \\) as \\( \\frac{A}{(x-a)^2} \\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration by partial fractions is a technique to integrate a proper rational function',
                  options: ['Integration by partial fractions is a technique to integrate a proper rational function', 'Standard integrals of trigonometric functions are the antiderivatives of the six basic', 'The degree of a differential equation is the highest positive integral power of the', 'A first-order linear differential equation is an equation of the form \\(\\frac{dy}{dx} +'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the partial fraction form for a repeated linear factor \\( (x-a)^2 \\) as \\( \\frac{A}{(x-a)^2} \\) only, omitting the \\(.' }
          ],
            remediations: { 'students-often-write-the-partial': { steps: ['If a student makes the repeated linear factor error, have them revisit the derivation of partial fractions: write \\(.', 'Show that with only one constant, the numerator would be a constant, but the original numerator is linear.', 'Then give a drill: "Write the correct partial fraction form for these denominators: (i) \\( (x+1)^3 \\), (ii) \\(.', 'Remediation nodes: c9_math_ch4_8 (factorisation of quadratics) and c10_math_cbse_02_008 (polynomial division).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
