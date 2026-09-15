import type { SimDef } from '../../engine/types';
import C12_PhysicsElectromagneticWavesCBSESim from '../../../simulations/c6_12/C12_PhysicsElectromagneticWavesCBSESim';

/** v3 wrapped master — C12_PhysicsElectromagneticWavesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicselectromagneticwavescbsesim: SimDef = {
    id: 'v3w_c12_physicselectromagneticwavescbsesim',
    title: 'Electromagnetic Waves CBSE',
    subtitle: 'Covers the conceptual origin of displacement current, its mathematical formulation \\( i_d.',
    classLevel: 12, subject: 'physics', topic: 'Displacement Current: Maxwell\'s Correction',
    chapters: [],
    nodeIds: ['c12_phy_cbse_08_001', 'c12_phy_cbse_08_002', 'c12_phy_cbse_08_003', 'c12_phy_cbse_08_004', 'c12_phy_cbse_08_005', 'c12_phy_cbse_11_001', 'c12_phy_cbse_11_003', 'c12_phy_cbse_11_002', 'c12_phy_cbse_11_004', 'c12_phy_cbse_11_005', 'c12_phy_cbse_11_006', 'c12_phy_cbse_06_001', 'c12_phy_cbse_06_002', 'c12_phy_cbse_06_003', 'c12_phy_cbse_06_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a mobile phone charging via a USB-C cable — current flows through the wires, but between the.', goal: 'Master Electromagnetic Waves CBSE.' },
    discovery: {
        question: 'In a charging capacitor, the conduction current \\( i_c \\) in the connecting wires is 2.0 A.',
        options: ['The magnetic fields at P and M are equal in magnitude', 'B is zero at M', 'not real'],
        answer: 'The magnetic fields at P and M are equal in magnitude',
        hook: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no.',
    },
    teaching: [
        { title: 'Displacement current is a term introduced by.', text: 'Displacement current is a term introduced by Maxwell to generalize Ampere\'s circuital law, defined as the product of vacuum permittivity (ε₀) and the rate of change of electric flux through a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_001', title: 'Displacement current is a term.',
          scaffold: { problem: 'A parallel plate capacitor with circular plates of radius 12 cm is being charged by a constant current of 0.15 A.',
            steps: [
            { text: 'Identify given: \\( i_c = 0.15 \\, \\text{A} \\), plate radius \\( r = 0.12 \\, \\text{m} \\), plate area \\( A = \\pi r^2 = \\pi.' },
            { text: 'For a parallel plate capacitor, \\( C = \\varepsilon_0 A / d \\). But \\( d \\) is not given!' },
            { text: 'For (a), we need \\( dV/dt \\). From \\( i_c = C \\, dV/dt \\) and \\( C = \\varepsilon_0 A / d \\), we have \\( dV/dt = i_c d /.' },
            { text: '(b) Displacement current \\( i_d = \\varepsilon_0 d\\Phi_E/dt = \\varepsilon_0 A (dE/dt) \\).' },
            { text: '(c) Kirchhoff\'s junction rule (sum of currents at a junction = 0) holds if we include displacement current.', faded: true, blankAnswer: '(a) \\( dV/dt = 1.87 \\times 10^{10} \\, \\text{V/s} \\); (b) \\(.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_002', title: 'Maxwell\'s equations in vacuum are a set.',
          scaffold: { problem: 'A parallel plate capacitor with circular plates of radius R = 10 cm is being charged by a constant current i_c = 0.5 A.',
            steps: [
            { text: 'Identify given quantities: R = 0.10 m, i_c = 0.5 A, Q = 20×10⁻⁶ C, r = 0.05 m, ε₀ = 8.85×10⁻¹² F/m, μ₀ = 4π×10⁻⁷ T·m/A.' },
            { text: 'Electric field between plates: E = Q/(ε₀ A) where A = πR². Flux through surface of radius r: Φ_E = E × (πr²) = [Q/(ε₀.' },
            { text: 'Compute Φ_E = (20×10⁻⁶) × (0.05²/0.10²) / (8.85×10⁻¹²) = (20×10⁻⁶ × 0.25) / 8.85×10⁻¹² = 5×10⁻⁶ / 8.85×10⁻¹² = 5.65×10⁵.' },
            { text: 'Displacement current i_d = ε₀ dΦ_E/dt. Since i_c = dQ/dt = 0.5 A is constant, dΦ_E/dt = (dQ/dt) × (r²/R²)/ε₀ = i_c ×.' },
            { text: 'Apply Ampere-Maxwell law: ∮ **B**·d**l** = μ₀ i_d (no conduction current between plates).', faded: true, blankAnswer: '(a) Φ_E = 5.65×10⁵ V·m, (b) i_d = 0.125 A, (c) B =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_003', title: 'The electromagnetic spectrum is the.',
          scaffold: { problem: 'A 5G mobile network operates at 28 GHz. Calculate: (a) wavelength in mm, (b) photon energy in eV, (c) how many such photons per second are.',
            steps: [
            { text: 'Identify given: ν = 28 GHz = 28 × 10⁹ Hz, P = 1 W = 1 J/s, c = 3 × 10⁸ m/s, h = 6.63 × 10⁻³⁴ J·s, 1 eV = 1.6 × 10⁻¹⁹ J' },
            { text: '(a) λ = c/ν = (3 × 10⁸) / (28 × 10⁹) = 0.0107 m = 10.7 mm. Unit check: m/s ÷ 1/s = m ✓' },
            { text: '(b) E = hν = (6.63 × 10⁻³⁴)(28 × 10⁹) = 1.856 × 10⁻²³ J. Convert to eV: (1.856 × 10⁻²³)/(1.6 × 10⁻¹⁹) = 1.16 × 10⁻⁴ eV' },
            { text: '(c) Number of photons N = Power / Energy per photon = 1 J/s ÷ 1.856 × 10⁻²³ J = 5.39 × 10²² photons/s' },
            { text: 'Verify reasonableness: 28 GHz is in microwave band (λ ~ cm), photon energy ~10⁻⁴ eV is non-ionising, 10²² photons/s for.', faded: true, blankAnswer: '(a) 10.7 mm, (b) 1.16 × 10⁻⁴ eV, (c) 5.39 × 10²² photons/s' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_005', title: 'Electromagnetic waves are.',
          scaffold: { problem: 'A cellular phone operates at 900 MHz (GSM band). (a) Calculate the wavelength of these radio waves in air.',
            steps: [
            { text: 'Identify given: ν = 900 MHz = 9×10⁸ Hz, P = 1 W. Find λ, photons/s, compare E_photon vs k_BT.' },
            { text: 'Use c = νλ → λ = c/ν = (3×10⁸ m/s) / (9×10⁸ Hz) = 0.333 m = 33.3 cm.' },
            { text: 'Photon energy E = hν = (6.63×10⁻³⁴)(9×10⁸) = 5.967×10⁻²⁵ J.' },
            { text: 'Photons per second = Power / Energy per photon = 1 J/s / 5.967×10⁻²⁵ J = 1.676×10²⁴ photons/s.' },
            { text: 'Thermal energy k_BT = (1.38×10⁻²³)(300) = 4.14×10⁻²¹ J. Ratio E_photon / k_BT = 1.44×10⁻⁴ << 1.' },
            { text: 'Since photon energy ≪ thermal energy, classical wave description suffices; quantum effects negligible.', faded: true, blankAnswer: '(a) λ = 33.3 cm; (b) 1.68×10²⁴ photons/s; (c) E_photon =.' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Electromagnetic Waves CBSE', spots: [
            { id: 's1', label: 'Displacement current is a term', prompt: 'Which idea is this? — Displacement current is a term introduced by Maxwell to generalize Ampere\'s circuital.', answer: 'Displacement current is a term', options: ['Displacement current is a term', 'Maxwells equations in vacuum are', 'The electromagnetic spectrum is the', 'An electromagnetic wave is a'] },
            { id: 's2', label: 'Maxwells equations in vacuum are', prompt: 'Which idea is this? — Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how.', answer: 'Maxwells equations in vacuum are', options: ['Maxwells equations in vacuum are', 'Displacement current is a term', 'The electromagnetic spectrum is the', 'An electromagnetic wave is a'] },
            { id: 's3', label: 'The electromagnetic spectrum is the', prompt: 'Which idea is this? — The electromagnetic spectrum is the continuous distribution of electromagnetic waves.', answer: 'The electromagnetic spectrum is the', options: ['The electromagnetic spectrum is the', 'Displacement current is a term', 'Maxwells equations in vacuum are', 'An electromagnetic wave is a'] },
            { id: 's4', label: 'An electromagnetic wave is a', prompt: 'Which idea is this? — An electromagnetic wave is a self-propagating transverse wave consisting of mutually.', answer: 'An electromagnetic wave is a', options: ['An electromagnetic wave is a', 'Displacement current is a term', 'Maxwells equations in vacuum are', 'The electromagnetic spectrum is the'] },
            { id: 's5', label: 'Electromagnetic waves are self-propagating oscillations', prompt: 'Which idea is this? — Electromagnetic waves are self-propagating oscillations of mutually perpendicular.', answer: 'Electromagnetic waves are self-propagating oscillations', options: ['Electromagnetic waves are self-propagating oscillations', 'Displacement current is a term', 'Maxwells equations in vacuum are', 'The electromagnetic spectrum is the'] },
            { id: 's6', label: 'The photoelectric effect is the', prompt: 'Which idea is this? — The photoelectric effect is the phenomenon where electrons (photoelectrons) are emitted.', answer: 'The photoelectric effect is the', options: ['The photoelectric effect is the', 'Displacement current is a term', 'Maxwells equations in vacuum are', 'The electromagnetic spectrum is the'] }
          ] } }
    ],
    explore: { component: C12_PhysicsElectromagneticWavesCBSESim, prompt: 'Explore the interactive — Electromagnetic Waves CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_001', difficulty: 'standard',
          question: 'Displacement current is a term introduced by Maxwell to generalize Ampere\'s.',
          hint: 'Review Class 10 magnetic field of a straight wire (c10_phy_cbse_02_002) and Class 12.',
          misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no.',
          parts: [
                { id: 'a', prompt: 'In a charging capacitor, the conduction current \\( i_c \\) in the connecting wires is 2.0 A.', answer: 'The magnetic fields at P and M are equal in magnitude',
                  options: ['The magnetic fields at P and M are equal in magnitude', 'B is zero at M', 'not real'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no actual charges.' }
          ],
            remediations: { 'displacement-current-is-a-fictitious': { steps: ['Revisit Class 10 electromagnetic induction (c10_phy_cbse_02_008): changing magnetic flux → electric field.', 'Perform the capacitor thought experiment: draw two surfaces for the same Amperian loop, compute B from each using.', 'Derive \\( i_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\) step-by-step from Gauss\'s law \\( \\Phi_E = Q/\\varepsilon_0 \\) and \\(.', 'Redo Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Displacement current is just a mathematical trick; it doesn\'t produce a real magnetic field because no charges are moving." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'fictitious', 'no actual charges move', 'Between capacitor plates, \\( i_d = 0 \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no actual charges.' },
                { id: 'b', prompt: 'In a charging capacitor, the conduction current \\( i_c \\) in the connecting wires is 2.0 A.', answer: 'The magnetic fields at P and M are equal in magnitude',
                  options: ['The magnetic fields at P and M are equal in magnitude', 'B is zero at M', 'not real', 'fictitious'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no actual charges.' }
          ],
            remediations: { 'displacement-current-is-a-fictitious': { steps: ['Revisit Class 10 electromagnetic induction (c10_phy_cbse_02_008): changing magnetic flux → electric field.', 'Perform the capacitor thought experiment: draw two surfaces for the same Amperian loop, compute B from each using.', 'Derive \\( i_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\) step-by-step from Gauss\'s law \\( \\Phi_E = Q/\\varepsilon_0 \\) and \\(.', 'Redo Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_002', difficulty: 'standard',
          question: 'Maxwell\'s equations in vacuum are a set of four fundamental equations that.',
          hint: 'If stuck, re-read NCERT Section 8.2 (Displacement Current) and study Figures 8.1 and 8.2.',
          misconception: 'Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s law, no magnetic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how',
                  options: ['Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how', 'Displacement current is a term introduced by Maxwell to generalize Ampere\'s circuital', 'The electromagnetic spectrum is the continuous distribution of electromagnetic waves', 'An electromagnetic wave is a self-propagating transverse wave consisting of mutually'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s law, no magnetic monopoles, Faraday\'s law,.' }
          ],
            remediations: { 'maxwell-s-equations-are-only': { steps: ['If the student cannot articulate the symmetry between Faraday\'s law and the Ampere-Maxwell law, have them revisit.', 'Then, explicitly write both dynamic equations side by side: ∮ **E**·d**l** = -dΦ_B/dt and ∮ **B**·d**l** = μ₀ε₀ dΦ_E/dt.', 'Ask: "What happens if E changes?', 'What happens if that B changes?'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_003', difficulty: 'standard',
          question: 'The electromagnetic spectrum is the continuous distribution of electromagnetic.',
          hint: 'If stuck on unit conversions, revisit c10_math_cbse_01_011 (decimal expansions) and.',
          misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.',
          parts: [
                { id: 'a', prompt: 'A microwave oven operates at 2.45 GHz. Calculate: (a) the wavelength in cm, (b) the photon energy in eV.', answer: 'the wavelength in cm, (',
                  options: ['the wavelength in cm, (', 'higher frequency means higher speed', 'Gamma rays travel faster than radio waves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.' }
          ],
            remediations: { 'higher-frequency-means-higher-speed': { steps: ['Revisit c11_phy_cbse_14_002 (wave speed formula) and c12_phy_cbse_08_002 (Maxwell\'s equations predicting constant c).', 'Perform a thought experiment: "If gamma rays travelled faster, light from distant stars would arrive colour-separated —.', 'Practice 5 conversion problems: given ν, find λ; given λ, find E in eV.', 'Re-diagnostic: "Calculate speed of 100 MHz radio wave and 10¹⁹ Hz gamma ray in vacuum.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Infrared waves are heat waves because they have higher energy than visible light." Evaluate this statement. Is it correct?', answer: 'Statement is incorrect',
                  options: ['Statement is incorrect', 'higher frequency means higher speed', 'Gamma rays travel faster than radio waves', 'frequency doesn\'t change in medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate that UV radiation is blocked by ordinary glass but visible light passes through.', answer: '(1) Sunlight (contains UV) or UV LED torch',
                  options: ['(1) Sunlight (contains UV) or UV LED torch', 'higher frequency means higher speed', 'Gamma rays travel faster than radio waves', 'frequency doesn\'t change in medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.' }
          ],
            remediations: { 'higher-frequency-means-higher-speed': { steps: ['Revisit c11_phy_cbse_14_002 (wave speed formula) and c12_phy_cbse_08_002 (Maxwell\'s equations predicting constant c).', 'Perform a thought experiment: "If gamma rays travelled faster, light from distant stars would arrive colour-separated —.', 'Practice 5 conversion problems: given ν, find λ; given λ, find E in eV.', 'Re-diagnostic: "Calculate speed of 100 MHz radio wave and 10¹⁹ Hz gamma ray in vacuum.'] } } },
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
            remediations: { 'the-electric-and-magnetic-fields': { steps: ['Revisit c11_phy_cbse_14_001 (Transverse vs Longitudinal Waves) to reinforce perpendicular oscillations.', 'Re-derive the plane wave solution from Maxwell’s equations in vacuum (c12_phy_cbse_08_002) step by step: start with.', 'Substitute sinusoidal trial functions to get \\(k E_0 = \\omega B_0\\) and \\(k B_0 = \\mu_0\\varepsilon_0 \\omega E_0\\) →.', 'Redo Diagnostic Q2 and Q3 with this derivation fresh in mind.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_005', difficulty: 'standard',
          question: 'Electromagnetic waves are self-propagating oscillations of mutually.',
          hint: 'If stuck on wavelength/frequency conversion, review c11_phy_cbse_14_002 (v = νλ).',
          misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV >.',
          parts: [
                { id: 'a', prompt: 'State the frequency range and production mechanism for radio waves as per NCERT Class 12.', answer: 'Radio waves: frequency range 500 kHz to 1000 MHz',
                  options: ['Radio waves: frequency range 500 kHz to 1000 MHz', 'higher frequency always means more dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' },
                { id: 'b', prompt: 'A microwave oven operates at 2.45 GHz. Explain why this specific frequency is chosen, referencing the interaction with water molecules.', answer: '2.45 GHz matches the resonant rotational transition frequency of water molecules',
                  options: ['2.45 GHz matches the resonant rotational transition frequency of water molecules', 'microwaves have more energy', 'higher frequency always means more dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' },
                { id: 'c', prompt: 'An X-ray tube operates at 50 kV. Calculate the minimum wavelength of X-rays produced (in nm).', answer: '**Step 1:** Electron kinetic energy = eV = (1.6×10⁻¹⁹ C)(50×10³ V) = 8.0×10⁻¹⁵ J',
                  options: ['**Step 1:** Electron kinetic energy = eV = (1.6×10⁻¹⁹ C)(50×10³ V) = 8.0×10⁻¹⁵ J', 'higher frequency always means more dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' }
          ],
            remediations: { 'higher-frequency-always-means-more': { steps: ['Revisit c12_phy_cbse_08_003 (EM Spectrum) — memorize Table 8.1 wavelength ranges, production, detection for radio,.', 'Revisit c12_phy_cbse_08_004 (Properties) — review E₀/B₀ = c, energy density u = ½ε₀E² + ½B²/μ₀, and that all EM waves.', 'Do the "microwave vs radio photon energy" calculation: E_radio (100 MHz) = 4.1×10⁻⁷ eV vs E_microwave (2.45 GHz) =.', 'Plot on log scale to visualize the ionization threshold (~10 eV).'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV >.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Microwave ovens cook food from the inside out because microwaves penetrate deep and heat the center first." Evaluate this statement.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'higher frequency always means more dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate that microwaves are absorbed by water but pass through dry materials.', answer: '**Materials:** Microwave oven, two identical ceramic mugs, water, dry sand/salt,',
                  options: ['**Materials:** Microwave oven, two identical ceramic mugs, water, dry sand/salt,', 'water has high specific heat', 'higher frequency always means more dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' }
          ],
            remediations: { 'higher-frequency-always-means-more': { steps: ['Revisit c12_phy_cbse_08_003 (EM Spectrum) — memorize Table 8.1 wavelength ranges, production, detection for radio,.', 'Revisit c12_phy_cbse_08_004 (Properties) — review E₀/B₀ = c, energy density u = ½ε₀E² + ½B²/μ₀, and that all EM waves.', 'Do the "microwave vs radio photon energy" calculation: E_radio (100 MHz) = 4.1×10⁻⁷ eV vs E_microwave (2.45 GHz) =.', 'Plot on log scale to visualize the ionization threshold (~10 eV).'] } } },
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
            remediations: { 'higher-intensity-means-higher-energy': { steps: ['If the student holds the intensity-Kₘₐₓ misconception: (1) Revisit the definition of intensity in wave optics.', '(2) Perform the "simulated photoelectric effect" PhET interactive (University of Colorado) — vary intensity slider at.', '(3) Re-derive Kₘₐₓ = eV₀ from the experimental definition: V₀ is the voltage that stops the *most energetic* electron.', 'Ask: "Does making the light brighter give any single electron more energy?" (4) Re-attempt Diagnostic Question 3(b) and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
