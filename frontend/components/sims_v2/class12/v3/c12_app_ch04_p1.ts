import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch04_p1: SimDef = {
    id: 'v3_c12_app_ch04_p1',
    title: 'Integration Applications · Part 1/2',
    subtitle: 'This node covers the foundational concepts of integration: definition.',
    classLevel: 12, subject: 'app', topic: 'Integration Applications · Part 1/2',
    chapters: ['c12_app_ch04'],
    nodeIds: ['c12_app_cbse_04_001', 'c12_app_cbse_04_002', 'c12_app_cbse_04_003', 'c12_app_cbse_04_004', 'c12_app_cbse_04_005', 'c12_app_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world scenario: "A company\'s marginal revenue (additional revenue from selling one more.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student attempts to integrate ∫ (x³ + 2x² + 5)/(x² + 1) dx by directly writing the partial fraction decomposition as (Ax+B)/(x²+1).',
        options: ['**Correct Answer:** The rational function is **improper**', 'simplifying an expression', 'preparing an integrand'],
        answer: '**Correct Answer:** The rational function is **improper**',
        hook: '**The "Cancellation" Fallacy:** Students frequently try to "cancel" common factors between the numerator and the.',
    },
    teaching: [
        { title: 'LEARNING OUTCOMES', text: 'Integration is the inverse process of differentiation: if the derivative of F(x) is f(x), then the indefinite integral of f(x) with respect to x is F(x) + C, where C is an arbitrary constant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_001', title: 'LEARNING OUTCOMES',
          scaffold: { problem: 'A manufacturer\'s marginal cost function is MC(x) = 5 + 0.1x (in ₹ per unit), where x is the number of units produced.',
            steps: [
            { text: 'Recognize that marginal cost is the derivative of total cost: MC(x) = dC/dx. So total cost C(x) = ∫MC(x) dx.' },
            { text: 'Integrate the marginal cost function term by term: ∫(5 + 0.1x) dx = ∫5 dx + ∫0.1x dx = 5x + 0.1(x^2/2) + C = 5x.' },
            { text: 'Use the initial condition (fixed cost) to find C. Fixed cost means C(0) = 10,000.' },
            { text: 'Write the total cost function: C(x) = 0.05x^2 + 5x + 10,000.' },
            { text: 'Find cost of producing 100 units: C(100) = 0.05(100)^2 + 5(100) + 10,000 = 500 + 500 + 10,000 = ₹11,000.', faded: true, blankAnswer: 'C(x) = 0.05x^2 + 5x + 10,000; Cost of 100 units = ₹11,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_002', title: 'Introduction:',
          scaffold: { problem: 'A company\'s marginal revenue function is $MR(x) = 100 - 4x + 0.5x^2$ (in ₹ per unit).',
            steps: [
            { text: 'Recognize that marginal revenue is the derivative of total revenue: $MR(x) = \\frac{dR}{dx}$.' },
            { text: 'Integrate $MR(x)$ term by term using the power rule $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$: $R(x) = \\int (100 - 4x.' },
            { text: 'Apply the initial condition $R(0) = 0$: $0 = 0 - 0 + 0 + C \\Rightarrow C = 0$.' },
            { text: 'Write the particular total revenue function: $R(x) = 100x - 2x^2 + \\frac{x^3}{6}$.' },
            { text: 'Evaluate $R(10) = 100(10) - 2(100) + \\frac{1000}{6} = 1000 - 200 + 166.67 = ₹966.67$.', faded: true, blankAnswer: '$R(x) = 100x - 2x^2 + \\frac{x^3}{6}$; $R(10) = ₹966.67$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_003', title: 'Integration by substitution',
          scaffold: { problem: 'A startup\'s marginal profit (in ₹ lakhs per unit) is given by MP(x) = 6x√(x² + 4), where x is units sold (in hundreds).',
            steps: [
            { text: 'Recognize that Total Profit P(x) = ∫ MP(x) dx = ∫ 6x√(x² + 4) dx.' },
            { text: 'Choose substitution t = x² + 4. Then dt = 2x dx → 6x dx = 3 dt.' },
            { text: 'Integrate in t: ∫ 3√t dt = 3 ∫ t^(1/2) dt = 3 · (t^(3/2) / (3/2)) = 2 t^(3/2) + C.' },
            { text: 'Back-substitute t = x² + 4: P(x) = 2 (x² + 4)^(3/2) + C.' },
            { text: 'Use initial condition P(0) = 0 (break-even at x=0): 0 = 2(0+4)^(3/2) + C = 2·8 + C = 16 + C → C = -16.', faded: true, blankAnswer: 'P(x) = 2(x² + 4)^(3/2) - 16 (₹ lakhs)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_004', title: 'Integration by Partial Fractions',
          scaffold: { problem: '** A firm\'s Marginal Revenue function is given by MR(x) = (6x² - 5x + 2) / [x(x-1)²] (in ₹ per unit), where x is output.',
            steps: [
            { text: 'Check degrees. Numerator deg=2, Denominator deg=3 (x * x²). Proper fraction → No long division needed.' },
            { text: 'Factor denominator completely: x(x-1)² (already factored: distinct linear x, repeated linear (x-1)²).' },
            { text: 'Set up decomposition: (6x² - 5x + 2)/[x(x-1)²] = A/x + B/(x-1) + C/(x-1)².' },
            { text: 'Clear denominator: 6x² - 5x + 2 = A(x-1)² + B x(x-1) + C x.' },
            { text: 'Solve for constants using strategic substitution:' },
            { text: 'Write integrand: MR = 2/x + 4/(x-1) + 3/(x-1)².' },
            { text: 'Integrate term-by-term: R(x) = ∫ MR dx = 2 log|x| + 4 log|x-1| + 3 ∫ (x-1)⁻² dx = 2 log|x| + 4 log|x-1| - 3/(x-1) + K.' },
            { text: 'Use initial condition R(2) = 50: 2 log 2 + 4 log 1 - 3/(1) + K = 50 → 2 log 2 + 0 - 3 + K = 50 → K = 53 - 2 log 2.' },
            { text: 'Final Answer: R(x) = 2 log|x| + 4 log|x-1| - 3/(x-1) + 53 - 2 log 2.', faded: true, blankAnswer: '** R(x) = 2 log|x| + 4 log|x-1| - 3/(x-1) + 53 - 2 log 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_005', title: 'Integration by Parts',
          scaffold: { problem: '** A company\'s marginal profit (in ₹) from selling x units of a product is given by P\'(x) = x ln x.',
            steps: [
            { text: 'Total profit P(x) = ∫ P\'(x) dx = ∫ x ln x dx. Recognize product of algebraic (x) and logarithmic (ln x).' },
            { text: 'Apply ILATE: Logarithmic > Algebraic → choose u = ln x, dv = x dx.' },
            { text: 'Compute du = (1/x) dx, v = ∫ x dx = x²/2.' },
            { text: 'Apply formula: ∫ x ln x dx = (x²/2) ln x − ∫ (x²/2)(1/x) dx = (x²/2) ln x − ½ ∫ x dx = (x²/2) ln x − x²/4 + C.' },
            { text: 'Use P(1) = 5: (1/2)(0) − 1/4 + C = 5 → C = 5.25. So P(x) = (x²/2) ln x − x²/4 + 5.25.' },
            { text: 'Profit at x = 10: P(10) = (100/2) ln 10 − 100/4 + 5.25 = 50 ln 10 − 25 + 5.25 = 50 ln 10 − 19.75 ≈ 50(2.3026) − 19.75.', faded: true, blankAnswer: '** P(x) = (x²/2) ln x − x²/4 + 5.25; P(10) ≈ ₹95.38' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_006', title: 'Definite Integral',
          scaffold: { problem: 'A company\'s marginal cost function is \\(MC(x) = 3x^2 - 12x + 20\\) (in rupees per unit). Fixed cost is ₹500.',
            steps: [
            { text: 'Total Variable Cost (TVC) from 0 to 10 units is \\(\\int_0^{10} MC(x)\\,dx = \\int_0^{10} (3x^2 - 12x + 20)\\,dx\\).' },
            { text: 'Find antiderivative: \\(F(x) = x^3 - 6x^2 + 20x\\). (No +C for definite integral.)' },
            { text: 'Evaluate at limits: \\(F(10) = 1000 - 600 + 200 = 600\\); \\(F(0) = 0\\).' },
            { text: 'TVC = \\(600 - 0 = 600\\) rupees.' },
            { text: 'Total Cost = TVC + Fixed Cost = \\(600 + 500 = 1100\\) rupees.', faded: true, blankAnswer: '₹1100' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_04_006', title: 'Definite Integral',
          caseStudy: { intro: 'A bakery owner knows the marginal cost of producing the \\(x\\)-th cake is \\(MC(x) = 2x + 5\\) rupees.',
            decisions: [{ prompt: 'What is the value of \\(\\int_1^3 2x\\,dx\\)? Write the antiderivative and show the limit substitution step.', options: [
                { text: 'Correct answer: Antiderivative of \\(2x\\) is \\(x^2\\)', outcome: 'Correct answer: Antiderivative of \\(2x\\) is \\(x^2\\). Then \\(\\int_1^3 2x\\,dx = [x^2]_1^3 = 3^2 - 1^2.' },
                { text: '\\(x^2 + C\\)', outcome: 'Not quite — Students write the antiderivative as \\(F(x) + C\\) and then evaluate \\(F(b) + C - (F(a) + C)\\).', reveals: 'students-write-the-antiderivative-as' },
                { text: '\\(3^2 + C - (1^2 + C)\\)', outcome: 'Not quite — Students write the antiderivative as \\(F(x) + C\\) and then evaluate \\(F(b) + C - (F(a) + C)\\).', reveals: 'students-write-the-antiderivative-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Integration Applications like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Integration Applications · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Integration Applications · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_04_001', difficulty: 'standard',
          question: 'Integration is the inverse process of differentiation: if the derivative.',
          hint: 'Review Class 11 differentiation rules (c11_app_cbse_08_009) and the concept that.',
          misconception: 'Students treat the constant of integration C as "just a formality" or "always zero" because in definite integrals.',
          parts: [
                { id: 'a', prompt: 'If the derivative of a function F(x) is f(x) = 3x^2, what is the most general form of F(x)? Explain why your answer includes "+ C".', answer: 'F(x) = x^3 + C',
                  options: ['F(x) = x^3 + C', 'F(x) = x^3'],
                  hint: 'Review Class 11 differentiation rules (c11_app_cbse_08_009) and the concept that d/dx[constant] = 0.',
                  misconception: 'Students treat the constant of integration C as "just a formality" or "always zero" because in definite integrals it cancels out.' },
                { id: 'b', prompt: 'Compare the results of differentiating F(x) = x^3 + 7 and integrating f(x) = 3x^2. Why are the operations not perfect inverses in the strict sense?', answer: 'Differentiation: d/dx(x^3 + 7) = 3x^2',
                  options: ['Differentiation: d/dx(x^3 + 7) = 3x^2', 'they are perfect inverses'],
                  hint: 'Review Class 11 differentiation rules (c11_app_cbse_08_009) and the concept that d/dx[constant] = 0.',
                  misconception: 'Students treat the constant of integration C as "just a formality" or "always zero" because in definite integrals it cancels out.' }
          ],
            remediations: { 'students-treat-the-constant-of': { steps: ['Revisit Class 11 differentiation of constants (c11_app_cbse_08_008): explicitly differentiate x^2, x^2+5, x^2-3 and.', 'Draw the family of curves y = x^2 + C for C = -3, -1, 0, 2, 4 on the same axes — observe vertical shifts.', 'Do 5 initial value problems: given f\'(x) and f(a) = b, find f(x).', 'Re-diagnostic: Ask the student to integrate 3x^2 and explain in their own words why +C is needed, using the graph from.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_002', difficulty: 'standard',
          question: 'Integration is the inverse process of differentiation; if $\\frac{d}{dx}[F(x)].',
          hint: 'If stuck, review Class 11 derivative formulas (c11_app_cbse_08_008, c11_app_cbse_08_009).',
          misconception: '**Misconception:** "The indefinite integral $\\int f(x)dx$ is just the area under the curve from 0 to $x$." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration is the inverse process of differentiation',
                  options: ['Integration is the inverse process of differentiation', 'Integration is the inverse process of differentiation: if the derivative of F(x) is f(x),', 'Integration by substitution is a technique used to evaluate integrals by changing the', 'Integration by Partial Fractions is a technique used to integrate rational functions'],
                  hint: 'If stuck, review Class 11 derivative formulas (c11_app_cbse_08_008, c11_app_cbse_08_009) and.',
                  misconception: '**Misconception:** "The indefinite integral $\\int f(x)dx$ is just the area under the curve from 0 to $x$." **Why it\'s wrong:** Students.' }
          ],
            remediations: { 'misconception-the-indefinite-integral-int': { steps: ['Revisit Class 11 differentiation rules (c11_app_cbse_08_008, c11_app_cbse_08_009): verify $\\frac{d}{dx}(x^n).', 'Practice "reverse differentiation" drills: given $f(x)$, find $F(x)$ such that $F\'(x)=f(x)$, then check.', 'Do 10 problems each for polynomials, exponentials, and logarithms.', 'Graph 3 members of the family $y = \\int 2x dx = x^2 + C$ for $C = -2, 0, 3$ on the same axes.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_003', difficulty: 'standard',
          question: 'Integration by substitution is a technique used to evaluate integrals.',
          hint: 'If stuck on substitution choice, review Class 11 node `c11_app_cbse_08_009` (Derivatives.',
          misconception: '**The "Cancel `dx` and `dt` like fractions" fallacy:** Students treat `dy/dx` as a fraction and write `∫ f(g(x)) g\'(x).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration by substitution is a technique used to evaluate integrals by changing the',
                  options: ['Integration by substitution is a technique used to evaluate integrals by changing the', 'Integration is the inverse process of differentiation: if the derivative of F(x) is f(x),', 'Integration is the inverse process of differentiation', 'Integration by Partial Fractions is a technique used to integrate rational functions'],
                  hint: 'If stuck on substitution choice, review Class 11 node `c11_app_cbse_08_009` (Derivatives using.',
                  misconception: '**The "Cancel `dx` and `dt` like fractions" fallacy:** Students treat `dy/dx` as a fraction and write `∫ f(g(x)) g\'(x) dx = ∫ f(t) dt`.' }
          ],
            remediations: { 'the-cancel-dx-and-dt': { steps: ['**Revisit Chain Rule differentiation** (Class 11 node `c11_app_cbse_08_009`): Practice differentiating `sin(x²)`.', '**Practice differential notation**: Given `t = x³ + 2x`, write `dt = (3x²+2)dx` — not `dt = 3x²+2`.', '**Do 5 "identify the substitution" drills**: For each integral, state *only* the substitution `t = ...` and `dt = ...`.', 'Focus on spotting "function + its derivative".'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_004', difficulty: 'standard',
          question: 'Integration by Partial Fractions is a technique used to integrate rational.',
          hint: 'If stuck on factoring denominator: Review Class 11 Polynomials (Factor Theorem, Synthetic.',
          misconception: '**The "Cancellation" Fallacy:** Students frequently try to "cancel" common factors between the numerator and the.',
          parts: [
                { id: 'a', prompt: 'A student attempts to integrate ∫ (x³ + 2x² + 5)/(x² + 1) dx by directly writing the partial fraction decomposition as (Ax+B)/(x²+1).', answer: '**Correct Answer:** The rational function is **improper**',
                  options: ['**Correct Answer:** The rational function is **improper**', 'simplifying an expression', 'preparing an integrand'],
                  hint: 'If stuck on factoring denominator: Review Class 11 Polynomials (Factor Theorem, Synthetic Division).',
                  misconception: '**The "Cancellation" Fallacy:** Students frequently try to "cancel" common factors between the numerator and the *factored* denominator.' },
                { id: 'b', prompt: 'Evaluate the integral: ∫ (2x + 3)/[(x-1)(x+2)] dx. Show all steps: decomposition setup, solving for constants, and final integration.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'simplifying an expression', 'preparing an integrand'],
                  hint: 'If stuck on factoring denominator: Review Class 11 Polynomials (Factor Theorem, Synthetic Division).',
                  misconception: '**The "Cancellation" Fallacy:** Students frequently try to "cancel" common factors between the numerator and the *factored* denominator.' }
          ],
            remediations: { 'the-cancellation-fallacy-students-frequently': { steps: ['If a student exhibits the Cancellation Fallacy or struggles with decomposition structure: 1.', '**Immediate Diagnosis:** Give them ∫ (x²-4)/[(x-2)(x+3)] dx.', 'Ask: "What is the domain of the integrand?', 'What happens at x=2?" Force them to state: "Original: x≠2, -3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Cancellation" Fallacy:** Students frequently try to "cancel" common factors between the numerator and the.',
          parts: [
                { id: 'a', prompt: 'Create a rational function integration problem that *requires* the student to: (a) Perform long division, (b) Decompose a proper fraction with a repeated.', answer: '**Problem:** Evaluate ∫ (x³ + 2x² - x + 4) / [x(x-1)²] dx',
                  options: ['**Problem:** Evaluate ∫ (x³ + 2x² - x + 4) / [x(x-1)²] dx', 'simplifying an expression', 'preparing an integrand'],
                  hint: 'If stuck on factoring denominator: Review Class 11 Polynomials (Factor Theorem, Synthetic Division).',
                  misconception: '**The "Cancellation" Fallacy:** Students frequently try to "cancel" common factors between the numerator and the *factored* denominator.' }
          ],
            remediations: { 'the-cancellation-fallacy-students-frequently': { steps: ['If a student exhibits the Cancellation Fallacy or struggles with decomposition structure: 1.', '**Immediate Diagnosis:** Give them ∫ (x²-4)/[(x-2)(x+3)] dx.', 'Ask: "What is the domain of the integrand?', 'What happens at x=2?" Force them to state: "Original: x≠2, -3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_005', difficulty: 'standard',
          question: 'Integration by Parts is a technique derived from the product rule.',
          hint: 'Review differentiation rules (product rule, chain rule) and standard integrals from Class.',
          misconception: '**Misconception:** "Integration by Parts always works if I just apply the formula — the choice of u and dv doesn\'t.',
          parts: [
                { id: 'a', prompt: 'State the Integration by Parts formula and write the ILATE priority order for choosing the first function (u) from the following: Inverse trigonometric.', answer: 'Correct answer: ∫ u dv = uv − ∫ v du',
                  options: ['Correct answer: ∫ u dv = uv − ∫ v du', 'consistency'],
                  hint: 'Review differentiation rules (product rule, chain rule) and standard integrals from Class 11.',
                  misconception: '**Misconception:** "Integration by Parts always works if I just apply the formula — the choice of u and dv doesn\'t matter as long as I\'m.' },
                { id: 'b', prompt: 'Compare the integrals ∫ log x dx and ∫ x log x dx. For each, state the correct choice of u and dv per ILATE, and explain why the same function (log x) plays.', answer: 'For ∫ log x dx: Rewrite as ∫ log x · 1 dx',
                  options: ['For ∫ log x dx: Rewrite as ∫ log x · 1 dx', 'both as', 'and pick the first one', 'u = x in ∫ x log x dx'],
                  hint: 'Review differentiation rules (product rule, chain rule) and standard integrals from Class 11.',
                  misconception: '**Misconception:** "Integration by Parts always works if I just apply the formula — the choice of u and dv doesn\'t matter as long as I\'m.' }
          ],
            remediations: { 'misconception-integration-by-parts-always': { steps: ['If a student struggles with ILATE selection: 1.', '**Drill the hierarchy:** Make a flashcard: I > L > A > T > E.', 'Practice classifying 10 functions (e.g., tan⁻¹x = I, ln x = L, x³ = A, sin x = T, eˣ = E).', '**Trace the derivative:** For each candidate u, write du/dx.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_006', difficulty: 'standard',
          question: 'A definite integral \\(\\int_a^b f(x)\\,dx\\) represents the net signed area.',
          hint: 'If stuck on finding \\(F(x)\\), review the specific integration technique needed.',
          misconception: 'Students write the antiderivative as \\(F(x) + C\\) and then evaluate \\(F(b) + C - (F(a) + C)\\), **keeping the C.',
          parts: [
                { id: 'a', prompt: 'What is the value of \\(\\int_1^3 2x\\,dx\\)? Write the antiderivative and show the limit substitution step.', answer: 'Correct answer: Antiderivative of \\(2x\\) is \\(x^2\\)',
                  options: ['Correct answer: Antiderivative of \\(2x\\) is \\(x^2\\)', '\\(x^2 + C\\)', '\\(3^2 + C - (1^2 + C)\\)', '\\(3^2 + 1^2 = 10\\)'],
                  hint: 'If stuck on finding \\(F(x)\\), review the specific integration technique needed: substitution for.',
                  misconception: 'Students write the antiderivative as \\(F(x) + C\\) and then evaluate \\(F(b) + C - (F(a) + C)\\), **keeping the C in intermediate steps** like.' },
                { id: 'b', prompt: 'Evaluate \\(\\int_0^2 (3x^2 - 4x + 1)\\,dx\\). Show all steps: find antiderivative, substitute limits, simplify.', answer: 'Antiderivative: \\(F(x) = x^3 - 2x^2 + x\\)',
                  options: ['Antiderivative: \\(F(x) = x^3 - 2x^2 + x\\)', '\\(x^3 - 2x^2 + x + C\\)', '\\(F(0) - F(2) = -2\\)'],
                  hint: 'If stuck on finding \\(F(x)\\), review the specific integration technique needed: substitution for.',
                  misconception: 'Students write the antiderivative as \\(F(x) + C\\) and then evaluate \\(F(b) + C - (F(a) + C)\\), **keeping the C in intermediate steps** like.' },
                { id: 'c', prompt: 'The marginal revenue function is \\(MR(x) = 100 - 2x\\). Find the **additional revenue** generated when production increases from 10 units to 15 units.', answer: 'Additional revenue = \\(\\int_{10}^{15} (100 - 2x)\\,dx\\)',
                  options: ['Additional revenue = \\(\\int_{10}^{15} (100 - 2x)\\,dx\\)', 'plugging in 15 and 10'],
                  hint: 'If stuck on finding \\(F(x)\\), review the specific integration technique needed: substitution for.',
                  misconception: 'Students write the antiderivative as \\(F(x) + C\\) and then evaluate \\(F(b) + C - (F(a) + C)\\), **keeping the C in intermediate steps** like.' }
          ],
            remediations: { 'students-write-the-antiderivative-as': { steps: ['**Immediate drill**: Give 5 definite integrals (polynomial, rational, exponential) and require the student to write the.', '**Concept check**: Ask "Why does +C disappear?" — student must say "Constants cancel in subtraction" not "We ignore.', '**Revisit node**: c12_app_cbse_04_003 (Integration by substitution) — practice definite integrals with substitution.', '**Re-diagnostic**: After 2 days, give \\(\\int_1^e \\frac{1}{x}\\,dx\\) — if they write \\(\\ln x + C\\) or \\(\\ln e + C - (\\ln.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
