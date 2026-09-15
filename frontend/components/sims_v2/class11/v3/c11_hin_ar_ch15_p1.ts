import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p1',
    title: 'eerk dkfy;k · Part 1/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'eerk dkfy;k · Part 1/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_001', 'c11_hin_ar_cbse_15_002', 'c11_hin_ar_cbse_15_003', 'c11_hin_ar_cbse_15_004', 'c11_hin_ar_cbse_15_005', 'c11_hin_ar_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading strategy that equips students with the poet\'s biographical details, socio-historical milieu, literary movement affiliations, and thematic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are handed a poem titled "The Smallest is Not the Smallest" without any context—you might guess it\'s about physical size or a child\'s perspective.',
            decisions: [{ prompt: 'Who is Viren Dangwal, and which literary movement is he associated with in Hindi literature?', options: [
                { text: 'Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal,', outcome: 'Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal, Uttarakhand.' },
                { text: 'him a Chhayavaadi or Nayi Kavita poet', outcome: 'Not quite — Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are asked to explain this poem to a friend who has never read it.',
            decisions: [{ prompt: 'What is the basic structural pattern of the poem "lcls [krjukd" in terms of how the stanzas are organized?', options: [
                { text: 'The poem opens with three stanzas that repeatedly deny common assumptions about cruelty', outcome: 'The poem opens with three stanzas that repeatedly deny common assumptions about cruelty (mother\'s.' },
                { text: 'it\'s just a list of sad things', outcome: 'Not quite — Students often believe "plot" and "narrative structure" apply only to stories with characters and.', reveals: 'plot-and-narrative-structure-apply' },
                { text: 'narrative structure', outcome: 'Not quite — Students often believe "plot" and "narrative structure" apply only to stories with characters and.', reveals: 'plot-and-narrative-structure-apply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are listening to a friend describe the hardest thing they\'ve ever done — you instinctively judge their character by what they choose to share and.',
            decisions: [{ prompt: 'In the poem "lcls [krjukd", who is the \'protagonist\' being analyzed when we do a character analysis?', options: [
                { text: 'The protagonist is the poetic speaker (the \'I\' voice of the poem), a constructed persona', outcome: 'The protagonist is the poetic speaker (the \'I\' voice of the poem), a constructed persona distinct.' },
                { text: 'the poet himself or a fictional character from a story', outcome: 'Not quite — Students conflate the *poet* (Vinod Kumar Shukla, a specific historical person with a biography).', reveals: 'students-conflate-the-poet-vinod' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re holding a tiny splinter in your finger - it\'s physically small but the pain it causes feels huge.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "लाल सबसे छोटा" in the poem\'s title, and how does the poet subvert this literal meaning in the.', options: [
                { text: 'The literal meaning is "Red is the smallest" or "The smallest is the red one," but the', outcome: 'The literal meaning is "Red is the smallest" or "The smallest is the red one," but the poet.' },
                { text: 'लाल सबसे छोटा', outcome: 'Not quite — Students often think the poem is literally about the color red or physical smallness because of the.', reveals: 'the-poem-is-literally-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'What comes next? eerk dkfy;k · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — eerk dkfy;k · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading strategy that equips.',
          hint: 'Review Class 10 Hindi literary history chart (साहित्यिक आंदोलन और उनकी विशेषताएं).',
          misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for.',
          parts: [
                { id: 'a', prompt: 'Who is Viren Dangwal, and which literary movement is he associated with in Hindi literature?', answer: 'Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal,',
                  options: ['Viren Dangwal (1950–1988) was a Hindi poet and journalist from Tehri Garhwal,', 'him a Chhayavaadi or Nayi Kavita poet'],
                  hint: 'Review Class 10 Hindi literary history chart (साहित्यिक आंदोलन और उनकी विशेषताएं) focusing.',
                  misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for a 1-mark factual question.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the poet-context-theme link: Step 1—Have them re-read the textbook\'s introductory note.', 'Step 2—Ask them to convert each adjective into a "prediction question" for the poem (e.g., "जनपक्षधर → Will the poem.', 'Step 3—Have them verify predictions against the poem\'s first stanza when they reach node c11_hin_ar_cbse_15_002.', 'This transforms passive reading into active hypothesis-testing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Knowing the poet\'s biography before reading a poem limits a student\'s independent interpretation because it imposes a fixed lens." Defend.', answer: 'Challenge',
                  options: ['Challenge', 'simple', 'deliberately accessible as political strategy'],
                  hint: 'Review Class 10 Hindi literary history chart (साहित्यिक आंदोलन और उनकी विशेषताएं) focusing.',
                  misconception: 'Students treat "Before You Read" as optional trivia—memorizing the poet\'s birth/death years and major works for a 1-mark factual question.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the poet-context-theme link: Step 1—Have them re-read the textbook\'s introductory note.', 'Step 2—Ask them to convert each adjective into a "prediction question" for the poem (e.g., "जनपक्षधर → Will the poem.', 'Step 3—Have them verify predictions against the poem\'s first stanza when they reach node c11_hin_ar_cbse_15_002.', 'This transforms passive reading into active hypothesis-testing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a poem refers to the deliberate organization.',
          hint: 'Review "stanza and refrain identification" from Class 10 poetry chapter.',
          misconception: 'Students often believe "plot" and "narrative structure" apply only to stories with characters and events, so they look.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in a poem refers to the deliberate organization of images,',
                  options: ['Plot and narrative structure in a poem refers to the deliberate organization of images,', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Setting and Atmosphere in poetry refer to the temporal, spatial, and emotional backdrop', 'Character analysis of the protagonist in a poem involves examining the poetic persona'],
                  hint: 'Review "stanza and refrain identification" from Class 10 poetry chapter.',
                  misconception: 'Students often believe "plot" and "narrative structure" apply only to stories with characters and events, so they look for a storyline.' }
          ],
            remediations: { 'plot-and-narrative-structure-apply': { steps: ['Have the student read the poem aloud twice, marking every occurrence of "lcls [krjukd" with a highlighter.', 'Ask them to draw a simple two‑column table: left column = "What cruelty is NOT (stanzas 1‑3)", right column = "What.', 'Guide them to notice the refrain changes from "ugha gksrh" to "gksrk gS" exactly at the column break.', 'Finally, have them write one sentence explaining why the poet needed the left column before writing the right column.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_003', difficulty: 'standard',
          question: 'Setting and Atmosphere in poetry refer to the temporal, spatial, and emotional.',
          hint: 'Review the distinction between \'setting as backdrop\' and \'setting as active force\' using.',
          misconception: 'Students often treat \'setting\' as a static label (\'rural India\', \'1980s\') and \'atmosphere\' as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting and Atmosphere in poetry refer to the temporal, spatial, and emotional backdrop',
                  options: ['Setting and Atmosphere in poetry refer to the temporal, spatial, and emotional backdrop', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure in a poem refers to the deliberate organization of images,', 'Character analysis of the protagonist in a poem involves examining the poetic persona'],
                  hint: 'Review the distinction between \'setting as backdrop\' and \'setting as active force\' using a familiar.',
                  misconception: 'Students often treat \'setting\' as a static label (\'rural India\', \'1980s\') and \'atmosphere\' as a single adjective (\'sad\', \'gloomy\'), missing.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Re-read the poem *only* for place/time words (घर, खेत, पगडंडी, सांझ, रात, दिन) and mark them in one colour; re-read for.', 'Draw a two-column timeline: left column = physical movement (leaving, walking, returning); right column = atmospheric.', 'Write one sentence per stanza: \'In this stanza the setting is ___ and the atmosphere is ___ because ___.\' 4.', 'Compare your sentences with a peer — if your atmosphere words are all synonyms of \'sad\', go back and find the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a poem involves examining the poetic.',
          hint: 'Review "Author vs. Speaker" distinction using a simple example: In a horror movie, the.',
          misconception: 'Students conflate the *poet* (Vinod Kumar Shukla, a specific historical person with a biography) with the *speaker* (a.',
          parts: [
                { id: 'a', prompt: 'The speaker lists several things that are *not* the most difficult (esgur dh ywV, iqfyl dh ekj, xíkjh&yksHk dh eq_h).', answer: 'It reveals a speaker who is intellectually rigorous and emotionally honest',
                  options: ['It reveals a speaker who is intellectually rigorous and emotionally honest', 'it shows the speaker is confused', 'it\'s just a poetic device'],
                  hint: 'Review "Author vs. Speaker" distinction using a simple example: In a horror movie, the director.',
                  misconception: 'Students conflate the *poet* (Vinod Kumar Shukla, a specific historical person with a biography) with the *speaker* (a literary construct.' }
          ],
            remediations: { 'students-conflate-the-poet-vinod': { steps: ['Have the student underline every occurrence of "I/me/my" (eqgCcr, eqnkZ, gekjs) and "you/your" (vkidh, vkiosQ) in the.', 'Ask: "Does the *poet* know *your* (the student\'s) trembling shadow or bowed walk?', 'So who is speaking *to you*?" 3.', 'Co-create a \'Speaker Profile Card\': Name: The Witness.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves identifying and.',
          hint: 'If stuck, review c11_hin_ar_cbse_15_002 (Plot and Narrative Structure) to map the poem\'s.',
          misconception: 'Students often treat the poem\'s figures as literal characters in a story (e.g., "the woman," "the mother," "the hungry.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet rejects "a woman\'s shadow" and "a mother\'s love" as examples of the "smallest" thing, even though both are traditionally.', answer: 'The poet rejects them',
                  options: ['The poet rejects them', 'because women and mothers are important'],
                  hint: 'If stuck, review c11_hin_ar_cbse_15_002 (Plot and Narrative Structure) to map the poem\'s movement.',
                  misconception: 'Students often treat the poem\'s figures as literal characters in a story (e.g., "the woman," "the mother," "the hungry man") and analyze.' },
                { id: 'b', prompt: 'Compare the figure of "the hungry person returning home" (eqnkZ \'kkafr ls Hkj tkuk) with "the one whose dreams die" (gekjs liuksa dk ej tkuk).', answer: 'The hungry returnee represents material deprivation',
                  options: ['The hungry returnee represents material deprivation', 'types of poor people'],
                  hint: 'If stuck, review c11_hin_ar_cbse_15_002 (Plot and Narrative Structure) to map the poem\'s movement.',
                  misconception: 'Students often treat the poem\'s figures as literal characters in a story (e.g., "the woman," "the mother," "the hungry man") and analyze.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['If a student writes a "character sketch" of the hungry man describing his personality, take these steps: (1) Show them.', '(2) Ask: "Does the poem tell us this man\'s name, caste, village, or thoughts?', 'It only tells us what the system does TO him." (3) Have them rewrite the analysis replacing "the hungry man" with "the.', '(4) Practice with the "frog-eyed watcher": identify the structural position (surveillance subject) and the bodily.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_006', difficulty: 'standard',
          question: 'Primary theme is the central idea or underlying message that the poet conveys.',
          hint: 'Review the irony and symbolism node (c11_hin_ar_cbse_15_009) focusing on how poets.',
          misconception: 'Students often think the poem is literally about the color red or physical smallness because of the title "लाल सबसे.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet says "आंसू की गति" (tear\'s speed) and "याद की मां" (memory\'s mother) are NOT the smallest things, and what this suggests.', answer: 'The poet rejects conventional smallness (physical/minute)',
                  options: ['The poet rejects conventional smallness (physical/minute)', 'लाल सबसे छोटा'],
                  hint: 'Review the irony and symbolism node (c11_hin_ar_cbse_15_009) focusing on how poets subvert literal.',
                  misconception: 'Students often think the poem is literally about the color red or physical smallness because of the title "लाल सबसे छोटा".' },
                { id: 'b', prompt: 'Analyze how the three images in the final stanzas (the pinch on the painting, the fan in hot sand, the knife on wounds) work together to build the poem\'s.', answer: 'The pinch represents personal conscience pricked by injustice',
                  options: ['The pinch represents personal conscience pricked by injustice', 'लाल सबसे छोटा'],
                  hint: 'Review the irony and symbolism node (c11_hin_ar_cbse_15_009) focusing on how poets subvert literal.',
                  misconception: 'Students often think the poem is literally about the color red or physical smallness because of the title "लाल सबसे छोटा".' }
          ],
            remediations: { 'the-poem-is-literally-about': { steps: ['Ask the student to re-read the first stanza and circle every "नहीं" (not) to see the negation pattern.', 'Have them list the three final images (pinch, fan, knife) and write one sentence for each: what it literally is vs what.', 'Guide them to connect: the pinch = conscience, fan = endurance, knife = action.', 'Finally, ask: "If the knife is the smallest, why does it uproot the biggest thing (exploitation)?" to reveal the irony.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
