import type { SimDef } from '../../engine/types';
import C11_PhysicsHeatTransferRadiationSim from '../../../simulations/c6_12/C11_PhysicsHeatTransferRadiationSim';

/** v3 wrapped master — C11_PhysicsHeatTransferRadiationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsheattransferradiationsim: SimDef = {
    id: 'v3w_c11_physicsheattransferradiationsim',
    title: 'Calorimetry: Principle and Method',
    subtitle: 'Covers the calorimetry principle (heat lost = heat gained), the construction and function.',
    classLevel: 11, subject: 'physics', topic: 'Calorimetry: Principle and Method',
    chapters: [],
    nodeIds: ['c11_phy_cbse_10_008', 'c11_phy_cbse_10_011', 'c11_phy_cbse_10_014', 'c11_phy_cbse_10_015', 'c11_phy_cbse_10_001', 'c11_phy_cbse_10_013', 'c11_phy_cbse_10_012', 'c11_phy_cbse_10_002', 'c11_phy_cbse_07_014', 'c11_phy_cbse_11_002', 'c11_phy_cbse_11_011', 'c11_phy_cbse_10_003', 'c11_phy_cbse_10_005', 'c11_phy_cbse_10_006', 'c11_phy_cbse_10_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine placing a hot samosa on a cold plate – the samosa cools while the plate warms until both reach the.', goal: 'Master Calorimetry: Principle and Method.' },
    discovery: {
        question: 'In a calorimetry experiment to find the specific heat of a metal, a student forgets to dry the metal block after removing it from boiling water.',
        options: ['The calculated specific heat will be HIGHER than the true value', 'water equivalent', 'the droplets cool the block faster, confusing rate with total heat'],
        answer: 'The calculated specific heat will be HIGHER than the true value',
        hook: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
    },
    teaching: [
        { title: 'Calorimetry is the experimental technique of.', text: 'Calorimetry is the experimental technique of measuring heat transfer between bodies in an isolated system based on the principle of conservation of energy: the total heat lost by hotter bodies equals.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_008', title: 'Calorimetry is the experimental.',
          scaffold: { problem: 'A 200 g copper vessel (s = 386 J kg⁻¹ K⁻¹) contains 500 g of water at 25°C.',
            steps: [
            { text: 'Identify all components and their properties. Copper vessel: m_c = 0.200 kg, s_c = 386 J kg⁻¹ K⁻¹, T_c = 25°C.' },
            { text: 'Apply calorimetry principle. Heat gained by spoon = Heat lost by (water + copper vessel).' },
            { text: 'Substitute values with units. 0.100 × 460 × (T_f - 15) = (0.500 × 4186 + 0.200 × 386) × (25 - T_f).' },
            { text: 'Solve algebraically. 46(T_f - 15) = 2170.2(25 - T_f) → 46T_f - 690 = 54255 - 2170.2T_f → 2216.2T_f = 54945 → T_f =.' },
            { text: 'Verify reasonableness. T_f (24.79°C) lies between 15°C and 25°C, closer to 25°C because water+copper have much larger.', faded: true, blankAnswer: '24.8°C' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_011', title: 'Conduction is the mode of heat transfer.',
          scaffold: { problem: 'A brass rod (K = 109 W m⁻¹ K⁻¹) of length 40 cm and cross-section 5 cm² is joined end-to-end with a steel rod (K = 50.2 W m⁻¹ K⁻¹) of.',
            steps: [
            { text: 'Convert all units to SI: L_Br = 0.40 m, A_Br = 5 × 10⁻⁴ m², L_St = 0.60 m, A_St = 3 × 10⁻⁴ m², T_H = 150°C, T_C = 30°C.' },
            { text: 'Calculate thermal resistances: R_Br = L_Br/(K_Br A_Br) = 0.40 / (109 × 5×10⁻⁴) = 7.339 K/W.' },
            { text: 'Total resistance R_total = R_Br + R_St = 47.18 K/W. Heat current H = (T_H - T_C) / R_total = (150 - 30) / 47.18 = 2.54.' },
            { text: 'Junction temperature T_j = T_H - H × R_Br = 150 - 2.54 × 7.339 = 150 - 18.64 = 131.36°C.' },
            { text: 'Temperature gradients: dT/dx|_Br = -H/(K_Br A_Br) = -2.54 / (109 × 5×10⁻⁴) = -46.6 K/m.' },
            { text: 'Check consistency: ΔT_Br = 46.6 × 0.40 = 18.6°C, ΔT_St = 168.9 × 0.60 = 101.3°C. Sum = 119.9°C ≈ 120°C.', faded: true, blankAnswer: '(a) H = 2.54 W, (b) T_j = 131.4°C, (c) Brass: -46.6 K/m,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_014', title: 'Stefan-Boltzmann law states that the.',
          scaffold: { problem: 'A spherical satellite of radius 0.5 m and emissivity 0.8 is in deep space (surroundings at 3 K).',
            steps: [
            { text: 'Identify given: r = 0.5 m, e = 0.8, P_in = 200 W, T_s = 3 K ≈ 0 K (negligible). Find T.' },
            { text: 'Surface area A = 4πr² = 4π(0.5)² = π ≈ 3.14 m². Net radiated power = P_in at steady state: AeσT⁴ = 200 W.' },
            { text: 'Substitute: 0.8 × 5.67×10⁻⁸ × 3.14 × T⁴ = 200.' },
            { text: 'Compute constant: 0.8 × 5.67×10⁻⁸ × 3.14 ≈ 1.42×10⁻⁷. So T⁴ = 200 / (1.42×10⁻⁷) ≈ 1.41×10⁹.' },
            { text: 'T = (1.41×10⁹)^(1/4) ≈ 194 K. Convert to °C: 194 − 273 = −79 °C.', faded: true, blankAnswer: 'T ≈ 194 K (−79 °C)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_015', title: 'Newton\'s Law of Cooling states that the.',
          scaffold: { problem: 'A metal block of mass 0.5 kg and specific heat 450 J/kg·K cools from 90°C to 70°C in 8 minutes in a room at 25°C.',
            steps: [
            { text: 'Identify given: m = 0.5 kg, s = 450 J/kg·K, Ts = 25°C. First interval: T₁ = 90°C, T₂ = 70°C, t₁ = 8 min = 480 s.' },
            { text: 'Use integrated form: ln((T - Ts)₁/(T - Ts)₂) = Kt. Calculate K from first interval: ΔT₁_initial = 90-25 = 65°C,.' },
            { text: 'Apply to second interval: ΔT₂_initial = 60-25 = 35°C, ΔT₂_final = 50-25 = 25°C.' },
            { text: 't₂ = ln(1.4) / (7.65×10⁻⁴) = 0.336 / 7.65×10⁻⁴ = 439 s = 7.32 minutes.' },
            { text: 'Verify: Cooling slows as ΔT decreases (8 min for first 20°C drop at higher ΔT vs 7.3 min for 10°C drop at lower ΔT).', faded: true, blankAnswer: '7.32 minutes (or 439 seconds)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_001', title: 'Temperature is an intensive.',
          scaffold: { problem: 'A 0.5 kg iron horseshoe at 600°C is dropped into a bucket containing 20 kg of water at 25°C.',
            steps: [
            { text: 'Identify given quantities with units: m_fe = 0.5 kg, T_fe = 600°C, s_fe = 450 J kg⁻¹ K⁻¹; m_w = 20 kg, T_w = 25°C, s_w.' },
            { text: 'Apply calorimetry principle (heat lost = heat gained) in an isolated system: m_fe s_fe (T_fe - T_f) = m_w s_w (T_f -.' },
            { text: 'Substitute values with units: (0.5 kg)(450 J kg⁻¹ K⁻¹)(600 - T_f) = (20 kg)(4186 J kg⁻¹ K⁻¹)(T_f - 25).' },
            { text: 'Compute: 225(600 - T_f) = 83720(T_f - 25) → 135000 - 225T_f = 83720T_f - 2093000 → 2228000 = 83945T_f.' },
            { text: 'Solve: T_f = 26.54°C. Verify: T_f is between 25°C and 600°C, closer to 25°C because water\'s heat capacity (83720 J/K).', faded: true, blankAnswer: '26.5°C (or 299.7 K)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_013', title: 'Convection is a mode of heat transfer.',
          scaffold: { problem: 'A student places a radiator (room heater) under a window. Explain why this location is more effective for heating the room than placing the.',
            steps: [
            { text: 'Identify the heat source (radiator) and the cold sink (window glass in winter).' },
            { text: 'Cold air near the window glass loses heat to the outside, becomes denser, and sinks downward along the window pane.' },
            { text: 'The radiator heats the adjacent air, causing it to expand, become less dense, and rise buoyantly.' },
            { text: 'The rising hot air from the radiator and the sinking cold air from the window create a strong, coupled convection roll.' },
            { text: 'On an internal wall, there is no strong cold sink; the convection current is weaker and less organized, leading to.', faded: true, blankAnswer: 'The radiator under the window creates a strong convection.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_10_011', title: 'Identify each idea',
          dissect: { specimen: 'Calorimetry: Principle and Method', spots: [
            { id: 's1', label: 'Calorimetry is the experimental technique', prompt: 'Which idea is this? — Calorimetry is the experimental technique of measuring heat transfer between bodies in an.', answer: 'Calorimetry is the experimental technique', options: ['Calorimetry is the experimental technique', 'Conduction is the mode of', 'Stefan-Boltzmann law states that the', 'Newtons Law of Cooling states'] },
            { id: 's2', label: 'Conduction is the mode of', prompt: 'Which idea is this? — Conduction is the mode of heat transfer between adjacent parts of a material due to a.', answer: 'Conduction is the mode of', options: ['Conduction is the mode of', 'Calorimetry is the experimental technique', 'Stefan-Boltzmann law states that the', 'Newtons Law of Cooling states'] },
            { id: 's3', label: 'Stefan-Boltzmann law states that the', prompt: 'Which idea is this? — Stefan-Boltzmann law states that the total radiant energy emitted per unit time (power.', answer: 'Stefan-Boltzmann law states that the', options: ['Stefan-Boltzmann law states that the', 'Calorimetry is the experimental technique', 'Conduction is the mode of', 'Newtons Law of Cooling states'] },
            { id: 's4', label: 'Newtons Law of Cooling states', prompt: 'Which idea is this? — Newton\'s Law of Cooling states that the rate of heat loss from a body is directly.', answer: 'Newtons Law of Cooling states', options: ['Newtons Law of Cooling states', 'Calorimetry is the experimental technique', 'Conduction is the mode of', 'Stefan-Boltzmann law states that the'] },
            { id: 's5', label: 'Temperature is an intensive thermodynamic', prompt: 'Which idea is this? — Temperature is an intensive thermodynamic quantity that quantifies the degree of hotness.', answer: 'Temperature is an intensive thermodynamic', options: ['Temperature is an intensive thermodynamic', 'Calorimetry is the experimental technique', 'Conduction is the mode of', 'Stefan-Boltzmann law states that the'] },
            { id: 's6', label: 'Convection is a mode of', prompt: 'Which idea is this? — Convection is a mode of heat transfer in fluids (liquids and gases) where thermal energy.', answer: 'Convection is a mode of', options: ['Convection is a mode of', 'Calorimetry is the experimental technique', 'Conduction is the mode of', 'Stefan-Boltzmann law states that the'] }
          ] } }
    ],
    explore: { component: C11_PhysicsHeatTransferRadiationSim, prompt: 'Explore the interactive — Calorimetry: Principle and Method' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_008', difficulty: 'standard',
          question: 'Calorimetry is the experimental technique of measuring heat transfer between.',
          hint: 'If stuck, revisit c11_phy_cbse_10_006 (Specific Heat Capacity) for Q = m s ΔT,.',
          misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a calorimeter experiment, the heat lost by the hot metal block is exactly equal to the heat gained by the water alone." Explain why this.', answer: 'The statement ignores the calorimeter cup (and stirrer)',
                  options: ['The statement ignores the calorimeter cup (and stirrer)', 'water equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' },
                { id: 'b', prompt: 'A 0.050 kg aluminium sphere at 100°C is dropped into a 0.150 kg copper calorimeter containing 0.200 kg water at 20°C. The final steady temperature is 24°C.', answer: 'Heat lost by Al = m_Al s_Al (100 - 24) = 0.050 × s_Al × 76 = 3.8 s_Al J',
                  options: ['Heat lost by Al = m_Al s_Al (100 - 24) = 0.050 × s_Al × 76 = 3.8 s_Al J', 'water equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' },
                { id: 'c', prompt: 'Two identical calorimeters A and B contain equal masses of water at 20°C.', answer: 'Calorimeter B (with aluminium) reaches a higher final temperature',
                  options: ['Calorimeter B (with aluminium) reaches a higher final temperature', 'water equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' }
          ],
            remediations: { 'the-calorimeter-s-water-equivalent': { steps: ['Hold a copper cup and a glass beaker; feel that copper warms faster in your hand – it has lower heat capacity per gram.', 'Calculate the heat capacity of the copper cup (m_c × s_c) and divide by s_water to get water equivalent in kg.', 'In a problem, replace the calorimeter with this equivalent mass of water *at the calorimeter\'s initial temperature* and.', 'Compare with the direct method (separate heat gained by calorimeter) to see they yield identical results.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.',
          parts: [
                { id: 'a', prompt: 'In a calorimetry experiment to find the specific heat of a metal, a student forgets to dry the metal block after removing it from boiling water.', answer: 'The calculated specific heat will be HIGHER than the true value',
                  options: ['The calculated specific heat will be HIGHER than the true value', 'water equivalent', 'the droplets cool the block faster, confusing rate with total heat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the calorimeter\'s "water equivalent" is a physical mass of water that can be poured in.' }
          ],
            remediations: { 'the-calorimeter-s-water-equivalent': { steps: ['Hold a copper cup and a glass beaker; feel that copper warms faster in your hand – it has lower heat capacity per gram.', 'Calculate the heat capacity of the copper cup (m_c × s_c) and divide by s_water to get water equivalent in kg.', 'In a problem, replace the calorimeter with this equivalent mass of water *at the calorimeter\'s initial temperature* and.', 'Compare with the direct method (separate heat gained by calorimeter) to see they yield identical results.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_011', difficulty: 'standard',
          question: 'Conduction is the mode of heat transfer between adjacent parts of a material.',
          hint: 'If stuck, revisit the calorimetry principle (c11_phy_cbse_10_008) and practice "heat lost.',
          misconception: 'Students believe that in a composite rod, the temperature drop across each section is proportional to its length (ΔT ∝.',
          parts: [
                { id: 'a', prompt: 'Two rods of identical dimensions but different materials (copper K = 385 W m⁻¹ K⁻¹, steel K = 50.2 W m⁻¹ K⁻¹) have their hot ends at 100°C and cold ends at.', answer: 'Steel rod has a steeper temperature gradient',
                  options: ['Steel rod has a steeper temperature gradient', 'better conductor means temperature changes faster', 'better conductor needs smaller gradient for same heat flow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in a composite rod, the temperature drop across each section is proportional to its length (ΔT ∝ L) regardless of.' }
          ],
            remediations: { 'in-a-composite-rod': { steps: ['Re-derive the steady-state condition: "Heat in = Heat out at every cross-section" ⇒ H is constant along the rod.', 'Write H = K A ΔT / L for each section.', 'Equate H for adjacent sections.', 'Solve for ΔT ratios: ΔT₁/ΔT₂ = (K₂ L₁)/(K₁ L₂).', 'Practice with a numerical example: Copper (K=385) and Steel (K=50) rods of equal L, A, with ends at 100°C and 0°C.', 'Verify using the concept of thermal resistance R = L/(KA) where ΔT = H R, so voltage-divider analogy applies.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_014', difficulty: 'standard',
          question: 'Stefan-Boltzmann law states that the total radiant energy emitted per unit time.',
          hint: 'If stuck on T⁴ calculations, review exponent rules and practice (T/100)⁴ shortcuts; if.',
          misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the Celsius temperature of a hot plate from 100 °C to 200 °C, its radiative power increases by 2⁴ = 16 times." Identify the.', answer: 'The error is using Celsius instead of Kelvin',
                  options: ['The error is using Celsius instead of Kelvin', 'a shiny metal teapot stays hot longer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.' }
          ],
            remediations: { 'emissivity-e-only-affects-how': { steps: ['Revisit Kirchhoff\'s law (emissivity = absorptivity at thermal equilibrium) using the Leslie cube thought experiment.', 'Compare two identical cans, one black, one shiny, filled with hot water.', 'Calculate H for both at 80 °C using e values 0.9 and 0.1 to quantify the radiative difference.', 'Emphasize that "shiny reflects incoming radiation" is about absorption, while "shiny emits less" is about emission —.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.',
          parts: [
                { id: 'a', prompt: 'A 100 W incandescent bulb filament (T ≈ 2800 K, e ≈ 0.3) has surface area 2.5 × 10⁻⁵ m².', answer: 'H = eσAT⁴ = 0.3 × 5.67×10⁻⁸ × 2.5×10⁻⁵ × (2800)⁴',
                  options: ['H = eσAT⁴ = 0.3 × 5.67×10⁻⁸ × 2.5×10⁻⁵ × (2800)⁴', 'a shiny metal teapot stays hot longer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.' },
                { id: 'b', prompt: 'Design a simple experiment using a Leslie cube (a metal cube with four differently finished vertical faces) and a radiation detector to demonstrate that.', answer: 'Heat the Leslie cube uniformly (e.g., with hot water inside)',
                  options: ['Heat the Leslie cube uniformly (e.g., with hot water inside)', 'measure temperature with thermometer', 'a shiny metal teapot stays hot longer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.' }
          ],
            remediations: { 'emissivity-e-only-affects-how': { steps: ['Revisit Kirchhoff\'s law (emissivity = absorptivity at thermal equilibrium) using the Leslie cube thought experiment.', 'Compare two identical cans, one black, one shiny, filled with hot water.', 'Calculate H for both at 80 °C using e values 0.9 and 0.1 to quantify the radiative difference.', 'Emphasize that "shiny reflects incoming radiation" is about absorption, while "shiny emits less" is about emission —.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_015', difficulty: 'standard',
          question: 'Newton\'s Law of Cooling states that the rate of heat loss from a body is.',
          hint: 'Review calorimetry (c11_phy_cbse_10_008) for dQ = ms dT and radiation.',
          misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).',
          parts: [
                { id: 'a', prompt: 'State Newton\'s Law of Cooling mathematically and write the SI unit of the proportionality constant k.', answer: 'Newton\'s Law of Cooling: -dQ/dt = k(T - Ts), where k is the cooling constant',
                  options: ['Newton\'s Law of Cooling: -dQ/dt = k(T - Ts), where k is the cooling constant', 'k has unit W/m²K', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' },
                { id: 'b', prompt: 'Why does Newton\'s Law of Cooling hold only for small temperature differences? Explain using the physics of heat transfer modes involved.', answer: 'For small ΔT, heat loss by radiation is approximately linear with ΔT (from',
                  options: ['For small ΔT, heat loss by radiation is approximately linear with ΔT (from', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' },
                { id: 'c', prompt: 'A copper sphere of mass 0.2 kg and specific heat 385 J/kg·K cools from 80°C to 70°C in 5 minutes in a room at 20°C.', answer: 'Given: m = 0.2 kg, s = 385 J/kg·K, T1 = 80°C, T2 = 70°C, Ts = 20°C, t = 300 s',
                  options: ['Given: m = 0.2 kg, s = 385 J/kg·K, T1 = 80°C, T2 = 70°C, Ts = 20°C, t = 300 s', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' }
          ],
            remediations: { 'newton-s-law-of-cooling': { steps: ['Re-derive the integrated form from ms(dT/dt) = -k(T - Ts) showing the logarithmic solution.', 'Plot sample data: T = 80, 65, 55, 48, 43°C at t = 0, 5, 10, 15, 20 min with Ts = 20°C.', 'Compare with linear cooling prediction to see the divergence.', 'Emphasize that the constant K = k/ms has unit s⁻¹, making Kt dimensionless in the exponent.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using household items to verify Newton\'s Law of Cooling.', answer: 'Heat water in a steel tumbler to 80°C, place in a room at known Ts',
                  options: ['Heat water in a steel tumbler to 80°C, place in a room at known Ts', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' }
          ],
            remediations: { 'newton-s-law-of-cooling': { steps: ['Re-derive the integrated form from ms(dT/dt) = -k(T - Ts) showing the logarithmic solution.', 'Plot sample data: T = 80, 65, 55, 48, 43°C at t = 0, 5, 10, 15, 20 min with Ts = 20°C.', 'Compare with linear cooling prediction to see the divergence.', 'Emphasize that the constant K = k/ms has unit s⁻¹, making Kt dimensionless in the exponent.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_001', difficulty: 'standard',
          question: 'Temperature is an intensive thermodynamic quantity that quantifies the degree.',
          hint: 'Revisit Class 7 "Heat and Temperature: Introduction" (c7_physics_ch03_001) for heat flow.',
          misconception: 'Students believe "heat is a form of energy stored in a body" and use phrases like "heat content" or "body contains 500.',
          parts: [
                { id: 'a', prompt: 'Define temperature and heat. State their SI units. Is heat a property of a system? Justify your answer in one sentence.', answer: 'Temperature is an intensive thermodynamic variable measuring degree of hotness',
                  options: ['Temperature is an intensive thermodynamic variable measuring degree of hotness', 'heat is energy stored in a body', 'heat is a form of energy stored in a body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "heat is a form of energy stored in a body" and use phrases like "heat content" or "body contains 500 J of heat." They.' },
                { id: 'b', prompt: 'Two identical copper blocks A and B are at 80°C and 20°C respectively. They are placed in thermal contact in an insulated container.', answer: 'Heat flows from block A (80°C) to block B (20°C) until thermal equilibrium',
                  options: ['Heat flows from block A (80°C) to block B (20°C) until thermal equilibrium', 'final temperature is not 50°C', 'heat is a form of energy stored in a body'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "heat is a form of energy stored in a body" and use phrases like "heat content" or "body contains 500 J of heat." They.' },
                { id: 'c', prompt: 'A 2.0 kg aluminium block at 150°C is placed in thermal contact with a 3.0 kg copper block at 30°C in an insulated container.', answer: 'Step 1: Heat lost by Al = heat gained by Cu (insulated system)',
                  options: ['Step 1: Heat lost by Al = heat gained by Cu (insulated system)', 'heat is a form of energy stored in a body', 'heat content'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "heat is a form of energy stored in a body" and use phrases like "heat content" or "body contains 500 J of heat." They.' }
          ],
            remediations: { 'heat-is-a-form-of': { steps: ['Hold a metal ruler at room temperature — it feels neither hot nor cold.', 'Place identical ice cubes on a metal plate and a plastic plate.', 'Re-read the definition: heat is energy *crossing the boundary* due to ΔT.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "heat is a form of energy stored in a body" and use phrases like "heat content" or "body contains 500.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following solution: "Two bodies at different temperatures are brought into contact.', answer: 'The error: "until both have the same amount of heat"',
                  options: ['The error: "until both have the same amount of heat"', 'heat is a form of energy stored in a body', 'heat content', 'body contains 500 J of heat'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "heat is a form of energy stored in a body" and use phrases like "heat content" or "body contains 500 J of heat." They.' }
          ],
            remediations: { 'heat-is-a-form-of': { steps: ['Hold a metal ruler at room temperature — it feels neither hot nor cold.', 'Place identical ice cubes on a metal plate and a plastic plate.', 'Re-read the definition: heat is energy *crossing the boundary* due to ΔT.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_013', difficulty: 'standard',
          question: 'Convection is a mode of heat transfer in fluids (liquids and gases) where.',
          hint: 'If stuck, revisit Class 9 Physics: Archimedes\' principle (buoyancy) and thermal expansion.',
          misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see.',
          parts: [
                { id: 'a', prompt: 'A room heater with a fan (forced convection) warms a 20 m² room in 15 minutes.', answer: 'The heating time will increase significantly (likely by a factor of 3-5 or more)',
                  options: ['The heating time will increase significantly (likely by a factor of 3-5 or more)', 'time remains the same', 'heating stops completely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' },
                { id: 'b', prompt: 'Compare the convection pattern in a cylindrical beaker of water heated by a Bunsen burner at the center of the base versus one heated at the side near the.', answer: 'Center heating: Symmetric toroidal roll',
                  options: ['Center heating: Symmetric toroidal roll', 'heat convects through the metal spoon', 'travel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' }
          ],
            remediations: { 'convection-occurs-in-solids-e': { steps: ['Perform the "potassium permanganate in beaker" demo: Heat gently from below; observe the purple plume rising and.', 'Contrast with a metal rod heated at one end (no visible flow, heat conducts).', 'Use a smoke pencil or incense stick near a radiator (natural convection) and a fan heater (forced convection) to.', 'Explicitly state: "Convection = Bulk Fluid Motion.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "In a thermos flask, the vacuum layer stops heat loss by convection because there are no molecules to carry heat."', answer: 'The statement is correct in outcome but imprecise in reasoning',
                  options: ['The statement is correct in outcome but imprecise in reasoning', 'heat convects through the metal spoon', 'travel', 'convection occurs in solids (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' },
                { id: 'b', prompt: 'Design a tabletop experiment using a clear rectangular container, water, food coloring (or potassium permanganate), and a small candle to visualize a.', answer: 'Setup: Fill container with cold water',
                  options: ['Setup: Fill container with cold water', 'heat convects through the metal spoon', 'travel', 'convection occurs in solids (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' },
                { id: 'c', prompt: 'Compare the convection pattern in a cylindrical beaker of water heated by a Bunsen burner at the center of the base versus one heated at the side near the.', answer: 'Center heating: Symmetric toroidal roll',
                  options: ['Center heating: Symmetric toroidal roll', 'heat convects through the metal spoon', 'travel', 'convection occurs in solids (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' }
          ],
            remediations: { 'convection-occurs-in-solids-e': { steps: ['Perform the "potassium permanganate in beaker" demo: Heat gently from below; observe the purple plume rising and.', 'Contrast with a metal rod heated at one end (no visible flow, heat conducts).', 'Use a smoke pencil or incense stick near a radiator (natural convection) and a fan heater (forced convection) to.', 'Explicitly state: "Convection = Bulk Fluid Motion.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
