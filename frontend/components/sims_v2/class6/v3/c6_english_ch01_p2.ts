import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch01_p2: SimDef = {
    id: 'v3_c6_english_ch01_p2',
    title: 'Learning Together · Part 2/2',
    subtitle: 'This node covers the strategy of using context clues to derive word meaning.',
    classLevel: 6, subject: 'english', topic: 'Learning Together · Part 2/2',
    chapters: ['c6_english_ch01'],
    nodeIds: ['c6_english_u1_007', 'c6_english_u1_008', 'c6_english_u1_009', 'c6_english_u1_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever been reading a story and bumped into a word you didn’t recognize, like \'tended\' or \'muttered\'?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A teacher moves a story about a girl hearing a river speak from a quiet riverbank to a noisy, crowded classroom — and suddenly the whole story stops working. What broke it?',
        options: ['The quiet riverbank gave the girl the solitude to hear and reflect — the setting itself drives the events', 'Nothing broke — settings are just decoration and characters act the same anywhere', 'The classroom broke it only because the weather changed', 'The story broke because classrooms are always sad places in books'],
        answer: 'The quiet riverbank gave the girl the solitude to hear and reflect — the setting itself drives the events',
        hook: 'Setting is not just scenery or weather. A quiet riverbank is a border between the familiar village and the unknown world — move the scene and the big moment can no longer happen.',
    },
    teaching: [
        { title: 'Vocabulary in Context: Words from the Unit', text: 'Vocabulary in context is the skill of determining the meaning of an unfamiliar word by looking at the clues provided in the surrounding sentences or the overall theme of the passage.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u1_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Move the moment the river speaks into a crowded classroom, prove why the plot falls apart — then redesign one detail of the setting so the voice can still reach her.',
        labels: ['Vocabulary in Context: Words', 'Grammar: Nouns and Pronouns', 'Writing: Letter Writing', 'Speaking and Listening: Expressing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u1_007', title: 'Vocabulary in Context: Words from the Unit',
          caseStudy: { intro: 'Have you ever been reading a story and bumped into a word you didn’t recognize, like \'tended\' or \'muttered\'?',
            decisions: [{ prompt: 'What is the primary difference between finding a word\'s meaning in a dictionary versus using context?', options: [
                { text: 'A dictionary gives a fixed, general definition, whereas context clues provide a meaning', outcome: 'A dictionary gives a fixed, general definition, whereas context clues provide a meaning specific.' },
                { text: 'guessing', outcome: 'Not quite — Students often think context clues must be a direct definition (like "A plantation is a place.', reveals: 'context-clues-must-be-a' },
                { text: 'A plantation is a place where', outcome: 'Not quite — Students often think context clues must be a direct definition (like "A plantation is a place.', reveals: 'context-clues-must-be-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_010', title: 'Speaking and Listening: Expressing Ideas and Listening Skills',
          caseStudy: { intro: 'Have you ever tried to tell a friend about a great movie, but they didn\'t understand why you liked it because you were speaking too fast?',
            decisions: [{ prompt: 'What are the three parts of a well-organized spoken idea?', options: [
                { text: 'The three parts are stating the idea, providing a reason for it, and giving an example', outcome: 'The three parts are stating the idea, providing a reason for it, and giving an example.' },
                { text: 'talking', outcome: 'Not quite — Students often think "listening" is just the absence of talking.', reveals: 'listening-is-just-the-absence' },
                { text: 'listening', outcome: 'Not quite — Students often think "listening" is just the absence of talking.', reveals: 'listening-is-just-the-absence' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is writing a story about a girl who finally decides to ask to go to school. Her draft just says \'then she decided.\' Her teacher suggests she look at how the river in Jahnavi\'s story marked the turning point without naming it.',
            decisions: [{ prompt: 'How can a writer show a turning point instead of announcing it?', options: [
                { text: 'Let the setting carry the moment — in the story, the river seems to speak to Jahnavi exactly when she is poised between staying and daring, so the place itself voices her inner turn. The student can do the same: have something in the scene — a road stretching past the house, a school bell carrying over fields — \'answer\' the girl at the instant her decision forms.', outcome: 'Setting does more than decorate a story: a living detail of place can mirror and mark the character\'s inner change, making the turning point felt rather than stated.' },
                { text: 'She should simply write \'this was the turning point\' — clarity is always better than hints.', outcome: 'Announcing it flattens the moment — the river works because readers feel Jahnavi\'s decision through the scene instead of being told about it.', reveals: 'turning-point-needs-label' },
                { text: 'The setting is irrelevant — turning points belong inside the character\'s head, so the background should be ignored.', outcome: 'The story uses the riverbank deliberately — the turning point is written through the setting, and a writer who ignores the scene loses that tool.', reveals: 'setting-is-decoration' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_010', title: 'You made it',
          caseStudy: { intro: 'The setting is the stage, and the plot is the performance. Change the stage, and the performance may never begin.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u1_007', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the meaning of an unfamiliar.',
          hint: 'Review sentence structure (Subject-Verb-Object).',
          misconception: 'Students often think context clues must be a direct definition (like "A plantation is a place where...").',
          parts: [
                { id: 'a', prompt: 'If a sentence says, "The vast plantation stretched across the entire village, covering hundreds of acres," what does \'vast\' likely mean?', answer: '\'Vast\' means very large or huge',
                  options: ['\'Vast\' means very large or huge', 'A plantation is a place where', 'context clues must be a direct definition (like "A plantation is a place where'],
                  hint: 'Review sentence structure (Subject-Verb-Object).',
                  misconception: 'Students often think context clues must be a direct definition (like "A plantation is a place where...").' },
                { id: 'b', prompt: 'A sentence says, "The sage sat quietly, whispering ancient secrets, and then he muttered a final, low-voiced prayer." Based on the clues, what does \'muttered\'.', answer: 'Step 1: Identify the mystery word (muttered)',
                  options: ['Step 1: Identify the mystery word (muttered)', 'A plantation is a place where', 'context clues must be a direct definition (like "A plantation is a place where'],
                  hint: 'Review sentence structure (Subject-Verb-Object).',
                  misconception: 'Students often think context clues must be a direct definition (like "A plantation is a place where...").' }
          ],
            remediations: { 'context-clues-must-be-a': { steps: ['Ask the student to reread the sentence aloud and emphasize the words *around* the mystery word.', 'Ask, "What picture does this scene paint in your head?" 3.', 'Help them identify verbs (actions) or adjectives (descriptions) that provide clues.', 'Have them replace the mystery word with their guessed meaning to see if the sentence still makes sense.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_008', difficulty: 'standard',
          question: 'A noun is a word that names a person, place, thing, or idea, while a pronoun.',
          hint: 'Review simple Noun identification (naming people, places, things).',
          misconception: 'Students often mistake pronouns for nouns because they both occupy the subject position in a sentence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A noun is a word that names a person, place, thing, or idea, while a pronoun is a',
                  options: ['A noun is a word that names a person, place, thing, or idea, while a pronoun is a', 'The "plot" is the sequence of events that make up a story\'s action, while the "setting"', 'Character analysis is the process of looking at what a character says, does, and feels to', 'A theme is the central, underlying message or "big idea" about life that an author'],
                  hint: 'Review simple Noun identification (naming people, places, things).',
                  misconception: 'Students often mistake pronouns for nouns because they both occupy the subject position in a sentence.' }
          ],
            remediations: { 'students-often-mistake-pronouns-for': { steps: ['If the student struggles, draw two columns: \'Name Tags\' (Nouns) and \'Nicknames\' (Pronouns).', 'Write \'Rama Natha\' under Name Tags and \'He\' under Nicknames.', 'Ask them to practice replacing the Name Tag with the Nickname in simple sentences until they see that the Nickname only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_009', difficulty: 'standard',
          question: 'Letter writing is a structured way of communicating messages to specific.',
          hint: 'Review the use of adjectives and sensory verbs in the textbook chapter.',
          misconception: 'Students often mistake descriptive writing for a list of adjectives.',
          parts: [
                { id: 'a', prompt: 'Compare the sentence "The banana is yellow" with "The banana has a smooth, yellow peel and tastes like creamy vanilla." Which is better for descriptive writing.', answer: 'The second sentence is better',
                  options: ['The second sentence is better', 'adding detail'],
                  hint: 'Review the use of adjectives and sensory verbs in the textbook chapter.',
                  misconception: 'Students often mistake descriptive writing for a list of adjectives.' }
          ],
            remediations: { 'students-often-mistake-descriptive-writing': { steps: ['If a student provides a list, tell them: "Choose one adjective and show me how it happens." Ask them, "Instead.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_010', difficulty: 'standard',
          question: 'Speaking and listening are active communication skills where you organize your.',
          hint: 'Review the main events of "A Bottle of Dew" to ensure they understand the characters\'.',
          misconception: 'Students often think "listening" is just the absence of talking.',
          parts: [
                { id: 'a', prompt: 'Why is it important to change your tone and pace when speaking to a group?', answer: 'It keeps the listeners interested and helps them understand',
                  options: ['It keeps the listeners interested and helps them understand', 'listening', 'speaking is monotone', '"listening" is just the absence of talking'],
                  hint: 'Review the main events of "A Bottle of Dew" to ensure they understand the characters\' actions.',
                  misconception: 'Students often think "listening" is just the absence of talking.' }
          ],
            remediations: { 'listening-is-just-the-absence': { steps: ['Explain that listening is a "two-way" job.', 'Ask them to repeat the last sentence the speaker said to ensure they were tracking.', 'Teach them to ask one "Why" or "How" question based on the speaker\'s words before sharing their own opinion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "listening" is just the absence of talking.',
          parts: [
                { id: 'a', prompt: 'Create a one-sentence response to the question: "Why do you think the Sage tricked Rama Natha?" using a clear reason and example.', answer: 'The response should be: "The Sage tricked him',
                  options: ['The response should be: "The Sage tricked him', 'listening', '"listening" is just the absence of talking'],
                  hint: 'Review the main events of "A Bottle of Dew" to ensure they understand the characters\' actions.',
                  misconception: 'Students often think "listening" is just the absence of talking.' }
          ],
            remediations: { 'listening-is-just-the-absence': { steps: ['Explain that listening is a "two-way" job.', 'Ask them to repeat the last sentence the speaker said to ensure they were tracking.', 'Teach them to ask one "Why" or "How" question based on the speaker\'s words before sharing their own opinion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
