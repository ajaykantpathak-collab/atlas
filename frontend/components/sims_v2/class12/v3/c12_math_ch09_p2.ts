import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch09_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch09_p2: SimDef = {
    id: 'v3_c12_math_ch09_p2',
    title: 'Differential Equations · Part 2/2',
    subtitle: 'The exponent said 4 — the highest derivative said 2',
    classLevel: 12, subject: 'mathematics', topic: 'Differential Equations · Part 2/2',
    chapters: ['c12_math_ch09'],
    nodeIds: ['c12_math_cbse_09_007', 'c12_math_cbse_09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Equation classifier', intro: 'Any law that says \'rate depends on the quantity\' becomes a differential equation — first learn to read its skeleton.', goal: 'Identify differential equations and their order — highest derivative rules, exponents don\'t.' },
    discovery: {
        question: '\'d²y/dx² cubed, plus (dy/dx) to the fourth\' — a student calls this order 4 because of the exponent. What\'s the actual order?',
        options: ['2 — order is the highest derivative present, not the power it\'s raised to; exponents belong to degree, a different question entirely', '4 — the highest power anywhere in the equation sets its order', '3 — order counts the number of derivative terms present', '1 — only the first derivative determines a differential equation\'s order'],
        answer: '2 — order is the highest derivative present, not the power it\'s raised to; exponents belong to degree, a different question entirely',
        hook: 'A differential equation needs a derivative to be one — \'x² − 5x + 6 = 0\' is just algebra. Cooling chai wrote the first one you\'ll meet: dT/dt = −k(T − T_room), order 1, because the rate of cooling depends on the temperature itself.',
    },
    teaching: [
        { title: 'Linear Differential Equations: dy/dx + Py = Q', text: 'A first-order linear differential equation is an equation of the form \\(\\frac{dy}{dx} + P(x)y = Q(x)\\), where \\(P\\) and \\(Q\\) are functions of \\(x\\) only (or constants).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_09_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Interrogate any equation: decide if it\'s a differential equation, name the highest derivative for the order, and keep order versus degree separate in your head.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_007', title: 'Linear Differential Equations: dy/dx + Py = Q',
          scaffold: { problem: 'A bacteria culture grows at a rate proportional to its current population, but a constant harvesting rate of 100 bacteria per hour.',
            steps: [
            { text: 'Let \\(N(t)\\) be population at time \\(t\\) hours. Growth rate = \\(0.1 N\\), harvesting rate = 100.' },
            { text: 'Rewrite as linear DE: \\(\\frac{dN}{dt} - 0.1N = -100\\). Here \\(P = -0.1\\), \\(Q = -100\\).' },
            { text: 'Integrating factor \\(\\text{I.F.} = e^{\\int -0.1 \\, dt} = e^{-0.1t}\\).' },
            { text: 'Multiply: \\(e^{-0.1t} \\frac{dN}{dt} - 0.1 e^{-0.1t} N = -100 e^{-0.1t}\\). Left side is \\(\\frac{d}{dt}(N e^{-0.1t})\\).' },
            { text: 'Integrate: \\(N e^{-0.1t} = \\int -100 e^{-0.1t} \\, dt = \\frac{-100}{-0.1} e^{-0.1t} + C = 1000 e^{-0.1t} + C\\).' },
            { text: 'Solve for \\(N\\): \\(N = 1000 + C e^{0.1t}\\). Use initial condition \\(N(0)=5000\\): \\(5000 = 1000 + C \\Rightarrow.' },
            { text: '\\(N(t) = 1000 + 4000 e^{0.1t}\\). At \\(t=2\\): \\(N(2) = 1000 + 4000 e^{0.2} \\approx 1000 + 4000 \\times 1.2214 = 1000.', faded: true, blankAnswer: 'Approximately 5886 bacteria after 2 hours.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_008', title: 'Exact Differential Equations',
          scaffold: { problem: 'A thermodynamics experiment gives the differential relation \\((2xy^3 + 3x^2)dx + (3x^2y^2 + 4y^3)dy = 0\\) for a certain process.',
            steps: [
            { text: 'Identify \\(M = 2xy^3 + 3x^2\\) and \\(N = 3x^2y^2 + 4y^3\\).' },
            { text: 'Check exactness: \\(\\frac{\\partial M}{\\partial y} = 6xy^2\\), \\(\\frac{\\partial N}{\\partial x} = 6xy^2\\).' },
            { text: 'Integrate \\(M\\) with respect to \\(x\\): \\(F(x,y) = \\int (2xy^3 + 3x^2) dx = x^2y^3 + x^3 + g(y)\\).' },
            { text: 'Differentiate \\(F\\) with respect to \\(y\\): \\(\\frac{\\partial F}{\\partial y} = 3x^2y^2 + g\'(y)\\).' },
            { text: 'Integrate \\(g\'(y)\\): \\(g(y) = \\int 4y^3 dy = y^4 + C_1\\). So \\(F(x,y) = x^2y^3 + x^3 + y^4\\).' },
            { text: 'General solution: \\(x^2y^3 + x^3 + y^4 = C\\).' },
            { text: 'Apply initial condition \\((1,1)\\): \\(1^2\\cdot1^3 + 1^3 + 1^4 = 1+1+1=3 = C\\).' },
            { text: 'Particular solution: \\(x^2y^3 + x^3 + y^4 = 3\\).', faded: true, blankAnswer: 'General solution: \\(x^2y^3 + x^3 + y^4 = C\\). Particular.' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_09_008', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate modelling a pendulum writes √(d²θ/dt²) + (dθ/dt)² = 0 and files it as \'order 2, degree 1 — the second derivative is to the first power.\'',
            decisions: [{ prompt: 'Is the degree call correct?', options: [
                { text: 'No — order 2 is right, but the degree isn\'t defined: the equation isn\'t a polynomial in its derivatives while √(θ″) is a fractional power; degree only exists when every derivative appears to whole-number powers.', outcome: 'The chapter\'s rule: degree is judged on the equation\'s given form — a radical on the highest derivative disqualifies it, even if squaring would later tidy it.' },
                { text: 'He\'s right — under the radical the second derivative has power one.', outcome: 'The radical wraps the derivative, so its actual exponent is ½, not 1; \'inside the root it\'s power one\' is exactly the misread the definition blocks.', reveals: 'under-radical-counts' },
                { text: 'Square the equation first, then read the degree — it becomes degree 1.', outcome: 'Degree is defined for the equation as given, not the polynomial you\'d get after manipulation; rewriting changes the object being classified.', reveals: 'manipulate-then-classify' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_09_008', title: 'You made it',
          caseStudy: { intro: 'You can now read a differential equation\'s skeleton — derivative present, order named, ordinary versus partial sorted.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_09_007', difficulty: 'standard',
          question: 'A first-order linear differential equation is an equation of the form.',
          hint: 'If stuck, revisit Class 11 derivative rules (c11_math_cbse_13_009) and integration.',
          misconception: 'Students often write the solution as \\(y = \\frac{1}{\\text{I.F.}} \\int Q \\cdot \\text{I.F.} \\, dx + C\\) instead of \\(y.',
          parts: [
                { id: 'a', prompt: 'Explain why the equation \\(\\frac{dy}{dx} + y^2 = x\\) is NOT a linear differential equation, even though it has \\(\\frac{dy}{dx}\\) and \\(y\\) terms.', answer: 'The term \\(y^2\\) makes the equation nonlinear',
                  options: ['The term \\(y^2\\) makes the equation nonlinear', 'it has \\(y^2\\) so it\'s nonlinear'],
                  hint: 'If stuck, revisit Class 11 derivative rules (c11_math_cbse_13_009) and integration.',
                  misconception: 'Students often write the solution as \\(y = \\frac{1}{\\text{I.F.}} \\int Q \\cdot \\text{I.F.} \\, dx + C\\) instead of \\(y.' }
          ],
            remediations: { 'students-often-write-the-solution': { steps: ['Re-derive the integrating factor method from scratch: start with \\(\\frac{dy}{dx} + Py = Q\\), multiply by unknown.', 'Show that \\(\\frac{d}{dx}(y g) = Q g\\) leads to \\(y g = \\int Q g \\, dx + C\\).', 'Emphasize that \\(C\\) is added *inside* the expression before dividing by \\(g\\).', 'Practice two problems where \\(P\\) is a function of \\(x\\) (e.g., \\(\\frac{dy}{dx} + \\frac{2}{x}y = x^3\\)) and explicitly.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_008', difficulty: 'standard',
          question: 'A first-order first-degree differential equation of the form \\(M(x,y)dx.',
          hint: 'Revisit Class 11 Limits and Derivatives (c11_math_cbse_13_007, c11_math_cbse_13_009) and.',
          misconception: '**Misconception:** "When integrating \\(M\\) with respect to \\(x\\) to find \\(F\\), the \'constant\' of integration is just.',
          parts: [
                { id: 'a', prompt: 'A student claims that the differential equation \\((y^2)dx + (2xy)dy = 0\\) is exact because \\(\\frac{\\partial}{\\partial y}(y^2) = 2y\\) and.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'constant'],
                  hint: 'Revisit Class 11 Limits and Derivatives (c11_math_cbse_13_007, c11_math_cbse_13_009) and practice.',
                  misconception: '**Misconception:** "When integrating \\(M\\) with respect to \\(x\\) to find \\(F\\), the \'constant\' of integration is just a number \\(C\\), not.' }
          ],
            remediations: { 'misconception-when-integrating-m-with': { steps: ['If the student makes the above error: 1.', '**Revisit partial differentiation**: Review Class 11 limits/derivatives (c11_math_cbse_13_007, c11_math_cbse_13_008).', '**Do a guided example**: Take \\((3x^2+2y)dx + (2x+4y^3)dy=0\\).', 'Ask: "Integrate \\(M\\) w.r.t \\(x\\).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
