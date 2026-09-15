import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p1',
    title: 'vejdkar · Part 1/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'vejdkar · Part 1/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_001', 'c11_hin_ar_cbse_02_002', 'c11_hin_ar_cbse_02_003', 'c11_hin_ar_cbse_02_004', 'c11_hin_ar_cbse_02_005', 'c11_hin_ar_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential information about the author\'s life, literary significance, the socio-historical setting of the story, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a critically acclaimed film set in a village in 1960s Bihar.',
            decisions: [{ prompt: 'Who is Phanishwar Nath Renu and what is his primary contribution to Hindi literature?', options: [
                { text: 'Phanishwar Nath Renu (1925-2019) is a seminal Hindi writer known as the pioneer of', outcome: 'Phanishwar Nath Renu (1925-2019) is a seminal Hindi writer known as the pioneer of \'Anchalik.' },
                { text: 'him only as a poet or confusing him with Premchand', outcome: 'Not quite — Students often treat \'Context and Background\' as a list of static facts to memorize (author\'s.', reveals: 'students-often-treat-context-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a street play where a servant outwits his master without ever raising his voice—that\'s the core experience of reading "फेंकू उल्हनिहु.".',
            decisions: [{ prompt: 'Identify the inciting incident in "फेंकू उल्हनिहु" that sets the narrator\'s investigation into Phenku\'s past in motion.', options: [
                { text: 'The inciting incident is the narrator noticing Phenku\'s unusual method of making', outcome: 'The inciting incident is the narrator noticing Phenku\'s unusual method of making puris—flinging.' },
                { text: 'the narrator hiring Phenku', outcome: 'Not quite — Students treat "plot" as "what happened in chronological order" and "narrative structure".', reveals: 'students-treat-plot-as-what' },
                { text: 'the colonial officer anecdote', outcome: 'Not quite — Students treat "plot" as "what happened in chronological order" and "narrative structure".', reveals: 'students-treat-plot-as-what' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re walking through a busy Indian market at 7 PM — the fading light, the smell of street food, the sound of vendors calling out, the tired but.',
            decisions: [{ prompt: 'In "फेरीवाले उलहनी," identify two specific time markers and two specific place markers that establish the physical setting of the opening.', options: [
                { text: 'Correct answer: Time markers', outcome: 'Correct answer: Time markers — "शाम" (evening) and "अंधेरा घिरने लगा" (darkness gathering); Place.' },
                { text: 'morning', outcome: 'Not quite — Students believe "setting = where and when" and "atmosphere = mood," treating them as separate.', reveals: 'setting-where-and-when-and' },
                { text: 'inside a shop', outcome: 'Not quite — Students believe "setting = where and when" and "atmosphere = mood," treating them as separate.', reveals: 'setting-where-and-when-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet a street vendor who makes beautiful handcrafted dolls but refuses to call herself an artist, insisting she\'s just a labourer.',
            decisions: [{ prompt: 'What is the protagonist\'s primary occupation as explicitly stated in the text, and what secondary activity does she engage in to supplement.', options: [
                { text: 'Feeki Uljhan is primarily a school teacher (ukuckbZ) who supplements her income by making', outcome: 'Feeki Uljhan is primarily a school teacher (ukuckbZ) who supplements her income by making and.' },
                { text: 'she is a full-time doll-maker', outcome: 'Not quite — Students often treat Feeki Uljhan as a "symbol of the poor" or "representative of marginalised.', reveals: 'students-often-treat-feeki-uljhan' },
                { text: 'She represents the struggle of all poor women', outcome: 'Not quite — Students often treat Feeki Uljhan as a "symbol of the poor" or "representative of marginalised.', reveals: 'students-often-treat-feeki-uljhan' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Think about your favorite film — the hero never exists in isolation.',
            decisions: [{ prompt: 'List three supporting characters from \'Fe;k¡ ulh#íhu\' and state their primary narrative role in one sentence each.', options: [
                { text: 'Correct answer: (1) ckn\'kkg lyker', outcome: 'Correct answer: (1) ckn\'kkg lyker — the bureaucratic clerk who demands written identity.' },
                { text: 'what the character does', outcome: 'Not quite — Students treat supporting characters as "background information" and list their actions (he asked.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'what the character REPRESENTS', outcome: 'Not quite — Students treat supporting characters as "background information" and list their actions (he asked.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are sitting with your grandmother who never went to school but can fix any broken thing in the house—would you say she is uneducated?',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a prose narrative?', options: [
                { text: 'The primary theme is the central, unifying idea that runs through the entire narrative', outcome: 'The primary theme is the central, unifying idea that runs through the entire narrative and.' },
                { text: 'education', outcome: 'Not quite — Students often think the primary theme is "respect for elders" or "importance of education" because.', reveals: 'the-primary-theme-is-respect' },
                { text: 'respect for elders', outcome: 'Not quite — Students often think the primary theme is "respect for elders" or "importance of education" because.', reveals: 'the-primary-theme-is-respect' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'What comes next? vejdkar · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vejdkar · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'Review the concept of \'Anchalik Katha\' (Regional Fiction) and the map of linguistic.',
          misconception: 'Students often treat \'Context and Background\' as a list of static facts to memorize (author\'s birth/death dates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a preparatory section that provides',
                  options: ['"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'Review the concept of \'Anchalik Katha\' (Regional Fiction) and the map of linguistic regions.',
                  misconception: 'Students often treat \'Context and Background\' as a list of static facts to memorize (author\'s birth/death dates, awards, one-line summary.' }
          ],
            remediations: { 'students-often-treat-context-and': { steps: ['**Re-frame the task**: Ask the student: "If you removed all the Bhojpuri/Maithili words and folk references from this.', 'Why or why not?" This forces confrontation with the functional role of context.', '**Mini-research activity**: Assign a 15-minute search for "Renu Anchalik Katha features" and "Bihar 1950s land reforms".', 'Have them write three specific connections they find between the historical facts and textual details in the first two.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_002', difficulty: 'standard',
          question: 'Plot and Narrative Structure refers to the organized sequence of events (plot).',
          hint: 'Review "flashback vs. chronological order" and "first-person narrator reliability" from.',
          misconception: 'Students treat "plot" as "what happened in chronological order" and "narrative structure" as "beginning, middle, end.".',
          parts: [
                { id: 'a', prompt: 'Identify the inciting incident in "फेंकू उल्हनिहु" that sets the narrator\'s investigation into Phenku\'s past in motion.', answer: 'The inciting incident is the narrator noticing Phenku\'s unusual method of making',
                  options: ['The inciting incident is the narrator noticing Phenku\'s unusual method of making', 'the narrator hiring Phenku', 'the colonial officer anecdote'],
                  hint: 'Review "flashback vs. chronological order" and "first-person narrator reliability" from Class 10.',
                  misconception: 'Students treat "plot" as "what happened in chronological order" and "narrative structure" as "beginning, middle, end." In "फेंकू उल्हनिहु,".' }
          ],
            remediations: { 'students-treat-plot-as-what': { steps: ['If a student cannot separate chronological from narrative order: (1) Give them 5 event cards from the story; ask them.', '(2) For each displacement, ask: "What does the reader know at this narrative moment that they wouldn\'t if this came.', '(4) Practice with a 3-sentence micro-fiction: write it in narrative order, then reorder chronologically, compare.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which.',
          hint: 'If stuck, re-read the opening two pages (pages 21-22 in NCERT) marking every word that.',
          misconception: 'Students believe "setting = where and when" and "atmosphere = mood," treating them as separate labels to identify.',
          parts: [
                { id: 'a', prompt: 'In "फेरीवाले उलहनी," identify two specific time markers and two specific place markers that establish the physical setting of the opening scene.', answer: 'Correct answer: Time markers',
                  options: ['Correct answer: Time markers', 'morning', 'inside a shop', 'setting = where and when'],
                  hint: 'If stuck, re-read the opening two pages (pages 21-22 in NCERT) marking every word that appeals.',
                  misconception: 'Students believe "setting = where and when" and "atmosphere = mood," treating them as separate labels to identify rather than.' }
          ],
            remediations: { 'setting-where-and-when-and': { steps: ['If the student cannot move beyond labeling, do this 3-step remediation: (1) Give them a 50-word setting description.', '(2) Have them physically act out the tea stall scene: one student stands (लखपत), one sits on floor (उलहनी), one leans.', '(3) Assign a micro-writing task: rewrite the opening paragraph changing ONLY the time to noon — what sensory details.', 'What atmospheric effect is lost?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "setting = where and when" and "atmosphere = mood," treating them as separate labels to identify.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The evening setting in \'फेरीवाले उलहनी\' is merely a temporal backdrop; the story would work equally well at noon." Defend your judgment.', answer: 'Correct answer: The claim is false',
                  options: ['Correct answer: The claim is false', 'setting = where and when', 'atmosphere = mood'],
                  hint: 'If stuck, re-read the opening two pages (pages 21-22 in NCERT) marking every word that appeals.',
                  misconception: 'Students believe "setting = where and when" and "atmosphere = mood," treating them as separate labels to identify rather than.' }
          ],
            remediations: { 'setting-where-and-when-and': { steps: ['If the student cannot move beyond labeling, do this 3-step remediation: (1) Give them a 50-word setting description.', '(2) Have them physically act out the tea stall scene: one student stands (लखपत), one sits on floor (उलहनी), one leans.', '(3) Assign a micro-writing task: rewrite the opening paragraph changing ONLY the time to noon — what sensory details.', 'What atmospheric effect is lost?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If stuck, review the "Text: Plot and Narrative Structure" node (c11_hin_ar_cbse_02_002).',
          misconception: 'Students often treat Feeki Uljhan as a "symbol of the poor" or "representative of marginalised women" rather than.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Feeki Uljhan reacts sharply when the narrator calls her "ukuckbZ" (teacher) after she has identified herself as a doll-maker.', answer: 'She rejects the label "teacher"',
                  options: ['She rejects the label "teacher"', 'she is humble', 'she doesn\'t like teaching', 'She represents the struggle of all poor women'],
                  hint: 'If stuck, review the "Text: Plot and Narrative Structure" node (c11_hin_ar_cbse_02_002) and create.',
                  misconception: 'Students often treat Feeki Uljhan as a "symbol of the poor" or "representative of marginalised women" rather than a specific individual.' }
          ],
            remediations: { 'students-often-treat-feeki-uljhan': { steps: ['Have the student list 5 things Feeki Uljhan says that NO other character says (e.g., the poem, the clerk-name.', 'For each, ask: "Could a different poor woman say this?', 'Force them to rewrite one generic sentence ("She represents...") into a specific claim using one unique quote.', 'Verify they use "Feeki Uljhan" not "the protagonist" or "she" in the first three sentences of their next answer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures.',
          hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
          misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made.',
          parts: [
                { id: 'a', prompt: 'List three supporting characters from \'Fe;k¡ ulh#íhu\' and state their primary narrative role in one sentence each.', answer: 'Correct answer: (1) ckn\'kkg lyker',
                  options: ['Correct answer: (1) ckn\'kkg lyker', 'what the character does', 'what the character REPRESENTS', 'ge Hkêòh cukuk u lh[krs'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' },
                { id: 'b', prompt: 'Explain how the clerk (ckn\'kkg lyker) and the woman (flj fgykuk) differently represent the modern bureaucratic world\'s challenge to the tailor\'s oral identity.', answer: 'Correct answer: The clerk represents institutional power',
                  options: ['Correct answer: The clerk represents institutional power', 'villains', 'what the character does', 'what the character REPRESENTS'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' },
                { id: 'c', prompt: 'The journalist (v[kckjuohl) asks the tailor for a "new angle" (ubZ ph"k) on his life.', answer: 'Correct answer: The tailor would reject being made into a "story" or "angle"',
                  options: ['Correct answer: The tailor would reject being made into a "story" or "angle"', 'what the character does', 'what the character REPRESENTS', 'ge Hkêòh cukuk u lh[krs'],
                  hint: 'Review the protagonist\'s three defining scenes: the name-giving episode (refusing clerk\'s.',
                  misconception: 'Students treat supporting characters as "background information" and list their actions (he asked for name, she made tea, he wrote report).' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student lists actions without analysis: (1) Pick ONE supporting character — say, the clerk.', '(2) Find TWO specific dialogues he speaks.', '(3) Ask: "What does this REVEAL about the tailor OR about the society the tailor lives in?" (4) Write one sentence.', 'Do not proceed until each character has a "mirror statement" backed by a quote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea that the.',
          hint: 'Review the difference between subject and theme using a familiar fable (e.g., "The.',
          misconception: 'Students often think the primary theme is "respect for elders" or "importance of education" because these are familiar.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of \'theme vs. subject\' to this story: state the subject and then the primary theme in one sentence each.', answer: 'Subject: The encounter between a literate teacher and an illiterate potter',
                  options: ['Subject: The encounter between a literate teacher and an illiterate potter', 'We should respect elders', 'respect for elders', 'importance of education'],
                  hint: 'Review the difference between subject and theme using a familiar fable (e.g., "The Tortoise and the.',
                  misconception: 'Students often think the primary theme is "respect for elders" or "importance of education" because these are familiar moral lessons.' },
                { id: 'b', prompt: 'Analyze how the author uses the recurring motif of \'hands\' (Phool Ulaghu\'s clay-stained hands vs. the teacher\'s pen-holding hands) to develop the primary theme.', answer: 'The clay-stained hands symbolize practical, embodied knowledge',
                  options: ['The clay-stained hands symbolize practical, embodied knowledge', 'respect for elders', 'importance of education'],
                  hint: 'Review the difference between subject and theme using a familiar fable (e.g., "The Tortoise and the.',
                  misconception: 'Students often think the primary theme is "respect for elders" or "importance of education" because these are familiar moral lessons.' }
          ],
            remediations: { 'the-primary-theme-is-respect': { steps: ['If a student states a generic moral, ask them to list three moments where the teacher learns something from Phool.', 'Then have them write a one-sentence theme that includes both directions of learning.', 'Finally, have them compare their sentence with the definition of primary theme to see if it captures the central.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
