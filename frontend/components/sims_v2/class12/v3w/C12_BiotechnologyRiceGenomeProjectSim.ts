import type { SimDef } from '../../engine/types';
import C12_BiotechnologyRiceGenomeProjectSim from '../../../simulations/c6_12/C12_BiotechnologyRiceGenomeProjectSim';

/** v3 wrapped master — C12_BiotechnologyRiceGenomeProjectSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechnologyricegenomeprojectsim: SimDef = {
    id: 'v3w_c12_biotechnologyricegenomeprojectsim',
    title: 'Human Genome Project: Goals and Key Findings',
    subtitle: 'This node covers the goals, methodology overview, major findings, and implications of the.',
    classLevel: 12, subject: 'biotechnology', topic: 'Human Genome Project: Goals and Key Findings',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_05_005', 'c12_biotech_cbse_05_004', 'c12_biotech_cbse_01_010', 'c12_biotech_cbse_11_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a doctor in 2025 trying to diagnose a rare genetic disorder in a child.', goal: 'Master Human Genome Project: Goals and Key Findings.' },
    discovery: {
        question: 'Compare the copy number control mechanisms of BACs and standard high-copy plasmids (e.g., pUC19).',
        options: ['pUC19 uses a mutated pMB1 origin (rop deletion) giving 500–700 copies/cell', 'high copy gives more DNA yield', 'better'],
        answer: 'pUC19 uses a mutated pMB1 origin (rop deletion) giving 500–700 copies/cell',
        hook: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with.',
    },
    teaching: [
        { title: 'The Human Genome Project (HGP) was an.', text: 'The Human Genome Project (HGP) was an international scientific research project (1990–2003) with the primary goal of determining the complete sequence of nucleotide base pairs that make up human DNA.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_05_005', title: 'The Human Genome Project (HGP) was an.',
          scaffold: { problem: 'The HGP consortium used a hierarchical shotgun approach. A chromosome 22 BAC contig consists of 10 overlapping BAC clones, each averaging.',
            steps: [
            { text: 'Identify given values: number of BACs (n = 10), average insert size = 150 kb, overlap = 30 kb.' },
            { text: 'Recognize that total contig length = (n × insert size) - ((n-1) × overlap) because overlaps are counted twice if simply.' },
            { text: 'Substitute values: Total length = (10 × 150 kb) - (9 × 30 kb) = 1500 kb - 270 kb = 1230 kb.' },
            { text: 'Convert kilobases to megabases: 1230 kb ÷ 1000 = 1.23 Mb.' },
            { text: 'Interpret: This contig covers 1.23 Mb of chromosome 22 euchromatin; actual chromosome 22 is ~51 Mb, so many such.', faded: true, blankAnswer: '1.23 Mb' }
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
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_01_010', title: 'BACs (Bacterial Artificial Chromosomes).',
          scaffold: { problem: 'A genomic library for rice (Oryza sativa, genome size ~430 Mb) is to be constructed using a BAC vector with average insert size 120 kb.',
            steps: [
            { text: 'Identify given values: G = 430 Mb = 430,000,000 bp; I = 120 kb = 120,000 bp; P = 0.999.' },
            { text: 'Write the Clarke-Carbon formula: N = ln(1 - P) / ln(1 - I/G).' },
            { text: 'Compute I/G = 120,000 / 430,000,000 = 0.00027907.' },
            { text: 'Compute ln(1 - I/G) = ln(1 - 0.00027907) = ln(0.99972093) ≈ -0.00027911.' },
            { text: 'Compute ln(1 - P) = ln(1 - 0.999) = ln(0.001) = -6.907755.' },
            { text: 'Divide: N = (-6.907755) / (-0.00027911) ≈ 24,749. Round up to 25,000 clones.', faded: true, blankAnswer: '25,000 independent BAC clones (rounded up to nearest.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_11_001', title: 'Transgenic plants are genetically.',
          scaffold: { problem: 'A research team wants to produce transgenic rice (monocot) expressing a bacterial *cry* gene for insect resistance.',
            steps: [
            { text: 'Identify the host species (rice = monocot) and the two methods being compared.' },
            { text: 'Recall typical integration patterns: Agrobacterium → low copy (1-3), defined T-DNA borders, rare backbone integration.' },
            { text: 'Evaluate regulatory implications: GEAC (India) requires molecular characterization — copy number, insert integrity,.' },
            { text: 'Consider technical feasibility: Modern Agrobacterium protocols (supervirulent strains, acetosyringone, optimized.' },
            { text: 'Synthesize recommendation: Choose Agrobacterium (EHA105/pCAMBIA1301) because rice is now amenable, and the cleaner.', faded: true, blankAnswer: 'Recommendation: Use Agrobacterium-mediated transformation.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_05_004', title: 'Identify each idea',
          dissect: { specimen: 'Human Genome Project: Goals and Key Findings', spots: [
            { id: 's1', label: 'The Human Genome Project HGP', prompt: 'Which idea is this? — The Human Genome Project (HGP) was an international scientific research project.', answer: 'The Human Genome Project HGP', options: ['The Human Genome Project HGP', 'Comparative genomics is the systematic', 'BACs Bacterial Artificial Chromosomes and', 'Transgenic plants are genetically modified'] },
            { id: 's2', label: 'Comparative genomics is the systematic', prompt: 'Which idea is this? — Comparative genomics is the systematic analysis of genome structure, gene content, and.', answer: 'Comparative genomics is the systematic', options: ['Comparative genomics is the systematic', 'The Human Genome Project HGP', 'BACs Bacterial Artificial Chromosomes and', 'Transgenic plants are genetically modified'] },
            { id: 's3', label: 'BACs Bacterial Artificial Chromosomes and', prompt: 'Which idea is this? — BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes) are.', answer: 'BACs Bacterial Artificial Chromosomes and', options: ['BACs Bacterial Artificial Chromosomes and', 'The Human Genome Project HGP', 'Comparative genomics is the systematic', 'Transgenic plants are genetically modified'] },
            { id: 's4', label: 'Transgenic plants are genetically modified', prompt: 'Which idea is this? — Transgenic plants are genetically modified organisms created by introducing foreign DNA.', answer: 'Transgenic plants are genetically modified', options: ['Transgenic plants are genetically modified', 'The Human Genome Project HGP', 'Comparative genomics is the systematic', 'BACs Bacterial Artificial Chromosomes and'] }
          ] } }
    ],
    explore: { component: C12_BiotechnologyRiceGenomeProjectSim, prompt: 'Explore the interactive — Human Genome Project: Goals and Key Findings' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_005', difficulty: 'standard',
          question: 'The Human Genome Project (HGP) was an international scientific research project.',
          hint: 'Revisit c12_biotech_cbse_05_002 (Structural Genomics) sections on STS mapping and BAC.',
          misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Human Genome Project (HGP) was an international scientific research project',
                  options: ['The Human Genome Project (HGP) was an international scientific research project', 'Comparative genomics is the systematic analysis of genome structure, gene content, and', 'BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes) are', 'Transgenic plants are genetically modified organisms created by introducing foreign DNA'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Human Genome Project "finished" in 2003 with a single, complete, error-free sequence of one human.' }
          ],
            remediations: { 'the-human-genome-project-finished': { steps: ['If a student holds this misconception, guide them through: (1) Show the 2001 Nature/Science papers labeled "draft.', '(3) Assign a mini-task: Use UCSC Genome Browser to view gap tracks in GRCh37 vs GRCh38 vs T2T-CHM13.', '(4) Re-ask Diagnostic Question 5 to confirm corrected understanding.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_05_004', difficulty: 'standard',
          question: 'Comparative genomics is the systematic analysis of genome structure, gene.',
          hint: 'If stuck on orthology/paralogy: revisit c11_biotech_cbse_09_010 (Phylogenetic Trees) and.',
          misconception: 'Students often believe "synteny means identical gene order" and "high sequence similarity = orthologs".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparative genomics is the systematic analysis of genome structure, gene content, and',
                  options: ['Comparative genomics is the systematic analysis of genome structure, gene content, and', 'The Human Genome Project (HGP) was an international scientific research project', 'BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes) are', 'Transgenic plants are genetically modified organisms created by introducing foreign DNA'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "synteny means identical gene order" and "high sequence similarity = orthologs".' }
          ],
            remediations: { 'synteny-means-identical-gene-order': { steps: ['If the student conflates synteny with homology or orthology with similarity: Step 1 — Revisit c11_biotech_cbse_09_009.', 'Step 2 — Draw a simple scenario: ancestral gene duplicates → two paralogs in Species 1, one ortholog in Species 2.', 'Show how reciprocal best BLAST hit fails here.', 'Step 3 — Use a synteny browser (e.g., Ensembl Region in Detail view) for human-mouse chr17 to visually identify.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_010', difficulty: 'standard',
          question: 'BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes).',
          hint: 'Revisit c12_biotech_cbse_01_008 (lambda phage) and c12_biotech_cbse_01_009 (cosmids) to.',
          misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with.',
          parts: [
                { id: 'a', prompt: 'Explain why a YAC vector must contain three specific yeast chromosomal elements — ARS, CEN, and TEL — and what function each serves in the yeast host.', answer: 'ARS (Autonomously Replicating Sequence) acts as the origin of replication',
                  options: ['ARS (Autonomously Replicating Sequence) acts as the origin of replication', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' },
                { id: 'b', prompt: 'A researcher wants to construct a genomic library for a 3 Gb mammalian genome.', answer: 'For BAC: N = ln(0.01) / ln(1 - 150,000/3,000,000,000) ≈ 207,000 clones',
                  options: ['For BAC: N = ln(0.01) / ln(1 - 150,000/3,000,000,000) ≈ 207,000 clones', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' },
                { id: 'c', prompt: 'Compare the copy number control mechanisms of BACs and standard high-copy plasmids (e.g., pUC19).', answer: 'pUC19 uses a mutated pMB1 origin (rop deletion) giving 500–700 copies/cell',
                  options: ['pUC19 uses a mutated pMB1 origin (rop deletion) giving 500–700 copies/cell', 'high copy gives more DNA yield', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' }
          ],
            remediations: { 'yacs-are-better-than-bacs': { steps: ['If the student holds the above misconception: (1) Have them re-read the vector comparison table in NCERT Class 12 Ch.2.', '(2) Ask them to explain why the Human Genome Project used BACs, not YACs, for the final assembly — guide them to find.', '(3) Give a mini-case: "You have a 200 kb human gene with introns.', 'You want to express the protein.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "YACs are superior to BACs for all genomic library projects because they can clone larger inserts (up to 1 Mb) and propagate in a.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' },
                { id: 'b', prompt: 'Design a minimal BAC vector map for a 150 kb human genomic insert.', answer: 'A correct map shows a circular ~7.5 kb vector backbone with the above elements',
                  options: ['A correct map shows a circular ~7.5 kb vector backbone with the above elements', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' }
          ],
            remediations: { 'yacs-are-better-than-bacs': { steps: ['If the student holds the above misconception: (1) Have them re-read the vector comparison table in NCERT Class 12 Ch.2.', '(2) Ask them to explain why the Human Genome Project used BACs, not YACs, for the final assembly — guide them to find.', '(3) Give a mini-case: "You have a 200 kb human gene with introns.', 'You want to express the protein.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_001', difficulty: 'standard',
          question: 'Transgenic plants are genetically modified organisms created by introducing.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
          misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.',
          parts: [
                { id: 'a', prompt: 'Name the two principal gene transfer methods used for creating transgenic plants and state the biological basis of each method in one sentence.', answer: '(1) *Agrobacterium tumefaciens*-mediated transformation',
                  options: ['Correct answer: (1) *Agrobacterium tumefaciens*-mediated transformation', 'electroporation and microinjection', '*Agrobacterium* transfers the entire Ti plasmid into the plant cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.' }
          ],
            remediations: { 'agrobacterium-transfers-the-entire-ti': { steps: ['If a student cannot distinguish T-DNA from the whole Ti plasmid: (1) Have them draw the Ti plasmid map labeling T-DNA.', '(2) Walk through the molecular steps: wound phenolics → VirA/VirG two-component system → *vir* gene expression →.', '(3) Give a binary vector diagram and ask them to circle the region that enters the plant.', '(4) Re-test with a diagnostic: "A binary vector has the gene of interest between LB and RB, but the *nptII* marker is.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "For commercial transgenic crop development, *Agrobacterium* transformation should always be used because it gives.', answer: 'Correct evaluation: The statement is an oversimplification',
                  options: ['Correct evaluation: The statement is an oversimplification', '*Agrobacterium* transfers the entire Ti plasmid into the plant cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.' },
                { id: 'b', prompt: 'Design a minimal binary vector map (describe components in order) for *Agrobacterium*-mediated transformation of tomato with a fruit-specific promoter driving.', answer: 'Expected answer (components in order on T-DNA): Left Border (LB)',
                  options: ['Expected answer (components in order on T-DNA): Left Border (LB)', '*Agrobacterium* transfers the entire Ti plasmid into the plant cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.' }
          ],
            remediations: { 'agrobacterium-transfers-the-entire-ti': { steps: ['If a student cannot distinguish T-DNA from the whole Ti plasmid: (1) Have them draw the Ti plasmid map labeling T-DNA.', '(2) Walk through the molecular steps: wound phenolics → VirA/VirG two-component system → *vir* gene expression →.', '(3) Give a binary vector diagram and ask them to circle the region that enters the plant.', '(4) Re-test with a diagnostic: "A binary vector has the gene of interest between LB and RB, but the *nptII* marker is.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
