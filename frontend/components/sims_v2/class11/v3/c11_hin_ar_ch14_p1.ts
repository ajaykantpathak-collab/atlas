import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p1',
    title: 'ckck lkgsc Hkhejko · Part 1/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'ckck lkgsc Hkhejko · Part 1/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_001', 'c11_hin_ar_cbse_14_002', 'c11_hin_ar_cbse_14_003', 'c11_hin_ar_cbse_14_004', 'c11_hin_ar_cbse_14_005', 'c11_hin_ar_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and literary framework needed to interpret the poems of Vaddhegnasoh (वद्देग्नसोह), a pioneering.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you find a locked diary in your grandmother\'s attic—written in a dialect you barely understand, by a woman who risked everything to write it.',
            decisions: [{ prompt: 'Who was Vaddhegnasoh, and what is her distinctive place in the history of Hindi literature?', options: [
                { text: 'Vaddhegnasoh (born 12th Phalgun, village Mqrjh) was a Chhayavad-era poetess who wrote in', outcome: 'Vaddhegnasoh (born 12th Phalgun, village Mqrjh) was a Chhayavad-era poetess who wrote in Braj.' },
                { text: 'her as a Khari Boli poet or placing her in the Bhakti period', outcome: 'Not quite — Students often treat "context and background" as a list of dates and names to memorize for a 1-mark.', reveals: 'students-often-treat-context-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are describing a viral Instagram reel to a friend who hasn\'t seen it: you don\'t just list random clips; you set the scene, build tension, hit the.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in the first poem (स्टैनज़ा 1 और 2) of this chapter, and who is the implied speaker?', options: [
                { text: 'The first poem uses a third-person omniscient perspective initially, shifting to a', outcome: 'The first poem uses a third-person omniscient perspective initially, shifting to a collective voice.' },
                { text: 'first-person poet', outcome: 'Not quite — Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1.', reveals: 'students-treat-the-two-poems' },
                { text: 'Vadde Kanshi herself', outcome: 'Not quite — Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1.', reveals: 'students-treat-the-two-poems' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into your दादी\'s garden at 5:30 AM — you hear koels, smell wet earth, see dew on marigolds. That sensory snapshot is the *setting*.',
            decisions: [{ prompt: 'Define "setting" and "atmosphere" in poetry. How are they different from each other?', options: [
                { text: 'Setting is the time, place, and physical environment created through sensory details', outcome: 'Setting is the time, place, and physical environment created through sensory details (e.g., "a.' },
                { text: 'setting is the mood', outcome: 'Not quite — Students treat setting and atmosphere as synonyms, writing "the setting is sad" instead of "the.', reveals: 'students-treat-setting-and-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are listening to an Adivasi elder narrate her life through poetry.',
            decisions: [{ prompt: 'What is the primary voice or persona speaking in the two poems of Chapter 14?', options: [
                { text: 'The primary voice is that of the poet Vadda Gnosoh herself, speaking as an Adivasi woman', outcome: 'The primary voice is that of the poet Vadda Gnosoh herself, speaking as an Adivasi woman and.' },
                { text: 'Bafnaza', outcome: 'Not quite — Students often think "character analysis" in poetry means describing a character mentioned in the.', reveals: 'character-analysis-in-poetry-means' },
                { text: 'character analysis', outcome: 'Not quite — Students often think "character analysis" in poetry means describing a character mentioned in the.', reveals: 'character-analysis-in-poetry-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are listening to a friend pour out their heart to a silent listener – that listener shapes the conversation without speaking a word.',
            decisions: [{ prompt: 'In Vaddegnasoh\'s second poem, who is the "बज़ोज" addressed by the speaker, and what single word in the poem indicates the speaker\'s.', options: [
                { text: 'The "बज़ोज" is the addressee, a symbolic figure (likely a bird or messenger) to whom the', outcome: 'The "बज़ोज" is the addressee, a symbolic figure (likely a bird or messenger) to whom the speaker.' },
                { text: 'and the addressed', outcome: 'Not quite — Students often think "supporting characters" in poetry must be human figures who speak or act.', reveals: 'supporting-characters-in-poetry-must' },
                { text: 'in lyric poetry', outcome: 'Not quite — Students often think "supporting characters" in poetry must be human figures who speak or act.', reveals: 'supporting-characters-in-poetry-must' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re reading a newspaper report about a young woman in a village who refuses an arranged marriage and faces backlash — what\'s the core issue?',
            decisions: [{ prompt: 'What is the primary theme that unifies both poems in "vDd osQ opu"?', options: [
                { text: 'The primary theme is the systemic oppression of women under feudal patriarchy and their', outcome: 'The primary theme is the systemic oppression of women under feudal patriarchy and their struggle.' },
                { text: 'nature', outcome: 'Not quite — Students often confuse "theme" with "plot summary" or "moral lesson." They write: "The theme.', reveals: 'students-often-confuse-theme-with' },
                { text: 'moral lesson', outcome: 'Not quite — Students often confuse "theme" with "plot summary" or "moral lesson." They write: "The theme.', reveals: 'students-often-confuse-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'What comes next? ckck lkgsc Hkhejko · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — ckck lkgsc Hkhejko · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'If stuck, review Class 10 Hindi chapter on "Chhayavad ki visheshtayein" and the Braj vs.',
          misconception: 'Students often treat "context and background" as a list of dates and names to memorize for a 1-mark question.',
          parts: [
                { id: 'a', prompt: 'Explain why Vaddhegnasoh\'s choice to write in Braj Bhasha rather than Khari Boli was a deliberate literary and political decision in the 1920s–30s.', answer: 'Writing in Braj Bhasha allowed her to reach rural women directly, bypassing the',
                  options: ['Writing in Braj Bhasha allowed her to reach rural women directly, bypassing the', 'Braj was the only language she knew'],
                  hint: 'If stuck, review Class 10 Hindi chapter on "Chhayavad ki visheshtayein" and the Braj vs.',
                  misconception: 'Students often treat "context and background" as a list of dates and names to memorize for a 1-mark question.' }
          ],
            remediations: { 'students-often-treat-context-and': { steps: ['If the student cannot link biography to textual evidence: (1) Have them re-read the textbook\'s biographical paragraph.', '(2) Ask: "Which of these actions appears symbolically in Poem 2?" (3) Guide them to map: wrote → poem exists.', '(4) Require them to write one sentence connecting each action to a specific image in the poems.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the organized sequence.',
          hint: 'If stuck, review the "Story vs Plot" distinction using a familiar Bollywood movie: the.',
          misconception: 'Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1 establishes the *systemic*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in poetry refers to the organized sequence of events,',
                  options: ['Plot and narrative structure in poetry refers to the organized sequence of events,', '"Before You Read: Context and Background" provides the essential historical,', 'Setting in poetry refers to the time, place, and physical environment constructed through', 'Character analysis of the protagonist involves examining the speaker\'s persona, traits,'],
                  hint: 'If stuck, review the "Story vs Plot" distinction using a familiar Bollywood movie: the *story*.',
                  misconception: 'Students treat the two poems as isolated "stories" and miss that they form a diptych: Poem 1 establishes the *systemic* narrative (class.' }
          ],
            remediations: { 'students-treat-the-two-poems': { steps: ['Have the student draw a two-column timeline: left column for Poem 1 (events: historical oppression → king\'s betrayal →.', 'Ask: "Which events are shown *happening now* vs *reported as past*?" 3.', 'Color-code: red for present action, blue for backstory.', 'Finally, ask: "If you swapped the stanza order in Poem 1, how would the narrative impact change?" This forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and physical environment.',
          hint: 'Review "sensory imagery identification" from Class 10 poetry (e.g., "Megh Aaye".',
          misconception: 'Students treat setting and atmosphere as synonyms, writing "the setting is sad" instead of "the setting is a dawn.',
          parts: [
                { id: 'a', prompt: 'Compare the atmosphere in Stanza 1 versus Stanza 2. How does the shift from observation ("gs Hkw[k!") to direct address ("gs esjs twघ osQ iwQy tसलस बज़ोज").', answer: 'Stanza 1: expansive, impersonal, harmonious',
                  options: ['Stanza 1: expansive, impersonal, harmonious', 'both are peaceful', 'फकज तक़ा उहपस', 'मलस >इवड़ज नहु यस एम>लस'],
                  hint: 'Review "sensory imagery identification" from Class 10 poetry (e.g., "Megh Aaye" or "Sandhya.',
                  misconception: 'Students treat setting and atmosphere as synonyms, writing "the setting is sad" instead of "the setting is a dawn garden; the atmosphere.' }
          ],
            remediations: { 'students-treat-setting-and-atmosphere': { steps: ['**Two-column drill**: Draw a T-chart.', 'Left: "Setting Details from Text" (quote phrases: "बज़ोज", "फकज", "त्यक", "मफ़की इक़फकी").', 'Right: "Atmosphere Created" (name the feeling: vitality, intimacy, anxiety, tenderness).', '**Setting swap**: Take the same garden images but rewrite Stanza 1 at midnight — how does the atmosphere change?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat setting and atmosphere as synonyms, writing "the setting is sad" instead of "the setting is a dawn.',
          parts: [
                { id: 'a', prompt: 'A classmate argues: "The poem\'s atmosphere is primarily melancholic because it\'s about an old woman." Defend or challenge this using evidence from both stanzas.', answer: 'Challenge',
                  options: ['Challenge', 'biographical fallacy'],
                  hint: 'Review "sensory imagery identification" from Class 10 poetry (e.g., "Megh Aaye" or "Sandhya.',
                  misconception: 'Students treat setting and atmosphere as synonyms, writing "the setting is sad" instead of "the setting is a dawn garden; the atmosphere.' }
          ],
            remediations: { 'students-treat-setting-and-atmosphere': { steps: ['**Two-column drill**: Draw a T-chart.', 'Left: "Setting Details from Text" (quote phrases: "बज़ोज", "फकज", "त्यक", "मफ़की इक़फकी").', 'Right: "Atmosphere Created" (name the feeling: vitality, intimacy, anxiety, tenderness).', '**Setting swap**: Take the same garden images but rewrite Stanza 1 at midnight — how does the atmosphere change?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the speaker\'s persona.',
          hint: 'Review "poetic persona" and "first-person narrative" from Class 10 poetry chapters (e.g.',
          misconception: 'Students often think "character analysis" in poetry means describing a character mentioned in the poem (like Bafnaza.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "poetic persona" to identify two contrasting tones in the first poem (e.g., the description of Bafnaza) and the second poem (the.', answer: 'First poem: tone of anguish/outrage at oppression ("बाफ़नज़ा पर लगाम का लगाना',
                  options: ['First poem: tone of anguish/outrage at oppression ("बाफ़नज़ा पर लगाम का लगाना', 'character analysis'],
                  hint: 'Review "poetic persona" and "first-person narrative" from Class 10 poetry chapters (e.g., "Megh.',
                  misconception: 'Students often think "character analysis" in poetry means describing a character mentioned in the poem (like Bafnaza or Phako) rather than.' }
          ],
            remediations: { 'character-analysis-in-poetry-means': { steps: ['If a student makes this error, first ask: "Who is speaking these lines?" Have them highlight all first-person pronouns.', 'Then ask: "What does the speaker reveal about herself through her reactions to Bafnaza and her house?" Guide them.', 'Finally, have them rewrite a paragraph focusing on the speaker.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in poetry involves examining the.',
          hint: 'Review the dramatic monologue structure in node 002 and the protagonist\'s profile in node.',
          misconception: 'Students often think "supporting characters" in poetry must be human figures who speak or act visibly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters in poetry involves examining the roles,',
                  options: ['Character analysis of supporting characters in poetry involves examining the roles,', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and physical environment constructed through'],
                  hint: 'Review the dramatic monologue structure in node 002 and the protagonist\'s profile in node 004; then.',
                  misconception: 'Students often think "supporting characters" in poetry must be human figures who speak or act visibly.' }
          ],
            remediations: { 'supporting-characters-in-poetry-must': { steps: ['If a student cannot identify non-human/off-stage supporting characters, guide them through three steps: (1) List every.', '(2) For each, ask: "Does this entity affect the speaker\'s choices or emotions?" (3) Classify each as addressee.', 'Use the biographical note to confirm the father\'s role.', 'Then have them write one sentence per entity explaining its function.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_006', difficulty: 'standard',
          question: 'Primary theme is the central, unifying idea that the author explores throughout.',
          hint: 'Review the chapter introduction (node 001) for the Progressive Writers\' Movement context.',
          misconception: 'Students often confuse "theme" with "plot summary" or "moral lesson." They write: "The theme is that a woman was killed.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the image of "chains" (*zanjir*) functions differently in the two poems while serving the same theme.', answer: 'In Poem 1, chains represent institutionalized feudal oppression',
                  options: ['In Poem 1, chains represent institutionalized feudal oppression', 'moral lesson', 'The theme is that a woman was killed by a king', 'Women should be brave'],
                  hint: 'Review the chapter introduction (node 001) for the Progressive Writers\' Movement context and the.',
                  misconception: 'Students often confuse "theme" with "plot summary" or "moral lesson." They write: "The theme is that a woman was killed by a king" (plot).' },
                { id: 'b', prompt: 'Given a new stanza: "The courtyard gate stays locked / The keys hang on the master\'s belt / She counts the cracks in the wall / Waiting for monsoon to weaken.', answer: 'This continues Poem 2\'s approach (the *bZ\'oj*\'s perspective)',
                  options: ['This continues Poem 2\'s approach (the *bZ\'oj*\'s perspective)', 'moral lesson', 'The theme is that a woman was killed by a king', 'Women should be brave'],
                  hint: 'Review the chapter introduction (node 001) for the Progressive Writers\' Movement context and the.',
                  misconception: 'Students often confuse "theme" with "plot summary" or "moral lesson." They write: "The theme is that a woman was killed by a king" (plot).' },
                { id: 'c', prompt: 'Compare how the two poems portray the source of women\'s oppression. Does the author locate it in individual villains or systemic structures?', answer: 'The author locates oppression in systemic structures',
                  options: ['The author locates oppression in systemic structures', 'moral lesson', 'The theme is that a woman was killed by a king', 'Women should be brave'],
                  hint: 'Review the chapter introduction (node 001) for the Progressive Writers\' Movement context and the.',
                  misconception: 'Students often confuse "theme" with "plot summary" or "moral lesson." They write: "The theme is that a woman was killed by a king" (plot).' }
          ],
            remediations: { 'students-often-confuse-theme-with': { steps: ['Ask student to list 5 repeated words/images across both poems (e.g., *zanjir, qaid, azadi, mahal, deewar*).', 'For each, ask: "What does this represent in the real world the poet critiques?"', 'Have them complete the sentence: "The poet argues that women\'s unfreedom is caused by _______ and the solution requires.', 'Compare their answer to the Progressive Writers\' Manifesto summary in the chapter introduction (node 001) — does.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
