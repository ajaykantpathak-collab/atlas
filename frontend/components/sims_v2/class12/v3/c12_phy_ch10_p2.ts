import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch10_p2: SimDef = {
    id: 'v3_c12_phy_ch10_p2',
    title: 'Wave Optics · Part 2/2',
    subtitle: 'Each point ripples — the envelope is the future',
    classLevel: 12, subject: 'physics', topic: 'Wave Optics · Part 2/2',
    chapters: ['c12_phy_ch10'],
    nodeIds: ['c12_phy_cbse_10_007', 'c12_phy_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Wavefront constructor', intro: 'A pebble\'s rings on a pond are wavefronts; Huygens said every point on each ring starts the next one.', goal: 'Apply Huygens\' principle — secondary wavelets, forward envelopes, and refraction from speed contrast.' },
    discovery: {
        question: 'Light enters glass and bends toward the normal — Newton\'s particles predicted the opposite, yet Huygens\' wavelets got it right in 1678. What does the geometry force?',
        options: ['Slower wavelets tilt the front — with v₂ < v₁ the inner wavelet is smaller, so the envelope must swing toward the normal: sin i/sin r = v₁/v₂', 'Light gets heavier', 'Glass pulls rays', 'Density absorbs speed'],
        answer: 'Slower wavelets tilt the front — with v₂ < v₁ the inner wavelet is smaller, so the envelope must swing toward the normal: sin i/sin r = v₁/v₂',
        hook: 'Every point on a wavefront is a new source — and the next wavefront is the forward envelope of all their ripples. The backward wave was Huygens\' awkward patch: he declared its amplitude zero by hand, and modern theory only later showed it cancels by phase.',
    },
    teaching: [
        { title: 'Diffraction: Single Slit Experiment', text: 'Single slit diffraction is the phenomenon where a plane wavefront passing through a narrow slit of width \\(a\\) spreads out and produces a pattern of alternating bright and dark fringes on a distant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_10_007', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Construct propagation by hand: place secondary sources on a wavefront, draw wavelets of radius vΔt, and tangent-envelope your way to the new front — spherical and plane.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_007', title: 'Diffraction: Single Slit Experiment',
          scaffold: { problem: 'Monochromatic light of wavelength 632.8 nm (He-Ne laser) passes through a single slit of width 0.15 mm.',
            steps: [
            { text: 'Identify given quantities: \\(\\lambda = 632.8 \\times 10^{-9}\\,\\text{m}\\), \\(a = 0.15 \\times 10^{-3}\\,\\text{m}\\), \\(D.' },
            { text: 'Use the minima condition \\(a \\sin\\theta_1 = \\lambda\\) (first minimum, \\(n=1\\)).' },
            { text: 'Compute \\(\\theta_1 = \\lambda/a = (632.8 \\times 10^{-9}) / (0.15 \\times 10^{-3}) = 4.2187 \\times 10^{-3}\\,\\text{rad}\\).' },
            { text: 'Linear distance \\(y_1 = D \\tan\\theta_1 \\approx D \\theta_1 = 2.5 \\times 4.2187 \\times 10^{-3} = 0.0105467\\,\\text{m}.' },
            { text: 'Central maximum width = \\(2y_1 = 21.09\\,\\text{mm}\\). Check: \\(y_1 \\ll D\\) (10.5 mm vs 2500 mm), so small-angle.', faded: true, blankAnswer: '(a) \\(\\theta_1 = 4.22 \\times 10^{-3}\\,\\text{rad}\\) (or.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_008', title: 'Polarization of Light: Malus\'s Law',
          scaffold: { problem: 'Unpolarized light from a 100 W bulb (assumed isotropic) is incident on a circular polaroid sheet of radius 5 cm placed 2 m away.',
            steps: [
            { text: 'Calculate the total power incident on the first polaroid. The bulb radiates 100 W uniformly over a sphere of radius 2.' },
            { text: 'First polaroid transmits half the incident unpolarized intensity.' },
            { text: 'Second polaroid at 60° to the first. Apply Malus\'s law: transmitted power = \\(0.00781 \\times \\cos^2 60^\\circ = 0.00781.' },
            { text: 'Convert back to intensity (optional): final intensity = power / area = \\(0.00195 / 0.007854 = 0.248\\ \\text{W/m}^2\\).' },
            { text: 'Verify reasonableness: final intensity is \\(1/8\\) of the original intensity at the polaroid (1/2 from first polaroid.', faded: true, blankAnswer: 'Transmitted intensity after first polaroid = 0.995 W/m² (or.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate coding an underwater camera\'s ray tracer assumes light \'speeds up in denser water — more stuff to push it along,\' bending rays away from the normal.',
            decisions: [{ prompt: 'What does Huygens\' wave model say instead?', options: [
                { text: 'Light slows in the denser medium — wavelets advance a shorter distance in the same time, so the wavefront swings toward the normal, giving sin i / sin r = v₁/v₂ = n₂/n₁; the speed-up-and-bend-away model is the losing corpuscular theory.', outcome: 'The chapter\'s verdict: Huygens\' construction forces v₂ < v₁ when r < i — the measured slowing in water (Foucault) is what killed the particle model.' },
                { text: 'He\'s right — denser medium means stronger propagation, hence faster light.', outcome: 'That\'s Newton\'s corpuscular prediction and experiment killed it — the wave construction necessarily bends the front toward the normal by shortening the wavelets\' reach in the denser medium.', reveals: 'denser-equals-faster' },
                { text: 'Speed stays constant — only the wavelength changes, so the bend is an illusion.', outcome: 'Frequency stays constant; speed and wavelength both drop by the refractive index — v = c/n isn\'t an illusion, it\'s what produces the measured bend.', reveals: 'speed-fixed-wavelength-bends' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_10_008', title: 'You made it',
          caseStudy: { intro: 'You can now build wave propagation geometrically — and watch refraction emerge as a speed difference, not a rule.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_007', difficulty: 'standard',
          question: 'Single slit diffraction is the phenomenon where a plane wavefront passing.',
          hint: 'If stuck, review the derivation of minima in NCERT Section 10.6.1 (pairing of wavelets.',
          misconception: 'Students often write the minima condition as \\(a\\sin\\theta = (n+\\tfrac12)\\lambda\\) by analogy with double-slit.',
          parts: [
                { id: 'a', prompt: 'Explain why the central maximum in a single-slit pattern is twice as wide (angularly) as the secondary maxima, using the concept of pairing Huygens wavelets.', answer: 'The first minima occur at \\(a\\sin\\theta = \\pm\\lambda\\)',
                  options: ['The first minima occur at \\(a\\sin\\theta = \\pm\\lambda\\)', 'all maxima have the same width'],
                  hint: 'If stuck, review the derivation of minima in NCERT Section 10.6.1 (pairing of wavelets from the top.',
                  misconception: 'Students often write the minima condition as \\(a\\sin\\theta = (n+\\tfrac12)\\lambda\\) by analogy with double-slit destructive interference,.' }
          ],
            remediations: { 'students-often-write-the-minima': { steps: ['Revisit node c12_phy_cbse_10_001 (Huygens\' principle) to recall how secondary wavelets propagate from a wavefront.', 'Re-read the NCERT derivation in Section 10.6.1: draw the slit, divide it into two halves, and show that for the first.', 'Practice the pairing argument: for the \\(n\\)-th minimum, divide the slit into \\(2n\\) equal strips; adjacent strips.', 'Re-attempt Diagnostic Question 1 and 2 after this review.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_008', difficulty: 'standard',
          question: 'Polarization is the phenomenon of restricting the oscillations of the electric.',
          hint: 'If stuck, revisit vector resolution of forces (Class 11 Physics Chapter 4) and the.',
          misconception: 'Students often think that when unpolarized light passes through a polaroid, the transmitted intensity is \\(I_0.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Polarization is the phenomenon of restricting the oscillations of the electric field',
                  options: ['Polarization is the phenomenon of restricting the oscillations of the electric field', 'A wavefront is the locus of all points in a medium that oscillate in the same phase at a', 'Huygens\' principle states that every point on a wavefront acts as a source of secondary', 'The Doppler effect in light is the change in observed frequency (or wavelength) of light'],
                  hint: 'If stuck, revisit vector resolution of forces (Class 11 Physics Chapter 4) and the trigonometric.',
                  misconception: 'Students often think that when unpolarized light passes through a polaroid, the transmitted intensity is \\(I_0 \\cos^2\\theta\\) where.' }
          ],
            remediations: { 'when-unpolarized-light-passes-through': { steps: ['If the student cannot correctly apply Malus\'s law or distinguish unpolarized vs polarized incident light: (1) Revisit.', '(2) Practice the "average of \\(\\cos^2\\theta\\)" calculation: \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} \\cos^2\\theta\\, d\\theta.', '(3) Perform the three-polaroid demonstration physically (or watch a video) to see that crossed polaroids transmit light.', '(4) Re-solve Diagnostic Question 3 step-by-step, labeling each stage with polarization direction and intensity.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
