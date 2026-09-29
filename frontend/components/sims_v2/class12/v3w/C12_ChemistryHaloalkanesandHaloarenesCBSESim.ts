import type { SimDef } from '../../engine/types';
import C12_ChemistryHaloalkanesandHaloarenesCBSESim from '../../../simulations/c6_12/C12_ChemistryHaloalkanesandHaloarenesCBSESim';

/** v3 wrapped master — C12_ChemistryHaloalkanesandHaloarenesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistryhaloalkanesandhaloarenescbsesim: SimDef = {
    id: 'v3w_c12_chemistryhaloalkanesandhaloarenescbsesim',
    title: 'Nomenclature of Haloalkanes and Haloarenes',
    subtitle: 'Covers IUPAC nomenclature rules for haloalkanes (including allylic, benzylic, vinylic).',
    classLevel: 12, subject: 'chemistry', topic: 'Nomenclature of Haloalkanes and Haloarenes',
    chapters: [],
    nodeIds: ['c12_chem_cbse_06_002', 'c12_chem_cbse_06_003', 'c12_chem_cbse_06_005', 'c12_chem_cbse_06_008', 'c12_chem_cbse_06_009', 'c12_chem_cbse_06_006', 'c12_chem_cbse_06_001', 'c12_chem_cbse_07_004', 'c12_chem_cbse_07_002', 'c12_chem_cbse_07_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Look at a medicine strip — many drugs like chloramphenicol (antibiotic) or halothane (anaesthetic) contain.', goal: 'Master Nomenclature of Haloalkanes and Haloarenes.' },
    discovery: {
        question: 'Write the IUPAC name for CH₃CH₂CH(Cl)CH₃. Identify whether it is a primary, secondary, or tertiary haloalkane.',
        options: ['2-Chlorobutane; secondary haloalkane', '1-chlorobutane', '2-methyl-1-chloropropane'],
        answer: '2-Chlorobutane; secondary haloalkane',
        hook: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.',
    },
    teaching: [
        { title: 'Nomenclature of haloalkanes and haloarenes.', text: 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic compounds where one or more hydrogen atoms of aliphatic or aromatic hydrocarbons are replaced by halogen atoms (F,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_002', title: 'Nomenclature of haloalkanes and.',
          scaffold: { problem: 'Write the IUPAC name and classify the haloalkane: (CH₃)₂CHCH₂CH(Cl)CH₃',
            steps: [
            { text: 'Identify the longest continuous carbon chain. The skeleton has 5 carbons in a row: CH₃-CH-CH₂-CH-CH₃ with a CH₃ branch.' },
            { text: 'Number the chain to give the halogen the lowest locant. Numbering from left: Cl on C-4.' },
            { text: 'Identify and name substituents with locants. At C-2 (new numbering): Cl and CH₃ branch.' },
            { text: 'Assemble name alphabetically: chloro (c) before methyl (m) → 2-chloro-4-methylpentane.' },
            { text: 'Classify: Carbon bearing Cl (C-2) is attached to two carbons (C-1 and C-3) → secondary haloalkane.', faded: true, blankAnswer: '2-chloro-4-methylpentane; secondary haloalkane' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_003', title: 'Preparation of haloalkanes from.',
          scaffold: { problem: 'In a school laboratory, a student needs to prepare pure 2-chlorobutane from butan-2-ol. The available reagents are: conc.',
            steps: [
            { text: 'Identify substrate — butan-2-ol is a **secondary alcohol** with a chiral centre at C-2.' },
            { text: 'Evaluate reagents — conc. HCl/ZnCl₂ (Lucas) promotes SN1 via carbocation → racemic mixture.' },
            { text: 'Choose SOCl₂/pyridine. Pyridine acts as base to neutralise HCl and prevents carbocation formation.' },
            { text: 'Write mechanism: (i) Alcohol attacks S of SOCl₂ → alkyl chlorosulfite ester + Cl⁻; (ii) Cl⁻ attacks C-2 from backside.' },
            { text: 'If starting with (R)-butan-2-ol (10.0 g, 0.135 mol), theoretical yield of (S)-2-chlorobutane = 0.135 mol × 92.57 g/mol.', faded: true, blankAnswer: 'Reagent: SOCl₂ / pyridine (ether, 0°C → RT). Product:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_005', title: 'Haloarenes (aryl halides) are prepared.',
          scaffold: { problem: 'Write the complete mechanism for the bromination of benzene using Br₂/FeBr₃.',
            steps: [
            { text: 'Identify reactants: benzene (C₆H₆), bromine (Br₂), catalyst FeBr₃.' },
            { text: 'Electrophile generation: FeBr₃ + Br₂ → FeBr₄⁻ Br⁺ (polarisation of Br-Br bond).' },
            { text: 'Electrophilic attack: π-electrons of benzene attack Br⁺, forming a resonance-stabilised arenium ion (sigma complex).' },
            { text: 'Deprotonation: Base (FeBr₄⁻ or Br⁻) removes H⁺ from the sp³ carbon, restoring aromaticity, giving bromobenzene (C₆H₅Br).' },
            { text: 'Write overall balanced equation: C₆H₆ + Br₂ --(FeBr₃)--> C₆H₅Br + HBr.', faded: true, blankAnswer: 'Mechanism with three resonance structures of arenium ion;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_008', title: 'Elimination reactions in haloalkanes.',
          scaffold: { problem: 'When 2-bromo-2-methylbutane is heated with ethanolic KOH, a mixture of alkenes is obtained.',
            steps: [
            { text: 'Draw the substrate: (CH₃)₃C–CH₂Br? Wait, 2-bromo-2-methylbutane is (CH₃)₂C(Br)CH₂CH₃.' },
            { text: 'Identify β-hydrogens: On C1 (9 equivalent H\'s from three CH₃) and on C3 (2 H\'s from CH₂).' },
            { text: 'Loss of Br⁻ gives tertiary carbocation (CH₃)₂C⁺CH₂CH₃ (stable, no rearrangement needed).' },
            { text: 'Base (OH⁻ or EtO⁻) abstracts a β-H. Two possible alkenes: (a) from methyl β-H → 2-methylbut-1-ene (disubstituted,.' },
            { text: 'Apply Zaitsev\'s rule: more substituted alkene (trisubstituted) is major.' },
            { text: 'Write mechanism: (i) Slow heterolysis: (CH₃)₂C(Br)CH₂CH₃ → (CH₃)₂C⁺CH₂CH₃ + Br⁻.', faded: true, blankAnswer: 'Major product: 2-methylbut-2-ene (trisubstituted). Minor.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_009', title: 'Haloalkanes (alkyl halides) undergo.',
          scaffold: { problem: 'Arrange the following in increasing order of reactivity towards aqueous KOH hydrolysis: chlorobenzene, benzyl chloride, 2-chloropropane,.',
            steps: [
            { text: 'Classify each substrate — chlorobenzene (aryl halide), benzyl chloride (primary benzylic), 2-chloropropane (secondary.' },
            { text: 'Recall hydrolysis with aqueous KOH proceeds via SN1 for tertiary, SN2 for primary/secondary, and is extremely slow for.' },
            { text: 'Analyze each: (a) 2-chloro-2-methylpropane forms stable 3° carbocation → fastest SN1.' },
            { text: 'Order: chlorobenzene < 2-chloropropane < benzyl chloride < 2-chloro-2-methylpropane.' },
            { text: 'Verify with known relative rates: tertiary > benzylic > secondary > primary > aryl.', faded: true, blankAnswer: 'Chlorobenzene < 2-chloropropane < benzyl chloride <.' }
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
        { type: 'dissect', nodeId: 'c12_chem_cbse_06_003', title: 'Identify each idea',
          dissect: { specimen: 'Nomenclature of Haloalkanes and Haloarenes', spots: [
            { id: 's1', label: 'Nomenclature of haloalkanes and haloarenes', prompt: 'Which idea is this? — Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic.', answer: 'Nomenclature of haloalkanes and haloarenes', options: ['Nomenclature of haloalkanes and haloarenes', 'Preparation of haloalkanes from alcohols', 'Haloarenes aryl halides are prepared', 'Elimination reactions in haloalkanes involve'] },
            { id: 's2', label: 'Preparation of haloalkanes from alcohols', prompt: 'Which idea is this? — Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH).', answer: 'Preparation of haloalkanes from alcohols', options: ['Preparation of haloalkanes from alcohols', 'Nomenclature of haloalkanes and haloarenes', 'Haloarenes aryl halides are prepared', 'Elimination reactions in haloalkanes involve'] },
            { id: 's3', label: 'Haloarenes aryl halides are prepared', prompt: 'Which idea is this? — Haloarenes (aryl halides) are prepared by electrophilic aromatic substitution where a.', answer: 'Haloarenes aryl halides are prepared', options: ['Haloarenes aryl halides are prepared', 'Nomenclature of haloalkanes and haloarenes', 'Preparation of haloalkanes from alcohols', 'Elimination reactions in haloalkanes involve'] },
            { id: 's4', label: 'Elimination reactions in haloalkanes involve', prompt: 'Which idea is this? — Elimination reactions in haloalkanes involve the removal of a hydrogen atom from the.', answer: 'Elimination reactions in haloalkanes involve', options: ['Elimination reactions in haloalkanes involve', 'Nomenclature of haloalkanes and haloarenes', 'Preparation of haloalkanes from alcohols', 'Haloarenes aryl halides are prepared'] },
            { id: 's5', label: 'Haloalkanes alkyl halides undergo nucleophilic', prompt: 'Which idea is this? — Haloalkanes (alkyl halides) undergo nucleophilic substitution reactions readily due to.', answer: 'Haloalkanes alkyl halides undergo nucleophilic', options: ['Haloalkanes alkyl halides undergo nucleophilic', 'Nomenclature of haloalkanes and haloarenes', 'Preparation of haloalkanes from alcohols', 'Haloarenes aryl halides are prepared'] },
            { id: 's6', label: 'SN1 Substitution Nucleophilic Unimolecular reaction', prompt: 'Which idea is this? — SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic.', answer: 'SN1 Substitution Nucleophilic Unimolecular reaction', options: ['SN1 Substitution Nucleophilic Unimolecular reaction', 'Nomenclature of haloalkanes and haloarenes', 'Preparation of haloalkanes from alcohols', 'Haloarenes aryl halides are prepared'] }
          ] } }
    ],
    explore: { component: C12_ChemistryHaloalkanesandHaloarenesCBSESim, prompt: 'Explore the interactive — Nomenclature of Haloalkanes and Haloarenes' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_002', difficulty: 'standard',
          question: 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of.',
          hint: 'If stuck on parent chain selection, revisit c11_chem_cbse_10_013 worked examples on.',
          misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name for CH₃CH₂CH(Cl)CH₃. Identify whether it is a primary, secondary, or tertiary haloalkane.', answer: '2-Chlorobutane; secondary haloalkane',
                  options: ['2-Chlorobutane; secondary haloalkane', '1-chlorobutane', '2-methyl-1-chloropropane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' },
                { id: 'b', prompt: 'Draw the structure and give the IUPAC name for the compound with molecular formula C₄H₈Br₂ that has both bromine atoms on the same carbon.', answer: 'Structure: CH₃CH₂CBr₂CH₃ (or CH₃CBr₂CH₂CH₃)',
                  options: ['Structure: CH₃CH₂CBr₂CH₃ (or CH₃CBr₂CH₂CH₃)', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' },
                { id: 'c', prompt: 'Compare the IUPAC naming of 1-bromo-2-methylbenzene and 1-bromo-3-methylbenzene. Why does the common name system use "o-" and "m-" while IUPAC uses numbers?', answer: '1-Bromo-2-methylbenzene (ortho) and 1-bromo-3-methylbenzene (meta) have the same',
                  options: ['1-Bromo-2-methylbenzene (ortho) and 1-bromo-3-methylbenzene (meta) have the same', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' }
          ],
            remediations: { 'students-frequently-choose-the-parent': { steps: ['Revisit c11_chem_cbse_10_013 (IUPAC nomenclature of organic compounds) — practice identifying longest continuous chain.', 'Revisit c10_chem_cbse_04_008 (Nomenclature of Carbon Compounds) — review numbering rules for functional groups and.', 'Do this re-diagnostic: Draw all structural isomers of C₆H₁₄, name each by IUPAC, then replace one H with Cl on each.', 'Check each name against the three rules: longest chain, lowest locant set, alphabetical prefixes.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.',
          parts: [
                { id: 'a', prompt: 'A student writes the IUPAC name of (CH₃)₃CCH₂Br as "1-bromo-2,2-dimethylpropane". Evaluate if this is correct.', answer: 'Correct',
                  options: ['Correct', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane', 'chloro'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' }
          ],
            remediations: { 'students-frequently-choose-the-parent': { steps: ['Revisit c11_chem_cbse_10_013 (IUPAC nomenclature of organic compounds) — practice identifying longest continuous chain.', 'Revisit c10_chem_cbse_04_008 (Nomenclature of Carbon Compounds) — review numbering rules for functional groups and.', 'Do this re-diagnostic: Draw all structural isomers of C₆H₁₄, name each by IUPAC, then replace one H with Cl on each.', 'Check each name against the three rules: longest chain, lowest locant set, alphabetical prefixes.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_003', difficulty: 'standard',
          question: 'Preparation of haloalkanes from alcohols involves the substitution of the.',
          hint: 'If stuck on mechanism prediction, revisit **c11_chem_cbse_04_007 (Hybridisation)** for.',
          misconception: '**Misconception:** "All alcohols react with conc. HX to give haloalkanes via the same mechanism." **Reality:** Students.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)',
                  options: ['Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Haloarenes (aryl halides) are prepared by electrophilic aromatic substitution where a', 'Elimination reactions in haloalkanes involve the removal of a hydrogen atom from the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All alcohols react with conc. HX to give haloalkanes via the same mechanism." **Reality:** Students write a single.' }
          ],
            remediations: { 'misconception-all-alcohols-react-with': { steps: ['If the student cannot distinguish mechanisms by alcohol class: 1.', 'Revisit **c11_chem_cbse_04_007 (Hybridisation)** — draw sp³ vs sp² carbons, identify carbocation stability order 3° >.', 'Revisit **c12_chem_cbse_06_001 (Classification)** — practice identifying 1°/2°/3° alcohols from structures.', 'Do **re-diagnostic**: Given CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH — predict reaction speed with HCl/ZnCl₂ and mechanism.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "All alcohols react with conc. HX to give haloalkanes via the same mechanism." **Reality:** Students.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Phosphorus tribromide (PBr₃) is better than thionyl chloride for preparing alkyl bromides because PBr₃ gives higher yields." Evaluate this.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'PBr₃ for Br, SOCl₂ for Cl'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All alcohols react with conc. HX to give haloalkanes via the same mechanism." **Reality:** Students write a single.' }
          ],
            remediations: { 'misconception-all-alcohols-react-with': { steps: ['If the student cannot distinguish mechanisms by alcohol class: 1.', 'Revisit **c11_chem_cbse_04_007 (Hybridisation)** — draw sp³ vs sp² carbons, identify carbocation stability order 3° >.', 'Revisit **c12_chem_cbse_06_001 (Classification)** — practice identifying 1°/2°/3° alcohols from structures.', 'Do **re-diagnostic**: Given CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH — predict reaction speed with HCl/ZnCl₂ and mechanism.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_005', difficulty: 'standard',
          question: 'Haloarenes (aryl halides) are prepared by electrophilic aromatic substitution.',
          hint: 'If stuck on directing effects, review Class 11 Hydrocarbons chapter: "Electrophilic.',
          misconception: 'Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl" omitting the diazonium.',
          parts: [
                { id: 'a', prompt: 'Write the reagents and conditions for the electrophilic chlorination of benzene. What is the role of the Lewis acid catalyst?', answer: 'Reagents: Benzene + Cl₂ with anhydrous FeCl₃ (or AlCl₃) in dark/room temperature',
                  options: ['Reagents: Benzene + Cl₂ with anhydrous FeCl₃ (or AlCl₃) in dark/room temperature', 'FeCl₃ acts as a base', 'no catalyst needed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl" omitting the diazonium salt intermediate and.' }
          ],
            remediations: { 'students-often-write-the-sandmeyer': { steps: ['Revisit node c11_chem_cbse_04_011 (Resonance Structures) to draw halogen resonance donation.', 'Review Class 11 Hydrocarbons chapter (electrophilic substitution mechanism) for carbocation intermediate stability.', 'Practice directing effect tables: activating = ortho/para (except -CH₃, -OH, -NH₂); deactivating = meta (except.', 'Re-do Diagnostic Q2 and Q4 with explicit resonance drawings.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl" omitting the diazonium.',
          parts: [
                { id: 'a', prompt: 'A student attempts to prepare iodobenzene by heating benzene with I₂ and FeCl₃. The reaction fails.', answer: 'Iodination is reversible: C₆H₆ + I₂ ⇌ C₆H₅I + HI',
                  options: ['Iodination is reversible: C₆H₆ + I₂ ⇌ C₆H₅I + HI', 'use FeCl₃ like chlorination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl" omitting the diazonium salt intermediate and.' }
          ],
            remediations: { 'students-often-write-the-sandmeyer': { steps: ['Revisit node c11_chem_cbse_04_011 (Resonance Structures) to draw halogen resonance donation.', 'Review Class 11 Hydrocarbons chapter (electrophilic substitution mechanism) for carbocation intermediate stability.', 'Practice directing effect tables: activating = ortho/para (except -CH₃, -OH, -NH₂); deactivating = meta (except.', 'Re-do Diagnostic Q2 and Q4 with explicit resonance drawings.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_008', difficulty: 'standard',
          question: 'Elimination reactions in haloalkanes involve the removal of a hydrogen atom.',
          hint: 'If stuck on carbocation stability, revisit c12_chem_cbse_06_006 (SN1) where the stability.',
          misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining.',
          parts: [
                { id: 'a', prompt: 'Predict the major alkene product(s) when 2-bromo-3-methylbutane is treated with (i) alcoholic KOH (heat) and (ii) bulky base like t-BuOK in t-BuOH.', answer: '(i) Alcoholic KOH (small base, thermodynamic control) → Zaitsev product:',
                  options: ['(i) Alcoholic KOH (small base, thermodynamic control) → Zaitsev product:', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' },
                { id: 'b', prompt: 'Compare the stereochemical outcomes of E2 elimination from (2R,3R)-2-bromo-3-methylpentane and (2R,3S)-2-bromo-3-methylpentane using a strong non-bulky base.', answer: 'E2 requires anti-periplanar geometry (H–C–C–X dihedral angle 180°)',
                  options: ['E2 requires anti-periplanar geometry (H–C–C–X dihedral angle 180°)', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' }
          ],
            remediations: { 'students-often-write-e1-follows': { steps: ['If the student cannot distinguish E1 vs E2 conditions, have them create a 2×2 table: rows = substrate (1°, 2°, 3°),.', 'Fill in the dominant mechanism (E1, E2, SN1, SN2) for each cell using the rule: 3° + weak base → E1/SN1; 3° + strong.', 'Then practice drawing the anti-periplanar conformation for a simple acyclic substrate (e.g., 2-bromobutane) using.', 'Revisit c12_chem_cbse_06_006 (SN1 carbocation stability) and c12_chem_cbse_06_007 (SN2 steric hindrance) if the.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining.',
          parts: [
                { id: 'a', prompt: 'A student claims: "E1 reactions always give racemic mixtures if the carbocation is chiral, just like SN1." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'racemization', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' },
                { id: 'b', prompt: 'Compare the stereochemical outcomes of E2 elimination from (2R,3R)-2-bromo-3-methylpentane and (2R,3S)-2-bromo-3-methylpentane using a strong non-bulky base.', answer: 'E2 requires anti-periplanar geometry (H–C–C–X dihedral angle 180°)',
                  options: ['E2 requires anti-periplanar geometry (H–C–C–X dihedral angle 180°)', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' }
          ],
            remediations: { 'students-often-write-e1-follows': { steps: ['If the student cannot distinguish E1 vs E2 conditions, have them create a 2×2 table: rows = substrate (1°, 2°, 3°),.', 'Fill in the dominant mechanism (E1, E2, SN1, SN2) for each cell using the rule: 3° + weak base → E1/SN1; 3° + strong.', 'Then practice drawing the anti-periplanar conformation for a simple acyclic substrate (e.g., 2-bromobutane) using.', 'Revisit c12_chem_cbse_06_006 (SN1 carbocation stability) and c12_chem_cbse_06_007 (SN2 steric hindrance) if the.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_009', difficulty: 'standard',
          question: 'Haloalkanes (alkyl halides) undergo nucleophilic substitution reactions readily.',
          hint: 'If stuck, revisit Class 11 resonance (c11_chem_cbse_04_011) and practice drawing benzylic.',
          misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is.',
          parts: [
                { id: 'a', prompt: 'Predict the major product when p-chloronitrobenzene is treated with aqueous NaOH at 623 K and 300 atm.', answer: 'Major product: p-nitrophenol',
                  options: ['Major product: p-nitrophenol', 'meta also works'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is wrong: the phenyl.' },
                { id: 'b', prompt: 'Compare the reactivity of chlorobenzene and benzyl chloride (C₆H₅CH₂Cl) towards SN1 and SN2 reactions. Explain the role of the phenyl group in each case.', answer: 'Benzyl chloride: primary benzylic halide',
                  options: ['Benzyl chloride: primary benzylic halide', 'phenyl cation is stable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is wrong: the phenyl.' }
          ],
            remediations: { 'students-often-write-chlorobenzene-undergoes': { steps: ['If the student cannot distinguish phenyl vs benzylic cation stability: (1) Revisit node c12_chem_cbse_06_006 (SN1.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Chlorobenzene undergoes nitration faster than benzene because –Cl is an electron-donating group by resonance." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'directing influence', 'activating/deactivating nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is wrong: the phenyl.' },
                { id: 'b', prompt: 'Compare the reactivity of chlorobenzene and benzyl chloride (C₆H₅CH₂Cl) towards SN1 and SN2 reactions. Explain the role of the phenyl group in each case.', answer: 'Benzyl chloride: primary benzylic halide',
                  options: ['Benzyl chloride: primary benzylic halide', 'phenyl cation is stable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is wrong: the phenyl.' }
          ],
            remediations: { 'students-often-write-chlorobenzene-undergoes': { steps: ['If the student cannot distinguish phenyl vs benzylic cation stability: (1) Revisit node c12_chem_cbse_06_006 (SN1.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_006', difficulty: 'standard',
          question: 'SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step.',
          hint: 'If stuck, revisit c11_chem_cbse_04_007 (Hybridisation) for sp² geometry and.',
          misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic',
                  options: ['SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)', 'Haloarenes (aryl halides) are prepared by electrophilic aromatic substitution where a'],
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
