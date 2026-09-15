import type { SimDef } from '../../engine/types';
import C12_ChemistryChemicalKineticsSim from '../../../simulations/c6_12/C12_ChemistryChemicalKineticsSim';

/** v3 wrapped master — C12_ChemistryChemicalKineticsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrychemicalkineticssim: SimDef = {
    id: 'v3w_c12_chemistrychemicalkineticssim',
    title: 'Chemical Kinetics',
    subtitle: 'This node covers the collision theory treatment as presented in NCERT Class 12:.',
    classLevel: 12, subject: 'chemistry', topic: 'Collision Theory of Chemical Reactions',
    chapters: [],
    nodeIds: ['c12_chem_cbse_03_010', 'c12_chem_cbse_10_005', 'c12_chem_cbse_10_008', 'c12_chem_cbse_10_010', 'c12_chem_cbse_03_009', 'c12_chem_cbse_06_006', 'c12_chem_cbse_06_008', 'c12_chem_cbse_01_003', 'c12_chem_cbse_01_010', 'c12_chem_cbse_03_001', 'c12_chem_cbse_03_002', 'c12_chem_cbse_03_003', 'c12_chem_cbse_03_004', 'c12_chem_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real‑world observation: a matchstick lights only when struck — the friction supplies both the.', goal: 'Master Chemical Kinetics.' },
    discovery: {
        question: 'A student claims: "All 20 standard amino acids are essential because proteins require all of them." Evaluate this statement.',
        options: ['The claim is false', 'all are essential', 'alanine-glycine'],
        answer: 'The claim is false',
        hook: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond.',
    },
    teaching: [
        { title: 'Collision theory states that for a chemical.', text: 'Collision theory states that for a chemical reaction to occur, reactant molecules must collide with each other.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_010', title: 'Collision theory states that for a.',
          scaffold: { problem: 'In the gas‑phase reaction 2NO(g) + O₂(g) → 2NO₂(g), the collision frequency Z_AB is 2.5 × 10¹⁰ L mol⁻¹ s⁻¹ at 300 K.',
            steps: [
            { text: 'List given values: Z_AB = 2.5×10¹⁰ L mol⁻¹ s⁻¹, Ea = 110,000 J mol⁻¹, T = 300 K, P = 0.2, R = 8.314 J mol⁻¹ K⁻¹.' },
            { text: 'Write the collision theory rate expression: k = P · Z_AB · exp(–Ea/(RT)).' },
            { text: 'Compute the exponent: –Ea/(RT) = –110,000 / (8.314 × 300) = –110,000 / 2494.2 = –44.10.' },
            { text: 'Calculate the exponential factor: exp(–44.10) = 6.7 × 10⁻²⁰.' },
            { text: 'Multiply: k = 0.2 × 2.5×10¹⁰ × 6.7×10⁻²⁰ = 3.35 × 10⁻¹⁰ L mol⁻¹ s⁻¹.', faded: true, blankAnswer: 'k = 3.35 × 10⁻¹⁰ L mol⁻¹ s⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_005', title: 'Proteins are biological polymers formed.',
          scaffold: { problem: 'A dipeptide is formed from valine (Val, C₅H₁₁NO₂) and serine (Ser, C₃H₇NO₃).',
            steps: [
            { text: 'Recognize condensation reaction: –COOH of Val + –NH₂ of Ser → peptide bond + H₂O.' },
            { text: 'Write molecular formulas: Val = C₅H₁₁NO₂, Ser = C₃H₇NO₃. Sum = C₈H₁₈N₂O₅.' },
            { text: 'Subtract H₂O (lost in condensation): C₈H₁₈N₂O₅ – H₂O = C₈H₁₆N₂O₄.' },
            { text: 'Name dipeptide: Val-Ser means Val is N-terminal (free –NH₂), Ser is C-terminal (free –COOH).' },
            { text: 'Verify atom balance: Reactants C₈H₁₈N₂O₅, Products C₈H₁₆N₂O₄ + H₂O → balanced.', faded: true, blankAnswer: 'Val-Ser molecular formula = C₈H₁₆N₂O₄; N-terminal = Valine.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_008', title: 'Nucleic acids are long-chain polymeric.',
          scaffold: { problem: 'A synthetic DNA oligonucleotide has the sequence 5′-pGATC-3′ (p = 5′-phosphate). Calculate its molecular formula and molecular weight.',
            steps: [
            { text: 'Identify the four nucleotides in order: dGMP, dAMP, dTMP, dCMP (each as 5′-monophosphate).' },
            { text: 'Sum the molecular formulas of the four monomers:' },
            { text: 'Three phosphodiester bonds form (between 4 nucleotides), each eliminating one H₂O. Subtract 3 H₂O = H₆O₃.' },
            { text: 'Final formula = C₃₉H₅₁N₁₅O₂₅P₄.' },
            { text: 'Calculate MW using atomic weights (C=12.01, H=1.008, N=14.01, O=16.00, P=30.97):', faded: true, blankAnswer: 'Molecular formula = C₃₉H₅₁N₁₅O₂₅P₄; Molecular weight ≈ 1254.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_010', title: 'Hormones are low-molecular-weight.',
          scaffold: { problem: 'A researcher isolates a hormone from adrenal cortex extract. Elemental analysis gives C: 69.9%, H: 9.1%, O: 21.0%.',
            steps: [
            { text: 'Assume 100 g sample → moles of each element: C = 69.9/12.01 = 5.82 mol; H = 9.1/1.008 = 9.03 mol; O = 21.0/16.00 = 1.31.' },
            { text: 'Divide by smallest (1.31) → C: 4.44, H: 6.89, O: 1.00 → multiply by 2 to get near-integers → C₈.₈₈H₁₃.₇₈O₂ ≈ C₉H₁₄O₂.' },
            { text: 'Empirical formula mass = 9×12.01 + 14×1.008 + 2×16.00 = 154.2 g/mol.' },
            { text: 'Positive Liebermann-Burchard test + optical activity + adrenal cortex origin + MW ~360 → steroid hormone.' },
            { text: 'Verify structure: Cyclopentanoperhydrophenanthrene nucleus (4 fused rings), C3 ketone, C4-C5 double bond, 11β-OH,.', faded: true, blankAnswer: 'Molecular formula C₂₁H₃₀O₅; Class: Steroid hormone.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_009', title: 'Activation energy (Ea) is the minimum.',
          scaffold: { problem: 'The rate constant for the decomposition of hydrogen peroxide catalyzed by catalase enzyme is 1.2 × 10⁴ s⁻¹ at 298 K.',
            steps: [
            { text: 'Write Arrhenius equation for both: k_cat = A e^(–Ea_cat/RT) and k_uncat = A e^(–Ea_uncat/RT).' },
            { text: 'Divide the two equations to eliminate A: k_cat/k_uncat = e^[–(Ea_cat – Ea_uncat)/RT].' },
            { text: 'Take natural log: ln(k_cat/k_uncat) = –(Ea_cat – Ea_uncat)/RT.' },
            { text: 'Solve for Ea_cat: Ea_cat = Ea_uncat – RT ln(k_cat/k_uncat).' },
            { text: 'Plug values: k_cat/k_uncat = 1.2×10⁴ / 2.5×10⁻³ = 4800; ln(4800) = 8.476; RT = 8.314 × 298 = 2478 J mol⁻¹ = 2.478 kJ.', faded: true, blankAnswer: 'Ea(catalyzed) = 54.0 kJ mol⁻¹.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_006', title: 'SN1 (Substitution Nucleophilic.',
          scaffold: { problem: 'tert-Butyl chloride (0.02 M) undergoes solvolysis in 80% aqueous ethanol at 25°C. The reaction is first-order with k = 6.2 × 10⁻⁵ s⁻¹.',
            steps: [
            { text: 'Identify the rate law for SN1: Rate = k[R-X]. Here k = 6.2 × 10⁻⁵ s⁻¹, [R-X]₀ = 0.02 M.' },
            { text: 'Calculate initial rate: Rate₀ = (6.2 × 10⁻⁵ s⁻¹)(0.02 mol L⁻¹) = 1.24 × 10⁻⁶ mol L⁻¹ s⁻¹.' },
            { text: 'For first-order reactions, half-life t₁/₂ = ln(2)/k = 0.693 / (6.2 × 10⁻⁵ s⁻¹) = 1.12 × 10⁴ s = 3.11 hours.' },
            { text: 'Time for 90% completion (10% remaining): t = (1/k) ln([R-X]₀/[R-X]) = (1/6.2×10⁻⁵) ln(0.02/0.002) = 1.61×10⁴ × 2.303 =.' },
            { text: 'If [R-X] is doubled to 0.04 M, Rate = (6.2×10⁻⁵)(0.04) = 2.48×10⁻⁶ mol L⁻¹ s⁻¹ — rate doubles, confirming first-order.', faded: true, blankAnswer: '(a) 1.24 × 10⁻⁶ mol L⁻¹ s⁻¹, (b) 3.11 hours, (c) 10.3.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_10_005', title: 'Identify each idea',
          dissect: { specimen: 'Chemical Kinetics', spots: [
            { id: 's1', label: 'Collision theory states that for', prompt: 'Which idea is this? — Collision theory states that for a chemical reaction to occur, reactant molecules must.', answer: 'Collision theory states that for', options: ['Collision theory states that for', 'Proteins are biological polymers formed', 'Nucleic acids are long-chain polymeric', 'Hormones are low-molecular-weight chemical messengers'] },
            { id: 's2', label: 'Proteins are biological polymers formed', prompt: 'Which idea is this? — Proteins are biological polymers formed by condensation polymerization of α-amino acids,.', answer: 'Proteins are biological polymers formed', options: ['Proteins are biological polymers formed', 'Collision theory states that for', 'Nucleic acids are long-chain polymeric', 'Hormones are low-molecular-weight chemical messengers'] },
            { id: 's3', label: 'Nucleic acids are long-chain polymeric', prompt: 'Which idea is this? — Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide.', answer: 'Nucleic acids are long-chain polymeric', options: ['Nucleic acids are long-chain polymeric', 'Collision theory states that for', 'Proteins are biological polymers formed', 'Hormones are low-molecular-weight chemical messengers'] },
            { id: 's4', label: 'Hormones are low-molecular-weight chemical messengers', prompt: 'Which idea is this? — Hormones are low-molecular-weight chemical messengers secreted by endocrine (ductless).', answer: 'Hormones are low-molecular-weight chemical messengers', options: ['Hormones are low-molecular-weight chemical messengers', 'Collision theory states that for', 'Proteins are biological polymers formed', 'Nucleic acids are long-chain polymeric'] },
            { id: 's5', label: 'Activation energy Ea is the', prompt: 'Which idea is this? — Activation energy (Ea) is the minimum extra energy that reactant molecules must possess.', answer: 'Activation energy Ea is the', options: ['Activation energy Ea is the', 'Collision theory states that for', 'Proteins are biological polymers formed', 'Nucleic acids are long-chain polymeric'] },
            { id: 's6', label: 'SN1 Substitution Nucleophilic Unimolecular reaction', prompt: 'Which idea is this? — SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic.', answer: 'SN1 Substitution Nucleophilic Unimolecular reaction', options: ['SN1 Substitution Nucleophilic Unimolecular reaction', 'Collision theory states that for', 'Proteins are biological polymers formed', 'Nucleic acids are long-chain polymeric'] }
          ] } }
    ],
    explore: { component: C12_ChemistryChemicalKineticsSim, prompt: 'Explore the interactive — Chemical Kinetics' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_010', difficulty: 'standard',
          question: 'Collision theory states that for a chemical reaction to occur, reactant.',
          hint: 'Revisit the Maxwell‑Boltzmann distribution (Class 11 Kinetic Theory, node.',
          misconception: 'Students often treat the steric factor P as always equal to 1, assuming the Arrhenius pre‑exponential factor A is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Collision theory states that for a chemical reaction to occur, reactant molecules must',
                  options: ['Collision theory states that for a chemical reaction to occur, reactant molecules must', 'Proteins are biological polymers formed by condensation polymerization of α-amino acids,', 'Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide', 'Hormones are low-molecular-weight chemical messengers secreted by endocrine (ductless)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the steric factor P as always equal to 1, assuming the Arrhenius pre‑exponential factor A is exactly the collision.' }
          ],
            remediations: { 'students-often-treat-the-steric': { steps: ['If the student cannot distinguish the roles of energy and orientation, have them revisit the Maxwell‑Boltzmann.', 'Then, guide them through a step‑by‑step derivation of k = P·Z_AB·e^{-Ea/RT} using a diagram: draw two molecules.', 'Finally, give a re‑diagnostic: "Calculate P for a reaction where k = 2×10⁻⁴, Z_AB = 1×10¹¹, Ea = 60 kJ/mol at 300 K.', 'If P > 1, what does it imply?"'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_005', difficulty: 'standard',
          question: 'Proteins are biological polymers formed by condensation polymerization of.',
          hint: 'If unable to write peptide bond formation, review Class 11 resonance.',
          misconception: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond.',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the formation of the dipeptide Ala-Gly (alanyl-glycine) from alanine and glycine.', answer: 'C₃H₇NO₂ (Ala) + C₂H₅NO₂ (Gly) → C₅H₁₀N₂O₃ (Ala-Gly) + H₂O',
                  options: ['C₃H₇NO₂ (Ala) + C₂H₅NO₂ (Gly) → C₅H₁₀N₂O₃ (Ala-Gly) + H₂O', 'alanine-glycine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond character from resonance.' }
          ],
            remediations: { 'students-often-write-the-peptide': { steps: ['Revisit c11_chem_cbse_04_011 (Resonance Structures) to master amide resonance.', 'Practice drawing 5 amino acids with correct zwitterion charges at pH 7.', 'Write condensation reactions for 3 dipeptides, explicitly circling the water molecule lost and labeling N/C-termini.', 'Re-diagnostic: Draw the resonance hybrid of a peptide bond and mark the planar atoms.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All 20 standard amino acids are essential because proteins require all of them." Evaluate this statement.', answer: 'The claim is false',
                  options: ['The claim is false', 'all are essential', 'alanine-glycine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond character from resonance.' }
          ],
            remediations: { 'students-often-write-the-peptide': { steps: ['Revisit c11_chem_cbse_04_011 (Resonance Structures) to master amide resonance.', 'Practice drawing 5 amino acids with correct zwitterion charges at pH 7.', 'Write condensation reactions for 3 dipeptides, explicitly circling the water molecule lost and labeling N/C-termini.', 'Re-diagnostic: Draw the resonance hybrid of a peptide bond and mark the planar atoms.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_008', difficulty: 'standard',
          question: 'Nucleic acids are long-chain polymeric biomolecules composed of repeating.',
          hint: 'If unable to draw the cyclic sugar forms or identify anomeric carbon, revisit.',
          misconception: 'Students often write the nucleoside structure with the base attached to the **anomeric carbon (C-1) of the sugar in.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide',
                  options: ['Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide', 'Collision theory states that for a chemical reaction to occur, reactant molecules must', 'Proteins are biological polymers formed by condensation polymerization of α-amino acids,', 'Hormones are low-molecular-weight chemical messengers secreted by endocrine (ductless)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the nucleoside structure with the base attached to the **anomeric carbon (C-1) of the sugar in α-configuration** (like.' }
          ],
            remediations: { 'students-often-write-the-nucleoside': { steps: ['Revisit **c12_chem_cbse_10_001** (carbohydrate classification) to review glycosidic bond formation and anomeric carbon.', 'Practice drawing β-D-ribose and β-D-2-deoxyribose in Haworth form, labeling 1′, 2′, 3′, 4′, 5′ carbons.', 'Verify: 1′ has base, 5′ has CH₂OH (which becomes CH₂O-PO₃²⁻ in nucleotide).', 'Build a physical model (or paper cutouts) of two nucleotides: connect 3′-OH of first to 5′-phosphate of second via.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the nucleoside structure with the base attached to the **anomeric carbon (C-1) of the sugar in.',
          parts: [
                { id: 'a', prompt: 'Design a simple chemical test to distinguish between a solution of DNA and a solution of RNA using only reagents available in a school laboratory (dilute NaOH,.', answer: '**Test:** Take two test tubes',
                  options: ['**Test:** Take two test tubes', 'add Fehling\'s solution', 'test for reducing sugar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the nucleoside structure with the base attached to the **anomeric carbon (C-1) of the sugar in α-configuration** (like.' }
          ],
            remediations: { 'students-often-write-the-nucleoside': { steps: ['Revisit **c12_chem_cbse_10_001** (carbohydrate classification) to review glycosidic bond formation and anomeric carbon.', 'Practice drawing β-D-ribose and β-D-2-deoxyribose in Haworth form, labeling 1′, 2′, 3′, 4′, 5′ carbons.', 'Verify: 1′ has base, 5′ has CH₂OH (which becomes CH₂O-PO₃²⁻ in nucleotide).', 'Build a physical model (or paper cutouts) of two nucleotides: connect 3′-OH of first to 5′-phosphate of second via.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_010', difficulty: 'standard',
          question: 'Hormones are low-molecular-weight chemical messengers secreted by endocrine.',
          hint: 'If stuck on hormone mechanism, revisit c11_chem_cbse_07_011 (enzyme regulation) — the.',
          misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.',
          parts: [
                { id: 'a', prompt: 'Name the chemical class of each hormone: (a) insulin, (b) cortisol, (c) thyroxine, (d) epinephrine. Give one structural feature that places each in its class.', answer: 'insulin, (',
                  options: ['insulin, (', 'protein hormone', 'amino acid derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.' },
                { id: 'b', prompt: 'A patient has fasting blood glucose 180 mg/dL (normal 70-100). The physician suspects diabetes mellitus. Which hormone is deficient or ineffective?', answer: 'Hormone: Insulin (deficient in Type 1, ineffective/resistant in Type 2)',
                  options: ['Hormone: Insulin (deficient in Type 1, ineffective/resistant in Type 2)', 'insulin activates adenylate cyclase → cAMP', 'Insulin and glucagon are both peptides, so they work the same way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.' }
          ],
            remediations: { 'insulin-and-glucagon-are-both': { steps: ['Revisit c12_chem_cbse_10_005 (amino acids) and c12_chem_cbse_10_006 (protein structure) — draw insulin\'s two-chain.', 'Revisit c11_chem_cbse_07_011 (enzyme regulation) — compare RTK vs GPCR signaling cascades side-by-side.', 'Make a 3×3 table: Hormone | Chemical Class | Receptor Location | Second Messenger | Key Kinase | Metabolic Direction.', 'Take a diagnostic quiz: "Classify hormone X, predict receptor type, predict effect on glycogen." If <80% correct,.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All steroid hormones are synthesized from cholesterol and therefore have identical mechanisms of action." Identify three specific.', answer: 'ERROR 1: "Identical mechanisms of action"',
                  options: ['ERROR 1: "Identical mechanisms of action"', 'steroid hormone', 'Insulin and glucagon are both peptides, so they work the same way', 'Reason: Both are peptides'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.' },
                { id: 'b', prompt: 'Design a thought experiment: You have three unknown hormone samples (A, B, C).', answer: 'Sample A: Steroid hormone (e.g., cortisol, estradiol, testosterone)',
                  options: ['Sample A: Steroid hormone (e.g., cortisol, estradiol, testosterone)', 'steroid', 'Insulin and glucagon are both peptides, so they work the same way', 'Reason: Both are peptides'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe: "Insulin and glucagon are both peptides, so they work the same way." WRONG.' }
          ],
            remediations: { 'insulin-and-glucagon-are-both': { steps: ['Revisit c12_chem_cbse_10_005 (amino acids) and c12_chem_cbse_10_006 (protein structure) — draw insulin\'s two-chain.', 'Revisit c11_chem_cbse_07_011 (enzyme regulation) — compare RTK vs GPCR signaling cascades side-by-side.', 'Make a 3×3 table: Hormone | Chemical Class | Receptor Location | Second Messenger | Key Kinase | Metabolic Direction.', 'Take a diagnostic quiz: "Classify hormone X, predict receptor type, predict effect on glycogen." If <80% correct,.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_009', difficulty: 'standard',
          question: 'Activation energy (Ea) is the minimum extra energy that reactant molecules must.',
          hint: 'Review the derivation of ln k = –Ea/R (1/T) + ln A from k = A e^(–Ea/RT) and practice.',
          misconception: 'Students often think activation energy is the energy of the reactants or the energy released in the reaction.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Activation energy (Ea) is the minimum extra energy that reactant molecules must possess',
                  options: ['Activation energy (Ea) is the minimum extra energy that reactant molecules must possess', 'Collision theory states that for a chemical reaction to occur, reactant molecules must', 'Proteins are biological polymers formed by condensation polymerization of α-amino acids,', 'Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think activation energy is the energy of the reactants or the energy released in the reaction.' }
          ],
            remediations: { 'activation-energy-is-the-energy': { steps: ['Revisit c12_chem_cbse_03_008 (Arrhenius Equation) and re-derive ln k = –Ea/R (1/T) + ln A from k = A e^(–Ea/RT).', 'Practice the two-point calculation with a template: write k₁, T₁, k₂, T₂ → compute ln(k₂/k₁) → compute (1/T₂ – 1/T₁) →.', 'Draw the potential energy diagram for an exothermic and an endothermic reaction, labeling Ea(forward), Ea(reverse), and.', 'Do the diagnostic question 3 again, but this time use log₁₀ form and verify you get the same Ea.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_006', difficulty: 'standard',
          question: 'SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step.',
          hint: 'If stuck, revisit c11_chem_cbse_04_007 (Hybridisation) for sp² geometry and.',
          misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic',
                  options: ['SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic', 'Collision theory states that for a chemical reaction to occur, reactant molecules must', 'Proteins are biological polymers formed by condensation polymerization of α-amino acids,', 'Nucleic acids are long-chain polymeric biomolecules composed of repeating nucleotide'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and formation.' }
          ],
            remediations: { 'students-write-the-sn1-mechanism': { steps: ['If the student draws a one-step mechanism or predicts inversion: (1) Revisit c11_chem_cbse_04_007 (Hybridisation) —.', '(2) Revisit c12_chem_cbse_06_001 — classify the substrate as 1°, 2°, 3° and recall that only 3°/allylic/benzylic form.', '(3) Perform the "umbrella inversion" demo: hold an umbrella (representing sp³ carbon), flip it inside out (inversion,.', '(4) Re-derive rate law from slow step: Rate = k₁[R-X] (k₁ = rate constant for ionization).'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "SN1 reactions always give complete racemization." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'always racemization'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and formation.' }
          ],
            remediations: { 'students-write-the-sn1-mechanism': { steps: ['If the student draws a one-step mechanism or predicts inversion: (1) Revisit c11_chem_cbse_04_007 (Hybridisation) —.', '(2) Revisit c12_chem_cbse_06_001 — classify the substrate as 1°, 2°, 3° and recall that only 3°/allylic/benzylic form.', '(3) Perform the "umbrella inversion" demo: hold an umbrella (representing sp³ carbon), flip it inside out (inversion,.', '(4) Re-derive rate law from slow step: Rate = k₁[R-X] (k₁ = rate constant for ionization).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
