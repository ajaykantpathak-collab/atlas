import type { SimDef } from '../../engine/types';
import C12_PhysicsBohrAtomSim from '../../../simulations/three/C12_PhysicsBohrAtomSim';

/** v3 wrapped master — C12_PhysicsBohrAtomSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsbohratomsim: SimDef = {
    id: 'v3w_c12_physicsbohratomsim',
    title: 'Bohr Model of Hydrogen Atom: Postulates',
    subtitle: 'This node covers **only** the three Bohr postulates and their immediate physical.',
    classLevel: 12, subject: 'physics', topic: 'Bohr Model of Hydrogen Atom: Postulates',
    chapters: [],
    nodeIds: ['c12_phy_cbse_12_002', 'c12_phy_cbse_12_003', 'c12_phy_cbse_12_004', 'c12_phy_cbse_12_005', 'c12_phy_cbse_12_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world observation: a neon sign glowing with distinct colours (red-orange) while an.', goal: 'Master Bohr Model of Hydrogen Atom: Postulates.' },
    discovery: {
        question: 'Why is the energy of the electron in a hydrogen atom negative? What does \\(E_n \\to 0\\) as \\(n \\to \\infty\\) physically represent?',
        options: ['The negative sign arises', 'negative energy means the electron has lost energy', 'zero energy means the electron is at rest at the nucleus'],
        answer: 'The negative sign arises',
        hook: 'Students often write \\(E_n = +13.6/n^2\\) eV, omitting the negative sign, and then claim "energy increases with \\(n\\)".',
    },
    teaching: [
        { title: 'Bohr\'s model of the hydrogen atom is based.', text: 'Bohr\'s model of the hydrogen atom is based on three postulates: (1) Electrons revolve in certain discrete, stable orbits called stationary states without radiating energy, each with a definite total.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_002', title: 'Bohr\'s model of the hydrogen atom is.',
          scaffold: { problem: 'In a hydrogen atom, the electron moves in a circular orbit of radius \\(5.3 \\times 10^{-11}\\,\\text{m}\\) with speed \\(2.2 \\times.',
            steps: [
            { text: 'Identify given quantities: \\(r = 5.3 \\times 10^{-11}\\,\\text{m}\\), \\(v = 2.2 \\times 10^6\\,\\text{m/s}\\), \\(m_e = 9.1.' },
            { text: 'Compute angular momentum \\(L = m_e v r = (9.1 \\times 10^{-31}) \\times (2.2 \\times 10^6) \\times (5.3 \\times 10^{-11}) =.' },
            { text: 'Compute the quantized value for \\(n=1\\): \\(L_1 = 1 \\times \\frac{h}{2\\pi} = \\frac{6.63 \\times 10^{-34}}{2 \\times 3.1416}.' },
            { text: 'Compare: \\(1.06 \\times 10^{-34} \\approx 1.055 \\times 10^{-34}\\) — they match within rounding.' },
            { text: 'Physical check: This orbit is the Bohr radius \\(a_0\\); the speed matches the known ground-state speed.', faded: true, blankAnswer: 'Yes, the orbit satisfies Bohr\'s quantization condition for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_003', title: 'The energy levels of a hydrogen atom.',
          scaffold: { problem: '** A hydrogen atom is in the \\(n=2\\) state. (a) Calculate its energy in eV and joules.',
            steps: [
            { text: 'Identify formula \\(E_n = -13.6/n^2\\) eV. Given \\(n=2\\).' },
            { text: 'Compute \\(E_2 = -13.6/4 = -3.40\\) eV. Convert to joules: \\(-3.40 \\times 1.60 \\times 10^{-19} = -5.44 \\times 10^{-19}\\).' },
            { text: 'Ionization energy = \\(0 - E_2 = 3.40\\) eV. (Energy needed to bring electron from \\(E_2\\) to \\(E=0\\).)' },
            { text: 'Compare photon energy (3.0 eV) with ionization energy (3.40 eV).' },
            { text: 'Check if 3.0 eV can cause excitation to a higher bound level: \\(E_3 = -1.51\\) eV, so \\(\\Delta E_{2\\to3} = 1.89\\) eV.', faded: true, blankAnswer: '** (a) \\(E_2 = -3.40 \\text{ eV} = -5.44 \\times 10^{-19}.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_004', title: 'The line spectra of hydrogen are.',
          scaffold: { problem: 'The H-α line (first line of Balmer series) is observed at 656.3 nm in the laboratory.',
            steps: [
            { text: 'Identify given: λ_lab = 656.3 nm, λ_obs = 660.0 nm. Find redshift z = (λ_obs - λ_lab)/λ_lab.' },
            { text: 'Compute z = (660.0 - 656.3)/656.3 = 3.7/656.3 = 0.005637.' },
            { text: 'Non-relativistic Doppler shift: z ≈ v/c for recession. So v = z·c = 0.005637 × 3.00 × 10⁸ m/s = 1.691 × 10⁶ m/s.' },
            { text: 'Convert to km/s: v = 1691 km/s.' },
            { text: 'Check reasonableness: z ~ 0.0056 is typical for nearby galaxies; v << c justifies non-relativistic formula.', faded: true, blankAnswer: 'z = 0.00564, v = 1.69 × 10⁶ m/s (or 1690 km/s).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_005', title: 'de Broglie\'s explanation of Bohr\'s.',
          scaffold: { problem: 'In a hydrogen atom, the electron in the n = 2 orbit has a speed of 1.09 × 10⁶ m/s.',
            steps: [
            { text: 'Identify given: n = 2, v₂ = 1.09 × 10⁶ m/s, mₑ = 9.11 × 10⁻³¹ kg, h = 6.63 × 10⁻³⁴ J·s. Find: λ and check 2πr₂ = 2λ.' },
            { text: 'Calculate de Broglie wavelength using λ = h/(mₑv₂). λ = 6.63×10⁻³⁴ / (9.11×10⁻³¹ × 1.09×10⁶) = 6.63×10⁻³⁴ / 9.93×10⁻²⁵.' },
            { text: 'Calculate radius of n = 2 orbit: r₂ = n²a₀ = 4 × 5.29 × 10⁻¹¹ = 2.116 × 10⁻¹⁰ m.' },
            { text: 'Calculate circumference: 2πr₂ = 2π × 2.116 × 10⁻¹⁰ = 1.330 × 10⁻⁹ m.' },
            { text: 'Check standing wave condition: 2λ = 2 × 6.68 × 10⁻¹⁰ = 1.336 × 10⁻⁹ m.', faded: true, blankAnswer: 'λ = 6.68 × 10⁻¹⁰ m; 2πr₂ = 1.33 × 10⁻⁹ m ≈ 2λ. Condition.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_001', title: 'Rutherford\'s nuclear model of the atom.',
          scaffold: { problem: 'In a Rutherford scattering experiment, α-particles of kinetic energy 5.5 MeV are incident on a thin gold foil (Z = 79).',
            steps: [
            { text: 'Identify given: K = 5.5 MeV (not needed for ratio), θ₁ = 30°, N₁ = 1000 min⁻¹, θ₂ = 90°.' },
            { text: 'Compute sin(θ₁/2) = sin(15°) = 0.2588; sin⁴(15°) = (0.2588)⁴ = 0.00448.' },
            { text: 'Compute sin(θ₂/2) = sin(45°) = 0.7071; sin⁴(45°) = (0.7071)⁴ = 0.25.' },
            { text: 'Ratio N₂/N₁ = sin⁴(θ₁/2) / sin⁴(θ₂/2) = 0.00448 / 0.25 = 0.01792.' },
            { text: 'N₂ = 1000 × 0.01792 = 17.92 ≈ 18 particles per minute.', faded: true, blankAnswer: '18 particles per minute (at 90°).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_12_003', title: 'Identify each idea',
          dissect: { specimen: 'Bohr Model of Hydrogen Atom: Postulates', spots: [
            { id: 's1', label: 'Bohrs model of the hydrogen', prompt: 'Which idea is this? — Bohr\'s model of the hydrogen atom is based on three postulates: (1) Electrons revolve in.', answer: 'Bohrs model of the hydrogen', options: ['Bohrs model of the hydrogen', 'The energy levels of a', 'The line spectra of hydrogen', 'de Broglies explanation of Bohrs'] },
            { id: 's2', label: 'The energy levels of a', prompt: 'Which idea is this? — The energy levels of a hydrogen atom are the discrete, quantized values of total energy.', answer: 'The energy levels of a', options: ['The energy levels of a', 'Bohrs model of the hydrogen', 'The line spectra of hydrogen', 'de Broglies explanation of Bohrs'] },
            { id: 's3', label: 'The line spectra of hydrogen', prompt: 'Which idea is this? — The line spectra of hydrogen are discrete wavelengths of light emitted or absorbed when.', answer: 'The line spectra of hydrogen', options: ['The line spectra of hydrogen', 'Bohrs model of the hydrogen', 'The energy levels of a', 'de Broglies explanation of Bohrs'] },
            { id: 's4', label: 'de Broglies explanation of Bohrs', prompt: 'Which idea is this? — de Broglie\'s explanation of Bohr\'s second postulate states that the electron in a.', answer: 'de Broglies explanation of Bohrs', options: ['de Broglies explanation of Bohrs', 'Bohrs model of the hydrogen', 'The energy levels of a', 'The line spectra of hydrogen'] },
            { id: 's5', label: 'Rutherfords nuclear model of the', prompt: 'Which idea is this? — Rutherford\'s nuclear model of the atom states that the entire positive charge and nearly.', answer: 'Rutherfords nuclear model of the', options: ['Rutherfords nuclear model of the', 'Bohrs model of the hydrogen', 'The energy levels of a', 'The line spectra of hydrogen'] }
          ] } }
    ],
    explore: { component: C12_PhysicsBohrAtomSim, prompt: 'Explore the interactive — Bohr Model of Hydrogen Atom: Postulates' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_002', difficulty: 'standard',
          question: 'Bohr\'s model of the hydrogen atom is based on three postulates: (1) Electrons.',
          hint: 'If unsure about angular momentum or photon energy, review c11_phy_cbse_06_005 (Angular.',
          misconception: '**Misconception:** "Bohr\'s second postulate means the electron\'s *speed* is quantized as \\(v_n = n\\frac{h}{2\\pi m r}\\)".',
          parts: [
                { id: 'a', prompt: 'Why did Bohr choose to quantize *angular momentum* rather than, say, kinetic energy or orbital radius?', answer: '**Correct answer:** Planck\'s constant \\(h\\) has dimensions of angular momentum',
                  options: ['**Correct answer:** Planck\'s constant \\(h\\) has dimensions of angular momentum', 'because angular momentum is conserved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Bohr\'s second postulate means the electron\'s *speed* is quantized as \\(v_n = n\\frac{h}{2\\pi m r}\\)" or "the radius is.' },
                { id: 'b', prompt: 'Compare the predictions of Rutherford\'s model and Bohr\'s model for: (a) stability of the atom, (b) nature of emitted spectrum (continuous vs.', answer: '**Correct answer:** | Aspect | Rutherford Model | Bohr Model |',
                  options: ['**Correct answer:** | Aspect | Rutherford Model | Bohr Model |', 'electrons are in orbits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Bohr\'s second postulate means the electron\'s *speed* is quantized as \\(v_n = n\\frac{h}{2\\pi m r}\\)" or "the radius is.' }
          ],
            remediations: { 'misconception-bohr-s-second-postulate': { steps: ['Revisit **c11_phy_cbse_06_005** (Angular Momentum: Definition and Conservation) to reinforce \\(L = mvr\\) and its.', 'Re-read NCERT Section 12.4, focusing on the *order* of postulates: Postulate 2 gives \\(L = n\\hbar\\); Postulate 1 says.', 'Do a quick dimensional check: write down dimensions of \\(h\\), \\(L\\), \\(E\\), \\(r\\), \\(v\\).', 'Verify only \\(L\\) matches \\(h\\).'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Bohr\'s second postulate means the electron\'s *speed* is quantized as \\(v_n = n\\frac{h}{2\\pi m r}\\)".',
          parts: [
                { id: 'a', prompt: 'Compare the predictions of Rutherford\'s model and Bohr\'s model for: (a) stability of the atom, (b) nature of emitted spectrum (continuous vs.', answer: '**Correct answer:** | Aspect | Rutherford Model | Bohr Model |',
                  options: ['**Correct answer:** | Aspect | Rutherford Model | Bohr Model |', 'electrons are in orbits'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Bohr\'s second postulate means the electron\'s *speed* is quantized as \\(v_n = n\\frac{h}{2\\pi m r}\\)" or "the radius is.' }
          ],
            remediations: { 'misconception-bohr-s-second-postulate': { steps: ['Revisit **c11_phy_cbse_06_005** (Angular Momentum: Definition and Conservation) to reinforce \\(L = mvr\\) and its.', 'Re-read NCERT Section 12.4, focusing on the *order* of postulates: Postulate 2 gives \\(L = n\\hbar\\); Postulate 1 says.', 'Do a quick dimensional check: write down dimensions of \\(h\\), \\(L\\), \\(E\\), \\(r\\), \\(v\\).', 'Verify only \\(L\\) matches \\(h\\).'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_003', difficulty: 'standard',
          question: 'The energy levels of a hydrogen atom are the discrete, quantized values of.',
          hint: 'If stuck, re-watch the derivation in node **c12_phy_cbse_12_002** (Bohr postulates →.',
          misconception: 'Students often write \\(E_n = +13.6/n^2\\) eV, omitting the negative sign, and then claim "energy increases with \\(n\\)".',
          parts: [
                { id: 'a', prompt: 'Why is the energy of the electron in a hydrogen atom negative? What does \\(E_n \\to 0\\) as \\(n \\to \\infty\\) physically represent?', answer: 'The negative sign arises',
                  options: ['The negative sign arises', 'negative energy means the electron has lost energy', 'zero energy means the electron is at rest at the nucleus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(E_n = +13.6/n^2\\) eV, omitting the negative sign, and then claim "energy increases with \\(n\\)" because \\(13.6/n^2\\).' }
          ],
            remediations: { 'students-often-write-e-n': { steps: ['Revisit node **c12_phy_cbse_12_002** (Bohr postulates) to re-derive \\(E_n\\) from \\(K = \\frac{1}{2}mv^2\\) and \\(U =.', 'Draw a vertical energy axis with \\(E=0\\) at the top and negative values downward; plot \\(E_1, E_2, E_3\\) to visualize.', 'Practice: "If \\(E_1 = -13.6\\) eV, how much energy to reach \\(E=0\\)?', 'If \\(E_2 = -3.4\\) eV, how much to reach \\(E=0\\)?'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write \\(E_n = +13.6/n^2\\) eV, omitting the negative sign, and then claim "energy increases with \\(n\\)".',
          parts: [
                { id: 'a', prompt: 'A student writes: "The ionization energy of hydrogen from the \\(n=2\\) state is 13.6 eV because ionization always requires 13.6 eV." Evaluate this statement and.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'ionization energy of hydrogen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write \\(E_n = +13.6/n^2\\) eV, omitting the negative sign, and then claim "energy increases with \\(n\\)" because \\(13.6/n^2\\).' }
          ],
            remediations: { 'students-often-write-e-n': { steps: ['Revisit node **c12_phy_cbse_12_002** (Bohr postulates) to re-derive \\(E_n\\) from \\(K = \\frac{1}{2}mv^2\\) and \\(U =.', 'Draw a vertical energy axis with \\(E=0\\) at the top and negative values downward; plot \\(E_1, E_2, E_3\\) to visualize.', 'Practice: "If \\(E_1 = -13.6\\) eV, how much energy to reach \\(E=0\\)?', 'If \\(E_2 = -3.4\\) eV, how much to reach \\(E=0\\)?'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_004', difficulty: 'standard',
          question: 'The line spectra of hydrogen are discrete wavelengths of light emitted or.',
          hint: 'Re-derive the Rydberg formula from E_n = -13.6/n² eV and hν = E_i - E_f; then convert ν.',
          misconception: 'Students often think the Rydberg formula 1/λ = R_H(1/nf² - 1/ni²) works with ni and nf swapped, or that the "first.',
          parts: [
                { id: 'a', prompt: 'Why does the Balmer series appear in the visible region while the Lyman series is in the ultraviolet and the Paschen series is in the infrared?', answer: 'The photon energy ΔE = 13.6 eV (1/nf² - 1/ni²)',
                  options: ['The photon energy ΔE = 13.6 eV (1/nf² - 1/ni²)', 'different energy gaps', 'first line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Rydberg formula 1/λ = R_H(1/nf² - 1/ni²) works with ni and nf swapped, or that the "first line" of a series means.' },
                { id: 'b', prompt: 'Calculate the wavelength (in nm) and photon energy (in eV) for the transition n=4 → n=2 in hydrogen. Identify the series and the color of this line.', answer: 'Given: ni=4, nf=2',
                  options: ['Given: ni=4, nf=2', 'first line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Rydberg formula 1/λ = R_H(1/nf² - 1/ni²) works with ni and nf swapped, or that the "first line" of a series means.' }
          ],
            remediations: { 'the-rydberg-formula-1-r': { steps: ['If the student cannot correctly apply the Rydberg formula: (1) Revisit node c12_phy_cbse_12_003 (Energy Levels of.', '(2) Practice unit conversion: 1 eV = 1.602×10⁻¹⁹ J, hc = 1240 eV·nm.', '(3) Draw the energy level diagram with n=1,2,3,4,5,∞ and label Lyman, Balmer, Paschen transitions with arrows.', '(4) Re-attempt Diagnostic Questions 3 and 4 with the diagram.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_005', difficulty: 'standard',
          question: 'de Broglie\'s explanation of Bohr\'s second postulate states that the electron in.',
          hint: 'If stuck, revisit Class 11 Physics Chapter 11 (Dual Nature) for λ = h/p, and Class 11.',
          misconception: 'Students often believe that de Broglie\'s standing wave model means the electron is literally a wave stretched around a.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'de Broglie\'s explanation of Bohr\'s second postulate states that the electron in a',
                  options: ['de Broglie\'s explanation of Bohr\'s second postulate states that the electron in a', 'Bohr\'s model of the hydrogen atom is based on three postulates: (1) Electrons revolve in', 'The energy levels of a hydrogen atom are the discrete, quantized values of total energy', 'The line spectra of hydrogen are discrete wavelengths of light emitted or absorbed when'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that de Broglie\'s standing wave model means the electron is literally a wave stretched around a circular wire-like.' }
          ],
            remediations: { 'de-broglie-s-standing-wave': { steps: ['If the student confuses the matter wave with a classical wave: (1) Revisit Class 11 dual nature chapter.', '(2) Perform the thought experiment in Diagnostic Question 6 to see how λ becomes negligible for macroscopic objects.', '(3) Study the double-slit experiment with single electrons (builds on c11_phy_cbse_14_006) to understand that each.', '(4) Re-derive 2πr = nλ step-by-step, emphasising that λ = h/p is a property of the particle\'s momentum, not a physical.'] } } },
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
