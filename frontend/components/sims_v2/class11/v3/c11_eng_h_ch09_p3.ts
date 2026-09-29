import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch09_p3: SimDef = {
    id: 'v3_c11_eng_h_ch09_p3',
    title: 'A Photograph (Poem) · Part 3/3',
    subtitle: 'Watch a poem hold three times in one cardboard frame.',
    classLevel: 11, subject: 'eng_h', topic: 'A Photograph (Poem) · Part 3/3',
    chapters: ['c11_eng_h_ch09'],
    nodeIds: ['c11_eng_h_cbse_09_013', 'c11_eng_h_cbse_09_014', 'c11_eng_h_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a photograph that outlived its subject', intro: 'A faded beach holiday: the child in it grew up, laughed at it, and is gone — and the poet is left with the looking.', goal: 'Read the poem as a narrative across time frames and connect its structure to transience.' },
    discovery: {
        question: 'Three stanzas, three different times: a girl on a beach, a mother laughing at the photo, a poet in silence. Which stanza is the climax?',
        options: ['The second — the mother\'s laughter at the photo, where joy and the ache of lost time collide', 'The first — the photograph being taken is the peak event', 'The third — the mother\'s death is the climax', 'None — a photograph has no plot to climax'],
        answer: 'The second — the mother\'s laughter at the photo, where joy and the ache of lost time collide',
        hook: 'The poem isn\'t describing an object — it\'s a story memory tells in jumps: the day captured, the woman who laughed at it, the silence she left.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'A Photograph\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_09_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the time period each stanza inhabits, place the arc\'s stages, and test whether the three-stanza shape itself enacts transience.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'A Photograph\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the primary purpose of sub-titling a long piece of writing according to the NCERT textbook?', options: [
                { text: 'The primary purpose is to convey the main idea or theme of each section so the reader', outcome: 'The primary purpose is to convey the main idea or theme of each section so the reader knows at.' },
                { text: 'to make the text look attractive', outcome: 'Not quite — Students believe sub-titling is simply labelling paragraphs with the first noun phrase they spot.', reveals: 'sub-titling-is-simply-labelling' },
                { text: 'to summarize the whole text in one line', outcome: 'Not quite — Students believe sub-titling is simply labelling paragraphs with the first noun phrase they spot.', reveals: 'sub-titling-is-simply-labelling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'A Photograph\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of providing discussion points for a poem like "A Photograph" in a speaking and listening activity?', options: [
                { text: 'The primary purpose is to guide students in collaboratively analysing the poem\'s themes', outcome: 'The primary purpose is to guide students in collaboratively analysing the poem\'s themes and.' },
                { text: 'to memorise the poem', outcome: 'Not quite — Students often believe a literary discussion is successful if everyone shares personal feelings.', reveals: 'a-literary-discussion-is-successful' },
                { text: 'to test pronunciation', outcome: 'Not quite — Students often believe a literary discussion is successful if everyone shares personal feelings.', reveals: 'a-literary-discussion-is-successful' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry workshop, students present on \'A Photograph\'. One presenter says: \'It\'s a poem about an old photo — the cardboard, the sea, the cousins\' holiday clothes. The speaker is the girl paddling in the water, remembering her beach day.\'',
            decisions: [{ prompt: 'Untangle the poem\'s voices and timeframes.', options: [
                { text: 'Three layers, two voices: the girl on the beach is the poet\'s MOTHER as a child; the mother later looked at the photo and laughed at how she\'d changed; now the poet looks at it after her mother\'s death — the \'silence\' mourning a double loss. The photograph isn\'t the subject; it\'s a trigger for a meditation on time and mortality.', outcome: 'Track who\'s looking and when: past (mother\'s childhood), recent past (mother\'s adulthood), present (poet\'s grief) — miss a layer and the poem becomes a postcard.' },
                { text: 'The presenter is right — the poem describes the photo\'s contents and the girl-speaker\'s happy memory.', outcome: 'That collapses three timeframes into one and swaps poet for mother — erasing the grief that the whole poem is built on.', reveals: 'speaker-is-the-girl' },
                { text: 'It\'s about photography as an art — how cardboard and chemistry preserve an image.', outcome: 'The object is a vehicle, not the tenor: the poem uses the frozen image to measure everything time has since taken away.', reveals: 'poem-is-about-photography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'Each stanza is a world that has already vanished — the form doesn\'t just state the theme, it performs it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_013', difficulty: 'standard',
          question: 'Critical thinking on \'A Photograph\' — analysing the text to reach.',
          hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_eng_h_cbse_09_006).',
          misconception: 'Students often treat the three stanzas as three separate "scenes" rather than a single, continuous psychological arc.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet describes the photograph as "cardboard" in the first line.', answer: '"Cardboard" emphasizes the photograph\'s physical fragility, ordinariness, and',
                  options: ['"Cardboard" emphasizes the photograph\'s physical fragility, ordinariness, and', 'it\'s made of cardboard'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_eng_h_cbse_09_006) to re-anchor.',
                  misconception: 'Students often treat the three stanzas as three separate "scenes" rather than a single, continuous psychological arc of the speaker.' },
                { id: 'b', prompt: 'Apply the concept of "juxtaposition" to the poem. Identify two specific images placed side-by-side in Stanza 1 and explain how their contrast deepens the theme.', answer: 'The "transient feet" of the girls are juxtaposed with the "eternal" sea',
                  options: ['The "transient feet" of the girls are juxtaposed with the "eternal" sea', 'paddling', 'holiday', 'picks random details (e'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_eng_h_cbse_09_006) to re-anchor.',
                  misconception: 'Students often treat the three stanzas as three separate "scenes" rather than a single, continuous psychological arc of the speaker.' },
                { id: 'c', prompt: 'Analyze the shift in the mother\'s laughter from Stanza 2 ("she\'d laugh at the snapshot") to the poet\'s silence in Stanza 3 ("Its silence silences").', answer: 'The mother\'s laughter represents affectionate, living engagement with the past',
                  options: ['The mother\'s laughter represents affectionate, living engagement with the past', 'both are sad'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_eng_h_cbse_09_006) to re-anchor.',
                  misconception: 'Students often treat the three stanzas as three separate "scenes" rather than a single, continuous psychological arc of the speaker.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Have the student create a three-column timeline: Column 1 = Time Period, Column 2 = Speaker\'s Action/Feeling, Column 3.', 'Ask: "Who is the \'I\' in the last stanza?', 'Is it a different person from the one describing the holiday in Stanza 1?" Guide them to see the single speaker across.', 'Practice writing one PEEL paragraph connecting the "cardboard" in line 1 to the "silence" in the last line, forcing the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the three stanzas as three separate "scenes" rather than a single, continuous psychological arc.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the poem\'s final line: "Its silence silences." Does the repetition of the root word "silence" strengthen or weaken the poetic.', answer: 'The repetition strengthens the impact',
                  options: ['The repetition strengthens the impact', 'repetitive', 'simple'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" node (c11_eng_h_cbse_09_006) to re-anchor.',
                  misconception: 'Students often treat the three stanzas as three separate "scenes" rather than a single, continuous psychological arc of the speaker.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Have the student create a three-column timeline: Column 1 = Time Period, Column 2 = Speaker\'s Action/Feeling, Column 3.', 'Ask: "Who is the \'I\' in the last stanza?', 'Is it a different person from the one describing the holiday in Stanza 1?" Guide them to see the single speaker across.', 'Practice writing one PEEL paragraph connecting the "cardboard" in line 1 to the "silence" in the last line, forcing the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_014', difficulty: 'standard',
          question: 'Writing skills from \'A Photograph\' — using the text as a model or springboard.',
          hint: 'If stuck, review "Identifying the Main Idea of a Paragraph" (Class 9/10 comprehension.',
          misconception: 'Students believe sub-titling is simply labelling paragraphs with the first noun phrase they spot (e.g., "Curitiba".',
          parts: [
                { id: 'a', prompt: 'In the article "A new deal for old cities," the author shifts from describing urban decay in India to presenting the Curitiba model.', answer: 'Low-cost urban innovations in Curitiba (',
                  options: ['Low-cost urban innovations in Curitiba (', 'Curitiba', 'Floods'],
                  hint: 'If stuck, review "Identifying the Main Idea of a Paragraph" (Class 9/10 comprehension skill) and.',
                  misconception: 'Students believe sub-titling is simply labelling paragraphs with the first noun phrase they spot (e.g., "Curitiba" or "Floods").' },
                { id: 'b', prompt: 'Divide the poem "A Photograph" into three sections based on shifts in time perspective and give a sub-title for each section.', answer: 'Section 1 (Stanza 1): "The Photograph\'s Frozen Past"',
                  options: ['Section 1 (Stanza 1): "The Photograph\'s Frozen Past"', 'Curitiba', 'Floods'],
                  hint: 'If stuck, review "Identifying the Main Idea of a Paragraph" (Class 9/10 comprehension skill) and.',
                  misconception: 'Students believe sub-titling is simply labelling paragraphs with the first noun phrase they spot (e.g., "Curitiba" or "Floods").' }
          ],
            remediations: { 'sub-titling-is-simply-labelling': { steps: ['Give the student a short 3-paragraph text with clear shifts.', 'Ask them to draw a line between paragraphs and verbally state "What changed?" (e.g., "First paragraph gives data.', 'Have them write a one-sentence summary of each chunk.', 'Guide them to compress each summary into a 4-6 word phrase using the same grammatical form (all -ing phrases or all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_015', difficulty: 'standard',
          question: 'Discussion points on \'A Photograph\' — speaking and listening around the text.',
          hint: 'If stuck, review the poem\'s stanza-by-stanza progression and the PEEL structure for oral.',
          misconception: 'Students often believe a literary discussion is successful if everyone shares personal feelings about the poem (e.g.',
          parts: [
                { id: 'a', prompt: 'Compare the discussion potential of the poem\'s visual imagery (the "cardboard" photograph, the "sea holiday") with its auditory imagery (the mother\'s.', answer: 'Visual imagery provides richer debate ground',
                  options: ['Visual imagery provides richer debate ground', 'descriptive', 'It made me sad'],
                  hint: 'If stuck, review the poem\'s stanza-by-stanza progression and the PEEL structure for oral arguments.',
                  misconception: 'Students often believe a literary discussion is successful if everyone shares personal feelings about the poem (e.g., "It made me sad").' }
          ],
            remediations: { 'a-literary-discussion-is-successful': { steps: ['Model a 2-minute "think-aloud" where you take a vague opinion ("The photograph is sad") and transform it into.', 'Provide a discussion stems handout: "The poet uses [device] to show [theme] because [evidence]." 3.', 'Run a fishbowl discussion where observers track whether speakers cite line numbers.', 'Debrief by categorising contributions as "opinion," "evidence-supported," or "building on others."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
