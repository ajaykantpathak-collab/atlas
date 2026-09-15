import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch11_p1: SimDef = {
    id: 'v3_c11_math_ch11_p1',
    title: 'Conic Sections · Part 1/2',
    subtitle: 'Watch one tilted plane generate four different curves.',
    classLevel: 11, subject: 'mathematics', topic: 'Conic Sections · Part 1/2',
    chapters: ['c11_math_ch11'],
    nodeIds: ['c11_math_cbse_11_001', 'c11_math_cbse_11_002', 'c11_math_cbse_11_003', 'c11_math_cbse_11_004', 'c11_math_cbse_11_005', 'c11_math_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a dish designer choosing the cross-section that focuses signal', intro: 'A satellite dish must bounce every signal to one focus — which is why its profile is a parabola, and why the slice angle matters.', goal: 'Classify conics by the plane\'s angle to the axis and read circle equations by completing the square.' },
    discovery: {
        question: 'One cone, one plane — tilt the plane and you get four different curves. How?',
        options: ['The tilt angle chooses circle, ellipse, parabola, or hyperbola', 'Each cone makes only one shape', 'The plane creates random curves', 'Only circles come from cones'],
        answer: 'The tilt angle chooses circle, ellipse, parabola, or hyperbola',
        hook: 'Every satellite orbit and every torch beam is the same cone, sliced differently. Watch it happen.',
    },
    teaching: [
        { title: 'Conic Sections: Introduction and Definition', text: 'A conic section is a curve obtained by intersecting a plane with a double-napped right circular cone; the four distinct non-degenerate curves formed are the circle, ellipse, parabola, and hyperbola.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_11_001', title: 'Your mission',
          mission: { widget: 'conic', validate: 'conic:tilt=60',
            instruction: 'On the lab: tilt the plane past 60° — what curve do you get?.',
        context: 'Tilt the plane past 60° — what curve do you get?',
            observePrompt: 'What did the conic interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_11_001', title: 'Conic Sections: Introduction and Definition',
          caseStudy: { intro: 'Imagine you are designing a satellite dish for a communications tower in Bengaluru: the dish must reflect signals to a single focal point, so its cross-section.',
            decisions: [{ prompt: 'What is the geometric definition of a conic section?', options: [
                { text: 'A conic section is the curve formed by the intersection of a plane with a double-napped', outcome: 'A conic section is the curve formed by the intersection of a plane with a double-napped right.' },
                { text: 'a conic is a quadratic equation', outcome: 'Not quite — Students often think that the "angle of the plane" is measured from the horizontal (base) rather.', reveals: 'the-angle-of-the-plane' },
                { text: 'a conic is a parabola', outcome: 'Not quite — Students often think that the "angle of the plane" is measured from the horizontal (base) rather.', reveals: 'the-angle-of-the-plane' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_002', title: 'Circle: Standard Equation',
          scaffold: { problem: 'A circular fountain is to be built in a rectangular park. The park\'s coordinate grid has origin at the southwest corner.',
            steps: [
            { text: 'Identify given information: centre C = (20, 15), point on circle P = (28, 15).' },
            { text: 'Recall standard equation: (x - h)² + (y - k)² = r², where (h, k) = (20, 15).' },
            { text: 'Radius r is distance from centre to point P. Use distance formula: r = √[(28 - 20)² + (15 - 15)²] = √[8² + 0²] = 8.' },
            { text: 'Substitute h, k, r into standard equation: (x - 20)² + (y - 15)² = 8² → (x - 20)² + (y - 15)² = 64.' },
            { text: 'Compute area = πr² = 3.14 × 64 = 200.96 m².' },
            { text: 'Verify: The point (28, 15) gives (8)² + (0)² = 64, satisfying the equation.', faded: true, blankAnswer: 'Equation: (x - 20)² + (y - 15)² = 64; Area = 200.96 m².' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_003', title: 'Circle: General Equation',
          scaffold: { problem: 'A circular racing track is designed such that its boundary follows the equation \\(x^2 + y^2 - 10x + 4y - 20 = 0\\) where coordinates are.',
            steps: [
            { text: 'Identify the coefficients by comparing with the general form \\(x^2 + y^2 + 2gx + 2fy + c = 0\\).' },
            { text: 'Write the centre using \\((-g, -f)\\). Centre = \\((-(-5), -2) = (5, -2)\\) km.' },
            { text: 'Compute \\(g^2 + f^2 - c = (-5)^2 + (2)^2 - (-20) = 25 + 4 + 20 = 49\\).' },
            { text: 'Since \\(49 > 0\\), it is a real circle. Radius \\(r = \\sqrt{49} = 7\\) km.' },
            { text: 'The pit stop at the centre is at \\((5, -2)\\) km. Interpret: the track is a circle of radius 7 km centred 5 km east and.', faded: true, blankAnswer: 'Centre = (5, -2) km, Radius = 7 km, Pit stop coordinates.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_004', title: 'Parabola: Definition and Standard Equation',
          scaffold: { problem: 'A parabolic satellite dish has its vertex at the centre of the dish and focus 60 cm from the vertex along the axis.',
            steps: [
            { text: 'Identify given information: focal length a = 60 cm (focus at (60,0) since axis is x-axis and dish opens right).' },
            { text: 'Choose standard form: Axis is x-axis, so equation is y² = 4ax. Substitute a = 60: y² = 240x.' },
            { text: 'Find depth: At the opening edge, y = 60 (or -60). Substitute in equation: 60² = 240x → 3600 = 240x → x = 3600/240 = 15.' },
            { text: 'Verify: Depth is x-coordinate at opening = 15 cm. Check focus-directrix property: For point (15,60), distance to focus.' },
            { text: 'Interpret: The dish is 15 cm deep at centre. Equation: y² = 240x (x in cm, y in cm).', faded: true, blankAnswer: 'Depth = 15 cm. Equation: y² = 240x (with x, y in cm).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_005', title: 'Parabola: Focus, Directrix and Latus Rectum',
          scaffold: { problem: 'A parabolic satellite dish has a cross-section modeled by \\(y^2 = 12x\\) (dimensions in metres).',
            steps: [
            { text: 'Identify the standard form: \\(y^2 = 4ax\\) with \\(4a = 12\\), so \\(a = 3\\). The parabola opens to the right.' },
            { text: 'Focus is at \\((a, 0) = (3, 0)\\) metres from the vertex. This is where the receiver must be placed.' },
            { text: 'Directrix is the line \\(x = -a = -3\\) metres (behind the vertex).' },
            { text: 'Latus rectum length = \\(4a = 12\\) metres. This is the width of the dish at the focus.' },
            { text: 'Verify: Endpoints of latus rectum are \\((3, \\pm 6)\\); they satisfy \\(y^2 = 36 = 12 \\times 3 = 36\\). Correct.', faded: true, blankAnswer: 'Focus: \\((3, 0)\\) m; Directrix: \\(x = -3\\) m; Latus rectum.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_006', title: 'Ellipse: Definition and Standard Equation',
          scaffold: { problem: 'The arch of a bridge in Delhi is shaped like a semi-ellipse. The span (width) of the bridge is 20 metres and the maximum height at the.',
            steps: [
            { text: 'Identify the given geometric information. The span is the major axis length = 20 m, so semi-major axis \\(a = 10\\) m.' },
            { text: 'Write the standard equation for horizontal major axis: \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\).' },
            { text: 'To find the height 4 metres from the centre, substitute \\(x = 4\\) into the equation: \\(\\frac{4^2}{100} + \\frac{y^2}{36}.' },
            { text: 'Solve for \\(y^2\\): \\(\\frac{y^2}{36} = 1 - \\frac{16}{100} = \\frac{84}{100} = \\frac{21}{25}\\).' },
            { text: 'Take the positive square root (since we want the height above the x-axis): \\(y = \\sqrt{30.24} \\approx 5.5\\) m.', faded: true, blankAnswer: 'Equation: \\(\\frac{x^2}{100} + \\frac{y^2}{36} = 1\\); Height.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_11_006', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Designing a satellite-dish exhibit, a teammate claims a plane tilted 60° to the horizontal \'obviously gives an ellipse\', and writes the circle with centre (−3, 4) as (x − 3)² + (y + 4)² = 25 with \'radius 25\'.',
            decisions: [{ prompt: 'What does the geometry actually say?', options: [
                { text: 'Measure against the axis, not the horizontal: the conic is decided by comparing the plane\'s angle to the cone\'s AXIS with the generator\'s angle to the axis — a 60°-to-horizontal plane can cut both nappes and give a hyperbola. And the circle formula is (x − h)² + (y − k)² = r² with h, k carrying their signs — centre (−3, 4) gives (x + 3)² + (y − 4)² = 25, and 25 is r², so r = 5.', outcome: 'Both corrections come from reading the formula as geometry: the angle reference is the axis, the equation is the distance formula squared.' },
                { text: 'Accept the 60°-ellipse call — tilted but not parallel to the side means ellipse.', outcome: 'The test is plane-vs-generator angle around the axis: tilt from horizontal tells you nothing until compared with the generator\'s tilt.', reveals: 'angle-measured-from-horizontal' },
                { text: 'Keep the circle equation — the formula uses the centre\'s magnitudes, signs already baked in.', outcome: 'The pattern is (x − h) with h itself signed: for h = −3 the bracket becomes x + 3 — and the right side is r², so calling r = 25 inflates the radius 5×.', reveals: 'circle-signs-and-r-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Circle, ellipse, parabola, hyperbola — four curves, one cone, one idea. Kepler\'s orbits live here.',
            decisions: [{ prompt: 'What comes next? Conic Sections · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Conic Sections · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'conic', prompt: 'Explore the conic interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'conic', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_11_001', difficulty: 'standard',
          question: 'A conic section is a curve obtained by intersecting a plane with.',
          hint: 'If stuck, revisit Class 9 coordinate geometry (plotting points, distance formula) and.',
          misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis.',
          parts: [
                { id: 'a', prompt: 'If a plane cuts a double-napped cone parallel to its axis, which conic section is formed, and why does this cut produce two separate curves?', answer: 'A hyperbola is formed',
                  options: ['A hyperbola is formed', 'parabola', 'ellipse', 'angle of the plane'],
                  hint: 'If stuck, revisit Class 9 coordinate geometry (plotting points, distance formula) and Class 10.',
                  misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of the cone.' }
          ],
            remediations: { 'the-angle-of-the-plane': { steps: ['Draw a clear diagram of a double-napped cone with its axis vertical.', 'Label the axis, a generator, and the base.', 'Show the angle between the generator and the axis (call it α).', 'Then draw three cutting planes: one perpendicular to the axis (angle 90° to axis), one at angle β where α < β < 90°.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis.',
          parts: [
                { id: 'a', prompt: 'A student claims that a parabola is formed when the cutting plane is parallel to the base of the cone. Evaluate this claim and correct it if necessary.', answer: 'The claim is false',
                  options: ['The claim is false', 'angle of the plane'],
                  hint: 'If stuck, revisit Class 9 coordinate geometry (plotting points, distance formula) and Class 10.',
                  misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of the cone.' },
                { id: 'b', prompt: 'Create a real-world scenario (from sports, architecture, or nature) that involves each of the four non-degenerate conic sections, and explain why that conic.', answer: 'Example: (1) Circle – a circular running track',
                  options: ['Example: (1) Circle – a circular running track', 'angle of the plane'],
                  hint: 'If stuck, revisit Class 9 coordinate geometry (plotting points, distance formula) and Class 10.',
                  misconception: 'Students often think that the "angle of the plane" is measured from the horizontal (base) rather than from the axis of the cone.' }
          ],
            remediations: { 'the-angle-of-the-plane': { steps: ['Draw a clear diagram of a double-napped cone with its axis vertical.', 'Label the axis, a generator, and the base.', 'Show the angle between the generator and the axis (call it α).', 'Then draw three cutting planes: one perpendicular to the axis (angle 90° to axis), one at angle β where α < β < 90°.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_002', difficulty: 'standard',
          question: 'A circle is the set of all points in a plane that are at a fixed distance.',
          hint: 'If stuck, revisit the distance formula derivation (c9_math_ch1_4) and practice completing.',
          misconception: 'Students often write the standard equation as (x + h)² + (y + k)² = r² when the centre is (h, k), treating the signs.',
          parts: [
                { id: 'a', prompt: 'A circle has equation (x - 2)² + (y + 5)² = 16. Without calculating, explain why the point (2, -1) lies on this circle.', answer: 'Substituting x = 2, y = -1 gives (2 - 2)² + (-1 + 5)² = 0 + 16 = 16',
                  options: ['Substituting x = 2, y = -1 gives (2 - 2)² + (-1 + 5)² = 0 + 16 = 16', 'the point is 4 units away from the centre'],
                  hint: 'If stuck, revisit the distance formula derivation (c9_math_ch1_4) and practice completing the.',
                  misconception: 'Students often write the standard equation as (x + h)² + (y + k)² = r² when the centre is (h, k), treating the signs in the formula.' }
          ],
            remediations: { 'students-often-write-the-standard': { steps: ['Have the student state the distance formula between (x, y) and (h, k).', 'Ask them to set that distance equal to r and square both sides.', 'Explicitly write (x - h)² + (y - k)² = r² and say: "The signs inside the brackets are MINUS the coordinates of the.', 'Practice with centres like (-2, -5) → (x + 2)² + (y + 5)² = r², and (0, 3) → x² + (y - 3)² = r².'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_003', difficulty: 'standard',
          question: 'The general equation of a circle is a second-degree equation in two variables.',
          hint: 'If stuck, revisit completing the square for expressions like \\(x^2 + 2gx\\) (add \\(g^2\\).',
          misconception: 'Students often write the centre as \\((g, f)\\) instead of \\((-g, -f)\\) because they directly read the coefficients.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general equation of a circle is a second-degree equation in two variables of the form',
                  options: ['The general equation of a circle is a second-degree equation in two variables of the form', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a', 'A parabola is the set of all points in a plane that are equidistant from a fixed point'],
                  hint: 'If stuck, revisit completing the square for expressions like \\(x^2 + 2gx\\) (add \\(g^2\\) to make.',
                  misconception: 'Students often write the centre as \\((g, f)\\) instead of \\((-g, -f)\\) because they directly read the coefficients of \\(x\\) and \\(y\\) from.' }
          ],
            remediations: { 'students-often-write-the-centre': { steps: ['Divide the entire equation by 3 to make coefficients of \\(x^2\\) and \\(y^2\\) equal to 1.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_004', difficulty: 'standard',
          question: 'A parabola is the set of all points in a plane that are equidistant from.',
          hint: 'If stuck, revisit Class 9 coordinate geometry distance formula (c9_math_ch1_4) and.',
          misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the.',
          parts: [
                { id: 'a', prompt: 'Write the standard equation of a parabola with vertex at origin, focus at (3,0), and directrix x = -3. Identify the axis and the length of latus rectum.', answer: 'The equation is y² = 12x',
                  options: ['The equation is y² = 12x', '\'a\' is the coefficient directly rather than 4a'],
                  hint: 'If stuck, revisit Class 9 coordinate geometry distance formula (c9_math_ch1_4) and practice.',
                  misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the focus-directrix.' },
                { id: 'b', prompt: 'Explain why the equation y² = -8x represents a parabola opening to the left, and describe how the negative sign affects the focus and directrix compared to y².', answer: 'For y² = -8x, we have 4a = -8 so a = -2',
                  options: ['For y² = -8x, we have 4a = -8 so a = -2', 'negative means it opens down'],
                  hint: 'If stuck, revisit Class 9 coordinate geometry distance formula (c9_math_ch1_4) and practice.',
                  misconception: 'Students memorise the four standard equations as disconnected formulas without understanding the derivation from the focus-directrix.' }
          ],
            remediations: { 'students-memorise-the-four-standard': { steps: ['Have the student re-derive ONE standard equation from scratch: Place focus at (a,0), directrix x = -a.', 'Distance to line = |x + a|.', 'Set equal, square: (x-a)² + y² = (x+a)².', 'Expand: x² - 2ax + a² + y² = x² + 2ax + a².'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_005', difficulty: 'standard',
          question: 'A parabola is the set of all points in a plane that are equidistant from.',
          hint: 'If stuck, revisit c11_math_cbse_11_004 to practice rewriting equations in standard form.',
          misconception: 'Students often confuse the sign of \\(a\\) when the parabola opens left or downward.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A parabola is the set of all points in a plane that are equidistant from a fixed point',
                  options: ['A parabola is the set of all points in a plane that are equidistant from a fixed point', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a', 'The general equation of a circle is a second-degree equation in two variables of the form'],
                  hint: 'If stuck, revisit c11_math_cbse_11_004 to practice rewriting equations in standard form and.',
                  misconception: 'Students often confuse the sign of \\(a\\) when the parabola opens left or downward.' }
          ],
            remediations: { 'students-often-confuse-the-sign': { steps: ['Have the student sketch the parabola roughly.', 'Identify the vertex and the direction of opening (right/left/up/down).', 'Recall that the focus is always inside the parabola at distance \\(|a|\\) from the vertex along the axis.', 'The directrix is the line perpendicular to the axis at distance \\(|a|\\) from the vertex on the opposite side.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_006', difficulty: 'standard',
          question: 'An ellipse is the set of all points in a plane such that the sum of their.',
          hint: 'If stuck, revisit the distance formula (c9_math_ch1_4) and practice solving equations.',
          misconception: 'Students consistently confuse the relationship \\(c^2 = a^2 - b^2\\) for ellipses with \\(c^2 = a^2 + b^2\\) for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An ellipse is the set of all points in a plane such that the sum of their distances from',
                  options: ['An ellipse is the set of all points in a plane such that the sum of their distances from', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a', 'The general equation of a circle is a second-degree equation in two variables of the form'],
                  hint: 'If stuck, revisit the distance formula (c9_math_ch1_4) and practice solving equations like.',
                  misconception: 'Students consistently confuse the relationship \\(c^2 = a^2 - b^2\\) for ellipses with \\(c^2 = a^2 + b^2\\) for hyperbolas.' }
          ],
            remediations: { 'students-consistently-confuse-the-relationship': { steps: ['**Revisit the geometric definition:** Draw an ellipse with foci \\(F_1, F_2\\) and a point \\(P\\) on it.', 'Measure \\(PF_1 + PF_2 = 2a\\).', 'Show that the distance from centre to focus is \\(c\\), and from centre to vertex is \\(a\\).', 'Since \\(F_1\\) and \\(F_2\\) lie *between* the vertices, \\(c < a\\).'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
