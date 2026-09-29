import type { SimDef } from '../../engine/types';
import C11_MathematicsSignsTrigonometricFunctionsSim from '../../../simulations/c6_12/C11_MathematicsSignsTrigonometricFunctionsSim';

/** v3 wrapped master — C11_MathematicsSignsTrigonometricFunctionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicssignstrigonometricfunctionssim: SimDef = {
    id: 'v3w_c11_mathematicssignstrigonometricfunctionssim',
    title: 'Conversion Between Degrees and Radians',
    subtitle: 'This node covers the bidirectional conversion between degree measure (including degrees,.',
    classLevel: 11, subject: 'mathematics', topic: 'Conversion Between Degrees and Radians',
    chapters: [],
    nodeIds: ['c11_math_cbse_03_002', 'c11_math_cbse_03_003', 'c11_math_cbse_03_006', 'c11_math_cbse_03_008', 'c11_math_cbse_02_009', 'c11_math_cbse_03_001', 'c11_math_cbse_03_004', 'c11_math_cbse_03_005', 'c11_math_cbse_03_007', 'c11_math_cbse_03_009', 'c11_math_cbse_03_010', 'c11_math_cbse_03_011', 'c11_math_cbse_03_012', 'c11_math_cbse_03_013', 'c11_math_cbse_03_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are designing a Ferris wheel for a Diwali mela. The wheel has a radius of 10 metres, and the.', goal: 'Master Conversion Between Degrees and Radians.' },
    discovery: {
        question: 'State the exact conversion factor to change an angle from degrees to radians, and write the formula for converting 150° to radians in terms of π.',
        options: ['The conversion factor is π/180', 'radians per degree', 'degrees per radian'],
        answer: 'The conversion factor is π/180',
        hook: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to.',
    },
    teaching: [
        { title: 'The conversion between degree measure and.', text: 'The conversion between degree measure and radian measure is based on the equivalence of a full revolution: 360° = 2π radians, which simplifies to the fundamental relation π radians = 180°.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_002', title: 'The conversion between degree measure.',
          scaffold: { problem: 'The angle of elevation of the top of the Qutub Minar from a point 50 m away is measured as 32°15′.',
            steps: [
            { text: 'Convert minutes to decimal degrees: 15′ = 15/60 = 0.25°, so angle = 32.25° = 129/4 °.' },
            { text: 'Write the conversion formula: Radian measure = (π/180) × Degree measure.' },
            { text: 'Substitute: θ_rad = (π/180) × (129/4) = (129π)/(720).' },
            { text: 'Simplify the fraction by dividing numerator and denominator by 3: 129/3 = 43, 720/3 = 240.' },
            { text: 'Compute decimal approximation: (43 × 3.14)/240 = 135.02/240 ≈ 0.5626 rad.', faded: true, blankAnswer: '43π/240 rad (exact) ≈ 0.5626 rad' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_003', title: 'For any angle \\(x\\) measured in.',
          scaffold: { problem: 'A point \\(P\\) on the unit circle corresponds to an angle of \\(\\frac{2\\pi}{3}\\) radians.',
            steps: [
            { text: 'Identify the quadrant. \\(\\frac{2\\pi}{3} = 120^\\circ\\), which lies between \\(\\frac{\\pi}{2}\\) and \\(\\pi\\) → Quadrant II.' },
            { text: 'Find the reference angle. Reference angle = \\(\\pi - \\frac{2\\pi}{3} = \\frac{\\pi}{3}\\).' },
            { text: 'Recall the coordinates for \\(\\frac{\\pi}{3}\\) on the unit circle: \\(\\left(\\cos \\frac{\\pi}{3}, \\sin \\frac{\\pi}{3}\\right).' },
            { text: 'Apply quadrant signs. In QII, \\(x\\) (cosine) is negative, \\(y\\) (sine) is positive.' },
            { text: 'Compute \\(\\tan = \\frac{\\sin}{\\cos} = \\frac{\\sqrt{3}/2}{-1/2} = -\\sqrt{3}\\).' },
            { text: 'Compute reciprocals: \\(\\cosec = \\frac{1}{\\sin} = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}\\), \\(\\sec = \\frac{1}{\\cos} =.', faded: true, blankAnswer: '\\(\\sin \\frac{2\\pi}{3} = \\frac{\\sqrt{3}}{2}\\), \\(\\cos.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_006', title: 'The sign of a trigonometric function in.',
          scaffold: { problem: 'A wind turbine blade makes an angle of 210° with the positive x-axis (measured anticlockwise).',
            steps: [
            { text: 'Identify the quadrant: 210° lies between 180° and 270°, so it is in the third quadrant (QIII).' },
            { text: 'Recall the sign of coordinates in QIII: x < 0, y < 0.' },
            { text: 'Apply unit circle definitions: cos θ = x (horizontal), sin θ = y (vertical). Therefore cos θ < 0, sin θ < 0.' },
            { text: 'Compute the ratio: tan θ = sin θ / cos θ = (negative) / (negative) = positive.' },
            { text: 'Verify with exact values: sin 210° = -1/2, cos 210° = -√3/2, tan 210° = 1/√3. Signs match.', faded: true, blankAnswer: 'Vertical component (sin) is negative, horizontal component.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_008', title: 'The Pythagorean identities are three.',
          scaffold: { problem: 'A kite is flying at a height of 75 metres above the ground, attached to a string inclined at an angle \\(x\\) to the horizontal.',
            steps: [
            { text: 'Identify given and unknown. Given: \\(\\cosec x = \\frac{5}{3}\\), height (opposite side) = 75 m.' },
            { text: 'Use reciprocal identity: \\(\\sin x = \\frac{1}{\\cosec x} = \\frac{3}{5}\\).' },
            { text: 'Use Pythagorean identity \\(\\sin^2 x + \\cos^2 x = 1\\) to find \\(\\cos x\\).' },
            { text: 'In the right triangle, \\(\\sin x = \\frac{\\text{height}}{\\text{string length}} \\Rightarrow \\frac{3}{5} =.' },
            { text: '\\(\\cos x = \\frac{\\text{horizontal distance}}{\\text{string length}} \\Rightarrow \\frac{4}{5} = \\frac{\\text{horizontal.', faded: true, blankAnswer: 'String length = 125 m, horizontal distance = 100 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_009', title: 'The **signum function** (or sign.',
          scaffold: { problem: 'A courier company charges ₹50 for the first kilogram and ₹20 for every additional 500 g or part thereof.',
            steps: [
            { text: 'Identify the pricing structure: first 1 kg costs ₹50; beyond that, every 0.5 kg (500 g) or fraction thereof costs ₹20.' },
            { text: 'For weight \\( w > 1 \\) kg, the additional weight is \\( w - 1 \\) kg.' },
            { text: 'Write the piecewise function: \\( C(w) = \\begin{cases} 50, & 0 < w \\le 1 \\\\ 50 + 20[2(w-1)], & w > 1 \\end{cases} \\).' },
            { text: 'For \\( w = 3.2 \\) kg, compute additional units: \\( 2(3.2 - 1) = 2 \\times 2.2 = 4.4 \\). Greatest integer \\( [4.4] = 4 \\).' },
            { text: 'Charge = \\( 50 + 20 \\times 4 = 50 + 80 = ₹130 \\).' },
            { text: 'Verify: 3.2 kg = 1 kg + 2.2 kg. 2.2 kg = 4.4 units of 500 g → 5 units charged?', faded: true, blankAnswer: '\\( C(w) = 50 + 20 \\times (-[-2(w-1)]) \\) for \\( w > 1 \\);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_001', title: 'An angle is a measure of rotation of a.',
          scaffold: { problem: 'The minute hand of a wall clock in a Jaipur classroom is 14 cm long. Find the distance travelled by its tip in 20 minutes. Use π = 22/7.',
            steps: [
            { text: 'Identify given: radius r = 14 cm, time = 20 minutes. The minute hand completes 1 revolution (360°) in 60 minutes.' },
            { text: 'Find angle rotated in 20 minutes: θ = (20/60) × 360° = (1/3) × 360° = 120°.' },
            { text: 'Convert θ to radians because arc length formula l = rθ requires radians: θ = 120° × π/180 = 2π/3 rad.' },
            { text: 'Apply arc length formula: l = rθ = 14 × (2π/3) = 28π/3 cm.' },
            { text: 'Substitute π = 22/7: l = 28/3 × 22/7 = (28 × 22) / (3 × 7) = (4 × 22) / 3 = 88/3 = 29 1/3 cm ≈ 29.33 cm.', faded: true, blankAnswer: '88/3 cm or 29 1/3 cm (≈ 29.33 cm)' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_03_003', title: 'Identify each idea',
          dissect: { specimen: 'Conversion Between Degrees and Radians', spots: [
            { id: 's1', label: 'The conversion between degree measure', prompt: 'Which idea is this? — The conversion between degree measure and radian measure is based on the equivalence of a.', answer: 'The conversion between degree measure', options: ['The conversion between degree measure', 'For any angle x measured', 'The sign of a trigonometric', 'The Pythagorean identities are three'] },
            { id: 's2', label: 'For any angle x measured', prompt: 'Which idea is this? — For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle.', answer: 'For any angle x measured', options: ['For any angle x measured', 'The conversion between degree measure', 'The sign of a trigonometric', 'The Pythagorean identities are three'] },
            { id: 's3', label: 'The sign of a trigonometric', prompt: 'Which idea is this? — The sign of a trigonometric function in a given quadrant is determined by the signs of.', answer: 'The sign of a trigonometric', options: ['The sign of a trigonometric', 'The conversion between degree measure', 'For any angle x measured', 'The Pythagorean identities are three'] },
            { id: 's4', label: 'The Pythagorean identities are three', prompt: 'Which idea is this? — The Pythagorean identities are three fundamental equations relating the squares of.', answer: 'The Pythagorean identities are three', options: ['The Pythagorean identities are three', 'The conversion between degree measure', 'For any angle x measured', 'The sign of a trigonometric'] },
            { id: 's5', label: 'The signum function or sign', prompt: 'Which idea is this? — The **signum function** (or sign function) is a real-valued function \\( f: \\mathbb{R} \\to.', answer: 'The signum function or sign', options: ['The signum function or sign', 'The conversion between degree measure', 'For any angle x measured', 'The sign of a trigonometric'] },
            { id: 's6', label: 'An angle is a measure', prompt: 'Which idea is this? — An angle is a measure of rotation of a ray about its initial point, where the amount of.', answer: 'An angle is a measure', options: ['An angle is a measure', 'The conversion between degree measure', 'For any angle x measured', 'The sign of a trigonometric'] }
          ] } }
    ],
    explore: { component: C11_MathematicsSignsTrigonometricFunctionsSim, prompt: 'Explore the interactive — Conversion Between Degrees and Radians' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_03_002', difficulty: 'standard',
          question: 'The conversion between degree measure and radian measure is based on the.',
          hint: 'If stuck, revisit fraction simplification (Class 6 fractions) and the definition of.',
          misconception: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to.',
          parts: [
                { id: 'a', prompt: 'State the exact conversion factor to change an angle from degrees to radians, and write the formula for converting 150° to radians in terms of π.', answer: 'The conversion factor is π/180',
                  options: ['The conversion factor is π/180', 'radians per degree', 'degrees per radian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to degrees (e.g., (π/3).' },
                { id: 'b', prompt: 'Explain why multiplying by π/180 converts degrees to radians, using the relationship between the circumference of a unit circle and a full revolution.', answer: 'A full revolution is 360° and also the circumference of a unit circle',
                  options: ['A full revolution is 360° and also the circumference of a unit circle', 'because π is 3.14'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to degrees (e.g., (π/3).' }
          ],
            remediations: { 'students-frequently-confuse-the-direction': { steps: ['If the student inverts the factor, draw a unit cancellation diagram: write "° × (rad/°) = rad" and "rad × (°/rad) = °".', 'Ask: "What unit do you want in the answer?', 'Put that unit in the numerator." For DMS errors, have them convert 30′ to degrees by dividing 30 by 60 on a calculator,.', 'Practice 5 problems where the angle is given in DMS and the answer must be an exact multiple of π (e.g., 15°30′ =.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_003', difficulty: 'standard',
          question: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the.',
          hint: 'If stuck, review the conversion between degrees and radians (c11_math_cbse_03_002) and.',
          misconception: 'Students often treat \\(\\sin x\\) and \\(\\cos x\\) as only the ratios \\(\\frac{\\text{opposite}}{\\text{hypotenuse}}\\) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle',
                  options: ['For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'The sign of a trigonometric function in a given quadrant is determined by the signs of', 'The Pythagorean identities are three fundamental equations relating the squares of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat \\(\\sin x\\) and \\(\\cos x\\) as only the ratios \\(\\frac{\\text{opposite}}{\\text{hypotenuse}}\\) and.' }
          ],
            remediations: { 'students-often-treat-sin-x': { steps: ['Return to the unit circle diagram: draw the angle in standard position, identify the quadrant, and mark the coordinates.', 'Explicitly state: "In this quadrant, \\(a\\) is positive/negative and \\(b\\) is positive/negative." 3.', 'Use the definition \\(\\cos x = a, \\sin x = b\\) to assign signs.', 'Practice with quadrantal angles first (\\(0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi\\)) where coordinates are \\((\\pm1,.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_006', difficulty: 'standard',
          question: 'The sign of a trigonometric function in a given quadrant is determined by the.',
          hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and.',
          misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order**.',
          parts: [
                { id: 'a', prompt: 'State the sign of each of the six trigonometric functions for an angle θ = 300°.', answer: 'θ = 300° lies in the fourth quadrant (270° < 300° < 360°)',
                  options: ['θ = 300° lies in the fourth quadrant (270° < 300° < 360°)', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' },
                { id: 'b', prompt: 'If cos θ = -4/5 and θ lies in the third quadrant, find the exact values of sin θ, tan θ, cosec θ, sec θ, and cot θ.', answer: '**Step 1:** cos θ = -4/5 (given, negative in QIII – consistent)',
                  options: ['**Step 1:** cos θ = -4/5 (given, negative in QIII – consistent)', 'sign dropout', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' },
                { id: 'c', prompt: 'Given that sec θ < 0 and cot θ > 0, determine the quadrant in which θ lies. Justify your answer.', answer: 'sec θ < 0 ⇒ cos θ < 0 (reciprocal has same sign)',
                  options: ['sec θ < 0 ⇒ cos θ < 0 (reciprocal has same sign)', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' }
          ],
            remediations: { 'the-mnemonic-all-silver-tea': { steps: ['**Draw the unit circle** with coordinate axes.', 'Label a point P(x, y) in each quadrant.', '**Write explicitly**: sin θ = y, cos θ = x, tan θ = y/x.', '**Fill a 4×6 table** (4 quadrants × 6 functions) by computing signs from x and y signs – do NOT rely on memory.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "sin 150° and sin 210° are both negative because both angles are greater than 90°." Identify the error and give the correct signs.', answer: '**Error:** The student incorrectly assumes all angles > 90° have negative sine',
                  options: ['**Error:** The student incorrectly assumes all angles > 90° have negative sine', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' }
          ],
            remediations: { 'the-mnemonic-all-silver-tea': { steps: ['**Draw the unit circle** with coordinate axes.', 'Label a point P(x, y) in each quadrant.', '**Write explicitly**: sin θ = y, cos θ = x, tan θ = y/x.', '**Fill a 4×6 table** (4 quadrants × 6 functions) by computing signs from x and y signs – do NOT rely on memory.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_008', difficulty: 'standard',
          question: 'The Pythagorean identities are three fundamental equations relating the squares.',
          hint: 'If stuck, revisit c11_math_cbse_03_005 (Trigonometric Functions of Any Angle) to review.',
          misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(\\sqrt{1 - \\cos^2 x}\\) and \\(\\sin x\\). Are they equivalent for all \\(x\\)?', answer: 'They are NOT equivalent for all \\(x\\)',
                  options: ['They are NOT equivalent for all \\(x\\)', 'yes, they are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant to determine the.' }
          ],
            remediations: { 'students-mechanically-apply-sin-x': { steps: ['**Revisit the unit circle**: Draw the unit circle, mark an angle in QIII (e.g., \\(210^\\circ\\)), and show that the.', 'Compute \\(\\cos^2 x + \\sin^2 x\\) numerically to verify it equals 1.', '**Practice sign determination**: Give 5 problems where \\(\\cos x\\) or \\(\\sin x\\) is given with quadrant, and the student.', 'Example: "\\(\\cos x = -\\frac{5}{13}\\), QII → \\(\\sin x = +\\frac{12}{13}\\) because sine is positive in QII." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions \\(\\sqrt{1 - \\cos^2 x}\\) and \\(\\sin x\\). Are they equivalent for all \\(x\\)?', answer: 'They are NOT equivalent for all \\(x\\)',
                  options: ['They are NOT equivalent for all \\(x\\)', 'yes, they are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply \\(\\sin x = \\sqrt{1 - \\cos^2 x}\\) without the \\(\\pm\\) sign and without checking the quadrant to determine the.' }
          ],
            remediations: { 'students-mechanically-apply-sin-x': { steps: ['**Revisit the unit circle**: Draw the unit circle, mark an angle in QIII (e.g., \\(210^\\circ\\)), and show that the.', 'Compute \\(\\cos^2 x + \\sin^2 x\\) numerically to verify it equals 1.', '**Practice sign determination**: Give 5 problems where \\(\\cos x\\) or \\(\\sin x\\) is given with quadrant, and the student.', 'Example: "\\(\\cos x = -\\frac{5}{13}\\), QII → \\(\\sin x = +\\frac{12}{13}\\) because sine is positive in QII." 3.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_009', difficulty: 'standard',
          question: 'The **signum function** (or sign function) is a real-valued function \\( f:.',
          hint: 'Revise solving compound inequalities (e.g., \\( 2 \\le 3x-1 < 5 \\)) and plotting points.',
          misconception: 'Students treat \\( [x] \\) as "remove the decimal part" (truncation toward zero), so they write \\( [-2.7] = -2 \\) instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **signum function** (or sign function) is a real-valued function \\( f: \\mathbb{R} \\to',
                  options: ['The **signum function** (or sign function) is a real-valued function \\( f: \\mathbb{R} \\to', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'For any angle \\(x\\) measured in radians, let \\(P(a, b)\\) be the point on the unit circle', 'The sign of a trigonometric function in a given quadrant is determined by the signs of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat \\( [x] \\) as "remove the decimal part" (truncation toward zero), so they write \\( [-2.7] = -2 \\) instead of the correct \\(.' }
          ],
            remediations: { 'students-treat-x-as-remove': { steps: ['Make a table with columns: \\( x \\), \\( [x] \\), \\( \\text{sgn}(x) \\) for \\( x = -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1,.', 'Plot each point on graph paper, using a distinct mark for closed vs open circles.', 'Verbally state the rule: "For negative non-integers, \\( [x] \\) is the next integer to the LEFT on the number line." 4.', 'Practice 5 inequalities of the form \\( [ax+b] = c \\) by converting to \\( c \\le ax+b < c+1 \\) before solving.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_001', difficulty: 'standard',
          question: 'An angle is a measure of rotation of a ray about its initial point, where the.',
          hint: 'If stuck on conversions, revisit Class 6 fractions and decimals (c6_math_ch03_031.',
          misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° =.',
          parts: [
                { id: 'a', prompt: 'State the exact radian measure of an angle of 150° in terms of π, and explain why the answer is not approximately 2.62 radian when asked for an exact value.', answer: '150° = 150 × π/180 = 5π/6 radian',
                  options: ['150° = 150 × π/180 = 5π/6 radian', '2.62 radian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° = π rad.' },
                { id: 'b', prompt: 'Two circles have radii r₁ and r₂. An arc of length 10 cm in the first circle subtends 60° at the centre. The same arc length in the second circle subtends 45°.', answer: 'For fixed arc length l, θ ∝ 1/r (since l = rθ ⇒ r = l/θ)',
                  options: ['For fixed arc length l, θ ∝ 1/r (since l = rθ ⇒ r = l/θ)', 'larger angle means larger radius, not grasping the inverse proportionality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° = π rad.' }
          ],
            remediations: { 'students-treat-the-radian-conversion': { steps: ['If the student reverses the conversion factor, make them derive it from scratch: "One full circle = 360° = 2π rad.', 'So 1° = 2π/360 = π/180 rad.', 'Therefore to convert degrees to radians, multiply by π/180.', 'To convert radians to degrees, multiply by 180/π." Have them write this derivation three times.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° =.',
          parts: [
                { id: 'a', prompt: 'Two circles have radii r₁ and r₂. An arc of length 10 cm in the first circle subtends 60° at the centre. The same arc length in the second circle subtends 45°.', answer: 'For fixed arc length l, θ ∝ 1/r (since l = rθ ⇒ r = l/θ)',
                  options: ['For fixed arc length l, θ ∝ 1/r (since l = rθ ⇒ r = l/θ)', 'larger angle means larger radius, not grasping the inverse proportionality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the radian conversion factor π/180 as a formula to memorize rather than a proportion derived from 180° = π rad.' }
          ],
            remediations: { 'students-treat-the-radian-conversion': { steps: ['If the student reverses the conversion factor, make them derive it from scratch: "One full circle = 360° = 2π rad.', 'So 1° = 2π/360 = π/180 rad.', 'Therefore to convert degrees to radians, multiply by π/180.', 'To convert radians to degrees, multiply by 180/π." Have them write this derivation three times.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
