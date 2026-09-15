import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch01_p3: SimDef = {
    id: 'v3_c7_engl_ch01_p3',
    title: 'Learning Together: The Day the River Spoke · Part 3/3',
    subtitle: 'This node covers identifying the central idea and moral lesson of narrative poems focused.',
    classLevel: 7, subject: 'engl', topic: 'Learning Together: The Day the River Spoke · Part 3/3',
    chapters: ['c7_engl_ch01'],
    nodeIds: ['c7_engl_ch01_013', 'c7_engl_ch01_014', 'c7_engl_ch01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever spent hours trying to solve a tough math puzzle or build a complicated Lego model, felt like.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In a coastal village, the high tide swallows the footpaths and the children simply wait for the water to fall. Is this setting just a pretty postcard — or something with real power over the story?',
        options: ['It is an active force — tides, floods, and isolation decide how villagers travel, work, and whether children reach a school', 'Just a backdrop — the same story could happen anywhere', 'A decoration — rivers are added to stories to sound nice', 'A mistake — real rivers never affect villages'],
        answer: 'It is an active force — tides, floods, and isolation decide how villagers travel, work, and whether children reach a school',
        hook: 'A setting is never window dressing. When a river floods the only path to school, geography becomes an obstacle in the plot — move the village to a dry plain and the whole struggle dissolves.',
    },
    teaching: [
        { title: 'Poem: Central Idea and Moral Lesson of Perseverance', text: 'The central idea of a poem is its core theme or underlying message, while the moral lesson of perseverance is the specific guidance on never giving up despite repeated failures and obstacles.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the riverbank at high tide and low tide — list what each state of the water allows or forbids — and prove the setting is steering the plot.',
        labels: ['Poem: Central Idea', 'Poetic Devices: Metaphor', 'Writing: How to Structure'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch01_013', title: 'Poem: Central Idea and Moral Lesson of Perseverance',
          caseStudy: { intro: 'Have you ever spent hours trying to solve a tough math puzzle or build a complicated Lego model, felt like quitting, but tried one more time and finally.',
            decisions: [{ prompt: 'What is the primary difference between the literal plot of a narrative poem about perseverance and its central idea?', options: [
                { text: 'The literal plot is the sequence of events that actually happen in the poem (such as a', outcome: 'The literal plot is the sequence of events that actually happen in the poem (such as a king.' },
                { text: 'moral lesson', outcome: 'Not quite — Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness".', reveals: 'the-moral-lesson-of-a' },
                { text: 'sadness', outcome: 'Not quite — Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness".', reveals: 'the-moral-lesson-of-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_014', title: 'Poetic Devices: Metaphor and Repetition in the Poem',
          caseStudy: { intro: 'Imagine you are listening to a street vendor in your neighborhood shouting "Chai, hot chai, fresh chai!" over and over again, or someone telling you, "My.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor when a poet compares a river to a ribbon?', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "The river is like a silver', outcome: 'A simile compares two things using "like" or "as" (e.g., "The river is like a silver ribbon").' },
                { text: 'speaking', outcome: 'Not quite — Students frequently confuse metaphors with personification or literal descriptions when studying.', reveals: 'students-frequently-confuse-metaphors-with' },
                { text: 'running', outcome: 'Not quite — Students frequently confuse metaphors with personification or literal descriptions when studying.', reveals: 'students-frequently-confuse-metaphors-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_015', title: 'Writing: How to Structure a Poem Analysis Answer',
          caseStudy: { intro: 'Have you ever tried to explain to a friend why a song made you feel sad, but you just ended up saying, "It\'s just sad because of the tune"?',
            decisions: [{ prompt: 'What does the \'E\' stand for in the PEEL writing structure used for poem analysis?', options: [
                { text: 'The \'E\' stands for Evidence (and Explanation)', outcome: 'The \'E\' stands for Evidence (and Explanation). A wrong answer usually confuses it with \'Ending\'.' },
                { text: 'analyzing a poem', outcome: 'Not quite — Students often believe that "analyzing a poem" simply means writing a summary of what happens.', reveals: 'analyzing-a-poem-simply-means' },
                { text: '"analyzing a poem" simply means writing a summary of what happens in each stanza', outcome: 'Not quite — Students often believe that "analyzing a poem" simply means writing a summary of what happens.', reveals: 'analyzing-a-poem-simply-means' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A student adapts \'The Day the River Spoke\' for a school anthology, but moves the whole story from the coastal river village to a dry desert plateau \'for variety\' — keeping every scene otherwise identical.',
            decisions: [{ prompt: 'What would this transplant break?', options: [
                { text: 'Almost everything — the river is not scenery but the story\'s machinery: it shapes the villagers\' commute, the isolation, and the voice that speaks to the protagonist. In a desert the same scenes lose their logic — no water to cross, no river to listen — so the character\'s relationship with her environment, and the imagery carrying it, must be rebuilt from scratch.', outcome: 'Setting in this story is causal, not decorative — change it and the plot\'s reasons evaporate, which is why \'same story, new backdrop\' never survives the move.' },
                { text: 'Nothing breaks — settings are interchangeable backdrops, so the story works identically on a plateau.', outcome: 'The river drives the plot — the crossing, the isolation, the speaking water — so swapping it for desert deletes the story\'s causes, not just its look.', reveals: 'setting-is-interchangeable' },
                { text: 'Only the descriptions need rewriting — the river\'s role is just pretty imagery.', outcome: 'The river does narrative work — it isolates the village and literally speaks to the protagonist — so it is plot machinery, not ornament.', reveals: 'setting-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_015', title: 'You made it',
          caseStudy: { intro: 'Read the water and you read the village. In this story, the river does not just flow beside the characters — it pushes their lives around.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch01_013', difficulty: 'standard',
          question: 'The central idea of a poem is its core theme or underlying message, while the.',
          hint: 'Review Class 6 Node c6_english_u1_004 on King Bruce narrative poems to practice.',
          misconception: 'Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness" or "happiness,".',
          parts: [
                { id: 'a', prompt: 'Read this short line description: A traveler keeps falling on a rocky mountain path, but rises each time to reach the summit.', answer: 'Persistence and inner resolve triumph over physical obstacles',
                  options: ['Persistence and inner resolve triumph over physical obstacles', 'moral lesson', 'sadness', 'happiness'],
                  hint: 'Review Class 6 Node c6_english_u1_004 on King Bruce narrative poems to practice separating plot.',
                  misconception: 'Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness" or "happiness," rather than.' },
                { id: 'b', prompt: 'Analyze how the repetition of the phrase "Try, try again" in a perseverance poem reinforces the moral lesson.', answer: 'The repetition reinforces the moral lesson by mimicking the very act of',
                  options: ['The repetition reinforces the moral lesson by mimicking the very act of', 'moral lesson', 'sadness', 'happiness'],
                  hint: 'Review Class 6 Node c6_english_u1_004 on King Bruce narrative poems to practice separating plot.',
                  misconception: 'Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness" or "happiness," rather than.' }
          ],
            remediations: { 'the-moral-lesson-of-a': { steps: ['Guide the student to expand single-word themes into complete, actionable sentences by asking: "What exact advice is the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness" or "happiness,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Poems about perseverance are outdated because modern technology solves our problems instantly, so we no longer need to learn patience.".', answer: 'Disagree',
                  options: ['Disagree', 'moral lesson', 'sadness', 'happiness'],
                  hint: 'Review Class 6 Node c6_english_u1_004 on King Bruce narrative poems to practice separating plot.',
                  misconception: 'Students often believe that the "moral lesson" of a poem is just a one-word emotion like "sadness" or "happiness," rather than.' }
          ],
            remediations: { 'the-moral-lesson-of-a': { steps: ['Guide the student to expand single-word themes into complete, actionable sentences by asking: "What exact advice is the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_014', difficulty: 'standard',
          question: 'A metaphor is a poetic device that makes a direct comparison between two unlike.',
          hint: 'Review Class 6 poetic devices, specifically how a metaphor differs from a simile.',
          misconception: 'Students frequently confuse metaphors with personification or literal descriptions when studying nature poems, assuming.',
          parts: [
                { id: 'a', prompt: 'If a poem repeats the phrase "Flow on, river, flow" at the start of three consecutive stanzas, what literary device is being used, and what is its primary.', answer: 'The device is repetition',
                  options: ['The device is repetition', 'speaking', 'running'],
                  hint: 'Review Class 6 poetic devices, specifically how a metaphor differs from a simile by omitting "like".',
                  misconception: 'Students frequently confuse metaphors with personification or literal descriptions when studying nature poems, assuming that if a river.' },
                { id: 'b', prompt: 'Analyze the effect of the metaphor "The morning sun is a golden coin tossed into the sky" within a poem about a village awakening.', answer: 'Steps to analyze: (1) Identify the metaphor comparing the sun to a golden coin',
                  options: ['Steps to analyze: (1) Identify the metaphor comparing the sun to a golden coin', 'speaking', 'running'],
                  hint: 'Review Class 6 poetic devices, specifically how a metaphor differs from a simile by omitting "like".',
                  misconception: 'Students frequently confuse metaphors with personification or literal descriptions when studying nature poems, assuming that if a river.' }
          ],
            remediations: { 'students-frequently-confuse-metaphors-with': { steps: ['When a student struggles to distinguish between metaphor, personification, and repetition, guide them back to basics.', 'If the text says "The river is a snake," ask: Is the river literally a reptile?', 'No, it\'s a metaphor equating two different things.', 'If the text repeats the word "Wait" three times, ask: Why did the poet stutter?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_015', difficulty: 'standard',
          question: 'Structuring a poem analysis answer is the method of organizing writing into.',
          hint: 'Review c7_engl_ch01_014 to practice identifying metaphors and repetition before.',
          misconception: 'Students often believe that "analyzing a poem" simply means writing a summary of what happens in each stanza.',
          parts: [
                { id: 'a', prompt: 'What does the \'E\' stand for in the PEEL writing structure used for poem analysis?', answer: 'The \'E\' stands for Evidence (and Explanation)',
                  options: ['The \'E\' stands for Evidence (and Explanation)', 'analyzing a poem', '"analyzing a poem" simply means writing a summary of what happens in each stanza'],
                  hint: 'Review c7_engl_ch01_014 to practice identifying metaphors and repetition before attempting to write.',
                  misconception: 'Students often believe that "analyzing a poem" simply means writing a summary of what happens in each stanza.' },
                { id: 'b', prompt: 'When analyzing a poem, why must you include a direct quote or line reference in your answer?', answer: 'Direct quotes provide textual proof for the claim you are making in your point',
                  options: ['Direct quotes provide textual proof for the claim you are making in your point', 'to make the answer look longer', 'analyzing a poem', '"analyzing a poem" simply means writing a summary of what happens in each stanza'],
                  hint: 'Review c7_engl_ch01_014 to practice identifying metaphors and repetition before attempting to write.',
                  misconception: 'Students often believe that "analyzing a poem" simply means writing a summary of what happens in each stanza.' },
                { id: 'c', prompt: 'Read this partial student sentence: "In the poem about King Bruce, the poet shows perseverance." How can you apply the PEEL method to improve this opening?', answer: 'Steps: (1) Identify that this sentence is only a Point',
                  options: ['Steps: (1) Identify that this sentence is only a Point', 'analyzing a poem', '"analyzing a poem" simply means writing a summary of what happens in each stanza'],
                  hint: 'Review c7_engl_ch01_014 to practice identifying metaphors and repetition before attempting to write.',
                  misconception: 'Students often believe that "analyzing a poem" simply means writing a summary of what happens in each stanza.' },
                { id: 'd', prompt: 'Analyze the following student answer for a poem about a river: "The poet uses personification when he writes that the river \'whispers secrets.\' This makes the.', answer: 'Yes, it is complete',
                  options: ['Yes, it is complete', 'analyzing a poem', '"analyzing a poem" simply means writing a summary of what happens in each stanza'],
                  hint: 'Review c7_engl_ch01_014 to practice identifying metaphors and repetition before attempting to write.',
                  misconception: 'Students often believe that "analyzing a poem" simply means writing a summary of what happens in each stanza.' }
          ],
            remediations: { 'analyzing-a-poem-simply-means': { steps: ['To fix this misconception, guide the student to separate *summary* from *analysis*.', 'Say: "Summary is telling me *what* happens; analysis is telling me *how* the poet makes me feel it." Show them a poem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
