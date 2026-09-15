import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch05_p1: SimDef = {
    id: 'v3_c9_math_ch05_p1',
    title: 'Circles: Chords and Arcs · Part 1/2',
    subtitle: 'Chords, arcs and the VIP chord',
    classLevel: 9, subject: 'mathematics', topic: 'Circles: Chords and Arcs · Part 1/2',
    chapters: ['c9_math_ch05'],
    nodeIds: ['c9_math_ch5_1', 'c9_math_ch5_10', 'c9_math_ch5_2', 'c9_math_ch5_3', 'c9_math_ch5_4', 'c9_math_ch5_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a circular-garden designer', intro: 'Designing a round garden means knowing your arc from your segment and your chord from your diameter. One naming slip and the flower beds land in the wrong place.', goal: 'Define and distinguish circle terminology — centre, radius, diameter, chord, arc, sector, segment, circumference — by the endpoints and boundaries of each.' },
    discovery: {
        question: 'Every diameter is a chord — so is every chord a diameter?',
        options: ['No — a diameter is the special chord that passes through the centre; any other chord joins two rim points without touching it', 'Yes — any line across a circle is a diameter', 'Yes — they\'re just two names for the same thing', 'No — diameters are curved'],
        answer: 'No — a diameter is the special chord that passes through the centre; any other chord joins two rim points without touching it',
        hook: 'The killer detail is endpoints: a radius runs centre-to-rim, a chord runs rim-to-rim, and a diameter is the chord that happens to pass through the middle. A sector is pizza-sliced by two radii; a segment is cut off by a single chord — sector = segment + a triangle.',
    },
    teaching: [
        { title: 'Circle: Basic Definitions and Terminology', text: 'A circle is the set of all points in a plane that are at a fixed distance (called the radius) from a fixed point (called the centre).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch5_1', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Label a circular park like a pro: centre, radius, the one chord that\'s a diameter, arcs minor and major, the pizza-slice sector and the cut-off segment — then prove a 10 cm chord in a 10 cm-radius circle is definitely not \'a radius.\'',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_1', title: 'Circle: Basic Definitions and Terminology',
          scaffold: { problem: 'A circular fountain in a park has centre O. The distance from O to the edge is 6 m.',
            steps: [
            { text: 'Identify the given fixed distance from centre to edge = 6 m. This is the radius. So OA = OB = OC = OD = 6 m.' },
            { text: 'The pipe AB passes through centre O and has endpoints on the circle. By definition, this is a diameter.' },
            { text: 'The rope CD joins two points on the circle but does not pass through O.' },
            { text: 'The gardener\'s curved path from C to D along the circle is an arc. Since it\'s the shorter path, it\'s the minor arc CD.' },
            { text: 'The region bounded by radii OC, OD and arc CD is a sector (sector O-CD).', faded: true, blankAnswer: '(i) Radius = 6 m (e.g., OA), (ii) Diameter AB = 12 m, (iii).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_10', title: 'Perpendicular from Centre to a Chord Bisects the Chord',
          scaffold: { problem: 'A circular park of radius 17 m has a straight walking path (chord) of length 30 m.',
            steps: [
            { text: 'Identify given: radius OA = 17 m, chord AB = 30 m. We need distance OM where OM ⟂ AB.' },
            { text: 'By theorem, perpendicular from centre bisects chord → AM = MB = 15 m.' },
            { text: 'In right triangle OMA, apply Pythagoras: OA² = OM² + AM².' },
            { text: 'Substitute: 17² = OM² + 15² → 289 = OM² + 225 → OM² = 64 → OM = 8 m.' },
            { text: 'Verify: 8² + 15² = 64 + 225 = 289 = 17². Distance = 8 m.', faded: true, blankAnswer: '8 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_2', title: 'Symmetry in a Circle: Rotational and Reflection Symmetry',
          scaffold: { problem: 'A circular garden of radius 10 m has a straight path (chord) of length 12 m.',
            steps: [
            { text: 'Recognize that the sprinkler must be at the midpoint of the chord because it is equidistant from the endpoints — this.' },
            { text: 'By reflection symmetry of the circle across the line joining the centre to the midpoint of the chord, the chord maps.' },
            { text: 'Draw the circle with centre O, chord AB = 12 m, midpoint M. Then OM ⟂ AB, so AM = 6 m.' },
            { text: 'In right triangle OAM, OA = radius = 10 m, AM = 6 m. By Pythagoras theorem: OM² = OA² - AM² = 100 - 36 = 64.' },
            { text: 'The sprinkler is at M, so its distance from the centre is 8 m.', faded: true, blankAnswer: '8 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_3', title: 'Chord of a Circle and Its Properties',
          scaffold: { problem: 'A circular swimming pool has a radius of 17 m. A straight lane rope (chord) is placed 8 m from the centre of the pool.',
            steps: [
            { text: 'Identify given values: radius r = 17 m, perpendicular distance from centre to chord d = 8 m. We need chord length AB.' },
            { text: 'Draw the circle with centre O. Draw chord AB. Draw perpendicular OM from O to AB, with M as midpoint of AB.' },
            { text: 'In right triangle OMA (right angle at M), apply Pythagoras theorem: OA² = OM² + AM². So AM² = OA² − OM² = r² − d².' },
            { text: 'Compute AM: AM² = 17² − 8² = 289 − 64 = 225. AM = √225 = 15 m.' },
            { text: 'Chord AB = 2 × AM = 2 × 15 = 30 m. Verify: 30 m is less than diameter (34 m), reasonable.', faded: true, blankAnswer: '30 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_4', title: 'Perpendicular Bisector of a Chord Passes Through Centre',
          scaffold: { problem: 'A circular garden has a straight path (chord) of length 24 metres across it.',
            steps: [
            { text: 'Identify given values — chord length AB = 24 m, perpendicular distance from centre OM = 5 m.' },
            { text: 'Apply the converse theorem (perpendicular from centre bisects chord) — since OM ⟂ AB, M is the midpoint.' },
            { text: 'In right triangle OMA, apply Pythagoras theorem: OA² = OM² + AM². OA is the radius we need.' },
            { text: 'Substitute values: OA² = 5² + 12² = 25 + 144 = 169. So OA = √169 = 13 m.' },
            { text: 'For locating centre practically: The gardener stretches the rope across the garden to mark chord AB.', faded: true, blankAnswer: 'Radius = 13 metres. Centre located at intersection.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch5_5', title: 'Equal Chords and Their Distances from the Centre',
          scaffold: { problem: 'In a circular park of radius 25 metres, two parallel walking paths (chords) are made.',
            steps: [
            { text: 'Identify given values: radius r = 25 m, length of first chord AB = 30 m, its distance from centre d₁ = 20 m.' },
            { text: 'Recall the theorem: chords equidistant from the centre are equal in length. Since d₁ = d₂ = 20 m, chord CD = chord AB.' },
            { text: 'Therefore, length of second path = 30 m. (No need for Pythagoras because the converse theorem directly gives equality.)' },
            { text: 'Verify using Pythagoras for the first chord: half of AB = 15 m. Check: 15² + 20² = 225 + 400 = 625 = 25². Consistent.' },
            { text: 'Interpret: Both walking paths are 30 m long and 20 m from the centre.', faded: true, blankAnswer: '30 metres' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch5_5', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling a diagram of a circle, a student marks a chord that misses the centre as \'diameter — it crosses the circle,\' and calls a 10 cm chord in a 10 cm-radius circle \'a radius, since it is 10 cm long.\'',
            decisions: [{ prompt: 'What do the definitions actually require?', options: [
                { text: 'Endpoints, not lengths: a radius runs centre-to-boundary and a diameter is a chord that passes through the centre. A chord joining two boundary points is never a radius, and a chord that skips the centre is never a diameter — no matter how long it is.', outcome: 'This checks the defining conditions — which endpoints and whether the centre lies on the segment — rather than matching lengths.' },
                { text: 'The labels are fine — any segment inside a circle touching the boundary is a diameter, and any 10 cm line is a radius here.', outcome: 'That ignores where the segment starts: radii must touch the centre, diameters must pass through it — position, not length, is the test.', reveals: 'length-defines-parts' },
                { text: 'Half right — the chord is not a diameter, but a 10 cm chord does count as a radius because the lengths match.', outcome: 'Equal length is a coincidence, not the definition: a chord\'s endpoints are both on the boundary, while a radius must end at the centre.', reveals: 'same-length-same-part' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch5_5', title: 'The bigger picture',
          caseStudy: { intro: 'A circle is every point exactly one radius from the centre — and inside it lives a vocabulary: chord, diameter, arc, sector, segment. Each is defined by WHERE its endpoints sit.',
            decisions: [{ prompt: 'What comes next? Circles: Chords and Arcs · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Circles: Chords and Arcs · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch5_1', difficulty: 'standard',
          question: 'A circle is the set of all points in a plane that are at a fixed distance.',
          hint: 'Review Class 6 Geometry: Points, Lines, Line Segments (c6_math_ch07_070) and Circle.',
          misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.',
          parts: [
                { id: 'a', prompt: 'Explain why every diameter of a circle is a chord, but not every chord is a diameter. Use the definitions of chord and diameter in your reasoning.', answer: 'A chord is any segment joining two points on the circle',
                  options: ['A chord is any segment joining two points on the circle', 'diameter is longer', 'they are the same'],
                  hint: 'Review Class 6 Geometry: Points, Lines, Line Segments (c6_math_ch07_070) and Circle Basics.',
                  misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.' },
                { id: 'b', prompt: 'In a circle with centre O and radius 7 cm, points A, B, C lie on the circumference such that AB passes through O and AC does not.', answer: '(i) AB (passes through O, length 14 cm)',
                  options: ['(i) AB (passes through O, length 14 cm)', 'passes through centre', 'OC as diameter or calling AC a diameter'],
                  hint: 'Review Class 6 Geometry: Points, Lines, Line Segments (c6_math_ch07_070) and Circle Basics.',
                  misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.' },
                { id: 'c', prompt: 'Compare a sector and a segment of a circle. Draw a labelled diagram for each and explain which radii/chords bound them.', answer: 'A sector is bounded by two radii and an arc',
                  options: ['A sector is bounded by two radii and an arc', 'segment is larger', 'they are equal'],
                  hint: 'Review Class 6 Geometry: Points, Lines, Line Segments (c6_math_ch07_070) and Circle Basics.',
                  misconception: 'Students treat "chord" and "diameter" as interchangeable, or think any line inside the circle is a radius.' }
          ],
            remediations: { 'students-treat-chord-and-diameter': { steps: ['Return to the definition: "A radius is a segment from the centre to the circle." Have the student physically place.', 'For diameter: "Fold a circular paper so the edges match – the crease passes through the centre.', 'Practice: Give 5 diagrams; for each, ask "Is this a radius?', 'Why/why not?" forcing the student to check both endpoints.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_10', difficulty: 'standard',
          question: 'In a circle, the perpendicular drawn from the centre to any chord bisects that.',
          hint: 'Revise RHS congruence (c7_math_ch09_008) and Pythagoras theorem (c8_math_ch9_5) with.',
          misconception: 'Students often forget to join the centre to the endpoints of the chord to form two right triangles, and instead try.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a circle, the perpendicular drawn from the centre to any chord bisects that chord',
                  options: ['In a circle, the perpendicular drawn from the centre to any chord bisects that chord', 'A circle is the set of all points in a plane that are at a fixed distance (called the', 'A circle possesses **reflection symmetry** about any line passing through its centre', 'A chord of a circle is a line segment whose endpoints both lie on the circumference of'],
                  hint: 'Revise RHS congruence (c7_math_ch09_008) and Pythagoras theorem (c8_math_ch9_5) with right triangle.',
                  misconception: 'Students often forget to join the centre to the endpoints of the chord to form two right triangles, and instead try to apply the property.' }
          ],
            remediations: { 'students-often-forget-to-join': { steps: ['Ask the student to draw the circle, chord, and perpendicular from centre.', 'Insist they join the centre to the chord\'s endpoints, forming two triangles.', 'Have them label the right angles, the equal radii, and the common side.', 'Guide them to state the RHS congruence criterion and conclude the two halves of the chord are equal.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often forget to join the centre to the endpoints of the chord to form two right triangles, and instead try.',
          parts: [
                { id: 'a', prompt: 'A student draws a circle, a chord AB, and a line from centre O to the midpoint M of AB.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'the student is correct'],
                  hint: 'Revise RHS congruence (c7_math_ch09_008) and Pythagoras theorem (c8_math_ch9_5) with right triangle.',
                  misconception: 'Students often forget to join the centre to the endpoints of the chord to form two right triangles, and instead try to apply the property.' }
          ],
            remediations: { 'students-often-forget-to-join': { steps: ['Ask the student to draw the circle, chord, and perpendicular from centre.', 'Insist they join the centre to the chord\'s endpoints, forming two triangles.', 'Have them label the right angles, the equal radii, and the common side.', 'Guide them to state the RHS congruence criterion and conclude the two halves of the chord are equal.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_2', difficulty: 'standard',
          question: 'A circle possesses **reflection symmetry** about any line passing through its.',
          hint: 'Revisit the definition of a circle as a locus of points equidistant from the centre.',
          misconception: 'Students often think that a circle has only a finite number of symmetry lines (like 4 or 8) because they are used.',
          parts: [
                { id: 'a', prompt: 'How many lines of symmetry does a circle have? Describe their geometric location relative to the centre.', answer: 'A circle has infinitely many lines of symmetry',
                  options: ['A circle has infinitely many lines of symmetry', '4 lines', '8 lines', 'order of rotational symmetry'],
                  hint: 'Revisit the definition of a circle as a locus of points equidistant from the centre (c9_math_ch5_1).',
                  misconception: 'Students often think that a circle has only a finite number of symmetry lines (like 4 or 8) because they are used to drawing coordinate.' }
          ],
            remediations: { 'a-circle-has-only-a': { steps: ['Have the student physically fold a circular paper cut-out in many different ways, each time ensuring the edges match.', 'Ask: "Did the fold line pass through the centre?', 'Can you find a fold line that doesn\'t pass through the centre but still matches?" 2.', 'Use a geometry software (or a pin through the centre of a paper circle) to rotate by arbitrary angles (e.g., 17°, 113°).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_3', difficulty: 'standard',
          question: 'A chord of a circle is a line segment whose endpoints both lie on the.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem: Statement and Meaning).',
          misconception: 'Students often confuse the perpendicular distance from the centre to the chord with the distance along the chord.',
          parts: [
                { id: 'a', prompt: 'Define a chord of a circle. How is a diameter different from a chord? Is every diameter a chord? Is every chord a diameter?', answer: 'A chord is a line segment with both endpoints on the circle',
                  options: ['A chord is a line segment with both endpoints on the circle', 'a chord must pass through the centre, or that a diameter is not a chord', 'any line from the centre to the chord is perpendicular'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem: Statement and Meaning) and practice.',
                  misconception: 'Students often confuse the perpendicular distance from the centre to the chord with the distance along the chord itself, or they think any.' },
                { id: 'b', prompt: 'In a circle of radius 10 cm, a chord is at a distance of 6 cm from the centre. A student calculates the chord length as √(10² − 6²) = 8 cm. Is this correct?', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'any line from the centre to the chord is perpendicular'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem: Statement and Meaning) and practice.',
                  misconception: 'Students often confuse the perpendicular distance from the centre to the chord with the distance along the chord itself, or they think any.' },
                { id: 'c', prompt: 'A circular garden has a radius of 13 m. A straight path (chord) is 10 m from the centre. Find the length of the path. Show all steps.', answer: 'Given: r = 13 m, d = 10 m',
                  options: ['Given: r = 13 m, d = 10 m', 'any line from the centre to the chord is perpendicular'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Baudhayana-Pythagoras Theorem: Statement and Meaning) and practice.',
                  misconception: 'Students often confuse the perpendicular distance from the centre to the chord with the distance along the chord itself, or they think any.' }
          ],
            remediations: { 'students-often-confuse-the-perpendicular': { steps: ['If a student forgets to double the half-chord, have them physically draw the circle, chord, and perpendicular.', 'Ask: "How many right triangles do you see?', 'What does each triangle\'s base represent?" Guide them to label half-chord as \'x\', write x² = r² − d², then say "The.', 'The radius or the distance?'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_4', difficulty: 'standard',
          question: 'The perpendicular bisector of any chord of a circle always passes through the.',
          hint: 'Revisit c7_math_ch14_002 (perpendicular bisector construction) and c7_math_ch09_005/006.',
          misconception: 'Students confuse the theorem with its converse: "Perpendicular from centre bisects chord" (c9_math_ch5_10).',
          parts: [
                { id: 'a', prompt: 'In the diagram, O is the centre of the circle, AB is a chord, and OM ⟂ AB at M.', answer: 'This is the **converse theorem** (c9_math_ch5_10), not the same theorem',
                  options: ['This is the **converse theorem** (c9_math_ch5_10), not the same theorem', 'Perpendicular from centre bisects chord'],
                  hint: 'Revisit c7_math_ch14_002 (perpendicular bisector construction) and c7_math_ch09_005/006 (triangle.',
                  misconception: 'Students confuse the theorem with its converse: "Perpendicular from centre bisects chord" (c9_math_ch5_10).' },
                { id: 'b', prompt: 'A chord of length 16 cm is drawn in a circle of radius 10 cm. Find the distance of the chord from the centre.', answer: '**Distance calculation:** Let chord AB = 16 cm, radius OA = OB = 10 cm',
                  options: ['**Distance calculation:** Let chord AB = 16 cm, radius OA = OB = 10 cm', 'Perpendicular from centre bisects chord'],
                  hint: 'Revisit c7_math_ch14_002 (perpendicular bisector construction) and c7_math_ch09_005/006 (triangle.',
                  misconception: 'Students confuse the theorem with its converse: "Perpendicular from centre bisects chord" (c9_math_ch5_10).' },
                { id: 'c', prompt: 'Two chords AB and CD of a circle intersect at point P inside the circle. The perpendicular bisectors of AB and CD meet at O.', answer: '**Proof:** By theorem, perpendicular bisector of AB passes through centre',
                  options: ['**Proof:** By theorem, perpendicular bisector of AB passes through centre', 'impossible', 'Perpendicular from centre bisects chord'],
                  hint: 'Revisit c7_math_ch14_002 (perpendicular bisector construction) and c7_math_ch09_005/006 (triangle.',
                  misconception: 'Students confuse the theorem with its converse: "Perpendicular from centre bisects chord" (c9_math_ch5_10).' }
          ],
            remediations: { 'students-confuse-the-theorem-with': { steps: ['If a student makes this error: (1) Ask them to read the theorem statement slowly: "perpendicular bisector ...', 'passes through centre" — what is given?', '(2) Have them physically construct a perpendicular bisector of a segment on paper using compass — they see the bisector.', '(3) Then draw a circle around that segment as a chord — the centre must be somewhere on their bisector line.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch5_5', difficulty: 'standard',
          question: 'In a given circle (or congruent circles), equal chords are equidistant from the.',
          hint: 'If stuck, revisit c9_math_ch5_10 (Perpendicular from Centre to a Chord Bisects the Chord).',
          misconception: 'Students often think the distance from the centre to a chord is measured along the radius to an endpoint of the chord.',
          parts: [
                { id: 'a', prompt: 'In a circle with centre O, chord AB = 10 cm and its distance from O is 6 cm. Another chord CD is also at a distance 6 cm from O.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'not necessarily'],
                  hint: 'If stuck, revisit c9_math_ch5_10 (Perpendicular from Centre to a Chord Bisects the Chord) and.',
                  misconception: 'Students often think the distance from the centre to a chord is measured along the radius to an endpoint of the chord, not the.' },
                { id: 'b', prompt: 'Two chords of lengths 16 cm and 12 cm are drawn in a circle of radius 10 cm. Which chord is closer to the centre? By how much?', answer: 'For 16 cm chord: half = 8 cm, distance = √(10² - 8²) = √36 = 6 cm',
                  options: ['For 16 cm chord: half = 8 cm, distance = √(10² - 8²) = √36 = 6 cm', 'the longer chord is farther'],
                  hint: 'If stuck, revisit c9_math_ch5_10 (Perpendicular from Centre to a Chord Bisects the Chord) and.',
                  misconception: 'Students often think the distance from the centre to a chord is measured along the radius to an endpoint of the chord, not the.' }
          ],
            remediations: { 'the-distance-from-the-centre': { steps: ['If a student uses the radius as the distance, ask: "How do we measure the distance from a point to a line?', 'Is it along a slanted line or the perpendicular?" Draw a chord and centre, drop a perpendicular, and label the right.', 'Emphasize: "The distance from the centre to the chord is the perpendicular distance.', 'The radius goes to the endpoint, not the chord itself.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
