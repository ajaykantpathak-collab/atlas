import type { SimDef } from '../../engine/types';
import C12_PhysicsSelfinductionSelfinductanceSim from '../../../simulations/c6_12/C12_PhysicsSelfinductionSelfinductanceSim';

/** v3 wrapped master — C12_PhysicsSelfinductionSelfinductanceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsselfinductionselfinductancesim: SimDef = {
    id: 'v3w_c12_physicsselfinductionselfinductancesim',
    title: 'Selfinduction Selfinductance',
    subtitle: 'This node covers: magnetic flux definition and calculation, Faraday\'s law statement and.',
    classLevel: 12, subject: 'physics', topic: 'Faraday\'s Law of Electromagnetic Induction',
    chapters: [],
    nodeIds: ['c12_phy_cbse_06_001', 'c12_phy_cbse_06_004', 'c12_phy_cbse_06_006', 'c12_phy_cbse_07_003', 'c12_phy_cbse_06_002', 'c12_phy_cbse_06_003', 'c12_phy_cbse_07_002', 'c12_phy_cbse_07_008', 'c12_phy_cbse_06_005', 'c12_phy_cbse_06_007', 'c12_phy_cbse_07_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a ceiling fan\'s motor — when you switch it on, the fan starts rotating due to induced currents from.', goal: 'Master Selfinduction Selfinductance.' },
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_004', title: 'Self-induction is the phenomenon where.',
          scaffold: { problem: 'A long air-core solenoid of length 40 cm, cross-sectional area 25 cm², and 800 turns is connected to a 12 V battery through a switch.',
            steps: [
            { text: 'Identify given quantities with units: l = 40 cm = 0.40 m, A = 25 cm² = 25 × 10⁻⁴ m² = 2.5 × 10⁻³ m², N = 800, V = 12 V,.' },
            { text: 'Calculate steady-state current I = V/R = 12/2.0 = 6.0 A. Compute turns per unit length n = N/l = 800/0.40 = 2000.' },
            { text: 'Use L = μ₀n²Al for long solenoid. Substitute: L = (4π × 10⁻⁷) × (2000)² × (2.5 × 10⁻³) × 0.40.' },
            { text: 'For (b), current change ΔI = 6.0 A (from 6 A to 0). Average emf magnitude |ε_avg| = L|ΔI|/Δt = (5.03 × 10⁻³) × 6.0 / (5.' },
            { text: 'For (c), magnetic energy U = ½LI² = 0.5 × 5.03 × 10⁻³ × (6.0)² = 0.5 × 5.03 × 10⁻³ × 36 = 90.54 × 10⁻³ J = 90.5 mJ.', faded: true, blankAnswer: '(a) L = 5.0 mH, (b) |ε_avg| = 60.4 V, (c) U = 90.5 mJ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_006', title: 'The energy stored in an inductor is the.',
          scaffold: { problem: 'A ceiling fan motor has a winding inductance of 120 mH. When running at full speed, it draws 0.8 A from the 230 V mains (assume DC for this.',
            steps: [
            { text: 'Identify given quantities: \\( L = 120 \\, \\text{mH} = 120 \\times 10^{-3} \\, \\text{H} \\), \\( I = 0.8 \\, \\text{A} \\), \\(.' },
            { text: 'Use energy formula \\( U = \\frac{1}{2} L I^2 \\). Substitute: \\( U = 0.5 \\times 120 \\times 10^{-3} \\times (0.8)^2 = 0.5.' },
            { text: 'For average back emf, use \\( |\\varepsilon_{\\text{avg}}| = L \\frac{|\\Delta I|}{\\Delta t} = 120 \\times 10^{-3} \\times.' },
            { text: 'Check units: \\( \\text{H} \\times \\text{A/s} = (\\text{V·s/A}) \\times \\text{A/s} = \\text{V} \\).' },
            { text: 'Physically reasonable: 48 V back emf is much less than 230 V, so no dangerous spark; 0.038 J is a small energy,.', faded: true, blankAnswer: 'Stored energy = 0.0384 J; average back emf = 48 V.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_003', title: 'Inductive reactance (\\(X_L\\)) is the.',
          scaffold: { problem: 'A pure inductor of 0.12 H is connected to a 220 V, 50 Hz household AC supply.',
            steps: [
            { text: 'Identify given quantities: \\(L = 0.12\\ \\text{H}\\), \\(V_{\\text{rms}} = 220\\ \\text{V}\\), \\(f = 50\\ \\text{Hz}\\), \\(v_m =.' },
            { text: 'Use \\(X_L = \\omega L = 2\\pi f L\\). Check units: \\(\\omega\\) in rad/s, \\(L\\) in H → Ω.' },
            { text: 'Compute \\(X_L = 314 \\times 0.12 = 37.68\\ \\Omega\\). (Using \\(\\omega = 314\\ \\text{rad/s}\\) from given voltage equation.)' },
            { text: '\\(I_{\\text{rms}} = V_{\\text{rms}} / X_L = 220 / 37.68 = 5.84\\ \\text{A}\\).' },
            { text: '\\(i_m = \\sqrt{2} \\times I_{\\text{rms}} = 1.414 \\times 5.84 = 8.26\\ \\text{A}\\).' },
            { text: 'Current lags voltage by \\(\\pi/2\\): \\(i = 8.26 \\sin(314 t - \\pi/2)\\ \\text{A}\\).', faded: true, blankAnswer: '(a) \\(X_L = 37.7\\ \\Omega\\), (b) \\(I_{\\text{rms}} = 5.84\\.' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_06_004', title: 'Identify each idea',
          dissect: { specimen: 'Selfinduction Selfinductance', spots: [
            { id: 's1', label: 'Faradays Law of Electromagnetic Induction', prompt: 'Which idea is this? — Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced.', answer: 'Faradays Law of Electromagnetic Induction', options: ['Faradays Law of Electromagnetic Induction', 'Self-induction is the phenomenon where', 'The energy stored in an', 'Inductive reactance X_L is the'] },
            { id: 's2', label: 'Self-induction is the phenomenon where', prompt: 'Which idea is this? — Self-induction is the phenomenon where a changing current in a coil induces an opposing.', answer: 'Self-induction is the phenomenon where', options: ['Self-induction is the phenomenon where', 'Faradays Law of Electromagnetic Induction', 'The energy stored in an', 'Inductive reactance X_L is the'] },
            { id: 's3', label: 'The energy stored in an', prompt: 'Which idea is this? — The energy stored in an inductor is the magnetic potential energy accumulated in the.', answer: 'The energy stored in an', options: ['The energy stored in an', 'Faradays Law of Electromagnetic Induction', 'Self-induction is the phenomenon where', 'Inductive reactance X_L is the'] },
            { id: 's4', label: 'Inductive reactance X_L is the', prompt: 'Which idea is this? — Inductive reactance (\\(X_L\\)) is the opposition offered by a pure inductor to the flow of.', answer: 'Inductive reactance X_L is the', options: ['Inductive reactance X_L is the', 'Faradays Law of Electromagnetic Induction', 'Self-induction is the phenomenon where', 'The energy stored in an'] },
            { id: 's5', label: 'Lenzs Law states that the', prompt: 'Which idea is this? — Lenz\'s Law states that the direction of the induced electromotive force (emf) in a closed.', answer: 'Lenzs Law states that the', options: ['Lenzs Law states that the', 'Faradays Law of Electromagnetic Induction', 'Self-induction is the phenomenon where', 'The energy stored in an'] },
            { id: 's6', label: 'Motional EMF is the electromotive', prompt: 'Which idea is this? — Motional EMF is the electromotive force induced across the ends of a conductor moving.', answer: 'Motional EMF is the electromotive', options: ['Motional EMF is the electromotive', 'Faradays Law of Electromagnetic Induction', 'Self-induction is the phenomenon where', 'The energy stored in an'] }
          ] } }
    ],
    explore: { component: C12_PhysicsSelfinductionSelfinductanceSim, prompt: 'Explore the interactive — Selfinduction Selfinductance' },
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
            remediations: { 'mutual-inductance-m-depends-on': { steps: ['Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s Law) — practice determining emf direction.', 'Re-derive L = μ₀n²Al for solenoid from B = μ₀nI and Φ = BA, tracking n = N/l vs N.', 'Re-derive M = μ₀n₁n₂πr₁²l for coaxial solenoids, noting which radius (inner) appears.', 'Solve 5 problems each from NCERT Exercises 6.7 and 6.8 focusing on sign of ε and energy formula.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_006', difficulty: 'standard',
          question: 'The energy stored in an inductor is the magnetic potential energy accumulated.',
          hint: 'Revisit c12_phy_cbse_06_004 (Self-Induction) and c11_phy_cbse_05_002 (Work Done by.',
          misconception: 'Students often think the energy stored in an inductor is \\( U = L I \\) (linear in I) because they confuse the back emf.',
          parts: [
                { id: 'a', prompt: 'A solenoid of self-inductance \\( 40 \\, \\text{mH} \\) carries a steady current of \\( 2.5 \\, \\text{A} \\). Calculate the magnetic energy stored.', answer: 'Given: \\( L = 40 \\times 10^{-3} \\, \\text{H} \\), \\( I = 2.5 \\, \\text{A} \\)',
                  options: ['Given: \\( L = 40 \\times 10^{-3} \\, \\text{H} \\), \\( I = 2.5 \\, \\text{A} \\)', '\\( U \\propto I \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy stored in an inductor is \\( U = L I \\) (linear in I) because they confuse the back emf magnitude \\( L.' }
          ],
            remediations: { 'the-energy-stored-in-an': { steps: ['If the student writes \\( U = L I \\) or \\( U = \\frac{1}{2} L I \\), have them re-derive step by step: (1) Write back emf.', '(2) Power \\( P = I \\varepsilon = L I \\frac{dI}{dt} \\).', '(3) Energy \\( dU = P dt = L I dI \\).', '(4) Integrate \\( \\int_0^I L I\' dI\' = \\frac{1}{2} L I^2 \\).'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_003', difficulty: 'standard',
          question: 'Inductive reactance (\\(X_L\\)) is the opposition offered by a pure inductor to.',
          hint: 'Review Class 12 Physics Chapter 6 (Electromagnetic Induction) for self-inductance and.',
          misconception: 'Students often believe that because an inductor has reactance (opposition to current), it must dissipate energy like a.',
          parts: [
                { id: 'a', prompt: 'A pure inductor of 40 mH is connected to a 220 V, 50 Hz AC supply.', answer: 'the inductive reactance, (',
                  options: ['the inductive reactance, (', 'current leads voltage (capacitor behaviour)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because an inductor has reactance (opposition to current), it must dissipate energy like a resistor.' }
          ],
            remediations: { 'because-an-inductor-has-reactance': { steps: ['Revisit Faraday\'s law and self-inductance (Class 12 Chapter 6, Electromagnetic Induction) — focus on the sign of back.', 'Review the integration of \\(\\sin \\omega t\\) and the trigonometric identity \\(\\cos \\theta = \\sin(\\theta + \\pi/2)\\).', 'Perform the CRO experiment described in Diagnostic Question 6 (or simulate it online) to visually confirm the \\(\\pi/2\\).', 'Re-derive the current equation step-by-step from \\(v = L \\frac{di}{dt}\\) without skipping the integration constant.'] } } },
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
                  options: ['Motional EMF is the electromotive force induced across the ends of a conductor moving', 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced', 'Self-induction is the phenomenon where a changing current in a coil induces an opposing', 'The energy stored in an inductor is the magnetic potential energy accumulated in the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just Faraday\'s law." **Why.' }
          ],
            remediations: { 'misconception-motional-emf-and-induced': { steps: ['If the student conflates motional and transformer EMF: 1.', 'Revisit Class 11 node **c11_phy_cbse_04_008** (Lorentz force) and perform the "rod on rails" thought experiment: rod.', 'No changing \\( B \\) anywhere.', 'Contrast with Class 12 node **c12_phy_cbse_06_001** (Faraday\'s law) where a *stationary* loop experiences induced \\(.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
