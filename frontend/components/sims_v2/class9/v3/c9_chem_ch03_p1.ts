import type { SimDef } from '../../engine/types';

/** v3 generated — c9_chem_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_chem_ch03_p1: SimDef = {
    id: 'v3_c9_chem_ch03_p1',
    title: 'Chemical Bonding and Chemical Formulae · Part 1/2',
    subtitle: 'The disappearing mass that never disappears',
    classLevel: 9, subject: 'chemistry', topic: 'Chemical Bonding and Chemical Formulae · Part 1/2',
    chapters: ['c9_chem_ch03'],
    nodeIds: ['c9_chem_ch3_1', 'c9_chem_ch3_10', 'c9_chem_ch3_2', 'c9_chem_ch3_3', 'c9_chem_ch3_4', 'c9_chem_ch3_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mass-accounting chemist', intro: 'A candle \'vanishes\', a metal \'gains weight\' — chemical reactions look like they cheat the scales. One sealed container exposes the trick: count the gases.', goal: 'Understand the Law of Conservation of Mass — reactant mass equals product mass in a closed system because atoms only rearrange — and apply it to find missing masses.' },
    discovery: {
        question: 'Magnesium ribbon burns in an open dish and GAINS mass (2.4 g Mg → 4.0 g MgO). Did the reaction just create matter out of thin air?',
        options: ['No — invisible oxygen from the air joined the reaction; weigh it too and the mass balances perfectly', 'Yes — burning creates mass', 'The balance was broken', 'The ash was contaminated with dust'],
        answer: 'No — invisible oxygen from the air joined the reaction; weigh it too and the mass balances perfectly',
        hook: 'The law only guards a CLOSED system. Lavoisier\'s sealed retort trapped the escaping oxygen; an open crucible lets gases sneak in or out, so the scale \'lies\'. Atoms never appear or vanish — they only rearrange.',
    },
    teaching: [
        { title: 'Law of Conservation of Mass: Lavoisier\'s Experiment', text: 'The Law of Conservation of Mass states that in any chemical reaction occurring in a closed system, the total mass of reactants equals the total mass of products because atoms are neither created nor.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_chem_ch3_1', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Replay Lavoisier\'s 1774 sealed-retort experiment, hunt down the missing 7.2 g of oxygen, then verify the law yourself with vinegar and baking soda — balloon over the flask so the CO₂ can\'t escape.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_1', title: 'Law of Conservation of Mass: Lavoisier\'s Experiment',
          scaffold: { problem: 'Lavoisier heated 145.0 g of mercury(II) oxide (HgO) in a sealed retort.',
            steps: [
            { text: 'Identify the reaction — thermal decomposition of mercury(II) oxide: 2HgO → 2Hg + O₂.' },
            { text: 'List known masses — initial mass of HgO (reactant) = 145.0 g, final mass of Hg (product) = 133.8 g.' },
            { text: 'Apply the law — in a closed system, total mass of reactants = total mass of products. So, mass_HgO = mass_Hg + mass_O₂.' },
            { text: 'Calculate mass of oxygen — mass_O₂ = mass_HgO − mass_Hg = 145.0 g − 133.8 g = 11.2 g.' },
            { text: 'Verify — total products mass = 133.8 g + 11.2 g = 145.0 g, which exactly equals reactant mass. Law holds.', faded: true, blankAnswer: 'Mass of oxygen produced = 11.2 g. Law verified: 145.0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_10', title: 'Formula Unit Mass: Calculation for Ionic Compounds',
          scaffold: { problem: 'Calculate the formula unit mass of ammonium sulfate, (NH₄)₂SO₄. Atomic masses: N=14 u, H=1 u, S=32 u, O=16 u.',
            steps: [
            { text: 'Identify the formula and expand brackets: (NH₄)₂SO₄ means 2 × (N₁H₄) + S₁O₄ = N₂H₈SO₄.' },
            { text: 'List each element with its total atom count: N=2, H=8, S=1, O=4.' },
            { text: 'Multiply each atom count by its atomic mass: N: 2 × 14 u = 28 u; H: 8 × 1 u = 8 u; S: 1 × 32 u = 32 u; O: 4 × 16 u = 64.' },
            { text: 'Sum all contributions: 28 u + 8 u + 32 u + 64 u = 132 u.' },
            { text: 'Verify by checking atom balance and units: Total mass = 132 u.', faded: true, blankAnswer: '132 u' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_2', title: 'Law of Constant Proportions: Proust\'s Law',
          scaffold: { problem: 'A 25.0g sample of copper oxide (CuO) prepared by heating copper in air contains 20.0g of copper.',
            steps: [
            { text: 'For Sample 1, find mass of oxygen = total mass - mass of copper = 25.0g - 20.0g = 5.0g.' },
            { text: 'Calculate Cu:O mass ratio for Sample 1 = 20.0 : 5.0 = 4 : 1 (simplified by dividing by 5).' },
            { text: 'For Sample 2, find mass of oxygen = 15.0g - 12.0g = 3.0g.' },
            { text: 'Calculate Cu:O mass ratio for Sample 2 = 12.0 : 3.0 = 4 : 1 (simplified by dividing by 3).' },
            { text: 'Compare ratios — both are 4:1, so the law is verified. The fixed proportion holds regardless of preparation method.', faded: true, blankAnswer: 'Both samples have Cu:O mass ratio of 4:1. The Law.' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch3_4', title: 'Covalent Bonding: Sharing of Electrons',
          caseStudy: { intro: 'Observe a glass of water (H₂O) and the air you breathe (O₂, N₂, CO₂) — all are invisible gases or liquids made of non-metals, yet they exist as stable distinct.',
            decisions: [{ prompt: 'Define a covalent bond and state the type of elements that typically form covalent bonds with each other.', options: [
                { text: 'A covalent bond is formed by the mutual sharing of electron pair(s) between two non-metal', outcome: 'A covalent bond is formed by the mutual sharing of electron pair(s) between two non-metal atoms.' },
                { text: 'transfer of electrons', outcome: 'Not quite — Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each).', reveals: 'students-often-draw-a-single' },
                { text: 'between metal and non-metal', outcome: 'Not quite — Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each).', reveals: 'students-often-draw-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch3_5', title: 'Ionic Bonding: Transfer of Electrons',
          caseStudy: { intro: 'Observe common table salt (NaCl) in your kitchen - it is a white crystalline solid that dissolves in water and conducts electricity when dissolved, but not.',
            decisions: [{ prompt: 'Define ionic bond and state the type of elements (metals/non-metals, group numbers) that typically form ionic compounds.', options: [
                { text: 'An ionic bond is the electrostatic force of attraction between oppositely charged ions', outcome: 'An ionic bond is the electrostatic force of attraction between oppositely charged ions formed.' },
                { text: 'sharing of electrons', outcome: 'Not quite — Students write the criss-cross method for formula writing but forget to reduce subscripts.', reveals: 'students-write-the-criss-cross' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Repeating Lavoisier\'s experiment for the school lab, a group heats magnesium ribbon in an open crucible: 2.4 g in, 4.0 g of white ash out. \'Mass increased — the conservation law is broken!\' one declares.',
            decisions: [{ prompt: 'What actually happened to the extra mass?', options: [
                { text: 'Nothing was created — the open crucible let oxygen atoms from the air bond with the magnesium, and that borrowed 1.6 g is the gain. The law holds only in a closed system; seal the vessel as Lavoisier did and the total stays constant.', outcome: 'This redraws the system boundary correctly — the reactants included invisible oxygen, which has mass.' },
                { text: 'The student is right — a heavier product means mass was created, and laws have exceptions.', outcome: 'The exception is the weighing, not the law: counting only the solid reactant while air streamed in is an incomplete ledger.', reveals: 'law-has-exceptions' },
                { text: 'The gain is just trapped heat, since energy registers as mass on a balance.', outcome: 'A school balance cannot register heat; the extra grams are real oxygen atoms that joined the reaction from the air.', reveals: 'heat-adds-grams' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch3_5', title: 'The bigger picture',
          caseStudy: { intro: 'In a closed system, mass in = mass out, always. Atoms are just rearranged furniture — nothing created, nothing destroyed. Let a gas escape the weigh-in and the law seems to break, but the atoms know better.',
            decisions: [{ prompt: 'What comes next? Chemical Bonding and Chemical Formulae · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chemical Bonding and Chemical Formulae · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch3_1', difficulty: 'standard',
          question: 'The Law of Conservation of Mass states that in any chemical reaction occurring.',
          hint: 'Revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c6_chemistry_ch05_004.',
          misconception: 'Students believe the Law of Conservation of Mass means "mass never changes in ANY reaction," so when they see magnesium.',
          parts: [
                { id: 'a', prompt: 'State the Law of Conservation of Mass in your own words and name the scientist who experimentally proved it using mercury(II) oxide.', answer: 'Correct answer: "Mass is neither created nor destroyed in a chemical reaction',
                  options: ['Correct answer: "Mass is neither created nor destroyed in a chemical reaction', 'A wrong answer like', 'reveals the student misses the critical', 'mass never changes in ANY reaction'],
                  hint: 'Revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c6_chemistry_ch05_004 (Combustion.',
                  misconception: 'Students believe the Law of Conservation of Mass means "mass never changes in ANY reaction," so when they see magnesium ribbon burn in.' },
                { id: 'b', prompt: 'In Lavoisier\'s experiment, 92.6 g of mercury(II) oxide (HgO) was heated in a sealed retort. After decomposition, 85.4 g of mercury (Hg) was collected.', answer: 'Step 1: Identify knowns',
                  options: ['Step 1: Identify knowns', 'oxygen mass is zero', 'Properties of Materials', 'mass never changes in ANY reaction'],
                  hint: 'Revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c6_chemistry_ch05_004 (Combustion.',
                  misconception: 'Students believe the Law of Conservation of Mass means "mass never changes in ANY reaction," so when they see magnesium ribbon burn in.' }
          ],
            remediations: { 'the-law-of-conservation-of': { steps: ['Re-do the magnesium burning as a CLASS DEMO with two setups — (A) open crucible, (B) crucible sealed with a lid having.', 'Show setup A gains mass, setup B gains nearly the same mass but stays closed.', 'Ask: "Where did the extra 1.6 g come from in A?" Guide them to "oxygen from air entered the crucible."', 'Redefine system boundary: "For the law to hold, you must weigh EVERYTHING that reacts — including invisible gases."'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Law of Conservation of Mass means "mass never changes in ANY reaction," so when they see magnesium.',
          parts: [
                { id: 'a', prompt: 'A student writes: "2HgO → 2Hg + O₂. Initial mass: 100 g HgO. Final mass: 100 g Hg + 16 g O₂ = 116 g.', answer: 'Correct evaluation: "The claim is false',
                  options: ['Correct evaluation: "The claim is false', 'mass never changes in ANY reaction', 'the law is broken'],
                  hint: 'Revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c6_chemistry_ch05_004 (Combustion.',
                  misconception: 'Students believe the Law of Conservation of Mass means "mass never changes in ANY reaction," so when they see magnesium ribbon burn in.' }
          ],
            remediations: { 'the-law-of-conservation-of': { steps: ['Re-do the magnesium burning as a CLASS DEMO with two setups — (A) open crucible, (B) crucible sealed with a lid having.', 'Show setup A gains mass, setup B gains nearly the same mass but stays closed.', 'Ask: "Where did the extra 1.6 g come from in A?" Guide them to "oxygen from air entered the crucible."', 'Redefine system boundary: "For the law to hold, you must weigh EVERYTHING that reacts — including invisible gases."'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_10', difficulty: 'standard',
          question: 'Formula unit mass is the sum of the atomic masses of all atoms present in.',
          hint: 'If stuck, revisit c9_chem_ch3_6 (valency cross-over method) and c9_chem_ch3_7 (common.',
          misconception: 'Students treat the subscript outside parentheses in polyatomic ions as applying only to the first atom inside.',
          parts: [
                { id: 'a', prompt: 'Compare the formula unit mass of Na₂O (Na=23, O=16) and MgO (Mg=24, O=16). Which is greater and by how much?', answer: 'Na₂O = 2(23) + 16 = 62 u',
                  options: ['Na₂O = 2(23) + 16 = 62 u', 'MgO is heavier because Mg > Na, or calculating difference as 1 u'],
                  hint: 'If stuck, revisit c9_chem_ch3_6 (valency cross-over method) and c9_chem_ch3_7 (common polyatomic.',
                  misconception: 'Students treat the subscript outside parentheses in polyatomic ions as applying only to the first atom inside.' }
          ],
            remediations: { 'students-treat-the-subscript-outside': { steps: ['Revisit c9_chem_ch3_6 (Writing Chemical Formulae) and practice expanding 5 formulas with brackets: e.g., Al₂(SO₄)₃.', 'For each, write the expanded atom count explicitly (e.g., Al₂S₃O₁₂).', 'Then calculate formula unit mass for each using atomic masses.', 'Create a flashcard: "Ionic = Formula Unit Mass, Covalent = Molecular Mass" and quiz yourself with 10 random formulas.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_2', difficulty: 'standard',
          question: 'The Law of Constant Proportions states that a given chemical compound always.',
          hint: 'If stuck, review c8_chem_ch3_10 (Difference Between Mixtures and Compounds) and practice.',
          misconception: 'Students often believe the Law of Constant Proportions applies to the total mass of reactants and products (e.g., "2g.',
          parts: [
                { id: 'a', prompt: 'In an experiment, 2.0g of hydrogen combines completely with 16.0g of oxygen to form water.', answer: 'Correct answer: Mass ratio H:O = 2:16 = 1:8',
                  options: ['Correct answer: Mass ratio H:O = 2:16 = 1:8', '2g hydrogen + 16g oxygen → 18g water, so the law means total mass is fixed'],
                  hint: 'If stuck, review c8_chem_ch3_10 (Difference Between Mixtures and Compounds) and practice.',
                  misconception: 'Students often believe the Law of Constant Proportions applies to the total mass of reactants and products (e.g., "2g hydrogen + 16g oxygen.' },
                { id: 'b', prompt: 'Two samples of a compound containing only carbon and oxygen are analysed. Sample A: 12.0g C, 32.0g O. Sample B: 6.0g C, 16.0g O.', answer: 'Correct answer: Sample A ratio C:O = 12:32 = 3:8',
                  options: ['Correct answer: Sample A ratio C:O = 12:32 = 3:8', '2g hydrogen + 16g oxygen → 18g water, so the law means total mass is fixed', 'any carbon-oxygen compound must follow one fixed ratio'],
                  hint: 'If stuck, review c8_chem_ch3_10 (Difference Between Mixtures and Compounds) and practice.',
                  misconception: 'Students often believe the Law of Constant Proportions applies to the total mass of reactants and products (e.g., "2g hydrogen + 16g oxygen.' }
          ],
            remediations: { 'the-law-of-constant-proportions': { steps: ['Revisit c9_chem_ch3_1 (Law of Conservation of Mass) and create a two-column table contrasting the two laws — one column.', 'Take a specific reaction (e.g., 2Mg + O₂ → 2MgO) and calculate both: show total mass is conserved AND Mg:O ratio in MgO.', 'Practice with incomplete reaction data: "10g Mg + 10g O₂ → ?" — identify limiting reactant, find mass of MgO formed.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_3', difficulty: 'standard',
          question: 'Dalton\'s Atomic Theory proposes that all matter is composed of indivisible.',
          hint: 'If stuck, revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c8_chem_ch3_10.',
          misconception: 'Students believe that because Dalton\'s postulate of atomic indivisibility is wrong, the entire theory is useless for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dalton\'s Atomic Theory proposes that all matter is composed of indivisible particles',
                  options: ['Dalton\'s Atomic Theory proposes that all matter is composed of indivisible particles', 'The Law of Conservation of Mass states that in any chemical reaction occurring in a', 'Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit', 'The Law of Constant Proportions states that a given chemical compound always contains its'],
                  hint: 'If stuck, revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c8_chem_ch3_10 (Difference.',
                  misconception: 'Students believe that because Dalton\'s postulate of atomic indivisibility is wrong, the entire theory is useless for chemistry.' }
          ],
            remediations: { 'because-dalton-s-postulate-of': { steps: ['Have the student write the nuclear equation for alpha decay (²³⁸U → ²³⁴Th + ⁴He) and the chemical equation for water.', 'Ask them to circle any atom that changes identity (proton number) in each equation.', 'Guide them to see that in the nuclear equation, uranium (Z=92) becomes thorium (Z=90) - identity changes; in the.', 'Conclude: Dalton\'s "indivisible atom" refers to the *chemical* atom (nucleus + electrons as a unit that retains Z), not.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_4', difficulty: 'standard',
          question: 'A covalent bond is a chemical bond formed by the mutual sharing of one or more.',
          hint: 'If stuck, revisit Class 8 "Atoms: Smallest Unit of an Element" (c8_chem_ch2_3) and.',
          misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each.',
          parts: [
                { id: 'a', prompt: 'Why do two chlorine atoms share *one* pair of electrons to form Cl₂, while two oxygen atoms share *two* pairs to form O₂?', answer: 'Chlorine (Group 17) has 7 valence electrons',
                  options: ['Chlorine (Group 17) has 7 valence electrons', 'chlorine shares 2 pairs'],
                  hint: 'If stuck, revisit Class 8 "Atoms: Smallest Unit of an Element" (c8_chem_ch2_3) and "Molecules.',
                  misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each atom shares one.' },
                { id: 'b', prompt: 'Compare the Lewis structures of N₂ and CH₄. Both satisfy the octet rule, but nitrogen forms a triple bond while carbon forms four single bonds.', answer: 'Nitrogen (Group 15) has 5 valence electrons',
                  options: ['Nitrogen (Group 15) has 5 valence electrons', 'nitrogen is smaller so it forms triple bond'],
                  hint: 'If stuck, revisit Class 8 "Atoms: Smallest Unit of an Element" (c8_chem_ch2_3) and "Molecules.',
                  misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each atom shares one.' }
          ],
            remediations: { 'students-often-draw-a-single': { steps: ['Have the student list valence electrons for O (Group 16 → 6) and H (Group 1 → 1).', 'Ask: "How many electrons does O *need* to reach 8?" (Answer: 2).', 'Use two colored pens: draw O nucleus, place 6 dots around it.', 'Draw second O with 6 dots.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_5', difficulty: 'standard',
          question: 'Ionic bonding is the electrostatic attraction between positively charged metal.',
          hint: 'Review c8_chem_ch2_3 (Atoms: Smallest Unit) for electron shell filling and c8_chem_ch3_8.',
          misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.',
          parts: [
                { id: 'a', prompt: 'Magnesium (atomic number 12) reacts with oxygen (atomic number 8) to form magnesium oxide.', answer: 'Mg (2,8,2) loses 2 electrons → Mg²⁺ (2,8)',
                  options: ['Mg (2,8,2) loses 2 electrons → Mg²⁺ (2,8)', 'two Mg atoms needed'],
                  hint: 'Review c8_chem_ch2_3 (Atoms: Smallest Unit) for electron shell filling and c8_chem_ch3_8 (Elements).',
                  misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.' },
                { id: 'b', prompt: 'Compare the electron transfer process in NaCl formation vs MgO formation.', answer: 'NaCl: Na (23 u) loses 1e⁻ → Na⁺',
                  options: ['NaCl: Na (23 u) loses 1e⁻ → Na⁺', 'MgO should be heavier', 'transferred electrons add mass, but electron mass is negligible'],
                  hint: 'Review c8_chem_ch2_3 (Atoms: Smallest Unit) for electron shell filling and c8_chem_ch3_8 (Elements).',
                  misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.' }
          ],
            remediations: { 'students-write-the-criss-cross': { steps: ['Have student write electron configurations for Mg (2,8,2) and O (2,6).', 'Show Mg loses 2e⁻ → Mg²⁺, O gains 2e⁻ → O²⁺.', 'Ask "How many Mg²⁺ ions balance one O²⁻ ion?" Answer: One each because +2 and -2 cancel.', 'Write Mg₁O₁, then simplify to MgO.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
