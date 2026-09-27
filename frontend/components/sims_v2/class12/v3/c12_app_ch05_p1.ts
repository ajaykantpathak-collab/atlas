import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch05_p1: SimDef = {
    id: 'v3_c12_app_ch05_p1',
    title: 'Differential Equations · Part 1/2',
    subtitle: 'This node covers the foundational concepts of differential equations: definition.',
    classLevel: 12, subject: 'app', topic: 'Differential Equations · Part 1/2',
    chapters: ['c12_app_ch05'],
    nodeIds: ['c12_app_cbse_05_001', 'c12_app_cbse_05_002', 'c12_app_cbse_05_003', 'c12_app_cbse_05_004', 'c12_app_cbse_05_005', 'c12_app_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world question: "If a bacteria culture doubles every hour, can you write an equation that.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain in your own words why the equation d²y/dx² + 3(dy/dx)² = sin x has degree 1, while the equation (d²y/dx²)³ + dy/dx = x has degree 3.',
        options: ['Correct explanation: Degree is defined only when the differential equation is a', 'power of highest derivative', 'highest power anywhere in the equation'],
        answer: 'Correct explanation: Degree is defined only when the differential equation is a',
        hook: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial.',
    },
    teaching: [
        { title: 'LEARNING OUTCOMES', text: 'A differential equation is an equation involving derivatives of a dependent variable with respect to one or more independent variables; when only one independent variable is involved, it is called.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_app_cbse_05_001', title: 'LEARNING OUTCOMES',
          caseStudy: { intro: 'Start with a real-world question: "If a bacteria culture doubles every hour, can you write an equation that describes how fast the population is growing at any.',
            decisions: [{ prompt: 'Which of the following is an ordinary differential equation? (A) ∂u/∂t = α ∂²u/∂x² (B) dy/dx + y = e^x (C) ∂²z/∂x² + ∂²z/∂y² = 0 (D) dz/dx.', options: [
                { text: 'Correct answer: (B) dy/dx + y = e^x', outcome: 'Correct answer: (B) dy/dx + y = e^x. This is an ordinary differential equation because it involves.' },
                { text: 'degree is the highest power of the highest derivative', outcome: 'Not quite — Students often believe that "degree is the highest power of the highest derivative" without.', reveals: 'degree-is-the-highest-power' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_05_002', title: 'Differential equations',
          caseStudy: { intro: 'Suppose a car\'s speedometer reads 60 km/h at a certain instant — that\'s the *rate of change* of distance with respect to time.',
            decisions: [{ prompt: 'Which of the following is a differential equation? (i) \\( x^2 + 3x - 5 = 0 \\) (ii) \\( \\frac{dy}{dx} + 2y = \\sin x \\) (iii) \\( y = e^x \\).', options: [
                { text: 'Correct: (ii) and (iv) are differential equations', outcome: 'Correct: (ii) and (iv) are differential equations because they contain derivatives of the dependent.' },
                { text: 'not a differential equation', outcome: 'Not quite — Students often believe that a differential equation must contain *both* the function and its.', reveals: 'a-differential-equation-must-contain' },
                { text: 'a differential equation must contain *both* the function and its derivative (e', outcome: 'Not quite — Students often believe that a differential equation must contain *both* the function and its.', reveals: 'a-differential-equation-must-contain' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_05_004', title: 'Degree of a Differential Equation',
          scaffold: { problem: 'Find the order and degree (if defined) of the differential equation: `y = x(dy/dx) + √(1 + (dy/dx)²)`',
            steps: [
            { text: 'Identify the highest order derivative present. The equation contains only `dy/dx` (first derivative).' },
            { text: 'Check if the equation is a polynomial in derivatives. The term `√(1 + (dy/dx)²)` contains a square root acting on.' },
            { text: 'Since the equation is **not a polynomial in its derivatives** (due to the radical), the degree is **not defined**.' },
            { text: 'Verify: Even if we isolate the radical and square both sides to get `(y - x dy/dx)² = 1 + (dy/dx)²`, this is.' },
            { text: 'Final answer: Order = 1, Degree = Not Defined.', faded: true, blankAnswer: 'Order = 1, Degree = Not Defined.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_05_005', title: 'General and particular solutions of a Differential Equation',
          scaffold: { problem: 'Verify that the function `y = a e^{2x} + b e^{-3x}` (where `a, b` are arbitrary constants) is the General Solution of the differential.',
            steps: [
            { text: 'Identify the proposed solution `y = a e^{2x} + b e^{-3x}`. Note it has two arbitrary constants (`a, b`), matching the.' },
            { text: 'Compute the first derivative `dy/dx` using Chain Rule: `dy/dx = 2a e^{2x} - 3b e^{-3x}`.' },
            { text: 'Compute the second derivative `d^2y/dx^2`: `d^2y/dx^2 = 4a e^{2x} + 9b e^{-3x}`.' },
            { text: 'Substitute `y`, `dy/dx`, and `d^2y/dx^2` into the Left Hand Side (LHS) of the DE: `LHS = (4a e^{2x} + 9b e^{-3x}) + (2a.' },
            { text: 'Simplify algebraically by grouping like terms: Coefficient of `e^{2x}`: `4a + 2a - 6a = 0`.' },
            { text: 'Compare with RHS of DE (`0`). Since `LHS = RHS = 0` holds for **all** values of `a` and `b`, the function is verified.', faded: true, blankAnswer: 'Verified. `y = a e^{2x} + b e^{-3x}` satisfies `y\'\' + y\'.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Differential Equations like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Differential Equations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Differential Equations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_05_001', difficulty: 'standard',
          question: 'A differential equation is an equation involving derivatives of a dependent.',
          hint: 'If stuck, review differentiation of exponential and trigonometric functions (Class 11.',
          misconception: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial.',
          parts: [
                { id: 'a', prompt: 'Which of the following is an ordinary differential equation? (A) ∂u/∂t = α ∂²u/∂x² (B) dy/dx + y = e^x (C) ∂²z/∂x² + ∂²z/∂y² = 0 (D) dz/dx = ∂z/∂y + x', answer: 'Correct answer: (B) dy/dx + y = e^x',
                  options: ['Correct answer: (B) dy/dx + y = e^x', 'degree is the highest power of the highest derivative'],
                  hint: 'If stuck, review differentiation of exponential and trigonometric functions (Class 11 Calculus.',
                  misconception: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial condition.' },
                { id: 'b', prompt: 'Explain in your own words why the equation d²y/dx² + 3(dy/dx)² = sin x has degree 1, while the equation (d²y/dx²)³ + dy/dx = x has degree 3.', answer: 'Correct explanation: Degree is defined only when the differential equation is a',
                  options: ['Correct explanation: Degree is defined only when the differential equation is a', 'power of highest derivative', 'highest power anywhere in the equation', 'degree is the highest power of the highest derivative'],
                  hint: 'If stuck, review differentiation of exponential and trigonometric functions (Class 11 Calculus.',
                  misconception: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial condition.' }
          ],
            remediations: { 'degree-is-the-highest-power': { steps: ['Revisit the definition of degree in NCERT Section 3.10.2 — read the line "For the degree of a differential equation.', 'Practice classifying 10 equations as "degree defined" or "degree not defined" with reasons — include sin(dy/dx).', 'For each "not defined" case, identify which operation (transcendental function, fractional power, derivative.', 'Re-attempt Diagnostic Questions 2 and 5 — if still wrong, review node c12_app_cbse_05_004 (Degree of a Differential.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The differential equation dy/dx = y² has degree 2 because y is squared." Evaluate this claim. Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'degree is the highest power of the highest derivative'],
                  hint: 'If stuck, review differentiation of exponential and trigonometric functions (Class 11 Calculus.',
                  misconception: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial condition.' },
                { id: 'b', prompt: 'Create your own example of a first-order, first-degree differential equation that is NOT separable, and explain why it cannot be solved by simple integration.', answer: 'Example: dy/dx + y = x (or dy/dx = x - y)',
                  options: ['Example: dy/dx + y = x (or dy/dx = x - y)', 'degree is the highest power of the highest derivative'],
                  hint: 'If stuck, review differentiation of exponential and trigonometric functions (Class 11 Calculus.',
                  misconception: 'Students often believe that "degree is the highest power of the highest derivative" without checking the polynomial condition.' }
          ],
            remediations: { 'degree-is-the-highest-power': { steps: ['Revisit the definition of degree in NCERT Section 3.10.2 — read the line "For the degree of a differential equation.', 'Practice classifying 10 equations as "degree defined" or "degree not defined" with reasons — include sin(dy/dx).', 'For each "not defined" case, identify which operation (transcendental function, fractional power, derivative.', 'Re-attempt Diagnostic Questions 2 and 5 — if still wrong, review node c12_app_cbse_05_004 (Degree of a Differential.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_002', difficulty: 'standard',
          question: 'A differential equation is an equation involving one or more derivatives of.',
          hint: 'Review Class 11 Applied Mathematics node c11_app_cbse_08_008 (Instantaneous rate.',
          misconception: 'Students often believe that a differential equation must contain *both* the function and its derivative (e.g., \\.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a differential equation? (i) \\( x^2 + 3x - 5 = 0 \\) (ii) \\( \\frac{dy}{dx} + 2y = \\sin x \\) (iii) \\( y = e^x \\) (iv) \\.', answer: 'Correct: (ii) and (iv) are differential equations',
                  options: ['Correct: (ii) and (iv) are differential equations', 'not a differential equation', 'a differential equation must contain *both* the function and its derivative (e'],
                  hint: 'Review Class 11 Applied Mathematics node c11_app_cbse_08_008 (Instantaneous rate of change and.',
                  misconception: 'Students often believe that a differential equation must contain *both* the function and its derivative (e.g., \\( \\frac{dy}{dx} + y =.' },
                { id: 'b', prompt: 'A student writes: "\\( \\frac{dy}{dx} = 3x^2 \\) is not a differential equation because it can be solved by direct integration." Explain why this reasoning.', answer: 'The equation \\( \\frac{dy}{dx} = 3x^2 \\) **is** a differential equation',
                  options: ['The equation \\( \\frac{dy}{dx} = 3x^2 \\) **is** a differential equation', 'not a differential equation', 'a differential equation must contain *both* the function and its derivative (e'],
                  hint: 'Review Class 11 Applied Mathematics node c11_app_cbse_08_008 (Instantaneous rate of change and.',
                  misconception: 'Students often believe that a differential equation must contain *both* the function and its derivative (e.g., \\( \\frac{dy}{dx} + y =.' },
                { id: 'c', prompt: 'The temperature \\( T \\) (in °C) of a cooling cup of chai in a room at 25°C changes at a rate proportional to the difference between \\( T \\) and 25.', answer: '\\( \\frac{dT}{dt} = -k(T - 25) \\), where \\( k > 0 \\)',
                  options: ['\\( \\frac{dT}{dt} = -k(T - 25) \\), where \\( k > 0 \\)', 'not a differential equation', 'a differential equation must contain *both* the function and its derivative (e'],
                  hint: 'Review Class 11 Applied Mathematics node c11_app_cbse_08_008 (Instantaneous rate of change and.',
                  misconception: 'Students often believe that a differential equation must contain *both* the function and its derivative (e.g., \\( \\frac{dy}{dx} + y =.' },
                { id: 'd', prompt: 'Compare the two equations: \\( \\frac{dy}{dx} = x + y \\) and \\( \\frac{\\partial u}{\\partial x} + \\frac{\\partial u}{\\partial y} = 0 \\).', answer: 'The first is an **ordinary differential equation (ODE)**',
                  options: ['The first is an **ordinary differential equation (ODE)**', 'not a differential equation', 'a differential equation must contain *both* the function and its derivative (e'],
                  hint: 'Review Class 11 Applied Mathematics node c11_app_cbse_08_008 (Instantaneous rate of change and.',
                  misconception: 'Students often believe that a differential equation must contain *both* the function and its derivative (e.g., \\( \\frac{dy}{dx} + y =.' }
          ],
            remediations: { 'a-differential-equation-must-contain': { steps: ['If a student cannot distinguish differential equations from algebraic/functional equations: (1) Revisit Class 11.', '(2) Give 5 mixed equations (algebraic, functional, ODE, PDE) and have them sort into categories with justification.', '(3) Re-test with DIAGNOSTIC_QUESTION_1.', 'If still stuck, use physical analogies: "speed = derivative of distance" → "equation linking speed and distance".'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_003', difficulty: 'standard',
          question: 'The order of a differential equation is the order of the highest-order.',
          hint: 'Review **c11_app_cbse_08_008** (Instantaneous rate of change and derivative) and.',
          misconception: '**The exponent of the highest derivative determines the order.** Students frequently see \\.',
          parts: [
                { id: 'a', prompt: 'Find the order of the differential equation: \\( y = x\\frac{dy}{dx} + \\sqrt{a^2\\left(1 + \\left(\\frac{dy}{dx}\\right)^2\\right)} \\), where \\( a \\) is a constant.', answer: 'The order is 1',
                  options: ['The order is 1', 'squaring the derivative or having a square root raises the order'],
                  hint: 'Review **c11_app_cbse_08_008** (Instantaneous rate of change and derivative) and.',
                  misconception: '**The exponent of the highest derivative determines the order.** Students frequently see \\( \\left(\\frac{d^2y}{dx^2}\\right)^3 \\) and say.' }
          ],
            remediations: { 'the-exponent-of-the-highest': { steps: ['Have the student write down the definition of order **in their own words** without using the word "derivative" — e.g.', 'Give 5 equations with mixed derivative orders and powers (e.g., \\( \\left(\\frac{dy}{dx}\\right)^4 \\), \\.', 'Use color coding: highlight \\( \\frac{d^ny}{dx^n} \\) in **blue** (order = n), highlight exponents on derivatives.', 'Re-test with DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_004', difficulty: 'standard',
          question: 'The degree of a differential equation is the highest positive integral power.',
          hint: 'If stuck, review "Order of a Differential Equation" (c12_app_cbse_05_003) — practice.',
          misconception: 'Students believe that **degree is simply the exponent of the highest order derivative visible in the equation**.',
          parts: [
                { id: 'a', prompt: 'Find the order and degree (if defined) of the differential equation: `(d³y/dx³)² + 3(d²y/dx²) + 5(dy/dx)⁴ = sin x`.', answer: '**Order = 3** (highest derivative is `d³y/dx³`)',
                  options: ['**Order = 3** (highest derivative is `d³y/dx³`)', 'highest power among all derivatives', 'power of the highest order derivative'],
                  hint: 'If stuck, review "Order of a Differential Equation" (c12_app_cbse_05_003) — practice identifying.',
                  misconception: 'Students believe that **degree is simply the exponent of the highest order derivative visible in the equation**, ignoring the polynomial.' },
                { id: 'b', prompt: 'Compare the degree of the following two differential equations and explain the difference: (A) `(d²y/dx²)³ + (dy/dx)² = 0` (B) `d²y/dx² + sin(dy/dx) = 0`', answer: '(A) Degree = 3 (polynomial in derivatives',
                  options: ['(A) Degree = 3 (polynomial in derivatives', 'degree of B is 1'],
                  hint: 'If stuck, review "Order of a Differential Equation" (c12_app_cbse_05_003) — practice identifying.',
                  misconception: 'Students believe that **degree is simply the exponent of the highest order derivative visible in the equation**, ignoring the polynomial.' }
          ],
            remediations: { 'degree-is-simply-the-exponent': { steps: ['**Revisit the polynomial condition**: Write the definition 3 times: "Degree is defined ONLY if the DE is a polynomial.', '**Practice classification**: Take 10 mixed DEs (from NCERT Exercise 1, Q1-5) and for each, first write "Polynomial.', 'Yes/No" before stating order/degree.', '**Create a trap sheet**: List 5 equations where degree is not defined due to (a) radical on highest derivative, (b).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_005', difficulty: 'standard',
          question: 'The **General Solution** of a differential equation is a relation between the.',
          hint: 'If stuck on verification, review Class 11 Differentiation (Chain Rule, Product Rule) and.',
          misconception: '**Misconception:** "The arbitrary constant `C` in the General Solution is just a number we find later; during.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The function `y = x^2 + 5` is the General Solution of the differential equation `dy/dx = 2x` because it satisfies the equation." Explain why.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'a solution', 'the General Solution'],
                  hint: 'If stuck on verification, review Class 11 Differentiation (Chain Rule, Product Rule) and the.',
                  misconception: '**Misconception:** "The arbitrary constant `C` in the General Solution is just a number we find later; during verification of a solution,.' },
                { id: 'b', prompt: 'Verify whether the function `y = e^{-x} + Ax + B` (where `A` and `B` are arbitrary constants) is a solution of the differential equation `d^2y/dx^2 + dy/dx.', answer: '**Step 1:** Compute derivatives',
                  options: ['**Step 1:** Compute derivatives', 'arbitrary constant'],
                  hint: 'If stuck on verification, review Class 11 Differentiation (Chain Rule, Product Rule) and the.',
                  misconception: '**Misconception:** "The arbitrary constant `C` in the General Solution is just a number we find later; during verification of a solution,.' }
          ],
            remediations: { 'misconception-the-arbitrary-constant-c': { steps: ['**Immediate Diagnostic:** Ask the student: "If `y = x^3 + C` is the general solution, what is `dy/dx`?" If they write.', '**Remediation Step 1 (Conceptual):** Revisit **c11_app_cbse_08_008** (Instantaneous rate of change and derivative).', 'Emphasize: *The derivative of a constant (any fixed number) is zero.', '`C` represents a fixed but unknown number for a specific curve, so `dC/dx = 0` always.* 3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_006', difficulty: 'standard',
          question: 'The general solution of a differential equation is a solution that contains.',
          hint: 'Review how to determine the order of a differential equation (node c12_app_cbse_05_003).',
          misconception: 'Students often believe that if a function satisfies a differential equation and contains arbitrary constants, it.',
          parts: [
                { id: 'a', prompt: 'Explain why the function \\( y = e^x + C \\) is not the general solution of \\( \\frac{dy}{dx} = y \\), even though it satisfies the equation for any constant \\(.', answer: 'It is not the general solution',
                  options: ['It is not the general solution', 'contains a constant', 'satisfies for all values of the constant'],
                  hint: 'Review how to determine the order of a differential equation (node c12_app_cbse_05_003) and.',
                  misconception: 'Students often believe that if a function satisfies a differential equation and contains arbitrary constants, it is automatically the.' }
          ],
            remediations: { 'if-a-function-satisfies-a': { steps: ['To fix this, have the student: (1) explicitly state the order of the given differential equation by identifying the.', 'Practice with pairs like \\( y = C \\sin x \\) and \\( y = C \\sin x + D \\cos x \\) for \\( y\'\' + y = 0 \\) to contrast.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
