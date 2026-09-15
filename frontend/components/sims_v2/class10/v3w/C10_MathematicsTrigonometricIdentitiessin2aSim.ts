import type { SimDef } from '../../engine/types';
import C10_MathematicsTrigonometricIdentitiessin2aSim from '../../../simulations/c6_12/C10_MathematicsTrigonometricIdentitiessin2aSim';

/** v3 wrapped master — C10_MathematicsTrigonometricIdentitiessin2aSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicstrigonometricidentitiessin2asim: SimDef = {
    id: 'v3w_c10_mathematicstrigonometricidentitiessin2asim',
    title: 'Trigonometric Identitiessin2a',
    subtitle: 'This node covers the definition and computation of sin θ, cos θ, tan θ for acute angles.',
    classLevel: 10, subject: 'mathematics', topic: 'Trigonometric Ratios: sin, cos, tan in a Right Triangle',
    chapters: [],
    nodeIds: ['c10_math_cbse_08_001', 'c10_math_cbse_08_004', 'c10_math_cbse_08_005', 'c10_math_cbse_08_006', 'c10_math_cbse_08_007', 'c10_math_cbse_08_008', 'c10_math_cbse_08_010', 'c10_math_cbse_08_011', 'c10_math_cbse_08_002', 'c10_math_cbse_08_003', 'c10_math_cbse_08_009', 'c10_math_cbse_09_005', 'c10_math_cbse_09_006', 'c10_math_cbse_09_007', 'c10_math_cbse_09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are standing 20 metres away from the base of a mobile tower in your neighbourhood and you want to.', goal: 'Master Trigonometric Identitiessin2a.' },
    discovery: {
        question: 'In a right triangle PQR, right-angled at Q, PQ = 12 cm and QR = 5 cm. Find sin R, cos R, and tan R. (Angle R is at vertex R.)',
        options: ['Step 1: Identify sides relative to angle R', 'opposite', 'adjacent'],
        answer: 'Step 1: Identify sides relative to angle R',
        hook: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle.',
    },
    teaching: [
        { title: 'In a right-angled triangle, for an acute.', text: 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined as: sine θ = length of side opposite to θ / length of hypotenuse, cosine θ = length of side adjacent to θ /.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_001', title: 'In a right-angled triangle, for an.',
          scaffold: { problem: 'A 15-metre long wire is tied from the top of a vertical electric pole to a point on the ground.',
            steps: [
            { text: 'Draw a right triangle where the pole is the vertical side (opposite to 30°), the ground distance is the horizontal side.' },
            { text: 'To find the height of the pole (opposite side), use sin 30° = opposite/hypotenuse. Substitute: 1/2 = height / 15.' },
            { text: 'Solve for height: height = 15 × 1/2 = 7.5 m.' },
            { text: 'To find the ground distance (adjacent side), use cos 30° = adjacent/hypotenuse. Substitute: √3/2 = distance / 15.' },
            { text: 'Solve for distance: distance = 15 × √3/2 = (15√3)/2 ≈ 12.99 m.', faded: true, blankAnswer: 'Height of pole = 7.5 m; Distance from foot = (15√3)/2 m ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_004', title: 'The trigonometric ratios for 30° and.',
          scaffold: { problem: 'A 12-metre long wire is tied from the top of a vertical pole to a point on the ground. The wire makes an angle of 30° with the ground.',
            steps: [
            { text: 'Draw a right triangle representing the situation. The wire is the hypotenuse = 12 m. The angle with the ground is 30°.' },
            { text: 'Identify the trigonometric ratios to use. For height (opposite): sin 30° = opposite/hypotenuse.' },
            { text: 'Substitute known values. sin 30° = 1/2 = height/12. cos 30° = √3/2 = distance/12.' },
            { text: 'Solve for height: height = 12 × (1/2) = 6 m. Solve for distance: distance = 12 × (√3/2) = 6√3 m.' },
            { text: 'Verify using Pythagoras: height² + distance² = 6² + (6√3)² = 36 + 108 = 144 = 12². Verified.', faded: true, blankAnswer: 'Height of pole = 6 m; Distance from foot = 6√3 m (≈ 10.39 m)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_005', title: 'In a right-angled triangle with one.',
          scaffold: { problem: 'A ladder 10√2 metres long leans against a vertical wall making an angle of 45° with the horizontal ground.',
            steps: [
            { text: 'Draw the right triangle. Ladder = hypotenuse = 10√2 m. Angle with ground = 45°.' },
            { text: 'For 45°, the triangle is isosceles right-angled, so x = y. Using Pythagoras: x² + x² = (10√2)² → 2x² = 200 → x² = 100 →.' },
            { text: 'When angle becomes 30°, new height y\' = hypotenuse × sin 30° = 10√2 × 1/2 = 5√2 m ≈ 7.07 m.' },
            { text: 'Decrease in height = original height - new height = 10 - 5√2 = 10 - 7.07 = 2.93 m (exact: 10 - 5√2 metres).' },
            { text: 'Verify: At 45°, height = base = 10 m is consistent with tan 45° = 1.', faded: true, blankAnswer: 'Distance from wall = 10 m, height at 45° = 10 m, decrease.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_006', title: 'In a right-angled triangle, for any.',
          scaffold: { problem: 'In a right triangle ABC, right-angled at B, angle A = θ. If sinθ = 12/13, find cosθ and tanθ using the identity sin²θ + cos²θ = 1.',
            steps: [
            { text: 'Write down the given information: sinθ = 12/13, θ is acute (0° < θ < 90°), so cosθ > 0.' },
            { text: 'Recall the identity sin²θ + cos²θ = 1. Substitute sinθ = 12/13 into the identity: (12/13)² + cos²θ = 1.' },
            { text: 'Compute the square: 144/169 + cos²θ = 1. Subtract 144/169 from both sides: cos²θ = 1 - 144/169 = (169 - 144)/169 =.' },
            { text: 'Take the positive square root (since θ is acute): cosθ = √(25/169) = 5/13.' },
            { text: 'Find tanθ using tanθ = sinθ/cosθ = (12/13) / (5/13) = 12/5.', faded: true, blankAnswer: 'cosθ = 5/13, tanθ = 12/5' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_007', title: 'The identity \\(1 + \\tan^2\\theta =.',
          scaffold: { problem: 'A 10 m long ladder leans against a vertical wall. The foot of the ladder is 6 m away from the wall.',
            steps: [
            { text: 'Identify given: hypotenuse (ladder length) = 10 m, adjacent side (distance from wall) = 6 m. We need \\(\\theta\\).' },
            { text: '\\(\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{6}{10} = \\frac{3}{5}\\).' },
            { text: 'Use the identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\). Substitute \\(\\sec\\theta = \\frac{5}{3}\\): \\(1 + \\tan^2\\theta =.' },
            { text: 'Solve for \\(\\tan^2\\theta\\): \\(\\tan^2\\theta = \\frac{25}{9} - 1 = \\frac{25}{9} - \\frac{9}{9} = \\frac{16}{9}\\).' },
            { text: '\\(\\theta = \\tan^{-1}\\left(\\frac{4}{3}\\right) \\approx 53.13^\\circ\\).', faded: true, blankAnswer: '\\(\\theta = \\tan^{-1}\\left(\\frac{4}{3}\\right) \\approx.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_008', title: 'The identity \\(1 + \\cot^2\\theta =.',
          scaffold: { problem: 'A ladder 13 metres long leans against a vertical wall. The foot of the ladder is 5 metres from the wall.',
            steps: [
            { text: 'Draw a right triangle with hypotenuse = 13 m (ladder), base = 5 m (distance from wall), height = unknown (wall height).' },
            { text: 'Use Pythagoras theorem to find the height: \\(\\text{height}^2 = 13^2 - 5^2 = 169 - 25 = 144\\), so height = 12 m.' },
            { text: 'Write the trigonometric ratios for \\(\\theta\\): \\(\\cot\\theta = \\frac{\\text{adjacent}}{\\text{opposite}} = \\frac{5}{12}\\),.' },
            { text: 'Compute LHS of identity: \\(1 + \\cot^2\\theta = 1 + \\left(\\frac{5}{12}\\right)^2 = 1 + \\frac{25}{144} = \\frac{144}{144} +.' },
            { text: 'Compute RHS of identity: \\(\\cosec^2\\theta = \\left(\\frac{13}{12}\\right)^2 = \\frac{169}{144}\\).' },
            { text: 'Compare LHS and RHS: Both equal \\(\\frac{169}{144}\\). Identity verified.' },
            { text: 'Find \\(\\theta\\): \\(\\sin\\theta = \\frac{12}{13}\\), so \\(\\theta = \\sin^{-1}\\left(\\frac{12}{13}\\right) \\approx.', faded: true, blankAnswer: '\\(\\theta \\approx 67.38^\\circ\\); identity verified as LHS =.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_08_004', title: 'Identify each idea',
          dissect: { specimen: 'Trigonometric Identitiessin2a', spots: [
            { id: 's1', label: 'In a right-angled triangle for', prompt: 'Which idea is this? — In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined.', answer: 'In a right-angled triangle for', options: ['In a right-angled triangle for', 'The trigonometric ratios for 30', 'In a right-angled triangle with', 'The identity 1 tan2theta'] },
            { id: 's2', label: 'The trigonometric ratios for 30', prompt: 'Which idea is this? — The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right.', answer: 'The trigonometric ratios for 30', options: ['The trigonometric ratios for 30', 'In a right-angled triangle for', 'In a right-angled triangle with', 'The identity 1 tan2theta'] },
            { id: 's3', label: 'In a right-angled triangle with', prompt: 'Which idea is this? — In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios.', answer: 'In a right-angled triangle with', options: ['In a right-angled triangle with', 'In a right-angled triangle for', 'The trigonometric ratios for 30', 'The identity 1 tan2theta'] },
            { id: 's4', label: 'The identity 1 tan2theta', prompt: 'Which idea is this? — The identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) holds for all angles \\(\\theta\\) where.', answer: 'The identity 1 tan2theta', options: ['The identity 1 tan2theta', 'In a right-angled triangle for', 'The trigonometric ratios for 30', 'In a right-angled triangle with'] },
            { id: 's5', label: 'The identity 1 cot2theta', prompt: 'Which idea is this? — The identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\) is a fundamental Pythagorean.', answer: 'The identity 1 cot2theta', options: ['The identity 1 cot2theta', 'In a right-angled triangle for', 'The trigonometric ratios for 30', 'In a right-angled triangle with'] }
          ] } }
    ],
    explore: { component: C10_MathematicsTrigonometricIdentitiessin2aSim, prompt: 'Explore the interactive — Trigonometric Identitiessin2a' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_08_001', difficulty: 'standard',
          question: 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are.',
          hint: 'If stuck, revisit c8_math_ch9_8 (Pythagoras theorem applications) and c6_math_ch06_063.',
          misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle.',
          parts: [
                { id: 'a', prompt: 'In a right triangle PQR, right-angled at Q, PQ = 12 cm and QR = 5 cm. Find sin R, cos R, and tan R. (Angle R is at vertex R.)', answer: 'Step 1: Identify sides relative to angle R',
                  options: ['Step 1: Identify sides relative to angle R', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' },
                { id: 'b', prompt: 'In right triangle XYZ, right-angled at Y, sin X = 3/5. Without finding the actual side lengths, determine the value of cos X and tan X. Explain your reasoning.', answer: 'Given sin X = 3/5 = opposite/hypotenuse',
                  options: ['Given sin X = 3/5 = opposite/hypotenuse', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' }
          ],
            remediations: { 'students-consistently-confuse-opposite-and': { steps: ['If a student makes this error, do not just re-teach definitions.', 'Instead: (1) Give them a right triangle cut-out with angles marked 30° and 60°.', '(2) Ask them to place a finger on the 30° angle and point to the side directly across — that\'s opposite for 30°.', '(3) Then move finger to 60° angle and point across — that\'s opposite for 60°.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle.',
          parts: [
                { id: 'a', prompt: 'A student solves the following problem: "In right triangle ABC, right-angled at B, AB = 6 cm, BC = 8 cm.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' },
                { id: 'b', prompt: 'Create a real-world problem (using Indian context: rupees, metres, kg, litres) that requires finding an unknown side of a right triangle using one of sin, cos,.', answer: 'Example problem: A ladder 10 metres long leans against a vertical wall',
                  options: ['Example problem: A ladder 10 metres long leans against a vertical wall', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' },
                { id: 'c', prompt: 'In right triangle XYZ, right-angled at Y, sin X = 3/5. Without finding the actual side lengths, determine the value of cos X and tan X. Explain your reasoning.', answer: 'Given sin X = 3/5 = opposite/hypotenuse',
                  options: ['Given sin X = 3/5 = opposite/hypotenuse', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle at the base vs angle.' }
          ],
            remediations: { 'students-consistently-confuse-opposite-and': { steps: ['If a student makes this error, do not just re-teach definitions.', 'Instead: (1) Give them a right triangle cut-out with angles marked 30° and 60°.', '(2) Ask them to place a finger on the 30° angle and point to the side directly across — that\'s opposite for 30°.', '(3) Then move finger to 60° angle and point across — that\'s opposite for 60°.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_004', difficulty: 'standard',
          question: 'The trigonometric ratios for 30° and 60° are exact values derived from a.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
          misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right',
                  options: ['The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios', 'In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.' }
          ],
            remediations: { 'students-consistently-confuse-which-ratio': { steps: ['If a student makes this confusion, do NOT just re-drill the values.', 'Instead: (1) Have them physically draw an equilateral triangle of side 2 cm on paper, label all sides and angles.', '(2) Fold or draw the perpendicular bisector to create the 30-60-90 triangle.', '(3) Label the 30° angle clearly.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.',
          parts: [
                { id: 'a', prompt: 'A student solved: "Find the value of (sin 60°)² + (cos 30°)²" and wrote: (√3/2)² + (√3/2)² = 3/4 + 3/4 = 6/4 = 3/2. Is this correct?', answer: 'The student\'s answer is INCORRECT',
                  options: ['The student\'s answer is INCORRECT', 'this is wrong because sin² + cos² = 1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.' }
          ],
            remediations: { 'students-consistently-confuse-which-ratio': { steps: ['If a student makes this confusion, do NOT just re-drill the values.', 'Instead: (1) Have them physically draw an equilateral triangle of side 2 cm on paper, label all sides and angles.', '(2) Fold or draw the perpendicular bisector to create the 30-60-90 triangle.', '(3) Label the 30° angle clearly.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_005', difficulty: 'standard',
          question: 'In a right-angled triangle with one acute angle measuring 45°, the.',
          hint: 'If stuck, revisit c8_math_ch9_4 (hypotenuse of isosceles right triangle) and.',
          misconception: 'Students write sin 45° = 1/√2 and cos 45° = 1/√2 but fail to rationalise the denominator to √2/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios',
                  options: ['In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right', 'In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write sin 45° = 1/√2 and cos 45° = 1/√2 but fail to rationalise the denominator to √2/2.' }
          ],
            remediations: { 'students-write-sin-45-1': { steps: ['Have the student draw a 45°-45°-90° triangle with legs = 1, compute hypotenuse = √2 using Pythagoras (c8_math_ch9_5).', 'Write sin 45° = 1/√2, then explicitly multiply numerator and denominator by √2 to get √2/2 — say aloud: "We rationalise.', 'Practice 5 rapid-fire evaluations: sin²45° + cos²45°, 2 sin 45° cos 45°, tan 45° + cot 45°, forcing rationalised form.', 'Give a mixed problem with 30°, 45°, 60° to prevent overgeneralising the "hypotenuse = 2" pattern from 30°-60°-90°.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_006', difficulty: 'standard',
          question: 'In a right-angled triangle, for any acute angle θ, the sum of the square of the.',
          hint: 'Revisit the Pythagorean theorem (c8_math_ch9_5) and the definitions of trigonometric.',
          misconception: 'Students often write sinθ + cosθ = 1 instead of sin²θ + cos²θ = 1, especially when substituting values.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ',
                  options: ['In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right', 'In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write sinθ + cosθ = 1 instead of sin²θ + cos²θ = 1, especially when substituting values.' }
          ],
            remediations: { 'students-often-write-sin-cos': { steps: ['If a student writes sinθ + cosθ = 1, draw a right triangle with sides 3, 4, 5.', 'Show sinθ = 3/5, cosθ = 4/5, then compute sinθ + cosθ = 7/5 ≠ 1, but sin²θ + cos²θ = 9/25 + 16/25 = 1.', 'Emphasize that the identity comes from dividing the Pythagorean theorem (p²+b²=h²) by h², so the squares are essential.', 'For sign errors, remind them that in Class 10, θ is acute (0°<θ<90°), so all trigonometric ratios are positive.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_007', difficulty: 'standard',
          question: 'The identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) holds for all angles.',
          hint: 'Revisit c10_math_cbse_08_006 (fundamental identity) and c10_math_cbse_08_001.',
          misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\),.',
          parts: [
                { id: 'a', prompt: 'Explain step-by-step how dividing \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by \\(\\cos^2\\theta\\) gives \\(1 + \\tan^2\\theta = \\sec^2\\theta\\).', answer: 'Dividing each term: \\(\\frac{\\sin^2\\theta}{\\cos^2\\theta} +',
                  options: ['Dividing each term: \\(\\frac{\\sin^2\\theta}{\\cos^2\\theta} +', '\\(\\cos\\theta\\) cannot be zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), incorrectly assuming.' },
                { id: 'b', prompt: 'Compare the identities \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and \\(1 + \\tan^2\\theta = \\sec^2\\theta\\). Which is more fundamental? How are their domains different?', answer: '\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental',
                  options: ['\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental', 'both hold for all angles', 'they are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), incorrectly assuming.' }
          ],
            remediations: { 'students-write-sec-theta-1': { steps: ['**Algebra fix**: Write \\(\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\) but \\(3 + 4 = 7\\).', 'Emphasise: \\(\\sqrt{a^2 + b^2} \\neq a + b\\).', 'Practice with numbers first.', '**Derivation drill**: Have the student re-derive the identity from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by dividing by.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\),.',
          parts: [
                { id: 'a', prompt: 'Compare the identities \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and \\(1 + \\tan^2\\theta = \\sec^2\\theta\\). Which is more fundamental? How are their domains different?', answer: '\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental',
                  options: ['\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental', 'both hold for all angles', 'they are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), incorrectly assuming.' }
          ],
            remediations: { 'students-write-sec-theta-1': { steps: ['**Algebra fix**: Write \\(\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\) but \\(3 + 4 = 7\\).', 'Emphasise: \\(\\sqrt{a^2 + b^2} \\neq a + b\\).', 'Practice with numbers first.', '**Derivation drill**: Have the student re-derive the identity from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by dividing by.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_008', difficulty: 'standard',
          question: 'The identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\) is a fundamental Pythagorean.',
          hint: 'Revisit c10_math_cbse_08_006 (derivation of \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) from.',
          misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 =.',
          parts: [
                { id: 'a', prompt: 'Explain why dividing \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) by \\(\\sin^2\\theta\\) gives \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\), and why we cannot divide by.', answer: 'Dividing by \\(\\sin^2\\theta\\) yields \\(\\frac{\\sin^2\\theta}{\\sin^2\\theta} +',
                  options: ['Dividing by \\(\\sin^2\\theta\\) yields \\(\\frac{\\sin^2\\theta}{\\sin^2\\theta} +', 'both give the same result', '1 + something² = something else²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' },
                { id: 'b', prompt: 'If \\(\\cot\\theta = \\frac{12}{5}\\) and \\(\\theta\\) is acute, find the value of \\(\\cosec\\theta\\) using the identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\).', answer: 'Given \\(\\cot\\theta = \\frac{12}{5}\\)',
                  options: ['Given \\(\\cot\\theta = \\frac{12}{5}\\)', '1 + something² = something else²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' },
                { id: 'c', prompt: 'Compare the two identities \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) and \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\).', answer: 'Given \\(\\tan\\theta = \\frac{3}{4}\\), we cannot directly use \\(1 + \\cot^2\\theta =',
                  options: ['Given \\(\\tan\\theta = \\frac{3}{4}\\), we cannot directly use \\(1 + \\cot^2\\theta =', '1 + something² = something else²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' }
          ],
            remediations: { 'students-incorrectly-write-cot-2': { steps: ['If a student makes the squaring error, do NOT just say "remember to square." Instead: Step 1 — Write the identity in.', 'Step 2 — Use a coloured pen to put brackets around each function: \\(1 + (\\cot\\theta)^2 = (\\cosec\\theta)^2\\).', 'Step 3 — Substitute a value like \\(\\cot\\theta = \\frac{3}{4}\\) inside the brackets: \\(1 + \\left(\\frac{3}{4}\\right)^2\\).', 'Step 4 — Say aloud: "The bracket means square the whole fraction." Step 5 — Practice 5 problems where they must write.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 =.',
          parts: [
                { id: 'a', prompt: 'Create a real-world problem involving a right triangle where the given information is the cotangent of an acute angle, and the question asks for the cosecant.', answer: 'Example problem: "During Sankranti festival, Ravi flies a kite',
                  options: ['Example problem: "During Sankranti festival, Ravi flies a kite', '1 + something² = something else²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly write \\(\\cot^2\\theta + 1 = \\cosec\\theta\\) (missing the square on cosecant) or \\(\\cot\\theta + 1 = \\cosec^2\\theta\\).' }
          ],
            remediations: { 'students-incorrectly-write-cot-2': { steps: ['If a student makes the squaring error, do NOT just say "remember to square." Instead: Step 1 — Write the identity in.', 'Step 2 — Use a coloured pen to put brackets around each function: \\(1 + (\\cot\\theta)^2 = (\\cosec\\theta)^2\\).', 'Step 3 — Substitute a value like \\(\\cot\\theta = \\frac{3}{4}\\) inside the brackets: \\(1 + \\left(\\frac{3}{4}\\right)^2\\).', 'Step 4 — Say aloud: "The bracket means square the whole fraction." Step 5 — Practice 5 problems where they must write.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
