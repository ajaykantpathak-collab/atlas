import type { SimDef } from '../../engine/types';
import C12_PhysicsInternalResistanceSim from '../../../simulations/c6_12/C12_PhysicsInternalResistanceSim';

/** v3 wrapped master — C12_PhysicsInternalResistanceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsinternalresistancesim: SimDef = {
    id: 'v3w_c12_physicsinternalresistancesim',
    title: 'Potentiometer: Principle and Applications',
    subtitle: 'Covers: potentiometer principle (potential gradient along uniform wire), comparison of.',
    classLevel: 12, subject: 'physics', topic: 'Potentiometer: Principle and Applications',
    chapters: [],
    nodeIds: ['c12_phy_cbse_03_008', 'c12_phy_cbse_03_010', 'c12_phy_cbse_03_002', 'c12_phy_cbse_03_004', 'c12_phy_cbse_03_006', 'c12_phy_cbse_03_007', 'c12_phy_cbse_03_009', 'c12_phy_cbse_03_011', 'c12_phy_cbse_09_003', 'c12_phy_cbse_09_004', 'c12_phy_cbse_09_008', 'c12_phy_cbse_10_002', 'c12_phy_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a typical school lab potentiometer: a 1-meter uniform manganin wire stretched on a wooden board with.', goal: 'Master Potentiometer: Principle and Applications.' },
    discovery: {
        question: 'In a potentiometer experiment to compare emfs of two cells E₁ and E₂, the balance lengths are ℓ₁ = 40.0 cm and ℓ₂ = 60.0 cm.',
        options: ['**Correct answer:** Yes, the claim is correct', 'no, because the galvanometer sensitivity changes', 'no, because internal resistances differ'],
        answer: '**Correct answer:** Yes, the claim is correct',
        hook: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:**.',
    },
    teaching: [
        { title: 'A potentiometer is an instrument that.', text: 'A potentiometer is an instrument that measures an unknown potential difference (or emf) by balancing it against a known potential drop along a uniform resistance wire carrying a constant current,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_008', title: 'A potentiometer is an instrument that.',
          scaffold: { problem: 'A potentiometer wire of length 100.0 cm and resistance 5.00 Ω is connected to a driver cell of emf 2.00 V and internal resistance 0.50 Ω.',
            steps: [
            { text: 'Identify given quantities with units. L_total = 100.0 cm = 1.000 m, R_wire = 5.00 Ω, E_driver = 2.00 V, r_driver = 0.50.' },
            { text: 'Potential gradient k = V_wire / L_total. V_wire = I_wire × R_wire = (0.100 A) × (5.00 Ω) = 0.500 V.' },
            { text: 'Emf E = k × ℓ = (0.500 V/m) × (0.425 m) = 0.2125 V = 212.5 mV.' },
            { text: 'Total circuit resistance R_total = E_driver / I_wire = 2.00 V / 0.100 A = 20.0 Ω.' },
            { text: 'Verify: With R_rheostat = 14.5 Ω, total = 0.5 + 5.0 + 14.5 = 20.0 Ω, I = 2.00/20.0 = 0.100 A ✓.', faded: true, blankAnswer: '(a) k = 0.500 V/m, (b) E = 0.213 V (or 213 mV), (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_010', title: 'Electromotive force (EMF) of a cell is.',
          scaffold: { problem: 'A 9.0 V battery has an internal resistance of 0.50 Ω. It is connected to an external resistor of 4.5 Ω.',
            steps: [
            { text: 'Identify given quantities: ε = 9.0 V, r = 0.50 Ω, R = 4.5 Ω. Unknowns: I, V, P_load, P_internal.' },
            { text: 'Use the formula for current in a simple series circuit: I = ε / (R + r). Check units: V / Ω = A.' },
            { text: 'Substitute values: I = 9.0 / (4.5 + 0.50) = 9.0 / 5.0 = 1.8 A.' },
            { text: 'Terminal voltage V = ε – Ir = 9.0 – (1.8 × 0.50) = 9.0 – 0.90 = 8.1 V.' },
            { text: 'Power delivered to load P_load = I²R = (1.8)² × 4.5 = 3.24 × 4.5 = 14.58 W.', faded: true, blankAnswer: '(a) 1.8 A, (b) 8.1 V, (c) 14.6 W, (d) 1.62 W' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_002', title: 'Ohm\'s Law states that for a given.',
          scaffold: { problem: 'A 12 V car battery has an internal resistance of 0.4 Ω. The starter motor draws 150 A when cranking.',
            steps: [
            { text: 'Identify given: ε = 12 V, r = 0.4 Ω, I = 150 A. Terminal voltage V = ε – Ir (since current flows out of positive.' },
            { text: '(a) V = 12 V – (150 A × 0.4 Ω) = 12 – 60 = –48 V? Wait, negative?' },
            { text: '(b) Power dissipated inside battery P_r = I²r = (30)² × 0.08 = 900 × 0.08 = 72 W.' },
            { text: '(c) Power delivered to motor P_load = VI = 9.6 × 30 = 288 W. Check: Total power from battery = εI = 12 × 30 = 360 W =.' },
            { text: 'State answers with units: (a) 9.6 V, (b) 72 W, (c) 288 W.', faded: true, blankAnswer: '(a) 9.6 V, (b) 72 W, (c) 288 W.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_004', title: 'Resistivity (ρ) is an intrinsic.',
          scaffold: { problem: 'An immersion heater used for heating water in a bucket has a nichrome wire element. At room temperature (25.0°C), its resistance is 24.0 Ω.',
            steps: [
            { text: 'Identify given quantities: R_0 = 24.0 Ω at T_0 = 25.0°C, V = 230 V, I_steady = 4.20 A, α = 1.70 × 10⁻⁴ °C⁻¹.' },
            { text: 'Calculate the steady resistance R_steady using Ohm\'s law: R_steady = V / I_steady = 230 V / 4.20 A = 54.76 Ω.' },
            { text: 'Use the temperature dependence formula for resistance (same as for resistivity since dimensions are constant): R_steady.' },
            { text: 'Solve for T_steady: (R_steady / R_0) - 1 = α(T_steady - T_0) → T_steady - T_0 = (R_steady/R_0 - 1)/α.' },
            { text: 'Compute: R_steady/R_0 = 54.76/24.0 = 2.2817. (2.2817 - 1) = 1.2817. ΔT = 1.2817 / (1.70×10⁻⁴) = 7539 °C.' },
            { text: 'Check physical reasonableness: Nichrome melts around 1400°C. The calculated temperature is impossibly high, indicating.' },
            { text: 'Given: R_0 = 10.0 Ω at T_0 = 20.0°C, V = 12.0 V, I = 0.500 A, α = 3.90 × 10⁻³ °C⁻¹. Find T.' },
            { text: 'Steady resistance R = V/I = 12.0 / 0.500 = 24.0 Ω.' },
            { text: 'Formula: R = R_0[1 + α(T - T_0)].' },
            { text: 'Solve for T: T - T_0 = (R/R_0 - 1)/α = (24.0/10.0 - 1) / (3.90×10⁻³) = (2.40 - 1) / 0.00390 = 1.40 / 0.00390 = 359 °C.' },
            { text: 'T = 20.0 + 359 = 379 °C. Check: Copper melts at 1085°C, so 379°C is physically plausible for a resistor under power.', faded: true, blankAnswer: '379 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_006', title: 'The Wheatstone bridge is a circuit.',
          scaffold: { problem: 'In a Wheatstone bridge, the four arms have resistances: AB = 220 Ω, BC = 180 Ω, CD = 330 Ω, and DA = R (unknown).',
            steps: [
            { text: 'Identify the four arms in order around the bridge: R₁ = AB = 220 Ω, R₂ = BC = 180 Ω, R₃ = CD = 330 Ω, R₄ = DA = R.' },
            { text: 'Substitute known values: 220/180 = 330/R. Simplify left side: 220/180 = 22/18 = 11/9.' },
            { text: 'Cross-multiply: 11R = 9 × 330 = 2970. Solve: R = 2970/11 = 270 Ω.' },
            { text: 'At balance, I_g = 0. The bridge becomes two parallel branches: upper branch R₁ + R₂ = 220 + 180 = 400 Ω, lower branch.' },
            { text: 'Current through upper branch (which flows through 220 Ω) = V/(R₁+R₂) = 9/400 = 0.0225 A = 22.5 mA.', faded: true, blankAnswer: '(a) R = 270 Ω, (b) I through 220 Ω = 22.5 mA, (c) R_eq =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_007', title: 'The meter bridge is a laboratory.',
          scaffold: { problem: '** In a meter bridge experiment, a standard resistance \\(R = 12\\ \\Omega\\) is placed in the left gap and an unknown resistance X in the.',
            steps: [
            { text: 'Identify given: \\(R = 12\\ \\Omega\\), \\(l_1 = 45.0\\ \\text{cm}\\), \\(l_2 = 55.0\\ \\text{cm}\\).' },
            { text: 'Apply balance condition: \\(X = R \\frac{l_1}{l_2} = 12 \\times \\frac{45.0}{55.0} = 9.818\\ \\Omega\\).' },
            { text: 'Calculate cross-sectional area: \\(A = \\pi (d/2)^2 = \\pi (2.0 \\times 10^{-4})^2 = 1.257 \\times 10^{-7}\\ \\text{m}^2\\).' },
            { text: 'Calculate resistivity: \\(\\rho = \\frac{X A}{L} = \\frac{9.818 \\times 1.257 \\times 10^{-7}}{1.50} = 8.22 \\times 10^{-7}\\.' },
            { text: 'Verify units: \\(\\Omega \\cdot \\text{m}^2 / \\text{m} = \\Omega\\ \\text{m}\\) ✓.', faded: true, blankAnswer: '** Unknown resistance \\(X = 9.82\\ \\Omega\\); Resistivity.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_03_010', title: 'Identify each idea',
          dissect: { specimen: 'Potentiometer: Principle and Applications', spots: [
            { id: 's1', label: 'A potentiometer is an instrument', prompt: 'Which idea is this? — A potentiometer is an instrument that measures an unknown potential difference (or emf).', answer: 'A potentiometer is an instrument', options: ['A potentiometer is an instrument', 'Electromotive force EMF of a', 'Ohms Law states that for', 'Resistivity is an intrinsic'] },
            { id: 's2', label: 'Electromotive force EMF of a', prompt: 'Which idea is this? — Electromotive force (EMF) of a cell is the maximum potential difference between its.', answer: 'Electromotive force EMF of a', options: ['Electromotive force EMF of a', 'A potentiometer is an instrument', 'Ohms Law states that for', 'Resistivity is an intrinsic'] },
            { id: 's3', label: 'Ohms Law states that for', prompt: 'Which idea is this? — Ohm\'s Law states that for a given metallic conductor at constant temperature, the current.', answer: 'Ohms Law states that for', options: ['Ohms Law states that for', 'A potentiometer is an instrument', 'Electromotive force EMF of a', 'Resistivity is an intrinsic'] },
            { id: 's4', label: 'Resistivity is an intrinsic', prompt: 'Which idea is this? — Resistivity (ρ) is an intrinsic material property quantifying how strongly a material.', answer: 'Resistivity is an intrinsic', options: ['Resistivity is an intrinsic', 'A potentiometer is an instrument', 'Electromotive force EMF of a', 'Ohms Law states that for'] },
            { id: 's5', label: 'The Wheatstone bridge is a', prompt: 'Which idea is this? — The Wheatstone bridge is a circuit arrangement of four resistors (R₁, R₂, R₃, R₄).', answer: 'The Wheatstone bridge is a', options: ['The Wheatstone bridge is a', 'A potentiometer is an instrument', 'Electromotive force EMF of a', 'Ohms Law states that for'] },
            { id: 's6', label: 'The meter bridge is a', prompt: 'Which idea is this? — The meter bridge is a laboratory instrument that implements the Wheatstone bridge.', answer: 'The meter bridge is a', options: ['The meter bridge is a', 'A potentiometer is an instrument', 'Electromotive force EMF of a', 'Ohms Law states that for'] }
          ] } }
    ],
    explore: { component: C12_PhysicsInternalResistanceSim, prompt: 'Explore the interactive — Potentiometer: Principle and Applications' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_008', difficulty: 'standard',
          question: 'A potentiometer is an instrument that measures an unknown potential difference.',
          hint: 'If stuck on the null method, revisit c12_phy_cbse_03_007 (Meter Bridge) and practice.',
          misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'A potentiometer wire of length 1.00 m has a resistance of 10.0 Ω.', answer: '**Step 1:** Convert potential gradient to SI: k = 1.50 × 10⁻³ V/cm = 0.150 V/m',
                  options: ['**Step 1:** Convert potential gradient to SI: k = 1.50 × 10⁻³ V/cm = 0.150 V/m', 'The potentiometer wire must have very high resistance to be sensitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:** Students think high.' },
                { id: 'b', prompt: 'In a potentiometer experiment to compare emfs of two cells E₁ and E₂, the balance lengths are ℓ₁ = 40.0 cm and ℓ₂ = 60.0 cm.', answer: '**Correct answer:** Yes, the claim is correct',
                  options: ['**Correct answer:** Yes, the claim is correct', 'no, because the galvanometer sensitivity changes', 'no, because internal resistances differ'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:** Students think high.' }
          ],
            remediations: { 'misconception-the-potentiometer-wire-must': { steps: ['If the student holds the above misconception: 1.', 'Revisit **c12_phy_cbse_03_004** (Resistivity and Temperature Dependence) to recall that manganin/constantan are used.', 'Revisit **c12_phy_cbse_03_010** (EMF and Internal Resistance) to analyze how driver cell internal resistance limits.', 'Do a quick calculation: For a 2 V cell with r = 1 Ω driving a 100 Ω wire, I = 2/101 ≈ 20 mA, V_wire = 2 V, k = 2 V/m.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'A student measures the internal resistance r of a cell using a potentiometer. With the cell in open circuit, balance length ℓ₁ = 75.0 cm.', answer: '**Error:** The student used (ℓ₁ – ℓ₂)/ℓ₂ instead of (ℓ₁ – ℓ₂)/ℓ₂?',
                  options: ['**Error:** The student used (ℓ₁ – ℓ₂)/ℓ₂ instead of (ℓ₁ – ℓ₂)/ℓ₂?', 'should be ℓ₁/ℓ₂', 'should use ℓ₁ in denominator', 'The potentiometer wire must have very high resistance to be sensitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:** Students think high.' },
                { id: 'b', prompt: 'In a potentiometer experiment to compare emfs of two cells E₁ and E₂, the balance lengths are ℓ₁ = 40.0 cm and ℓ₂ = 60.0 cm.', answer: '**Correct answer:** Yes, the claim is correct',
                  options: ['**Correct answer:** Yes, the claim is correct', 'no, because the galvanometer sensitivity changes', 'no, because internal resistances differ', 'The potentiometer wire must have very high resistance to be sensitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:** Students think high.' }
          ],
            remediations: { 'misconception-the-potentiometer-wire-must': { steps: ['If the student holds the above misconception: 1.', 'Revisit **c12_phy_cbse_03_004** (Resistivity and Temperature Dependence) to recall that manganin/constantan are used.', 'Revisit **c12_phy_cbse_03_010** (EMF and Internal Resistance) to analyze how driver cell internal resistance limits.', 'Do a quick calculation: For a 2 V cell with r = 1 Ω driving a 100 Ω wire, I = 2/101 ≈ 20 mA, V_wire = 2 V, k = 2 V/m.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_010', difficulty: 'standard',
          question: 'Electromotive force (EMF) of a cell is the maximum potential difference between.',
          hint: 'Review c12_phy_cbse_03_005 (Kirchhoff\'s loop rule) and practice writing loop equations.',
          misconception: 'Students often believe that the terminal voltage of a cell is always equal to its EMF, ignoring the internal voltage.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electromotive force (EMF) of a cell is the maximum potential difference between its',
                  options: ['Electromotive force (EMF) of a cell is the maximum potential difference between its', 'A potentiometer is an instrument that measures an unknown potential difference (or emf)', 'Ohm\'s Law states that for a given metallic conductor at constant temperature, the current', 'Resistivity (ρ) is an intrinsic material property quantifying how strongly a material'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the terminal voltage of a cell is always equal to its EMF, ignoring the internal voltage drop Ir.' }
          ],
            remediations: { 'the-terminal-voltage-of-a': { steps: ['If the student cannot distinguish EMF from terminal voltage: (1) Revisit the definition of EMF as open-circuit voltage.', '(2) Perform the torch bulb experiment: measure voltage across a fresh cell with no load, then with a bulb connected.', '(3) Draw the equivalent circuit: ε in series with r.', 'Apply Kirchhoff\'s loop rule (c12_phy_cbse_03_005) to the loop: ε – Ir – IR = 0 → V = IR = ε – Ir.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_002', difficulty: 'standard',
          question: 'Ohm\'s Law states that for a given metallic conductor at constant temperature,.',
          hint: 'Revisit c10_phy_cbse_01_003 for V–I graph plotting and c12_phy_cbse_03_001 for current.',
          misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ohm\'s law is V = IR, so resistance R = V/I.', answer: 'The flaw: R = V/I defines resistance for any conductor (ohmic or non-ohmic)',
                  options: ['The flaw: R = V/I defines resistance for any conductor (ohmic or non-ohmic)', 'Ohm\'s law is V = IR'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' },
                { id: 'b', prompt: 'The V–I graphs for three devices are shown: (a) straight line through origin, (b) straight line not through origin, (c) curve symmetric about origin but.', answer: 'straight line through origin, (',
                  options: ['straight line through origin, (', 'Ohm\'s law is V = IR', 'any straight line implies Ohm\'s law, ignoring the origin condition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' }
          ],
            remediations: { 'ohm-s-law-is-v': { steps: ['If the student cannot distinguish definition from law: (1) Revisit Class 10 node c10_phy_cbse_01_003 (Ohm\'s Law:.', '(2) Perform the pencil-lead experiment (Diagnostic Q6) and deliberately heat the graphite with high current to see the.', '(3) Write in own words: "Ohm\'s law = R is constant; R = V/I = definition of resistance." (4) Re-attempt Diagnostic Q2.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law.',
          parts: [
                { id: 'a', prompt: 'A p-n junction diode has the V–I characteristic: I = I₀(e^(qV/kT) – 1) for V > 0 (forward bias) and I ≈ –I₀ for V < 0 (reverse bias), where I₀ = 1 μA, q =.', answer: 'The diode violates all three criteria: (1) V vs I is non-linear (exponential) →',
                  options: ['The diode violates all three criteria: (1) V vs I is non-linear (exponential) →', 'Ohm\'s law is V = IR'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' },
                { id: 'b', prompt: 'Design a simple experiment using a pencil lead (graphite), a 9 V battery, an ammeter, a voltmeter, and a rheostat to verify Ohm\'s law and determine the.', answer: '(1) Connect graphite rod in series with battery, rheostat, ammeter',
                  options: ['(1) Connect graphite rod in series with battery, rheostat, ammeter', 'Ohm\'s law is V = IR'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' },
                { id: 'c', prompt: 'The V–I graphs for three devices are shown: (a) straight line through origin, (b) straight line not through origin, (c) curve symmetric about origin but.', answer: 'straight line through origin, (',
                  options: ['straight line through origin, (', 'Ohm\'s law is V = IR', 'any straight line implies Ohm\'s law, ignoring the origin condition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' }
          ],
            remediations: { 'ohm-s-law-is-v': { steps: ['If the student cannot distinguish definition from law: (1) Revisit Class 10 node c10_phy_cbse_01_003 (Ohm\'s Law:.', '(2) Perform the pencil-lead experiment (Diagnostic Q6) and deliberately heat the graphite with high current to see the.', '(3) Write in own words: "Ohm\'s law = R is constant; R = V/I = definition of resistance." (4) Re-attempt Diagnostic Q2.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_004', difficulty: 'standard',
          question: 'Resistivity (ρ) is an intrinsic material property quantifying how strongly a.',
          hint: 'If stuck, revisit the drift velocity derivation (c12_phy_cbse_03_003) and the Class 11.',
          misconception: 'Students often believe the linear formula ρ_T = ρ_0[1 + α(T - T_0)] is universally valid for all temperatures, and they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Resistivity (ρ) is an intrinsic material property quantifying how strongly a material',
                  options: ['Resistivity (ρ) is an intrinsic material property quantifying how strongly a material', 'A potentiometer is an instrument that measures an unknown potential difference (or emf)', 'Electromotive force (EMF) of a cell is the maximum potential difference between its', 'Ohm\'s Law states that for a given metallic conductor at constant temperature, the current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the linear formula ρ_T = ρ_0[1 + α(T - T_0)] is universally valid for all temperatures, and they apply it to very.' }
          ],
            remediations: { 'the-linear-formula-t-0': { steps: ['If the student exhibits this misconception, have them: (1) Revisit the drift velocity derivation (c12_phy_cbse_03_003).', '(2) Plot ρ vs T for copper using data from a handbook (or NCERT Fig.', '3.8) and observe the non-linear region below 50 K.', '(3) Re-derive the linear approximation from the Taylor expansion of ρ(T) around T_0, emphasizing it is a first-order.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_006', difficulty: 'standard',
          question: 'The Wheatstone bridge is a circuit arrangement of four resistors (R₁, R₂, R₃,.',
          hint: 'If stuck on sign conventions in loop equations, revisit c12_phy_cbse_03_005 and practice.',
          misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the.',
          parts: [
                { id: 'a', prompt: 'State the balance condition of a Wheatstone bridge in terms of the four resistances R₁, R₂, R₃, R₄ where R₁ and R₂ are adjacent arms on one side of the.', answer: 'The balance condition is R₁/R₂ = R₃/R₄ (or equivalently R₂/R₁ = R₄/R₃)',
                  options: ['The balance condition is R₁/R₂ = R₃/R₄ (or equivalently R₂/R₁ = R₄/R₃)', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' },
                { id: 'b', prompt: 'In a balanced Wheatstone bridge, the galvanometer shows zero deflection.', answer: 'At balance, I_g = 0, so the galvanometer branch carries no current',
                  options: ['At balance, I_g = 0, so the galvanometer branch carries no current', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' },
                { id: 'c', prompt: 'A Wheatstone bridge has R₁ = 100 Ω, R₂ = 10 Ω, R₃ = 5 Ω, R₄ = 60 Ω (same as NCERT Example 3.7).', answer: 'Step 1: Compare voltage at B and D',
                  options: ['Step 1: Compare voltage at B and D', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' }
          ],
            remediations: { 'students-often-write-the-balance': { steps: ['If the student cannot derive the balance condition or misidentifies the ratio arms: 1.', 'Revisit c12_phy_cbse_03_005 (Kirchhoff\'s Laws) — practice writing junction rule at B and D, and loop rule for ADBA and.', 'Draw the bridge as two separate voltage dividers side by side: left divider (R₁, R₂) across battery, right divider (R₃,.', 'The galvanometer connects the midpoints.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the.',
          parts: [
                { id: 'a', prompt: 'A student solves an unbalanced Wheatstone bridge problem and obtains I_g = -2.5 mA.', answer: 'The statement is correct but incomplete',
                  options: ['The statement is correct but incomplete', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' },
                { id: 'b', prompt: 'Design a simple experiment using a Wheatstone bridge to determine the temperature coefficient of resistance (α) of a nichrome wire.', answer: 'A good answer includes: (1) Place nichrome wire as R₄ (unknown) in one arm, use',
                  options: ['A good answer includes: (1) Place nichrome wire as R₄ (unknown) in one arm, use', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' }
          ],
            remediations: { 'students-often-write-the-balance': { steps: ['If the student cannot derive the balance condition or misidentifies the ratio arms: 1.', 'Revisit c12_phy_cbse_03_005 (Kirchhoff\'s Laws) — practice writing junction rule at B and D, and loop rule for ADBA and.', 'Draw the bridge as two separate voltage dividers side by side: left divider (R₁, R₂) across battery, right divider (R₃,.', 'The galvanometer connects the midpoints.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_007', difficulty: 'standard',
          question: 'The meter bridge is a laboratory instrument that implements the Wheatstone.',
          hint: 'If stuck, revisit the Wheatstone bridge derivation in node **c12_phy_cbse_03_006** and.',
          misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.',
          parts: [
                { id: 'a', prompt: 'State the principle of the meter bridge and write the formula for unknown resistance X in terms of known resistance R and balancing lengths \\(l_1\\) and \\(l_2\\).', answer: 'The meter bridge works on the Wheatstone bridge principle',
                  options: ['The meter bridge works on the Wheatstone bridge principle', 'the meter bridge wire **must** be exactly 100'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.' },
                { id: 'b', prompt: 'In a meter bridge experiment, a standard resistance \\(R = 12\\ \\Omega\\) is placed in the left gap and an unknown resistance X in the right gap.', answer: '**Step 1:** \\(l_1 = 45.0\\ \\text{cm},\\ l_2 = 55.0\\ \\text{cm}\\)',
                  options: ['**Step 1:** \\(l_1 = 45.0\\ \\text{cm},\\ l_2 = 55.0\\ \\text{cm}\\)', 'the meter bridge wire **must** be exactly 100'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.' }
          ],
            remediations: { 'the-meter-bridge-wire-must': { steps: ['If the student cannot derive the balance condition or consistently swaps \\(l_1\\) and \\(l_2\\): 1.', 'Revisit **c12_phy_cbse_03_006** (Wheatstone Bridge) and re-derive the balance condition \\(P/Q = R/S\\) using Kirchhoff\'s.', 'Revisit **c12_phy_cbse_03_004** (Resistivity) to confirm \\(R = \\rho l / A\\) and the proportionality \\(R \\propto l\\) for.', 'Draw the meter bridge circuit, label the four arms explicitly: P = R (left gap), Q = X (right gap), R = resistance of.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.',
          parts: [
                { id: 'a', prompt: 'A student claims: "To get the most accurate result in a meter bridge, I should choose the known resistance R such that the balance point is as close to 10 cm.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'small length', 'high precision', 'the meter bridge wire **must** be exactly 100'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.' }
          ],
            remediations: { 'the-meter-bridge-wire-must': { steps: ['If the student cannot derive the balance condition or consistently swaps \\(l_1\\) and \\(l_2\\): 1.', 'Revisit **c12_phy_cbse_03_006** (Wheatstone Bridge) and re-derive the balance condition \\(P/Q = R/S\\) using Kirchhoff\'s.', 'Revisit **c12_phy_cbse_03_004** (Resistivity) to confirm \\(R = \\rho l / A\\) and the proportionality \\(R \\propto l\\) for.', 'Draw the meter bridge circuit, label the four arms explicitly: P = R (left gap), Q = X (right gap), R = resistance of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
