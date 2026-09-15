import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch13_p1: SimDef = {
    id: 'v3_c11_math_ch13_p1',
    title: 'Limits and Derivatives · Part 1/2',
    subtitle: 'Learn that 0/0 is a question, not an answer.',
    classLevel: 11, subject: 'mathematics', topic: 'Limits and Derivatives · Part 1/2',
    chapters: ['c11_math_ch13'],
    nodeIds: ['c11_math_cbse_13_001', 'c11_math_cbse_13_002', 'c11_math_cbse_13_003', 'c11_math_cbse_13_004', 'c11_math_cbse_13_005', 'c11_math_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst finding what a function approaches, not what it says', intro: 'The speedometer reads 60 until the booth — the value AT the booth doesn\'t decide what speed the car was tending to.', goal: 'Evaluate limits via factorisation and recognise indeterminate forms and one-sided disagreement.' },
    discovery: {
        question: 'What is the speed of a car at the *instant* the photo is taken? Not average — instant.',
        options: ['A limit — speed as the time gap shrinks to zero', 'Distance divided by exposure time', 'The speedometer reading', 'Zero — it was still'],
        answer: 'A limit — speed as the time gap shrinks to zero',
        hook: 'Calculus was invented to answer this exact question. The limit is the trick that makes \'instant\' mathematically real.',
    },
    teaching: [
        { title: 'Intuitive Idea of Limits', text: 'The limit of a function f(x) as x approaches a value \'a\' is the value L that f(x) gets arbitrarily close to as x gets arbitrarily close to a (from both sides), without necessarily equalling a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_13_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Build a two-sided table for |x|/x at 0 to prove the limit fails, then evaluate (x³−1)/(x²−1) by cancelling the common factor.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_13_001', title: 'Intuitive Idea of Limits',
          caseStudy: { intro: 'Imagine you\'re tracking a car approaching a toll booth at exactly 60 km/h.',
            decisions: [{ prompt: 'What is the value of lim_{x→3} (x² - 9)/(x - 3)? Choose the correct statement: (A) The limit is 0 because the numerator is 0 at x=3.', options: [
                { text: 'Correct answer: (B) The limit is 6', outcome: 'Correct answer: (B) The limit is 6 because for x ≠ 3, (x² - 9)/(x - 3) = (x-3)(x+3)/(x-3) = x+3.' },
                { text: 'The limit doesn\'t exist', outcome: 'Not quite — Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals.', reveals: 'if-direct-substitution-gives-0' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_002', title: 'Limits: Algebraic Methods of Evaluation',
          scaffold: { problem: 'A particle\'s displacement is given by s(t) = t³ − 6t² + 9t metres.',
            steps: [
            { text: 'Compute s(2) = 2³ − 6(2)² + 9(2) = 8 − 24 + 18 = 2 metres.' },
            { text: 'Compute s(2+h) = (2+h)³ − 6(2+h)² + 9(2+h). Expand: (8 + 12h + 6h² + h³) − 6(4 + 4h + h²) + 18 + 9h = 8 + 12h + 6h².' },
            { text: 'Form the difference quotient: [s(2+h)−s(2)]/h = [2 − 3h + h³ − 2]/h = (−3h + h³)/h.' },
            { text: 'Simplify for h≠0: −3 + h².' },
            { text: 'Take limit as h→0: limₕ→₀ (−3 + h²) = −3 m/s.', faded: true, blankAnswer: '−3 m/s (negative indicates motion in opposite direction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_003', title: 'Limits of Trigonometric Functions',
          scaffold: { problem: 'Evaluate \\(\\lim_{x \\to 0} \\frac{\\sin 5x}{\\tan 3x}\\).',
            steps: [
            { text: 'Identify the standard limits needed: \\(\\lim_{x\\to0}\\frac{\\sin 5x}{5x}=1\\) and \\(\\lim_{x\\to0}\\frac{\\tan 3x}{3x}=1\\).' },
            { text: 'Rewrite the expression by multiplying and dividing by appropriate coefficients: \\(\\frac{\\sin 5x}{\\tan 3x} = \\frac{\\sin.' },
            { text: 'Apply the standard limits: \\(\\lim_{x\\to0}\\frac{\\sin 5x}{5x}=1\\), \\(\\lim_{x\\to0}\\frac{3x}{\\tan 3x}=1\\).' },
            { text: 'Compute the limit: \\(1 \\times 1 \\times \\frac{5}{3} = \\frac{5}{3}\\).' },
            { text: 'Verify: As \\(x\\to0\\), \\(\\sin 5x \\sim 5x\\), \\(\\tan 3x \\sim 3x\\), so ratio \\(\\sim \\frac{5x}{3x}=\\frac{5}{3}\\).', faded: true, blankAnswer: '\\(\\frac{5}{3}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_004', title: 'Limits of Polynomial and Rational Functions',
          scaffold: { problem: 'The position of a particle (in metres) at time \\(t\\) seconds is given by \\(s(t) = t^3 - 6t^2 + 9t\\).',
            steps: [
            { text: 'Write the difference quotient for \\(t = 2\\): \\(v = \\lim_{h \\to 0} \\frac{s(2+h) - s(2)}{h}\\).' },
            { text: 'Compute \\(s(2+h) = (2+h)^3 - 6(2+h)^2 + 9(2+h) = (8 + 12h + 6h^2 + h^3) - 6(4 + 4h + h^2) + 18 + 9h = 8 + 12h + 6h^2.' },
            { text: 'Compute \\(s(2) = 2^3 - 6(2)^2 + 9(2) = 8 - 24 + 18 = 2\\).' },
            { text: 'Form the numerator: \\(s(2+h) - s(2) = (2 - 3h + h^3) - 2 = -3h + h^3 = h(-3 + h^2)\\).' },
            { text: 'Write the limit: \\(v = \\lim_{h \\to 0} \\frac{h(-3 + h^2)}{h} = \\lim_{h \\to 0} (-3 + h^2) = -3\\).' },
            { text: 'Interpret: The instantaneous velocity at \\(t = 2\\) s is \\(-3\\) m/s (negative means moving backward).', faded: true, blankAnswer: '\\(-3\\) m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_005', title: 'Limits at Infinity',
          scaffold: { problem: 'The concentration of a pollutant in a lake t days after a spill is given by C(t) = (150t + 200) / (t² + 10t + 100) ppm.',
            steps: [
            { text: 'Identify the function type — rational function with numerator degree 1 (150t) and denominator degree 2 (t²).' },
            { text: 'Apply degree comparison rule: since denominator degree (2) > numerator degree (1), lim_{t→∞} C(t) = 0.' },
            { text: 'Verify algebraically by dividing numerator and denominator by highest power t²:' },
            { text: 'Take limit as t→∞: each term with t in denominator → 0, so limit = (0 + 0) / (1 + 0 + 0) = 0.' },
            { text: 'Interpret: The pollutant concentration approaches 0 ppm in the long run — the lake naturally cleanses itself over time.', faded: true, blankAnswer: '0 ppm. The lake eventually returns to zero pollutant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_006', title: 'Derivatives: Intuitive Idea',
          scaffold: { problem: 'A stone is dropped from the top of Qutub Minar (height 73 m). Its height above ground after t seconds is h(t) = 73 - 4.9t² metres (using.',
            steps: [
            { text: 'Identify the function and point: h(t) = 73 - 4.9t², find h\'(2) = lim_{Δt→0} [h(2+Δt) - h(2)]/Δt' },
            { text: 'Compute h(2) = 73 - 4.9(4) = 73 - 19.6 = 53.4 m' },
            { text: 'Compute h(2+Δt) = 73 - 4.9(2+Δt)² = 73 - 4.9(4 + 4Δt + Δt²) = 73 - 19.6 - 19.6Δt - 4.9Δt² = 53.4 - 19.6Δt - 4.9Δt²' },
            { text: 'Form the difference quotient: [h(2+Δt) - h(2)]/Δt = [53.4 - 19.6Δt - 4.9Δt² - 53.4]/Δt = (-19.6Δt - 4.9Δt²)/Δt = -19.6.' },
            { text: 'Take the limit as Δt → 0: h\'(2) = lim_{Δt→0} (-19.6 - 4.9Δt) = -19.6' },
            { text: 'Interpret: The negative sign indicates downward direction. Velocity = -19.6 m/s (19.6 m/s downwards)', faded: true, blankAnswer: '-19.6 m/s (downward velocity of 19.6 m/s at t = 2 s)' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_13_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Evaluating limₓ→₂ (x² − 4)/(x − 2), a student writes 0/0 = 0 \'since undefined means zero\', then says the limit can\'t exist anyway \'because f(2) doesn\'t exist.\' For (x³ − 8)/(x² − 4) he applies the standard limit to the numerator and gets 12.',
            decisions: [{ prompt: 'What do limits actually mean here?', options: [
                { text: 'Treat 0/0 as a signal, not a value: it means \'more work needed\' — factor (x−2)(x+2)/(x−2) → x+2 → 4. The function being undefined AT 2 is irrelevant: the limit is the value approached near 2 from both sides. And the standard limit (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ needs the exact (x−a) denominator — for (x²−4) you factor both or use the (n/m)a^{n−m} form, giving 12/4 = 3.', outcome: 'He stops fearing undefined points: limits live in the approach, indeterminate forms are work orders, and standard formulas carry exact shape requirements.' },
                { text: 'Keep 0/0 = 0 — a zero numerator gives a zero result.', outcome: '0/0 is indeterminate — it carries no value until algebra resolves it; here the cancelled factor reveals the answer is 4.', reveals: 'zero-over-zero-is-zero' },
                { text: 'Accept 12 — the numerator matched the standard form, so the formula applies.', outcome: 'The formula\'s denominator must be exactly (x − a); with (x² − 4) the denominator also has a limit to resolve — the full result is 12/4 = 3.', reveals: 'standard-limit-misapplied' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Limits, slopes, derivatives — the moment Newton cracked the code of change, you just walked through.',
            decisions: [{ prompt: 'What comes next? Limits and Derivatives · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Limits and Derivatives · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_13_001', difficulty: 'standard',
          question: 'The limit of a function f(x) as x approaches a value \'a\' is the value L that.',
          hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008.',
          misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value.',
          parts: [
                { id: 'a', prompt: 'What is the value of lim_{x→3} (x² - 9)/(x - 3)? Choose the correct statement: (A) The limit is 0 because the numerator is 0 at x=3.', answer: 'Correct answer: (B) The limit is 6',
                  options: ['Correct answer: (B) The limit is 6', 'The limit doesn\'t exist'],
                  hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' },
                { id: 'b', prompt: 'Consider f(x) = { x² if x < 2; 5 if x = 2; x+2 if x > 2 }. A student claims "lim_{x→2} f(x) does not exist because f(2) = 5, not 4." Explain why this reasoning.', answer: 'The student incorrectly equates the function value at the point with the limit',
                  options: ['The student incorrectly equates the function value at the point with the limit', 'The limit doesn\'t exist', 'limit = function value, a fundamental misconception'],
                  hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' },
                { id: 'c', prompt: 'Evaluate lim_{x→0} (|x|/x) by constructing a table of values for x = -0.1, -0.01, -0.001, 0.001, 0.01, 0.1. What do you conclude about the limit?', answer: 'For x < 0: |x|/x = -x/x = -1',
                  options: ['For x < 0: |x|/x = -x/x = -1', 'The limit doesn\'t exist'],
                  hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' }
          ],
            remediations: { 'if-direct-substitution-gives-0': { steps: ['Show the student a table of values for (x²-4)/(x-2) at x = 1.9, 1.99, 1.999, 2.001, 2.01, 2.1.', 'Contrast with f(2) — point out the function has a "hole" at x=2 but the trend is clear.', 'Demonstrate factorisation: (x-2)(x+2)/(x-2) = x+2 for x≠2.', 'Emphasise the rule: "0/0 means STOP — do not evaluate. Simplify first, then substitute."'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value.',
          parts: [
                { id: 'a', prompt: 'A student evaluates lim_{x→2} (x² - 4)/(x - 2) by direct substitution: (4 - 4)/(2 - 2) = 0/0 = 0. Identify the error and explain the correct approach.', answer: 'The error is treating 0/0 as 0',
                  options: ['The error is treating 0/0 as 0', 'The limit doesn\'t exist'],
                  hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' },
                { id: 'b', prompt: 'Create a piecewise function f(x) such that: (a) lim_{x→1} f(x) exists, (b) f(1) is defined but f(1) ≠ lim_{x→1} f(x), and (c) f(x) is not continuous at x=1.', answer: 'Example: f(x) = { x² if x ≠ 1',
                  options: ['Example: f(x) = { x² if x ≠ 1', 'The limit doesn\'t exist'],
                  hint: 'If stuck, revisit Class 10 factorisation of polynomials (c10_math_cbse_02_008.',
                  misconception: 'Students believe that if direct substitution gives 0/0, the limit is 0, or that the limit equals the function value at the point.' }
          ],
            remediations: { 'if-direct-substitution-gives-0': { steps: ['Show the student a table of values for (x²-4)/(x-2) at x = 1.9, 1.99, 1.999, 2.001, 2.01, 2.1.', 'Contrast with f(2) — point out the function has a "hole" at x=2 but the trend is clear.', 'Demonstrate factorisation: (x-2)(x+2)/(x-2) = x+2 for x≠2.', 'Emphasise the rule: "0/0 means STOP — do not evaluate. Simplify first, then substitute."'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_002', difficulty: 'standard',
          question: 'Algebraic methods of evaluating limits involve manipulating an algebraic.',
          hint: 'If stuck on factorization, revisit Class 9 Algebraic Identities (c9_math_ch4_7.',
          misconception: 'Students incorrectly apply the standard limit limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ when the expression is NOT in that exact.',
          parts: [
                { id: 'a', prompt: 'What is the value of limₓ→₂ (x²−4)/(x−2)? Show the algebraic step that resolves the indeterminate form.', answer: 'The limit equals 4',
                  options: ['The limit equals 4', 'undefined'],
                  hint: 'If stuck on factorization, revisit Class 9 Algebraic Identities (c9_math_ch4_7, c9_math_ch4_8) and.',
                  misconception: 'Students incorrectly apply the standard limit limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ when the expression is NOT in that exact form.' },
                { id: 'b', prompt: 'Evaluate: limₓ→₁ (x³−1)/(x²−1). Show all factorization steps.', answer: 'Direct substitution: 0/0',
                  options: ['Direct substitution: 0/0', 'does not exist'],
                  hint: 'If stuck on factorization, revisit Class 9 Algebraic Identities (c9_math_ch4_7, c9_math_ch4_8) and.',
                  misconception: 'Students incorrectly apply the standard limit limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ when the expression is NOT in that exact form.' }
          ],
            remediations: { 'students-incorrectly-apply-the-standard': { steps: ['Write the standard limit formula prominently: limₓ→ₐ (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹. Circle the denominator (x−a).', 'Give the counterexample limₓ→₂ (x³−8)/(x²−4). Ask: "Is the denominator (x−2)?" No, it\'s (x²−4).', 'Show two correct methods: (a) Factor both: (x−2)(x²+2x+4)/[(x−2)(x+2)] → (4+4+4)/4 = 3.', 'Practice 5 problems where denominator is NOT (x−a) to build the habit of checking the form first.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_003', difficulty: 'standard',
          question: 'The limits of trigonometric functions as the variable approaches zero are.',
          hint: 'If stuck, review algebraic limits (c11_math_cbse_13_002) and trigonometric identities.',
          misconception: 'Students frequently treat \\(\\frac{\\sin(kx)}{x}\\) as directly equal to 1 (ignoring the coefficient \\(k\\)), writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The limits of trigonometric functions as the variable approaches zero are evaluated using',
                  options: ['The limits of trigonometric functions as the variable approaches zero are evaluated using', 'The limit of a function f(x) as x approaches a value \'a\' is the value L that f(x) gets', 'Algebraic methods of evaluating limits involve manipulating an algebraic expression f(x)', 'The limit of a polynomial function \\(p(x)\\) as \\(x\\) approaches \\(a\\) is simply \\(p(a)\\),'],
                  hint: 'If stuck, review algebraic limits (c11_math_cbse_13_002) and trigonometric identities.',
                  misconception: 'Students frequently treat \\(\\frac{\\sin(kx)}{x}\\) as directly equal to 1 (ignoring the coefficient \\(k\\)), writing \\(\\lim_{x\\to0}\\frac{\\sin.' }
          ],
            remediations: { 'students-frequently-treat-frac-sin': { steps: ['**Coefficient mismatch:** Make the student write the standard limit \\(\\frac{\\sin x}{x}=1\\) on a card.', 'For any \\(\\frac{\\sin(kx)}{x}\\), insist they explicitly write: "Multiply and divide by \\(k\\): \\(k\\frac{\\sin(kx)}{kx}\\)".', 'Practice 5 problems where only the coefficient changes.', '**\\(1-\\cos x\\) confusion:** Have them derive \\(1-\\cos x = 2\\sin^2\\frac{x}{2}\\) from \\(\\cos 2\\theta = 1-2\\sin^2\\theta\\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_004', difficulty: 'standard',
          question: 'The limit of a polynomial function \\(p(x)\\) as \\(x\\) approaches \\(a\\) is simply.',
          hint: 'If stuck, revisit Class 9 factorisation (c9_math_ch4_7, c9_math_ch4_8) and Class 10.',
          misconception: 'Students cancel \\((x-a)\\) factors **before** confirming that both numerator and denominator are zero at \\(x = a\\).',
          parts: [
                { id: 'a', prompt: 'Why can we evaluate \\(\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}\\) by cancelling \\((x-2)\\) even though the original function is undefined at \\(x = 2\\)?', answer: 'The limit depends on values of \\(x\\) *near* 2, not *at* 2',
                  options: ['The limit depends on values of \\(x\\) *near* 2, not *at* 2', 'the limit doesn\'t exist'],
                  hint: 'If stuck, revisit Class 9 factorisation (c9_math_ch4_7, c9_math_ch4_8) and Class 10 polynomial.',
                  misconception: 'Students cancel \\((x-a)\\) factors **before** confirming that both numerator and denominator are zero at \\(x = a\\).' },
                { id: 'b', prompt: 'Evaluate \\(\\lim_{x \\to -1} \\frac{x^3 + 1}{x + 1}\\).', answer: 'Direct substitution gives \\(\\frac{0}{0}\\)',
                  options: ['Direct substitution gives \\(\\frac{0}{0}\\)', 'does not exist'],
                  hint: 'If stuck, revisit Class 9 factorisation (c9_math_ch4_7, c9_math_ch4_8) and Class 10 polynomial.',
                  misconception: 'Students cancel \\((x-a)\\) factors **before** confirming that both numerator and denominator are zero at \\(x = a\\).' }
          ],
            remediations: { 'students-cancel-x-a-factors': { steps: ['If a student cancels without verifying 0/0: (1) Make them always write "Direct substitution gives ___" as Step 1.', '(2) If the result is a number (including 0), STOP — that\'s the limit.', '(3) Only if it\'s 0/0 or ∞/∞, proceed to factorise.', '(4) Practice with mixed sets where some limits are determinate and some are 0/0, forcing the decision step.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_005', difficulty: 'standard',
          question: 'The limit of a function f(x) as x approaches infinity (or negative infinity).',
          hint: 'If stuck, revisit c11_math_cbse_13_004 (Limits of Polynomial and Rational Functions) and.',
          misconception: 'Students treat ∞ as a number and perform arithmetic like ∞/∞ = 1 or ∞ - ∞ = 0.',
          parts: [
                { id: 'a', prompt: 'State the formal definition of lim_{x→∞} f(x) = L using ε and M. What does M represent geometrically?', answer: 'For every ε > 0, there exists M > 0 such that |f(x) - L| < ε whenever x > M',
                  options: ['For every ε > 0, there exists M > 0 such that |f(x) - L| < ε whenever x > M', 'largeness'],
                  hint: 'If stuck, revisit c11_math_cbse_13_004 (Limits of Polynomial and Rational Functions) and practice.',
                  misconception: 'Students treat ∞ as a number and perform arithmetic like ∞/∞ = 1 or ∞ - ∞ = 0.' },
                { id: 'b', prompt: 'Explain why lim_{x→∞} sin(x) does not exist, but lim_{x→∞} (sin x)/x = 0. What property of sin x makes the first limit fail?', answer: 'sin x oscillates between -1 and 1 forever, never settling near a single value L',
                  options: ['sin x oscillates between -1 and 1 forever, never settling near a single value L', 'sin x has no limit', 'sin x is bounded'],
                  hint: 'If stuck, revisit c11_math_cbse_13_004 (Limits of Polynomial and Rational Functions) and practice.',
                  misconception: 'Students treat ∞ as a number and perform arithmetic like ∞/∞ = 1 or ∞ - ∞ = 0.' },
                { id: 'c', prompt: 'Evaluate: lim_{x→∞} (3x² - 5x + 2) / (2x² + 7x - 4). Show all steps including the algebraic manipulation.', answer: 'Step 1: Identify highest power in denominator: x²',
                  options: ['Step 1: Identify highest power in denominator: x²', 'cancelling x²', 'degrees are equal so it goes to infinity'],
                  hint: 'If stuck, revisit c11_math_cbse_13_004 (Limits of Polynomial and Rational Functions) and practice.',
                  misconception: 'Students treat ∞ as a number and perform arithmetic like ∞/∞ = 1 or ∞ - ∞ = 0.' }
          ],
            remediations: { 'students-treat-as-a-number': { steps: ['If student writes ∞/∞ = 1 or cancels ∞ terms: Have them compute (2x+1)/(3x-5) for x = 10, 100, 1000, 10000 in a table.', 'Show the values approach 2/3 ≈ 0.6667, not 1.', 'Then demonstrate the algebraic step: divide numerator and denominator by x: (2 + 1/x)/(3 - 5/x).', 'Ask: "What happens to 1/x and 5/x as x grows?" They must say "approach 0".'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_006', difficulty: 'standard',
          question: 'The derivative of a function f(x) at a point x = a represents the instantaneous.',
          hint: 'Review c11_math_cbse_13_001 (intuitive limits) and c11_math_cbse_13_004 (algebraic limit.',
          misconception: 'Students believe the derivative f\'(a) is simply the slope of the line connecting (a, f(a)) and (a+h, f(a+h)) for.',
          parts: [
                { id: 'a', prompt: 'What is the difference quotient for the function f(x) = x² at x = 3 with h = 0.1? Write the expression without evaluating.', answer: 'The difference quotient is [f(3+0.1) - f(3)]/0.1 = [(3.1)² - 3²]/0.1',
                  options: ['The difference quotient is [f(3+0.1) - f(3)]/0.1 = [(3.1)² - 3²]/0.1', 'very small'],
                  hint: 'Review c11_math_cbse_13_001 (intuitive limits) and c11_math_cbse_13_004 (algebraic limit.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line connecting (a, f(a)) and (a+h, f(a+h)) for a "very small" h (like.' },
                { id: 'b', prompt: 'Explain why the slope of the secant line between (2, f(2)) and (2+h, f(2+h)) approaches the slope of the tangent line at x = 2 as h → 0.', answer: 'As h → 0, the point (2+h, f(2+h)) slides along the curve toward (2, f(2))',
                  options: ['As h → 0, the point (2+h, f(2+h)) slides along the curve toward (2, f(2))', 'the secant becomes the tangent', 'very small'],
                  hint: 'Review c11_math_cbse_13_001 (intuitive limits) and c11_math_cbse_13_004 (algebraic limit.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line connecting (a, f(a)) and (a+h, f(a+h)) for a "very small" h (like.' },
                { id: 'c', prompt: 'Given the graph of f(x) = x³, the slope of the tangent at x = 1 is 3.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'very small'],
                  hint: 'Review c11_math_cbse_13_001 (intuitive limits) and c11_math_cbse_13_004 (algebraic limit.',
                  misconception: 'Students believe the derivative f\'(a) is simply the slope of the line connecting (a, f(a)) and (a+h, f(a+h)) for a "very small" h (like.' }
          ],
            remediations: { 'the-derivative-f-a-is': { steps: ['If a student exhibits this misconception: (1) Have them compute [f(2+h)-f(2)]/h for f(x)=x² with h=0.1, 0.01, 0.001.', '(2) Ask: "What number is this sequence approaching?" (3) Show algebraically: [f(2+h)-f(2)]/h = [(2+h)²-4]/h.', '(4) Emphasize: "The derivative is the LIMIT 4, not any approximation 4+h.', 'The h in 4+h is the error - it vanishes ONLY in the limit h→0." (5) Contrast: numerical methods give approximations.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
