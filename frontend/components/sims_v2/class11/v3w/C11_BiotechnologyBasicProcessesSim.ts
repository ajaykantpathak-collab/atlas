import type { SimDef } from '../../engine/types';
import C11_BiotechnologyBasicProcessesSim from '../../../simulations/c6_12/C11_BiotechnologyBasicProcessesSim';

/** v3 wrapped master — C11_BiotechnologyBasicProcessesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechnologybasicprocessessim: SimDef = {
    id: 'v3w_c11_biotechnologybasicprocessessim',
    title: 'nology Basic Processes',
    subtitle: 'Covers: mRNA (prokaryotic vs eukaryotic structure, 5\' cap, poly-A tail, UTRs), rRNA.',
    classLevel: 11, subject: 'biotechnology', topic: 'RNA: Types and Structure',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_03_007', 'c11_biotech_cbse_03_002', 'c11_biotech_cbse_03_003', 'c11_biotech_cbse_11_007', 'c11_biotech_cbse_01_003', 'c11_biotech_cbse_01_004', 'c11_biotech_cbse_01_007', 'c11_biotech_cbse_11_003', 'c11_biotech_cbse_11_004', 'c11_biotech_cbse_11_005', 'c11_biotech_cbse_11_009', 'c11_biotech_cbse_01_005', 'c11_biotech_cbse_01_006', 'c11_biotech_cbse_02_004', 'c11_biotech_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re a chef in a busy restaurant kitchen. DNA is the master recipe book locked in the head chef\'s.', goal: 'Master nology Basic Processes.' },
    discovery: {
        question: 'Name the three major types of RNA and state one primary function for each in a eukaryotic cell.',
        options: ['mRNA — carries genetic code from DNA to ribosome for protein synthesis', 'rRNA carries genetic code', 'tRNA makes ribosomes'],
        answer: 'mRNA — carries genetic code from DNA to ribosome for protein synthesis',
        hook: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive.',
    },
    teaching: [
        { title: 'RNA (Ribonucleic Acid) is a single-stranded.', text: 'RNA (Ribonucleic Acid) is a single-stranded polynucleotide polymer composed of ribonucleotides containing D-ribose sugar, phosphate groups, and nitrogenous bases (adenine, guanine, cytosine, uracil).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_007', title: 'RNA (Ribonucleic Acid) is a.',
          scaffold: { problem: 'A eukaryotic gene\'s mature mRNA is 2,400 nucleotides long including a 150 nt 5\' UTR, a 300 nt 3\' UTR, and a poly-A tail of 200 adenylates.',
            steps: [
            { text: 'Identify total mRNA length = 2,400 nt. Subtract non-coding regions: 5\' UTR (150 nt) + 3\' UTR (300 nt) + poly-A tail.' },
            { text: 'Coding region length = 2,400 - 150 - 300 - 200 = 1,750 nt. Verify: includes start codon (AUG, 3 nt) and stop codon.' },
            { text: 'Number of codons in coding region = coding length / 3 = 1,750 / 3 = 583.33 → not integer.' },
            { text: 'Number of amino acids = number of sense codons = total codons - 1 (stop codon) = 583 - 1 = 582 amino acids.' },
            { text: 'Protein molecular weight = 582 residues × 110 Da/residue = 64,020 Da = 64.0 kDa.', faded: true, blankAnswer: '(a) 582 amino acids; (b) 583 codons (including stop); (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_002', title: 'Amino acids are organic molecules with.',
          scaffold: { problem: 'A dipeptide is formed from Alanine (Ala, R = –CH₃) and Valine (Val, R = –CH(CH₃)₂).',
            steps: [
            { text: 'Write the structural formulas of the two amino acids in their zwitterionic forms at neutral pH: ⁺H₃N–CH(CH₃)–COO⁻ (Ala).' },
            { text: 'Identify the reacting groups: the α-carboxyl of Ala (–COOH) and the α-amino of Val (–NH₂).' },
            { text: 'Draw the mechanism: the –OH from Ala\'s carboxyl and one –H from Val\'s amino are removed as H₂O.' },
            { text: 'Write the product: ⁺H₃N–CH(CH₃)–CO–NH–CH[CH(CH₃)₂]–COO⁻ (zwitterion of Ala-Val). The peptide bond is –CO–NH–.' },
            { text: 'Name: N-terminal = Ala, C-terminal = Val. Systematic name: Alanyl-L-valine. Circle the –CO–NH– linkage.', faded: true, blankAnswer: 'Equation: H₂N–CH(CH₃)–COOH + H₂N–CH[CH(CH₃)₂]–COOH →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_003', title: 'Protein structure is organized into.',
          scaffold: { problem: 'A researcher isolates a protein and determines its molecular mass is 55 kDa by gel filtration.',
            steps: [
            { text: 'Interpret gel filtration data — native molecular mass = 55 kDa (size in solution).' },
            { text: 'Interpret reducing SDS-PAGE — breaks disulfide bonds and denatures subunits; single band at 27.5 kDa means each.' },
            { text: 'Interpret non-reducing SDS-PAGE — same band at 27.5 kDa means no interchain disulfide bonds (otherwise would see 55 kDa.' },
            { text: 'Calculate subunit stoichiometry: 55 kDa / 27.5 kDa = 2 subunits.' },
            { text: 'Conclude quaternary structure: homodimer (two identical subunits) held by non-covalent interactions (hydrophobic,.', faded: true, blankAnswer: 'The protein is a homodimer (two identical 27.5 kDa.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_007', title: 'Sequence manipulation in biotechnology.',
          scaffold: { problem: 'A researcher has sequenced a gene from Bacillus subtilis (soil bacterium) and obtained the coding strand DNA sequence:.',
            steps: [
            { text: 'Import Seq from Bio.Seq and create a Seq object from the given DNA string' },
            { text: 'Call transcribe() method on the DNA Seq object to get mRNA Seq object (T→U conversion)' },
            { text: 'Call translate(table=11) on the mRNA Seq object to get protein Seq object using bacterial genetic code' },
            { text: 'Convert protein Seq to string, check if it starts with \'M\' and ends with \'*\', print results' },
            { text: 'Also print the mRNA sequence to verify T→U conversion occurred correctly', faded: true, blankAnswer: 'mRNA: AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG; Protein:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_003', title: 'Traditional biotechnology refers to the.',
          scaffold: { problem: 'A rural women\'s self-help group in Maharashtra produces 50 kg/day of traditional dahi using back-slopping (2% previous batch as inoculum).',
            steps: [
            { text: 'Identify the core distinction — traditional dahi uses undefined mixed culture (Lactococcus, Lactobacillus, Leuconostoc,.' },
            { text: 'Map microbial diversity implications — traditional: variable consortium provides resilience but inconsistent metabolite.' },
            { text: 'Determine regulatory pathways — traditional: FSSAI "traditional food" category, minimal oversight; modern: FSSAI "novel.' },
            { text: 'Estimate capital — traditional: ₹2-5 lakh (earthen pots, chiller, basic lab); modern: ₹5-10 crore (GMP fermenter,.' },
            { text: 'Analyse scalability — traditional: linear scaling (more pots, more inoculum) but quality drift; modern: exponential.' },
            { text: 'Synthesise — traditional suits decentralised, low-capital, culturally embedded production; modern suits centralised,.', faded: true, blankAnswer: 'Traditional: undefined consortium, FSSAI traditional food,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_004', title: 'Biotechnology is categorized into four.',
          scaffold: { problem: 'A biotech startup proposes three projects: (P1) Expressing a cold-adapted lipase from Arctic Pseudomonas in E.',
            steps: [
            { text: 'Analyze P1 – source organism is Arctic bacterium (marine/microbe), but the product is an industrial enzyme for.' },
            { text: 'Analyze P2 – source gene is from fish (marine animal), but the host is a crop plant (tomato) and the trait is.' },
            { text: 'Analyze P3 – source organism is marine sponge (marine animal), product is an anticancer drug for human therapy.' },
            { text: 'Verify no project fits Red biotechnology (which requires human/animal health products from recombinant.' },
            { text: 'Summarize classification: P1=White, P2=Green, P3=Blue.', faded: true, blankAnswer: 'P1 – White Biotechnology; P2 – Green Biotechnology; P3 –.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'nology Basic Processes', spots: [
            { id: 's1', label: 'RNA Ribonucleic Acid is a', prompt: 'Which idea is this? — RNA (Ribonucleic Acid) is a single-stranded polynucleotide polymer composed of.', answer: 'RNA Ribonucleic Acid is a', options: ['RNA Ribonucleic Acid is a', 'Amino acids are organic molecules', 'Protein structure is organized into', 'Sequence manipulation in biotechnology programming'] },
            { id: 's2', label: 'Amino acids are organic molecules', prompt: 'Which idea is this? — Amino acids are organic molecules with a central α-carbon bonded to four different.', answer: 'Amino acids are organic molecules', options: ['Amino acids are organic molecules', 'RNA Ribonucleic Acid is a', 'Protein structure is organized into', 'Sequence manipulation in biotechnology programming'] },
            { id: 's3', label: 'Protein structure is organized into', prompt: 'Which idea is this? — Protein structure is organized into four hierarchical levels: primary (linear amino acid.', answer: 'Protein structure is organized into', options: ['Protein structure is organized into', 'RNA Ribonucleic Acid is a', 'Amino acids are organic molecules', 'Sequence manipulation in biotechnology programming'] },
            { id: 's4', label: 'Sequence manipulation in biotechnology programming', prompt: 'Which idea is this? — Sequence manipulation in biotechnology programming refers to the computational.', answer: 'Sequence manipulation in biotechnology programming', options: ['Sequence manipulation in biotechnology programming', 'RNA Ribonucleic Acid is a', 'Amino acids are organic molecules', 'Protein structure is organized into'] },
            { id: 's5', label: 'Traditional biotechnology refers to the', prompt: 'Which idea is this? — Traditional biotechnology refers to the historical application of biological processes.', answer: 'Traditional biotechnology refers to the', options: ['Traditional biotechnology refers to the', 'RNA Ribonucleic Acid is a', 'Amino acids are organic molecules', 'Protein structure is organized into'] },
            { id: 's6', label: 'Biotechnology is categorized into four', prompt: 'Which idea is this? — Biotechnology is categorized into four major branches based on the application domain:.', answer: 'Biotechnology is categorized into four', options: ['Biotechnology is categorized into four', 'RNA Ribonucleic Acid is a', 'Amino acids are organic molecules', 'Protein structure is organized into'] }
          ] } }
    ],
    explore: { component: C11_BiotechnologyBasicProcessesSim, prompt: 'Explore the interactive — nology Basic Processes' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_007', difficulty: 'standard',
          question: 'RNA (Ribonucleic Acid) is a single-stranded polynucleotide polymer composed of.',
          hint: 'Revisit c11_biotech_cbse_03_008: practice drawing adenosine-5\'-monophosphate (AMP) and.',
          misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive.',
          parts: [
                { id: 'a', prompt: 'Name the three major types of RNA and state one primary function for each in a eukaryotic cell.', answer: 'mRNA — carries genetic code from DNA to ribosome for protein synthesis',
                  options: ['mRNA — carries genetic code from DNA to ribosome for protein synthesis', 'rRNA carries genetic code', 'tRNA makes ribosomes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' },
                { id: 'b', prompt: 'A eukaryotic mRNA has the sequence 5\'-GCC AUG GCU UAA-3\' (where AUG = start, UAA = stop).', answer: 'Second codon = GCU (Ala)',
                  options: ['Second codon = GCU (Ala)', 'RNA is just single-stranded DNA with uracil instead of thymine', '"RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' },
                { id: 'c', prompt: 'Compare the rRNA composition of prokaryotic (70S) and eukaryotic (80S) ribosomes.', answer: 'Prokaryotic: 30S subunit (16S rRNA) + 50S subunit (23S + 5S rRNA) = 70S',
                  options: ['Prokaryotic: 30S subunit (16S rRNA) + 50S subunit (23S + 5S rRNA) = 70S', '30+50=80', 'RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' }
          ],
            remediations: { 'rna-is-just-single-stranded': { steps: ['Have student draw a single ribonucleotide and a deoxyribonucleotide side-by-side; circle the 2\'-OH and ask: "What can.', 'Show tRNA crystal structure (PDB 1EHZ) — highlight non-Watson-Crick pairs, base triples, and the sharp U-turn in.', 'Contrast: "DNA stores; RNA does." List three catalytic RNAs (RNase P, spliceosome snRNA, ribosomal peptidyl.', 'Practice: predict cleavage products of RNA vs DNA in 0.1M NaOH at 37°C — RNA yields 2\',3\'-cyclic phosphate; DNA intact.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The 5\' cap (7-methylguanosine) and poly-A tail on eukaryotic mRNA are functionally redundant — removing either one has the same effect on.', answer: 'Refute',
                  options: ['Refute', 'stability tags', 'RNA is just single-stranded DNA with uracil instead of thymine', '"RNA is just single-stranded DNA with uracil instead of thymine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RNA is just single-stranded DNA with uracil instead of thymine." They treat RNA as a passive information carrier like.' }
          ],
            remediations: { 'rna-is-just-single-stranded': { steps: ['Have student draw a single ribonucleotide and a deoxyribonucleotide side-by-side; circle the 2\'-OH and ask: "What can.', 'Show tRNA crystal structure (PDB 1EHZ) — highlight non-Watson-Crick pairs, base triples, and the sharp U-turn in.', 'Contrast: "DNA stores; RNA does." List three catalytic RNAs (RNase P, spliceosome snRNA, ribosomal peptidyl.', 'Practice: predict cleavage products of RNA vs DNA in 0.1M NaOH at 37°C — RNA yields 2\',3\'-cyclic phosphate; DNA intact.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_002', difficulty: 'standard',
          question: 'Amino acids are organic molecules with a central α-carbon bonded to four.',
          hint: 'Review Class 10 Chemistry: c10_chem_cbse_04_001 (Covalent Bonding) and.',
          misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group**.',
          parts: [
                { id: 'a', prompt: 'Write the general structural formula of an α-amino acid. Label the α-carbon, the amino group, the carboxyl group, and the R-group.', answer: 'Correct answer: General formula: H₂N–CH(R)–COOH',
                  options: ['Correct answer: General formula: H₂N–CH(R)–COOH', '–COOH + –NH₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group** (side chain) of.' },
                { id: 'b', prompt: 'Given the amino acids Alanine (Ala, R=–CH₃) and Serine (Ser, R=–CH₂OH), draw the two possible dipeptides (Ala-Ser and Ser-Ala).', answer: 'Correct answer: - Ala-Ser: N-terminal = Ala, C-terminal = Ser',
                  options: ['Correct answer: - Ala-Ser: N-terminal = Ala, C-terminal = Ser', '–COOH + –NH₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group** (side chain) of.' }
          ],
            remediations: { '1-the-peptide-bond-forms': { steps: ['**Model building**: Give the student a molecular model kit (or paper cutouts) of two amino acids.', 'Physically remove –OH from carboxyl and –H from amino, join them, and show the released H₂O.', '**Resonance drawing**: Have them draw the two resonance forms of the peptide bond (O=C–N ↔ ⁻O–C=N⁺) and circle the six.', '**Chirality check**: Build glycine and alanine models; show glycine\'s α-carbon has two H\'s (superimposable mirror.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group**.',
          parts: [
                { id: 'a', prompt: 'A student states: "Peptide bond formation is a hydrolysis reaction because water is produced." Evaluate this claim. Is the student correct?', answer: 'Correct answer: The student is incorrect',
                  options: ['Correct answer: The student is incorrect', '–COOH + –NH₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe: (1) The peptide bond forms between the carboxyl group of one amino acid and the **R-group** (side chain) of.' }
          ],
            remediations: { '1-the-peptide-bond-forms': { steps: ['**Model building**: Give the student a molecular model kit (or paper cutouts) of two amino acids.', 'Physically remove –OH from carboxyl and –H from amino, join them, and show the released H₂O.', '**Resonance drawing**: Have them draw the two resonance forms of the peptide bond (O=C–N ↔ ⁻O–C=N⁺) and circle the six.', '**Chirality check**: Build glycine and alanine models; show glycine\'s α-carbon has two H\'s (superimposable mirror.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_003', difficulty: 'standard',
          question: 'Protein structure is organized into four hierarchical levels: primary (linear.',
          hint: 'Revisit amino acid R-group classification (c11_biotech_cbse_03_002) and practice drawing.',
          misconception: 'Students often believe that **hydrogen bonds in secondary structures form between side chains (R groups)** rather than.',
          parts: [
                { id: 'a', prompt: 'A polypeptide segment has the sequence: Lys-Ala-Glu-Cys-Val. Identify the N-terminal and C-terminal residues, and write the conventional name for this.', answer: 'N-terminal: Lysine',
                  options: ['N-terminal: Lysine', 'hydrogen bonds stabilize secondary structure', 'covalent bond'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **hydrogen bonds in secondary structures form between side chains (R groups)** rather than between backbone.' }
          ],
            remediations: { 'hydrogen-bonds-in-secondary-structures': { steps: ['Have student draw a dipeptide with full atomic detail (including backbone N, Cα, C=O) and circle the atoms that.', 'Use a molecular model kit or PyMOL view to show that side chains point outward in an α-helix and cannot reach each.', 'Contrast disulfide bond formation (oxidation of two cysteine -SH groups, can be intrachain or interchain) with peptide.', 'Assign a Ramachandran plot exercise: plot φ/ψ for residues in a known α-helix (φ≈-60°, ψ≈-45°) and β-sheet (φ≈-120°,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **hydrogen bonds in secondary structures form between side chains (R groups)** rather than.',
          parts: [
                { id: 'a', prompt: 'Design a hypothetical 40-residue protein that would form a stable homodimer (quaternary structure) but each monomer remains unstructured in isolation.', answer: 'Primary: Two domains',
                  options: ['Primary: Two domains', 'hydrogen bonds stabilize secondary structure', 'covalent bond', 'primary structure only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **hydrogen bonds in secondary structures form between side chains (R groups)** rather than between backbone.' }
          ],
            remediations: { 'hydrogen-bonds-in-secondary-structures': { steps: ['Have student draw a dipeptide with full atomic detail (including backbone N, Cα, C=O) and circle the atoms that.', 'Use a molecular model kit or PyMOL view to show that side chains point outward in an α-helix and cannot reach each.', 'Contrast disulfide bond formation (oxidation of two cysteine -SH groups, can be intrachain or interchain) with peptide.', 'Assign a Ramachandran plot exercise: plot φ/ψ for residues in a known α-helix (φ≈-60°, ψ≈-45°) and β-sheet (φ≈-120°,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_007', difficulty: 'standard',
          question: 'Sequence manipulation in biotechnology programming refers to the computational.',
          hint: 'Revisit Biopython Seq object creation and method chaining (c11_biotech_cbse_11_003) and.',
          misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG.',
          parts: [
                { id: 'a', prompt: 'What is the mRNA sequence produced when the DNA coding strand "ATGGCCTAA" is transcribed using Biopython\'s `transcribe()` method?', answer: 'The mRNA sequence is "AUGGCCUAA"',
                  options: ['The mRNA sequence is "AUGGCCUAA"', 'TACCGGAUU', 'input is the coding strand (same sequence as mRNA except T/U)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG start codon.' },
                { id: 'b', prompt: 'Compare the protein sequences obtained by translating the DNA sequence "ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG" using `translate(table=1)` versus.', answer: 'Table 1 is the standard genetic code',
                  options: ['Table 1 is the standard genetic code', 'no difference', 'that `Seq'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG start codon.' }
          ],
            remediations: { 'seq': { steps: ['Show the student `Seq("GATGCC").translate()` output ("DA") and `Seq("ATGGCC").translate()` output ("MA") side by side.', 'Ask them to predict `Seq("TGATGC").translate()` — they\'ll likely say "M" but it\'s "*C" (Stop-Cys) because frame 1.', 'Have them write a loop that slices the sequence at positions 0, 1, 2 and translates each, printing the frame number and.', 'Explain that frame selection (finding the correct ORF) is a separate algorithmic step from translation — Biopython.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG.',
          parts: [
                { id: 'a', prompt: 'Compare the protein sequences obtained by translating the DNA sequence "ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG" using `translate(table=1)` versus.', answer: 'Table 1 is the standard genetic code',
                  options: ['Table 1 is the standard genetic code', 'no difference', 'that `Seq'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG start codon.' }
          ],
            remediations: { 'seq': { steps: ['Show the student `Seq("GATGCC").translate()` output ("DA") and `Seq("ATGGCC").translate()` output ("MA") side by side.', 'Ask them to predict `Seq("TGATGC").translate()` — they\'ll likely say "M" but it\'s "*C" (Stop-Cys) because frame 1.', 'Have them write a loop that slices the sequence at positions 0, 1, 2 and translates each, printing the frame number and.', 'Explain that frame selection (finding the correct ORF) is a separate algorithmic step from translation — Biopython.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_003', difficulty: 'standard',
          question: 'Traditional biotechnology refers to the historical application of biological.',
          hint: 'If stuck, revisit Class 10 Biology Chapter 4 (Mendel\'s laws) for gene concept and Class 8.',
          misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" — a.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Traditional biotechnology uses bacteria and yeast, while modern biotechnology uses only plants and animals." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'traditional', 'microbial fermentation only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" — a temporal/technological misconception.' }
          ],
            remediations: { 'traditional-biotechnology-old-low-tech': { steps: ['If the student persists in the temporal misconception: (1) Present two side-by-side fermenters: 1945 penicillin (random.', 'Ask: "In which fermenter do we *know the exact DNA change*?" (2) Have them read the NCERT definition: "Modern.', '(3) Assign: "Classify these 5 practices as traditional/modern with justification: (a) Bt cotton, (b) Sourdough starter,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" — a.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Traditional biotechnology is obsolete because modern biotechnology can do everything traditional biotechnology does, but better, faster,.', answer: 'The claim is false',
                  options: ['The claim is false', 'simplicity', 'traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" — a temporal/technological misconception.' },
                { id: 'b', prompt: 'Design a "Biotechnology Timeline Card Game" for Class 11 students where each card represents a milestone.', answer: '**Traditional Cards:** 1',
                  options: ['**Traditional Cards:** 1', 'modern biotechnology', 'traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "traditional biotechnology = old/low-tech, modern biotechnology = new/high-tech" — a temporal/technological misconception.' }
          ],
            remediations: { 'traditional-biotechnology-old-low-tech': { steps: ['If the student persists in the temporal misconception: (1) Present two side-by-side fermenters: 1945 penicillin (random.', 'Ask: "In which fermenter do we *know the exact DNA change*?" (2) Have them read the NCERT definition: "Modern.', '(3) Assign: "Classify these 5 practices as traditional/modern with justification: (a) Bt cotton, (b) Sourdough starter,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_004', difficulty: 'standard',
          question: 'Biotechnology is categorized into four major branches based on the application.',
          hint: 'Revisit Node 001 (definition) and Node 003 (rDNA technology as the core tool of modern.',
          misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").',
          parts: [
                { id: 'a', prompt: 'Classify the following into the correct branch and justify in one sentence each: (a) Production of human growth hormone in E.', answer: 'Production of human growth hormone in E',
                  options: ['Production of human growth hormone in E', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'b', prompt: 'Compare Red and White biotechnology on three parameters: (i) primary host system, (ii) regulatory stringency, (iii) typical product purification challenge.', answer: '| Parameter | Red Biotechnology | White Biotechnology |',
                  options: ['| Parameter | Red Biotechnology | White Biotechnology |', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' }
          ],
            remediations: { 'the-colour-code-indicates-the': { steps: ['Ask the student to list the *source organism* for each example (insulin → E.', 'Have them group by organism type: microbes for industry (White), plants for farm (Green), human proteins in microbes.', 'Explicitly state: "The colour tells you WHERE the biology comes from and WHERE the product goes, not HOW it\'s made."', 'Give a new scenario: "A company engineers yeast to produce a coral reef sunscreen compound." Student classifies: marine.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Blue biotechnology is just a subset of Green biotechnology because both deal with living organisms and the environment." Defend or.', answer: 'Refute',
                  options: ['Refute', 'environmental benefit', 'biological resource base', 'Red uses rDNA, White uses fermentation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'b', prompt: 'Design a concept map that links the four branches to (i) the biological system used, (ii) the key enabling technology, and (iii) one flagship product.', answer: 'Central node: "Branches of Biotechnology"',
                  options: ['Central node: "Branches of Biotechnology"', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' },
                { id: 'c', prompt: 'Compare Red and White biotechnology on three parameters: (i) primary host system, (ii) regulatory stringency, (iii) typical product purification challenge.', answer: '| Parameter | Red Biotechnology | White Biotechnology |',
                  options: ['| Parameter | Red Biotechnology | White Biotechnology |', 'Red uses rDNA, White uses fermentation', 'the colour code indicates the *technique* used (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the colour code indicates the *technique* used (e.g., "Red uses rDNA, White uses fermentation").' }
          ],
            remediations: { 'the-colour-code-indicates-the': { steps: ['Ask the student to list the *source organism* for each example (insulin → E.', 'Have them group by organism type: microbes for industry (White), plants for farm (Green), human proteins in microbes.', 'Explicitly state: "The colour tells you WHERE the biology comes from and WHERE the product goes, not HOW it\'s made."', 'Give a new scenario: "A company engineers yeast to produce a coral reef sunscreen compound." Student classifies: marine.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
