import type { SimDef } from '../../engine/types';
import C11_BiologyNeuronSynapseSim from '../../../simulations/three/C11_BiologyNeuronSynapseSim';

/** v3 wrapped master — C11_BiologyNeuronSynapseSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biologyneuronsynapsesim: SimDef = {
    id: 'v3w_c11_biologyneuronsynapsesim',
    title: 'Synapse: Transmission of Impulse',
    subtitle: 'This node covers the structural classification of synapses (electrical vs chemical), the.',
    classLevel: 11, subject: 'biology', topic: 'Synapse: Transmission of Impulse',
    chapters: [],
    nodeIds: ['c11_bio_cbse_18_003', 'c11_bio_cbse_07_004', 'c11_bio_cbse_18_001', 'c11_bio_cbse_18_002', 'c11_bio_cbse_18_005', 'c11_bio_cbse_18_006', 'c11_bio_cbse_18_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you accidentally touch a hot tawa (griddle) while making rotis – your hand jerks back before you even.', goal: 'Master Synapse: Transmission of Impulse.' },
    discovery: {
        question: 'Name the two types of synapses classified by the mechanism of impulse transmission and state the key structural difference between them.',
        options: ['The two types are electrical synapses and chemical synapses', 'both use neurotransmitters', 'electrical synapses have a cleft'],
        answer: 'The two types are electrical synapses and chemical synapses',
        hook: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of.',
    },
    teaching: [
        { title: 'A synapse is a specialized junction between.', text: 'A synapse is a specialized junction between a pre-synaptic neuron and a post-synaptic neuron (or effector cell) where nerve impulses are transmitted either directly via electrical current flow.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_bio_cbse_18_003', title: 'A synapse is a specialized junction.',
          scaffold: { problem: 'A farmer is bitten by a krait (Bungarus caeruleus) in a Punjab field.',
            steps: [
            { text: 'Identify the site of action – the neuromuscular junction (a chemical synapse between a motor neuron and skeletal muscle.' },
            { text: 'Recall normal sequence: Action potential arrives at motor nerve terminal → opens voltage-gated Ca²⁺ channels → Ca²⁺.' },
            { text: 'Apply the toxin effect: β-bungarotoxin prevents vesicle fusion / ACh release even though Ca²⁺ channels open and action.' },
            { text: 'Trace the consequence: No ACh in cleft → no receptor binding → no end-plate potential → no muscle action potential → no.' },
            { text: 'Explain systemic effect: All voluntary muscles (including diaphragm and intercostals) are affected → flaccid paralysis.', faded: true, blankAnswer: 'The toxin blocks ACh release, preventing end-plate.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_07_004', title: 'Neural tissue is a specialised animal.',
          scaffold: { problem: 'A researcher records the membrane potential of a sensory neuron at rest (-68 mV).',
            steps: [
            { text: 'Identify the initial state — resting potential (-68 mV) maintained by K⁺ leak and Na⁺/K⁺ pump.' },
            { text: 'Recognise that mechanical stimulus opens *ligand-gated* (mechanosensitive) channels, causing graded depolarisation.' },
            { text: 'Note that -45 mV is below threshold (typically -55 to -50 mV) — insufficient to open enough voltage-gated Na⁺ channels.' },
            { text: 'Stronger stimulus brings membrane to -50 mV (threshold) — voltage-gated Na⁺ channels open rapidly, Na⁺ influx.' },
            { text: 'Conclude: graded potentials are local and decrement; action potentials are all-or-none and propagate because they.', faded: true, blankAnswer: 'The first stimulus produced a subthreshold graded potential.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_18_001', title: 'A neuron is the structural and.',
          scaffold: { problem: 'A researcher observes a neuron under electron microscope with the following features: (1) large cell body with abundant basophilic granular.',
            steps: [
            { text: 'Identify key structural features: large soma with Nissl\'s granules (basophilic granules = rough ER), multiple dendrites.' },
            { text: 'Recognize the segmented sheath with gaps as myelin sheath with nodes of Ranvier, indicating a myelinated axon.' },
            { text: 'Note the bulb-like endings (synaptic knobs) near a muscle fiber = neuromuscular junction.' },
            { text: 'Classify: one axon + multiple dendrites = multipolar neuron. Location: ventral horn of spinal cord (somatic motor.' },
            { text: 'Verify: Multipolar motor neurons innervate skeletal muscles; all features match.', faded: true, blankAnswer: 'Multipolar neuron; located in ventral horn of spinal cord;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_18_002', title: 'The generation and conduction of a.',
          scaffold: { problem: 'A researcher applies a subthreshold stimulus (e.g., -60 mV depolarisation) to a resting neuron (Vₘ = -70 mV). No action potential occurs.',
            steps: [
            { text: 'Identify the resting state — voltage-gated Na⁺ channels are closed but activatable (not inactivated).' },
            { text: 'Subthreshold depolarisation (-60 mV) opens a few Na⁺ channels, but the Na⁺ influx is too small to overcome the resting.' },
            { text: 'Suprathreshold depolarisation (-50 mV) opens enough Na⁺ channels that the inward Na⁺ current exceeds outward K⁺ leak.' },
            { text: 'This regenerative cycle drives Vₘ rapidly toward the Na⁺ equilibrium potential (~+60 mV), producing the rising phase of.' },
            { text: 'Conclude: threshold is the voltage at which net inward current becomes regenerative; subthreshold stimuli fail to.', faded: true, blankAnswer: 'Subthreshold stimuli cause only passive, local.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_18_005', title: 'The spinal cord is a cylindrical,.',
          scaffold: { problem: 'A 30-year-old construction worker falls from scaffolding and suffers a fracture-dislocation at the L1 vertebral level.',
            steps: [
            { text: 'Identify the vertebral level of injury (L1) and recall that the adult spinal cord ends at L1-L2 (conus medullaris).' },
            { text: 'Determine which spinal cord segments are at the L1 vertebral level — due to differential growth, L1 vertebra houses the.' },
            { text: 'Map symptoms to affected structures: flaccid paralysis and areflexia in legs indicate lower motor neuron damage to.' },
            { text: 'Conclude that the spinal cord proper (conus) is likely compressed or transected at its terminal end, but the main cord.' },
            { text: 'Verify: upper motor neuron signs (spasticity, hyperreflexia, Babinski) are absent because the lesion is at/below the.', faded: true, blankAnswer: 'The L1 vertebral fracture damages the conus medullaris.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_18_006', title: 'The peripheral nervous system (PNS).',
          scaffold: { problem: 'A 30-year-old man meets with a road accident and suffers a fracture at the base of the skull.',
            steps: [
            { text: 'Identify the symptom "inability to smell" – this is anosmia, indicating damage to the olfactory nerve (I), which is.' },
            { text: 'Identify the symptom "loss of taste from anterior 2/3 of tongue" – this is carried by the chorda tympani branch of the.' },
            { text: 'Recall the anatomical course: Olfactory nerve (I) passes through the cribriform plate of the ethmoid bone at the base.' },
            { text: 'A fracture at the base of the skull (especially anterior cranial fossa) can shear the delicate olfactory filaments.' },
            { text: 'Conclude that Cranial Nerve I (Olfactory) and Cranial Nerve VII (Facial) are damaged.', faded: true, blankAnswer: 'Olfactory nerve (I) and Facial nerve (VII) are damaged..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_07_004', title: 'Identify each idea',
          dissect: { specimen: 'Synapse: Transmission of Impulse', spots: [
            { id: 's1', label: 'A synapse is a specialized', prompt: 'Which idea is this? — A synapse is a specialized junction between a pre-synaptic neuron and a post-synaptic.', answer: 'A synapse is a specialized', options: ['A synapse is a specialized', 'Neural tissue is a specialised', 'A neuron is the structural', 'The generation and conduction of'] },
            { id: 's2', label: 'Neural tissue is a specialised', prompt: 'Which idea is this? — Neural tissue is a specialised animal tissue composed of neurons (excitable cells that.', answer: 'Neural tissue is a specialised', options: ['Neural tissue is a specialised', 'A synapse is a specialized', 'A neuron is the structural', 'The generation and conduction of'] },
            { id: 's3', label: 'A neuron is the structural', prompt: 'Which idea is this? — A neuron is the structural and functional unit of the neural system, specialized for.', answer: 'A neuron is the structural', options: ['A neuron is the structural', 'A synapse is a specialized', 'Neural tissue is a specialised', 'The generation and conduction of'] },
            { id: 's4', label: 'The generation and conduction of', prompt: 'Which idea is this? — The generation and conduction of a nerve impulse is the process by which a neuron.', answer: 'The generation and conduction of', options: ['The generation and conduction of', 'A synapse is a specialized', 'Neural tissue is a specialised', 'A neuron is the structural'] },
            { id: 's5', label: 'The spinal cord is a', prompt: 'Which idea is this? — The spinal cord is a cylindrical, elongated structure of the central nervous system.', answer: 'The spinal cord is a', options: ['The spinal cord is a', 'A synapse is a specialized', 'Neural tissue is a specialised', 'A neuron is the structural'] },
            { id: 's6', label: 'The peripheral nervous system PNS', prompt: 'Which idea is this? — The peripheral nervous system (PNS) consists of all nerves arising from the central.', answer: 'The peripheral nervous system PNS', options: ['The peripheral nervous system PNS', 'A synapse is a specialized', 'Neural tissue is a specialised', 'A neuron is the structural'] }
          ] } }
    ],
    explore: { component: C11_BiologyNeuronSynapseSim, prompt: 'Explore the interactive — Synapse: Transmission of Impulse' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_003', difficulty: 'standard',
          question: 'A synapse is a specialized junction between a pre-synaptic neuron and a.',
          hint: 'If stuck, review the sodium-potassium pump, voltage-gated channel dynamics, and the.',
          misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of.',
          parts: [
                { id: 'a', prompt: 'Name the two types of synapses classified by the mechanism of impulse transmission and state the key structural difference between them.', answer: 'The two types are electrical synapses and chemical synapses',
                  options: ['The two types are electrical synapses and chemical synapses', 'both use neurotransmitters', 'electrical synapses have a cleft'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of Ranvier in.' },
                { id: 'b', prompt: 'A neurotoxin blocks voltage-gated Ca²⁺ channels in the pre-synaptic terminal.', answer: 'Synaptic transmission will be completely blocked',
                  options: ['Synaptic transmission will be completely blocked', 'transmission slows down', 'action potential crosses anyway'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of Ranvier in.' },
                { id: 'c', prompt: 'Compare the speed and modifiability of signal transmission at electrical vs chemical synapses.', answer: 'Electrical synapses are faster (near-instantaneous)',
                  options: ['Electrical synapses are faster (near-instantaneous)', 'chemical synapses are faster', 'both are equally modifiable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the action potential "jumps" across the synaptic cleft just like it jumps between nodes of Ranvier in.' }
          ],
            remediations: { 'the-action-potential-jumps-across': { steps: ['Revisit the animation/video of saltatory conduction (node c11_bio_cbse_18_002) and explicitly contrast it with synaptic.', 'Draw a side-by-side diagram: left panel shows nodes of Ranvier with local currents; right panel shows synaptic cleft.', 'Use the analogy: saltatory conduction is like a wave jumping between floating piers (same bridge); synaptic.', 'Practice explaining why curare blocks neuromuscular transmission but does not affect action potential propagation in.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_07_004', difficulty: 'standard',
          question: 'Neural tissue is a specialised animal tissue composed of neurons (excitable.',
          hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and.',
          misconception: 'Students believe that the action potential travels *along* the axon like a current in a wire, with electrons flowing.',
          parts: [
                { id: 'a', prompt: 'Name the three main structural parts of a typical multipolar neuron and state the primary function of each part.', answer: 'The three main parts are: (1) Dendrites',
                  options: ['The three main parts are: (1) Dendrites', 'axon receives signals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the action potential travels *along* the axon like a current in a wire, with electrons flowing continuously.' }
          ],
            remediations: { 'the-action-potential-travels-along': { steps: ['Use a domino analogy — line up dominoes (unmyelinated) vs spaced groups with gaps (myelinated).', 'Simulate with a rope: flick one end — the wave travels, but rope particles only move up/down.', 'Map to biology: domino = action potential at one membrane patch; rope particles = ions moving across membrane locally.', 'Re-read the action potential propagation section in NCERT, focusing on "local current flow" and "depolarisation of.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_001', difficulty: 'standard',
          question: 'A neuron is the structural and functional unit of the neural system,.',
          hint: 'If stuck, revisit Class 9 Cell Organelles (c9_bio_ch1_6 to c9_bio_ch1_11) focusing on.',
          misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality,.',
          parts: [
                { id: 'a', prompt: 'A patient has a genetic defect causing dysfunctional Schwann cells that cannot form myelin sheaths.', answer: 'Cranial nerves (myelinated) would show severely reduced conduction velocity',
                  options: ['Cranial nerves (myelinated) would show severely reduced conduction velocity', 'unipolar neurons have no dendrites', 'one process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality, the peripheral.' }
          ],
            remediations: { 'unipolar-neurons-have-no-dendrites': { steps: ['Draw a dorsal root ganglion neuron showing the T-junction: label peripheral branch (receptor ending in skin), cell body.', 'Annotate each branch: "Peripheral: functionally dendritic (receives stimulus), structurally axonal (myelinated).', 'Central: functionally axonal (conducts to CNS), structurally axonal." 3.', 'Compare with a multipolar motor neuron: note dendrites have Nissl\'s granules, receive synapses; unipolar peripheral.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality,.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since all neurons have a cell body, dendrites, and an axon, the classification into multipolar, bipolar, and unipolar is arbitrary.', answer: 'The statement is false',
                  options: ['The statement is false', 'common basic parts', 'functional specialization', 'unipolar neurons have no dendrites'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality, the peripheral.' },
                { id: 'b', prompt: 'Design a simple histological experiment to distinguish between myelinated and non-myelinated nerve fibers in a mixed peripheral nerve sample, using only light.', answer: 'Use **osmium tetroxide** (stains lipid-rich myelin black) or **luxol fast blue**',
                  options: ['Use **osmium tetroxide** (stains lipid-rich myelin black) or **luxol fast blue**', 'unipolar neurons have no dendrites', 'one process', '"unipolar neurons have no dendrites"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "unipolar neurons have no dendrites" because textbook definitions say "one process." In reality, the peripheral.' }
          ],
            remediations: { 'unipolar-neurons-have-no-dendrites': { steps: ['Draw a dorsal root ganglion neuron showing the T-junction: label peripheral branch (receptor ending in skin), cell body.', 'Annotate each branch: "Peripheral: functionally dendritic (receives stimulus), structurally axonal (myelinated).', 'Central: functionally axonal (conducts to CNS), structurally axonal." 3.', 'Compare with a multipolar motor neuron: note dendrites have Nissl\'s granules, receive synapses; unipolar peripheral.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_002', difficulty: 'standard',
          question: 'The generation and conduction of a nerve impulse is the process by which a.',
          hint: 'If stuck, review c11_bio_cbse_18_001 for neuron anatomy and c9_bio_ch1_3 for membrane.',
          misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.',
          parts: [
                { id: 'a', prompt: 'State the exact ionic distribution across the axonal membrane at rest and name the protein responsible for maintaining it.', answer: 'At rest, the axoplasm has high K⁺ and negatively charged proteins, low Na⁺',
                  options: ['At rest, the axoplasm has high K⁺ and negatively charged proteins, low Na⁺', 'Na⁺ is high inside'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.' },
                { id: 'b', prompt: 'Explain why the rising phase of the action potential is extremely brief, even though Na⁺ channels remain open for a few milliseconds.', answer: 'The rising phase is brief',
                  options: ['The rising phase is brief', 'Na⁺ channels close slowly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.' },
                { id: 'c', prompt: 'Compare the energy demand (ATP consumption) of a myelinated axon versus an unmyelinated axon of the same length conducting the same number of action potentials.', answer: 'The myelinated axon consumes significantly less ATP',
                  options: ['The myelinated axon consumes significantly less ATP', 'myelinated axons use more ATP'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the action potential *is* the nerve impulse travelling down the axon like a current in a wire.' }
          ],
            remediations: { 'the-action-potential-is-the': { steps: ['Revisit the distinction between *electrotonic (passive) spread* of voltage and *active regeneration* at the next node.', 'Use the "domino" analogy: each domino (action potential) falls locally and triggers the next, but the dominoes.', 'Draw a 3-panel diagram: (a) resting, (b) depolarising site with Na⁺ influx, (c) adjacent site still at rest but.', 'Label ion movements and current directions explicitly.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_005', difficulty: 'standard',
          question: 'The spinal cord is a cylindrical, elongated structure of the central nervous.',
          hint: 'If stuck, revisit c11_bio_cbse_18_001 (neuron types and myelin) and c10_bio_cbse_02_003.',
          misconception: 'Students believe the spinal cord ends at the bottom of the vertebral column (coccyx) and that spinal nerves exit at the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The spinal cord is a cylindrical, elongated structure of the central nervous system',
                  options: ['The spinal cord is a cylindrical, elongated structure of the central nervous system', 'A synapse is a specialized junction between a pre-synaptic neuron and a post-synaptic', 'Neural tissue is a specialised animal tissue composed of neurons (excitable cells that', 'A neuron is the structural and functional unit of the neural system, specialized for'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the spinal cord ends at the bottom of the vertebral column (coccyx) and that spinal nerves exit at the same vertebral.' }
          ],
            remediations: { 'the-spinal-cord-ends-at': { steps: ['Have the student trace the embryonic development — the spinal cord grows slower than the vertebral column, so the cord.', 'Use a diagram showing a newborn (cord ends at L3) vs. adult (cord ends at L1-L2) to visualise the discrepancy.', 'Practice mapping: "If a needle is inserted at L3-L4 for lumbar puncture, which cord segments are safely below?".', 'Create a table matching each spinal nerve to its vertebral exit level versus its cord segment origin.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the spinal cord ends at the bottom of the vertebral column (coccyx) and that spinal nerves exit at the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The spinal cord is merely a relay cable; all meaningful neural processing occurs in the brain." Provide evidence from reflex.', answer: 'The statement is false',
                  options: ['The statement is false', 'higher-order processing', 'neural processing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the spinal cord ends at the bottom of the vertebral column (coccyx) and that spinal nerves exit at the same vertebral.' }
          ],
            remediations: { 'the-spinal-cord-ends-at': { steps: ['Have the student trace the embryonic development — the spinal cord grows slower than the vertebral column, so the cord.', 'Use a diagram showing a newborn (cord ends at L3) vs. adult (cord ends at L1-L2) to visualise the discrepancy.', 'Practice mapping: "If a needle is inserted at L3-L4 for lumbar puncture, which cord segments are safely below?".', 'Create a table matching each spinal nerve to its vertebral exit level versus its cord segment origin.'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_006', difficulty: 'standard',
          question: 'The peripheral nervous system (PNS) consists of all nerves arising from the.',
          hint: 'Revisit c11_bio_cbse_18_001 (neuron structure) and c10_bio_cbse_02_002 (neuron types) to.',
          misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7.',
          parts: [
                { id: 'a', prompt: 'How many pairs of cranial nerves and spinal nerves are present in the human peripheral nervous system?', answer: 'There are 12 pairs of cranial nerves and 31 pairs of spinal nerves',
                  options: ['There are 12 pairs of cranial nerves and 31 pairs of spinal nerves', 'How many pairs of ...?', 'the number of spinal nerves equals the number of vertebrae (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7 cervical vertebrae).' },
                { id: 'b', prompt: 'A patient cannot move the left side of their face (cannot smile, frown, or close the left eye) but has normal sensation on the face.', answer: 'The facial nerve (VII) is damaged',
                  options: ['The facial nerve (VII) is damaged', 'the number of spinal nerves equals the number of vertebrae (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7 cervical vertebrae).' }
          ],
            remediations: { 'the-number-of-spinal-nerves': { steps: ['Draw a side-view diagram of the cervical vertebral column showing the atlas (C1), axis (C2), and C3–C7 vertebrae.', 'Mark the exit points: C1 nerve between occiput and atlas, C2 between atlas and axis, ..., C7 between C6 and C7, C8.', 'Count the nerves (8) and vertebrae (7).', 'Then practice: "A herniated disc at C5–C6 affects which nerve root?" (Answer: C6).'] } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Damage to the vagus nerve (X) will cause loss of sensation from the skin of the external ear."', answer: 'The statement is false',
                  options: ['The statement is false', 'the number of spinal nerves equals the number of vertebrae (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7 cervical vertebrae).' },
                { id: 'b', prompt: 'Design a simple clinical test to check the function of the hypoglossal nerve (XII) and explain the expected normal response.', answer: 'Ask the patient to protrude their tongue straight out',
                  options: ['Ask the patient to protrude their tongue straight out', 'the number of spinal nerves equals the number of vertebrae (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the number of spinal nerves equals the number of vertebrae (e.g., 7 cervical nerves for 7 cervical vertebrae).' }
          ],
            remediations: { 'the-number-of-spinal-nerves': { steps: ['Draw a side-view diagram of the cervical vertebral column showing the atlas (C1), axis (C2), and C3–C7 vertebrae.', 'Mark the exit points: C1 nerve between occiput and atlas, C2 between atlas and axis, ..., C7 between C6 and C7, C8.', 'Count the nerves (8) and vertebrae (7).', 'Then practice: "A herniated disc at C5–C6 affects which nerve root?" (Answer: C6).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
