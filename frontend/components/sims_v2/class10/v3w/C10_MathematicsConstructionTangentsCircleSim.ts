import type { SimDef } from '../../engine/types';
import C10_MathematicsConstructionTangentsCircleSim from '../../../simulations/c6_12/C10_MathematicsConstructionTangentsCircleSim';

/** v3 wrapped master — C10_MathematicsConstructionTangentsCircleSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsconstructiontangentscirclesim: SimDef = {
    id: 'v3w_c10_mathematicsconstructiontangentscirclesim',
    title: 'Number of Tangents from a Point Outside the Circle',
    subtitle: 'Covers the existence and number of tangents from an external point (exactly two), the.',
    classLevel: 10, subject: 'mathematics', topic: 'Number of Tangents from a Point Outside the Circle',
    chapters: [],
    nodeIds: ['c10_math_cbse_10_005', 'c10_math_cbse_10_007', 'c10_math_cbse_10_009', 'c10_math_cbse_10_001', 'c10_math_cbse_10_002', 'c10_math_cbse_10_003', 'c10_math_cbse_10_004', 'c10_math_cbse_10_006', 'c10_math_cbse_10_008', 'c10_math_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are standing 10 metres away from a circular fountain of radius 3 metres in your school courtyard.', goal: 'Master Number of Tangents from a Point Outside the Circle.' },
    discovery: {
        question: 'A student claims: "From a point outside a circle, we can draw three tangents if the point is far enough away." Evaluate this claim and explain the error.',
        options: ['The claim is false', 'tangent', 'line through the point intersecting the circle'],
        answer: 'The claim is false',
        hook: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that.',
    },
    teaching: [
        { title: 'From a point outside a circle, exactly two.', text: 'From a point outside a circle, exactly two tangents can be drawn to the circle.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_005', title: 'From a point outside a circle, exactly.',
          scaffold: { problem: 'From a point P, 10 cm away from the centre O of a circle of radius 6 cm, two tangents PQ and PR are drawn to the circle.',
            steps: [
            { text: 'Identify given data and draw the figure. OP = 10 cm (distance from external point to centre), OQ = OR = 6 cm (radii).' },
            { text: 'Recognise right triangles. Triangles OQP and ORP are right-angled at Q and R respectively. Both share hypotenuse OP.' },
            { text: 'Apply Pythagoras theorem in ΔOQP to find tangent length PQ. PQ² = OP² − OQ² = 10² − 6² = 100 − 36 = 64. PQ = √64 = 8 cm.' },
            { text: 'By symmetry (or congruence of ΔOQP and ΔORP by RHS), PR = PQ = 8 cm.' },
            { text: 'Find area of quadrilateral PQOR. It consists of two congruent right triangles ΔOQP and ΔORP.', faded: true, blankAnswer: 'Tangent length = 8 cm each; Area of quadrilateral PQOR = 48.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_007', title: 'The tangent from an external point to a.',
          scaffold: { problem: 'Prove that the lengths of the two tangents drawn from an external point to a circle are equal. (Standard 4-mark CBSE board question.)',
            steps: [
            { text: 'Given: Circle with centre O, external point P, tangents PA and PB touching the circle at A and B respectively.' },
            { text: 'Join OA, OB, and OP. Since PA and PB are tangents, ∠OAP = ∠OBP = 90° (tangent ⊥ radius).' },
            { text: 'In ΔOAP and ΔOBP: (i) ∠OAP = ∠OBP = 90° (right angle), (ii) OA = OB (radii of same circle), (iii) OP = OP (common.' },
            { text: 'By RHS congruence criterion, ΔOAP ≅ ΔOBP.' },
            { text: 'By CPCT (Corresponding Parts of Congruent Triangles), PA = PB.' },
            { text: 'Hence, the lengths of the two tangents from an external point to a circle are equal.', faded: true, blankAnswer: 'PA = PB (proved by RHS congruence and CPCT).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_009', title: 'A triangle or quadrilateral is said to.',
          scaffold: { problem: 'A triangular park ABC has a circular fountain inscribed in it touching sides BC, CA, AB at D, E, F respectively.',
            steps: [
            { text: 'Draw triangle ABC with inscribed circle. Mark touch points D on BC, E on CA, F on AB.' },
            { text: 'Apply the equal-tangent property: Tangents from the same external point are equal.' },
            { text: 'Express each side as sum of two tangent segments: AB = AF + BF = 5 + 7 = 12 m. BC = BD + CD = 7 + 6 = 13 m.' },
            { text: 'Compute perimeter: AB + BC + CA = 12 + 13 + 11 = 36 m. Alternatively, use formula Perimeter = 2(AF + BD + CE) = 2(5 + 7.' },
            { text: 'Verify triangle inequality: 12 + 13 > 11, 13 + 11 > 12, 11 + 12 > 13 — all satisfied. Answer is consistent.', faded: true, blankAnswer: 'AB = 12 m, BC = 13 m, CA = 11 m, Perimeter = 36 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_001', title: 'A tangent to a circle is a straight.',
          scaffold: { problem: 'A circular park of radius 10 m has a straight walking path that touches the park boundary at exactly one point A.',
            steps: [
            { text: 'Identify the given information: Circle with centre O, radius OA = 10 m.' },
            { text: 'Recall the theorem: At any point on a circle, there exists exactly one tangent.' },
            { text: 'Recall the tangent-radius property (to be proved in next node, but used here as known fact): The tangent at any point.' },
            { text: 'The lamp at O must direct its beam along the path. Since the path is perpendicular to OA, the beam must make an angle.' },
            { text: 'Uniqueness: Because there is exactly one tangent at A (existence-uniqueness theorem), there is exactly one line through.' },
            { text: 'Final answer: The lamp beam should be directed at 90° to OA. This direction is unique because the tangent at A is.', faded: true, blankAnswer: '90° (perpendicular to OA); the direction is unique because.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_002', title: 'A **secant** is a line that intersects.',
          scaffold: { problem: 'A circular garden of radius 7 m has a straight path passing through it. The path enters the garden at point A and exits at point B.',
            steps: [
            { text: 'Identify the given: Circle radius = 7 m. Path intersects circle at two distinct points A and B.' },
            { text: 'Recall definition: A line intersecting a circle at two distinct points is a secant. The segment AB is a chord.' },
            { text: 'Classify the path: Since it cuts the circle at two points, the path is a **secant**.' },
            { text: 'When the path is shifted parallel until it just touches the garden, the two intersection points A and B merge into a.' },
            { text: 'The distance between intersection points is now zero (only one point P exists).', faded: true, blankAnswer: 'The original path is a secant. After shifting, it becomes a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_10_003', title: 'The tangent to a circle at any point P.',
          scaffold: { problem: 'A circular garden of radius 7 m has a straight pathway touching its boundary at point P.',
            steps: [
            { text: 'Draw the figure. Let O be the centre of the circular garden. OP = 7 m (radius). PT = 24 m (pathway, tangent at P).' },
            { text: 'Apply the theorem: The tangent at any point of a circle is perpendicular to the radius through the point of contact.' },
            { text: 'Triangle OPT is a right-angled triangle with right angle at P. We need to find OT (distance from centre to gate).' },
            { text: 'Use Pythagoras theorem: OT² = OP² + PT² = 7² + 24² = 49 + 576 = 625.' },
            { text: 'OT = √625 = 25 m. The distance from the garden\'s centre to the gate is 25 m.', faded: true, blankAnswer: '25 m' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_10_007', title: 'Identify each idea',
          dissect: { specimen: 'Number of Tangents from a Point Outside the Circle', spots: [
            { id: 's1', label: 'From a point outside a', prompt: 'Which idea is this? — From a point outside a circle, exactly two tangents can be drawn to the circle.', answer: 'From a point outside a', options: ['From a point outside a', 'The tangent from an external', 'A triangle or quadrilateral is', 'A tangent to a circle'] },
            { id: 's2', label: 'The tangent from an external', prompt: 'Which idea is this? — The tangent from an external point to a circle is proved to have specific properties.', answer: 'The tangent from an external', options: ['The tangent from an external', 'From a point outside a', 'A triangle or quadrilateral is', 'A tangent to a circle'] },
            { id: 's3', label: 'A triangle or quadrilateral is', prompt: 'Which idea is this? — A triangle or quadrilateral is said to **circumscribe** a circle (or the circle is.', answer: 'A triangle or quadrilateral is', options: ['A triangle or quadrilateral is', 'From a point outside a', 'The tangent from an external', 'A tangent to a circle'] },
            { id: 's4', label: 'A tangent to a circle', prompt: 'Which idea is this? — A tangent to a circle is a straight line that intersects the circle at exactly one point,.', answer: 'A tangent to a circle', options: ['A tangent to a circle', 'From a point outside a', 'The tangent from an external', 'A triangle or quadrilateral is'] },
            { id: 's5', label: 'A secant is a line', prompt: 'Which idea is this? — A **secant** is a line that intersects a circle at exactly two distinct points, while a.', answer: 'A secant is a line', options: ['A secant is a line', 'From a point outside a', 'The tangent from an external', 'A triangle or quadrilateral is'] },
            { id: 's6', label: 'The tangent to a circle', prompt: 'Which idea is this? — The tangent to a circle at any point P is perpendicular to the radius OP drawn to the.', answer: 'The tangent to a circle', options: ['The tangent to a circle', 'From a point outside a', 'The tangent from an external', 'A triangle or quadrilateral is'] }
          ] } }
    ],
    explore: { component: C10_MathematicsConstructionTangentsCircleSim, prompt: 'Explore the interactive — Number of Tangents from a Point Outside the Circle' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_10_005', difficulty: 'standard',
          question: 'From a point outside a circle, exactly two tangents can be drawn to the circle.',
          hint: 'If stuck, revisit c10_math_cbse_10_003 (tangent-radius perpendicularity) and.',
          misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that.',
          parts: [
                { id: 'a', prompt: 'How many tangents can be drawn to a circle from a point lying outside the circle?', answer: 'Exactly two tangents can be drawn from a point outside the circle',
                  options: ['Exactly two tangents can be drawn from a point outside the circle', 'to the ends of the diameter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' },
                { id: 'b', prompt: 'From a point P, 13 cm away from the centre O of a circle of radius 5 cm, two tangents PA and PB are drawn. Find the length of each tangent segment.', answer: 'Given: OP = 13 cm, OA = OB = 5 cm (radii)',
                  options: ['Given: OP = 13 cm, OA = OB = 5 cm (radii)', 'to the ends of the diameter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' },
                { id: 'c', prompt: 'Two tangents are drawn from an external point P to a circle with centre O. The angle between the tangents is 60°.', answer: 'Let the tangents touch at A and B',
                  options: ['Let the tangents touch at A and B', 'to the ends of the diameter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' }
          ],
            remediations: { 'from-an-external-point': { steps: ['Have the student physically draw a circle on paper, mark an external point P, and use a ruler to try drawing lines from.', 'They will discover only two such lines exist.', 'Then guide them: "At the point where your ruler touches, draw the radius.', 'What angle do they make?" They measure 90°.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that.',
          parts: [
                { id: 'a', prompt: 'A student claims: "From a point outside a circle, we can draw three tangents if the point is far enough away." Evaluate this claim and explain the error.', answer: 'The claim is false',
                  options: ['The claim is false', 'tangent', 'line through the point intersecting the circle', 'to the ends of the diameter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that from an external point, the two tangents are drawn "to the ends of the diameter" or that the points of contact.' }
          ],
            remediations: { 'from-an-external-point': { steps: ['Have the student physically draw a circle on paper, mark an external point P, and use a ruler to try drawing lines from.', 'They will discover only two such lines exist.', 'Then guide them: "At the point where your ruler touches, draw the radius.', 'What angle do they make?" They measure 90°.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_007', difficulty: 'standard',
          question: 'The tangent from an external point to a circle is proved to have specific.',
          hint: 'Review triangle congruence criteria (c7_math_ch07_001) and the tangent-radius.',
          misconception: 'Students often state PA = PB without proving the congruence. In CBSE board exams, the full proof is required: identify.',
          parts: [
                { id: 'a', prompt: 'Why can we not use SAS congruence directly without first establishing the right angle?', answer: 'SAS requires two sides and the included angle',
                  options: ['SAS requires two sides and the included angle', 'SAS doesn\'t apply to right triangles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often state PA = PB without proving the congruence. In CBSE board exams, the full proof is required: identify triangles, state the.' }
          ],
            remediations: { 'students-often-state-pa-pb': { steps: ['Draw a large diagram with centre O, external point P, tangents PA and PB, and mark all right angles and equal sides.', 'Practice identifying the congruence criterion in 5 different tangent configurations.', 'Emphasise the proof structure: (a) identify triangles, (b) state criterion, (c) list equal parts, (d) conclude by CPCT.', 'Solve numerical problems using the Pythagorean theorem in the right triangle (radius, tangent, line to centre).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_009', difficulty: 'standard',
          question: 'A triangle or quadrilateral is said to **circumscribe** a circle (or the circle.',
          hint: 'Revisit c10_math_cbse_10_006 (Lengths of Tangents Drawn from an External Point are Equal).',
          misconception: 'Students often confuse which sides are opposite in a quadrilateral when applying the condition AB + CD = AD + BC.',
          parts: [
                { id: 'a', prompt: 'Two triangles ABC and DEF both circumscribe the same circle. Triangle ABC has tangent segments from A, B, C of lengths 4 cm, 5 cm, 6 cm respectively.', answer: 'Perimeter of ABC = 2(4+5+6) = 30 cm',
                  options: ['Perimeter of ABC = 2(4+5+6) = 30 cm', 'same perimeter because two tangent lengths match'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which sides are opposite in a quadrilateral when applying the condition AB + CD = AD + BC.' }
          ],
            remediations: { 'students-often-confuse-which-sides': { steps: ['If a student pairs adjacent sides in a quadrilateral, draw the quadrilateral with labelled touch points P, Q, R, S on.', 'Write the tangent equalities: AP = AS, BP = BQ, CQ = CR, DR = DS.', 'Then express each side as sum of two tangents: AB = AP + PB, BC = BQ + QC, CD = CR + RD, DA = DS + SA.', 'Add AB + CD and BC + DA separately, substitute equal tangents, and show they are identical.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse which sides are opposite in a quadrilateral when applying the condition AB + CD = AD + BC.',
          parts: [
                { id: 'a', prompt: 'Two triangles ABC and DEF both circumscribe the same circle. Triangle ABC has tangent segments from A, B, C of lengths 4 cm, 5 cm, 6 cm respectively.', answer: 'Perimeter of ABC = 2(4+5+6) = 30 cm',
                  options: ['Perimeter of ABC = 2(4+5+6) = 30 cm', 'same perimeter because two tangent lengths match'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which sides are opposite in a quadrilateral when applying the condition AB + CD = AD + BC.' }
          ],
            remediations: { 'students-often-confuse-which-sides': { steps: ['If a student pairs adjacent sides in a quadrilateral, draw the quadrilateral with labelled touch points P, Q, R, S on.', 'Write the tangent equalities: AP = AS, BP = BQ, CQ = CR, DR = DS.', 'Then express each side as sum of two tangents: AB = AP + PB, BC = BQ + QC, CD = CR + RD, DA = DS + SA.', 'Add AB + CD and BC + DA separately, substitute equal tangents, and show they are identical.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_001', difficulty: 'standard',
          question: 'A tangent to a circle is a straight line that intersects the circle at exactly.',
          hint: 'If stuck, revisit c9_math_ch5_1 (Circle: Basic Definitions and Terminology) and.',
          misconception: '**Specific error:** Students draw a line through a point P on the circle that **crosses** the circle (enters the.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A student draws a line through point P on a circle and claims it is a tangent because "it touches the circle at P." The line also passes.', answer: '**Correct answer:** No, the student is incorrect',
                  options: ['**Correct answer:** No, the student is incorrect', 'touching', 'yes, it touches at P so it\'s a tangent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students draw a line through a point P on the circle that **crosses** the circle (enters the interior) and label it a.' },
                { id: 'b', prompt: '**APPLY:** In the figure below, O is the centre of a circle of radius 5 cm.', answer: '**Correct answer with steps:** Step 1: Given radius OA = 5 cm',
                  options: ['**Correct answer with steps:** Step 1: Given radius OA = 5 cm', 'it touches at P', 'passes through a point on the circle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific error:** Students draw a line through a point P on the circle that **crosses** the circle (enters the interior) and label it a.' }
          ],
            remediations: { 'specific-error-students-draw-a': { steps: ['**Physical demo:** Give the student a circular bangle and a straight ruler.', 'Ask them to place the ruler against the bangle so it touches at exactly one point.', 'Have them try to rotate the ruler while keeping that contact point fixed — they will feel it\'s impossible without.', '**Diagram drill:** Draw a circle with centre O, point P on it.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_002', difficulty: 'standard',
          question: 'A **secant** is a line that intersects a circle at exactly two distinct points,.',
          hint: 'If stuck, revisit Class 9 "Circle: Basic Definitions and Terminology" (c9_math_ch5_1) and.',
          misconception: 'Students often think a **chord** and a **secant** are the same thing.',
          parts: [
                { id: 'a', prompt: 'Draw a circle of radius 3 cm. Draw a line that cuts the circle at two points 4 cm apart. What is this line called?', answer: 'The line is initially a **secant**',
                  options: ['The line is initially a **secant**', 'point of contact', 'midpoint of chord'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' },
                { id: 'b', prompt: 'A student says: "A tangent is just a secant that has been moved until it touches the circle at one point instead of two." Is this statement correct?', answer: 'The statement is **correct**',
                  options: ['The statement is **correct**', 'No, they are completely different lines', 'point of contact'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' },
                { id: 'c', prompt: 'From a point P located 5 cm from the centre of a circle of radius 3 cm, how many tangents and how many secants can be drawn to the circle? Justify your answer.', answer: '**Tangents:** 2 (point is outside the circle, distance 5 > radius 3)',
                  options: ['**Tangents:** 2 (point is outside the circle, distance 5 > radius 3)', '1 tangent', '0 secants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' }
          ],
            remediations: { 'a-chord-and-a-secant': { steps: ['Draw a circle and a line cutting it at A and B.', 'Label the whole line (with arrows) as **secant**.', 'Label segment AB as **chord**.', 'Erase the line outside the circle, leaving only segment AB.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a **chord** and a **secant** are the same thing.',
          parts: [
                { id: 'a', prompt: 'A classmate argues: "Since a tangent touches the circle at one point and a secant cuts at two points, a line that intersects the circle at exactly one point.', answer: 'The claim is **true** for straight lines in Euclidean plane geometry',
                  options: ['The claim is **true** for straight lines in Euclidean plane geometry', '.) **Wrong answer reveals:** If the student says', 'point of contact', 'midpoint of chord'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **chord** and a **secant** are the same thing.' }
          ],
            remediations: { 'a-chord-and-a-secant': { steps: ['Draw a circle and a line cutting it at A and B.', 'Label the whole line (with arrows) as **secant**.', 'Label segment AB as **chord**.', 'Erase the line outside the circle, leaving only segment AB.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_10_003', difficulty: 'standard',
          question: 'The tangent to a circle at any point P is perpendicular to the radius OP drawn.',
          hint: 'If stuck, revisit c9_math_ch5_4 (perpendicular from centre to chord) and c7_math_ch09_008.',
          misconception: 'Students believe the tangent is perpendicular to the diameter through the point of contact, not the radius.',
          parts: [
                { id: 'a', prompt: 'State the theorem: "The tangent at any point of a circle is perpendicular to the ______ through the point of contact." Fill in the blank and draw a labelled.', answer: '"radius"',
                  options: ['Correct answer: "radius"', 'diameter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the tangent is perpendicular to the diameter through the point of contact, not the radius.' }
          ],
            remediations: { 'the-tangent-is-perpendicular-to': { steps: ['If the student confuses radius/diameter or applies perpendicularity at the wrong point: 1.', 'Make them physically draw the circle, mark centre O, point of contact P, and the tangent line.', 'Ask: "Which segment connects O to P?', 'Is it a radius or diameter?" (Radius — it\'s half the diameter).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
