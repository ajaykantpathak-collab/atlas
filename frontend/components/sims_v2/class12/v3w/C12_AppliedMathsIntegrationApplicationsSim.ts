import type { SimDef } from '../../engine/types';
import C12_AppliedMathsIntegrationApplicationsSim from '../../../simulations/c6_12/C12_AppliedMathsIntegrationApplicationsSim';

/** v3 wrapped master — C12_AppliedMathsIntegrationApplicationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsintegrationapplicationssim: SimDef = {
    id: 'v3w_c12_appliedmathsintegrationapplicationssim',
    title: 'Fundamental Theorem of Calculus: Part 1',
    subtitle: 'This node covers the statement, intuition, and basic applications of the First.',
    classLevel: 12, subject: 'science', topic: 'Fundamental Theorem of Calculus: Part 1',
    chapters: [],
    nodeIds: ['c12_math_cbse_07_008', 'c12_math_cbse_07_009', 'c12_math_cbse_07_010', 'c12_math_cbse_08_006', 'c12_math_cbse_02_007', 'c12_math_cbse_02_008', 'c12_math_cbse_05_008', 'c12_math_cbse_07_001', 'c12_math_cbse_07_002', 'c12_math_cbse_07_003', 'c12_math_cbse_07_004', 'c12_math_cbse_07_005', 'c12_math_cbse_07_006', 'c12_math_cbse_07_007', 'c12_math_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are tracking the distance travelled by a car from your home in Delhi to a friend\'s house in.', goal: 'Master Fundamental Theorem of Calculus: Part 1.' },
    discovery: {
        question: 'A student simplifies $\\tan^{-1}\\left(\\sqrt{\\frac{1-\\cos x}{1+\\cos x}}\\right)$ directly to $\\frac{x}{2}$ without any condition on $x$.',
        options: ['Correct explanation: $\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} =', 'it\'s always $\\frac{x}{2}$', 'domain of cos is all reals so it\'s fine'],
        answer: 'Correct explanation: $\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} =',
        hook: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) =.',
    },
    teaching: [
        { title: 'The Fundamental Theorem of Calculus (Part 1).', text: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous real-valued function defined on a closed interval \\([a, b]\\), and \\( A(x) \\) is the area function defined by \\(.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_008', title: 'The Fundamental Theorem of Calculus.',
          scaffold: { problem: 'A car starts from rest and its acceleration (in m/s²) at time \\( t \\) seconds is given by \\( a(t) = 6t - 2 \\) for \\( 0 \\le t \\le 5 \\).',
            steps: [
            { text: 'Since acceleration is the derivative of velocity, the velocity at time \\( x \\) is the integral of acceleration from 0.' },
            { text: 'Compute the integral: \\( \\int_0^x (6t - 2) \\, dt = \\left[ 3t^2 - 2t \\right]_0^x = 3x^2 - 2x \\).' },
            { text: 'By the First Fundamental Theorem, the derivative of \\( v(x) \\) with respect to \\( x \\) is the integrand evaluated at \\(.' },
            { text: 'Directly differentiate \\( v(x) = 3x^2 - 2x \\) to get \\( v\'(x) = 6x - 2 \\), which matches \\( a(x) \\).', faded: true, blankAnswer: '\\( v(x) = 3x^2 - 2x \\) m/s; acceleration at time \\( x \\) is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_009', title: 'The Second Fundamental Theorem of.',
          scaffold: { problem: 'A particle moves along a straight line with velocity \\( v(t) = 4t^3 - 6t + 2 \\) m/s.',
            steps: [
            { text: 'Displacement is the definite integral of velocity: \\( \\int_1^3 (4t^3 - 6t + 2) \\, dt \\).' },
            { text: 'Find an antiderivative \\( s(t) \\) of \\( v(t) \\). Using power rule: \\( \\int 4t^3 \\, dt = t^4 \\), \\( \\int -6t \\, dt =.' },
            { text: 'Evaluate \\( s(t) \\) at upper limit 3: \\( s(3) = 3^4 - 3(3^2) + 2(3) = 81 - 27 + 6 = 60 \\).' },
            { text: 'Evaluate \\( s(t) \\) at lower limit 1: \\( s(1) = 1^4 - 3(1^2) + 2(1) = 1 - 3 + 2 = 0 \\).' },
            { text: 'Subtract: displacement = \\( s(3) - s(1) = 60 - 0 = 60 \\) m.', faded: true, blankAnswer: '60 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_010', title: 'The properties of definite integrals.',
          scaffold: { problem: 'A water tank has a cross-sectional area that varies with height \\(x\\) (in metres) as \\(A(x) = 4 - x^2\\) for \\(0 \\le x \\le 2\\).',
            steps: [
            { text: 'Recognize the integral is \\(V = \\int_0^2 (4 - x^2) dx\\) with limits \\([0,2]\\). Here \\(2a = 2\\) so \\(a=1\\).' },
            { text: 'Check symmetry condition for P6: \\(f(x) = 4 - x^2\\). Compute \\(f(2-x) = 4 - (2-x)^2 = 4 - (4 - 4x + x^2) = 4x - x^2\\).' },
            { text: 'Instead, use P2 to split at \\(x=1\\): \\(V = \\int_0^1 (4-x^2)dx + \\int_1^2 (4-x^2)dx\\).' },
            { text: 'For the second integral, apply P3 with \\(a=1, b=2\\): \\(\\int_1^2 f(x)dx = \\int_1^2 f(3-x)dx\\).' },
            { text: 'Better: just evaluate directly. \\(V = \\int_0^2 (4-x^2)dx = [4x - x^3/3]_0^2 = (8 - 8/3) - 0 = 16/3 \\, \\text{m}^3\\).' },
            { text: 'However, the problem states \\(A(2-x)=A(x)\\) which is false for \\(4-x^2\\).', faded: true, blankAnswer: 'For the symmetric area function \\(A(x)=2x-x^2\\), volume =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_006', title: 'Word problems on area applications.',
          scaffold: { problem: 'A farmer\'s field is bounded by the river \\( y = x^2 \\) and the straight road \\( y = 4 \\). Fertilizer costs ₹120 per square metre.',
            steps: [
            { text: 'Sketch the region. The parabola \\( y = x^2 \\) opens upward, vertex at (0,0). The line \\( y = 4 \\) is horizontal.' },
            { text: 'Decide on vertical strips because both curves are functions of \\( x \\).' },
            { text: 'Set up the integral for area: \\( A = \\int_{-2}^{2} (4 - x^2) \\, dx \\).' },
            { text: 'Evaluate: \\( \\int (4 - x^2) \\, dx = 4x - \\frac{x^3}{3} \\). From \\( -2 \\) to \\( 2 \\): \\( \\left(8 - \\frac{8}{3}\\right) -.' },
            { text: 'Total cost = Area × rate = \\( \\frac{32}{3} \\times 120 = 32 \\times 40 = ₹1280 \\).', faded: true, blankAnswer: '₹1280' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_007', title: 'Simplifying expressions using inverse.',
          scaffold: { problem: '** A satellite dish has a parabolic cross-section. The angle $\\theta$ between the axis and the line from focus to rim is given by $\\theta =.',
            steps: [
            { text: 'Identify the algebraic form $\\sqrt{\\frac{f-D}{f+D}} = \\sqrt{\\frac{1 - \\frac{D}{f}}{1 + \\frac{D}{f}}}$.' },
            { text: 'Recognize the standard pattern $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$.' },
            { text: 'Then $\\sqrt{\\frac{1-x}{1+x}} = \\sqrt{\\frac{1-\\cos\\alpha}{1+\\cos\\alpha}} =.' },
            { text: '$\\tan^{-1}\\left(\\tan\\frac{\\alpha}{2}\\right) = \\frac{\\alpha}{2}$ because $\\frac{\\alpha}{2} \\in [0, \\frac{\\pi}{2}).' },
            { text: 'Since $x = \\cos\\alpha = \\frac{5}{12}$, $\\alpha = \\cos^{-1}\\frac{5}{12}$.' },
            { text: 'Compute numerically: $\\cos^{-1}\\frac{5}{12} \\approx 1.148$ rad $\\approx 65.77^\\circ$. $\\theta \\approx 32.89^\\circ$.', faded: true, blankAnswer: '** $\\theta = \\frac{1}{2}\\cos^{-1}\\frac{5}{12} \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_02_008', title: 'Word problems involving inverse.',
          scaffold: { problem: 'A 15 m long ladder leans against a vertical wall. The foot of the ladder is 9 m away from the wall.',
            steps: [
            { text: 'Draw a right triangle. The ladder is the hypotenuse (15 m). The distance from the wall is the adjacent side (9 m).' },
            { text: 'Identify the known sides relative to θ: adjacent = 9, hypotenuse = 15.' },
            { text: 'Apply inverse cosine: θ = cos⁻¹(3/5). Since θ is an angle of elevation (ladder with ground), it must be in [0, π/2].' },
            { text: 'Find height h using sine or Pythagoras. sin θ = h/15 → h = 15 sin θ.' },
            { text: 'Verify: cos θ = 9/15 = 0.6, θ ≈ 53.13° is acute, height 12 m is positive and less than ladder length.', faded: true, blankAnswer: 'Angle with ground = cos⁻¹(3/5) ≈ 53.13° (or 0.927 rad);.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_07_009', title: 'Identify each idea',
          dissect: { specimen: 'Fundamental Theorem of Calculus: Part 1', spots: [
            { id: 's1', label: 'The Fundamental Theorem of Calculus', prompt: 'Which idea is this? — The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous.', answer: 'The Fundamental Theorem of Calculus', options: ['The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of', 'The properties of definite integrals', 'Word problems on area applications'] },
            { id: 's2', label: 'The Second Fundamental Theorem of', prompt: 'Which idea is this? — The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous.', answer: 'The Second Fundamental Theorem of', options: ['The Second Fundamental Theorem of', 'The Fundamental Theorem of Calculus', 'The properties of definite integrals', 'Word problems on area applications'] },
            { id: 's3', label: 'The properties of definite integrals', prompt: 'Which idea is this? — The properties of definite integrals are a set of algebraic and symmetry rules that allow.', answer: 'The properties of definite integrals', options: ['The properties of definite integrals', 'The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of', 'Word problems on area applications'] },
            { id: 's4', label: 'Word problems on area applications', prompt: 'Which idea is this? — Word problems on area applications involve translating real-world scenarios (such as land.', answer: 'Word problems on area applications', options: ['Word problems on area applications', 'The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of', 'The properties of definite integrals'] },
            { id: 's5', label: 'Simplifying expressions using inverse trigonometric', prompt: 'Which idea is this? — Simplifying expressions using inverse trigonometric identities means rewriting complex.', answer: 'Simplifying expressions using inverse trigonometric', options: ['Simplifying expressions using inverse trigonometric', 'The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of', 'The properties of definite integrals'] },
            { id: 's6', label: 'Word problems involving inverse trigonometric', prompt: 'Which idea is this? — Word problems involving inverse trigonometric functions require translating real-world.', answer: 'Word problems involving inverse trigonometric', options: ['Word problems involving inverse trigonometric', 'The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of', 'The properties of definite integrals'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsIntegrationApplicationsSim, prompt: 'Explore the interactive — Fundamental Theorem of Calculus: Part 1' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_07_008', difficulty: 'standard',
          question: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a.',
          hint: 'Review the definition of derivative as a limit and the geometric interpretation of the.',
          misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous',
                  options: ['The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The properties of definite integrals are a set of algebraic and symmetry rules that allow', 'Word problems on area applications involve translating real-world scenarios (such as land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.' }
          ],
            remediations: { 'students-often-confuse-the-variable': { steps: ['If a student makes the above errors, take them through the following steps: (1) Write the area function \\( A(x) =.', '(2) For chain rule cases, set \\( u = g(x) \\) and write \\( A(g(x)) = \\int_a^{g(x)} f(t) \\, dt \\).', 'Then compute \\( \\frac{d}{dx} A(g(x)) = A\'(g(x)) \\cdot g\'(x) = f(g(x)) \\cdot g\'(x) \\).', '(3) Practice with simple functions like \\( f(t) = t \\) and \\( g(x) = x^2 \\) to see the pattern.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_009', difficulty: 'standard',
          question: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a.',
          hint: 'If stuck, revisit node c12_math_cbse_07_001 (Integration as Inverse of Differentiation).',
          misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous',
                  options: ['The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The properties of definite integrals are a set of algebraic and symmetry rules that allow', 'Word problems on area applications involve translating real-world scenarios (such as land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then incorrectly keep \\(.' }
          ],
            remediations: { 'students-often-write-the-antiderivative': { steps: ['If a student makes the above errors: (1) Have them re-derive the cancellation of \\( C \\) algebraically: \\( (F(b)+C) -.', '(2) Give a set of definite integrals where the integrand has a discontinuity in the interval (e.g., \\( \\int_0^2.', '(3) Practice the "upper minus lower" order by evaluating \\( \\int_1^2 2x \\, dx \\) both as \\( [x^2]_1^2 \\) and as \\(.', '(4) Revisit node c12_math_cbse_07_008 (First Fundamental Theorem) to reinforce the link between antiderivatives and.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_010', difficulty: 'standard',
          question: 'The properties of definite integrals are a set of algebraic and symmetry rules.',
          hint: 'If stuck, review the proof of FTC Part 2 (node c12_math_cbse_07_009) and practice.',
          misconception: 'Students often apply P3 or P4 by writing \\(\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx\\) but then **forget to change the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The properties of definite integrals are a set of algebraic and symmetry rules that allow',
                  options: ['The properties of definite integrals are a set of algebraic and symmetry rules that allow', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'Word problems on area applications involve translating real-world scenarios (such as land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply P3 or P4 by writing \\(\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx\\) but then **forget to change the argument of \\(f\\) inside.' }
          ],
            remediations: { 'students-often-apply-p3-or': { steps: ['Revisit the proof of P3 in NCERT (or node c12_math_cbse_07_010 derivation): do the substitution \\(t = a+b-x\\) step by.', 'Practice 5 integrals where the argument change matters (e.g., \\(\\int_0^{\\pi} x \\cos x dx\\), \\(\\int_0^{\\pi/2}.', 'For each, explicitly write: "Let \\(I = \\int...\\).', 'Re-diagnostic: Give the student \\(\\int_0^{\\pi} \\frac{x}{1+\\sin x} dx\\) and ask them to write the transformed integral.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_08_006', difficulty: 'standard',
          question: 'Word problems on area applications involve translating real-world scenarios.',
          hint: 'If stuck, revisit the definite integral evaluation techniques from Class 12 Chapter 7.',
          misconception: 'Students often set up the integral as \\( \\int_a^b (f(x) - g(x)) \\, dx \\) without checking which function is actually on.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems on area applications involve translating real-world scenarios (such as land',
                  options: ['Word problems on area applications involve translating real-world scenarios (such as land', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The properties of definite integrals are a set of algebraic and symmetry rules that allow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often set up the integral as \\( \\int_a^b (f(x) - g(x)) \\, dx \\) without checking which function is actually on top in the.' }
          ],
            remediations: { 'students-often-set-up-the': { steps: ['Re‑visit **c12_math_cbse_08_002** (Area Between Curve and X‑Axis) to practice splitting integrals when the curve.', 'Review **c12_math_cbse_08_003** (Area Between Two Curves) to master identifying top/bottom functions and finding.', 'Do a re‑diagnostic: solve the area between \\( y = x^2 - 4 \\) and the x‑axis from \\( x = 0 \\) to \\( x = 3 \\).', 'The correct answer is \\( \\left| \\int_0^2 (x^2 - 4) \\, dx \\right| + \\int_2^3 (x^2 - 4) \\, dx = \\frac{16}{3} +.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_007', difficulty: 'standard',
          question: 'Simplifying expressions using inverse trigonometric identities means rewriting.',
          hint: 'If stuck, immediately revisit Class 11 trigonometric identities (c11_math_cbse_03_008,.',
          misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) =.',
          parts: [
                { id: 'a', prompt: 'A student simplifies $\\tan^{-1}\\left(\\sqrt{\\frac{1-\\cos x}{1+\\cos x}}\\right)$ directly to $\\frac{x}{2}$ without any condition on $x$.', answer: 'Correct explanation: $\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} =',
                  options: ['Correct explanation: $\\sqrt{\\frac{1-\\cos x}{1+\\cos x}} =', 'it\'s always $\\frac{x}{2}$', 'domain of cos is all reals so it\'s fine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) = \\theta$,.' },
                { id: 'b', prompt: 'Compare the two simplifications: (A) $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$ using $x = \\cos\\theta$ (B) $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$ using $x = \\sin\\theta$.', answer: 'Correct analysis: (A) With $x = \\cos\\theta$, $\\theta = \\cos^{-1}x \\in [0, \\pi]$',
                  options: ['Correct analysis: (A) With $x = \\cos\\theta$, $\\theta = \\cos^{-1}x \\in [0, \\pi]$', 'both are fine', 'sine is easier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) = \\theta$,.' }
          ],
            remediations: { 'the-range-ignorance-error-students': { steps: ['**Targeted remediation for Range Ignorance:** 1.', '**Immediate review:** Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value.', 'Write out the principal range of each inverse function on a reference card: $\\sin^{-1}: [-\\frac{\\pi}{2},.', '**Drill 5 "trap" problems** where the simplified angle falls outside the principal range: -.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) =.',
          parts: [
                { id: 'a', prompt: 'Compare the two simplifications: (A) $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$ using $x = \\cos\\theta$ (B) $\\tan^{-1}\\sqrt{\\frac{1-x}{1+x}}$ using $x = \\sin\\theta$.', answer: 'Correct analysis: (A) With $x = \\cos\\theta$, $\\theta = \\cos^{-1}x \\in [0, \\pi]$',
                  options: ['Correct analysis: (A) With $x = \\cos\\theta$, $\\theta = \\cos^{-1}x \\in [0, \\pi]$', 'both are fine', 'sine is easier'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Range Ignorance" Error:** Students mechanically apply $\\sin^{-1}(\\sin\\theta) = \\theta$, $\\tan^{-1}(\\tan\\theta) = \\theta$,.' }
          ],
            remediations: { 'the-range-ignorance-error-students': { steps: ['**Targeted remediation for Range Ignorance:** 1.', '**Immediate review:** Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value.', 'Write out the principal range of each inverse function on a reference card: $\\sin^{-1}: [-\\frac{\\pi}{2},.', '**Drill 5 "trap" problems** where the simplified angle falls outside the principal range: -.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_02_008', difficulty: 'standard',
          question: 'Word problems involving inverse trigonometric functions require translating.',
          hint: 'If stuck, immediately review c12_math_cbse_02_001 (domain/range table) and.',
          misconception: 'Students often treat inverse trigonometric functions as multi-valued (e.g., writing sin⁻¹(1/2) = 30°, 150°, 390°, …).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems involving inverse trigonometric functions require translating real-world',
                  options: ['Word problems involving inverse trigonometric functions require translating real-world', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'The properties of definite integrals are a set of algebraic and symmetry rules that allow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat inverse trigonometric functions as multi-valued (e.g., writing sin⁻¹(1/2) = 30°, 150°, 390°, …) instead of.' }
          ],
            remediations: { 'students-often-treat-inverse-trigonometric': { steps: ['If a student makes the above errors: (1) Have them revisit c12_math_cbse_02_001 (Domain and Range) and.', '(2) Practice drawing and labelling right triangles for 10 word problems, explicitly writing "opposite", "adjacent",.', '(3) Solve 5 problems where the computed ratio is deliberately >1 to recognize impossible triangles.', '(4) Re-attempt a diagnostic question like Q4 or Q5 and explain in words why the principal value is the only valid.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
