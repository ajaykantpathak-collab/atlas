import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch03_p2: SimDef = {
    id: 'v3_c11_biotech_ch03_p2',
    title: 'Biomolecules · Part 2/2',
    subtitle: 'Dissect carbohydrates, proteins, lipids and nucleic acids — structure first, function second.',
    classLevel: 11, subject: 'biotechnology', topic: 'Biomolecules · Part 2/2',
    chapters: ['c11_biotech_ch03'],
    nodeIds: ['c11_biotech_cbse_03_007', 'c11_biotech_cbse_03_008', 'c11_biotech_cbse_03_009', 'c11_biotech_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biochemist identifying mystery molecules in a food sample', intro: 'Everything a cell builds comes from a short list of molecular families. Learn to spot them.', goal: 'Describe the structure and function of the four major biomolecule classes and their monomers.' },
    discovery: {
        question: 'An egg white is almost pure protein, yet cooking turns it solid forever while cooling never reverses it. What did heat actually do to the protein?',
        options: ['It unfolded the protein\'s structure — denaturation — destroying its shape without breaking the chain apart', 'It broke the protein into individual amino acids', 'It evaporated the protein\'s water content only', 'It converted protein into fat by adding energy'],
        answer: 'It unfolded the protein\'s structure — denaturation — destroying its shape without breaking the chain apart',
        hook: 'A biomolecule\'s power lives in its 3D shape — scramble the fold and the chemistry dies even though the parts survive.',
    },
    teaching: [
        { title: 'RNA: Types and Structure', text: 'RNA (Ribonucleic Acid) is a single-stranded polynucleotide polymer composed of ribonucleotides containing D-ribose sugar, phosphate groups, and nitrogenous bases (adenine, guanine, cytosine, uracil).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_03_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Classify the biomolecules in common foods and predict how each one\'s structure dictates its biological job.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_007', title: 'RNA: Types and Structure',
          caseStudy: { intro: 'Imagine you\'re a chef in a busy restaurant kitchen. DNA is the master recipe book locked in the head chef\'s office (nucleus) — too valuable to bring to the.',
            decisions: [{ prompt: 'Name the three major types of RNA and state one primary function for each in a eukaryotic cell.', options: [
                { text: 'mRNA — carries genetic code from DNA to ribosome for protein synthesis', outcome: 'mRNA — carries genetic code from DNA to ribosome for protein synthesis; rRNA — structural and.' },
                { text: 'rRNA carries genetic code', outcome: 'Not quite — Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA.', reveals: 'rna-is-just-single-stranded' },
                { text: 'tRNA makes ribosomes', outcome: 'Not quite — Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA.', reveals: 'rna-is-just-single-stranded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_008', title: 'Nucleotides and Nucleosides: Components and Bonding',
          caseStudy: { intro: 'Imagine you are given a mixed bag of Lego bricks: some are flat rectangular plates (bases), some are pentagonal rings (sugars), and some are small round knobs.',
            decisions: [{ prompt: 'What are the three chemical components of a deoxyribonucleotide, and which carbon of the pentose sugar carries the phosphate group in.', options: [
                { text: 'A deoxyribonucleotide contains a nitrogenous base (A, G, C, or T), a 2\'-deoxy-D-ribose', outcome: 'A deoxyribonucleotide contains a nitrogenous base (A, G, C, or T), a 2\'-deoxy-D-ribose pentose.' },
                { text: '5\'-phosphate', outcome: 'Not quite — Students often think the "5\'" and "3\'" labels refer to the phosphate group positions rather than.', reveals: 'the-5-and-3-labels' },
                { text: 'the phosphate is attached to the 5\' of the phosphate', outcome: 'Not quite — Students often think the "5\'" and "3\'" labels refer to the phosphate group positions rather than.', reveals: 'the-5-and-3-labels' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_009', title: 'Water as a Biological Solvent: Properties',
          caseStudy: { intro: 'Imagine you are preparing a buffer for a PCR reaction: you dissolve Tris, KCl, and MgCl₂ in distilled water, and everything dissolves perfectly—but if you.',
            decisions: [{ prompt: 'State the bond angle in a water molecule and explain how this geometry, combined with the electronegativity difference between oxygen and.', options: [
                { text: 'The H–O–H bond angle is 104.5°', outcome: 'The H–O–H bond angle is 104.5°. Oxygen (EN = 3.44) is more electronegative than hydrogen (EN.' },
                { text: '180° bond angle', outcome: 'Not quite — Students often believe "water\'s high specific heat is because water molecules have many degrees.', reveals: 'water-s-high-specific-heat' },
                { text: 'no dipole moment', outcome: 'Not quite — Students often believe "water\'s high specific heat is because water molecules have many degrees.', reveals: 'water-s-high-specific-heat' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_010', title: 'Minerals and Vitamins: Role in Biological Systems',
          caseStudy: { intro: 'Imagine a patient complaining of muscle cramps, irregular heartbeat, and fatigue – the doctor orders a serum electrolyte panel and finds low magnesium and.',
            decisions: [{ prompt: 'Name two macro-minerals and two trace minerals, and state one distinct biochemical function for each.', options: [
                { text: 'Macro-minerals: Calcium (structural component of hydroxyapatite in bones/teeth, also', outcome: 'Macro-minerals: Calcium (structural component of hydroxyapatite in bones/teeth, also second.' },
                { text: 'sodium', outcome: 'Not quite — Students often believe that vitamins and minerals "give energy" because supplement labels say.', reveals: 'vitamins-and-minerals-give-energy' },
                { text: 'calcium gives energy', outcome: 'Not quite — Students often believe that vitamins and minerals "give energy" because supplement labels say.', reveals: 'vitamins-and-minerals-give-energy' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'Biomolecules · Part 2/2', spots: [
            { id: 's1', label: 'RNA Types and Structure', prompt: 'Which idea is this? — RNA (Ribonucleic Acid) is a single-stranded polynucleotide polymer composed.', answer: 'RNA Types and Structure', options: ['RNA Types and Structure', 'Nucleotides and Nucleosides Components and Bonding', 'Water as a Biological Solvent Properties', 'Minerals and Vitamins Role in Biological Systems'] },
            { id: 's2', label: 'Nucleotides and Nucleosides Components and Bonding', prompt: 'Which idea is this? — A nucleoside consists of a nitrogenous base (purine or pyrimidine) covalently bonded to.', answer: 'Nucleotides and Nucleosides Components and Bonding', options: ['Nucleotides and Nucleosides Components and Bonding', 'RNA Types and Structure', 'Water as a Biological Solvent Properties', 'Minerals and Vitamins Role in Biological Systems'] },
            { id: 's3', label: 'Water as a Biological Solvent Properties', prompt: 'Which idea is this? — Water is a polar molecule with a bent geometry (104.5° bond angle) that exhibits.', answer: 'Water as a Biological Solvent Properties', options: ['Water as a Biological Solvent Properties', 'RNA Types and Structure', 'Nucleotides and Nucleosides Components and Bonding', 'Minerals and Vitamins Role in Biological Systems'] },
            { id: 's4', label: 'Minerals and Vitamins Role in Biological Systems', prompt: 'Which idea is this? — Minerals are inorganic elements required by living organisms in trace to moderate amounts.', answer: 'Minerals and Vitamins Role in Biological Systems', options: ['Minerals and Vitamins Role in Biological Systems', 'RNA Types and Structure', 'Nucleotides and Nucleosides Components and Bonding', 'Water as a Biological Solvent Properties'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re designing a \'high-fibre energy bar\' for the school sports team and comparing two ingredient options: maltodextrin (short α-linked glucose chains, digested fast) versus cellulose fibre (β-1→4 linked glucose chains). A teammate argues both are \'just glucose chains\', so they\'ll give identical energy — pick whichever is cheaper.',
            decisions: [{ prompt: 'Will the two glucose polymers deliver the same usable energy to the athletes?', options: [
                { text: 'No — human amylases and disaccharidases hydrolyse α-glycosidic linkages (maltodextrin → glucose → energy) but cannot break β-1→4 linkages in cellulose, so cellulose passes undigested as fibre. Same monomer, different linkage stereochemistry, opposite fates.', outcome: 'Glycosidic bond geometry, not the monomer, decides digestibility — cellulose adds bulk and gut benefit but no calories.' },
                { text: 'Yes — both are polysaccharides of glucose, so the body will extract the same glucose units either way.', outcome: 'Humans lack cellulase; the β-1→4 bonds survive digestion intact, so \'same sugar units\' never reach the blood.', reveals: 'same-monomer-same-energy' },
                { text: 'Cellulose gives MORE energy because its chain is longer — more glucose units means more calories.', outcome: 'Chain length is irrelevant when the bonds can\'t be cleaved; undigested polymer contributes zero metabolic energy however long it is.', reveals: 'longer-chain-more-calories' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'Carbs, proteins, lipids and nucleic acids are four alphabets — life writes every function by arranging their shapes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_007', difficulty: 'standard',
          question: 'RNA (Ribonucleic Acid) is a single-stranded polynucleotide polymer composed.',
          hint: 'Revisit c11_biotech_cbse_03_008: practice drawing adenosine-5\'-monophosphate (AMP) and.',
          misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive.',
          parts: [
                { id: 'a', prompt: 'Name the three major types of RNA and state one primary function for each in a eukaryotic cell.', answer: 'mRNA — carries genetic code from DNA to ribosome for protein synthesis',
                  options: ['mRNA — carries genetic code from DNA to ribosome for protein synthesis', 'rRNA carries genetic code', 'tRNA makes ribosomes', 'RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Revisit c11_biotech_cbse_03_008: practice drawing adenosine-5\'-monophosphate (AMP) and.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' },
                { id: 'b', prompt: 'A eukaryotic mRNA has the sequence 5\'-GCC AUG GCU UAA-3\' (where AUG = start, UAA = stop).', answer: 'Second codon = GCU (Ala)',
                  options: ['Second codon = GCU (Ala)', 'RNA is just single-stranded DNA with uracil instead of thymine', '"RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Revisit c11_biotech_cbse_03_008: practice drawing adenosine-5\'-monophosphate (AMP) and.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' },
                { id: 'c', prompt: 'Compare the rRNA composition of prokaryotic (70S) and eukaryotic (80S) ribosomes.', answer: 'Prokaryotic: 30S subunit (16S rRNA) + 50S subunit (23S + 5S rRNA) = 70S',
                  options: ['Prokaryotic: 30S subunit (16S rRNA) + 50S subunit (23S + 5S rRNA) = 70S', '30+50=80', 'RNA is just single-stranded DNA with uracil instead of thymine', '"RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Revisit c11_biotech_cbse_03_008: practice drawing adenosine-5\'-monophosphate (AMP) and.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' }
          ],
            remediations: { 'rna-is-just-single-stranded': { steps: ['Have student draw a single ribonucleotide and a deoxyribonucleotide side-by-side; circle the 2\'-OH and ask: "What can.', 'Show tRNA crystal structure (PDB 1EHZ) — highlight non-Watson-Crick pairs, base triples, and the sharp U-turn.', 'Contrast: "DNA stores; RNA does." List three catalytic RNAs (RNase P, spliceosome snRNA, ribosomal peptidyl.', 'Practice: predict cleavage products of RNA vs DNA in 0.1M NaOH at 37°C — RNA yields 2\',3\'-cyclic phosphate; DNA intact.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The 5\' cap (7-methylguanosine) and poly-A tail on eukaryotic mRNA are functionally redundant — removing either one has the same effect.', answer: 'Refute',
                  options: ['Refute', 'stability tags', 'RNA is just single-stranded DNA with uracil instead of thymine', '"RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Revisit c11_biotech_cbse_03_008: practice drawing adenosine-5\'-monophosphate (AMP) and.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' }
          ],
            remediations: { 'rna-is-just-single-stranded': { steps: ['Have student draw a single ribonucleotide and a deoxyribonucleotide side-by-side; circle the 2\'-OH and ask: "What can.', 'Show tRNA crystal structure (PDB 1EHZ) — highlight non-Watson-Crick pairs, base triples, and the sharp U-turn.', 'Contrast: "DNA stores; RNA does." List three catalytic RNAs (RNase P, spliceosome snRNA, ribosomal peptidyl.', 'Practice: predict cleavage products of RNA vs DNA in 0.1M NaOH at 37°C — RNA yields 2\',3\'-cyclic phosphate; DNA intact.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_008', difficulty: 'standard',
          question: 'A nucleoside consists of a nitrogenous base (purine or pyrimidine) covalently.',
          hint: 'Review the cyclic structure of pentoses (especially carbon numbering 1\' to 5\') and the.',
          misconception: 'Students often think the "5\'" and "3\'" labels refer to the phosphate group positions rather than the carbon atoms.',
          parts: [
                { id: 'a', prompt: 'Explain why a nucleoside cannot be directly incorporated into a growing polynucleotide chain during DNA synthesis, whereas a nucleotide triphosphate can.', answer: 'A nucleoside lacks a phosphate group at the 5\' carbon, so it cannot form the',
                  options: ['A nucleoside lacks a phosphate group at the 5\' carbon, so it cannot form the', 'nucleosides have no energy', 'nucleosides lack the base', '5\'-phosphate'],
                  hint: 'Review the cyclic structure of pentoses (especially carbon numbering 1\' to 5\') and the mechanism.',
                  misconception: 'Students often think the "5\'" and "3\'" labels refer to the phosphate group positions rather than the carbon atoms of the pentose sugar.' }
          ],
            remediations: { 'the-5-and-3-labels': { steps: ['Have the student physically model a pentose sugar with numbered carbons (1\' to 5\') using paper cutouts.', 'Ask them to place a base on C1\' and a phosphate on C5\', then write the name "5\'-monophosphate" while pointing to the.', 'Repeat with phosphate on C3\' to create "3\'-monophosphate".', 'Emphasize: the prime numbers belong to the sugar carbons, not the phosphate.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_009', difficulty: 'standard',
          question: 'Water is a polar molecule with a bent geometry (104.5° bond angle) that.',
          hint: 'Revisit Class 9 Chemistry Chapter 3 (Atoms and Molecules) for covalent bonding and.',
          misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom".',
          parts: [
                { id: 'a', prompt: 'State the bond angle in a water molecule and explain how this geometry, combined with the electronegativity difference between oxygen and hydrogen, gives water.', answer: 'The H–O–H bond angle is 104.5°',
                  options: ['The H–O–H bond angle is 104.5°', '180° bond angle', 'no dipole moment', 'hydrogen bonds are covalent bonds'],
                  hint: 'Revisit Class 9 Chemistry Chapter 3 (Atoms and Molecules) for covalent bonding and.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' },
                { id: 'b', prompt: 'A student claims: "Water has a high boiling point because its molecules are heavy." Critique this statement using the concept of hydrogen bonding and compare.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'hydrogen bonds are covalent bonds'],
                  hint: 'Revisit Class 9 Chemistry Chapter 3 (Atoms and Molecules) for covalent bonding and.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' },
                { id: 'c', prompt: 'You are given 100 mL of water at 25°C. Calculate the energy (in kJ) required to heat it to 100°C and then completely vaporize it.', answer: 'Step 1: Mass of water = 100 mL × 1.00 g·mL⁻¹ = 100 g',
                  options: ['Step 1: Mass of water = 100 mL × 1.00 g·mL⁻¹ = 100 g', 'hydrogen bonds are covalent bonds'],
                  hint: 'Revisit Class 9 Chemistry Chapter 3 (Atoms and Molecules) for covalent bonding and.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' }
          ],
            remediations: { 'water-s-high-specific-heat': { steps: ['Have the student draw a single water molecule and label covalent bonds (O–H) vs. hydrogen bonds (O···H–O) to a neighbor.', 'Use a molecular dynamics simulation (e.g., PhET "States of Matter" or "Molecule Polarity") to visualize H-bonds.', 'Calculate energy to break one H-bond (~20 kJ·mol⁻¹) vs. energy to raise 1 mol water by 1 K (75.3 J·mol⁻¹·K⁻¹ × 1.', 'Assign a 2-minute write-up: "Explain to a Class 9 student why water\'s specific heat is high, using the words \'hydrogen.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_010', difficulty: 'standard',
          question: 'Minerals are inorganic elements required by living organisms in trace.',
          hint: 'Revisit c11_biotech_cbse_03_002 (amino acids/peptide bonds) for enzyme structure, and.',
          misconception: 'Students often believe that vitamins and minerals "give energy" because supplement labels say "energy metabolism." They.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Minerals are inorganic elements required by living organisms in trace to moderate amounts',
                  options: ['Minerals are inorganic elements required by living organisms in trace to moderate amounts', 'Carbohydrates are polyhydroxy aldehydes or ketones, or substances that yield such', 'Amino acids are organic molecules with a central α-carbon bonded to four different', 'Protein structure is organized into four hierarchical levels: primary (linear amino acid'],
                  hint: 'Revisit c11_biotech_cbse_03_002 (amino acids/peptide bonds) for enzyme structure, and.',
                  misconception: 'Students often believe that vitamins and minerals "give energy" because supplement labels say "energy metabolism." They confuse *catalytic.' }
          ],
            remediations: { 'vitamins-and-minerals-give-energy': { steps: ['Ask the student to write the balanced equation for aerobic respiration (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP).', 'Have them highlight where Mg²⁺, Fe²⁺/Fe³⁺, and each B-vitamin coenzyme act in glycolysis, PDH, TCA cycle, and ETC.', 'Explicitly state: "No vitamin or mineral appears as a reactant or product in the overall equation – they are.', 'Give a concrete analogy: "A car engine (enzyme) needs spark plugs (minerals/vitamins) to burn petrol (glucose); the.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
