import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch01_p2: SimDef = {
    id: 'v3_c12_phy_ch01_p2',
    title: 'Electric Charges and Fields · Part 2/2',
    subtitle: 'Two charges were born — and zero charge was created',
    classLevel: 12, subject: 'physics', topic: 'Electric Charges and Fields · Part 2/2',
    chapters: ['c12_phy_ch01'],
    nodeIds: ['c12_phy_cbse_01_007', 'c12_phy_cbse_01_008', 'c12_phy_cbse_01_009', 'c12_phy_cbse_01_010', 'c12_phy_cbse_01_011', 'c12_phy_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Charge accountant', intro: 'Sparks from a winter sweater are a trillion-electron migration — and the ledger still balances to the last e.', goal: 'Apply additivity, conservation and quantization of charge to real transfers and decays.' },
    discovery: {
        question: 'You rub a balloon on your hair and it sticks to a wall. What actually happened?',
        options: ['Electrons moved from your hair to the balloon', 'The balloon became magnetic', 'Air pressure held it against the wall', 'Glue molecules formed on the balloon\'s surface'],
        answer: 'Electrons moved from your hair to the balloon',
        hook: 'Most students think rubbing \'creates\' charge — it only moves it. Watch what the charges actually do.',
    },
    teaching: [
        { title: 'Electric Flux: Definition and Formula', text: 'Electric flux is a scalar measure of the number of electric field lines penetrating a given surface.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_01_007', title: 'Your mission',
          mission: { widget: 'efield', validate: 'efield:q1=80,q2=20',
            instruction: 'On the lab: make charge A positive and B negative — do the field lines connect?.',
        context: 'Make charge A positive and B negative — do the field lines reach across?',
            observePrompt: 'What did the efield interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_007', title: 'Electric Flux: Definition and Formula',
          scaffold: { problem: 'A uniform electric field \\(\\mathbf{E} = 400\\,\\text{N/C}\\) is directed at \\(30^\\circ\\) to the horizontal.',
            steps: [
            { text: 'Identify given quantities: \\(E = 400\\,\\text{N/C}\\), area \\(A = 0.20 \\times 0.30 = 0.060\\,\\text{m}^2\\), \\(\\theta.' },
            { text: 'Formula: \\(\\phi = EA\\cos\\theta\\).' },
            { text: 'Substitute: \\(\\phi = 400 \\times 0.060 \\times \\cos30^\\circ\\).' },
            { text: 'Compute: \\(\\cos30^\\circ = \\sqrt{3}/2 \\approx 0.866\\); \\(\\phi = 24 \\times 0.866 = 20.784\\).' },
            { text: 'Verify: Maximum possible flux is \\(EA = 24\\); at \\(30^\\circ\\) we expect a positive value less than 24.', faded: true, blankAnswer: '\\(20.8\\,\\text{N·m}^2/\\text{C}\\) (or \\(20.8\\,\\text{V·m}\\))' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_008', title: 'Gauss\'s Law: Statement and Proof',
          scaffold: { problem: 'A point charge of 5.0 μC is placed at the center of a spherical Gaussian surface of radius 15 cm.',
            steps: [
            { text: 'Identify given: q = 5.0 μC = 5.0 × 10⁻⁶ C, r = 15 cm = 0.15 m (not needed for flux). Target: Φ_total.' },
            { text: 'Apply Gauss\'s Law: Φ = q_enclosed / ε₀. Note: q_enclosed = 5.0 × 10⁻⁶ C regardless of position inside.' },
            { text: 'Substitute: Φ = (5.0 × 10⁻⁶ C) / (8.85 × 10⁻¹² C²/N·m²).' },
            { text: 'Compute: Φ = 5.65 × 10⁵ N·m²/C. (Unit check: C / (C²/N·m²) = N·m²/C ✓)' },
            { text: 'When charge moves off-center, q_enclosed unchanged → Φ unchanged = 5.65 × 10⁵ N·m²/C.', faded: true, blankAnswer: 'Φ = 5.65 × 10⁵ N·m²/C in both cases.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_009', title: 'Application of Gauss\'s Law: Infinite Wire',
          scaffold: { problem: 'An infinitely long straight wire has a uniform linear charge density of 5.0 × 10⁻⁶ C/m.',
            steps: [
            { text: 'Identify given quantities: λ = 5.0 × 10⁻⁶ C/m, r = 0.10 m, ε₀ = 8.85 × 10⁻¹² C²/N·m². Find E.' },
            { text: 'Write the formula for infinite wire: E = λ/(2πε₀r). Check units: λ/(ε₀r) → (C/m) / (C²/N·m² × m) = N/C. Correct.' },
            { text: 'Substitute values: E = (5.0 × 10⁻⁶) / (2π × 8.85 × 10⁻¹² × 0.10)' },
            { text: 'Compute denominator: 2π × 8.85 × 10⁻¹² × 0.10 = 5.56 × 10⁻¹². Then E = 5.0 × 10⁻⁶ / 5.56 × 10⁻¹² = 8.99 × 10⁵ N/C.' },
            { text: 'Direction is radially outward (λ > 0). Answer is physically reasonable (field ~10⁶ N/C at 10 cm for μC/m charge.', faded: true, blankAnswer: 'E = 9.0 × 10⁵ N/C radially outward.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_010', title: 'Application of Gauss\'s Law: Infinite Plane Sheet',
          scaffold: { problem: 'A large non-conducting plastic sheet of dimensions 2 m × 2 m is uniformly charged with a total charge of 8.0 μC.',
            steps: [
            { text: 'Identify given quantities. Total charge Q = 8.0 μC = 8.0 × 10⁻⁶ C. Sheet area A = 2 m × 2 m = 4 m².' },
            { text: 'Compute surface charge density σ = Q/A = (8.0 × 10⁻⁶ C) / (4 m²) = 2.0 × 10⁻⁶ C/m².' },
            { text: 'Apply infinite sheet formula E = σ/(2ε₀) = (2.0 × 10⁻⁶) / (2 × 8.85 × 10⁻¹²) = 1.13 × 10⁵ N/C.' },
            { text: 'Force on electron F = eE = (1.6 × 10⁻¹⁹)(1.13 × 10⁵) = 1.81 × 10⁻¹⁴ N.' },
            { text: 'Acceleration a = F/m_e = (1.81 × 10⁻¹⁴) / (9.11 × 10⁻³¹) = 1.99 × 10¹⁶ m/s² toward the sheet.' },
            { text: 'Verify reasonableness: Field is uniform, so distance 5 cm does not appear in answer.', faded: true, blankAnswer: 'E = 1.13 × 10⁵ N/C away from sheet; electron acceleration.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_011', title: 'Electric Dipole: Field and Torque',
          scaffold: { problem: 'A water molecule (H₂O) has a permanent dipole moment of 6.2×10⁻³⁰ C·m.',
            steps: [
            { text: 'Identify given: p = 6.2×10⁻³⁰ C·m, E = 1.0×10⁴ N/C, I = 1.9×10⁻⁴⁷ kg·m². Maximum torque occurs at θ = 90°.' },
            { text: 'Use τ_max = pE sin90° = pE. Substitute: τ_max = (6.2×10⁻³⁰)(1.0×10⁴) = 6.2×10⁻²⁶ N·m.' },
            { text: 'Relate torque to angular acceleration: τ = Iα → α_max = τ_max / I.' },
            { text: 'Compute α_max = (6.2×10⁻²⁶) / (1.9×10⁻⁴⁷) = 3.26×10²¹ rad/s².' },
            { text: 'Check units: N·m / (kg·m²) = (kg·m/s²)·m / (kg·m²) = 1/s² = rad/s².', faded: true, blankAnswer: 'τ_max = 6.2×10⁻²⁶ N·m; α_max = 3.3×10²¹ rad/s² (approx).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_01_012', title: 'Continuous Charge Distribution: Line, Surface, Volume',
          scaffold: { problem: 'A thin glass rod of length 30 cm is rubbed with silk and acquires a uniform positive charge of 12 μC.',
            steps: [
            { text: 'Identify given quantities: L = 0.30 m, Q = 12 × 10⁻⁶ C, y = 0.10 m. Find λ = Q/L = (12 × 10⁻⁶)/(0.30) = 4.0 × 10⁻⁵ C/m.' },
            { text: 'Set up the integral. Place rod along x-axis from -L/2 to +L/2. Element at position x has charge dq = λ dx.' },
            { text: 'Integrate from x = -L/2 to +L/2. E_y = (λ y / 4πε₀) ∫_{-L/2}^{L/2} dx/(x² + y²)^(3/2).' },
            { text: 'Evaluate: E_y = (λ y / 4πε₀) [ x/(y²√(x² + y²)) ]_{-L/2}^{L/2} = (λ / 4πε₀ y) [ (L/2)/√((L/2)² + y²) - (-L/2)/√((L/2)².' },
            { text: 'Substitute values: L/2 = 0.15 m, y = 0.10 m. √(0.15² + 0.10²) = √(0.0225 + 0.01) = √0.0325 = 0.1803 m.', faded: true, blankAnswer: '6.0 × 10⁶ N/C directed perpendicularly away from the rod.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In the lab, a partner computes the force between +3 μC and −2 μC charges 10 cm apart as 5.4×10⁹ N — \'bigger than a rocket engine, something\'s off.\' He plugged 3, 2 and 10 straight into the formula.',
            decisions: [{ prompt: 'Where did the calculation derail?', options: [
                { text: 'At the units — μC must become coulombs (×10⁻⁶) and cm must become metres, then the separation gets squared; done in SI, the answer is a few newtons, attractive — not a nine-digit force.', outcome: 'The chapter\'s discipline: k ≈ 9×10⁹ only balances when the inputs are SI — μC and cm inflate the result by twelve orders before physics even gets a say.' },
                { text: 'At the formula — he forgot that opposite charges need a minus force, so use negative F.', outcome: 'The sign already lives in the product q₁q₂ — the formula reports attraction via the direction; the numeric blow-up came from unconverted units, not a missing minus.', reveals: 'sign-fixes-magnitude' },
                { text: 'At the distance — he should have used r, not r², since force weakens with separation.', outcome: 'The weakening is the r²: using plain r would overstate the force further — the inverse square is the law, not an error to relax.', reveals: 'r-not-r-squared' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Charge is never created or destroyed — only moved. You now know why the balloon sticks, why lightning strikes, and what Coulomb\'s law is really measuring.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'efield', prompt: 'Explore the efield interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'efield', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_007', difficulty: 'standard',
          question: 'Electric flux is a scalar measure of the number of electric field lines.',
          hint: 'If stuck, revisit the scalar product of vectors (c11_math_cbse_10_007) and the concept.',
          misconception: 'Students frequently treat electric flux as a vector because the definition involves the area vector.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electric flux is a scalar measure of the number of electric field lines penetrating a',
                  options: ['Electric flux is a scalar measure of the number of electric field lines penetrating a', 'Electric charge is a fundamental intrinsic property of matter that causes it to', 'Coulomb\'s Law states that the electrostatic force between two stationary point charges is', 'The superposition principle for electric forces states that the net electrostatic force'],
                  hint: 'If stuck, revisit the scalar product of vectors (c11_math_cbse_10_007) and the concept of electric.',
                  misconception: 'Students frequently treat electric flux as a vector because the definition involves the area vector.' }
          ],
            remediations: { 'students-frequently-treat-electric-flux': { steps: ['If a student thinks flux is a vector, revisit the dot product (c11_math_cbse_10_007 or c11_phy_cbse_03_007) and.', 'If they use the wrong angle, draw a diagram showing the area vector perpendicular to the surface and the field vector.', 'Practice calculating flux for a square loop at \\(\\theta = 0^\\circ, 60^\\circ, 90^\\circ, 180^\\circ\\) to reinforce.', 'If they assume closed-surface flux is always zero, remind them of Gauss\'s law preview: \\(\\phi_{\\text{net}}.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_008', difficulty: 'standard',
          question: 'Gauss\'s Law states that the total electric flux through any closed surface.',
          hint: 'If stuck on flux integral, revisit c12_phy_cbse_01_007 (Electric Flux) for Φ.',
          misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian.',
          parts: [
                { id: 'a', prompt: 'A point charge +q is placed at the center of a cube of side a.', answer: 'Yes, the reasoning is correct **only',
                  options: ['Yes, the reasoning is correct **only', 'always q/(6ε₀) for any charge position'],
                  hint: 'If stuck on flux integral, revisit c12_phy_cbse_01_007 (Electric Flux) for Φ = **E**·**S** and.',
                  misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian surface." They write.' }
          ],
            remediations: { 'the-electric-field-e-in': { steps: ['If the student holds this misconception: (1) Revisit node c12_phy_cbse_01_007 (Electric Flux) — verify that flux = ∮.', '(2) Do the "cylinder in uniform field" example from NCERT Fig 1.23: uniform **E** (from distant charges) gives zero net.', '(3) Solve NCERT Example 1.11: uniform field for x>0, opposite for x<0, cylinder centered at origin — net flux = 3.14.', 'The field is from external sources (plates at infinity), yet flux ≠ 0 because net enclosed charge ≠ 0.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a gold-leaf electroscope and a hollow metal sphere to demonstrate that the electric flux through a closed surface depends only.', answer: 'Procedure: (1) Charge a hollow metal sphere +Q using a known source',
                  options: ['Procedure: (1) Charge a hollow metal sphere +Q using a known source', 'measure field at different distances'],
                  hint: 'If stuck on flux integral, revisit c12_phy_cbse_01_007 (Electric Flux) for Φ = **E**·**S** and.',
                  misconception: 'Students believe: "The electric field **E** in Gauss\'s Law integral is produced ONLY by charges inside the Gaussian surface." They write.' }
          ],
            remediations: { 'the-electric-field-e-in': { steps: ['If the student holds this misconception: (1) Revisit node c12_phy_cbse_01_007 (Electric Flux) — verify that flux = ∮.', '(2) Do the "cylinder in uniform field" example from NCERT Fig 1.23: uniform **E** (from distant charges) gives zero net.', '(3) Solve NCERT Example 1.11: uniform field for x>0, opposite for x<0, cylinder centered at origin — net flux = 3.14.', 'The field is from external sources (plates at infinity), yet flux ≠ 0 because net enclosed charge ≠ 0.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_009', difficulty: 'standard',
          question: 'The electric field due to an infinitely long straight wire with uniform linear.',
          hint: 'Revisit Gauss\'s law (c12_phy_cbse_01_008) and electric flux (c12_phy_cbse_01_007) with.',
          misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the.',
          parts: [
                { id: 'a', prompt: 'An infinitely long straight wire carries a uniform linear charge density of 8.0 × 10⁻⁶ C/m. Calculate the electric field at a point 5.0 cm from the wire.', answer: 'Given: λ = 8.0 × 10⁻⁶ C/m, r = 0.050 m, ε₀ = 8.85 × 10⁻¹² C²/N·m²',
                  options: ['Given: λ = 8.0 × 10⁻⁶ C/m, r = 0.050 m, ε₀ = 8.85 × 10⁻¹² C²/N·m²', 'the wire is infinite in both directions'],
                  hint: 'Revisit Gauss\'s law (c12_phy_cbse_01_008) and electric flux (c12_phy_cbse_01_007) with focus.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite.' },
                { id: 'b', prompt: 'Compare the distance dependence of the electric field for: (a) a point charge, (b) an infinite line charge, and (c) an infinite plane sheet.', answer: 'a point charge, (',
                  options: ['a point charge, (', 'the wire is infinite in both directions'],
                  hint: 'Revisit Gauss\'s law (c12_phy_cbse_01_008) and electric flux (c12_phy_cbse_01_007) with focus.',
                  misconception: 'Students often think the electric field of an infinite wire is constant (like an infinite plane sheet) because "the wire is infinite.' }
          ],
            remediations: { 'the-electric-field-of-an': { steps: ['Revisit the symmetry argument: draw the wire and field lines; convince yourself the field must be radial and uniform.', 'Review the Gaussian surface selection: list all possible surfaces (sphere, cube, cylinder) and eliminate those where.', 'Re-derive the formula step-by-step from Gauss\'s law, explicitly writing flux = ∫E·dS = E(2πrl) and q_enclosed = λl.', 'Practice Exercise 1.22 from NCERT (given E, find λ) to reinforce algebraic manipulation.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_010', difficulty: 'standard',
          question: 'The electric field due to an infinitely large, uniformly charged plane sheet.',
          hint: 'If stuck, review the symmetry argument for the infinite plane sheet: the field must.',
          misconception: 'Students often write E = σ/ε₀ for an infinite plane sheet, forgetting the factor of 1/2.',
          parts: [
                { id: 'a', prompt: 'Two infinite plane sheets are parallel to each other. Sheet A has σ_A = +3σ₀, Sheet B has σ_B = -σ₀. They are separated by a distance d.', answer: 'Use superposition',
                  options: ['Use superposition', 'adds magnitudes without signs, or uses σ/ε₀ for a single sheet'],
                  hint: 'If stuck, review the symmetry argument for the infinite plane sheet: the field must.',
                  misconception: 'Students often write E = σ/ε₀ for an infinite plane sheet, forgetting the factor of 1/2.' }
          ],
            remediations: { 'students-often-write-e-for': { steps: ['If the student cannot derive E = σ/(2ε₀) correctly: (1) Revisit c12_phy_cbse_01_007 (Electric Flux) to practice.', '(2) Revisit c12_phy_cbse_01_008 (Gauss\'s Law) to review the statement and the requirement that the Gaussian surface.', '(3) Draw the infinite sheet and field lines explicitly: arrows perpendicular on both sides.', 'Then draw a cylindrical Gaussian surface straddling the sheet.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_011', difficulty: 'standard',
          question: 'An electric dipole consists of two equal and opposite point charges (+q and –q).',
          hint: 'If stuck on dipole field derivation, revisit Coulomb\'s law for a point charge.',
          misconception: 'Students often think the torque on a dipole in a uniform field is τ = pE (without sinθ) because they memorise the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An electric dipole consists of two equal and opposite point charges (+q and –q) separated',
                  options: ['An electric dipole consists of two equal and opposite point charges (+q and –q) separated', 'Electric charge is a fundamental intrinsic property of matter that causes it to', 'Coulomb\'s Law states that the electrostatic force between two stationary point charges is', 'The superposition principle for electric forces states that the net electrostatic force'],
                  hint: 'If stuck on dipole field derivation, revisit Coulomb\'s law for a point charge (c12_phy_cbse_01_005).',
                  misconception: 'Students often think the torque on a dipole in a uniform field is τ = pE (without sinθ) because they memorise the maximum torque formula.' }
          ],
            remediations: { 'the-torque-on-a-dipole': { steps: ['If a student cannot derive the 1/r³ dependence, have them revisit the superposition principle (c12_phy_cbse_01_003) and.', 'For torque direction errors, practice the right-hand rule for cross product using **τ** = **p** × **E** with physical.', 'For sign convention of **p**, explicitly memorise: **p** points from negative to positive charge.', 'Do a quick re-diagnostic: ask the student to draw the dipole, label **p**, and write the torque vector for **p** at 30°.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_01_012', difficulty: 'standard',
          question: 'Continuous charge distribution describes a macroscopic charge configuration.',
          hint: 'If stuck, revisit node c12_phy_cbse_01_003 (Superposition Principle) and practice vector.',
          misconception: 'Students often write the electric field integral as E = (1/4πε₀) ∫ (dq/r²) without the unit vector r̂, treating E as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Continuous charge distribution describes a macroscopic charge configuration where charge',
                  options: ['Continuous charge distribution describes a macroscopic charge configuration where charge', 'Electric charge is a fundamental intrinsic property of matter that causes it to', 'Coulomb\'s Law states that the electrostatic force between two stationary point charges is', 'The superposition principle for electric forces states that the net electrostatic force'],
                  hint: 'If stuck, revisit node c12_phy_cbse_01_003 (Superposition Principle) and practice vector addition.',
                  misconception: 'Students often write the electric field integral as E = (1/4πε₀) ∫ (dq/r²) without the unit vector r̂, treating E as a scalar.' }
          ],
            remediations: { 'students-often-write-the-electric': { steps: ['Revisit node c12_phy_cbse_01_004 (Electric Field: Definition) to reinforce that E is a vector defined as force per unit.', 'Review node c12_phy_cbse_01_003 (Superposition Principle) — practice adding two electric field vectors graphically.', 'Do a quick vector addition drill: Two charges +q at (±a, 0); find E at (0, y).', 'Show that x-components cancel, y-components add.'], labTask: { instruction: 'On the interactive: make charge A positive and B negative — do the field lines connect? — then check.', widget: 'efield', validate: 'efield:q1=80,q2=20' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
