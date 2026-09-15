import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch03_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch03_p3: SimDef = {
    id: 'v3_c11_math_ch03_p3',
    title: 'Trigonometric Functions · Part 3/3',
    subtitle: 'Convert between degrees and radians without flipping the fraction.',
    classLevel: 11, subject: 'mathematics', topic: 'Trigonometric Functions · Part 3/3',
    chapters: ['c11_math_ch03'],
    nodeIds: ['c11_math_cbse_03_013', 'c11_math_cbse_03_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ride designer translating a safety limit into controller units', intro: 'A Ferris wheel spins three times a minute — the operator says 1080°, the physics wants radians per second; one ratio bridges them.', goal: 'Convert degrees↔radians exactly and apply l = rθ only in radian measure.' },
    discovery: {
        question: 'A wheel of radius 0.5 m turns through 120°. Distance travelled by a rim point: 0.5 × 120 = 60 m?',
        options: ['No — l = rθ only works in radians: convert 120° to 2π/3, giving π/3 m ≈ 1.05 m', 'Yes — multiply radius by the angle', 'Yes — but convert to 60 km', 'No — the answer is 0.5 × 360 = 180 m'],
        answer: 'No — l = rθ only works in radians: convert 120° to 2π/3, giving π/3 m ≈ 1.05 m',
        hook: 'A radian is a pure ratio — arc over radius — which is why calculus and physics refuse to work in degrees.',
    },
    teaching: [
        { title: 'Transformation Formulae: Sum to Product', text: 'The sum-to-product transformation formulae convert sums or differences of trigonometric functions into products.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_03_013', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Convert 22°30′ into an exact multiple of π, then judge whether \'multiply by 57.3\' is ever acceptable for exact answers.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_013', title: 'Transformation Formulae: Sum to Product',
          scaffold: { problem: 'Two sound waves at a school auditorium are modeled by y₁ = sin(100πt) and y₂ = sin(104πt).',
            steps: [
            { text: 'Identify the sum y₁ + y₂ = sin(100πt) + sin(104πt). Here x = 104πt, y = 100πt.' },
            { text: 'Apply sin x + sin y = 2 sin((x+y)/2) cos((x-y)/2).' },
            { text: 'Compute average angle: (x+y)/2 = (104πt + 100πt)/2 = 102πt.' },
            { text: 'Compute half-difference: (x-y)/2 = (104πt - 100πt)/2 = 2πt.' },
            { text: 'Resultant: y = 2 sin(102πt) cos(2πt). The amplitude envelope is 2 cos(2πt), giving beat frequency = 2 Hz.', faded: true, blankAnswer: 'Resultant wave: y = 2 sin(102πt) cos(2πt); Beat frequency.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_014', title: 'Solutions of Trigonometric Equations',
          scaffold: { problem: 'A pendulum\'s angular displacement from vertical is given by \\(\\theta(t) = 0.2\\sin(5t)\\) radians, where \\(t\\) is in seconds.',
            steps: [
            { text: 'Set up the equation: \\(0.2\\sin(5t) = 0.1 \\Rightarrow \\sin(5t) = 0.5\\).' },
            { text: 'Find principal solutions for \\(\\sin \\alpha = 0.5\\). Since sine is positive, \\(\\alpha\\) is in QI and QII.' },
            { text: 'Write general solution for \\(\\alpha = 5t\\): \\(5t = n\\pi + (-1)^n \\frac{\\pi}{6}, n \\in \\mathbb{Z}\\).' },
            { text: 'Solve for \\(t\\): \\(t = \\frac{n\\pi}{5} + (-1)^n \\frac{\\pi}{30}\\).' },
            { text: 'Find all \\(t\\) in \\([0, 2]\\). Test integer \\(n\\):', faded: true, blankAnswer: '\\(t = \\frac{\\pi}{30}, \\frac{\\pi}{6}, \\frac{13\\pi}{30}.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_03_014', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Programming a Ferris-wheel controller that accepts only radians, your teammate converts the 45° safety limit by multiplying by 180/π \'to get radians\', and reads the spec \'30°30′\' as \'30.30 degrees\'.',
            decisions: [{ prompt: 'What conversions does he need to redo?', options: [
                { text: 'Fix the direction and the DMS: degrees→radians multiplies by π/180 (since 180° = π rad), so 45° = π/4 — his factor inverted the conversion. And minutes aren\'t decimals: 30′ = 30/60 = 0.5°, so 30°30′ = 30.5° — then convert. Radians matter because the measure is a pure arc/radius ratio, which is why formulas like v = rω want them.', outcome: 'The controller gets π/4 exactly, and the spec reads correctly — conversion follows unit cancellation, not a memorised multiplier.' },
                { text: 'Let the 180/π pass — multiply by whichever factor has π on top for radians.', outcome: 'The factor is chosen so degrees cancel: degrees × (π rad / 180 deg) = radians; using 180/π leaves degrees squared over radians.', reveals: 'conversion-factor-backwards' },
                { text: 'Accept 30.30° — the digits after the degree mark just move behind the decimal.', outcome: 'Minutes are sixtieths, not hundredths: 30′ is half a degree, so 30°30′ is 30.5° — a 0.2° error before conversion even begins.', reveals: 'minutes-are-decimals' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_03_014', title: 'You made it',
          caseStudy: { intro: 'Degrees × π/180 = radians; radians × 180/π = degrees — get the direction wrong and 90° becomes 16,200/π.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_03_013', difficulty: 'standard',
          question: 'The sum-to-product transformation formulae convert sums or differences.',
          hint: 'If stuck, revisit c11_math_cbse_03_009 (Sum and Difference Formulas) and practice.',
          misconception: 'Students write cos x - cos y = 2 sin((x+y)/2) sin((x-y)/2) with a positive sign, confusing it with the formula for cos.',
          parts: [
                { id: 'a', prompt: 'Compare the structure of sin x + sin y and cos x + cos y formulas.', answer: 'Both formulas contain cos((x-y)/2) as the second factor',
                  options: ['Both formulas contain cos((x-y)/2) as the second factor', 'both use sine for the first factor'],
                  hint: 'If stuck, revisit c11_math_cbse_03_009 (Sum and Difference Formulas) and practice deriving sin 2x.',
                  misconception: 'Students write cos x - cos y = 2 sin((x+y)/2) sin((x-y)/2) with a positive sign, confusing it with the formula for cos y - cos x.' }
          ],
            remediations: { 'students-write-cos-x-cos': { steps: ['Write both formulas side by side: cos x + cos y = 2 cos((x+y)/2) cos((x-y)/2) and cos x - cos y = -2 sin((x+y)/2).', 'Test with x=60°, y=30°: LHS = 0.5 - 0.866 = -0.366. RHS with negative: -2 sin 45° sin 15° = -2(0.707)(0.259) = -0.366.', 'Memorize the mnemonic "cosine difference gives negative sine-sine" and always verify sign with a test case.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_014', difficulty: 'standard',
          question: 'A trigonometric equation is an equation involving trigonometric functions of.',
          hint: 'Revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants) and.',
          misconception: 'Students often write the general solution of \\(\\cos x = \\frac{1}{2}\\) as \\(x = 2n\\pi + \\frac{\\pi}{3}\\) only, forgetting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A trigonometric equation is an equation involving trigonometric functions of an unknown',
                  options: ['A trigonometric equation is an equation involving trigonometric functions of an unknown', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle'],
                  hint: 'Revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants) and.',
                  misconception: 'Students often write the general solution of \\(\\cos x = \\frac{1}{2}\\) as \\(x = 2n\\pi + \\frac{\\pi}{3}\\) only, forgetting the negative family.' }
          ],
            remediations: { 'students-often-write-the-general': { steps: ['Draw the unit circle and mark the angle whose sine/cosine/tangent equals the given value.', 'Identify ALL principal solutions in \\([0, 2\\pi)\\) by symmetry (e.g., for cosine, \\(\\theta\\) and \\(2\\pi-\\theta\\); for.', 'Write the general solution using the standard formula with the correct principal value \\(y\\) (usually the smallest.', 'Verify by substituting \\(n=0,1,-1\\) to see if you recover the principal solutions.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
