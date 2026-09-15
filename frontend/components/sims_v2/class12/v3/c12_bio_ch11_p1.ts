import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch11_p1: SimDef = {
    id: 'v3_c12_bio_ch11_p1',
    title: 'Biotechnology: Principles and Processes · Part 1/2',
    subtitle: 'Bacteria invented the scissors; we borrowed them to rewrite genomes.',
    classLevel: 12, subject: 'biology', topic: 'Biotechnology: Principles and Processes · Part 1/2',
    chapters: ['c12_bio_ch11'],
    nodeIds: ['c12_bio_cbse_11_001', 'c12_bio_cbse_11_002', 'c12_bio_cbse_11_003', 'c12_bio_cbse_11_004', 'c12_bio_cbse_11_005', 'c12_bio_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genetic engineer\'s apprentice', intro: 'From curd to CRISPR-era insulin — biotechnology is one principle: use living systems to make useful things.', goal: 'Define biotechnology\'s core principles and explain restriction enzyme action on palindromic sites.' },
    discovery: {
        question: 'You need to cut one specific gene out of a long DNA strand — like one word from a sentence with no spaces. What makes a cut at exactly the right spot?',
        options: ['Restriction enzymes — bacterial \'scissors\' that recognise specific palindromic sequences and cut there', 'DNA ligase — it cuts first, then pastes the gene into the vector', 'RNA polymerase — it transcribes the gene free of the surrounding DNA', 'Heat — boiling DNA breaks it precisely at gene boundaries'],
        answer: 'Restriction enzymes — bacterial \'scissors\' that recognise specific palindromic sequences and cut there',
        hook: 'Genetic engineering was impossible until biology lent us its own tools — bacteria evolved these enzymes to shred viral DNA, and we borrowed them as precision instruments.',
    },
    teaching: [
        { title: 'Biotechnology: Definition and Principles', text: 'Biotechnology is the broad area of biology involving the use of living organisms or their components (such as enzymes, cells, or genetic material) to develop or modify products, improve plants.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_11_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Walk the journey from bread yeast to insulin-producing bacteria: define biotechnology\'s two core principles, then wield restriction enzymes to cut DNA at palindromic sites for engineering.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_001', title: 'Biotechnology: Definition and Principles',
          caseStudy: { intro: 'Start by observing a packet of insulin in a pharmacy or a Bt cotton field in India — both are products of modern biotechnology.',
            decisions: [{ prompt: 'Define biotechnology as per the NCERT Class 12 textbook. How does it differ from the conventional definition that only mentions.', options: [
                { text: '**Correct answer:** Biotechnology is defined as "the integration of natural sciences and', outcome: '**Correct answer:** Biotechnology is defined as "the integration of natural sciences and organisms.' },
                { text: 'using microbes to make products', outcome: 'Not quite — Students often think **biotechnology = genetic engineering only**, ignoring bioprocess engineering.', reveals: 'biotechnology-genetic-engineering-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_002', title: 'Genetic Engineering: Tools - Restriction Enzymes',
          caseStudy: { intro: 'Imagine you have a long DNA strand — like a sentence without spaces — and you need to cut out a specific gene (a word) to paste it into a plasmid vector.',
            decisions: [{ prompt: 'Name the type of restriction enzyme most widely used in recombinant DNA technology and state its defining characteristic regarding cleavage.', options: [
                { text: 'Type II restriction enzymes are most widely used in rDNA technology', outcome: 'Type II restriction enzymes are most widely used in rDNA technology.' },
                { text: 'Type I', outcome: 'Not quite — Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can.', reveals: 'all-restriction-enzymes-produce-sticky' },
                { text: 'Type III', outcome: 'Not quite — Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can.', reveals: 'all-restriction-enzymes-produce-sticky' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_003', title: 'Recombinant DNA Technology: Steps',
          caseStudy: { intro: 'Imagine you want to produce human insulin in bacteria — a life-saving drug for millions of diabetic patients in India.',
            decisions: [{ prompt: 'What is the correct sequential order of steps in recombinant DNA technology starting from the source organism?', options: [
                { text: 'Correct order: (1) Isolation of DNA from source organism → (2) Fragmentation using', outcome: 'Correct order: (1) Isolation of DNA from source organism → (2) Fragmentation using restriction.' },
                { text: 'ligation joins any two DNA fragments', outcome: 'Not quite — Students think "ligation joins any two DNA fragments" and that "transformation efficiency depends.', reveals: 'ligation-joins-any-two-dna' },
                { text: 'transformation efficiency depends only on host competence', outcome: 'Not quite — Students think "ligation joins any two DNA fragments" and that "transformation efficiency depends.', reveals: 'ligation-joins-any-two-dna' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_004', title: 'Vectors: Plasmids and Bacteriophages',
          caseStudy: { intro: 'Begin with a familiar observation: when you see a bacterial colony on an agar plate, each colony arises from a single cell.',
            decisions: [{ prompt: 'What is the primary function of an origin of replication (ori) in a plasmid vector?', options: [
                { text: 'The origin of replication (ori) is a specific DNA sequence where replication initiates', outcome: 'The origin of replication (ori) is a specific DNA sequence where replication initiates; it allows.' },
                { text: 'it codes for antibiotic resistance', outcome: 'Not quite — Students often think that any plasmid can be used as a vector, ignoring the need for engineered.', reveals: 'any-plasmid-can-be-used' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_11_005', title: 'Competent Host: Transformation of Bacteria',
          scaffold: { problem: 'A student prepares CaCl₂-competent *E. coli* DH5α at OD₆₀₀ = 0.4 (≈ 3 × 10⁸ cells/mL).',
            steps: [
            { text: 'Identify given values — colonies = 150, dilution factor = 100 (since 100 µL of 1:100 dilution plated), DNA amount = 10.' },
            { text: 'Apply TE formula: TE = (150 × 100) / 0.01 = 1,500,000 CFU/µg = 1.5 × 10⁶ CFU/µg.' },
            { text: 'Recognize that linear DNA transforms 100–1000× less efficiently than supercoiled in CaCl₂/heat shock (no free ends for.' },
            { text: 'Predict colony count for linear DNA: TE_linear ≈ TE_supercoiled / 500 (typical) = 3 × 10³ CFU/µg.' },
            { text: 'Conclude that supercoiled plasmid is essential for high-efficiency cloning; linear DNA requires.', faded: true, blankAnswer: 'TE = 1.5 × 10⁶ CFU/µg for supercoiled pUC19. For linearized.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_11_006', title: 'PCR (Polymerase Chain Reaction): Principle and Steps',
          scaffold: { problem: 'A diagnostic lab needs to detect a pathogen with a 200 bp target gene.',
            steps: [
            { text: 'Calculate initial target copies. Pathogen genome mass = 5×10⁶ bp × 660 g/mol/bp / 6.022×10²³ = 5.48×10⁻¹⁵ g = 5.48.' },
            { text: 'Calculate copies needed for 10 ng amplicon. Amplicon mass per copy = 200 bp × 660 / 6.022×10²³ = 2.19×10⁻¹⁹ g.' },
            { text: 'Apply N_n = N_0 × 2^n → 4.57×10¹⁰ = 18 × 2^n → 2^n = 2.54×10⁹ → n = log₂(2.54×10⁹) ≈ 31.2 cycles.' },
            { text: 'Round up to 32 cycles (since partial cycles don\'t exist). Verify: 18 × 2³² = 7.7×10¹⁰ copies → mass = 7.7×10¹⁰.' },
            { text: 'Note practical adjustment: efficiency <100% (typically 0.8–0.9) adds 3–5 cycles; recommend 35 cycles for robustness.', faded: true, blankAnswer: 'Minimum 32 cycles theoretically; practically 35 cycles.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology: Principles and Processes · Part 1/2', spots: [
            { id: 's1', label: 'Biotechnology Definition and Principles', prompt: 'Which idea is this? — Biotechnology is the broad area of biology involving the use of living organisms or their.', answer: 'Biotechnology Definition and Principles', options: ['Biotechnology Definition and Principles', 'Genetic Engineering Tools - Restriction Enzymes', 'Recombinant DNA Technology Steps', 'Vectors Plasmids and Bacteriophages'] },
            { id: 's2', label: 'Genetic Engineering Tools - Restriction Enzymes', prompt: 'Which idea is this? — Restriction enzymes (restriction endonucleases) are bacterial enzymes that recognize.', answer: 'Genetic Engineering Tools - Restriction Enzymes', options: ['Genetic Engineering Tools - Restriction Enzymes', 'Biotechnology Definition and Principles', 'Recombinant DNA Technology Steps', 'Vectors Plasmids and Bacteriophages'] },
            { id: 's3', label: 'Recombinant DNA Technology Steps', prompt: 'Which idea is this? — Recombinant DNA Technology is the process of artificially combining DNA molecules from.', answer: 'Recombinant DNA Technology Steps', options: ['Recombinant DNA Technology Steps', 'Biotechnology Definition and Principles', 'Genetic Engineering Tools - Restriction Enzymes', 'Vectors Plasmids and Bacteriophages'] },
            { id: 's4', label: 'Vectors Plasmids and Bacteriophages', prompt: 'Which idea is this? — A vector is a DNA molecule used as a vehicle to artificially carry foreign genetic.', answer: 'Vectors Plasmids and Bacteriophages', options: ['Vectors Plasmids and Bacteriophages', 'Biotechnology Definition and Principles', 'Genetic Engineering Tools - Restriction Enzymes', 'Recombinant DNA Technology Steps'] },
            { id: 's5', label: 'Competent Host Transformation of Bacteria', prompt: 'Which idea is this? — A competent host is a bacterial cell (typically *E. coli*) that has been chemically.', answer: 'Competent Host Transformation of Bacteria', options: ['Competent Host Transformation of Bacteria', 'Biotechnology Definition and Principles', 'Genetic Engineering Tools - Restriction Enzymes', 'Recombinant DNA Technology Steps'] },
            { id: 's6', label: 'PCR Polymerase Chain Reaction Principle and Steps', prompt: 'Which idea is this? — Polymerase Chain Reaction (PCR) is an in vitro enzymatic technique that amplifies.', answer: 'PCR Polymerase Chain Reaction Principle and Steps', options: ['PCR Polymerase Chain Reaction Principle and Steps', 'Biotechnology Definition and Principles', 'Genetic Engineering Tools - Restriction Enzymes', 'Recombinant DNA Technology Steps'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup\'s engineered bacteria produce human enzyme beautifully in shake flasks, but in the 10,000-litre fermenter the yield collapses — oxygen starves the dense culture and product clumps into inclusion bodies. A young scientist proposes \'the gene is faulty, let\'s re-clone it\'.',
            decisions: [{ prompt: 'What\'s the right diagnosis?', options: [
                { text: 'It\'s a bioprocess problem, not a genetic one — scale-up needs optimised oxygen transfer, feed rate, pH and shear; a perfect strain still fails in a poorly run fermenter.', outcome: 'Biotechnology rests on two equal pillars: genetic engineering builds the strain, bioprocess engineering makes it produce at scale — re-cloning solves nothing here.' },
                { text: 'Re-clone it — biotechnology is genetic engineering, so any product failure must trace back to the gene construct.', outcome: 'The strain already proved it makes the enzyme in flasks; the breakdown is in fermentation parameters — treating bioprocess as a black box is the mistake.', reveals: 'biotech-is-gene-editing-only' },
                { text: 'Just run the same flask recipe in the big tank — scale doesn\'t change biology.', outcome: 'At high cell density, oxygen transfer, heat removal and mixing all change; a shaken flask recipe doesn\'t transfer directly to a stirred tank.', reveals: 'flask-equals-fermenter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now hold the molecular scissors that built the biotech industry. Genetic engineering principles and restriction enzymes are core board content — and the actual toolkit of every lab career.',
            decisions: [{ prompt: 'What comes next? Biotechnology: Principles and Processes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biotechnology: Principles and Processes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_001', difficulty: 'standard',
          question: 'Biotechnology is the broad area of biology involving the use of living.',
          hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) and c11_biotech_cbse_07_006 (Genetic.',
          misconception: 'Students often think **biotechnology = genetic engineering only**, ignoring bioprocess engineering entirely.',
          parts: [
                { id: 'a', prompt: 'Why is the universality of the genetic code a prerequisite for genetic engineering? Explain with an example.', answer: '**Correct answer:** The genetic code is nearly universal',
                  options: ['**Correct answer:** The genetic code is nearly universal', 'because DNA is the same in all organisms', 'because bacteria have the same genes as humans'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) and c11_biotech_cbse_07_006 (Genetic Code) — focus.',
                  misconception: 'Students often think **biotechnology = genetic engineering only**, ignoring bioprocess engineering entirely.' },
                { id: 'b', prompt: 'A researcher wants to produce a human growth hormone in bacteria.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'cut DNA', 'grow bacteria'],
                  hint: 'Revisit c11_biotech_cbse_07_001 (Central Dogma) and c11_biotech_cbse_07_006 (Genetic Code) — focus.',
                  misconception: 'Students often think **biotechnology = genetic engineering only**, ignoring bioprocess engineering entirely.' }
          ],
            remediations: { 'biotechnology-genetic-engineering-only': { steps: ['If the student holds this misconception: 1.', 'Revisit **c11_biotech_cbse_01_007** (Biotechnology in Industry: Fermentation Products) to see classical examples where.', 'Watch a 5-minute video of an industrial fermenter (e.g., Biocon\'s insulin plant) and list 5 parameters being controlled.', 'Complete a comparative table: "Genetic Engineering vs Bioprocess Engineering" with columns: *Goal, Key Tools, Scale.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_002', difficulty: 'standard',
          question: 'Restriction enzymes (restriction endonucleases) are bacterial enzymes that.',
          hint: 'If unable to write complementary strands or identify palindromes, revisit.',
          misconception: 'Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can ligate together**.',
          parts: [
                { id: 'a', prompt: 'Name the type of restriction enzyme most widely used in recombinant DNA technology and state its defining characteristic regarding cleavage position relative.', answer: 'Type II restriction enzymes are most widely used in rDNA technology',
                  options: ['Type II restriction enzymes are most widely used in rDNA technology', 'Type I', 'Type III'],
                  hint: 'If unable to write complementary strands or identify palindromes, revisit **c11_bio_cbse_09_004**.',
                  misconception: 'Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can ligate together**.' },
                { id: 'b', prompt: 'The restriction enzyme EcoRI recognizes the sequence 5\'-GAATTC-3\'.', answer: 'Complementary strand (3\'→5\'): CTTAAG',
                  options: ['Complementary strand (3\'→5\'): CTTAAG', 'it reads the same backwards'],
                  hint: 'If unable to write complementary strands or identify palindromes, revisit **c11_bio_cbse_09_004**.',
                  misconception: 'Students think **all restriction enzymes produce sticky ends** and that **any sticky ends can ligate together**.' }
          ],
            remediations: { 'all-restriction-enzymes-produce-sticky': { steps: ['Revisit **c11_biotech_cbse_12_007** (Restriction Enzymes: Types and Cleavage Patterns) — focus on the table comparing.', 'Draw the cleavage of EcoRI and HaeIII on paper: write both strands 5\'→3\', mark the cut sites with ↓, and *circle the.', 'Practice: Given 5 enzymes (EcoRI, BamHI, HindIII, HaeIII, PvuII), classify each as sticky/blunt and write their.', 'Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_003', difficulty: 'standard',
          question: 'Recombinant DNA Technology is the process of artificially combining DNA.',
          hint: 'If stuck on ligation logic, revisit c11_biotech_cbse_03_006 (DNA structure) and.',
          misconception: 'Students think "ligation joins any two DNA fragments" and that "transformation efficiency depends only on host.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Recombinant DNA Technology is the process of artificially combining DNA molecules from',
                  options: ['Recombinant DNA Technology is the process of artificially combining DNA molecules from', 'Biotechnology is the broad area of biology involving the use of living organisms or their', 'Restriction enzymes (restriction endonucleases) are bacterial enzymes that recognize', 'A vector is a DNA molecule used as a vehicle to artificially carry foreign genetic'],
                  hint: 'If stuck on ligation logic, revisit c11_biotech_cbse_03_006 (DNA structure) and.',
                  misconception: 'Students think "ligation joins any two DNA fragments" and that "transformation efficiency depends only on host competence." The exact.' }
          ],
            remediations: { 'ligation-joins-any-two-dna': { steps: ['Revisit c12_bio_cbse_11_002 (Restriction Enzymes) — practice predicting sticky-end sequences for EcoRI, BamHI, HindIII.', 'Review vector maps (pBR322, pUC19) — identify MCS, antibiotic markers, lacZ α-fragment, ori.', 'Do a paper exercise: given a vector map and insert sequence, choose enzymes for directional cloning, draw the.', 'Watch animation of transformation (heat shock vs electroporation) and explain why CaCl₂ makes cells competent.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "ligation joins any two DNA fragments" and that "transformation efficiency depends only on host.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "If we use a restriction enzyme that cuts the vector at two sites within the multiple cloning site (MCS), we will get higher cloning.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'ligation joins any two DNA fragments', 'transformation efficiency depends only on host competence'],
                  hint: 'If stuck on ligation logic, revisit c11_biotech_cbse_03_006 (DNA structure) and.',
                  misconception: 'Students think "ligation joins any two DNA fragments" and that "transformation efficiency depends only on host competence." The exact.' }
          ],
            remediations: { 'ligation-joins-any-two-dna': { steps: ['Revisit c12_bio_cbse_11_002 (Restriction Enzymes) — practice predicting sticky-end sequences for EcoRI, BamHI, HindIII.', 'Review vector maps (pBR322, pUC19) — identify MCS, antibiotic markers, lacZ α-fragment, ori.', 'Do a paper exercise: given a vector map and insert sequence, choose enzymes for directional cloning, draw the.', 'Watch animation of transformation (heat shock vs electroporation) and explain why CaCl₂ makes cells competent.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_004', difficulty: 'standard',
          question: 'A vector is a DNA molecule used as a vehicle to artificially carry foreign.',
          hint: 'Review bacterial cell structure (c11_bio_cbse_02_003) and DNA replication basics.',
          misconception: 'Students often think that any plasmid can be used as a vector, ignoring the need for engineered features: an origin.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A vector is a DNA molecule used as a vehicle to artificially carry foreign genetic',
                  options: ['A vector is a DNA molecule used as a vehicle to artificially carry foreign genetic', 'Biotechnology is the broad area of biology involving the use of living organisms or their', 'Restriction enzymes (restriction endonucleases) are bacterial enzymes that recognize', 'Recombinant DNA Technology is the process of artificially combining DNA molecules from'],
                  hint: 'Review bacterial cell structure (c11_bio_cbse_02_003) and DNA replication basics.',
                  misconception: 'Students often think that any plasmid can be used as a vector, ignoring the need for engineered features: an origin of replication.' }
          ],
            remediations: { 'any-plasmid-can-be-used': { steps: ['Revisit c12_bio_cbse_11_002 (restriction enzymes) to recall how sticky/blunt ends work.', 'Review c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) for vector features.', 'Draw a labeled diagram of pBR322 and pUC19, marking ori, selectable markers, MCS.', 'Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_005', difficulty: 'standard',
          question: 'A competent host is a bacterial cell (typically *E. coli*) that has been.',
          hint: 'If stuck on membrane permeability, revisit c11_biotech_cbse_02_003 (Cell Membrane: Fluid.',
          misconception: 'Students think "competent cells are a special mutant strain of *E.',
          parts: [
                { id: 'a', prompt: 'What is the primary role of cold calcium chloride (CaCl₂) treatment in making *E. coli* competent for transformation?', answer: 'Cold CaCl₂ neutralizes the negative charges on both the bacterial cell membrane',
                  options: ['Cold CaCl₂ neutralizes the negative charges on both the bacterial cell membrane', 'CaCl₂ degrades the cell wall', 'CaCl₂ provides energy for DNA uptake', 'competent cells'],
                  hint: 'If stuck on membrane permeability, revisit c11_biotech_cbse_02_003 (Cell Membrane: Fluid Mosaic.',
                  misconception: 'Students think "competent cells are a special mutant strain of *E.' }
          ],
            remediations: { 'competent-cells-are-a-special': { steps: ['Revisit c12_bio_cbse_11_004 (Vectors) to confirm selectable marker and *lacZα* function.', 'Watch a 3-min animation of CaCl₂/heat shock (search "bacterial transformation heat shock mechanism").', 'Do a paper-based simulation: draw a bacterium, show negative charges on membrane and DNA, add Ca²⁺, show charge.', 'Re-attempt Diagnostic Q2 and Q4 — if still wrong, the gap is biophysical mechanism, not memorization.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_006', difficulty: 'standard',
          question: 'Polymerase Chain Reaction (PCR) is an in vitro enzymatic technique that.',
          hint: 'Review c11_biotech_cbse_07_002 (Transcription) and c11_biotech_cbse_07_007 (Translation).',
          misconception: 'Students believe PCR amplification is infinite and linear: "If I run 40 cycles instead of 30, I get 2¹⁰ = 1024× more.',
          parts: [
                { id: 'a', prompt: 'What are the three temperature-dependent steps in a standard PCR cycle, their typical temperature ranges, and the key molecular event occurring in each step?', answer: 'Correct answer: (1) Denaturation: 94–98°C',
                  options: ['Correct answer: (1) Denaturation: 94–98°C', 'If I run 40 cycles instead of 30, I get 2¹⁰ = 1024× more product'],
                  hint: 'Review c11_biotech_cbse_07_002 (Transcription) and c11_biotech_cbse_07_007 (Translation) for.',
                  misconception: 'Students believe PCR amplification is infinite and linear: "If I run 40 cycles instead of 30, I get 2¹⁰ = 1024× more product." In reality.' }
          ],
            remediations: { 'pcr-amplification-is-infinite-and': { steps: ['Revisit the PCR animation in NCERT Fig. 11.7 (or equivalent) and physically trace one template molecule through 3.', 'Write the mass-balance equation: initial dNTP moles = final product moles × length (bp).', 'Perform a thought experiment: if primers are 0.2 µM (10 pmol in 50 µL), how many amplicons can they prime?', 'Re-attempt Diagnostic Q3 with these constraints.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
