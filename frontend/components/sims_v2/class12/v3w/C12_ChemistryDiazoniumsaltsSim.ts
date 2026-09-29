import type { SimDef } from '../../engine/types';
import C12_ChemistryDiazoniumsaltsSim from '../../../simulations/c6_12/C12_ChemistryDiazoniumsaltsSim';

/** v3 wrapped master — C12_ChemistryDiazoniumsaltsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrydiazoniumsaltssim: SimDef = {
    id: 'v3w_c12_chemistrydiazoniumsaltssim',
    title: 'Diazonium Salts: Preparation and Reactions',
    subtitle: 'This node covers: (a) preparation of aryldiazonium salts (diazotisation) with conditions;.',
    classLevel: 12, subject: 'chemistry', topic: 'Diazonium Salts: Preparation and Reactions',
    chapters: [],
    nodeIds: ['c12_chem_cbse_09_009', 'c12_chem_cbse_09_010', 'c12_chem_cbse_07_004', 'c12_chem_cbse_07_009', 'c12_chem_cbse_06_005', 'c12_chem_cbse_09_006', 'c12_chem_cbse_09_002', 'c12_chem_cbse_09_004', 'c12_chem_cbse_09_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a bottle of aniline in the laboratory — it is a colourless liquid that turns brown on exposure to air.', goal: 'Master Diazonium Salts: Preparation and Reactions.' },
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
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_010', title: 'A coupling reaction is an electrophilic.',
          scaffold: { problem: 'Aniline (0.01 mol) is diazotised with NaNO₂/HCl at 273 K. The resulting benzenediazonium chloride solution is added dropwise to a cooled.',
            steps: [
            { text: 'Identify reactants — benzenediazonium chloride (C₆H₅N₂⁺Cl⁻) from aniline, and phenoxide (C₆H₅O⁻) from phenol + NaOH.' },
            { text: 'Write balanced equation: C₆H₅N₂⁺Cl⁻ + C₆H₅O⁻ → p-HOC₆H₄–N=N–C₆H₅ + Cl⁻. (Net ionic; Na⁺ and Cl⁻ are spectators).' },
            { text: 'Determine limiting reagent — aniline (0.01 mol) gives 0.01 mol diazonium salt; phenol (0.015 mol) gives 0.015 mol.' },
            { text: 'Theoretical yield = 0.01 mol × 184 g/mol = 1.84 g of p-hydroxyazobenzene.' },
            { text: 'NaOH deprotonates phenol (pKa ~10) to phenoxide, which is more strongly activating (+M effect of O⁻ > OH), increasing.', faded: true, blankAnswer: 'Balanced equation: C₆H₅N₂⁺Cl⁻ + C₆H₅O⁻ → p-HOC₆H₄–N=N–C₆H₅.' }
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
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_009', title: 'Kolbe\'s reaction is the electrophilic.',
          scaffold: { problem: 'Predict the major product when 3-methylphenol (m-cresol) undergoes Kolbe\'s reaction. Write the complete reaction sequence with conditions.',
            steps: [
            { text: 'Identify the substrate: 3-methylphenol has –OH at position 1, –CH₃ at position 3.' },
            { text: 'Deprotonation with NaOH gives 3-methylphenoxide. The negative charge delocalises to ortho (C-2, C-6) and para (C-4).' },
            { text: 'CO₂ attacks the most electron-rich position. The para position (C-4) is blocked by –CH₃?' },
            { text: 'Write equations: 3-methylphenol + NaOH → 3-methylphenoxide; + CO₂ (4-7 atm, 400 K) → sodium 2-hydroxy-6-methylbenzoate.' },
            { text: 'Verify atom balance and regiochemistry.', faded: true, blankAnswer: 'Major product: 2-hydroxy-6-methylbenzoic acid.' }
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
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_006', title: 'Physical properties of amines refer to.',
          scaffold: { problem: 'In a laboratory, three colourless liquids A, B, C (all C₄H₁₁N isomers) are found.',
            steps: [
            { text: 'Recognise all three have same molar mass (73 g/mol) → van der Waals forces similar; differences arise from H-bonding.' },
            { text: 'Recall primary amines (RNH₂) have two N–H bonds → can act as H-bond donor twice and acceptor once (lone pair) → form.' },
            { text: 'Secondary amines (R₂NH) have one N–H bond → one donor site, one acceptor site → weaker association.' },
            { text: 'Tertiary amines (R₃N) have zero N–H bonds → no H-bond donation, only acceptor (lone pair) → weakest association, only.' },
            { text: 'Match boiling points: highest (350.8 K) = primary (butan-1-amine); middle (329.3 K) = secondary (diethylamine); lowest.', faded: true, blankAnswer: 'A = primary amine (butan-1-amine), B = secondary amine.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_09_010', title: 'Identify each idea',
          dissect: { specimen: 'Diazonium Salts: Preparation and Reactions', spots: [
            { id: 's1', label: 'Diazonium salts are a class', prompt: 'Which idea is this? — Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where.', answer: 'Diazonium salts are a class', options: ['Diazonium salts are a class', 'A coupling reaction is an', 'Phenols are aromatic compounds where', 'Kolbes reaction is the electrophilic'] },
            { id: 's2', label: 'A coupling reaction is an', prompt: 'Which idea is this? — A coupling reaction is an electrophilic aromatic substitution where an aryldiazonium ion.', answer: 'A coupling reaction is an', options: ['A coupling reaction is an', 'Diazonium salts are a class', 'Phenols are aromatic compounds where', 'Kolbes reaction is the electrophilic'] },
            { id: 's3', label: 'Phenols are aromatic compounds where', prompt: 'Which idea is this? — Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an.', answer: 'Phenols are aromatic compounds where', options: ['Phenols are aromatic compounds where', 'Diazonium salts are a class', 'A coupling reaction is an', 'Kolbes reaction is the electrophilic'] },
            { id: 's4', label: 'Kolbes reaction is the electrophilic', prompt: 'Which idea is this? — Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion with carbon.', answer: 'Kolbes reaction is the electrophilic', options: ['Kolbes reaction is the electrophilic', 'Diazonium salts are a class', 'A coupling reaction is an', 'Phenols are aromatic compounds where'] },
            { id: 's5', label: 'Haloarenes aryl halides are prepared', prompt: 'Which idea is this? — Haloarenes (aryl halides) are prepared by electrophilic aromatic substitution where a.', answer: 'Haloarenes aryl halides are prepared', options: ['Haloarenes aryl halides are prepared', 'Diazonium salts are a class', 'A coupling reaction is an', 'Phenols are aromatic compounds where'] },
            { id: 's6', label: 'Physical properties of amines refer', prompt: 'Which idea is this? — Physical properties of amines refer to the observable characteristics (state, odor,.', answer: 'Physical properties of amines refer', options: ['Physical properties of amines refer', 'Diazonium salts are a class', 'A coupling reaction is an', 'Phenols are aromatic compounds where'] }
          ] } }
    ],
    explore: { component: C12_ChemistryDiazoniumsaltsSim, prompt: 'Explore the interactive — Diazonium Salts: Preparation and Reactions' },
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
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_004', difficulty: 'standard',
          question: 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly.',
          hint: 'Revisit c11_chem_cbse_04_011 (Resonance Structures) for diazonium ion stability and.',
          misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an',
                  options: ['Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an', 'Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where', 'A coupling reaction is an electrophilic aromatic substitution where an aryldiazonium ion', 'Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion with carbon'],
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
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_009', difficulty: 'standard',
          question: 'Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion.',
          hint: 'Review resonance in phenoxide (c11_chem_cbse_04_011) and electrophilic substitution.',
          misconception: 'Students often write the Reimer-Tiemann reaction as phenol + CHCl₃ + NaOH → salicylaldehyde **without showing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion with carbon',
                  options: ['Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion with carbon', 'Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where', 'A coupling reaction is an electrophilic aromatic substitution where an aryldiazonium ion', 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the Reimer-Tiemann reaction as phenol + CHCl₃ + NaOH → salicylaldehyde **without showing the dichlorocarbene.' }
          ],
            remediations: { 'students-often-write-the-reimer': { steps: ['If the student cannot draw the carbene mechanism, have them revisit **c11_chem_cbse_04_011 (Resonance Structures)** to.', 'For Kolbe\'s, review **c12_chem_cbse_07_008 (Electrophilic Substitution of Phenols)** to reinforce why phenoxide is more.'] } } },
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
            remediations: { 'students-often-confuse-the-boiling': { steps: ['Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) — draw H-bonding diagrams for primary, secondary,.', 'Revisit c11_chem_cbse_05_001 (Intermolecular Forces) — list forces in order of strength: H-bonding > dipole-dipole >.', 'Do a side-by-side comparison: butan-1-amine (two N–H) vs N-methylpropan-2-amine (one N–H) vs N,N-dimethylethanamine.', 'Re-attempt Diagnostic Question 3. If still wrong, watch a 5-min animation of H-bonding networks in liquid amines vs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
