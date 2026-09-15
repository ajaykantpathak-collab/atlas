import type { SimDef } from '../../engine/types';
import C11_MathsRelationsAndFunctionsSim from '../../../simulations/c6_12/C11_MathsRelationsAndFunctionsSim';

/** v3 wrapped master — C11_MathsRelationsAndFunctionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathsrelationsandfunctionssim: SimDef = {
    id: 'v3w_c11_mathsrelationsandfunctionssim',
    title: 'Relations And Functions',
    subtitle: 'This node covers the definition of angles as rotation, degree and radian measures,.',
    classLevel: 11, subject: 'mathematics', topic: 'Angles: Degree and Radian Measure',
    chapters: [],
    nodeIds: ['c11_math_cbse_03_001', 'c11_math_cbse_03_002', 'c11_math_cbse_03_004', 'c11_math_cbse_03_008', 'c11_math_cbse_02_002', 'c11_math_cbse_02_003', 'c11_math_cbse_02_004', 'c11_math_cbse_02_005', 'c11_math_cbse_02_006', 'c11_math_cbse_13_004', 'c11_math_cbse_09_001', 'c11_math_cbse_03_003', 'c11_math_cbse_03_005', 'c11_math_cbse_03_006', 'c11_math_cbse_03_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a Ferris wheel at a fair in Delhi with a radius of 20 metres.', goal: 'Master Relations And Functions.' },
    discovery: {
        question: 'State the exact conversion factor to change an angle from degrees to radians, and write the formula for converting 150° to radians in terms of π.',
        options: ['The conversion factor is π/180', 'radians per degree', 'degrees per radian'],
        answer: 'The conversion factor is π/180',
        hook: 'Students frequently confuse the direction of the conversion factor: they multiply by π/180 when converting radians to.',
    },
    teaching: [
        { title: 'An angle is a measure of rotation of a ray.', text: 'An angle is a measure of rotation of a ray about its initial point, where the amount of rotation from the initial side to the terminal side determines its measure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_001', title: 'An angle is a measure of rotation of a.',
          scaffold: { problem: 'The minute hand of a wall clock in a Jaipur classroom is 14 cm long. Find the distance travelled by its tip in 20 minutes. Use π = 22/7.',
            steps: [
            { text: 'Identify given: radius r = 14 cm, time = 20 minutes. The minute hand completes 1 revolution (360°) in 60 minutes.' },
            { text: 'Find angle rotated in 20 minutes: θ = (20/60) × 360° = (1/3) × 360° = 120°.' },
            { text: 'Convert θ to radians because arc length formula l = rθ requires radians: θ = 120° × π/180 = 2π/3 rad.' },
            { text: 'Apply arc length formula: l = rθ = 14 × (2π/3) = 28π/3 cm.' },
            { text: 'Substitute π = 22/7: l = 28/3 × 22/7 = (28 × 22) / (3 × 7) = (4 × 22) / 3 = 88/3 = 29 1/3 cm ≈ 29.33 cm.', faded: true, blankAnswer: '88/3 cm or 29 1/3 cm (≈ 29.33 cm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_002', title: 'The conversion between degree measure.',
          scaffold: { problem: 'The angle of elevation of the top of the Qutub Minar from a point 50 m away is measured as 32°15′.',
            steps: [
            { text: 'Convert minutes to decimal degrees: 15′ = 15/60 = 0.25°, so angle = 32.25° = 129/4 °.' },
            { text: 'Write the conversion formula: Radian measure = (π/180) × Degree measure.' },
            { text: 'Substitute: θ_rad = (π/180) × (129/4) = (129π)/(720).' },
            { text: 'Simplify the fraction by dividing numerator and denominator by 3: 129/3 = 43, 720/3 = 240.' },
            { text: 'Compute decimal approximation: (43 × 3.14)/240 = 135.02/240 ≈ 0.5626 rad.', faded: true, blankAnswer: '43π/240 rad (exact) ≈ 0.5626 rad' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_004', title: 'Trigonometric functions of an acute.',
          scaffold: { problem: 'A surveyor stands 20 metres from the base of a tower. The angle of elevation to the top of the tower is 30°. Find the height of the tower.',
            steps: [
            { text: 'Identify the right triangle. The tower is vertical (opposite side), the ground distance is adjacent side (20 m), angle.' },
            { text: 'Choose the trigonometric ratio that relates opposite and adjacent: tan 30° = opposite/adjacent.' },
            { text: 'Substitute known values: tan 30° = 1/√3. So 1/√3 = height / 20.' },
            { text: 'Solve for height: height = 20/√3. Rationalize: height = (20√3)/3 metres.' },
            { text: 'Verify: tan 30° ≈ 0.577, height ≈ 11.55 m. The exact value (20√3)/3 ≈ 11.55 m. Answer is positive and reasonable.', faded: true, blankAnswer: 'Height = (20√3)/3 metres.' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_002', title: 'The Cartesian product of two non-empty.',
          scaffold: { problem: 'A school offers 4 science subjects (Physics, Chemistry, Biology, Computer Science) and 3 time slots (Morning, Afternoon, Evening).',
            steps: [
            { text: 'Identify the sets: S = {P, C, B, CS} (4 subjects), T = {M, A, E} (3 time slots).' },
            { text: 'Identify the forbidden pairs: Biology in Evening means the pair (B, E) is not allowed.' },
            { text: 'Compute the allowed pairs as S × T minus the forbidden pairs: (S × T) \\ ({B} × {E}).' },
            { text: 'Use the property A × (B \\ C) = (A × B) \\ (A × C) with A = {B}, B = T, C = {E}.' },
            { text: 'Total allowed pairs = (total pairs) - (forbidden pairs) = 12 - 1 = 11.', faded: true, blankAnswer: '11 valid subject-time slot pairs.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_003', title: 'A relation R from a non-empty set A to.',
          scaffold: { problem: 'A school has three clubs: Science (S), Arts (A), Sports (P). Four students: Rahul (R), Meena (M), Karthik (K), Anjali (An).',
            steps: [
            { text: 'Identify the two sets. Set A (students) = {Rahul, Meena, Karthik, Anjali}. Set B (clubs) = {Science, Arts, Sports}.' },
            { text: 'Form the Cartesian product A × B. There are 4 × 3 = 12 possible ordered pairs.' },
            { text: 'Apply the rule "first letter of student name = club initial". Check each student: Rahul (R) matches no club (no club.' },
            { text: 'Write the relation in roster form: R = {(Anjali, Arts)}. In set-builder form: R = {(s, c) : s ∈ A, c ∈ B, first letter.' },
            { text: 'Domain = {Anjali} (only first elements appearing). Range = {Arts} (only second elements appearing).', faded: true, blankAnswer: 'Roster: {(Anjali, Arts)}; Set-builder: {(s, c) : s ∈ A, c ∈.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Relations And Functions', spots: [
            { id: 's1', label: 'An angle is a measure', prompt: 'Which idea is this? — An angle is a measure of rotation of a ray about its initial point, where the amount of.', answer: 'An angle is a measure', options: ['An angle is a measure', 'The conversion between degree measure', 'Trigonometric functions of an acute', 'The Pythagorean identities are three'] },
            { id: 's2', label: 'The conversion between degree measure', prompt: 'Which idea is this? — The conversion between degree measure and radian measure is based on the equivalence of a.', answer: 'The conversion between degree measure', options: ['The conversion between degree measure', 'An angle is a measure', 'Trigonometric functions of an acute', 'The Pythagorean identities are three'] },
            { id: 's3', label: 'Trigonometric functions of an acute', prompt: 'Which idea is this? — Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of.', answer: 'Trigonometric functions of an acute', options: ['Trigonometric functions of an acute', 'An angle is a measure', 'The conversion between degree measure', 'The Pythagorean identities are three'] },
            { id: 's4', label: 'The Pythagorean identities are three', prompt: 'Which idea is this? — The Pythagorean identities are three fundamental equations relating the squares of.', answer: 'The Pythagorean identities are three', options: ['The Pythagorean identities are three', 'An angle is a measure', 'The conversion between degree measure', 'Trigonometric functions of an acute'] },
            { id: 's5', label: 'The Cartesian product of two', prompt: 'Which idea is this? — The Cartesian product of two non-empty sets A and B, denoted A × B, is the set of all.', answer: 'The Cartesian product of two', options: ['The Cartesian product of two', 'An angle is a measure', 'The conversion between degree measure', 'Trigonometric functions of an acute'] },
            { id: 's6', label: 'A relation R from a', prompt: 'Which idea is this? — A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian.', answer: 'A relation R from a', options: ['A relation R from a', 'An angle is a measure', 'The conversion between degree measure', 'Trigonometric functions of an acute'] }
          ] } }
    ],
    explore: { component: C11_MathsRelationsAndFunctionsSim, prompt: 'Explore the interactive — Relations And Functions' },
    challenges: [
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
            remediations: { 'students-treat-the-radian-conversion': { steps: ['If the student reverses the conversion factor, make them derive it from scratch: "One full circle = 360° = 2π rad.', 'So 1° = 2π/360 = π/180 rad.', 'Therefore to convert degrees to radians, multiply by π/180.', 'To convert radians to degrees, multiply by 180/π." Have them write this derivation three times.'] } } },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_03_004', difficulty: 'standard',
          question: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the.',
          hint: 'If stuck, revisit Class 10 trigonometric ratios (c10_math_cbse_08_001 to.',
          misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of',
                  options: ['Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'The Pythagorean identities are three fundamental equations relating the squares of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.' }
          ],
            remediations: { 'students-often-confuse-the-exact': { steps: ['If a student confuses sin 30° and cos 30°, have them draw a 30-60-90 triangle with sides 1, √3, 2.', 'The side opposite 30° is 1, so sin 30° = 1/2.', 'The side opposite 60° is √3, so sin 60° = √3/2.', 'For the sign error, remind them that in the first quadrant, all trigonometric functions are positive.'] } } },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_02_002', difficulty: 'standard',
          question: 'The Cartesian product of two non-empty sets A and B, denoted A × B, is the set.',
          hint: 'Review c11_math_cbse_02_001 for Cartesian product definition and c9_math_ch1_2 for.',
          misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).',
          parts: [
                { id: 'a', prompt: 'State the cardinality formula for the Cartesian product of two finite sets A and B. If n(A) = 5 and n(B) = 3, what is n(A × B)?', answer: 'The formula is n(A × B) = n(A) × n(B)',
                  options: ['The formula is n(A × B) = n(A) × n(B)', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'b', prompt: 'Explain why A × B ≠ B × A in general, using the sets A = {1, 2} and B = {3, 4} as an illustration. Under what condition would A × B = B × A hold?', answer: 'A × B = {(1,3), (1,4), (2,3), (2,4)} while B × A = {(3,1), (3,2), (4,1), (4,2)}',
                  options: ['A × B = {(1,3), (1,4), (2,3), (2,4)} while B × A = {(3,1), (3,2), (4,1), (4,2)}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'c', prompt: 'Let A = {1, 2}, B = {2, 3}, C = {3, 4}. Compute A × (B ∪ C) and (A × B) ∪ (A × C) and verify they are equal.', answer: 'B ∪ C = {2, 3, 4}',
                  options: ['B ∪ C = {2, 3, 4}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' }
          ],
            remediations: { 'cartesian-product-is-commutative-because': { steps: ['If a student asserts A × B = B × A, have them explicitly list both sets for A = {a, b}, B = {1, 2}.', 'Ask: "Is (a,1) the same ordered pair as (1,a)?', 'What does the definition of equality of ordered pairs require?" Guide them to see that (a,1) ∈ A×B but (a,1) ∉ B×A.', 'For distributive law errors, use Venn diagrams for sets and grid diagrams for Cartesian products: draw A on x-axis, B∪C.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since A × (B ∩ C) = (A × B) ∩ (A × C), it follows that (A × B) ∩ (A × C) = A × (B ∩ C) is always true, so the intersection of two Cartesian.', answer: 'The claim is false',
                  options: ['The claim is false', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' },
                { id: 'b', prompt: 'Construct an example of three sets A, B, C such that A × (B \\ C) ≠ (A × B) \\ (A × C), where \\ denotes set difference.', answer: 'Let A = {1}, B = {1, 2}, C = {2}',
                  options: ['Let A = {1}, B = {1, 2}, C = {2}', 'multiplication is commutative', 'Cartesian product is commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume Cartesian product is commutative because "multiplication is commutative" (a × b = b × a).' }
          ],
            remediations: { 'cartesian-product-is-commutative-because': { steps: ['If a student asserts A × B = B × A, have them explicitly list both sets for A = {a, b}, B = {1, 2}.', 'Ask: "Is (a,1) the same ordered pair as (1,a)?', 'What does the definition of equality of ordered pairs require?" Guide them to see that (a,1) ∈ A×B but (a,1) ∉ B×A.', 'For distributive law errors, use Venn diagrams for sets and grid diagrams for Cartesian products: draw A on x-axis, B∪C.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_003', difficulty: 'standard',
          question: 'A relation R from a non-empty set A to a non-empty set B is a subset of the.',
          hint: 'If stuck, revisit c11_math_cbse_02_001 (Cartesian Product of Sets: Definition) and.',
          misconception: 'Students often confuse the codomain with the range, writing codomain = range even when some elements of B have no.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian',
                  options: ['A relation R from a non-empty set A to a non-empty set B is a subset of the Cartesian', 'An angle is a measure of rotation of a ray about its initial point, where the amount of', 'The conversion between degree measure and radian measure is based on the equivalence of a', 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the codomain with the range, writing codomain = range even when some elements of B have no pre-image.' }
          ],
            remediations: { 'students-often-confuse-the-codomain': { steps: ['If a student confuses codomain and range: (1) Ask them to list all second elements of the ordered pairs in R – that is.', '(2) Ask them to look at the original set B given in the problem – that is the codomain.', '(3) Have them check if every element of B appears as a second element; if not, range ⊂ codomain.', 'If they think every element of A must appear: (1) Remind them a relation is ANY subset of A × B, including the empty.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
