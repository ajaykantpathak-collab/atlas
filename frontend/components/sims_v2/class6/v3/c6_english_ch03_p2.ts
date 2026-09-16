import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch03_p2: SimDef = {
    id: 'v3_c6_english_ch03_p2',
    title: 'Dreams and Discoveries · Part 2/2',
    subtitle: 'This covers identifying word meanings using surrounding text within the \'Nurturing.',
    classLevel: 6, subject: 'english', topic: 'Dreams and Discoveries · Part 2/2',
    chapters: ['c6_english_ch03'],
    nodeIds: ['c6_english_u3_027', 'c6_english_u3_021', 'c6_english_u3_029', 'c6_english_u3_022'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever been reading a story and bumped into a word you didn\'t know, like \'stagnant\'.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A friend retells a story about a boy whose inventions keep failing — but skips the small early disasters and jumps straight to the biggest mess. The story falls flat. What went missing?',
        options: ['The build-up — each failed invention is bigger than the last, so the chain of disasters makes the finale funny', 'The character names — without them nothing makes sense', 'The jokes — every story needs jokes sprinkled in', 'Nothing — order never matters in a story'],
        answer: 'The build-up — each failed invention is bigger than the last, so the chain of disasters makes the finale funny',
        hook: 'Sequence is not just a list of events. It is a chain of causes and effects — build, fail, react — that teaches readers to expect the next disaster.',
    },
    teaching: [
        { title: 'Vocabulary in Context: Words from the Unit', text: 'Vocabulary in context is the skill of determining the meaning of an unfamiliar word by looking at the words, sentences, and ideas surrounding it in a text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u3_027', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rebuild the scrambled order of the disasters of a young inventor and show why each mess must grow bigger than the one before it.',
        labels: ['Vocabulary in Context: Words', 'Grammar: Adjectives and Adverbs', 'Writing: Creative and Imaginative', 'Speaking and Listening: Presenting'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u3_027', title: 'Vocabulary in Context: Words from the Unit',
          caseStudy: { intro: 'Have you ever been reading a story and bumped into a word you didn\'t know, like \'stagnant\' or \'cost-effective\'?',
            decisions: [{ prompt: 'What is the purpose of using context clues when you encounter a new word in a story?', options: [
                { text: 'The purpose is to understand the meaning of the word based on the information provided in', outcome: 'The purpose is to understand the meaning of the word based on the information provided in the text.' },
                { text: 'to ignore the word', outcome: 'Not quite — Students often assume a word has only one "correct" dictionary definition and try to force that.', reveals: 'a-word-has-only-one' },
                { text: 'correct', outcome: 'Not quite — Students often assume a word has only one "correct" dictionary definition and try to force that.', reveals: 'a-word-has-only-one' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_028', title: 'Grammar: Adjectives and Adverbs',
          caseStudy: { intro: 'Imagine you are describing your favorite tree, like a Neem tree.',
            decisions: [{ prompt: 'What is the difference between an adjective and an adverb based on the words they describe?', options: [
                { text: 'An adjective describes a noun (like \'green\' leaf), whereas an adverb describes an action', outcome: 'An adjective describes a noun (like \'green\' leaf), whereas an adverb describes an action or verb.' },
                { text: 'He ran fastly', outcome: 'Not quite — Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where.', reveals: 'all-words-ending-in-ly' },
                { text: 'He ran quick', outcome: 'Not quite — Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where.', reveals: 'all-words-ending-in-ly' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_029', title: 'Writing: Creative and Imaginative Writing',
          caseStudy: { intro: 'Have you ever looked at a tree in your school playground and imagined it had a secret personality, like the Neem Baba in your lesson?',
            decisions: [{ prompt: 'What is the main difference between factual writing and creative writing?', options: [
                { text: 'Factual writing only lists real information, while creative writing uses your imagination', outcome: 'Factual writing only lists real information, while creative writing uses your imagination to add.' },
                { text: 'creative writing', outcome: 'Not quite — Students often confuse "creative writing" with "making up lies" or "writing nonsense." They believe.', reveals: 'students-often-confuse-creative-writing' },
                { text: 'making up lies', outcome: 'Not quite — Students often confuse "creative writing" with "making up lies" or "writing nonsense." They believe.', reveals: 'students-often-confuse-creative-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_030', title: 'Speaking and Listening: Presenting Ideas and Debating',
          caseStudy: { intro: 'Imagine you want to convince your parents to let you plant a tree in the courtyard; how would you start?',
            decisions: [{ prompt: 'What are the three essential components of a well-organized idea presentation?', options: [
                { text: 'The three components are: a clear introduction, supporting evidence or reasons, and a', outcome: 'The three components are: a clear introduction, supporting evidence or reasons, and.' },
                { text: 'presenting an idea', outcome: 'Not quite — Students often confuse "presenting an idea" with "telling a story." They think if they speak for.', reveals: 'students-often-confuse-presenting-an' },
                { text: 'telling a story', outcome: 'Not quite — Students often confuse "presenting an idea" with "telling a story." They think if they speak for.', reveals: 'students-often-confuse-presenting-an' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_027', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is writing her own \'crazy inventor\' story for the school magazine. She plans to save the invention\'s disastrous failure for the very last line, \'to surprise the reader.\'',
            decisions: [{ prompt: 'What does Anand\'s story suggest about where a comic disaster should go?', options: [
                { text: 'Early — the story soaks the father first, establishing a pattern: Anand\'s inventions always backfire, and each new scheme repeats the comedy. Showing the disaster early turns it into the story\'s engine — every later invention is funnier because readers already know how it will end. Saving one failure for the end would just be a surprise, not a pattern.', outcome: 'Comic sequence is the craft here — an early failure sets the rule of the world (inventions fail), and the reader\'s anticipation of the next flop is what drives the humour.' },
                { text: 'Her plan is right — a disaster works best as a final shock, so it should stay at the end.', outcome: 'A last-line failure is a twist, not a pattern — the story\'s comedy comes from watching failure repeat, which requires the first failure to happen early.', reveals: 'disaster-goes-last' },
                { text: 'She should cut the failure entirely — a perfect successful machine would make a stronger ending.', outcome: 'A perfect machine would break the story\'s whole comic purpose — the fun is that the inventions never work, and the pattern of flops is the plot.', reveals: 'success-is-funnier' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_030', title: 'You made it',
          caseStudy: { intro: 'A story is beads on a string, not beads in a bag. The order of events is what turns mishaps into comedy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u3_027', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the meaning of an unfamiliar.',
          hint: 'Review basic sentence structure (subject-verb-object) to ensure the student understands.',
          misconception: 'Students often assume a word has only one "correct" dictionary definition and try to force that meaning into every.',
          parts: [
                { id: 'a', prompt: 'In the sentence, "Neem leaves have chemical properties that destroy germs," what does the word \'properties\' likely mean?', answer: 'It means the characteristics or qualities of the leaves',
                  options: ['It means the characteristics or qualities of the leaves', 'a piece of land', 'correct'],
                  hint: 'Review basic sentence structure (subject-verb-object) to ensure the student understands how words.',
                  misconception: 'Students often assume a word has only one "correct" dictionary definition and try to force that meaning into every sentence.' },
                { id: 'b', prompt: 'Compare the two phrases: "The water was stagnant" vs "The water was flowing." How do these context clues change your understanding of \'stagnant\'?', answer: '\'Stagnant\' is the opposite of flowing',
                  options: ['\'Stagnant\' is the opposite of flowing', 'correct'],
                  hint: 'Review basic sentence structure (subject-verb-object) to ensure the student understands how words.',
                  misconception: 'Students often assume a word has only one "correct" dictionary definition and try to force that meaning into every sentence.' }
          ],
            remediations: { 'a-word-has-only-one': { steps: ['If a student is stuck, tell them: "Cover the word you don\'t know with your finger." Read the rest of the sentence.', 'Now, think: "What kind of word fits here based on the story?" If the sentence is about a tree, a \'bark\' is probably.', 'Use the sentence\'s theme to guide your choice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_028', difficulty: 'standard',
          question: 'An adjective is a word that describes a noun (person, place, or thing), while.',
          hint: 'Review basic Noun-Verb identification exercises.',
          misconception: 'Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where adverbs are needed.',
          parts: [
                { id: 'a', prompt: 'In the sentence, "The clever girl spoke softly," identify the adjective and the adverb and explain what each is describing.', answer: '\'Clever\' is the adjective describing the noun \'girl\', and \'softly\' is the adverb',
                  options: ['\'Clever\' is the adjective describing the noun \'girl\', and \'softly\' is the adverb', 'He ran fastly', 'He ran quick'],
                  hint: 'Review basic Noun-Verb identification exercises.',
                  misconception: 'Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where adverbs are needed (e.g., "He ran fastly".' },
                { id: 'b', prompt: 'Complete the sentence with an appropriate adverb: "The farmer planted the neem seeds _________."', answer: 'Possible answers: \'carefully\', \'neatly\', \'quickly\'',
                  options: ['Possible answers: \'carefully\', \'neatly\', \'quickly\'', 'He ran fastly', 'He ran quick'],
                  hint: 'Review basic Noun-Verb identification exercises.',
                  misconception: 'Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where adverbs are needed (e.g., "He ran fastly".' },
                { id: 'c', prompt: 'Analyze this sentence: "The bright sun shone brightly." Why is \'bright\' an adjective and \'brightly\' an adverb?', answer: '\'Bright\' modifies the noun \'sun\', while \'brightly\' modifies the action \'shone\'',
                  options: ['\'Bright\' modifies the noun \'sun\', while \'brightly\' modifies the action \'shone\'', 'He ran fastly', 'He ran quick'],
                  hint: 'Review basic Noun-Verb identification exercises.',
                  misconception: 'Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where adverbs are needed (e.g., "He ran fastly".' }
          ],
            remediations: { 'all-words-ending-in-ly': { steps: ['Ask the student to underline the verb in their sentence.', 'Then, ask them: "Does the word describe the object, or does it describe the action?" If it describes the action, remind.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_028', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where adverbs are needed.',
          parts: [
                { id: 'a', prompt: 'Write two sentences about a kitchen spice: one using an adjective to describe the spice and one using an adverb to describe how you use it.', answer: 'Example: "The \'yellow\' turmeric is healthy." (Adjective)',
                  options: ['Example: "The \'yellow\' turmeric is healthy." (Adjective)', 'He ran fastly', 'He ran quick'],
                  hint: 'Review basic Noun-Verb identification exercises.',
                  misconception: 'Students often think all words ending in \'-ly\' are adverbs, or they try to use adjectives where adverbs are needed (e.g., "He ran fastly".' }
          ],
            remediations: { 'all-words-ending-in-ly': { steps: ['Ask the student to underline the verb in their sentence.', 'Then, ask them: "Does the word describe the object, or does it describe the action?" If it describes the action, remind.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_029', difficulty: 'standard',
          question: 'Creative and imaginative writing is the process of using one’s own ideas.',
          hint: 'Review the "Let us speak" section in the Neem Baba chapter regarding personification.',
          misconception: 'Students often confuse "creative writing" with "making up lies" or "writing nonsense." They believe that because it.',
          parts: [
                { id: 'a', prompt: 'Describe a common kitchen spice (like ginger) as if it were a tiny, brave explorer.', answer: 'Step 1: Assign a human-like goal (e.g., to travel into a soup)',
                  options: ['Step 1: Assign a human-like goal (e.g., to travel into a soup)', 'A wrong answer shows the student is still listing facts (e.g', ') instead of creating a narrative', 'writing nonsense'],
                  hint: 'Review the "Let us speak" section in the Neem Baba chapter regarding personification.',
                  misconception: 'Students often confuse "creative writing" with "making up lies" or "writing nonsense." They believe that because it is creative, they don\'t.' },
                { id: 'b', prompt: 'Analyze the difference between saying "The cat slept on the mat" and "The tired cat curled into a ball on the soft mat, dreaming of chasing shadows." Which one.', answer: 'The second sentence is better',
                  options: ['The second sentence is better', 'creative writing', 'making up lies', 'writing nonsense'],
                  hint: 'Review the "Let us speak" section in the Neem Baba chapter regarding personification.',
                  misconception: 'Students often confuse "creative writing" with "making up lies" or "writing nonsense." They believe that because it is creative, they don\'t.' }
          ],
            remediations: { 'students-often-confuse-creative-writing': { steps: ['If a student writes nonsense, ask them to "ground" their imagination.', 'Tell them: "Pick one real thing about your subject, like the rough bark of a tree, and build your story around that one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_030', difficulty: 'standard',
          question: 'Presenting ideas is the act of sharing information clearly and logically to.',
          hint: 'Review the "Neem Baba" text to identify how facts (e.g., medicinal properties) act.',
          misconception: 'Students often confuse "presenting an idea" with "telling a story." They think if they speak for a long time about.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Presenting ideas is the act of sharing information clearly and logically to an audience,',
                  options: ['Presenting ideas is the act of sharing information clearly and logically to an audience,', 'Plot and sequence refer to the organization of events in a story: the "plot" is what', 'Character analysis is the process of examining a character\'s traits, motivations, and', 'The spirit of innovation is the drive to question, experiment, and persist despite failure'],
                  hint: 'Review the "Neem Baba" text to identify how facts (e.g., medicinal properties) act as evidence.',
                  misconception: 'Students often confuse "presenting an idea" with "telling a story." They think if they speak for a long time about their topic, they are.' }
          ],
            remediations: { 'students-often-confuse-presenting-an': { steps: ['First, ask the student to write their main idea in one sentence.', 'Second, ask them to find two facts that support that sentence.', 'Third, have them practice saying "My first reason is...', 'and my evidence is..." to force a logical structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
