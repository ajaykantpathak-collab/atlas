import type { SimDef } from '../../engine/types';
import C10_ScienceOurEnvironmentSim from '../../../simulations/c6_12/C10_ScienceOurEnvironmentSim';

/** v3 wrapped master — C10_ScienceOurEnvironmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_scienceourenvironmentsim: SimDef = {
    id: 'v3w_c10_scienceourenvironmentsim',
    title: 'Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum)',
    subtitle: 'This node covers the origin, composition, calorific value, extraction, and direct uses of.',
    classLevel: 10, subject: 'science', topic: 'Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum)',
    chapters: [],
    nodeIds: ['c10_phy_cbse_03_001', 'c10_phy_cbse_03_002', 'c10_phy_cbse_03_005', 'c10_phy_cbse_03_006', 'c10_phy_cbse_03_008', 'c10_phy_cbse_03_009', 'c10_phy_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Begin with a real-world observation: when you see a coal-fired stove in a roadside tea stall or a petrol pump.', goal: 'Master Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum).' },
    discovery: {
        question: 'Compare the environmental impact of burning coal versus petroleum in terms of (a) CO₂ emissions per unit energy, (b) sulphur dioxide emissions, and (c) solid.',
        options: ['CO₂ emissions per unit energy, (', 'fossil fuels are just old plants/animals that turned into fuel', 'reserves'],
        answer: 'CO₂ emissions per unit energy, (',
        hook: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the.',
    },
    teaching: [
        { title: 'Fossil fuels are non-renewable energy.', text: 'Fossil fuels are non-renewable energy sources formed from the decomposed remains of ancient plants and animals buried under sediment over millions of years, primarily coal and petroleum, which store.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_001', title: 'Fossil fuels are non-renewable energy.',
          scaffold: { problem: 'A household uses 15 kg of LPG (liquefied petroleum gas) per month.',
            steps: [
            { text: 'Identify given quantities: mass of LPG m = 15 kg, calorific value CV = 50,000 kJ/kg.' },
            { text: 'Identify the formula: Heat energy Q = m × CV.' },
            { text: 'Substitute values with units: Q = 15 kg × 50 MJ/kg.' },
            { text: 'Compute and track unit cancellation: kg × MJ/kg = MJ. Q = 750 MJ.' },
            { text: 'Verify reasonableness: 15 kg of LPG is a typical monthly cylinder; 750 MJ is a plausible energy amount for cooking.', faded: true, blankAnswer: '750 MJ' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_002', title: 'A thermal power plant converts the.',
          scaffold: { problem: 'A hydro power plant has a water reservoir at a height of 150 m above the turbine. Water flows at a rate of 500 kg/s.',
            steps: [
            { text: 'Identify given: h = 150 m, mass flow rate (dm/dt) = 500 kg/s, η = 85% = 0.85, g = 9.8 m/s².' },
            { text: 'The input power is the rate of loss of gravitational potential energy of water. P_in = (dm/dt) × g × h.' },
            { text: 'Substitute values: P_in = 500 kg/s × 9.8 m/s² × 150 m = 735,000 W = 735 kW.' },
            { text: 'Apply efficiency: P_out = η × P_in = 0.85 × 735,000 W = 624,750 W = 624.75 kW ≈ 625 kW.' },
            { text: 'Verify: 625 kW is a reasonable output for a small hydro plant. Units: kg/s × m/s² × m = kg·m²/s³ = W. Correct.', faded: true, blankAnswer: '625 kW (or 624.75 kW)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_005', title: 'Energy from the sea refers to the.',
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
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_006', title: 'Geothermal energy is the thermal energy.',
          scaffold: { problem: 'A binary cycle geothermal plant in Puga Valley (Ladakh) uses geothermal brine at 150°C flowing at 200 kg/s.',
            steps: [
            { text: 'Identify given quantities: mass flow rate ṁ = 200 kg/s, T_in = 150°C, T_out = 80°C, c = 4.0 kJ/kg·K, η_net = 10% =.' },
            { text: 'Calculate thermal power extracted from brine: Q_thermal = ṁ × c × (T_in - T_out) = 200 kg/s × 4.0 kJ/kg·K × (150 - 80).' },
            { text: 'Apply net electrical efficiency: P_elec = η_net × Q_thermal = 0.10 × 56,000 kW = 5,600 kW.' },
            { text: 'Verify units: kJ/s = kW, consistent. Check Carnot limit: T_hot ≈ 150°C = 423 K, T_cold ≈ 25°C = 298 K, η_Carnot = 1 -.' },
            { text: 'State final answer with units: 5,600 kW (or 5.6 MW).', faded: true, blankAnswer: '5,600 kW (5.6 MW)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_008', title: 'Environmental consequences of energy.',
          scaffold: { problem: 'A case-based question provides: "A 210 MW thermal power plant burns 0.6 kg coal per kWh generated.',
            steps: [
            { text: 'Calculate daily energy generation = 210 MW × 24 h × 0.85 = 4284 MWh = 4.284×10⁶ kWh.' },
            { text: 'Coal consumed daily = 4.284×10⁶ kWh × 0.6 kg/kWh = 2.57×10⁶ kg = 2570 tonnes.' },
            { text: 'Fly ash produced = 40% of coal mass = 0.40 × 2.57×10⁶ kg = 1.028×10⁶ kg = **1028 tonnes/day**.' },
            { text: 'Sulphur in coal = 0.5% of 2.57×10⁶ kg = 12,850 kg S.' },
            { text: 'S → SO₂ molar mass ratio = 32:64 = 1:2. SO₂ from 100% conversion = 2 × 12,850 = 25,700 kg.' },
            { text: 'Actual SO₂ (80% conversion) = 0.80 × 25,700 kg = **20,560 kg/day = 20.56 tonnes/day**.', faded: true, blankAnswer: '(a) 1028 tonnes fly ash/day, (b) 20.56 tonnes SO₂/day.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_009', title: 'Renewable energy sources are those that.',
          scaffold: { problem: 'A village committee must choose between a 10 kW Solar PV micro-grid (with 4-hour battery backup) and a 10 kW Diesel Generator for evening.',
            steps: [
            { text: 'Identify load profile. Lighting: 10 kW × 4 h = 40 kWh (but only 6-10 PM).' },
            { text: 'Calculate Solar PV daily generation. Assume 20 m² panel area (typical for 10 kW peak).' },
            { text: 'Calculate Diesel Generator daily generation potential. 10 kW × 24 h = 240 kWh max, but fuel-limited.' },
            { text: 'Compare reliability for refrigerator. Solar + battery: 16.8 kWh < 43.6 kWh demand → deficit.' },
            { text: 'Recommendation. Diesel generator is better for 24×7 critical load (refrigerator) despite recurring cost and emissions.', faded: true, blankAnswer: 'Solar PV usable output = 16.8 kWh/day (insufficient for.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_phy_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum)', spots: [
            { id: 's1', label: 'Fossil fuels are non-renewable energy', prompt: 'Which idea is this? — Fossil fuels are non-renewable energy sources formed from the decomposed remains of.', answer: 'Fossil fuels are non-renewable energy', options: ['Fossil fuels are non-renewable energy', 'A thermal power plant converts', 'Energy from the sea refers', 'Geothermal energy is the thermal'] },
            { id: 's2', label: 'A thermal power plant converts', prompt: 'Which idea is this? — A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural.', answer: 'A thermal power plant converts', options: ['A thermal power plant converts', 'Fossil fuels are non-renewable energy', 'Energy from the sea refers', 'Geothermal energy is the thermal'] },
            { id: 's3', label: 'Energy from the sea refers', prompt: 'Which idea is this? — Energy from the sea refers to the harnessing of three distinct forms of renewable energy.', answer: 'Energy from the sea refers', options: ['Energy from the sea refers', 'Fossil fuels are non-renewable energy', 'A thermal power plant converts', 'Geothermal energy is the thermal'] },
            { id: 's4', label: 'Geothermal energy is the thermal', prompt: 'Which idea is this? — Geothermal energy is the thermal energy generated and stored within the Earth\'s crust due.', answer: 'Geothermal energy is the thermal', options: ['Geothermal energy is the thermal', 'Fossil fuels are non-renewable energy', 'A thermal power plant converts', 'Energy from the sea refers'] },
            { id: 's5', label: 'Environmental consequences of energy sources', prompt: 'Which idea is this? — Environmental consequences of energy sources refer to the detrimental effects on air,.', answer: 'Environmental consequences of energy sources', options: ['Environmental consequences of energy sources', 'Fossil fuels are non-renewable energy', 'A thermal power plant converts', 'Energy from the sea refers'] },
            { id: 's6', label: 'Renewable energy sources are those', prompt: 'Which idea is this? — Renewable energy sources are those that are naturally replenished on a human timescale.', answer: 'Renewable energy sources are those', options: ['Renewable energy sources are those', 'Fossil fuels are non-renewable energy', 'A thermal power plant converts', 'Energy from the sea refers'] }
          ] } }
    ],
    explore: { component: C10_ScienceOurEnvironmentSim, prompt: 'Explore the interactive — Conventional Sources of Energy: Fossil Fuels (Coal, Petroleum)' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_001', difficulty: 'standard',
          question: 'Fossil fuels are non-renewable energy sources formed from the decomposed.',
          hint: 'If stuck, revisit Class 9 node c9_physics_ch4_4 (Forms of Energy) and c9_physics_ch4_8.',
          misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental impact of burning coal versus petroleum in terms of (a) CO₂ emissions per unit energy, (b) sulphur dioxide emissions, and (c) solid.', answer: 'CO₂ emissions per unit energy, (',
                  options: ['CO₂ emissions per unit energy, (', 'fossil fuels are just old plants/animals that turned into fuel', 'reserves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the specific geological.' }
          ],
            remediations: { 'fossil-fuels-are-just-old': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Show a cross-section diagram.', '(2) Use a simple analogy: just as a pressure cooker transforms food faster, geological pressure transforms biomass over.', '(3) Give a data table of Indian coal reserves vs.', 'resources (from Ministry of Coal) and ask them to calculate the extraction lifetime at current consumption,.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since petroleum has a higher calorific value than coal, it is always the better fuel for electricity generation." Evaluate this statement.', answer: 'The statement is not universally true',
                  options: ['The statement is not universally true', 'fossil fuels are just old plants/animals that turned into fuel', 'reserves', 'resources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the specific geological.' },
                { id: 'b', prompt: 'Compare the environmental impact of burning coal versus petroleum in terms of (a) CO₂ emissions per unit energy, (b) sulphur dioxide emissions, and (c) solid.', answer: 'CO₂ emissions per unit energy, (',
                  options: ['CO₂ emissions per unit energy, (', 'fossil fuels are just old plants/animals that turned into fuel', 'reserves', 'resources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fossil fuels are just old plants/animals that turned into fuel" without understanding the specific geological.' }
          ],
            remediations: { 'fossil-fuels-are-just-old': { steps: ['If the student holds this misconception, guide them through a three-step correction: (1) Show a cross-section diagram.', '(2) Use a simple analogy: just as a pressure cooker transforms food faster, geological pressure transforms biomass over.', '(3) Give a data table of Indian coal reserves vs.', 'resources (from Ministry of Coal) and ask them to calculate the extraction lifetime at current consumption,.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_002', difficulty: 'standard',
          question: 'A thermal power plant converts the chemical energy of fossil fuels (coal, oil,.',
          hint: 'If stuck, revisit Class 9 Work-Energy theorem (c9_physics_ch4_3) and Class 8.',
          misconception: 'Students often think the generator in a power plant "creates" electricity from nothing, or that the turbine "produces".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural',
                  options: ['A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural', 'Fossil fuels are non-renewable energy sources formed from the decomposed remains of', 'Energy from the sea refers to the harnessing of three distinct forms of renewable energy', 'Geothermal energy is the thermal energy generated and stored within the Earth\'s crust due'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the generator in a power plant "creates" electricity from nothing, or that the turbine "produces" energy.' }
          ],
            remediations: { 'the-generator-in-a-power': { steps: ['Revisit Class 8 electromagnetic induction (c8_physics_ch2_1) — perform the activity: move a magnet in/out of a coil.', 'Understand that relative motion between coil and magnetic field is essential.', 'In a power plant, the turbine provides this rotation.', 'Draw a diagram: Turbine shaft → Rotor (coil) → Stator (magnetic field) → AC output.', 'Practice writing: "The kinetic energy of steam/water rotates the turbine.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the generator in a power plant "creates" electricity from nothing, or that the turbine "produces".',
          parts: [
                { id: 'a', prompt: 'A student claims: "Hydro power plants are 100% efficient because water is not burned and there is no heat loss." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'no fuel combustion', 'no energy losses', 'creates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the generator in a power plant "creates" electricity from nothing, or that the turbine "produces" energy.' }
          ],
            remediations: { 'the-generator-in-a-power': { steps: ['Revisit Class 8 electromagnetic induction (c8_physics_ch2_1) — perform the activity: move a magnet in/out of a coil.', 'Understand that relative motion between coil and magnetic field is essential.', 'In a power plant, the turbine provides this rotation.', 'Draw a diagram: Turbine shaft → Rotor (coil) → Stator (magnetic field) → AC output.', 'Practice writing: "The kinetic energy of steam/water rotates the turbine.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_005', difficulty: 'standard',
          question: 'Energy from the sea refers to the harnessing of three distinct forms of.',
          hint: 'Revisit Class 9 Work & Energy: gravitational potential energy derivation (mgh), kinetic.',
          misconception: '**Misconception:** "Tidal energy and wave energy are the same thing — both come from the sea." **Exact wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Energy from the sea refers to the harnessing of three distinct forms of renewable energy',
                  options: ['Energy from the sea refers to the harnessing of three distinct forms of renewable energy', 'Fossil fuels are non-renewable energy sources formed from the decomposed remains of', 'A thermal power plant converts the chemical energy of fossil fuels (coal, oil, natural', 'Geothermal energy is the thermal energy generated and stored within the Earth\'s crust due'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Tidal energy and wave energy are the same thing — both come from the sea." **Exact wrong reasoning:** Students conflate.' }
          ],
            remediations: { 'misconception-tidal-energy-and-wave': { steps: ['**Visual distinction:** Show two 30-second videos — one of a tidal barrage (La Rance, France) with slow, massive water.', '**Cause mapping:** Create a 2-column table: **Tidal** → Cause: Moon/Sun gravity → Energy: Potential (mgh) → Period:.', '**Wave** → Cause: Wind friction → Energy: Kinetic (½mv²) → Period: 5–20 sec.', '**Numerical anchor:** Calculate PE of 1 m³ water raised 5 m (tidal) vs.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_006', difficulty: 'standard',
          question: 'Geothermal energy is the thermal energy generated and stored within the Earth\'s.',
          hint: 'If stuck on convection mechanism, review c7_physics_ch03_004 (Convection: Heat Transfer.',
          misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental impact profiles of a flash steam plant vs. a binary cycle plant at the same geothermal site.', answer: 'Binary cycle plant is more suitable',
                  options: ['Binary cycle plant is more suitable', 'higher efficiency', 'free heat from volcanoes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions (high-grade, rare).' }
          ],
            remediations: { 'geothermal-energy-is-free-heat': { steps: ['Revisit Class 7 heat transfer (c7_physics_ch03_004 convection) — simulate convection currents in a beaker with heat.', 'Review Class 9 work-energy (c9_physics_ch4_1) — calculate work done by expanding steam in a turbine vs.', 'heat input to grasp conversion efficiency limits.', 'Map Indian geothermal provinces (Puga, Chhumathang, Tattapani, Manikaran) on a tectonic map — correlate with fault.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions.',
          parts: [
                { id: 'a', prompt: 'Design a conceptual direct-use geothermal system for a rural community in Ladakh (cold desert, high altitude) using a 90°C hydrothermal resource at 1.5 km.', answer: 'two direct-use applications prioritized for local needs, (',
                  options: ['two direct-use applications prioritized for local needs, (', 'free heat from volcanoes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions (high-grade, rare).' },
                { id: 'b', prompt: 'Compare the environmental impact profiles of a flash steam plant vs. a binary cycle plant at the same geothermal site.', answer: 'Binary cycle plant is more suitable',
                  options: ['Binary cycle plant is more suitable', 'higher efficiency', 'free heat from volcanoes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe geothermal energy is "free heat from volcanoes" available everywhere — they conflate volcanic regions (high-grade, rare).' }
          ],
            remediations: { 'geothermal-energy-is-free-heat': { steps: ['Revisit Class 7 heat transfer (c7_physics_ch03_004 convection) — simulate convection currents in a beaker with heat.', 'Review Class 9 work-energy (c9_physics_ch4_1) — calculate work done by expanding steam in a turbine vs.', 'heat input to grasp conversion efficiency limits.', 'Map Indian geothermal provinces (Puga, Chhumathang, Tattapani, Manikaran) on a tectonic map — correlate with fault.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_008', difficulty: 'standard',
          question: 'Environmental consequences of energy sources refer to the detrimental effects.',
          hint: 'If stuck, re-read the "Environmental Consequences" subsection in each sibling node.',
          misconception: 'Students believe **"solar and wind energy have zero environmental impact"** because they emit no smoke during.',
          parts: [
                { id: 'a', prompt: 'Name the two major gaseous pollutants released during combustion of coal in a thermal power plant that contribute to acid rain.', answer: 'Sulphur dioxide (SO₂) and nitrogen oxides (NOₓ)',
                  options: ['Sulphur dioxide (SO₂) and nitrogen oxides (NOₓ)', 'solar and wind energy have zero environmental impact'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"solar and wind energy have zero environmental impact"** because they emit no smoke during operation.' },
                { id: 'b', prompt: 'Explain why nuclear energy is considered a low-carbon source but still poses a long-term environmental hazard that fossil fuels do not.', answer: 'Nuclear fission emits negligible CO₂ during operation (low-carbon), but produces',
                  options: ['Nuclear fission emits negligible CO₂ during operation (low-carbon), but produces', 'radiation leaks', 'meltdowns'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"solar and wind energy have zero environmental impact"** because they emit no smoke during operation.' }
          ],
            remediations: { 'solar-and-wind-energy-have': { steps: ['Show the **Life Cycle Assessment (LCA) diagram** for a solar panel (mining → manufacturing → transport → installation →.', 'Assign a mini-project: "Trace the journey of 1 kg of silicon from quartz mine to rooftop panel — list 5 environmental.', 'Use the **CBSE 2023 Sample Paper Case Study** on "Solar Waste Management Rules 2022" to practice writing structured.', 'Revisit Class 8 node **c8_physics_ch8_8** (Human Impact on Ecosystems) to reinforce that *all* human technology alters.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_009', difficulty: 'standard',
          question: 'Renewable energy sources are those that are naturally replenished on a human.',
          hint: 'If stuck on classification, revisit c10_phy_cbse_03_001 (fossil fuels) and.',
          misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.',
          parts: [
                { id: 'a', prompt: 'Given the data below, calculate the \'Energy Density Ratio\' (Energy per kg of fuel) for Coal vs. Uranium-235 (fission).', answer: 'Step 1: Convert both to same unit (J/kg)',
                  options: ['Step 1: Convert both to same unit (J/kg)', 'nuclear is dangerous', 'coal is cheap'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.' },
                { id: 'b', prompt: 'Compare Solar Photovoltaic (PV) and Wind Energy for a village in Rajasthan (high solar insolation, low average wind speed) vs.', answer: 'Rajasthan village: Solar PV preferred',
                  options: ['Rajasthan village: Solar PV preferred', 'sun is everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.' }
          ],
            remediations: { 'students-equate-renewable-with-clean': { steps: ['Show a 2-minute video clip (or diagram) of solar panel manufacturing — quartz mining → metallurgical grade Si → Siemens.', 'Give a simplified LCA (Lifecycle Assessment) table: Coal (1000 g CO₂/kWh), Solar PV (40-50 g CO₂/kWh), Nuclear (12 g.', 'Practice classifying 10 sources into a 2×2 matrix: Renewable vs. Non-renewable (rows) × Low-carbon vs.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Biomass (like cow dung cakes) is renewable and carbon-neutral, so it is the best cooking fuel for rural India." Consider: indoor air.', answer: 'Statement is partially correct but dangerously incomplete',
                  options: ['Statement is partially correct but dangerously incomplete', 'yes, it\'s renewable so it\'s good'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.' },
                { id: 'b', prompt: 'Compare Solar Photovoltaic (PV) and Wind Energy for a village in Rajasthan (high solar insolation, low average wind speed) vs.', answer: 'Rajasthan village: Solar PV preferred',
                  options: ['Rajasthan village: Solar PV preferred', 'sun is everywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.' }
          ],
            remediations: { 'students-equate-renewable-with-clean': { steps: ['Show a 2-minute video clip (or diagram) of solar panel manufacturing — quartz mining → metallurgical grade Si → Siemens.', 'Give a simplified LCA (Lifecycle Assessment) table: Coal (1000 g CO₂/kWh), Solar PV (40-50 g CO₂/kWh), Nuclear (12 g.', 'Practice classifying 10 sources into a 2×2 matrix: Renewable vs. Non-renewable (rows) × Low-carbon vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
