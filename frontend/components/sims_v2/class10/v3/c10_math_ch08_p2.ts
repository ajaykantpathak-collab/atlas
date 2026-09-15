import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch08_p2: SimDef = {
    id: 'v3_c10_math_ch08_p2',
    title: 'Introduction to Trigonometry · Part 2/2',
    subtitle: 'Discover why every angle has its own fixed fingerprints',
    classLevel: 10, subject: 'mathematics', topic: 'Introduction to Trigonometry · Part 2/2',
    chapters: ['c10_math_ch08'],
    nodeIds: ['c10_math_cbse_08_007', 'c10_math_cbse_08_008', 'c10_math_cbse_08_009', 'c10_math_cbse_08_010', 'c10_math_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ratio detective in right triangles', intro: 'An angle walks into a right triangle and leaves three numbers behind: opposite/hypotenuse, adjacent/hypotenuse, opposite/adjacent. They never change for that angle — and that\'s the whole game.', goal: 'Define and compute trigonometric ratios, evaluate standard angles, and use fundamental identities to simplify expressions.' },
    discovery: {
        question: 'You can\'t climb the flagpole — but you can know its height from the ground. How?',
        options: ['Measure your distance and the angle up — trig does the rest', 'Guess from the shadow length alone', 'Use GPS altitude', 'Count the rope segments'],
        answer: 'Measure your distance and the angle up — trig does the rest',
        hook: 'Trigonometry is remote measurement — ratios that let you measure what you cannot touch.',
    },
    teaching: [
        { title: 'Trigonometric Identities: 1 + tan-squared = sec-squared', text: 'The identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) holds for all angles \\(\\theta\\) where \\(\\cos\\theta \\neq 0\\) (i.e., \\(\\theta \\neq 90^\\circ + 180^\\circ k, k \\in \\mathbb{Z}\\)).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_08_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Build sin, cos and tan from scratch, memorise the standard-angle table by reasoning rather than rote, and use identities like sin²θ + cos²θ = 1 to simplify fierce-looking expressions.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_007', title: 'Trigonometric Identities: 1 + tan-squared = sec-squared',
          scaffold: { problem: 'A 10 m long ladder leans against a vertical wall. The foot of the ladder is 6 m away from the wall.',
            steps: [
            { text: 'Identify given: hypotenuse (ladder length) = 10 m, adjacent side (distance from wall) = 6 m. We need \\(\\theta\\).' },
            { text: '\\(\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{6}{10} = \\frac{3}{5}\\).' },
            { text: 'Use the identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\). Substitute \\(\\sec\\theta = \\frac{5}{3}\\): \\(1 + \\tan^2\\theta.' },
            { text: 'Solve for \\(\\tan^2\\theta\\): \\(\\tan^2\\theta = \\frac{25}{9} - 1 = \\frac{25}{9} - \\frac{9}{9} = \\frac{16}{9}\\).' },
            { text: '\\(\\theta = \\tan^{-1}\\left(\\frac{4}{3}\\right) \\approx 53.13^\\circ\\).', faded: true, blankAnswer: '\\(\\theta = \\tan^{-1}\\left(\\frac{4}{3}\\right) \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_008', title: 'Trigonometric Identities: 1 + cot-squared = cosec-squared',
          scaffold: { problem: 'A ladder 13 metres long leans against a vertical wall. The foot of the ladder is 5 metres from the wall.',
            steps: [
            { text: 'Draw a right triangle with hypotenuse = 13 m (ladder), base = 5 m (distance from wall), height = unknown (wall height).' },
            { text: 'Use Pythagoras theorem to find the height: \\(\\text{height}^2 = 13^2 - 5^2 = 169 - 25 = 144\\), so height = 12 m.' },
            { text: 'Write the trigonometric ratios for \\(\\theta\\): \\(\\cot\\theta = \\frac{\\text{adjacent}}{\\text{opposite}} = \\frac{5}{12}\\).' },
            { text: 'Compute LHS of identity: \\(1 + \\cot^2\\theta = 1 + \\left(\\frac{5}{12}\\right)^2 = 1 + \\frac{25}{144} = \\frac{144}{144}.' },
            { text: 'Compute RHS of identity: \\(\\cosec^2\\theta = \\left(\\frac{13}{12}\\right)^2 = \\frac{169}{144}\\).' },
            { text: 'Compare LHS and RHS: Both equal \\(\\frac{169}{144}\\). Identity verified.' },
            { text: 'Find \\(\\theta\\): \\(\\sin\\theta = \\frac{12}{13}\\), so \\(\\theta = \\sin^{-1}\\left(\\frac{12}{13}\\right) \\approx.', faded: true, blankAnswer: '\\(\\theta \\approx 67.38^\\circ\\); identity verified as LHS.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_009', title: 'Complementary Angle Relations: sin(90-A) = cos(A) etc.',
          scaffold: { problem: 'A surveyor in Gujarat measures the angle of elevation of the top of a tower from a point on the ground as 30°.',
            steps: [
            { text: 'Draw the situation. Let the tower be AB (height h). Initial point C, angle of elevation = 30°.' },
            { text: 'In right triangle ABD, angle ADB = 60°. tan 60° = AB/BD = h/x → h = x tan 60° = x√3.' },
            { text: 'In right triangle ABC, angle ACB = 30°. tan 30° = AB/BC = h/(x+50) → h = (x+50) tan 30° = (x+50)/√3.' },
            { text: 'Equate the two expressions for h: x√3 = (x+50)/√3 → multiply by √3: 3x = x + 50 → 2x = 50 → x = 25 m.' },
            { text: 'Height h = x√3 = 25√3 m ≈ 43.3 m.' },
            { text: 'Verify using complementary angles: 30° and 60° are complementary. tan 30° = cot 60° = 1/√3.', faded: true, blankAnswer: 'Height of tower = 25√3 m (approx 43.3 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_010', title: 'Applications of Trigonometric Identities in Simplification',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a tower as θ.',
            steps: [
            { text: 'Identify the given expression: (sec²θ - 1) / (cosec²θ - 1). Note the Pythagorean identities: 1 + tan²θ = sec²θ ⇒ sec²θ.' },
            { text: 'Substitute these into the expression: (tan²θ) / (cot²θ).' },
            { text: 'Recall cotθ = 1/tanθ, so cot²θ = 1/tan²θ. The expression becomes tan²θ / (1/tan²θ) = tan²θ × tan²θ = tan⁴θ.' },
            { text: 'Wait — the problem states this should equal tan²θ. There is a discrepancy.' },
            { text: 'Verify at θ = 30°: tan 30° = 1/√3, tan²30° = 1/3, tan⁴30° = 1/9.', faded: true, blankAnswer: 'tan⁴θ (which equals 1/9 at θ = 30°)' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_08_011', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A hospital must build a wheelchair ramp rising 1.5 m, and safety rules cap the incline at 15°. The contractor has a 6-metre ramp plank and says, \'Six metres is plenty long, so it will definitely be gentle enough.\' A student is asked to verify.',
            decisions: [{ prompt: 'Does the 6 m ramp satisfy the 15° limit?', options: [
                { text: 'Check the angle, not just the length — sin θ = rise ÷ ramp = 1.5/6 = 0.25, so θ is about 14.5°, which is under the 15° limit, so the ramp is acceptable. The inclination depends on the ratio of rise to ramp length, which is exactly what sine measures.', outcome: 'Trigonometry turns \'seems long enough\' into a checkable number — the angle follows from opposite over hypotenuse, and 14.5° clears the rule.' },
                { text: 'The contractor is right — a longer ramp always means a safer angle, so measuring the angle is unnecessary.', outcome: 'Length alone does not fix the angle — the same 6 m plank would exceed 15° on a rise above about 1.55 m; the rise-to-ramp ratio is what must be checked.', reveals: 'length-only-check' },
                { text: 'The ramp fails automatically — to be safe, a ramp must be at least 15 metres long whenever the rise is over a metre.', outcome: 'There is no fixed length rule — safety is about the angle, and a 6 m ramp for a 1.5 m rise gives roughly 14.5°, inside the limit.', reveals: 'safety-needs-fixed-length' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'sin, cos, tan — three ratios that turn angles into distances. Surveyors, astronomers, and your phone\'s GPS all live here.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_08_007', difficulty: 'standard',
          question: 'The identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) holds for all angles.',
          hint: 'Revisit c10_math_cbse_08_006 (fundamental identity) and c10_math_cbse_08_001.',
          misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\).',
          parts: [
                { id: 'a', prompt: 'Explain step-by-step how dividing \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by \\(\\cos^2\\theta\\) gives \\(1 + \\tan^2\\theta = \\sec^2\\theta\\).', answer: 'Dividing each term: \\(\\frac{\\sin^2\\theta}{\\cos^2\\theta} +',
                  options: ['Dividing each term: \\(\\frac{\\sin^2\\theta}{\\cos^2\\theta} +', '\\(\\cos\\theta\\) cannot be zero'],
                  hint: 'Revisit c10_math_cbse_08_006 (fundamental identity) and c10_math_cbse_08_001 (trigonometric ratio.',
                  misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), incorrectly assuming.' },
                { id: 'b', prompt: 'Compare the identities \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and \\(1 + \\tan^2\\theta = \\sec^2\\theta\\). Which is more fundamental? How are their domains different?', answer: '\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental',
                  options: ['\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental', 'both hold for all angles', 'they are the same'],
                  hint: 'Revisit c10_math_cbse_08_006 (fundamental identity) and c10_math_cbse_08_001 (trigonometric ratio.',
                  misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), incorrectly assuming.' }
          ],
            remediations: { 'students-write-sec-theta-1': { steps: ['**Algebra fix**: Write \\(\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\) but \\(3 + 4 = 7\\).', 'Emphasise: \\(\\sqrt{a^2 + b^2} \\neq a + b\\).', 'Practice with numbers first.', '**Derivation drill**: Have the student re-derive the identity from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by dividing.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_008', difficulty: 'standard',
          question: 'The identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\) is a fundamental Pythagorean.',
          hint: 'Revisit c10_math_cbse_08_006 (derivation of \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) from.',
          misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1.',
          parts: [
                { id: 'a', prompt: 'Explain why dividing \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by \\(\\sin^2\\theta\\) gives \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\), and why we cannot divide.', answer: 'Dividing by \\(\\sin^2\\theta\\) yields \\(\\frac{\\sin^2\\theta}{\\sin^2\\theta} +',
                  options: ['Dividing by \\(\\sin^2\\theta\\) yields \\(\\frac{\\sin^2\\theta}{\\sin^2\\theta} +', 'both give the same result', '1 + something² = something else²'],
                  hint: 'Revisit c10_math_cbse_08_006 (derivation of \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) from Pythagoras).',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' },
                { id: 'b', prompt: 'If \\(\\cot\\theta = \\frac{12}{5}\\) and \\(\\theta\\) is acute, find the value of \\(\\cosec\\theta\\) using the identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\).', answer: 'Given \\(\\cot\\theta = \\frac{12}{5}\\)',
                  options: ['Given \\(\\cot\\theta = \\frac{12}{5}\\)', '1 + something² = something else²'],
                  hint: 'Revisit c10_math_cbse_08_006 (derivation of \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) from Pythagoras).',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' },
                { id: 'c', prompt: 'Compare the two identities \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) and \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\).', answer: 'Given \\(\\tan\\theta = \\frac{3}{4}\\), we cannot directly use \\(1 + \\cot^2\\theta =',
                  options: ['Given \\(\\tan\\theta = \\frac{3}{4}\\), we cannot directly use \\(1 + \\cot^2\\theta =', '1 + something² = something else²'],
                  hint: 'Revisit c10_math_cbse_08_006 (derivation of \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) from Pythagoras).',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' }
          ],
            remediations: { 'students-incorrectly-write-cot-2': { steps: ['If a student makes the squaring error, do NOT just say "remember to square." Instead: Step 1 — Write the identity.', 'Step 2 — Use a coloured pen to put brackets around each function: \\(1 + (\\cot\\theta)^2 = (\\cosec\\theta)^2\\).', 'Step 3 — Substitute a value like \\(\\cot\\theta = \\frac{3}{4}\\) inside the brackets: \\(1 + \\left(\\frac{3}{4}\\right)^2\\).', 'Step 4 — Say aloud: "The bracket means square the whole fraction." Step 5 — Practice 5 problems where they must write.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1.',
          parts: [
                { id: 'a', prompt: 'Create a real-world problem involving a right triangle where the given information is the cotangent of an acute angle, and the question asks for the cosecant.', answer: 'Example problem: "During Sankranti festival, Ravi flies a kite',
                  options: ['Example problem: "During Sankranti festival, Ravi flies a kite', '1 + something² = something else²'],
                  hint: 'Revisit c10_math_cbse_08_006 (derivation of \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) from Pythagoras).',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' }
          ],
            remediations: { 'students-incorrectly-write-cot-2': { steps: ['If a student makes the squaring error, do NOT just say "remember to square." Instead: Step 1 — Write the identity.', 'Step 2 — Use a coloured pen to put brackets around each function: \\(1 + (\\cot\\theta)^2 = (\\cosec\\theta)^2\\).', 'Step 3 — Substitute a value like \\(\\cot\\theta = \\frac{3}{4}\\) inside the brackets: \\(1 + \\left(\\frac{3}{4}\\right)^2\\).', 'Step 4 — Say aloud: "The bracket means square the whole fraction." Step 5 — Practice 5 problems where they must write.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_009', difficulty: 'standard',
          question: 'In a right-angled triangle, the two acute angles are complementary (sum.',
          hint: 'If stuck, revisit c10_math_cbse_08_001 (trigonometric ratios in a right triangle) and.',
          misconception: 'Students often confuse the complementary angle relations with the reciprocal relations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a right-angled triangle, the two acute angles are complementary (sum to 90°)',
                  options: ['In a right-angled triangle, the two acute angles are complementary (sum to 90°)', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
                  hint: 'If stuck, revisit c10_math_cbse_08_001 (trigonometric ratios in a right triangle) and.',
                  misconception: 'Students often confuse the complementary angle relations with the reciprocal relations.' }
          ],
            remediations: { 'students-often-confuse-the-complementary': { steps: ['If a student makes the reciprocal confusion, draw a right triangle with angles A and (90° - A).', 'Label sides: opposite A = P, adjacent A = B, hypotenuse = H.', 'Write sin A = P/H, cos A = B/H.', 'Now for (90° - A): opposite = B, adjacent = P.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_010', difficulty: 'standard',
          question: 'Applications of trigonometric identities in simplification refer to the.',
          hint: 'If stuck, revisit c8_math_ch6_8 (difference of squares factoring) and.',
          misconception: 'Students treat trigonometric identities as "replacement rules" to be applied blindly without checking algebraic.',
          parts: [
                { id: 'a', prompt: 'A student simplifies (sec²θ - 1) / tan²θ as follows: "sec²θ - 1 = tan²θ from the identity, so the expression becomes tan²θ / tan²θ = 1." Is this simplification.', answer: 'No, it is not valid at θ = 0°',
                  options: ['No, it is not valid at θ = 0°', 'condition'],
                  hint: 'If stuck, revisit c8_math_ch6_8 (difference of squares factoring) and c10_math_cbse_08_006/007/008.',
                  misconception: 'Students treat trigonometric identities as "replacement rules" to be applied blindly without checking algebraic structure.' }
          ],
            remediations: { 'students-treat-trigonometric-identities-as': { steps: ['When a student makes the above error: Step 1 — Ask: "Before substituting any identity, what algebraic pattern do you.', 'Step 2 — Say: "Factor completely FIRST.', 'Only then look for trigonometric identities to replace the factored groups." Step 3 — Demonstrate on their wrong.', 'Now what identity applies to the second bracket?" Step 4 — Have them redo three similar problems where factoring first.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_011', difficulty: 'standard',
          question: 'Evaluating trigonometric expressions using identities is the process.',
          hint: 'If stuck, revisit c9_math_ch4_10 (Simplification of Rational Expressions) and.',
          misconception: 'Students treat identities as "formulas to plug numbers into" rather than algebraic rewrite rules.',
          parts: [
                { id: 'a', prompt: 'Explain why we can replace (sin²45° + cos²45°) with 1 in any expression, but we cannot replace (sin45° + cos45°) with 1.', answer: 'sin²θ + cos²θ = 1 is an identity',
                  options: ['sin²θ + cos²θ = 1 is an identity', 'both are 1 for 45°'],
                  hint: 'If stuck, revisit c9_math_ch4_10 (Simplification of Rational Expressions) and c8_math_ch6_7/8/9.',
                  misconception: 'Students treat identities as "formulas to plug numbers into" rather than algebraic rewrite rules.' }
          ],
            remediations: { 'students-treat-identities-as-formulas': { steps: ['Have the student write the three Pythagorean identities and their two rearrangements each (e.g., sin²θ = 1 − cos²θ.', 'Give 5 expressions where direct computation is impossible (e.g., sin²20°+cos²20°).', 'Force them to say "this is exactly identity 1, so it\'s 1" without any calculation.', 'Practice "identity spotting": in a long expression, circle every sub-expression that matches an identity form, label.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
