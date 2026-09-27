import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch05_p1: SimDef = {
    id: 'v3_c6_english_ch05_p1',
    title: 'Bravehearts · Part 1/2',
    subtitle: 'This node covers the purpose and structure of letter-writing within the prose "A Homage.',
    classLevel: 6, subject: 'english', topic: 'Bravehearts · Part 1/2',
    chapters: ['c6_english_ch05'],
    nodeIds: ['c6_english_u5_041', 'c6_english_u5_042', 'c6_english_u5_043', 'c6_english_u5_044', 'c6_english_u5_045', 'c6_english_u5_046'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever received a handwritten note or a personal message from a friend that felt more special than.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two students write about visiting a war memorial. One lists facts like a textbook; the other begins Dear friend, guess what I saw today — and suddenly the whole class is listening. What did the letter do that the report could not?',
        options: ['It turned facts into feelings — a letter feels like a friend speaking directly to you', 'It used bigger words, which always impresses a class', 'It was longer, and longer writing always wins', 'It mentioned the memorial first, so it counted as research'],
        answer: 'It turned facts into feelings — a letter feels like a friend speaking directly to you',
        hook: 'A letter is not a formal information document. Its greeting, personal voice, and warm sign-off make it a conversation — a bridge from the heart of the writer to the reader.',
    },
    teaching: [
        { title: 'Prose: "A Homage to Our Brave Soldiers" -- Letter Format and Content', text: 'An epistolary prose style uses letters between characters to convey personal feelings and reflections, creating an intimate, conversational tone that allows the reader to experience the writer\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u5_041', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take one cold fact about the war memorial and rewrite it as two sentences in a letter to a friend, adding the feeling the fact left behind.',
        labels: ['Prose: "A Homage', 'Poem: "My Dear Soldiers"', 'Poem: Poetic Devices --', 'Poetry Form: Acrostic Poems'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u5_041', title: 'Prose: "A Homage to Our Brave Soldiers" -- Letter Format and Content',
          caseStudy: { intro: 'Have you ever received a handwritten note or a personal message from a friend that felt more special than a general announcement on a notice board?',
            decisions: [{ prompt: 'What are the two most important structural parts that make a letter different from a newspaper report?', options: [
                { text: 'The salutation (e.g., Dear friend) and the sign-off (e.g., Yours lovingly)', outcome: 'The salutation (e.g., Dear friend) and the sign-off (e.g., Yours lovingly).' },
                { text: 'a letter is just a formal document for information', outcome: 'Not quite — Students often think a letter is just a formal document for information.', reveals: 'a-letter-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_042', title: 'Prose: "A Homage to Our Brave Soldiers" -- Theme: Patriotism and Sacrifice',
          caseStudy: { intro: 'Have you ever seen a soldier in uniform and wondered what they are thinking about while they stand guard at a freezing border?',
            decisions: [{ prompt: 'What is the primary meaning of the word "homage" as it is used in the context of the National War Memorial?', options: [
                { text: 'Homage means showing special honor or respect publicly', outcome: 'Homage means showing special honor or respect publicly. A wrong answer suggests the student.' },
                { text: 'visiting', outcome: 'Not quite — Students often think sacrifice only means "dying in a war." This is a narrow view because.', reveals: 'sacrifice-only-means-dying-in' },
                { text: 'touring', outcome: 'Not quite — Students often think sacrifice only means "dying in a war." This is a narrow view because.', reveals: 'sacrifice-only-means-dying-in' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_043', title: 'Prose: "A Homage to Our Brave Soldiers" -- The National War Memorial',
          caseStudy: { intro: 'Have you ever visited a place that made you feel very quiet and thoughtful, like a library or a monument?',
            decisions: [{ prompt: 'What is the primary purpose of the National War Memorial in New Delhi?', options: [
                { text: 'It is a monument built to honor and pay respects to the soldiers of the Indian armed', outcome: 'It is a monument built to honor and pay respects to the soldiers of the Indian armed forces who.' },
                { text: 'homage', outcome: 'Not quite — Students often confuse the National War Memorial with India Gate itself, thinking they are the same.', reveals: 'students-often-confuse-the-national' },
                { text: 'sacrifice', outcome: 'Not quite — Students often confuse the National War Memorial with India Gate itself, thinking they are the same.', reveals: 'students-often-confuse-the-national' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_044', title: 'Poem: "My Dear Soldiers" -- Theme and Emotion',
          caseStudy: { intro: 'Imagine you are writing a thank-you note to someone who helped you.',
            decisions: [{ prompt: 'What is the difference between the \'theme\' of a poem and the \'emotion\' of a poem?', options: [
                { text: 'The theme is the main topic or lesson (like patriotism), while the emotion is the feeling', outcome: 'The theme is the main topic or lesson (like patriotism), while the emotion is the feeling the poet.' },
                { text: 'what the poem is about', outcome: 'Not quite — Students often confuse "subject" with "emotion." For example, they might say the "emotion" of the.', reveals: 'students-often-confuse-subject-with' },
                { text: 'how the poem makes us feel', outcome: 'Not quite — Students often confuse "subject" with "emotion." For example, they might say the "emotion" of the.', reveals: 'students-often-confuse-subject-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_045', title: 'Poem: Poetic Devices -- Acrostic Form, Imagery, Repetition',
          caseStudy: { intro: 'Have you ever tried to hide a secret message in a card you made for a friend?',
            decisions: [{ prompt: 'What is an acrostic poem?', options: [
                { text: 'An acrostic poem is one where the first letter of each line spells out a word vertically', outcome: 'An acrostic poem is one where the first letter of each line spells out a word vertically.' },
                { text: 'repetition', outcome: 'Not quite — Students often think "repetition" means the same thing as "rhyme." They confuse the sound of the.', reveals: 'repetition-means-the-same-thing' },
                { text: '"repetition" means the same thing as "rhyme', outcome: 'Not quite — Students often think "repetition" means the same thing as "rhyme." They confuse the sound of the.', reveals: 'repetition-means-the-same-thing' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_046', title: 'Poetry Form: Acrostic Poems -- How to Write Them',
          caseStudy: { intro: 'Have you ever tried to hide a secret message inside your writing?',
            decisions: [{ prompt: 'What happens when you read the first letter of every line in an acrostic poem vertically?', options: [
                { text: 'The first letters spell out the subject word or phrase of the poem', outcome: 'The first letters spell out the subject word or phrase of the poem.' },
                { text: 'the poem is read horizontally or doesn\'t understand the vertical structure', outcome: 'Not quite — Students often write the vertical word but then write sentences that have nothing to do with that.', reveals: 'students-often-write-the-vertical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_041', title: 'Use it in the wild',
          caseStudy: { intro: 'After visiting a war memorial on a school trip, a student must write about it twice — once for the noticeboard report and once as a letter to her grandmother. She asks whether she can submit the same paragraph for both.',
            decisions: [{ prompt: 'What should change between the report and the letter?', options: [
                { text: 'Everything in the voice — the report states facts (\'the memorial was built in 2019\'), while the letter carries her personal experience (\'I felt like I was travelling back in time\'). The letter form exists to hold feeling: it is how the writer turns names on a wall into a personal act of homage, which is why the chapter uses letters to honour the soldiers.', outcome: 'Format is meaning here — the intimate letter lets respect and grief be spoken directly, while the report\'s distance would make the homage sound like statistics.' },
                { text: 'The same paragraph works for both — writing is writing, and the facts matter more than the format.', outcome: 'The two forms do different work — a report informs, a letter connects; \'I felt moved\' belongs in the letter, and \'it was built in 2019\' belongs in the report.', reveals: 'format-doesnt-matter' },
                { text: 'The letter should be more formal than the report, since it is addressed to an elder.', outcome: 'Addressing an elder does not freeze the voice — the letter\'s warmth is the point; it lets her speak to her grandmother about what the visit felt like.', reveals: 'letters-must-be-formal' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u5_046', title: 'The bigger picture',
          caseStudy: { intro: 'Reports tell you what happened; letters tell you what it felt like. That is why a letter can make even stone walls speak.',
            decisions: [{ prompt: 'What comes next? Bravehearts · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bravehearts · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u5_041', difficulty: 'standard',
          question: 'An epistolary prose style uses letters between characters to convey personal.',
          hint: 'Review the difference between "I" (personal) and "It is" (formal) sentences.',
          misconception: 'Students often think a letter is just a formal document for information.',
          parts: [
                { id: 'a', prompt: 'What are the two most important structural parts that make a letter different from a newspaper report?', answer: 'The salutation (e.g., Dear friend) and the sign-off (e.g., Yours lovingly)',
                  options: ['The salutation (e.g., Dear friend) and the sign-off (e.g., Yours lovingly)', 'a letter is just a formal document for information'],
                  hint: 'Review the difference between "I" (personal) and "It is" (formal) sentences.',
                  misconception: 'Students often think a letter is just a formal document for information.' },
                { id: 'b', prompt: 'Why does an author choose to write a story as a series of letters instead of a formal report?', answer: 'It creates a personal, intimate tone that feels like a conversation',
                  options: ['It creates a personal, intimate tone that feels like a conversation', 'sharing news', 'a letter is just a formal document for information'],
                  hint: 'Review the difference between "I" (personal) and "It is" (formal) sentences.',
                  misconception: 'Students often think a letter is just a formal document for information.' }
          ],
            remediations: { 'a-letter-is-just-a': { steps: ['If the student struggles, ask them: "If you were texting your best friend about a movie you just saw, what is the first.', 'Then, explain that a letter is just a longer, more thoughtful version of that personal text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_041', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a letter is just a formal document for information.',
          parts: [
                { id: 'a', prompt: 'Evaluate the choice of using letters to discuss patriotism; is it more effective than a speech? Why?', answer: 'Yes, because patriotism is a deep, personal feeling',
                  options: ['Yes, because patriotism is a deep, personal feeling', 'a letter is just a formal document for information'],
                  hint: 'Review the difference between "I" (personal) and "It is" (formal) sentences.',
                  misconception: 'Students often think a letter is just a formal document for information.' }
          ],
            remediations: { 'a-letter-is-just-a': { steps: ['If the student struggles, ask them: "If you were texting your best friend about a movie you just saw, what is the first.', 'Then, explain that a letter is just a longer, more thoughtful version of that personal text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_042', difficulty: 'standard',
          question: 'Patriotism is the deep love, pride, and sense of duty one feels for their.',
          hint: 'Review the section on "What Bharat is known for" in the textbook.',
          misconception: 'Students often think sacrifice only means "dying in a war." This is a narrow view because it ignores the long years.',
          parts: [
                { id: 'a', prompt: 'What is the primary meaning of the word "homage" as it is used in the context of the National War Memorial?', answer: 'Homage means showing special honor or respect publicly',
                  options: ['Homage means showing special honor or respect publicly', 'visiting', 'touring', 'dying in a war'],
                  hint: 'Review the section on "What Bharat is known for" in the textbook.',
                  misconception: 'Students often think sacrifice only means "dying in a war." This is a narrow view because it ignores the long years of hard work, time away.' }
          ],
            remediations: { 'sacrifice-only-means-dying-in': { steps: ['Ask the student: "If a soldier serves for 20 years away from home, are they sacrificing?" Guide them to list the things.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_043', difficulty: 'standard',
          question: 'A National War Memorial is a site of national importance created to honor the.',
          hint: 'Review the definitions of "tribute," "homage," and "monument" in a dictionary to build.',
          misconception: 'Students often confuse the National War Memorial with India Gate itself, thinking they are the same thing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A National War Memorial is a site of national importance created to honor the memory of',
                  options: ['A National War Memorial is a site of national importance created to honor the memory of', 'An epistolary prose style uses letters between characters to convey personal feelings and', 'Patriotism is the deep love, pride, and sense of duty one feels for their country, while', 'The theme of a poem is its central message or "big idea," while the emotion (or mood) is'],
                  hint: 'Review the definitions of "tribute," "homage," and "monument" in a dictionary to build a stronger.',
                  misconception: 'Students often confuse the National War Memorial with India Gate itself, thinking they are the same thing.' }
          ],
            remediations: { 'students-often-confuse-the-national': { steps: ['First, show the student two distinct images: one of the India Gate and one of the National War Memorial.', 'Ask them to point out the differences in structure (an arch vs.', 'a series of concentric circles/walls).', 'Explain that while they share a location, they honor different periods and purposes, and the National War Memorial.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_044', difficulty: 'standard',
          question: 'The theme of a poem is its central message or "big idea," while the emotion (or.',
          hint: 'Review the "Let us discuss" sections in the Chapter 5 prose to practice summarizing.',
          misconception: 'Students often confuse "subject" with "emotion." For example, they might say the "emotion" of the poem is "a soldier,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of a poem is its central message or "big idea," while the emotion (or mood) is',
                  options: ['The theme of a poem is its central message or "big idea," while the emotion (or mood) is', 'An epistolary prose style uses letters between characters to convey personal feelings and', 'Patriotism is the deep love, pride, and sense of duty one feels for their country, while', 'A National War Memorial is a site of national importance created to honor the memory of'],
                  hint: 'Review the "Let us discuss" sections in the Chapter 5 prose to practice summarizing.',
                  misconception: 'Students often confuse "subject" with "emotion." For example, they might say the "emotion" of the poem is "a soldier," which is actually.' }
          ],
            remediations: { 'students-often-confuse-subject-with': { steps: ['If a student confuses subject and emotion, provide two lists: "People/Things" and "Feelings." Ask them to sort words.', 'Then, ask them to pick one from each to write a single descriptive sentence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_045', difficulty: 'standard',
          question: 'Poetic devices are tools like acrostic form (using first letters to spell.',
          hint: 'Review the "Let us read" section of the poem "The Kites."',
          misconception: 'Students often think "repetition" means the same thing as "rhyme." They confuse the sound of the end of a line (rhyme).',
          parts: [
                { id: 'a', prompt: 'If a poem describes a "scorching, dry, golden desert," which poetic device is the author using?', answer: 'The author is using imagery',
                  options: ['The author is using imagery', 'repetition', '"repetition" means the same thing as "rhyme'],
                  hint: 'Review the "Let us read" section of the poem "The Kites."',
                  misconception: 'Students often think "repetition" means the same thing as "rhyme." They confuse the sound of the end of a line (rhyme) with the actual.' }
          ],
            remediations: { 'repetition-means-the-same-thing': { steps: ['Ask the student to read the poem aloud and tap their desk only when they hear the *exact same word* repeated.', 'Explain that rhyme is about matching sounds at the end, while repetition is about bringing back a word to make.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u5_046', difficulty: 'standard',
          question: 'An acrostic poem is a creative writing form where the first letter of each.',
          hint: 'Review alphabetizing and basic descriptive adjectives.',
          misconception: 'Students often write the vertical word but then write sentences that have nothing to do with that word, or they repeat.',
          parts: [
                { id: 'a', prompt: 'What happens when you read the first letter of every line in an acrostic poem vertically?', answer: 'The first letters spell out the subject word or phrase of the poem',
                  options: ['The first letters spell out the subject word or phrase of the poem', 'the poem is read horizontally or doesn\'t understand the vertical structure'],
                  hint: 'Review alphabetizing and basic descriptive adjectives.',
                  misconception: 'Students often write the vertical word but then write sentences that have nothing to do with that word, or they repeat the word itself.' },
                { id: 'b', prompt: 'Write the first two lines of an acrostic poem using the word "SKY" to describe a sunny day.', answer: 'S: Sun shining bright above',
                  options: ['S: Sun shining bright above', 'sunny day'],
                  hint: 'Review alphabetizing and basic descriptive adjectives.',
                  misconception: 'Students often write the vertical word but then write sentences that have nothing to do with that word, or they repeat the word itself.' }
          ],
            remediations: { 'students-often-write-the-vertical': { steps: ['Ask the student to state the topic of their poem aloud before they begin writing.', 'Tell them to brainstorm three adjectives and two actions related to that topic first.', 'Then, have them write those ideas on a scratchpad and map them to the letters of their vertical word.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
