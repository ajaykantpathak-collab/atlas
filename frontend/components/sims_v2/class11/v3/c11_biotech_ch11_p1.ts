import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch11_p1: SimDef = {
    id: 'v3_c11_biotech_ch11_p1',
    title: 'Programming in Biotechnology · Part 1/2',
    subtitle: 'Code the basics — variables, loops, string slicing — on real sequence data.',
    classLevel: 11, subject: 'biotechnology', topic: 'Programming in Biotechnology · Part 1/2',
    chapters: ['c11_biotech_ch11'],
    nodeIds: ['c11_biotech_cbse_11_001', 'c11_biotech_cbse_11_002', 'c11_biotech_cbse_11_003', 'c11_biotech_cbse_11_004', 'c11_biotech_cbse_11_005', 'c11_biotech_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wet-lab biologist learning to automate the boring parts', intro: 'Your lab handed you a genome and a deadline. Excel won\'t save you; a script will.', goal: 'Use basic programming constructs to parse and analyse biological sequence strings.' },
    discovery: {
        question: 'You have a 3-million-letter genome file and need every place a restriction enzyme could cut — a six-letter pattern. A human scanning would take years. What does a ten-line script do differently?',
        options: ['It applies one rule exhaustively — pattern matching doesn\'t get tired or bored at letter 2,999,999', 'It uses AI to guess where cuts probably are', 'It converts the genome into an image and looks visually', 'It samples a few regions and extrapolates the rest'],
        answer: 'It applies one rule exhaustively — pattern matching doesn\'t get tired or bored at letter 2,999,999',
        hook: 'Programming in biology isn\'t cleverness — it\'s applying a simple rule a million times without error.',
    },
    teaching: [
        { title: 'Role of Programming in Bioinformatics', text: 'Programming in bioinformatics refers to the use of computational languages and algorithms to store, retrieve, analyze, and visualize large-scale biological data (such as DNA/protein sequences.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_11_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Write and run small scripts that search, count and translate DNA sequences.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_001', title: 'Role of Programming in Bioinformatics',
          caseStudy: { intro: 'Imagine you have just downloaded the complete genome sequence of *Mycobacterium tuberculosis* (4.4 million base pairs) as a text file.',
            decisions: [{ prompt: 'List the four major challenges of high-throughput biological data mentioned in the NCERT text that make manual analysis impossible.', options: [
                { text: 'The four challenges are: storage, visualisation, transfer, and analysis/interpretation of', outcome: 'The four challenges are: storage, visualisation, transfer, and analysis/interpretation of massive.' },
                { text: 'sequencing cost, sample preparation, ethics, publishing', outcome: 'Not quite — Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing.', reveals: 'bioinformatics-programming-means-inventing-new' },
                { text: 'bioinformatics programming', outcome: 'Not quite — Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing.', reveals: 'bioinformatics-programming-means-inventing-new' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_002', title: 'Python for Bioinformatics: Basics and Libraries',
          caseStudy: { intro: 'Imagine you are a summer intern at a Bengaluru-based genomics startup.',
            decisions: [{ prompt: 'What is the primary reason Python is preferred over Perl for modern bioinformatics workflows, according to the NCERT textbook?', options: [
                { text: 'The NCERT highlights three reasons: (i) clear meaning of terms and statement structure,', outcome: 'The NCERT highlights three reasons: (i) clear meaning of terms and statement structure, (ii).' },
                { text: 'Python is faster than Perl', outcome: 'Not quite — Students often believe they must master the entire Python standard library before touching.', reveals: 'they-must-master-the-entire' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_003', title: 'Biopython: Modules and Applications',
          caseStudy: { intro: 'Imagine you are a research intern at ICAR-National Rice Research Institute, Cuttack, and your supervisor hands you a FASTA file containing 2,500 expressed.',
            decisions: [{ prompt: 'List the five most commonly used Biopython modules and state one primary function of each.', options: [
                { text: 'Correct answer: (1) Bio.SeqIO', outcome: 'Correct answer: (1) Bio.SeqIO — parsing/writing sequence file formats (FASTA, GenBank); (2) Bio.Seq.' },
                { text: 'Bio.BLAST', outcome: 'Not quite — Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records.', reveals: 'seqio' },
                { text: 'Bio.PDB', outcome: 'Not quite — Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records.', reveals: 'seqio' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_004', title: 'Perl for Bioinformatics: Pattern Matching and Regex',
          caseStudy: { intro: 'Imagine you have a 5000-base-pair DNA sequence from a patient sample and need to find all occurrences of the EcoRI restriction site (GAATTC) to design.',
            decisions: [{ prompt: 'What does the Perl regex pattern `/A[TC]G/` match in a DNA sequence, and how many different 3-base sequences can it match?', options: [
                { text: 'The pattern `/A[TC]G/` matches any 3-base sequence starting with A, ending with G, and', outcome: 'The pattern `/A[TC]G/` matches any 3-base sequence starting with A, ending with G, and having.' },
                { text: 'matches ATG only', outcome: 'Not quite — Students believe the dot `.` metacharacter in regex matches "any character including newline".', reveals: 'the-dot' },
                { text: 'matches 4 sequences', outcome: 'Not quite — Students believe the dot `.` metacharacter in regex matches "any character including newline".', reveals: 'the-dot' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_11_005', title: 'R for Statistical Analysis in Biology',
          scaffold: { problem: 'A biologist measures the length (in µm) of 10 pollen grains from Species A: 22, 25, 24, 23, 26, 24, 25, 23, 24, 25.',
            steps: [
            { text: 'Create a vector in R with the 10 measurements: `pollen_A <- c(22, 25, 24, 23, 26, 24, 25, 23, 24, 25)`.' },
            { text: 'Compute the mean using `mean(pollen_A)` which sums all values and divides by n=10.' },
            { text: 'Compute the median using `median(pollen_A)` which sorts the data and finds the middle value (average of 5th and 6th).' },
            { text: 'Compute the standard deviation using `sd(pollen_A)` which calculates the square root of the average squared deviation.' },
            { text: 'Compute the standard error of the mean as `sd(pollen_A) / sqrt(length(pollen_A))` which estimates how far the sample.' },
            { text: 'Interpret: The standard error (approx 0.37 µm) indicates that if we repeated this sampling many times, the sample means.', faded: true, blankAnswer: 'Mean = 24.1 µm, Median = 24 µm, SD ≈ 1.10 µm, SE ≈ 0.35 µm.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_006', title: 'File Handling: Reading FASTA and GenBank Files',
          caseStudy: { intro: 'Imagine you have just downloaded the *BRCA1* gene sequence from NCBI in two formats: a FASTA file showing only the nucleotide sequence and a GenBank file.',
            decisions: [{ prompt: 'What is the primary structural difference between a FASTA file and a GenBank file that affects how you parse them programmatically?', options: [
                { text: 'FASTA files consist of a single-line header starting with \'>\' followed by the sequence', outcome: 'FASTA files consist of a single-line header starting with \'>\' followed by the sequence (possibly.' },
                { text: 'both are just text files with sequences', outcome: 'Not quite — Students often treat FASTA and GenBank as plain text files and attempt to parse them with basic.', reveals: 'students-often-treat-fasta-and' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'Programming in Biotechnology · Part 1/2', spots: [
            { id: 's1', label: 'Role of Programming in Bioinformatics', prompt: 'Which idea is this? — Programming in bioinformatics refers to the use of computational languages and algorithms.', answer: 'Role of Programming in Bioinformatics', options: ['Role of Programming in Bioinformatics', 'Python for Bioinformatics Basics and Libraries', 'Biopython Modules and Applications', 'Perl for Bioinformatics Pattern Matching and Regex'] },
            { id: 's2', label: 'Python for Bioinformatics Basics and Libraries', prompt: 'Which idea is this? — Python for Bioinformatics refers to the application of the Python programming.', answer: 'Python for Bioinformatics Basics and Libraries', options: ['Python for Bioinformatics Basics and Libraries', 'Role of Programming in Bioinformatics', 'Biopython Modules and Applications', 'Perl for Bioinformatics Pattern Matching and Regex'] },
            { id: 's3', label: 'Biopython Modules and Applications', prompt: 'Which idea is this? — Biopython is an open-source Python library that provides specialized modules for.', answer: 'Biopython Modules and Applications', options: ['Biopython Modules and Applications', 'Role of Programming in Bioinformatics', 'Python for Bioinformatics Basics and Libraries', 'Perl for Bioinformatics Pattern Matching and Regex'] },
            { id: 's4', label: 'Perl for Bioinformatics Pattern Matching and Regex', prompt: 'Which idea is this? — Perl regular expressions (regex) are a powerful pattern-matching syntax used to search.', answer: 'Perl for Bioinformatics Pattern Matching and Regex', options: ['Perl for Bioinformatics Pattern Matching and Regex', 'Role of Programming in Bioinformatics', 'Python for Bioinformatics Basics and Libraries', 'Biopython Modules and Applications'] },
            { id: 's5', label: 'R for Statistical Analysis in Biology', prompt: 'Which idea is this? — R is a free, open-source programming language and environment specifically designed for.', answer: 'R for Statistical Analysis in Biology', options: ['R for Statistical Analysis in Biology', 'Role of Programming in Bioinformatics', 'Python for Bioinformatics Basics and Libraries', 'Biopython Modules and Applications'] },
            { id: 's6', label: 'File Handling Reading FASTA and GenBank Files', prompt: 'Which idea is this? — File handling in bioinformatics refers to the programmatic reading and parsing.', answer: 'File Handling Reading FASTA and GenBank Files', options: ['File Handling Reading FASTA and GenBank Files', 'Role of Programming in Bioinformatics', 'Python for Bioinformatics Basics and Libraries', 'Biopython Modules and Applications'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your biology club downloads the 4.4-million-base-pair genome of M. tuberculosis as a text file to find all genes starting with ATG and compute GC content in sliding windows. Excel crashes. A member says: \'This is hopeless — bioinformatics programming means writing new algorithms in C, and none of us can do that.\'',
            decisions: [{ prompt: 'What does the task actually require?', options: [
                { text: 'A short script using existing libraries — parse the FASTA, scan for ATG windows, compute GC% — a few dozen lines of Python with Biopython. Real bioinformatics practice is mostly parsing formats, gluing libraries and automating pipelines, not inventing algorithms.', outcome: 'The bottleneck was the biology question (what to look for), not algorithm design; scripting handles the data deluge that crashes Excel.' },
                { text: 'Agree it\'s hopeless — without algorithm-development skills, genome analysis can\'t be done by students.', outcome: 'That confuses computer-science research with bioinformatics practice; most daily work is data wrangling with off-the-shelf tools.', reveals: 'programming-means-new-algorithms' },
                { text: 'Split the file into 50 chunks and have each member search manually — teamwork replaces code.', outcome: 'Manual search across 4.4 million bases is error-prone and unreproducible; a script runs the same pattern search on any genome in seconds.', reveals: 'manual-beats-scripted' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Once you can loop over a sequence, the genome stops being text and starts being data.',
            decisions: [{ prompt: 'What comes next? Programming in Biotechnology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Programming in Biotechnology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_001', difficulty: 'standard',
          question: 'Programming in bioinformatics refers to the use of computational languages and.',
          hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) and c10_bio_cbse_04_001.',
          misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Python is used in bioinformatics only because it is free and open-source." Explain why this statement is incomplete, citing two specific.', answer: 'The textbook states Python is popular because: (i) clear syntax/readability',
                  options: ['The textbook states Python is popular because: (i) clear syntax/readability', 'bioinformatics programming'],
                  hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' },
                { id: 'b', prompt: 'A researcher has 200 RNA-seq samples (each 5 GB) and needs to perform differential expression analysis followed by pathway enrichment visualization.', answer: 'R is more appropriate',
                  options: ['R is more appropriate', 'bioinformatics programming'],
                  hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' },
                { id: 'c', prompt: 'Compare the roles of "minimum information standards," "XML-based file formats," and "ontologies (GO, SBO)" in systems biology data management.', answer: 'Minimum information defines *what* metadata must accompany data (e.g., MIAME for',
                  options: ['Minimum information defines *what* metadata must accompany data (e.g., MIAME for', 'formats', 'bioinformatics programming'],
                  hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' }
          ],
            remediations: { 'bioinformatics-programming-means-inventing-new': { steps: ['Show the student a 5-line Python script using Biopython to parse a FASTA file and print sequence lengths—emphasize *no.', 'Contrast with a 200-line C implementation of Needleman-Wunsch (algorithm development).', 'Assign a micro-task: "Download a FASTA file from NCBI, write a script to count sequences and average length." 4.', 'Debrief: "You just did bioinformatics programming.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since GUI tools like BLAST and ClustalW exist, biologists do not need to learn programming." Use the textbook\'s perspective.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'bioinformatics programming'],
                  hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) and c10_bio_cbse_04_001 (Accumulation.',
                  misconception: 'Students often believe "bioinformatics programming" means *inventing new algorithms* (like writing a new alignment algorithm from scratch).' }
          ],
            remediations: { 'bioinformatics-programming-means-inventing-new': { steps: ['Show the student a 5-line Python script using Biopython to parse a FASTA file and print sequence lengths—emphasize *no.', 'Contrast with a 200-line C implementation of Needleman-Wunsch (algorithm development).', 'Assign a micro-task: "Download a FASTA file from NCBI, write a script to count sequences and average length." 4.', 'Debrief: "You just did bioinformatics programming.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_002', difficulty: 'standard',
          question: 'Python for Bioinformatics refers to the application of the Python programming.',
          hint: 'If stuck, revisit "How to install Python and run a script" from any introductory.',
          misconception: 'Students often believe they must master the entire Python standard library before touching bioinformatics.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Python for Bioinformatics refers to the application of the Python programming',
                  options: ['Python for Bioinformatics refers to the application of the Python programming', 'Programming in bioinformatics refers to the use of computational languages and algorithms', 'Biopython is an open-source Python library that provides specialized modules for', 'Perl regular expressions (regex) are a powerful pattern-matching syntax used to search,'],
                  hint: 'If stuck, revisit "How to install Python and run a script" from any introductory programming.',
                  misconception: 'Students often believe they must master the entire Python standard library before touching bioinformatics.' }
          ],
            remediations: { 'they-must-master-the-entire': { steps: ['Show the student a 10-line script that reads a FASTA file and prints GC% (using Biopython).', 'Have them run it on a provided 5-sequence file.', 'Ask them to modify only the print statement to write CSV instead.', 'Explain that every bioinformatics script follows the same pattern: parse → compute → output.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_003', difficulty: 'standard',
          question: 'Biopython is an open-source Python library that provides specialized modules.',
          hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and practice file I/O with plain Python.',
          misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records.',
          parts: [
                { id: 'a', prompt: 'List the five most commonly used Biopython modules and state one primary function of each.', answer: 'Correct answer: (1) Bio.SeqIO',
                  options: ['Correct answer: (1) Bio.SeqIO', 'Bio.BLAST', 'Bio.PDB', 'file.fasta'],
                  hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and practice file I/O with plain Python: `with.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' },
                { id: 'b', prompt: 'Compare and contrast parsing a GenBank file with `SeqIO.parse()` versus manually splitting lines by "//" delimiter.', answer: 'Correct answer: `SeqIO.parse("file.gb", "genbank")` returns an iterator yielding',
                  options: ['Correct answer: `SeqIO.parse("file.gb", "genbank")` returns an iterator yielding', 'both are equivalent for simple tasks', 'file.fasta', '`SeqIO'],
                  hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and practice file I/O with plain Python: `with.',
                  misconception: 'Students believe `SeqIO.parse()` returns a list of SeqRecord objects, so they write `records = SeqIO.parse("file.fasta", "fasta")` followed.' }
          ],
            remediations: { 'seqio': { steps: ['Show the error in a REPL: `>>> from Bio import SeqIO; r = SeqIO.parse("test.fasta", "fasta"); r[0]` → TypeError.', 'Explain `SeqIO.parse()` returns a generator (iterator) that yields one record at a time — like a conveyor belt, not.', 'Demonstrate three correct patterns: (a) `for record in SeqIO.parse(...):` — for streaming processing; (b) `records.', 'Give a 50 MB FASTA file and have them test both approaches; the list version will hang or crash, the loop version.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_004', difficulty: 'standard',
          question: 'Perl regular expressions (regex) are a powerful pattern-matching syntax used.',
          hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and translate a simple Python loop/print.',
          misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write.',
          parts: [
                { id: 'a', prompt: 'Write a Perl regex pattern with capture groups to extract the recognition site and the overhang sequence from a restriction enzyme description string: `"EcoRI.', answer: 'Pattern: `/(\\w+):\\s*(\\w)\\^(\\w+)/`',
                  options: ['Pattern: `/(\\w+):\\s*(\\w)\\^(\\w+)/`', 'any character including newline', 'the dot `'],
                  hint: 'Revisit c11_biotech_cbse_11_002 (Python basics) and translate a simple Python loop/print script.',
                  misconception: 'Students believe the dot `.` metacharacter in regex matches "any character including newline" by default, and write patterns like.' }
          ],
            remediations: { 'the-dot': { steps: ['Show the student a wrapped FASTA sequence (e.g., 80 chars/line) containing an ORF split across two lines.', 'Have them run their regex `/ATG.*?TAA/` without `/s` — it returns no match.', 'Explain: "The dot stops at newline.', 'The ORF is there but broken by line wrapping." 4.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_005', difficulty: 'standard',
          question: 'R is a free, open-source programming language and environment specifically.',
          hint: 'Revisit Class 10 Statistics: measures of central tendency, dispersion, and the concept.',
          misconception: 'Students often think R is just a "statistics calculator" like a scientific calculator with more buttons.',
          parts: [
                { id: 'a', prompt: 'What is the full form of R in the context of the programming language named R, and who developed it?', answer: 'R is named after its developers Robert Gentleman and Robert Ihaka',
                  options: ['R is named after its developers Robert Gentleman and Robert Ihaka', 'R stands for Regression', 'developed by Ross Ihaka', 'statistics calculator'],
                  hint: 'Revisit Class 10 Statistics: measures of central tendency, dispersion, and the concept.',
                  misconception: 'Students often think R is just a "statistics calculator" like a scientific calculator with more buttons.' },
                { id: 'b', prompt: 'Explain why R is preferred over general-purpose languages like Python for certain biological statistical analyses, even though Python has libraries like SciPy.', answer: 'R was built by statisticians for statistics',
                  options: ['R was built by statisticians for statistics', 'R is free', 'R has more packages', 'statistics calculator'],
                  hint: 'Revisit Class 10 Statistics: measures of central tendency, dispersion, and the concept.',
                  misconception: 'Students often think R is just a "statistics calculator" like a scientific calculator with more buttons.' },
                { id: 'c', prompt: 'Given a CSV file "gene_expression.csv" with columns "SampleID", "Condition" (Cancer/Normal), and "GeneX_Expression", write the R code to read the file, compute.', answer: '```r data <- read.csv("gene_expression.csv") mean_cancer <-',
                  options: ['```r data <- read.csv("gene_expression.csv") mean_cancer <-', 'gene_expression.csv', 'Cancer', 'Normal'],
                  hint: 'Revisit Class 10 Statistics: measures of central tendency, dispersion, and the concept.',
                  misconception: 'Students often think R is just a "statistics calculator" like a scientific calculator with more buttons.' },
                { id: 'd', prompt: 'Compare the output of `summary()` on a numeric vector in R with the output of `describe()` from the psych package.', answer: '`summary()` gives min, 1st quartile, median, mean, 3rd quartile, max',
                  options: ['`summary()` gives min, 1st quartile, median, mean, 3rd quartile, max', 'more numbers', 'statistics calculator', 'only lists "more numbers" misses the analytical purpose of those moments'],
                  hint: 'Revisit Class 10 Statistics: measures of central tendency, dispersion, and the concept.',
                  misconception: 'Students often think R is just a "statistics calculator" like a scientific calculator with more buttons.' }
          ],
            remediations: { 'r-is-just-a-statistics': { steps: ['If a student exhibits this misconception: 1) Show them a reproducible R script (.R file) that loads data, performs.', '2) Demonstrate that typing commands in the console leaves no record; have them run `history()` to see it\'s temporary.', '3) Guide them to install base R first, then RStudio, and create an R Project to organize files.', '4) Assign a task that requires re-running the analysis next week; they\'ll realize the script is essential.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_11_006', difficulty: 'standard',
          question: 'File handling in bioinformatics refers to the programmatic reading and parsing.',
          hint: 'Revisit Python file I/O and loop constructs in c11_biotech_cbse_11_002, and Biopython.',
          misconception: 'Students often treat FASTA and GenBank as plain text files and attempt to parse them with basic string operations.',
          parts: [
                { id: 'a', prompt: 'Why is using Biopython\'s `SeqIO.parse()` preferred over manually splitting a FASTA file by \'>\' and newlines?', answer: '`SeqIO.parse()` correctly handles multi-line sequences, varying header formats,',
                  options: ['`SeqIO.parse()` correctly handles multi-line sequences, varying header formats,', 'manual splitting is faster'],
                  hint: 'Revisit Python file I/O and loop constructs in c11_biotech_cbse_11_002, and Biopython installation.',
                  misconception: 'Students often treat FASTA and GenBank as plain text files and attempt to parse them with basic string operations (split, regex), ignoring.' }
          ],
            remediations: { 'students-often-treat-fasta-and': { steps: ['If a student attempts manual parsing, give them a FASTA file where one sequence spans 5 lines and a header contains.', 'Ask them to extract the full sequence with their method—they will get only the first line.', 'Then show `SeqIO.parse()` returning the complete concatenated sequence.', 'For GenBank, provide a record with a CDS feature spanning a `join(100..200,300..400)` location and a `translation`.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
