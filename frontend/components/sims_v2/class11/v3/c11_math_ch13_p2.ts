import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch13_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch13_p2: SimDef = {
    id: 'v3_c11_math_ch13_p2',
    title: 'Limits and Derivatives · Part 2/2',
    subtitle: 'Learn that 0/0 is a question, not an answer.',
    classLevel: 11, subject: 'mathematics', topic: 'Limits and Derivatives · Part 2/2',
    chapters: ['c11_math_ch13'],
    nodeIds: ['c11_math_cbse_13_007', 'c11_math_cbse_13_008', 'c11_math_cbse_13_009', 'c11_math_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst finding what a function approaches, not what it says', intro: 'The speedometer reads 60 until the booth — the value AT the booth doesn\'t decide what speed the car was tending to.', goal: 'Evaluate limits via factorisation and recognise indeterminate forms and one-sided disagreement.' },
    discovery: {
        question: 'What is the speed of a car at the *instant* the photo is taken? Not average — instant.',
        options: ['A limit — speed as the time gap shrinks to zero', 'Distance divided by exposure time', 'The speedometer reading', 'Zero — it was still'],
        answer: 'A limit — speed as the time gap shrinks to zero',
        hook: 'Calculus was invented to answer this exact question. The limit is the trick that makes \'instant\' mathematically real.',
    },
    teaching: [
        { title: 'Derivative of Polynomial Functions', text: 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} + ...', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_13_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Build a two-sided table for |x|/x at 0 to prove the limit fails, then evaluate (x³−1)/(x²−1) by cancelling the common factor.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_007', title: 'Derivative of Polynomial Functions',
          scaffold: { problem: 'A particle moves along a straight line such that its displacement s (in metres) from a fixed point O at time t (in seconds) is given.',
            steps: [
            { text: 'Identify the given polynomial function s(t) = 4t^3 - 15t^2 + 12t + 7.' },
            { text: 'Differentiate s(t) term by term using the power rule d/dt(t^n) = n t^{n-1} and constant multiple rule: d/dt(4t^3).' },
            { text: 'Combine to get velocity function: v(t) = s\'(t) = 12t^2 - 30t + 12.' },
            { text: 'Differentiate v(t) to get acceleration function: a(t) = v\'(t) = d/dt(12t^2) - d/dt(30t) + d/dt(12) = 24t - 30.' },
            { text: 'Evaluate at t = 2: v(2) = 12(2)^2 - 30(2) + 12 = 48 - 60 + 12 = 0 m/s. a(2) = 24(2) - 30 = 48 - 30 = 18 m/s².' },
            { text: 'Interpret: At t = 2 s, the particle is momentarily at rest (velocity zero) but accelerating at 18 m/s², meaning it.', faded: true, blankAnswer: 'Velocity at t = 2 s is 0 m/s; acceleration at t = 2 s is 18.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_008', title: 'Derivative Using First Principle',
          scaffold: { problem: 'Find the derivative of f(x) = 2x^3 - 4x^2 + 5 using first principles. Interpret the result as the slope of the tangent at x = 1.',
            steps: [
            { text: 'Write the difference quotient using the definition f\'(x) = lim_{h→0} [f(x+h) - f(x)]/h.' },
            { text: 'Expand f(x+h) carefully: 2(x^3 + 3x^2h + 3xh^2 + h^3) - 4(x^2 + 2xh + h^2) + 5 = 2x^3 + 6x^2h + 6xh^2 + 2h^3 - 4x^2.' },
            { text: 'Subtract f(x) = 2x^3 - 4x^2 + 5: f(x+h) - f(x) = (2x^3 + 6x^2h + 6xh^2 + 2h^3 - 4x^2 - 8xh - 4h^2 + 5) - (2x^3 - 4x^2.' },
            { text: 'Factor h from every term: h(6x^2 + 6xh + 2h^2 - 8x - 4h). Cancel h with denominator: difference quotient = 6x^2 + 6xh.' },
            { text: 'Take limit h→0: f\'(x) = 6x^2 - 8x. At x = 1, f\'(1) = 6(1)^2 - 8(1) = -2.', faded: true, blankAnswer: 'f\'(x) = 6x^2 - 8x; slope at x = 1 is -2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_009', title: 'Algebra of Derivatives: Sum, Difference, Product Rules',
          scaffold: { problem: 'The volume of a cuboid is given by \\(V(x) = (2x^2 + 3x)(x - 4)\\) cubic metres, where \\(x\\) is a design parameter in metres.',
            steps: [
            { text: 'Identify the two functions: \\(u(x) = 2x^2 + 3x\\) and \\(v(x) = x - 4\\).' },
            { text: 'Differentiate each function using the power rule: \\(u\'(x) = 4x + 3\\), \\(v\'(x) = 1\\).' },
            { text: 'Apply the product rule: \\(V\'(x) = u\'(x)v(x) + u(x)v\'(x) = (4x+3)(x-4) + (2x^2+3x)(1)\\).' },
            { text: 'Expand and simplify: \\((4x^2 - 16x + 3x - 12) + (2x^2 + 3x) = 4x^2 - 13x - 12 + 2x^2 + 3x = 6x^2 - 10x - 12\\).' },
            { text: 'Evaluate at \\(x = 2\\): \\(V\'(2) = 6(4) - 10(2) - 12 = 24 - 20 - 12 = -8\\) m³/m.', faded: true, blankAnswer: '\\(-8\\) m³/m' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_13_010', title: 'Derivatives of Trigonometric Functions',
          scaffold: { problem: 'Find the derivative of f(x) = sin x + cos x from first principles. Verify using the algebra of derivatives.',
            steps: [
            { text: 'Write the first principle definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h = lim(h→0) [sin(x+h) + cos(x+h) - sin x - cos.' },
            { text: 'Use trigonometric identities: sin(x+h) = sin x cos h + cos x sin h; cos(x+h) = cos x cos h - sin x sin h.' },
            { text: 'Group terms with sin x and cos x: = lim(h→0) [sin x (cos h - 1) + cos x (sin h - 1) + cos x sin h - sin x sin h]/h.' },
            { text: 'Apply standard limits: lim(h→0) (cos h - 1)/h = 0; lim(h→0) sin h/h = 1.' },
            { text: 'Verify using algebra of derivatives: d/dx(sin x) + d/dx(cos x) = cos x + (-sin x) = cos x - sin x. Both methods match.', faded: true, blankAnswer: 'f\'(x) = cos x - sin x' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_13_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Evaluating limₓ→₂ (x² − 4)/(x − 2), a student writes 0/0 = 0 \'since undefined means zero\', then says the limit can\'t exist anyway \'because f(2) doesn\'t exist.\' For (x³ − 8)/(x² − 4) he applies the standard limit to the numerator and gets 12.',
            decisions: [{ prompt: 'What do limits actually mean here?', options: [
                { text: 'Treat 0/0 as a signal, not a value: it means \'more work needed\' — factor (x−2)(x+2)/(x−2) → x+2 → 4. The function being undefined AT 2 is irrelevant: the limit is the value approached near 2 from both sides. And the standard limit (xⁿ−aⁿ)/(x−a) = naⁿ⁻¹ needs the exact (x−a) denominator — for (x²−4) you factor both or use the (n/m)a^{n−m} form, giving 12/4 = 3.', outcome: 'He stops fearing undefined points: limits live in the approach, indeterminate forms are work orders, and standard formulas carry exact shape requirements.' },
                { text: 'Keep 0/0 = 0 — a zero numerator gives a zero result.', outcome: '0/0 is indeterminate — it carries no value until algebra resolves it; here the cancelled factor reveals the answer is 4.', reveals: 'zero-over-zero-is-zero' },
                { text: 'Accept 12 — the numerator matched the standard form, so the formula applies.', outcome: 'The formula\'s denominator must be exactly (x − a); with (x² − 4) the denominator also has a limit to resolve — the full result is 12/4 = 3.', reveals: 'standard-limit-misapplied' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_13_010', title: 'You made it',
          caseStudy: { intro: 'Limits, slopes, derivatives — the moment Newton cracked the code of change, you just walked through.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_13_007', difficulty: 'standard',
          question: 'The derivative of a polynomial function f(x) = a_n x^n + a_{n-1} x^{n-1} + ...',
          hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_8, c8_math_ch2_9) and.',
          misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3).',
          parts: [
                { id: 'a', prompt: 'Explain why the derivative of a constant term (like +7) is zero, using the concept of slope of a tangent line.', answer: 'The graph of y = 7 is a horizontal line',
                  options: ['The graph of y = 7 is a horizontal line', 'the derivative of 7 is 7'],
                  hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_8, c8_math_ch2_9) and Class 9.',
                  misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3) or as 15x^3.' },
                { id: 'b', prompt: 'Two students differentiate f(x) = (x^2 + 3x)(2x - 1). Student A expands first: f(x) = 2x^3 + 5x^2 - 3x, then differentiates to get 6x^2 + 10x - 3.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'both are correct'],
                  hint: 'If stuck, revisit Class 8 exponent laws (c8_math_ch2_7, c8_math_ch2_8, c8_math_ch2_9) and Class 9.',
                  misconception: 'Students frequently write the derivative of 5x^3 as 5x^2 (forgetting to multiply the coefficient 5 by the exponent 3) or as 15x^3.' }
          ],
            remediations: { 'students-frequently-write-the-derivative': { steps: ['Multiply the coefficient by the exponent: 5 × 3 = 15.', 'Keep x and reduce exponent by 1: x^(3-1) = x^2.', 'Combine: 15x^2." Use colour coding: coefficient in red, exponent in blue.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_008', difficulty: 'standard',
          question: 'The derivative of a function f(x) at a point x = a using first principles.',
          hint: 'Revisit c11_math_cbse_13_002 (Limits: Algebraic Methods) for.',
          misconception: 'Students often incorrectly expand f(x+h) for rational functions.',
          parts: [
                { id: 'a', prompt: 'Why can\'t we simply substitute h = 0 directly into the difference quotient [f(x+h) - f(x)]/h to find the derivative? Explain with the example f(x) = x^2.', answer: 'Direct substitution gives 0/0, an indeterminate form',
                  options: ['Direct substitution gives 0/0, an indeterminate form', 'we can substitute h=0 directly', 'the derivative is undefined'],
                  hint: 'Revisit c11_math_cbse_13_002 (Limits: Algebraic Methods) for factorization/rationalization.',
                  misconception: 'Students often incorrectly expand f(x+h) for rational functions.' }
          ],
            remediations: { 'students-often-incorrectly-expand-f': { steps: ['If a student makes the "distributing the denominator" or "distributing the root" error, immediately stop and have them.', 'Then revisit the algebraic rule: 1/(A+B) ≠ 1/A + 1/B and √(A+B) ≠ √A + √B.', 'Practice 5-10 targeted exercises where they only write f(x+h) correctly for rational and radical functions before.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_009', difficulty: 'standard',
          question: 'The algebra of derivatives provides rules to differentiate combinations.',
          hint: 'If stuck, revisit the power rule for negative and fractional exponents (from derivative.',
          misconception: 'The most persistent error is \\((uv)\' = u\'v\'\\) — students multiply the derivatives instead of using the cross-sum \\(u\'v.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The algebra of derivatives provides rules to differentiate combinations of functions',
                  options: ['The algebra of derivatives provides rules to differentiate combinations of functions', 'The limit of a function f(x) as x approaches a value \'a\' is the value L that f(x) gets', 'Algebraic methods of evaluating limits involve manipulating an algebraic expression f(x)', 'The limits of trigonometric functions as the variable approaches zero are evaluated using'],
                  hint: 'If stuck, revisit the power rule for negative and fractional exponents (from derivative.',
                  misconception: 'The most persistent error is \\((uv)\' = u\'v\'\\) — students multiply the derivatives instead of using the cross-sum \\(u\'v + uv\'\\).' }
          ],
            remediations: { 'the-most-persistent-error-is': { steps: ['If a student writes \\((uv)\' = u\'v\'\\), immediately stop and do this: 1.', 'Take a simple product \\(f(x) = x \\cdot x = x^2\\).', 'Ask: "What is \\(f\'(x)\\)?" They\'ll say \\(2x\\).', 'Now apply their wrong rule: \\(u=x, v=x\\), so \\(u\'=1, v\'=1\\), their rule gives \\(1 \\cdot 1 = 1\\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_13_010', difficulty: 'standard',
          question: 'The derivative of a trigonometric function f(x) at a point x is the limit.',
          hint: 'If stuck, revisit c11_math_cbse_13_003 (Limits of Trigonometric Functions) to master the.',
          misconception: 'Students write d/dx(sin 2x) = cos 2x by blindly applying d/dx(sin x) = cos x, treating 2x as if it were just x.',
          parts: [
                { id: 'a', prompt: 'Explain why we cannot directly substitute h = 0 in the difference quotient [sin(x+h) - sin x]/h when finding the derivative of sin x from first principles, and.', answer: 'Direct substitution gives 0/0, an indeterminate form',
                  options: ['Direct substitution gives 0/0, an indeterminate form', 'we factor out h'],
                  hint: 'If stuck, revisit c11_math_cbse_13_003 (Limits of Trigonometric Functions) to master the two.',
                  misconception: 'Students write d/dx(sin 2x) = cos 2x by blindly applying d/dx(sin x) = cos x, treating 2x as if it were just x.' }
          ],
            remediations: { 'students-write-d-dx-sin': { steps: ['When a student writes d/dx(sin 2x) = cos 2x, immediately stop and ask: "What is the definition of derivative?', 'Write lim(h→0) [sin 2(x+h) - sin 2x]/h." Guide them to expand sin(2x+2h) = sin 2x cos 2h + cos 2x sin 2h.', 'Then split: sin 2x (cos 2h - 1)/h + cos 2x (sin 2h)/h.', 'Now multiply and divide by 2: 2 sin 2x (cos 2h - 1)/(2h) + 2 cos 2x (sin 2h)/(2h).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
