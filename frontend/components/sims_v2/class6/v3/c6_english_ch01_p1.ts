import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch01_p1: SimDef = {
    id: 'v3_c6_english_ch01_p1',
    title: 'Learning Together · Part 1/2',
    subtitle: 'This node covers the identification of plot (beginning, middle, end) and setting.',
    classLevel: 6, subject: 'english', topic: 'Learning Together · Part 1/2',
    chapters: ['c6_english_ch01'],
    nodeIds: ['c6_english_u1_001', 'c6_english_u1_002', 'c6_english_u1_003', 'c6_english_u1_004', 'c6_english_u1_005', 'c6_english_u1_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are playing your favorite game; you need to know where you are standing (setting) and what.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A teacher moves a story about a girl hearing a river speak from a quiet riverbank to a noisy, crowded classroom — and suddenly the whole story stops working. What broke it?',
        options: ['The quiet riverbank gave the girl the solitude to hear and reflect — the setting itself drives the events', 'Nothing broke — settings are just decoration and characters act the same anywhere', 'The classroom broke it only because the weather changed', 'The story broke because classrooms are always sad places in books'],
        answer: 'The quiet riverbank gave the girl the solitude to hear and reflect — the setting itself drives the events',
        hook: 'Setting is not just scenery or weather. A quiet riverbank is a border between the familiar village and the unknown world — move the scene and the big moment can no longer happen.',
    },
    teaching: [
        { title: 'Story: "The Day the River Spoke" -- Plot and Setting', text: 'The "plot" is the sequence of events that make up a story\'s action, while the "setting" is the time and place where these events occur, acting as the foundation for the characters\' journey.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u1_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Move the moment the river speaks into a crowded classroom, prove why the plot falls apart — then redesign one detail of the setting so the voice can still reach her.',
        labels: ['Story: "The Day', 'Poem: King Bruce Narrative', 'Poem: Poetic Devices --', 'Poetry Form: Narrative Poetry'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u1_001', title: 'Story: "The Day the River Spoke" -- Plot and Setting',
          caseStudy: { intro: 'Imagine you are playing your favorite game; you need to know where you are standing (setting) and what happens next to win the level (plot).',
            decisions: [{ prompt: 'What is the "plot" of a story?', options: [
                { text: 'The plot is the sequence of events that tell the story, usually starting with a', outcome: 'The plot is the sequence of events that tell the story, usually starting with a situation, moving.' },
                { text: 'setting', outcome: 'Not quite — Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").', reveals: 'the-setting-is-only-the' },
                { text: 'it is sunny', outcome: 'Not quite — Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").', reveals: 'the-setting-is-only-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_002', title: 'Story: "The Day the River Spoke" -- Character Analysis: Jahnavi',
          caseStudy: { intro: 'Have you ever wanted to learn something new but felt like you didn\'t have the time or money to do it?',
            decisions: [{ prompt: 'What is the main goal or dream that Jahnavi has in the story?', options: [
                { text: 'Jahnavi dreams of receiving an education and living a life beyond her village', outcome: 'Jahnavi dreams of receiving an education and living a life beyond her village.' },
                { text: 'wishes', outcome: 'Not quite — Students often confuse a character\'s "wishes" with their "personality traits." For example, they.', reveals: 'students-often-confuse-a-character' },
                { text: 'personality traits', outcome: 'Not quite — Students often confuse a character\'s "wishes" with their "personality traits." For example, they.', reveals: 'students-often-confuse-a-character' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_003', title: 'Story: "The Day the River Spoke" -- Theme: Dreams and Determination',
          caseStudy: { intro: 'Have you ever wanted to learn a new skill, like playing the guitar or drawing, but felt like quitting because it was too hard?',
            decisions: [{ prompt: 'What is a \'theme\' in a story?', options: [
                { text: 'A theme is the main message or life lesson an author shares', outcome: 'A theme is the main message or life lesson an author shares. A wrong answer (like "the plot".' },
                { text: 'the plot', outcome: 'Not quite — Students often confuse the "Topic" (e.g., "Bananas" or "Gold") with the "Theme" (e.g., "The value.', reveals: 'students-often-confuse-the-topic' },
                { text: 'the summary', outcome: 'Not quite — Students often confuse the "Topic" (e.g., "Bananas" or "Gold") with the "Theme" (e.g., "The value.', reveals: 'students-often-confuse-the-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_004', title: 'Poem: King Bruce Narrative Poem -- Meaning and Message',
          caseStudy: { intro: 'Have you ever felt like giving up on a math problem or a difficult drawing because you didn\'t get it right the first time?',
            decisions: [{ prompt: 'What is a narrative poem?', options: [
                { text: 'A narrative poem is a poem that tells a story', outcome: 'A narrative poem is a poem that tells a story. A student who misses this likely thinks all poems.' },
                { text: 'persistence', outcome: 'Not quite — Students often think "persistence" means doing the exact same thing over and over again without.', reveals: 'persistence-means-doing-the-exact' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_006', title: 'Poetry Form: Narrative Poetry and Its Features',
          caseStudy: { intro: 'Have you ever told a friend about a movie you saw, explaining how it started, what the main characters did, and how it ended?',
            decisions: [{ prompt: 'What are the three essential components that make a poem a "narrative" poem?', options: [
                { text: 'A narrative poem must have characters, a setting, and a plot (sequence of events)', outcome: 'A narrative poem must have characters, a setting, and a plot (sequence of events).' },
                { text: 'feelings', outcome: 'Not quite — Students often confuse "descriptive poetry" (imagery) with "narrative poetry" (storytelling).', reveals: 'students-often-confuse-descriptive-poetry' },
                { text: 'descriptive poetry', outcome: 'Not quite — Students often confuse "descriptive poetry" (imagery) with "narrative poetry" (storytelling).', reveals: 'students-often-confuse-descriptive-poetry' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is writing a story about a girl who finally decides to ask to go to school. Her draft just says \'then she decided.\' Her teacher suggests she look at how the river in Jahnavi\'s story marked the turning point without naming it.',
            decisions: [{ prompt: 'How can a writer show a turning point instead of announcing it?', options: [
                { text: 'Let the setting carry the moment — in the story, the river seems to speak to Jahnavi exactly when she is poised between staying and daring, so the place itself voices her inner turn. The student can do the same: have something in the scene — a road stretching past the house, a school bell carrying over fields — \'answer\' the girl at the instant her decision forms.', outcome: 'Setting does more than decorate a story: a living detail of place can mirror and mark the character\'s inner change, making the turning point felt rather than stated.' },
                { text: 'She should simply write \'this was the turning point\' — clarity is always better than hints.', outcome: 'Announcing it flattens the moment — the river works because readers feel Jahnavi\'s decision through the scene instead of being told about it.', reveals: 'turning-point-needs-label' },
                { text: 'The setting is irrelevant — turning points belong inside the character\'s head, so the background should be ignored.', outcome: 'The story uses the riverbank deliberately — the turning point is written through the setting, and a writer who ignores the scene loses that tool.', reveals: 'setting-is-decoration' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u1_006', title: 'The bigger picture',
          caseStudy: { intro: 'The setting is the stage, and the plot is the performance. Change the stage, and the performance may never begin.',
            decisions: [{ prompt: 'What comes next? Learning Together · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Learning Together · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u1_001', difficulty: 'standard',
          question: 'The "plot" is the sequence of events that make up a story\'s action, while the.',
          hint: 'Review "Narrative Arc" or basic story sequencing.',
          misconception: 'Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").',
          parts: [
                { id: 'a', prompt: 'What is the "plot" of a story?', answer: 'The plot is the sequence of events that tell the story, usually starting with a',
                  options: ['The plot is the sequence of events that tell the story, usually starting with a', 'setting', 'it is sunny', 'the "setting" is only the weather or the scenery (e'],
                  hint: 'Review "Narrative Arc" or basic story sequencing.',
                  misconception: 'Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").' },
                { id: 'b', prompt: 'Why is the riverbank in this story considered a "liminal" or border space?', answer: 'It is a boundary between the familiar village and the vast, unknown world',
                  options: ['It is a boundary between the familiar village and the vast, unknown world', 'setting', 'it is sunny', 'the "setting" is only the weather or the scenery (e'],
                  hint: 'Review "Narrative Arc" or basic story sequencing.',
                  misconception: 'Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").' }
          ],
            remediations: { 'the-setting-is-only-the': { steps: ['Ask the student to describe a place where they feel calm.', 'Ask them to describe a place where they feel energetic.', 'Explain that these feelings are part of the "setting." 4.', 'Apply this to the story by asking: "Why did the author choose a place where Jahnavi feels calm to have the \'big\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").',
          parts: [
                { id: 'a', prompt: 'Is the setting just a background, or is it an active part of the story? Justify your answer.', answer: 'It is an active part',
                  options: ['It is an active part', 'setting', 'it is sunny', 'settings are merely decorative rather than functional'],
                  hint: 'Review "Narrative Arc" or basic story sequencing.',
                  misconception: 'Students often think the "setting" is only the weather or the scenery (e.g., "it is sunny").' }
          ],
            remediations: { 'the-setting-is-only-the': { steps: ['Ask the student to describe a place where they feel calm.', 'Ask them to describe a place where they feel energetic.', 'Explain that these feelings are part of the "setting." 4.', 'Apply this to the story by asking: "Why did the author choose a place where Jahnavi feels calm to have the \'big\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_002', difficulty: 'standard',
          question: 'Character analysis is the process of looking at what a character says, does.',
          hint: 'Review the "Let us discuss" sections of the chapter to identify basic plot points before.',
          misconception: 'Students often confuse a character\'s "wishes" with their "personality traits." For example, they might say "Jahnavi.',
          parts: [
                { id: 'a', prompt: 'What is the main goal or dream that Jahnavi has in the story?', answer: 'Jahnavi dreams of receiving an education and living a life beyond her village',
                  options: ['Jahnavi dreams of receiving an education and living a life beyond her village', 'wishes', 'personality traits', 'Jahnavi is educated'],
                  hint: 'Review the "Let us discuss" sections of the chapter to identify basic plot points before moving.',
                  misconception: 'Students often confuse a character\'s "wishes" with their "personality traits." For example, they might say "Jahnavi is educated" because.' },
                { id: 'b', prompt: 'If Jahnavi were offered a chance to travel to a city for school but had to leave her brothers behind, how might she react based on her character?', answer: 'She would likely feel torn',
                  options: ['She would likely feel torn', 'wishes', 'personality traits', 'Jahnavi is educated'],
                  hint: 'Review the "Let us discuss" sections of the chapter to identify basic plot points before moving.',
                  misconception: 'Students often confuse a character\'s "wishes" with their "personality traits." For example, they might say "Jahnavi is educated" because.' }
          ],
            remediations: { 'students-often-confuse-a-character': { steps: ['Ask the student to fill in a "T-chart." On the left side, list actions (what she does).', 'On the right side, list the personality trait those actions prove (e.g., "She reads discarded newspapers" = "She.', 'Explain that traits are the *reason* for the actions, not the actions themselves.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_003', difficulty: 'standard',
          question: 'A theme is the central, underlying message or "big idea" about life that.',
          hint: 'Review the definition of \'Character Motivation\'—why a character wants what they want.',
          misconception: 'Students often confuse the "Topic" (e.g., "Bananas" or "Gold") with the "Theme" (e.g., "The value of hard work").',
          parts: [
                { id: 'a', prompt: 'What is a \'theme\' in a story?', answer: 'A theme is the main message or life lesson an author shares',
                  options: ['A theme is the main message or life lesson an author shares', 'the plot', 'the summary'],
                  hint: 'Review the definition of \'Character Motivation\'—why a character wants what they want.',
                  misconception: 'Students often confuse the "Topic" (e.g., "Bananas" or "Gold") with the "Theme" (e.g., "The value of hard work").' }
          ],
            remediations: { 'students-often-confuse-the-topic': { steps: ['If a student confuses topic and theme, ask: "What did the character learn?" rather than "What was the story about?".', 'Then, ask them to form a sentence that connects those two points into a life lesson.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_004', difficulty: 'standard',
          question: 'A narrative poem is a type of poetry that tells a story, featuring characters.',
          hint: 'Review basic story elements (who, what, where).',
          misconception: 'Students often think "persistence" means doing the exact same thing over and over again without changing.',
          parts: [
                { id: 'a', prompt: 'What is a narrative poem?', answer: 'A narrative poem is a poem that tells a story',
                  options: ['A narrative poem is a poem that tells a story', 'persistence'],
                  hint: 'Review basic story elements (who, what, where).',
                  misconception: 'Students often think "persistence" means doing the exact same thing over and over again without changing.' },
                { id: 'b', prompt: 'Why did King Bruce watch the spider in the cave?', answer: 'He watched the spider',
                  options: ['He watched the spider', 'persistence'],
                  hint: 'Review basic story elements (who, what, where).',
                  misconception: 'Students often think "persistence" means doing the exact same thing over and over again without changing.' },
                { id: 'c', prompt: 'If you try to build a tower of blocks and it falls three times, what is the \'King Bruce\' way to handle it?', answer: 'The \'King Bruce\' way is to try a fourth time, perhaps changing your technique',
                  options: ['The \'King Bruce\' way is to try a fourth time, perhaps changing your technique', 'persistence'],
                  hint: 'Review basic story elements (who, what, where).',
                  misconception: 'Students often think "persistence" means doing the exact same thing over and over again without changing.' },
                { id: 'd', prompt: 'How does the spider act as a symbol for King Bruce?', answer: 'The spider represents the quality of persistence',
                  options: ['The spider represents the quality of persistence', 'persistence'],
                  hint: 'Review basic story elements (who, what, where).',
                  misconception: 'Students often think "persistence" means doing the exact same thing over and over again without changing.' }
          ],
            remediations: { 'persistence-means-doing-the-exact': { steps: ['Ask the student: "If the spider fell and hit the same spot every time, would it ever reach the other side?" Guide them.', 'Ask them to think of a time they changed how they held a pen or a ball to get better at a task.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_005', difficulty: 'standard',
          question: 'Poetic devices are creative tools like rhyme, metaphor, and imagery that poets.',
          hint: 'Review the difference between "fact" and "opinion/comparison."',
          misconception: 'Students often confuse metaphors with similes. They think any comparison is a metaphor, even when it uses "like".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Poetic devices are creative tools like rhyme, metaphor, and imagery that poets use to',
                  options: ['Poetic devices are creative tools like rhyme, metaphor, and imagery that poets use to', 'The "plot" is the sequence of events that make up a story\'s action, while the "setting"', 'Character analysis is the process of looking at what a character says, does, and feels to', 'A theme is the central, underlying message or "big idea" about life that an author'],
                  hint: 'Review the difference between "fact" and "opinion/comparison."',
                  misconception: 'Students often confuse metaphors with similes. They think any comparison is a metaphor, even when it uses "like" or "as." For example, if.' }
          ],
            remediations: { 'students-often-confuse-metaphors-with': { steps: ['Ask the student to circle the comparison word ("like" or "as") in their sentence.', 'If they find it, explain that metaphors are "secret" comparisons that skip the bridge words.', 'Show them: "The moon is a coin" (Metaphor) vs.', '"The moon is like a coin" (Simile).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u1_006', difficulty: 'standard',
          question: 'Narrative poetry is a form of poetry that tells a complete story, featuring.',
          hint: 'Review basic story elements (Setting, Characters, Plot).',
          misconception: 'Students often confuse "descriptive poetry" (imagery) with "narrative poetry" (storytelling).',
          parts: [
                { id: 'a', prompt: 'If a poem describes the beauty of a sunset without mentioning any characters or actions, is it a narrative poem? Why or why not?', answer: 'No, it is not a narrative poem',
                  options: ['No, it is not a narrative poem', 'descriptive poetry', 'narrative poetry', 'any poem that uses descriptive words is a story'],
                  hint: 'Review basic story elements (Setting, Characters, Plot).',
                  misconception: 'Students often confuse "descriptive poetry" (imagery) with "narrative poetry" (storytelling).' },
                { id: 'b', prompt: 'A short poem describes a squirrel finding an acorn, hiding it, and then forgetting where it buried it. Identify the plot sequence here.', answer: 'Beginning: The squirrel finds the acorn',
                  options: ['Beginning: The squirrel finds the acorn', 'descriptive poetry', 'narrative poetry'],
                  hint: 'Review basic story elements (Setting, Characters, Plot).',
                  misconception: 'Students often confuse "descriptive poetry" (imagery) with "narrative poetry" (storytelling).' }
          ],
            remediations: { 'students-often-confuse-descriptive-poetry': { steps: ['If a student struggles, ask them: "Does this poem tell you what happened next, or does it just tell you what something.', 'If they cannot fill in all three steps, it is likely not a narrative poem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
