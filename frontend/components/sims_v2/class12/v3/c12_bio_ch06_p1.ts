import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch06_p1: SimDef = {
    id: 'v3_c12_bio_ch06_p1',
    title: 'Molecular Basis of Inheritance · Part 1/2',
    subtitle: 'A radioactive label settled biology\'s biggest argument: DNA is the instruction book.',
    classLevel: 12, subject: 'biology', topic: 'Molecular Basis of Inheritance · Part 1/2',
    chapters: ['c12_bio_ch06'],
    nodeIds: ['c12_bio_cbse_06_001', 'c12_bio_cbse_06_002', 'c12_bio_cbse_06_003', 'c12_bio_cbse_06_004', 'c12_bio_cbse_06_005', 'c12_bio_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Molecular biologist decoding genetic material', intro: 'Every gene edit and DNA test stands on two experiments and one elegant spiral staircase.', goal: 'Explain the evidence for DNA as genetic material and describe the double helix structure.' },
    discovery: {
        question: 'Your DNA is identical in every cell — yet a liver cell is nothing like a neuron. How?',
        options: ['Different genes are switched on in each cell type', 'Each cell type has different DNA sequences', 'Neurons lose their DNA after forming', 'Liver cells mutate faster'],
        answer: 'Different genes are switched on in each cell type',
        hook: 'Same book, different pages read. Unzip the helix and see which pairs make it possible.',
    },
    teaching: [
        { title: 'DNA as Genetic Material: Griffith\'s and Hershey-Chase Experiments', text: 'Griffith\'s experiment (1928) demonstrated bacterial transformation using Streptococcus pneumoniae, showing that a "transforming principle" from heat-killed virulent smooth (S) strain could convert.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_06_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Unzip the helix past 70% — which pairs break first?',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_001', title: 'DNA as Genetic Material: Griffith\'s and Hershey-Chase Experiments',
          caseStudy: { intro: 'Imagine a patient in a Delhi hospital with pneumonia caused by Streptococcus pneumoniae.',
            decisions: [{ prompt: 'In Griffith\'s experiment, which combination of bacterial strains injected into mice resulted in mouse death AND recovery of live smooth (S).', options: [
                { text: 'Correct answer: Heat-killed S strain + live R strain', outcome: 'Correct answer: Heat-killed S strain + live R strain. A wrong answer (e.g., live S strain alone,.' },
                { text: 'sheared off', outcome: 'Not quite — Students often think Griffith\'s experiment proved DNA is the genetic material.', reveals: 'griffith-s-experiment-proved-dna' },
                { text: 'Griffith\'s experiment proved DNA is the genetic material', outcome: 'Not quite — Students often think Griffith\'s experiment proved DNA is the genetic material.', reveals: 'griffith-s-experiment-proved-dna' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_002', title: 'DNA Structure: Double Helix Model (Watson-Crick)',
          scaffold: { problem: 'A 5000 bp viral DNA has 22% adenine. Calculate the number of cytosine residues, the total hydrogen bonds in the double helix, and the.',
            steps: [
            { text: 'Apply Chargaff\'s rules: %A = %T = 22% → %A+%T = 44% → %G+%C = 56% → %G = %C = 28%.' },
            { text: 'Number of C residues = 28% of 5000 bp = 0.28 × 5000 = 1400 cytosines (per strand?' },
            { text: 'Count H-bonds: A-T pairs = 22% of 5000 = 1100 pairs × 2 H-bonds = 2200.' },
            { text: 'Calculate Tm: %GC = 56. Tm = 69.3 + 0.41×56 - 650/5000 = 69.3 + 22.96 - 0.13 = 92.13 °C.' },
            { text: 'Verify: High GC → high Tm, consistent.', faded: true, blankAnswer: 'Cytosine residues per strand = 1400 (total 2800); Total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_003', title: 'DNA Packaging in Eukaryotes: Nucleosomes and Chromatin',
          scaffold: { problem: 'Human diploid genome has ~6.4 × 10^9 base pairs. Calculate the total length of DNA in a human cell nucleus.',
            steps: [
            { text: 'Calculate total DNA length = total bp × rise per bp = 6.4 × 10^9 bp × 0.34 nm/bp = 2.176 × 10^9 nm = 2.176 meters.' },
            { text: 'Calculate number of nucleosomes = total bp / repeat length = 6.4 × 10^9 bp / 200 bp per nucleosome = 3.2 × 10^7.' },
            { text: 'Calculate 10 nm fiber length. Each nucleosome (core + linker) corresponds to 200 bp = 68 nm of DNA.' },
            { text: 'Verify compaction: 2.176 m DNA → 0.352 m fiber = 6.18-fold compaction. Matches the expected ~6-fold for 10 nm fiber.' },
            { text: 'Conclusion: The 10 nm fiber reduces 2.2 meters to ~35 cm — still too long for the nucleus, necessitating higher-order.', faded: true, blankAnswer: 'Total DNA length ≈ 2.18 meters. Total nucleosomes ≈ 32.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_004', title: 'DNA Replication: Semi-Conservative Model',
          caseStudy: { intro: 'Imagine you photocopy a double-sided ID card: you get two copies, each with one original side and one new printed side. That\'s semi-conservative replication.',
            decisions: [{ prompt: 'State the semi-conservative model of DNA replication in one sentence.', options: [
                { text: 'Correct answer: Each daughter DNA molecule consists of one parental (original) strand and', outcome: 'Correct answer: Each daughter DNA molecule consists of one parental (original) strand and one newly.' },
                { text: 'both strands are new', outcome: 'Not quite — Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive.', reveals: 'semi-conservative-means-each-strand' },
                { text: 'each strand is a mix of old and new', outcome: 'Not quite — Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive.', reveals: 'semi-conservative-means-each-strand' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_005', title: 'Transcription: RNA Synthesis from DNA',
          caseStudy: { intro: 'Think about how a recipe book (DNA) in a library nucleus cannot leave the room, but you need the instructions in the kitchen (cytoplasm) to cook a meal.',
            decisions: [{ prompt: 'Define transcription and state which DNA strand serves as the template.', options: [
                { text: 'Transcription is the synthesis of RNA from a DNA template', outcome: 'Transcription is the synthesis of RNA from a DNA template. The template strand (non-coding strand.' },
                { text: 'coding strand is template', outcome: 'Not quite — Students often think: "RNA polymerase reads the coding strand because it has the same sequence.', reveals: 'rna-polymerase-reads-the-coding' },
                { text: 'RNA made 3\'→5\'', outcome: 'Not quite — Students often think: "RNA polymerase reads the coding strand because it has the same sequence.', reveals: 'rna-polymerase-reads-the-coding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_006', title: 'Genetic Code: Codons and Wobble Hypothesis',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message written in a language where every word is exactly three letters long, there are no spaces, and the same word can mean.',
            decisions: [{ prompt: 'How many different codons exist in the standard genetic code, and how many of them code for amino acids (sense codons) versus signal.', options: [
                { text: 'There are 64 codons (4³)', outcome: 'There are 64 codons (4³). 61 are sense codons specifying amino acids; 3 (UAA, UAG, UGA) are stop.' },
                { text: 'wobble means the third base of the codon doesn\'t matter at all', outcome: 'Not quite — Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write.', reveals: 'wobble-means-the-third-base' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Molecular Basis of Inheritance · Part 1/2', spots: [
            { id: 's1', label: 'DNA Structure Double Helix Model Watson-Crick', prompt: 'Which idea is this? — The Watson-Crick double helix model describes DNA as two antiparallel polynucleotide.', answer: 'DNA Structure Double Helix Model Watson-Crick', options: ['DNA Structure Double Helix Model Watson-Crick', 'DNA Packaging in Eukaryotes Nucleosomes and Chromatin', 'DNA Replication Semi-Conservative Model', 'Transcription RNA Synthesis from DNA'] },
            { id: 's2', label: 'DNA Packaging in Eukaryotes Nucleosomes and Chromatin', prompt: 'Which idea is this? — DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA around.', answer: 'DNA Packaging in Eukaryotes Nucleosomes and Chromatin', options: ['DNA Packaging in Eukaryotes Nucleosomes and Chromatin', 'DNA Structure Double Helix Model Watson-Crick', 'DNA Replication Semi-Conservative Model', 'Transcription RNA Synthesis from DNA'] },
            { id: 's3', label: 'DNA Replication Semi-Conservative Model', prompt: 'Which idea is this? — DNA replication is the biological process by which a double-stranded DNA molecule.', answer: 'DNA Replication Semi-Conservative Model', options: ['DNA Replication Semi-Conservative Model', 'DNA Structure Double Helix Model Watson-Crick', 'DNA Packaging in Eukaryotes Nucleosomes and Chromatin', 'Transcription RNA Synthesis from DNA'] },
            { id: 's4', label: 'Transcription RNA Synthesis from DNA', prompt: 'Which idea is this? — Transcription is the biological process where a specific segment of DNA (a gene).', answer: 'Transcription RNA Synthesis from DNA', options: ['Transcription RNA Synthesis from DNA', 'DNA Structure Double Helix Model Watson-Crick', 'DNA Packaging in Eukaryotes Nucleosomes and Chromatin', 'DNA Replication Semi-Conservative Model'] },
            { id: 's5', label: 'Genetic Code Codons and Wobble Hypothesis', prompt: 'Which idea is this? — The genetic code is the set of rules by which information encoded in mRNA sequences.', answer: 'Genetic Code Codons and Wobble Hypothesis', options: ['Genetic Code Codons and Wobble Hypothesis', 'DNA Structure Double Helix Model Watson-Crick', 'DNA Packaging in Eukaryotes Nucleosomes and Chromatin', 'DNA Replication Semi-Conservative Model'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-fair poster on \'How we know DNA is the genetic material\', a student credits the 1928 Griffith mouse experiment: \'Griffith proved DNA carries heredity.\' The teacher asks her to defend or correct the caption.',
            decisions: [{ prompt: 'Is the caption right?', options: [
                { text: 'Fix it — Griffith showed only that a \'transforming principle\' passes from dead S-strain to live R-strain bacteria; Hershey and Chase identified it as DNA in 1952 using ³²P and ³⁵S isotopes.', outcome: 'The two experiments answer different questions: transformation exists vs which molecule does it — the poster needs both names, correctly credited.' },
                { text: 'It\'s right — Griffith\'s heat-killed extract transformed bacteria, so he proved DNA is genetic material.', outcome: 'Griffith never identified the chemical nature of the principle; both DNA and denatured protein sat in that extract — chemical proof came later.', reveals: 'griffith-proved-dna' },
                { text: 'Fix it differently — Hershey and Chase\'s blender is what pushed phage DNA into the bacteria.', outcome: 'The blender only sheared off empty protein coats after infection; DNA had already entered — misreading the apparatus repeats the error in reverse.', reveals: 'blender-injects-dna' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Replication, transcription, translation — the molecule that makes you, you. This is the chapter biology was building toward since class 6.',
            decisions: [{ prompt: 'What comes next? Molecular Basis of Inheritance · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Molecular Basis of Inheritance · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_001', difficulty: 'standard',
          question: 'Griffith\'s experiment (1928) demonstrated bacterial transformation using.',
          hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) for.',
          misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.',
          parts: [
                { id: 'a', prompt: 'In Griffith\'s experiment, which combination of bacterial strains injected into mice resulted in mouse death AND recovery of live smooth (S) bacteria from the.', answer: 'Correct answer: Heat-killed S strain + live R strain',
                  options: ['Correct answer: Heat-killed S strain + live R strain', 'sheared off', 'Griffith\'s experiment proved DNA is the genetic material'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) for elemental.',
                  misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.' }
          ],
            remediations: { 'griffith-s-experiment-proved-dna': { steps: ['Re-watch the animation of Griffith\'s experiment (available on NCERT e-pathshala) focusing on the four injection groups.', 'Draw a flowchart of Hershey-Chase: label phage with ³²P → infect E.', 'coli → blend → centrifuge → measure radioactivity in pellet vs supernatant.', 'Write a one-sentence conclusion for each experiment.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If Hershey-Chase had used ³²P-labeled protein and ³⁵S-labeled DNA, they would have reached the same conclusion." Is this true.', answer: 'Correct answer: False',
                  options: ['Correct answer: False', 'True, isotopes are interchangeable', 'sheared off', 'Griffith\'s experiment proved DNA is the genetic material'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) for elemental.',
                  misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.' }
          ],
            remediations: { 'griffith-s-experiment-proved-dna': { steps: ['Re-watch the animation of Griffith\'s experiment (available on NCERT e-pathshala) focusing on the four injection groups.', 'Draw a flowchart of Hershey-Chase: label phage with ³²P → infect E.', 'coli → blend → centrifuge → measure radioactivity in pellet vs supernatant.', 'Write a one-sentence conclusion for each experiment.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_002', difficulty: 'standard',
          question: 'The Watson-Crick double helix model describes DNA as two antiparallel.',
          hint: 'Review c11_biotech_cbse_03_008 for nucleotide chemistry and c11_bio_cbse_09_004 for base.',
          misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that.',
          parts: [
                { id: 'a', prompt: 'State the two key experimental evidences that Watson and Crick used to deduce the double helical structure of DNA, and the specific conclusion each provided.', answer: 'Correct answer: (1) Chargaff\'s rules',
                  options: ['Correct answer: (1) Chargaff\'s rules', 'hydrogen bonds between bases are the main force holding the two strands together', 'breaking H-bonds requires high temperature'],
                  hint: 'Review c11_biotech_cbse_03_008 for nucleotide chemistry and c11_bio_cbse_09_004 for base pairing.',
                  misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that "breaking H-bonds requires.' },
                { id: 'b', prompt: 'A DNA sample from a thermophilic bacterium has 65% GC content.', answer: 'Correct answer: GC = 65% → G = 32.5%, C = 32.5%',
                  options: ['Correct answer: GC = 65% → G = 32.5%, C = 32.5%', 'hydrogen bonds between bases are the main force holding the two strands together', 'breaking H-bonds requires high temperature'],
                  hint: 'Review c11_biotech_cbse_03_008 for nucleotide chemistry and c11_bio_cbse_09_004 for base pairing.',
                  misconception: 'Students often think "hydrogen bonds between bases are the main force holding the two strands together" and that "breaking H-bonds requires.' }
          ],
            remediations: { 'hydrogen-bonds-between-bases-are': { steps: ['Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) to review base structures and glycosidic bond.', 'Use a physical model or 3D animation to visualize antiparallel strands and groove formation.', 'Perform a paper exercise: write a 10-base sequence, draw its complement with 5\'/3\' labels, count H-bonds.', 'Re-attempt Diagnostic Q2 and Q4.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_003', difficulty: 'standard',
          question: 'DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA.',
          hint: 'If stuck, review DNA charge and dimensions (c12_bio_cbse_06_002) and the definition.',
          misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.',
          parts: [
                { id: 'a', prompt: 'Compare the 10 nm "beads-on-a-string" fiber and the 30 nm solenoid fiber in terms of: (a) histone composition, (b) compaction ratio, and (c) transcriptional.', answer: 'histone composition, (',
                  options: ['histone composition, (', '30 nm fiber has different core histones', 'both are equally accessible', 'nucleosomes are fixed "beads" permanently glued to specific DNA sequences'],
                  hint: 'If stuck, review DNA charge and dimensions (c12_bio_cbse_06_002) and the definition of chromatin.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' }
          ],
            remediations: { 'nucleosomes-are-fixed-beads-permanently': { steps: ['If the student holds the static-beads misconception: Step 1 — Revisit c12_bio_cbse_06_002 (DNA structure) to recall DNA.', 'Step 2 — Watch a 2-minute animation of nucleosome sliding/remodeling (e.g., HHMI BioInteractive "Chromatin Remodeling").', 'Step 3 — Do a hands-on activity: wrap a rubber band (DNA) around a spool (histone core), then twist/pull to show how.', 'Step 4 — Re-attempt Diagnostic Question 6 (design experiment) — now they should propose FRAP or remodeler recruitment.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_004', difficulty: 'standard',
          question: 'DNA replication is the biological process by which a double-stranded DNA.',
          hint: 'If unable to draw the anti-parallel duplex with correct polarity, revisit.',
          misconception: 'Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive model).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'DNA replication is the biological process by which a double-stranded DNA molecule is',
                  options: ['DNA replication is the biological process by which a double-stranded DNA molecule is', 'Griffith\'s experiment (1928) demonstrated bacterial transformation using Streptococcus', 'The Watson-Crick double helix model describes DNA as two antiparallel polynucleotide', 'DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA around'],
                  hint: 'If unable to draw the anti-parallel duplex with correct polarity, revisit c12_bio_cbse_06_002 and.',
                  misconception: 'Students think "semi-conservative" means each strand is half old and half new (i.e., the dispersive model).' }
          ],
            remediations: { 'semi-conservative-means-each-strand': { steps: ['Revisit c12_bio_cbse_06_002 (DNA Structure) — physically separate a paper model of double helix into two strands; label.', 'Re-watch the Meselson-Stahl animation (NCERT QR code) focusing on band positions after each generation.', 'Do a pencil-and-paper simulation: draw a heavy double helix, replicate in light medium for 3 generations, color-code.', 'Re-attempt Diagnostic Questions 3 and 5. If still confused, ask teacher for a physical model demonstration.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_005', difficulty: 'standard',
          question: 'Transcription is the biological process where a specific segment of DNA (a.',
          hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids) for base pairing and strand.',
          misconception: 'Students often think: "RNA polymerase reads the coding strand because it has the same sequence as mRNA." The correct.',
          parts: [
                { id: 'a', prompt: 'Define transcription and state which DNA strand serves as the template. What is the direction of RNA synthesis relative to the template strand?', answer: 'Transcription is the synthesis of RNA from a DNA template',
                  options: ['Transcription is the synthesis of RNA from a DNA template', 'coding strand is template', 'RNA made 3\'→5\'', 'RNA polymerase reads the coding strand'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids) for base pairing and strand polarity, and.',
                  misconception: 'Students often think: "RNA polymerase reads the coding strand because it has the same sequence as mRNA." The correct reasoning: RNA.' },
                { id: 'b', prompt: 'In prokaryotes, the RNA polymerase holoenzyme consists of core enzyme (α₂ββ\'ω) and a sigma (σ) factor.', answer: 'The sigma factor provides promoter specificity',
                  options: ['The sigma factor provides promoter specificity', 'sigma factor catalyzes elongation', 'sigma stays throughout', 'RNA polymerase reads the coding strand'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids) for base pairing and strand polarity, and.',
                  misconception: 'Students often think: "RNA polymerase reads the coding strand because it has the same sequence as mRNA." The correct reasoning: RNA.' },
                { id: 'c', prompt: 'A eukaryotic gene has the sequence 5\'-ATG GCT TAA-3\' on its coding strand. Write the sequence of the mature mRNA produced after transcription and processing.', answer: 'Template strand: 3\'-TAC CGA ATT-5\'',
                  options: ['Template strand: 3\'-TAC CGA ATT-5\'', 'RNA polymerase reads the coding strand'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids) for base pairing and strand polarity, and.',
                  misconception: 'Students often think: "RNA polymerase reads the coding strand because it has the same sequence as mRNA." The correct reasoning: RNA.' }
          ],
            remediations: { 'rna-polymerase-reads-the-coding': { steps: ['Revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) to relearn base-pairing rules, strand polarity, and.', 'Review c11_biotech_cbse_07_002 (Transcription: Initiation, Elongation, Termination) for the basic three-stage framework.', 'Practice writing template→mRNA sequences for 5 random gene segments (give coding strand, student writes template and.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_006', difficulty: 'standard',
          question: 'The genetic code is the set of rules by which information encoded in mRNA.',
          hint: 'If stuck, review transcription (c12_bio_cbse_06_005) to practice DNA→mRNA conversion, and.',
          misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base.',
          parts: [
                { id: 'a', prompt: 'How many different codons exist in the standard genetic code, and how many of them code for amino acids (sense codons) versus signal termination (stop codons)?', answer: 'There are 64 codons (4³)',
                  options: ['There are 64 codons (4³)', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'If stuck, review transcription (c12_bio_cbse_06_005) to practice DNA→mRNA conversion, and Class 11.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' },
                { id: 'b', prompt: 'The genetic code is described as "degenerate." Explain what this means and give a concrete example using the amino acid leucine.', answer: 'Degeneracy means most amino acids are specified by more than one codon',
                  options: ['Degeneracy means most amino acids are specified by more than one codon', 'degenerate means the code is broken', 'each codon codes for multiple amino acids', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'If stuck, review transcription (c12_bio_cbse_06_005) to practice DNA→mRNA conversion, and Class 11.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' },
                { id: 'c', prompt: 'Compare the genetic code properties "non-overlapping" and "comma-less." Are they synonymous?', answer: 'They are distinct',
                  options: ['They are distinct', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'If stuck, review transcription (c12_bio_cbse_06_005) to practice DNA→mRNA conversion, and Class 11.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' }
          ],
            remediations: { 'wobble-means-the-third-base': { steps: ['If the student cannot apply wobble rules, have them: (1) Revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA.', 'Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
