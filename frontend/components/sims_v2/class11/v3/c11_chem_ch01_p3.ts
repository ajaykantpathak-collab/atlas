import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch01_p3: SimDef = {
    id: 'v3_c11_chem_ch01_p3',
    title: 'Some Basic Concepts of Chemistry · Part 3/3',
    subtitle: 'See why chemistry is called the central science, and why a sealed system never loses mass.',
    classLevel: 11, subject: 'chemistry', topic: 'Some Basic Concepts of Chemistry · Part 3/3',
    chapters: ['c11_chem_ch01'],
    nodeIds: ['c11_chem_cbse_01_013', 'c11_chem_cbse_01_014', 'c11_chem_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a materials analyst tracing the chemistry hidden in everyday objects', intro: 'A shopkeeper swears rusting, ripening and burning are \'just things that happen.\' You\'re here to show the molecular machinery underneath.', goal: 'Recognise chemistry\'s reach across daily life and apply conservation of mass to closed systems.' },
    discovery: {
        question: 'A dozen eggs, a mole of atoms — why do chemists bother with the mole at all?',
        options: ['Atoms are too small to count — the mole groups them by mass', 'It measures atomic weight directly', 'It is a unit of volume for gases', 'It counts electrons in a shell'],
        answer: 'Atoms are too small to count — the mole groups them by mass',
        hook: '6.022 × 10²³ is not magic — it is the conversion factor between grams and particles.',
    },
    teaching: [
        { title: 'Concentration Terms: Molarity', text: 'Molarity (M) is defined as the amount of solute in moles dissolved per liter of solution, expressed as M = n/V where n is moles of solute and V is solution volume in litres.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_01_013', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Run a chemical audit of a schoolbag — name the designed molecule behind everyday items — then verify mass conservation in a sealed reaction.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_013', title: 'Concentration Terms: Molarity',
          scaffold: { problem: 'A laboratory technician needs to prepare 500.0 mL of 0.200 M Na₂CO₃ solution for a standardization experiment.',
            steps: [
            { text: 'Identify target: V = 500.0 mL = 0.5000 L, M = 0.200 mol L⁻¹. Moles needed = M × V = 0.200 × 0.5000 = 0.100 mol.' },
            { text: 'Convert moles to mass: mass = moles × molar mass = 0.100 mol × 105.99 g mol⁻¹ = 10.60 g.' },
            { text: 'Weigh 10.60 g Na₂CO₃ on analytical balance (±0.001 g) using a weighing bottle.' },
            { text: 'Transfer solid to a clean beaker, dissolve in ~100 mL distilled water with stirring.' },
            { text: 'Quantitatively transfer solution to 500 mL volumetric flask using funnel; rinse beaker, stirring rod, and funnel 3.' },
            { text: 'Dilute with distilled water to ~1 cm below mark, then use dropper to bring meniscus exactly to mark at eye level.', faded: true, blankAnswer: '10.60 g Na₂CO₃; procedure as described yields 500.0 mL.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_014', title: 'Concentration Terms: Molality, Mole Fraction',
          scaffold: { problem: 'A solution is prepared by dissolving 18.0 g of glucose (C₆H₁₂O₆, molar mass 180 g/mol) in 182 g of water.',
            steps: [
            { text: 'Calculate moles of glucose = 18.0 g / 180 g/mol = 0.100 mol. Calculate moles of water = 182 g / 18.0 g/mol = 10.11 mol.' },
            { text: '(a) Molality = moles of solute / kg of solvent = 0.100 mol / 0.182 kg = 0.549 m.' },
            { text: '(b) Mole fraction of glucose, χ_glucose = n_glucose / (n_glucose + n_water) = 0.100 / (0.100 + 10.11) = 0.100 / 10.21.' },
            { text: '(c) For molarity, need solution volume. Mass of solution = 18.0 + 182 = 200 g.' },
            { text: 'Verify consistency: Molality (0.549) > Molarity (0.510) as expected for aqueous solution with d > 1 g/mL.', faded: true, blankAnswer: '(a) 0.549 m, (b) χ_glucose = 0.00979, χ_water = 0.990, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_01_015', title: 'Word Problems: Stoichiometric Calculations',
          scaffold: { problem: 'In the industrial production of ammonia via the Haber process, nitrogen gas reacts with hydrogen gas: N₂(g) + 3H₂(g) ⇌ 2NH₃(g).',
            steps: [
            { text: 'Convert given masses to moles. Molar mass N₂ = 28 g/mol, H₂ = 2 g/mol, NH₃ = 17 g/mol.' },
            { text: 'Determine limiting reagent using stoichiometric ratio. Balanced equation: 1 mol N₂ : 3 mol H₂.' },
            { text: 'Calculate theoretical yield of NH₃. From stoichiometry: 1 mol N₂ → 2 mol NH₃. So 10,000 mol N₂ → 20,000 mol NH₃.' },
            { text: 'Calculate percentage yield. % yield = (actual yield / theoretical yield) × 100 = (240 kg / 340 kg) × 100 = 70.6%.' },
            { text: 'Calculate excess reagent remaining. Since stoichiometric ratio is exact, both reactants are fully consumed.' },
            { text: 'Verify mass conservation. Total mass reactants = 280 + 60 = 340 kg. Total mass products (theoretical) = 340 kg NH₃.', faded: true, blankAnswer: '(a) Neither - exactly stoichiometric amounts (both.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A wellness stall at your school fair sells \'100% chemical-free\' fruit juice and \'all-natural\' detergent. A classmate wants to buy the juice, saying: \'At least this one has no chemicals — chemistry is lab stuff, I don\'t want it in my food.\'',
            decisions: [{ prompt: 'What\'s wrong with the \'chemical-free\' claim?', options: [
                { text: 'Everything is chemistry — the juice is water, sugars, vitamins, acids; \'natural\' vitamin C and lab-made vitamin C are the same molecule. The label confuses \'chemical\' (everything made of atoms) with \'synthetic additive\'. Chemistry isn\'t confined to labs: the juice\'s preservation, the detergent\'s surfactants, even your saliva are molecular processes.', outcome: 'Chemistry is the study of matter\'s composition and transformations — you can\'t buy your way out of it; \'chemical-free\' would mean a vacuum.' },
                { text: 'The label is honest — natural juice has no chemicals because chemicals are artificial substances made in labs.', outcome: 'That splits the world into \'natural = safe\' and \'chemical = artificial\'; glucose from an orange and glucose synthesised in a factory are identical molecules.', reveals: 'natural-means-chemical-free' },
                { text: 'It means \'free of harmful chemicals\' — so the claim is scientifically fine, just informal.', outcome: 'Even read charitably, \'harmful\' depends on dose and identity, not origin — the claim still trades on a meaningless word; every ingredient in the bottle is a chemical.', reveals: 'chemical-free-means-safe' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'Chemistry doesn\'t just explain matter, it designs it — and its first law is that nothing is ever truly lost.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_013', difficulty: 'standard',
          question: 'Molarity (M) is defined as the amount of solute in moles dissolved per liter.',
          hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations.',
          misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL.',
          parts: [
                { id: 'a', prompt: 'Define molarity and state its SI unit. Why is molarity considered a temperature-dependent concentration term?', answer: 'Molarity (M) = moles of solute per litre of solution (mol L⁻¹)',
                  options: ['Molarity (M) = moles of solute per litre of solution (mol L⁻¹)', 'moles per kg solvent', 'temperature-independent', 'dissolving solute in X mL water'],
                  hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations (c11_chem_cbse_01_008).',
                  misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL of 0.1 M NaCl, they.' },
                { id: 'b', prompt: 'A student prepares 500 mL of 0.2 M NaOH solution by dissolving 4.0 g NaOH in 500 mL water. Is this procedure correct? Explain why or why not.', answer: 'Incorrect',
                  options: ['Incorrect', 'dissolving solute in X mL water', 'making solution volume X mL', 'they have 0'],
                  hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations (c11_chem_cbse_01_008).',
                  misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL of 0.1 M NaCl, they.' },
                { id: 'c', prompt: 'Calculate the molarity of a solution prepared by dissolving 15.0 g of oxalic acid dihydrate [(COOH)₂·2H₂O, molar mass = 126.07 g mol⁻¹] in water and making the.', answer: 'Step 1: Moles of oxalic acid dihydrate = 15.0 g / 126.07 g mol⁻¹ = 0.1190 mol',
                  options: ['Step 1: Moles of oxalic acid dihydrate = 15.0 g / 126.07 g mol⁻¹ = 0.1190 mol', 'dissolving solute in X mL water', 'making solution volume X mL', 'they have 0'],
                  hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations (c11_chem_cbse_01_008).',
                  misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL of 0.1 M NaCl, they.' },
                { id: 'd', prompt: 'You have 100 mL of 0.5 M HCl. How much water must you add to make it 0.1 M?', answer: 'Using M₁V₁ = M₂V₂: (0.5 M)(100 mL) = (0.1 M)(V₂) → V₂ = 500 mL',
                  options: ['Using M₁V₁ = M₂V₂: (0.5 M)(100 mL) = (0.1 M)(V₂) → V₂ = 500 mL', 'dissolving solute in X mL water', 'making solution volume X mL', 'they have 0'],
                  hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations (c11_chem_cbse_01_008).',
                  misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL of 0.1 M NaCl, they.' }
          ],
            remediations: { 'students-confuse-dissolving-solute-in': { steps: ['If the student makes the volume error: Have them perform a simple experiment — measure 50 mL water in a graduated.', 'Then demonstrate correct volumetric flask technique: dissolve in less water, transfer, rinse, dilute to mark.', 'For molarity/molality confusion: Give a problem with density where both are calculated (like Diagnostic Q5) and have.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL.',
          parts: [
                { id: 'a', prompt: 'A 3.0 M NaCl solution has density 1.25 g mL⁻¹. Calculate its molality. (Molar mass NaCl = 58.44 g mol⁻¹)', answer: 'Step 1: 1 L solution contains 3.0 mol NaCl = 3.0 × 58.44 = 175.3 g NaCl',
                  options: ['Step 1: 1 L solution contains 3.0 mol NaCl = 3.0 × 58.44 = 175.3 g NaCl', 'dissolving solute in X mL water', 'making solution volume X mL', 'they have 0'],
                  hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations (c11_chem_cbse_01_008).',
                  misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL of 0.1 M NaCl, they.' },
                { id: 'b', prompt: 'Design a procedure to prepare 100 mL of 0.05 M KMnO₄ solution from solid KMnO₄ (molar mass = 158.04 g mol⁻¹).', answer: 'Mass needed = 0.05 mol/L × 0.100 L × 158.04 g/mol = 0.790 g',
                  options: ['Mass needed = 0.05 mol/L × 0.100 L × 158.04 g/mol = 0.790 g', 'dissolving solute in X mL water', 'making solution volume X mL', 'they have 0'],
                  hint: 'Review mole concept (c11_chem_cbse_01_007) and molar mass calculations (c11_chem_cbse_01_008).',
                  misconception: 'Students confuse "dissolving solute in X mL water" with "making solution volume X mL." For example, to make 250 mL of 0.1 M NaCl, they.' }
          ],
            remediations: { 'students-confuse-dissolving-solute-in': { steps: ['If the student makes the volume error: Have them perform a simple experiment — measure 50 mL water in a graduated.', 'Then demonstrate correct volumetric flask technique: dissolve in less water, transfer, rinse, dilute to mark.', 'For molarity/molality confusion: Give a problem with density where both are calculated (like Diagnostic Q5) and have.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_014', difficulty: 'standard',
          question: 'Molality (m) is defined as the amount of solute in moles per kilogram.',
          hint: 'Revisit c11_chem_cbse_01_007 (Mole Concept) for mass↔mole conversions and.',
          misconception: 'Students confuse "mass of solvent" with "mass of solution" in molality calculations.',
          parts: [
                { id: 'a', prompt: 'Define molality and state its SI unit. How does it differ from molarity in terms of what is measured in the denominator?', answer: 'Molality (m) = moles of solute per kilogram of solvent',
                  options: ['Molality (m) = moles of solute per kilogram of solvent', 'molality uses volume of solvent', 'molality unit is mol/L', 'mass of solvent'],
                  hint: 'Revisit c11_chem_cbse_01_007 (Mole Concept) for mass↔mole conversions and c11_chem_cbse_01_013.',
                  misconception: 'Students confuse "mass of solvent" with "mass of solution" in molality calculations.' },
                { id: 'b', prompt: 'A solution contains 2 mol of ethanol (C₂H₅OH) and 3 mol of water. Calculate the mole fraction of ethanol.', answer: 'χ_ethanol = 2 / (2+3) = 0.4',
                  options: ['χ_ethanol = 2 / (2+3) = 0.4', 'mass of solvent', 'mass of solution'],
                  hint: 'Revisit c11_chem_cbse_01_007 (Mole Concept) for mass↔mole conversions and c11_chem_cbse_01_013.',
                  misconception: 'Students confuse "mass of solvent" with "mass of solution" in molality calculations.' },
                { id: 'c', prompt: 'Calculate the molality of a solution prepared by dissolving 5.85 g of NaCl (molar mass 58.5 g/mol) in 250 g of water.', answer: 'Step 1: Moles of NaCl = 5.85 g / 58.5 g/mol = 0.1 mol',
                  options: ['Step 1: Moles of NaCl = 5.85 g / 58.5 g/mol = 0.1 mol', 'mass of solvent', 'mass of solution'],
                  hint: 'Revisit c11_chem_cbse_01_007 (Mole Concept) for mass↔mole conversions and c11_chem_cbse_01_013.',
                  misconception: 'Students confuse "mass of solvent" with "mass of solution" in molality calculations.' },
                { id: 'd', prompt: 'An aqueous solution of glucose (C₆H₁₂O₆, molar mass 180 g/mol) has a molarity of 1.0 M and density 1.08 g/mL at 298 K. Calculate its molality.', answer: 'For 1 L solution: mass of solution = 1080 g',
                  options: ['For 1 L solution: mass of solution = 1080 g', 'mass of solvent', 'mass of solution'],
                  hint: 'Revisit c11_chem_cbse_01_007 (Mole Concept) for mass↔mole conversions and c11_chem_cbse_01_013.',
                  misconception: 'Students confuse "mass of solvent" with "mass of solution" in molality calculations.' }
          ],
            remediations: { 'students-confuse-mass-of-solvent': { steps: ['Circle the word "solvent" in every molality problem.', 'Explicitly write "mass of solvent = ___ g = ___ kg" before plugging into formula.', 'Practice 5 problems where solute mass is 10-20% of solvent mass (so error is obvious).', 'Create a two-column table: "Given" vs "Used in formula" — e.g., Given: 90 g water → Used: 0.090 kg (not 0.100 kg).'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_01_015', difficulty: 'standard',
          question: 'Stoichiometric word problems require translating a real-world chemical scenario.',
          hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_012.',
          misconception: 'Students treat molarity and molality as interchangeable in stoichiometric calculations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Stoichiometric word problems require translating a real-world chemical scenario into a',
                  options: ['Stoichiometric word problems require translating a real-world chemical scenario into a', 'Chemistry is the central science that studies the composition, structure, properties, and', 'The Law of Conservation of Mass states that in any isolated physical or chemical process,', 'The Law of Definite Proportions states that a given chemical compound always contains its'],
                  hint: 'If stuck, revisit c11_chem_cbse_01_011 (balancing equations) and c11_chem_cbse_01_012 (limiting.',
                  misconception: 'Students treat molarity and molality as interchangeable in stoichiometric calculations.' }
          ],
            remediations: { 'students-treat-molarity-and-molality': { steps: ['Remediation: (1) Create a comparison table: Molarity (M) = n_solute/V_solution(L), temperature-dependent; Molality (m).', '(2) Practice conversion: Given 2 M H₂SO₄ (density 1.14 g/mL), calculate molality.', 'Steps: 1 L solution = 1140 g, contains 2 mol H₂SO₄ = 196 g, water = 944 g = 0.944 kg, m = 2/0.944 = 2.12 m.', '(3) Drill decision rule: "Use M for solution-phase stoichiometry (titrations, reaction volumes); use m for colligative.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
