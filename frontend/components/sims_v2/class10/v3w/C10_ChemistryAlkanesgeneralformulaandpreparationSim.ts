import type { SimDef } from '../../engine/types';
import C10_ChemistryAlkanesgeneralformulaandpreparationSim from '../../../simulations/c6_12/C10_ChemistryAlkanesgeneralformulaandpreparationSim';

/** v3 wrapped master — C10_ChemistryAlkanesgeneralformulaandpreparationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_chemistryalkanesgeneralformulaandpreparationsim: SimDef = {
    id: 'v3w_c10_chemistryalkanesgeneralformulaandpreparationsim',
    title: 'Soaps and Detergents: Structure, Action and Difference',
    subtitle: 'This node covers the molecular structure of soaps and detergents, their cleansing action.',
    classLevel: 10, subject: 'chemistry', topic: 'Soaps and Detergents: Structure, Action and Difference',
    chapters: [],
    nodeIds: ['c10_chem_cbse_04_012', 'c10_chem_cbse_04_004', 'c10_chem_cbse_04_007', 'c10_chem_cbse_04_002', 'c10_chem_cbse_04_005', 'c10_chem_cbse_04_008', 'c10_chem_cbse_04_006', 'c10_chem_cbse_02_001', 'c10_chem_cbse_02_012', 'c10_chem_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a greasy plate after eating oily Indian food like parathas or pakoras.', goal: 'Master Soaps and Detergents: Structure, Action and Difference.' },
    discovery: {
        question: 'A student takes 5 g of castor oil (a triglyceride) and adds 20 mL of 20% NaOH solution. The mixture is heated and then common salt (NaCl) is added.',
        options: ['Process: Saponification', 'dissolves', 'oil dissolves in the tail'],
        answer: 'Process: Saponification',
        hook: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in.',
    },
    teaching: [
        { title: 'Soaps are sodium or potassium salts of.', text: 'Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty acids) with the general formula RCOO⁻Na⁺/K⁺, where R is a long hydrocarbon chain (typically 12–18 carbons).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_012', title: 'Soaps are sodium or potassium salts of.',
          scaffold: { problem: '10 g of a fat (triglyceride with three identical stearic acid chains, C₁₇H₃₅COOH) is completely saponified using excess NaOH.',
            steps: [
            { text: 'Write the balanced chemical equation for saponification of the triglyceride.' },
            { text: 'Calculate molar masses. Molar mass of glyceryl tristearate = 3×(C₁₈H₃₆O₂) + C₃H₅O₃ - 3H₂O?' },
            { text: 'Use stoichiometry. 1 mol triglyceride (890 g) gives 3 mol sodium stearate (3×306 = 918 g). So 890 g fat → 918 g soap.' },
            { text: 'Verify limiting reagent. NaOH is in excess, so fat is limiting. Calculation is correct.' },
            { text: 'Interpret result. The mass of soap is slightly more than the fat taken because Na (23) replaces H (1) in each chain,.', faded: true, blankAnswer: '10.31 g of sodium stearate soap.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_004', title: 'Hydrocarbons are organic compounds.',
          scaffold: { problem: 'Write the molecular formula and draw the structural formula (showing all bonds) of the first three members of the alkyne series.',
            steps: [
            { text: 'Recall the general formula for alkynes: CₙH₂ₙ₋₂. The first member has n=2 (minimum for a triple bond).' },
            { text: 'For n=2: C₂H₂ₙ₋₂ = C₂H₂. Draw two carbons connected by a triple bond (three lines).' },
            { text: 'For n=3: C₃H₂ₙ₋₂ = C₃H₄. Draw a three‑carbon chain with a triple bond between C1 and C2 (or C2 and C3).' },
            { text: 'For n=4: C₄H₂ₙ₋₂ = C₄H₆. Draw a four‑carbon chain with triple bond at position 1: H‑C≡C‑CH₂‑CH₃ (but‑1‑yne).' },
            { text: 'Summarise: Ethyne C₂H₂, Propyne C₃H₄, But‑1‑yne C₄H₆. All satisfy general formula CₙH₂ₙ₋₂.', faded: true, blankAnswer: 'Ethyne: C₂H₂, H‑C≡C‑H; Propyne: C₃H₄, H‑C≡C‑CH₃; But‑1‑yne:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_007', title: 'A homologous series is a family of.',
          scaffold: { problem: 'In a laboratory, a student has four unlabelled bottles containing the first four liquid alkanes: pentane (C₅H₁₂), hexane (C₆H₁₄), heptane.',
            steps: [
            { text: 'Identify the homologous series — these are alkanes with general formula CₙH₂ₙ₊₂.' },
            { text: 'Recall the trend — boiling point increases with increasing molecular mass (more CH₂ units) due to stronger London.' },
            { text: 'Calculate molecular masses: C₅H₁₂ = 5×12 + 12×1 = 72; C₆H₁₄ = 86; C₇H₁₆ = 100; C₈H₁₈ = 114 g/mol.' },
            { text: 'Match lowest mass (pentane, 72) to lowest BP (36°C), next (hexane, 86) to 69°C, then heptane (100) to 98°C, highest.' },
            { text: 'Verify the increment in BP is roughly consistent (~30°C per CH₂) and conclude the assignment is chemically logical.', faded: true, blankAnswer: 'Pentane = 36°C, Hexane = 69°C, Heptane = 98°C, Octane =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_002', title: 'Carbon\'s tetravalency is its ability to.',
          scaffold: { problem: 'Draw all possible structural isomers for the molecular formula C₅H₁₂. Name each isomer using IUPAC nomenclature.',
            steps: [
            { text: 'Recognize C₅H₁₂ fits the alkane general formula CₙH₂ₙ₊₂ (n=5).' },
            { text: 'Draw the straight-chain isomer: 5 carbons in a row. Add hydrogens: CH₃–CH₂–CH₂–CH₂–CH₃. Name: Pentane.' },
            { text: 'Create a single branch: Move one carbon from the end to the second carbon.' },
            { text: 'Create a double branch (two methyls on same carbon): Central carbon bonded to 4 carbons.' },
            { text: 'Check for duplicates: Branching on C-3 of pentane is same as 2-methylbutane (number from other end).', faded: true, blankAnswer: 'Three isomers: (1) Pentane (CH₃CH₂CH₂CH₂CH₃), (2).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_005', title: 'Structural isomerism is a phenomenon.',
          scaffold: { problem: 'Draw all structural isomers of the alkane with molecular formula C₆H₁₄ and name them using IUPAC nomenclature.',
            steps: [
            { text: 'Identify the class — alkane, general formula CₙH₂ₙ₊₂. For n=6, formula is C₆H₁₄.' },
            { text: 'Draw the straight-chain isomer (longest chain = 6): CH₃-CH₂-CH₂-CH₂-CH₂-CH₃. Name: Hexane.' },
            { text: 'Shorten main chain to 5 carbons, add one methyl branch. Place methyl on C-2: CH₃-CH(CH₃)-CH₂-CH₂-CH₃.' },
            { text: 'Shorten main chain to 4 carbons. Add two methyl branches (since 6-4=2 extra carbons).' },
            { text: 'Check main chain 3? Would require 3 branches on a 3-carbon chain → 2,2,3-trimethylbutane? That\'s 7 carbons.' },
            { text: 'Verify all 5 isomers: Hexane, 2-Methylpentane, 3-Methylpentane, 2,2-Dimethylbutane, 2,3-Dimethylbutane.', faded: true, blankAnswer: 'Five isomers: Hexane, 2-Methylpentane, 3-Methylpentane,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_008', title: 'IUPAC nomenclature is a systematic.',
          scaffold: { problem: 'A compound has the molecular formula C₄H₈O and gives a positive iodoform test (indicating a CH₃-CO- group).',
            steps: [
            { text: 'Analyze the molecular formula C₄H₈O. Degree of Unsaturation = (2C + 2 - H)/2 = (8+2-8)/2 = 1.' },
            { text: 'Iodoform test positive → contains CH₃-CO- (methyl ketone group) OR CH₃-CH(OH)- (secondary alcohol with CH₃-CH(OH)-).' },
            { text: 'For a ketone with 4 carbons, the carbonyl must be on C2 (cannot be on C1, that\'s aldehyde).' },
            { text: 'Check for branched isomer: 3 carbons in chain + methyl? Propanone with methyl? Propanone is C3.' },
            { text: 'Apply IUPAC: Longest chain = 4C (butan). Functional group = ketone (suffix -one) at C2. No substituents.' },
            { text: 'Verify formula: C4H8O. C:4, H: 3+3+2=8, O:1. Correct.', faded: true, blankAnswer: 'Structural formula: CH₃-CO-CH₂-CH₃; IUPAC Name:.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_chem_cbse_04_004', title: 'Identify each idea',
          dissect: { specimen: 'Soaps and Detergents: Structure, Action and Difference', spots: [
            { id: 's1', label: 'Soaps are sodium or potassium', prompt: 'Which idea is this? — Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty acids) with the.', answer: 'Soaps are sodium or potassium', options: ['Soaps are sodium or potassium', 'Hydrocarbons are organic compounds composed', 'A homologous series is a', 'Carbons tetravalency is its ability'] },
            { id: 's2', label: 'Hydrocarbons are organic compounds composed', prompt: 'Which idea is this? — Hydrocarbons are organic compounds composed exclusively of carbon and hydrogen atoms.', answer: 'Hydrocarbons are organic compounds composed', options: ['Hydrocarbons are organic compounds composed', 'Soaps are sodium or potassium', 'A homologous series is a', 'Carbons tetravalency is its ability'] },
            { id: 's3', label: 'A homologous series is a', prompt: 'Which idea is this? — A homologous series is a family of organic compounds having the same functional group,.', answer: 'A homologous series is a', options: ['A homologous series is a', 'Soaps are sodium or potassium', 'Hydrocarbons are organic compounds composed', 'Carbons tetravalency is its ability'] },
            { id: 's4', label: 'Carbons tetravalency is its ability', prompt: 'Which idea is this? — Carbon\'s tetravalency is its ability to form four covalent bonds by sharing its four.', answer: 'Carbons tetravalency is its ability', options: ['Carbons tetravalency is its ability', 'Soaps are sodium or potassium', 'Hydrocarbons are organic compounds composed', 'A homologous series is a'] },
            { id: 's5', label: 'Structural isomerism is a phenomenon', prompt: 'Which idea is this? — Structural isomerism is a phenomenon where two or more carbon compounds have the same.', answer: 'Structural isomerism is a phenomenon', options: ['Structural isomerism is a phenomenon', 'Soaps are sodium or potassium', 'Hydrocarbons are organic compounds composed', 'A homologous series is a'] },
            { id: 's6', label: 'IUPAC nomenclature is a systematic', prompt: 'Which idea is this? — IUPAC nomenclature is a systematic method for naming organic compounds by identifying the.', answer: 'IUPAC nomenclature is a systematic', options: ['IUPAC nomenclature is a systematic', 'Soaps are sodium or potassium', 'Hydrocarbons are organic compounds composed', 'A homologous series is a'] }
          ] } }
    ],
    explore: { component: C10_ChemistryAlkanesgeneralformulaandpreparationSim, prompt: 'Explore the interactive — Soaps and Detergents: Structure, Action and Difference' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_012', difficulty: 'standard',
          question: 'Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty.',
          hint: 'If stuck, revise c10_chem_cbse_04_006 (Functional Groups) and c10_chem_cbse_04_010.',
          misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in.',
          parts: [
                { id: 'a', prompt: 'A student takes 5 g of castor oil (a triglyceride) and adds 20 mL of 20% NaOH solution. The mixture is heated and then common salt (NaCl) is added.', answer: 'Process: Saponification',
                  options: ['Process: Saponification', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' },
                { id: 'b', prompt: 'Compare the cleansing action of soap and detergent in (i) soft water, (ii) hard water, and (iii) acidic water. Explain the chemical reason for each case.', answer: '(i) Soft water: Both work well',
                  options: ['(i) Soft water: Both work well', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' }
          ],
            remediations: { 'the-hydrophobic-tail-of-soap': { steps: ['Revisit the concept of "like dissolves like" from Class 9 (c9_chem_ch1_2 — Solutions) and colloids (c9_chem_ch1_10 —.', 'Draw a soap molecule on paper: label head (–COO⁻Na⁺) and tail (–CH₂–CH₂–).', 'Simulate micelle formation: draw a circle (micelle) with heads on the outside facing water, tails inside forming a.', 'Watch a 2-minute animation of micelle formation (search "soap micelle animation" on YouTube).', 'Write the difference between *dissolving* (true solution) and *emulsifying* (colloidal suspension) in your own words.', 'Attempt Diagnostic Question 2 again.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Soaps are better than detergents because they are biodegradable and do not cause water pollution." Evaluate this statement.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' },
                { id: 'b', prompt: 'Compare the cleansing action of soap and detergent in (i) soft water, (ii) hard water, and (iii) acidic water. Explain the chemical reason for each case.', answer: '(i) Soft water: Both work well',
                  options: ['(i) Soft water: Both work well', 'dissolves', 'oil dissolves in the tail'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the hydrophobic tail of soap "dissolves" in oil and the hydrophilic head "dissolves" in water, so they write "oil.' }
          ],
            remediations: { 'the-hydrophobic-tail-of-soap': { steps: ['Revisit the concept of "like dissolves like" from Class 9 (c9_chem_ch1_2 — Solutions) and colloids (c9_chem_ch1_10 —.', 'Draw a soap molecule on paper: label head (–COO⁻Na⁺) and tail (–CH₂–CH₂–).', 'Simulate micelle formation: draw a circle (micelle) with heads on the outside facing water, tails inside forming a.', 'Watch a 2-minute animation of micelle formation (search "soap micelle animation" on YouTube).', 'Write the difference between *dissolving* (true solution) and *emulsifying* (colloidal suspension) in your own words.', 'Attempt Diagnostic Question 2 again.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_004', difficulty: 'standard',
          question: 'Hydrocarbons are organic compounds composed exclusively of carbon and hydrogen.',
          hint: 'If stuck, review the valency cross‑method (c9_chem_ch3_6) and the concept of tetravalency.',
          misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague.',
          parts: [
                { id: 'a', prompt: 'Write the molecular formula of the alkane, alkene, and alkyne that each contain exactly three carbon atoms.', answer: 'Alkane (3 C): C₃H₈ (using CₙH₂ₙ₊₂ → 2×3+2=8 H)',
                  options: ['Alkane (3 C): C₃H₈ (using CₙH₂ₙ₊₂ → 2×3+2=8 H)', 'unsaturated', 'empty space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' },
                { id: 'b', prompt: 'Explain why ethene (C₂H₄) is unsaturated while ethane (C₂H₆) is saturated, referring to the type of carbon‑carbon bond and the number of hydrogen atoms.', answer: 'Ethene has a carbon‑carbon double bond (C=C)',
                  options: ['Ethene has a carbon‑carbon double bond (C=C)', 'ethene has fewer carbons', 'ethane has more hydrogens'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' },
                { id: 'c', prompt: 'A hydrocarbon has the molecular formula C₅H₁₀. Identify its class (alkane/alkene/alkyne) and draw one possible structural formula showing all bonds.', answer: 'General formula check: CₙH₂ₙ₊₂ for n=5 → C₅H₁₂ (alkane)',
                  options: ['General formula check: CₙH₂ₙ₊₂ for n=5 → C₅H₁₂ (alkane)', 'unsaturated', 'empty space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' }
          ],
            remediations: { 'unsaturated-means-the-molecule-has': { steps: ['Revisit carbon’s tetravalency (c10_chem_cbse_04_001) — each carbon must have exactly four bonds.', 'For a given carbon skeleton, count the bonds on each carbon; if a carbon has a double bond, it can bond to only two.', 'Practice with ethene: draw C=C, then attach hydrogens so each carbon has four bonds total (two H on each).', 'Generalise: start from alkane formula CₙH₂ₙ₊₂, remove two H for each double bond, four H for each triple bond.', 'Verify by checking valency on every carbon in the structural formula.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague.',
          parts: [
                { id: 'a', prompt: 'A student writes the structural formula of propyne as CH₃‑C≡C‑H. Is this correct? Justify your answer by counting bonds on each carbon.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'no, because the middle carbon has only two bonds', 'unsaturated', 'empty space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' },
                { id: 'b', prompt: 'Design a simple test using bromine water to distinguish between a sample of hexane (C₆H₁₄) and hex‑1‑ene (C₆H₁₂).', answer: 'Add bromine water (orange‑brown) to each sample in separate test tubes',
                  options: ['Add bromine water (orange‑brown) to each sample in separate test tubes', 'both decolourise', 'hexane reacts faster', 'unsaturated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' }
          ],
            remediations: { 'unsaturated-means-the-molecule-has': { steps: ['Revisit carbon’s tetravalency (c10_chem_cbse_04_001) — each carbon must have exactly four bonds.', 'For a given carbon skeleton, count the bonds on each carbon; if a carbon has a double bond, it can bond to only two.', 'Practice with ethene: draw C=C, then attach hydrogens so each carbon has four bonds total (two H on each).', 'Generalise: start from alkane formula CₙH₂ₙ₊₂, remove two H for each double bond, four H for each triple bond.', 'Verify by checking valency on every carbon in the structural formula.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_007', difficulty: 'standard',
          question: 'A homologous series is a family of organic compounds having the same functional.',
          hint: 'Review functional groups (c10_chem_cbse_04_006) and practice writing general formulas for.',
          misconception: 'Students often write that "chemical properties change gradually down a homologous series" — this is incorrect.',
          parts: [
                { id: 'a', prompt: 'Explain why the boiling points of alkanes increase steadily as we go down the homologous series from methane to decane, even though their chemical properties.', answer: 'Boiling points increase',
                  options: ['Boiling points increase', 'stronger covalent bonds', 'change in functional group'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write that "chemical properties change gradually down a homologous series" — this is incorrect.' }
          ],
            remediations: { 'students-often-write-that-chemical': { steps: ['Revisit functional groups (c10_chem_cbse_04_006) — make a table: Series | Functional Group | General Formula.', 'Use molecular model kits or paper cutouts to physically add a CH₂ unit to methane, ethane, propane; count atoms each.', 'Practice: "Write the next homologue of C₄H₉OH" → C₅H₁₁OH.', 'Check: Did you add C and 2H?'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_002', difficulty: 'standard',
          question: 'Carbon\'s tetravalency is its ability to form four covalent bonds by sharing its.',
          hint: 'Revisit Class 9 node c9_chem_ch2_7 (Valency) for electron configuration and valency.',
          misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g.,.',
          parts: [
                { id: 'a', prompt: 'Draw the structural formulas (showing all bonds) for the two structural isomers of C₄H₁₀. Name each isomer.', answer: 'Isomer 1 (straight chain): CH₃–CH₂–CH₂–CH₃ (Butane)',
                  options: ['Isomer 1 (straight chain): CH₃–CH₂–CH₂–CH₃ (Butane)', 'catenation only produces straight chains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' },
                { id: 'b', prompt: 'A student draws a cyclic hydrocarbon with 5 carbon atoms and writes its molecular formula as C₅H₁₂. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'catenation only produces straight chains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' }
          ],
            remediations: { 'catenation-only-produces-straight-chains': { steps: ['Build CH₄ — count bonds on carbon (4).', 'Replace one H with CH₃ to make C₂H₆ — verify each C still has 4 bonds.', 'Build C₃H₈ (linear). Then rebuild as branched C₄H₁₀ (isobutane) — show central C bonded to 3 C + 1 H.', 'Take n-butane model, remove two terminal H, join the ends to form cyclobutane — count H lost (2) and verify each C has.', 'Build ethene (C₂H₄) with a double bond (two matchsticks between C) — count bonds on each C (2 C–H + 2 from C=C = 4).', 'Build ethyne (C₂H₂) with triple bond (three matchsticks) — count bonds (1 C–H + 3 from C≡C = 4).'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g.,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Because carbon is tetravalent, every carbon compound must contain exactly four bonds per carbon atom.', answer: 'The statement is false',
                  options: ['The statement is false', 'catenation only produces straight chains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' },
                { id: 'b', prompt: 'Design a simple activity using matchsticks (for bonds) and clay balls of two colours (carbon = black, hydrogen = white) to demonstrate both tetravalency and.', answer: 'Activity: 1',
                  options: ['Activity: 1', 'catenation only produces straight chains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' },
                { id: 'c', prompt: 'A student draws a cyclic hydrocarbon with 5 carbon atoms and writes its molecular formula as C₅H₁₂. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'catenation only produces straight chains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' }
          ],
            remediations: { 'catenation-only-produces-straight-chains': { steps: ['Build CH₄ — count bonds on carbon (4).', 'Replace one H with CH₃ to make C₂H₆ — verify each C still has 4 bonds.', 'Build C₃H₈ (linear). Then rebuild as branched C₄H₁₀ (isobutane) — show central C bonded to 3 C + 1 H.', 'Take n-butane model, remove two terminal H, join the ends to form cyclobutane — count H lost (2) and verify each C has.', 'Build ethene (C₂H₄) with a double bond (two matchsticks between C) — count bonds on each C (2 C–H + 2 from C=C = 4).', 'Build ethyne (C₂H₂) with triple bond (three matchsticks) — count bonds (1 C–H + 3 from C≡C = 4).'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_005', difficulty: 'standard',
          question: 'Structural isomerism is a phenomenon where two or more carbon compounds have.',
          hint: 'Revisit c10_chem_cbse_04_001 (covalent bonding in carbon) and c10_chem_cbse_04_002.',
          misconception: 'Students often draw "false isomers" by violating tetravalency: e.g., for C₅H₁₂, they draw CH₃-CH₂-C(CH₃)₂-CH₃ (a carbon.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Structural isomerism is a phenomenon where two or more carbon compounds have the same',
                  options: ['Structural isomerism is a phenomenon where two or more carbon compounds have the same', 'Soaps are sodium or potassium salts of long-chain carboxylic acids (fatty acids) with the', 'Hydrocarbons are organic compounds composed exclusively of carbon and hydrogen atoms', 'A homologous series is a family of organic compounds having the same functional group,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often draw "false isomers" by violating tetravalency: e.g., for C₅H₁₂, they draw CH₃-CH₂-C(CH₃)₂-CH₃ (a carbon with 5 bonds: one.' }
          ],
            remediations: { 'students-often-draw-false-isomers': { steps: ['If a student draws duplicate isomers or violates valency: 1.', 'Give them molecular model kits (or use toothpicks and clay) to build C₅H₁₂ isomers physically — they will see.', 'Practice the "longest chain rule": for every structure, identify the longest continuous carbon chain and number it to.', 'If two structures give the same name, they are identical.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_008', difficulty: 'standard',
          question: 'IUPAC nomenclature is a systematic method for naming organic compounds by.',
          hint: 'If stuck, immediately review **c10_chem_cbse_04_006 (Functional Groups)** to memorize the.',
          misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead of.',
          parts: [
                { id: 'a', prompt: 'What is the correct IUPAC name for the compound with the structural formula CH₃-CH₂-CH₂-CH₃?', answer: 'Butane',
                  options: ['Butane', 'Butylene', 'the molecular formula is the name'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead of from the end nearest to.' }
          ],
            remediations: { 'students-always-number-the-carbon': { steps: ['**Revisit the Priority Order Rule** from node **c10_chem_cbse_04_006**: Functional group > Double bond > Triple bond >.', 'Write this hierarchy on a sticky note.', '**Practice the "Arrow Technique"**: Draw the carbon skeleton.', 'Put an arrow from the LEFT end pointing right, and from the RIGHT end pointing left.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead of.',
          parts: [
                { id: 'a', prompt: 'A student names the compound CH₃-CH₂-CH(CH₃)-CH₂-CH₃ as "3-Methylpentane". Evaluate if this is correct.', answer: 'The name **3-Methylpentane is correct**',
                  options: ['The name **3-Methylpentane is correct**', '2-Ethylbutane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students **always number the carbon chain from the end nearest to the first alkyl substituent (branch)** instead of from the end nearest to.' }
          ],
            remediations: { 'students-always-number-the-carbon': { steps: ['**Revisit the Priority Order Rule** from node **c10_chem_cbse_04_006**: Functional group > Double bond > Triple bond >.', 'Write this hierarchy on a sticky note.', '**Practice the "Arrow Technique"**: Draw the carbon skeleton.', 'Put an arrow from the LEFT end pointing right, and from the RIGHT end pointing left.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
