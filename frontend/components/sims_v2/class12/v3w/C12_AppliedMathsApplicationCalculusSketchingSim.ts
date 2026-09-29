import type { SimDef } from '../../engine/types';
import C12_AppliedMathsApplicationCalculusSketchingSim from '../../../simulations/c6_12/C12_AppliedMathsApplicationCalculusSketchingSim';

/** v3 wrapped master — C12_AppliedMathsApplicationCalculusSketchingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_appliedmathsapplicationcalculussketchingsim: SimDef = {
    id: 'v3w_c12_appliedmathsapplicationcalculussketchingsim',
    title: 'Word Problems: Area Applications',
    subtitle: 'Covers word problems that reduce to finding the area bounded by standard curves (lines,.',
    classLevel: 12, subject: 'science', topic: 'Word Problems: Area Applications',
    chapters: [],
    nodeIds: ['c12_math_cbse_08_006', 'c12_math_cbse_06_008', 'c12_math_cbse_07_008', 'c12_math_cbse_07_009', 'c12_math_cbse_07_010', 'c12_math_cbse_06_007', 'c12_math_cbse_08_003', 'c12_math_cbse_08_005', 'c12_math_cbse_02_007', 'c12_math_cbse_02_008', 'c12_math_cbse_10_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a farmer in Punjab owns a field whose boundary is a river shaped like the parabola \\( y = x^2 \\) and.', goal: 'Master Word Problems: Area Applications.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Word problems on area applications involve.', text: 'Word problems on area applications involve translating real-world scenarios (such as land area, cross‑sectional area, or region bounded by curves and lines) into a definite integral setup, evaluating.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_08_006', title: 'Word problems on area applications.',
          scaffold: { problem: 'A farmer\'s field is bounded by the river \\( y = x^2 \\) and the straight road \\( y = 4 \\). Fertilizer costs ₹120 per square metre.',
            steps: [
            { text: 'Sketch the region. The parabola \\( y = x^2 \\) opens upward, vertex at (0,0). The line \\( y = 4 \\) is horizontal.' },
            { text: 'Decide on vertical strips because both curves are functions of \\( x \\).' },
            { text: 'Set up the integral for area: \\( A = \\int_{-2}^{2} (4 - x^2) \\, dx \\).' },
            { text: 'Evaluate: \\( \\int (4 - x^2) \\, dx = 4x - \\frac{x^3}{3} \\). From \\( -2 \\) to \\( 2 \\): \\( \\left(8 - \\frac{8}{3}\\right) -.' },
            { text: 'Total cost = Area × rate = \\( \\frac{32}{3} \\times 120 = 32 \\times 40 = ₹1280 \\).', faded: true, blankAnswer: '₹1280' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_008', title: 'A **critical point** of a function \\(.',
          scaffold: { problem: 'A rectangular sheet of tin 45 cm by 24 cm is to be made into an open-top box by cutting equal squares from each corner and folding up the.',
            steps: [
            { text: 'Let \\( x \\) cm be the side of the square cut from each corner.' },
            { text: 'Volume \\( V(x) = x(45 - 2x)(24 - 2x) = x(1080 - 90x - 48x + 4x^2) = 4x^3 - 138x^2 + 1080x \\).' },
            { text: 'Find critical points: \\( V\'(x) = 12x^2 - 276x + 1080 = 12(x^2 - 23x + 90) = 12(x - 5)(x - 18) \\).' },
            { text: 'Use second derivative test: \\( V\'\'(x) = 24x - 276 \\). At \\( x = 5 \\), \\( V\'\'(5) = 120 - 276 = -156 < 0 \\) → local.' },
            { text: 'Check endpoints (though volume → 0 as \\( x \\to 0^+ \\) or \\( x \\to 12^- \\), so local max is absolute max).', faded: true, blankAnswer: 'Side of square to be cut off = 5 cm. Maximum volume = \\(.' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c12_math_cbse_06_007', title: 'Word problems on maxima and minima.',
          scaffold: { problem: 'A square piece of tin of side 18 cm is to be made into a box without a top by cutting a square from each corner and folding up the flaps.',
            steps: [
            { text: 'Let x cm be the side of the square cut from each corner. After cutting and folding, the box has length = (18 - 2x) cm,.' },
            { text: 'Volume V(x) = x(18 - 2x)² = x(324 - 72x + 4x²) = 4x³ - 72x² + 324x. Practical domain: 0 < x < 9 (since 2x < 18).' },
            { text: 'Differentiate: V\'(x) = 12x² - 144x + 324 = 12(x² - 12x + 27) = 12(x - 3)(x - 9). Set V\'(x) = 0 → x = 3 or x = 9.' },
            { text: 'Second derivative test: V\'\'(x) = 24x - 144. V\'\'(3) = 72 - 144 = -72 < 0. So x = 3 gives local maximum.' },
            { text: 'Check endpoints for absolute maximum: V(0) = 0, V(3) = 3 × 12² = 432 cm³, V(9) = 0.', faded: true, blankAnswer: 'Cut squares of side 3 cm. Maximum volume = 432 cm³.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Word Problems: Area Applications', spots: [
            { id: 's1', label: 'Word problems on area applications', prompt: 'Which idea is this? — Word problems on area applications involve translating real-world scenarios (such as land.', answer: 'Word problems on area applications', options: ['Word problems on area applications', 'A critical point of a', 'The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of'] },
            { id: 's2', label: 'A critical point of a', prompt: 'Which idea is this? — A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(.', answer: 'A critical point of a', options: ['A critical point of a', 'Word problems on area applications', 'The Fundamental Theorem of Calculus', 'The Second Fundamental Theorem of'] },
            { id: 's3', label: 'The Fundamental Theorem of Calculus', prompt: 'Which idea is this? — The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous.', answer: 'The Fundamental Theorem of Calculus', options: ['The Fundamental Theorem of Calculus', 'Word problems on area applications', 'A critical point of a', 'The Second Fundamental Theorem of'] },
            { id: 's4', label: 'The Second Fundamental Theorem of', prompt: 'Which idea is this? — The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous.', answer: 'The Second Fundamental Theorem of', options: ['The Second Fundamental Theorem of', 'Word problems on area applications', 'A critical point of a', 'The Fundamental Theorem of Calculus'] },
            { id: 's5', label: 'The properties of definite integrals', prompt: 'Which idea is this? — The properties of definite integrals are a set of algebraic and symmetry rules that allow.', answer: 'The properties of definite integrals', options: ['The properties of definite integrals', 'Word problems on area applications', 'A critical point of a', 'The Fundamental Theorem of Calculus'] },
            { id: 's6', label: 'Word problems on maxima and', prompt: 'Which idea is this? — Word problems on maxima and minima involve translating a real-world situation into a.', answer: 'Word problems on maxima and', options: ['Word problems on maxima and', 'Word problems on area applications', 'A critical point of a', 'The Fundamental Theorem of Calculus'] }
          ] } }
    ],
    explore: { component: C12_AppliedMathsApplicationCalculusSketchingSim, prompt: 'Explore the interactive — Word Problems: Area Applications' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_08_006', difficulty: 'standard',
          question: 'Word problems on area applications involve translating real-world scenarios.',
          hint: 'If stuck, revisit the definite integral evaluation techniques from Class 12 Chapter 7.',
          misconception: 'Students often set up the integral as \\( \\int_a^b (f(x) - g(x)) \\, dx \\) without checking which function is actually on.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems on area applications involve translating real-world scenarios (such as land',
                  options: ['Word problems on area applications involve translating real-world scenarios (such as land', 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often set up the integral as \\( \\int_a^b (f(x) - g(x)) \\, dx \\) without checking which function is actually on top in the.' }
          ],
            remediations: { 'students-often-set-up-the': { steps: ['Re‑visit **c12_math_cbse_08_002** (Area Between Curve and X‑Axis) to practice splitting integrals when the curve.', 'Review **c12_math_cbse_08_003** (Area Between Two Curves) to master identifying top/bottom functions and finding.', 'Do a re‑diagnostic: solve the area between \\( y = x^2 - 4 \\) and the x‑axis from \\( x = 0 \\) to \\( x = 3 \\).', 'The correct answer is \\( \\left| \\int_0^2 (x^2 - 4) \\, dx \\right| + \\int_2^3 (x^2 - 4) \\, dx = \\frac{16}{3} +.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_008', difficulty: 'standard',
          question: 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the.',
          hint: 'If stuck, review derivative rules from **c11_math_cbse_13_009** and the first/second.',
          misconception: '**Misconception:** "Every point where \\( f\'\'(x)=0 \\) is an inflection point." **Reality:** \\( f\'\'(x)=0 \\) is only a.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( f(x)=x^3 \\) has a critical point at \\( x=0 \\) but it is NOT a local maximum or minimum. What is it instead?', answer: '\\( f\'(x)=3x^2 \\), so \\( f\'(0)=0 \\) → critical point',
                  options: ['\\( f\'(x)=3x^2 \\), so \\( f\'(0)=0 \\) → critical point', 'it\'s a minimum because \\( f\'\'(0)=0 \\) and \\( f\'\'\'(0)>0 \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Every point where \\( f\'\'(x)=0 \\) is an inflection point." **Reality:** \\( f\'\'(x)=0 \\) is only a *candidate*; the.' }
          ],
            remediations: { 'misconception-every-point-where-f': { steps: ['If a student cannot distinguish critical points from inflection points or forgets to test sign change: 1.', 'Revisit **c12_math_cbse_06_003** (First Derivative Test) and **c12_math_cbse_06_004** (Second Derivative Test) to.', 'Practice the **sign chart method** for \\( f\' \\) and \\( f\'\' \\) on the same number line: draw a line, mark critical.', 'Do a targeted re-diagnostic: "Find inflection points of \\( f(x)=x^4-4x^3 \\) and explain why \\( x=0 \\) is an inflection.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_008', difficulty: 'standard',
          question: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a.',
          hint: 'Review the definition of derivative as a limit and the geometric interpretation of the.',
          misconception: 'Students often confuse the variable of integration (dummy variable) with the variable upper limit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous',
                  options: ['The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous', 'Word problems on area applications involve translating real-world scenarios (such as land', 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(', 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous'],
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
                  options: ['The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'Word problems on area applications involve translating real-world scenarios (such as land', 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous'],
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
                  options: ['The properties of definite integrals are a set of algebraic and symmetry rules that allow', 'Word problems on area applications involve translating real-world scenarios (such as land', 'A **critical point** of a function \\( f(x) \\) is a point \\( x = c \\) in the domain of \\(', 'The Fundamental Theorem of Calculus (Part 1) states that if \\( f \\) is a continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often apply P3 or P4 by writing \\(\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx\\) but then **forget to change the argument of \\(f\\) inside.' }
          ],
            remediations: { 'students-often-apply-p3-or': { steps: ['Revisit the proof of P3 in NCERT (or node c12_math_cbse_07_010 derivation): do the substitution \\(t = a+b-x\\) step by.', 'Practice 5 integrals where the argument change matters (e.g., \\(\\int_0^{\\pi} x \\cos x dx\\), \\(\\int_0^{\\pi/2}.', 'For each, explicitly write: "Let \\(I = \\int...\\).', 'Re-diagnostic: Give the student \\(\\int_0^{\\pi} \\frac{x}{1+\\sin x} dx\\) and ask them to write the transformed integral.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_06_007', difficulty: 'standard',
          question: 'Word problems on maxima and minima involve translating a real-world situation.',
          hint: 'If stuck on formulating the objective function, revisit Class 10 quadratic word problems.',
          misconception: 'Students often forget to check endpoints when finding absolute maxima/minima on a closed interval.',
          parts: [
                { id: 'a', prompt: 'A student solves the problem: "Find two positive numbers whose sum is 20 and product is maximum." They write: let numbers be x and y, x+y=20, P=xy.', answer: 'No, the solution is incomplete',
                  options: ['No, the solution is incomplete', 'minimum at x=10'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to check endpoints when finding absolute maxima/minima on a closed interval.' }
          ],
            remediations: { 'students-often-forget-to-check': { steps: ['Take the end points of the interval.', 'Calculate values at all points.', 'Identify max/min." (3) Have them re-solve 3 problems from Exercise 6.3 (Q13, Q17, Q21) writing explicitly: "Critical.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
