import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch09_p1: SimDef = {
    id: 'v3_c11_eng_h_ch09_p1',
    title: 'A Photograph (Poem) · Part 1/3',
    subtitle: 'Watch a poem hold three times in one cardboard frame.',
    classLevel: 11, subject: 'eng_h', topic: 'A Photograph (Poem) · Part 1/3',
    chapters: ['c11_eng_h_ch09'],
    nodeIds: ['c11_eng_h_cbse_09_001', 'c11_eng_h_cbse_09_002', 'c11_eng_h_cbse_09_003', 'c11_eng_h_cbse_09_004', 'c11_eng_h_cbse_09_005', 'c11_eng_h_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a photograph that outlived its subject', intro: 'A faded beach holiday: the child in it grew up, laughed at it, and is gone — and the poet is left with the looking.', goal: 'Read the poem as a narrative across time frames and connect its structure to transience.' },
    discovery: {
        question: 'Three stanzas, three different times: a girl on a beach, a mother laughing at the photo, a poet in silence. Which stanza is the climax?',
        options: ['The second — the mother\'s laughter at the photo, where joy and the ache of lost time collide', 'The first — the photograph being taken is the peak event', 'The third — the mother\'s death is the climax', 'None — a photograph has no plot to climax'],
        answer: 'The second — the mother\'s laughter at the photo, where joy and the ache of lost time collide',
        hook: 'The poem isn\'t describing an object — it\'s a story memory tells in jumps: the day captured, the woman who laughed at it, the silence she left.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory activity that provides essential information about the poet, the historical and cultural setting, and the thematic concerns of the poem "A.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the time period each stanza inhabits, place the arc\'s stages, and test whether the three-stanza shape itself enacts transience.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you find an old, faded photograph of your grandmother as a young girl laughing on a beach. What does that image make you feel?',
            decisions: [{ prompt: 'Who is the poet of "A Photograph," and what is the central object around which the poem revolves?', options: [
                { text: 'The poet is Shirley Toulson (1924–2018), an English poet and writer', outcome: 'The poet is Shirley Toulson (1924–2018), an English poet and writer.' },
                { text: 'a different poet or thinking the photograph is of the poet herself', outcome: 'Not quite — Students often believe the poem is primarily *about* the photograph as a physical object—its.', reveals: 'the-poem-is-primarily-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Start by asking the student: "Have you ever looked at an old family photograph and felt a rush of memories from different times?" Then guide them to read the.',
            decisions: [{ prompt: 'What are the three distinct time periods presented in the three stanzas of the poem "A Photograph"?', options: [
                { text: 'The three time periods are: (1) the mother\'s childhood (the photograph scene), (2) the', outcome: 'The three time periods are: (1) the mother\'s childhood (the photograph scene), (2) the mother\'s.' },
                { text: 'all stanzas are in the present', outcome: 'Not quite — Students often think the poem is just a description of a photograph, missing that it\'s a narrative.', reveals: 'the-poem-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine finding an old family photograph where everyone looks frozen in a moment — the clothes, the smiles, the background all tell a story.',
            decisions: [{ prompt: 'List the four supporting characters explicitly or implicitly present in the photograph described in the poem.', options: [
                { text: 'The four supporting characters are: the mother (as a twelve-year-old girl), the two', outcome: 'The four supporting characters are: the mother (as a twelve-year-old girl), the two cousins (Betty.' },
                { text: 'just there to fill the frame', outcome: 'Not quite — Students often think supporting characters in a poem are "just there to fill the frame" and ignore.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'the poet or the sea', outcome: 'Not quite — Students often think supporting characters in a poem are "just there to fill the frame" and ignore.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you find an old family photograph in a drawer: three girls laughing at a beach, frozen in 1920.',
            decisions: [{ prompt: 'What is the primary theme of "A Photograph" in one precise sentence? (Recall the central idea, not a plot summary.)', options: [
                { text: 'The primary theme is the transience of human life contrasted with the enduring', outcome: 'The primary theme is the transience of human life contrasted with the enduring indifference.' },
                { text: 'The poem is about a photograph of the poet\'s mother', outcome: 'Not quite — Students often believe the primary theme is **"photographs preserve memories"** or **"childhood.', reveals: 'the-primary-theme-is-photographs' },
                { text: 'photographs preserve memories', outcome: 'Not quite — Students often believe the primary theme is **"photographs preserve memories"** or **"childhood.', reveals: 'the-primary-theme-is-photographs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry workshop, students present on \'A Photograph\'. One presenter says: \'It\'s a poem about an old photo — the cardboard, the sea, the cousins\' holiday clothes. The speaker is the girl paddling in the water, remembering her beach day.\'',
            decisions: [{ prompt: 'Untangle the poem\'s voices and timeframes.', options: [
                { text: 'Three layers, two voices: the girl on the beach is the poet\'s MOTHER as a child; the mother later looked at the photo and laughed at how she\'d changed; now the poet looks at it after her mother\'s death — the \'silence\' mourning a double loss. The photograph isn\'t the subject; it\'s a trigger for a meditation on time and mortality.', outcome: 'Track who\'s looking and when: past (mother\'s childhood), recent past (mother\'s adulthood), present (poet\'s grief) — miss a layer and the poem becomes a postcard.' },
                { text: 'The presenter is right — the poem describes the photo\'s contents and the girl-speaker\'s happy memory.', outcome: 'That collapses three timeframes into one and swaps poet for mother — erasing the grief that the whole poem is built on.', reveals: 'speaker-is-the-girl' },
                { text: 'It\'s about photography as an art — how cardboard and chemistry preserve an image.', outcome: 'The object is a vehicle, not the tenor: the poem uses the frozen image to measure everything time has since taken away.', reveals: 'poem-is-about-photography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'Each stanza is a world that has already vanished — the form doesn\'t just state the theme, it performs it.',
            decisions: [{ prompt: 'What comes next? A Photograph (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Photograph (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory activity that.',
          hint: 'Review Class 10 poetry analysis (c10_engl_cbse_04_007, c10_engl_cbse_03_007) focusing.',
          misconception: 'Students often believe the poem is primarily *about* the photograph as a physical object—its cardboard frame, the sea.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "A Photograph," and what is the central object around which the poem revolves?', answer: 'The poet is Shirley Toulson (1924–2018), an English poet and writer',
                  options: ['The poet is Shirley Toulson (1924–2018), an English poet and writer', 'a different poet or thinking the photograph is of the poet herself'],
                  hint: 'Review Class 10 poetry analysis (c10_engl_cbse_04_007, c10_engl_cbse_03_007) focusing.',
                  misconception: 'Students often believe the poem is primarily *about* the photograph as a physical object—its cardboard frame, the sea, the cousins\'.' }
          ],
            remediations: { 'the-poem-is-primarily-about': { steps: ['If a student exhibits this misconception, guide them through a "Time-Frame Mapping" exercise: Draw three columns.', 'Ask them to locate each line of the poem in one column.', 'Then ask: "Who is speaking in the final stanza?', 'Whose loss is being mourned?" This visual separation forces the recognition of the three distinct temporal layers and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a poem refer to the sequence of events and the.',
          hint: 'Review "narrative poetry" and "stanza-by-stanza summary" from Class 8 (c8_engl_ch4_13).',
          misconception: 'Students often think the poem is just a description of a photograph, missing that it\'s a narrative with a plot that.',
          parts: [
                { id: 'a', prompt: 'Analyze how the shift from third-person description in stanza 1 to first-person reflection in stanza 3 affects the narrative perspective.', answer: 'Stanza 1 objectively describes the photograph (third-person), creating distance',
                  options: ['Stanza 1 objectively describes the photograph (third-person), creating distance', 'no change in perspective'],
                  hint: 'Review "narrative poetry" and "stanza-by-stanza summary" from Class 8 (c8_engl_ch4_13).',
                  misconception: 'Students often think the poem is just a description of a photograph, missing that it\'s a narrative with a plot that moves across three time.' }
          ],
            remediations: { 'the-poem-is-just-a': { steps: ['If the student cannot see the narrative, have them create a timeline: draw three boxes labeled \'Past\', \'Recent Past\'.', 'In each, write one event from the poem.', 'Then ask: "What happens between box 1 and 2?', 'Between 2 and 3?" This makes the plot visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the poem is just a description of a photograph, missing that it\'s a narrative with a plot that.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s three-stanza structure effectively conveys the theme of transience. Justify your answer.', answer: 'Yes, the three stanzas enact transience: each stanza represents a phase that has',
                  options: ['Yes, the three stanzas enact transience: each stanza represents a phase that has', 'structure doesn\'t matter'],
                  hint: 'Review "narrative poetry" and "stanza-by-stanza summary" from Class 8 (c8_engl_ch4_13).',
                  misconception: 'Students often think the poem is just a description of a photograph, missing that it\'s a narrative with a plot that moves across three time.' }
          ],
            remediations: { 'the-poem-is-just-a': { steps: ['If the student cannot see the narrative, have them create a timeline: draw three boxes labeled \'Past\', \'Recent Past\'.', 'In each, write one event from the poem.', 'Then ask: "What happens between box 1 and 2?', 'Between 2 and 3?" This makes the plot visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and social environment where the.',
          hint: 'Review "Imagery and Mood" from Class 8 (c8_engl_ch4_7) or "Setting and Natural Imagery".',
          misconception: 'Students often treat setting as merely a backdrop — a static "where and when" — and atmosphere as a single, unchanging.',
          parts: [
                { id: 'a', prompt: 'In "A Photograph," the sea appears in both the past and present settings.', answer: 'In the past setting, the sea is a playful, dynamic presence',
                  options: ['In the past setting, the sea is a playful, dynamic presence', 'the sea represents life', 'treats the sea as a static symbol (e'],
                  hint: 'Review "Imagery and Mood" from Class 8 (c8_engl_ch4_7) or "Setting and Natural Imagery" from Class.',
                  misconception: 'Students often treat setting as merely a backdrop — a static "where and when" — and atmosphere as a single, unchanging label like "sad".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student exhibits this misconception: 1.', 'Have them create a two-column table: Column A = "Past Setting (Stanza 1)", Column B = "Present Setting (Stanza 3)".', 'In each column, list *only* concrete sensory words/phrases from the text (e.g., Column A: "paddling," "transient feet,".', 'Ask: "What *feeling* does each list create in *you*?" Guide them to name the atmospheres (e.g., "lively/fleeting" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the central.',
          hint: 'Review c11_eng_h_cbse_09_002 (Plot and Narrative Structure) — specifically the.',
          misconception: 'Students treat the mother in the photograph and the poet-narrator as separate characters to be analyzed in isolation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the central figure\'s',
                  options: ['Character analysis of the protagonist in poetry involves examining the central figure\'s', '"Before You Read: Context and Background" is a preparatory activity that provides', 'Plot and narrative structure in a poem refer to the sequence of events and the way the', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'Review c11_eng_h_cbse_09_002 (Plot and Narrative Structure) — specifically the stanza-by-stanza.',
                  misconception: 'Students treat the mother in the photograph and the poet-narrator as separate characters to be analyzed in isolation, missing that they.' }
          ],
            remediations: { 'students-treat-the-mother-in': { steps: ['Have the student draw a timeline: mark the mother\'s age in photo (12), mother\'s age at death (~24-30?), poet\'s present.', 'Ask: "What does the number 12 represent for EACH protagonist?" 3.', 'Read stanza 3 aloud together, emphasizing "nearly as many years as that girl lived" — make the student say the number.', 'Rewrite the final two lines as a single sentence: "The photograph\'s silence silences me because my mother has been dead.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_005', difficulty: 'standard',
          question: 'Supporting characters in a poem are secondary figures who appear briefly but.',
          hint: 'Review "inferential character analysis" from Class 9/10 (e.g., c9_engl_ch1_2.',
          misconception: 'Students often think supporting characters in a poem are "just there to fill the frame" and ignore them because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in a poem are secondary figures who appear briefly but serve',
                  options: ['Supporting characters in a poem are secondary figures who appear briefly but serve', '"Before You Read: Context and Background" is a preparatory activity that provides', 'Plot and narrative structure in a poem refer to the sequence of events and the way the', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'Review "inferential character analysis" from Class 9/10 (e.g., c9_engl_ch1_2, c10_engl_cbse_04_009).',
                  misconception: 'Students often think supporting characters in a poem are "just there to fill the frame" and ignore them because they don\'t speak or have.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['Have the student physically draw the photograph as a stick-figure scene: label each figure with a line from the poem.', 'Ask: "If you cut out one figure, what disappears from the story?" 3.', 'Guide them to write one sentence per character: "Betty shows the mother had a friend." "The uncle shows someone cared.', 'Connect each sentence to the theme: "Shared past → deeper loss." This makes abstract characters concrete and functional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea that emerges from the.',
          hint: 'If stuck, return to c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and reconstruct.',
          misconception: 'Students often believe the primary theme is **"photographs preserve memories"** or **"childhood is innocent and.',
          parts: [
                { id: 'a', prompt: 'What is the primary theme of "A Photograph" in one precise sentence? (Recall the central idea, not a plot summary.)', answer: 'The primary theme is the transience of human life contrasted with the enduring',
                  options: ['The primary theme is the transience of human life contrasted with the enduring', 'The poem is about a photograph of the poet\'s mother', 'photographs preserve memories', 'childhood is innocent and happy'],
                  hint: 'If stuck, return to c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and reconstruct the.',
                  misconception: 'Students often believe the primary theme is **"photographs preserve memories"** or **"childhood is innocent and happy."** They latch onto.' },
                { id: 'b', prompt: 'Explain in your own words how the poem\'s structure (three stanzas, shifting tenses) reinforces its primary theme.', answer: 'The three stanzas enact a temporal journey: Stanza 1 (past continuous',
                  options: ['The three stanzas enact a temporal journey: Stanza 1 (past continuous', 'Stanza 1 uses -ing verbs, Stanza 2 uses -ed verbs', 'photographs preserve memories', 'childhood is innocent and happy'],
                  hint: 'If stuck, return to c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and reconstruct the.',
                  misconception: 'Students often believe the primary theme is **"photographs preserve memories"** or **"childhood is innocent and happy."** They latch onto.' },
                { id: 'c', prompt: 'Apply the concept of "symbol" to the photograph itself: what does it symbolise in relation to the primary theme, and how does its meaning shift across the.', answer: 'The photograph symbolises the **fragile attempt to arrest time**',
                  options: ['The photograph symbolises the **fragile attempt to arrest time**', 'It symbolises memories', 'cardboard', 'photographs preserve memories'],
                  hint: 'If stuck, return to c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and reconstruct the.',
                  misconception: 'Students often believe the primary theme is **"photographs preserve memories"** or **"childhood is innocent and happy."** They latch onto.' }
          ],
            remediations: { 'the-primary-theme-is-photographs': { steps: ['**Re-read Stanza 3 aloud** with the student.', 'Ask: "What is the subject of the last sentence?', '(\'Its silence\') — not \'her death,\' not \'my grief.\' Why does the poet give the silence to the photograph?" 2.', '**Create a three-column table** on paper: Column 1 = Stanza 1 details (verbs, nouns), Column 2 = Stanza 2 details.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
