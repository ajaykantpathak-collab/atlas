import type { SimDef } from '../../engine/types';

/** v3 generated — c8_bio_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_bio_ch01_p1: SimDef = {
    id: 'v3_c8_bio_ch01_p1',
    title: 'The Invisible Living World: Beyond Our Naked Eye · Part 1/2',
    subtitle: 'Discover the invisible living world inside a cork slice',
    classLevel: 8, subject: 'biology', topic: 'The Invisible Living World: Beyond Our Naked Eye · Part 1/2',
    chapters: ['c8_bio_ch01'],
    nodeIds: ['c8_bio_ch1_1', 'c8_bio_ch1_10', 'c8_bio_ch1_11', 'c8_bio_ch1_12', 'c8_bio_ch1_2', 'c8_bio_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a microscopist seeing cells for the first time', intro: 'You hold a thin slice of cork up to a crude lens — and find a honeycomb of tiny rooms. Nobody named them \'cells\' yet. Nobody knew every living thing is built from them. Now you do.', goal: 'Understand how the microscopic world was discovered and identify the cell as life\'s basic unit with its key structures.' },
    discovery: {
        question: 'In the 1660s, Robert Hooke sliced cork, peered through his microscope and saw tiny empty boxes — he called them \'cells.\' Leeuwenhoek then found living creatures swimming in pond water nobody knew existed. What did these two men actually reveal?',
        options: ['An entire living world invisible to the naked eye — life built from microscopic units and teeming with organisms too small to see', 'That cork is secretly alive and breathing', 'That all diseases are caused by bad smells', 'That microscopes can magnify anything infinitely'],
        answer: 'An entire living world invisible to the naked eye — life built from microscopic units and teeming with organisms too small to see',
        hook: 'Before microscopes, \'living\' meant things you could see. Hooke\'s dead cork boxes and Leeuwenhoek\'s swimming \'animalcules\' proved most of life was invisible — and always had been.',
    },
    teaching: [
        { title: 'Discovery of the Microscopic World: Hooke and Leeuwenhoek', text: 'The discovery of the microscopic world refers to the historical breakthrough in the 17th century when scientists Robert Hooke and Antonie van Leeuwenhoek used newly invented magnifying instruments.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_bio_ch1_1', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Shrink down past what eyes can see: meet the cell — life\'s smallest unit — tour its membrane, cytoplasm and nucleus, and learn to prepare a slide to spy on onion cells yourself.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c8_bio_ch1_1', title: 'Discovery of the Microscopic World: Hooke and Leeuwenhoek',
          caseStudy: { intro: 'When you look at a drop of pond water from a local garden puddle, it looks clear or muddy to your naked eye, yet millions of tiny swimming creatures live.',
            decisions: [{ prompt: 'What specific plant material did Robert Hooke examine when he first observed and named "cells"?', options: [
                { text: 'Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree', outcome: 'Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree.' },
                { text: 'onion peel', outcome: 'Not quite — Students often think that Robert Hooke discovered living animal cells floating around when.', reveals: 'robert-hooke-discovered-living-animal' },
                { text: 'pond water', outcome: 'Not quite — Students often think that Robert Hooke discovered living animal cells floating around when.', reveals: 'robert-hooke-discovered-living-animal' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch1_10', title: 'Beneficial Microorganisms: Decomposition and Nutrient Recycling',
          caseStudy: { intro: 'When you walk past a garden heap of fallen mango leaves and leftover vegetable peels in your schoolyard, you might notice that after a few weeks, the pile.',
            decisions: [{ prompt: 'What is the primary role of saprophytic bacteria and fungi in a forest ecosystem?', options: [
                { text: 'The primary role of these microorganisms is to decompose dead plants and animals,', outcome: 'The primary role of these microorganisms is to decompose dead plants and animals, breaking down.' },
                { text: 'disappear', outcome: 'Not quite — Students often believe that dead leaves and animal waste simply "disappear" or dissolve into the.', reveals: 'dead-leaves-and-animal-waste' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch1_2', title: 'Microscope: Tool for Observing Tiny Organisms',
          scaffold: { problem: 'A student in a Mumbai school sets up a microscope with a 15X ocular lens and a 45X objective lens.',
            steps: [
            { text: 'Identify the magnification values given for both lenses (Eyepiece = 15X, Objective = 45X).' },
            { text: 'Apply the total magnification formula (Total Magnification = Eyepiece × Objective).' },
            { text: 'Multiply the numbers together (15 × 45 = 675).' },
            { text: 'Analyze the optical effect on the light cone (higher magnification objective lenses have smaller lens apertures.' },
            { text: 'Conclude that the total magnification is 675X with a high-resolution, narrow field of view.', faded: true, blankAnswer: 'Total magnification is 675X, meaning the specimen appears.' }
            ] } },
        { type: 'case', nodeId: 'c8_bio_ch1_3', title: 'Cell: Basic Unit of Life - Structure and Components',
          caseStudy: { intro: 'When you look at a brick wall of a house in your neighborhood, you notice it is made of hundreds of individual bricks joined together by cement.',
            decisions: [{ prompt: 'What is the primary reason why a cell is referred to as the structural unit of living organisms?', options: [
                { text: 'A cell is the structural unit', outcome: 'A cell is the structural unit because all living bodies are constructed from cells, much like.' },
                { text: 'cells give energy', outcome: 'Not quite — Students often think that all cells in an organism look identical and perform the same task.', reveals: 'all-cells-in-an-organism' },
                { text: 'cells only exist in plants', outcome: 'Not quite — Students often think that all cells in an organism look identical and perform the same task.', reveals: 'all-cells-in-an-organism' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_bio_ch1_10', title: 'Identify each idea',
          dissect: { specimen: 'The Invisible Living World: Beyond Our Naked Eye · Part 1/2', spots: [
            { id: 's1', label: 'Discovery of the Microscopic World Hooke and Leeuwenhoek', prompt: 'Which idea is this? — The discovery of the microscopic world refers to the historical breakthrough in the 17th.', answer: 'Discovery of the Microscopic World Hooke and Leeuwenhoek', options: ['Discovery of the Microscopic World Hooke and Leeuwenhoek', 'Microorganisms in Food Yeast in Baking Fermentation', 'Microscope Tool for Observing Tiny Organisms', 'Cell Basic Unit of Life - Structure and Components'] },
            { id: 's2', label: 'Microorganisms in Food Yeast in Baking Fermentation', prompt: 'Which idea is this? — Fermentation is an anaerobic biological process in which microorganisms, particularly.', answer: 'Microorganisms in Food Yeast in Baking Fermentation', options: ['Microorganisms in Food Yeast in Baking Fermentation', 'Discovery of the Microscopic World Hooke and Leeuwenhoek', 'Microscope Tool for Observing Tiny Organisms', 'Cell Basic Unit of Life - Structure and Components'] },
            { id: 's3', label: 'Microscope Tool for Observing Tiny Organisms', prompt: 'Which idea is this? — A microscope is an optical instrument that uses lenses to magnify the image of tiny.', answer: 'Microscope Tool for Observing Tiny Organisms', options: ['Microscope Tool for Observing Tiny Organisms', 'Discovery of the Microscopic World Hooke and Leeuwenhoek', 'Microorganisms in Food Yeast in Baking Fermentation', 'Cell Basic Unit of Life - Structure and Components'] },
            { id: 's4', label: 'Cell Basic Unit of Life - Structure and Components', prompt: 'Which idea is this? — A cell is the fundamental structural, functional, and biological unit of all living.', answer: 'Cell Basic Unit of Life - Structure and Components', options: ['Cell Basic Unit of Life - Structure and Components', 'Discovery of the Microscopic World Hooke and Leeuwenhoek', 'Microorganisms in Food Yeast in Baking Fermentation', 'Microscope Tool for Observing Tiny Organisms'] }
          ] } },
        { type: 'case', nodeId: 'c8_bio_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'At a science exhibition, a poster says: \'Robert Hooke discovered living cells swimming around in cork, and Leeuwenhoek invented the multi-lens compound microscope.\' A visitor asks the student presenter if the poster is accurate.',
            decisions: [{ prompt: 'What should the presenter correct?', options: [
                { text: 'Swap both claims: Hooke saw only dead, empty box-like walls in cork bark — he named them \'cells\' after monks\' rooms — while Leeuwenhoek used a single finely ground lens to watch living microbes moving in pond water.', outcome: 'This assigns each scientist his real contribution: dead plant walls versus living animalcules, compound versus simple high-power lens.' },
                { text: 'The poster is right — the man who named cells must have seen them alive, and more lenses always means a better microscope.', outcome: 'Cork cells were dead walls with nothing living inside, and Leeuwenhoek\'s single hand-ground lenses out-magnified the blurry compound scopes of the day.', reveals: 'hooke-saw-living-cells' },
                { text: 'Neither matters — both men proved the full cell theory that all organisms are made of cells, so the details are interchangeable.', outcome: 'Hooke only saw empty walls and cell theory took two more centuries of work; crediting either man with the finished theory skips the entire history.', reveals: 'instant-cell-theory' }
            ] }] } },
        { type: 'case', nodeId: 'c8_bio_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'Everything alive — from a mango tree to you — is built from boxes too small to see. The microscope didn\'t just magnify; it revealed where life actually lives.',
            decisions: [{ prompt: 'What comes next? The Invisible Living World: Beyond Our Naked Eye · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Invisible Living World: Beyond Our Naked Eye · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_bio_ch1_1', difficulty: 'standard',
          question: 'The discovery of the microscopic world refers to the historical breakthrough.',
          hint: 'Review basic optics of convex lenses and how light bends to form enlarged virtual images.',
          misconception: 'Students often think that Robert Hooke discovered living animal cells floating around when he looked at cork, or that.',
          parts: [
                { id: 'a', prompt: 'What specific plant material did Robert Hooke examine when he first observed and named "cells"?', answer: 'Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree',
                  options: ['Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree', 'onion peel', 'pond water'],
                  hint: 'Review basic optics of convex lenses and how light bends to form enlarged virtual images.',
                  misconception: 'Students often think that Robert Hooke discovered living animal cells floating around when he looked at cork, or that Leeuwenhoek invented.' }
          ],
            remediations: { 'robert-hooke-discovered-living-animal': { steps: ['To fix this misconception, have the student draw a comparison table: Column 1 for Hooke (cork, dead plant walls.', 'Emphasize that "cells" in cork were actually the rigid cellulose walls left behind after the living plant matter died.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_10', difficulty: 'standard',
          question: 'Beneficial microorganisms such as bacteria and fungi act as natural decomposers.',
          hint: 'Review c8_bio_ch1_9 to reinforce the structural characteristics and nutritional modes.',
          misconception: 'Students often believe that dead leaves and animal waste simply "disappear" or dissolve into the soil on their own over.',
          parts: [
                { id: 'a', prompt: 'Why does a compost heap in a garden warm up naturally as organic waste breaks down?', answer: 'A compost heap warms up',
                  options: ['A compost heap warms up', 'disappear'],
                  hint: 'Review c8_bio_ch1_9 to reinforce the structural characteristics and nutritional modes of fungi and.',
                  misconception: 'Students often believe that dead leaves and animal waste simply "disappear" or dissolve into the soil on their own over time through.' }
          ],
            remediations: { 'dead-leaves-and-animal-waste': { steps: ['To fix this misconception, have the student examine a sample of rotting leaf litter under a simple microscope or hand.', 'Explain that rain and sun only soften the material, but living microbes are the chemical workers that actually tear.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that dead leaves and animal waste simply "disappear" or dissolve into the soil on their own over.',
          parts: [
                { id: 'a', prompt: 'Design a simple school science experiment using dry leaves, soil, and plastic containers to prove that microorganisms are necessary for leaf litter.', answer: 'A good design involves taking two identical containers with dry leaves and soil:',
                  options: ['A good design involves taking two identical containers with dry leaves and soil:', 'disappear'],
                  hint: 'Review c8_bio_ch1_9 to reinforce the structural characteristics and nutritional modes of fungi and.',
                  misconception: 'Students often believe that dead leaves and animal waste simply "disappear" or dissolve into the soil on their own over time through.' }
          ],
            remediations: { 'dead-leaves-and-animal-waste': { steps: ['To fix this misconception, have the student examine a sample of rotting leaf litter under a simple microscope or hand.', 'Explain that rain and sun only soften the material, but living microbes are the chemical workers that actually tear.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_11', difficulty: 'standard',
          question: 'Fermentation is an anaerobic biological process in which microorganisms.',
          hint: 'Review cellular respiration basics from prior classes and the definition of fungi.',
          misconception: 'Students often believe that yeast \'bakes\' the bread itself or that baking is a chemical reaction entirely separate from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fermentation is an anaerobic biological process in',
                  options: ['Fermentation is an anaerobic biological process in', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'Beneficial microorganisms such as bacteria and fungi act as natural decomposers by', 'Harmful microorganisms are disease-causing microbes (pathogens such as certain bacteria,'],
                  hint: 'Review cellular respiration basics from prior classes and the definition of fungi as eukaryotic.',
                  misconception: 'Students often believe that yeast \'bakes\' the bread itself or that baking is a chemical reaction entirely separate from living organisms.' }
          ],
            remediations: { 'yeast-bakes-the-bread-itself': { steps: ['To correct this misconception, guide the student to observe live yeast under a microscope or perform a simple bubble.', 'Emphasize that bubbles of gas form because living cells are consuming sugar and exhaling carbon dioxide, unlike baking.', 'Reinforce that yeast cells are tiny living factories performing cellular processes just like larger organisms.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_12', difficulty: 'standard',
          question: 'Harmful microorganisms are disease-causing microbes (pathogens such as certain.',
          hint: 'Review c8_bio_ch1_9 to reinforce the structural characteristics of bacteria, fungi, and.',
          misconception: 'Students often believe that food spoilage microorganisms originate spontaneously inside the food itself, rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Harmful microorganisms are disease-causing microbes (pathogens such as certain bacteria,',
                  options: ['Harmful microorganisms are disease-causing microbes (pathogens such as certain bacteria,', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'Beneficial microorganisms such as bacteria and fungi act as natural decomposers by', 'Fermentation is an anaerobic biological process in'],
                  hint: 'Review c8_bio_ch1_9 to reinforce the structural characteristics of bacteria, fungi, and viruses.',
                  misconception: 'Students often believe that food spoilage microorganisms originate spontaneously inside the food itself, rather than understanding that.' }
          ],
            remediations: { 'food-spoilage-microorganisms-originate-spontaneo': { steps: ['To correct this misconception, perform a sealed-container demonstration: take two boiled milk samples, seal one tightly.', 'Observe both after 24 hours to see that only the open milk spoils, proving that airborne microbes are the active agents.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_2', difficulty: 'standard',
          question: 'A microscope is an optical instrument that uses lenses to magnify the image.',
          hint: 'Review basic optics and how magnifying glasses work before tackling compound microscope.',
          misconception: 'Students often think that a microscope makes an object heavier or physically larger in reality, rather than just.',
          parts: [
                { id: 'a', prompt: 'Which part of a compound microscope is closest to the specimen being observed on the glass slide?', answer: 'The objective lens is closest to the specimen',
                  options: ['The objective lens is closest to the specimen', 'eyepiece', 'ocular lens'],
                  hint: 'Review basic optics and how magnifying glasses work before tackling compound microscope.',
                  misconception: 'Students often think that a microscope makes an object heavier or physically larger in reality, rather than just producing an optical.' }
          ],
            remediations: { 'a-microscope-makes-an-object': { steps: ['To fix this misconception, have the student hold a magnifying glass over a printed textbook page, noting that the.', 'Explain that lenses only bend light rays to trick our eyes into seeing a larger virtual image.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_3', difficulty: 'standard',
          question: 'A cell is the fundamental structural, functional, and biological unit of all.',
          hint: 'Review c8_bio_ch1_2 to understand how magnification reveals hidden biological structures.',
          misconception: 'Students often think that all cells in an organism look identical and perform the same task, believing a skin cell.',
          parts: [
                { id: 'a', prompt: 'What is the primary reason why a cell is referred to as the structural unit of living organisms?', answer: 'A cell is the structural unit',
                  options: ['A cell is the structural unit', 'cells give energy', 'cells only exist in plants'],
                  hint: 'Review c8_bio_ch1_2 to understand how magnification reveals hidden biological structures.',
                  misconception: 'Students often think that all cells in an organism look identical and perform the same task, believing a skin cell is identical in shape.' }
          ],
            remediations: { 'all-cells-in-an-organism': { steps: ['To fix this misconception, have the student examine two completely different slides under a microscope—such as cheek.', 'Emphasize that multicellular organisms are made of billions of specialized cells, just like a massive school has.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
