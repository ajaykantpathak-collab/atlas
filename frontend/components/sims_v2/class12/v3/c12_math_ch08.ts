import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch08 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch08: SimDef = {
    id: 'v3_c12_math_ch08',
    title: 'Application of Integrals',
    subtitle: 'The integral said zero; the area said four',
    classLevel: 12, subject: 'mathematics', topic: 'Application of Integrals',
    chapters: ['c12_math_ch08'],
    nodeIds: ['c12_math_cbse_08_001', 'c12_math_cbse_08_002', 'c12_math_cbse_08_003', 'c12_math_cbse_08_004', 'c12_math_cbse_08_005', 'c12_math_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Area integrator', intro: 'A curved garden bed needs soil — and the integral that measures it is just a limit of thin strips.', goal: 'Set up area-under-curve integrals with the right strip direction and the right sign handling.' },
    discovery: {
        question: '∫₀^2π sin x dx = 0 — so the area under one full sine wave is zero? What did the computation actually measure?',
        options: ['Net signed area — the positive hump cancelled the negative; true geometric area needs absolute values over each interval: 2 + 2 = 4', 'Zero is correct — the integral really does measure geometric area', 'π — the two half-wave areas are π each and cancel out', '2π — over a full period the integral should equal the interval length'],
        answer: 'Net signed area — the positive hump cancelled the negative; true geometric area needs absolute values over each interval: 2 + 2 = 4',
        hook: 'The integral is a limit of thin strips — each f(xᵢ)·Δx is a rectangle\'s area, and shrinking width to zero turns approximation into exactness. And the strip\'s direction follows the function: x = g(y) wants horizontal strips, not a forced re-solve.',
    },
    teaching: [
        { title: 'Area Under Simple Curves: Definition', text: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is defined as the definite integral ∫_a^b f(x) dx, which represents the limit of the sum of areas.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_08_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Set up the area integral correctly: choose vertical or horizontal strips to match the function, split at the axis where the sign flips, and turn the answer into square units with meaning.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_001', title: 'Area Under Simple Curves: Definition',
          scaffold: { problem: 'A rectangular field has a curved drainage ditch along one side.',
            steps: [
            { text: 'Identify the curve and bounds. The curve is y = 3 - x^2. The bounds are x = -√3 and x = √3 (where y = 0).' },
            { text: 'Write the integral: A = ∫_{-√3}^{√3} (3 - x^2) dx.' },
            { text: 'Find the antiderivative: ∫(3 - x^2) dx = 3x - x^3/3.' },
            { text: 'Evaluate at bounds: [3x - x^3/3]_{-√3}^{√3} = (3√3 - (√3)^3/3) - (3(-√3) - (-√3)^3/3) = (3√3 - 3√3/3) - (-3√3 + 3√3/3).' },
            { text: 'Interpret: Area = 4√3 ≈ 6.928 m². This is the cross-sectional area; multiply by length for volume.', faded: true, blankAnswer: '4√3 m² (approx. 6.93 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_002', title: 'Area Between Curve and X-Axis',
          scaffold: { problem: 'Find the area of the region bounded by the curve y = 6 - x - x^2 and the x-axis.',
            steps: [
            { text: 'Find the x-intercepts by solving 6 - x - x^2 = 0 → x^2 + x - 6 = 0 → (x+3)(x-2)=0 → x = -3, x = 2.' },
            { text: 'Since f(x) ≥ 0 on [-3, 2], the area is simply ∫_{-3}^2 (6 - x - x^2) dx.' },
            { text: 'Compute the antiderivative: ∫(6 - x - x^2) dx = 6x - x^2/2 - x^3/3.' },
            { text: 'Evaluate from -3 to 2: [6(2) - (2)^2/2 - (2)^3/3] - [6(-3) - (-3)^2/2 - (-3)^3/3] = [12 - 2 - 8/3] - [-18 - 9/2 + 27/3].' },
            { text: 'The area is 125/6 square units.', faded: true, blankAnswer: '125/6 square units' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_003', title: 'Area Between Two Curves',
          scaffold: { problem: 'Find the area of the region bounded by the curves y = x² - 4x + 3 and y = -x² + 2x + 3.',
            steps: [
            { text: 'Find intersection points by equating the two functions: x² - 4x + 3 = -x² + 2x + 3 → 2x² - 6x = 0 → 2x(x - 3) = 0 →.' },
            { text: 'Determine which curve is upper on [0, 3]. Test x = 1: y₁ = 1 - 4 + 3 = 0; y₂ = -1 + 2 + 3 = 4.' },
            { text: 'Set up the integral for area using vertical strips: Area = ∫[0 to 3] [(-x² + 2x + 3) - (x² - 4x + 3)] dx = ∫[0 to 3].' },
            { text: 'Integrate term by term: ∫(-2x² + 6x) dx = -2(x³/3) + 6(x²/2) = -2x³/3 + 3x².' },
            { text: 'Evaluate from 0 to 3: [-2(27)/3 + 3(9)] - [0] = [-18 + 27] = 9 square units.', faded: true, blankAnswer: '9 square units' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_004', title: 'Area Bounded by Parabola and Line',
          scaffold: { problem: 'Find the area of the region bounded by the parabola y = x² - 4x + 3 and the line y = x - 1.',
            steps: [
            { text: 'Sketch both curves. Parabola: y = x² - 4x + 3 = (x-1)(x-3), opens upward, x-intercepts at 1 and 3, vertex at x = 2 →.' },
            { text: 'Find intersection points by solving x² - 4x + 3 = x - 1 → x² - 5x + 4 = 0 → (x-1)(x-4) = 0 → x = 1, x = 4.' },
            { text: 'Determine upper/lower on [1, 4]. Test x = 2: parabola y = -1, line y = 1. Line is above parabola throughout.' },
            { text: 'Set up integral: Area = ∫₁⁴ [(x - 1) - (x² - 4x + 3)] dx = ∫₁⁴ (-x² + 5x - 4) dx.' },
            { text: 'Integrate: [-x³/3 + 5x²/2 - 4x]₁⁴.' },
            { text: 'Evaluate at 4: -64/3 + 80/2 - 16 = -64/3 + 40 - 16 = -64/3 + 24 = 8/3.' },
            { text: 'Evaluate at 1: -1/3 + 5/2 - 4 = -1/3 + 2.5 - 4 = -1/3 - 1.5 = -11/6.' },
            { text: 'Subtract: 8/3 - (-11/6) = 16/6 + 11/6 = 27/6 = 9/2 = 4.5 sq units.', faded: true, blankAnswer: '4.5 sq units' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_005', title: 'Area Bounded by Circle and Ellipse',
          scaffold: { problem: 'Find the area of the circle \\(x^2 + y^2 = 16\\) using integration with vertical strips.',
            steps: [
            { text: 'Identify the curve: circle centered at origin with radius \\(a = 4\\). The circle is symmetric about both axes.' },
            { text: 'The total area is 4 times the area in the first quadrant. In the first quadrant, \\(y = \\sqrt{16 - x^2}\\) and \\(x\\).' },
            { text: 'Set up the integral: \\(A = 4 \\int_0^4 \\sqrt{16 - x^2}\\,dx\\).' },
            { text: 'Use trigonometric substitution \\(x = 4\\sin\\theta\\), so \\(dx = 4\\cos\\theta\\,d\\theta\\).' },
            { text: 'Evaluate \\(\\int_0^{\\pi/2} \\cos^2\\theta\\,d\\theta = \\frac{1}{2}\\int_0^{\\pi/2} (1 + \\cos 2\\theta)\\,d\\theta.' },
            { text: 'Verify: \\(\\pi a^2 = \\pi \\cdot 4^2 = 16\\pi\\). The area is \\(16\\pi\\) square units.', faded: true, blankAnswer: '\\(16\\pi\\) square units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_006', title: 'Word Problems: Area Applications',
          scaffold: { problem: 'A farmer\'s field is bounded by the river \\( y = x^2 \\) and the straight road \\( y = 4 \\). Fertilizer costs ₹120 per square metre.',
            steps: [
            { text: 'Sketch the region. The parabola \\( y = x^2 \\) opens upward, vertex at (0,0). The line \\( y = 4 \\) is horizontal.' },
            { text: 'Decide on vertical strips because both curves are functions of \\( x \\).' },
            { text: 'Set up the integral for area: \\( A = \\int_{-2}^{2} (4 - x^2) \\, dx \\).' },
            { text: 'Evaluate: \\( \\int (4 - x^2) \\, dx = 4x - \\frac{x^3}{3} \\). From \\( -2 \\) to \\( 2 \\): \\( \\left(8 - \\frac{8}{3}\\right).' },
            { text: 'Total cost = Area × rate = \\( \\frac{32}{3} \\times 120 = 32 \\times 40 = ₹1280 \\).', faded: true, blankAnswer: '₹1280' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_08_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Estimating paint for a wavy decorative wall whose profile dips below the base line, a junior integrates the curve over the full span and gets a suspiciously small number — \'the dips cancel the bulges, so we need less paint.\'',
            decisions: [{ prompt: 'What did the integral actually measure?', options: [
                { text: 'Signed area — below-axis stretches subtracted from above-axis ones; physical area is ∫|f(x)|dx, so find where the curve crosses the baseline, split there, and sum the absolute values of each piece.', outcome: 'The chapter\'s split: the definite integral is net signed area — paint covers the dips too, so cancellation understates the surface, not the other way round.' },
                { text: 'He\'s right — net area is what the wall presents, so less paint it is.', outcome: 'The wall\'s face is positive area everywhere — a dip below the reference line is still surface to be coated; signed area is an accounting identity, not a coverage estimate.', reveals: 'net-area-is-coverage' },
                { text: 'Ignore the dips entirely and integrate only the parts above the baseline.', outcome: 'That under-coats the lower stretches — the fix isn\'t discarding negative regions but flipping their sign: integrate each sign-zone separately and take absolute values.', reveals: 'drop-the-negative-parts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_08_006', title: 'You made it',
          caseStudy: { intro: 'You can now read a definite integral as accumulated area — and catch the cancellation that hides real geometry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_08_001', difficulty: 'standard',
          question: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0.',
          hint: 'If stuck, revisit the evaluation of definite integrals (Chapter 7) and practice sketching.',
          misconception: 'Students often think that the definite integral ∫_a^b f(x) dx always gives the geometric area, even when f(x).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is',
                  options: ['The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The area between a curve y = f(x) and the x-axis from x = a to x = b is given by the', 'The area between two curves y = f(x) and y = g(x) from x = a to x = b, where f(x) ≥ g(x)', 'The area bounded by a parabola and a line is the region enclosed between the graphs of a'],
                  hint: 'If stuck, revisit the evaluation of definite integrals (Chapter 7) and practice sketching graphs.',
                  misconception: 'Students often think that the definite integral ∫_a^b f(x) dx always gives the geometric area, even when f(x) is negative on part of the.' }
          ],
            remediations: { 'the-definite-integral-a-b': { steps: ['If a student makes this error, first have them sketch the curve and shade the region.', 'Ask: "Is the curve above or below the x-axis?" Then guide them to split the integral at the x-intercepts: Area = ∫_a^c.', 'Practice with y = cos x from 0 to 2π: identify roots at π/2 and 3π/2, set up three integrals with absolute values, and.', 'Emphasize that the integral gives signed area; geometric area is the sum of absolute values.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_002', difficulty: 'standard',
          question: 'The area between a curve y = f(x) and the x-axis from x = a to x = b is given.',
          hint: 'If stuck, revisit definite integration techniques (Class 12 Chapter 7) and practice.',
          misconception: 'Students often compute the area as simply ∫_a^b f(x) dx without checking if f(x) changes sign.',
          parts: [
                { id: 'a', prompt: 'Compare the area bounded by y = x^3 from x = -1 to x = 1 using (a) the integral ∫_{-1}^1 x^3 dx and (b) the geometric area formula ∫_{-1}^1 |x^3| dx.', answer: 'the integral ∫_{-1}^1 x^3 dx and (',
                  options: ['the integral ∫_{-1}^1 x^3 dx and (', 'both are 0 or both are 1/2'],
                  hint: 'If stuck, revisit definite integration techniques (Class 12 Chapter 7) and practice finding roots.',
                  misconception: 'Students often compute the area as simply ∫_a^b f(x) dx without checking if f(x) changes sign.' }
          ],
            remediations: { 'students-often-compute-the-area': { steps: ['If a student makes this error, first have them graph the function to visually see regions above and below the x-axis.', 'Then, explicitly find all x-intercepts in the interval.', 'Next, set up separate integrals for each subinterval, and before summing, take the absolute value of each integral.', 'Practice with functions that have both positive and negative parts, like y = sin x on [0, 2π] or y = x^2 - 1 on [-2, 2].'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_003', difficulty: 'standard',
          question: 'The area between two curves y = f(x) and y = g(x) from x = a to x = b, where.',
          hint: 'Revisit c12_math_cbse_08_002 (Area Between Curve and X-Axis) and practice splitting.',
          misconception: 'Students consistently write Area = ∫[a to b] [f(x) - g(x)] dx without verifying which function is greater on the.',
          parts: [
                { id: 'a', prompt: 'State the formula for the area between two curves y = f(x) and y = g(x) from x = a to x = b, assuming f(x) ≥ g(x) on [a, b].', answer: 'Area = ∫[a to b] [f(x) - g(x)] dx',
                  options: ['Area = ∫[a to b] [f(x) - g(x)] dx', 'Area = ∫[a to b] [g(x) - f(x)] dx'],
                  hint: 'Revisit c12_math_cbse_08_002 (Area Between Curve and X-Axis) and practice splitting integrals.',
                  misconception: 'Students consistently write Area = ∫[a to b] [f(x) - g(x)] dx without verifying which function is greater on the interval, and without.' }
          ],
            remediations: { 'students-consistently-write-area-a': { steps: ['If a student makes the upper/lower confusion error: Step 1 — Have them sketch both curves accurately on graph paper for.', 'Step 2 — Pick a test x-value in each subinterval (e.g., midpoint) and evaluate both functions numerically.', 'Step 3 — Label the higher value as "upper" and lower as "lower" on the sketch.', 'Step 4 — Rewrite the integral as ∫(upper - lower) dx.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_004', difficulty: 'standard',
          question: 'The area bounded by a parabola and a line is the region enclosed between the.',
          hint: 'If stuck on intersections: review c10_math_cbse_04_001 (quadratic formula) and.',
          misconception: 'Students automatically use vertical strips (dx) for ALL parabola-line problems.',
          parts: [
                { id: 'a', prompt: 'Write the general formula for area between a parabola y = f(x) and a line y = g(x) from x = a to x = b, where g(x) ≥ f(x) on [a, b].', answer: 'Area = ∫ₐᵇ [g(x) - f(x)] dx',
                  options: ['Area = ∫ₐᵇ [g(x) - f(x)] dx', 'upper minus lower'],
                  hint: 'If stuck on intersections: review c10_math_cbse_04_001 (quadratic formula) and c10_math_cbse_03_005.',
                  misconception: 'Students automatically use vertical strips (dx) for ALL parabola-line problems.' }
          ],
            remediations: { 'students-automatically-use-vertical-strips': { steps: ['If the student defaults to dx-strips for y² = 4ax: (1) Make them sketch y² = 4x and y = 2x - 4 on graph paper.', '(2) Ask: "Is x a function of y?', 'Is y a function of x?" (3) Show that for a given x > 0, the parabola gives TWO y-values — vertical strip height isn\'t.', '(4) Have them redo c12_math_cbse_08_003\'s horizontal-strip examples.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_005', difficulty: 'standard',
          question: 'The area bounded by a circle \\(x^2 + y^2 = a^2\\) or an ellipse.',
          hint: 'If stuck, revisit the standard equations of circle and ellipse (c11_math_cbse_11_002.',
          misconception: 'Students often forget the symmetry factor when using quadrant-only integration.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area bounded by a circle \\(x^2 + y^2 = a^2\\) or an ellipse \\(\\frac{x^2}{a^2} +',
                  options: ['The area bounded by a circle \\(x^2 + y^2 = a^2\\) or an ellipse \\(\\frac{x^2}{a^2} +', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The area between a curve y = f(x) and the x-axis from x = a to x = b is given by the', 'The area between two curves y = f(x) and y = g(x) from x = a to x = b, where f(x) ≥ g(x)'],
                  hint: 'If stuck, revisit the standard equations of circle and ellipse (c11_math_cbse_11_002.',
                  misconception: 'Students often forget the symmetry factor when using quadrant-only integration.' }
          ],
            remediations: { 'students-often-forget-the-symmetry': { steps: ['If a student makes the symmetry-factor error, have them sketch the circle and shade the first quadrant.', 'Ask: “What fraction of the total area is this?” Then guide them to write the total area as 4 times the quadrant.', 'For the substitution error, revert to the standard integral \\(\\int \\sqrt{a^2 - x^2}\\,dx\\) from Class 12 Chapter 7.', 'Practice the substitution \\(x = a\\sin\\theta\\) step by step: write \\(x = a\\sin\\theta\\), then \\(dx.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_006', difficulty: 'standard',
          question: 'Word problems on area applications involve translating real-world scenarios.',
          hint: 'If stuck, revisit the definite integral evaluation techniques from Class 12 Chapter 7.',
          misconception: 'Students often set up the integral as \\( \\int_a^b (f(x) - g(x)) \\, dx \\) without checking which function is actually.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems on area applications involve translating real-world scenarios (such as land',
                  options: ['Word problems on area applications involve translating real-world scenarios (such as land', 'The area under a simple curve y = f(x) from x = a to x = b (with f(x) ≥ 0 on [a,b]) is', 'The area between a curve y = f(x) and the x-axis from x = a to x = b is given by the', 'The area between two curves y = f(x) and y = g(x) from x = a to x = b, where f(x) ≥ g(x)'],
                  hint: 'If stuck, revisit the definite integral evaluation techniques from Class 12 Chapter 7 (Integrals).',
                  misconception: 'Students often set up the integral as \\( \\int_a^b (f(x) - g(x)) \\, dx \\) without checking which function is actually on top in the.' }
          ],
            remediations: { 'students-often-set-up-the': { steps: ['Re‑visit **c12_math_cbse_08_002** (Area Between Curve and X‑Axis) to practice splitting integrals when the curve.', 'Review **c12_math_cbse_08_003** (Area Between Two Curves) to master identifying top/bottom functions and finding.', 'Do a re‑diagnostic: solve the area between \\( y = x^2 - 4 \\) and the x‑axis from \\( x = 0 \\) to \\( x = 3 \\).', 'The correct answer is \\( \\left| \\int_0^2 (x^2 - 4) \\, dx \\right| + \\int_2^3 (x^2 - 4) \\, dx = \\frac{16}{3}.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
