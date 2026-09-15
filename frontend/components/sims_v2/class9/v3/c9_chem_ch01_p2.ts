import type { SimDef } from '../../engine/types';

/** v3 generated — c9_chem_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_chem_ch01_p2: SimDef = {
    id: 'v3_c9_chem_ch01_p2',
    title: 'Matter in Our Surroundings: Mixtures and Solutions · Part 2/2',
    subtitle: 'Clear doesn\'t always mean uniform',
    classLevel: 9, subject: 'chemistry', topic: 'Matter in Our Surroundings: Mixtures and Solutions · Part 2/2',
    chapters: ['c9_chem_ch01'],
    nodeIds: ['c9_chem_ch1_5', 'c9_chem_ch1_6', 'c9_chem_ch1_7', 'c9_chem_ch1_8', 'c9_chem_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic mixture analyst', intro: 'Nimbu pani vs sand-water vs milk — they all look like \'mixed stuff\' until you interrogate them with light and filter paper. Learn the particle-size rule that sorts every mixture.', goal: 'Classify mixtures as homogeneous or heterogeneous using particle size, Tyndall effect, filtration and settling — beyond what the eye can see.' },
    discovery: {
        question: 'Milk looks perfectly uniform and sugar-water looks perfectly clear — so they must be the same kind of mixture, right?',
        options: ['No — shine a flashlight through them: milk scatters the beam (colloid, particles ~100–1000 nm) while a true solution never does', 'Yes — anything that looks uniform is homogeneous', 'No — milk is a pure substance', 'Yes — liquids are always homogeneous'],
        answer: 'No — shine a flashlight through them: milk scatters the beam (colloid, particles ~100–1000 nm) while a true solution never does',
        hook: 'Looks deceive: the real test is particle size. Under 1 nm = true solution (no light scatter, never settles, slips through filters); bigger particles = suspensions and colloids that settle, scatter or get caught.',
    },
    teaching: [
        { title: 'Separation by Distillation: Simple and Fractional', text: 'Distillation is a physical separation technique used to separate components of a homogeneous mixture of miscible liquids based on differences in their boiling points; simple distillation is effective.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_chem_ch1_5', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Run the two-test gauntlet — flashlight for Tyndall scatter, filter paper for residue — on mystery beakers of sugar solution, starch solution and sand-water, and sort each into homogeneous or heterogeneous.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c9_chem_ch1_5', title: 'Separation by Distillation: Simple and Fractional',
          caseStudy: { intro: 'Imagine you have a bottle of homemade rose water that smells faintly of alcohol because it was fermented slightly – you want pure rose water.',
            decisions: [{ prompt: 'What is the fundamental physical property that allows distillation to separate a mixture of two miscible liquids?', options: [
                { text: 'The fundamental property is the difference in boiling points of the two liquids', outcome: 'The fundamental property is the difference in boiling points of the two liquids.' },
                { text: 'difference in density', outcome: 'Not quite — Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must.', reveals: 'the-thermometer-bulb-should-be' },
                { text: 'difference in solubility', outcome: 'Not quite — Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must.', reveals: 'the-thermometer-bulb-should-be' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_6', title: 'Separation by Chromatography: Principle and Applications',
          scaffold: { problem: 'A student performs paper chromatography on a sample of black ballpoint pen ink using water as the solvent.',
            steps: [
            { text: 'Identify the given data — origin is the starting line, solvent front = 10.0 cm, spot distances: blue = 2.5 cm, red.' },
            { text: 'Recall the Rf formula: Rf = distance travelled by solute / distance travelled by solvent front.' },
            { text: 'Calculate Rf for each dye: Blue: 2.5/10.0 = 0.25; Red: 5.0/10.0 = 0.50; Yellow: 7.5/10.0 = 0.75.' },
            { text: 'Interpret Rf values — lower Rf means the solute spends more time adsorbed on the stationary phase (paper) and less.' },
            { text: 'Conclude: Blue dye has the strongest adsorption on the paper (or least solubility in water), yellow the weakest.', faded: true, blankAnswer: 'Blue: Rf = 0.25; Red: Rf = 0.50; Yellow: Rf = 0.75. Blue.' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch1_7', title: 'Separation of Immiscible Liquids: Separating Funnel',
          caseStudy: { intro: 'Observe how oil floats on water when you wash an oily utensil — the two liquids form clear layers instead of mixing.',
            decisions: [{ prompt: 'What is the fundamental physical property that allows a separating funnel to separate two immiscible liquids?', options: [
                { text: 'The fundamental property is the difference in densities of the two immiscible liquids', outcome: 'The fundamental property is the difference in densities of the two immiscible liquids, which causes.' },
                { text: 'difference in boiling points', outcome: 'Not quite — Students believe that the aqueous layer (water-based) always forms the lower layer in a separating.', reveals: 'the-aqueous-layer-water-based' },
                { text: 'difference in solubility', outcome: 'Not quite — Students believe that the aqueous layer (water-based) always forms the lower layer in a separating.', reveals: 'the-aqueous-layer-water-based' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_8', title: 'Sublimation: Definition and Examples',
          caseStudy: { intro: 'Begin by showing a student a naphthalene ball (commonly used in Indian wardrobes) and ask why it disappears over time without leaving any liquid residue.',
            decisions: [{ prompt: 'Define sublimation and name two substances that sublime at room temperature. Write their chemical formulas.', options: [
                { text: 'Sublimation is the direct transition of a solid to gas without becoming liquid', outcome: 'Sublimation is the direct transition of a solid to gas without becoming liquid.' },
                { text: 'ice sublimes', outcome: 'Not quite — Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium.', reveals: 'any-solid-heated-strongly-will' },
                { text: 'sublimation is solid to liquid', outcome: 'Not quite — Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium.', reveals: 'any-solid-heated-strongly-will' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_9', title: 'Suspensions: Properties and Examples',
          caseStudy: { intro: 'Take a glass of water and add a spoonful of fine sand. Stir it vigorously — the water turns cloudy and you can see individual sand particles swirling.',
            decisions: [{ prompt: 'Define a suspension and state the minimum particle size required for a mixture to be classified as one.', options: [
                { text: 'A suspension is a heterogeneous mixture in', outcome: 'A suspension is a heterogeneous mixture in which solid particles larger than 1000 nm (1 micron) are.' },
                { text: 'particle size >1 nm', outcome: 'Not quite — Students confuse suspensions with colloids because both appear cloudy.', reveals: 'students-confuse-suspensions-with-colloids' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Setting up for a class demo, a student holds a glass of clear lime water and a glass of chalk-water: \'Both look uniform enough to me — call both homogeneous.\' A torch beam, though, scatters visibly through one and not the other.',
            decisions: [{ prompt: 'Which mixture is truly homogeneous?', options: [
                { text: 'The lime water — its dissolved particles are below a nanometre, form one phase, never settle, and do not scatter the beam. The chalk particles are thousands of times larger, make a second phase, scatter light and settle — a heterogeneous suspension, whatever it looks like.', outcome: 'This classifies by the real criteria — particle size, phase uniformity, Tyndall effect — instead of trusting a quick glance.' },
                { text: 'The student is right — if you cannot see separate parts, a mixture is homogeneous by definition.', outcome: 'Looks can deceive: milk looks uniform yet is a heterogeneous colloid; the test is particle size and light scattering, not appearance.', reveals: 'looks-uniform-is-uniform' },
                { text: 'Both are heterogeneous — water mixtures always contain visible dirt at some level.', outcome: 'That throws out true solutions entirely; dissolved ions are molecular-scale and genuinely form one uniform phase.', reveals: 'no-true-solutions' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_9', title: 'You made it',
          caseStudy: { intro: 'A mixture\'s personality is decided by particle size. Molecular-tiny = one uniform phase that never separates; bigger bits = visible phases that settle, filter and scatter light.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch1_5', difficulty: 'standard',
          question: 'Distillation is a physical separation technique used to separate components.',
          hint: 'Review c8_chem_ch2_11 (Changes of State) and c9_chem_ch1_1 (Mixture Types) to solidify.',
          misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental physical property that allows distillation to separate a mixture of two miscible liquids?', answer: 'The fundamental property is the difference in boiling points of the two liquids',
                  options: ['The fundamental property is the difference in boiling points of the two liquids', 'difference in density', 'difference in solubility', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Review c8_chem_ch2_11 (Changes of State) and c9_chem_ch1_1 (Mixture Types) to solidify the particle.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so.' },
                { id: 'b', prompt: 'A student sets up simple distillation to separate a mixture of ethanol (b.p. 78°C) and water (b.p. 100°C).', answer: 'The reading is higher than pure ethanol\'s boiling point',
                  options: ['The reading is higher than pure ethanol\'s boiling point', 'thermometer is broken', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Review c8_chem_ch2_11 (Changes of State) and c9_chem_ch1_1 (Mixture Types) to solidify the particle.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so.' }
          ],
            remediations: { 'the-thermometer-bulb-should-be': { steps: ['Revisit c8_chem_ch2_11 (Changes of State) to reinforce that boiling point is the temperature at which vapour pressure.', 'Draw a particle diagram showing two liquids with different intermolecular forces; label which particles escape first.', 'Practice placing the thermometer bulb correctly on a diagram: at the T-junction where vapour enters the condenser, not.', 'Use a simulation (e.g., PhET "States of Matter") to visualise vapour composition changing with temperature.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the.',
          parts: [
                { id: 'a', prompt: 'A lab technician claims that simple distillation can completely separate a 50:50 mixture of benzene (b.p. 80°C) and toluene (b.p. 110°C) in one run.', answer: 'The claim is partially correct',
                  options: ['The claim is partially correct', 'yes, because boiling points are different', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Review c8_chem_ch2_11 (Changes of State) and c9_chem_ch1_1 (Mixture Types) to solidify the particle.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate the principle of fractional distillation without a fractionating column, and explain how you.', answer: 'Use two pots: boil a mixture of water and vinegar (acetic acid b.p',
                  options: ['Use two pots: boil a mixture of water and vinegar (acetic acid b.p', 'the thermometer bulb should be dipped in the boiling liquid'],
                  hint: 'Review c8_chem_ch2_11 (Changes of State) and c9_chem_ch1_1 (Mixture Types) to solidify the particle.',
                  misconception: 'Students often think the thermometer bulb should be dipped in the boiling liquid; actually it must be placed at the side-arm entrance so.' }
          ],
            remediations: { 'the-thermometer-bulb-should-be': { steps: ['Revisit c8_chem_ch2_11 (Changes of State) to reinforce that boiling point is the temperature at which vapour pressure.', 'Draw a particle diagram showing two liquids with different intermolecular forces; label which particles escape first.', 'Practice placing the thermometer bulb correctly on a diagram: at the T-junction where vapour enters the condenser, not.', 'Use a simulation (e.g., PhET "States of Matter") to visualise vapour composition changing with temperature.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_6', difficulty: 'standard',
          question: 'Chromatography is a separation technique where components of a mixture are.',
          hint: 'If stuck, revisit c9_chem_ch1_2 (solutions) and c8_chem_ch3_5 (evaporation/distillation).',
          misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers.',
          parts: [
                { id: 'a', prompt: 'You are given a chromatogram of an unknown ink sample developed in water. The solvent front moved 8.0 cm.', answer: 'Rf₁ = 1.6/8.0 = 0.20',
                  options: ['Rf₁ = 1.6/8.0 = 0.20', 'move with the solvent'],
                  hint: 'If stuck, revisit c9_chem_ch1_2 (solutions) and c8_chem_ch3_5 (evaporation/distillation).',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' },
                { id: 'b', prompt: 'Compare paper chromatography and thin-layer chromatography (TLC) in terms of stationary phase, speed of separation, and suitability for colorless compounds.', answer: 'Paper chromatography: stationary phase = water trapped in cellulose fibers',
                  options: ['Paper chromatography: stationary phase = water trapped in cellulose fibers', 'move with the solvent'],
                  hint: 'If stuck, revisit c9_chem_ch1_2 (solutions) and c8_chem_ch3_5 (evaporation/distillation).',
                  misconception: 'Students believe the solvent front *is* the mobile phase and that components "move with the solvent" like passengers on a bus.' }
          ],
            remediations: { 'the-solvent-front-is-the': { steps: ['Show a time-lapse video of paper chromatography (or do live demo with ink).', 'Use a two-color dye (e.g., green = blue + yellow) and ask: "If yellow moves faster, is it more soluble or less.', 'Have students calculate Rf for each color in two solvents (water vs. ethanol).', 'Assign a worksheet where they predict order of separation for a 3-component mixture given adsorption/solubility.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_7', difficulty: 'standard',
          question: 'A separating funnel is a laboratory apparatus used to separate two immiscible.',
          hint: 'If stuck, revisit c8_chem_ch3_2 (homogeneous vs heterogeneous mixtures) and c8_chem_ch2_9.',
          misconception: 'Students believe that the aqueous layer (water-based) always forms the lower layer in a separating funnel.',
          parts: [
                { id: 'a', prompt: 'A student pours a mixture of water (density 1.0 g/cm³) and carbon tetrachloride (density 1.6 g/cm³) into a separating funnel.', answer: 'Carbon tetrachloride will form the lower layer',
                  options: ['Carbon tetrachloride will form the lower layer', 'water will be lower', 'water is always the reference without checking numbers'],
                  hint: 'If stuck, revisit c8_chem_ch3_2 (homogeneous vs heterogeneous mixtures) and c8_chem_ch2_9.',
                  misconception: 'Students believe that the aqueous layer (water-based) always forms the lower layer in a separating funnel.' }
          ],
            remediations: { 'the-aqueous-layer-water-based': { steps: ['Give the student a density table of common organic liquids (hexane 0.66, ether 0.71, chloroform 1.48, carbon.', 'Ask them to predict layer order for 5 pairs (e.g., ether-water, chloroform-water, hexane-water, carbon.', 'For each wrong prediction, have them do a "drop test": add a drop of coloured water to a test tube with the two liquids.', 'Repeat until they consistently predict layer order from density values alone.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_8', difficulty: 'standard',
          question: 'Sublimation is a physical change of state in which a solid transforms directly.',
          hint: 'If stuck, revisit c8_chem_ch2_6 (solid particles), c8_chem_ch2_8 (gas particles), and.',
          misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar.',
          parts: [
                { id: 'a', prompt: 'Define sublimation and name two substances that sublime at room temperature. Write their chemical formulas.', answer: 'Sublimation is the direct transition of a solid to gas without becoming liquid',
                  options: ['Sublimation is the direct transition of a solid to gas without becoming liquid', 'ice sublimes', 'sublimation is solid to liquid', 'dry ice'],
                  hint: 'If stuck, revisit c8_chem_ch2_6 (solid particles), c8_chem_ch2_8 (gas particles), and.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' },
                { id: 'b', prompt: 'Explain why solid carbon dioxide (dry ice) sublimes at -78°C under 1 atm pressure, but water ice melts at 0°C under the same pressure.', answer: 'Dry ice (CO₂) has weak van der Waals forces between molecules',
                  options: ['Dry ice (CO₂) has weak van der Waals forces between molecules', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'If stuck, revisit c8_chem_ch2_6 (solid particles), c8_chem_ch2_8 (gas particles), and.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' },
                { id: 'c', prompt: 'A mixture contains 5 g of ammonium chloride (NH₄Cl) and 5 g of sodium chloride (NaCl).', answer: 'Procedure: (1) Place mixture in a china dish',
                  options: ['Procedure: (1) Place mixture in a china dish', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'If stuck, revisit c8_chem_ch2_6 (solid particles), c8_chem_ch2_8 (gas particles), and.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' }
          ],
            remediations: { 'any-solid-heated-strongly-will': { steps: ['Show a video of sugar heating: it melts, turns brown, chars, and releases fumes — point out the colour change and.', 'Heat NH₄Cl in a test tube with a cold finger: white crystals deposit *only* on the cooler upper part, proving.', 'Have students test 4 solids (NaCl, NH₄Cl, iodine, sugar) in a "sublimation test" table: record if they melt, char,.', 'Emphasize: sublimation = reversible, no colour change, same chemical formula.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_9', difficulty: 'standard',
          question: 'A suspension is a heterogeneous mixture in which solid particles (size >1000.',
          hint: 'Revisit c9_chem_ch1_1 (Mixtures: Definition and Types) to refresh the classification.',
          misconception: 'Students confuse suspensions with colloids because both appear cloudy.',
          parts: [
                { id: 'a', prompt: 'Define a suspension and state the minimum particle size required for a mixture to be classified as one.', answer: 'A suspension is a heterogeneous mixture in',
                  options: ['A suspension is a heterogeneous mixture in', 'particle size >1 nm'],
                  hint: 'Revisit c9_chem_ch1_1 (Mixtures: Definition and Types) to refresh the classification by particle.',
                  misconception: 'Students confuse suspensions with colloids because both appear cloudy.' }
          ],
            remediations: { 'students-confuse-suspensions-with-colloids': { steps: ['Prepare three test tubes: sugar solution (clear), starch solution (cloudy, colloid), chalk-water (cloudy, suspension).', 'Let all three stand for 10 minutes.', 'Observe: sugar solution stays clear, starch stays cloudy (no settling), chalk settles at the bottom (suspension).', 'Filter each through filter paper: sugar and starch pass through, chalk leaves residue.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
