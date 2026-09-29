import type { SimDef } from '../../engine/types';
import C12_PhysicsPrismRefractionSim from '../../../simulations/three/C12_PhysicsPrismRefractionSim';

/** v3 wrapped master — C12_PhysicsPrismRefractionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsprismrefractionsim: SimDef = {
    id: 'v3w_c12_physicsprismrefractionsim',
    title: 'Refraction of Light: Snell\'s Law',
    subtitle: 'This node covers refraction at a plane interface between two isotropic, homogeneous,.',
    classLevel: 12, subject: 'physics', topic: 'Refraction of Light: Snell\'s Law',
    chapters: [],
    nodeIds: ['c12_phy_cbse_09_003', 'c12_phy_cbse_09_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a pencil partially immersed in a glass of water — it appears bent at the water surface.', goal: 'Master Refraction of Light: Snell\'s Law.' },
    discovery: {
        question: 'State Snell\'s law of refraction in terms of the absolute refractive indices of the two media and the angles of incidence and refraction.',
        options: ['Snell\'s law: n₁ sin i = n₂ sin r', 'optically denser', 'higher mass density'],
        answer: 'Snell\'s law: n₁ sin i = n₂ sin r',
        hook: 'Students often believe that "optically denser" means "higher mass density".',
    },
    teaching: [
        { title: 'Refraction is the bending of a light ray.', text: 'Refraction is the bending of a light ray when it passes obliquely from one transparent medium into another due to a change in its speed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_003', title: 'Refraction is the bending of a light.',
          scaffold: { problem: 'A fisherman in Kerala looks into a river at a fish. The ray from the fish enters the water-air interface at an angle of refraction r = 30°.',
            steps: [
            { text: 'Identify given: n_water = 4/3 ≈ 1.333, n_air = 1.00, r = 30° (in air), c = 3.00 × 10⁸ m/s.' },
            { text: 'Apply Snell\'s law at water-air interface. Light goes from water (medium 1) to air (medium 2).' },
            { text: 'sin 30° = 0.5. So (4/3) sin i = 0.5 → sin i = 0.5 × 3/4 = 0.375.' },
            { text: 'i = sin⁻¹(0.375) = 22.0° (to one decimal). Speed in water: v = c/n = (3.00 × 10⁸) / (4/3) = 2.25 × 10⁸ m/s.' },
            { text: 'Check: i < r (22° < 30°), so ray bends away from normal when going from denser to rarer — correct.', faded: true, blankAnswer: 'Angle of incidence in water i = 22.0°; Speed of light in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_004', title: 'Total Internal Reflection (TIR) is the.',
          scaffold: { problem: 'A swimming pool is filled with water (refractive index = 4/3 = 1.333). A small LED light is placed at the bottom of the pool.',
            steps: [
            { text: 'Identify given quantities: n_water = 4/3 = 1.333 (denser medium), n_air = 1.0 (rarer medium), depth h = 2.0 m.' },
            { text: 'Use the critical angle formula for denser-to-rarer interface: sin(ic) = n_air / n_water = 1 / (4/3) = 3/4 = 0.75.' },
            { text: 'Calculate ic = sin⁻¹(0.75). Using a calculator: ic ≈ 48.59° (or 0.848 rad).' },
            { text: 'Geometry: Light rays that escape must strike the surface within a cone of half-angle ic around the vertical.' },
            { text: 'Compute tan(ic) = tan(48.59°) ≈ 1.134. Then R = 2.0 m × 1.134 = 2.268 m.' },
            { text: 'Verify physical reasonableness: Critical angle ~48.6° is less than 90°, so a finite circle exists.' },
            { text: 'State final answers with units: Critical angle ic = 48.6° (or 0.848 rad). Radius of escape circle R = 2.27 m.', faded: true, blankAnswer: 'Critical angle ic = 48.6° (or sin⁻¹(0.75) ≈ 0.848 rad)..' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_09_004', title: 'Identify each idea',
          dissect: { specimen: 'Refraction of Light: Snell\'s Law', spots: [
            { id: 's1', label: 'Refraction is the bending of', prompt: 'Which idea is this? — Refraction is the bending of a light ray when it passes obliquely from one transparent.', answer: 'Refraction is the bending of', options: ['Refraction is the bending of', 'Total Internal Reflection TIR is'] },
            { id: 's2', label: 'Total Internal Reflection TIR is', prompt: 'Which idea is this? — Total Internal Reflection (TIR) is the phenomenon where a light ray traveling in an.', answer: 'Total Internal Reflection TIR is', options: ['Total Internal Reflection TIR is', 'Refraction is the bending of'] }
          ] } }
    ],
    explore: { component: C12_PhysicsPrismRefractionSim, prompt: 'Explore the interactive — Refraction of Light: Snell\'s Law' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_003', difficulty: 'standard',
          question: 'Refraction is the bending of a light ray when it passes obliquely from one.',
          hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric.',
          misconception: 'Students often believe that "optically denser" means "higher mass density".',
          parts: [
                { id: 'a', prompt: 'State Snell\'s law of refraction in terms of the absolute refractive indices of the two media and the angles of incidence and refraction.', answer: 'Snell\'s law: n₁ sin i = n₂ sin r',
                  options: ['Snell\'s law: n₁ sin i = n₂ sin r', 'optically denser', 'higher mass density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'b', prompt: 'A ray of light travels from water (n = 1.33) into crown glass (n = 1.52). Will the ray bend towards the normal or away from the normal?', answer: 'The ray bends towards the normal',
                  options: ['The ray bends towards the normal', 'away from the normal', 'optically denser'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'c', prompt: 'A light ray in air (n = 1.00) strikes a glass slab (n = 1.50) at an angle of incidence of 35°. Calculate the angle of refraction inside the glass.', answer: 'Given: n₁ = 1.00, n₂ = 1.50, i = 35°',
                  options: ['Given: n₁ = 1.00, n₂ = 1.50, i = 35°', 'optically denser', 'higher mass density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' }
          ],
            remediations: { 'optically-denser-means-higher-mass': { steps: ['If a student confuses optical vs mass density, have them measure the speed of light in different media using the.', 'For the index-swapping error, make them derive n₂₁ = sin i / sin r from n = c/v and the wavefront diagram (Huygens\'.', 'Then re-do Diagnostic Question 2 and 4 with this derivation fresh in mind.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_004', difficulty: 'standard',
          question: 'Total Internal Reflection (TIR) is the phenomenon where a light ray traveling.',
          hint: 'If stuck, review the derivation of Snell\'s law in node c12_phy_cbse_09_003 and the.',
          misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium.',
          parts: [
                { id: 'a', prompt: 'A ray of light travels from glass (n = 1.5) to air (n = 1.0). The angle of incidence is 40°. Will total internal reflection occur?', answer: 'Correct answer: Critical angle ic = sin⁻¹(1/1.5) = sin⁻¹(0.6667) ≈ 41.8°',
                  options: ['Correct answer: Critical angle ic = sin⁻¹(1/1.5) = sin⁻¹(0.6667) ≈ 41.8°', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' },
                { id: 'b', prompt: 'Calculate the critical angle for a diamond-air interface (refractive index of diamond = 2.42).', answer: 'Correct answer: ic = sin⁻¹(1/2.42) = sin⁻¹(0.4132) ≈ 24.4°',
                  options: ['Correct answer: ic = sin⁻¹(1/2.42) = sin⁻¹(0.4132) ≈ 24.4°', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' }
          ],
            remediations: { 'total-internal-reflection-occurs-when': { steps: ['If the student cannot derive the critical angle condition or confuses the media direction: (1) Revisit node.', 'Increase i step by step (30°, 40°, 41.8°, 45°) and calculate r.', 'Show that at i=41.8°, r=90°; at i=45°, sin r = 1.5 × sin 45° = 1.06 > 1 → impossible.', '(2) Do the "coin in a cup" experiment: Place a coin at the bottom of an opaque cup.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a mirage, the inverted image of a tree is formed because light from the tree undergoes total internal reflection at a layer of hot air.', answer: 'Correct evaluation: The statement is partially correct but misleading',
                  options: ['Correct evaluation: The statement is partially correct but misleading', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' }
          ],
            remediations: { 'total-internal-reflection-occurs-when': { steps: ['If the student cannot derive the critical angle condition or confuses the media direction: (1) Revisit node.', 'Increase i step by step (30°, 40°, 41.8°, 45°) and calculate r.', 'Show that at i=41.8°, r=90°; at i=45°, sin r = 1.5 × sin 45° = 1.06 > 1 → impossible.', '(2) Do the "coin in a cup" experiment: Place a coin at the bottom of an opaque cup.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
