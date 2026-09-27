import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch03_p1: SimDef = {
    id: 'v3_c12_app_ch03_p1',
    title: 'Differentiation Applications · Part 1/2',
    subtitle: 'This node covers **only the list of learning outcomes** (the "what") for Chapter 3.',
    classLevel: 12, subject: 'app', topic: 'Differentiation Applications · Part 1/2',
    chapters: ['c12_app_ch03'],
    nodeIds: ['c12_app_cbse_03_001', 'c12_app_cbse_03_002', 'c12_app_cbse_03_003', 'c12_app_cbse_03_004', 'c12_app_cbse_03_005', 'c12_app_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start by asking: *"You know how to differentiate x², sin x, eˣ — but can you use that skill to decide how.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain in your own words the difference between a **critical point** and a **stationary point**.',
        options: ['A **stationary point** is where f\'(x) = 0 (tangent horizontal)', 'they are the same', 'maxima/minima of |x|'],
        answer: 'A **stationary point** is where f\'(x) = 0 (tangent horizontal)',
        hook: '**"Derivative = Slope = Rate of Change = Marginal Cost = Marginal Revenue — they\'re all the same thing, just different.',
    },
    teaching: [
        { title: 'LEARNING OUTCOMES', text: 'This node defines the **Learning Outcomes** for Chapter 3 (Differentiation Applications): the specific competencies a Class 12 Applied Mathematics student must demonstrate, including differentiating.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_app_cbse_03_002', title: 'CONCEPT MAP',
          caseStudy: { intro: 'Imagine you\'re designing a tiffin service and want to maximize profit: you know cost increases with more meals, but demand drops if you charge too much.',
            decisions: [{ prompt: 'What does the derivative dy/dx represent in the context of a function y = f(x)?', options: [
                { text: 'The derivative dy/dx represents the instantaneous rate of change of y with respect to x,', outcome: 'The derivative dy/dx represents the instantaneous rate of change of y with respect to x, or the.' },
                { text: 'dy/dx is the total change in y over change in x', outcome: 'Not quite — Students often believe that if f\'(x) = 0 at a point, then that point must be a local maximum.', reveals: 'if-f-x-0-at' },
                { text: 'if f\'(x) = 0 at a point, then that point must be a local maximum or minimum', outcome: 'Not quite — Students often believe that if f\'(x) = 0 at a point, then that point must be a local maximum.', reveals: 'if-f-x-0-at' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_003', title: 'RECALL SOME STANDARD RESULTS OF DIFFERENTIATION',
          scaffold: { problem: 'A company\'s total cost function is C(x) = 2x^3 - 15x^2 + 100x + 5000 (₹), where x is units produced.',
            steps: [
            { text: 'Identify that marginal cost is the derivative of total cost: MC(x) = C\'(x) = dC/dx.' },
            { text: 'Apply sum/difference rule to differentiate term-by-term: d/dx(2x^3) - d/dx(15x^2) + d/dx(100x) + d/dx(5000).' },
            { text: 'Apply constant multiple + power rule to each polynomial term: 2·3x^2 - 15·2x + 100·1 + 0 = 6x^2 - 30x + 100.' },
            { text: 'Evaluate at x = 10: MC(10) = 6(100) - 30(10) + 100 = 600 - 300 + 100 = 400.' },
            { text: 'Interpret: Producing the 11th unit (after 10 units) will cost approximately ₹400 additional.', faded: true, blankAnswer: 'MC(x) = 6x^2 - 30x + 100; MC(10) = ₹400/unit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_004', title: 'DIFFERENTIATION OF IMPLICIT FUNCTIONS',
          scaffold: { problem: 'Find the slope of the tangent to the curve x³ + y³ = 6xy at the point (3, 3). This curve (folium of Descartes) appears in JEE Advanced 2019.',
            steps: [
            { text: 'Differentiate both sides with respect to x. d/dx(x³) = 3x². d/dx(y³) = 3y²·dy/dx (chain rule).' },
            { text: 'Write the differentiated equation: 3x² + 3y²·dy/dx = 6x·dy/dx + 6y.' },
            { text: 'Collect all dy/dx terms on one side: 3y²·dy/dx - 6x·dy/dx = 6y - 3x².' },
            { text: 'Factor out dy/dx: dy/dx(3y² - 6x) = 6y - 3x².' },
            { text: 'Solve for dy/dx: dy/dx = (6y - 3x²) / (3y² - 6x) = (2y - x²) / (y² - 2x).' },
            { text: 'Substitute (3, 3): dy/dx = (6 - 9) / (9 - 6) = (-3)/3 = -1.', faded: true, blankAnswer: 'The slope of the tangent at (3, 3) is -1. Equation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_005', title: 'DIFFERENTIATION OF PARAMETRIC FUNCTIONS',
          scaffold: { problem: 'A drone\'s position is given by x = 3t² + 2t, y = 2t³ - 4t (meters, t in seconds). Find the slope of its trajectory at t = 2 s.',
            steps: [
            { text: 'Identify x(t) = 3t² + 2t, y(t) = 2t³ - 4t. Need dy/dx at t=2 and t where dy/dx = 0.' },
            { text: 'Compute dx/dt = d/dt(3t² + 2t) = 6t + 2. Compute dy/dt = d/dt(2t³ - 4t) = 6t² - 4.' },
            { text: 'Apply parametric formula: dy/dx = (dy/dt)/(dx/dt) = (6t² - 4)/(6t + 2), provided 6t+2 ≠ 0.' },
            { text: 'At t=2: dx/dt = 14, dy/dt = 20 → dy/dx = 20/14 = 10/7. For horizontal flight, dy/dx = 0 ⇒ 6t² - 4 = 0 ⇒ t² = 2/3 ⇒.' },
            { text: 'Verify dx/dt ≠ 0 at t = √(2/3): 6√(2/3)+2 > 0. Valid.', faded: true, blankAnswer: 'Slope at t=2 is 10/7. Drone flies horizontally at.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_03_006', title: 'LOGARITHMIC DIFFERENTIATION',
          scaffold: { problem: 'A bacterial culture grows such that its population at time $t$ hours is modeled by $P(t) = t^{t/2}$ for $t > 0$.',
            steps: [
            { text: 'Identify that $P(t) = t^{t/2}$ has variable base ($t$) and variable exponent ($t/2$) — standard power/exponential rules.' },
            { text: 'Take natural log of both sides: $\\ln P = \\frac{t}{2} \\ln t$.' },
            { text: 'Differentiate implicitly w.r.t $t$: $\\frac{1}{P} \\frac{dP}{dt} = \\frac{1}{2} \\ln t + \\frac{t}{2} \\cdot \\frac{1}{t}.' },
            { text: 'Solve for $dP/dt$: $\\frac{dP}{dt} = P \\cdot \\frac{1}{2} (\\ln t + 1) = t^{t/2} \\cdot \\frac{1}{2} (\\ln t + 1)$.' },
            { text: 'Evaluate at $t = 4$: $P(4) = 4^{4/2} = 4^2 = 16$; $\\frac{dP}{dt}\\big|_{t=4} = 16 \\cdot \\frac{1}{2} (\\ln 4 + 1) = 8 (\\ln.', faded: true, blankAnswer: '$\\frac{dP}{dt}\\big|_{t=4} = 8(\\ln 4 + 1) \\approx 19.09$.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Differentiation Applications like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Differentiation Applications · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Differentiation Applications · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_03_001', difficulty: 'standard',
          question: 'This node defines the **Learning Outcomes** for Chapter 3 (Differentiation.',
          hint: 'If you cannot explain *why* d/dx(x²) = 2x represents a rate of change, revisit.',
          misconception: '**"Derivative = Slope = Rate of Change = Marginal Cost = Marginal Revenue — they\'re all the same thing, just different.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the difference between a **critical point** and a **stationary point**.', answer: 'A **stationary point** is where f\'(x) = 0 (tangent horizontal)',
                  options: ['A **stationary point** is where f\'(x) = 0 (tangent horizontal)', 'they are the same', 'maxima/minima of |x|'],
                  hint: 'If you cannot explain *why* d/dx(x²) = 2x represents a rate of change, revisit c11_app_cbse_08_008.',
                  misconception: '**"Derivative = Slope = Rate of Change = Marginal Cost = Marginal Revenue — they\'re all the same thing, just different names."** Students.' }
          ],
            remediations: { 'derivative-slope-rate-of-change': { steps: ['**Re-read the NCERT Learning Outcomes box (3.0)** and manually sort the 16 bullets into the 5 clusters used in the.', 'For each cluster, **write one 2-line scenario** where that specific outcome is the *only* tool that works (e.g.', 'Take **Diagnostic Questions 1–5** again, but this time **write the units** for every derivative (e.g., MC in ₹/unit.', 'If stuck on any, revisit **c11_app_cbse_08_008** (Instantaneous rate of change and derivative) and.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_002', difficulty: 'standard',
          question: 'A concept map is a visual organizational tool that illustrates the.',
          hint: 'Review the geometric interpretation of the derivative as slope of tangent and its.',
          misconception: 'Students often believe that if f\'(x) = 0 at a point, then that point must be a local maximum or minimum.',
          parts: [
                { id: 'a', prompt: 'The cost function for producing x units is C(x) = x³ – 6x² + 9x + 100. Find the output level at which the marginal cost is minimum.', answer: 'Step 1: Marginal cost MC(x) = C\'(x) = 3x² – 12x + 9',
                  options: ['Step 1: Marginal cost MC(x) = C\'(x) = 3x² – 12x + 9', 'Set C\'(x) = 0 → 3x² – 12x + 9 = 0 → x=1 or 3', 'if f\'(x) = 0 at a point, then that point must be a local maximum or minimum'],
                  hint: 'Review the geometric interpretation of the derivative as slope of tangent and its physical meaning.',
                  misconception: 'Students often believe that if f\'(x) = 0 at a point, then that point must be a local maximum or minimum.' }
          ],
            remediations: { 'if-f-x-0-at': { steps: ['To fix this, explicitly test the sign of f\'(x) just left and right of the critical point using test values.', 'For f(x) = x³ at x=0: pick x = –0.1 → f\'(–0.1) = 3(0.01) = 0.03 > 0; x = 0.1 → f\'(0.1) = 0.03 > 0.', 'Since f\'(x) > 0 on both sides, the function is increasing before and after—so no extremum, only an inflection point.', 'Emphasize: "Zero derivative means flat tangent, but not necessarily a peak or valley—it could be a saddle point." Have.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if f\'(x) = 0 at a point, then that point must be a local maximum or minimum.',
          parts: [
                { id: 'a', prompt: 'A student claims that if a function has a critical point where f\'(x) = 0 and f\'\'(x) > 0, then it must be the absolute minimum of the function on its entire.', answer: 'The claim is false',
                  options: ['The claim is false', 'if f\'(x) = 0 at a point, then that point must be a local maximum or minimum'],
                  hint: 'Review the geometric interpretation of the derivative as slope of tangent and its physical meaning.',
                  misconception: 'Students often believe that if f\'(x) = 0 at a point, then that point must be a local maximum or minimum.' }
          ],
            remediations: { 'if-f-x-0-at': { steps: ['To fix this, explicitly test the sign of f\'(x) just left and right of the critical point using test values.', 'For f(x) = x³ at x=0: pick x = –0.1 → f\'(–0.1) = 3(0.01) = 0.03 > 0; x = 0.1 → f\'(0.1) = 0.03 > 0.', 'Since f\'(x) > 0 on both sides, the function is increasing before and after—so no extremum, only an inflection point.', 'Emphasize: "Zero derivative means flat tangent, but not necessarily a peak or valley—it could be a saddle point." Have.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_003', difficulty: 'standard',
          question: 'Standard results of differentiation are the fundamental derivative formulas for.',
          hint: 'Review Class 11 node c11_app_cbse_08_009 (Derivatives of algebraic functions using chain.',
          misconception: 'Students treat the chain rule as optional or only for "obvious" compositions like sin(x^2).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the derivative of e^x is e^x, but the derivative of 5^x is 5^x ln 5. What is the fundamental difference between the bases e and 5?', answer: 'The derivative of a^x is a^x ln a',
                  options: ['The derivative of a^x is a^x ln a', 'both are the same', 'derivative of 5^x is 5^x'],
                  hint: 'Review Class 11 node c11_app_cbse_08_009 (Derivatives of algebraic functions using chain rule).',
                  misconception: 'Students treat the chain rule as optional or only for "obvious" compositions like sin(x^2).' }
          ],
            remediations: { 'students-treat-the-chain-rule': { steps: ['Have the student write the 5 standard formulas and 4 rules from memory on a blank sheet.', 'Give 10 mixed functions (e.g., x^3 log x, e^x/x^2, 5 sin x - 3 cos x) and ask them to ONLY label which rule(s) apply.', 'Once labeling is 100% accurate, do 5 full differentiations daily with a timer, checking each step against the rule.', 'Re-attempt Diagnostic Questions 3-5. Mastery = zero errors in 2 consecutive attempts.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_004', difficulty: 'standard',
          question: 'Implicit differentiation is the process of finding the derivative dy/dx of.',
          hint: 'Review c11_app_cbse_08_009 (chain rule) and practice differentiating y², y³, sin y, ln.',
          misconception: 'Students treat \'y\' as a constant when differentiating terms like xy² or sin(y), writing d/dx(xy²) = y² instead of y².',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Implicit differentiation is the process of finding the derivative dy/dx of a function',
                  options: ['Implicit differentiation is the process of finding the derivative dy/dx of a function', 'This node defines the **Learning Outcomes** for Chapter 3 (Differentiation Applications):', 'A concept map is a visual organizational tool that illustrates the relationships between', 'Standard results of differentiation are the fundamental derivative formulas for'],
                  hint: 'Review c11_app_cbse_08_009 (chain rule) and practice differentiating y², y³, sin y, ln y, e^y with.',
                  misconception: 'Students treat \'y\' as a constant when differentiating terms like xy² or sin(y), writing d/dx(xy²) = y² instead of y² + 2xy·dy/dx.' }
          ],
            remediations: { 'students-treat-y-as-a': { steps: ['Revisit chain rule: d/dx[g(y)] = g\'(y)·dy/dx.', 'Practice with g(y) = y², y³, sin y, ln y, e^y.', 'Do 5 problems differentiating ONLY y-terms: d/dx(y²), d/dx(y³), d/dx(sin y), d/dx(ln y), d/dx(e^y) — insist on writing.', 'Return to product rule with mixed terms: d/dx(x·y), d/dx(x²·y³), d/dx(x·sin y).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_005', difficulty: 'standard',
          question: 'If x and y are expressed as functions of a third variable t (called the.',
          hint: 'Review chain rule from c11_app_cbse_08_009 and practice differentiating composite.',
          misconception: 'Students treat dy/dx = (dy/dt)/(dx/dt) as a mere algebraic cancellation of dt, ignoring that it requires dx/dt ≠ 0 and.',
          parts: [
                { id: 'a', prompt: 'State the formula for dy/dx when x = f(t) and y = g(t), and state the necessary condition for it to be valid.', answer: 'dy/dx = (dy/dt) / (dx/dt), provided dx/dt ≠ 0',
                  options: ['dy/dx = (dy/dt) / (dx/dt), provided dx/dt ≠ 0', 'dy/dx = dy/dt × dx/dt'],
                  hint: 'Review chain rule from c11_app_cbse_08_009 and practice differentiating composite functions like.',
                  misconception: 'Students treat dy/dx = (dy/dt)/(dx/dt) as a mere algebraic cancellation of dt, ignoring that it requires dx/dt ≠ 0 and that t must be.' }
          ],
            remediations: { 'students-treat-dy-dx-dy': { steps: ['Revisit c12_app_cbse_03_003 (standard derivatives) and c12_app_cbse_03_004 (implicit differentiation) to reinforce.', 'Practice the "three-step method": (a) compute dx/dt and dy/dt separately, (b) divide dy/dt by dx/dt, (c) state the.', 'For second derivatives, drill the formula d²y/dx² = [d/dt(dy/dx)] / (dx/dt) with 5+ examples until it becomes automatic.', 'Re-diagnostic: Give x = t³ - 3t, y = t² - 4; find points with vertical/horizontal tangents and compute d²y/dx² at t=1.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_03_006', difficulty: 'standard',
          question: 'Logarithmic differentiation is a technique used to differentiate functions.',
          hint: 'If stuck, review **c11_app_cbse_01_008** (Logarithm Laws) for simplification step, and.',
          misconception: '**Misconception:** "Logarithmic differentiation is just \'taking log and differentiating\' — I can apply it to $y = x^2.',
          parts: [
                { id: 'a', prompt: 'State the exact condition on a function $y = f(x)$ that makes logarithmic differentiation necessary (as opposed to standard power rule or exponential rule).', answer: 'Logarithmic differentiation is necessary when the function is of the form $y =',
                  options: ['Logarithmic differentiation is necessary when the function is of the form $y =', 'when there is an $x$ in the exponent'],
                  hint: 'If stuck, review **c11_app_cbse_01_008** (Logarithm Laws) for simplification step, and.',
                  misconception: '**Misconception:** "Logarithmic differentiation is just \'taking log and differentiating\' — I can apply it to $y = x^2 + 3x$ and get the.' },
                { id: 'b', prompt: 'Compare the derivatives of $y_1 = x^5$, $y_2 = 5^x$, and $y_3 = x^x$. Explain why $y_3$ requires logarithmic differentiation while $y_1$ and $y_2$ do not.', answer: '$y_1 = x^5$ has constant exponent $\\to$ power rule: $5x^4$',
                  options: ['$y_1 = x^5$ has constant exponent $\\to$ power rule: $5x^4$', 'all three need log diff'],
                  hint: 'If stuck, review **c11_app_cbse_01_008** (Logarithm Laws) for simplification step, and.',
                  misconception: '**Misconception:** "Logarithmic differentiation is just \'taking log and differentiating\' — I can apply it to $y = x^2 + 3x$ and get the.' }
          ],
            remediations: { 'misconception-logarithmic-differentiation-is-jus': { steps: ['If a student applies logarithmic differentiation to $y = x^2 + 3x$ or forgets to multiply by $y$ at the end: 1.', '**Diagnose:** Ask "Did $\\ln y$ become a sum/difference of simpler terms?" If no $\\to$ wrong tool.', 'If yes but final answer missing $y \\to$ algebraic isolation error.', '**Remediate:** Revisit **c11_app_cbse_01_008** (Laws of Logarithms) — practice expanding $\\ln(x^x)$.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
