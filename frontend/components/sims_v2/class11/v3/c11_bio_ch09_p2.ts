import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch09_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch09_p2: SimDef = {
    id: 'v3_c11_bio_ch09_p2',
    title: 'Biomolecules · Part 2/2',
    subtitle: 'One bond angle decides whether a glucose chain feeds you or builds a wall.',
    classLevel: 11, subject: 'biology', topic: 'Biomolecules · Part 2/2',
    chapters: ['c11_bio_ch09'],
    nodeIds: ['c11_bio_cbse_09_007', 'c11_bio_cbse_09_008', 'c11_bio_cbse_09_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biochemist identifying unknown samples in a food-testing lab', intro: 'Four unlabelled flasks, two reagents, one afternoon. Iodine spots helices; Benedict\'s spots free anomeric carbons. Combine them and nothing hides.', goal: 'Classify carbohydrates, explain reducing versus non-reducing behaviour via the anomeric carbon, and link glycosidic linkage geometry to biological role.' },
    discovery: {
        question: 'Starch and cellulose are both long chains of nothing but glucose — yet you digest chapati starch for energy while its cellulose bran exits untouched. The monomers are identical, so what single difference defeats your enzymes?',
        options: ['The glycosidic bond orientation — alpha links coil starch into a helix amylase can bite; beta links lock cellulose into straight, hydrogen-bonded fibres', 'Cellulose contains nitrogen that poisons digestive enzymes', 'Starch molecules are shorter than cellulose molecules', 'Cellulose is not actually a carbohydrate'],
        answer: 'The glycosidic bond orientation — alpha links coil starch into a helix amylase can bite; beta links lock cellulose into straight, hydrogen-bonded fibres',
        hook: 'Same glucose, different bond angle, opposite fate — in biomolecules, geometry is destiny.',
    },
    teaching: [
        { title: 'Metabolic Pathways: Glycolysis and Krebs Cycle', text: 'A metabolic pathway is a series of consecutive, enzyme-catalyzed biochemical reactions where the product of one reaction serves as the substrate for the next, transforming an initial metabolite into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_09_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Identify four mystery solutions using only iodine and Benedict\'s tests, then explain why glycogen\'s frantic branching serves sprinting animals better than starch\'s tidy helices serve patient plants.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_007', title: 'Metabolic Pathways: Glycolysis and Krebs Cycle',
          caseStudy: { intro: 'When you sprint up stairs and your leg muscles burn, that burning sensation comes from lactic acid accumulating because your muscle cells are running.',
            decisions: [{ prompt: 'Name the enzyme that catalyzes the committed step of glycolysis and state the allosteric activator and inhibitor that regulate this enzyme.', options: [
                { text: 'The committed step of glycolysis is catalyzed by phosphofructokinase-1 (PFK-1)', outcome: 'The committed step of glycolysis is catalyzed by phosphofructokinase-1 (PFK-1), which converts.' },
                { text: 'glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria', outcome: 'Not quite — Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria".', reveals: 'glycolysis-occurs-in-the-cytoplasm' },
                { text: 'hexokinase or pyruvate kinase', outcome: 'Not quite — Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria".', reveals: 'glycolysis-occurs-in-the-cytoplasm' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_008', title: 'The Living State and Metabolism',
          caseStudy: { intro: 'Observe a germinating moong bean sprout on your kitchen counter: it grows visibly each day without any external energy source except water, yet it maintains.',
            decisions: [{ prompt: 'Define metabolism and name its two subdivisions. Give one example of a pathway for each subdivision.', options: [
                { text: 'Metabolism is the sum of all enzyme-catalyzed chemical reactions in a living organism', outcome: 'Metabolism is the sum of all enzyme-catalyzed chemical reactions in a living organism.' },
                { text: 'metabolism is only digestion', outcome: 'Not quite — Students often believe "metabolism = catabolism = breaking down food for energy" and that ATP is.', reveals: 'metabolism-catabolism-breaking-down-food' },
                { text: 'metabolism is only breaking down food', outcome: 'Not quite — Students often believe "metabolism = catabolism = breaking down food for energy" and that ATP is.', reveals: 'metabolism-catabolism-breaking-down-food' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_009', title: 'Biomacromolecules vs Micromolecules',
          caseStudy: { intro: 'Imagine grinding a fresh spinach leaf in trichloroacetic acid — you get a green slurry that separates into a clear green filtrate and a fibrous residue.',
            decisions: [{ prompt: 'A student performs acid extraction on yeast cells and obtains an acid-soluble fraction containing compounds with molecular weights between.', options: [
                { text: 'Correct answer: (c) glycogen', outcome: 'Correct answer: (c) glycogen. Glycogen is a polysaccharide with molecular weight >10,000 Da, so.' },
                { text: 'carbohydrate', outcome: 'Not quite — Students believe "macromolecule = polymer" and "micromolecule = monomer" as absolute definitions.', reveals: 'macromolecule-polymer-and-micromolecule-monomer' },
                { text: 'macromolecule', outcome: 'Not quite — Students believe "macromolecule = polymer" and "micromolecule = monomer" as absolute definitions.', reveals: 'macromolecule-polymer-and-micromolecule-monomer' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Biomolecules · Part 2/2', spots: [
            { id: 's1', label: 'Metabolic Pathways Glycolysis and Krebs Cycle', prompt: 'Which idea is this? — A metabolic pathway is a series of consecutive, enzyme-catalyzed biochemical reactions.', answer: 'Metabolic Pathways Glycolysis and Krebs Cycle', options: ['Metabolic Pathways Glycolysis and Krebs Cycle', 'The Living State and Metabolism', 'Biomacromolecules vs Micromolecules'] },
            { id: 's2', label: 'The Living State and Metabolism', prompt: 'Which idea is this? — The living state is a non-equilibrium steady state characterized by constant metabolic.', answer: 'The Living State and Metabolism', options: ['The Living State and Metabolism', 'Metabolic Pathways Glycolysis and Krebs Cycle', 'Biomacromolecules vs Micromolecules'] },
            { id: 's3', label: 'Biomacromolecules vs Micromolecules', prompt: 'Which idea is this? — Biomacromolecules are high molecular weight (>10,000 Da) organic polymers (proteins.', answer: 'Biomacromolecules vs Micromolecules', options: ['Biomacromolecules vs Micromolecules', 'Metabolic Pathways Glycolysis and Krebs Cycle', 'The Living State and Metabolism'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In the chemistry lab you\'re testing food extracts with Benedict\'s reagent for the science fair. A teammate predicts: \'Glucose and starch are both just glucose units, so both will give a strong brick-red precipitate; and once glucose is locked in a polymer, every anomeric carbon is consumed — no reducing ends remain.\'',
            decisions: [{ prompt: 'What will the test tubes actually show?', options: [
                { text: 'Glucose gives a strong positive. Starch/glycogen are only weakly reducing: every chain still carries ONE free anomeric carbon (the reducing end) — branching adds non-reducing ends but never removes the original. So polysaccharides can give a feeble positive, and after partial hydrolysis the signal strengthens as new reducing ends are generated.', outcome: 'Polymerisation doesn\'t consume all anomeric carbons; one reducing end per chain persists, which is why \'all polysaccharides are non-reducing\' is wrong.' },
                { text: 'Starch will match glucose\'s strong positive — identical monomers mean identical chemistry.', outcome: 'Most anomeric carbons are locked in glycosidic bonds; only one reducing end per chain survives, so starch\'s Benedict\'s signal is feeble, not strong.', reveals: 'same-monomer-same-reaction' },
                { text: 'Polysaccharides are always non-reducing — polymerisation consumes every anomeric carbon in the chain.', outcome: 'Each chain keeps one free reducing end; α-1,6 branches create extra non-reducing ends but can\'t eliminate the original one.', reveals: 'polymers-have-no-reducing-end' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_009', title: 'You made it',
          caseStudy: { intro: 'You read a carbohydrate\'s bond type and predicted its job — alpha for compact energy stores, beta for structural fibre. Structure-to-function in one step.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_007', difficulty: 'standard',
          question: 'A metabolic pathway is a series of consecutive, enzyme-catalyzed biochemical.',
          hint: 'If stuck, revisit c11_bio_cbse_09_005 (enzyme mechanism) for catalytic cycle logic.',
          misconception: 'Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria" is merely a location fact.',
          parts: [
                { id: 'a', prompt: 'Name the enzyme that catalyzes the committed step of glycolysis and state the allosteric activator and inhibitor that regulate this enzyme in mammalian liver.', answer: 'The committed step of glycolysis is catalyzed by phosphofructokinase-1 (PFK-1)',
                  options: ['The committed step of glycolysis is catalyzed by phosphofructokinase-1 (PFK-1)', 'glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria', 'hexokinase or pyruvate kinase'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (enzyme mechanism) for catalytic cycle logic.',
                  misconception: 'Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria" is merely a location fact, but they miss the.' },
                { id: 'b', prompt: 'Explain why glycolysis is described as having an "energy investment phase" and an "energy payoff phase," and calculate the net ATP yield per glucose molecule.', answer: 'The investment phase (steps 1–5) consumes 2 ATP to phosphorylate glucose and',
                  options: ['The investment phase (steps 1–5) consumes 2 ATP to phosphorylate glucose and', '4 ATP net', '38 ATP', 'glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (enzyme mechanism) for catalytic cycle logic.',
                  misconception: 'Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria" is merely a location fact, but they miss the.' },
                { id: 'c', prompt: 'A patient with a genetic deficiency in pyruvate dehydrogenase complex (PDC) is given a glucose load.', answer: 'With PDC deficient, pyruvate cannot enter mitochondria as acetyl-CoA',
                  options: ['With PDC deficient, pyruvate cannot enter mitochondria as acetyl-CoA', 'pyruvate enters Krebs cycle anyway', 'glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (enzyme mechanism) for catalytic cycle logic.',
                  misconception: 'Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria" is merely a location fact, but they miss the.' }
          ],
            remediations: { 'glycolysis-occurs-in-the-cytoplasm': { steps: ['Draw two side-by-side diagrams — one showing glycolysis in cytosol producing NADH, another showing mitochondrial matrix.', 'Explicitly draw the inner mitochondrial membrane as a barrier with "NADH impermeable" label.', 'Add the two shuttle systems as "ferry boats" — malate-aspartate (carries electrons in, yields 2.5 ATP) and.', 'Recalculate total ATP for liver vs muscle using a table.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria" is merely a location fact.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Krebs cycle produces 2 ATP per glucose molecule." Is this correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'per turn', 'per glucose', 'correct, 2 ATP'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (enzyme mechanism) for catalytic cycle logic.',
                  misconception: 'Students believe that "glycolysis occurs in the cytoplasm and Krebs cycle in mitochondria" is merely a location fact, but they miss the.' }
          ],
            remediations: { 'glycolysis-occurs-in-the-cytoplasm': { steps: ['Draw two side-by-side diagrams — one showing glycolysis in cytosol producing NADH, another showing mitochondrial matrix.', 'Explicitly draw the inner mitochondrial membrane as a barrier with "NADH impermeable" label.', 'Add the two shuttle systems as "ferry boats" — malate-aspartate (carries electrons in, yields 2.5 ATP) and.', 'Recalculate total ATP for liver vs muscle using a table.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_008', difficulty: 'standard',
          question: 'The living state is a non-equilibrium steady state characterized by constant.',
          hint: 'If stuck, review Class 10 respiration (c10_bio_cbse_01_007) for the overall glucose.',
          misconception: 'Students often believe "metabolism = catabolism = breaking down food for energy" and that ATP is a long-term energy.',
          parts: [
                { id: 'a', prompt: 'A student claims: "A living cell at steady state is at thermodynamic equilibrium because its internal concentrations remain constant." Explain why this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'steady state means equilibrium', 'metabolism = catabolism = breaking down food for energy'],
                  hint: 'If stuck, review Class 10 respiration (c10_bio_cbse_01_007) for the overall glucose oxidation.',
                  misconception: 'Students often believe "metabolism = catabolism = breaking down food for energy" and that ATP is a long-term energy storage molecule like.' },
                { id: 'b', prompt: 'Cyanide inhibits cytochrome c oxidase (Complex IV) in the mitochondrial electron transport chain.', answer: 'ATP synthesis via oxidative phosphorylation, (',
                  options: ['ATP synthesis via oxidative phosphorylation, (', 'glycolysis stops', 'metabolism = catabolism = breaking down food for energy'],
                  hint: 'If stuck, review Class 10 respiration (c10_bio_cbse_01_007) for the overall glucose oxidation.',
                  misconception: 'Students often believe "metabolism = catabolism = breaking down food for energy" and that ATP is a long-term energy storage molecule like.' },
                { id: 'c', prompt: 'Compare and contrast the metabolic state of a dormant wheat seed (12% moisture) and a 3-day-old wheat seedling.', answer: '(i) Dormant seed: near equilibrium (minimal flux, low entropy production)',
                  options: ['(i) Dormant seed: near equilibrium (minimal flux, low entropy production)', 'both are alive so both are far from equilibrium', 'metabolism = catabolism = breaking down food for energy'],
                  hint: 'If stuck, review Class 10 respiration (c10_bio_cbse_01_007) for the overall glucose oxidation.',
                  misconception: 'Students often believe "metabolism = catabolism = breaking down food for energy" and that ATP is a long-term energy storage molecule like.' }
          ],
            remediations: { 'metabolism-catabolism-breaking-down-food': { steps: ['**Revisit thermodynamics**: Review Class 11 Chemistry (c11_chemistry_ch6_1) — Gibbs free energy, ΔG = ΔG°\' + RT ln(Q).', '**Analogy**: Use a water tank with inflow (catabolism) and outflow (anabolism) at equal rates — water level constant.', 'Contrast with a sealed tank at equilibrium (no flow).', '**ATP turnover calculation**: Compute how many seconds the cellular ATP pool (5 mM × 1 pL/cell ≈ 3×10⁹ molecules) lasts.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_009', difficulty: 'standard',
          question: 'Biomacromolecules are high molecular weight (>10,000 Da) organic polymers.',
          hint: 'If confused about why lipids are in the macromolecular fraction, revisit c9_bio_ch1_3.',
          misconception: 'Students believe "macromolecule = polymer" and "micromolecule = monomer" as absolute definitions.',
          parts: [
                { id: 'a', prompt: 'A student performs acid extraction on yeast cells and obtains an acid-soluble fraction containing compounds with molecular weights between 18–800 Da.', answer: 'Correct answer: (c) glycogen',
                  options: ['Correct answer: (c) glycogen', 'carbohydrate', 'macromolecule', 'macromolecule = polymer'],
                  hint: 'If confused about why lipids are in the macromolecular fraction, revisit c9_bio_ch1_3 (cell.',
                  misconception: 'Students believe "macromolecule = polymer" and "micromolecule = monomer" as absolute definitions.' },
                { id: 'b', prompt: 'A researcher isolates a compound from a plant extract that tests positive for nitrogen and phosphorus, has a molecular weight of 320 Da, and is soluble in the.', answer: 'Macromolecule class: Nucleic acid (DNA or RNA)',
                  options: ['Macromolecule class: Nucleic acid (DNA or RNA)', 'macromolecule = polymer', 'micromolecule = monomer', '"macromolecule = polymer" and "micromolecule = monomer" as absolute definitions'],
                  hint: 'If confused about why lipids are in the macromolecular fraction, revisit c9_bio_ch1_3 (cell.',
                  misconception: 'Students believe "macromolecule = polymer" and "micromolecule = monomer" as absolute definitions.' }
          ],
            remediations: { 'macromolecule-polymer-and-micromolecule-monomer': { steps: ['Remediation: Have the student simulate the TCA extraction conceptually with a flowchart.', 'Start: "Take tissue → grind in TCA → filter." Branch 1: Filtrate contents (list examples with MW).', 'Branch 2: Pellet contents (list examples with MW).', 'Highlight lipids on pellet branch with annotation: "membrane vesicles → physically large → trapped." Then give 5 test.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
