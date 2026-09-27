import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch02_p1: SimDef = {
    id: 'v3_c6_english_ch02_p1',
    title: 'Wit and Humour · Part 1/2',
    subtitle: 'This node covers the plot structure and sources of humour in the Dr. Dolittle story.',
    classLevel: 6, subject: 'english', topic: 'Wit and Humour · Part 1/2',
    chapters: ['c6_english_ch02'],
    nodeIds: ['c6_english_u2_011', 'c6_english_u2_012', 'c6_english_u2_013', 'c6_english_u2_014', 'c6_english_u2_015', 'c6_english_u2_016'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever tried to tell a friend about a funny movie? You start with "First this happened, then that.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A story about a doctor who stops treating humans and takes language lessons from a parrot makes readers laugh — yet nobody in it tells a single joke. Where is the humour hiding?',
        options: ['In the absurd role-reversal — the expert doctor becomes a student of the parrot', 'In clever jokes the animals tell each other', 'In the animals doing silly tricks for no reason', 'It is not really funny — readers are just being polite'],
        answer: 'In the absurd role-reversal — the expert doctor becomes a student of the parrot',
        hook: 'Humour is not only jokes. When characters act the opposite of what we expect — a doctor learning from an animal — the surprise itself is funny.',
    },
    teaching: [
        { title: 'Story: "Animals, Birds, and Dr. Dolittle" -- Plot and Humour', text: 'A plot is the sequence of major events that make up a story, while humour refers to the elements—such as irony, absurdity, or character observations—that make a story amusing or entertaining.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u2_011', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the plot from ordinary doctor to animal doctor and pin down exactly which flipped expectation makes each scene funny.',
        labels: ['Story: "Animals, Birds,', 'Story: "Dr. Dolittle" --', 'Poem: The Funny Man', 'Poem: Poetic Devices --', 'Poetry Form: Limericks --'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u2_011', title: 'Story: "Animals, Birds, and Dr. Dolittle" -- Plot and Humour',
          caseStudy: { intro: 'Have you ever tried to tell a friend about a funny movie? You start with "First this happened, then that happened" (plot), and then you say, "The funniest part.',
            decisions: [{ prompt: 'What is the main event that starts the plot of the Dr. Dolittle story?', options: [
                { text: 'The story begins when the Cat\'s-food-Man suggests that the doctor should stop treating', outcome: 'The story begins when the Cat\'s-food-Man suggests that the doctor should stop treating people and.' },
                { text: 'humour', outcome: 'Not quite — Students often think "humour" only means "telling a joke." They fail to see that humour can also.', reveals: 'humour-only-means-telling-a' },
                { text: 'telling a joke', outcome: 'Not quite — Students often think "humour" only means "telling a joke." They fail to see that humour can also.', reveals: 'humour-only-means-telling-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_012', title: 'Story: "Dr. Dolittle" -- Character Analysis',
          caseStudy: { intro: 'Think of your favorite cartoon or movie hero—how do you know they are "brave" or "funny"?',
            decisions: [{ prompt: 'What are \'character traits\'?', options: [
                { text: 'Character traits are the specific qualities or personality features that describe a', outcome: 'Character traits are the specific qualities or personality features that describe a character, such.' },
                { text: 'what the character looks like', outcome: 'Not quite — Students often confuse \'feelings\' with \'traits.\' A feeling is temporary (like feeling sad because.', reveals: 'students-often-confuse-feelings-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_013', title: 'Story: "Dr. Dolittle" -- Theme: Communication and Empathy',
          caseStudy: { intro: 'Have you ever tried to comfort a younger sibling or a pet who was sad, even though they couldn\'t explain exactly why?',
            decisions: [{ prompt: 'What does it mean to be an "unlikely friend"?', options: [
                { text: 'An unlikely friend is someone who, due to differences in background, species, or nature,', outcome: 'An unlikely friend is someone who, due to differences in background, species, or nature, would not.' },
                { text: 'being nice', outcome: 'Not quite — Students often think empathy is just "being nice." They confuse being polite with the deeper work.', reveals: 'empathy-is-just-being-nice' },
                { text: 'empathy is just "being nice', outcome: 'Not quite — Students often think empathy is just "being nice." They confuse being polite with the deeper work.', reveals: 'empathy-is-just-being-nice' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_014', title: 'Poem: The Funny Man Poem -- Tone and Humour',
          caseStudy: { intro: 'Have you ever seen someone try to drink tea with a fork? You would laugh because it is silly and unexpected.',
            decisions: [{ prompt: 'What do we mean by the "tone" of a poem? Answer: The tone is the poet\'s attitude or mood toward the subject.', options: [
                { text: 'Tone is the poet’s attitude toward the subject, such as being playful, serious, or excited', outcome: 'Tone is the poet’s attitude toward the subject, such as being playful, serious, or excited.' },
                { text: 'the tone is about a funny man', outcome: 'Not quite — Students often think humour is only about "funny words" (like adjectives) rather than the "funny.', reveals: 'humour-is-only-about-funny' },
                { text: 'funny words', outcome: 'Not quite — Students often think humour is only about "funny words" (like adjectives) rather than the "funny.', reveals: 'humour-is-only-about-funny' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_015', title: 'Poem: Poetic Devices -- Repetition, Rhyme, Word Play',
          caseStudy: { intro: 'Have you ever noticed how a song gets stuck in your head because it keeps repeating a catchy chorus?',
            decisions: [{ prompt: 'What do we call the technique where a poet uses the same word or phrase multiple times to emphasize a point or make the reader laugh?', options: [
                { text: 'It is called repetition', outcome: 'It is called repetition. A wrong answer suggests the student is confusing it with rhyme, which.' },
                { text: 'just means any two words that sound vaguely similar, like', outcome: 'Not quite — Students often think "rhyme" just means any two words that sound vaguely similar, like "cat" and.', reveals: 'rhyme-just-means-any-two' },
                { text: 'or they think', outcome: 'Not quite — Students often think "rhyme" just means any two words that sound vaguely similar, like "cat" and.', reveals: 'rhyme-just-means-any-two' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_011', title: 'Use it in the wild',
          caseStudy: { intro: 'The class comedy team is writing a sketch about animals discussing a human patient. Their first draft just makes the animals trip over furniture and fall down. \'It\'s not landing,\' the director admits.',
            decisions: [{ prompt: 'What actually makes the Dr. Dolittle scenes funny, and how can the team copy that?', options: [
                { text: 'The humour is a role reversal — animals speak with calm, human-like insight while the humans are the confused ones; the parrot Polynesia even teaches the doctor his gift, so the \'wise\' figure is a bird. The sketch should let the animals observe the human\'s strange habits shrewdly — comedy from flipped roles, not from clumsy falls.', outcome: 'Wit in the chapter comes from intelligence placed where nobody expects it — the joke is that animals understand humans better than humans understand animals.' },
                { text: 'The sketch just needs more slapstick — humour means characters looking foolish, so the animals should fall over more.', outcome: 'Falling over is noise without wit — the chapter\'s humour lives in clever reversal and surprising wisdom, not in making anyone look stupid.', reveals: 'humour-equals-falling' },
                { text: 'Animals cannot be the source of wit — the sketch should give the clever lines back to a human character.', outcome: 'That reverses the reversal — Polynesia the parrot is the story\'s source of success precisely because the unexpected character holds the knowledge.', reveals: 'only-humans-are-funny' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_016', title: 'The bigger picture',
          caseStudy: { intro: 'The funniest stories rarely tell jokes — they quietly flip the world upside down and let us laugh at ourselves.',
            decisions: [{ prompt: 'What comes next? Wit and Humour · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Wit and Humour · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u2_011', difficulty: 'standard',
          question: 'A plot is the sequence of major events that make up a story, while humour.',
          hint: 'Review the "Let us discuss" sections in the chapter for simple plot summaries.',
          misconception: 'Students often think "humour" only means "telling a joke." They fail to see that humour can also come from a situation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A plot is the sequence of major events that make up a story, while humour refers to the',
                  options: ['A plot is the sequence of major events that make up a story, while humour refers to the', 'Character analysis is the process of examining a character\'s traits, motivations, and', 'Communication and empathy are the abilities to understand, share, and respond to the', 'Tone in poetry is the poet\'s emotional attitude toward the subject (e.g., playful,'],
                  hint: 'Review the "Let us discuss" sections in the chapter for simple plot summaries.',
                  misconception: 'Students often think "humour" only means "telling a joke." They fail to see that humour can also come from a situation being strange.' }
          ],
            remediations: { 'humour-only-means-telling-a': { steps: ['If a student struggles, ask them: "What would happen if your teacher acted like a student and you acted like the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_012', difficulty: 'standard',
          question: 'Character analysis is the process of examining a character\'s traits.',
          hint: 'Review the "Let us discuss" sections in the chapter to see how characters react to events.',
          misconception: 'Students often confuse \'feelings\' with \'traits.\' A feeling is temporary (like feeling sad because of a rainstorm), but.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis is the process of examining a character\'s traits, motivations, and',
                  options: ['Character analysis is the process of examining a character\'s traits, motivations, and', 'A plot is the sequence of major events that make up a story, while humour refers to the', 'Communication and empathy are the abilities to understand, share, and respond to the', 'Tone in poetry is the poet\'s emotional attitude toward the subject (e.g., playful,'],
                  hint: 'Review the "Let us discuss" sections in the chapter to see how characters react to events.',
                  misconception: 'Students often confuse \'feelings\' with \'traits.\' A feeling is temporary (like feeling sad because of a rainstorm), but a trait is a lasting.' }
          ],
            remediations: { 'students-often-confuse-feelings-with': { steps: ['If the student confuses feelings with traits, ask them: "Does the character feel this way for one minute, or is this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse \'feelings\' with \'traits.\' A feeling is temporary (like feeling sad because of a rainstorm), but.',
          parts: [
                { id: 'a', prompt: 'Is it enough to say "Dr. Dolittle is nice"? Why or why not?', answer: 'No, because "nice" is too general',
                  options: ['No, because "nice" is too general', 'simple labels are sufficient for analysis'],
                  hint: 'Review the "Let us discuss" sections in the chapter to see how characters react to events.',
                  misconception: 'Students often confuse \'feelings\' with \'traits.\' A feeling is temporary (like feeling sad because of a rainstorm), but a trait is a lasting.' }
          ],
            remediations: { 'students-often-confuse-feelings-with': { steps: ['If the student confuses feelings with traits, ask them: "Does the character feel this way for one minute, or is this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_013', difficulty: 'standard',
          question: 'Communication and empathy are the abilities to understand, share, and respond.',
          hint: 'Review the concept of "perspective-taking" by asking the student to describe a school.',
          misconception: 'Students often think empathy is just "being nice." They confuse being polite with the deeper work of empathy, which.',
          parts: [
                { id: 'a', prompt: 'If a character sees someone crying but does not try to find out why, are they showing empathy? Why or why not?', answer: 'No, they are not',
                  options: ['No, they are not', 'being nice', 'empathy is just "being nice'],
                  hint: 'Review the concept of "perspective-taking" by asking the student to describe a school event from.',
                  misconception: 'Students often think empathy is just "being nice." They confuse being polite with the deeper work of empathy, which involves actively.' }
          ],
            remediations: { 'empathy-is-just-being-nice': { steps: ['Ask the student to recount a time they felt misunderstood.', 'Then, ask them to imagine what that other person would have needed to do to "understand" them better (e.g., listen, ask.', 'Explain that empathy is the act of providing that "listening space" for someone else.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_014', difficulty: 'standard',
          question: 'Tone in poetry is the poet\'s emotional attitude toward the subject (e.g.',
          hint: 'Review the "Let us discuss" sections in the chapter to practice identifying what.',
          misconception: 'Students often think humour is only about "funny words" (like adjectives) rather than the "funny action" (the plot.',
          parts: [
                { id: 'a', prompt: 'If a poem describes a man wearing shoes on his hands, why is this funny? Answer: It is funny because it is the opposite of what we expect.', answer: 'It is funny because it creates a surprise—we expect shoes on feet, not hands',
                  options: ['It is funny because it creates a surprise—we expect shoes on feet, not hands', 'funny words', 'funny action'],
                  hint: 'Review the "Let us discuss" sections in the chapter to practice identifying what characters.',
                  misconception: 'Students often think humour is only about "funny words" (like adjectives) rather than the "funny action" (the plot or situation).' },
                { id: 'b', prompt: 'A poem says a man went for a swim in the desert. How would you describe the tone? Answer: The tone is absurd or humorous.', answer: 'The tone is absurd or playful',
                  options: ['The tone is absurd or playful', 'funny words', 'funny action'],
                  hint: 'Review the "Let us discuss" sections in the chapter to practice identifying what characters.',
                  misconception: 'Students often think humour is only about "funny words" (like adjectives) rather than the "funny action" (the plot or situation).' }
          ],
            remediations: { 'humour-is-only-about-funny': { steps: ['Ask the student to draw a picture of the action described in the poem.', 'If the picture shows something impossible (like a dog flying), ask them: "Would a real dog do this?" When they say.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_015', difficulty: 'standard',
          question: 'Poetic devices are creative tools used by poets to make language more.',
          hint: 'Review syllable counting and end-sound matching.',
          misconception: 'Students often think "rhyme" just means any two words that sound vaguely similar, like "cat" and "car," or they think.',
          parts: [
                { id: 'a', prompt: 'What do we call the technique where a poet uses the same word or phrase multiple times to emphasize a point or make the reader laugh?', answer: 'It is called repetition',
                  options: ['It is called repetition', 'just means any two words that sound vaguely similar, like', 'or they think', '"repetition" must happen in every single line'],
                  hint: 'Review syllable counting and end-sound matching.',
                  misconception: 'Students often think "rhyme" just means any two words that sound vaguely similar, like "cat" and "car," or they think "repetition" must.' },
                { id: 'b', prompt: 'If a poem uses the words "cat" and "hat" at the end of two lines, what device is the poet using? Explain why this makes the poem feel "light."', answer: 'The poet is using rhyme',
                  options: ['The poet is using rhyme', 'just means any two words that sound vaguely similar, like', 'or they think', '"repetition" must happen in every single line'],
                  hint: 'Review syllable counting and end-sound matching.',
                  misconception: 'Students often think "rhyme" just means any two words that sound vaguely similar, like "cat" and "car," or they think "repetition" must.' }
          ],
            remediations: { 'rhyme-just-means-any-two': { steps: ['If a student struggles, ask them to clap out the syllables of a line.', 'Then, ask them to isolate the very last sound of the line.', 'Explain that "rhyme" requires the *final* vowel and consonant sounds to match perfectly.', 'Practice with simple pairs like "ball/tall" before moving to more complex poetry.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_016', difficulty: 'standard',
          question: 'A limerick is a short, five-line poem that follows a bouncy "AABBA" rhyme.',
          hint: 'Review basic rhyming word lists (e.g., cat/hat/bat).',
          misconception: 'Students often try to make all five lines the same length or ignore the rhythm entirely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A limerick is a short, five-line poem that follows a bouncy "AABBA" rhyme scheme and is',
                  options: ['A limerick is a short, five-line poem that follows a bouncy "AABBA" rhyme scheme and is', 'A plot is the sequence of major events that make up a story, while humour refers to the', 'Character analysis is the process of examining a character\'s traits, motivations, and', 'Communication and empathy are the abilities to understand, share, and respond to the'],
                  hint: 'Review basic rhyming word lists (e.g., cat/hat/bat).',
                  misconception: 'Students often try to make all five lines the same length or ignore the rhythm entirely.' }
          ],
            remediations: { 'students-often-try-to-make': { steps: ['Clap your hands to the rhythm of a known limerick.', 'Ask the student to identify which lines are "long" and which are "short" by clapping slowly for long lines and quickly.', 'Practice matching rhymes before writing, ensuring they have two A-rhyme words and two B-rhyme words ready before they.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
