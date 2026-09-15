import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch04_p3: SimDef = {
    id: 'v3_c7_engl_ch04_p3',
    title: 'Travel and Adventure: The Tunnel · Part 3/3',
    subtitle: 'This node covers analyzing how travel and movement symbolize personal discovery and.',
    classLevel: 7, subject: 'engl', topic: 'Travel and Adventure: The Tunnel · Part 3/3',
    chapters: ['c7_engl_ch04'],
    nodeIds: ['c7_engl_ch04_013', 'c7_engl_ch04_014', 'c7_engl_ch04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever taken a train ride to your grandparents\' house, watching fields and stations rush past, feeling.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A character steps off a sunlit railway embankment into the mouth of a brick tunnel — and in one step the birdcalls fade to hollow echoes and the heat drops away. What did the author just do to the mood?',
        options: ['Flipped it — the contrast between bright living jungle and dark silent tunnel turns open warmth into tense suspense', 'Nothing — a tunnel is just a shorter road', 'Made it cheerful — shade is always relaxing', 'Confused it — good authors avoid strong contrasts'],
        answer: 'Flipped it — the contrast between bright living jungle and dark silent tunnel turns open warmth into tense suspense',
        hook: 'Setting is an experience built from senses, not a label on a map. Here three elements do the work — the wild jungle, the human-made railway slicing through it, and a tunnel that swallows light and sound like a quiet antagonist.',
    },
    teaching: [
        { title: 'Poem: Theme of Journey and Discovery in the Poem', text: 'The theme of journey and discovery in a poem explores how physical travel, movement through landscapes, or internal changes lead a speaker or character to new insights, self-awareness, and a deeper.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch04_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the three settings in order — jungle, railway, tunnel — and collect one sight, one sound, and one feeling from each to show how the mood darkens with every step.',
        labels: ['Poem: Theme of Journey', 'Poetic Devices: Metaphor', 'Writing: How to Embed'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch04_013', title: 'Poem: Theme of Journey and Discovery in the Poem',
          caseStudy: { intro: 'Have you ever taken a train ride to your grandparents\' house, watching fields and stations rush past, feeling like you are entering a completely different.',
            decisions: [{ prompt: 'What is the primary difference between a literal journey and a thematic journey in a poem?', options: [
                { text: 'A literal journey is the physical movement from one location to another, whereas a', outcome: 'A literal journey is the physical movement from one location to another, whereas a thematic journey.' },
                { text: 'journey and discovery', outcome: 'Not quite — Students often believe that "journey and discovery" in poems simply means a travel diary in verse.', reveals: 'journey-and-discovery-in-poems' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_014', title: 'Poetic Devices: Metaphor and Symbolism in the Poem',
          caseStudy: { intro: 'Imagine you are looking at a dark railway tunnel cutting through a high mountain ridge in the Himachal hills, and someone tells you, "That tunnel is a giant.',
            decisions: [{ prompt: 'What is the difference between a direct comparison in a metaphor and a symbol in poetry? Provide a brief one-sentence distinction.', options: [
                { text: 'A metaphor directly states that one thing *is* another to highlight a shared quality,', outcome: 'A metaphor directly states that one thing *is* another to highlight a shared quality, whereas.' },
                { text: 'symbol', outcome: 'Not quite — Students often confuse symbols with metaphors, assuming any figurative comparison is automatically.', reveals: 'students-often-confuse-symbols-with' },
                { text: 'The wind is a howling wolf', outcome: 'Not quite — Students often confuse symbols with metaphors, assuming any figurative comparison is automatically.', reveals: 'students-often-confuse-symbols-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_015', title: 'Writing: How to Embed Quotes and Evidence in Poem Answers',
          caseStudy: { intro: 'Have you ever tried telling a friend that a poem is mysterious, but when they ask "Why do you say that?", you just stare blankly because you cannot remember.',
            decisions: [{ prompt: 'What does the \'E\' in the PEEL structure stand for when writing analytical responses about a poem?', options: [
                { text: 'The \'E\' stands for Evidence (and Explanation)', outcome: 'The \'E\' stands for Evidence (and Explanation). A student who answers "Ending" or "Example only".' },
                { text: 'Ending', outcome: 'Not quite — Students often treat quotes as independent puzzle pieces that can be dropped into a paragraph.', reveals: 'students-often-treat-quotes-as' },
                { text: 'Example only', outcome: 'Not quite — Students often treat quotes as independent puzzle pieces that can be dropped into a paragraph.', reveals: 'students-often-treat-quotes-as' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing an adventure scene for the school magazine, a student sets her hero in a thick jungle. Her editor asks which element is the true \'frontier\' — the wild jungle, the open railway track, or the dark tunnel mouth ahead.',
            decisions: [{ prompt: 'Which element should carry the sense of stepping into the unknown?', options: [
                { text: 'The tunnel — the jungle is wild but sunlit and knowable, the track is a thin man-made line through it, and the tunnel is where the human path disappears into darkness: a brick-lined doorway into what cannot be seen. That juxtaposition — civilization\'s line ending at an unlit hole in the hill — is what turns the walk into an adventure\'s frontier.', outcome: 'The chapter\'s atmosphere is built exactly this way: isolation and heat in the jungle, then the tunnel mouth concentrating all the uncertainty into one dark opening.' },
                { text: 'The jungle is the real frontier — wildness always beats anything man-made for danger.', outcome: 'The jungle frames the scene but the tunnel is the threshold — the story places the unknown specifically inside the dark passage, not in the visible wild around it.', reveals: 'wilderness-is-frontier' },
                { text: 'The railway track is the frontier — it is the boundary line itself.', outcome: 'The track leads to the frontier but is not it — the open line is known and lit; the tunnel\'s hidden interior is where anticipation actually lives.', reveals: 'the-path-is-frontier' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch04_015', title: 'You made it',
          caseStudy: { intro: 'A great setting does not sit behind the story — it presses on the characters. Civilization and wilderness meet at the tunnel mouth, and the tunnel wins the mood.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch04_013', difficulty: 'standard',
          question: 'The theme of journey and discovery in a poem explores how physical travel.',
          hint: 'Review c7_engl_ch04_011 (Stanza-by-Stanza Summary) to ensure the literal events of the.',
          misconception: 'Students often believe that "journey and discovery" in poems simply means a travel diary in verse form, listing places.',
          parts: [
                { id: 'a', prompt: 'How does a poet typically use a physical obstacle (like a dark tunnel or a steep hill) to develop the theme of discovery?', answer: 'Steps: (1) Identify the obstacle as a point of tension or transition',
                  options: ['Steps: (1) Identify the obstacle as a point of tension or transition', 'journey and discovery'],
                  hint: 'Review c7_engl_ch04_011 (Stanza-by-Stanza Summary) to ensure the literal events of the poem are.',
                  misconception: 'Students often believe that "journey and discovery" in poems simply means a travel diary in verse form, listing places visited.' }
          ],
            remediations: { 'journey-and-discovery-in-poems': { steps: ['If a student treats a poem as a mere travelogue, guide them with these steps: (1) Ask them to point out words related.', '(2) Ask how the speaker\'s mood changes from the beginning of the poem to the end.', '(3) Explain that poetry uses outer journeys as mirrors for inner feelings.', 'Say: "Notice how the dark tunnel scares the speaker at first, but looking at the stars outside makes them brave.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "journey and discovery" in poems simply means a travel diary in verse form, listing places.',
          parts: [
                { id: 'a', prompt: 'Write two original poetic lines where a traveler\'s movement through a dark tunnel symbolizes moving from confusion to clarity.', answer: 'Criteria for a good answer: The lines must feature a physical transition',
                  options: ['Criteria for a good answer: The lines must feature a physical transition', 'journey and discovery'],
                  hint: 'Review c7_engl_ch04_011 (Stanza-by-Stanza Summary) to ensure the literal events of the poem are.',
                  misconception: 'Students often believe that "journey and discovery" in poems simply means a travel diary in verse form, listing places visited.' }
          ],
            remediations: { 'journey-and-discovery-in-poems': { steps: ['If a student treats a poem as a mere travelogue, guide them with these steps: (1) Ask them to point out words related.', '(2) Ask how the speaker\'s mood changes from the beginning of the poem to the end.', '(3) Explain that poetry uses outer journeys as mirrors for inner feelings.', 'Say: "Notice how the dark tunnel scares the speaker at first, but looking at the stars outside makes them brave.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_014', difficulty: 'standard',
          question: 'A metaphor is a poetic device that directly compares two unlike things.',
          hint: 'Review Class 6 concepts on metaphor and imagery (c6_english_u1_005) before returning.',
          misconception: 'Students often confuse symbols with metaphors, assuming any figurative comparison is automatically a "symbol." For.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A metaphor is a poetic device that directly compares two unlike things by stating one',
                  options: ['A metaphor is a poetic device that directly compares two unlike things by stating one', 'The setting of a story encompasses the physical landscape, time period, and social', 'Character analysis of Suraj in "The Tunnel" examines his traits, motivations, actions,', 'Plot is the sequence of events and actions that make up a story, structured around a'],
                  hint: 'Review Class 6 concepts on metaphor and imagery (c6_english_u1_005) before returning to analyze.',
                  misconception: 'Students often confuse symbols with metaphors, assuming any figurative comparison is automatically a "symbol." For example, if a poem says.' }
          ],
            remediations: { 'students-often-confuse-symbols-with': { steps: ['If a student struggles to tell metaphors apart from symbols, use this step-by-step remediation: First, point to.', 'Second, point to a recurring object like a tunnel, a lamp, or a river, and ask: "Does this object keep showing up and.', 'Remind them: Metaphors *compare* things directly; symbols *stand for* abstract ideas over the course of the journey.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch04_015', difficulty: 'standard',
          question: 'The skill of embedding quotes and evidence in poem answers involves seamlessly.',
          hint: 'Review c7_engl_ch04_011 to practice finding stanza highlights before attempting sentence.',
          misconception: 'Students often treat quotes as independent puzzle pieces that can be dropped into a paragraph without grammatical.',
          parts: [
                { id: 'a', prompt: 'What does the \'E\' in the PEEL structure stand for when writing analytical responses about a poem?', answer: 'The \'E\' stands for Evidence (and Explanation)',
                  options: ['The \'E\' stands for Evidence (and Explanation)', 'Ending', 'Example only'],
                  hint: 'Review c7_engl_ch04_011 to practice finding stanza highlights before attempting sentence.',
                  misconception: 'Students often treat quotes as independent puzzle pieces that can be dropped into a paragraph without grammatical bridges (known as "orphan.' }
          ],
            remediations: { 'students-often-treat-quotes-as': { steps: ['To fix orphan quotes, teach the "Grammar Bridge" rule: Read your sentence aloud without the quotation marks.', 'If it sounds broken or starts with a capital letter out of nowhere, the quote is not embedded.', 'Show students how to use introductory phrases like *the poet describes*, *the speaker feels*, or *as an "iron bolt"*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
