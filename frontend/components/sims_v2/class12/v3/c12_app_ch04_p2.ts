import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch04_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch04_p2: SimDef = {
    id: 'v3_c12_app_ch04_p2',
    title: 'Integration Applications · Part 2/2',
    subtitle: 'This node covers the 8 standard properties of definite integrals (P1–P8) as listed.',
    classLevel: 12, subject: 'app', topic: 'Integration Applications · Part 2/2',
    chapters: ['c12_app_ch04'],
    nodeIds: ['c12_app_cbse_04_007', 'c12_app_cbse_04_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'You\'re given $\\int_0^\\pi \\frac{x \\sin x}{1+\\cos^2 x} dx$. Direct integration looks impossible — the $x$.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'State Property 4 (King\'s Property) of definite integrals in your own words, including the substitution used and the condition on limits.',
        options: ['**Correct Answer:** Property 4 states $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$', 'midpoint symmetry', 'y-axis symmetry'],
        answer: '**Correct Answer:** Property 4 states $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$',
        hook: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x).',
    },
    teaching: [
        { title: 'Some Properties of Definite Integrals', text: 'Properties of definite integrals are algebraic and geometric rules that allow simplification of $\\int_a^b f(x) dx$ without finding the antiderivative explicitly, including independence of dummy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_007', title: 'Some Properties of Definite Integrals',
          scaffold: { problem: 'Evaluate $I = \\int_0^\\pi \\frac{x}{1+\\sin x} dx$ using properties of definite integrals.',
            steps: [
            { text: 'Identify the structure — limits $[0, \\pi]$, numerator $x$, denominator $1+\\sin x$.' },
            { text: 'Apply P4: $I = \\int_0^\\pi \\frac{\\pi-x}{1+\\sin(\\pi-x)} dx = \\int_0^\\pi \\frac{\\pi-x}{1+\\sin x} dx$.' },
            { text: 'Add the original and transformed integrals: $2I = \\int_0^\\pi \\frac{x + \\pi - x}{1+\\sin x} dx = \\pi \\int_0^\\pi.' },
            { text: 'Simplify the remaining integral: $\\int_0^\\pi \\frac{1}{1+\\sin x} dx$.' },
            { text: 'Evaluate: $[\\tan x - \\sec x]_0^\\pi = (\\tan \\pi - \\sec \\pi) - (\\tan 0 - \\sec 0) = (0 - (-1)) - (0 - 1) = 1 + 1 = 2$.' },
            { text: 'Thus $2I = \\pi \\cdot 2 = 2\\pi \\Rightarrow I = \\pi$.', faded: true, blankAnswer: '$\\pi$' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_04_008', title: 'CONSUMERS’ SURPLUS AND PRODUCERS’ SURPLUS',
          scaffold: { problem: 'The demand function for a commodity in a Delhi wholesale market is p = 100 − 2x (₹/kg) and the supply function is p = 20 + 3x (₹/kg), where.',
            steps: [
            { text: 'Find equilibrium by setting demand = supply: 100 − 2x = 20 + 3x → 5x = 80 → x₀ = 16 quintals.' },
            { text: 'Find equilibrium price: p₀ = 100 − 2(16) = 100 − 32 = ₹68/kg (or p₀ = 20 + 3(16) = 20 + 48 = ₹68/kg — verify both give.' },
            { text: 'Set up Consumer Surplus integral: CS = ∫₀¹⁶ (100 − 2x) dx − p₀x₀ = ∫₀¹⁶ (100 − 2x) dx − 68×16.' },
            { text: 'Evaluate: ∫₀¹⁶ (100 − 2x) dx = [100x − x²]₀¹⁶ = (1600 − 256) − 0 = 1344. p₀x₀ = 68×16 = 1088. CS = 1344 − 1088 = ₹256.' },
            { text: 'Set up Producer Surplus integral: PS = p₀x₀ − ∫₀¹⁶ (20 + 3x) dx = 1088 − ∫₀¹⁶ (20 + 3x) dx.' },
            { text: 'Evaluate: ∫₀¹⁶ (20 + 3x) dx = [20x + 1.5x²]₀¹⁶ = (320 + 384) − 0 = 704. PS = 1088 − 704 = ₹384.' },
            { text: 'Interpret: Consumers gain ₹256 total surplus; producers gain ₹384 total surplus at this equilibrium.', faded: true, blankAnswer: 'Equilibrium: x₀ = 16 quintals, p₀ = ₹68/kg. Consumer.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_04_007', title: 'Some Properties of Definite Integrals',
          caseStudy: { intro: 'You\'re given $\\int_0^\\pi \\frac{x \\sin x}{1+\\cos^2 x} dx$. Direct integration looks impossible — the $x$ in the numerator ruins standard substitutions.',
            decisions: [{ prompt: 'State Property 4 (King\'s Property) of definite integrals in your own words, including the substitution used and the condition on limits.', options: [
                { text: '**Correct Answer:** Property 4 states $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$', outcome: '**Correct Answer:** Property 4 states $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$.' },
                { text: 'midpoint symmetry', outcome: 'Not quite — **The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$.', reveals: 'the-blind-symmetry-error-students' },
                { text: 'y-axis symmetry', outcome: 'Not quite — **The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$.', reveals: 'the-blind-symmetry-error-students' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_04_008', title: 'You made it',
          caseStudy: { intro: 'You finished Integration Applications — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_04_007', difficulty: 'standard',
          question: 'Properties of definite integrals are algebraic and geometric rules that allow.',
          hint: 'If stuck on property proofs, review FTC (c12_app_cbse_04_006) and practice.',
          misconception: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x).',
          parts: [
                { id: 'a', prompt: 'State Property 4 (King\'s Property) of definite integrals in your own words, including the substitution used and the condition on limits.', answer: '**Correct Answer:** Property 4 states $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$',
                  options: ['**Correct Answer:** Property 4 states $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$', 'midpoint symmetry', 'y-axis symmetry'],
                  hint: 'If stuck on property proofs, review FTC (c12_app_cbse_04_006) and practice differentiating.',
                  misconception: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x) = \\pm f(x)$ but.' },
                { id: 'b', prompt: 'Evaluate $\\int_0^4 |x-2| dx$ using Property 3 (additivity). Show the split point and both sub-integrals.', answer: '**Correct Answer:** $|x-2|$ changes definition at $x=2$',
                  options: ['**Correct Answer:** $|x-2|$ changes definition at $x=2$', 'midpoint symmetry', 'y-axis symmetry'],
                  hint: 'If stuck on property proofs, review FTC (c12_app_cbse_04_006) and practice differentiating.',
                  misconception: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x) = \\pm f(x)$ but.' },
                { id: 'c', prompt: 'Compare the use of Property 4 (King\'s) and Property 5 (Reflection) for $\\int_0^\\pi x f(\\sin x) dx$. When would you choose one over the other?', answer: '**Correct Answer:** P4 uses $x \\to a+b-x = \\pi - x$',
                  options: ['**Correct Answer:** P4 uses $x \\to a+b-x = \\pi - x$', 'simpler', 'midpoint symmetry', 'y-axis symmetry'],
                  hint: 'If stuck on property proofs, review FTC (c12_app_cbse_04_006) and practice differentiating.',
                  misconception: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x) = \\pm f(x)$ but.' }
          ],
            remediations: { 'the-blind-symmetry-error-students': { steps: ['**Revisit the geometric meaning:** Draw $y=f(x)$ on $[-a,a]$ for odd $f$ — shade area left (negative) and right.', 'Show they cancel *only* if limits are symmetric.', '**Drill limit-checking:** Give 5 integrals (e.g., $\\int_{-2}^3 x^3 dx$, $\\int_0^4 (x-2)^3 dx$, $\\int_1^3 (x-2)^3 dx$).', 'Yes/No" and *why* (limits symmetric?'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x).',
          parts: [
                { id: 'a', prompt: 'A student claims: "For any continuous $f$, $\\int_0^{2a} f(x) dx = 2\\int_0^a f(x) dx$." Is this true?', answer: '**Correct Answer:** **False.** Counterexample: $f(x)=x$, $a=1$',
                  options: ['**Correct Answer:** **False.** Counterexample: $f(x)=x$, $a=1$', 'symmetry about y-axis', 'symmetry about $x=a$', 'midpoint symmetry'],
                  hint: 'If stuck on property proofs, review FTC (c12_app_cbse_04_006) and practice differentiating.',
                  misconception: '**The "Blind Symmetry" Error:** Students apply Property 8 (even/odd) to $\\int_{-a}^a f(x) dx$ by checking only $f(-x) = \\pm f(x)$ but.' }
          ],
            remediations: { 'the-blind-symmetry-error-students': { steps: ['**Revisit the geometric meaning:** Draw $y=f(x)$ on $[-a,a]$ for odd $f$ — shade area left (negative) and right.', 'Show they cancel *only* if limits are symmetric.', '**Drill limit-checking:** Give 5 integrals (e.g., $\\int_{-2}^3 x^3 dx$, $\\int_0^4 (x-2)^3 dx$, $\\int_1^3 (x-2)^3 dx$).', 'Yes/No" and *why* (limits symmetric?'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_04_008', difficulty: 'standard',
          question: 'Consumer Surplus (CS) is the difference between the total amount consumers are.',
          hint: 'If stuck, revisit c12_app_cbse_04_006 (definite integral evaluation) and.',
          misconception: 'Students consistently confuse the **variable of integration** and the **limits of integration**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Consumer Surplus (CS) is the difference between the total amount consumers are willing to',
                  options: ['Consumer Surplus (CS) is the difference between the total amount consumers are willing to', 'Integration is the inverse process of differentiation: if the derivative of F(x) is f(x),', 'Integration is the inverse process of differentiation', 'Integration by substitution is a technique used to evaluate integrals by changing the'],
                  hint: 'If stuck, revisit c12_app_cbse_04_006 (definite integral evaluation) and c11_app_cbse_12_001.',
                  misconception: 'Students consistently confuse the **variable of integration** and the **limits of integration**.' }
          ],
            remediations: { 'students-consistently-confuse-the-variable': { steps: ['If a student makes the variable/limit error: (1) Have them re-draw the axes: "Which variable is on the x-axis?', 'So the limits are quantities: 0 to x₀." (2) Write the integral as ∫ p dx and ask: "What is p in terms of x?', 'Substitute that." (3) Make them solve p₀ = f(x₀) for x₀ *before* setting up the integral.', '(4) Give a drill: 5 problems where they only set up the integral (don\'t evaluate) — check limits and differential.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
