import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch05_p2: SimDef = {
    id: 'v3_c12_math_ch05_p2',
    title: 'Continuity and Differentiability · Part 2/3',
    subtitle: 'The graph jumped — one equality failed',
    classLevel: 12, subject: 'mathematics', topic: 'Continuity and Differentiability · Part 2/3',
    chapters: ['c12_math_ch05'],
    nodeIds: ['c12_math_cbse_05_007', 'c12_math_cbse_05_008', 'c12_math_cbse_05_009', 'c12_math_cbse_05_010', 'c12_math_cbse_05_011', 'c12_math_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Continuity auditor', intro: 'A function is continuous where its limit and its value shake hands — three conditions make the handshake official.', goal: 'Verify continuity at a point via the three conditions and classify discontinuities by their left-right behaviour.' },
    discovery: {
        question: 'Draw any function without lifting your pen. What breaks at a sharp corner?',
        options: ['Differentiability — the slope jumps, so no single tangent exists', 'Continuity — the graph is broken', 'Nothing breaks, it is still a function', 'The function becomes undefined'],
        answer: 'Differentiability — the slope jumps, so no single tangent exists',
        hook: 'Smooth versus sharp — differentiability asks whether a curve has a single slope at a point. Corners fail.',
    },
    teaching: [
        { title: 'Derivatives of Implicit Functions', text: 'An implicit function is a relationship between variables x and y expressed as f(x, y) = 0 where y cannot be easily isolated as y = g(x).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_05_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Verify continuity like an auditor: run all three conditions on piecewise functions, classify each break as removable, jump or infinite, and find the parameter that stitches a seam shut.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_007', title: 'Derivatives of Implicit Functions',
          scaffold: { problem: 'A circular track has equation x² + y² = 100 (metres). Find the slope of the tangent at the point (6, 8) and interpret its meaning for.',
            steps: [
            { text: 'Write the given implicit relation: x² + y² = 100. Identify that we need dy/dx at (6, 8).' },
            { text: 'Differentiate both sides with respect to x: d/dx(x²) + d/dx(y²) = d/dx(100).' },
            { text: 'Apply derivatives: 2x + 2y·(dy/dx) = 0. (Chain rule on y² gives 2y·dy/dx).' },
            { text: 'Solve for dy/dx: 2y·(dy/dx) = -2x → dy/dx = -x/y.' },
            { text: 'Substitute the point (6, 8): dy/dx = -6/8 = -3/4. The negative slope means the track curves downward as x increases;.', faded: true, blankAnswer: 'dy/dx = -3/4 at (6, 8). Slope is -0.75 (dimensionless).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_008', title: 'Derivatives of Inverse Trigonometric Functions',
          scaffold: { problem: 'A camera is mounted on a pole 10 metres high. A car moves away from the pole at 20 m/s.',
            steps: [
            { text: 'Identify given and unknown. Given: pole height = 10 m, dx/dt = 20 m/s (car moving away), x = 15 m at the instant.' },
            { text: 'Write the relationship. tan θ = 10/x ⇒ θ = tan⁻¹(10/x). This is an inverse trigonometric function of x.' },
            { text: 'Differentiate with respect to time t using chain rule. dθ/dt = dθ/dx · dx/dt. First find dθ/dx = d/dx[tan⁻¹(10/x)].' },
            { text: 'Apply chain rule to tan⁻¹(10/x). Let u = 10/x. d/dx[tan⁻¹u] = (1/(1+u²)) · du/dx. Here du/dx = -10/x².' },
            { text: 'Substitute x = 15 m and dx/dt = 20 m/s. dθ/dt = (-10/(15²+100)) × 20 = (-10/325) × 20 = -200/325 = -8/13 rad/s.', faded: true, blankAnswer: '-8/13 rad/s (angle of depression decreasing at 8/13 rad/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_009', title: 'Logarithmic Differentiation',
          scaffold: { problem: 'The volume of a spherical balloon is given by \\( V = r^{r} \\) cubic cm, where radius \\( r \\) (in cm) changes with time.',
            steps: [
            { text: 'Identify function \\( V(r) = r^r \\) (variable base and exponent). Take natural log: \\( \\ln V = r \\ln r \\).' },
            { text: 'Differentiate both sides w.r.t. \\( r \\): \\( \\frac{1}{V} \\frac{dV}{dr} = \\ln r + r \\cdot \\frac{1}{r} = \\ln r + 1 \\).' },
            { text: 'Multiply by \\( V \\): \\( \\frac{dV}{dr} = V (\\ln r + 1) = r^r (\\ln r + 1) \\).' },
            { text: 'Substitute \\( r = 2 \\): \\( \\frac{dV}{dr} \\big|_{r=2} = 2^2 (\\ln 2 + 1) = 4 (\\ln 2 + 1) \\).' },
            { text: 'Compute numerical value: \\( \\ln 2 \\approx 0.693 \\), so \\( \\frac{dV}{dr} \\approx 4 \\times 1.693 = 6.772 \\) cm³/cm.', faded: true, blankAnswer: '\\( \\frac{dV}{dr} = 4(\\ln 2 + 1) \\) cm³/cm ≈ 6.772 cm³/cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_010', title: 'Derivatives of Functions in Parametric Form',
          scaffold: { problem: 'A particle moves along a curve such that its coordinates at time \\(t\\) seconds are \\(x = 2t^2 + 3t\\) metres and \\(y = t^3 - 4t\\) metres.',
            steps: [
            { text: 'Identify the parametric equations: \\(x = 2t^2 + 3t\\), \\(y = t^3 - 4t\\).' },
            { text: 'Differentiate \\(x\\) and \\(y\\) with respect to \\(t\\): \\(\\frac{dx}{dt} = 4t + 3\\), \\(\\frac{dy}{dt} = 3t^2 - 4\\).' },
            { text: 'Write the formula for \\(\\frac{dy}{dx}\\): \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2 - 4}{4t + 3}\\).' },
            { text: 'Substitute \\(t = 2\\): \\(\\frac{dy}{dx} = \\frac{3(4) - 4}{4(2) + 3} = \\frac{12 - 4}{8 + 3} = \\frac{8}{11}\\).' },
            { text: 'Interpret: The slope of the tangent at \\(t = 2\\) is \\(\\frac{8}{11}\\) (dimensionless).', faded: true, blankAnswer: '\\(\\frac{8}{11}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_011', title: 'Second Order Derivatives',
          scaffold: { problem: 'A particle moves along a straight line such that its displacement \\(s\\) (in metres) at time \\(t\\) (in seconds) is given by \\(s(t) = 4t^3.',
            steps: [
            { text: 'Write the given displacement function: \\(s(t) = 4t^3 - 15t^2 + 18t + 5\\).' },
            { text: 'Find velocity \\(v(t) = \\frac{ds}{dt}\\) by differentiating once using power rule and sum rule:' },
            { text: 'Find acceleration \\(a(t) = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}\\) by differentiating velocity:' },
            { text: 'Evaluate at \\(t = 2\\):' },
            { text: 'Interpret: At \\(t=2\\) s, the particle is moving forward (positive velocity) and speeding up (positive acceleration.', faded: true, blankAnswer: 'Velocity = 6 m/s, Acceleration = 18 m/s². The particle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_012', title: 'Rolle\'s Theorem: Statement and Proof',
          scaffold: { problem: 'Verify Rolle\'s Theorem for f(x) = x³ − 6x² + 11x − 6 on [1, 3]. Find all values of c ∈ (1, 3) satisfying f\'(c) = 0.',
            steps: [
            { text: 'Check condition 1 — f(x) is a polynomial, so it is continuous on the closed interval [1, 3].' },
            { text: 'Check condition 2 — f(x) is a polynomial, so it is differentiable on the open interval (1, 3) (in fact on ℝ).' },
            { text: 'Check condition 3 — f(1) = 1 − 6 + 11 − 6 = 0, f(3) = 27 − 54 + 33 − 6 = 0. Thus f(1) = f(3) = 0.' },
            { text: 'All conditions satisfied. Compute derivative: f\'(x) = 3x² − 12x + 11.' },
            { text: 'Set f\'(c) = 0 ⇒ 3c² − 12c + 11 = 0 ⇒ c = [12 ± √(144 − 132)]/6 = [12 ± √12]/6 = 2 ± √3/3.' },
            { text: 'Check interval membership: √3/3 ≈ 0.577, so c₁ = 2 − 0.577 = 1.423 ∈ (1, 3), c₂ = 2 + 0.577 = 2.577 ∈ (1, 3).', faded: true, blankAnswer: 'c = 2 − √3/3 and c = 2 + √3/3 (both in (1, 3))' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_05_012', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup\'s pay banding pays ₹40,000/month for tenure under 3 years and \'₹48,000 starting the day you hit 3 years.\' An engineer plots the salary function and asks whether it \'jumps\' at the 3-year mark.',
            decisions: [{ prompt: 'What does the continuity test say?', options: [
                { text: 'Check all three quantities — the left-hand limit (₹40,000 as tenure approaches 3 years), the right-hand limit (₹48,000 just past it) and the defined value at exactly 3 years; a ₹8,000 overnight gap means LHL ≠ RHL, so the pay function is discontinuous at the boundary.', outcome: 'The chapter\'s criterion needs the two limits and the point-value to agree — a cliff in the rule is a discontinuity the moment the band ticks over, whatever HR calls it.' },
                { text: 'It\'s continuous — salary is defined at every tenure, so there\'s no break.', outcome: 'Defined everywhere isn\'t continuous anywhere: a jump discontinuity still assigns a value at the boundary; the test is whether approaching from either side lands on the same number.', reveals: 'defined-equals-continuous' },
                { text: 'It\'s continuous if the rule says \'at 3 years you get 48k\' — the point value matches the right side.', outcome: 'Matching one side isn\'t the test — continuity needs LHL, RHL and f(c) all equal; matching f(3) to the right limit still leaves a ₹8,000 gap on the left.', reveals: 'one-side-match-suffices' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'Continuity is survival; differentiability is smoothness. Every calculus result ahead of you assumes both.',
            decisions: [{ prompt: 'What comes next? Continuity and Differentiability · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Continuity and Differentiability · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_05_007', difficulty: 'standard',
          question: 'An implicit function is a relationship between variables x and y expressed.',
          hint: 'Revisit c12_math_cbse_05_006 (Chain Rule) and practice "identify the inner function".',
          misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx.',
          parts: [
                { id: 'a', prompt: 'Explain why we write d/dx(y²) = 2y · dy/dx instead of just 2y when differentiating x² + y² = 25 implicitly.', answer: 'Because y is a function of x, not an independent variable',
                  options: ['Because y is a function of x, not an independent variable', 'y is just a variable'],
                  hint: 'Revisit c12_math_cbse_05_006 (Chain Rule) and practice "identify the inner function" drills with.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' },
                { id: 'b', prompt: 'Compare the process and result of finding dy/dx for x² + y² = 25 by (a) implicit differentiation and (b) solving for y explicitly then differentiating.', answer: 'implicit differentiation and (',
                  options: ['implicit differentiation and (', 'they\'re always the same'],
                  hint: 'Revisit c12_math_cbse_05_006 (Chain Rule) and practice "identify the inner function" drills with.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' }
          ],
            remediations: { 'students-consistently-forget-to-apply': { steps: ['Have the student identify every term containing y in the equation.', 'For each such term, write the derivative as (derivative w.r.t y) × (dy/dx).', 'Practice with simple cases: d/dx(y) = dy/dx, d/dx(y²) = 2y·dy/dx, d/dx(sin y) = cos y·dy/dx.', 'Revisit c12_math_cbse_05_006 (Chain Rule) and do 5 drill problems where they only identify the chain rule factors.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_008', difficulty: 'standard',
          question: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\.',
          hint: 'Review implicit differentiation (c12_math_cbse_05_007) and the principal value branch.',
          misconception: 'Students write \\( \\frac{d}{dx}(\\sin^{-1}(2x)) = \\frac{1}{\\sqrt{1-(2x)^2}} \\) forgetting the chain rule factor of 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x',
                  options: ['The derivative of an inverse trigonometric function \\( y = \\sin^{-1}x \\), \\( \\cos^{-1}x', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'Review implicit differentiation (c12_math_cbse_05_007) and the principal value branch table for.',
                  misconception: 'Students write \\( \\frac{d}{dx}(\\sin^{-1}(2x)) = \\frac{1}{\\sqrt{1-(2x)^2}} \\) forgetting the chain rule factor of 2.' }
          ],
            remediations: { 'students-write-frac-d-dx': { steps: ['If a student makes the chain rule error, have them redo c12_math_cbse_05_006 (Chain Rule) with 5 practice problems.', 'If they confuse \\( \\sin^{-1} \\) with \\( \\csc \\), revisit c11_math_cbse_03_003 (Trigonometric Functions Definition) and.', 'For sign errors in radicals, make them explicitly write the principal value range for each inverse trig function and.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_009', difficulty: 'standard',
          question: 'Logarithmic differentiation is a technique used to differentiate functions.',
          hint: 'Revisit the chain rule node (c12_math_cbse_05_006) and practice differentiating \\.',
          misconception: '**Misconception:** Students often forget to multiply by the original function \\( y \\) after differentiating \\( \\ln.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Logarithmic differentiation is a technique used to differentiate functions of the form \\(',
                  options: ['Logarithmic differentiation is a technique used to differentiate functions of the form \\(', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'Revisit the chain rule node (c12_math_cbse_05_006) and practice differentiating \\( \\ln(\\sin x) \\).',
                  misconception: '**Misconception:** Students often forget to multiply by the original function \\( y \\) after differentiating \\( \\ln y \\).' }
          ],
            remediations: { 'misconception-students-often-forget-to': { steps: ['Take ln.', 'Differentiate: (1/y) dy/dx = ...', 'Multiply by y: dy/dx = y × (...).', 'Substitute y back." Use a checklist on paper. For domain errors, ask them to find the domain of \\( y = (\\sin x)^{\\cos.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_010', difficulty: 'standard',
          question: 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable.',
          hint: 'If stuck, revisit c12_math_cbse_05_006 (Chain Rule) and practice differentiating.',
          misconception: 'Students often forget that \\(\\frac{dy}{dx}\\) in parametric form is a function of the parameter \\(t\\), not \\(x\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)',
                  options: ['If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'If stuck, revisit c12_math_cbse_05_006 (Chain Rule) and practice differentiating functions like.',
                  misconception: 'Students often forget that \\(\\frac{dy}{dx}\\) in parametric form is a function of the parameter \\(t\\), not \\(x\\).' }
          ],
            remediations: { 'students-often-forget-that-frac': { steps: ['If a student inverts the quotient, have them re-derive the formula from the chain rule: \\(\\frac{dy}{dt} = \\frac{dy}{dx}.', 'Then isolate \\(\\frac{dy}{dx}\\) step by step.', 'If they substitute \\(t\\) too early, give them \\(x = t^2, y = t^3\\) and ask for \\(\\frac{dy}{dx}\\) at \\(t = -1\\).', 'Show that substituting \\(t = \\sqrt{x}\\) gives the wrong sign.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_011', difficulty: 'standard',
          question: 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its.',
          hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions.',
          misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).',
          parts: [
                { id: 'a', prompt: 'What is the mathematical definition of the second order derivative of a function \\(y = f(x)\\)? Write the notation used for it.', answer: 'The second order derivative is the derivative of the first derivative:',
                  options: ['The second order derivative is the derivative of the first derivative:', 'square of first derivative', 'derivative of \\(y\\) with respect to \\(x^2\\)'],
                  hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions and.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'b', prompt: 'Explain why the second derivative of any linear function \\(f(x) = ax + b\\) is zero. What does this mean geometrically for the graph of the function?', answer: 'For \\(f(x) = ax + b\\), the first derivative \\(f\'(x) = a\\) is a constant',
                  options: ['For \\(f(x) = ax + b\\), the first derivative \\(f\'(x) = a\\) is a constant', 'second derivative is \\(a\\)'],
                  hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions and.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'c', prompt: 'Find the second order derivative of \\(y = x^3 \\log x\\) (where \\(\\log\\) denotes natural logarithm). Show all steps.', answer: 'Step 1: \\(y = x^3 \\log x\\)',
                  options: ['Step 1: \\(y = x^3 \\log x\\)', 'forget the chain/product rule on the second pass'],
                  hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions and.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'd', prompt: 'Compare the process of finding \\(\\frac{d^2y}{dx^2}\\) for an explicit function \\(y = x^2 \\sin x\\) versus a parametric function \\(x = a(\\theta + \\sin \\theta),.', answer: 'For explicit \\(y = f(x)\\): differentiate twice directly w.r.t \\(x\\): \\(y_1 =',
                  options: ['For explicit \\(y = f(x)\\): differentiate twice directly w.r.t \\(x\\): \\(y_1 =', 'just differentiate \\(y\\) twice w.r.t \\(\\theta\\)', 'says "just differentiate \\(y\\) twice w'],
                  hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions and.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' }
          ],
            remediations: { 'misconception-frac-d-2y-dx': { steps: ['**Revisit notation:** Write \\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)\\) explicitly on paper every.', 'Say aloud: "derivative of the derivative." 2.', '**Drill first-derivative rules:** Do 5 quick problems from c12_math_cbse_05_006 (Chain Rule) and c12_math_cbse_05_010.', '**Practice the parametric second-derivative pattern:** For \\(x = f(t), y = g(t)\\), write the template: \\(\\frac{dy}{dx}.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_012', difficulty: 'standard',
          question: 'Rolle\'s Theorem states that if a real-valued function f is continuous on the.',
          hint: 'If stuck, revisit c12_math_cbse_05_005 (Differentiability at a Point) to practice.',
          misconception: 'Students often write "f is differentiable on [a, b]" instead of "f is differentiable on (a, b)" when stating the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rolle\'s Theorem states that if a real-valued function f is continuous on the closed',
                  options: ['Rolle\'s Theorem states that if a real-valued function f is continuous on the closed', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'If stuck, revisit c12_math_cbse_05_005 (Differentiability at a Point) to practice left/right.',
                  misconception: 'Students often write "f is differentiable on [a, b]" instead of "f is differentiable on (a, b)" when stating the theorem.' }
          ],
            remediations: { 'students-often-write-f-is': { steps: ['If a student cannot correctly apply Rolle\'s Theorem: (1) Make them write the three conditions as a checklist: [ ].', '[ ] Differentiable on (a,b)?', '(2) For each condition, have them explicitly test it — e.g., for differentiability, compute left and right derivatives.', '(3) Practice with f(x) = x^{2/3} on [−1,1] (fails differentiability at 0) and f(x) = {x² if x≤1, 2−x if x>1} on [0,2].'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
