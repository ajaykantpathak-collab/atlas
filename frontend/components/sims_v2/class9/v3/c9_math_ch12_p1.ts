import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch12_p1: SimDef = {
    id: 'v3_c9_math_ch12_p1',
    title: 'Quadrilaterals · Part 1/2',
    subtitle: 'This node covers the proof and application of the angle sum property for all simple.',
    classLevel: 9, subject: 'mathematics', topic: 'Quadrilaterals · Part 1/2',
    chapters: ['c9_math_ch12'],
    nodeIds: ['c9_math_ch12_1', 'c9_math_ch12_2', 'c9_math_ch12_3', 'c9_math_ch12_4', 'c9_math_ch12_5', 'c9_math_ch12_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Riya is designing a rangoli pattern using four wooden strips joined at the ends to form a quadrilateral.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the minimum number of pairs of parallel sides a quadrilateral must have to be classified as a trapezium?',
        options: ['Exactly one pair', 'two pairs', 'one pair of opposite sides is equal'],
        answer: 'Exactly one pair',
        hook: 'Students often believe that if a quadrilateral has one pair of equal sides, it must be either a parallelogram.',
    },
    teaching: [
        { title: 'Angle Sum Property of a Quadrilateral', text: 'The Angle Sum Property of a Quadrilateral states that the sum of the four interior angles of any quadrilateral (convex or concave) is always 360°.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch12_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch12_1', title: 'Angle Sum Property of a Quadrilateral',
          scaffold: { problem: 'A carpenter is making a quadrilateral wooden frame for a window. Three angles measure 85°, 95°, and 110°.',
            steps: [
            { text: 'Identify given: three angles = 85°, 95°, 110°. Unknown: fourth angle = x°.' },
            { text: 'Recall Angle Sum Property: sum of all four interior angles = 360°.' },
            { text: 'Form equation: 85 + 95 + 110 + x = 360.' },
            { text: 'Compute sum of known angles: 85 + 95 = 180; 180 + 110 = 290. Then x = 360 − 290 = 70.' },
            { text: 'Verify: 85 + 95 + 110 + 70 = 360 ✓. Answer: 70°.', faded: true, blankAnswer: '70°' }
            ] } },
        { type: 'case', nodeId: 'c9_math_ch12_2', title: 'Types of Quadrilaterals: Parallelogram to Trapezium',
          caseStudy: { intro: 'Imagine you\'re designing a kite for Independence Day using two bamboo strips for the frame.',
            decisions: [{ prompt: 'What is the minimum number of pairs of parallel sides a quadrilateral must have to be classified as a trapezium?', options: [
                { text: 'Exactly one pair', outcome: 'Exactly one pair. A trapezium requires precisely one pair of opposite sides to be parallel.' },
                { text: 'two pairs', outcome: 'Not quite — Students often believe that if a quadrilateral has one pair of equal sides, it must be either.', reveals: 'if-a-quadrilateral-has-one' },
                { text: 'one pair of opposite sides is equal', outcome: 'Not quite — Students often believe that if a quadrilateral has one pair of equal sides, it must be either.', reveals: 'if-a-quadrilateral-has-one' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_math_ch12_3', title: 'Properties of a Parallelogram: Opposite Sides and Angles',
          scaffold: { problem: 'A parallelogram-shaped garden plot has one side 15 m long and an adjacent side 10 m long. The angle between them is 60°.',
            steps: [
            { text: 'Identify given: In parallelogram ABCD, let AB = 15 m, BC = 10 m, ∠A = 60°.' },
            { text: 'Compute perimeter: Perimeter = AB + BC + CD + DA = 15 + 10 + 15 + 10 = 50 m.' },
            { text: 'Use opposite angles property: ∠C = ∠A = 60°.' },
            { text: 'Use adjacent angles supplementary (from parallel lines): ∠A + ∠B = 180° → 60° + ∠B = 180° → ∠B = 120°.' },
            { text: 'Opposite angles: ∠D = ∠B = 120°. Verify sum: 60+120+60+120 = 360°.', faded: true, blankAnswer: 'Perimeter = 50 m; angles: 60°, 120°, 60°, 120°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch12_4', title: 'Diagonals of a Parallelogram Bisect Each Other',
          scaffold: { problem: 'In parallelogram PQRS, diagonals PR and QS intersect at O. If PO = (3x - 2) cm and OR = (x + 6) cm, find the length of diagonal PR.',
            steps: [
            { text: 'Identify the property — diagonals of a parallelogram bisect each other, so PO = OR.' },
            { text: 'Set up the equation: 3x - 2 = x + 6.' },
            { text: 'Solve for x: 3x - x = 6 + 2 → 2x = 8 → x = 4.' },
            { text: 'Find PO and OR: PO = 3(4) - 2 = 10 cm, OR = 4 + 6 = 10 cm. Verify PO = OR ✓.' },
            { text: 'Find full diagonal PR = PO + OR = 10 + 10 = 20 cm.', faded: true, blankAnswer: 'PR = 20 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch12_5', title: 'Conditions for a Quadrilateral to be a Parallelogram',
          scaffold: { problem: 'A farmer in Punjab has a plot of land shaped as a quadrilateral ABCD.',
            steps: [
            { text: 'Identify given data in quadrilateral ABCD: AB = CD = 50 m, BC = DA = 30 m.' },
            { text: 'In ΔABC and ΔCDA, we have AB = CD (given), BC = DA (given), AC = CA (common side).' },
            { text: 'By SSS congruence criterion, ΔABC ≅ ΔCDA.' },
            { text: 'By CPCT (Corresponding Parts of Congruent Triangles), ∠BAC = ∠DCA and ∠BCA = ∠DAC.' },
            { text: '∠BAC = ∠DCA are alternate interior angles formed by transversal AC intersecting lines AB and CD.' },
            { text: 'Both pairs of opposite sides are parallel. Therefore, ABCD is a parallelogram.', faded: true, blankAnswer: 'Plot ABCD is a parallelogram; diagonal AC divides it into.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch12_6', title: 'The Mid-Point Theorem',
          scaffold: { problem: 'In ΔPQR, M and N are mid-points of PQ and PR respectively. PQ = 10 cm, PR = 14 cm, QR = 12 cm. Find the perimeter of quadrilateral MNRQ.',
            steps: [
            { text: 'Identify given — M is mid-point of PQ → PM = MQ = 5 cm. N is mid-point of PR → PN = NR = 7 cm. QR = 12 cm.' },
            { text: 'Apply Mid-Point Theorem — MN ∥ QR and MN = ½ QR = ½ × 12 = 6 cm.' },
            { text: 'Quadrilateral MNRQ has sides MN, NR, RQ, QM. We know MN = 6 cm, NR = 7 cm, RQ = 12 cm, QM = 5 cm.' },
            { text: 'Perimeter = MN + NR + RQ + QM = 6 + 7 + 12 + 5 = 30 cm.' },
            { text: 'Verify — all sides accounted for, units consistent (cm), quadrilateral MNRQ is a trapezium (MN ∥ QR).', faded: true, blankAnswer: '30 cm' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch12_6', title: 'Rapid check',
          drill: { kind: 'algebra,linear2', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch12_6', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Quadrilaterals like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Quadrilaterals · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Quadrilaterals · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch12_1', difficulty: 'standard',
          question: 'The Angle Sum Property of a Quadrilateral states that the sum of the four.',
          hint: 'Revisit c7_math_ch07_007 (Triangle Angle Sum Property) and c6_math_ch05_057 (Solving.',
          misconception: 'Students often write the equation for "three angles are x°, 2x°, 3x° and the fourth is 90°" as x + 2x + 3x + 90 = 180.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Angle Sum Property of a Quadrilateral states that the sum of the four interior angles',
                  options: ['The Angle Sum Property of a Quadrilateral states that the sum of the four interior angles', 'A quadrilateral is a parallelogram if both pairs of opposite sides are parallel and equal', 'In a parallelogram, opposite sides are equal in length and opposite angles are equal in', 'In a parallelogram, the diagonals intersect at a point that divides each diagonal into'],
                  hint: 'Revisit c7_math_ch07_007 (Triangle Angle Sum Property) and c6_math_ch05_057 (Solving Linear.',
                  misconception: 'Students often write the equation for "three angles are x°, 2x°, 3x° and the fourth is 90°" as x + 2x + 3x + 90 = 180 (using triangle sum).' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['If a student uses 180° instead of 360°, have them physically tear a quadrilateral from paper, cut along a diagonal, and.', 'For the parentheses error, use a number example: "If ∠A = 80°, what is 10° less than ∠A?" (70°).', 'Then show 2×80−10=150 vs 2×(80−10)=140.', 'Ask which matches "10° less than ∠A".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the equation for "three angles are x°, 2x°, 3x° and the fourth is 90°" as x + 2x + 3x + 90 = 180.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Three angles of a quadrilateral are 100°, 50°, and 70°. Find the fourth angle." Their working: 100+50+70=220. 360−220=140. Answer: 140°.', answer: 'Yes, the calculation is correct (140°)',
                  options: ['Yes, the calculation is correct (140°)', 'no, it\'s wrong'],
                  hint: 'Revisit c7_math_ch07_007 (Triangle Angle Sum Property) and c6_math_ch05_057 (Solving Linear.',
                  misconception: 'Students often write the equation for "three angles are x°, 2x°, 3x° and the fourth is 90°" as x + 2x + 3x + 90 = 180 (using triangle sum).' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['If a student uses 180° instead of 360°, have them physically tear a quadrilateral from paper, cut along a diagonal, and.', 'For the parentheses error, use a number example: "If ∠A = 80°, what is 10° less than ∠A?" (70°).', 'Then show 2×80−10=150 vs 2×(80−10)=140.', 'Ask which matches "10° less than ∠A".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_2', difficulty: 'standard',
          question: 'A quadrilateral is a parallelogram if both pairs of opposite sides are parallel.',
          hint: 'Review the angle sum property of quadrilaterals (c9_math_ch12_1) and parallel line.',
          misconception: 'Students often believe that if a quadrilateral has one pair of equal sides, it must be either a parallelogram.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of pairs of parallel sides a quadrilateral must have to be classified as a trapezium?', answer: 'Exactly one pair',
                  options: ['Exactly one pair', 'two pairs', 'one pair of opposite sides is equal'],
                  hint: 'Review the angle sum property of quadrilaterals (c9_math_ch12_1) and parallel line theorems.',
                  misconception: 'Students often believe that if a quadrilateral has one pair of equal sides, it must be either a parallelogram or trapezium—for example,.' },
                { id: 'b', prompt: 'Two students debate: Student A says "If a quadrilateral has one pair of equal and parallel sides, it must be a parallelogram." Student B says "No, it could.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'one pair of opposite sides is equal'],
                  hint: 'Review the angle sum property of quadrilaterals (c9_math_ch12_1) and parallel line theorems.',
                  misconception: 'Students often believe that if a quadrilateral has one pair of equal sides, it must be either a parallelogram or trapezium—for example,.' }
          ],
            remediations: { 'if-a-quadrilateral-has-one': { steps: ['To fix this, first have the student draw two segments of equal length (say 5cm each) not parallel to each other.', 'Then add two other sides of different lengths to form a quadrilateral.', 'Measure or calculate the angles—show that neither pair of opposite sides is parallel (e.g., using protractor or slope.', 'Emphasize: "Equal sides do not imply parallel sides—parallelism must be given or proven via angles (supplementary.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_3', difficulty: 'standard',
          question: 'In a parallelogram, opposite sides are equal in length and opposite angles are.',
          hint: 'Revisit Class 7 alternate angles (c7_math_ch05_008) and ASA congruence (c7_math_ch09_007).',
          misconception: 'Students often write "∠A = ∠B" or "AB = BC" when asked for opposite sides/angles, confusing *adjacent* with *opposite*.',
          parts: [
                { id: 'a', prompt: 'In parallelogram PQRS, if side PQ = 8 cm and side QR = 5 cm, what are the lengths of RS and SP?', answer: 'RS = 8 cm and SP = 5 cm',
                  options: ['RS = 8 cm and SP = 5 cm', '∠A = ∠B', 'AB = BC', 'consecutive sides are equal'],
                  hint: 'Revisit Class 7 alternate angles (c7_math_ch05_008) and ASA congruence (c7_math_ch09_007) — draw.',
                  misconception: 'Students often write "∠A = ∠B" or "AB = BC" when asked for opposite sides/angles, confusing *adjacent* with *opposite*.' },
                { id: 'b', prompt: 'In parallelogram ABCD, ∠A = 70°. A student says ∠B = 70° because "opposite angles are equal." Is the student correct? Explain why or why not.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', '∠A = ∠B', 'AB = BC'],
                  hint: 'Revisit Class 7 alternate angles (c7_math_ch05_008) and ASA congruence (c7_math_ch09_007) — draw.',
                  misconception: 'Students often write "∠A = ∠B" or "AB = BC" when asked for opposite sides/angles, confusing *adjacent* with *opposite*.' },
                { id: 'c', prompt: 'Parallelogram WXYZ has WX = 12 cm and ∠W = 110°. Find the perimeter of WXYZ and the measure of ∠Y.', answer: 'Opposite sides are equal: XY = WZ = 12 cm?',
                  options: ['Opposite sides are equal: XY = WZ = 12 cm?', '∠A = ∠B', 'AB = BC'],
                  hint: 'Revisit Class 7 alternate angles (c7_math_ch05_008) and ASA congruence (c7_math_ch09_007) — draw.',
                  misconception: 'Students often write "∠A = ∠B" or "AB = BC" when asked for opposite sides/angles, confusing *adjacent* with *opposite*.' }
          ],
            remediations: { 'students-often-write-a-b': { steps: ['Have the student physically label a parallelogram cut-out: color opposite sides the same color (e.g., AB and CD red,.', 'Then trace diagonal AC and fold along it — the triangles match exactly, showing AB falls on CD and BC falls on AD.', 'Next, mark angles with arcs: ∠A and ∠C get one arc, ∠B and ∠D get two arcs.', 'Finally, give 5 quick "identify the opposite pair" drills: "Point to the side opposite AB," "Point to the angle.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_4', difficulty: 'standard',
          question: 'In a parallelogram, the diagonals intersect at a point that divides each.',
          hint: 'Review c7_math_ch09_007 (ASA congruence) and c9_math_ch12_3 (opposite sides equal and.',
          misconception: 'Students often write "AC = BD" (diagonals are equal) when they mean "AO = OC and BO = OD" (diagonals bisect each.',
          parts: [
                { id: 'a', prompt: 'State the theorem: "The diagonals of a parallelogram ______ each other." Fill in the blank with the precise mathematical verb.', answer: '"bisect"',
                  options: ['"bisect"', 'intersect', 'bisect'],
                  hint: 'Review c7_math_ch09_007 (ASA congruence) and c9_math_ch12_3 (opposite sides equal and parallel).',
                  misconception: 'Students often write "AC = BD" (diagonals are equal) when they mean "AO = OC and BO = OD" (diagonals bisect each other).' },
                { id: 'b', prompt: 'In parallelogram PQRS, diagonals PR and QS intersect at O. If PO = 3x + 2 and OR = 5x - 6, explain why you can set 3x + 2 = 5x - 6 to find x, and what property.', answer: 'Because diagonals bisect each other, O is the midpoint of PR, so PO = OR',
                  options: ['Because diagonals bisect each other, O is the midpoint of PR, so PO = OR', 'opposite sides are equal', 'diagonals are equal'],
                  hint: 'Review c7_math_ch09_007 (ASA congruence) and c9_math_ch12_3 (opposite sides equal and parallel).',
                  misconception: 'Students often write "AC = BD" (diagonals are equal) when they mean "AO = OC and BO = OD" (diagonals bisect each other).' }
          ],
            remediations: { 'students-often-write-ac-bd': { steps: ['Draw a non-rectangular parallelogram (slanted) on grid paper, measure both diagonals with a ruler, and show they are.', 'Highlight the difference in notation: AO = OC means *half* of diagonal AC equals the *other half*; AC = BD means.', 'Practice: Given AO = 5, OC = 5, BO = 3, OD = 3, write AC = 10, BD = 6.', 'Is AO = OC?" Repeat with algebraic expressions until the distinction is automatic.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_5', difficulty: 'standard',
          question: 'A quadrilateral is a parallelogram if and only if **any one** of the following.',
          hint: 'If stuck, revisit **c7_math_ch09_005, c7_math_ch09_006, c7_math_ch09_007** (Congruence.',
          misconception: 'Students often try to prove a quadrilateral is a parallelogram by showing **only one pair of opposite sides is equal**.',
          parts: [
                { id: 'a', prompt: 'State all five sufficient conditions for a quadrilateral to be a parallelogram.', answer: 'The five conditions are: (1) Both pairs of opposite sides are parallel',
                  options: ['The five conditions are: (1) Both pairs of opposite sides are parallel', 'diagonals are equal'],
                  hint: 'If stuck, revisit **c7_math_ch09_005, c7_math_ch09_006, c7_math_ch09_007** (Congruence Criteria).',
                  misconception: 'Students often try to prove a quadrilateral is a parallelogram by showing **only one pair of opposite sides is equal** (or only one pair.' },
                { id: 'b', prompt: 'Compare Condition 2 (Both pairs of opposite sides equal) and Condition 5 (One pair of opposite sides parallel and equal). Are they logically equivalent?', answer: 'They are **not logically equivalent**',
                  options: ['They are **not logically equivalent**', 'they are the same', 'Condition 5 proves Condition 2 directly'],
                  hint: 'If stuck, revisit **c7_math_ch09_005, c7_math_ch09_006, c7_math_ch09_007** (Congruence Criteria).',
                  misconception: 'Students often try to prove a quadrilateral is a parallelogram by showing **only one pair of opposite sides is equal** (or only one pair.' }
          ],
            remediations: { 'students-often-try-to-prove': { steps: ['Draw a clear counter-example: Sketch an isosceles trapezium ABCD (AB || CD, AD = BC).', 'Ask: "Are both pairs of opposite sides equal?', 'Have the student write the definition of "sufficient condition" vs "necessary condition" in their notebook.', 'Practice the "Checklist Method": For any proof, tick off which of the 5 conditions is being used.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch12_6', difficulty: 'standard',
          question: 'In a triangle, the line segment joining the mid-points of any two sides.',
          hint: 'If stuck, revisit c7_math_ch09_006 (SAS congruence) and c8_math_ch4_9 (parallelogram.',
          misconception: 'Students often apply the Mid-Point Theorem to ANY segment joining points on two sides — e.g., in ΔABC, if D is on.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a triangle, the line segment joining the mid-points of any two sides is parallel to',
                  options: ['In a triangle, the line segment joining the mid-points of any two sides is parallel to', 'The Angle Sum Property of a Quadrilateral states that the sum of the four interior angles', 'A quadrilateral is a parallelogram if both pairs of opposite sides are parallel and equal', 'In a parallelogram, opposite sides are equal in length and opposite angles are equal in'],
                  hint: 'If stuck, revisit c7_math_ch09_006 (SAS congruence) and c8_math_ch4_9 (parallelogram properties).',
                  misconception: 'Students often apply the Mid-Point Theorem to ANY segment joining points on two sides — e.g., in ΔABC, if D is on AB and E is on AC with.' }
          ],
            remediations: { 'students-often-apply-the-mid': { steps: ['If a student makes this error: (1) Draw ΔABC with AB = 6 cm, AC = 9 cm.', 'Mark D on AB with AD = 2 cm, DB = 4 cm (not mid-point).', 'Mark E on AC with AE = 3 cm, EC = 6 cm (not mid-point).', '(2) Measure DE and BC physically — show DE ≠ ½ BC and DE ∦ BC.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
