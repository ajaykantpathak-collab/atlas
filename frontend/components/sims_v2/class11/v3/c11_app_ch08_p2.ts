import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch08_p2: SimDef = {
    id: 'v3_c11_app_ch08_p2',
    title: 'Calculus · Part 2/2',
    subtitle: 'This node covers the definition of continuity at a point using limits (LHL, RHL), types.',
    classLevel: 11, subject: 'app', topic: 'Calculus · Part 2/2',
    chapters: ['c11_app_ch08'],
    nodeIds: ['c11_app_cbse_08_007', 'c11_app_cbse_08_008', 'c11_app_cbse_08_009', 'c11_app_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Imagine you are designing a roller coaster track — the track must be perfectly smooth at the joints so the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A Class 11 student argues: "If a function is continuous at x = a, it must be differentiable at x = a.',
        options: ['The claim is FALSE', 'smoothness', 'connectedness'],
        answer: 'The claim is FALSE',
        hook: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like.',
    },
    teaching: [
        { title: 'Continuity of a function:', text: 'A function $f(x)$ is said to be continuous at a point $x = a$ if and only if three conditions hold simultaneously: (1) $f(a)$ exists (is a finite real number), (2) $\\lim_{x \\to a} f(x)$ exists (is.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_007', title: 'Continuity of a function:',
          scaffold: { problem: 'A water tank\'s volume (in liters) as a function of time $t$ (in minutes) is modeled by:',
            steps: [
            { text: 'Identify the point of interest: $t = 3$. We need to check if $V(t)$ is continuous there.' },
            { text: 'Compute $V(3)$ from the definition: $V(3) = 15$ (given explicitly).' },
            { text: 'Compute LHL as $t \\to 3^-$: use the first piece $t^2 + 2t$. $\\lim_{t \\to 3^-} (t^2 + 2t) = 3^2 + 2(3) = 9 + 6 = 15$.' },
            { text: 'Compute RHL as $t \\to 3^+$: use the third piece $5t + 5$. $\\lim_{t \\to 3^+} (5t + 5) = 5(3) + 5 = 15 + 5 = 20$.' },
            { text: 'Compare: LHL = 15, RHL = 20, $V(3) = 15$. Since LHL $\\neq$ RHL, the limit $\\lim_{t \\to 3} V(t)$ does not exist.' },
            { text: 'Physical interpretation: At exactly $t=3$ min, the volume is 15 L.', faded: true, blankAnswer: '$V(t)$ is **not continuous** at $t=3$; it has a **jump.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_008', title: 'Instantaneous rate of change and derivative:',
          scaffold: { problem: 'A stone is dropped from the top of the Qutub Minar (height ≈ 73 m).',
            steps: [
            { text: 'Identify the function h(t) = 73 - 5t² and the instant t = 2. We need h\'(2) = limₕ→₀ [h(2+h) - h(2)]/h.' },
            { text: 'Compute h(2) = 73 - 5(4) = 53 m. Compute h(2+h) = 73 - 5(2+h)² = 73 - 5(4 + 4h + h²) = 73 - 20 - 20h - 5h² = 53 - 20h.' },
            { text: 'Form the difference quotient: [h(2+h) - h(2)]/h = [(53 - 20h - 5h²) - 53]/h = (-20h - 5h²)/h = -20 - 5h.' },
            { text: 'Take the limit as h → 0: limₕ→₀ (-20 - 5h) = -20.' },
            { text: 'Interpret: The instantaneous velocity at t = 2 s is -20 m/s. The negative sign indicates downward direction (since.', faded: true, blankAnswer: '-20 m/s (20 m/s downward)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_009', title: 'Derivatives of algebraic functions using chain rule :',
          scaffold: { problem: 'The volume $V$ (in cm³) of a spherical air bubble rising in a lake is related to its radius $r$ (in cm) by $V = \\frac{4}{3}\\pi r^3$.',
            steps: [
            { text: 'Identify the composite structure. Volume $V$ is a function of radius $r$: $V(r) = \\frac{4}{3}\\pi r^3$.' },
            { text: 'Apply the Chain Rule: $\\frac{dV}{dt} = \\frac{dV}{dr} \\cdot \\frac{dr}{dt}$.' },
            { text: 'Differentiate the outer function $V(r)$ with respect to $r$: $\\frac{dV}{dr} = \\frac{4}{3}\\pi \\cdot 3r^2 = 4\\pi r^2$.' },
            { text: 'Differentiate the inner function $r(t)$ with respect to $t$: $\\frac{dr}{dt} = 0.5 \\cdot \\frac{1}{2}(t+4)^{-1/2} \\cdot 1.' },
            { text: 'Evaluate at $t=12$: $r(12) = 0.5\\sqrt{16} = 0.5 \\times 4 = 2$ cm.' },
            { text: 'Compute $\\frac{dV}{dt} = 4\\pi (2)^2 \\cdot \\frac{1}{16} = 16\\pi \\cdot \\frac{1}{16} = \\pi$ cm³/s.', faded: true, blankAnswer: 'The rate of change of volume at $t = 12$ s is $\\pi$ cm³/s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_08_010', title: 'Tangent line and equation of tangent :',
          scaffold: { problem: 'A company\'s profit (in lakhs of rupees) from selling x hundred units of a product is given by P(x) = -2x³ + 15x² - 24x + 10.',
            steps: [
            { text: 'Identify the function P(x) = -2x³ + 15x² - 24x + 10 and the point of tangency x = a = 3.' },
            { text: 'Compute the derivative P\'(x) using power rule and sum/difference rule: P\'(x) = -6x² + 30x - 24.' },
            { text: 'Evaluate the slope at x = 3: m = P\'(3) = -6(9) + 30(3) - 24 = -54 + 90 - 24 = 12.' },
            { text: 'Find the profit at x = 3: P(3) = -2(27) + 15(9) - 24(3) + 10 = -54 + 135 - 72 + 10 = 19. Point is (3, 19).' },
            { text: 'Write tangent equation using point-slope form: y - 19 = 12(x - 3) → y = 12x - 36 + 19 → y = 12x - 17.', faded: true, blankAnswer: 'Tangent line equation: y = 12x - 17 (where y is profit.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_08_009', title: 'Derivatives of algebraic functions using chain rule :',
          caseStudy: { intro: 'Suppose you are designing a water tank where the volume $V$ depends on the radius $r$ as $V = \\frac{4}{3}\\pi r^3$, but the radius itself expands with time $t$.',
            decisions: [{ prompt: 'State the Chain Rule formula for the derivative of a composite function $y = f(g(x))$ using prime notation, and explain in one sentence.', options: [
                { text: 'The Chain Rule formula is $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$', outcome: 'The Chain Rule formula is $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$.' },
                { text: 'function inside a function', outcome: 'Not quite — Students often believe the Chain Rule is only needed when they see an explicit "function inside.', reveals: 'the-chain-rule-is-only' },
                { text: 'the derivative of a composite is just the product of derivatives at $x$', outcome: 'Not quite — Students often believe the Chain Rule is only needed when they see an explicit "function inside.', reveals: 'the-chain-rule-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You finished Calculus — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_08_007', difficulty: 'standard',
          question: 'A function $f(x)$ is said to be continuous at a point $x = a$ if and only.',
          hint: 'If stuck, review **one-sided limits** and **algebra of limits** from node.',
          misconception: '**"If the limit exists, the function is continuous."** Students often compute $\\lim_{x \\to a} f(x)$ and find a finite.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A function $f(x)$ is said to be continuous at a point $x = a$ if and only if three',
                  options: ['A function $f(x)$ is said to be continuous at a point $x = a$ if and only if three', 'Calculus is the branch of mathematics that studies continuous change through two', 'A function $f$ from a set $A$ (domain) to a set $B$ (co-domain) is a rule that assigns to', 'Graphical representation of a function is the visual depiction of the set of all ordered'],
                  hint: 'If stuck, review **one-sided limits** and **algebra of limits** from node c11_app_cbse_08_006.',
                  misconception: '**"If the limit exists, the function is continuous."** Students often compute $\\lim_{x \\to a} f(x)$ and find a finite value $L$, then.' }
          ],
            remediations: { 'if-the-limit-exists': { steps: ['**Revisit the definition physically:** Draw a coordinate plane, plot a point $(a, f(a))$, then draw a "hole" at $(a.', 'Ask: "Can you trace the graph without lifting your pen?" No — because the hole and the point are separate.', '**Drill the 3-condition checklist:** For every problem, force the student to write: - Condition 1: $f(a) = \\text{?}$.', 'LHL=RHL?) - Condition 3: Are they equal?'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_008', difficulty: 'standard',
          question: 'The instantaneous rate of change of a function y = f(x) at x = a is the limit.',
          hint: 'Review limit evaluation techniques (factorization of aⁿ-bⁿ, rationalization of square.',
          misconception: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like.',
          parts: [
                { id: 'a', prompt: 'What is the mathematical definition of the derivative of a function f(x) at x = a using the first principle?', answer: 'The derivative f\'(a) = limₕ→₀ [f(a+h) - f(a)]/h, provided the limit exists',
                  options: ['The derivative f\'(a) = limₕ→₀ [f(a+h) - f(a)]/h, provided the limit exists', 'nearby'],
                  hint: 'Review limit evaluation techniques (factorization of aⁿ-bⁿ, rationalization of square roots) from.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like (a+0.001, f(a+0.001)).' },
                { id: 'b', prompt: 'The volume of a spherical balloon being inflated is given by V(r) = (4/3)πr³, where r is the radius in cm.', answer: 'Step 1: f(r) = (4/3)πr³',
                  options: ['Step 1: f(r) = (4/3)πr³', 'nearby'],
                  hint: 'Review limit evaluation techniques (factorization of aⁿ-bⁿ, rationalization of square roots) from.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like (a+0.001, f(a+0.001)).' },
                { id: 'c', prompt: 'Compare the derivative of f(x) = x² at x = 2 and x = -2. Are they equal? Explain using both the algebraic definition and the geometric interpretation.', answer: 'Algebraically: f\'(2) = limₕ→₀ [(2+h)²-4]/h = limₕ→₀ (4+4h+h²-4)/h = 4',
                  options: ['Algebraically: f\'(2) = limₕ→₀ [(2+h)²-4]/h = limₕ→₀ (4+4h+h²-4)/h = 4', 'nearby'],
                  hint: 'Review limit evaluation techniques (factorization of aⁿ-bⁿ, rationalization of square roots) from.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like (a+0.001, f(a+0.001)).' }
          ],
            remediations: { 'the-derivative-f-a-is': { steps: ['Have the student compute [f(2+h)-f(2)]/h for f(x)=x² symbolically (keeping h as a variable) to get 4+h.', 'Ask: "What happens to this expression as h gets smaller? Can h ever be exactly 0 in the expression (4+h)?"', 'Show numerically: h=0.1 → 4.1; h=0.01 → 4.01; h=0.001 → 4.001 — the pattern approaches 4 but never equals it for any.', 'Emphasize: the derivative is the *target* these approximations approach, not any approximation itself.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student argues: "If a function is continuous at x = a, it must be differentiable at x = a.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'smoothness', 'connectedness', 'nearby'],
                  hint: 'Review limit evaluation techniques (factorization of aⁿ-bⁿ, rationalization of square roots) from.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line joining (a, f(a)) and a "nearby" point like (a+0.001, f(a+0.001)).' }
          ],
            remediations: { 'the-derivative-f-a-is': { steps: ['Have the student compute [f(2+h)-f(2)]/h for f(x)=x² symbolically (keeping h as a variable) to get 4+h.', 'Ask: "What happens to this expression as h gets smaller? Can h ever be exactly 0 in the expression (4+h)?"', 'Show numerically: h=0.1 → 4.1; h=0.01 → 4.01; h=0.001 → 4.001 — the pattern approaches 4 but never equals it for any.', 'Emphasize: the derivative is the *target* these approximations approach, not any approximation itself.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_009', difficulty: 'standard',
          question: 'The Chain Rule states that if a function $y = f(u)$ is differentiable at $u.',
          hint: 'Review the power rule for derivatives ($\\frac{d}{dx}x^n = nx^{n-1}$) including negative.',
          misconception: 'Students often believe the Chain Rule is only needed when they see an explicit "function inside a function" like.',
          parts: [
                { id: 'a', prompt: 'State the Chain Rule formula for the derivative of a composite function $y = f(g(x))$ using prime notation, and explain in one sentence what $f\'(g(x))$.', answer: 'The Chain Rule formula is $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$',
                  options: ['The Chain Rule formula is $\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)$', 'function inside a function', 'the derivative of a composite is just the product of derivatives at $x$'],
                  hint: 'Review the power rule for derivatives ($\\frac{d}{dx}x^n = nx^{n-1}$) including negative and.',
                  misconception: 'Students often believe the Chain Rule is only needed when they see an explicit "function inside a function" like $(3x+1)^5$, but they fail.' },
                { id: 'b', prompt: 'A student differentiates $y = (3x^2 - 5)^4$ and writes $\\frac{dy}{dx} = 4(3x^2 - 5)^3$. Is this correct?', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'function inside a function'],
                  hint: 'Review the power rule for derivatives ($\\frac{d}{dx}x^n = nx^{n-1}$) including negative and.',
                  misconception: 'Students often believe the Chain Rule is only needed when they see an explicit "function inside a function" like $(3x+1)^5$, but they fail.' },
                { id: 'c', prompt: 'Differentiate $y = \\sqrt{2x^3 + 7x - 1}$ with respect to $x$ using the Chain Rule. Show all steps clearly.', answer: 'Step 1: Rewrite $y = (2x^3 + 7x - 1)^{1/2}$',
                  options: ['Step 1: Rewrite $y = (2x^3 + 7x - 1)^{1/2}$', 'function inside a function'],
                  hint: 'Review the power rule for derivatives ($\\frac{d}{dx}x^n = nx^{n-1}$) including negative and.',
                  misconception: 'Students often believe the Chain Rule is only needed when they see an explicit "function inside a function" like $(3x+1)^5$, but they fail.' },
                { id: 'd', prompt: 'Compare the derivatives of $y_1 = (x^2 + 1)^3$ and $y_2 = x^6 + 3x^4 + 3x^2 + 1$. Are they equal?', answer: 'Yes, they are equal',
                  options: ['Yes, they are equal', 'they are different', 'function inside a function'],
                  hint: 'Review the power rule for derivatives ($\\frac{d}{dx}x^n = nx^{n-1}$) including negative and.',
                  misconception: 'Students often believe the Chain Rule is only needed when they see an explicit "function inside a function" like $(3x+1)^5$, but they fail.' }
          ],
            remediations: { 'the-chain-rule-is-only': { steps: ['Have the student explicitly write $u = \\text{inner expression}$ and $y = \\text{outer function in } u$ for every.', 'Make them compute $\\frac{dy}{du}$ and $\\frac{du}{dx}$ *separately* on paper before multiplying.', 'Use a "checklist" sticky note: □ Identify $u$ □ Find $dy/du$ □ Find $du/dx$ □ Multiply □ Substitute back $u$ □ Simplify.', 'Give 5 problems where the inner derivative is a constant (e.g., $(5x-2)^3$), then 5 where it is non-constant (e.g.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_08_010', difficulty: 'standard',
          question: 'The tangent line to the curve y = f(x) at the point (a, f(a)) is the straight.',
          hint: 'Review differentiation rules (power rule, chain rule) from c11_app_cbse_08_009 and the.',
          misconception: 'Students believe the tangent line equation is y = f\'(x) * x + f(a) — they plug the derivative *function* (not the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tangent line to the curve y = f(x) at the point (a, f(a)) is the straight line that',
                  options: ['The tangent line to the curve y = f(x) at the point (a, f(a)) is the straight line that', 'Calculus is the branch of mathematics that studies continuous change through two', 'A function $f$ from a set $A$ (domain) to a set $B$ (co-domain) is a rule that assigns to', 'Graphical representation of a function is the visual depiction of the set of all ordered'],
                  hint: 'Review differentiation rules (power rule, chain rule) from c11_app_cbse_08_009 and the geometric.',
                  misconception: 'Students believe the tangent line equation is y = f\'(x) * x + f(a) — they plug the derivative *function* (not the evaluated slope) into.' }
          ],
            remediations: { 'the-tangent-line-equation-is': { steps: ['Have the student verbally distinguish: "f\'(x) is a *function* that outputs slopes.', 'f\'(a) is a *number* — the slope at x=a." 2.', 'Use a color-coded template: write f(x) in blue, f\'(x) in red, f(a) in green, f\'(a) in orange.', 'Practice with a simple function (e.g., f(x)=x²) at multiple points (x=1,2,3) — make a table: x | f(x) | f\'(x) | f(a) |.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
