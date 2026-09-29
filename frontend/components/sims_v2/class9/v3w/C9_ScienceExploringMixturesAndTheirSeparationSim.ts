import type { SimDef } from '../../engine/types';
import C9_ScienceExploringMixturesAndTheirSeparationSim from '../../../simulations/c6_12/C9_ScienceExploringMixturesAndTheirSeparationSim';

/** v3 wrapped master — C9_ScienceExploringMixturesAndTheirSeparationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_scienceexploringmixturesandtheirseparationsim: SimDef = {
    id: 'v3w_c9_scienceexploringmixturesandtheirseparationsim',
    title: 'Mixtures: Definition and Types (Homogeneous and Heterogeneous)',
    subtitle: 'Covers definition of mixture, classification into homogeneous and heterogeneous based on.',
    classLevel: 9, subject: 'science', topic: 'Mixtures: Definition and Types (Homogeneous and Heterogeneous)',
    chapters: [],
    nodeIds: ['c9_chem_ch1_1', 'c9_chem_ch1_4', 'c9_chem_ch1_5', 'c9_chem_ch1_6', 'c9_chem_ch1_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe a glass of nimbu pani (lemonade) and a glass of sand-water mixture side by side.', goal: 'Master Mixtures: Definition and Types (Homogeneous and Heterogeneous).' },
    discovery: {
        question: 'What is the fundamental physical property that allows distillation to separate a mixture of two miscible liquids?',
        options: ['The fundamental property is the difference in boiling points of the two liquids', 'difference in density', 'difference in solubility'],
        answer: 'The fundamental property is the difference in boiling points of the two liquids',
        hook: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the.',
    },
    teaching: [
        { title: 'A mixture is a material composed of two or.', text: 'A mixture is a material composed of two or more substances (elements or compounds) physically combined in any proportion, where each substance retains its own chemical identity and properties.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_chem_ch1_1', title: 'A mixture is a material composed of two.',
          scaffold: { problem: 'A student prepares three mixtures: (1) 5 g salt in 100 mL water, (2) 5 g chalk powder in 100 mL water, (3) 5 g starch in 100 mL hot water.',
            steps: [
            { text: 'Identify the solute and solvent in each mixture. Salt (NaCl) and chalk (CaCO₃) are ionic solids; starch is a polymer.' },
            { text: 'Determine dissolution behavior. Salt dissociates into Na⁺ and Cl⁻ ions (~0.2 nm) — true solution.' },
            { text: 'Predict Tyndall effect. Salt solution: particles <40 nm — no scattering.' },
            { text: 'Predict filtration. Salt solution: passes completely. Chalk suspension: residue on filter paper.' },
            { text: 'Classify. (1) Homogeneous (true solution). (2) Heterogeneous (suspension).', faded: true, blankAnswer: '(1) Homogeneous — true solution. (2) Heterogeneous —.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_4', title: 'Crystallisation is a separation.',
          scaffold: { problem: '20 g of impure benzoic acid (contains 2 g insoluble sand and 1 g soluble salt) is dissolved in 100 mL hot water at 80°C.',
            steps: [
            { text: 'Determine mass of pure benzoic acid in impure sample: 20 g total - 2 g sand - 1 g soluble salt = 17 g benzoic acid.' },
            { text: 'Check if all 17 g dissolves at 80°C: Solubility at 80°C = 29 g/100 mL > 17 g, so yes, all dissolves.' },
            { text: 'Hot filtration removes 2 g sand. Filtrate contains 17 g benzoic acid + 1 g soluble salt in 100 mL water.' },
            { text: 'Cool to 20°C. Solubility at 20°C = 0.3 g/100 mL. So 0.3 g benzoic acid remains dissolved; the rest crystallises: 17 g -.' },
            { text: 'Cold filtration separates 16.7 g pure crystals. Mother liquor contains 0.3 g benzoic acid + 1 g soluble salt.', faded: true, blankAnswer: '16.7 g pure benzoic acid crystals.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_5', title: 'Distillation is a physical separation.',
          scaffold: { problem: 'A student has 50 mL of a mixture of acetone (boiling point 56°C) and water (boiling point 100°C). They want to collect pure acetone.',
            steps: [
            { text: 'Identify the mixture as miscible liquids with a large boiling point difference (44°C), so simple distillation is.' },
            { text: 'Draw the apparatus: distillation flask with mixture, thermometer at side-arm, condenser with water entering lower.' },
            { text: 'Heat gently; vapours rise, thermometer reads 56°C when acetone vapour reaches condenser. Collect distillate in receiver.' },
            { text: 'Monitor thermometer; when temperature starts rising above 56°C, acetone is depleted and water vapour begins to come.' },
            { text: 'Verify by checking the distillate\'s smell (sweet acetone odour) and flammability (acetone burns, water does not).', faded: true, blankAnswer: 'Use simple distillation; thermometer reads 56°C during.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_6', title: 'Chromatography is a separation.',
          scaffold: { problem: 'A student performs paper chromatography on a sample of black ballpoint pen ink using water as the solvent.',
            steps: [
            { text: 'Identify the given data — origin is the starting line, solvent front = 10.0 cm, spot distances: blue = 2.5 cm, red =.' },
            { text: 'Recall the Rf formula: Rf = distance travelled by solute / distance travelled by solvent front.' },
            { text: 'Calculate Rf for each dye: Blue: 2.5/10.0 = 0.25; Red: 5.0/10.0 = 0.50; Yellow: 7.5/10.0 = 0.75.' },
            { text: 'Interpret Rf values — lower Rf means the solute spends more time adsorbed on the stationary phase (paper) and less.' },
            { text: 'Conclude: Blue dye has the strongest adsorption on the paper (or least solubility in water), yellow the weakest.', faded: true, blankAnswer: 'Blue: Rf = 0.25; Red: Rf = 0.50; Yellow: Rf = 0.75. Blue.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_8', title: 'Sublimation is a physical change of.',
          scaffold: { problem: 'A student has a mixture of iodine crystals (I₂) and sand (SiO₂). She wants to obtain pure iodine crystals using sublimation.',
            steps: [
            { text: 'Identify the components: Iodine (sublimable, molecular solid with weak van der Waals forces) and Sand (non-sublimable,.' },
            { text: 'Set up apparatus: Place mixture in a china dish, cover with an inverted glass funnel, plug funnel stem with cotton.' },
            { text: 'Observe: Purple iodine vapour rises (sublimation), deposits as shiny grey-black crystals on the cool inner walls of the.' },
            { text: 'Collect: After cooling, carefully scrape the pure iodine crystals from the funnel. The sand residue stays in the dish.' },
            { text: 'Verify: Test a crystal with starch solution — blue-black colour confirms iodine. Sand shows no colour change.', faded: true, blankAnswer: 'Pure iodine crystals collected on funnel walls; sand.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_chem_ch1_4', title: 'Identify each idea',
          dissect: { specimen: 'Mixtures: Definition and Types (Homogeneous and Heterogeneous)', spots: [
            { id: 's1', label: 'A mixture is a material', prompt: 'Which idea is this? — A mixture is a material composed of two or more substances (elements or compounds).', answer: 'A mixture is a material', options: ['A mixture is a material', 'Crystallisation is a separation technique', 'Distillation is a physical separation', 'Chromatography is a separation technique'] },
            { id: 's2', label: 'Crystallisation is a separation technique', prompt: 'Which idea is this? — Crystallisation is a separation technique used to obtain pure solid crystals of a solute.', answer: 'Crystallisation is a separation technique', options: ['Crystallisation is a separation technique', 'A mixture is a material', 'Distillation is a physical separation', 'Chromatography is a separation technique'] },
            { id: 's3', label: 'Distillation is a physical separation', prompt: 'Which idea is this? — Distillation is a physical separation technique used to separate components of a.', answer: 'Distillation is a physical separation', options: ['Distillation is a physical separation', 'A mixture is a material', 'Crystallisation is a separation technique', 'Chromatography is a separation technique'] },
            { id: 's4', label: 'Chromatography is a separation technique', prompt: 'Which idea is this? — Chromatography is a separation technique where components of a mixture are separated.', answer: 'Chromatography is a separation technique', options: ['Chromatography is a separation technique', 'A mixture is a material', 'Crystallisation is a separation technique', 'Distillation is a physical separation'] },
            { id: 's5', label: 'Sublimation is a physical change', prompt: 'Which idea is this? — Sublimation is a physical change of state in which a solid transforms directly into a gas.', answer: 'Sublimation is a physical change', options: ['Sublimation is a physical change', 'A mixture is a material', 'Crystallisation is a separation technique', 'Distillation is a physical separation'] }
          ] } }
    ],
    explore: { component: C9_ScienceExploringMixturesAndTheirSeparationSim, prompt: 'Explore the interactive — Mixtures: Definition and Types (Homogeneous and Heterogeneous)' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch1_1', difficulty: 'standard',
          question: 'A mixture is a material composed of two or more substances (elements or.',
          hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c8_chem_ch3_1 (Mixtures:.',
          misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or.',
          parts: [
                { id: 'a', prompt: 'You are given three beakers: A (milk), B (air), C (blood). Classify each as homogeneous or heterogeneous mixture.', answer: 'A (milk): Heterogeneous (colloid)',
                  options: ['A (milk): Heterogeneous (colloid)', 'homogeneous means you can\'t see particles with naked eye'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or starch solution as.' }
          ],
            remediations: { 'homogeneous-means-you-can-t': { steps: ['Take three test tubes: sugar solution, starch solution (1% boiled and cooled), milk.', 'In a dark room, pass a laser/flashlight beam through each.', 'Observe: sugar solution — no visible beam (true solution); starch solution and milk — visible beam path (Tyndall.', 'Filter each through filter paper: sugar and starch pass through; milk may leave negligible residue but centrifugation.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All transparent mixtures are homogeneous, and all opaque mixtures are heterogeneous." Evaluate this statement with two counterexamples.', answer: 'The statement is false',
                  options: ['The statement is false', 'homogeneous means you can\'t see particles with naked eye'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or starch solution as.' },
                { id: 'b', prompt: 'Design a simple experiment using only a flashlight, filter paper, and a stand to distinguish between three unknown mixtures: sugar solution, starch solution,.', answer: 'Procedure: 1) Shine flashlight through each mixture in a dark room',
                  options: ['Procedure: 1) Shine flashlight through each mixture in a dark room', 'homogeneous means you can\'t see particles with naked eye'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or starch solution as.' }
          ],
            remediations: { 'homogeneous-means-you-can-t': { steps: ['Take three test tubes: sugar solution, starch solution (1% boiled and cooled), milk.', 'In a dark room, pass a laser/flashlight beam through each.', 'Observe: sugar solution — no visible beam (true solution); starch solution and milk — visible beam path (Tyndall.', 'Filter each through filter paper: sugar and starch pass through; milk may leave negligible residue but centrifugation.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_4', difficulty: 'standard',
          question: 'Crystallisation is a separation technique used to obtain pure solid crystals of.',
          hint: 'Revisit the solubility curve graph in node c9_chem_ch1_3 and practice "mass of crystals =.',
          misconception: 'Students think crystallisation is just "evaporation to dryness" and that the solid obtained is automatically pure.',
          parts: [
                { id: 'a', prompt: 'A student has 50 g of impure potassium nitrate (KNO₃) contaminated with 5 g sand and 2 g soluble impurity (NaCl).', answer: 'Step 1: At 60°C, 100 g water dissolves 100 g KNO₃ (saturated)',
                  options: ['Step 1: At 60°C, 100 g water dissolves 100 g KNO₃ (saturated)', 'evaporation to dryness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think crystallisation is just "evaporation to dryness" and that the solid obtained is automatically pure.' }
          ],
            remediations: { 'crystallisation-is-just-evaporation-to': { steps: ['If a student cannot distinguish crystallisation from evaporation, do this: Take two beakers with saturated copper.', 'Beaker A: boil to dryness – observe dark blue solid.', 'Beaker B: cool slowly – observe pure blue crystals, mother liquor coloured.', 'Then have student write the solubility argument: "At 20°C, CuSO₄ solubility = 20 g/100 mL, FeSO₄ = 25 g/100 mL, so.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_5', difficulty: 'standard',
          question: 'Distillation is a physical separation technique used to separate components of.',
          hint: 'Review c8_chem_ch2_11 (Changes of State) and c9_chem_ch1_1 (Mixture Types) to solidify.',
          misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental physical property that allows distillation to separate a mixture of two miscible liquids?', answer: 'The fundamental property is the difference in boiling points of the two liquids',
                  options: ['The fundamental property is the difference in boiling points of the two liquids', 'difference in density', 'difference in solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so it.' },
                { id: 'b', prompt: 'A student sets up simple distillation to separate a mixture of ethanol (b.p. 78°C) and water (b.p. 100°C).', answer: 'The reading is higher than pure ethanol\'s boiling point',
                  options: ['The reading is higher than pure ethanol\'s boiling point', 'thermometer is broken', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so it.' }
          ],
            remediations: { 'the-thermometer-bulb-should-be': { steps: ['Revisit c8_chem_ch2_11 (Changes of State) to reinforce that boiling point is the temperature at which vapour pressure.', 'Draw a particle diagram showing two liquids with different intermolecular forces; label which particles escape first.', 'Practice placing the thermometer bulb correctly on a diagram: at the T-junction where vapour enters the condenser, not.', 'Use a simulation (e.g., PhET "States of Matter") to visualise vapour composition changing with temperature.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the.',
          parts: [
                { id: 'a', prompt: 'A lab technician claims that simple distillation can completely separate a 50:50 mixture of benzene (b.p. 80°C) and toluene (b.p. 110°C) in one run.', answer: 'The claim is partially correct',
                  options: ['The claim is partially correct', 'yes, because boiling points are different', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so it.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate the principle of fractional distillation without a fractionating column, and explain how you.', answer: 'Use two pots: boil a mixture of water and vinegar (acetic acid b.p',
                  options: ['Use two pots: boil a mixture of water and vinegar (acetic acid b.p', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so it.' }
          ],
            remediations: { 'the-thermometer-bulb-should-be': { steps: ['Revisit c8_chem_ch2_11 (Changes of State) to reinforce that boiling point is the temperature at which vapour pressure.', 'Draw a particle diagram showing two liquids with different intermolecular forces; label which particles escape first.', 'Practice placing the thermometer bulb correctly on a diagram: at the T-junction where vapour enters the condenser, not.', 'Use a simulation (e.g., PhET "States of Matter") to visualise vapour composition changing with temperature.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_6', difficulty: 'standard',
          question: 'Chromatography is a separation technique where components of a mixture are.',
          hint: 'If stuck, revisit c9_chem_ch1_2 (solutions) and c8_chem_ch3_5 (evaporation/distillation).',
          misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on.',
          parts: [
                { id: 'a', prompt: 'You are given a chromatogram of an unknown ink sample developed in water. The solvent front moved 8.0 cm.', answer: 'Rf₁ = 1.6/8.0 = 0.20',
                  options: ['Rf₁ = 1.6/8.0 = 0.20', 'move with the solvent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' },
                { id: 'b', prompt: 'Compare paper chromatography and thin-layer chromatography (TLC) in terms of stationary phase, speed of separation, and suitability for colorless compounds.', answer: 'Paper chromatography: stationary phase = water trapped in cellulose fibers',
                  options: ['Paper chromatography: stationary phase = water trapped in cellulose fibers', 'move with the solvent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' }
          ],
            remediations: { 'the-solvent-front-is-the': { steps: ['Show a time-lapse video of paper chromatography (or do live demo with ink).', 'Use a two-color dye (e.g., green = blue + yellow) and ask: "If yellow moves faster, is it more soluble or less.', 'Have students calculate Rf for each color in two solvents (water vs. ethanol).', 'Assign a worksheet where they predict order of separation for a 3-component mixture given adsorption/solubility.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on.',
          parts: [
                { id: 'a', prompt: 'A student runs a chromatogram of a green plant pigment extract using acetone as solvent. Only one green spot appears at Rf = 0.45.', answer: 'The conclusion is invalid',
                  options: ['The conclusion is invalid', 'move with the solvent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' },
                { id: 'b', prompt: 'Design a simple paper chromatography experiment to determine which of three different black pens (A, B, C) was used to write a ransom note.', answer: 'Materials: three pens, ransom note paper strip, chromatography paper, beaker,',
                  options: ['Materials: three pens, ransom note paper strip, chromatography paper, beaker,', 'move with the solvent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' },
                { id: 'c', prompt: 'Compare paper chromatography and thin-layer chromatography (TLC) in terms of stationary phase, speed of separation, and suitability for colorless compounds.', answer: 'Paper chromatography: stationary phase = water trapped in cellulose fibers',
                  options: ['Paper chromatography: stationary phase = water trapped in cellulose fibers', 'move with the solvent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' }
          ],
            remediations: { 'the-solvent-front-is-the': { steps: ['Show a time-lapse video of paper chromatography (or do live demo with ink).', 'Use a two-color dye (e.g., green = blue + yellow) and ask: "If yellow moves faster, is it more soluble or less.', 'Have students calculate Rf for each color in two solvents (water vs. ethanol).', 'Assign a worksheet where they predict order of separation for a 3-component mixture given adsorption/solubility.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_8', difficulty: 'standard',
          question: 'Sublimation is a physical change of state in which a solid transforms directly.',
          hint: 'If stuck, revisit c8_chem_ch2_6 (solid particles), c8_chem_ch2_8 (gas particles), and.',
          misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar.',
          parts: [
                { id: 'a', prompt: 'Define sublimation and name two substances that sublime at room temperature. Write their chemical formulas.', answer: 'Sublimation is the direct transition of a solid to gas without becoming liquid',
                  options: ['Sublimation is the direct transition of a solid to gas without becoming liquid', 'ice sublimes', 'sublimation is solid to liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' },
                { id: 'b', prompt: 'Explain why solid carbon dioxide (dry ice) sublimes at -78°C under 1 atm pressure, but water ice melts at 0°C under the same pressure.', answer: 'Dry ice (CO₂) has weak van der Waals forces between molecules',
                  options: ['Dry ice (CO₂) has weak van der Waals forces between molecules', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' },
                { id: 'c', prompt: 'A mixture contains 5 g of ammonium chloride (NH₄Cl) and 5 g of sodium chloride (NaCl).', answer: 'Procedure: (1) Place mixture in a china dish',
                  options: ['Procedure: (1) Place mixture in a china dish', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' }
          ],
            remediations: { 'any-solid-heated-strongly-will': { steps: ['Show a video of sugar heating: it melts, turns brown, chars, and releases fumes — point out the colour change and.', 'Heat NH₄Cl in a test tube with a cold finger: white crystals deposit *only* on the cooler upper part, proving.', 'Have students test 4 solids (NaCl, NH₄Cl, iodine, sugar) in a "sublimation test" table: record if they melt, char, or.', 'Emphasize: sublimation = reversible, no colour change, same chemical formula.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Iodine crystals sublime on heating, so the purple vapour produced is a new chemical substance." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' }
          ],
            remediations: { 'any-solid-heated-strongly-will': { steps: ['Show a video of sugar heating: it melts, turns brown, chars, and releases fumes — point out the colour change and.', 'Heat NH₄Cl in a test tube with a cold finger: white crystals deposit *only* on the cooler upper part, proving.', 'Have students test 4 solids (NaCl, NH₄Cl, iodine, sugar) in a "sublimation test" table: record if they melt, char, or.', 'Emphasize: sublimation = reversible, no colour change, same chemical formula.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
