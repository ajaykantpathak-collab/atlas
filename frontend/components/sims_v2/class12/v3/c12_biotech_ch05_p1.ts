import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch05_p1: SimDef = {
    id: 'v3_c12_biotech_ch05_p1',
    title: 'Genomics · Part 1/2',
    subtitle: 'Three billion letters, no index — genomics is the art of making it readable.',
    classLevel: 12, subject: 'biotechnology', topic: 'Genomics · Part 1/2',
    chapters: ['c12_biotech_ch05'],
    nodeIds: ['c12_biotech_cbse_05_001', 'c12_biotech_cbse_05_002', 'c12_biotech_cbse_05_003', 'c12_biotech_cbse_05_004', 'c12_biotech_cbse_05_005', 'c12_biotech_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genome mapper', intro: 'Sequencing gave us the letters; genomics gives us the map — and a map is what makes letters useful.', goal: 'Differentiate genome from gene and explain what structural genomics reveals.' },
    discovery: {
        question: 'You\'re handed a 3-billion-letter instruction manual — no page numbers, no headings, sentences run together. What does structural genomics build first?',
        options: ['The table of contents — physical maps of where genes sit and how chromosomes are organised', 'The index of protein functions — what every gene does in the cell', 'The list of mutations — every difference between individuals', 'The glossary — definitions of every DNA word'],
        answer: 'The table of contents — physical maps of where genes sit and how chromosomes are organised',
        hook: 'Before you can ask what a gene does, you must know where it is — structural genomics maps the genome\'s architecture (gene positions, chromatin, rearrangements) so functional questions become askable.',
    },
    teaching: [
        { title: 'Genome vs Gene: Definitions and Scope', text: 'A genome is the complete set of genetic material (DNA) present in a cell of an organism, encompassing all genes, non-coding sequences, regulatory elements, and organellar DNA; a gene is a specific.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_05_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Sort genome from gene, then map the genome: define the complete DNA set versus individual coding units, and use structural genomics to locate genes and explain why chromosome 21 maps to Down syndrome.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_002', title: 'Structural Genomics: Goals and Sequencing Methods',
          caseStudy: { intro: 'Imagine you are handed a 3-billion-base-pair instruction manual (the human genome) with no page numbers, no chapter headings, and all sentences run together.',
            decisions: [{ prompt: 'Define structural genomics from both the protein-structure perspective and the chromosome-organisation perspective in one sentence each.', options: [
                { text: 'Protein-structure perspective: Structural genomics aims to determine the 3D structure of', outcome: 'Protein-structure perspective: Structural genomics aims to determine the 3D structure of every.' },
                { text: 'sequencing the genome', outcome: 'Not quite — Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal*.', reveals: 'students-conflate-structural-genomics-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_003', title: 'Functional Genomics: Analyzing Gene Function',
          caseStudy: { intro: 'Begin with a relatable scenario: "A doctor notices two patients with the same genetic mutation, but only one develops the disease.',
            decisions: [{ prompt: 'What is the primary goal of functional genomics, and how does it differ from structural genomics in terms of the biological question.', options: [
                { text: 'Functional genomics aims to understand how genomic information is executed as', outcome: 'Functional genomics aims to understand how genomic information is executed as physiological.' },
                { text: 'functional genomics determines DNA sequence', outcome: 'Not quite — Students often equate "functional genomics" with "gene function prediction from sequence alone".', reveals: 'students-often-equate-functional-genomics' },
                { text: 'the sequence is known and asks *what the genome does*', outcome: 'Not quite — Students often equate "functional genomics" with "gene function prediction from sequence alone".', reveals: 'students-often-equate-functional-genomics' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_004', title: 'Comparative Genomics: Synteny and Evolutionary Insights',
          caseStudy: { intro: 'Imagine you just sequenced the genome of a newly discovered medicinal plant from the Western Ghats.',
            decisions: [{ prompt: 'Define synteny in the context of comparative genomics. How does it differ from simple sequence homology?', options: [
                { text: 'Synteny refers to the conservation of gene order and orientation on chromosomes between', outcome: 'Synteny refers to the conservation of gene order and orientation on chromosomes between two or more.' },
                { text: 'synteny means identical gene order', outcome: 'Not quite — Students often believe "synteny means identical gene order" and "high sequence similarity.', reveals: 'synteny-means-identical-gene-order' },
                { text: 'high sequence similarity = orthologs', outcome: 'Not quite — Students often believe "synteny means identical gene order" and "high sequence similarity.', reveals: 'synteny-means-identical-gene-order' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_005', title: 'Human Genome Project: Goals and Key Findings',
          caseStudy: { intro: 'Imagine you are a doctor in 2025 trying to diagnose a rare genetic disorder in a child.',
            decisions: [{ prompt: 'State the five official goals of the Human Genome Project as defined at its inception in 1990.', options: [
                { text: 'The five goals were: (1) Identify all ~20,000–25,000 genes in human DNA, (2) Determine', outcome: 'The five goals were: (1) Identify all ~20,000–25,000 genes in human DNA, (2) Determine the.' },
                { text: 'finished', outcome: 'Not quite — Students often think the Human Genome Project "finished" in 2003 with a single, complete.', reveals: 'the-human-genome-project-finished' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_006', title: 'DNA Sequencing Technologies: Sanger vs Next-Generation',
          caseStudy: { intro: 'Imagine you are a geneticist trying to diagnose a rare genetic disorder in a patient.',
            decisions: [{ prompt: 'What is the fundamental biochemical principle that allows Sanger sequencing to determine the DNA sequence?', options: [
                { text: 'Sanger sequencing uses dideoxynucleotides (ddNTPs)', outcome: 'Sanger sequencing uses dideoxynucleotides (ddNTPs) which lack a 3\'-OH group on the deoxyribose.' },
                { text: 'Sanger uses reversible terminators', outcome: 'Not quite — Students often believe that "Next-Generation Sequencing" refers to a single technology (usually.', reveals: 'next-generation-sequencing-refers-to' },
                { text: 'Sanger sequences by synthesis without termination', outcome: 'Not quite — Students often believe that "Next-Generation Sequencing" refers to a single technology (usually.', reveals: 'next-generation-sequencing-refers-to' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Genomics · Part 1/2', spots: [
            { id: 's1', label: 'Genome vs Gene Definitions and Scope', prompt: 'Which idea is this? — A genome is the complete set of genetic material (DNA) present in a cell of an organism.', answer: 'Genome vs Gene Definitions and Scope', options: ['Genome vs Gene Definitions and Scope', 'Structural Genomics Goals and Sequencing Methods', 'Functional Genomics Analyzing Gene Function', 'Comparative Genomics Synteny and Evolutionary Insights'] },
            { id: 's2', label: 'Structural Genomics Goals and Sequencing Methods', prompt: 'Which idea is this? — Structural genomics is the systematic determination and analysis of the three-dimensional.', answer: 'Structural Genomics Goals and Sequencing Methods', options: ['Structural Genomics Goals and Sequencing Methods', 'Genome vs Gene Definitions and Scope', 'Functional Genomics Analyzing Gene Function', 'Comparative Genomics Synteny and Evolutionary Insights'] },
            { id: 's3', label: 'Functional Genomics Analyzing Gene Function', prompt: 'Which idea is this? — Functional genomics is the branch of genomics that aims to understand how the.', answer: 'Functional Genomics Analyzing Gene Function', options: ['Functional Genomics Analyzing Gene Function', 'Genome vs Gene Definitions and Scope', 'Structural Genomics Goals and Sequencing Methods', 'Comparative Genomics Synteny and Evolutionary Insights'] },
            { id: 's4', label: 'Comparative Genomics Synteny and Evolutionary Insights', prompt: 'Which idea is this? — Comparative genomics is the systematic analysis of genome structure, gene content, and.', answer: 'Comparative Genomics Synteny and Evolutionary Insights', options: ['Comparative Genomics Synteny and Evolutionary Insights', 'Genome vs Gene Definitions and Scope', 'Structural Genomics Goals and Sequencing Methods', 'Functional Genomics Analyzing Gene Function'] },
            { id: 's5', label: 'Human Genome Project Goals and Key Findings', prompt: 'Which idea is this? — The Human Genome Project (HGP) was an international scientific research project.', answer: 'Human Genome Project Goals and Key Findings', options: ['Human Genome Project Goals and Key Findings', 'Genome vs Gene Definitions and Scope', 'Structural Genomics Goals and Sequencing Methods', 'Functional Genomics Analyzing Gene Function'] },
            { id: 's6', label: 'DNA Sequencing Technologies Sanger vs Next-Generation', prompt: 'Which idea is this? — DNA sequencing technologies determine the precise order of nucleotides (A, T, C, G) in.', answer: 'DNA Sequencing Technologies Sanger vs Next-Generation', options: ['DNA Sequencing Technologies Sanger vs Next-Generation', 'Genome vs Gene Definitions and Scope', 'Structural Genomics Goals and Sequencing Methods', 'Functional Genomics Analyzing Gene Function'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a bioinformatics club poster, a student finds that onion\'s genome (~16,000 Mb) is five times the human genome (~3,200 Mb) — and declares onions must be five times \'more complex\' than people.',
            decisions: [{ prompt: 'Does the data support her claim?', options: [
                { text: 'No — genome size (C-value) tracks non-coding and repetitive DNA, not gene count: onion packs ~30,000 genes into 16,000 Mb while humans fit ~20,000 into 3,200 Mb; rice even beats humans on gene number with a far smaller genome.', outcome: 'The C-value paradox: complexity lives in regulation and splicing, not raw DNA tonnage — gene density, not genome size, is the meaningful comparison.' },
                { text: 'Yes — a genome is just the sum of an organism\'s genes, so five times the DNA means roughly five times the genes.', outcome: 'Genome ≠ gene set: it also holds introns, regulatory regions, repeats and organellar DNA, which dominate eukaryotic size differences.', reveals: 'genome-is-gene-set' },
                { text: 'No — but only because the human nuclear chromosomes were counted without mitochondrial DNA, which would close the gap.', outcome: 'Organellar DNA is part of the genome but tiny; even including it, the paradox stands — size still fails to predict gene number.', reveals: 'size-gap-is-organelles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now navigate a genome instead of drowning in it. Genome-vs-gene and mapping concepts feed board answers — and underpin bioinformatics, one of the fastest-growing career fields.',
            decisions: [{ prompt: 'What comes next? Genomics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Genomics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_001', difficulty: 'standard',
          question: 'A genome is the complete set of genetic material (DNA) present in a cell of.',
          hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and c11_biotech_cbse_08_001 (Chromosome.',
          misconception: 'Students equate "genome" with "gene set" and assume genome size correlates with gene number and organismal complexity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A genome is the complete set of genetic material (DNA) present in a cell of an organism,',
                  options: ['A genome is the complete set of genetic material (DNA) present in a cell of an organism,', 'Structural genomics is the systematic determination and analysis of the three-dimensional', 'Functional genomics is the branch of genomics that aims to understand how the', 'Comparative genomics is the systematic analysis of genome structure, gene content, and'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and c11_biotech_cbse_08_001 (Chromosome Structure).',
                  misconception: 'Students equate "genome" with "gene set" and assume genome size correlates with gene number and organismal complexity.' }
          ],
            remediations: { 'students-equate-genome-with-gene': { steps: ['If the student conflates genome/gene or misses organellar DNA: (1) Revisit c11_biotech_cbse_08_001 (Chromosome.', '5.1 from memory — prokaryote panel (nucleoid + plasmid) and eukaryote panel (nucleus + mitochondria + chloroplast).', '(3) Complete the table in Diagnostic 4 without notes.', '(4) Re-attempt Diagnostic 3 (C-value calculation) with new numbers: maize genome 2,300 Mb, ~40,000 genes; pufferfish.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_002', difficulty: 'standard',
          question: 'Structural genomics is the systematic determination and analysis of the.',
          hint: 'If stuck on sequencing principles, revisit c11_biotech_cbse_12_010 (Sanger vs NGS) and.',
          misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the.',
          parts: [
                { id: 'a', prompt: 'Compare the *principle of base detection* in Illumina (second-generation) and Oxford Nanopore (third-generation) sequencing.', answer: 'Illumina: sequencing-by-synthesis with reversible terminators',
                  options: ['Illumina: sequencing-by-synthesis with reversible terminators', 'Nanopore uses fluorescence', 'Illumina measures current'],
                  hint: 'If stuck on sequencing principles, revisit c11_biotech_cbse_12_010 (Sanger vs NGS) and draw the.',
                  misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the sequence.' }
          ],
            remediations: { 'students-conflate-structural-genomics-with': { steps: ['If the student cannot distinguish the two perspectives of structural genomics: (1) Have them re-read the NCERT.', '(2) Assign a 5-minute retrieval practice: "Without notes, write one sentence for each perspective." (3) Re-diagnose.', 'The structural genomics centre selects 50 proteins with no homology to known folds for crystallography.', 'Which perspective of structural genomics does this illustrate?" Expected answer: Protein-structure perspective.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_003', difficulty: 'standard',
          question: 'Functional genomics is the branch of genomics that aims to understand how the.',
          hint: 'If stuck on NGS workflow, revisit c11_biotech_cbse_12_010 (DNA Sequencing: Sanger vs NGS).',
          misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).',
          parts: [
                { id: 'a', prompt: 'What is the primary goal of functional genomics, and how does it differ from structural genomics in terms of the biological question it addresses?', answer: 'Functional genomics aims to understand how genomic information is executed as',
                  options: ['Functional genomics aims to understand how genomic information is executed as', 'functional genomics determines DNA sequence', 'the sequence is known and asks *what the genome does*'],
                  hint: 'If stuck on NGS workflow, revisit c11_biotech_cbse_12_010 (DNA Sequencing: Sanger vs NGS) and draw.',
                  misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).' },
                { id: 'b', prompt: 'A researcher wants to identify all genes actively transcribed in a cancer cell line under hypoxic conditions.', answer: 'RNA-seq is most appropriate',
                  options: ['RNA-seq is most appropriate', 'ChIP-seq measures gene expression directly'],
                  hint: 'If stuck on NGS workflow, revisit c11_biotech_cbse_12_010 (DNA Sequencing: Sanger vs NGS) and draw.',
                  misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).' },
                { id: 'c', prompt: 'Compare the biological information provided by RNA-seq and ChIP-seq.', answer: 'RNA-seq measures steady-state mRNA abundance (output)',
                  options: ['RNA-seq measures steady-state mRNA abundance (output)', 'ChIP-seq is wrong', 'RNA-seq is wrong'],
                  hint: 'If stuck on NGS workflow, revisit c11_biotech_cbse_12_010 (DNA Sequencing: Sanger vs NGS) and draw.',
                  misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).' }
          ],
            remediations: { 'students-often-equate-functional-genomics': { steps: ['If the student confuses functional genomics with annotation/homology: 1) Revisit node c12_biotech_cbse_05_009 (Genome.', 'experimental measurement), (b) context independence vs.', 'condition-specific, (c) static prediction vs.', '2) Do a 5-minute "two-column table" exercise: Column A = Annotation (BLAST, InterPro), Column B = Functional Genomics.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_004', difficulty: 'standard',
          question: 'Comparative genomics is the systematic analysis of genome structure, gene.',
          hint: 'If stuck on orthology/paralogy: revisit c11_biotech_cbse_09_010 (Phylogenetic Trees) and.',
          misconception: 'Students often believe "synteny means identical gene order" and "high sequence similarity = orthologs".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparative genomics is the systematic analysis of genome structure, gene content, and',
                  options: ['Comparative genomics is the systematic analysis of genome structure, gene content, and', 'A genome is the complete set of genetic material (DNA) present in a cell of an organism,', 'Structural genomics is the systematic determination and analysis of the three-dimensional', 'Functional genomics is the branch of genomics that aims to understand how the'],
                  hint: 'If stuck on orthology/paralogy: revisit c11_biotech_cbse_09_010 (Phylogenetic Trees) and practice.',
                  misconception: 'Students often believe "synteny means identical gene order" and "high sequence similarity = orthologs".' }
          ],
            remediations: { 'synteny-means-identical-gene-order': { steps: ['If the student conflates synteny with homology or orthology with similarity: Step 1 — Revisit c11_biotech_cbse_09_009.', 'Step 2 — Draw a simple scenario: ancestral gene duplicates → two paralogs in Species 1, one ortholog in Species 2.', 'Show how reciprocal best BLAST hit fails here.', 'Step 3 — Use a synteny browser (e.g., Ensembl Region in Detail view) for human-mouse chr17 to visually identify.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_005', difficulty: 'standard',
          question: 'The Human Genome Project (HGP) was an international scientific research project.',
          hint: 'Revisit c12_biotech_cbse_05_002 (Structural Genomics) sections on STS mapping and BAC.',
          misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Human Genome Project (HGP) was an international scientific research project',
                  options: ['The Human Genome Project (HGP) was an international scientific research project', 'A genome is the complete set of genetic material (DNA) present in a cell of an organism,', 'Structural genomics is the systematic determination and analysis of the three-dimensional', 'Functional genomics is the branch of genomics that aims to understand how the'],
                  hint: 'Revisit c12_biotech_cbse_05_002 (Structural Genomics) sections on STS mapping and BAC contig.',
                  misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one human.' }
          ],
            remediations: { 'the-human-genome-project-finished': { steps: ['If a student holds this misconception, guide them through: (1) Show the 2001 Nature/Science papers labeled "draft.', '(3) Assign a mini-task: Use UCSC Genome Browser to view gap tracks in GRCh37 vs GRCh38 vs T2T-CHM13.', '(4) Re-ask Diagnostic Question 5 to confirm corrected understanding.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_006', difficulty: 'standard',
          question: 'DNA sequencing technologies determine the precise order of nucleotides (A,.',
          hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005`.',
          misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental biochemical principle that allows Sanger sequencing to determine the DNA sequence?', answer: 'Sanger sequencing uses dideoxynucleotides (ddNTPs)',
                  options: ['Sanger sequencing uses dideoxynucleotides (ddNTPs)', 'Sanger uses reversible terminators', 'Sanger sequences by synthesis without termination', 'Next-Generation Sequencing'],
                  hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005` (PCR).',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' },
                { id: 'b', prompt: 'A researcher wants to sequence a 3 kb plasmid to verify a site-directed mutation.', answer: '**Sanger**: Plasmid = 3000 bp',
                  options: ['**Sanger**: Plasmid = 3000 bp', 'overkill', 'Next-Generation Sequencing', 'faster Sanger'],
                  hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005` (PCR).',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' },
                { id: 'c', prompt: 'Compare the error profiles of Illumina and Oxford Nanopore sequencing.', answer: '**Illumina**: Low error rate (~0.1–1%), predominantly substitution errors',
                  options: ['**Illumina**: Low error rate (~0.1–1%), predominantly substitution errors', 'Nanopore is better for SNPs', 'Illumina is better for assembly', 'Next-Generation Sequencing'],
                  hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005` (PCR).',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' }
          ],
            remediations: { 'next-generation-sequencing-refers-to': { steps: ['**Revisit the biochemical basis**: Go back to Class 11 node `c11_biotech_cbse_12_010` (DNA Sequencing: Sanger Method.', 'Draw the chemical structures of dNTP vs ddNTP (missing 3\'-OH) and reversible terminator (3\'-O-azidomethyl).', '**Visualise the workflow**: Watch a 5-min animation of Illumina bridge PCR (search "Illumina sequencing by synthesis.', 'Label each step: fragment → adapter ligation → cluster generation → sequencing → imaging/basecalling.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Third-generation nanopore sequencing has made second-generation Illumina sequencing obsolete for all applications." Defend your position.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'newer = better', 'Next-Generation Sequencing', 'faster Sanger'],
                  hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005` (PCR).',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' },
                { id: 'b', prompt: 'Design a sequencing strategy to identify a novel structural variant (a 15 kb inversion) in a patient\'s genome that is missed by standard short-read sequencing.', answer: '**Technology**: Oxford Nanopore (or PacBio HiFi)',
                  options: ['**Technology**: Oxford Nanopore (or PacBio HiFi)', 'Next-Generation Sequencing', 'faster Sanger', 'Illumina sequences 1000 bp reads'],
                  hint: 'If stuck, revisit `c11_biotech_cbse_03_006` (DNA structure) and `c11_biotech_cbse_12_005` (PCR).',
                  misconception: 'Students often believe that "Next-Generation Sequencing" refers to a single technology (usually Illumina) and that it is simply "faster.' }
          ],
            remediations: { 'next-generation-sequencing-refers-to': { steps: ['**Revisit the biochemical basis**: Go back to Class 11 node `c11_biotech_cbse_12_010` (DNA Sequencing: Sanger Method.', 'Draw the chemical structures of dNTP vs ddNTP (missing 3\'-OH) and reversible terminator (3\'-O-azidomethyl).', '**Visualise the workflow**: Watch a 5-min animation of Illumina bridge PCR (search "Illumina sequencing by synthesis.', 'Label each step: fragment → adapter ligation → cluster generation → sequencing → imaging/basecalling.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
