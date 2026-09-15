import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch05_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch05_p3: SimDef = {
    id: 'v3_c12_math_ch05_p3',
    title: 'Continuity and Differentiability · Part 3/3',
    subtitle: 'The graph jumped — one equality failed',
    classLevel: 12, subject: 'mathematics', topic: 'Continuity and Differentiability · Part 3/3',
    chapters: ['c12_math_ch05'],
    nodeIds: ['c12_math_cbse_05_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Continuity auditor', intro: 'A function is continuous where its limit and its value shake hands — three conditions make the handshake official.', goal: 'Verify continuity at a point via the three conditions and classify discontinuities by their left-right behaviour.' },
    discovery: {
        question: 'Draw any function without lifting your pen. What breaks at a sharp corner?',
        options: ['Differentiability — the slope jumps, so no single tangent exists', 'Continuity — the graph is broken', 'Nothing breaks, it is still a function', 'The function becomes undefined'],
        answer: 'Differentiability — the slope jumps, so no single tangent exists',
        hook: 'Smooth versus sharp — differentiability asks whether a curve has a single slope at a point. Corners fail.',
    },
    teaching: [
        { title: 'Mean Value Theorem: Statement and Proof', text: 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed interval \\([a, b]\\) and differentiable on the open interval \\((a, b)\\), then there exists at least one point \\.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_05_013', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Verify continuity like an auditor: run all three conditions on piecewise functions, classify each break as removable, jump or infinite, and find the parameter that stitches a seam shut.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_013', title: 'Mean Value Theorem: Statement and Proof',
          scaffold: { problem: 'Verify the Mean Value Theorem for \\( f(x) = \\sqrt{x} \\) on the interval \\([1, 4]\\). Find the value(s) of \\( c \\).',
            steps: [
            { text: 'Check hypotheses. \\( f(x) = \\sqrt{x} \\) is continuous on \\([1, 4]\\) (square root function is continuous for \\( x \\ge 0.' },
            { text: 'Compute endpoints. \\( f(1) = 1 \\), \\( f(4) = 2 \\).' },
            { text: 'Compute secant slope. \\( \\frac{f(4)-f(1)}{4-1} = \\frac{2-1}{3} = \\frac{1}{3} \\).' },
            { text: 'Find derivative. \\( f\'(x) = \\frac{1}{2\\sqrt{x}} \\). Set \\( f\'(c) = \\frac{1}{3} \\Rightarrow \\frac{1}{2\\sqrt{c}}.' },
            { text: 'Verify \\( c \\in (1, 4) \\). Yes, \\( 2.25 \\in (1, 4) \\). MVT verified.', faded: true, blankAnswer: '\\( c = \\frac{9}{4} \\) (or 2.25)' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_05_013', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup\'s pay banding pays ₹40,000/month for tenure under 3 years and \'₹48,000 starting the day you hit 3 years.\' An engineer plots the salary function and asks whether it \'jumps\' at the 3-year mark.',
            decisions: [{ prompt: 'What does the continuity test say?', options: [
                { text: 'Check all three quantities — the left-hand limit (₹40,000 as tenure approaches 3 years), the right-hand limit (₹48,000 just past it) and the defined value at exactly 3 years; a ₹8,000 overnight gap means LHL ≠ RHL, so the pay function is discontinuous at the boundary.', outcome: 'The chapter\'s criterion needs the two limits and the point-value to agree — a cliff in the rule is a discontinuity the moment the band ticks over, whatever HR calls it.' },
                { text: 'It\'s continuous — salary is defined at every tenure, so there\'s no break.', outcome: 'Defined everywhere isn\'t continuous anywhere: a jump discontinuity still assigns a value at the boundary; the test is whether approaching from either side lands on the same number.', reveals: 'defined-equals-continuous' },
                { text: 'It\'s continuous if the rule says \'at 3 years you get 48k\' — the point value matches the right side.', outcome: 'Matching one side isn\'t the test — continuity needs LHL, RHL and f(c) all equal; matching f(3) to the right limit still leaves a ₹8,000 gap on the left.', reveals: 'one-side-match-suffices' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_05_013', title: 'You made it',
          caseStudy: { intro: 'Continuity is survival; differentiability is smoothness. Every calculus result ahead of you assumes both.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_05_013', difficulty: 'standard',
          question: 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the.',
          hint: 'Revisit Rolle\'s Theorem (c12_math_cbse_05_012) and practice checking.',
          misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed',
                  options: ['The Mean Value Theorem (MVT) states: If a function \\( f \\) is continuous on the closed', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'Revisit Rolle\'s Theorem (c12_math_cbse_05_012) and practice checking continuity/differentiability.',
                  misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c).' }
          ],
            remediations: { 'specific-error-students-frequently-write': { steps: ['**Revisit Rolle\'s Theorem (c12_math_cbse_05_012):** Ensure you can state it and verify its conditions.', 'MVT proof is a direct application of Rolle\'s Theorem to a modified function.', '**Practice Condition-Checking:** For 5 different functions on given intervals, explicitly write: "Continuous on [a,b].', 'Differentiable on (a,b) because..." before attempting to find \\( c \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c).',
          parts: [
                { id: 'a', prompt: 'A student claims: "The function \\( f(x) = \\frac{1}{x} \\) on \\([-1, 1]\\) satisfies the Mean Value Theorem because it is differentiable everywhere except at 0.', answer: '**Correct Answer:** The student is INCORRECT',
                  options: ['**Correct Answer:** The student is INCORRECT', 'differentiable almost everywhere', 'differentiable on the whole open interval'],
                  hint: 'Revisit Rolle\'s Theorem (c12_math_cbse_05_012) and practice checking continuity/differentiability.',
                  misconception: '**Specific Error:** Students frequently write the conclusion as \\( f(c) = \\frac{f(b)-f(a)}{b-a} \\) instead of \\( f\'(c).' }
          ],
            remediations: { 'specific-error-students-frequently-write': { steps: ['**Revisit Rolle\'s Theorem (c12_math_cbse_05_012):** Ensure you can state it and verify its conditions.', 'MVT proof is a direct application of Rolle\'s Theorem to a modified function.', '**Practice Condition-Checking:** For 5 different functions on given intervals, explicitly write: "Continuous on [a,b].', 'Differentiable on (a,b) because..." before attempting to find \\( c \\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
