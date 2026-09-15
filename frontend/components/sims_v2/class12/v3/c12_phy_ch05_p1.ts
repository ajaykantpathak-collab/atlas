import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch05_p1: SimDef = {
    id: 'v3_c12_phy_ch05_p1',
    title: 'Magnetism and Matter · Part 1/2',
    subtitle: 'You can\'t cut a magnet down to one pole',
    classLevel: 12, subject: 'physics', topic: 'Magnetism and Matter · Part 1/2',
    chapters: ['c12_phy_ch05'],
    nodeIds: ['c12_phy_cbse_05_001', 'c12_phy_cbse_05_002', 'c12_phy_cbse_05_003', 'c12_phy_cbse_05_004', 'c12_phy_cbse_05_005', 'c12_phy_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Magnetic-field mapper', intro: 'Iron filings draw the pattern; the physics says the lines never start or stop — they loop through the magnet itself.', goal: 'Read bar-magnet field lines and dipole behaviour — closed loops, torque and potential energy.' },
    discovery: {
        question: 'Cut a bar magnet in half to isolate its north pole — and you get two complete dipoles instead. What does that refusal tell you?',
        options: ['Magnetic field lines are closed loops — they continue S→N inside the magnet, so no isolated pole can ever exist', 'The cut was uneven', 'Poles hide inside', 'Iron is stubborn'],
        answer: 'Magnetic field lines are closed loops — they continue S→N inside the magnet, so no isolated pole can ever exist',
        hook: 'Field lines aren\'t lines of force — the magnetic force is qv×B, perpendicular to the line. And two lines crossing would mean B has two directions at one point: impossible. Crowding shows strength; tangents show direction.',
    },
    teaching: [
        { title: 'Bar Magnet: Properties and Magnetic Field Lines', text: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or alnico) that exhibits permanent magnetic properties with two distinct poles — a north pole and a south pole.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_05_001', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
        context: 'Map a magnet honestly: sketch the closed loops inside and out, place a dipole in a field and compute both torque (mB sinθ) and energy (−mB cosθ) without swapping them.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_001', title: 'Bar Magnet: Properties and Magnetic Field Lines',
          scaffold: { problem: 'A bar magnet of magnetic moment 0.40 A·m² is placed in a uniform magnetic field of 0.25 T.',
            steps: [
            { text: 'Identify given: m = 0.40 A·m², B = 0.25 T, θ_i = 0°, θ_f = 60°. Zero of U at θ = 90°.' },
            { text: 'Work done by external torque = change in potential energy = U_f – U_i. U = –mB cosθ.' },
            { text: 'U_i = –(0.40)(0.25) cos 0° = –0.10 J. U_f = –(0.40)(0.25) cos 60° = –0.10 × 0.5 = –0.050 J.' },
            { text: 'Work done = U_f – U_i = (–0.050) – (–0.10) = +0.050 J. (Positive work needed to rotate away from stable equilibrium.)' },
            { text: 'Torque at θ = 60°: τ = mB sinθ = (0.40)(0.25) sin 60° = 0.10 × (√3/2) = 0.0866 N·m.' },
            { text: 'Potential energy at θ = 60°: U = –0.050 J (already computed). Units check: A·m² × T = A·m² × N/(A·m) = N·m = J. Correct.', faded: true, blankAnswer: '(a) 0.050 J, (b) 0.0866 N·m (restoring), (c) –0.050 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_002', title: 'Magnetic Dipole Moment: Definition',
          scaffold: { problem: 'A circular coil of 100 turns and radius 5 cm carries a current of 2 A.',
            steps: [
            { text: 'Identify given quantities: 𝑁 = 100, 𝑟 = 5 cm = 0.05 m, 𝐼 = 2 A, 𝐵 = 0.5 T, angle between plane and field = 30°.' },
            { text: 'Compute area 𝐴 = 𝜋𝑟² = 3.14 × (0.05)² = 3.14 × 0.0025 = 0.00785 m².' },
            { text: 'Torque magnitude 𝜏 = 𝑚𝐵 sin𝜃 = 1.57 × 0.5 × sin60° = 0.785 × (√3/2) ≈ 0.785 × 0.866 = 0.680 N·m.' },
            { text: 'Potential energy 𝑈 = −𝑚𝐵 cos𝜃 = −1.57 × 0.5 × cos60° = −0.785 × 0.5 = −0.3925 J.' },
            { text: 'Verify units: 𝑚 in A·m², 𝐵 in T = N/(A·m), so 𝑚𝐵 in N·m = J.', faded: true, blankAnswer: '(a) 1.57 A·m² (b) 0.680 N·m (c) −0.393 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_003', title: 'Magnetic Field Due to a Bar Magnet',
          scaffold: { problem: 'A short bar magnet of magnetic moment \\(0.50 \\, \\text{A·m}^2\\) is placed with its axis along the magnetic north-south direction.',
            steps: [
            { text: 'Identify given quantities: \\(m = 0.50 \\, \\text{A·m}^2\\), \\(r = 0.15 \\, \\text{m}\\).' },
            { text: 'Write formulas: \\(B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2m}{r^3}\\), \\(B_{\\text{eq}} = \\frac{\\mu_0}{4\\pi}.' },
            { text: 'Substitute values: \\(r^3 = (0.15)^3 = 0.003375 \\, \\text{m}^3\\).' },
            { text: 'Compute: \\(B_{\\text{axial}} = 10^{-7} \\times \\frac{2 \\times 0.50}{0.003375} = 10^{-7} \\times \\frac{1.0}{0.003375}.' },
            { text: 'Direction: Axial field is along \\(\\vec{m}\\) (towards magnetic north if \\(\\vec{m}\\) points north).', faded: true, blankAnswer: '(a) \\(2.96 \\times 10^{-5} \\, \\text{T}\\) along magnetic.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_05_004', title: 'Earth\'s Magnetism: Elements of Earth\'s Magnetic Field',
          caseStudy: { intro: 'Observe a magnetic compass on your study table — the needle points roughly north-south but not exactly toward the geographic North Pole shown on maps.',
            decisions: [{ prompt: 'A magnetic needle free to rotate in a vertical plane aligns itself at an angle of 60° with the horizontal.', options: [
                { text: 'Angle of dip δ = 60° (by definition, dip is the angle with horizontal in magnetic', outcome: 'Angle of dip δ = 60° (by definition, dip is the angle with horizontal in magnetic meridian).' },
                { text: 'angle with north', outcome: 'Not quite — Students often believe **magnetic declination and angle of dip are the same angle** — both.', reveals: 'magnetic-declination-and-angle-of' },
                { text: 'angle of Earth\'s field', outcome: 'Not quite — Students often believe **magnetic declination and angle of dip are the same angle** — both.', reveals: 'magnetic-declination-and-angle-of' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_005', title: 'Magnetic Properties of Materials: Dia, Para, Ferro',
          scaffold: { problem: 'A long solenoid has 1500 turns per metre and carries a current of 1.5 A.',
            steps: [
            { text: 'Identify given quantities: n = 1500 turns/m, I = 1.5 A, χ₁ = 2.5×10⁻³ at T₁ = 300 K. T₂ = 600 K. Need H, M₁, B₁, μᵣ, M₂.' },
            { text: 'H = nI (independent of core material) = 1500 × 1.5 = 2250 A/m. M₁ = χ₁H = 2.5×10⁻³ × 2250 = 5.625 A/m.' },
            { text: 'B₁ = μ₀(H + M₁) = 4π×10⁻⁷ × (2250 + 5.625) = 2.827×10⁻³ T ≈ 2.83 mT. μᵣ = 1 + χ₁ = 1.0025.' },
            { text: 'For paramagnet, Curie\'s law: χ ∝ 1/T. χ₂ = χ₁ × (T₁/T₂) = 2.5×10⁻³ × (300/600) = 1.25×10⁻³.' },
            { text: 'Verify: M₂ = M₁/2 = 2.8125 A/m (since T doubled). B₂ = μ₀(H+M₂) ≈ 2.827×10⁻³ T (barely changes because M ≪ H).', faded: true, blankAnswer: '(a) H = 2250 A/m; (b) M₁ = 5.625 A/m; (c) B₁ = 2.83 mT; (d).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_05_006', title: 'Permanent Magnets and Electromagnets',
          scaffold: { problem: 'An electromagnet for a school project uses a soft iron core (μᵣ = 4000) inside a solenoid of length 20 cm with 500 turns.',
            steps: [
            { text: 'Given: L = 0.20 m, N = 500, I = 1.5 A, μᵣ = 4000, μ₀ = 4π × 10⁻⁷ T·m/A. Find H, B, M, and B_air.' },
            { text: 'n = N/L = 500 / 0.20 = 2500 turns/m. H = nI = 2500 × 1.5 = 3750 A/m.' },
            { text: 'B = μ₀μᵣH = (4π × 10⁻⁷) × 4000 × 3750 = 4π × 10⁻⁷ × 1.5 × 10⁷ = 60π ≈ 188.5 T.' },
            { text: 'M = (B/μ₀) - H = (0.628 / (4π × 10⁻⁷)) - 250 = 5.0 × 10⁵ - 250 ≈ 4.9975 × 10⁵ A/m.' },
            { text: 'B_air = μ₀H = (4π × 10⁻⁷) × 250 = 3.14 × 10⁻⁴ T. The core enhances B by factor μᵣ = 2000.', faded: true, blankAnswer: '(a) H = 250 A/m, (b) B ≈ 0.63 T (with core, assuming linear.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Calibrating a magnetometer, a junior notes the needle settles aligned with the field, then tries to \'park it backwards — anti-aligned is also an equilibrium, so it should hold.\'',
            decisions: [{ prompt: 'What does U = −m·B predict?', options: [
                { text: 'Anti-aligned is the unstable equilibrium — U is maximum at θ = 180°, so the tiniest nudge produces a torque that swings it further off; only the aligned position (minimum U) restores after disturbance.', outcome: 'The chapter\'s map: same alignment axis, opposite stability — balanced and balanced-against are both equilibria, but only one survives contact with reality.' },
                { text: 'He\'s right — torque is zero at both 0° and 180°, so both hold.', outcome: 'Zero torque names equilibrium, not stability — the energy curve separates them: minimum at 0° restores, maximum at 180° amplifies any nudge into a swing.', reveals: 'zero-torque-equals-stable' },
                { text: 'Neither holds — a needle in a field always keeps oscillating.', outcome: 'Compasses do settle — at the potential minimum; oscillation is what happens on the way there, not the endpoint the physics predicts.', reveals: 'equilibrium-never-settles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read field lines as a vector field\'s portrait — loops that never end, density that means strength.',
            decisions: [{ prompt: 'What comes next? Magnetism and Matter · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Magnetism and Matter · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_001', difficulty: 'standard',
          question: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron.',
          hint: 'If stuck on vector products, revisit c11_phy_cbse_03_007 and c11_phy_cbse_03_008;.',
          misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or',
                  options: ['A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'Magnetic dipole moment (𝐦) is a vector quantity that characterizes the magnetic strength', 'The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg', 'Earth\'s magnetic field at any location is completely described by three independent'],
                  hint: 'If stuck on vector products, revisit c11_phy_cbse_03_007 and c11_phy_cbse_03_008; if stuck on field.',
                  misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a magnetic pole.".' }
          ],
            remediations: { 'misconception-magnetic-field-lines-are': { steps: ['If the student holds the "lines of force" misconception: 1.', '**Revisit Class 10 node c10_phy_cbse_02_001** — review the definition of magnetic field lines as "visual representation.', '**Do a quick demo:** Use a cathode ray tube (or simulation) — electrons move in a circle perpendicular to B.', 'Ask: "Is the force along the field line?" No, it\'s radial.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using only a bar magnet, a small compass needle, a sheet of paper, and a pencil to plot the magnetic field lines of the bar magnet.', answer: '**Procedure:** 1',
                  options: ['**Procedure:** 1', 'sprinkle iron filings', 'compass points to geographic north'],
                  hint: 'If stuck on vector products, revisit c11_phy_cbse_03_007 and c11_phy_cbse_03_008; if stuck on field.',
                  misconception: '**Misconception:** "Magnetic field lines are lines of force — they show the direction of force on a moving charge or a magnetic pole.".' }
          ],
            remediations: { 'misconception-magnetic-field-lines-are': { steps: ['If the student holds the "lines of force" misconception: 1.', '**Revisit Class 10 node c10_phy_cbse_02_001** — review the definition of magnetic field lines as "visual representation.', '**Do a quick demo:** Use a cathode ray tube (or simulation) — electrons move in a circle perpendicular to B.', 'Ask: "Is the force along the field line?" No, it\'s radial.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_002', difficulty: 'standard',
          question: 'Magnetic dipole moment (𝐦) is a vector quantity that characterizes the.',
          hint: 'If stuck on torque/energy calculations, review c11_phy_cbse_03_007 and.',
          misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of magnetic dipole moment and write its dimensional formula.', answer: 'SI unit: A·m² (ampere meter squared) or J/T (joule per tesla)',
                  options: ['SI unit: A·m² (ampere meter squared) or J/T (joule per tesla)', 'magnetic moment is a scalar'],
                  hint: 'If stuck on torque/energy calculations, review c11_phy_cbse_03_007 and c11_phy_cbse_03_008 with.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' },
                { id: 'b', prompt: 'A bar magnet of magnetic moment 0.5 A·m² is placed in a uniform magnetic field of 0.2 T. The magnet’s axis makes an angle of 30° with the field.', answer: '𝜏 = 𝑚𝐵 sin𝜃 = (0.5)(0.2) sin30° = 0.1 × 0.5 = 0.05 N·m',
                  options: ['𝜏 = 𝑚𝐵 sin𝜃 = (0.5)(0.2) sin30° = 0.1 × 0.5 = 0.05 N·m', 'magnetic moment is a scalar'],
                  hint: 'If stuck on torque/energy calculations, review c11_phy_cbse_03_007 and c11_phy_cbse_03_008 with.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' },
                { id: 'c', prompt: 'A closely wound solenoid of 500 turns, cross-sectional area 2.0 × 10⁻⁴ m², carries a current of 1.5 A. Calculate its magnetic moment.', answer: 'Step 1: 𝑚 = 𝑁𝐼𝐴 = 500 × 1.5 × 2.0×10⁻⁴ = 0.15 A·m²',
                  options: ['Step 1: 𝑚 = 𝑁𝐼𝐴 = 500 × 1.5 × 2.0×10⁻⁴ = 0.15 A·m²', 'magnetic moment is a scalar'],
                  hint: 'If stuck on torque/energy calculations, review c11_phy_cbse_03_007 and c11_phy_cbse_03_008 with.',
                  misconception: 'Students often think magnetic moment is a scalar because its magnitude 𝑚 = 𝐼𝐴 looks like a scalar product.' }
          ],
            remediations: { 'magnetic-moment-is-a-scalar': { steps: ['Revisit c11_phy_cbse_03_008 (cross product) and c11_phy_cbse_03_007 (dot product) — practice computing 𝐀 × 𝐁 and.', 'Use a physical compass and a circular loop of wire with a battery; observe deflection direction vs current direction.', 'Re-derive 𝜏 = 𝐦 × 𝐁 from force on current element 𝑑𝐅 = 𝐼 𝑑𝐥 × 𝐁 for a rectangular loop (NCERT Class 12 Section.', 'Re-attempt Diagnostic Questions 2 and 4 after 24 hours.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_003', difficulty: 'standard',
          question: 'The magnetic field due to a bar magnet at a point far from its centre (distance.',
          hint: 'If stuck, review the magnetic dipole moment definition (c12_phy_cbse_05_002) and the.',
          misconception: 'Students often treat the bar magnet’s field as exactly like a point charge’s Coulomb field (\\(1/r^2\\)) because they see.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg',
                  options: ['The magnetic field due to a bar magnet at a point far from its centre (distance \\(r \\gg', 'A bar magnet is a rectangular piece of ferromagnetic material (such as iron, steel, or', 'Magnetic dipole moment (𝐦) is a vector quantity that characterizes the magnetic strength', 'Earth\'s magnetic field at any location is completely described by three independent'],
                  hint: 'If stuck, review the magnetic dipole moment definition (c12_phy_cbse_05_002) and the solenoid-bar.',
                  misconception: 'Students often treat the bar magnet’s field as exactly like a point charge’s Coulomb field (\\(1/r^2\\)) because they see “poles”.' }
          ],
            remediations: { 'students-often-treat-the-bar': { steps: ['Revisit c12_phy_cbse_05_002 (Magnetic Dipole Moment) to reinforce that a bar magnet is a dipole, not two monopoles.', 'Re-read the solenoid equivalence in c12_phy_cbse_05_001 (Bar Magnet: Properties and Magnetic Field Lines) and the.', 'Practice drawing field lines for a bar magnet and a solenoid side-by-side; note the continuous loops.', 'Solve Exercise 5.7 step-by-step, explicitly converting cm to m and tracking the factor of 2.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_004', difficulty: 'standard',
          question: 'Earth\'s magnetic field at any location is completely described by three.',
          hint: 'Revisit Class 11 vector resolution (c11_phy_cbse_03_004) and Class 10 heights/distances.',
          misconception: 'Students often believe **magnetic declination and angle of dip are the same angle** — both described as "angle with.',
          parts: [
                { id: 'a', prompt: 'At a certain place, the horizontal component of Earth\'s magnetic field is √3 times the vertical component. What is the angle of dip?', answer: 'Given H_E = √3 V_E',
                  options: ['Given H_E = √3 V_E', 'angle with north', 'angle of Earth\'s field'],
                  hint: 'Revisit Class 11 vector resolution (c11_phy_cbse_03_004) and Class 10 heights/distances.',
                  misconception: 'Students often believe **magnetic declination and angle of dip are the same angle** — both described as "angle with north" or "angle.' }
          ],
            remediations: { 'magnetic-declination-and-angle-of': { steps: ['If student confuses D and δ: (1) Draw two diagrams: top view (horizontal plane) showing geographic N, magnetic N, and.', '(2) Use a physical compass: rotate it horizontally — the needle tracks magnetic meridian (declination); then tilt.', '(3) Revisit Class 11 vector resolution: H_E = B_E cos δ, V_E = B_E sin δ.', '(4) Practice: Given B_E = 0.5 G, δ = 30°, find H_E, V_E.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_005', difficulty: 'standard',
          question: 'Magnetic susceptibility (χ) is a dimensionless measure of how much a material.',
          hint: 'Revisit c10_phy_cbse_02_004 (solenoid field) and c12_phy_cbse_05_002 (magnetic dipole.',
          misconception: 'Students often think "diamagnetic materials are non-magnetic" or "have zero magnetic response." In reality.',
          parts: [
                { id: 'a', prompt: 'A student measures the magnetisation M of a material placed in a uniform magnetic intensity H = 500 A/m and finds M = -0.005 A/m.', answer: 'χ = M/H = -0.005/500 = -1×10⁻⁵',
                  options: ['χ = M/H = -0.005/500 = -1×10⁻⁵', 'diamagnetic materials are non-magnetic', 'have zero magnetic response', '"diamagnetic materials are non-magnetic" or "have zero magnetic response'],
                  hint: 'Revisit c10_phy_cbse_02_004 (solenoid field) and c12_phy_cbse_05_002 (magnetic dipole moment.',
                  misconception: 'Students often think "diamagnetic materials are non-magnetic" or "have zero magnetic response." In reality, diamagnetism is universal — ALL.' },
                { id: 'b', prompt: 'A solenoid of 1000 turns/m carries a current of 2 A. Its core is a material with relative permeability μᵣ = 400.', answer: 'H, (',
                  options: ['H, (', 'diamagnetic materials are non-magnetic', 'have zero magnetic response', '"diamagnetic materials are non-magnetic" or "have zero magnetic response'],
                  hint: 'Revisit c10_phy_cbse_02_004 (solenoid field) and c12_phy_cbse_05_002 (magnetic dipole moment.',
                  misconception: 'Students often think "diamagnetic materials are non-magnetic" or "have zero magnetic response." In reality, diamagnetism is universal — ALL.' },
                { id: 'c', prompt: 'A paramagnetic salt follows Curie\'s law: χ = C/T. At T = 300 K, its susceptibility is 2×10⁻³. The salt is placed in a solenoid with H = 10⁴ A/m.', answer: 'M = χH = (C/T)H',
                  options: ['M = χH = (C/T)H', 'diamagnetic materials are non-magnetic', 'have zero magnetic response', '"diamagnetic materials are non-magnetic" or "have zero magnetic response'],
                  hint: 'Revisit c10_phy_cbse_02_004 (solenoid field) and c12_phy_cbse_05_002 (magnetic dipole moment.',
                  misconception: 'Students often think "diamagnetic materials are non-magnetic" or "have zero magnetic response." In reality, diamagnetism is universal — ALL.' }
          ],
            remediations: { 'diamagnetic-materials-are-non-magnetic': { steps: ['If the student confuses H and B in M = χH: (1) Revisit c12_phy_cbse_05_005\'s derivation of B = μ₀(H+M) and H =.', '(2) Do a dimensional check: H has units A/m, B has units T = N/(A·m).', 'χ is dimensionless, so M = χH gives A/m correctly; M = χB/μ₀ gives (T)/(T·m/A) = A/m — both work dimensionally!', 'The physical reason H is correct: H is the field due to free currents only (the "cause"), while B includes the.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_05_006', difficulty: 'standard',
          question: 'A permanent magnet is a ferromagnetic material that retains its magnetisation.',
          hint: 'If stuck, review the hysteresis loop diagram in NCERT Fig. 5.8 and the definitions.',
          misconception: 'Students often believe that "high permeability" alone makes a material good for both permanent magnets and.',
          parts: [
                { id: 'a', prompt: 'Why is soft iron preferred over steel for the core of an electromagnet used in an electric bell? Explain in terms of hysteresis loop shape and energy loss.', answer: 'Soft iron has a narrow hysteresis loop (low coercivity, low retentivity), so it',
                  options: ['Soft iron has a narrow hysteresis loop (low coercivity, low retentivity), so it', 'high permeability'],
                  hint: 'If stuck, review the hysteresis loop diagram in NCERT Fig. 5.8 and the definitions in Section 5.5.3.',
                  misconception: 'Students often believe that "high permeability" alone makes a material good for both permanent magnets and electromagnets.' },
                { id: 'b', prompt: 'A solenoid of length 0.5 m has 1000 turns and carries a current of 2 A. Its core is made of soft iron with relative permeability μᵣ = 5000.', answer: 'Step 1: n = N/L = 1000 / 0.5 = 2000 turns/m',
                  options: ['Step 1: n = N/L = 1000 / 0.5 = 2000 turns/m', 'high permeability'],
                  hint: 'If stuck, review the hysteresis loop diagram in NCERT Fig. 5.8 and the definitions in Section 5.5.3.',
                  misconception: 'Students often believe that "high permeability" alone makes a material good for both permanent magnets and electromagnets.' }
          ],
            remediations: { 'high-permeability-alone-makes-a': { steps: ['Revisit node c12_phy_cbse_05_005 (Magnetic Properties of Materials) to review the definitions of retentivity.', 'Draw two hysteresis loops side by side: label one "Permanent Magnet Material" (wide, tall) and one "Electromagnet Core".', 'Annotate Bᵣ (retentivity) and H꜀ (coercivity) on each.', 'Perform the diagnostic experiment (Question 6) physically or mentally to reinforce the ON/OFF behaviour.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
