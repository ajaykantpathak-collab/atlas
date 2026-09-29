import type { SimDef } from '../../engine/types';
import C11_AppliedMathsGraphsStandardRealSim from '../../../simulations/c6_12/C11_AppliedMathsGraphsStandardRealSim';

/** v3 wrapped master — C11_AppliedMathsGraphsStandardRealSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_appliedmathsgraphsstandardrealsim: SimDef = {
    id: 'v3w_c11_appliedmathsgraphsstandardrealsim',
    title: 'Functions: Definition and Types',
    subtitle: 'This node covers the formal definition of a function as a special relation, the.',
    classLevel: 11, subject: 'science', topic: 'Functions: Definition and Types',
    chapters: [],
    nodeIds: ['c11_math_cbse_02_005', 'c11_math_cbse_02_011', 'c11_math_cbse_11_006', 'c11_math_cbse_11_009', 'c11_math_cbse_03_004', 'c11_math_cbse_02_006', 'c11_math_cbse_02_007', 'c11_math_cbse_02_008', 'c11_math_cbse_02_009', 'c11_math_cbse_13_006', 'c11_math_cbse_11_003', 'c11_math_cbse_11_007', 'c11_math_cbse_11_010', 'c11_math_cbse_06_005', 'c11_math_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a school cafeteria where every student (set \\(A\\)) must be assigned exactly one lunch menu (set.', goal: 'Master Functions: Definition and Types.' },
    discovery: {
        question: 'A student claims: "The relation \\(R = \\{(x,y) \\in \\mathbb{Z} \\times \\mathbb{Z} : y^2 = x\\}\\) is a function from \\(\\mathbb{Z}\\) to \\(\\mathbb{Z}\\) because every.',
        options: ['The claim is false', 'square root exists in \\(\\mathbb{R}\\)', 'unique integer image exists'],
        answer: 'The claim is false',
        hook: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function,.',
    },
    teaching: [
        { title: 'A function \\(f\\) from a non-empty set \\(A\\).', text: 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a relation such that every element \\(x \\in A\\) has exactly one image \\(y \\in B\\); equivalently, the domain of \\(f\\) is \\(A\\).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_005', title: 'A function \\(f\\) from a non-empty set.',
          scaffold: { problem: 'A school library charges a fine for late return of books: ₹2 per day for the first 7 days, and ₹5 per day thereafter.',
            steps: [
            { text: 'Identify the input set \\(A\\) (days late) and output set \\(B\\) (fine in rupees).' },
            { text: 'Translate the verbal rule into algebraic pieces. For \\(1 \\le x \\le 7\\): fine = \\(2x\\).' },
            { text: 'Write the piecewise definition: \\(F(x) = \\begin{cases} 2x, & 1 \\le x \\le 7 \\\\ 5x - 21, & x \\ge 8 \\end{cases}\\).' },
            { text: 'Verify the function condition: every \\(x \\in \\mathbb{N}\\) falls into exactly one case, and each case gives a single.' },
            { text: 'State domain = \\(\\mathbb{N}\\) (or \\(\\{x \\in \\mathbb{Z} : x \\ge 1\\}\\)).', faded: true, blankAnswer: '\\(F: \\mathbb{N} \\to \\mathbb{N}\\) defined by \\(F(x) =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_011', title: 'A real function is a rule that assigns.',
          scaffold: { problem: 'A Delhi Metro fare system charges ₹10 for the first 2 km, ₹5 per km for the next 3 km, and ₹8 per km thereafter.',
            steps: [
            { text: 'Define the piecewise function from the fare rules. For 0 ≤ d ≤ 2: C(d) = 10 (constant).' },
            { text: 'Verify continuity at boundaries: At d = 2, left: C(2) = 10; right: 5(2) = 10 ✓.' },
            { text: 'Graph each segment. Segment 1 (0 ≤ d ≤ 2): Horizontal line y = 10 from (0,10) to (2,10) — solid dots at both ends.' },
            { text: 'Find fare for 7.5 km: d = 7.5 > 5, so C(7.5) = 8(7.5) - 15 = 60 - 15 = ₹45.' },
            { text: 'Find distance for ₹65 fare: Solve C(d) = 65. Try segment 3: 8d - 15 = 65 → 8d = 80 → d = 10 km. Check: 10 > 5, valid.', faded: true, blankAnswer: 'C(d) = {10 for 0≤d≤2; 5d for 2<d≤5; 8d-15 for d>5}. Fare.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_006', title: 'An ellipse is the set of all points in.',
          scaffold: { problem: 'The arch of a bridge in Delhi is shaped like a semi-ellipse. The span (width) of the bridge is 20 metres and the maximum height at the.',
            steps: [
            { text: 'Identify the given geometric information. The span is the major axis length = 20 m, so semi-major axis \\(a = 10\\) m.' },
            { text: 'Write the standard equation for horizontal major axis: \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\).' },
            { text: 'To find the height 4 metres from the centre, substitute \\(x = 4\\) into the equation: \\(\\frac{4^2}{100} + \\frac{y^2}{36}.' },
            { text: 'Solve for \\(y^2\\): \\(\\frac{y^2}{36} = 1 - \\frac{16}{100} = \\frac{84}{100} = \\frac{21}{25}\\).' },
            { text: 'Take the positive square root (since we want the height above the x-axis): \\(y = \\sqrt{30.24} \\approx 5.5\\) m.', faded: true, blankAnswer: 'Equation: \\(\\frac{x^2}{100} + \\frac{y^2}{36} = 1\\); Height.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_009', title: 'For a hyperbola with standard equation.',
          scaffold: { problem: 'A cooling tower for a thermal power plant in Maharashtra has a hyperbolic cross-section.',
            steps: [
            { text: 'Convert the given equation to standard form by dividing both sides by 400: \\(\\frac{25x^2}{400} - \\frac{16y^2}{400} = 1.' },
            { text: 'Identify \\(a^2\\) and \\(b^2\\). Since the positive term is \\(x^2\\), transverse axis is horizontal.' },
            { text: 'Compute eccentricity using \\(e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{25}{16}} = \\sqrt{\\frac{41}{16}} =.' },
            { text: 'Find asymptotes: \\(y = \\pm \\frac{b}{a}x = \\pm \\frac{5}{4}x\\). So equations are \\(y = 1.25x\\) and \\(y = -1.25x\\).' },
            { text: 'Interpret: The tower\'s sides follow these asymptote lines at large heights.', faded: true, blankAnswer: 'Eccentricity \\(e = \\frac{\\sqrt{41}}{4} \\approx 1.60\\);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_004', title: 'Trigonometric functions of an acute.',
          scaffold: { problem: 'A surveyor stands 20 metres from the base of a tower. The angle of elevation to the top of the tower is 30°. Find the height of the tower.',
            steps: [
            { text: 'Identify the right triangle. The tower is vertical (opposite side), the ground distance is adjacent side (20 m), angle.' },
            { text: 'Choose the trigonometric ratio that relates opposite and adjacent: tan 30° = opposite/adjacent.' },
            { text: 'Substitute known values: tan 30° = 1/√3. So 1/√3 = height / 20.' },
            { text: 'Solve for height: height = 20/√3. Rationalize: height = (20√3)/3 metres.' },
            { text: 'Verify: tan 30° ≈ 0.577, height ≈ 11.55 m. The exact value (20√3)/3 ≈ 11.55 m. Answer is positive and reasonable.', faded: true, blankAnswer: 'Height = (20√3)/3 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_006', title: 'A real-valued function is a relation f.',
          scaffold: { problem: 'A taxi service in Delhi charges a flat booking fee of ₹50 plus ₹12 per kilometre. Write the total fare as a function of distance travelled.',
            steps: [
            { text: 'Identify the components: flat fee = ₹50 (does not depend on distance) → constant function C(d) = 50.' },
            { text: 'Write the total fare function F(d) = C(d) + V(d) = 50 + 12d, where d ≥ 0 (distance in km).' },
            { text: 'For d = 15 km, compute F(15) = 50 + 12(15) = 50 + 180 = ₹230.' },
            { text: 'For fare = ₹290, solve 50 + 12d = 290 → 12d = 240 → d = 20 km.' },
            { text: 'Verify: F(20) = 50 + 12(20) = 50 + 240 = 290 ✓. Interpret: constant part is fixed cost, identity part (scaled) is.', faded: true, blankAnswer: 'Fare function F(d) = 50 + 12d; for 15 km fare = ₹230; for.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_02_011', title: 'Identify each idea',
          dissect: { specimen: 'Functions: Definition and Types', spots: [
            { id: 's1', label: 'A function f from a', prompt: 'Which idea is this? — A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a relation such.', answer: 'A function f from a', options: ['A function f from a', 'A real function is a', 'An ellipse is the set', 'For a hyperbola with standard'] },
            { id: 's2', label: 'A real function is a', prompt: 'Which idea is this? — A real function is a rule that assigns to each real number x in its domain exactly one.', answer: 'A real function is a', options: ['A real function is a', 'A function f from a', 'An ellipse is the set', 'For a hyperbola with standard'] },
            { id: 's3', label: 'An ellipse is the set', prompt: 'Which idea is this? — An ellipse is the set of all points in a plane such that the sum of their distances from.', answer: 'An ellipse is the set', options: ['An ellipse is the set', 'A function f from a', 'A real function is a', 'For a hyperbola with standard'] },
            { id: 's4', label: 'For a hyperbola with standard', prompt: 'Which idea is this? — For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\).', answer: 'For a hyperbola with standard', options: ['For a hyperbola with standard', 'A function f from a', 'A real function is a', 'An ellipse is the set'] },
            { id: 's5', label: 'Trigonometric functions of an acute', prompt: 'Which idea is this? — Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of.', answer: 'Trigonometric functions of an acute', options: ['Trigonometric functions of an acute', 'A function f from a', 'A real function is a', 'An ellipse is the set'] },
            { id: 's6', label: 'A real-valued function is a', prompt: 'Which idea is this? — A real-valued function is a relation f from a non-empty set A ⊆ ℝ to a set B ⊆ ℝ such.', answer: 'A real-valued function is a', options: ['A real-valued function is a', 'A function f from a', 'A real function is a', 'An ellipse is the set'] }
          ] } }
    ],
    explore: { component: C11_AppliedMathsGraphsStandardRealSim, prompt: 'Explore the interactive — Functions: Definition and Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_02_005', difficulty: 'standard',
          question: 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a.',
          hint: 'If stuck, revisit c11_math_cbse_02_003 (Relations: Definition) and c11_math_cbse_02_004.',
          misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function,.',
          parts: [
                { id: 'a', prompt: 'The relation \\(R = \\{(1,2), (2,3), (3,4), (2,5)\\}\\) is defined from \\(A = \\{1,2,3\\}\\) to \\(B = \\{2,3,4,5\\}\\).', answer: '\\(R\\) is not a function',
                  options: ['\\(R\\) is not a function', '2 has two images'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude.' },
                { id: 'b', prompt: 'Compare the functions \\(f(x) = |x|\\) and \\(g(x) = \\sqrt{x^2}\\) for \\(x \\in \\mathbb{R}\\). Are they the same function?', answer: 'Yes, they are the same function',
                  options: ['Yes, they are the same function', 'they are different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude.' }
          ],
            remediations: { 'students-often-cancel-common-factors': { steps: ['Write the original function rule and explicitly find the values that make the denominator zero.', 'State the domain as \\(\\mathbb{R} \\setminus \\{\\text{those values}\\}\\).', 'Perform algebraic simplification only on the restricted domain.', 'Write the final answer as: "\\(f(x) = \\text{simplified expression}, \\text{ for } x \\in \\text{domain}\\)".'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The relation \\(R = \\{(x,y) \\in \\mathbb{Z} \\times \\mathbb{Z} : y^2 = x\\}\\) is a function from \\(\\mathbb{Z}\\) to \\(\\mathbb{Z}\\) because every.', answer: 'The claim is false',
                  options: ['The claim is false', 'square root exists in \\(\\mathbb{R}\\)', 'unique integer image exists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude.' },
                { id: 'b', prompt: 'Compare the functions \\(f(x) = |x|\\) and \\(g(x) = \\sqrt{x^2}\\) for \\(x \\in \\mathbb{R}\\). Are they the same function?', answer: 'Yes, they are the same function',
                  options: ['Yes, they are the same function', 'they are different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude.' }
          ],
            remediations: { 'students-often-cancel-common-factors': { steps: ['Write the original function rule and explicitly find the values that make the denominator zero.', 'State the domain as \\(\\mathbb{R} \\setminus \\{\\text{those values}\\}\\).', 'Perform algebraic simplification only on the restricted domain.', 'Write the final answer as: "\\(f(x) = \\text{simplified expression}, \\text{ for } x \\in \\text{domain}\\)".'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_011', difficulty: 'standard',
          question: 'A real function is a rule that assigns to each real number x in its domain.',
          hint: 'If stuck, review c9_math_ch1_1 (Cartesian Coordinate System) and c9_math_ch2_5 (Graph of.',
          misconception: 'Students incorrectly graph the greatest integer function f(x) = [x] by drawing solid dots at both ends of each.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A real function is a rule that assigns to each real number x in its domain exactly one',
                  options: ['A real function is a rule that assigns to each real number x in its domain exactly one', 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a relation such', 'An ellipse is the set of all points in a plane such that the sum of their distances from', 'For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly graph the greatest integer function f(x) = [x] by drawing solid dots at both ends of each horizontal segment, e.g., at.' }
          ],
            remediations: { 'students-incorrectly-graph-the-greatest': { steps: ['Have the student write the definition: [x] = greatest integer ≤ x.', 'Test specific values: [1.2] = 1, [1] = 1, [0.999] = 0, [-0.5] = -1, [-1] = -1.', 'Plot these points on a number line, then on Cartesian plane.', 'For interval [1, 2), every x gives y = 1 → horizontal line at y = 1 from x = 1 (included, solid dot) to x = 2.', 'Repeat for [-1, 0), [0, 1), [2, 3).', 'Explicitly state: "At x = integer n, the function value is n (solid dot at (n, n)), but just before n, the value is n-1.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_006', difficulty: 'standard',
          question: 'An ellipse is the set of all points in a plane such that the sum of their.',
          hint: 'If stuck, revisit the distance formula (c9_math_ch1_4) and practice solving equations.',
          misconception: 'Students consistently confuse the relationship \\(c^2 = a^2 - b^2\\) for ellipses with \\(c^2 = a^2 + b^2\\) for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An ellipse is the set of all points in a plane such that the sum of their distances from',
                  options: ['An ellipse is the set of all points in a plane such that the sum of their distances from', 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a relation such', 'A real function is a rule that assigns to each real number x in its domain exactly one', 'For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse the relationship \\(c^2 = a^2 - b^2\\) for ellipses with \\(c^2 = a^2 + b^2\\) for hyperbolas.' }
          ],
            remediations: { 'students-consistently-confuse-the-relationship': { steps: ['**Revisit the geometric definition:** Draw an ellipse with foci \\(F_1, F_2\\) and a point \\(P\\) on it.', 'Measure \\(PF_1 + PF_2 = 2a\\).', 'Show that the distance from centre to focus is \\(c\\), and from centre to vertex is \\(a\\).', 'Since \\(F_1\\) and \\(F_2\\) lie *between* the vertices, \\(c < a\\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_009', difficulty: 'standard',
          question: 'For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} =.',
          hint: 'If stuck, revisit node c11_math_cbse_11_008 to practice converting equations like \\(9x^2.',
          misconception: 'Students often confuse the eccentricity formula with that of ellipse, writing \\(e = \\sqrt{1 - \\frac{b^2}{a^2}}\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\)',
                  options: ['For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\)', 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a relation such', 'A real function is a rule that assigns to each real number x in its domain exactly one', 'An ellipse is the set of all points in a plane such that the sum of their distances from'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the eccentricity formula with that of ellipse, writing \\(e = \\sqrt{1 - \\frac{b^2}{a^2}}\\) instead of \\(e = \\sqrt{1 +.' }
          ],
            remediations: { 'students-often-confuse-the-eccentricity': { steps: ['Always convert the given equation to standard form \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\) or \\(\\frac{y^2}{b^2} -.', 'Identify which denominator belongs to \\(x^2\\) (that\'s \\(a^2\\) for horizontal transverse axis) and which to \\(y^2\\).', 'For horizontal transverse axis, \\(e = \\sqrt{1 + \\frac{b^2}{a^2}}\\), asymptotes \\(y = \\pm \\frac{b}{a}x\\).', 'Practice with 3 examples where you deliberately make the "forget to divide" error, then correct it.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_004', difficulty: 'standard',
          question: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the.',
          hint: 'If stuck, revisit Class 10 trigonometric ratios (c10_math_cbse_08_001 to.',
          misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of',
                  options: ['Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of', 'A function \\(f\\) from a non-empty set \\(A\\) to a non-empty set \\(B\\) is a relation such', 'A real function is a rule that assigns to each real number x in its domain exactly one', 'An ellipse is the set of all points in a plane such that the sum of their distances from'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.' }
          ],
            remediations: { 'students-often-confuse-the-exact': { steps: ['If a student confuses sin 30° and cos 30°, have them draw a 30-60-90 triangle with sides 1, √3, 2.', 'The side opposite 30° is 1, so sin 30° = 1/2.', 'The side opposite 60° is √3, so sin 60° = √3/2.', 'For the sign error, remind them that in the first quadrant, all trigonometric functions are positive.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_006', difficulty: 'standard',
          question: 'A real-valued function is a relation f from a non-empty set A ⊆ ℝ to a set B ⊆.',
          hint: 'If stuck, revisit c11_math_cbse_02_005 (function definition, domain, range) and.',
          misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the identity function f: ℝ → ℝ defined by f(x) = x and the constant function g: ℝ → ℝ defined by g(x) = 7.', answer: 'Domain of f = ℝ, Range of f = ℝ',
                  options: ['Domain of f = ℝ, Range of f = ℝ', 'a constant function can take multiple values'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' },
                { id: 'b', prompt: 'Let f(x) = x (identity) and g(x) = 3 (constant). Compute (f+g)(x), (f−g)(x), (f·g)(x), and (f/g)(x). State the domain of each resulting function.', answer: '(f+g)(x) = x+3, domain ℝ',
                  options: ['(f+g)(x) = x+3, domain ℝ', 'denominator ≠ 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' },
                { id: 'c', prompt: 'Consider the function h: ℝ → ℝ defined by h(x) = f(x) + g(x) where f is the identity function and g is the constant function 5. Is h one-one? Is h onto?', answer: 'h(x) = x+5',
                  options: ['h(x) = x+5', 'it\'s shifted up', 'it\'s not the identity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' }
          ],
            remediations: { 'if-a-function-satisfies-f': { steps: ['If a student exhibits the fixed-point misconception: (1) Write the definition of identity function: f: ℝ→ℝ, f(x)=x.', 'Ask: "Is f(2)=2?" Compute f(2)=4.', '"Since 4≠2, f is not the identity function." (3) Explain: fixed points are where graph y=f(x) meets y=x; identity.', '(4) Practice: give 3 functions (x², x³, |x|, 2x) and ask which are identity.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The function f(x) = x² is an identity function because when x=1, f(1)=1, and when x=0, f(0)=0, so it returns the same value." Evaluate this.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'f(x)=x for some x', 'f(x)=x for all x'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function satisfies f(x)=x for a few values (like x=0,1), it is the identity function.' }
          ],
            remediations: { 'if-a-function-satisfies-f': { steps: ['If a student exhibits the fixed-point misconception: (1) Write the definition of identity function: f: ℝ→ℝ, f(x)=x.', 'Ask: "Is f(2)=2?" Compute f(2)=4.', '"Since 4≠2, f is not the identity function." (3) Explain: fixed points are where graph y=f(x) meets y=x; identity.', '(4) Practice: give 3 functions (x², x³, |x|, 2x) and ask which are identity.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
