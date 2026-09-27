import type { SimDef } from '../../engine/types';
import C12_PhysicsRutherfordScatteringSim from '../../../simulations/three/C12_PhysicsRutherfordScatteringSim';

/** v3 wrapped master — C12_PhysicsRutherfordScatteringSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsrutherfordscatteringsim: SimDef = {
    id: 'v3w_c12_physicsrutherfordscatteringsim',
    title: 'Rutherford Scattering',
    subtitle: 'This node covers: (a) the historical alpha-scattering experiment and its key.',
    classLevel: 12, subject: 'physics', topic: 'Rutherford\'s Nuclear Model: Alpha Scattering Experiment',
    chapters: [],
    nodeIds: ['c12_phy_cbse_12_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine holding a thin gold leaf used in Indian traditional sweets (varak) — it is so thin that light passes.', goal: 'Master Rutherford Scattering.' },
    discovery: {
        question: 'The Geiger-Marsden experiment used a gold foil of thickness 2.1 × 10⁻⁷ m.',
        options: ['**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m', 'thin foil reduces absorption', 'multiple scattering increases large-angle events'],
        answer: '**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m',
        hook: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact.',
    },
    teaching: [
        { title: 'Rutherford\'s nuclear model of the atom.', text: 'Rutherford\'s nuclear model of the atom states that the entire positive charge and nearly all the mass of an atom are concentrated in a tiny, dense nucleus (radius ~10⁻¹⁵ m), while electrons revolve.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_001', title: 'Rutherford\'s nuclear model of the atom.',
          scaffold: { problem: 'In a Rutherford scattering experiment, α-particles of kinetic energy 5.5 MeV are incident on a thin gold foil (Z = 79).',
            steps: [
            { text: 'Identify given: K = 5.5 MeV (not needed for ratio), θ₁ = 30°, N₁ = 1000 min⁻¹, θ₂ = 90°.' },
            { text: 'Compute sin(θ₁/2) = sin(15°) = 0.2588; sin⁴(15°) = (0.2588)⁴ = 0.00448.' },
            { text: 'Compute sin(θ₂/2) = sin(45°) = 0.7071; sin⁴(45°) = (0.7071)⁴ = 0.25.' },
            { text: 'Ratio N₂/N₁ = sin⁴(θ₁/2) / sin⁴(θ₂/2) = 0.00448 / 0.25 = 0.01792.' },
            { text: 'N₂ = 1000 × 0.01792 = 17.92 ≈ 18 particles per minute.', faded: true, blankAnswer: '18 particles per minute (at 90°).' }
            ] } }
    ],
    explore: { component: C12_PhysicsRutherfordScatteringSim, prompt: 'Explore the interactive — Rutherford Scattering' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_001', difficulty: 'standard',
          question: 'Rutherford\'s nuclear model of the atom states that the entire positive charge.',
          hint: 'If stuck, review c11_phy_cbse_05_010 (Conservation of Mechanical Energy) and practice.',
          misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact.',
          parts: [
                { id: 'a', prompt: 'The Geiger-Marsden experiment used a gold foil of thickness 2.1 × 10⁻⁷ m.', answer: '**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m',
                  options: ['**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m', 'thin foil reduces absorption', 'multiple scattering increases large-angle events'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact force**, like a.' }
          ],
            remediations: { 'the-particle-hits-the-nucleus': { steps: ['If the student holds the "contact collision" misconception: 1.', 'Revisit the energy-conservation derivation (Worked Example 3) step by step, emphasizing that at *d*, velocity = 0 and.', 'Watch a simulation of Rutherford scattering (e.g., PhET "Rutherford Scattering") to visualize the hyperbolic trajectory.', 'Solve a problem: "Calculate the Coulomb force at *d* for the gold foil example.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact.',
          parts: [
                { id: 'a', prompt: 'The Geiger-Marsden experiment used a gold foil of thickness 2.1 × 10⁻⁷ m.', answer: '**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m',
                  options: ['**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m', 'thin foil reduces absorption', 'multiple scattering increases large-angle events'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact force**, like a.' }
          ],
            remediations: { 'the-particle-hits-the-nucleus': { steps: ['If the student holds the "contact collision" misconception: 1.', 'Revisit the energy-conservation derivation (Worked Example 3) step by step, emphasizing that at *d*, velocity = 0 and.', 'Watch a simulation of Rutherford scattering (e.g., PhET "Rutherford Scattering") to visualize the hyperbolic trajectory.', 'Solve a problem: "Calculate the Coulomb force at *d* for the gold foil example.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
