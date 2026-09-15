import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch06_p1: SimDef = {
    id: 'v3_c10_math_ch06_p1',
    title: 'Triangles · Part 1/2',
    subtitle: 'Measure a tower you\'ll never climb — using only its shadow',
    classLevel: 10, subject: 'mathematics', topic: 'Triangles · Part 1/2',
    chapters: ['c10_math_ch06'],
    nodeIds: ['c10_math_cbse_06_001', 'c10_math_cbse_06_002', 'c10_math_cbse_06_003', 'c10_math_cbse_06_004', 'c10_math_cbse_06_005', 'c10_math_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a surveyor with only a stick and sunlight', intro: 'You can\'t climb the tower, but its shadow is lying right there on the ground. If you can prove your stick\'s triangle is similar to the tower\'s, one proportion does the measuring for you.', goal: 'Distinguish similar from congruent, apply similarity criteria to prove triangle relationships, and use them to solve real measurement problems.' },
    discovery: {
        question: 'Your photo on a passport, on a stamp and on a billboard — same face, wildly different sizes. A geometry teacher calls all three \'similar.\' Your friend insists only same-sized figures can \'match.\' Who\'s using the word correctly?',
        options: ['The teacher — similar means same shape (equal angles, proportional sides); same size makes them congruent, a special case of similar', 'The friend — similar always meant identical in maths', 'Both — similar and congruent are synonyms in geometry', 'Neither — photos can\'t be studied geometrically'],
        answer: 'The teacher — similar means same shape (equal angles, proportional sides); same size makes them congruent, a special case of similar',
        hook: 'Congruent is just similar with a zoom of exactly 1×. Every scaled map, blueprint and film projection runs on similarity — same angles, stretched sides.',
    },
    teaching: [
        { title: 'Similar Figures vs Congruent Figures: Distinction', text: 'Two figures are **similar** if they have the same shape but not necessarily the same size; corresponding angles are equal and corresponding sides are in proportion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_06_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Prove triangles similar using AA, SSS and SAS tests, then weaponise the result: measure a tower\'s height from its shadow and dissect why Pythagoras falls out of similarity.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_001', title: 'Similar Figures vs Congruent Figures: Distinction',
          scaffold: { problem: '** A rectangular playground in a school measures 40 m × 30 m. The school management wants to create a scale model for the display board.',
            steps: [
            { text: 'Identify given values. Actual playground length = 40 m, breadth = 30 m. Scale: 1 cm on model = 4 m actual.' },
            { text: 'Convert actual dimensions to model dimensions using the scale. Model length = 40 m ÷ 4 m/cm = 10 cm.' },
            { text: 'Check corresponding angles. Both actual playground and model are rectangles → all angles = 90°.' },
            { text: 'Check corresponding sides for proportionality. Length ratio = 40 m / 10 cm = 4000 cm / 10 cm = 400.' },
            { text: 'Conclude. Since corresponding angles are equal AND corresponding sides are proportional (scale factor 400), the actual.', faded: true, blankAnswer: '** Model dimensions: 10 cm × 7.5 cm. The playground and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_002', title: 'Similarity of Triangles: Definition and Notation (AAA)',
          scaffold: { problem: 'A triangular traffic sign board has angles 40°, 60°, and 80°. A larger version is made for a highway with angles 40°, 60°, and 80°.',
            steps: [
            { text: 'Verify the triangles are similar by AAA — both have angles 40°, 60°, 80°.' },
            { text: 'Identify corresponding sides. The smallest side (opposite 40°) corresponds: 30 cm ↔ 75 cm.' },
            { text: 'Calculate the similarity ratio (scale factor) = corresponding side of highway / corresponding side of original = 75/30.' },
            { text: 'Find the other sides of highway sign: Medium side = 45 × 2.5 = 112.5 cm. Largest side = 54 × 2.5 = 135 cm.' },
            { text: 'Verify proportionality: 30/75 = 45/112.5 = 54/135 = 2/5 = 0.4. All ratios equal, confirming similarity.', faded: true, blankAnswer: 'The highway sign\'s other two sides are 112.5 cm and 135 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_003', title: 'Basic Proportionality Theorem (Thales\' Theorem)',
          scaffold: { problem: 'A triangular plot of land ΔPQR has a boundary PQ = 20 m. A farmer wants to build a fence ST parallel to QR, with S on PQ and T on PR.',
            steps: [
            { text: 'Identify the given: In ΔPQR, ST || QR. PS = 8 m, SQ = 12 m, PT = 10 m, QR = 15 m. Need TR and ST.' },
            { text: 'Apply BPT: PS/SQ = PT/TR → 8/12 = 10/TR.' },
            { text: 'Simplify and solve for TR: 8/12 = 2/3. So 2/3 = 10/TR → cross-multiply: 2 × TR = 3 × 10 → 2TR = 30 → TR = 15 m.' },
            { text: 'Find ST using similarity (ΔPST ~ ΔPQR): PS/PQ = ST/QR. PQ = PS + SQ = 8 + 12 = 20 m.' },
            { text: 'Verify: PS/SQ = 8/12 = 2/3, PT/TR = 10/15 = 2/3 ✓. ST = 6 m, QR = 15 m, ratio 6/15 = 2/5 = PS/PQ ✓.', faded: true, blankAnswer: 'TR = 15 m, Fence length ST = 6 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_004', title: 'Converse of Basic Proportionality Theorem',
          scaffold: { problem: 'In ΔPQR, points S and T lie on sides PQ and PR respectively. PS = 6 cm, SQ = 9 cm, PT = 8 cm, TR = 12 cm.',
            steps: [
            { text: 'Write the given data clearly: In ΔPQR, S lies on PQ, T lies on PR. PS = 6 cm, SQ = 9 cm, PT = 8 cm, TR = 12 cm.' },
            { text: 'Compute the ratios PS/SQ and PT/TR. PS/SQ = 6/9 = 2/3. PT/TR = 8/12 = 2/3.' },
            { text: 'State the observation: PS/SQ = PT/TR = 2/3. Note that S lies on segment PQ and T lies on segment PR (internal division).' },
            { text: 'Invoke the Converse of Basic Proportionality Theorem: If a line divides two sides of a triangle in the same ratio, then.' },
            { text: 'Conclude: Therefore, ST ∥ QR. (Hence proved.)', faded: true, blankAnswer: 'ST ∥ QR (proved using Converse of BPT)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_005', title: 'Criteria for Similarity: AAA and AA Criterion',
          scaffold: { problem: 'A 1.5 m tall girl stands 3 m away from a lamppost and casts a shadow of 4.5 m on the ground.',
            steps: [
            { text: 'Draw two right triangles: ΔGirl (vertical = girl\'s height 1.5 m, horizontal = shadow 4.5 m) and ΔLamppost (vertical.' },
            { text: 'Identify equal angles: Both triangles have a right angle (vertical ⊥ horizontal).' },
            { text: 'By AA criterion (right angle + equal sun elevation angle), ΔGirl ~ ΔLamppost.' },
            { text: 'Set up proportion of corresponding sides: Height of girl / Height of lamppost = Shadow of girl / Shadow of lamppost →.' },
            { text: 'Solve: 1.5 × 7.5 = 4.5 × h → 11.25 = 4.5h → h = 11.25 / 4.5 = 2.5 m.', faded: true, blankAnswer: 'Height of lamppost = 2.5 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_006', title: 'Criteria for Similarity: SSS Criterion',
          scaffold: { problem: 'A triangular traffic sign has sides 60 cm, 80 cm, and 100 cm. A miniature model of the sign is made for a toy set.',
            steps: [
            { text: 'Identify given data. Actual sign sides: 60 cm, 80 cm, 100 cm. Model shortest side = 3 cm.' },
            { text: 'Determine the scale factor (ratio of corresponding sides). Scale factor = Model side / Actual side = 3 cm / 60.' },
            { text: 'Compute the other two model sides using the same scale factor. Second side = 80 cm × (1/20) = 4 cm.' },
            { text: 'Verify SSS similarity by checking all three ratios. Ratio1 = 3/60 = 1/20. Ratio2 = 4/80 = 1/20. Ratio3 = 5/100 = 1/20.' },
            { text: 'Conclude similarity and state answer. Since all three pairs of corresponding sides are proportional (ratio 1:20), the.', faded: true, blankAnswer: 'The other two sides of the model are 4 cm and 5 cm. The.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_06_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student enlarges a 4 cm × 6 cm photo to 8 cm × 12 cm for a poster. His friend says, \'Same picture, same shape — the two photos are congruent, just one is bigger.\'',
            decisions: [{ prompt: 'What is the precise relationship between the two photos?', options: [
                { text: 'They are similar, not congruent — corresponding angles are equal and every side doubled, so the shape is preserved at scale factor 2. Congruence demands corresponding sides be equal in length, which fails the moment the enlargement happens; \'same shape\' alone gives similarity, and \'same shape and same size\' is what congruence requires.', outcome: 'This is the classic trap: equal angles and proportional sides define similarity; congruence additionally demands the sides actually match — no scaling allowed.' },
                { text: 'The friend is right — same shape is exactly what congruent means, so the photos are congruent.', outcome: 'Same shape with different size is similarity; congruence also requires equal corresponding sides — an enlargement can never be congruent to the original.', reveals: 'similar-equals-congruent' },
                { text: 'The photos are neither similar nor congruent, since changing the size changes the figure completely.', outcome: 'Doubling every side keeps all angles and all ratios — the very definition of similar figures.', reveals: 'resize-breaks-similarity' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Similarity is why a 1-cm map can describe a 1-km city honestly. Keep the angles, scale the sides, and the shape survives every zoom.',
            decisions: [{ prompt: 'What comes next? Triangles · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Triangles · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_06_001', difficulty: 'standard',
          question: 'Two figures are **similar** if they have the same shape but not necessarily the.',
          hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice.',
          misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with.',
          parts: [
                { id: 'a', prompt: 'State the precise mathematical condition that distinguishes congruent figures from similar figures.', answer: '**Correct answer:** In congruent figures, corresponding angles are equal AND',
                  options: ['**Correct answer:** In congruent figures, corresponding angles are equal AND', 'congruent means same shape, similar means same shape but different size'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice checking if a/b.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' },
                { id: 'b', prompt: 'Two squares have side lengths 5 cm and 10 cm. A student claims: "These squares are congruent because all squares have 90° angles, so their corresponding angles.', answer: '**Correct answer:** The student is incorrect',
                  options: ['**Correct answer:** The student is incorrect', 'same shape'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice checking if a/b.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' },
                { id: 'c', prompt: 'Analyze the following statement: "If two triangles are similar, then their corresponding medians are in the same ratio as their corresponding sides." Is this.', answer: '**Correct answer:** Always true',
                  options: ['**Correct answer:** Always true', 'sometimes true', 'never true'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice checking if a/b.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' }
          ],
            remediations: { 'misconception-if-two-figures-have': { steps: ['**Concrete demonstration:** Give the student two rectangular sheets of paper — one A4 (21 cm × 29.7 cm) and one A3.', 'Ask: "Can you place the A4 exactly on top of the A3 so every corner and edge matches?" (No — sizes differ).', '"Are the angles the same?" (Yes, all 90°).', '"So what are they?" (Similar, scale factor √2).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with.',
          parts: [
                { id: 'a', prompt: 'A Class 10 student writes the following solution to a board exam question: *Question:* "Prove that two circles with radii 3 cm and 5 cm are similar.".', answer: '**Correct answer:** The solution would NOT receive full marks',
                  options: ['**Correct answer:** The solution would NOT receive full marks', 'this is sufficient, they don\'t understand CBSE marking scheme expectations'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice checking if a/b.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' }
          ],
            remediations: { 'misconception-if-two-figures-have': { steps: ['**Concrete demonstration:** Give the student two rectangular sheets of paper — one A4 (21 cm × 29.7 cm) and one A3.', 'Ask: "Can you place the A4 exactly on top of the A3 so every corner and edge matches?" (No — sizes differ).', '"Are the angles the same?" (Yes, all 90°).', '"So what are they?" (Similar, scale factor √2).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_002', difficulty: 'standard',
          question: 'Two triangles are said to be similar if their corresponding angles are equal.',
          hint: 'Review Class 7 node c7_math_ch09_010 (Why AAA is not a congruence criterion) and Class 7.',
          misconception: 'Students write similarity statements with incorrect vertex ordering, e.g., given ΔABC ~ ΔDEF with ∠A=∠D, ∠B=∠E, ∠C=∠F.',
          parts: [
                { id: 'a', prompt: 'In Class 7 you learned AAA is NOT a congruence criterion (triangles with same angles can be different sizes).', answer: 'Congruence requires both shape AND size to be identical (all sides equal)',
                  options: ['Congruence requires both shape AND size to be identical (all sides equal)', 'AAA proves triangles are equal'],
                  hint: 'Review Class 7 node c7_math_ch09_010 (Why AAA is not a congruence criterion) and Class 7 node.',
                  misconception: 'Students write similarity statements with incorrect vertex ordering, e.g., given ΔABC ~ ΔDEF with ∠A=∠D, ∠B=∠E, ∠C=∠F, they write ΔABC ~.' }
          ],
            remediations: { 'students-write-similarity-statements-with': { steps: ['Have the student physically label angles with colored arcs on both triangles (red for ∠A/∠D, blue for ∠B/∠E, green for.', 'Write the similarity statement by listing vertices in the SAME color order: first red vertex, then blue, then green.', 'Verify by checking that the first vertex in first triangle corresponds to first in second, etc.', 'Practice with 5 examples where triangles are drawn in different orientations (rotated, reflected) to reinforce that.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_003', difficulty: 'standard',
          question: 'If a line is drawn parallel to one side of a triangle intersecting the other.',
          hint: 'If stuck, revisit c6_math_ch06_063 (proportion and cross-multiplication) and.',
          misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR, a line ST is drawn intersecting PQ at S and PR at T. A student writes PS/SQ = PT/TR and claims BPT applies.', answer: 'The student must verify that ST || QR',
                  options: ['The student must verify that ST || QR', 'triangle must be similar', 'angles must be equal'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (proportion and cross-multiplication) and c7_math_ch05_007.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' },
                { id: 'b', prompt: 'In ΔXYZ, line PQ intersects XY at P and XZ at Q. Given XP = 3 cm, PY = 6 cm, XQ = 4 cm, QZ = 8 cm. Can you conclude PQ || YZ?', answer: 'Yes, PQ || YZ',
                  options: ['Yes, PQ || YZ', 'cannot conclude without converse theorem'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (proportion and cross-multiplication) and c7_math_ch05_007.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' }
          ],
            remediations: { 'students-write-ad-ab-ae': { steps: ['If a student uses AD/AB = AE/AC, clarify: "Both formulas work for internal division because of componendo, but AD/DB.', '2) Measure AD, DB, AE, EC.', '3) Show AD/DB ≠ AE/EC numerically.', '4) Revisit the area proof: "ΔBDE and ΔDEC have equal area ONLY because they lie between parallels DE and BC.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_004', difficulty: 'standard',
          question: 'The Converse of Basic Proportionality Theorem states: If a line divides any two.',
          hint: 'If stuck, revisit c10_math_cbse_06_003 (BPT statement and proof) and c6_math_ch06_063.',
          misconception: 'Students confuse the Converse of BPT with BPT itself. The exact wrong step: In a problem where they are given AD/DB.',
          parts: [
                { id: 'a', prompt: 'In ΔABC, points D and E lie on AB and AC respectively. AD = 4 cm, DB = 6 cm, AE = 5 cm, EC = 7.5 cm.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'internal division'],
                  hint: 'If stuck, revisit c10_math_cbse_06_003 (BPT statement and proof) and c6_math_ch06_063 (equivalent.',
                  misconception: 'Students confuse the Converse of BPT with BPT itself. The exact wrong step: In a problem where they are given AD/DB = AE/EC and asked.' }
          ],
            remediations: { 'students-confuse-the-converse-of': { steps: ['Draw two triangles side by side. Label one "BPT: Given DE ∥ BC → Prove AD/DB = AE/EC".', 'Make them say aloud: "Parallel gives ratio" vs "Ratio gives parallel".', 'Give 5 mixed problems — some with "Given parallel", some with "Given ratio" — and have them identify which theorem.', 'For the external division error, draw a triangle with D on AB extended. Ask: "Is D on side AB?" No.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_005', difficulty: 'standard',
          question: 'The AAA (Angle-Angle-Angle) criterion states that if in two triangles, the.',
          hint: 'Revisit c7_math_ch07_007 (angle sum property) and c10_math_cbse_06_002 (similarity.',
          misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.',
          parts: [
                { id: 'a', prompt: 'In ΔXYZ and ΔLMN, ∠X = 40°, ∠Y = 80°, ∠L = 40°, ∠M = 80°. State the similarity criterion used and write the correct similarity statement with vertex.', answer: 'Correct answer: By AA criterion, ΔXYZ ~ ΔLMN (with X↔L, Y↔M, Z↔N)',
                  options: ['Correct answer: By AA criterion, ΔXYZ ~ ΔLMN (with X↔L, Y↔M, Z↔N)', 'ΔXYZ ~ ΔLNM'],
                  hint: 'Revisit c7_math_ch07_007 (angle sum property) and c10_math_cbse_06_002 (similarity notation and.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' },
                { id: 'b', prompt: 'A student claims: "In ΔABC and ΔDEF, ∠A = ∠D and ∠B = ∠E. But we cannot say the triangles are similar because we haven\'t checked ∠C and ∠F." Explain why this.', answer: 'Correct explanation: In any triangle, sum of angles = 180°',
                  options: ['Correct explanation: In any triangle, sum of angles = 180°', 'we need to measure ∠C and ∠F'],
                  hint: 'Revisit c7_math_ch07_007 (angle sum property) and c10_math_cbse_06_002 (similarity notation and.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' },
                { id: 'c', prompt: 'In ΔPQR, ∠P = 55°, ∠Q = 65°. In ΔSTU, ∠S = 55°, ∠T = 70°. Are the triangles similar? Show all steps.', answer: 'Step 1: Find third angle in ΔPQR: ∠R = 180° – (55° + 65°) = 60°',
                  options: ['Step 1: Find third angle in ΔPQR: ∠R = 180° – (55° + 65°) = 60°', 'Yes, because ∠P = ∠S = 55°', 'one equal angle is enough'],
                  hint: 'Revisit c7_math_ch07_007 (angle sum property) and c10_math_cbse_06_002 (similarity notation and.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' },
                { id: 'd', prompt: 'ΔABC ~ ΔDEF by AA criterion. ∠A = 3x + 10°, ∠D = 70°, ∠B = 2x + 20°, ∠E = 50°. Find x and all angles of both triangles.', answer: 'Step 1: By AA, corresponding angles are equal: ∠A = ∠D and ∠B = ∠E',
                  options: ['Step 1: By AA, corresponding angles are equal: ∠A = ∠D and ∠B = ∠E', 'the vertex order given (A↔D, B↔E) is correct without verifying both pairs match'],
                  hint: 'Revisit c7_math_ch07_007 (angle sum property) and c10_math_cbse_06_002 (similarity notation and.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' }
          ],
            remediations: { 'students-write-abc-def-without': { steps: ['If student writes wrong vertex correspondence: 1) Have them list the equal angle pairs explicitly (∠A = ∠D, ∠B = ∠E).', '2) Write vertices in order of equal angles: first triangle A-B-C, second triangle D-E-F.', '3) Stress: "The order of letters in ~ statement MUST show which angle equals which." If student thinks AAA needs three.', '3) Say: "The third angle is NOT free — it\'s forced.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_006', difficulty: 'standard',
          question: 'The SSS (Side-Side-Side) Similarity Criterion states that if the three sides.',
          hint: 'Review equivalent ratios and proportion (c6_math_ch06_063) and the definition.',
          misconception: '**The "Two Ratios Are Enough" Error:** Students frequently check only two pairs of sides (e.g., AB/DE = BC/EF) and.',
          parts: [
                { id: 'a', prompt: 'Two triangles have side lengths 6 cm, 8 cm, 10 cm and 9 cm, 12 cm, 15 cm.', answer: '**Correct Answer:** The student is **incorrect**',
                  options: ['**Correct Answer:** The student is **incorrect**', 'not equal', 'not similar'],
                  hint: 'Review equivalent ratios and proportion (c6_math_ch06_063) and the definition of similarity with.',
                  misconception: '**The "Two Ratios Are Enough" Error:** Students frequently check only two pairs of sides (e.g., AB/DE = BC/EF) and assume the third pair.' }
          ],
            remediations: { 'the-two-ratios-are-enough': { steps: ['**Concrete Measurement Activity:** Give the student two paper triangles (e.g., 3-4-5 and 6-8-10).', 'Have them measure all sides with a ruler, compute all three ratios, and see they are equal.', 'Then give a non-similar pair (3-4-5 and 5-6-7) and show ratios differ.', '**Correspondence Drill:** Provide 5 pairs of triangles with side lengths jumbled.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
