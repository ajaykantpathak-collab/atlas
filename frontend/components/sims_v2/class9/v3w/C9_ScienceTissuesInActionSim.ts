import type { SimDef } from '../../engine/types';
import C9_ScienceTissuesInActionSim from '../../../simulations/c6_12/C9_ScienceTissuesInActionSim';

/** v3 wrapped master — C9_ScienceTissuesInActionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_sciencetissuesinactionsim: SimDef = {
    id: 'v3w_c9_sciencetissuesinactionsim',
    title: 'Tissues In Action',
    subtitle: 'Covers the fundamental distinction between meristematic and permanent tissues in plants,.',
    classLevel: 9, subject: 'science', topic: 'Plant Tissues: Meristematic vs Permanent Tissues',
    chapters: [],
    nodeIds: ['c9_bio_ch2_1', 'c9_bio_ch2_2', 'c9_bio_ch2_3', 'c9_bio_ch2_4', 'c9_bio_ch2_6', 'c9_bio_ch2_8', 'c9_bio_ch3_2', 'c9_bio_ch3_11'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe a young mango sapling growing taller each month and a mature banyan tree trunk thickening over years.', goal: 'Master Tissues In Action.' },
    discovery: {
        question: 'A student examines a transverse section of a maize stem and sees thick-walled, lignified, dead cells with narrow lumens surrounding the vascular bundles.',
        options: ['This is sclerenchyma (specifically fibers)', 'parenchyma', 'no change'],
        answer: 'This is sclerenchyma (specifically fibers)',
        hook: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see.',
    },
    teaching: [
        { title: 'Meristematic tissue consists of.', text: 'Meristematic tissue consists of undifferentiated, actively dividing cells with dense cytoplasm, thin cell walls, and prominent nuclei that retain the capacity for continuous division, while permanent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_bio_ch2_1', title: 'Meristematic tissue consists of.',
          scaffold: { problem: 'A Class 9 student observes two slides: Slide A shows small, isodiametric cells with thin walls, dense cytoplasm, large nuclei, and no.',
            steps: [
            { text: 'Identify Slide A as meristematic tissue based on cellular features — small size, thin walls, dense cytoplasm, prominent.' },
            { text: 'Identify Slide B as xylem vessel element (complex permanent tissue) based on thick lignified secondary walls, hollow.' },
            { text: 'Trace origin: meristematic cells (Slide A) undergo mitotic divisions → daughter cells differentiate → some become.' },
            { text: 'Analyze functional transformation: loss of protoplasm creates continuous hollow pipe; lignin provides rigidity against.' },
            { text: 'Conclude: meristematic tissue provides raw cellular material; differentiation tailors cells for specific roles —.', faded: true, blankAnswer: 'Slide A = meristematic tissue; Slide B = xylem vessel.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch2_2', title: 'Meristematic tissues are groups of.',
          scaffold: { problem: 'A gardener notices that after pruning the tip of a rose bush (dicot), several lateral branches start growing vigorously from nodes below.',
            steps: [
            { text: 'Identify the meristem removed in each case — rose tip removal excises the shoot apical meristem; maize tip removal also.' },
            { text: 'Recall that in dicots (rose), removal of apical meristem releases lateral buds from apical dominance, allowing axillary.' },
            { text: 'Recall that in monocots like maize, intercalary meristems at nodes and internodes are responsible for elongation; the.' },
            { text: 'Trace cause-effect: Rose — apical meristem gone → auxin flow stops → lateral buds activate → new branches from their.' },
            { text: 'Conclude: The difference arises because dicots rely on apical meristems for primary growth and have active lateral.', faded: true, blankAnswer: 'Rose bush grows lateral branches because removal of shoot.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch2_3', title: 'Simple permanent tissues are groups of.',
          scaffold: { problem: 'A farmer notices that his young tomato plants snap easily in the wind, but mature plants withstand strong gusts.',
            steps: [
            { text: 'Identify the tissues involved—young stems rely on collenchyma for flexible support; mature stems develop sclerenchyma.' },
            { text: 'Recall the developmental sequence—procambium and ground meristem produce primary tissues first (parenchyma,.' },
            { text: 'Apply the mechanical properties—collenchyma\'s uneven primary walls allow bending without breaking (plastic elasticity);.' },
            { text: 'Trace the cause-effect chain—wind applies dynamic load; young stem with only collenchyma exceeds its elastic limit and.' },
            { text: 'Verify with plant anatomy—cross-sections show collenchyma in young tomato stem cortex; mature stem shows continuous.', faded: true, blankAnswer: 'Young tomato stems depend on living collenchyma with uneven.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch2_4', title: 'Complex permanent tissues are.',
          scaffold: { problem: 'A transverse section of a sunflower stem shows vascular bundles arranged in a ring.',
            steps: [
            { text: 'Identify the tissue types - xylem (water conduction, mechanical support) and phloem (food translocation).' },
            { text: 'Analyze xylem components - vessels and tracheids conduct water; xylem fibers (sclerenchyma) provide tensile strength.' },
            { text: 'Analyze phloem components - sieve tubes conduct photosynthates; companion cells load/unload sugars; phloem fibers add.' },
            { text: 'Relate spatial arrangement - xylem interior resists compression (weight of stem), phloem exterior resists tension.' },
            { text: 'Synthesize - The vascular bundle is a structural unit where dead xylem cells form rigid pipes + support, living phloem.', faded: true, blankAnswer: 'Sunflower stem vascular bundles combine transport and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch2_6', title: 'Connective tissue is a type of animal.',
          scaffold: { problem: 'A 12-year-old boy falls while playing cricket and fractures his forearm.',
            steps: [
            { text: 'Identify the injury — bone fracture damages bone tissue (specialized connective tissue) and periosteum (dense irregular.' },
            { text: 'Recall healing stages — hematoma forms (blood connective tissue), then granulation tissue (areolar connective tissue.' },
            { text: 'Soft callus formation — fibroblasts and chondroblasts produce fibrocartilage (a type of dense connective tissue with.' },
            { text: 'Hard callus formation — osteoblasts replace fibrocartilage with woven bone (immature bone connective tissue) via.' },
            { text: 'Remodeling — osteoclasts and osteoblasts reshape the bone to original architecture; the sequence ensures initial.', faded: true, blankAnswer: 'The stages involve blood (hematoma), areolar tissue.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_bio_ch2_8', title: 'Nervous tissue is a specialized animal.',
          scaffold: { problem: 'A person steps on a sharp thorn barefoot. Trace the complete path of the nerve impulse from the skin receptor to the withdrawal of the.',
            steps: [
            { text: 'Identify the stimulus (mechanical pain) and receptor type (nociceptor in skin) - this initiates the process' },
            { text: 'Determine the first neuron: sensory neuron carries impulse FROM receptor TOWARD spinal cord (dorsal root ganglion) -.' },
            { text: 'Locate the synapse in spinal cord gray matter: sensory neuron synapses with interneuron - impulse crosses via.' },
            { text: 'Interneuron processes and relays impulse to motor neuron in ventral horn - this is the CNS processing step' },
            { text: 'Motor neuron carries impulse AWAY from spinal cord via ventral root TO effector (leg muscles) - note multipolar.' },
            { text: 'Verify directionality at each stage: receptor → sensory → interneuron → motor → effector (one-way flow)', faded: true, blankAnswer: 'Pain receptor (skin) → Sensory neuron (dorsal root.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_bio_ch2_2', title: 'Identify each idea',
          dissect: { specimen: 'Tissues In Action', spots: [
            { id: 's1', label: 'Meristematic tissue consists of undifferentiated', prompt: 'Which idea is this? — Meristematic tissue consists of undifferentiated, actively dividing cells with dense.', answer: 'Meristematic tissue consists of undifferentiated', options: ['Meristematic tissue consists of undifferentiated', 'Meristematic tissues are groups of', 'Simple permanent tissues are groups', 'Complex permanent tissues are heterogeneous'] },
            { id: 's2', label: 'Meristematic tissues are groups of', prompt: 'Which idea is this? — Meristematic tissues are groups of immature, undifferentiated plant cells that retain the.', answer: 'Meristematic tissues are groups of', options: ['Meristematic tissues are groups of', 'Meristematic tissue consists of undifferentiated', 'Simple permanent tissues are groups', 'Complex permanent tissues are heterogeneous'] },
            { id: 's3', label: 'Simple permanent tissues are groups', prompt: 'Which idea is this? — Simple permanent tissues are groups of structurally similar, non-dividing cells derived.', answer: 'Simple permanent tissues are groups', options: ['Simple permanent tissues are groups', 'Meristematic tissue consists of undifferentiated', 'Meristematic tissues are groups of', 'Complex permanent tissues are heterogeneous'] },
            { id: 's4', label: 'Complex permanent tissues are heterogeneous', prompt: 'Which idea is this? — Complex permanent tissues are heterogeneous tissues composed of multiple cell types.', answer: 'Complex permanent tissues are heterogeneous', options: ['Complex permanent tissues are heterogeneous', 'Meristematic tissue consists of undifferentiated', 'Meristematic tissues are groups of', 'Simple permanent tissues are groups'] },
            { id: 's5', label: 'Connective tissue is a type', prompt: 'Which idea is this? — Connective tissue is a type of animal tissue characterized by widely spaced cells.', answer: 'Connective tissue is a type', options: ['Connective tissue is a type', 'Meristematic tissue consists of undifferentiated', 'Meristematic tissues are groups of', 'Simple permanent tissues are groups'] },
            { id: 's6', label: 'Nervous tissue is a specialized', prompt: 'Which idea is this? — Nervous tissue is a specialized animal tissue composed of neurons (structural and.', answer: 'Nervous tissue is a specialized', options: ['Nervous tissue is a specialized', 'Meristematic tissue consists of undifferentiated', 'Meristematic tissues are groups of', 'Simple permanent tissues are groups'] }
          ] } }
    ],
    explore: { component: C9_ScienceTissuesInActionSim, prompt: 'Explore the interactive — Tissues In Action' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch2_1', difficulty: 'standard',
          question: 'Meristematic tissue consists of undifferentiated, actively dividing cells with.',
          hint: 'Review c8_bio_ch1_3 (plant cell structure) and c8_bio_ch1_8 (levels of organisation) —.',
          misconception: 'Students believe meristematic tissue exists only at root and shoot tips (apical), forgetting that intercalary meristems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Meristematic tissue consists of undifferentiated, actively dividing cells with dense',
                  options: ['Meristematic tissue consists of undifferentiated, actively dividing cells with dense', 'Meristematic tissues are groups of immature, undifferentiated plant cells that retain the', 'Simple permanent tissues are groups of structurally similar, non-dividing cells derived', 'Complex permanent tissues are heterogeneous tissues composed of multiple cell types'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe meristematic tissue exists only at root and shoot tips (apical), forgetting that intercalary meristems at grass nodes and.' }
          ],
            remediations: { 'meristematic-tissue-exists-only-at': { steps: ['Show time-lapse video of grass regrowth after cutting — highlight node region.', 'Provide cross-sections of maize stem (monocot, intercalary) and sunflower stem (dicot, lateral) for microscopy.', 'Guide student to label meristematic zones in each and predict regrowth capacity.', 'Connect to farming practice: why lawn grass survives mowing but saplings die if tip is removed.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_2', difficulty: 'standard',
          question: 'Meristematic tissues are groups of immature, undifferentiated plant cells that.',
          hint: 'If stuck, revisit c9_bio_ch2_1 to review the definition and features of meristematic vs.',
          misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they.',
          parts: [
                { id: 'a', prompt: 'Name the three types of meristematic tissues classified on the basis of their location in the plant body.', answer: 'The three types are apical meristem, lateral meristem, and intercalary meristem',
                  options: ['The three types are apical meristem, lateral meristem, and intercalary meristem', 'grasses grow tall only from their tips like trees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they think grasses grow.' },
                { id: 'b', prompt: 'A farmer cuts the top of a young maize plant (apical meristem removed) but leaves the lower nodes intact.', answer: 'The maize plant will not grow taller from the cut tip',
                  options: ['The maize plant will not grow taller from the cut tip', 'grasses grow tall only from their tips like trees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they think grasses grow.' }
          ],
            remediations: { 'intercalary-meristems-are-a-subtype': { steps: ['Show a time-lapse video (or series of photos) of grass regrowing after cutting vs a tree branch not regrowing from the.', 'Have students mark nodes on a grass stem with a pen, cut above a node, and measure daily growth at each node for a week.', 'Compare with onion root tip observation under microscope.', 'Explicitly contrast: "Apical = tip only; Intercalary = nodes/internodes; Lateral = sides."', 'Ask students to explain why lawn grass survives mowing but a mango sapling does not if its tip is cut.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Lateral meristems are present in all plants and are responsible for both primary and secondary growth." Evaluate this statement and correct.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'grasses grow tall only from their tips like trees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that intercalary meristems are a subtype of apical meristems because both cause elongation, and they think grasses grow.' }
          ],
            remediations: { 'intercalary-meristems-are-a-subtype': { steps: ['Show a time-lapse video (or series of photos) of grass regrowing after cutting vs a tree branch not regrowing from the.', 'Have students mark nodes on a grass stem with a pen, cut above a node, and measure daily growth at each node for a week.', 'Compare with onion root tip observation under microscope.', 'Explicitly contrast: "Apical = tip only; Intercalary = nodes/internodes; Lateral = sides."', 'Ask students to explain why lawn grass survives mowing but a mango sapling does not if its tip is cut.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_3', difficulty: 'standard',
          question: 'Simple permanent tissues are groups of structurally similar, non-dividing cells.',
          hint: 'Revisit c9_bio_ch2_2 (meristematic differentiation) and c8_bio_ch1_7 (cell.',
          misconception: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see.',
          parts: [
                { id: 'a', prompt: 'A student examines a transverse section of a maize stem and sees thick-walled, lignified, dead cells with narrow lumens surrounding the vascular bundles.', answer: 'This is sclerenchyma (specifically fibers)',
                  options: ['This is sclerenchyma (specifically fibers)', 'parenchyma', 'no change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see collenchyma\'s corner.' }
          ],
            remediations: { 'all-thick-walled-plant-cells': { steps: ['Prepare fresh transverse sections of pumpkin petiole (collenchyma ridges) and pear fruit (stone cells/sclereids).', 'Stain with phloroglucinol-HCl: collenchyma stays unstained (no lignin), sclereids turn red (lignin present).', 'Observe under low power: collenchyma cells have living cytoplasm, intact nucleus; sclereids are empty, thick-walled.', 'Ask: "Which tissue can still divide if wounded?" (Parenchyma/collenchyma can dedifferentiate; sclerenchyma cannot).'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Sclerenchyma is the most important simple permanent tissue because it provides the main structural support to the plant." Justify.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'thick wall = dead cell'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **all thick-walled plant cells are sclerenchyma** and that "thick wall = dead cell." They see collenchyma\'s corner.' }
          ],
            remediations: { 'all-thick-walled-plant-cells': { steps: ['Prepare fresh transverse sections of pumpkin petiole (collenchyma ridges) and pear fruit (stone cells/sclereids).', 'Stain with phloroglucinol-HCl: collenchyma stays unstained (no lignin), sclereids turn red (lignin present).', 'Observe under low power: collenchyma cells have living cytoplasm, intact nucleus; sclereids are empty, thick-walled.', 'Ask: "Which tissue can still divide if wounded?" (Parenchyma/collenchyma can dedifferentiate; sclerenchyma cannot).'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_4', difficulty: 'standard',
          question: 'Complex permanent tissues are heterogeneous tissues composed of multiple cell.',
          hint: 'If stuck, review c9_bio_ch2_3 (simple permanent tissues) to see how parenchyma and.',
          misconception: 'Students believe phloem transports food "downward only" from leaves to roots.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Complex permanent tissues are heterogeneous tissues composed of multiple cell types',
                  options: ['Complex permanent tissues are heterogeneous tissues composed of multiple cell types', 'Meristematic tissue consists of undifferentiated, actively dividing cells with dense', 'Meristematic tissues are groups of immature, undifferentiated plant cells that retain the', 'Simple permanent tissues are groups of structurally similar, non-dividing cells derived'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe phloem transports food "downward only" from leaves to roots.' }
          ],
            remediations: { 'phloem-transports-food-downward-only': { steps: ['Show a time-lapse video of radioactive carbon-14 labeling in a plant - students see label move both up and down from a.', 'Use the "source-sink" card game: give cards labeled "mature leaf (source)", "young leaf (sink)", "root (storage)",.', 'Have them dissect a germinating bean seed - observe food moving from cotyledons (source) upward to plumule (sink) via.', 'Assign a writing task: "Explain why a gardener removes lower leaves on tomato plants" - connects source-sink to.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe phloem transports food "downward only" from leaves to roots.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since xylem cells are dead, they cannot transport anything - transport requires living cells." Evaluate this statement and identify the.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'downward only', 'phloem transports food "downward only" from leaves to roots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe phloem transports food "downward only" from leaves to roots.' }
          ],
            remediations: { 'phloem-transports-food-downward-only': { steps: ['Show a time-lapse video of radioactive carbon-14 labeling in a plant - students see label move both up and down from a.', 'Use the "source-sink" card game: give cards labeled "mature leaf (source)", "young leaf (sink)", "root (storage)",.', 'Have them dissect a germinating bean seed - observe food moving from cotyledons (source) upward to plumule (sink) via.', 'Assign a writing task: "Explain why a gardener removes lower leaves on tomato plants" - connects source-sink to.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_6', difficulty: 'standard',
          question: 'Connective tissue is a type of animal tissue characterized by widely spaced.',
          hint: 'Review c8_bio_ch1_8 (Levels of Organisation) and c9_bio_ch2_5 (Epithelial Tissue) to.',
          misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining.',
          parts: [
                { id: 'a', prompt: 'Name the three main components of the extracellular matrix in connective tissue and state one function of each.', answer: 'The three main components are: (1) Collagen fibers',
                  options: ['The three main components are: (1) Collagen fibers', 'connective tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' },
                { id: 'b', prompt: 'Why is blood classified as a connective tissue even though it flows and does not "connect" things like bone or cartilage?', answer: 'Blood is classified as connective tissue',
                  options: ['Blood is classified as connective tissue', 'because it is red', 'because it flows'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' },
                { id: 'c', prompt: 'A patient has a deep cut that heals with a scar. Which type of connective tissue forms the scar, and why does it lack the flexibility of the original skin?', answer: 'Dense regular connective tissue (collagen-rich) forms the scar',
                  options: ['Dense regular connective tissue (collagen-rich) forms the scar', 'areolar tissue', 'adipose tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' }
          ],
            remediations: { 'connective-tissue-only-means-tissues': { steps: ['Revisit the definition of tissue from c8_bio_ch1_8 — emphasize that classification is based on cell-matrix relationship.', 'Create a table with columns: Tissue Name, Matrix Type, Fiber Types, Main Cells, Primary Function.', 'Use the table to answer "Why is X a connective tissue?" for each type.', 'Practice with a micrograph identification worksheet (label matrix, fibers, cells) to reinforce visual recognition.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Adipose tissue is just loose connective tissue with fat cells; therefore it cannot have a specialized function like insulation or.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'connective tissue'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "connective tissue" only means tissues that physically join two structures (like ligaments joining bone to bone), and.' }
          ],
            remediations: { 'connective-tissue-only-means-tissues': { steps: ['Revisit the definition of tissue from c8_bio_ch1_8 — emphasize that classification is based on cell-matrix relationship.', 'Create a table with columns: Tissue Name, Matrix Type, Fiber Types, Main Cells, Primary Function.', 'Use the table to answer "Why is X a connective tissue?" for each type.', 'Practice with a micrograph identification worksheet (label matrix, fibers, cells) to reinforce visual recognition.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_8', difficulty: 'standard',
          question: 'Nervous tissue is a specialized animal tissue composed of neurons (structural.',
          hint: 'Review Class 8 cell structure (c8_bio_ch1_3) and levels of organisation (c8_bio_ch1_8) -.',
          misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of.',
          parts: [
                { id: 'a', prompt: 'A student observes a neuron under microscope and sees a long fiber with periodic constrictions (gaps) along its length.', answer: 'The fiber is a myelinated axon',
                  options: ['The fiber is a myelinated axon', 'gaps insulate the axon', 'speed would increase'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of Ranvier are "breaks in.' },
                { id: 'b', prompt: 'Compare the structure and function of a sensory neuron, a motor neuron, and an interneuron. Why are interneurons found only in the central nervous system?', answer: 'Sensory neuron: long dendrite, short axon, carries impulse from receptor → CNS',
                  options: ['Sensory neuron: long dendrite, short axon, carries impulse from receptor → CNS', 'breaks in the neuron', 'myelin is made of neuron cytoplasm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of Ranvier are "breaks in.' }
          ],
            remediations: { 'the-myelin-sheath-is-part': { steps: ['Show a labeled diagram of axon cross-section with Schwann cell nucleus visible outside the myelin layers.', 'Ask "Whose nucleus is this?" - guide to realize it\'s not the neuron\'s.', 'Use analogy: neuron = electrical wire, Schwann cell = plastic insulation applied BY a different worker.', 'Have student redraw neuron + two Schwann cells wrapping it, labeling "neuron membrane" vs "Schwann cell membrane".', 'Practice board-style question: "Myelin sheath is formed by (a) neuron (b) Schwann cell (c) both" - reinforce correct.'] } } },
        { type: 'subpart', nodeId: 'c9_bio_ch2_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of.',
          parts: [
                { id: 'a', prompt: 'A Class 9 student argues: "Since neurons don\'t divide, nervous tissue cannot repair itself after injury." Evaluate this statement.', answer: 'Partially correct',
                  options: ['Partially correct', 'breaks in the neuron', 'myelin is made of neuron cytoplasm', 'nodes are where the axon is thinnest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of Ranvier are "breaks in.' },
                { id: 'b', prompt: 'Compare the structure and function of a sensory neuron, a motor neuron, and an interneuron. Why are interneurons found only in the central nervous system?', answer: 'Sensory neuron: long dendrite, short axon, carries impulse from receptor → CNS',
                  options: ['Sensory neuron: long dendrite, short axon, carries impulse from receptor → CNS', 'breaks in the neuron', 'myelin is made of neuron cytoplasm', 'nodes are where the axon is thinnest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the myelin sheath is part of the neuron itself (like a coating the neuron makes), and that nodes of Ranvier are "breaks in.' }
          ],
            remediations: { 'the-myelin-sheath-is-part': { steps: ['Show a labeled diagram of axon cross-section with Schwann cell nucleus visible outside the myelin layers.', 'Ask "Whose nucleus is this?" - guide to realize it\'s not the neuron\'s.', 'Use analogy: neuron = electrical wire, Schwann cell = plastic insulation applied BY a different worker.', 'Have student redraw neuron + two Schwann cells wrapping it, labeling "neuron membrane" vs "Schwann cell membrane".', 'Practice board-style question: "Myelin sheath is formed by (a) neuron (b) Schwann cell (c) both" - reinforce correct.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
