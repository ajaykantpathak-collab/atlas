import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch01_p1: SimDef = {
    id: 'v3_c10_phy_ch01_p1',
    title: 'Electricity',
    subtitle: 'Build circuits, measure current, and learn why your house wiring is designed the way it is.',
    classLevel: 10, subject: 'physics', topic: 'Electricity · Part 1/2',
    chapters: ['c10_phy_ch01'],
    nodeIds: ['c10_phy_cbse_01_001', 'c10_phy_cbse_01_002', 'c10_phy_cbse_01_003', 'c10_phy_cbse_01_004', 'c10_phy_cbse_01_005', 'c10_phy_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an apprentice electrician checking a newly wired room', intro: 'A house has tripped its breaker three times this week. Your job: find what\'s wrong with the circuit logic before anyone touches a wire.', goal: 'Predict current, voltage and resistance in any circuit you build — and explain why series and parallel behave so differently.' },
    discovery: {
        question: 'Two identical bulbs — one wired in series, one in parallel. Which setup glows brighter, and why does the answer surprise most people?',
        options: ['Parallel — each bulb gets the full voltage', 'Series — the current is stronger', 'They glow the same — bulbs are identical', 'Series — the voltage adds up'],
        answer: 'Parallel — each bulb gets the full voltage',
        hook: 'Most students think \'more components = more power\'. In series the current must fight through both bulbs — parallel gives each its own path.',
    },
    teaching: [
        { title: 'Electric Current: Definition and Unit (Ampere)', text: 'Electric current is the rate of flow of electric charge through a conductor. It is defined as the amount of charge (Q) passing through a cross-section of a conductor per unit time (t).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_01_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'On the circuit lab: build a series and a parallel circuit — measure what happens to brightness when you remove one bulb from each.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_001', title: 'Electric Current: Definition and Unit (Ampere)',
          scaffold: { problem: 'A lightning bolt carries a charge of 15 C from cloud to ground in 0.001 seconds (1 ms).',
            steps: [
            { text: 'Identify given quantities: Q = 15 C, t = 0.001 s. To find: I in A and kA.' },
            { text: 'Recall formula I = Q/t. Check units: C/s = A. Time is already in seconds (SI unit).' },
            { text: 'Substitute values: I = 15 C / 0.001 s = 15 / (1/1000) = 15 × 1000 = 15000 A.' },
            { text: 'Convert to kiloamperes: 1 kA = 1000 A, so 15000 A = 15 kA.' },
            { text: 'Verify: Lightning currents are typically 10–100 kA; 15 kA is physically reasonable.', faded: true, blankAnswer: '15000 A or 15 kA' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_002', title: 'Electric Potential and Potential Difference (Volt)',
          scaffold: { problem: 'A 12 V car battery delivers 3600 J of energy to the starter motor. How much charge passes through the battery during this process?',
            steps: [
            { text: 'Identify given quantities: V = 12 V (potential difference of battery), W = 3600 J (work done/energy delivered).' },
            { text: 'Recall the formula relating V, W, and Q: V = W/Q. Rearrange for Q: Q = W/V. Check units: J / V = J / (J/C) = C.' },
            { text: 'Substitute values with units: Q = 3600 J / 12 V.' },
            { text: 'Compute: 3600 / 12 = 300. Unit: J/V = C. So Q = 300 C.' },
            { text: 'Verify reasonableness: A car battery typically delivers hundreds of coulombs to start an engine.', faded: true, blankAnswer: '300 C' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_003', title: 'Ohm\'s Law: Statement, Formula and V-I Graph',
          scaffold: { problem: 'A student connects a 6 V battery across a uniform nichrome wire of length 50 cm. The ammeter reads 0.8 A.',
            steps: [
            { text: 'Identify given quantities: V = 6 V, I = 0.8 A. Find R = ?' },
            { text: 'Use Ohm\'s Law: R = V/I. Check units: volts/amperes = ohms.' },
            { text: 'Substitute: R = 6 V / 0.8 A = 7.5 Ω.' },
            { text: 'For stretched wire: length doubles (l₂ = 2l₁), volume constant ⇒ cross-sectional area halves (A₂ = A₁/2).' },
            { text: 'Verify: 30 Ω is reasonable (4 times original). Answer with units.', faded: true, blankAnswer: 'Initial resistance = 7.5 Ω; New resistance after stretching.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_004', title: 'Resistance: Definition and Factors Affecting It',
          scaffold: { problem: 'A student connects a 12 V battery across a uniform wire of length 4 m and cross-sectional area 0.2 mm². The ammeter reads 0.6 A.',
            steps: [
            { text: 'Identify given quantities: V = 12 V, I = 0.6 A, L₁ = 4 m, A₁ = 0.2 mm² = 0.2 × 10⁻⁶ m², A₂ = 0.4 mm² = 0.4 × 10⁻⁶ m².' },
            { text: 'Use Ohm\'s law: R₁ = V/I = 12 V / 0.6 A = 20 Ω.' },
            { text: 'Resistance is inversely proportional to cross-sectional area: R ∝ 1/A. So R₂/R₁ = A₁/A₂ = (0.2)/(0.4) = 1/2.' },
            { text: 'Compute R₂ = R₁ × (1/2) = 20 Ω × 0.5 = 10 Ω.' },
            { text: 'Verify: thicker wire (double area) should have half the resistance. 10 Ω is half of 20 Ω, physically reasonable.', faded: true, blankAnswer: 'R₁ = 20 Ω, R₂ = 10 Ω' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_005', title: 'Resistivity: Material Dependence of Resistance',
          scaffold: { problem: 'A wire of length 1 m and cross-sectional area 2 × 10⁻⁶ m² has a resistance of 0.085 Ω.',
            steps: [
            { text: 'Given: R = 0.085 Ω, L = 1 m, A = 2 × 10⁻⁶ m².' },
            { text: 'Formula: ρ = RA/L.' },
            { text: 'Substitute: ρ = (0.085 × 2 × 10⁻⁶) / 1 = 1.7 × 10⁻⁷ Ω·m.' },
            { text: 'Compare with known values: This is close to copper (1.68 × 10⁻⁸) but higher.' },
            { text: 'The resistivity is 1.7 × 10⁻⁷ Ω·m.', faded: true, blankAnswer: 'ρ = 1.7 × 10⁻⁷ Ω·m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_006', title: 'Resistance of a System of Resistors: Series Combination',
          scaffold: { problem: 'A household circuit has a 240 V mains supply. Three appliances — a 40 Ω heater, a 60 Ω fan, and a 20 Ω lamp — are connected in series.',
            steps: [
            { text: 'Identify given quantities: V = 240 V, R_1 = 40 Ω (heater), R_2 = 60 Ω (fan), R_3 = 20 Ω (lamp).' },
            { text: 'Use series formula R_s = R_1 + R_2 + R_3. Check units: all in Ω, sum in Ω.' },
            { text: 'Substitute: R_s = 40 + 60 + 20 = 120 Ω.' },
            { text: 'Apply Ohm\'s law for total circuit: I = V / R_s = 240 V / 120 Ω = 2 A. Unit: V/Ω = A.' },
            { text: 'Voltage across fan: V_2 = I × R_2 = 2 A × 60 Ω = 120 V. Unit: A×Ω = V.' },
            { text: 'Power of lamp: P_3 = I² × R_3 = (2 A)² × 20 Ω = 4 × 20 = 80 W. Unit: A²×Ω = W.' },
            { text: 'Verify: Sum of voltages = I(R_1+R_2+R_3) = 2×120 = 240 V ✓. Power total = I²R_s = 4×120 = 480 W.', faded: true, blankAnswer: '(a) 120 Ω, (b) 2 A, (c) 120 V, (d) 80 W' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student builds a simple circuit — battery, switch, one long wire, a bulb. She adds a second ammeter far from the battery and predicts it will read lower, \'because some of the current gets used up travelling along the long wire.\'',
            decisions: [{ prompt: 'Will the far ammeter really read lower?', options: [
                { text: 'No — current is the rate of flow of charge, and charge is neither created nor used up in the wire. In a single loop the same charge per second must pass every point, so both ammeters read the same; the wire\'s resistance affects how much current flows, but not \'how much survives\' the journey.', outcome: 'The bulb is dimmer or brighter because the whole circuit\'s current changed — not because current leaks away along the path. What enters the wire must leave it.' },
                { text: 'She is right — the farther ammeter reads lower since current is consumed by the wire on the way.', outcome: 'Current is not a substance that gets spent — it is the flow of charge itself, and charge conservation forces the same reading at every point in one loop.', reveals: 'current-gets-used-up' },
                { text: 'The second ammeter will read higher, because charge piles up waiting to get through the long wire.', outcome: 'Charge cannot accumulate in a steady circuit — it flows through continuously at the same rate everywhere, so neither end can read higher.', reveals: 'charge-piles-up' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ohm\'s law isn\'t a formula to memorise — it\'s the reason your house is wired in parallel and why a fuse is a calculated sacrifice.',
            decisions: [{ prompt: 'What comes next? Electricity · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Electricity · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_001', difficulty: 'standard',
          question: 'Electric current is the rate of flow of electric charge through a conductor.',
          hint: 'If stuck, revisit Class 8 node c8_physics_ch2_6 (Heating Effect of Electric Current.',
          misconception: 'Students often think "current gets used up" in a circuit — e.g., "current is less after passing through a bulb because.',
          parts: [
                { id: 'a', prompt: 'A charge of 300 coulombs passes through a cross-section of a wire in 5 minutes. Calculate the electric current in amperes. Show all steps with units.', answer: 'Given: Q = 300 C, t = 5 min = 5 × 60 = 300 s',
                  options: ['Given: Q = 300 C, t = 5 min = 5 × 60 = 300 s', 'current gets used up', 'current is less after passing through a bulb', '"current gets used up" in a circuit'],
                  hint: 'If stuck, revisit Class 8 node c8_physics_ch2_6 (Heating Effect of Electric Current: Joule\'s Law).',
                  misconception: 'Students often think "current gets used up" in a circuit — e.g., "current is less after passing through a bulb because the bulb consumes.' },
                { id: 'b', prompt: 'Two wires A and B carry currents of 2 A and 3 A respectively. Wire A has a cross-sectional area twice that of wire B.', answer: 'For wire A: Q_A = I_A × t = 2 A × 10 s = 20 C',
                  options: ['For wire A: Q_A = I_A × t = 2 A × 10 s = 20 C', 'wire A has more charge', 'current gets used up', 'current is less after passing through a bulb'],
                  hint: 'If stuck, revisit Class 8 node c8_physics_ch2_6 (Heating Effect of Electric Current: Joule\'s Law).',
                  misconception: 'Students often think "current gets used up" in a circuit — e.g., "current is less after passing through a bulb because the bulb consumes.' }
          ],
            remediations: { 'current-gets-used-up-in': { steps: ['If the student believes current gets used up, do this: Set up a series circuit with a battery, a switch, an ammeter.', 'Measure current before the bulb (between battery and bulb) and after the bulb (between bulb and battery).', 'The ammeter reads the same.', 'Then ask: "If charge was consumed, where did the electrons go?" They must be flowing continuously.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "current gets used up" in a circuit — e.g., "current is less after passing through a bulb because.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a battery, an ammeter, a switch, and a conducting wire to demonstrate that current is the same at all points in a series.', answer: 'Circuit: Battery → Switch → Ammeter → Wire → back to Battery (all in series)',
                  options: ['Circuit: Battery → Switch → Ammeter → Wire → back to Battery (all in series)', 'current gets used up', 'current is less after passing through a bulb', '"current gets used up" in a circuit'],
                  hint: 'If stuck, revisit Class 8 node c8_physics_ch2_6 (Heating Effect of Electric Current: Joule\'s Law).',
                  misconception: 'Students often think "current gets used up" in a circuit — e.g., "current is less after passing through a bulb because the bulb consumes.' }
          ],
            remediations: { 'current-gets-used-up-in': { steps: ['If the student believes current gets used up, do this: Set up a series circuit with a battery, a switch, an ammeter.', 'Measure current before the bulb (between battery and bulb) and after the bulb (between bulb and battery).', 'The ammeter reads the same.', 'Then ask: "If charge was consumed, where did the electrons go?" They must be flowing continuously.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_002', difficulty: 'standard',
          question: 'Electric potential at a point in an electric field is the work done per unit.',
          hint: 'If stuck, review Class 9 Work and Energy chapter (c9_physics_ch4_1 and c9_physics_ch4_6).',
          misconception: 'Students believe "potential difference is the same as voltage drop across a resistor only when current flows" and think.',
          parts: [
                { id: 'a', prompt: 'A student says: "Potential difference is the same as electric potential." Is this correct? Explain why or why not using the concept of reference point.', answer: 'No, it is not correct',
                  options: ['No, it is not correct', 'they are the same', 'terminal voltage vs emf', 'an open circuit has zero potential difference across the battery terminals'],
                  hint: 'If stuck, review Class 9 Work and Energy chapter (c9_physics_ch4_1 and c9_physics_ch4_6) — focus.',
                  misconception: 'Students believe "potential difference is the same as voltage drop across a resistor only when current flows" and think an open circuit has.' },
                { id: 'b', prompt: 'A charge of 50 C is moved between two points in a circuit. If the work done is 600 J, calculate the potential difference between the points.', answer: 'Given: Q = 50 C, W = 600 J',
                  options: ['Given: Q = 50 C, W = 600 J', 'terminal voltage vs emf', 'an open circuit has zero potential difference across the battery terminals'],
                  hint: 'If stuck, review Class 9 Work and Energy chapter (c9_physics_ch4_1 and c9_physics_ch4_6) — focus.',
                  misconception: 'Students believe "potential difference is the same as voltage drop across a resistor only when current flows" and think an open circuit has.' },
                { id: 'c', prompt: 'Two points A and B in a circuit have potentials +12 V and +5 V respectively (relative to ground). A positive charge moves from A to B.', answer: 'What is the potential difference V_AB?',
                  options: ['What is the potential difference V_AB?', 'loses kinetic energy', 'terminal voltage vs emf', 'an open circuit has zero potential difference across the battery terminals'],
                  hint: 'If stuck, review Class 9 Work and Energy chapter (c9_physics_ch4_1 and c9_physics_ch4_6) — focus.',
                  misconception: 'Students believe "potential difference is the same as voltage drop across a resistor only when current flows" and think an open circuit has.' }
          ],
            remediations: { 'potential-difference-is-the-same': { steps: ['Revisit Class 8 (c8_physics_ch2_6) Joule\'s law activity — measure voltage across a cell with open and closed circuits.', 'Compare readings: open circuit shows higher voltage (emf), closed circuit shows lower (terminal voltage).', 'Explain using energy: inside the cell, chemical work is done per unit charge (emf); when current flows, some energy.', 'Practice board-style numerical: "A cell of emf 1.5 V and internal resistance 0.5 Ω delivers 0.2 A.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_003', difficulty: 'standard',
          question: 'Ohm\'s Law states that the electric current flowing through a conductor.',
          hint: 'If stuck, revisit c10_phy_cbse_01_001 (current definition) and c10_phy_cbse_01_002.',
          misconception: 'Students often think Ohm\'s Law applies to all electrical components (e.g., LED, filament bulb, diode).',
          parts: [
                { id: 'a', prompt: 'A student plots a V-I graph for a nichrome wire and gets a straight line passing through the origin with a slope of 5 Ω.', answer: 'The slope will double to 10 Ω',
                  options: ['The slope will double to 10 Ω', 'slope remains 5 Ω', 'slope halves', 'Ohm\'s Law applies to all electrical components (e'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_001 (current definition) and c10_phy_cbse_01_002 (potential.',
                  misconception: 'Students often think Ohm\'s Law applies to all electrical components (e.g., LED, filament bulb, diode).' },
                { id: 'b', prompt: 'An electric iron draws a current of 4.5 A when connected to a 220 V mains supply. Calculate the resistance of the iron\'s heating element.', answer: 'Given: \\( V = 220 \\, \\text{V} \\), \\( I = 4.5 \\, \\text{A} \\)',
                  options: ['Given: \\( V = 220 \\, \\text{V} \\), \\( I = 4.5 \\, \\text{A} \\)', 'Ohm\'s Law applies to all electrical components (e'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_001 (current definition) and c10_phy_cbse_01_002 (potential.',
                  misconception: 'Students often think Ohm\'s Law applies to all electrical components (e.g., LED, filament bulb, diode).' },
                { id: 'c', prompt: 'Two students, A and B, perform the Ohm\'s Law experiment with the same nichrome wire. Student A uses a 0-12 V power supply and takes 6 readings.', answer: 'The slopes will be the same',
                  options: ['The slopes will be the same', 'Student A\'s slope is larger', 'Ohm\'s Law applies to all electrical components (e'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_001 (current definition) and c10_phy_cbse_01_002 (potential.',
                  misconception: 'Students often think Ohm\'s Law applies to all electrical components (e.g., LED, filament bulb, diode).' }
          ],
            remediations: { 'ohm-s-law-applies-to': { steps: ['Show the student a V-I graph of a filament bulb (curved) and a nichrome wire (straight) side by side.', 'Ask: "Does the bulb obey V = IR?" Guide them to see that for the bulb, V/I is not constant — it changes with current.', 'Explain that the bulb\'s filament heats up, changing its resistance, so temperature is not constant.', 'Have them re-read the condition "provided temperature remains constant" in the definition.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_004', difficulty: 'standard',
          question: 'Resistance is the property of a conductor that opposes the flow of electric.',
          hint: 'If stuck, review node c10_phy_cbse_01_003 (Ohm\'s Law) and practice V-I graph.',
          misconception: 'Students often think that resistance depends only on the material and not on dimensions.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of resistance? Define resistance in terms of potential difference and current.', answer: 'The SI unit of resistance is the ohm (Ω)',
                  options: ['The SI unit of resistance is the ohm (Ω)', 'ampere', 'resistance depends only on the material and not on dimensions'],
                  hint: 'If stuck, review node c10_phy_cbse_01_003 (Ohm\'s Law) and practice V-I graph interpretation and.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' },
                { id: 'b', prompt: 'A student says: "If I increase the length of a wire, its resistance decreases because the current has more space to flow." Explain why this statement.', answer: 'Resistance is directly proportional to the length of the conductor',
                  options: ['Resistance is directly proportional to the length of the conductor', 'resistance depends only on the material and not on dimensions'],
                  hint: 'If stuck, review node c10_phy_cbse_01_003 (Ohm\'s Law) and practice V-I graph interpretation and.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' },
                { id: 'c', prompt: 'A nichrome wire of length 2 m and cross-sectional area 0.5 mm² has a resistance of 10 Ω when a potential difference of 5 V is applied across it.', answer: 'Given: V = 5 V, R = 10 Ω',
                  options: ['Given: V = 5 V, R = 10 Ω', 'resistance depends only on the material and not on dimensions'],
                  hint: 'If stuck, review node c10_phy_cbse_01_003 (Ohm\'s Law) and practice V-I graph interpretation and.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' },
                { id: 'd', prompt: 'Two wires A and B are made of the same material and have the same length. Wire A has twice the cross-sectional area of wire B.', answer: 'Resistance is inversely proportional to cross-sectional area',
                  options: ['Resistance is inversely proportional to cross-sectional area', 'thicker wire has more resistance', 'resistance depends only on the material and not on dimensions'],
                  hint: 'If stuck, review node c10_phy_cbse_01_003 (Ohm\'s Law) and practice V-I graph interpretation and.',
                  misconception: 'Students often think that resistance depends only on the material and not on dimensions.' }
          ],
            remediations: { 'resistance-depends-only-on-the': { steps: ['Revisit the water pipe analogy from Class 6 (c6_physics_ch03_014): a longer pipe offers more opposition to water flow.', 'Perform a quick lab activity: take a uniform wire, measure resistance at lengths 10 cm, 20 cm, 30 cm (using multimeter.', 'Take wires of same material and length but different thicknesses (e.g., 24 gauge, 28 gauge).', 'Write the proportionalities: R ∝ L, R ∝ 1/A.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_005', difficulty: 'standard',
          question: 'Resistivity (ρ) is an intrinsic property of a material that measures how.',
          hint: 'Review resistance and Ohm\'s law (c10_phy_cbse_01_004). Practice distinguishing "what the.',
          misconception: 'Students often confuse resistance and resistivity. Resistance (R) depends on the material AND the dimensions (length.',
          parts: [
                { id: 'a', prompt: 'Define resistivity and state its SI unit.', answer: 'Resistivity (ρ) is the resistance of a material per unit length and per unit',
                  options: ['Resistivity (ρ) is the resistance of a material per unit length and per unit', 'resistivity is the same as resistance'],
                  hint: 'Review resistance and Ohm\'s law (c10_phy_cbse_01_004). Practice distinguishing "what the material.',
                  misconception: 'Students often confuse resistance and resistivity. Resistance (R) depends on the material AND the dimensions (length, area); resistivity.' },
                { id: 'b', prompt: 'Two wires of the same material have the same length but different cross-sectional areas A₁ = 2A₂. How do their resistivities compare?', answer: 'The resistivities are EQUAL',
                  options: ['The resistivities are EQUAL', 'ρ₁ = 2ρ₂'],
                  hint: 'Review resistance and Ohm\'s law (c10_phy_cbse_01_004). Practice distinguishing "what the material.',
                  misconception: 'Students often confuse resistance and resistivity. Resistance (R) depends on the material AND the dimensions (length, area); resistivity.' }
          ],
            remediations: { 'students-often-confuse-resistance-and': { steps: ['Emphasise: resistivity = material property; resistance = depends on material + dimensions.', 'Practice the formula ρ = RA/L with different units (mm², cm, etc.) and convert correctly.', 'For stretching problems: if volume is constant, L doubles → A halves → R quadruples.', 'Compare resistivity values: conductors (10⁻⁸), alloys (10⁻⁶), insulators (10¹³) — understand the range.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_006', difficulty: 'standard',
          question: 'In a series combination of resistors, the same current flows through each.',
          hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c6_physics_ch03_017 (Series.',
          misconception: 'Students think that in a series circuit, the resistor with the largest resistance "gets" the most current, or that.',
          parts: [
                { id: 'a', prompt: 'In a series circuit with two resistors R_1 and R_2 connected to a battery, the current through R_1 is measured as 0.5 A. What is the current through R_2?', answer: 'Current through R_2 is also 0.5 A',
                  options: ['Current through R_2 is also 0.5 A', 'depends on resistance', 'current divides in series like voltage, confusing series with parallel behavior'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c6_physics_ch03_017 (Series Circuits: One.',
                  misconception: 'Students think that in a series circuit, the resistor with the largest resistance "gets" the most current, or that current decreases as.' },
                { id: 'b', prompt: 'Two identical resistors of resistance R each are connected in series to a battery of voltage V. The power dissipated in the combination is P_series.', answer: 'P_parallel = 4 × P_series',
                  options: ['P_parallel = 4 × P_series', 'P_series larger'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c6_physics_ch03_017 (Series Circuits: One.',
                  misconception: 'Students think that in a series circuit, the resistor with the largest resistance "gets" the most current, or that current decreases as.' }
          ],
            remediations: { 'in-a-series-circuit': { steps: ['Use a single loop of wire with a battery and two bulbs of different brightness (different resistances).', 'Explain that charge cannot accumulate or disappear — what goes in must come out.', 'Analogize to a bicycle chain: all links move at same speed regardless of gear size.', 'Re-derive I = Q/t — same charge per second passes every cross-section.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
