import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch03_p2: SimDef = {
    id: 'v3_c10_phy_ch03_p2',
    title: 'Sources of Energy · Part 2/2',
    subtitle: 'Choose how a nation powers itself without choking its sky',
    classLevel: 10, subject: 'physics', topic: 'Sources of Energy · Part 2/2',
    chapters: ['c10_phy_ch03'],
    nodeIds: ['c10_phy_cbse_03_007', 'c10_phy_cbse_03_008', 'c10_phy_cbse_03_009', 'c10_phy_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an energy planner for a growing nation', intro: 'Your country needs power — for homes, factories, farms and phones. Every option on the table has a catch: coal pollutes, dams displace, solar sleeps at night, nuclear demands caution.', goal: 'Compare conventional and non-conventional energy sources on calorific value, availability and environmental cost, and argue for sustainable choices.' },
    discovery: {
        question: 'Coal and petroleum burn beautifully — high calorific value, easy transport, proven technology. Yet every textbook insists we must move beyond them. What two clocks are fossil fuels racing against?',
        options: ['They\'re non-renewable (millions of years to form) AND their combustion pumps out CO₂, SO₂ and particulates — depletion plus pollution', 'They\'re actually radioactive, like uranium', 'They\'re running out globally this year — next month there\'ll be none', 'They\'re too cheap, which hurts the economy'],
        answer: 'They\'re non-renewable (millions of years to form) AND their combustion pumps out CO₂, SO₂ and particulates — depletion plus pollution',
        hook: 'Fossil fuels are ancient sunlight, banked underground for 300 million years — and we\'re spending it in three centuries while the exhaust alters the sky.',
    },
    teaching: [
        { title: 'Nuclear Energy: Fission and Fusion Reactions', text: 'Nuclear fission is the process in which a heavy nucleus (such as uranium-235) splits into two or more lighter nuclei when bombarded with a slow neutron, releasing a tremendous amount of energy due.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_03_007', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Judge the world\'s energy menu: weigh fossil fuels against solar, wind, hydro, biomass and nuclear on availability, environment and scale — then design a sensible energy mix for a growing country.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_007', title: 'Nuclear Energy: Fission and Fusion Reactions',
          scaffold: { problem: 'In a typical fission reaction, a U-235 nucleus absorbs a thermal neutron and splits into Ba-141 and Kr-92 with the release of 3 neutrons.',
            steps: [
            { text: 'Write the nuclear equation: ⁹²U²³⁵ + ⁰n¹ → ⁵⁶Ba¹⁴¹ + ³⁶Kr⁹² + 3 ⁰n¹. Identify reactants and products.' },
            { text: 'Calculate total mass of reactants: mass(U-235) + mass(n) = 235.0439 u + 1.0087 u = 236.0526 u.' },
            { text: 'Calculate total mass of products: mass(Ba-141) + mass(Kr-92) + 3 × mass(n) = 140.9144 u + 91.9262 u + 3 × 1.0087.' },
            { text: 'Find mass defect Δm = mass(reactants) – mass(products) = 236.0526 u – 235.8667 u = 0.1859 u.' },
            { text: 'Convert mass defect to energy using 1 u = 931.5 MeV/c²: E = 0.1859 u × 931.5 MeV/u = 173.16 MeV.' },
            { text: 'Convert MeV to joules: E = 173.16 MeV × 1.6 × 10⁻¹³ J/MeV = 2.77 × 10⁻¹¹ J.' },
            { text: 'Verify reasonableness: Typical fission energy ~200 MeV; our value is slightly lower due to specific product choice.', faded: true, blankAnswer: 'Energy released = 173.16 MeV = 2.77 × 10⁻¹¹ J' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_008', title: 'Environmental Consequences of Different Energy Sources',
          caseStudy: { intro: 'Observe the thick smog over Delhi in winter or the ash pond near a local thermal power plant — these are visible consequences of burning coal.',
            decisions: [{ prompt: 'Name the two major gaseous pollutants released during combustion of coal in a thermal power plant that contribute to acid rain.', options: [
                { text: 'Sulphur dioxide (SO₂) and nitrogen oxides (NOₓ)', outcome: 'Sulphur dioxide (SO₂) and nitrogen oxides (NOₓ). A wrong answer (e.g., naming CO₂ or CO) reveals.' },
                { text: 'solar and wind energy have zero environmental impact', outcome: 'Not quite — Students believe **"solar and wind energy have zero environmental impact"** because they emit.', reveals: 'solar-and-wind-energy-have' },
                { text: 'CO₂ or CO', outcome: 'Not quite — Students believe **"solar and wind energy have zero environmental impact"** because they emit.', reveals: 'solar-and-wind-energy-have' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_009', title: 'Renewable vs Non-Renewable Energy: Comparison and Choice',
          caseStudy: { intro: 'Begin with a real-world observation: a rooftop solar panel on a neighbor\'s house and a diesel generator running during a power cut in the same locality.',
            decisions: [{ prompt: 'State the defining criterion that classifies an energy source as \'renewable\' according to CBSE Class 10 NCERT.', options: [
                { text: 'Correct answer: An energy source is renewable if it is naturally replenished on a human', outcome: 'Correct answer: An energy source is renewable if it is naturally replenished on a human timescale.' },
                { text: 'Renewable means it doesn\'t cause pollution', outcome: 'Not quite — Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High.', reveals: 'students-equate-renewable-with-clean' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_03_010', title: 'Energy Conservation: Need and Methods in Daily Life',
          scaffold: { problem: 'A middle-class family in Delhi uses four 60 W incandescent bulbs for 5 hours daily. They decide to replace all with 9 W LED bulbs.',
            steps: [
            { text: 'Identify given quantities: Number of bulbs = 4, Old bulb power = 60 W each, New bulb power = 9 W each, Daily usage = 5.' },
            { text: 'Calculate total power for old and new sets. Old total power = 4 × 60 W = 240 W = 0.240 kW.' },
            { text: 'Compute daily energy consumption. Old daily energy = 0.240 kW × 5 h = 1.2 kWh.' },
            { text: 'Compute monthly energy and cost. Old monthly energy = 1.2 kWh/day × 30 days = 36 kWh.' },
            { text: 'Compute annual CO₂ reduction. Annual energy saved = 30.6 kWh/month × 12 months = 367.2 kWh.' },
            { text: 'Verify reasonableness: Saving ~30 kWh/month for four bulbs is plausible; LED uses ~15% of incandescent power, so ~85%.', faded: true, blankAnswer: 'Monthly energy saved = 30.6 kWh; Monthly cost saved.' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_007', title: 'A real-world call',
          caseStudy: { intro: 'Nuclear power offers enormous clean energy — and waste that stays dangerous for millennia, plus the rare catastrophic failure. Solar is safer but can\'t yet power a steel plant at night.',
            decisions: [{ prompt: 'Should nuclear be part of India\'s energy future?', options: [
                { text: 'Yes — coal kills more people than nuclear ever has', outcome: 'Statistically true — air pollution\'s toll dwarfs reactor accidents; but statistics don\'t calm a community near a plant.' },
                { text: 'No — don\'t make waste that outlives your grandchildren', outcome: 'The intergenerational ethics argument; but refusing nuclear often means accepting fossil fuels, which harm grandchildren too.' },
                { text: 'Yes, with storage solved BEFORE scaling', outcome: 'The engineering-honesty answer — build the waste solution first; the risk is \'later\' never arriving.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family is deciding fuel for a small food stall. One member argues for the fuel with the highest calorific value \'since more heat per kilo always means cheaper cooking.\' Another wants to compare what a kilo of each actually buys.',
            decisions: [{ prompt: 'How should they really choose a fuel?', options: [
                { text: 'Compare cost per unit of useful energy, not energy per kilo alone — a fuel with high calorific value can still lose if each kilo is much costlier, and a lower-value fuel can win if it is cheap enough per megajoule. Convenience also matters: a liquid like LPG lights easily, stores compactly and leaves little ash, which a solid fuel does not.', outcome: 'The chapter\'s lesson is that \'good fuel\' is a package — calorific value, cost per unit energy, ease of handling and cleanliness all count, not one number.' },
                { text: 'The first member is right — whichever fuel releases the most heat per kilo is automatically the cheapest choice.', outcome: 'Cost per kilo can overwhelm heat per kilo — divide the price by the energy each fuel delivers and the \'stronger\' fuel often loses.', reveals: 'high-cv-means-cheapest' },
                { text: 'They should simply pick whichever fuel the shop sells — all fuels deliver the same energy anyway.', outcome: 'Fuels differ enormously in energy per kilo and in handling — treating them as identical wastes money or heat.', reveals: 'all-fuels-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'No energy source is free — every one trades something. The art is matching the source to the place: sun where it\'s bright, wind where it blows, and less of what the sky can\'t absorb.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_007', difficulty: 'standard',
          question: 'Nuclear fission is the process in which a heavy nucleus (such as uranium-235).',
          hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation of energy and.',
          misconception: 'Students believe that in nuclear fission, the energy comes from "breaking the nuclear bonds" just like chemical energy.',
          parts: [
                { id: 'a', prompt: 'State the exact nuclear equation for the fission of uranium-235 when bombarded with a thermal neutron, producing barium-141 and krypton-92.', answer: '⁹²U²³⁵ + ⁰n¹ → ⁵⁶Ba¹⁴¹ + ³⁶Kr⁹² + 3 ⁰n¹',
                  options: ['⁹²U²³⁵ + ⁰n¹ → ⁵⁶Ba¹⁴¹ + ³⁶Kr⁹² + 3 ⁰n¹', 'breaking the nuclear bonds'],
                  hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation of energy and.',
                  misconception: 'Students believe that in nuclear fission, the energy comes from "breaking the nuclear bonds" just like chemical energy comes from breaking.' },
                { id: 'b', prompt: 'Explain why nuclear fusion reactions require temperatures of the order of 10⁷ K, whereas nuclear fission can be initiated at room temperature with thermal.', answer: 'Fusion requires overcoming the electrostatic repulsion (Coulomb barrier) between',
                  options: ['Fusion requires overcoming the electrostatic repulsion (Coulomb barrier) between', 'fusion needs heat to melt the nuclei', 'fission doesn\'t need energy', 'breaking the nuclear bonds'],
                  hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation of energy and.',
                  misconception: 'Students believe that in nuclear fission, the energy comes from "breaking the nuclear bonds" just like chemical energy comes from breaking.' }
          ],
            remediations: { 'in-nuclear-fission': { steps: ['Draw the binding energy per nucleon curve (peak at Fe-56).', 'Show U-235 on the right (lower binding energy/nucleon) and Ba-141 + Kr-92 on the left (higher binding energy/nucleon).', 'Explain: "Nucleons move *up* the curve (to higher binding energy) in both fission and fusion.', 'Have the student calculate binding energy difference for a simple reaction using given binding energy per nucleon.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in nuclear fission, the energy comes from "breaking the nuclear bonds" just like chemical energy.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a nuclear power plant, the mass of uranium fuel decreases every day because mass is converted into energy.', answer: 'The statement is false',
                  options: ['The statement is false', 'breaking the nuclear bonds'],
                  hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation of energy and.',
                  misconception: 'Students believe that in nuclear fission, the energy comes from "breaking the nuclear bonds" just like chemical energy comes from breaking.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration (using everyday materials) to model the concept of a chain reaction in nuclear fission.', answer: 'A good model: Use a tray of mousetraps (set) with a ping-pong ball on each',
                  options: ['A good model: Use a tray of mousetraps (set) with a ping-pong ball on each', 'breaking the nuclear bonds'],
                  hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation of energy and.',
                  misconception: 'Students believe that in nuclear fission, the energy comes from "breaking the nuclear bonds" just like chemical energy comes from breaking.' }
          ],
            remediations: { 'in-nuclear-fission': { steps: ['Draw the binding energy per nucleon curve (peak at Fe-56).', 'Show U-235 on the right (lower binding energy/nucleon) and Ba-141 + Kr-92 on the left (higher binding energy/nucleon).', 'Explain: "Nucleons move *up* the curve (to higher binding energy) in both fission and fusion.', 'Have the student calculate binding energy difference for a simple reaction using given binding energy per nucleon.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_008', difficulty: 'standard',
          question: 'Environmental consequences of energy sources refer to the detrimental effects.',
          hint: 'If stuck, re-read the "Environmental Consequences" subsection in each sibling node.',
          misconception: 'Students believe **"solar and wind energy have zero environmental impact"** because they emit no smoke during.',
          parts: [
                { id: 'a', prompt: 'Name the two major gaseous pollutants released during combustion of coal in a thermal power plant that contribute to acid rain.', answer: 'Sulphur dioxide (SO₂) and nitrogen oxides (NOₓ)',
                  options: ['Sulphur dioxide (SO₂) and nitrogen oxides (NOₓ)', 'solar and wind energy have zero environmental impact', 'CO₂ or CO'],
                  hint: 'If stuck, re-read the "Environmental Consequences" subsection in each sibling node (001-007) and.',
                  misconception: 'Students believe **"solar and wind energy have zero environmental impact"** because they emit no smoke during operation.' },
                { id: 'b', prompt: 'Explain why nuclear energy is considered a low-carbon source but still poses a long-term environmental hazard that fossil fuels do not.', answer: 'Nuclear fission emits negligible CO₂ during operation (low-carbon), but produces',
                  options: ['Nuclear fission emits negligible CO₂ during operation (low-carbon), but produces', 'radiation leaks', 'meltdowns', 'solar and wind energy have zero environmental impact'],
                  hint: 'If stuck, re-read the "Environmental Consequences" subsection in each sibling node (001-007) and.',
                  misconception: 'Students believe **"solar and wind energy have zero environmental impact"** because they emit no smoke during operation.' }
          ],
            remediations: { 'solar-and-wind-energy-have': { steps: ['Show the **Life Cycle Assessment (LCA) diagram** for a solar panel (mining → manufacturing → transport → installation →.', 'Assign a mini-project: "Trace the journey of 1 kg of silicon from quartz mine to rooftop panel — list 5 environmental.', 'Use the **CBSE 2023 Sample Paper Case Study** on "Solar Waste Management Rules 2022" to practice writing structured.', 'Revisit Class 8 node **c8_physics_ch8_8** (Human Impact on Ecosystems) to reinforce that *all* human technology alters.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_009', difficulty: 'standard',
          question: 'Renewable energy sources are those that are naturally replenished on a human.',
          hint: 'If stuck on classification, revisit c10_phy_cbse_03_001 (fossil fuels) and.',
          misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.',
          parts: [
                { id: 'a', prompt: 'Given the data below, calculate the \'Energy Density Ratio\' (Energy per kg of fuel) for Coal vs. Uranium-235 (fission).', answer: 'Step 1: Convert both to same unit (J/kg)',
                  options: ['Step 1: Convert both to same unit (J/kg)', 'nuclear is dangerous', 'coal is cheap'],
                  hint: 'If stuck on classification, revisit c10_phy_cbse_03_001 (fossil fuels) and c10_phy_cbse_03_004.',
                  misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.' },
                { id: 'b', prompt: 'Compare Solar Photovoltaic (PV) and Wind Energy for a village in Rajasthan (high solar insolation, low average wind speed) vs.', answer: 'Rajasthan village: Solar PV preferred',
                  options: ['Rajasthan village: Solar PV preferred', 'sun is everywhere'],
                  hint: 'If stuck on classification, revisit c10_phy_cbse_03_001 (fossil fuels) and c10_phy_cbse_03_004.',
                  misconception: 'Students equate \'Renewable\' with \'Clean/Zero Emission\' and \'Non-renewable\' with \'Dirty/High Emission\'.' }
          ],
            remediations: { 'students-equate-renewable-with-clean': { steps: ['Show a 2-minute video clip (or diagram) of solar panel manufacturing — quartz mining → metallurgical grade Si → Siemens.', 'Give a simplified LCA (Lifecycle Assessment) table: Coal (1000 g CO₂/kWh), Solar PV (40-50 g CO₂/kWh), Nuclear (12.', 'Practice classifying 10 sources into a 2×2 matrix: Renewable vs. Non-renewable (rows) × Low-carbon vs.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_03_010', difficulty: 'standard',
          question: 'Energy conservation refers to the practice of reducing energy consumption.',
          hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation law, and.',
          misconception: 'Students often think "energy conservation" means "using less energy by doing less" (e.g., studying in dim light, not.',
          parts: [
                { id: 'a', prompt: 'Compare the energy conservation impact of two actions: (A) switching off a 10 W LED bulb for 5 extra hours daily, and (B) reducing the use of a 1200 W electric.', answer: 'Action A savings: 10 W × 5 h/day × 30 days = 1500 Wh = 1.5 kWh',
                  options: ['Action A savings: 10 W × 5 h/day × 30 days = 1500 Wh = 1.5 kWh', 'LED is efficient', 'energy conservation', 'using less energy by doing less'],
                  hint: 'Revisit Class 9 Work and Energy chapter (c9_physics_ch4_8) for conservation law, and Class 8.',
                  misconception: 'Students often think "energy conservation" means "using less energy by doing less" (e.g., studying in dim light, not using fan in summer).' }
          ],
            remediations: { 'energy-conservation-means-using-less': { steps: ['If the student equates conservation with deprivation: (1) Show two identical rooms — one with a 60 W incandescent, one.', '(2) Have them calculate the energy used by each (E = P × t) and compare.', '(3) Ask: "Did the LED room have less light?" No.', '"Did it use less energy?" Yes.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
