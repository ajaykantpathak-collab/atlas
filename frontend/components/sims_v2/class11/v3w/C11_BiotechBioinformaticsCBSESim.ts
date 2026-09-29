import type { SimDef } from '../../engine/types';
import C11_BiotechBioinformaticsCBSESim from '../../../simulations/c6_12_new/C11_BiotechBioinformaticsCBSESim';

/** v3 wrapped master — C11_BiotechBioinformaticsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechbioinformaticscbsesim: SimDef = {
    id: 'v3w_c11_biotechbioinformaticscbsesim',
    title: 'Bioinformatics: Definition and Scope',
    subtitle: 'This node covers the definition, historical evolution, interdisciplinary nature, and.',
    classLevel: 11, subject: 'biotechnology', topic: 'Bioinformatics: Definition and Scope',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_09_001', 'c11_biotech_cbse_09_002', 'c11_biotech_cbse_11_001', 'c11_biotech_cbse_11_002', 'c11_biotech_cbse_11_003', 'c11_biotech_cbse_11_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a doctor trying to diagnose a rare genetic disorder in a patient from a small village in.', goal: 'Master Bioinformatics: Definition and Scope.' },
    discovery: {
        question: 'Critique the following statement: "Since AI tools like AlphaFold can now predict protein structures with near-experimental accuracy, experimental structure.',
        options: ['The statement is overconfident', 'using BLAST', 'searching databases'],
        answer: 'The statement is overconfident',
        hook: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins.',
    },
    teaching: [
        { title: 'Bioinformatics is an interdisciplinary field.', text: 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical, statistical, and engineering approaches to store, retrieve, analyse, and interpret biological.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_09_001', title: 'Bioinformatics is an interdisciplinary.',
          scaffold: { problem: 'A public health lab in Kerala receives 20 SARS-CoV-2 positive samples.',
            steps: [
            { text: 'Identify the biological question: variant typing + novel mutation detection in SARS-CoV-2 spike gene from short-read.' },
            { text: 'Map the question to the pipeline stages in Fig. 9.3: Experimental Technology (Illumina) → Molecular Data (FASTQ reads).' },
            { text: 'For each pipeline stage, select the required tool category from Tables 9.2, 9.5, 9.6: (a) Quality Control (FastQC) to.' },
            { text: 'Justify each category: QC prevents false variants from sequencing errors; trimming prevents adapter contamination.' },
            { text: 'Specify output formats at each stage: FASTQ → FASTQ (trimmed) → SAM/BAM → VCF → annotated VCF/TSV → screenshots.' },
            { text: 'Identify the final deliverable: A table with 20 rows (samples) × columns (variant ID, genomic position, reference/alt.', faded: true, blankAnswer: 'Complete workflow with 6 tool categories (QC, Trimming,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_09_002', title: 'Primary databases store raw.',
          scaffold: { problem: 'A research team in Delhi sequences the genome of a novel drought-resistant wheat variety using Illumina NovaSeq.',
            steps: [
            { text: 'Identify the data type and processing level for task (a) — raw sequencing reads are direct experimental output with no.' },
            { text: 'Select appropriate primary database for raw reads — NCBI Sequence Read Archive (SRA) or ENA (European Nucleotide.' },
            { text: 'Identify data type for task (b) — assembled genome with gene predictions is analysed/derived data → secondary database.' },
            { text: 'Select appropriate secondary database — NCBI GenBank (for annotated assembly) or Ensembl (for curated gene models).' },
            { text: 'Identify data type for task (c) — integrating genes, pathways, phenotypes → composite database.' },
            { text: 'Select appropriate composite database — KEGG (pathway-centric) or Gramene (plant-specific comparative genomics) for.', faded: true, blankAnswer: '(a) Primary — NCBI SRA / ENA; (b) Secondary — NCBI RefSeq /.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_001', title: 'Programming in bioinformatics refers to.',
          scaffold: { problem: 'A lab generates 150 GB of raw Illumina sequencing data per week (FASTQ files).',
            steps: [
            { text: 'Calculate total samples per week: 150 GB / (approx 1 GB per sample) = 150 samples.' },
            { text: 'Clicks per sample per step = 5. Steps = 4 (QC, align, count, DE). Clicks per sample = 5 × 4 = 20.' },
            { text: 'Total manual clicks per week = 150 samples × 20 clicks = 3,000 clicks.' },
            { text: 'With a scripted pipeline (Snakemake/Nextflow), the same 4 steps run automatically for all 150 samples with 1 command (≈.' },
            { text: 'Interpret: Programming converts O(n) manual labor into O(1) automation, eliminating human error and enabling.', faded: true, blankAnswer: '3,000 manual clicks/week vs. ~0 with programming;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_002', title: 'Python for Bioinformatics refers to the.',
          scaffold: { problem: 'A researcher at ICMR-NIV, Pune has a DNA sequence "ATGCGTACGTAGCTAGCTAG" (20 bp).',
            steps: [
            { text: 'Define the DNA sequence as a string variable `seq = "ATGCGTACGTAGCTAGCTAG"`.' },
            { text: 'Compute the number of G and C bases using `seq.count(\'G\') + seq.count(\'C\')` and store in `gc_count`.' },
            { text: 'Calculate GC percentage: `gc_percent = gc_count / len(seq) * 100`.' },
            { text: 'Calculate melting temperature using the given formula: `tm = 64.9 + 41 * (gc_count - 16.4) / len(seq)`.' },
            { text: 'Print results formatted to two decimal places using f-strings: `print(f"GC%: {gc_percent:.2f}")` and `print(f"Tm:.', faded: true, blankAnswer: 'GC%: 55.00, Tm: 56.35 °C' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_003', title: 'Biopython is an open-source Python.',
          scaffold: { problem: 'You have a FASTA file "wheat_genes.fasta" containing 1,200 gene sequences from Triticum aestivum (bread wheat).',
            steps: [
            { text: 'Import required modules — `from Bio import SeqIO` for parsing/writing, `from Bio.Seq import Seq` for translation.' },
            { text: 'Initialize an empty list `long_proteins = []` to collect SeqRecord objects for output — using list because we need to.' },
            { text: 'Iterate through records using `for record in SeqIO.parse("wheat_genes.fasta", "fasta"):` — this streams records one by.' },
            { text: 'For each record, translate the nucleotide sequence to protein: `protein_seq = record.seq.translate(table=1,.' },
            { text: 'Check protein length: `if len(protein_seq) > 400:` — `len()` on Seq object returns amino acid count.' },
            { text: 'Create new SeqRecord for protein: `from Bio.SeqRecord import SeqRecord; protein_record = SeqRecord(protein_seq,.' },
            { text: 'Append to list: `long_proteins.append(protein_record)`.' },
            { text: 'After loop, write output: `SeqIO.write(long_proteins, "wheat_long_proteins.faa", "fasta")` — writes all records in.' },
            { text: 'Print summary: `print(f"Total sequences: {total}")` and `print(f"Long proteins (>400 aa): {len(long_proteins)}")` —.', faded: true, blankAnswer: 'Script outputs two numbers (e.g., "Total sequences: 1200",.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_004', title: 'Perl regular expressions (regex) are a.',
          scaffold: { problem: 'A researcher has the DNA sequence `ATGCGATACGTAAATGCGATAG` (24 bp).',
            steps: [
            { text: 'Store the DNA sequence in a scalar variable `$dna = \'ATGCGATACGTAAATGCGATAG\';` and define the regex pattern for an ORF.' },
            { text: 'The pattern breakdown: `ATG` matches start codon literally; `(?:...)*?` is a non-capturing group matching any codon (3.' },
            { text: 'Use a while loop with the regex in scalar context: `while ($dna =~ /ATG(?:...)*?(?:TAA|TAG|TGA)/g) { ...' },
            { text: 'Convert to 1-based coordinates: `$start = $-[0] + 1; $end = $+[0];` (since `$+[0]` is 1-past-end in 0-based).' },
            { text: 'Print formatted output for each ORF. Verify by manually scanning: Sequence has ATG at pos 1, then CGT ATA CGT AAA TGC.' },
            { text: 'Run script mentally: Match 1: `$-[0]=0`, `$+[0]=15` → start=1, end=15, len=15. Output: "ORF 1: 1-15 (15 bp)".', faded: true, blankAnswer: 'ORF 1: Start=1, End=15, Length=15 bp' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Bioinformatics: Definition and Scope', spots: [
            { id: 's1', label: 'Bioinformatics is an interdisciplinary field', prompt: 'Which idea is this? — Bioinformatics is an interdisciplinary field that integrates computational, mathematical,.', answer: 'Bioinformatics is an interdisciplinary field', options: ['Bioinformatics is an interdisciplinary field', 'Primary databases store raw experimental', 'Programming in bioinformatics refers to', 'Python for Bioinformatics refers to'] },
            { id: 's2', label: 'Primary databases store raw experimental', prompt: 'Which idea is this? — Primary databases store raw experimental data submitted directly by researchers (e.g.,.', answer: 'Primary databases store raw experimental', options: ['Primary databases store raw experimental', 'Bioinformatics is an interdisciplinary field', 'Programming in bioinformatics refers to', 'Python for Bioinformatics refers to'] },
            { id: 's3', label: 'Programming in bioinformatics refers to', prompt: 'Which idea is this? — Programming in bioinformatics refers to the use of computational languages and algorithms.', answer: 'Programming in bioinformatics refers to', options: ['Programming in bioinformatics refers to', 'Bioinformatics is an interdisciplinary field', 'Primary databases store raw experimental', 'Python for Bioinformatics refers to'] },
            { id: 's4', label: 'Python for Bioinformatics refers to', prompt: 'Which idea is this? — Python for Bioinformatics refers to the application of the Python programming.', answer: 'Python for Bioinformatics refers to', options: ['Python for Bioinformatics refers to', 'Bioinformatics is an interdisciplinary field', 'Primary databases store raw experimental', 'Programming in bioinformatics refers to'] },
            { id: 's5', label: 'Biopython is an open-source Python', prompt: 'Which idea is this? — Biopython is an open-source Python library that provides specialized modules for.', answer: 'Biopython is an open-source Python', options: ['Biopython is an open-source Python', 'Bioinformatics is an interdisciplinary field', 'Primary databases store raw experimental', 'Programming in bioinformatics refers to'] },
            { id: 's6', label: 'Perl regular expressions regex are', prompt: 'Which idea is this? — Perl regular expressions (regex) are a powerful pattern-matching syntax used to search,.', answer: 'Perl regular expressions regex are', options: ['Perl regular expressions regex are', 'Bioinformatics is an interdisciplinary field', 'Primary databases store raw experimental', 'Programming in bioinformatics refers to'] }
          ] } }
    ],
    explore: { component: C11_BiotechBioinformaticsCBSESim, prompt: 'Explore the interactive — Bioinformatics: Definition and Scope' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_001', difficulty: 'standard',
          question: 'Bioinformatics is an interdisciplinary field that integrates computational,.',
          hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) and c10_bio_cbse_04_004 (Mendel\'s laws) to.',
          misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical,',
                  options: ['Bioinformatics is an interdisciplinary field that integrates computational, mathematical,', 'Primary databases store raw experimental data submitted directly by researchers (e.g.,', 'Programming in bioinformatics refers to the use of computational languages and algorithms', 'Python for Bioinformatics refers to the application of the Python programming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins and ends with.' }
          ],
            remediations: { 'bioinformatics-is-synonymous-with-using': { steps: ['Draw the pipeline from Fig. 9.3 on paper: Biomolecules → Experimental Technology → Molecular Data → Analytical Workflow.', 'For each arrow, name ONE tool category from Tables 9.2–9.6 (e.g., "Sequencing → Reads → QC → Alignment → Variant.', 'Pick one category (e.g., QC) and explain why skipping it breaks the downstream step (e.g., "Adapters in reads cause.', 'Re-attempt Diagnostic Question 3. This builds the pipeline mental model that single-tool demos omit.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Since AI tools like AlphaFold can now predict protein structures with near-experimental accuracy, experimental structure.', answer: 'The statement is overconfident',
                  options: ['The statement is overconfident', 'using BLAST', 'searching databases', 'bioinformatics is synonymous with "using BLAST" or "searching databases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins and ends with.' }
          ],
            remediations: { 'bioinformatics-is-synonymous-with-using': { steps: ['Draw the pipeline from Fig. 9.3 on paper: Biomolecules → Experimental Technology → Molecular Data → Analytical Workflow.', 'For each arrow, name ONE tool category from Tables 9.2–9.6 (e.g., "Sequencing → Reads → QC → Alignment → Variant.', 'Pick one category (e.g., QC) and explain why skipping it breaks the downstream step (e.g., "Adapters in reads cause.', 'Re-attempt Diagnostic Question 3. This builds the pipeline mental model that single-tool demos omit.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_002', difficulty: 'standard',
          question: 'Primary databases store raw experimental data submitted directly by researchers.',
          hint: 'If stuck, revisit c11_biotech_cbse_09_001 and focus on the "Historical perspective".',
          misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance*.',
          parts: [
                { id: 'a', prompt: 'A researcher performs Sanger sequencing of a novel human gene and submits the raw chromatogram and base-called sequence to a public repository.', answer: 'Primary database —',
                  options: ['Primary database —', 'secondary', 'composite'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' },
                { id: 'b', prompt: 'UniProtKB/Swiss-Prot entries contain manually reviewed protein sequences with annotated function, domains, and literature citations.', answer: 'UniProt is a secondary database',
                  options: ['UniProt is a secondary database', 'content-type confusion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' },
                { id: 'c', prompt: 'Compare the update propagation delay across the three database tiers.', answer: 'GenBank (primary) updates immediately upon researcher submission',
                  options: ['GenBank (primary) updates immediately upon researcher submission', 'all update simultaneously', 'OMIM updates first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' }
          ],
            remediations: { 'students-classify-databases-by-molecular': { steps: ['Ask the student to trace a single nucleotide sequence from wet-lab experiment → GenBank entry → translated protein in.', 'At each step, ask: "Who created this record? Was it the experimentalist, a curator, or an integration script?"', 'Have them label each step with P/S/C.', 'Give them a new database (e.g., RefSeq, Pfam, Ensembl) and ask them to place it in the flow using the same "who created.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_001', difficulty: 'standard',
          question: 'Programming in bioinformatics refers to the use of computational languages and.',
          hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) and c10_bio_cbse_04_001.',
          misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Python is used in bioinformatics only because it is free and open-source." Explain why this statement is incomplete, citing two specific.', answer: 'The textbook states Python is popular because: (i) clear syntax/readability',
                  options: ['The textbook states Python is popular because: (i) clear syntax/readability', 'bioinformatics programming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' },
                { id: 'b', prompt: 'A researcher has 200 RNA-seq samples (each 5 GB) and needs to perform differential expression analysis followed by pathway enrichment visualization.', answer: 'R is more appropriate',
                  options: ['R is more appropriate', 'bioinformatics programming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' },
                { id: 'c', prompt: 'Compare the roles of "minimum information standards," "XML-based file formats," and "ontologies (GO, SBO)" in systems biology data management.', answer: 'Minimum information defines *what* metadata must accompany data (e.g., MIAME for',
                  options: ['Minimum information defines *what* metadata must accompany data (e.g., MIAME for', 'formats', 'bioinformatics programming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' }
          ],
            remediations: { 'bioinformatics-programming-means-inventing-new': { steps: ['Show the student a 5-line Python script using Biopython to parse a FASTA file and print sequence lengths—emphasize *no.', 'Contrast with a 200-line C implementation of Needleman-Wunsch (algorithm development).', 'Assign a micro-task: "Download a FASTA file from NCBI, write a script to count sequences and average length." 4.', 'Debrief: "You just did bioinformatics programming.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since GUI tools like BLAST and ClustalW exist, biologists do not need to learn programming." Use the textbook\'s perspective on.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'bioinformatics programming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' }
          ],
            remediations: { 'bioinformatics-programming-means-inventing-new': { steps: ['Show the student a 5-line Python script using Biopython to parse a FASTA file and print sequence lengths—emphasize *no.', 'Contrast with a 200-line C implementation of Needleman-Wunsch (algorithm development).', 'Assign a micro-task: "Download a FASTA file from NCBI, write a script to count sequences and average length." 4.', 'Debrief: "You just did bioinformatics programming.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_002', difficulty: 'standard',
          question: 'Python for Bioinformatics refers to the application of the Python programming.',
          hint: 'If stuck, revisit "How to install Python and run a script" from any introductory.',
          misconception: 'Students often believe they must master the entire Python standard library before touching bioinformatics.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Python for Bioinformatics refers to the application of the Python programming',
                  options: ['Python for Bioinformatics refers to the application of the Python programming', 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical,', 'Primary databases store raw experimental data submitted directly by researchers (e.g.,', 'Programming in bioinformatics refers to the use of computational languages and algorithms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe they must master the entire Python standard library before touching bioinformatics.' }
          ],
            remediations: { 'they-must-master-the-entire': { steps: ['Show the student a 10-line script that reads a FASTA file and prints GC% (using Biopython).', 'Have them run it on a provided 5-sequence file.', 'Ask them to modify only the print statement to write CSV instead.', 'Explain that every bioinformatics script follows the same pattern: parse → compute → output.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_003', difficulty: 'standard',
          question: 'Biopython is an open-source Python library that provides specialized modules.',
          hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and practice file I/O with plain Python:.',
          misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records =.',
          parts: [
                { id: 'a', prompt: 'List the five most commonly used Biopython modules and state one primary function of each.', answer: '(1) Bio.SeqIO',
                  options: ['Correct answer: (1) Bio.SeqIO', 'Bio.BLAST', 'Bio.PDB'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' },
                { id: 'b', prompt: 'Compare and contrast parsing a GenBank file with `SeqIO.parse()` versus manually splitting lines by "//" delimiter.', answer: '`SeqIO.parse("file.gb", "genbank")` returns an iterator yielding',
                  options: ['Correct answer: `SeqIO.parse("file.gb", "genbank")` returns an iterator yielding', 'both are equivalent for simple tasks', 'file.fasta'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' }
          ],
            remediations: { 'seqio': { steps: ['Show the error in a REPL: `>>> from Bio import SeqIO; r = SeqIO.parse("test.fasta", "fasta"); r[0]` → TypeError.', 'Explain `SeqIO.parse()` returns a generator (iterator) that yields one record at a time — like a conveyor belt, not a.', 'Demonstrate three correct patterns: (a) `for record in SeqIO.parse(...):` — for streaming processing; (b) `records =.', 'Give a 50 MB FASTA file and have them test both approaches; the list version will hang or crash, the loop version.', 'Add a linting rule: "Never index or len() a SeqIO.parse() result."'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records =.',
          parts: [
                { id: 'a', prompt: 'A student writes this script to download 10,000 nucleotide sequences from NCBI using Entrez.', answer: 'Flaw 1: No `Entrez.api_key`',
                  options: ['Correct answer: Flaw 1: No `Entrez.api_key`', 'missing import SeqIO', 'file.fasta', '`SeqIO'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' },
                { id: 'b', prompt: 'Design a Biopython workflow to identify all open reading frames (ORFs) longer than 300 codons in a bacterial genome FASTA file, considering all six reading.', answer: 'Expected answer criteria: (1) Use `SeqIO.parse()` to iterate genome contigs',
                  options: ['Expected answer criteria: (1) Use `SeqIO.parse()` to iterate genome contigs', 'file.fasta', '`SeqIO'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' },
                { id: 'c', prompt: 'Compare and contrast parsing a GenBank file with `SeqIO.parse()` versus manually splitting lines by "//" delimiter.', answer: '`SeqIO.parse("file.gb", "genbank")` returns an iterator yielding',
                  options: ['Correct answer: `SeqIO.parse("file.gb", "genbank")` returns an iterator yielding', 'both are equivalent for simple tasks', 'file.fasta', '`SeqIO'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' }
          ],
            remediations: { 'seqio': { steps: ['Show the error in a REPL: `>>> from Bio import SeqIO; r = SeqIO.parse("test.fasta", "fasta"); r[0]` → TypeError.', 'Explain `SeqIO.parse()` returns a generator (iterator) that yields one record at a time — like a conveyor belt, not a.', 'Demonstrate three correct patterns: (a) `for record in SeqIO.parse(...):` — for streaming processing; (b) `records =.', 'Give a 50 MB FASTA file and have them test both approaches; the list version will hang or crash, the loop version.', 'Add a linting rule: "Never index or len() a SeqIO.parse() result."'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_004', difficulty: 'standard',
          question: 'Perl regular expressions (regex) are a powerful pattern-matching syntax used to.',
          hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and translate a simple Python loop/print.',
          misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write.',
          parts: [
                { id: 'a', prompt: 'Write a Perl regex pattern with capture groups to extract the recognition site and the overhang sequence from a restriction enzyme description string: `"EcoRI:.', answer: 'Pattern: `/(\\w+):\\s*(\\w)\\^(\\w+)/`',
                  options: ['Pattern: `/(\\w+):\\s*(\\w)\\^(\\w+)/`', 'any character including newline', 'the dot `'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write patterns like.' }
          ],
            remediations: { 'the-dot': { steps: ['Show the student a wrapped FASTA sequence (e.g., 80 chars/line) containing an ORF split across two lines.', 'Have them run their regex `/ATG.*?TAA/` without `/s` — it returns no match.', 'Explain: "The dot stops at newline.', 'The ORF is there but broken by line wrapping." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write.',
          parts: [
                { id: 'a', prompt: 'A colleague claims: "Since Perl regex can find any pattern, we don\'t need specialized algorithms like Smith-Waterman for local sequence alignment; we can just.', answer: 'The claim is false',
                  options: ['The claim is false', 'any character including newline', 'the dot `'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write patterns like.' },
                { id: 'b', prompt: 'Design a Perl regex pattern (with explanation) to find all potential N-linked glycosylation sites (consensus: Asn-X-Ser/Thr, where X ≠ Pro) in a protein.', answer: 'Pattern: `/N[^P][ST]/`',
                  options: ['Pattern: `/N[^P][ST]/`', 'any character including newline', 'the dot `'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write patterns like.' }
          ],
            remediations: { 'the-dot': { steps: ['Show the student a wrapped FASTA sequence (e.g., 80 chars/line) containing an ORF split across two lines.', 'Have them run their regex `/ATG.*?TAA/` without `/s` — it returns no match.', 'Explain: "The dot stops at newline.', 'The ORF is there but broken by line wrapping." 4.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
