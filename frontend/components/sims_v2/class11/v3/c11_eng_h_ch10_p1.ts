import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch10_p1: SimDef = {
    id: 'v3_c11_eng_h_ch10_p1',
    title: 'The Voice of the Rain (Poem) · Part 1/3',
    subtitle: 'Hear a water cycle talk — and notice it is describing poetry itself.',
    classLevel: 11, subject: 'eng_h', topic: 'The Voice of the Rain (Poem) · Part 1/3',
    chapters: ['c11_eng_h_ch10'],
    nodeIds: ['c11_eng_h_cbse_10_001', 'c11_eng_h_cbse_10_002', 'c11_eng_h_cbse_10_003', 'c11_eng_h_cbse_10_004', 'c11_eng_h_cbse_10_005', 'c11_eng_h_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an interviewer granted one question to a shower', intro: 'The poet asks the rain who it is; the rain answers in a perfect circle — rise, transform, descend, begin again.', goal: 'Interpret the rain\'s speech as a metaphor for poetic creation and analyse the dialogue structure.' },
    discovery: {
        question: 'Is \'The Voice of the Rain\' basically a science lesson about the water cycle dressed in personification?',
        options: ['No — the cycle is the vehicle; the real subject is poetry\'s own eternal return, rising from earth and giving back transformed', 'Yes — Whitman wrote it to teach evaporation and condensation', 'No — the rain is merely describing weather, nothing more', 'Yes — the personification is decoration on meteorology'],
        answer: 'No — the cycle is the vehicle; the real subject is poetry\'s own eternal return, rising from earth and giving back transformed',
        hook: '\'I am the Poem of Earth\' — the rain narrates the water cycle so the poet can describe himself: experience rising, changing, returning.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" for "The Voice of the Rain" provides the essential literary, historical, and biographical framework needed to interpret Walt Whitman\'s poem, including his.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map each stanza to its water-cycle stage and speaker, then argue why the poem needs a dialogue, not a monologue.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re meeting a new classmate who speaks in riddles — you\'d want to know their background, interests, and way of thinking before trying to understand.',
            decisions: [{ prompt: 'Who is the poet of "The Voice of the Rain," and what is the title of his most famous poetry collection?', options: [
                { text: 'The poet is Walt Whitman, and his most famous collection is *Leaves of Grass*', outcome: 'The poet is Walt Whitman, and his most famous collection is *Leaves of Grass*.' },
                { text: 'The Voice of the Rain', outcome: 'Not quite — Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and.', reveals: 'the-voice-of-the-rain' },
                { text: 'Robert Frost or *The Road Not Taken*', outcome: 'Not quite — Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and.', reveals: 'the-voice-of-the-rain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re listening to a podcast where a scientist interviews a cloud — the cloud speaks back, explaining its life story in first person.',
            decisions: [{ prompt: 'What is the primary narrative form of "The Voice of the Rain," and who are the two speakers in the dialogue?', options: [
                { text: 'The poem uses a **dialogue form** (a conversation between two voices)', outcome: 'The poem uses a **dialogue form** (a conversation between two voices).' },
                { text: 'first-person narrative', outcome: 'Not quite — Students often say "poems don\'t have plots — only stories do." They confuse **plot** (the sequence.', reveals: 'students-often-say-poems-don' },
                { text: 'third-person description', outcome: 'Not quite — Students often say "poems don\'t have plots — only stories do." They confuse **plot** (the sequence.', reveals: 'students-often-say-poems-don' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine standing at Marine Drive in Mumbai during monsoon — the sea stretches endlessly, clouds hang low, and rain transforms the promenade from bustling.',
            decisions: [{ prompt: 'What is the primary physical setting of "The Voice of the Rain," and which two geographical realms does the rain explicitly name as its.', options: [
                { text: 'The primary physical setting is the natural world encompassing the water cycle, and the', outcome: 'The primary physical setting is the natural world encompassing the water cycle, and the rain.' },
                { text: 'the sky', outcome: 'Not quite — Students conflate setting (the "where/when") with atmosphere (the "feeling"), treating them.', reveals: 'students-conflate-setting-the-where' },
                { text: 'clouds only', outcome: 'Not quite — Students conflate setting (the "where/when") with atmosphere (the "feeling"), treating them.', reveals: 'students-conflate-setting-the-where' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine the rain knocking on your window and introducing itself: "I am the Poem of Earth." Start by reading the poem aloud to hear the rain\'s voice.',
            decisions: [{ prompt: 'What is the first line spoken by the rain in the poem "The Voice of the Rain"?', options: [
                { text: 'The rain says: "I am the Poem of Earth."', outcome: 'The rain says: "I am the Poem of Earth." A wrong answer (e.g., "I am the rain") shows the student.' },
                { text: 'I am the Poem of Earth', outcome: 'Not quite — Students often treat the rain as a mere scientific process (water cycle) and miss the literary.', reveals: 'students-often-treat-the-rain' },
                { text: 'I am the rain', outcome: 'Not quite — Students often treat the rain as a mere scientific process (water cycle) and miss the literary.', reveals: 'students-often-treat-the-rain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re sitting by a window watching rain fall, and you whisper, "Who are you?" — and the rain actually answers in a full, poetic monologue about its.',
            decisions: [{ prompt: 'Who speaks the first line of "The Voice of the Rain" and what exactly do they say?', options: [
                { text: 'The poet-speaker says "And who art thou?" This question initiates the entire dialogue', outcome: 'The poet-speaker says "And who art thou?" This question initiates the entire dialogue.' },
                { text: 'the rain speaks first', outcome: 'Not quite — Students think the poet is just a narrator, not a character. They miss that the poet\'s question.', reveals: 'the-poet-is-just-a' },
                { text: 'the poet is just a narrator, not a character', outcome: 'Not quite — Students think the poet is just a narrator, not a character. They miss that the poet\'s question.', reveals: 'the-poet-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re sitting by a window watching rain fall — you hear its patter on the roof, see it wash the dust away, and wonder where it came from and where.',
            decisions: [{ prompt: 'What is the primary theme of "The Voice of the Rain" as distinct from its subject matter?', options: [
                { text: 'The primary theme is the eternal, self-renewing cyclical process of nature', outcome: 'The primary theme is the eternal, self-renewing cyclical process of nature — not merely the water.' },
                { text: 'the water cycle', outcome: 'Not quite — Students often believe the primary theme is "the water cycle" or "rain is essential for life".', reveals: 'the-primary-theme-is-the' },
                { text: 'rain is important', outcome: 'Not quite — Students often believe the primary theme is "the water cycle" or "rain is essential for life".', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-literature exhibition a student labels \'The Voice of the Rain\': \'A cute personification trick — Whitman makes the water cycle talk so kids can learn evaporation and condensation. Basically a science lesson in verse.\'',
            decisions: [{ prompt: 'What does the label get wrong about the poem\'s aim?', options: [
                { text: 'It inverts vehicle and tenor: the water cycle is the vehicle — rising impalpable from earth, transforming, returning to nourish its origin — for the poem\'s real subject: poetry itself. The rain\'s \'song\' is Whitman\'s own creative cycle, making the poem an ars poetica disguised as a nature dialogue.', outcome: 'Personification here isn\'t decoration on a science lesson; the science is the metaphor for how poems are born from life and return to it.' },
                { text: 'The label is fair — its purpose is teaching the water cycle through a talking-rain gimmick.', outcome: 'Whitman isn\'t instructing in meteorology; the poem\'s claim (\'I give back life to my own origin\') is about song nourishing its maker\'s world — art, not water.', reveals: 'poem-is-science-lesson' },
                { text: 'It\'s mainly about the poet\'s ego — rain bragging about itself.', outcome: 'The voice is dignified and cyclic, not boastful: rising, changing, returning — a model of creation completing its circle, not self-praise.', reveals: 'rain-is-just-boasting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'The question \'who art thou?\' makes the rain a mystery to be unveiled — cut it, and the eternal voice has no one to answer.',
            decisions: [{ prompt: 'What comes next? The Voice of the Rain (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Voice of the Rain (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" for "The Voice of the Rain" provides.',
          hint: 'Review c9_engl_ch3_011 (Tagore\'s free verse) and c8_engl_ch4_015 (personification.',
          misconception: 'Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and that the rain\'s.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "The Voice of the Rain," and what is the title of his most famous poetry collection?', answer: 'The poet is Walt Whitman, and his most famous collection is *Leaves of Grass*',
                  options: ['The poet is Walt Whitman, and his most famous collection is *Leaves of Grass*', 'The Voice of the Rain', 'Robert Frost or *The Road Not Taken*'],
                  hint: 'Review c9_engl_ch3_011 (Tagore\'s free verse) and c8_engl_ch4_015 (personification in nature poetry).',
                  misconception: 'Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and that the rain\'s speech is just a cute.' },
                { id: 'b', prompt: 'Analyze how the poem\'s structure — a single stanza of free verse with no rhyme scheme — reinforces its central metaphor of the water cycle.', answer: 'The water cycle has no "stanzas" or rigid boundaries',
                  options: ['The water cycle has no "stanzas" or rigid boundaries', 'it\'s easier to write without rhyme', 'The Voice of the Rain'],
                  hint: 'Review c9_engl_ch3_011 (Tagore\'s free verse) and c8_engl_ch4_015 (personification in nature poetry).',
                  misconception: 'Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and that the rain\'s speech is just a cute.' }
          ],
            remediations: { 'the-voice-of-the-rain': { steps: ['Have the student read Whitman\'s "Song of Myself" Section 6 ("A child said What is the grass?") to see the same.', 'Draw the water cycle diagram, then label each stage with the poem\'s corresponding lines (e.g., "impalpable".', 'Ask: "If the rain is the poem, what is the \'drought\' it relieves?" Guide them to "human spiritual aridity." 4.', 'Re-read the poem aloud, emphasizing the musical cadence of the free verse lines.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and that the rain\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The rain\'s declaration \'I am the Poem of Earth\' is Whitman\'s most arrogant line — he equates his poetry with a planetary force."', answer: 'The claim misunderstands Whitman\'s democratic transcendentalism',
                  options: ['The claim misunderstands Whitman\'s democratic transcendentalism', 'The Voice of the Rain'],
                  hint: 'Review c9_engl_ch3_011 (Tagore\'s free verse) and c8_engl_ch4_015 (personification in nature poetry).',
                  misconception: 'Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and that the rain\'s speech is just a cute.' },
                { id: 'b', prompt: 'Create a 4-line free verse poem where a natural element (wind, river, mountain) speaks in first person about its cycle, using Whitman\'s technique of blending.', answer: 'A strong response will: (1) choose one element, (2) describe its physical cycle',
                  options: ['A strong response will: (1) choose one element, (2) describe its physical cycle', 'The Voice of the Rain'],
                  hint: 'Review c9_engl_ch3_011 (Tagore\'s free verse) and c8_engl_ch4_015 (personification in nature poetry).',
                  misconception: 'Students believe "The Voice of the Rain" is *primarily* a science lesson about the water cycle, and that the rain\'s speech is just a cute.' }
          ],
            remediations: { 'the-voice-of-the-rain': { steps: ['Have the student read Whitman\'s "Song of Myself" Section 6 ("A child said What is the grass?") to see the same.', 'Draw the water cycle diagram, then label each stage with the poem\'s corresponding lines (e.g., "impalpable".', 'Ask: "If the rain is the poem, what is the \'drought\' it relieves?" Guide them to "human spiritual aridity." 4.', 'Re-read the poem aloud, emphasizing the musical cadence of the free verse lines.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_002', difficulty: 'standard',
          question: 'In poetry, plot and narrative structure refers to the organized sequence.',
          hint: 'If stuck, review **c7_engl_ch01_011 (King Bruce narrative poem)** for stanza-by-stanza.',
          misconception: 'Students often say "poems don\'t have plots — only stories do." They confuse **plot** (the sequence of events/actions.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative form of "The Voice of the Rain," and who are the two speakers in the dialogue?', answer: 'The poem uses a **dialogue form** (a conversation between two voices)',
                  options: ['The poem uses a **dialogue form** (a conversation between two voices)', 'first-person narrative', 'third-person description', 'poems don\'t have plots'],
                  hint: 'If stuck, review **c7_engl_ch01_011 (King Bruce narrative poem)** for stanza-by-stanza narrative.',
                  misconception: 'Students often say "poems don\'t have plots — only stories do." They confuse **plot** (the sequence of events/actions in any narrative) with.' },
                { id: 'b', prompt: 'Explain in your own words how the rain\'s response structures the water cycle as a narrative with a beginning, middle, and end.', answer: 'The rain\'s speech follows the **chronological stages of the water cycle**: (1)',
                  options: ['The rain\'s speech follows the **chronological stages of the water cycle**: (1)', 'poems don\'t have plots'],
                  hint: 'If stuck, review **c7_engl_ch01_011 (King Bruce narrative poem)** for stanza-by-stanza narrative.',
                  misconception: 'Students often say "poems don\'t have plots — only stories do." They confuse **plot** (the sequence of events/actions in any narrative) with.' },
                { id: 'c', prompt: 'Map each stanza of the poem to the corresponding stage of the water cycle. Use the table format: Stanza | Speaker | Water Cycle Stage | Key Action.', answer: '| Stanza | Speaker | Water Cycle Stage | Key Action |',
                  options: ['| Stanza | Speaker | Water Cycle Stage | Key Action |', 'poems don\'t have plots'],
                  hint: 'If stuck, review **c7_engl_ch01_011 (King Bruce narrative poem)** for stanza-by-stanza narrative.',
                  misconception: 'Students often say "poems don\'t have plots — only stories do." They confuse **plot** (the sequence of events/actions in any narrative) with.' }
          ],
            remediations: { 'students-often-say-poems-don': { steps: ['If a student cannot identify the dialogue structure: (1) Have them read the poem aloud **in two voices** — one student.', '(2) Use a **colour-coding exercise**: highlight the poet\'s words in one colour, the rain\'s in another.', '(3) Ask: "Where does the voice change?', 'How do you know?" (4) Then map the rain\'s speech to a **water cycle diagram** (science cross-link) — each line = one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the physical, temporal, and social environment.',
          hint: 'Review c7_engl_ch03_014 (Tagore\'s "Paper Boats" setting analysis) and c8_engl_ch4_7.',
          misconception: 'Students conflate setting (the "where/when") with atmosphere (the "feeling"), treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "atmosphere" to a new context: If this poem were set in a drought-stricken village in Rajasthan instead of the universal "land and sea,".', answer: 'The atmosphere would shift from reverent universality to desperate longing',
                  options: ['The atmosphere would shift from reverent universality to desperate longing', 'peaceful', 'musical'],
                  hint: 'Review c7_engl_ch03_014 (Tagore\'s "Paper Boats" setting analysis) and c8_engl_ch4_7 (Cherry Tree.',
                  misconception: 'Students conflate setting (the "where/when") with atmosphere (the "feeling"), treating them as synonyms.' }
          ],
            remediations: { 'students-conflate-setting-the-where': { steps: ['Take the student outside or to a window.', 'Ask: "Describe exactly what you see — trees, buildings, sky, light.', 'Ask: "How does this scene make you feel right now?', 'Have them make a two-column table: Column A = every place-word (land, sea, heaven, droughts, dust-layers, atomies).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis of a protagonist in poetry involves examining the persona.',
          hint: 'Review "Personification in Poetry" (Class 9/10) and "First-Person Narrative Perspective".',
          misconception: 'Students often treat the rain as a mere scientific process (water cycle) and miss the literary personification.',
          parts: [
                { id: 'a', prompt: 'What is the first line spoken by the rain in the poem "The Voice of the Rain"?', answer: 'The rain says: "I am the Poem of Earth."',
                  options: ['The rain says: "I am the Poem of Earth."', 'I am the Poem of Earth', 'I am the rain'],
                  hint: 'Review "Personification in Poetry" (Class 9/10) and "First-Person Narrative Perspective" (Class 9.',
                  misconception: 'Students often treat the rain as a mere scientific process (water cycle) and miss the literary personification.' }
          ],
            remediations: { 'students-often-treat-the-rain': { steps: ['Re-read the poem aloud, marking every "I" statement by the rain.', 'List the human verbs/actions assigned to rain (rise, descend, lave, wash, give life).', 'Identify the central metaphor ("Poem of Earth") and explain what a poem does (expresses, creates, endures).', 'Write one PEEL paragraph: Point (rain is nurturing), Evidence ("lave the droughts"), Explanation (verb \'lave\' suggests.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves examining the.',
          hint: 'Review the rain\'s self-description "I am the Poem of Earth" from the protagonist analysis.',
          misconception: 'Students think the poet is just a narrator, not a character. They miss that the poet\'s question "And who art thou?".',
          parts: [
                { id: 'a', prompt: 'If you rewrote the poem so the rain speaks first without being asked, how would the effect change? Explain using the concept of "dramatic invocation."', answer: 'Without the invocation, the rain\'s personification becomes assertion rather than',
                  options: ['Without the invocation, the rain\'s personification becomes assertion rather than', 'I am the Poem of Earth', 'the poet is just a narrator, not a character'],
                  hint: 'Review the rain\'s self-description "I am the Poem of Earth" from the protagonist analysis node.',
                  misconception: 'Students think the poet is just a narrator, not a character. They miss that the poet\'s question "And who art thou?" is a deliberate.' },
                { id: 'b', prompt: 'Compare the poet\'s role in "The Voice of the Rain" with the granddaughter\'s role in "How I Taught My Grandmother to Read" (Class 9).', answer: 'The poet uses a single invocatory question (verbal, momentary)',
                  options: ['The poet uses a single invocatory question (verbal, momentary)', 'both just help', 'the poet is just a narrator, not a character'],
                  hint: 'Review the rain\'s self-description "I am the Poem of Earth" from the protagonist analysis node.',
                  misconception: 'Students think the poet is just a narrator, not a character. They miss that the poet\'s question "And who art thou?" is a deliberate.' }
          ],
            remediations: { 'the-poet-is-just-a': { steps: ['Have students read the first two lines aloud, then ask: "If the poet didn\'t ask, would the rain speak?" Guide them.', 'Then re-read the rain\'s answer noting how it directly addresses "I am the Poem of Earth" — responding to "who.".', 'This three-step demonstration makes the structural function visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea that the poet.',
          hint: 'If stuck, review node c11_eng_h_cbse_10_002 (narrative structure) and practice writing.',
          misconception: 'Students often believe the primary theme is "the water cycle" or "rain is essential for life" because these are the.',
          parts: [
                { id: 'a', prompt: 'What is the primary theme of "The Voice of the Rain" as distinct from its subject matter?', answer: 'The primary theme is the eternal, self-renewing cyclical process of nature',
                  options: ['The primary theme is the eternal, self-renewing cyclical process of nature', 'the water cycle', 'rain is important', 'rain is essential for life'],
                  hint: 'If stuck, review node c11_eng_h_cbse_10_002 (narrative structure) and practice writing a 3-sentence.',
                  misconception: 'Students often believe the primary theme is "the water cycle" or "rain is essential for life" because these are the poem\'s *subject.' },
                { id: 'b', prompt: 'Apply the concept of "theme development through structure" to the poem: identify which phase of the rain\'s cycle each stanza represents, and explain how the.', answer: 'Stanza 1: Rain\'s self-identification and origin (rising from land/sea)',
                  options: ['Stanza 1: Rain\'s self-identification and origin (rising from land/sea)', 'the water cycle', 'rain is essential for life'],
                  hint: 'If stuck, review node c11_eng_h_cbse_10_002 (narrative structure) and practice writing a 3-sentence.',
                  misconception: 'Students often believe the primary theme is "the water cycle" or "rain is essential for life" because these are the poem\'s *subject.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['If a student gives a plot-summary theme, do NOT say "that\'s wrong." Instead: (1) Acknowledge: "Yes, that\'s what happens.', 'Ask: \'What idea about life/nature/humanity does this cycle *represent*?\'" (3) Model: "The cycle *is* the water cycle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
