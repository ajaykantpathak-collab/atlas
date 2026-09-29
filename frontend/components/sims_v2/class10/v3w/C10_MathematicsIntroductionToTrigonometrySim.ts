import type { SimDef } from '../../engine/types';
import C10_MathematicsIntroductionToTrigonometrySim from '../../../simulations/c6_12/C10_MathematicsIntroductionToTrigonometrySim';

/** v3 wrapped master — C10_MathematicsIntroductionToTrigonometrySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsintroductiontotrigonometrysim: SimDef = {
    id: 'v3w_c10_mathematicsintroductiontotrigonometrysim',
    title: 'Trigonometric Ratios: sin, cos, tan in a Right Triangle',
    subtitle: 'This node covers the definition and computation of sin θ, cos θ, tan θ for acute angles.',
    classLevel: 10, subject: 'mathematics', topic: 'Trigonometric Ratios: sin, cos, tan in a Right Triangle',
    chapters: [],
    nodeIds: ['c10_math_cbse_08_001', 'c10_math_cbse_08_002', 'c10_math_cbse_08_003', 'c10_math_cbse_08_004', 'c10_math_cbse_08_005', 'c10_math_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are standing 20 metres away from the base of a mobile tower in your neighbourhood and you want to.', goal: 'Master Trigonometric Ratios: sin, cos, tan in a Right Triangle.' },
    discovery: {
        question: 'In a right triangle PQR, right-angled at Q, PQ = 12 cm and QR = 5 cm. Find sin R, cos R, and tan R. (Angle R is at vertex R.)',
        options: ['Step 1: Identify sides relative to angle R', 'opposite', 'adjacent'],
        answer: 'Step 1: Identify sides relative to angle R',
        hook: 'Students consistently confuse "opposite" and "adjacent" when the reference angle is not the standard one (e.g., angle.',
    },
    teaching: [
        { title: 'In a right-angled triangle, for an acute.', text: 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined as: sine θ = length of side opposite to θ / length of hypotenuse, cosine θ = length of side adjacent to θ /.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_002', title: 'In a right-angled triangle, for an.',
          scaffold: { problem: 'In ΔABC, right-angled at B, AB = 24 cm, BC = 7 cm. Find the values of cosec A, sec A, and cot A.',
            steps: [
            { text: 'Identify the sides relative to angle A. Angle A is at vertex A. Opposite side = BC = 7 cm. Adjacent side = AB = 24 cm.' },
            { text: 'Compute the hypotenuse AC using Pythagoras theorem: AC² = AB² + BC² = 24² + 7² = 576 + 49 = 625. So AC = √625 = 25 cm.' },
            { text: 'Write the primary ratios for angle A: sin A = Opposite/Hypotenuse = 7/25; cos A = Adjacent/Hypotenuse = 24/25; tan A =.' },
            { text: 'Take reciprocals to get the required ratios: cosec A = 1/sin A = 25/7; sec A = 1/cos A = 25/24; cot A = 1/tan A = 24/7.' },
            { text: 'Verify: All ratios are > 0 (acute angle). cosec A = 25/7 ≈ 3.57, sec A = 25/24 ≈ 1.04, cot A = 24/7 ≈ 3.43.', faded: true, blankAnswer: 'cosec A = 25/7, sec A = 25/24, cot A = 24/7' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_003', title: 'The trigonometric ratios for angles of.',
          scaffold: { problem: 'A 10 m long wire is tied to the top of a vertical pole and fixed to the ground.',
            steps: [
            { text: 'Identify the right triangle. The pole is the perpendicular (opposite side), the ground distance is the base (adjacent.' },
            { text: 'For the first position, θ = 90°. We need the vertical height = opposite side = P. Use sin θ = P/H → P = H sin θ.' },
            { text: 'Substitute θ = 90°, H = 10 m. sin 90° = 1. So P = 10 × 1 = 10 m.' },
            { text: 'For the second position, θ = 0°. Again P = H sin θ. sin 0° = 0. So P = 10 × 0 = 0 m.' },
            { text: 'Interpret: At 90° the wire is vertical, so the attachment point is at the full wire length (10 m) above ground.', faded: true, blankAnswer: 'At 90° height = 10 m; at 0° height = 0 m.' }
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
        { type: 'dissect', nodeId: 'c10_math_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Trigonometric Ratios: sin, cos, tan in a Right Triangle', spots: [
            { id: 's1', label: 'In a right-angled triangle for', prompt: 'Which idea is this? — In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined.', answer: 'In a right-angled triangle for', options: ['In a right-angled triangle for', 'The trigonometric ratios for angles', 'The trigonometric ratios for 30', 'In a right-angled triangle with'] },
            { id: 's2', label: 'The trigonometric ratios for angles', prompt: 'Which idea is this? — The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of.', answer: 'The trigonometric ratios for angles', options: ['The trigonometric ratios for angles', 'In a right-angled triangle for', 'The trigonometric ratios for 30', 'In a right-angled triangle with'] },
            { id: 's3', label: 'The trigonometric ratios for 30', prompt: 'Which idea is this? — The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right.', answer: 'The trigonometric ratios for 30', options: ['The trigonometric ratios for 30', 'In a right-angled triangle for', 'The trigonometric ratios for angles', 'In a right-angled triangle with'] },
            { id: 's4', label: 'In a right-angled triangle with', prompt: 'Which idea is this? — In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios.', answer: 'In a right-angled triangle with', options: ['In a right-angled triangle with', 'In a right-angled triangle for', 'The trigonometric ratios for angles', 'The trigonometric ratios for 30'] }
          ] } }
    ],
    explore: { component: C10_MathematicsIntroductionToTrigonometrySim, prompt: 'Explore the interactive — Trigonometric Ratios: sin, cos, tan in a Right Triangle' },
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
        { type: 'subpart', nodeId: 'c10_math_cbse_08_002', difficulty: 'standard',
          question: 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric.',
          hint: 'Revisit c10_math_cbse_08_001 for triangle labeling, and c6_math_ch03_036 for fraction.',
          misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.',
          parts: [
                { id: 'a', prompt: 'In a right triangle ABC, right-angled at B, if sin A = 4/5, what is the value of cosec A?', answer: 'cosec A = 5/4',
                  options: ['cosec A = 5/4', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' },
                { id: 'b', prompt: 'A student writes: sec θ = 1/cos θ = Adjacent/Hypotenuse. Is this correct? Explain why or why not.', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'sec = 1/cos', 'opposite'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' },
                { id: 'c', prompt: 'Given that tan θ = 7/24 for an acute angle θ, find the values of sin θ and cosec θ without using a calculator. Explain your reasoning.', answer: 'tan θ = 7/24 ⇒ Opposite = 7k, Adjacent = 24k',
                  options: ['tan θ = 7/24 ⇒ Opposite = 7k, Adjacent = 24k', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' }
          ],
            remediations: { 'students-often-confuse-which-side': { steps: ['Draw a right triangle with angle θ, label sides O, A, H.', 'Write sin = O/H, cos = A/H, tan = O/A.', 'Then physically flip each fraction with a coloured pen: cosec = H/O, sec = H/A, cot = A/O.', 'Say aloud: "cosec flips sin, so hypotenuse goes on top." Practice with 3 specific triangles: (3,4,5), (5,12,13),.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.',
          parts: [
                { id: 'a', prompt: 'A student solves: "If sec θ = 13/5, find cos θ." Their working: cos θ = 1/sec θ = 1/(13/5) = 5/13.', answer: 'Yes, the conclusion is correct',
                  options: ['Yes, the conclusion is correct', 'because', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' },
                { id: 'b', prompt: 'Create a real-life problem (with Indian context) where a surveyor needs to use cot θ to find the height of a tower, given the distance from the tower and the.', answer: 'Example: A surveyor stands 20 m from the base of a tower in Delhi',
                  options: ['Example: A surveyor stands 20 m from the base of a tower in Delhi', 'opposite', 'adjacent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse which side is "opposite" and "adjacent" when switching between tan and cot.' }
          ],
            remediations: { 'students-often-confuse-which-side': { steps: ['Draw a right triangle with angle θ, label sides O, A, H.', 'Write sin = O/H, cos = A/H, tan = O/A.', 'Then physically flip each fraction with a coloured pen: cosec = H/O, sec = H/A, cot = A/O.', 'Say aloud: "cosec flips sin, so hypotenuse goes on top." Practice with 3 specific triangles: (3,4,5), (5,12,13),.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_003', difficulty: 'standard',
          question: 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting.',
          hint: 'Revisit c10_math_cbse_08_001 and c10_math_cbse_08_002 to practise writing all six ratios.',
          misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).',
          parts: [
                { id: 'a', prompt: 'Evaluate: 2 sin 0° + 3 cos 90° − 4 tan 0° + 5 cot 90°.', answer: 'Substitute: sin 0° = 0, cos 90° = 0, tan 0° = 0, cot 90° = 0',
                  options: ['Substitute: sin 0° = 0, cos 90° = 0, tan 0° = 0, cot 90° = 0', 'not defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).' },
                { id: 'b', prompt: 'Compare the behaviour of sec θ and cos θ as θ increases from 0° to 90°. What happens to their values at the endpoints?', answer: 'cos θ decreases from 1 to 0',
                  options: ['cos θ decreases from 1 to 0', 'tends to infinity', 'is not defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).' }
          ],
            remediations: { 'students-treat-not-defined-as': { steps: ['Draw a right triangle with angle θ. Label opposite (P), adjacent (B), hypotenuse (H).', 'Ask: "As θ → 0°, what happens to P, B, H?" (P → 0, B → H).', 'Write each ratio (sin = P/H, cos = B/H, tan = P/B, cosec = H/P, sec = H/B, cot = B/P).', 'Substitute the limits: P=0, B=H.', 'Identify which ratios have denominator 0 (cosec, cot at 0°; tan, sec at 90°).', 'Explicitly state: "Division by zero is not defined in mathematics. We write \'not defined\', not ∞."', 'Practice 5 similar limit substitutions until the student can verbalise the reasoning without writing the triangle.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).',
          parts: [
                { id: 'a', prompt: 'A student writes: "sin 90° = 1, therefore cosec 90° = 1/1 = 1. Also cos 0° = 1, therefore sec 0° = 1/1 = 1.', answer: 'The student is partially correct but misses critical exceptions',
                  options: ['The student is partially correct but misses critical exceptions', 'reciprocals are always both defined, ignoring division by zero in tan/cot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).' },
                { id: 'b', prompt: 'Compare the behaviour of sec θ and cos θ as θ increases from 0° to 90°. What happens to their values at the endpoints?', answer: 'cos θ decreases from 1 to 0',
                  options: ['cos θ decreases from 1 to 0', 'tends to infinity', 'is not defined'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "not defined" as a numerical value like 0 or ∞ (infinity).' }
          ],
            remediations: { 'students-treat-not-defined-as': { steps: ['Draw a right triangle with angle θ. Label opposite (P), adjacent (B), hypotenuse (H).', 'Ask: "As θ → 0°, what happens to P, B, H?" (P → 0, B → H).', 'Write each ratio (sin = P/H, cos = B/H, tan = P/B, cosec = H/P, sec = H/B, cot = B/P).', 'Substitute the limits: P=0, B=H.', 'Identify which ratios have denominator 0 (cosec, cot at 0°; tan, sec at 90°).', 'Explicitly state: "Division by zero is not defined in mathematics. We write \'not defined\', not ∞."', 'Practice 5 similar limit substitutions until the student can verbalise the reasoning without writing the triangle.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_004', difficulty: 'standard',
          question: 'The trigonometric ratios for 30° and 60° are exact values derived from a.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
          misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right',
                  options: ['The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
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
                  options: ['In a right-angled triangle with one acute angle measuring 45°, the trigonometric ratios', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
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
                  options: ['In a right-angled triangle, for any acute angle θ, the sum of the square of the sine of θ', 'In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined', 'In a right-angled triangle, for an acute angle θ, the reciprocal trigonometric ratios are', 'The trigonometric ratios for angles of 0° and 90° are defined as the limiting values of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write sinθ + cosθ = 1 instead of sin²θ + cos²θ = 1, especially when substituting values.' }
          ],
            remediations: { 'students-often-write-sin-cos': { steps: ['If a student writes sinθ + cosθ = 1, draw a right triangle with sides 3, 4, 5.', 'Show sinθ = 3/5, cosθ = 4/5, then compute sinθ + cosθ = 7/5 ≠ 1, but sin²θ + cos²θ = 9/25 + 16/25 = 1.', 'Emphasize that the identity comes from dividing the Pythagorean theorem (p²+b²=h²) by h², so the squares are essential.', 'For sign errors, remind them that in Class 10, θ is acute (0°<θ<90°), so all trigonometric ratios are positive.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
