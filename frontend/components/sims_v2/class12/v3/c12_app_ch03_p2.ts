import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch03_p2: SimDef = {
    id: 'v3_c12_app_ch03_p2',
    title: 'Differentiation Applications · Part 2/2',
    subtitle: 'This node covers: definition and notation of second and higher order derivatives.',
    classLevel: 12, subject: 'app', topic: 'Differentiation Applications · Part 2/2',
    chapters: ['c12_app_ch03'],
    nodeIds: ['c12_app_cbse_03_007', 'c12_app_cbse_03_008', 'c12_app_cbse_03_009', 'c12_app_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'You\'re analysing the profit of a startup: revenue \\(R(x) = 100x - x^2\\) and cost \\(C(x) = 50x + 1000\\).', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A firm\'s revenue function is R(x) = 200x - 2x². A student claims: "Since revenue increases with x, the firm should produce as much as possible." Is this.',
        options: ['**Correct Answer:** The statement is **incorrect**', 'revenue function', 'marginal revenue'],
        answer: '**Correct Answer:** The statement is **incorrect**',
        hook: '**The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average Cost) instead of.',
    },
    teaching: [
        { title: 'SECOND AND HIGHER ORDER DERIVATIVES', text: 'If \\(y = f(x)\\) is a differentiable function, its second order derivative \\(\\frac{d^2y}{dx^2}\\) (or \\(f\'\'(x)\\)) is the derivative of the first derivative \\(f\'(x)\\) with respect to \\(x\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_007', title: 'SECOND AND HIGHER ORDER DERIVATIVES',
          scaffold: { problem: 'Find the second derivative of \\(y = x^2 \\log x\\) and determine the concavity at \\(x = e\\).',
            steps: [
            { text: 'Identify the function \\(y = x^2 \\log x\\). It is a product of \\(u = x^2\\) and \\(v = \\log x\\). We need \\(d^2y/dx^2\\).' },
            { text: 'Compute first derivative using product rule: \\(dy/dx = u\'v + uv\' = 2x \\log x + x^2 \\cdot (1/x) = 2x \\log x + x\\).' },
            { text: 'Differentiate \\(dy/dx\\) again to get second derivative: \\(d^2y/dx^2 = d/dx(2x \\log x + x) = 2(\\log x + 1) + 1 = 2\\log.' },
            { text: 'Evaluate at \\(x = e\\): \\(d^2y/dx^2|_{x=e} = 2\\log e + 3 = 2(1) + 3 = 5\\).' },
            { text: 'Interpret: Since \\(5 > 0\\), the graph is concave up at \\(x = e\\). The slope is increasing.', faded: true, blankAnswer: '\\(\\frac{d^2y}{dx^2} = 2\\log x + 3\\); at \\(x=e\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_008', title: 'COST AND REVENUE FUNCTION',
          scaffold: { problem: 'A startup in Bengaluru manufactures wireless earbuds. The fixed monthly cost (rent, salaries) is ₹5,00,000.',
            steps: [
            { text: 'Model variable cost for x > 1000. Base variable cost for first 1000 units = 800 × 1000 = ₹8,00,000.' },
            { text: 'Revenue function R(x) = 2000x (constant price).' },
            { text: 'Marginal Cost MC = C\'(x) = 2x - 1199. Marginal Revenue MR = R\'(x) = 2000.' },
            { text: 'Set MC = MR for profit max: 2x - 1199 = 2000 → 2x = 3199 → x = 1599.5.' },
            { text: 'Second derivative test: C\'\'(x) = 2 > 0, R\'\'(x) = 0 → MC\' > MR\' satisfied.', faded: true, blankAnswer: '(a) C(x) = x² - 1199x + 14,99,000 for x > 1000; (b) MC = 2x.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_009', title: 'DERIVATIVE AS RATE OF CHANGE OF QUANTITIES',
          scaffold: { problem: 'A spherical balloon is being inflated such that its radius increases at a constant rate of 3 cm/s.',
            steps: [
            { text: 'Identify given and asked. Given: *dr/dt = 3 cm/s* (constant), *r = 10 cm* at the instant of interest.' },
            { text: 'Write formulas linking variables. Volume of sphere: *V = (4/3)πr³*. Surface area: *S = 4πr²*.' },
            { text: 'Apply chain rule w.r.t. time *t*. *dV/dt = dV/dr · dr/dt = 4πr² · dr/dt*. *dS/dt = dS/dr · dr/dt = 8πr · dr/dt*.' },
            { text: 'Substitute known values. *dr/dt = 3*, *r = 10*. *dV/dt = 4π(100)(3) = 1200π cm³/s*. *dS/dt = 8π(10)(3) = 240π cm²/s*.' },
            { text: 'Interpret with units. Volume increases at *1200π cm³/s* (≈ 3770 cm³/s).', faded: true, blankAnswer: '*dV/dt = 1200π cm³/s*, *dS/dt = 240π cm²/s* when *r = 10.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_010', title: 'RELATED RATES',
          scaffold: { problem: 'A spherical *laddoo* (sweet) is being coated with sugar syrup. The syrup forms a uniform spherical shell around the *laddoo*.',
            steps: [
            { text: 'Identify variables. Let $R$ = outer radius (variable), $r=2$ = inner radius (constant).' },
            { text: 'Identify Given and Target. Given: $\\frac{dV}{dt} = 12\\pi \\text{ cm}^3/\\text{s}$.' },
            { text: 'Differentiate constraint w.r.t time $t$. $\\frac{dV}{dt} = \\frac{4}{3}\\pi (3R^2 \\frac{dR}{dt} - 0) = 4\\pi R^2.' },
            { text: 'Substitute known values *after* differentiation. $12\\pi = 4\\pi (3)^2 \\frac{dR}{dt} \\implies 12\\pi = 36\\pi.' },
            { text: 'Solve and interpret. $\\frac{dR}{dt} = \\frac{12\\pi}{36\\pi} = \\frac{1}{3} \\text{ cm/s}$.', faded: true, blankAnswer: 'The outer radius is increasing at $1/3 \\text{ cm/s}$ when.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_03_008', title: 'COST AND REVENUE FUNCTION',
          caseStudy: { intro: 'Start with a relatable scenario: "You\'re organizing a Diwali mela stall selling handmade candles. The stall rent is ₹2,000 (fixed).',
            decisions: [{ prompt: 'What is the correct expression for the Marginal Cost function if the Total Cost function is C(x) = 5x² + 20x + 1000?', options: [
                { text: '**Correct Answer:** MC = C′(x) = 10x + 20', outcome: '**Correct Answer:** MC = C′(x) = 10x + 20. **Why wrong answers reveal misunderstanding:** If.' },
                { text: 'Average Cost = Marginal Cost', outcome: 'Not quite — **The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average.', reveals: 'the-average-cost-marginal-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You finished Differentiation Applications — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_03_007', difficulty: 'standard',
          question: 'If \\(y = f(x)\\) is a differentiable function, its second order derivative.',
          hint: 'If stuck, review the chain rule application in parametric differentiation (node 005).',
          misconception: '**Misconception:** "The second derivative is just the derivative of the derivative — a mechanical two-step process with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'If \\(y = f(x)\\) is a differentiable function, its second order derivative',
                  options: ['If \\(y = f(x)\\) is a differentiable function, its second order derivative', 'This node defines the **Learning Outcomes** for Chapter 3 (Differentiation Applications):', 'A concept map is a visual organizational tool that illustrates the relationships between', 'Standard results of differentiation are the fundamental derivative formulas for'],
                  hint: 'If stuck, review the chain rule application in parametric differentiation (node 005).',
                  misconception: '**Misconception:** "The second derivative is just the derivative of the derivative — a mechanical two-step process with no meaning beyond.' }
          ],
            remediations: { 'misconception-the-second-derivative-is': { steps: ['**Revisit the meaning of first derivative:** Go back to node `c12_app_cbse_03_009` (Derivative as Rate of Change).', '\\(x\\)" in context (velocity, marginal cost, slope).', '**Build the iterative concept:** Use a table: \\(f(x)\\) = position → \\(f\'(x)\\) = velocity (rate of change of position) →.', 'Ask: "What does each step measure?" 3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The second derivative is just the derivative of the derivative — a mechanical two-step process with.',
          parts: [
                { id: 'a', prompt: 'Create a real-world scenario (Indian context) where the third derivative (jerk) matters, and explain what \\(f\'\'\'(x) > 0\\) would mean in that scenario.', answer: 'Scenario: A metro train\'s position \\(s(t)\\) along a track',
                  options: ['Scenario: A metro train\'s position \\(s(t)\\) along a track', 'rate of change of acceleration'],
                  hint: 'If stuck, review the chain rule application in parametric differentiation (node 005).',
                  misconception: '**Misconception:** "The second derivative is just the derivative of the derivative — a mechanical two-step process with no meaning beyond.' }
          ],
            remediations: { 'misconception-the-second-derivative-is': { steps: ['**Revisit the meaning of first derivative:** Go back to node `c12_app_cbse_03_009` (Derivative as Rate of Change).', '\\(x\\)" in context (velocity, marginal cost, slope).', '**Build the iterative concept:** Use a table: \\(f(x)\\) = position → \\(f\'(x)\\) = velocity (rate of change of position) →.', 'Ask: "What does each step measure?" 3.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_008', difficulty: 'standard',
          question: 'The **Cost Function** C(x) = V(x) + k gives the total cost of producing.',
          hint: 'If stuck on differentiation mechanics, review `c12_app_cbse_03_003` (standard results).',
          misconception: '**The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average Cost) instead of.',
          parts: [
                { id: 'a', prompt: 'What is the correct expression for the Marginal Cost function if the Total Cost function is C(x) = 5x² + 20x + 1000?', answer: '**Correct Answer:** MC = C′(x) = 10x + 20',
                  options: ['**Correct Answer:** MC = C′(x) = 10x + 20', 'Average Cost = Marginal Cost'],
                  hint: 'If stuck on differentiation mechanics, review `c12_app_cbse_03_003` (standard results) and.',
                  misconception: '**The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average Cost) instead of MC = C′(x).' },
                { id: 'b', prompt: 'A firm\'s revenue function is R(x) = 200x - 2x². A student claims: "Since revenue increases with x, the firm should produce as much as possible." Is this.', answer: '**Correct Answer:** The statement is **incorrect**',
                  options: ['**Correct Answer:** The statement is **incorrect**', 'revenue function', 'marginal revenue', 'Average Cost = Marginal Cost'],
                  hint: 'If stuck on differentiation mechanics, review `c12_app_cbse_03_003` (standard results) and.',
                  misconception: '**The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average Cost) instead of MC = C′(x).' },
                { id: 'c', prompt: 'The total cost of producing x units is C(x) = x³ - 12x² + 60x + 500. Find the output level at which Marginal Cost is minimum. Show all steps.', answer: '**Correct Answer:** x = 4 units',
                  options: ['**Correct Answer:** x = 4 units', 'Average Cost = Marginal Cost'],
                  hint: 'If stuck on differentiation mechanics, review `c12_app_cbse_03_003` (standard results) and.',
                  misconception: '**The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average Cost) instead of MC = C′(x).' },
                { id: 'd', prompt: 'A company has cost function C(x) = 0.5x² + 10x + 1000 and faces a demand function p = 100 - 0.5x.', answer: '**Correct Answer:** (a) Price-taker: p = 80 (constant)',
                  options: ['**Correct Answer:** (a) Price-taker: p = 80 (constant)', 'price effect', 'Average Cost = Marginal Cost'],
                  hint: 'If stuck on differentiation mechanics, review `c12_app_cbse_03_003` (standard results) and.',
                  misconception: '**The "Average Cost = Marginal Cost" Confusion:** Students repeatedly write MC = C(x)/x (Average Cost) instead of MC = C′(x).' }
          ],
            remediations: { 'the-average-cost-marginal-cost': { steps: ['**Step-by-step remediation:** 1.', '**Revisit derivative definition:** Go to node `c11_app_cbse_08_008` (Instantaneous rate of change and derivative).', 'Remind the student: *Marginal* means "derivative with respect to quantity" — it\'s the slope of the tangent to the C(x).', '**Graphical drill:** Plot C(x) = x² + 10x + 100.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_009', difficulty: 'standard',
          question: 'If *y = f(x)* is a differentiable function, the derivative *dy/dx* (or *f\'(x)*).',
          hint: 'If stuck on chain rule with time, review c11_app_cbse_08_009 (chain rule) and.',
          misconception: '**The "Derivative = Slope Only" Trap:** Students equate *dy/dx* solely with "slope of tangent" (from Class 11 tangent.',
          parts: [
                { id: 'a', prompt: 'A cube\'s side length *x* cm increases at 0.5 cm/s. A student writes: *dV/dt = 3x²*. Is this correct?', answer: '**Correct answer:** No, it is incorrect',
                  options: ['**Correct answer:** No, it is incorrect', '*dV/dt = 3x²* is correct, they are differentiating w'],
                  hint: 'If stuck on chain rule with time, review c11_app_cbse_08_009 (chain rule) and c12_app_cbse_03_005.',
                  misconception: '**The "Derivative = Slope Only" Trap:** Students equate *dy/dx* solely with "slope of tangent" (from Class 11 tangent chapter) and forget.' },
                { id: 'b', prompt: 'The total cost of producing *x* units is *C(x) = 0.01x³ - 0.5x² + 20x + 5000* (in ₹).', answer: '**Correct answer:** *MC = C\'(x) = 0.03x² - x + 20*',
                  options: ['**Correct answer:** *MC = C\'(x) = 0.03x² - x + 20*', 'Producing the 101st unit will cost approximately ₹220 more than the 100th unit', 'find minimum cost'],
                  hint: 'If stuck on chain rule with time, review c11_app_cbse_08_009 (chain rule) and c12_app_cbse_03_005.',
                  misconception: '**The "Derivative = Slope Only" Trap:** Students equate *dy/dx* solely with "slope of tangent" (from Class 11 tangent chapter) and forget.' }
          ],
            remediations: { 'the-derivative-slope-only-trap': { steps: ['**Revisit the limit definition**: Go to node c11_app_cbse_08_008 ("Instantaneous rate of change and derivative") and.', 'Compute average rates for Δx = 1, 0.1, 0.01 to see convergence.', '**Practice unit analysis**: Take 5 geometric formulas (circle area, sphere volume, cylinder volume, cone volume, cube.', 'For each, compute *dQ/dL* (Q = quantity, L = length) and write the units explicitly (e.g., *dA/dr = 2πr cm²/cm*).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_010', difficulty: 'standard',
          question: 'Related rates problems involve finding the rate of change of one quantity with.',
          hint: 'If stuck on "where does $dr/dt$ come from?", go back to c11_app_cbse_08_009 (Chain Rule).',
          misconception: '**Substituting "snapshot" values BEFORE differentiating.** Students see "when radius is 5 cm" and immediately write $V.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Related rates problems involve finding the rate of change of one quantity with respect to',
                  options: ['Related rates problems involve finding the rate of change of one quantity with respect to', 'This node defines the **Learning Outcomes** for Chapter 3 (Differentiation Applications):', 'A concept map is a visual organizational tool that illustrates the relationships between', 'Standard results of differentiation are the fundamental derivative formulas for'],
                  hint: 'If stuck on "where does $dr/dt$ come from?", go back to c11_app_cbse_08_009 (Chain Rule) and.',
                  misconception: '**Substituting "snapshot" values BEFORE differentiating.** Students see "when radius is 5 cm" and immediately write $V = \\frac{4}{3}\\pi.' }
          ],
            remediations: { 'substituting-snapshot-values-before-differentiat': { steps: ['**Revisit Chain Rule mechanics (c11_app_cbse_08_009):** Practice $\\frac{d}{dt}[f(g(t))] = f\'(g(t))g\'(t)$ with explicit.', '**Drill the "Differentiate First, Substitute Last" protocol:** Give 5 problems where the *only* task is to write the.', 'Use a highlighter: mark "Constants" (never differentiate) vs "Variables w.r.t t" (must get $d/dt$).', '**Diagnostic Re-test:** Use Diagnostic Question 3 (Cone problem) but change numbers.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
