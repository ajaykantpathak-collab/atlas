import type { SimDef } from '../../engine/types';
import C12_PhysicsGeneratorSim from '../../../simulations/c6_12/C12_PhysicsGeneratorSim';

/** v3 wrapped master — C12_PhysicsGeneratorSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsgeneratorsim: SimDef = {
    id: 'v3w_c12_physicsgeneratorsim',
    title: 'Faraday\'s Law of Electromagnetic Induction',
    subtitle: 'This node covers: magnetic flux definition and calculation, Faraday\'s law statement and.',
    classLevel: 12, subject: 'physics', topic: 'Faraday\'s Law of Electromagnetic Induction',
    chapters: [],
    nodeIds: ['c12_phy_cbse_06_001', 'c12_phy_cbse_06_003', 'c12_phy_cbse_06_005', 'c12_phy_cbse_06_007', 'c12_phy_cbse_08_002', 'c12_phy_cbse_02_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a ceiling fan\'s motor — when you switch it on, the fan starts rotating due to induced currents from.', goal: 'Master Faraday\'s Law of Electromagnetic Induction.' },
    discovery: {
        question: 'A square loop of side 20 cm and resistance 2 Ω is placed with its plane perpendicular to a uniform magnetic field of 0.5 T.',
        options: ['Given: side = 0.2 m → A = 0.04 m²', 'A powerful magnet placed near a coil induces current', 'magnetic field lines cutting the coil'],
        answer: 'Given: side = 0.2 m → A = 0.04 m²',
        hook: 'Students believe that a *strong* magnetic field alone induces emf, even if constant.',
    },
    teaching: [
        { title: 'Faraday\'s Law of Electromagnetic Induction.', text: 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced electromotive force (emf) in a closed circuit is equal to the time rate of change of magnetic flux through the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_001', title: 'Faraday\'s Law of Electromagnetic.',
          scaffold: { problem: 'A circular coil of radius 10 cm has 500 turns and resistance 2 Ω.',
            steps: [
            { text: 'Identify given quantities with units: N = 500 turns, r = 0.10 m → A = πr² = π(0.10)² = 0.0314 m², B = 3.0 × 10⁻⁵ T,.' },
            { text: 'Identify formula: |ε| = N|ΔΦ/Δt|, where Φ = BA cosθ. Current I = |ε|/R.' },
            { text: 'Compute initial and final flux: Φ_i = BA cos0° = (3.0×10⁻⁵)(0.0314)(1) = 9.42×10⁻⁷ Wb.' },
            { text: 'Compute |ΔΦ| = |Φ_f - Φ_i| = |-9.42×10⁻⁷ - 9.42×10⁻⁷| = 1.884×10⁻⁶ Wb.' },
            { text: 'Verify: emf ~ mV is reasonable for Earth\'s weak field; current ~ mA is safe for galvanometer.', faded: true, blankAnswer: 'Induced emf = 3.8 mV, Induced current = 1.9 mA' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_005', title: 'An AC generator is a device that.',
          scaffold: { problem: 'A portable generator uses a 150-turn coil of area 0.08 m² rotating at 1500 rpm in a magnetic field of 0.25 T.',
            steps: [
            { text: 'Convert rotation speed to frequency: f = 1500 rpm = 1500/60 = 25 Hz. Angular speed ω = 2πf = 50π rad/s ≈ 157.08 rad/s.' },
            { text: 'Maximum emf ε₀ = NBAω = 150 × 0.25 × 0.08 × 157.08 = 471.24 V. Unit check: (T)(m²)(rad/s) = V.' },
            { text: 'At t=0, emf is zero and increasing → sin(ωt) = 0 with positive slope → ωt = 0. So ε(t) = ε₀ sin(ωt).' },
            { text: 'At t = 2.0 ms = 0.002 s, ωt = 157.08 × 0.002 = 0.31416 rad = π/10 rad. sin(π/10) ≈ 0.309.' },
            { text: 'ε = 471.24 × 0.309 ≈ 145.6 V.', faded: true, blankAnswer: '(a) 25 Hz, (b) 471 V, (c) 146 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_007', title: 'Eddy currents are circulating currents.',
          scaffold: { problem: 'A rectangular copper plate (length L = 0.2 m, width w = 0.1 m, thickness t = 2 mm) falls vertically through a uniform horizontal magnetic.',
            steps: [
            { text: 'Identify given quantities: B = 0.5 T, v = 2 m/s, L = 0.2 m, w = 0.1 m, t = 0.002 m, ρ = 1.7×10⁻⁸ Ω·m.' },
            { text: 'The motional emf across the width w is ε = B·w·v (since the vertical sides cut flux). ε = 0.5 × 0.1 × 2 = 0.1 V.' },
            { text: 'Resistance of the eddy current loop: path length l ≈ 2(L+w) = 2(0.2+0.1) = 0.6 m.' },
            { text: 'Eddy current I = ε/R = 0.1 / 5.1×10⁻⁵ ≈ 1960 A. (Large because copper\'s resistivity is very low.)' },
            { text: 'Magnetic damping force on the two vertical sides (length L) carrying current I: F = 2·B·I·L (forces on top/bottom.', faded: true, blankAnswer: 'Eddy current I ≈ 1960 A; Magnetic damping force F ≈ 392 N.' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_02_008', title: 'A dielectric is an insulating material.',
          scaffold: { problem: 'A parallel plate capacitor with plate area 100 cm² and plate separation 2.0 mm is filled with a dielectric of dielectric constant K = 5.',
            steps: [
            { text: 'Identify given quantities with units: A = 100 cm² = 100 × 10⁻⁴ m² = 0.01 m²; d = 2.0 mm = 2.0 × 10⁻³ m; K = 5; V = 12.' },
            { text: 'Identify formulas: C = Kε₀A/d; Q = CV; E = V/d (since V is fixed by battery); P = ε₀(K-1)E.' },
            { text: 'Substitute values: C = 5 × 8.85×10⁻¹² × 0.01 / (2.0×10⁻³) = 2.2125 × 10⁻¹⁰ F = 221 pF.' },
            { text: 'Q = (2.2125×10⁻¹⁰) × 12 = 2.655 × 10⁻⁹ C = 2.66 nC.' },
            { text: 'E = 12 / (2.0×10⁻³) = 6000 V/m.' },
            { text: 'P = 8.85×10⁻¹² × (5-1) × 6000 = 2.124 × 10⁻⁷ C/m².' },
            { text: 'Verify: E = 6000 V/m is reasonable (well below dielectric strength of typical dielectrics ~10⁷ V/m).', faded: true, blankAnswer: '(a) C = 221 pF, (b) Q = 2.66 nC, (c) E = 6000 V/m, (d) P =.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_06_003', title: 'Identify each idea',
          dissect: { specimen: 'Faraday\'s Law of Electromagnetic Induction', spots: [
            { id: 's1', label: 'Faradays Law of Electromagnetic Induction', prompt: 'Which idea is this? — Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced.', answer: 'Faradays Law of Electromagnetic Induction', options: ['Faradays Law of Electromagnetic Induction', 'Motional EMF is the electromotive', 'An AC generator is a', 'Eddy currents are circulating currents'] },
            { id: 's2', label: 'Motional EMF is the electromotive', prompt: 'Which idea is this? — Motional EMF is the electromotive force induced across the ends of a conductor moving.', answer: 'Motional EMF is the electromotive', options: ['Motional EMF is the electromotive', 'Faradays Law of Electromagnetic Induction', 'An AC generator is a', 'Eddy currents are circulating currents'] },
            { id: 's3', label: 'An AC generator is a', prompt: 'Which idea is this? — An AC generator is a device that converts mechanical energy into alternating current.', answer: 'An AC generator is a', options: ['An AC generator is a', 'Faradays Law of Electromagnetic Induction', 'Motional EMF is the electromotive', 'Eddy currents are circulating currents'] },
            { id: 's4', label: 'Eddy currents are circulating currents', prompt: 'Which idea is this? — Eddy currents are circulating currents induced in bulk conductors (like metal plates,.', answer: 'Eddy currents are circulating currents', options: ['Eddy currents are circulating currents', 'Faradays Law of Electromagnetic Induction', 'Motional EMF is the electromotive', 'An AC generator is a'] },
            { id: 's5', label: 'Maxwells equations in vacuum are', prompt: 'Which idea is this? — Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how.', answer: 'Maxwells equations in vacuum are', options: ['Maxwells equations in vacuum are', 'Faradays Law of Electromagnetic Induction', 'Motional EMF is the electromotive', 'An AC generator is a'] },
            { id: 's6', label: 'A dielectric is an insulating', prompt: 'Which idea is this? — A dielectric is an insulating material with no free charge carriers that, when placed in.', answer: 'A dielectric is an insulating', options: ['A dielectric is an insulating', 'Faradays Law of Electromagnetic Induction', 'Motional EMF is the electromotive', 'An AC generator is a'] }
          ] } }
    ],
    explore: { component: C12_PhysicsGeneratorSim, prompt: 'Explore the interactive — Faraday\'s Law of Electromagnetic Induction' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_001', difficulty: 'standard',
          question: 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the.',
          hint: 'If stuck on flux calculation, revisit c11_phy_cbse_03_007 (dot product) and practice 5.',
          misconception: 'Students believe that a *strong* magnetic field alone induces emf, even if constant.',
          parts: [
                { id: 'a', prompt: 'A square loop of side 20 cm and resistance 2 Ω is placed with its plane perpendicular to a uniform magnetic field of 0.5 T.', answer: 'Given: side = 0.2 m → A = 0.04 m²',
                  options: ['Given: side = 0.2 m → A = 0.04 m²', 'A powerful magnet placed near a coil induces current', 'magnetic field lines cutting the coil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that a *strong* magnetic field alone induces emf, even if constant.' }
          ],
            remediations: { 'a-strong-magnetic-field-alone': { steps: ['Revisit c10_phy_cbse_02_008 (Class 10 Faraday\'s Law) — redo the magnet-coil experiment, explicitly timing the motion.', 'Practice flux calculation: draw area vectors for 5 different coil orientations relative to B, compute Φ = BA cosθ each.', 'Solve 3 numerical problems where only *one* of B, A, or θ changes (e.g., rotating coil, shrinking loop, switching.', 'Re-attempt Diagnostic Questions 2 and 4 — if still wrong, watch the NCERT animation for Experiment 6.3 and trace flux.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_003', difficulty: 'standard',
          question: 'Motional EMF is the electromotive force induced across the ends of a conductor.',
          hint: 'Revisit Lorentz force (c11_phy_cbse_04_008) and flux definition (c12_phy_cbse_06_001).',
          misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Motional EMF is the electromotive force induced across the ends of a conductor moving',
                  options: ['Motional EMF is the electromotive force induced across the ends of a conductor moving', 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced', 'An AC generator is a device that converts mechanical energy into alternating current', 'Eddy currents are circulating currents induced in bulk conductors (like metal plates,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just Faraday\'s law." **Why.' }
          ],
            remediations: { 'misconception-motional-emf-and-induced': { steps: ['If the student conflates motional and transformer EMF: 1.', 'Revisit Class 11 node **c11_phy_cbse_04_008** (Lorentz force) and perform the "rod on rails" thought experiment: rod.', 'No changing \\( B \\) anywhere.', 'Contrast with Class 12 node **c12_phy_cbse_06_001** (Faraday\'s law) where a *stationary* loop experiences induced \\(.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_005', difficulty: 'standard',
          question: 'An AC generator is a device that converts mechanical energy into alternating.',
          hint: 'If stuck, review the derivative of cosine (c11_math_cbse_13_006) and the flux-angle.',
          misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC.',
          parts: [
                { id: 'a', prompt: 'Explain why the emf induced in an AC generator is alternating (changes polarity periodically) even though the magnetic field and rotation direction are.', answer: 'The emf alternates',
                  options: ['The emf alternates', 'because the magnetic field changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' },
                { id: 'b', prompt: 'A student claims: "If we double the number of turns N and halve the area A of the coil, the maximum emf ε₀ remains unchanged." Analyze this statement and state.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'ε₀ doubles because N doubled'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' }
          ],
            remediations: { 'the-slip-rings-cause-the': { steps: ['Revisit Faraday\'s law (c12_phy_cbse_06_001) and magnetic flux definition (c12_phy_cbse_06_001).', 'Practice flux calculation: Φ = BA cosθ for a rotating coil; plot Φ vs t and dΦ/dt vs t on paper.', 'Use the interactive animation link from NCERT (Fig.', '6.13) to visualize coil orientation, flux, and emf simultaneously.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we double the number of turns N and halve the area A of the coil, the maximum emf ε₀ remains unchanged." Analyze this statement and state.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'ε₀ doubles because N doubled'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' }
          ],
            remediations: { 'the-slip-rings-cause-the': { steps: ['Revisit Faraday\'s law (c12_phy_cbse_06_001) and magnetic flux definition (c12_phy_cbse_06_001).', 'Practice flux calculation: Φ = BA cosθ for a rotating coil; plot Φ vs t and dΦ/dt vs t on paper.', 'Use the interactive animation link from NCERT (Fig.', '6.13) to visualize coil orientation, flux, and emf simultaneously.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_007', difficulty: 'standard',
          question: 'Eddy currents are circulating currents induced in bulk conductors (like metal.',
          hint: 'If stuck, revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s.',
          misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with.',
          parts: [
                { id: 'a', prompt: 'An induction furnace uses a high-frequency alternating magnetic field (f = 10 kHz) to melt a cylindrical iron ingot (radius r = 5 cm, height h = 20 cm,.', answer: 'Given: B₀ = 0.5 T, f = 10⁴ Hz, r = 0.05 m, ρ = 10⁻⁷ Ω·m',
                  options: ['Given: B₀ = 0.5 T, f = 10⁴ Hz, r = 0.05 m, ρ = 10⁻⁷ Ω·m', 'more insulation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with transformer cores.' }
          ],
            remediations: { 'eddy-currents-only-occur-in': { steps: ['If the student confuses eddy currents with induced current in a coil: Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and.', 'Then, replace the coil with a solid aluminum plate and observe the damping (no galvanometer needed).', 'If the student cannot apply Lenz\'s law to bulk conductors: Use the "pendulum in magnet" demo (c12_phy_cbse_06_003.', 'If the student thinks laminations work by "adding insulation": Calculate the resistance of a solid core vs.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a transformer, eddy currents are completely eliminated by using a laminated core." Evaluate this statement and correct it if necessary.', answer: 'The statement is false',
                  options: ['The statement is false', 'more insulation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think eddy currents only occur in magnetic materials (like iron) because they associate them with transformer cores.' }
          ],
            remediations: { 'eddy-currents-only-occur-in': { steps: ['If the student confuses eddy currents with induced current in a coil: Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and.', 'Then, replace the coil with a solid aluminum plate and observe the damping (no galvanometer needed).', 'If the student cannot apply Lenz\'s law to bulk conductors: Use the "pendulum in magnet" demo (c12_phy_cbse_06_003.', 'If the student thinks laminations work by "adding insulation": Calculate the resistance of a solid core vs.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_002', difficulty: 'standard',
          question: 'Maxwell\'s equations in vacuum are a set of four fundamental equations that.',
          hint: 'If stuck, re-read NCERT Section 8.2 (Displacement Current) and study Figures 8.1 and 8.2.',
          misconception: 'Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s law, no magnetic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how',
                  options: ['Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how', 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced', 'Motional EMF is the electromotive force induced across the ends of a conductor moving', 'An AC generator is a device that converts mechanical energy into alternating current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s law, no magnetic monopoles, Faraday\'s law,.' }
          ],
            remediations: { 'maxwell-s-equations-are-only': { steps: ['If the student cannot articulate the symmetry between Faraday\'s law and the Ampere-Maxwell law, have them revisit.', 'Then, explicitly write both dynamic equations side by side: ∮ **E**·d**l** = -dΦ_B/dt and ∮ **B**·d**l** = μ₀ε₀ dΦ_E/dt.', 'Ask: "What happens if E changes?', 'What happens if that B changes?'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_02_008', difficulty: 'standard',
          question: 'A dielectric is an insulating material with no free charge carriers that, when.',
          hint: 'If stuck, review Gauss\'s law application to a conductor (c12_phy_cbse_02_007) and the.',
          misconception: 'Students often think that the dielectric constant K is the ratio of the induced bound charge density to the free charge.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A dielectric is an insulating material with no free charge carriers that, when placed in',
                  options: ['A dielectric is an insulating material with no free charge carriers that, when placed in', 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced', 'Motional EMF is the electromotive force induced across the ends of a conductor moving', 'An AC generator is a device that converts mechanical energy into alternating current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the dielectric constant K is the ratio of the induced bound charge density to the free charge density (σₚ/σ).' }
          ],
            remediations: { 'the-dielectric-constant-k-is': { steps: ['If the student cannot distinguish bound vs free charges or derive E = E₀/K: 1.', 'Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to recall free charges in conductors vs bound charges in.', 'Draw the Gaussian pillbox at the dielectric surface (NCERT Fig 2.23) and apply Gauss\'s law to D = ε₀E + P to show D =.', 'Practice Example 2.8 from NCERT (slab of thickness 3d/4) step-by-step, tracking units.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
