import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch03_p1: SimDef = {
    id: 'v3_c10_phy_ch03_p1',
    title: 'Sources of Energy · Part 1/2',
    subtitle: 'Choose how a nation powers itself without choking its sky',
    classLevel: 10, subject: 'physics', topic: 'Sources of Energy · Part 1/2',
    chapters: ['c10_phy_ch03'],
    nodeIds: ['c10_phy_cbse_03_001', 'c10_phy_cbse_03_002', 'c10_phy_cbse_03_003', 'c10_phy_cbse_03_004', 'c10_phy_cbse_03_005', 'c10_phy_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an energy planner for a growing nation', intro: 'Your country needs power — for homes, factories, farms and phones. Every option on the table has a catch: coal pollutes, dams displace, solar sleeps at night, nuclear demands caution.', goal: 'Compare conventional and non-conventional energy sources on calorific value, availability and environmental cost, and argue for sustainable choices.' },
    discovery: {
        question: 'Coal and petroleum burn beautifully — high calorific value, easy transport, proven technology. Yet every textbook insists we must move beyond them. What two clocks are fossil fuels racing against?',
        options: ['They\'re non-renewable (millions of years to form) AND their combustion pumps out CO₂, SO₂ and particulates — depletion plus pollution', 'They\'re actually radioactive, like uranium', 'They\'re running out globally this year — next month there\'ll be none', 'They\'re too cheap, which hurts the economy'],
        answer: 'They\'re non-renewable (millions of years to form) AND their combustion pumps out CO₂, SO₂ and particulates — depletion plus pollution',
        hook: 'Fossil fuels are ancient sunlight, banked underground for 300 million years — and we\'re spending it in three centuries while the exhaust alters the sky.',
    },
    teaching: [
        { title: 'Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum)', text: 'Fossil fuels are non-renewable energy sources formed from the decomposed remains of ancient plants and animals buried under sediment over millions of years, primarily coal and petroleum, which store.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_03_001', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Judge the world\'s energy menu: weigh fossil fuels against solar, wind, hydro, biomass and nuclear on availability, environment and scale — then design a sensible energy mix for a growing country.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_001', title: 'Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum)',
          scaffold: { problem: 'A household uses 15 kg of LPG (liquefied petroleum gas) per month.',
            steps: [
            { text: 'Identify given quantities: mass of LPG m = 15 kg, calorific value CV = 50,000 kJ/kg.' },
            { text: 'Identify the formula: Heat energy Q = m × CV.' },
            { text: 'Substitute values with units: Q = 15 kg × 50 MJ/kg.' },
            { text: 'Compute and track unit cancellation: kg × MJ/kg = MJ. Q = 750 MJ.' },
            { text: 'Verify reasonableness: 15 kg of LPG is a typical monthly cylinder; 750 MJ is a plausible energy amount for cooking.', faded: true, blankAnswer: '750 MJ' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_002', title: 'Thermal Power Plant and Hydro Power Plant: Working',
          scaffold: { problem: 'A hydro power plant has a water reservoir at a height of 150 m above the turbine. Water flows at a rate of 500 kg/s.',
            steps: [
            { text: 'Identify given: h = 150 m, mass flow rate (dm/dt) = 500 kg/s, η = 85% = 0.85, g = 9.8 m/s².' },
            { text: 'The input power is the rate of loss of gravitational potential energy of water. P_in = (dm/dt) × g × h.' },
            { text: 'Substitute values: P_in = 500 kg/s × 9.8 m/s² × 150 m = 735,000 W = 735 kW.' },
            { text: 'Apply efficiency: P_out = η × P_in = 0.85 × 735,000 W = 624,750 W = 624.75 kW ≈ 625 kW.' },
            { text: 'Verify: 625 kW is a reasonable output for a small hydro plant. Units: kg/s × m/s² × m = kg·m²/s³ = W. Correct.', faded: true, blankAnswer: '625 kW (or 624.75 kW)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_003', title: 'Improvements in Technology for Using Conventional Energy',
          scaffold: { problem: 'A 500 MW coal-fired thermal power plant currently operates at 34% efficiency.',
            steps: [
            { text: 'Identify given quantities with units: P_out = 500 MW = 500 × 10⁶ W, η₁ = 0.34, η₂ = 0.40, CV = 22 MJ/kg = 22 × 10⁶.' },
            { text: 'Identify formula: Coal mass = (P_out × time) / (η × CV). Check units: (W × s) / (dimensionless × J/kg) = J / (J/kg).' },
            { text: 'Substitute for current plant: m₁ = (500×10⁶ × 86400) / (0.34 × 22×10⁶) = (4.32×10¹³) / (7.48×10⁶) = 5,775,397.' },
            { text: 'Substitute for upgraded plant: m₂ = (500×10⁶ × 86400) / (0.40 × 22×10⁶) = (4.32×10¹³) / (8.8×10⁶) = 4,909,091.' },
            { text: 'Daily savings = 5775.4 - 4909.1 = 866.3 tonnes/day. Annual savings = 866.3 × 365 = 316,199.5 tonnes/year ≈ 3.16 lakh.' },
            { text: 'Verify reasonableness: 500 MW plant burning ~5000-6000 tonnes/day is typical for Indian plants.', faded: true, blankAnswer: '(a) 5775 tonnes/day, (b) 4909 tonnes/day, (c) 3.16 × 10⁵.' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_004', title: 'Alternative Sources: Solar Energy and Solar Devices',
          caseStudy: { intro: 'Begin with a real-world observation: notice how a car parked in the summer sun becomes extremely hot inside, or how water in a black pipe on a rooftop gets.',
            decisions: [{ prompt: 'What is the primary form of energy radiated by the Sun that solar devices harness, and name any two solar devices used in daily life?', options: [
                { text: 'The Sun radiates electromagnetic energy (heat and light)', outcome: 'The Sun radiates electromagnetic energy (heat and light). Two common solar devices are solar cooker.' },
                { text: 'solar energy comes from burning fuel', outcome: 'Not quite — Students believe a solar cooker works mainly because the mirrored lid reflects sunlight directly.', reveals: 'a-solar-cooker-works-mainly' },
                { text: 'solar fan', outcome: 'Not quite — Students believe a solar cooker works mainly because the mirrored lid reflects sunlight directly.', reveals: 'a-solar-cooker-works-mainly' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_005', title: 'Energy from the Sea: Tidal, Wave and Ocean Thermal Energy',
          scaffold: { problem: 'A tidal barrage at the Gulf of Kutch has a basin area of 15 km². The average tidal range is 5.5 m. Seawater density = 1025 kg/m³.',
            steps: [
            { text: 'Identify given quantities: Area A = 15 km² = 15 × 10⁶ m²; Tidal range h = 5.5 m; ρ = 1025 kg/m³; η = 0.28; g = 9.8.' },
            { text: 'Calculate volume of water trapped per cycle: V = A × h = (15 × 10⁶ m²) × 5.5 m = 8.25 × 10⁷ m³.' },
            { text: 'Calculate mass of water: m = ρV = 1025 kg/m³ × 8.25 × 10⁷ m³ = 8.456 × 10¹⁰ kg.' },
            { text: 'Effective head (fall of centre of mass) = h/2 = 5.5 m / 2 = 2.75 m.' },
            { text: 'Gravitational PE available per cycle = mgh = (8.456 × 10¹⁰) × 9.8 × 2.75 = 2.277 × 10¹² J = 2277 GJ.' },
            { text: 'Electrical energy per cycle = η × PE = 0.28 × 2277 GJ = 637.6 GJ.' },
            { text: 'Time per cycle = 12.4 hr = 12.4 × 3600 s = 44,640 s.' },
            { text: 'Average power = Electrical energy per cycle / Time per cycle = 637.6 × 10⁹ J / 44,640 s = 14.28 × 10⁶ W = 14.3 MW.', faded: true, blankAnswer: '(a) 2277 GJ (available PE), 638 GJ (electrical). (b) 14.3.' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_006', title: 'Geothermal Energy: Tapping Earth\'s Internal Heat',
          caseStudy: { intro: 'Observe hot springs at Manikaran (Himachal Pradesh) or Tattapani (Chhattisgarh) where groundwater heated by deep Earth emerges naturally — this visible.',
            decisions: [{ prompt: 'State the two primary sources of Earth\'s internal heat that make geothermal energy possible, and give the typical geothermal gradient value.', options: [
                { text: 'The two primary sources are: (1) radioactive decay of uranium, thorium, and potassium', outcome: 'The two primary sources are: (1) radioactive decay of uranium, thorium, and potassium isotopes.' },
                { text: 'free heat from volcanoes', outcome: 'Not quite — Students believe geothermal energy is "free heat from volcanoes" available everywhere — they.', reveals: 'geothermal-energy-is-free-heat' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_001', title: 'A real-world call',
          caseStudy: { intro: 'Nuclear power offers enormous clean energy — and waste that stays dangerous for millennia, plus the rare catastrophic failure. Solar is safer but can\'t yet power a steel plant at night.',
            decisions: [{ prompt: 'Should nuclear be part of India\'s energy future?', options: [
                { text: 'Yes — coal kills more people than nuclear ever has', outcome: 'Statistically true — air pollution\'s toll dwarfs reactor accidents; but statistics don\'t calm a community near a plant.' },
                { text: 'No — don\'t make waste that outlives your grandchildren', outcome: 'The intergenerational ethics argument; but refusing nuclear often means accepting fossil fuels, which harm grandchildren too.' },
                { text: 'Yes, with storage solved BEFORE scaling', outcome: 'The engineering-honesty answer — build the waste solution first; the risk is \'later\' never arriving.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A family is deciding fuel for a small food stall. One member argues for the fuel with the highest calorific value \'since more heat per kilo always means cheaper cooking.\' Another wants to compare what a kilo of each actually buys.',
            decisions: [{ prompt: 'How should they really choose a fuel?', options: [
                { text: 'Compare cost per unit of useful energy, not energy per kilo alone — a fuel with high calorific value can still lose if each kilo is much costlier, and a lower-value fuel can win if it is cheap enough per megajoule. Convenience also matters: a liquid like LPG lights easily, stores compactly and leaves little ash, which a solid fuel does not.', outcome: 'The chapter\'s lesson is that \'good fuel\' is a package — calorific value, cost per unit energy, ease of handling and cleanliness all count, not one number.' },
                { text: 'The first member is right — whichever fuel releases the most heat per kilo is automatically the cheapest choice.', outcome: 'Cost per kilo can overwhelm heat per kilo — divide the price by the energy each fuel delivers and the \'stronger\' fuel often loses.', reveals: 'high-cv-means-cheapest' },
                { text: 'They should simply pick whichever fuel the shop sells — all fuels deliver the same energy anyway.', outcome: 'Fuels differ enormously in energy per kilo and in handling — treating them as identical wastes money or heat.', reveals: 'all-fuels-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'No energy source is free — every one trades something. The art is matching the source to the place: sun where it\'s bright, wind where it blows, and less of what the sky can\'t absorb.',
            decisions: [{ prompt: 'What comes next? Sources of Energy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sources of Energy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_001', difficulty: 'standard',
          question: 'Fossil fuels are non-renewable energy sources formed from the decomposed.',
          hint: 'If stuck, revisit Class 9 node c9_physics_ch4_4 (Forms of Energy) and c9_physics_ch4_8.',
          misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental impact of burning coal versus petroleum in terms of (a) CO₂ emissions per unit energy, (b) sulphur dioxide emissions, and (c) solid.', answer: 'CO₂ emissions per unit energy, (',
                  options: ['CO₂ emissions per unit energy, (', 'fossil fuels are just old plants/animals that turned into fuel', 'reserves', 'resources'],
                  hint: 'If stuck, revisit Class 9 node c9_physics_ch4_4 (Forms of Energy) and c9_physics_ch4_8 (Law.',
                  misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the specific geological.' }
          ],
            remediations: { 'fossil-fuels-are-just-old': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Show a cross-section diagram.', '(2) Use a simple analogy: just as a pressure cooker transforms food faster, geological pressure transforms biomass over.', '(3) Give a data table of Indian coal reserves vs.', 'resources (from Ministry of Coal) and ask them to calculate the extraction lifetime at current consumption.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since petroleum has a higher calorific value than coal, it is always the better fuel for electricity generation." Evaluate this statement.', answer: 'The statement is not universally true',
                  options: ['The statement is not universally true', 'fossil fuels are just old plants/animals that turned into fuel', 'reserves', 'resources'],
                  hint: 'If stuck, revisit Class 9 node c9_physics_ch4_4 (Forms of Energy) and c9_physics_ch4_8 (Law.',
                  misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the specific geological.' }
          ],
            remediations: { 'fossil-fuels-are-just-old': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Show a cross-section diagram.', '(2) Use a simple analogy: just as a pressure cooker transforms food faster, geological pressure transforms biomass over.', '(3) Give a data table of Indian coal reserves vs.', 'resources (from Ministry of Coal) and ask them to calculate the extraction lifetime at current consumption.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_002', difficulty: 'standard',
          question: 'A thermal power plant converts the chemical energy of fossil fuels (coal, oil.',
          hint: 'If stuck, revisit Class 9 Work-Energy theorem (c9_physics_ch4_3) and Class 8.',
          misconception: 'Students often think the generator in a power plant "creates" electricity from nothing, or that the turbine "produces".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural',
                  options: ['A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural', 'Fossil fuels are non-renewable energy sources formed from the decomposed remains of', 'Improvements in technology for using conventional energy refer to advancements in', 'Solar energy is the radiant energy emitted by the Sun in the form of electromagnetic'],
                  hint: 'If stuck, revisit Class 9 Work-Energy theorem (c9_physics_ch4_3) and Class 8 electromagnetic.',
                  misconception: 'Students often think the generator in a power plant "creates" electricity from nothing, or that the turbine "produces" energy.' }
          ],
            remediations: { 'the-generator-in-a-power': { steps: ['Revisit Class 8 electromagnetic induction (c8_physics_ch2_1) — perform the activity: move a magnet in/out of a coil.', 'Understand that relative motion between coil and magnetic field is essential.', 'In a power plant, the turbine provides this rotation.', 'Draw a diagram: Turbine shaft → Rotor (coil) → Stator (magnetic field) → AC output.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_003', difficulty: 'standard',
          question: 'Improvements in technology for using conventional energy refer to advancements.',
          hint: 'If stuck on efficiency calculations, revisit c9_physics_ch4_9 (Power and efficiency.',
          misconception: 'Students believe "improved technology for conventional energy" means replacing coal with solar/wind.',
          parts: [
                { id: 'a', prompt: 'A modern ultra-supercritical thermal power plant operates at 45% efficiency while an older subcritical plant operates at 33%.', answer: 'Higher efficiency means more output per unit input',
                  options: ['Higher efficiency means more output per unit input', 'energy is lost', 'improved technology for conventional energy'],
                  hint: 'If stuck on efficiency calculations, revisit c9_physics_ch4_9 (Power and efficiency formulas) and.',
                  misconception: 'Students believe "improved technology for conventional energy" means replacing coal with solar/wind.' },
                { id: 'b', prompt: 'Analyze the following two statements and decide which represents a genuine technological improvement in conventional energy use and which is merely fuel.', answer: 'Statement B is the technological improvement for conventional energy',
                  options: ['Statement B is the technological improvement for conventional energy', 'improvement in technology', 'improved technology for conventional energy'],
                  hint: 'If stuck on efficiency calculations, revisit c9_physics_ch4_9 (Power and efficiency formulas) and.',
                  misconception: 'Students believe "improved technology for conventional energy" means replacing coal with solar/wind.' }
          ],
            remediations: { 'improved-technology-for-conventional-energy': { steps: ['Revisit node c10_phy_cbse_03_001 to relist conventional sources (coal, petroleum, natural gas) — these are the *only*.', 'Review Class 9 Work-Energy theorem (c9_physics_ch4_3) and efficiency definition (c9_physics_ch4_9): η = Useful Output.', 'Perform the Diagnostic Question 6 experiment (rocket stove vs open fire) — measure temperature rise per gram of fuel.', 'Create a two-column table: "Fuel Switching" (coal→gas, petrol→EV) vs "Technology Improvement" (supercritical boiler.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_004', difficulty: 'standard',
          question: 'Solar energy is the radiant energy emitted by the Sun in the form.',
          hint: 'Review Class 6 "Radiation: Heat Without a Medium" (c6_physics_ch07_022) for.',
          misconception: 'Students believe a solar cooker works mainly because the mirrored lid reflects sunlight directly onto the food, and.',
          parts: [
                { id: 'a', prompt: 'What is the primary form of energy radiated by the Sun that solar devices harness, and name any two solar devices used in daily life?', answer: 'The Sun radiates electromagnetic energy (heat and light)',
                  options: ['The Sun radiates electromagnetic energy (heat and light)', 'solar energy comes from burning fuel', 'solar fan'],
                  hint: 'Review Class 6 "Radiation: Heat Without a Medium" (c6_physics_ch07_022) for absorption/radiation.',
                  misconception: 'Students believe a solar cooker works mainly because the mirrored lid reflects sunlight directly onto the food, and they ignore the crucial.' }
          ],
            remediations: { 'a-solar-cooker-works-mainly': { steps: ['Perform a quick demo — place a black-painted metal bowl with water in direct sunlight, cover one with a glass plate.', 'Ask student to explain why the covered one is hotter.', 'Connect to the solar cooker diagram in NCERT — label the glass cover, black interior, and insulation.', 'Have student write a 3-sentence explanation using terms "radiation", "absorption", "greenhouse effect".'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_005', difficulty: 'standard',
          question: 'Energy from the sea refers to the harnessing of three distinct forms.',
          hint: 'Revisit Class 9 Work & Energy: gravitational potential energy derivation (mgh), kinetic.',
          misconception: '**Misconception:** "Tidal energy and wave energy are the same thing — both come from the sea." **Exact wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Energy from the sea refers to the harnessing of three distinct forms of renewable energy',
                  options: ['Energy from the sea refers to the harnessing of three distinct forms of renewable energy', 'Fossil fuels are non-renewable energy sources formed from the decomposed remains of', 'A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural', 'Improvements in technology for using conventional energy refer to advancements in'],
                  hint: 'Revisit Class 9 Work & Energy: gravitational potential energy derivation (mgh), kinetic energy.',
                  misconception: '**Misconception:** "Tidal energy and wave energy are the same thing — both come from the sea." **Exact wrong reasoning:** Students conflate.' }
          ],
            remediations: { 'misconception-tidal-energy-and-wave': { steps: ['**Visual distinction:** Show two 30-second videos — one of a tidal barrage (La Rance, France) with slow, massive water.', '**Cause mapping:** Create a 2-column table: **Tidal** → Cause: Moon/Sun gravity → Energy: Potential (mgh) → Period.', '**Wave** → Cause: Wind friction → Energy: Kinetic (½mv²) → Period: 5–20 sec.', '**Numerical anchor:** Calculate PE of 1 m³ water raised 5 m (tidal) vs.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_006', difficulty: 'standard',
          question: 'Geothermal energy is the thermal energy generated and stored within the Earth\'s.',
          hint: 'If stuck on convection mechanism, review c7_physics_ch03_004 (Convection: Heat Transfer.',
          misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental impact profiles of a flash steam plant vs. a binary cycle plant at the same geothermal site.', answer: 'Binary cycle plant is more suitable',
                  options: ['Binary cycle plant is more suitable', 'higher efficiency', 'free heat from volcanoes'],
                  hint: 'If stuck on convection mechanism, review c7_physics_ch03_004 (Convection: Heat Transfer in Liquids.',
                  misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions (high-grade, rare).' }
          ],
            remediations: { 'geothermal-energy-is-free-heat': { steps: ['Revisit Class 7 heat transfer (c7_physics_ch03_004 convection) — simulate convection currents in a beaker with heat.', 'Review Class 9 work-energy (c9_physics_ch4_1) — calculate work done by expanding steam in a turbine vs.', 'heat input to grasp conversion efficiency limits.', 'Map Indian geothermal provinces (Puga, Chhumathang, Tattapani, Manikaran) on a tectonic map — correlate with fault.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
