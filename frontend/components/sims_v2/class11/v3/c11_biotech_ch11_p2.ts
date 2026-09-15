import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch11_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch11_p2: SimDef = {
    id: 'v3_c11_biotech_ch11_p2',
    title: 'Programming in Biotechnology · Part 2/2',
    subtitle: 'Code the basics — variables, loops, string slicing — on real sequence data.',
    classLevel: 11, subject: 'biotechnology', topic: 'Programming in Biotechnology · Part 2/2',
    chapters: ['c11_biotech_ch11'],
    nodeIds: ['c11_biotech_cbse_11_007', 'c11_biotech_cbse_11_008', 'c11_biotech_cbse_11_009', 'c11_biotech_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wet-lab biologist learning to automate the boring parts', intro: 'Your lab handed you a genome and a deadline. Excel won\'t save you; a script will.', goal: 'Use basic programming constructs to parse and analyse biological sequence strings.' },
    discovery: {
        question: 'You have a 3-million-letter genome file and need every place a restriction enzyme could cut — a six-letter pattern. A human scanning would take years. What does a ten-line script do differently?',
        options: ['It applies one rule exhaustively — pattern matching doesn\'t get tired or bored at letter 2,999,999', 'It uses AI to guess where cuts probably are', 'It converts the genome into an image and looks visually', 'It samples a few regions and extrapolates the rest'],
        answer: 'It applies one rule exhaustively — pattern matching doesn\'t get tired or bored at letter 2,999,999',
        hook: 'Programming in biology isn\'t cleverness — it\'s applying a simple rule a million times without error.',
    },
    teaching: [
        { title: 'Sequence Manipulation: Transcription and Translation in Code', text: 'Sequence manipulation in biotechnology programming refers to the computational implementation of central dogma processes: transcription (converting a DNA coding strand sequence to mRNA by replacing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_11_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Write and run small scripts that search, count and translate DNA sequences.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_007', title: 'Sequence Manipulation: Transcription and Translation in Code',
          caseStudy: { intro: 'Imagine you have isolated a gene from a soil bacterium in your school lab and sequenced it — now you have a FASTA file with the DNA sequence.',
            decisions: [{ prompt: 'What is the mRNA sequence produced when the DNA coding strand "ATGGCCTAA" is transcribed using Biopython\'s `transcribe()` method?', options: [
                { text: 'The mRNA sequence is "AUGGCCUAA"', outcome: 'The mRNA sequence is "AUGGCCUAA". The `transcribe()` method replaces all \'T\' bases with \'U\' while.' },
                { text: 'TACCGGAUU', outcome: 'Not quite — Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning.', reveals: 'seq' },
                { text: 'input is the coding strand (same sequence as mRNA except T/U)', outcome: 'Not quite — Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning.', reveals: 'seq' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_008', title: 'Algorithm Development: Dynamic Programming for Alignment',
          scaffold: { problem: 'Perform global alignment of two DNA sequences from Indian wheat varieties: SEQ1 = "ATGC" and SEQ2 = "AGC" using match = +1, mismatch = -1.',
            steps: [
            { text: 'Define sequences and scoring. SEQ1 length M=4, SEQ2 length N=3. Match=+1, Mismatch=-1, Gap=-2.' },
            { text: 'Initialize (M+1) x (N+1) matrix S. S(0,0)=0. First row: S(i,0) = i*(-2) for i=1..4.' },
            { text: 'Fill matrix row by row using recurrence S(i,j) = max( S(i-1,j-1) + score(x_i,y_j), S(i-1,j) -2, S(i,j-1) -2 ).' },
            { text: 'Traceback starts at S(4,3)=1 (bottom-right). Follow arrows (max source):' },
            { text: 'Reconstruct alignment by recording moves: diagonal = align both, up = gap in SEQ2, left = gap in SEQ1.', faded: true, blankAnswer: 'Optimal global alignment score = 1. Alignment:' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_009', title: 'Biological Data Formats and Parsing',
          caseStudy: { intro: 'Imagine you download a "gene sequence" file from NCBI and it opens as a wall of text with lines starting with `>`, `LOCUS`, `FEATURES`, or `<sbml>` — how.',
            decisions: [{ prompt: 'A student downloads a file from the Protein Data Bank (PDB) and sees lines beginning with `ATOM`, `HETATM`, `HELIX`, `SHEET`, and `END`.', options: [
                { text: 'The student is incorrect', outcome: 'The student is incorrect. PDB files use `ATOM`/`HETATM` for 3D coordinate records, `HELIX`/`SHEET`.' },
                { text: 'parsing a FASTA file', outcome: 'Not quite — Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line.', reveals: 'parsing-a-fasta-file-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_010', title: 'Bioinformatics Web Services and APIs',
          caseStudy: { intro: 'Imagine you need the nucleotide sequence for the human insulin gene (INS) to design a PCR primer.',
            decisions: [{ prompt: 'What is the primary purpose of a RESTful API in bioinformatics?', options: [
                { text: 'A RESTful API allows programs to query remote biological databases (like NCBI or UniProt)', outcome: 'A RESTful API allows programs to query remote biological databases (like NCBI or UniProt) using.' },
                { text: 'It is used to design website interfaces', outcome: 'Not quite — Students often think that "using an API" means only installing a Python package (e.g., `pip install.', reveals: 'using-an-api-means-only' },
                { text: 'using an API', outcome: 'Not quite — Students often think that "using an API" means only installing a Python package (e.g., `pip install.', reveals: 'using-an-api-means-only' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Programming in Biotechnology · Part 2/2', spots: [
            { id: 's1', label: 'Sequence Manipulation Transcription and Translation in Code', prompt: 'Which idea is this? — Sequence manipulation in biotechnology programming refers to the computational.', answer: 'Sequence Manipulation Transcription and Translation in Code', options: ['Sequence Manipulation Transcription and Translation in Code', 'Algorithm Development Dynamic Programming for Alignment', 'Biological Data Formats and Parsing', 'Bioinformatics Web Services and APIs'] },
            { id: 's2', label: 'Algorithm Development Dynamic Programming for Alignment', prompt: 'Which idea is this? — Dynamic programming for sequence alignment is an algorithmic technique that guarantees.', answer: 'Algorithm Development Dynamic Programming for Alignment', options: ['Algorithm Development Dynamic Programming for Alignment', 'Sequence Manipulation Transcription and Translation in Code', 'Biological Data Formats and Parsing', 'Bioinformatics Web Services and APIs'] },
            { id: 's3', label: 'Biological Data Formats and Parsing', prompt: 'Which idea is this? — Biological data formats are standardized file structures (e.g., FASTA, GenBank, PDB, GFF.', answer: 'Biological Data Formats and Parsing', options: ['Biological Data Formats and Parsing', 'Sequence Manipulation Transcription and Translation in Code', 'Algorithm Development Dynamic Programming for Alignment', 'Bioinformatics Web Services and APIs'] },
            { id: 's4', label: 'Bioinformatics Web Services and APIs', prompt: 'Which idea is this? — Bioinformatics web services and APIs (Application Programming Interfaces) are.', answer: 'Bioinformatics Web Services and APIs', options: ['Bioinformatics Web Services and APIs', 'Sequence Manipulation Transcription and Translation in Code', 'Algorithm Development Dynamic Programming for Alignment', 'Biological Data Formats and Parsing'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your biology club downloads the 4.4-million-base-pair genome of M. tuberculosis as a text file to find all genes starting with ATG and compute GC content in sliding windows. Excel crashes. A member says: \'This is hopeless — bioinformatics programming means writing new algorithms in C, and none of us can do that.\'',
            decisions: [{ prompt: 'What does the task actually require?', options: [
                { text: 'A short script using existing libraries — parse the FASTA, scan for ATG windows, compute GC% — a few dozen lines of Python with Biopython. Real bioinformatics practice is mostly parsing formats, gluing libraries and automating pipelines, not inventing algorithms.', outcome: 'The bottleneck was the biology question (what to look for), not algorithm design; scripting handles the data deluge that crashes Excel.' },
                { text: 'Agree it\'s hopeless — without algorithm-development skills, genome analysis can\'t be done by students.', outcome: 'That confuses computer-science research with bioinformatics practice; most daily work is data wrangling with off-the-shelf tools.', reveals: 'programming-means-new-algorithms' },
                { text: 'Split the file into 50 chunks and have each member search manually — teamwork replaces code.', outcome: 'Manual search across 4.4 million bases is error-prone and unreproducible; a script runs the same pattern search on any genome in seconds.', reveals: 'manual-beats-scripted' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_010', title: 'You made it',
          caseStudy: { intro: 'Once you can loop over a sequence, the genome stops being text and starts being data.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_007', difficulty: 'standard',
          question: 'Sequence manipulation in biotechnology programming refers to the computational.',
          hint: 'Revisit Biopython Seq object creation and method chaining (c11_biotech_cbse_11_003) and.',
          misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG.',
          parts: [
                { id: 'a', prompt: 'What is the mRNA sequence produced when the DNA coding strand "ATGGCCTAA" is transcribed using Biopython\'s `transcribe()` method?', answer: 'The mRNA sequence is "AUGGCCUAA"',
                  options: ['The mRNA sequence is "AUGGCCUAA"', 'TACCGGAUU', 'input is the coding strand (same sequence as mRNA except T/U)', 'that `Seq'],
                  hint: 'Revisit Biopython Seq object creation and method chaining (c11_biotech_cbse_11_003) and practice.',
                  misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG start codon.' },
                { id: 'b', prompt: 'Compare the protein sequences obtained by translating the DNA sequence "ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG" using `translate(table=1)` versus.', answer: 'Table 1 is the standard genetic code',
                  options: ['Table 1 is the standard genetic code', 'no difference', 'that `Seq'],
                  hint: 'Revisit Biopython Seq object creation and method chaining (c11_biotech_cbse_11_003) and practice.',
                  misconception: 'Students believe that `Seq.translate()` automatically finds the correct reading frame by scanning for the first ATG start codon.' }
          ],
            remediations: { 'seq': { steps: ['Show the student `Seq("GATGCC").translate()` output ("DA") and `Seq("ATGGCC").translate()` output ("MA") side by side.', 'Ask them to predict `Seq("TGATGC").translate()` — they\'ll likely say "M" but it\'s "*C" (Stop-Cys) because frame 1.', 'Have them write a loop that slices the sequence at positions 0, 1, 2 and translates each, printing the frame number and.', 'Explain that frame selection (finding the correct ORF) is a separate algorithmic step from translation — Biopython.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_008', difficulty: 'standard',
          question: 'Dynamic programming for sequence alignment is an algorithmic technique that.',
          hint: 'If stuck, revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA) and.',
          misconception: 'Students often believe that the traceback path in Needleman-Wunsch can start at any cell with a high score, similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dynamic programming for sequence alignment is an algorithmic technique that guarantees',
                  options: ['Dynamic programming for sequence alignment is an algorithmic technique that guarantees', 'Programming in bioinformatics refers to the use of computational languages and algorithms', 'Python for Bioinformatics refers to the application of the Python programming', 'Biopython is an open-source Python library that provides specialized modules for'],
                  hint: 'If stuck, revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA) and.',
                  misconception: 'Students often believe that the traceback path in Needleman-Wunsch can start at any cell with a high score, similar to Smith-Waterman.' }
          ],
            remediations: { 'the-traceback-path-in-needleman': { steps: ['Ask the student to write the definition of global alignment: "An alignment that includes every character of both.', 'Have them draw a 3x3 matrix for two 2-base sequences, initialize with cumulative gaps, and fill it.', 'Point to the bottom-right cell and ask: "If we start traceback anywhere else, which characters of the sequences would.', 'Show that starting elsewhere leaves prefixes unaligned, violating the definition.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_009', difficulty: 'standard',
          question: 'Biological data formats are standardized file structures (e.g., FASTA, GenBank.',
          hint: 'Revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA and GenBank Files) and.',
          misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest.',
          parts: [
                { id: 'a', prompt: 'A student downloads a file from the Protein Data Bank (PDB) and sees lines beginning with `ATOM`, `HETATM`, `HELIX`, `SHEET`, and `END`.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'parsing a FASTA file'],
                  hint: 'Revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA and GenBank Files) and practice the.',
                  misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest as sequence.' },
                { id: 'b', prompt: 'Given a FASTA file containing 50 sequences, a student writes `record = SeqIO.read("file.fasta", "fasta")` and gets a `ValueError: More than one record found`.', answer: '`SeqIO.parse()` returns a generator (iterator), not a list',
                  options: ['`SeqIO.parse()` returns a generator (iterator), not a list', 'parsing a FASTA file'],
                  hint: 'Revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA and GenBank Files) and practice the.',
                  misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest as sequence.' },
                { id: 'c', prompt: 'Compare FASTA and GFF3 formats for representing a eukaryotic gene with three exons and two introns.', answer: 'GFF3 natively represents exon-intron structure',
                  options: ['GFF3 natively represents exon-intron structure', 'parsing a FASTA file'],
                  hint: 'Revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA and GenBank Files) and practice the.',
                  misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest as sequence.' }
          ],
            remediations: { 'parsing-a-fasta-file-means': { steps: ['Have the student open a FASTA file in `less` (not an editor) and press `j`/`k` to see raw line endings — point out `\\r`.', 'Give them a 3-record FASTA with a blank line between records and a comment line starting with `;` — ask them to trace.', 'Show `SeqIO.parse()` source (in `Bio/SeqIO/FastaIO.py`) — it uses `for line in handle:` streaming, a `state` variable.', 'Finally, give a 500 MB FASTA.gz file and ask them to count records without loading it fully — they must use.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "SBML (Systems Biology Markup Language) is just XML with a biology vocabulary; we could replace it with JSON and lose no information.".', answer: 'The claim is false',
                  options: ['The claim is false', 'parsing a FASTA file'],
                  hint: 'Revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA and GenBank Files) and practice the.',
                  misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest as sequence.' },
                { id: 'b', prompt: 'Design a minimal "custom format" specification for storing a *single* protein sequence with: (a) UniProt accession, (b) organism name, (c) GO term annotations.', answer: 'Example file (`P12345.prot`): ```',
                  options: ['Example file (`P12345.prot`): ```', 'parsing a FASTA file'],
                  hint: 'Revisit c11_biotech_cbse_11_006 (File Handling: Reading FASTA and GenBank Files) and practice the.',
                  misconception: 'Students believe "parsing a FASTA file" means simply splitting on `>` and taking the first line as header and the rest as sequence.' }
          ],
            remediations: { 'parsing-a-fasta-file-means': { steps: ['Have the student open a FASTA file in `less` (not an editor) and press `j`/`k` to see raw line endings — point out `\\r`.', 'Give them a 3-record FASTA with a blank line between records and a comment line starting with `;` — ask them to trace.', 'Show `SeqIO.parse()` source (in `Bio/SeqIO/FastaIO.py`) — it uses `for line in handle:` streaming, a `state` variable.', 'Finally, give a 500 MB FASTA.gz file and ask them to count records without loading it fully — they must use.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_010', difficulty: 'standard',
          question: 'Bioinformatics web services and APIs (Application Programming Interfaces) are.',
          hint: 'Revisit the Biopython `SeqIO.parse()` and `Entrez` email registration examples from.',
          misconception: 'Students often think that "using an API" means only installing a Python package (e.g., `pip install biopython`) and.',
          parts: [
                { id: 'a', prompt: 'Given the accession number "NM_000207" (human insulin mRNA), write the exact Biopython code snippet to fetch the FASTA record and print the sequence length.', answer: '```python from Bio import Entrez, SeqIO handle = Entrez.efetch(db="nucleotide",',
                  options: ['```python from Bio import Entrez, SeqIO handle = Entrez.efetch(db="nucleotide",', 'nucleotide', 'NM_000207', ', retmode='],
                  hint: 'Revisit the Biopython `SeqIO.parse()` and `Entrez` email registration examples from.',
                  misconception: 'Students often think that "using an API" means only installing a Python package (e.g., `pip install biopython`) and calling a function.' },
                { id: 'b', prompt: 'Compare the data returned by a UniProt REST query for entry P01308 (human insulin) in FASTA format vs. JSON format.', answer: 'FASTA returns only the header and sequence',
                  options: ['FASTA returns only the header and sequence', 'using an API', '"using an API" means only installing a Python package (e'],
                  hint: 'Revisit the Biopython `SeqIO.parse()` and `Entrez` email registration examples from.',
                  misconception: 'Students often think that "using an API" means only installing a Python package (e.g., `pip install biopython`) and calling a function.' }
          ],
            remediations: { 'using-an-api-means-only': { steps: ['Have the student manually construct the raw URL for an NCBI E-utilities query (e.g.', 'Then use `requests.get()` in Python to fetch the same URL, print the status code, headers, and first 200 characters.', 'Finally, show how `Entrez.efetch()` is just a wrapper around this same HTTP call, and why setting `email` and `api_key`.', 'This concrete comparison demystifies the library and reinforces the client-server model.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
