import type { SimDef } from '../../engine/types';
import C11_AppliedMathsLimitsAlgebraicTrigonometricSim from '../../../simulations/c6_12/C11_AppliedMathsLimitsAlgebraicTrigonometricSim';

/** v3 wrapped master — C11_AppliedMathsLimitsAlgebraicTrigonometricSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_appliedmathslimitsalgebraictrigonometricsim: SimDef = {
    id: 'v3w_c11_appliedmathslimitsalgebraictrigonometricsim',
    title: 'Applied Maths Limits Algebraic Trigonometric',
    subtitle: 'Covers the intuitive concept of limits using numerical tables and graphical reasoning for.',
    classLevel: 11, subject: 'science', topic: 'Intuitive Idea of Limits',
    chapters: [],
    nodeIds: ['c11_math_cbse_13_001', 'c11_math_cbse_13_002', 'c11_math_cbse_13_003', 'c11_math_cbse_13_008', 'c11_math_cbse_03_013', 'c11_math_cbse_13_004', 'c11_math_cbse_13_006', 'c11_math_cbse_13_010', 'c11_math_cbse_02_011', 'c11_math_cbse_13_005', 'c11_math_cbse_03_008', 'c11_math_cbse_03_009', 'c11_math_cbse_13_007', 'c11_math_cbse_13_009', 'c11_math_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re tracking a car approaching a toll booth at exactly 60 km/h.', goal: 'Master Applied Maths Limits Algebraic Trigonometric.' },
    discovery: {
        question: 'Consider f(x) = { x² if x < 2; 5 if x = 2; x+2 if x > 2 }. A student claims "lim_{x→2} f(x) does not exist because f(2) = 5, not 4." Explain why this reasoning.',
        options: ['The student incorrectly equates the function value at the point with the limit', 'The limit doesn\'t exist', 'limit = function value, a fundamental misconception'],
        answer: 'The student incorrectly equates the function value at the point with the limit',
        hook: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at.',
    },
    teaching: [
        { title: 'The limit of a function f(x) as x approaches.', text: 'The limit of a function f(x) as x approaches a value \'a\' is the value L that f(x) gets arbitrarily close to as x gets arbitrarily close to a (from both sides), without necessarily equalling a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_001', title: 'The limit of a function f(x) as x.',
          scaffold: { problem: 'A car\'s position (in metres) from a starting point is given by s(t) = (t² - 9)/(t - 3) for t ≠ 3 seconds.',
            steps: [
            { text: 'Identify the function s(t) = (t² - 9)/(t - 3) and the point of interest t = 3.' },
            { text: 'Choose values approaching 3 from the left: t = 2.9, 2.99, 2.999.' },
            { text: 'Choose values approaching 3 from the right: t = 3.1, 3.01, 3.001.' },
            { text: 'Observe the pattern: as t→3⁻, s(t)→6; as t→3⁺, s(t)→6. Since left-hand and right-hand limits both equal 6, the limit.' },
            { text: 'Verify algebraically: for t ≠ 3, s(t) = (t-3)(t+3)/(t-3) = t+3. As t→3, t+3 → 6.', faded: true, blankAnswer: '6 metres' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_002', title: 'Algebraic methods of evaluating limits.',
          scaffold: { problem: 'A particle\'s displacement is given by s(t) = t³ − 6t² + 9t metres.',
            steps: [
            { text: 'Compute s(2) = 2³ − 6(2)² + 9(2) = 8 − 24 + 18 = 2 metres.' },
            { text: 'Compute s(2+h) = (2+h)³ − 6(2+h)² + 9(2+h). Expand: (8 + 12h + 6h² + h³) − 6(4 + 4h + h²) + 18 + 9h = 8 + 12h + 6h² +.' },
            { text: 'Form the difference quotient: [s(2+h)−s(2)]/h = [2 − 3h + h³ − 2]/h = (−3h + h³)/h.' },
            { text: 'Simplify for h≠0: −3 + h².' },
            { text: 'Take limit as h→0: limₕ→₀ (−3 + h²) = −3 m/s.', faded: true, blankAnswer: '−3 m/s (negative indicates motion in opposite direction to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_003', title: 'The limits of trigonometric functions.',
          scaffold: { problem: 'Evaluate \\(\\lim_{x \\to 0} \\frac{\\sin 5x}{\\tan 3x}\\).',
            steps: [
            { text: 'Identify the standard limits needed: \\(\\lim_{x\\to0}\\frac{\\sin 5x}{5x}=1\\) and \\(\\lim_{x\\to0}\\frac{\\tan 3x}{3x}=1\\).' },
            { text: 'Rewrite the expression by multiplying and dividing by appropriate coefficients: \\(\\frac{\\sin 5x}{\\tan 3x} = \\frac{\\sin.' },
            { text: 'Apply the standard limits: \\(\\lim_{x\\to0}\\frac{\\sin 5x}{5x}=1\\), \\(\\lim_{x\\to0}\\frac{3x}{\\tan 3x}=1\\).' },
            { text: 'Compute the limit: \\(1 \\times 1 \\times \\frac{5}{3} = \\frac{5}{3}\\).' },
            { text: 'Verify: As \\(x\\to0\\), \\(\\sin 5x \\sim 5x\\), \\(\\tan 3x \\sim 3x\\), so ratio \\(\\sim \\frac{5x}{3x}=\\frac{5}{3}\\).', faded: true, blankAnswer: '\\(\\frac{5}{3}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_008', title: 'The derivative of a function f(x) at a.',
          scaffold: { problem: 'Find the derivative of f(x) = 2x^3 - 4x^2 + 5 using first principles. Interpret the result as the slope of the tangent at x = 1.',
            steps: [
            { text: 'Write the difference quotient using the definition f\'(x) = lim_{h→0} [f(x+h) - f(x)]/h.' },
            { text: 'Expand f(x+h) carefully: 2(x^3 + 3x^2h + 3xh^2 + h^3) - 4(x^2 + 2xh + h^2) + 5 = 2x^3 + 6x^2h + 6xh^2 + 2h^3 - 4x^2 -.' },
            { text: 'Subtract f(x) = 2x^3 - 4x^2 + 5: f(x+h) - f(x) = (2x^3 + 6x^2h + 6xh^2 + 2h^3 - 4x^2 - 8xh - 4h^2 + 5) - (2x^3 - 4x^2 +.' },
            { text: 'Factor h from every term: h(6x^2 + 6xh + 2h^2 - 8x - 4h). Cancel h with denominator: difference quotient = 6x^2 + 6xh +.' },
            { text: 'Take limit h→0: f\'(x) = 6x^2 - 8x. At x = 1, f\'(1) = 6(1)^2 - 8(1) = -2.', faded: true, blankAnswer: 'f\'(x) = 6x^2 - 8x; slope at x = 1 is -2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_013', title: 'The sum-to-product transformation.',
          scaffold: { problem: 'Two sound waves at a school auditorium are modeled by y₁ = sin(100πt) and y₂ = sin(104πt).',
            steps: [
            { text: 'Identify the sum y₁ + y₂ = sin(100πt) + sin(104πt). Here x = 104πt, y = 100πt.' },
            { text: 'Apply sin x + sin y = 2 sin((x+y)/2) cos((x-y)/2).' },
            { text: 'Compute average angle: (x+y)/2 = (104πt + 100πt)/2 = 102πt.' },
            { text: 'Compute half-difference: (x-y)/2 = (104πt - 100πt)/2 = 2πt.' },
            { text: 'Resultant: y = 2 sin(102πt) cos(2πt). The amplitude envelope is 2 cos(2πt), giving beat frequency = 2 Hz.', faded: true, blankAnswer: 'Resultant wave: y = 2 sin(102πt) cos(2πt); Beat frequency =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_004', title: 'The limit of a polynomial function.',
          scaffold: { problem: 'The position of a particle (in metres) at time \\(t\\) seconds is given by \\(s(t) = t^3 - 6t^2 + 9t\\).',
            steps: [
            { text: 'Write the difference quotient for \\(t = 2\\): \\(v = \\lim_{h \\to 0} \\frac{s(2+h) - s(2)}{h}\\).' },
            { text: 'Compute \\(s(2+h) = (2+h)^3 - 6(2+h)^2 + 9(2+h) = (8 + 12h + 6h^2 + h^3) - 6(4 + 4h + h^2) + 18 + 9h = 8 + 12h + 6h^2 +.' },
            { text: 'Compute \\(s(2) = 2^3 - 6(2)^2 + 9(2) = 8 - 24 + 18 = 2\\).' },
            { text: 'Form the numerator: \\(s(2+h) - s(2) = (2 - 3h + h^3) - 2 = -3h + h^3 = h(-3 + h^2)\\).' },
            { text: 'Write the limit: \\(v = \\lim_{h \\to 0} \\frac{h(-3 + h^2)}{h} = \\lim_{h \\to 0} (-3 + h^2) = -3\\).' },
            { text: 'Interpret: The instantaneous velocity at \\(t = 2\\) s is \\(-3\\) m/s (negative means moving backward).', faded: true, blankAnswer: '\\(-3\\) m/s' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Limits Algebraic Trigonometric', spots: [
            { id: 's1', label: 'The limit of a function', prompt: 'Which idea is this? — The limit of a function f(x) as x approaches a value \'a\' is the value L that f(x) gets.', answer: 'The limit of a function', options: ['The limit of a function', 'Algebraic methods of evaluating limits', 'The limits of trigonometric functions', 'The derivative of a function'] },
            { id: 's2', label: 'Algebraic methods of evaluating limits', prompt: 'Which idea is this? — Algebraic methods of evaluating limits involve manipulating an algebraic expression f(x).', answer: 'Algebraic methods of evaluating limits', options: ['Algebraic methods of evaluating limits', 'The limit of a function', 'The limits of trigonometric functions', 'The derivative of a function'] },
            { id: 's3', label: 'The limits of trigonometric functions', prompt: 'Which idea is this? — The limits of trigonometric functions as the variable approaches zero are evaluated using.', answer: 'The limits of trigonometric functions', options: ['The limits of trigonometric functions', 'The limit of a function', 'Algebraic methods of evaluating limits', 'The derivative of a function'] },
            { id: 's4', label: 'The derivative of a function', prompt: 'Which idea is this? — The derivative of a function f(x) at a point x = a using first principles is defined as.', answer: 'The derivative of a function', options: ['The derivative of a function', 'The limit of a function', 'Algebraic methods of evaluating limits', 'The limits of trigonometric functions'] },
            { id: 's5', label: 'The sum-to-product transformation formulae convert', prompt: 'Which idea is this? — The sum-to-product transformation formulae convert sums or differences of trigonometric.', answer: 'The sum-to-product transformation formulae convert', options: ['The sum-to-product transformation formulae convert', 'The limit of a function', 'Algebraic methods of evaluating limits', 'The limits of trigonometric functions'] },
            { id: 's6', label: 'The limit of a polynomial', prompt: 'Which idea is this? — The limit of a polynomial function \\(p(x)\\) as \\(x\\) approaches \\(a\\) is simply \\(p(a)\\),.', answer: 'The limit of a polynomial', options: ['The limit of a polynomial', 'The limit of a function', 'Algebraic methods of evaluating limits', 'The limits of trigonometric functions'] }
          ] } }
    ],
    explore: { component: C11_AppliedMathsLimitsAlgebraicTrigonometricSim, prompt: 'Explore the interactive — Applied Maths Limits Algebraic Trigonometric' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_13_001', difficulty: 'standard',
          question: 'The limit of a function f(x) as x approaches a value \'a\' is the value L that.',
          hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008,.',
          misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at.',
          parts: [
                { id: 'a', prompt: 'What is the value of lim_{x→3} (x² - 9)/(x - 3)? Choose the correct statement: (A) The limit is 0 because the numerator is 0 at x=3.', answer: 'Correct answer: (B) The limit is 6',
                  options: ['Correct answer: (B) The limit is 6', 'The limit doesn\'t exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' },
                { id: 'b', prompt: 'Consider f(x) = { x² if x < 2; 5 if x = 2; x+2 if x > 2 }. A student claims "lim_{x→2} f(x) does not exist because f(2) = 5, not 4." Explain why this reasoning.', answer: 'The student incorrectly equates the function value at the point with the limit',
                  options: ['The student incorrectly equates the function value at the point with the limit', 'The limit doesn\'t exist', 'limit = function value, a fundamental misconception'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' },
                { id: 'c', prompt: 'Evaluate lim_{x→0} (|x|/x) by constructing a table of values for x = -0.1, -0.01, -0.001, 0.001, 0.01, 0.1. What do you conclude about the limit?', answer: 'For x < 0: |x|/x = -x/x = -1',
                  options: ['For x < 0: |x|/x = -x/x = -1', 'The limit doesn\'t exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' }
          ],
            remediations: { 'if-direct-substitution-gives-0': { steps: ['Show the student a table of values for (x²-4)/(x-2) at x = 1.9, 1.99, 1.999, 2.001, 2.01, 2.1.', 'Contrast with f(2) — point out the function has a "hole" at x=2 but the trend is clear.', 'Demonstrate factorisation: (x-2)(x+2)/(x-2) = x+2 for x≠2.', 'Emphasise the rule: "0/0 means STOP — do not evaluate. Simplify first, then substitute."', 'Practice with 3 similar rational functions where factorisation cancels the problematic factor.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at.',
          parts: [
                { id: 'a', prompt: 'A student evaluates lim_{x→2} (x² - 4)/(x - 2) by direct substitution: (4 - 4)/(2 - 2) = 0/0 = 0. Identify the error and explain the correct approach.', answer: 'The error is treating 0/0 as 0',
                  options: ['The error is treating 0/0 as 0', 'The limit doesn\'t exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' },
                { id: 'b', prompt: 'Create a piecewise function f(x) such that: (a) lim_{x→1} f(x) exists, (b) f(1) is defined but f(1) ≠ lim_{x→1} f(x), and (c) f(x) is not continuous at x=1.', answer: 'Example: f(x) = { x² if x ≠ 1',
                  options: ['Example: f(x) = { x² if x ≠ 1', 'The limit doesn\'t exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' }
          ],
            remediations: { 'if-direct-substitution-gives-0': { steps: ['Show the student a table of values for (x²-4)/(x-2) at x = 1.9, 1.99, 1.999, 2.001, 2.01, 2.1.', 'Contrast with f(2) — point out the function has a "hole" at x=2 but the trend is clear.', 'Demonstrate factorisation: (x-2)(x+2)/(x-2) = x+2 for x≠2.', 'Emphasise the rule: "0/0 means STOP — do not evaluate. Simplify first, then substitute."', 'Practice with 3 similar rational functions where factorisation cancels the problematic factor.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_002', difficulty: 'standard',
          question: 'Algebraic methods of evaluating limits involve manipulating an algebraic.',
          hint: 'If stuck on factorization, revisit Class 9 Algebraic Identities (c9_math_ch4_7,.',
          misconception: 'Students incorrectly apply the standard limit limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ when the expression is NOT in that exact.',
          parts: [
                { id: 'a', prompt: 'What is the value of limₓ→₂ (x²−4)/(x−2)? Show the algebraic step that resolves the indeterminate form.', answer: 'The limit equals 4',
                  options: ['The limit equals 4', 'undefined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the standard limit limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ when the expression is NOT in that exact form.' },
                { id: 'b', prompt: 'Evaluate: limₓ→₁ (x³−1)/(x²−1). Show all factorization steps.', answer: 'Direct substitution: 0/0',
                  options: ['Direct substitution: 0/0', 'does not exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the standard limit limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ when the expression is NOT in that exact form.' }
          ],
            remediations: { 'students-incorrectly-apply-the-standard': { steps: ['Write the standard limit formula prominently: limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹. Circle the denominator (x−a).', 'Give the counterexample limₓ→₂ (x³−8)/(x²−4). Ask: "Is the denominator (x−2)?" No, it\'s (x²−4).', 'Show two correct methods: (a) Factor both: (x−2)(x²+2x+4)/[(x−2)(x+2)] → (4+4+4)/4 = 3.', 'Practice 5 problems where denominator is NOT (x−a) to build the habit of checking the form first.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_003', difficulty: 'standard',
          question: 'The limits of trigonometric functions as the variable approaches zero are.',
          hint: 'If stuck, review algebraic limits (c11_math_cbse_13_002) and trigonometric identities.',
          misconception: 'Students frequently treat \\(\\frac{\\sin(kx)}{x}\\) as directly equal to 1 (ignoring the coefficient \\(k\\)), writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The limits of trigonometric functions as the variable approaches zero are evaluated using',
                  options: ['The limits of trigonometric functions as the variable approaches zero are evaluated using', 'The limit of a function f(x) as x approaches a value \'a\' is the value L that f(x) gets', 'Algebraic methods of evaluating limits involve manipulating an algebraic expression f(x)', 'The derivative of a function f(x) at a point x = a using first principles is defined as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently treat \\(\\frac{\\sin(kx)}{x}\\) as directly equal to 1 (ignoring the coefficient \\(k\\)), writing \\(\\lim_{x\\to0}\\frac{\\sin.' }
          ],
            remediations: { 'students-frequently-treat-frac-sin': { steps: ['**Coefficient mismatch:** Make the student write the standard limit \\(\\frac{\\sin x}{x}=1\\) on a card.', 'For any \\(\\frac{\\sin(kx)}{x}\\), insist they explicitly write: "Multiply and divide by \\(k\\): \\(k\\frac{\\sin(kx)}{kx}\\)".', 'Practice 5 problems where only the coefficient changes.', '**\\(1-\\cos x\\) confusion:** Have them derive \\(1-\\cos x = 2\\sin^2\\frac{x}{2}\\) from \\(\\cos 2\\theta = 1-2\\sin^2\\theta\\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_008', difficulty: 'standard',
          question: 'The derivative of a function f(x) at a point x = a using first principles is.',
          hint: 'Revisit c11_math_cbse_13_002 (Limits: Algebraic Methods) for.',
          misconception: 'Students often incorrectly expand f(x+h) for rational functions.',
          parts: [
                { id: 'a', prompt: 'Why can\'t we simply substitute h = 0 directly into the difference quotient [f(x+h) - f(x)]/h to find the derivative? Explain with the example f(x) = x^2.', answer: 'Direct substitution gives 0/0, an indeterminate form',
                  options: ['Direct substitution gives 0/0, an indeterminate form', 'we can substitute h=0 directly', 'the derivative is undefined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly expand f(x+h) for rational functions.' }
          ],
            remediations: { 'students-often-incorrectly-expand-f': { steps: ['If a student makes the "distributing the denominator" or "distributing the root" error, immediately stop and have them.', 'Then revisit the algebraic rule: 1/(A+B) ≠ 1/A + 1/B and √(A+B) ≠ √A + √B.', 'Practice 5-10 targeted exercises where they only write f(x+h) correctly for rational and radical functions before.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_013', difficulty: 'standard',
          question: 'The sum-to-product transformation formulae convert sums or differences of.',
          hint: 'If stuck, revisit c11_math_cbse_03_009 (Sum and Difference Formulas) and practice.',
          misconception: 'Students write cos x - cos y = 2 sin((x+y)/2) sin((x-y)/2) with a positive sign, confusing it with the formula for cos.',
          parts: [
                { id: 'a', prompt: 'Compare the structure of sin x + sin y and cos x + cos y formulas.', answer: 'Both formulas contain cos((x-y)/2) as the second factor',
                  options: ['Both formulas contain cos((x-y)/2) as the second factor', 'both use sine for the first factor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write cos x - cos y = 2 sin((x+y)/2) sin((x-y)/2) with a positive sign, confusing it with the formula for cos y - cos x.' }
          ],
            remediations: { 'students-write-cos-x-cos': { steps: ['Write both formulas side by side: cos x + cos y = 2 cos((x+y)/2) cos((x-y)/2) and cos x - cos y = -2 sin((x+y)/2).', 'Test with x=60°, y=30°: LHS = 0.5 - 0.866 = -0.366. RHS with negative: -2 sin 45° sin 15° = -2(0.707)(0.259) = -0.366.', 'Memorize the mnemonic "cosine difference gives negative sine-sine" and always verify sign with a test case.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write cos x - cos y = 2 sin((x+y)/2) sin((x-y)/2) with a positive sign, confusing it with the formula for cos.',
          parts: [
                { id: 'a', prompt: 'Compare the structure of sin x + sin y and cos x + cos y formulas.', answer: 'Both formulas contain cos((x-y)/2) as the second factor',
                  options: ['Both formulas contain cos((x-y)/2) as the second factor', 'both use sine for the first factor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write cos x - cos y = 2 sin((x+y)/2) sin((x-y)/2) with a positive sign, confusing it with the formula for cos y - cos x.' }
          ],
            remediations: { 'students-write-cos-x-cos': { steps: ['Write both formulas side by side: cos x + cos y = 2 cos((x+y)/2) cos((x-y)/2) and cos x - cos y = -2 sin((x+y)/2).', 'Test with x=60°, y=30°: LHS = 0.5 - 0.866 = -0.366. RHS with negative: -2 sin 45° sin 15° = -2(0.707)(0.259) = -0.366.', 'Memorize the mnemonic "cosine difference gives negative sine-sine" and always verify sign with a test case.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_004', difficulty: 'standard',
          question: 'The limit of a polynomial function \\(p(x)\\) as \\(x\\) approaches \\(a\\) is simply.',
          hint: 'If stuck, revisit Class 9 factorisation (c9_math_ch4_7, c9_math_ch4_8) and Class 10.',
          misconception: 'Students cancel \\((x-a)\\) factors **before** confirming that both numerator and denominator are zero at \\(x = a\\).',
          parts: [
                { id: 'a', prompt: 'Why can we evaluate \\(\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}\\) by cancelling \\((x-2)\\) even though the original function is undefined at \\(x = 2\\)?', answer: 'The limit depends on values of \\(x\\) *near* 2, not *at* 2',
                  options: ['The limit depends on values of \\(x\\) *near* 2, not *at* 2', 'the limit doesn\'t exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students cancel \\((x-a)\\) factors **before** confirming that both numerator and denominator are zero at \\(x = a\\).' },
                { id: 'b', prompt: 'Evaluate \\(\\lim_{x \\to -1} \\frac{x^3 + 1}{x + 1}\\).', answer: 'Direct substitution gives \\(\\frac{0}{0}\\)',
                  options: ['Direct substitution gives \\(\\frac{0}{0}\\)', 'does not exist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students cancel \\((x-a)\\) factors **before** confirming that both numerator and denominator are zero at \\(x = a\\).' }
          ],
            remediations: { 'students-cancel-x-a-factors': { steps: ['If a student cancels without verifying 0/0: (1) Make them always write "Direct substitution gives ___" as Step 1.', '(2) If the result is a number (including 0), STOP — that\'s the limit.', '(3) Only if it\'s 0/0 or ∞/∞, proceed to factorise.', '(4) Practice with mixed sets where some limits are determinate and some are 0/0, forcing the decision step.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
