import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch10_p1: SimDef = {
    id: 'v3_c11_biotech_ch10_p1',
    title: 'Protein Informatics · Part 1/2',
    subtitle: 'Explore protein databases, domains and homology-based structure prediction.',
    classLevel: 11, subject: 'biotechnology', topic: 'Protein Informatics · Part 1/2',
    chapters: ['c11_biotech_ch10'],
    nodeIds: ['c11_biotech_cbse_10_001', 'c11_biotech_cbse_10_002', 'c11_biotech_cbse_10_003', 'c11_biotech_cbse_10_004', 'c11_biotech_cbse_10_005', 'c11_biotech_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a structural bioinformatician shortlisting drug targets', intro: 'The lab wants a structure by Friday; the crystal will take a year. Compute it instead.', goal: 'Navigate protein databases, identify domains/motifs, and explain comparative modelling.' },
    discovery: {
        question: 'Two proteins share 60% of their amino-acid sequence. A drug blocks one cleanly. Can you predict the other\'s shape well enough to guess whether the drug will fit?',
        options: ['Yes — homologous sequences usually fold alike, so one structure models the other', 'No — protein shape is unrelated to sequence', 'Only if the proteins come from the same organ', 'Yes, but only after crystallising it — prediction is impossible'],
        answer: 'Yes — homologous sequences usually fold alike, so one structure models the other',
        hook: 'Protein informatics rests on one bet: evolution reuses folds, so similarity in sequence means similarity in shape.',
    },
    teaching: [
        { title: 'Protein Structure Databases: PDB and CATH', text: 'Protein Structure Databases are curated repositories that store experimentally determined three-dimensional coordinates of proteins and other macromolecules; PDB (Protein Data Bank) is the primary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_10_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Pull a protein\'s record, inspect its predicted domains, and judge whether a homologous structure can stand in for it.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_001', title: 'Protein Structure Databases: PDB and CATH',
          caseStudy: { intro: 'Imagine you are a researcher trying to design a drug that blocks an enzyme involved in a disease. You need the exact 3D shape of that enzyme\'s active site.',
            decisions: [{ prompt: 'What is the primary experimental source of structures deposited in the Protein Data Bank (PDB)?', options: [
                { text: 'The primary experimental sources are X-ray crystallography, NMR spectroscopy, and', outcome: 'The primary experimental sources are X-ray crystallography, NMR spectroscopy, and cryo-electron.' },
                { text: 'mass spectrometry', outcome: 'Not quite — Students often think PDB and CATH are interchangeable "structure databases" and that a PDB.', reveals: 'pdb-and-cath-are-interchangeable' },
                { text: 'computational prediction only', outcome: 'Not quite — Students often think PDB and CATH are interchangeable "structure databases" and that a PDB.', reveals: 'pdb-and-cath-are-interchangeable' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_002', title: 'Primary Structure Analysis: Composition and Properties',
          scaffold: { problem: 'A researcher isolates a peptide from a medicinal plant in the Western Ghats with sequence: Lys-Arg-Glu-Asp-Ser (KRED).',
            steps: [
            { text: 'Identify the given sequence (KRED) and the hydropathy values for each residue from the Kyte-Doolittle scale.' },
            { text: 'Recall the GRAVY formula: GRAVY = (Sum of hydropathy values of all residues) / (Total number of residues).' },
            { text: 'Sum the hydropathy values: (-3.9) + (-4.5) + (-3.5) + (-3.5) + (-0.8) = -16.2.' },
            { text: 'Divide by the number of residues (5): GRAVY = -16.2 / 5 = -3.24.' },
            { text: 'Interpret the result: A strongly negative GRAVY (-3.24) indicates high hydrophilicity, meaning the peptide.', faded: true, blankAnswer: 'GRAVY = -3.24 (highly hydrophilic, suitable.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_003', title: 'Secondary Structure Prediction: Chou-Fasman and GOR Methods',
          scaffold: { problem: 'Predict the secondary structure of the 14-residue peptide `Met-Ala-Glu-Leu-Lys-Ala-Glu-Leu-Met-Glu-Lys-Ala-Leu-Glu` using the Chou-Fasman.',
            steps: [
            { text: 'Write the sequence with residue indices 1–14 and tabulate Pα, Pβ, Pτ for each residue.' },
            { text: 'Scan for helix nuclei: find all windows of 6 residues where ≥ 4 have Pα > 1.00.' },
            { text: 'Merge overlapping nuclei into a single helical region from residue 1 to 14 because every 6-mer window satisfies the 4/6.' },
            { text: 'Extend helix bidirectionally: N-terminal already at residue 1; C-terminal already at residue 14. No extension needed.' },
            { text: 'Scan for sheet nuclei: need 3 out of 5 with Pβ > 1.00. Only Leu has Pβ = 1.30 > 1.00; all others < 1.00.' },
            { text: 'Check turn nuclei: need Pτ > 1.00; none. Final assignment: all 14 residues = H (helix).', faded: true, blankAnswer: 'HHHHHHHHHHHHHH (14-residue α-helix)' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_004', title: 'Tertiary Structure Prediction: Homology Modelling',
          caseStudy: { intro: 'Imagine you have the gene sequence for a novel enzyme from a heat-tolerant bacterium found in an Indian hot spring, but no experimental structure exists.',
            decisions: [{ prompt: 'What is the fundamental biological principle that makes homology modelling possible, and what is the minimum sequence identity generally.', options: [
                { text: 'The fundamental principle is that homologous proteins (descended from a common ancestor)', outcome: 'The fundamental principle is that homologous proteins (descended from a common ancestor) conserve.' },
                { text: 'sequence identity is irrelevant', outcome: 'Not quite — Students often believe that **sequence identity percentage alone determines model quality**.', reveals: 'sequence-identity-percentage-alone-determines' },
                { text: '10% is sufficient for global modelling', outcome: 'Not quite — Students often believe that **sequence identity percentage alone determines model quality**.', reveals: 'sequence-identity-percentage-alone-determines' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_005', title: 'Threading and Ab Initio Modelling',
          caseStudy: { intro: 'Imagine you have discovered a new protein from a soil bacterium that degrades plastic waste — its sequence shares no significant similarity with any protein.',
            decisions: [{ prompt: 'A researcher has a 150-residue protein sequence with no significant BLAST hit against PDB (E-value > 0.01).', options: [
                { text: 'Threading (fold recognition) should be attempted first', outcome: 'Threading (fold recognition) should be attempted first. Reason: When no homologue exists in PDB.' },
                { text: 'Plan B and Plan C', outcome: 'Not quite — Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after.', reveals: 'threading-and-ab-initio-modelling' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_10_006', title: 'Protein Structure Validation: Ramachandran Plot',
          scaffold: { problem: 'A structural biologist determines the crystal structure of a 180-residue enzyme at 2.1 Å resolution.',
            steps: [
            { text: 'Identify total residues (N=180) and count in each category: Favored=158, Allowed=18, Generously allowed=3, Outlier=1.' },
            { text: 'Calculate percentage in most favored regions: (158/180) × 100 = 87.78% ≈ 87.8%.' },
            { text: 'Calculate percentage in outlier (disallowed) regions: (1/180) × 100 = 0.56%.' },
            { text: 'Compare with standard thresholds: Favored ≥90% (FAIL: 87.8% < 90%), Outliers <0.5% (FAIL: 0.56% > 0.5%).' },
            { text: 'Analyze the outlier: Gly78 at φ=+85°, ψ=-15° falls in the "generously allowed" region for glycine (upper-right quadrant.' },
            { text: 'Refinement strategy: (a) Check 2Fo-Fc and Fo-Fc electron density maps at Gly78 — if density is weak, rebuild with φ/ψ.', faded: true, blankAnswer: 'Favored = 87.8% (fails ≥90% threshold), Outliers = 0.56%.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Protein Informatics · Part 1/2', spots: [
            { id: 's1', label: 'Protein Structure Databases PDB and CATH', prompt: 'Which idea is this? — Protein Structure Databases are curated repositories that store experimentally determined.', answer: 'Protein Structure Databases PDB and CATH', options: ['Protein Structure Databases PDB and CATH', 'Primary Structure Analysis Composition and Properties', 'Secondary Structure Prediction Chou-Fasman and GOR Methods', 'Tertiary Structure Prediction Homology Modelling'] },
            { id: 's2', label: 'Primary Structure Analysis Composition and Properties', prompt: 'Which idea is this? — Primary structure analysis of proteins involves computational determination.', answer: 'Primary Structure Analysis Composition and Properties', options: ['Primary Structure Analysis Composition and Properties', 'Protein Structure Databases PDB and CATH', 'Secondary Structure Prediction Chou-Fasman and GOR Methods', 'Tertiary Structure Prediction Homology Modelling'] },
            { id: 's3', label: 'Secondary Structure Prediction Chou-Fasman and GOR Methods', prompt: 'Which idea is this? — Secondary structure prediction is the computational inference of local protein.', answer: 'Secondary Structure Prediction Chou-Fasman and GOR Methods', options: ['Secondary Structure Prediction Chou-Fasman and GOR Methods', 'Protein Structure Databases PDB and CATH', 'Primary Structure Analysis Composition and Properties', 'Tertiary Structure Prediction Homology Modelling'] },
            { id: 's4', label: 'Tertiary Structure Prediction Homology Modelling', prompt: 'Which idea is this? — Homology modelling is a computational method for predicting the three-dimensional.', answer: 'Tertiary Structure Prediction Homology Modelling', options: ['Tertiary Structure Prediction Homology Modelling', 'Protein Structure Databases PDB and CATH', 'Primary Structure Analysis Composition and Properties', 'Secondary Structure Prediction Chou-Fasman and GOR Methods'] },
            { id: 's5', label: 'Threading and Ab Initio Modelling', prompt: 'Which idea is this? — Threading (fold recognition) is a computational method that aligns a target protein.', answer: 'Threading and Ab Initio Modelling', options: ['Threading and Ab Initio Modelling', 'Protein Structure Databases PDB and CATH', 'Primary Structure Analysis Composition and Properties', 'Secondary Structure Prediction Chou-Fasman and GOR Methods'] },
            { id: 's6', label: 'Protein Structure Validation Ramachandran Plot', prompt: 'Which idea is this? — The Ramachandran Plot is a two-dimensional scatter plot of the backbone dihedral angles φ.', answer: 'Protein Structure Validation Ramachandran Plot', options: ['Protein Structure Validation Ramachandran Plot', 'Protein Structure Databases PDB and CATH', 'Primary Structure Analysis Composition and Properties', 'Secondary Structure Prediction Chou-Fasman and GOR Methods'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school science project you want to compare the 3D structures of human and zebrafish insulin. Your partner says: \'Search CATH for the PDB file — a PDB ID maps straight to a CATH code, and PDB and CATH are basically the same database with different names.\'',
            decisions: [{ prompt: 'How do you actually get structures and their classifications?', options: [
                { text: 'Retrieve the experimental structure files (coordinates, method, resolution) from PDB; then use CATH to see how each protein\'s domains are classified (Class→Architecture→Topology→Homology). One PDB entry can contain several CATH domains — they are complementary, not interchangeable.', outcome: 'PDB stores raw experimental entries; CATH organises individual domains into structural families — you need both, in that order.' },
                { text: 'One PDB ID gives one CATH code — just type the ID into CATH and read the answer.', outcome: 'CATH works at the domain level; multi-domain or multi-chain PDB entries split into several CATH domains, so there\'s no 1:1 mapping.', reveals: 'pdb-id-equals-cath-code' },
                { text: 'Skip PDB — CATH alone contains the coordinates, so it replaces PDB entirely.', outcome: 'CATH is a classification layer over experimental data; it doesn\'t host raw coordinate files, so you still need PDB for the structures themselves.', reveals: 'cath-replaces-pdb' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'A protein\'s sequence is a folding recipe — informatics reads the recipe before the oven is ever switched on.',
            decisions: [{ prompt: 'What comes next? Protein Informatics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Protein Informatics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_001', difficulty: 'standard',
          question: 'Protein Structure Databases are curated repositories that store experimentally.',
          hint: 'If stuck, revisit Class 11 Biology Chapter "Biomolecules" (protein structure levels) and.',
          misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH.',
          parts: [
                { id: 'a', prompt: 'A student downloads the PDB entry 1CRN (crambin) and sees the header line "EXPDTA X-RAY DIFFRACTION" and "RESOLUTION 1.50 ANGSTROMS".', answer: 'Yes, it is suitable',
                  options: ['Yes, it is suitable', 'structure databases', 'Homology'],
                  hint: 'If stuck, revisit Class 11 Biology Chapter "Biomolecules" (protein structure levels) and Class 12.',
                  misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH code.' }
          ],
            remediations: { 'pdb-and-cath-are-interchangeable': { steps: ['Have the student open the PDB entry for 1TIM (triose phosphate isomerase) and the corresponding CATH entries for its.', 'Ask them to list the chains in the PDB file (A and B) and then check how many CATH domains are assigned per chain.', 'Guide them to see that each chain is a single domain but CATH splits the barrel into two evolutionary units?', 'Actually, TIM barrel is one domain per chain.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since PDB contains all known protein structures, CATH is redundant because one can simply search PDB for structural similarity using.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'structure databases', 'Homology'],
                  hint: 'If stuck, revisit Class 11 Biology Chapter "Biomolecules" (protein structure levels) and Class 12.',
                  misconception: 'Students often think PDB and CATH are interchangeable "structure databases" and that a PDB ID directly gives a CATH code.' }
          ],
            remediations: { 'pdb-and-cath-are-interchangeable': { steps: ['Have the student open the PDB entry for 1TIM (triose phosphate isomerase) and the corresponding CATH entries for its.', 'Ask them to list the chains in the PDB file (A and B) and then check how many CATH domains are assigned per chain.', 'Guide them to see that each chain is a single domain but CATH splits the barrel into two evolutionary units?', 'Actually, TIM barrel is one domain per chain.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_002', difficulty: 'standard',
          question: 'Primary structure analysis of proteins involves computational determination.',
          hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Chapter.',
          misconception: 'Students often confuse the instability index threshold: they think a higher instability index means more stable.',
          parts: [
                { id: 'a', prompt: 'Define isoelectric point (pI) of a protein and state its significance in protein purification by isoelectric focusing.', answer: 'Isoelectric point (pI) is the pH at',
                  options: ['Isoelectric point (pI) is the pH at', 'instability'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Chapter 2 (Acids.',
                  misconception: 'Students often confuse the instability index threshold: they think a higher instability index means more stable (because "instability".' },
                { id: 'b', prompt: 'A protein has a computed pI of 5.2. Explain whether this protein is acidic or basic, and predict its migration direction in an electric field at pH 7.0 during.', answer: 'The protein is acidic (pI < 7)',
                  options: ['The protein is acidic (pI < 7)', 'instability'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Chapter 2 (Acids.',
                  misconception: 'Students often confuse the instability index threshold: they think a higher instability index means more stable (because "instability".' },
                { id: 'c', prompt: 'Given the peptide sequence: Ala-Val-Ile-Leu (AVIL), and the Kyte-Doolittle hydropathy values: Ala=1.8, Val=4.2, Ile=4.5, Leu=3.8.', answer: 'GRAVY = (1.8 + 4.2 + 4.5 + 3.8) / 4 = 14.3 / 4 = 3.575',
                  options: ['GRAVY = (1.8 + 4.2 + 4.5 + 3.8) / 4 = 14.3 / 4 = 3.575', 'instability'],
                  hint: 'Review Class 10 Chemistry Chapter 4 (Carbon Compounds) for functional groups and Chapter 2 (Acids.',
                  misconception: 'Students often confuse the instability index threshold: they think a higher instability index means more stable (because "instability".' }
          ],
            remediations: { 'students-often-confuse-the-instability': { steps: ['Create a two-column table: Parameter | Physical Meaning | Threshold | Interpretation.', 'Fill it for all four indices.', 'For GRAVY, explicitly write: "Positive = hydrophobic (water-fearing), Negative = hydrophilic (water-loving)" and link.', 'For instability index, use the mnemonic: "Index > 40 = UNSTABLE (bad), Index < 40 = STABLE (good)".'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_003', difficulty: 'standard',
          question: 'Secondary structure prediction is the computational inference of local protein.',
          hint: 'Revisit c11_biotech_cbse_10_002 (primary structure analysis) to practice sequence.',
          misconception: 'Students often believe Chou-Fasman and GOR "predict 3D structure." In reality, both output only a one-dimensional.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary structure prediction is the computational inference of local protein',
                  options: ['Secondary structure prediction is the computational inference of local protein', 'Protein Structure Databases are curated repositories that store experimentally determined', 'Primary structure analysis of proteins involves computational determination of', 'Homology modelling is a computational method for predicting the three-dimensional'],
                  hint: 'Revisit c11_biotech_cbse_10_002 (primary structure analysis) to practice sequence handling and.',
                  misconception: 'Students often believe Chou-Fasman and GOR "predict 3D structure." In reality, both output only a one-dimensional string of H/E/C labels.' }
          ],
            remediations: { 'chou-fasman-and-gor-predict': { steps: ['Ask the student to write the DSSP one-letter codes for helix, sheet, coil.', 'Have them highlight every residue in a 15-mer sequence that has Pα > 1.00 and Pβ < 1.00.', 'Walk through the nucleation rule on that highlighted stretch: "Do we see 4 out of 6?', 'Yes → mark as helix nucleus." 4.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_004', difficulty: 'standard',
          question: 'Homology modelling is a computational method for predicting the.',
          hint: 'Revisit c11_biotech_cbse_10_001 (PDB database navigation and BLAST search) and.',
          misconception: 'Students often believe that **sequence identity percentage alone determines model quality**, ignoring alignment.',
          parts: [
                { id: 'a', prompt: 'You are given a target protein sequence of 250 residues. A BLAST search against PDB returns a template with 28% sequence identity over 180 aligned residues.', answer: 'No, a reliable *global* model cannot be built',
                  options: ['No, a reliable *global* model cannot be built', 'yes, because identity >25%'],
                  hint: 'Revisit c11_biotech_cbse_10_001 (PDB database navigation and BLAST search) and c10_bio_cbse_04_007.',
                  misconception: 'Students often believe that **sequence identity percentage alone determines model quality**, ignoring alignment coverage, template.' }
          ],
            remediations: { 'sequence-identity-percentage-alone-determines': { steps: ['If a student fixates on %identity: (1) Show two real cases from literature: Case A — 35% identity, 50% coverage, model.', '(2) Have them run a *thought experiment*: "If you only model the conserved core (50%), can you predict the function.', '(4) Assign a mini-task: Use SWISS-MODEL to build models for two templates with different identity/coverage trade-offs.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_005', difficulty: 'standard',
          question: 'Threading (fold recognition) is a computational method that aligns a target.',
          hint: 'Revisit the "twilight zone" (20–30% identity) and "midnight zone" (<20% identity).',
          misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails.',
          parts: [
                { id: 'a', prompt: 'A researcher has a 150-residue protein sequence with no significant BLAST hit against PDB (E-value > 0.01).', answer: 'Threading (fold recognition) should be attempted first',
                  options: ['Threading (fold recognition) should be attempted first', 'Plan B and Plan C'],
                  hint: 'Revisit the "twilight zone" (20–30% identity) and "midnight zone" (<20% identity) concepts.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' },
                { id: 'b', prompt: 'A protein sequence of 200 residues is submitted to a threading server (e.g., Threader).', answer: 'The TIM-barrel fold (Z-score 6.5) is more likely correct',
                  options: ['The TIM-barrel fold (Z-score 6.5) is more likely correct', 'Plan B and Plan C'],
                  hint: 'Revisit the "twilight zone" (20–30% identity) and "midnight zone" (<20% identity) concepts.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' },
                { id: 'c', prompt: 'Compare and contrast the computational cost (time/resources) and expected accuracy of threading versus ab initio modelling for a 100-residue protein.', answer: 'Threading is less compute-intensive (minutes to hours)',
                  options: ['Threading is less compute-intensive (minutes to hours)', 'Plan B and Plan C'],
                  hint: 'Revisit the "twilight zone" (20–30% identity) and "midnight zone" (<20% identity) concepts.',
                  misconception: 'Students often believe threading and ab initio modelling are simply "Plan B and Plan C" after homology modelling fails, without.' }
          ],
            remediations: { 'threading-and-ab-initio-modelling': { steps: ['Have the student draw the Fig. 10.1 flowchart from memory on a blank sheet.', 'Ask them to label each decision diamond with the specific bioinformatics tool (BLAST, Threader, QUARK) and the.', 'Give three 1-sentence scenarios (e.g., "25% identity to 2xyz_A", "No BLAST hit, Threader Z-score 7.2", "No hit in PDB.', 'Explicitly contrast "template-based" (homology, threading) vs "template-free" (ab initio) by asking: "In which method.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_006', difficulty: 'standard',
          question: 'The Ramachandran Plot is a two-dimensional scatter plot of the backbone.',
          hint: 'Revisit peptide bond resonance structure (c10_chem_cbse_04_001) and amino acid chirality.',
          misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that.',
          parts: [
                { id: 'a', prompt: 'A homology model of a 250-residue protein yields the following Ramachandran statistics from PROCHECK: 210 residues in most favored regions, 30 in additionally.', answer: 'Favored % = (210/250) × 100 = 84%',
                  options: ['Favored % = (210/250) × 100 = 84%', 'allowed region', 'thermodynamically favorable for that specific protein'],
                  hint: 'Revisit peptide bond resonance structure (c10_chem_cbse_04_001) and amino acid chirality.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein.".' },
                { id: 'b', prompt: 'Compare the Ramachandran plot signatures of an α-helix, a parallel β-sheet, and a left-handed α-helix (α_L).', answer: 'α-helix: φ≈-60°, ψ≈-45° (lower-left quadrant)',
                  options: ['α-helix: φ≈-60°, ψ≈-45° (lower-left quadrant)', 'disallowed', 'allowed region', 'thermodynamically favorable for that specific protein'],
                  hint: 'Revisit peptide bond resonance structure (c10_chem_cbse_04_001) and amino acid chirality.',
                  misconception: 'Students often believe that "allowed region" on a Ramachandran plot means "thermodynamically favorable for that specific protein.".' }
          ],
            remediations: { 'allowed-region-on-a-ramachandran': { steps: ['Have the student physically build a peptide backbone model (using molecular modeling kit or paper strips) for three.', 'Show a glycine vs. alanine Ramachandran plot side-by-side; ask the student to identify which atom (Cβ) causes the.', 'Give a deliberately flawed homology model (e.g., from a low-identity template) with good Ramachandran stats but bad.', 'Require the student to write a one-paragraph validation report for a PDB entry using all four metrics from Diagnostic.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
