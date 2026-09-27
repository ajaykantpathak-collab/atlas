import type { SimDef } from '../../engine/types';
import C12_PhysicsEMWavePropagationSim from '../../../simulations/three/C12_PhysicsEMWavePropagationSim';

/** v3 wrapped master — C12_PhysicsEMWavePropagationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsemwavepropagationsim: SimDef = {
    id: 'v3w_c12_physicsemwavepropagationsim',
    title: 'EMWave Propagation',
    subtitle: 'Covers: transverse nature, mathematical representation (sinusoidal plane wave), speed in.',
    classLevel: 12, subject: 'physics', topic: 'Properties of Electromagnetic Waves',
    chapters: [],
    nodeIds: ['c12_phy_cbse_08_004', 'c12_phy_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a microwave oven: the rotating turntable ensures even heating because the microwaves form standing.', goal: 'Master EMWave Propagation.' },
    discovery: {
        question: 'A plane EM wave in vacuum has electric field amplitude \\(E_0 = 120 \\text{ N/C}\\).',
        options: ['From Maxwell’s equations, the wave speed \\(c = E_0/B_0\\)', 'they are just proportional', 'out of phase'],
        answer: 'From Maxwell’s equations, the wave speed \\(c = E_0/B_0\\)',
        hook: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit).',
    },
    teaching: [
        { title: 'An electromagnetic wave is a.', text: 'An electromagnetic wave is a self-propagating transverse wave consisting of mutually perpendicular, sinusoidally oscillating electric field vector **E** and magnetic field vector **B**, both.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_004', title: 'An electromagnetic wave is a.',
          scaffold: { problem: 'A plane electromagnetic wave of frequency 50.0 MHz travels in vacuum along the +x direction.',
            steps: [
            { text: 'Identify given: \\(f = 50.0 \\times 10^6 \\text{ Hz}\\), \\(\\mathbf{E} = 6.0 \\hat{\\mathbf{j}} \\text{ V/m}\\) (amplitude \\(E_0.' },
            { text: 'Use \\(c = 3.00 \\times 10^8 \\text{ m/s}\\). Direction: \\(\\mathbf{E} \\times \\mathbf{B}\\) must point along \\(+x\\).' },
            { text: 'Compute \\(B_0 = E_0 / c = 6.0 / (3.00 \\times 10^8) = 2.0 \\times 10^{-8} \\text{ T}\\).' },
            { text: 'Find \\(\\omega = 2\\pi f = 2\\pi \\times 50.0 \\times 10^6 = 3.14 \\times 10^8 \\text{ rad/s}\\).' },
            { text: 'Write \\(\\mathbf{E}(x,t) = 6.0 \\sin(1.05 x - 3.14 \\times 10^8 t) \\hat{\\mathbf{j}} \\text{ V/m}\\).' },
            { text: 'Average intensity \\(I = \\frac{1}{2}\\varepsilon_0 c E_0^2 = \\frac{1}{2} \\times 8.85 \\times 10^{-12} \\times 3.00 \\times.', faded: true, blankAnswer: '(a) \\(\\mathbf{B} = 2.0 \\times 10^{-8} \\hat{\\mathbf{k}}.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_008', title: 'Polarization is the phenomenon of.',
          scaffold: { problem: 'Unpolarized light from a 100 W bulb (assumed isotropic) is incident on a circular polaroid sheet of radius 5 cm placed 2 m away.',
            steps: [
            { text: 'Calculate the total power incident on the first polaroid. The bulb radiates 100 W uniformly over a sphere of radius 2.' },
            { text: 'First polaroid transmits half the incident unpolarized intensity.' },
            { text: 'Second polaroid at 60° to the first. Apply Malus\'s law: transmitted power = \\(0.00781 \\times \\cos^2 60^\\circ = 0.00781.' },
            { text: 'Convert back to intensity (optional): final intensity = power / area = \\(0.00195 / 0.007854 = 0.248\\ \\text{W/m}^2\\).' },
            { text: 'Verify reasonableness: final intensity is \\(1/8\\) of the original intensity at the polaroid (1/2 from first polaroid ×.', faded: true, blankAnswer: 'Transmitted intensity after first polaroid = 0.995 W/m² (or.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'EMWave Propagation', spots: [
            { id: 's1', label: 'An electromagnetic wave is a', prompt: 'Which idea is this? — An electromagnetic wave is a self-propagating transverse wave consisting of mutually.', answer: 'An electromagnetic wave is a', options: ['An electromagnetic wave is a', 'Polarization is the phenomenon of'] },
            { id: 's2', label: 'Polarization is the phenomenon of', prompt: 'Which idea is this? — Polarization is the phenomenon of restricting the oscillations of the electric field.', answer: 'Polarization is the phenomenon of', options: ['Polarization is the phenomenon of', 'An electromagnetic wave is a'] }
          ] } }
    ],
    explore: { component: C12_PhysicsEMWavePropagationSim, prompt: 'Explore the interactive — EMWave Propagation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_004', difficulty: 'standard',
          question: 'An electromagnetic wave is a self-propagating transverse wave consisting of.',
          hint: 'If stuck on the wave derivation, review c12_phy_cbse_08_002 (Maxwell’s Equations) and.',
          misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit).',
          parts: [
                { id: 'a', prompt: 'State the mutual orientation of the electric field **E**, magnetic field **B**, and propagation vector **k** in a plane electromagnetic wave travelling in.', answer: '**E**, **B**, and **k** are mutually perpendicular (orthogonal triad)',
                  options: ['**E**, **B**, and **k** are mutually perpendicular (orthogonal triad)', 'out of phase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see.' },
                { id: 'b', prompt: 'A plane EM wave in vacuum has electric field amplitude \\(E_0 = 120 \\text{ N/C}\\).', answer: 'From Maxwell’s equations, the wave speed \\(c = E_0/B_0\\)',
                  options: ['From Maxwell’s equations, the wave speed \\(c = E_0/B_0\\)', 'they are just proportional', 'out of phase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see.' },
                { id: 'c', prompt: 'A radio station broadcasts at \\(f = 98.3 \\text{ MHz}\\) with an average intensity \\(I = 2.5 \\times 10^{-6} \\text{ W/m}^2\\) at a certain distance.', answer: 'the wavelength \\(\\lambda\\), (',
                  options: ['the wavelength \\(\\lambda\\), (', 'out of phase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see.' }
          ],
            remediations: { 'the-electric-and-magnetic-fields': { steps: ['Revisit c11_phy_cbse_14_001 (Transverse vs Longitudinal Waves) to reinforce perpendicular oscillations.', 'Re-derive the plane wave solution from Maxwell’s equations in vacuum (c12_phy_cbse_08_002) step by step: start with.', 'Substitute sinusoidal trial functions to get \\(k E_0 = \\omega B_0\\) and \\(k B_0 = \\mu_0\\varepsilon_0 \\omega E_0\\) →.', 'Redo Diagnostic Q2 and Q3 with this derivation fresh in mind.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
