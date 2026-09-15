import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch03_p2: SimDef = {
    id: 'v3_c11_math_ch03_p2',
    title: 'Trigonometric Functions · Part 2/3',
    subtitle: 'Convert between degrees and radians without flipping the fraction.',
    classLevel: 11, subject: 'mathematics', topic: 'Trigonometric Functions · Part 2/3',
    chapters: ['c11_math_ch03'],
    nodeIds: ['c11_math_cbse_03_007', 'c11_math_cbse_03_008', 'c11_math_cbse_03_009', 'c11_math_cbse_03_010', 'c11_math_cbse_03_011', 'c11_math_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ride designer translating a safety limit into controller units', intro: 'A Ferris wheel spins three times a minute — the operator says 1080°, the physics wants radians per second; one ratio bridges them.', goal: 'Convert degrees↔radians exactly and apply l = rθ only in radian measure.' },
    discovery: {
        question: 'A wheel of radius 0.5 m turns through 120°. Distance travelled by a rim point: 0.5 × 120 = 60 m?',
        options: ['No — l = rθ only works in radians: convert 120° to 2π/3, giving π/3 m ≈ 1.05 m', 'Yes — multiply radius by the angle', 'Yes — but convert to 60 km', 'No — the answer is 0.5 × 360 = 180 m'],
        answer: 'No — l = rθ only works in radians: convert 120° to 2π/3, giving π/3 m ≈ 1.05 m',
        hook: 'A radian is a pure ratio — arc over radius — which is why calculus and physics refuse to work in degrees.',
    },
    teaching: [
        { title: 'Domain and Range of Trigonometric Functions', text: 'The domain of a trigonometric function is the set of all real numbers (angles in radians) for which the function is defined, and the range is the set of all possible output values.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_03_007', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Convert 22°30′ into an exact multiple of π, then judge whether \'multiply by 57.3\' is ever acceptable for exact answers.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_03_007', title: 'Domain and Range of Trigonometric Functions',
          caseStudy: { intro: 'Imagine you are designing a rotating sprinkler system for a circular garden in Pune.',
            decisions: [{ prompt: 'State the domain and range of the function y = sec x in set notation.', options: [
                { text: 'Domain: {x ∈ ℝ | x ≠ (2n+1)π/2, n ∈ ℤ}', outcome: 'Domain: {x ∈ ℝ | x ≠ (2n+1)π/2, n ∈ ℤ}; Range: {y ∈ ℝ | y ≤ -1 or y ≥ 1} or (-∞, -1] ∪ [1, ∞).' },
                { text: 'Domain: all real numbers', outcome: 'Not quite — Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting.', reveals: 'students-often-write-the-range' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_008', title: 'Trigonometric Identities: Pythagorean',
          scaffold: { problem: 'A kite is flying at a height of 75 metres above the ground, attached to a string inclined at an angle \\(x\\) to the horizontal.',
            steps: [
            { text: 'Identify given and unknown. Given: \\(\\cosec x = \\frac{5}{3}\\), height (opposite side) = 75 m.' },
            { text: 'Use reciprocal identity: \\(\\sin x = \\frac{1}{\\cosec x} = \\frac{3}{5}\\).' },
            { text: 'Use Pythagorean identity \\(\\sin^2 x + \\cos^2 x = 1\\) to find \\(\\cos x\\).' },
            { text: 'In the right triangle, \\(\\sin x = \\frac{\\text{height}}{\\text{string length}} \\Rightarrow \\frac{3}{5}.' },
            { text: '\\(\\cos x = \\frac{\\text{horizontal distance}}{\\text{string length}} \\Rightarrow \\frac{4}{5} = \\frac{\\text{horizontal.', faded: true, blankAnswer: 'String length = 125 m, horizontal distance = 100 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_009', title: 'Trigonometric Identities: Sum and Difference Formulas',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a temple tower from two points on the ground.',
            steps: [
            { text: 'Identify given values: tan α = 3/4, tan β = 4/3. Both angles are acute (positive tangent in QI), so α, β ∈ (0°, 90°).' },
            { text: 'Write the tangent sum formula: tan(α+β) = (tan α + tan β) / (1 - tan α tan β). Check domain: α, β, α+β ≠ 90° + n·180°.' },
            { text: 'Substitute values: tan(α+β) = (3/4 + 4/3) / (1 - (3/4)(4/3)) = (9/12 + 16/12) / (1 - 12/12) = (25/12) / (1 - 1).' },
            { text: 'Division by zero means tan(α+β) is undefined → α+β = 90° (or 270°, but α+β < 180°). So α+β = 90° exactly.' },
            { text: 'Interpretation: The lines of sight from A and B to the tower top are perpendicular (form a right angle).', faded: true, blankAnswer: 'tan(α+β) is undefined (approaches ∞); α+β = 90°. The lines.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_010', title: 'Trigonometric Identities: Double Angle',
          scaffold: { problem: 'A civil engineer is designing a wheelchair ramp. The initial design has an angle of inclination \\(\\theta\\) where \\(\\tan \\theta.',
            steps: [
            { text: 'Identify given: \\(\\tan \\theta = \\frac{5}{12}\\). Since \\(\\theta\\) is an acute ramp angle, \\(\\sin \\theta > 0, \\cos \\theta.' },
            { text: 'Choose formulas: \\(\\tan 2\\theta = \\frac{2\\tan \\theta}{1 - \\tan^2 \\theta}\\), \\(\\sin 2\\theta = 2\\sin \\theta \\cos.' },
            { text: 'Compute \\(\\tan 2\\theta\\): Numerator \\(= 2 \\times \\frac{5}{12} = \\frac{5}{6}\\).' },
            { text: 'Compute \\(\\sin 2\\theta = 2 \\times \\frac{5}{13} \\times \\frac{12}{13} = \\frac{120}{169}\\).' },
            { text: 'For a ramp length (hypotenuse) of 13 m, vertical rise \\(= 13 \\sin 2\\theta = 13 \\times \\frac{120}{169} = \\frac{120}{13}.', faded: true, blankAnswer: '\\(\\tan 2\\theta = \\frac{120}{119}, \\sin 2\\theta.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_011', title: 'Trigonometric Identities: Triple Angle',
          scaffold: { problem: 'A surveyor measures the angle of elevation to the top of a tower as θ from point A. Moving 50 m closer to the tower, the angle becomes 3θ.',
            steps: [
            { text: 'Identify given: tan θ = 1/√3, distance moved = 50 m, angles are θ and 3θ. We need tower height h.' },
            { text: 'From tan θ = 1/√3, deduce θ = 30° (since θ is acute, angle of elevation). Then 3θ = 90°.' },
            { text: 'Use triple-angle formula for tangent: tan 3θ = (3 tan θ − tan³ θ) / (1 − 3 tan² θ). Substitute tan θ = 1/√3.' },
            { text: 'Numerator = 3(1/√3) − 1/(3√3) = 3/√3 − 1/(3√3) = (9−1)/(3√3) = 8/(3√3). Denominator = 1 − 3(1/3) = 1 − 1 = 0.' },
            { text: 'Since 3θ = 90°, the second observation point is directly under the tower top?', faded: true, blankAnswer: 'Height = 50/√3 m ≈ 28.87 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_012', title: 'Transformation Formulae: Product to Sum',
          scaffold: { problem: 'A physics student records two sound waves: y₁ = 3 cos 400πt and y₂ = 3 cos 404πt (amplitude in mm, t in seconds).',
            steps: [
            { text: 'Write the sum y = 3 cos 400πt + 3 cos 404πt. Factor 3: y = 3(cos 400πt + cos 404πt).' },
            { text: 'Recognise this needs sum-to-product, but we can derive it from product-to-sum.' },
            { text: 'Let A = 404πt, B = 400πt. Then (A+B)/2 = 402πt, (A-B)/2 = 2πt.' },
            { text: 'y = 3 × 2 cos 402πt cos 2πt = 6 cos 402πt cos 2πt.' },
            { text: 'The resultant is a high-frequency wave (402π rad/s → 201 Hz) amplitude-modulated by a low-frequency envelope (2π rad/s.', faded: true, blankAnswer: 'y = 6 cos 402πt cos 2πt; beat frequency = 1 Hz.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_03_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Programming a Ferris-wheel controller that accepts only radians, your teammate converts the 45° safety limit by multiplying by 180/π \'to get radians\', and reads the spec \'30°30′\' as \'30.30 degrees\'.',
            decisions: [{ prompt: 'What conversions does he need to redo?', options: [
                { text: 'Fix the direction and the DMS: degrees→radians multiplies by π/180 (since 180° = π rad), so 45° = π/4 — his factor inverted the conversion. And minutes aren\'t decimals: 30′ = 30/60 = 0.5°, so 30°30′ = 30.5° — then convert. Radians matter because the measure is a pure arc/radius ratio, which is why formulas like v = rω want them.', outcome: 'The controller gets π/4 exactly, and the spec reads correctly — conversion follows unit cancellation, not a memorised multiplier.' },
                { text: 'Let the 180/π pass — multiply by whichever factor has π on top for radians.', outcome: 'The factor is chosen so degrees cancel: degrees × (π rad / 180 deg) = radians; using 180/π leaves degrees squared over radians.', reveals: 'conversion-factor-backwards' },
                { text: 'Accept 30.30° — the digits after the degree mark just move behind the decimal.', outcome: 'Minutes are sixtieths, not hundredths: 30′ is half a degree, so 30°30′ is 30.5° — a 0.2° error before conversion even begins.', reveals: 'minutes-are-decimals' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'Degrees × π/180 = radians; radians × 180/π = degrees — get the direction wrong and 90° becomes 16,200/π.',
            decisions: [{ prompt: 'What comes next? Trigonometric Functions · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Trigonometric Functions · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_03_007', difficulty: 'standard',
          question: 'The domain of a trigonometric function is the set of all real numbers (angles.',
          hint: 'Revisit the unit circle definition in c11_math_cbse_03_003 and the sign rules.',
          misconception: 'Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting that sec x = 1/cos x.',
          parts: [
                { id: 'a', prompt: 'State the domain and range of the function y = sec x in set notation.', answer: 'Domain: {x ∈ ℝ | x ≠ (2n+1)π/2, n ∈ ℤ}',
                  options: ['Domain: {x ∈ ℝ | x ≠ (2n+1)π/2, n ∈ ℤ}', 'Domain: all real numbers'],
                  hint: 'Revisit the unit circle definition in c11_math_cbse_03_003 and the sign rules.',
                  misconception: 'Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting that sec x = 1/cos x.' },
                { id: 'b', prompt: 'Find the domain of the function f(x) = tan x + cot x.', answer: 'tan x is undefined at x = (2n+1)π/2',
                  options: ['tan x is undefined at x = (2n+1)π/2', 'all real numbers except nπ'],
                  hint: 'Revisit the unit circle definition in c11_math_cbse_03_003 and the sign rules.',
                  misconception: 'Students often write the range of sec x as [-1, 1] because they confuse it with cos x, forgetting that sec x = 1/cos x.' }
          ],
            remediations: { 'students-often-write-the-range': { steps: ['If a student makes this error, do the following: 1) Draw a unit circle and mark a point with cos x = 1/2.', '2) Make a table: cos x = 1, 1/2, 1/4, 0.1 → sec x = 1, 2, 4, 10.', 'Show that as cos x → 0⁺, sec x → +∞.', '3) Repeat for negative cos x.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_008', difficulty: 'standard',
          question: 'The Pythagorean identities are three fundamental equations relating the squares.',
          hint: 'If stuck, revisit c11_math_cbse_03_005 (Trigonometric Functions of Any Angle) to review.',
          misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(\\sqrt{1 - \\cos^2 x}\\) and \\(\\sin x\\). Are they equivalent for all \\(x\\)?', answer: 'They are NOT equivalent for all \\(x\\)',
                  options: ['They are NOT equivalent for all \\(x\\)', 'yes, they are equal'],
                  hint: 'If stuck, revisit c11_math_cbse_03_005 (Trigonometric Functions of Any Angle) to review unit circle.',
                  misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant to determine the.' }
          ],
            remediations: { 'students-mechanically-apply-sin-x': { steps: ['**Revisit the unit circle**: Draw the unit circle, mark an angle in QIII (e.g., \\(210^\\circ\\)), and show that the.', 'Compute \\(\\cos^2 x + \\sin^2 x\\) numerically to verify it equals 1.', '**Practice sign determination**: Give 5 problems where \\(\\cos x\\) or \\(\\sin x\\) is given with quadrant, and the student.', 'Example: "\\(\\cos x = -\\frac{5}{13}\\), QII → \\(\\sin x = +\\frac{12}{13}\\) because sine is positive in QII." 3.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_009', difficulty: 'standard',
          question: 'The sum and difference formulas for trigonometric functions express the sine.',
          hint: 'Revisit c11_math_cbse_03_006 (Signs in Quadrants) and c11_math_cbse_03_008 (Pythagorean.',
          misconception: 'Students incorrectly distribute trigonometric functions over addition: sin(x+y) = sin x + sin y, cos(x+y) = cos x + cos.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sum and difference formulas for trigonometric functions express the sine, cosine,',
                  options: ['The sum and difference formulas for trigonometric functions express the sine, cosine,', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle'],
                  hint: 'Revisit c11_math_cbse_03_006 (Signs in Quadrants) and c11_math_cbse_03_008 (Pythagorean Identities).',
                  misconception: 'Students incorrectly distribute trigonometric functions over addition: sin(x+y) = sin x + sin y, cos(x+y) = cos x + cos y, tan(x+y) = tan.' }
          ],
            remediations: { 'students-incorrectly-distribute-trigonometric-fu': { steps: ['Have the student compute sin(30°+60°) numerically using calculator (sin 90° = 1) and compare with sin 30° + sin 60°.', 'Use the unit circle diagram from NCERT Fig 3.14: show that rotating by x then y gives coordinates (cos(x+y), sin(x+y)).', 'Practice the "target-oriented" proof method: write LHS and RHS separately, simplify LHS step-by-step to match RHS.', 'Drill the sign pattern in tan(x±y): "plus in numerator, minus in denominator for sum; minus in numerator, plus.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_010', difficulty: 'standard',
          question: 'Double angle formulas express trigonometric functions of angle \\(2x\\) in terms.',
          hint: 'Review sum/difference formulas (c11_math_cbse_03_009) and Pythagorean identities.',
          misconception: 'Students often write \\(\\cos 2x = 2\\cos x - 1\\) (forgetting the square on \\(\\cos x\\)) or \\(\\sin 2x = 2\\sin x\\).',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(1 - 2\\sin^2 x\\) and \\(2\\cos^2 x - 1\\). For what values of \\(x\\) are they equal? Prove your answer using a fundamental identity.', answer: 'They are equal for **all real \\(x\\)**',
                  options: ['They are equal for **all real \\(x\\)**', 'only when \\(\\sin x = \\cos x\\)'],
                  hint: 'Review sum/difference formulas (c11_math_cbse_03_009) and Pythagorean identities.',
                  misconception: 'Students often write \\(\\cos 2x = 2\\cos x - 1\\) (forgetting the square on \\(\\cos x\\)) or \\(\\sin 2x = 2\\sin x\\) (forgetting \\(\\cos x\\)).' }
          ],
            remediations: { 'students-often-write-cos-2x': { steps: ['Re-derive each formula from the sum identities: write \\(\\sin(x+x)\\), \\(\\cos(x+x)\\), \\(\\tan(x+x)\\) and simplify.', 'For \\(\\cos 2x\\), practice converting between the three forms using \\(\\sin^2 x + \\cos^2 x = 1\\) until it becomes.', 'When solving equations like \\(\\sin 2x = k\\), always write the interval for \\(2x\\) first (multiply the given interval.', 'For quadrant problems, determine the quadrant of \\(2x\\) from the quadrant of \\(x\\) (e.g., if \\(x \\in (\\frac{\\pi}{2}.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_011', difficulty: 'standard',
          question: 'The triple angle identities express trigonometric functions of 3θ in terms.',
          hint: 'If stuck, revisit c11_math_cbse_03_010 (Double Angle) and c11_math_cbse_03_009 (Sum and.',
          misconception: 'Students often write sin 3θ = 3 sin θ − 4 sin θ (forgetting the cube on the last term) or cos 3θ = 4 cos θ − 3 cos³ θ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The triple angle identities express trigonometric functions of 3θ in terms of powers of',
                  options: ['The triple angle identities express trigonometric functions of 3θ in terms of powers of', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle'],
                  hint: 'If stuck, revisit c11_math_cbse_03_010 (Double Angle) and c11_math_cbse_03_009 (Sum and Difference).',
                  misconception: 'Students often write sin 3θ = 3 sin θ − 4 sin θ (forgetting the cube on the last term) or cos 3θ = 4 cos θ − 3 cos³ θ (swapping the.' }
          ],
            remediations: { 'students-often-write-sin-3': { steps: ['If a student writes sin 3θ = 3 sin θ − 4 sin θ, ask: "What is sin 90°?', 'Are they equal?" Then guide: "The formula has sin³ θ, not sin θ.', 'Let\'s derive it together: sin 3θ = sin(2θ+θ) = sin 2θ cos θ + cos 2θ sin θ = (2 sin θ cos θ) cos θ + (1−2 sin² θ) sin θ.', 'We know sin 30° = 1/2, but here x = sin 10°.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_012', difficulty: 'standard',
          question: 'The Product-to-Sum Transformation Formulae convert products of trigonometric.',
          hint: 'Revisit c11_math_cbse_03_009 (Sum and Difference Formulas) and practice expanding.',
          misconception: 'Students confuse the argument order in 2 sin x cos y = sin(x+y) + sin(x-y) versus 2 cos x sin y = sin(x+y) - sin(x-y).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Product-to-Sum Transformation Formulae convert products of trigonometric functions',
                  options: ['The Product-to-Sum Transformation Formulae convert products of trigonometric functions', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle'],
                  hint: 'Revisit c11_math_cbse_03_009 (Sum and Difference Formulas) and practice expanding sin(45°+30°).',
                  misconception: 'Students confuse the argument order in 2 sin x cos y = sin(x+y) + sin(x-y) versus 2 cos x sin y = sin(x+y) - sin(x-y), writing the same.' }
          ],
            remediations: { 'students-confuse-the-argument-order': { steps: ['Have the student re-derive both formulas side-by-side: Write sin(x+y) = sin x cos y + cos x sin y and sin(x-y) = sin.', 'Add them: sin(x+y)+sin(x-y) = 2 sin x cos y.', 'Subtract them: sin(x+y)-sin(x-y) = 2 cos x sin y.', 'Emphasise: "The function that appears FIRST in the product (sin x or cos x) determines which sum/difference is ADDED.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
