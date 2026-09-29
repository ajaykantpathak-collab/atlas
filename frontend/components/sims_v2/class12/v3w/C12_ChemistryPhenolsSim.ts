import type { SimDef } from '../../engine/types';
import C12_ChemistryPhenolsSim from '../../../simulations/c6_12/C12_ChemistryPhenolsSim';

/** v3 wrapped master — C12_ChemistryPhenolsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistryphenolssim: SimDef = {
    id: 'v3w_c12_chemistryphenolssim',
    title: 'Classification of Alcohols: Primary, Secondary, Tertiary',
    subtitle: 'This node covers ONLY the classification of monohydric aliphatic alcohols into primary,.',
    classLevel: 12, subject: 'chemistry', topic: 'Classification of Alcohols: Primary, Secondary, Tertiary',
    chapters: [],
    nodeIds: ['c12_chem_cbse_07_001', 'c12_chem_cbse_07_002', 'c12_chem_cbse_07_004', 'c12_chem_cbse_07_005', 'c12_chem_cbse_07_006', 'c12_chem_cbse_07_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real-world observation: when you rub hand sanitiser (mostly ethanol, a primary alcohol) on your.', goal: 'Master Classification of Alcohols: Primary, Secondary, Tertiary.' },
    discovery: {
        question: 'A student claims: "All secondary alcohols have the general formula R–CH(OH)–R\' where R and R\' are different alkyl groups." Analyse this statement and correct.',
        options: ['The statement is partially correct but incomplete', 'secondary', 'chiral'],
        answer: 'The statement is partially correct but incomplete',
        hook: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3.',
    },
    teaching: [
        { title: 'Alcohols are organic compounds in which a.', text: 'Alcohols are organic compounds in which a hydroxyl (–OH) group is attached to an sp³ hybridised carbon atom of an aliphatic system; they are classified as primary (1°), secondary (2°), or tertiary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_001', title: 'Alcohols are organic compounds in which.',
          scaffold: { problem: 'A colourless liquid with molecular formula C₅H₁₂O gives immediate turbidity with Lucas reagent. It does not oxidise with PCC.',
            steps: [
            { text: 'Molecular formula C₅H₁₂O fits CₙH₂ₙ₊₂O (n=5) → saturated monohydric alcohol.' },
            { text: 'Immediate turbidity with Lucas reagent → tertiary alcohol (forms stable 3° carbocation instantly via SN1).' },
            { text: 'No oxidation with PCC → confirms tertiary (no α-hydrogen on carbinol carbon for oxidation to C=O).' },
            { text: 'For C₅, the only tertiary alcohol is 2-methylbutan-2-ol: (CH₃)₂C(OH)CH₂CH₃.' },
            { text: 'Verify: C count = 5, H count = 3+3+2+2+1 (OH) = 11? Wait: (CH₃)₂C(OH)CH₂CH₃ → C₅H₁₂O ✓. IUPAC: 2-methylbutan-2-ol.', faded: true, blankAnswer: 'Structure: (CH₃)₂C(OH)CH₂CH₃; IUPAC name:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_002', title: 'Alcohols can be prepared from.',
          scaffold: { problem: 'An organic compound A (C4H9Br) reacts with aqueous NaOH to give alcohol B.',
            steps: [
            { text: 'Determine possible structures for C4H9Br (primary, secondary, tertiary).' },
            { text: 'List isomeric butyl bromides: 1-bromobutane (primary), 2-bromobutane (secondary), 2-bromo-2-methylpropane (tertiary).' },
            { text: 'Dehydration of butan-1-ol gives but-1-ene (minor) and but-2-ene (major via rearrangement).' },
            { text: 'Write reactions: (i) CH3CH2CHBrCH3 + NaOH(aq) → CH3CH2CH(OH)CH3 + NaBr (SN1/SN2). (ii) CH3CH2CH(OH)CH3 --(conc.' },
            { text: 'Verify carbon count and functional groups match. All are C4.', faded: true, blankAnswer: 'A = 2-bromobutane, B = butan-2-ol, C = but-2-ene. Reactions.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_004', title: 'Phenols are aromatic compounds where a.',
          scaffold: { problem: 'Aniline (4.65 g, 0.05 mol) is diazotised with NaNO₂ (3.45 g, 0.05 mol) and HCl (7.3 g, 0.2 mol) at 273 K.',
            steps: [
            { text: 'Write balanced equations. Diazotisation: C₆H₅NH₂ + NaNO₂ + 2HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O.' },
            { text: 'Calculate moles. Aniline: 4.65 g / 93 g mol⁻¹ = 0.05 mol. NaNO₂: 3.45 g / 69 g mol⁻¹ = 0.05 mol.' },
            { text: 'Theoretical yield of phenol. 1 mol aniline → 1 mol phenol. Moles phenol = 0.05 mol.' },
            { text: 'Volume of N₂ at STP. 1 mol aniline → 1 mol N₂. Moles N₂ = 0.05 mol. At STP (273 K, 1 atm), 1 mol = 22.4 L.' },
            { text: 'Verify atom balance. Overall: C₆H₅NH₂ + NaNO₂ + 2HCl + H₂O → C₆H₅OH + N₂ + NaCl + 2H₂O + HCl.', faded: true, blankAnswer: 'Theoretical yield of phenol = 4.7 g; Volume of N₂ at STP =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_005', title: 'Physical properties of alcohols and.',
          scaffold: { problem: 'In a lab, you have three colourless liquids: n-butane (bp 273 K), ethoxyethane (bp 308 K), and butan-1-ol (bp 390 K).',
            steps: [
            { text: 'Recognize that the water bath cannot exceed 373 K (100°C), so any liquid boiling below this will vaporize in the bath.' },
            { text: 'n-Butane (bp 273 K) is a gas at room temperature — it would not be a liquid in the test tube.' },
            { text: 'Place each liquid in a test tube in the hot water bath. Ethoxyethane will boil vigorously (bp 308 K < 373 K).' },
            { text: 'The liquid that does NOT boil in the water bath is butan-1-ol.' },
            { text: 'Reason: Butan-1-ol has intermolecular hydrogen bonding (–OH group), requiring more energy to separate molecules.', faded: true, blankAnswer: 'Butan-1-ol is the liquid that does not boil in a 373 K.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_006', title: 'Alcohols react with active metals (Na,.',
          scaffold: { problem: '2.3 g of ethanol is reacted with excess sodium metal. Calculate the volume of hydrogen gas evolved at STP (molar volume = 22.4 L/mol).',
            steps: [
            { text: 'Write the balanced equation: 2CH₃CH₂OH + 2Na → 2CH₃CH₂ONa + H₂.' },
            { text: 'Calculate moles of ethanol: molar mass = 46 g/mol → 2.3/46 = 0.05 mol.' },
            { text: 'From stoichiometry, 2 mol ethanol give 1 mol H₂ → 0.05 mol ethanol gives 0.025 mol H₂.' },
            { text: 'Volume at STP = moles × 22.4 L/mol = 0.025 × 22.4 = 0.56 L = 560 mL.' },
            { text: 'Verify: 0.05 mol ethanol is a small amount; 560 mL H₂ is reasonable. Check units: g → mol → mol → L.', faded: true, blankAnswer: '0.56 L (560 mL) of H₂ gas at STP.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_007', title: 'Dehydration of alcohols is an.',
          scaffold: { problem: '3,3-Dimethylbutan-2-ol is heated with concentrated H₂SO₄ at 443 K.',
            steps: [
            { text: 'Identify the alcohol class — OH on C-2, with two methyl groups on C-3 → secondary alcohol (C-2 attached to two carbons:.' },
            { text: 'Protonation of OH by H₂SO₄ gives good leaving group (H₂O). Loss of water forms secondary carbocation at C-2.' },
            { text: 'Check for rearrangement — adjacent C-3 is tertiary (attached to three carbons: C-2 and two CH₃).' },
            { text: 'Elimination of β-H from the tertiary carbocation. Two β-carbons: C-1 (primary, 3 H\'s) and C-3 (now quaternary after.' },
            { text: 'Verify Saytzeff vs Hofmann — only one alkene possible due to quaternary C-3 having no β-H.', faded: true, blankAnswer: 'Major product: 2,3-dimethylbut-1-ene. Mechanism:.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Classification of Alcohols: Primary, Secondary, Tertiary', spots: [
            { id: 's1', label: 'Alcohols are organic compounds in', prompt: 'Which idea is this? — Alcohols are organic compounds in which a hydroxyl (–OH) group is attached to an sp³.', answer: 'Alcohols are organic compounds in', options: ['Alcohols are organic compounds in', 'Alcohols can be prepared from', 'Phenols are aromatic compounds where', 'Physical properties of alcohols and'] },
            { id: 's2', label: 'Alcohols can be prepared from', prompt: 'Which idea is this? — Alcohols can be prepared from haloalkanes via nucleophilic substitution (SN1/SN2) using.', answer: 'Alcohols can be prepared from', options: ['Alcohols can be prepared from', 'Alcohols are organic compounds in', 'Phenols are aromatic compounds where', 'Physical properties of alcohols and'] },
            { id: 's3', label: 'Phenols are aromatic compounds where', prompt: 'Which idea is this? — Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an.', answer: 'Phenols are aromatic compounds where', options: ['Phenols are aromatic compounds where', 'Alcohols are organic compounds in', 'Alcohols can be prepared from', 'Physical properties of alcohols and'] },
            { id: 's4', label: 'Physical properties of alcohols and', prompt: 'Which idea is this? — Physical properties of alcohols and phenols refer to their observable characteristics.', answer: 'Physical properties of alcohols and', options: ['Physical properties of alcohols and', 'Alcohols are organic compounds in', 'Alcohols can be prepared from', 'Phenols are aromatic compounds where'] },
            { id: 's5', label: 'Alcohols react with active metals', prompt: 'Which idea is this? — Alcohols react with active metals (Na, K, Al) to form alkoxides and hydrogen gas,.', answer: 'Alcohols react with active metals', options: ['Alcohols react with active metals', 'Alcohols are organic compounds in', 'Alcohols can be prepared from', 'Phenols are aromatic compounds where'] },
            { id: 's6', label: 'Dehydration of alcohols is an', prompt: 'Which idea is this? — Dehydration of alcohols is an acid-catalyzed elimination reaction where a water molecule.', answer: 'Dehydration of alcohols is an', options: ['Dehydration of alcohols is an', 'Alcohols are organic compounds in', 'Alcohols can be prepared from', 'Phenols are aromatic compounds where'] }
          ] } }
    ],
    explore: { component: C12_ChemistryPhenolsSim, prompt: 'Explore the interactive — Classification of Alcohols: Primary, Secondary, Tertiary' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_001', difficulty: 'standard',
          question: 'Alcohols are organic compounds in which a hydroxyl (–OH) group is attached to.',
          hint: 'If unable to identify the carbinol carbon or count its carbon neighbours, revisit Class.',
          misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3.',
          parts: [
                { id: 'a', prompt: 'Consider the structure (CH₃)₃C–OH. Without drawing, explain why this must be a tertiary alcohol and why it cannot be oxidised by mild oxidising agents like PCC.', answer: 'The carbinol carbon is bonded to three methyl groups',
                  options: ['The carbinol carbon is bonded to three methyl groups', 'there are three carbons total'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' },
                { id: 'b', prompt: 'A student claims: "All secondary alcohols have the general formula R–CH(OH)–R\' where R and R\' are different alkyl groups." Analyse this statement and correct.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'secondary', 'chiral'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' }
          ],
            remediations: { 'students-often-classify-alcohols-by': { steps: ['Revisit Class 10 node c10_chem_cbse_04_004 (Hydrocarbons: Saturated and Unsaturated) to review carbon valency and how.', 'Practice with molecular models or paper cut-outs: build CH₃OH, CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH; physically point to the.', 'Re-attempt Diagnostic Question 3 (isomer drawing) — if still incorrect, watch a 5-minute video on "identifying.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following claim: "tert-Butyl alcohol (2-methylpropan-2-ol) is a tertiary alcohol, so it should give a positive Lucas test immediately, but it will.', answer: 'The claim is fully correct',
                  options: ['The claim is fully correct', 'it gives a mixture of alkenes', 'Lucas test is slow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' },
                { id: 'b', prompt: 'A student claims: "All secondary alcohols have the general formula R–CH(OH)–R\' where R and R\' are different alkyl groups." Analyse this statement and correct.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'secondary', 'chiral', 'unsymmetrical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' }
          ],
            remediations: { 'students-often-classify-alcohols-by': { steps: ['Revisit Class 10 node c10_chem_cbse_04_004 (Hydrocarbons: Saturated and Unsaturated) to review carbon valency and how.', 'Practice with molecular models or paper cut-outs: build CH₃OH, CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH; physically point to the.', 'Re-attempt Diagnostic Question 3 (isomer drawing) — if still incorrect, watch a 5-minute video on "identifying.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_002', difficulty: 'standard',
          question: 'Alcohols can be prepared from haloalkanes via nucleophilic substitution.',
          hint: 'Review carbocation stability and Markovnikov\'s rule from Class 11 hydrocarbons (if.',
          misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s.',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the preparation of propan-2-ol from 2-bromopropane using aqueous NaOH.', answer: 'CH3CHBrCH3 + NaOH(aq) → CH3CH(OH)CH3 + NaBr',
                  options: ['CH3CHBrCH3 + NaOH(aq) → CH3CH(OH)CH3 + NaBr', 'add H2O'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s rule, and they confuse.' },
                { id: 'b', prompt: 'Predict the major alcohol product when 3-methylbut-1-ene undergoes (a) acid-catalyzed hydration and (b) hydroboration-oxidation.', answer: 'acid-catalyzed hydration and (',
                  options: ['acid-catalyzed hydration and (', 'add H2O'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s rule, and they confuse.' }
          ],
            remediations: { 'students-often-write-the-hydration': { steps: ['If stuck on regioselectivity, revisit c11_chem_cbse_04_007 (Hybridisation: sp, sp2, sp3) to understand carbocation.', 'For mechanism steps, review c12_chem_cbse_07_001 (Classification of Alcohols) to recall primary/secondary/tertiary.', 'Practice drawing carbocation intermediates and 1,2-hydride shifts using paper models.', 'Re-do Diagnostic Question 3 with explicit carbocation drawings.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s.',
          parts: [
                { id: 'a', prompt: 'Design a two-step synthesis of 2-phenylethanol starting from styrene (phenylethene).', answer: 'Step 1: Hydroboration-oxidation of styrene with (BH3)2 then H2O2/NaOH gives',
                  options: ['Step 1: Hydroboration-oxidation of styrene with (BH3)2 then H2O2/NaOH gives', 'add H2O'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s rule, and they confuse.' }
          ],
            remediations: { 'students-often-write-the-hydration': { steps: ['If stuck on regioselectivity, revisit c11_chem_cbse_04_007 (Hybridisation: sp, sp2, sp3) to understand carbocation.', 'For mechanism steps, review c12_chem_cbse_07_001 (Classification of Alcohols) to recall primary/secondary/tertiary.', 'Practice drawing carbocation intermediates and 1,2-hydride shifts using paper models.', 'Re-do Diagnostic Question 3 with explicit carbocation drawings.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_004', difficulty: 'standard',
          question: 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly.',
          hint: 'Revisit c11_chem_cbse_04_011 (Resonance Structures) for diazonium ion stability and.',
          misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an',
                  options: ['Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an', 'Alcohols are organic compounds in', 'Alcohols can be prepared from haloalkanes via nucleophilic substitution (SN1/SN2) using', 'Physical properties of alcohols and phenols refer to their observable characteristics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide intermediate and the.' }
          ],
            remediations: { 'students-write-the-cumene-process': { steps: ['If the student cannot draw the cumene hydroperoxide structure or the phenyl migration step: (1) Revisit.', '(2) Review c11_chem_cbse_07_006 (Le Chatelier\'s Principle) for equilibrium in acid-catalysed steps.', '(3) Practice: Draw the radical initiation (RO• abstracting benzylic H), propagation (O₂ addition), and termination.', '(4) Re-diagnostic: Ask student to write the mechanism for acid-catalysed dehydration of 2-methylpropan-2-ol.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide.',
          parts: [
                { id: 'a', prompt: 'A reaction sequence claims: Cumene + O₂ → Cumene hydroperoxide → (dil. H₂SO₄) → Phenol + Propanone.', answer: 'Error: "Propanone" is correct IUPAC for CH₃COCH₃ (acetone)',
                  options: ['Error: "Propanone" is correct IUPAC for CH₃COCH₃ (acetone)', 'the error is propanone should be acetone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide intermediate and the.' }
          ],
            remediations: { 'students-write-the-cumene-process': { steps: ['If the student cannot draw the cumene hydroperoxide structure or the phenyl migration step: (1) Revisit.', '(2) Review c11_chem_cbse_07_006 (Le Chatelier\'s Principle) for equilibrium in acid-catalysed steps.', '(3) Practice: Draw the radical initiation (RO• abstracting benzylic H), propagation (O₂ addition), and termination.', '(4) Re-diagnostic: Ask student to write the mechanism for acid-catalysed dehydration of 2-methylpropan-2-ol.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_005', difficulty: 'standard',
          question: 'Physical properties of alcohols and phenols refer to their observable.',
          hint: 'Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) and practice.',
          misconception: 'Students often believe that phenols have lower boiling points than alcohols of similar mass because the aromatic ring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical properties of alcohols and phenols refer to their observable characteristics',
                  options: ['Physical properties of alcohols and phenols refer to their observable characteristics', 'Alcohols are organic compounds in', 'Alcohols can be prepared from haloalkanes via nucleophilic substitution (SN1/SN2) using', 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that phenols have lower boiling points than alcohols of similar mass because the aromatic ring is "rigid" or.' }
          ],
            remediations: { 'phenols-have-lower-boiling-points': { steps: ['If the student confuses the role of the aromatic ring, have them revisit c11_chem_cbse_05_003 (Hydrogen Bonding in.', 'Perform a quick demo: compare evaporation rates of phenol (solid, sublimes slowly) and cyclohexanol (liquid, bp 434 K).', 'Then draw resonance structures of phenol showing partial positive charge on oxygen, reinforcing its H-bond donor.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that phenols have lower boiling points than alcohols of similar mass because the aromatic ring.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All alcohols are miscible with water in all proportions because they have an –OH group." Evaluate this statement and correct it with a.', answer: 'The statement is false',
                  options: ['The statement is false', 'nonpolar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that phenols have lower boiling points than alcohols of similar mass because the aromatic ring is "rigid" or.' }
          ],
            remediations: { 'phenols-have-lower-boiling-points': { steps: ['If the student confuses the role of the aromatic ring, have them revisit c11_chem_cbse_05_003 (Hydrogen Bonding in.', 'Perform a quick demo: compare evaporation rates of phenol (solid, sublimes slowly) and cyclohexanol (liquid, bp 434 K).', 'Then draw resonance structures of phenol showing partial positive charge on oxygen, reinforcing its H-bond donor.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_006', difficulty: 'standard',
          question: 'Alcohols react with active metals (Na, K, Al) to form alkoxides and hydrogen.',
          hint: 'If stuck on acidity trends, revisit c11_chem_cbse_07_009 (Ka/Kb) and draw resonance.',
          misconception: 'Students often write the esterification of a tertiary alcohol with a carboxylic acid as a straightforward substitution,.',
          parts: [
                { id: 'a', prompt: 'Explain why tertiary alcohols (e.g., tert-butanol) do not undergo esterification with carboxylic acids under standard Fischer conditions (conc.', answer: 'Tertiary alcohols have bulky alkyl groups that hinder nucleophilic attack on the',
                  options: ['Tertiary alcohols have bulky alkyl groups that hinder nucleophilic attack on the', 'tertiary alcohols are less acidic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the esterification of a tertiary alcohol with a carboxylic acid as a straightforward substitution, ignoring that conc.' }
          ],
            remediations: { 'students-often-write-the-esterification': { steps: ['Revisit c12_chem_cbse_07_001 (classification of alcohols) to recall 1°/2°/3° structures.', 'Review c11_chem_cbse_07_009 (Ka/Kb) for acid strength concepts.', 'Perform a mental experiment: draw the mechanism of Fischer esterification for a tertiary alcohol — see the carbocation.', 'Re-attempt Diagnostic Question 2 and 5 with this mechanistic view.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_007', difficulty: 'standard',
          question: 'Dehydration of alcohols is an acid-catalyzed elimination reaction where a water.',
          hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization.',
          misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O,.',
          parts: [
                { id: 'a', prompt: 'Write the major product when 3-methylbutan-2-ol undergoes acid-catalyzed dehydration with concentrated H₂SO₄. Explain why this is the major product.', answer: 'Major product: 2-methylbut-2-ene (more substituted alkene)',
                  options: ['Major product: 2-methylbut-2-ene (more substituted alkene)', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'b', prompt: 'Why does PCC in CH₂Cl₂ oxidize primary alcohols to aldehydes while acidified KMnO₄ oxidizes them to carboxylic acids?', answer: 'PCC is a mild, anhydrous oxidant in non-aqueous CH₂Cl₂',
                  options: ['PCC is a mild, anhydrous oxidant in non-aqueous CH₂Cl₂', 'PCC is weaker so it stops', 'rate of reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'c', prompt: 'A student treats butan-2-ol with (a) Cu/573 K, (b) acidified K₂Cr₂O₇, (c) PCC. Write the organic product(s) for each case with balanced equations.', answer: 'Cu/573 K, (',
                  options: ['Cu/573 K, (', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' }
          ],
            remediations: { 'students-write-the-dehydration-of': { steps: ['Revisit carbocation stability and rearrangements: c11_chem_cbse_04_005 (VSEPR/hybridization) and c11_chem_cbse_04_006.', 'Practice drawing 3-step dehydration mechanisms for 10 different alcohols (primary, secondary, tertiary, with/without.', 'Make a reagent table: Oxidizing agent | Medium | 1° alcohol product | 2° alcohol product | 3° alcohol product — fill.', 'Redo Diagnostic Questions 1–5 after 48 hours; if any error persists, watch NPTEL lecture on alcohol oxidation.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O,.',
          parts: [
                { id: 'a', prompt: 'In the Lucas test, 2-methylpropan-2-ol (tert-butyl alcohol) produces immediate turbidity, butan-2-ol takes 5–10 minutes, and butan-1-ol shows no turbidity at.', answer: 'Lucas reagent (ZnCl₂/conc',
                  options: ['Lucas reagent (ZnCl₂/conc', 'reactivity order', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'b', prompt: 'Design a two-step sequence to convert 2-methylpropan-1-ol (isobutyl alcohol) to 2-methylpropanal (isobutyraldehyde) without over-oxidation to the acid.', answer: 'Step 1: Oxidize with PCC in CH₂Cl₂ at 0–25°C → 2-methylpropanal (aldehyde)',
                  options: ['Step 1: Oxidize with PCC in CH₂Cl₂ at 0–25°C → 2-methylpropanal (aldehyde)', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' }
          ],
            remediations: { 'students-write-the-dehydration-of': { steps: ['Revisit carbocation stability and rearrangements: c11_chem_cbse_04_005 (VSEPR/hybridization) and c11_chem_cbse_04_006.', 'Practice drawing 3-step dehydration mechanisms for 10 different alcohols (primary, secondary, tertiary, with/without.', 'Make a reagent table: Oxidizing agent | Medium | 1° alcohol product | 2° alcohol product | 3° alcohol product — fill.', 'Redo Diagnostic Questions 1–5 after 48 hours; if any error persists, watch NPTEL lecture on alcohol oxidation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
