import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch13_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch13_p1',
    title: 'gtkjh izlkn f}osnh · Part 1/3',
    subtitle: 'Read a protest poem that never once explains its own violence.',
    classLevel: 11, subject: 'hin_ar', topic: 'gtkjh izlkn f}osnh · Part 1/3',
    chapters: ['c11_hin_ar_ch13'],
    nodeIds: ['c11_hin_ar_cbse_13_001', 'c11_hin_ar_cbse_13_002', 'c11_hin_ar_cbse_13_003', 'c11_hin_ar_cbse_13_004', 'c11_hin_ar_cbse_13_005', 'c11_hin_ar_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a filmmaker cutting three reels of the same dark hour', intro: 'A folk idiom (\'लकड़ी का लक्खा\'), a Marxist poet, a street on fire — the poem shows you the footage and trusts you to name the crime.', goal: 'Analyse montage structure and the stanza-wise stacking of public violence, private fear and universal law.' },
    discovery: {
        question: 'Smoldering stakes, barefoot fleeing children, a police jeep — three images stacked with no connecting line. Sloppy writing?',
        options: ['No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment', 'Yes — a poem must state its causes', 'Yes — images without links are just a list', 'No — the jeep is clearly chasing the children in the text'],
        answer: 'No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment',
        hook: 'The three stanzas aren\'t consecutive scenes — public chaos, private terror and eternal law are stacked as simultaneous faces of one Emergency-era moment.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is the preparatory step where students gather essential information about the poet\'s life, the historical-literary period, the source collection, and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the pronouns across the three stanzas to separate street, self and moral law, then defend why the poem refuses a linear plot.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are handed a letter without a sender\'s name or date — you would first check the envelope for clues about who wrote it and when.',
            decisions: [{ prompt: 'Who is the poet of the poem discussed in Chapter 13, and what is the title of the collection from which this poem is taken?', options: [
                { text: 'The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा"', outcome: 'The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा".' },
                { text: 'Context and Background', outcome: 'Not quite — Students often think "Context and Background" means memorizing the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' },
                { text: 'another poet like Kedarnath Singh or a wrong collection', outcome: 'Not quite — Students often think "Context and Background" means memorizing the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are editing a documentary about the 1975 Emergency: you have footage of a violent street arrest (Stanza 1), a voice-over of the filmmaker\'s.',
            decisions: [{ prompt: 'Identify the three distinct narrative "layers" or perspectives presented in the three stanzas of "lk;s esa /wi" and name the dominant.', options: [
                { text: 'Correct: Stanza 1 = External/Observational layer (third-person: "वह", "वे", "यहाँ")', outcome: 'Correct: Stanza 1 = External/Observational layer (third-person: "वह", "वे", "यहाँ"); Stanza 2.' },
                { text: 'explain with reference to context', outcome: 'Not quite — Students treat the poem as a short story with a hidden plot: "Police burn stakes → children run →.', reveals: 'students-treat-the-poem-as' },
                { text: 'all stanzas are the poet\'s direct speech', outcome: 'Not quite — Students treat the poem as a short story with a hidden plot: "Police burn stakes → children run →.', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a government office where the officer sits on a high chair ignoring a long queue of tired citizens, while clerks whisper flattery to him.',
            decisions: [{ prompt: 'Define \'setting\' and \'atmosphere\' in the context of a poem. How are they different from each other?', options: [
                { text: 'Setting is the *where* and *when* (physical location, time period)', outcome: 'Setting is the *where* and *when* (physical location, time period); atmosphere is the *emotional.' },
                { text: 'setting is the mood', outcome: 'Not quite — Students often believe "setting is just the background" and "atmosphere is just a synonym for.', reveals: 'setting-is-just-the-background' },
                { text: 'setting is just the background', outcome: 'Not quite — Students often believe "setting is just the background" and "atmosphere is just a synonym for.', reveals: 'setting-is-just-the-background' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re sitting in a dark room at night, hearing the wind outside, and you start thinking about the unfairness you see in the world—that\'s the.',
            decisions: [{ prompt: 'Who is the protagonist in the poem "lk;s esa /wi"? Provide a one-sentence answer based on the text.', options: [
                { text: 'The protagonist is the first-person speaker ("eSa"), who represents the poet Nagarjun', outcome: 'The protagonist is the first-person speaker ("eSa"), who represents the poet Nagarjun himself as.' },
                { text: 'the woods', outcome: 'Not quite — Students often think the protagonist in a poem is always the poet themselves in a biographical.', reveals: 'the-protagonist-in-a-poem' },
                { text: 'the night', outcome: 'Not quite — Students often think the protagonist in a poem is always the poet themselves in a biographical.', reveals: 'the-protagonist-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are standing at a busy Indian cremation ground watching a funeral procession pass.',
            decisions: [{ prompt: 'List the three distinct supporting groups explicitly or implicitly presented across the three stanzas of the poem.', options: [
                { text: 'The three groups are: (1) The pallbearers/procession carriers (Stanza 1: implied by', outcome: 'The three groups are: (1) The pallbearers/procession carriers (Stanza 1: implied by "fpjkxk¡ gjsoQ.' },
                { text: 'people', outcome: 'Not quite — Students believe supporting characters in a poem must have names, dialogues, or individual traits.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'supporting characters in a poem must have names, dialogues, or individual traits', outcome: 'Not quite — Students believe supporting characters in a poem must have names, dialogues, or individual traits.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a protest-poetry evening, a student reads Nagarjun\'s poem and interprets it as a literal street scene: \'Police burn stakes, children run, the poet hides, then calls himself a king — confusing sequence, honestly.\'',
            decisions: [{ prompt: 'What\'s the better structural reading?', options: [
                { text: 'Read the three stanzas as simultaneous realities, not a sequence: Stanza 1 is public chaos, Stanza 2 the poet\'s private terror, Stanza 3 a universal moral law — stacked so that state violence, individual fear and enduring truth coexist in one totalitarian moment. And context sharpens it: a peasant-movement poet writing political satire in rustic imagery — the stake (लकड़ी) is a symbol of resistance, not firewood.', outcome: 'The \'confusing sequence\' resolves into deliberate design: structure is the argument — the poem forces three contradictory perspectives to be held at once.' },
                { text: 'Keep the story reading — find the causal links, like whether the police spotted the poet.', outcome: 'Hunting cause-and-effect across stanzas imports prose logic into a modernist poem: the stanzas are facets of one moment, not consecutive scenes.', reveals: 'stanzas-as-consecutive-scenes' },
                { text: 'Reclassify it as a nature poem — stakes, smoke and sunlight are rustic imagery.', outcome: 'The rustic surface is the disguise: a poet of peasant movements uses folk simplicity for political satire — nature imagery carries ideology.', reveals: 'satire-read-as-nature-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Nagarjun stacks terror, conscience and law without explaining them — the reader assembling the causal chain is the poem\'s argument.',
            decisions: [{ prompt: 'What comes next? gtkjh izlkn f}osnh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — gtkjh izlkn f}osnh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is the preparatory step where.',
          hint: 'If stuck, review the "पाठ से पहले" section of any Class 10 Hindi poem (e.g., Chapter 1.',
          misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and list of works for.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of the poem discussed in Chapter 13, and what is the title of the collection from which this poem is taken?', answer: 'The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा"',
                  options: ['The poet is Nagarjun (नागार्जुन) and the collection is "लकड़ी का लक्खा"', 'Context and Background', 'another poet like Kedarnath Singh or a wrong collection'],
                  hint: 'If stuck, review the "पाठ से पहले" section of any Class 10 Hindi poem (e.g., Chapter 1 of Kshitij).',
                  misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and list of works for a 1-mark question.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['Have the student re-read only the introductory note (pages 130-131) with a highlighter, marking every adjective that.', 'Ask them to write one sentence per highlighted word explaining what that quality promises in the poem.', 'Then match those promises to the poet\'s bio: e.g., "गहन भावस्थिति" links to his peasant activism; "चमत्कारिक प्रयोग".', 'Finally, have them predict the poem\'s tone (satirical?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_002', difficulty: 'standard',
          question: 'In poetry, narrative structure refers to the organization of a poem\'s events.',
          hint: 'Revisit c11_hin_ar_cbse_13_001, specifically the paragraph on "आपातकाल की पृष्ठभूमि" and.',
          misconception: 'Students treat the poem as a short story with a hidden plot: "Police burn stakes → children run → poet hides → poet.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and',
                  options: ['In poetry, narrative structure refers to the organization of a poem\'s events, images, and', '"Before You Read: Context and Background" is the preparatory step where students gather', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s', 'Character analysis of the protagonist in a poem involves examining the speaker\'s persona,'],
                  hint: 'Revisit c11_hin_ar_cbse_13_001, specifically the paragraph on "आपातकाल की पृष्ठभूमि" and the note.',
                  misconception: 'Students treat the poem as a short story with a hidden plot: "Police burn stakes → children run → poet hides → poet realizes he is a king.".' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Give the student three index cards labeled "Camera Eye" (Stanza 1), "Diary Entry" (Stanza 2), "Manifesto" (Stanza 3).', 'Ask them to read only Stanza 1 and write one sentence in *present continuous* tense describing what the camera sees.', 'Repeat for Stanza 2 in *first-person past* ("I felt..."), Stanza 3 in *gnomic present* ("Truth is...").', 'Physically lay the cards side-by-side (not in a line) and ask: "Do these happen one after another, or all at once?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and physical environment where the.',
          hint: 'Review \'Imagery and Sensory Details\' from Class 10 Hindi (Kshitij/Sparsh) poetry.',
          misconception: 'Students often believe "setting is just the background" and "atmosphere is just a synonym for tone." In this poem, they.',
          parts: [
                { id: 'a', prompt: 'Define \'setting\' and \'atmosphere\' in the context of a poem. How are they different from each other?', answer: 'Setting is the *where* and *when* (physical location, time period)',
                  options: ['Setting is the *where* and *when* (physical location, time period)', 'setting is the mood', 'setting is just the background', 'atmosphere is just a synonym for tone'],
                  hint: 'Review \'Imagery and Sensory Details\' from Class 10 Hindi (Kshitij/Sparsh) poetry chapters.',
                  misconception: 'Students often believe "setting is just the background" and "atmosphere is just a synonym for tone." In this poem, they identify the court.' },
                { id: 'b', prompt: 'Read the following lines from another poem: *"The marble hall echoed with laughter, / While outside, the winter bit the beggar\'s bones."* Identify the setting.', answer: 'Setting: A marble hall (inside) vs',
                  options: ['Setting: A marble hall (inside) vs', 'sadness', 'setting is just the background', 'atmosphere is just a synonym for tone'],
                  hint: 'Review \'Imagery and Sensory Details\' from Class 10 Hindi (Kshitij/Sparsh) poetry chapters.',
                  misconception: 'Students often believe "setting is just the background" and "atmosphere is just a synonym for tone." In this poem, they identify the court.' }
          ],
            remediations: { 'setting-is-just-the-background': { steps: ['**Re-read with a spatial lens:** Ask the student to draw a quick diagram of the court: Where is the throne?', 'Where are the petitioners?', '**Label emotions on the diagram:** Write the feeling associated with each position (throne: indifference; courtiers.', '**Connect to words:** Find the exact Hindi words in the poem for each position and feeling (e.g., \'fpjkx\', \'e;Llj\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "setting is just the background" and "atmosphere is just a synonym for tone." In this poem, they.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the court setting as a symbol for political power in the poem. Does the setting strengthen or weaken the poet\'s satire?', answer: 'It strengthens the satire',
                  options: ['It strengthens the satire', 'it\'s just a background', 'setting is just the background', 'atmosphere is just a synonym for tone'],
                  hint: 'Review \'Imagery and Sensory Details\' from Class 10 Hindi (Kshitij/Sparsh) poetry chapters.',
                  misconception: 'Students often believe "setting is just the background" and "atmosphere is just a synonym for tone." In this poem, they identify the court.' }
          ],
            remediations: { 'setting-is-just-the-background': { steps: ['**Re-read with a spatial lens:** Ask the student to draw a quick diagram of the court: Where is the throne?', 'Where are the petitioners?', '**Label emotions on the diagram:** Write the feeling associated with each position (throne: indifference; courtiers.', '**Connect to words:** Find the exact Hindi words in the poem for each position and feeling (e.g., \'fpjkx\', \'e;Llj\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the.',
          hint: 'Review "Speaker vs. Poet" distinction from Class 10 poetry chapter (e.g., in "The Road.',
          misconception: 'Students often think the protagonist in a poem is always the poet themselves in a biographical sense, leading them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in a poem involves examining the speaker\'s persona,',
                  options: ['Character analysis of the protagonist in a poem involves examining the speaker\'s persona,', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'Review "Speaker vs. Poet" distinction from Class 10 poetry chapter (e.g., in "The Road Not Taken".',
                  misconception: 'Students often think the protagonist in a poem is always the poet themselves in a biographical sense, leading them to write about.' }
          ],
            remediations: { 'the-protagonist-in-a-poem': { steps: ['If a student makes this error, first ask them to highlight every "eSa" (I) and "my" reference in the poem.', 'Then, have them list what the text explicitly says about this "I" (observes, feels, declares).', 'Next, ask: "Does the poem say he is a communist, or does it show him siding with the poor?" Finally, guide them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_005', difficulty: 'standard',
          question: 'Supporting characters in a poem are secondary figures or groups who interact.',
          hint: 'Review Node 004 (Protagonist Analysis) to re-establish the speaker\'s voice, then re-read.',
          misconception: 'Students believe supporting characters in a poem must have names, dialogues, or individual traits.',
          parts: [
                { id: 'a', prompt: 'Analyze how the spatial arrangement of the three supporting groups across the stanzas (procession → relatives → world) creates a structural movement from.', answer: 'Stanza 1: Pallbearers are physically touching the body ("gjsoQ ?kj osQ fy,")',
                  options: ['Stanza 1: Pallbearers are physically touching the body ("gjsoQ ?kj osQ fy,")', 'supporting characters in a poem must have names, dialogues, or individual traits'],
                  hint: 'Review Node 004 (Protagonist Analysis) to re-establish the speaker\'s voice, then re-read the poem.',
                  misconception: 'Students believe supporting characters in a poem must have names, dialogues, or individual traits.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['**Re-read Stanza 1 only**: Underline every verb/action associated with the body ("gjsoQ", "yxrh", "pysa", "Hkj").', 'Ask: "Who does these actions?', 'What single noun covers all doers?" → Pallbearers as laborers.', '**Make a 3-column table**: Column A: Stanza number.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review "extended metaphor" in c11_hin_ar_cbse_13_008 and "Nagarjun\'s political.',
          misconception: 'Students often read "लकड़ियों में आग" as a nature poem about literal fire in wood, or as a generic "never give up".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', '"Before You Read: Context and Background" is the preparatory step where students gather', 'In poetry, narrative structure refers to the organization of a poem\'s events, images, and', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, review "extended metaphor" in c11_hin_ar_cbse_13_008 and "Nagarjun\'s political biography".',
                  misconception: 'Students often read "लकड़ियों में आग" as a nature poem about literal fire in wood, or as a generic "never give up" inspirational poem.' }
          ],
            remediations: { 'students-often-read-as-a': { steps: ['Ask the student to list every noun in the poem that refers to people or groups (e.g., "चसदज", "रहजक फौजक", "ग़फ़लत".', 'Have them re-read stanza 2 aloud, replacing "मैं चसदज ग्वाँ" with "मैं मजदूर/दलित/आदिवासी हूँ" to force the allegorical.', 'Give them a two-column table: Column A = words from the poem (लकड़ियाँ, आग, चिंगारी, धुआँ, राख), Column B = social.', 'Show a 2-minute clip of a peasant movement speech (e.g., from the 1970s Bihar Kisan Sabha) and ask: "Which lines from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
