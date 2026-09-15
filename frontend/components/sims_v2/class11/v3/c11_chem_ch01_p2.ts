import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch01_p2: SimDef = {
    id: 'v3_c11_chem_ch01_p2',
    title: 'Some Basic Concepts of Chemistry · Part 2/3',
    subtitle: 'See why chemistry is called the central science, and why a sealed system never loses mass.',
    classLevel: 11, subject: 'chemistry', topic: 'Some Basic Concepts of Chemistry · Part 2/3',
    chapters: ['c11_chem_ch01'],
    nodeIds: ['c11_chem_cbse_01_007', 'c11_chem_cbse_01_008', 'c11_chem_cbse_01_009', 'c11_chem_cbse_01_010', 'c11_chem_cbse_01_011', 'c11_chem_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials analyst tracing the chemistry hidden in everyday objects', intro: 'A shopkeeper swears rusting, ripening and burning are \'just things that happen.\' You\'re here to show the molecular machinery underneath.', goal: 'Recognise chemistry\'s reach across daily life and apply conservation of mass to closed systems.' },
    discovery: {
        question: 'A dozen eggs, a mole of atoms — why do chemists bother with the mole at all?',
        options: ['Atoms are too small to count — the mole groups them by mass', 'It measures atomic weight directly', 'It is a unit of volume for gases', 'It counts electrons in a shell'],
        answer: 'Atoms are too small to count — the mole groups them by mass',
        hook: '6.022 × 10²³ is not magic — it is the conversion factor between grams and particles.',
    },
    teaching: [
        { title: 'Mole Concept: Avogadro\'s Number', text: 'The mole (symbol: mol) is the SI base unit for amount of substance, defined as exactly 6.02214076 × 10²³ elementary entities (atoms, molecules, ions, electrons, or other specified particles).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_01_007', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Run a chemical audit of a schoolbag — name the designed molecule behind everyday items — then verify mass conservation in a sealed reaction.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_007', title: 'Mole Concept: Avogadro\'s Number',
          scaffold: { problem: 'A laboratory sample contains 4.50 g of glucose (C₆H₁₂O₆), the sugar produced during photosynthesis in plants.',
            steps: [
            { text: 'Calculate molecular mass of glucose: 6×12.01 + 12×1.008 + 6×16.00 = 72.06 + 12.096 + 96.00 = 180.156 u.' },
            { text: 'Calculate amount in moles: n = m/M = 4.50 g / 180.156 g mol⁻¹ = 0.02498 mol ≈ 0.0250 mol (3 significant figures).' },
            { text: 'Calculate number of molecules: N = n × Nₐ = 0.02498 mol × 6.022 × 10²³ mol⁻¹ = 1.504 × 10²² molecules.' },
            { text: 'Calculate number of carbon atoms: Each glucose molecule has 6 C atoms.' },
            { text: 'Verify: 0.0250 mol × 180 g mol⁻¹ ≈ 4.5 g ✓. Orders of magnitude: 10⁻² mol × 10²³ = 10²¹ molecules ✓.', faded: true, blankAnswer: '(a) 0.0250 mol (b) 1.50 × 10²² molecules (c) 9.02 × 10²².' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_008', title: 'Molar Mass and Calculations',
          scaffold: { problem: 'A laboratory preparation requires 0.250 mol of pure benzoic acid (C₇H₆O₂). What mass of benzoic acid should be weighed out?',
            steps: [
            { text: 'Identify the given amount (0.250 mol) and the required quantity (mass in grams).' },
            { text: 'Write the molecular formula C₇H₆O₂ and calculate its molar mass: 7(12.01) + 6(1.008) + 2(16.00) = 84.07 + 6.048 + 32.00.' },
            { text: 'Select the formula linking mass, moles, and molar mass: m = n × M.' },
            { text: 'Substitute values: m = 0.250 mol × 122.12 g mol⁻¹ = 30.53 g.' },
            { text: 'Consider significant figures: 0.250 has 3 sig figs, molar mass has 5, so answer rounded to 3 sig figs = 30.5 g.' },
            { text: 'Interpret: Weigh 30.5 g of benzoic acid on an analytical balance to obtain 0.250 mol.', faded: true, blankAnswer: '30.5 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_009', title: 'Percentage Composition of Compounds',
          scaffold: { problem: 'Calculate the percentage composition of nitrogen in ammonium nitrate (NH₄NO₃), a common fertilizer.',
            steps: [
            { text: 'Identify the formula NH₄NO₃ and count atoms: 2 N, 4 H, 3 O.' },
            { text: 'Calculate molar mass: M = 2(14.01) + 4(1.008) + 3(16.00) = 28.02 + 4.032 + 48.00 = 80.052 g/mol.' },
            { text: 'Calculate total mass of nitrogen per formula unit: 2 × 14.01 = 28.02 g/mol.' },
            { text: 'Apply percentage formula: %N = (28.02 / 80.052) × 100 = 35.00%.' },
            { text: 'For 50 kg bag: mass of N = 35.00% of 50 kg = 17.5 kg nitrogen.' },
            { text: 'Verify: %H = (4.032/80.052)×100 = 5.04%; %O = (48.00/80.052)×100 = 59.96%; Sum = 35.00+5.04+59.96 = 100.00% ✓', faded: true, blankAnswer: '%N = 35.00%; 50 kg bag contains 17.5 kg nitrogen.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_010', title: 'Empirical and Molecular Formula: Determination',
          scaffold: { problem: 'A sample of a compound used in traditional Indian ink (iron gallate) contains 19.5% Fe, 30.2% C, 3.5% H, and 46.8% O by mass.',
            steps: [
            { text: 'Assume 100 g sample → masses: Fe = 19.5 g, C = 30.2 g, H = 3.5 g, O = 46.8 g.' },
            { text: 'Convert to moles using atomic masses (Fe=55.85, C=12.01, H=1.008, O=16.00): n(Fe)=19.5/55.85=0.349 mol.' },
            { text: 'Divide each by smallest mole value (0.349): Fe=1.00, C=7.19, H=9.94, O=8.38.' },
            { text: 'Approximate to nearest whole numbers: Fe=1, C=7, H=10, O=8 → Empirical formula = FeC₇H₁₀O₈.' },
            { text: 'Empirical formula mass = 55.85 + 7×12.01 + 10×1.008 + 8×16.00 = 217.9 g mol⁻¹.' },
            { text: 'n = 436 / 217.9 ≈ 2.00 → Molecular formula = (FeC₇H₁₀O₈)₂ = Fe₂C₁₄H₂₀O₁₆.', faded: true, blankAnswer: 'Empirical formula = FeC₇H₁₀O₈; Molecular formula.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_011', title: 'Stoichiometry: Balanced Chemical Equations',
          scaffold: { problem: 'In the thermite reaction used for welding railway tracks in India, aluminium reduces iron(III) oxide: Fe₂O₃(s) + Al(s) → Al₂O₃(s) + Fe(l).',
            steps: [
            { text: 'Balance the equation. Fe: 2 on left → 2Fe on right. O: 3 on left → Al₂O₃ has 3 O. Al: 2 on right → 2Al on left.' },
            { text: 'Convert given masses to moles. Moles Fe₂O₃ = 1000 g / 159.7 g/mol = 6.26 mol. Moles Al = 500 g / 27.0 g/mol = 18.5 mol.' },
            { text: 'Determine limiting reagent using stoichiometric ratios. Required Al for 6.26 mol Fe₂O₃ = 6.26 × 2 = 12.5 mol.' },
            { text: 'Calculate product moles from limiting reagent. Mole ratio Fe₂O₃:Fe = 1:2 → moles Fe = 6.26 × 2 = 12.5 mol.' },
            { text: 'Convert product moles to mass. Mass Fe = 12.5 mol × 55.8 g/mol = 697.5 g ≈ 698 g.', faded: true, blankAnswer: 'Limiting reagent = Fe₂O₃; Mass of Fe produced = 698 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_012', title: 'Limiting Reagent: Concept and Calculation',
          scaffold: { problem: 'In the Haber process for ammonia synthesis, N₂(g) + 3H₂(g) → 2NH₃(g), a reactor is charged with 50.0 kg of dinitrogen and 10.0 kg.',
            steps: [
            { text: 'Convert given masses to moles. Moles N₂ = 50,000 g / 28.0 g/mol = 1785.7 mol.' },
            { text: 'Calculate stoichiometric equivalents (moles ÷ coefficient). For N₂: 1785.7 / 1 = 1785.7. For H₂: 5000 / 3 = 1666.7.' },
            { text: 'Compare equivalents. H₂ (1666.7) < N₂ (1785.7), so H₂ is the limiting reagent.' },
            { text: 'Calculate theoretical yield of NH₃ from limiting reagent. Moles NH₃ = moles H₂ × (2/3) = 5000 × (2/3) = 3333.3 mol.' },
            { text: 'Calculate excess N₂ consumed and remaining. Moles N₂ consumed = moles H₂ × (1/3) = 5000/3 = 1666.7 mol.' },
            { text: 'Verify mass balance. Total reactant mass = 60,000 g. Total product + excess = 56,666 + 3,333 = 59,999 g ≈ 60,000.', faded: true, blankAnswer: '(i) Limiting reagent: H₂ (dihydrogen). (ii) Mass of NH₃.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A wellness stall at your school fair sells \'100% chemical-free\' fruit juice and \'all-natural\' detergent. A classmate wants to buy the juice, saying: \'At least this one has no chemicals — chemistry is lab stuff, I don\'t want it in my food.\'',
            decisions: [{ prompt: 'What\'s wrong with the \'chemical-free\' claim?', options: [
                { text: 'Everything is chemistry — the juice is water, sugars, vitamins, acids; \'natural\' vitamin C and lab-made vitamin C are the same molecule. The label confuses \'chemical\' (everything made of atoms) with \'synthetic additive\'. Chemistry isn\'t confined to labs: the juice\'s preservation, the detergent\'s surfactants, even your saliva are molecular processes.', outcome: 'Chemistry is the study of matter\'s composition and transformations — you can\'t buy your way out of it; \'chemical-free\' would mean a vacuum.' },
                { text: 'The label is honest — natural juice has no chemicals because chemicals are artificial substances made in labs.', outcome: 'That splits the world into \'natural = safe\' and \'chemical = artificial\'; glucose from an orange and glucose synthesised in a factory are identical molecules.', reveals: 'natural-means-chemical-free' },
                { text: 'It means \'free of harmful chemicals\' — so the claim is scientifically fine, just informal.', outcome: 'Even read charitably, \'harmful\' depends on dose and identity, not origin — the claim still trades on a meaningless word; every ingredient in the bottle is a chemical.', reveals: 'chemical-free-means-safe' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Chemistry doesn\'t just explain matter, it designs it — and its first law is that nothing is ever truly lost.',
            decisions: [{ prompt: 'What comes next? Some Basic Concepts of Chemistry · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Some Basic Concepts of Chemistry · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_007', difficulty: 'standard',
          question: 'The mole (symbol: mol) is the SI base unit for amount of substance, defined.',
          hint: 'Revisit c11_chem_cbse_01_006 (Atomic and Molecular Mass) and practice calculating.',
          misconception: 'Students consistently write "1 mole of NaCl = 6.022 × 10²³ molecules of NaCl" because they overgeneralize the term.',
          parts: [
                { id: 'a', prompt: 'Calculate the number of oxygen atoms present in 0.50 mol of ozone (O₃). Show all steps including the use of Avogadro\'s number.', answer: 'Step 1: 1 mol O₃ contains Nₐ molecules = 6.022 × 10²³ molecules',
                  options: ['Step 1: 1 mol O₃ contains Nₐ molecules = 6.022 × 10²³ molecules', 'formula unit', 'molecules', 'formula units'],
                  hint: 'Revisit c11_chem_cbse_01_006 (Atomic and Molecular Mass) and practice calculating molecular/formula.',
                  misconception: 'Students consistently write "1 mole of NaCl = 6.022 × 10²³ molecules of NaCl" because they overgeneralize the term "molecule" to all.' },
                { id: 'b', prompt: 'Compare: Sample A contains 1.0 mol of O₂ molecules. Sample B contains 1.0 mol of O atoms. Which sample has greater mass?', answer: 'Sample A mass = 1.0 mol × 32.00 g mol⁻¹ = 32.00 g',
                  options: ['Sample A mass = 1.0 mol × 32.00 g mol⁻¹ = 32.00 g', 'both have same number of oxygen atoms', 'mole of substance', 'mole of atoms'],
                  hint: 'Revisit c11_chem_cbse_01_006 (Atomic and Molecular Mass) and practice calculating molecular/formula.',
                  misconception: 'Students consistently write "1 mole of NaCl = 6.022 × 10²³ molecules of NaCl" because they overgeneralize the term "molecule" to all.' }
          ],
            remediations: { 'students-consistently-write-1-mole': { steps: ['If a student writes "molecules of NaCl," immediately have them: (1) Draw the NaCl crystal lattice from NCERT Fig.', '1.10 showing alternating Na⁺ and Cl⁻ ions.', '(2) Point to one Na⁺ and ask "which Cl⁻ is its partner?" — they cannot answer because each Na⁺ is surrounded by 6 Cl⁻.', '(3) Write "formula unit" on the board and define it as "the simplest ratio of ions in the lattice (NaCl)." (4) Re-do.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write "1 mole of NaCl = 6.022 × 10²³ molecules of NaCl" because they overgeneralize the term.',
          parts: [
                { id: 'a', prompt: 'A student writes: "1 mole of NaCl contains 6.022 × 10²³ molecules of NaCl." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'formula unit', 'molecules', 'formula units'],
                  hint: 'Revisit c11_chem_cbse_01_006 (Atomic and Molecular Mass) and practice calculating molecular/formula.',
                  misconception: 'Students consistently write "1 mole of NaCl = 6.022 × 10²³ molecules of NaCl" because they overgeneralize the term "molecule" to all.' },
                { id: 'b', prompt: 'Design a thought experiment to determine Avogadro\'s number experimentally using only the fact that 12 g of carbon-12 contains exactly 1 mole of atoms, and the.', answer: 'Step 1: Mass of 1 mole of ¹²C = 12 g (by definition)',
                  options: ['Step 1: Mass of 1 mole of ¹²C = 12 g (by definition)', 'formula unit', 'molecules', 'formula units'],
                  hint: 'Revisit c11_chem_cbse_01_006 (Atomic and Molecular Mass) and practice calculating molecular/formula.',
                  misconception: 'Students consistently write "1 mole of NaCl = 6.022 × 10²³ molecules of NaCl" because they overgeneralize the term "molecule" to all.' }
          ],
            remediations: { 'students-consistently-write-1-mole': { steps: ['If a student writes "molecules of NaCl," immediately have them: (1) Draw the NaCl crystal lattice from NCERT Fig.', '1.10 showing alternating Na⁺ and Cl⁻ ions.', '(2) Point to one Na⁺ and ask "which Cl⁻ is its partner?" — they cannot answer because each Na⁺ is surrounded by 6 Cl⁻.', '(3) Write "formula unit" on the board and define it as "the simplest ratio of ions in the lattice (NaCl)." (4) Re-do.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_008', difficulty: 'standard',
          question: 'Molar mass is the mass of one mole of a substance (element or compound).',
          hint: 'Review the worked examples in node c11_chem_cbse_01_006 (Atomic and Molecular Mass) for.',
          misconception: 'Students often treat the molar mass of diatomic elements (H₂, N₂, O₂, Cl₂, Br₂, I₂) as the atomic mass of the single.',
          parts: [
                { id: 'a', prompt: 'Define molar mass and state its SI unit. How is it numerically related to the molecular mass of a substance?', answer: 'Molar mass is the mass of one mole of a substance expressed in g mol⁻¹',
                  options: ['Molar mass is the mass of one mole of a substance expressed in g mol⁻¹', 'molar mass of hydrogen', 'molar mass of hydrogen atoms', 'the unit as g or mol, or saying molar mass is the mass of one molecule'],
                  hint: 'Review the worked examples in node c11_chem_cbse_01_006 (Atomic and Molecular Mass) for formula.',
                  misconception: 'Students often treat the molar mass of diatomic elements (H₂, N₂, O₂, Cl₂, Br₂, I₂) as the atomic mass of the single atom (e.g., using.' },
                { id: 'b', prompt: 'Calculate the number of moles and the number of molecules in 4.50 g of glucose (C₆H₁₂O₆). (Atomic masses: C = 12.01 u, H = 1.008 u, O = 16.00 u)', answer: 'Step 1: Molar mass of glucose = 6(12.01) + 12(1.008) + 6(16.00) = 180.16 g mol⁻¹',
                  options: ['Step 1: Molar mass of glucose = 6(12.01) + 12(1.008) + 6(16.00) = 180.16 g mol⁻¹', 'molar mass of hydrogen', 'molar mass of hydrogen atoms'],
                  hint: 'Review the worked examples in node c11_chem_cbse_01_006 (Atomic and Molecular Mass) for formula.',
                  misconception: 'Students often treat the molar mass of diatomic elements (H₂, N₂, O₂, Cl₂, Br₂, I₂) as the atomic mass of the single atom (e.g., using.' },
                { id: 'c', prompt: 'A student measures 2.00 g of hydrogen gas (H₂) and 32.0 g of oxygen gas (O₂).', answer: 'Moles of H₂ = 2.00 g / 2.016 g mol⁻¹ = 0.992 mol',
                  options: ['Moles of H₂ = 2.00 g / 2.016 g mol⁻¹ = 0.992 mol', 'molar mass of hydrogen', 'molar mass of hydrogen atoms', 'hydrogen has more atoms'],
                  hint: 'Review the worked examples in node c11_chem_cbse_01_006 (Atomic and Molecular Mass) for formula.',
                  misconception: 'Students often treat the molar mass of diatomic elements (H₂, N₂, O₂, Cl₂, Br₂, I₂) as the atomic mass of the single atom (e.g., using.' }
          ],
            remediations: { 'students-often-treat-the-molar': { steps: ['Write the chemical formula of the substance first (H₂, not H).', 'Multiply the atomic mass by that subscript to get the molar mass of the molecule.', 'Practice with a table: list element, atomic mass, molecular formula, molar mass.', 'Verify by checking that 1 mole of H₂ has mass 2.016 g and contains 2 × Nₐ atoms.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_009', difficulty: 'standard',
          question: 'Percentage composition of a compound is the mass percent of each constituent.',
          hint: 'Revisit c11_chem_cbse_01_008 worked examples on molar mass of Ca₃(PO₄)₂, Al₂(SO₄)₃.',
          misconception: 'Students calculate percentage composition using atomic numbers instead of atomic masses.',
          parts: [
                { id: 'a', prompt: 'Calculate the percentage composition of carbon in glucose (C₆H₁₂O₆) given atomic masses: C = 12.01 u, H = 1.008 u, O = 16.00 u.', answer: 'Correct answer: 40.00%',
                  options: ['Correct answer: 40.00%', 'number of atoms', 'mass of atoms'],
                  hint: 'Revisit c11_chem_cbse_01_008 worked examples on molar mass of Ca₃(PO₄)₂, Al₂(SO₄)₃, CuSO₄·5H₂O.',
                  misconception: 'Students calculate percentage composition using atomic numbers instead of atomic masses.' },
                { id: 'b', prompt: 'Two samples of a compound are analyzed. Sample A: 40.0% C, 6.7% H, 53.3% O. Sample B: 40.0% C, 6.7% H, 53.3% O. Both have molar mass 180 g/mol.', answer: 'Yes, they are the same compound',
                  options: ['Yes, they are the same compound', 'different compounds', 'number of atoms', 'mass of atoms'],
                  hint: 'Revisit c11_chem_cbse_01_008 worked examples on molar mass of Ca₃(PO₄)₂, Al₂(SO₄)₃, CuSO₄·5H₂O.',
                  misconception: 'Students calculate percentage composition using atomic numbers instead of atomic masses.' }
          ],
            remediations: { 'students-calculate-percentage-composition-using': { steps: ['Write the formula and circle each element symbol.', 'Below each, write its atomic mass from the periodic table (not atomic number!).', 'Multiply by subscript to get total mass per formula unit.', 'Sum for molar mass.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_010', difficulty: 'standard',
          question: 'The empirical formula of a compound represents the simplest whole-number ratio.',
          hint: 'If stuck, review the steps in c11_chem_cbse_01_009 (percentage composition to moles) and.',
          misconception: 'Students often think that the empirical formula mass and molar mass are the same, so they directly use the molar mass.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The empirical formula of a compound represents the simplest whole-number ratio of atoms',
                  options: ['The empirical formula of a compound represents the simplest whole-number ratio of atoms', 'Chemistry is the central science that studies the composition, structure, properties, and', 'The Law of Conservation of Mass states that in any isolated physical or chemical process,', 'The Law of Definite Proportions states that a given chemical compound always contains its'],
                  hint: 'If stuck, review the steps in c11_chem_cbse_01_009 (percentage composition to moles) and.',
                  misconception: 'Students often think that the empirical formula mass and molar mass are the same, so they directly use the molar mass to find subscripts.' }
          ],
            remediations: { 'the-empirical-formula-mass-and': { steps: ['If a student makes this error, have them work backwards: take a known molecular formula like C₆H₁₂O₆ (glucose).', 'Show that 180/30 = 6, and multiplying CH₂O by 6 gives C₆H₁₂O₆.', 'Then give them a new problem and insist they write the empirical formula step explicitly before calculating n.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_011', difficulty: 'standard',
          question: 'Stoichiometry is the quantitative study of reactants and products in a chemical.',
          hint: 'If stuck, revisit c11_chem_cbse_01_007 (Mole Concept) and c11_chem_cbse_01_008 (Molar.',
          misconception: 'Students treat stoichiometric coefficients as mass ratios instead of mole ratios.',
          parts: [
                { id: 'a', prompt: 'In the reaction N₂(g) + 3H₂(g) → 2NH₃(g), a student claims "1 gram of N₂ reacts with 3 grams of H₂".', answer: 'The coefficients represent mole ratios, not mass ratios',
                  options: ['The coefficients represent mole ratios, not mass ratios', 'balancing by inspection'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_007 (Mole Concept) and c11_chem_cbse_01_008 (Molar Mass.',
                  misconception: 'Students treat stoichiometric coefficients as mass ratios instead of mole ratios.' }
          ],
            remediations: { 'students-treat-stoichiometric-coefficients-as': { steps: ['Revisit c11_chem_cbse_01_007 (Mole Concept) – practice converting given masses to moles using molar mass.', 'Revisit c11_chem_cbse_01_008 (Molar Mass Calculations) – ensure correct molar mass determination for each species.', 'Use a "mole ratio table" for every problem: write balanced equation → list given masses → convert to moles → divide.', 'Practice 5 problems daily where masses are given in non-stoichiometric ratios until the mole-conversion step becomes.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_012', difficulty: 'standard',
          question: 'The limiting reagent is the reactant that is completely consumed first in.',
          hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_008.',
          misconception: 'Students believe the reactant with the smaller *mass* is always the limiting reagent.',
          parts: [
                { id: 'a', prompt: 'In the reaction N₂(g) + 3H₂(g) → 2NH₃(g), if you start with 2 moles of N₂ and 4 moles of H₂, which reactant is the limiting reagent and why?', answer: 'H₂ is the limiting reagent',
                  options: ['H₂ is the limiting reagent', 'N₂ because it has fewer moles', 'the reactant with the smaller *mass* is always the limiting reagent'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_008 (molar mass.',
                  misconception: 'Students believe the reactant with the smaller *mass* is always the limiting reagent.' },
                { id: 'b', prompt: 'A student claims: "In any reaction, the reactant with the smaller mass in grams is always the limiting reagent." Explain why this statement is chemically.', answer: 'The statement is false',
                  options: ['The statement is false', 'the reactant with the smaller *mass* is always the limiting reagent'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_008 (molar mass.',
                  misconception: 'Students believe the reactant with the smaller *mass* is always the limiting reagent.' },
                { id: 'c', prompt: 'Calculate the mass of NH₃ produced when 28 g N₂ reacts with 6 g H₂ via N₂(g) + 3H₂(g) → 2NH₃(g).', answer: 'Steps: (1) Moles N₂ = 28/28 = 1 mol',
                  options: ['Steps: (1) Moles N₂ = 28/28 = 1 mol', 'the reactant with the smaller *mass* is always the limiting reagent'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_008 (molar mass.',
                  misconception: 'Students believe the reactant with the smaller *mass* is always the limiting reagent.' },
                { id: 'd', prompt: 'Two reaction mixtures are prepared for 2SO₂(g) + O₂(g) → 2SO₃(g): Mixture A: 4 mol SO₂, 3 mol O₂ Mixture B: 3 mol SO₂, 4 mol O₂ Without calculating exact.', answer: 'Mixture A: SO₂ equivalent = 4/2 = 2',
                  options: ['Mixture A: SO₂ equivalent = 4/2 = 2', 'the reactant with the smaller *mass* is always the limiting reagent'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_008 (molar mass.',
                  misconception: 'Students believe the reactant with the smaller *mass* is always the limiting reagent.' }
          ],
            remediations: { 'the-reactant-with-the-smaller': { steps: ['If the student makes this error: (1) Have them write the balanced equation and list molar masses.', '(2) Convert each given mass to moles explicitly (show division by molar mass).', '(3) Divide each mole value by its coefficient from the balanced equation.', '(4) Compare the quotients — the smallest is limiting.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
