import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch02_p2: SimDef = {
    id: 'v3_c6_english_ch02_p2',
    title: 'Wit and Humour · Part 2/2',
    subtitle: 'This node covers vocabulary analysis within the provided unit (Wit and Humour/Friendship).',
    classLevel: 6, subject: 'english', topic: 'Wit and Humour · Part 2/2',
    chapters: ['c6_english_ch02'],
    nodeIds: ['c6_english_u2_017', 'c6_english_u2_018', 'c6_english_u2_019', 'c6_english_u2_020'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever seen a word in a story that you didn\'t know, but you still understood what was happening?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A story about a doctor who stops treating humans and takes language lessons from a parrot makes readers laugh — yet nobody in it tells a single joke. Where is the humour hiding?',
        options: ['In the absurd role-reversal — the expert doctor becomes a student of the parrot', 'In clever jokes the animals tell each other', 'In the animals doing silly tricks for no reason', 'It is not really funny — readers are just being polite'],
        answer: 'In the absurd role-reversal — the expert doctor becomes a student of the parrot',
        hook: 'Humour is not only jokes. When characters act the opposite of what we expect — a doctor learning from an animal — the surprise itself is funny.',
    },
    teaching: [
        { title: 'Vocabulary in Context: Words from the Unit', text: 'Vocabulary in context refers to determining the meaning of a word by analyzing the clues provided by the sentences and the overall situation surrounding it, rather than relying solely on.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u2_017', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the plot from ordinary doctor to animal doctor and pin down exactly which flipped expectation makes each scene funny.',
        labels: ['Vocabulary in Context: Words', 'Grammar: Tenses -- Present', 'Writing: Dialogue Writing', 'Speaking and Listening: Storytelling'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u2_017', title: 'Vocabulary in Context: Words from the Unit',
          caseStudy: { intro: 'Have you ever seen a word in a story that you didn\'t know, but you still understood what was happening?',
            decisions: [{ prompt: 'What does it mean to understand a word "in context"?', options: [
                { text: 'It means using the surrounding sentences and the story\'s events to figure out what a word', outcome: 'It means using the surrounding sentences and the story\'s events to figure out what a word means.' },
                { text: 'they must always use a dictionary, failing to use clues in the text', outcome: 'Not quite — Students often guess the meaning of a word based on its "sound" or by picking the first synonym.', reveals: 'students-often-guess-the-meaning' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_019', title: 'Writing: Dialogue Writing and Humorous Pieces',
          caseStudy: { intro: 'Have you ever tried to tell a friend a funny story that happened at home, but forgot to say exactly what your mother said?',
            decisions: [{ prompt: 'What punctuation mark must always be used to show that a character is speaking?', options: [
                { text: 'Quotation marks (also called speech marks or inverted commas: " ")', outcome: 'Quotation marks (also called speech marks or inverted commas: " ").' },
                { text: 'transcript', outcome: 'Not quite — Students often think dialogue needs to be a "transcript" of every word said in real life, including.', reveals: 'dialogue-needs-to-be-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_020', title: 'Speaking and Listening: Storytelling and Recitation',
          caseStudy: { intro: 'Have you ever noticed how your favorite cartoon character sounds different when they are excited versus when they are scared?',
            decisions: [{ prompt: 'What are two vocal techniques a storyteller can use to keep an audience interested?', options: [
                { text: 'Two techniques are varying the pace (speed) and changing the pitch (tone) of the voice', outcome: 'Two techniques are varying the pace (speed) and changing the pitch (tone) of the voice for.' },
                { text: 'reading very fast', outcome: 'Not quite — Students often think "recitation" is just memorizing lines and saying them as fast as possible.', reveals: 'recitation-is-just-memorizing-lines' },
                { text: 'recitation', outcome: 'Not quite — Students often think "recitation" is just memorizing lines and saying them as fast as possible.', reveals: 'recitation-is-just-memorizing-lines' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_017', title: 'Use it in the wild',
          caseStudy: { intro: 'The class comedy team is writing a sketch about animals discussing a human patient. Their first draft just makes the animals trip over furniture and fall down. \'It\'s not landing,\' the director admits.',
            decisions: [{ prompt: 'What actually makes the Dr. Dolittle scenes funny, and how can the team copy that?', options: [
                { text: 'The humour is a role reversal — animals speak with calm, human-like insight while the humans are the confused ones; the parrot Polynesia even teaches the doctor his gift, so the \'wise\' figure is a bird. The sketch should let the animals observe the human\'s strange habits shrewdly — comedy from flipped roles, not from clumsy falls.', outcome: 'Wit in the chapter comes from intelligence placed where nobody expects it — the joke is that animals understand humans better than humans understand animals.' },
                { text: 'The sketch just needs more slapstick — humour means characters looking foolish, so the animals should fall over more.', outcome: 'Falling over is noise without wit — the chapter\'s humour lives in clever reversal and surprising wisdom, not in making anyone look stupid.', reveals: 'humour-equals-falling' },
                { text: 'Animals cannot be the source of wit — the sketch should give the clever lines back to a human character.', outcome: 'That reverses the reversal — Polynesia the parrot is the story\'s source of success precisely because the unexpected character holds the knowledge.', reveals: 'only-humans-are-funny' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u2_020', title: 'You made it',
          caseStudy: { intro: 'The funniest stories rarely tell jokes — they quietly flip the world upside down and let us laugh at ourselves.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u2_017', difficulty: 'standard',
          question: 'Vocabulary in context refers to determining the meaning of a word by analyzing.',
          hint: 'Review the "Let us learn" section for vocabulary definitions.',
          misconception: 'Students often guess the meaning of a word based on its "sound" or by picking the first synonym they find in.',
          parts: [
                { id: 'a', prompt: 'Analyze how the word "strayed" in the story helps us understand the dog\'s situation before he met the elephant.', answer: '"Strayed" implies the dog was lost or wandered away by mistake',
                  options: ['"Strayed" implies the dog was lost or wandered away by mistake', 'Strayed', 'tired and hungry'],
                  hint: 'Review the "Let us learn" section for vocabulary definitions.',
                  misconception: 'Students often guess the meaning of a word based on its "sound" or by picking the first synonym they find in a dictionary without checking.' }
          ],
            remediations: { 'students-often-guess-the-meaning': { steps: ['First, ask the student to read the two sentences before and after the target word aloud.', 'Second, ask them to identify one "clue" word in those sentences that describes a feeling or an action.', 'Third, have them try replacing the target word with their guess; if the new sentence sounds strange or changes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_017', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often guess the meaning of a word based on its "sound" or by picking the first synonym they find in.',
          parts: [
                { id: 'a', prompt: 'Critique the use of the word "invisible" to describe the chair in Mario\'s story—is it truly magic, or is it a tool for a lesson?', answer: 'It is a tool for a lesson',
                  options: ['It is a tool for a lesson', 'the chair is literally supernatural, missing the metaphorical theme of the story'],
                  hint: 'Review the "Let us learn" section for vocabulary definitions.',
                  misconception: 'Students often guess the meaning of a word based on its "sound" or by picking the first synonym they find in a dictionary without checking.' }
          ],
            remediations: { 'students-often-guess-the-meaning': { steps: ['First, ask the student to read the two sentences before and after the target word aloud.', 'Second, ask them to identify one "clue" word in those sentences that describes a feeling or an action.', 'Third, have them try replacing the target word with their guess; if the new sentence sounds strange or changes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_018', difficulty: 'standard',
          question: 'Tenses indicate the time of an action: the Present Tense describes actions.',
          hint: 'Review simple sentences and underline every action word you see in a paragraph.',
          misconception: 'Students often add "-ed" to every verb to make it past tense, regardless of whether it is regular or irregular (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tenses indicate the time of an action: the Present Tense describes actions happening now',
                  options: ['Tenses indicate the time of an action: the Present Tense describes actions happening now', 'A plot is the sequence of major events that make up a story, while humour refers to the', 'Character analysis is the process of examining a character\'s traits, motivations, and', 'Communication and empathy are the abilities to understand, share, and respond to the'],
                  hint: 'Review simple sentences and underline every action word you see in a paragraph.',
                  misconception: 'Students often add "-ed" to every verb to make it past tense, regardless of whether it is regular or irregular (e.g., saying "eated".' }
          ],
            remediations: { 'students-often-add-ed-to': { steps: ['First, show the student a list of "Action Changers" (irregular verbs) versus "Add-on verbs" (-ed).', 'Have them practice sorting verbs into "Follows the Rule" and "Breaks the Rule." Then, ask them to read their sentence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_019', difficulty: 'standard',
          question: 'Dialogue writing is the art of recording the exact spoken words between two.',
          hint: 'Review the use of speech marks and basic sentence punctuation.',
          misconception: 'Students often think dialogue needs to be a "transcript" of every word said in real life, including "um," "ah," and.',
          parts: [
                { id: 'a', prompt: 'What punctuation mark must always be used to show that a character is speaking?', answer: 'Quotation marks (also called speech marks or inverted commas: " ")',
                  options: ['Quotation marks (also called speech marks or inverted commas: " ")', 'transcript'],
                  hint: 'Review the use of speech marks and basic sentence punctuation.',
                  misconception: 'Students often think dialogue needs to be a "transcript" of every word said in real life, including "um," "ah," and boring greetings.' }
          ],
            remediations: { 'dialogue-needs-to-be-a': { steps: ['Tell the student to read their dialogue aloud.', 'Ask, "Does this line tell us something new about the character or the plot?" 3.', 'If the answer is "no," tell them to delete it.', 'Guide them to "jump" straight into the action of the conversation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u2_020', difficulty: 'standard',
          question: 'Storytelling and recitation are speaking skills that involve narrating a story.',
          hint: 'Review the definitions of "mood" and "tone" in simple stories.',
          misconception: 'Students often think "recitation" is just memorizing lines and saying them as fast as possible to show they know the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Storytelling and recitation are speaking skills that involve narrating a story or',
                  options: ['Storytelling and recitation are speaking skills that involve narrating a story or', 'A plot is the sequence of major events that make up a story, while humour refers to the', 'Character analysis is the process of examining a character\'s traits, motivations, and', 'Communication and empathy are the abilities to understand, share, and respond to the'],
                  hint: 'Review the definitions of "mood" and "tone" in simple stories.',
                  misconception: 'Students often think "recitation" is just memorizing lines and saying them as fast as possible to show they know the poem.' }
          ],
            remediations: { 'recitation-is-just-memorizing-lines': { steps: ['Ask the student to read the line slowly, syllable by syllable.', 'Ask them to identify one word in the line that describes a sound or feeling (e.g., "whispered").', 'Tell them to change their volume to match that word.', 'Have them re-read the line, focusing only on that one word\'s emotional quality.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
