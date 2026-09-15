import type { SimDef } from '../../engine/types';

/** v3 generated — c9_chem_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_chem_ch03_p2: SimDef = {
    id: 'v3_c9_chem_ch03_p2',
    title: 'Chemical Bonding and Chemical Formulae · Part 2/2',
    subtitle: 'The disappearing mass that never disappears',
    classLevel: 9, subject: 'chemistry', topic: 'Chemical Bonding and Chemical Formulae · Part 2/2',
    chapters: ['c9_chem_ch03'],
    nodeIds: ['c9_chem_ch3_6', 'c9_chem_ch3_7', 'c9_chem_ch3_8', 'c9_chem_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mass-accounting chemist', intro: 'A candle \'vanishes\', a metal \'gains weight\' — chemical reactions look like they cheat the scales. One sealed container exposes the trick: count the gases.', goal: 'Understand the Law of Conservation of Mass — reactant mass equals product mass in a closed system because atoms only rearrange — and apply it to find missing masses.' },
    discovery: {
        question: 'Magnesium ribbon burns in an open dish and GAINS mass (2.4 g Mg → 4.0 g MgO). Did the reaction just create matter out of thin air?',
        options: ['No — invisible oxygen from the air joined the reaction; weigh it too and the mass balances perfectly', 'Yes — burning creates mass', 'The balance was broken', 'The ash was contaminated with dust'],
        answer: 'No — invisible oxygen from the air joined the reaction; weigh it too and the mass balances perfectly',
        hook: 'The law only guards a CLOSED system. Lavoisier\'s sealed retort trapped the escaping oxygen; an open crucible lets gases sneak in or out, so the scale \'lies\'. Atoms never appear or vanish — they only rearrange.',
    },
    teaching: [
        { title: 'Writing Chemical Formulae: Rules and Valency Cross Method', text: 'The valency cross method is a systematic rule for writing the chemical formula of a compound by crossing over the numerical valencies of the combining ions or elements (cations and anions) to become.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_chem_ch3_6', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Replay Lavoisier\'s 1774 sealed-retort experiment, hunt down the missing 7.2 g of oxygen, then verify the law yourself with vinegar and baking soda — balloon over the flask so the CO₂ can\'t escape.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_6', title: 'Writing Chemical Formulae: Rules and Valency Cross Method',
          scaffold: { problem: 'Write the chemical formula of iron(III) sulfate. (Iron(III) means Fe³⁺; sulfate is SO₄²⁻).',
            steps: [
            { text: 'Identify the cation and anion with their valencies. Cation = Fe³⁺ (valency 3). Anion = SO₄²⁻ (valency 2).' },
            { text: 'Write the symbols side by side with valencies as superscripts: Fe³⁺ SO₄²⁻.' },
            { text: 'Apply the cross method: cross the valency 3 to the sulfate and valency 2 to the iron. This gives Fe₂(SO₄)₃.' },
            { text: 'Check for simplification. The subscripts 2 and 3 have no common factor, so the formula is already in simplest ratio.' },
            { text: 'Verify charge neutrality: 2 × (+3) + 3 × (-2) = +6 - 6 = 0. The compound is neutral.', faded: true, blankAnswer: 'Fe₂(SO₄)₃' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch3_8', title: 'Properties of Ionic Compounds vs Covalent Compounds',
          caseStudy: { intro: 'Begin with a real-world observation: ask students why common salt (NaCl) dissolves in water and conducts electricity when dissolved, while sugar (C₁₂H₂₂O₁₁).',
            decisions: [{ prompt: 'Name two ionic compounds and two covalent compounds you encounter daily, and state their chemical formulas.', options: [
                { text: 'Correct answer: Ionic – Sodium chloride (NaCl), Calcium carbonate (CaCO₃)', outcome: 'Correct answer: Ionic – Sodium chloride (NaCl), Calcium carbonate (CaCO₃); Covalent – Water (H₂O).' },
                { text: 'HCl as covalent without noting it ionizes in water, or listing CO₂ as ionic', outcome: 'Not quite — Students often think that because HCl is a gas and dissolves in water to conduct electricity, it.', reveals: 'because-hcl-is-a-gas' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_9', title: 'Molecular Mass: Calculation from Chemical Formulae',
          scaffold: { problem: 'Calculate the molecular mass of glucose (C₆H₁₂O₆) used in ORS packets. Atomic masses: C = 12 u, H = 1 u, O = 16 u.',
            steps: [
            { text: 'Identify the chemical formula C₆H₁₂O₆ and note the number of atoms of each element: 6 carbon, 12 hydrogen, 6 oxygen.' },
            { text: 'Recall atomic masses from periodic table: C = 12 u, H = 1 u, O = 16 u.' },
            { text: 'Multiply each element\'s atomic mass by its number of atoms: Carbon = 6 × 12 u = 72 u; Hydrogen = 12 × 1 u = 12.' },
            { text: 'Sum all contributions: 72 u + 12 u + 96 u = 180 u.' },
            { text: 'Verify by checking if answer matches known glucose molecular mass (180 u) and ensure units are u not g/mol.', faded: true, blankAnswer: '180 u' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch3_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Repeating Lavoisier\'s experiment for the school lab, a group heats magnesium ribbon in an open crucible: 2.4 g in, 4.0 g of white ash out. \'Mass increased — the conservation law is broken!\' one declares.',
            decisions: [{ prompt: 'What actually happened to the extra mass?', options: [
                { text: 'Nothing was created — the open crucible let oxygen atoms from the air bond with the magnesium, and that borrowed 1.6 g is the gain. The law holds only in a closed system; seal the vessel as Lavoisier did and the total stays constant.', outcome: 'This redraws the system boundary correctly — the reactants included invisible oxygen, which has mass.' },
                { text: 'The student is right — a heavier product means mass was created, and laws have exceptions.', outcome: 'The exception is the weighing, not the law: counting only the solid reactant while air streamed in is an incomplete ledger.', reveals: 'law-has-exceptions' },
                { text: 'The gain is just trapped heat, since energy registers as mass on a balance.', outcome: 'A school balance cannot register heat; the extra grams are real oxygen atoms that joined the reaction from the air.', reveals: 'heat-adds-grams' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch3_9', title: 'You made it',
          caseStudy: { intro: 'In a closed system, mass in = mass out, always. Atoms are just rearranged furniture — nothing created, nothing destroyed. Let a gas escape the weigh-in and the law seems to break, but the atoms know better.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch3_6', difficulty: 'standard',
          question: 'The valency cross method is a systematic rule for writing the chemical formula.',
          hint: 'If stuck, revisit the valency tables in c9_chem_ch3_4 (covalent) and c9_chem_ch3_5.',
          misconception: 'Students frequently write the formula of sodium carbonate as NaCO₃ instead of Na₂CO₃ because they cross the valencies.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The valency cross method is a systematic rule for writing the chemical formula of a',
                  options: ['The valency cross method is a systematic rule for writing the chemical formula of a', 'The Law of Conservation of Mass states that in any chemical reaction occurring in a', 'Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit', 'The Law of Constant Proportions states that a given chemical compound always contains its'],
                  hint: 'If stuck, revisit the valency tables in c9_chem_ch3_4 (covalent) and c9_chem_ch3_5 (ionic) and.',
                  misconception: 'Students frequently write the formula of sodium carbonate as NaCO₃ instead of Na₂CO₃ because they cross the valencies (Na⁺ valency 1, CO₃²⁻.' }
          ],
            remediations: { 'students-frequently-write-the-formula': { steps: ['Give the student a "Valency Card" set: small cards with common ions and their valencies (e.g., Na⁺/1, Mg²⁺/2, Cl⁻/1.', 'Have them physically place a cation card and an anion card on a template with two crossing arrows drawn on paper.', 'They write the crossed numbers as subscripts on a mini-whiteboard, then explicitly check: "Is the total positive charge.', 'For polyatomic ions, provide a bracket stencil: they must place the ion card inside the bracket before writing the.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_7', difficulty: 'standard',
          question: 'Chemical formulae of common compounds represent the fixed ratio of atoms.',
          hint: 'If stuck, revisit the valency table in c9_chem_ch3_6 and practice the cross-over method.',
          misconception: 'Students often write the formula for calcium nitrate as CaNO₃ instead of Ca(NO₃)₂.',
          parts: [
                { id: 'a', prompt: 'Compare the formulae of sodium oxide (Na₂O) and magnesium oxide (MgO). Both contain oxygen with valency 2.', answer: 'Sodium has valency 1 (Na⁺), oxygen has valency 2 (O²⁻)',
                  options: ['Sodium has valency 1 (Na⁺), oxygen has valency 2 (O²⁻)', 'oxygen changes valency'],
                  hint: 'If stuck, revisit the valency table in c9_chem_ch3_6 and practice the cross-over method with binary.',
                  misconception: 'Students often write the formula for calcium nitrate as CaNO₃ instead of Ca(NO₃)₂.' }
          ],
            remediations: { 'students-often-write-the-formula': { steps: ['Have the student list the valencies of common polyatomic ions (sulfate, nitrate, carbonate, phosphate, ammonium) on.', 'Practice writing formulae for 5 compounds containing each polyatomic ion with metals of valency 1, 2, and 3 (e.g.', 'For each, explicitly write the charge balance equation: (metal subscript × metal charge) + (polyatomic subscript.', 'Emphasize the parentheses rule: "If the polyatomic ion\'s subscript is >1, wrap it in parentheses."'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_8', difficulty: 'standard',
          question: 'Ionic compounds are crystalline solids formed by electrostatic attraction.',
          hint: 'If stuck, revisit c9_chem_ch3_4 (covalent bonding) and c9_chem_ch3_5 (ionic bonding).',
          misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.',
          parts: [
                { id: 'a', prompt: 'Name two ionic compounds and two covalent compounds you encounter daily, and state their chemical formulas.', answer: 'Correct answer: Ionic – Sodium chloride (NaCl), Calcium carbonate (CaCO₃)',
                  options: ['Correct answer: Ionic – Sodium chloride (NaCl), Calcium carbonate (CaCO₃)', 'HCl as covalent without noting it ionizes in water, or listing CO₂ as ionic'],
                  hint: 'If stuck, revisit c9_chem_ch3_4 (covalent bonding) and c9_chem_ch3_5 (ionic bonding) to review.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' },
                { id: 'b', prompt: 'A white crystalline solid X has a high melting point (801°C), dissolves in water to give a conducting solution, but does not conduct in solid state.', answer: 'Correct answer: Ionic',
                  options: ['Correct answer: Ionic', 'covalent because it dissolves'],
                  hint: 'If stuck, revisit c9_chem_ch3_4 (covalent bonding) and c9_chem_ch3_5 (ionic bonding) to review.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' },
                { id: 'c', prompt: 'Compare the solubility of NaCl (ionic) and CCl₄ (covalent) in water and in benzene (organic solvent).', answer: 'Correct answer: NaCl dissolves in water (polar)',
                  options: ['Correct answer: NaCl dissolves in water (polar)', 'both dissolve in water', 'all compounds dissolve in water and does not link polarity to solubility'],
                  hint: 'If stuck, revisit c9_chem_ch3_4 (covalent bonding) and c9_chem_ch3_5 (ionic bonding) to review.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' }
          ],
            remediations: { 'because-hcl-is-a-gas': { steps: ['Show the student pure HCl gas (or video) – no conductivity, low boiling point (-85°C).', 'Demonstrate that dry HCl does not conduct, but aqueous HCl does.', 'Contrast with NaCl: solid NaCl is already ionic, melts at 801°C, conducts when molten without water.', 'Have the student write the distinction: "Ionic compounds exist as ions in pure state; covalent compounds like HCl form.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_9', difficulty: 'standard',
          question: 'Molecular mass is the sum of atomic masses of all atoms present in a molecule.',
          hint: 'Revisit c9_chem_ch3_6 (writing chemical formulae) focusing on bracket expansion.',
          misconception: 'Students treat brackets in formulae like parentheses in math - they multiply only the first element inside by the.',
          parts: [
                { id: 'a', prompt: 'Compare the molecular masses of ethanol (C₂H₅OH) and dimethyl ether (CH₃OCH₃). Both have formula C₂H₆O.', answer: 'Both have identical molecular mass = (2×12) + (6×1) + 16 = 46 u',
                  options: ['Both have identical molecular mass = (2×12) + (6×1) + 16 = 46 u', 'connectivity changes atomic composition'],
                  hint: 'Revisit c9_chem_ch3_6 (writing chemical formulae) focusing on bracket expansion exercises; practice.',
                  misconception: 'Students treat brackets in formulae like parentheses in math - they multiply only the first element inside by the outside subscript.' }
          ],
            remediations: { 'students-treat-brackets-in-formulae': { steps: ['Draw the formula with circles around each bracket group: Al₂ [SO₄] [SO₄] [SO₄].', 'Count atoms explicitly: Al=2, S=3, O=12.', 'Calculate each element separately: Al=2×27, S=3×32, O=12×16.', 'Practice with 5 examples of increasing bracket complexity: Mg(OH)₂, Ca₃(PO₄)₂, Fe₂(SO₄)₃, Al₂(SO₄)₃, (NH₄)₂SO₄.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
