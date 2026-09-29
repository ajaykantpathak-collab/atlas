import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch04_p2: SimDef = {
    id: 'v3_c6_english_ch04_p2',
    title: 'The Tunnel · Part 2/2',
    subtitle: 'This node covers general vocabulary acquisition strategies using context clues within the.',
    classLevel: 6, subject: 'english', topic: 'The Tunnel · Part 2/2',
    chapters: ['c6_english_ch04'],
    nodeIds: ['c6_english_u4_037', 'c6_english_u4_038', 'c6_english_u4_039', 'c6_english_u4_040'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever been reading a story and hit a word you didn\'t know, like \'phenomenon\', but you kept reading.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A story about a boy near a jungle tunnel spends its first pages on his ordinary daily routine — nothing exciting happens at all. Why would a writer spend so much space on boring details?',
        options: ['Showing what is normal makes the sudden moment of danger feel far more surprising', 'To fill pages — long stories need padding', 'To describe the weather, which is the real point of the story', 'To introduce every villager before the plot begins'],
        answer: 'Showing what is normal makes the sudden moment of danger feel far more surprising',
        hook: 'Plot is not everything a character does. It is the chain of important events that build toward a change — and a calm routine is the author loading the spring.',
    },
    teaching: [
        { title: 'Vocabulary in Context: Words from the Unit', text: 'Vocabulary in context is the skill of using clues within a sentence or paragraph to determine the meaning of an unfamiliar word without relying solely on a dictionary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u4_037', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map where a boy waits at a hot, still jungle tunnel each day, then mark the exact event that snaps his routine and pulls the story into danger.',
        labels: ['Vocabulary in Context: Words', 'Grammar: Sentence Structure', 'Writing: Narrative and Adventure', 'Speaking and Listening: Reading'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u4_037', title: 'Vocabulary in Context: Words from the Unit',
          caseStudy: { intro: 'Have you ever been reading a story and hit a word you didn\'t know, like \'phenomenon\', but you kept reading and still understood the story?',
            decisions: [{ prompt: 'What is a \'context clue\' in a reading passage?', options: [
                { text: 'A context clue is a piece of information, such as a definition, synonym, or example,', outcome: 'A context clue is a piece of information, such as a definition, synonym, or example, found near.' },
                { text: 'it\'s a dictionary definition', outcome: 'Not quite — Students often try to guess a word\'s meaning by looking only at the word itself rather than the.', reveals: 'students-often-try-to-guess' },
                { text: 'vocabulary must be learned in isolation rather than through reading', outcome: 'Not quite — Students often try to guess a word\'s meaning by looking only at the word itself rather than the.', reveals: 'students-often-try-to-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_038', title: 'Grammar: Sentence Structure and Types of Sentences',
          caseStudy: { intro: 'Imagine you are telling your friend about your day at school. If you say, "I played badminton," that is a simple, complete thought.',
            decisions: [{ prompt: 'What is the main difference between a simple sentence and a complex sentence?', options: [
                { text: 'A simple sentence has one independent clause, while a complex sentence includes at least', outcome: 'A simple sentence has one independent clause, while a complex sentence includes at least one.' },
                { text: 'complete thought', outcome: 'Not quite — Students often think that any long sentence is "complex." They confuse length with structure, often.', reveals: 'any-long-sentence-is-complex' },
                { text: 'complex', outcome: 'Not quite — Students often think that any long sentence is "complex." They confuse length with structure, often.', reveals: 'any-long-sentence-is-complex' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_039', title: 'Writing: Narrative and Adventure Writing',
          caseStudy: { intro: 'Have you ever felt your heart race while reading about a character exploring a dark, mysterious place like an abandoned fort or a dense forest?',
            decisions: [{ prompt: 'What are the three essential components that make a story an "adventure"?', options: [
                { text: 'The three components are a clear setting, a character with a goal, and a series of', outcome: 'The three components are a clear setting, a character with a goal, and a series of obstacles.' },
                { text: 'adventure', outcome: 'Not quite — Students often believe that "adventure" means constant action without any pause.', reveals: 'adventure-means-constant-action-without' },
                { text: '"adventure" means constant action without any pause', outcome: 'Not quite — Students often believe that "adventure" means constant action without any pause.', reveals: 'adventure-means-constant-action-without' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_040', title: 'Speaking and Listening: Reading Aloud and Dramatisation',
          caseStudy: { intro: 'Have you ever told a friend about a scary movie you saw and noticed your voice getting lower or faster? Reading aloud and dramatisation work exactly like that.',
            decisions: [{ prompt: 'What are the three main elements of voice that change when reading a story aloud?', options: [
                { text: 'The three elements are pace, volume, and expression (or tone)', outcome: 'The three elements are pace, volume, and expression (or tone).' },
                { text: 'reading aloud', outcome: 'Not quite — Students often believe that "reading aloud" means reading every word at a constant, robotic speed.', reveals: 'reading-aloud-means-reading-every' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_037', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is writing a suspense scene about a boy who must cross into unknown territory. She sets it in a busy, noisy market \'because lots is happening there.\' A friend suggests a narrow, dark tunnel instead.',
            decisions: [{ prompt: 'Why does the tunnel make a stronger setting for this kind of scene?', options: [
                { text: 'Because the danger is concentrated in the unknown — a tunnel is dark, enclosed and hides what lies ahead, so the tracks \'disappearing into\' it create dread before anything even happens. A crowded market spreads attention thin; danger there must come from people or events, while the tunnel itself is the threat.', outcome: 'The chapter shows setting building suspense — confinement and invisibility of what\'s ahead make the reader lean forward, which scattered marketplace bustle cannot do.' },
                { text: 'Setting does not matter much — a scary plot is scary in any place, so the market is fine.', outcome: 'Place shapes the fear — the tunnel works because darkness and enclosure do half the storytelling; the same plot in a loud crowd loses that built-in menace.', reveals: 'setting-doesnt-matter' },
                { text: 'The market is actually scarier — more people means more danger, always.', outcome: 'Crowds bring distraction, not necessarily dread — the tunnel\'s power is that the character cannot see what is coming, and uncertainty frightens more than noise.', reveals: 'crowds-are-scarier' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_040', title: 'You made it',
          caseStudy: { intro: 'Stillness before the storm is a trick of storytellers. The quieter the routine, the louder the surprise.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u4_037', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of using clues within a sentence.',
          hint: 'Review the "Let\'s learn" section of the unit for word-in-sentence practice.',
          misconception: 'Students often try to guess a word\'s meaning by looking only at the word itself rather than the full sentence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context is the skill of using clues within a sentence or paragraph to',
                  options: ['Vocabulary in context is the skill of using clues within a sentence or paragraph to', 'The "plot" is the sequence of events that make up a story\'s action, while the "setting"', 'From \'is the sequence of events that make up a story\': the skill or concept this node', 'Courage and adventure are literary themes where a character chooses to face something'],
                  hint: 'Review the "Let\'s learn" section of the unit for word-in-sentence practice.',
                  misconception: 'Students often try to guess a word\'s meaning by looking only at the word itself rather than the full sentence.' }
          ],
            remediations: { 'students-often-try-to-guess': { steps: ['If the student struggles, ask them to use the "Cover-Up Method." Tell them to cover the unknown word with their finger.', 'This forces them to focus on the sentence\'s logic rather than the word\'s dictionary definition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_038', difficulty: 'standard',
          question: 'A simple sentence contains one independent clause (a complete thought), while.',
          hint: 'Review the definitions of "Subject" and "Verb."',
          misconception: 'Students often think that any long sentence is "complex." They confuse length with structure, often misidentifying.',
          parts: [
                { id: 'a', prompt: 'Read this: "Although Prabhat felt nervous, he played the game." Is this a simple or complex sentence? Why?', answer: 'It is a complex sentence',
                  options: ['It is a complex sentence', 'simple', 'complex', 'Prabhat played a long match with his friend in the field'],
                  hint: 'Review the definitions of "Subject" and "Verb."',
                  misconception: 'Students often think that any long sentence is "complex." They confuse length with structure, often misidentifying a simple sentence with.' }
          ],
            remediations: { 'any-long-sentence-is-complex': { steps: ['First, ask the student to underline the verbs in the sentence.', 'Then, identify if there is more than one clause that has its own subject and verb.', 'If one part cannot stand alone (e.g., "because he was tired"), explain that it is a dependent clause, making the whole.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_038', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any long sentence is "complex." They confuse length with structure, often misidentifying.',
          parts: [
                { id: 'a', prompt: 'Critique this sentence: "I went home because." Is this a complete complex sentence? Why or why not?', answer: 'No, it is incomplete',
                  options: ['No, it is incomplete', 'complex', 'Prabhat played a long match with his friend in the field', 'any long sentence is "complex'],
                  hint: 'Review the definitions of "Subject" and "Verb."',
                  misconception: 'Students often think that any long sentence is "complex." They confuse length with structure, often misidentifying a simple sentence with.' }
          ],
            remediations: { 'any-long-sentence-is-complex': { steps: ['First, ask the student to underline the verbs in the sentence.', 'Then, identify if there is more than one clause that has its own subject and verb.', 'If one part cannot stand alone (e.g., "because he was tired"), explain that it is a dependent clause, making the whole.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_039', difficulty: 'standard',
          question: 'Adventure writing is a form of storytelling that focuses on a character facing.',
          hint: 'Review simple descriptive adjectives and sensory language (sight, sound, touch).',
          misconception: 'Students often believe that "adventure" means constant action without any pause.',
          parts: [
                { id: 'a', prompt: 'Why do adventure writers use "vivid descriptions" of a setting instead of just saying "it was a dark place"?', answer: 'Vivid descriptions create atmosphere',
                  options: ['Vivid descriptions create atmosphere', 'adventure', '"adventure" means constant action without any pause'],
                  hint: 'Review simple descriptive adjectives and sensory language (sight, sound, touch).',
                  misconception: 'Students often believe that "adventure" means constant action without any pause.' },
                { id: 'b', prompt: 'If your character wants to reach the top of a mountain, name one "obstacle" you could add to make the story more exciting.', answer: 'Examples include a sudden rockfall, losing a map, or a thick fog',
                  options: ['Examples include a sudden rockfall, losing a map, or a thick fog', 'the character just walks up', 'adventure', '"adventure" means constant action without any pause'],
                  hint: 'Review simple descriptive adjectives and sensory language (sight, sound, touch).',
                  misconception: 'Students often believe that "adventure" means constant action without any pause.' },
                { id: 'c', prompt: 'How does slowing down the "pacing" help build suspense before a climax?', answer: 'Slowing down forces the reader to pay attention to small, intense details',
                  options: ['Slowing down forces the reader to pay attention to small, intense details', 'adventure', '"adventure" means constant action without any pause'],
                  hint: 'Review simple descriptive adjectives and sensory language (sight, sound, touch).',
                  misconception: 'Students often believe that "adventure" means constant action without any pause.' }
          ],
            remediations: { 'adventure-means-constant-action-without': { steps: ['Ask the student to stop and describe only the "scary sounds" or "smells" of their setting for three sentences.', 'This forces them to focus on atmospheric buildup rather than just movement.', 'Remind them that the silence before a surprise is often scarier than the surprise itself.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_040', difficulty: 'standard',
          question: 'Reading aloud and dramatisation are performance-based communication skills that.',
          hint: 'Review the "Let us discuss" sections in the chapter to identify how characters feel.',
          misconception: 'Students often believe that "reading aloud" means reading every word at a constant, robotic speed without any pauses.',
          parts: [
                { id: 'a', prompt: 'What are the three main elements of voice that change when reading a story aloud?', answer: 'The three elements are pace, volume, and expression (or tone)',
                  options: ['The three elements are pace, volume, and expression (or tone)', 'reading aloud'],
                  hint: 'Review the "Let us discuss" sections in the chapter to identify how characters feel before trying.',
                  misconception: 'Students often believe that "reading aloud" means reading every word at a constant, robotic speed without any pauses.' }
          ],
            remediations: { 'reading-aloud-means-reading-every': { steps: ['Ask the student to read the sentence silently and imagine being the character in that exact situation.', 'Ask: "If you were truly feeling [emotion], would you be talking fast or slow?', 'Would you be loud or quiet?" Guide them to mark a "pause" or "slow down" note on their paper with a pencil to help them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
