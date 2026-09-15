import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch18_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch18_p2: SimDef = {
    id: 'v3_c11_bio_ch18_p2',
    title: 'Neural Control and Coordination · Part 2/2',
    subtitle: 'Anatomy of the cell that turns a hot cup into a pulled-back hand in milliseconds.',
    classLevel: 11, subject: 'biology', topic: 'Neural Control and Coordination · Part 2/2',
    chapters: ['c11_bio_ch18'],
    nodeIds: ['c11_bio_cbse_18_007', 'c11_bio_cbse_18_008', 'c11_bio_cbse_18_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a neurologist tracing why a patient\'s reflexes have slowed', intro: 'Conduction velocity is down in the patient\'s peripheral nerves but the autonomic system looks spared. The difference between those nerves is your first clue.', goal: 'Label neuron structure, classify multipolar, bipolar, and unipolar neurons, and connect myelin and nodes of Ranvier to conduction speed.' },
    discovery: {
        question: 'Your hand leaves a hot chai cup before you feel the burn — signals raced up to 120 m/s along your nerves. Which structural feature of the axon lets impulses effectively leap instead of crawl?',
        options: ['Myelin segments with bare nodes of Ranvier between them — the impulse jumps node to node instead of depolarising every patch of membrane', 'Extra dendrites that catch the signal earlier', 'A wider axon diameter alone, with no insulation', 'Multiple axons per neuron running in parallel'],
        answer: 'Myelin segments with bare nodes of Ranvier between them — the impulse jumps node to node instead of depolarising every patch of membrane',
        hook: 'Myelin isn\'t just insulation — the gaps are the point, turning a slow wave into a hop between nodes.',
    },
    teaching: [
        { title: 'Reflex Action and Reflex Arc', text: 'A reflex action is an involuntary, rapid, and stereotyped response to a specific stimulus mediated by a neural pathway called the reflex arc, which consists of a receptor, sensory neuron, interneuron.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_18_007', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Draw and defend a neuron: dendrites toward the soma, one axon away, Nissl granules manufacturing protein, myelin and nodes setting conduction speed — then predict what broken Schwann cells do to signal velocity.',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_007', title: 'Reflex Action and Reflex Arc',
          caseStudy: { intro: 'Imagine you accidentally touch a hot tawa while making rotis — your hand pulls back before you even feel the heat.',
            decisions: [{ prompt: 'Name the five components of a reflex arc in the correct sequential order from stimulus to response.', options: [
                { text: 'Correct sequence: Receptor → Sensory neuron → Interneuron (in spinal cord) → Motor neuron', outcome: 'Correct sequence: Receptor → Sensory neuron → Interneuron (in spinal cord) → Motor neuron →.' },
                { text: 'reflex action means the brain is not involved at all', outcome: 'Not quite — Students often think "reflex action means the brain is not involved at all." They confuse.', reveals: 'reflex-action-means-the-brain' },
                { text: '"reflex action means the brain is not involved at all', outcome: 'Not quite — Students often think "reflex action means the brain is not involved at all." They confuse.', reveals: 'reflex-action-means-the-brain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_008', title: 'Sensory Reception: Eye',
          caseStudy: { intro: 'Observe what happens when you walk from bright Indian sunlight into a dimly lit temple corridor: initially you see nothing, but within seconds shapes emerge.',
            decisions: [{ prompt: 'Name the three concentric layers (tunics) of the human eyeball wall from outermost to innermost, and state the primary tissue type.', options: [
                { text: 'Correct answer: (1) Fibrous tunic – dense regular connective tissue (sclera) and', outcome: 'Correct answer: (1) Fibrous tunic – dense regular connective tissue (sclera) and transparent.' },
                { text: 'cornea, lens, retina', outcome: 'Not quite — Students believe the eye\'s lens is the primary refractive element responsible for focusing light.', reveals: 'the-eye-s-lens-is' },
                { text: 'moving forward/backward', outcome: 'Not quite — Students believe the eye\'s lens is the primary refractive element responsible for focusing light.', reveals: 'the-eye-s-lens-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_009', title: 'Sensory Reception: Ear',
          caseStudy: { intro: 'Think of the last time you stood near a temple bell during a festival – you felt the vibration in your chest and heard the sound clearly.',
            decisions: [{ prompt: 'Name the three auditory ossicles in correct order from tympanic membrane to oval window, and state the specific function of the stapedius.', options: [
                { text: 'Malleus → Incus → Stapes', outcome: 'Malleus → Incus → Stapes. The stapedius muscle dampens stapes movement to protect the inner ear.' },
                { text: 'incus, malleus, stapes', outcome: 'Not quite — Students believe the cochlea "hears" all frequencies simultaneously at the same location, and that.', reveals: 'the-cochlea-hears-all-frequencies' },
                { text: 'amplify sound', outcome: 'Not quite — Students believe the cochlea "hears" all frequencies simultaneously at the same location, and that.', reveals: 'the-cochlea-hears-all-frequencies' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_18_008', title: 'Identify each idea',
          dissect: { specimen: 'Neural Control and Coordination · Part 2/2', spots: [
            { id: 's1', label: 'Reflex Action and Reflex Arc', prompt: 'Which idea is this? — A reflex action is an involuntary, rapid, and stereotyped response to a specific stimulus.', answer: 'Reflex Action and Reflex Arc', options: ['Reflex Action and Reflex Arc', 'Sensory Reception Eye', 'Sensory Reception Ear'] },
            { id: 's2', label: 'Sensory Reception Eye', prompt: 'Which idea is this? — The human eye is a specialized photoreceptive sensory organ that transduces light energy.', answer: 'Sensory Reception Eye', options: ['Sensory Reception Eye', 'Reflex Action and Reflex Arc', 'Sensory Reception Ear'] },
            { id: 's3', label: 'Sensory Reception Ear', prompt: 'Which idea is this? — The human ear is a paired sensory organ that performs two distinct functions: hearing.', answer: 'Sensory Reception Ear', options: ['Sensory Reception Ear', 'Reflex Action and Reflex Arc', 'Sensory Reception Eye'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re building a model reflex-arc poster for the biology lab. For the sensory neuron you draw a unipolar cell from the dorsal root ganglion — one process, T-shaped. A teammate \'corrects\' you: \'A unipolar neuron has only one process, so it can\'t have a dendrite. Redraw it so the signal enters through a proper branched dendrite tree.\'',
            decisions: [{ prompt: 'Who\'s right about where the sensory signal enters?', options: [
                { text: 'You are — in a unipolar sensory neuron the peripheral branch running to the skin receptor is functionally the dendrite: it receives the stimulus and conducts toward the cell body, even though it looks structurally axonal (myelinated, no Nissl\'s granules). Functional and structural classifications don\'t have to match.', outcome: 'The dorsal root ganglion neuron\'s single stem splits at a T-junction; the peripheral process plays the dendrite\'s role without the textbook branched look.' },
                { text: 'The teammate is right — one process means no dendrite, so the skin must synapse directly onto an axon that carries the signal to the cord.', outcome: 'There is no synapse at the receptor; the peripheral branch itself IS the receiving process — calling it \'not a dendrite\' confuses structure with function.', reveals: 'unipolar-has-no-dendrite' },
                { text: 'Both wrong — unipolar neurons exist only in invertebrates; human sensory neurons are all multipolar.', outcome: 'Human dorsal root ganglion sensory neurons are the classic unipolar example; multipolar describes motor neurons and interneurons.', reveals: 'unipolar-not-in-humans' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_18_009', title: 'You made it',
          caseStudy: { intro: 'You can now explain a neuron\'s every feature by its signalling job — input branches, output cable, protein factory, and jump-wired insulation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_007', difficulty: 'standard',
          question: 'A reflex action is an involuntary, rapid, and stereotyped response to.',
          hint: 'If stuck on synaptic delay, revisit c11_bio_cbse_18_003 (Synapse).',
          misconception: 'Students often think "reflex action means the brain is not involved at all." They confuse *initiation* (spinal) with.',
          parts: [
                { id: 'a', prompt: 'Compare the monosynaptic stretch reflex (knee-jerk) and the polysynaptic withdrawal reflex in terms of: (a) number of synapses, (b) interneuron involvement.', answer: 'number of synapses, (',
                  options: ['number of synapses, (', 'number of neurons', 'reflex action means the brain is not involved at all', '"reflex action means the brain is not involved at all'],
                  hint: 'If stuck on synaptic delay, revisit c11_bio_cbse_18_003 (Synapse).',
                  misconception: 'Students often think "reflex action means the brain is not involved at all." They confuse *initiation* (spinal) with.' }
          ],
            remediations: { 'reflex-action-means-the-brain': { steps: ['Re-draw the reflex arc labeling *all* five components with arrows showing direction.', 'Trace two pathways for the *same* stimulus (e.g., pinprick): (a) Reflex arc → spinal cord → motor response (0.05s), (b).', 'Write one sentence: "Brain modulates, not initiates."', 'Solve one UMN vs LMN reflex question from a previous year paper.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "reflex action means the brain is not involved at all." They confuse *initiation* (spinal) with.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since the reflex arc bypasses the brain, the brain has no role in modifying reflex responses." Evaluate this statement.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'reflex action means the brain is not involved at all', '"reflex action means the brain is not involved at all'],
                  hint: 'If stuck on synaptic delay, revisit c11_bio_cbse_18_003 (Synapse).',
                  misconception: 'Students often think "reflex action means the brain is not involved at all." They confuse *initiation* (spinal) with.' },
                { id: 'b', prompt: 'Design a simple clinical test to distinguish between a lower motor neuron (LMN) lesion and an upper motor neuron (UMN) lesion at the L4 level using reflex.', answer: 'Test the knee-jerk reflex (L2-L4)',
                  options: ['Test the knee-jerk reflex (L2-L4)', 'reflex action means the brain is not involved at all', '"reflex action means the brain is not involved at all'],
                  hint: 'If stuck on synaptic delay, revisit c11_bio_cbse_18_003 (Synapse).',
                  misconception: 'Students often think "reflex action means the brain is not involved at all." They confuse *initiation* (spinal) with.' }
          ],
            remediations: { 'reflex-action-means-the-brain': { steps: ['Re-draw the reflex arc labeling *all* five components with arrows showing direction.', 'Trace two pathways for the *same* stimulus (e.g., pinprick): (a) Reflex arc → spinal cord → motor response (0.05s), (b).', 'Write one sentence: "Brain modulates, not initiates."', 'Solve one UMN vs LMN reflex question from a previous year paper.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_008', difficulty: 'standard',
          question: 'The human eye is a specialized photoreceptive sensory organ that transduces.',
          hint: 'If stuck, revisit c11_bio_cbse_18_001 (neuron structure) and c11_bio_cbse_18_002 (nerve.',
          misconception: 'Students believe the eye\'s lens is the primary refractive element responsible for focusing light, and that.',
          parts: [
                { id: 'a', prompt: 'Name the three concentric layers (tunics) of the human eyeball wall from outermost to innermost, and state the primary tissue type composing each layer.', answer: 'Correct answer: (1) Fibrous tunic – dense regular connective tissue (sclera) and',
                  options: ['Correct answer: (1) Fibrous tunic – dense regular connective tissue (sclera) and', 'cornea, lens, retina', 'moving forward/backward'],
                  hint: 'If stuck, revisit c11_bio_cbse_18_001 (neuron structure) and c11_bio_cbse_18_002 (nerve impulse).',
                  misconception: 'Students believe the eye\'s lens is the primary refractive element responsible for focusing light, and that accommodation works by the lens.' },
                { id: 'b', prompt: 'Explain why the human retina is described as "inverted" and evaluate one functional advantage and one disadvantage of this arrangement compared to a "verted".', answer: 'Correct answer: The retina is inverted',
                  options: ['Correct answer: The retina is inverted', 'moving forward/backward'],
                  hint: 'If stuck, revisit c11_bio_cbse_18_001 (neuron structure) and c11_bio_cbse_18_002 (nerve impulse).',
                  misconception: 'Students believe the eye\'s lens is the primary refractive element responsible for focusing light, and that accommodation works by the lens.' }
          ],
            remediations: { 'the-eye-s-lens-is': { steps: ['Have the student calculate the refractive power of the cornea using the simplified formula P = (n₂ - n₁)/R with n₁=1.00.', 'Use a physical model (magnifying glass + water-filled clear balloon as cornea) to show that changing the balloon\'s.', 'Review the lens maker\'s formula and the concept of equivalent power of two separated thin lenses (cornea and lens).'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_18_009', difficulty: 'standard',
          question: 'The human ear is a paired sensory organ that performs two distinct functions.',
          hint: 'Revisit c11_bio_cbse_18_002 (action potential) and c11_bio_cbse_18_003 (synapse) – focus.',
          misconception: 'Students believe the cochlea "hears" all frequencies simultaneously at the same location, and that loudness is coded.',
          parts: [
                { id: 'a', prompt: 'Name the three auditory ossicles in correct order from tympanic membrane to oval window, and state the specific function of the stapedius muscle.', answer: 'Malleus → Incus → Stapes',
                  options: ['Malleus → Incus → Stapes', 'incus, malleus, stapes', 'amplify sound'],
                  hint: 'Revisit c11_bio_cbse_18_002 (action potential) and c11_bio_cbse_18_003 (synapse) – focus on K⁺.',
                  misconception: 'Students believe the cochlea "hears" all frequencies simultaneously at the same location, and that loudness is coded only by firing rate.' }
          ],
            remediations: { 'the-cochlea-hears-all-frequencies': { steps: ['Take a stiff ruler and a flexible plastic strip; clamp both at one end.', 'Flick the free ends – observe different vibration frequencies.', 'Relate to basilar membrane stiffness gradient (base stiff = high frequency, apex flexible = low frequency).', 'Use a rope tied to a door handle: shake slowly (large amplitude, low frequency) vs.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
