import type { SimDef } from '../../engine/types';
import C10_MathematicsTrianglesSim from '../../../simulations/c6_12/C10_MathematicsTrianglesSim';

/** v3 wrapped master — C10_MathematicsTrianglesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicstrianglessim: SimDef = {
    id: 'v3w_c10_mathematicstrianglessim',
    title: 'Similar Figures vs Congruent Figures: Distinction',
    subtitle: 'This node covers the distinction between similar and congruent figures for all plane.',
    classLevel: 10, subject: 'mathematics', topic: 'Similar Figures vs Congruent Figures: Distinction',
    chapters: [],
    nodeIds: ['c10_math_cbse_06_001', 'c10_math_cbse_06_002', 'c10_math_cbse_06_003', 'c10_math_cbse_06_004', 'c10_math_cbse_06_005', 'c10_math_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you have two photographs of the Taj Mahal — one printed on a 10 cm × 15 cm postcard and another.', goal: 'Master Similar Figures vs Congruent Figures: Distinction.' },
    discovery: {
        question: 'Analyze the following statement: "If two triangles are similar, then their corresponding medians are in the same ratio as their corresponding sides." Is this.',
        options: ['**Correct answer:** Always true', 'sometimes true', 'never true'],
        answer: '**Correct answer:** Always true',
        hook: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with.',
    },
    teaching: [
        { title: 'Two figures are **similar** if they have the.', text: 'Two figures are **similar** if they have the same shape but not necessarily the same size; corresponding angles are equal and corresponding sides are in proportion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_001', title: 'Two figures are **similar** if they.',
          scaffold: { problem: '** A rectangular playground in a school measures 40 m × 30 m. The school management wants to create a scale model for the display board.',
            steps: [
            { text: 'Identify given values. Actual playground length = 40 m, breadth = 30 m. Scale: 1 cm on model = 4 m actual.' },
            { text: 'Convert actual dimensions to model dimensions using the scale. Model length = 40 m ÷ 4 m/cm = 10 cm.' },
            { text: 'Check corresponding angles. Both actual playground and model are rectangles → all angles = 90°.' },
            { text: 'Check corresponding sides for proportionality. Length ratio = 40 m / 10 cm = 4000 cm / 10 cm = 400.' },
            { text: 'Conclude. Since corresponding angles are equal AND corresponding sides are proportional (scale factor 400), the actual.', faded: true, blankAnswer: '** Model dimensions: 10 cm × 7.5 cm. The playground and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_002', title: 'Two triangles are said to be similar if.',
          scaffold: { problem: 'A triangular traffic sign board has angles 40°, 60°, and 80°. A larger version is made for a highway with angles 40°, 60°, and 80°.',
            steps: [
            { text: 'Verify the triangles are similar by AAA — both have angles 40°, 60°, 80°.' },
            { text: 'Identify corresponding sides. The smallest side (opposite 40°) corresponds: 30 cm ↔ 75 cm.' },
            { text: 'Calculate the similarity ratio (scale factor) = corresponding side of highway / corresponding side of original = 75/30.' },
            { text: 'Find the other sides of highway sign: Medium side = 45 × 2.5 = 112.5 cm. Largest side = 54 × 2.5 = 135 cm.' },
            { text: 'Verify proportionality: 30/75 = 45/112.5 = 54/135 = 2/5 = 0.4. All ratios equal, confirming similarity.', faded: true, blankAnswer: 'The highway sign\'s other two sides are 112.5 cm and 135 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_003', title: 'If a line is drawn parallel to one side.',
          scaffold: { problem: 'A triangular plot of land ΔPQR has a boundary PQ = 20 m. A farmer wants to build a fence ST parallel to QR, with S on PQ and T on PR.',
            steps: [
            { text: 'Identify the given: In ΔPQR, ST || QR. PS = 8 m, SQ = 12 m, PT = 10 m, QR = 15 m. Need TR and ST.' },
            { text: 'Apply BPT: PS/SQ = PT/TR → 8/12 = 10/TR.' },
            { text: 'Simplify and solve for TR: 8/12 = 2/3. So 2/3 = 10/TR → cross-multiply: 2 × TR = 3 × 10 → 2TR = 30 → TR = 15 m.' },
            { text: 'Find ST using similarity (ΔPST ~ ΔPQR): PS/PQ = ST/QR. PQ = PS + SQ = 8 + 12 = 20 m.' },
            { text: 'Verify: PS/SQ = 8/12 = 2/3, PT/TR = 10/15 = 2/3 ✓. ST = 6 m, QR = 15 m, ratio 6/15 = 2/5 = PS/PQ ✓.', faded: true, blankAnswer: 'TR = 15 m, Fence length ST = 6 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_004', title: 'The Converse of Basic Proportionality.',
          scaffold: { problem: 'In ΔPQR, points S and T lie on sides PQ and PR respectively. PS = 6 cm, SQ = 9 cm, PT = 8 cm, TR = 12 cm.',
            steps: [
            { text: 'Write the given data clearly: In ΔPQR, S lies on PQ, T lies on PR. PS = 6 cm, SQ = 9 cm, PT = 8 cm, TR = 12 cm.' },
            { text: 'Compute the ratios PS/SQ and PT/TR. PS/SQ = 6/9 = 2/3. PT/TR = 8/12 = 2/3.' },
            { text: 'State the observation: PS/SQ = PT/TR = 2/3. Note that S lies on segment PQ and T lies on segment PR (internal division).' },
            { text: 'Invoke the Converse of Basic Proportionality Theorem: If a line divides two sides of a triangle in the same ratio, then.' },
            { text: 'Conclude: Therefore, ST ∥ QR. (Hence proved.)', faded: true, blankAnswer: 'ST ∥ QR (proved using Converse of BPT)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_005', title: 'The AAA (Angle-Angle-Angle) criterion.',
          scaffold: { problem: 'A 1.5 m tall girl stands 3 m away from a lamppost and casts a shadow of 4.5 m on the ground.',
            steps: [
            { text: 'Draw two right triangles: ΔGirl (vertical = girl\'s height 1.5 m, horizontal = shadow 4.5 m) and ΔLamppost (vertical =.' },
            { text: 'Identify equal angles: Both triangles have a right angle (vertical ⊥ horizontal).' },
            { text: 'By AA criterion (right angle + equal sun elevation angle), ΔGirl ~ ΔLamppost.' },
            { text: 'Set up proportion of corresponding sides: Height of girl / Height of lamppost = Shadow of girl / Shadow of lamppost →.' },
            { text: 'Solve: 1.5 × 7.5 = 4.5 × h → 11.25 = 4.5h → h = 11.25 / 4.5 = 2.5 m.', faded: true, blankAnswer: 'Height of lamppost = 2.5 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_006', title: 'The SSS (Side-Side-Side) Similarity.',
          scaffold: { problem: 'A triangular traffic sign has sides 60 cm, 80 cm, and 100 cm. A miniature model of the sign is made for a toy set.',
            steps: [
            { text: 'Identify given data. Actual sign sides: 60 cm, 80 cm, 100 cm. Model shortest side = 3 cm.' },
            { text: 'Determine the scale factor (ratio of corresponding sides). Scale factor = Model side / Actual side = 3 cm / 60 cm =.' },
            { text: 'Compute the other two model sides using the same scale factor. Second side = 80 cm × (1/20) = 4 cm.' },
            { text: 'Verify SSS similarity by checking all three ratios. Ratio1 = 3/60 = 1/20. Ratio2 = 4/80 = 1/20. Ratio3 = 5/100 = 1/20.' },
            { text: 'Conclude similarity and state answer. Since all three pairs of corresponding sides are proportional (ratio 1:20), the.', faded: true, blankAnswer: 'The other two sides of the model are 4 cm and 5 cm. The.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Similar Figures vs Congruent Figures: Distinction', spots: [
            { id: 's1', label: 'Two figures are similar if', prompt: 'Which idea is this? — Two figures are **similar** if they have the same shape but not necessarily the same.', answer: 'Two figures are similar if', options: ['Two figures are similar if', 'Two triangles are said to', 'If a line is drawn', 'The Converse of Basic Proportionality'] },
            { id: 's2', label: 'Two triangles are said to', prompt: 'Which idea is this? — Two triangles are said to be similar if their corresponding angles are equal and their.', answer: 'Two triangles are said to', options: ['Two triangles are said to', 'Two figures are similar if', 'If a line is drawn', 'The Converse of Basic Proportionality'] },
            { id: 's3', label: 'If a line is drawn', prompt: 'Which idea is this? — If a line is drawn parallel to one side of a triangle intersecting the other two sides at.', answer: 'If a line is drawn', options: ['If a line is drawn', 'Two figures are similar if', 'Two triangles are said to', 'The Converse of Basic Proportionality'] },
            { id: 's4', label: 'The Converse of Basic Proportionality', prompt: 'Which idea is this? — The Converse of Basic Proportionality Theorem states: If a line divides any two sides of.', answer: 'The Converse of Basic Proportionality', options: ['The Converse of Basic Proportionality', 'Two figures are similar if', 'Two triangles are said to', 'If a line is drawn'] },
            { id: 's5', label: 'The AAA Angle-Angle-Angle criterion states', prompt: 'Which idea is this? — The AAA (Angle-Angle-Angle) criterion states that if in two triangles, the corresponding.', answer: 'The AAA Angle-Angle-Angle criterion states', options: ['The AAA Angle-Angle-Angle criterion states', 'Two figures are similar if', 'Two triangles are said to', 'If a line is drawn'] },
            { id: 's6', label: 'The SSS Side-Side-Side Similarity Criterion', prompt: 'Which idea is this? — The SSS (Side-Side-Side) Similarity Criterion states that if the three sides of one.', answer: 'The SSS Side-Side-Side Similarity Criterion', options: ['The SSS Side-Side-Side Similarity Criterion', 'Two figures are similar if', 'Two triangles are said to', 'If a line is drawn'] }
          ] } }
    ],
    explore: { component: C10_MathematicsTrianglesSim, prompt: 'Explore the interactive — Similar Figures vs Congruent Figures: Distinction' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_06_001', difficulty: 'standard',
          question: 'Two figures are **similar** if they have the same shape but not necessarily the.',
          hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice.',
          misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with.',
          parts: [
                { id: 'a', prompt: 'State the precise mathematical condition that distinguishes congruent figures from similar figures.', answer: '**Correct answer:** In congruent figures, corresponding angles are equal AND',
                  options: ['**Correct answer:** In congruent figures, corresponding angles are equal AND', 'congruent means same shape, similar means same shape but different size'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' },
                { id: 'b', prompt: 'Two squares have side lengths 5 cm and 10 cm. A student claims: "These squares are congruent because all squares have 90° angles, so their corresponding angles.', answer: '**Correct answer:** The student is incorrect',
                  options: ['**Correct answer:** The student is incorrect', 'same shape'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' },
                { id: 'c', prompt: 'Analyze the following statement: "If two triangles are similar, then their corresponding medians are in the same ratio as their corresponding sides." Is this.', answer: '**Correct answer:** Always true',
                  options: ['**Correct answer:** Always true', 'sometimes true', 'never true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' }
          ],
            remediations: { 'misconception-if-two-figures-have': { steps: ['**Concrete demonstration:** Give the student two rectangular sheets of paper — one A4 (21 cm × 29.7 cm) and one A3.', 'Ask: "Can you place the A4 exactly on top of the A3 so every corner and edge matches?" (No — sizes differ).', '"Are the angles the same?" (Yes, all 90°).', '"So what are they?" (Similar, scale factor √2).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with.',
          parts: [
                { id: 'a', prompt: 'A Class 10 student writes the following solution to a board exam question: *Question:* "Prove that two circles with radii 3 cm and 5 cm are similar.".', answer: '**Correct answer:** The solution would NOT receive full marks',
                  options: ['**Correct answer:** The solution would NOT receive full marks', 'this is sufficient, they don\'t understand CBSE marking scheme expectations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If two figures have the same shape, they are congruent." Students often equate "same shape" with congruence, ignoring.' }
          ],
            remediations: { 'misconception-if-two-figures-have': { steps: ['**Concrete demonstration:** Give the student two rectangular sheets of paper — one A4 (21 cm × 29.7 cm) and one A3.', 'Ask: "Can you place the A4 exactly on top of the A3 so every corner and edge matches?" (No — sizes differ).', '"Are the angles the same?" (Yes, all 90°).', '"So what are they?" (Similar, scale factor √2).'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_002', difficulty: 'standard',
          question: 'Two triangles are said to be similar if their corresponding angles are equal.',
          hint: 'Review Class 7 node c7_math_ch09_010 (Why AAA is not a congruence criterion) and Class 7.',
          misconception: 'Students write similarity statements with incorrect vertex ordering, e.g., given ΔABC ~ ΔDEF with ∠A=∠D, ∠B=∠E, ∠C=∠F,.',
          parts: [
                { id: 'a', prompt: 'In Class 7 you learned AAA is NOT a congruence criterion (triangles with same angles can be different sizes).', answer: 'Congruence requires both shape AND size to be identical (all sides equal)',
                  options: ['Congruence requires both shape AND size to be identical (all sides equal)', 'AAA proves triangles are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write similarity statements with incorrect vertex ordering, e.g., given ΔABC ~ ΔDEF with ∠A=∠D, ∠B=∠E, ∠C=∠F, they write ΔABC ~.' }
          ],
            remediations: { 'students-write-similarity-statements-with': { steps: ['Have the student physically label angles with colored arcs on both triangles (red for ∠A/∠D, blue for ∠B/∠E, green for.', 'Write the similarity statement by listing vertices in the SAME color order: first red vertex, then blue, then green.', 'Verify by checking that the first vertex in first triangle corresponds to first in second, etc.', 'Practice with 5 examples where triangles are drawn in different orientations (rotated, reflected) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write similarity statements with incorrect vertex ordering, e.g., given ΔABC ~ ΔDEF with ∠A=∠D, ∠B=∠E, ∠C=∠F,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If two triangles have two pairs of equal angles, they are similar by AAA criterion." Evaluate this statement.', answer: 'The statement is partially correct but imprecisely worded',
                  options: ['The statement is partially correct but imprecisely worded', 'fully correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write similarity statements with incorrect vertex ordering, e.g., given ΔABC ~ ΔDEF with ∠A=∠D, ∠B=∠E, ∠C=∠F, they write ΔABC ~.' }
          ],
            remediations: { 'students-write-similarity-statements-with': { steps: ['Have the student physically label angles with colored arcs on both triangles (red for ∠A/∠D, blue for ∠B/∠E, green for.', 'Write the similarity statement by listing vertices in the SAME color order: first red vertex, then blue, then green.', 'Verify by checking that the first vertex in first triangle corresponds to first in second, etc.', 'Practice with 5 examples where triangles are drawn in different orientations (rotated, reflected) to reinforce that.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_003', difficulty: 'standard',
          question: 'If a line is drawn parallel to one side of a triangle intersecting the other.',
          hint: 'If stuck, revisit c6_math_ch06_063 (proportion and cross-multiplication) and.',
          misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR, a line ST is drawn intersecting PQ at S and PR at T. A student writes PS/SQ = PT/TR and claims BPT applies.', answer: 'The student must verify that ST || QR',
                  options: ['The student must verify that ST || QR', 'triangle must be similar', 'angles must be equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' },
                { id: 'b', prompt: 'In ΔXYZ, line PQ intersects XY at P and XZ at Q. Given XP = 3 cm, PY = 6 cm, XQ = 4 cm, QZ = 8 cm. Can you conclude PQ || YZ?', answer: 'Yes, PQ || YZ',
                  options: ['Yes, PQ || YZ', 'cannot conclude without converse theorem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' }
          ],
            remediations: { 'students-write-ad-ab-ae': { steps: ['If a student uses AD/AB = AE/AC, clarify: "Both formulas work for internal division because of componendo, but AD/DB =.', '2) Measure AD, DB, AE, EC.', '3) Show AD/DB ≠ AE/EC numerically.', '4) Revisit the area proof: "ΔBDE and ΔDEC have equal area ONLY because they lie between parallels DE and BC.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the.',
          parts: [
                { id: 'a', prompt: 'In ΔXYZ, line PQ intersects XY at P and XZ at Q. Given XP = 3 cm, PY = 6 cm, XQ = 4 cm, QZ = 8 cm. Can you conclude PQ || YZ?', answer: 'Yes, PQ || YZ',
                  options: ['Yes, PQ || YZ', 'cannot conclude without converse theorem'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write AD/AB = AE/AC instead of AD/DB = AE/EC. They confuse the internal division ratio (part-to-part) with the whole-side ratio.' }
          ],
            remediations: { 'students-write-ad-ab-ae': { steps: ['If a student uses AD/AB = AE/AC, clarify: "Both formulas work for internal division because of componendo, but AD/DB =.', '2) Measure AD, DB, AE, EC.', '3) Show AD/DB ≠ AE/EC numerically.', '4) Revisit the area proof: "ΔBDE and ΔDEC have equal area ONLY because they lie between parallels DE and BC.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_004', difficulty: 'standard',
          question: 'The Converse of Basic Proportionality Theorem states: If a line divides any two.',
          hint: 'If stuck, revisit c10_math_cbse_06_003 (BPT statement and proof) and c6_math_ch06_063.',
          misconception: 'Students confuse the Converse of BPT with BPT itself. The exact wrong step: In a problem where they are given AD/DB =.',
          parts: [
                { id: 'a', prompt: 'In ΔABC, points D and E lie on AB and AC respectively. AD = 4 cm, DB = 6 cm, AE = 5 cm, EC = 7.5 cm.', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'internal division'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse the Converse of BPT with BPT itself. The exact wrong step: In a problem where they are given AD/DB = AE/EC and asked to.' }
          ],
            remediations: { 'students-confuse-the-converse-of': { steps: ['Draw two triangles side by side. Label one "BPT: Given DE ∥ BC → Prove AD/DB = AE/EC".', 'Make them say aloud: "Parallel gives ratio" vs "Ratio gives parallel".', 'Give 5 mixed problems — some with "Given parallel", some with "Given ratio" — and have them identify which theorem to.', 'For the external division error, draw a triangle with D on AB extended. Ask: "Is D on side AB?" No.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_005', difficulty: 'standard',
          question: 'The AAA (Angle-Angle-Angle) criterion states that if in two triangles, the.',
          hint: 'Revisit c7_math_ch07_007 (angle sum property) and c10_math_cbse_06_002 (similarity.',
          misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.',
          parts: [
                { id: 'a', prompt: 'In ΔXYZ and ΔLMN, ∠X = 40°, ∠Y = 80°, ∠L = 40°, ∠M = 80°. State the similarity criterion used and write the correct similarity statement with vertex.', answer: 'By AA criterion, ΔXYZ ~ ΔLMN (with X↔L, Y↔M, Z↔N)',
                  options: ['Correct answer: By AA criterion, ΔXYZ ~ ΔLMN (with X↔L, Y↔M, Z↔N)', 'ΔXYZ ~ ΔLNM'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' },
                { id: 'b', prompt: 'A student claims: "In ΔABC and ΔDEF, ∠A = ∠D and ∠B = ∠E. But we cannot say the triangles are similar because we haven\'t checked ∠C and ∠F." Explain why this.', answer: 'Correct explanation: In any triangle, sum of angles = 180°',
                  options: ['Correct explanation: In any triangle, sum of angles = 180°', 'we need to measure ∠C and ∠F'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' },
                { id: 'c', prompt: 'In ΔPQR, ∠P = 55°, ∠Q = 65°. In ΔSTU, ∠S = 55°, ∠T = 70°. Are the triangles similar? Show all steps.', answer: 'Step 1: Find third angle in ΔPQR: ∠R = 180° – (55° + 65°) = 60°',
                  options: ['Step 1: Find third angle in ΔPQR: ∠R = 180° – (55° + 65°) = 60°', 'Yes, because ∠P = ∠S = 55°', 'one equal angle is enough'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' }
          ],
            remediations: { 'students-write-abc-def-without': { steps: ['If student writes wrong vertex correspondence: 1) Have them list the equal angle pairs explicitly (∠A = ∠D, ∠B = ∠E).', '2) Write vertices in order of equal angles: first triangle A-B-C, second triangle D-E-F.', '3) Stress: "The order of letters in ~ statement MUST show which angle equals which." If student thinks AAA needs three.', '3) Say: "The third angle is NOT free — it\'s forced.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.',
          parts: [
                { id: 'a', prompt: 'A student solves: "In ΔABC and ΔPQR, ∠A = 60°, ∠B = 50°, ∠P = 60°, ∠Q = 70°.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'the solution is correct', 'one equal angle implies similarity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "ΔABC ~ ΔDEF" without ensuring vertex correspondence matches equal angles.' }
          ],
            remediations: { 'students-write-abc-def-without': { steps: ['If student writes wrong vertex correspondence: 1) Have them list the equal angle pairs explicitly (∠A = ∠D, ∠B = ∠E).', '2) Write vertices in order of equal angles: first triangle A-B-C, second triangle D-E-F.', '3) Stress: "The order of letters in ~ statement MUST show which angle equals which." If student thinks AAA needs three.', '3) Say: "The third angle is NOT free — it\'s forced.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_006', difficulty: 'standard',
          question: 'The SSS (Side-Side-Side) Similarity Criterion states that if the three sides of.',
          hint: 'Review equivalent ratios and proportion (c6_math_ch06_063) and the definition of.',
          misconception: '**The "Two Ratios Are Enough" Error:** Students frequently check only two pairs of sides (e.g., AB/DE = BC/EF) and.',
          parts: [
                { id: 'a', prompt: 'Two triangles have side lengths 6 cm, 8 cm, 10 cm and 9 cm, 12 cm, 15 cm.', answer: '**Correct Answer:** The student is **incorrect**',
                  options: ['**Correct Answer:** The student is **incorrect**', 'not equal', 'not similar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Two Ratios Are Enough" Error:** Students frequently check only two pairs of sides (e.g., AB/DE = BC/EF) and assume the third pair.' }
          ],
            remediations: { 'the-two-ratios-are-enough': { steps: ['**Concrete Measurement Activity:** Give the student two paper triangles (e.g., 3-4-5 and 6-8-10).', 'Have them measure all sides with a ruler, compute all three ratios, and see they are equal.', 'Then give a non-similar pair (3-4-5 and 5-6-7) and show ratios differ.', '**Correspondence Drill:** Provide 5 pairs of triangles with side lengths jumbled.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
