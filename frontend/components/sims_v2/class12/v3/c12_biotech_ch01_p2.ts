import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch01_p2: SimDef = {
    id: 'v3_c12_biotech_ch01_p2',
    title: 'Host-Vector System · Part 2/2',
    subtitle: 'A gene without a vehicle is just debris — meet the host-vector system.',
    classLevel: 12, subject: 'biotechnology', topic: 'Host-Vector System · Part 2/2',
    chapters: ['c12_biotech_ch01'],
    nodeIds: ['c12_biotech_cbse_01_007', 'c12_biotech_cbse_01_008', 'c12_biotech_cbse_01_009', 'c12_biotech_cbse_01_010', 'c12_biotech_cbse_01_011', 'c12_biotech_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cloning lab engineer', intro: 'Turning a bacterium into a protein factory starts with matching the right host to the right vehicle.', goal: 'Explain host-vector compatibility and select appropriate E. coli strains for cloning.' },
    discovery: {
        question: 'You drop a human insulin gene straight into E. coli — and it\'s gone by the next cell division. What was missing?',
        options: ['A vector — a DNA vehicle that carries the gene, replicates with the host, and is stably maintained', 'More copies of the gene — enough DNA guarantees some survives', 'A bigger host — only mammalian cells can hold human genes', 'Antibiotics — they force the bacterium to keep foreign DNA'],
        answer: 'A vector — a DNA vehicle that carries the gene, replicates with the host, and is stably maintained',
        hook: 'Foreign DNA alone is debris; foreign DNA on a replicating vector is a clone. The host supplies the machinery, the vector supplies the passport — gene cloning needs both, matched.',
    },
    teaching: [
        { title: 'pBR322 Plasmid Vector: Restriction Map and Selectable Markers', text: 'pBR322 is a 4,361 bp circular plasmid cloning vector derived from pMB1 (a ColE1-like plasmid), containing an origin of replication (ori), two selectable markers (ampicillin resistance gene *bla* and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_01_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Assemble a working host-vector system: choose the right E. coli lab strain (why DH5α over wild-type?), pair it with a plasmid vector, and justify how the pair maintains your foreign gene across generations.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_007', title: 'pBR322 Plasmid Vector: Restriction Map and Selectable Markers',
          caseStudy: { intro: 'Imagine you have a human insulin gene (about 500 bp) and want to clone it into bacteria to produce insulin. You choose pBR322 as your vector.',
            decisions: [{ prompt: 'What are the two selectable markers present in pBR322 and what antibiotic resistances do they confer?', options: [
                { text: 'The two selectable markers in pBR322 are the *bla* gene (encoding β-lactamase) conferring', outcome: 'The two selectable markers in pBR322 are the *bla* gene (encoding β-lactamase) conferring.' },
                { text: 'kanamycin or chloramphenicol resistance', outcome: 'Not quite — Students believe that *any* restriction site in pBR322 can be used for cloning with insertional.', reveals: 'any-restriction-site-in-pbr322' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_008', title: 'Bacteriophage Lambda as a Cloning Vector',
          caseStudy: { intro: 'Imagine you need to clone a 15 kb human gene — too large for pBR322 (max ~10 kb). You recall viruses can carry bigger DNA.',
            decisions: [{ prompt: 'What are the cohesive end (cos) sites of bacteriophage lambda, and what is their function in cloning?', options: [
                { text: 'The cos sites are 12-base single-stranded complementary overhangs (5\'-GGGCGGCGACCT-3\') at', outcome: 'The cos sites are 12-base single-stranded complementary overhangs (5\'-GGGCGGCGACCT-3\') at the 5\'.' },
                { text: 'cos sites are restriction sites for EcoRI', outcome: 'Not quite — Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the.', reveals: 'lambda-vectors-always-integrate-into' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_01_009', title: 'Cosmids: Construction and Capacity for Large Inserts',
          scaffold: { problem: 'A cosmid vector pHC79 has a backbone size of 7.5 kb. The λ phage packaging system used accepts DNA between 37 kb and 52 kb.',
            steps: [
            { text: 'Identify given values — vector backbone = 7.5 kb, packaging window = 37–52 kb.' },
            { text: 'Recall formula for total recombinant size: Total Size = Vector Backbone + Insert Size.' },
            { text: 'Calculate minimum insert: Min Insert = Lower Packaging Limit – Vector Backbone = 37 kb – 7.5 kb = 29.5 kb.' },
            { text: 'Calculate maximum insert: Max Insert = Upper Packaging Limit – Vector Backbone = 52 kb – 7.5 kb = 44.5 kb.' },
            { text: 'Evaluate 50 kb insert — Total Size = 7.5 + 50 = 57.5 kb > 52 kb → exceeds upper packaging limit → will NOT package →.', faded: true, blankAnswer: 'Minimum insert = 29.5 kb, Maximum insert = 44.5 kb. A 50.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_01_010', title: 'BACs and YACs for Genomic Library Construction',
          scaffold: { problem: 'A genomic library for rice (Oryza sativa, genome size ~430 Mb) is to be constructed using a BAC vector with average insert size 120 kb.',
            steps: [
            { text: 'Identify given values: G = 430 Mb = 430,000,000 bp; I = 120 kb = 120,000 bp; P = 0.999.' },
            { text: 'Write the Clarke-Carbon formula: N = ln(1 - P) / ln(1 - I/G).' },
            { text: 'Compute I/G = 120,000 / 430,000,000 = 0.00027907.' },
            { text: 'Compute ln(1 - I/G) = ln(1 - 0.00027907) = ln(0.99972093) ≈ -0.00027911.' },
            { text: 'Compute ln(1 - P) = ln(1 - 0.999) = ln(0.001) = -6.907755.' },
            { text: 'Divide: N = (-6.907755) / (-0.00027911) ≈ 24,749. Round up to 25,000 clones.', faded: true, blankAnswer: '25,000 independent BAC clones (rounded up to nearest.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_012', title: 'Expression Vectors: Promoters, Tags, and Design Principles',
          caseStudy: { intro: 'Imagine you need to produce human insulin in E. coli for a diabetic patient — you have the insulin gene, but simply inserting it into pBR322 (a cloning vector).',
            decisions: [{ prompt: 'A student claims: "Any plasmid with an origin of replication and antibiotic resistance gene can be used as an expression vector if.', options: [
                { text: 'Incorrect', outcome: 'Incorrect. An expression vector additionally requires a functional promoter recognized by the host.' },
                { text: 'vector maintenance', outcome: 'Not quite — Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5.', reveals: 'stronger-promoter-always-means-more' },
                { text: 'gene expression', outcome: 'Not quite — Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5.', reveals: 'stronger-promoter-always-means-more' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Host-Vector System · Part 2/2', spots: [
            { id: 's1', label: 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', prompt: 'Which idea is this? — pBR322 is a 4,361 bp circular plasmid cloning vector derived from pMB1 (a ColE1-like.', answer: 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', options: ['pBR322 Plasmid Vector Restriction Map and Selectable Markers', 'Bacteriophage Lambda as a Cloning Vector', 'Cosmids Construction and Capacity for Large Inserts', 'BACs and YACs for Genomic Library Construction'] },
            { id: 's2', label: 'Bacteriophage Lambda as a Cloning Vector', prompt: 'Which idea is this? — Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E.', answer: 'Bacteriophage Lambda as a Cloning Vector', options: ['Bacteriophage Lambda as a Cloning Vector', 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', 'Cosmids Construction and Capacity for Large Inserts', 'BACs and YACs for Genomic Library Construction'] },
            { id: 's3', label: 'Cosmids Construction and Capacity for Large Inserts', prompt: 'Which idea is this? — Cosmids are hybrid cloning vectors that combine the **cos (cohesive end) site** from.', answer: 'Cosmids Construction and Capacity for Large Inserts', options: ['Cosmids Construction and Capacity for Large Inserts', 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', 'Bacteriophage Lambda as a Cloning Vector', 'BACs and YACs for Genomic Library Construction'] },
            { id: 's4', label: 'BACs and YACs for Genomic Library Construction', prompt: 'Which idea is this? — BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes) are.', answer: 'BACs and YACs for Genomic Library Construction', options: ['BACs and YACs for Genomic Library Construction', 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', 'Bacteriophage Lambda as a Cloning Vector', 'Cosmids Construction and Capacity for Large Inserts'] },
            { id: 's5', label: 'Shuttle Vectors Replication in Two Hosts', prompt: 'Which idea is this? — A shuttle vector is a recombinant DNA plasmid engineered to replicate autonomously in two.', answer: 'Shuttle Vectors Replication in Two Hosts', options: ['Shuttle Vectors Replication in Two Hosts', 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', 'Bacteriophage Lambda as a Cloning Vector', 'Cosmids Construction and Capacity for Large Inserts'] },
            { id: 's6', label: 'Expression Vectors Promoters Tags and Design Principles', prompt: 'Which idea is this? — An expression vector is a specialized cloning vector engineered to drive high-level.', answer: 'Expression Vectors Promoters Tags and Design Principles', options: ['Expression Vectors Promoters Tags and Design Principles', 'pBR322 Plasmid Vector Restriction Map and Selectable Markers', 'Bacteriophage Lambda as a Cloning Vector', 'Cosmids Construction and Capacity for Large Inserts'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a biotech-lab summer project, a student team wants E. coli to propagate a human gene. Their mentor hands them a plasmid carrying an ampicillin-resistance gene but no origin of replication that E. coli can read, and says \'just transform it in.\'',
            decisions: [{ prompt: 'Will the plasmid be maintained in the bacteria?', options: [
                { text: 'No — a cloning vector needs an origin of replication recognised by the host plus a selectable marker, cloning sites and small size; without a compatible ori it can\'t replicate and is lost at cell division, marker or not.', outcome: 'Host-vector compatibility is the core rule: the host\'s replication machinery must recognise the vector\'s ori, and the marker only selects cells that actually took up a replicating vector.' },
                { text: 'Yes — the antibiotic marker lets you select transformed cells, and selection alone keeps the plasmid going.', outcome: 'Selection finds cells carrying the plasmid but can\'t maintain it; without a functional ori the plasmid never replicates and gets diluted out.', reveals: 'marker-alone-maintains-vector' },
                { text: 'Yes, if they add a strong promoter — that\'s what makes any plasmid a cloning vector.', outcome: 'Promoters belong to expression vectors; a cloning vector\'s essentials are ori, selectable marker, cloning sites and small size.', reveals: 'cloning-needs-promoter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'You\'ve learned the chassis-and-cargo logic every gene clone rides on. Host-vector systems frame every downstream biotech question — in boards and in actual cloning labs.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_007', difficulty: 'standard',
          question: 'pBR322 is a 4,361 bp circular plasmid cloning vector derived from pMB1 (a.',
          hint: 'Revisit c11_biotech_cbse_12_007 (Restriction Enzymes) and practice drawing sticky ends.',
          misconception: 'Students believe that *any* restriction site in pBR322 can be used for cloning with insertional inactivation screening.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'pBR322 is a 4,361 bp circular plasmid cloning vector derived from pMB1 (a ColE1-like',
                  options: ['pBR322 is a 4,361 bp circular plasmid cloning vector derived from pMB1 (a ColE1-like', 'A host-vector system is a compatible pair of a living host cell (which provides the', 'Saccharomyces cerevisiae (baker\'s yeast) is a unicellular, non-pathogenic, GRAS-status', 'The Baculovirus-Insect Cell Expression System is a eukaryotic recombinant protein'],
                  hint: 'Revisit c11_biotech_cbse_12_007 (Restriction Enzymes) and practice drawing sticky ends for all.',
                  misconception: 'Students believe that *any* restriction site in pBR322 can be used for cloning with insertional inactivation screening.' }
          ],
            remediations: { 'any-restriction-site-in-pbr322': { steps: ['Have the student draw the pBR322 map from memory: a circle labelled with *ori*, *bla*, *tetR*, and the 8–10 key.', 'Ask them to colour-code: red for sites in *bla*, blue for sites in *tetR*, black for others.', 'Give 3 inserts with different end enzymes; have them pick the correct site and predict Amp/Tet phenotype.', 'If they misassign a site (e.g., put *BamHI* in *bla*), direct them to c11_biotech_cbse_12_007 (Restriction Enzymes).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_008', difficulty: 'standard',
          question: 'Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E.',
          hint: 'Revisit c12_biotech_cbse_01_007 (pBR322 restriction map and selection) and.',
          misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E',
                  options: ['Bacteriophage lambda (λ) is a double-stranded DNA virus that infects *E', 'A host-vector system is a compatible pair of a living host cell (which provides the', 'Saccharomyces cerevisiae (baker\'s yeast) is a unicellular, non-pathogenic, GRAS-status', 'The Baculovirus-Insect Cell Expression System is a eukaryotic recombinant protein'],
                  hint: 'Revisit c12_biotech_cbse_01_007 (pBR322 restriction map and selection) and c11_biotech_cbse_12_007.',
                  misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene is expressed from the.' }
          ],
            remediations: { 'lambda-vectors-always-integrate-into': { steps: ['If a student confuses lysogeny with lytic cloning: (1) Have them draw the lambda genome map labeling cos, cI, cII.', '(2) Ask: "If cI is functional, what phenotype on a lawn?" → turbid plaques (lysogeny).', '(3) Ask: "For cloning, do we want the phage to sleep (lysogeny) or multiply (lysis)?" → multiply.', '(4) Show that insertion vectors disrupt cI → clear plaques = recombinant.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene.',
          parts: [
                { id: 'a', prompt: 'A researcher constructs a lambda insertion vector by cloning a 2 kb DNA fragment into the unique EcoRI site within the cI gene (non-essential region).', answer: 'Yes, clear plaques confirm insertion',
                  options: ['Yes, clear plaques confirm insertion', 'clear plaques mean no insertion'],
                  hint: 'Revisit c12_biotech_cbse_01_007 (pBR322 restriction map and selection) and c11_biotech_cbse_12_007.',
                  misconception: 'Students believe lambda vectors *always* integrate into the host chromosome (lysogeny) and that the cloned gene is expressed from the.' }
          ],
            remediations: { 'lambda-vectors-always-integrate-into': { steps: ['If a student confuses lysogeny with lytic cloning: (1) Have them draw the lambda genome map labeling cos, cI, cII.', '(2) Ask: "If cI is functional, what phenotype on a lawn?" → turbid plaques (lysogeny).', '(3) Ask: "For cloning, do we want the phage to sleep (lysogeny) or multiply (lysis)?" → multiply.', '(4) Show that insertion vectors disrupt cI → clear plaques = recombinant.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_009', difficulty: 'standard',
          question: 'Cosmids are hybrid cloning vectors that combine the **cos (cohesive end) site**.',
          hint: 'Review λ phage packaging limits (c12_biotech_cbse_01_008) and plasmid vector components.',
          misconception: 'Students often think **cosmids are a type of bacteriophage** because they use λ packaging.',
          parts: [
                { id: 'a', prompt: 'A cosmid vector backbone is 8 kb. The λ phage packaging limit is 37–52 kb. What is the maximum insert size this cosmid can accommodate?', answer: 'Maximum insert = 52 kb (upper packaging limit) – 8 kb (vector) = **44 kb**',
                  options: ['Maximum insert = 52 kb (upper packaging limit) – 8 kb (vector) = **44 kb**', '**cosmids are a type of bacteriophage**'],
                  hint: 'Review λ phage packaging limits (c12_biotech_cbse_01_008) and plasmid vector components.',
                  misconception: 'Students often think **cosmids are a type of bacteriophage** because they use λ packaging.' },
                { id: 'b', prompt: 'You have a 42 kb genomic DNA fragment to clone. You have three vectors: pBR322 (plasmid, max insert ~10 kb), λ phage replacement vector (max insert ~23 kb).', answer: 'Choose the **cosmid**',
                  options: ['Choose the **cosmid**', '**cosmids are a type of bacteriophage**'],
                  hint: 'Review λ phage packaging limits (c12_biotech_cbse_01_008) and plasmid vector components.',
                  misconception: 'Students often think **cosmids are a type of bacteriophage** because they use λ packaging.' }
          ],
            remediations: { 'cosmids-are-a-type-of': { steps: ['Revisit **c12_biotech_cbse_01_008** (λ phage vector) and list the phage genes retained in a replacement vector (head.', 'Revisit **c12_biotech_cbse_01_007** (pBR322) and list plasmid elements (ori, selectable marker, MCS).', 'Make a two-column table: "λ phage genes" vs "Plasmid elements".', 'Circle which column cosmids take from each — they take *cos site* from λ column, *ori + marker + MCS* from plasmid.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_010', difficulty: 'standard',
          question: 'BACs (Bacterial Artificial Chromosomes) and YACs (Yeast Artificial Chromosomes).',
          hint: 'Revisit c12_biotech_cbse_01_008 (lambda phage) and c12_biotech_cbse_01_009 (cosmids).',
          misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with.',
          parts: [
                { id: 'a', prompt: 'Explain why a YAC vector must contain three specific yeast chromosomal elements — ARS, CEN, and TEL — and what function each serves in the yeast host.', answer: 'ARS (Autonomously Replicating Sequence) acts as the origin of replication',
                  options: ['ARS (Autonomously Replicating Sequence) acts as the origin of replication', 'better'],
                  hint: 'Revisit c12_biotech_cbse_01_008 (lambda phage) and c12_biotech_cbse_01_009 (cosmids) to see how.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' },
                { id: 'b', prompt: 'A researcher wants to construct a genomic library for a 3 Gb mammalian genome.', answer: 'For BAC: N = ln(0.01) / ln(1 - 150,000/3,000,000,000) ≈ 207,000 clones',
                  options: ['For BAC: N = ln(0.01) / ln(1 - 150,000/3,000,000,000) ≈ 207,000 clones', 'better'],
                  hint: 'Revisit c12_biotech_cbse_01_008 (lambda phage) and c12_biotech_cbse_01_009 (cosmids) to see how.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' },
                { id: 'c', prompt: 'Compare the copy number control mechanisms of BACs and standard high-copy plasmids (e.g., pUC19).', answer: 'pUC19 uses a mutated pMB1 origin (rop deletion) giving 500–700 copies/cell',
                  options: ['pUC19 uses a mutated pMB1 origin (rop deletion) giving 500–700 copies/cell', 'high copy gives more DNA yield', 'better'],
                  hint: 'Revisit c12_biotech_cbse_01_008 (lambda phage) and c12_biotech_cbse_01_009 (cosmids) to see how.',
                  misconception: 'Students often think YACs are "better" than BACs solely because of larger insert capacity, and they confuse YACs with yeast expression.' }
          ],
            remediations: { 'yacs-are-better-than-bacs': { steps: ['If the student holds the above misconception: (1) Have them re-read the vector comparison table in NCERT Class 12 Ch.2.', '(2) Ask them to explain why the Human Genome Project used BACs, not YACs, for the final assembly — guide them to find.', '(3) Give a mini-case: "You have a 200 kb human gene with introns.', 'You want to express the protein.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_011', difficulty: 'standard',
          question: 'A shuttle vector is a recombinant DNA plasmid engineered to replicate.',
          hint: 'Re-read the "Origin of Replication" subsection in c12_biotech_cbse_01_007 and the "Yeast.',
          misconception: '**Misconception:** "Any plasmid with two antibiotic resistance genes (e.g., ampR + kanR) is a shuttle vector." **Why.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A shuttle vector is a recombinant DNA plasmid engineered to replicate autonomously in two',
                  options: ['A shuttle vector is a recombinant DNA plasmid engineered to replicate autonomously in two', 'A host-vector system is a compatible pair of a living host cell (which provides the', 'Saccharomyces cerevisiae (baker\'s yeast) is a unicellular, non-pathogenic, GRAS-status', 'The Baculovirus-Insect Cell Expression System is a eukaryotic recombinant protein'],
                  hint: 'Re-read the "Origin of Replication" subsection in c12_biotech_cbse_01_007 and the "Yeast Plasmids".',
                  misconception: '**Misconception:** "Any plasmid with two antibiotic resistance genes (e.g., ampR + kanR) is a shuttle vector." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-any-plasmid-with-two': { steps: ['If a student cannot distinguish ori from selectable marker: 1.', 'Revisit **c12_biotech_cbse_01_007** (pBR322) and identify its ori (rop/pMB1) and markers (ampR, tetR).', 'Revisit **c12_biotech_cbse_01_003** (Yeast host) and note the 2μ plasmid and ARS/CEN as yeast replication origins.', 'Draw a two-column table: "Function in *E.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_012', difficulty: 'standard',
          question: 'An expression vector is a specialized cloning vector engineered to drive.',
          hint: 'Revisit c11_biotech_cbse_07_010 (Lac operon regulation) and c12_biotech_cbse_01_007.',
          misconception: 'Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5 for every E.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Any plasmid with an origin of replication and antibiotic resistance gene can be used as an expression vector if we insert our gene into its.', answer: 'Incorrect',
                  options: ['Incorrect', 'vector maintenance', 'gene expression', 'stronger promoter always means more functional protein'],
                  hint: 'Revisit c11_biotech_cbse_07_010 (Lac operon regulation) and c12_biotech_cbse_01_007 (pBR322 map).',
                  misconception: 'Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5 for every E.' },
                { id: 'b', prompt: 'You are given two E. coli expression vectors: Vector A uses the lac promoter (Pₗₐc), Vector B uses the T7 promoter (Pₜ₇).', answer: 'Pₗₐc is recognized by E',
                  options: ['Pₗₐc is recognized by E', 'T7 promoter is stronger', 'stronger promoter always means more functional protein', '"stronger promoter always means more functional protein'],
                  hint: 'Revisit c11_biotech_cbse_07_010 (Lac operon regulation) and c12_biotech_cbse_01_007 (pBR322 map).',
                  misconception: 'Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5 for every E.' },
                { id: 'c', prompt: 'Design a minimal expression cassette for secreting a eukaryotic glycoprotein in Pichia pastoris.', answer: 'promoter, (',
                  options: ['promoter, (', 'stronger promoter always means more functional protein', '"stronger promoter always means more functional protein'],
                  hint: 'Revisit c11_biotech_cbse_07_010 (Lac operon regulation) and c12_biotech_cbse_01_007 (pBR322 map).',
                  misconception: 'Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5 for every E.' },
                { id: 'd', prompt: 'Compare the following two expression strategies for a toxic protein in E.', answer: 'Strategy 2 (pBAD/araBAD) provides tighter repression',
                  options: ['Strategy 2 (pBAD/araBAD) provides tighter repression', 'stronger promoter always means more functional protein', '"stronger promoter always means more functional protein'],
                  hint: 'Revisit c11_biotech_cbse_07_010 (Lac operon regulation) and c12_biotech_cbse_01_007 (pBR322 map).',
                  misconception: 'Students believe "stronger promoter always means more functional protein." They choose T7/lacUV5 for every E.' }
          ],
            remediations: { 'stronger-promoter-always-means-more': { steps: ['Have them calculate theoretical maximum translation rate — E. coli ribosome adds ~20 aa/sec; a 300 aa protein takes 15.', 'Show that T7 RNAP transcribes at ~250 nt/sec, producing one mRNA every 3.6 sec for a 900 nt gene — mRNA synthesis.', 'Assign a re-diagnostic: "Design an expression strategy for a 50 kDa aggregation-prone protein in E.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
