import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch01_p1: SimDef = {
    id: 'v3_c11_chem_ch01_p1',
    title: 'Some Basic Concepts of Chemistry · Part 1/3',
    subtitle: 'See why chemistry is called the central science, and why a sealed system never loses mass.',
    classLevel: 11, subject: 'chemistry', topic: 'Some Basic Concepts of Chemistry · Part 1/3',
    chapters: ['c11_chem_ch01'],
    nodeIds: ['c11_chem_cbse_01_001', 'c11_chem_cbse_01_002', 'c11_chem_cbse_01_003', 'c11_chem_cbse_01_004', 'c11_chem_cbse_01_005', 'c11_chem_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials analyst tracing the chemistry hidden in everyday objects', intro: 'A shopkeeper swears rusting, ripening and burning are \'just things that happen.\' You\'re here to show the molecular machinery underneath.', goal: 'Recognise chemistry\'s reach across daily life and apply conservation of mass to closed systems.' },
    discovery: {
        question: 'A dozen eggs, a mole of atoms — why do chemists bother with the mole at all?',
        options: ['Atoms are too small to count — the mole groups them by mass', 'It measures atomic weight directly', 'It is a unit of volume for gases', 'It counts electrons in a shell'],
        answer: 'Atoms are too small to count — the mole groups them by mass',
        hook: '6.022 × 10²³ is not magic — it is the conversion factor between grams and particles.',
    },
    teaching: [
        { title: 'Importance of Chemistry: Scope and Applications', text: 'Chemistry is the central science that studies the composition, structure, properties, and transformations of matter at the atomic and molecular level, enabling the design of substances with specific.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_01_001', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Run a chemical audit of a schoolbag — name the designed molecule behind everyday items — then verify mass conservation in a sealed reaction.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_001', title: 'Importance of Chemistry: Scope and Applications',
          caseStudy: { intro: 'Observe a strip of iron rusting on a gate during monsoon, a packet of urea fertilizer in a farm, and a blister pack of paracetamol in a medicine cabinet — all.',
            decisions: [{ prompt: 'State the definition of chemistry as given in the NCERT Class 11 textbook and name the two historical quests that drove early chemical.', options: [
                { text: 'Chemistry is the branch of science that studies the preparation, properties, structure,', outcome: 'Chemistry is the branch of science that studies the preparation, properties, structure, and.' },
                { text: 'chemistry studies only elements', outcome: 'Not quite — Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations.', reveals: 'chemistry-s-relevance-is-limited' },
                { text: 'alchemy sought only gold', outcome: 'Not quite — Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations.', reveals: 'chemistry-s-relevance-is-limited' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_002', title: 'Laws of Chemical Combination: Conservation of Mass',
          scaffold: { problem: 'A 5.00 g sample of impure limestone (CaCO₃ with inert SiO₂) is heated strongly in an open crucible until constant mass.',
            steps: [
            { text: 'Identify the reaction: CaCO₃(s) → CaO(s) + CO₂(g). SiO₂ is inert, unchanged.' },
            { text: 'The mass loss (5.00 − 3.20 = 1.80 g) equals mass of CO₂ evolved (only gaseous product).' },
            { text: 'Moles of CO₂ = 1.80 g / 44.0 g mol⁻¹ = 0.0409 mol.' },
            { text: 'Stoichiometry: 1 mol CaCO₃ produces 1 mol CO₂ → moles of pure CaCO₃ = 0.0409 mol.' },
            { text: 'Mass of pure CaCO₃ = 0.0409 mol × 100.0 g mol⁻¹ = 4.09 g.' },
            { text: 'Percentage purity = (4.09 g / 5.00 g) × 100% = 81.8%.', faded: true, blankAnswer: '81.8% pure CaCO₃' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_003', title: 'Law of Definite Proportions and Multiple Proportions',
          scaffold: { problem: 'Two samples of cupric oxide (CuO) were prepared: Sample X by heating copper in oxygen, Sample Y by decomposing copper(II) nitrate.',
            steps: [
            { text: 'Calculate %Cu in Sample X = (1.99/2.50)×100 = 79.6%. %O = 100 - 79.6 = 20.4%.' },
            { text: 'Calculate %Cu in Sample Y = (3.02/3.80)×100 = 79.5%. %O = 20.5%.' },
            { text: 'Compare percentages: both samples give Cu ≈ 79.5-79.6%, O ≈ 20.4-20.5%.' },
            { text: 'Conclude that within experimental error, the composition is identical, verifying the law.' },
            { text: 'Note that the fixed mass ratio Cu:O = 79.5:20.5 ≈ 3.88:1, consistent with CuO (63.5:16 = 3.97:1).', faded: true, blankAnswer: 'Both samples contain 79.5-79.6% Cu and 20.4-20.5%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_004', title: 'Gay Lussac\'s Law and Avogadro\'s Law',
          scaffold: { problem: 'In a laboratory experiment, 500 mL of methane (CH₄) at STP is burnt completely in excess oxygen.',
            steps: [
            { text: 'Write the balanced chemical equation for combustion of methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l).' },
            { text: 'Identify the gas species and their stoichiometric coefficients: CH₄ : O₂ : CO₂ = 1 : 2 : 1.' },
            { text: 'Given volume of CH₄ = 500 mL at STP. Since all gases measured at STP (same T, P), apply volume ratio directly: Volume.' },
            { text: 'Verify using mole concept as cross-check: Moles CH₄ = 0.500 L / 22.4 L/mol = 0.02232 mol.' },
            { text: 'State final answer with units and conditions: At STP, CO₂ produced = 500 mL, O₂ consumed = 1000 mL (1.0 L).', faded: true, blankAnswer: 'CO₂ produced = 500 mL (0.5 L) at STP; O₂ consumed = 1000.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_005', title: 'Dalton\'s Atomic Theory',
          caseStudy: { intro: 'Observe a simple reaction: when you burn magnesium ribbon in air, it forms a white ash (magnesium oxide) and the mass increases.',
            decisions: [{ prompt: 'State the four postulates of Dalton\'s Atomic Theory as originally proposed in 1808.', options: [
                { text: 'The four postulates are: (1) Matter consists of indivisible atoms', outcome: 'The four postulates are: (1) Matter consists of indivisible atoms.' },
                { text: 'identical atoms of same element', outcome: 'Not quite — Students confuse Dalton\'s "identical atoms of same element" postulate with the modern concept.', reveals: 'students-confuse-dalton-s-identical' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_006', title: 'Atomic and Molecular Mass: Definition',
          scaffold: { problem: 'Naturally occurring magnesium has three isotopes: ²⁴Mg (78.99%, 23.985 u), ²⁵Mg (10.00%, 24.986 u), ²⁶Mg (11.01%, 25.983 u).',
            steps: [
            { text: 'Convert percentage abundances to fractional abundances by dividing each by 100: ²⁴Mg = 0.7899, ²⁵Mg = 0.1000, ²⁶Mg.' },
            { text: 'Multiply each isotopic mass by its fractional abundance: ²⁴Mg contribution = 0.7899 × 23.985 u = 18.945 u; ²⁵Mg.' },
            { text: 'Sum the contributions: 18.945 u + 2.499 u + 2.861 u = 24.305 u.' },
            { text: 'Check significant figures: isotopic masses given to 5 significant figures, abundances to 4 significant figures → report.' },
            { text: 'Verify against periodic table: standard value is 24.305 u — exact match confirms calculation.' },
            { text: 'Interpret: The average (24.305 u) is closest to ²⁴Mg (23.985 u) because ²⁴Mg dominates at 78.99% abundance.', faded: true, blankAnswer: '24.305 u' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A wellness stall at your school fair sells \'100% chemical-free\' fruit juice and \'all-natural\' detergent. A classmate wants to buy the juice, saying: \'At least this one has no chemicals — chemistry is lab stuff, I don\'t want it in my food.\'',
            decisions: [{ prompt: 'What\'s wrong with the \'chemical-free\' claim?', options: [
                { text: 'Everything is chemistry — the juice is water, sugars, vitamins, acids; \'natural\' vitamin C and lab-made vitamin C are the same molecule. The label confuses \'chemical\' (everything made of atoms) with \'synthetic additive\'. Chemistry isn\'t confined to labs: the juice\'s preservation, the detergent\'s surfactants, even your saliva are molecular processes.', outcome: 'Chemistry is the study of matter\'s composition and transformations — you can\'t buy your way out of it; \'chemical-free\' would mean a vacuum.' },
                { text: 'The label is honest — natural juice has no chemicals because chemicals are artificial substances made in labs.', outcome: 'That splits the world into \'natural = safe\' and \'chemical = artificial\'; glucose from an orange and glucose synthesised in a factory are identical molecules.', reveals: 'natural-means-chemical-free' },
                { text: 'It means \'free of harmful chemicals\' — so the claim is scientifically fine, just informal.', outcome: 'Even read charitably, \'harmful\' depends on dose and identity, not origin — the claim still trades on a meaningless word; every ingredient in the bottle is a chemical.', reveals: 'chemical-free-means-safe' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Chemistry doesn\'t just explain matter, it designs it — and its first law is that nothing is ever truly lost.',
            decisions: [{ prompt: 'What comes next? Some Basic Concepts of Chemistry · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Some Basic Concepts of Chemistry · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_001', difficulty: 'standard',
          question: 'Chemistry is the central science that studies the composition, structure.',
          hint: 'If stuck, revisit Class 10 "Chemical Reactions: Identifying a Chemical Change".',
          misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab uses diammonium phosphate (DAP) fertiliser.', answer: 'DAP is (NH₄)₂HPO₄',
                  options: ['DAP is (NH₄)₂HPO₄', 'NH₄PO₄', 'DAP provides NPK', 'chemical'],
                  hint: 'If stuck, revisit Class 10 "Chemical Reactions: Identifying a Chemical Change".',
                  misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise that *every*.' }
          ],
            remediations: { 'chemistry-s-relevance-is-limited': { steps: ['Have the student conduct a "Chemical Audit" of their schoolbag: list 10 items, identify the key chemical substance.', 'Then discuss: "Which of these would not exist without deliberate molecular design?" This forces confrontation with.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Green chemistry is merely a marketing term; all chemical industries already follow environmental regulations." Justify your.', answer: 'The statement is false',
                  options: ['The statement is false', 'chemical', 'chemistry'],
                  hint: 'If stuck, revisit Class 10 "Chemical Reactions: Identifying a Chemical Change".',
                  misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise that *every*.' },
                { id: 'b', prompt: 'Design a concept map showing how chemistry connects to five distinct career fields in India (e.g., pharmaceuticals, agriscience, materials, energy.', answer: 'A strong map includes: (1) Pharmaceuticals',
                  options: ['A strong map includes: (1) Pharmaceuticals', 'chemical', 'chemistry'],
                  hint: 'If stuck, revisit Class 10 "Chemical Reactions: Identifying a Chemical Change".',
                  misconception: 'Students believe chemistry\'s relevance is limited to laboratory reactions and textbook equations, failing to recognise that *every*.' }
          ],
            remediations: { 'chemistry-s-relevance-is-limited': { steps: ['Have the student conduct a "Chemical Audit" of their schoolbag: list 10 items, identify the key chemical substance.', 'Then discuss: "Which of these would not exist without deliberate molecular design?" This forces confrontation with.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_002', difficulty: 'standard',
          question: 'The Law of Conservation of Mass states that in any isolated physical.',
          hint: 'Review balancing chemical equations (Class 10 c10_chem_cbse_01_002) and molar mass.',
          misconception: 'Students believe the Law of Conservation of Mass means "the mass of solid reactants equals mass of solid products".',
          parts: [
                { id: 'a', prompt: 'When 10.0 g of solid calcium carbonate (CaCO₃) is heated strongly in an OPEN test tube, the solid residue masses 5.6 g.', answer: 'Correct answer: The reaction CaCO₃(s) → CaO(s) + CO₂(g) occurs',
                  options: ['Correct answer: The reaction CaCO₃(s) → CaO(s) + CO₂(g) occurs', 'mass is lost', 'the mass of solid reactants equals mass of solid products', '44 g mass destroyed'],
                  hint: 'Review balancing chemical equations (Class 10 c10_chem_cbse_01_002) and molar mass calculations.',
                  misconception: 'Students believe the Law of Conservation of Mass means "the mass of solid reactants equals mass of solid products" — they ignore gaseous.' },
                { id: 'b', prompt: 'In the reaction 2Mg(s) + O₂(g) → 2MgO(s), 4.80 g of magnesium ribbon is burned in a sealed 5.00 L vessel containing excess oxygen.', answer: 'Step 1: Moles of Mg = 4.80/24.0 = 0.200 mol',
                  options: ['Step 1: Moles of Mg = 4.80/24.0 = 0.200 mol', 'the mass of solid reactants equals mass of solid products', '44 g mass destroyed', 'closed container'],
                  hint: 'Review balancing chemical equations (Class 10 c10_chem_cbse_01_002) and molar mass calculations.',
                  misconception: 'Students believe the Law of Conservation of Mass means "the mass of solid reactants equals mass of solid products" — they ignore gaseous.' },
                { id: 'c', prompt: 'Compare these two scenarios: (A) 2H₂(g) + O₂(g) → 2H₂O(l) in a sealed rigid container at 25°C; (B) Same reaction in an open beaker at 100°C.', answer: 'Correct answer: Scenario (A) only',
                  options: ['Correct answer: Scenario (A) only', 'the mass of solid reactants equals mass of solid products', '44 g mass destroyed', 'closed container'],
                  hint: 'Review balancing chemical equations (Class 10 c10_chem_cbse_01_002) and molar mass calculations.',
                  misconception: 'Students believe the Law of Conservation of Mass means "the mass of solid reactants equals mass of solid products" — they ignore gaseous.' }
          ],
            remediations: { 'the-law-of-conservation-of': { steps: ['Revisit Class 9 Lavoisier experiment (c9_chem_ch3_1): mentally trace each atom from reactant to product — no atom.', 'Practice 5 gas-evolution reactions (thermal decomposition, metal-acid, carbonate-acid) writing balanced equations with.', 'Perform the "vinegar + baking soda in sealed bag on balance" demo: mass constant.', 'Explicitly list system boundary for each problem: "System = flask + stopper + all contents including gas phase." 5.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_003', difficulty: 'standard',
          question: 'The Law of Definite Proportions states that a given chemical compound always.',
          hint: 'If stuck on ratio calculations, revisit Class 6 Math Chapter 6 (Ratio and Proportion).',
          misconception: 'Students often think the Law of Multiple Proportions applies to the mass ratios *within* a single compound (e.g.,.',
          parts: [
                { id: 'a', prompt: 'Two oxides of nitrogen are analyzed. Oxide A: 1.00 g contains 0.636 g N. Oxide B: 1.00 g contains 0.467 g N.', answer: 'For Oxide A: mass O = 0.364 g',
                  options: ['For Oxide A: mass O = 0.364 g', 'fixing the mass of one element'],
                  hint: 'If stuck on ratio calculations, revisit Class 6 Math Chapter 6 (Ratio and Proportion).',
                  misconception: 'Students often think the Law of Multiple Proportions applies to the mass ratios *within* a single compound (e.g., in CO₂, C:O = 12:32.' },
                { id: 'b', prompt: 'A student analyzes two samples of water: one from the Ganga river and one from melted Himalayan ice. Both give 11.11% H and 88.89% O by mass.', answer: 'Yes, the conclusion is valid',
                  options: ['Yes, the conclusion is valid', 'no, because natural water has impurities', 'pure water samples'],
                  hint: 'If stuck on ratio calculations, revisit Class 6 Math Chapter 6 (Ratio and Proportion).',
                  misconception: 'Students often think the Law of Multiple Proportions applies to the mass ratios *within* a single compound (e.g., in CO₂, C:O = 12:32.' }
          ],
            remediations: { 'the-law-of-multiple-proportions': { steps: ['If the student confuses the two laws, have them work through a template: (1) Write formulas of two compounds of same.', '(2) Choose one element to fix (e.g., N = 14 g).', '(3) Calculate mass of the other element in each compound that combines with 14 g N.', 'Repeat with different fixed masses to show the ratio remains the same whole numbers.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_004', difficulty: 'standard',
          question: 'Gay Lussac\'s Law of Gaseous Volumes states that when gases react chemically.',
          hint: 'If stuck on volume ratios, revisit c11_chem_cbse_01_003 (Law of Definite/Multiple.',
          misconception: 'Students treat gas volume ratios as mass ratios, writing "2g H₂ + 1g O₂ → 2g H₂O" instead of "2 volumes H₂ + 1 volume.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Gay Lussac\'s Law of Gaseous Volumes states that when gases react chemically at constant',
                  options: ['Gay Lussac\'s Law of Gaseous Volumes states that when gases react chemically at constant', 'Chemistry is the central science that studies the composition, structure, properties, and', 'The Law of Conservation of Mass states that in any isolated physical or chemical process,', 'The Law of Definite Proportions states that a given chemical compound always contains its'],
                  hint: 'If stuck on volume ratios, revisit c11_chem_cbse_01_003 (Law of Definite/Multiple Proportions) and.',
                  misconception: 'Students treat gas volume ratios as mass ratios, writing "2g H₂ + 1g O₂ → 2g H₂O" instead of "2 volumes H₂ + 1 volume O₂ → 2 volumes H₂O".' }
          ],
            remediations: { 'students-treat-gas-volume-ratios': { steps: ['Revisit Class 9 Law of Definite Proportions (mass ratios) and contrast with Gay Lussac (volume ratios).', 'Perform a mental check: "Can I compress this gas?" If yes, volume changes with P, so ratios only valid at fixed P.', 'Practice converting: given mass → moles (using molar mass) → volume at STP (×22.4 L) → apply volume ratio → convert.', 'Draw particle diagrams: boxes with equal molecules (Avogadro) showing 2:1:2 ratio for H₂:O₂:H₂O, reinforcing that.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_005', difficulty: 'standard',
          question: 'Dalton\'s Atomic Theory is a foundational chemical model proposing that all.',
          hint: 'If stuck, revisit c11_chem_cbse_01_002 and c11_chem_cbse_01_003 — specifically practice.',
          misconception: 'Students confuse Dalton\'s "identical atoms of same element" postulate with the modern concept of isotopes, thinking.',
          parts: [
                { id: 'a', prompt: 'State the four postulates of Dalton\'s Atomic Theory as originally proposed in 1808.', answer: 'The four postulates are: (1) Matter consists of indivisible atoms',
                  options: ['The four postulates are: (1) Matter consists of indivisible atoms', 'identical atoms of same element'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_002 and c11_chem_cbse_01_003 — specifically practice converting.',
                  misconception: 'Students confuse Dalton\'s "identical atoms of same element" postulate with the modern concept of isotopes, thinking Dalton was "wrong".' },
                { id: 'b', prompt: 'Carbon forms two oxides: CO (carbon monoxide) and CO₂ (carbon dioxide). In CO, 12 g carbon combines with 16 g oxygen.', answer: 'Fixed mass of carbon = 12 g',
                  options: ['Fixed mass of carbon = 12 g', 'identical atoms of same element'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_002 and c11_chem_cbse_01_003 — specifically practice converting.',
                  misconception: 'Students confuse Dalton\'s "identical atoms of same element" postulate with the modern concept of isotopes, thinking Dalton was "wrong".' }
          ],
            remediations: { 'students-confuse-dalton-s-identical': { steps: ['Have the student calculate the average atomic mass of chlorine from isotopic data (35Cl 75.77%, 37Cl 24.23%) using the.', 'Show that this average (35.45 u) is what goes into the periodic table and stoichiometric calculations.', 'Ask: "If you take 35.45 g chlorine, does it contain exactly Avogadro\'s number of atoms?" Yes — because the molar mass.', 'Conclude: Dalton\'s "identical mass" meant chemically equivalent mass for stoichiometry; isotopes refine but don\'t.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_006', difficulty: 'standard',
          question: 'Atomic mass is the mass of an atom expressed in unified atomic mass units (u).',
          hint: 'If stuck on weighted average: revisit c9_chem_ch2_8 (Isotopes) and c7_math_ch8_4.',
          misconception: 'Students confuse "atomic mass" (dimensionless ratio relative to C-12) with "molar mass" (g/mol), writing "atomic mass.',
          parts: [
                { id: 'a', prompt: 'State the exact definition of 1 unified atomic mass unit (1 u) and explain why carbon-12 was chosen as the reference standard instead of hydrogen or oxygen.', answer: '1 u = 1/12 the mass of a carbon-12 atom = 1.660539 × 10⁻²⁴ g',
                  options: ['1 u = 1/12 the mass of a carbon-12 atom = 1.660539 × 10⁻²⁴ g', 'atomic mass', 'molar mass', 'atomic mass of carbon = 12 g/mol'],
                  hint: 'If stuck on weighted average: revisit c9_chem_ch2_8 (Isotopes) and c7_math_ch8_4 (Percentage of.',
                  misconception: 'Students confuse "atomic mass" (dimensionless ratio relative to C-12) with "molar mass" (g/mol), writing "atomic mass of carbon = 12.' },
                { id: 'b', prompt: 'Calculate the molecular mass of sucrose (C₁₂H₂₂O₁₁) using atomic masses: C = 12.011 u, H = 1.008 u, O = 16.00 u. Show all steps with units.', answer: 'Step 1: Identify atoms: 12 C, 22 H, 11 O',
                  options: ['Step 1: Identify atoms: 12 C, 22 H, 11 O', 'atomic mass', 'molar mass', 'atomic mass of carbon = 12 g/mol'],
                  hint: 'If stuck on weighted average: revisit c9_chem_ch2_8 (Isotopes) and c7_math_ch8_4 (Percentage of.',
                  misconception: 'Students confuse "atomic mass" (dimensionless ratio relative to C-12) with "molar mass" (g/mol), writing "atomic mass of carbon = 12.' },
                { id: 'c', prompt: 'Compare the formula mass of NaCl (ionic) and molecular mass of Cl₂ (covalent). Both contain chlorine.', answer: 'NaCl exists as a crystal lattice of Na⁺ and Cl⁻ ions in 1:1 ratio',
                  options: ['NaCl exists as a crystal lattice of Na⁺ and Cl⁻ ions in 1:1 ratio', 'atomic mass', 'molar mass', 'atomic mass of carbon = 12 g/mol'],
                  hint: 'If stuck on weighted average: revisit c9_chem_ch2_8 (Isotopes) and c7_math_ch8_4 (Percentage of.',
                  misconception: 'Students confuse "atomic mass" (dimensionless ratio relative to C-12) with "molar mass" (g/mol), writing "atomic mass of carbon = 12.' }
          ],
            remediations: { 'students-confuse-atomic-mass-dimensionless': { steps: ['Hold a 12 g sample of carbon (graphite) — this is 1 mole = 6.022×10²³ atoms.', 'Divide 12 g by Avogadro\'s number → 1.993×10⁻²³ g per atom.', 'Divide by 1.6605×10⁻²⁴ g/u → 12.00 u per atom.', 'Now weigh a natural carbon sample (contains ¹³C) — mass per atom = 1.994×10⁻²³ g → 12.01 u.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
