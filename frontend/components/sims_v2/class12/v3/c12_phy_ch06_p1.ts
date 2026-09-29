import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch06_p1: SimDef = {
    id: 'v3_c12_phy_ch06_p1',
    title: 'Electromagnetic Induction',
    subtitle: 'The discovery that powers the grid — motion becoming electricity.',
    classLevel: 12, subject: 'physics', topic: 'Electromagnetic Induction',
    chapters: ['c12_phy_ch06'],
    nodeIds: ['c12_phy_cbse_06_001', 'c12_phy_cbse_06_002', 'c12_phy_cbse_06_003', 'c12_phy_cbse_06_004', 'c12_phy_cbse_06_005', 'c12_phy_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a power-grid engineer designing a generator', intro: 'A city needs electricity that doesn\'t come from batteries. Your job: figure out how moving a magnet near a coil creates current from nothing.', goal: 'Predict when induction happens, which way current flows, and why changing flux is everything.' },
    discovery: {
        question: 'A magnet sits perfectly still inside a coil — nothing happens. Move it, and current flows. Where does the electricity come from?',
        options: ['The changing magnetic field — motion is the source', 'The magnet contains charge that jumps', 'The coil stores static from the air', 'Friction between magnet and coil'],
        answer: 'The changing magnetic field — motion is the source',
        hook: 'A still magnet creates nothing — induction needs change. It\'s not the field that generates current; it\'s the field CHANGING.',
    },
    teaching: [
        { title: 'Faraday\'s Law of Electromagnetic Induction', text: 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced electromotive force (emf) in a closed circuit is equal to the time rate of change of magnetic flux through the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_06_001', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
        context: 'On the induction lab: move the magnet faster and slower — watch how the current tracks the RATE of change, not the position.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_001', title: 'Faraday\'s Law of Electromagnetic Induction',
          scaffold: { problem: 'A circular coil of radius 10 cm has 500 turns and resistance 2 Ω.',
            steps: [
            { text: 'Identify given quantities with units: N = 500 turns, r = 0.10 m → A = πr² = π(0.10)² = 0.0314 m², B = 3.0 × 10⁻⁵.' },
            { text: 'Identify formula: |ε| = N|ΔΦ/Δt|, where Φ = BA cosθ. Current I = |ε|/R.' },
            { text: 'Compute initial and final flux: Φ_i = BA cos0° = (3.0×10⁻⁵)(0.0314)(1) = 9.42×10⁻⁷ Wb.' },
            { text: 'Compute |ΔΦ| = |Φ_f - Φ_i| = |-9.42×10⁻⁷ - 9.42×10⁻⁷| = 1.884×10⁻⁶ Wb.' },
            { text: 'Verify: emf ~ mV is reasonable for Earth\'s weak field; current ~ mA is safe for galvanometer.', faded: true, blankAnswer: 'Induced emf = 3.8 mV, Induced current = 1.9 mA' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_06_002', title: 'Lenz\'s Law: Direction of Induced EMF',
          caseStudy: { intro: 'Imagine a ceiling fan rotating in your room — when you switch it off, the fan doesn\'t stop instantly; it keeps spinning due to inertia.',
            decisions: [{ prompt: 'State Lenz\'s law in your own words and write the mathematical expression of Faraday\'s law that incorporates it.', options: [
                { text: 'Lenz\'s law: The induced current flows in a direction such that its magnetic field opposes', outcome: 'Lenz\'s law: The induced current flows in a direction such that its magnetic field opposes the.' },
                { text: 'induced current opposes the **magnetic field**', outcome: 'Not quite — Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than.', reveals: 'lenz-s-law-means-induced' },
                { text: 'opposes the **change in magnetic flux**', outcome: 'Not quite — Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than.', reveals: 'lenz-s-law-means-induced' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_004', title: 'Self-Induction and Mutual Induction',
          scaffold: { problem: 'A long air-core solenoid of length 40 cm, cross-sectional area 25 cm², and 800 turns is connected to a 12 V battery through a switch.',
            steps: [
            { text: 'Identify given quantities with units: l = 40 cm = 0.40 m, A = 25 cm² = 25 × 10⁻⁴ m² = 2.5 × 10⁻³ m², N = 800, V = 12.' },
            { text: 'Calculate steady-state current I = V/R = 12/2.0 = 6.0 A. Compute turns per unit length n = N/l = 800/0.40 = 2000.' },
            { text: 'Use L = μ₀n²Al for long solenoid. Substitute: L = (4π × 10⁻⁷) × (2000)² × (2.5 × 10⁻³) × 0.40.' },
            { text: 'For (b), current change ΔI = 6.0 A (from 6 A to 0). Average emf magnitude |ε_avg| = L|ΔI|/Δt = (5.03 × 10⁻³) × 6.0 / (5.' },
            { text: 'For (c), magnetic energy U = ½LI² = 0.5 × 5.03 × 10⁻³ × (6.0)² = 0.5 × 5.03 × 10⁻³ × 36 = 90.54 × 10⁻³ J = 90.5 mJ.', faded: true, blankAnswer: '(a) L = 5.0 mH, (b) |ε_avg| = 60.4 V, (c) U = 90.5 mJ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_005', title: 'AC Generator: Principle and Working',
          scaffold: { problem: 'A portable generator uses a 150-turn coil of area 0.08 m² rotating at 1500 rpm in a magnetic field of 0.25 T.',
            steps: [
            { text: 'Convert rotation speed to frequency: f = 1500 rpm = 1500/60 = 25 Hz. Angular speed ω = 2πf = 50π rad/s ≈ 157.08 rad/s.' },
            { text: 'Maximum emf ε₀ = NBAω = 150 × 0.25 × 0.08 × 157.08 = 471.24 V. Unit check: (T)(m²)(rad/s) = V.' },
            { text: 'At t=0, emf is zero and increasing → sin(ωt) = 0 with positive slope → ωt = 0. So ε(t) = ε₀ sin(ωt).' },
            { text: 'At t = 2.0 ms = 0.002 s, ωt = 157.08 × 0.002 = 0.31416 rad = π/10 rad. sin(π/10) ≈ 0.309.' },
            { text: 'ε = 471.24 × 0.309 ≈ 145.6 V.', faded: true, blankAnswer: '(a) 25 Hz, (b) 471 V, (c) 146 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_006', title: 'Energy Stored in an Inductor',
          scaffold: { problem: 'A ceiling fan motor has a winding inductance of 120 mH. When running at full speed, it draws 0.8 A from the 230 V mains (assume DC for this.',
            steps: [
            { text: 'Identify given quantities: \\( L = 120 \\, \\text{mH} = 120 \\times 10^{-3} \\, \\text{H} \\), \\( I = 0.8 \\, \\text{A} \\), \\.' },
            { text: 'Use energy formula \\( U = \\frac{1}{2} L I^2 \\). Substitute: \\( U = 0.5 \\times 120 \\times 10^{-3} \\times (0.8)^2 = 0.5.' },
            { text: 'For average back emf, use \\( |\\varepsilon_{\\text{avg}}| = L \\frac{|\\Delta I|}{\\Delta t} = 120 \\times 10^{-3} \\times.' },
            { text: 'Check units: \\( \\text{H} \\times \\text{A/s} = (\\text{V·s/A}) \\times \\text{A/s} = \\text{V} \\).' },
            { text: 'Physically reasonable: 48 V back emf is much less than 230 V, so no dangerous spark; 0.038 J is a small energy.', faded: true, blankAnswer: 'Stored energy = 0.0384 J; average back emf = 48 V.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In an induction demo, a teammate proposes wiring the coil \'helpfully\': \'let the induced current\'s field pull the approaching magnet in — free acceleration, bigger emf.\'',
            decisions: [{ prompt: 'What does Lenz\'s law say that design would violate?', options: [
                { text: 'Energy conservation — an induced current can only oppose the flux change that created it; if it aided the magnet\'s approach, motion would generate current that generates motion — free energy — so the induced field must push back, not pull in.', outcome: 'The chapter\'s minus sign is physics, not convention: \'oppose the change\' is what makes you do mechanical work to induce a current — that\'s where the electrical energy comes from.' },
                { text: 'Nothing — induced current direction is a convention, so wire it whichever way helps.', outcome: 'The negative sign in Faraday\'s law encodes the direction, and it isn\'t negotiable: aiding the change would mean current without work — the law forbids it precisely so the energy audit closes.', reveals: 'direction-is-convention' },
                { text: 'It already opposes the field, so opposing the magnet\'s approach is the same thing.', outcome: 'Oppose the CHANGE, not the field — when the magnet recedes, the induced current builds a field in the same direction to resist the loss; opposing the field itself would flip direction mid-demo.', reveals: 'oppose-field-not-change' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Faraday moved a magnet in a coil and lit the world — every generator in every dam, coal plant and wind farm is still running his experiment.',
            decisions: [{ prompt: 'What comes next? Electromagnetic Induction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electromagnetic Induction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_001', difficulty: 'standard',
          question: 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the.',
          hint: 'If stuck on flux calculation, revisit c11_phy_cbse_03_007 (dot product) and practice 5.',
          misconception: 'Students believe that a *strong* magnetic field alone induces emf, even if constant.',
          parts: [
                { id: 'a', prompt: 'A square loop of side 20 cm and resistance 2 Ω is placed with its plane perpendicular to a uniform magnetic field of 0.5 T.', answer: 'Given: side = 0.2 m → A = 0.04 m²',
                  options: ['Given: side = 0.2 m → A = 0.04 m²', 'A powerful magnet placed near a coil induces current', 'magnetic field lines cutting the coil', 'changing flux through the coil'],
                  hint: 'If stuck on flux calculation, revisit c11_phy_cbse_03_007 (dot product) and practice 5 problems.',
                  misconception: 'Students believe that a *strong* magnetic field alone induces emf, even if constant.' }
          ],
            remediations: { 'a-strong-magnetic-field-alone': { steps: ['Revisit c10_phy_cbse_02_008 (Class 10 Faraday\'s Law) — redo the magnet-coil experiment, explicitly timing the motion.', 'Practice flux calculation: draw area vectors for 5 different coil orientations relative to B, compute Φ = BA cosθ each.', 'Solve 3 numerical problems where only *one* of B, A, or θ changes (e.g., rotating coil, shrinking loop, switching.', 'Re-attempt Diagnostic Questions 2 and 4 — if still wrong, watch the NCERT animation for Experiment 6.3 and trace flux.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_002', difficulty: 'standard',
          question: 'Lenz\'s Law states that the direction of the induced electromotive force (emf).',
          hint: 'If flux calculation or sign of \\(d\\Phi_B/dt\\) is unclear, review c12_phy_cbse_06_001.',
          misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the.',
          parts: [
                { id: 'a', prompt: 'A circular loop lies in the plane of this paper. A uniform magnetic field points perpendicularly *into* the paper and is increasing steadily with time.', answer: 'The induced current flows **counterclockwise** (as seen from above)',
                  options: ['The induced current flows **counterclockwise** (as seen from above)', 'oppose the change', 'induced current opposes the **magnetic field**', 'opposes the **change in magnetic flux**'],
                  hint: 'If flux calculation or sign of \\(d\\Phi_B/dt\\) is unclear, review c12_phy_cbse_06_001 (Faraday\'s.',
                  misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic.' },
                { id: 'b', prompt: 'A rectangular loop of wire (width \\(w = 0.20\\ \\text{m}\\), length \\(l = 0.40\\ \\text{m}\\)) is pulled at constant velocity \\(v = 0.10\\ \\text{m/s}\\) out of.', answer: 'the magnitude of the induced emf, and (',
                  options: ['the magnitude of the induced emf, and (', 'induced current opposes the **magnetic field**', 'opposes the **change in magnetic flux**'],
                  hint: 'If flux calculation or sign of \\(d\\Phi_B/dt\\) is unclear, review c12_phy_cbse_06_001 (Faraday\'s.',
                  misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic.' }
          ],
            remediations: { 'lenz-s-law-means-induced': { steps: ['Revisit **c12_phy_cbse_06_001** (Faraday\'s Law) and practice computing \\(\\frac{d\\Phi_B}{dt}\\) with correct sign for 5.', 'Use the right-hand grip rule **c11_phy_cbse_03_008** (Vector Cross Product) to map current direction → magnetic field.', 'Drill: "Current clockwise → field into page?', 'Perform the copper tube experiment (Diagnostic 6) physically or watch a video.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using only a bar magnet, a copper tube (length ~50 cm, inner diameter slightly larger than the magnet), and a stopwatch.', answer: 'Drop the magnet through the copper tube and time its fall',
                  options: ['Drop the magnet through the copper tube and time its fall', 'induced current opposes the **magnetic field**', 'opposes the **change in magnetic flux**'],
                  hint: 'If flux calculation or sign of \\(d\\Phi_B/dt\\) is unclear, review c12_phy_cbse_06_001 (Faraday\'s.',
                  misconception: 'Students often think Lenz\'s law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic.' }
          ],
            remediations: { 'lenz-s-law-means-induced': { steps: ['Revisit **c12_phy_cbse_06_001** (Faraday\'s Law) and practice computing \\(\\frac{d\\Phi_B}{dt}\\) with correct sign for 5.', 'Use the right-hand grip rule **c11_phy_cbse_03_008** (Vector Cross Product) to map current direction → magnetic field.', 'Drill: "Current clockwise → field into page?', 'Perform the copper tube experiment (Diagnostic 6) physically or watch a video.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_003', difficulty: 'standard',
          question: 'Motional EMF is the electromotive force induced across the ends of a conductor.',
          hint: 'Revisit Lorentz force (c11_phy_cbse_04_008) and flux definition (c12_phy_cbse_06_001).',
          misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Motional EMF is the electromotive force induced across the ends of a conductor moving',
                  options: ['Motional EMF is the electromotive force induced across the ends of a conductor moving', 'Faraday\'s Law of Electromagnetic Induction states that the magnitude of the induced', 'Lenz\'s Law states that the direction of the induced electromotive force (emf) in a closed', 'Self-induction is the phenomenon where a changing current in a coil induces an opposing'],
                  hint: 'Revisit Lorentz force (c11_phy_cbse_04_008) and flux definition (c12_phy_cbse_06_001).',
                  misconception: '**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just Faraday\'s law." **Why.' }
          ],
            remediations: { 'misconception-motional-emf-and-induced': { steps: ['If the student conflates motional and transformer EMF: 1.', 'Revisit Class 11 node **c11_phy_cbse_04_008** (Lorentz force) and perform the "rod on rails" thought experiment: rod.', 'No changing \\( B \\) anywhere.', 'Contrast with Class 12 node **c12_phy_cbse_06_001** (Faraday\'s law) where a *stationary* loop experiences induced \\.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_004', difficulty: 'standard',
          question: 'Self-induction is the phenomenon where a changing current in a coil induces.',
          hint: 'If stuck on sign conventions or flux linkage, revisit c12_phy_cbse_06_001 (Faraday\'s Law).',
          misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of self-inductance and write its dimensional formula.', answer: 'SI unit: henry (H) = Wb/A = V·s/A',
                  options: ['SI unit: henry (H) = Wb/A = V·s/A', 'mutual inductance M depends on'],
                  hint: 'If stuck on sign conventions or flux linkage, revisit c12_phy_cbse_06_001 (Faraday\'s Law) for ε.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' },
                { id: 'b', prompt: 'Two concentric circular coils of radii r₁ = 2 cm and r₂ = 20 cm (r₁ ≪ r₂) are placed coaxially. The larger coil carries a current I₂ = 5.0 A.', answer: 'For r₁ ≪ r₂, field at center of large coil: B₂ = μ₀I₂/(2r₂)',
                  options: ['For r₁ ≪ r₂, field at center of large coil: B₂ = μ₀I₂/(2r₂)', 'mutual inductance M depends on'],
                  hint: 'If stuck on sign conventions or flux linkage, revisit c12_phy_cbse_06_001 (Faraday\'s Law) for ε.',
                  misconception: 'Students often think mutual inductance M depends on which coil carries the current (i.e., M₁₂ ≠ M₂₁) because the flux linkage calculations.' }
          ],
            remediations: { 'mutual-inductance-m-depends-on': { steps: ['Revisit c12_phy_cbse_06_001 (Faraday\'s Law) and c12_phy_cbse_06_002 (Lenz\'s Law) — practice determining emf direction.', 'Re-derive L = μ₀n²Al for solenoid from B = μ₀nI and Φ = BA, tracking n = N/l vs N.', 'Re-derive M = μ₀n₁n₂πr₁²l for coaxial solenoids, noting which radius (inner) appears.', 'Solve 5 problems each from NCERT Exercises 6.7 and 6.8 focusing on sign of ε and energy formula.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_005', difficulty: 'standard',
          question: 'An AC generator is a device that converts mechanical energy into alternating.',
          hint: 'If stuck, review the derivative of cosine (c11_math_cbse_13_006) and the flux-angle.',
          misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a.',
          parts: [
                { id: 'a', prompt: 'Explain why the emf induced in an AC generator is alternating (changes polarity periodically) even though the magnetic field and rotation direction are.', answer: 'The emf alternates',
                  options: ['The emf alternates', 'because the magnetic field changes'],
                  hint: 'If stuck, review the derivative of cosine (c11_math_cbse_13_006) and the flux-angle relationship.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' },
                { id: 'b', prompt: 'A student claims: "If we double the number of turns N and halve the area A of the coil, the maximum emf ε₀ remains unchanged." Analyze this statement and state.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'ε₀ doubles because N doubled'],
                  hint: 'If stuck, review the derivative of cosine (c11_math_cbse_13_006) and the flux-angle relationship.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' }
          ],
            remediations: { 'the-slip-rings-cause-the': { steps: ['Revisit Faraday\'s law (c12_phy_cbse_06_001) and magnetic flux definition (c12_phy_cbse_06_001).', 'Practice flux calculation: Φ = BA cosθ for a rotating coil; plot Φ vs t and dΦ/dt vs t on paper.', 'Use the interactive animation link from NCERT (Fig.', '6.13) to visualize coil orientation, flux, and emf simultaneously.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_006', difficulty: 'standard',
          question: 'The energy stored in an inductor is the magnetic potential energy accumulated.',
          hint: 'Revisit c12_phy_cbse_06_004 (Self-Induction) and c11_phy_cbse_05_002 (Work Done.',
          misconception: 'Students often think the energy stored in an inductor is \\( U = L I \\) (linear in I) because they confuse the back emf.',
          parts: [
                { id: 'a', prompt: 'A solenoid of self-inductance \\( 40 \\, \\text{mH} \\) carries a steady current of \\( 2.5 \\, \\text{A} \\). Calculate the magnetic energy stored.', answer: 'Given: \\( L = 40 \\times 10^{-3} \\, \\text{H} \\), \\( I = 2.5 \\, \\text{A} \\)',
                  options: ['Given: \\( L = 40 \\times 10^{-3} \\, \\text{H} \\), \\( I = 2.5 \\, \\text{A} \\)', '\\( U \\propto I \\)'],
                  hint: 'Revisit c12_phy_cbse_06_004 (Self-Induction) and c11_phy_cbse_05_002 (Work Done by Variable Force).',
                  misconception: 'Students often think the energy stored in an inductor is \\( U = L I \\) (linear in I) because they confuse the back emf magnitude \\(.' }
          ],
            remediations: { 'the-energy-stored-in-an': { steps: ['If the student writes \\( U = L I \\) or \\( U = \\frac{1}{2} L I \\), have them re-derive step by step: (1) Write back emf.', '(2) Power \\( P = I \\varepsilon = L I \\frac{dI}{dt} \\).', '(3) Energy \\( dU = P dt = L I dI \\).', '(4) Integrate \\( \\int_0^I L I\' dI\' = \\frac{1}{2} L I^2 \\).'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
