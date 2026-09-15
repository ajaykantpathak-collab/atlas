import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch10_p1: SimDef = {
    id: 'v3_c12_chem_ch10_p1',
    title: 'Biomolecules · Part 1/2',
    subtitle: 'Starch feeds you, cellulose doesn\'t — one flipped bond is the whole story',
    classLevel: 12, subject: 'chemistry', topic: 'Biomolecules · Part 1/2',
    chapters: ['c12_chem_ch10'],
    nodeIds: ['c12_chem_cbse_10_001', 'c12_chem_cbse_10_002', 'c12_chem_cbse_10_003', 'c12_chem_cbse_10_004', 'c12_chem_cbse_10_005', 'c12_chem_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Biochemist', intro: 'Sugar, starch, DNA, enzymes — life is chemistry wearing a lab coat. This chapter translates the molecules you eat into the molecules you are.', goal: 'Classify carbohydrates by hydrolysis and reducing nature, and connect structure to function across biomolecules.' },
    discovery: {
        question: 'You digest starch happily but cellulose — also pure glucose polymer — passes straight through. Same building block, so what changes?',
        options: ['The glycosidic link: starch uses α-1,4 bonds your amylase can cut; cellulose uses β-1,4 bonds you have no enzyme for', 'Cellulose isn\'t made of glucose', 'Starch is smaller so it dissolves faster', 'Cellulose is a protein, not a carbohydrate'],
        answer: 'The glycosidic link: starch uses α-1,4 bonds your amylase can cut; cellulose uses β-1,4 bonds you have no enzyme for',
        hook: 'One flipped stereochemical bond turns dinner into dietary fibre. And one hidden carbon decides \'reducing\' vs not: sucrose locks both anomeric carbons in its glycosidic bond so it can\'t reduce Fehling\'s, while maltose leaves one free.',
    },
    teaching: [
        { title: 'Carbohydrates: Classification - Mono, Di, Polysaccharides', text: 'Carbohydrates are optically active polyhydroxy aldehydes or ketones (or compounds that yield such units on hydrolysis) with a general formula often approximating Cx(H2O)y.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_10_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Sort the sugar jar with chemistry, not taste: classify carbohydrates by hydrolysis, unmask reducing vs non-reducing sugars by their anomeric carbons, then climb the ladder to proteins, nucleic acids and the chemistry of life.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_001', title: 'Carbohydrates: Classification - Mono, Di, Polysaccharides',
          caseStudy: { intro: 'Observe common kitchen substances: table sugar (sucrose), glucose powder, cornflour (starch), and cotton (cellulose).',
            decisions: [{ prompt: 'Define monosaccharide and give two examples.', options: [
                { text: 'A monosaccharide is a carbohydrate that cannot be hydrolyzed to a simpler polyhydroxy', outcome: 'A monosaccharide is a carbohydrate that cannot be hydrolyzed to a simpler polyhydroxy aldehyde.' },
                { text: 'sucrose as a monosaccharide', outcome: 'Not quite — Students often think the general formula Cx(H2O)y defines carbohydrates, so they classify acetic.', reveals: 'the-general-formula-cx-h2o' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_002', title: 'Glucose: Structure and Properties',
          caseStudy: { intro: 'Observe a spoonful of honey or a ripe grape — the sweetness comes largely from glucose.',
            decisions: [{ prompt: 'Write the molecular formula of glucose and state its classification as a monosaccharide (aldo/ketose, triose/hexose, etc.).', options: [
                { text: 'Glucose: C₆H₁₂O₆', outcome: 'Glucose: C₆H₁₂O₆; it is an aldohexose (aldehyde at C‑1, six carbons).' },
                { text: 'ketohexose', outcome: 'Not quite — Students often write the open-chain Fischer projection as the “only” structure of glucose and then.', reveals: 'students-often-write-the-open' },
                { text: 'C₆H₁₀O₅', outcome: 'Not quite — Students often write the open-chain Fischer projection as the “only” structure of glucose and then.', reveals: 'students-often-write-the-open' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_003', title: 'Fructose: Structure and Properties',
          caseStudy: { intro: 'Observe a ripe mango or a spoonful of honey — both taste intensely sweet because they contain fructose, which is 1.2–1.8 times sweeter than sucrose.',
            decisions: [{ prompt: 'Write the molecular formula of fructose and state its classification as a monosaccharide (aldose/ketose, triose/tetrose/pentose/hexose).', options: [
                { text: 'Molecular formula: C₆H₁₂O₆', outcome: 'Molecular formula: C₆H₁₂O₆. Classification: ketohexose (ketose with six carbon atoms).' },
                { text: 'aldohexose', outcome: 'Not quite — Students routinely write the cyclic structure of fructose as a six-membered pyranose ring (like.', reveals: 'students-routinely-write-the-cyclic' },
                { text: 'C₆H₁₀O₅', outcome: 'Not quite — Students routinely write the cyclic structure of fructose as a six-membered pyranose ring (like.', reveals: 'students-routinely-write-the-cyclic' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_004', title: 'Starch and Cellulose: Structure and Difference',
          scaffold: { problem: 'A starch sample contains 20% amylose (DP = 800) and 80% amylopectin (DP = 5000, with branch points every 25 glucose residues).',
            steps: [
            { text: 'Identify that each polysaccharide chain has exactly one reducing end (free anomeric carbon at the terminus).' },
            { text: 'For amylose (unbranched): 1 molecule = 1 reducing end.' },
            { text: 'For amylopectin (branched): 1 molecule = 1 reducing end (only the terminal glucose of the main chain has free anomeric.' },
            { text: 'Total reducing ends per "representative molecule pair" = 1 (amylose) + 1 (amylopectin) = 2.' },
            { text: 'Verify: reducing ends depend on molecule count, not DP or branching frequency.', faded: true, blankAnswer: '2 reducing ends per representative starch molecule pair (1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_10_005', title: 'Proteins: Amino Acids and Peptide Bond',
          scaffold: { problem: 'A dipeptide is formed from valine (Val, C₅H₁₁NO₂) and serine (Ser, C₃H₇NO₃).',
            steps: [
            { text: 'Recognize condensation reaction: –COOH of Val + –NH₂ of Ser → peptide bond + H₂O.' },
            { text: 'Write molecular formulas: Val = C₅H₁₁NO₂, Ser = C₃H₇NO₃. Sum = C₈H₁₈N₂O₅.' },
            { text: 'Subtract H₂O (lost in condensation): C₈H₁₈N₂O₅ – H₂O = C₈H₁₆N₂O₄.' },
            { text: 'Name dipeptide: Val-Ser means Val is N-terminal (free –NH₂), Ser is C-terminal (free –COOH).' },
            { text: 'Verify atom balance: Reactants C₈H₁₈N₂O₅, Products C₈H₁₆N₂O₄ + H₂O → balanced.', faded: true, blankAnswer: 'Val-Ser molecular formula = C₈H₁₆N₂O₄; N-terminal = Valine.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_006', title: 'Protein Structure: Primary, Secondary, Tertiary, Quaternary',
          caseStudy: { intro: 'Begin with a boiled egg: the transparent runny albumen turns opaque and solid — this is protein denaturation, but the *structure* that was lost is what.',
            decisions: [{ prompt: 'Define the primary structure of a protein and state the type of covalent bond that links amino acids in this structure.', options: [
                { text: 'Primary structure is the specific linear sequence of amino acids in a polypeptide chain,', outcome: 'Primary structure is the specific linear sequence of amino acids in a polypeptide chain, linked.' },
                { text: 'hydrogen bonds', outcome: 'Not quite — Students often think that "secondary structure" refers to the overall 3D shape of the protein, and.', reveals: 'secondary-structure-refers-to-the' },
                { text: 'disulfide bonds', outcome: 'Not quite — Students often think that "secondary structure" refers to the overall 3D shape of the protein, and.', reveals: 'secondary-structure-refers-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_001', title: 'A real-world call',
          caseStudy: { intro: 'Food preservatives and additives keep food safe and affordable for millions — and the same chemistry enables ultra-processed foods linked to poor health.',
            decisions: [{ prompt: 'Is \'safe chemistry\' still safe when it makes unhealthy food possible?', options: [
                { text: 'Yes — preservation prevents real harm (spoilage, hunger)', outcome: 'The food-safety answer — additives prevented deaths before they enabled junk food; the technology isn\'t the problem, the use is.' },
                { text: 'No — \'safe\' compounds in an unhealthy system aren\'t safe', outcome: 'The systems answer — a preservative that\'s individually harmless still serves a food system that\'s collectively harmful.' },
                { text: 'The chemistry is neutral — regulate the food system it serves', outcome: 'The regulatory answer — additives pass safety tests; the question is what products they\'re allowed to make cheap.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab gives a student three unknown solutions: A turns brick-red with Benedict\'s and ignores iodine; B turns blue-black with iodine; C answers neither test. He must match them to glucose, starch and sucrose.',
            decisions: [{ prompt: 'What\'s the correct matching, and why does sucrose fail Benedict\'s?', options: [
                { text: 'A = glucose, B = starch, C = sucrose — sucrose\'s glucose–fructose bond ties up both anomeric carbons, leaving no free carbonyl to reduce the reagent.', outcome: 'Reducing power lives in a free anomeric carbon: maltose has one and gives a positive test, sucrose doesn\'t — hydrolysis first, then it would.' },
                { text: 'A = glucose, B = starch, C = sucrose — and sucrose is non-reducing only because it isn\'t sweet enough to react.', outcome: 'Sweetness is irrelevant; the cause is structural — the C1–C2 link occupies both anomeric carbons.', reveals: 'sweetness-decides-reducing' },
                { text: 'C = glucose, A = sucrose — any disaccharide with a glycosidic bond reduces Benedict\'s.', outcome: 'Disaccharides split both ways: sucrose and trehalose are non-reducing; the anomeric carbons have to stay free, as in maltose.', reveals: 'all-disaccharides-reduce' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why cows eat grass and you can\'t — at the bond level. Biomolecules links chemistry to biology and it\'s the board\'s favourite short-answer mine.',
            decisions: [{ prompt: 'What comes next? Biomolecules · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biomolecules · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_001', difficulty: 'standard',
          question: 'Carbohydrates are optically active polyhydroxy aldehydes or ketones (or.',
          hint: 'Review Class 10 carbon compounds (c10_chem_cbse_04_001) for functional groups and Class.',
          misconception: 'Students often think the general formula Cx(H2O)y defines carbohydrates, so they classify acetic acid (CH₃COOH = C₂H₄O₂.',
          parts: [
                { id: 'a', prompt: 'Compare starch and cellulose in terms of monomer, glycosidic linkage, and biological function. Why can humans digest starch but not cellulose?', answer: 'Both are polymers of glucose',
                  options: ['Both are polymers of glucose', 'same linkage'],
                  hint: 'Review Class 10 carbon compounds (c10_chem_cbse_04_001) for functional groups and Class 11 chemical.',
                  misconception: 'Students often think the general formula Cx(H2O)y defines carbohydrates, so they classify acetic acid (CH₃COOH = C₂H₄O₂ = C₂(H₂O)₂) as.' }
          ],
            remediations: { 'the-general-formula-cx-h2o': { steps: ['If the student confuses classification criteria, have them revisit hydrolysis reactions from Class 10.', 'Make a table: Carbohydrate | Hydrolysis Products | Class | Reducing?', 'Practice with 5 examples (glucose, fructose, sucrose, maltose, lactose, starch, cellulose).', 'Then re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_002', difficulty: 'standard',
          question: 'Glucose is an aldohexose (C₆H₁₂O₆) that exists in equilibrium between.',
          hint: 'If stuck, review Fischer projection rules (c11_chem_cbse_04_003) and hemiacetal formation.',
          misconception: 'Students often write the open-chain Fischer projection as the “only” structure of glucose and then try to explain all.',
          parts: [
                { id: 'a', prompt: 'Write the molecular formula of glucose and state its classification as a monosaccharide (aldo/ketose, triose/hexose, etc.).', answer: 'Glucose: C₆H₁₂O₆',
                  options: ['Glucose: C₆H₁₂O₆', 'ketohexose', 'C₆H₁₀O₅'],
                  hint: 'If stuck, review Fischer projection rules (c11_chem_cbse_04_003) and hemiacetal formation mechanism.',
                  misconception: 'Students often write the open-chain Fischer projection as the “only” structure of glucose and then try to explain all reactions from it.' }
          ],
            remediations: { 'students-often-write-the-open': { steps: ['Revisit Fischer projection rules (c11_chem_cbse_04_003) and practice drawing D‑glyceraldehyde and D‑glucose.', 'Review hemiacetal formation mechanism (c11_chem_cbse_04_007) using a simple aldehyde + alcohol example.', 'Build a physical model or use a simulation to see the chair conformation of pyranose; then redraw Haworth projections.', 'Re‑attempt Diagnostic Questions 2 and 5; if still wrong, watch a video on mutarotation and anomerism.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_003', difficulty: 'standard',
          question: 'Fructose is a ketohexose monosaccharide with molecular formula C₆H₁₂O₆.',
          hint: 'If unable to draw fructose cyclisation, review Class 11 Organic Chemistry: nucleophilic.',
          misconception: 'Students routinely write the cyclic structure of fructose as a six-membered pyranose ring (like glucose) because they.',
          parts: [
                { id: 'a', prompt: 'Write the molecular formula of fructose and state its classification as a monosaccharide (aldose/ketose, triose/tetrose/pentose/hexose).', answer: 'Molecular formula: C₆H₁₂O₆',
                  options: ['Molecular formula: C₆H₁₂O₆', 'aldohexose', 'C₆H₁₀O₅'],
                  hint: 'If unable to draw fructose cyclisation, review Class 11 Organic Chemistry: nucleophilic addition.',
                  misconception: 'Students routinely write the cyclic structure of fructose as a six-membered pyranose ring (like glucose) because they memorise.' },
                { id: 'b', prompt: 'Explain why fructose, a ketose, gives a positive Fehling\'s test and Tollens\' test despite lacking a free aldehyde group in its open-chain form.', answer: 'In aqueous alkali, fructose undergoes base-catalyzed tautomerization (Lobry de',
                  options: ['In aqueous alkali, fructose undergoes base-catalyzed tautomerization (Lobry de', 'ketones cannot be oxidised', 'fructose has a hidden aldehyde'],
                  hint: 'If unable to draw fructose cyclisation, review Class 11 Organic Chemistry: nucleophilic addition.',
                  misconception: 'Students routinely write the cyclic structure of fructose as a six-membered pyranose ring (like glucose) because they memorise.' }
          ],
            remediations: { 'students-routinely-write-the-cyclic': { steps: ['Revisit c12_chem_cbse_10_002 (Glucose) and explicitly compare cyclisation: glucose C-5 OH → C-1 CHO (6-membered).', 'Build physical models using molecular model kits: count atoms in each ring.', 'Practice drawing both Haworth projections side-by-side until the ring size difference is automatic.', 'Re-attempt Diagnostic Questions 3 and 5 after 24 hours.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_004', difficulty: 'standard',
          question: 'Starch and cellulose are both polysaccharides composed of D-glucose monomers.',
          hint: 'If unable to draw the glycosidic bond with correct stereochemistry, revisit.',
          misconception: 'Students write "starch has α-glycosidic bonds, cellulose has β-glycosidic bonds" but cannot specify the carbon numbers.',
          parts: [
                { id: 'a', prompt: 'State the exact glycosidic linkage present in amylose, amylopectin (main chain), amylopectin (branch points), and cellulose.', answer: 'Amylose: α-D-(1→4)',
                  options: ['Amylose: α-D-(1→4)', 'starch = α, cellulose = β'],
                  hint: 'If unable to draw the glycosidic bond with correct stereochemistry, revisit c12_chem_cbse_10_002.',
                  misconception: 'Students write "starch has α-glycosidic bonds, cellulose has β-glycosidic bonds" but cannot specify the carbon numbers (1→4 vs 1→6) or draw.' },
                { id: 'b', prompt: 'Compare the hydrogen bonding patterns in starch (amylose) and cellulose. How do these patterns explain the difference in tensile strength and water solubility?', answer: 'Amylose: intra-chain H-bonds (O3-H⋯O5) stabilize the helix',
                  options: ['Amylose: intra-chain H-bonds (O3-H⋯O5) stabilize the helix', 'cellulose has more H-bonds'],
                  hint: 'If unable to draw the glycosidic bond with correct stereochemistry, revisit c12_chem_cbse_10_002.',
                  misconception: 'Students write "starch has α-glycosidic bonds, cellulose has β-glycosidic bonds" but cannot specify the carbon numbers (1→4 vs 1→6) or draw.' }
          ],
            remediations: { 'students-write-starch-has-glycosidic': { steps: ['Revisit c12_chem_cbse_10_002 (Glucose: Structure and Properties) — practice drawing D-glucose in Haworth (α and β) and.', 'Revisit c12_chem_cbse_10_001 (Carbohydrates Classification) — review glycosidic bond formation mechanism (nucleophilic.', 'Build physical models: use molecular model kit or paper cutouts to form α-1,4 and β-1,4 dimers; measure the dihedral.', 'Re-attempt Diagnostic Questions 1 and 2. If still incorrect, seek teacher for 1-on-1 stereochemistry walkthrough.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write "starch has α-glycosidic bonds, cellulose has β-glycosidic bonds" but cannot specify the carbon numbers.',
          parts: [
                { id: 'a', prompt: 'Design a simple laboratory test to distinguish between a solution of starch and a solution of cellulose (both 1% w/v in water) using only iodine solution and.', answer: 'Procedure: 1) Add 2 drops of iodine solution to 2 mL of each solution',
                  options: ['Procedure: 1) Add 2 drops of iodine solution to 2 mL of each solution', 'polymer of glucose', 'solubility determined by secondary structure'],
                  hint: 'If unable to draw the glycosidic bond with correct stereochemistry, revisit c12_chem_cbse_10_002.',
                  misconception: 'Students write "starch has α-glycosidic bonds, cellulose has β-glycosidic bonds" but cannot specify the carbon numbers (1→4 vs 1→6) or draw.' }
          ],
            remediations: { 'students-write-starch-has-glycosidic': { steps: ['Revisit c12_chem_cbse_10_002 (Glucose: Structure and Properties) — practice drawing D-glucose in Haworth (α and β) and.', 'Revisit c12_chem_cbse_10_001 (Carbohydrates Classification) — review glycosidic bond formation mechanism (nucleophilic.', 'Build physical models: use molecular model kit or paper cutouts to form α-1,4 and β-1,4 dimers; measure the dihedral.', 'Re-attempt Diagnostic Questions 1 and 2. If still incorrect, seek teacher for 1-on-1 stereochemistry walkthrough.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_005', difficulty: 'standard',
          question: 'Proteins are biological polymers formed by condensation polymerization.',
          hint: 'If unable to write peptide bond formation, review Class 11 resonance.',
          misconception: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond.',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the formation of the dipeptide Ala-Gly (alanyl-glycine) from alanine and glycine.', answer: 'C₃H₇NO₂ (Ala) + C₂H₅NO₂ (Gly) → C₅H₁₀N₂O₃ (Ala-Gly) + H₂O',
                  options: ['C₃H₇NO₂ (Ala) + C₂H₅NO₂ (Gly) → C₅H₁₀N₂O₃ (Ala-Gly) + H₂O', 'alanine-glycine'],
                  hint: 'If unable to write peptide bond formation, review Class 11 resonance (c11_chem_cbse_04_011) and.',
                  misconception: 'Students often write the peptide bond as –CO–NH– but draw it with free rotation, ignoring its partial double-bond character from resonance.' }
          ],
            remediations: { 'students-often-write-the-peptide': { steps: ['Revisit c11_chem_cbse_04_011 (Resonance Structures) to master amide resonance.', 'Practice drawing 5 amino acids with correct zwitterion charges at pH 7.', 'Write condensation reactions for 3 dipeptides, explicitly circling the water molecule lost and labeling N/C-termini.', 'Re-diagnostic: Draw the resonance hybrid of a peptide bond and mark the planar atoms.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_10_006', difficulty: 'standard',
          question: 'Protein structure is organized into four hierarchical levels: primary (linear.',
          hint: 'If unable to draw a dipeptide or identify N/C termini, revisit c12_chem_cbse_10_005.',
          misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure".',
          parts: [
                { id: 'a', prompt: 'Explain why the α-helix is described as a right-handed screw and identify the specific hydrogen-bonding pattern that stabilizes it.', answer: 'The α-helix is right-handed',
                  options: ['The α-helix is right-handed', 'H-bonds between adjacent residues', 'left-handed', 'secondary structure'],
                  hint: 'If unable to draw a dipeptide or identify N/C termini, revisit c12_chem_cbse_10_005 worked examples.',
                  misconception: 'Students often think that "secondary structure" refers to the overall 3D shape of the protein, and "tertiary structure" refers to the.' }
          ],
            remediations: { 'secondary-structure-refers-to-the': { steps: ['If a student cannot distinguish the four levels, have them: (1) Revisit c12_chem_cbse_10_005 to recall peptide bond.', '(2) Draw a single polypeptide chain on paper; label N- and C-termini.', '(3) Sketch a short α-helix segment (3.6 residues/turn) and show *i* to *i+4* H-bonds.', '(4) Fold the chain into a globular shape, mark disulfide bonds, hydrophobic core.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
