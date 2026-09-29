import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch09_p1: SimDef = {
    id: 'v3_c11_biotech_ch09_p1',
    title: 'Introduction to Bioinformatics · Part 1/2',
    subtitle: 'Meet databases, sequence alignment and the logic of guessing function from similarity.',
    classLevel: 11, subject: 'biotechnology', topic: 'Introduction to Bioinformatics · Part 1/2',
    chapters: ['c11_biotech_ch09'],
    nodeIds: ['c11_biotech_cbse_09_001', 'c11_biotech_cbse_09_002', 'c11_biotech_cbse_09_003', 'c11_biotech_cbse_09_004', 'c11_biotech_cbse_09_005', 'c11_biotech_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a bioinformatics analyst annotating a newly sequenced genome', intro: 'A hard drive full of ATGCs and no living sample — decode it anyway.', goal: 'Describe biological databases, pairwise alignment and the central workflow of bioinformatics.' },
    discovery: {
        question: 'A researcher sequences a new virus and needs to know what its genes might do — before ever culturing it. Which tool makes that guess possible?',
        options: ['Aligning its sequence against global databases where similar sequences already carry annotations', 'X-ray crystallography of the whole virus', 'Staining the virus and reading colour bands under a microscope', 'Randomly mutating the genome and watching for changes'],
        answer: 'Aligning its sequence against global databases where similar sequences already carry annotations',
        hook: 'Bioinformatics bets that similar sequence means similar function — a billion-letter search engine for biology.',
    },
    teaching: [
        { title: 'Bioinformatics: Definition and Scope', text: 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical, statistical, and engineering approaches to store, retrieve, analyse, and interpret biological.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_09_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Query a sequence database, run a BLAST-style comparison, and predict a gene\'s function from its matches.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_001', title: 'Bioinformatics: Definition and Scope',
          caseStudy: { intro: 'Imagine you are a doctor trying to diagnose a rare genetic disorder in a patient from a small village in Rajasthan.',
            decisions: [{ prompt: 'Define bioinformatics in one sentence using the three core disciplinary pillars mentioned in the NCERT textbook.', options: [
                { text: 'Bioinformatics is an interdisciplinary field that uses computational, mathematical, and', outcome: 'Bioinformatics is an interdisciplinary field that uses computational, mathematical, and statistical.' },
                { text: 'bioinformatics is using computers to study biology', outcome: 'Not quite — Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They.', reveals: 'bioinformatics-is-synonymous-with-using' },
                { text: 'using BLAST', outcome: 'Not quite — Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They.', reveals: 'bioinformatics-is-synonymous-with-using' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_002', title: 'Biological Databases: Primary, Secondary and Composite',
          caseStudy: { intro: 'Imagine you are a Class 11 student who just sequenced a gene in your school lab and got a raw string of A, T, G, C letters.',
            decisions: [{ prompt: 'A researcher performs Sanger sequencing of a novel human gene and submits the raw chromatogram and base-called sequence to a public.', options: [
                { text: 'Primary database —', outcome: 'Primary database — because the data is original experimental output deposited directly by the.' },
                { text: 'secondary', outcome: 'Not quite — Students classify databases by *molecular content* (DNA database vs protein database) rather than.', reveals: 'students-classify-databases-by-molecular' },
                { text: 'composite', outcome: 'Not quite — Students classify databases by *molecular content* (DNA database vs protein database) rather than.', reveals: 'students-classify-databases-by-molecular' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_003', title: 'Sequence Databases: GenBank, EMBL and DDBJ',
          caseStudy: { intro: 'Imagine you have just sequenced a novel gene from a medicinal plant in your school lab and want to share it with scientists globally. Where do you submit it?',
            decisions: [{ prompt: 'Name the three databases that form the International Nucleotide Sequence Database Collaboration (INSDC) and state the host.', options: [
                { text: 'The three INSDC databases are: GenBank (hosted by NCBI, USA), EMBL (hosted by EMBL-EBI,', outcome: 'The three INSDC databases are: GenBank (hosted by NCBI, USA), EMBL (hosted by EMBL-EBI, UK/Europe).' },
                { text: 'UniProt or PDB', outcome: 'Not quite — Students believe GenBank, EMBL, and DDBJ are competing databases with different sequences, like.', reveals: 'genbank' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_004', title: 'Structure Databases: PDB and MMDB',
          caseStudy: { intro: 'Imagine you are a researcher trying to design a drug that inhibits a viral protease. You need the 3D shape of the protease\'s active site to start.',
            decisions: [{ prompt: 'What is the primary difference between the data stored in GenBank (a sequence database) and the Protein Data Bank (PDB)?', options: [
                { text: 'GenBank stores nucleotide sequences (primary 1D data) submitted by researchers, while PDB', outcome: 'GenBank stores nucleotide sequences (primary 1D data) submitted by researchers, while PDB stores.' },
                { text: 'both store protein sequences', outcome: 'Not quite — Students often think PDB files contain only atomic coordinates (x,y,z).', reveals: 'pdb-files-contain-only-atomic' },
                { text: 'PDB files contain only atomic coordinates (x,y,z)', outcome: 'Not quite — Students often think PDB files contain only atomic coordinates (x,y,z).', reveals: 'pdb-files-contain-only-atomic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_006', title: 'Sequence Alignment: Global and Local Alignment',
          caseStudy: { intro: 'Imagine you have two DNA sequences from different bacteria: one is 1,200 bp long, the other is 1,500 bp.',
            decisions: [{ prompt: 'Define global sequence alignment and state one biological scenario where it is the appropriate choice.', options: [
                { text: 'Global alignment aligns two sequences from end to end, maximizing matches across their', outcome: 'Global alignment aligns two sequences from end to end, maximizing matches across their entire.' },
                { text: 'global alignment finds the best local match', outcome: 'Not quite — Students often think "global alignment is for similar sequences, local for dissimilar ones." This.', reveals: 'global-alignment-is-for-similar' },
                { text: 'global alignment is for similar sequences, local for dissimilar ones', outcome: 'Not quite — Students often think "global alignment is for similar sequences, local for dissimilar ones." This.', reveals: 'global-alignment-is-for-similar' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Bioinformatics · Part 1/2', spots: [
            { id: 's1', label: 'Bioinformatics Definition and Scope', prompt: 'Which idea is this? — Bioinformatics is an interdisciplinary field that integrates computational, mathematical.', answer: 'Bioinformatics Definition and Scope', options: ['Bioinformatics Definition and Scope', 'Biological Databases Primary Secondary and Composite', 'Sequence Databases GenBank EMBL and DDBJ', 'Structure Databases PDB and MMDB'] },
            { id: 's2', label: 'Biological Databases Primary Secondary and Composite', prompt: 'Which idea is this? — Primary databases store raw experimental data submitted directly by researchers (e.g.', answer: 'Biological Databases Primary Secondary and Composite', options: ['Biological Databases Primary Secondary and Composite', 'Bioinformatics Definition and Scope', 'Sequence Databases GenBank EMBL and DDBJ', 'Structure Databases PDB and MMDB'] },
            { id: 's3', label: 'Sequence Databases GenBank EMBL and DDBJ', prompt: 'Which idea is this? — GenBank, EMBL (European Molecular Biology Laboratory), and DDBJ (DNA Data Bank of Japan).', answer: 'Sequence Databases GenBank EMBL and DDBJ', options: ['Sequence Databases GenBank EMBL and DDBJ', 'Bioinformatics Definition and Scope', 'Biological Databases Primary Secondary and Composite', 'Structure Databases PDB and MMDB'] },
            { id: 's4', label: 'Structure Databases PDB and MMDB', prompt: 'Which idea is this? — Structure databases are specialized biological databases that store experimentally.', answer: 'Structure Databases PDB and MMDB', options: ['Structure Databases PDB and MMDB', 'Bioinformatics Definition and Scope', 'Biological Databases Primary Secondary and Composite', 'Sequence Databases GenBank EMBL and DDBJ'] },
            { id: 's5', label: 'Sequence File Formats FASTA and GenBank Format', prompt: 'Which idea is this? — FASTA format is a text-based sequence representation where the first line begins with.', answer: 'Sequence File Formats FASTA and GenBank Format', options: ['Sequence File Formats FASTA and GenBank Format', 'Bioinformatics Definition and Scope', 'Biological Databases Primary Secondary and Composite', 'Sequence Databases GenBank EMBL and DDBJ'] },
            { id: 's6', label: 'Sequence Alignment Global and Local Alignment', prompt: 'Which idea is this? — Sequence alignment is the computational arrangement of two or more biological sequences.', answer: 'Sequence Alignment Global and Local Alignment', options: ['Sequence Alignment Global and Local Alignment', 'Bioinformatics Definition and Scope', 'Biological Databases Primary Secondary and Composite', 'Sequence Databases GenBank EMBL and DDBJ'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A cousin in medical college is analysing sequencing reads from a patient\'s tumour. She pastes one raw read into BLAST, gets a top hit, and declares the diagnosis done: \'Bioinformatics = BLAST, one tool, one answer.\'',
            decisions: [{ prompt: 'Is one BLAST hit a diagnosis?', options: [
                { text: 'No — bioinformatics is a pipeline: raw reads → quality control (adapter/quality trimming) → alignment to reference → variant calling → annotation against curated databases → interpretation. Skipping QC or stopping at the first BLAST hit risks artifacts being read as mutations.', outcome: 'Each stage\'s output constrains the next; a single top hit without QC, alignment statistics and clinical annotation is not evidence.' },
                { text: 'Yes — BLAST searches the entire known database, so the top hit IS the answer.', outcome: 'BLAST is one tool in a multi-stage workflow; uncleaned reads and unverified variants make the \'top hit\' meaningless for diagnosis.', reveals: 'bioinformatics-is-blast' },
                { text: 'No — she should instead download all known genomes and compare them manually to be thorough.', outcome: 'That replaces the pipeline with brute force; the field exists because petabyte-scale data needs indexed databases and staged algorithms, not manual reading.', reveals: 'manual-comparison-more-thorough' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Modern biology generates data faster than labs can test it — informatics turns sequence into hypothesis.',
            decisions: [{ prompt: 'What comes next? Introduction to Bioinformatics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Bioinformatics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_001', difficulty: 'standard',
          question: 'Bioinformatics is an interdisciplinary field that integrates computational.',
          hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) and c10_bio_cbse_04_004 (Mendel\'s laws).',
          misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical,',
                  options: ['Bioinformatics is an interdisciplinary field that integrates computational, mathematical,', 'Primary databases store raw experimental data submitted directly by researchers (e.g.,', 'GenBank, EMBL (European Molecular Biology Laboratory), and DDBJ (DNA Data Bank of Japan)', 'Structure databases are specialized biological databases that store experimentally'],
                  hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) and c10_bio_cbse_04_004 (Mendel\'s laws) to rebuild.',
                  misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins and ends with.' }
          ],
            remediations: { 'bioinformatics-is-synonymous-with-using': { steps: ['Draw the pipeline from Fig. 9.3 on paper: Biomolecules → Experimental Technology → Molecular Data → Analytical Workflow.', 'For each arrow, name ONE tool category from Tables 9.2–9.6 (e.g., "Sequencing → Reads → QC → Alignment → Variant.', 'Pick one category (e.g., QC) and explain why skipping it breaks the downstream step (e.g., "Adapters in reads cause.', 'Re-attempt Diagnostic Question 3. This builds the pipeline mental model that single-tool demos omit.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Since AI tools like AlphaFold can now predict protein structures with near-experimental accuracy, experimental structure.', answer: 'The statement is overconfident',
                  options: ['The statement is overconfident', 'using BLAST', 'searching databases', 'bioinformatics is synonymous with "using BLAST" or "searching databases'],
                  hint: 'Revisit c10_bio_cbse_04_007 (Darwin\'s theory) and c10_bio_cbse_04_004 (Mendel\'s laws) to rebuild.',
                  misconception: 'Students believe bioinformatics is synonymous with "using BLAST" or "searching databases." They think the field begins and ends with.' }
          ],
            remediations: { 'bioinformatics-is-synonymous-with-using': { steps: ['Draw the pipeline from Fig. 9.3 on paper: Biomolecules → Experimental Technology → Molecular Data → Analytical Workflow.', 'For each arrow, name ONE tool category from Tables 9.2–9.6 (e.g., "Sequencing → Reads → QC → Alignment → Variant.', 'Pick one category (e.g., QC) and explain why skipping it breaks the downstream step (e.g., "Adapters in reads cause.', 'Re-attempt Diagnostic Question 3. This builds the pipeline mental model that single-tool demos omit.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_002', difficulty: 'standard',
          question: 'Primary databases store raw experimental data submitted directly by researchers.',
          hint: 'If stuck, revisit c11_biotech_cbse_09_001 and focus on the "Historical perspective".',
          misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance*.',
          parts: [
                { id: 'a', prompt: 'A researcher performs Sanger sequencing of a novel human gene and submits the raw chromatogram and base-called sequence to a public repository.', answer: 'Primary database —',
                  options: ['Primary database —', 'secondary', 'composite', 'processed'],
                  hint: 'If stuck, revisit c11_biotech_cbse_09_001 and focus on the "Historical perspective" section showing.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' },
                { id: 'b', prompt: 'UniProtKB/Swiss-Prot entries contain manually reviewed protein sequences with annotated function, domains, and literature citations.', answer: 'UniProt is a secondary database',
                  options: ['UniProt is a secondary database', 'content-type confusion'],
                  hint: 'If stuck, revisit c11_biotech_cbse_09_001 and focus on the "Historical perspective" section showing.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' },
                { id: 'c', prompt: 'You are studying the BRCA1 gene and need: (i) the original submitted genomic sequence, (ii) the curated protein sequence with known pathogenic variants, and.', answer: '(i) GenBank (primary)',
                  options: ['(i) GenBank (primary)', 'GenBank for (ii'],
                  hint: 'If stuck, revisit c11_biotech_cbse_09_001 and focus on the "Historical perspective" section showing.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' },
                { id: 'd', prompt: 'Compare the update propagation delay across the three database tiers.', answer: 'GenBank (primary) updates immediately upon researcher submission',
                  options: ['GenBank (primary) updates immediately upon researcher submission', 'all update simultaneously', 'OMIM updates first'],
                  hint: 'If stuck, revisit c11_biotech_cbse_09_001 and focus on the "Historical perspective" section showing.',
                  misconception: 'Students classify databases by *molecular content* (DNA database vs protein database) rather than by *data provenance* (original submission.' }
          ],
            remediations: { 'students-classify-databases-by-molecular': { steps: ['Ask the student to trace a single nucleotide sequence from wet-lab experiment → GenBank entry → translated protein.', 'At each step, ask: "Who created this record? Was it the experimentalist, a curator, or an integration script?"', 'Have them label each step with P/S/C.', 'Give them a new database (e.g., RefSeq, Pfam, Ensembl) and ask them to place it in the flow using the same "who created.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_003', difficulty: 'standard',
          question: 'GenBank, EMBL (European Molecular Biology Laboratory), and DDBJ (DNA Data Bank.',
          hint: 'Revisit the distinction between primary and secondary databases in node.',
          misconception: 'Students believe GenBank, EMBL, and DDBJ are competing databases with different sequences, like different brands of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'GenBank, EMBL (European Molecular Biology Laboratory), and DDBJ (DNA Data Bank of Japan)',
                  options: ['GenBank, EMBL (European Molecular Biology Laboratory), and DDBJ (DNA Data Bank of Japan)', 'Bioinformatics is an interdisciplinary field that integrates computational, mathematical,', 'Primary databases store raw experimental data submitted directly by researchers (e.g.,', 'Structure databases are specialized biological databases that store experimentally'],
                  hint: 'Revisit the distinction between primary and secondary databases in node c11_biotech_cbse_09_002.',
                  misconception: 'Students believe GenBank, EMBL, and DDBJ are competing databases with different sequences, like different brands of the same product.' }
          ],
            remediations: { 'genbank': { steps: ['Show the INSDC website (insdc.org) and the daily data exchange statistics.', 'Demonstrate live: search the same gene in all three databases, note different accession numbers but identical.', 'Have student trace a recent submission (e.g., a 2024 Indian SARS-CoV-2 genome) through all three portals using the.', 'Assign a mini-task: "Find the DDBJ accession for GenBank accession ON123456" to force cross-referencing practice.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_004', difficulty: 'standard',
          question: 'Structure databases are specialized biological databases that store.',
          hint: 'Revisit the peptide bond formation and protein folding concepts from Class 11 Biology.',
          misconception: 'Students often think PDB files contain only atomic coordinates (x,y,z).',
          parts: [
                { id: 'a', prompt: 'You are given a PDB ID "4HHB" (human hemoglobin). Describe the step-by-step procedure to identify the number of polypeptide chains and the presence of any.', answer: 'Go to rcsb.org and enter "4HHB" in the search bar',
                  options: ['Go to rcsb.org and enter "4HHB" in the search bar', 'download the file and count lines', 'PDB files contain only atomic coordinates (x,y,z)'],
                  hint: 'Revisit the peptide bond formation and protein folding concepts from Class 11 Biology (Biomolecules.',
                  misconception: 'Students often think PDB files contain only atomic coordinates (x,y,z).' },
                { id: 'b', prompt: 'Compare PDB and MMDB: Why might a researcher choose MMDB over PDB for a comparative study of protein domains across many structures?', answer: 'MMDB (NCBI) provides pre-computed structural domains (CDD), explicit chemical',
                  options: ['MMDB (NCBI) provides pre-computed structural domains (CDD), explicit chemical', 'PDB files contain only atomic coordinates (x,y,z)'],
                  hint: 'Revisit the peptide bond formation and protein folding concepts from Class 11 Biology (Biomolecules.',
                  misconception: 'Students often think PDB files contain only atomic coordinates (x,y,z).' }
          ],
            remediations: { 'pdb-files-contain-only-atomic': { steps: ['Remediation: 1) Give the student a raw PDB file (e.g., 1HHP.pdb) and ask them to open it in a text editor.', '2) Walk through the first 50 lines: identify HEADER, TITLE, COMPND, SOURCE, KEYWDS, EXPDTA, AUTHOR, REVDAT, JRNL.', '3) Ask: "Which line tells you the experiment type?', 'Which line gives the sequence?" 4) Have them extract the SEQRES for chain A and compare with the ATOM records to spot.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_005', difficulty: 'standard',
          question: 'FASTA format is a text-based sequence representation where the first line.',
          hint: 'Revisit Class 9 Cell Biology (c9_bio_ch1_5) for DNA location and Class 10 Heredity.',
          misconception: 'Students treat GenBank as "just a database" and FASTA as "just a format", not realising GenBank *is* a flat-file format.',
          parts: [
                { id: 'a', prompt: 'A GenBank file shows "LOCUS NM_007294 5592 bp mRNA linear HUM 15-FEB-2024".', answer: 'Tokens: locus-name (NM_007294), length (5592 bp), molecule-type (mRNA), topology',
                  options: ['Tokens: locus-name (NM_007294), length (5592 bp), molecule-type (mRNA), topology', 'mRNA means mitochondrial RNA'],
                  hint: 'Revisit Class 9 Cell Biology (c9_bio_ch1_5) for DNA location and Class 10 Heredity.',
                  misconception: 'Students treat GenBank as "just a database" and FASTA as "just a format", not realising GenBank *is* a flat-file format with rigid column.' }
          ],
            remediations: { 'students-treat-genbank-as-just': { steps: ['Open a real GenBank file (e.g., NC_000001.11) in a text editor.', 'Use a ruler to verify field names end at column 12.', 'Highlight the FEATURES table and manually extract one CDS using join coordinates.', 'Write a 5-line Python script (or use `seqtk`) to convert that GenBank to FASTA.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_09_006', difficulty: 'standard',
          question: 'Sequence alignment is the computational arrangement of two or more biological.',
          hint: 'Revisit c11_biotech_cbse_09_005 (FASTA format) and c10_bio_cbse_04_001 (variation and.',
          misconception: 'Students often think "global alignment is for similar sequences, local for dissimilar ones." This is incorrect: global.',
          parts: [
                { id: 'a', prompt: 'Two protein sequences share 40% identity over their full lengths but have a 90% identical region of 50 amino acids in the middle.', answer: 'Local alignment would yield a higher score for the 50-aa region',
                  options: ['Local alignment would yield a higher score for the 50-aa region', 'global alignment gives a higher score', 'global alignment is for similar sequences, local for dissimilar ones', '"global alignment is for similar sequences, local for dissimilar ones'],
                  hint: 'Revisit c11_biotech_cbse_09_005 (FASTA format) and c10_bio_cbse_04_001 (variation and heredity).',
                  misconception: 'Students often think "global alignment is for similar sequences, local for dissimilar ones." This is incorrect: global alignment is for.' }
          ],
            remediations: { 'global-alignment-is-for-similar': { steps: ['If a student confuses scope with similarity, give them two sequences: SeqA = "MALWMRLLPLLALLALWGPDPAAA" (24 aa) and.', 'Ask: "Which alignment type would show that SeqA is a substring of SeqB?" Guide them to run both mentally: global forces.', 'Then ask: "If these were full-length orthologs from different species, which alignment reflects the true evolutionary.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
