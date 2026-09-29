import type { SimDef } from '../../engine/types';

/** v3 generated — c8_bio_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_bio_ch01_p2: SimDef = {
    id: 'v3_c8_bio_ch01_p2',
    title: 'The Invisible Living World: Beyond Our Naked Eye · Part 2/2',
    subtitle: 'Discover the invisible living world inside a cork slice',
    classLevel: 8, subject: 'biology', topic: 'The Invisible Living World: Beyond Our Naked Eye · Part 2/2',
    chapters: ['c8_bio_ch01'],
    nodeIds: ['c8_bio_ch1_4', 'c8_bio_ch1_5', 'c8_bio_ch1_6', 'c8_bio_ch1_7', 'c8_bio_ch1_8', 'c8_bio_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a microscopist seeing cells for the first time', intro: 'You hold a thin slice of cork up to a crude lens — and find a honeycomb of tiny rooms. Nobody named them \'cells\' yet. Nobody knew every living thing is built from them. Now you do.', goal: 'Understand how the microscopic world was discovered and identify the cell as life\'s basic unit with its key structures.' },
    discovery: {
        question: 'In the 1660s, Robert Hooke sliced cork, peered through his microscope and saw tiny empty boxes — he called them \'cells.\' Leeuwenhoek then found living creatures swimming in pond water nobody knew existed. What did these two men actually reveal?',
        options: ['An entire living world invisible to the naked eye — life built from microscopic units and teeming with organisms too small to see', 'That cork is secretly alive and breathing', 'That all diseases are caused by bad smells', 'That microscopes can magnify anything infinitely'],
        answer: 'An entire living world invisible to the naked eye — life built from microscopic units and teeming with organisms too small to see',
        hook: 'Before microscopes, \'living\' meant things you could see. Hooke\'s dead cork boxes and Leeuwenhoek\'s swimming \'animalcules\' proved most of life was invisible — and always had been.',
    },
    teaching: [
        { title: 'Cell Membrane, Cytoplasm, and Nucleus: Functions', text: 'The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm provides a jelly-like matrix where metabolic reactions occur and organelles are suspended, and the nucleus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_bio_ch1_4', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Shrink down past what eyes can see: meet the cell — life\'s smallest unit — tour its membrane, cytoplasm and nucleus, and learn to prepare a slide to spy on onion cells yourself.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c8_bio_ch1_5', title: 'Plant Cell vs Animal Cell: Differences in Structure',
          caseStudy: { intro: 'When you look at a rigid wooden ruler or the sturdy stem of a hibiscus plant in your garden, you can tell it feels very different from soft animal tissue.',
            decisions: [{ prompt: 'Which of the following cellular structures is found in plant cells but is completely absent in animal cells?', options: [
                { text: 'C) Cell wall', outcome: 'The correct answer is C) Cell wall. The cell wall provides rigid structural support and protection.' },
                { text: 'plant cells do not need mitochondria', outcome: 'Not quite — Students often believe that animal cells contain chloroplasts because they think all living.', reveals: 'animal-cells-contain-chloroplasts-because' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch1_6', title: 'Cell Wall and Chloroplasts: Unique Features of Plant Cells',
          caseStudy: { intro: 'When you look at a tall neem tree or a tender potted tulsi plant in your courtyard, you notice that unlike animals, plants stand stiff and upright without.',
            decisions: [{ prompt: 'What is the primary chemical substance that makes the plant cell wall rigid and tough?', options: [
                { text: 'The primary substance is cellulose', outcome: 'The primary substance is cellulose. A student who answers "protein" or "fat" is confusing the.' },
                { text: 'protein', outcome: 'Not quite — Students frequently believe that chloroplasts are found in every single cell of a plant, including.', reveals: 'students-frequently-believe-that-chloroplasts' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch1_8', title: 'Levels of Organisation: Cell, Tissue, Organ, Organ System, Organism',
          caseStudy: { intro: 'When you look at a brick wall of a house in your neighborhood, you notice it is made of single bricks arranged together to form walls, rooms, and finally.',
            decisions: [{ prompt: 'What is the most basic structural and functional unit of life in all living organisms?', options: [
                { text: 'A cell', outcome: 'A cell. A student who answers "tissue" or "organ" has misunderstood that tissues and organs are.' },
                { text: 'tissue', outcome: 'Not quite — Students often think that an organ is made of only one type of cell or tissue, similar to how.', reveals: 'an-organ-is-made-of' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_bio_ch1_5', title: 'Identify each idea',
          dissect: { specimen: 'The Invisible Living World: Beyond Our Naked Eye · Part 2/2', spots: [
            { id: 's1', label: 'Cell Membrane Cytoplasm and Nucleus Functions', prompt: 'Which idea is this? — The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm.', answer: 'Cell Membrane Cytoplasm and Nucleus Functions', options: ['Cell Membrane Cytoplasm and Nucleus Functions', 'Plant Cell vs Animal Cell Differences in Structure', 'Cell Wall and Chloroplasts Unique Features of Plant Cells', 'Variation in Cell Shape and Size Form Follows Function'] },
            { id: 's2', label: 'Plant Cell vs Animal Cell Differences in Structure', prompt: 'Which idea is this? — Plant cells and animal cells are the basic structural and functional units of life, but.', answer: 'Plant Cell vs Animal Cell Differences in Structure', options: ['Plant Cell vs Animal Cell Differences in Structure', 'Cell Membrane Cytoplasm and Nucleus Functions', 'Cell Wall and Chloroplasts Unique Features of Plant Cells', 'Variation in Cell Shape and Size Form Follows Function'] },
            { id: 's3', label: 'Cell Wall and Chloroplasts Unique Features of Plant Cells', prompt: 'Which idea is this? — The cell wall is a rigid, protective outer layer composed mainly of cellulose that.', answer: 'Cell Wall and Chloroplasts Unique Features of Plant Cells', options: ['Cell Wall and Chloroplasts Unique Features of Plant Cells', 'Cell Membrane Cytoplasm and Nucleus Functions', 'Plant Cell vs Animal Cell Differences in Structure', 'Variation in Cell Shape and Size Form Follows Function'] },
            { id: 's4', label: 'Variation in Cell Shape and Size Form Follows Function', prompt: 'Which idea is this? — Variation in cell shape and size refers to how the physical dimensions and structural.', answer: 'Variation in Cell Shape and Size Form Follows Function', options: ['Variation in Cell Shape and Size Form Follows Function', 'Cell Membrane Cytoplasm and Nucleus Functions', 'Plant Cell vs Animal Cell Differences in Structure', 'Cell Wall and Chloroplasts Unique Features of Plant Cells'] }
          ] } },
        { type: 'case', nodeId: 'c8_bio_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'At a science exhibition, a poster says: \'Robert Hooke discovered living cells swimming around in cork, and Leeuwenhoek invented the multi-lens compound microscope.\' A visitor asks the student presenter if the poster is accurate.',
            decisions: [{ prompt: 'What should the presenter correct?', options: [
                { text: 'Swap both claims: Hooke saw only dead, empty box-like walls in cork bark — he named them \'cells\' after monks\' rooms — while Leeuwenhoek used a single finely ground lens to watch living microbes moving in pond water.', outcome: 'This assigns each scientist his real contribution: dead plant walls versus living animalcules, compound versus simple high-power lens.' },
                { text: 'The poster is right — the man who named cells must have seen them alive, and more lenses always means a better microscope.', outcome: 'Cork cells were dead walls with nothing living inside, and Leeuwenhoek\'s single hand-ground lenses out-magnified the blurry compound scopes of the day.', reveals: 'hooke-saw-living-cells' },
                { text: 'Neither matters — both men proved the full cell theory that all organisms are made of cells, so the details are interchangeable.', outcome: 'Hooke only saw empty walls and cell theory took two more centuries of work; crediting either man with the finished theory skips the entire history.', reveals: 'instant-cell-theory' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Everything alive — from a mango tree to you — is built from boxes too small to see. The microscope didn\'t just magnify; it revealed where life actually lives.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_bio_ch1_4', difficulty: 'standard',
          question: 'The cell membrane acts as a selective barrier enclosing the cell contents, the.',
          hint: 'Review node c8_bio_ch1_3 to re-familiarize yourself with basic cell components and their.',
          misconception: 'Students often believe that the cell membrane is completely solid like a brick wall and prevents anything from entering.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm',
                  options: ['The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'Beneficial microorganisms such as bacteria and fungi act as natural decomposers by', 'Fermentation is an anaerobic biological process in'],
                  hint: 'Review node c8_bio_ch1_3 to re-familiarize yourself with basic cell components and their general.',
                  misconception: 'Students often believe that the cell membrane is completely solid like a brick wall and prevents anything from entering or leaving,.' }
          ],
            remediations: { 'the-cell-membrane-is-completely': { steps: ['To correct this, visualize the cell membrane as a security checkpoint at a modern railway station in India rather than.', 'Only ticketed passengers (specific molecules) are allowed to pass through the gates, while unauthorized individuals are.', 'Review how selective transport allows essential nutrients in while trapping wastes inside until they are ready to.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_5', difficulty: 'standard',
          question: 'Plant cells and animal cells are the basic structural and functional units.',
          hint: 'Review node c8_bio_ch1_4 to reinforce the core functions of the cell membrane, cytoplasm.',
          misconception: 'Students often believe that animal cells contain chloroplasts because they think all living organisms make their own.',
          parts: [
                { id: 'a', prompt: 'Which of the following cellular structures is found in plant cells but is completely absent in animal cells?', answer: 'Cell wall',
                  options: ['Cell wall', 'plant cells do not need mitochondria'],
                  hint: 'Review node c8_bio_ch1_4 to reinforce the core functions of the cell membrane, cytoplasm, and.',
                  misconception: 'Students often believe that animal cells contain chloroplasts because they think all living organisms make their own food through.' }
          ],
            remediations: { 'animal-cells-contain-chloroplasts-because': { steps: ['To fix this misconception, have the student trace energy flow step by step: 1.', 'Remind them that chloroplasts only *manufacture* glucose using sunlight.', 'Ask: "Can glucose run cell activities directly without being broken down?" 3.', 'Explain that mitochondria are the "powerhouses" that break down glucose to release energy in *both* plant and animal.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that animal cells contain chloroplasts because they think all living organisms make their own.',
          parts: [
                { id: 'a', prompt: 'Design a simple microscopic investigation to determine whether an unknown slide sample taken from a household vegetable is a plant cell or an animal cell.', answer: 'B (criteria for a complete answer include identifying plant-specific diagnostic',
                  options: ['B (criteria for a complete answer include identifying plant-specific diagnostic', 'plant cells do not need mitochondria'],
                  hint: 'Review node c8_bio_ch1_4 to reinforce the core functions of the cell membrane, cytoplasm, and.',
                  misconception: 'Students often believe that animal cells contain chloroplasts because they think all living organisms make their own food through.' }
          ],
            remediations: { 'animal-cells-contain-chloroplasts-because': { steps: ['To fix this misconception, have the student trace energy flow step by step: 1.', 'Remind them that chloroplasts only *manufacture* glucose using sunlight.', 'Ask: "Can glucose run cell activities directly without being broken down?" 3.', 'Explain that mitochondria are the "powerhouses" that break down glucose to release energy in *both* plant and animal.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_6', difficulty: 'standard',
          question: 'The cell wall is a rigid, protective outer layer composed mainly of cellulose.',
          hint: 'Review node c8_bio_ch1_5 to re-examine the basic side-by-side comparison of plant and.',
          misconception: 'Students frequently believe that chloroplasts are found in every single cell of a plant, including roots, underground.',
          parts: [
                { id: 'a', prompt: 'What is the primary chemical substance that makes the plant cell wall rigid and tough?', answer: 'The primary substance is cellulose',
                  options: ['The primary substance is cellulose', 'protein'],
                  hint: 'Review node c8_bio_ch1_5 to re-examine the basic side-by-side comparison of plant and animal cell.',
                  misconception: 'Students frequently believe that chloroplasts are found in every single cell of a plant, including roots, underground tubers like potatoes.' },
                { id: 'b', prompt: 'Why do animal cells lack a cell wall, considering that both plants and animals are made of cells?', answer: 'Animal cells lack a cell wall',
                  options: ['Animal cells lack a cell wall', 'animals do not need protection'],
                  hint: 'Review node c8_bio_ch1_5 to re-examine the basic side-by-side comparison of plant and animal cell.',
                  misconception: 'Students frequently believe that chloroplasts are found in every single cell of a plant, including roots, underground tubers like potatoes.' }
          ],
            remediations: { 'students-frequently-believe-that-chloroplasts': { steps: ['To fix this misconception, take a fresh potato tuber and an onion peel from your kitchen.', 'Make thin slices of both, stain them with iodine or safranin, and observe them under a microscope to note the absence.', 'Compare this with a scraped green leaf peel to visually establish that chloroplasts are restricted to light-exposed.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_7', difficulty: 'standard',
          question: 'Variation in cell shape and size refers to how the physical dimensions and.',
          hint: 'Review node c8_bio_ch1_3 to reinforce the basic parts of a cell before exploring how.',
          misconception: 'Students often believe that all cells within a single organism look identical (like tiny microscopic bricks or spheres).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Variation in cell shape and size refers to how the physical dimensions and structural',
                  options: ['Variation in cell shape and size refers to how the physical dimensions and structural', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'Beneficial microorganisms such as bacteria and fungi act as natural decomposers by', 'Fermentation is an anaerobic biological process in'],
                  hint: 'Review node c8_bio_ch1_3 to reinforce the basic parts of a cell before exploring how changes.',
                  misconception: 'Students often believe that all cells within a single organism look identical (like tiny microscopic bricks or spheres) and that.' }
          ],
            remediations: { 'all-cells-within-a-single': { steps: ['To correct this misconception, guide the student through a direct comparison using microscope diagrams or digital.', 'Ask the student: \'If a water pipe needs to carry water across a house, can we use a flat sheet of cloth?', 'Why do we need a hollow tube?\' Connect this physical analogy back to cells, emphasizing that just as tools are shaped.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_8', difficulty: 'standard',
          question: 'Levels of organisation refer to the hierarchical arrangement of structural.',
          hint: 'Review c8_bio_ch1_3 to reinforce what a cell is before moving to cellular coordination.',
          misconception: 'Students often think that an organ is made of only one type of cell or tissue, similar to how a brick wall is built.',
          parts: [
                { id: 'a', prompt: 'What is the most basic structural and functional unit of life in all living organisms?', answer: 'A cell',
                  options: ['A cell', 'tissue'],
                  hint: 'Review c8_bio_ch1_3 to reinforce what a cell is before moving to cellular coordination and tissues.',
                  misconception: 'Students often think that an organ is made of only one type of cell or tissue, similar to how a brick wall is built entirely of identical.' },
                { id: 'b', prompt: 'A doctor examines a sample of human inner cheek lining under a microscope and sees a tight sheet of similar cells working together to protect the underlying.', answer: 'Identify the biological sample as a collection of similar cells',
                  options: ['Identify the biological sample as a collection of similar cells', 'missed the group aspect, while one who answers'],
                  hint: 'Review c8_bio_ch1_3 to reinforce what a cell is before moving to cellular coordination and tissues.',
                  misconception: 'Students often think that an organ is made of only one type of cell or tissue, similar to how a brick wall is built entirely of identical.' }
          ],
            remediations: { 'an-organ-is-made-of': { steps: ['To fix this misconception, guide the student to examine a complex multi-part object like a bicycle or a smartphone.', 'Then explain that biological organs like the stomach or heart are similar multi-component structures made of different.', 'Have them review c8_bio_ch1_3 and c8_bio_ch1_8 to see how cells combine into various tissues.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_9', difficulty: 'standard',
          question: 'Microorganisms are extremely tiny living organisms—so small that they cannot.',
          hint: 'Review node c8_bio_ch1_3 to reinforce what a cell is and how single-celled organisms.',
          misconception: 'Students often think that all microorganisms are harmful germs that cause diseases in humans, plants, and animals.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Microorganisms are extremely tiny living organisms—so small that they cannot be seen with',
                  options: ['Microorganisms are extremely tiny living organisms—so small that they cannot be seen with', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'Beneficial microorganisms such as bacteria and fungi act as natural decomposers by', 'Fermentation is an anaerobic biological process in'],
                  hint: 'Review node c8_bio_ch1_3 to reinforce what a cell is and how single-celled organisms function.',
                  misconception: 'Students often think that all microorganisms are harmful germs that cause diseases in humans, plants, and animals.' }
          ],
            remediations: { 'all-microorganisms-are-harmful-germs': { steps: ['To fix this misconception, guide the student to examine daily life examples: ask them how curd is set from milk using.', 'Explain that without decomposing bacteria and fungi, dead organic matter would pile up indefinitely without recycling.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
