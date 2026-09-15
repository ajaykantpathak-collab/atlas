import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch10_p2: SimDef = {
    id: 'v3_c10_math_ch10_p2',
    title: 'Circles · Part 2/2',
    subtitle: 'Find the right angle hiding in every wheel on every road',
    classLevel: 10, subject: 'mathematics', topic: 'Circles · Part 2/2',
    chapters: ['c10_math_ch10'],
    nodeIds: ['c10_math_cbse_10_007', 'c10_math_cbse_10_008', 'c10_math_cbse_10_009', 'c10_math_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geometer studying single-point contact', intro: 'Draw a line that kisses a circle at exactly one point. Looks simple — until you prove the radius there must be perpendicular, and suddenly tangent lengths from outside points become equal weapons.', goal: 'Master tangent properties — uniqueness, perpendicularity to radius, and equal lengths from an external point — and apply them in proofs and constructions.' },
    discovery: {
        question: 'A bicycle wheel rolls along the road. The road touches the wheel at exactly one point — never two, never a segment. A geometry student calls the road a \'tangent.\' What\'s the deeper rule hiding in that single touch?',
        options: ['The radius to the touch point is always perpendicular to the tangent — the wheel\'s spoke stands exactly upright on the road', 'The road is secretly part of the circle\'s circumference', 'Any line touching a circle once is parallel to its diameter', 'Tangents only exist for perfectly round wheels'],
        answer: 'The radius to the touch point is always perpendicular to the tangent — the wheel\'s spoke stands exactly upright on the road',
        hook: 'One point of contact, one hidden right angle. Every tangent-radius perpendicularity you prove is just the bicycle wheel\'s secret made formal.',
    },
    teaching: [
        { title: 'Proving Tangent Properties Using Congruence', text: 'The tangent from an external point to a circle is proved to have specific properties using triangle congruence (SAS or RHS criterion).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_10_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Prove the tangent-radius perpendicularity, construct tangents from outside points, and use equal-tangent lengths to unlock circle problems that look impossible.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_007', title: 'Proving Tangent Properties Using Congruence',
          scaffold: { problem: 'Prove that the lengths of the two tangents drawn from an external point to a circle are equal. (Standard 4-mark CBSE board question.)',
            steps: [
            { text: 'Given: Circle with centre O, external point P, tangents PA and PB touching the circle at A and B respectively.' },
            { text: 'Join OA, OB, and OP. Since PA and PB are tangents, ∠OAP = ∠OBP = 90° (tangent ⊥ radius).' },
            { text: 'In ΔOAP and ΔOBP: (i) ∠OAP = ∠OBP = 90° (right angle), (ii) OA = OB (radii of same circle), (iii) OP = OP (common.' },
            { text: 'By RHS congruence criterion, ΔOAP ≅ ΔOBP.' },
            { text: 'By CPCT (Corresponding Parts of Congruent Triangles), PA = PB.' },
            { text: 'Hence, the lengths of the two tangents from an external point to a circle are equal.', faded: true, blankAnswer: 'PA = PB (proved by RHS congruence and CPCT).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_008', title: 'Applications of Tangent Properties in Problems',
          scaffold: { problem: 'A circular park of radius 7 m has a straight walking path that just touches the park boundary at point T.',
            steps: [
            { text: 'Draw the diagram. Mark circle with centre O, radius OT = 7 m. Mark external point P such that OP = 25 m.' },
            { text: 'Identify the right triangle. Since tangent ⟂ radius, ∠OTP = 90°. Triangle OTP is right-angled at T.' },
            { text: 'Apply Pythagoras theorem. In right triangle OTP, OP² = OT² + PT². Substitute known values: 25² = 7² + PT².' },
            { text: 'Compute step by step. 625 = 49 + PT² → PT² = 625 - 49 = 576 → PT = √576 = 24 m.' },
            { text: 'Interpret the result. The distance from the lamp post to the point of contact is 24 m.', faded: true, blankAnswer: '24 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_009', title: 'Circumscribed Triangle and Quadrilateral: Tangent Properties',
          scaffold: { problem: 'A triangular park ABC has a circular fountain inscribed in it touching sides BC, CA, AB at D, E, F respectively.',
            steps: [
            { text: 'Draw triangle ABC with inscribed circle. Mark touch points D on BC, E on CA, F on AB.' },
            { text: 'Apply the equal-tangent property: Tangents from the same external point are equal.' },
            { text: 'Express each side as sum of two tangent segments: AB = AF + BF = 5 + 7 = 12 m. BC = BD + CD = 7 + 6 = 13 m.' },
            { text: 'Compute perimeter: AB + BC + CA = 12 + 13 + 11 = 36 m. Alternatively, use formula Perimeter = 2(AF + BD + CE) = 2(5 + 7.' },
            { text: 'Verify triangle inequality: 12 + 13 > 11, 13 + 11 > 12, 11 + 12 > 13 — all satisfied. Answer is consistent.', faded: true, blankAnswer: 'AB = 12 m, BC = 13 m, CA = 11 m, Perimeter = 36 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_010', title: 'Word Problems: Tangent Length and Angle Properties',
          scaffold: { problem: 'A circular fountain of radius 7 m is in a park. From a point P on a straight path outside the fountain, two straight walking paths are laid.',
            steps: [
            { text: 'Draw a circle with centre O, radius OA = OB = 7 m. Mark external point P such that OP = 25 m.' },
            { text: 'Identify right triangles: OA ⟂ PA and OB ⟂ PB (tangent ⟂ radius).' },
            { text: 'Use Pythagoras theorem in ΔOAP: OP² = OA² + AP². Substitute OP = 25, OA = 7 → 25² = 7² + AP² → 625 = 49 + AP² → AP².' },
            { text: 'Since tangents from P are equal, PB = PA = 24 m. Each walking path is 24 m long.' },
            { text: 'Find angle between tangents ∠APB. In ΔOAP, sin(∠APO) = OA/OP = 7/25. ∠APO = sin⁻¹(7/25) ≈ 16.26°.', faded: true, blankAnswer: 'Each walking path is 24 m long; the angle between them.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_10_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A circular garden has a straight walking path that just grazes its edge at one point. For a geometry display, a student claims: \'Through that touching point you could draw infinitely many tangent lines, since infinitely many lines pass through any point.\'',
            decisions: [{ prompt: 'How many tangent lines can actually touch the circle at that point?', options: [
                { text: 'Exactly one — a tangent must touch the circle without cutting into it, and at a given point only the line perpendicular to the radius at that point does so. Every other line through the point either misses the garden or slices through it as a secant, so \'many lines through a point\' does not mean many tangents.', outcome: 'The radius-to-tangent perpendicularity is the key theorem: it both defines the unique tangent and explains why rotating the line even slightly makes it cut the circle.' },
                { text: 'The student is right — since infinitely many lines pass through any point, infinitely many tangents are possible there.', outcome: 'Infinitely many lines pass through the point but only one touches without crossing — every tilted line becomes a secant entering the circle.', reveals: 'infinite-tangents' },
                { text: 'Zero — a straight line can never touch a curve at only one point.', outcome: 'A tangent does exactly that — it grazes the circle at one point while lying perpendicular to the radius drawn there.', reveals: 'line-never-touches-circle' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'A circle guards its secrets with one rule: touch it at a point and the radius stands at attention, perpendicular. Everything else — equal tangents, constructions — flows from that.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_10_007', difficulty: 'standard',
          question: 'The tangent from an external point to a circle is proved to have specific.',
          hint: 'Review triangle congruence criteria (c7_math_ch07_001) and the tangent-radius.',
          misconception: 'Students often state PA = PB without proving the congruence. In CBSE board exams, the full proof is required: identify.',
          parts: [
                { id: 'a', prompt: 'Why can we not use SAS congruence directly without first establishing the right angle?', answer: 'SAS requires two sides and the included angle',
                  options: ['SAS requires two sides and the included angle', 'SAS doesn\'t apply to right triangles'],
                  hint: 'Review triangle congruence criteria (c7_math_ch07_001) and the tangent-radius perpendicularity.',
                  misconception: 'Students often state PA = PB without proving the congruence. In CBSE board exams, the full proof is required: identify triangles, state the.' }
          ],
            remediations: { 'students-often-state-pa-pb': { steps: ['Draw a large diagram with centre O, external point P, tangents PA and PB, and mark all right angles and equal sides.', 'Practice identifying the congruence criterion in 5 different tangent configurations.', 'Emphasise the proof structure: (a) identify triangles, (b) state criterion, (c) list equal parts, (d) conclude by CPCT.', 'Solve numerical problems using the Pythagorean theorem in the right triangle (radius, tangent, line to centre).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_008', difficulty: 'standard',
          question: 'Applications of tangent properties involve using the geometric relationships.',
          hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent ⟂ radius) and c10_math_cbse_10_007 (RHS.',
          misconception: 'Students often assume that the line joining the external point to the centre bisects the angle between the tangents.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of tangent properties involve using the geometric relationships of tangents',
                  options: ['Applications of tangent properties involve using the geometric relationships of tangents', 'A tangent to a circle is a straight line that intersects the circle at exactly one point,', 'A **secant** is a line that intersects a circle at exactly two distinct points, while a', 'The tangent to a circle at any point P is perpendicular to the radius OP drawn to the'],
                  hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent ⟂ radius) and c10_math_cbse_10_007 (RHS congruence.',
                  misconception: 'Students often assume that the line joining the external point to the centre bisects the angle between the tangents without proving it, and.' }
          ],
            remediations: { 'the-line-joining-the-external': { steps: ['If a student uses the angle bisector property before proving congruence, stop them and ask: "Which property did you use.', 'Have them write the congruence statement first, then derive PA = PB and angle bisection as CPCT.', 'Practice 3 problems where they must explicitly state the congruence criterion (RHS) before concluding any equality.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_009', difficulty: 'standard',
          question: 'A triangle or quadrilateral is said to **circumscribe** a circle (or the circle.',
          hint: 'Revisit c10_math_cbse_10_006 (Lengths of Tangents Drawn from an External Point are Equal).',
          misconception: 'Students often confuse which sides are opposite in a quadrilateral when applying the condition AB + CD = AD + BC.',
          parts: [
                { id: 'a', prompt: 'Two triangles ABC and DEF both circumscribe the same circle. Triangle ABC has tangent segments from A, B, C of lengths 4 cm, 5 cm, 6 cm respectively.', answer: 'Perimeter of ABC = 2(4+5+6) = 30 cm',
                  options: ['Perimeter of ABC = 2(4+5+6) = 30 cm', 'same perimeter because two tangent lengths match'],
                  hint: 'Revisit c10_math_cbse_10_006 (Lengths of Tangents Drawn from an External Point are Equal) and.',
                  misconception: 'Students often confuse which sides are opposite in a quadrilateral when applying the condition AB + CD = AD + BC.' }
          ],
            remediations: { 'students-often-confuse-which-sides': { steps: ['If a student pairs adjacent sides in a quadrilateral, draw the quadrilateral with labelled touch points P, Q, R, S.', 'Write the tangent equalities: AP = AS, BP = BQ, CQ = CR, DR = DS.', 'Then express each side as sum of two tangents: AB = AP + PB, BC = BQ + QC, CD = CR + RD, DA = DS + SA.', 'Add AB + CD and BC + DA separately, substitute equal tangents, and show they are identical.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_010', difficulty: 'standard',
          question: 'This node covers the application of tangent properties — specifically the.',
          hint: 'If stuck, revisit the proof that the radius is perpendicular to the tangent.',
          misconception: 'Students often assume the line from the external point to the centre (OP) is equal to the tangent length, or they add.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node covers the application of tangent properties',
                  options: ['This node covers the application of tangent properties', 'A tangent to a circle is a straight line that intersects the circle at exactly one point,', 'A **secant** is a line that intersects a circle at exactly two distinct points, while a', 'The tangent to a circle at any point P is perpendicular to the radius OP drawn to the'],
                  hint: 'If stuck, revisit the proof that the radius is perpendicular to the tangent (c10_math_cbse_10_003).',
                  misconception: 'Students often assume the line from the external point to the centre (OP) is equal to the tangent length, or they add the radius and.' }
          ],
            remediations: { 'the-line-from-the-external': { steps: ['Have the student draw the circle, external point, tangents, and radii to points of contact.', 'Ask them to mark the right angles (radius ⟂ tangent) with a square symbol.', 'Guide them to see the two right triangles (OAP and OBP).', 'Write Pythagoras theorem for one triangle: OP² = OA² + AP².'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
