import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch12_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch12_p2: SimDef = {
    id: 'v3_c11_biotech_ch12_p2',
    title: 'Tools and Techniques in Biotechnology · Part 2/2',
    subtitle: 'Chain together PCR, electrophoresis and blotting into one analysis pipeline.',
    classLevel: 11, subject: 'biotechnology', topic: 'Tools and Techniques in Biotechnology · Part 2/2',
    chapters: ['c11_biotech_ch12'],
    nodeIds: ['c11_biotech_cbse_12_007', 'c11_biotech_cbse_12_008', 'c11_biotech_cbse_12_009', 'c11_biotech_cbse_12_010', 'c11_biotech_cbse_12_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic technician building a DNA profile from a trace sample', intro: 'One hair, three tools, one answer: whose DNA is it?', goal: 'Explain the principle and use of PCR, gel electrophoresis, blotting and basic cloning tools.' },
    discovery: {
        question: 'A crime lab has a pinhead of DNA — far too little to test. Which technique lets them get enough material without ever \'growing\' a sample?',
        options: ['PCR — copying the DNA exponentially, doubling it every cycle', 'Gel electrophoresis, which multiplies fragments', 'Centrifugation, which concentrates DNA by spinning', 'Southern blotting, which clones DNA onto membrane'],
        answer: 'PCR — copying the DNA exponentially, doubling it every cycle',
        hook: 'PCR is a molecular photocopier: thirty doublings turn one strand into a billion.',
    },
    teaching: [
        { title: 'Restriction Enzymes: Types and Cleavage Patterns', text: 'Restriction enzymes (restriction endonucleases) are bacterial enzymes that recognize specific short palindromic DNA sequences (recognition sites) and cleave the phosphodiester backbone at or near.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_12_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Assemble a workflow — extract, amplify with PCR, separate on gel — to fingerprint a DNA sample.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_007', title: 'Restriction Enzymes: Types and Cleavage Patterns',
          caseStudy: { intro: 'Imagine you have a plasmid vector and a human insulin gene — both are circular DNA molecules.',
            decisions: [{ prompt: 'A student writes the recognition sequence for EcoRI as 5\'-GAATTC-3\' / 3\'-CTTAAG-5\'.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. A DNA palindrome means the 5\'→3\' sequence on one strand is identical.' },
                { text: 'palindrome', outcome: 'Not quite — Students believe that "sticky ends from different enzymes can ligate if they are both 5\'.', reveals: 'sticky-ends-from-different-enzymes' },
                { text: 'reverse complement', outcome: 'Not quite — Students believe that "sticky ends from different enzymes can ligate if they are both 5\'.', reveals: 'sticky-ends-from-different-enzymes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_008', title: 'Recombinant DNA Technology: Vectors and Cloning',
          caseStudy: { intro: 'Imagine you have identified a human insulin gene and want to produce it in bacteria for diabetic patients. Where do you begin?',
            decisions: [{ prompt: 'What are the three essential features a cloning vector must possess, and why is each critical for recombinant DNA technology?', options: [
                { text: 'The three essential features are: (1) Origin of replication (ori) – allows autonomous', outcome: 'The three essential features are: (1) Origin of replication (ori) – allows autonomous replication.' },
                { text: 'promoter', outcome: 'Not quite — Students believe that any plasmid with an antibiotic resistance gene can be used to clone any DNA.', reveals: 'any-plasmid-with-an-antibiotic' },
                { text: 'promoter" as essential', outcome: 'Not quite — Students believe that any plasmid with an antibiotic resistance gene can be used to clone any DNA.', reveals: 'any-plasmid-with-an-antibiotic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_009', title: 'Southern, Northern and Western Blotting Techniques',
          caseStudy: { intro: 'Imagine you are a forensic scientist trying to identify a suspect from a tiny blood stain at a crime scene.',
            decisions: [{ prompt: 'What is the fundamental principle that allows a Southern blot to detect a specific DNA sequence among thousands of fragments on a membrane?', options: [
                { text: 'The fundamental principle is complementary base pairing between a labeled single-stranded', outcome: 'The fundamental principle is complementary base pairing between a labeled single-stranded DNA probe.' },
                { text: 'antibody binding', outcome: 'Not quite — Students often believe that the "blot" refers to the gel staining step, and that.', reveals: 'the-blot-refers-to-the' },
                { text: 'size separation', outcome: 'Not quite — Students often believe that the "blot" refers to the gel staining step, and that.', reveals: 'the-blot-refers-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_010', title: 'DNA Sequencing: Sanger Method and Next-Generation Sequencing',
          caseStudy: { intro: 'Imagine you are a forensic scientist who found a single hair at a crime scene. You extract DNA but need to know its exact sequence to identify the person.',
            decisions: [{ prompt: 'What is the structural difference between a deoxynucleotide triphosphate (dNTP) and a dideoxynucleotide triphosphate (ddNTP) that makes.', options: [
                { text: 'A dNTP has a hydroxyl (-OH) group at the 3\' carbon of the deoxyribose sugar, while a', outcome: 'A dNTP has a hydroxyl (-OH) group at the 3\' carbon of the deoxyribose sugar, while a ddNTP has.' },
                { text: 'ddNTP lacks a phosphate group', outcome: 'Not quite — Students believe that in Sanger sequencing, the ddNTP is added **instead of** the dNTP at every.', reveals: 'in-sanger-sequencing' },
                { text: 'ddNTP has a different base', outcome: 'Not quite — Students believe that in Sanger sequencing, the ddNTP is added **instead of** the dNTP at every.', reveals: 'in-sanger-sequencing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_011', title: 'Cell Culture: Animal and Plant Cell Culture Techniques',
          caseStudy: { intro: 'Imagine you need to produce a life-saving monoclonal antibody for cancer treatment — you cannot extract it directly from patients in sufficient quantity.',
            decisions: [{ prompt: 'What is the primary function of fetal bovine serum (FBS) in animal cell culture media, and why is it typically used at 5-10% concentration.', options: [
                { text: 'FBS provides essential growth factors (PDGF, FGF, EGF), hormones (insulin, transferrin),', outcome: 'FBS provides essential growth factors (PDGF, FGF, EGF), hormones (insulin, transferrin), adhesion.' },
                { text: 'FBS is the carbon source', outcome: 'Not quite — Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading.', reveals: 'animal-cells-need-serum' },
                { text: 'higher percentage always increases growth', outcome: 'Not quite — Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading.', reveals: 'animal-cells-need-serum' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'Tools and Techniques in Biotechnology · Part 2/2', spots: [
            { id: 's1', label: 'Restriction Enzymes Types and Cleavage Patterns', prompt: 'Which idea is this? — Restriction enzymes (restriction endonucleases) are bacterial enzymes that recognize.', answer: 'Restriction Enzymes Types and Cleavage Patterns', options: ['Restriction Enzymes Types and Cleavage Patterns', 'Recombinant DNA Technology Vectors and Cloning', 'Southern Northern and Western Blotting Techniques', 'DNA Sequencing Sanger Method and Next-Generation Sequencing'] },
            { id: 's2', label: 'Recombinant DNA Technology Vectors and Cloning', prompt: 'Which idea is this? — Recombinant DNA technology is the process of joining DNA fragments from different sources.', answer: 'Recombinant DNA Technology Vectors and Cloning', options: ['Recombinant DNA Technology Vectors and Cloning', 'Restriction Enzymes Types and Cleavage Patterns', 'Southern Northern and Western Blotting Techniques', 'DNA Sequencing Sanger Method and Next-Generation Sequencing'] },
            { id: 's3', label: 'Southern Northern and Western Blotting Techniques', prompt: 'Which idea is this? — Southern, Northern, and Western blotting are molecular biology techniques used to detect.', answer: 'Southern Northern and Western Blotting Techniques', options: ['Southern Northern and Western Blotting Techniques', 'Restriction Enzymes Types and Cleavage Patterns', 'Recombinant DNA Technology Vectors and Cloning', 'DNA Sequencing Sanger Method and Next-Generation Sequencing'] },
            { id: 's4', label: 'DNA Sequencing Sanger Method and Next-Generation Sequencing', prompt: 'Which idea is this? — DNA sequencing is the process of determining the precise order of nucleotides (adenine.', answer: 'DNA Sequencing Sanger Method and Next-Generation Sequencing', options: ['DNA Sequencing Sanger Method and Next-Generation Sequencing', 'Restriction Enzymes Types and Cleavage Patterns', 'Recombinant DNA Technology Vectors and Cloning', 'Southern Northern and Western Blotting Techniques'] },
            { id: 's5', label: 'Cell Culture Animal and Plant Cell Culture Techniques', prompt: 'Which idea is this? — Cell culture is the laboratory technique of growing and maintaining animal or plant.', answer: 'Cell Culture Animal and Plant Cell Culture Techniques', options: ['Cell Culture Animal and Plant Cell Culture Techniques', 'Restriction Enzymes Types and Cleavage Patterns', 'Recombinant DNA Technology Vectors and Cloning', 'Southern Northern and Western Blotting Techniques'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_007', title: 'A real-world call',
          caseStudy: { intro: 'CRISPR can edit a human embryo to remove a deadly disease — the edit is permanent and passes to every descendant. The same technique could someday select height, eye colour, maybe intelligence.',
            decisions: [{ prompt: 'Is preventing disease worth opening the door to designing humans?', options: [
                { text: 'Yes — a child free of disease justifies the risk', outcome: 'The compassionate answer; \'the door\' isn\'t hypothetical — every precedent makes the next edit easier to justify.' },
                { text: 'No — germline edits are forever', outcome: 'The precautionary answer — mistakes propagate; but refusing also means watching children born with preventable suffering.' },
                { text: 'Yes for disease only — a hard legal line at enhancement', outcome: 'The boundary answer — draw the line where suffering ends and preference begins; the hard part is that line moves.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school lab gets three requests in one week: (a) image the 3D surface of a pollen grain, (b) visualise the internal membranes of a mitochondrion, (c) track a GFP-tagged protein moving in a living cell, and (d) see a 20 nm ribosome. A senior says: \'Use the compound light microscope at 1000× for everything — maximum zoom solves all of it.\'',
            decisions: [{ prompt: 'Which instrument for which job?', options: [
                { text: 'Pollen surface → SEM; mitochondrion interior → TEM; live GFP tracking → fluorescence/confocal. The ribosome is beyond light microscopy entirely: resolution is capped near ~200 nm by the wavelength of light, so 1000× magnification just enlarges blur — electrons\' tiny wavelength is what resolves 20 nm.', outcome: 'Choose by resolution and sample question, not zoom: magnification without resolving power reveals nothing new.' },
                { text: 'The senior is right — 1000× is more than enough for ribosomes since bigger magnification shows smaller things.', outcome: 'Magnification spreads the image; resolution sets the smallest distinguishable detail. Light physically cannot resolve 20 nm objects, whatever the zoom.', reveals: 'more-zoom-more-detail' },
                { text: 'Use TEM for everything including the living cell — highest resolution wins every time.', outcome: 'TEM needs fixed, sectioned, vacuum-compatible samples — a living cell dies in the beam; live tracking needs fluorescence microscopy even at lower resolution.', reveals: 'highest-resolution-always-best' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_011', title: 'You made it',
          caseStudy: { intro: 'The biotech toolbox is a relay: PCR makes enough, gels sort by size, and probes find the one you\'re hunting.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_007', difficulty: 'standard',
          question: 'Restriction enzymes (restriction endonucleases) are bacterial enzymes that.',
          hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands.',
          misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they.',
          parts: [
                { id: 'a', prompt: 'A student writes the recognition sequence for EcoRI as 5\'-GAATTC-3\' / 3\'-CTTAAG-5\'.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'palindrome', 'reverse complement', 'sticky ends from different enzymes can ligate if they are both 5\' overhangs'],
                  hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands with 5\'/3\'.',
                  misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they think EcoRI.' },
                { id: 'b', prompt: 'You are given two enzymes: Enzyme X (Type II, recognizes 5\'-GGCC-3\', cuts between G and C on both strands) and Enzyme Y (Type II, recognizes 5\'-CCGG-3\', cuts.', answer: 'The claim is false',
                  options: ['The claim is false', 'similar properties', 'sticky ends from different enzymes can ligate if they are both 5\' overhangs', 'same overhang type (5\'/3\')'],
                  hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands with 5\'/3\'.',
                  misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they think EcoRI.' },
                { id: 'c', prompt: 'A linear DNA fragment of 5.2 kb is digested with HindIII (5\'-AAGCTT-3\', cuts between the two A\'s) and yields three fragments of 2.1 kb, 1.8 kb, and 1.3 kb.', answer: 'HindIII sites: 2 (3 fragments → 2 cuts)',
                  options: ['HindIII sites: 2 (3 fragments → 2 cuts)', 'sticky ends from different enzymes can ligate if they are both 5\' overhangs', 'same overhang type (5\'/3\')', 'same overhang sequence'],
                  hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands with 5\'/3\'.',
                  misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they think EcoRI.' },
                { id: 'd', prompt: 'Compare the methylation sensitivity of EcoRI (5\'-GAATTC-3\') and MboI (5\'-GATC-3\') when digesting mammalian genomic DNA.', answer: 'MboI (GATC) is blocked by CpG methylation',
                  options: ['MboI (GATC) is blocked by CpG methylation', 'sticky ends from different enzymes can ligate if they are both 5\' overhangs', 'same overhang type (5\'/3\')', 'same overhang sequence'],
                  hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands with 5\'/3\'.',
                  misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they think EcoRI.' }
          ],
            remediations: { 'sticky-ends-from-different-enzymes': { steps: ['Have the student write the full double-stranded recognition sequence with cleavage arrows for two enzymes (e.g., EcoRI.', 'Have them write the exact single-stranded overhangs (5\'→3\') produced on each strand after cleavage.', 'Ask: "Can these two overhangs base-pair? Show the hydrogen bonds."', 'Demonstrate that AATT (EcoRI) cannot pair with GATC (BamHI) — no complementarity.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they.',
          parts: [
                { id: 'a', prompt: 'A researcher performs a restriction digest with EcoRI (5\'-G^AATTC-3\') at 37°C for 1 hour, then runs the products on an agarose gel.', answer: 'The conclusion is premature',
                  options: ['The conclusion is premature', 'sticky ends from different enzymes can ligate if they are both 5\' overhangs', 'same overhang type (5\'/3\')', 'same overhang sequence'],
                  hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands with 5\'/3\'.',
                  misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they think EcoRI.' },
                { id: 'b', prompt: 'Design a cloning strategy to insert a 1.8 kb PCR product (flanked by EcoRI and HindIII sites added via primers) into a 4.5 kb plasmid vector that has.', answer: 'digest conditions for vector and insert, (',
                  options: ['digest conditions for vector and insert, (', 'sticky ends from different enzymes can ligate if they are both 5\' overhangs', 'same overhang type (5\'/3\')', 'same overhang sequence'],
                  hint: 'Revisit c9_bio_ch1_5 (nucleus/DNA structure) and practice writing complementary strands with 5\'/3\'.',
                  misconception: 'Students believe that "sticky ends from different enzymes can ligate if they are both 5\' overhangs." For example, they think EcoRI.' }
          ],
            remediations: { 'sticky-ends-from-different-enzymes': { steps: ['Have the student write the full double-stranded recognition sequence with cleavage arrows for two enzymes (e.g., EcoRI.', 'Have them write the exact single-stranded overhangs (5\'→3\') produced on each strand after cleavage.', 'Ask: "Can these two overhangs base-pair? Show the hydrogen bonds."', 'Demonstrate that AATT (EcoRI) cannot pair with GATC (BamHI) — no complementarity.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_008', difficulty: 'standard',
          question: 'Recombinant DNA technology is the process of joining DNA fragments from.',
          hint: 'Review restriction enzyme types (Type II), palindromic sequences, and practice drawing.',
          misconception: 'Students believe that any plasmid with an antibiotic resistance gene can be used to clone any DNA fragment of any size.',
          parts: [
                { id: 'a', prompt: 'Compare blue-white screening and antibiotic resistance screening in terms of what each identifies, the genetic basis, and a scenario where you would prefer one.', answer: 'Antibiotic resistance screening identifies cells that have taken up ANY vector',
                  options: ['Antibiotic resistance screening identifies cells that have taken up ANY vector', 'ampicillin selects for recombinants'],
                  hint: 'Review restriction enzyme types (Type II), palindromic sequences, and practice drawing sticky ends.',
                  misconception: 'Students believe that any plasmid with an antibiotic resistance gene can be used to clone any DNA fragment of any size.' }
          ],
            remediations: { 'any-plasmid-with-an-antibiotic': { steps: ['If a student makes this error: (1) Have them list vector types with their maximum insert sizes in a table.', '(2) Give a problem: "Clone a 100 kb gene" — ask them to choose vector and justify.', '(3) Demonstrate blue-white screening conceptually: draw vector with lacZα and MCS, show insert disrupting it.', '(4) Ask: "If you plate on ampicillin only, what do blue and white colonies mean?" Force them to distinguish selection.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_009', difficulty: 'standard',
          question: 'Southern, Northern, and Western blotting are molecular biology techniques used.',
          hint: 'Revisit c11_biotech_cbse_12_006: Focus on the role of gel matrix pore size, electric.',
          misconception: 'Students often believe that the "blot" refers to the gel staining step, and that Southern/Northern/Western are just.',
          parts: [
                { id: 'a', prompt: 'You have a protein sample suspected to contain a 50 kDa phosphorylated kinase.', answer: 'gel type, (',
                  options: ['gel type, (', 'We add Southern stain to the gel to see DNA bands'],
                  hint: 'Revisit c11_biotech_cbse_12_006: Focus on the role of gel matrix pore size, electric field, and.',
                  misconception: 'Students often believe that the "blot" refers to the gel staining step, and that Southern/Northern/Western are just different stains for.' }
          ],
            remediations: { 'the-blot-refers-to-the': { steps: ['If a student holds this misconception: (1) Physically demonstrate or show a video of capillary transfer.', '(2) Use the mnemonic "SNoW DRoP": Southern = DNA, Northern = RNA, Western = Protein; then ask "What transfers?" – the.', '(3) Give a fill-in-the-blank flowchart: Electrophoresis → ______ → Hybridization/Detection.', 'The blank is "Blotting (Transfer)".'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_010', difficulty: 'standard',
          question: 'DNA sequencing is the process of determining the precise order of nucleotides.',
          hint: 'Revisit c11_biotech_cbse_12_005 (PCR) for polymerase extension mechanism and.',
          misconception: 'Students believe that in Sanger sequencing, the ddNTP is added **instead of** the dNTP at every position of that base.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'DNA sequencing is the process of determining the precise order of nucleotides (adenine,',
                  options: ['DNA sequencing is the process of determining the precise order of nucleotides (adenine,', 'Microscopy is the technical field of using microscopes to visualize structures or details', 'Centrifugation is a biophysical separation technique that uses centrifugal force', 'Spectrophotometry is an analytical technique that measures the amount of light absorbed'],
                  hint: 'Revisit c11_biotech_cbse_12_005 (PCR) for polymerase extension mechanism and.',
                  misconception: 'Students believe that in Sanger sequencing, the ddNTP is added **instead of** the dNTP at every position of that base (e.g., every A in the.' }
          ],
            remediations: { 'in-sanger-sequencing': { steps: ['Draw a single template strand with primer annealed.', 'Show 100 DNA polymerase molecules starting synthesis simultaneously.', 'Explain: "At the first A position, each polymerase has a 1% chance of grabbing ddATP (terminating) and 99% chance.', 'So ~1 molecule stops at position 1, ~1 at position 5, ~1 at position 12..." 3.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_011', difficulty: 'standard',
          question: 'Cell culture is the laboratory technique of growing and maintaining animal.',
          hint: 'If stuck, revisit c9_bio_ch1_4 (cell wall vs membrane) and c10_bio_cbse_02_007 (plant.',
          misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
          parts: [
                { id: 'a', prompt: 'A student prepares MS medium for plant tissue culture but forgets to add agar. The medium remains liquid after autoclaving.', answer: 'Without agar, the medium lacks a solid support matrix',
                  options: ['Without agar, the medium lacks a solid support matrix', 'nutrients not absorbed', 'animal cells need serum, plant cells need hormones', 'subculture'],
                  hint: 'If stuck, revisit c9_bio_ch1_4 (cell wall vs membrane) and c10_bio_cbse_02_007 (plant hormone.',
                  misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1) Assuming serum-free.' }
          ],
            remediations: { 'animal-cells-need-serum': { steps: ['Have student list all components of complete DMEM (glucose, amino acids, vitamins, salts, pyruvate) and ask "which can.', 'Show a time-lapse video of plant callus on auxin-rich vs cytokinin-rich media — visually demonstrate that the SAME.', 'Give a case study: "HEK293 cells adapted to serum-free media still require 8 recombinant supplements — identify which.', 'Assign a mini-review: compare somatic embryogenesis pathway (LEC1, LEC2, FUS3, ABI3 transcription factors).'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
