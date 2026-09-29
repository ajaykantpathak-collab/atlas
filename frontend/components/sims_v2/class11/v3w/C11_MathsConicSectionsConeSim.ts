import type { SimDef } from '../../engine/types';
import C11_MathsConicSectionsConeSim from '../../../simulations/three/C11_MathsConicSectionsConeSim';

/** v3 wrapped master — C11_MathsConicSectionsConeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathsconicsectionsconesim: SimDef = {
    id: 'v3w_c11_mathsconicsectionsconesim',
    title: 'Conic Sections: Introduction and Definition',
    subtitle: 'This node covers only the geometric definition of conic sections, the classification of.',
    classLevel: 11, subject: 'mathematics', topic: 'Conic Sections: Introduction and Definition',
    chapters: [],
    nodeIds: ['c11_math_cbse_11_001', 'c11_math_cbse_11_003', 'c11_math_cbse_11_004', 'c11_math_cbse_11_010'],
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_11_010', title: 'Applications of conic sections refer to.',
          scaffold: { problem: 'A parabolic reflector for a solar cooker in a village school is 1.2 m wide and 0.3 m deep at the centre.',
            steps: [
            { text: 'Set up coordinate system. Place vertex at origin (0,0). The parabola opens upward (since the reflector is concave up).' },
            { text: 'Write the standard equation for a parabola opening upward with vertex at origin: x² = 4ay.' },
            { text: 'Use the given dimensions. The width is 1.2 m, so at the rim, x = ±0.6 m. The depth is 0.3 m, so at the rim, y = 0.3 m.' },
            { text: 'Substitute (0.6, 0.3) into x² = 4ay: (0.6)² = 4a(0.3) → 0.36 = 1.2a → a = 0.36 / 1.2 = 0.3 m.' },
            { text: 'The focus is at (0, a) = (0, 0.3). The cooking pot should be placed 0.3 m (30 cm) above the vertex along the axis.', faded: true, blankAnswer: '0.3 m (30 cm) above the vertex.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_11_003', title: 'Identify each idea',
          dissect: { specimen: 'Conic Sections: Introduction and Definition', spots: [
            { id: 's1', label: 'A conic section is a', prompt: 'Which idea is this? — A conic section is a curve obtained by intersecting a plane with a double-napped right.', answer: 'A conic section is a', options: ['A conic section is a', 'The general equation of a', 'A parabola is the set', 'Applications of conic sections refer'] },
            { id: 's2', label: 'The general equation of a', prompt: 'Which idea is this? — The general equation of a circle is a second-degree equation in two variables of the form.', answer: 'The general equation of a', options: ['The general equation of a', 'A conic section is a', 'A parabola is the set', 'Applications of conic sections refer'] },
            { id: 's3', label: 'A parabola is the set', prompt: 'Which idea is this? — A parabola is the set of all points in a plane that are equidistant from a fixed point.', answer: 'A parabola is the set', options: ['A parabola is the set', 'A conic section is a', 'The general equation of a', 'Applications of conic sections refer'] },
            { id: 's4', label: 'Applications of conic sections refer', prompt: 'Which idea is this? — Applications of conic sections refer to the use of geometric properties of circles,.', answer: 'Applications of conic sections refer', options: ['Applications of conic sections refer', 'A conic section is a', 'The general equation of a', 'A parabola is the set'] }
          ] } }
    ],
    explore: { component: C11_MathsConicSectionsConeSim, prompt: 'Explore the interactive — Conic Sections: Introduction and Definition' },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_11_003', difficulty: 'standard',
          question: 'The general equation of a circle is a second-degree equation in two variables.',
          hint: 'If stuck, revisit completing the square for expressions like \\(x^2 + 2gx\\) (add \\(g^2\\).',
          misconception: 'Students often write the centre as \\((g, f)\\) instead of \\((-g, -f)\\) because they directly read the coefficients of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The general equation of a circle is a second-degree equation in two variables of the form',
                  options: ['The general equation of a circle is a second-degree equation in two variables of the form', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'A parabola is the set of all points in a plane that are equidistant from a fixed point', 'Applications of conic sections refer to the use of geometric properties of circles,'],
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
            remediations: { 'students-memorise-the-four-standard': { steps: ['Have the student re-derive ONE standard equation from scratch: Place focus at (a,0), directrix x = -a.', 'Distance to line = |x + a|.', 'Set equal, square: (x-a)² + y² = (x+a)².', 'Expand: x² - 2ax + a² + y² = x² + 2ax + a².'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_11_010', difficulty: 'standard',
          question: 'Applications of conic sections refer to the use of geometric properties of.',
          hint: 'Revisit c11_math_cbse_11_005 (parabola focus-directrix) and c11_math_cbse_11_007 (ellipse.',
          misconception: 'Students often confuse the orientation of the parabola in bridge/arch problems: they use y² = 4ax (horizontal) when the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of conic sections refer to the use of geometric properties of circles,',
                  options: ['Applications of conic sections refer to the use of geometric properties of circles,', 'A conic section is a curve obtained by intersecting a plane with a double-napped right', 'The general equation of a circle is a second-degree equation in two variables of the form', 'A parabola is the set of all points in a plane that are equidistant from a fixed point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the orientation of the parabola in bridge/arch problems: they use y² = 4ax (horizontal) when the arch\'s axis is.' }
          ],
            remediations: { 'students-often-confuse-the-orientation': { steps: ['Draw the coordinate system on the physical object: mark vertex, axis direction, and which way the curve opens.', 'Write the standard equation that matches this orientation (use the "vertex at origin, axis along x/y" table).', 'Identify two points on the curve from given dimensions (span, depth, height).', 'Substitute these points into the equation to solve for \'a\' or \'b\'.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
