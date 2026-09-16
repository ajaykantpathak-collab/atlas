import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch05_p2: SimDef = {
    id: 'v3_c6_english_ch05_p2',
    title: 'Bravehearts · Part 2/2',
    subtitle: 'This node covers vocabulary related to patriotism, tradition, and personal resilience.',
    classLevel: 6, subject: 'english', topic: 'Bravehearts · Part 2/2',
    chapters: ['c6_english_ch05'],
    nodeIds: ['c6_english_u5_047', 'c6_english_u5_041', 'c6_english_u5_049', 'c6_english_u5_042'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are watching a news report about a soldier who helped his village during a flood; if the reporter.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two students write about visiting a war memorial. One lists facts like a textbook; the other begins Dear friend, guess what I saw today — and suddenly the whole class is listening. What did the letter do that the report could not?',
        options: ['It turned facts into feelings — a letter feels like a friend speaking directly to you', 'It used bigger words, which always impresses a class', 'It was longer, and longer writing always wins', 'It mentioned the memorial first, so it counted as research'],
        answer: 'It turned facts into feelings — a letter feels like a friend speaking directly to you',
        hook: 'A letter is not a formal information document. Its greeting, personal voice, and warm sign-off make it a conversation — a bridge from the heart of the writer to the reader.',
    },
    teaching: [
        { title: 'Vocabulary in Context: Words from the Unit', text: 'Vocabulary in context refers to determining the meaning of words by looking at the surrounding sentences, the tone of the passage, and the emotional connection the author wants to convey.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u5_047', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take one cold fact about the war memorial and rewrite it as two sentences in a letter to a friend, adding the feeling the fact left behind.',
        labels: ['Vocabulary in Context: Words', 'Grammar: Active and Passive', 'Writing: Formal and Informal', 'Speaking and Listening: Recitation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u5_047', title: 'Vocabulary in Context: Words from the Unit',
          caseStudy: { intro: 'Imagine you are watching a news report about a soldier who helped his village during a flood; if the reporter uses the word \'sacrifice\', they aren\'t just.',
            decisions: [{ prompt: 'What does the word \'homage\' mean in the context of showing respect to someone who served their country?', options: [
                { text: '\'Homage\' is a public display of honor or deep respect', outcome: '\'Homage\' is a public display of honor or deep respect. A wrong answer (like "a gift") reveals the.' },
                { text: 'a gift', outcome: 'Not quite — Students often mistake \'sacrifice\' as only meaning "losing something," without understanding the.', reveals: 'students-often-mistake-sacrifice-as' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_048', title: 'Grammar: Active and Passive Voice',
          caseStudy: { intro: 'Have you ever noticed that saying "I ate the mango" sounds different from saying "The mango was eaten by me"?',
            decisions: [{ prompt: 'In the sentence "The artist painted a picture," who is performing the action?', options: [
                { text: 'The artist is performing the action', outcome: 'The artist is performing the action. A wrong answer suggests the student is confused about.' },
                { text: 'in a sentence', outcome: 'Not quite — Students often think that any sentence with the word "by" is automatically passive, or that passive.', reveals: 'any-sentence-with-the-word' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_050', title: 'Speaking and Listening: Recitation and Group Discussion',
          caseStudy: { intro: 'Have you ever tried to tell a friend about a story you loved, but they kept interrupting, or have you ever felt like a poem you read was boring until someone.',
            decisions: [{ prompt: 'What are two things you should control when reciting a poem to make it sound respectful and clear?', options: [
                { text: 'You should control your articulation (speaking each word clearly) and your pacing (speed)', outcome: 'You should control your articulation (speaking each word clearly) and your pacing (speed).' },
                { text: 'loudness', outcome: 'Not quite — Students often treat group discussion as a "debate" where they must prove they are right.', reveals: 'students-often-treat-group-discussion' },
                { text: 'acting out', outcome: 'Not quite — Students often treat group discussion as a "debate" where they must prove they are right.', reveals: 'students-often-treat-group-discussion' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_047', title: 'Use it in the wild',
          caseStudy: { intro: 'After visiting a war memorial on a school trip, a student must write about it twice — once for the noticeboard report and once as a letter to her grandmother. She asks whether she can submit the same paragraph for both.',
            decisions: [{ prompt: 'What should change between the report and the letter?', options: [
                { text: 'Everything in the voice — the report states facts (\'the memorial was built in 2019\'), while the letter carries her personal experience (\'I felt like I was travelling back in time\'). The letter form exists to hold feeling: it is how the writer turns names on a wall into a personal act of homage, which is why the chapter uses letters to honour the soldiers.', outcome: 'Format is meaning here — the intimate letter lets respect and grief be spoken directly, while the report\'s distance would make the homage sound like statistics.' },
                { text: 'The same paragraph works for both — writing is writing, and the facts matter more than the format.', outcome: 'The two forms do different work — a report informs, a letter connects; \'I felt moved\' belongs in the letter, and \'it was built in 2019\' belongs in the report.', reveals: 'format-doesnt-matter' },
                { text: 'The letter should be more formal than the report, since it is addressed to an elder.', outcome: 'Addressing an elder does not freeze the voice — the letter\'s warmth is the point; it lets her speak to her grandmother about what the visit felt like.', reveals: 'letters-must-be-formal' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_050', title: 'You made it',
          caseStudy: { intro: 'Reports tell you what happened; letters tell you what it felt like. That is why a letter can make even stone walls speak.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u5_047', difficulty: 'standard',
          question: 'Vocabulary in context refers to determining the meaning of words by looking.',
          hint: 'Review the \'Let us discuss\' sections in the NCERT textbook to see how definitions are.',
          misconception: 'Students often mistake \'sacrifice\' as only meaning "losing something," without understanding the "greater cause".',
          parts: [
                { id: 'a', prompt: 'What does the word \'homage\' mean in the context of showing respect to someone who served their country?', answer: '\'Homage\' is a public display of honor or deep respect',
                  options: ['\'Homage\' is a public display of honor or deep respect', 'a gift'],
                  hint: 'Review the \'Let us discuss\' sections in the NCERT textbook to see how definitions are linked.',
                  misconception: 'Students often mistake \'sacrifice\' as only meaning "losing something," without understanding the "greater cause" element.' },
                { id: 'b', prompt: 'Choose the correct word to complete this sentence: "The villagers built a ________ to ensure the memory of the brave leader would never fade." (Options.', answer: 'The correct word is \'memorial\'',
                  options: ['The correct word is \'memorial\'', 'never fading memory'],
                  hint: 'Review the \'Let us discuss\' sections in the NCERT textbook to see how definitions are linked.',
                  misconception: 'Students often mistake \'sacrifice\' as only meaning "losing something," without understanding the "greater cause" element.' }
          ],
            remediations: { 'students-often-mistake-sacrifice-as': { steps: ['If a student confuses \'sacrifice\' with \'losing\', ask them: "Was the ice cream dropped on purpose to help someone else.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_048', difficulty: 'standard',
          question: 'Voice explains the relationship between the doer of an action (the subject) and.',
          hint: 'Review "Sentence Structure" (Subject-Verb-Object).',
          misconception: 'Students often think that any sentence with the word "by" is automatically passive, or that passive voice is "wrong.".',
          parts: [
                { id: 'a', prompt: 'In the sentence "The artist painted a picture," who is performing the action?', answer: 'The artist is performing the action',
                  options: ['The artist is performing the action', 'in a sentence'],
                  hint: 'Review "Sentence Structure" (Subject-Verb-Object).',
                  misconception: 'Students often think that any sentence with the word "by" is automatically passive, or that passive voice is "wrong." This happens because.' }
          ],
            remediations: { 'any-sentence-with-the-word': { steps: ['Ask the student to circle the subject.', 'Ask the student to identify the action verb.', 'Ask: "Is the subject doing this action, or is the action happening to them?" 4.', 'If they are still stuck, use the "Actor vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_049', difficulty: 'standard',
          question: 'A letter is a written message sent from one person to another.',
          hint: 'Review basic sentence structures and parts of speech in the previous unit.',
          misconception: 'Students often mix up "salutations" (greetings) and "closings." For example, they might write "Dear Principal" (formal).',
          parts: [
                { id: 'a', prompt: 'You are writing a request to the head of a local museum for information. How would you start your letter?', answer: 'Start with "Respected Sir/Madam."',
                  options: ['Start with "Respected Sir/Madam."', 'Respected Sir/Madam'],
                  hint: 'Review basic sentence structures and parts of speech in the previous unit.',
                  misconception: 'Students often mix up "salutations" (greetings) and "closings." For example, they might write "Dear Principal" (formal) but close with "See.' }
          ],
            remediations: { 'students-often-mix-up-salutations': { steps: ['If the student mixes tones, ask them to read their letter out loud.', 'Ask: "If you were speaking to the Principal, would you really say \'See you later\'?" Then, provide a "Formal" vs.', '"Informal" word bank (e.g., \'Dear\' vs \'Respected\', \'With love\' vs \'Yours sincerely\') and have them sort the phrases.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_050', difficulty: 'standard',
          question: 'Recitation is the act of speaking a poem aloud with appropriate emotion.',
          hint: 'Review the "Let us discuss" sections in the chapter to practice identifying main ideas.',
          misconception: 'Students often treat group discussion as a "debate" where they must prove they are right.',
          parts: [
                { id: 'a', prompt: 'Analyze the difference between "reading" a poem and "reciting" it. What does recitation add to the experience?', answer: 'Reading is processing words; reciting adds emotion, rhythm, and tone',
                  options: ['Reading is processing words; reciting adds emotion, rhythm, and tone', 'performance'],
                  hint: 'Review the "Let us discuss" sections in the chapter to practice identifying main ideas.',
                  misconception: 'Students often treat group discussion as a "debate" where they must prove they are right.' }
          ],
            remediations: { 'students-often-treat-group-discussion': { steps: ['Ask the student to play the "Echo Game." Tell them: "Before you share your idea, you must start by saying, \'I heard you.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
