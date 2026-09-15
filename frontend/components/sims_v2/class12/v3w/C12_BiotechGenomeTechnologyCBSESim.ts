import type { SimDef } from '../../engine/types';
import C12_BiotechGenomeTechnologyCBSESim from '../../../simulations/c6_12_new/C12_BiotechGenomeTechnologyCBSESim';

/** v3 wrapped master — C12_BiotechGenomeTechnologyCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechgenometechnologycbsesim: SimDef = {
    id: 'v3w_c12_biotechgenometechnologycbsesim',
    title: 'Genome Technology CBSE',
    subtitle: 'This node covers: goals of structural genomics (both perspectives), sequencing.',
    classLevel: 12, subject: 'biotechnology', topic: 'Structural Genomics: Goals and Sequencing Methods',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_05_002', 'c12_biotech_cbse_12_001', 'c12_biotech_cbse_05_001', 'c12_biotech_cbse_05_003', 'c12_biotech_cbse_05_004', 'c12_biotech_cbse_05_005', 'c12_biotech_cbse_05_009', 'c12_biotech_cbse_05_010', 'c12_biotech_cbse_05_006', 'c12_biotech_cbse_04_002', 'c12_biotech_cbse_04_003', 'c12_biotech_cbse_04_004', 'c12_biotech_cbse_04_007', 'c12_biotech_cbse_04_008', 'c12_biotech_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are handed a 3-billion-base-pair instruction manual (the human genome) with no page numbers, no.', goal: 'Master Genome Technology CBSE.' },
    discovery: {
        question: 'Compare the *principle of base detection* in Illumina (second-generation) and Oxford Nanopore (third-generation) sequencing.',
        options: ['Illumina: sequencing-by-synthesis with reversible terminators', 'Nanopore uses fluorescence', 'Illumina measures current'],
        answer: 'Illumina: sequencing-by-synthesis with reversible terminators',
        hook: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the.',
    },
    teaching: [
        { title: 'Structural genomics is the systematic.', text: 'Structural genomics is the systematic determination and analysis of the three-dimensional structures of all proteins encoded by a genome (protein-centric view) AND the physical organisation of DNA.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_002', title: 'Structural genomics is the systematic.',
          scaffold: { problem: 'A geneticist is mapping a 120 kb region of human chromosome 7 using STS markers.',
            steps: [
            { text: 'Identify STS markers with identical retention patterns — these are likely closely linked or at the same locus.' },
            { text: 'Recognise that radiation hybrid mapping relies on radiation-induced breaks; markers retained together in the same.' },
            { text: 'The two pattern groups (A/B/D vs C/E) are perfectly complementary — when one group is retained, the other is lost.' },
            { text: 'Since A, B, D co-segregate completely, their relative order cannot be resolved with this panel.' },
            { text: 'The most likely order is [STS-A / STS-B / STS-D] — [breakpoint] — [STS-C / STS-E] or the reverse.', faded: true, blankAnswer: 'Two bins: Bin 1 = {STS-A, STS-B, STS-D} (order unresolved);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_12_001', title: 'The biotechnology industry encompasses.',
          scaffold: { problem: 'A biotech company in Punjab plans to set up a biodiesel plant using waste cooking oil (WCO) collected from restaurants.',
            steps: [
            { text: 'Identify the key constraint — high FFA (15%) in waste cooking oil.' },
            { text: 'Recall the trans-esterification reaction: triglyceride + 3 methanol → 3 fatty acid methyl esters (FAME/biodiesel) +.' },
            { text: 'Write the molecular formula for tripalmitin (C₅₁H₉₈O₆, three palmitic acid C₁₆ chains on glycerol backbone) and.' },
            { text: 'Balance the equation: C₅₁H₉₈O₆ + 3 CH₃OH → 3 C₁₇H₃₄O₂ (methyl palmitate) + C₃H₈O₃ (glycerol).' },
            { text: 'Interpret — the 3:1 methanol:oil molar ratio is stoichiometric; industrially 6:1 (2x excess) is used to drive.', faded: true, blankAnswer: 'Acid-catalysed (H₂SO₄) trans-esterification is suitable for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_001', title: 'A genome is the complete set of genetic.',
          scaffold: { problem: 'A research student isolates DNA from a fresh spinach leaf (eukaryote, photosynthetic).',
            steps: [
            { text: 'Recall NCERT definition — eukaryotic genome = nuclear chromosomal DNA + mitochondrial DNA + chloroplast (plastid) DNA.' },
            { text: 'Match fraction properties to known organellar genomes: Mitochondrial DNA in plants is typically circular ~200-2000 kb.' },
            { text: 'Fraction A = large linear molecules → nuclear chromosomal DNA (organized into linear chromosomes with.' },
            { text: 'Fraction B = small circular ~16.5 kb → mitochondrial DNA (conserved size across eukaryotes, though plant mtDNA can be.' },
            { text: 'Fraction C = circular ~150 kb → chloroplast DNA (plastid genome, characteristic size in plants).' },
            { text: 'Verify — all three components of eukaryotic genome per NCERT Fig. 5.1(b) are accounted for.', faded: true, blankAnswer: 'Fraction A = Nuclear chromosomal DNA; Fraction B =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_003', title: 'Functional genomics is the branch of.',
          scaffold: { problem: 'A researcher performs RNA-seq on Arabidopsis thaliana leaves under drought vs. well-watered conditions.',
            steps: [
            { text: 'Calculate RPK (Reads Per Kilobase) for each condition: RPK = reads / (gene length in kb). Drought: 1200 / 2.5 = 480.' },
            { text: 'Calculate scaling factor (sum of all RPKs in sample / 1,000,000).' },
            { text: 'TPM = RPK / scaling factor. Drought TPM = 480 / 0.00048 = 1,000,000. Control TPM = 120 / 0.00012 = 1,000,000.' },
            { text: 'For fold change, use normalized counts (e.g., DESeq2\'s median-of-ratios).' },
            { text: 'Interpret: Gene is upregulated 4-fold (log2FC=2) in drought. TPM would be equal only if this were the only gene; in.', faded: true, blankAnswer: 'Drought TPM ≈ 1,000,000 (single-gene assumption), Control.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_004', title: 'Comparative genomics is the systematic.',
          scaffold: { problem: 'A comparative genomics study aligns the genomes of two closely related fungal species, Aspergillus nidulans and Aspergillus fumigatus.',
            steps: [
            { text: 'Identify the differences between the two gene orders: (i) inversion of Gene 5 and Gene 6, (ii) deletion/loss of Gene 9.' },
            { text: 'Determine the minimum events: One inversion event (affecting the segment containing Gene 5 and Gene 6) and one deletion.' },
            { text: 'Propose molecular mechanisms: (a) Inversion: Ectopic recombination between inverted repeat sequences flanking Gene 5.' },
            { text: 'Verify using comparative evidence: Check if inversion breakpoints coincide with repetitive elements (e.g., transposons,.' },
            { text: 'Interpret evolutionary significance: The high intergenic identity (92%) suggests recent divergence; the inversion may.', faded: true, blankAnswer: 'Minimum 2 evolutionary events: 1 inversion (Gene 5-Gene 6).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_005', title: 'The Human Genome Project (HGP) was an.',
          scaffold: { problem: 'The HGP consortium used a hierarchical shotgun approach. A chromosome 22 BAC contig consists of 10 overlapping BAC clones, each averaging.',
            steps: [
            { text: 'Identify given values: number of BACs (n = 10), average insert size = 150 kb, overlap = 30 kb.' },
            { text: 'Recognize that total contig length = (n × insert size) - ((n-1) × overlap) because overlaps are counted twice if simply.' },
            { text: 'Substitute values: Total length = (10 × 150 kb) - (9 × 30 kb) = 1500 kb - 270 kb = 1230 kb.' },
            { text: 'Convert kilobases to megabases: 1230 kb ÷ 1000 = 1.23 Mb.' },
            { text: 'Interpret: This contig covers 1.23 Mb of chromosome 22 euchromatin; actual chromosome 22 is ~51 Mb, so many such.', faded: true, blankAnswer: '1.23 Mb' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_12_001', title: 'Identify each idea',
          dissect: { specimen: 'Genome Technology CBSE', spots: [
            { id: 's1', label: 'Structural genomics is the systematic', prompt: 'Which idea is this? — Structural genomics is the systematic determination and analysis of the three-dimensional.', answer: 'Structural genomics is the systematic', options: ['Structural genomics is the systematic', 'The biotechnology industry encompasses the', 'A genome is the complete', 'Functional genomics is the branch'] },
            { id: 's2', label: 'The biotechnology industry encompasses the', prompt: 'Which idea is this? — The biotechnology industry encompasses the commercial application of biological systems,.', answer: 'The biotechnology industry encompasses the', options: ['The biotechnology industry encompasses the', 'Structural genomics is the systematic', 'A genome is the complete', 'Functional genomics is the branch'] },
            { id: 's3', label: 'A genome is the complete', prompt: 'Which idea is this? — A genome is the complete set of genetic material (DNA) present in a cell of an organism,.', answer: 'A genome is the complete', options: ['A genome is the complete', 'Structural genomics is the systematic', 'The biotechnology industry encompasses the', 'Functional genomics is the branch'] },
            { id: 's4', label: 'Functional genomics is the branch', prompt: 'Which idea is this? — Functional genomics is the branch of genomics that aims to understand how the.', answer: 'Functional genomics is the branch', options: ['Functional genomics is the branch', 'Structural genomics is the systematic', 'The biotechnology industry encompasses the', 'A genome is the complete'] },
            { id: 's5', label: 'Comparative genomics is the systematic', prompt: 'Which idea is this? — Comparative genomics is the systematic analysis of genome structure, gene content, and.', answer: 'Comparative genomics is the systematic', options: ['Comparative genomics is the systematic', 'Structural genomics is the systematic', 'The biotechnology industry encompasses the', 'A genome is the complete'] },
            { id: 's6', label: 'The Human Genome Project HGP', prompt: 'Which idea is this? — The Human Genome Project (HGP) was an international scientific research project.', answer: 'The Human Genome Project HGP', options: ['The Human Genome Project HGP', 'Structural genomics is the systematic', 'The biotechnology industry encompasses the', 'A genome is the complete'] }
          ] } }
    ],
    explore: { component: C12_BiotechGenomeTechnologyCBSESim, prompt: 'Explore the interactive — Genome Technology CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_002', difficulty: 'standard',
          question: 'Structural genomics is the systematic determination and analysis of the.',
          hint: 'If stuck on sequencing principles, revisit c11_biotech_cbse_12_010 (Sanger vs NGS) and.',
          misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the.',
          parts: [
                { id: 'a', prompt: 'Compare the *principle of base detection* in Illumina (second-generation) and Oxford Nanopore (third-generation) sequencing.', answer: 'Illumina: sequencing-by-synthesis with reversible terminators',
                  options: ['Illumina: sequencing-by-synthesis with reversible terminators', 'Nanopore uses fluorescence', 'Illumina measures current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the sequence.' }
          ],
            remediations: { 'students-conflate-structural-genomics-with': { steps: ['If the student cannot distinguish the two perspectives of structural genomics: (1) Have them re-read the NCERT.', '(2) Assign a 5-minute retrieval practice: "Without notes, write one sentence for each perspective." (3) Re-diagnose.', 'The structural genomics centre selects 50 proteins with no homology to known folds for crystallography.', 'Which perspective of structural genomics does this illustrate?" Expected answer: Protein-structure perspective.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the.',
          parts: [
                { id: 'a', prompt: 'Compare the *principle of base detection* in Illumina (second-generation) and Oxford Nanopore (third-generation) sequencing.', answer: 'Illumina: sequencing-by-synthesis with reversible terminators',
                  options: ['Illumina: sequencing-by-synthesis with reversible terminators', 'Nanopore uses fluorescence', 'Illumina measures current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "structural genomics" with "whole-genome sequencing" — they think the *goal* is just to get the sequence.' }
          ],
            remediations: { 'students-conflate-structural-genomics-with': { steps: ['If the student cannot distinguish the two perspectives of structural genomics: (1) Have them re-read the NCERT.', '(2) Assign a 5-minute retrieval practice: "Without notes, write one sentence for each perspective." (3) Re-diagnose.', 'The structural genomics centre selects 50 proteins with no homology to known folds for crystallography.', 'Which perspective of structural genomics does this illustrate?" Expected answer: Protein-structure perspective.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_001', difficulty: 'standard',
          question: 'The biotechnology industry encompasses the commercial application of biological.',
          hint: 'If stuck on biofuel processes: revisit Class 11 Biology Chapter 12 (Respiration) nodes.',
          misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast **organoids** and **spheroids** as 3D culture models for drug screening.', answer: 'the cellular origin of each, (',
                  options: ['the cellular origin of each, (', 'both need Matrigel', 'both come from stem cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' }
          ],
            remediations: { 'misconception-environmental-biotechnology-biorem': { steps: ['**Re-read NCERT 12.1.1 (Biofuel) and 12.1.2 (Biodegradation)** — make a two-column table: left column = "Remediation.', 'Fill with: biodiesel, bioalcohol, biogas, biomass, PHB, biopulping, biobleaching, microbial EOR.', '**Create flashcards** for each biofuel type: raw material → process name → key advantage → key limitation (e.g.,.', '**Re-diagnostic**: Ask a peer to quiz you: "Name the process for biodiesel.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Gold nanoparticles of 10 nm diameter are always ruby red, so colour can be used as a reliable quality-control metric for nanoparticle.', answer: 'The claim is **partially true but dangerous as a sole QC metric**',
                  options: ['The claim is **partially true but dangerous as a sole QC metric**', 'yes, colour is reliable', 'properties depend on size, shape, surface charge, and composition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' },
                { id: 'b', prompt: 'Compare and contrast **organoids** and **spheroids** as 3D culture models for drug screening.', answer: 'the cellular origin of each, (',
                  options: ['the cellular origin of each, (', 'both need Matrigel', 'both come from stem cells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental biotechnology = bioremediation only." Students equate the entire sector with cleaning up pollution.' }
          ],
            remediations: { 'misconception-environmental-biotechnology-biorem': { steps: ['**Re-read NCERT 12.1.1 (Biofuel) and 12.1.2 (Biodegradation)** — make a two-column table: left column = "Remediation.', 'Fill with: biodiesel, bioalcohol, biogas, biomass, PHB, biopulping, biobleaching, microbial EOR.', '**Create flashcards** for each biofuel type: raw material → process name → key advantage → key limitation (e.g.,.', '**Re-diagnostic**: Ask a peer to quiz you: "Name the process for biodiesel.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_001', difficulty: 'standard',
          question: 'A genome is the complete set of genetic material (DNA) present in a cell of an.',
          hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and c11_biotech_cbse_08_001 (Chromosome.',
          misconception: 'Students equate "genome" with "gene set" and assume genome size correlates with gene number and organismal complexity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A genome is the complete set of genetic material (DNA) present in a cell of an organism,',
                  options: ['A genome is the complete set of genetic material (DNA) present in a cell of an organism,', 'Structural genomics is the systematic determination and analysis of the three-dimensional', 'The biotechnology industry encompasses the commercial application of biological systems,', 'Functional genomics is the branch of genomics that aims to understand how the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "genome" with "gene set" and assume genome size correlates with gene number and organismal complexity.' }
          ],
            remediations: { 'students-equate-genome-with-gene': { steps: ['If the student conflates genome/gene or misses organellar DNA: (1) Revisit c11_biotech_cbse_08_001 (Chromosome.', '5.1 from memory — prokaryote panel (nucleoid + plasmid) and eukaryote panel (nucleus + mitochondria + chloroplast).', '(3) Complete the table in Diagnostic 4 without notes.', '(4) Re-attempt Diagnostic 3 (C-value calculation) with new numbers: maize genome 2,300 Mb, ~40,000 genes; pufferfish.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_003', difficulty: 'standard',
          question: 'Functional genomics is the branch of genomics that aims to understand how the.',
          hint: 'If stuck on NGS workflow, revisit c11_biotech_cbse_12_010 (DNA Sequencing: Sanger vs NGS).',
          misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).',
          parts: [
                { id: 'a', prompt: 'What is the primary goal of functional genomics, and how does it differ from structural genomics in terms of the biological question it addresses?', answer: 'Functional genomics aims to understand how genomic information is executed as',
                  options: ['Functional genomics aims to understand how genomic information is executed as', 'functional genomics determines DNA sequence', 'the sequence is known and asks *what the genome does*'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).' },
                { id: 'b', prompt: 'A researcher wants to identify all genes actively transcribed in a cancer cell line under hypoxic conditions.', answer: 'RNA-seq is most appropriate',
                  options: ['RNA-seq is most appropriate', 'ChIP-seq measures gene expression directly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).' },
                { id: 'c', prompt: 'Compare the biological information provided by RNA-seq and ChIP-seq.', answer: 'RNA-seq measures steady-state mRNA abundance (output)',
                  options: ['RNA-seq measures steady-state mRNA abundance (output)', 'ChIP-seq is wrong', 'RNA-seq is wrong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "functional genomics" with "gene function prediction from sequence alone" (e.g., BLAST homology).' }
          ],
            remediations: { 'students-often-equate-functional-genomics': { steps: ['If the student confuses functional genomics with annotation/homology: 1) Revisit node c12_biotech_cbse_05_009 (Genome.', 'experimental measurement), (b) context independence vs.', 'condition-specific, (c) static prediction vs.', '2) Do a 5-minute "two-column table" exercise: Column A = Annotation (BLAST, InterPro), Column B = Functional Genomics.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_004', difficulty: 'standard',
          question: 'Comparative genomics is the systematic analysis of genome structure, gene.',
          hint: 'If stuck on orthology/paralogy: revisit c11_biotech_cbse_09_010 (Phylogenetic Trees) and.',
          misconception: 'Students often believe "synteny means identical gene order" and "high sequence similarity = orthologs".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparative genomics is the systematic analysis of genome structure, gene content, and',
                  options: ['Comparative genomics is the systematic analysis of genome structure, gene content, and', 'Structural genomics is the systematic determination and analysis of the three-dimensional', 'The biotechnology industry encompasses the commercial application of biological systems,', 'A genome is the complete set of genetic material (DNA) present in a cell of an organism,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "synteny means identical gene order" and "high sequence similarity = orthologs".' }
          ],
            remediations: { 'synteny-means-identical-gene-order': { steps: ['If the student conflates synteny with homology or orthology with similarity: Step 1 — Revisit c11_biotech_cbse_09_009.', 'Step 2 — Draw a simple scenario: ancestral gene duplicates → two paralogs in Species 1, one ortholog in Species 2.', 'Show how reciprocal best BLAST hit fails here.', 'Step 3 — Use a synteny browser (e.g., Ensembl Region in Detail view) for human-mouse chr17 to visually identify.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_005', difficulty: 'standard',
          question: 'The Human Genome Project (HGP) was an international scientific research project.',
          hint: 'Revisit c12_biotech_cbse_05_002 (Structural Genomics) sections on STS mapping and BAC.',
          misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Human Genome Project (HGP) was an international scientific research project',
                  options: ['The Human Genome Project (HGP) was an international scientific research project', 'Structural genomics is the systematic determination and analysis of the three-dimensional', 'The biotechnology industry encompasses the commercial application of biological systems,', 'A genome is the complete set of genetic material (DNA) present in a cell of an organism,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one human.' }
          ],
            remediations: { 'the-human-genome-project-finished': { steps: ['If a student holds this misconception, guide them through: (1) Show the 2001 Nature/Science papers labeled "draft.', '(3) Assign a mini-task: Use UCSC Genome Browser to view gap tracks in GRCh37 vs GRCh38 vs T2T-CHM13.', '(4) Re-ask Diagnostic Question 5 to confirm corrected understanding.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
