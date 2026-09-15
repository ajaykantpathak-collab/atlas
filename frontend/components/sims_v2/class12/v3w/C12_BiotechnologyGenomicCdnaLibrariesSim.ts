import type { SimDef } from '../../engine/types';
import C12_BiotechnologyGenomicCdnaLibrariesSim from '../../../simulations/c6_12/C12_BiotechnologyGenomicCdnaLibrariesSim';

/** v3 wrapped master — C12_BiotechnologyGenomicCdnaLibrariesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechnologygenomiccdnalibrariessim: SimDef = {
    id: 'v3w_c12_biotechnologygenomiccdnalibrariessim',
    title: 'nology Genomic Cdna Libraries',
    subtitle: 'This node covers the definition, construction workflow (genomic DNA isolation →.',
    classLevel: 12, subject: 'biotechnology', topic: 'Genomic Library: Construction and Representation',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_03_002', 'c12_biotech_cbse_03_003', 'c12_biotech_cbse_03_004', 'c12_biotech_cbse_03_008', 'c12_biotech_cbse_01_008', 'c12_biotech_cbse_01_010', 'c12_biotech_cbse_02_005', 'c12_biotech_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you have the entire instruction manual for building a human (the genome) but it\'s one massive.', goal: 'Master nology Genomic Cdna Libraries.' },
    discovery: {
        question: 'A research team constructs a genomic library using a plasmid vector (max insert 10 kb) for a 3 Gb mammalian genome. They obtain 50,000 independent clones.',
        options: ['f = 10 kb / 3,000,000 kb = 3.33×10⁻⁶', '50,000 clones is plenty', 'only genes'],
        answer: 'f = 10 kb / 3,000,000 kb = 3.33×10⁻⁶',
        hook: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene.',
    },
    teaching: [
        { title: 'A genomic library is a collection of.', text: 'A genomic library is a collection of recombinant DNA clones, each containing a different fragment of an organism\'s entire genomic DNA, that together represent the complete genome including both.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_002', title: 'A genomic library is a collection of.',
          scaffold: { problem: 'A researcher wants to construct a genomic library for rice (Oryza sativa) with a haploid genome size of 430 Mb.',
            steps: [
            { text: 'Identify the genome coverage formula for probability P: N = ln(1-P) / ln(1 - I/G), where I = insert size, G = genome.' },
            { text: 'Convert all units to base pairs: I = 150 kb = 150,000 bp; G = 430 Mb = 430,000,000 bp.' },
            { text: 'Calculate fractional coverage per clone: f = I/G = 150,000 / 430,000,000 = 3.488 × 10⁻⁴.' },
            { text: 'Substitute P = 0.999 into formula: ln(1-0.999) = ln(0.001) = -6.9078; ln(1-f) = ln(1 - 3.488×10⁻⁴) = ln(0.9996512) ≈.' },
            { text: 'Compute N = (-6.9078) / (-3.4886×10⁻⁴) = 19,798 clones.' },
            { text: 'Calculate plates: 19,798 clones ÷ 384 clones/plate = 51.56 → 52 plates (round up).', faded: true, blankAnswer: '19,798 independent clones; 52 plates (384-well format).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_003', title: 'A cDNA library is a collection of.',
          scaffold: { problem: 'A researcher isolates 5 μg of total RNA from human pancreatic tissue. mRNA constitutes 2% of total RNA. The average mRNA length is 2.5 kb.',
            steps: [
            { text: 'Calculate mass of mRNA = 2% of 5 μg = 0.1 μg = 1 × 10⁻⁷ g.' },
            { text: 'Calculate molar mass of average mRNA = 2500 nucleotides × 340 g/mol/nucleotide = 8.5 × 10⁵ g/mol.' },
            { text: 'Calculate moles of mRNA = mass / molar mass = (1 × 10⁻⁷ g) / (8.5 × 10⁵ g/mol) = 1.176 × 10⁻¹³ mol.' },
            { text: 'Calculate number of molecules = moles × Avogadro\'s number = (1.176 × 10⁻¹³ mol) × (6.022 × 10²³ mol⁻¹) = 7.08 × 10¹⁰.' },
            { text: 'Interpret: ~7 × 10¹⁰ mRNA molecules represent the starting template complexity.', faded: true, blankAnswer: '7.08 × 10¹⁰ mRNA molecules' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_004', title: 'A genomic library is a collection of.',
          scaffold: { problem: 'A research team wants to study the *entire regulatory landscape* of the human *p53* tumor suppressor gene — including its promoter,.',
            steps: [
            { text: 'Identify the research goal — comprehensive regulatory analysis (promoter, enhancers, intronic elements, splicing.' },
            { text: 'List what each library contains: Genomic library = entire gene locus with all introns, exons, promoter, enhancers,.' },
            { text: 'Match goal to library content: Regulatory landscape requires *non-transcribed* sequences (promoter/enhancers) and.' },
            { text: 'Identify the specific limitation of cDNA library: It lacks *all* non-transcribed regulatory DNA and *all* intronic.' },
            { text: 'Conclude: Genomic library is primary; cDNA library can only supplement by confirming expressed isoforms in liver.', faded: true, blankAnswer: 'Primary resource = human genomic library. Limitation of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_008', title: 'Colony hybridization is a nucleic acid.',
          scaffold: { problem: 'A genomic library of Arabidopsis thaliana has 50,000 independent clones.',
            steps: [
            { text: 'Calculate number of genome equivalents (N) = (Number of clones × Insert size) / Genome size = (50,000 × 15,000 bp) /.' },
            { text: 'Calculate probability gene is present at least once: P = 1 - e^(-N) = 1 - e^(-5.56) ≈ 1 - 0.00386 = 0.99614 (99.6%).' },
            { text: 'Expected number of positive colonies = N × (probability a given clone contains the gene) = N × (Insert size / Genome.' },
            { text: 'Since the gene is single-copy, each genome equivalent contributes ~1 positive clone.' },
            { text: 'Verify: N = 5.56 means the library covers the genome 5.56 times → a single-copy gene should appear ~5.56 times. Matches.', faded: true, blankAnswer: 'Probability = 99.6%; Expected positive colonies ≈ 5-6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_01_008', title: 'Bacteriophage lambda (λ) is a.',
          scaffold: { problem: 'A lambda replacement vector has left and right arms of 18.5 kb and 11.5 kb after deletion of the non-essential region.',
            steps: [
            { text: 'Calculate total vector arm size = left arm + right arm = 18.5 kb + 11.5 kb = 30.0 kb.' },
            { text: 'Calculate recombinant genome size = vector arms + insert = 30.0 kb + 16.2 kb = 46.2 kb.' },
            { text: 'Compare with packaging limits: lower limit = 37 kb, upper limit = 52 kb.' },
            { text: '46.2 kb is between 37 and 52 kb → yes, it is packageable.' },
            { text: 'Minimum insert size = lower packaging limit – vector arms = 37 kb – 30.0 kb = 7.0 kb.', faded: true, blankAnswer: 'Recombinant genome size = 46.2 kb, which is within the.' }
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
        { type: 'dissect', nodeId: 'c12_biotech_cbse_03_003', title: 'Identify each idea',
          dissect: { specimen: 'nology Genomic Cdna Libraries', spots: [
            { id: 's1', label: 'A genomic library is a', prompt: 'Which idea is this? — A genomic library is a collection of recombinant DNA clones, each containing a different.', answer: 'A genomic library is a', options: ['A genomic library is a', 'A cDNA library is a', 'Colony hybridization is a nucleic', 'Bacteriophage lambda is a'] },
            { id: 's2', label: 'A cDNA library is a', prompt: 'Which idea is this? — A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into.', answer: 'A cDNA library is a', options: ['A cDNA library is a', 'A genomic library is a', 'Colony hybridization is a nucleic', 'Bacteriophage lambda is a'] },
            { id: 's3', label: 'Colony hybridization is a nucleic', prompt: 'Which idea is this? — Colony hybridization is a nucleic acid screening technique where bacterial colonies (or.', answer: 'Colony hybridization is a nucleic', options: ['Colony hybridization is a nucleic', 'A genomic library is a', 'A cDNA library is a', 'Bacteriophage lambda is a'] },
            { id: 's4', label: 'Bacteriophage lambda is a', prompt: 'Which idea is this? — Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E.', answer: 'Bacteriophage lambda is a', options: ['Bacteriophage lambda is a', 'A genomic library is a', 'A cDNA library is a', 'Colony hybridization is a nucleic'] },
            { id: 's5', label: 'BACs Bacterial Artificial Chromosomes and', prompt: 'Which idea is this? — BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes) are.', answer: 'BACs Bacterial Artificial Chromosomes and', options: ['BACs Bacterial Artificial Chromosomes and', 'A genomic library is a', 'A cDNA library is a', 'Colony hybridization is a nucleic'] }
          ] } }
    ],
    explore: { component: C12_BiotechnologyGenomicCdnaLibrariesSim, prompt: 'Explore the interactive — nology Genomic Cdna Libraries' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_002', difficulty: 'standard',
          question: 'A genomic library is a collection of recombinant DNA clones, each containing a.',
          hint: 'Revisit c11_biotech_cbse_12_007 (Restriction Enzymes: Types and Cleavage Patterns) for.',
          misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A genomic library is a collection of recombinant DNA clones, each containing a different',
                  options: ['A genomic library is a collection of recombinant DNA clones, each containing a different', 'A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into', 'A genomic library is a collection of cloned DNA fragments representing the entire genome', 'Colony hybridization is a nucleic acid screening technique where bacterial colonies (or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene set." They write:.' }
          ],
            remediations: { 'a-genomic-library-contains-only': { steps: ['If the student cannot distinguish genomic vs.', 'cDNA library content: (1) Have them draw a eukaryotic gene structure (promoter-exon-intron-exon-terminator) on paper.', '(2) Ask: "If I isolate DNA from the nucleus, what sequences are physically present?" → Answer: Everything in the.', '(3) Ask: "If I isolate mRNA from cytoplasm and make cDNA, what sequences remain?" → Answer: Only exons (spliced).'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene.',
          parts: [
                { id: 'a', prompt: 'A research team constructs a genomic library using a plasmid vector (max insert 10 kb) for a 3 Gb mammalian genome. They obtain 50,000 independent clones.', answer: 'f = 10 kb / 3,000,000 kb = 3.33×10⁻⁶',
                  options: ['f = 10 kb / 3,000,000 kb = 3.33×10⁻⁶', '50,000 clones is plenty', 'only genes', 'only exons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene set." They write:.' },
                { id: 'b', prompt: 'Design a strategy to construct a genomic library for a newly sequenced extremophile bacterium with a 4.2 Mb genome, where the goal is to express.', answer: 'vector choice with justification, (',
                  options: ['vector choice with justification, (', 'only genes', 'only exons', 'genome'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene set." They write:.' }
          ],
            remediations: { 'a-genomic-library-contains-only': { steps: ['If the student cannot distinguish genomic vs.', 'cDNA library content: (1) Have them draw a eukaryotic gene structure (promoter-exon-intron-exon-terminator) on paper.', '(2) Ask: "If I isolate DNA from the nucleus, what sequences are physically present?" → Answer: Everything in the.', '(3) Ask: "If I isolate mRNA from cytoplasm and make cDNA, what sequences remain?" → Answer: Only exons (spliced).'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_003', difficulty: 'standard',
          question: 'A cDNA library is a collection of cloned complementary DNA (cDNA) fragments.',
          hint: 'Revisit c11_biotech_cbse_07_004 (Post-Transcriptional Modifications) and.',
          misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and.',
          parts: [
                { id: 'a', prompt: 'Why is RNase H treatment necessary after first-strand cDNA synthesis, and why can\'t we simply heat-denature the RNA-DNA hybrid like in PCR?', answer: 'RNase H specifically degrades the RNA strand in an RNA-DNA hybrid, leaving the',
                  options: ['RNase H specifically degrades the RNA strand in an RNA-DNA hybrid, leaving the', 'heat denaturation works fine', 'cDNA is a copy of the gene'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and regulatory regions —.' },
                { id: 'b', prompt: 'A researcher constructs a cDNA library from human liver mRNA using oligo-dT priming.', answer: 'Insulin is expressed only in pancreatic beta cells, not in liver',
                  options: ['Insulin is expressed only in pancreatic beta cells, not in liver', 'the insulin gene is missing from the genome', 'oligo-dT didn\'t bind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and regulatory regions —.' },
                { id: 'c', prompt: 'Compare the representation of a typical eukaryotic gene (with 3 exons and 2 introns) in a genomic library versus a cDNA library from the same tissue where the.', answer: 'In the genomic library, the insert will contain exons AND introns (plus flanking',
                  options: ['In the genomic library, the insert will contain exons AND introns (plus flanking', 'both have introns', 'cDNA has promoter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and regulatory regions —.' }
          ],
            remediations: { 'cdna-libraries-contain-the-gene': { steps: ['Draw a pre-mRNA with exons/introns.', 'Show splicing removing introns.', 'Show mature mRNA with 5\' cap and poly-A tail.', 'Show reverse transcriptase binding oligo-dT to poly-A tail and copying only the mature sequence.', 'Ask: "Where are the introns now?" — they were never in the mRNA template.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_004', difficulty: 'standard',
          question: 'A genomic library is a collection of cloned DNA fragments representing the.',
          hint: 'If stuck, revisit **c11_biotech_cbse_07_005** (RNA Splicing) and.',
          misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk.".',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since cDNA is made from mRNA, a cDNA library contains the promoter and enhancer sequences needed for gene expression." Explain why this.', answer: 'Promoters and enhancers are *not transcribed* into mRNA',
                  options: ['Promoters and enhancers are *not transcribed* into mRNA', 'regulatory sequences', 'coding sequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk." This is wrong in two.' },
                { id: 'b', prompt: 'You want to clone the human *beta-globin* gene (which has 3 exons and 2 introns) for expression in *E. coli*.', answer: 'Step 1: Identify the goal',
                  options: ['Step 1: Identify the goal', 'smaller versions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk." This is wrong in two.' }
          ],
            remediations: { 'cdna-libraries-are-smaller-versions': { steps: ['If the student confuses library content or choice: (1) Revisit **c12_biotech_cbse_03_002** (Genomic Library.', '(2) Revisit **c12_biotech_cbse_03_003** (cDNA Library Construction) — trace the mRNA → cDNA steps: *which sequences are.', '(3) Re-do **DIAGNOSTIC_QUESTION_3** with a new gene (e.g., human *factor VIII* — large, many introns) and *write* the.', '(4) Create a 2-column "What I lose vs.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk.".',
          parts: [
                { id: 'a', prompt: 'Evaluate this research plan: "To identify the promoter responsible for liver-specific expression of albumin, I will screen a human liver cDNA library with an.', answer: 'The plan is *unsound*',
                  options: ['The plan is *unsound*', 'gene identification', 'regulatory element identification', 'smaller versions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk." This is wrong in two.' },
                { id: 'b', prompt: 'Design a two-library strategy to isolate the *full-length genomic sequence* (including introns and promoter) of a novel heat-shock gene in *Arabidopsis*, given.', answer: 'Step 1: Use the partial cDNA as a *probe* to screen a *genomic* library',
                  options: ['Step 1: Use the partial cDNA as a *probe* to screen a *genomic* library', 'smaller versions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk." This is wrong in two.' }
          ],
            remediations: { 'cdna-libraries-are-smaller-versions': { steps: ['If the student confuses library content or choice: (1) Revisit **c12_biotech_cbse_03_002** (Genomic Library.', '(2) Revisit **c12_biotech_cbse_03_003** (cDNA Library Construction) — trace the mRNA → cDNA steps: *which sequences are.', '(3) Re-do **DIAGNOSTIC_QUESTION_3** with a new gene (e.g., human *factor VIII* — large, many introns) and *write* the.', '(4) Create a 2-column "What I lose vs.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_008', difficulty: 'standard',
          question: 'Colony hybridization is a nucleic acid screening technique where bacterial.',
          hint: 'Review c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) — focus on base pairing.',
          misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In.',
          parts: [
                { id: 'a', prompt: 'In a colony hybridization experiment using a nitrocellulose membrane, a student forgets to bake the membrane at 80°C after transferring colonies.', answer: 'Baking immobilizes DNA covalently to the membrane via cross-linking',
                  options: ['Baking immobilizes DNA covalently to the membrane via cross-linking', 'baking denatures DNA', 'baking activates the probe'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In reality, blue-white.' },
                { id: 'b', prompt: 'Compare Southern, Northern, and Western blotting in a single table with four columns: Target Molecule, Separation Method, Probe/Detector, and Key Chemical.', answer: '| Blot | Target | Separation | Probe/Detector | Immobilization |',
                  options: ['| Blot | Target | Separation | Probe/Detector | Immobilization |', 'screen for recombinants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In reality, blue-white.' }
          ],
            remediations: { 'colony-hybridization-and-blue-white': { steps: ['Revisit node c12_biotech_cbse_03_007 (Selection of Recombinant Clones Using Markers) and explicitly list what each.', 'Re-read the NCERT Fig 3.13 and 3.14 captions to see that replica plating on ampicillin distinguishes recombinant from.', 'Practice a diagnostic question: "You have 500 white colonies. How do you find the one with the human insulin gene?" —.', 'If still confused, draw a flowchart: Transformation → Plate on Amp+X-gal → White colonies → Colony lift → Hybridize.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In.',
          parts: [
                { id: 'a', prompt: 'Design a screening strategy to isolate a gene from a genomic library when: (a) you know the protein sequence but not the DNA sequence, (b) the gene contains.', answer: 'Colony hybridization requires a nucleic acid probe',
                  options: ['Colony hybridization requires a nucleic acid probe', 'screen for recombinants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In reality, blue-white.' },
                { id: 'b', prompt: 'Compare Southern, Northern, and Western blotting in a single table with four columns: Target Molecule, Separation Method, Probe/Detector, and Key Chemical.', answer: '| Blot | Target | Separation | Probe/Detector | Immobilization |',
                  options: ['| Blot | Target | Separation | Probe/Detector | Immobilization |', 'screen for recombinants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In reality, blue-white.' }
          ],
            remediations: { 'colony-hybridization-and-blue-white': { steps: ['Revisit node c12_biotech_cbse_03_007 (Selection of Recombinant Clones Using Markers) and explicitly list what each.', 'Re-read the NCERT Fig 3.13 and 3.14 captions to see that replica plating on ampicillin distinguishes recombinant from.', 'Practice a diagnostic question: "You have 500 white colonies. How do you find the one with the human insulin gene?" —.', 'If still confused, draw a flowchart: Transformation → Plate on Amp+X-gal → White colonies → Colony lift → Hybridize.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_008', difficulty: 'standard',
          question: 'Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E.',
          hint: 'Revisit c12_biotech_cbse_01_007 (pBR322 restriction map and selection) and.',
          misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E',
                  options: ['Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E', 'A genomic library is a collection of recombinant DNA clones, each containing a different', 'A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into', 'A genomic library is a collection of cloned DNA fragments representing the entire genome'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene is expressed from the.' }
          ],
            remediations: { 'lambda-vectors-always-integrate-into': { steps: ['If a student confuses lysogeny with lytic cloning: (1) Have them draw the lambda genome map labeling cos, cI, cII,.', '(2) Ask: "If cI is functional, what phenotype on a lawn?" → turbid plaques (lysogeny).', '(3) Ask: "For cloning, do we want the phage to sleep (lysogeny) or multiply (lysis)?" → multiply.', '(4) Show that insertion vectors disrupt cI → clear plaques = recombinant.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene is.',
          parts: [
                { id: 'a', prompt: 'A researcher constructs a lambda insertion vector by cloning a 2 kb DNA fragment into the unique EcoRI site within the cI gene (non-essential region).', answer: 'Yes, clear plaques confirm insertion',
                  options: ['Yes, clear plaques confirm insertion', 'clear plaques mean no insertion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene is expressed from the.' }
          ],
            remediations: { 'lambda-vectors-always-integrate-into': { steps: ['If a student confuses lysogeny with lytic cloning: (1) Have them draw the lambda genome map labeling cos, cI, cII,.', '(2) Ask: "If cI is functional, what phenotype on a lawn?" → turbid plaques (lysogeny).', '(3) Ask: "For cloning, do we want the phage to sleep (lysogeny) or multiply (lysis)?" → multiply.', '(4) Show that insertion vectors disrupt cI → clear plaques = recombinant.'] } } },
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
            remediations: { 'yacs-are-better-than-bacs': { steps: ['If the student holds the above misconception: (1) Have them re-read the vector comparison table in NCERT Class 12 Ch.2.', '(2) Ask them to explain why the Human Genome Project used BACs, not YACs, for the final assembly — guide them to find.', '(3) Give a mini-case: "You have a 200 kb human gene with introns.', 'You want to express the protein.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
