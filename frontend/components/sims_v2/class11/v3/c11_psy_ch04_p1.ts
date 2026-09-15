import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch04_p1: SimDef = {
    id: 'v3_c11_psy_ch04_p1',
    title: 'Sensory, Attentional and Perceptual Processes · Part 1/2',
    subtitle: 'Find the guesswork hidden inside what you see.',
    classLevel: 11, subject: 'psychology', topic: 'Sensory, Attentional and Perceptual Processes · Part 1/2',
    chapters: ['c11_psy_ch04'],
    nodeIds: ['c11_psy_cbse_04_001', 'c11_psy_cbse_04_002', 'c11_psy_cbse_04_003', 'c11_psy_cbse_04_004', 'c11_psy_cbse_04_005', 'c11_psy_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a psychophysicist measuring the edge of detection', intro: 'The eye delivers raw signal; the brain delivers a verdict — and the verdict starts editing the signal almost immediately.', goal: 'Distinguish sensation from perception and read thresholds as probabilistic, not absolute.' },
    discovery: {
        question: 'My absolute threshold for a tone is 0 dB — so anything quieter is completely inaudible to me?',
        options: ['No — the threshold is a 50%-detection estimate; neural noise means below-threshold tones are sometimes heard', 'Yes — a threshold is a hard wall', 'Yes — 0 dB is silence', 'No — because 0 dB is actually loud'],
        answer: 'No — the threshold is a 50%-detection estimate; neural noise means below-threshold tones are sometimes heard',
        hook: 'Sensation and perception aren\'t assembly-line stages — your brain\'s \'this is a face\' hypothesis tunes the senses within 100 ms, before you\'re aware.',
    },
    teaching: [
        { title: 'Sensation vs Perception: Distinction and Relationship', text: 'Sensation is the initial, bottom-up process by which sensory receptors detect and encode raw physical energy (light, sound, pressure) into neural signals, yielding elementary experiences such.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Use Gestalt\'s \'whole differs from the sum\' to dismantle \'perception = sum of sensations,\' then explain why thresholds are measured over many trials.',
        labels: ['Sensation vs Perception: Distinction', 'Nature and Varieties', 'Visual Sensation: Structure', 'Auditory Sensation: Structure', 'Other Senses: Skin, Chemical', 'Attention: Selective, Sustained'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_002', title: 'Nature and Varieties of Stimulus: Absolute and Difference Thresholds',
          caseStudy: { intro: 'Imagine you are in a completely dark room and someone gradually turns up a dimmer switch on a single bulb. At what point do you first see the light?',
            decisions: [{ prompt: 'Define absolute threshold (absolute limen) and state the criterion used to measure it in psychophysics.', options: [
                { text: 'Absolute threshold is the minimum stimulus intensity required to activate a sensory', outcome: 'Absolute threshold is the minimum stimulus intensity required to activate a sensory system.' },
                { text: '50% of trials', outcome: 'Not quite — Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute.', reveals: 'students-treat-absolute-and-difference' },
                { text: 'AL is the minimum stimulus you can detect', outcome: 'Not quite — Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute.', reveals: 'students-treat-absolute-and-difference' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_004', title: 'Auditory Sensation: Structure of the Ear and Hearing Process',
          caseStudy: { intro: 'Imagine you are sitting in a quiet room and suddenly hear a sharp "crack" — a pencil snapping.',
            decisions: [{ prompt: 'Name the three smallest bones in the human body located in the middle ear and state their collective function in the hearing process.', options: [
                { text: 'The three auditory ossicles are the malleus (hammer), incus (anvil), and stapes (stirrup)', outcome: 'The three auditory ossicles are the malleus (hammer), incus (anvil), and stapes (stirrup).' },
                { text: 'they transmit sound to the brain', outcome: 'Not quite — Students believe the **cochlea is a simple microphone** that converts sound waves into neural.', reveals: 'the-cochlea-is-a-simple' },
                { text: 'they vibrate the cochlea directly', outcome: 'Not quite — Students believe the **cochlea is a simple microphone** that converts sound waves into neural.', reveals: 'the-cochlea-is-a-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_005', title: 'Other Senses: Skin, Chemical (Smell and Taste) and Kinesthetic',
          caseStudy: { intro: 'Imagine you\'re eating a hot samosa: you feel its crisp texture (touch), sense the steam\'s warmth (temperature), taste the spicy filling (gustation), smell the.',
            decisions: [{ prompt: 'Name the four distinct cutaneous modalities and identify the specific receptor type responsible for each modality.', options: [
                { text: 'The four cutaneous modalities are: (1) Pressure/touch', outcome: 'The four cutaneous modalities are: (1) Pressure/touch — Merkel discs (sustained pressure).' },
                { text: 'touch, heat, cold, pain', outcome: 'Not quite — Students believe taste buds are only on the tongue and that each taste maps to a specific tongue.', reveals: 'taste-buds-are-only-on' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_006', title: 'Attention: Selective, Sustained and Divided Attention',
          caseStudy: { intro: 'Imagine you\'re sitting in a noisy café trying to study for your psychology exam while your friend talks about a movie, background music plays, and the barista.',
            decisions: [{ prompt: 'Define selective attention and state its primary function according to the filter theory of attention.', options: [
                { text: 'Selective attention is the process of choosing a limited number of stimuli from a large', outcome: 'Selective attention is the process of choosing a limited number of stimuli from a large pool for.' },
                { text: 'selective attention means paying attention to everything important', outcome: 'Not quite — Students believe "divided attention" means truly parallel processing of two complex tasks (e.g., "I.', reveals: 'divided-attention-means-truly-parallel' },
                { text: 'divided attention', outcome: 'Not quite — Students believe "divided attention" means truly parallel processing of two complex tasks (e.g., "I.', reveals: 'divided-attention-means-truly-parallel' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a senses lab, a student explains: \'First all sensation happens, then perception starts — like an assembly line. And the absolute threshold for vision is a fixed number — one photon.\'',
            decisions: [{ prompt: 'What do the processes actually look like?', options: [
                { text: 'Correct the timing and the threshold: sensation (receptors encoding raw energy) and perception (brain interpreting via knowledge and expectation) run simultaneously and reciprocally — a \'face\' hypothesis tunes sensory processing within ~100 ms, before awareness. And thresholds are probabilistic: AL is the intensity detected on 50% of trials — a statistical boundary shifting with state and context, not a hard physical line.', outcome: 'The model updates: bottom-up data and top-down story interleave in real time, and \'threshold\' means a detection probability, not a wall.' },
                { text: 'Keep the assembly line — stimulus → receptor → brain → perception is the textbook sequence.', outcome: 'The diagram simplifies: in the live system, perceptual hypotheses modulate sensory gain within tens of milliseconds — the arrow loops, it doesn\'t just run forward.', reveals: 'sensation-then-perception' },
                { text: 'Keep the one-photon threshold — the minimum detectable stimulus is a fixed physical constant.', outcome: 'The 50%-of-trials criterion makes AL a statistic: it varies by person, day and context — that\'s precisely why it\'s estimated over many trials.', reveals: 'threshold-is-fixed-constant' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Perceptual constancy is the proof: a door swinging open stays rectangular in your mind though its retinal image keeps warping.',
            decisions: [{ prompt: 'What comes next? Sensory, Attentional and Perceptual Processes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sensory, Attentional and Perceptual Processes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_001', difficulty: 'standard',
          question: 'Sensation is the initial, bottom-up process by which sensory receptors detect.',
          hint: 'Revisit Class 10 Biology Chapter 2 "Control and Coordination" — specifically the neuron.',
          misconception: 'Students believe sensation and perception occur in strict temporal sequence — first all sensation finishes, then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sensation is the initial, bottom-up process by',
                  options: ['Sensation is the initial, bottom-up process by', 'Absolute threshold (absolute limen, AL) is the minimum intensity of a stimulus required', 'Visual sensation is the process by', 'Auditory sensation is the process by'],
                  hint: 'Revisit Class 10 Biology Chapter 2 "Control and Coordination" — specifically the neuron diagram.',
                  misconception: 'Students believe sensation and perception occur in strict temporal sequence — first all sensation finishes, then perception begins — like.' }
          ],
            remediations: { 'sensation-and-perception-occur-in': { steps: ['Show the "hollow mask illusion" video (Charlie Chaplin mask rotating): the concave side is *sensed* as hollow, but.', 'Have them hold a finger at arm\'s length, focus on it (sensation: double background), then focus on background.', 'Explicitly map each experience to "sensation = what receptors send; perception = what brain decides" to break the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_002', difficulty: 'standard',
          question: 'Absolute threshold (absolute limen, AL) is the minimum intensity of a stimulus.',
          hint: 'Revisit c11_psy_cbse_04_001 (sensation definition and sense modalities) and.',
          misconception: 'Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute threshold for.',
          parts: [
                { id: 'a', prompt: 'A researcher tests a participant\'s difference threshold for brightness. The standard stimulus is a 50 cd/m² patch.', answer: 'DL = 5 cd/m² (55 − 50)',
                  options: ['DL = 5 cd/m² (55 − 50)', 'AL is the minimum stimulus you can detect', 'Why is AL determined over multiple trials?', 'Why does AL vary for the same person on different days?'],
                  hint: 'Revisit c11_psy_cbse_04_001 (sensation definition and sense modalities) and c10_bio_cbse_02_002.',
                  misconception: 'Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute threshold for vision is 1 photon").' }
          ],
            remediations: { 'students-treat-absolute-and-difference': { steps: ['Ask the student to perform a mini-experiment: in a quiet room, have a friend whisper a word from 3m away.', 'Count how many times the word is understood.', 'Show the curve crosses 50% at a specific distance — that is the operational AL.', 'Repeat next day when tired/hungry; observe the shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute threshold for.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If my absolute threshold for hearing a tone is 0 dB SPL, then any tone below 0 dB SPL is completely inaudible to me." Evaluate this claim.', answer: 'The claim is false',
                  options: ['The claim is false', 'threshold as a rigid wall', 'AL is the minimum stimulus you can detect', 'Why is AL determined over multiple trials?'],
                  hint: 'Revisit c11_psy_cbse_04_001 (sensation definition and sense modalities) and c10_bio_cbse_02_002.',
                  misconception: 'Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute threshold for vision is 1 photon").' },
                { id: 'b', prompt: 'Design a simple classroom experiment to estimate the class average difference threshold for saltiness using salt solutions.', answer: 'standard stimulus, (',
                  options: ['standard stimulus, (', 'AL is the minimum stimulus you can detect', 'Why is AL determined over multiple trials?', 'Why does AL vary for the same person on different days?'],
                  hint: 'Revisit c11_psy_cbse_04_001 (sensation definition and sense modalities) and c10_bio_cbse_02_002.',
                  misconception: 'Students treat absolute and difference thresholds as fixed, universal constants (like "the absolute threshold for vision is 1 photon").' }
          ],
            remediations: { 'students-treat-absolute-and-difference': { steps: ['Ask the student to perform a mini-experiment: in a quiet room, have a friend whisper a word from 3m away.', 'Count how many times the word is understood.', 'Show the curve crosses 50% at a specific distance — that is the operational AL.', 'Repeat next day when tired/hungry; observe the shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_003', difficulty: 'standard',
          question: 'Visual sensation is the process by which light energy (electromagnetic.',
          hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) focusing on the transduction step.',
          misconception: 'Students often believe the lens is the primary refractive structure of the eye because cameras use lenses for focusing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Visual sensation is the process by',
                  options: ['Visual sensation is the process by', 'Sensation is the initial, bottom-up process by', 'Absolute threshold (absolute limen, AL) is the minimum intensity of a stimulus required', 'Auditory sensation is the process by'],
                  hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) focusing on the transduction step, and.',
                  misconception: 'Students often believe the lens is the primary refractive structure of the eye because cameras use lenses for focusing.' }
          ],
            remediations: { 'the-lens-is-the-primary': { steps: ['Draw a schematic eye labeling refractive indices: air (1.00) → cornea (1.376) → aqueous (1.336) → lens (1.386-1.406) →.', 'Calculate relative refractive power at each interface using (n2-n1)/radius.', 'Show cornea\'s large index jump (1.00→1.376) vs lens\'s small jumps.', 'Demonstrate with a water-filled glass sphere (cornea model) that most focusing occurs at the first surface.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_004', difficulty: 'standard',
          question: 'Auditory sensation is the process by which sound waves (mechanical pressure.',
          hint: 'If stuck, revisit **c11_psy_cbse_04_001** (Sensation vs Perception) for transduction.',
          misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Auditory sensation is the process by',
                  options: ['Auditory sensation is the process by', 'Sensation is the initial, bottom-up process by', 'Absolute threshold (absolute limen, AL) is the minimum intensity of a stimulus required', 'Visual sensation is the process by'],
                  hint: 'If stuck, revisit **c11_psy_cbse_04_001** (Sensation vs Perception) for transduction definition and.',
                  misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once" — like a light sensor.' }
          ],
            remediations: { 'the-cochlea-is-a-simple': { steps: ['If the student holds the "microphone" misconception: **Step 1** — Use a physical ear model (or 3D animation) to trace.', 'Emphasize each arrow is a *transduction* with gain/loss.', '**Step 2** — Demonstrate impedance mismatch: tap a table with a finger (air-coupled) vs.', 'press ear to table (bone-coupled).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_005', difficulty: 'standard',
          question: 'The cutaneous senses (skin), chemical senses (olfaction and gustation), and.',
          hint: 'Review Class 10 Biology Chapter 7 (Control and Coordination) — specifically neuron.',
          misconception: 'Students believe taste buds are only on the tongue and that each taste maps to a specific tongue region (tongue map.',
          parts: [
                { id: 'a', prompt: 'Name the four distinct cutaneous modalities and identify the specific receptor type responsible for each modality.', answer: 'The four cutaneous modalities are: (1) Pressure/touch',
                  options: ['The four cutaneous modalities are: (1) Pressure/touch', 'touch, heat, cold, pain'],
                  hint: 'Review Class 10 Biology Chapter 7 (Control and Coordination) — specifically neuron structure.',
                  misconception: 'Students believe taste buds are only on the tongue and that each taste maps to a specific tongue region (tongue map myth).' }
          ],
            remediations: { 'taste-buds-are-only-on': { steps: ['Have the student place sugar/salt/lemon/quinine on different tongue regions (tip, sides, back) and palate with a cotton.', 'Show a video of single taste fibre recordings demonstrating broad tuning (one fibre responds to multiple qualities).', 'For kinesthetic vs. vestibular, have them close eyes and touch nose (kinesthetic works) vs.', 'Draw two-column comparison table with stimuli, receptors, pathways, functions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_006', difficulty: 'standard',
          question: 'Attention is the cognitive process of selectively concentrating on specific.',
          hint: 'If stuck, revisit c11_psy_cbse_04_001 (Sensation vs Perception) to clarify the stage.',
          misconception: 'Students believe "divided attention" means truly parallel processing of two complex tasks (e.g., "I can study and watch.',
          parts: [
                { id: 'a', prompt: 'Explain why divided attention is possible for an experienced driver talking to a passenger but dangerous for a novice driver doing the same.', answer: 'Divided attention works for the experienced driver',
                  options: ['Divided attention works for the experienced driver', 'experienced drivers are just better at multitasking', 'divided attention', 'I can study and watch TV effectively'],
                  hint: 'If stuck, revisit c11_psy_cbse_04_001 (Sensation vs Perception) to clarify the stage at which.',
                  misconception: 'Students believe "divided attention" means truly parallel processing of two complex tasks (e.g., "I can study and watch TV effectively").' },
                { id: 'b', prompt: 'Compare and contrast Broadbent\'s filter theory and Treisman\'s filter-attenuation theory regarding the fate of unattended stimuli.', answer: 'Broadbent: Unattended stimuli are completely blocked at the selective filter',
                  options: ['Broadbent: Unattended stimuli are completely blocked at the selective filter', 'both say unattended stimuli are processed equally', 'divided attention', 'I can study and watch TV effectively'],
                  hint: 'If stuck, revisit c11_psy_cbse_04_001 (Sensation vs Perception) to clarify the stage at which.',
                  misconception: 'Students believe "divided attention" means truly parallel processing of two complex tasks (e.g., "I can study and watch TV effectively").' }
          ],
            remediations: { 'divided-attention-means-truly-parallel': { steps: ['**Concrete demonstration**: Use the "dichotic listening" simulation (play two different audio stories simultaneously.', 'Ask student to shadow (repeat aloud) one story.', 'Then test recall of unattended story - they\'ll recall almost nothing, proving the filter/attenuation mechanism.', '**Automaticity training**: Have student practice a simple motor sequence (e.g., tapping a pattern) until automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
