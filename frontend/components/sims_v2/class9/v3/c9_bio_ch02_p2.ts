import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch02_p2: SimDef = {
    id: 'v3_c9_bio_ch02_p2',
    title: 'Tissues: Plant and Animal · Part 2/2',
    subtitle: 'The cells that never stopped dividing',
    classLevel: 9, subject: 'biology', topic: 'Tissues: Plant and Animal · Part 2/2',
    chapters: ['c9_bio_ch02'],
    nodeIds: ['c9_bio_ch2_5', 'c9_bio_ch2_6', 'c9_bio_ch2_7', 'c9_bio_ch2_8', 'c9_bio_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant-tissue microscopist', intro: 'A sapling shoots up, a trunk thickens, grass regrows after mowing — but growth isn\'t everywhere. Find the tiny zones where cells still split nonstop, and see what the rest of the plant is busy doing.', goal: 'Distinguish meristematic tissue (undifferentiated, dividing) from permanent tissue (specialised, non-dividing) and connect each to how plants grow taller, thicker and regrow.' },
    discovery: {
        question: 'Cattle graze off a wheat crop\'s tip — the plant never grows taller, yet the stem keeps getting thicker. How can one kind of growth stop while another continues?',
        options: ['The tip\'s apical meristem was eaten (no more height), but the lateral meristem still divides — adding girth', 'The plant is dead — thickening is an illusion', 'All growth happens only at the tip, always', 'The roots push the stem wider in revenge'],
        answer: 'The tip\'s apical meristem was eaten (no more height), but the lateral meristem still divides — adding girth',
        hook: 'Plants don\'t grow everywhere — only in meristem zones packed with thin-walled, nucleus-heavy, constantly dividing cells. Every other tissue (the \'permanent\' ones) are ex-meristem cells that settled into a job and quit dividing.',
    },
    teaching: [
        { title: 'Animal Tissues: Epithelial Tissue Types', text: 'Epithelial tissue is a continuous sheet of tightly packed cells with minimal extracellular matrix that covers body surfaces, lines cavities and hollow organs, and forms glands; it rests on a basement.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch2_5', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Map a plant\'s growth zones: compare the jam-packed dividing cells at a root tip with the big vacuolated cells of a mature stem, and explain why mowing the lawn works but beheading a sapling doesn\'t.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch2_5', title: 'Animal Tissues: Epithelial Tissue Types',
          caseStudy: { intro: 'Imagine you accidentally touch a hot pan — your skin instantly protects the underlying tissue from damage.',
            decisions: [{ prompt: 'Name the three basic cell shapes used to classify epithelial tissue and give one location in the human body where each shape is typically.', options: [
                { text: 'The three basic shapes are squamous (flat, scale-like), cuboidal (cube-shaped), and', outcome: 'The three basic shapes are squamous (flat, scale-like), cuboidal (cube-shaped), and columnar (tall.' },
                { text: 'protect', outcome: 'Not quite — Students believe that "stratified" epithelium means the cells themselves are stacked like bricks.', reveals: 'stratified-epithelium-means-the-cells' },
                { text: 'stratified', outcome: 'Not quite — Students believe that "stratified" epithelium means the cells themselves are stacked like bricks.', reveals: 'stratified-epithelium-means-the-cells' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_6', title: 'Connective Tissue: Types and Functions',
          caseStudy: { intro: 'Imagine you pinch the skin on your forearm — it stretches and snaps back because of elastic fibers in the areolar connective tissue beneath it; now feel your.',
            decisions: [{ prompt: 'Name the three main components of the extracellular matrix in connective tissue and state one function of each.', options: [
                { text: 'The three main components are: (1) Collagen fibers', outcome: 'The three main components are: (1) Collagen fibers — provide tensile strength and resist pulling.' },
                { text: 'connective tissue', outcome: 'Not quite — Students often think "connective tissue" only means tissues that physically join two structures.', reveals: 'connective-tissue-only-means-tissues' },
                { text: 'cells" as a matrix component', outcome: 'Not quite — Students often think "connective tissue" only means tissues that physically join two structures.', reveals: 'connective-tissue-only-means-tissues' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_7', title: 'Muscular Tissue: Striated, Unstriated and Cardiac',
          caseStudy: { intro: 'Observe your arm while lifting a school bag—you decide to lift it, and your biceps bulge and shorten; now place a hand on your chest and feel your.',
            decisions: [{ prompt: 'Define striated muscle tissue and state two microscopic features that distinguish it from cardiac muscle tissue.', options: [
                { text: 'Striated (skeletal) muscle tissue consists of long, cylindrical, unbranched,', outcome: 'Striated (skeletal) muscle tissue consists of long, cylindrical, unbranched, multinucleated fibers.' },
                { text: 'branched fibers', outcome: 'Not quite — Students often believe cardiac muscle is "striated like skeletal muscle, so it must also.', reveals: 'cardiac-muscle-is-striated-like' },
                { text: 'single nucleus', outcome: 'Not quite — Students often believe cardiac muscle is "striated like skeletal muscle, so it must also.', reveals: 'cardiac-muscle-is-striated-like' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_8', title: 'Nervous Tissue: Neuron Structure and Function',
          caseStudy: { intro: 'When you touch a hot pan, your hand pulls back before you even feel the pain - this lightning-fast response happens because of nervous tissue.',
            decisions: [{ prompt: 'Name the three main structural parts of a typical neuron and state the function of each part.', options: [
                { text: 'The three main parts are: (1) Cyton (cell body) - contains nucleus and organelles,', outcome: 'The three main parts are: (1) Cyton (cell body) - contains nucleus and organelles, maintains cell.' },
                { text: 'impulse travels from ___ to ___', outcome: 'Not quite — Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes).', reveals: 'the-myelin-sheath-is-part' },
                { text: 'breaks in the neuron', outcome: 'Not quite — Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes).', reveals: 'the-myelin-sheath-is-part' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_9', title: 'Musculoskeletal System: Bones and Cartilage',
          caseStudy: { intro: 'Begin by asking students to tap their knuckles and then press their ear lobes – the hard knock comes from bone, the flexible bend from cartilage.',
            decisions: [{ prompt: 'Name the two main types of bone tissue based on porosity and state one location for each in the human skeleton.', options: [
                { text: 'Compact (cortical) bone – forms the dense outer shell of all bones, e.g., shaft of femur', outcome: 'Compact (cortical) bone – forms the dense outer shell of all bones, e.g., shaft of femur; Spongy.' },
                { text: 'long bone', outcome: 'Not quite — Students often think "cartilage turns into bone" as a universal rule, believing all cartilage is.', reveals: 'cartilage-turns-into-bone-as' },
                { text: 'flat bone', outcome: 'Not quite — Students often think "cartilage turns into bone" as a universal rule, believing all cartilage is.', reveals: 'cartilage-turns-into-bone-as' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch2_6', title: 'Identify each idea',
          dissect: { specimen: 'Tissues: Plant and Animal · Part 2/2', spots: [
            { id: 's1', label: 'Animal Tissues Epithelial Tissue Types', prompt: 'Which idea is this? — Epithelial tissue is a continuous sheet of tightly packed cells with minimal.', answer: 'Animal Tissues Epithelial Tissue Types', options: ['Animal Tissues Epithelial Tissue Types', 'Connective Tissue Types and Functions', 'Muscular Tissue Striated Unstriated and Cardiac', 'Nervous Tissue Neuron Structure and Function'] },
            { id: 's2', label: 'Connective Tissue Types and Functions', prompt: 'Which idea is this? — Connective tissue is a type of animal tissue characterized by widely spaced cells.', answer: 'Connective Tissue Types and Functions', options: ['Connective Tissue Types and Functions', 'Animal Tissues Epithelial Tissue Types', 'Muscular Tissue Striated Unstriated and Cardiac', 'Nervous Tissue Neuron Structure and Function'] },
            { id: 's3', label: 'Muscular Tissue Striated Unstriated and Cardiac', prompt: 'Which idea is this? — Muscular tissue is a specialized animal tissue composed of elongated cells (muscle.', answer: 'Muscular Tissue Striated Unstriated and Cardiac', options: ['Muscular Tissue Striated Unstriated and Cardiac', 'Animal Tissues Epithelial Tissue Types', 'Connective Tissue Types and Functions', 'Nervous Tissue Neuron Structure and Function'] },
            { id: 's4', label: 'Nervous Tissue Neuron Structure and Function', prompt: 'Which idea is this? — Nervous tissue is a specialized animal tissue composed of neurons (structural and.', answer: 'Nervous Tissue Neuron Structure and Function', options: ['Nervous Tissue Neuron Structure and Function', 'Animal Tissues Epithelial Tissue Types', 'Connective Tissue Types and Functions', 'Muscular Tissue Striated Unstriated and Cardiac'] },
            { id: 's5', label: 'Musculoskeletal System Bones and Cartilage', prompt: 'Which idea is this? — Bone is a rigid, vascularized connective tissue composed of a collagen matrix mineralized.', answer: 'Musculoskeletal System Bones and Cartilage', options: ['Musculoskeletal System Bones and Cartilage', 'Animal Tissues Epithelial Tissue Types', 'Connective Tissue Types and Functions', 'Muscular Tissue Striated Unstriated and Cardiac'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Cattle graze the tip off a young wheat plant. Watching it later, a farmer\'s son predicts: \'Height growth is over, but it may still thicken at the stem — not every growing cell lives at the tip.\'',
            decisions: [{ prompt: 'Does his tissue-level reasoning hold up?', options: [
                { text: 'Yes — the grazed tip was the apical meristem that drives lengthening, but meristems are not only apical: the lateral meristem (cambium) keeps dividing to add girth. Meristematic cells are the thin-walled, densely cytoplasmic dividers; the thick-walled storage and transport cells are permanent tissue.', outcome: 'This applies the meristem-versus-permanent split and correctly locates which growing zone survives the grazing.' },
                { text: 'No — meristem means the tip, so losing the tip ends all growth everywhere in the plant.', outcome: 'Meristematic tissue also sits at grass nodes and in the woody cambium; \'dividing cells\' is a tissue type, not a single spot.', reveals: 'meristem-means-tip' },
                { text: 'It will regrow from the tip anyway, because all plant cells can divide whenever needed.', outcome: 'Permanent cells have differentiated past division — thick walls and big vacuoles are for their jobs, not for splitting; only meristems divide.', reveals: 'all-cells-divide' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Meristem = the forever-dividing youth; permanent tissue = the specialists they become. A plant only grows where its meristems live — tips for length, sides for thickness, nodes for grass regrowth.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch2_5', difficulty: 'standard',
          question: 'Epithelial tissue is a continuous sheet of tightly packed cells with minimal.',
          hint: 'If stuck, revisit c8_bio_ch1_3 (Cell: Basic Unit of Life - Structure and Components) and.',
          misconception: 'Students believe that "stratified" epithelium means the cells themselves are stacked like bricks in a wall, with each.',
          parts: [
                { id: 'a', prompt: 'Why is simple squamous epithelium found in the alveoli of lungs but stratified squamous epithelium found in the skin?', answer: 'Simple squamous epithelium is a single layer of extremely thin cells, minimising',
                  options: ['Simple squamous epithelium is a single layer of extremely thin cells, minimising', 'both protect', 'stratified'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (Cell: Basic Unit of Life - Structure and Components) and.',
                  misconception: 'Students believe that "stratified" epithelium means the cells themselves are stacked like bricks in a wall, with each cell spanning.' },
                { id: 'b', prompt: 'A patient has a condition where the ciliated columnar epithelium lining their trachea is damaged and replaced by stratified squamous epithelium.', answer: 'Consequence 1: Impaired mucociliary clearance',
                  options: ['Consequence 1: Impaired mucociliary clearance', 'breathing stops', 'stratified'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (Cell: Basic Unit of Life - Structure and Components) and.',
                  misconception: 'Students believe that "stratified" epithelium means the cells themselves are stacked like bricks in a wall, with each cell spanning.' }
          ],
            remediations: { 'stratified-epithelium-means-the-cells': { steps: ['Draw a side-view diagram of stratified squamous epithelium showing 4-5 distinct cell layers; label basal layer.', 'Contrast with a diagram of simple columnar epithelium — one layer of tall cells, all touching basement membrane.', 'Use a prepared slide of skin (stratified squamous keratinised) and intestine (simple columnar) under microscope; trace.', 'Verbalise: "Stratified = multiple cells stacked; Simple = one cell thick, every cell touches basement membrane."'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "stratified" epithelium means the cells themselves are stacked like bricks in a wall, with each.',
          parts: [
                { id: 'a', prompt: 'A textbook states: "Transitional epithelium is found in the urinary bladder because it can stretch." Evaluate this statement. Is it complete?', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'the statement is fully correct', 'elastic cells', 'stratified'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (Cell: Basic Unit of Life - Structure and Components) and.',
                  misconception: 'Students believe that "stratified" epithelium means the cells themselves are stacked like bricks in a wall, with each cell spanning.' },
                { id: 'b', prompt: 'Design a simple microscopic observation activity using prepared slides that would allow a Class 9 student to distinguish between simple cuboidal epithelium.', answer: 'Focus on low power to see overall tube/cyst structure',
                  options: ['Focus on low power to see overall tube/cyst structure', 'stratified'],
                  hint: 'If stuck, revisit c8_bio_ch1_3 (Cell: Basic Unit of Life - Structure and Components) and.',
                  misconception: 'Students believe that "stratified" epithelium means the cells themselves are stacked like bricks in a wall, with each cell spanning.' }
          ],
            remediations: { 'stratified-epithelium-means-the-cells': { steps: ['Draw a side-view diagram of stratified squamous epithelium showing 4-5 distinct cell layers; label basal layer.', 'Contrast with a diagram of simple columnar epithelium — one layer of tall cells, all touching basement membrane.', 'Use a prepared slide of skin (stratified squamous keratinised) and intestine (simple columnar) under microscope; trace.', 'Verbalise: "Stratified = multiple cells stacked; Simple = one cell thick, every cell touches basement membrane."'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_6', difficulty: 'standard',
          question: 'Connective tissue is a type of animal tissue characterized by widely spaced.',
          hint: 'Review c8_bio_ch1_8 (Levels of Organisation) and c9_bio_ch2_5 (Epithelial Tissue).',
          misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining.',
          parts: [
                { id: 'a', prompt: 'Name the three main components of the extracellular matrix in connective tissue and state one function of each.', answer: 'The three main components are: (1) Collagen fibers',
                  options: ['The three main components are: (1) Collagen fibers', 'connective tissue', 'cells" as a matrix component'],
                  hint: 'Review c8_bio_ch1_8 (Levels of Organisation) and c9_bio_ch2_5 (Epithelial Tissue) to reinforce the.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' },
                { id: 'b', prompt: 'Why is blood classified as a connective tissue even though it flows and does not "connect" things like bone or cartilage?', answer: 'Blood is classified as connective tissue',
                  options: ['Blood is classified as connective tissue', 'because it is red', 'because it flows', 'connective tissue'],
                  hint: 'Review c8_bio_ch1_8 (Levels of Organisation) and c9_bio_ch2_5 (Epithelial Tissue) to reinforce the.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' },
                { id: 'c', prompt: 'A patient has a deep cut that heals with a scar. Which type of connective tissue forms the scar, and why does it lack the flexibility of the original skin?', answer: 'Dense regular connective tissue (collagen-rich) forms the scar',
                  options: ['Dense regular connective tissue (collagen-rich) forms the scar', 'areolar tissue', 'adipose tissue', 'connective tissue'],
                  hint: 'Review c8_bio_ch1_8 (Levels of Organisation) and c9_bio_ch2_5 (Epithelial Tissue) to reinforce the.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' }
          ],
            remediations: { 'connective-tissue-only-means-tissues': { steps: ['Revisit the definition of tissue from c8_bio_ch1_8 — emphasize that classification is based on cell-matrix relationship.', 'Create a table with columns: Tissue Name, Matrix Type, Fiber Types, Main Cells, Primary Function.', 'Use the table to answer "Why is X a connective tissue?" for each type.', 'Practice with a micrograph identification worksheet (label matrix, fibers, cells) to reinforce visual recognition.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_7', difficulty: 'standard',
          question: 'Muscular tissue is a specialized animal tissue composed of elongated cells.',
          hint: 'Revisit c8_bio_ch1_3 (cell components) and c8_bio_ch1_8 (tissue level of organization).',
          misconception: 'Students often believe cardiac muscle is "striated like skeletal muscle, so it must also be voluntary and fatigue.',
          parts: [
                { id: 'a', prompt: 'Define striated muscle tissue and state two microscopic features that distinguish it from cardiac muscle tissue.', answer: 'Striated (skeletal) muscle tissue consists of long, cylindrical, unbranched,',
                  options: ['Striated (skeletal) muscle tissue consists of long, cylindrical, unbranched,', 'branched fibers', 'single nucleus', 'striated like skeletal muscle, so it must also be voluntary and fatigue quickly'],
                  hint: 'Revisit c8_bio_ch1_3 (cell components) and c8_bio_ch1_8 (tissue level of organization) to refresh.',
                  misconception: 'Students often believe cardiac muscle is "striated like skeletal muscle, so it must also be voluntary and fatigue quickly." The exact wrong.' },
                { id: 'b', prompt: 'Explain why smooth muscle is called \'unstriated\' even though it contains the same contractile proteins (actin and myosin) as striated muscle.', answer: 'Smooth muscle lacks visible striations',
                  options: ['Smooth muscle lacks visible striations', 'smooth muscle has no actin or myosin', 'striated like skeletal muscle, so it must also be voluntary and fatigue quickly'],
                  hint: 'Revisit c8_bio_ch1_3 (cell components) and c8_bio_ch1_8 (tissue level of organization) to refresh.',
                  misconception: 'Students often believe cardiac muscle is "striated like skeletal muscle, so it must also be voluntary and fatigue quickly." The exact wrong.' },
                { id: 'c', prompt: 'A Class 9 student observes a muscle tissue slide showing branched, striated fibers with a single central nucleus and dark lines (intercalated discs) at cell.', answer: 'The tissue is cardiac muscle; it has high fatigue resistance',
                  options: ['The tissue is cardiac muscle; it has high fatigue resistance', 'voluntary control', 'striated like skeletal muscle, so it must also be voluntary and fatigue quickly'],
                  hint: 'Revisit c8_bio_ch1_3 (cell components) and c8_bio_ch1_8 (tissue level of organization) to refresh.',
                  misconception: 'Students often believe cardiac muscle is "striated like skeletal muscle, so it must also be voluntary and fatigue quickly." The exact wrong.' }
          ],
            remediations: { 'cardiac-muscle-is-striated-like': { steps: ['Show side-by-side micrographs of skeletal and cardiac muscle at same magnification; ask student to list three visible.', 'Have student create a comparison table with columns: "Striations?", "Branching?", "Nuclei number/position?".', 'Ask student to explain aloud why the heart cannot afford to fatigue, linking mitochondrial density and aerobic.', 'Assign a 3-mark board-style question: "Distinguish between skeletal and cardiac muscle on the basis of (i) branching.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_8', difficulty: 'standard',
          question: 'Nervous tissue is a specialized animal tissue composed of neurons (structural.',
          hint: 'Review Class 8 cell structure (c8_bio_ch1_3) and levels of organisation (c8_bio_ch1_8).',
          misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes.',
          parts: [
                { id: 'a', prompt: 'A student observes a neuron under microscope and sees a long fiber with periodic constrictions (gaps) along its length.', answer: 'The fiber is a myelinated axon',
                  options: ['The fiber is a myelinated axon', 'gaps insulate the axon', 'speed would increase', 'breaks in the neuron'],
                  hint: 'Review Class 8 cell structure (c8_bio_ch1_3) and levels of organisation (c8_bio_ch1_8) - focus.',
                  misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of Ranvier are "breaks.' },
                { id: 'b', prompt: 'Compare the structure and function of a sensory neuron, a motor neuron, and an interneuron. Why are interneurons found only in the central nervous system?', answer: 'Sensory neuron: long dendrite, short axon, carries impulse from receptor → CNS',
                  options: ['Sensory neuron: long dendrite, short axon, carries impulse from receptor → CNS', 'breaks in the neuron', 'myelin is made of neuron cytoplasm', 'nodes are where the axon is thinnest'],
                  hint: 'Review Class 8 cell structure (c8_bio_ch1_3) and levels of organisation (c8_bio_ch1_8) - focus.',
                  misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of Ranvier are "breaks.' }
          ],
            remediations: { 'the-myelin-sheath-is-part': { steps: ['Show a labeled diagram of axon cross-section with Schwann cell nucleus visible outside the myelin layers.', 'Ask "Whose nucleus is this?" - guide to realize it\'s not the neuron\'s.', 'Use analogy: neuron = electrical wire, Schwann cell = plastic insulation applied BY a different worker.', 'Have student redraw neuron + two Schwann cells wrapping it, labeling "neuron membrane" vs "Schwann cell membrane".'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_9', difficulty: 'standard',
          question: 'Bone is a rigid, vascularized connective tissue composed of a collagen matrix.',
          hint: 'Review c9_bio_ch2_6 Connective Tissue: Types and Functions – focus on the table comparing.',
          misconception: 'Students often think "cartilage turns into bone" as a universal rule, believing all cartilage is a temporary embryonic.',
          parts: [
                { id: 'a', prompt: 'Why does cartilage heal much more slowly than bone after an injury?', answer: 'Cartilage is avascular (lacks blood vessels) and relies on diffusion from the',
                  options: ['Cartilage is avascular (lacks blood vessels) and relies on diffusion from the', 'cartilage has no cells', 'cartilage turns into bone'],
                  hint: 'Review c9_bio_ch2_6 Connective Tissue: Types and Functions – focus on the table comparing proper.',
                  misconception: 'Students often think "cartilage turns into bone" as a universal rule, believing all cartilage is a temporary embryonic stage.' },
                { id: 'b', prompt: 'A 14-year-old athlete complains of knee pain after repetitive jumping. MRI shows softening of the articular cartilage on the patella.', answer: 'Hyaline cartilage – its smooth, glassy matrix with fine collagen fibers provides',
                  options: ['Hyaline cartilage – its smooth, glassy matrix with fine collagen fibers provides', 'cartilage turns into bone'],
                  hint: 'Review c9_bio_ch2_6 Connective Tissue: Types and Functions – focus on the table comparing proper.',
                  misconception: 'Students often think "cartilage turns into bone" as a universal rule, believing all cartilage is a temporary embryonic stage.' }
          ],
            remediations: { 'cartilage-turns-into-bone-as': { steps: ['Show three permanent cartilage specimens (ear, meniscus, tracheal ring) alongside a developing long bone model.', 'Ask students to predict which will become bone – only the long bone model.', 'Emphasise key phrase: "Endochondral ossification replaces hyaline cartilage models; other cartilage types are.', 'Have students create a two-column table: "Temporary cartilage (examples)" vs "Permanent cartilage (examples)" to cement.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
