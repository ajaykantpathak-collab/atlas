import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch02_p1: SimDef = {
    id: 'v3_c11_biotech_ch02_p1',
    title: 'Cellular Organelles · Part 1/2',
    subtitle: 'Tour organelles — nucleus to lysosome — and connect each structure to its cellular job.',
    classLevel: 11, subject: 'biotechnology', topic: 'Cellular Organelles · Part 1/2',
    chapters: ['c11_biotech_ch02'],
    nodeIds: ['c11_biotech_cbse_02_001', 'c11_biotech_cbse_02_002', 'c11_biotech_cbse_02_003', 'c11_biotech_cbse_02_004', 'c11_biotech_cbse_02_005', 'c11_biotech_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cell biologist explaining a tissue sample to a pathology lab', intro: 'Every cell is running a supply chain you\'re about to audit.', goal: 'Identify organelles, state their functions, and explain structural specialisation across cell types.' },
    discovery: {
        question: 'A cell\'s mitochondria are called \'powerhouses\', yet a sperm cell packs most of them in its midpiece while a leaf cell invests in chloroplasts instead. What principle explains this customisation?',
        options: ['Organelle distribution reflects each cell\'s function — structure is fitted to the job', 'All cells contain identical organelles in identical positions', 'Sperm cells make chloroplasts that later convert to mitochondria', 'Organelle position is random and fixed at fertilisation'],
        answer: 'Organelle distribution reflects each cell\'s function — structure is fitted to the job',
        hook: 'Cells aren\'t generic bags of parts — every organelle\'s size and placement is a budget decision about function.',
    },
    teaching: [
        { title: 'Prokaryotic vs Eukaryotic Cells: Structural Comparison', text: 'Prokaryotic cells are defined by the absence of a true membrane-bound nucleus and membrane-bound organelles, with genetic material organized in a nucleoid region, while eukaryotic cells possess.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_02_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Dissect a eukaryotic cell virtually and justify why each organelle sits where it does and does what it does.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_001', title: 'Prokaryotic vs Eukaryotic Cells: Structural Comparison',
          caseStudy: { intro: 'Imagine you are a forensic biotechnologist examining two unknown microscopic samples: one from a yogurt culture (Lactobacillus) and another from a human cheek.',
            decisions: [{ prompt: 'A student observes a cell under an electron microscope and notes: (1) genetic material in a nucleoid region, (2) 70S ribosomes, (3) a cell.', options: [
                { text: 'The cell is prokaryotic (bacterial)', outcome: 'The cell is prokaryotic (bacterial). The four confirming features are: (1) nucleoid region lacking.' },
                { text: 'prokaryotes lack ribosomes', outcome: 'Not quite — Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes".', reveals: 'prokaryotes-lack-ribosomes-or-prokaryotes' },
                { text: 'prokaryotes have 80S ribosomes', outcome: 'Not quite — Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes".', reveals: 'prokaryotes-lack-ribosomes-or-prokaryotes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_002', title: 'Cell Membrane: Fluid Mosaic Model',
          caseStudy: { intro: 'Imagine you are a security guard at a high-tech research facility in Bangalore.',
            decisions: [{ prompt: 'State the two main structural components of the plasma membrane according to the Fluid Mosaic Model and their approximate percentage.', options: [
                { text: 'The two main components are lipids (~40%) and proteins (~52%) in human erythrocyte', outcome: 'The two main components are lipids (~40%) and proteins (~52%) in human erythrocyte membrane.' },
                { text: 'phospholipids and cholesterol', outcome: 'Not quite — Students believe "fluid mosaic" means proteins float freely like icebergs in a sea of lipids.', reveals: 'fluid-mosaic-means-proteins-float' },
                { text: 'fluid mosaic', outcome: 'Not quite — Students believe "fluid mosaic" means proteins float freely like icebergs in a sea of lipids.', reveals: 'fluid-mosaic-means-proteins-float' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_003', title: 'Cell Wall: Structure and Function',
          caseStudy: { intro: 'Imagine you are a plant cell in a rain-soaked field – water floods into your cytoplasm by osmosis. An animal cell would swell and burst, but you survive. Why?',
            decisions: [{ prompt: 'State the primary structural polysaccharide in the cell wall of (a) higher plants, (b) fungi, and (c) Gram-positive bacteria.', options: [
                { text: '(a) Cellulose (β-1,4-linked D-glucose), (b) Chitin (β-1,4-linked N-acetylglucosamine),', outcome: '(a) Cellulose (β-1,4-linked D-glucose), (b) Chitin (β-1,4-linked N-acetylglucosamine), (c).' },
                { text: 'chitin for plants', outcome: 'Not quite — Students often treat the cell wall as a static, uniform "brick wall" and assume all plant cells.', reveals: 'students-often-treat-the-cell' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_004', title: 'Endoplasmic Reticulum: Rough and Smooth ER',
          caseStudy: { intro: 'Imagine a bustling factory where raw materials enter, get processed on assembly lines, and are packaged for shipping. In a cell, the ER is that factory floor.',
            decisions: [{ prompt: 'State the defining structural difference between Rough Endoplasmic Reticulum (RER) and Smooth Endoplasmic Reticulum (SER) visible under.', options: [
                { text: 'The defining structural difference is the presence of ribosomes attached to the cytosolic', outcome: 'The defining structural difference is the presence of ribosomes attached to the cytosolic surface.' },
                { text: 'RER has more cisternae', outcome: 'Not quite — Students often believe that ribosomes are permanently "glued" to the Rough ER, making RER.', reveals: 'ribosomes-are-permanently-glued-to' },
                { text: 'SER is closer to the nucleus', outcome: 'Not quite — Students often believe that ribosomes are permanently "glued" to the Rough ER, making RER.', reveals: 'ribosomes-are-permanently-glued-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_005', title: 'Golgi Apparatus: Structure and Function',
          caseStudy: { intro: 'Imagine a busy post office where parcels (proteins) arrive from a factory (rough ER), get sorted, labeled with destination tags (sugar chains), repackaged, and.',
            decisions: [{ prompt: 'Name the scientist who discovered the Golgi apparatus and state the year of discovery.', options: [
                { text: 'Camillo Golgi discovered the Golgi apparatus in 1898', outcome: 'Camillo Golgi discovered the Golgi apparatus in 1898. A wrong answer (e.g., "George Palade".' },
                { text: 'George Palade', outcome: 'Not quite — Students often believe the Golgi apparatus *synthesizes* proteins and lipids because textbooks call.', reveals: 'the-golgi-apparatus-synthesizes-proteins' },
                { text: 'packaging and dispatch', outcome: 'Not quite — Students often believe the Golgi apparatus *synthesizes* proteins and lipids because textbooks call.', reveals: 'the-golgi-apparatus-synthesizes-proteins' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_006', title: 'Lysosomes: Structure and Role in Digestion',
          caseStudy: { intro: 'Imagine a white blood cell engulfing a bacterium – how does the cell destroy the invader without digesting itself?',
            decisions: [{ prompt: 'What is the optimal pH range for lysosomal hydrolytic enzymes, and which membrane protein maintains this pH?', options: [
                { text: 'Optimal pH is 4.5–5.0, maintained by V‑type H⁺‑ATPase (proton pump) that actively', outcome: 'Optimal pH is 4.5–5.0, maintained by V‑type H⁺‑ATPase (proton pump) that actively transports H⁺.' },
                { text: 'Na⁺/K⁺ pump', outcome: 'Not quite — Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.', reveals: 'lysosomes-are-suicide-bags-that' },
                { text: 'suicide bags', outcome: 'Not quite — Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.', reveals: 'lysosomes-are-suicide-bags-that' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Cellular Organelles · Part 1/2', spots: [
            { id: 's1', label: 'Prokaryotic vs Eukaryotic Cells Structural Comparison', prompt: 'Which idea is this? — Prokaryotic cells are defined by the absence of a true membrane-bound nucleus and.', answer: 'Prokaryotic vs Eukaryotic Cells Structural Comparison', options: ['Prokaryotic vs Eukaryotic Cells Structural Comparison', 'Cell Membrane Fluid Mosaic Model', 'Cell Wall Structure and Function', 'Endoplasmic Reticulum Rough and Smooth ER'] },
            { id: 's2', label: 'Cell Membrane Fluid Mosaic Model', prompt: 'Which idea is this? — The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid.', answer: 'Cell Membrane Fluid Mosaic Model', options: ['Cell Membrane Fluid Mosaic Model', 'Prokaryotic vs Eukaryotic Cells Structural Comparison', 'Cell Wall Structure and Function', 'Endoplasmic Reticulum Rough and Smooth ER'] },
            { id: 's3', label: 'Cell Wall Structure and Function', prompt: 'Which idea is this? — The cell wall is a rigid, dynamic extracellular matrix surrounding the plasma membrane.', answer: 'Cell Wall Structure and Function', options: ['Cell Wall Structure and Function', 'Prokaryotic vs Eukaryotic Cells Structural Comparison', 'Cell Membrane Fluid Mosaic Model', 'Endoplasmic Reticulum Rough and Smooth ER'] },
            { id: 's4', label: 'Endoplasmic Reticulum Rough and Smooth ER', prompt: 'Which idea is this? — The endoplasmic reticulum (ER) is an extensive, interconnected network of membrane-bound.', answer: 'Endoplasmic Reticulum Rough and Smooth ER', options: ['Endoplasmic Reticulum Rough and Smooth ER', 'Prokaryotic vs Eukaryotic Cells Structural Comparison', 'Cell Membrane Fluid Mosaic Model', 'Cell Wall Structure and Function'] },
            { id: 's5', label: 'Golgi Apparatus Structure and Function', prompt: 'Which idea is this? — The Golgi apparatus is a membrane-bound eukaryotic organelle composed of a stack.', answer: 'Golgi Apparatus Structure and Function', options: ['Golgi Apparatus Structure and Function', 'Prokaryotic vs Eukaryotic Cells Structural Comparison', 'Cell Membrane Fluid Mosaic Model', 'Cell Wall Structure and Function'] },
            { id: 's6', label: 'Lysosomes Structure and Role in Digestion', prompt: 'Which idea is this? — Lysosomes are single-membrane-bound spherical organelles (0.2–0.5 µm in diameter) formed.', answer: 'Lysosomes Structure and Role in Digestion', options: ['Lysosomes Structure and Role in Digestion', 'Prokaryotic vs Eukaryotic Cells Structural Comparison', 'Cell Membrane Fluid Mosaic Model', 'Cell Wall Structure and Function'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a lab internship you\'re handed an electron micrograph of an unknown cell. You observe: a double-membrane nucleus with pores, mitochondria with cristae — and inside one organelle, 70S ribosomes. Your lab partner declares it prokaryotic: \'70S ribosomes = prokaryote, textbook rule.\'',
            decisions: [{ prompt: 'Prokaryote or eukaryote — and what settles it?', options: [
                { text: 'Eukaryote — a membrane-bound nucleus and mitochondria are decisive; the 70S ribosomes are inside chloroplasts/mitochondria, which is expected since those organelles carry their own prokaryote-type ribosomes. What matters is the cytoplasmic ribosome type (80S) plus a true nucleus.', outcome: 'Ribosome size must be read with location: organellar 70S ribosomes don\'t make a eukaryotic cell prokaryotic.' },
                { text: 'Prokaryote — 70S ribosomes are a standalone diagnostic marker; one feature is enough.', outcome: '70S ribosomes also live inside eukaryotic mitochondria and chloroplasts; classification rests on compartmentalisation (nucleus, organelles), not a single number.', reveals: '70s-ribosome-means-prokaryote' },
                { text: 'Can\'t be decided — micrographs only show size, never internal structure.', outcome: 'Electron micrographs resolve membranes, cristae and nuclear pores precisely; refusing to read structural evidence abandons the actual diagnostic criteria.', reveals: 'microscopy-shows-only-size' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Once you read organelles as a division of labour, the cell stops being a diagram and becomes a city.',
            decisions: [{ prompt: 'What comes next? Cellular Organelles · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cellular Organelles · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_001', difficulty: 'standard',
          question: 'Prokaryotic cells are defined by the absence of a true membrane-bound nucleus.',
          hint: 'Revisit Class 9 Biology Chapter 1 (c9_bio_ch1_5, c9_bio_ch1_6, c9_bio_ch1_9) for labeled.',
          misconception: 'Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes" because they memorize.',
          parts: [
                { id: 'a', prompt: 'A student observes a cell under an electron microscope and notes: (1) genetic material in a nucleoid region, (2) 70S ribosomes, (3) a cell wall containing.', answer: 'The cell is prokaryotic (bacterial)',
                  options: ['The cell is prokaryotic (bacterial)', 'prokaryotes lack ribosomes', 'prokaryotes have 80S ribosomes', 'eukaryotes = 80S, prokaryotes = 70S'],
                  hint: 'Revisit Class 9 Biology Chapter 1 (c9_bio_ch1_5, c9_bio_ch1_6, c9_bio_ch1_9) for labeled diagrams.',
                  misconception: 'Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes" because they memorize "eukaryotes = 80S.' },
                { id: 'b', prompt: 'Compare the nuclear envelope of a eukaryotic cell with the nucleoid region of a prokaryote across three parameters: membrane boundary, transport regulation.', answer: '| Parameter | Eukaryotic Nuclear Envelope | Prokaryotic Nucleoid |',
                  options: ['| Parameter | Eukaryotic Nuclear Envelope | Prokaryotic Nucleoid |', 'both have membranes', 'both separate transcription/translation', 'prokaryotes lack ribosomes'],
                  hint: 'Revisit Class 9 Biology Chapter 1 (c9_bio_ch1_5, c9_bio_ch1_6, c9_bio_ch1_9) for labeled diagrams.',
                  misconception: 'Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes" because they memorize "eukaryotes = 80S.' }
          ],
            remediations: { 'prokaryotes-lack-ribosomes-or-prokaryotes': { steps: ['If a student makes this error: (1) Show them a labeled EM of a plant cell highlighting cytoplasmic 80S ribosomes (free.', '(2) Ask: "Where are the 70S ribosomes located?', 'Are they in the cytoplasm or inside a double-membrane organelle?" (3) Reinforce: "Eukaryotic classification.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes" because they memorize.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The 9+2 microtubule arrangement in eukaryotic cilia/flagella and the 9+0 arrangement in prokaryotic flagella represent homologous.', answer: 'The claim is false',
                  options: ['The claim is false', 'prokaryotes lack ribosomes', 'prokaryotes have 80S ribosomes', 'eukaryotes = 80S, prokaryotes = 70S'],
                  hint: 'Revisit Class 9 Biology Chapter 1 (c9_bio_ch1_5, c9_bio_ch1_6, c9_bio_ch1_9) for labeled diagrams.',
                  misconception: 'Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes" because they memorize "eukaryotes = 80S.' },
                { id: 'b', prompt: 'Design a diagnostic flowchart (decision tree) with exactly 5 yes/no questions that a microscopist could use to classify an unknown cell as prokaryotic.', answer: '**Flowchart:** 1',
                  options: ['**Flowchart:** 1', 'prokaryotes lack ribosomes', 'prokaryotes have 80S ribosomes', 'eukaryotes = 80S, prokaryotes = 70S'],
                  hint: 'Revisit Class 9 Biology Chapter 1 (c9_bio_ch1_5, c9_bio_ch1_6, c9_bio_ch1_9) for labeled diagrams.',
                  misconception: 'Students often believe that "prokaryotes lack ribosomes" or "prokaryotes have 80S ribosomes" because they memorize "eukaryotes = 80S.' }
          ],
            remediations: { 'prokaryotes-lack-ribosomes-or-prokaryotes': { steps: ['If a student makes this error: (1) Show them a labeled EM of a plant cell highlighting cytoplasmic 80S ribosomes (free.', '(2) Ask: "Where are the 70S ribosomes located?', 'Are they in the cytoplasm or inside a double-membrane organelle?" (3) Reinforce: "Eukaryotic classification.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_002', difficulty: 'standard',
          question: 'The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid.',
          hint: 'If stuck, revisit Class 9 Chemistry Chapter 3 (Covalent Bonding) to review ester bond.',
          misconception: 'Students believe "fluid mosaic" means proteins float freely like icebergs in a sea of lipids, implying **unrestricted.',
          parts: [
                { id: 'a', prompt: 'A researcher treats red blood cells with an enzyme that cleaves oligosaccharide chains from membrane glycoproteins.', answer: 'cell-cell recognition, (',
                  options: ['cell-cell recognition, (', 'fluid mosaic'],
                  hint: 'If stuck, revisit Class 9 Chemistry Chapter 3 (Covalent Bonding) to review ester bond formation.',
                  misconception: 'Students believe "fluid mosaic" means proteins float freely like icebergs in a sea of lipids, implying **unrestricted lateral diffusion for.' },
                { id: 'b', prompt: 'Compare the energy source and directionality of transport for: (i) Na⁺-K⁺ pump, (ii) glucose-Na⁺ symporter (SGLT1), (iii) GLUT1 uniporter.', answer: '| Transporter | Energy Source | Direction | Transport Type |',
                  options: ['| Transporter | Energy Source | Direction | Transport Type |', 'ATP-driven', 'fluid mosaic'],
                  hint: 'If stuck, revisit Class 9 Chemistry Chapter 3 (Covalent Bonding) to review ester bond formation.',
                  misconception: 'Students believe "fluid mosaic" means proteins float freely like icebergs in a sea of lipids, implying **unrestricted lateral diffusion for.' }
          ],
            remediations: { 'fluid-mosaic-means-proteins-float': { steps: ['Show the student a single-particle tracking video (e.g., quantum dot-labeled receptors) where trajectories reveal.', 'Ask them to calculate the diffusion coefficient from mean squared displacement (MSD = 4Dt) for both cases.', 'Connect to the "fence and picket" model (Kusumi et al.): transmembrane proteins = pickets, actin cytoskeleton = fences.', 'Have them re-draw the fluid mosaic model adding actin filaments underneath and showing restricted protein zones—this.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_003', difficulty: 'standard',
          question: 'The cell wall is a rigid, dynamic extracellular matrix surrounding the plasma.',
          hint: 'If stuck, revisit Class 9 Biology node c9_bio_ch1_4 (Cell Wall: Structure and Function.',
          misconception: 'Students often treat the cell wall as a static, uniform "brick wall" and assume all plant cells have identical walls.',
          parts: [
                { id: 'a', prompt: 'State the primary structural polysaccharide in the cell wall of (a) higher plants, (b) fungi, and (c) Gram-positive bacteria.', answer: 'higher plants, (',
                  options: ['higher plants, (', 'chitin for plants'],
                  hint: 'If stuck, revisit Class 9 Biology node c9_bio_ch1_4 (Cell Wall: Structure and Function in Plant.',
                  misconception: 'Students often treat the cell wall as a static, uniform "brick wall" and assume all plant cells have identical walls.' }
          ],
            remediations: { 'students-often-treat-the-cell': { steps: ['If the student holds this misconception: (1) Show a time-lapse of pollen tube tip growth where wall composition shifts.', '(2) Have them stain onion epidermis sequentially with Calcofluor White (cellulose) and Ruthenium Red (pectin).', '(3) Ask: "If the wall were static, how could a pollen tube elongate at 1 µm/sec?" (4) Guide them to construct a concept.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_004', difficulty: 'standard',
          question: 'The endoplasmic reticulum (ER) is an extensive, interconnected network.',
          hint: 'Revisit c11_biotech_cbse_02_010 (Ribosomes: Structure and Protein Synthesis) to recall.',
          misconception: 'Students often believe that ribosomes are permanently "glued" to the Rough ER, making RER a distinct organelle separate.',
          parts: [
                { id: 'a', prompt: 'A student claims: "All proteins synthesized in a eukaryotic cell are made on the Rough ER." Explain why this statement is incorrect and describe the actual.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'free ribosomes make structural proteins only', 'all proteins go through ER'],
                  hint: 'Revisit c11_biotech_cbse_02_010 (Ribosomes: Structure and Protein Synthesis) to recall that.',
                  misconception: 'Students often believe that ribosomes are permanently "glued" to the Rough ER, making RER a distinct organelle separate from SER.' },
                { id: 'b', prompt: 'Compare the lipid composition of the ER membrane with the plasma membrane.', answer: 'Phospholipids are synthesized on the cytosolic leaflet of SER',
                  options: ['Phospholipids are synthesized on the cytosolic leaflet of SER', 'phospholipids diffuse through the cytoplasm', 'flip-flop occurs rapidly'],
                  hint: 'Revisit c11_biotech_cbse_02_010 (Ribosomes: Structure and Protein Synthesis) to recall that.',
                  misconception: 'Students often believe that ribosomes are permanently "glued" to the Rough ER, making RER a distinct organelle separate from SER.' }
          ],
            remediations: { 'ribosomes-are-permanently-glued-to': { steps: ['If a student holds this misconception: (1) Show a time-lapse video (or cartoon sequence) of a ribosome binding to the.', '(2) Have them calculate: if a typical secretory protein takes 2 minutes to synthesize and a ribosome binds every 10.', 'Emphasize dynamic equilibrium.', '(3) Ask them to redraw Fig.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_005', difficulty: 'standard',
          question: 'The Golgi apparatus is a membrane-bound eukaryotic organelle composed of.',
          hint: 'Revisit c11_biotech_cbse_02_004 (Endoplasmic Reticulum) focusing on the "Protein sorting.',
          misconception: 'Students often believe the Golgi apparatus *synthesizes* proteins and lipids because textbooks call it a "packaging and.',
          parts: [
                { id: 'a', prompt: 'Name the scientist who discovered the Golgi apparatus and state the year of discovery.', answer: 'Camillo Golgi discovered the Golgi apparatus in 1898',
                  options: ['Camillo Golgi discovered the Golgi apparatus in 1898', 'George Palade', 'packaging and dispatch'],
                  hint: 'Revisit c11_biotech_cbse_02_004 (Endoplasmic Reticulum) focusing on the "Protein sorting in higher.',
                  misconception: 'Students often believe the Golgi apparatus *synthesizes* proteins and lipids because textbooks call it a "packaging and dispatch" center.' },
                { id: 'b', prompt: 'A researcher treats cells with a drug that prevents vesicle fusion specifically at the cis face of the Golgi.', answer: 'the rough ER, (',
                  options: ['the rough ER, (', 'packaging and dispatch'],
                  hint: 'Revisit c11_biotech_cbse_02_004 (Endoplasmic Reticulum) focusing on the "Protein sorting in higher.',
                  misconception: 'Students often believe the Golgi apparatus *synthesizes* proteins and lipids because textbooks call it a "packaging and dispatch" center.' },
                { id: 'c', prompt: 'Compare the trafficking route and Golgi modifications of a lysosomal enzyme (e.g., acid hydrolase) versus a secreted protein (e.g., collagen).', answer: 'Both proteins enter the Golgi at the cis face',
                  options: ['Both proteins enter the Golgi at the cis face', 'packaging and dispatch'],
                  hint: 'Revisit c11_biotech_cbse_02_004 (Endoplasmic Reticulum) focusing on the "Protein sorting in higher.',
                  misconception: 'Students often believe the Golgi apparatus *synthesizes* proteins and lipids because textbooks call it a "packaging and dispatch" center.' }
          ],
            remediations: { 'the-golgi-apparatus-synthesizes-proteins': { steps: ['Ask the student to draw the secretory pathway: Ribosome → RER lumen → Transition vesicle → Cis-Golgi → Medial-Golgi →.', 'At each arrow, have them state: "What happens here?', 'Emphasize: Synthesis *only* at ribosome/RER.', 'Use the analogy: ER = kitchen (cooks food), Golgi = plating & labeling station (adds garnish, puts in correct takeout.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_006', difficulty: 'standard',
          question: 'Lysosomes are single-membrane-bound spherical organelles (0.2–0.5 µm.',
          hint: 'Revisit the Golgi apparatus node (c11_biotech_cbse_02_005) and focus on the "cis‑face.',
          misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Lysosomes are formed directly by budding from the rough endoplasmic reticulum." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'suicide bags', 'lysosomes are "suicide bags" that randomly rupture and kill the cell'],
                  hint: 'Revisit the Golgi apparatus node (c11_biotech_cbse_02_005) and focus on the "cis‑face.',
                  misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.' },
                { id: 'b', prompt: 'Compare and contrast heterophagy and autophagy in terms of (a) origin of material digested, (b) membrane dynamics, and (c) physiological trigger.', answer: 'origin of material digested, (',
                  options: ['origin of material digested, (', 'suicide bags', 'lysosomes are "suicide bags" that randomly rupture and kill the cell'],
                  hint: 'Revisit the Golgi apparatus node (c11_biotech_cbse_02_005) and focus on the "cis‑face.',
                  misconception: 'Students often think lysosomes are "suicide bags" that randomly rupture and kill the cell.' }
          ],
            remediations: { 'lysosomes-are-suicide-bags-that': { steps: ['Show an electron micrograph of a lysosome with intact membrane alongside a cytosol‑filled area; ask "What protects the.', 'Demonstrate with a simple graph: enzyme activity vs.', 'pH – peak at 4.5, near zero at 7.2.', 'Have the student list three features of the lysosomal membrane (glycocalyx, V‑ATPase, specific transporters) and.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
