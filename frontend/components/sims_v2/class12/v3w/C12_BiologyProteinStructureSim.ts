import type { SimDef } from '../../engine/types';
import C12_BiologyProteinStructureSim from '../../../simulations/three/C12_BiologyProteinStructureSim';

/** v3 wrapped master — C12_BiologyProteinStructureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyproteinstructuresim: SimDef = {
    id: 'v3w_c12_biologyproteinstructuresim',
    title: 'Evidences: Biochemical and Molecular',
    subtitle: 'Covers biochemical/molecular evidences only: universal genetic code, protein/DNA sequence.',
    classLevel: 12, subject: 'biology', topic: 'Evidences: Biochemical and Molecular',
    chapters: [],
    nodeIds: ['c12_bio_cbse_07_004', 'c12_bio_cbse_11_008', 'c12_bio_cbse_11_002', 'c12_bio_cbse_06_001', 'c12_bio_cbse_06_003', 'c12_bio_cbse_06_006', 'c12_bio_cbse_06_007', 'c12_bio_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world observation: when you get a blood test, the lab uses human hemoglobin structure — but.', goal: 'Master Evidences: Biochemical and Molecular.' },
    discovery: {
        question: 'Compare the separation mechanisms and predict the elution order for a mixture containing: Protein A (45 kDa, pI 9.0), Protein B (45 kDa, pI 5.0), Protein C.',
        options: ['(i) Cation-exchange pH 7.0: Protein A (pI 9.0 → net +) binds', 'SEC separates by molecular weight', 'purification = chromatography'],
        answer: '(i) Cation-exchange pH 7.0: Protein A (pI 9.0 → net +) binds',
        hook: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column.',
    },
    teaching: [
        { title: 'Biochemical and molecular evidences for.', text: 'Biochemical and molecular evidences for evolution refer to the similarities in DNA sequences, protein structures, genetic code, and metabolic pathways across diverse organisms that indicate shared.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_07_004', title: 'Biochemical and molecular evidences for.',
          scaffold: { problem: 'Researchers sequenced a 300-amino-acid conserved metabolic enzyme from three species: A, B, and C.',
            steps: [
            { text: 'Convert amino acid differences to proportions: p_AB = 12/300 = 0.04, p_AC = 24/300 = 0.08, p_BC = 30/300 = 0.10.' },
            { text: 'Apply Jukes-Cantor correction for multiple hits (simplified): D = -¾ ln(1 - 4p/3). For small p, D ≈ p.' },
            { text: 'The smallest distance is A-B (0.04), so A and B are sister taxa. C is the outgroup.' },
            { text: 'In a rooted tree with molecular clock, distance from root to A = distance from root to B = distance from root to C = T.' },
            { text: 'Conclude tree: ((A,B),C) with A-B divergence at 0.02 units, root at 0.06 units.', faded: true, blankAnswer: 'Tree topology: ((A,B),C). Relative divergence: A and B.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_11_008', title: 'Downstream processing is the sequence.',
          scaffold: { problem: 'A recombinant protein purification table shows: Crude lysate — 50,000 mL, 200 mg/mL total protein, 5,000 U/mL activity.',
            steps: [
            { text: 'Calculate total activity and total protein for each stage: Crude = 50,000 mL × 5,000 U/mL = 2.5×10⁸ U; protein = 50,000.' },
            { text: 'Calculate specific activity (U/mg) each stage: Crude = 2.5×10⁸ / 1×10⁷ = 25 U/mg.' },
            { text: 'Calculate stepwise yield % = (activity_after / activity_before) × 100: Precipitation = (2.0×10⁷ / 2.5×10⁸) × 100 = 80%.' },
            { text: 'Calculate stepwise purification fold = SA_after / SA_before: Precipitation = 80/25 = 3.2×. IEX = 1,750/80 = 21.9×.' },
            { text: 'Overall yield = 80% × 87.5% × 34.3% = 24.0%. Overall purification = 3.2 × 21.9 × 3.4 = 239×.', faded: true, blankAnswer: 'Stage | Volume (mL) | Total Protein (mg) | Total Activity.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_11_002', title: 'Restriction enzymes (restriction.',
          scaffold: { problem: 'A cloning vector pUC19 has a multiple cloning site (MCS) with the following restriction sites in order: EcoRI (GAATTC), BamHI (GGATCC),.',
            steps: [
            { text: 'Identify the restriction sites available on the insert (EcoRI and HindIII) and confirm they exist in the vector MCS.' },
            { text: 'Verify the insert has no internal sites for EcoRI or HindIII (given) — ensures the gene won\'t be cut into pieces.' },
            { text: 'Choose double digestion with EcoRI + HindIII for *both* vector and insert.' },
            { text: 'Predict ends: EcoRI cut → 5\' AATT overhang; HindIII cut → 5\' AGCT overhang. These are incompatible with each other.' },
            { text: 'Ligate: Vector EcoRI end pairs only with insert EcoRI end; vector HindIII end pairs only with insert HindIII end.' },
            { text: 'Confirm directional cloning: Reverse orientation would require EcoRI-to-HindIII ligation, which is impossible due to.', faded: true, blankAnswer: 'Digest both vector and insert with EcoRI and HindIII.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_001', title: 'Griffith\'s experiment (1928).',
          scaffold: { problem: 'A researcher repeats Griffith\'s experiment but uses a protease-treated heat-killed S strain extract (proteins destroyed) and a separate.',
            steps: [
            { text: 'Recall that protease destroys proteins but leaves DNA intact; nuclease destroys DNA but leaves proteins intact.' },
            { text: 'Observe that transformation occurs when proteins are destroyed (protease-treated extract works) but fails when DNA is.' },
            { text: 'Conclude the transforming principle is DNA, not protein.' },
            { text: 'Note historical surprise: before Avery-MacLeod-McCarty (1944), most scientists believed protein was the genetic.' },
            { text: 'Connect to Hershey-Chase: their experiment independently confirmed this using a different system (phage) and method.', faded: true, blankAnswer: 'The transforming principle is DNA. The result was.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_003', title: 'DNA packaging in eukaryotes is the.',
          scaffold: { problem: 'Human diploid genome has ~6.4 × 10^9 base pairs. Calculate the total length of DNA in a human cell nucleus.',
            steps: [
            { text: 'Calculate total DNA length = total bp × rise per bp = 6.4 × 10^9 bp × 0.34 nm/bp = 2.176 × 10^9 nm = 2.176 meters.' },
            { text: 'Calculate number of nucleosomes = total bp / repeat length = 6.4 × 10^9 bp / 200 bp per nucleosome = 3.2 × 10^7.' },
            { text: 'Calculate 10 nm fiber length. Each nucleosome (core + linker) corresponds to 200 bp = 68 nm of DNA.' },
            { text: 'Verify compaction: 2.176 m DNA → 0.352 m fiber = 6.18-fold compaction. Matches the expected ~6-fold for 10 nm fiber.' },
            { text: 'Conclusion: The 10 nm fiber reduces 2.2 meters to ~35 cm — still too long for the nucleus, necessitating higher-order.', faded: true, blankAnswer: 'Total DNA length ≈ 2.18 meters. Total nucleosomes ≈ 32.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_06_006', title: 'The genetic code is the set of rules by.',
          scaffold: { problem: 'A segment of the template strand of a gene has the sequence 3\'-TACTTCGAC-5\'.',
            steps: [
            { text: 'Transcribe DNA template to mRNA by complementary base pairing (A→U, T→A, C→G, G→C) and reverse polarity.' },
            { text: 'Divide mRNA into codons from the 5\' end: AUG | AAG | CUG.' },
            { text: 'Look up each codon in the genetic code table: AUG = Methionine (Start), AAG = Lysine, CUG = Leucine.' },
            { text: 'Check for stop codon: N/A in this segment (UAA, UAG, UGA absent).' },
            { text: 'Write the peptide: Met-Lys-Leu (N-terminal to C-terminal).', faded: true, blankAnswer: 'mRNA: 5\'-AUGAAGCUG-3\'; Codons: AUG (Met/Start), AAG (Lys),.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Evidences: Biochemical and Molecular', spots: [
            { id: 's1', label: 'Biochemical and molecular evidences for', prompt: 'Which idea is this? — Biochemical and molecular evidences for evolution refer to the similarities in DNA.', answer: 'Biochemical and molecular evidences for', options: ['Biochemical and molecular evidences for', 'Downstream processing is the sequence', 'Restriction enzymes restriction endonucleases are', 'Griffiths experiment 1928 demonstrated bacterial'] },
            { id: 's2', label: 'Downstream processing is the sequence', prompt: 'Which idea is this? — Downstream processing is the sequence of unit operations used to isolate, purify, and.', answer: 'Downstream processing is the sequence', options: ['Downstream processing is the sequence', 'Biochemical and molecular evidences for', 'Restriction enzymes restriction endonucleases are', 'Griffiths experiment 1928 demonstrated bacterial'] },
            { id: 's3', label: 'Restriction enzymes restriction endonucleases are', prompt: 'Which idea is this? — Restriction enzymes (restriction endonucleases) are bacterial enzymes that recognize.', answer: 'Restriction enzymes restriction endonucleases are', options: ['Restriction enzymes restriction endonucleases are', 'Biochemical and molecular evidences for', 'Downstream processing is the sequence', 'Griffiths experiment 1928 demonstrated bacterial'] },
            { id: 's4', label: 'Griffiths experiment 1928 demonstrated bacterial', prompt: 'Which idea is this? — Griffith\'s experiment (1928) demonstrated bacterial transformation using Streptococcus.', answer: 'Griffiths experiment 1928 demonstrated bacterial', options: ['Griffiths experiment 1928 demonstrated bacterial', 'Biochemical and molecular evidences for', 'Downstream processing is the sequence', 'Restriction enzymes restriction endonucleases are'] },
            { id: 's5', label: 'DNA packaging in eukaryotes is', prompt: 'Which idea is this? — DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA around.', answer: 'DNA packaging in eukaryotes is', options: ['DNA packaging in eukaryotes is', 'Biochemical and molecular evidences for', 'Downstream processing is the sequence', 'Restriction enzymes restriction endonucleases are'] },
            { id: 's6', label: 'The genetic code is the', prompt: 'Which idea is this? — The genetic code is the set of rules by which information encoded in mRNA sequences.', answer: 'The genetic code is the', options: ['The genetic code is the', 'Biochemical and molecular evidences for', 'Downstream processing is the sequence', 'Restriction enzymes restriction endonucleases are'] }
          ] } }
    ],
    explore: { component: C12_BiologyProteinStructureSim, prompt: 'Explore the interactive — Evidences: Biochemical and Molecular' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_004', difficulty: 'standard',
          question: 'Biochemical and molecular evidences for evolution refer to the similarities in.',
          hint: 'If stuck on sequence alignment or molecular clock, revisit c11_biotech_cbse_09_006.',
          misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional.',
          parts: [
                { id: 'a', prompt: 'A researcher sequences the beta-globin gene in humans, gorillas, and orangutans.', answer: 'Tree: Human and gorilla are sister taxa (2 differences), orangutan is outgroup',
                  options: ['Tree: Human and gorilla are sister taxa (2 differences), orangutan is outgroup', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' },
                { id: 'b', prompt: 'Compare and contrast: (a) homologous genes vs. analogous genes, (b) pseudogenes vs. functional genes as evolutionary evidence. Give one example of each.', answer: 'homologous genes vs',
                  options: ['homologous genes vs', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' }
          ],
            remediations: { 'high-percentage-dna-similarity-recent': { steps: ['Revisit c11_bio_cbse_09_004 (Nucleic Acids) and c11_bio_cbse_07_006 (Genetic Code) to reinforce that DNA sequence is.', 'Review c11_bio_cbse_07_001 (Central Dogma) to understand how DNA → protein conservation works.', 'Do a guided BLAST exercise: search human cytochrome c against NCBI, record % identity for chimp, mouse, chicken, yeast;.', 'Re-attempt Diagnostic Question 3 with the BLAST data.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Endogenous retroviruses (ERVs) in the same chromosomal position in humans and chimpanzees are the strongest molecular evidence for common.', answer: 'The claim is mostly correct but overstates "strongest" — ERVs are compelling',
                  options: ['The claim is mostly correct but overstates "strongest" — ERVs are compelling', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' },
                { id: 'b', prompt: 'Compare and contrast: (a) homologous genes vs. analogous genes, (b) pseudogenes vs. functional genes as evolutionary evidence. Give one example of each.', answer: 'homologous genes vs',
                  options: ['homologous genes vs', 'high percentage DNA similarity = recent common ancestor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "high percentage DNA similarity = recent common ancestor" without considering that functional constraints (purifying.' }
          ],
            remediations: { 'high-percentage-dna-similarity-recent': { steps: ['Revisit c11_bio_cbse_09_004 (Nucleic Acids) and c11_bio_cbse_07_006 (Genetic Code) to reinforce that DNA sequence is.', 'Review c11_bio_cbse_07_001 (Central Dogma) to understand how DNA → protein conservation works.', 'Do a guided BLAST exercise: search human cytochrome c against NCBI, record % identity for chimp, mouse, chicken, yeast;.', 'Re-attempt Diagnostic Question 3 with the BLAST data.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_008', difficulty: 'standard',
          question: 'Downstream processing is the sequence of unit operations used to isolate,.',
          hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
          misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column.',
          parts: [
                { id: 'a', prompt: 'List the five major stages of downstream processing in the correct sequential order for an intracellular recombinant protein, and name one representative.', answer: 'Correct sequence: (1) Solid–liquid separation',
                  options: ['Correct sequence: (1) Solid–liquid separation', 'purification = chromatography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' },
                { id: 'b', prompt: 'You are purifying an intracellular, heat-stable enzyme (60 kDa, pI 8.5) from *Bacillus subtilis* fermentation broth (10^10 cells/mL, 50 g/L wet cell weight).', answer: 'Step 1: Disc-stack centrifugation (10,000–15,000 × g)',
                  options: ['Step 1: Disc-stack centrifugation (10,000–15,000 × g)', 'purification = chromatography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' },
                { id: 'c', prompt: 'Compare the separation mechanisms and predict the elution order for a mixture containing: Protein A (45 kDa, pI 9.0), Protein B (45 kDa, pI 5.0), Protein C.', answer: '(i) Cation-exchange pH 7.0: Protein A (pI 9.0 → net +) binds',
                  options: ['(i) Cation-exchange pH 7.0: Protein A (pI 9.0 → net +) binds', 'SEC separates by molecular weight', 'purification = chromatography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' }
          ],
            remediations: { 'purification-chromatography-and-treat-downstream': { steps: ['If the student cannot sequence steps or justify technique choice: 1.', 'Revisit c12_bio_cbse_11_007 (bioreactor output) — list every component in 1 L of harvest broth with approximate.', 'For each component, write one physical property (size, charge, solubility, affinity, density) that DIFFERS from the.', 'Match each property difference to a separation technique from c11_biotech_cbse_12_002 (centrifugation) and.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column.',
          parts: [
                { id: 'a', prompt: 'A process development scientist proposes using immobilised metal affinity chromatography (IMAC) as the VERY FIRST chromatography step after cell lysis for a.', answer: 'The strategy is high-risk',
                  options: ['The strategy is high-risk', 'IMAC is specific so it\'s fine', 'purification = chromatography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' },
                { id: 'b', prompt: 'Design a cost-reduced downstream process for an extracellular, thermostable α-amylase (55 kDa, pI 4.8) from *Bacillus licheniformis* produced at 20 g/L in a 50.', answer: 'Process: (1) Microfiltration (0.2 µm)',
                  options: ['Process: (1) Microfiltration (0.2 µm)', 'purification = chromatography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' }
          ],
            remediations: { 'purification-chromatography-and-treat-downstream': { steps: ['If the student cannot sequence steps or justify technique choice: 1.', 'Revisit c12_bio_cbse_11_007 (bioreactor output) — list every component in 1 L of harvest broth with approximate.', 'For each component, write one physical property (size, charge, solubility, affinity, density) that DIFFERS from the.', 'Match each property difference to a separation technique from c11_biotech_cbse_12_002 (centrifugation) and.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_002', difficulty: 'standard',
          question: 'Restriction enzymes (restriction endonucleases) are bacterial enzymes that.',
          hint: 'If unable to write complementary strands or identify palindromes, revisit.',
          misconception: 'Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can ligate together**.',
          parts: [
                { id: 'a', prompt: 'Name the type of restriction enzyme most widely used in recombinant DNA technology and state its defining characteristic regarding cleavage position relative.', answer: 'Type II restriction enzymes are most widely used in rDNA technology',
                  options: ['Type II restriction enzymes are most widely used in rDNA technology', 'Type I', 'Type III'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can ligate together**.' },
                { id: 'b', prompt: 'The restriction enzyme EcoRI recognizes the sequence 5\'-GAATTC-3\'.', answer: 'Complementary strand (3\'→5\'): CTTAAG',
                  options: ['Complementary strand (3\'→5\'): CTTAAG', 'it reads the same backwards'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can ligate together**.' }
          ],
            remediations: { 'all-restriction-enzymes-produce-sticky': { steps: ['Revisit **c11_biotech_cbse_12_007** (Restriction Enzymes: Types and Cleavage Patterns) — focus on the table comparing.', 'Draw the cleavage of EcoRI and HaeIII on paper: write both strands 5\'→3\', mark the cut sites with ↓, and *circle the.', 'Practice: Given 5 enzymes (EcoRI, BamHI, HindIII, HaeIII, PvuII), classify each as sticky/blunt and write their.', 'Re-attempt Diagnostic Questions 3 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_001', difficulty: 'standard',
          question: 'Griffith\'s experiment (1928) demonstrated bacterial transformation using.',
          hint: 'If stuck, revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) for.',
          misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.',
          parts: [
                { id: 'a', prompt: 'In Griffith\'s experiment, which combination of bacterial strains injected into mice resulted in mouse death AND recovery of live smooth (S) bacteria from the.', answer: 'Correct answer: Heat-killed S strain + live R strain',
                  options: ['Correct answer: Heat-killed S strain + live R strain', 'sheared off', 'Griffith\'s experiment proved DNA is the genetic material'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.' }
          ],
            remediations: { 'griffith-s-experiment-proved-dna': { steps: ['Re-watch the animation of Griffith\'s experiment (available on NCERT e-pathshala) focusing on the four injection groups.', 'Draw a flowchart of Hershey-Chase: label phage with ³²P → infect E.', 'coli → blend → centrifuge → measure radioactivity in pellet vs supernatant.', 'Write a one-sentence conclusion for each experiment.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If Hershey-Chase had used ³²P-labeled protein and ³⁵S-labeled DNA, they would have reached the same conclusion." Is this true or.', answer: 'Correct answer: False',
                  options: ['Correct answer: False', 'True, isotopes are interchangeable', 'sheared off', 'Griffith\'s experiment proved DNA is the genetic material'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Griffith\'s experiment proved DNA is the genetic material.' }
          ],
            remediations: { 'griffith-s-experiment-proved-dna': { steps: ['Re-watch the animation of Griffith\'s experiment (available on NCERT e-pathshala) focusing on the four injection groups.', 'Draw a flowchart of Hershey-Chase: label phage with ³²P → infect E.', 'coli → blend → centrifuge → measure radioactivity in pellet vs supernatant.', 'Write a one-sentence conclusion for each experiment.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_003', difficulty: 'standard',
          question: 'DNA packaging in eukaryotes is the hierarchical coiling of double-stranded DNA.',
          hint: 'If stuck, review DNA charge and dimensions (c12_bio_cbse_06_002) and the definition of.',
          misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.',
          parts: [
                { id: 'a', prompt: 'Compare the 10 nm "beads-on-a-string" fiber and the 30 nm solenoid fiber in terms of: (a) histone composition, (b) compaction ratio, and (c) transcriptional.', answer: 'histone composition, (',
                  options: ['histone composition, (', '30 nm fiber has different core histones', 'both are equally accessible'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' }
          ],
            remediations: { 'nucleosomes-are-fixed-beads-permanently': { steps: ['If the student holds the static-beads misconception: Step 1 — Revisit c12_bio_cbse_06_002 (DNA structure) to recall DNA.', 'Step 2 — Watch a 2-minute animation of nucleosome sliding/remodeling (e.g., HHMI BioInteractive "Chromatin Remodeling").', 'Step 3 — Do a hands-on activity: wrap a rubber band (DNA) around a spool (histone core), then twist/pull to show how.', 'Step 4 — Re-attempt Diagnostic Question 6 (design experiment) — now they should propose FRAP or remodeler recruitment.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Heterochromatin is permanently transcriptionally inactive because its DNA is too tightly packed for RNA polymerase to access." Is.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'nucleosomes are fixed "beads" permanently glued to specific DNA sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' },
                { id: 'b', prompt: 'Compare the 10 nm "beads-on-a-string" fiber and the 30 nm solenoid fiber in terms of: (a) histone composition, (b) compaction ratio, and (c) transcriptional.', answer: 'histone composition, (',
                  options: ['histone composition, (', '30 nm fiber has different core histones', 'both are equally accessible', 'nucleosomes are fixed "beads" permanently glued to specific DNA sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe nucleosomes are fixed "beads" permanently glued to specific DNA sequences.' }
          ],
            remediations: { 'nucleosomes-are-fixed-beads-permanently': { steps: ['If the student holds the static-beads misconception: Step 1 — Revisit c12_bio_cbse_06_002 (DNA structure) to recall DNA.', 'Step 2 — Watch a 2-minute animation of nucleosome sliding/remodeling (e.g., HHMI BioInteractive "Chromatin Remodeling").', 'Step 3 — Do a hands-on activity: wrap a rubber band (DNA) around a spool (histone core), then twist/pull to show how.', 'Step 4 — Re-attempt Diagnostic Question 6 (design experiment) — now they should propose FRAP or remodeler recruitment.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_006', difficulty: 'standard',
          question: 'The genetic code is the set of rules by which information encoded in mRNA.',
          hint: 'If stuck, review transcription (c12_bio_cbse_06_005) to practice DNA→mRNA conversion, and.',
          misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base.',
          parts: [
                { id: 'a', prompt: 'How many different codons exist in the standard genetic code, and how many of them code for amino acids (sense codons) versus signal termination (stop codons)?', answer: 'There are 64 codons (4³)',
                  options: ['There are 64 codons (4³)', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' },
                { id: 'b', prompt: 'The genetic code is described as "degenerate." Explain what this means and give a concrete example using the amino acid leucine.', answer: 'Degeneracy means most amino acids are specified by more than one codon',
                  options: ['Degeneracy means most amino acids are specified by more than one codon', 'degenerate means the code is broken', 'each codon codes for multiple amino acids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' },
                { id: 'c', prompt: 'Compare the genetic code properties "non-overlapping" and "comma-less." Are they synonymous?', answer: 'They are distinct',
                  options: ['They are distinct', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' }
          ],
            remediations: { 'wobble-means-the-third-base': { steps: ['If the student cannot apply wobble rules, have them: (1) Revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA.', 'Re-diagnose with Diagnostic Question 3.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base.',
          parts: [
                { id: 'a', prompt: 'A point mutation changes the DNA template strand sequence from 3\'-TAC-5\' to 3\'-TAA-5\' in a gene\'s coding region.', answer: 'Original DNA template 3\'-TAC-5\' → mRNA 5\'-AUG-3\' (Met)',
                  options: ['Original DNA template 3\'-TAC-5\' → mRNA 5\'-AUG-3\' (Met)', 'no effect because code is degenerate', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' },
                { id: 'b', prompt: 'Design a minimal set of tRNA anticodons (using standard bases A, U, G, C and inosine I) that can translate all six leucine codons (UUA, UUG, CUU, CUC, CUA,.', answer: 'Leucine codons: UUA, UUG (both UUR), CUU, CUC, CUA, CUG (all CUN)',
                  options: ['Leucine codons: UUA, UUG (both UUR), CUU, CUC, CUA, CUG (all CUN)', 'wobble means the third base of the codon doesn\'t matter at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "wobble means the third base of the codon doesn\'t matter at all" — they write that any third-base change is silent.' }
          ],
            remediations: { 'wobble-means-the-third-base': { steps: ['If the student cannot apply wobble rules, have them: (1) Revisit c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA.', 'Re-diagnose with Diagnostic Question 3.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
