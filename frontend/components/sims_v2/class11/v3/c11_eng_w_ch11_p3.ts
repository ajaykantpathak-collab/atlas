import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch11_p3: SimDef = {
    id: 'v3_c11_eng_w_ch11_p3',
    title: 'Coming (Poem) · Part 3/3',
    subtitle: 'Hear a thrush interrupt a suburb — and a poet who refuses to worship it.',
    classLevel: 11, subject: 'eng_w', topic: 'Coming (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch11'],
    nodeIds: ['c11_eng_w_cbse_11_013', 'c11_eng_w_cbse_11_014', 'c11_eng_w_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener catching spring arrive over brickwork', intro: 'A bare garden, an evening, one bird — and a grown man suddenly feeling like a child who walked in on something unexplained.', goal: 'Situate Larkin in The Movement and read the poem\'s shift from observation to inner recognition.' },
    discovery: {
        question: '\'Coming\' describes a thrush singing in a garden — so Larkin is a nature poet like Wordsworth, right?',
        options: ['No — Movement poets rejected Romantic nature-worship; the thrush merely \'astonishes the brickwork\' of an ordinary suburb', 'Yes — any poem about a bird is Romantic', 'Yes — the garden makes it a nature poem by definition', 'No — Larkin only ever wrote about libraries'],
        answer: 'No — Movement poets rejected Romantic nature-worship; the thrush merely \'astonishes the brickwork\' of an ordinary suburb',
        hook: 'Even the song is \'fresh-peeled\' — a kitchen verb, raw and domestic, not \'melodious\'; Larkin refuses the poetic word on purpose.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s components—such as imagery, structure, tone, and thematic implications—to construct a reasoned.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_11_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the poem from houses at dusk to the thrush to a childhood memory, and explain the final simile of a child stumbling on \'adult reconciling.\'',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you hear a bird singing suddenly on a cold January evening in Delhi—it feels wrong, yet hopeful. That tension is exactly where this poem begins.',
            decisions: [{ prompt: 'What is the primary function of the thrush\'s song in the first stanza of "Coming"?', options: [
                { text: 'The thrush\'s song announces the imminent arrival of spring ("It will be spring soon"),', outcome: 'The thrush\'s song announces the imminent arrival of spring ("It will be spring soon"), acting as.' },
                { text: 'It describes a bird singing', outcome: 'Not quite — Students conflate *identifying* a literary device (e.g., "There is a simile in stanza 2") with.', reveals: 'students-conflate-identifying-a-literary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re asked: "How does Larkin use the thrush\'s song to convey the arrival of spring?" A weak answer might just say: "The thrush sings and it means.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing about a poem" means explaining what each stanza *says* in their own.', reveals: 'writing-about-a-poem-means' },
                { text: 'writing about a poem', outcome: 'Not quite — Students believe "writing about a poem" means explaining what each stanza *says* in their own.', reveals: 'writing-about-a-poem-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where everyone has read "Coming" but interpretations differ wildly — one classmate thinks the poem is purely joyful about.',
            decisions: [{ prompt: 'What are the three essential components of a text-anchored discussion point for a poem like "Coming"?', options: [
                { text: 'A text-anchored discussion point requires: (1) a specific reference to the poem (line,', outcome: 'A text-anchored discussion point requires: (1) a specific reference to the poem (line, image,.' },
                { text: 'opinions', outcome: 'Not quite — Students believe "discussion" means sharing personal feelings or vague agreements ("I liked the.', reveals: 'discussion-means-sharing-personal-feelings' },
                { text: 'feelings', outcome: 'Not quite — Students believe "discussion" means sharing personal feelings or vague agreements ("I liked the.', reveals: 'discussion-means-sharing-personal-feelings' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry evening a senior performs Larkin\'s \'Coming\' and introduces it as \'a nature poem in the tradition of Wordsworth — spring arrives and the poet\'s soul is uplifted.\' You\'re asked to respond, and you know Larkin led The Movement, which rejected exactly that kind of romantic uplift.',
            decisions: [{ prompt: 'How should you frame what the poem is actually doing?', options: [
                { text: 'Correct the intro using context as a lens: Larkin and The Movement rejected romantic nature worship for clear, empirical verse about ordinary life. The thrush\'s song doesn\'t uplift — it \'astonishes the brickwork\', a small epiphany that triggers a private memory of \'adult reconciling\' and an unexplained happiness, not transcendence.', outcome: 'Context stops being trivia: knowing The Movement\'s anti-romantic stance is what lets you hear the poem\'s restrained, disenchanted register.' },
                { text: 'Let the intro stand — a bird announcing spring is a nature poem, and nature poems uplift the soul.', outcome: 'That\'s the exact reading Movement poetry was written against; it misses that nature here is a neutral backdrop for human psychology, not a spiritual force.', reveals: 'coming-is-romantic-nature-poem' },
                { text: 'Focus on Larkin\'s biography instead — the poem is really about his childhood in Coventry.', outcome: 'Biography is a lens, not the content: the poem uses a childhood memory but its point is the structural movement from boredom to sudden, inexplicable joy.', reveals: 'context-means-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'The bird announces spring; the speaker feels like a child who can\'t name the happiness — incomprehension is the point.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node.',
          misconception: 'Students conflate *identifying* a literary device (e.g., "There is a simile in stanza 2") with *analyzing* it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of actively examining a',
                  options: ['Critical thinking in literary analysis is the disciplined process of actively examining a', 'Context and background in literary study refers to the biographical, historical, and', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the specific time, place, and physical environment where the'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node (c11_eng_w_cbse_11_008) and.',
                  misconception: 'Students conflate *identifying* a literary device (e.g., "There is a simile in stanza 2") with *analyzing* it.' }
          ],
            remediations: { 'students-conflate-identifying-a-literary': { steps: ['Return to the simile and ask the student to draw two stick-figure panels: Panel A = the thrush singing (certain.', 'Have them write one sentence connecting Panel A to Panel B using the word "because." 3.', 'Guide them to see that the *structure* of the poem *is* that connection: nature\'s certainty triggers the speaker\'s.', 'Finally, ask them to rewrite their analysis paragraph using the sentence: "Larkin uses the simile not to explain the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Coming" refers to the ability to compose.',
          hint: 'If stuck, revisit c11_eng_w_cbse_11_008 (imagery/metaphor) and c11_eng_w_cbse_11_013.',
          misconception: 'Students believe "writing about a poem" means explaining what each stanza *says* in their own words.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing about a poem'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_11_008 (imagery/metaphor) and c11_eng_w_cbse_11_013 (critical.',
                  misconception: 'Students believe "writing about a poem" means explaining what each stanza *says* in their own words.' },
                { id: 'b', prompt: 'Rewrite this weak point: "The speaker feels happy at the end." Turn it into a PEEL Point sentence that includes a thematic claim about the poem "Coming".', answer: 'Strong Point: "Larkin presents the speaker\'s happiness as a sudden, involuntary',
                  options: ['Strong Point: "Larkin presents the speaker\'s happiness as a sudden, involuntary', 'writing about a poem'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_11_008 (imagery/metaphor) and c11_eng_w_cbse_11_013 (critical.',
                  misconception: 'Students believe "writing about a poem" means explaining what each stanza *says* in their own words.' }
          ],
            remediations: { 'writing-about-a-poem-means': { steps: ['Give the student a model PEEL paragraph on a different poem (e.g., "The Cherry Tree" from Class 8).', 'Colour-code each sentence: Point (blue), Evidence (green), Explanation (orange), Link (red).', 'Ask them to label each sentence in their own "Coming" answer with the same colours.', 'Any uncoloured sentence is either summary or fluff—delete or convert.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing about a poem" means explaining what each stanza *says* in their own words.',
          parts: [
                { id: 'a', prompt: 'Write a 2-sentence Link for an answer about the "adult reconciling" image that connects the simile to the poem\'s title "Coming".', answer: 'Effective Link: "Just as the child cannot comprehend the \'unusual laughter\' of',
                  options: ['Effective Link: "Just as the child cannot comprehend the \'unusual laughter\' of', 'writing about a poem'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_11_008 (imagery/metaphor) and c11_eng_w_cbse_11_013 (critical.',
                  misconception: 'Students believe "writing about a poem" means explaining what each stanza *says* in their own words.' }
          ],
            remediations: { 'writing-about-a-poem-means': { steps: ['Give the student a model PEEL paragraph on a different poem (e.g., "The Cherry Tree" from Class 8).', 'Colour-code each sentence: Point (blue), Evidence (green), Explanation (orange), Link (red).', 'Ask them to label each sentence in their own "Coming" answer with the same colours.', 'Any uncoloured sentence is either summary or fluff—delete or convert.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_11_015', difficulty: 'standard',
          question: 'Speaking and Listening discussion points are structured conversational.',
          hint: 'If stuck, review c11_eng_w_cbse_11_008 (Literary Devices: Imagery and Metaphor) for the.',
          misconception: 'Students believe "discussion" means sharing personal feelings or vague agreements ("I liked the bird part") rather than.',
          parts: [
                { id: 'a', prompt: 'Prepare a discussion point for Stanza 2 of "Coming" that connects the speaker\'s childhood ("forgotten boredom") to the metaphor of the child witnessing "adult.', answer: 'Step 1: Identify the core tension',
                  options: ['Step 1: Identify the core tension', 'discussion', 'I liked the bird part'],
                  hint: 'If stuck, review c11_eng_w_cbse_11_008 (Literary Devices: Imagery and Metaphor) for the.',
                  misconception: 'Students believe "discussion" means sharing personal feelings or vague agreements ("I liked the bird part") rather than constructing.' }
          ],
            remediations: { 'discussion-means-sharing-personal-feelings': { steps: ['If a student offers only personal responses: (1) Interrupt gently: "That\'s an interesting feeling — now find the line.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
