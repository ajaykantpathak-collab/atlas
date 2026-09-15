import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch11_p1: SimDef = {
    id: 'v3_c11_phy_ch11_p1',
    title: 'Thermodynamics · Part 1/2',
    subtitle: 'Learn that a steady temperature can mean bustling exchange, not isolation.',
    classLevel: 11, subject: 'physics', topic: 'Thermodynamics · Part 1/2',
    chapters: ['c11_phy_ch11'],
    nodeIds: ['c11_phy_cbse_11_001', 'c11_phy_cbse_11_002', 'c11_phy_cbse_11_003', 'c11_phy_cbse_11_004', 'c11_phy_cbse_11_005', 'c11_phy_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a thermodynamicist drawing system boundaries', intro: 'Is a sealed lunchbox closed? Is your body? The answer depends on what crosses a boundary you get to choose.', goal: 'Classify thermodynamic systems and justify the Zeroth Law as the foundation of temperature.' },
    discovery: {
        question: '\'The human body is an isolated system — it holds a steady 37 °C.\' Sound classification?',
        options: ['No — it eats, breathes, sweats and radiates: an open system whose constant temperature is active regulation, not isolation', 'Yes — constant temperature means no exchange', 'Yes — skin is a sealed boundary', 'No — it\'s a closed system, which means isolated'],
        answer: 'No — it eats, breathes, sweats and radiates: an open system whose constant temperature is active regulation, not isolation',
        hook: 'And the Zeroth Law isn\'t a triviality — it makes \'same temperature\' well-defined, which is the only reason a thermometer means anything.',
    },
    teaching: [
        { title: 'Thermodynamic System and Surroundings', text: 'A thermodynamic system is a specific portion of the universe (a definite quantity of matter or a region in space) chosen for thermodynamic analysis, separated from the rest of the universe by a real.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_11_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Sort a gas expanding into vacuum, a thermos and the human body into open/closed/isolated, then defend why thermal equilibrium needs a stated law.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_001', title: 'Thermodynamic System and Surroundings',
          caseStudy: { intro: 'Observe a pressure cooker on a stove: the water and steam inside constitute the **system**, the metal pot is the **boundary**, and the kitchen air, stove.',
            decisions: [{ prompt: 'Define a thermodynamic system, surroundings, and boundary. Give one example each of a diathermic boundary and an adiabatic boundary from.', options: [
                { text: 'A thermodynamic system is the part of the universe under study', outcome: 'A thermodynamic system is the part of the universe under study; surroundings are everything else.' },
                { text: 'closed system', outcome: 'Not quite — Students often think a "closed system" means no energy transfer at all (confusing it with isolated.', reveals: 'a-closed-system-means-no' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_002', title: 'Zeroth Law of Thermodynamics: Thermal Equilibrium',
          caseStudy: { intro: 'Begin with a familiar observation: when you place a cold steel spoon into a hot cup of chai, the spoon warms up and the chai cools slightly until both feel the.',
            decisions: [{ prompt: 'State the Zeroth Law of Thermodynamics in your own words and name the thermodynamic variable it allows us to define.', options: [
                { text: 'The Zeroth Law: If system A is in thermal equilibrium with system C, and system B is also', outcome: 'The Zeroth Law: If system A is in thermal equilibrium with system C, and system B is also.' },
                { text: 'heat becomes equal', outcome: 'Not quite — Students often believe that "thermal equilibrium means the systems have the same internal energy".', reveals: 'thermal-equilibrium-means-the-systems' },
                { text: 'thermal equilibrium means the systems have the same internal energy', outcome: 'Not quite — Students often believe that "thermal equilibrium means the systems have the same internal energy".', reveals: 'thermal-equilibrium-means-the-systems' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_003', title: 'First Law of Thermodynamics: Internal Energy',
          scaffold: { problem: 'A gas in a cylinder fitted with a frictionless piston expands isobarically at 2.0 × 10⁵ Pa from 0.010 m³ to 0.030 m³.',
            steps: [
            { text: 'Identify given: P = 2.0 × 10⁵ Pa (constant), V₁ = 0.010 m³, V₂ = 0.030 m³, ΔQ = +6000 J (heat supplied), n = 2.0 mol.' },
            { text: 'For isobaric process, work done by gas ΔW = P ΔV = P (V₂ – V₁). Check units: Pa × m³ = (N/m²) × m³ = N·m = J.' },
            { text: 'Compute ΔW = (2.0 × 10⁵) × (0.030 – 0.010) = 2.0 × 10⁵ × 0.020 = 4000 J.' },
            { text: 'Apply First Law: ΔQ = ΔU + ΔW → 6000 = ΔU + 4000 → ΔU = +2000 J.' },
            { text: 'For ideal gas, ΔU = n C_V ΔT. For monoatomic ideal gas C_V = 3R/2 = 12.465 J mol⁻¹ K⁻¹.', faded: true, blankAnswer: '(a) ΔW = 4000 J, (b) ΔU = 2000 J, (c) T₂ = 380 K (approx)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_004', title: 'Work Done in Isothermal Process',
          scaffold: { problem: 'A cylinder fitted with a frictionless piston contains 0.5 moles of oxygen gas at 300 K.',
            steps: [
            { text: 'Identify given quantities: μ = 0.5 mol, T = 300 K, V₁ = 2.0 × 10⁻³ m³, V₂ = 0.5 × 10⁻³ m³.' },
            { text: 'Write the formula for work done BY the gas in isothermal process: W_by = μRT ln(V₂/V₁).' },
            { text: 'Substitute values with units: W_on = (0.5 mol) × (8.31 J mol⁻¹ K⁻¹) × (300 K) × ln(2.0 × 10⁻³ / 0.5 × 10⁻³).' },
            { text: 'Compute the volume ratio: V₁/V₂ = (2.0 × 10⁻³) / (0.5 × 10⁻³) = 4. ln(4) = 2 ln(2) ≈ 2 × 0.693 = 1.386.' },
            { text: 'Verify: Compression requires work input, so positive work done on gas is physically reasonable.', faded: true, blankAnswer: '1.73 kJ (work done on the gas)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_005', title: 'Work Done in Adiabatic Process',
          scaffold: { problem: 'A diesel engine compresses air (assume diatomic ideal gas, γ = 1.4) adiabatically.',
            steps: [
            { text: 'Identify given quantities and convert to SI units. V₁ = 500 cm³ = 5.0 × 10⁻⁴ m³. V₂ = V₁/15 = 3.33 × 10⁻⁵ m³.' },
            { text: 'Use adiabatic relation P₁V₁^γ = P₂V₂^γ to find P₂. P₂ = P₁(V₁/V₂)^γ = (1.0 × 10⁵) × (15)^1.4.' },
            { text: 'Use ideal gas law or adiabatic T-V relation to find T₂. T₂ = T₁(V₁/V₂)^{γ-1} = 300 × (15)^{0.4}. 15^0.4 ≈ 2.95.' },
            { text: 'Calculate work done BY the gas: W_by = (P₁V₁ - P₂V₂)/(γ - 1). P₁V₁ = (1.0 × 10⁵)(5.0 × 10⁻⁴) = 50 J.' },
            { text: 'Work done ON the gas = -W_by = +244 J. Verify with temperature formula: μ = P₁V₁/(RT₁) = 50/(8.31×300) ≈ 0.020 mol.', faded: true, blankAnswer: '(a) P₂ ≈ 4.4 × 10⁶ Pa (44 atm), (b) T₂ ≈ 885 K, (c) Work.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_006', title: 'Specific Heat Capacity of Gases: Cp and Cv',
          scaffold: { problem: '0.5 moles of oxygen gas (assumed ideal) is heated at constant volume from 27°C to 87°C. The heat supplied is 1250 J.',
            steps: [
            { text: 'Identify given quantities: μ = 0.5 mol, T₁ = 27°C = 300 K, T₂ = 87°C = 360 K, ΔT = 60 K, ΔQ = 1250 J.' },
            { text: 'Recall formula for Cᵥ at constant volume: Cᵥ = ΔQ / (μ ΔT).' },
            { text: 'Substitute values with units: Cᵥ = 1250 J / (0.5 mol × 60 K) = 1250 / 30 = 41.67 J mol⁻¹ K⁻¹.' },
            { text: 'Use Mayer\'s relation for ideal gas: Cₚ = Cᵥ + R = 41.67 + 8.31 = 49.98 J mol⁻¹ K⁻¹.' },
            { text: 'Verify units: J/(mol·K) for both. Check physical reasonableness: Cₚ > Cᵥ, values are typical for diatomic gases.' },
            { text: 'State final answers: Cᵥ = 41.7 J mol⁻¹ K⁻¹, Cₚ = 50.0 J mol⁻¹ K⁻¹.', faded: true, blankAnswer: 'Cᵥ = 41.7 J mol⁻¹ K⁻¹, Cₚ = 50.0 J mol⁻¹ K⁻¹' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a pressure cooker in a thermodynamics lab, a student calls it \'an isolated system — the lid is shut, so nothing crosses the boundary.\' He also says two copper blocks at 300 K can\'t be in thermal equilibrium \'because the 10 kg block has far more energy.\'',
            decisions: [{ prompt: 'What do the system and equilibrium definitions say?', options: [
                { text: 'Classify by what crosses the boundary: the cooker\'s metal wall is diathermic — heat flows, mass doesn\'t — so it\'s closed, not isolated; a thermos approximates isolated, an open beaker losing steam is open. And thermal equilibrium needs equal TEMPERATURE, not equal internal energy — the blocks at 300 K are in equilibrium despite hugely different energies; the Zeroth Law makes temperature the tag of equilibrium classes.', outcome: 'He draws boundaries correctly: closed ≠ isolated, and equilibrium is a temperature statement, not an energy-amount statement.' },
                { text: 'Keep \'isolated\' — a sealed lid means nothing gets in or out.', outcome: 'Sealing stops mass, not energy: heat conducts through the metal — closed system; isolation would need an adiabatic boundary.', reveals: 'closed-equals-isolated' },
                { text: 'Agree on the blocks — equilibrium means equal energy, so the bigger block isn\'t equilibrated.', outcome: 'Internal energy is extensive — it scales with mass; equilibrium only requires equal temperature, which both blocks share.', reveals: 'equilibrium-needs-equal-energy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'A closed system swaps energy, an open one swaps matter too, an isolated one swaps nothing — the boundary is often imaginary but the classification is not.',
            decisions: [{ prompt: 'What comes next? Thermodynamics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Thermodynamics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_001', difficulty: 'standard',
          question: 'A thermodynamic system is a specific portion of the universe (a definite.',
          hint: 'If stuck, revisit Class 9 Work and Energy (c9_physics_ch4_1, c9_physics_ch4_3) and Class.',
          misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).',
          parts: [
                { id: 'a', prompt: 'Define a thermodynamic system, surroundings, and boundary. Give one example each of a diathermic boundary and an adiabatic boundary from daily life.', answer: 'A thermodynamic system is the part of the universe under study',
                  options: ['A thermodynamic system is the part of the universe under study', 'closed system'],
                  hint: 'If stuck, revisit Class 9 Work and Energy (c9_physics_ch4_1, c9_physics_ch4_3) and Class 6/7 Heat.',
                  misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).' },
                { id: 'b', prompt: 'A gas is confined in a cylinder with a movable piston. The cylinder walls are perfectly insulating, but the piston is made of a perfectly conducting material.', answer: 'Closed system',
                  options: ['Closed system', 'isolated'],
                  hint: 'If stuck, revisit Class 9 Work and Energy (c9_physics_ch4_1, c9_physics_ch4_3) and Class 6/7 Heat.',
                  misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).' },
                { id: 'c', prompt: 'Two identical containers A and B hold the same gas at the same pressure and volume.', answer: 'In A (adiabatic wall): no heat flow, so gas temperature remains T',
                  options: ['In A (adiabatic wall): no heat flow, so gas temperature remains T', 'closed system'],
                  hint: 'If stuck, revisit Class 9 Work and Energy (c9_physics_ch4_1, c9_physics_ch4_3) and Class 6/7 Heat.',
                  misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).' }
          ],
            remediations: { 'a-closed-system-means-no': { steps: ['If a student cannot distinguish system types, use the "mass/energy flowchart": Draw a box (system).', 'Ask: "Does mass cross the box?" Yes → Open.', 'No → "Does energy (heat/work) cross?" Yes → Closed.', 'For boundary types: touch a metal spoon and a plastic spoon in hot water – metal feels hot (diathermic), plastic.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).',
          parts: [
                { id: 'a', prompt: 'A student claims: "The human body is an isolated system because it maintains a constant temperature of 37°C." Evaluate this statement.', answer: 'The claim is false',
                  options: ['The claim is false', 'constant temperature', 'no energy/matter exchange', 'closed system'],
                  hint: 'If stuck, revisit Class 9 Work and Energy (c9_physics_ch4_1, c9_physics_ch4_3) and Class 6/7 Heat.',
                  misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).' },
                { id: 'b', prompt: 'Design a simple classroom experiment using a syringe (sealed at the tip) and a thermometer to demonstrate the difference between a closed system with a movable.', answer: 'Experiment: (1) Seal syringe tip, place thermometer at tip (or use infrared)',
                  options: ['Experiment: (1) Seal syringe tip, place thermometer at tip (or use infrared)', 'closed system'],
                  hint: 'If stuck, revisit Class 9 Work and Energy (c9_physics_ch4_1, c9_physics_ch4_3) and Class 6/7 Heat.',
                  misconception: 'Students often think a "closed system" means no energy transfer at all (confusing it with isolated system).' }
          ],
            remediations: { 'a-closed-system-means-no': { steps: ['If a student cannot distinguish system types, use the "mass/energy flowchart": Draw a box (system).', 'Ask: "Does mass cross the box?" Yes → Open.', 'No → "Does energy (heat/work) cross?" Yes → Closed.', 'For boundary types: touch a metal spoon and a plastic spoon in hot water – metal feels hot (diathermic), plastic.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_002', difficulty: 'standard',
          question: 'The Zeroth Law of Thermodynamics states that if two thermodynamic systems are.',
          hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c11_phy_cbse_11_001 (Thermodynamic.',
          misconception: 'Students often believe that "thermal equilibrium means the systems have the same internal energy" or "the same heat.',
          parts: [
                { id: 'a', prompt: 'Two identical gas cylinders A and B are connected by a thin copper tube (diathermic).', answer: 'Heat flows from B (hotter) to A (colder) through the copper tube',
                  options: ['Heat flows from B (hotter) to A (colder) through the copper tube', 'thermal equilibrium means the systems have the same internal energy', 'the same heat content'],
                  hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c11_phy_cbse_11_001 (Thermodynamic System and.',
                  misconception: 'Students often believe that "thermal equilibrium means the systems have the same internal energy" or "the same heat content." They confuse.' },
                { id: 'b', prompt: 'Three systems X, Y, Z are prepared such that X and Y are separated by an adiabatic wall, while Y and Z are separated by a diathermic wall.', answer: 'Initially Y and Z are in thermal equilibrium (both 300 K)',
                  options: ['Initially Y and Z are in thermal equilibrium (both 300 K)', 'thermal equilibrium means the systems have the same internal energy', 'the same heat content'],
                  hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c11_phy_cbse_11_001 (Thermodynamic System and.',
                  misconception: 'Students often believe that "thermal equilibrium means the systems have the same internal energy" or "the same heat content." They confuse.' }
          ],
            remediations: { 'thermal-equilibrium-means-the-systems': { steps: ['If a student equates thermal equilibrium with equal internal energy: (1) Remind them of the Class 6 distinction: heat.', '(2) Perform a quick demo: place a small and a large beaker of water at the same temperature in contact – no net heat.', '(3) Re-read NCERT Section 11.2: "In thermal equilibrium, the temperatures of the two systems are equal." (4) Practice.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_003', difficulty: 'standard',
          question: 'The First Law of Thermodynamics states that the heat energy (ΔQ) supplied to.',
          hint: 'Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and Class 11 Thermodynamic System.',
          misconception: 'Students often think "heat is a form of energy stored in a body" and write statements like "the gas has 500 J of heat.".',
          parts: [
                { id: 'a', prompt: 'A gas in a cylinder is compressed adiabatically from volume V₁ to V₂. The work done on the gas is 500 J. What is the change in internal energy?', answer: 'For adiabatic process, ΔQ = 0',
                  options: ['For adiabatic process, ΔQ = 0', 'heat is a form of energy stored in a body', 'the gas has 500 J of heat'],
                  hint: 'Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and Class 11 Thermodynamic System.',
                  misconception: 'Students often think "heat is a form of energy stored in a body" and write statements like "the gas has 500 J of heat." They confuse heat.' },
                { id: 'b', prompt: 'Two moles of an ideal gas expand isothermally at 300 K from 0.02 m³ to 0.05 m³.', answer: 'the work done by the gas, (',
                  options: ['the work done by the gas, (', 'heat is a form of energy stored in a body', 'the gas has 500 J of heat'],
                  hint: 'Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and Class 11 Thermodynamic System.',
                  misconception: 'Students often think "heat is a form of energy stored in a body" and write statements like "the gas has 500 J of heat." They confuse heat.' },
                { id: 'c', prompt: 'A system undergoes a cyclic process ABCA on a P-V diagram where AB is isobaric expansion, BC is isochoric cooling, and CA is isothermal compression.', answer: 'For a cyclic process, ΔU = 0 (state variable)',
                  options: ['For a cyclic process, ΔU = 0 (state variable)', 'heat is a form of energy stored in a body', 'the gas has 500 J of heat'],
                  hint: 'Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and Class 11 Thermodynamic System.',
                  misconception: 'Students often think "heat is a form of energy stored in a body" and write statements like "the gas has 500 J of heat." They confuse heat.' }
          ],
            remediations: { 'heat-is-a-form-of': { steps: ['Hold a metal rod at one end; heat the other end with a candle.', 'Show a P-V diagram of two different paths between same states. Calculate ΔU (same), Q and W (different).', 'Practice writing "ΔQ = 200 J supplied" not "Q = 200 J in the gas." Repeat until language reflects energy transfer, not.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_004', difficulty: 'standard',
          question: 'Work done in an isothermal process is the energy transferred by an ideal gas.',
          hint: 'If stuck, revisit the first law (node c11_phy_cbse_11_003) and the ideal gas equation.',
          misconception: 'Students often think that because temperature is constant in an isothermal process, no heat is transferred (Q = 0).',
          parts: [
                { id: 'a', prompt: 'State the formula for work done by an ideal gas in a quasi-static isothermal process and give the SI unit of each variable in the formula.', answer: 'The formula is W = μRT ln(V₂/V₁)',
                  options: ['The formula is W = μRT ln(V₂/V₁)', 'isothermal', 'adiabatic'],
                  hint: 'If stuck, revisit the first law (node c11_phy_cbse_11_003) and the ideal gas equation (from Kinetic.',
                  misconception: 'Students often think that because temperature is constant in an isothermal process, no heat is transferred (Q = 0).' },
                { id: 'b', prompt: 'Two moles of an ideal gas at 300 K expand isothermally from 0.02 m³ to 0.05 m³. Calculate the work done by the gas. (R = 8.31 J mol⁻¹ K⁻¹)', answer: 'Given: μ = 2 mol, T = 300 K, V₁ = 0.02 m³, V₂ = 0.05 m³, R = 8.31 J mol⁻¹ K⁻¹',
                  options: ['Given: μ = 2 mol, T = 300 K, V₁ = 0.02 m³, V₂ = 0.05 m³, R = 8.31 J mol⁻¹ K⁻¹', 'isothermal', 'adiabatic'],
                  hint: 'If stuck, revisit the first law (node c11_phy_cbse_11_003) and the ideal gas equation (from Kinetic.',
                  misconception: 'Students often think that because temperature is constant in an isothermal process, no heat is transferred (Q = 0).' },
                { id: 'c', prompt: 'An ideal gas undergoes an isothermal compression from volume V₁ to V₂ (V₂ < V₁) at temperature T.', answer: 'Yes, the magnitudes are equal',
                  options: ['Yes, the magnitudes are equal', 'isothermal', 'adiabatic', 'magnitudes differ'],
                  hint: 'If stuck, revisit the first law (node c11_phy_cbse_11_003) and the ideal gas equation (from Kinetic.',
                  misconception: 'Students often think that because temperature is constant in an isothermal process, no heat is transferred (Q = 0).' }
          ],
            remediations: { 'because-temperature-is-constant-in': { steps: ['If a student confuses isothermal with adiabatic, have them compare the two processes on a P-V diagram: isotherms are.', 'Ask them to place a gas cylinder in a water bath (isothermal) vs.', 'insulating it (adiabatic) and predict temperature change during compression.', 'For the Celsius/Kelvin error, give a numerical problem where using Celsius gives a negative or nonsensical work value.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_005', difficulty: 'standard',
          question: 'Work done in an adiabatic process is the energy transferred by a gas when.',
          hint: 'Revisit c11_phy_cbse_11_003 (First Law) to clarify sign of W and ΔU, and.',
          misconception: 'Students often believe "adiabatic" means "constant temperature" because the word sounds similar to "isothermal" or they.',
          parts: [
                { id: 'a', prompt: 'A gas is compressed adiabatically from volume V1 to V2 (V2 < V1). Will the work done *by* the gas be positive, negative, or zero?', answer: 'Work done *by* the gas is negative (work is done *on* the gas)',
                  options: ['Work done *by* the gas is negative (work is done *on* the gas)', 'adiabatic', 'constant temperature', 'isothermal'],
                  hint: 'Revisit c11_phy_cbse_11_003 (First Law) to clarify sign of W and ΔU, and c11_phy_cbse_11_004.',
                  misconception: 'Students often believe "adiabatic" means "constant temperature" because the word sounds similar to "isothermal" or they confuse "no heat.' },
                { id: 'b', prompt: 'On a P-V diagram, an adiabatic curve and an isothermal curve start at the same initial point (P1, V1). Both expand to the same final volume V2 > V1.', answer: 'The adiabatic curve is steeper',
                  options: ['The adiabatic curve is steeper', 'steeper curve = more area', 'adiabatic', 'constant temperature'],
                  hint: 'Revisit c11_phy_cbse_11_003 (First Law) to clarify sign of W and ΔU, and c11_phy_cbse_11_004.',
                  misconception: 'Students often believe "adiabatic" means "constant temperature" because the word sounds similar to "isothermal" or they confuse "no heat.' }
          ],
            remediations: { 'adiabatic-means-constant-temperature-because': { steps: ['If a student confuses adiabatic with isothermal: 1.', '**Contrast the definitions:** Write side-by-side: "Isothermal: T constant, Q ≠ 0, heat flows to maintain T.', 'Adiabatic: Q = 0, T changes, no heat flows." 2.', '**Physical demonstration:** Use the syringe-cotton experiment (Diagnostic Q6).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_006', difficulty: 'standard',
          question: 'Molar specific heat capacity at constant volume (Cᵥ) is the amount of heat.',
          hint: 'If stuck, review the First Law node (c11_phy_cbse_11_003) and the ideal gas equation from.',
          misconception: 'Students often think Cₚ and Cᵥ are material constants like density, fixed for a given gas at all temperatures.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Molar specific heat capacity at constant volume (Cᵥ) is the amount of heat required to',
                  options: ['Molar specific heat capacity at constant volume (Cᵥ) is the amount of heat required to', 'A thermodynamic system is a specific portion of the universe (a definite quantity of', 'The Zeroth Law of Thermodynamics states that if two thermodynamic systems are each in', 'The First Law of Thermodynamics states that the heat energy (ΔQ) supplied to a'],
                  hint: 'If stuck, review the First Law node (c11_phy_cbse_11_003) and the ideal gas equation from Chemistry.',
                  misconception: 'Students often think Cₚ and Cᵥ are material constants like density, fixed for a given gas at all temperatures.' }
          ],
            remediations: { 'c-and-c-are-material': { steps: ['Revisit the definition of a mole and molar mass (Chemistry Class 11).', 'Perform a unit analysis drill: write Cᵥ = ΔQ/(μΔT) and s = ΔQ/(mΔT) side by side, convert μ = m/M.', 'Use the PhET "Gas Properties" simulation: lock volume, add heat, note T rise; then lock pressure, add same heat, note.', 'Solve 3 numerical problems converting between C and s using M.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
