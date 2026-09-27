import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch05_p2: SimDef = {
    id: 'v3_c12_app_ch05_p2',
    title: 'Differential Equations · Part 2/2',
    subtitle: 'This node covers finding particular solutions from given general solutions using.',
    classLevel: 12, subject: 'app', topic: 'Differential Equations · Part 2/2',
    chapters: ['c12_app_ch05'],
    nodeIds: ['c12_app_cbse_05_007', 'c12_app_cbse_05_008', 'c12_app_cbse_05_009', 'c12_app_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'You\'re designing a roller coaster and the track\'s shape follows the differential equation \\.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The general solution of a differential equation is \\( y = C_1 e^{2x} + C_2 e^{-3x} \\).',
        options: ['The student is incorrect', 'no arbitrary constants = particular solution', 'ANY solution without arbitrary constants is a particular solution'],
        answer: 'The student is incorrect',
        hook: 'Students believe that ANY solution without arbitrary constants is a particular solution.',
    },
    teaching: [
        { title: 'Particular Solution', text: 'A particular solution of a differential equation is a solution obtained from the general solution by assigning specific numerical values to all arbitrary constants, resulting in a solution that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_05_007', title: 'Particular Solution',
          scaffold: { problem: 'A savings account in a bank in Mumbai earns interest compounded continuously at 6% per annum.',
            steps: [
            { text: 'Identify the general solution \\( A(t) = Ce^{0.06t} \\) and the initial condition: at \\( t = 0 \\), \\( A = 50000 \\).' },
            { text: 'Substitute the initial condition into the general solution: \\( 50000 = Ce^{0.06 \\times 0} = Ce^0 = C \\).' },
            { text: 'Determine the constant: \\( C = 50000 \\).' },
            { text: 'Write the particular solution: \\( A(t) = 50000e^{0.06t} \\).' },
            { text: 'Find the amount after 10 years: \\( A(10) = 50000e^{0.6} \\approx 50000 \\times 1.8221 = ₹91,105 \\).', faded: true, blankAnswer: 'Particular solution: \\( A(t) = 50000e^{0.06t} \\); Amount.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_05_008', title: 'Steps to form a Differential Equation',
          scaffold: { problem: 'Form the differential equation of the family of circles having center on the y-axis and radius 3 units. (NCERT Example 8 variant)',
            steps: [
            { text: 'Identify the family equation. Center on y-axis means center is (0, k). Radius = 3. Equation: x² + (y - k)² = 9.' },
            { text: 'Differentiate once w.r.t x (since one constant): 2x + 2(y - k) y\' = 0. Simplify: x + (y - k) y\' = 0. ... (i)' },
            { text: 'Solve (i) for (y - k): (y - k) = -x / y\'. ... (ii)' },
            { text: 'Substitute (ii) into original equation: x² + (-x / y\')² = 9 → x² + x² / (y\')² = 9.' },
            { text: 'Simplify to standard form: x² (y\')² + x² = 9 (y\')² → x² [(y\')² + 1] = 9 (y\')² → (y\')² (9 - x²) = x² → y\' = ± x / √(9.', faded: true, blankAnswer: '(9 - x²)(dy/dx)² = x² (or x² + (y - k)² = 9 with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_05_009', title: 'Solving simple differential equation',
          scaffold: { problem: 'The marginal cost of producing `x` units of a product in a factory in Pune is given by `dC/dx = 50 + 2x - 0.01x^2` (in ₹ per unit).',
            steps: [
            { text: 'Recognize this is Case 1: `dC/dx = f(x)` — direct integration with respect to `x`.' },
            { text: 'Integrate both sides: `∫dC = ∫(50 + 2x - 0.01x^2) dx` → `C(x) = 50x + x^2 - 0.01(x^3/3) + K`, where `K` is constant.' },
            { text: 'Apply fixed cost condition: when `x = 0`, `C = 10,000` (fixed cost). So `10,000 = 0 + 0 - 0 + K` → `K = 10,000`.' },
            { text: 'Write particular total cost function: `C(x) = 50x + x^2 - (0.01/3)x^3 + 10,000`.' },
            { text: 'Find cost for 100 units: `C(100) = 50(100) + (100)^2 - (0.01/3)(100)^3 + 10,000 = 5,000 + 10,000 - (0.01/3)(1,000,000).', faded: true, blankAnswer: '`C(x) = 50x + x^2 - (0.01/3)x^3 + 10,000`; Cost of 100.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_05_010', title: 'Differential Equations and Mathematical Modeling',
          scaffold: { problem: 'A sum of ₹25,000 is deposited in a bank that pays 6% annual interest compounded continuously. (a) Find the amount after 8 years.',
            steps: [
            { text: 'Identify the modeling scenario — continuous compound interest.' },
            { text: 'Formulate and separate the DE: `dA/A = 0.06 dt`. Integrate both sides: `∫ dA/A = ∫ 0.06 dt` → `ln A = 0.06t + C`.' },
            { text: 'Apply initial condition to find `C`: `ln(25000) = 0.06(0) + C` → `C = ln(25000)`.' },
            { text: '(a) Compute `A(8) = 25000 e^(0.06×8) = 25000 e^0.48 ≈ 25000 × 1.616 = ₹40,400`.' },
            { text: 'Interpret: After 8 years, the amount grows to ₹40,400. Tripling takes about 18 years and 4 months.', faded: true, blankAnswer: '(a) ₹40,400 (b) ≈ 18.32 years (18 years 4 months)' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_05_009', title: 'Solving simple differential equation',
          caseStudy: { intro: 'Start with a real scenario: "A bacteria culture in a lab in Bengaluru doubles every 3 hours.',
            decisions: [{ prompt: 'What is the general solution of the differential equation `dy/dx = 3x^2 + 2x`? Write the answer with the constant of integration.', options: [
                { text: 'The general solution is `y = x^3 + x^2 + C`, where `C` is an arbitrary constant', outcome: 'The general solution is `y = x^3 + x^2 + C`, where `C` is an arbitrary constant.' },
                { text: 'general solution', outcome: 'Not quite — Students treat `dy/dx` as a fraction `dy/dx` and "cross-multiply" `dx` blindly without.', reveals: 'students-treat-dy-dx-as' },
                { text: 'a particular solution', outcome: 'Not quite — Students treat `dy/dx` as a fraction `dy/dx` and "cross-multiply" `dx` blindly without.', reveals: 'students-treat-dy-dx-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You finished Differential Equations — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_05_007', difficulty: 'standard',
          question: 'A particular solution of a differential equation is a solution obtained from.',
          hint: 'Review c12_app_cbse_05_006 (General Solution) to understand the structure of solutions.',
          misconception: 'Students believe that ANY solution without arbitrary constants is a particular solution.',
          parts: [
                { id: 'a', prompt: 'The general solution of a differential equation is \\( y = C_1 e^{2x} + C_2 e^{-3x} \\).', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'no arbitrary constants = particular solution', 'ANY solution without arbitrary constants is a particular solution'],
                  hint: 'Review c12_app_cbse_05_006 (General Solution) to understand the structure of solutions with.',
                  misconception: 'Students believe that ANY solution without arbitrary constants is a particular solution.' },
                { id: 'b', prompt: 'Find the particular solution of the differential equation \\( \\frac{dy}{dx} = 3x^2 \\) given that \\( y = 4 \\) when \\( x = 1 \\).', answer: 'Step 1: Integrate to get general solution: \\( y = \\int 3x^2 \\, dx = x^3 + C \\)',
                  options: ['Step 1: Integrate to get general solution: \\( y = \\int 3x^2 \\, dx = x^3 + C \\)', 'ANY solution without arbitrary constants is a particular solution'],
                  hint: 'Review c12_app_cbse_05_006 (General Solution) to understand the structure of solutions with.',
                  misconception: 'Students believe that ANY solution without arbitrary constants is a particular solution.' },
                { id: 'c', prompt: 'The general solution of a second-order differential equation is \\( y = C_1 \\cos(2x) + C_2 \\sin(2x) \\).', answer: 'A second-order ODE has two arbitrary constants in its general solution, so two',
                  options: ['A second-order ODE has two arbitrary constants in its general solution, so two', 'ANY solution without arbitrary constants is a particular solution'],
                  hint: 'Review c12_app_cbse_05_006 (General Solution) to understand the structure of solutions with.',
                  misconception: 'Students believe that ANY solution without arbitrary constants is a particular solution.' }
          ],
            remediations: { 'any-solution-without-arbitrary-constants': { steps: ['If a student cannot distinguish particular from general solution: (1) Have them write the general solution of \\.', '(2) Give them \\( y(1)=4 \\) and ask: "Which value of C makes this true?" — guide them to substitute x=1, y=4.', '(3) Have them write the final answer as "Particular solution: \\( y = x^3 + 3 \\)" and verify it satisfies both the.', '(4) Re-diagnose with: "If the condition were \\( y(2)=10 \\), what would the particular solution be?"'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_008', difficulty: 'standard',
          question: 'Forming a differential equation from a given family of curves means eliminating.',
          hint: 'If stuck on elimination, review algebraic substitution and elimination techniques from.',
          misconception: 'Students mechanically differentiate \'n\' times for \'n\' constants but fail to check if constants are ESSENTIAL.',
          parts: [
                { id: 'a', prompt: 'Compare the differential equations formed from these two families: Family 1: y = A e²ˣ + B e⁻²ˣ Family 2: y = A cos 2x + B sin 2x Both have two arbitrary.', answer: 'Both will have order 2 (two essential arbitrary constants → differentiate twice)',
                  options: ['Both will have order 2 (two essential arbitrary constants → differentiate twice)', 'same form'],
                  hint: 'If stuck on elimination, review algebraic substitution and elimination techniques from Class 10/11.',
                  misconception: 'Students mechanically differentiate \'n\' times for \'n\' constants but fail to check if constants are ESSENTIAL (independent).' }
          ],
            remediations: { 'students-mechanically-differentiate-n-times': { steps: ['Revisit the concept of "essential arbitrary constants" using c12_app_cbse_05_006 (General Solution) — understand that.', 'Practice algebraic elimination separately: Take two equations with one parameter (e.g., x² + y² = 2ax and x + yy\' = a).', 'Re-do Example 6, 7, 8 from NCERT line-by-line, writing the justification for each step: "Differentiating because...".', 'Diagnostic re-check: Form the DE for y = A eᵏˣ + B e⁻ᵏˣ (k constant).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_009', difficulty: 'standard',
          question: 'Solving a simple differential equation involves finding a function `y = f(x)`.',
          hint: 'If stuck on integration step, revisit Class 11 derivative rules (c11_app_cbse_08_009) and.',
          misconception: 'Students treat `dy/dx` as a fraction `dy/dx` and "cross-multiply" `dx` blindly without understanding the integration.',
          parts: [
                { id: 'a', prompt: 'What is the general solution of the differential equation `dy/dx = 3x^2 + 2x`? Write the answer with the constant of integration.', answer: 'The general solution is `y = x^3 + x^2 + C`, where `C` is an arbitrary constant',
                  options: ['The general solution is `y = x^3 + x^2 + C`, where `C` is an arbitrary constant', 'general solution', 'a particular solution'],
                  hint: 'If stuck on integration step, revisit Class 11 derivative rules (c11_app_cbse_08_009) and practice.',
                  misconception: 'Students treat `dy/dx` as a fraction `dy/dx` and "cross-multiply" `dx` blindly without understanding the integration step.' }
          ],
            remediations: { 'students-treat-dy-dx-as': { steps: ['Give them `dy/dx = x y` and ask them to solve two ways: (a) "cross-multiply" → `dy = x y dx` → `∫dy = ∫x y dx` (stuck).', 'Ask "Why did (a) fail?" — because `y` is unknown function of `x`, cannot integrate `∫x y dx`.', 'Revisit prerequisite node `c11_app_cbse_08_008` (instantaneous rate of change and derivative) to reinforce that `dy/dx`.', 'Re-do Diagnostic Question 3 with emphasis on writing `dy/y = 2x dx` explicitly before integrating.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat `dy/dx` as a fraction `dy/dx` and "cross-multiply" `dx` blindly without understanding the integration.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The differential equation `dy/dx = x/y` has no solution passing through the origin (0,0) because separation gives `y dy = x dx`, and.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'trivial solution', 'particular solution with C=0'],
                  hint: 'If stuck on integration step, revisit Class 11 derivative rules (c11_app_cbse_08_009) and practice.',
                  misconception: 'Students treat `dy/dx` as a fraction `dy/dx` and "cross-multiply" `dx` blindly without understanding the integration step.' }
          ],
            remediations: { 'students-treat-dy-dx-as': { steps: ['Give them `dy/dx = x y` and ask them to solve two ways: (a) "cross-multiply" → `dy = x y dx` → `∫dy = ∫x y dx` (stuck).', 'Ask "Why did (a) fail?" — because `y` is unknown function of `x`, cannot integrate `∫x y dx`.', 'Revisit prerequisite node `c11_app_cbse_08_008` (instantaneous rate of change and derivative) to reinforce that `dy/dx`.', 'Re-do Diagnostic Question 3 with emphasis on writing `dy/y = 2x dx` explicitly before integrating.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_05_010', difficulty: 'standard',
          question: 'Mathematical modeling using differential equations is the process.',
          hint: 'If stuck, immediately revisit `c12_app_cbse_05_009` (Solving simple differential.',
          misconception: 'Students treat every modeling problem as a separate formula to memorize: "growth = `y = y₀e^(kt)`", "cooling = `T = T_s.',
          parts: [
                { id: 'a', prompt: 'A bacterial culture doubles in 3 hours. If the initial population is 500, find the population after 10 hours.', answer: '**Formulate:** `dP/dt = kP`, `P(0)=500`',
                  options: ['**Formulate:** `dP/dt = kP`, `P(0)=500`', 'population is 10,000 at t=3 and 40,000 at t=5'],
                  hint: 'If stuck, immediately revisit `c12_app_cbse_05_009` (Solving simple differential equation).',
                  misconception: 'Students treat every modeling problem as a separate formula to memorize: "growth = `y = y₀e^(kt)`", "cooling = `T = T_s + (T₀.' }
          ],
            remediations: { 'students-treat-every-modeling-problem': { steps: ['If a student cannot formulate the DE from a word problem: (1) Have them re-read the problem and highlight phrases like.', '(2) Make a table: **Verbal phrase → Mathematical translation**: "rate of change of y" → `dy/dt`; "proportional to y" →.', '(3) Practice 3 problems side-by-side: bacteria growth, cooling cake, continuous interest — forcing them to write the.', '(4) Revisit node `c12_app_cbse_05_009` (Solving simple differential equation) to reinforce separation of variables and.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
