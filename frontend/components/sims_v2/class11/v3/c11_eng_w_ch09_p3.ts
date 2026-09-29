import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch09_p3: SimDef = {
    id: 'v3_c11_eng_w_ch09_p3',
    title: 'The Peacock (Poem) · Part 3/3',
    subtitle: 'Read a diaspora poem where distance is the subject, not the defect.',
    classLevel: 11, subject: 'eng_w', topic: 'The Peacock (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch09'],
    nodeIds: ['c11_eng_w_cbse_09_013', 'c11_eng_w_cbse_09_014', 'c11_eng_w_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader catching a blue shadow at the edge of a page', intro: 'A veranda, a book, a hush — the peacock is announced by everything except its own body.', goal: 'Evaluate diasporic perspective and read the poem\'s sensory progression as structure.' },
    discovery: {
        question: 'Sujata Bhatt writes India\'s national bird while living in Germany. A critic calls it \'a foreigner\'s exotic view — not an authentic Indian poem.\' Fair?',
        options: ['No — diaspora produces differently positioned truth; the poem\'s honesty about distance is its authenticity', 'Yes — only residents can write national symbols authentically', 'Yes — her Gujarati is too rusty to claim the subject', 'No — because peacocks also exist in European zoos'],
        answer: 'No — diaspora produces differently positioned truth; the poem\'s honesty about distance is its authenticity',
        hook: 'The poem doesn\'t pretend the peacock is in the room — it\'s a \'blue shadow\' falling on someone reading, glimpsed across a gap the poem refuses to hide.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Peacock\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_09_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order the sensory signals that announce the bird — shadow, wind, silenced bees, stretching cat — then judge whether free verse mimics its darting.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Peacock\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing a literature answer?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing a poetry answer" means paraphrasing the poem line-by-line in prose order.', reveals: 'writing-a-poetry-answer-means' },
                { text: 'writing a poetry answer', outcome: 'Not quite — Students believe "writing a poetry answer" means paraphrasing the poem line-by-line in prose order.', reveals: 'writing-a-poetry-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Peacock\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the two discussion prompts explicitly given in the NCERT "Try This Out" section for "The Peacock"?', options: [
                { text: 'The two prompts are: (1) "In English the peacock is associated with pride', outcome: 'The two prompts are: (1) "In English the peacock is associated with pride.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat: they share personal feelings ("I love.', reveals: 'students-treat-speaking-and-listening' },
                { text: 'the peacock has been chosen?"', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat: they share personal feelings ("I love.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At the school\'s World Poetry Day you introduce Sujata Bhatt\'s \'The Peacock\'. A co-host announces: \'It\'s a nature poem about India\'s national bird — pretty description of feathers and colours, by an Indian poet.\'',
            decisions: [{ prompt: 'What\'s the crucial context that changes how you hear it?', options: [
                { text: 'The diasporic lens: Bhatt writes from Germany — distance turns the familiar bird into concentrated memory and identity. Every detail (the colour flaring, the sudden disappearance, the tail\'s closure) works as recall made visible; the peacock is a cultural signifier of a homeland seen from afar, not an ornithology sketch.', outcome: 'Same bird, different charge: for the diaspora poet the peacock condenses longing — reading it as plain description misses the poem\'s ache.' },
                { text: 'The intro is right — national bird, national pride; read it as celebration of Indian wildlife.', outcome: 'Celebration isn\'t the register: the poem is steeped in remembering and loss — the bird\'s vanishing enacts how the homeland survives in flashes of memory.', reveals: 'peacock-is-wildlife-celebration' },
                { text: 'It\'s a mythological poem — the peacock stands for the gods, so read it as religious verse.', outcome: 'Myth and art enrich the symbol but the poem\'s engine is diasporic memory — the bird as homeland made luminous and then gone.', reveals: 'peacock-is-only-mythology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'The poem\'s ragged lines move the way the bird does — appearing, vanishing, leaving only the very end of a tail.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Peacock\' — analysing the text to reach evidence-based.',
          hint: 'Review c11_eng_w_cbse_09_008 (Imagery/Metaphor) focusing on the "colour progression".',
          misconception: 'Students often treat the second stanza as a literal "how-to guide" for birdwatching, missing that the "book" and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Peacock\'',
                  options: ['Critical thinking on \'The Peacock\'', '\'The Peacock\' (Woven Words, ch', 'The plot/narrative arc of \'The Peacock\'', 'The setting of \'The Peacock\''],
                  hint: 'Review c11_eng_w_cbse_09_008 (Imagery/Metaphor) focusing on the "colour progression" exercise, and.',
                  misconception: 'Students often treat the second stanza as a literal "how-to guide" for birdwatching, missing that the "book" and "concentration" are.' }
          ],
            remediations: { 'students-often-treat-the-second': { steps: ['Ask the student to reread stanza 2 aloud, noticing the shift from imperative ("sit," "read") to conditional ("The.', 'A blue shadow *will* fall").', 'Have them list the *sequence* of natural events (wind → bees → cat → shadow) and mark which are caused by the bird vs.', 'Prompt: "Does the peacock come *because* you read, or does reading create the *state* in which the peacock *can*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the second stanza as a literal "how-to guide" for birdwatching, missing that the "book" and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the poem\'s conditional structure ("If you look up in time / You *might* see...") in conveying the central theme.', answer: 'The conditional "might" strengthens the impact by refusing closure',
                  options: ['The conditional "might" strengthens the impact by refusing closure', 'frustrating', 'weak writing'],
                  hint: 'Review c11_eng_w_cbse_09_008 (Imagery/Metaphor) focusing on the "colour progression" exercise, and.',
                  misconception: 'Students often treat the second stanza as a literal "how-to guide" for birdwatching, missing that the "book" and "concentration" are.' }
          ],
            remediations: { 'students-often-treat-the-second': { steps: ['Ask the student to reread stanza 2 aloud, noticing the shift from imperative ("sit," "read") to conditional ("The.', 'A blue shadow *will* fall").', 'Have them list the *sequence* of natural events (wind → bees → cat → shadow) and mark which are caused by the bird vs.', 'Prompt: "Does the peacock come *because* you read, or does reading create the *state* in which the peacock *can*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_014', difficulty: 'standard',
          question: 'Writing skills from \'The Peacock\' — using the text as a model or springboard.',
          hint: 'If stuck, return to node c11_eng_w_cbse_09_008 (Imagery and Metaphor) and re-do the.',
          misconception: 'Students believe "writing a poetry answer" means paraphrasing the poem line-by-line in prose order.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing a literature answer?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing a poetry answer'],
                  hint: 'If stuck, return to node c11_eng_w_cbse_09_008 (Imagery and Metaphor) and re-do the "Evidence Hunt".',
                  misconception: 'Students believe "writing a poetry answer" means paraphrasing the poem line-by-line in prose order.' }
          ],
            remediations: { 'writing-a-poetry-answer-means': { steps: ['If a student submits a narrative retelling: 1) Stop them.', '2) Hand them a highlighter and ask them to highlight every sentence that states an *interpretation* (e.g., "shows,".', '*plot* ("happens," "sees," "goes").', '3) If zero interpretation sentences exist, have them rewrite using only the PEEL template: "One way the poet shows X.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_015', difficulty: 'standard',
          question: 'Discussion points on \'The Peacock\' — speaking and listening around the text.',
          hint: 'If stuck, return to node 008 (Imagery and Metaphor) and node 009 (Irony and Symbolism).',
          misconception: 'Students treat "Speaking and Listening" as informal chat: they share personal feelings ("I love peacocks") or general.',
          parts: [
                { id: 'a', prompt: 'What are the two discussion prompts explicitly given in the NCERT "Try This Out" section for "The Peacock"?', answer: 'The two prompts are: (1) "In English the peacock is associated with pride',
                  options: ['The two prompts are: (1) "In English the peacock is associated with pride', 'A wrong answer (e.g', 'the peacock has been chosen?"'],
                  hint: 'If stuck, return to node 008 (Imagery and Metaphor) and node 009 (Irony and Symbolism) to rebuild.',
                  misconception: 'Students treat "Speaking and Listening" as informal chat: they share personal feelings ("I love peacocks") or general knowledge ("It\'s our.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['Have the student re-read the poem aloud, marking every sensory detail (visual, auditory, tactile) with a coloured pen.', 'Ask them to convert each marked detail into a "discussion seed" question: e.g., "Why \'pipal tree\' specifically?" →.', 'Practice a 2-minute "evidence-only" turn: they must speak using only phrases from the poem.', 'Debrief: "Which seeded question generated the richest exchange?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
