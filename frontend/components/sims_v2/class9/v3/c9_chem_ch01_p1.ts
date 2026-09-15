import type { SimDef } from '../../engine/types';

/** v3 generated — c9_chem_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_chem_ch01_p1: SimDef = {
    id: 'v3_c9_chem_ch01_p1',
    title: 'Matter in Our Surroundings: Mixtures and Solutions · Part 1/2',
    subtitle: 'Clear doesn\'t always mean uniform',
    classLevel: 9, subject: 'chemistry', topic: 'Matter in Our Surroundings: Mixtures and Solutions · Part 1/2',
    chapters: ['c9_chem_ch01'],
    nodeIds: ['c9_chem_ch1_1', 'c9_chem_ch1_10', 'c9_chem_ch1_11', 'c9_chem_ch1_2', 'c9_chem_ch1_3', 'c9_chem_ch1_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic mixture analyst', intro: 'Nimbu pani vs sand-water vs milk — they all look like \'mixed stuff\' until you interrogate them with light and filter paper. Learn the particle-size rule that sorts every mixture.', goal: 'Classify mixtures as homogeneous or heterogeneous using particle size, Tyndall effect, filtration and settling — beyond what the eye can see.' },
    discovery: {
        question: 'Milk looks perfectly uniform and sugar-water looks perfectly clear — so they must be the same kind of mixture, right?',
        options: ['No — shine a flashlight through them: milk scatters the beam (colloid, particles ~100–1000 nm) while a true solution never does', 'Yes — anything that looks uniform is homogeneous', 'No — milk is a pure substance', 'Yes — liquids are always homogeneous'],
        answer: 'No — shine a flashlight through them: milk scatters the beam (colloid, particles ~100–1000 nm) while a true solution never does',
        hook: 'Looks deceive: the real test is particle size. Under 1 nm = true solution (no light scatter, never settles, slips through filters); bigger particles = suspensions and colloids that settle, scatter or get caught.',
    },
    teaching: [
        { title: 'Mixtures: Definition and Types (Homogeneous and Heterogeneous)', text: 'A mixture is a material composed of two or more substances (elements or compounds) physically combined in any proportion, where each substance retains its own chemical identity and properties.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_chem_ch1_1', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Run the two-test gauntlet — flashlight for Tyndall scatter, filter paper for residue — on mystery beakers of sugar solution, starch solution and sand-water, and sort each into homogeneous or heterogeneous.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'case', nodeId: 'c9_chem_ch1_1', title: 'Mixtures: Definition and Types (Homogeneous and Heterogeneous)',
          caseStudy: { intro: 'Observe a glass of nimbu pani (lemonade) and a glass of sand-water mixture side by side.',
            decisions: [{ prompt: 'Define a mixture and state the two main types. Give one example of each type from daily life.', options: [
                { text: 'A mixture is a physical combination of two or more substances retaining their individual', outcome: 'A mixture is a physical combination of two or more substances retaining their individual.' },
                { text: 'mixture is a chemical combination', outcome: 'Not quite — Students often think "homogeneous means you can\'t see particles with naked eye" and classify.', reveals: 'homogeneous-means-you-can-t' },
                { text: 'types are solid and liquid', outcome: 'Not quite — Students often think "homogeneous means you can\'t see particles with naked eye" and classify.', reveals: 'homogeneous-means-you-can-t' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_10', title: 'Colloids: Definition, Types and Properties',
          caseStudy: { intro: 'Observe a glass of milk and a beam of sunlight entering a dusty room – both show a visible light path, unlike a salt solution.',
            decisions: [{ prompt: 'State the size range of dispersed phase particles in a colloid and name the phenomenon where a beam of light becomes visible when passed.', options: [
                { text: 'The size range is 1–1000 nm (or 10⁻⁹ to 10⁻⁶ m)', outcome: 'The size range is 1–1000 nm (or 10⁻⁹ to 10⁻⁶ m). The phenomenon is the Tyndall effect.' },
                { text: 'appears uniform to the eye', outcome: 'Not quite — Students often think colloids are homogeneous because they look uniform and transparent (like milk.', reveals: 'colloids-are-homogeneous-because-they' },
                { text: 'homogeneous at the particle level', outcome: 'Not quite — Students often think colloids are homogeneous because they look uniform and transparent (like milk.', reveals: 'colloids-are-homogeneous-because-they' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_11', title: 'Tyndall Effect: Scattering of Light by Colloids',
          caseStudy: { intro: 'Start with a real-world observation: in a dusty room or during a foggy morning in Delhi, a beam of sunlight entering through a window becomes visible as.',
            decisions: [{ prompt: 'Define the Tyndall effect and state the size range of particles that exhibit it.', options: [
                { text: 'The Tyndall effect is the scattering of light by colloidal particles (1 nm – 1000 nm)', outcome: 'The Tyndall effect is the scattering of light by colloidal particles (1 nm – 1000 nm) making the.' },
                { text: 'scattering by any particles', outcome: 'Not quite — Students often think the Tyndall effect is caused by the *colour* of the colloid (e.g., milk.', reveals: 'the-tyndall-effect-is-caused' },
                { text: 'size >1000 nm', outcome: 'Not quite — Students often think the Tyndall effect is caused by the *colour* of the colloid (e.g., milk.', reveals: 'the-tyndall-effect-is-caused' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_2', title: 'Solutions: Solute, Solvent and Concentration',
          scaffold: { problem: 'A goldsmith melts 20 g of pure gold with 80 g of copper to make a rose gold alloy.',
            steps: [
            { text: 'Identify solute and solvent. Gold is the solute (smaller mass, 20 g), copper is the solvent (larger mass, 80 g).' },
            { text: 'Calculate total mass of solution (alloy) = mass of gold + mass of copper = 20 g + 80 g = 100 g.' },
            { text: 'Apply mass by mass % formula = (mass of solute / mass of solution) × 100 = (20 g / 100 g) × 100 = 20% (w/w).' },
            { text: 'Calculate volume of alloy using density: Volume = mass / density = 100 g / 15.5 g/cm³ = 6.45 cm³ = 6.45 mL.' },
            { text: 'Calculate mass by volume % = (mass of solute / volume of solution) × 100 = (20 g / 6.45 mL) × 100 = 310% (w/v).', faded: true, blankAnswer: 'Mass by mass % = 20% (w/w); Mass by volume % = 310% (w/v).' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch1_3', title: 'Solubility: Factors Affecting Solubility',
          caseStudy: { intro: 'Imagine you are making lemonade on a hot summer day: you notice sugar dissolves much faster and in greater quantity in warm water than in cold water.',
            decisions: [{ prompt: 'Define solubility in the precise scientific terms used in board examinations, including the standard reference conditions.', options: [
                { text: 'Solubility is the maximum mass of solute (in grams) that can dissolve in 100 grams of', outcome: 'Solubility is the maximum mass of solute (in grams) that can dissolve in 100 grams of solvent at.' },
                { text: 'amount of solute that dissolves in 100 mL solvent', outcome: 'Not quite — Students often confuse \'rate of dissolving\' with \'solubility\'.', reveals: 'students-often-confuse-rate-of' },
                { text: 'saturated', outcome: 'Not quite — Students often confuse \'rate of dissolving\' with \'solubility\'.', reveals: 'students-often-confuse-rate-of' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_4', title: 'Separation by Crystallisation: Principle and Process',
          caseStudy: { intro: 'Imagine you have a sample of impure copper sulphate (blue vitriol) from a chemistry lab in Delhi – it contains sand and other coloured impurities.',
            decisions: [{ prompt: 'Define crystallisation and state the principle on which it is based.', options: [
                { text: 'Crystallisation is the process of formation of pure solid crystals from a saturated', outcome: 'Crystallisation is the process of formation of pure solid crystals from a saturated solution.' },
                { text: 'crystallisation is just evaporation', outcome: 'Not quite — Students think crystallisation is just "evaporation to dryness" and that the solid obtained.', reveals: 'crystallisation-is-just-evaporation-to' },
                { text: 'evaporation to dryness', outcome: 'Not quite — Students think crystallisation is just "evaporation to dryness" and that the solid obtained.', reveals: 'crystallisation-is-just-evaporation-to' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Setting up for a class demo, a student holds a glass of clear lime water and a glass of chalk-water: \'Both look uniform enough to me — call both homogeneous.\' A torch beam, though, scatters visibly through one and not the other.',
            decisions: [{ prompt: 'Which mixture is truly homogeneous?', options: [
                { text: 'The lime water — its dissolved particles are below a nanometre, form one phase, never settle, and do not scatter the beam. The chalk particles are thousands of times larger, make a second phase, scatter light and settle — a heterogeneous suspension, whatever it looks like.', outcome: 'This classifies by the real criteria — particle size, phase uniformity, Tyndall effect — instead of trusting a quick glance.' },
                { text: 'The student is right — if you cannot see separate parts, a mixture is homogeneous by definition.', outcome: 'Looks can deceive: milk looks uniform yet is a heterogeneous colloid; the test is particle size and light scattering, not appearance.', reveals: 'looks-uniform-is-uniform' },
                { text: 'Both are heterogeneous — water mixtures always contain visible dirt at some level.', outcome: 'That throws out true solutions entirely; dissolved ions are molecular-scale and genuinely form one uniform phase.', reveals: 'no-true-solutions' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch1_4', title: 'The bigger picture',
          caseStudy: { intro: 'A mixture\'s personality is decided by particle size. Molecular-tiny = one uniform phase that never separates; bigger bits = visible phases that settle, filter and scatter light.',
            decisions: [{ prompt: 'What comes next? Matter in Our Surroundings: Mixtures and Solutions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Matter in Our Surroundings: Mixtures and Solutions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch1_1', difficulty: 'standard',
          question: 'A mixture is a material composed of two or more substances (elements.',
          hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c8_chem_ch3_1 (Mixtures.',
          misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk.',
          parts: [
                { id: 'a', prompt: 'You are given three beakers: A (milk), B (air), C (blood). Classify each as homogeneous or heterogeneous mixture.', answer: 'A (milk): Heterogeneous (colloid)',
                  options: ['A (milk): Heterogeneous (colloid)', 'homogeneous means you can\'t see particles with naked eye'],
                  hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c8_chem_ch3_1 (Mixtures: Definition and.',
                  misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or starch solution.' }
          ],
            remediations: { 'homogeneous-means-you-can-t': { steps: ['Take three test tubes: sugar solution, starch solution (1% boiled and cooled), milk.', 'In a dark room, pass a laser/flashlight beam through each.', 'Observe: sugar solution — no visible beam (true solution); starch solution and milk — visible beam path (Tyndall.', 'Filter each through filter paper: sugar and starch pass through; milk may leave negligible residue but centrifugation.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All transparent mixtures are homogeneous, and all opaque mixtures are heterogeneous." Evaluate this statement with two counterexamples.', answer: 'The statement is false',
                  options: ['The statement is false', 'homogeneous means you can\'t see particles with naked eye'],
                  hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c8_chem_ch3_1 (Mixtures: Definition and.',
                  misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or starch solution.' },
                { id: 'b', prompt: 'Design a simple experiment using only a flashlight, filter paper, and a stand to distinguish between three unknown mixtures: sugar solution, starch solution.', answer: 'Procedure: 1) Shine flashlight through each mixture in a dark room',
                  options: ['Procedure: 1) Shine flashlight through each mixture in a dark room', 'homogeneous means you can\'t see particles with naked eye'],
                  hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c8_chem_ch3_1 (Mixtures: Definition and.',
                  misconception: 'Students often think "homogeneous means you can\'t see particles with naked eye" and classify colloids like milk or starch solution.' }
          ],
            remediations: { 'homogeneous-means-you-can-t': { steps: ['Take three test tubes: sugar solution, starch solution (1% boiled and cooled), milk.', 'In a dark room, pass a laser/flashlight beam through each.', 'Observe: sugar solution — no visible beam (true solution); starch solution and milk — visible beam path (Tyndall.', 'Filter each through filter paper: sugar and starch pass through; milk may leave negligible residue but centrifugation.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_10', difficulty: 'standard',
          question: 'A colloid is a heterogeneous mixture in which the dispersed phase particles.',
          hint: 'If stuck, revisit the classification of mixtures (c9_chem_ch1_1) and the properties.',
          misconception: 'Students often think colloids are homogeneous because they look uniform and transparent (like milk or jelly).',
          parts: [
                { id: 'a', prompt: 'State the size range of dispersed phase particles in a colloid and name the phenomenon where a beam of light becomes visible when passed through a colloidal.', answer: 'The size range is 1–1000 nm (or 10⁻⁹ to 10⁻⁶ m)',
                  options: ['The size range is 1–1000 nm (or 10⁻⁹ to 10⁻⁶ m)', 'appears uniform to the eye', 'homogeneous at the particle level', 'colloids are homogeneous'],
                  hint: 'If stuck, revisit the classification of mixtures (c9_chem_ch1_1) and the properties of suspensions.',
                  misconception: 'Students often think colloids are homogeneous because they look uniform and transparent (like milk or jelly).' },
                { id: 'b', prompt: 'Classify each of the following into the correct colloid type (sol, gel, emulsion, foam, aerosol, solid sol, solid foam, solid aerosol): (a) milk, (b) smoke.', answer: 'milk, (',
                  options: ['milk, (', 'appears uniform to the eye', 'homogeneous at the particle level', 'colloids are homogeneous'],
                  hint: 'If stuck, revisit the classification of mixtures (c9_chem_ch1_1) and the properties of suspensions.',
                  misconception: 'Students often think colloids are homogeneous because they look uniform and transparent (like milk or jelly).' },
                { id: 'c', prompt: 'A student claims: "Since colloids are heterogeneous mixtures, they should settle down quickly like suspensions." Analyse this statement using particle size.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'appears uniform to the eye', 'homogeneous at the particle level', 'colloids are homogeneous'],
                  hint: 'If stuck, revisit the classification of mixtures (c9_chem_ch1_1) and the properties of suspensions.',
                  misconception: 'Students often think colloids are homogeneous because they look uniform and transparent (like milk or jelly).' }
          ],
            remediations: { 'colloids-are-homogeneous-because-they': { steps: ['Show the student a glass of milk and a glass of salt water side by side.', 'Shine a laser through both in a dark room; ask them to describe what they see.', 'Explain that the visible beam in milk proves particles are large enough to scatter light, so it cannot be a true.', 'Have them re-read the definition of heterogeneous mixture: "composition not uniform at microscopic level".'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_11', difficulty: 'standard',
          question: 'The Tyndall effect is the scattering of a beam of light by colloidal particles.',
          hint: 'Revisit c9_chem_ch1_10 (Colloids: Definition, Types and Properties) and c8_chem_ch3_2.',
          misconception: 'Students often think the Tyndall effect is caused by the *colour* of the colloid (e.g., milk is white, so it scatters.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Tyndall effect is the scattering of a beam of light by colloidal particles (1 nm –',
                  options: ['The Tyndall effect is the scattering of a beam of light by colloidal particles (1 nm –', 'A mixture is a material composed of two or more substances (elements or compounds)', 'A colloid is a heterogeneous mixture in', 'A solution is a homogeneous mixture of two or more substances where the solute (component'],
                  hint: 'Revisit c9_chem_ch1_10 (Colloids: Definition, Types and Properties) and c8_chem_ch3_2 (Uniform.',
                  misconception: 'Students often think the Tyndall effect is caused by the *colour* of the colloid (e.g., milk is white, so it scatters light).' }
          ],
            remediations: { 'the-tyndall-effect-is-caused': { steps: ['Show two colourless liquids: salt water (true solution) and dilute gelatin (colloid).', 'Pass a laser beam through both in a darkened room.', 'Ask students to observe which shows a visible beam.', 'Emphasize: both are colourless, but only gelatin scatters light because its particles are 1-1000 nm.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_2', difficulty: 'standard',
          question: 'A solution is a homogeneous mixture of two or more substances where the solute.',
          hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c9_chem_ch1_1 (Mixtures.',
          misconception: 'Students often think "concentration" means only molarity (moles/litre) because they hear it in higher classes, so they.',
          parts: [
                { id: 'a', prompt: 'Define solute and solvent in a solution. In a solution of iodine in alcohol (tincture of iodine), which is the solute and which is the solvent?', answer: 'Solute is the component present in smaller amount that gets dissolved',
                  options: ['Solute is the component present in smaller amount that gets dissolved', 'concentration'],
                  hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c9_chem_ch1_1 (Mixtures: Definition and.',
                  misconception: 'Students often think "concentration" means only molarity (moles/litre) because they hear it in higher classes, so they try to use molar.' },
                { id: 'b', prompt: 'Compare three solutions: A) 10% (mass/mass) sugar in water, B) 10% (mass/volume) sugar in water, C) 10% (volume/volume) alcohol in water.', answer: 'Solution A: 10% mass/mass → 10 g sugar in 100 g solution',
                  options: ['Solution A: 10% mass/mass → 10 g sugar in 100 g solution', 'concentration'],
                  hint: 'Revisit c8_chem_ch3_2 (Uniform vs Non-Uniform Mixtures) and c9_chem_ch1_1 (Mixtures: Definition and.',
                  misconception: 'Students often think "concentration" means only molarity (moles/litre) because they hear it in higher classes, so they try to use molar.' }
          ],
            remediations: { 'concentration-means-only-molarity-moles': { steps: ['Re-read the question to identify which concentration expression is asked (mass/mass, mass/volume, volume/volume).', 'Write the formula for that expression.', 'Identify given quantities: mass of solute, mass of solvent, volume of solution, etc.', 'If solution volume not given, assume volume of solution ≈ volume of solvent for dilute aqueous solutions, or state.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_3', difficulty: 'standard',
          question: 'Solubility is the maximum amount of solute (in grams) that can dissolve in 100.',
          hint: 'Revisit c8_chem_ch2_10 (inter-particle attraction) and c9_chem_ch1_2 (solution.',
          misconception: 'Students often confuse \'rate of dissolving\' with \'solubility\'.',
          parts: [
                { id: 'a', prompt: 'Compare the effect of pressure on the solubility of oxygen gas in water versus the solubility of sodium chloride in water.', answer: 'Pressure significantly increases gas solubility (Henry\'s law)',
                  options: ['Pressure significantly increases gas solubility (Henry\'s law)', 'pressure increases both'],
                  hint: 'Revisit c8_chem_ch2_10 (inter-particle attraction) and c9_chem_ch1_2 (solution terminology) – focus.',
                  misconception: 'Students often confuse \'rate of dissolving\' with \'solubility\'.' }
          ],
            remediations: { 'students-often-confuse-rate-of': { steps: ['Perform a side-by-side demo: Take two beakers with 100 mL water at same temperature.', 'Stir one vigorously, leave the other unstirred.', 'Both will dissolve only ~36 g (at 20°C) – the stirred one just reaches saturation faster.', 'Have students record time to saturation vs final undissolved mass.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_4', difficulty: 'standard',
          question: 'Crystallisation is a separation technique used to obtain pure solid crystals.',
          hint: 'Revisit the solubility curve graph in node c9_chem_ch1_3 and practice "mass of crystals.',
          misconception: 'Students think crystallisation is just "evaporation to dryness" and that the solid obtained is automatically pure.',
          parts: [
                { id: 'a', prompt: 'A student has 50 g of impure potassium nitrate (KNO₃) contaminated with 5 g sand and 2 g soluble impurity (NaCl).', answer: 'Step 1: At 60°C, 100 g water dissolves 100 g KNO₃ (saturated)',
                  options: ['Step 1: At 60°C, 100 g water dissolves 100 g KNO₃ (saturated)', 'evaporation to dryness'],
                  hint: 'Revisit the solubility curve graph in node c9_chem_ch1_3 and practice "mass of crystals = mass.',
                  misconception: 'Students think crystallisation is just "evaporation to dryness" and that the solid obtained is automatically pure.' }
          ],
            remediations: { 'crystallisation-is-just-evaporation-to': { steps: ['If a student cannot distinguish crystallisation from evaporation, do this: Take two beakers with saturated copper.', 'Beaker A: boil to dryness – observe dark blue solid.', 'Beaker B: cool slowly – observe pure blue crystals, mother liquor coloured.', 'Then have student write the solubility argument: "At 20°C, CuSO₄ solubility = 20 g/100 mL, FeSO₄ = 25 g/100 mL,.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
