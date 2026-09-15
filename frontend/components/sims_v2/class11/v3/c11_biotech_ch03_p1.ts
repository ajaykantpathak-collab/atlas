import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch03_p1: SimDef = {
    id: 'v3_c11_biotech_ch03_p1',
    title: 'Biomolecules · Part 1/2',
    subtitle: 'Dissect carbohydrates, proteins, lipids and nucleic acids — structure first, function second.',
    classLevel: 11, subject: 'biotechnology', topic: 'Biomolecules · Part 1/2',
    chapters: ['c11_biotech_ch03'],
    nodeIds: ['c11_biotech_cbse_03_001', 'c11_biotech_cbse_03_002', 'c11_biotech_cbse_03_003', 'c11_biotech_cbse_03_004', 'c11_biotech_cbse_03_005', 'c11_biotech_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biochemist identifying mystery molecules in a food sample', intro: 'Everything a cell builds comes from a short list of molecular families. Learn to spot them.', goal: 'Describe the structure and function of the four major biomolecule classes and their monomers.' },
    discovery: {
        question: 'An egg white is almost pure protein, yet cooking turns it solid forever while cooling never reverses it. What did heat actually do to the protein?',
        options: ['It unfolded the protein\'s structure — denaturation — destroying its shape without breaking the chain apart', 'It broke the protein into individual amino acids', 'It evaporated the protein\'s water content only', 'It converted protein into fat by adding energy'],
        answer: 'It unfolded the protein\'s structure — denaturation — destroying its shape without breaking the chain apart',
        hook: 'A biomolecule\'s power lives in its 3D shape — scramble the fold and the chemistry dies even though the parts survive.',
    },
    teaching: [
        { title: 'Carbohydrates: Monosaccharides, Disaccharides and Polysaccharides', text: 'Carbohydrates are polyhydroxy aldehydes or ketones, or substances that yield such compounds on hydrolysis, with the general formula Cₙ(H₂O)ₙ; they are classified by degree of polymerization into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_03_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Classify the biomolecules in common foods and predict how each one\'s structure dictates its biological job.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_001', title: 'Carbohydrates: Monosaccharides, Disaccharides and Polysaccharides',
          caseStudy: { intro: 'Imagine you are eating a chapati: the starch in wheat flour is a polysaccharide that must be broken down into glucose units before your cells can use it for.',
            decisions: [{ prompt: 'State the general formula of monosaccharides and name the two functional groups that define them as aldoses or ketoses.', options: [
                { text: 'The general formula is Cₙ(H₂O)ₙ', outcome: 'The general formula is Cₙ(H₂O)ₙ. Aldoses contain a free aldehyde group (–CHO) at C‑1; ketoses.' },
                { text: 'CₙH₂ₙOₙ', outcome: 'Not quite — Students often believe that "D‑ and L‑sugars refer to optical rotation.', reveals: 'd-and-l-sugars-refer' },
                { text: 'alcohol and carboxyl groups', outcome: 'Not quite — Students often believe that "D‑ and L‑sugars refer to optical rotation.', reveals: 'd-and-l-sugars-refer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_002', title: 'Proteins: Amino Acids and Peptide Bond Formation',
          caseStudy: { intro: 'Imagine you are eating a boiled egg: the clear liquid egg white turns into a solid white mass.',
            decisions: [{ prompt: 'Write the general structural formula of an α-amino acid. Label the α-carbon, the amino group, the carboxyl group, and the R-group.', options: [
                { text: 'Correct answer: General formula: H₂N–CH(R)–COOH', outcome: 'Correct answer: General formula: H₂N–CH(R)–COOH. The α-carbon is the central carbon (CH) bonded.' },
                { text: '–COOH + –NH₂', outcome: 'Not quite — Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and.', reveals: '1-the-peptide-bond-forms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_003', title: 'Levels of Protein Structure: Primary to Quaternary',
          caseStudy: { intro: 'Imagine you have a long beaded necklace where each bead is an amino acid with a unique shape and stickiness.',
            decisions: [{ prompt: 'What is the defining covalent linkage in the primary structure of a protein, and between which two functional groups does it form?', options: [
                { text: 'The peptide bond (amide bond) forms between the α-carboxyl group of one amino acid and', outcome: 'The peptide bond (amide bond) forms between the α-carboxyl group of one amino acid and the α-amino.' },
                { text: 'hydrogen bond', outcome: 'Not quite — Students often believe that **hydrogen bonds in secondary structures form between side chains (R.', reveals: 'hydrogen-bonds-in-secondary-structures' },
                { text: 'disulfide bond', outcome: 'Not quite — Students often believe that **hydrogen bonds in secondary structures form between side chains (R.', reveals: 'hydrogen-bonds-in-secondary-structures' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_004', title: 'Lipids: Fatty Acids, Triglycerides and Phospholipids',
          caseStudy: { intro: 'Imagine you drop a spoonful of cooking oil (triglyceride) into a glass of water — it floats as a separate layer.',
            decisions: [{ prompt: 'Write the systematic shorthand notation for a saturated fatty acid with 16 carbon atoms. What does each part of the notation signify?', options: [
                { text: '**Answer:** 16:0', outcome: '**Answer:** 16:0 — “16” = total carbon atoms in the chain (including carboxyl carbon), “0” = zero.' },
                { text: 'What lipid forms the cell membrane?', outcome: 'Not quite — **“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride”.', reveals: 'all-lipids-are-fats-triglycerides' },
                { text: 'triglyceride', outcome: 'Not quite — **“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride”.', reveals: 'all-lipids-are-fats-triglycerides' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_005', title: 'Steroids and Waxes: Structure and Function',
          caseStudy: { intro: 'Imagine you are a plant biologist studying the waxy coating on a mango leaf that prevents water loss in the Indian summer heat.',
            decisions: [{ prompt: 'Name the four fused rings that constitute the steroid nucleus and state the total number of carbon atoms in the parent hydrocarbon skeleton.', options: [
                { text: 'The steroid nucleus consists of three cyclohexane rings (A, B, C) and one cyclopentane', outcome: 'The steroid nucleus consists of three cyclohexane rings (A, B, C) and one cyclopentane ring (D).' },
                { text: 'three rings', outcome: 'Not quite — Students often believe that all steroids are hormones because they hear "steroid hormones".', reveals: 'all-steroids-are-hormones-because' },
                { text: '20 carbons', outcome: 'Not quite — Students often believe that all steroids are hormones because they hear "steroid hormones".', reveals: 'all-steroids-are-hormones-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_006', title: 'Nucleic Acids: DNA Structure and Double Helix',
          scaffold: { problem: 'A forensic lab receives a 200 bp DNA fragment from a crime scene. Sequencing reveals it contains 52% GC content.',
            steps: [
            { text: 'Identify given values: N = 200 bp, %GC = 52, [Na+] = 0.05 M (50 mM), annealing temp = 55°C.' },
            { text: 'Recall Wallace rule formula: Tm = 81.5 + 16.6 × log10[Na+] + 41 × (%GC) - 600/N.' },
            { text: 'Compute log10[Na+] = log10(0.05) = -1.3010.' },
            { text: 'Substitute: Tm = 81.5 + 16.6 × (-1.3010) + 41 × 52 - 600/200.' },
            { text: 'Calculate each term: 16.6 × (-1.3010) = -21.60; 41 × 52 = 2132 (wait — %GC is 52, so 41 × 0.52?' },
            { text: '600/200 = 3. So Tm = 81.5 - 21.60 + 21.32 - 3 = 78.22°C.' },
            { text: 'Compare to annealing temp: Template Tm (78°C) >> annealing temp (55°C).', faded: true, blankAnswer: 'Tm ≈ 78.2°C. Not suitable — template remains.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Biomolecules · Part 1/2', spots: [
            { id: 's1', label: 'Proteins Amino Acids and Peptide Bond Formation', prompt: 'Which idea is this? — Amino acids are organic molecules with a central α-carbon bonded to four different.', answer: 'Proteins Amino Acids and Peptide Bond Formation', options: ['Proteins Amino Acids and Peptide Bond Formation', 'Levels of Protein Structure Primary to Quaternary', 'Lipids Fatty Acids Triglycerides and Phospholipids', 'Steroids and Waxes Structure and Function'] },
            { id: 's2', label: 'Levels of Protein Structure Primary to Quaternary', prompt: 'Which idea is this? — Protein structure is organized into four hierarchical levels: primary (linear amino acid.', answer: 'Levels of Protein Structure Primary to Quaternary', options: ['Levels of Protein Structure Primary to Quaternary', 'Proteins Amino Acids and Peptide Bond Formation', 'Lipids Fatty Acids Triglycerides and Phospholipids', 'Steroids and Waxes Structure and Function'] },
            { id: 's3', label: 'Lipids Fatty Acids Triglycerides and Phospholipids', prompt: 'Which idea is this? — Lipids are a diverse group of hydrophobic or amphipathic biomolecules primarily composed.', answer: 'Lipids Fatty Acids Triglycerides and Phospholipids', options: ['Lipids Fatty Acids Triglycerides and Phospholipids', 'Proteins Amino Acids and Peptide Bond Formation', 'Levels of Protein Structure Primary to Quaternary', 'Steroids and Waxes Structure and Function'] },
            { id: 's4', label: 'Steroids and Waxes Structure and Function', prompt: 'Which idea is this? — Steroids are lipids characterized by a fused four-ring carbon skeleton (three cyclohexane.', answer: 'Steroids and Waxes Structure and Function', options: ['Steroids and Waxes Structure and Function', 'Proteins Amino Acids and Peptide Bond Formation', 'Levels of Protein Structure Primary to Quaternary', 'Lipids Fatty Acids Triglycerides and Phospholipids'] },
            { id: 's5', label: 'Nucleic Acids DNA Structure and Double Helix', prompt: 'Which idea is this? — DNA (deoxyribonucleic acid) is a double-stranded helical polymer of deoxyribonucleotides.', answer: 'Nucleic Acids DNA Structure and Double Helix', options: ['Nucleic Acids DNA Structure and Double Helix', 'Proteins Amino Acids and Peptide Bond Formation', 'Levels of Protein Structure Primary to Quaternary', 'Lipids Fatty Acids Triglycerides and Phospholipids'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re designing a \'high-fibre energy bar\' for the school sports team and comparing two ingredient options: maltodextrin (short α-linked glucose chains, digested fast) versus cellulose fibre (β-1→4 linked glucose chains). A teammate argues both are \'just glucose chains\', so they\'ll give identical energy — pick whichever is cheaper.',
            decisions: [{ prompt: 'Will the two glucose polymers deliver the same usable energy to the athletes?', options: [
                { text: 'No — human amylases and disaccharidases hydrolyse α-glycosidic linkages (maltodextrin → glucose → energy) but cannot break β-1→4 linkages in cellulose, so cellulose passes undigested as fibre. Same monomer, different linkage stereochemistry, opposite fates.', outcome: 'Glycosidic bond geometry, not the monomer, decides digestibility — cellulose adds bulk and gut benefit but no calories.' },
                { text: 'Yes — both are polysaccharides of glucose, so the body will extract the same glucose units either way.', outcome: 'Humans lack cellulase; the β-1→4 bonds survive digestion intact, so \'same sugar units\' never reach the blood.', reveals: 'same-monomer-same-energy' },
                { text: 'Cellulose gives MORE energy because its chain is longer — more glucose units means more calories.', outcome: 'Chain length is irrelevant when the bonds can\'t be cleaved; undigested polymer contributes zero metabolic energy however long it is.', reveals: 'longer-chain-more-calories' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Carbs, proteins, lipids and nucleic acids are four alphabets — life writes every function by arranging their shapes.',
            decisions: [{ prompt: 'What comes next? Biomolecules · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biomolecules · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_001', difficulty: 'standard',
          question: 'Carbohydrates are polyhydroxy aldehydes or ketones, or substances that yield.',
          hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10.',
          misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and.',
          parts: [
                { id: 'a', prompt: 'State the general formula of monosaccharides and name the two functional groups that define them as aldoses or ketoses.', answer: 'The general formula is Cₙ(H₂O)ₙ',
                  options: ['The general formula is Cₙ(H₂O)ₙ', 'CₙH₂ₙOₙ', 'alcohol and carboxyl groups', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10 Biology.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' },
                { id: 'b', prompt: 'A disaccharide gives a positive Benedict’s test and yields one molecule each of D‑glucose and D‑fructose on hydrolysis.', answer: 'The disaccharide is sucrose',
                  options: ['The disaccharide is sucrose', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms', 'α‑D‑glucose is dextrorotatory, so α means D'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10 Biology.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' },
                { id: 'c', prompt: 'Compare the glycosidic linkages and branching patterns in amylopectin and glycogen.', answer: 'Both are α‑(1→4) linked linear chains with α‑(1→6) branches',
                  options: ['Both are α‑(1→4) linked linear chains with α‑(1→6) branches', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms', 'α‑D‑glucose is dextrorotatory, so α means D'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10 Biology.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' }
          ],
            remediations: { 'd-and-l-sugars-refer': { steps: ['Have the student build Fischer projections of D‑ and L‑glyceraldehyde, then extend to D‑glucose by adding chiral.', 'Use a physical model or drawing to cyclize D‑glucose: show the nucleophilic attack of C‑5 OH on C‑1 carbonyl, forming.', 'Mark the new chiral centre (C‑1) and demonstrate that the OH can be up (β) or down (α) while C‑5 configuration remains.', 'Ask the student to label the anomeric carbon in each cyclic form and state whether the sugar is D or L.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Cellulose and chitin are both β‑(1→4) linked polysaccharides, so they should be equally digestible by human enzymes."', answer: 'The statement is false',
                  options: ['The statement is false', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms', 'α‑D‑glucose is dextrorotatory, so α means D'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10 Biology.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' },
                { id: 'b', prompt: 'Design a hypothetical disaccharide that is a reducing sugar but cannot be hydrolyzed by human digestive enzymes.', answer: 'Example: β‑D‑glucopyranosyl‑(1→3)‑β‑D‑glucopyranose (laminaribiose)',
                  options: ['Example: β‑D‑glucopyranosyl‑(1→3)‑β‑D‑glucopyranose (laminaribiose)', 'D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)', 'α‑ and β‑anomers are the same as D‑ and L‑forms', 'α‑D‑glucose is dextrorotatory, so α means D'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Class 10 Biology.',
                  misconception: 'Students often believe that "D‑ and L‑sugars refer to optical rotation (dextrorotatory/levorotatory)" and that "α‑ and β‑anomers are the.' }
          ],
            remediations: { 'd-and-l-sugars-refer': { steps: ['Have the student build Fischer projections of D‑ and L‑glyceraldehyde, then extend to D‑glucose by adding chiral.', 'Use a physical model or drawing to cyclize D‑glucose: show the nucleophilic attack of C‑5 OH on C‑1 carbonyl, forming.', 'Mark the new chiral centre (C‑1) and demonstrate that the OH can be up (β) or down (α) while C‑5 configuration remains.', 'Ask the student to label the anomeric carbon in each cyclic form and state whether the sugar is D or L.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_002', difficulty: 'standard',
          question: 'Amino acids are organic molecules with a central α-carbon bonded to four.',
          hint: 'Review Class 10 Chemistry: c10_chem_cbse_04_001 (Covalent Bonding) and.',
          misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group**.',
          parts: [
                { id: 'a', prompt: 'Write the general structural formula of an α-amino acid. Label the α-carbon, the amino group, the carboxyl group, and the R-group.', answer: 'Correct answer: General formula: H₂N–CH(R)–COOH',
                  options: ['Correct answer: General formula: H₂N–CH(R)–COOH', '–COOH + –NH₂'],
                  hint: 'Review Class 10 Chemistry: c10_chem_cbse_04_001 (Covalent Bonding) and c10_chem_cbse_04_006.',
                  misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group** (side chain).' },
                { id: 'b', prompt: 'Given the amino acids Alanine (Ala, R=–CH₃) and Serine (Ser, R=–CH₂OH), draw the two possible dipeptides (Ala-Ser and Ser-Ala).', answer: 'Correct answer: - Ala-Ser: N-terminal = Ala, C-terminal = Ser',
                  options: ['Correct answer: - Ala-Ser: N-terminal = Ala, C-terminal = Ser', '–COOH + –NH₂'],
                  hint: 'Review Class 10 Chemistry: c10_chem_cbse_04_001 (Covalent Bonding) and c10_chem_cbse_04_006.',
                  misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group** (side chain).' }
          ],
            remediations: { '1-the-peptide-bond-forms': { steps: ['**Model building**: Give the student a molecular model kit (or paper cutouts) of two amino acids.', 'Physically remove –OH from carboxyl and –H from amino, join them, and show the released H₂O.', '**Resonance drawing**: Have them draw the two resonance forms of the peptide bond (O=C–N ↔ ⁻O–C=N⁺) and circle the six.', '**Chirality check**: Build glycine and alanine models; show glycine\'s α-carbon has two H\'s (superimposable mirror.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_003', difficulty: 'standard',
          question: 'Protein structure is organized into four hierarchical levels: primary (linear.',
          hint: 'Revisit amino acid R-group classification (c11_biotech_cbse_03_002) and practice drawing.',
          misconception: 'Students often believe that **hydrogen bonds in secondary structures form between side chains (R groups)** rather than.',
          parts: [
                { id: 'a', prompt: 'A polypeptide segment has the sequence: Lys-Ala-Glu-Cys-Val. Identify the N-terminal and C-terminal residues, and write the conventional name for this.', answer: 'N-terminal: Lysine',
                  options: ['N-terminal: Lysine', 'hydrogen bonds stabilize secondary structure', 'covalent bond', 'primary structure only'],
                  hint: 'Revisit amino acid R-group classification (c11_biotech_cbse_03_002) and practice drawing peptide.',
                  misconception: 'Students often believe that **hydrogen bonds in secondary structures form between side chains (R groups)** rather than between backbone.' }
          ],
            remediations: { 'hydrogen-bonds-in-secondary-structures': { steps: ['Have student draw a dipeptide with full atomic detail (including backbone N, Cα, C=O) and circle the atoms that.', 'Use a molecular model kit or PyMOL view to show that side chains point outward in an α-helix and cannot reach each.', 'Contrast disulfide bond formation (oxidation of two cysteine -SH groups, can be intrachain or interchain) with peptide.', 'Assign a Ramachandran plot exercise: plot φ/ψ for residues in a known α-helix (φ≈-60°, ψ≈-45°) and β-sheet (φ≈-120°.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_004', difficulty: 'standard',
          question: 'Lipids are a diverse group of hydrophobic or amphipathic biomolecules primarily.',
          hint: 'If stuck, revisit Class 10 Chemistry Chapter 4 (Carbon Compounds): ester functional.',
          misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably.',
          parts: [
                { id: 'a', prompt: 'Write the systematic shorthand notation for a saturated fatty acid with 16 carbon atoms. What does each part of the notation signify?', answer: '**Answer:** 16:0',
                  options: ['**Answer:** 16:0', 'What lipid forms the cell membrane?', 'triglyceride', 'cholesterol'],
                  hint: 'If stuck, revisit Class 10 Chemistry Chapter 4 (Carbon Compounds): ester functional group.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' },
                { id: 'b', prompt: 'A fatty acid is denoted as 18:2 (Δ9,12). Without drawing the full structure, explain in your own words: (a) how many carbons, (b) how many double bonds, (c).', answer: '**Answer:** (a) 18 carbons total',
                  options: ['**Answer:** (a) 18 carbons total', 'conjugated', 'What lipid forms the cell membrane?', 'triglyceride'],
                  hint: 'If stuck, revisit Class 10 Chemistry Chapter 4 (Carbon Compounds): ester functional group.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' },
                { id: 'c', prompt: 'You are given three test tubes: (A) pure tripalmitin (triglyceride with three palmitic acids), (B) pure phosphatidylcholine (a glycerophospholipid), (C) a 1:1.', answer: '**Answer:** - Tube A (tripalmitin): **Oil droplets**',
                  options: ['**Answer:** - Tube A (tripalmitin): **Oil droplets**', 'What lipid forms the cell membrane?', 'triglyceride', 'cholesterol'],
                  hint: 'If stuck, revisit Class 10 Chemistry Chapter 4 (Carbon Compounds): ester functional group.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' },
                { id: 'd', prompt: 'Compare and contrast the **backbone** and **linkage chemistry** of glycerophospholipids vs. sphingophospholipids.', answer: '**Answer:** - **Glycerophospholipid**: glycerol backbone',
                  options: ['**Answer:** - **Glycerophospholipid**: glycerol backbone', 'What lipid forms the cell membrane?', 'triglyceride', 'cholesterol'],
                  hint: 'If stuck, revisit Class 10 Chemistry Chapter 4 (Carbon Compounds): ester functional group.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' }
          ],
            remediations: { 'all-lipids-are-fats-triglycerides': { steps: ['**Re-anchor the definition**: Have the student write the one-sentence solubility definition: “Lipids are biomolecules.', '**Contrast table exercise**: Give a 3-column table (Class | Backbone | Key Functional Groups | Amphipathic?', 'Student fills it for the five classes using NCERT Figs 3.13–3.15.', '**“Odd one out” drill**: Show four structures (tripalmitin, phosphatidylcholine, cholesterol, beeswax).'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_005', difficulty: 'standard',
          question: 'Steroids are lipids characterized by a fused four-ring carbon skeleton (three.',
          hint: 'Review the esterification reaction in triglycerides (c11_biotech_cbse_03_004) and the.',
          misconception: 'Students often believe that all steroids are hormones because they hear "steroid hormones" frequently.',
          parts: [
                { id: 'a', prompt: 'Given the following fatty acid (C₁₆:₀, palmitic acid) and a monohydric alcohol (C₃₀H₆₂O, triacontanol), write the balanced chemical equation for the formation.', answer: 'Step 1: Write structures: Palmitic acid = CH₃(CH₂)₁₄COOH (C₁₆H₃₂O₂)',
                  options: ['Step 1: Write structures: Palmitic acid = CH₃(CH₂)₁₄COOH (C₁₆H₃₂O₂)', 'steroid hormones', 'adds formulas without subtracting water (e', 'all steroids are hormones'],
                  hint: 'Review the esterification reaction in triglycerides (c11_biotech_cbse_03_004) and the amphipathic.',
                  misconception: 'Students often believe that all steroids are hormones because they hear "steroid hormones" frequently.' }
          ],
            remediations: { 'all-steroids-are-hormones-because': { steps: ['Ask the student to list five steroids they know; they will likely name only hormones.', 'Show the cholesterol structure from NCERT Fig. 3.15 and highlight its –OH at C-3 and flexible side chain; explain that.', 'Contrast with testosterone: point out the keto group and Δ⁴ double bond that create a flat, rigid receptor-binding.', 'Give a fill-in table: Steroid | Primary Role | Key Functional Groups.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_006', difficulty: 'standard',
          question: 'DNA (deoxyribonucleic acid) is a double-stranded helical polymer.',
          hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) — specifically practice.',
          misconception: 'Students often believe that the two DNA strands are held together by covalent bonds between bases, or that "hydrogen.',
          parts: [
                { id: 'a', prompt: 'State the three components of a deoxyribonucleotide and specify which carbon of the deoxyribose sugar attaches to the phosphate group and which carbon attaches.', answer: 'A deoxyribonucleotide consists of: (1) a nitrogenous base (A, T, G, or C), (2) a',
                  options: ['A deoxyribonucleotide consists of: (1) a nitrogenous base (A, T, G, or C), (2) a', 'hydrogen bonds are weak so DNA falls apart easily', 'phosphate attaches to 3\' carbon or base attaches to 5\' carbon'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) — specifically practice drawing.',
                  misconception: 'Students often believe that the two DNA strands are held together by covalent bonds between bases, or that "hydrogen bonds are weak so DNA.' },
                { id: 'b', prompt: 'Explain why the two strands of the DNA double helix are described as "antiparallel" and how this relates to the 5\'→3\' directionality of each strand.', answer: 'The strands are antiparallel',
                  options: ['The strands are antiparallel', 'both strands run 5\'→3\' in the same direction', 'antiparallel means one is upside down', 'hydrogen bonds are weak so DNA falls apart easily'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) — specifically practice drawing.',
                  misconception: 'Students often believe that the two DNA strands are held together by covalent bonds between bases, or that "hydrogen bonds are weak so DNA.' },
                { id: 'c', prompt: 'A 100 base pair DNA fragment has 30% adenine. Calculate the number of hydrogen bonds holding the two strands together in this fragment. Show your reasoning.', answer: 'Given: 100 bp, 30% A → 30 A bases',
                  options: ['Given: 100 bp, 30% A → 30 A bases', 'hydrogen bonds are weak so DNA falls apart easily'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) — specifically practice drawing.',
                  misconception: 'Students often believe that the two DNA strands are held together by covalent bonds between bases, or that "hydrogen bonds are weak so DNA.' },
                { id: 'd', prompt: 'Compare B-DNA, A-DNA, and Z-DNA across these parameters: handedness, base pairs per turn, helix diameter, and biological occurrence.', answer: 'B-DNA: right-handed, 10 bp/turn, 20 Å diameter, predominant physiological form',
                  options: ['B-DNA: right-handed, 10 bp/turn, 20 Å diameter, predominant physiological form', 'hydrogen bonds are weak so DNA falls apart easily'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) — specifically practice drawing.',
                  misconception: 'Students often believe that the two DNA strands are held together by covalent bonds between bases, or that "hydrogen bonds are weak so DNA.' }
          ],
            remediations: { 'the-two-dna-strands-are': { steps: ['If a student holds this misconception: (1) Have them calculate total H-bonds in a 1000 bp DNA with 50% GC (answer: 2500.', '(2) Demonstrate with a "zipper" analogy: each tooth (H-bond) is weak, but a long zipper requires force to open — and.', '(3) Show melting curve data: DNA doesn\'t melt gradually but cooperatively at Tm, proving collective stabilization.', '(4) Assign a problem: "Why does 50% formamide lower Tm by ~30°C?" — answer: formamide disrupts base stacking and.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
