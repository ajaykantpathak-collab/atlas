import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch11_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch11_p2: SimDef = {
    id: 'v3_c11_math_ch11_p2',
    title: 'Conic Sections · Part 2/2',
    subtitle: 'Watch one tilted plane generate four different curves.',
    classLevel: 11, subject: 'mathematics', topic: 'Conic Sections · Part 2/2',
    chapters: ['c11_math_ch11'],
    nodeIds: ['c11_math_cbse_11_007', 'c11_math_cbse_11_008', 'c11_math_cbse_11_009', 'c11_math_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a dish designer choosing the cross-section that focuses signal', intro: 'A satellite dish must bounce every signal to one focus — which is why its profile is a parabola, and why the slice angle matters.', goal: 'Classify conics by the plane\'s angle to the axis and read circle equations by completing the square.' },
    discovery: {
        question: 'One cone, one plane — tilt the plane and you get four different curves. How?',
        options: ['The tilt angle chooses circle, ellipse, parabola, or hyperbola', 'Each cone makes only one shape', 'The plane creates random curves', 'Only circles come from cones'],
        answer: 'The tilt angle chooses circle, ellipse, parabola, or hyperbola',
        hook: 'Every satellite orbit and every torch beam is the same cone, sliced differently. Watch it happen.',
    },
    teaching: [
        { title: 'Ellipse: Eccentricity, Foci and Directrices', text: 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b > 0\\) (major axis along x-axis), the eccentricity is \\(e = \\frac{c}{a}\\) where \\(c^2 = a^2 - b^2\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_11_007', title: 'Your mission',
          mission: { widget: 'conic', validate: 'conic:tilt=60',
            instruction: 'On the lab: tilt the plane past 60° — what curve do you get?.',
        context: 'Tilt the plane past 60° — what curve do you get?',
            observePrompt: 'What did the conic interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_007', title: 'Ellipse: Eccentricity, Foci and Directrices',
          scaffold: { problem: 'A satellite orbits Earth in an elliptical path with equation \\(\\frac{x^2}{2500} + \\frac{y^2}{900} = 1\\) (distances in km).',
            steps: [
            { text: 'Identify \\(a^2\\) and \\(b^2\\). Since \\(2500 > 900\\), \\(a^2 = 2500, b^2 = 900\\). So \\(a = 50\\) km, \\(b = 30\\) km.' },
            { text: 'Compute \\(c = \\sqrt{a^2 - b^2} = \\sqrt{2500 - 900} = \\sqrt{1600} = 40\\) km.' },
            { text: 'Eccentricity \\(e = c/a = 40/50 = 0.8\\).' },
            { text: 'Foci are at \\((\\pm c, 0) = (\\pm 40, 0)\\) km.' },
            { text: 'Directrices: \\(x = \\pm a/e = \\pm 50/0.8 = \\pm 62.5\\) km.', faded: true, blankAnswer: '\\(e = 0.8\\), foci \\((\\pm 40, 0)\\) km, directrices \\(x = \\pm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_008', title: 'Hyperbola: Definition and Standard Equation',
          scaffold: { problem: 'A hyperbola has its centre at the origin and foci at \\((\\pm 5, 0)\\).',
            steps: [
            { text: 'Identify given data. Foci at \\((\\pm 5, 0)\\) means \\(c = 5\\). The constant difference is \\(2a = 6\\), so \\(a = 3\\).' },
            { text: 'Determine orientation. Since foci are on the x-axis, the transverse axis is along the x-axis.' },
            { text: 'Compute \\(b^2\\) using the hyperbola relationship \\(c^2 = a^2 + b^2\\). \\(b^2 = c^2 - a^2 = 25 - 9 = 16\\).' },
            { text: 'Write the standard equation: \\(\\frac{x^2}{9} - \\frac{y^2}{16} = 1\\).' },
            { text: 'State vertices: \\((\\pm a, 0) = (\\pm 3, 0)\\). Length of conjugate axis = \\(2b = 2 \\times 4 = 8\\).', faded: true, blankAnswer: 'Equation: \\(\\frac{x^2}{9} - \\frac{y^2}{16} = 1\\); Vertices.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_009', title: 'Hyperbola: Eccentricity and Asymptotes',
          scaffold: { problem: 'A cooling tower for a thermal power plant in Maharashtra has a hyperbolic cross-section.',
            steps: [
            { text: 'Convert the given equation to standard form by dividing both sides by 400: \\(\\frac{25x^2}{400} - \\frac{16y^2}{400} = 1.' },
            { text: 'Identify \\(a^2\\) and \\(b^2\\). Since the positive term is \\(x^2\\), transverse axis is horizontal.' },
            { text: 'Compute eccentricity using \\(e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{25}{16}} = \\sqrt{\\frac{41}{16}}.' },
            { text: 'Find asymptotes: \\(y = \\pm \\frac{b}{a}x = \\pm \\frac{5}{4}x\\). So equations are \\(y = 1.25x\\) and \\(y = -1.25x\\).' },
            { text: 'Interpret: The tower\'s sides follow these asymptote lines at large heights.', faded: true, blankAnswer: 'Eccentricity \\(e = \\frac{\\sqrt{41}}{4} \\approx 1.60\\).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_010', title: 'Applications of Conic Sections',
          scaffold: { problem: 'A parabolic reflector for a solar cooker in a village school is 1.2 m wide and 0.3 m deep at the centre.',
            steps: [
            { text: 'Set up coordinate system. Place vertex at origin (0,0). The parabola opens upward (since the reflector is concave up).' },
            { text: 'Write the standard equation for a parabola opening upward with vertex at origin: x² = 4ay.' },
            { text: 'Use the given dimensions. The width is 1.2 m, so at the rim, x = ±0.6 m. The depth is 0.3 m, so at the rim, y = 0.3 m.' },
            { text: 'Substitute (0.6, 0.3) into x² = 4ay: (0.6)² = 4a(0.3) → 0.36 = 1.2a → a = 0.36 / 1.2 = 0.3 m.' },
            { text: 'The focus is at (0, a) = (0, 0.3). The cooking pot should be placed 0.3 m (30 cm) above the vertex along the axis.', faded: true, blankAnswer: '0.3 m (30 cm) above the vertex.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_11_010', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Designing a satellite-dish exhibit, a teammate claims a plane tilted 60° to the horizontal \'obviously gives an ellipse\', and writes the circle with centre (−3, 4) as (x − 3)² + (y + 4)² = 25 with \'radius 25\'.',
            decisions: [{ prompt: 'What does the geometry actually say?', options: [
                { text: 'Measure against the axis, not the horizontal: the conic is decided by comparing the plane\'s angle to the cone\'s AXIS with the generator\'s angle to the axis — a 60°-to-horizontal plane can cut both nappes and give a hyperbola. And the circle formula is (x − h)² + (y − k)² = r² with h, k carrying their signs — centre (−3, 4) gives (x + 3)² + (y − 4)² = 25, and 25 is r², so r = 5.', outcome: 'Both corrections come from reading the formula as geometry: the angle reference is the axis, the equation is the distance formula squared.' },
                { text: 'Accept the 60°-ellipse call — tilted but not parallel to the side means ellipse.', outcome: 'The test is plane-vs-generator angle around the axis: tilt from horizontal tells you nothing until compared with the generator\'s tilt.', reveals: 'angle-measured-from-horizontal' },
                { text: 'Keep the circle equation — the formula uses the centre\'s magnitudes, signs already baked in.', outcome: 'The pattern is (x − h) with h itself signed: for h = −3 the bracket becomes x + 3 — and the right side is r², so calling r = 25 inflates the radius 5×.', reveals: 'circle-signs-and-r-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_11_010', title: 'You made it',
          caseStudy: { intro: 'Circle, ellipse, parabola, hyperbola — four curves, one cone, one idea. Kepler\'s orbits live here.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'conic', prompt: 'Explore the conic interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'conic', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_11_007', difficulty: 'standard',
          question: 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with.',
          hint: 'If stuck, revisit c11_math_cbse_11_006 (Ellipse: Definition and Standard Equation) and.',
          misconception: 'Students often confuse which denominator is \\(a^2\\) and which is \\(b^2\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >',
                  options: ['For an ellipse in standard form \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\) with \\(a > b >', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a', 'The general equation of a circle is a second-degree equation in two variables of the form'],
                  hint: 'If stuck, revisit c11_math_cbse_11_006 (Ellipse: Definition and Standard Equation) and practice.',
                  misconception: 'Students often confuse which denominator is \\(a^2\\) and which is \\(b^2\\).' }
          ],
            remediations: { 'students-often-confuse-which-denominator': { steps: ['Rewrite the ellipse equation in standard form \\(\\frac{x^2}{A} + \\frac{y^2}{B} = 1\\).', 'Compare \\(A\\) and \\(B\\). The larger denominator is \\(a^2\\) (semi-major axis squared), the smaller is \\(b^2\\).', 'If \\(A > B\\), major axis is x-axis: \\(c = \\sqrt{A - B}\\), \\(e = c/\\sqrt{A}\\), foci \\((\\pm c, 0)\\), directrices \\(x.', 'Always verify \\(e < 1\\). Practice with 5 examples of each orientation.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_008', difficulty: 'standard',
          question: 'A hyperbola is the set of all points in a plane such that the absolute.',
          hint: 'If stuck, revisit the distance formula (c9_math_ch1_4) and practice isolating a square.',
          misconception: 'Students often confuse the relationship \\(c^2 = a^2 + b^2\\) for hyperbolas with \\(c^2 = a^2 - b^2\\) for ellipses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A hyperbola is the set of all points in a plane such that the absolute difference of the',
                  options: ['A hyperbola is the set of all points in a plane such that the absolute difference of the', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a', 'The general equation of a circle is a second-degree equation in two variables of the form'],
                  hint: 'If stuck, revisit the distance formula (c9_math_ch1_4) and practice isolating a square root and.',
                  misconception: 'Students often confuse the relationship \\(c^2 = a^2 + b^2\\) for hyperbolas with \\(c^2 = a^2 - b^2\\) for ellipses.' }
          ],
            remediations: { 'students-often-confuse-the-relationship': { steps: ['Ask the student to plot the given foci and vertices on graph paper.', 'Have them identify which axis contains the vertices – that is the transverse axis.', 'Remind them: "The positive term in the standard equation corresponds to the variable of the transverse axis." 4.', 'Practice with three examples: (a) foci \\((\\pm c, 0)\\) → \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\); (b) foci \\((0, \\pm.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_009', difficulty: 'standard',
          question: 'For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2}.',
          hint: 'If stuck, revisit node c11_math_cbse_11_008 to practice converting equations like \\(9x^2.',
          misconception: 'Students often confuse the eccentricity formula with that of ellipse, writing \\(e = \\sqrt{1 - \\frac{b^2}{a^2}}\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\)',
                  options: ['For a hyperbola with standard equation \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\)', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A circle is the set of all points in a plane that are at a fixed distance (radius) from a', 'The general equation of a circle is a second-degree equation in two variables of the form'],
                  hint: 'If stuck, revisit node c11_math_cbse_11_008 to practice converting equations like \\(9x^2 - 16y^2.',
                  misconception: 'Students often confuse the eccentricity formula with that of ellipse, writing \\(e = \\sqrt{1 - \\frac{b^2}{a^2}}\\) instead of \\(e = \\sqrt{1.' }
          ],
            remediations: { 'students-often-confuse-the-eccentricity': { steps: ['Always convert the given equation to standard form \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\) or \\(\\frac{y^2}{b^2}.', 'Identify which denominator belongs to \\(x^2\\) (that\'s \\(a^2\\) for horizontal transverse axis) and which to \\(y^2\\).', 'For horizontal transverse axis, \\(e = \\sqrt{1 + \\frac{b^2}{a^2}}\\), asymptotes \\(y = \\pm \\frac{b}{a}x\\).', 'Practice with 3 examples where you deliberately make the "forget to divide" error, then correct it.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_010', difficulty: 'standard',
          question: 'Applications of conic sections refer to the use of geometric properties.',
          hint: 'Revisit c11_math_cbse_11_005 (parabola focus-directrix) and c11_math_cbse_11_007 (ellipse.',
          misconception: 'Students often confuse the orientation of the parabola in bridge/arch problems: they use y² = 4ax (horizontal) when the.',
          parts: [
                { id: 'a', prompt: 'Compare the reflective properties of a parabola and an ellipse. A whispering gallery uses an elliptical ceiling.', answer: 'Ellipse: Ray from one focus reflects to the other focus',
                  options: ['Ellipse: Ray from one focus reflects to the other focus', 'parabola focuses to two points'],
                  hint: 'Revisit c11_math_cbse_11_005 (parabola focus-directrix) and c11_math_cbse_11_007 (ellipse foci).',
                  misconception: 'Students often confuse the orientation of the parabola in bridge/arch problems: they use y² = 4ax (horizontal) when the arch\'s axis.' }
          ],
            remediations: { 'students-often-confuse-the-orientation': { steps: ['Draw the coordinate system on the physical object: mark vertex, axis direction, and which way the curve opens.', 'Write the standard equation that matches this orientation (use the "vertex at origin, axis along x/y" table).', 'Identify two points on the curve from given dimensions (span, depth, height).', 'Substitute these points into the equation to solve for \'a\' or \'b\'.'], labTask: { instruction: 'On the interactive: tilt the plane past 60° — what curve do you get? — then check.', widget: 'conic', validate: 'conic:tilt=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
