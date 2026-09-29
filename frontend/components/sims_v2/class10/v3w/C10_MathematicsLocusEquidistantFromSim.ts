import type { SimDef } from '../../engine/types';
import C10_MathematicsLocusEquidistantFromSim from '../../../simulations/c6_12/C10_MathematicsLocusEquidistantFromSim';

/** v3 wrapped master — C10_MathematicsLocusEquidistantFromSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicslocusequidistantfromsim: SimDef = {
    id: 'v3w_c10_mathematicslocusequidistantfromsim',
    title: 'Distance Formula: Applications and Calculations',
    subtitle: 'This node covers all standard applications of the distance formula in Class 10: direct.',
    classLevel: 10, subject: 'mathematics', topic: 'Distance Formula: Applications and Calculations',
    chapters: [],
    nodeIds: ['c10_math_cbse_07_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you\'re planning a cycling route from your home at point A(2, 3) to your friend\'s house at point B(8,.', goal: 'Master Distance Formula: Applications and Calculations.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The distance formula calculates the.', text: 'The distance formula calculates the straight-line distance between two points P(x₁, y₁) and Q(x₂, y₂) in the Cartesian plane using the formula d = √[(x₂ - x₁)² + (y₂ - y₁)²], derived from the.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_07_002', title: 'The distance formula calculates the.',
          scaffold: { problem: 'A triangular park has vertices at A(2, 3), B(5, 7), and C(8, 3) on the city map where 1 unit = 100 metres.',
            steps: [
            { text: 'Identify the coordinates of the three vertices: A(2, 3), B(5, 7), C(8, 3).' },
            { text: 'Calculate AB: d = √[(5 - 2)² + (7 - 3)²] = √[3² + 4²] = √[9 + 16] = √25 = 5 units.' },
            { text: 'Calculate BC: d = √[(8 - 5)² + (3 - 7)²] = √[3² + (-4)²] = √[9 + 16] = √25 = 5 units.' },
            { text: 'Calculate CA: d = √[(2 - 8)² + (3 - 3)²] = √[(-6)² + 0²] = √[36 + 0] = √36 = 6 units.' },
            { text: 'Perimeter = AB + BC + CA = 5 + 5 + 6 = 16 units. Since 1 unit = 100 m, perimeter = 16 × 100 = 1600 metres.' },
            { text: 'Triangle type: AB = BC = 5 units, CA = 6 units. Two sides equal → Isosceles triangle.', faded: true, blankAnswer: 'Perimeter = 1600 metres; Triangle is isosceles.' }
            ] } }
    ],
    explore: { component: C10_MathematicsLocusEquidistantFromSim, prompt: 'Explore the interactive — Distance Formula: Applications and Calculations' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_07_002', difficulty: 'standard',
          question: 'The distance formula calculates the straight-line distance between two points.',
          hint: 'If stuck, revisit c7_math_ch10_003 (subtraction of integers with negative numbers) and.',
          misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2.',
          parts: [
                { id: 'a', prompt: 'Explain why the distance formula gives the same result regardless of which point you label as (x₁, y₁) and which as (x₂, y₂).', answer: 'The formula uses squares of differences: (x₂ - x₁)² = (x₁ - x₂)²',
                  options: ['The formula uses squares of differences: (x₂ - x₁)² = (x₁ - x₂)²', 'order matters because subtraction is not commutative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2 instead of 2 - (-4) =.' }
          ],
            remediations: { 'students-consistently-make-sign-errors': { steps: ['Have the student practice "subtracting negatives" drills: 5 - (-3), -2 - (-7), -4 - 6, etc., using number line.', 'For the squaring error, make them expand (x - 2)² explicitly as (x - 2)(x - 2) = x² - 4x + 4 before substituting into.', 'For the ±√ error, ask: "Can a length be -5 cm?" Then show √25 = 5 (principal root) vs x² = 25 → x = ±5.', 'Give 5 mixed practice problems with negative coordinates and unknown coordinate finding, requiring them to write the.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2.',
          parts: [
                { id: 'a', prompt: 'A student solved: "Find the distance between A(-4, -3) and B(2, 5)." Their working: d = √[(2 - (-4))² + (5 - (-3))²] = √[(2+4)² + (5+3)²] = √[6² + 8²] = √[36 +.', answer: 'The student\'s calculation is correct until the final step',
                  options: ['The student\'s calculation is correct until the final step', 'incorrect interpretation of square root symbol'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently make sign errors when coordinates are negative: they write (x₂ - x₁) as (2 - -4) = 2 - 4 = -2 instead of 2 - (-4) =.' }
          ],
            remediations: { 'students-consistently-make-sign-errors': { steps: ['Have the student practice "subtracting negatives" drills: 5 - (-3), -2 - (-7), -4 - 6, etc., using number line.', 'For the squaring error, make them expand (x - 2)² explicitly as (x - 2)(x - 2) = x² - 4x + 4 before substituting into.', 'For the ±√ error, ask: "Can a length be -5 cm?" Then show √25 = 5 (principal root) vs x² = 25 → x = ±5.', 'Give 5 mixed practice problems with negative coordinates and unknown coordinate finding, requiring them to write the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
