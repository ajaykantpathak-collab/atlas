import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch06_p2: SimDef = {
    id: 'v3_c10_math_ch06_p2',
    title: 'Triangles · Part 2/2',
    subtitle: 'Measure a tower you\'ll never climb — using only its shadow',
    classLevel: 10, subject: 'mathematics', topic: 'Triangles · Part 2/2',
    chapters: ['c10_math_ch06'],
    nodeIds: ['c10_math_cbse_06_007', 'c10_math_cbse_06_008', 'c10_math_cbse_06_009', 'c10_math_cbse_06_010', 'c10_math_cbse_06_011', 'c10_math_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a surveyor with only a stick and sunlight', intro: 'You can\'t climb the tower, but its shadow is lying right there on the ground. If you can prove your stick\'s triangle is similar to the tower\'s, one proportion does the measuring for you.', goal: 'Distinguish similar from congruent, apply similarity criteria to prove triangle relationships, and use them to solve real measurement problems.' },
    discovery: {
        question: 'Your photo on a passport, on a stamp and on a billboard — same face, wildly different sizes. A geometry teacher calls all three \'similar.\' Your friend insists only same-sized figures can \'match.\' Who\'s using the word correctly?',
        options: ['The teacher — similar means same shape (equal angles, proportional sides); same size makes them congruent, a special case of similar', 'The friend — similar always meant identical in maths', 'Both — similar and congruent are synonyms in geometry', 'Neither — photos can\'t be studied geometrically'],
        answer: 'The teacher — similar means same shape (equal angles, proportional sides); same size makes them congruent, a special case of similar',
        hook: 'Congruent is just similar with a zoom of exactly 1×. Every scaled map, blueprint and film projection runs on similarity — same angles, stretched sides.',
    },
    teaching: [
        { title: 'Criteria for Similarity: SAS Criterion', text: 'The SAS (Side-Angle-Side) similarity criterion states that if one angle of a triangle is equal to one angle of another triangle and the sides including these angles are in the same proportion, then.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_06_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Prove triangles similar using AA, SSS and SAS tests, then weaponise the result: measure a tower\'s height from its shadow and dissect why Pythagoras falls out of similarity.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_007', title: 'Criteria for Similarity: SAS Criterion',
          scaffold: { problem: 'A vertical pole of height 2.5 m casts a shadow 1.2 m long on the ground. At the same time, a tower casts a shadow 48 m long.',
            steps: [
            { text: 'Identify the two right triangles: Triangle 1 formed by the pole (vertical), its shadow (horizontal), and the sun ray.' },
            { text: 'Verify SAS similarity: In both triangles, the included angle (angle of elevation) is equal.' },
            { text: 'Set up proportion: 2.5 / h = 1.2 / 48, where h = height of tower in metres.' },
            { text: 'Cross-multiply: 2.5 × 48 = 1.2 × h → 120 = 1.2h → h = 120 / 1.2 = 100.' },
            { text: 'Interpret: The tower is 100 m high. Check: scale factor = 48/1.2 = 40; 2.5 × 40 = 100. Correct.', faded: true, blankAnswer: '100 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_008', title: 'Areas of Similar Triangles: Ratio of Areas Theorem',
          scaffold: { problem: 'Two triangular fields are similar. The sides of the smaller field are 30 m, 40 m, and 50 m. Its area is 600 m².',
            steps: [
            { text: 'Identify the given information. Smaller triangle sides: 30, 40, 50 m. Area = 600 m².' },
            { text: 'Determine the scale factor using corresponding sides. The longest side of the smaller triangle is 50 m.' },
            { text: 'Apply the Ratio of Areas Theorem: Area ratio = (side ratio)² = (3/2)² = 9/4.' },
            { text: 'Compute the larger area: Area_larger = Area_smaller × (9/4) = 600 × 9/4 = 150 × 9 = 1350 m².' },
            { text: 'Verify: The larger triangle sides would be 45 m, 60 m, 75 m (multiplying by 1.5).', faded: true, blankAnswer: '1350 m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_009', title: 'Pythagoras Theorem: Proof Using Similarity',
          scaffold: { problem: 'In right triangle ABC, right-angled at B, BD is drawn perpendicular to AC. Prove that AB² + BC² = AC² using similarity of triangles.',
            steps: [
            { text: 'Draw the figure. Label triangle ABC with ∠B = 90°. Draw BD ⟂ AC meeting AC at D.' },
            { text: 'Prove ΔADB ~ ΔABC using AA criterion. ∠A is common. ∠ADB = ∠ABC = 90°. Therefore ΔADB ~ ΔABC (AA).' },
            { text: 'Write the proportion from similarity: AB/AC = AD/AB (hypotenuse/hypotenuse = side adjacent to ∠A / side adjacent.' },
            { text: 'Prove ΔBDC ~ ΔABC using AA criterion. ∠C is common. ∠BDC = ∠ABC = 90°. Therefore ΔBDC ~ ΔABC (AA).' },
            { text: 'Write the proportion: BC/AC = DC/BC (hypotenuse/hypotenuse = side adjacent to ∠C / side adjacent to ∠C).' },
            { text: 'Add Equation 1 and Equation 2: AB² + BC² = AC × AD + AC × DC = AC(AD + DC) = AC × AC = AC². Hence AB² + BC² = AC².', faded: true, blankAnswer: 'AB² + BC² = AC² (proved)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_010', title: 'Converse of Pythagoras Theorem',
          scaffold: { problem: 'A farmer has a triangular plot with sides 20 m, 21 m, and 29 m.',
            steps: [
            { text: 'Identify the three sides: 20 m, 21 m, 29 m. The longest side is 29 m.' },
            { text: 'Write the condition for converse of Pythagoras theorem: (longest side)² = (side₁)² + (side₂)².' },
            { text: 'Compute the squares: 29² = 841, 20² = 400, 21² = 441.' },
            { text: 'Sum the squares of the two shorter sides: 400 + 441 = 841.' },
            { text: 'Compare: 841 = 841. Since the square of the longest side equals the sum of squares of the other two sides, by the.', faded: true, blankAnswer: 'Yes, the corner is right-angled (90°).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_011', title: 'Applications of Pythagoras Theorem in Problems',
          scaffold: { problem: 'A 10 m long ladder is placed against a vertical wall such that its foot is 6 m away from the wall.',
            steps: [
            { text: 'Draw a right triangle with wall as vertical leg (height \\(h\\)), ground as horizontal leg (distance \\(d\\)), and ladder.' },
            { text: 'First situation: \\(d = 6\\) m. Apply Pythagoras: \\(h^2 + 6^2 = 10^2\\).' },
            { text: 'Compute \\(h^2 = 100 - 36 = 64\\). Take square root: \\(h = 8\\) m (positive root only).' },
            { text: 'Second situation: foot moved 2 m closer → new \\(d\' = 6 - 2 = 4\\) m. Apply Pythagoras again: \\(h\'^2 + 4^2 = 10^2\\).' },
            { text: 'Compute \\(h\'^2 = 100 - 16 = 84\\). \\(h\' = \\sqrt{84} = \\sqrt{4 \\times 21} = 2\\sqrt{21} \\approx 9.165\\) m.' },
            { text: 'Increase in height = \\(h\' - h = 9.165 - 8 = 1.165\\) m (approx).', faded: true, blankAnswer: 'Initially 8 m; after moving, approximately 9.165.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_06_012', title: 'Proving Ratios Using BPT and Similarity Criteria',
          scaffold: { problem: 'In ΔABC, D and E are points on AB and AC such that DE || BC. If AD = 3 cm, DB = 5 cm, and AE = 4.5 cm, find EC.',
            steps: [
            { text: 'Identify given: DE || BC, AD = 3 cm, DB = 5 cm, AE = 4.5 cm. Need to find EC and prove AD/AB = AE/AC.' },
            { text: 'Apply BPT: Since DE || BC, AD/DB = AE/EC.' },
            { text: 'Substitute values: 3/5 = 4.5/EC → EC = (4.5 × 5)/3 = 7.5 cm.' },
            { text: 'Compute AB = AD + DB = 3 + 5 = 8 cm; AC = AE + EC = 4.5 + 7.5 = 12 cm.' },
            { text: 'AD/AB = 3/8 = 0.375; AE/AC = 4.5/12 = 0.375. Hence AD/AB = AE/AC.', faded: true, blankAnswer: 'EC = 7.5 cm, and AD/AB = AE/AC = 3/8.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_06_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student enlarges a 4 cm × 6 cm photo to 8 cm × 12 cm for a poster. His friend says, \'Same picture, same shape — the two photos are congruent, just one is bigger.\'',
            decisions: [{ prompt: 'What is the precise relationship between the two photos?', options: [
                { text: 'They are similar, not congruent — corresponding angles are equal and every side doubled, so the shape is preserved at scale factor 2. Congruence demands corresponding sides be equal in length, which fails the moment the enlargement happens; \'same shape\' alone gives similarity, and \'same shape and same size\' is what congruence requires.', outcome: 'This is the classic trap: equal angles and proportional sides define similarity; congruence additionally demands the sides actually match — no scaling allowed.' },
                { text: 'The friend is right — same shape is exactly what congruent means, so the photos are congruent.', outcome: 'Same shape with different size is similarity; congruence also requires equal corresponding sides — an enlargement can never be congruent to the original.', reveals: 'similar-equals-congruent' },
                { text: 'The photos are neither similar nor congruent, since changing the size changes the figure completely.', outcome: 'Doubling every side keeps all angles and all ratios — the very definition of similar figures.', reveals: 'resize-breaks-similarity' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'Similarity is why a 1-cm map can describe a 1-km city honestly. Keep the angles, scale the sides, and the shape survives every zoom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_06_007', difficulty: 'standard',
          question: 'The SAS (Side-Angle-Side) similarity criterion states that if one angle of.',
          hint: 'If stuck, revisit Class 6 Ratio and Proportion (c6_math_ch06_063) for proportion basics.',
          misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.',
          parts: [
                { id: 'a', prompt: 'In ΔPQR and ΔXYZ, ∠Q = ∠Y = 50°. The sides are PQ = 6 cm, QR = 8 cm, XY = 9 cm, YZ = 12 cm.', answer: 'Correct answer: The student is INCORRECT',
                  options: ['Correct answer: The student is INCORRECT', 'including', 'the sides must be equal, not proportional'],
                  hint: 'If stuck, revisit Class 6 Ratio and Proportion (c6_math_ch06_063) for proportion basics and Class 7.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' },
                { id: 'b', prompt: 'ΔABC has AB = 4 cm, AC = 6 cm, and ∠A = 40°. ΔDEF has DE = 6 cm, DF = 9 cm, and ∠D = 40°. Are the triangles similar? If yes, find BC if EF = 7.5 cm.', answer: 'Correct answer: Yes, ΔABC ~ ΔDEF by SAS',
                  options: ['Correct answer: Yes, ΔABC ~ ΔDEF by SAS', 'the sides must be equal, not proportional'],
                  hint: 'If stuck, revisit Class 6 Ratio and Proportion (c6_math_ch06_063) for proportion basics and Class 7.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' },
                { id: 'c', prompt: 'Two triangles have two pairs of sides proportional: AB/DE = AC/DF = 3/4. The angles given are ∠B = ∠E = 50°. Can you conclude the triangles are similar by SAS?', answer: 'Correct answer: No, you cannot conclude similarity by SAS',
                  options: ['Correct answer: No, you cannot conclude similarity by SAS', 'included angle', 'the sides must be equal, not proportional'],
                  hint: 'If stuck, revisit Class 6 Ratio and Proportion (c6_math_ch06_063) for proportion basics and Class 7.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' }
          ],
            remediations: { 'students-often-confuse-sas-similarity': { steps: ['If a student makes the "non-included angle" error: (1) Draw two triangles with the same two side lengths but different.', '(2) Label the sides and angle clearly: "The angle MUST be the one BETWEEN the two sides you are comparing." (3).', '(4) Use a colour-coding technique: highlight the angle in red, the two sides in blue.', 'Only if the red angle sits between the two blue sides in BOTH triangles can you use SAS.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "In ΔABC and ΔPQR, AB/PQ = AC/PR = 2/5 and ∠A = ∠P = 30°. If BC = 6 cm, find QR." The student writes: QR = (5/2) × 6 = 15 cm.', answer: 'Correct answer: The student\'s solution is CORRECT',
                  options: ['Correct answer: The student\'s solution is CORRECT', 'the sides must be equal, not proportional'],
                  hint: 'If stuck, revisit Class 6 Ratio and Proportion (c6_math_ch06_063) for proportion basics and Class 7.',
                  misconception: 'Students often confuse SAS similarity with SAS congruence: they think the sides must be equal, not proportional.' }
          ],
            remediations: { 'students-often-confuse-sas-similarity': { steps: ['If a student makes the "non-included angle" error: (1) Draw two triangles with the same two side lengths but different.', '(2) Label the sides and angle clearly: "The angle MUST be the one BETWEEN the two sides you are comparing." (3).', '(4) Use a colour-coding technique: highlight the angle in red, the two sides in blue.', 'Only if the red angle sits between the two blue sides in BOTH triangles can you use SAS.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_008', difficulty: 'standard',
          question: 'The Ratio of Areas Theorem states that if two triangles are similar, then the.',
          hint: 'If stuck, review the similarity criteria (AAA, SSS, SAS) from nodes c10_math_cbse_06_005.',
          misconception: 'The most common error is using the linear ratio (side/altitude/median) directly as the area ratio, i.e., writing.',
          parts: [
                { id: 'a', prompt: 'Two triangles are similar. The ratio of their corresponding altitudes is 2:5. A student claims the ratio of their areas is 2:5. Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'are off by a factor of the scale factor'],
                  hint: 'If stuck, review the similarity criteria (AAA, SSS, SAS) from nodes c10_math_cbse_06_005, 006, 007.',
                  misconception: 'The most common error is using the linear ratio (side/altitude/median) directly as the area ratio, i.e., writing ar(Δ1)/ar(Δ2).' },
                { id: 'b', prompt: 'ΔPQR ~ ΔXYZ. The area of ΔPQR is 36 cm² and the area of ΔXYZ is 81 cm². If the length of side QR is 8 cm, find the length of the corresponding side YZ.', answer: 'Given: ar(ΔPQR) = 36 cm², ar(ΔXYZ) = 81 cm², QR = 8 cm',
                  options: ['Given: ar(ΔPQR) = 36 cm², ar(ΔXYZ) = 81 cm², QR = 8 cm', 'are off by a factor of the scale factor'],
                  hint: 'If stuck, review the similarity criteria (AAA, SSS, SAS) from nodes c10_math_cbse_06_005, 006, 007.',
                  misconception: 'The most common error is using the linear ratio (side/altitude/median) directly as the area ratio, i.e., writing ar(Δ1)/ar(Δ2).' },
                { id: 'c', prompt: 'In ΔABC, DE || BC with D on AB and E on AC. If AD:DB = 2:3 and the area of ΔADE is 16 cm², find the area of ΔABC.', answer: 'Since DE || BC, by BPT, AD/AB = AE/AC = DE/BC',
                  options: ['Since DE || BC, by BPT, AD/AB = AE/AC = DE/BC', 'are off by a factor of the scale factor'],
                  hint: 'If stuck, review the similarity criteria (AAA, SSS, SAS) from nodes c10_math_cbse_06_005, 006, 007.',
                  misconception: 'The most common error is using the linear ratio (side/altitude/median) directly as the area ratio, i.e., writing ar(Δ1)/ar(Δ2).' }
          ],
            remediations: { 'the-most-common-error-is': { steps: ['If a student makes the linear-ratio error, follow these steps: (1) Draw two similar right triangles with legs 3,4 and.', 'Compute their areas (6 and 24).', 'Show the side ratio is 1:2, area ratio is 1:4.', '(2) Ask: "If side ratio is 1:2, why is area ratio 1:4?" Guide them to see area = ½ × base × height, so both base and.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_009', difficulty: 'standard',
          question: 'In a right-angled triangle, if a perpendicular is drawn from the right angle.',
          hint: 'Revisit c10_math_cbse_06_005 (AA criterion) and practice writing similarity statements.',
          misconception: 'Students write the similarity statement as ΔADB ~ ΔBDC (correct) but then set up the proportion AD/BD = BD/DC.',
          parts: [
                { id: 'a', prompt: 'State the three pairs of similar triangles formed when an altitude is drawn from the right angle to the hypotenuse in a right-angled triangle ABC (right-angled.', answer: 'The three similar triangles are: ΔADB ~ ΔABC, ΔBDC ~ ΔABC, and ΔADB ~ ΔBDC',
                  options: ['The three similar triangles are: ΔADB ~ ΔABC, ΔBDC ~ ΔABC, and ΔADB ~ ΔBDC', 'ΔABD ~ ΔBCD without correct vertex order'],
                  hint: 'Revisit c10_math_cbse_06_005 (AA criterion) and practice writing similarity statements for.',
                  misconception: 'Students write the similarity statement as ΔADB ~ ΔBDC (correct) but then set up the proportion AD/BD = BD/DC correctly, yet when proving.' }
          ],
            remediations: { 'students-write-the-similarity-statement': { steps: ['Have the student redraw the three triangles separately, labeling all angles with variables (e.g., ∠A = α, ∠C = 90°-α).', 'Ask them to mark the right angles and the shared angles in each triangle.', 'For each similarity pair, write the angle equality statements explicitly (e.g., "In ΔADB and ΔABC: ∠A = ∠A, ∠ADB = ∠ABC.', 'Only then write the side correspondences: side opposite α, side opposite 90°, side opposite (90°-α).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_010', difficulty: 'standard',
          question: 'In any triangle, if the square of the length of one side is equal to the sum.',
          hint: 'If stuck, revisit c8_math_ch1_1 (square numbers) and c8_math_ch1_8 (square roots) for.',
          misconception: 'Students often apply the formula a² + b² = c² without first identifying which side is the longest (hypotenuse).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In any triangle, if the square of the length of one side is equal to the sum of the',
                  options: ['In any triangle, if the square of the length of one side is equal to the sum of the', 'Two figures are **similar** if they have the same shape but not necessarily the same size', 'Two triangles are said to be similar if their corresponding angles are equal and their', 'If a line is drawn parallel to one side of a triangle intersecting the other two sides at'],
                  hint: 'If stuck, revisit c8_math_ch1_1 (square numbers) and c8_math_ch1_8 (square roots) for computation.',
                  misconception: 'Students often apply the formula a² + b² = c² without first identifying which side is the longest (hypotenuse).' }
          ],
            remediations: { 'students-often-apply-the-formula': { steps: ['If a student cannot identify the longest side, guide them through these steps: 1.', 'Write the three side lengths in ascending order: a ≤ b ≤ c.', 'State clearly: "c is the longest side, so it would be the hypotenuse if the triangle is right-angled." 3.', 'Compute c² and a² + b² separately.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_011', difficulty: 'standard',
          question: 'The Pythagoras theorem states that in a right-angled triangle, the square.',
          hint: 'Revisit the proof of Pythagoras theorem (c10_math_cbse_06_009) to see why the hypotenuse.',
          misconception: 'Students frequently misidentify the hypotenuse when the triangle is oriented differently (e.g., hypotenuse horizontal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Pythagoras theorem states that in a right-angled triangle, the square of the length',
                  options: ['The Pythagoras theorem states that in a right-angled triangle, the square of the length', 'Two figures are **similar** if they have the same shape but not necessarily the same size', 'Two triangles are said to be similar if their corresponding angles are equal and their', 'If a line is drawn parallel to one side of a triangle intersecting the other two sides at'],
                  hint: 'Revisit the proof of Pythagoras theorem (c10_math_cbse_06_009) to see why the hypotenuse is the.',
                  misconception: 'Students frequently misidentify the hypotenuse when the triangle is oriented differently (e.g., hypotenuse horizontal or vertical).' }
          ],
            remediations: { 'students-frequently-misidentify-the-hypotenuse': { steps: ['Have the student physically draw the right angle symbol (⌟) on every triangle diagram before labelling sides.', 'Use the phrase "hypotenuse is opposite the right angle" as a checklist: locate right angle → side opposite.', 'For finding a leg, explicitly write the rearrangement: \\(a^2 = c^2 - b^2\\) and say "hypotenuse squared minus known leg.', 'Practice 5 problems where the right triangle is rotated (hypotenuse not slanted) to build orientation independence.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_06_012', difficulty: 'standard',
          question: 'Proving ratios using BPT and similarity criteria involves establishing the.',
          hint: 'Review BPT (c10_math_cbse_06_003) and similarity criteria (c10_math_cbse_06_005, 006.',
          misconception: 'Students often incorrectly apply BPT by writing the proportion as AD/AB = AE/AC instead of AD/DB = AE/EC, or they.',
          parts: [
                { id: 'a', prompt: 'In ΔABC, DE is drawn parallel to BC with D on AB and E on AC. If AD/DB = 2/3, explain why AE/EC must also equal 2/3.', answer: 'BPT justifies it',
                  options: ['BPT justifies it', 'the ratio is arbitrary'],
                  hint: 'Review BPT (c10_math_cbse_06_003) and similarity criteria (c10_math_cbse_06_005, 006, 007) and.',
                  misconception: 'Students often incorrectly apply BPT by writing the proportion as AD/AB = AE/AC instead of AD/DB = AE/EC, or they confuse the order.' }
          ],
            remediations: { 'students-often-incorrectly-apply-bpt': { steps: ['Remediation: 1) Have the student draw a triangle with a parallel line and label segments.', '2) Ask them to write the proportion in three ways: AD/DB = AE/EC, AD/AB = AE/AC, DB/AB = EC/AC.', '3) Show that all are equivalent but BPT is conventionally stated as AD/DB = AE/EC.', '4) Practice identifying which segments correspond in similar triangles by matching angles.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
