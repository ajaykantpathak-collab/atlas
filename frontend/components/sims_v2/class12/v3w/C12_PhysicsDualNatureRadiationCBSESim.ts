import type { SimDef } from '../../engine/types';
import C12_PhysicsDualNatureRadiationCBSESim from '../../../simulations/c6_12/C12_PhysicsDualNatureRadiationCBSESim';

/** v3 wrapped master — C12_PhysicsDualNatureRadiationCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsdualnatureradiationcbsesim: SimDef = {
    id: 'v3w_c12_physicsdualnatureradiationcbsesim',
    title: 'Dual Nature Radiation CBSE',
    subtitle: 'This node covers the Davisson-Germer experiment in detail: apparatus, principle (Bragg.',
    classLevel: 12, subject: 'physics', topic: 'Davisson-Germer Experiment: Electron Diffraction',
    chapters: [],
    nodeIds: ['c12_phy_cbse_11_005', 'c12_phy_cbse_11_006', 'c12_phy_cbse_11_004', 'c12_phy_cbse_11_001', 'c12_phy_cbse_11_003', 'c12_phy_cbse_08_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you shine a laser through a fine mesh and see a diffraction pattern on a wall — that\'s light behaving.', goal: 'Master Dual Nature Radiation CBSE.' },
    discovery: {
        question: 'State Heisenberg\'s Uncertainty Principle for position and momentum, giving the exact mathematical inequality with the reduced Planck constant ħ.',
        options: ['Δx Δp ≥ ħ/2, where ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s', 'observer effect', 'the uncertainty principle arises'],
        answer: 'Δx Δp ≥ ħ/2, where ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s',
        hook: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with.',
    },
    teaching: [
        { title: 'The Davisson-Germer experiment (1927).', text: 'The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons by observing diffraction patterns when a beam of electrons is scattered off a single crystal of nickel.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_005', title: 'The Davisson-Germer experiment (1927).',
          scaffold: { problem: 'In a Davisson-Germer experiment, electrons are accelerated through 54 V and strike a nickel crystal.',
            steps: [
            { text: 'Identify given quantities: \\(V = 54 \\, \\text{V}\\), \\(\\phi = 50^\\circ\\), \\(d = 0.91 \\, \\text{Å} = 0.91 \\times 10^{-10}.' },
            { text: 'Compute de Broglie wavelength \\(\\lambda_{\\text{dB}} = h / \\sqrt{2 m_e e V}\\).' },
            { text: 'Relate scattering angle \\(\\phi\\) to Bragg angle \\(\\theta\\). For planes parallel to surface, \\(\\phi = 2\\theta\\).' },
            { text: 'Compute Bragg wavelength \\(\\lambda_{\\text{Bragg}} = 2d \\sin\\theta / n = 2 \\times 0.91\\times10^{-10} \\times \\sin.' },
            { text: 'Compare: \\(\\lambda_{\\text{dB}} = \\lambda_{\\text{Bragg}} = 1.67 \\, \\text{Å}\\).', faded: true, blankAnswer: '\\(\\lambda_{\\text{dB}} = \\lambda_{\\text{Bragg}} = 1.67.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_006', title: 'Heisenberg\'s Uncertainty Principle.',
          scaffold: { problem: 'In a hydrogen atom, the electron is confined to a region of roughly 0.053 nm (Bohr radius).',
            steps: [
            { text: 'Identify given: Δx ≈ 0.053 nm = 5.3 × 10⁻¹¹ m. We need minimum kinetic energy K_min.' },
            { text: 'Use uncertainty principle: Δp_min ≈ ħ/(2Δx) = (1.055 × 10⁻³⁴) / (2 × 5.3 × 10⁻¹¹) = 9.95 × 10⁻²⁵ kg·m/s.' },
            { text: 'Minimum momentum magnitude p_min ≈ Δp_min (since average momentum is zero in bound state). Kinetic energy K = p²/(2m).' },
            { text: 'K_min = (Δp_min)² / (2mₑ) = (9.95 × 10⁻²⁵)² / (2 × 9.11 × 10⁻³¹) = 9.90 × 10⁻⁴⁹ / 1.822 × 10⁻³⁰ = 5.43 × 10⁻¹⁹ J.' },
            { text: 'Convert to eV: K_min = (5.43 × 10⁻¹⁹) / (1.602 × 10⁻¹⁹) = 3.39 eV.', faded: true, blankAnswer: 'K_min ≈ 3.4 eV' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_004', title: 'The de Broglie hypothesis states that.',
          scaffold: { problem: 'An electron gun in an old TV picture tube accelerates electrons through 500 V. Calculate the de Broglie wavelength of these electrons.',
            steps: [
            { text: 'Identify given: V = 500 V, electron charge e, mass m_e, Planck\'s constant h. Find λ.' },
            { text: 'Kinetic energy gained by electron: K = eV = (1.6 × 10^{-19} C)(500 V) = 8.0 × 10^{-17} J.' },
            { text: 'Momentum from kinetic energy: p = √(2 m_e K) = √(2 × 9.11 × 10^{-31} × 8.0 × 10^{-17}) = √(1.4576 × 10^{-46}) = 1.207 ×.' },
            { text: 'de Broglie wavelength: λ = h/p = (6.63 × 10^{-34}) / (1.207 × 10^{-23}) = 5.49 × 10^{-11} m = 0.0549 nm.' },
            { text: 'Check: This is X-ray wavelength scale, consistent with electron diffraction experiments.', faded: true, blankAnswer: '5.49 × 10^{-11} m (or 0.0549 nm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_001', title: 'The photoelectric effect is the.',
          scaffold: { problem: 'In a photoelectric experiment using a sodium surface (work function φ₀ = 2.28 eV), monochromatic light of wavelength 450 nm is incident on.',
            steps: [
            { text: 'Identify given quantities: λ = 450 nm = 450 × 10⁻⁹ m, φ₀ = 2.28 eV, I = 5.0 mW/m² = 5.0 × 10⁻³ W/m², A = 2.0 cm² = 2.0.' },
            { text: 'Photon energy E = hc/λ. Substitute: E = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (450 × 10⁻⁹) = 4.42 × 10⁻¹⁹ J.' },
            { text: 'Check threshold condition: E (2.76 eV) > φ₀ (2.28 eV) ⇒ emission occurs.' },
            { text: 'Kₘₐₓ = E - φ₀ = 2.76 eV - 2.28 eV = 0.48 eV. In joules: Kₘₐₓ = 0.48 × 1.6 × 10⁻¹⁹ = 7.68 × 10⁻²⁰ J.' },
            { text: 'Stopping potential V₀ = Kₘₐₓ/e = 0.48 eV / e = 0.48 V (since 1 eV is energy gained by electron across 1 V).' },
            { text: 'Power on emitter P = I × A = (5.0 × 10⁻³) × (2.0 × 10⁻⁴) = 1.0 × 10⁻⁶ W = 1.0 × 10⁻⁶ J/s.', faded: true, blankAnswer: '(a) 2.76 eV (b) Yes, emission occurs (c) Kₘₐₓ = 0.48 eV =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_003', title: 'A photon is the fundamental quantum.',
          scaffold: { problem: 'A sodium vapour street lamp emits 100 W of yellow light (λ = 589 nm).',
            steps: [
            { text: 'Identify given: P_elec = 100 W, efficiency η = 0.10 → P_light = 10.0 W. λ = 589 nm = 589 × 10⁻⁹ m.' },
            { text: 'Photon energy E = hc/λ. Substitute: E = (6.63×10⁻³⁴ × 3.00×10⁸) / (589×10⁻⁹) = 3.37×10⁻¹⁹ J.' },
            { text: 'Photon flux N = P_light / E = 10.0 / (3.37×10⁻¹⁹) = 2.97×10¹⁹ photons/s.' },
            { text: 'Photon momentum p = h/λ = E/c = 3.37×10⁻¹⁹ / 3.00×10⁸ = 1.12×10⁻²⁷ kg·m/s.' },
            { text: 'Force on perfect absorber = rate of momentum transfer = N × p = (2.97×10¹⁹) × (1.12×10⁻²⁷) = 3.33×10⁻⁸ N.', faded: true, blankAnswer: '(a) 2.11 eV, (b) 2.97 × 10¹⁹ photons/s, (c) 1.12 × 10⁻²⁷.' }
            ] } },
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_11_006', title: 'Identify each idea',
          dissect: { specimen: 'Dual Nature Radiation CBSE', spots: [
            { id: 's1', label: 'The Davisson-Germer experiment 1927 demonstrated', prompt: 'Which idea is this? — The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons by.', answer: 'The Davisson-Germer experiment 1927 demonstrated', options: ['The Davisson-Germer experiment 1927 demonstrated', 'Heisenbergs Uncertainty Principle states that', 'The de Broglie hypothesis states', 'The photoelectric effect is the'] },
            { id: 's2', label: 'Heisenbergs Uncertainty Principle states that', prompt: 'Which idea is this? — Heisenberg\'s Uncertainty Principle states that it is fundamentally impossible to.', answer: 'Heisenbergs Uncertainty Principle states that', options: ['Heisenbergs Uncertainty Principle states that', 'The Davisson-Germer experiment 1927 demonstrated', 'The de Broglie hypothesis states', 'The photoelectric effect is the'] },
            { id: 's3', label: 'The de Broglie hypothesis states', prompt: 'Which idea is this? — The de Broglie hypothesis states that every moving particle of matter with momentum \\( p.', answer: 'The de Broglie hypothesis states', options: ['The de Broglie hypothesis states', 'The Davisson-Germer experiment 1927 demonstrated', 'Heisenbergs Uncertainty Principle states that', 'The photoelectric effect is the'] },
            { id: 's4', label: 'The photoelectric effect is the', prompt: 'Which idea is this? — The photoelectric effect is the phenomenon where electrons (photoelectrons) are emitted.', answer: 'The photoelectric effect is the', options: ['The photoelectric effect is the', 'The Davisson-Germer experiment 1927 demonstrated', 'Heisenbergs Uncertainty Principle states that', 'The de Broglie hypothesis states'] },
            { id: 's5', label: 'A photon is the fundamental', prompt: 'Which idea is this? — A photon is the fundamental quantum (particle) of electromagnetic radiation, carrying.', answer: 'A photon is the fundamental', options: ['A photon is the fundamental', 'The Davisson-Germer experiment 1927 demonstrated', 'Heisenbergs Uncertainty Principle states that', 'The de Broglie hypothesis states'] },
            { id: 's6', label: 'An electromagnetic wave is a', prompt: 'Which idea is this? — An electromagnetic wave is a self-propagating transverse wave consisting of mutually.', answer: 'An electromagnetic wave is a', options: ['An electromagnetic wave is a', 'The Davisson-Germer experiment 1927 demonstrated', 'Heisenbergs Uncertainty Principle states that', 'The de Broglie hypothesis states'] }
          ] } }
    ],
    explore: { component: C12_PhysicsDualNatureRadiationCBSESim, prompt: 'Explore the interactive — Dual Nature Radiation CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_005', difficulty: 'standard',
          question: 'The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons.',
          hint: 'If stuck, revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) and Class 11 wave.',
          misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface.',
          parts: [
                { id: 'a', prompt: 'In the Davisson-Germer experiment, the nickel crystal acts as a three-dimensional diffraction grating.', answer: 'Bragg\'s law arises from reflection off successive crystal planes',
                  options: ['Bragg\'s law arises from reflection off successive crystal planes', 'the factor 2 is because there are two slits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface (glancing angle),.' },
                { id: 'b', prompt: 'The Davisson-Germer experiment originally used a polycrystalline nickel target, but after an accidental heating (which created a single large crystal), they.', answer: 'A polycrystalline target consists of many randomly oriented microcrystals',
                  options: ['A polycrystalline target consists of many randomly oriented microcrystals', 'polycrystalline has no planes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface (glancing angle),.' }
          ],
            remediations: { 'the-angle-theta-in-bragg': { steps: ['Revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) to solidify \\(\\lambda = h/p\\) and its derivation from \\(p.', 'Review Class 11 wave optics: interference from multiple slits (c11_phy_cbse_14_005) and the concept of path difference.', 'Draw the crystal planes, incident beam, and reflected beam; label the glancing angle \\(\\alpha\\) and Bragg angle.', 'Practice converting between them.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface.',
          parts: [
                { id: 'a', prompt: 'The Davisson-Germer experiment originally used a polycrystalline nickel target, but after an accidental heating (which created a single large crystal), they.', answer: 'A polycrystalline target consists of many randomly oriented microcrystals',
                  options: ['A polycrystalline target consists of many randomly oriented microcrystals', 'polycrystalline has no planes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface (glancing angle),.' }
          ],
            remediations: { 'the-angle-theta-in-bragg': { steps: ['Revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) to solidify \\(\\lambda = h/p\\) and its derivation from \\(p.', 'Review Class 11 wave optics: interference from multiple slits (c11_phy_cbse_14_005) and the concept of path difference.', 'Draw the crystal planes, incident beam, and reflected beam; label the glancing angle \\(\\alpha\\) and Bragg angle.', 'Practice converting between them.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_006', difficulty: 'standard',
          question: 'Heisenberg\'s Uncertainty Principle states that it is fundamentally impossible.',
          hint: 'Revisit de Broglie hypothesis (c12_phy_cbse_11_004) for λ = h/p and wave packet idea;.',
          misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with.',
          parts: [
                { id: 'a', prompt: 'State Heisenberg\'s Uncertainty Principle for position and momentum, giving the exact mathematical inequality with the reduced Planck constant ħ.', answer: 'Δx Δp ≥ ħ/2, where ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s',
                  options: ['Δx Δp ≥ ħ/2, where ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' },
                { id: 'b', prompt: 'A student argues: "The uncertainty principle is just because our measuring instruments disturb the particle.', answer: 'The principle is fundamental, not instrumental',
                  options: ['The principle is fundamental, not instrumental', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' },
                { id: 'c', prompt: 'An electron is confined within a region of size Δx = 0.10 nm (typical atomic radius). Calculate the minimum uncertainty in its velocity (Δv_min).', answer: 'Step 1: Δx = 0.10 nm = 1.0 × 10⁻¹⁰ m',
                  options: ['Step 1: Δx = 0.10 nm = 1.0 × 10⁻¹⁰ m', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' }
          ],
            remediations: { 'the-uncertainty-principle-arises-because': { steps: ['If the student holds the "measurement disturbance" misconception, have them revisit the wave packet concept from de.', 'Perform the single-slit diffraction thought experiment (Diagnostic 6) step-by-step: draw the slit, the diffracted.', 'Then re-attempt Diagnostic Question 2.', 'If they still confuse h and ħ/2, drill the formula Δx Δp ≥ ħ/2 with 5 numerical examples, emphasising the factor 1/2.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The energy-time uncertainty principle ΔE Δt ≥ ħ/2 means if I measure the energy of a system very quickly (small Δt), the energy becomes.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' },
                { id: 'b', prompt: 'Design a thought experiment (different from the gamma-ray microscope) that illustrates the position-momentum uncertainty principle using a single-slit.', answer: 'Pass a beam of electrons through a single slit of width a',
                  options: ['Pass a beam of electrons through a single slit of width a', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' }
          ],
            remediations: { 'the-uncertainty-principle-arises-because': { steps: ['If the student holds the "measurement disturbance" misconception, have them revisit the wave packet concept from de.', 'Perform the single-slit diffraction thought experiment (Diagnostic 6) step-by-step: draw the slit, the diffracted.', 'Then re-attempt Diagnostic Question 2.', 'If they still confuse h and ħ/2, drill the formula Δx Δp ≥ ħ/2 with 5 numerical examples, emphasising the factor 1/2.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_004', difficulty: 'standard',
          question: 'The de Broglie hypothesis states that every moving particle of matter with.',
          hint: 'If stuck, review kinetic energy and momentum from Class 11 (c11_phy_cbse_05_004,.',
          misconception: 'Students often think de Broglie wavelength depends on the particle\'s charge because they associate electron.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The de Broglie hypothesis states that every moving particle of matter with momentum \\( p',
                  options: ['The de Broglie hypothesis states that every moving particle of matter with momentum \\( p', 'The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons by', 'Heisenberg\'s Uncertainty Principle states that it is fundamentally impossible to', 'The photoelectric effect is the phenomenon where electrons (photoelectrons) are emitted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think de Broglie wavelength depends on the particle\'s charge because they associate electron acceleration with electric.' }
          ],
            remediations: { 'de-broglie-wavelength-depends-on': { steps: ['Revisit the derivation of \\( \\lambda = h/\\sqrt{2mK} \\) from \\( K = p^2/2m \\) and \\( \\lambda = h/p \\).', 'Practice calculating wavelength for (a) electron at 100 eV, (b) proton at 100 eV, (c) dust particle at 1 m/s.', 'Then explicitly write: "Charge determines how energy is given, but wavelength depends only on momentum." Use node.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_001', difficulty: 'standard',
          question: 'The photoelectric effect is the phenomenon where electrons (photoelectrons) are.',
          hint: 'If stuck, revisit c10_phy_cbse_01_001 (electric current), c10_phy_cbse_01_002 (potential.',
          misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we increase the intensity of incident light, the maximum kinetic energy of photoelectrons increases because more energy is delivered to.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'higher intensity means higher energy per photon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness should increase the.' },
                { id: 'b', prompt: 'Monochromatic light of frequency 7.5 × 10¹⁴ Hz is incident on a caesium surface (work function φ₀ = 2.14 eV). The stopping potential measured is 0.95 V.', answer: 'Calculate the maximum kinetic energy of photoelectrons in joules',
                  options: ['Calculate the maximum kinetic energy of photoelectrons in joules', 'V₀ doubles', 'V₀ becomes zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness should increase the.' }
          ],
            remediations: { 'higher-intensity-means-higher-energy': { steps: ['If the student holds the intensity-Kₘₐₓ misconception: (1) Revisit the definition of intensity in wave optics.', '(2) Perform the "simulated photoelectric effect" PhET interactive (University of Colorado) — vary intensity slider at.', '(3) Re-derive Kₘₐₓ = eV₀ from the experimental definition: V₀ is the voltage that stops the *most energetic* electron.', 'Ask: "Does making the light brighter give any single electron more energy?" (4) Re-attempt Diagnostic Question 3(b) and.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness.',
          parts: [
                { id: 'a', prompt: 'An experimentalist reports: "For a certain metal, when green light (λ = 530 nm) is used, the stopping potential is 0.8 V.', answer: 'The claim is impossible',
                  options: ['The claim is impossible', 'higher intensity means higher energy per photon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness should increase the.' }
          ],
            remediations: { 'higher-intensity-means-higher-energy': { steps: ['If the student holds the intensity-Kₘₐₓ misconception: (1) Revisit the definition of intensity in wave optics.', '(2) Perform the "simulated photoelectric effect" PhET interactive (University of Colorado) — vary intensity slider at.', '(3) Re-derive Kₘₐₓ = eV₀ from the experimental definition: V₀ is the voltage that stops the *most energetic* electron.', 'Ask: "Does making the light brighter give any single electron more energy?" (4) Re-attempt Diagnostic Question 3(b) and.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_003', difficulty: 'standard',
          question: 'A photon is the fundamental quantum (particle) of electromagnetic radiation,.',
          hint: 'If stuck, re-read NCERT Section 11.6 (Einstein\'s Photoelectric Equation) and work through.',
          misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels.',
          parts: [
                { id: 'a', prompt: 'State the energy and momentum of a single photon of frequency ν and wavelength λ in vacuum. Give the SI units of each quantity.', answer: 'Energy E = hν = hc/λ (unit: joule, J)',
                  options: ['Energy E = hν = hc/λ (unit: joule, J)', 'higher intensity light means higher energy photons', 'more energetic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels "more energetic." They.' },
                { id: 'b', prompt: 'A helium–neon laser emits 2.0 mW of monochromatic light at λ = 632.8 nm.', answer: 'the energy of one photon in joules and eV, and (',
                  options: ['the energy of one photon in joules and eV, and (', 'higher intensity light means higher energy photons', 'more energetic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels "more energetic." They.' },
                { id: 'c', prompt: 'Two monochromatic sources A and B emit the same power (5.0 mW). Source A emits red light (λ = 650 nm), source B emits blue light (λ = 450 nm).', answer: '(i) E_B > E_A because E ∝ 1/λ (blue has shorter λ)',
                  options: ['(i) E_B > E_A because E ∝ 1/λ (blue has shorter λ)', 'higher momentum per photon', 'higher intensity light means higher energy photons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels "more energetic." They.' }
          ],
            remediations: { 'higher-intensity-light-means-higher': { steps: ['Revisit node **c12_phy_cbse_11_002** (Einstein\'s Photoelectric Equation) — specifically the step where K_max = hν – φ₀.', 'Re-do **Worked Example 1** below, but *first* predict what happens to photon energy if intensity doubles (answer:.', 'Perform the "Photon Flux" mini-lab: Use a laser pointer (known P, λ), calculate N = P/(hc/λ), then verify order of.', 'Re-attempt Diagnostic Question 2 and 4, explaining each step aloud.'] } } },
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
