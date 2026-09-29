import type { SimDef } from '../../engine/types';
import C12_BiotechnologyGeneCloningSim from '../../../simulations/c6_12/C12_BiotechnologyGeneCloningSim';

/** v3 wrapped master — C12_BiotechnologyGeneCloningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechnologygenecloningsim: SimDef = {
    id: 'v3w_c12_biotechnologygenecloningsim',
    title: 'Gene Cloning: Definition and Step-by-Step Overview',
    subtitle: 'This node covers the definition of gene cloning, the 7-step conceptual workflow, and the.',
    classLevel: 12, subject: 'biotechnology', topic: 'Gene Cloning: Definition and Step-by-Step Overview',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_03_001', 'c12_biotech_cbse_03_003', 'c12_biotech_cbse_03_004', 'c12_biotech_cbse_03_006', 'c12_biotech_cbse_03_007', 'c12_biotech_cbse_03_008', 'c12_biotech_cbse_03_010', 'c12_biotech_cbse_03_011', 'c12_biotech_cbse_01_002', 'c12_biotech_cbse_01_007', 'c12_biotech_cbse_01_008', 'c12_biotech_cbse_01_011', 'c12_biotech_cbse_01_012', 'c12_biotech_cbse_04_001', 'c12_biotech_cbse_04_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a biotechnologist at Bharat Biotech tasked with producing human insulin for diabetes patients.', goal: 'Master Gene Cloning: Definition and Step-by-Step Overview.' },
    discovery: {
        question: 'A research team wants to clone a **eukaryotic gene with 5 introns** into *E. coli* for protein production.',
        options: ['**Option B (cDNA) will yield functional protein', 'genomic DNA has the complete gene', 'complete gene'],
        answer: '**Option B (cDNA) will yield functional protein',
        hook: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and.',
    },
    teaching: [
        { title: 'Gene cloning is the process of creating.', text: 'Gene cloning is the process of creating multiple identical copies (clones) of a specific gene or DNA fragment by inserting it into a vector (e.g., plasmid), introducing the recombinant DNA into a.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_001', title: 'Gene cloning is the process of creating.',
          scaffold: { problem: 'A biotech startup in Bengaluru wants to clone the human *EPO* (erythropoietin) gene into *E. coli* for anemia treatment.',
            steps: [
            { text: 'Identify that genomic DNA contains 4 introns that must be removed for bacterial expression.' },
            { text: 'For genomic DNA approach: 4 introns → at least 4 digestion-ligation cycles (one per intron) to assemble exon-only.' },
            { text: 'For cDNA approach: mRNA is already spliced (introns removed by spliceosome).' },
            { text: 'Compare: genomic DNA requires ≥4 cycles; cDNA requires 1 cycle.' },
            { text: 'Conclude that cDNA is preferred for eukaryotic protein expression in prokaryotes because it bypasses the need for in.', faded: true, blankAnswer: 'Genomic DNA approach: minimum 4 digestion-ligation cycles.' }
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
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_006', title: 'The introduction of recombinant DNA.',
          scaffold: { problem: 'A student attempts to transform E. coli DH5α with a 5 kb recombinant plasmid using the CaCl₂ heat-shock method.',
            steps: [
            { text: 'Identify the omitted step — 0°C incubation of DNA with CaCl₂-treated cells.' },
            { text: 'Explain the role of 0°C: Ca²⁺ neutralizes negative charges on DNA and LPS/phospholipids; low temperature stabilizes the.' },
            { text: 'Explain the consequence of skipping 0°C: DNA does not adsorb efficiently to cells; heat shock alone cannot drive.' },
            { text: 'Explain why 90 sec at 42°C is excessive: standard is 30–50 sec; prolonged heat shock denatures membrane proteins and.' },
            { text: 'Write corrected protocol: (i) Thaw competent cells on ice; (ii) Add 1–10 ng plasmid DNA, incubate 30 min on ice; (iii).', faded: true, blankAnswer: 'Failure due to omitted 0°C adsorption step and excessive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_03_007', title: 'Selection of recombinant clones using.',
          scaffold: { problem: 'You have a plasmid vector pBR322 with two antibiotic resistance genes: ampR (ampicillin resistance) and tetR (tetracycline resistance).',
            steps: [
            { text: 'Identify the selection scheme. Master plate has ampicillin → selects for ANY transformant (both recombinant and.' },
            { text: 'Determine genotypes. Non-recombinant plasmid: ampR⁺ tetR⁺ (intact tetR).' },
            { text: 'Map phenotypes. On master plate (Amp): both genotypes grow → total transformant colonies = 120.' },
            { text: 'Calculate recombinant count. Recombinant colonies = Total on master - Colonies growing on replica = 120 - 85 = 35.' },
            { text: 'Verify logic. Non-recombinant = 85, Recombinant = 35, Total = 120. Consistent.', faded: true, blankAnswer: '35 recombinant clones.' }
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
        { type: 'dissect', nodeId: 'c12_biotech_cbse_03_003', title: 'Identify each idea',
          dissect: { specimen: 'Gene Cloning: Definition and Step-by-Step Overview', spots: [
            { id: 's1', label: 'Gene cloning is the process', prompt: 'Which idea is this? — Gene cloning is the process of creating multiple identical copies (clones) of a specific.', answer: 'Gene cloning is the process', options: ['Gene cloning is the process', 'A cDNA library is a', 'A genomic library is a', 'The introduction of recombinant DNA'] },
            { id: 's2', label: 'A cDNA library is a', prompt: 'Which idea is this? — A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into.', answer: 'A cDNA library is a', options: ['A cDNA library is a', 'Gene cloning is the process', 'A genomic library is a', 'The introduction of recombinant DNA'] },
            { id: 's3', label: 'A genomic library is a', prompt: 'Which idea is this? — A genomic library is a collection of cloned DNA fragments representing the entire genome.', answer: 'A genomic library is a', options: ['A genomic library is a', 'Gene cloning is the process', 'A cDNA library is a', 'The introduction of recombinant DNA'] },
            { id: 's4', label: 'The introduction of recombinant DNA', prompt: 'Which idea is this? — The introduction of recombinant DNA (rDNA) into a host cell is the process by which a.', answer: 'The introduction of recombinant DNA', options: ['The introduction of recombinant DNA', 'Gene cloning is the process', 'A cDNA library is a', 'A genomic library is a'] },
            { id: 's5', label: 'Selection of recombinant clones using', prompt: 'Which idea is this? — Selection of recombinant clones using markers is the process of identifying and isolating.', answer: 'Selection of recombinant clones using', options: ['Selection of recombinant clones using', 'Gene cloning is the process', 'A cDNA library is a', 'A genomic library is a'] },
            { id: 's6', label: 'Colony hybridization is a nucleic', prompt: 'Which idea is this? — Colony hybridization is a nucleic acid screening technique where bacterial colonies (or.', answer: 'Colony hybridization is a nucleic', options: ['Colony hybridization is a nucleic', 'Gene cloning is the process', 'A cDNA library is a', 'A genomic library is a'] }
          ] } }
    ],
    explore: { component: C12_BiotechnologyGeneCloningSim, prompt: 'Explore the interactive — Gene Cloning: Definition and Step-by-Step Overview' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_001', difficulty: 'standard',
          question: 'Gene cloning is the process of creating multiple identical copies (clones) of a.',
          hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
          misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and.',
          parts: [
                { id: 'a', prompt: 'Compare **genomic library** and **cDNA library** construction with respect to: (a) starting material, (b) representation of introns, (c) tissue specificity,.', answer: '| Feature | Genomic Library | cDNA Library |',
                  options: ['| Feature | Genomic Library | cDNA Library |', 'Which step is unique to gene cloning and not PCR?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and equate them.' }
          ],
            remediations: { 'gene-cloning-pcr-because-both': { steps: ['Ligation → joins insert to vector"). Do not look at notes. 3. **Create a 2-column table**: "Gene Cloning" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and.',
          parts: [
                { id: 'a', prompt: 'A research team wants to clone a **eukaryotic gene with 5 introns** into *E. coli* for protein production.', answer: '**Option B (cDNA) will yield functional protein',
                  options: ['**Option B (cDNA) will yield functional protein', 'genomic DNA has the complete gene', 'complete gene', 'expressible gene'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and equate them.' },
                { id: 'b', prompt: 'Compare **genomic library** and **cDNA library** construction with respect to: (a) starting material, (b) representation of introns, (c) tissue specificity,.', answer: '| Feature | Genomic Library | cDNA Library |',
                  options: ['| Feature | Genomic Library | cDNA Library |', 'Which step is unique to gene cloning and not PCR?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and equate them.' }
          ],
            remediations: { 'gene-cloning-pcr-because-both': { steps: ['Ligation → joins insert to vector"). Do not look at notes. 3. **Create a 2-column table**: "Gene Cloning" vs.'] } } },
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
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_006', difficulty: 'standard',
          question: 'The introduction of recombinant DNA (rDNA) into a host cell is the process by.',
          hint: 'If stuck, revisit Class 11 Biology node c11_bio_cbse_08_003 (Cell Membrane: Fluid Mosaic.',
          misconception: '**Misconception:** "Transformation, transfection, and transduction are synonyms — they all mean putting DNA into.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the **biolistic (gene gun)** method with **microinjection** in terms of: (a) target cell types, (b) throughput, (c) technical skill.', answer: '| Feature | Biolistic (Gene Gun) | Microinjection |',
                  options: ['| Feature | Biolistic (Gene Gun) | Microinjection |', 'gene gun is for animal cells only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Transformation, transfection, and transduction are synonyms — they all mean putting DNA into cells." **Why it\'s.' }
          ],
            remediations: { 'misconception-transformation': { steps: ['If the student cannot distinguish the three terms or match methods to cell types: 1.', '**Revisit node c12_biotech_cbse_03_005** (Insertion of Foreign DNA into a Suitable Vector) to recall that rDNA must be.', '**Create a 3-column table** (Natural Mechanism | Artificial Method | Host Cell Type) and fill it using NCERT Fig.', '**Watch a 2-minute animation** of electroporation (pore formation) and biolistic (particle penetration) — visualizing.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Transformation, transfection, and transduction are synonyms — they all mean putting DNA into.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the **biolistic (gene gun)** method with **microinjection** in terms of: (a) target cell types, (b) throughput, (c) technical skill.', answer: '| Feature | Biolistic (Gene Gun) | Microinjection |',
                  options: ['| Feature | Biolistic (Gene Gun) | Microinjection |', 'gene gun is for animal cells only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Transformation, transfection, and transduction are synonyms — they all mean putting DNA into cells." **Why it\'s.' }
          ],
            remediations: { 'misconception-transformation': { steps: ['If the student cannot distinguish the three terms or match methods to cell types: 1.', '**Revisit node c12_biotech_cbse_03_005** (Insertion of Foreign DNA into a Suitable Vector) to recall that rDNA must be.', '**Create a 3-column table** (Natural Mechanism | Artificial Method | Host Cell Type) and fill it using NCERT Fig.', '**Watch a 2-minute animation** of electroporation (pore formation) and biolistic (particle penetration) — visualizing.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_007', difficulty: 'standard',
          question: 'Selection of recombinant clones using markers is the process of identifying and.',
          hint: 'If stuck, revisit c12_biotech_cbse_03_005 (vector components) and c11_biotech_cbse_07_010.',
          misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.',
          parts: [
                { id: 'a', prompt: 'A student writes: "In blue-white screening, the recombinant colonies are blue because the insert activates the lacZ gene." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '**antibiotic resistance alone can identify recombinant clones**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.' },
                { id: 'b', prompt: 'A researcher wants to clone a 2.5 kb human gene into a plasmid vector that has only a single ampicillin resistance marker (ampR) and no lacZ.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'selection for transformation', 'selection for recombination'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.' }
          ],
            remediations: { 'antibiotic-resistance-alone-can-identify': { steps: ['If a student exhibits the above misconceptions: 1.', '**Re-teach the distinction between selection and screening** using a 2-column table: Selection = survival/growth (e.g.,.', 'Emphasise: selection markers must remain functional in recombinants; screening markers are intentionally inactivated.', '**Walk through the blue-white mechanism stepwise**: (a) Vector has lacZ with MCS inside.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.',
          parts: [
                { id: 'a', prompt: 'Evaluate this experimental design: "To select recombinants, I will use a vector with ampR and lacZ. I will clone my insert into the ampR gene.', answer: 'The design has a **critical flaw**: if the insert is cloned into the ampR gene,',
                  options: ['The design has a **critical flaw**: if the insert is cloned into the ampR gene,', '**antibiotic resistance alone can identify recombinant clones**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.' }
          ],
            remediations: { 'antibiotic-resistance-alone-can-identify': { steps: ['If a student exhibits the above misconceptions: 1.', '**Re-teach the distinction between selection and screening** using a 2-column table: Selection = survival/growth (e.g.,.', 'Emphasise: selection markers must remain functional in recombinants; screening markers are intentionally inactivated.', '**Walk through the blue-white mechanism stepwise**: (a) Vector has lacZ with MCS inside.'] } } },
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
            remediations: { 'colony-hybridization-and-blue-white': { steps: ['Revisit node c12_biotech_cbse_03_007 (Selection of Recombinant Clones Using Markers) and explicitly list what each.', 'Re-read the NCERT Fig 3.13 and 3.14 captions to see that replica plating on ampicillin distinguishes recombinant from.', 'Practice a diagnostic question: "You have 500 white colonies. How do you find the one with the human insulin gene?" —.', 'If still confused, draw a flowchart: Transformation → Plate on Amp+X-gal → White colonies → Colony lift → Hybridize.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
