import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch10_p2: SimDef = {
    id: 'v3_c11_phy_ch10_p2',
    title: 'Thermal Properties of Matter · Part 2/3',
    subtitle: 'Separate the energy in transit from the temperature that drives it.',
    classLevel: 11, subject: 'physics', topic: 'Thermal Properties of Matter · Part 2/3',
    chapters: ['c11_phy_ch10'],
    nodeIds: ['c11_phy_cbse_10_007', 'c11_phy_cbse_10_008', 'c11_phy_cbse_10_009', 'c11_phy_cbse_10_010', 'c11_phy_cbse_10_011', 'c11_phy_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a calorimetrist refusing to count stored heat', intro: 'Two spoons in the same tea, one burns your fingers — temperature set the direction, but the material set the flow.', goal: 'Distinguish heat from temperature and handle scale conversions for values versus differences.' },
    discovery: {
        question: '\'How much heat is contained in 1 kg of water at 100 °C?\' — reach for Q = mcΔT?',
        options: ['The question is broken — heat is energy in transit, not stored content; you can only ask how much flows for a given temperature drop', 'Yes — mcΔT gives the heat inside', 'Yes — 420 kJ is the answer', 'No — because water can\'t hold heat at 100 °C'],
        answer: 'The question is broken — heat is energy in transit, not stored content; you can only ask how much flows for a given temperature drop',
        hook: 'A 10 °C rise is an 18 °F rise, not 50 — the +32 belongs to the zero-point offset, not to differences; but ΔT in °C and K are identical.',
    },
    teaching: [
        { title: 'Molar Specific Heat Capacity', text: 'Molar specific heat capacity is the amount of heat energy required to raise the temperature of one mole of a substance by one kelvin (or one degree Celsius).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_10_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Explain why the steel spoon burns faster than the wooden one at the same temperature, then correct \'heat flows until both have equal heat.\'',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_007', title: 'Molar Specific Heat Capacity',
          scaffold: { problem: 'The specific heat capacity of solid aluminium is \\(900 \\text{ J kg}^{-1} \\text{K}^{-1}\\).',
            steps: [
            { text: 'Identify given quantities: \\(c = 900 \\text{ J kg}^{-1} \\text{K}^{-1}\\), \\(M = 27 \\text{ g mol}^{-1} = 0.027 \\text{.' },
            { text: 'Recall the conversion formula: \\(C = c \\times M\\). Check units: \\(\\text{J kg}^{-1} \\text{K}^{-1} \\times \\text{kg.' },
            { text: 'Substitute values: \\(C = 900 \\times 0.027\\).' },
            { text: 'Compute: \\(C = 24.3 \\text{ J mol}^{-1} \\text{K}^{-1}\\).' },
            { text: 'Verify reasonableness: Typical molar heat capacities of metals are around 25 J mol⁻¹ K⁻¹ (Dulong-Petit law), so the.', faded: true, blankAnswer: '\\(24.3 \\text{ J mol}^{-1} \\text{K}^{-1}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_008', title: 'Calorimetry: Principle and Method',
          scaffold: { problem: 'A 200 g copper vessel (s = 386 J kg⁻¹ K⁻¹) contains 500 g of water at 25°C.',
            steps: [
            { text: 'Identify all components and their properties. Copper vessel: m_c = 0.200 kg, s_c = 386 J kg⁻¹ K⁻¹, T_c = 25°C.' },
            { text: 'Apply calorimetry principle. Heat gained by spoon = Heat lost by (water + copper vessel).' },
            { text: 'Substitute values with units. 0.100 × 460 × (T_f - 15) = (0.500 × 4186 + 0.200 × 386) × (25 - T_f).' },
            { text: 'Solve algebraically. 46(T_f - 15) = 2170.2(25 - T_f) → 46T_f - 690 = 54255 - 2170.2T_f → 2216.2T_f = 54945 → T_f.' },
            { text: 'Verify reasonableness. T_f (24.79°C) lies between 15°C and 25°C, closer to 25°C because water+copper have much larger.', faded: true, blankAnswer: '24.8°C' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_009', title: 'Change of State: Melting and Boiling',
          scaffold: { problem: 'In a physics lab, a student heats 150 g of ice at -10°C using a constant 500 W heater.',
            steps: [
            { text: 'Identify three stages: (a) heating ice from -10°C to 0°C, (b) melting ice at 0°C, (c) heating water from 0°C to 20°C.' },
            { text: 'Write heat for each stage: Q₁ = m c_ice ΔT₁, Q₂ = m Lf, Q₃ = m c_water ΔT₃. Total Q = Q₁ + Q₂ + Q₃. Time t = Q / P.' },
            { text: 'Compute Q₁ = 0.150 × 2100 × (0 - (-10)) = 0.150 × 2100 × 10 = 3150 J.' },
            { text: 'Compute Q₂ = 0.150 × 3.34 × 10⁵ = 50100 J.' },
            { text: 'Compute Q₃ = 0.150 × 4186 × (20 - 0) = 0.150 × 4186 × 20 = 12558 J.' },
            { text: 'Total Q = 3150 + 50100 + 12558 = 65808 J. Time t = 65808 / 500 = 131.6 s ≈ 2 min 12 s.', faded: true, blankAnswer: '132 s (or 2 minutes 12 seconds)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_010', title: 'Latent Heat: Fusion and Vaporisation',
          scaffold: { problem: 'A 200 g copper calorimeter contains 300 g of water at 30°C. Dry steam at 100°C is passed into the water until the temperature rises.',
            steps: [
            { text: 'Identify given quantities with units: m_cal = 0.200 kg, m_water = 0.300 kg, T_i = 30°C, T_f = 50°C, T_steam = 100°C.' },
            { text: 'Heat lost by steam = heat gained by water + calorimeter. Steam condenses at 100°C (releases m_steam × L_v) then cools.' },
            { text: 'Write heat balance equation: m_steam × L_v + m_steam × c_w × (100 - 50) = m_water × c_w × (50 - 30) + m_cal × c_cu.' },
            { text: 'Substitute values: m_steam × (22.6×10⁵) + m_steam × 4186 × 50 = 0.300 × 4186 × 20 + 0.200 × 385 × 20.' },
            { text: 'Compute RHS: 0.300 × 4186 × 20 = 25116 J; 0.200 × 385 × 20 = 1540 J; Total = 26656 J.' },
            { text: 'm_steam = 26656 / (2.4693×10⁶) = 0.0108 kg = 10.8 g. Check: Steam mass is small compared to water, temperature rise.', faded: true, blankAnswer: '10.8 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_011', title: 'Heat Transfer: Conduction',
          scaffold: { problem: 'A brass rod (K = 109 W m⁻¹ K⁻¹) of length 40 cm and cross-section 5 cm² is joined end-to-end with a steel rod (K = 50.2 W m⁻¹ K⁻¹).',
            steps: [
            { text: 'Convert all units to SI: L_Br = 0.40 m, A_Br = 5 × 10⁻⁴ m², L_St = 0.60 m, A_St = 3 × 10⁻⁴ m², T_H = 150°C, T_C = 30°C.' },
            { text: 'Calculate thermal resistances: R_Br = L_Br/(K_Br A_Br) = 0.40 / (109 × 5×10⁻⁴) = 7.339 K/W.' },
            { text: 'Total resistance R_total = R_Br + R_St = 47.18 K/W. Heat current H = (T_H - T_C) / R_total = (150 - 30) / 47.18 = 2.54.' },
            { text: 'Junction temperature T_j = T_H - H × R_Br = 150 - 2.54 × 7.339 = 150 - 18.64 = 131.36°C.' },
            { text: 'Temperature gradients: dT/dx|_Br = -H/(K_Br A_Br) = -2.54 / (109 × 5×10⁻⁴) = -46.6 K/m.' },
            { text: 'Check consistency: ΔT_Br = 46.6 × 0.40 = 18.6°C, ΔT_St = 168.9 × 0.60 = 101.3°C. Sum = 119.9°C ≈ 120°C.', faded: true, blankAnswer: '(a) H = 2.54 W, (b) T_j = 131.4°C, (c) Brass: -46.6 K/m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_012', title: 'Thermal Conductivity and Thermal Resistance',
          scaffold: { problem: 'A copper rod (K = 385 W m⁻¹ K⁻¹) of length 50 cm and cross-sectional area 4 cm² is joined end-to-end with a steel rod (K = 50 W m⁻¹ K⁻¹).',
            steps: [
            { text: 'Identify given quantities with units and convert to SI: L_Cu = 0.50 m, A_Cu = 4×10⁻⁴ m², K_Cu = 385 W m⁻¹ K⁻¹; L_Steel.' },
            { text: 'Compute thermal resistance of each rod: R = L/(KA). R_Cu = 0.50/(385 × 4×10⁻⁴) = 3.247 K/W.' },
            { text: 'Total thermal resistance in series: R_total = R_Cu + R_Steel = 3.247 + 30.0 = 33.247 K/W.' },
            { text: 'Heat current (same through both rods in steady state): H = ΔT/R_total = 120/33.247 = 3.61 W.' },
            { text: 'Junction temperature T_j: Heat flows from hot to cold, so T_j = T_hot - H×R_Cu = 150 - 3.61×3.247 = 150 - 11.72.' },
            { text: 'Equivalent thermal conductivity for a uniform rod of length L_total = 0.80 m, area A = 4×10⁻⁴ m²: R_eq = L_total/(K_eq.', faded: true, blankAnswer: '(a) H = 3.61 W, (b) T_j = 138.3°C, (c) K_eq = 60.1 W m⁻¹ K⁻¹' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a thermodynamics pre-lab, a student writes: \'A litre of boiling water contains 420 kJ of heat\' and \'a thermometer measures the heat in a body.\'',
            decisions: [{ prompt: 'What do the heat–temperature definitions require instead?', options: [
                { text: 'Redraw the boundary: heat is energy in TRANSIT across a temperature difference — a body holds internal energy, never \'heat content\'; only Q transferred in a process is defined. Temperature is the intensive quantity deciding flow direction — a thermometer reads temperature via a thermometric property, and scales are conventions anchored to fixed points (triple point 273.16 K; ice/steam points for °C, °F).', outcome: 'The report uses the terms correctly: Q is a process quantity (like work), temperature a state quantity — \'how much heat is in it\' is an ill-posed question.' },
                { text: 'Keep \'heat content\' — hot objects clearly hold more heat than cold ones.', outcome: 'That\'s the caloric-era error: bodies contain internal energy; \'heat\' names the transfer itself — the water holds energy, it gives off heat.', reveals: 'heat-is-stored-content' },
                { text: 'Let \'thermometer measures heat\' pass — it\'s measuring the hotness, close enough.', outcome: 'It measures temperature — the potential for heat flow, not the flow: two same-temperature spoons transfer heat to your hand at different rates.', reveals: 'thermometer-measures-heat' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'Heat flows until temperatures match — not until \'heat amounts\' match; equilibrium is a temperature, never a shared quantity of heat.',
            decisions: [{ prompt: 'What comes next? Thermal Properties of Matter · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Thermal Properties of Matter · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_007', difficulty: 'standard',
          question: 'Molar specific heat capacity is the amount of heat energy required to raise the.',
          hint: 'Review specific heat capacity definition (node c11_phy_cbse_10_006) and the mole concept.',
          misconception: 'Students treat molar specific heat capacity as numerically equal to specific heat capacity, ignoring the molar mass.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Molar specific heat capacity is the amount of heat energy required to raise the',
                  options: ['Molar specific heat capacity is the amount of heat energy required to raise the', 'Temperature is an intensive thermodynamic quantity that quantifies the degree of hotness', 'Temperature is a scalar physical quantity that quantifies the degree of hotness or', 'Linear thermal expansion is the increase in length of a solid rod or wire when its'],
                  hint: 'Review specific heat capacity definition (node c11_phy_cbse_10_006) and the mole concept from.',
                  misconception: 'Students treat molar specific heat capacity as numerically equal to specific heat capacity, ignoring the molar mass conversion factor.' }
          ],
            remediations: { 'students-treat-molar-specific-heat': { steps: ['Revisit the definition of mole and molar mass (Chemistry Class 11).', 'Practice: "Find moles in 10 g of \\(O_2\\)." 2.', 'Perform a thought experiment: Heat a gas in a rigid container (constant volume) vs.', 'a container with a frictionless piston (constant pressure).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_008', difficulty: 'standard',
          question: 'Calorimetry is the experimental technique of measuring heat transfer between.',
          hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT.',
          misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a calorimeter experiment, the heat lost by the hot metal block is exactly equal to the heat gained by the water alone." Explain why this.', answer: 'The statement ignores the calorimeter cup (and stirrer)',
                  options: ['The statement ignores the calorimeter cup (and stirrer)', 'water equivalent'],
                  hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT, c11_phy_cbse_10_010.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' },
                { id: 'b', prompt: 'A 0.050 kg aluminium sphere at 100°C is dropped into a 0.150 kg copper calorimeter containing 0.200 kg water at 20°C. The final steady temperature is 24°C.', answer: 'Heat lost by Al = m_Al s_Al (100 - 24) = 0.050 × s_Al × 76 = 3.8 s_Al J',
                  options: ['Heat lost by Al = m_Al s_Al (100 - 24) = 0.050 × s_Al × 76 = 3.8 s_Al J', 'water equivalent'],
                  hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT, c11_phy_cbse_10_010.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' },
                { id: 'c', prompt: 'Two identical calorimeters A and B contain equal masses of water at 20°C.', answer: 'Calorimeter B (with aluminium) reaches a higher final temperature',
                  options: ['Calorimeter B (with aluminium) reaches a higher final temperature', 'water equivalent'],
                  hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT, c11_phy_cbse_10_010.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' }
          ],
            remediations: { 'the-calorimeter-s-water-equivalent': { steps: ['Hold a copper cup and a glass beaker; feel that copper warms faster in your hand – it has lower heat capacity per gram.', 'Calculate the heat capacity of the copper cup (m_c × s_c) and divide by s_water to get water equivalent in kg.', 'In a problem, replace the calorimeter with this equivalent mass of water *at the calorimeter\'s initial temperature* and.', 'Compare with the direct method (separate heat gained by calorimeter) to see they yield identical results.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
          parts: [
                { id: 'a', prompt: 'In a calorimetry experiment to find the specific heat of a metal, a student forgets to dry the metal block after removing it from boiling water.', answer: 'The calculated specific heat will be HIGHER than the true value',
                  options: ['The calculated specific heat will be HIGHER than the true value', 'water equivalent', 'the droplets cool the block faster, confusing rate with total heat'],
                  hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT, c11_phy_cbse_10_010.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' }
          ],
            remediations: { 'the-calorimeter-s-water-equivalent': { steps: ['Hold a copper cup and a glass beaker; feel that copper warms faster in your hand – it has lower heat capacity per gram.', 'Calculate the heat capacity of the copper cup (m_c × s_c) and divide by s_water to get water equivalent in kg.', 'In a problem, replace the calorimeter with this equivalent mass of water *at the calorimeter\'s initial temperature* and.', 'Compare with the direct method (separate heat gained by calorimeter) to see they yield identical results.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_009', difficulty: 'standard',
          question: 'Change of state is a physical process where matter transitions between solid.',
          hint: 'If stuck, review c11_phy_cbse_10_001 (Temperature and Heat) and c11_phy_cbse_10_006.',
          misconception: 'Students believe "boiling point of water is always 100°C" and "melting point of ice is always 0°C" as absolute.',
          parts: [
                { id: 'a', prompt: 'Define melting point and boiling point. State their SI units and how they differ from normal melting/boiling points.', answer: 'Melting point is the temperature at',
                  options: ['Melting point is the temperature at', 'melting point is when ice turns to water at 0°C only', 'boiling point of water is always 100°C', 'melting point of ice is always 0°C'],
                  hint: 'If stuck, review c11_phy_cbse_10_001 (Temperature and Heat) and c11_phy_cbse_10_006 (Specific Heat.',
                  misconception: 'Students believe "boiling point of water is always 100°C" and "melting point of ice is always 0°C" as absolute constants, not understanding.' },
                { id: 'b', prompt: 'Why does the temperature of a substance remain constant during melting or boiling even though heat is continuously supplied? Explain at the molecular level.', answer: 'During phase change, supplied heat energy (latent heat) is used to overcome',
                  options: ['During phase change, supplied heat energy (latent heat) is used to overcome', 'heat is lost to surroundings', 'thermometer is faulty', 'boiling point of water is always 100°C'],
                  hint: 'If stuck, review c11_phy_cbse_10_001 (Temperature and Heat) and c11_phy_cbse_10_006 (Specific Heat.',
                  misconception: 'Students believe "boiling point of water is always 100°C" and "melting point of ice is always 0°C" as absolute constants, not understanding.' },
                { id: 'c', prompt: 'Calculate the heat required to melt 250 g of ice at 0°C completely into water at 0°C. Given latent heat of fusion of ice Lf = 3.34 × 10⁵ J/kg.', answer: 'Given: m = 250 g = 0.250 kg, Lf = 3.34 × 10⁵ J/kg',
                  options: ['Given: m = 250 g = 0.250 kg, Lf = 3.34 × 10⁵ J/kg', 'boiling point of water is always 100°C', 'melting point of ice is always 0°C'],
                  hint: 'If stuck, review c11_phy_cbse_10_001 (Temperature and Heat) and c11_phy_cbse_10_006 (Specific Heat.',
                  misconception: 'Students believe "boiling point of water is always 100°C" and "melting point of ice is always 0°C" as absolute constants, not understanding.' }
          ],
            remediations: { 'boiling-point-of-water-is': { steps: ['Revisit the P-T phase diagram of water (NCERT Fig.', '10.10) and trace the fusion/vaporization curves.', 'Perform the syringe experiment: pull plunger on room-temperature water to see boiling without heating.', 'Review the molecular model: temperature = avg kinetic energy; phase change = potential energy change.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_010', difficulty: 'standard',
          question: 'Latent heat is the amount of heat energy per unit mass absorbed or released.',
          hint: 'Review c11_phy_cbse_10_008 (Calorimetry) for heat balance method and c11_phy_cbse_10_006.',
          misconception: 'Students think latent heat "raises the temperature" of the substance during phase change because they associate heat.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of latent heat and write the formula relating heat supplied (Q), mass (m), and latent heat (L) for a phase change.', answer: 'SI unit: J kg⁻¹',
                  options: ['SI unit: J kg⁻¹', 'J/kg·K', 'raises the temperature'],
                  hint: 'Review c11_phy_cbse_10_008 (Calorimetry) for heat balance method and c11_phy_cbse_10_006 (Specific.',
                  misconception: 'Students think latent heat "raises the temperature" of the substance during phase change because they associate heat input only with.' },
                { id: 'b', prompt: 'Calculate the heat required to convert 50 g of ice at 0°C to water at 0°C. Latent heat of fusion of ice = 3.33 × 10⁵ J kg⁻¹.', answer: 'Given: m = 50 g = 0.050 kg, L_f = 3.33 × 10⁵ J kg⁻¹',
                  options: ['Given: m = 50 g = 0.050 kg, L_f = 3.33 × 10⁵ J kg⁻¹', 'raises the temperature'],
                  hint: 'Review c11_phy_cbse_10_008 (Calorimetry) for heat balance method and c11_phy_cbse_10_006 (Specific.',
                  misconception: 'Students think latent heat "raises the temperature" of the substance during phase change because they associate heat input only with.' },
                { id: 'c', prompt: 'A temperature-time graph for heating ice shows a horizontal plateau at 0°C and another at 100°C.', answer: 'Incorrect',
                  options: ['Incorrect', 'raises the temperature'],
                  hint: 'Review c11_phy_cbse_10_008 (Calorimetry) for heat balance method and c11_phy_cbse_10_006 (Specific.',
                  misconception: 'Students think latent heat "raises the temperature" of the substance during phase change because they associate heat input only with.' }
          ],
            remediations: { 'latent-heat-raises-the-temperature': { steps: ['Revisit the temperature-time graph for heating ice (Class 10) and identify the flat regions.', 'Perform a virtual calorimetry simulation (e.g., PhET) showing energy bar charts during melting.', 'Practice unit conversion: express L_f and L_v in J/g and kJ/kg to build intuition.', 'Solve a "step-by-step" problem: ice at -10°C → ice at 0°C → water at 0°C → water at 100°C → steam at 100°C, writing.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_011', difficulty: 'standard',
          question: 'Conduction is the mode of heat transfer between adjacent parts of a material.',
          hint: 'If stuck, revisit the calorimetry principle (c11_phy_cbse_10_008) and practice "heat lost.',
          misconception: 'Students believe that in a composite rod, the temperature drop across each section is proportional to its length (ΔT ∝.',
          parts: [
                { id: 'a', prompt: 'Two rods of identical dimensions but different materials (copper K = 385 W m⁻¹ K⁻¹, steel K = 50.2 W m⁻¹ K⁻¹) have their hot ends at 100°C and cold ends.', answer: 'Steel rod has a steeper temperature gradient',
                  options: ['Steel rod has a steeper temperature gradient', 'better conductor means temperature changes faster', 'better conductor needs smaller gradient for same heat flow'],
                  hint: 'If stuck, revisit the calorimetry principle (c11_phy_cbse_10_008) and practice "heat lost = heat.',
                  misconception: 'Students believe that in a composite rod, the temperature drop across each section is proportional to its length (ΔT ∝ L) regardless.' }
          ],
            remediations: { 'in-a-composite-rod': { steps: ['Re-derive the steady-state condition: "Heat in = Heat out at every cross-section" ⇒ H is constant along the rod.', 'Write H = K A ΔT / L for each section.', 'Equate H for adjacent sections.', 'Solve for ΔT ratios: ΔT₁/ΔT₂ = (K₂ L₁)/(K₁ L₂).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_012', difficulty: 'standard',
          question: 'Thermal conductivity (K) is a material property that quantifies the ability.',
          hint: 'If stuck, review c10_phy_cbse_01_006 (series resistors) and c10_math_cbse_03_005.',
          misconception: 'Students treat thermal conductivity K as an intensive property that adds directly in series (like "total K = K₁ + K₂").',
          parts: [
                { id: 'a', prompt: 'State the SI unit of thermal conductivity and write the formula for heat current through a uniform rod of length L, cross-sectional area A, thermal.', answer: 'SI unit: W m⁻¹ K⁻¹ (or J s⁻¹ m⁻¹ K⁻¹)',
                  options: ['SI unit: W m⁻¹ K⁻¹ (or J s⁻¹ m⁻¹ K⁻¹)', 'total K = K₁ + K₂'],
                  hint: 'If stuck, review c10_phy_cbse_01_006 (series resistors) and c10_math_cbse_03_005 (substitution.',
                  misconception: 'Students treat thermal conductivity K as an intensive property that adds directly in series (like "total K = K₁ + K₂"), confusing it with.' },
                { id: 'b', prompt: 'Two rods of identical dimensions but different materials (copper and steel) are joined end-to-end. The free ends are kept at 100°C and 0°C.', answer: 'Equal',
                  options: ['Equal', 'greater in copper', 'total K = K₁ + K₂'],
                  hint: 'If stuck, review c10_phy_cbse_01_006 (series resistors) and c10_math_cbse_03_005 (substitution.',
                  misconception: 'Students treat thermal conductivity K as an intensive property that adds directly in series (like "total K = K₁ + K₂"), confusing it with.' },
                { id: 'c', prompt: 'A brass rod (K = 109 W m⁻¹ K⁻¹) of length 20 cm and cross-section 2 cm² is joined to a steel rod (K = 50 W m⁻¹ K⁻¹) of length 30 cm and cross-section 3 cm².', answer: 'Step 1: Convert units: L₁ = 0.20 m, A₁ = 2×10⁻⁴ m², L₂ = 0.30 m, A₂ = 3×10⁻⁴ m²',
                  options: ['Step 1: Convert units: L₁ = 0.20 m, A₁ = 2×10⁻⁴ m², L₂ = 0.30 m, A₂ = 3×10⁻⁴ m²', 'total K = K₁ + K₂'],
                  hint: 'If stuck, review c10_phy_cbse_01_006 (series resistors) and c10_math_cbse_03_005 (substitution.',
                  misconception: 'Students treat thermal conductivity K as an intensive property that adds directly in series (like "total K = K₁ + K₂"), confusing it with.' },
                { id: 'd', prompt: 'In Example 10.7 of NCERT, two rods of equal length and cross-section are joined. The equivalent thermal conductivity is given as K\' = 2K₁K₂/(K₁+K₂).', answer: 'For equal L and A: H = K₁A(T₁-T₀)/L = K₂A(T₀-T₂)/L → K₁(T₁-T₀) = K₂(T₀-T₂)',
                  options: ['For equal L and A: H = K₁A(T₁-T₀)/L = K₂A(T₀-T₂)/L → K₁(T₁-T₀) = K₂(T₀-T₂)', 'total K = K₁ + K₂'],
                  hint: 'If stuck, review c10_phy_cbse_01_006 (series resistors) and c10_math_cbse_03_005 (substitution.',
                  misconception: 'Students treat thermal conductivity K as an intensive property that adds directly in series (like "total K = K₁ + K₂"), confusing it with.' }
          ],
            remediations: { 'students-treat-thermal-conductivity-k': { steps: ['Revisit the electrical analogy - draw a series circuit with two resistors R₁, R₂ and a battery.', 'Map voltage → temperature, current → heat current, resistance → thermal resistance.', 'For two rods in series, write H = (T₁-T₀)/R₁ = (T₀-T₂)/R₂.', 'Derive T₀ and H symbolically.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
