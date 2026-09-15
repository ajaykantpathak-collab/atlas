import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch08_p1: SimDef = {
    id: 'v3_c10_math_ch08_p1',
    title: 'Introduction to Trigonometry · Part 1/2',
    subtitle: 'Discover why every angle has its own fixed fingerprints',
    classLevel: 10, subject: 'mathematics', topic: 'Introduction to Trigonometry · Part 1/2',
    chapters: ['c10_math_ch08'],
    nodeIds: ['c10_math_cbse_08_001', 'c10_math_cbse_08_002', 'c10_math_cbse_08_003', 'c10_math_cbse_08_004', 'c10_math_cbse_08_005', 'c10_math_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ratio detective in right triangles', intro: 'An angle walks into a right triangle and leaves three numbers behind: opposite/hypotenuse, adjacent/hypotenuse, opposite/adjacent. They never change for that angle — and that\'s the whole game.', goal: 'Define and compute trigonometric ratios, evaluate standard angles, and use fundamental identities to simplify expressions.' },
    discovery: {
        question: 'You can\'t climb the flagpole — but you can know its height from the ground. How?',
        options: ['Measure your distance and the angle up — trig does the rest', 'Guess from the shadow length alone', 'Use GPS altitude', 'Count the rope segments'],
        answer: 'Measure your distance and the angle up — trig does the rest',
        hook: 'Trigonometry is remote measurement — ratios that let you measure what you cannot touch.',
    },
    teaching: [
        { title: 'Trigonometric Ratios: sin, cos, tan in a Right Triangle', text: 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined as: sine θ = length of side opposite to θ / length of hypotenuse, cosine θ = length of side adjacent to θ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_08_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Build sin, cos and tan from scratch, memorise the standard-angle table by reasoning rather than rote, and use identities like sin²θ + cos²θ = 1 to simplify fierce-looking expressions.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_001', title: 'Trigonometric Ratios: sin, cos, tan in a Right Triangle',
          scaffold: { problem: 'A 15-metre long wire is tied from the top of a vertical electric pole to a point on the ground.',
            steps: [
            { text: 'Draw a right triangle where the pole is the vertical side (opposite to 30°), the ground distance is the horizontal side.' },
            { text: 'To find the height of the pole (opposite side), use sin 30° = opposite/hypotenuse. Substitute: 1/2 = height / 15.' },
            { text: 'Solve for height: height = 15 × 1/2 = 7.5 m.' },
            { text: 'To find the ground distance (adjacent side), use cos 30° = adjacent/hypotenuse. Substitute: √3/2 = distance / 15.' },
            { text: 'Solve for distance: distance = 15 × √3/2 = (15√3)/2 ≈ 12.99 m.', faded: true, blankAnswer: 'Height of pole = 7.5 m; Distance from foot = (15√3)/2 m ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_002', title: 'Trigonometric Ratios: cosec, sec, cot as Reciprocals',
          scaffold: { problem: 'In ΔABC, right-angled at B, AB = 24 cm, BC = 7 cm. Find the values of cosec A, sec A, and cot A.',
            steps: [
            { text: 'Identify the sides relative to angle A. Angle A is at vertex A. Opposite side = BC = 7 cm. Adjacent side = AB = 24 cm.' },
            { text: 'Compute the hypotenuse AC using Pythagoras theorem: AC² = AB² + BC² = 24² + 7² = 576 + 49 = 625. So AC = √625 = 25 cm.' },
            { text: 'Write the primary ratios for angle A: sin A = Opposite/Hypotenuse = 7/25; cos A = Adjacent/Hypotenuse = 24/25; tan.' },
            { text: 'Take reciprocals to get the required ratios: cosec A = 1/sin A = 25/7; sec A = 1/cos A = 25/24; cot A = 1/tan A = 24/7.' },
            { text: 'Verify: All ratios are > 0 (acute angle). cosec A = 25/7 ≈ 3.57, sec A = 25/24 ≈ 1.04, cot A = 24/7 ≈ 3.43.', faded: true, blankAnswer: 'cosec A = 25/7, sec A = 25/24, cot A = 24/7' }
            ] } },
        { type: 'case', nodeId: 'c10_math_cbse_08_003', title: 'Trigonometric Ratios of Specific Angles: 0 and 90 Degrees',
          caseStudy: { intro: 'Imagine a ladder leaning against a wall making an angle θ with the ground.',
            decisions: [{ prompt: 'Write the values of sin 0°, cos 0°, tan 0°, cosec 0°, sec 0°, and cot 0°.', options: [
                { text: 'sin 0° = 0, cos 0° = 1, tan 0° = 0, cosec 0° is not defined, sec 0° = 1, cot 0° is not', outcome: 'sin 0° = 0, cos 0° = 1, tan 0° = 0, cosec 0° is not defined, sec 0° = 1, cot 0° is not defined.' },
                { text: 'not defined', outcome: 'Not quite — Students treat "not defined" as a numerical value like 0 or ∞ (infinity).', reveals: 'students-treat-not-defined-as' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_004', title: 'Trigonometric Ratios of 30 and 60 Degrees',
          scaffold: { problem: 'A 12-metre long wire is tied from the top of a vertical pole to a point on the ground. The wire makes an angle of 30° with the ground.',
            steps: [
            { text: 'Draw a right triangle representing the situation. The wire is the hypotenuse = 12 m. The angle with the ground is 30°.' },
            { text: 'Identify the trigonometric ratios to use. For height (opposite): sin 30° = opposite/hypotenuse.' },
            { text: 'Substitute known values. sin 30° = 1/2 = height/12. cos 30° = √3/2 = distance/12.' },
            { text: 'Solve for height: height = 12 × (1/2) = 6 m. Solve for distance: distance = 12 × (√3/2) = 6√3 m.' },
            { text: 'Verify using Pythagoras: height² + distance² = 6² + (6√3)² = 36 + 108 = 144 = 12². Verified.', faded: true, blankAnswer: 'Height of pole = 6 m; Distance from foot = 6√3 m (≈ 10.39 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_005', title: 'Trigonometric Ratios of 45 Degrees',
          scaffold: { problem: 'A ladder 10√2 metres long leans against a vertical wall making an angle of 45° with the horizontal ground.',
            steps: [
            { text: 'Draw the right triangle. Ladder = hypotenuse = 10√2 m. Angle with ground = 45°.' },
            { text: 'For 45°, the triangle is isosceles right-angled, so x = y. Using Pythagoras: x² + x² = (10√2)² → 2x² = 200 → x² = 100 →.' },
            { text: 'When angle becomes 30°, new height y\' = hypotenuse × sin 30° = 10√2 × 1/2 = 5√2 m ≈ 7.07 m.' },
            { text: 'Decrease in height = original height - new height = 10 - 5√2 = 10 - 7.07 = 2.93 m (exact: 10 - 5√2 metres).' },
            { text: 'Verify: At 45°, height = base = 10 m is consistent with tan 45° = 1.', faded: true, blankAnswer: 'Distance from wall = 10 m, height at 45° = 10 m, decrease.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_006', title: 'Trigonometric Identities: sin-squared + cos-squared = 1',
          scaffold: { problem: 'In a right triangle ABC, right-angled at B, angle A = θ. If sinθ = 12/13, find cosθ and tanθ using the identity sin²θ + cos²θ = 1.',
            steps: [
            { text: 'Write down the given information: sinθ = 12/13, θ is acute (0° < θ < 90°), so cosθ > 0.' },
            { text: 'Recall the identity sin²θ + cos²θ = 1. Substitute sinθ = 12/13 into the identity: (12/13)² + cos²θ = 1.' },
            { text: 'Compute the square: 144/169 + cos²θ = 1. Subtract 144/169 from both sides: cos²θ = 1 - 144/169 = (169 - 144)/169.' },
            { text: 'Take the positive square root (since θ is acute): cosθ = √(25/169) = 5/13.' },
            { text: 'Find tanθ using tanθ = sinθ/cosθ = (12/13) / (5/13) = 12/5.', faded: true, blankAnswer: 'cosθ = 5/13, tanθ = 12/5' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_08_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A hospital must build a wheelchair ramp rising 1.5 m, and safety rules cap the incline at 15°. The contractor has a 6-metre ramp plank and says, \'Six metres is plenty long, so it will definitely be gentle enough.\' A student is asked to verify.',
            decisions: [{ prompt: 'Does the 6 m ramp satisfy the 15° limit?', options: [
                { text: 'Check the angle, not just the length — sin θ = rise ÷ ramp = 1.5/6 = 0.25, so θ is about 14.5°, which is under the 15° limit, so the ramp is acceptable. The inclination depends on the ratio of rise to ramp length, which is exactly what sine measures.', outcome: 'Trigonometry turns \'seems long enough\' into a checkable number — the angle follows from opposite over hypotenuse, and 14.5° clears the rule.' },
                { text: 'The contractor is right — a longer ramp always means a safer angle, so measuring the angle is unnecessary.', outcome: 'Length alone does not fix the angle — the same 6 m plank would exceed 15° on a rise above about 1.55 m; the rise-to-ramp ratio is what must be checked.', reveals: 'length-only-check' },
                { text: 'The ramp fails automatically — to be safe, a ramp must be at least 15 metres long whenever the rise is over a metre.', outcome: 'There is no fixed length rule — safety is about the angle, and a 6 m ramp for a 1.5 m rise gives roughly 14.5°, inside the limit.', reveals: 'safety-needs-fixed-length' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'sin, cos, tan — three ratios that turn angles into distances. Surveyors, astronomers, and your phone\'s GPS all live here.',
            decisions: [{ prompt: 'What comes next? Introduction to Trigonometry · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Trigonometry · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_08_001', difficulty: 'standard',
          question: 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are.',
          hint: 'If stuck, revisit c8_math_ch9_8 (Pythagoras theorem applications) and c6_math_ch06_063.',
          misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle.',
          parts: [
                { id: 'a', prompt: 'In a right triangle PQR, right-angled at Q, PQ = 12 cm and QR = 5 cm. Find sin R, cos R, and tan R. (Angle R is at vertex R.)', answer: 'Step 1: Identify sides relative to angle R',
                  options: ['Step 1: Identify sides relative to angle R', 'opposite', 'adjacent'],
                  hint: 'If stuck, revisit c8_math_ch9_8 (Pythagoras theorem applications) and c6_math_ch06_063 (equivalent.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' },
                { id: 'b', prompt: 'In right triangle XYZ, right-angled at Y, sin X = 3/5. Without finding the actual side lengths, determine the value of cos X and tan X. Explain your reasoning.', answer: 'Given sin X = 3/5 = opposite/hypotenuse',
                  options: ['Given sin X = 3/5 = opposite/hypotenuse', 'opposite', 'adjacent'],
                  hint: 'If stuck, revisit c8_math_ch9_8 (Pythagoras theorem applications) and c6_math_ch06_063 (equivalent.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' }
          ],
            remediations: { 'students-consistently-confuse-opposite-and': { steps: ['If a student makes this error, do not just re-teach definitions.', 'Instead: (1) Give them a right triangle cut-out with angles marked 30° and 60°.', '(2) Ask them to place a finger on the 30° angle and point to the side directly across — that\'s opposite for 30°.', '(3) Then move finger to 60° angle and point across — that\'s opposite for 60°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle.',
          parts: [
                { id: 'a', prompt: 'A student solves the following problem: "In right triangle ABC, right-angled at B, AB = 6 cm, BC = 8 cm.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'opposite', 'adjacent'],
                  hint: 'If stuck, revisit c8_math_ch9_8 (Pythagoras theorem applications) and c6_math_ch06_063 (equivalent.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' },
                { id: 'b', prompt: 'Create a real-world problem (using Indian context: rupees, metres, kg, litres) that requires finding an unknown side of a right triangle using one of sin, cos.', answer: 'Example problem: A ladder 10 metres long leans against a vertical wall',
                  options: ['Example problem: A ladder 10 metres long leans against a vertical wall', 'opposite', 'adjacent'],
                  hint: 'If stuck, revisit c8_math_ch9_8 (Pythagoras theorem applications) and c6_math_ch06_063 (equivalent.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' }
          ],
            remediations: { 'students-consistently-confuse-opposite-and': { steps: ['If a student makes this error, do not just re-teach definitions.', 'Instead: (1) Give them a right triangle cut-out with angles marked 30° and 60°.', '(2) Ask them to place a finger on the 30° angle and point to the side directly across — that\'s opposite for 30°.', '(3) Then move finger to 60° angle and point across — that\'s opposite for 60°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_002', difficulty: 'standard',
          question: 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric.',
          hint: 'Revisit c10_math_cbse_08_001 for triangle labeling, and c6_math_ch03_036 for fraction.',
          misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.',
          parts: [
                { id: 'a', prompt: 'In a right triangle ABC, right-angled at B, if sin A = 4/5, what is the value of cosec A?', answer: 'cosec A = 5/4',
                  options: ['cosec A = 5/4', 'opposite', 'adjacent'],
                  hint: 'Revisit c10_math_cbse_08_001 for triangle labeling, and c6_math_ch03_036 for fraction.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' },
                { id: 'b', prompt: 'A student writes: sec θ = 1/cos θ = Adjacent/Hypotenuse. Is this correct? Explain why or why not.', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'sec = 1/cos', 'opposite', 'adjacent'],
                  hint: 'Revisit c10_math_cbse_08_001 for triangle labeling, and c6_math_ch03_036 for fraction.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' },
                { id: 'c', prompt: 'Given that tan θ = 7/24 for an acute angle θ, find the values of sin θ and cosec θ without using a calculator. Explain your reasoning.', answer: 'tan θ = 7/24 ⇒ Opposite = 7k, Adjacent = 24k',
                  options: ['tan θ = 7/24 ⇒ Opposite = 7k, Adjacent = 24k', 'opposite', 'adjacent'],
                  hint: 'Revisit c10_math_cbse_08_001 for triangle labeling, and c6_math_ch03_036 for fraction.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' }
          ],
            remediations: { 'students-often-confuse-which-side': { steps: ['Draw a right triangle with angle θ, label sides O, A, H.', 'Write sin = O/H, cos = A/H, tan = O/A.', 'Then physically flip each fraction with a coloured pen: cosec = H/O, sec = H/A, cot = A/O.', 'Say aloud: "cosec flips sin, so hypotenuse goes on top." Practice with 3 specific triangles: (3,4,5), (5,12,13).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_003', difficulty: 'standard',
          question: 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting.',
          hint: 'Revisit c10_math_cbse_08_001 and c10_math_cbse_08_002 to practise writing all six ratios.',
          misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).',
          parts: [
                { id: 'a', prompt: 'Evaluate: 2 sin 0° + 3 cos 90° − 4 tan 0° + 5 cot 90°.', answer: 'Substitute: sin 0° = 0, cos 90° = 0, tan 0° = 0, cot 90° = 0',
                  options: ['Substitute: sin 0° = 0, cos 90° = 0, tan 0° = 0, cot 90° = 0', 'not defined'],
                  hint: 'Revisit c10_math_cbse_08_001 and c10_math_cbse_08_002 to practise writing all six ratios for.',
                  misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).' },
                { id: 'b', prompt: 'Compare the behaviour of sec θ and cos θ as θ increases from 0° to 90°. What happens to their values at the endpoints?', answer: 'cos θ decreases from 1 to 0',
                  options: ['cos θ decreases from 1 to 0', 'tends to infinity', 'is not defined', 'sec 90° = ∞ or sec 90° = 0'],
                  hint: 'Revisit c10_math_cbse_08_001 and c10_math_cbse_08_002 to practise writing all six ratios for.',
                  misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).' }
          ],
            remediations: { 'students-treat-not-defined-as': { steps: ['Draw a right triangle with angle θ. Label opposite (P), adjacent (B), hypotenuse (H).', 'Ask: "As θ → 0°, what happens to P, B, H?" (P → 0, B → H).', 'Write each ratio (sin = P/H, cos = B/H, tan = P/B, cosec = H/P, sec = H/B, cot = B/P).', 'Substitute the limits: P=0, B=H.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_004', difficulty: 'standard',
          question: 'The trigonometric ratios for 30° and 60° are exact values derived from.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
          misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right',
                  options: ['The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
                  hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
                  misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.' }
          ],
            remediations: { 'students-consistently-confuse-which-ratio': { steps: ['If a student makes this confusion, do NOT just re-drill the values.', 'Instead: (1) Have them physically draw an equilateral triangle of side 2 cm on paper, label all sides and angles.', '(2) Fold or draw the perpendicular bisector to create the 30-60-90 triangle.', '(3) Label the 30° angle clearly.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_005', difficulty: 'standard',
          question: 'In a right-angled triangle with one acute angle measuring 45°, the.',
          hint: 'If stuck, revisit c8_math_ch9_4 (hypotenuse of isosceles right triangle) and.',
          misconception: 'Students write sin 45° = 1/√2 and cos 45° = 1/√2 but fail to rationalise the denominator to √2/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios',
                  options: ['In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
                  hint: 'If stuck, revisit c8_math_ch9_4 (hypotenuse of isosceles right triangle) and c10_math_cbse_08_001.',
                  misconception: 'Students write sin 45° = 1/√2 and cos 45° = 1/√2 but fail to rationalise the denominator to √2/2.' }
          ],
            remediations: { 'students-write-sin-45-1': { steps: ['Have the student draw a 45°-45°-90° triangle with legs = 1, compute hypotenuse = √2 using Pythagoras (c8_math_ch9_5).', 'Write sin 45° = 1/√2, then explicitly multiply numerator and denominator by √2 to get √2/2 — say aloud: "We rationalise.', 'Practice 5 rapid-fire evaluations: sin²45° + cos²45°, 2 sin 45° cos 45°, tan 45° + cot 45°, forcing rationalised form.', 'Give a mixed problem with 30°, 45°, 60° to prevent overgeneralising the "hypotenuse = 2" pattern from 30°-60°-90°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_006', difficulty: 'standard',
          question: 'In a right-angled triangle, for any acute angle θ, the sum of the square of the.',
          hint: 'Revisit the Pythagorean theorem (c8_math_ch9_5) and the definitions of trigonometric.',
          misconception: 'Students often write sinθ + cosθ = 1 instead of sin²θ + cos²θ = 1, especially when substituting values.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ',
                  options: ['In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
                  hint: 'Revisit the Pythagorean theorem (c8_math_ch9_5) and the definitions of trigonometric ratios.',
                  misconception: 'Students often write sinθ + cosθ = 1 instead of sin²θ + cos²θ = 1, especially when substituting values.' }
          ],
            remediations: { 'students-often-write-sin-cos': { steps: ['If a student writes sinθ + cosθ = 1, draw a right triangle with sides 3, 4, 5.', 'Show sinθ = 3/5, cosθ = 4/5, then compute sinθ + cosθ = 7/5 ≠ 1, but sin²θ + cos²θ = 9/25 + 16/25 = 1.', 'Emphasize that the identity comes from dividing the Pythagorean theorem (p²+b²=h²) by h², so the squares are essential.', 'For sign errors, remind them that in Class 10, θ is acute (0°<θ<90°), so all trigonometric ratios are positive.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
