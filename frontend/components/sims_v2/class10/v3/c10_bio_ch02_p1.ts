import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch02_p1: SimDef = {
    id: 'v3_c10_bio_ch02_p1',
    title: 'Control and Coordination · Part 1/2',
    subtitle: 'Chase a signal through neurons, hormones and a folding mimosa leaf',
    classLevel: 10, subject: 'biology', topic: 'Control and Coordination · Part 1/2',
    chapters: ['c10_bio_ch02'],
    nodeIds: ['c10_bio_cbse_02_001', 'c10_bio_cbse_02_002', 'c10_bio_cbse_02_003', 'c10_bio_cbse_02_004', 'c10_bio_cbse_02_005', 'c10_bio_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emergency-response coordinator inside a living body', intro: 'A finger meets a hot pan; a mimosa leaf snaps shut at a touch. Both are responses to a stimulus — but the machinery underneath could not be more different.', goal: 'Map the full stimulus-to-response pathway and explain how plants coordinate without a nervous system.' },
    discovery: {
        question: 'Touch a hot pan — your hand pulls back before you even feel pain. How is that possible?',
        options: ['The spinal cord fires the response without waiting for the brain', 'Your hand is faster than your nerves', 'Pain signals travel slowly', 'The brain predicted the heat'],
        answer: 'The spinal cord fires the response without waiting for the brain',
        hook: 'Reflexes skip the queue — that shortcut saves your hand before your brain knows why.',
    },
    teaching: [
        { title: 'Control and Coordination in Animals vs Plants: Overview', text: 'Control and coordination is the biological process by which organisms detect changes (stimuli) in their internal and external environment and produce appropriate, regulated responses; in animals this.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_02_001', title: 'Your mission',
          mission: { widget: 'reflex', validate: 'reflex:speed=70',
            instruction: 'On the lab: speed up the signal — how fast does the reflex fire?.',
        context: 'Speed up the signal — how fast does the reflex fire?',
            observePrompt: 'What did the reflex interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_001', title: 'Control and Coordination in Animals vs Plants: Overview',
          caseStudy: { intro: 'Observe a mimosa plant (touch-me-not) folding its leaves when touched and compare it to instantly pulling your hand away from a hot pan — both are responses.',
            decisions: [{ prompt: 'What are the two main systems responsible for control and coordination in animals, and what type of signal does each use?', options: [
                { text: 'The two systems are the nervous system (uses electrical impulses called nerve impulses', outcome: 'The two systems are the nervous system (uses electrical impulses called nerve impulses transmitted.' },
                { text: 'nervous system', outcome: 'Not quite — Students often think plants have a "nervous system" because they respond to stimuli, and they.', reveals: 'plants-have-a-nervous-system' },
                { text: 'hormones are electrical', outcome: 'Not quite — Students often think plants have a "nervous system" because they respond to stimuli, and they.', reveals: 'plants-have-a-nervous-system' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_003', title: 'Reflex Action and Reflex Arc: Pathway and Significance',
          caseStudy: { intro: 'Imagine you accidentally touch a hot tawa while making rotis — your hand pulls back instantly before you even feel the pain.',
            decisions: [{ prompt: 'Name the five components of a reflex arc in the correct sequence from stimulus to response.', options: [
                { text: 'Correct sequence: Receptor → Sensory neuron → Interneuron (in spinal cord) → Motor neuron', outcome: 'Correct sequence: Receptor → Sensory neuron → Interneuron (in spinal cord) → Motor neuron →.' },
                { text: 'Brain → Spinal cord → Muscle', outcome: 'Not quite — Students believe the brain is part of the reflex arc and "approves" the reflex action.', reveals: 'the-brain-is-part-of' },
                { text: 'approves', outcome: 'Not quite — Students believe the brain is part of the reflex arc and "approves" the reflex action.', reveals: 'the-brain-is-part-of' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_004', title: 'Human Brain: Forebrain, Midbrain and Hindbrain Functions',
          caseStudy: { intro: 'Imagine you are riding a bicycle on a busy Indian street: you balance, watch traffic, decide when to brake, and your heart beats faster — all simultaneously.',
            decisions: [{ prompt: 'Name the three major divisions of the human brain and give one main function of each.', options: [
                { text: 'The three divisions are: (1) Forebrain', outcome: 'The three divisions are: (1) Forebrain — centre for thinking, memory, and sensory integration; (2).' },
                { text: 'cerebrum controls breathing', outcome: 'Not quite — Students think the "midbrain" is a minor relay with no distinct function, so they write "connects.', reveals: 'the-midbrain-is-a-minor' },
                { text: 'midbrain', outcome: 'Not quite — Students think the "midbrain" is a minor relay with no distinct function, so they write "connects.', reveals: 'the-midbrain-is-a-minor' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_005', title: 'Coordination in Plants: Tropic Movements (Phototropism, Geotropism)',
          caseStudy: { intro: 'Observe a pothos (money plant) growing near a window in your home — its stems lean and leaves orient themselves towards the incoming sunlight.',
            decisions: [{ prompt: 'Define phototropism and geotropism. State the typical directional response of shoots and roots for each.', options: [
                { text: 'Phototropism is the directional growth response to a unidirectional light stimulus:', outcome: 'Phototropism is the directional growth response to a unidirectional light stimulus: shoots are.' },
                { text: 'roots bend towards light', outcome: 'Not quite — Students believe auxin *always* promotes growth. They write: "Auxin accumulates on the lower side.', reveals: 'auxin-always-promotes-growth' },
                { text: 'auxin *always* promotes growth', outcome: 'Not quite — Students believe auxin *always* promotes growth. They write: "Auxin accumulates on the lower side.', reveals: 'auxin-always-promotes-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_006', title: 'Coordination in Plants: Nastic Movements (Thigmonasty)',
          caseStudy: { intro: 'Observe a Mimosa pudica (touch-me-not) plant in your garden or school campus — when you gently touch its leaflets, they fold inward within seconds.',
            decisions: [{ prompt: 'Define thigmonasty and give one example of a plant that exhibits it.', options: [
                { text: 'Thigmonasty is a non-directional nastic movement in response to touch or physical contact', outcome: 'Thigmonasty is a non-directional nastic movement in response to touch or physical contact; example.' },
                { text: 'growth toward touch', outcome: 'Not quite — Students often think that because Mimosa leaflets fold "toward" the touch point, it is a tropic.', reveals: 'because-mimosa-leaflets-fold-toward' },
                { text: 'Venus flytrap closing is tropism', outcome: 'Not quite — Students often think that because Mimosa leaflets fold "toward" the touch point, it is a tropic.', reveals: 'because-mimosa-leaflets-fold-toward' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Control and Coordination · Part 1/2', spots: [
            { id: 's1', label: 'Control and Coordination in Animals vs Plants Overview', prompt: 'Which idea is this? — Control and coordination is the biological process by which organisms detect changes.', answer: 'Control and Coordination in Animals vs Plants Overview', options: ['Control and Coordination in Animals vs Plants Overview', 'Human Nervous System Neurons and Their Structure', 'Reflex Action and Reflex Arc Pathway and Significance', 'Human Brain Forebrain Midbrain and Hindbrain Functions'] },
            { id: 's2', label: 'Human Nervous System Neurons and Their Structure', prompt: 'Which idea is this? — A neuron is the structural and functional unit of the nervous system, specialized for.', answer: 'Human Nervous System Neurons and Their Structure', options: ['Human Nervous System Neurons and Their Structure', 'Control and Coordination in Animals vs Plants Overview', 'Reflex Action and Reflex Arc Pathway and Significance', 'Human Brain Forebrain Midbrain and Hindbrain Functions'] },
            { id: 's3', label: 'Reflex Action and Reflex Arc Pathway and Significance', prompt: 'Which idea is this? — A reflex action is an involuntary, rapid, and stereotyped response to a specific stimulus.', answer: 'Reflex Action and Reflex Arc Pathway and Significance', options: ['Reflex Action and Reflex Arc Pathway and Significance', 'Control and Coordination in Animals vs Plants Overview', 'Human Nervous System Neurons and Their Structure', 'Human Brain Forebrain Midbrain and Hindbrain Functions'] },
            { id: 's4', label: 'Human Brain Forebrain Midbrain and Hindbrain Functions', prompt: 'Which idea is this? — The human brain is the central control center of the nervous system, divided into three.', answer: 'Human Brain Forebrain Midbrain and Hindbrain Functions', options: ['Human Brain Forebrain Midbrain and Hindbrain Functions', 'Control and Coordination in Animals vs Plants Overview', 'Human Nervous System Neurons and Their Structure', 'Reflex Action and Reflex Arc Pathway and Significance'] },
            { id: 's5', label: 'Coordination in Plants Nastic Movements Thigmonasty', prompt: 'Which idea is this? — Nastic movements are non-directional plant responses to stimuli (such as touch, light,.', answer: 'Coordination in Plants Nastic Movements Thigmonasty', options: ['Coordination in Plants Nastic Movements Thigmonasty', 'Control and Coordination in Animals vs Plants Overview', 'Human Nervous System Neurons and Their Structure', 'Reflex Action and Reflex Arc Pathway and Significance'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_001', title: 'A real-world call',
          caseStudy: { intro: 'Understanding the nervous system lets us build better prosthetics and brain-computer interfaces — and raises the question of who owns the neural data a device records.',
            decisions: [{ prompt: 'Should your brain\'s data have special protection?', options: [
                { text: 'Yes — neural data is the last private frontier', outcome: 'The privacy-maximalist answer; the risk is regulation that slows devices that could restore movement to the paralyzed.' },
                { text: 'No — data is data, protect it like everything else', outcome: 'The uniform-privacy answer; it underestimates that neural data reveals intent, not just behaviour.' },
                { text: 'Yes — but only for data that reveals thought, not function', outcome: 'The surgical answer — protect what the device infers, not what it measures; the hard part is telling them apart.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Meera snatches her hand back from a hot iron before she even feels the burn. A week later she notices her windowsill money plant has leaned sideways toward the light. She wonders how both \'knew\' what to do.',
            decisions: [{ prompt: 'How are these two responses coordinated differently?', options: [
                { text: 'Her hand used a nervous reflex arc — receptors in the skin fired a sensory neuron to the spinal cord, which fired a motor neuron to the muscle, all in a split second. The plant has no nerves; auxin hormone redistributed to the shaded side, making those cells elongate and slowly bend the stem toward light.', outcome: 'Both are real coordination: animals use fast electrochemical nerve impulses with receptor and effector, plants use slower chemical signals (hormones) that redirect growth.' },
                { text: 'The plant bent because sunlight physically pushed the stem over, the same way the heat pushed her hand away.', outcome: 'Nothing pushed either one — both are living responses to a stimulus, one through nerves and one through differential growth driven by a hormone.', reveals: 'tropism-is-physical-push' },
                { text: 'Plants must have tiny nerves like ours, just slower ones, since both responses move a body part.', outcome: 'Plants coordinate without a nervous system — through hormones such as auxin and through electrical-chemical waves in cells, not neurons.', reveals: 'plants-have-nerves' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Stimulus to response in milliseconds — you traced the fastest circuit your body owns.',
            decisions: [{ prompt: 'What comes next? Control and Coordination · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Control and Coordination · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'reflex', prompt: 'Explore the reflex interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'reflex', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_001', difficulty: 'standard',
          question: 'Control and coordination is the biological process by which organisms detect.',
          hint: 'If stuck, review c9_bio_ch2_8 (neuron structure) and c6_biology_ch10_007 (plant.',
          misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Control and coordination is the biological process by',
                  options: ['Control and coordination is the biological process by', 'A neuron is the structural and functional unit of the nervous system, specialized for', 'A reflex action is an involuntary, rapid, and stereotyped response to a specific stimulus', 'The human brain is the central control center of the nervous system, divided into three'],
                  hint: 'If stuck, review c9_bio_ch2_8 (neuron structure) and c6_biology_ch10_007 (plant responses).',
                  misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf folding of mimosa.' }
          ],
            remediations: { 'plants-have-a-nervous-system': { steps: ['Revisit Class 6 plant responses (c6_biology_ch10_007) and Class 9 nervous tissue (c9_bio_ch2_8) to list structures.', 'Create a two-column table: "Animal" (neurons, synapses, electrical impulses, brain, hormones in blood) vs "Plant" (no.', 'For each row, write one functional consequence (e.g., speed, distance, specificity).', 'Explain aloud why mimosa\'s electrical wave is not a nervous impulse (no neurons, all-or-none but no synapse).'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Plants are less coordinated than animals because they lack a brain." Is this biologically accurate? Justify.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'nervous system'],
                  hint: 'If stuck, review c9_bio_ch2_8 (neuron structure) and c6_biology_ch10_007 (plant responses).',
                  misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf folding of mimosa.' },
                { id: 'b', prompt: 'Design a simple experiment to demonstrate that a plant\'s response to light (phototropism) involves a chemical signal produced in the shoot tip, using two.', answer: 'Cover the shoot tip of seedling A with opaque foil cap',
                  options: ['Cover the shoot tip of seedling A with opaque foil cap', 'nervous system'],
                  hint: 'If stuck, review c9_bio_ch2_8 (neuron structure) and c6_biology_ch10_007 (plant responses).',
                  misconception: 'Students often think plants have a "nervous system" because they respond to stimuli, and they confuse the rapid leaf folding of mimosa.' }
          ],
            remediations: { 'plants-have-a-nervous-system': { steps: ['Revisit Class 6 plant responses (c6_biology_ch10_007) and Class 9 nervous tissue (c9_bio_ch2_8) to list structures.', 'Create a two-column table: "Animal" (neurons, synapses, electrical impulses, brain, hormones in blood) vs "Plant" (no.', 'For each row, write one functional consequence (e.g., speed, distance, specificity).', 'Explain aloud why mimosa\'s electrical wave is not a nervous impulse (no neurons, all-or-none but no synapse).'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_002', difficulty: 'standard',
          question: 'A neuron is the structural and functional unit of the nervous system.',
          hint: 'If stuck, revisit c9_bio_ch1_3 (cell membrane structure and selective permeability) and.',
          misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.',
          parts: [
                { id: 'a', prompt: 'A patient has a demyelinating disease (like Multiple Sclerosis) where the myelin sheath is damaged but the axon itself is intact.', answer: 'Step 1: Identify the defect',
                  options: ['Step 1: Identify the defect', 'no effect because axon is intact'],
                  hint: 'If stuck, revisit c9_bio_ch1_3 (cell membrane structure and selective permeability) and.',
                  misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.' },
                { id: 'b', prompt: 'Compare the structural adaptations of a sensory neuron (e.g., from skin to spinal cord) and a motor neuron (e.g., from spinal cord to muscle) that suit their.', answer: 'Three key differences: (1) Sensory neurons are typically pseudounipolar',
                  options: ['Three key differences: (1) Sensory neurons are typically pseudounipolar', 'both are identical', 'differentiate'],
                  hint: 'If stuck, revisit c9_bio_ch1_3 (cell membrane structure and selective permeability) and.',
                  misconception: 'Students believe the nerve impulse is an electric current flowing through the axon like electrons in a copper wire.' }
          ],
            remediations: { 'the-nerve-impulse-is-an': { steps: ['Use the "dominoes" analogy — line up dominoes (ion channels); tipping the first (stimulus) causes a wave that travels.', 'Show a simple animation (or draw frames) of Na⁺ entering, K⁺ leaving at one spot, triggering the next spot.', 'Emphasize: no net ion flow along the axon length; each segment regenerates the signal.', 'Contrast with a wire — cut a wire, current stops; cut an axon, signal stops only at the cut, but the mechanism is local.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_003', difficulty: 'standard',
          question: 'A reflex action is an involuntary, rapid, and stereotyped response to.',
          hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus.',
          misconception: 'Students believe the brain is part of the reflex arc and "approves" the reflex action.',
          parts: [
                { id: 'a', prompt: 'A doctor taps the patellar tendon below a patient\'s kneecap with a rubber hammer, and the lower leg kicks forward.', answer: 'Receptor: Muscle spindle in quadriceps (detects stretch)',
                  options: ['Receptor: Muscle spindle in quadriceps (detects stretch)', 'skin receptor', 'brain interneuron', 'approves'],
                  hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus on synapse.',
                  misconception: 'Students believe the brain is part of the reflex arc and "approves" the reflex action.' },
                { id: 'b', prompt: 'Compare the neural pathway of a reflex action (touching a hot plate) with a voluntary action (deciding to pick up a pen).', answer: '1) Reflex arc: Interneuron in spinal cord',
                  options: ['1) Reflex arc: Interneuron in spinal cord', 'approves', 'the brain is part of the reflex arc and "approves" the reflex action'],
                  hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus on synapse.',
                  misconception: 'Students believe the brain is part of the reflex arc and "approves" the reflex action.' }
          ],
            remediations: { 'the-brain-is-part-of': { steps: ['Draw the reflex arc on paper with five labeled boxes.', 'Use a red pen to draw the "pain signal to brain" as a separate upward arrow from the spinal cord.', 'Use a blue pen to draw the "motor command from brain" as a separate downward arrow — note it arrives *after* the reflex.', 'Say aloud: "Spinal cord decides *now*; brain learns *later*."'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_004', difficulty: 'standard',
          question: 'The human brain is the central control center of the nervous system, divided.',
          hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus.',
          misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and.',
          parts: [
                { id: 'a', prompt: 'Name the three major divisions of the human brain and give one main function of each.', answer: 'The three divisions are: (1) Forebrain',
                  options: ['The three divisions are: (1) Forebrain', 'cerebrum controls breathing', 'midbrain', 'connects forebrain and hindbrain'],
                  hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus on how.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' },
                { id: 'b', prompt: 'A student writes: "The cerebrum controls involuntary actions like heartbeat and breathing." Is this correct? Explain why or why not.', answer: 'Incorrect',
                  options: ['Incorrect', 'midbrain', 'connects forebrain and hindbrain'],
                  hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus on how.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' },
                { id: 'c', prompt: 'Compare the roles of the thalamus and hypothalamus in the forebrain. How does a tumor in each region produce different symptom clusters?', answer: 'Thalamus: major sensory relay station (except smell) to cerebrum',
                  options: ['Thalamus: major sensory relay station (except smell) to cerebrum', 'brain dysfunction', 'differentiate', 'midbrain'],
                  hint: 'Revisit c10_bio_cbse_02_002 (neuron structure) and c9_bio_ch2_8 (nervous tissue) — focus on how.',
                  misconception: 'Students think the "midbrain" is a minor relay with no distinct function, so they write "connects forebrain and hindbrain" as its only.' }
          ],
            remediations: { 'the-midbrain-is-a-minor': { steps: ['Draw a simple brainstem cross-section on paper: label midbrain at top, pons middle, medulla bottom.', 'Write "Superior colliculus → visual reflex (e.g., blink at bright light)" and "Inferior colliculus → auditory reflex.', 'Say aloud: "Midbrain = Reflex center for sight & sound."', 'Practice one NCERT exemplar question: "Which part of the brain controls the reflex movement of the head when a sudden.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_005', difficulty: 'standard',
          question: 'Tropic movements are directional growth responses of plants to external stimuli.',
          hint: 'If stuck, revisit c9_bio_ch2_2 (Meristematic Tissues: Apical, Lateral and Intercalary).',
          misconception: 'Students believe auxin *always* promotes growth. They write: "Auxin accumulates on the lower side of the root, so the.',
          parts: [
                { id: 'a', prompt: 'Compare the mechanism of phototropism and geotropism in shoots with respect to: (a) the stimulus, (b) the site of perception, (c) the direction of auxin.', answer: 'the stimulus, (',
                  options: ['the stimulus, (', 'root cap perceives light', 'auxin *always* promotes growth'],
                  hint: 'If stuck, revisit c9_bio_ch2_2 (Meristematic Tissues: Apical, Lateral and Intercalary) for growth.',
                  misconception: 'Students believe auxin *always* promotes growth. They write: "Auxin accumulates on the lower side of the root, so the lower side grows.' }
          ],
            remediations: { 'auxin-always-promotes-growth': { steps: ['Re-read the definition of positive and negative geotropism.', 'Perform the "horizontal seedling" experiment: germinate two bean seeds, place one horizontally, one vertically on moist.', 'Draw the horizontal seedling, mark the lower and upper sides of root and shoot.', 'Write "Auxin HIGH on lower side" on both.'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_02_006', difficulty: 'standard',
          question: 'Nastic movements are non-directional plant responses to stimuli (such as touch.',
          hint: 'If stuck, review c9_bio_ch1_3 (cell membrane transport) and c10_bio_cbse_02_005 (tropic.',
          misconception: 'Students often think that because Mimosa leaflets fold "toward" the touch point, it is a tropic movement.',
          parts: [
                { id: 'a', prompt: 'A student touches one leaflet of a Mimosa plant, and within 2 seconds all leaflets on that leaf fold.', answer: 'Step 1: Touch stimulates mechanoreceptors on the leaflet',
                  options: ['Step 1: Touch stimulates mechanoreceptors on the leaflet', 'toward'],
                  hint: 'If stuck, review c9_bio_ch1_3 (cell membrane transport) and c10_bio_cbse_02_005 (tropic movements).',
                  misconception: 'Students often think that because Mimosa leaflets fold "toward" the touch point, it is a tropic movement (thigmotropism).' }
          ],
            remediations: { 'because-mimosa-leaflets-fold-toward': { steps: ['Revisit the definition of tropic vs nastic movements from node c10_bio_cbse_02_005 (Tropic Movements).', 'Observe a Mimosa plant — touch different parts of the same leaf (tip, base, side) and note the folding pattern.', 'Draw a labeled diagram of a Mimosa leaf showing pulvini at each leaflet base and petiole base; explain why the fixed.', 'Practice writing the distinction in a 3-mark answer format: "Two differences: (1) Directionality... (2) Speed...'], labTask: { instruction: 'On the interactive: speed up the signal — how fast does the reflex fire? — then check.', widget: 'reflex', validate: 'reflex:speed=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
