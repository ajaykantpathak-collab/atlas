import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch03_p2: SimDef = {
    id: 'v3_c12_biotech_ch03_p2',
    title: 'Gene Cloning · Part 2/2',
    subtitle: 'One cell becomes a factory — the 7-step workflow behind every insulin vial.',
    classLevel: 12, subject: 'biotechnology', topic: 'Gene Cloning · Part 2/2',
    chapters: ['c12_biotech_ch03'],
    nodeIds: ['c12_biotech_cbse_03_007', 'c12_biotech_cbse_03_008', 'c12_biotech_cbse_03_009', 'c12_biotech_cbse_03_010', 'c12_biotech_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bioprocess scientist', intro: 'Every recombinant medicine begins as one bacterium carrying one borrowed gene — here\'s the pipeline.', goal: 'Outline the gene cloning workflow and describe the construction and use of a genomic library.' },
    discovery: {
        question: 'Bharat Biotech must mass-produce human insulin — but pancreas extraction can\'t scale. What does \'cloning the insulin gene\' actually accomplish?',
        options: ['Inserting the gene into a vector inside E. coli, which replicates it every division — turning bacteria into insulin factories', 'Growing human pancreas cells in a flask to secrete insulin', 'Copying insulin molecules directly, like a photocopier', 'Fusing two bacteria so they share the insulin gene between them'],
        answer: 'Inserting the gene into a vector inside E. coli, which replicates it every division — turning bacteria into insulin factories',
        hook: 'Cloning a gene isn\'t copying a protein — it\'s hijacking cell division. Each bacterial doubling doubles your DNA cargo, which is why a single recombinant cell becomes an industrial supply.',
    },
    teaching: [
        { title: 'Selection of Recombinant Clones Using Markers', text: 'Selection of recombinant clones using markers is the process of identifying and isolating host cells that have successfully taken up a recombinant vector (with insert) from a mixed population.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_03_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Execute the 7-step gene cloning workflow for insulin — isolate, cut, ligate, transform, select, amplify, harvest — then build a genomic library and explain how you\'d fish one gene out of billions of fragments.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_007', title: 'Selection of Recombinant Clones Using Markers',
          caseStudy: { intro: 'Imagine you have just transformed E. coli with a ligation mixture containing recombinant plasmids (with your gene of interest) and non-recombinant plasmids.',
            decisions: [{ prompt: 'A student writes: "In blue-white screening, the recombinant colonies are blue because the insert activates the lacZ gene." Is this.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. Recombinant colonies are **white**, not blue.' },
                { text: '**antibiotic resistance alone can identify recombinant clones**', outcome: 'Not quite — Students often believe that **antibiotic resistance alone can identify recombinant clones**.', reveals: 'antibiotic-resistance-alone-can-identify' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_008', title: 'Colony Hybridization and Nucleic Acid Screening',
          caseStudy: { intro: 'Imagine you have constructed a genomic library of 100,000 bacterial colonies, each carrying a different fragment of human DNA.',
            decisions: [{ prompt: 'What is the fundamental principle that allows a labeled nucleic acid probe to identify a specific DNA sequence in a colony hybridization.', options: [
                { text: 'The fundamental principle is complementary base pairing (Watson-Crick hybridization): the', outcome: 'The fundamental principle is complementary base pairing (Watson-Crick hybridization): the.' },
                { text: 'the probe binds to the protein product', outcome: 'Not quite — Students think colony hybridization and blue-white screening are interchangeable — both "screen for.', reveals: 'colony-hybridization-and-blue-white' },
                { text: 'the probe integrates into the genome', outcome: 'Not quite — Students think colony hybridization and blue-white screening are interchangeable — both "screen for.', reveals: 'colony-hybridization-and-blue-white' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_009', title: 'Probes: Types, Labeling, and Design Considerations',
          caseStudy: { intro: 'Imagine you have a library of 100,000 bacterial colonies, each carrying a different DNA insert, and you need to find the single colony that contains the human.',
            decisions: [{ prompt: 'What is the fundamental principle that allows a nucleic acid probe to detect a specific target sequence in a mixture?', options: [
                { text: 'The fundamental principle is **complementary base pairing (hybridization)**: a', outcome: 'The fundamental principle is **complementary base pairing (hybridization)**: a single-stranded.' },
                { text: 'probes bind via antibody-antigen interaction', outcome: 'Not quite — **Misconception**: "Longer probes are always better because they have higher sensitivity." **Why.', reveals: 'misconception-longer-probes-are-always' },
                { text: 'probes are proteins that recognize DNA', outcome: 'Not quite — **Misconception**: "Longer probes are always better because they have higher sensitivity." **Why.', reveals: 'misconception-longer-probes-are-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_010', title: 'Amplification of Cloned Genes in Host Cells',
          caseStudy: { intro: 'Imagine you have just successfully inserted the human insulin gene into a plasmid and transformed *E. coli* cells (previous nodes).',
            decisions: [{ prompt: 'What is the primary biological mechanism that amplifies a cloned gene inside a bacterial host cell after transformation?', options: [
                { text: 'The primary mechanism is the host cell\'s own DNA replication machinery replicating the', outcome: 'The primary mechanism is the host cell\'s own DNA replication machinery replicating the recombinant.' },
                { text: 'PCR inside the cell', outcome: 'Not quite — Students often believe that once a recombinant plasmid enters a bacterium, the gene of interest.', reveals: 'once-a-recombinant-plasmid-enters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_011', title: 'Applications of Gene Cloning in Research and Industry',
          caseStudy: { intro: 'Imagine a diabetic patient in India who needs insulin daily — historically extracted from pig pancreases with limited supply and allergic reactions.',
            decisions: [{ prompt: 'Name FOUR distinct application domains of gene cloning and give ONE specific product/example for each domain that is commercially used.', options: [
                { text: 'Correct answer: (1) Medical', outcome: 'Correct answer: (1) Medical — recombinant human insulin (Humulin) produced in E.' },
                { text: 'as an application domain instead of a technique used across domains, or citing', outcome: 'Not quite — Students believe "gene cloning applications" means only listing products like insulin and.', reveals: 'gene-cloning-applications-means-only' },
                { text: 'gene cloning applications', outcome: 'Not quite — Students believe "gene cloning applications" means only listing products like insulin and.', reveals: 'gene-cloning-applications-means-only' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'Gene Cloning · Part 2/2', spots: [
            { id: 's1', label: 'Selection of Recombinant Clones Using Markers', prompt: 'Which idea is this? — Selection of recombinant clones using markers is the process of identifying and isolating.', answer: 'Selection of Recombinant Clones Using Markers', options: ['Selection of Recombinant Clones Using Markers', 'Colony Hybridization and Nucleic Acid Screening', 'Probes Types Labeling and Design Considerations', 'Amplification of Cloned Genes in Host Cells'] },
            { id: 's2', label: 'Colony Hybridization and Nucleic Acid Screening', prompt: 'Which idea is this? — Colony hybridization is a nucleic acid screening technique where bacterial colonies (or.', answer: 'Colony Hybridization and Nucleic Acid Screening', options: ['Colony Hybridization and Nucleic Acid Screening', 'Selection of Recombinant Clones Using Markers', 'Probes Types Labeling and Design Considerations', 'Amplification of Cloned Genes in Host Cells'] },
            { id: 's3', label: 'Probes Types Labeling and Design Considerations', prompt: 'Which idea is this? — A probe is a single-stranded nucleic acid (DNA or RNA) or oligonucleotide sequence that.', answer: 'Probes Types Labeling and Design Considerations', options: ['Probes Types Labeling and Design Considerations', 'Selection of Recombinant Clones Using Markers', 'Colony Hybridization and Nucleic Acid Screening', 'Amplification of Cloned Genes in Host Cells'] },
            { id: 's4', label: 'Amplification of Cloned Genes in Host Cells', prompt: 'Which idea is this? — Amplification of cloned genes in host cells refers to the process where a recombinant.', answer: 'Amplification of Cloned Genes in Host Cells', options: ['Amplification of Cloned Genes in Host Cells', 'Selection of Recombinant Clones Using Markers', 'Colony Hybridization and Nucleic Acid Screening', 'Probes Types Labeling and Design Considerations'] },
            { id: 's5', label: 'Applications of Gene Cloning in Research and Industry', prompt: 'Which idea is this? — Applications of gene cloning refer to the practical utilization of recombinant DNA.', answer: 'Applications of Gene Cloning in Research and Industry', options: ['Applications of Gene Cloning in Research and Industry', 'Selection of Recombinant Clones Using Markers', 'Colony Hybridization and Nucleic Acid Screening', 'Probes Types Labeling and Design Considerations'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student team\'s science-exhibition project aims to get E. coli to produce a human hormone whose gene has four introns. They plan to cut the whole gene straight out of human genomic DNA and ligate it into a bacterial plasmid.',
            decisions: [{ prompt: 'Will bacteria translate it into functional protein?', options: [
                { text: 'No — clone cDNA made from the tissue\'s mRNA instead: E. coli has no spliceosome, so introns retained from genomic DNA wreck the message; cDNA is already spliced and directly translatable.', outcome: 'A \'complete\' gene isn\'t an expressible one in bacteria — the intron-free cDNA is what the host can actually turn into protein.' },
                { text: 'Yes — the genomic copy is the complete gene, and a complete gene must give the complete protein.', outcome: 'Eukaryotic introns need spliceosome removal, which bacteria can\'t do; the transcript would carry non-coding inserts and fold into junk.', reveals: 'genomic-gene-is-expressible' },
                { text: 'Skip the vector — just PCR the gene; PCR and gene cloning both amplify DNA so they\'re interchangeable.', outcome: 'PCR is a cell-free reaction giving a tube of amplicons; cloning needs a vector, a host and transformation to yield a propagatable recombinant organism.', reveals: 'pcr-is-cloning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'You can now narrate the workflow that produces every recombinant drug on the market. Gene cloning steps are a guaranteed long-answer — and literally the job description of a biotech process scientist.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_007', difficulty: 'standard',
          question: 'Selection of recombinant clones using markers is the process of identifying and.',
          hint: 'If stuck, revisit c12_biotech_cbse_03_005 (vector components) and c11_biotech_cbse_07_010.',
          misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.',
          parts: [
                { id: 'a', prompt: 'A student writes: "In blue-white screening, the recombinant colonies are blue because the insert activates the lacZ gene." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '**antibiotic resistance alone can identify recombinant clones**'],
                  hint: 'If stuck, revisit c12_biotech_cbse_03_005 (vector components) and c11_biotech_cbse_07_010 (lac.',
                  misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.' },
                { id: 'b', prompt: 'A researcher wants to clone a 2.5 kb human gene into a plasmid vector that has only a single ampicillin resistance marker (ampR) and no lacZ.', answer: 'The conclusion is flawed',
                  options: ['The conclusion is flawed', 'selection for transformation', 'selection for recombination', '**antibiotic resistance alone can identify recombinant clones**'],
                  hint: 'If stuck, revisit c12_biotech_cbse_03_005 (vector components) and c11_biotech_cbse_07_010 (lac.',
                  misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.' }
          ],
            remediations: { 'antibiotic-resistance-alone-can-identify': { steps: ['If a student exhibits the above misconceptions: 1.', '**Re-teach the distinction between selection and screening** using a 2-column table: Selection = survival/growth (e.g.', 'Emphasise: selection markers must remain functional in recombinants; screening markers are intentionally inactivated.', '**Walk through the blue-white mechanism stepwise**: (a) Vector has lacZ with MCS inside.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.',
          parts: [
                { id: 'a', prompt: 'Evaluate this experimental design: "To select recombinants, I will use a vector with ampR and lacZ. I will clone my insert into the ampR gene.', answer: 'The design has a **critical flaw**: if the insert is cloned into the ampR gene,',
                  options: ['The design has a **critical flaw**: if the insert is cloned into the ampR gene,', '**antibiotic resistance alone can identify recombinant clones**'],
                  hint: 'If stuck, revisit c12_biotech_cbse_03_005 (vector components) and c11_biotech_cbse_07_010 (lac.',
                  misconception: 'Students often believe that **antibiotic resistance alone can identify recombinant clones**.' }
          ],
            remediations: { 'antibiotic-resistance-alone-can-identify': { steps: ['If a student exhibits the above misconceptions: 1.', '**Re-teach the distinction between selection and screening** using a 2-column table: Selection = survival/growth (e.g.', 'Emphasise: selection markers must remain functional in recombinants; screening markers are intentionally inactivated.', '**Walk through the blue-white mechanism stepwise**: (a) Vector has lacZ with MCS inside.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_008', difficulty: 'standard',
          question: 'Colony hybridization is a nucleic acid screening technique where bacterial.',
          hint: 'Review c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) — focus on base pairing.',
          misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants.".',
          parts: [
                { id: 'a', prompt: 'In a colony hybridization experiment using a nitrocellulose membrane, a student forgets to bake the membrane at 80°C after transferring colonies.', answer: 'Baking immobilizes DNA covalently to the membrane via cross-linking',
                  options: ['Baking immobilizes DNA covalently to the membrane via cross-linking', 'baking denatures DNA', 'baking activates the probe', 'screen for recombinants'],
                  hint: 'Review c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) — focus on base pairing rules.',
                  misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In reality, blue-white.' },
                { id: 'b', prompt: 'Compare Southern, Northern, and Western blotting in a single table with four columns: Target Molecule, Separation Method, Probe/Detector, and Key Chemical.', answer: '| Blot | Target | Separation | Probe/Detector | Immobilization |',
                  options: ['| Blot | Target | Separation | Probe/Detector | Immobilization |', 'screen for recombinants'],
                  hint: 'Review c11_bio_cbse_09_004 (Nucleic Acids: DNA and RNA Structure) — focus on base pairing rules.',
                  misconception: 'Students think colony hybridization and blue-white screening are interchangeable — both "screen for recombinants." In reality, blue-white.' }
          ],
            remediations: { 'colony-hybridization-and-blue-white': { steps: ['Revisit node c12_biotech_cbse_03_007 (Selection of Recombinant Clones Using Markers) and explicitly list what each.', 'Re-read the NCERT Fig 3.13 and 3.14 captions to see that replica plating on ampicillin distinguishes recombinant from.', 'Practice a diagnostic question: "You have 500 white colonies. How do you find the one with the human insulin gene?".', 'If still confused, draw a flowchart: Transformation → Plate on Amp+X-gal → White colonies → Colony lift → Hybridize.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_009', difficulty: 'standard',
          question: 'A probe is a single-stranded nucleic acid (DNA or RNA) or oligonucleotide.',
          hint: 'If stuck on Tm calculations or labeling chemistry, revisit `c11_bio_cbse_09_004` (nucleic.',
          misconception: '**Misconception**: "Longer probes are always better because they have higher sensitivity." **Why it\'s wrong**: Students.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental principle that allows a nucleic acid probe to detect a specific target sequence in a mixture?', answer: 'The fundamental principle is **complementary base pairing (hybridization)**: a',
                  options: ['The fundamental principle is **complementary base pairing (hybridization)**: a', 'probes bind via antibody-antigen interaction', 'probes are proteins that recognize DNA', 'Longer probes are always better'],
                  hint: 'If stuck on Tm calculations or labeling chemistry, revisit `c11_bio_cbse_09_004` (nucleic acid.',
                  misconception: '**Misconception**: "Longer probes are always better because they have higher sensitivity." **Why it\'s wrong**: Students confuse.' },
                { id: 'b', prompt: 'A student says: "Radioactive probes (³²P) are always better than non-radioactive probes (digoxigenin) because they are more sensitive." Is this statement.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'radioactive = superior', 'Longer probes are always better', 'Use the full-length genomic clone as probe for maximum signal'],
                  hint: 'If stuck on Tm calculations or labeling chemistry, revisit `c11_bio_cbse_09_004` (nucleic acid.',
                  misconception: '**Misconception**: "Longer probes are always better because they have higher sensitivity." **Why it\'s wrong**: Students confuse.' },
                { id: 'c', prompt: 'You need to detect a 500 bp mRNA transcript in a Northern blot.', answer: 'Choose **probe B (oligonucleotide)** for maximum specificity',
                  options: ['Choose **probe B (oligonucleotide)** for maximum specificity', 'Longer probes are always better', 'Use the full-length genomic clone as probe for maximum signal'],
                  hint: 'If stuck on Tm calculations or labeling chemistry, revisit `c11_bio_cbse_09_004` (nucleic acid.',
                  misconception: '**Misconception**: "Longer probes are always better because they have higher sensitivity." **Why it\'s wrong**: Students confuse.' },
                { id: 'd', prompt: 'Compare and contrast **random priming** and **nick translation** for labeling a double-stranded DNA probe.', answer: '| Parameter | Random Priming | Nick Translation |',
                  options: ['| Parameter | Random Priming | Nick Translation |', 'Longer probes are always better', 'Use the full-length genomic clone as probe for maximum signal'],
                  hint: 'If stuck on Tm calculations or labeling chemistry, revisit `c11_bio_cbse_09_004` (nucleic acid.',
                  misconception: '**Misconception**: "Longer probes are always better because they have higher sensitivity." **Why it\'s wrong**: Students confuse.' }
          ],
            remediations: { 'misconception-longer-probes-are-always': { steps: ['**Revisit base-pairing thermodynamics**: Review Class 11 node `c11_bio_cbse_09_004` (Nucleic Acids: DNA and RNA.', '**Relearn labeling methods**: Use `c11_biotech_cbse_12_009` (Southern, Northern, Western Blotting) to compare.', 'non-radioactive detection side-by-side.', '**Practice Tm calculations**: Solve 3 problems using both Wallace rule (oligos <20 nt) and the long-probe formula (Tm.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_010', difficulty: 'standard',
          question: 'Amplification of cloned genes in host cells refers to the process where.',
          hint: 'Revisit c12_biotech_cbse_03_006 (transformation) and c11_bio_cbse_10_001 (cell cycle).',
          misconception: 'Students often believe that once a recombinant plasmid enters a bacterium, the gene of interest automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Amplification of cloned genes in host cells refers to the process where a recombinant',
                  options: ['Amplification of cloned genes in host cells refers to the process where a recombinant', 'Gene cloning is the process of creating multiple identical copies (clones) of a specific', 'A genomic library is a collection of recombinant DNA clones, each containing a different', 'A cDNA library is a collection of cloned complementary DNA (cDNA) fragments inserted into'],
                  hint: 'Revisit c12_biotech_cbse_03_006 (transformation) and c11_bio_cbse_10_001 (cell cycle) to reinforce.',
                  misconception: 'Students often believe that once a recombinant plasmid enters a bacterium, the gene of interest automatically integrates into the host.' }
          ],
            remediations: { 'once-a-recombinant-plasmid-enters': { steps: ['If a student exhibits this misconception: 1.', 'Show a diagram of a plasmid with ori, antibiotic resistance gene, and MCS — ask "Where is the chromosomal ori?".', 'Have them compare replication of chromosomal DNA (single oriC, bidirectional, once per cell cycle) vs plasmid DNA.', 'Assign a re-diagnostic: "Explain why a plasmid with a mutated ori cannot be amplified in the host even if the.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_03_011', difficulty: 'standard',
          question: 'Applications of gene cloning refer to the practical utilization of recombinant.',
          hint: 'If stuck on host-vector selection, revisit c12_biotech_cbse_03_005 (vectors) and.',
          misconception: 'Students believe "gene cloning applications" means only listing products like insulin and Bt cotton.',
          parts: [
                { id: 'a', prompt: 'Name FOUR distinct application domains of gene cloning and give ONE specific product/example for each domain that is commercially used in India.', answer: 'Correct answer: (1) Medical',
                  options: ['Correct answer: (1) Medical', 'as an application domain instead of a technique used across domains, or citing', 'gene cloning applications', 'PCR is used for cloning'],
                  hint: 'If stuck on host-vector selection, revisit c12_biotech_cbse_03_005 (vectors) and.',
                  misconception: 'Students believe "gene cloning applications" means only listing products like insulin and Bt cotton.' },
                { id: 'b', prompt: 'A biotech startup wants to produce a human glycoprotein therapeutic (e.g., erythropoietin) that requires N-linked glycosylation for activity.', answer: 'Correct answer: Choose CHO cells (Chinese Hamster Ovary)',
                  options: ['Correct answer: Choose CHO cells (Chinese Hamster Ovary)', 'gene cloning applications', 'PCR is used for cloning', 'PCR amplifies the gene for cloning'],
                  hint: 'If stuck on host-vector selection, revisit c12_biotech_cbse_03_005 (vectors) and.',
                  misconception: 'Students believe "gene cloning applications" means only listing products like insulin and Bt cotton.' }
          ],
            remediations: { 'gene-cloning-applications-means-only': { steps: ['Revisit c12_biotech_cbse_03_005 (vector types) and c12_biotech_cbse_03_006 (host systems) — make a table matching.', 'Revisit c12_biotech_cbse_03_007 (selection) — practice choosing markers: ampR for bacteria, nptII/bar for plants, GFP.', 'Take one application (e.g., hepatitis B vaccine) and trace backwards: what gene? (HBsAg), what host?', 'Re-diagnostic: Ask student to design cloning strategy for a NEW product (e.g., recombinant human growth hormone).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
