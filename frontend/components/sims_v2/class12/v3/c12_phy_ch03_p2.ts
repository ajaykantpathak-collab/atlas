import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch03_p2: SimDef = {
    id: 'v3_c12_phy_ch03_p2',
    title: 'Current Electricity · Part 2/2',
    subtitle: 'The electrons crawl — the field sprints',
    classLevel: 12, subject: 'physics', topic: 'Current Electricity · Part 2/2',
    chapters: ['c12_phy_ch03'],
    nodeIds: ['c12_phy_cbse_03_007', 'c12_phy_cbse_03_008', 'c12_phy_cbse_03_009', 'c12_phy_cbse_03_010', 'c12_phy_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Circuit physicist', intro: 'Your phone charger moves electrons at a crawl, yet responds instantly. The answer is what actually travels.', goal: 'Define current as dQ/dt — and untangle conventional direction, electron drift and the scalar arrow.' },
    discovery: {
        question: 'Electrons drift at millimetres per second — yet your light turns on instantly. How?',
        options: ['The electric field pushes all electrons at once', 'Electrons move at light speed inside wires', 'Photons carry the energy, not electrons', 'The switch compresses electrons forward'],
        answer: 'The electric field pushes all electrons at once',
        hook: 'A slow drift, an instant response — the queue moves together. That resolves the biggest confusion in current electricity.',
    },
    teaching: [
        { title: 'Meter Bridge: Principle and Applications', text: 'The meter bridge is a laboratory instrument that implements the Wheatstone bridge principle using a uniform resistance wire of length exactly one meter, enabling the determination of an unknown.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_03_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Close the switch — the bulb lights instantly. Now find out what the electrons were doing.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_007', title: 'Meter Bridge: Principle and Applications',
          scaffold: { problem: '** In a meter bridge experiment, a standard resistance \\(R = 12\\ \\Omega\\) is placed in the left gap and an unknown resistance X in the.',
            steps: [
            { text: 'Identify given: \\(R = 12\\ \\Omega\\), \\(l_1 = 45.0\\ \\text{cm}\\), \\(l_2 = 55.0\\ \\text{cm}\\).' },
            { text: 'Apply balance condition: \\(X = R \\frac{l_1}{l_2} = 12 \\times \\frac{45.0}{55.0} = 9.818\\ \\Omega\\).' },
            { text: 'Calculate cross-sectional area: \\(A = \\pi (d/2)^2 = \\pi (2.0 \\times 10^{-4})^2 = 1.257 \\times 10^{-7}\\ \\text{m}^2\\).' },
            { text: 'Calculate resistivity: \\(\\rho = \\frac{X A}{L} = \\frac{9.818 \\times 1.257 \\times 10^{-7}}{1.50} = 8.22 \\times 10^{-7}\\.' },
            { text: 'Verify units: \\(\\Omega \\cdot \\text{m}^2 / \\text{m} = \\Omega\\ \\text{m}\\) ✓.', faded: true, blankAnswer: '** Unknown resistance \\(X = 9.82\\ \\Omega\\); Resistivity.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_008', title: 'Potentiometer: Principle and Applications',
          scaffold: { problem: 'A potentiometer wire of length 100.0 cm and resistance 5.00 Ω is connected to a driver cell of emf 2.00 V and internal resistance 0.50 Ω.',
            steps: [
            { text: 'Identify given quantities with units. L_total = 100.0 cm = 1.000 m, R_wire = 5.00 Ω, E_driver = 2.00 V, r_driver = 0.50.' },
            { text: 'Potential gradient k = V_wire / L_total. V_wire = I_wire × R_wire = (0.100 A) × (5.00 Ω) = 0.500 V.' },
            { text: 'Emf E = k × ℓ = (0.500 V/m) × (0.425 m) = 0.2125 V = 212.5 mV.' },
            { text: 'Total circuit resistance R_total = E_driver / I_wire = 2.00 V / 0.100 A = 20.0 Ω.' },
            { text: 'Verify: With R_rheostat = 14.5 Ω, total = 0.5 + 5.0 + 14.5 = 20.0 Ω, I = 2.00/20.0 = 0.100 A ✓.', faded: true, blankAnswer: '(a) k = 0.500 V/m, (b) E = 0.213 V (or 213 mV), (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_009', title: 'Combination of Resistors: Series and Parallel',
          scaffold: { problem: 'A 12 V car battery is connected to three resistors in series: 2 Ω (headlight), 4 Ω (taillight), and 6 Ω (dashboard light).',
            steps: [
            { text: 'Identify given quantities: \\(V = 12\\ \\text{V}\\), \\(R_1 = 2\\ \\Omega\\), \\(R_2 = 4\\ \\Omega\\), \\(R_3 = 6\\ \\Omega\\).' },
            { text: 'Equivalent resistance formula for series: \\(R_{\\text{eq}} = R_1 + R_2 + R_3\\).' },
            { text: 'Substitute: \\(R_{\\text{eq}} = 2 + 4 + 6 = 12\\ \\Omega\\).' },
            { text: 'Total current using Ohm\'s law: \\(I = \\frac{V}{R_{\\text{eq}}} = \\frac{12\\ \\text{V}}{12\\ \\Omega} = 1\\ \\text{A}\\).' },
            { text: 'Voltage across 4 Ω: \\(V_2 = I R_2 = (1\\ \\text{A})(4\\ \\Omega) = 4\\ \\text{V}\\).', faded: true, blankAnswer: '(a) 12 Ω, (b) 1 A, (c) 4 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_010', title: 'EMF and Internal Resistance of a Cell',
          scaffold: { problem: 'A 9.0 V battery has an internal resistance of 0.50 Ω. It is connected to an external resistor of 4.5 Ω.',
            steps: [
            { text: 'Identify given quantities: ε = 9.0 V, r = 0.50 Ω, R = 4.5 Ω. Unknowns: I, V, P_load, P_internal.' },
            { text: 'Use the formula for current in a simple series circuit: I = ε / (R + r). Check units: V / Ω = A.' },
            { text: 'Substitute values: I = 9.0 / (4.5 + 0.50) = 9.0 / 5.0 = 1.8 A.' },
            { text: 'Terminal voltage V = ε – Ir = 9.0 – (1.8 × 0.50) = 9.0 – 0.90 = 8.1 V.' },
            { text: 'Power delivered to load P_load = I²R = (1.8)² × 4.5 = 3.24 × 4.5 = 14.58 W.', faded: true, blankAnswer: '(a) 1.8 A, (b) 8.1 V, (c) 14.6 W, (d) 1.62 W' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_011', title: 'Electrical Energy and Power',
          scaffold: { problem: 'An electric immersion heater rated 1500 W, 240 V is used to heat 10 litres of water from 25°C to 75°C.',
            steps: [
            { text: 'Identify given quantities: \\(P_{\\text{rated}} = 1500\\) W, \\(V = 240\\) V, \\(m = 10 \\text{ L} = 10 \\text{ kg}\\), \\(\\Delta.' },
            { text: 'Calculate heat energy required by water: \\(Q = mc\\Delta T = 10 \\times 4200 \\times 50 = 2.1 \\times 10^6\\) J.' },
            { text: 'Electrical energy input needed: \\(W_{\\text{elec}} = Q/\\eta = 2.1 \\times 10^6 / 0.85 = 2.4706 \\times 10^6\\) J.' },
            { text: 'Use \\(W_{\\text{elec}} = P_{\\text{rated}} \\times t\\) (since heater operates at rated power at rated voltage).' },
            { text: 'Convert to minutes: \\(t = 1647.1 / 60 = 27.45\\) min. Verify: 1500 W for 27.45 min = 1500 × 1647 = 2.47 MJ, matches.', faded: true, blankAnswer: '27.5 minutes (or 27 min 27 s).' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An intern tests a resistor at 6 V and 12 V, gets double the current, and reports: \'R = V/I, so doubling voltage doubled the resistance — this batch is faulty.\'',
            decisions: [{ prompt: 'What\'s wrong with that reading of R = V/I?', options: [
                { text: 'He turned a definition into a proportionality — R = V/I just measures resistance; for an ohmic conductor at constant temperature the current rises with voltage so the ratio stays fixed — his own data (I doubled with V) is a textbook pass, not a fault.', outcome: 'The chapter\'s distinction: the law asserts R is constant, the ratio merely defines it — proportional V and I is the signature of a healthy ohmic resistor.' },
                { text: 'He\'s right — if R is computed from V/I, a bigger V must mean a bigger R.', outcome: 'That reading would make R undefined whenever V or I shifts — the whole point of an ohmic device is the ratio holding steady; both quantities moved together, leaving R untouched.', reveals: 'r-grows-with-v' },
                { text: 'Report it as non-ohmic — only a straight line through the origin counts, and two points can\'t prove that.', outcome: 'Two points do lie on a straight line through the origin when I scales with V — his data is literally the ohmic signature; calling it non-ohmic punishes the batch for obeying the law.', reveals: 'linear-equals-suspicious' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'Drift velocity, Ohm\'s law, resistivity — current is a coordinated march, not a sprint. Part 2 asks what happens when the wire fights back.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_007', difficulty: 'standard',
          question: 'The meter bridge is a laboratory instrument that implements the Wheatstone.',
          hint: 'If stuck, revisit the Wheatstone bridge derivation in node **c12_phy_cbse_03_006** and.',
          misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.',
          parts: [
                { id: 'a', prompt: 'State the principle of the meter bridge and write the formula for unknown resistance X in terms of known resistance R and balancing lengths \\(l_1\\) and \\(l_2\\).', answer: 'The meter bridge works on the Wheatstone bridge principle',
                  options: ['The meter bridge works on the Wheatstone bridge principle', 'the meter bridge wire **must** be exactly 100'],
                  hint: 'If stuck, revisit the Wheatstone bridge derivation in node **c12_phy_cbse_03_006** and the.',
                  misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.' },
                { id: 'b', prompt: 'In a meter bridge experiment, a standard resistance \\(R = 12\\ \\Omega\\) is placed in the left gap and an unknown resistance X in the right gap.', answer: '**Step 1:** \\(l_1 = 45.0\\ \\text{cm},\\ l_2 = 55.0\\ \\text{cm}\\)',
                  options: ['**Step 1:** \\(l_1 = 45.0\\ \\text{cm},\\ l_2 = 55.0\\ \\text{cm}\\)', 'the meter bridge wire **must** be exactly 100'],
                  hint: 'If stuck, revisit the Wheatstone bridge derivation in node **c12_phy_cbse_03_006** and the.',
                  misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.' }
          ],
            remediations: { 'the-meter-bridge-wire-must': { steps: ['If the student cannot derive the balance condition or consistently swaps \\(l_1\\) and \\(l_2\\): 1.', 'Revisit **c12_phy_cbse_03_006** (Wheatstone Bridge) and re-derive the balance condition \\(P/Q = R/S\\) using Kirchhoff\'s.', 'Revisit **c12_phy_cbse_03_004** (Resistivity) to confirm \\(R = \\rho l / A\\) and the proportionality \\(R \\propto l\\) for.', 'Draw the meter bridge circuit, label the four arms explicitly: P = R (left gap), Q = X (right gap), R = resistance.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.',
          parts: [
                { id: 'a', prompt: 'A student claims: "To get the most accurate result in a meter bridge, I should choose the known resistance R such that the balance point is as close to 10.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'small length', 'high precision', 'the meter bridge wire **must** be exactly 100'],
                  hint: 'If stuck, revisit the Wheatstone bridge derivation in node **c12_phy_cbse_03_006** and the.',
                  misconception: 'Students often believe the meter bridge wire **must** be exactly 100.0 cm long for the formula to work.' }
          ],
            remediations: { 'the-meter-bridge-wire-must': { steps: ['If the student cannot derive the balance condition or consistently swaps \\(l_1\\) and \\(l_2\\): 1.', 'Revisit **c12_phy_cbse_03_006** (Wheatstone Bridge) and re-derive the balance condition \\(P/Q = R/S\\) using Kirchhoff\'s.', 'Revisit **c12_phy_cbse_03_004** (Resistivity) to confirm \\(R = \\rho l / A\\) and the proportionality \\(R \\propto l\\) for.', 'Draw the meter bridge circuit, label the four arms explicitly: P = R (left gap), Q = X (right gap), R = resistance.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_008', difficulty: 'standard',
          question: 'A potentiometer is an instrument that measures an unknown potential difference.',
          hint: 'If stuck on the null method, revisit c12_phy_cbse_03_007 (Meter Bridge) and practice.',
          misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'A potentiometer wire of length 1.00 m has a resistance of 10.0 Ω.', answer: '**Step 1:** Convert potential gradient to SI: k = 1.50 × 10⁻³ V/cm = 0.150 V/m',
                  options: ['**Step 1:** Convert potential gradient to SI: k = 1.50 × 10⁻³ V/cm = 0.150 V/m', 'The potentiometer wire must have very high resistance to be sensitive'],
                  hint: 'If stuck on the null method, revisit c12_phy_cbse_03_007 (Meter Bridge) and practice finding.',
                  misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:** Students think high.' },
                { id: 'b', prompt: 'In a potentiometer experiment to compare emfs of two cells E₁ and E₂, the balance lengths are ℓ₁ = 40.0 cm and ℓ₂ = 60.0 cm.', answer: '**Correct answer:** Yes, the claim is correct',
                  options: ['**Correct answer:** Yes, the claim is correct', 'no, because the galvanometer sensitivity changes', 'no, because internal resistances differ', 'The potentiometer wire must have very high resistance to be sensitive'],
                  hint: 'If stuck on the null method, revisit c12_phy_cbse_03_007 (Meter Bridge) and practice finding.',
                  misconception: '**Misconception:** "The potentiometer wire must have very high resistance to be sensitive." **Why it\'s wrong:** Students think high.' }
          ],
            remediations: { 'misconception-the-potentiometer-wire-must': { steps: ['If the student holds the above misconception: 1.', 'Revisit **c12_phy_cbse_03_004** (Resistivity and Temperature Dependence) to recall that manganin/constantan are used.', 'Revisit **c12_phy_cbse_03_010** (EMF and Internal Resistance) to analyze how driver cell internal resistance limits.', 'Do a quick calculation: For a 2 V cell with r = 1 Ω driving a 100 Ω wire, I = 2/101 ≈ 20 mA, V_wire = 2 V, k = 2 V/m.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_009', difficulty: 'standard',
          question: 'Combination of resistors refers to connecting two or more resistors in.',
          hint: 'If stuck, revisit Ohm\'s law (c12_phy_cbse_03_002) and practice identifying series.',
          misconception: 'Students often think that in a parallel circuit, the current is the same through each branch because "current.',
          parts: [
                { id: 'a', prompt: 'State the formula for equivalent resistance when three resistors \\(R_1, R_2, R_3\\) are connected in series and when they are connected in parallel.', answer: 'Series: \\(R_{\\text{eq}} = R_1 + R_2 + R_3\\)',
                  options: ['Series: \\(R_{\\text{eq}} = R_1 + R_2 + R_3\\)', 'current is constant in a circuit'],
                  hint: 'If stuck, revisit Ohm\'s law (c12_phy_cbse_03_002) and practice identifying series vs parallel.',
                  misconception: 'Students often think that in a parallel circuit, the current is the same through each branch because "current is constant in a circuit.".' },
                { id: 'b', prompt: 'Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel across a 12 V battery.', answer: 'the equivalent resistance, (',
                  options: ['the equivalent resistance, (', 'current is constant in a circuit'],
                  hint: 'If stuck, revisit Ohm\'s law (c12_phy_cbse_03_002) and practice identifying series vs parallel.',
                  misconception: 'Students often think that in a parallel circuit, the current is the same through each branch because "current is constant in a circuit.".' },
                { id: 'c', prompt: 'A circuit consists of a 4 Ω resistor in series with a parallel combination of 6 Ω and 3 Ω resistors. The combination is connected to a 24 V battery.', answer: 'Parallel equivalent: \\(\\frac{1}{R_p} = \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{2}',
                  options: ['Parallel equivalent: \\(\\frac{1}{R_p} = \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{2}', 'current is constant in a circuit'],
                  hint: 'If stuck, revisit Ohm\'s law (c12_phy_cbse_03_002) and practice identifying series vs parallel.',
                  misconception: 'Students often think that in a parallel circuit, the current is the same through each branch because "current is constant in a circuit.".' }
          ],
            remediations: { 'in-a-parallel-circuit': { steps: ['Revisit the water flow analogy: series = single pipe with constrictions (same flow rate, pressure drops add); parallel.', 'Draw a circuit diagram, label nodes, and explicitly write: "Series: same I, V splits" and "Parallel: same V, I splits".', 'Solve 5 pure-series and 5 pure-parallel numerical problems from NCERT Exercise 3.1–3.3, checking each step with the.', 'If confusion persists, review Kirchhoff\'s junction rule (c12_phy_cbse_03_005) to see how current conservation forces.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_010', difficulty: 'standard',
          question: 'Electromotive force (EMF) of a cell is the maximum potential difference between.',
          hint: 'Review c12_phy_cbse_03_005 (Kirchhoff\'s loop rule) and practice writing loop equations.',
          misconception: 'Students often believe that the terminal voltage of a cell is always equal to its EMF, ignoring the internal voltage.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electromotive force (EMF) of a cell is the maximum potential difference between its',
                  options: ['Electromotive force (EMF) of a cell is the maximum potential difference between its', 'Electric current is the rate of flow of net charge across a cross-sectional area of a', 'Ohm\'s Law states that for a given metallic conductor at constant temperature, the current', 'Drift velocity is the average velocity acquired by free electrons in a conductor due to'],
                  hint: 'Review c12_phy_cbse_03_005 (Kirchhoff\'s loop rule) and practice writing loop equations for.',
                  misconception: 'Students often believe that the terminal voltage of a cell is always equal to its EMF, ignoring the internal voltage drop Ir.' }
          ],
            remediations: { 'the-terminal-voltage-of-a': { steps: ['If the student cannot distinguish EMF from terminal voltage: (1) Revisit the definition of EMF as open-circuit voltage.', '(2) Perform the torch bulb experiment: measure voltage across a fresh cell with no load, then with a bulb connected.', '(3) Draw the equivalent circuit: ε in series with r.', 'Apply Kirchhoff\'s loop rule (c12_phy_cbse_03_005) to the loop: ε – Ir – IR = 0 → V = IR = ε – Ir.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_011', difficulty: 'standard',
          question: 'Electrical energy dissipated in a conductor is the work done by the electric.',
          hint: 'Revisit Ohm\'s law (c12_phy_cbse_03_002) and series/parallel combinations.',
          misconception: 'Students often use the transmission voltage \\(V_{\\text{line}}\\) in \\(P_{\\text{loss}}.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since \\(P = V^2/R\\), if I double the voltage across a resistor, the power becomes four times.', answer: 'Yes, the reasoning is correct',
                  options: ['Yes, the reasoning is correct', 'they disagree'],
                  hint: 'Revisit Ohm\'s law (c12_phy_cbse_03_002) and series/parallel combinations (c12_phy_cbse_03_009).',
                  misconception: 'Students often use the transmission voltage \\(V_{\\text{line}}\\) in \\(P_{\\text{loss}} = V_{\\text{line}}^2/R_{\\text{line}}\\) to calculate.' }
          ],
            remediations: { 'students-often-use-the-transmission': { steps: ['If the student makes the above error: (1) Draw a simple series circuit: source → line resistance \\(R_c\\) → load \\(R\\).', 'Label the transmission voltage \\(V\\) across the load (or source terminals).', '(2) Write the current \\(I = P/V\\) using the delivered power and transmission voltage.', '(3) Show that the voltage across \\(R_c\\) is \\(V_c = IR_c\\), which is much smaller than \\(V\\).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
