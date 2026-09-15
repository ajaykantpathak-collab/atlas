import type { SimDef } from '../../engine/types';
import C12_ChemistryDrugtargetinteractionSim from '../../../simulations/c6_12/C12_ChemistryDrugtargetinteractionSim';

/** v3 wrapped master — C12_ChemistryDrugtargetinteractionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrydrugtargetinteractionsim: SimDef = {
    id: 'v3w_c12_chemistrydrugtargetinteractionsim',
    title: 'Drugtargetinteraction',
    subtitle: 'Covers: Applications in qualitative analysis (color reactions, specific reagents like.',
    classLevel: 12, subject: 'chemistry', topic: 'Importance and Applications of Coordination Compounds',
    chapters: [],
    nodeIds: ['c12_chem_cbse_05_009', 'c12_chem_cbse_09_004', 'c12_chem_cbse_09_009', 'c12_chem_cbse_10_010', 'c12_chem_cbse_09_006', 'c12_chem_cbse_10_006', 'c12_chem_cbse_10_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world observation: When you get a blood test, the red color comes from hemoglobin — an iron.', goal: 'Master Drugtargetinteraction.' },
    discovery: {
        question: 'A student writes: "EDTA is used in water hardness titration because it forms a stable complex with Ca²⁺ and Mg²⁺." Is this statement complete?',
        options: ['No, the statement is incomplete', 'chelate effect', 'multidentate ligands form more stable complexes'],
        answer: 'No, the statement is incomplete',
        hook: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket.',
    },
    teaching: [
        { title: 'Coordination compounds are complex entities.', text: 'Coordination compounds are complex entities where a central metal atom/ion is bonded to surrounding ligands via coordinate bonds, exhibiting unique properties (color, magnetism, stability) that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_05_009', title: 'Coordination compounds are complex.',
          scaffold: { problem: 'In the cyanide process for gold extraction, 4Au(s) + 8NaCN(aq) + O₂(g) + 2H₂O(l) → 4Na[Au(CN)₂](aq) + 4NaOH(aq).',
            steps: [
            { text: 'Calculate moles of Au = mass / molar mass = 19.7 g / 197 g/mol = 0.100 mol.' },
            { text: 'From stoichiometry, 4 mol Au requires 8 mol CN⁻ → 2 mol CN⁻ per mol Au. Moles CN⁻ needed = 2 × 0.100 = 0.200 mol.' },
            { text: 'Volume of 0.5 M NaCN = moles / M = 0.200 mol / 0.5 mol/L = 0.400 L = 400 mL.' },
            { text: '4 mol Au requires 1 mol O₂ → moles O₂ = 0.100 / 4 = 0.0250 mol.' },
            { text: '4 mol Au produces 4 mol NaOH → moles NaOH = 0.100 mol. Mass = 0.100 × 40 = 4.00 g.', faded: true, blankAnswer: '(a) 400 mL of 0.5 M NaCN, (b) 560 mL O₂ at STP, (c) 4.00 g.' }
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
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_010', title: 'Hormones are low-molecular-weight.',
          scaffold: { problem: 'A researcher isolates a hormone from adrenal cortex extract. Elemental analysis gives C: 69.9%, H: 9.1%, O: 21.0%.',
            steps: [
            { text: 'Assume 100 g sample → moles of each element: C = 69.9/12.01 = 5.82 mol; H = 9.1/1.008 = 9.03 mol; O = 21.0/16.00 = 1.31.' },
            { text: 'Divide by smallest (1.31) → C: 4.44, H: 6.89, O: 1.00 → multiply by 2 to get near-integers → C₈.₈₈H₁₃.₇₈O₂ ≈ C₉H₁₄O₂.' },
            { text: 'Empirical formula mass = 9×12.01 + 14×1.008 + 2×16.00 = 154.2 g/mol.' },
            { text: 'Positive Liebermann-Burchard test + optical activity + adrenal cortex origin + MW ~360 → steroid hormone.' },
            { text: 'Verify structure: Cyclopentanoperhydrophenanthrene nucleus (4 fused rings), C3 ketone, C4-C5 double bond, 11β-OH,.', faded: true, blankAnswer: 'Molecular formula C₂₁H₃₀O₅; Class: Steroid hormone.' }
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
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_006', title: 'Protein structure is organized into.',
          scaffold: { problem: 'A synthetic polypeptide has the sequence: H₂N–Val–Ser–Thr–Gly–Leu–COOH. (a) How many peptide bonds are present?',
            steps: [
            { text: 'Count amino acid residues — there are 5 residues (Val, Ser, Thr, Gly, Leu).' },
            { text: 'Number of peptide bonds = number of residues – 1 = 4. Each peptide bond links carboxyl of one to amino of next.' },
            { text: 'For α-helix, H-bond pattern is C=O of residue *i* to N–H of residue *i+4*. Glycine is residue 4.' },
            { text: 'N-terminal = Valine (free –NH₂), C-terminal = Leucine (free –COOH).' },
            { text: 'Verify: 5 residues, 4 peptide bonds. N-terminal Val, C-terminal Leu.', faded: true, blankAnswer: '(a) 4 peptide bonds. (b) No residue within this.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_09_004', title: 'Identify each idea',
          dissect: { specimen: 'Drugtargetinteraction', spots: [
            { id: 's1', label: 'Coordination compounds are complex entities', prompt: 'Which idea is this? — Coordination compounds are complex entities where a central metal atom/ion is bonded to.', answer: 'Coordination compounds are complex entities', options: ['Coordination compounds are complex entities', 'Gabriel phthalimide synthesis is a', 'Diazonium salts are a class', 'Hormones are low-molecular-weight chemical messengers'] },
            { id: 's2', label: 'Gabriel phthalimide synthesis is a', prompt: 'Which idea is this? — Gabriel phthalimide synthesis is a laboratory method for preparing pure primary aliphatic.', answer: 'Gabriel phthalimide synthesis is a', options: ['Gabriel phthalimide synthesis is a', 'Coordination compounds are complex entities', 'Diazonium salts are a class', 'Hormones are low-molecular-weight chemical messengers'] },
            { id: 's3', label: 'Diazonium salts are a class', prompt: 'Which idea is this? — Diazonium salts are a class of organic compounds with the general formula Ar–N₂⁺X⁻ (where.', answer: 'Diazonium salts are a class', options: ['Diazonium salts are a class', 'Coordination compounds are complex entities', 'Gabriel phthalimide synthesis is a', 'Hormones are low-molecular-weight chemical messengers'] },
            { id: 's4', label: 'Hormones are low-molecular-weight chemical messengers', prompt: 'Which idea is this? — Hormones are low-molecular-weight chemical messengers secreted by endocrine (ductless).', answer: 'Hormones are low-molecular-weight chemical messengers', options: ['Hormones are low-molecular-weight chemical messengers', 'Coordination compounds are complex entities', 'Gabriel phthalimide synthesis is a', 'Diazonium salts are a class'] },
            { id: 's5', label: 'Physical properties of amines refer', prompt: 'Which idea is this? — Physical properties of amines refer to the observable characteristics (state, odor,.', answer: 'Physical properties of amines refer', options: ['Physical properties of amines refer', 'Coordination compounds are complex entities', 'Gabriel phthalimide synthesis is a', 'Diazonium salts are a class'] },
            { id: 's6', label: 'Protein structure is organized into', prompt: 'Which idea is this? — Protein structure is organized into four hierarchical levels: primary (linear sequence of.', answer: 'Protein structure is organized into', options: ['Protein structure is organized into', 'Coordination compounds are complex entities', 'Gabriel phthalimide synthesis is a', 'Diazonium salts are a class'] }
          ] } }
    ],
    explore: { component: C12_ChemistryDrugtargetinteractionSim, prompt: 'Explore the interactive — Drugtargetinteraction' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_009', difficulty: 'standard',
          question: 'Coordination compounds are complex entities where a central metal atom/ion is.',
          hint: 'If stuck on Kf calculations or conditional stability at given pH, revisit Class 11.',
          misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket.',
          parts: [
                { id: 'a', prompt: 'A student writes: "EDTA is used in water hardness titration because it forms a stable complex with Ca²⁺ and Mg²⁺." Is this statement complete?', answer: 'No, the statement is incomplete',
                  options: ['No, the statement is incomplete', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'b', prompt: 'In the cyanide process for gold extraction: 4Au + 8CN⁻ + O₂ + 2H₂O → 4[Au(CN)₂]⁻ + 4OH⁻. Why is oxygen (O₂) essential?', answer: 'O₂ acts as the oxidant: Au(0) → Au(I) in [Au(CN)₂]⁻ requires electron loss',
                  options: ['O₂ acts as the oxidant: Au(0) → Au(I) in [Au(CN)₂]⁻ requires electron loss', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' },
                { id: 'c', prompt: 'A water sample contains 0.01 M Ca²⁺ and 0.01 M Mg²⁺. You titrate with 0.01 M EDTA at pH 10 using Eriochrome Black T indicator.', answer: 'Step 1: Moles of Ca²⁺ = 0.01 mol/L × 0.050 L = 5.0×10⁻⁴ mol',
                  options: ['Step 1: Moles of Ca²⁺ = 0.01 mol/L × 0.050 L = 5.0×10⁻⁴ mol', 'chelate effect', 'multidentate ligands form more stable complexes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' }
          ],
            remediations: { 'chelate-effect-only-means-multidentate': { steps: ['If the student cannot explain the entropy origin of the chelate effect: (1) Revisit Class 11 thermodynamics.', '(2) Write the two reactions: Co³⁺ + 6NH₃ ⇌ [Co(NH₃)₆]³⁺ (7 particles → 1) and Co³⁺ + EDTA⁴⁻ ⇌ [Co(EDTA)]⁻ (2 particles.', '(3) Calculate Δn_gas (not applicable) but Δn_solution: first reaction decreases particle count by 6, second by 1.', '(4) Realize entropy *decrease* is smaller for EDTA → less negative ΔS → more positive TΔS → more negative ΔG.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "cis-Platin [Pt(NH₃)₂Cl₂] is an anticancer drug because it is a square planar Pt(II) complex that binds to DNA.', answer: 'The claim is false',
                  options: ['The claim is false', 'chelate effect', 'multidentate ligands form more stable complexes', 'chelate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "chelate effect" only means "multidentate ligands form more stable complexes" and write it as a blanket statement.' }
          ],
            remediations: { 'chelate-effect-only-means-multidentate': { steps: ['If the student cannot explain the entropy origin of the chelate effect: (1) Revisit Class 11 thermodynamics.', '(2) Write the two reactions: Co³⁺ + 6NH₃ ⇌ [Co(NH₃)₆]³⁺ (7 particles → 1) and Co³⁺ + EDTA⁴⁻ ⇌ [Co(EDTA)]⁻ (2 particles.', '(3) Calculate Δn_gas (not applicable) but Δn_solution: first reaction decreases particle count by 6, second by 1.', '(4) Realize entropy *decrease* is smaller for EDTA → less negative ΔS → more positive TΔS → more negative ΔG.'] } } },
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
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_006', difficulty: 'standard',
          question: 'Protein structure is organized into four hierarchical levels: primary (linear.',
          hint: 'If unable to draw a dipeptide or identify N/C termini, revisit c12_chem_cbse_10_005.',
          misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure".',
          parts: [
                { id: 'a', prompt: 'Explain why the α-helix is described as a right-handed screw and identify the specific hydrogen-bonding pattern that stabilizes it.', answer: 'The α-helix is right-handed',
                  options: ['The α-helix is right-handed', 'H-bonds between adjacent residues', 'left-handed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure" refers to the.' }
          ],
            remediations: { 'secondary-structure-refers-to-the': { steps: ['If a student cannot distinguish the four levels, have them: (1) Revisit c12_chem_cbse_10_005 to recall peptide bond.', '(2) Draw a single polypeptide chain on paper; label N- and C-termini.', '(3) Sketch a short α-helix segment (3.6 residues/turn) and show *i* to *i+4* H-bonds.', '(4) Fold the chain into a globular shape, mark disulfide bonds, hydrophobic core.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure".',
          parts: [
                { id: 'a', prompt: 'Haemoglobin has a quaternary structure consisting of two α-subunits and two β-subunits.', answer: 'the tertiary structure of the β-subunit, (',
                  options: ['the tertiary structure of the β-subunit, (', 'no effect because it\'s only one amino acid', 'secondary structure', 'tertiary structure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure" refers to the.' },
                { id: 'b', prompt: 'Design a simple experiment using only chemicals available in a school lab (dilute acid, base, heat, ethanol, copper sulfate, sodium hydroxide) to demonstrate.', answer: 'Take egg white (albumin) in a test tube',
                  options: ['Take egg white (albumin) in a test tube', 'secondary structure', 'tertiary structure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure" refers to the.' }
          ],
            remediations: { 'secondary-structure-refers-to-the': { steps: ['If a student cannot distinguish the four levels, have them: (1) Revisit c12_chem_cbse_10_005 to recall peptide bond.', '(2) Draw a single polypeptide chain on paper; label N- and C-termini.', '(3) Sketch a short α-helix segment (3.6 residues/turn) and show *i* to *i+4* H-bonds.', '(4) Fold the chain into a globular shape, mark disulfide bonds, hydrophobic core.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
