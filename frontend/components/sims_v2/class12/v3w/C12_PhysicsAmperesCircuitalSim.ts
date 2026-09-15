import type { SimDef } from '../../engine/types';
import C12_PhysicsAmperesCircuitalSim from '../../../simulations/c6_12/C12_PhysicsAmperesCircuitalSim';

/** v3 wrapped master — C12_PhysicsAmperesCircuitalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsamperescircuitalsim: SimDef = {
    id: 'v3w_c12_physicsamperescircuitalsim',
    title: 'Amperes Circuital',
    subtitle: 'This node covers the definition of electric current (steady and instantaneous), its SI.',
    classLevel: 12, subject: 'physics', topic: 'Electric Current: Definition and Direction',
    chapters: [],
    nodeIds: ['c12_phy_cbse_03_001', 'c12_phy_cbse_06_007', 'c12_phy_cbse_06_001', 'c12_phy_cbse_06_002', 'c12_phy_cbse_06_003', 'c12_phy_cbse_06_004', 'c12_phy_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a mobile phone charging: the battery icon shows a lightning bolt, indicating charge flow.', goal: 'Master Amperes Circuital.' },
    discovery: {
        question: 'A student writes: "Current I = 5 C flowing through a wire." Identify the error and state the correct quantity with its unit.',
        options: ['Error: Current is a rate, not an amount of charge', 'current is a vector', '"current is a vector'],
        answer: 'Error: Current is a rate, not an amount of charge',
        hook: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply.',
    },
    teaching: [
        { title: 'Electric current is the rate of flow of net.', text: 'Electric current is the rate of flow of net charge across a cross-sectional area of a conductor. In SI units, it is measured in amperes (A), where 1 A = 1 C/s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_001', title: 'Electric current is the rate of flow of.',
          scaffold: { problem: 'A smartphone charger delivers a steady current of 1.2 A to the battery.',
            steps: [
            { text: 'Identify given: I = 1.2 A, t = 45 min = 45 × 60 = 2700 s. Find: Q (C) and number of electrons N.' },
            { text: 'Use steady current formula Q = I × t. Check units: A × s = C.' },
            { text: 'Substitute: Q = 1.2 A × 2700 s = 3240 C.' },
            { text: 'Number of electrons N = Q / e = 3240 C / (1.6 × 10⁻¹⁹ C) = 2.025 × 10²² electrons.' },
            { text: 'Verify: 3240 C is reasonable for phone charging (typical battery ~10,000 C capacity).', faded: true, blankAnswer: 'Q = 3240 C, N = 2.025 × 10²² electrons' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_001', title: 'Faraday\'s Law of Electromagnetic.',
          scaffold: { problem: 'A circular coil of radius 10 cm has 500 turns and resistance 2 Ω.',
            steps: [
            { text: 'Identify given quantities with units: N = 500 turns, r = 0.10 m → A = πr² = π(0.10)² = 0.0314 m², B = 3.0 × 10⁻⁵ T,.' },
            { text: 'Identify formula: |ε| = N|ΔΦ/Δt|, where Φ = BA cosθ. Current I = |ε|/R.' },
            { text: 'Compute initial and final flux: Φ_i = BA cos0° = (3.0×10⁻⁵)(0.0314)(1) = 9.42×10⁻⁷ Wb.' },
            { text: 'Compute |ΔΦ| = |Φ_f - Φ_i| = |-9.42×10⁻⁷ - 9.42×10⁻⁷| = 1.884×10⁻⁶ Wb.' },
            { text: 'Verify: emf ~ mV is reasonable for Earth\'s weak field; current ~ mA is safe for galvanometer.', faded: true, blankAnswer: 'Induced emf = 3.8 mV, Induced current = 1.9 mA' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_002', title: 'Lenz\'s Law states that the direction of.',
          scaffold: { problem: 'A square loop of side 12 cm and resistance 2.0 Ω lies in the plane of the page. A uniform magnetic field of 0.80 T points into the page.',
            steps: [
            { text: 'Identify given quantities: side \\(a = 0.12\\ \\text{m}\\), \\(R = 2.0\\ \\Omega\\), \\(B = 0.80\\ \\text{T}\\) (into page), \\(v =.' },
            { text: 'Flux through loop: \\(\\Phi_B = B \\cdot A_{\\text{inside}} = B \\cdot (a \\cdot x)\\) where \\(x\\) is length still inside.' },
            { text: 'Induced emf magnitude: \\(|\\mathcal{E}| = | -N d\\Phi_B/dt | = B a v\\) (N=1).' },
            { text: 'Direction: Flux into page is decreasing. Induced current must produce field into page → clockwise current (right-hand.' },
            { text: 'Magnetic force on left side of loop (current downward, field into page): \\(\\vec{F} = I \\vec{L} \\times \\vec{B}\\).' },
            { text: 'To maintain constant velocity, external force must balance magnetic force: \\(F_{\\text{ext}} = 2.3 \\times 10^{-4}\\.', faded: true, blankAnswer: '(a) 4.8 mV, (b) 2.4 mA clockwise, (c) \\(2.3 \\times 10^{-4}\\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_004', title: 'Self-induction is the phenomenon where.',
          scaffold: { problem: 'A long air-core solenoid of length 40 cm, cross-sectional area 25 cm², and 800 turns is connected to a 12 V battery through a switch.',
            steps: [
            { text: 'Identify given quantities with units: l = 40 cm = 0.40 m, A = 25 cm² = 25 × 10⁻⁴ m² = 2.5 × 10⁻³ m², N = 800, V = 12 V,.' },
            { text: 'Calculate steady-state current I = V/R = 12/2.0 = 6.0 A. Compute turns per unit length n = N/l = 800/0.40 = 2000.' },
            { text: 'Use L = μ₀n²Al for long solenoid. Substitute: L = (4π × 10⁻⁷) × (2000)² × (2.5 × 10⁻³) × 0.40.' },
            { text: 'For (b), current change ΔI = 6.0 A (from 6 A to 0). Average emf magnitude |ε_avg| = L|ΔI|/Δt = (5.03 × 10⁻³) × 6.0 / (5.' },
            { text: 'For (c), magnetic energy U = ½LI² = 0.5 × 5.03 × 10⁻³ × (6.0)² = 0.5 × 5.03 × 10⁻³ × 36 = 90.54 × 10⁻³ J = 90.5 mJ.', faded: true, blankAnswer: '(a) L = 5.0 mH, (b) |ε_avg| = 60.4 V, (c) U = 90.5 mJ.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_06_007', title: 'Identify each idea',
          dissect: { specimen: 'Amperes Circuital', spots: [
            { id: 's1', label: 'Electric current is the rate', prompt: 'Which idea is this? — Electric current is the rate of flow of net charge across a cross-sectional area of a.', answer: 'Electric current is the rate', options: ['Electric current is the rate', 'Eddy currents are circulating currents', 'Faradays Law of Electromagnetic Induction', 'Lenzs Law states that the'] },
            { id: 's2', label: 'Eddy currents are circulating currents', prompt: 'Which idea is this? — Eddy currents are circulating currents induced in bulk conductors (like metal plates,.', answer: 'Eddy currents are circulating currents', options: ['Eddy currents are circulating currents', 'Electric current is the rate', 'Faradays Law of Electromagnetic Induction', 'Lenzs Law states that the'] },
            { id: 's3', label: 'Faradays Law of Electromagnetic Induction', prompt: 'Which idea is this? — Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced.', answer: 'Faradays Law of Electromagnetic Induction', options: ['Faradays Law of Electromagnetic Induction', 'Electric current is the rate', 'Eddy currents are circulating currents', 'Lenzs Law states that the'] },
            { id: 's4', label: 'Lenzs Law states that the', prompt: 'Which idea is this? — Lenz\'s Law states that the direction of the induced electromotive force (emf) in a closed.', answer: 'Lenzs Law states that the', options: ['Lenzs Law states that the', 'Electric current is the rate', 'Eddy currents are circulating currents', 'Faradays Law of Electromagnetic Induction'] },
            { id: 's5', label: 'Motional EMF is the electromotive', prompt: 'Which idea is this? — Motional EMF is the electromotive force induced across the ends of a conductor moving.', answer: 'Motional EMF is the electromotive', options: ['Motional EMF is the electromotive', 'Electric current is the rate', 'Eddy currents are circulating currents', 'Faradays Law of Electromagnetic Induction'] },
            { id: 's6', label: 'Self-induction is the phenomenon where', prompt: 'Which idea is this? — Self-induction is the phenomenon where a changing current in a coil induces an opposing.', answer: 'Self-induction is the phenomenon where', options: ['Self-induction is the phenomenon where', 'Electric current is the rate', 'Eddy currents are circulating currents', 'Faradays Law of Electromagnetic Induction'] }
          ] } }
    ],
    explore: { component: C12_PhysicsAmperesCircuitalSim, prompt: 'Explore the interactive — Amperes Circuital' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_001', difficulty: 'standard',
          question: 'Electric current is the rate of flow of net charge across a cross-sectional.',
          hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001.',
          misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Current I = 5 C flowing through a wire." Identify the error and state the correct quantity with its unit.', answer: 'Error: Current is a rate, not an amount of charge',
                  options: ['Error: Current is a rate, not an amount of charge', 'current is a vector', '"current is a vector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' },
                { id: 'b', prompt: 'A steady current of 2.5 A flows through a household fan motor for 10 minutes. Calculate the total charge that passes through any cross-section of the wire.', answer: 'Given: I = 2.5 A, t = 10 min = 600 s',
                  options: ['Given: I = 2.5 A, t = 10 min = 600 s', 'current is a vector', '"current is a vector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' },
                { id: 'c', prompt: 'Two wires A and B carry currents 3 A and 5 A respectively. Wire A has electrons drifting at 0.2 mm/s; wire B has electrons drifting at 0.1 mm/s.', answer: 'From I = nAev_d, n ∝ I/v_d (since A, e constant)',
                  options: ['From I = nAev_d, n ∝ I/v_d (since A, e constant)', 'higher drift speed means more charge', 'current is a vector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' }
          ],
            remediations: { 'current-is-a-vector-because': { steps: ['Revisit Class 10 node c10_phy_cbse_01_001 (Electric Current: Definition and Unit) to reinforce I = Q/t and the ampere.', 'Perform a thought experiment: imagine a T-junction with water pipes — water flow rates add algebraically, not.', 'Practice: given three wires meeting at a point with currents 2 A, 3 A, and 4 A marked with arrows, determine the actual.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this scalar mindset.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply.',
          parts: [
                { id: 'a', prompt: 'A student solves a circuit problem and writes: "Current entering junction = 3 A, leaving = 2 A + 2 A = 4 A.', answer: 'The student\'s reasoning is flawed',
                  options: ['The student\'s reasoning is flawed', 'current is a vector', '"current is a vector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' },
                { id: 'b', prompt: 'Design a simple experiment using a battery, an ammeter, a variable resistor, and a stopwatch to verify that current is the rate of flow of charge.', answer: 'Procedure: (1) Connect battery, ammeter, and variable resistor in series',
                  options: ['Procedure: (1) Connect battery, ammeter, and variable resistor in series', 'current is a vector', '"current is a vector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' }
          ],
            remediations: { 'current-is-a-vector-because': { steps: ['Revisit Class 10 node c10_phy_cbse_01_001 (Electric Current: Definition and Unit) to reinforce I = Q/t and the ampere.', 'Perform a thought experiment: imagine a T-junction with water pipes — water flow rates add algebraically, not.', 'Practice: given three wires meeting at a point with currents 2 A, 3 A, and 4 A marked with arrows, determine the actual.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this scalar mindset.'] } } },
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_002', difficulty: 'standard',
          question: 'Lenz\'s Law states that the direction of the induced electromotive force (emf).',
          hint: 'If flux calculation or sign of \\(d\\Phi_B/dt\\) is unclear, review c12_phy_cbse_06_001.',
          misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the.',
          parts: [
                { id: 'a', prompt: 'A circular loop lies in the plane of this paper. A uniform magnetic field points perpendicularly *into* the paper and is increasing steadily with time.', answer: 'The induced current flows **counterclockwise** (as seen from above)',
                  options: ['The induced current flows **counterclockwise** (as seen from above)', 'oppose the change', 'induced current opposes the **magnetic field**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic.' },
                { id: 'b', prompt: 'A rectangular loop of wire (width \\(w = 0.20\\ \\text{m}\\), length \\(l = 0.40\\ \\text{m}\\)) is pulled at constant velocity \\(v = 0.10\\ \\text{m/s}\\) out of a.', answer: 'the magnitude of the induced emf, and (',
                  options: ['the magnitude of the induced emf, and (', 'induced current opposes the **magnetic field**', 'opposes the **change in magnetic flux**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic.' }
          ],
            remediations: { 'lenz-s-law-means-induced': { steps: ['Revisit **c12_phy_cbse_06_001** (Faraday\'s Law) and practice computing \\(\\frac{d\\Phi_B}{dt}\\) with correct sign for 5.', 'Use the right-hand grip rule **c11_phy_cbse_03_008** (Vector Cross Product) to map current direction → magnetic field.', 'Drill: "Current clockwise → field into page?', 'Perform the copper tube experiment (Diagnostic 6) physically or watch a video.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using only a bar magnet, a copper tube (length ~50 cm, inner diameter slightly larger than the magnet), and a stopwatch to.', answer: 'Drop the magnet through the copper tube and time its fall',
                  options: ['Drop the magnet through the copper tube and time its fall', 'induced current opposes the **magnetic field**', 'opposes the **change in magnetic flux**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic.' }
          ],
            remediations: { 'lenz-s-law-means-induced': { steps: ['Revisit **c12_phy_cbse_06_001** (Faraday\'s Law) and practice computing \\(\\frac{d\\Phi_B}{dt}\\) with correct sign for 5.', 'Use the right-hand grip rule **c11_phy_cbse_03_008** (Vector Cross Product) to map current direction → magnetic field.', 'Drill: "Current clockwise → field into page?', 'Perform the copper tube experiment (Diagnostic 6) physically or watch a video.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_003', difficulty: 'standard',
          question: 'Motional EMF is the electromotive force induced across the ends of a conductor.',
          hint: 'Revisit Lorentz force (c11_phy_cbse_04_008) and flux definition (c12_phy_cbse_06_001).',
          misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Motional EMF is the electromotive force induced across the ends of a conductor moving',
                  options: ['Motional EMF is the electromotive force induced across the ends of a conductor moving', 'Electric current is the rate of flow of net charge across a cross-sectional area of a', 'Eddy currents are circulating currents induced in bulk conductors (like metal plates,', 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just Faraday\'s law." **Why.' }
          ],
            remediations: { 'misconception-motional-emf-and-induced': { steps: ['If the student conflates motional and transformer EMF: 1.', 'Revisit Class 11 node **c11_phy_cbse_04_008** (Lorentz force) and perform the "rod on rails" thought experiment: rod.', 'No changing \\( B \\) anywhere.', 'Contrast with Class 12 node **c12_phy_cbse_06_001** (Faraday\'s law) where a *stationary* loop experiences induced \\(.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_004', difficulty: 'standard',
          question: 'Self-induction is the phenomenon where a changing current in a coil induces an.',
          hint: 'If stuck on sign conventions or flux linkage, revisit c12_phy_cbse_06_001 (Faraday\'s Law).',
          misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of self-inductance and write its dimensional formula.', answer: 'SI unit: henry (H) = Wb/A = V·s/A',
                  options: ['SI unit: henry (H) = Wb/A = V·s/A', 'mutual inductance M depends on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' },
                { id: 'b', prompt: 'Two concentric circular coils of radii r₁ = 2 cm and r₂ = 20 cm (r₁ ≪ r₂) are placed coaxially. The larger coil carries a current I₂ = 5.0 A.', answer: 'For r₁ ≪ r₂, field at center of large coil: B₂ = μ₀I₂/(2r₂)',
                  options: ['For r₁ ≪ r₂, field at center of large coil: B₂ = μ₀I₂/(2r₂)', 'mutual inductance M depends on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' }
          ],
            remediations: { 'mutual-inductance-m-depends-on': { steps: ['Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s Law) — practice determining emf direction.', 'Re-derive L = μ₀n²Al for solenoid from B = μ₀nI and Φ = BA, tracking n = N/l vs N.', 'Re-derive M = μ₀n₁n₂πr₁²l for coaxial solenoids, noting which radius (inner) appears.', 'Solve 5 problems each from NCERT Exercises 6.7 and 6.8 focusing on sign of ε and energy formula.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "Self-inductance of a solenoid is 5 mH. Current changes from 2 A to 4 A in 0.1 s.', answer: 'The magnitude and direction statement are correct',
                  options: ['The magnitude and direction statement are correct', 'uniform rate', 'mutual inductance M depends on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' },
                { id: 'b', prompt: 'Design a simple experiment using a solenoid, a battery, a switch, and an LED to demonstrate self-induction (back emf).', answer: 'Connect solenoid, battery, and switch in series',
                  options: ['Connect solenoid, battery, and switch in series', 'mutual inductance M depends on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' },
                { id: 'c', prompt: 'Two concentric circular coils of radii r₁ = 2 cm and r₂ = 20 cm (r₁ ≪ r₂) are placed coaxially. The larger coil carries a current I₂ = 5.0 A.', answer: 'For r₁ ≪ r₂, field at center of large coil: B₂ = μ₀I₂/(2r₂)',
                  options: ['For r₁ ≪ r₂, field at center of large coil: B₂ = μ₀I₂/(2r₂)', 'mutual inductance M depends on'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' }
          ],
            remediations: { 'mutual-inductance-m-depends-on': { steps: ['Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s Law) — practice determining emf direction.', 'Re-derive L = μ₀n²Al for solenoid from B = μ₀nI and Φ = BA, tracking n = N/l vs N.', 'Re-derive M = μ₀n₁n₂πr₁²l for coaxial solenoids, noting which radius (inner) appears.', 'Solve 5 problems each from NCERT Exercises 6.7 and 6.8 focusing on sign of ε and energy formula.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
