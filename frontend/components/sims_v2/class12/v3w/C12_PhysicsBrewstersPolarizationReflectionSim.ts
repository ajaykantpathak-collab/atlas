import type { SimDef } from '../../engine/types';
import C12_PhysicsBrewstersPolarizationReflectionSim from '../../../simulations/c6_12/C12_PhysicsBrewstersPolarizationReflectionSim';

/** v3 wrapped master — C12_PhysicsBrewstersPolarizationReflectionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsbrewsterspolarizationreflectionsim: SimDef = {
    id: 'v3w_c12_physicsbrewsterspolarizationreflectionsim',
    title: 'Brewsters Polarization Reflection',
    subtitle: 'This node covers: (a) the concept of plane polarization using polaroids, (b) Malus\'s law.',
    classLevel: 12, subject: 'physics', topic: 'Polarization of Light: Malus\'s Law',
    chapters: [],
    nodeIds: ['c12_phy_cbse_10_008', 'c12_phy_cbse_10_001', 'c12_phy_cbse_10_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a pair of polarized sunglasses: when you rotate one lens in front of the other, the view darkens and.', goal: 'Master Brewsters Polarization Reflection.' },
    discovery: {
        question: 'Define a wavefront and state Huygens\' Principle in your own words. What is the shape of the wavefront from a point source in a homogeneous isotropic medium?',
        options: ['A wavefront is the locus of points oscillating in the same phase', 'wavefront is the path of a light ray', 'wavelets are planar'],
        answer: 'A wavefront is the locus of points oscillating in the same phase',
        hook: 'Students often think the secondary wavelets are *real physical waves* emitted by each point, and that the backwave is.',
    },
    teaching: [
        { title: 'Polarization is the phenomenon of.', text: 'Polarization is the phenomenon of restricting the oscillations of the electric field vector of a transverse light wave to a single plane perpendicular to the direction of propagation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_008', title: 'Polarization is the phenomenon of.',
          scaffold: { problem: 'Unpolarized light from a 100 W bulb (assumed isotropic) is incident on a circular polaroid sheet of radius 5 cm placed 2 m away.',
            steps: [
            { text: 'Calculate the total power incident on the first polaroid. The bulb radiates 100 W uniformly over a sphere of radius 2.' },
            { text: 'First polaroid transmits half the incident unpolarized intensity.' },
            { text: 'Second polaroid at 60° to the first. Apply Malus\'s law: transmitted power = \\(0.00781 \\times \\cos^2 60^\\circ = 0.00781.' },
            { text: 'Convert back to intensity (optional): final intensity = power / area = \\(0.00195 / 0.007854 = 0.248\\ \\text{W/m}^2\\).' },
            { text: 'Verify reasonableness: final intensity is \\(1/8\\) of the original intensity at the polaroid (1/2 from first polaroid ×.', faded: true, blankAnswer: 'Transmitted intensity after first polaroid = 0.995 W/m² (or.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_001', title: 'A wavefront is the locus of all points.',
          scaffold: { problem: 'A point source of light emits waves of wavelength 500 nm in air (speed 3.0 × 10⁸ m/s). At t = 0, a spherical wavefront has radius 2.0 m.',
            steps: [
            { text: 'Identify given quantities: λ = 500 nm = 5.0 × 10⁻⁷ m, v = 3.0 × 10⁸ m/s, R₀ = 2.0 m, Δt = 5.0 × 10⁻⁸ s.' },
            { text: 'Calculate distance traveled by wavefront in time Δt: ΔR = v Δt = (3.0 × 10⁸ m/s) × (5.0 × 10⁻⁸ s) = 15.0 m.' },
            { text: 'New radius R = R₀ + ΔR = 2.0 m + 15.0 m = 17.0 m.' },
            { text: 'Number of wavelengths in the radial thickness = ΔR / λ = 15.0 m / (5.0 × 10⁻⁷ m) = 3.0 × 10⁷ wavelengths.' },
            { text: 'Verify: 17 m radius is reasonable for light in 50 ns (light travels 15 m in 50 ns). Unit check: m/s × s = m ✓.', faded: true, blankAnswer: 'New radius = 17.0 m; Number of wavelengths between.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_002', title: 'Huygens\' principle states that every.',
          scaffold: { problem: 'A plane wave of light in air (n = 1.00) is incident on a water surface (n = 4/3) at an angle of incidence of 45°.',
            steps: [
            { text: 'Identify given: n₁ = 1.00, n₂ = 4/3 ≈ 1.333, i = 45°, c = 3.00 × 10⁸ m/s. Find r, λ₂/λ₁, v₂.' },
            { text: 'Apply Snell\'s law: n₁ sin i = n₂ sin r → 1.00 × sin 45° = (4/3) sin r → sin r = (3/4) × (1/√2) = 3/(4√2) ≈ 0.5303.' },
            { text: 'Compute r = sin⁻¹(0.5303) ≈ 32.03°.' },
            { text: 'Wavelength ratio: λ₂/λ₁ = v₂/v₁ = n₁/n₂ = 1 / (4/3) = 3/4 = 0.75.' },
            { text: 'Speed in water: v₂ = c / n₂ = (3.00 × 10⁸) / (4/3) = 2.25 × 10⁸ m/s.' },
            { text: 'Verify: v₂ < c, r < i, λ₂ < λ₁ — all consistent with denser medium.', faded: true, blankAnswer: '(a) r ≈ 32.0°, (b) λ_water / λ_air = 0.75, (c) v_water =.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_10_001', title: 'Identify each idea',
          dissect: { specimen: 'Brewsters Polarization Reflection', spots: [
            { id: 's1', label: 'Polarization is the phenomenon of', prompt: 'Which idea is this? — Polarization is the phenomenon of restricting the oscillations of the electric field.', answer: 'Polarization is the phenomenon of', options: ['Polarization is the phenomenon of', 'A wavefront is the locus', 'Huygens principle states that every'] },
            { id: 's2', label: 'A wavefront is the locus', prompt: 'Which idea is this? — A wavefront is the locus of all points in a medium that oscillate in the same phase at a.', answer: 'A wavefront is the locus', options: ['A wavefront is the locus', 'Polarization is the phenomenon of', 'Huygens principle states that every'] },
            { id: 's3', label: 'Huygens principle states that every', prompt: 'Which idea is this? — Huygens\' principle states that every point on a wavefront acts as a source of secondary.', answer: 'Huygens principle states that every', options: ['Huygens principle states that every', 'Polarization is the phenomenon of', 'A wavefront is the locus'] }
          ] } }
    ],
    explore: { component: C12_PhysicsBrewstersPolarizationReflectionSim, prompt: 'Explore the interactive — Brewsters Polarization Reflection' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_008', difficulty: 'standard',
          question: 'Polarization is the phenomenon of restricting the oscillations of the electric.',
          hint: 'If stuck, revisit vector resolution of forces (Class 11 Physics Chapter 4) and the.',
          misconception: 'Students often think that when unpolarized light passes through a polaroid, the transmitted intensity is \\(I_0.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Polarization is the phenomenon of restricting the oscillations of the electric field',
                  options: ['Polarization is the phenomenon of restricting the oscillations of the electric field', 'A wavefront is the locus of all points in a medium that oscillate in the same phase at a', 'Huygens\' principle states that every point on a wavefront acts as a source of secondary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when unpolarized light passes through a polaroid, the transmitted intensity is \\(I_0 \\cos^2\\theta\\) where.' }
          ],
            remediations: { 'when-unpolarized-light-passes-through': { steps: ['If the student cannot correctly apply Malus\'s law or distinguish unpolarized vs polarized incident light: (1) Revisit.', '(2) Practice the "average of \\(\\cos^2\\theta\\)" calculation: \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} \\cos^2\\theta\\, d\\theta =.', '(3) Perform the three-polaroid demonstration physically (or watch a video) to see that crossed polaroids transmit light.', '(4) Re-solve Diagnostic Question 3 step-by-step, labeling each stage with polarization direction and intensity.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_001', difficulty: 'standard',
          question: 'A wavefront is the locus of all points in a medium that oscillate in the same.',
          hint: 'If stuck on wavelet construction, revisit c11_phy_cbse_14_001 (wave basics) and practice.',
          misconception: 'Students often think the secondary wavelets are *real physical waves* emitted by each point, and that the backwave is.',
          parts: [
                { id: 'a', prompt: 'Define a wavefront and state Huygens\' Principle in your own words. What is the shape of the wavefront from a point source in a homogeneous isotropic medium?', answer: 'A wavefront is the locus of points oscillating in the same phase',
                  options: ['A wavefront is the locus of points oscillating in the same phase', 'wavefront is the path of a light ray', 'wavelets are planar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the secondary wavelets are *real physical waves* emitted by each point, and that the backwave is absent because.' },
                { id: 'b', prompt: 'A plane wavefront is incident on a glass slab (refractive index 1.5) at an angle of 30° to the normal.', answer: 'Given: n₁=1 (air), n₂=1.5 (glass), i=30°',
                  options: ['Given: n₁=1 (air), n₂=1.5 (glass), i=30°', 'energy doesn\'t go backward'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the secondary wavelets are *real physical waves* emitted by each point, and that the backwave is absent because.' }
          ],
            remediations: { 'the-secondary-wavelets-are-real': { steps: ['Revisit Class 11 wave basics: c11_phy_cbse_14_001 (transverse/longitudinal waves), c11_phy_cbse_14_002 (wave speed v =.', 'Draw wavefronts for a point source and a distant source on paper; practice constructing secondary wavelets with a.', 'Watch the ripple tank simulation at http://www.falstad.com/ripple/ (select "Plane Wave" source).', 'Re-attempt Diagnostic Questions 2 and 4, focusing on the envelope construction, not energy arguments.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the secondary wavelets are *real physical waves* emitted by each point, and that the backwave is.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Huygens\' Principle is just a geometric trick; it doesn\'t explain why light bends when entering a denser medium." Evaluate this claim.', answer: 'Huygens\' construction *predicts* the bending direction quantitatively',
                  options: ['Huygens\' construction *predicts* the bending direction quantitatively', 'energy doesn\'t go backward'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the secondary wavelets are *real physical waves* emitted by each point, and that the backwave is absent because.' }
          ],
            remediations: { 'the-secondary-wavelets-are-real': { steps: ['Revisit Class 11 wave basics: c11_phy_cbse_14_001 (transverse/longitudinal waves), c11_phy_cbse_14_002 (wave speed v =.', 'Draw wavefronts for a point source and a distant source on paper; practice constructing secondary wavelets with a.', 'Watch the ripple tank simulation at http://www.falstad.com/ripple/ (select "Plane Wave" source).', 'Re-attempt Diagnostic Questions 2 and 4, focusing on the envelope construction, not energy arguments.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_002', difficulty: 'standard',
          question: 'Huygens\' principle states that every point on a wavefront acts as a source of.',
          hint: 'If stuck on the triangle geometry, review the congruence criteria (RHS) for right.',
          misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.',
          parts: [
                { id: 'a', prompt: 'State Huygens\' principle in your own words and write the mathematical form of Snell\'s law of refraction using refractive indices n₁ and n₂.', answer: 'Huygens\' principle: Each point on a wavefront is a source of secondary wavelets',
                  options: ['Huygens\' principle: Each point on a wavefront is a source of secondary wavelets', 'frequency decreases in denser medium', 'during refraction, the frequency of light changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.' },
                { id: 'b', prompt: 'A plane wave of wavelength 500 nm in air (n = 1.00) enters a glass slab (n = 1.50) at an angle of incidence 30°.', answer: 'the angle of refraction, (',
                  options: ['the angle of refraction, (', 'frequency decreases in denser medium', 'during refraction, the frequency of light changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.' },
                { id: 'c', prompt: 'The corpuscular model (Newton) predicted that light bends towards the normal when entering a denser medium because its speed increases.', answer: 'In the construction, sin i / sin r = v₁ / v₂',
                  options: ['In the construction, sin i / sin r = v₁ / v₂', 'both models predict same bending', 'frequency decreases in denser medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.' }
          ],
            remediations: { 'during-refraction': { steps: ['If the student believes frequency changes, have them revisit the wavefront continuity argument: the number of wave.', 'Use the analogy of a train crossing a border: wagons (crests) per minute is fixed, but their spacing (wavelength).', 'Then re-derive λ₂ = λ₁(v₂/v₁) from v = fλ with f constant.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.',
          parts: [
                { id: 'a', prompt: 'A student derives Snell\'s law as sin i / sin r = v₂ / v₁ (inverted speed ratio).', answer: 'In Fig',
                  options: ['In Fig', 'frequency decreases in denser medium', 'during refraction, the frequency of light changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.' },
                { id: 'b', prompt: 'Design a simple ripple tank experiment to verify the law of reflection using Huygens\' principle.', answer: 'Use a ripple tank with a straight barrier (reflector)',
                  options: ['Use a ripple tank with a straight barrier (reflector)', 'frequency decreases in denser medium', 'during refraction, the frequency of light changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that during refraction, the frequency of light changes because the speed and wavelength change.' }
          ],
            remediations: { 'during-refraction': { steps: ['If the student believes frequency changes, have them revisit the wavefront continuity argument: the number of wave.', 'Use the analogy of a train crossing a border: wagons (crests) per minute is fixed, but their spacing (wavelength).', 'Then re-derive λ₂ = λ₁(v₂/v₁) from v = fλ with f constant.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
