import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch05_p2: SimDef = {
    id: 'v3_c9_math_ch05_p2',
    title: 'Circles: Chords and Arcs · Part 2/2',
    subtitle: 'Chords, arcs and the VIP chord',
    classLevel: 9, subject: 'mathematics', topic: 'Circles: Chords and Arcs · Part 2/2',
    chapters: ['c9_math_ch05'],
    nodeIds: ['c9_math_ch5_6', 'c9_math_ch5_7', 'c9_math_ch5_8', 'c9_math_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a circular-garden designer', intro: 'Designing a round garden means knowing your arc from your segment and your chord from your diameter. One naming slip and the flower beds land in the wrong place.', goal: 'Define and distinguish circle terminology — centre, radius, diameter, chord, arc, sector, segment, circumference — by the endpoints and boundaries of each.' },
    discovery: {
        question: 'Every diameter is a chord — so is every chord a diameter?',
        options: ['No — a diameter is the special chord that passes through the centre; any other chord joins two rim points without touching it', 'Yes — any line across a circle is a diameter', 'Yes — they\'re just two names for the same thing', 'No — diameters are curved'],
        answer: 'No — a diameter is the special chord that passes through the centre; any other chord joins two rim points without touching it',
        hook: 'The killer detail is endpoints: a radius runs centre-to-rim, a chord runs rim-to-rim, and a diameter is the chord that happens to pass through the middle. A sector is pizza-sliced by two radii; a segment is cut off by a single chord — sector = segment + a triangle.',
    },
    teaching: [
        { title: 'Angle Subtended by a Chord at the Centre', text: 'The angle subtended by a chord at the centre of a circle is the angle formed between the two radii drawn to the endpoints of the chord. For a chord AB and centre O, the angle subtended is ∠AOB.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch5_6', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Label a circular park like a pro: centre, radius, the one chord that\'s a diameter, arcs minor and major, the pizza-slice sector and the cut-off segment — then prove a 10 cm chord in a 10 cm-radius circle is definitely not \'a radius.\'',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_6', title: 'Angle Subtended by a Chord at the Centre',
          scaffold: { problem: 'In a circular garden of radius 15 m, two straight paths (chords) AB and CD are constructed such that AB = 18 m and CD = 18 m.',
            steps: [
            { text: 'Identify given: radius = 15 m, chord AB = 18 m, chord CD = 18 m, ∠AOB = 80°.' },
            { text: 'Recall theorem: Equal chords of a circle subtend equal angles at the centre.' },
            { text: 'Since AB = CD = 18 m, they are equal chords.' },
            { text: 'Therefore, ∠COD = ∠AOB = 80°.' },
            { text: 'State answer: The angle subtended by CD at the centre is 80°.', faded: true, blankAnswer: '80°' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_7', title: 'Angle Subtended by an Arc at the Centre and on the Circle',
          scaffold: { problem: 'In a circle with centre O, arc AB subtends ∠AOB = 110° at the centre.',
            steps: [
            { text: 'Identify the given: ∠AOB = 110° (angle at centre subtended by arc AB).' },
            { text: 'Recall the theorem: Angle at centre = 2 × Angle at circumference on the remaining part.' },
            { text: 'Apply the theorem: ∠ACB = ½ × ∠AOB = ½ × 110°.' },
            { text: 'Compute: ∠ACB = 55°.' },
            { text: 'Verify: Since C is on the major arc, the angle should be acute (less than 90°) for a central angle less than 180°.', faded: true, blankAnswer: '55°' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_8', title: 'Cyclic Quadrilateral: Opposite Angles Are Supplementary',
          scaffold: { problem: 'A circular park has a quadrilateral walking path ABCD inscribed in it. The path makes an angle of 65° at vertex A and 85° at vertex B.',
            steps: [
            { text: 'Identify that ABCD is a cyclic quadrilateral because all vertices lie on the circular park boundary.' },
            { text: 'Recall the theorem: Opposite angles of a cyclic quadrilateral are supplementary. So ∠A + ∠C = 180° and ∠B + ∠D = 180°.' },
            { text: 'Substitute given values: 65° + ∠C = 180° → ∠C = 180° - 65° = 115°.' },
            { text: 'Similarly, 85° + ∠D = 180° → ∠D = 180° - 85° = 95°.' },
            { text: 'Verify using quadrilateral angle sum: 65° + 85° + 115° + 95° = 360° ✓. The angles are ∠C = 115°, ∠D = 95°.', faded: true, blankAnswer: '∠C = 115°, ∠D = 95°' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_9', title: 'Concyclic Points: Definition and Conditions',
          scaffold: { problem: 'In a school playground, four poles are placed at the corners of a quadrilateral ABCD.',
            steps: [
            { text: 'Identify the given angles of quadrilateral ABCD: ∠A = 85°, ∠B = 95°, ∠C = 95°, ∠D = 85°.' },
            { text: 'Recall the condition for four points to be concyclic: opposite angles of the quadrilateral must be supplementary (sum.' },
            { text: 'Check the pairs of opposite angles. ∠A and ∠C are opposite: 85° + 95° = 180°. ∠B and ∠D are opposite: 95° + 85° = 180°.' },
            { text: 'Both pairs of opposite angles sum to 180°, so the condition is satisfied.' },
            { text: 'Conclude that points A, B, C, D are concyclic; a single circular track can be built touching all four poles.', faded: true, blankAnswer: 'Yes, a single circular track can be built because opposite.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch5_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch5_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling a diagram of a circle, a student marks a chord that misses the centre as \'diameter — it crosses the circle,\' and calls a 10 cm chord in a 10 cm-radius circle \'a radius, since it is 10 cm long.\'',
            decisions: [{ prompt: 'What do the definitions actually require?', options: [
                { text: 'Endpoints, not lengths: a radius runs centre-to-boundary and a diameter is a chord that passes through the centre. A chord joining two boundary points is never a radius, and a chord that skips the centre is never a diameter — no matter how long it is.', outcome: 'This checks the defining conditions — which endpoints and whether the centre lies on the segment — rather than matching lengths.' },
                { text: 'The labels are fine — any segment inside a circle touching the boundary is a diameter, and any 10 cm line is a radius here.', outcome: 'That ignores where the segment starts: radii must touch the centre, diameters must pass through it — position, not length, is the test.', reveals: 'length-defines-parts' },
                { text: 'Half right — the chord is not a diameter, but a 10 cm chord does count as a radius because the lengths match.', outcome: 'Equal length is a coincidence, not the definition: a chord\'s endpoints are both on the boundary, while a radius must end at the centre.', reveals: 'same-length-same-part' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch5_9', title: 'You made it',
          caseStudy: { intro: 'A circle is every point exactly one radius from the centre — and inside it lives a vocabulary: chord, diameter, arc, sector, segment. Each is defined by WHERE its endpoints sit.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch5_6', difficulty: 'standard',
          question: 'The angle subtended by a chord at the centre of a circle is the angle formed.',
          hint: 'Review Class 7 triangle congruence criteria (SSS, SAS) and Class 6 circle definitions.',
          misconception: 'Students often confuse the angle subtended by a chord at the centre with the angle subtended by the same chord at the.',
          parts: [
                { id: 'a', prompt: 'Two chords AB and CD of a circle with centre O are such that AB = 10 cm and CD = 10 cm.', answer: 'The angles subtended by AB and CD at the centre are equal',
                  options: ['The angles subtended by AB and CD at the centre are equal', 'angles are different'],
                  hint: 'Review Class 7 triangle congruence criteria (SSS, SAS) and Class 6 circle definitions (chord.',
                  misconception: 'Students often confuse the angle subtended by a chord at the centre with the angle subtended by the same chord at the circumference.' }
          ],
            remediations: { 'students-often-confuse-the-angle': { steps: ['To fix: Draw a circle with centre O.', 'Draw two equal chords AB and CD.', 'Show triangles OAB and OCD.', 'All radii equal, chords equal → triangles congruent by SSS → ∠AOB = ∠COD.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_7', difficulty: 'standard',
          question: 'The angle subtended by an arc at the centre of a circle is twice the angle.',
          hint: 'If stuck, revisit the exterior angle property (c7_math_ch07_008) and practice identifying.',
          misconception: 'Students often apply the theorem mechanically: "angle at centre = 2 × angle at circumference" without checking whether.',
          parts: [
                { id: 'a', prompt: 'In the figure, O is the centre of the circle. Arc AB subtends ∠AOB = 100° at the centre and ∠APB at point P on the major arc.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'No, because P is on the major arc', 'remaining part of the circle', 'the theorem only works for the minor arc or confuse major/minor segments'],
                  hint: 'If stuck, revisit the exterior angle property (c7_math_ch07_008) and practice identifying which arc.',
                  misconception: 'Students often apply the theorem mechanically: "angle at centre = 2 × angle at circumference" without checking whether the point is on the.' },
                { id: 'b', prompt: 'Two chords AB and CD intersect at point P inside the circle (not at the centre). A student argues that ∠APC = ½(∠AOC + ∠BOD) where O is the centre.', answer: 'Yes, it is a valid extension (the intersecting chords theorem)',
                  options: ['Yes, it is a valid extension (the intersecting chords theorem)', 'No, the theorem only applies to angles at the circumference'],
                  hint: 'If stuck, revisit the exterior angle property (c7_math_ch07_008) and practice identifying which arc.',
                  misconception: 'Students often apply the theorem mechanically: "angle at centre = 2 × angle at circumference" without checking whether the point is on the.' }
          ],
            remediations: { 'students-often-apply-the-theorem': { steps: ['Draw two clear diagrams: one with point P on the major arc, another with P on the minor arc.', 'In each, shade the arc that subtends the angle at P.', 'Ask: "Which central angle corresponds to this arc?" 4.', 'Show that for the major arc point, the central angle is the given one (e.g., 80°); for the minor arc point, the central.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_8', difficulty: 'standard',
          question: 'A cyclic quadrilateral is a quadrilateral whose all four vertices lie on.',
          hint: 'Revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and.',
          misconception: 'Students often confuse the cyclic quadrilateral theorem with the parallelogram theorem, thinking opposite angles are.',
          parts: [
                { id: 'a', prompt: 'A quadrilateral ABCD has ∠A = 80° and ∠C = 100°. Can you conclude ABCD is cyclic? What if ∠A = 80° and ∠B = 100°? Justify your answer.', answer: 'Case 1: ∠A + ∠C = 180°, so by converse theorem, ABCD is cyclic',
                  options: ['Case 1: ∠A + ∠C = 180°, so by converse theorem, ABCD is cyclic', 'opposite angles', 'adjacent angles'],
                  hint: 'Revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and practice.',
                  misconception: 'Students often confuse the cyclic quadrilateral theorem with the parallelogram theorem, thinking opposite angles are *equal* instead.' }
          ],
            remediations: { 'students-often-confuse-the-cyclic': { steps: ['Draw a cyclic quadrilateral and a parallelogram side by side.', 'Measure opposite angles in both using a protractor.', 'In the parallelogram, opposite angles are equal; in the cyclic quadrilateral, they sum to 180°.', 'Emphasize: "Cyclic quadrilateral vertices lie on a circle → arcs create supplementary angles.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_9', difficulty: 'standard',
          question: 'Concyclic points are a set of points that all lie on the circumference of the.',
          hint: 'If stuck, revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the.',
          misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.',
          parts: [
                { id: 'a', prompt: 'State the definition of concyclic points and the condition for four points A, B, C, D to be concyclic.', answer: 'Concyclic points are points that lie on the same circle',
                  options: ['Concyclic points are points that lie on the same circle', 'any four points are concyclic', 'they must form a square'],
                  hint: 'If stuck, revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and.',
                  misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.' },
                { id: 'b', prompt: 'Explain why any three non-collinear points are always concyclic, but four points may not be. Use a diagram in your explanation.', answer: 'Three non-collinear points form a triangle',
                  options: ['Three non-collinear points form a triangle', 'four points always make a circle', 'three collinear points are concyclic'],
                  hint: 'If stuck, revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and.',
                  misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.' },
                { id: 'c', prompt: 'In quadrilateral PQRS, ∠P = 70°, ∠Q = 110°, ∠R = 80°. Determine if PQRS is cyclic. If not, what should ∠R be for it to be cyclic?', answer: 'For a cyclic quadrilateral, opposite angles sum to 180°',
                  options: ['For a cyclic quadrilateral, opposite angles sum to 180°', 'yes it is cyclic'],
                  hint: 'If stuck, revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and.',
                  misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.' },
                { id: 'd', prompt: 'Two chords AB and CD of a circle intersect at point E inside the circle. Points A, B, C, D are on the circle.', answer: '∠AEC and ∠BED are vertically opposite angles, so they are equal',
                  options: ['∠AEC and ∠BED are vertically opposite angles, so they are equal', '∠AEC = ∠BED proves A,B,C,D are concyclic'],
                  hint: 'If stuck, revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and.',
                  misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.' }
          ],
            remediations: { 'if-a-quadrilateral-has-one': { steps: ['Ask the student to draw a circle and pick any three points on it.', 'Join them to form a triangle.', 'Then pick a fourth point on the circle and form a quadrilateral.', 'Measure opposite angles and verify they sum to 180°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a cyclic quadrilateral, if one angle is 90°, the opposite angle must also be 90°." Evaluate this statement and correct it if necessary.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'angles in a semicircle are 90°'],
                  hint: 'If stuck, revisit c9_math_ch5_7 (Angle Subtended by an Arc at the Centre and on the Circle) and.',
                  misconception: 'Students often think that if a quadrilateral has one pair of opposite angles supplementary, it is automatically cyclic.' }
          ],
            remediations: { 'if-a-quadrilateral-has-one': { steps: ['Ask the student to draw a circle and pick any three points on it.', 'Join them to form a triangle.', 'Then pick a fourth point on the circle and form a quadrilateral.', 'Measure opposite angles and verify they sum to 180°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
