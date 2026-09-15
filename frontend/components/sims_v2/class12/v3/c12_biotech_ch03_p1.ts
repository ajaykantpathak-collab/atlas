import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch03_p1: SimDef = {
    id: 'v3_c12_biotech_ch03_p1',
    title: 'Gene Cloning · Part 1/2',
    subtitle: 'One cell becomes a factory — the 7-step workflow behind every insulin vial.',
    classLevel: 12, subject: 'biotechnology', topic: 'Gene Cloning · Part 1/2',
    chapters: ['c12_biotech_ch03'],
    nodeIds: ['c12_biotech_cbse_03_001', 'c12_biotech_cbse_03_002', 'c12_biotech_cbse_03_003', 'c12_biotech_cbse_03_004', 'c12_biotech_cbse_03_005', 'c12_biotech_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bioprocess scientist', intro: 'Every recombinant medicine begins as one bacterium carrying one borrowed gene — here\'s the pipeline.', goal: 'Outline the gene cloning workflow and describe the construction and use of a genomic library.' },
    discovery: {
        question: 'Bharat Biotech must mass-produce human insulin — but pancreas extraction can\'t scale. What does \'cloning the insulin gene\' actually accomplish?',
        options: ['Inserting the gene into a vector inside E. coli, which replicates it every division — turning bacteria into insulin factories', 'Growing human pancreas cells in a flask to secrete insulin', 'Copying insulin molecules directly, like a photocopier', 'Fusing two bacteria so they share the insulin gene between them'],
        answer: 'Inserting the gene into a vector inside E. coli, which replicates it every division — turning bacteria into insulin factories',
        hook: 'Cloning a gene isn\'t copying a protein — it\'s hijacking cell division. Each bacterial doubling doubles your DNA cargo, which is why a single recombinant cell becomes an industrial supply.',
    },
    teaching: [
        { title: 'Gene Cloning: Definition and Step-by-Step Overview', text: 'Gene cloning is the process of creating multiple identical copies (clones) of a specific gene or DNA fragment by inserting it into a vector (e.g., plasmid), introducing the recombinant DNA into.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_03_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Execute the 7-step gene cloning workflow for insulin — isolate, cut, ligate, transform, select, amplify, harvest — then build a genomic library and explain how you\'d fish one gene out of billions of fragments.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_001', title: 'Gene Cloning: Definition and Step-by-Step Overview',
          caseStudy: { intro: 'Imagine you are a biotechnologist at Bharat Biotech tasked with producing human insulin for diabetes patients — you cannot extract enough insulin from human.',
            decisions: [{ prompt: 'Define gene cloning in one sentence using the terms "vector", "host cell", and "recombinant DNA".', options: [
                { text: 'Gene cloning is the process of inserting a target DNA fragment into a vector to form', outcome: 'Gene cloning is the process of inserting a target DNA fragment into a vector to form recombinant.' },
                { text: 'Gene cloning is making copies of a gene using PCR', outcome: 'Not quite — **"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and.', reveals: 'gene-cloning-pcr-because-both' },
                { text: 'Which step is unique to gene cloning and not PCR?', outcome: 'Not quite — **"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and.', reveals: 'gene-cloning-pcr-because-both' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_002', title: 'Genomic Library: Construction and Representation',
          caseStudy: { intro: 'Imagine you have the entire instruction manual for building a human (the genome) but it\'s one massive 3-billion-letter book with no index.',
            decisions: [{ prompt: 'Define a genomic library and state the key difference between the DNA inserts in a genomic library versus a cDNA library.', options: [
                { text: 'A genomic library is a collection of clones containing fragments of an organism\'s entire', outcome: 'A genomic library is a collection of clones containing fragments of an organism\'s entire genomic.' },
                { text: 'both contain only exons', outcome: 'Not quite — Students often believe a genomic library contains "only genes" or "only exons" because they equate.', reveals: 'a-genomic-library-contains-only' },
                { text: 'only genes', outcome: 'Not quite — Students often believe a genomic library contains "only genes" or "only exons" because they equate.', reveals: 'a-genomic-library-contains-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_003', title: 'cDNA Library: Construction from mRNA',
          caseStudy: { intro: 'Imagine you want to study the insulin gene — but only in pancreatic beta cells where it\'s actually expressed.',
            decisions: [{ prompt: 'What is the immediate product of reverse transcriptase acting on an mRNA template with an oligo-dT primer?', options: [
                { text: 'The immediate product is a single-stranded cDNA (first strand) hybridized to the mRNA', outcome: 'The immediate product is a single-stranded cDNA (first strand) hybridized to the mRNA template.' },
                { text: 'double-stranded cDNA', outcome: 'Not quite — Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome.', reveals: 'cdna-libraries-contain-the-gene' },
                { text: 'DNA-RNA hybrid with DNA as template', outcome: 'Not quite — Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome.', reveals: 'cdna-libraries-contain-the-gene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_004', title: 'Differences Between Genomic and cDNA Libraries',
          caseStudy: { intro: 'Imagine you are a researcher trying to produce human insulin in bacteria for diabetic patients.',
            decisions: [{ prompt: 'What is the fundamental difference in the *source material* used to construct a genomic library versus a cDNA library?', options: [
                { text: 'A genomic library uses total genomic DNA (isolated from any cell type) as the source,', outcome: 'A genomic library uses total genomic DNA (isolated from any cell type) as the source, while a cDNA.' },
                { text: 'both use DNA', outcome: 'Not quite — Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes.', reveals: 'cdna-libraries-are-smaller-versions' },
                { text: 'smaller versions', outcome: 'Not quite — Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes.', reveals: 'cdna-libraries-are-smaller-versions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_005', title: 'Insertion of Foreign DNA into a Suitable Vector',
          caseStudy: { intro: 'Imagine you have isolated the human insulin gene (≈1.1 kb) and want to clone it into a plasmid vector (≈3 kb) to produce insulin in *E. coli*.',
            decisions: [{ prompt: 'What are the two essential enzymatic activities required to insert a foreign DNA fragment into a plasmid vector, and what specific chemical.', options: [
                { text: 'The two essential enzymes are: (1) Restriction endonuclease (Type II)', outcome: 'The two essential enzymes are: (1) Restriction endonuclease (Type II) — hydrolyses specific.' },
                { text: 'polymerase joins DNA', outcome: 'Not quite — Students often believe that DNA ligase "sticks" any two DNA fragments together like glue.', reveals: 'dna-ligase-sticks-any-two' },
                { text: 'sticks', outcome: 'Not quite — Students often believe that DNA ligase "sticks" any two DNA fragments together like glue.', reveals: 'dna-ligase-sticks-any-two' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Gene Cloning · Part 1/2', spots: [
            { id: 's1', label: 'Gene Cloning Definition and Step-by-Step Overview', prompt: 'Which idea is this? — Gene cloning is the process of creating multiple identical copies (clones) of a specific.', answer: 'Gene Cloning Definition and Step-by-Step Overview', options: ['Gene Cloning Definition and Step-by-Step Overview', 'Genomic Library Construction and Representation', 'cDNA Library Construction from mRNA', 'Differences Between Genomic and cDNA Libraries'] },
            { id: 's2', label: 'Genomic Library Construction and Representation', prompt: 'Which idea is this? — A genomic library is a collection of recombinant DNA clones, each containing a different.', answer: 'Genomic Library Construction and Representation', options: ['Genomic Library Construction and Representation', 'Gene Cloning Definition and Step-by-Step Overview', 'cDNA Library Construction from mRNA', 'Differences Between Genomic and cDNA Libraries'] },
            { id: 's3', label: 'cDNA Library Construction from mRNA', prompt: 'Which idea is this? — A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into.', answer: 'cDNA Library Construction from mRNA', options: ['cDNA Library Construction from mRNA', 'Gene Cloning Definition and Step-by-Step Overview', 'Genomic Library Construction and Representation', 'Differences Between Genomic and cDNA Libraries'] },
            { id: 's4', label: 'Differences Between Genomic and cDNA Libraries', prompt: 'Which idea is this? — A genomic library is a collection of cloned DNA fragments representing the entire genome.', answer: 'Differences Between Genomic and cDNA Libraries', options: ['Differences Between Genomic and cDNA Libraries', 'Gene Cloning Definition and Step-by-Step Overview', 'Genomic Library Construction and Representation', 'cDNA Library Construction from mRNA'] },
            { id: 's5', label: 'Insertion of Foreign DNA into a Suitable Vector', prompt: 'Which idea is this? — Insertion of foreign DNA into a suitable vector is the in vitro enzymatic process where.', answer: 'Insertion of Foreign DNA into a Suitable Vector', options: ['Insertion of Foreign DNA into a Suitable Vector', 'Gene Cloning Definition and Step-by-Step Overview', 'Genomic Library Construction and Representation', 'cDNA Library Construction from mRNA'] },
            { id: 's6', label: 'Introduction of Recombinant DNA into a Host Cell', prompt: 'Which idea is this? — The introduction of recombinant DNA (rDNA) into a host cell is the process by which.', answer: 'Introduction of Recombinant DNA into a Host Cell', options: ['Introduction of Recombinant DNA into a Host Cell', 'Gene Cloning Definition and Step-by-Step Overview', 'Genomic Library Construction and Representation', 'cDNA Library Construction from mRNA'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student team\'s science-exhibition project aims to get E. coli to produce a human hormone whose gene has four introns. They plan to cut the whole gene straight out of human genomic DNA and ligate it into a bacterial plasmid.',
            decisions: [{ prompt: 'Will bacteria translate it into functional protein?', options: [
                { text: 'No — clone cDNA made from the tissue\'s mRNA instead: E. coli has no spliceosome, so introns retained from genomic DNA wreck the message; cDNA is already spliced and directly translatable.', outcome: 'A \'complete\' gene isn\'t an expressible one in bacteria — the intron-free cDNA is what the host can actually turn into protein.' },
                { text: 'Yes — the genomic copy is the complete gene, and a complete gene must give the complete protein.', outcome: 'Eukaryotic introns need spliceosome removal, which bacteria can\'t do; the transcript would carry non-coding inserts and fold into junk.', reveals: 'genomic-gene-is-expressible' },
                { text: 'Skip the vector — just PCR the gene; PCR and gene cloning both amplify DNA so they\'re interchangeable.', outcome: 'PCR is a cell-free reaction giving a tube of amplicons; cloning needs a vector, a host and transformation to yield a propagatable recombinant organism.', reveals: 'pcr-is-cloning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now narrate the workflow that produces every recombinant drug on the market. Gene cloning steps are a guaranteed long-answer — and literally the job description of a biotech process scientist.',
            decisions: [{ prompt: 'What comes next? Gene Cloning · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Gene Cloning · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_001', difficulty: 'standard',
          question: 'Gene cloning is the process of creating multiple identical copies (clones) of.',
          hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and.',
          misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and.',
          parts: [
                { id: 'a', prompt: 'Compare **genomic library** and **cDNA library** construction with respect to: (a) starting material, (b) representation of introns, (c) tissue specificity.', answer: '| Feature | Genomic Library | cDNA Library |',
                  options: ['| Feature | Genomic Library | cDNA Library |', 'Which step is unique to gene cloning and not PCR?'],
                  hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
                  misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and equate them.' }
          ],
            remediations: { 'gene-cloning-pcr-because-both': { steps: ['Ligation → joins insert to vector"). Do not look at notes. 3. **Create a 2-column table**: "Gene Cloning" vs.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and.',
          parts: [
                { id: 'a', prompt: 'A research team wants to clone a **eukaryotic gene with 5 introns** into *E. coli* for protein production.', answer: '**Option B (cDNA) will yield functional protein',
                  options: ['**Option B (cDNA) will yield functional protein', 'genomic DNA has the complete gene', 'complete gene', 'expressible gene'],
                  hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
                  misconception: '**"Gene cloning = PCR because both amplify DNA."** Students memorize "cloning makes copies" and "PCR makes copies" and equate them.' }
          ],
            remediations: { 'gene-cloning-pcr-because-both': { steps: ['Ligation → joins insert to vector"). Do not look at notes. 3. **Create a 2-column table**: "Gene Cloning" vs.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_002', difficulty: 'standard',
          question: 'A genomic library is a collection of recombinant DNA clones, each containing.',
          hint: 'Revisit c11_biotech_cbse_12_007 (Restriction Enzymes: Types and Cleavage Patterns) for.',
          misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A genomic library is a collection of recombinant DNA clones, each containing a different',
                  options: ['A genomic library is a collection of recombinant DNA clones, each containing a different', 'Gene cloning is the process of creating multiple identical copies (clones) of a specific', 'A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into', 'A genomic library is a collection of cloned DNA fragments representing the entire genome'],
                  hint: 'Revisit c11_biotech_cbse_12_007 (Restriction Enzymes: Types and Cleavage Patterns) for partial.',
                  misconception: 'Students often believe a genomic library contains "only genes" or "only exons" because they equate "genome" with "gene set." They write.' }
          ],
            remediations: { 'a-genomic-library-contains-only': { steps: ['If the student cannot distinguish genomic vs.', 'cDNA library content: (1) Have them draw a eukaryotic gene structure (promoter-exon-intron-exon-terminator) on paper.', '(2) Ask: "If I isolate DNA from the nucleus, what sequences are physically present?" → Answer: Everything in the.', '(3) Ask: "If I isolate mRNA from cytoplasm and make cDNA, what sequences remain?" → Answer: Only exons (spliced).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_003', difficulty: 'standard',
          question: 'A cDNA library is a collection of cloned complementary DNA (cDNA) fragments.',
          hint: 'Revisit c11_biotech_cbse_07_004 (Post-Transcriptional Modifications) and.',
          misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and.',
          parts: [
                { id: 'a', prompt: 'Why is RNase H treatment necessary after first-strand cDNA synthesis, and why can\'t we simply heat-denature the RNA-DNA hybrid like in PCR?', answer: 'RNase H specifically degrades the RNA strand in an RNA-DNA hybrid, leaving the',
                  options: ['RNase H specifically degrades the RNA strand in an RNA-DNA hybrid, leaving the', 'heat denaturation works fine', 'cDNA is a copy of the gene', 'cDNA library contains introns'],
                  hint: 'Revisit c11_biotech_cbse_07_004 (Post-Transcriptional Modifications) and c11_biotech_cbse_07_005.',
                  misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and regulatory regions.' },
                { id: 'b', prompt: 'A researcher constructs a cDNA library from human liver mRNA using oligo-dT priming.', answer: 'Insulin is expressed only in pancreatic beta cells, not in liver',
                  options: ['Insulin is expressed only in pancreatic beta cells, not in liver', 'the insulin gene is missing from the genome', 'oligo-dT didn\'t bind', 'cDNA is a copy of the gene'],
                  hint: 'Revisit c11_biotech_cbse_07_004 (Post-Transcriptional Modifications) and c11_biotech_cbse_07_005.',
                  misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and regulatory regions.' },
                { id: 'c', prompt: 'Compare the representation of a typical eukaryotic gene (with 3 exons and 2 introns) in a genomic library versus a cDNA library from the same tissue where the.', answer: 'In the genomic library, the insert will contain exons AND introns (plus flanking',
                  options: ['In the genomic library, the insert will contain exons AND introns (plus flanking', 'both have introns', 'cDNA has promoter', 'cDNA is a copy of the gene'],
                  hint: 'Revisit c11_biotech_cbse_07_004 (Post-Transcriptional Modifications) and c11_biotech_cbse_07_005.',
                  misconception: 'Students often think that cDNA libraries contain the "gene" exactly as it exists in the genome — including introns and regulatory regions.' }
          ],
            remediations: { 'cdna-libraries-contain-the-gene': { steps: ['Draw a pre-mRNA with exons/introns.', 'Show splicing removing introns.', 'Show mature mRNA with 5\' cap and poly-A tail.', 'Show reverse transcriptase binding oligo-dT to poly-A tail and copying only the mature sequence.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_004', difficulty: 'standard',
          question: 'A genomic library is a collection of cloned DNA fragments representing the.',
          hint: 'If stuck, revisit **c11_biotech_cbse_07_005** (RNA Splicing) and.',
          misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk.".',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since cDNA is made from mRNA, a cDNA library contains the promoter and enhancer sequences needed for gene expression." Explain why this.', answer: 'Promoters and enhancers are *not transcribed* into mRNA',
                  options: ['Promoters and enhancers are *not transcribed* into mRNA', 'regulatory sequences', 'coding sequences', 'smaller versions'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_07_005** (RNA Splicing) and **c12_biotech_cbse_03_003** (cDNA.',
                  misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk." This is wrong in two.' },
                { id: 'b', prompt: 'You want to clone the human *beta-globin* gene (which has 3 exons and 2 introns) for expression in *E. coli*.', answer: 'Step 1: Identify the goal',
                  options: ['Step 1: Identify the goal', 'smaller versions'],
                  hint: 'If stuck, revisit **c11_biotech_cbse_07_005** (RNA Splicing) and **c12_biotech_cbse_03_003** (cDNA.',
                  misconception: 'Students often believe cDNA libraries are "smaller versions" of genomic libraries — just the genes without the "junk." This is wrong in two.' }
          ],
            remediations: { 'cdna-libraries-are-smaller-versions': { steps: ['If the student confuses library content or choice: (1) Revisit **c12_biotech_cbse_03_002** (Genomic Library.', '(2) Revisit **c12_biotech_cbse_03_003** (cDNA Library Construction) — trace the mRNA → cDNA steps: *which sequences are.', '(3) Re-do **DIAGNOSTIC_QUESTION_3** with a new gene (e.g., human *factor VIII* — large, many introns) and *write* the.', '(4) Create a 2-column "What I lose vs.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_005', difficulty: 'standard',
          question: 'Insertion of foreign DNA into a suitable vector is the in vitro enzymatic.',
          hint: 'If stuck on ligation chemistry, revisit c11_biotech_cbse_03_006 (DNA Structure) and.',
          misconception: 'Students often believe that DNA ligase "sticks" any two DNA fragments together like glue, regardless of end structure.',
          parts: [
                { id: 'a', prompt: 'What are the two essential enzymatic activities required to insert a foreign DNA fragment into a plasmid vector, and what specific chemical bond does each.', answer: 'The two essential enzymes are: (1) Restriction endonuclease (Type II)',
                  options: ['The two essential enzymes are: (1) Restriction endonuclease (Type II)', 'polymerase joins DNA', 'sticks'],
                  hint: 'If stuck on ligation chemistry, revisit c11_biotech_cbse_03_006 (DNA Structure) and.',
                  misconception: 'Students often believe that DNA ligase "sticks" any two DNA fragments together like glue, regardless of end structure.' },
                { id: 'b', prompt: 'Why must the vector and insert be cut with the same restriction enzyme (or enzymes producing compatible cohesive ends) for efficient sticky-end ligation?', answer: 'Sticky-end ligation relies on base-pairing between complementary single-stranded',
                  options: ['Sticky-end ligation relies on base-pairing between complementary single-stranded', 'any cut ends can be joined by ligase', 'sticks'],
                  hint: 'If stuck on ligation chemistry, revisit c11_biotech_cbse_03_006 (DNA Structure) and.',
                  misconception: 'Students often believe that DNA ligase "sticks" any two DNA fragments together like glue, regardless of end structure.' },
                { id: 'c', prompt: 'A researcher digests a 4.0 kb plasmid vector with EcoRI (single site) and a 1.5 kb insert with EcoRI (flanking sites).', answer: 'Step 1: Convert vector mass to moles',
                  options: ['Step 1: Convert vector mass to moles', 'sticks'],
                  hint: 'If stuck on ligation chemistry, revisit c11_biotech_cbse_03_006 (DNA Structure) and.',
                  misconception: 'Students often believe that DNA ligase "sticks" any two DNA fragments together like glue, regardless of end structure.' },
                { id: 'd', prompt: 'Compare the ligation of EcoRI-generated sticky ends versus EcoRV-generated blunt ends in terms of: (a) requirement for complementary base pairing, (b) ligase.', answer: 'requirement for complementary base pairing, (',
                  options: ['requirement for complementary base pairing, (', 'blunt ends are better for directional cloning', 'sticks'],
                  hint: 'If stuck on ligation chemistry, revisit c11_biotech_cbse_03_006 (DNA Structure) and.',
                  misconception: 'Students often believe that DNA ligase "sticks" any two DNA fragments together like glue, regardless of end structure.' }
          ],
            remediations: { 'dna-ligase-sticks-any-two': { steps: ['Revisit c11_biotech_cbse_12_007 (Restriction Enzymes) to review sticky vs blunt end structures and the phosphodiester.', 'Revisit c11_biotech_cbse_03_006 (DNA Structure) to visualize the 3\'-OH and 5\'-phosphate groups on the sugar-phosphate.', 'Perform a virtual ligation simulation (e.g., NEBcloner or SnapGene tutorial) where you deliberately omit phosphatase.', 'Re-attempt Diagnostic Question 3 (molar ratio calculation) and Diagnostic Question 5 (phosphatase evaluation) after.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_006', difficulty: 'standard',
          question: 'The introduction of recombinant DNA (rDNA) into a host cell is the process.',
          hint: 'If stuck, revisit Class 11 Biology node c11_bio_cbse_08_003 (Cell Membrane: Fluid Mosaic.',
          misconception: '**Misconception:** "Transformation, transfection, and transduction are synonyms — they all mean putting DNA into.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the **biolistic (gene gun)** method with **microinjection** in terms of: (a) target cell types, (b) throughput, (c) technical skill.', answer: '| Feature | Biolistic (Gene Gun) | Microinjection |',
                  options: ['| Feature | Biolistic (Gene Gun) | Microinjection |', 'gene gun is for animal cells only'],
                  hint: 'If stuck, revisit Class 11 Biology node c11_bio_cbse_08_003 (Cell Membrane: Fluid Mosaic Model) and.',
                  misconception: '**Misconception:** "Transformation, transfection, and transduction are synonyms — they all mean putting DNA into cells." **Why it\'s.' }
          ],
            remediations: { 'misconception-transformation': { steps: ['If the student cannot distinguish the three terms or match methods to cell types: 1.', '**Revisit node c12_biotech_cbse_03_005** (Insertion of Foreign DNA into a Suitable Vector) to recall that rDNA must.', '**Create a 3-column table** (Natural Mechanism | Artificial Method | Host Cell Type) and fill it using NCERT Fig.', '**Watch a 2-minute animation** of electroporation (pore formation) and biolistic (particle penetration) — visualizing.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
