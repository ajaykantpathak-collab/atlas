import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch05_p2: SimDef = {
    id: 'v3_c12_biotech_ch05_p2',
    title: 'Genomics · Part 2/2',
    subtitle: 'Three billion letters, no index — genomics is the art of making it readable.',
    classLevel: 12, subject: 'biotechnology', topic: 'Genomics · Part 2/2',
    chapters: ['c12_biotech_ch05'],
    nodeIds: ['c12_biotech_cbse_05_007', 'c12_biotech_cbse_05_008', 'c12_biotech_cbse_05_009', 'c12_biotech_cbse_05_010', 'c12_biotech_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genome mapper', intro: 'Sequencing gave us the letters; genomics gives us the map — and a map is what makes letters useful.', goal: 'Differentiate genome from gene and explain what structural genomics reveals.' },
    discovery: {
        question: 'You\'re handed a 3-billion-letter instruction manual — no page numbers, no headings, sentences run together. What does structural genomics build first?',
        options: ['The table of contents — physical maps of where genes sit and how chromosomes are organised', 'The index of protein functions — what every gene does in the cell', 'The list of mutations — every difference between individuals', 'The glossary — definitions of every DNA word'],
        answer: 'The table of contents — physical maps of where genes sit and how chromosomes are organised',
        hook: 'Before you can ask what a gene does, you must know where it is — structural genomics maps the genome\'s architecture (gene positions, chromatin, rearrangements) so functional questions become askable.',
    },
    teaching: [
        { title: 'Bioinformatics: Biological Databases and Analysis Tools', text: 'Bioinformatics is the interdisciplinary science that creates, maintains, and analyses biological databases and computational tools to store, retrieve, and interpret genomic, transcriptomic, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_05_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Sort genome from gene, then map the genome: define the complete DNA set versus individual coding units, and use structural genomics to locate genes and explain why chromosome 21 maps to Down syndrome.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_007', title: 'Bioinformatics: Biological Databases and Analysis Tools',
          caseStudy: { intro: 'Imagine you have just sequenced a novel gene from a drought-tolerant millet variety grown in Rajasthan.',
            decisions: [{ prompt: 'Name the three major primary nucleotide sequence databases that form the International Nucleotide Sequence Database Collaboration (INSDC).', options: [
                { text: 'The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)', outcome: 'The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan).' },
                { text: 'the entire internet', outcome: 'Not quite — Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top.', reveals: 'blast-searches-the-entire-internet' },
                { text: 'all known sequences', outcome: 'Not quite — Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top.', reveals: 'blast-searches-the-entire-internet' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_008', title: 'BLAST: Sequence Similarity Searching Algorithm',
          scaffold: { problem: 'A researcher runs blastp with a 250-aa query against the non-redundant protein database (nr, effective length n = 1.2×10^8 aa).',
            steps: [
            { text: 'Identify given values: S=85, λ=0.267, K=0.041, m=250 (effective query length ≈ actual length for long queries).' },
            { text: 'Compute bit score using S\' = (λS - ln K) / ln 2. λS = 0.267 × 85 = 22.695. ln K = ln(0.041) = -3.194.' },
            { text: 'Compute E-value using E = m n 2^(-S\'). 2^(-S\') = 2^(-37.36) = 6.03×10^(-12). m n = 250 × 1.2×10^8 = 3.0×10^10.' },
            { text: 'Alternatively use E = K m n e^(-λS). e^(-λS) = e^(-22.695) = 1.38×10^(-10). K m n = 0.041 × 3.0×10^10 = 1.23×10^9.' },
            { text: 'Compare E=0.18 with threshold 0.001. Since 0.18 > 0.001, NOT statistically significant at this cutoff.', faded: true, blankAnswer: 'Bit score ≈ 37.4 bits; E-value ≈ 0.18; Not significant at.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_009', title: 'Genome Annotation: Gene Prediction and Function Assignment',
          caseStudy: { intro: 'Imagine you have just received the complete DNA sequence of a newly discovered drought-tolerant millet variety — 500 Mb of raw A, T, G, C letters.',
            decisions: [{ prompt: 'Define "genome annotation" and list the two broad categories of computational gene prediction methods.', options: [
                { text: 'Genome annotation is the process of identifying gene locations and assigning functions in', outcome: 'Genome annotation is the process of identifying gene locations and assigning functions in.' },
                { text: 'annotation is just BLAST', outcome: 'Not quite — Students believe that "gene prediction" and "BLAST search" are the same thing.', reveals: 'gene-prediction-and-blast-search' },
                { text: 'PCR and sequencing', outcome: 'Not quite — Students believe that "gene prediction" and "BLAST search" are the same thing.', reveals: 'gene-prediction-and-blast-search' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_010', title: 'Proteomics: Concept and Two-Hybrid Techniques',
          caseStudy: { intro: 'Imagine you have identified a novel human kinase from a genome sequencing project (c12_biotech_cbse_05_006) and you need to find its binding partners in the.',
            decisions: [{ prompt: 'Define "proteome" and state one fundamental way it differs from the genome of the same organism.', options: [
                { text: 'The proteome is the entire complement of proteins expressed by a genome, cell, tissue, or', outcome: 'The proteome is the entire complement of proteins expressed by a genome, cell, tissue, or organism.' },
                { text: 'all proteins encoded by the genome', outcome: 'Not quite — **Misconception:** "In Y2H, if the bait protein activates the reporter on its own.', reveals: 'misconception-in-y2h' },
                { text: 'proteome is the protein version of genome', outcome: 'Not quite — **Misconception:** "In Y2H, if the bait protein activates the reporter on its own.', reveals: 'misconception-in-y2h' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_011', title: 'Metabolomics: Concept and Analytical Approaches',
          caseStudy: { intro: 'Imagine a doctor trying to diagnose a metabolic disorder like diabetes not just by measuring blood glucose but by profiling hundreds of small molecules in.',
            decisions: [{ prompt: 'What is the metabolome, and how does it differ from the genome, transcriptome, and proteome in terms of molecular composition and dynamic.', options: [
                { text: 'The metabolome is the complete set of small-molecule metabolites (typically <1.5 kDa)', outcome: 'The metabolome is the complete set of small-molecule metabolites (typically <1.5 kDa) such.' },
                { text: 'metabolites are small molecules', outcome: 'Not quite — Students often think metabolomics is just "measuring many metabolites" and confuse it with targeted.', reveals: 'metabolomics-is-just-measuring-many' },
                { text: 'measuring many metabolites', outcome: 'Not quite — Students often think metabolomics is just "measuring many metabolites" and confuse it with targeted.', reveals: 'metabolomics-is-just-measuring-many' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Genomics · Part 2/2', spots: [
            { id: 's1', label: 'Bioinformatics Biological Databases and Analysis Tools', prompt: 'Which idea is this? — Bioinformatics is the interdisciplinary science that creates, maintains, and analyses.', answer: 'Bioinformatics Biological Databases and Analysis Tools', options: ['Bioinformatics Biological Databases and Analysis Tools', 'BLAST Sequence Similarity Searching Algorithm', 'Genome Annotation Gene Prediction and Function Assignment', 'Proteomics Concept and Two-Hybrid Techniques'] },
            { id: 's2', label: 'BLAST Sequence Similarity Searching Algorithm', prompt: 'Which idea is this? — BLAST (Basic Local Alignment Search Tool) is a heuristic algorithm for rapid sequence.', answer: 'BLAST Sequence Similarity Searching Algorithm', options: ['BLAST Sequence Similarity Searching Algorithm', 'Bioinformatics Biological Databases and Analysis Tools', 'Genome Annotation Gene Prediction and Function Assignment', 'Proteomics Concept and Two-Hybrid Techniques'] },
            { id: 's3', label: 'Genome Annotation Gene Prediction and Function Assignment', prompt: 'Which idea is this? — Genome annotation is the process of identifying the locations of genes and other.', answer: 'Genome Annotation Gene Prediction and Function Assignment', options: ['Genome Annotation Gene Prediction and Function Assignment', 'Bioinformatics Biological Databases and Analysis Tools', 'BLAST Sequence Similarity Searching Algorithm', 'Proteomics Concept and Two-Hybrid Techniques'] },
            { id: 's4', label: 'Proteomics Concept and Two-Hybrid Techniques', prompt: 'Which idea is this? — Proteomics is the large-scale study of the complete set of proteins (proteome) expressed.', answer: 'Proteomics Concept and Two-Hybrid Techniques', options: ['Proteomics Concept and Two-Hybrid Techniques', 'Bioinformatics Biological Databases and Analysis Tools', 'BLAST Sequence Similarity Searching Algorithm', 'Genome Annotation Gene Prediction and Function Assignment'] },
            { id: 's5', label: 'Metabolomics Concept and Analytical Approaches', prompt: 'Which idea is this? — Metabolomics is the comprehensive study of the complete set of small-molecule metabolites.', answer: 'Metabolomics Concept and Analytical Approaches', options: ['Metabolomics Concept and Analytical Approaches', 'Bioinformatics Biological Databases and Analysis Tools', 'BLAST Sequence Similarity Searching Algorithm', 'Genome Annotation Gene Prediction and Function Assignment'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a bioinformatics club poster, a student finds that onion\'s genome (~16,000 Mb) is five times the human genome (~3,200 Mb) — and declares onions must be five times \'more complex\' than people.',
            decisions: [{ prompt: 'Does the data support her claim?', options: [
                { text: 'No — genome size (C-value) tracks non-coding and repetitive DNA, not gene count: onion packs ~30,000 genes into 16,000 Mb while humans fit ~20,000 into 3,200 Mb; rice even beats humans on gene number with a far smaller genome.', outcome: 'The C-value paradox: complexity lives in regulation and splicing, not raw DNA tonnage — gene density, not genome size, is the meaningful comparison.' },
                { text: 'Yes — a genome is just the sum of an organism\'s genes, so five times the DNA means roughly five times the genes.', outcome: 'Genome ≠ gene set: it also holds introns, regulatory regions, repeats and organellar DNA, which dominate eukaryotic size differences.', reveals: 'genome-is-gene-set' },
                { text: 'No — but only because the human nuclear chromosomes were counted without mitochondrial DNA, which would close the gap.', outcome: 'Organellar DNA is part of the genome but tiny; even including it, the paradox stands — size still fails to predict gene number.', reveals: 'size-gap-is-organelles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'You can now navigate a genome instead of drowning in it. Genome-vs-gene and mapping concepts feed board answers — and underpin bioinformatics, one of the fastest-growing career fields.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_007', difficulty: 'standard',
          question: 'Bioinformatics is the interdisciplinary science that creates, maintains, and.',
          hint: 'Revisit c11_biotech_cbse_09_002 (database classification) and c11_biotech_cbse_09_005.',
          misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99%.',
          parts: [
                { id: 'a', prompt: 'Name the three major primary nucleotide sequence databases that form the International Nucleotide Sequence Database Collaboration (INSDC) and state the.', answer: 'The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)',
                  options: ['The three databases are GenBank (USA), EMBL-EBI (Europe), and DDBJ (Japan)', 'the entire internet', 'all known sequences', 'UniProt or PDB as primary nucleotide databases'],
                  hint: 'Revisit c11_biotech_cbse_09_002 (database classification) and c11_biotech_cbse_09_005 (file.',
                  misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99% identity always means the.' },
                { id: 'b', prompt: 'You have a 1.2 kb cDNA sequence from a medicinal plant. You want to find all known protein sequences that share significant similarity.', answer: 'Use BLASTX (translated nucleotide query vs protein database) against the',
                  options: ['Use BLASTX (translated nucleotide query vs protein database) against the', 'the entire internet', 'all known sequences'],
                  hint: 'Revisit c11_biotech_cbse_09_002 (database classification) and c11_biotech_cbse_09_005 (file.',
                  misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99% identity always means the.' }
          ],
            remediations: { 'blast-searches-the-entire-internet': { steps: ['Have the student open NCBI\'s GenBank and UniProt homepages; compare the "Submission" vs "Reviewed" badges.', 'Run a BLASTN search with a short random sequence against nr and note the E-values — discuss why hits appear by chance.', 'Retrieve a GenBank record with "WARNING: LOW QUALITY SEQUENCE" flag and examine the COMMENT section.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 with this concrete experience.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99%.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A BLAST hit with E-value = 10⁻⁵ is more significant than a hit with E-value = 10⁻⁵⁰." Defend your evaluation with the definition.', answer: 'The statement is false',
                  options: ['The statement is false', 'the entire internet', 'all known sequences'],
                  hint: 'Revisit c11_biotech_cbse_09_002 (database classification) and c11_biotech_cbse_09_005 (file.',
                  misconception: 'Students believe that BLAST searches "the entire internet" or "all known sequences" and that a top hit with 99% identity always means the.' }
          ],
            remediations: { 'blast-searches-the-entire-internet': { steps: ['Have the student open NCBI\'s GenBank and UniProt homepages; compare the "Submission" vs "Reviewed" badges.', 'Run a BLASTN search with a short random sequence against nr and note the E-values — discuss why hits appear by chance.', 'Retrieve a GenBank record with "WARNING: LOW QUALITY SEQUENCE" flag and examine the COMMENT section.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 with this concrete experience.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_008', difficulty: 'standard',
          question: 'BLAST (Basic Local Alignment Search Tool) is a heuristic algorithm for rapid.',
          hint: 'Revisit c11_biotech_cbse_09_006 (alignment types) and c11_biotech_cbse_09_008 (scoring.',
          misconception: 'Students often believe BLAST finds the "best" global alignment like Needleman-Wunsch.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the two-hit triggering method (used in BLASTP 2.0+) with the single-hit method (original BLAST).', answer: 'Original BLAST: single word hit above threshold T triggers extension',
                  options: ['Original BLAST: single word hit above threshold T triggers extension', 'two-hit increases sensitivity', 'BLAST finds the "best" global alignment like Needleman-Wunsch'],
                  hint: 'Revisit c11_biotech_cbse_09_006 (alignment types) and c11_biotech_cbse_09_008 (scoring matrices).',
                  misconception: 'Students often believe BLAST finds the "best" global alignment like Needleman-Wunsch.' }
          ],
            remediations: { 'blast-finds-the-best-global': { steps: ['If student confuses BLAST with global alignment: Revisit c11_biotech_cbse_09_006 (Global vs Local Alignment) and.', 'Have them run a 100-aa query with a known 50-aa internal deletion against a homolog — BLAST will show two HSPs.', 'If E-value misconception persists: Revisit c11_biotech_cbse_09_008 (Scoring Matrices) and Karlin-Altschul derivation.', 'Calculate E-value for same HSP against nr (10^8 residues) vs a small custom db (10^4 residues) — show E changes.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_009', difficulty: 'standard',
          question: 'Genome annotation is the process of identifying the locations of genes and.',
          hint: 'If stuck on ORF translation, revisit c11_biotech_cbse_07_006 (Genetic Code) and practice.',
          misconception: 'Students believe that "gene prediction" and "BLAST search" are the same thing.',
          parts: [
                { id: 'a', prompt: 'A student runs GeneMark (ab initio) and BLASTX against UniProt on a 100 kb fungal genomic region.', answer: 'The decision is flawed',
                  options: ['The decision is flawed', 'no hit = not a gene', 'gene prediction', 'BLAST search'],
                  hint: 'If stuck on ORF translation, revisit c11_biotech_cbse_07_006 (Genetic Code) and practice with a 300.',
                  misconception: 'Students believe that "gene prediction" and "BLAST search" are the same thing.' }
          ],
            remediations: { 'gene-prediction-and-blast-search': { steps: ['Revisit c12_biotech_cbse_05_008 (BLAST algorithm) — confirm BLAST is a *local alignment tool*, not a gene finder.', 'Revisit c11_biotech_cbse_07_006 (Genetic Code) and c11_biotech_cbse_07_007 (Translation) — recall that genes are.', 'Draw a 2-column table: Column A = *Ab initio* (input: raw DNA; signals: start/stop, codon bias, Markov models; tools.', 'Practice with a 5 kb bacterial sequence — run Prodigal online, then BLASTP one predicted protein, note the difference.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_010', difficulty: 'standard',
          question: 'Proteomics is the large-scale study of the complete set of proteins (proteome).',
          hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) for transcription factor structure, and.',
          misconception: '**Misconception:** "In Y2H, if the bait protein activates the reporter on its own (auto-activation), you just increase.',
          parts: [
                { id: 'a', prompt: 'Compare the yeast two-hybrid system with co-immunoprecipitation (Co-IP) for studying protein-protein interactions.', answer: 'False negatives in Y2H (but positive in Co-IP): (1) Interaction requires a',
                  options: ['False negatives in Y2H (but positive in Co-IP): (1) Interaction requires a', 'Y2H is in vivo, Co-IP is in vitro', '3-AT reduces background'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) for transcription factor structure, and.',
                  misconception: '**Misconception:** "In Y2H, if the bait protein activates the reporter on its own (auto-activation), you just increase 3-AT concentration.' }
          ],
            remediations: { 'misconception-in-y2h': { steps: ['If a student persists in the 3-AT misconception: (1) Have them draw the HIS3 metabolic pathway and show where 3-AT acts.', '(2) Give a concrete numerical example: auto-activation produces 1000 HIS3 units; true interaction produces 200 units.', 'At low 3-AT, both grow (false positive + true positive).', 'At high 3-AT, only auto-activation grows (false positive *survives*, true positive *dies*).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_011', difficulty: 'standard',
          question: 'Metabolomics is the comprehensive study of the complete set of small-molecule.',
          hint: 'If stuck, review c11_bio_cbse_09_007 for metabolite structures and.',
          misconception: 'Students often think metabolomics is just "measuring many metabolites" and confuse it with targeted metabolite assays.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to identify biomarkers for drought stress in wheat. She collects leaf samples from control and drought-treated plants at noon and midnight.', answer: 'Steps: (1) Rapid harvesting and immediate freezing in liquid nitrogen to arrest',
                  options: ['Steps: (1) Rapid harvesting and immediate freezing in liquid nitrogen to arrest', 'measuring many metabolites'],
                  hint: 'If stuck, review c11_bio_cbse_09_007 for metabolite structures and c11_biotech_cbse_12_004 for.',
                  misconception: 'Students often think metabolomics is just "measuring many metabolites" and confuse it with targeted metabolite assays (e.g., measuring only.' }
          ],
            remediations: { 'metabolomics-is-just-measuring-many': { steps: ['Revisit c11_bio_cbse_09_007 (Metabolic Pathways: Glycolysis and Krebs Cycle) to recall key metabolites and their.', 'Review c11_biotech_cbse_12_003 (Spectrophotometry: Principle and Applications) and c11_biotech_cbse_12_004.', 'Practice: Given a list of 10 metabolites (e.g., glucose, palmitic acid, citric acid, ATP), classify each.', 'Re-attempt Diagnostic Questions 2 and 3 after this review.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
