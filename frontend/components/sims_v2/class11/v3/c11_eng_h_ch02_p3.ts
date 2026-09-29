import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch02_p3: SimDef = {
    id: 'v3_c11_eng_h_ch02_p3',
    title: 'We\'re Not Afraid to Die · Part 3/3',
    subtitle: 'Find the real climax of a survival story — and why the bravest line comes after it.',
    classLevel: 11, subject: 'eng_h', topic: 'We\'re Not Afraid to Die · Part 3/3',
    chapters: ['c11_eng_h_ch02'],
    nodeIds: ['c11_eng_h_cbse_02_013', 'c11_eng_h_cbse_02_014', 'c11_eng_h_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a narrator reconstructing a voyage that nearly killed everyone', intro: 'A businessman\'s family sets out to retrace Captain Cook\'s wake — and the Southern Ocean takes the dare.', goal: 'Analyse the narrative structure of a survival account and place its true climax.' },
    discovery: {
        question: 'Fifteen hours of pumping and repairs fill most of the survival account — so is that the climax?',
        options: ['No — the climax is the single moment the wave strikes; the pumping is falling action after the peak', 'Yes — the longest, most dangerous stretch is always the climax', 'No — the climax is reaching the island safely', 'Yes — duration and effort define dramatic peak'],
        answer: 'No — the climax is the single moment the wave strikes; the pumping is falling action after the peak',
        hook: 'Duration isn\'t intensity — the climax is the instant death became possible, not the long labour of surviving it.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'We\'re Not Afraid to Die\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_02_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the three sections onto the five dramatic stages, then explain why the children\'s courage is saved for the falling action.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'We\'re Not Afraid to Die\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define "critical interpretation" in the context of literary analysis and distinguish it from "personal opinion."', options: [
                { text: 'Critical interpretation is an evidence-based analysis that examines how a text\'s', outcome: 'Critical interpretation is an evidence-based analysis that examines how a text\'s structure.' },
                { text: 'It\'s just what I feel about the story', outcome: 'Not quite — Students often believe critical interpretation means finding "hidden meanings" the author secretly.', reveals: 'critical-interpretation-means-finding-hidden' },
                { text: 'hidden meanings', outcome: 'Not quite — Students often believe critical interpretation means finding "hidden meanings" the author secretly.', reveals: 'critical-interpretation-means-finding-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'We\'re Not Afraid to Die\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What are the five mandatory conventions of a diary entry format in CBSE Class 11 English?', options: [
                { text: 'The five mandatory conventions are: (1) Date, Day, Time at top left, (2) Salutation', outcome: 'The five mandatory conventions are: (1) Date, Day, Time at top left, (2) Salutation (e.g., "Dear.' },
                { text: 'subject line', outcome: 'Not quite — Students treat literature-based writing tasks as *plot summary* exercises.', reveals: 'students-treat-literature-based-writing' },
                { text: 'formal address', outcome: 'Not quite — Students treat literature-based writing tasks as *plot summary* exercises.', reveals: 'students-treat-literature-based-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'We\'re Not Afraid to Die\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of using textual evidence in a literary discussion about "We\'re Not Afraid to Die"?', options: [
                { text: 'The primary purpose is to ground interpretations in the author\'s actual words so that', outcome: 'The primary purpose is to ground interpretations in the author\'s actual words so that claims about.' },
                { text: 'to show the teacher you read the book', outcome: 'Not quite — Students believe a "good discussion" means speaking often, agreeing with the teacher\'s expected.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means speaking often, agreeing with the teacher\'s expected.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school magazine you\'re editing a survival narrative: an amateur sailor\'s family attempts a round-the-world voyage in 1976, departing Plymouth in July. A junior editor asks why the piece opens with Captain Cook\'s 1768 expedition and suggests cutting the \'history trivia\' to get to the storm faster.',
            decisions: [{ prompt: 'Keep or cut the Cook reference?', options: [
                { text: 'Keep it — it\'s the thematic frame, not trivia: the family deliberately set out \'in the wake\' of Cook\'s first voyage, matching the departure point and month roughly two centuries on. That parallel poses the story\'s real question — can modern amateurs with modern technology survive the same seas that tested 18th-century seamanship?', outcome: 'Without the Cook frame the opening reads as biography; with it, the whole ordeal becomes a structured test across 200 years.' },
                { text: 'Cut it — background paragraphs are decoration; readers only care about the wave.', outcome: 'Stripping the frame loses the story\'s wager: technology and amateur skill against a route that defeated professionals — the tension that makes the survival meaningful.', reveals: 'context-is-decoration' },
                { text: 'Keep it but describe the voyage as a professional Navy expedition — sailors don\'t take families.', outcome: 'That erases the stakes: they were a businessman-narrator and family, deliberately honing amateur skills to replicate a professional\'s route — amateurism is the point.', reveals: 'narrator-was-a-professional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'Placing \'we aren\'t afraid of dying if we can all be together\' after the wave turns a disaster log into a testament to family unity.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_013', difficulty: 'standard',
          question: 'Critical thinking on \'We\'re Not Afraid to Die\' — analysing the text to reach.',
          hint: 'If stuck, review the "Three-Level Reading Guide" technique: Level 1 (Literal - what.',
          misconception: 'Students often believe critical interpretation means finding "hidden meanings" the author secretly intended, leading.',
          parts: [
                { id: 'a', prompt: 'Define "critical interpretation" in the context of literary analysis and distinguish it from "personal opinion."', answer: 'Critical interpretation is an evidence-based analysis that examines how a text\'s',
                  options: ['Critical interpretation is an evidence-based analysis that examines how a text\'s', 'It\'s just what I feel about the story', 'hidden meanings'],
                  hint: 'If stuck, review the "Three-Level Reading Guide" technique: Level 1 (Literal - what happens), Level.',
                  misconception: 'Students often believe critical interpretation means finding "hidden meanings" the author secretly intended, leading them to over-read.' },
                { id: 'b', prompt: 'Apply a psychological lens to interpret the children\'s reaction to danger (Jon and Sue\'s dialogue on January 5).', answer: 'Identify the children\'s exact words: "we aren\'t afraid of dying if we can all be',
                  options: ['Identify the children\'s exact words: "we aren\'t afraid of dying if we can all be', 'hidden meanings'],
                  hint: 'If stuck, review the "Three-Level Reading Guide" technique: Level 1 (Literal - what happens), Level.',
                  misconception: 'Students often believe critical interpretation means finding "hidden meanings" the author secretly intended, leading them to over-read.' },
                { id: 'c', prompt: 'Analyze the three structural sections of the narrative (preparation/voyage, disaster/survival, navigation/rescue).', answer: 'Section 1 (preparation): logbook tone, technical detail, confidence',
                  options: ['Section 1 (preparation): logbook tone, technical detail, confidence', 'hidden meanings'],
                  hint: 'If stuck, review the "Three-Level Reading Guide" technique: Level 1 (Literal - what happens), Level.',
                  misconception: 'Students often believe critical interpretation means finding "hidden meanings" the author secretly intended, leading them to over-read.' }
          ],
            remediations: { 'critical-interpretation-means-finding-hidden': { steps: ['If a student produces unsupported interpretations: 1) Have them practice the "Claim-Evidence-Reasoning" (CER) framework.', '2) Use the textbook\'s "Understanding the text" questions as CER templates.', '3) Model a think-aloud: "I think the island symbolizes hope — where is the evidence?', 'The text calls it \'pinpricks in the vast ocean\' and \'most beautiful island in the world\' — that\'s my evidence." 4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_014', difficulty: 'standard',
          question: 'Writing skills from \'We\'re Not Afraid to Die\' — using the text as a model.',
          hint: 'If stuck on evidence retrieval: Re-read the "Understanding the Text" Q1 in NCERT (steps.',
          misconception: 'Students treat literature-based writing tasks as *plot summary* exercises. They write: "The captain was brave.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills from \'We\'re Not Afraid to Die\'',
                  options: ['Writing skills from \'We\'re Not Afraid to Die\'', '\'We\'re Not Afraid to Die\' (Hornbill, ch', 'The plot/narrative arc of \'We\'re Not Afraid to Die\'', 'The setting of \'We\'re Not Afraid to Die\''],
                  hint: 'If stuck on evidence retrieval: Re-read the "Understanding the Text" Q1 in NCERT (steps taken.',
                  misconception: 'Students treat literature-based writing tasks as *plot summary* exercises. They write: "The captain was brave. The wave hit.' }
          ],
            remediations: { 'students-treat-literature-based-writing': { steps: ['**Format Drill:** Give the student a blank template for each of the 4 formats (diary, formal letter, article, speech).', 'Have them fill conventions from memory in 2 minutes.', '**Voice Swap:** Take a 3-sentence summary.', 'Rewrite it in 3 voices: Captain\'s log (passive, technical), Sue\'s diary (sensory, emotional), Newspaper report.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_015', difficulty: 'standard',
          question: 'Discussion points on \'We\'re Not Afraid to Die\' — speaking and listening around.',
          hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_eng_h_cbse_02_013) for.',
          misconception: 'Students believe a "good discussion" means speaking often, agreeing with the teacher\'s expected answer, or sharing.',
          parts: [
                { id: 'a', prompt: 'Compare the discussion dynamics if a group tackles Question 1 (adult vs.', answer: 'Analyzing psychological responses (e.g., adults\' pragmatic action vs',
                  options: ['Analyzing psychological responses (e.g., adults\' pragmatic action vs', 'good discussion'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_eng_h_cbse_02_013) for.',
                  misconception: 'Students believe a "good discussion" means speaking often, agreeing with the teacher\'s expected answer, or sharing personal anecdotes.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['Have the student re-read the January 4-5 sections and highlight every verb describing adult actions and every quote.', 'Practice the "Paraphrase-Add-Evidence" protocol: Partner A makes a claim; Partner B says "So you\'re saying [paraphrase].', 'The text shows this when [quote]." 3.', 'Use a discussion tracker: each speaker must reference a previous speaker\'s point or a new textual detail.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a "good discussion" means speaking often, agreeing with the teacher\'s expected answer, or sharing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Question 4 (\'Why do people undertake adventurous expeditions...?\') is irrelevant to the chapter because the narrator never.', answer: 'Refute',
                  options: ['Refute', 'good discussion'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (c11_eng_h_cbse_02_013) for.',
                  misconception: 'Students believe a "good discussion" means speaking often, agreeing with the teacher\'s expected answer, or sharing personal anecdotes.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['Have the student re-read the January 4-5 sections and highlight every verb describing adult actions and every quote.', 'Practice the "Paraphrase-Add-Evidence" protocol: Partner A makes a claim; Partner B says "So you\'re saying [paraphrase].', 'The text shows this when [quote]." 3.', 'Use a discussion tracker: each speaker must reference a previous speaker\'s point or a new textual detail.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
