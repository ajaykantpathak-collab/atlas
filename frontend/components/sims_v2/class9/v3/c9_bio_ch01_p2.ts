import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch01_p2: SimDef = {
    id: 'v3_c9_bio_ch01_p2',
    title: 'The Fundamental Unit of Life: Cell · Part 2/2',
    subtitle: 'Empty rooms vs. swimming animalcules',
    classLevel: 9, subject: 'biology', topic: 'The Fundamental Unit of Life: Cell · Part 2/2',
    chapters: ['c9_bio_ch01'],
    nodeIds: ['c9_bio_ch1_4', 'c9_bio_ch1_5', 'c9_bio_ch1_6', 'c9_bio_ch1_7', 'c9_bio_ch1_8', 'c9_bio_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a microscope pioneer', intro: 'Cork under a weak lens shows little boxes; pond water under a great lens shows tiny swimmers. Put yourself in 1665 and decide what actually counts as \'discovering the cell.\'', goal: 'Understand how Hooke (dead cork walls, coined \'cell\') and Leeuwenhoek (living microorganisms) jointly revealed the cell as life\'s structural and functional unit.' },
    discovery: {
        question: 'Robert Hooke \'discovered the cell\' in 1665 — but the cork he looked at was dead, showing only empty walls. So who first saw a cell that was actually alive?',
        options: ['Leeuwenhoek — his sharper single lens revealed swimming \'animalcules\' in rainwater, proving these little rooms could be living units', 'Hooke himself — he saw living cells too', 'Nobody — cells weren\'t seen alive until electron microscopes', 'Schleiden — he discovered plant cells'],
        answer: 'Leeuwenhoek — his sharper single lens revealed swimming \'animalcules\' in rainwater, proving these little rooms could be living units',
        hook: 'Hooke named the \'cell\' but only ever saw the walls — like finding an empty building. It took Leeuwenhoek\'s superior lens to spot the occupants: living, moving microbes. Structure + life = the real discovery.',
    },
    teaching: [
        { title: 'Cell Wall: Structure and Function in Plant Cells', text: 'The cell wall is a rigid, non-living extracellular matrix composed primarily of cellulose microfibrils embedded in a matrix of hemicellulose and pectin, located external to the plasma membrane.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch1_4', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Replay both discoveries in a school lab: stain onion peel to see Hooke\'s walled compartments, then mount fresh pond water to meet Leeuwenhoek\'s moving animalcules — and argue who deserves the credit.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch1_5', title: 'Nucleus: Structure and Functions',
          caseStudy: { intro: 'Look at an onion root tip cell under a compound microscope — you see a distinct dark spherical structure at the center that takes up stain intensely.',
            decisions: [{ prompt: 'Define the term "nuclear pore complex" and state its primary function in a eukaryotic cell.', options: [
                { text: 'The nuclear pore complex (NPC) is a large protein assembly embedded in the nuclear', outcome: 'The nuclear pore complex (NPC) is a large protein assembly embedded in the nuclear envelope that.' },
                { text: 'pores let anything pass freely', outcome: 'Not quite — Students believe the nuclear envelope is a static double membrane like the cell membrane, and that.', reveals: 'the-nuclear-envelope-is-a' },
                { text: 'pores are only in plant cells', outcome: 'Not quite — Students believe the nuclear envelope is a static double membrane like the cell membrane, and that.', reveals: 'the-nuclear-envelope-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_6', title: 'Cytoplasm and Cell Organelles: Overview',
          caseStudy: { intro: 'Imagine you are watching a busy kitchen in a large Indian restaurant during lunch hour: the counter space (cytoplasm) holds all the appliances (organelles).',
            decisions: [{ prompt: 'What is the composition of cytoplasm, and how does it differ from the nucleoplasm inside the nucleus?', options: [
                { text: 'Cytoplasm is composed of cytosol (water, dissolved ions, soluble proteins), organelles,', outcome: 'Cytoplasm is composed of cytosol (water, dissolved ions, soluble proteins), organelles, inclusions.' },
                { text: 'cytoplasm is just the fluid part', outcome: 'Not quite — Students often think cytoplasm is a passive, uniform jelly where organelles float aimlessly like.', reveals: 'cytoplasm-is-a-passive' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_7', title: 'Endoplasmic Reticulum: Smooth and Rough Types',
          caseStudy: { intro: 'Imagine you\'re watching a factory assembly line where raw materials enter, get processed, packaged, and shipped to different destinations.',
            decisions: [{ prompt: 'Name the two types of endoplasmic reticulum and state the key structural feature that distinguishes them visually under an electron.', options: [
                { text: 'The two types are rough endoplasmic reticulum (RER) and smooth endoplasmic reticulum (SER)', outcome: 'The two types are rough endoplasmic reticulum (RER) and smooth endoplasmic reticulum (SER).' },
                { text: 'RER has DNA, SER doesn\'t', outcome: 'Not quite — Students believe rough ER and smooth ER are completely separate organelles that don\'t communicate.', reveals: 'rough-er-and-smooth-er' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_8', title: 'Golgi Apparatus: Structure and Functions',
          caseStudy: { intro: 'Imagine you order a custom-made kurta from a tailor in Delhi — the fabric (protein) is cut and stitched in the workshop (rough ER), but it needs buttons.',
            decisions: [{ prompt: 'What are the flattened membrane-bound sacs that make up the Golgi apparatus called, and how are they arranged?', options: [
                { text: 'The flattened sacs are called **cisternae**, and they are stacked parallel to each other', outcome: 'The flattened sacs are called **cisternae**, and they are stacked parallel to each other like.' },
                { text: 'tubules', outcome: 'Not quite — Students think **the Golgi apparatus "makes" proteins** because it\'s large and prominent.', reveals: 'the-golgi-apparatus-makes-proteins' },
                { text: 'randomly scattered sacs', outcome: 'Not quite — Students think **the Golgi apparatus "makes" proteins** because it\'s large and prominent.', reveals: 'the-golgi-apparatus-makes-proteins' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_9', title: 'Mitochondria: Powerhouse of the Cell',
          caseStudy: { intro: 'Observe how your thigh muscles burn during a long climb up stairs — that burning sensation signals your muscle cells are working hard and demanding massive.',
            decisions: [{ prompt: 'Name the two membranes of the mitochondrion and state one key structural difference between them.', options: [
                { text: 'The outer membrane is smooth and permeable to small molecules via porins', outcome: 'The outer membrane is smooth and permeable to small molecules via porins; the inner membrane.' },
                { text: 'both membranes are folded', outcome: 'Not quite — Students think "mitochondria produce energy" and write this in exams.', reveals: 'mitochondria-produce-energy-and-write' },
                { text: 'outer membrane has cristae', outcome: 'Not quite — Students think "mitochondria produce energy" and write this in exams.', reveals: 'mitochondria-produce-energy-and-write' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch1_5', title: 'Identify each idea',
          dissect: { specimen: 'The Fundamental Unit of Life: Cell · Part 2/2', spots: [
            { id: 's1', label: 'Cell Wall Structure and Function in Plant Cells', prompt: 'Which idea is this? — The cell wall is a rigid, non-living extracellular matrix composed primarily of cellulose.', answer: 'Cell Wall Structure and Function in Plant Cells', options: ['Cell Wall Structure and Function in Plant Cells', 'Nucleus Structure and Functions', 'Cytoplasm and Cell Organelles Overview', 'Endoplasmic Reticulum Smooth and Rough Types'] },
            { id: 's2', label: 'Nucleus Structure and Functions', prompt: 'Which idea is this? — The nucleus is a double-membrane-bound organelle that houses the genetic material (DNA.', answer: 'Nucleus Structure and Functions', options: ['Nucleus Structure and Functions', 'Cell Wall Structure and Function in Plant Cells', 'Cytoplasm and Cell Organelles Overview', 'Endoplasmic Reticulum Smooth and Rough Types'] },
            { id: 's3', label: 'Cytoplasm and Cell Organelles Overview', prompt: 'Which idea is this? — Cytoplasm is the semi-fluid, gel-like matrix (cytosol) enclosed by the cell membrane that.', answer: 'Cytoplasm and Cell Organelles Overview', options: ['Cytoplasm and Cell Organelles Overview', 'Cell Wall Structure and Function in Plant Cells', 'Nucleus Structure and Functions', 'Endoplasmic Reticulum Smooth and Rough Types'] },
            { id: 's4', label: 'Endoplasmic Reticulum Smooth and Rough Types', prompt: 'Which idea is this? — The endoplasmic reticulum (ER) is a network of membranous tubules and flattened sacs.', answer: 'Endoplasmic Reticulum Smooth and Rough Types', options: ['Endoplasmic Reticulum Smooth and Rough Types', 'Cell Wall Structure and Function in Plant Cells', 'Nucleus Structure and Functions', 'Cytoplasm and Cell Organelles Overview'] },
            { id: 's5', label: 'Golgi Apparatus Structure and Functions', prompt: 'Which idea is this? — The Golgi apparatus is a membrane-bound organelle consisting of flattened, stacked sacs.', answer: 'Golgi Apparatus Structure and Functions', options: ['Golgi Apparatus Structure and Functions', 'Cell Wall Structure and Function in Plant Cells', 'Nucleus Structure and Functions', 'Cytoplasm and Cell Organelles Overview'] },
            { id: 's6', label: 'Mitochondria Powerhouse of the Cell', prompt: 'Which idea is this? — Mitochondria are double-membrane-bound organelles that serve as the site of aerobic.', answer: 'Mitochondria Powerhouse of the Cell', options: ['Mitochondria Powerhouse of the Cell', 'Cell Wall Structure and Function in Plant Cells', 'Nucleus Structure and Functions', 'Cytoplasm and Cell Organelles Overview'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Preparing a science-museum label, a student drafts: \'In 1665 Hooke peered at cork and saw living cells at work — the moment we discovered the living unit of life.\' The curator asks him to check it against what each pioneer actually saw.',
            decisions: [{ prompt: 'What should the label say?', options: [
                { text: 'Split the credit: Hooke saw only the dead, empty walls of cork cells — the rooms, not the occupants — and coined the word \'cell\'; it was Leeuwenhoek\'s sharper single lens that later revealed living, moving animalcules, and only together did the two pictures become the living cell idea.', outcome: 'This assigns structure to Hooke and life to Leeuwenhoek — the distinction the history of cell theory rests on.' },
                { text: 'The draft is fine — whoever coined \'cell\' must have seen a living cell, since dead tissue has no cells.', outcome: 'Cork is dead tissue made of cells: the walls remained after the living contents decayed, so Hooke catalogued architecture, not life.', reveals: 'naming-is-seeing-life' },
                { text: 'Give Leeuwenhoek all the credit and remove Hooke — living things are what matter, so his discovery alone counts.', outcome: 'Erasing Hooke loses the structural concept; the cell idea needed both the named compartment and the living creature inside it.', reveals: 'leeuwenhoek-alone' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_9', title: 'You made it',
          caseStudy: { intro: 'The cell story needed two men: one who saw the architecture, one who saw it breathing. Cells are life\'s basic unit because they\'re both a structure AND a living process.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch1_4', difficulty: 'standard',
          question: 'The cell wall is a rigid, non-living extracellular matrix composed primarily.',
          hint: 'Review the plasmolysis and deplasmolysis observations from c9_bio_ch1_3, focusing on the.',
          misconception: 'Students believe the cell wall is a solid, impermeable barrier that completely blocks substance movement, and that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cell wall is a rigid, non-living extracellular matrix composed primarily of cellulose',
                  options: ['The cell wall is a rigid, non-living extracellular matrix composed primarily of cellulose', 'The discovery of the cell refers to the foundational observations by Robert Hooke (1665),', 'Plastids are double-membrane-bound, semi-autonomous organelles found exclusively in plant', 'A vacuole is a membrane-bound organelle filled with cell sap (a solution of water,'],
                  hint: 'Review the plasmolysis and deplasmolysis observations from c9_bio_ch1_3, focusing on the membrane\'s.',
                  misconception: 'Students believe the cell wall is a solid, impermeable barrier that completely blocks substance movement, and that plasmodesmata are simply.' }
          ],
            remediations: { 'the-cell-wall-is-a': { steps: ['Revisit the onion peel plasmolysis observation (c9_bio_ch1_3) — note the wall stays rectangular while the membrane.', 'Use a tea bag analogy — the bag (wall) holds shape and lets water/small molecules through, but the tea leaves (large.', 'Observe prepared slides of plasmodesmata (or diagrams) showing the desmotubule — emphasize it is ER, not empty space.', 'Complete a table contrasting apoplastic (through wall pores) vs symplastic (through plasmodesmata) pathways for water.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_5', difficulty: 'standard',
          question: 'The nucleus is a double-membrane-bound organelle that houses the genetic.',
          hint: 'Revisit c8_bio_ch1_5 (Plant Cell vs Animal Cell) to confirm nucleus presence in both, and.',
          misconception: 'Students believe the nuclear envelope is a static double membrane like the cell membrane, and that nuclear pores are.',
          parts: [
                { id: 'a', prompt: 'A researcher treats cultured human cells with a drug that inhibits nuclear export receptors (exportins).', answer: 'Cytoplasmic protein synthesis will decrease',
                  options: ['Cytoplasmic protein synthesis will decrease', 'protein synthesis increases'],
                  hint: 'Revisit c8_bio_ch1_5 (Plant Cell vs Animal Cell) to confirm nucleus presence in both, and.',
                  misconception: 'Students believe the nuclear envelope is a static double membrane like the cell membrane, and that nuclear pores are always open holes.' }
          ],
            remediations: { 'the-nuclear-envelope-is-a': { steps: ['Show time-lapse video of mitosis in animal cells (e.g., HeLa cells expressing GFP-lamin) where nuclear envelope breaks.', 'Have students model nuclear pore transport using a "gate" analogy — only proteins with "ID cards" (NLS) enter.', 'Compare with plant cells where nuclear envelope persists (closed mitosis) to highlight diversity.', 'Assign a 3-mark board-style question: "Describe the fate of nuclear envelope during mitosis in animal and plant cells."'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_6', difficulty: 'standard',
          question: 'Cytoplasm is the semi-fluid, gel-like matrix (cytosol) enclosed by the cell.',
          hint: 'Revisit c9_bio_ch1_3 (cell membrane structure) and c8_bio_ch1_3 (basic cell components).',
          misconception: 'Students often think cytoplasm is a passive, uniform jelly where organelles float aimlessly like fruits in a gelatin.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cytoplasm is the semi-fluid, gel-like matrix (cytosol) enclosed by the cell membrane that',
                  options: ['Cytoplasm is the semi-fluid, gel-like matrix (cytosol) enclosed by the cell membrane that', 'The discovery of the cell refers to the foundational observations by Robert Hooke (1665),', 'Plastids are double-membrane-bound, semi-autonomous organelles found exclusively in plant', 'A vacuole is a membrane-bound organelle filled with cell sap (a solution of water,'],
                  hint: 'Revisit c9_bio_ch1_3 (cell membrane structure) and c8_bio_ch1_3 (basic cell components).',
                  misconception: 'Students often think cytoplasm is a passive, uniform jelly where organelles float aimlessly like fruits in a gelatin dessert.' }
          ],
            remediations: { 'cytoplasm-is-a-passive': { steps: ['Show a time-lapse video of cytoplasmic streaming in Chara internodal cells or onion epidermal cells (available.', 'Ask students to track a single granule and describe its path — they will see directed, not random, motion.', 'Have them treat a similar sample with cytochalasin D (actin disruptor) and observe streaming stop, proving active.', 'Connect this to the cytoskeleton concept from Class 8 (c8_bio_ch1_7) and the upcoming ER/Golgi nodes where vesicular.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_7', difficulty: 'standard',
          question: 'The endoplasmic reticulum (ER) is a network of membranous tubules and flattened.',
          hint: 'Review c9_bio_ch1_5 (nuclear envelope structure) and c9_bio_ch1_6 (ribosome function.',
          misconception: 'Students believe rough ER and smooth ER are completely separate organelles that don\'t communicate, and that proteins.',
          parts: [
                { id: 'a', prompt: 'A liver cell detoxifies alcohol using enzymes in the smooth ER.', answer: 'Chronic alcohol induces proliferation of smooth ER (hypertrophy) to increase',
                  options: ['Chronic alcohol induces proliferation of smooth ER (hypertrophy) to increase', 'alcohol damages rough ER', 'no change in ER'],
                  hint: 'Review c9_bio_ch1_5 (nuclear envelope structure) and c9_bio_ch1_6 (ribosome function in cytoplasm).',
                  misconception: 'Students believe rough ER and smooth ER are completely separate organelles that don\'t communicate, and that proteins made on rough ER never.' }
          ],
            remediations: { 'rough-er-and-smooth-er': { steps: ['Show a 3D animation or diagram of continuous ER network highlighting transitional ER (smooth regions continuous with.', 'Use the "factory floor" analogy - RER and SER are different workstations on the same factory floor connected.', 'Trace a specific protein (e.g., insulin) from RER synthesis → ER lumen → transitional ER (smooth) → vesicle → Golgi.', 'Practice drawing the ER as one continuous network with ribosomes clustered in zones, not two separate structures.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_8', difficulty: 'standard',
          question: 'The Golgi apparatus is a membrane-bound organelle consisting of flattened.',
          hint: 'Revisit c9_bio_ch1_7 (Endoplasmic Reticulum) — focus on the **transition vesicle**.',
          misconception: 'Students think **the Golgi apparatus "makes" proteins** because it\'s large and prominent in secretory cells.',
          parts: [
                { id: 'a', prompt: 'Why does the Golgi apparatus have a distinct cis-face and trans-face, and what would happen if a protein entered the trans-face directly instead of the.', answer: 'The cis-face (convex, near ER) receives vesicles from the ER',
                  options: ['The cis-face (convex, near ER) receives vesicles from the ER', 'faces are just structural'],
                  hint: 'Revisit c9_bio_ch1_7 (Endoplasmic Reticulum) — focus on the **transition vesicle** concept: how.',
                  misconception: 'Students think **the Golgi apparatus "makes" proteins** because it\'s large and prominent in secretory cells.' }
          ],
            remediations: { 'the-golgi-apparatus-makes-proteins': { steps: ['Show a **pulse-chase animation** (e.g., from HHMI BioInteractive) — radioactive amino acids appear first in ER (5 min).', 'Ask: "If Golgi made proteins, why does label appear in ER *first*?"', 'Do a **card-sort activity**: cards = "ribosome," "ER," "Golgi," "vesicle," "cell membrane." Student arranges in order.', 'Reinforce: **Ribosome = builder; ER = folding room; Golgi = packaging & labeling dept.**'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_9', difficulty: 'standard',
          question: 'Mitochondria are double-membrane-bound organelles that serve as the site.',
          hint: 'Revisit Class 6 "Cellular Respiration: How Cells Extract Energy" (c6_biology_ch09_005).',
          misconception: 'Students think "mitochondria produce energy" and write this in exams.',
          parts: [
                { id: 'a', prompt: 'Name the two membranes of the mitochondrion and state one key structural difference between them.', answer: 'The outer membrane is smooth and permeable to small molecules via porins',
                  options: ['The outer membrane is smooth and permeable to small molecules via porins', 'both membranes are folded', 'outer membrane has cristae', 'mitochondria produce energy'],
                  hint: 'Revisit Class 6 "Cellular Respiration: How Cells Extract Energy" (c6_biology_ch09_005) and Class 7.',
                  misconception: 'Students think "mitochondria produce energy" and write this in exams.' },
                { id: 'b', prompt: 'A student observes two cell types under a microscope: Cell A has very few mitochondria; Cell B is packed with mitochondria.', answer: 'Cell B (packed with mitochondria) is the skeletal muscle fiber',
                  options: ['Cell B (packed with mitochondria) is the skeletal muscle fiber', 'mitochondria produce energy', '"mitochondria produce energy" and write this in exams'],
                  hint: 'Revisit Class 6 "Cellular Respiration: How Cells Extract Energy" (c6_biology_ch09_005) and Class 7.',
                  misconception: 'Students think "mitochondria produce energy" and write this in exams.' }
          ],
            remediations: { 'mitochondria-produce-energy-and-write': { steps: ['Ask the student to state the First Law of Thermodynamics in their own words ("Energy cannot be created or destroyed.', 'Have them trace a glucose molecule: C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP — identify where the energy in ATP originally.', 'Show a mitochondrion diagram and label "Input: Pyruvate + NAD+ + ADP + Pi" and "Output: CO2 + NADH + ATP" — emphasize.', 'Practice rewriting three textbook sentences that say "produce energy" into correct "transform energy" phrasing.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "mitochondria produce energy" and write this in exams.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Mitochondria are the only organelles that produce ATP in eukaryotic cells." Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'mitochondria produce energy', '"mitochondria produce energy" and write this in exams'],
                  hint: 'Revisit Class 6 "Cellular Respiration: How Cells Extract Energy" (c6_biology_ch09_005) and Class 7.',
                  misconception: 'Students think "mitochondria produce energy" and write this in exams.' }
          ],
            remediations: { 'mitochondria-produce-energy-and-write': { steps: ['Ask the student to state the First Law of Thermodynamics in their own words ("Energy cannot be created or destroyed.', 'Have them trace a glucose molecule: C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP — identify where the energy in ATP originally.', 'Show a mitochondrion diagram and label "Input: Pyruvate + NAD+ + ADP + Pi" and "Output: CO2 + NADH + ATP" — emphasize.', 'Practice rewriting three textbook sentences that say "produce energy" into correct "transform energy" phrasing.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
