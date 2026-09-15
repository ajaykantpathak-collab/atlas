import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch03_p1: SimDef = {
    id: 'v3_c11_math_ch03_p1',
    title: 'Trigonometric Functions · Part 1/3',
    subtitle: 'Convert between degrees and radians without flipping the fraction.',
    classLevel: 11, subject: 'mathematics', topic: 'Trigonometric Functions · Part 1/3',
    chapters: ['c11_math_ch03'],
    nodeIds: ['c11_math_cbse_03_001', 'c11_math_cbse_03_002', 'c11_math_cbse_03_003', 'c11_math_cbse_03_004', 'c11_math_cbse_03_005', 'c11_math_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ride designer translating a safety limit into controller units', intro: 'A Ferris wheel spins three times a minute — the operator says 1080°, the physics wants radians per second; one ratio bridges them.', goal: 'Convert degrees↔radians exactly and apply l = rθ only in radian measure.' },
    discovery: {
        question: 'A wheel of radius 0.5 m turns through 120°. Distance travelled by a rim point: 0.5 × 120 = 60 m?',
        options: ['No — l = rθ only works in radians: convert 120° to 2π/3, giving π/3 m ≈ 1.05 m', 'Yes — multiply radius by the angle', 'Yes — but convert to 60 km', 'No — the answer is 0.5 × 360 = 180 m'],
        answer: 'No — l = rθ only works in radians: convert 120° to 2π/3, giving π/3 m ≈ 1.05 m',
        hook: 'A radian is a pure ratio — arc over radius — which is why calculus and physics refuse to work in degrees.',
    },
    teaching: [
        { title: 'Angles: Degree and Radian Measure', text: 'An angle is a measure of rotation of a ray about its initial point, where the amount of rotation from the initial side to the terminal side determines its measure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_03_001', title: 'Your mission',
          mission: { widget: 'unitcircle', validate: 'unitcircle:angle=50',
            instruction: 'On the lab: sweep the angle to 180° — what happens to sin?.',
        context: 'Convert 22°30′ into an exact multiple of π, then judge whether \'multiply by 57.3\' is ever acceptable for exact answers.',
            observePrompt: 'What did the unitcircle interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_001', title: 'Angles: Degree and Radian Measure',
          scaffold: { problem: 'The minute hand of a wall clock in a Jaipur classroom is 14 cm long. Find the distance travelled by its tip in 20 minutes. Use π = 22/7.',
            steps: [
            { text: 'Identify given: radius r = 14 cm, time = 20 minutes. The minute hand completes 1 revolution (360°) in 60 minutes.' },
            { text: 'Find angle rotated in 20 minutes: θ = (20/60) × 360° = (1/3) × 360° = 120°.' },
            { text: 'Convert θ to radians because arc length formula l = rθ requires radians: θ = 120° × π/180 = 2π/3 rad.' },
            { text: 'Apply arc length formula: l = rθ = 14 × (2π/3) = 28π/3 cm.' },
            { text: 'Substitute π = 22/7: l = 28/3 × 22/7 = (28 × 22) / (3 × 7) = (4 × 22) / 3 = 88/3 = 29 1/3 cm ≈ 29.33 cm.', faded: true, blankAnswer: '88/3 cm or 29 1/3 cm (≈ 29.33 cm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_002', title: 'Conversion Between Degrees and Radians',
          scaffold: { problem: 'The angle of elevation of the top of the Qutub Minar from a point 50 m away is measured as 32°15′.',
            steps: [
            { text: 'Convert minutes to decimal degrees: 15′ = 15/60 = 0.25°, so angle = 32.25° = 129/4 °.' },
            { text: 'Write the conversion formula: Radian measure = (π/180) × Degree measure.' },
            { text: 'Substitute: θ_rad = (π/180) × (129/4) = (129π)/(720).' },
            { text: 'Simplify the fraction by dividing numerator and denominator by 3: 129/3 = 43, 720/3 = 240.' },
            { text: 'Compute decimal approximation: (43 × 3.14)/240 = 135.02/240 ≈ 0.5626 rad.', faded: true, blankAnswer: '43π/240 rad (exact) ≈ 0.5626 rad' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_003', title: 'Trigonometric Functions: sin, cos, tan Definition',
          scaffold: { problem: 'A point \\(P\\) on the unit circle corresponds to an angle of \\(\\frac{2\\pi}{3}\\) radians.',
            steps: [
            { text: 'Identify the quadrant. \\(\\frac{2\\pi}{3} = 120^\\circ\\), which lies between \\(\\frac{\\pi}{2}\\) and \\(\\pi\\) → Quadrant II.' },
            { text: 'Find the reference angle. Reference angle = \\(\\pi - \\frac{2\\pi}{3} = \\frac{\\pi}{3}\\).' },
            { text: 'Recall the coordinates for \\(\\frac{\\pi}{3}\\) on the unit circle: \\(\\left(\\cos \\frac{\\pi}{3}, \\sin \\frac{\\pi}{3}\\right).' },
            { text: 'Apply quadrant signs. In QII, \\(x\\) (cosine) is negative, \\(y\\) (sine) is positive.' },
            { text: 'Compute \\(\\tan = \\frac{\\sin}{\\cos} = \\frac{\\sqrt{3}/2}{-1/2} = -\\sqrt{3}\\).' },
            { text: 'Compute reciprocals: \\(\\cosec = \\frac{1}{\\sin} = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}\\), \\(\\sec = \\frac{1}{\\cos}.', faded: true, blankAnswer: '\\(\\sin \\frac{2\\pi}{3} = \\frac{\\sqrt{3}}{2}\\), \\(\\cos.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_004', title: 'Trigonometric Functions of Acute Angles',
          scaffold: { problem: 'A surveyor stands 20 metres from the base of a tower. The angle of elevation to the top of the tower is 30°. Find the height of the tower.',
            steps: [
            { text: 'Identify the right triangle. The tower is vertical (opposite side), the ground distance is adjacent side (20 m), angle.' },
            { text: 'Choose the trigonometric ratio that relates opposite and adjacent: tan 30° = opposite/adjacent.' },
            { text: 'Substitute known values: tan 30° = 1/√3. So 1/√3 = height / 20.' },
            { text: 'Solve for height: height = 20/√3. Rationalize: height = (20√3)/3 metres.' },
            { text: 'Verify: tan 30° ≈ 0.577, height ≈ 11.55 m. The exact value (20√3)/3 ≈ 11.55 m. Answer is positive and reasonable.', faded: true, blankAnswer: 'Height = (20√3)/3 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_005', title: 'Trigonometric Functions of Any Angle',
          scaffold: { problem: 'A wind turbine blade in Gujarat has length 40 m. At a certain instant, the blade makes an angle of \\(210^\\circ\\) with the positive x-axis.',
            steps: [
            { text: 'Identify given: radius \\(r = 40\\) m, angle \\(\\theta = 210^\\circ\\).' },
            { text: 'Convert angle to radians (optional but good practice): \\(210^\\circ = 210 \\times \\frac{\\pi}{180} = \\frac{7\\pi}{6}\\) rad.' },
            { text: 'Determine quadrant: \\(\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}\\) lies in QIII (between \\(\\pi\\) and \\(\\frac{3\\pi}{2}\\)).' },
            { text: 'Find reference angle: \\(\\alpha = \\frac{7\\pi}{6} - \\pi = \\frac{\\pi}{6}\\).' },
            { text: 'Apply sign rule: \\(\\sin \\frac{7\\pi}{6} = -\\sin \\frac{\\pi}{6} = -\\frac{1}{2}\\).' },
            { text: 'Compute height: \\(y = 40 \\times (-\\frac{1}{2}) = -20\\) m. The negative sign means the tip is 20 m below ground level.', faded: true, blankAnswer: '-20 m (20 metres below ground level)' }
            ] } },
        { type: 'case', nodeId: 'c11_math_cbse_03_006', title: 'Sign of Trigonometric Functions in Quadrants',
          caseStudy: { intro: 'Imagine you are an architect designing a wheelchair ramp for a school entrance in Delhi.',
            decisions: [{ prompt: 'State the sign of each of the six trigonometric functions for an angle θ = 300°.', options: [
                { text: 'θ = 300° lies in the fourth quadrant (270° < 300° < 360°)', outcome: 'θ = 300° lies in the fourth quadrant (270° < 300° < 360°). In QIV: cos > 0, sin < 0, tan < 0, sec >.' },
                { text: 'All Silver Tea Cups', outcome: 'Not quite — Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions.', reveals: 'the-mnemonic-all-silver-tea' },
                { text: 'tan is positive', outcome: 'Not quite — Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions.', reveals: 'the-mnemonic-all-silver-tea' }
            ] }] } },
        { type: 'drill', nodeId: 'c11_math_cbse_03_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Programming a Ferris-wheel controller that accepts only radians, your teammate converts the 45° safety limit by multiplying by 180/π \'to get radians\', and reads the spec \'30°30′\' as \'30.30 degrees\'.',
            decisions: [{ prompt: 'What conversions does he need to redo?', options: [
                { text: 'Fix the direction and the DMS: degrees→radians multiplies by π/180 (since 180° = π rad), so 45° = π/4 — his factor inverted the conversion. And minutes aren\'t decimals: 30′ = 30/60 = 0.5°, so 30°30′ = 30.5° — then convert. Radians matter because the measure is a pure arc/radius ratio, which is why formulas like v = rω want them.', outcome: 'The controller gets π/4 exactly, and the spec reads correctly — conversion follows unit cancellation, not a memorised multiplier.' },
                { text: 'Let the 180/π pass — multiply by whichever factor has π on top for radians.', outcome: 'The factor is chosen so degrees cancel: degrees × (π rad / 180 deg) = radians; using 180/π leaves degrees squared over radians.', reveals: 'conversion-factor-backwards' },
                { text: 'Accept 30.30° — the digits after the degree mark just move behind the decimal.', outcome: 'Minutes are sixtieths, not hundredths: 30′ is half a degree, so 30°30′ is 30.5° — a 0.2° error before conversion even begins.', reveals: 'minutes-are-decimals' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Degrees × π/180 = radians; radians × 180/π = degrees — get the direction wrong and 90° becomes 16,200/π.',
            decisions: [{ prompt: 'What comes next? Trigonometric Functions · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Trigonometric Functions · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'unitcircle', prompt: 'Explore the unitcircle interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'unitcircle', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_03_001', difficulty: 'standard',
          question: 'An angle is a measure of rotation of a ray about its initial point, where the.',
          hint: 'If stuck on conversions, revisit Class 6 fractions and decimals (c6_math_ch03_031.',
          misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180°.',
          parts: [
                { id: 'a', prompt: 'State the exact radian measure of an angle of 150° in terms of π, and explain why the answer is not approximately 2.62 radian when asked for an exact value.', answer: '150° = 150 × π/180 = 5π/6 radian',
                  options: ['150° = 150 × π/180 = 5π/6 radian', '2.62 radian'],
                  hint: 'If stuck on conversions, revisit Class 6 fractions and decimals (c6_math_ch03_031 Equivalent.',
                  misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° = π rad.' },
                { id: 'b', prompt: 'Two circles have radii r₁ and r₂. An arc of length 10 cm in the first circle subtends 60° at the centre. The same arc length in the second circle subtends 45°.', answer: 'For fixed arc length l, θ ∝ 1/r (since l = rθ ⇒ r = l/θ)',
                  options: ['For fixed arc length l, θ ∝ 1/r (since l = rθ ⇒ r = l/θ)', 'larger angle means larger radius, not grasping the inverse proportionality'],
                  hint: 'If stuck on conversions, revisit Class 6 fractions and decimals (c6_math_ch03_031 Equivalent.',
                  misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° = π rad.' }
          ],
            remediations: { 'students-treat-the-radian-conversion': { steps: ['If the student reverses the conversion factor, make them derive it from scratch: "One full circle = 360° = 2π rad.', 'So 1° = 2π/360 = π/180 rad.', 'Therefore to convert degrees to radians, multiply by π/180.', 'To convert radians to degrees, multiply by 180/π." Have them write this derivation three times.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_002', difficulty: 'standard',
          question: 'The conversion between degree measure and radian measure is based on the.',
          hint: 'If stuck, revisit fraction simplification (Class 6 fractions) and the definition.',
          misconception: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians.',
          parts: [
                { id: 'a', prompt: 'State the exact conversion factor to change an angle from degrees to radians, and write the formula for converting 150° to radians in terms of π.', answer: 'The conversion factor is π/180',
                  options: ['The conversion factor is π/180', 'radians per degree', 'degrees per radian'],
                  hint: 'If stuck, revisit fraction simplification (Class 6 fractions) and the definition of radian measure.',
                  misconception: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to degrees (e.g., (π/3).' },
                { id: 'b', prompt: 'Explain why multiplying by π/180 converts degrees to radians, using the relationship between the circumference of a unit circle and a full revolution.', answer: 'A full revolution is 360° and also the circumference of a unit circle',
                  options: ['A full revolution is 360° and also the circumference of a unit circle', 'because π is 3.14', 'says "because π is 3'],
                  hint: 'If stuck, revisit fraction simplification (Class 6 fractions) and the definition of radian measure.',
                  misconception: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to degrees (e.g., (π/3).' }
          ],
            remediations: { 'students-frequently-confuse-the-direction': { steps: ['If the student inverts the factor, draw a unit cancellation diagram: write "° × (rad/°) = rad" and "rad × (°/rad) = °".', 'Ask: "What unit do you want in the answer?', 'Put that unit in the numerator." For DMS errors, have them convert 30′ to degrees by dividing 30 by 60 on a calculator.', 'Practice 5 problems where the angle is given in DMS and the answer must be an exact multiple of π (e.g., 15°30′.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_003', difficulty: 'standard',
          question: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the.',
          hint: 'If stuck, review the conversion between degrees and radians (c11_math_cbse_03_002) and.',
          misconception: 'Students often treat \\(\\sin x\\) and \\(\\cos x\\) as only the ratios \\(\\frac{\\text{opposite}}{\\text{hypotenuse}}\\) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle',
                  options: ['For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of'],
                  hint: 'If stuck, review the conversion between degrees and radians (c11_math_cbse_03_002) and the signs.',
                  misconception: 'Students often treat \\(\\sin x\\) and \\(\\cos x\\) as only the ratios \\(\\frac{\\text{opposite}}{\\text{hypotenuse}}\\) and.' }
          ],
            remediations: { 'students-often-treat-sin-x': { steps: ['Return to the unit circle diagram: draw the angle in standard position, identify the quadrant, and mark the coordinates.', 'Explicitly state: "In this quadrant, \\(a\\) is positive/negative and \\(b\\) is positive/negative." 3.', 'Use the definition \\(\\cos x = a, \\sin x = b\\) to assign signs.', 'Practice with quadrantal angles first (\\(0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\)) where coordinates are \\((\\pm1.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_004', difficulty: 'standard',
          question: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the.',
          hint: 'If stuck, revisit Class 10 trigonometric ratios (c10_math_cbse_08_001.',
          misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of',
                  options: ['Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle'],
                  hint: 'If stuck, revisit Class 10 trigonometric ratios (c10_math_cbse_08_001 to c10_math_cbse_08_009) and.',
                  misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.' }
          ],
            remediations: { 'students-often-confuse-the-exact': { steps: ['If a student confuses sin 30° and cos 30°, have them draw a 30-60-90 triangle with sides 1, √3, 2.', 'The side opposite 30° is 1, so sin 30° = 1/2.', 'The side opposite 60° is √3, so sin 60° = √3/2.', 'For the sign error, remind them that in the first quadrant, all trigonometric functions are positive.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_005', difficulty: 'standard',
          question: 'Trigonometric functions of any angle are defined using the unit circle: for.',
          hint: 'If stuck, revisit the unit circle definition (c11_math_cbse_03_003) and the standard.',
          misconception: 'Students often treat the reduction formulas mechanically without visualizing the unit circle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trigonometric functions of any angle are defined using the unit circle: for an angle',
                  options: ['Trigonometric functions of any angle are defined using the unit circle: for an angle', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle'],
                  hint: 'If stuck, revisit the unit circle definition (c11_math_cbse_03_003) and the standard angle values.',
                  misconception: 'Students often treat the reduction formulas mechanically without visualizing the unit circle.' }
          ],
            remediations: { 'students-often-treat-the-reduction': { steps: ['If a student cannot correctly evaluate trig functions for non-acute angles: 1.', 'Draw the unit circle and mark the given angle (convert to degrees if needed).', 'Identify the quadrant of the terminal side.', 'Find the reference angle (acute angle between terminal side and x-axis).'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_006', difficulty: 'standard',
          question: 'The sign of a trigonometric function in a given quadrant is determined by the.',
          hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and.',
          misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order**.',
          parts: [
                { id: 'a', prompt: 'State the sign of each of the six trigonometric functions for an angle θ = 300°.', answer: 'θ = 300° lies in the fourth quadrant (270° < 300° < 360°)',
                  options: ['θ = 300° lies in the fourth quadrant (270° < 300° < 360°)', 'All Silver Tea Cups', 'tan is positive'],
                  hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and the signs.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' },
                { id: 'b', prompt: 'If cos θ = -4/5 and θ lies in the third quadrant, find the exact values of sin θ, tan θ, cosec θ, sec θ, and cot θ.', answer: '**Step 1:** cos θ = -4/5 (given, negative in QIII – consistent)',
                  options: ['**Step 1:** cos θ = -4/5 (given, negative in QIII – consistent)', 'sign dropout', 'All Silver Tea Cups'],
                  hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and the signs.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' },
                { id: 'c', prompt: 'Given that sec θ < 0 and cot θ > 0, determine the quadrant in which θ lies. Justify your answer.', answer: 'sec θ < 0 ⇒ cos θ < 0 (reciprocal has same sign)',
                  options: ['sec θ < 0 ⇒ cos θ < 0 (reciprocal has same sign)', 'All Silver Tea Cups'],
                  hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and the signs.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' }
          ],
            remediations: { 'the-mnemonic-all-silver-tea': { steps: ['**Draw the unit circle** with coordinate axes.', 'Label a point P(x, y) in each quadrant.', '**Write explicitly**: sin θ = y, cos θ = x, tan θ = y/x.', '**Fill a 4×6 table** (4 quadrants × 6 functions) by computing signs from x and y signs – do NOT rely on memory.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "sin 150° and sin 210° are both negative because both angles are greater than 90°." Identify the error and give the correct signs.', answer: '**Error:** The student incorrectly assumes all angles > 90° have negative sine',
                  options: ['**Error:** The student incorrectly assumes all angles > 90° have negative sine', 'All Silver Tea Cups'],
                  hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and the signs.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' }
          ],
            remediations: { 'the-mnemonic-all-silver-tea': { steps: ['**Draw the unit circle** with coordinate axes.', 'Label a point P(x, y) in each quadrant.', '**Write explicitly**: sin θ = y, cos θ = x, tan θ = y/x.', '**Fill a 4×6 table** (4 quadrants × 6 functions) by computing signs from x and y signs – do NOT rely on memory.'], labTask: { instruction: 'On the interactive: sweep the angle to 180° — what happens to sin? — then check.', widget: 'unitcircle', validate: 'unitcircle:angle=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
