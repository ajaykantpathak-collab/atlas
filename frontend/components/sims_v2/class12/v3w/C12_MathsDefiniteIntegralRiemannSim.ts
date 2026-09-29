import type { SimDef } from '../../engine/types';
import C12_MathsDefiniteIntegralRiemannSim from '../../../simulations/three/C12_MathsDefiniteIntegralRiemannSim';

/** v3 wrapped master — C12_MathsDefiniteIntegralRiemannSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathsdefiniteintegralriemannsim: SimDef = {
    id: 'v3w_c12_mathsdefiniteintegralriemannsim',
    title: 'Definite Integral as Limit of a Sum',
    subtitle: 'This node covers the definition of the definite integral as a limit of a sum (Riemann.',
    classLevel: 12, subject: 'mathematics', topic: 'Definite Integral as Limit of a Sum',
    chapters: [],
    nodeIds: ['c12_math_cbse_07_007', 'c12_math_cbse_07_009', 'c12_math_cbse_08_001', 'c12_math_cbse_07_006', 'c12_math_cbse_07_001', 'c12_math_cbse_07_002', 'c12_math_cbse_07_004', 'c12_math_cbse_07_005', 'c12_math_cbse_07_008', 'c12_math_cbse_07_010', 'c12_math_cbse_07_011', 'c12_math_cbse_08_002', 'c12_math_cbse_08_003', 'c12_math_cbse_08_004', 'c12_math_cbse_08_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are designing a rectangular garden bed of length 5 metres along a curved edge \\(y = x^2\\) from.', goal: 'Master Definite Integral as Limit of a Sum.' },
    discovery: {
        question: 'What is the most general antiderivative of \\(f(x) = \\cos x\\)? Write the answer in the standard notation for an indefinite integral.',
        options: ['\\(\\int \\cos x\\,dx = \\sin x + C\\)', '\\(\\sin x\\)', '\\(-\\sin x + C\\)'],
        answer: '\\(\\int \\cos x\\,dx = \\sin x + C\\)',
        hook: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x >.',
    },
    teaching: [
        { title: 'The definite integral of a continuous.', text: 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the limit of a Riemann sum: \\[ \\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x, \\] where.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_007', title: 'The definite integral of a continuous.',
          scaffold: { problem: 'A farmer wants to find the exact area of a plot bounded by the curve \\(y = 2x + 1\\), the x-axis, and the lines \\(x = 1\\) and \\(x = 4\\).',
            steps: [
            { text: 'Identify the interval \\([a, b] = [1, 4]\\) and function \\(f(x) = 2x + 1\\).' },
            { text: 'The right endpoint of the \\(i\\)-th subinterval is \\(x_i = a + i\\Delta x = 1 + \\frac{3i}{n}\\).' },
            { text: 'Write the Riemann sum: \\(\\sum_{i=1}^n f(x_i) \\Delta x = \\sum_{i=1}^n \\left[2\\left(1 + \\frac{3i}{n}\\right) + 1\\right].' },
            { text: 'Simplify the sum: \\(\\frac{9}{n} \\sum_{i=1}^n 1 + \\frac{18}{n^2} \\sum_{i=1}^n i = \\frac{9}{n} \\cdot n + \\frac{18}{n^2}.' },
            { text: 'Take the limit as \\(n \\to \\infty\\): \\(\\lim_{n\\to\\infty} \\left(9 + 9\\left(1 + \\frac{1}{n}\\right)\\right) = 9 + 9 = 18\\).', faded: true, blankAnswer: '18 square units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_009', title: 'The Second Fundamental Theorem of.',
          scaffold: { problem: 'A particle moves along a straight line with velocity \\( v(t) = 4t^3 - 6t + 2 \\) m/s.',
            steps: [
            { text: 'Displacement is the definite integral of velocity: \\( \\int_1^3 (4t^3 - 6t + 2) \\, dt \\).' },
            { text: 'Find an antiderivative \\( s(t) \\) of \\( v(t) \\). Using power rule: \\( \\int 4t^3 \\, dt = t^4 \\), \\( \\int -6t \\, dt =.' },
            { text: 'Evaluate \\( s(t) \\) at upper limit 3: \\( s(3) = 3^4 - 3(3^2) + 2(3) = 81 - 27 + 6 = 60 \\).' },
            { text: 'Evaluate \\( s(t) \\) at lower limit 1: \\( s(1) = 1^4 - 3(1^2) + 2(1) = 1 - 3 + 2 = 0 \\).' },
            { text: 'Subtract: displacement = \\( s(3) - s(1) = 60 - 0 = 60 \\) m.', faded: true, blankAnswer: '60 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_001', title: 'The area under a simple curve y = f(x).',
          scaffold: { problem: 'A rectangular field has a curved drainage ditch along one side.',
            steps: [
            { text: 'Identify the curve and bounds. The curve is y = 3 - x^2. The bounds are x = -√3 and x = √3 (where y = 0).' },
            { text: 'Write the integral: A = ∫_{-√3}^{√3} (3 - x^2) dx.' },
            { text: 'Find the antiderivative: ∫(3 - x^2) dx = 3x - x^3/3.' },
            { text: 'Evaluate at bounds: [3x - x^3/3]_{-√3}^{√3} = (3√3 - (√3)^3/3) - (3(-√3) - (-√3)^3/3) = (3√3 - 3√3/3) - (-3√3 + 3√3/3).' },
            { text: 'Interpret: Area = 4√3 ≈ 6.928 m². This is the cross-sectional area; multiply by length for volume.', faded: true, blankAnswer: '4√3 m² (approx. 6.93 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_006', title: 'The standard integrals of exponential.',
          scaffold: { problem: 'The rate of growth of a bacteria culture (in thousands per hour) is given by \\(\\frac{dP}{dt} = 200 e^{0.15t}\\).',
            steps: [
            { text: 'Identify that we need to integrate the rate function to get the population: \\(P(t) = \\int 200 e^{0.15t}\\,dt\\).' },
            { text: 'Factor out the constant: \\(200 \\int e^{0.15t}\\,dt\\).' },
            { text: 'Use the standard integral \\(\\int e^{kt}\\,dt = \\frac{1}{k}e^{kt}+C\\) with \\(k=0.15\\): \\(\\int e^{0.15t}\\,dt =.' },
            { text: 'Multiply by 200: \\(P(t) = 200 \\cdot \\frac{20}{3}e^{0.15t} + C = \\frac{4000}{3}e^{0.15t} + C\\).' },
            { text: 'Apply initial condition \\(P(0)=5\\) (since population is in thousands): \\(5 = \\frac{4000}{3}e^{0} + C = \\frac{4000}{3} +.' },
            { text: 'Write final answer: \\(P(t) = \\frac{4000}{3}e^{0.15t} - \\frac{3985}{3}\\) (in thousands).', faded: true, blankAnswer: '\\(P(t) = \\frac{4000}{3}e^{0.15t} - \\frac{3985}{3}\\).' }
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
        { type: 'dissect', nodeId: 'c12_math_cbse_07_009', title: 'Identify each idea',
          dissect: { specimen: 'Definite Integral as Limit of a Sum', spots: [
            { id: 's1', label: 'The definite integral of a', prompt: 'Which idea is this? — The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the.', answer: 'The definite integral of a', options: ['The definite integral of a', 'The Second Fundamental Theorem of', 'The area under a simple', 'The standard integrals of exponential'] },
            { id: 's2', label: 'The Second Fundamental Theorem of', prompt: 'Which idea is this? — The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous.', answer: 'The Second Fundamental Theorem of', options: ['The Second Fundamental Theorem of', 'The definite integral of a', 'The area under a simple', 'The standard integrals of exponential'] },
            { id: 's3', label: 'The area under a simple', prompt: 'Which idea is this? — The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is.', answer: 'The area under a simple', options: ['The area under a simple', 'The definite integral of a', 'The Second Fundamental Theorem of', 'The standard integrals of exponential'] },
            { id: 's4', label: 'The standard integrals of exponential', prompt: 'Which idea is this? — The standard integrals of exponential and logarithmic functions are the antiderivatives.', answer: 'The standard integrals of exponential', options: ['The standard integrals of exponential', 'The definite integral of a', 'The Second Fundamental Theorem of', 'The area under a simple'] },
            { id: 's5', label: 'Integration is the inverse process', prompt: 'Which idea is this? — Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek.', answer: 'Integration is the inverse process', options: ['Integration is the inverse process', 'The definite integral of a', 'The Second Fundamental Theorem of', 'The area under a simple'] },
            { id: 's6', label: 'Integration by substitution is a', prompt: 'Which idea is this? — Integration by substitution is a technique where we change the variable of integration to.', answer: 'Integration by substitution is a', options: ['Integration by substitution is a', 'The definite integral of a', 'The Second Fundamental Theorem of', 'The area under a simple'] }
          ] } }
    ],
    explore: { component: C12_MathsDefiniteIntegralRiemannSim, prompt: 'Explore the interactive — Definite Integral as Limit of a Sum' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_math_cbse_07_009', difficulty: 'standard',
          question: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a.',
          hint: 'If stuck, revisit node c12_math_cbse_07_001 (Integration as Inverse of Differentiation).',
          misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous',
                  options: ['The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The standard integrals of exponential and logarithmic functions are the antiderivatives'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then incorrectly keep \\(.' }
          ],
            remediations: { 'students-often-write-the-antiderivative': { steps: ['If a student makes the above errors: (1) Have them re-derive the cancellation of \\( C \\) algebraically: \\( (F(b)+C) -.', '(2) Give a set of definite integrals where the integrand has a discontinuity in the interval (e.g., \\( \\int_0^2.', '(3) Practice the "upper minus lower" order by evaluating \\( \\int_1^2 2x \\, dx \\) both as \\( [x^2]_1^2 \\) and as \\(.', '(4) Revisit node c12_math_cbse_07_008 (First Fundamental Theorem) to reinforce the link between antiderivatives and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_001', difficulty: 'standard',
          question: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on.',
          hint: 'If stuck, revisit the evaluation of definite integrals (Chapter 7) and practice sketching.',
          misconception: 'Students often think that the definite integral ∫_a^b f(x) dx always gives the geometric area, even when f(x) is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is',
                  options: ['The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The standard integrals of exponential and logarithmic functions are the antiderivatives'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the definite integral ∫_a^b f(x) dx always gives the geometric area, even when f(x) is negative on part of the.' }
          ],
            remediations: { 'the-definite-integral-a-b': { steps: ['If a student makes this error, first have them sketch the curve and shade the region.', 'Ask: "Is the curve above or below the x-axis?" Then guide them to split the integral at the x-intercepts: Area = ∫_a^c.', 'Practice with y = cos x from 0 to 2π: identify roots at π/2 and 3π/2, set up three integrals with absolute values, and.', 'Emphasize that the integral gives signed area; geometric area is the sum of absolute values.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_006', difficulty: 'standard',
          question: 'The standard integrals of exponential and logarithmic functions are the.',
          hint: 'Review the derivatives of exponential and logarithmic functions from Class 12 Chapter 5.',
          misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\),.',
          parts: [
                { id: 'a', prompt: 'Compare the integrals \\(\\int e^{2x}\\,dx\\) and \\(\\int e^x\\,dx\\). A student writes \\(\\int e^{2x}\\,dx = e^{2x} + C\\). Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' }
          ],
            remediations: { 'misconception-1-int-a-x': { steps: ['If a student exhibits any of the above misconceptions: 1.', '**For Misconception 1:** Ask them to differentiate \\(\\frac{a^{x+1}}{x+1}\\) using the quotient rule and see it does not.', 'Then differentiate \\(\\frac{a^x}{\\ln a}\\) to confirm it works.', 'Revisit the derivative of \\(a^x\\) from Class 12 Chapter 5 (Continuity and Differentiability).'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\),.',
          parts: [
                { id: 'a', prompt: 'A student evaluates \\(\\int_{-2}^{-1} \\frac{1}{x}\\,dx\\) as \\(\\left[\\ln x\\right]_{-2}^{-1} = \\ln(-1) - \\ln(-2)\\).', answer: 'The mistake is using \\(\\ln x\\) instead of \\(\\ln|x|\\) for the antiderivative',
                  options: ['The mistake is using \\(\\ln x\\) instead of \\(\\ln|x|\\) for the antiderivative', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' },
                { id: 'b', prompt: 'Create an integral problem that requires **both** \\(\\int e^x\\,dx\\) and \\(\\int \\frac{1}{x}\\,dx\\) in its solution, and solve it completely.', answer: 'Example problem: Evaluate \\(\\int \\frac{x e^x + 1}{x}\\,dx\\)',
                  options: ['Example problem: Evaluate \\(\\int \\frac{x e^x + 1}{x}\\,dx\\)', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' },
                { id: 'c', prompt: 'Compare the integrals \\(\\int e^{2x}\\,dx\\) and \\(\\int e^x\\,dx\\). A student writes \\(\\int e^{2x}\\,dx = e^{2x} + C\\). Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' }
          ],
            remediations: { 'misconception-1-int-a-x': { steps: ['If a student exhibits any of the above misconceptions: 1.', '**For Misconception 1:** Ask them to differentiate \\(\\frac{a^{x+1}}{x+1}\\) using the quotient rule and see it does not.', 'Then differentiate \\(\\frac{a^x}{\\ln a}\\) to confirm it works.', 'Revisit the derivative of \\(a^x\\) from Class 12 Chapter 5 (Continuity and Differentiability).'] } } },
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
                  options: ['Integration by substitution is a technique where we change the variable of integration to', 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to change the differential dx when substituting.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['If a student makes the differential error, have them practice the step: "Write u = ..., then du = ...', 'dx, so dx = du / ..." explicitly.', 'For limit errors, have them create a table: x = a → u = g(a), x = b → u = g(b).', 'Emphasize that after substitution, the integral is entirely in u with u-limits.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
