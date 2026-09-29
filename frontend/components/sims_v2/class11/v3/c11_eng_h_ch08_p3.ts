import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch08_p3: SimDef = {
    id: 'v3_c11_eng_h_ch08_p3',
    title: 'Silk Road · Part 3/3',
    subtitle: 'Follow a geographer\'s pilgrimage where description is not the absence of plot.',
    classLevel: 11, subject: 'eng_h', topic: 'Silk Road · Part 3/3',
    chapters: ['c11_eng_h_ch08'],
    nodeIds: ['c11_eng_h_cbse_08_013', 'c11_eng_h_cbse_08_014', 'c11_eng_h_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a traveller-log analyst riding to Kailash', intro: 'Altitude headaches, a grim town called Hor, a stranger named Norbu — the plot is the road, but the meaning is in the pauses.', goal: 'Trace the travelogue\'s linear-yet-layered structure and read its title as metaphor.' },
    discovery: {
        question: 'Middleton drives a modern highway toward Mount Kailash — so why is the account called \'Silk Road\'?',
        options: ['The route retraces ancient paths, and the \'silk\' now traded is stories, beliefs and human connection', 'He was smuggling silk along NH 219', 'The title is ironic — the region never saw the real Silk Road', 'Pilgrims still carry bolts of silk to Kailash'],
        answer: 'The route retraces ancient paths, and the \'silk\' now traded is stories, beliefs and human connection',
        hook: 'The old road moved fabric; Middleton\'s road moves meaning — same track, different cargo.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Silk Road\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_08_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order the journey — Ravu to Hor to Darchen to the pass — and separate the action from the reflective pauses inside the linear timeline.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Silk Road\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the primary difference between note-making and summarising in terms of output format and purpose?', options: [
                { text: 'Note-making uses abbreviated points, nominalised verbs, and symbols for personal reference', outcome: 'Note-making uses abbreviated points, nominalised verbs, and symbols for personal reference.' },
                { text: 'summary is just shorter notes', outcome: 'Not quite — Students believe "using big vocabulary" impresses examiners. They replace simple text words with.', reveals: 'using-big-vocabulary-impresses-examiners' },
                { text: 'using big vocabulary', outcome: 'Not quite — Students believe "using big vocabulary" impresses examiners. They replace simple text words with.', reveals: 'using-big-vocabulary-impresses-examiners' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Silk Road\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a literature class based on a chapter like "Silk Road"?', options: [
                { text: 'The primary purpose is to explore the text\'s deeper meanings', outcome: 'The primary purpose is to explore the text\'s deeper meanings — themes, character motivations.' },
                { text: 'to summarize the story', outcome: 'Not quite — Students often think a discussion point is just a summary question (e.g., "What happens.', reveals: 'a-discussion-point-is-just' },
                { text: 'to give personal opinions without textual support', outcome: 'Not quite — Students often think a discussion point is just a summary question (e.g., "What happens.', reveals: 'a-discussion-point-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a geography-literature crossover project you must classify Nick Middleton\'s \'Silk Road\'. A teammate files it under \'history of the ancient trade route\' and another under \'pilgrimage narrative by a devout traveller to Mount Kailash\'.',
            decisions: [{ prompt: 'What kind of text is it, and what does the title actually mean?', options: [
                { text: 'A modern travelogue: a British geographer (observer, not pilgrim) drives a modern highway that follows the ancient Silk Road toward Kailash — sacred to Hindus, Buddhists, Jains and Bon alike. The title is metaphorical: the \'silk\' moving along the road now is stories, beliefs and human exchange, not fabric.', outcome: 'Genre shapes reading: travel writing blends personal journey, factual observation and reflection — the trade-route history is backdrop, not subject.' },
                { text: 'It\'s a history essay about silk trade — the road trip is just an excuse.', outcome: 'The route\'s history is context; the text\'s engine is the present-day journey and the people met — a travelogue, not a trade monograph.', reveals: 'title-is-literal-trade-route' },
                { text: 'It\'s a pilgrimage account — anyone travelling toward Kailash is a pilgrim.', outcome: 'Middleton is an observing geographer; his lens is landscape and culture, not devotion — mistaking narrator for pilgrim misreads the whole register.', reveals: 'traveller-equals-pilgrim' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'A travelogue can be a straight line on the map and still move in circles inside the traveller\'s head.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_013', difficulty: 'standard',
          question: 'Critical thinking on \'Silk Road\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, return to c11_eng_h_cbse_08_012 and practice writing 3-sentence evidence-based.',
          misconception: 'Students often confuse \'critical analysis\' with \'listing literary devices.\' They identify a metaphor (\'the wind was.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Silk Road\'',
                  options: ['Critical thinking on \'Silk Road\'', '\'Silk Road\' (Hornbill, ch', 'The plot/narrative arc of \'Silk Road\'', 'The setting of \'Silk Road\''],
                  hint: 'If stuck, return to c11_eng_h_cbse_08_012 and practice writing 3-sentence evidence-based answers.',
                  misconception: 'Students often confuse \'critical analysis\' with \'listing literary devices.\' They identify a metaphor (\'the wind was a blade\') and stop.' }
          ],
            remediations: { 'students-often-confuse-critical-analysis': { steps: ['Take a single dense paragraph (e.g., the description of the kora start).', 'Annotate *only* the verbs and adjectives describing the narrator\'s body.', 'Annotate *only* the verbs and adjectives describing the pilgrims\' bodies.', 'Write three sentences comparing the two lists: what does the grammatical contrast (passive suffering vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_014', difficulty: 'standard',
          question: 'Writing skills from \'Silk Road\' — using the text as a model or springboard for.',
          hint: 'If stuck, review **c11_eng_h_cbse_08_012 (Comprehension: Inferential Questions)**.',
          misconception: 'Students believe "using big vocabulary" impresses examiners. They replace simple text words with thesaurus synonyms.',
          parts: [
                { id: 'a', prompt: 'Read this 60-word excerpt: "The Himalayan monsoon shifts northward every 10,000 years due to axial tilt changes.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'using big vocabulary', 'one word for many', 'intelligent beyond age'],
                  hint: 'If stuck, review **c11_eng_h_cbse_08_012 (Comprehension: Inferential Questions)** — specifically.',
                  misconception: 'Students believe "using big vocabulary" impresses examiners. They replace simple text words with thesaurus synonyms (e.g., "The monsoon.' },
                { id: 'b', prompt: 'Compare these two summaries of the soybean text (NCERT p.78). Summary A: "Soybean is a legume growing in varied soils.', answer: 'Summary B is superior',
                  options: ['Summary B is superior', 'using big vocabulary', 'one word for many', 'intelligent beyond age'],
                  hint: 'If stuck, review **c11_eng_h_cbse_08_012 (Comprehension: Inferential Questions)** — specifically.',
                  misconception: 'Students believe "using big vocabulary" impresses examiners. They replace simple text words with thesaurus synonyms (e.g., "The monsoon.' }
          ],
            remediations: { 'using-big-vocabulary-impresses-examiners': { steps: ['Give the student a familiar 100-word text (e.g., a fairy tale).', 'Ask them to tell it in 3 sentences orally — this bypasses writing anxiety.', 'Transcribe their oral summary.', 'Highlight the connectors they used naturally ("so", "but", "then").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_015', difficulty: 'standard',
          question: 'Discussion points on \'Silk Road\' — speaking and listening around the text.',
          hint: 'If stuck, review c11_eng_h_cbse_08_013 (Critical Thinking) to practice turning textual.',
          misconception: 'Students often think a discussion point is just a summary question (e.g., "What happens at Darchen?") or a personal.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a \'discussion point\' in a literature class based on a chapter like "Silk Road"?', answer: 'The primary purpose is to explore the text\'s deeper meanings',
                  options: ['The primary purpose is to explore the text\'s deeper meanings', 'to summarize the story', 'to give personal opinions without textual support', 'What happens at Darchen?'],
                  hint: 'If stuck, review c11_eng_h_cbse_08_013 (Critical Thinking) to practice turning textual observations.',
                  misconception: 'Students often think a discussion point is just a summary question (e.g., "What happens at Darchen?") or a personal opinion ("I think the.' },
                { id: 'b', prompt: 'You are leading a discussion on the theme of \'physical vs. spiritual journey\' in "Silk Road." A classmate says, "The narrator only cares about reaching Mount.', answer: 'Step 1: Acknowledge the classmate\'s point (physical journey is central)',
                  options: ['Step 1: Acknowledge the classmate\'s point (physical journey is central)', 'What happens at Darchen?', 'I think the narrator is brave', 'a discussion point is just a summary question (e'],
                  hint: 'If stuck, review c11_eng_h_cbse_08_013 (Critical Thinking) to practice turning textual observations.',
                  misconception: 'Students often think a discussion point is just a summary question (e.g., "What happens at Darchen?") or a personal opinion ("I think the.' },
                { id: 'c', prompt: 'Compare the discussion potential of two episodes: (a) the narrator\'s encounter with the snow leopard, and (b) the description of the salt flats.', answer: 'The salt flats episode is richer',
                  options: ['The salt flats episode is richer', 'What happens at Darchen?', 'I think the narrator is brave', 'a discussion point is just a summary question (e'],
                  hint: 'If stuck, review c11_eng_h_cbse_08_013 (Critical Thinking) to practice turning textual observations.',
                  misconception: 'Students often think a discussion point is just a summary question (e.g., "What happens at Darchen?") or a personal opinion ("I think the.' }
          ],
            remediations: { 'a-discussion-point-is-just': { steps: ['If a student produces only factual or opinion-based prompts, guide them through this remediation: (1) Pick a striking.', '(2) Ask: "What is the author suggesting beneath the surface?" (3) Turn that into a \'How\' or \'Why\' question that cannot.', '(4) Test it: Can two students give different, text-supported answers?', 'If yes, it\'s a valid discussion point.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
