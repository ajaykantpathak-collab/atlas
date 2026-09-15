import type { SimDef } from '../../engine/types';
import C12_AppliedMathsFinancialMathematicsCalculationSim from '../../../simulations/c6_12/C12_AppliedMathsFinancialMathematicsCalculationSim';

/** v3 wrapped master — C12_AppliedMathsFinancialMathematicsCalculationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsfinancialmathematicscalculationsim: SimDef = {
    id: 'v3w_c12_appliedmathsfinancialmathematicscalculationsim',
    title: 'Applied Maths Financial Mathematics Calculation',
    subtitle: 'This node covers equations of tangents and normals to curves y = f(x), parametric curves.',
    classLevel: 12, subject: 'science', topic: 'Tangents and Normals to Curves',
    chapters: [],
    nodeIds: ['c12_math_cbse_06_005', 'c12_math_cbse_04_007', 'c12_math_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re designing a roller coaster track for an amusement park in Mumbai.', goal: 'Master Applied Maths Financial Mathematics Calculation.' },
    discovery: {
        question: 'State the equation of the normal to the curve y = f(x) at the point (x₀, y₀) when f\'(x₀) = 2.',
        options: ['The normal equation is y - y₀ = -1/2 (x - x₀)', 'negative slope', 'negative reciprocal slope'],
        answer: 'The normal equation is y - y₀ = -1/2 (x - x₀)',
        hook: 'Students consistently write the normal equation as y - y₀ = -f\'(x₀)(x - x₀) instead of y - y₀ = -1/f\'(x₀)(x - x₀),.',
    },
    teaching: [
        { title: 'For a curve y = f(x) differentiable at point.', text: 'For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the straight line passing through P with slope f\'(x₀), and the normal is the straight line through P perpendicular to the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_04_007', title: 'The inverse of a square matrix A of.',
          scaffold: { problem: 'A small shop sells three items: notebooks (₹x each), pens (₹y each), and erasers (₹z each).',
            steps: [
            { text: 'Write the system as AX = B. A = [[2, 1, 3], [1, 2, 1], [3, 1, 2]], X = [x, y, z]ᵀ, B = [13, 8, 13]ᵀ.' },
            { text: 'Compute |A|. Expand along R1: |A| = 2(4-1) - 1(2-3) + 3(1-6) = 2(3) - 1(-1) + 3(-5) = 6 + 1 - 15 = -8 ≠ 0.' },
            { text: 'Find cofactor matrix.' },
            { text: 'Adjoint = transpose of cofactor matrix = [[3, 1, -5], [1, -5, 1], [-5, 1, 3]] (symmetric here).' },
            { text: 'A⁻¹ = (1/-8) adj A = [[-3/8, -1/8, 5/8], [-1/8, 5/8, -1/8], [5/8, -1/8, -3/8]].' },
            { text: 'X = A⁻¹B = (1/-8)[[3,1,-5],[1,-5,1],[-5,1,3]] [13,8,13]ᵀ = (1/-8)[39+8-65, 13-40+13, -65+8+39]ᵀ = (1/-8)[-18, -14,.' },
            { text: 'x = ₹2.25, y = ₹1.75, z = ₹2.25. Verify: 2(2.25)+1.75+3(2.25)=4.5+1.75+6.75=13 ✓.', faded: true, blankAnswer: 'Notebook = ₹2.25, Pen = ₹1.75, Eraser = ₹2.25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_13_010', title: 'A Bernoulli trial is a random.',
          scaffold: { problem: 'In a multiple-choice test with 20 questions, each question has 4 options with exactly one correct answer.',
            steps: [
            { text: 'Verify Bernoulli conditions: fixed \\(n=20\\) trials (questions); two outcomes per trial (correct/incorrect); constant.' },
            { text: 'Identify parameters: \\(n = 20\\), \\(p = 0.25\\), \\(q = 1-p = 0.75\\), \\(k = 5\\).' },
            { text: 'Write binomial PMF: \\(P(X=5) = \\binom{20}{5} (0.25)^5 (0.75)^{15}\\).' },
            { text: 'Compute \\(\\binom{20}{5} = \\frac{20 \\times 19 \\times 18 \\times 17 \\times 16}{5 \\times 4 \\times 3 \\times 2 \\times 1} =.' },
            { text: 'Mean \\(\\mu = np = 20 \\times 0.25 = 5\\). Variance \\(\\sigma^2 = npq = 20 \\times 0.25 \\times 0.75 = 3.75\\).', faded: true, blankAnswer: '\\(P(X=5) \\approx 0.2023\\); Expected correct answers = 5;.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_04_007', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Financial Mathematics Calculation', spots: [
            { id: 's1', label: 'For a curve y', prompt: 'Which idea is this? — For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the straight line.', answer: 'For a curve y', options: ['For a curve y', 'The inverse of a square', 'A Bernoulli trial is a'] },
            { id: 's2', label: 'The inverse of a square', prompt: 'Which idea is this? — The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying.', answer: 'The inverse of a square', options: ['The inverse of a square', 'For a curve y', 'A Bernoulli trial is a'] },
            { id: 's3', label: 'A Bernoulli trial is a', prompt: 'Which idea is this? — A Bernoulli trial is a random experiment with exactly two possible outcomes — "success".', answer: 'A Bernoulli trial is a', options: ['A Bernoulli trial is a', 'For a curve y', 'The inverse of a square'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsFinancialMathematicsCalculationSim, prompt: 'Explore the interactive — Applied Maths Financial Mathematics Calculation' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_math_cbse_04_007', difficulty: 'standard',
          question: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix.',
          hint: 'If stuck on cofactor signs or determinant calculation, revisit c12_math_cbse_04_005.',
          misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying',
                  options: ['The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying', 'For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the straight line', 'A Bernoulli trial is a random experiment with exactly two possible outcomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students compute the cofactor matrix correctly but forget to transpose it to get the adjoint, then divide by |A|.' }
          ],
            remediations: { 'students-compute-the-cofactor-matrix': { steps: ['Remediation: Return to c12_math_cbse_04_006 (Adjoint of a Matrix) and re-derive adj A for a 3×3 matrix step by step:.', 'Use a matrix with distinct off-diagonal cofactors (e.g., A = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]) so the transpose.', 'Re-do Diagnostic Question 3 with this matrix.', 'Then re-attempt Diagnostic Question 5 with |A| ≠ 1 to force the division step.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_13_010', difficulty: 'standard',
          question: 'A Bernoulli trial is a random experiment with exactly two possible outcomes —.',
          hint: 'If stuck, revisit Class 11 Permutations and Combinations (c11_math_cbse_07_007) for.',
          misconception: 'Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Bernoulli trial is a random experiment with exactly two possible outcomes',
                  options: ['A Bernoulli trial is a random experiment with exactly two possible outcomes', 'For a curve y = f(x) differentiable at point P(x₀, y₀), the tangent is the straight line', 'The inverse of a square matrix A of order n, denoted A⁻¹, is the unique matrix satisfying'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the binomial formula to sampling **without replacement** from a finite population.' }
          ],
            remediations: { 'students-incorrectly-apply-the-binomial': { steps: ['If a student uses binomial for without-replacement problems: 1.', 'Ask them to list the four Bernoulli conditions and check each for the problem.', 'Explicitly track how the composition changes: after drawing 1 defective, the box has 3 defectives out of 19, so \\(p\\).', 'Show the tree diagram for the first two draws to visualize dependence.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
