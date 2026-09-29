import type { SimDef } from '../../engine/types';
import C8_ScienceTheInvisibleLivingWorldBeyondSim from '../../../simulations/c6_12/C8_ScienceTheInvisibleLivingWorldBeyondSim';

/** v3 wrapped master — C8_ScienceTheInvisibleLivingWorldBeyondSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_sciencetheinvisiblelivingworldbeyondsim: SimDef = {
    id: 'v3w_c8_sciencetheinvisiblelivingworldbeyondsim',
    title: 'Discovery of the Microscopic World: Hooke and Leeuwenhoek',
    subtitle: 'Covers the historical discoveries of Hooke and Leeuwenhoek and the initial realization of.',
    classLevel: 8, subject: 'science', topic: 'Discovery of the Microscopic World: Hooke and Leeuwenhoek',
    chapters: [],
    nodeIds: ['c8_bio_ch1_1', 'c8_bio_ch1_2', 'c8_bio_ch1_3', 'c8_bio_ch1_4', 'c8_bio_ch1_8', 'c8_bio_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'When you look at a drop of pond water from a local garden puddle, it looks clear or muddy to your naked eye,.', goal: 'Master Discovery of the Microscopic World: Hooke and Leeuwenhoek.' },
    discovery: {
        question: 'What specific plant material did Robert Hooke examine when he first observed and named "cells"?',
        options: ['Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree', 'onion peel', 'pond water'],
        answer: 'Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree',
        hook: 'Students often think that Robert Hooke discovered living animal cells floating around when he looked at cork, or that.',
    },
    teaching: [
        { title: 'The discovery of the microscopic world.', text: 'The discovery of the microscopic world refers to the historical breakthrough in the 17th century when scientists Robert Hooke and Antonie van Leeuwenhoek used newly invented magnifying instruments to.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_bio_ch1_1', title: 'The discovery of the microscopic world.',
          scaffold: { problem: 'A student examines a slide of dry cork under a light microscope in the school laboratory and sees a honeycomb-like pattern of tiny empty.',
            steps: [
            { text: 'Identify the biological material being observed as cork, which comes from the bark of an oak tree.' },
            { text: 'Recall Robert Hooke\'s 1665 observation where he named these box-like compartments "cells".' },
            { text: 'Analyze the physiological state of cork tissue, recognizing that cork is made of dead plant tissue where only the rigid.' },
            { text: 'Conclude that the spaces are empty cell walls, meaning no living cytoplasm, nucleus, or cellular activity is present.' },
            { text: 'Verify that living cells possess active contents, whereas Hooke\'s historic cork cells were empty architectural.', faded: true, blankAnswer: 'The honeycomb spaces are dead plant cell walls; they are.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch1_2', title: 'A microscope is an optical instrument.',
          scaffold: { problem: 'A student in a Mumbai school sets up a microscope with a 15X ocular lens and a 45X objective lens.',
            steps: [
            { text: 'Identify the magnification values given for both lenses (Eyepiece = 15X, Objective = 45X).' },
            { text: 'Apply the total magnification formula (Total Magnification = Eyepiece × Objective).' },
            { text: 'Multiply the numbers together (15 × 45 = 675).' },
            { text: 'Analyze the optical effect on the light cone (higher magnification objective lenses have smaller lens apertures,.' },
            { text: 'Conclude that the total magnification is 675X with a high-resolution, narrow field of view.', faded: true, blankAnswer: 'Total magnification is 675X, meaning the specimen appears.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch1_3', title: 'A cell is the fundamental structural,.',
          scaffold: { problem: 'A student is given two tissue samples: one from an Elodea leaf (plant) and one from human blood.',
            steps: [
            { text: 'Identify that both plant leaves and human blood are parts of living organisms.' },
            { text: 'Recall the definition of a cell as the fundamental structural and functional unit of life.' },
            { text: 'Analyze the microscopic features of Elodea (contains rigid cells with green chloroplasts) and blood (contains red blood.' },
            { text: 'Conclude that despite differences in shape, size, and contents (form follows function), both are bounded by membranes,.', faded: true, blankAnswer: 'Both are cellular because they are composed of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch1_4', title: 'The cell membrane acts as a selective.',
          scaffold: { problem: 'During a scorching summer afternoon in Delhi, a potted houseplant starts to droop because it is losing water rapidly through transpiration.',
            steps: [
            { text: 'Identify the cell structures involved, namely the flexible cell membrane and the surrounding cytoplasm.' },
            { text: 'Recall the principle of selective permeability where water molecules move across the cell membrane based on.' },
            { text: 'Apply the principle to the water loss scenario: as water leaves the cell due to dry heat, the volume of fluid in the.' },
            { text: 'Trace the cause-effect chain: reduced cytoplasmic volume increases internal concentration, signaling the cell membrane.' },
            { text: 'Conclude that the dynamic interaction between the membrane and cytoplasm helps the cell attempt to preserve internal.', faded: true, blankAnswer: 'Under osmotic stress caused by heat, water exits the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch1_8', title: 'Levels of organisation refer to the.',
          scaffold: { problem: 'Trace the correct hierarchical levels of organisation for water transport in a potted hibiscus plant, starting from the microscopic.',
            steps: [
            { text: 'Identify the fundamental living unit responsible for water intake at the root, which is the root hair cell.' },
            { text: 'Determine the group of similar cells specialised for water transport, which forms the xylem tissue.' },
            { text: 'Identify the plant structure made of multiple tissues (xylem, phloem, epidermis) responsible for transport and support,.' },
            { text: 'Recognize the collective network of roots, stems, and leaves that form the plant\'s transport system.' },
            { text: 'Combine these systems to define the complete living hibiscus plant as the organism.', faded: true, blankAnswer: 'Cell (root hair cell) -> Tissue (xylem tissue) -> Organ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_bio_ch1_9', title: 'Microorganisms are extremely tiny.',
          scaffold: { problem: 'A student collects water from a stagnant pond in Delhi during monsoon season, places a drop under a school microscope, and observes a.',
            steps: [
            { text: 'Analyze the observed characteristics—single-celled, motile, contains a nucleus.' },
            { text: 'Rule out bacteria because bacteria lack a true membrane-bound nucleus (prokaryotic).' },
            { text: 'Rule out algae because algae possess chlorophyll and green pigments for photosynthesis, whereas this organism is.' },
            { text: 'Rule out fungi because fungi typically have rigid cell walls and do not move rapidly with cilia/flagella in water as.' },
            { text: 'Conclude that the organism belongs to the group protozoa (such as *Paramecium*), which are animal-like single-celled.', faded: true, blankAnswer: 'The organism belongs to the group **Protozoa**.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_bio_ch1_2', title: 'Identify each idea',
          dissect: { specimen: 'Discovery of the Microscopic World: Hooke and Leeuwenhoek', spots: [
            { id: 's1', label: 'The discovery of the microscopic', prompt: 'Which idea is this? — The discovery of the microscopic world refers to the historical breakthrough in the 17th.', answer: 'The discovery of the microscopic', options: ['The discovery of the microscopic', 'A microscope is an optical', 'A cell is the fundamental', 'The cell membrane acts as'] },
            { id: 's2', label: 'A microscope is an optical', prompt: 'Which idea is this? — A microscope is an optical instrument that uses lenses to magnify the image of tiny.', answer: 'A microscope is an optical', options: ['A microscope is an optical', 'The discovery of the microscopic', 'A cell is the fundamental', 'The cell membrane acts as'] },
            { id: 's3', label: 'A cell is the fundamental', prompt: 'Which idea is this? — A cell is the fundamental structural, functional, and biological unit of all living.', answer: 'A cell is the fundamental', options: ['A cell is the fundamental', 'The discovery of the microscopic', 'A microscope is an optical', 'The cell membrane acts as'] },
            { id: 's4', label: 'The cell membrane acts as', prompt: 'Which idea is this? — The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm.', answer: 'The cell membrane acts as', options: ['The cell membrane acts as', 'The discovery of the microscopic', 'A microscope is an optical', 'A cell is the fundamental'] },
            { id: 's5', label: 'Levels of organisation refer to', prompt: 'Which idea is this? — Levels of organisation refer to the hierarchical arrangement of structural units in.', answer: 'Levels of organisation refer to', options: ['Levels of organisation refer to', 'The discovery of the microscopic', 'A microscope is an optical', 'A cell is the fundamental'] },
            { id: 's6', label: 'Microorganisms are extremely tiny living', prompt: 'Which idea is this? — Microorganisms are extremely tiny living organisms—so small that they cannot be seen with.', answer: 'Microorganisms are extremely tiny living', options: ['Microorganisms are extremely tiny living', 'The discovery of the microscopic', 'A microscope is an optical', 'A cell is the fundamental'] }
          ] } }
    ],
    explore: { component: C8_ScienceTheInvisibleLivingWorldBeyondSim, prompt: 'Explore the interactive — Discovery of the Microscopic World: Hooke and Leeuwenhoek' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_bio_ch1_1', difficulty: 'standard',
          question: 'The discovery of the microscopic world refers to the historical breakthrough in.',
          hint: 'Review basic optics of convex lenses and how light bends to form enlarged virtual images.',
          misconception: 'Students often think that Robert Hooke discovered living animal cells floating around when he looked at cork, or that.',
          parts: [
                { id: 'a', prompt: 'What specific plant material did Robert Hooke examine when he first observed and named "cells"?', answer: 'Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree',
                  options: ['Robert Hooke examined a thin slice of cork obtained from the bark of an oak tree', 'onion peel', 'pond water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that Robert Hooke discovered living animal cells floating around when he looked at cork, or that Leeuwenhoek invented.' }
          ],
            remediations: { 'robert-hooke-discovered-living-animal': { steps: ['To fix this misconception, have the student draw a comparison table: Column 1 for Hooke (cork, dead plant walls,.', 'Emphasize that "cells" in cork were actually the rigid cellulose walls left behind after the living plant matter died.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_2', difficulty: 'standard',
          question: 'A microscope is an optical instrument that uses lenses to magnify the image of.',
          hint: 'Review basic optics and how magnifying glasses work before tackling compound microscope.',
          misconception: 'Students often think that a microscope makes an object heavier or physically larger in reality, rather than just.',
          parts: [
                { id: 'a', prompt: 'Which part of a compound microscope is closest to the specimen being observed on the glass slide?', answer: 'The objective lens is closest to the specimen',
                  options: ['The objective lens is closest to the specimen', 'eyepiece', 'ocular lens'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a microscope makes an object heavier or physically larger in reality, rather than just producing an optical,.' }
          ],
            remediations: { 'a-microscope-makes-an-object': { steps: ['To fix this misconception, have the student hold a magnifying glass over a printed textbook page, noting that the.', 'Explain that lenses only bend light rays to trick our eyes into seeing a larger virtual image.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_3', difficulty: 'standard',
          question: 'A cell is the fundamental structural, functional, and biological unit of all.',
          hint: 'Review c8_bio_ch1_2 to understand how magnification reveals hidden biological structures.',
          misconception: 'Students often think that all cells in an organism look identical and perform the same task, believing a skin cell is.',
          parts: [
                { id: 'a', prompt: 'What is the primary reason why a cell is referred to as the structural unit of living organisms?', answer: 'A cell is the structural unit',
                  options: ['A cell is the structural unit', 'cells give energy', 'cells only exist in plants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all cells in an organism look identical and perform the same task, believing a skin cell is identical in shape.' }
          ],
            remediations: { 'all-cells-in-an-organism': { steps: ['To fix this misconception, have the student examine two completely different slides under a microscope—such as cheek.', 'Emphasize that multicellular organisms are made of billions of specialized cells, just like a massive school has.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that all cells in an organism look identical and perform the same task, believing a skin cell is.',
          parts: [
                { id: 'a', prompt: 'An argument is made that "since bacteria are single-celled and microscopic, they are simpler and less alive than multicellular organisms." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'complexity defines the threshold of life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all cells in an organism look identical and perform the same task, believing a skin cell is identical in shape.' }
          ],
            remediations: { 'all-cells-in-an-organism': { steps: ['To fix this misconception, have the student examine two completely different slides under a microscope—such as cheek.', 'Emphasize that multicellular organisms are made of billions of specialized cells, just like a massive school has.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_4', difficulty: 'standard',
          question: 'The cell membrane acts as a selective barrier enclosing the cell contents, the.',
          hint: 'Review node c8_bio_ch1_3 to re-familiarize yourself with basic cell components and their.',
          misconception: 'Students often believe that the cell membrane is completely solid like a brick wall and prevents anything from entering.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm',
                  options: ['The cell membrane acts as a selective barrier enclosing the cell contents, the cytoplasm', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'A microscope is an optical instrument that uses lenses to magnify the image of tiny', 'A cell is the fundamental structural, functional, and biological unit of all living'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the cell membrane is completely solid like a brick wall and prevents anything from entering or leaving, or.' }
          ],
            remediations: { 'the-cell-membrane-is-completely': { steps: ['To correct this, visualize the cell membrane as a security checkpoint at a modern railway station in India rather than.', 'Only ticketed passengers (specific molecules) are allowed to pass through the gates, while unauthorized individuals are.', 'Review how selective transport allows essential nutrients in while trapping wastes inside until they are ready to be.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_8', difficulty: 'standard',
          question: 'Levels of organisation refer to the hierarchical arrangement of structural.',
          hint: 'Review c8_bio_ch1_3 to reinforce what a cell is before moving to cellular coordination.',
          misconception: 'Students often think that an organ is made of only one type of cell or tissue, similar to how a brick wall is built.',
          parts: [
                { id: 'a', prompt: 'What is the most basic structural and functional unit of life in all living organisms?', answer: 'A cell',
                  options: ['A cell', 'tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that an organ is made of only one type of cell or tissue, similar to how a brick wall is built entirely of identical.' }
          ],
            remediations: { 'an-organ-is-made-of': { steps: ['To fix this misconception, guide the student to examine a complex multi-part object like a bicycle or a smartphone,.', 'Then explain that biological organs like the stomach or heart are similar multi-component structures made of different.', 'Have them review c8_bio_ch1_3 and c8_bio_ch1_8 to see how cells combine into various tissues.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch1_9', difficulty: 'standard',
          question: 'Microorganisms are extremely tiny living organisms—so small that they cannot be.',
          hint: 'Review node c8_bio_ch1_3 to reinforce what a cell is and how single-celled organisms.',
          misconception: 'Students often think that all microorganisms are harmful germs that cause diseases in humans, plants, and animals.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Microorganisms are extremely tiny living organisms—so small that they cannot be seen with',
                  options: ['Microorganisms are extremely tiny living organisms—so small that they cannot be seen with', 'The discovery of the microscopic world refers to the historical breakthrough in the 17th', 'A microscope is an optical instrument that uses lenses to magnify the image of tiny', 'A cell is the fundamental structural, functional, and biological unit of all living'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that all microorganisms are harmful germs that cause diseases in humans, plants, and animals.' }
          ],
            remediations: { 'all-microorganisms-are-harmful-germs': { steps: ['To fix this misconception, guide the student to examine daily life examples: ask them how curd is set from milk using.', 'Explain that without decomposing bacteria and fungi, dead organic matter would pile up indefinitely without recycling.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
