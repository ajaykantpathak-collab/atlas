import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch05_p1: SimDef = {
    id: 'v3_c12_math_ch05_p1',
    title: 'Continuity and Differentiability · Part 1/3',
    subtitle: 'The graph jumped — one equality failed',
    classLevel: 12, subject: 'mathematics', topic: 'Continuity and Differentiability · Part 1/3',
    chapters: ['c12_math_ch05'],
    nodeIds: ['c12_math_cbse_05_001', 'c12_math_cbse_05_002', 'c12_math_cbse_05_003', 'c12_math_cbse_05_004', 'c12_math_cbse_05_005', 'c12_math_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Continuity auditor', intro: 'A function is continuous where its limit and its value shake hands — three conditions make the handshake official.', goal: 'Verify continuity at a point via the three conditions and classify discontinuities by their left-right behaviour.' },
    discovery: {
        question: 'Draw any function without lifting your pen. What breaks at a sharp corner?',
        options: ['Differentiability — the slope jumps, so no single tangent exists', 'Continuity — the graph is broken', 'Nothing breaks, it is still a function', 'The function becomes undefined'],
        answer: 'Differentiability — the slope jumps, so no single tangent exists',
        hook: 'Smooth versus sharp — differentiability asks whether a curve has a single slope at a point. Corners fail.',
    },
    teaching: [
        { title: 'Continuity of a Function: Definition', text: 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if \\(\\lim_{x \\to c} f(x) = f(c)\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_05_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Verify continuity like an auditor: run all three conditions on piecewise functions, classify each break as removable, jump or infinite, and find the parameter that stitches a seam shut.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_001', title: 'Continuity of a Function: Definition',
          scaffold: { problem: '** A taxi charges ₹25 for the first kilometre and ₹15 for each additional kilometre or part thereof.',
            steps: [
            { text: 'Identify the pieces. At \\(x=1\\), the first piece gives \\(F(1)=25\\). For \\(x>1\\), the ceiling function applies.' },
            { text: 'Check continuity at \\(x=1\\).' },
            { text: 'Check continuity at \\(x=2\\).' },
            { text: 'Interpret: The fare jumps at every integer kilometre because the ceiling function adds a full kilometre charge as soon.' },
            { text: 'Conclusion: \\(F\\) is discontinuous at all positive integers; continuous elsewhere.', faded: true, blankAnswer: '** Discontinuous at \\(x=1\\) and \\(x=2\\) (and all positive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_002', title: 'Continuity at a Point: Left and Right Limits',
          scaffold: { problem: 'A taxi fare in Mumbai is given by \\( f(x) = \\begin{cases} 25, & 0 < x \\le 2 \\\\ 25 + 15(x-2), & x > 2 \\end{cases} \\) where \\( x \\).',
            steps: [
            { text: 'Identify the point of interest \\( c = 2 \\). Note the pieces: for \\( x \\le 2 \\), fare = ₹25; for \\( x > 2 \\), fare = \\.' },
            { text: 'Compute \\( f(2) \\): since \\( 2 \\le 2 \\), use first piece → \\( f(2) = 25 \\).' },
            { text: 'Compute LHL: \\( \\lim_{x \\to 2^-} f(x) = \\lim_{x \\to 2^-} 25 = 25 \\).' },
            { text: 'Compute RHL: \\( \\lim_{x \\to 2^+} f(x) = \\lim_{x \\to 2^+} [25 + 15(x-2)] = 25 + 15(0) = 25 \\).' },
            { text: 'Compare: LHL = 25, RHL = 25, \\( f(2) = 25 \\). All equal → fare is continuous at 2 km (no sudden jump).', faded: true, blankAnswer: 'Continuous at \\( x = 2 \\) km.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_003', title: 'Algebra of Continuous Functions',
          scaffold: { problem: 'A Delhi Metro fare function is defined as \\(F(d) = 10 + 2d + \\frac{5}{d+1}\\) for distance \\(d \\geq 0\\) (in km), where the first term.',
            steps: [
            { text: 'Identify the component functions: \\(f_1(d)=10\\) (constant), \\(f_2(d)=2d\\) (polynomial), \\(f_3(d)=\\frac{5}{d+1}\\).' },
            { text: 'Check continuity of each component on \\([0,\\infty)\\). Constants and polynomials are continuous everywhere.' },
            { text: 'Apply Theorem 1: sum of continuous functions is continuous. Since \\(f_1, f_2, f_3\\) are all continuous.' },
            { text: 'Verify at the endpoint \\(d=0\\): \\(F(0)=10+0+5=15\\). \\(\\lim_{d \\to 0^+} F(d) = 10+0+5=15\\). Right-hand continuity holds.' },
            { text: 'Conclusion: \\(F\\) is continuous for all \\(d \\geq 0\\). No discontinuities.', faded: true, blankAnswer: '\\(F(d)\\) is continuous for all \\(d \\geq 0\\). No points.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_004', title: 'Differentiability: Definition and Condition',
          scaffold: { problem: 'A toy car moves along a straight track. Its position (in cm) at time \\( t \\) (in seconds) is given by \\( s(t) = \\begin{cases} t^2, & 0 \\le.',
            steps: [
            { text: 'Identify the function and the point. We need to check differentiability of \\( s(t) \\) at \\( t=2 \\).' },
            { text: 'Write the left-hand derivative (for \\( h \\to 0^- \\), we use \\( t=2+h \\le 2 \\), so the first piece \\( t^2 \\)).' },
            { text: 'Write the right-hand derivative (for \\( h \\to 0^+ \\), we use \\( t=2+h > 2 \\), so the second piece \\( 4t-4 \\)).' },
            { text: 'Compare. Both one-sided derivatives exist, are finite, and equal 4 cm/s.' },
            { text: 'Verify continuity (optional but good practice): \\( \\lim_{t \\to 2^-} s(t) = 4 \\), \\( \\lim_{t \\to 2^+} s(t) = 4 \\), \\.', faded: true, blankAnswer: 'Yes, the velocity is well-defined at \\( t=2 \\) seconds and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_005', title: 'Differentiability at a Point',
          scaffold: { problem: 'A toy car moves along a straight track. Its position (in metres) at time \\( t \\) seconds is given by \\( s(t) = \\begin{cases} t^2, & 0 \\le.',
            steps: [
            { text: 'Check continuity at \\( t = 2 \\). \\( s(2) = 2^2 = 4 \\). LHL = \\( \\lim_{t\\to 2^-} t^2 = 4 \\).' },
            { text: 'Compute left-hand derivative (LHD) at \\( t=2 \\) using definition: LHD = \\( \\lim_{h\\to 0^-} \\frac{s(2+h)-s(2)}{h} \\).' },
            { text: 'Compute right-hand derivative (RHD) at \\( t=2 \\): RHD = \\( \\lim_{h\\to 0^+} \\frac{s(2+h)-s(2)}{h} \\).' },
            { text: 'Compare LHD and RHD. Both equal 4. Therefore, \\( s \\) is differentiable at \\( t=2 \\) and \\( s\'(2) = 4 \\) m/s.' },
            { text: 'Interpret: The velocity at exactly 2 seconds is 4 m/s. The motion is smooth (no jerk) at that instant.', faded: true, blankAnswer: 'Yes, velocity exists at \\( t=2 \\) s and equals 4 m/s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_006', title: 'Chain Rule of Differentiation',
          scaffold: { problem: 'The radius \\( r \\) (in cm) of a circular oil spill increases with time \\( t \\) (in minutes) as \\( r(t) = 3t + 2 \\).',
            steps: [
            { text: 'Identify the composite relationship: \\( A \\) is a function of \\( r \\), and \\( r \\) is a function of \\( t \\).' },
            { text: 'Apply the chain rule: \\( \\frac{dA}{dt} = \\frac{dA}{dr} \\cdot \\frac{dr}{dt} \\).' },
            { text: 'Compute \\( \\frac{dA}{dr} = \\frac{d}{dr}(\\pi r^2) = 2\\pi r \\).' },
            { text: 'Compute \\( \\frac{dr}{dt} = \\frac{d}{dt}(3t + 2) = 3 \\).' },
            { text: 'Multiply: \\( \\frac{dA}{dt} = 2\\pi r \\cdot 3 = 6\\pi r \\). Substitute \\( r = 3(4) + 2 = 14 \\) cm.', faded: true, blankAnswer: '\\( 84\\pi \\) cm²/min (approximately 263.9 cm²/min).' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_05_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup\'s pay banding pays ₹40,000/month for tenure under 3 years and \'₹48,000 starting the day you hit 3 years.\' An engineer plots the salary function and asks whether it \'jumps\' at the 3-year mark.',
            decisions: [{ prompt: 'What does the continuity test say?', options: [
                { text: 'Check all three quantities — the left-hand limit (₹40,000 as tenure approaches 3 years), the right-hand limit (₹48,000 just past it) and the defined value at exactly 3 years; a ₹8,000 overnight gap means LHL ≠ RHL, so the pay function is discontinuous at the boundary.', outcome: 'The chapter\'s criterion needs the two limits and the point-value to agree — a cliff in the rule is a discontinuity the moment the band ticks over, whatever HR calls it.' },
                { text: 'It\'s continuous — salary is defined at every tenure, so there\'s no break.', outcome: 'Defined everywhere isn\'t continuous anywhere: a jump discontinuity still assigns a value at the boundary; the test is whether approaching from either side lands on the same number.', reveals: 'defined-equals-continuous' },
                { text: 'It\'s continuous if the rule says \'at 3 years you get 48k\' — the point value matches the right side.', outcome: 'Matching one side isn\'t the test — continuity needs LHL, RHL and f(c) all equal; matching f(3) to the right limit still leaves a ₹8,000 gap on the left.', reveals: 'one-side-match-suffices' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Continuity is survival; differentiability is smoothness. Every calculus result ahead of you assumes both.',
            decisions: [{ prompt: 'What comes next? Continuity and Differentiability · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Continuity and Differentiability · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_05_001', difficulty: 'standard',
          question: 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain.',
          hint: 'If stuck, revisit Class 11 limit evaluation techniques (factorisation, rationalisation.',
          misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'Explain why the function \\(f(x) = \\frac{x^2 - 1}{x - 1}\\) is **not** continuous at \\(x = 1\\) even though its limit as \\(x \\to 1\\) exists and equals 2.', answer: 'The function is not defined at \\(x = 1\\)',
                  options: ['The function is not defined at \\(x = 1\\)', 'it is continuous'],
                  hint: 'If stuck, revisit Class 11 limit evaluation techniques (factorisation, rationalisation, standard.',
                  misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:** Students check only.' }
          ],
            remediations: { 'misconception-if-a-function-is': { steps: ['Revisit **Class 11 limits**: `c11_math_cbse_13_001` (intuitive idea), `c11_math_cbse_13_002` (algebraic methods).', 'Practice evaluating left-hand and right-hand limits separately for piecewise functions.', 'Re-do the three-condition checklist for **five** different functions (polynomial, rational, absolute value, greatest.', 'Write each condition explicitly: "f(c) = ...", "LHL = ...", "RHL = ...", "Limit = ...", "Conclusion".'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The function \\(f(x) = \\begin{cases} \\frac{\\sin x}{x}, & x \\ne 0 \\\\ 1, & x = 0 \\end{cases}\\) is discontinuous at \\(x = 0\\) because.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'the formula \\(\\frac{\\sin x}{x}\\) must be valid at \\(x=0\\)'],
                  hint: 'If stuck, revisit Class 11 limit evaluation techniques (factorisation, rationalisation, standard.',
                  misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:** Students check only.' }
          ],
            remediations: { 'misconception-if-a-function-is': { steps: ['Revisit **Class 11 limits**: `c11_math_cbse_13_001` (intuitive idea), `c11_math_cbse_13_002` (algebraic methods).', 'Practice evaluating left-hand and right-hand limits separately for piecewise functions.', 'Re-do the three-condition checklist for **five** different functions (polynomial, rational, absolute value, greatest.', 'Write each condition explicitly: "f(c) = ...", "LHL = ...", "RHL = ...", "Limit = ...", "Conclusion".'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_002', difficulty: 'standard',
          question: 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the.',
          hint: 'If stuck, revisit Class 11 Limits: Algebraic Methods of Evaluation (c11_math_cbse_13_002).',
          misconception: 'Students often compute LHL and RHL correctly but forget to evaluate \\( f(c) \\) from the *correct piece* of the.',
          parts: [
                { id: 'a', prompt: 'State the precise mathematical condition for a function \\( f \\) to be continuous at \\( x = c \\) using left-hand limit, right-hand limit, and function value.', answer: 'Correct answer: \\( \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c) \\)',
                  options: ['Correct answer: \\( \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c) \\)', 'LHL = RHL'],
                  hint: 'If stuck, revisit Class 11 Limits: Algebraic Methods of Evaluation (c11_math_cbse_13_002) and.',
                  misconception: 'Students often compute LHL and RHL correctly but forget to evaluate \\( f(c) \\) from the *correct piece* of the definition.' }
          ],
            remediations: { 'students-often-compute-lhl-and': { steps: ['Re‑read the definition: circle the three required equalities.', 'For the problematic function, explicitly write which piece defines \\( f(c) \\) (look at the inequality sign: ≤, <, ≥, >).', 'Re‑evaluate LHL, RHL, and \\( f(c) \\) side‑by‑side in a table.', 'Practice with 5 piecewise functions where the boundary point uses a different formula than the side pieces (e.g., \\.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_003', difficulty: 'standard',
          question: 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two.',
          hint: 'Revisit c11_math_cbse_13_002 (algebra of limits) and c12_math_cbse_05_001 (continuity.',
          misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\).',
          parts: [
                { id: 'a', prompt: 'Explain why the function \\(h(x) = \\sin(x^2)\\) is continuous for all real \\(x\\) using the composition theorem.', answer: 'Correct answer: Let \\(g(x)=x^2\\) (inner) and \\(f(u)=\\sin u\\) (outer)',
                  options: ['Correct answer: Let \\(g(x)=x^2\\) (inner) and \\(f(u)=\\sin u\\) (outer)', 'both are continuous'],
                  hint: 'Revisit c11_math_cbse_13_002 (algebra of limits) and c12_math_cbse_05_001 (continuity definition).',
                  misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\) and \\(g\\) are.' },
                { id: 'b', prompt: 'Determine whether the function \\(F(x) = \\frac{x^2 - 4}{x - 2}\\) is continuous at \\(x = 2\\). If not, can you redefine \\(F(2)\\) to make it continuous?', answer: 'Correct answer: \\(F(x) = \\frac{(x-2)(x+2)}{x-2} = x+2\\) for \\(x \\neq 2\\)',
                  options: ['Correct answer: \\(F(x) = \\frac{(x-2)(x+2)}{x-2} = x+2\\) for \\(x \\neq 2\\)', '\\(F\\) is continuous'],
                  hint: 'Revisit c11_math_cbse_13_002 (algebra of limits) and c12_math_cbse_05_001 (continuity definition).',
                  misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\) and \\(g\\) are.' },
                { id: 'c', prompt: 'Compare the continuity of \\(f(x) = |x|\\) and \\(g(x) = \\frac{1}{|x|}\\) at \\(x=0\\). Why does the algebra of continuous functions give different conclusions?', answer: 'Correct answer: \\(f(x)=|x|\\) is continuous at \\(0\\) (Example 3, NCERT)',
                  options: ['Correct answer: \\(f(x)=|x|\\) is continuous at \\(0\\) (Example 3, NCERT)', '\\(1/|x|\\) is discontinuous at 0', 'not continuous', 'not defined'],
                  hint: 'Revisit c11_math_cbse_13_002 (algebra of limits) and c12_math_cbse_05_001 (continuity definition).',
                  misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\) and \\(g\\) are.' }
          ],
            remediations: { 'if-f-and-g-are': { steps: ['Revisit **c12_math_cbse_05_001** (definition of continuity at a point) and **c11_math_cbse_13_002** (algebra of limits).', 'Write down the exact hypotheses of Theorem 1 and Theorem 2 from NCERT 5.2.1, highlighting the "provided \\(g(c) \\neq.', 'Practice 5 problems where you must **explicitly state the domain** of each component function before applying the.', 'Re-attempt Diagnostic Questions 1, 2, and 4, this time writing the domain condition as a separate step.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_004', difficulty: 'standard',
          question: 'A function \\( f \\) is differentiable at a point \\( c \\) in its domain if the.',
          hint: 'Revisit one-sided limits (c12_math_cbse_05_002) and the definition of continuity.',
          misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.',
          parts: [
                { id: 'a', prompt: 'State the definition of the derivative of a function \\( f \\) at a point \\( x = c \\) using the limit of the difference quotient.', answer: 'The derivative is \\( f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h)-f(c)}{h} \\)',
                  options: ['The derivative is \\( f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h)-f(c)}{h} \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Revisit one-sided limits (c12_math_cbse_05_002) and the definition of continuity.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' },
                { id: 'b', prompt: 'The function \\( f(x) = |x-2| \\) is continuous at \\( x=2 \\) but not differentiable there.', answer: 'For \\( x<2 \\), \\( f(x)=2-x \\)',
                  options: ['For \\( x<2 \\), \\( f(x)=2-x \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Revisit one-sided limits (c12_math_cbse_05_002) and the definition of continuity.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' }
          ],
            remediations: { 'if-a-function-is-continuous': { steps: ['If a student confuses continuity with differentiability, first revisit the definition of continuity.', 'Then explicitly compute left and right derivatives for \\( f(x)=|x| \\) at 0, showing the algebraic step \\( |h|/h = -1 \\).', 'Next, practice piecewise functions: give \\( f(x) = \\begin{cases} x^2 & x \\le 0 \\\\ x & x > 0 \\end{cases} \\) and have the.', 'Finally, ask them to state in their own words: "Continuity is necessary but not sufficient for differentiability."'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_005', difficulty: 'standard',
          question: 'A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain.',
          hint: 'If stuck, revisit c11_math_cbse_13_008 (Derivative Using First Principle) and.',
          misconception: 'Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if both the',
                  options: ['A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if both the', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'If stuck, revisit c11_math_cbse_13_008 (Derivative Using First Principle) and c12_math_cbse_05_002.',
                  misconception: 'Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function is differentiable.' }
          ],
            remediations: { 'if-the-derivatives-of-the': { steps: ['If a student makes this error, guide them through the following steps: 1.', 'Revisit the definition of derivative at a point: \\( f\'(c) = \\lim_{h\\to 0} \\frac{f(c+h)-f(c)}{h} \\).', 'Emphasize that \\( f(c) \\) must exist and the limit must exist.', 'Show that if \\( f \\) is not continuous at \\( c \\), then \\( \\lim_{h\\to 0} f(c+h) \\neq f(c) \\), so the numerator \\.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_006', difficulty: 'standard',
          question: 'The chain rule states that if a function \\( y = f(x) \\) is a composite of two.',
          hint: 'If stuck, revisit Class 11 derivatives of standard functions (c11_math_cbse_13_010) and.',
          misconception: 'Students often write \\( \\frac{d}{dx} \\sin(x^2) = \\cos(x^2) \\) (forgetting the inner derivative \\( 2x \\)) or \\.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The chain rule states that if a function \\( y = f(x) \\) is a composite of two functions',
                  options: ['The chain rule states that if a function \\( y = f(x) \\) is a composite of two functions', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'If stuck, revisit Class 11 derivatives of standard functions (c11_math_cbse_13_010) and practice.',
                  misconception: 'Students often write \\( \\frac{d}{dx} \\sin(x^2) = \\cos(x^2) \\) (forgetting the inner derivative \\( 2x \\)) or \\( \\frac{d}{dx} \\sin(x^2).' }
          ],
            remediations: { 'students-often-write-frac-d': { steps: ['If a student makes the above errors, guide them through a "layer-peeling" exercise: 1.', 'Write the function as a composition of two functions: \\( y = f(u), u = g(x) \\).', 'Explicitly state \\( f(u) \\) and \\( g(x) \\).', 'Compute \\( \\frac{dy}{du} \\) and \\( \\frac{du}{dx} \\) separately.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
