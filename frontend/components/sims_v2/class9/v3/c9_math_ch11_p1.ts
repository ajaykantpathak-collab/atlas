import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch11_p1: SimDef = {
    id: 'v3_c9_math_ch11_p1',
    title: 'Triangles: Congruence and Properties · Part 1/2',
    subtitle: 'This node covers the definition of congruence for plane figures (especially triangles).',
    classLevel: 9, subject: 'mathematics', topic: 'Triangles: Congruence and Properties · Part 1/2',
    chapters: ['c9_math_ch11'],
    nodeIds: ['c9_math_ch11_1', 'c9_math_ch11_2', 'c9_math_ch11_3', 'c9_math_ch11_4', 'c9_math_ch11_5', 'c9_math_ch11_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Suppose your Class 9 math teacher draws two triangles on the board, $\\triangle PQR$ and $\\triangle XYZ$, and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two triangles have sides 6 cm, 8 cm and included angle 60°. A third triangle has sides 6 cm, 8 cm and a **non-included** angle of 60° opposite the 6 cm side.',
        options: ['**Answer:** No', 'same three measurements = congruent', '"same three measurements = congruent" without checking if the angle is included'],
        answer: '**Answer:** No',
        hook: '**The "Any Angle" Trap:** Students see two equal sides and one equal angle and immediately write "SAS" without.',
    },
    teaching: [
        { title: 'Congruence of Figures: Meaning and Notation', text: 'Two geometric figures are **congruent** if one can be transformed into the other by a sequence of rigid motions (translations, rotations, and reflections) such that they coincide exactly; this.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch11_1', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_1', title: 'Congruence of Figures: Meaning and Notation',
          scaffold: { problem: 'A carpenter cuts two triangular wooden supports for a bookshelf.',
            steps: [
            { text: 'List the side lengths with their vertex pairs for both triangles.' },
            { text: 'Match sides of equal length between the two triangles.' },
            { text: 'Deduce the vertex correspondence from the matched sides.' },
            { text: 'Write the congruence statement with vertices in the corresponding order.' },
            { text: 'Verify the statement gives all six equalities.', faded: true, blankAnswer: 'Yes, the supports are congruent. $\\triangle ABC \\cong.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_2', title: 'SAS Congruence Rule',
          scaffold: { problem: 'A kite-maker in Gujarat cuts two bamboo strips of 25 cm and 35 cm for the frame.',
            steps: [
            { text: 'Identify the given data in both triangles. Triangle 1: Side1 = 25 cm, Side2 = 35 cm, Included angle = 50°.' },
            { text: 'Verify the angle is the *included* angle. In each frame, the 50° angle is between the 25 cm and 35 cm strips — yes,.' },
            { text: 'Label the triangles for correspondence. Let ΔABC be Frame 1 with AB = 25 cm, AC = 35 cm, ∠A = 50°.' },
            { text: 'Match corresponding parts: AB = PQ (25 cm), AC = PR (35 cm), ∠A = ∠P (50°).' },
            { text: 'Apply SAS rule and write congruence statement. ΔABC ≅ ΔPQR (By SAS congruence rule).', faded: true, blankAnswer: 'ΔABC ≅ ΔPQR (By SAS congruence rule). Vertex.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_3', title: 'ASA and AAS Congruence Rules',
          scaffold: { problem: 'A triangular garden plot ABC has ∠A = 50°, ∠B = 60°, and side AB = 10 m. Another plot PQR has ∠P = 50°, ∠Q = 60°, and side PQ = 10 m.',
            steps: [
            { text: 'Identify given information: In ΔABC, ∠A = 50°, ∠B = 60°, AB = 10 m. In ΔPQR, ∠P = 50°, ∠Q = 60°, PQ = 10 m.' },
            { text: 'Determine congruence rule: Side AB is between ∠A and ∠B (included side). Side PQ is between ∠P and ∠Q.' },
            { text: 'Write congruence statement with correct vertex correspondence: A ↔ P, B ↔ Q, C ↔ R. So ΔABC ≅ ΔPQR (ASA).' },
            { text: 'Use CPCT (Corresponding Parts of Congruent Triangles): Since ΔABC ≅ ΔPQR, corresponding sides are equal.' },
            { text: 'Verify: Check that all corresponding parts match — ∠C = ∠R = 180° - 50° - 60° = 70°, AC = PR, BC = QR = 8 m.', faded: true, blankAnswer: 'ΔABC ≅ ΔPQR by ASA; BC = 8 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_4', title: 'SSS Congruence Rule',
          scaffold: { problem: 'A triangular garden plot has sides 12 m, 16 m, and 20 m. The owner wants to build a second identical plot adjacent to it using fencing.',
            steps: [
            { text: 'Identify the given side lengths: In ΔPQR, PQ = 12 m, QR = 16 m, RP = 20 m. In ΔXYZ, XY = 12 m, YZ = 16 m, ZX = 20 m.' },
            { text: 'Match equal sides: PQ = XY = 12 m, QR = YZ = 16 m, RP = ZX = 20 m.' },
            { text: 'Derive vertex correspondence from equal sides: PQ=XY → P↔X, Q↔Y; QR=YZ → Q↔Y, R↔Z; RP=ZX → R↔Z, P↔X.' },
            { text: 'State the SSS Congruence Rule: Three sides of ΔPQR are equal to three sides of ΔXYZ.' },
            { text: 'Conclude congruence with correct statement: ΔPQR ≅ ΔXYZ (by SSS).', faded: true, blankAnswer: 'ΔPQR ≅ ΔXYZ (by SSS)' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_5', title: 'RHS Congruence Rule for Right Triangles',
          scaffold: { problem: 'A 10 m long ladder is placed against a vertical wall such that its foot is 6 m away from the wall.',
            steps: [
            { text: 'Identify the two right triangles. Each ladder forms the hypotenuse of a right triangle with the wall (vertical leg) and.' },
            { text: 'Label triangles. Let ΔABC and ΔDEF be the triangles, right-angled at B and E. AC = DF = 10 m (hypotenuses).' },
            { text: 'Apply RHS rule. Right angle, hypotenuse, and one side are respectively equal → ΔABC ≅ ΔDEF by RHS.' },
            { text: 'Find the height (other leg) using Pythagoras. In ΔABC: BC² = AC² - AB² = 10² - 6² = 100 - 36 = 64 → BC = 8 m.' },
            { text: 'By CPCT (Corresponding Parts of Congruent Triangles), the corresponding side EF = BC = 8 m.', faded: true, blankAnswer: 'The triangles are congruent by RHS. Each ladder touches the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch11_6', title: 'Properties of Isosceles Triangles (Base Angles)',
          scaffold: { problem: 'A triangular traffic sign board has two equal sides of 60 cm each. The angle between these equal sides (vertex angle) is 40°.',
            steps: [
            { text: 'Identify given: equal sides = 60 cm, vertex angle = 40°. By base angles theorem, base angles are equal.' },
            { text: 'Use angle sum property: 40° + x + x = 180° → 2x = 140° → x = 70°. So each base angle = 70°.' },
            { text: 'Draw altitude from vertex to base. This altitude bisects the base (proven by RHS congruence of the two right triangles.' },
            { text: 'In the right triangle with hypotenuse 60 cm, altitude 45 cm, and half-base y: by Pythagoras, 60² = 45² + y² → 3600.' },
            { text: 'Full base = 2y = 30√7 cm ≈ 79.37 cm. Verify: 30√7 ≈ 79.37 cm, altitude 45 cm, side 60 cm — check 45² + (15√7)² = 2025.', faded: true, blankAnswer: 'Base angles = 70° each; Base length = 30√7 cm (≈ 79.37 cm)' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch11_6', title: 'Rapid check',
          drill: { kind: 'data', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch11_6', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Triangles: Congruence and Properties like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Triangles: Congruence and Properties · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Triangles: Congruence and Properties · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch11_1', difficulty: 'standard',
          question: 'Two geometric figures are **congruent** if one can be transformed into the.',
          hint: 'If stuck, revisit **c7_math_ch09_001** (Congruent Figures: Same Shape and Size) and.',
          misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the.',
          parts: [
                { id: 'a', prompt: 'If $\\triangle ABC \\cong \\triangle DEF$, which angle in $\\triangle DEF$ corresponds to $\\angle B$?', answer: '$\\angle B$ corresponds to $\\angle E$',
                  options: ['$\\angle B$ corresponds to $\\angle E$', 'look the same'],
                  hint: 'If stuck, revisit **c7_math_ch09_001** (Congruent Figures: Same Shape and Size) and.',
                  misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the congruence statement.' },
                { id: 'b', prompt: 'Two students are discussing $\\triangle PQR \\cong \\triangle STU$.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'look the same'],
                  hint: 'If stuck, revisit **c7_math_ch09_001** (Congruent Figures: Same Shape and Size) and.',
                  misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the congruence statement.' },
                { id: 'c', prompt: 'In the figure below, $\\triangle LMN$ has sides $LM = 4\\,\\text{cm}$, $MN = 5\\,\\text{cm}$, $NL = 6\\,\\text{cm}$.', answer: 'Yes, they are congruent',
                  options: ['Yes, they are congruent', 'look the same'],
                  hint: 'If stuck, revisit **c7_math_ch09_001** (Congruent Figures: Same Shape and Size) and.',
                  misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the congruence statement.' }
          ],
            remediations: { 'if-two-triangles-look-the': { steps: ['**Stop and list**: Write down the three side lengths of each triangle *with their vertex pairs* (e.g., $AB=5$, $BC=6$.', '**Match equal lengths**: Draw arrows connecting equal sides ($AB \\leftrightarrow FD$, $BC \\leftrightarrow DE$, $CA.', '**Read off vertex correspondence**: From $AB \\leftrightarrow FD$, deduce $A \\leftrightarrow F$, $B \\leftrightarrow D$.', '**Write the statement in that order**: First triangle vertices $A,B,C$; second triangle vertices in the *same.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the.',
          parts: [
                { id: 'a', prompt: 'A Class 9 student solves a problem and concludes: "$\\triangle ABC \\cong \\triangle DEF$ because $AB = DE$, $BC = EF$, and $\\angle A = \\angle D$." Evaluate this.', answer: 'The conclusion is **not necessarily true**',
                  options: ['The conclusion is **not necessarily true**', 'look the same'],
                  hint: 'If stuck, revisit **c7_math_ch09_001** (Congruent Figures: Same Shape and Size) and.',
                  misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the congruence statement.' },
                { id: 'b', prompt: 'Create your own pair of congruent triangles with integer side lengths (in cm) such that the congruence statement is **not** in alphabetical order (e.g.', answer: 'Example: $\\triangle ABC$ with $AB=3$, $BC=4$, $CA=5$',
                  options: ['Example: $\\triangle ABC$ with $AB=3$, $BC=4$, $CA=5$', 'look the same'],
                  hint: 'If stuck, revisit **c7_math_ch09_001** (Congruent Figures: Same Shape and Size) and.',
                  misconception: 'Students believe that if two triangles "look the same" or have the same three side lengths written in any order, the congruence statement.' }
          ],
            remediations: { 'if-two-triangles-look-the': { steps: ['**Stop and list**: Write down the three side lengths of each triangle *with their vertex pairs* (e.g., $AB=5$, $BC=6$.', '**Match equal lengths**: Draw arrows connecting equal sides ($AB \\leftrightarrow FD$, $BC \\leftrightarrow DE$, $CA.', '**Read off vertex correspondence**: From $AB \\leftrightarrow FD$, deduce $A \\leftrightarrow F$, $B \\leftrightarrow D$.', '**Write the statement in that order**: First triangle vertices $A,B,C$; second triangle vertices in the *same.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_2', difficulty: 'standard',
          question: 'The SAS (Side-Angle-Side) Congruence Rule states that if two sides and the.',
          hint: 'Revisit "included angle" identification using c6_math_ch07_073 (triangle parts) and.',
          misconception: '**The "Any Angle" Trap:** Students see two equal sides and one equal angle and immediately write "SAS" without.',
          parts: [
                { id: 'a', prompt: 'Two triangles have sides 6 cm, 8 cm and included angle 60°. A third triangle has sides 6 cm, 8 cm and a **non-included** angle of 60° opposite the 6 cm side.', answer: '**Answer:** No',
                  options: ['**Answer:** No', 'same three measurements = congruent', '"same three measurements = congruent" without checking if the angle is included'],
                  hint: 'Revisit "included angle" identification using c6_math_ch07_073 (triangle parts) and.',
                  misconception: '**The "Any Angle" Trap:** Students see two equal sides and one equal angle and immediately write "SAS" without verifying the angle.' }
          ],
            remediations: { 'the-any-angle-trap-students': { steps: ['**Draw and Label:** Ask the student to draw both triangles roughly, label the *given* sides in red, and shade the.', '**Physical Check:** Use two pencils as sides — join them at the erasers to form an angle.', 'Ask: "If I fix these two pencils and this angle, can the tips move apart?" No — the distance between tips (third side).', '**Contrast with SSA:** Give two pencils (6 cm, 8 cm) and a protractor set to 30°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_3', difficulty: 'standard',
          question: 'ASA Congruence Rule: If two angles and the included side of one triangle are.',
          hint: 'If stuck, revisit the angle sum property (Class 7: c7_math_ch07_007) and practice.',
          misconception: 'Students treat AAS as a completely independent congruence rule and write "AAS" as the reason in proofs without ever.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR and ΔXYZ, ∠P = ∠X = 40°, ∠Q = ∠Y = 70°, and PQ = XY = 5 cm. Which congruence rule (ASA or AAS) applies directly, and why?', answer: 'ASA applies directly',
                  options: ['ASA applies directly', 'included side'],
                  hint: 'If stuck, revisit the angle sum property (Class 7: c7_math_ch07_007) and practice identifying.',
                  misconception: 'Students treat AAS as a completely independent congruence rule and write "AAS" as the reason in proofs without ever calculating the third.' }
          ],
            remediations: { 'students-treat-aas-as-a': { steps: ['If a student writes "AAS" without the third angle step: (1) Ask them to label the vertices of both triangles and mark.', '(2) Point to the given side and ask: "Which two angles is this side between?" They will see it\'s between one given.', '(3) Say: "To use ASA, we need the side between two KNOWN equal angles.', 'How can we find the third angle?" (4) Guide them to write: "∠C = 180° - ∠A - ∠B" and "∠F = 180° - ∠D - ∠E", then.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_4', difficulty: 'standard',
          question: 'The SSS (Side-Side-Side) Congruence Rule states: If three sides of one triangle.',
          hint: 'Revisit SSS triangle construction (Class 7: c7_math_ch07_009) and congruence of shapes.',
          misconception: 'Students often write the congruence statement with vertices in alphabetical order (e.g., ΔABC ≅ ΔDEF) without checking.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR and ΔXYZ, PQ = XY, QR = YZ, and PR = XZ. A student writes ΔPQR ≅ ΔXYZ. Is the correspondence correct? Explain why or why not.', answer: 'Correct answer: Yes, the correspondence is correct',
                  options: ['Correct answer: Yes, the correspondence is correct', 'No, it should be ΔPQR ≅ ΔZYX', 'We need angles to check'],
                  hint: 'Revisit SSS triangle construction (Class 7: c7_math_ch07_009) and congruence of shapes (Class 6.',
                  misconception: 'Students often write the congruence statement with vertices in alphabetical order (e.g., ΔABC ≅ ΔDEF) without checking which vertices.' },
                { id: 'b', prompt: 'Two triangles have sides 6 cm, 8 cm, 10 cm and 6 cm, 8 cm, 10 cm. Are they congruent?', answer: 'Correct answer: Yes, ΔABC ≅ ΔDEF',
                  options: ['Correct answer: Yes, ΔABC ≅ ΔDEF', 'ΔABC ≅ ΔEDF'],
                  hint: 'Revisit SSS triangle construction (Class 7: c7_math_ch07_009) and congruence of shapes (Class 6.',
                  misconception: 'Students often write the congruence statement with vertices in alphabetical order (e.g., ΔABC ≅ ΔDEF) without checking which vertices.' },
                { id: 'c', prompt: 'Compare SSS and AAA. Why does SSS guarantee congruence but AAA does not? Use the concept of "rigidity" in your explanation.', answer: 'Correct answer: SSS fixes all three side lengths, which uniquely determines the',
                  options: ['Correct answer: SSS fixes all three side lengths, which uniquely determines the', 'AAA also works because angles determine the triangle'],
                  hint: 'Revisit SSS triangle construction (Class 7: c7_math_ch07_009) and congruence of shapes (Class 6.',
                  misconception: 'Students often write the congruence statement with vertices in alphabetical order (e.g., ΔABC ≅ ΔDEF) without checking which vertices.' }
          ],
            remediations: { 'students-often-write-the-congruence': { steps: ['Have the student list the three given side equalities explicitly (e.g., AB = DE, BC = EF, CA = FD).', 'For each equality, write the vertex correspondence it implies (AB=DE → A↔D, B↔E).', 'Combine all correspondences into a single mapping (A↔D, B↔E, C↔F).', 'Write the congruence statement following this mapping (ΔABC ≅ ΔDEF).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_5', difficulty: 'standard',
          question: 'The RHS (Right angle-Hypotenuse-Side) Congruence Rule states: If in two.',
          hint: 'Revisit c8_math_ch9_5 (Pythagoras theorem) to practise finding hypotenuse from legs, and.',
          misconception: 'Students often apply RHS when the given equal sides are **both legs** (the two sides forming the right angle) instead.',
          parts: [
                { id: 'a', prompt: 'In ΔABC and ΔDEF, ∠B = ∠E = 90°, AC = DF = 10 cm, and AB = DE = 6 cm. A student claims ΔABC ≅ ΔDEF by SAS.', answer: 'SAS requires the angle to be *included* between the two sides',
                  options: ['SAS requires the angle to be *included* between the two sides', 'hypotenuse and one side', 'two sides'],
                  hint: 'Revisit c8_math_ch9_5 (Pythagoras theorem) to practise finding hypotenuse from legs, and.',
                  misconception: 'Students often apply RHS when the given equal sides are **both legs** (the two sides forming the right angle) instead of the hypotenuse and.' },
                { id: 'b', prompt: 'Two right triangles have equal hypotenuses. One triangle has legs 5 cm and 12 cm. The other has one leg 13 cm. Can the triangles be congruent?', answer: 'First triangle: legs 5, 12 → hypotenuse = √(5²+12²) = √169 = 13 cm',
                  options: ['First triangle: legs 5, 12 → hypotenuse = √(5²+12²) = √169 = 13 cm', 'yes, by RHS', 'hypotenuse and one side', 'two sides'],
                  hint: 'Revisit c8_math_ch9_5 (Pythagoras theorem) to practise finding hypotenuse from legs, and.',
                  misconception: 'Students often apply RHS when the given equal sides are **both legs** (the two sides forming the right angle) instead of the hypotenuse and.' }
          ],
            remediations: { 'students-often-apply-rhs-when': { steps: ['If a student uses RHS with two legs given equal: 1.', 'Ask: "Which side is the hypotenuse in each triangle?', 'Ask: "Is the hypotenuse given as equal in the problem statement, or did you calculate it?" 3.', 'Explain: "RHS stands for Right angle-**Hypotenuse**-Side.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch11_6', difficulty: 'standard',
          question: 'In an isosceles triangle, the angles opposite the equal sides are equal.',
          hint: 'Revisit c9_math_ch11_2 (SAS) and c9_math_ch11_4 (SSS) — practice writing full congruence.',
          misconception: '**Specific error:** Students write "In ΔABC, AB = AC, so ∠A = ∠B" — they think the *vertex angle* equals a *base angle*.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR, PQ = PR. A student draws the altitude PS from P to QR and claims ΔPQS ≅ ΔPRS by RHS. Is this correct?', answer: '**Correct answer:** Yes, it is correct',
                  options: ['**Correct answer:** Yes, it is correct', 'no, because we don\'t know QS = RS'],
                  hint: 'Revisit c9_math_ch11_2 (SAS) and c9_math_ch11_4 (SSS) — practice writing full congruence proofs for.',
                  misconception: '**Specific error:** Students write "In ΔABC, AB = AC, so ∠A = ∠B" — they think the *vertex angle* equals a *base angle* because "equal.' }
          ],
            remediations: { 'specific-error-students-write-in': { steps: ['**Step-by-step remediation:** 1.', 'Draw a large isosceles triangle on paper.', 'Label vertices A (apex), B, C (base).', 'Mark AB = AC with tick marks.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
