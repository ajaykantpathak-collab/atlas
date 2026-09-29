import type { SimDef } from '../../engine/types';
import C9_ChemistryCovalentbondingSim from '../../../simulations/c6_12/C9_ChemistryCovalentbondingSim';

/** v3 wrapped master — C9_ChemistryCovalentbondingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_chemistrycovalentbondingsim: SimDef = {
    id: 'v3w_c9_chemistrycovalentbondingsim',
    title: 'Formula Unit Mass: Calculation for Ionic Compounds',
    subtitle: 'Covers calculation of formula unit mass for binary and polyatomic ionic compounds (e.g.,.',
    classLevel: 9, subject: 'chemistry', topic: 'Formula Unit Mass: Calculation for Ionic Compounds',
    chapters: [],
    nodeIds: ['c9_chem_ch3_10', 'c9_chem_ch3_4', 'c9_chem_ch3_5', 'c9_chem_ch3_8', 'c9_chem_ch3_6', 'c9_chem_ch3_7', 'c9_chem_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you have a pinch of common salt (NaCl) from your kitchen.', goal: 'Master Formula Unit Mass: Calculation for Ionic Compounds.' },
    discovery: {
        question: 'Compare the electron transfer process in NaCl formation vs MgO formation.',
        options: ['NaCl: Na (23 u) loses 1e⁻ → Na⁺', 'MgO should be heavier', 'transferred electrons add mass, but electron mass is negligible'],
        answer: 'NaCl: Na (23 u) loses 1e⁻ → Na⁺',
        hook: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.',
    },
    teaching: [
        { title: 'Formula unit mass is the sum of the atomic.', text: 'Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit of an ionic compound, expressed in atomic mass units (u).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_chem_ch3_10', title: 'Formula unit mass is the sum of the.',
          scaffold: { problem: 'Calculate the formula unit mass of ammonium sulfate, (NH₄)₂SO₄. Atomic masses: N=14 u, H=1 u, S=32 u, O=16 u.',
            steps: [
            { text: 'Identify the formula and expand brackets: (NH₄)₂SO₄ means 2 × (N₁H₄) + S₁O₄ = N₂H₈SO₄.' },
            { text: 'List each element with its total atom count: N=2, H=8, S=1, O=4.' },
            { text: 'Multiply each atom count by its atomic mass: N: 2 × 14 u = 28 u; H: 8 × 1 u = 8 u; S: 1 × 32 u = 32 u; O: 4 × 16 u = 64.' },
            { text: 'Sum all contributions: 28 u + 8 u + 32 u + 64 u = 132 u.' },
            { text: 'Verify by checking atom balance and units: Total mass = 132 u.', faded: true, blankAnswer: '132 u' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_4', title: 'A covalent bond is a chemical bond.',
          scaffold: { problem: 'Draw the Lewis dot structure for ammonia (NH₃). Nitrogen is in Group 15, hydrogen in Group 1.',
            steps: [
            { text: 'Identify valence electrons. Nitrogen (Group 15) has 5 valence electrons.' },
            { text: 'Choose central atom. Nitrogen is less electronegative than hydrogen and can form multiple bonds; hydrogen can only form.' },
            { text: 'Form single bonds. Place one electron from N and one from each H between them to form three N-H single bonds.' },
            { text: 'Place remaining electrons as lone pairs. After forming 3 bonds, 2 electrons remain (8 total - 6 used = 2).' },
            { text: 'Verify octet/duplet. Each H: 2 electrons (1 bond) ✓. N: 3 bonding pairs (6 electrons) + 1 lone pair (2 electrons) = 8.', faded: true, blankAnswer: 'Lewis structure: H-N-H with a lone pair on N (often written.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_5', title: 'Ionic bonding is the electrostatic.',
          scaffold: { problem: 'Potassium (atomic number 19) reacts with sulphur (atomic number 16) to form potassium sulphide.',
            steps: [
            { text: 'Write electron configurations: K (2,8,8,1) has 1 valence electron in Group 1; S (2,8,6) has 6 valence electrons in.' },
            { text: 'Show electron transfer: Each K loses 1 electron → K⁺ (2,8,8); Each S gains 2 electrons → S²⁻ (2,8,8).' },
            { text: 'Draw dot structures: K· + K· + :S: → [K]⁺ + [K]⁺ + [:S:]²⁻ (with 8 dots around S²⁻).' },
            { text: 'Criss-cross charges: K⁺ and S²⁻ → K₂S (cross 1 and 2, reduce to simplest ratio).' },
            { text: 'Balance equation: 2K + S → K₂S. Verify: 2 K atoms, 1 S atom on both sides; charges balanced in product.', faded: true, blankAnswer: 'K (2,8,8,1) → K⁺ + e⁻; S (2,8,6) + 2e⁻ → S²⁻; Formula: K₂S;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_8', title: 'Ionic compounds are crystalline solids.',
          scaffold: { problem: 'A student has two white crystalline solids, A and B. Solid A melts at 801°C, conducts electricity when dissolved in water but not in solid.',
            steps: [
            { text: 'Analyze melting points – A has very high MP (801°C) indicating strong forces throughout a giant structure; B has.' },
            { text: 'Analyze conductivity – A conducts only in solution, meaning charged particles are mobile only when the rigid structure.' },
            { text: 'Link to bonding – A is ionic (giant lattice of ions); B is covalent (discrete molecules).' },
            { text: 'Predict formulas – A likely formed from metal + non-metal (e.g., NaCl); B likely formed from non-metal + non-metal.' },
            { text: 'Verify with solubility – A should dissolve in water (polar) but not in organic solvents; B may dissolve in organic.', faded: true, blankAnswer: 'A is ionic (e.g., NaCl); B is covalent molecular (e.g.,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_6', title: 'The valency cross method is a.',
          scaffold: { problem: 'Write the chemical formula of iron(III) sulfate. (Iron(III) means Fe³⁺; sulfate is SO₄²⁻).',
            steps: [
            { text: 'Identify the cation and anion with their valencies. Cation = Fe³⁺ (valency 3). Anion = SO₄²⁻ (valency 2).' },
            { text: 'Write the symbols side by side with valencies as superscripts: Fe³⁺ SO₄²⁻.' },
            { text: 'Apply the cross method: cross the valency 3 to the sulfate and valency 2 to the iron. This gives Fe₂(SO₄)₃.' },
            { text: 'Check for simplification. The subscripts 2 and 3 have no common factor, so the formula is already in simplest ratio.' },
            { text: 'Verify charge neutrality: 2 × (+3) + 3 × (-2) = +6 - 6 = 0. The compound is neutral.', faded: true, blankAnswer: 'Fe₂(SO₄)₃' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch3_7', title: 'Chemical formulae of common compounds.',
          scaffold: { problem: 'Write the chemical formula for aluminium sulfate, given that aluminium has valency 3 and sulfate ion (SO₄) has valency 2.',
            steps: [
            { text: 'Identify the cation and anion. Cation = Aluminium (Al), Anion = Sulfate (SO₄).' },
            { text: 'Write their valencies as charges: Al³⁺ and SO₄²⁻.' },
            { text: 'Apply the cross-over rule: the magnitude of the cation\'s charge (3) becomes the subscript of the anion, and the.' },
            { text: 'Since the anion is a polyatomic ion and its subscript is 3 (>1), enclose it in parentheses: Al₂(SO₄)₃.' },
            { text: 'Verify charge neutrality: 2 × (+3) = +6; 3 × (-2) = -6; Sum = 0. The formula is correct.', faded: true, blankAnswer: 'Al₂(SO₄)₃' }
            ] } },
        { type: 'dissect', nodeId: 'c9_chem_ch3_4', title: 'Identify each idea',
          dissect: { specimen: 'Formula Unit Mass: Calculation for Ionic Compounds', spots: [
            { id: 's1', label: 'Formula unit mass is the', prompt: 'Which idea is this? — Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit.', answer: 'Formula unit mass is the', options: ['Formula unit mass is the', 'A covalent bond is a', 'Ionic bonding is the electrostatic', 'Ionic compounds are crystalline solids'] },
            { id: 's2', label: 'A covalent bond is a', prompt: 'Which idea is this? — A covalent bond is a chemical bond formed by the mutual sharing of one or more pairs of.', answer: 'A covalent bond is a', options: ['A covalent bond is a', 'Formula unit mass is the', 'Ionic bonding is the electrostatic', 'Ionic compounds are crystalline solids'] },
            { id: 's3', label: 'Ionic bonding is the electrostatic', prompt: 'Which idea is this? — Ionic bonding is the electrostatic attraction between positively charged metal cations.', answer: 'Ionic bonding is the electrostatic', options: ['Ionic bonding is the electrostatic', 'Formula unit mass is the', 'A covalent bond is a', 'Ionic compounds are crystalline solids'] },
            { id: 's4', label: 'Ionic compounds are crystalline solids', prompt: 'Which idea is this? — Ionic compounds are crystalline solids formed by electrostatic attraction between cations.', answer: 'Ionic compounds are crystalline solids', options: ['Ionic compounds are crystalline solids', 'Formula unit mass is the', 'A covalent bond is a', 'Ionic bonding is the electrostatic'] },
            { id: 's5', label: 'The valency cross method is', prompt: 'Which idea is this? — The valency cross method is a systematic rule for writing the chemical formula of a.', answer: 'The valency cross method is', options: ['The valency cross method is', 'Formula unit mass is the', 'A covalent bond is a', 'Ionic bonding is the electrostatic'] },
            { id: 's6', label: 'Chemical formulae of common compounds', prompt: 'Which idea is this? — Chemical formulae of common compounds represent the fixed ratio of atoms of each element.', answer: 'Chemical formulae of common compounds', options: ['Chemical formulae of common compounds', 'Formula unit mass is the', 'A covalent bond is a', 'Ionic bonding is the electrostatic'] }
          ] } }
    ],
    explore: { component: C9_ChemistryCovalentbondingSim, prompt: 'Explore the interactive — Formula Unit Mass: Calculation for Ionic Compounds' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch3_10', difficulty: 'standard',
          question: 'Formula unit mass is the sum of the atomic masses of all atoms present in a.',
          hint: 'If stuck, revisit c9_chem_ch3_6 (valency cross-over method) and c9_chem_ch3_7 (common.',
          misconception: 'Students treat the subscript outside parentheses in polyatomic ions as applying only to the first atom inside.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit',
                  options: ['Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit', 'A covalent bond is a chemical bond formed by the mutual sharing of one or more pairs of', 'Ionic bonding is the electrostatic attraction between positively charged metal cations', 'Ionic compounds are crystalline solids formed by electrostatic attraction between cations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the subscript outside parentheses in polyatomic ions as applying only to the first atom inside.' }
          ],
            remediations: { 'students-treat-the-subscript-outside': { steps: ['Revisit c9_chem_ch3_6 (Writing Chemical Formulae) and practice expanding 5 formulas with brackets: e.g., Al₂(SO₄)₃,.', 'For each, write the expanded atom count explicitly (e.g., Al₂S₃O₁₂).', 'Then calculate formula unit mass for each using atomic masses.', 'Create a flashcard: "Ionic = Formula Unit Mass, Covalent = Molecular Mass" and quiz yourself with 10 random formulas.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_4', difficulty: 'standard',
          question: 'A covalent bond is a chemical bond formed by the mutual sharing of one or more.',
          hint: 'If stuck, revisit Class 8 "Atoms: Smallest Unit of an Element" (c8_chem_ch2_3) and.',
          misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each.',
          parts: [
                { id: 'a', prompt: 'Why do two chlorine atoms share *one* pair of electrons to form Cl₂, while two oxygen atoms share *two* pairs to form O₂?', answer: 'Chlorine (Group 17) has 7 valence electrons',
                  options: ['Chlorine (Group 17) has 7 valence electrons', 'chlorine shares 2 pairs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each atom shares one.' },
                { id: 'b', prompt: 'Compare the Lewis structures of N₂ and CH₄. Both satisfy the octet rule, but nitrogen forms a triple bond while carbon forms four single bonds.', answer: 'Nitrogen (Group 15) has 5 valence electrons',
                  options: ['Nitrogen (Group 15) has 5 valence electrons', 'nitrogen is smaller so it forms triple bond'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each atom shares one.' }
          ],
            remediations: { 'students-often-draw-a-single': { steps: ['Have the student list valence electrons for O (Group 16 → 6) and H (Group 1 → 1).', 'Ask: "How many electrons does O *need* to reach 8?" (Answer: 2).', 'Use two colored pens: draw O nucleus, place 6 dots around it.', 'Draw second O with 6 dots.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each.',
          parts: [
                { id: 'a', prompt: 'A student draws the Lewis structure for water (H₂O) as H-O-H with two lone pairs on oxygen, but writes the shared pairs as single dots (·) instead of paired.', answer: 'The representation is *incorrect* for a covalent bond',
                  options: ['The representation is *incorrect* for a covalent bond', 'it\'s fine, dots show electrons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each atom shares one.' },
                { id: 'b', prompt: 'Compare the Lewis structures of N₂ and CH₄. Both satisfy the octet rule, but nitrogen forms a triple bond while carbon forms four single bonds.', answer: 'Nitrogen (Group 15) has 5 valence electrons',
                  options: ['Nitrogen (Group 15) has 5 valence electrons', 'nitrogen is smaller so it forms triple bond'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw a single bond between two oxygen atoms in O₂ (O-O with 3 lone pairs each) because they think "each atom shares one.' }
          ],
            remediations: { 'students-often-draw-a-single': { steps: ['Have the student list valence electrons for O (Group 16 → 6) and H (Group 1 → 1).', 'Ask: "How many electrons does O *need* to reach 8?" (Answer: 2).', 'Use two colored pens: draw O nucleus, place 6 dots around it.', 'Draw second O with 6 dots.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_5', difficulty: 'standard',
          question: 'Ionic bonding is the electrostatic attraction between positively charged metal.',
          hint: 'Review c8_chem_ch2_3 (Atoms: Smallest Unit) for electron shell filling and c8_chem_ch3_8.',
          misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.',
          parts: [
                { id: 'a', prompt: 'Magnesium (atomic number 12) reacts with oxygen (atomic number 8) to form magnesium oxide.', answer: 'Mg (2,8,2) loses 2 electrons → Mg²⁺ (2,8)',
                  options: ['Mg (2,8,2) loses 2 electrons → Mg²⁺ (2,8)', 'two Mg atoms needed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.' },
                { id: 'b', prompt: 'Compare the electron transfer process in NaCl formation vs MgO formation.', answer: 'NaCl: Na (23 u) loses 1e⁻ → Na⁺',
                  options: ['NaCl: Na (23 u) loses 1e⁻ → Na⁺', 'MgO should be heavier', 'transferred electrons add mass, but electron mass is negligible'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.' }
          ],
            remediations: { 'students-write-the-criss-cross': { steps: ['Have student write electron configurations for Mg (2,8,2) and O (2,6).', 'Show Mg loses 2e⁻ → Mg²⁺, O gains 2e⁻ → O²⁺.', 'Ask "How many Mg²⁺ ions balance one O²⁻ ion?" Answer: One each because +2 and -2 cancel.', 'Write Mg₁O₁, then simplify to MgO.', 'Repeat for CaCl₂: Ca²⁺ needs two Cl⁻ → Ca₁Cl₂ = CaCl₂.', 'Give practice: Na₂O, Mg₃N₂, Al₂O₃ - each time verbalise "charges cancel in simplest ratio."'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.',
          parts: [
                { id: 'a', prompt: 'Compare the electron transfer process in NaCl formation vs MgO formation.', answer: 'NaCl: Na (23 u) loses 1e⁻ → Na⁺',
                  options: ['NaCl: Na (23 u) loses 1e⁻ → Na⁺', 'MgO should be heavier', 'transferred electrons add mass, but electron mass is negligible'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the criss-cross method for formula writing but forget to reduce subscripts to simplest ratio.' }
          ],
            remediations: { 'students-write-the-criss-cross': { steps: ['Have student write electron configurations for Mg (2,8,2) and O (2,6).', 'Show Mg loses 2e⁻ → Mg²⁺, O gains 2e⁻ → O²⁺.', 'Ask "How many Mg²⁺ ions balance one O²⁻ ion?" Answer: One each because +2 and -2 cancel.', 'Write Mg₁O₁, then simplify to MgO.', 'Repeat for CaCl₂: Ca²⁺ needs two Cl⁻ → Ca₁Cl₂ = CaCl₂.', 'Give practice: Na₂O, Mg₃N₂, Al₂O₃ - each time verbalise "charges cancel in simplest ratio."'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_8', difficulty: 'standard',
          question: 'Ionic compounds are crystalline solids formed by electrostatic attraction.',
          hint: 'If stuck, revisit c9_chem_ch3_4 (covalent bonding) and c9_chem_ch3_5 (ionic bonding) to.',
          misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.',
          parts: [
                { id: 'a', prompt: 'A white crystalline solid X has a high melting point (801°C), dissolves in water to give a conducting solution, but does not conduct in solid state.', answer: 'Ionic',
                  options: ['Correct answer: Ionic', 'covalent because it dissolves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' },
                { id: 'b', prompt: 'Compare the solubility of NaCl (ionic) and CCl₄ (covalent) in water and in benzene (organic solvent).', answer: 'NaCl dissolves in water (polar)',
                  options: ['Correct answer: NaCl dissolves in water (polar)', 'both dissolve in water', 'all compounds dissolve in water and does not link polarity to solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' }
          ],
            remediations: { 'because-hcl-is-a-gas': { steps: ['Show the student pure HCl gas (or video) – no conductivity, low boiling point (-85°C).', 'Demonstrate that dry HCl does not conduct, but aqueous HCl does.', 'Contrast with NaCl: solid NaCl is already ionic, melts at 801°C, conducts when molten without water.', 'Have the student write the distinction: "Ionic compounds exist as ions in pure state; covalent compounds like HCl form.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.',
          parts: [
                { id: 'a', prompt: 'Compare the solubility of NaCl (ionic) and CCl₄ (covalent) in water and in benzene (organic solvent).', answer: 'NaCl dissolves in water (polar)',
                  options: ['Correct answer: NaCl dissolves in water (polar)', 'both dissolve in water', 'all compounds dissolve in water and does not link polarity to solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' }
          ],
            remediations: { 'because-hcl-is-a-gas': { steps: ['Show the student pure HCl gas (or video) – no conductivity, low boiling point (-85°C).', 'Demonstrate that dry HCl does not conduct, but aqueous HCl does.', 'Contrast with NaCl: solid NaCl is already ionic, melts at 801°C, conducts when molten without water.', 'Have the student write the distinction: "Ionic compounds exist as ions in pure state; covalent compounds like HCl form.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_6', difficulty: 'standard',
          question: 'The valency cross method is a systematic rule for writing the chemical formula.',
          hint: 'If stuck, revisit the valency tables in c9_chem_ch3_4 (covalent) and c9_chem_ch3_5.',
          misconception: 'Students frequently write the formula of sodium carbonate as NaCO₃ instead of Na₂CO₃ because they cross the valencies.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The valency cross method is a systematic rule for writing the chemical formula of a',
                  options: ['The valency cross method is a systematic rule for writing the chemical formula of a', 'Formula unit mass is the sum of the atomic masses of all atoms present in a formula unit', 'A covalent bond is a chemical bond formed by the mutual sharing of one or more pairs of', 'Ionic bonding is the electrostatic attraction between positively charged metal cations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently write the formula of sodium carbonate as NaCO₃ instead of Na₂CO₃ because they cross the valencies (Na⁺ valency 1, CO₃²⁻.' }
          ],
            remediations: { 'students-frequently-write-the-formula': { steps: ['Give the student a "Valency Card" set: small cards with common ions and their valencies (e.g., Na⁺/1, Mg²⁺/2, Cl⁻/1,.', 'Have them physically place a cation card and an anion card on a template with two crossing arrows drawn on paper.', 'They write the crossed numbers as subscripts on a mini-whiteboard, then explicitly check: "Is the total positive charge.', 'For polyatomic ions, provide a bracket stencil: they must place the ion card inside the bracket before writing the.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_7', difficulty: 'standard',
          question: 'Chemical formulae of common compounds represent the fixed ratio of atoms of.',
          hint: 'If stuck, revisit the valency table in c9_chem_ch3_6 and practice the cross-over method.',
          misconception: 'Students often write the formula for calcium nitrate as CaNO₃ instead of Ca(NO₃)₂.',
          parts: [
                { id: 'a', prompt: 'Compare the formulae of sodium oxide (Na₂O) and magnesium oxide (MgO). Both contain oxygen with valency 2.', answer: 'Sodium has valency 1 (Na⁺), oxygen has valency 2 (O²⁻)',
                  options: ['Sodium has valency 1 (Na⁺), oxygen has valency 2 (O²⁻)', 'oxygen changes valency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the formula for calcium nitrate as CaNO₃ instead of Ca(NO₃)₂.' }
          ],
            remediations: { 'students-often-write-the-formula': { steps: ['Have the student list the valencies of common polyatomic ions (sulfate, nitrate, carbonate, phosphate, ammonium) on a.', 'Practice writing formulae for 5 compounds containing each polyatomic ion with metals of valency 1, 2, and 3 (e.g.,.', 'For each, explicitly write the charge balance equation: (metal subscript × metal charge) + (polyatomic subscript ×.', 'Emphasize the parentheses rule: "If the polyatomic ion\'s subscript is >1, wrap it in parentheses."', 'Use a colour-coded worksheet: cation (red), anion (blue), parentheses (green) to visually reinforce the structure.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the formula for calcium nitrate as CaNO₃ instead of Ca(NO₃)₂.',
          parts: [
                { id: 'a', prompt: 'Compare the formulae of sodium oxide (Na₂O) and magnesium oxide (MgO). Both contain oxygen with valency 2.', answer: 'Sodium has valency 1 (Na⁺), oxygen has valency 2 (O²⁻)',
                  options: ['Sodium has valency 1 (Na⁺), oxygen has valency 2 (O²⁻)', 'oxygen changes valency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the formula for calcium nitrate as CaNO₃ instead of Ca(NO₃)₂.' }
          ],
            remediations: { 'students-often-write-the-formula': { steps: ['Have the student list the valencies of common polyatomic ions (sulfate, nitrate, carbonate, phosphate, ammonium) on a.', 'Practice writing formulae for 5 compounds containing each polyatomic ion with metals of valency 1, 2, and 3 (e.g.,.', 'For each, explicitly write the charge balance equation: (metal subscript × metal charge) + (polyatomic subscript ×.', 'Emphasize the parentheses rule: "If the polyatomic ion\'s subscript is >1, wrap it in parentheses."', 'Use a colour-coded worksheet: cation (red), anion (blue), parentheses (green) to visually reinforce the structure.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
