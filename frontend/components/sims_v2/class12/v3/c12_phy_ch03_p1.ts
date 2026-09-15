import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch03_p1: SimDef = {
    id: 'v3_c12_phy_ch03_p1',
    title: 'Current Electricity · Part 1/2',
    subtitle: 'The electrons crawl — the field sprints',
    classLevel: 12, subject: 'physics', topic: 'Current Electricity · Part 1/2',
    chapters: ['c12_phy_ch03'],
    nodeIds: ['c12_phy_cbse_03_001', 'c12_phy_cbse_03_002', 'c12_phy_cbse_03_003', 'c12_phy_cbse_03_004', 'c12_phy_cbse_03_005', 'c12_phy_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Circuit physicist', intro: 'Your phone charger moves electrons at a crawl, yet responds instantly. The answer is what actually travels.', goal: 'Define current as dQ/dt — and untangle conventional direction, electron drift and the scalar arrow.' },
    discovery: {
        question: 'Electrons drift at millimetres per second — yet your light turns on instantly. How?',
        options: ['The electric field pushes all electrons at once', 'Electrons move at light speed inside wires', 'Photons carry the energy, not electrons', 'The switch compresses electrons forward'],
        answer: 'The electric field pushes all electrons at once',
        hook: 'A slow drift, an instant response — the queue moves together. That resolves the biggest confusion in current electricity.',
    },
    teaching: [
        { title: 'Electric Current: Definition and Direction', text: 'Electric current is the rate of flow of net charge across a cross-sectional area of a conductor. In SI units, it is measured in amperes (A), where 1 A = 1 C/s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_03_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Close the switch — the bulb lights instantly. Now find out what the electrons were doing.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_001', title: 'Electric Current: Definition and Direction',
          scaffold: { problem: 'A smartphone charger delivers a steady current of 1.2 A to the battery.',
            steps: [
            { text: 'Identify given: I = 1.2 A, t = 45 min = 45 × 60 = 2700 s. Find: Q (C) and number of electrons N.' },
            { text: 'Use steady current formula Q = I × t. Check units: A × s = C.' },
            { text: 'Substitute: Q = 1.2 A × 2700 s = 3240 C.' },
            { text: 'Number of electrons N = Q / e = 3240 C / (1.6 × 10⁻¹⁹ C) = 2.025 × 10²² electrons.' },
            { text: 'Verify: 3240 C is reasonable for phone charging (typical battery ~10,000 C capacity).', faded: true, blankAnswer: 'Q = 3240 C, N = 2.025 × 10²² electrons' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_002', title: 'Ohm\'s Law: Statement and Limitations',
          scaffold: { problem: 'A 12 V car battery has an internal resistance of 0.4 Ω. The starter motor draws 150 A when cranking.',
            steps: [
            { text: 'Identify given: ε = 12 V, r = 0.4 Ω, I = 150 A. Terminal voltage V = ε – Ir (since current flows out of positive.' },
            { text: '(a) V = 12 V – (150 A × 0.4 Ω) = 12 – 60 = –48 V? Wait, negative?' },
            { text: '(b) Power dissipated inside battery P_r = I²r = (30)² × 0.08 = 900 × 0.08 = 72 W.' },
            { text: '(c) Power delivered to motor P_load = VI = 9.6 × 30 = 288 W. Check: Total power from battery = εI = 12 × 30 = 360.' },
            { text: 'State answers with units: (a) 9.6 V, (b) 72 W, (c) 288 W.', faded: true, blankAnswer: '(a) 9.6 V, (b) 72 W, (c) 288 W.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_003', title: 'Drift Velocity and Mobility of Electrons',
          scaffold: { problem: 'A copper wire of length 3.0 m and cross-sectional area 2.0 × 10⁻⁶ m² carries a current of 3.0 A.',
            steps: [
            { text: 'Identify given: I = 3.0 A, n = 8.5×10²⁸ m⁻³, A = 2.0×10⁻⁶ m², e = 1.6×10⁻¹⁹ C, length L = 3.0 m.' },
            { text: 'Use formula v_d = I / (n e A). Check units: A = C/s; n e A = (m⁻³)(C)(m²) = C/m → v_d = (C/s)/(C/m) = m/s. Correct.' },
            { text: 'Substitute: v_d = 3.0 / (8.5×10²⁸ × 1.6×10⁻¹⁹ × 2.0×10⁻⁶) = 3.0 / (2.72×10⁴) = 1.10×10⁻⁴ m/s.' },
            { text: 'Time t = L / v_d = 3.0 / 1.10×10⁻⁴ = 2.73×10⁴ s ≈ 7.6 hours.' },
            { text: 'Verify: Drift speed is very small (0.11 mm/s), so time is hours. Physically reasonable.', faded: true, blankAnswer: '2.7 × 10⁴ s (or about 7.6 hours)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_004', title: 'Resistivity and Conductivity: Temperature Dependence',
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_005', title: 'Kirchhoff\'s Laws: Junction and Loop Rules',
          scaffold: { problem: 'In a household circuit, a 12 V car battery (internal resistance 0.4 Ω) is connected to a starter motor (resistance 0.6 Ω) and a headlamp.',
            steps: [
            { text: 'Identify given quantities: ε = 12 V, r = 0.4 Ω, R_starter = 0.6 Ω, R_headlamp = 3 Ω, R_fuse = 0.2 Ω.' },
            { text: 'Draw the circuit: battery positive → fuse (0.2 Ω) → junction A → two parallel branches: starter (0.6 Ω) and headlamp (3.' },
            { text: 'Apply Junction Rule at A: I_fuse = I_starter + I_headlamp. (Equation 1)' },
            { text: 'Apply Loop Rule to loop containing battery, fuse, starter: ε - I_fuse·r - I_fuse·R_fuse - I_starter·R_starter = 0 → 12.' },
            { text: 'Apply Loop Rule to loop containing battery, fuse, headlamp: ε - I_fuse·r - I_fuse·R_fuse - I_headlamp·R_headlamp = 0 →.' },
            { text: 'Substitute I_fuse from Eq1 into Eq2 and Eq3. Eq2: 12 - 0.6(I_starter + I_headlamp) - 0.6 I_starter = 0 → 12 - 1.2.' },
            { text: 'Solve the two equations: From Eq2: 1.2 I_starter = 12 - 0.6 I_headlamp → I_starter = 10 - 0.5 I_headlamp.' },
            { text: 'Verify with Loop Rule for the loop containing starter and headlamp (no battery): -I_starter·R_starter.', faded: true, blankAnswer: 'I_fuse = 10.9 A, I_starter = 9.1 A, I_headlamp = 1.8 A (all.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_006', title: 'Wheatstone Bridge: Principle and Balance Condition',
          scaffold: { problem: 'In a Wheatstone bridge, the four arms have resistances: AB = 220 Ω, BC = 180 Ω, CD = 330 Ω, and DA = R (unknown).',
            steps: [
            { text: 'Identify the four arms in order around the bridge: R₁ = AB = 220 Ω, R₂ = BC = 180 Ω, R₃ = CD = 330 Ω, R₄ = DA = R.' },
            { text: 'Substitute known values: 220/180 = 330/R. Simplify left side: 220/180 = 22/18 = 11/9.' },
            { text: 'Cross-multiply: 11R = 9 × 330 = 2970. Solve: R = 2970/11 = 270 Ω.' },
            { text: 'At balance, I_g = 0. The bridge becomes two parallel branches: upper branch R₁ + R₂ = 220 + 180 = 400 Ω, lower branch.' },
            { text: 'Current through upper branch (which flows through 220 Ω) = V/(R₁+R₂) = 9/400 = 0.0225 A = 22.5 mA.', faded: true, blankAnswer: '(a) R = 270 Ω, (b) I through 220 Ω = 22.5 mA, (c) R_eq.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An intern tests a resistor at 6 V and 12 V, gets double the current, and reports: \'R = V/I, so doubling voltage doubled the resistance — this batch is faulty.\'',
            decisions: [{ prompt: 'What\'s wrong with that reading of R = V/I?', options: [
                { text: 'He turned a definition into a proportionality — R = V/I just measures resistance; for an ohmic conductor at constant temperature the current rises with voltage so the ratio stays fixed — his own data (I doubled with V) is a textbook pass, not a fault.', outcome: 'The chapter\'s distinction: the law asserts R is constant, the ratio merely defines it — proportional V and I is the signature of a healthy ohmic resistor.' },
                { text: 'He\'s right — if R is computed from V/I, a bigger V must mean a bigger R.', outcome: 'That reading would make R undefined whenever V or I shifts — the whole point of an ohmic device is the ratio holding steady; both quantities moved together, leaving R untouched.', reveals: 'r-grows-with-v' },
                { text: 'Report it as non-ohmic — only a straight line through the origin counts, and two points can\'t prove that.', outcome: 'Two points do lie on a straight line through the origin when I scales with V — his data is literally the ohmic signature; calling it non-ohmic punishes the batch for obeying the law.', reveals: 'linear-equals-suspicious' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Drift velocity, Ohm\'s law, resistivity — current is a coordinated march, not a sprint. Part 2 asks what happens when the wire fights back.',
            decisions: [{ prompt: 'What comes next? Current Electricity · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Current Electricity · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_001', difficulty: 'standard',
          question: 'Electric current is the rate of flow of net charge across a cross-sectional.',
          hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001.',
          misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Current I = 5 C flowing through a wire." Identify the error and state the correct quantity with its unit.', answer: 'Error: Current is a rate, not an amount of charge',
                  options: ['Error: Current is a rate, not an amount of charge', 'current is a vector', '"current is a vector'],
                  hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001 (intuitive idea.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' },
                { id: 'b', prompt: 'A steady current of 2.5 A flows through a household fan motor for 10 minutes. Calculate the total charge that passes through any cross-section of the wire.', answer: 'Given: I = 2.5 A, t = 10 min = 600 s',
                  options: ['Given: I = 2.5 A, t = 10 min = 600 s', 'current is a vector', '"current is a vector'],
                  hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001 (intuitive idea.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' },
                { id: 'c', prompt: 'Two wires A and B carry currents 3 A and 5 A respectively. Wire A has electrons drifting at 0.2 mm/s; wire B has electrons drifting at 0.1 mm/s.', answer: 'From I = nAev_d, n ∝ I/v_d (since A, e constant)',
                  options: ['From I = nAev_d, n ∝ I/v_d (since A, e constant)', 'higher drift speed means more charge', 'current is a vector', '"current is a vector'],
                  hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001 (intuitive idea.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' }
          ],
            remediations: { 'current-is-a-vector-because': { steps: ['Revisit Class 10 node c10_phy_cbse_01_001 (Electric Current: Definition and Unit) to reinforce I = Q/t and the ampere.', 'Perform a thought experiment: imagine a T-junction with water pipes — water flow rates add algebraically, not.', 'Practice: given three wires meeting at a point with currents 2 A, 3 A, and 4 A marked with arrows, determine the actual.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this scalar mindset.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply.',
          parts: [
                { id: 'a', prompt: 'A student solves a circuit problem and writes: "Current entering junction = 3 A, leaving = 2 A + 2 A = 4 A.', answer: 'The student\'s reasoning is flawed',
                  options: ['The student\'s reasoning is flawed', 'current is a vector', '"current is a vector'],
                  hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001 (intuitive idea.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' },
                { id: 'b', prompt: 'Design a simple experiment using a battery, an ammeter, a variable resistor, and a stopwatch to verify that current is the rate of flow of charge.', answer: 'Procedure: (1) Connect battery, ammeter, and variable resistor in series',
                  options: ['Procedure: (1) Connect battery, ammeter, and variable resistor in series', 'current is a vector', '"current is a vector'],
                  hint: 'If confused about dQ/dt vs ΔQ/Δt, review Class 11 Maths node c11_math_cbse_13_001 (intuitive idea.',
                  misconception: 'Students think "current is a vector because it has direction (arrow in circuit diagrams)." They incorrectly apply vector addition.' }
          ],
            remediations: { 'current-is-a-vector-because': { steps: ['Revisit Class 10 node c10_phy_cbse_01_001 (Electric Current: Definition and Unit) to reinforce I = Q/t and the ampere.', 'Perform a thought experiment: imagine a T-junction with water pipes — water flow rates add algebraically, not.', 'Practice: given three wires meeting at a point with currents 2 A, 3 A, and 4 A marked with arrows, determine the actual.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with this scalar mindset.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_002', difficulty: 'standard',
          question: 'Ohm\'s Law states that for a given metallic conductor at constant temperature.',
          hint: 'Revisit c10_phy_cbse_01_003 for V–I graph plotting and c12_phy_cbse_03_001 for current.',
          misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ohm\'s law is V = IR, so resistance R = V/I.', answer: 'The flaw: R = V/I defines resistance for any conductor (ohmic or non-ohmic)',
                  options: ['The flaw: R = V/I defines resistance for any conductor (ohmic or non-ohmic)', 'Ohm\'s law is V = IR'],
                  hint: 'Revisit c10_phy_cbse_01_003 for V–I graph plotting and c12_phy_cbse_03_001 for current definition.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' },
                { id: 'b', prompt: 'The V–I graphs for three devices are shown: (a) straight line through origin, (b) straight line not through origin, (c) curve symmetric about origin but.', answer: 'straight line through origin, (',
                  options: ['straight line through origin, (', 'Ohm\'s law is V = IR', 'any straight line implies Ohm\'s law, ignoring the origin condition'],
                  hint: 'Revisit c10_phy_cbse_01_003 for V–I graph plotting and c12_phy_cbse_03_001 for current definition.',
                  misconception: 'Students often believe "Ohm\'s law is V = IR" and that any device for which you can measure V and I obeys Ohm\'s law because you can always.' }
          ],
            remediations: { 'ohm-s-law-is-v': { steps: ['If the student cannot distinguish definition from law: (1) Revisit Class 10 node c10_phy_cbse_01_003 (Ohm\'s Law.', '(2) Perform the pencil-lead experiment (Diagnostic Q6) and deliberately heat the graphite with high current to see the.', '(3) Write in own words: "Ohm\'s law = R is constant; R = V/I = definition of resistance." (4) Re-attempt Diagnostic Q2.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_003', difficulty: 'standard',
          question: 'Drift velocity is the average velocity acquired by free electrons in.',
          hint: 'If stuck, review c12_phy_cbse_03_001 for current definition and c11_phy_cbse_04_003 for.',
          misconception: 'Students think drift velocity is the speed of individual electrons between collisions (thermal speed ~10⁵ m/s) and that.',
          parts: [
                { id: 'a', prompt: 'Two wires of the same metal and same length but different cross-sectional areas (A₁ > A₂) carry the same current. In which wire is the drift speed larger?', answer: 'Wire with smaller cross-section (A₂) has larger drift speed',
                  options: ['Wire with smaller cross-section (A₂) has larger drift speed', 'thicker wire has more electrons so higher drift speed', 'total charge carriers matter, not carrier density and area'],
                  hint: 'If stuck, review c12_phy_cbse_03_001 for current definition and c11_phy_cbse_04_003 for force on.',
                  misconception: 'Students think drift velocity is the speed of individual electrons between collisions (thermal speed ~10⁵ m/s) and that current requires.' }
          ],
            remediations: { 'drift-velocity-is-the-speed': { steps: ['Revisit the distinction between random thermal motion (zero average velocity) and directed drift.', 'Use the analogy of air molecules in a still room (random motion, no wind) vs.', 'a breeze (small net drift superimposed on random motion).', 'Review the NCERT derivation (Section 3.5) step-by-step: (1) acceleration a = eE/m, (2) velocity after time t: v =.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_004', difficulty: 'standard',
          question: 'Resistivity (ρ) is an intrinsic material property quantifying how strongly.',
          hint: 'If stuck, revisit the drift velocity derivation (c12_phy_cbse_03_003) and the Class 11.',
          misconception: 'Students often believe the linear formula ρ_T = ρ_0[1 + α(T - T_0)] is universally valid for all temperatures, and they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Resistivity (ρ) is an intrinsic material property quantifying how strongly a material',
                  options: ['Resistivity (ρ) is an intrinsic material property quantifying how strongly a material', 'Electric current is the rate of flow of net charge across a cross-sectional area of a', 'Ohm\'s Law states that for a given metallic conductor at constant temperature, the current', 'Drift velocity is the average velocity acquired by free electrons in a conductor due to'],
                  hint: 'If stuck, revisit the drift velocity derivation (c12_phy_cbse_03_003) and the Class 11 kinetic.',
                  misconception: 'Students often believe the linear formula ρ_T = ρ_0[1 + α(T - T_0)] is universally valid for all temperatures, and they apply it to very.' }
          ],
            remediations: { 'the-linear-formula-t-0': { steps: ['If the student exhibits this misconception, have them: (1) Revisit the drift velocity derivation (c12_phy_cbse_03_003).', '(2) Plot ρ vs T for copper using data from a handbook (or NCERT Fig.', '3.8) and observe the non-linear region below 50 K.', '(3) Re-derive the linear approximation from the Taylor expansion of ρ(T) around T_0, emphasizing it is a first-order.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_005', difficulty: 'standard',
          question: 'Kirchhoff\'s Junction Rule states that at any junction in an electrical circuit.',
          hint: 'If stuck, review Ohm\'s law (c12_phy_cbse_03_002) and the concept of emf vs terminal.',
          misconception: 'Students often think the Loop Rule means "the sum of voltage drops equals the sum of emfs" without considering signs.',
          parts: [
                { id: 'a', prompt: 'A circuit has two loops and three unknown currents I₁, I₂, I₃. At junction A, I₁ enters and I₂ and I₃ leave. Write the junction equation.', answer: 'Junction: I₁ = I₂ + I₃',
                  options: ['Junction: I₁ = I₂ + I₃', 'the sum of voltage drops equals the sum of emfs'],
                  hint: 'If stuck, review Ohm\'s law (c12_phy_cbse_03_002) and the concept of emf vs terminal voltage.',
                  misconception: 'Students often think the Loop Rule means "the sum of voltage drops equals the sum of emfs" without considering signs.' }
          ],
            remediations: { 'the-loop-rule-means-the': { steps: ['If a student consistently gets sign errors: (1) Revisit the sign convention: choose a loop traversal direction.', 'For each element, if traversal goes from - to + across a battery, emf is +E; if + to -, emf is -E.', 'For a resistor, if traversal is in the same direction as assumed current, IR drop is -IR; if opposite, +IR.', '(2) Practice with a single-loop circuit containing two batteries of opposite polarity (e.g., 12 V and 6 V with internal.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_006', difficulty: 'standard',
          question: 'The Wheatstone bridge is a circuit arrangement of four resistors (R₁, R₂, R₃.',
          hint: 'If stuck on sign conventions in loop equations, revisit c12_phy_cbse_03_005 and practice.',
          misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the.',
          parts: [
                { id: 'a', prompt: 'State the balance condition of a Wheatstone bridge in terms of the four resistances R₁, R₂, R₃, R₄ where R₁ and R₂ are adjacent arms on one side of the.', answer: 'The balance condition is R₁/R₂ = R₃/R₄ (or equivalently R₂/R₁ = R₄/R₃)',
                  options: ['The balance condition is R₁/R₂ = R₃/R₄ (or equivalently R₂/R₁ = R₄/R₃)', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'If stuck on sign conventions in loop equations, revisit c12_phy_cbse_03_005 and practice the.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' },
                { id: 'b', prompt: 'In a balanced Wheatstone bridge, the galvanometer shows zero deflection.', answer: 'At balance, I_g = 0, so the galvanometer branch carries no current',
                  options: ['At balance, I_g = 0, so the galvanometer branch carries no current', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'If stuck on sign conventions in loop equations, revisit c12_phy_cbse_03_005 and practice the.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' },
                { id: 'c', prompt: 'A Wheatstone bridge has R₁ = 100 Ω, R₂ = 10 Ω, R₃ = 5 Ω, R₄ = 60 Ω (same as NCERT Example 3.7).', answer: 'Step 1: Compare voltage at B and D',
                  options: ['Step 1: Compare voltage at B and D', 'the balance condition changes if the battery and galvanometer are swapped (i'],
                  hint: 'If stuck on sign conventions in loop equations, revisit c12_phy_cbse_03_005 and practice the.',
                  misconception: 'Students often write the balance condition as R₁/R₃ = R₂/R₄ (pairing opposite arms instead of adjacent arms in the diamond).' }
          ],
            remediations: { 'students-often-write-the-balance': { steps: ['If the student cannot derive the balance condition or misidentifies the ratio arms: 1.', 'Revisit c12_phy_cbse_03_005 (Kirchhoff\'s Laws) — practice writing junction rule at B and D, and loop rule for ADBA and.', 'Draw the bridge as two separate voltage dividers side by side: left divider (R₁, R₂) across battery, right divider (R₃.', 'The galvanometer connects the midpoints.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
