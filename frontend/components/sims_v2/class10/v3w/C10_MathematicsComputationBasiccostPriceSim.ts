import type { SimDef } from '../../engine/types';
import C10_MathematicsComputationBasiccostPriceSim from '../../../simulations/c6_12/C10_MathematicsComputationBasiccostPriceSim';

/** v3 wrapped master — C10_MathematicsComputationBasiccostPriceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicscomputationbasiccostpricesim: SimDef = {
    id: 'v3w_c10_mathematicscomputationbasiccostpricesim',
    title: 'Word Problems: Surface Area and Volume of Combined Solids',
    subtitle: 'Covers word problems involving combinations of cylinder, cone, sphere, hemisphere, and.',
    classLevel: 10, subject: 'mathematics', topic: 'Word Problems: Surface Area and Volume of Combined Solids',
    chapters: [],
    nodeIds: ['c10_math_cbse_12_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine a water tank in your village shaped like a cylinder with a hemispherical top — the panchayat wants to.', goal: 'Master Word Problems: Surface Area and Volume of Combined Solids.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Word problems on surface area and volume of.', text: 'Word problems on surface area and volume of combined solids require translating a real-world description of a 3D object (formed by joining two or more basic solids like cylinders, cones, hemispheres,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_010', title: 'Word problems on surface area and.',
          scaffold: { problem: 'A wooden toy rocket is in the shape of a cone mounted on a cylinder. The total height of the rocket is 26 cm.',
            steps: [
            { text: 'Extract dimensions. Cone: radius r₁ = 2.5 cm, height h₁ = 6 cm.' },
            { text: 'Identify painted surfaces. Orange (cone): Curved surface area of cone only (base is joined to cylinder, not painted).' },
            { text: 'Compute slant height of cone: l = √(r₁² + h₁²) = √(2.5² + 6²) = √(6.25 + 36) = √42.25 = 6.5 cm.' },
            { text: 'Orange area = CSA of cone + area of annular base = πr₁l + π(r₁² - r₂²) = 3.14 × 2.5 × 6.5 + 3.14 × (6.25 - 2.25) =.' },
            { text: 'Yellow area = CSA of cylinder + area of bottom base = 2πr₂h₂ + πr₂² = 2 × 3.14 × 1.5 × 20 + 3.14 × 2.25 = 188.4 + 7.065.' },
            { text: 'Volume of wood = Volume of cone + Volume of cylinder = 1/3 πr₁²h₁ + πr₂²h₂ = 1/3 × 3.14 × 6.25 × 6 + 3.14 × 2.25 × 20 =.', faded: true, blankAnswer: 'Orange painted area = 63.585 cm², Yellow painted area =.' }
            ] } }
    ],
    explore: { component: C10_MathematicsComputationBasiccostPriceSim, prompt: 'Explore the interactive — Word Problems: Surface Area and Volume of Combined Solids' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_12_010', difficulty: 'standard',
          question: 'Word problems on surface area and volume of combined solids require translating.',
          hint: 'Revisit c10_math_cbse_12_001 (surface area method) and c10_math_cbse_12_003 (volume.',
          misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid,.',
          parts: [
                { id: 'a', prompt: 'A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, surmounted by another cylinder of height 60 cm and radius 8 cm.', answer: 'Step 1: Radius of lower cylinder = 12 cm, height = 220 cm',
                  options: ['Step 1: Radius of lower cylinder = 12 cm, height = 220 cm', 'radius 8 cm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid, forgetting to subtract the.' }
          ],
            remediations: { 'students-treat-the-total-height': { steps: ['When a student makes this height error, immediately ask: "Draw the solid and label the total height.', 'Where does the cone start?', 'What is the height of the hemisphere?" Make them physically measure a hemisphere (radius = height).', 'Then re-read the problem: "Total height = height of cone + height of hemisphere." Write the equation: h_cone = H_total.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid,.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A solid is a cone on a hemisphere with same radius 7 cm. Total height = 21 cm.', answer: 'The student used total height 21 cm as the height of the cone',
                  options: ['The student used total height 21 cm as the height of the cone', 'height confusion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid, forgetting to subtract the.' }
          ],
            remediations: { 'students-treat-the-total-height': { steps: ['When a student makes this height error, immediately ask: "Draw the solid and label the total height.', 'Where does the cone start?', 'What is the height of the hemisphere?" Make them physically measure a hemisphere (radius = height).', 'Then re-read the problem: "Total height = height of cone + height of hemisphere." Write the equation: h_cone = H_total.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
