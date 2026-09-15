import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch01_p1: SimDef = {
    id: 'v3_c9_bio_ch01_p1',
    title: 'The Fundamental Unit of Life: Cell · Part 1/2',
    subtitle: 'Empty rooms vs. swimming animalcules',
    classLevel: 9, subject: 'biology', topic: 'The Fundamental Unit of Life: Cell · Part 1/2',
    chapters: ['c9_bio_ch01'],
    nodeIds: ['c9_bio_ch1_1', 'c9_bio_ch1_10', 'c9_bio_ch1_11', 'c9_bio_ch1_12', 'c9_bio_ch1_2', 'c9_bio_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a microscope pioneer', intro: 'Cork under a weak lens shows little boxes; pond water under a great lens shows tiny swimmers. Put yourself in 1665 and decide what actually counts as \'discovering the cell.\'', goal: 'Understand how Hooke (dead cork walls, coined \'cell\') and Leeuwenhoek (living microorganisms) jointly revealed the cell as life\'s structural and functional unit.' },
    discovery: {
        question: 'Robert Hooke \'discovered the cell\' in 1665 — but the cork he looked at was dead, showing only empty walls. So who first saw a cell that was actually alive?',
        options: ['Leeuwenhoek — his sharper single lens revealed swimming \'animalcules\' in rainwater, proving these little rooms could be living units', 'Hooke himself — he saw living cells too', 'Nobody — cells weren\'t seen alive until electron microscopes', 'Schleiden — he discovered plant cells'],
        answer: 'Leeuwenhoek — his sharper single lens revealed swimming \'animalcules\' in rainwater, proving these little rooms could be living units',
        hook: 'Hooke named the \'cell\' but only ever saw the walls — like finding an empty building. It took Leeuwenhoek\'s superior lens to spot the occupants: living, moving microbes. Structure + life = the real discovery.',
    },
    teaching: [
        { title: 'Discovery of the Cell: Hooke and Leeuwenhoek', text: 'The discovery of the cell refers to the foundational observations by Robert Hooke (1665), who first coined the term "cell" after viewing dead cork tissue under a compound microscope, and Antonie van.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch1_1', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Replay both discoveries in a school lab: stain onion peel to see Hooke\'s walled compartments, then mount fresh pond water to meet Leeuwenhoek\'s moving animalcules — and argue who deserves the credit.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch1_1', title: 'Discovery of the Cell: Hooke and Leeuwenhoek',
          caseStudy: { intro: 'Imagine placing a thin slice of onion peel on a slide in your school lab: you see tiny, brick-like compartments.',
            decisions: [{ prompt: 'State the specific biological material Robert Hooke observed in 1665 and the term he coined for the structures he saw.', options: [
                { text: 'Hooke observed a thin slice of **cork** (dead bark tissue from an oak tree) and coined', outcome: 'Hooke observed a thin slice of **cork** (dead bark tissue from an oak tree) and coined the term.' },
                { text: 'onion peel', outcome: 'Not quite — Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The.', reveals: 'hooke-discovered-the-living-cell' },
                { text: 'living cells', outcome: 'Not quite — Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The.', reveals: 'hooke-discovered-the-living-cell' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_10', title: 'Plastids: Chloroplasts, Chromoplasts and Leucoplasts',
          caseStudy: { intro: 'Observe a ripe red tomato, a green spinach leaf, and a white potato tuber on your kitchen counter.',
            decisions: [{ prompt: 'Name the three main types of plastids found in plant cells and state the primary pigment or storage product associated with each.', options: [
                { text: 'The three main types are: (1) Chloroplasts – contain chlorophyll (green pigment) for', outcome: 'The three main types are: (1) Chloroplasts – contain chlorophyll (green pigment) for.' },
                { text: 'vacuole', outcome: 'Not quite — Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply.', reveals: 'chromoplasts-are-dead-or-degenerate' },
                { text: 'degenerate', outcome: 'Not quite — Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply.', reveals: 'chromoplasts-are-dead-or-degenerate' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_11', title: 'Vacuoles: Structure and Functions',
          caseStudy: { intro: 'Observe a fresh spinach leaf and a wilted spinach leaf side by side — the fresh one is crisp and rigid, the wilted one is limp; this visible difference.',
            decisions: [{ prompt: 'What is the name of the single membrane that surrounds the vacuole, and what is the fluid inside the vacuole called?', options: [
                { text: 'The membrane is called the tonoplast, and the fluid inside is called cell sap', outcome: 'The membrane is called the tonoplast, and the fluid inside is called cell sap.' },
                { text: 'cell membrane', outcome: 'Not quite — Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles.".', reveals: 'vacuoles-are-just-storage-bags' },
                { text: 'vacuolar membrane', outcome: 'Not quite — Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles.".', reveals: 'vacuoles-are-just-storage-bags' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_12', title: 'Cell Division: Mitosis and Meiosis',
          caseStudy: { intro: 'Observe a healing wound on your skin or the rapid growth of a mung bean sprout in your kitchen - both happen because cells are dividing.',
            decisions: [{ prompt: 'Name the phase of the cell cycle where DNA replication occurs and state the chromosome composition (chromatids per chromosome) at the end.', options: [
                { text: 'DNA replication occurs in the **S phase (Synthesis phase) of Interphase**', outcome: 'DNA replication occurs in the **S phase (Synthesis phase) of Interphase**.' },
                { text: 'Prophase', outcome: 'Not quite — Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.', reveals: 'meiosis-ii-is-just-like' },
                { text: 'Mitosis', outcome: 'Not quite — Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.', reveals: 'meiosis-ii-is-just-like' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_2', title: 'Cell Theory: Postulates by Schleiden and Schwann',
          caseStudy: { intro: 'Start by showing a drop of curd (dahi) under a microscope — a familiar Indian kitchen staple.',
            decisions: [{ prompt: 'State the three postulates of cell theory as proposed by Schleiden, Schwann, and Virchow.', options: [
                { text: 'The three postulates are: (1) All living organisms are composed of one or more cells', outcome: 'The three postulates are: (1) All living organisms are composed of one or more cells.' },
                { text: 'Schleiden and Schwann *together* proposed all three postulates in one paper', outcome: 'Not quite — Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.', reveals: 'schleiden-and-schwann-together-proposed' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_3', title: 'Cell Membrane: Structure and Selective Permeability',
          caseStudy: { intro: 'Observe a raw egg placed in vinegar overnight — the shell dissolves, leaving a soft, swollen membrane.',
            decisions: [{ prompt: 'Define selective permeability of the cell membrane and name the two main structural components responsible for it.', options: [
                { text: 'Selective permeability means the membrane allows certain substances to pass while', outcome: 'Selective permeability means the membrane allows certain substances to pass while restricting.' },
                { text: 'cell wall controls entry', outcome: 'Not quite — Students believe that "selective permeability means the membrane actively chooses what to let in".', reveals: 'selective-permeability-means-the-membrane' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch1_10', title: 'Identify each idea',
          dissect: { specimen: 'The Fundamental Unit of Life: Cell · Part 1/2', spots: [
            { id: 's1', label: 'Discovery of the Cell Hooke and Leeuwenhoek', prompt: 'Which idea is this? — The discovery of the cell refers to the foundational observations by Robert Hooke (1665).', answer: 'Discovery of the Cell Hooke and Leeuwenhoek', options: ['Discovery of the Cell Hooke and Leeuwenhoek', 'Plastids Chloroplasts Chromoplasts and Leucoplasts', 'Vacuoles Structure and Functions', 'Cell Division Mitosis and Meiosis'] },
            { id: 's2', label: 'Plastids Chloroplasts Chromoplasts and Leucoplasts', prompt: 'Which idea is this? — Plastids are double-membrane-bound, semi-autonomous organelles found exclusively in plant.', answer: 'Plastids Chloroplasts Chromoplasts and Leucoplasts', options: ['Plastids Chloroplasts Chromoplasts and Leucoplasts', 'Discovery of the Cell Hooke and Leeuwenhoek', 'Vacuoles Structure and Functions', 'Cell Division Mitosis and Meiosis'] },
            { id: 's3', label: 'Vacuoles Structure and Functions', prompt: 'Which idea is this? — A vacuole is a membrane-bound organelle filled with cell sap (a solution of water.', answer: 'Vacuoles Structure and Functions', options: ['Vacuoles Structure and Functions', 'Discovery of the Cell Hooke and Leeuwenhoek', 'Plastids Chloroplasts Chromoplasts and Leucoplasts', 'Cell Division Mitosis and Meiosis'] },
            { id: 's4', label: 'Cell Division Mitosis and Meiosis', prompt: 'Which idea is this? — Cell division is the biological process by which a parent cell divides into two or more.', answer: 'Cell Division Mitosis and Meiosis', options: ['Cell Division Mitosis and Meiosis', 'Discovery of the Cell Hooke and Leeuwenhoek', 'Plastids Chloroplasts Chromoplasts and Leucoplasts', 'Vacuoles Structure and Functions'] },
            { id: 's5', label: 'Cell Theory Postulates by Schleiden and Schwann', prompt: 'Which idea is this? — Cell Theory, as proposed by Matthias Schleiden (1838) and Theodor Schwann (1839), states.', answer: 'Cell Theory Postulates by Schleiden and Schwann', options: ['Cell Theory Postulates by Schleiden and Schwann', 'Discovery of the Cell Hooke and Leeuwenhoek', 'Plastids Chloroplasts Chromoplasts and Leucoplasts', 'Vacuoles Structure and Functions'] },
            { id: 's6', label: 'Cell Membrane Structure and Selective Permeability', prompt: 'Which idea is this? — The cell membrane (plasma membrane) is a dynamic, fluid phospholipid bilayer embedded.', answer: 'Cell Membrane Structure and Selective Permeability', options: ['Cell Membrane Structure and Selective Permeability', 'Discovery of the Cell Hooke and Leeuwenhoek', 'Plastids Chloroplasts Chromoplasts and Leucoplasts', 'Vacuoles Structure and Functions'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Preparing a science-museum label, a student drafts: \'In 1665 Hooke peered at cork and saw living cells at work — the moment we discovered the living unit of life.\' The curator asks him to check it against what each pioneer actually saw.',
            decisions: [{ prompt: 'What should the label say?', options: [
                { text: 'Split the credit: Hooke saw only the dead, empty walls of cork cells — the rooms, not the occupants — and coined the word \'cell\'; it was Leeuwenhoek\'s sharper single lens that later revealed living, moving animalcules, and only together did the two pictures become the living cell idea.', outcome: 'This assigns structure to Hooke and life to Leeuwenhoek — the distinction the history of cell theory rests on.' },
                { text: 'The draft is fine — whoever coined \'cell\' must have seen a living cell, since dead tissue has no cells.', outcome: 'Cork is dead tissue made of cells: the walls remained after the living contents decayed, so Hooke catalogued architecture, not life.', reveals: 'naming-is-seeing-life' },
                { text: 'Give Leeuwenhoek all the credit and remove Hooke — living things are what matter, so his discovery alone counts.', outcome: 'Erasing Hooke loses the structural concept; the cell idea needed both the named compartment and the living creature inside it.', reveals: 'leeuwenhoek-alone' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'The cell story needed two men: one who saw the architecture, one who saw it breathing. Cells are life\'s basic unit because they\'re both a structure AND a living process.',
            decisions: [{ prompt: 'What comes next? The Fundamental Unit of Life: Cell · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Fundamental Unit of Life: Cell · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch1_1', difficulty: 'standard',
          question: 'The discovery of the cell refers to the foundational observations by Robert.',
          hint: 'Revisit c8_bio_ch1_2 (microscope parts and function) and c8_bio_ch1_3 (cell wall.',
          misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The discovery of the cell refers to the foundational observations by Robert Hooke (1665),',
                  options: ['The discovery of the cell refers to the foundational observations by Robert Hooke (1665),', 'Plastids are double-membrane-bound, semi-autonomous organelles found exclusively in plant', 'A vacuole is a membrane-bound organelle filled with cell sap (a solution of water,', 'Cell division is the biological process by'],
                  hint: 'Revisit c8_bio_ch1_2 (microscope parts and function) and c8_bio_ch1_3 (cell wall composition and.',
                  misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning: "Hooke looked.' }
          ],
            remediations: { 'hooke-discovered-the-living-cell': { steps: ['**Observe directly:** Prepare two slides: (a) iodine-stained onion peel (fixed, walled, static) → "Hooke\'s view"; (b).', '**Tabulate:** Specimen | Staining | Movement | Wall visible | Living?', '**Conclude:** Hooke\'s "cells" = dead walls; Leeuwenhoek\'s "animalcules" = living units.', '**Write a 3-line note:** "Term \'cell\' from Hooke (structure); Concept of living cell from Leeuwenhoek (function)." This.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Leeuwenhoek discovered bacteria, so he should be credited with discovering the cell, not Hooke." Provide a biological justification for.', answer: 'The claim is **partially valid but incomplete**',
                  options: ['The claim is **partially valid but incomplete**', 'living cell', '** The exact wrong reasoning', '**Hooke discovered the "living cell"'],
                  hint: 'Revisit c8_bio_ch1_2 (microscope parts and function) and c8_bio_ch1_3 (cell wall composition and.',
                  misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning: "Hooke looked.' },
                { id: 'b', prompt: 'Design a simple investigation using only a compound microscope (school lab), onion peel, and pond water to demonstrate the complementary nature of Hooke\'s and.', answer: '**Investigation:** 1) Mount stained onion peel (iodine) → observe fixed, walled',
                  options: ['**Investigation:** 1) Mount stained onion peel (iodine) → observe fixed, walled', 'living cell', '** The exact wrong reasoning', '**Hooke discovered the "living cell"'],
                  hint: 'Revisit c8_bio_ch1_2 (microscope parts and function) and c8_bio_ch1_3 (cell wall composition and.',
                  misconception: 'Students believe **Hooke discovered the "living cell" because he coined the term "cell."** The exact wrong reasoning: "Hooke looked.' }
          ],
            remediations: { 'hooke-discovered-the-living-cell': { steps: ['**Observe directly:** Prepare two slides: (a) iodine-stained onion peel (fixed, walled, static) → "Hooke\'s view"; (b).', '**Tabulate:** Specimen | Staining | Movement | Wall visible | Living?', '**Conclude:** Hooke\'s "cells" = dead walls; Leeuwenhoek\'s "animalcules" = living units.', '**Write a 3-line note:** "Term \'cell\' from Hooke (structure); Concept of living cell from Leeuwenhoek (function)." This.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_10', difficulty: 'standard',
          question: 'Plastids are double-membrane-bound, semi-autonomous organelles found.',
          hint: 'Revisit the plant cell diagram and the function of chloroplasts from Class 8.',
          misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and.',
          parts: [
                { id: 'a', prompt: 'A student observes a green mango turning yellow as it ripens. They claim, "The chloroplasts in the mango skin have died and disappeared, so the yellow color.', answer: 'The explanation is incorrect',
                  options: ['The explanation is incorrect', 'degenerate'],
                  hint: 'Revisit the plant cell diagram and the function of chloroplasts from Class 8 (c8_bio_ch1_6) and the.',
                  misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and that leucoplasts.' },
                { id: 'b', prompt: 'Potato tubers are underground stems that store starch in leucoplasts (amyloplasts). If a potato is left in sunlight for several days, its skin turns green.', answer: 'The leucoplasts (amyloplasts) in the potato skin differentiate into chloroplasts',
                  options: ['The leucoplasts (amyloplasts) in the potato skin differentiate into chloroplasts', 'new chloroplasts are made from scratch', 'chloroplasts move from the leaves', 'degenerate'],
                  hint: 'Revisit the plant cell diagram and the function of chloroplasts from Class 8 (c8_bio_ch1_6) and the.',
                  misconception: 'Students often believe that chromoplasts are "dead" or "degenerate" chloroplasts that have simply lost chlorophyll, and that leucoplasts.' }
          ],
            remediations: { 'chromoplasts-are-dead-or-degenerate': { steps: ['Show a time-lapse video or series of images of tomato ripening (green → breaker → red) and potato greening (white →.', 'Have students prepare temporary mounts of potato peel from a dark-stored tuber and a light-exposed tuber; stain with.', 'Use a concept map to trace: Proplastid → (light) → Chloroplast → (ripening) → Chromoplast AND Proplastid → (dark.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_11', difficulty: 'standard',
          question: 'A vacuole is a membrane-bound organelle filled with cell sap (a solution.',
          hint: 'Review c9_bio_ch1_3 (osmosis, selective permeability) and c9_bio_ch1_4 (cell wall.',
          misconception: 'Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles." The exact wrong.',
          parts: [
                { id: 'a', prompt: 'What is the name of the single membrane that surrounds the vacuole, and what is the fluid inside the vacuole called?', answer: 'The membrane is called the tonoplast, and the fluid inside is called cell sap',
                  options: ['The membrane is called the tonoplast, and the fluid inside is called cell sap', 'cell membrane', 'vacuolar membrane', 'cytoplasm'],
                  hint: 'Review c9_bio_ch1_3 (osmosis, selective permeability) and c9_bio_ch1_4 (cell wall function) with.',
                  misconception: 'Students think "vacuoles are just storage bags for waste" and that "animal cells have no vacuoles." The exact wrong reasoning: they equate.' }
          ],
            remediations: { 'vacuoles-are-just-storage-bags': { steps: ['Show a time-lapse video (or series of microscope images) of onion epidermal cells in distilled water vs.', 'Have them measure cell length before/after to quantify turgor loss.', 'Ask: "If the vacuole were just a waste bag, why does its size change reversibly with water movement?"', 'Connect to c9_bio_ch1_3 (osmosis across selectively permeable membrane) and c9_bio_ch1_4 (cell wall resisting pressure).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_12', difficulty: 'standard',
          question: 'Cell division is the biological process by which a parent cell divides into two.',
          hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) for chromosome organization and.',
          misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.',
          parts: [
                { id: 'a', prompt: 'Name the phase of the cell cycle where DNA replication occurs and state the chromosome composition (chromatids per chromosome) at the end of this phase in.', answer: 'DNA replication occurs in the **S phase (Synthesis phase) of Interphase**',
                  options: ['DNA replication occurs in the **S phase (Synthesis phase) of Interphase**', 'Prophase', 'Mitosis', '46 chromosomes with one chromatid each'],
                  hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) for chromosome organization and.',
                  misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.' },
                { id: 'b', prompt: 'Explain why homologous chromosomes pair up (synapsis) in Prophase I of meiosis but do not pair in prophase of mitosis.', answer: 'Homologous chromosomes pair in Prophase I to enable **crossing over (genetic',
                  options: ['Homologous chromosomes pair in Prophase I to enable **crossing over (genetic', 'pairing happens in both', 'pairing is for separation of sister chromatids', 'Meiosis II is just like mitosis'],
                  hint: 'Revisit c9_bio_ch1_5 (Nucleus: Structure and Functions) for chromosome organization and.',
                  misconception: 'Students think **"Meiosis II is just like mitosis"** because both separate sister chromatids.' }
          ],
            remediations: { 'meiosis-ii-is-just-like': { steps: ['Use pipe cleaners (two long = maternal/paternal homologues, each folded to show two chromatids) to model Meiosis.', 'Model Meiosis II: separate sister chromatids → four cells with n unduplicated chromosomes.', 'Contrast with mitosis model: start with 2n duplicated chromosomes, separate sisters directly → two 2n cells.', 'Count chromosomes at each stage aloud. The physical manipulation of "homologues vs sisters" and "with/without S phase.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_2', difficulty: 'standard',
          question: 'Cell Theory, as proposed by Matthias Schleiden (1838) and Theodor Schwann.',
          hint: 'If stuck, revisit c8_bio_ch1_3 (What Is a Cell?) and c8_bio_ch1_8 (Levels.',
          misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.',
          parts: [
                { id: 'a', prompt: 'Why was Schleiden\'s conclusion that \'all plants are made of cells\' (1838) and Schwann\'s extension to animals (1839) considered a unification of biology?', answer: 'Before cell theory, plants and animals were studied as separate kingdoms with no',
                  options: ['Before cell theory, plants and animals were studied as separate kingdoms with no', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (What Is a Cell?) and c8_bio_ch1_8 (Levels of Organisation).',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' },
                { id: 'b', prompt: 'A student argues: "Viruses have genetic material and evolve, so they should be considered living cells according to cell theory." Use the postulates of cell.', answer: 'Step 1: Recall postulate 1',
                  options: ['Step 1: Recall postulate 1', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (What Is a Cell?) and c8_bio_ch1_8 (Levels of Organisation).',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' },
                { id: 'c', prompt: 'Compare the evidence available to Schleiden (plant cells) and Schwann (animal cells) in the 1830s.', answer: 'Schleiden studied plant tissues (e.g., onion epidermis, cork)',
                  options: ['Schleiden studied plant tissues (e.g., onion epidermis, cork)', 'Schleiden and Schwann *together* proposed all three postulates in one paper'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (What Is a Cell?) and c8_bio_ch1_8 (Levels of Organisation).',
                  misconception: 'Students often think Schleiden and Schwann *together* proposed all three postulates in one paper.' }
          ],
            remediations: { 'schleiden-and-schwann-together-proposed': { steps: ['Create a timeline on the board: 1665 Hooke → 1674 Leeuwenhoek → 1838 Schleiden → 1839 Schwann → 1855 Virchow.', 'Give each student a \'role card\' (Schleiden, Schwann, Virchow) with one key observation they made (plant cells, animal.', 'Have them argue in character: "I proved plants are cellular," "I proved animals are cellular," "I proved cells come.', 'Ask the class to vote on which postulate each scientist contributed.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch1_3', difficulty: 'standard',
          question: 'The cell membrane (plasma membrane) is a dynamic, fluid phospholipid bilayer.',
          hint: 'If stuck, revisit Class 8 "Cell Membrane, Cytoplasm, and Nucleus: Functions".',
          misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they.',
          parts: [
                { id: 'a', prompt: 'A red blood cell is placed in a solution of 0.9% NaCl (isotonic) and another in distilled water (hypotonic).', answer: 'In 0.9% NaCl (isotonic), water moves equally in and out',
                  options: ['In 0.9% NaCl (isotonic), water moves equally in and out', 'cell shrinks in water'],
                  hint: 'If stuck, revisit Class 8 "Cell Membrane, Cytoplasm, and Nucleus: Functions" (c8_bio_ch1_4) and.',
                  misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they anthropomorphize the membrane as.' },
                { id: 'b', prompt: 'Compare and contrast facilitated diffusion and active transport using three criteria: energy requirement, direction relative to concentration gradient, and.', answer: 'Facilitated diffusion: no ATP, down gradient, uses channel/carrier proteins',
                  options: ['Facilitated diffusion: no ATP, down gradient, uses channel/carrier proteins', 'both need energy', 'protein-mediated', 'energy-dependent'],
                  hint: 'If stuck, revisit Class 8 "Cell Membrane, Cytoplasm, and Nucleus: Functions" (c8_bio_ch1_4) and.',
                  misconception: 'Students believe that "selective permeability means the membrane actively chooses what to let in" — they anthropomorphize the membrane as.' }
          ],
            remediations: { 'selective-permeability-means-the-membrane': { steps: ['Show a dialysis tubing experiment — starch stays inside, iodine enters, turning starch blue-black.', 'Use a lipid bilayer simulation (e.g., PhET Membrane Channels) — let students try passing O₂, CO₂, glucose, ions.', 'Ask: "If the membrane \'knew\' the cell needed K⁺, why does K⁺ leak out without the Na⁺/K⁺ pump?" This forces.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
