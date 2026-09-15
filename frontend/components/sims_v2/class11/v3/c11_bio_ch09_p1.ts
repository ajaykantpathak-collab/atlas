import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch09_p1: SimDef = {
    id: 'v3_c11_bio_ch09_p1',
    title: 'Biomolecules · Part 1/2',
    subtitle: 'One bond angle decides whether a glucose chain feeds you or builds a wall.',
    classLevel: 11, subject: 'biology', topic: 'Biomolecules · Part 1/2',
    chapters: ['c11_bio_ch09'],
    nodeIds: ['c11_bio_cbse_09_001', 'c11_bio_cbse_09_002', 'c11_bio_cbse_09_003', 'c11_bio_cbse_09_004', 'c11_bio_cbse_09_005', 'c11_bio_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biochemist identifying unknown samples in a food-testing lab', intro: 'Four unlabelled flasks, two reagents, one afternoon. Iodine spots helices; Benedict\'s spots free anomeric carbons. Combine them and nothing hides.', goal: 'Classify carbohydrates, explain reducing versus non-reducing behaviour via the anomeric carbon, and link glycosidic linkage geometry to biological role.' },
    discovery: {
        question: 'Starch and cellulose are both long chains of nothing but glucose — yet you digest chapati starch for energy while its cellulose bran exits untouched. The monomers are identical, so what single difference defeats your enzymes?',
        options: ['The glycosidic bond orientation — alpha links coil starch into a helix amylase can bite; beta links lock cellulose into straight, hydrogen-bonded fibres', 'Cellulose contains nitrogen that poisons digestive enzymes', 'Starch molecules are shorter than cellulose molecules', 'Cellulose is not actually a carbohydrate'],
        answer: 'The glycosidic bond orientation — alpha links coil starch into a helix amylase can bite; beta links lock cellulose into straight, hydrogen-bonded fibres',
        hook: 'Same glucose, different bond angle, opposite fate — in biomolecules, geometry is destiny.',
    },
    teaching: [
        { title: 'Carbohydrates: Monosaccharides and Polysaccharides', text: 'Carbohydrates are polyhydroxy aldehydes or ketones (monosaccharides) or their polymers (polysaccharides) linked by glycosidic bonds, serving as primary energy sources (e.g., glucose, glycogen) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_09_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Identify four mystery solutions using only iodine and Benedict\'s tests, then explain why glycogen\'s frantic branching serves sprinting animals better than starch\'s tidy helices serve patient plants.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_001', title: 'Carbohydrates: Monosaccharides and Polysaccharides',
          caseStudy: { intro: 'Observe a spoonful of table sugar (sucrose) dissolving instantly in tea versus a chapati (starch-rich) that takes hours to digest — both are carbohydrates but.',
            decisions: [{ prompt: 'Define a reducing sugar and give one example each of a reducing monosaccharide and a reducing polysaccharide.', options: [
                { text: 'A reducing sugar has a free anomeric carbon (C1 in aldoses, C2 in ketoses) capable of', outcome: 'A reducing sugar has a free anomeric carbon (C1 in aldoses, C2 in ketoses) capable of opening to.' },
                { text: 'all polysaccharides are non-reducing', outcome: 'Not quite — Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly.', reveals: 'all-polysaccharides-are-non-reducing' },
                { text: 'sucrose as reducing', outcome: 'Not quite — Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly.', reveals: 'all-polysaccharides-are-non-reducing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_002', title: 'Proteins: Amino Acids and Peptide Bonds',
          caseStudy: { intro: 'Observe a boiled egg white turning from transparent to opaque – this is protein denaturation, but the underlying chemistry begins with amino acids linking like.',
            decisions: [{ prompt: 'Write the general structural formula of an α-amino acid and label the α-carbon, amino group, carboxyl group, and R-group.', options: [
                { text: 'An α-amino acid has a central α-carbon bonded to –NH₂, –COOH, –H, and a variable R-group', outcome: 'An α-amino acid has a central α-carbon bonded to –NH₂, –COOH, –H, and a variable R-group.' },
                { text: '22 or confusing α- with β-amino acids', outcome: 'Not quite — Students think the peptide bond is a simple single covalent bond (–C–N–) with free rotation,.', reveals: 'the-peptide-bond-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_003', title: 'Lipids: Fatty Acids and Glycerol',
          caseStudy: { intro: 'Observe a bottle of gingelly oil (sesame oil) and a block of vanaspati ghee on a kitchen shelf in January.',
            decisions: [{ prompt: 'Name the two molecular components that combine to form a triglyceride and specify the type of covalent bond linking them.', options: [
                { text: 'A triglyceride is formed from **one glycerol molecule and three fatty acid molecules**', outcome: 'A triglyceride is formed from **one glycerol molecule and three fatty acid molecules** linked.' },
                { text: 'peptide bond', outcome: 'Not quite — **Misconception:** "All lipids are fats, and all fats are triglycerides." **Exact wrong.', reveals: 'misconception-all-lipids-are-fats' },
                { text: 'glycosidic bond', outcome: 'Not quite — **Misconception:** "All lipids are fats, and all fats are triglycerides." **Exact wrong.', reveals: 'misconception-all-lipids-are-fats' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_004', title: 'Nucleic Acids: DNA and RNA Structure',
          caseStudy: { intro: 'Observe a forensic crime drama where DNA fingerprinting identifies a suspect from a single hair strand — this works because every cell in that hair contains.',
            decisions: [{ prompt: 'Name the three chemical components of a nucleotide and specify which component differs between DNA and RNA nucleotides.', options: [
                { text: 'A nucleotide consists of a nitrogenous base (adenine, guanine, cytosine, thymine, or', outcome: 'A nucleotide consists of a nitrogenous base (adenine, guanine, cytosine, thymine, or uracil),.' },
                { text: 'phosphate differs', outcome: 'Not quite — Students memorize "A pairs with T, G pairs with C" but cannot explain WHY at the chemical level.', reveals: 'students-memorize-a-pairs-with' },
                { text: 'base differs', outcome: 'Not quite — Students memorize "A pairs with T, G pairs with C" but cannot explain WHY at the chemical level.', reveals: 'students-memorize-a-pairs-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_005', title: 'Enzymes: Nature and Mechanism of Action',
          caseStudy: { intro: 'Observe how a piece of raw potato placed in hydrogen peroxide solution immediately produces vigorous bubbling, while boiled potato shows no reaction.',
            decisions: [{ prompt: 'Define the term \'active site\' of an enzyme and state its two key functional properties.', options: [
                { text: 'The active site is a specific three-dimensional crevice or pocket formed by the folding', outcome: 'The active site is a specific three-dimensional crevice or pocket formed by the folding of the.' },
                { text: 'active site is where enzyme binds to another enzyme', outcome: 'Not quite — Students believe that "enzymes are used up in the reaction" because they see substrate disappear.', reveals: 'enzymes-are-used-up-in' },
                { text: 'active site is the whole enzyme surface', outcome: 'Not quite — Students believe that "enzymes are used up in the reaction" because they see substrate disappear.', reveals: 'enzymes-are-used-up-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_006', title: 'Enzyme Kinetics: Factors Affecting Enzyme Activity',
          caseStudy: { intro: 'Observe how milk curdles faster in summer than in winter — this everyday phenomenon is driven by temperature-dependent enzyme (rennin) activity.',
            decisions: [{ prompt: 'Define \'optimum temperature\' for an enzyme and state what happens to the enzyme\'s tertiary structure when the temperature rises 10°C above.', options: [
                { text: 'Optimum temperature is the specific temperature at', outcome: 'Optimum temperature is the specific temperature at which an enzyme exhibits maximum catalytic.' },
                { text: 'enzyme works faster but then stops', outcome: 'Not quite — Students believe that at low temperatures enzymes are \'killed\' or permanently destroyed, just like.', reveals: 'at-low-temperatures-enzymes-are' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Biomolecules · Part 1/2', spots: [
            { id: 's1', label: 'Carbohydrates Monosaccharides and Polysaccharides', prompt: 'Which idea is this? — Carbohydrates are polyhydroxy aldehydes or ketones (monosaccharides) or their polymers.', answer: 'Carbohydrates Monosaccharides and Polysaccharides', options: ['Carbohydrates Monosaccharides and Polysaccharides', 'Proteins Amino Acids and Peptide Bonds', 'Lipids Fatty Acids and Glycerol', 'Nucleic Acids DNA and RNA Structure'] },
            { id: 's2', label: 'Proteins Amino Acids and Peptide Bonds', prompt: 'Which idea is this? — Proteins are heteropolymers composed of α-amino acids linked by peptide bonds formed.', answer: 'Proteins Amino Acids and Peptide Bonds', options: ['Proteins Amino Acids and Peptide Bonds', 'Carbohydrates Monosaccharides and Polysaccharides', 'Lipids Fatty Acids and Glycerol', 'Nucleic Acids DNA and RNA Structure'] },
            { id: 's3', label: 'Lipids Fatty Acids and Glycerol', prompt: 'Which idea is this? — Lipids are a diverse group of hydrophobic biomolecules primarily composed of carbon.', answer: 'Lipids Fatty Acids and Glycerol', options: ['Lipids Fatty Acids and Glycerol', 'Carbohydrates Monosaccharides and Polysaccharides', 'Proteins Amino Acids and Peptide Bonds', 'Nucleic Acids DNA and RNA Structure'] },
            { id: 's4', label: 'Nucleic Acids DNA and RNA Structure', prompt: 'Which idea is this? — Nucleic acids are macromolecular polymers (polynucleotides) composed of repeating.', answer: 'Nucleic Acids DNA and RNA Structure', options: ['Nucleic Acids DNA and RNA Structure', 'Carbohydrates Monosaccharides and Polysaccharides', 'Proteins Amino Acids and Peptide Bonds', 'Lipids Fatty Acids and Glycerol'] },
            { id: 's5', label: 'Enzymes Nature and Mechanism of Action', prompt: 'Which idea is this? — Enzymes are biological catalysts, predominantly proteins (with some catalytic RNA.', answer: 'Enzymes Nature and Mechanism of Action', options: ['Enzymes Nature and Mechanism of Action', 'Carbohydrates Monosaccharides and Polysaccharides', 'Proteins Amino Acids and Peptide Bonds', 'Lipids Fatty Acids and Glycerol'] },
            { id: 's6', label: 'Enzyme Kinetics Factors Affecting Enzyme Activity', prompt: 'Which idea is this? — Enzyme kinetics is the quantitative study of how the rate of an enzyme-catalysed reaction.', answer: 'Enzyme Kinetics Factors Affecting Enzyme Activity', options: ['Enzyme Kinetics Factors Affecting Enzyme Activity', 'Carbohydrates Monosaccharides and Polysaccharides', 'Proteins Amino Acids and Peptide Bonds', 'Lipids Fatty Acids and Glycerol'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In the chemistry lab you\'re testing food extracts with Benedict\'s reagent for the science fair. A teammate predicts: \'Glucose and starch are both just glucose units, so both will give a strong brick-red precipitate; and once glucose is locked in a polymer, every anomeric carbon is consumed — no reducing ends remain.\'',
            decisions: [{ prompt: 'What will the test tubes actually show?', options: [
                { text: 'Glucose gives a strong positive. Starch/glycogen are only weakly reducing: every chain still carries ONE free anomeric carbon (the reducing end) — branching adds non-reducing ends but never removes the original. So polysaccharides can give a feeble positive, and after partial hydrolysis the signal strengthens as new reducing ends are generated.', outcome: 'Polymerisation doesn\'t consume all anomeric carbons; one reducing end per chain persists, which is why \'all polysaccharides are non-reducing\' is wrong.' },
                { text: 'Starch will match glucose\'s strong positive — identical monomers mean identical chemistry.', outcome: 'Most anomeric carbons are locked in glycosidic bonds; only one reducing end per chain survives, so starch\'s Benedict\'s signal is feeble, not strong.', reveals: 'same-monomer-same-reaction' },
                { text: 'Polysaccharides are always non-reducing — polymerisation consumes every anomeric carbon in the chain.', outcome: 'Each chain keeps one free reducing end; α-1,6 branches create extra non-reducing ends but can\'t eliminate the original one.', reveals: 'polymers-have-no-reducing-end' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You read a carbohydrate\'s bond type and predicted its job — alpha for compact energy stores, beta for structural fibre. Structure-to-function in one step.',
            decisions: [{ prompt: 'What comes next? Biomolecules · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biomolecules · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_001', difficulty: 'standard',
          question: 'Carbohydrates are polyhydroxy aldehydes or ketones (monosaccharides) or their.',
          hint: 'Review Class 12 Chemistry "Carbohydrates" chapter (NCERT) for anomeric carbon.',
          misconception: 'Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly assume.',
          parts: [
                { id: 'a', prompt: 'Starch and cellulose are both polymers of glucose. Explain why humans can digest starch but not cellulose, referencing the specific glycosidic linkage and its.', answer: 'Starch has α-1,4-glycosidic bonds allowing helical coiling',
                  options: ['Starch has α-1,4-glycosidic bonds allowing helical coiling', 'cellulose has different monomers', 'all polysaccharides are non-reducing', '"all polysaccharides are non-reducing'],
                  hint: 'Review Class 12 Chemistry "Carbohydrates" chapter (NCERT) for anomeric carbon, mutarotation, and.',
                  misconception: 'Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly assume polymerization consumes all.' },
                { id: 'b', prompt: 'A student tests four unknown solutions with iodine and Benedict\'s reagent. Solution A: blue-black with iodine, negative Benedict\'s.', answer: 'A = starch (helical traps iodine, non-reducing ends masked)',
                  options: ['A = starch (helical traps iodine, non-reducing ends masked)', 'all polysaccharides are non-reducing', '"all polysaccharides are non-reducing'],
                  hint: 'Review Class 12 Chemistry "Carbohydrates" chapter (NCERT) for anomeric carbon, mutarotation, and.',
                  misconception: 'Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly assume polymerization consumes all.' },
                { id: 'c', prompt: 'Compare and contrast the biological roles of glycogen in animals and starch in plants.', answer: 'Both are α-glucose energy stores',
                  options: ['Both are α-glucose energy stores', 'all polysaccharides are non-reducing', '"all polysaccharides are non-reducing'],
                  hint: 'Review Class 12 Chemistry "Carbohydrates" chapter (NCERT) for anomeric carbon, mutarotation, and.',
                  misconception: 'Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly assume polymerization consumes all.' }
          ],
            remediations: { 'all-polysaccharides-are-non-reducing': { steps: ['Draw a linear tetrasaccharide: label C1 of terminal glucose as "reducing end" (free anomeric OH) and C4 of other end.', 'Use molecular models to show how α-1,6 branch creates a new non-reducing end but does not eliminate the original.', 'Test starch hydrolysate at 0, 5, 15 min with Benedict\'s — increasing positivity proves reducing ends are generated, not.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly assume.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using only iodine solution, Benedict\'s reagent, and salivary amylase to distinguish between starch, glycogen, and cellulose.', answer: '| Sample | Iodine test | Benedict\'s (before amylase) | Benedict\'s (after amylase',
                  options: ['| Sample | Iodine test | Benedict\'s (before amylase) | Benedict\'s (after amylase', 'all polysaccharides are non-reducing', '"all polysaccharides are non-reducing'],
                  hint: 'Review Class 12 Chemistry "Carbohydrates" chapter (NCERT) for anomeric carbon, mutarotation, and.',
                  misconception: 'Students believe "all polysaccharides are non-reducing because they are polymers." They incorrectly assume polymerization consumes all.' }
          ],
            remediations: { 'all-polysaccharides-are-non-reducing': { steps: ['Draw a linear tetrasaccharide: label C1 of terminal glucose as "reducing end" (free anomeric OH) and C4 of other end.', 'Use molecular models to show how α-1,6 branch creates a new non-reducing end but does not eliminate the original.', 'Test starch hydrolysate at 0, 5, 15 min with Benedict\'s — increasing positivity proves reducing ends are generated, not.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_002', difficulty: 'standard',
          question: 'Proteins are heteropolymers composed of α-amino acids linked by peptide bonds.',
          hint: 'Review Class 11 Chemistry Chapter "Organic Chemistry – Some Basic Principles and.',
          misconception: 'Students think the peptide bond is a simple single covalent bond (–C–N–) with free rotation, so they draw polypeptide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Proteins are heteropolymers composed of α-amino acids linked by peptide bonds formed',
                  options: ['Proteins are heteropolymers composed of α-amino acids linked by peptide bonds formed', 'Carbohydrates are polyhydroxy aldehydes or ketones (monosaccharides) or their polymers', 'Lipids are a diverse group of hydrophobic biomolecules primarily composed of carbon,', 'Nucleic acids are macromolecular polymers (polynucleotides) composed of repeating'],
                  hint: 'Review Class 11 Chemistry Chapter "Organic Chemistry – Some Basic Principles and Techniques" for.',
                  misconception: 'Students think the peptide bond is a simple single covalent bond (–C–N–) with free rotation, so they draw polypeptide chains as flexible.' }
          ],
            remediations: { 'the-peptide-bond-is-a': { steps: ['Draw the two resonance structures of a peptide bond side-by-side: one with C=O and C–N, another with C–O⁻ and C=N⁺.', 'Explain that the true structure is a hybrid, so the C–N bond is shorter and stronger than a normal single bond.', 'Use a molecular model kit or paper cutouts to show that the six atoms (Cα–C–O–N–Cα–H) lie in one plane.', 'Contrast with free rotation at N–Cα and Cα–C bonds by twisting a physical model.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_003', difficulty: 'standard',
          question: 'Lipids are a diverse group of hydrophobic biomolecules primarily composed.',
          hint: 'If stuck, revisit Class 10 Science Chapter 4 "Carbon and its Compounds" — specifically.',
          misconception: '**Misconception:** "All lipids are fats, and all fats are triglycerides." **Exact wrong reasoning:** Students equate.',
          parts: [
                { id: 'a', prompt: 'Palmitic acid (C16:0) and oleic acid (C18:1) are both 18-carbon fatty acids?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'both are 18 carbons, they are confusing palmitic with stearic acid (C18:0)'],
                  hint: 'If stuck, revisit Class 10 Science Chapter 4 "Carbon and its Compounds" — specifically the section.',
                  misconception: '**Misconception:** "All lipids are fats, and all fats are triglycerides." **Exact wrong reasoning:** Students equate the general term.' }
          ],
            remediations: { 'misconception-all-lipids-are-fats': { steps: ['** Show the student Figure 9.1 from NCERT (provided in reference text) and ask them to circle *only* the triglycerides.', '** Use a concept map: Lipids → (Simple: Fatty acids, Glycerol) + (Compound: Acylglycerols, Phospholipids, Glycolipids).', '** Ask: "Which lipid class forms the bilayer of the cell membrane?" If they say "triglyceride," remind them.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_004', difficulty: 'standard',
          question: 'Nucleic acids are macromolecular polymers (polynucleotides) composed.',
          hint: 'Review Class 11 Chemistry Chapter 10 (Biomolecules) sections on carbohydrates (cyclic.',
          misconception: 'Students memorize "A pairs with T, G pairs with C" but cannot explain WHY at the chemical level — they treat it.',
          parts: [
                { id: 'a', prompt: 'Compare the structural consequences of the 2\'-OH group in RNA versus its absence in DNA on: (a) helical geometry, (b) chemical stability, and (c) biological.', answer: 'helical geometry, (',
                  options: ['helical geometry, (', 'RNA is double helix like DNA', '2\'-OH has no effect'],
                  hint: 'Review Class 11 Chemistry Chapter 10 (Biomolecules) sections on carbohydrates (cyclic forms.',
                  misconception: 'Students memorize "A pairs with T, G pairs with C" but cannot explain WHY at the chemical level — they treat it as arbitrary rule rather.' }
          ],
            remediations: { 'students-memorize-a-pairs-with': { steps: ['Draw adenine and thymine structures side-by-side; circle H-bond donors (N-H) and acceptors (C=O, N:) — count two.', 'Repeat for guanine-cytosine — count three.', 'Attempt adenine-cytosine pairing — show donor-donor clash.', 'Build paper nucleotide models with 5\'/3\' labels; practice writing complements in both directions.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_005', difficulty: 'standard',
          question: 'Enzymes are biological catalysts, predominantly proteins (with some catalytic.',
          hint: 'Revisit c11_bio_cbse_09_002 (Proteins: Amino Acids and Peptide Bonds) and.',
          misconception: 'Students believe that "enzymes are used up in the reaction" because they see substrate disappear and product appear,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Enzymes are biological catalysts, predominantly proteins (with some catalytic RNA',
                  options: ['Enzymes are biological catalysts, predominantly proteins (with some catalytic RNA', 'Carbohydrates are polyhydroxy aldehydes or ketones (monosaccharides) or their polymers', 'Proteins are heteropolymers composed of α-amino acids linked by peptide bonds formed', 'Lipids are a diverse group of hydrophobic biomolecules primarily composed of carbon,'],
                  hint: 'Revisit c11_bio_cbse_09_002 (Proteins: Amino Acids and Peptide Bonds) and c11_bio_cbse_09_007.',
                  misconception: 'Students believe that "enzymes are used up in the reaction" because they see substrate disappear and product appear, so they assume the.' }
          ],
            remediations: { 'enzymes-are-used-up-in': { steps: ['Show the catalytic cycle diagram (E + S ⇌ ES → EP → E + P) and trace the enzyme molecule through one complete cycle.', 'Perform the potato-H₂O₂ demo with two setups: (A) fresh potato in H₂O₂, (B) boiled potato in H₂O₂.', 'Calculate turnover: if 1g potato (≈10⁻⁹ mol catalase) produces 100 mL O₂ (≈4×10⁻³ mol) in 1 min, turnover = (4×10⁻³.', 'Contrast with stoichiometric reactant (e.g., H₂O₂ itself) which is consumed.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_09_006', difficulty: 'standard',
          question: 'Enzyme kinetics is the quantitative study of how the rate of.',
          hint: 'Revisit c11_bio_cbse_09_005 sections 9.8.2 and 9.8.3 — focus on the energy profile.',
          misconception: 'Students believe that at low temperatures enzymes are \'killed\' or permanently destroyed, just like at high.',
          parts: [
                { id: 'a', prompt: 'Define \'optimum temperature\' for an enzyme and state what happens to the enzyme\'s tertiary structure when the temperature rises 10°C above this optimum.', answer: 'Optimum temperature is the specific temperature at',
                  options: ['Optimum temperature is the specific temperature at', 'enzyme works faster but then stops'],
                  hint: 'Revisit c11_bio_cbse_09_005 sections 9.8.2 and 9.8.3 — focus on the energy profile diagram (Figure.',
                  misconception: 'Students believe that at low temperatures enzymes are \'killed\' or permanently destroyed, just like at high temperatures.' }
          ],
            remediations: { 'at-low-temperatures-enzymes-are': { steps: ['Perform a quick demo — keep salivary amylase + starch at 4°C for 10 min, then warm to 37°C and test for starch.', 'Guide students to observe that the cold sample resumes digestion (reversible), while the boiled sample does not.', 'Link to molecular level: cold reduces kinetic energy → fewer effective collisions → temporary rate drop; heat breaks.', 'Have students annotate a temperature-activity graph labeling \'reversible inactivation zone\' and \'irreversible.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
