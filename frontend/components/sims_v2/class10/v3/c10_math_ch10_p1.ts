import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch10_p1: SimDef = {
    id: 'v3_c10_math_ch10_p1',
    title: 'Circles · Part 1/2',
    subtitle: 'Find the right angle hiding in every wheel on every road',
    classLevel: 10, subject: 'mathematics', topic: 'Circles · Part 1/2',
    chapters: ['c10_math_ch10'],
    nodeIds: ['c10_math_cbse_10_001', 'c10_math_cbse_10_002', 'c10_math_cbse_10_003', 'c10_math_cbse_10_004', 'c10_math_cbse_10_005', 'c10_math_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geometer studying single-point contact', intro: 'Draw a line that kisses a circle at exactly one point. Looks simple — until you prove the radius there must be perpendicular, and suddenly tangent lengths from outside points become equal weapons.', goal: 'Master tangent properties — uniqueness, perpendicularity to radius, and equal lengths from an external point — and apply them in proofs and constructions.' },
    discovery: {
        question: 'A bicycle wheel rolls along the road. The road touches the wheel at exactly one point — never two, never a segment. A geometry student calls the road a \'tangent.\' What\'s the deeper rule hiding in that single touch?',
        options: ['The radius to the touch point is always perpendicular to the tangent — the wheel\'s spoke stands exactly upright on the road', 'The road is secretly part of the circle\'s circumference', 'Any line touching a circle once is parallel to its diameter', 'Tangents only exist for perfectly round wheels'],
        answer: 'The radius to the touch point is always perpendicular to the tangent — the wheel\'s spoke stands exactly upright on the road',
        hook: 'One point of contact, one hidden right angle. Every tangent-radius perpendicularity you prove is just the bicycle wheel\'s secret made formal.',
    },
    teaching: [
        { title: 'Tangent to a Circle: Definition and Existence', text: 'A tangent to a circle is a straight line that intersects the circle at exactly one point, called the **point of contact**.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_10_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Prove the tangent-radius perpendicularity, construct tangents from outside points, and use equal-tangent lengths to unlock circle problems that look impossible.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'case', nodeId: 'c10_math_cbse_10_001', title: 'Tangent to a Circle: Definition and Existence',
          caseStudy: { intro: 'Imagine a bicycle wheel (a perfect circle) resting on a flat road. The road touches the wheel at exactly one point — the bottom of the tyre.',
            decisions: [{ prompt: '**REMEMBER:** Define a tangent to a circle in your own words, and state the theorem about the number of tangents that can be drawn at.', options: [
                { text: '**Correct answer:** A tangent to a circle is a line that intersects the circle at exactly', outcome: '**Correct answer:** A tangent to a circle is a line that intersects the circle at exactly one.' },
                { text: 'At any point on a circle, there exists exactly one tangent', outcome: 'Not quite — **Specific error:** Students draw a line through a point P on the circle that **crosses** the.', reveals: 'specific-error-students-draw-a' },
                { text: 'a line that touches the circle', outcome: 'Not quite — **Specific error:** Students draw a line through a point P on the circle that **crosses** the.', reveals: 'specific-error-students-draw-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_002', title: 'Secant vs Tangent: Distinction and Relationship',
          scaffold: { problem: 'A circular garden of radius 7 m has a straight path passing through it. The path enters the garden at point A and exits at point B.',
            steps: [
            { text: 'Identify the given: Circle radius = 7 m. Path intersects circle at two distinct points A and B.' },
            { text: 'Recall definition: A line intersecting a circle at two distinct points is a secant. The segment AB is a chord.' },
            { text: 'Classify the path: Since it cuts the circle at two points, the path is a **secant**.' },
            { text: 'When the path is shifted parallel until it just touches the garden, the two intersection points A and B merge into.' },
            { text: 'The distance between intersection points is now zero (only one point P exists).', faded: true, blankAnswer: 'The original path is a secant. After shifting, it becomes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_003', title: 'Tangent at Any Point is Perpendicular to the Radius',
          scaffold: { problem: 'A circular garden of radius 7 m has a straight pathway touching its boundary at point P.',
            steps: [
            { text: 'Draw the figure. Let O be the centre of the circular garden. OP = 7 m (radius). PT = 24 m (pathway, tangent at P).' },
            { text: 'Apply the theorem: The tangent at any point of a circle is perpendicular to the radius through the point of contact.' },
            { text: 'Triangle OPT is a right-angled triangle with right angle at P. We need to find OT (distance from centre to gate).' },
            { text: 'Use Pythagoras theorem: OT² = OP² + PT² = 7² + 24² = 49 + 576 = 625.' },
            { text: 'OT = √625 = 25 m. The distance from the garden\'s centre to the gate is 25 m.', faded: true, blankAnswer: '25 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_004', title: 'Number of Tangents from a Point on the Circle',
          scaffold: { problem: 'A circular fountain of radius 4 m has a decorative light fixed at point P on its edge.',
            steps: [
            { text: 'Identify the given: circle with centre O, radius = 4 m, point P on the circle.' },
            { text: 'Recall the theorem: From a point on the circle, exactly one tangent can be drawn.' },
            { text: 'The tangent at P is perpendicular to the radius OP (by c10_math_cbse_10_003).' },
            { text: 'Therefore, only one straight beam (the tangent line) satisfies the condition.' },
            { text: 'The angle between the beam (tangent) and radius OP is 90°.', faded: true, blankAnswer: 'Exactly 1 beam is possible; it makes an angle of 90° with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_005', title: 'Number of Tangents from a Point Outside the Circle',
          scaffold: { problem: 'From a point P, 10 cm away from the centre O of a circle of radius 6 cm, two tangents PQ and PR are drawn to the circle.',
            steps: [
            { text: 'Identify given data and draw the figure. OP = 10 cm (distance from external point to centre), OQ = OR = 6 cm (radii).' },
            { text: 'Recognise right triangles. Triangles OQP and ORP are right-angled at Q and R respectively. Both share hypotenuse OP.' },
            { text: 'Apply Pythagoras theorem in ΔOQP to find tangent length PQ. PQ² = OP² − OQ² = 10² − 6² = 100 − 36 = 64. PQ = √64 = 8 cm.' },
            { text: 'By symmetry (or congruence of ΔOQP and ΔORP by RHS), PR = PQ = 8 cm.' },
            { text: 'Find area of quadrilateral PQOR. It consists of two congruent right triangles ΔOQP and ΔORP.', faded: true, blankAnswer: 'Tangent length = 8 cm each; Area of quadrilateral PQOR = 48.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_006', title: 'Lengths of Tangents Drawn from an External Point are Equal',
          scaffold: { problem: 'From a point P, 13 cm away from the centre O of a circle of radius 5 cm, two tangents PA and PB are drawn to the circle.',
            steps: [
            { text: 'Identify given data — radius OA = OB = 5 cm, distance OP = 13 cm. Tangents PA and PB touch the circle at A and B.' },
            { text: 'Use the tangent-radius perpendicular theorem (c10_math_cbse_10_003): ∠OAP = ∠OBP = 90°.' },
            { text: 'Apply Pythagoras theorem in right triangle OAP: OP² = OA² + AP² → 13² = 5² + AP² → 169 = 25 + AP² → AP² = 144 → AP = 12.' },
            { text: 'By the equal tangents theorem, PB = PA = 12 cm.' },
            { text: 'Perimeter of quadrilateral OAPB = OA + AP + PB + BO = 5 + 12 + 12 + 5 = 34 cm.', faded: true, blankAnswer: 'Each tangent length = 12 cm; Perimeter of OAPB = 34 cm.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_10_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A circular garden has a straight walking path that just grazes its edge at one point. For a geometry display, a student claims: \'Through that touching point you could draw infinitely many tangent lines, since infinitely many lines pass through any point.\'',
            decisions: [{ prompt: 'How many tangent lines can actually touch the circle at that point?', options: [
                { text: 'Exactly one — a tangent must touch the circle without cutting into it, and at a given point only the line perpendicular to the radius at that point does so. Every other line through the point either misses the garden or slices through it as a secant, so \'many lines through a point\' does not mean many tangents.', outcome: 'The radius-to-tangent perpendicularity is the key theorem: it both defines the unique tangent and explains why rotating the line even slightly makes it cut the circle.' },
                { text: 'The student is right — since infinitely many lines pass through any point, infinitely many tangents are possible there.', outcome: 'Infinitely many lines pass through the point but only one touches without crossing — every tilted line becomes a secant entering the circle.', reveals: 'infinite-tangents' },
                { text: 'Zero — a straight line can never touch a curve at only one point.', outcome: 'A tangent does exactly that — it grazes the circle at one point while lying perpendicular to the radius drawn there.', reveals: 'line-never-touches-circle' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'A circle guards its secrets with one rule: touch it at a point and the radius stands at attention, perpendicular. Everything else — equal tangents, constructions — flows from that.',
            decisions: [{ prompt: 'What comes next? Circles · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Circles · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_10_001', difficulty: 'standard',
          question: 'A tangent to a circle is a straight line that intersects the circle at exactly.',
          hint: 'If stuck, revisit c9_math_ch5_1 (Circle: Basic Definitions and Terminology) and.',
          misconception: '**Specific error:** Students draw a line through a point P on the circle that **crosses** the circle (enters the.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A student draws a line through point P on a circle and claims it is a tangent because "it touches the circle at P." The line also passes.', answer: '**Correct answer:** No, the student is incorrect',
                  options: ['**Correct answer:** No, the student is incorrect', 'touching', 'yes, it touches at P so it\'s a tangent', 'it touches at P'],
                  hint: 'If stuck, revisit c9_math_ch5_1 (Circle: Basic Definitions and Terminology) and c9_math_ch5_3.',
                  misconception: '**Specific error:** Students draw a line through a point P on the circle that **crosses** the circle (enters the interior) and label it.' },
                { id: 'b', prompt: '**APPLY:** In the figure below, O is the centre of a circle of radius 5 cm.', answer: '**Correct answer with steps:** Step 1: Given radius OA = 5 cm',
                  options: ['**Correct answer with steps:** Step 1: Given radius OA = 5 cm', 'it touches at P', 'passes through a point on the circle', 'intersects the circle at exactly one point'],
                  hint: 'If stuck, revisit c9_math_ch5_1 (Circle: Basic Definitions and Terminology) and c9_math_ch5_3.',
                  misconception: '**Specific error:** Students draw a line through a point P on the circle that **crosses** the circle (enters the interior) and label it.' }
          ],
            remediations: { 'specific-error-students-draw-a': { steps: ['**Physical demo:** Give the student a circular bangle and a straight ruler.', 'Ask them to place the ruler against the bangle so it touches at exactly one point.', 'Have them try to rotate the ruler while keeping that contact point fixed — they will feel it\'s impossible without.', '**Diagram drill:** Draw a circle with centre O, point P on it.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_002', difficulty: 'standard',
          question: 'A **secant** is a line that intersects a circle at exactly two distinct points.',
          hint: 'If stuck, revisit Class 9 "Circle: Basic Definitions and Terminology" (c9_math_ch5_1) and.',
          misconception: 'Students often think a **chord** and a **secant** are the same thing.',
          parts: [
                { id: 'a', prompt: 'Draw a circle of radius 3 cm. Draw a line that cuts the circle at two points 4 cm apart. What is this line called?', answer: 'The line is initially a **secant**',
                  options: ['The line is initially a **secant**', 'point of contact', 'midpoint of chord', 'a **chord** and a **secant** are the same thing'],
                  hint: 'If stuck, revisit Class 9 "Circle: Basic Definitions and Terminology" (c9_math_ch5_1) and practice.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' },
                { id: 'b', prompt: 'A student says: "A tangent is just a secant that has been moved until it touches the circle at one point instead of two." Is this statement correct?', answer: 'The statement is **correct**',
                  options: ['The statement is **correct**', 'No, they are completely different lines', 'point of contact', 'midpoint of chord'],
                  hint: 'If stuck, revisit Class 9 "Circle: Basic Definitions and Terminology" (c9_math_ch5_1) and practice.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' },
                { id: 'c', prompt: 'From a point P located 5 cm from the centre of a circle of radius 3 cm, how many tangents and how many secants can be drawn to the circle? Justify your answer.', answer: '**Tangents:** 2 (point is outside the circle, distance 5 > radius 3)',
                  options: ['**Tangents:** 2 (point is outside the circle, distance 5 > radius 3)', '1 tangent', '0 secants', 'point of contact'],
                  hint: 'If stuck, revisit Class 9 "Circle: Basic Definitions and Terminology" (c9_math_ch5_1) and practice.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' }
          ],
            remediations: { 'a-chord-and-a-secant': { steps: ['Draw a circle and a line cutting it at A and B.', 'Label the whole line (with arrows) as **secant**.', 'Label segment AB as **chord**.', 'Erase the line outside the circle, leaving only segment AB.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a **chord** and a **secant** are the same thing.',
          parts: [
                { id: 'a', prompt: 'A classmate argues: "Since a tangent touches the circle at one point and a secant cuts at two points, a line that intersects the circle at exactly one point.', answer: 'The claim is **true** for straight lines in Euclidean plane geometry',
                  options: ['The claim is **true** for straight lines in Euclidean plane geometry', '.) **Wrong answer reveals:** If the student says', 'point of contact', 'midpoint of chord'],
                  hint: 'If stuck, revisit Class 9 "Circle: Basic Definitions and Terminology" (c9_math_ch5_1) and practice.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' }
          ],
            remediations: { 'a-chord-and-a-secant': { steps: ['Draw a circle and a line cutting it at A and B.', 'Label the whole line (with arrows) as **secant**.', 'Label segment AB as **chord**.', 'Erase the line outside the circle, leaving only segment AB.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_003', difficulty: 'standard',
          question: 'The tangent to a circle at any point P is perpendicular to the radius OP drawn.',
          hint: 'If stuck, revisit c9_math_ch5_4 (perpendicular from centre to chord) and c7_math_ch09_008.',
          misconception: 'Students believe the tangent is perpendicular to the diameter through the point of contact, not the radius.',
          parts: [
                { id: 'a', prompt: 'State the theorem: "The tangent at any point of a circle is perpendicular to the ______ through the point of contact." Fill in the blank and draw a labelled.', answer: 'Correct answer: "radius"',
                  options: ['Correct answer: "radius"', 'diameter'],
                  hint: 'If stuck, revisit c9_math_ch5_4 (perpendicular from centre to chord) and c7_math_ch09_008 (RHS.',
                  misconception: 'Students believe the tangent is perpendicular to the diameter through the point of contact, not the radius.' }
          ],
            remediations: { 'the-tangent-is-perpendicular-to': { steps: ['If the student confuses radius/diameter or applies perpendicularity at the wrong point: 1.', 'Make them physically draw the circle, mark centre O, point of contact P, and the tangent line.', 'Ask: "Which segment connects O to P?', 'Is it a radius or diameter?" (Radius — it\'s half the diameter).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_004', difficulty: 'standard',
          question: 'A point lying on the circumference of a circle has exactly one tangent line.',
          hint: 'Revisit c10_math_cbse_10_003 (Tangent at Any Point is Perpendicular to the Radius) and.',
          misconception: 'Students often confuse "tangent at a point on the circle" with "tangents from a point outside the circle".',
          parts: [
                { id: 'a', prompt: 'How many tangents can be drawn to a circle from a point lying on the circle?', answer: 'Exactly one tangent can be drawn from a point on the circle',
                  options: ['Exactly one tangent can be drawn from a point on the circle', 'infinite', 'tangent at a point on the circle', 'tangents from a point outside the circle'],
                  hint: 'Revisit c10_math_cbse_10_003 (Tangent at Any Point is Perpendicular to the Radius) and practice.',
                  misconception: 'Students often confuse "tangent at a point on the circle" with "tangents from a point outside the circle".' },
                { id: 'b', prompt: 'In the figure, O is the centre of a circle of radius 5 cm. P is a point on the circle. A line l passes through P and makes an angle of 30° with OP.', answer: 'No, l is not a tangent',
                  options: ['No, l is not a tangent', 'tangent at a point on the circle', 'tangents from a point outside the circle'],
                  hint: 'Revisit c10_math_cbse_10_003 (Tangent at Any Point is Perpendicular to the Radius) and practice.',
                  misconception: 'Students often confuse "tangent at a point on the circle" with "tangents from a point outside the circle".' },
                { id: 'c', prompt: 'A student claims: "If I draw a circle and pick a point P on it, I can draw two tangents at P by drawing two lines that just touch the circle at P on opposite.', answer: 'The statement is false',
                  options: ['The statement is false', 'opposite sides', 'tangent at a point on the circle', 'tangents from a point outside the circle'],
                  hint: 'Revisit c10_math_cbse_10_003 (Tangent at Any Point is Perpendicular to the Radius) and practice.',
                  misconception: 'Students often confuse "tangent at a point on the circle" with "tangents from a point outside the circle".' }
          ],
            remediations: { 'students-often-confuse-tangent-at': { steps: ['If the student says "two tangents", ask: "Draw the radius OP.', 'Now draw a line through P making 60° with OP.', 'Does it touch the circle only at P?', 'Use a compass to check: take any point Q on that line other than P.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_005', difficulty: 'standard',
          question: 'From a point outside a circle, exactly two tangents can be drawn to the circle.',
          hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent-radius perpendicularity) and.',
          misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that.',
          parts: [
                { id: 'a', prompt: 'How many tangents can be drawn to a circle from a point lying outside the circle?', answer: 'Exactly two tangents can be drawn from a point outside the circle',
                  options: ['Exactly two tangents can be drawn from a point outside the circle', 'to the ends of the diameter'],
                  hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent-radius perpendicularity) and c8_math_ch9_5.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' },
                { id: 'b', prompt: 'From a point P, 13 cm away from the centre O of a circle of radius 5 cm, two tangents PA and PB are drawn. Find the length of each tangent segment.', answer: 'Given: OP = 13 cm, OA = OB = 5 cm (radii)',
                  options: ['Given: OP = 13 cm, OA = OB = 5 cm (radii)', 'to the ends of the diameter'],
                  hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent-radius perpendicularity) and c8_math_ch9_5.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' },
                { id: 'c', prompt: 'Two tangents are drawn from an external point P to a circle with centre O. The angle between the tangents is 60°.', answer: 'Let the tangents touch at A and B',
                  options: ['Let the tangents touch at A and B', 'to the ends of the diameter'],
                  hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent-radius perpendicularity) and c8_math_ch9_5.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' }
          ],
            remediations: { 'from-an-external-point': { steps: ['Have the student physically draw a circle on paper, mark an external point P, and use a ruler to try drawing lines from.', 'They will discover only two such lines exist.', 'Then guide them: "At the point where your ruler touches, draw the radius.', 'What angle do they make?" They measure 90°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_006', difficulty: 'standard',
          question: 'If two tangents are drawn from an external point P to a circle with centre.',
          hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent perpendicular to radius) and.',
          misconception: 'Students often confuse "equal tangents from an external point" with "equal tangents from a point on the circle" — they.',
          parts: [
                { id: 'a', prompt: 'From an external point P, two tangents PA and PB are drawn to a circle of radius 6 cm. If OP = 10 cm, find the length of each tangent. Show all steps.', answer: 'Given: OA = 6 cm (radius), OP = 10 cm, ∠OAP = 90°',
                  options: ['Given: OA = 6 cm (radius), OP = 10 cm, ∠OAP = 90°', 'equal tangents from an external point', 'equal tangents from a point on the circle', 'a point on the circle also has two equal tangents'],
                  hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent perpendicular to radius) and c7_math_ch09_008 (RHS.',
                  misconception: 'Students often confuse "equal tangents from an external point" with "equal tangents from a point on the circle" — they think a point on the.' },
                { id: 'b', prompt: 'Two tangents PA and PB are drawn from point P to a circle with centre O. If ∠APB = 70°, find ∠AOB. Explain the relationship between ∠APB and ∠AOB in general.', answer: 'In quadrilateral OAPB, ∠OAP = ∠OBP = 90° (tangent ⟂ radius)',
                  options: ['In quadrilateral OAPB, ∠OAP = ∠OBP = 90° (tangent ⟂ radius)', 'equal tangents from an external point', 'equal tangents from a point on the circle', 'a point on the circle also has two equal tangents'],
                  hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent perpendicular to radius) and c7_math_ch09_008 (RHS.',
                  misconception: 'Students often confuse "equal tangents from an external point" with "equal tangents from a point on the circle" — they think a point on the.' }
          ],
            remediations: { 'students-often-confuse-equal-tangents': { steps: ['If a student uses circular reasoning (SSS with PA = PB as given), stop them and ask: "Which angle do we know is 90°?', 'Which theorem gives us that?" Guide them to state: "Tangent is perpendicular to radius" → ∠OAP = ∠OBP = 90°.', 'Then ask: "Now we have right triangles.', 'What congruence criterion uses right angle, hypotenuse, and one side?" → RHS.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
