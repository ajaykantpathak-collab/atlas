import type { SimDef } from '../../engine/types';

/** v3 generated — c12_math_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_math_ch07_p2: SimDef = {
    id: 'v3_c12_math_ch07_p2',
    title: 'Integrals · Part 2/2',
    subtitle: 'Differentiation forgets the constant — integration must guess',
    classLevel: 12, subject: 'mathematics', topic: 'Integrals · Part 2/2',
    chapters: ['c12_math_ch07'],
    nodeIds: ['c12_math_cbse_07_007', 'c12_math_cbse_07_008', 'c12_math_cbse_07_009', 'c12_math_cbse_07_010', 'c12_math_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Antiderivative hunter', intro: 'Every derivative formula is a treasure map read backwards — and the +C marks all the starting points it erased.', goal: 'Master indefinite integration as inverse differentiation — standard forms, +C, and verification.' },
    discovery: {
        question: 'Add up infinitely many infinitely-thin strips of area. What do you get?',
        options: ['A finite area — the definite integral', 'Infinity — strips add without bound', 'Zero — thin strips have no area', 'It depends on the pen thickness'],
        answer: 'A finite area — the definite integral',
        hook: 'Integration is the art of making infinity finite. That paradox is the engine of all of physics.',
    },
    teaching: [
        { title: 'Definite Integral as Limit of a Sum', text: 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\) is defined as the limit of a Riemann sum: \\[ \\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x, \\] where.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_math_cbse_07_007', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Read every derivative formula backwards: integrate polynomials, spot where the power rule fails, catch the chain-rule compensation, and always prove it by re-differentiating.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_007', title: 'Definite Integral as Limit of a Sum',
          scaffold: { problem: 'A farmer wants to find the exact area of a plot bounded by the curve \\(y = 2x + 1\\), the x-axis, and the lines \\(x = 1\\) and \\(x = 4\\).',
            steps: [
            { text: 'Identify the interval \\([a, b] = [1, 4]\\) and function \\(f(x) = 2x + 1\\).' },
            { text: 'The right endpoint of the \\(i\\)-th subinterval is \\(x_i = a + i\\Delta x = 1 + \\frac{3i}{n}\\).' },
            { text: 'Write the Riemann sum: \\(\\sum_{i=1}^n f(x_i) \\Delta x = \\sum_{i=1}^n \\left[2\\left(1 + \\frac{3i}{n}\\right) + 1\\right].' },
            { text: 'Simplify the sum: \\(\\frac{9}{n} \\sum_{i=1}^n 1 + \\frac{18}{n^2} \\sum_{i=1}^n i = \\frac{9}{n} \\cdot n + \\frac{18}{n^2}.' },
            { text: 'Take the limit as \\(n \\to \\infty\\): \\(\\lim_{n\\to\\infty} \\left(9 + 9\\left(1 + \\frac{1}{n}\\right)\\right) = 9 + 9 = 18\\).', faded: true, blankAnswer: '18 square units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_009', title: 'Fundamental Theorem of Calculus: Part 2',
          scaffold: { problem: 'A particle moves along a straight line with velocity \\( v(t) = 4t^3 - 6t + 2 \\) m/s.',
            steps: [
            { text: 'Displacement is the definite integral of velocity: \\( \\int_1^3 (4t^3 - 6t + 2) \\, dt \\).' },
            { text: 'Find an antiderivative \\( s(t) \\) of \\( v(t) \\). Using power rule: \\( \\int 4t^3 \\, dt = t^4 \\), \\( \\int -6t \\,.' },
            { text: 'Evaluate \\( s(t) \\) at upper limit 3: \\( s(3) = 3^4 - 3(3^2) + 2(3) = 81 - 27 + 6 = 60 \\).' },
            { text: 'Evaluate \\( s(t) \\) at lower limit 1: \\( s(1) = 1^4 - 3(1^2) + 2(1) = 1 - 3 + 2 = 0 \\).' },
            { text: 'Subtract: displacement = \\( s(3) - s(1) = 60 - 0 = 60 \\) m.', faded: true, blankAnswer: '60 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_010', title: 'Properties of Definite Integrals',
          scaffold: { problem: 'A water tank has a cross-sectional area that varies with height \\(x\\) (in metres) as \\(A(x) = 4 - x^2\\) for \\(0 \\le x \\le 2\\).',
            steps: [
            { text: 'Recognize the integral is \\(V = \\int_0^2 (4 - x^2) dx\\) with limits \\([0,2]\\). Here \\(2a = 2\\) so \\(a=1\\).' },
            { text: 'Check symmetry condition for P6: \\(f(x) = 4 - x^2\\). Compute \\(f(2-x) = 4 - (2-x)^2 = 4 - (4 - 4x + x^2) = 4x - x^2\\).' },
            { text: 'Instead, use P2 to split at \\(x=1\\): \\(V = \\int_0^1 (4-x^2)dx + \\int_1^2 (4-x^2)dx\\).' },
            { text: 'For the second integral, apply P3 with \\(a=1, b=2\\): \\(\\int_1^2 f(x)dx = \\int_1^2 f(3-x)dx\\).' },
            { text: 'Better: just evaluate directly. \\(V = \\int_0^2 (4-x^2)dx = [4x - x^3/3]_0^2 = (8 - 8/3) - 0 = 16/3 \\, \\text{m}^3\\).' },
            { text: 'However, the problem states \\(A(2-x)=A(x)\\) which is false for \\(4-x^2\\).', faded: true, blankAnswer: 'For the symmetric area function \\(A(x)=2x-x^2\\), volume.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_011', title: 'Evaluation of Definite Integrals by Substitution',
          scaffold: { problem: 'A particle moves along a straight line with velocity \\(v(t) = \\frac{3t^2}{(1+t^3)^2}\\) m/s.',
            steps: [
            { text: 'Displacement = \\(\\int_0^2 v(t)\\,dt = \\int_0^2 \\frac{3t^2}{(1+t^3)^2}\\,dt\\).' },
            { text: 'Identify substitution: let \\(u = 1+t^3\\). Then \\(du = 3t^2\\,dt\\).' },
            { text: 'Change limits: when \\(t = 0\\), \\(u = 1+0 = 1\\); when \\(t = 2\\), \\(u = 1+8 = 9\\).' },
            { text: 'Rewrite integral in \\(u\\): \\(\\int_1^9 \\frac{du}{u^2} = \\int_1^9 u^{-2}\\,du\\).' },
            { text: 'Integrate: \\(\\left[ -u^{-1} \\right]_1^9 = -\\frac{1}{9} - (-1) = 1 - \\frac{1}{9} = \\frac{8}{9}\\).', faded: true, blankAnswer: '\\(\\frac{8}{9}\\) m' }
            ] } },
        { type: 'drill', nodeId: 'c12_math_cbse_07_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c12_math_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Estimating a car\'s distance from a velocity readout v(t) = 2t·sin(t² + 1), your teammate tries \'u = sin(t²+1)\' and gets a mess, then declares the integral \'unsolvable by substitution.\'',
            decisions: [{ prompt: 'What was the substitution supposed to look for?', options: [
                { text: 'The function-plus-derivative pair — let u = t²+1 so du = 2t dt is exactly the factor sitting outside sine; the integral collapses to ∫ sin u du, and for a definite integral convert the limits too.', outcome: 'The chapter\'s pattern: substitution works when the integrand already contains the inner function\'s derivative — choosing the outer function leaves x\'s stranded inside du.' },
                { text: 'He\'s right — if the first substitution fails, the integral isn\'t meant for substitution.', outcome: 'A bad first choice isn\'t a verdict on the method — the test is whether du appears as a factor; u = t²+1 passes it instantly, so the technique was never disproved.', reveals: 'first-fail-ends-method' },
                { text: 'Try u = 2t instead — simplify the coefficient first, then the rest follows.', outcome: 'That trades the wrong variable for an irrelevant one — du = 2dt still leaves sin(t²+1) in t and the t-factor unresolved; the derivative must match what\'s multiplying the differential.', reveals: 'any-u-is-worth-trying' }
            ] }] } },
        { type: 'case', nodeId: 'c12_math_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'Substitution, parts, partial fractions — you can now sum the infinite. This is the tool Newton built physics with.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_07_007', difficulty: 'standard',
          question: 'The definite integral of a continuous function \\(f(x)\\) on \\([a, b]\\).',
          hint: 'If stuck, revisit the formulas for \\(\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\\), \\(\\sum i^2.',
          misconception: 'Students often write the Riemann sum as \\(\\sum f(x_i)\\) without the \\(\\Delta x\\) factor, or they use \\(\\Delta.',
          parts: [
                { id: 'a', prompt: 'Compare the right-endpoint sum and the midpoint sum for \\(f(x)=x^2\\) on \\([0,1]\\) with \\(n=4\\). Which is larger?', answer: 'Right-endpoint: \\(\\Delta x=0.25\\), \\(x_i=0.25,0.5,0.75,1.0\\)',
                  options: ['Right-endpoint: \\(\\Delta x=0.25\\), \\(x_i=0.25,0.5,0.75,1.0\\)', 'right-endpoint is always larger'],
                  hint: 'If stuck, revisit the formulas for \\(\\sum_{i=1}^n i = \\frac{n(n+1)}{2}\\), \\(\\sum i^2.',
                  misconception: 'Students often write the Riemann sum as \\(\\sum f(x_i)\\) without the \\(\\Delta x\\) factor, or they use \\(\\Delta x = \\frac{b}{n}\\) instead.' }
          ],
            remediations: { 'students-often-write-the-riemann': { steps: ['If a student drops \\(\\Delta x\\) or uses the wrong \\(\\Delta x\\): 1.', 'Ask: "What are the units of the sum?', 'Height is in metres, width must be in metres, so area is m².', 'What is \\(\\Delta x\\) in your sum?" 2.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_008', difficulty: 'standard',
          question: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is.',
          hint: 'Review the definition of derivative as a limit and the geometric interpretation of the.',
          misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous',
                  options: ['The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek', 'Integration by substitution is a technique where we change the variable of integration to', 'Integration by partial fractions is a technique to integrate a proper rational function'],
                  hint: 'Review the definition of derivative as a limit and the geometric interpretation of the definite.',
                  misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.' }
          ],
            remediations: { 'students-often-confuse-the-variable': { steps: ['If a student makes the above errors, take them through the following steps: (1) Write the area function \\( A(x).', '(2) For chain rule cases, set \\( u = g(x) \\) and write \\( A(g(x)) = \\int_a^{g(x)} f(t) \\, dt \\).', 'Then compute \\( \\frac{d}{dx} A(g(x)) = A\'(g(x)) \\cdot g\'(x) = f(g(x)) \\cdot g\'(x) \\).', '(3) Practice with simple functions like \\( f(t) = t \\) and \\( g(x) = x^2 \\) to see the pattern.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_009', difficulty: 'standard',
          question: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is.',
          hint: 'If stuck, revisit node c12_math_cbse_07_001 (Integration as Inverse of Differentiation).',
          misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous',
                  options: ['The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek', 'Integration by substitution is a technique where we change the variable of integration to', 'Integration by partial fractions is a technique to integrate a proper rational function'],
                  hint: 'If stuck, revisit node c12_math_cbse_07_001 (Integration as Inverse of Differentiation) to practice.',
                  misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then incorrectly keep \\.' }
          ],
            remediations: { 'students-often-write-the-antiderivative': { steps: ['If a student makes the above errors: (1) Have them re-derive the cancellation of \\( C \\) algebraically: \\( (F(b)+C).', '(2) Give a set of definite integrals where the integrand has a discontinuity in the interval (e.g., \\( \\int_0^2.', '(3) Practice the "upper minus lower" order by evaluating \\( \\int_1^2 2x \\, dx \\) both as \\( [x^2]_1^2 \\) and as \\.', '(4) Revisit node c12_math_cbse_07_008 (First Fundamental Theorem) to reinforce the link between antiderivatives and.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_010', difficulty: 'standard',
          question: 'The properties of definite integrals are a set of algebraic and symmetry rules.',
          hint: 'If stuck, review the proof of FTC Part 2 (node c12_math_cbse_07_009) and practice.',
          misconception: 'Students often apply P3 or P4 by writing \\(\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx\\) but then **forget to change the.',
          parts: [
                { id: 'a', prompt: 'Explain why \\(\\int_{-2}^2 x^3 dx = 0\\) without computing the antiderivative. Which property justifies this?', answer: 'The function \\(f(x)=x^3\\) is odd',
                  options: ['The function \\(f(x)=x^3\\) is odd', 'it\'s because the function is symmetric'],
                  hint: 'If stuck, review the proof of FTC Part 2 (node c12_math_cbse_07_009) and practice evaluating.',
                  misconception: 'Students often apply P3 or P4 by writing \\(\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx\\) but then **forget to change the argument of \\(f\\) inside.' }
          ],
            remediations: { 'students-often-apply-p3-or': { steps: ['Revisit the proof of P3 in NCERT (or node c12_math_cbse_07_010 derivation): do the substitution \\(t = a+b-x\\) step.', 'Practice 5 integrals where the argument change matters (e.g., \\(\\int_0^{\\pi} x \\cos x dx\\), \\(\\int_0^{\\pi/2}.', 'For each, explicitly write: "Let \\(I = \\int...\\).', 'Re-diagnostic: Give the student \\(\\int_0^{\\pi} \\frac{x}{1+\\sin x} dx\\) and ask them to write the transformed integral.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_011', difficulty: 'standard',
          question: 'Evaluation of a definite integral by substitution is a technique where the.',
          hint: 'Review the substitution method for indefinite integrals (c12_math_cbse_07_002) and.',
          misconception: 'Students often forget to change the limits of integration when performing substitution, instead keeping the original.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Evaluation of a definite integral by substitution is a technique where the variable of',
                  options: ['Evaluation of a definite integral by substitution is a technique where the variable of', 'Integration is the inverse process of differentiation: given a function \\(f(x)\\), we seek', 'Integration by substitution is a technique where we change the variable of integration to', 'Integration by partial fractions is a technique to integrate a proper rational function'],
                  hint: 'Review the substitution method for indefinite integrals (c12_math_cbse_07_002) and practice.',
                  misconception: 'Students often forget to change the limits of integration when performing substitution, instead keeping the original \\(x\\)-limits and.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['If a student consistently forgets to change limits, have them practice the following drill: For each of five integrals.', 'Then integrate and evaluate.', 'Use integrals where \\(g(a) \\neq a\\) and \\(g(b) \\neq b\\) (e.g., \\(\\int_1^2 \\frac{x}{x^2+1}\\,dx\\) with \\(u=x^2+1\\).', 'After the drill, give a diagnostic question where the limits change non-trivially and ask the student to explain why.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
