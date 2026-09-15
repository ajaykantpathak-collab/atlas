import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch04_p2: SimDef = {
    id: 'v3_c11_psy_ch04_p2',
    title: 'Sensory, Attentional and Perceptual Processes · Part 2/2',
    subtitle: 'Find the guesswork hidden inside what you see.',
    classLevel: 11, subject: 'psychology', topic: 'Sensory, Attentional and Perceptual Processes · Part 2/2',
    chapters: ['c11_psy_ch04'],
    nodeIds: ['c11_psy_cbse_04_007', 'c11_psy_cbse_04_008', 'c11_psy_cbse_04_009', 'c11_psy_cbse_04_010', 'c11_psy_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a psychophysicist measuring the edge of detection', intro: 'The eye delivers raw signal; the brain delivers a verdict — and the verdict starts editing the signal almost immediately.', goal: 'Distinguish sensation from perception and read thresholds as probabilistic, not absolute.' },
    discovery: {
        question: 'My absolute threshold for a tone is 0 dB — so anything quieter is completely inaudible to me?',
        options: ['No — the threshold is a 50%-detection estimate; neural noise means below-threshold tones are sometimes heard', 'Yes — a threshold is a hard wall', 'Yes — 0 dB is silence', 'No — because 0 dB is actually loud'],
        answer: 'No — the threshold is a 50%-detection estimate; neural noise means below-threshold tones are sometimes heard',
        hook: 'Sensation and perception aren\'t assembly-line stages — your brain\'s \'this is a face\' hypothesis tunes the senses within 100 ms, before you\'re aware.',
    },
    teaching: [
        { title: 'Determinants of Attention: External and Internal Factors', text: 'Determinants of attention are the specific external stimulus characteristics (e.g., size, intensity, motion, novelty) and internal psychological states (e.g., motives, interests, attitudes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Use Gestalt\'s \'whole differs from the sum\' to dismantle \'perception = sum of sensations,\' then explain why thresholds are measured over many trials.',
        labels: ['Determinants of Attention: External', 'Perceptual Organisation: Gestalt Principles', 'Perceptual Constancies: Size, Shape', 'Visual Illusions: Types', 'Socio-Cultural Influences on Perception'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_007', title: 'Determinants of Attention: External and Internal Factors',
          caseStudy: { intro: 'Imagine you are studying in a noisy café: the clatter of cups (intense, rhythmic sound), a friend waving (motion, biological relevance), and the smell.',
            decisions: [{ prompt: 'List the seven external factors of selective attention mentioned in the NCERT textbook and give one original example for each.', options: [
                { text: 'The seven external factors are: (1) Size', outcome: 'The seven external factors are: (1) Size — a full-page advertisement vs.' },
                { text: 'merges intensity and size, or omits rhythm/suddenness', outcome: 'Not quite — Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide.', reveals: 'internal-factors-mean-only-conscious' },
                { text: '\'internal factors\' mean only conscious, voluntary goals (e', outcome: 'Not quite — Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide.', reveals: 'internal-factors-mean-only-conscious' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_008', title: 'Perceptual Organisation: Gestalt Principles',
          caseStudy: { intro: 'Imagine you are scrolling through Instagram and see a post with a pattern of tiny dots arranged in rows and columns.',
            decisions: [{ prompt: 'State the Gestalt principle that explains why we perceive the Olympic rings as five interlaced circles rather than as nine separate curved.', options: [
                { text: 'The principle is **Continuity** (or Good Continuation)', outcome: 'The principle is **Continuity** (or Good Continuation). We perceive each ring as a continuous.' },
                { text: 'Proximity', outcome: 'Not quite — Students often believe that **each Gestalt principle operates in isolation and that a single.', reveals: 'each-gestalt-principle-operates-in' },
                { text: 'Similarity', outcome: 'Not quite — Students often believe that **each Gestalt principle operates in isolation and that a single.', reveals: 'each-gestalt-principle-operates-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_009', title: 'Perceptual Constancies: Size, Shape and Brightness',
          caseStudy: { intro: 'Imagine you\'re standing at one end of a long school corridor and your friend walks toward you from the far end.',
            decisions: [{ prompt: 'Define size constancy and state the specific retinal change that occurs when an object moves closer to the observer.', options: [
                { text: 'Size constancy is the perception of an object\'s size as relatively stable despite changes', outcome: 'Size constancy is the perception of an object\'s size as relatively stable despite changes in the.' },
                { text: 'retinal image becomes smaller', outcome: 'Not quite — Students often believe perceptual constancy means the retinal image *does not change* — they think.', reveals: 'perceptual-constancy-means-the-retinal' },
                { text: 'retinal image stays the same', outcome: 'Not quite — Students often believe perceptual constancy means the retinal image *does not change* — they think.', reveals: 'perceptual-constancy-means-the-retinal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_010', title: 'Visual Illusions: Types and Explanations',
          caseStudy: { intro: 'Imagine you are looking at railway tracks stretching into the distance — they appear to converge, yet you know they are parallel.',
            decisions: [{ prompt: 'Define "visual illusion" and distinguish it from a hallucination. Provide one example of a universal geometrical illusion.', options: [
                { text: 'A visual illusion is a misperception of a real external stimulus where perception', outcome: 'A visual illusion is a misperception of a real external stimulus where perception systematically.' },
                { text: 'illusions prove perception is unreliable', outcome: 'Not quite — Students often believe that "illusions prove perception is unreliable" or "illusions are errors the.', reveals: 'illusions-prove-perception-is-unreliable' },
                { text: 'illusions are errors the brain should avoid', outcome: 'Not quite — Students often believe that "illusions prove perception is unreliable" or "illusions are errors the.', reveals: 'illusions-prove-perception-is-unreliable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_011', title: 'Socio-Cultural Influences on Perception',
          caseStudy: { intro: 'Imagine you are shown a photograph of a railway track converging at the horizon.',
            decisions: [{ prompt: 'Define “socio-cultural influences on perception” in one sentence, using the term “perceptual habit.”', options: [
                { text: 'Socio-cultural influences on perception are the processes by', outcome: 'Socio-cultural influences on perception are the processes by which shared cultural practices and.' },
                { text: 'culture affects perception', outcome: 'Not quite — Students often think “cultural influence on perception” means people from different cultures *see.', reveals: 'cultural-influence-on-perception-means' },
                { text: 'cultural influence on perception', outcome: 'Not quite — Students often think “cultural influence on perception” means people from different cultures *see.', reveals: 'cultural-influence-on-perception-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a senses lab, a student explains: \'First all sensation happens, then perception starts — like an assembly line. And the absolute threshold for vision is a fixed number — one photon.\'',
            decisions: [{ prompt: 'What do the processes actually look like?', options: [
                { text: 'Correct the timing and the threshold: sensation (receptors encoding raw energy) and perception (brain interpreting via knowledge and expectation) run simultaneously and reciprocally — a \'face\' hypothesis tunes sensory processing within ~100 ms, before awareness. And thresholds are probabilistic: AL is the intensity detected on 50% of trials — a statistical boundary shifting with state and context, not a hard physical line.', outcome: 'The model updates: bottom-up data and top-down story interleave in real time, and \'threshold\' means a detection probability, not a wall.' },
                { text: 'Keep the assembly line — stimulus → receptor → brain → perception is the textbook sequence.', outcome: 'The diagram simplifies: in the live system, perceptual hypotheses modulate sensory gain within tens of milliseconds — the arrow loops, it doesn\'t just run forward.', reveals: 'sensation-then-perception' },
                { text: 'Keep the one-photon threshold — the minimum detectable stimulus is a fixed physical constant.', outcome: 'The 50%-of-trials criterion makes AL a statistic: it varies by person, day and context — that\'s precisely why it\'s estimated over many trials.', reveals: 'threshold-is-fixed-constant' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'Perceptual constancy is the proof: a door swinging open stays rectangular in your mind though its retinal image keeps warping.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_007', difficulty: 'standard',
          question: 'Determinants of attention are the specific external stimulus characteristics.',
          hint: 'Revisit the \'Selective Attention\' subsection in c11_psy_cbse_04_006, specifically the.',
          misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the.',
          parts: [
                { id: 'a', prompt: 'List the seven external factors of selective attention mentioned in the NCERT textbook and give one original example for each.', answer: 'The seven external factors are: (1) Size',
                  options: ['The seven external factors are: (1) Size', 'merges intensity and size, or omits rhythm/suddenness', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Revisit the \'Selective Attention\' subsection in c11_psy_cbse_04_006, specifically the paragraph.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' },
                { id: 'b', prompt: 'A driver is navigating a busy Delhi intersection while listening to a podcast. Suddenly, a pedestrian steps onto the road.', answer: 'External: sudden motion of pedestrian, high intensity (looming visual angle)',
                  options: ['External: sudden motion of pedestrian, high intensity (looming visual angle)', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Revisit the \'Selective Attention\' subsection in c11_psy_cbse_04_006, specifically the paragraph.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' },
                { id: 'c', prompt: 'Compare how \'novelty\' and \'preparatory set\' differently influence attentional selection in a student entering an examination hall for the first time versus.', answer: 'For the first-time student, novelty dominates: unfamiliar architecture, seating',
                  options: ['For the first-time student, novelty dominates: unfamiliar architecture, seating', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Revisit the \'Selective Attention\' subsection in c11_psy_cbse_04_006, specifically the paragraph.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' }
          ],
            remediations: { 'internal-factors-mean-only-conscious': { steps: ['Present the \'cocktail party effect\' (hearing your name in unattended ear) and ask: "Did you *decide* to hear your name?"', 'Show that the name captures attention even when you are intensely focused elsewhere — proving an automatic internal.', 'Contrast with a voluntary goal (\'I will listen for the word \'apple\'\') to separate preparatory set (cognitive) from.', 'Have the student re-classify the textbook\'s internal factors into \'automatic/unconscious\' (biological needs, personal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Internal factors are more powerful determinants of attention than external factors because they reflect the observer\'s goals." Use.', answer: 'The statement is false',
                  options: ['The statement is false', '\'internal factors\' mean only conscious, voluntary goals (e'],
                  hint: 'Revisit the \'Selective Attention\' subsection in c11_psy_cbse_04_006, specifically the paragraph.',
                  misconception: 'Students often believe \'internal factors\' mean only conscious, voluntary goals (e.g., \'I decide to pay attention to the teacher\').' }
          ],
            remediations: { 'internal-factors-mean-only-conscious': { steps: ['Present the \'cocktail party effect\' (hearing your name in unattended ear) and ask: "Did you *decide* to hear your name?"', 'Show that the name captures attention even when you are intensely focused elsewhere — proving an automatic internal.', 'Contrast with a voluntary goal (\'I will listen for the word \'apple\'\') to separate preparatory set (cognitive) from.', 'Have the student re-classify the textbook\'s internal factors into \'automatic/unconscious\' (biological needs, personal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_008', difficulty: 'standard',
          question: 'Perceptual organisation refers to the innate tendency of the human perceptual.',
          hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) and c11_psy_cbse_04_006 (Selective.',
          misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains".',
          parts: [
                { id: 'a', prompt: 'State the Gestalt principle that explains why we perceive the Olympic rings as five interlaced circles rather than as nine separate curved line segments.', answer: 'The principle is **Continuity** (or Good Continuation)',
                  options: ['The principle is **Continuity** (or Good Continuation)', 'Proximity', 'Similarity', 'explains'],
                  hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) and c11_psy_cbse_04_006 (Selective Attention).',
                  misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a given percept**.' },
                { id: 'b', prompt: 'A teacher draws two rows of 10 dots each on the board. In Row A, the dots are evenly spaced 2 cm apart.', answer: 'Row A (uniform 2 cm spacing) will be seen as **a single line of 10 dots**',
                  options: ['Row A (uniform 2 cm spacing) will be seen as **a single line of 10 dots**', '10 separate dots in Row B', 'one group in Row B', 'explains'],
                  hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) and c11_psy_cbse_04_006 (Selective Attention).',
                  misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a given percept**.' }
          ],
            remediations: { 'each-gestalt-principle-operates-in': { steps: ['Present a single complex display (e.g., a city skyline silhouette with windows, doors, antennas) and ask the student.', 'Have them **manipulate one cue at a time** (e.g., increase spacing between windows) and predict how the grouping.', 'Use the phrase "perceptual election" repeatedly: each principle casts a vote weighted by cue strength; the percept.', 'This replaces the "one principle per figure" mental model with a competitive integration model.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_009', difficulty: 'standard',
          question: 'Perceptual constancy is the tendency to perceive familiar objects as having.',
          hint: 'Review "Visual Sensation: Structure of the Eye and Photoreceptors" (c11_psy_cbse_04_003).',
          misconception: 'Students often believe perceptual constancy means the retinal image *does not change* — they think "constancy" applies.',
          parts: [
                { id: 'a', prompt: 'A student says: "Shape constancy means the retinal image of a door stays rectangular whether it\'s open or closed." Explain why this statement is incorrect and.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'constancy', '"constancy" applies to the sensory input rather than the percept'],
                  hint: 'Review "Visual Sensation: Structure of the Eye and Photoreceptors" (c11_psy_cbse_04_003) for.',
                  misconception: 'Students often believe perceptual constancy means the retinal image *does not change* — they think "constancy" applies to the sensory input.' },
                { id: 'b', prompt: 'You are in a brightly lit room holding a white sheet of paper. You walk into a dimly lit hallway still holding the paper. The paper continues to look white.', answer: 'Brightness constancy is operating',
                  options: ['Brightness constancy is operating', 'constancy', 'size or shape constancy, or saying the reflected light stays the same', '"constancy" applies to the sensory input rather than the percept'],
                  hint: 'Review "Visual Sensation: Structure of the Eye and Photoreceptors" (c11_psy_cbse_04_003) for.',
                  misconception: 'Students often believe perceptual constancy means the retinal image *does not change* — they think "constancy" applies to the sensory input.' },
                { id: 'c', prompt: 'Compare and contrast size constancy and shape constancy in terms of: (a) the retinal variable that changes, (b) the viewing condition that causes the change.', answer: 'the retinal variable that changes, (',
                  options: ['the retinal variable that changes, (', 'constancy', '"constancy" applies to the sensory input rather than the percept'],
                  hint: 'Review "Visual Sensation: Structure of the Eye and Photoreceptors" (c11_psy_cbse_04_003) for.',
                  misconception: 'Students often believe perceptual constancy means the retinal image *does not change* — they think "constancy" applies to the sensory input.' }
          ],
            remediations: { 'perceptual-constancy-means-the-retinal': { steps: ['Have the student physically hold a ruler at arm\'s length, measure the angular size of a distant object (e.g., a door).', 'Ask: "If the retinal image doubled, why doesn\'t the door look twice as big?" 3.', 'Guide them to articulate: "The brain uses distance information to *rescale* the retinal input." 4.', 'Finally, have them state the definition of size constancy *including the phrase "despite changes in retinal image.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_010', difficulty: 'standard',
          question: 'Visual illusions are systematic misperceptions where the perceptual experience.',
          hint: 'Revisit c11_psy_cbse_04_009 (Perceptual Constancies) — specifically the size constancy.',
          misconception: 'Students often believe that "illusions prove perception is unreliable" or "illusions are errors the brain should.',
          parts: [
                { id: 'a', prompt: 'A student from a remote rural village with no exposure to rectangular architecture and a student from an urban city both view the Muller-Lyer illusion.', answer: 'The urban student will show stronger Muller-Lyer illusion susceptibility',
                  options: ['The urban student will show stronger Muller-Lyer illusion susceptibility', 'nature vs', 'illusions are errors the brain should avoid', 'universal illusion'],
                  hint: 'Revisit c11_psy_cbse_04_009 (Perceptual Constancies) — specifically the size constancy section.',
                  misconception: 'Students often believe that "illusions prove perception is unreliable" or "illusions are errors the brain should avoid." This is wrong.' }
          ],
            remediations: { 'illusions-prove-perception-is-unreliable': { steps: ['If a student holds this misconception: (1) Show the "hollow mask illusion" (concave face perceived as convex) — explain.', '(1963) data table: calculate illusion magnitude differences across 14 cultural groups to empirically disprove.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_011', difficulty: 'standard',
          question: 'Socio-cultural influences on perception refer to the systematic ways in which.',
          hint: 'Revisit the “Perceptual Constancies” (c11_psy_cbse_04_009) and “Visual Illusions”.',
          misconception: 'Students often think “cultural influence on perception” means people from different cultures *see different physical.',
          parts: [
                { id: 'a', prompt: 'Define “socio-cultural influences on perception” in one sentence, using the term “perceptual habit.”', answer: 'Socio-cultural influences on perception are the processes by',
                  options: ['Socio-cultural influences on perception are the processes by', 'culture affects perception', 'cultural influence on perception', 'Africans literally see the vertical line as longer'],
                  hint: 'Revisit the “Perceptual Constancies” (c11_psy_cbse_04_009) and “Visual Illusions”.',
                  misconception: 'Students often think “cultural influence on perception” means people from different cultures *see different physical realities* (e.g.' },
                { id: 'b', prompt: 'A researcher shows a two-dimensional drawing of a cube (using linear perspective) to three groups: (1) urban college students, (2) rural farmers with no formal.', answer: 'Urban students will be most accurate',
                  options: ['Urban students will be most accurate', 'cultural influence on perception', 'Africans literally see the vertical line as longer'],
                  hint: 'Revisit the “Perceptual Constancies” (c11_psy_cbse_04_009) and “Visual Illusions”.',
                  misconception: 'Students often think “cultural influence on perception” means people from different cultures *see different physical realities* (e.g.' }
          ],
            remediations: { 'cultural-influence-on-perception-means': { steps: ['If a student conflates sensation with perception, first re-watch the “Sensation vs Perception” node.', 'Then, using the Müller-Lyer figure, walk through the inference: “The visual system assumes the arrow-heads are corners.', 'Because it *assumes* the line is farther, it scales it up, making it look shorter.” Have the student trace the same.', 'Finally, ask them to predict the illusion magnitude for a hypothetical culture that lives in underground tunnels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
