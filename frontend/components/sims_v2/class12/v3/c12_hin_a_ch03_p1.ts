import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p1: SimDef = {
    id: 'v3_c12_hin_a_ch03_p1',
    title: 'osQnkjukFk ¯lg · Part 1/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'osQnkjukFk ¯lg · Part 1/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_001', 'c12_hin_a_cbse_03_002', 'c12_hin_a_cbse_03_003', 'c12_hin_a_cbse_03_004', 'c12_hin_a_cbse_03_005', 'c12_hin_a_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory literary skill where students systematically gather and organize biographical, historical, cultural, and literary-movement information about.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a dark room and hear a single flute playing — the darkness is the setting, the eerie calm is the atmosphere.',
            decisions: [{ prompt: 'What is the primary setting of the poem "nhi vosQyk" in terms of time and place?', options: [
                { text: 'The primary setting is a village night ("nhi") in rural India, suggested by images like', outcome: 'The primary setting is a village night ("nhi") in rural India, suggested by images like "lkxj".' },
                { text: 'a city street', outcome: 'Not quite — Students treat "setting" as merely the background label (e.g., "village night") and "atmosphere".', reveals: 'students-treat-setting-as-merely' },
                { text: 'daytime', outcome: 'Not quite — Students treat "setting" as merely the background label (e.g., "village night") and "atmosphere".', reveals: 'students-treat-setting-as-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re explaining to a younger sibling why the poet keeps repeating "नहीं वोस्यक लुस्ग हकक गस xoZ Hkjk enekrk" — what is the ONE big idea he won\'t let.',
            decisions: [{ prompt: 'What is the difference between the \'subject\' of a poem and its \'primary theme\'? Give a one-sentence distinction.', options: [
                { text: 'The subject is the topic (e.g., "a child" or "the moon")', outcome: 'The subject is the topic (e.g., "a child" or "the moon"); the primary theme is the poet\'s insight.' },
                { text: 'The theme is the child', outcome: 'Not quite — Students often confuse the *primary theme* with the *most repeated word or image*.', reveals: 'students-often-confuse-the-primary' },
                { text: 'equates the two (e', outcome: 'Not quite — Students often confuse the *primary theme* with the *most repeated word or image*.', reveals: 'students-often-confuse-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'What comes next? osQnkjukFk ¯lg · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — osQnkjukFk ¯lg · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory literary skill where.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_03_001 (Class 11 Chapter 3 Before You Read) and re-do.',
          misconception: 'Students treat "Before You Read" as a passive reading of the author blurb, memorizing dates and awards for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Given the NCERT note that Vajra edited literary journals (लक्ष्य, नया भारत, हंस) and worked at All India Radio, predict two specific ways his editorial/radio.', answer: 'Correct answer: (1) The poem\'s insistent refrain "यह चिड़िया',
                  options: ['Correct answer: (1) The poem\'s insistent refrain "यह चिड़िया', 'good vocabulary'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_03_001 (Class 11 Chapter 3 Before You Read) and re-do its worked.',
                  misconception: 'Students treat "Before You Read" as a passive reading of the author blurb, memorizing dates and awards for a 1-mark factual recall.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Have the student re-read the NCERT biographical note with a highlighter, marking only facts that could *plausibly.', 'For each highlighted fact, write one "If this shaped the poem, then I would expect to see..." prediction (e.g., "If.', 'Read the two poems once, checking which predictions hold.', 'Discard unproductive facts; keep only those that illuminate textual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the deliberate organization.',
          hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative Structure) and.',
          misconception: 'Students often equate "plot" in poetry with a story involving characters and events.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "narrative progression" to "मैंने देखा, एक चुनाव".', answer: 'The shift occurs at "eq> dks nh[k x;k%" (I showed it to you / I realized)',
                  options: ['The shift occurs at "eq> dks nh[k x;k%" (I showed it to you / I realized)', 'picks a later line (e'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative Structure) and practice.',
                  misconception: 'Students often equate "plot" in poetry with a story involving characters and events.' },
                { id: 'b', prompt: 'Compare the narrative structures of the two poems. One uses a catalogue of metaphors framed by a refrain; the other uses a single observed moment that expands.', answer: '"नहीं वोश्यक" explores the multiplicity and elusiveness of identity',
                  options: ['"नहीं वोश्यक" explores the multiplicity and elusiveness of identity', 'merely lists structural features (refrain vs'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative Structure) and practice.',
                  misconception: 'Students often equate "plot" in poetry with a story involving characters and events.' }
          ],
            remediations: { 'students-often-equate-plot-in': { steps: ['Have the student read "नहीं वोश्यक" aloud twice, clapping on the refrain each time to hear its recurrence.', 'Give a printed copy; ask them to draw a box around every refrain and number the stanzas.', 'In the margin, write the metaphor of each stanza (xhr, eksrh, etc.).', 'Ask: "After stanza 2, what does the refrain mean?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "plot" in poetry with a story involving characters and events.',
          parts: [
                { id: 'a', prompt: 'Which poem’s narrative structure do you find more effective in conveying its central idea? Defend your choice with specific structural evidence from both poems.', answer: 'Both are effective but for different reasons',
                  options: ['Both are effective but for different reasons', 'I like the second poem'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative Structure) and practice.',
                  misconception: 'Students often equate "plot" in poetry with a story involving characters and events.' }
          ],
            remediations: { 'students-often-equate-plot-in': { steps: ['Have the student read "नहीं वोश्यक" aloud twice, clapping on the refrain each time to hear its recurrence.', 'Give a printed copy; ask them to draw a box around every refrain and number the stanzas.', 'In the margin, write the metaphor of each stanza (xhr, eksrh, etc.).', 'Ask: "After stanza 2, what does the refrain mean?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and physical environment where the.',
          hint: 'Review "Setting vs Atmosphere" table in c11_hin_ar_cbse_01_003 and practice on a new.',
          misconception: 'Students treat "setting" as merely the background label (e.g., "village night") and "atmosphere" as a single adjective.',
          parts: [
                { id: 'a', prompt: 'In "nhi vosQyk", the speaker says "ij bldks Hkh iafDr dks ns nks".', answer: 'The speaker embraces the night\'s darkness and fear',
                  options: ['The speaker embraces the night\'s darkness and fear', 'the speaker is suicidal', 'it\'s a metaphor for death', 'nhi vosQyk'],
                  hint: 'Review "Setting vs Atmosphere" table in c11_hin_ar_cbse_01_003 and practice on a new unseen poem.',
                  misconception: 'Students treat "setting" as merely the background label (e.g., "village night") and "atmosphere" as a single adjective (e.g., "scary").' },
                { id: 'b', prompt: 'Identify three sensory images in the first stanza of "eSaus ns[kk] ,d cw¡n" and state whether each appeals to sight, touch, or sound.', answer: 'Images: "lkxj osQ >kx ls" (sight',
                  options: ['Images: "lkxj osQ >kx ls" (sight', 'sound of wind', 'smell of flower', 'nhi vosQyk'],
                  hint: 'Review "Setting vs Atmosphere" table in c11_hin_ar_cbse_01_003 and practice on a new unseen poem.',
                  misconception: 'Students treat "setting" as merely the background label (e.g., "village night") and "atmosphere" as a single adjective (e.g., "scary").' }
          ],
            remediations: { 'students-treat-setting-as-merely': { steps: ['Re-read both poems aloud, physically underlining every noun/adjective that names a place, time, light condition,.', 'For each underlined word, write one sentence: "This word makes me feel ____ because ____" — this separates reader\'s.', 'Create a two-column table: Column A = Setting Element (e.g., "lightning"), Column B = Atmosphere Effect (e.g., "sudden.', 'Do this for 5 elements per poem.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the poetic.',
          hint: 'If stuck, return to c12_hin_a_cbse_03_002 and map the stanza-by-stanza progression.',
          misconception: 'Students treat "character analysis" in poetry as describing *personality traits* (kind, brave, sad) of the speaker.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist in poetry involves examining the poetic persona',
                  options: ['Character analysis of the protagonist in poetry involves examining the poetic persona', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and narrative structure in poetry refers to the deliberate organization of images,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, return to c12_hin_a_cbse_03_002 and map the stanza-by-stanza progression of metaphors.',
                  misconception: 'Students treat "character analysis" in poetry as describing *personality traits* (kind, brave, sad) of the speaker or subject, as they.' }
          ],
            remediations: { 'students-treat-character-analysis-in': { steps: ['Have the student read *only* the refrain of "nhi vosQyk" five times aloud, noting the shift from statement ("gS").', 'Give them a two-column table: Column A = metaphor from poem (xhr, eèkq, izÑr, etc.); Column B = what social role/value.', 'Ask: "If the poem described the nose as \'sundar\' (beautiful) instead of \'Lusg/xoZ/enekrk,\' what political work would.', 'Re-attempt DIAGNOSTIC_QUESTION_4 with the table as scaffold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_005', difficulty: 'standard',
          question: 'Supporting characters in a poem are the distinct personas, roles, or voices.',
          hint: 'If stuck, revisit c12_hin_a_cbse_03_004 (Protagonist) for speaker analysis and.',
          misconception: 'Students treat the poem as a *list* of separate women ("one woman is a warrior, another is a mother") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in a poem are the distinct personas, roles, or voices adopted by',
                  options: ['Supporting characters in a poem are the distinct personas, roles, or voices adopted by', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and narrative structure in poetry refers to the deliberate organization of images,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_03_004 (Protagonist) for speaker analysis and.',
                  misconception: 'Students treat the poem as a *list* of separate women ("one woman is a warrior, another is a mother") rather than a *layered portrait.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student read the poem aloud *only* the lines beginning with "यह नारी" (the refrain) to hear the accumulating.', 'Give a two-column worksheet: Column A = Role (क्षत्राणी, एकल, etc.), Column B = Key Image (तलवार, पैर, आँचल, अंधकार.', 'Student fills Column B by scanning the poem — this forces stanza-by-stanza evidence gathering.', 'Ask: "If this poem were a film, would the same actress play all six roles or six different actresses?" The answer (same.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review "How to write a theme statement" from Class 11 (c11_hin_ar_cbse_01_006).',
          misconception: 'Students often confuse the *primary theme* with the *most repeated word or image*.',
          parts: [
                { id: 'a', prompt: 'What is the difference between the \'subject\' of a poem and its \'primary theme\'? Give a one-sentence distinction.', answer: 'The subject is the topic (e.g., "a child" or "the moon")',
                  options: ['The subject is the topic (e.g., "a child" or "the moon")', 'The theme is the child', 'equates the two (e'],
                  hint: 'If stuck, review "How to write a theme statement" from Class 11 (c11_hin_ar_cbse_01_006) and.',
                  misconception: 'Students often confuse the *primary theme* with the *most repeated word or image*.' }
          ],
            remediations: { 'students-often-confuse-the-primary': { steps: ['Have the student re-read both poems and write one complete sentence starting with "The poet believes that..." for each.', 'Compare the two sentences; synthesize into a single statement covering both.', 'Verify: Does the statement explain WHY the poet repeats the refrain?', 'Does it account for the moon imagery?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
