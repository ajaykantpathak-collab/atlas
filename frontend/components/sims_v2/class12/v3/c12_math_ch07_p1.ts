import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch07_p1: SimDef = {
    id: 'v3_c12_math_ch07_p1',
    title: 'Integrals · Part 1/2',
    subtitle: 'Differentiation forgets the constant — integration must guess',
    classLevel: 12, subject: 'mathematics', topic: 'Integrals · Part 1/2',
    chapters: ['c12_math_ch07'],
    nodeIds: ['c12_math_cbse_07_001', 'c12_math_cbse_07_002', 'c12_math_cbse_07_003', 'c12_math_cbse_07_004', 'c12_math_cbse_07_005', 'c12_math_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Antiderivative hunter', intro: 'Every derivative formula is a treasure map read backwards — and the +C marks all the starting points it erased.', goal: 'Master indefinite integration as inverse differentiation — standard forms, +C, and verification.' },
    discovery: {
        question: 'Add up infinitely many infinitely-thin strips of area. What do you get?',
        options: ['A finite area — the definite integral', 'Infinity — strips add without bound', 'Zero — thin strips have no area', 'It depends on the pen thickness'],
        answer: 'A finite area — the definite integral',
        hook: 'Integration is the art of making infinity finite. That paradox is the engine of all of physics.',
    },
    teaching: [
        { title: 'Integration as Inverse of Differentiation', text: 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek a function \\(F(x)\\) such that \\(F\'(x) = f(x)\\) for all \\(x\\) in an interval.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_07_001', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Read every derivative formula backwards: integrate polynomials, spot where the power rule fails, catch the chain-rule compensation, and always prove it by re-differentiating.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_001', title: 'Integration as Inverse of Differentiation',
          scaffold: { problem: 'A particle moves along a straight line with acceleration \\(a(t) = 6t - 4\\) m/s².',
            steps: [
            { text: 'Write the integral for velocity: \\(v(t) = \\int a(t)\\,dt = \\int (6t - 4)\\,dt\\).' },
            { text: 'Integrate term by term: \\(\\int 6t\\,dt = 6 \\cdot \\frac{t^2}{2} = 3t^2\\); \\(\\int -4\\,dt = -4t\\).' },
            { text: 'Combine and add constant: \\(v(t) = 3t^2 - 4t + C\\).' },
            { text: 'Use initial condition \\(v(0) = 5\\): \\(5 = 3(0)^2 - 4(0) + C \\Rightarrow C = 5\\).' },
            { text: 'Write the final velocity function: \\(v(t) = 3t^2 - 4t + 5\\) m/s.', faded: true, blankAnswer: '\\(v(t) = 3t^2 - 4t + 5\\) m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_002', title: 'Integration by Substitution: Method',
          scaffold: { problem: 'A car\'s velocity is given by v(t) = 3t² cos(t³ + 2) m/s. Find the displacement from t = 0 to t = 1 s.',
            steps: [
            { text: 'Identify the integral for displacement: s = ∫_0^1 v(t) dt = ∫_0^1 3t² cos(t³ + 2) dt.' },
            { text: 'Notice the inner function t³ + 2 and its derivative 3t². Set u = t³ + 2, so du = 3t² dt.' },
            { text: 'Change limits: when t = 0, u = 0³ + 2 = 2; when t = 1, u = 1³ + 2 = 3.' },
            { text: 'Substitute: ∫_0^1 3t² cos(t³ + 2) dt = ∫_2^3 cos u du.' },
            { text: 'Integrate: ∫ cos u du = sin u |_2^3 = sin 3 - sin 2.', faded: true, blankAnswer: 'sin 3 - sin 2 meters' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_003', title: 'Integration Using Partial Fractions',
          scaffold: { problem: 'A factory\'s marginal cost function is \\( MC(x) = \\frac{4x+5}{x^2+3x+2} \\) rupees per unit, where x is the number of units produced (in.',
            steps: [
            { text: 'Recognize that total cost is the integral of marginal cost: \\( C(x) = \\int MC(x) \\, dx = \\int \\frac{4x+5}{x^2+3x+2} \\.' },
            { text: 'Factor the denominator: \\( x^2+3x+2 = (x+1)(x+2) \\). The integrand is proper (degree 1 < degree 2).' },
            { text: 'Set up partial fractions: \\( \\frac{4x+5}{(x+1)(x+2)} = \\frac{A}{x+1} + \\frac{B}{x+2} \\).' },
            { text: 'Equate numerators: \\( 4x+5 = A(x+2) + B(x+1) = (A+B)x + (2A+B) \\). Solve: \\( A+B=4 \\), \\( 2A+B=5 \\) → \\( A=1, B=3 \\).' },
            { text: 'Integrate: \\( \\int \\left( \\frac{1}{x+1} + \\frac{3}{x+2} \\right) dx = \\log|x+1| + 3\\log|x+2| + K \\).' },
            { text: 'Apply fixed cost: When \\( x=0 \\), \\( C(0) = 10000 \\). So \\( 10000 = \\log|1| + 3\\log|2| + K = 3\\log 2 + K \\) → \\(.' },
            { text: 'Total cost function: \\( C(x) = \\log|x+1| + 3\\log|x+2| + 10000 - 3\\log 2 \\) rupees.', faded: true, blankAnswer: '\\( C(x) = \\log|x+1| + 3\\log|x+2| + 10000 - 3\\log 2 \\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_004', title: 'Integration by Parts: Rule and Formula',
          scaffold: { problem: 'A startup in Pune models its monthly revenue rate as R\'(t) = t e^(0.1t) lakh rupees per month, where t is months since launch.',
            steps: [
            { text: 'Total revenue = ∫₀¹⁰ R\'(t) dt = ∫₀¹⁰ t e^(0.1t) dt. Identify u = t (algebraic), dv = e^(0.1t) dt (exponential).' },
            { text: 'Compute du = dt, v = ∫ e^(0.1t) dt = 10 e^(0.1t).' },
            { text: 'Apply integration by parts: ∫ t e^(0.1t) dt = t·10e^(0.1t) - ∫ 10e^(0.1t) dt = 10t e^(0.1t) - 100 e^(0.1t).' },
            { text: 'Evaluate definite integral: [10t e^(0.1t) - 100 e^(0.1t)]₀¹⁰ = (100e¹ - 100e¹) - (0 - 100e⁰) = 0 - (-100) = 100.' },
            { text: 'Total revenue = 100 lakh rupees = ₹1 crore.', faded: true, blankAnswer: '₹1 crore' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_005', title: 'Standard Integrals of Trigonometric Functions',
          scaffold: { problem: 'A particle moves along a straight line with velocity v(t) = 4 sin(3t) + 2 cos(3t) m/s. Find its displacement function s(t) given s(0) = 0.',
            steps: [
            { text: 'Write the displacement as the antiderivative of velocity: s(t) = ∫ v(t) dt = ∫ [4 sin(3t) + 2 cos(3t)] dt.' },
            { text: 'Use linearity of integration: s(t) = 4 ∫ sin(3t) dt + 2 ∫ cos(3t) dt.' },
            { text: 'Apply the standard integrals with linear arguments: ∫ sin(3t) dt = –(1/3) cos(3t) + C₁, ∫ cos(3t) dt = (1/3) sin(3t).' },
            { text: 'Substitute: s(t) = 4[–(1/3) cos(3t)] + 2[(1/3) sin(3t)] + C = –(4/3) cos(3t) + (2/3) sin(3t) + C.' },
            { text: 'Use initial condition s(0)=0: 0 = –(4/3) cos 0 + (2/3) sin 0 + C = –4/3 + C ⇒ C = 4/3.', faded: true, blankAnswer: 's(t) = (2/3) sin(3t) – (4/3) cos(3t) + 4/3 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_006', title: 'Standard Integrals of Exponential and Logarithmic Functions',
          scaffold: { problem: 'The rate of growth of a bacteria culture (in thousands per hour) is given by \\(\\frac{dP}{dt} = 200 e^{0.15t}\\).',
            steps: [
            { text: 'Identify that we need to integrate the rate function to get the population: \\(P(t) = \\int 200 e^{0.15t}\\,dt\\).' },
            { text: 'Factor out the constant: \\(200 \\int e^{0.15t}\\,dt\\).' },
            { text: 'Use the standard integral \\(\\int e^{kt}\\,dt = \\frac{1}{k}e^{kt}+C\\) with \\(k=0.15\\): \\(\\int e^{0.15t}\\,dt.' },
            { text: 'Multiply by 200: \\(P(t) = 200 \\cdot \\frac{20}{3}e^{0.15t} + C = \\frac{4000}{3}e^{0.15t} + C\\).' },
            { text: 'Apply initial condition \\(P(0)=5\\) (since population is in thousands): \\(5 = \\frac{4000}{3}e^{0} + C = \\frac{4000}{3}.' },
            { text: 'Write final answer: \\(P(t) = \\frac{4000}{3}e^{0.15t} - \\frac{3985}{3}\\) (in thousands).', faded: true, blankAnswer: '\\(P(t) = \\frac{4000}{3}e^{0.15t} - \\frac{3985}{3}\\).' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_07_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Estimating a car\'s distance from a velocity readout v(t) = 2t·sin(t² + 1), your teammate tries \'u = sin(t²+1)\' and gets a mess, then declares the integral \'unsolvable by substitution.\'',
            decisions: [{ prompt: 'What was the substitution supposed to look for?', options: [
                { text: 'The function-plus-derivative pair — let u = t²+1 so du = 2t dt is exactly the factor sitting outside sine; the integral collapses to ∫ sin u du, and for a definite integral convert the limits too.', outcome: 'The chapter\'s pattern: substitution works when the integrand already contains the inner function\'s derivative — choosing the outer function leaves x\'s stranded inside du.' },
                { text: 'He\'s right — if the first substitution fails, the integral isn\'t meant for substitution.', outcome: 'A bad first choice isn\'t a verdict on the method — the test is whether du appears as a factor; u = t²+1 passes it instantly, so the technique was never disproved.', reveals: 'first-fail-ends-method' },
                { text: 'Try u = 2t instead — simplify the coefficient first, then the rest follows.', outcome: 'That trades the wrong variable for an irrelevant one — du = 2dt still leaves sin(t²+1) in t and the t-factor unresolved; the derivative must match what\'s multiplying the differential.', reveals: 'any-u-is-worth-trying' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Substitution, parts, partial fractions — you can now sum the infinite. This is the tool Newton built physics with.',
            decisions: [{ prompt: 'What comes next? Integrals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Integrals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_07_001', difficulty: 'standard',
          question: 'Integration is the inverse process of differentiation: given a function.',
          hint: 'If stuck, revisit Class 11 derivative formulas (c11_math_cbse_13_007.',
          misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x >.',
          parts: [
                { id: 'a', prompt: 'What is the most general antiderivative of \\(f(x) = \\cos x\\)? Write the answer in the standard notation for an indefinite integral.', answer: '\\(\\int \\cos x\\,dx = \\sin x + C\\)',
                  options: ['\\(\\int \\cos x\\,dx = \\sin x + C\\)', '\\(\\sin x\\)', '\\(-\\sin x + C\\)'],
                  hint: 'If stuck, revisit Class 11 derivative formulas (c11_math_cbse_13_007, c11_math_cbse_13_010) and.',
                  misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x > 0\\).' },
                { id: 'b', prompt: 'Two students compute \\(\\int \\sec^2 x\\,dx\\). Student A writes \\(\\tan x + C\\). Student B writes \\(-\\cot x + C\\). Are both correct?', answer: 'Only Student A is correct',
                  options: ['Only Student A is correct', 'both are correct confuses the derivatives of \\(\\tan x\\) and \\(\\cot x\\)'],
                  hint: 'If stuck, revisit Class 11 derivative formulas (c11_math_cbse_13_007, c11_math_cbse_13_010) and.',
                  misconception: 'Students often write \\(\\int \\frac{1}{x}\\,dx = \\ln x + C\\) (without absolute value) because they only consider \\(x > 0\\).' }
          ],
            remediations: { 'students-often-write-int-frac': { steps: ['If a student misses the constant \\(C\\), have them differentiate \\(F(x) = x^2\\) and \\(G(x) = x^2 + 5\\) and observe both.', 'Then ask: "If I only give you \\(2x\\), which one is the original?', 'Both are possible, so we write \\(x^2 + C\\)." For the chain rule error, have them differentiate \\(\\sin(2x)\\) and see the.', 'Then ask: "What must we multiply by to cancel that \\(2\\)?" Guide them to \\(\\frac{1}{2}\\sin(2x)\\).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_002', difficulty: 'standard',
          question: 'Integration by substitution is a technique where we change the variable.',
          hint: 'If stuck, review the chain rule (c11_math_cbse_13_009) and basic integration formulas.',
          misconception: 'Students often forget to change the differential dx when substituting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration by substitution is a technique where we change the variable of integration to',
                  options: ['Integration by substitution is a technique where we change the variable of integration to', 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek', 'Integration by partial fractions is a technique to integrate a proper rational function', 'Integration by parts is a technique derived from the product rule of differentiation that'],
                  hint: 'If stuck, review the chain rule (c11_math_cbse_13_009) and basic integration formulas.',
                  misconception: 'Students often forget to change the differential dx when substituting.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['If a student makes the differential error, have them practice the step: "Write u = ..., then du = ...', 'dx, so dx = du / ..." explicitly.', 'For limit errors, have them create a table: x = a → u = g(a), x = b → u = g(b).', 'Emphasize that after substitution, the integral is entirely in u with u-limits.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_003', difficulty: 'standard',
          question: 'Integration by partial fractions is a technique to integrate a proper rational.',
          hint: 'If stuck, revisit factorisation of quadratics (c9_math_ch4_8) and solving linear.',
          misconception: 'Students often write the partial fraction form for a repeated linear factor \\( (x-a)^2 \\) as \\( \\frac{A}{(x-a)^2} \\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration by partial fractions is a technique to integrate a proper rational function',
                  options: ['Integration by partial fractions is a technique to integrate a proper rational function', 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek', 'Integration by substitution is a technique where we change the variable of integration to', 'Integration by parts is a technique derived from the product rule of differentiation that'],
                  hint: 'If stuck, revisit factorisation of quadratics (c9_math_ch4_8) and solving linear equations.',
                  misconception: 'Students often write the partial fraction form for a repeated linear factor \\( (x-a)^2 \\) as \\( \\frac{A}{(x-a)^2} \\) only, omitting the \\.' }
          ],
            remediations: { 'students-often-write-the-partial': { steps: ['If a student makes the repeated linear factor error, have them revisit the derivation of partial fractions: write \\.', 'Show that with only one constant, the numerator would be a constant, but the original numerator is linear.', 'Then give a drill: "Write the correct partial fraction form for these denominators: (i) \\( (x+1)^3 \\), (ii) \\.', 'Remediation nodes: c9_math_ch4_8 (factorisation of quadratics) and c10_math_cbse_02_008 (polynomial division).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_004', difficulty: 'standard',
          question: 'Integration by parts is a technique derived from the product rule.',
          hint: 'Revisit c11_math_cbse_13_009 (Product Rule) and c12_math_cbse_07_001 (Standard Integrals).',
          misconception: 'Students mechanically apply ILATE without checking whether the resulting integral is actually simpler.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Integration by parts is a technique derived from the product rule of differentiation that',
                  options: ['Integration by parts is a technique derived from the product rule of differentiation that', 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek', 'Integration by substitution is a technique where we change the variable of integration to', 'Integration by partial fractions is a technique to integrate a proper rational function'],
                  hint: 'Revisit c11_math_cbse_13_009 (Product Rule) and c12_math_cbse_07_001 (Standard Integrals).',
                  misconception: 'Students mechanically apply ILATE without checking whether the resulting integral is actually simpler.' }
          ],
            remediations: { 'students-mechanically-apply-ilate-without': { steps: ['If a student blindly follows ILATE and gets stuck: 1) Have them write both possible choices (u,dv) and (v,du) for the.', '2) Compute du/dx and ∫ v dx for each choice.', '3) Compare the resulting integrals ∫ (du/dx)(∫ v dx) dx — choose the one that is simpler or matches a standard form.', '4) Practice 5 integrals where ILATE fails (e.g., ∫ x cos⁻¹x dx, ∫ x² log x dx with wrong choice) to build intuition.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_005', difficulty: 'standard',
          question: 'Standard integrals of trigonometric functions are the antiderivatives of the.',
          hint: 'If stuck, review the derivatives of sin x, cos x, tan x, cot x, sec x, cosec.',
          misconception: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus.',
          parts: [
                { id: 'a', prompt: 'Write the indefinite integral of sec x tan x with respect to x, including the constant of integration.', answer: '∫ sec x tan x dx = sec x + C',
                  options: ['∫ sec x tan x dx = sec x + C', 'sec²x + C', 'tan x + C'],
                  hint: 'If stuck, review the derivatives of sin x, cos x, tan x, cot x, sec x, cosec.',
                  misconception: 'The most pervasive error is sign confusion in the basic integrals: writing ∫ sin x dx = cos x + C (missing the minus sign) and ∫ cos x.' }
          ],
            remediations: { 'the-most-pervasive-error-is': { steps: ['Have the student write the six derivatives of trig functions from memory (Class 11 node c11_math_cbse_13_010).', 'For each derivative, explicitly write the reverse statement: "Since d/dx[–cos x] = sin x, therefore ∫ sin x dx = –cos.', 'Practice five linear-argument integrals (e.g., ∫ cos(5x) dx, ∫ sec(2x)tan(2x) dx) side-by-side, forcing the student.', 'Re-attempt Diagnostic Questions 1, 3, and 5.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_006', difficulty: 'standard',
          question: 'The standard integrals of exponential and logarithmic functions are the.',
          hint: 'Review the derivatives of exponential and logarithmic functions from Class 12 Chapter 5.',
          misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\).',
          parts: [
                { id: 'a', prompt: 'Compare the integrals \\(\\int e^{2x}\\,dx\\) and \\(\\int e^x\\,dx\\). A student writes \\(\\int e^{2x}\\,dx = e^{2x} + C\\). Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Review the derivatives of exponential and logarithmic functions from Class 12 Chapter 5 (Continuity.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' }
          ],
            remediations: { 'misconception-1-int-a-x': { steps: ['If a student exhibits any of the above misconceptions: 1.', '**For Misconception 1:** Ask them to differentiate \\(\\frac{a^{x+1}}{x+1}\\) using the quotient rule and see it does not.', 'Then differentiate \\(\\frac{a^x}{\\ln a}\\) to confirm it works.', 'Revisit the derivative of \\(a^x\\) from Class 12 Chapter 5 (Continuity and Differentiability).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\).',
          parts: [
                { id: 'a', prompt: 'A student evaluates \\(\\int_{-2}^{-1} \\frac{1}{x}\\,dx\\) as \\(\\left[\\ln x\\right]_{-2}^{-1} = \\ln(-1) - \\ln(-2)\\).', answer: 'The mistake is using \\(\\ln x\\) instead of \\(\\ln|x|\\) for the antiderivative',
                  options: ['The mistake is using \\(\\ln x\\) instead of \\(\\ln|x|\\) for the antiderivative', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Review the derivatives of exponential and logarithmic functions from Class 12 Chapter 5 (Continuity.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' },
                { id: 'b', prompt: 'Create an integral problem that requires **both** \\(\\int e^x\\,dx\\) and \\(\\int \\frac{1}{x}\\,dx\\) in its solution, and solve it completely.', answer: 'Example problem: Evaluate \\(\\int \\frac{x e^x + 1}{x}\\,dx\\)',
                  options: ['Example problem: Evaluate \\(\\int \\frac{x e^x + 1}{x}\\,dx\\)', '\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)'],
                  hint: 'Review the derivatives of exponential and logarithmic functions from Class 12 Chapter 5 (Continuity.',
                  misconception: '**Misconception 1:** "\\(\\int a^x\\,dx = \\frac{a^{x+1}}{x+1}+C\\)" – Students apply the power rule for \\(x^n\\) to \\(a^x\\), confusing the.' }
          ],
            remediations: { 'misconception-1-int-a-x': { steps: ['If a student exhibits any of the above misconceptions: 1.', '**For Misconception 1:** Ask them to differentiate \\(\\frac{a^{x+1}}{x+1}\\) using the quotient rule and see it does not.', 'Then differentiate \\(\\frac{a^x}{\\ln a}\\) to confirm it works.', 'Revisit the derivative of \\(a^x\\) from Class 12 Chapter 5 (Continuity and Differentiability).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
