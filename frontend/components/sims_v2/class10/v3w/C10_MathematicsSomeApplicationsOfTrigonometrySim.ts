import type { SimDef } from '../../engine/types';
import C10_MathematicsSomeApplicationsOfTrigonometrySim from '../../../simulations/c6_12/C10_MathematicsSomeApplicationsOfTrigonometrySim';

/** v3 wrapped master — C10_MathematicsSomeApplicationsOfTrigonometrySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicssomeapplicationsoftrigonometrysim: SimDef = {
    id: 'v3w_c10_mathematicssomeapplicationsoftrigonometrysim',
    title: 'Trigonometric Ratios of 30 and 60 Degrees',
    subtitle: 'This node covers the exact values of all six trigonometric ratios (sin, cos, tan, cosec,.',
    classLevel: 10, subject: 'mathematics', topic: 'Trigonometric Ratios of 30 and 60 Degrees',
    chapters: [],
    nodeIds: ['c10_math_cbse_08_004', 'c10_math_cbse_08_007', 'c10_math_cbse_08_008', 'c10_math_cbse_08_010', 'c10_math_cbse_09_001', 'c10_math_cbse_08_001', 'c10_math_cbse_08_002', 'c10_math_cbse_08_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are designing a triangular roof truss for a house in Kerala where the roof makes a 30° angle with.', goal: 'Master Trigonometric Ratios of 30 and 60 Degrees.' },
    discovery: {
        question: 'Compare the identities \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) and \\(1 + \\tan^2\\theta = \\sec^2\\theta\\). Which is more fundamental? How are their domains different?',
        options: ['\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental', 'both hold for all angles', 'they are the same'],
        answer: '\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) is more fundamental',
        hook: 'Students write \\(\\sec\\theta = 1 + \\tan\\theta\\) after taking square root of \\(1 + \\tan^2\\theta = \\sec^2\\theta\\),.',
    },
    teaching: [
        { title: 'The trigonometric ratios for 30° and 60° are.', text: 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right triangle (half of an equilateral triangle).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_004', title: 'The trigonometric ratios for 30° and.',
          scaffold: { problem: 'A 12-metre long wire is tied from the top of a vertical pole to a point on the ground. The wire makes an angle of 30° with the ground.',
            steps: [
            { text: 'Draw a right triangle representing the situation. The wire is the hypotenuse = 12 m. The angle with the ground is 30°.' },
            { text: 'Identify the trigonometric ratios to use. For height (opposite): sin 30° = opposite/hypotenuse.' },
            { text: 'Substitute known values. sin 30° = 1/2 = height/12. cos 30° = √3/2 = distance/12.' },
            { text: 'Solve for height: height = 12 × (1/2) = 6 m. Solve for distance: distance = 12 × (√3/2) = 6√3 m.' },
            { text: 'Verify using Pythagoras: height² + distance² = 6² + (6√3)² = 36 + 108 = 144 = 12². Verified.', faded: true, blankAnswer: 'Height of pole = 6 m; Distance from foot = 6√3 m (≈ 10.39 m)' }
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_010', title: 'Applications of trigonometric.',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a tower as θ.',
            steps: [
            { text: 'Identify the given expression: (sec²θ - 1) / (cosec²θ - 1). Note the Pythagorean identities: 1 + tan²θ = sec²θ ⇒ sec²θ.' },
            { text: 'Substitute these into the expression: (tan²θ) / (cot²θ).' },
            { text: 'Recall cotθ = 1/tanθ, so cot²θ = 1/tan²θ. The expression becomes tan²θ / (1/tan²θ) = tan²θ × tan²θ = tan⁴θ.' },
            { text: 'Wait — the problem states this should equal tan²θ. There is a discrepancy.' },
            { text: 'Verify at θ = 30°: tan 30° = 1/√3, tan²30° = 1/3, tan⁴30° = 1/9.', faded: true, blankAnswer: 'tan⁴θ (which equals 1/9 at θ = 30°)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_09_001', title: 'The line of sight is the straight line.',
          scaffold: { problem: 'A person standing on the ground looks up at the top of a 30 m tall tower. The angle of elevation is 45°.',
            steps: [
            { text: 'Draw the diagram. Tower = vertical side (30 m), distance = horizontal side (unknown d), line of sight = hypotenuse from.' },
            { text: 'Angle of elevation = 45° (between line of sight and horizontal).' },
            { text: 'Identify the ratio: tan 45° = opposite/adjacent = height/distance = 30/d.' },
            { text: 'Since tan 45° = 1, we have 1 = 30/d, so d = 30 m.' },
            { text: 'The person is 30 m from the base of the tower.', faded: true, blankAnswer: 'The person is 30 m from the base of the tower.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_08_001', title: 'In a right-angled triangle, for an.',
          scaffold: { problem: 'A 15-metre long wire is tied from the top of a vertical electric pole to a point on the ground.',
            steps: [
            { text: 'Draw a right triangle where the pole is the vertical side (opposite to 30°), the ground distance is the horizontal side.' },
            { text: 'To find the height of the pole (opposite side), use sin 30° = opposite/hypotenuse. Substitute: 1/2 = height / 15.' },
            { text: 'Solve for height: height = 15 × 1/2 = 7.5 m.' },
            { text: 'To find the ground distance (adjacent side), use cos 30° = adjacent/hypotenuse. Substitute: √3/2 = distance / 15.' },
            { text: 'Solve for distance: distance = 15 × √3/2 = (15√3)/2 ≈ 12.99 m.', faded: true, blankAnswer: 'Height of pole = 7.5 m; Distance from foot = (15√3)/2 m ≈.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_08_007', title: 'Identify each idea',
          dissect: { specimen: 'Trigonometric Ratios of 30 and 60 Degrees', spots: [
            { id: 's1', label: 'The trigonometric ratios for 30', prompt: 'Which idea is this? — The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right.', answer: 'The trigonometric ratios for 30', options: ['The trigonometric ratios for 30', 'The identity 1 tan2theta', 'The identity 1 cot2theta', 'Applications of trigonometric identities in'] },
            { id: 's2', label: 'The identity 1 tan2theta', prompt: 'Which idea is this? — The identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) holds for all angles \\(\\theta\\) where.', answer: 'The identity 1 tan2theta', options: ['The identity 1 tan2theta', 'The trigonometric ratios for 30', 'The identity 1 cot2theta', 'Applications of trigonometric identities in'] },
            { id: 's3', label: 'The identity 1 cot2theta', prompt: 'Which idea is this? — The identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\) is a fundamental Pythagorean.', answer: 'The identity 1 cot2theta', options: ['The identity 1 cot2theta', 'The trigonometric ratios for 30', 'The identity 1 tan2theta', 'Applications of trigonometric identities in'] },
            { id: 's4', label: 'Applications of trigonometric identities in', prompt: 'Which idea is this? — Applications of trigonometric identities in simplification refer to the systematic.', answer: 'Applications of trigonometric identities in', options: ['Applications of trigonometric identities in', 'The trigonometric ratios for 30', 'The identity 1 tan2theta', 'The identity 1 cot2theta'] },
            { id: 's5', label: 'The line of sight is', prompt: 'Which idea is this? — The line of sight is the straight line drawn from the eye of an observer to the point.', answer: 'The line of sight is', options: ['The line of sight is', 'The trigonometric ratios for 30', 'The identity 1 tan2theta', 'The identity 1 cot2theta'] },
            { id: 's6', label: 'In a right-angled triangle for', prompt: 'Which idea is this? — In a right-angled triangle, for an acute angle θ, the trigonometric ratios are defined.', answer: 'In a right-angled triangle for', options: ['In a right-angled triangle for', 'The trigonometric ratios for 30', 'The identity 1 tan2theta', 'The identity 1 cot2theta'] }
          ] } }
    ],
    explore: { component: C10_MathematicsSomeApplicationsOfTrigonometrySim, prompt: 'Explore the interactive — Trigonometric Ratios of 30 and 60 Degrees' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_08_004', difficulty: 'standard',
          question: 'The trigonometric ratios for 30° and 60° are exact values derived from a.',
          hint: 'If stuck, revisit c8_math_ch9_5 (Pythagoras theorem statement and visual proof) and.',
          misconception: 'Students consistently confuse which ratio corresponds to which angle in a 30-60-90 triangle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right',
                  options: ['The trigonometric ratios for 30° and 60° are exact values derived from a 30-60-90 right', 'The identity \\(1 + \\tan^2\\theta = \\sec^2\\theta\\) holds for all angles \\(\\theta\\) where', 'The identity \\(1 + \\cot^2\\theta = \\cosec^2\\theta\\) is a fundamental Pythagorean', 'Applications of trigonometric identities in simplification refer to the systematic'],
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
            remediations: { 'students-incorrectly-write-cot-2': { steps: ['If a student makes the squaring error, do NOT just say "remember to square." Instead: Step 1 — Write the identity in.', 'Step 2 — Use a coloured pen to put brackets around each function: \\(1 + (\\cot\\theta)^2 = (\\cosec\\theta)^2\\).', 'Step 3 — Substitute a value like \\(\\cot\\theta = \\frac{3}{4}\\) inside the brackets: \\(1 + \\left(\\frac{3}{4}\\right)^2\\).', 'Step 4 — Say aloud: "The bracket means square the whole fraction." Step 5 — Practice 5 problems where they must write.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_08_010', difficulty: 'standard',
          question: 'Applications of trigonometric identities in simplification refer to the.',
          hint: 'If stuck, revisit c8_math_ch6_8 (difference of squares factoring) and.',
          misconception: 'Students treat trigonometric identities as "replacement rules" to be applied blindly without checking algebraic.',
          parts: [
                { id: 'a', prompt: 'A student simplifies (sec²θ - 1) / tan²θ as follows: "sec²θ - 1 = tan²θ from the identity, so the expression becomes tan²θ / tan²θ = 1." Is this simplification.', answer: 'No, it is not valid at θ = 0°',
                  options: ['No, it is not valid at θ = 0°', 'condition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat trigonometric identities as "replacement rules" to be applied blindly without checking algebraic structure.' }
          ],
            remediations: { 'students-treat-trigonometric-identities-as': { steps: ['When a student makes the above error: Step 1 — Ask: "Before substituting any identity, what algebraic pattern do you.', 'Step 2 — Say: "Factor completely FIRST.', 'Only then look for trigonometric identities to replace the factored groups." Step 3 — Demonstrate on their wrong.', 'Now what identity applies to the second bracket?" Step 4 — Have them redo three similar problems where factoring first.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_001', difficulty: 'standard',
          question: 'The line of sight is the straight line drawn from the eye of an observer to the.',
          hint: 'Review trigonometric ratios (c10_math_cbse_08_001) and their values for standard angles.',
          misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.',
          parts: [
                { id: 'a', prompt: 'A student stands 20 m from a building and looks up at a window. She draws the angle from the vertical (not the horizontal). What error has she made?', answer: 'The angle of elevation is always measured from the horizontal, not the vertical',
                  options: ['The angle of elevation is always measured from the horizontal, not the vertical', 'no error, it doesn\'t matter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.' }
          ],
            remediations: { 'students-often-measure-the-angle': { steps: ['Draw a large diagram with observer, object, horizontal line, line of sight, and label all angles and sides.', 'Practice identifying the angle of elevation vs depression in 5 different scenarios.', 'Emphasise: angle is ALWAYS from the horizontal.', 'Draw the horizontal line first.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.',
          parts: [
                { id: 'a', prompt: 'In the right triangle formed by the line of sight, the horizontal distance, and the vertical height, which side is the hypotenuse?', answer: 'The line of sight is always the hypotenuse',
                  options: ['The line of sight is always the hypotenuse', 'the horizontal distance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often measure the angle of elevation/depression from the vertical instead of the horizontal.' }
          ],
            remediations: { 'students-often-measure-the-angle': { steps: ['Draw a large diagram with observer, object, horizontal line, line of sight, and label all angles and sides.', 'Practice identifying the angle of elevation vs depression in 5 different scenarios.', 'Emphasise: angle is ALWAYS from the horizontal.', 'Draw the horizontal line first.'] } } },
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
            remediations: { 'students-consistently-confuse-opposite-and': { steps: ['If a student makes this error, do not just re-teach definitions.', 'Instead: (1) Give them a right triangle cut-out with angles marked 30° and 60°.', '(2) Ask them to place a finger on the 30° angle and point to the side directly across — that\'s opposite for 30°.', '(3) Then move finger to 60° angle and point across — that\'s opposite for 60°.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
