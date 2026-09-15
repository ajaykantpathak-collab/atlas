import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch18_p1: SimDef = {
    id: 'v3_c11_bio_ch18_p1',
    title: 'Neural Control and Coordination · Part 1/2',
    subtitle: 'Anatomy of the cell that turns a hot cup into a pulled-back hand in milliseconds.',
    classLevel: 11, subject: 'biology', topic: 'Neural Control and Coordination · Part 1/2',
    chapters: ['c11_bio_ch18'],
    nodeIds: ['c11_bio_cbse_18_001', 'c11_bio_cbse_18_002', 'c11_bio_cbse_18_003', 'c11_bio_cbse_18_004', 'c11_bio_cbse_18_005', 'c11_bio_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a neurologist tracing why a patient\'s reflexes have slowed', intro: 'Conduction velocity is down in the patient\'s peripheral nerves but the autonomic system looks spared. The difference between those nerves is your first clue.', goal: 'Label neuron structure, classify multipolar, bipolar, and unipolar neurons, and connect myelin and nodes of Ranvier to conduction speed.' },
    discovery: {
        question: 'Your hand leaves a hot chai cup before you feel the burn — signals raced up to 120 m/s along your nerves. Which structural feature of the axon lets impulses effectively leap instead of crawl?',
        options: ['Myelin segments with bare nodes of Ranvier between them — the impulse jumps node to node instead of depolarising every patch of membrane', 'Extra dendrites that catch the signal earlier', 'A wider axon diameter alone, with no insulation', 'Multiple axons per neuron running in parallel'],
        answer: 'Myelin segments with bare nodes of Ranvier between them — the impulse jumps node to node instead of depolarising every patch of membrane',
        hook: 'Myelin isn\'t just insulation — the gaps are the point, turning a slow wave into a hop between nodes.',
    },
    teaching: [
        { title: 'Neuron: Structure and Types', text: 'A neuron is the structural and functional unit of the neural system, specialized for detecting, receiving, and transmitting electrochemical signals via distinct regions: the cell body (soma).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_18_001', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Draw and defend a neuron: dendrites toward the soma, one axon away, Nissl granules manufacturing protein, myelin and nodes setting conduction speed — then predict what broken Schwann cells do to signal velocity.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_001', title: 'Neuron: Structure and Types',
          caseStudy: { intro: 'Observe your hand pulling back instantly when touching a hot cup of chai - this rapid response relies on neurons transmitting signals at speeds up to 120 m/s.',
            decisions: [{ prompt: 'Name the granular bodies found in the cytoplasm of a neuron\'s cell body and dendrites, and state their specific biochemical composition and.', options: [
                { text: 'The granular bodies are Nissl\'s granules (Nissl bodies), composed of rough endoplasmic', outcome: 'The granular bodies are Nissl\'s granules (Nissl bodies), composed of rough endoplasmic reticulum.' },
                { text: 'mitochondria', outcome: 'Not quite — Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one.', reveals: 'unipolar-neurons-have-no-dendrites' },
                { text: 'Golgi bodies', outcome: 'Not quite — Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one.', reveals: 'unipolar-neurons-have-no-dendrites' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_002', title: 'Generation and Conduction of Nerve Impulse',
          caseStudy: { intro: 'When you accidentally touch a hot tawa, your hand pulls back before you even feel the pain — that speed is the nerve impulse in action.',
            decisions: [{ prompt: 'State the exact ionic distribution across the axonal membrane at rest and name the protein responsible for maintaining it.', options: [
                { text: 'At rest, the axoplasm has high K⁺ and negatively charged proteins, low Na⁺', outcome: 'At rest, the axoplasm has high K⁺ and negatively charged proteins, low Na⁺; the extracellular fluid.' },
                { text: 'Na⁺ is high inside', outcome: 'Not quite — Students often believe the action potential *is* the nerve impulse travelling down the axon like.', reveals: 'the-action-potential-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_003', title: 'Synapse: Transmission of Impulse',
          caseStudy: { intro: 'Imagine you accidentally touch a hot tawa (griddle) while making rotis – your hand jerks back before you even feel the pain.',
            decisions: [{ prompt: 'Name the two types of synapses classified by the mechanism of impulse transmission and state the key structural difference between them.', options: [
                { text: 'The two types are electrical synapses and chemical synapses', outcome: 'The two types are electrical synapses and chemical synapses. In electrical synapses, the pre- and.' },
                { text: 'both use neurotransmitters', outcome: 'Not quite — Students often believe that the action potential "jumps" across the synaptic cleft just like.', reveals: 'the-action-potential-jumps-across' },
                { text: 'electrical synapses have a cleft', outcome: 'Not quite — Students often believe that the action potential "jumps" across the synaptic cleft just like.', reveals: 'the-action-potential-jumps-across' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_004', title: 'Central Nervous System: Brain',
          caseStudy: { intro: 'Imagine you are riding a bicycle on a busy Indian street: you see a pothole (visual input), instantly steer away (motor output), feel your heart race.',
            decisions: [{ prompt: 'Name the three meningeal layers surrounding the brain from outermost to innermost, and state which layer is in direct contact with the.', options: [
                { text: 'The three meningeal layers from outermost to innermost are: dura mater (outermost, tough', outcome: 'The three meningeal layers from outermost to innermost are: dura mater (outermost, tough fibrous.' },
                { text: 'arachnoid', outcome: 'Not quite — Students often believe that the cerebrum (cerebral cortex) is the only site of "higher functions".', reveals: 'the-cerebrum-cerebral-cortex-is' },
                { text: 'higher functions', outcome: 'Not quite — Students often believe that the cerebrum (cerebral cortex) is the only site of "higher functions".', reveals: 'the-cerebrum-cerebral-cortex-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_006', title: 'Peripheral Nervous System: Cranial and Spinal Nerves',
          caseStudy: { intro: 'Imagine you accidentally touch a hot tawa while making roti – your hand pulls back instantly before you even feel the pain.',
            decisions: [{ prompt: 'How many pairs of cranial nerves and spinal nerves are present in the human peripheral nervous system?', options: [
                { text: 'There are 12 pairs of cranial nerves and 31 pairs of spinal nerves', outcome: 'There are 12 pairs of cranial nerves and 31 pairs of spinal nerves.' },
                { text: 'How many pairs of ...?', outcome: 'Not quite — Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7.', reveals: 'the-number-of-spinal-nerves' },
                { text: 'the number of spinal nerves equals the number of vertebrae (e', outcome: 'Not quite — Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7.', reveals: 'the-number-of-spinal-nerves' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_18_002', title: 'Identify each idea',
          dissect: { specimen: 'Neural Control and Coordination · Part 1/2', spots: [
            { id: 's1', label: 'Neuron Structure and Types', prompt: 'Which idea is this? — A neuron is the structural and functional unit of the neural system, specialized for.', answer: 'Neuron Structure and Types', options: ['Neuron Structure and Types', 'Generation and Conduction of Nerve Impulse', 'Synapse Transmission of Impulse', 'Central Nervous System Brain'] },
            { id: 's2', label: 'Generation and Conduction of Nerve Impulse', prompt: 'Which idea is this? — The generation and conduction of a nerve impulse is the process by which a neuron.', answer: 'Generation and Conduction of Nerve Impulse', options: ['Generation and Conduction of Nerve Impulse', 'Neuron Structure and Types', 'Synapse Transmission of Impulse', 'Central Nervous System Brain'] },
            { id: 's3', label: 'Synapse Transmission of Impulse', prompt: 'Which idea is this? — A synapse is a specialized junction between a pre-synaptic neuron and a post-synaptic.', answer: 'Synapse Transmission of Impulse', options: ['Synapse Transmission of Impulse', 'Neuron Structure and Types', 'Generation and Conduction of Nerve Impulse', 'Central Nervous System Brain'] },
            { id: 's4', label: 'Central Nervous System Brain', prompt: 'Which idea is this? — The human brain is the central information processing organ of the body, protected by the.', answer: 'Central Nervous System Brain', options: ['Central Nervous System Brain', 'Neuron Structure and Types', 'Generation and Conduction of Nerve Impulse', 'Synapse Transmission of Impulse'] },
            { id: 's5', label: 'Central Nervous System Spinal Cord', prompt: 'Which idea is this? — The spinal cord is a cylindrical, elongated structure of the central nervous system.', answer: 'Central Nervous System Spinal Cord', options: ['Central Nervous System Spinal Cord', 'Neuron Structure and Types', 'Generation and Conduction of Nerve Impulse', 'Synapse Transmission of Impulse'] },
            { id: 's6', label: 'Peripheral Nervous System Cranial and Spinal Nerves', prompt: 'Which idea is this? — The peripheral nervous system (PNS) consists of all nerves arising from the central.', answer: 'Peripheral Nervous System Cranial and Spinal Nerves', options: ['Peripheral Nervous System Cranial and Spinal Nerves', 'Neuron Structure and Types', 'Generation and Conduction of Nerve Impulse', 'Synapse Transmission of Impulse'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re building a model reflex-arc poster for the biology lab. For the sensory neuron you draw a unipolar cell from the dorsal root ganglion — one process, T-shaped. A teammate \'corrects\' you: \'A unipolar neuron has only one process, so it can\'t have a dendrite. Redraw it so the signal enters through a proper branched dendrite tree.\'',
            decisions: [{ prompt: 'Who\'s right about where the sensory signal enters?', options: [
                { text: 'You are — in a unipolar sensory neuron the peripheral branch running to the skin receptor is functionally the dendrite: it receives the stimulus and conducts toward the cell body, even though it looks structurally axonal (myelinated, no Nissl\'s granules). Functional and structural classifications don\'t have to match.', outcome: 'The dorsal root ganglion neuron\'s single stem splits at a T-junction; the peripheral process plays the dendrite\'s role without the textbook branched look.' },
                { text: 'The teammate is right — one process means no dendrite, so the skin must synapse directly onto an axon that carries the signal to the cord.', outcome: 'There is no synapse at the receptor; the peripheral branch itself IS the receiving process — calling it \'not a dendrite\' confuses structure with function.', reveals: 'unipolar-has-no-dendrite' },
                { text: 'Both wrong — unipolar neurons exist only in invertebrates; human sensory neurons are all multipolar.', outcome: 'Human dorsal root ganglion sensory neurons are the classic unipolar example; multipolar describes motor neurons and interneurons.', reveals: 'unipolar-not-in-humans' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain a neuron\'s every feature by its signalling job — input branches, output cable, protein factory, and jump-wired insulation.',
            decisions: [{ prompt: 'What comes next? Neural Control and Coordination · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Neural Control and Coordination · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_001', difficulty: 'standard',
          question: 'A neuron is the structural and functional unit of the neural system.',
          hint: 'If stuck, revisit Class 9 Cell Organelles (c9_bio_ch1_6 to c9_bio_ch1_11) focusing.',
          misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality.',
          parts: [
                { id: 'a', prompt: 'A patient has a genetic defect causing dysfunctional Schwann cells that cannot form myelin sheaths.', answer: 'Cranial nerves (myelinated) would show severely reduced conduction velocity',
                  options: ['Cranial nerves (myelinated) would show severely reduced conduction velocity', 'unipolar neurons have no dendrites', 'one process', '"unipolar neurons have no dendrites"'],
                  hint: 'If stuck, revisit Class 9 Cell Organelles (c9_bio_ch1_6 to c9_bio_ch1_11) focusing on rough.',
                  misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality, the peripheral.' }
          ],
            remediations: { 'unipolar-neurons-have-no-dendrites': { steps: ['Draw a dorsal root ganglion neuron showing the T-junction: label peripheral branch (receptor ending in skin), cell body.', 'Annotate each branch: "Peripheral: functionally dendritic (receives stimulus), structurally axonal (myelinated).', 'Central: functionally axonal (conducts to CNS), structurally axonal." 3.', 'Compare with a multipolar motor neuron: note dendrites have Nissl\'s granules, receive synapses; unipolar peripheral.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since all neurons have a cell body, dendrites, and an axon, the classification into multipolar, bipolar, and unipolar is arbitrary.', answer: 'The statement is false',
                  options: ['The statement is false', 'common basic parts', 'functional specialization', 'unipolar neurons have no dendrites'],
                  hint: 'If stuck, revisit Class 9 Cell Organelles (c9_bio_ch1_6 to c9_bio_ch1_11) focusing on rough.',
                  misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality, the peripheral.' },
                { id: 'b', prompt: 'Design a simple histological experiment to distinguish between myelinated and non-myelinated nerve fibers in a mixed peripheral nerve sample, using only light.', answer: 'Use **osmium tetroxide** (stains lipid-rich myelin black) or **luxol fast blue**',
                  options: ['Use **osmium tetroxide** (stains lipid-rich myelin black) or **luxol fast blue**', 'unipolar neurons have no dendrites', 'one process', '"unipolar neurons have no dendrites"'],
                  hint: 'If stuck, revisit Class 9 Cell Organelles (c9_bio_ch1_6 to c9_bio_ch1_11) focusing on rough.',
                  misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality, the peripheral.' }
          ],
            remediations: { 'unipolar-neurons-have-no-dendrites': { steps: ['Draw a dorsal root ganglion neuron showing the T-junction: label peripheral branch (receptor ending in skin), cell body.', 'Annotate each branch: "Peripheral: functionally dendritic (receives stimulus), structurally axonal (myelinated).', 'Central: functionally axonal (conducts to CNS), structurally axonal." 3.', 'Compare with a multipolar motor neuron: note dendrites have Nissl\'s granules, receive synapses; unipolar peripheral.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_002', difficulty: 'standard',
          question: 'The generation and conduction of a nerve impulse is the process by which.',
          hint: 'If stuck, review c11_bio_cbse_18_001 for neuron anatomy and c9_bio_ch1_3 for membrane.',
          misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.',
          parts: [
                { id: 'a', prompt: 'State the exact ionic distribution across the axonal membrane at rest and name the protein responsible for maintaining it.', answer: 'At rest, the axoplasm has high K⁺ and negatively charged proteins, low Na⁺',
                  options: ['At rest, the axoplasm has high K⁺ and negatively charged proteins, low Na⁺', 'Na⁺ is high inside'],
                  hint: 'If stuck, review c11_bio_cbse_18_001 for neuron anatomy and c9_bio_ch1_3 for membrane transport.',
                  misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.' },
                { id: 'b', prompt: 'Explain why the rising phase of the action potential is extremely brief, even though Na⁺ channels remain open for a few milliseconds.', answer: 'The rising phase is brief',
                  options: ['The rising phase is brief', 'Na⁺ channels close slowly'],
                  hint: 'If stuck, review c11_bio_cbse_18_001 for neuron anatomy and c9_bio_ch1_3 for membrane transport.',
                  misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.' },
                { id: 'c', prompt: 'Compare the energy demand (ATP consumption) of a myelinated axon versus an unmyelinated axon of the same length conducting the same number of action potentials.', answer: 'The myelinated axon consumes significantly less ATP',
                  options: ['The myelinated axon consumes significantly less ATP', 'myelinated axons use more ATP'],
                  hint: 'If stuck, review c11_bio_cbse_18_001 for neuron anatomy and c9_bio_ch1_3 for membrane transport.',
                  misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.' }
          ],
            remediations: { 'the-action-potential-is-the': { steps: ['Revisit the distinction between *electrotonic (passive) spread* of voltage and *active regeneration* at the next node.', 'Use the "domino" analogy: each domino (action potential) falls locally and triggers the next, but the dominoes.', 'Draw a 3-panel diagram: (a) resting, (b) depolarising site with Na⁺ influx, (c) adjacent site still at rest but.', 'Label ion movements and current directions explicitly.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_003', difficulty: 'standard',
          question: 'A synapse is a specialized junction between a pre-synaptic neuron and.',
          hint: 'If stuck, review the sodium-potassium pump, voltage-gated channel dynamics, and the.',
          misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes.',
          parts: [
                { id: 'a', prompt: 'Name the two types of synapses classified by the mechanism of impulse transmission and state the key structural difference between them.', answer: 'The two types are electrical synapses and chemical synapses',
                  options: ['The two types are electrical synapses and chemical synapses', 'both use neurotransmitters', 'electrical synapses have a cleft'],
                  hint: 'If stuck, review the sodium-potassium pump, voltage-gated channel dynamics, and the concept.',
                  misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of Ranvier.' },
                { id: 'b', prompt: 'A neurotoxin blocks voltage-gated Ca²⁺ channels in the pre-synaptic terminal.', answer: 'Synaptic transmission will be completely blocked',
                  options: ['Synaptic transmission will be completely blocked', 'transmission slows down', 'action potential crosses anyway'],
                  hint: 'If stuck, review the sodium-potassium pump, voltage-gated channel dynamics, and the concept.',
                  misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of Ranvier.' },
                { id: 'c', prompt: 'Compare the speed and modifiability of signal transmission at electrical vs chemical synapses.', answer: 'Electrical synapses are faster (near-instantaneous)',
                  options: ['Electrical synapses are faster (near-instantaneous)', 'chemical synapses are faster', 'both are equally modifiable'],
                  hint: 'If stuck, review the sodium-potassium pump, voltage-gated channel dynamics, and the concept.',
                  misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of Ranvier.' }
          ],
            remediations: { 'the-action-potential-jumps-across': { steps: ['Revisit the animation/video of saltatory conduction (node c11_bio_cbse_18_002) and explicitly contrast it with synaptic.', 'Draw a side-by-side diagram: left panel shows nodes of Ranvier with local currents; right panel shows synaptic cleft.', 'Use the analogy: saltatory conduction is like a wave jumping between floating piers (same bridge); synaptic.', 'Practice explaining why curare blocks neuromuscular transmission but does not affect action potential propagation.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_004', difficulty: 'standard',
          question: 'The human brain is the central information processing organ of the body.',
          hint: 'If stuck, revisit the mechanism of synaptic transmission (c11_bio_cbse_18_003) and the.',
          misconception: 'Students often believe that the cerebrum (cerebral cortex) is the only site of "higher functions" like memory and.',
          parts: [
                { id: 'a', prompt: 'During a cricket match, a fielder catches a high-speed ball. The visual stimulus travels from the retina to the brain.', answer: 'Step 1: Photoreceptors in the retina convert light into nerve impulses',
                  options: ['Step 1: Photoreceptors in the retina convert light into nerve impulses', 'higher functions'],
                  hint: 'If stuck, revisit the mechanism of synaptic transmission (c11_bio_cbse_18_003) and the structure.',
                  misconception: 'Students often believe that the cerebrum (cerebral cortex) is the only site of "higher functions" like memory and emotion, while the.' }
          ],
            remediations: { 'the-cerebrum-cerebral-cortex-is': { steps: ['If a student holds this misconception, guide them through a step-by-step tracing exercise: (1) Take a sagittal brain.', '(2) For each, write one non-reflex function: midbrain → superior colliculus (visual reflex integration) and inferior.', '(3) Draw arrows showing how the hypothalamus (homeostasis) connects to the medulla (autonomic output) via the brainstem.', '(4) Have the student explain, in their own words, why a medulla injury is immediately life-threatening while a cerebrum.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_005', difficulty: 'standard',
          question: 'The spinal cord is a cylindrical, elongated structure of the central nervous.',
          hint: 'If stuck, revisit c11_bio_cbse_18_001 (neuron types and myelin) and c10_bio_cbse_02_003.',
          misconception: 'Students believe the spinal cord ends at the bottom of the vertebral column (coccyx) and that spinal nerves exit at the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The spinal cord is a cylindrical, elongated structure of the central nervous system',
                  options: ['The spinal cord is a cylindrical, elongated structure of the central nervous system', 'A neuron is the structural and functional unit of the neural system, specialized for', 'The generation and conduction of a nerve impulse is the process by', 'A synapse is a specialized junction between a pre-synaptic neuron and a post-synaptic'],
                  hint: 'If stuck, revisit c11_bio_cbse_18_001 (neuron types and myelin) and c10_bio_cbse_02_003 (reflex arc.',
                  misconception: 'Students believe the spinal cord ends at the bottom of the vertebral column (coccyx) and that spinal nerves exit at the same vertebral.' }
          ],
            remediations: { 'the-spinal-cord-ends-at': { steps: ['Have the student trace the embryonic development — the spinal cord grows slower than the vertebral column, so the cord.', 'Use a diagram showing a newborn (cord ends at L3) vs. adult (cord ends at L1-L2) to visualise the discrepancy.', 'Practice mapping: "If a needle is inserted at L3-L4 for lumbar puncture, which cord segments are safely below?".', 'Create a table matching each spinal nerve to its vertebral exit level versus its cord segment origin.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_006', difficulty: 'standard',
          question: 'The peripheral nervous system (PNS) consists of all nerves arising from the.',
          hint: 'Revisit c11_bio_cbse_18_001 (neuron structure) and c10_bio_cbse_02_002 (neuron types).',
          misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7.',
          parts: [
                { id: 'a', prompt: 'How many pairs of cranial nerves and spinal nerves are present in the human peripheral nervous system?', answer: 'There are 12 pairs of cranial nerves and 31 pairs of spinal nerves',
                  options: ['There are 12 pairs of cranial nerves and 31 pairs of spinal nerves', 'How many pairs of ...?', 'the number of spinal nerves equals the number of vertebrae (e'],
                  hint: 'Revisit c11_bio_cbse_18_001 (neuron structure) and c10_bio_cbse_02_002 (neuron types) to clarify.',
                  misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7 cervical vertebrae).' },
                { id: 'b', prompt: 'A patient cannot move the left side of their face (cannot smile, frown, or close the left eye) but has normal sensation on the face.', answer: 'The facial nerve (VII) is damaged',
                  options: ['The facial nerve (VII) is damaged', 'trigeminal nerve', 'the number of spinal nerves equals the number of vertebrae (e'],
                  hint: 'Revisit c11_bio_cbse_18_001 (neuron structure) and c10_bio_cbse_02_002 (neuron types) to clarify.',
                  misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7 cervical vertebrae).' }
          ],
            remediations: { 'the-number-of-spinal-nerves': { steps: ['Draw a side-view diagram of the cervical vertebral column showing the atlas (C1), axis (C2), and C3–C7 vertebrae.', 'Mark the exit points: C1 nerve between occiput and atlas, C2 between atlas and axis, ..., C7 between C6 and C7, C8.', 'Count the nerves (8) and vertebrae (7).', 'Then practice: "A herniated disc at C5–C6 affects which nerve root?" (Answer: C6).'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
