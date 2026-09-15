import type { SimDef } from '../../engine/types';
import C12_ChemistryAminesandDiazoniumSaltsCBSESim from '../../../simulations/c6_12/C12_ChemistryAminesandDiazoniumSaltsCBSESim';

/** v3 wrapped master — C12_ChemistryAminesandDiazoniumSaltsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistryaminesanddiazoniumsaltscbsesim: SimDef = {
    id: 'v3w_c12_chemistryaminesanddiazoniumsaltscbsesim',
    title: 'Aminesand Diazonium Salts CBSE',
    subtitle: 'This node covers: (a) preparation of aryldiazonium salts (diazotisation) with conditions;.',
    classLevel: 12, subject: 'chemistry', topic: 'Diazonium Salts: Preparation and Reactions',
    chapters: [],
    nodeIds: ['c12_chem_cbse_09_009', 'c12_chem_cbse_09_006', 'c12_chem_cbse_09_010', 'c12_chem_cbse_09_002', 'c12_chem_cbse_09_004', 'c12_chem_cbse_09_007', 'c12_chem_cbse_09_001', 'c12_chem_cbse_09_003', 'c12_chem_cbse_09_005', 'c12_chem_cbse_09_008', 'c12_chem_cbse_07_004', 'c12_chem_cbse_07_009', 'c12_chem_cbse_06_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a bottle of aniline in the laboratory — it is a colourless liquid that turns brown on exposure to air.', goal: 'Master Aminesand Diazonium Salts CBSE.' },
    discovery: {
        question: 'Compare the Sandmeyer reaction and the Gattermann reaction for introducing chlorine or bromine into an aromatic ring via diazonium salts.',
        options: ['Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX', 'both give same yield', 'copper powder is a catalyst'],
        answer: 'Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX',
        hook: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like.',
    },
    teaching: [
        { title: 'Diazonium salts are a class of organic.', text: 'Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where Ar is an aryl group and X⁻ is an anion such as Cl⁻, Br⁻, HSO₄⁻, BF₄⁻).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_009', title: 'Diazonium salts are a class of organic.',
          scaffold: { problem: 'Convert aniline to 3-bromophenol. Write the complete sequence of reactions with reagents, conditions, and balanced equations for each step.',
            steps: [
            { text: 'Identify the target – 3-bromophenol has –OH and –Br meta to each other. Aniline has –NH₂ which is ortho/para-directing.' },
            { text: 'Diazotise aniline: C₆H₅NH₂ + NaNO₂ + 2HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O (273–278 K).' },
            { text: 'Replace –N₂⁺ with –OH by warming the diazonium solution to 283 K: C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂↑ + HCl.' },
            { text: 'Brominate phenol. Phenol is highly activated; with Br₂/H₂O (or Br₂/CS₂ at low temp) we get 2,4,6-tribromophenol.' },
            { text: 'Actually, the standard textbook route (NCERT Example 9.5) for 3-bromophenol from aniline: (i) Diazotise aniline →.' },
            { text: 'For meta, we need a meta-directing group. Correct sequence from aniline: (i) Acylate aniline → acetanilide (–NHCOCH₃,.' },
            { text: 'Realization: 3-bromophenol is meta-bromophenol. The only way to get meta substitution on benzene is via a.', faded: true, blankAnswer: 'Step 1: Aniline → Benzene: C₆H₅NH₂ + NaNO₂ + 2HCl →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_006', title: 'Physical properties of amines refer to.',
          scaffold: { problem: 'In a laboratory, three colourless liquids A, B, C (all C₄H₁₁N isomers) are found.',
            steps: [
            { text: 'Recognise all three have same molar mass (73 g/mol) → van der Waals forces similar; differences arise from H-bonding.' },
            { text: 'Recall primary amines (RNH₂) have two N–H bonds → can act as H-bond donor twice and acceptor once (lone pair) → form.' },
            { text: 'Secondary amines (R₂NH) have one N–H bond → one donor site, one acceptor site → weaker association.' },
            { text: 'Tertiary amines (R₃N) have zero N–H bonds → no H-bond donation, only acceptor (lone pair) → weakest association, only.' },
            { text: 'Match boiling points: highest (350.8 K) = primary (butan-1-amine); middle (329.3 K) = secondary (diethylamine); lowest.', faded: true, blankAnswer: 'A = primary amine (butan-1-amine), B = secondary amine.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_010', title: 'A coupling reaction is an electrophilic.',
          scaffold: { problem: 'Aniline (0.01 mol) is diazotised with NaNO₂/HCl at 273 K. The resulting benzenediazonium chloride solution is added dropwise to a cooled.',
            steps: [
            { text: 'Identify reactants — benzenediazonium chloride (C₆H₅N₂⁺Cl⁻) from aniline, and phenoxide (C₆H₅O⁻) from phenol + NaOH.' },
            { text: 'Write balanced equation: C₆H₅N₂⁺Cl⁻ + C₆H₅O⁻ → p-HOC₆H₄–N=N–C₆H₅ + Cl⁻. (Net ionic; Na⁺ and Cl⁻ are spectators).' },
            { text: 'Determine limiting reagent — aniline (0.01 mol) gives 0.01 mol diazonium salt; phenol (0.015 mol) gives 0.015 mol.' },
            { text: 'Theoretical yield = 0.01 mol × 184 g/mol = 1.84 g of p-hydroxyazobenzene.' },
            { text: 'NaOH deprotonates phenol (pKa ~10) to phenoxide, which is more strongly activating (+M effect of O⁻ > OH), increasing.', faded: true, blankAnswer: 'Balanced equation: C₆H₅N₂⁺Cl⁻ + C₆H₅O⁻ → p-HOC₆H₄–N=N–C₆H₅.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_002', title: 'IUPAC nomenclature of amines.',
          scaffold: { problem: 'Write the IUPAC name of the amine with structure CH₃CH₂CH(NH₂)CH₃.',
            steps: [
            { text: 'Identify the longest carbon chain containing the –NH₂ group. The chain is 4 carbons (butane).' },
            { text: 'Number the chain to give the carbon bearing –NH₂ the lowest locant.' },
            { text: 'Parent name = butane → drop \'e\' + amine = butanamine. With locant: butan-2-amine.' },
            { text: 'Check for N-substituents: N/A (primary amine).' },
            { text: 'Assemble: butan-2-amine.', faded: true, blankAnswer: 'Butan-2-amine' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_004', title: 'Gabriel phthalimide synthesis is a.',
          scaffold: { problem: 'A student wants to prepare pure butan-1-amine (CH₃CH₂CH₂CH₂NH₂) in the lab using Gabriel synthesis.',
            steps: [
            { text: 'Identify the three stages: (a) formation of potassium phthalimide, (b) N-alkylation, (c) alkaline hydrolysis.' },
            { text: 'Write balanced equations for each stage with states and conditions.' },
            { text: 'Determine limiting reagent. Both phthalimide and 1-bromobutane are 0.1 mol, so 1:1 stoichiometry in alkylation step.' },
            { text: 'Molar mass of butan-1-amine (C₄H₁₁N) = 73.14 g/mol. Theoretical mass = 0.1 mol × 73.14 g/mol = 7.314 g.' },
            { text: 'Actual yield at 85% = 0.85 × 7.314 g = 6.22 g (rounded to 6.2 g).', faded: true, blankAnswer: 'Sequence as above; theoretical yield 7.31 g, actual yield.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_007', title: 'Basicity of amines refers to their.',
          scaffold: { problem: 'The pKb values for three amines are: ethylamine (C₂H₅NH₂) = 3.29, diethylamine ((C₂H₅)₂NH) = 3.00, triethylamine ((C₂H₅)₃N) = 3.25.',
            steps: [
            { text: 'Recall pKb = –log₁₀ Kb, so Kb = 10^(–pKb). Calculate each: Ethylamine: Kb = 10^(–3.29) = 5.13 × 10⁻⁴.' },
            { text: 'Compare Kb values: larger Kb = stronger base. Order: Diethylamine (1.00×10⁻³) > Triethylamine (5.62×10⁻⁴) > Ethylamine.' },
            { text: 'For gas phase, only inductive effect matters: three ethyl groups donate more electron density than two, which donate.' },
            { text: 'In aqueous phase, the conjugate acids are solvated. (C₂H₅)₃NH⁺ has three bulky ethyl groups that sterically hinder.' },
            { text: 'Verify with NCERT Table 9.3: the given pKb values match the order (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃.', faded: true, blankAnswer: '(a) Kb(C₂H₅NH₂) = 5.13×10⁻⁴, Kb((C₂H₅)₂NH) = 1.00×10⁻³,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_09_006', title: 'Identify each idea',
          dissect: { specimen: 'Aminesand Diazonium Salts CBSE', spots: [
            { id: 's1', label: 'Diazonium salts are a class', prompt: 'Which idea is this? — Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where.', answer: 'Diazonium salts are a class', options: ['Diazonium salts are a class', 'Physical properties of amines refer', 'A coupling reaction is an', 'IUPAC nomenclature of amines systematically'] },
            { id: 's2', label: 'Physical properties of amines refer', prompt: 'Which idea is this? — Physical properties of amines refer to the observable characteristics (state, odor,.', answer: 'Physical properties of amines refer', options: ['Physical properties of amines refer', 'Diazonium salts are a class', 'A coupling reaction is an', 'IUPAC nomenclature of amines systematically'] },
            { id: 's3', label: 'A coupling reaction is an', prompt: 'Which idea is this? — A coupling reaction is an electrophilic aromatic substitution where an aryldiazonium ion.', answer: 'A coupling reaction is an', options: ['A coupling reaction is an', 'Diazonium salts are a class', 'Physical properties of amines refer', 'IUPAC nomenclature of amines systematically'] },
            { id: 's4', label: 'IUPAC nomenclature of amines systematically', prompt: 'Which idea is this? — IUPAC nomenclature of amines systematically names amines by identifying the parent alkane.', answer: 'IUPAC nomenclature of amines systematically', options: ['IUPAC nomenclature of amines systematically', 'Diazonium salts are a class', 'Physical properties of amines refer', 'A coupling reaction is an'] },
            { id: 's5', label: 'Gabriel phthalimide synthesis is a', prompt: 'Which idea is this? — Gabriel phthalimide synthesis is a laboratory method for preparing pure primary aliphatic.', answer: 'Gabriel phthalimide synthesis is a', options: ['Gabriel phthalimide synthesis is a', 'Diazonium salts are a class', 'Physical properties of amines refer', 'A coupling reaction is an'] },
            { id: 's6', label: 'Basicity of amines refers to', prompt: 'Which idea is this? — Basicity of amines refers to their ability to act as Lewis bases by donating the lone.', answer: 'Basicity of amines refers to', options: ['Basicity of amines refers to', 'Diazonium salts are a class', 'Physical properties of amines refer', 'A coupling reaction is an'] }
          ] } }
    ],
    explore: { component: C12_ChemistryAminesandDiazoniumSaltsCBSESim, prompt: 'Explore the interactive — Aminesand Diazonium Salts CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_009', difficulty: 'standard',
          question: 'Diazonium salts are a class of organic compounds with the general formula.',
          hint: 'If stuck, review resonance in aniline (c12_chem_cbse_09_007) and the carbylamine test.',
          misconception: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like.',
          parts: [
                { id: 'a', prompt: 'Compare the Sandmeyer reaction and the Gattermann reaction for introducing chlorine or bromine into an aromatic ring via diazonium salts.', answer: 'Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX',
                  options: ['Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX', 'both give same yield', 'copper powder is a catalyst'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like Sandmeyer).' }
          ],
            remediations: { 'the-diazonium-group-n-can': { steps: ['If the student cannot write the diazotisation equation or predict substitution products: (1) Revisit node.', '9.x) to see charge delocalization; (3) Make a table of 7 reactions (Cl, Br, I, F, CN, OH, H, NO₂) with reagents,.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like.',
          parts: [
                { id: 'a', prompt: 'Compare the Sandmeyer reaction and the Gattermann reaction for introducing chlorine or bromine into an aromatic ring via diazonium salts.', answer: 'Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX',
                  options: ['Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX', 'both give same yield', 'copper powder is a catalyst'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like Sandmeyer).' }
          ],
            remediations: { 'the-diazonium-group-n-can': { steps: ['If the student cannot write the diazotisation equation or predict substitution products: (1) Revisit node.', '9.x) to see charge delocalization; (3) Make a table of 7 reactions (Cl, Br, I, F, CN, OH, H, NO₂) with reagents,.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_006', difficulty: 'standard',
          question: 'Physical properties of amines refer to the observable characteristics (state,.',
          hint: 'If unable to predict boiling point order, revisit c11_chem_cbse_05_003 and draw the.',
          misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Aniline (C₆H₅NH₂) is more soluble in water than cyclohexylamine (C₆H₁₁NH₂) because the phenyl group is planar and packs better." Evaluate.', answer: 'The claim is false',
                  options: ['The claim is false', 'planarity', 'more alkyl groups = higher boiling point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher boiling point" and.' }
          ],
            remediations: { 'students-often-confuse-the-boiling': { steps: ['Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) — draw H-bonding diagrams for primary, secondary,.', 'Revisit c11_chem_cbse_05_001 (Intermolecular Forces) — list forces in order of strength: H-bonding > dipole-dipole >.', 'Do a side-by-side comparison: butan-1-amine (two N–H) vs N-methylpropan-2-amine (one N–H) vs N,N-dimethylethanamine.', 'Re-attempt Diagnostic Question 3. If still wrong, watch a 5-min animation of H-bonding networks in liquid amines vs.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher.',
          parts: [
                { id: 'a', prompt: 'Given the pKb values: CH₃NH₂ (3.38), (CH₃)₂NH (3.27), (CH₃)₃N (4.22), NH₃ (4.75).', answer: 'The student\'s reasoning is valid ONLY for gas phase',
                  options: ['The student\'s reasoning is valid ONLY for gas phase', 'more alkyl groups = higher boiling point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher boiling point" and.' },
                { id: 'b', prompt: 'A student claims: "Aniline (C₆H₅NH₂) is more soluble in water than cyclohexylamine (C₆H₁₁NH₂) because the phenyl group is planar and packs better." Evaluate.', answer: 'The claim is false',
                  options: ['The claim is false', 'planarity', 'more alkyl groups = higher boiling point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher boiling point" and.' }
          ],
            remediations: { 'students-often-confuse-the-boiling': { steps: ['Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) — draw H-bonding diagrams for primary, secondary,.', 'Revisit c11_chem_cbse_05_001 (Intermolecular Forces) — list forces in order of strength: H-bonding > dipole-dipole >.', 'Do a side-by-side comparison: butan-1-amine (two N–H) vs N-methylpropan-2-amine (one N–H) vs N,N-dimethylethanamine.', 'Re-attempt Diagnostic Question 3. If still wrong, watch a 5-min animation of H-bonding networks in liquid amines vs.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_010', difficulty: 'standard',
          question: 'A coupling reaction is an electrophilic aromatic substitution where an.',
          hint: 'If stuck, revisit Class 11 Hydrocarbons chapter: electrophilic substitution mechanism and.',
          misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving.',
          parts: [
                { id: 'a', prompt: 'Why does coupling of benzenediazonium chloride with phenol require mildly alkaline conditions (NaOH), whereas coupling with aniline requires mildly acidic.', answer: 'Phenol (pKa ~10) is deprotonated to phenoxide (–O⁻) in mild alkali',
                  options: ['Phenol (pKa ~10) is deprotonated to phenoxide (–O⁻) in mild alkali', 'both need acid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving Ar–N=N–NH–Ar\').' },
                { id: 'b', prompt: 'Compare the coupling reactivity of benzenediazonium chloride with phenol vs. nitrobenzene.', answer: 'Phenol couples readily',
                  options: ['Phenol couples readily', 'nitrobenzene couples at meta'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving Ar–N=N–NH–Ar\').' }
          ],
            remediations: { 'students-often-write-the-coupling': { steps: ['Revisit c12_chem_cbse_09_009 (Diazonium Salts) and draw the resonance structures of aniline and phenol showing electron.', 'Write the mechanism of electrophilic aromatic substitution (from Class 11 hydrocarbons) showing the arenium ion.', 'Practice 5 coupling reactions with different substrates (phenol, o-cresol, p-cresol, aniline, p-toluidine) and predict.', 'Re-diagnostic: "Draw the product of coupling benzenediazonium chloride with 2-naphthol and explain why coupling occurs.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving.',
          parts: [
                { id: 'a', prompt: 'A student writes the coupling reaction of benzenediazonium chloride with aniline as: C₆H₅N₂⁺Cl⁻ + C₆H₅NH₂ → C₆H₅–N=N–C₆H₄–NH₂ (para) + HCl.', answer: 'The equation is unbalanced for hydrogen and charge',
                  options: ['The equation is unbalanced for hydrogen and charge', 'it\'s balanced'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving Ar–N=N–NH–Ar\').' },
                { id: 'b', prompt: 'Compare the coupling reactivity of benzenediazonium chloride with phenol vs. nitrobenzene.', answer: 'Phenol couples readily',
                  options: ['Phenol couples readily', 'nitrobenzene couples at meta'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving Ar–N=N–NH–Ar\').' }
          ],
            remediations: { 'students-often-write-the-coupling': { steps: ['Revisit c12_chem_cbse_09_009 (Diazonium Salts) and draw the resonance structures of aniline and phenol showing electron.', 'Write the mechanism of electrophilic aromatic substitution (from Class 11 hydrocarbons) showing the arenium ion.', 'Practice 5 coupling reactions with different substrates (phenol, o-cresol, p-cresol, aniline, p-toluidine) and predict.', 'Re-diagnostic: "Draw the product of coupling benzenediazonium chloride with 2-naphthol and explain why coupling occurs.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_002', difficulty: 'standard',
          question: 'IUPAC nomenclature of amines systematically names amines by identifying the.',
          hint: 'If stuck, review Class 10 IUPAC naming of alkanes (c10_chem_cbse_04_008) and amine.',
          misconception: 'Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller group as parent).',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name of CH₃CH₂CH₂NH₂.', answer: 'Propan-1-amine',
                  options: ['Propan-1-amine', 'propylamine', 'propanamine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller group as parent) because they think the.' },
                { id: 'b', prompt: 'Name the following amine: (CH₃)₂CHNH₂.', answer: 'Propan-2-amine',
                  options: ['Propan-2-amine', 'isopropylamine', '2-aminopropane'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller group as parent) because they think the.' }
          ],
            remediations: { 'students-often-name-secondary-amines': { steps: ['If the student consistently picks the wrong parent chain: 1) Revisit c10_chem_cbse_04_008 (IUPAC alkane naming) to.', '2) Draw 5 secondary amine structures, circle the largest alkyl group in each, write parent alkanamine name, then add.', '3) Use the "parent = largest alkyl group" rule as a checklist.', '4) Re-attempt Diagnostic Question 3 and 5.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_004', difficulty: 'standard',
          question: 'Gabriel phthalimide synthesis is a laboratory method for preparing pure primary.',
          hint: 'Review Class 12 Haloalkanes chapter (SN2 vs SN1, reactivity order RI > RBr > RCl, steric.',
          misconception: 'Students often think Gabriel synthesis works for *any* primary amine, including aromatic ones like aniline.',
          parts: [
                { id: 'a', prompt: 'What is the nucleophile in the key C–N bond-forming step of Gabriel phthalimide synthesis, and what is its structure?', answer: 'The nucleophile is the potassium salt of phthalimide (phthalimide anion)',
                  options: ['The nucleophile is the potassium salt of phthalimide (phthalimide anion)', 'phthalimide itself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Gabriel synthesis works for *any* primary amine, including aromatic ones like aniline.' },
                { id: 'b', prompt: 'Why does Gabriel synthesis reliably stop at the primary amine and not produce secondary/tertiary amines or quaternary ammonium salts, unlike direct ammonolysis.', answer: 'In Gabriel synthesis, the nitrogen is part of a cyclic imide (phthalimide)',
                  options: ['In Gabriel synthesis, the nitrogen is part of a cyclic imide (phthalimide)', 'because excess ammonia is used'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Gabriel synthesis works for *any* primary amine, including aromatic ones like aniline.' }
          ],
            remediations: { 'gabriel-synthesis-works-for-any': { steps: ['Revisit SN2 mechanism requirements (backside attack, primary > secondary, no tertiary/aryl) using Class 12 Haloalkanes.', 'Draw the phthalimide anion resonance structures to see why nitrogen is nucleophilic but becomes non-nucleophilic after.', 'Practice 5 synthesis-design problems: given a target primary amine, pick the correct alkyl halide (or say "not.', 'Redo Diagnostic Questions 3 and 5 until the alkyl/aryl distinction is automatic.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_007', difficulty: 'standard',
          question: 'Basicity of amines refers to their ability to act as Lewis bases by donating.',
          hint: 'If stuck, review c11_chem_cbse_07_009 (Ionisation of Acids and Bases) for Kb/pKb, and.',
          misconception: 'Students often memorize the aqueous basicity order for methylamines as "secondary > primary > tertiary" and for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Basicity of amines refers to their ability to act as Lewis bases by donating the lone',
                  options: ['Basicity of amines refers to their ability to act as Lewis bases by donating the lone', 'Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where', 'Physical properties of amines refer to the observable characteristics (state, odor,', 'A coupling reaction is an electrophilic aromatic substitution where an aryldiazonium ion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorize the aqueous basicity order for methylamines as "secondary > primary > tertiary" and for ethylamines as "secondary >.' }
          ],
            remediations: { 'students-often-memorize-the-aqueous': { steps: ['If a student cannot explain the aqueous vs.', 'gas phase order, have them: (1) Revisit c11_chem_cbse_04_007 (Hybridisation) to recall sp³ geometry and bond angles;.', 'Then re-attempt Diagnostic Question 2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
