import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch06_p2: SimDef = {
    id: 'v3_c12_bio_ch06_p2',
    title: 'Molecular Basis of Inheritance · Part 2/2',
    subtitle: 'A radioactive label settled biology\'s biggest argument: DNA is the instruction book.',
    classLevel: 12, subject: 'biology', topic: 'Molecular Basis of Inheritance · Part 2/2',
    chapters: ['c12_bio_ch06'],
    nodeIds: ['c12_bio_cbse_06_007', 'c12_bio_cbse_06_008', 'c12_bio_cbse_06_009', 'c12_bio_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Molecular biologist decoding genetic material', intro: 'Every gene edit and DNA test stands on two experiments and one elegant spiral staircase.', goal: 'Explain the evidence for DNA as genetic material and describe the double helix structure.' },
    discovery: {
        question: 'Your DNA is identical in every cell — yet a liver cell is nothing like a neuron. How?',
        options: ['Different genes are switched on in each cell type', 'Each cell type has different DNA sequences', 'Neurons lose their DNA after forming', 'Liver cells mutate faster'],
        answer: 'Different genes are switched on in each cell type',
        hook: 'Same book, different pages read. Unzip the helix and see which pairs make it possible.',
    },
    teaching: [
        { title: 'Translation: Protein Synthesis', text: 'Translation is the biological process where the genetic information encoded in messenger RNA (mRNA) is decoded by ribosomes to synthesize a specific polypeptide chain, using transfer RNA (tRNA).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_06_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Unzip the helix past 70% — which pairs break first?',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_007', title: 'Translation: Protein Synthesis',
          caseStudy: { intro: 'Imagine you order a custom protein shake at a gym café — you read the menu (mRNA), the barista (ribosome) assembles ingredients (amino acids) brought.',
            decisions: [{ prompt: 'What is the function of the Shine-Dalgarno sequence in prokaryotic translation initiation?', options: [
                { text: 'The Shine-Dalgarno sequence (AGGAGG) is a ribosome-binding site upstream of the start', outcome: 'The Shine-Dalgarno sequence (AGGAGG) is a ribosome-binding site upstream of the start codon.' },
                { text: 'it codes for methionine', outcome: 'Not quite — Students believe the ribosome "reads" mRNA like a tape recorder moving linearly, and that tRNAs.', reveals: 'the-ribosome-reads-mrna-like' },
                { text: 'it is the start codon', outcome: 'Not quite — Students believe the ribosome "reads" mRNA like a tape recorder moving linearly, and that tRNAs.', reveals: 'the-ribosome-reads-mrna-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_008', title: 'Regulation of Gene Expression: Lac Operon',
          caseStudy: { intro: 'Imagine you eat a bowl of kheer (rice pudding with milk) — your gut bacteria suddenly encounter lactose but no glucose. Within minutes, *E.',
            decisions: [{ prompt: 'Name the three structural genes of the lac operon and the specific enzyme each encodes.', options: [
                { text: 'Correct: lacZ encodes β-galactosidase (cleaves lactose to glucose + galactose), lacY', outcome: 'Correct: lacZ encodes β-galactosidase (cleaves lactose to glucose + galactose), lacY encodes.' },
                { text: 'lacZ makes permease', outcome: 'Not quite — Students believe glucose directly binds the lac repressor to turn off the operon, or that.', reveals: 'glucose-directly-binds-the-lac' },
                { text: 'catabolite repression', outcome: 'Not quite — Students believe glucose directly binds the lac repressor to turn off the operon, or that.', reveals: 'glucose-directly-binds-the-lac' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_009', title: 'Human Genome Project: Goals and Significance',
          caseStudy: { intro: 'Think about how a doctor today can order a genetic test to check if you carry a mutation for thalassemia or breast cancer risk — that test exists because.',
            decisions: [{ prompt: 'State the five primary goals of the Human Genome Project as defined at its inception in 1990.', options: [
                { text: 'The five goals were: (1) Identify all ~20,000–25,000 human genes', outcome: 'The five goals were: (1) Identify all ~20,000–25,000 human genes; (2) Determine the sequence of the.' },
                { text: 'Which was NOT a goal?', outcome: 'Not quite — Students believe the Human Genome Project "sequenced one person\'s DNA" and that the reference.', reveals: 'the-human-genome-project-sequenced' },
                { text: 'sequenced one person\'s DNA', outcome: 'Not quite — Students believe the Human Genome Project "sequenced one person\'s DNA" and that the reference.', reveals: 'the-human-genome-project-sequenced' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_010', title: 'DNA Fingerprinting: Technique and Applications',
          scaffold: { problem: 'A forensic scientist analyses a blood stain from a crime scene. The DNA is degraded.',
            steps: [
            { text: 'Identify that each locus is heterozygous (two different alleles) because the suspect’s profile shows two bands per.' },
            { text: 'For each heterozygous locus, the genotype frequency under HWE is 2 * p * q.' },
            { text: 'Multiply the 13 genotype frequencies together to get the combined RMP.' },
            { text: 'Compute: e.g., locus1: 2*0.12*0.08 = 0.0192; locus2: 2*0.15*0.10 = 0.03; locus3: 2*0.09*0.11 = 0.0198; ...' },
            { text: 'The product is an extremely small number (e.g., ~1 in 10^15). Conclude that the chance of a random unrelated individual.', faded: true, blankAnswer: 'RMP ≈ 1.2 × 10⁻¹⁵ (example value). Interpretation: The.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Molecular Basis of Inheritance · Part 2/2', spots: [
            { id: 's1', label: 'Translation Protein Synthesis', prompt: 'Which idea is this? — Translation is the biological process where the genetic information encoded in messenger.', answer: 'Translation Protein Synthesis', options: ['Translation Protein Synthesis', 'Regulation of Gene Expression Lac Operon', 'Human Genome Project Goals and Significance', 'DNA Fingerprinting Technique and Applications'] },
            { id: 's2', label: 'Regulation of Gene Expression Lac Operon', prompt: 'Which idea is this? — The lac operon is an inducible prokaryotic gene regulation system in *E.', answer: 'Regulation of Gene Expression Lac Operon', options: ['Regulation of Gene Expression Lac Operon', 'Translation Protein Synthesis', 'Human Genome Project Goals and Significance', 'DNA Fingerprinting Technique and Applications'] },
            { id: 's3', label: 'Human Genome Project Goals and Significance', prompt: 'Which idea is this? — The Human Genome Project (HGP) was an international scientific research project.', answer: 'Human Genome Project Goals and Significance', options: ['Human Genome Project Goals and Significance', 'Translation Protein Synthesis', 'Regulation of Gene Expression Lac Operon', 'DNA Fingerprinting Technique and Applications'] },
            { id: 's4', label: 'DNA Fingerprinting Technique and Applications', prompt: 'Which idea is this? — DNA fingerprinting is a molecular technique that identifies individuals by detecting.', answer: 'DNA Fingerprinting Technique and Applications', options: ['DNA Fingerprinting Technique and Applications', 'Translation Protein Synthesis', 'Regulation of Gene Expression Lac Operon', 'Human Genome Project Goals and Significance'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-fair poster on \'How we know DNA is the genetic material\', a student credits the 1928 Griffith mouse experiment: \'Griffith proved DNA carries heredity.\' The teacher asks her to defend or correct the caption.',
            decisions: [{ prompt: 'Is the caption right?', options: [
                { text: 'Fix it — Griffith showed only that a \'transforming principle\' passes from dead S-strain to live R-strain bacteria; Hershey and Chase identified it as DNA in 1952 using ³²P and ³⁵S isotopes.', outcome: 'The two experiments answer different questions: transformation exists vs which molecule does it — the poster needs both names, correctly credited.' },
                { text: 'It\'s right — Griffith\'s heat-killed extract transformed bacteria, so he proved DNA is genetic material.', outcome: 'Griffith never identified the chemical nature of the principle; both DNA and denatured protein sat in that extract — chemical proof came later.', reveals: 'griffith-proved-dna' },
                { text: 'Fix it differently — Hershey and Chase\'s blender is what pushed phage DNA into the bacteria.', outcome: 'The blender only sheared off empty protein coats after infection; DNA had already entered — misreading the apparatus repeats the error in reverse.', reveals: 'blender-injects-dna' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'Replication, transcription, translation — the molecule that makes you, you. This is the chapter biology was building toward since class 6.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_007', difficulty: 'standard',
          question: 'Translation is the biological process where the genetic information encoded.',
          hint: 'If stuck on codon-anticodon pairing, review c12_bio_cbse_06_006 (Genetic Code: Wobble.',
          misconception: 'Students believe the ribosome "reads" mRNA like a tape recorder moving linearly, and that tRNAs simply "drop off" amino.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Translation is the biological process where the genetic information encoded in messenger',
                  options: ['Translation is the biological process where the genetic information encoded in messenger', 'Griffith\'s experiment (1928) demonstrated bacterial transformation using Streptococcus', 'The Watson-Crick double helix model describes DNA as two antiparallel polynucleotide', 'DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA around'],
                  hint: 'If stuck on codon-anticodon pairing, review c12_bio_cbse_06_006 (Genetic Code: Wobble Hypothesis).',
                  misconception: 'Students believe the ribosome "reads" mRNA like a tape recorder moving linearly, and that tRNAs simply "drop off" amino acids.' }
          ],
            remediations: { 'the-ribosome-reads-mrna-like': { steps: ['Revisit c11_biotech_cbse_07_007 (Translation: Initiation, Elongation, Termination) and c11_biotech_cbse_07_008 (Role.', 'Build a physical model using paper cutouts: large/small subunits, mRNA strip, tRNA cards with anticodons/amino acids.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4. If still stuck, review c11_bio_cbse_09_002 (Proteins: Amino.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the ribosome "reads" mRNA like a tape recorder moving linearly, and that tRNAs simply "drop off" amino.',
          parts: [
                { id: 'a', prompt: 'A researcher treats a eukaryotic cell-free translation system with a drug that prevents eIF2α phosphorylation.', answer: 'Preventing eIF2α phosphorylation blocks the integrated stress response (ISR)',
                  options: ['Preventing eIF2α phosphorylation blocks the integrated stress response (ISR)', 'both decrease', 'global increases, HSP70 increases', 'mRNA like a tape recorder moving linearly, and that tRNAs simply'],
                  hint: 'If stuck on codon-anticodon pairing, review c12_bio_cbse_06_006 (Genetic Code: Wobble Hypothesis).',
                  misconception: 'Students believe the ribosome "reads" mRNA like a tape recorder moving linearly, and that tRNAs simply "drop off" amino acids.' }
          ],
            remediations: { 'the-ribosome-reads-mrna-like': { steps: ['Revisit c11_biotech_cbse_07_007 (Translation: Initiation, Elongation, Termination) and c11_biotech_cbse_07_008 (Role.', 'Build a physical model using paper cutouts: large/small subunits, mRNA strip, tRNA cards with anticodons/amino acids.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4. If still stuck, review c11_bio_cbse_09_002 (Proteins: Amino.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_008', difficulty: 'standard',
          question: 'The lac operon is an inducible prokaryotic gene regulation system in *E.',
          hint: 'If stuck on CAP-cAMP mechanism, revisit c11_biotech_cbse_04_008 (Allosteric Regulation).',
          misconception: 'Students believe glucose directly binds the lac repressor to turn off the operon, or that "catabolite repression" means.',
          parts: [
                { id: 'a', prompt: 'Explain why the lac repressor protein binds to the operator in the absence of lactose but releases when allolactose is present.', answer: 'Correct: The lacI gene product (repressor) has two domains',
                  options: ['Correct: The lacI gene product (repressor) has two domains', 'lactose binds repressor directly', 'repressor degrades', 'lactose'],
                  hint: 'If stuck on CAP-cAMP mechanism, revisit c11_biotech_cbse_04_008 (Allosteric Regulation) and.',
                  misconception: 'Students believe glucose directly binds the lac repressor to turn off the operon, or that "catabolite repression" means glucose represses.' },
                { id: 'b', prompt: 'Predict the relative expression level of lac genes (high/low/zero) in *E.', answer: 'Correct: (a) Glucose only: LOW',
                  options: ['Correct: (a) Glucose only: LOW', 'lactose present = operon ON', 'catabolite repression', '"lactose present = operon ON" ignoring glucose override'],
                  hint: 'If stuck on CAP-cAMP mechanism, revisit c11_biotech_cbse_04_008 (Allosteric Regulation) and.',
                  misconception: 'Students believe glucose directly binds the lac repressor to turn off the operon, or that "catabolite repression" means glucose represses.' }
          ],
            remediations: { 'glucose-directly-binds-the-lac': { steps: ['Revisit c11_biotech_cbse_07_010 (Class 11 Biotech Lac Operon) — watch the animation of CAP-cAMP binding upstream and.', 'Draw the four metabolic conditions as a 2×2 table (Glucose ±, Lactose ±) and write the molecular state (repressor.', 'Perform the "inducer exclusion" thought experiment: add lactose to glucose-grown cells — permease brings in lactose.', 'Re-attempt Diagnostic Question 3. If still wrong, review c11_bio_cbse_09_005 (Enzyme allosteric regulation) for.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_009', difficulty: 'standard',
          question: 'The Human Genome Project (HGP) was an international scientific research project.',
          hint: 'If stuck, review the Sanger sequencing steps in c11_biotech_cbse_12_010 and the.',
          misconception: 'Students believe the Human Genome Project "sequenced one person\'s DNA" and that the reference genome represents.',
          parts: [
                { id: 'a', prompt: 'State the five primary goals of the Human Genome Project as defined at its inception in 1990.', answer: 'The five goals were: (1) Identify all ~20,000–25,000 human genes',
                  options: ['The five goals were: (1) Identify all ~20,000–25,000 human genes', 'Which was NOT a goal?', 'sequenced one person\'s DNA', 'normal'],
                  hint: 'If stuck, review the Sanger sequencing steps in c11_biotech_cbse_12_010 and the definition of.',
                  misconception: 'Students believe the Human Genome Project "sequenced one person\'s DNA" and that the reference genome represents a single individual.' },
                { id: 'b', prompt: 'A researcher sequences a 150 kb human genomic region and finds it contains 4 genes, 3 pseudogenes, and 45% repetitive DNA.', answer: 'Gene density = 4 genes / 0.15 Mb = 26.7 genes/Mb',
                  options: ['Gene density = 4 genes / 0.15 Mb = 26.7 genes/Mb', 'sequenced one person\'s DNA', 'normal'],
                  hint: 'If stuck, review the Sanger sequencing steps in c11_biotech_cbse_12_010 and the definition of.',
                  misconception: 'Students believe the Human Genome Project "sequenced one person\'s DNA" and that the reference genome represents a single individual.' },
                { id: 'c', prompt: 'Compare the HGP finding that "less than 2% of the human genome codes for proteins" with the earlier estimate that humans have ~100,000 genes.', answer: 'HGP revealed ~20,000 protein-coding genes, not 100,000',
                  options: ['HGP revealed ~20,000 protein-coding genes, not 100,000', 'non-coding DNA is junk', 'each gene makes one protein', 'sequenced one person\'s DNA'],
                  hint: 'If stuck, review the Sanger sequencing steps in c11_biotech_cbse_12_010 and the definition of.',
                  misconception: 'Students believe the Human Genome Project "sequenced one person\'s DNA" and that the reference genome represents a single individual.' }
          ],
            remediations: { 'the-human-genome-project-sequenced': { steps: ['Revisit c12_bio_cbse_06_001 (DNA as genetic material) and c12_bio_cbse_06_002 (DNA structure) to recall that DNA.', 'Then review c11_biotech_cbse_12_010 (DNA Sequencing: Sanger and NGS) to understand that sequencing produces reads, not.', 'Finally, study the "Salient Features of Human Genome" table in NCERT (page 115, 2023 edition) and make a 3-column.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_010', difficulty: 'standard',
          question: 'DNA fingerprinting is a molecular technique that identifies individuals.',
          hint: 'If stuck, review restriction enzyme recognition sites and gel electrophoresis separation.',
          misconception: 'Students often think DNA fingerprinting examines the entire genome sequence or looks at genes that code for traits.',
          parts: [
                { id: 'a', prompt: 'What type of DNA sequences are primarily targeted in classical DNA fingerprinting using Southern blotting, and why are they suitable for individual.', answer: 'Classical DNA fingerprinting targets Variable Number Tandem Repeats (VNTRs)',
                  options: ['Classical DNA fingerprinting targets Variable Number Tandem Repeats (VNTRs)', 'coding genes', 'single nucleotide polymorphisms'],
                  hint: 'If stuck, review restriction enzyme recognition sites and gel electrophoresis separation principle.',
                  misconception: 'Students often think DNA fingerprinting examines the entire genome sequence or looks at genes that code for traits.' },
                { id: 'b', prompt: 'Why is Southern blotting followed by hybridisation with a labelled probe necessary after gel electrophoresis in VNTR‑based fingerprinting?', answer: 'Ethidium bromide stains all DNA fragments, producing a smear',
                  options: ['Ethidium bromide stains all DNA fragments, producing a smear', 'staining is enough'],
                  hint: 'If stuck, review restriction enzyme recognition sites and gel electrophoresis separation principle.',
                  misconception: 'Students often think DNA fingerprinting examines the entire genome sequence or looks at genes that code for traits.' }
          ],
            remediations: { 'dna-fingerprinting-examines-the-entire': { steps: ['Revisit the concept of repetitive DNA (satellites, minisatellites, microsatellites) from node c12_bio_cbse_06_002 (DNA.', 'Review Southern blotting steps in c11_biotech_cbse_12_009 (Southern, Northern, Western Blotting).', 'Practice interpreting band patterns with a worksheet: given parental and child profiles, determine inclusion/exclusion.', 'Watch a 5‑minute animation of PCR‑based STR profiling (e.g., from NCERT’s e‑pathshala) to contrast with Southern blot.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
