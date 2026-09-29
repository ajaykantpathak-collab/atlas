import type { SimDef } from '../../engine/types';
import C11_MathematicsEllipseStandardEquationSim from '../../../simulations/c6_12/C11_MathematicsEllipseStandardEquationSim';

/** v3 wrapped master — C11_MathematicsEllipseStandardEquationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicsellipsestandardequationsim: SimDef = {
    id: 'v3w_c11_mathematicsellipsestandardequationsim',
    title: 'Conic Sections: Introduction and Definition',
    subtitle: 'This node covers only the geometric definition of conic sections, the classification of.',
    classLevel: 11, subject: 'mathematics', topic: 'Conic Sections: Introduction and Definition',
    chapters: [],
    nodeIds: ['c11_math_cbse_11_001', 'c11_math_cbse_11_006', 'c11_math_cbse_11_007', 'c11_math_cbse_11_002', 'c11_math_cbse_11_003', 'c11_math_cbse_11_004', 'c11_math_cbse_11_005', 'c11_math_cbse_11_008', 'c11_math_cbse_11_009', 'c11_math_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are designing a satellite dish for a communications tower in Bengaluru: the dish must reflect.', goal: 'Master Conic Sections: Introduction and Definition.' },
    discovery: {
        question: 'If a plane cuts a double-napped cone parallel to its axis, which conic section is formed, and why does this cut produce two separate curves?',
        options: ['A hyperbola is formed', 'parabola', 'ellipse'],
        answer: 'A hyperbola is formed',
        hook: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of.',
    },
    teaching: [
        { title: 'A conic section is a curve obtained by.', text: 'A conic section is a curve obtained by intersecting a plane with a double-napped right circular cone; the four distinct non-degenerate curves formed are the circle, ellipse, parabola, and hyperbola,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_001', title: 'A conic section is a curve obtained by.',
          scaffold: { problem: 'A double-napped cone has a generator that makes an angle of 30° with its axis. A plane cuts the cone at an angle of 40° to the axis.',
            steps: [
            { text: 'Note the generator angle α = 30° (angle between generator and axis).' },
            { text: 'Note the cutting plane angle β = 40° (angle between plane and axis).' },
            { text: 'Compare β with α: since β = 40° > 30° = α, the plane is tilted more steeply than the generator.' },
            { text: 'Recall the rule: if β > α (and β < 90°), the plane cuts only one nappe entirely → ellipse.' },
            { text: 'Conclude the conic is an ellipse. (If β were exactly 90°, it would be a circle, a special ellipse.)', faded: true, blankAnswer: 'Ellipse' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_007', title: 'For an ellipse in standard form.',
          scaffold: { problem: 'A satellite orbits Earth in an elliptical path with equation \\(\\frac{x^2}{2500} + \\frac{y^2}{900} = 1\\) (distances in km).',
            steps: [
            { text: 'Identify \\(a^2\\) and \\(b^2\\). Since \\(2500 > 900\\), \\(a^2 = 2500, b^2 = 900\\). So \\(a = 50\\) km, \\(b = 30\\) km.' },
            { text: 'Compute \\(c = \\sqrt{a^2 - b^2} = \\sqrt{2500 - 900} = \\sqrt{1600} = 40\\) km.' },
            { text: 'Eccentricity \\(e = c/a = 40/50 = 0.8\\).' },
            { text: 'Foci are at \\((\\pm c, 0) = (\\pm 40, 0)\\) km.' },
            { text: 'Directrices: \\(x = \\pm a/e = \\pm 50/0.8 = \\pm 62.5\\) km.', faded: true, blankAnswer: '\\(e = 0.8\\), foci \\((\\pm 40, 0)\\) km, directrices \\(x = \\pm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_002', title: 'A circle is the set of all points in a.',
          scaffold: { problem: 'A circular fountain is to be built in a rectangular park. The park\'s coordinate grid has origin at the southwest corner.',
            steps: [
            { text: 'Identify given information: centre C = (20, 15), point on circle P = (28, 15).' },
            { text: 'Recall standard equation: (x - h)² + (y - k)² = r², where (h, k) = (20, 15).' },
            { text: 'Radius r is distance from centre to point P. Use distance formula: r = √[(28 - 20)² + (15 - 15)²] = √[8² + 0²] = 8.' },
            { text: 'Substitute h, k, r into standard equation: (x - 20)² + (y - 15)² = 8² → (x - 20)² + (y - 15)² = 64.' },
            { text: 'Compute area = πr² = 3.14 × 64 = 200.96 m².' },
            { text: 'Verify: The point (28, 15) gives (8)² + (0)² = 64, satisfying the equation.', faded: true, blankAnswer: 'Equation: (x - 20)² + (y - 15)² = 64; Area = 200.96 m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_003', title: 'The general equation of a circle is a.',
          scaffold: { problem: 'A circular racing track is designed such that its boundary follows the equation \\(x^2 + y^2 - 10x + 4y - 20 = 0\\) where coordinates are in.',
            steps: [
            { text: 'Identify the coefficients by comparing with the general form \\(x^2 + y^2 + 2gx + 2fy + c = 0\\).' },
            { text: 'Write the centre using \\((-g, -f)\\). Centre = \\((-(-5), -2) = (5, -2)\\) km.' },
            { text: 'Compute \\(g^2 + f^2 - c = (-5)^2 + (2)^2 - (-20) = 25 + 4 + 20 = 49\\).' },
            { text: 'Since \\(49 > 0\\), it is a real circle. Radius \\(r = \\sqrt{49} = 7\\) km.' },
            { text: 'The pit stop at the centre is at \\((5, -2)\\) km. Interpret: the track is a circle of radius 7 km centred 5 km east and.', faded: true, blankAnswer: 'Centre = (5, -2) km, Radius = 7 km, Pit stop coordinates =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_004', title: 'A parabola is the set of all points in.',
          scaffold: { problem: 'A parabolic satellite dish has its vertex at the centre of the dish and focus 60 cm from the vertex along the axis.',
            steps: [
            { text: 'Identify given information: focal length a = 60 cm (focus at (60,0) since axis is x-axis and dish opens right).' },
            { text: 'Choose standard form: Axis is x-axis, so equation is y² = 4ax. Substitute a = 60: y² = 240x.' },
            { text: 'Find depth: At the opening edge, y = 60 (or -60). Substitute in equation: 60² = 240x → 3600 = 240x → x = 3600/240 = 15.' },
            { text: 'Verify: Depth is x-coordinate at opening = 15 cm. Check focus-directrix property: For point (15,60), distance to focus.' },
            { text: 'Interpret: The dish is 15 cm deep at centre. Equation: y² = 240x (x in cm, y in cm).', faded: true, blankAnswer: 'Depth = 15 cm. Equation: y² = 240x (with x, y in cm).' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_11_006', title: 'Identify each idea',
          dissect: { specimen: 'Conic Sections: Introduction and Definition', spots: [
            { id: 's1', label: 'A conic section is a', prompt: 'Which idea is this? — A conic section is a curve obtained by intersecting a plane with a double-napped right.', answer: 'A conic section is a', options: ['A conic section is a', 'An ellipse is the set', 'For an ellipse in standard', 'A circle is the set'] },
            { id: 's2', label: 'An ellipse is the set', prompt: 'Which idea is this? — An ellipse is the set of all points in a plane such that the sum of their distances from.', answer: 'An ellipse is the set', options: ['An ellipse is the set', 'A conic section is a', 'For an ellipse in standard', 'A circle is the set'] },
            { id: 's3', label: 'For an ellipse in standard', prompt: 'Which idea is this? — For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >.', answer: 'For an ellipse in standard', options: ['For an ellipse in standard', 'A conic section is a', 'An ellipse is the set', 'A circle is the set'] },
            { id: 's4', label: 'A circle is the set', prompt: 'Which idea is this? — A circle is the set of all points in a plane that are at a fixed distance (radius) from a.', answer: 'A circle is the set', options: ['A circle is the set', 'A conic section is a', 'An ellipse is the set', 'For an ellipse in standard'] },
            { id: 's5', label: 'The general equation of a', prompt: 'Which idea is this? — The general equation of a circle is a second-degree equation in two variables of the form.', answer: 'The general equation of a', options: ['The general equation of a', 'A conic section is a', 'An ellipse is the set', 'For an ellipse in standard'] },
            { id: 's6', label: 'A parabola is the set', prompt: 'Which idea is this? — A parabola is the set of all points in a plane that are equidistant from a fixed point.', answer: 'A parabola is the set', options: ['A parabola is the set', 'A conic section is a', 'An ellipse is the set', 'For an ellipse in standard'] }
          ] } }
    ],
    explore: { component: C11_MathematicsEllipseStandardEquationSim, prompt: 'Explore the interactive — Conic Sections: Introduction and Definition' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_11_001', difficulty: 'standard',
          question: 'A conic section is a curve obtained by intersecting a plane with a.',
          hint: 'If stuck, revisit Class 9 coordinate geometry (plotting points, distance formula) and.',
          misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of.',
          parts: [
                { id: 'a', prompt: 'If a plane cuts a double-napped cone parallel to its axis, which conic section is formed, and why does this cut produce two separate curves?', answer: 'A hyperbola is formed',
                  options: ['A hyperbola is formed', 'parabola', 'ellipse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of the cone.' }
          ],
            remediations: { 'the-angle-of-the-plane': { steps: ['Draw a clear diagram of a double-napped cone with its axis vertical.', 'Label the axis, a generator, and the base.', 'Show the angle between the generator and the axis (call it α).', 'Then draw three cutting planes: one perpendicular to the axis (angle 90° to axis), one at angle β where α < β < 90° to.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of.',
          parts: [
                { id: 'a', prompt: 'A student claims that a parabola is formed when the cutting plane is parallel to the base of the cone. Evaluate this claim and correct it if necessary.', answer: 'The claim is false',
                  options: ['The claim is false', 'angle of the plane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of the cone.' },
                { id: 'b', prompt: 'Create a real-world scenario (from sports, architecture, or nature) that involves each of the four non-degenerate conic sections, and explain why that conic.', answer: 'Example: (1) Circle – a circular running track',
                  options: ['Example: (1) Circle – a circular running track', 'angle of the plane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of the cone.' }
          ],
            remediations: { 'the-angle-of-the-plane': { steps: ['Draw a clear diagram of a double-napped cone with its axis vertical.', 'Label the axis, a generator, and the base.', 'Show the angle between the generator and the axis (call it α).', 'Then draw three cutting planes: one perpendicular to the axis (angle 90° to axis), one at angle β where α < β < 90° to.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_006', difficulty: 'standard',
          question: 'An ellipse is the set of all points in a plane such that the sum of their.',
          hint: 'If stuck, revisit the distance formula (c9_math_ch1_4) and practice solving equations.',
          misconception: 'Students consistently confuse the relationship \\(c^2 = a^2 - b^2\\) for ellipses with \\(c^2 = a^2 + b^2\\) for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An ellipse is the set of all points in a plane such that the sum of their distances from',
                  options: ['An ellipse is the set of all points in a plane such that the sum of their distances from', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse the relationship \\(c^2 = a^2 - b^2\\) for ellipses with \\(c^2 = a^2 + b^2\\) for hyperbolas.' }
          ],
            remediations: { 'students-consistently-confuse-the-relationship': { steps: ['**Revisit the geometric definition:** Draw an ellipse with foci \\(F_1, F_2\\) and a point \\(P\\) on it.', 'Measure \\(PF_1 + PF_2 = 2a\\).', 'Show that the distance from centre to focus is \\(c\\), and from centre to vertex is \\(a\\).', 'Since \\(F_1\\) and \\(F_2\\) lie *between* the vertices, \\(c < a\\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_007', difficulty: 'standard',
          question: 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with.',
          hint: 'If stuck, revisit c11_math_cbse_11_006 (Ellipse: Definition and Standard Equation) and.',
          misconception: 'Students often confuse which denominator is \\(a^2\\) and which is \\(b^2\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >',
                  options: ['For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'An ellipse is the set of all points in a plane such that the sum of their distances from', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which denominator is \\(a^2\\) and which is \\(b^2\\).' }
          ],
            remediations: { 'students-often-confuse-which-denominator': { steps: ['Rewrite the ellipse equation in standard form \\(\\frac{x^2}{A} + \\frac{y^2}{B} = 1\\).', 'Compare \\(A\\) and \\(B\\). The larger denominator is \\(a^2\\) (semi-major axis squared), the smaller is \\(b^2\\).', 'If \\(A > B\\), major axis is x-axis: \\(c = \\sqrt{A - B}\\), \\(e = c/\\sqrt{A}\\), foci \\((\\pm c, 0)\\), directrices \\(x =.', 'Always verify \\(e < 1\\). Practice with 5 examples of each orientation.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_002', difficulty: 'standard',
          question: 'A circle is the set of all points in a plane that are at a fixed distance.',
          hint: 'If stuck, revisit the distance formula derivation (c9_math_ch1_4) and practice completing.',
          misconception: 'Students often write the standard equation as (x + h)² + (y + k)² = r² when the centre is (h, k), treating the signs in.',
          parts: [
                { id: 'a', prompt: 'A circle has equation (x - 2)² + (y + 5)² = 16. Without calculating, explain why the point (2, -1) lies on this circle.', answer: 'Substituting x = 2, y = -1 gives (2 - 2)² + (-1 + 5)² = 0 + 16 = 16',
                  options: ['Substituting x = 2, y = -1 gives (2 - 2)² + (-1 + 5)² = 0 + 16 = 16', 'the point is 4 units away from the centre'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the standard equation as (x + h)² + (y + k)² = r² when the centre is (h, k), treating the signs in the formula as.' }
          ],
            remediations: { 'students-often-write-the-standard': { steps: ['Have the student state the distance formula between (x, y) and (h, k).', 'Ask them to set that distance equal to r and square both sides.', 'Explicitly write (x - h)² + (y - k)² = r² and say: "The signs inside the brackets are MINUS the coordinates of the.', 'Practice with centres like (-2, -5) → (x + 2)² + (y + 5)² = r², and (0, 3) → x² + (y - 3)² = r².', 'Give 5 rapid-fire centres (including positive, negative, zero) and have them write the left-hand side only, correcting.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the standard equation as (x + h)² + (y + k)² = r² when the centre is (h, k), treating the signs in.',
          parts: [
                { id: 'a', prompt: 'A student claims that the equation (x - h)² + (y - k)² = r² represents a circle for all real values of h, k, r. Evaluate this claim and correct it if necessary.', answer: 'The claim is false',
                  options: ['The claim is false', 'it\'s always a circle', 'find the condition for the equation to represent a real circle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the standard equation as (x + h)² + (y + k)² = r² when the centre is (h, k), treating the signs in the formula as.' }
          ],
            remediations: { 'students-often-write-the-standard': { steps: ['Have the student state the distance formula between (x, y) and (h, k).', 'Ask them to set that distance equal to r and square both sides.', 'Explicitly write (x - h)² + (y - k)² = r² and say: "The signs inside the brackets are MINUS the coordinates of the.', 'Practice with centres like (-2, -5) → (x + 2)² + (y + 5)² = r², and (0, 3) → x² + (y - 3)² = r².', 'Give 5 rapid-fire centres (including positive, negative, zero) and have them write the left-hand side only, correcting.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_003', difficulty: 'standard',
          question: 'The general equation of a circle is a second-degree equation in two variables.',
          hint: 'If stuck, revisit completing the square for expressions like \\(x^2 + 2gx\\) (add \\(g^2\\).',
          misconception: 'Students often write the centre as \\((g, f)\\) instead of \\((-g, -f)\\) because they directly read the coefficients of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general equation of a circle is a second-degree equation in two variables of the form',
                  options: ['The general equation of a circle is a second-degree equation in two variables of the form', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'An ellipse is the set of all points in a plane such that the sum of their distances from', 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the centre as \\((g, f)\\) instead of \\((-g, -f)\\) because they directly read the coefficients of \\(x\\) and \\(y\\) from.' }
          ],
            remediations: { 'students-often-write-the-centre': { steps: ['Divide the entire equation by 3 to make coefficients of \\(x^2\\) and \\(y^2\\) equal to 1.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_004', difficulty: 'standard',
          question: 'A parabola is the set of all points in a plane that are equidistant from a.',
          hint: 'If stuck, revisit Class 9 coordinate geometry distance formula (c9_math_ch1_4) and.',
          misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the.',
          parts: [
                { id: 'a', prompt: 'Write the standard equation of a parabola with vertex at origin, focus at (3,0), and directrix x = -3. Identify the axis and the length of latus rectum.', answer: 'The equation is y² = 12x',
                  options: ['The equation is y² = 12x', '\'a\' is the coefficient directly rather than 4a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the focus-directrix.' },
                { id: 'b', prompt: 'Explain why the equation y² = -8x represents a parabola opening to the left, and describe how the negative sign affects the focus and directrix compared to y².', answer: 'For y² = -8x, we have 4a = -8 so a = -2',
                  options: ['For y² = -8x, we have 4a = -8 so a = -2', 'negative means it opens down'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the focus-directrix.' }
          ],
            remediations: { 'students-memorise-the-four-standard': { steps: ['Have the student re-derive ONE standard equation from scratch: Place focus at (a,0), directrix x = -a.', 'Distance to line = |x + a|.', 'Set equal, square: (x-a)² + y² = (x+a)².', 'Expand: x² - 2ax + a² + y² = x² + 2ax + a².'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For the parabola x² = -12y, the focus is at (0,-3) and the directrix is y = 3.', answer: 'The focus (0,-3) and directrix y = 3 are correct (a = -3)',
                  options: ['The focus (0,-3) and directrix y = 3 are correct (a = -3)', 'length is 12 units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the focus-directrix.' }
          ],
            remediations: { 'students-memorise-the-four-standard': { steps: ['Have the student re-derive ONE standard equation from scratch: Place focus at (a,0), directrix x = -a.', 'Distance to line = |x + a|.', 'Set equal, square: (x-a)² + y² = (x+a)².', 'Expand: x² - 2ax + a² + y² = x² + 2ax + a².'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
