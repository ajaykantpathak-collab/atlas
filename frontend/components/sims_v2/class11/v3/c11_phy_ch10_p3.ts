import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch10_p3: SimDef = {
    id: 'v3_c11_phy_ch10_p3',
    title: 'Thermal Properties of Matter · Part 3/3',
    subtitle: 'Separate the energy in transit from the temperature that drives it.',
    classLevel: 11, subject: 'physics', topic: 'Thermal Properties of Matter · Part 3/3',
    chapters: ['c11_phy_ch10'],
    nodeIds: ['c11_phy_cbse_10_013', 'c11_phy_cbse_10_014', 'c11_phy_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a calorimetrist refusing to count stored heat', intro: 'Two spoons in the same tea, one burns your fingers — temperature set the direction, but the material set the flow.', goal: 'Distinguish heat from temperature and handle scale conversions for values versus differences.' },
    discovery: {
        question: '\'How much heat is contained in 1 kg of water at 100 °C?\' — reach for Q = mcΔT?',
        options: ['The question is broken — heat is energy in transit, not stored content; you can only ask how much flows for a given temperature drop', 'Yes — mcΔT gives the heat inside', 'Yes — 420 kJ is the answer', 'No — because water can\'t hold heat at 100 °C'],
        answer: 'The question is broken — heat is energy in transit, not stored content; you can only ask how much flows for a given temperature drop',
        hook: 'A 10 °C rise is an 18 °F rise, not 50 — the +32 belongs to the zero-point offset, not to differences; but ΔT in °C and K are identical.',
    },
    teaching: [
        { title: 'Heat Transfer: Convection', text: 'Convection is a mode of heat transfer in fluids (liquids and gases) where thermal energy is transported by the bulk motion of the fluid itself, driven by density differences arising from temperature.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_10_013', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Explain why the steel spoon burns faster than the wooden one at the same temperature, then correct \'heat flows until both have equal heat.\'',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_phy_cbse_10_013', title: 'Heat Transfer: Convection',
          caseStudy: { intro: 'Observe a pot of water heating on a stove: bubbles form at the bottom and rise vigorously, while the water appears to circulate. This is convection in action.',
            decisions: [{ prompt: 'What is the fundamental requirement for natural convection to occur in a fluid?', options: [
                { text: 'Natural convection requires a fluid (liquid or gas) in a gravitational field with a', outcome: 'Natural convection requires a fluid (liquid or gas) in a gravitational field with a temperature.' },
                { text: 'convection occurs in solids', outcome: 'Not quite — Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon").', reveals: 'convection-occurs-in-solids-e' },
                { text: 'convection does not need gravity', outcome: 'Not quite — Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon").', reveals: 'convection-occurs-in-solids-e' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_014', title: 'Heat Transfer: Radiation: Stefan\'s Law',
          scaffold: { problem: 'A spherical satellite of radius 0.5 m and emissivity 0.8 is in deep space (surroundings at 3 K).',
            steps: [
            { text: 'Identify given: r = 0.5 m, e = 0.8, P_in = 200 W, T_s = 3 K ≈ 0 K (negligible). Find T.' },
            { text: 'Surface area A = 4πr² = 4π(0.5)² = π ≈ 3.14 m². Net radiated power = P_in at steady state: AeσT⁴ = 200 W.' },
            { text: 'Substitute: 0.8 × 5.67×10⁻⁸ × 3.14 × T⁴ = 200.' },
            { text: 'Compute constant: 0.8 × 5.67×10⁻⁸ × 3.14 ≈ 1.42×10⁻⁷. So T⁴ = 200 / (1.42×10⁻⁷) ≈ 1.41×10⁹.' },
            { text: 'T = (1.41×10⁹)^(1/4) ≈ 194 K. Convert to °C: 194 − 273 = −79 °C.', faded: true, blankAnswer: 'T ≈ 194 K (−79 °C)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_10_015', title: 'Newton\'s Law of Cooling',
          scaffold: { problem: 'A metal block of mass 0.5 kg and specific heat 450 J/kg·K cools from 90°C to 70°C in 8 minutes in a room at 25°C.',
            steps: [
            { text: 'Identify given: m = 0.5 kg, s = 450 J/kg·K, Ts = 25°C. First interval: T₁ = 90°C, T₂ = 70°C, t₁ = 8 min = 480 s.' },
            { text: 'Use integrated form: ln((T - Ts)₁/(T - Ts)₂) = Kt. Calculate K from first interval: ΔT₁_initial = 90-25 = 65°C.' },
            { text: 'Apply to second interval: ΔT₂_initial = 60-25 = 35°C, ΔT₂_final = 50-25 = 25°C.' },
            { text: 't₂ = ln(1.4) / (7.65×10⁻⁴) = 0.336 / 7.65×10⁻⁴ = 439 s = 7.32 minutes.' },
            { text: 'Verify: Cooling slows as ΔT decreases (8 min for first 20°C drop at higher ΔT vs 7.3 min for 10°C drop at lower ΔT).', faded: true, blankAnswer: '7.32 minutes (or 439 seconds)' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a thermodynamics pre-lab, a student writes: \'A litre of boiling water contains 420 kJ of heat\' and \'a thermometer measures the heat in a body.\'',
            decisions: [{ prompt: 'What do the heat–temperature definitions require instead?', options: [
                { text: 'Redraw the boundary: heat is energy in TRANSIT across a temperature difference — a body holds internal energy, never \'heat content\'; only Q transferred in a process is defined. Temperature is the intensive quantity deciding flow direction — a thermometer reads temperature via a thermometric property, and scales are conventions anchored to fixed points (triple point 273.16 K; ice/steam points for °C, °F).', outcome: 'The report uses the terms correctly: Q is a process quantity (like work), temperature a state quantity — \'how much heat is in it\' is an ill-posed question.' },
                { text: 'Keep \'heat content\' — hot objects clearly hold more heat than cold ones.', outcome: 'That\'s the caloric-era error: bodies contain internal energy; \'heat\' names the transfer itself — the water holds energy, it gives off heat.', reveals: 'heat-is-stored-content' },
                { text: 'Let \'thermometer measures heat\' pass — it\'s measuring the hotness, close enough.', outcome: 'It measures temperature — the potential for heat flow, not the flow: two same-temperature spoons transfer heat to your hand at different rates.', reveals: 'thermometer-measures-heat' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'Heat flows until temperatures match — not until \'heat amounts\' match; equilibrium is a temperature, never a shared quantity of heat.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_013', difficulty: 'standard',
          question: 'Convection is a mode of heat transfer in fluids (liquids and gases) where.',
          hint: 'If stuck, revisit Class 9 Physics: Archimedes\' principle (buoyancy) and thermal expansion.',
          misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see.',
          parts: [
                { id: 'a', prompt: 'A room heater with a fan (forced convection) warms a 20 m² room in 15 minutes.', answer: 'The heating time will increase significantly (likely by a factor of 3-5 or more)',
                  options: ['The heating time will increase significantly (likely by a factor of 3-5 or more)', 'time remains the same', 'heating stops completely', 'heat convects through the metal spoon'],
                  hint: 'If stuck, revisit Class 9 Physics: Archimedes\' principle (buoyancy) and thermal expansion.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' },
                { id: 'b', prompt: 'Compare the convection pattern in a cylindrical beaker of water heated by a Bunsen burner at the center of the base versus one heated at the side near the.', answer: 'Center heating: Symmetric toroidal roll',
                  options: ['Center heating: Symmetric toroidal roll', 'heat convects through the metal spoon', 'travel', 'convection occurs in solids (e'],
                  hint: 'If stuck, revisit Class 9 Physics: Archimedes\' principle (buoyancy) and thermal expansion.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' }
          ],
            remediations: { 'convection-occurs-in-solids-e': { steps: ['Perform the "potassium permanganate in beaker" demo: Heat gently from below; observe the purple plume rising and.', 'Contrast with a metal rod heated at one end (no visible flow, heat conducts).', 'Use a smoke pencil or incense stick near a radiator (natural convection) and a fan heater (forced convection).', 'Explicitly state: "Convection = Bulk Fluid Motion.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "In a thermos flask, the vacuum layer stops heat loss by convection because there are no molecules to carry heat."', answer: 'The statement is correct in outcome but imprecise in reasoning',
                  options: ['The statement is correct in outcome but imprecise in reasoning', 'heat convects through the metal spoon', 'travel', 'convection occurs in solids (e'],
                  hint: 'If stuck, revisit Class 9 Physics: Archimedes\' principle (buoyancy) and thermal expansion.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' },
                { id: 'b', prompt: 'Design a tabletop experiment using a clear rectangular container, water, food coloring (or potassium permanganate), and a small candle to visualize.', answer: 'Setup: Fill container with cold water',
                  options: ['Setup: Fill container with cold water', 'heat convects through the metal spoon', 'travel', 'convection occurs in solids (e'],
                  hint: 'If stuck, revisit Class 9 Physics: Archimedes\' principle (buoyancy) and thermal expansion.',
                  misconception: 'Students often believe convection occurs in solids (e.g., "heat convects through the metal spoon") because they see heat "travel" from the.' }
          ],
            remediations: { 'convection-occurs-in-solids-e': { steps: ['Perform the "potassium permanganate in beaker" demo: Heat gently from below; observe the purple plume rising and.', 'Contrast with a metal rod heated at one end (no visible flow, heat conducts).', 'Use a smoke pencil or incense stick near a radiator (natural convection) and a fan heater (forced convection).', 'Explicitly state: "Convection = Bulk Fluid Motion.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_014', difficulty: 'standard',
          question: 'Stefan-Boltzmann law states that the total radiant energy emitted per unit time.',
          hint: 'If stuck on T⁴ calculations, review exponent rules and practice (T/100)⁴ shortcuts;.',
          misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the Celsius temperature of a hot plate from 100 °C to 200 °C, its radiative power increases by 2⁴ = 16 times." Identify the.', answer: 'The error is using Celsius instead of Kelvin',
                  options: ['The error is using Celsius instead of Kelvin', 'a shiny metal teapot stays hot longer'],
                  hint: 'If stuck on T⁴ calculations, review exponent rules and practice (T/100)⁴ shortcuts; if confused.',
                  misconception: 'Students often think emissivity e only affects how much radiation a surface *absorbs*, not how much it *emits*.' }
          ],
            remediations: { 'emissivity-e-only-affects-how': { steps: ['Revisit Kirchhoff\'s law (emissivity = absorptivity at thermal equilibrium) using the Leslie cube thought experiment.', 'Compare two identical cans, one black, one shiny, filled with hot water.', 'Calculate H for both at 80 °C using e values 0.9 and 0.1 to quantify the radiative difference.', 'Emphasize that "shiny reflects incoming radiation" is about absorption, while "shiny emits less" is about emission.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_10_015', difficulty: 'standard',
          question: 'Newton\'s Law of Cooling states that the rate of heat loss from a body.',
          hint: 'Review calorimetry (c11_phy_cbse_10_008) for dQ = ms dT and radiation.',
          misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).',
          parts: [
                { id: 'a', prompt: 'State Newton\'s Law of Cooling mathematically and write the SI unit of the proportionality constant k.', answer: 'Newton\'s Law of Cooling: -dQ/dt = k(T - Ts), where k is the cooling constant',
                  options: ['Newton\'s Law of Cooling: -dQ/dt = k(T - Ts), where k is the cooling constant', 'k has unit W/m²K', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Review calorimetry (c11_phy_cbse_10_008) for dQ = ms dT and radiation (c11_phy_cbse_10_014) for the.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' },
                { id: 'b', prompt: 'Why does Newton\'s Law of Cooling hold only for small temperature differences? Explain using the physics of heat transfer modes involved.', answer: 'For small ΔT, heat loss by radiation is approximately linear with ΔT (from',
                  options: ['For small ΔT, heat loss by radiation is approximately linear with ΔT (from', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Review calorimetry (c11_phy_cbse_10_008) for dQ = ms dT and radiation (c11_phy_cbse_10_014) for the.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' },
                { id: 'c', prompt: 'A copper sphere of mass 0.2 kg and specific heat 385 J/kg·K cools from 80°C to 70°C in 5 minutes in a room at 20°C.', answer: 'Given: m = 0.2 kg, s = 385 J/kg·K, T1 = 80°C, T2 = 70°C, Ts = 20°C, t = 300 s',
                  options: ['Given: m = 0.2 kg, s = 385 J/kg·K, T1 = 80°C, T2 = 70°C, Ts = 20°C, t = 300 s', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Review calorimetry (c11_phy_cbse_10_008) for dQ = ms dT and radiation (c11_phy_cbse_10_014) for the.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' },
                { id: 'd', prompt: 'A body cools from 60°C to 40°C in 10 minutes. The surrounding temperature is 20°C. Using Newton\'s Law of Cooling, find the time taken to cool from 40°C to 30°C.', answer: 'Using the integrated form: ln(T - Ts) = -Kt + c',
                  options: ['Using the integrated form: ln(T - Ts) = -Kt + c', 'Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt)'],
                  hint: 'Review calorimetry (c11_phy_cbse_10_008) for dQ = ms dT and radiation (c11_phy_cbse_10_014) for the.',
                  misconception: 'Students believe Newton\'s Law of Cooling gives a linear temperature vs time graph (T = T₀ - kt).' }
          ],
            remediations: { 'newton-s-law-of-cooling': { steps: ['Re-derive the integrated form from ms(dT/dt) = -k(T - Ts) showing the logarithmic solution.', 'Plot sample data: T = 80, 65, 55, 48, 43°C at t = 0, 5, 10, 15, 20 min with Ts = 20°C.', 'Compare with linear cooling prediction to see the divergence.', 'Emphasize that the constant K = k/ms has unit s⁻¹, making Kt dimensionless in the exponent.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
