import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch04_p1: SimDef = {
    id: 'v3_c6_english_ch04_p1',
    title: 'The Tunnel · Part 1/2',
    subtitle: 'This node covers the identification of plot structure and setting within the story "The.',
    classLevel: 6, subject: 'english', topic: 'The Tunnel · Part 1/2',
    chapters: ['c6_english_ch04'],
    nodeIds: ['c6_english_u4_031', 'c6_english_u4_032', 'c6_english_u4_033', 'c6_english_u4_034', 'c6_english_u4_035', 'c6_english_u4_036'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine you are waiting at a busy railway station in India. If you told your friend about your day, would you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A story about a boy near a jungle tunnel spends its first pages on his ordinary daily routine — nothing exciting happens at all. Why would a writer spend so much space on boring details?',
        options: ['Showing what is normal makes the sudden moment of danger feel far more surprising', 'To fill pages — long stories need padding', 'To describe the weather, which is the real point of the story', 'To introduce every villager before the plot begins'],
        answer: 'Showing what is normal makes the sudden moment of danger feel far more surprising',
        hook: 'Plot is not everything a character does. It is the chain of important events that build toward a change — and a calm routine is the author loading the spring.',
    },
    teaching: [
        { title: 'Story: "The Tunnel" -- Plot and Setting', text: 'The "plot" is the sequence of events that make up a story\'s action, while the "setting" is the time and place where these events occur.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u4_031', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map where a boy waits at a hot, still jungle tunnel each day, then mark the exact event that snaps his routine and pulls the story into danger.',
        labels: ['Story: "The Tunnel" --', 'Poem: Train Whistle Poem', 'Poem: Poetic Devices --', 'Poetry Form: Diamante Poems'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u4_032', title: 'Story: "The Tunnel" -- Character Analysis: Suraj',
          caseStudy: { intro: 'Have you ever watched a friend react to a scary situation and thought, "That shows they are really brave"?',
            decisions: [{ prompt: 'What is a character trait?', options: [
                { text: 'A character trait is a quality or characteristic of a person\'s personality, like being', outcome: 'A character trait is a quality or characteristic of a person\'s personality, like being brave.' },
                { text: 'a character trait is a plot point', outcome: 'Not quite — Students often confuse "actions" with "traits." For example, they might say "Suraj is.', reveals: 'students-often-confuse-actions-with' },
                { text: 'actions', outcome: 'Not quite — Students often confuse "actions" with "traits." For example, they might say "Suraj is.', reveals: 'students-often-confuse-actions-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_033', title: 'Story: "The Tunnel" -- Theme: Courage and Adventure',
          caseStudy: { intro: 'Have you ever stood in front of a dark, empty corridor and felt scared to walk through it?',
            decisions: [{ prompt: 'What does it mean for a character to show "courage" in a story?', options: [
                { text: 'Courage is the decision to face a situation that is potentially dangerous or unknown', outcome: 'Courage is the decision to face a situation that is potentially dangerous or unknown.' },
                { text: 'courage means not having any fear', outcome: 'Not quite — Students often believe that "adventure" is only about physical travel to new places (like mountains.', reveals: 'adventure-is-only-about-physical' },
                { text: 'adventure', outcome: 'Not quite — Students often believe that "adventure" is only about physical travel to new places (like mountains.', reveals: 'adventure-is-only-about-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_035', title: 'Poem: Poetic Devices -- Imagery, Contrast, Sound Words',
          caseStudy: { intro: 'Have you ever closed your eyes and felt like you could "hear" the rain or "see" the dark shadows in a story?',
            decisions: [{ prompt: 'What do we call words that imitate the natural sound of an object or action, like \'rumble\' or \'hiss\'?', options: [
                { text: 'These are called sound words or onomatopoeia', outcome: 'These are called sound words or onomatopoeia. A wrong answer here suggests the student is confusing.' },
                { text: 'imagery', outcome: 'Not quite — Students often think "imagery" must include all five senses at once.', reveals: 'imagery-must-include-all-five' },
                { text: '"imagery" must include all five senses at once', outcome: 'Not quite — Students often think "imagery" must include all five senses at once.', reveals: 'imagery-must-include-all-five' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_031', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is writing a suspense scene about a boy who must cross into unknown territory. She sets it in a busy, noisy market \'because lots is happening there.\' A friend suggests a narrow, dark tunnel instead.',
            decisions: [{ prompt: 'Why does the tunnel make a stronger setting for this kind of scene?', options: [
                { text: 'Because the danger is concentrated in the unknown — a tunnel is dark, enclosed and hides what lies ahead, so the tracks \'disappearing into\' it create dread before anything even happens. A crowded market spreads attention thin; danger there must come from people or events, while the tunnel itself is the threat.', outcome: 'The chapter shows setting building suspense — confinement and invisibility of what\'s ahead make the reader lean forward, which scattered marketplace bustle cannot do.' },
                { text: 'Setting does not matter much — a scary plot is scary in any place, so the market is fine.', outcome: 'Place shapes the fear — the tunnel works because darkness and enclosure do half the storytelling; the same plot in a loud crowd loses that built-in menace.', reveals: 'setting-doesnt-matter' },
                { text: 'The market is actually scarier — more people means more danger, always.', outcome: 'Crowds bring distraction, not necessarily dread — the tunnel\'s power is that the character cannot see what is coming, and uncertainty frightens more than noise.', reveals: 'crowds-are-scarier' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u4_036', title: 'The bigger picture',
          caseStudy: { intro: 'Stillness before the storm is a trick of storytellers. The quieter the routine, the louder the surprise.',
            decisions: [{ prompt: 'What comes next? The Tunnel · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Tunnel · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u4_031', difficulty: 'standard',
          question: 'The "plot" is the sequence of events that make up a story\'s action, while the.',
          hint: 'Review the concept of "Chronological Order" (the timeline of events).',
          misconception: 'Students often think the "plot" is just a list of everything a character does, including unimportant things like eating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The "plot" is the sequence of events that make up a story\'s action, while the "setting"',
                  options: ['The "plot" is the sequence of events that make up a story\'s action, while the "setting"', 'Character analysis is the process of identifying a character\'s personality traits,', 'Courage and adventure are literary themes where a character chooses to face something', 'Personification is a literary device where human traits, emotions, or actions are given'],
                  hint: 'Review the concept of "Chronological Order" (the timeline of events).',
                  misconception: 'Students often think the "plot" is just a list of everything a character does, including unimportant things like eating or sleeping.' }
          ],
            remediations: { 'the-plot-is-just-a': { steps: ['Ask the student to pick the three most important moments in the story that changed what the character was doing.', 'Tell them to ignore the "boring" parts like sitting still.', 'Explain that plot is like a mountain—you start at the bottom, climb through the action, and reach the peak of the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_032', difficulty: 'standard',
          question: 'Character analysis is the process of identifying a character\'s personality.',
          hint: 'Review "identifying key details" if the student cannot cite specific actions.',
          misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead.',
          parts: [
                { id: 'a', prompt: 'If Suraj explores the jungle alone, what does this tell us about him?', answer: 'It tells us he is independent and adventurous',
                  options: ['It tells us he is independent and adventurous', 'he is bored', 'actions', 'traits'],
                  hint: 'Review "identifying key details" if the student cannot cite specific actions.',
                  misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead of saying "Suraj.' },
                { id: 'b', prompt: 'Suraj watches the train every day. How would you describe this quality?', answer: 'This shows curiosity',
                  options: ['This shows curiosity', 'actions', 'traits', 'Suraj is a train-watcher'],
                  hint: 'Review "identifying key details" if the student cannot cite specific actions.',
                  misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead of saying "Suraj.' },
                { id: 'c', prompt: 'How does Suraj’s reaction to danger help us understand his character?', answer: 'His calm response shows he possesses courage',
                  options: ['His calm response shows he possesses courage', 'actions', 'traits', 'Suraj is a train-watcher'],
                  hint: 'Review "identifying key details" if the student cannot cite specific actions.',
                  misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead of saying "Suraj.' }
          ],
            remediations: { 'students-often-confuse-actions-with': { steps: ['If the student is stuck, tell them to use the "Action-Trait" bridge.', 'Ask: "What did he do?" (He went into the tunnel).', '"What kind of person does that?" (Someone who is brave).', 'Help them practice this by asking about their own favorite TV characters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_032', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead.',
          parts: [
                { id: 'a', prompt: 'Is it fair to call Suraj "courageous" if he is also afraid? Why or why not?', answer: 'Yes, because courage is acting in spite of fear, not the absence of fear',
                  options: ['Yes, because courage is acting in spite of fear, not the absence of fear', 'actions', 'traits', 'Suraj is a train-watcher'],
                  hint: 'Review "identifying key details" if the student cannot cite specific actions.',
                  misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead of saying "Suraj.' },
                { id: 'b', prompt: 'Describe Suraj as if you were introducing him to a new friend. What would you highlight?', answer: 'A good answer mentions his curiosity about the tunnel and his independent spirit',
                  options: ['A good answer mentions his curiosity about the tunnel and his independent spirit', 'actions', 'traits', 'Suraj is a train-watcher'],
                  hint: 'Review "identifying key details" if the student cannot cite specific actions.',
                  misconception: 'Students often confuse "actions" with "traits." For example, they might say "Suraj is a train-watcher" instead of saying "Suraj.' }
          ],
            remediations: { 'students-often-confuse-actions-with': { steps: ['If the student is stuck, tell them to use the "Action-Trait" bridge.', 'Ask: "What did he do?" (He went into the tunnel).', '"What kind of person does that?" (Someone who is brave).', 'Help them practice this by asking about their own favorite TV characters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_033', difficulty: 'standard',
          question: 'Courage and adventure are literary themes where a character chooses to face.',
          hint: 'Review the concept of "Character Perspective."',
          misconception: 'Students often believe that "adventure" is only about physical travel to new places (like mountains or space).',
          parts: [
                { id: 'a', prompt: 'If a character enters a mysterious forest because they want to see what is on the other side, are they being courageous? Why?', answer: 'Yes, they are being courageous',
                  options: ['Yes, they are being courageous', 'no, because they might be lost', 'adventure'],
                  hint: 'Review the concept of "Character Perspective."',
                  misconception: 'Students often believe that "adventure" is only about physical travel to new places (like mountains or space).' },
                { id: 'b', prompt: 'Compare a character who stays home to avoid a storm with a character who goes out to watch the lightning. Which one represents the theme of "adventure"?', answer: 'The character watching the storm represents adventure',
                  options: ['The character watching the storm represents adventure', 'adventure'],
                  hint: 'Review the concept of "Character Perspective."',
                  misconception: 'Students often believe that "adventure" is only about physical travel to new places (like mountains or space).' }
          ],
            remediations: { 'adventure-is-only-about-physical': { steps: ['If a student is stuck, ask them: "Think of a time you tried a new sport or spoke to a new classmate.', 'Did you do it anyway?" Explain that this feeling of nervous excitement is exactly what characters in adventure stories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_034', difficulty: 'standard',
          question: 'Personification is a literary device where human traits, emotions, or actions.',
          hint: 'Review basic parts of speech, specifically verbs, to ensure they can identify what.',
          misconception: 'Students often confuse personification with simply describing an object\'s function.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Personification is a literary device where human traits, emotions, or actions are given',
                  options: ['Personification is a literary device where human traits, emotions, or actions are given', 'The "plot" is the sequence of events that make up a story\'s action, while the "setting"', 'Character analysis is the process of identifying a character\'s personality traits,', 'Courage and adventure are literary themes where a character chooses to face something'],
                  hint: 'Review basic parts of speech, specifically verbs, to ensure they can identify what an object.',
                  misconception: 'Students often confuse personification with simply describing an object\'s function.' }
          ],
            remediations: { 'students-often-confuse-personification-with': { steps: ['If a student fails, ask them to list three things humans do (e.g., cry, smile, argue) and three things objects.', 'Then, have them create a sentence by forcing an object to do one of the human actions.', 'This helps them isolate the literary device from literal description.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_035', difficulty: 'standard',
          question: 'Poetic devices are specific tools—like imagery, contrast, and sound words—that.',
          hint: 'Review the five senses and practice describing objects using only those senses.',
          misconception: 'Students often think "imagery" must include all five senses at once.',
          parts: [
                { id: 'a', prompt: 'What do we call words that imitate the natural sound of an object or action, like \'rumble\' or \'hiss\'?', answer: 'These are called sound words or onomatopoeia',
                  options: ['These are called sound words or onomatopoeia', 'imagery', '"imagery" must include all five senses at once'],
                  hint: 'Review the five senses and practice describing objects using only those senses.',
                  misconception: 'Students often think "imagery" must include all five senses at once.' },
                { id: 'b', prompt: 'If a poem mentions a "bright, sunny morning" followed immediately by a "dark, lonely night," what poetic device is the author using?', answer: 'The author is using contrast',
                  options: ['The author is using contrast', 'imagery', '"imagery" must include all five senses at once'],
                  hint: 'Review the five senses and practice describing objects using only those senses.',
                  misconception: 'Students often think "imagery" must include all five senses at once.' }
          ],
            remediations: { 'imagery-must-include-all-five': { steps: ['Ask the student to close their eyes and describe a single object (like a mango) without naming it.', 'Focus on what it looks like (color, shape), then what it feels like (texture).', 'Explain that imagery is simply "word-painting"—if you can visualize it, it\'s imagery.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u4_036', difficulty: 'standard',
          question: 'A diamante poem is a seven-line poem structured in the shape of a diamond.',
          hint: 'Review basic parts of speech (adjectives vs. nouns).',
          misconception: 'Students often mix up the word count or the part of speech for the middle (4th) line.',
          parts: [
                { id: 'a', prompt: 'If your diamante starts with "Badminton" and ends with "Chess," what should the nouns in Line 4 represent?', answer: 'Line 4 should have two nouns related to Badminton and two nouns related to Chess',
                  options: ['Line 4 should have two nouns related to Badminton and two nouns related to Chess', 'bridge'],
                  hint: 'Review basic parts of speech (adjectives vs. nouns).',
                  misconception: 'Students often mix up the word count or the part of speech for the middle (4th) line.' }
          ],
            remediations: { 'students-often-mix-up-the': { steps: ['If a student fails, have them write the numbers 1-2-3-4-3-2-1 vertically on a sheet.', 'Next to each number, write the part of speech required (e.g., "1: Noun").', 'Force them to map their draft to this template line by line to see where the structure breaks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
