import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p1',
    title: 'Q.kh\'oj ukFk js.kq · Part 1/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'Q.kh\'oj ukFk js.kq · Part 1/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_001', 'c11_hin_ar_cbse_12_002', 'c11_hin_ar_cbse_12_003', 'c11_hin_ar_cbse_12_004', 'c11_hin_ar_cbse_12_005', 'c11_hin_ar_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides the historical, biographical, and literary framework necessary to access a text\'s deeper meanings.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you meet an elderly neighbour who never went to school but now wants to learn to read her own letters—what emotions would that stir?',
            decisions: [{ prompt: 'Who is the poet of "पैक दकस दकस वपन्ज उघा फूग्रह" and what is his actual name as per the textbook\'s introductory note?', options: [
                { text: 'The poet is Falguni Prasad (pen name: Agyeya), whose real name is given as Sachchidananda', outcome: 'The poet is Falguni Prasad (pen name: Agyeya), whose real name is given as Sachchidananda Hirananda.' },
                { text: 'Context and Background', outcome: 'Not quite — Students often think "Context and Background" means memorizing the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' },
                { text: 'a *Chhayavad* poet like Nirala or Pant', outcome: 'Not quite — Students often think "Context and Background" means memorizing the poet\'s birth/death dates and.', reveals: 'context-and-background-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re waiting for an important WhatsApp message from a friend — that anticipation, the notification sound, the relief or anxiety when you read it.',
            decisions: [{ prompt: 'Who is the primary speaker in the opening stanza of the poem, and what specific action announces their arrival?', options: [
                { text: 'The primary speaker is the postman (पैक/डाकिया), announced by the repeated call "डाकिया', outcome: 'The primary speaker is the postman (पैक/डाकिया), announced by the repeated call "डाकिया डाकिया" and.' },
                { text: 'the poet', outcome: 'Not quite — Students treat this poem as a *lyric* (expressing feeling) rather than a *narrative* (telling.', reveals: 'students-treat-this-poem-as' },
                { text: 'a villager', outcome: 'Not quite — Students treat this poem as a *lyric* (expressing feeling) rather than a *narrative* (telling.', reveals: 'students-treat-this-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are walking through your village at dusk — the papaya leaves rustle, a dim lantern flickers at a neighbour\'s door, and the postman\'s footsteps.',
            decisions: [{ prompt: 'Identify the three primary physical settings explicitly named in the poem and the time of day when the opening stanza occurs.', options: [
                { text: 'The three primary physical settings are the village lane (implied by the postman\'s', outcome: 'The three primary physical settings are the village lane (implied by the postman\'s arrival), the.' },
                { text: 'post office', outcome: 'Not quite — Students conflate *setting* (the where/when) with *atmosphere* (the feeling), writing "the setting.', reveals: 'students-conflate-setting-the-where' },
                { text: 'house interior', outcome: 'Not quite — Students conflate *setting* (the where/when) with *atmosphere* (the feeling), writing "the setting.', reveals: 'students-conflate-setting-the-where' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you receive a letter but cannot read it — you must trust a stranger to tell you its contents, not knowing if they speak truth.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "paik dark dark" (पाइक डार्क डार्क) used in the poem\'s opening, and what does it suggest about.', options: [
                { text: 'The phrase literally describes the messenger as "dark, dark"', outcome: 'The phrase literally describes the messenger as "dark, dark" — referring to his sun-burnt.' },
                { text: 'it means he is evil', outcome: 'Not quite — Students often treat the paik as a passive symbol of "illiterate India" rather than an active.', reveals: 'students-often-treat-the-paik' },
                { text: 'it describes his clothes', outcome: 'Not quite — Students often treat the paik as a passive symbol of "illiterate India" rather than an active.', reveals: 'students-often-treat-the-paik' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are a Class 11 student sitting in a Hindi exam, staring at the poem "Paik Dys Dys..." and the question: "What is the main theme of this poem?" You.',
            decisions: [{ prompt: 'What is the literal meaning of the child\'s opening line "डकस डकस वपन्ज उघा फुघरह" (Dark dark letters don\'t catch/hold)?', options: [
                { text: 'The child expresses that the written letters appear dark, indistinct, and impossible to', outcome: 'The child expresses that the written letters appear dark, indistinct, and impossible to grasp.' },
                { text: 'The child hates books', outcome: 'Not quite — Students frequently mistake the *plot* (a child refuses to study) for the *theme* (the collision.', reveals: 'students-frequently-mistake-the-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'What comes next? Q.kh\'oj ukFk js.kq · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Q.kh\'oj ukFk js.kq · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading pedagogical step.',
          hint: 'Review Class 10 Hindi textbook\'s "Hindi Sahitya Ka Itihas" summary table and Class 10.',
          misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and award list for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides',
                  options: ['"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'Review Class 10 Hindi textbook\'s "Hindi Sahitya Ka Itihas" summary table and Class 10 History.',
                  misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and award list for a 1-mark question.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student recites facts but cannot connect them to the poem, do this: 1) Give them two lines from the poem (e.g.', '2) Have them compare a *Chhayavad* poem\'s Sanskritized diction with this poem\'s first stanza.', '3) Ask: "If the poet wasn\'t a linguist, would Paik speak differently?" Force the link between creator\'s identity and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and award list for a 1-mark.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The poet\'s revolutionary past (jail terms, *Azad Hind Fauj* association) makes this poem a propaganda piece for government literacy.', answer: 'The claim is false',
                  options: ['The claim is false', 'Context and Background'],
                  hint: 'Review Class 10 Hindi textbook\'s "Hindi Sahitya Ka Itihas" summary table and Class 10 History.',
                  misconception: 'Students often think "Context and Background" means memorizing the poet\'s birth/death dates and award list for a 1-mark question.' }
          ],
            remediations: { 'context-and-background-means-memorizing': { steps: ['If a student recites facts but cannot connect them to the poem, do this: 1) Give them two lines from the poem (e.g.', '2) Have them compare a *Chhayavad* poem\'s Sanskritized diction with this poem\'s first stanza.', '3) Ask: "If the poet wasn\'t a linguist, would Paik speak differently?" Force the link between creator\'s identity and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a narrative poem refers to the organized.',
          hint: 'Review "कथानक के सोपान" (narrative stages) from Class 10 Hindi textbook Chapter "पद".',
          misconception: 'Students treat this poem as a *lyric* (expressing feeling) rather than a *narrative* (telling a story with characters.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in a narrative poem refers to the organized sequence of',
                  options: ['Plot and narrative structure in a narrative poem refers to the organized sequence of', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'Review "कथानक के सोपान" (narrative stages) from Class 10 Hindi textbook Chapter "पद" or "दोहे".',
                  misconception: 'Students treat this poem as a *lyric* (expressing feeling) rather than a *narrative* (telling a story with characters, conflict, sequence).' }
          ],
            remediations: { 'students-treat-this-poem-as': { steps: ['**Re-read aloud with speaker labels**: Print the poem, write "डाकिया" and "ग्रामीण" in margins at every voice change.', '**Storyboard it**: Draw 6 boxes — one per narrative stage — sketch the action (stick figures fine), write one Hindi.', '**Identify the "turn"**: Find the exact line where power shifts (postman\'s "पढ़ ले!" in Stanza 6).', '**Explain to a peer**: Teach the narrative arc to someone who hasn\'t read it — teaching forces structural clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_003', difficulty: 'standard',
          question: 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional.',
          hint: 'Review the poem\'s first two stanzas with a highlighter: mark every noun/adjective that.',
          misconception: 'Students conflate *setting* (the where/when) with *atmosphere* (the feeling), writing "the setting is scary" instead.',
          parts: [
                { id: 'a', prompt: 'Compare the atmosphere created by the papaya leaves ("पपी के पत्ते / खड़खड़ाते") with the atmosphere created by the letter ("चिी") in the same spatial setting.', answer: 'The papaya leaves produce a natural, indifferent rustle (खड़खड़ाते)',
                  options: ['The papaya leaves produce a natural, indifferent rustle (खड़खड़ाते)', 'peaceful'],
                  hint: 'Review the poem\'s first two stanzas with a highlighter: mark every noun/adjective that answers.',
                  misconception: 'Students conflate *setting* (the where/when) with *atmosphere* (the feeling), writing "the setting is scary" instead of "the dusk setting.' }
          ],
            remediations: { 'students-conflate-setting-the-where': { steps: ['Have the student reread stanza 1 aloud, circling every word that appeals to a sense (sight: डकस, sound: पकिपकी, touch.', 'For each circled word, ask: "If this word were deleted, how would the *feeling* change?" — this forces the.', 'Give a two-column template: Column A = Setting Detail (quote), Column B = Atmosphere Effect (one-word mood.', 'Model one row together (डकस डकस → oppressive/inescapable because reduplication mimics spreading darkness), then have.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'Review "Dialogue Poem Structure" from c11_hin_ar_cbse_12_002 — identify who speaks each.',
          misconception: 'Students often treat the paik as a passive symbol of "illiterate India" rather than an active character with agency.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "paik dark dark" (पाइक डार्क डार्क) used in the poem\'s opening, and what does it suggest about the protagonist\'s.', answer: 'The phrase literally describes the messenger as "dark, dark"',
                  options: ['The phrase literally describes the messenger as "dark, dark"', 'it means he is evil', 'it describes his clothes'],
                  hint: 'Review "Dialogue Poem Structure" from c11_hin_ar_cbse_12_002 — identify who speaks each stanza.',
                  misconception: 'Students often treat the paik as a passive symbol of "illiterate India" rather than an active character with agency.' },
                { id: 'b', prompt: 'Compare the paik\'s attitude toward learning at the beginning and end of the poem.', answer: 'Initially he rejects learning as useless ("What will I do with reading?")',
                  options: ['Initially he rejects learning as useless ("What will I do with reading?")', 'daughter'],
                  hint: 'Review "Dialogue Poem Structure" from c11_hin_ar_cbse_12_002 — identify who speaks each stanza.',
                  misconception: 'Students often treat the paik as a passive symbol of "illiterate India" rather than an active character with agency.' }
          ],
            remediations: { 'students-often-treat-the-paik': { steps: ['Re-read the poem marking *only* the paik\'s spoken lines in one colour, the poet\'s in another.', 'Count how many lines the paik speaks versus the poet — notice the paik dominates the second half.', 'Ask: "Who makes the final decision?" The answer is in the paik\'s last speech.', 'Rewrite one paragraph replacing "the poet teaches him" with "the paik chooses to learn" and see how the meaning shifts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'Review "Character Analysis: Protagonist" (c11_hin_ar_cbse_12_004) focusing on the.',
          misconception: 'Students often treat supporting characters as "minor" and therefore less important for exams, writing one-line.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining how secondary figures in a',
                  options: ['Character analysis of supporting characters involves examining how secondary figures in a', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_hin_ar_cbse_12_004) focusing on the narrator\'s.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore less important for exams, writing one-line descriptions like "the maid.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student reduces the maid to "illiterate servant," do this 3-step remediation: (1) Have them read aloud only the.', '(2) Ask: "Which character changes the other\'s mind?" Trace how the narrator shifts from "डयड्कस इज टज फजस" to accepting.', '(3) Assign a 3-sentence rewrite: "The maid teaches the narrator that literacy is ____, not ____." This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_006', difficulty: 'standard',
          question: 'The primary theme of a poem is the central, unifying idea that the poet.',
          hint: 'Review the "Character Analysis: Protagonist" (node c11_hin_ar_cbse_12_004) and "Character.',
          misconception: 'Students frequently mistake the *plot* (a child refuses to study) for the *theme* (the collision of oral rural.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the child says "मैं तो नहीं पढ़ूँगा" (I will not read) even after the poet explains the benefits of literacy.', answer: 'The child rejects literacy',
                  options: ['The child rejects literacy', 'He is lazy/stubborn'],
                  hint: 'Review the "Character Analysis: Protagonist" (node c11_hin_ar_cbse_12_004) and "Character Analysis.',
                  misconception: 'Students frequently mistake the *plot* (a child refuses to study) for the *theme* (the collision of oral rural epistemology with imposed.' }
          ],
            remediations: { 'students-frequently-mistake-the-plot': { steps: ['If a student states the theme as a plot summary: (1) Ask them to list three *abstract nouns* the poem evokes (e.g.', '(2) Have them draw a two-column table: "Child\'s World" vs.', '"City\'s World" using only words from the poem.', '(3) Guide them to write one sentence connecting the columns with a verb like "clashes," "resists," or "negotiates." (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
