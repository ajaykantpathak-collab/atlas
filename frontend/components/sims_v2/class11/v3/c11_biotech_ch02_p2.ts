import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch02_p2: SimDef = {
    id: 'v3_c11_biotech_ch02_p2',
    title: 'Cellular Organelles · Part 2/2',
    subtitle: 'Tour organelles — nucleus to lysosome — and connect each structure to its cellular job.',
    classLevel: 11, subject: 'biotechnology', topic: 'Cellular Organelles · Part 2/2',
    chapters: ['c11_biotech_ch02'],
    nodeIds: ['c11_biotech_cbse_02_007', 'c11_biotech_cbse_02_008', 'c11_biotech_cbse_02_009', 'c11_biotech_cbse_02_010', 'c11_biotech_cbse_02_011', 'c11_biotech_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cell biologist explaining a tissue sample to a pathology lab', intro: 'Every cell is running a supply chain you\'re about to audit.', goal: 'Identify organelles, state their functions, and explain structural specialisation across cell types.' },
    discovery: {
        question: 'A cell\'s mitochondria are called \'powerhouses\', yet a sperm cell packs most of them in its midpiece while a leaf cell invests in chloroplasts instead. What principle explains this customisation?',
        options: ['Organelle distribution reflects each cell\'s function — structure is fitted to the job', 'All cells contain identical organelles in identical positions', 'Sperm cells make chloroplasts that later convert to mitochondria', 'Organelle position is random and fixed at fertilisation'],
        answer: 'Organelle distribution reflects each cell\'s function — structure is fitted to the job',
        hook: 'Cells aren\'t generic bags of parts — every organelle\'s size and placement is a budget decision about function.',
    },
    teaching: [
        { title: 'Mitochondria: Structure and ATP Synthesis', text: 'Mitochondria are double membrane-bound organelles in eukaryotic cells where the inner membrane forms cristae to increase surface area for oxidative phosphorylation; the matrix houses the TCA cycle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_02_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Dissect a eukaryotic cell virtually and justify why each organelle sits where it does and does what it does.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_007', title: 'Mitochondria: Structure and ATP Synthesis',
          caseStudy: { intro: 'Imagine a long-distance runner collapsing at the 35 km mark — their muscle cells have exhausted glycolytic ATP and now depend entirely on mitochondrial.',
            decisions: [{ prompt: 'State the two mitochondrial compartments where the TCA cycle enzymes and the electron transport chain complexes are respectively located.', options: [
                { text: 'Correct answer: TCA cycle enzymes are in the mitochondrial matrix', outcome: 'Correct answer: TCA cycle enzymes are in the mitochondrial matrix; electron transport chain.' },
                { text: 'mitochondria = ATP', outcome: 'Not quite — Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.', reveals: 'atp-is-synthesised-in-the' },
                { text: 'ATP is synthesised in the mitochondrial matrix', outcome: 'Not quite — Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.', reveals: 'atp-is-synthesised-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_008', title: 'Chloroplast: Structure and Photosynthesis',
          caseStudy: { intro: 'Imagine you\'re examining a spinach leaf under a transmission electron microscope at 50,000× magnification.',
            decisions: [{ prompt: 'Name the three distinct compartments created by the chloroplast membrane system and state which compartment contains the 70S ribosomes and.', options: [
                { text: 'The three compartments are: (1) intermembrane space (between outer and inner envelope', outcome: 'The three compartments are: (1) intermembrane space (between outer and inner envelope membranes).' },
                { text: 'chlorophyll is a single green pigment', outcome: 'Not quite — Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast.', reveals: 'chlorophyll-is-a-single-green' },
                { text: 'all thylakoids in a chloroplast are functionally identical', outcome: 'Not quite — Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast.', reveals: 'chlorophyll-is-a-single-green' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_009', title: 'Nucleus: Nuclear Envelope, Nucleolus and Chromatin',
          caseStudy: { intro: 'Imagine you are a customs officer at a busy international airport (the nuclear envelope) controlling what enters and leaves a secure government building (the.',
            decisions: [{ prompt: 'What are the three main structural components of the nuclear envelope, and which component is continuous with the rough endoplasmic.', options: [
                { text: 'The nuclear envelope consists of the outer nuclear membrane, inner nuclear membrane, and', outcome: 'The nuclear envelope consists of the outer nuclear membrane, inner nuclear membrane, and nuclear.' },
                { text: 'inner membrane is continuous with ER', outcome: 'Not quite — Students often believe the nuclear envelope completely disassembles during mitosis in all.', reveals: 'the-nuclear-envelope-completely-disassembles' },
                { text: 'the nuclear envelope completely disassembles during mitosis in all eukaryotes', outcome: 'Not quite — Students often believe the nuclear envelope completely disassembles during mitosis in all.', reveals: 'the-nuclear-envelope-completely-disassembles' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_010', title: 'Ribosomes: Structure and Protein Synthesis',
          caseStudy: { intro: 'Imagine a cell as a bustling factory where proteins are the products. The blueprints (mRNA) arrive from the nucleus, but where are the assembly lines?',
            decisions: [{ prompt: 'What are the two subunits of a eukaryotic 80S ribosome and their respective Svedberg values?', options: [
                { text: 'The eukaryotic 80S ribosome consists of a large 60S subunit and a small 40S subunit', outcome: 'The eukaryotic 80S ribosome consists of a large 60S subunit and a small 40S subunit.' },
                { text: 'Svedberg units are additive (30S + 50S = 80S)', outcome: 'Not quite — Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass.', reveals: 'svedberg-units-are-additive-30s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_011', title: 'Cytoskeleton: Microtubules, Microfilaments and Intermediate Filaments',
          caseStudy: { intro: 'Imagine a neutrophil chasing a bacterium through tissue — it must change shape rapidly, extend pseudopods, and squeeze through capillary walls.',
            decisions: [{ prompt: 'List the three major cytoskeletal filament types in eukaryotic cells, their approximate diameters in nanometers, and their primary protein.', options: [
                { text: 'Microtubules: 25 nm, α/β-tubulin heterodimers', outcome: 'Microtubules: 25 nm, α/β-tubulin heterodimers; Actin filaments (microfilaments): 6 nm, globular.' },
                { text: 'intermediate', outcome: 'Not quite — Students frequently confuse the diameter hierarchy: they remember "micro" in microtubules and.', reveals: 'students-frequently-confuse-the-diameter' },
                { text: '"intermediate" means intermediate in function rather than diameter', outcome: 'Not quite — Students frequently confuse the diameter hierarchy: they remember "micro" in microtubules and.', reveals: 'students-frequently-confuse-the-diameter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_012', title: 'Vacuoles and Peroxisomes',
          caseStudy: { intro: 'Imagine a wilted spinach leaf that becomes crisp after watering — what cellular change caused this?',
            decisions: [{ prompt: 'Name the membrane bounding the central vacuole in a mature plant cell and state its primary function in maintaining turgor pressure.', options: [
                { text: 'The membrane is the tonoplast', outcome: 'The membrane is the tonoplast; it regulates solute transport into the vacuole, lowering water.' },
                { text: 'plasma membrane', outcome: 'Not quite — Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes.".', reveals: 'peroxisomes-and-lysosomes-are-the' },
                { text: 'cell wall', outcome: 'Not quite — Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes.".', reveals: 'peroxisomes-and-lysosomes-are-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Cellular Organelles · Part 2/2', spots: [
            { id: 's1', label: 'Mitochondria Structure and ATP Synthesis', prompt: 'Which idea is this? — Mitochondria are double membrane-bound organelles in eukaryotic cells where the inner.', answer: 'Mitochondria Structure and ATP Synthesis', options: ['Mitochondria Structure and ATP Synthesis', 'Chloroplast Structure and Photosynthesis', 'Nucleus Nuclear Envelope Nucleolus and Chromatin', 'Ribosomes Structure and Protein Synthesis'] },
            { id: 's2', label: 'Chloroplast Structure and Photosynthesis', prompt: 'Which idea is this? — A chloroplast is a double-membrane-bound plastid containing chlorophyll pigments.', answer: 'Chloroplast Structure and Photosynthesis', options: ['Chloroplast Structure and Photosynthesis', 'Mitochondria Structure and ATP Synthesis', 'Nucleus Nuclear Envelope Nucleolus and Chromatin', 'Ribosomes Structure and Protein Synthesis'] },
            { id: 's3', label: 'Nucleus Nuclear Envelope Nucleolus and Chromatin', prompt: 'Which idea is this? — The nucleus is a double-membrane-bound organelle that houses the eukaryotic genome.', answer: 'Nucleus Nuclear Envelope Nucleolus and Chromatin', options: ['Nucleus Nuclear Envelope Nucleolus and Chromatin', 'Mitochondria Structure and ATP Synthesis', 'Chloroplast Structure and Photosynthesis', 'Ribosomes Structure and Protein Synthesis'] },
            { id: 's4', label: 'Ribosomes Structure and Protein Synthesis', prompt: 'Which idea is this? — Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal RNA (rRNA).', answer: 'Ribosomes Structure and Protein Synthesis', options: ['Ribosomes Structure and Protein Synthesis', 'Mitochondria Structure and ATP Synthesis', 'Chloroplast Structure and Photosynthesis', 'Nucleus Nuclear Envelope Nucleolus and Chromatin'] },
            { id: 's5', label: 'Vacuoles and Peroxisomes', prompt: 'Which idea is this? — Vacuoles are membrane-bound organelles (tonoplast) in plant, fungal, and some animal.', answer: 'Vacuoles and Peroxisomes', options: ['Vacuoles and Peroxisomes', 'Mitochondria Structure and ATP Synthesis', 'Chloroplast Structure and Photosynthesis', 'Nucleus Nuclear Envelope Nucleolus and Chromatin'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a lab internship you\'re handed an electron micrograph of an unknown cell. You observe: a double-membrane nucleus with pores, mitochondria with cristae — and inside one organelle, 70S ribosomes. Your lab partner declares it prokaryotic: \'70S ribosomes = prokaryote, textbook rule.\'',
            decisions: [{ prompt: 'Prokaryote or eukaryote — and what settles it?', options: [
                { text: 'Eukaryote — a membrane-bound nucleus and mitochondria are decisive; the 70S ribosomes are inside chloroplasts/mitochondria, which is expected since those organelles carry their own prokaryote-type ribosomes. What matters is the cytoplasmic ribosome type (80S) plus a true nucleus.', outcome: 'Ribosome size must be read with location: organellar 70S ribosomes don\'t make a eukaryotic cell prokaryotic.' },
                { text: 'Prokaryote — 70S ribosomes are a standalone diagnostic marker; one feature is enough.', outcome: '70S ribosomes also live inside eukaryotic mitochondria and chloroplasts; classification rests on compartmentalisation (nucleus, organelles), not a single number.', reveals: '70s-ribosome-means-prokaryote' },
                { text: 'Can\'t be decided — micrographs only show size, never internal structure.', outcome: 'Electron micrographs resolve membranes, cristae and nuclear pores precisely; refusing to read structural evidence abandons the actual diagnostic criteria.', reveals: 'microscopy-shows-only-size' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'Once you read organelles as a division of labour, the cell stops being a diagram and becomes a city.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_007', difficulty: 'standard',
          question: 'Mitochondria are double membrane-bound organelles in eukaryotic cells where the.',
          hint: 'Revisit Class 10 node c10_bio_cbse_01_007 (Respiration: Aerobic vs Anaerobic and Energy.',
          misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.',
          parts: [
                { id: 'a', prompt: 'State the two mitochondrial compartments where the TCA cycle enzymes and the electron transport chain complexes are respectively located, and name the membrane.', answer: 'Correct answer: TCA cycle enzymes are in the mitochondrial matrix',
                  options: ['Correct answer: TCA cycle enzymes are in the mitochondrial matrix', 'mitochondria = ATP', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_007 (Respiration: Aerobic vs Anaerobic and Energy Release).',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' },
                { id: 'b', prompt: 'In a transmission electron micrograph, you observe mitochondria with densely packed cristae in cardiac muscle cells and sparse cristae in adipocytes.', answer: 'Correct prediction: Cardiac muscle mitochondria have higher VO2 max',
                  options: ['Correct prediction: Cardiac muscle mitochondria have higher VO2 max', 'more mitochondria', 'cristae density', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_007 (Respiration: Aerobic vs Anaerobic and Energy Release).',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' }
          ],
            remediations: { 'atp-is-synthesised-in-the': { steps: ['Draw a side-by-side diagram of a bacterium and a mitochondrion, labeling DNA, ribosomes, and membrane respiratory.', 'Use a physical analogy — a hydroelectric dam: matrix = reservoir (high potential), intermembrane space = downstream.', 'Give a micrograph tracing exercise: outline cristae, calculate approximate surface area increase vs smooth membrane.', 'Assign a 3-minute write: "Explain why COX1 (mtDNA-encoded) cannot be imported from the cytosol like citrate synthase."'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.',
          parts: [
                { id: 'a', prompt: 'Critique this textbook statement: "Mitochondria are the powerhouse of the cell because they produce ATP." Evaluate its adequacy for a Class 11 biotechnology.', answer: 'Critique: The statement is functionally true but mechanistically empty',
                  options: ['Critique: The statement is functionally true but mechanistically empty', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_007 (Respiration: Aerobic vs Anaerobic and Energy Release).',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' },
                { id: 'b', prompt: 'Design a thought experiment: If you could engineer a mitochondrion without cristae (smooth inner membrane) but with the same total inner membrane surface area.', answer: 'Good answer: Efficiency would decrease',
                  options: ['Good answer: Efficiency would decrease', 'ATP is synthesised in the mitochondrial matrix'],
                  hint: 'Revisit Class 10 node c10_bio_cbse_01_007 (Respiration: Aerobic vs Anaerobic and Energy Release).',
                  misconception: 'Students believe ATP is synthesised in the mitochondrial matrix because the TCA cycle occurs there.' }
          ],
            remediations: { 'atp-is-synthesised-in-the': { steps: ['Draw a side-by-side diagram of a bacterium and a mitochondrion, labeling DNA, ribosomes, and membrane respiratory.', 'Use a physical analogy — a hydroelectric dam: matrix = reservoir (high potential), intermembrane space = downstream.', 'Give a micrograph tracing exercise: outline cristae, calculate approximate surface area increase vs smooth membrane.', 'Assign a 3-minute write: "Explain why COX1 (mtDNA-encoded) cannot be imported from the cytosol like citrate synthase."'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_008', difficulty: 'standard',
          question: 'A chloroplast is a double-membrane-bound plastid containing chlorophyll.',
          hint: 'Revisit c11_biotech_cbse_02_007 (Mitochondria) — specifically the cristae topology.',
          misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally.',
          parts: [
                { id: 'a', prompt: 'Compare the proton gradient topology in chloroplasts versus mitochondria. Specifically: (a) Which compartment becomes acidic in each organelle?', answer: 'Which compartment becomes acidic in each organelle?',
                  options: ['Which compartment becomes acidic in each organelle?', 'chlorophyll is a single green pigment', 'all thylakoids in a chloroplast are functionally identical'],
                  hint: 'Revisit c11_biotech_cbse_02_007 (Mitochondria) — specifically the cristae topology, proton pumping.',
                  misconception: 'Students believe "chlorophyll is a single green pigment" and that "all thylakoids in a chloroplast are functionally identical." This leads.' }
          ],
            remediations: { 'chlorophyll-is-a-single-green': { steps: ['Have the student perform paper chromatography of spinach extract — they will see 4-5 distinct bands (chlorophyll.', 'Use a fluorescence microscope with 440 nm excitation to show grana (PSII-rich) emit red fluorescence at 685 nm, while.', 'Demonstrate state transitions: expose chloroplasts to high light (PSII-favoring) → LHCII phosphorylates → moves.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_009', difficulty: 'standard',
          question: 'The nucleus is a double-membrane-bound organelle that houses the eukaryotic.',
          hint: 'If stuck, revisit c11_biotech_cbse_02_001 (prokaryote vs eukaryote nuclear organization).',
          misconception: 'Students often believe the nuclear envelope completely disassembles during mitosis in all eukaryotes.',
          parts: [
                { id: 'a', prompt: 'Explain why the nucleolus is not considered a membrane-bound organelle despite being a distinct subnuclear body.', answer: 'The nucleolus lacks a bounding membrane',
                  options: ['The nucleolus lacks a bounding membrane', 'it has a membrane', 'organelle', 'membrane-bound organelle'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_001 (prokaryote vs eukaryote nuclear organization) and.',
                  misconception: 'Students often believe the nuclear envelope completely disassembles during mitosis in all eukaryotes.' },
                { id: 'b', prompt: 'A researcher treats isolated nuclei with a low concentration of detergent that selectively dissolves the outer nuclear membrane but leaves the inner membrane.', answer: 'ribosome attachment to the nuclear envelope, (',
                  options: ['ribosome attachment to the nuclear envelope, (', 'the nuclear envelope completely disassembles during mitosis in all eukaryotes'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_001 (prokaryote vs eukaryote nuclear organization) and.',
                  misconception: 'Students often believe the nuclear envelope completely disassembles during mitosis in all eukaryotes.' },
                { id: 'c', prompt: 'Compare and contrast the protein composition and functional roles of the nuclear lamina and the nucleolar matrix.', answer: 'The nuclear lamina (A/C and B-type lamins) underlies the inner nuclear membrane,',
                  options: ['The nuclear lamina (A/C and B-type lamins) underlies the inner nuclear membrane,', 'the nuclear envelope completely disassembles during mitosis in all eukaryotes'],
                  hint: 'If stuck, revisit c11_biotech_cbse_02_001 (prokaryote vs eukaryote nuclear organization) and.',
                  misconception: 'Students often believe the nuclear envelope completely disassembles during mitosis in all eukaryotes.' }
          ],
            remediations: { 'the-nuclear-envelope-completely-disassembles': { steps: ['Show the student electron micrographs of dividing yeast (Saccharomyces) and human cells side-by-side.', 'Ask them to identify the nuclear envelope in each.', 'Guide them to observe that yeast nuclei remain enclosed while human nuclei fragment.', 'Then explain that the nuclear pore complex composition differs: yeast NPCs allow spindle microtubule insertion without.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_010', difficulty: 'standard',
          question: 'Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal.',
          hint: 'If stuck, revisit the prokaryotic vs eukaryotic cell comparison (c11_biotech_cbse_02_001).',
          misconception: 'Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass unit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal RNA (rRNA)',
                  options: ['Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal RNA (rRNA)', 'Prokaryotic cells are defined by the absence of a true membrane-bound nucleus and', 'The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid', 'The cell wall is a rigid, dynamic extracellular matrix surrounding the plasma membrane of'],
                  hint: 'If stuck, revisit the prokaryotic vs eukaryotic cell comparison (c11_biotech_cbse_02_001) and the.',
                  misconception: 'Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass unit.' }
          ],
            remediations: { 'svedberg-units-are-additive-30s': { steps: ['Show a video of sucrose gradient centrifugation — particles separate by sedimentation rate, not mass alone.', 'Use the analogy of a centrifuge separating sand (compact) vs. feathers (fluffy) of equal mass — shape matters.', 'Provide a table: Prokaryote 30S (16S rRNA + 21 proteins) + 50S (23S+5S rRNA + 34 proteins) = 70S; Eukaryote 40S (18S.', 'Ask student to calculate the "missing" S units (30+50=80 but observed 70; 40+60=100 but observed 80) and explain the.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_011', difficulty: 'standard',
          question: 'The cytoskeleton is a dynamic, three-dimensional network of fibrous proteins.',
          hint: 'Revisit c11_biotech_cbse_02_001 (prokaryotic vs eukaryotic cells) to reinforce that.',
          misconception: 'Students frequently confuse the diameter hierarchy: they remember "micro" in microtubules and microfilaments and assume.',
          parts: [
                { id: 'a', prompt: 'List the three major cytoskeletal filament types in eukaryotic cells, their approximate diameters in nanometers, and their primary protein subunits.', answer: 'Microtubules: 25 nm, α/β-tubulin heterodimers',
                  options: ['Microtubules: 25 nm, α/β-tubulin heterodimers', 'intermediate', '"intermediate" means intermediate in function rather than diameter'],
                  hint: 'Revisit c11_biotech_cbse_02_001 (prokaryotic vs eukaryotic cells) to reinforce that cytoskeleton.',
                  misconception: 'Students frequently confuse the diameter hierarchy: they remember "micro" in microtubules and microfilaments and assume microtubules are.' },
                { id: 'b', prompt: 'A researcher treats cultured fibroblasts with 10 μM nocodazole (microtubule depolymerizing agent) and 1 μM latrunculin B (actin monomer sequestering agent).', answer: 'organelle positioning, (',
                  options: ['organelle positioning, (', 'intermediate', '"intermediate" means intermediate in function rather than diameter'],
                  hint: 'Revisit c11_biotech_cbse_02_001 (prokaryotic vs eukaryotic cells) to reinforce that cytoskeleton.',
                  misconception: 'Students frequently confuse the diameter hierarchy: they remember "micro" in microtubules and microfilaments and assume microtubules are.' },
                { id: 'c', prompt: 'Compare the roles of microtubules, actin filaments, and intermediate filaments during the stages of animal cell mitosis (prophase through.', answer: 'Prophase: Microtubules form mitotic spindle (centrosome separation)',
                  options: ['Prophase: Microtubules form mitotic spindle (centrosome separation)', 'intermediate', '"intermediate" means intermediate in function rather than diameter'],
                  hint: 'Revisit c11_biotech_cbse_02_001 (prokaryotic vs eukaryotic cells) to reinforce that cytoskeleton.',
                  misconception: 'Students frequently confuse the diameter hierarchy: they remember "micro" in microtubules and microfilaments and assume microtubules are.' }
          ],
            remediations: { 'students-frequently-confuse-the-diameter': { steps: ['Have the student create a three-column table with headers "Filament," "Diameter (nm)," "Subunit."', 'Use a mnemonic: "Microtubules are MIGHTY (25 nm), Intermediate are IN-BETWEEN (10 nm), Microfilaments are MINI (6 nm)."', 'Physically model with string: thick rope (microtubule), medium cord (intermediate), thin thread (actin).', 'Practice predicting which drug (nocodazole/latrunculin/withaferin A) disrupts which structure until the.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_012', difficulty: 'standard',
          question: 'Vacuoles are membrane-bound organelles (tonoplast) in plant, fungal, and some.',
          hint: 'Revisit ER-derived vesicle formation (c11_biotech_cbse_02_004) and the endomembrane.',
          misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer.',
          parts: [
                { id: 'a', prompt: 'Name the membrane bounding the central vacuole in a mature plant cell and state its primary function in maintaining turgor pressure.', answer: 'The membrane is the tonoplast',
                  options: ['The membrane is the tonoplast', 'plasma membrane', 'cell wall', 'vesicles with enzymes'],
                  hint: 'Revisit ER-derived vesicle formation (c11_biotech_cbse_02_004) and the endomembrane system concept.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' },
                { id: 'b', prompt: 'A student claims: "Peroxisomes are like mitochondria because both produce ATP from oxidative reactions." Explain why this is incorrect using two specific.', answer: 'Peroxisomes do not produce ATP',
                  options: ['Peroxisomes do not produce ATP', 'oxidative reactions', 'ATP synthesis', 'vesicles with enzymes'],
                  hint: 'Revisit ER-derived vesicle formation (c11_biotech_cbse_02_004) and the endomembrane system concept.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' },
                { id: 'c', prompt: 'In a germinating oil-rich seed (e.g., castor), glyoxysomes convert stored triglycerides to glucose.', answer: 'Glyoxysomes: fatty acids → acetyl-CoA → glyoxylate cycle → succinate',
                  options: ['Glyoxysomes: fatty acids → acetyl-CoA → glyoxylate cycle → succinate', 'vesicles with enzymes', 'Peroxisomes digest waste like lysosomes', 'peroxisomes and lysosomes are the same'],
                  hint: 'Revisit ER-derived vesicle formation (c11_biotech_cbse_02_004) and the endomembrane system concept.',
                  misconception: 'Students think peroxisomes and lysosomes are the same because both are "vesicles with enzymes." They answer: "Peroxisomes digest waste like.' }
          ],
            remediations: { 'peroxisomes-and-lysosomes-are-the': { steps: ['Draw a two-column table: left column "Peroxisome", right column "Lysosome".', 'Fill rows: Enzyme type (oxidases/catalase vs.', 'acid hydrolases), pH optimum (neutral vs.', 'acidic ~4.5), Function (metabolism/detoxification vs.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
