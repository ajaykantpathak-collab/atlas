import type { SimDef } from '../../engine/types';
import C12_PhysicsSingleSlitDiffractionSim from '../../../simulations/c6_12/C12_PhysicsSingleSlitDiffractionSim';

/** v3 wrapped master — C12_PhysicsSingleSlitDiffractionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicssingleslitdiffractionsim: SimDef = {
    id: 'v3w_c12_physicssingleslitdiffractionsim',
    title: 'Young\'s Double Slit Experiment: Fringe Width',
    subtitle: 'This node covers the Young\'s double slit experiment (YDSE) geometry, derivation of fringe.',
    classLevel: 12, subject: 'physics', topic: 'Young\'s Double Slit Experiment: Fringe Width',
    chapters: [],
    nodeIds: ['c12_phy_cbse_10_005', 'c12_phy_cbse_10_006', 'c12_phy_cbse_10_007', 'c12_phy_cbse_10_004', 'c12_phy_cbse_10_001', 'c12_phy_cbse_10_002', 'c12_phy_cbse_11_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe the colorful rings on a soap bubble or the rainbow pattern on a CD/DVD — these are interference.', goal: 'Master Young\'s Double Slit Experiment: Fringe Width.' },
    discovery: {
        question: 'In a YDSE setup, if the slit separation d is doubled while λ and D remain unchanged, what happens to the fringe width?',
        options: ['Fringe width β halves (β ∝ 1/d)', 'fringe width doubles', 'no change'],
        answer: 'Fringe width β halves (β ∝ 1/d)',
        hook: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from.',
    },
    teaching: [
        { title: 'Fringe width (β) in Young\'s double slit.', text: 'Fringe width (β) in Young\'s double slit experiment is the distance between two consecutive bright fringes (or two consecutive dark fringes) on the interference pattern observed on a screen.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_005', title: 'Fringe width (β) in Young\'s double slit.',
          scaffold: { problem: 'In a Young\'s double slit experiment using a green laser (λ = 532 nm), the slits are separated by 0.25 mm and the screen is 1.8 m away.',
            steps: [
            { text: 'Identify given quantities with units: λ = 532 nm = 532 × 10⁻⁹ m, d = 0.25 mm = 0.25 × 10⁻³ m = 2.5 × 10⁻⁴ m, D = 1.8 m.' },
            { text: 'Write the relevant formulas: (a) β = λD/d, (b) xₙ(bright) = nλD/d, (c) xₙ(dark) = (n + ½)λD/d.' },
            { text: 'Compute fringe width β = (532 × 10⁻⁹ × 1.8) / (2.5 × 10⁻⁴) = (957.6 × 10⁻⁹) / (2.5 × 10⁻⁴) = 383.04 × 10⁻⁵ = 3.8304 ×.' },
            { text: 'Compute 5th bright fringe (n = 5): x₅ = 5 × β = 5 × 3.8304 mm = 19.152 mm ≈ 1.915 cm.' },
            { text: 'Compute 3rd dark fringe: For dark fringes, n = 0 gives first dark, so 3rd dark → n = 2.' },
            { text: 'Verify reasonableness: Fringe width ~3.8 mm is typical for lab YDSE; 5th bright at ~1.9 cm and 3rd dark at ~0.96 cm are.', faded: true, blankAnswer: '(a) β = 3.83 mm, (b) x₅(bright) = 19.15 mm, (c) x₃(dark) =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_006', title: 'In Young\'s double slit experiment,.',
          scaffold: { problem: 'In a Young\'s double slit experiment performed in a school lab, a green laser (λ = 532 nm) is used.',
            steps: [
            { text: 'Identify given quantities: λ = 532 nm = 532 × 10⁻⁹ m, d = 0.4 mm = 0.4 × 10⁻³ m, D = 1.5 m. Find β and x₅ (dark).' },
            { text: 'Fringe width formula β = λD/d. Check units: all in metres.' },
            { text: 'Substitute: β = (532 × 10⁻⁹ × 1.5) / (0.4 × 10⁻³) = (798 × 10⁻⁹) / (0.4 × 10⁻³) = 1.995 × 10⁻³ m ≈ 2.0 mm.' },
            { text: 'Dark fringe position: xₙ = (n + ½)β for n = 0,1,2... For 5th dark fringe, n = 4 (since first dark is n=0).' },
            { text: 'Verify: β ~ 2 mm is reasonable for lab setup. 5th dark at 9 mm from centre is plausible.', faded: true, blankAnswer: 'β = 2.0 mm; distance of 5th dark fringe = 9.0 mm from.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_007', title: 'Single slit diffraction is the.',
          scaffold: { problem: 'Monochromatic light of wavelength 632.8 nm (He-Ne laser) passes through a single slit of width 0.15 mm.',
            steps: [
            { text: 'Identify given quantities: \\(\\lambda = 632.8 \\times 10^{-9}\\,\\text{m}\\), \\(a = 0.15 \\times 10^{-3}\\,\\text{m}\\), \\(D =.' },
            { text: 'Use the minima condition \\(a \\sin\\theta_1 = \\lambda\\) (first minimum, \\(n=1\\)).' },
            { text: 'Compute \\(\\theta_1 = \\lambda/a = (632.8 \\times 10^{-9}) / (0.15 \\times 10^{-3}) = 4.2187 \\times 10^{-3}\\,\\text{rad}\\).' },
            { text: 'Linear distance \\(y_1 = D \\tan\\theta_1 \\approx D \\theta_1 = 2.5 \\times 4.2187 \\times 10^{-3} = 0.0105467\\,\\text{m} =.' },
            { text: 'Central maximum width = \\(2y_1 = 21.09\\,\\text{mm}\\). Check: \\(y_1 \\ll D\\) (10.5 mm vs 2500 mm), so small-angle.', faded: true, blankAnswer: '(a) \\(\\theta_1 = 4.22 \\times 10^{-3}\\,\\text{rad}\\) (or.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_10_004', title: 'Coherent sources are two or more wave.',
          scaffold: { problem: 'In a physics lab, a student uses a He-Ne laser (λ = 632.8 nm) to illuminate a double slit with separation d = 0.4 mm.',
            steps: [
            { text: 'Identify given quantities: λ = 632.8 × 10⁻⁹ m, Δx = 949.2 × 10⁻⁹ m, I₀ = 2.5 × 10⁻³ W/m².' },
            { text: 'Phase difference formula: φ = (2π/λ) × Δx. Check units: (rad/m) × m = rad ✓.' },
            { text: 'Substitute: φ = (2π / 632.8 × 10⁻⁹) × 949.2 × 10⁻⁹ = 2π × (949.2 / 632.8) = 2π × 1.5 = 3π rad.' },
            { text: 'Resultant intensity for coherent sources: I = 4I₀ cos²(φ/2) = 4 × 2.5 × 10⁻³ × cos²(3π/2) = 10 × 10⁻³ × cos²(270°) = 10.' },
            { text: 'For bright fringes, Δx = nλ. So n = Δx/λ = 949.2 / 632.8 = 1.5.' },
            { text: 'Verify: φ = 3π corresponds to Δx = 1.5λ — exactly the condition for first minimum.', faded: true, blankAnswer: '(a) φ = 3π rad (or 540°), (b) I = 0 W/m² (destructive.' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_10_006', title: 'Identify each idea',
          dissect: { specimen: 'Young\'s Double Slit Experiment: Fringe Width', spots: [
            { id: 's1', label: 'Fringe width in Youngs', prompt: 'Which idea is this? — Fringe width (β) in Young\'s double slit experiment is the distance between two.', answer: 'Fringe width in Youngs', options: ['Fringe width in Youngs', 'In Youngs double slit experiment', 'Single slit diffraction is the', 'Coherent sources are two or'] },
            { id: 's2', label: 'In Youngs double slit experiment', prompt: 'Which idea is this? — In Young\'s double slit experiment, **fringe width (β)** is the distance between two.', answer: 'In Youngs double slit experiment', options: ['In Youngs double slit experiment', 'Fringe width in Youngs', 'Single slit diffraction is the', 'Coherent sources are two or'] },
            { id: 's3', label: 'Single slit diffraction is the', prompt: 'Which idea is this? — Single slit diffraction is the phenomenon where a plane wavefront passing through a.', answer: 'Single slit diffraction is the', options: ['Single slit diffraction is the', 'Fringe width in Youngs', 'In Youngs double slit experiment', 'Coherent sources are two or'] },
            { id: 's4', label: 'Coherent sources are two or', prompt: 'Which idea is this? — Coherent sources are two or more wave sources that maintain a constant phase difference.', answer: 'Coherent sources are two or', options: ['Coherent sources are two or', 'Fringe width in Youngs', 'In Youngs double slit experiment', 'Single slit diffraction is the'] },
            { id: 's5', label: 'A wavefront is the locus', prompt: 'Which idea is this? — A wavefront is the locus of all points in a medium that oscillate in the same phase at a.', answer: 'A wavefront is the locus', options: ['A wavefront is the locus', 'Fringe width in Youngs', 'In Youngs double slit experiment', 'Single slit diffraction is the'] },
            { id: 's6', label: 'Huygens principle states that every', prompt: 'Which idea is this? — Huygens\' principle states that every point on a wavefront acts as a source of secondary.', answer: 'Huygens principle states that every', options: ['Huygens principle states that every', 'Fringe width in Youngs', 'In Youngs double slit experiment', 'Single slit diffraction is the'] }
          ] } }
    ],
    explore: { component: C12_PhysicsSingleSlitDiffractionSim, prompt: 'Explore the interactive — Young\'s Double Slit Experiment: Fringe Width' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_005', difficulty: 'standard',
          question: 'Fringe width (β) in Young\'s double slit experiment is the distance between two.',
          hint: 'If stuck, revisit node c12_phy_cbse_10_004 (Coherent Sources and Interference of Light).',
          misconception: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from.',
          parts: [
                { id: 'a', prompt: 'In a YDSE setup, if the slit separation d is doubled while λ and D remain unchanged, what happens to the fringe width?', answer: 'Fringe width β halves (β ∝ 1/d)',
                  options: ['Fringe width β halves (β ∝ 1/d)', 'fringe width doubles', 'no change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from the centre).' },
                { id: 'b', prompt: 'In a YDSE, the slits are separated by 0.5 mm and the screen is placed 2 m away.', answer: 'Given: d = 0.5 mm = 5 × 10⁻⁴ m, D = 2 m, x₄ = 2.4 mm = 2.4 × 10⁻³ m, n = 4',
                  options: ['Given: d = 0.5 mm = 5 × 10⁻⁴ m, D = 2 m, x₄ = 2.4 mm = 2.4 × 10⁻³ m, n = 4', '1500 nm', 'fringe width β depends on the fringe order n (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from the centre).' },
                { id: 'c', prompt: 'Two wavelengths λ₁ = 600 nm and λ₂ = 450 nm are used in a YDSE with d = 0.3 mm and D = 1.5 m.', answer: 'For bright fringes to coincide: n₁λ₁ = n₂λ₂ → n₁/n₂ = λ₂/λ₁ = 450/600 = 3/4',
                  options: ['For bright fringes to coincide: n₁λ₁ = n₂λ₂ → n₁/n₂ = λ₂/λ₁ = 450/600 = 3/4', 'fringe width β depends on the fringe order n (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from the centre).' }
          ],
            remediations: { 'fringe-width-depends-on-the': { steps: ['If the student confuses fringe width with fringe position: Revisit the derivation in the walkthrough — explicitly.', 'If unit conversion errors persist: Assign a dedicated drill — convert 5 quantities (e.g., 0.2 mm, 1.5 m, 600 nm, 2 cm,.', 'If the small-angle approximation is not understood: Go back to node c11_math_cbse_13_001 (Intuitive Idea of Limits) and.', 'Then re-derive Δ = d sin θ ≈ d tan θ = dx/D.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from.',
          parts: [
                { id: 'a', prompt: 'A student performs YDSE with λ = 500 nm, d = 0.4 mm, D = 1 m. They claim the 10th dark fringe is at x = 11.25 mm. Is this correct? Justify your answer.', answer: 'Position of nth dark fringe: xₙ = (n + ½)λD/d',
                  options: ['Position of nth dark fringe: xₙ = (n + ½)λD/d', 'first dark fringe', 'fringe width β depends on the fringe order n (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe fringe width β depends on the fringe order n (i.e., fringes get wider or narrower farther from the centre).' }
          ],
            remediations: { 'fringe-width-depends-on-the': { steps: ['If the student confuses fringe width with fringe position: Revisit the derivation in the walkthrough — explicitly.', 'If unit conversion errors persist: Assign a dedicated drill — convert 5 quantities (e.g., 0.2 mm, 1.5 m, 600 nm, 2 cm,.', 'If the small-angle approximation is not understood: Go back to node c11_math_cbse_13_001 (Intuitive Idea of Limits) and.', 'Then re-derive Δ = d sin θ ≈ d tan θ = dx/D.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_006', difficulty: 'standard',
          question: 'In Young\'s double slit experiment, **fringe width (β)** is the distance between.',
          hint: 'Review the derivation of fringe width β = λD/d in node c12_phy_cbse_10_005 and the.',
          misconception: 'Students often think the intensity at a bright fringe is simply the sum of individual intensities (I = I₁ + I₂ = 2I₀).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In Young\'s double slit experiment, **fringe width (β)** is the distance between two',
                  options: ['In Young\'s double slit experiment, **fringe width (β)** is the distance between two', 'Fringe width (β) in Young\'s double slit experiment is the distance between two', 'Single slit diffraction is the phenomenon where a plane wavefront passing through a', 'Coherent sources are two or more wave sources that maintain a constant phase difference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the intensity at a bright fringe is simply the sum of individual intensities (I = I₁ + I₂ = 2I₀) because they forget.' }
          ],
            remediations: { 'the-intensity-at-a-bright': { steps: ['If the student confuses coherent/incoherent addition, revisit node c12_phy_cbse_10_004 (Coherent Sources and.', 'Perform a ripple tank demonstration or use the PhET "Wave Interference" simulation: show two in-phase sources producing.', 'For small-angle errors, re-derive xₙ = nλD/d from geometry, emphasizing tan θ = x/D and sin θ = nλ/d, and the condition.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_007', difficulty: 'standard',
          question: 'Single slit diffraction is the phenomenon where a plane wavefront passing.',
          hint: 'If stuck, review the derivation of minima in NCERT Section 10.6.1 (pairing of wavelets.',
          misconception: 'Students often write the minima condition as \\(a\\sin\\theta = (n+\\tfrac12)\\lambda\\) by analogy with double-slit.',
          parts: [
                { id: 'a', prompt: 'Explain why the central maximum in a single-slit pattern is twice as wide (angularly) as the secondary maxima, using the concept of pairing Huygens wavelets.', answer: 'The first minima occur at \\(a\\sin\\theta = \\pm\\lambda\\)',
                  options: ['The first minima occur at \\(a\\sin\\theta = \\pm\\lambda\\)', 'all maxima have the same width'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the minima condition as \\(a\\sin\\theta = (n+\\tfrac12)\\lambda\\) by analogy with double-slit destructive interference, or.' }
          ],
            remediations: { 'students-often-write-the-minima': { steps: ['Revisit node c12_phy_cbse_10_001 (Huygens\' principle) to recall how secondary wavelets propagate from a wavefront.', 'Re-read the NCERT derivation in Section 10.6.1: draw the slit, divide it into two halves, and show that for the first.', 'Practice the pairing argument: for the \\(n\\)-th minimum, divide the slit into \\(2n\\) equal strips; adjacent strips.', 'Re-attempt Diagnostic Question 1 and 2 after this review.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_004', difficulty: 'standard',
          question: 'Coherent sources are two or more wave sources that maintain a constant phase.',
          hint: 'If stuck on the trigonometry, review c11_math_cbse_03_009 (sum/difference formulas) and.',
          misconception: 'Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium.',
          parts: [
                { id: 'a', prompt: 'Two identical tuning forks of frequency 512 Hz are struck simultaneously. Fork A is at x = 0 m, Fork B is at x = 1.5 m.', answer: 'Yes, the sources are coherent',
                  options: ['Yes, the sources are coherent', 'not coherent because they are separate forks', 'monochromatic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium lamp or red LED) is.' },
                { id: 'b', prompt: 'In a Young\'s double slit experiment, the two slits are illuminated by a single sodium lamp (λ = 589 nm).', answer: 'Yes, central fringe shifts',
                  options: ['Yes, central fringe shifts', 'fringe shifts away from covered slit', 'monochromatic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium lamp or red LED) is.' },
                { id: 'c', prompt: 'Two coherent sources S₁ and S₂ emit light of wavelength 600 nm with equal intensity I₀ = 4 W/m².', answer: 'Given: λ = 600 nm, Δx = 450 nm, I₀ = 4 W/m²',
                  options: ['Given: λ = 600 nm, Δx = 450 nm, I₀ = 4 W/m²', 'monochromatic', 'coherent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium lamp or red LED) is.' }
          ],
            remediations: { 'monochromatic-and-coherent-are-synonymous': { steps: ['Revisit c11_phy_cbse_14_005 (Principle of Superposition) — practice adding y₁ = a₁ cos ωt and y₂ = a₂ cos(ωt + φ) using.', 'Revisit c11_phy_cbse_14_006 (Interference of Waves) — derive I = I₁ + I₂ + 2√(I₁I₂) cos φ from amplitude addition.', 'Do the aluminium foil double slit experiment (Diagnostic Q6) physically — seeing fringes appear/disappear with one/two.', 'Re-diagnostic: Explain why two laser pointers don\'t interfere but a laser + beam splitter does.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Two independent laser pointers of the same wavelength (650 nm) can produce a stable interference pattern on a screen because.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'coherence of a single source', 'mutual coherence between two sources', 'monochromatic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "monochromatic" and "coherent" are synonymous — they think any single-colour light (like a sodium lamp or red LED) is.' }
          ],
            remediations: { 'monochromatic-and-coherent-are-synonymous': { steps: ['Revisit c11_phy_cbse_14_005 (Principle of Superposition) — practice adding y₁ = a₁ cos ωt and y₂ = a₂ cos(ωt + φ) using.', 'Revisit c11_phy_cbse_14_006 (Interference of Waves) — derive I = I₁ + I₂ + 2√(I₁I₂) cos φ from amplitude addition.', 'Do the aluminium foil double slit experiment (Diagnostic Q6) physically — seeing fringes appear/disappear with one/two.', 'Re-diagnostic: Explain why two laser pointers don\'t interfere but a laser + beam splitter does.'] } } },
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
