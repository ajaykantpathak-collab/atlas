import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch11_p2: SimDef = {
    id: 'v3_c11_phy_ch11_p2',
    title: 'Thermodynamics · Part 2/2',
    subtitle: 'Learn that a steady temperature can mean bustling exchange, not isolation.',
    classLevel: 11, subject: 'physics', topic: 'Thermodynamics · Part 2/2',
    chapters: ['c11_phy_ch11'],
    nodeIds: ['c11_phy_cbse_11_007', 'c11_phy_cbse_11_008', 'c11_phy_cbse_11_009', 'c11_phy_cbse_11_010', 'c11_phy_cbse_11_011', 'c11_phy_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a thermodynamicist drawing system boundaries', intro: 'Is a sealed lunchbox closed? Is your body? The answer depends on what crosses a boundary you get to choose.', goal: 'Classify thermodynamic systems and justify the Zeroth Law as the foundation of temperature.' },
    discovery: {
        question: '\'The human body is an isolated system — it holds a steady 37 °C.\' Sound classification?',
        options: ['No — it eats, breathes, sweats and radiates: an open system whose constant temperature is active regulation, not isolation', 'Yes — constant temperature means no exchange', 'Yes — skin is a sealed boundary', 'No — it\'s a closed system, which means isolated'],
        answer: 'No — it eats, breathes, sweats and radiates: an open system whose constant temperature is active regulation, not isolation',
        hook: 'And the Zeroth Law isn\'t a triviality — it makes \'same temperature\' well-defined, which is the only reason a thermometer means anything.',
    },
    teaching: [
        { title: 'Relation Between Cp and Cv: Mayer\'s Formula', text: 'Mayer\'s formula states that for an ideal gas, the difference between the molar specific heat capacity at constant pressure (Cp) and the molar specific heat capacity at constant volume (Cv) is equal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_11_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Sort a gas expanding into vacuum, a thermos and the human body into open/closed/isolated, then defend why thermal equilibrium needs a stated law.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_007', title: 'Relation Between Cp and Cv: Mayer\'s Formula',
          scaffold: { problem: 'A cylinder contains 0.5 moles of oxygen gas (diatomic, ideal) at 300 K.',
            steps: [
            { text: 'Identify given: n = 0.5 mol, ΔT = 50 K, gas is diatomic so f = 5 → Cv = (5/2)R = 20.775 J mol⁻¹ K⁻¹.' },
            { text: 'Heat supplied at constant pressure: Q = n Cp ΔT = 0.5 × 29.085 × 50 = 727.125 J.' },
            { text: 'Increase in internal energy: ΔU = n Cv ΔT = 0.5 × 20.775 × 50 = 519.375 J.' },
            { text: 'Work done: W = Q – ΔU = 727.125 – 519.375 = 207.75 J. (Alternatively, W = n R ΔT = 0.5 × 8.31 × 50 = 207.75 J.)' },
            { text: 'Verify units: n (mol) × Cp (J mol⁻¹ K⁻¹) × ΔT (K) = J. All values are positive and physically reasonable (work done.', faded: true, blankAnswer: '(a) Q = 727 J, (b) ΔU = 519 J, (c) W = 208 J (rounded to 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_008', title: 'Isothermal and Adiabatic Processes: Comparison',
          scaffold: { problem: 'A diesel engine compresses air (treated as a diatomic ideal gas with γ = 1.4) adiabatically from an initial volume of 500 cm³ at 300 K and.',
            steps: [
            { text: 'Identify given: V_i = 500 cm³ = 5.0 × 10⁻⁴ m³, V_f = 50 cm³ = 5.0 × 10⁻⁵ m³, T_i = 300 K, P_i = 1.0 × 10⁵ Pa, γ = 1.4.' },
            { text: 'Use adiabatic relation T_f = T_i (V_i/V_f)^(γ-1). Volume ratio = 10. γ-1 = 0.4.' },
            { text: 'Use adiabatic relation P_f = P_i (V_i/V_f)^γ = 1.0 × 10⁵ × 10^1.4 = 1.0 × 10⁵ × 25.119 = 2.51 × 10⁶ Pa.' },
            { text: 'Find number of moles n = P_i V_i / (R T_i) = (1.0e5 × 5.0e-4) / (8.31 × 300) = 50 / 2493 = 0.02006 mol.' },
            { text: 'Work done ON gas W_on = n C_v (T_f - T_i) = n (R/(γ-1)) (T_f - T_i) = 0.02006 × (8.31/0.4) × (753.6 - 300) = 0.02006.', faded: true, blankAnswer: '(a) T_f = 754 K, (b) P_f = 2.51 × 10⁶ Pa, (c) W_on = 189 J.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_010', title: 'Reversible and Irreversible Processes',
          caseStudy: { intro: 'Observe a gas leaking from a punctured LPG cylinder in a kitchen – the gas spreads irreversibly throughout the room and never spontaneously returns to the.',
            decisions: [{ prompt: 'State the two necessary and sufficient conditions for a thermodynamic process to be reversible.', options: [
                { text: 'A process is reversible only if (1) it is quasi-static (system remains in thermal and', outcome: 'A process is reversible only if (1) it is quasi-static (system remains in thermal and mechanical.' },
                { text: 'slow process', outcome: 'Not quite — Students often think "reversible means the process can be run backwards in time" (like a video.', reveals: 'reversible-means-the-process-can' },
                { text: 'no friction', outcome: 'Not quite — Students often think "reversible means the process can be run backwards in time" (like a video.', reveals: 'reversible-means-the-process-can' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_011', title: 'Carnot Engine: Efficiency',
          scaffold: { problem: 'A Carnot engine in a solar thermal power plant receives heat at 800 K from concentrated sunlight and rejects heat to the atmosphere at 300.',
            steps: [
            { text: 'Identify given: T₁ = 800 K, T₂ = 300 K, Q₁ = 2000 kJ = 2×10⁶ J, cycle rate = 50/min.' },
            { text: 'Calculate efficiency η = 1 - T₂/T₁ = 1 - 300/800 = 1 - 0.375 = 0.625 = 62.5%.' },
            { text: 'Work per cycle W = η × Q₁ = 0.625 × 2×10⁶ J = 1.25×10⁶ J = 1250 kJ.' },
            { text: 'Heat rejected Q₂ = Q₁ - W = 2×10⁶ - 1.25×10⁶ = 0.75×10⁶ J = 750 kJ (verify: Q₂ = Q₁×T₂/T₁ = 2×10⁶ × 300/800 = 750 kJ).' },
            { text: 'Power = Work per cycle × cycles per second = 1.25×10⁶ J × (50/60) s⁻¹ = 1.04×10⁶ W = 1.04 MW.', faded: true, blankAnswer: '(a) η = 62.5%, (b) W = 1250 kJ/cycle, (c) Q₂ = 750.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_012', title: 'Refrigerator: Coefficient of Performance',
          scaffold: { problem: 'A domestic refrigerator maintains an internal temperature of 4°C in a kitchen at 30°C.',
            steps: [
            { text: 'Identify given quantities and convert temperatures to Kelvin. T₂ = 4°C = 277 K; T₁ = 30°C = 303 K.' },
            { text: 'Calculate Carnot COP using α_Carnot = T₂/(T₁ - T₂) = 277 K / (303 K - 277 K) = 277 / 26 ≈ 10.65.' },
            { text: 'Calculate actual COP: α_actual = 0.60 × 10.65 ≈ 6.39.' },
            { text: 'Use definition of COP: α = (Q₂/t) / (W/t) → Power input W/t = (Q₂/t) / α = 200 W / 6.39 ≈ 31.3 W.' },
            { text: 'Verify units: (J/s) / (dimensionless) = J/s = W. Check physical reasonableness: A 200 W cooling capacity with ~31.' },
            { text: 'State final answer with units.', faded: true, blankAnswer: '31.3 W' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a pressure cooker in a thermodynamics lab, a student calls it \'an isolated system — the lid is shut, so nothing crosses the boundary.\' He also says two copper blocks at 300 K can\'t be in thermal equilibrium \'because the 10 kg block has far more energy.\'',
            decisions: [{ prompt: 'What do the system and equilibrium definitions say?', options: [
                { text: 'Classify by what crosses the boundary: the cooker\'s metal wall is diathermic — heat flows, mass doesn\'t — so it\'s closed, not isolated; a thermos approximates isolated, an open beaker losing steam is open. And thermal equilibrium needs equal TEMPERATURE, not equal internal energy — the blocks at 300 K are in equilibrium despite hugely different energies; the Zeroth Law makes temperature the tag of equilibrium classes.', outcome: 'He draws boundaries correctly: closed ≠ isolated, and equilibrium is a temperature statement, not an energy-amount statement.' },
                { text: 'Keep \'isolated\' — a sealed lid means nothing gets in or out.', outcome: 'Sealing stops mass, not energy: heat conducts through the metal — closed system; isolation would need an adiabatic boundary.', reveals: 'closed-equals-isolated' },
                { text: 'Agree on the blocks — equilibrium means equal energy, so the bigger block isn\'t equilibrated.', outcome: 'Internal energy is extensive — it scales with mass; equilibrium only requires equal temperature, which both blocks share.', reveals: 'equilibrium-needs-equal-energy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_11_012', title: 'You made it',
          caseStudy: { intro: 'A closed system swaps energy, an open one swaps matter too, an isolated one swaps nothing — the boundary is often imaginary but the classification is not.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_007', difficulty: 'standard',
          question: 'Mayer\'s formula states that for an ideal gas, the difference between the molar.',
          hint: 'If stuck, revisit the first law (node c11_phy_cbse_11_003) and the definitions of Cp and.',
          misconception: 'Students often think Cp – Cv = R is only valid for monoatomic gases because they confuse the formula with Cv = (3/2)R.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mayer\'s formula states that for an ideal gas, the difference between the molar specific',
                  options: ['Mayer\'s formula states that for an ideal gas, the difference between the molar specific', 'A thermodynamic system is a specific portion of the universe (a definite quantity of', 'The Zeroth Law of Thermodynamics states that if two thermodynamic systems are each in', 'The First Law of Thermodynamics states that the heat energy (ΔQ) supplied to a'],
                  hint: 'If stuck, revisit the first law (node c11_phy_cbse_11_003) and the definitions of Cp and Cv (node.',
                  misconception: 'Students often think Cp – Cv = R is only valid for monoatomic gases because they confuse the formula with Cv = (3/2)R (which.' }
          ],
            remediations: { 'cp-cv-r-is-only': { steps: ['If a student confuses the universality of Mayer\'s formula, guide them to re-derive it step by step: (1) Write first law.', '(2) Write for constant pressure: ΔQ_p = ΔU + PΔV.', '(3) Use ideal gas law PV = RT to show PΔV = RΔT for 1 mole.', '(4) Divide by ΔT to get Cp = Cv + R.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_008', difficulty: 'standard',
          question: 'An isothermal process is a thermodynamic process in which the temperature.',
          hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
          misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0.',
          parts: [
                { id: 'a', prompt: 'State the defining thermodynamic condition for an isothermal process and an adiabatic process in terms of heat exchange (Q) and temperature change (ΔT).', answer: 'Isothermal: ΔT = 0 (temperature constant), Q ≠ 0 generally',
                  options: ['Isothermal: ΔT = 0 (temperature constant), Q ≠ 0 generally', 'isothermal means Q=0', 'no temperature change', 'no heat exchange'],
                  hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
                  misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0 like adiabatic.' },
                { id: 'b', prompt: 'Explain why the adiabatic curve on a P-V diagram is steeper than the isothermal curve for the same gas at the same point.', answer: 'For isothermal: PV = constant → dP/dV = -P/V',
                  options: ['For isothermal: PV = constant → dP/dV = -P/V', 'adiabatic has higher pressure', 'isothermal means no heat exchange', 'Q=0 like adiabatic'],
                  hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
                  misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0 like adiabatic.' },
                { id: 'c', prompt: 'Two moles of a monatomic ideal gas (γ = 5/3) at 300 K and volume 0.02 m³ are compressed to 0.01 m³.', answer: 'isothermal compression and (',
                  options: ['isothermal compression and (', 'isothermal means no heat exchange', 'Q=0 like adiabatic'],
                  hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
                  misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0 like adiabatic.' },
                { id: 'd', prompt: 'A gas undergoes a cyclic process consisting of an isothermal expansion from A to B followed by an adiabatic compression from B back to A.', answer: 'Yes, it is possible',
                  options: ['Yes, it is possible', 'net work must be zero', 'isothermal means no heat exchange', 'Q=0 like adiabatic'],
                  hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
                  misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0 like adiabatic.' }
          ],
            remediations: { 'isothermal-means-no-heat-exchange': { steps: ['If the student confuses Q and ΔT: (1) Have them write the First Law: ΔQ = ΔU + ΔW.', '(2) Remind them ΔU = nC_vΔT for ideal gas.', '(3) For isothermal: set ΔT=0 → ΔU=0 → ΔQ = ΔW.', 'Ask: "If the gas expands (ΔW>0), what must ΔQ be?" They must conclude heat enters.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In an adiabatic expansion, the gas cools because it loses heat to the surroundings." Evaluate this statement and correct the misconception.', answer: 'The statement is false',
                  options: ['The statement is false', 'heat is lost', 'isothermal means no heat exchange', 'Q=0 like adiabatic'],
                  hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
                  misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0 like adiabatic.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration using a syringe (sealed at the tip) and a temperature sensor to distinguish between near-isothermal and near-adiabatic.', answer: 'Procedure: (1) Seal a plastic syringe tip with glue/tape',
                  options: ['Procedure: (1) Seal a plastic syringe tip with glue/tape', 'isothermal means no heat exchange', 'Q=0 like adiabatic'],
                  hint: 'Revisit the First Law node (c11_phy_cbse_11_003) and the specific heat capacity node.',
                  misconception: 'Students often think "isothermal means no heat exchange" because the temperature doesn\'t change, so they assume Q=0 like adiabatic.' }
          ],
            remediations: { 'isothermal-means-no-heat-exchange': { steps: ['If the student confuses Q and ΔT: (1) Have them write the First Law: ΔQ = ΔU + ΔW.', '(2) Remind them ΔU = nC_vΔT for ideal gas.', '(3) For isothermal: set ΔT=0 → ΔU=0 → ΔQ = ΔW.', 'Ask: "If the gas expands (ΔW>0), what must ΔQ be?" They must conclude heat enters.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_009', difficulty: 'standard',
          question: 'The Second Law of Thermodynamics introduces a fundamental directionality.',
          hint: 'If stuck, revisit c11_phy_cbse_11_003 (First Law) and practice drawing energy flow.',
          misconception: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal*.',
          parts: [
                { id: 'a', prompt: 'An inventor proposes a refrigerator that transfers 500 J of heat from a cold compartment at 270 K to a hot room at 300 K *without any external electricity.', answer: 'Yes, it violates the Clausius statement',
                  options: ['Yes, it violates the Clausius statement', 'No, energy is conserved', 'sole result'],
                  hint: 'If stuck, revisit c11_phy_cbse_11_003 (First Law) and practice drawing energy flow diagrams for.',
                  misconception: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal* engine could achieve.' }
          ],
            remediations: { 'the-second-law-only-applies': { steps: ['If a student holds this misconception, guide them through the following steps: 1.', 'Re-read the Kelvin-Planck statement carefully: "No process is possible whose *sole result* is absorption of heat from.', 'Recall the Carnot engine derivation (next node) which shows η_Carnot = 1 - T₂/T₁ < 1 *even for a reversible.', 'The efficiency is limited by the *temperature ratio*, not by friction.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_010', difficulty: 'standard',
          question: 'A thermodynamic process is **reversible** if it can be reversed such that both.',
          hint: 'Revisit c11_phy_cbse_11_008 (quasi-static process definition and P-V diagrams) and.',
          misconception: 'Students often think "reversible means the process can be run backwards in time" (like a video played in reverse).',
          parts: [
                { id: 'a', prompt: 'Why is the free expansion of a gas into vacuum (Joule expansion) irreversible even though no friction is involved?', answer: 'Free expansion is irreversible',
                  options: ['Free expansion is irreversible', 'it is reversible', 'reversible means the process can be run backwards in time'],
                  hint: 'Revisit c11_phy_cbse_11_008 (quasi-static process definition and P-V diagrams) and.',
                  misconception: 'Students often think "reversible means the process can be run backwards in time" (like a video played in reverse).' },
                { id: 'b', prompt: 'An ideal gas undergoes an isothermal expansion from volume V₁ to V₂ at temperature T.', answer: 'Extra work dissipated = f·Δx (joules)',
                  options: ['Extra work dissipated = f·Δx (joules)', 'reversible means the process can be run backwards in time'],
                  hint: 'Revisit c11_phy_cbse_11_008 (quasi-static process definition and P-V diagrams) and.',
                  misconception: 'Students often think "reversible means the process can be run backwards in time" (like a video played in reverse).' }
          ],
            remediations: { 'reversible-means-the-process-can': { steps: ['If a student conflates "reversible" with "can be reversed mechanically": 1.', 'Have them trace energy flows for a block sliding to rest on a rough table (irreversible: work → heat, surroundings warm.', 'Ask: "Can the block spontaneously start moving again using only the heat from the table?" (No – violates Kelvin-Planck).', 'Contrast with a frictionless pendulum in vacuum (reversible idealisation): at each swing, energy converts between.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_011', difficulty: 'standard',
          question: 'The Carnot engine is an idealized reversible heat engine operating between two.',
          hint: 'If stuck, revisit c11_phy_cbse_11_004 (isothermal work derivation) and.',
          misconception: 'Students often believe Carnot efficiency η = 1 - T₂/T₁ can be calculated using Celsius temperatures because "the.',
          parts: [
                { id: 'a', prompt: 'A Carnot engine operates between a source at 527°C and a sink at 27°C. Calculate its efficiency.', answer: 'Step 1: Convert to Kelvin: T₁ = 527 + 273 = 800 K, T₂ = 27 + 273 = 300 K',
                  options: ['Step 1: Convert to Kelvin: T₁ = 527 + 273 = 800 K, T₂ = 27 + 273 = 300 K', 'the difference is the same'],
                  hint: 'If stuck, revisit c11_phy_cbse_11_004 (isothermal work derivation) and c11_phy_cbse_11_005.',
                  misconception: 'Students often believe Carnot efficiency η = 1 - T₂/T₁ can be calculated using Celsius temperatures because "the difference is the same.".' },
                { id: 'b', prompt: 'Two Carnot engines A and B operate in series. Engine A takes heat Q₁ from a reservoir at T₁, rejects heat Q₂ to a reservoir at T₂, and does work W_A.', answer: 'For A: η_A = 1 - T₂/T₁ ⇒ W_A = Q₁(1 - T₂/T₁), Q₂ = Q₁(T₂/T₁)',
                  options: ['For A: η_A = 1 - T₂/T₁ ⇒ W_A = Q₁(1 - T₂/T₁), Q₂ = Q₁(T₂/T₁)', 'pass-through', 'the difference is the same'],
                  hint: 'If stuck, revisit c11_phy_cbse_11_004 (isothermal work derivation) and c11_phy_cbse_11_005.',
                  misconception: 'Students often believe Carnot efficiency η = 1 - T₂/T₁ can be calculated using Celsius temperatures because "the difference is the same.".' }
          ],
            remediations: { 'carnot-efficiency-1-t-t': { steps: ['Have the student convert 0°C, 100°C, 273 K, 373 K to see that ratios differ: 100/0 is undefined, 373/273 ≈ 1.37, but.', 'Show that η = 1 - T₂/T₁ comes from Q₂/Q₁ = T₂/T₁, which derives from PV^γ = constant for adiabats - this derivation.', 'Practice 5 problems where temperatures are given in Celsius and require conversion before efficiency calculation.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_012', difficulty: 'standard',
          question: 'The Coefficient of Performance (COP) of a refrigerator, denoted by α (alpha).',
          hint: 'If stuck, revisit the Carnot engine node (c11_phy_cbse_11_011) to review the derivation.',
          misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine.',
          parts: [
                { id: 'a', prompt: 'Two refrigerators A and B operate between the same two reservoirs at T₁ = 300 K and T₂ = 250 K. Refrigerator A is a Carnot (reversible) refrigerator.', answer: 'Carnot COP α_A = T₂/(T₁ - T₂) = 250/(300-250) = 5.0',
                  options: ['Carnot COP α_A = T₂/(T₁ - T₂) = 250/(300-250) = 5.0', 'closer to 1'],
                  hint: 'If stuck, revisit the Carnot engine node (c11_phy_cbse_11_011) to review the derivation of Q₁/T₁.',
                  misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine efficiency limit (η ≤.' }
          ],
            remediations: { 'the-cop-of-a-refrigerator': { steps: ['If a student insists COP ≤ 1, guide them through this stepwise remediation: 1.', 'Revisit the First Law for a cyclic refrigerator: Q₁ = Q₂ + W.', 'Ask: "Which is larger, Q₁ or W?" (Answer: Q₁, because Q₂ > 0).', 'Ask: "If Q₁ = Q₂ + W, can Q₂ be larger than W?" (Answer: Yes, e.g., Q₁=400J, W=100J → Q₂=300J).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
