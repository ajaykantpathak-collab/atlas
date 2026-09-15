import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch02_p1: SimDef = {
    id: 'v3_c12_biotech_ch02_p1',
    title: 'Recombinant DNA Technology · Part 1/2',
    subtitle: 'Sticky ends aren\'t universal glue — only matching overhangs can pair.',
    classLevel: 12, subject: 'biotechnology', topic: 'Recombinant DNA Technology · Part 1/2',
    chapters: ['c12_biotech_ch02'],
    nodeIds: ['c12_biotech_cbse_02_001', 'c12_biotech_cbse_02_002', 'c12_biotech_cbse_02_003', 'c12_biotech_cbse_02_004', 'c12_biotech_cbse_02_005', 'c12_biotech_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Molecular cloning designer', intro: 'Every successful clone is won or lost at the enzyme-selection step — before a single tube is opened.', goal: 'Classify restriction endonucleases and predict compatibility of sticky and blunt ends.' },
    discovery: {
        question: 'You cut a plasmid with EcoRI (overhang AATT) and your gene with BamHI (overhang GATC), then ligate — zero colonies. Why?',
        options: ['The sticky ends aren\'t complementary — EcoRI and BamHI overhangs cannot base-pair', 'Ligase only joins blunt ends, never sticky ends', 'EcoRI and BamHI are incompatible because both are Type II enzymes', 'The plasmid was too large for ligation to succeed'],
        answer: 'The sticky ends aren\'t complementary — EcoRI and BamHI overhangs cannot base-pair',
        hook: '\'Sticky\' doesn\'t mean universally sticky — cohesion demands complementarity. Students assume any overhang joins any overhang; only matching sequences anneal, which makes enzyme choice a design decision.',
    },
    teaching: [
        { title: 'Restriction Endonucleases: Types and Palindromic Recognition Sites', text: 'Restriction endonucleases are bacterial enzymes that recognize specific palindromic DNA sequences (typically 4-8 bp long) and cleave the phosphodiester backbone within or near these sites; Type.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_02_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Design a cloning strategy: pick Type II restriction enzymes by their recognition sites, predict sticky vs blunt ends from the cut pattern, and plan compatible enzyme pairs for a directional clone.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_001', title: 'Restriction Endonucleases: Types and Palindromic Recognition Sites',
          caseStudy: { intro: 'Imagine you have a 5 kb plasmid and want to insert a gene at a single, precise location — how do you cut the plasmid without shredding it?',
            decisions: [{ prompt: 'Name the three types of restriction endonucleases and state the key feature that makes Type II enzymes uniquely suitable for recombinant.', options: [
                { text: 'The three types are Type I, Type II, and Type III', outcome: 'The three types are Type I, Type II, and Type III. Type II enzymes are uniquely suitable because.' },
                { text: 'Type I cuts at specific sites', outcome: 'Not quite — Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction.', reveals: 'any-enzyme-cutting-dna-at' },
                { text: 'any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme', outcome: 'Not quite — Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction.', reveals: 'any-enzyme-cutting-dna-at' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_002', title: 'Sticky Ends vs Blunt Ends: Implications for Ligation',
          caseStudy: { intro: 'Imagine you have a plasmid vector cut with EcoRI (sticky ends: 5\'-AATT overhangs) and your target gene cut with BamHI (sticky ends: 5\'-GATC overhangs).',
            decisions: [{ prompt: 'A REMEMBER level question: List two restriction enzymes that produce 5\' sticky ends and two that produce blunt ends.', options: [
                { text: 'Correct answer: 5\' sticky ends', outcome: 'Correct answer: 5\' sticky ends — EcoRI (5\'-G↓AATTC-3\', leaves 5\'-AATT overhang), BamHI.' },
                { text: 'sticky', outcome: 'Not quite — Students often believe that any two sticky ends can ligate if they are both "sticky," ignoring.', reveals: 'any-two-sticky-ends-can' },
                { text: 'HindIII as blunt, or saying EcoRI gives 3\' overhangs', outcome: 'Not quite — Students often believe that any two sticky ends can ligate if they are both "sticky," ignoring.', reveals: 'any-two-sticky-ends-can' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_003', title: 'DNA Ligase: Mechanism of Phosphodiester Bond Formation',
          caseStudy: { intro: 'Imagine you have cut a plasmid vector with EcoRI and a human insulin gene with the same enzyme — both now have complementary sticky ends.',
            decisions: [{ prompt: 'What are the two chemical groups on adjacent DNA nucleotides that DNA ligase joins to form a phosphodiester bond?', options: [
                { text: 'The 3\'-hydroxyl (3\'-OH) group of one nucleotide and the 5\'-phosphate (5\'-P) group of the', outcome: 'The 3\'-hydroxyl (3\'-OH) group of one nucleotide and the 5\'-phosphate (5\'-P) group of the adjacent.' },
                { text: '3\'-phosphate and 5\'-OH', outcome: 'Not quite — Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes.', reveals: 'dna-ligase-recognizes-specific-dna' },
                { text: 'two 3\'-OH groups', outcome: 'Not quite — Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes.', reveals: 'dna-ligase-recognizes-specific-dna' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_004', title: 'Alkaline Phosphatase and Other DNA-Modifying Enzymes',
          caseStudy: { intro: 'Imagine you have cut your plasmid vector with EcoRI and want to insert a gene fragment also cut with EcoRI.',
            decisions: [{ prompt: 'What is the specific chemical modification that alkaline phosphatase performs on a DNA molecule?', options: [
                { text: 'Alkaline phosphatase hydrolyzes the 5\'-phosphate group from the terminal nucleotide of', outcome: 'Alkaline phosphatase hydrolyzes the 5\'-phosphate group from the terminal nucleotide of DNA, leaving.' },
                { text: 'removes 3\'-phosphate', outcome: 'Not quite — Students often believe alkaline phosphatase "destroys" DNA ends or that it acts on 3\' ends.', reveals: 'alkaline-phosphatase-destroys-dna-ends' },
                { text: 'adds phosphate', outcome: 'Not quite — Students often believe alkaline phosphatase "destroys" DNA ends or that it acts on 3\' ends.', reveals: 'alkaline-phosphatase-destroys-dna-ends' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_005', title: 'cDNA Synthesis from mRNA Using Reverse Transcriptase',
          caseStudy: { intro: 'Imagine you want to produce human insulin in *E. coli* — but the human insulin gene contains introns that bacteria cannot splice out.',
            decisions: [{ prompt: 'What is the template and the enzyme used in the first-strand cDNA synthesis reaction?', options: [
                { text: 'Template: mature mRNA (with 5\' cap and 3\' poly-A tail)', outcome: 'Template: mature mRNA (with 5\' cap and 3\' poly-A tail). Enzyme: reverse transcriptase.' },
                { text: 'DNA template', outcome: 'Not quite — Students often think reverse transcriptase *alone* makes double-stranded cDNA.', reveals: 'reverse-transcriptase-alone-makes-double' },
                { text: 'DNA polymerase', outcome: 'Not quite — Students often think reverse transcriptase *alone* makes double-stranded cDNA.', reveals: 'reverse-transcriptase-alone-makes-double' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_02_006', title: 'Polymerase Chain Reaction: Principle, Steps, and Cycles',
          scaffold: { problem: 'A forensic sample contains 0.5 ng of a 300 bp target DNA fragment. How many copies of this fragment are present initially?',
            steps: [
            { text: 'Calculate molecular weight of one double-stranded 300 bp amplicon: MW = 300 bp × 650 Da/bp = 195,000 Da = 195,000 g/mol.' },
            { text: 'Convert initial mass to moles: 0.5 ng = 0.5 × 10⁻⁹ g. Moles = (0.5 × 10⁻⁹ g) / (195,000 g/mol) = 2.564 × 10⁻¹⁵ mol.' },
            { text: 'Convert moles to molecule count (N₀) using Avogadro’s number: N₀ = 2.564 × 10⁻¹⁵ mol × 6.022 × 10²³ molecules/mol.' },
            { text: 'Apply PCR amplification formula for n = 28 cycles: N = N₀ × 2²⁸ = 1.544 × 10⁹ × 268,435,456 = 4.145 × 10¹⁷ copies.' },
            { text: 'Convert final copies back to mass: Mass = (N × MW) / Nₐ = (4.145 × 10¹⁷ × 195,000) / 6.022 × 10²³ = 134.3 µg.', faded: true, blankAnswer: 'Initial copies = 1.54 × 10⁹; Theoretical yield after 28.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Recombinant DNA Technology · Part 1/2', spots: [
            { id: 's1', label: 'Sticky Ends vs Blunt Ends Implications for Ligation', prompt: 'Which idea is this? — Sticky ends (cohesive ends) are single-stranded DNA overhangs generated when.', answer: 'Sticky Ends vs Blunt Ends Implications for Ligation', options: ['Sticky Ends vs Blunt Ends Implications for Ligation', 'DNA Ligase Mechanism of Phosphodiester Bond Formation', 'Alkaline Phosphatase and Other DNA-Modifying Enzymes', 'cDNA Synthesis from mRNA Using Reverse Transcriptase'] },
            { id: 's2', label: 'DNA Ligase Mechanism of Phosphodiester Bond Formation', prompt: 'Which idea is this? — DNA ligase is an enzyme that catalyzes the formation of a phosphodiester bond between the.', answer: 'DNA Ligase Mechanism of Phosphodiester Bond Formation', options: ['DNA Ligase Mechanism of Phosphodiester Bond Formation', 'Sticky Ends vs Blunt Ends Implications for Ligation', 'Alkaline Phosphatase and Other DNA-Modifying Enzymes', 'cDNA Synthesis from mRNA Using Reverse Transcriptase'] },
            { id: 's3', label: 'Alkaline Phosphatase and Other DNA-Modifying Enzymes', prompt: 'Which idea is this? — Alkaline phosphatase is a DNA-modifying enzyme that catalyzes the removal of 5\'-phosphate.', answer: 'Alkaline Phosphatase and Other DNA-Modifying Enzymes', options: ['Alkaline Phosphatase and Other DNA-Modifying Enzymes', 'Sticky Ends vs Blunt Ends Implications for Ligation', 'DNA Ligase Mechanism of Phosphodiester Bond Formation', 'cDNA Synthesis from mRNA Using Reverse Transcriptase'] },
            { id: 's4', label: 'cDNA Synthesis from mRNA Using Reverse Transcriptase', prompt: 'Which idea is this? — cDNA (complementary DNA) synthesis is the enzymatic process of generating.', answer: 'cDNA Synthesis from mRNA Using Reverse Transcriptase', options: ['cDNA Synthesis from mRNA Using Reverse Transcriptase', 'Sticky Ends vs Blunt Ends Implications for Ligation', 'DNA Ligase Mechanism of Phosphodiester Bond Formation', 'Alkaline Phosphatase and Other DNA-Modifying Enzymes'] },
            { id: 's5', label: 'Polymerase Chain Reaction Principle Steps and Cycles', prompt: 'Which idea is this? — Polymerase Chain Reaction (PCR) is an in vitro enzymatic technique for exponential.', answer: 'Polymerase Chain Reaction Principle Steps and Cycles', options: ['Polymerase Chain Reaction Principle Steps and Cycles', 'Sticky Ends vs Blunt Ends Implications for Ligation', 'DNA Ligase Mechanism of Phosphodiester Bond Formation', 'Alkaline Phosphatase and Other DNA-Modifying Enzymes'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school lab practical, a team must insert a DNA fragment into a vector. They can cut both with EcoRI, which leaves 5′-AATT sticky overhangs, or SmaI, which cuts dead centre and leaves blunt ends. A teammate votes SmaI \'because blunt ends are simpler\'.',
            decisions: [{ prompt: 'Which enzyme gives the better cloning strategy?', options: [
                { text: 'EcoRI — sticky ends base-pair across the insert–vector junction, stabilising it and making ligation 10–100× more efficient; they can also enforce insert orientation.', outcome: 'Cohesive ends turn a random collision into a matched join; blunt-end ligation works but is far less efficient and orientation-free.' },
                { text: 'SmaI — blunt ends join any fragment to any vector, so ligation is simpler and just as efficient.', outcome: 'Blunt ends have no complementary overhangs to anneal, so ligase works far slower and the insert can go in backwards.', reveals: 'blunt-ligation-equal' },
                { text: 'It doesn\'t matter — any restriction enzyme cutting DNA at a defined site is equally good for cloning.', outcome: 'Cleavage geometry differs: Type II enzymes cutting within their palindrome give sticky ends, central cutters give blunt — and end type drives ligation success.', reveals: 'any-cutter-equally-good' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now read overhangs like a molecular engineer. Restriction enzyme types and end compatibility are precision board questions — and daily decisions in any molecular biology lab.',
            decisions: [{ prompt: 'What comes next? Recombinant DNA Technology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Recombinant DNA Technology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_001', difficulty: 'standard',
          question: 'Restriction endonucleases are bacterial enzymes that recognize specific.',
          hint: 'If stuck, revisit c11_biotech_cbse_03_006 (DNA Structure) to practice writing.',
          misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.',
          parts: [
                { id: 'a', prompt: 'Name the three types of restriction endonucleases and state the key feature that makes Type II enzymes uniquely suitable for recombinant DNA technology.', answer: 'The three types are Type I, Type II, and Type III',
                  options: ['The three types are Type I, Type II, and Type III', 'Type I cuts at specific sites', 'any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme'],
                  hint: 'If stuck, revisit c11_biotech_cbse_03_006 (DNA Structure) to practice writing complementary strands.',
                  misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.' },
                { id: 'b', prompt: 'The recognition sequence for EcoRI is 5\'-GAATTC-3\'. Write the complementary strand in the 5\'→3\' direction and explain why this sequence is called a palindrome.', answer: 'Complementary strand (5\'→3\'): 5\'-GAATTC-3\' (same as the original)',
                  options: ['Complementary strand (5\'→3\'): 5\'-GAATTC-3\' (same as the original)', 'A pairs with T', 'any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme'],
                  hint: 'If stuck, revisit c11_biotech_cbse_03_006 (DNA Structure) to practice writing complementary strands.',
                  misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.' },
                { id: 'c', prompt: 'A linear DNA fragment of 10,000 bp is digested with a restriction enzyme that recognizes a 6-bp palindromic sequence.', answer: 'Step 1: Probability of a specific 6-bp sequence = (1/4)^6 = 1/4096',
                  options: ['Step 1: Probability of a specific 6-bp sequence = (1/4)^6 = 1/4096', 'any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme'],
                  hint: 'If stuck, revisit c11_biotech_cbse_03_006 (DNA Structure) to practice writing complementary strands.',
                  misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.' },
                { id: 'd', prompt: 'Compare the cleavage patterns of EcoRI (5\'-G^AATTC-3\') and SmaI (5\'-CCC^GGG-3\').', answer: 'EcoRI cuts asymmetrically within the palindrome (between G and A), generating 5\'',
                  options: ['EcoRI cuts asymmetrically within the palindrome (between G and A), generating 5\'', 'any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme'],
                  hint: 'If stuck, revisit c11_biotech_cbse_03_006 (DNA Structure) to practice writing complementary strands.',
                  misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.' }
          ],
            remediations: { 'any-enzyme-cutting-dna-at': { steps: ['If a student cannot distinguish enzyme types or predict cleavage products: (1) Revisit c11_biotech_cbse_12_007.', '(2) Practice drawing the double-stranded DNA for EcoRI, HindIII, BamHI, SmaI, PstI, marking the cut sites with arrows.', '(3) Re-do Diagnostic Question 3 with a 4-bp cutter (e.g., Sau3AI, GATC) and a 8-bp cutter (e.g., NotI, GCGGCCGC).', '(4) Take a mini-quiz: given 5 enzyme names, classify each as Type I, II, or IIS and state the expected end type.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.',
          parts: [
                { id: 'a', prompt: 'Two enzymes, XhoI (5\'-C^TCGAG-3\') and SalI (5\'-G^TCGAC-3\'), produce compatible sticky ends.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme'],
                  hint: 'If stuck, revisit c11_biotech_cbse_03_006 (DNA Structure) to practice writing complementary strands.',
                  misconception: 'Students often think that any enzyme cutting DNA at a specific sequence is a Type II restriction enzyme.' }
          ],
            remediations: { 'any-enzyme-cutting-dna-at': { steps: ['If a student cannot distinguish enzyme types or predict cleavage products: (1) Revisit c11_biotech_cbse_12_007.', '(2) Practice drawing the double-stranded DNA for EcoRI, HindIII, BamHI, SmaI, PstI, marking the cut sites with arrows.', '(3) Re-do Diagnostic Question 3 with a 4-bp cutter (e.g., Sau3AI, GATC) and a 8-bp cutter (e.g., NotI, GCGGCCGC).', '(4) Take a mini-quiz: given 5 enzyme names, classify each as Type I, II, or IIS and state the expected end type.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_002', difficulty: 'standard',
          question: 'Sticky ends (cohesive ends) are single-stranded DNA overhangs generated when.',
          hint: 'Revisit c12_biotech_cbse_02_001 and practice drawing cleavage products for 10 different.',
          misconception: 'Students often believe that any two sticky ends can ligate if they are both "sticky," ignoring sequence.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List two restriction enzymes that produce 5\' sticky ends and two that produce blunt ends.', answer: 'Correct answer: 5\' sticky ends',
                  options: ['Correct answer: 5\' sticky ends', 'sticky', 'HindIII as blunt, or saying EcoRI gives 3\' overhangs'],
                  hint: 'Revisit c12_biotech_cbse_02_001 and practice drawing cleavage products for 10 different enzymes.',
                  misconception: 'Students often believe that any two sticky ends can ligate if they are both "sticky," ignoring sequence complementarity.' },
                { id: 'b', prompt: 'An ANALYZE level question: Compare the ligation outcomes when a vector cut with BamHI is mixed with an insert cut with (a) BamHI, (b) BglII, (c) Sau3AI.', answer: 'Correct answer: BamHI (5\'-G↓GATCC-3\') leaves 5\'-GATC overhang',
                  options: ['Correct answer: BamHI (5\'-G↓GATCC-3\') leaves 5\'-GATC overhang', 'sticky'],
                  hint: 'Revisit c12_biotech_cbse_02_001 and practice drawing cleavage products for 10 different enzymes.',
                  misconception: 'Students often believe that any two sticky ends can ligate if they are both "sticky," ignoring sequence complementarity.' }
          ],
            remediations: { 'any-two-sticky-ends-can': { steps: ['Have the student draw the double-stranded cleavage products of EcoRI, BamHI, HindIII, PvuII, SmaI, EcoRV on paper.', 'Ask them to write the 4-base overhang sequence for each sticky-end enzyme.', 'Give them 5 vector-insert enzyme pairs (e.g., EcoRI/EcoRI, EcoRI/BamHI, BamHI/BglII, PvuII/PvuII, EcoRV/SmaI) and have.', 'Re-test with Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_003', difficulty: 'standard',
          question: 'DNA ligase is an enzyme that catalyzes the formation of a phosphodiester bond.',
          hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) and c11_biotech_cbse_03_006.',
          misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.',
          parts: [
                { id: 'a', prompt: 'Explain why DNA ligase requires ATP (or NAD⁺) even though the phosphodiester bond formation is a condensation reaction that releases water.', answer: 'The direct condensation between a 3\'-OH and a 5\'-phosphate is thermodynamically',
                  options: ['The direct condensation between a 3\'-OH and a 5\'-phosphate is thermodynamically', 'ATP provides energy for the bond', 'recognizes', 'DNA ligase "recognizes" specific DNA sequences like restriction enzymes do'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) and c11_biotech_cbse_03_006 (DNA.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' },
                { id: 'b', prompt: 'A researcher sets up two ligation reactions: Reaction A contains a 3 kb vector and a 1 kb insert, both cut with BamHI (sticky ends).', answer: 'Reaction A (sticky ends) will have higher yield',
                  options: ['Reaction A (sticky ends) will have higher yield', 'both are equal because DNA concentration is the same', 'recognizes', 'DNA ligase "recognizes" specific DNA sequences like restriction enzymes do'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) and c11_biotech_cbse_03_006 (DNA.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' },
                { id: 'c', prompt: 'Compare the cofactor requirements of T4 DNA ligase (from bacteriophage T4) and E. coli DNA ligase.', answer: 'T4 DNA ligase uses ATP as a cofactor, while E',
                  options: ['T4 DNA ligase uses ATP as a cofactor, while E', 'recognizes', 'DNA ligase "recognizes" specific DNA sequences like restriction enzymes do'],
                  hint: 'Revisit c11_biotech_cbse_03_008 (Nucleotides and Nucleosides) and c11_biotech_cbse_03_006 (DNA.',
                  misconception: 'Students often believe that DNA ligase "recognizes" specific DNA sequences like restriction enzymes do.' }
          ],
            remediations: { 'dna-ligase-recognizes-specific-dna': { steps: ['If a student exhibits the above misconception, do the following: (1) Show a side-by-side comparison: restriction enzyme.', 'DNA ligase binding to a generic nick.', 'Highlight that EcoRI makes sequence-specific contacts with bases in the major groove, while ligase contacts the.', '(2) Have the student predict whether T4 DNA ligase can join a nick in a synthetic duplex with a random sequence (e.g.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_004', difficulty: 'standard',
          question: 'Alkaline phosphatase is a DNA-modifying enzyme that catalyzes the removal.',
          hint: 'If unable to visualize the 5\'/3\' chemistry, revisit c11_biotech_cbse_03_006 (DNA.',
          misconception: 'Students often believe alkaline phosphatase "destroys" DNA ends or that it acts on 3\' ends.',
          parts: [
                { id: 'a', prompt: 'You have a vector digested with BamHI (sticky ends) and an insert digested with BglII (compatible sticky ends).', answer: 'Step 1: Treat vector with alkaline phosphatase to remove 5\'-phosphates (prevents',
                  options: ['Step 1: Treat vector with alkaline phosphatase to remove 5\'-phosphates (prevents', 'destroys', 'alkaline phosphatase adds phosphate to insert', 'alkaline phosphatase "destroys" DNA ends or that it acts on 3\' ends'],
                  hint: 'If unable to visualize the 5\'/3\' chemistry, revisit c11_biotech_cbse_03_006 (DNA Structure) and.',
                  misconception: 'Students often believe alkaline phosphatase "destroys" DNA ends or that it acts on 3\' ends.' }
          ],
            remediations: { 'alkaline-phosphatase-destroys-dna-ends': { steps: ['Revisit c12_biotech_cbse_02_003 (DNA Ligase) to recall that ligase requires 5\'-P and 3\'-OH.', 'Draw a DNA strand with 5\'-P and 3\'-OH labels; physically simulate phosphatase removing 5\'-P and kinase adding it.', 'Create a table: Enzyme | Substrate | Product | Role in Cloning.', 'Re-attempt Diagnostic Question 2 and 3, explaining each step aloud.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_005', difficulty: 'standard',
          question: 'cDNA (complementary DNA) synthesis is the enzymatic process of generating.',
          hint: 'Revisit c11_biotech_cbse_07_005 (RNA Splicing) to see how introns are removed, and.',
          misconception: 'Students often think reverse transcriptase *alone* makes double-stranded cDNA.',
          parts: [
                { id: 'a', prompt: 'What is the template and the enzyme used in the first-strand cDNA synthesis reaction?', answer: 'Template: mature mRNA (with 5\' cap and 3\' poly-A tail)',
                  options: ['Template: mature mRNA (with 5\' cap and 3\' poly-A tail)', 'DNA template', 'DNA polymerase', 'reverse transcriptase *alone* makes double-stranded cDNA'],
                  hint: 'Revisit c11_biotech_cbse_07_005 (RNA Splicing) to see how introns are removed, and.',
                  misconception: 'Students often think reverse transcriptase *alone* makes double-stranded cDNA.' },
                { id: 'b', prompt: 'Compare the end structures of cDNA produced by the classic RNase H / DNA Pol I method versus the modern "cap-switching" (template-switching) method.', answer: 'Classic method: RNase H nicks the RNA, DNA Pol I extends from nicks, yielding a',
                  options: ['Classic method: RNase H nicks the RNA, DNA Pol I extends from nicks, yielding a', 'reverse transcriptase *alone* makes double-stranded cDNA'],
                  hint: 'Revisit c11_biotech_cbse_07_005 (RNA Splicing) to see how introns are removed, and.',
                  misconception: 'Students often think reverse transcriptase *alone* makes double-stranded cDNA.' }
          ],
            remediations: { 'reverse-transcriptase-alone-makes-double': { steps: ['Re-watch the two-stage animation: (a) first-strand synthesis with reverse transcriptase + oligo-dT + dNTPs + RNase.', 'Write the enzyme name *and* its substrate/product for each stage on a flashcard.', 'Re-attempt Diagnostic Question 3 — if you still attribute low yield to "enzyme denaturation," re-read the RNase.', 'Confirm you can explain why *E.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_006', difficulty: 'standard',
          question: 'Polymerase Chain Reaction (PCR) is an in vitro enzymatic technique for.',
          hint: 'Revisit c11_biotech_cbse_12_005 (Class 11 PCR basics) and c11_chem_cbse_04_010 (hydrogen.',
          misconception: 'Students believe the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced.',
          parts: [
                { id: 'a', prompt: 'What is the theoretical number of copies of a target DNA sequence after 30 PCR cycles if you start with a single double-stranded DNA molecule?', answer: 'Correct answer: 2³⁰ = 1,073,741,824 copies (≈ 1.07 × 10⁹)',
                  options: ['Correct answer: 2³⁰ = 1,073,741,824 copies (≈ 1.07 × 10⁹)', 'the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (Class 11 PCR basics) and c11_chem_cbse_04_010 (hydrogen bonding).',
                  misconception: 'Students believe the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced.' },
                { id: 'b', prompt: 'Explain why the annealing temperature in PCR is typically set 3–5°C below the melting temperature (Tm) of the primers, rather than exactly at the Tm.', answer: 'Correct explanation: At Tm, 50% of primer-template duplexes are dissociated',
                  options: ['Correct explanation: At Tm, 50% of primer-template duplexes are dissociated', 'lower temperature makes primers bind faster', 'the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (Class 11 PCR basics) and c11_chem_cbse_04_010 (hydrogen bonding).',
                  misconception: 'Students believe the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced.' },
                { id: 'c', prompt: 'A student sets up a PCR with 10 ng of a 2 kb plasmid as template. After 25 cycles, they calculate the expected amplicon mass using N = N₀ × 2ⁿ and get 335 µg.', answer: 'Correct reasons: (1) Reagent limitation',
                  options: ['Correct reasons: (1) Reagent limitation', 'contamination', 'wrong temperature', 'the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (Class 11 PCR basics) and c11_chem_cbse_04_010 (hydrogen bonding).',
                  misconception: 'Students believe the PCR formula N = N₀ × 2ⁿ gives the *mass* of DNA produced.' }
          ],
            remediations: { 'the-pcr-formula-n-n': { steps: ['If a student confuses mass with copy number: (1) Have them calculate the molecular weight of a 500 bp amplicon: 500.', '(2) Convert 1 ng to molecules: (1 × 10⁻⁹ g) / (325,000 g/mol) × 6.022 × 10²³ = 1.85 × 10⁹ molecules.', '(3) Apply N = N₀ × 2ⁿ for n=10: 1.85 × 10⁹ × 1024 = 1.9 × 10¹² molecules.', '(4) Convert back to mass: (1.9 × 10¹²) / (6.022 × 10²³) × 325,000 g = 1.03 µg.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
