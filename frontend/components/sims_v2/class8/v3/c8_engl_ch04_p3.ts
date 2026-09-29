import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch04_p3 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch04_p3: SimDef = {
    id: 'v3_c8_engl_ch04_p3',
    title: 'The Cherry Tree · Part 3/3',
    subtitle: 'A tree, a mountain, and a fight to survive',
    classLevel: 8, subject: 'engl', topic: 'The Cherry Tree · Part 3/3',
    chapters: ['c8_engl_ch04'],
    nodeIds: ['c8_engl_ch4_5', 'c8_engl_ch4_6', 'c8_engl_ch4_7', 'c8_engl_ch4_8', 'c8_engl_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young gardener in the Himalayan foothills', intro: 'Rakesh plants a cherry seed where nothing wants to grow — stony soil, icy winds, hungry goats. Read the mountain itself to understand what the little tree is really up against.', goal: 'Analyze how the physical setting of Mussoorie — terrain, climate and seasons — acts as an active force shaping the plot, mood and theme of \'The Cherry Tree\'.' },
    discovery: {
        question: 'Why does Ruskin Bond plant his cherry seed on a stony Mussoorie hillside instead of a warm, flat farm where it would grow easily?',
        options: ['Because surviving the harsh mountains — frost, stony soil, monsoon goats — turns the tree\'s growth into a story about resilience', 'Because cherries only grow in Mussoorie', 'Because the plains were too far from his house', 'Setting doesn\'t matter — it\'s just a backdrop'],
        answer: 'Because surviving the harsh mountains — frost, stony soil, monsoon goats — turns the tree\'s growth into a story about resilience',
        hook: 'Setting isn\'t a painted poster behind the action — it\'s an active opponent. In Mussoorie, the cold winds and stony soil fight the little tree, and that fight is exactly what makes its survival feel like a miracle.',
    },
    teaching: [
        { title: 'Theme: Patience, Growth, and Connection with Nature', text: 'The theme of patience, growth, and connection with nature refers to the central idea that meaningful life achievements and deep personal joy require time, persistent care, resilience through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch4_5', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the Himalayan seasons through the story: the winter frost that stunts the sapling, the monsoon that feeds it, the goats that threaten it — and show how each attack from the setting drives the plot forward.',
        labels: ['Theme: Patience, Growth,', 'Theme: The Reward', 'Literary Device: Imagery', 'Literary Device: Symbolism', 'Vocabulary in Context: Stunted,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch4_5', title: 'Theme: Patience, Growth, and Connection with Nature',
          caseStudy: { intro: 'Have you ever planted a seed in a flowerpot and felt disappointed when no green shoot appeared by the next morning?',
            decisions: [{ prompt: 'Define what a "theme" in literature is, and state the main theme of "The Cherry Tree".', options: [
                { text: 'A theme is the underlying central message, lesson, or main idea that an author explores', outcome: 'A theme is the underlying central message, lesson, or main idea that an author explores throughout.' },
                { text: 'The theme is a cherry tree growing in Mussoorie', outcome: 'Not quite — Students often confuse the **topic/subject matter** of a story (e.g., "a cherry tree growing.', reveals: 'students-often-confuse-the-topic' },
                { text: 'a cherry tree growing in Mussoorie', outcome: 'Not quite — Students often confuse the **topic/subject matter** of a story (e.g., "a cherry tree growing.', reveals: 'students-often-confuse-the-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_7', title: 'Literary Device: Imagery of Nature (Stony Soil, Dry Winds, Forests)',
          caseStudy: { intro: 'Imagine you are standing in a dry, rocky field with strong winds blowing dust around you. How would you describe what you see, feel, and hear?',
            decisions: [{ prompt: 'What is imagery in literature?', options: [
                { text: 'Imagery is the use of descriptive language that appeals to the senses (sight, sound,', outcome: 'Imagery is the use of descriptive language that appeals to the senses (sight, sound, touch, taste.' },
                { text: 'Imagery is when a story has pictures', outcome: 'Not quite — Students often think that imagery only involves visual descriptions (what you see) and ignore other.', reveals: 'imagery-only-involves-visual-descriptions' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_8', title: 'Literary Device: Symbolism of the Cherry Tree as Growth and Hope',
          caseStudy: { intro: 'Think about planting a seed in a small pot at home—you water it daily, wait anxiously for the first sprout, and feel hopeful when it finally grows, even if.',
            decisions: [{ prompt: 'What is the primary symbolic meaning of the cherry tree in "The Cherry Tree" as discussed in this node?', options: [
                { text: 'The cherry tree primarily symbolizes growth and hope', outcome: 'The cherry tree primarily symbolizes growth and hope. A wrong answer like "the cherry tree.' },
                { text: 'the cherry tree symbolizes only difficulty', outcome: 'Not quite — Students often believe that any mention of a tree or plant in a story automatically symbolizes.', reveals: 'any-mention-of-a-tree' },
                { text: 'The Cherry Tree', outcome: 'Not quite — Students often believe that any mention of a tree or plant in a story automatically symbolizes.', reveals: 'any-mention-of-a-tree' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_9', title: 'Vocabulary in Context: Stunted, Outskirts, Yielding, Tang',
          caseStudy: { intro: 'Imagine you are walking home in the mountain town of Mussoorie.',
            decisions: [{ prompt: 'Match the following words with their correct literal definitions: 1. **Stunted** -> A. The outer borders or edges of a town or city. 2.', options: [
                { text: 'The correct match is: 1-C, 2-A, 3-B, 4-D', outcome: 'The correct match is: 1-C, 2-A, 3-B, 4-D. *What a wrong answer reveals:* If a student matches.' },
                { text: 'yielding', outcome: 'Not quite — **Confusing the dual meanings of "yielding."** Students often think "yielding" only means.', reveals: 'confusing-the-dual-meanings-of' },
                { text: 'surrendering in a fight', outcome: 'Not quite — **Confusing the dual meanings of "yielding."** Students often think "yielding" only means.', reveals: 'confusing-the-dual-meanings-of' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'The Cherry Tree\' for homework, a student writes: \'Setting: Mussoorie. The story is just about a boy and his grandfather, so the place doesn\'t matter — it could be anywhere.\'',
            decisions: [{ prompt: 'What does the Mussoorie setting actually contribute?', options: [
                { text: 'It is an active force — stony soil, icy winds, steep slopes, grazing goats and monsoon downpours are the obstacles the seedling must survive; strip them away and the tree\'s survival is no longer an earned triumph of resilience.', outcome: 'This shows setting driving the conflict: the Himalayan environment creates the struggle that gives the story its meaning.' },
                { text: 'The student is right — naming the town completes the setting analysis, and the plot would unfold identically on a warm farm in the plains.', outcome: 'On soft fertile soil a seed\'s survival is routine, not miraculous; the harsh terrain is what turns a small tree into the story\'s achievement.', reveals: 'setting-is-a-label' },
                { text: 'The setting matters only for mood — it makes the story feel cold and quiet but changes nothing that happens.', outcome: 'Mood is only half of it; the cold snaps, slopes and goats directly threaten the sapling and shape what the characters must do.', reveals: 'setting-is-mood-only' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_9', title: 'You made it',
          caseStudy: { intro: 'On easy ground, a tree is just a tree. On a Mussoorie slope, every leaf is a victory. The setting creates the struggle — and the struggle creates the meaning.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch4_5', difficulty: 'standard',
          question: 'The theme of patience, growth, and connection with nature refers to the central.',
          hint: 'If stuck, review plot sequencing in c8_engl_ch4_4 to identify key milestones in the.',
          misconception: 'Students often confuse the **topic/subject matter** of a story (e.g., "a cherry tree growing in Mussoorie") with its.',
          parts: [
                { id: 'a', prompt: 'Explain how Grandfather\'s advice to Rakesh when he plants the seed reflects the theme of patience.', answer: 'Grandfather tells Rakesh to plant the seed in a shady corner and leave it alone,',
                  options: ['Grandfather tells Rakesh to plant the seed in a shady corner and leave it alone,', 'a cherry tree growing in Mussoorie', 'nurturing life requires patience, resilience, and connection with nature'],
                  hint: 'If stuck, review plot sequencing in c8_engl_ch4_4 to identify key milestones in the tree\'s growth.',
                  misconception: 'Students often confuse the **topic/subject matter** of a story (e.g., "a cherry tree growing in Mussoorie") with its **theme** (e.g.' }
          ],
            remediations: { 'students-often-confuse-the-topic': { steps: ['When a student makes this error, guide them through the "So What?" remediation technique: 1.', 'Ask the student: *"What is the main event in the story?"* (Student answers: Rakesh plants a cherry seed and waits years.', 'Ask: *"So what does Rakesh learn while waiting all those years through cold winters and bad accidents?"* (Student.', 'That lesson about waiting, hoping, and caring is the **theme**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the **topic/subject matter** of a story (e.g., "a cherry tree growing in Mussoorie") with its.',
          parts: [
                { id: 'a', prompt: 'Evaluate which event in the story represents the strongest test of Rakesh\'s patience: the long winter when the seed stays underground, or the moment the goat.', answer: 'The moment the goat eats all the young leaves is the stronger test of patience',
                  options: ['The moment the goat eats all the young leaves is the stronger test of patience', 'a cherry tree growing in Mussoorie', 'nurturing life requires patience, resilience, and connection with nature'],
                  hint: 'If stuck, review plot sequencing in c8_engl_ch4_4 to identify key milestones in the tree\'s growth.',
                  misconception: 'Students often confuse the **topic/subject matter** of a story (e.g., "a cherry tree growing in Mussoorie") with its **theme** (e.g.' }
          ],
            remediations: { 'students-often-confuse-the-topic': { steps: ['When a student makes this error, guide them through the "So What?" remediation technique: 1.', 'Ask the student: *"What is the main event in the story?"* (Student answers: Rakesh plants a cherry seed and waits years.', 'Ask: *"So what does Rakesh learn while waiting all those years through cold winters and bad accidents?"* (Student.', 'That lesson about waiting, hoping, and caring is the **theme**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_6', difficulty: 'standard',
          question: 'The theme of "The Reward of Nurturing Life" explores the deep emotional.',
          hint: 'If stuck, review the plot summary in node c8_engl_ch4_4 to refresh how Rakesh reacted.',
          misconception: 'Students frequently believe that the "reward" in the story is the physical harvest—eating a basket of sweet, delicious.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of "The Reward of Nurturing Life" explores the deep emotional fulfillment,',
                  options: ['The theme of "The Reward of Nurturing Life" explores the deep emotional fulfillment,', 'From \'English chapter c8_engl_ch4\': the skill or concept this node teaches, applied to', 'Comprehension of the narrative journey from seed to fruit-bearing tree involves', 'In literary analysis, examining "luck in the context of effort" means critically'],
                  hint: 'If stuck, review the plot summary in node c8_engl_ch4_4 to refresh how Rakesh reacted each time the.',
                  misconception: 'Students frequently believe that the "reward" in the story is the physical harvest—eating a basket of sweet, delicious cherries.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Direct the student to reread the paragraph describing the first fruit: "It was sour...', 'but Rakesh knew it was a real cherry." 2.', 'Ask: "If the fruit tasted sour and unpleasant, why was Rakesh still thrilled?" 3.', 'Guide them to trace his emotional journey from tossing a seed to shielding a fragile stem, helping them define "reward".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_7', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch4\': the skill or concept this node teaches.',
          hint: 'If stuck, review how to identify sensory details in descriptions (from c7_engl_ch01_008.',
          misconception: 'Students often think that imagery only involves visual descriptions (what you see) and ignore other senses like touch.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c8_engl_ch4\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c8_engl_ch4\': the skill or concept this node teaches, applied to', 'Comprehension of the narrative journey from seed to fruit-bearing tree involves', 'In literary analysis, examining "luck in the context of effort" means critically', 'Writing a clear, ordered description of how a plant changes from seed to mature plant,'],
                  hint: 'If stuck, review how to identify sensory details in descriptions (from c7_engl_ch01_008: Literary.',
                  misconception: 'Students often think that imagery only involves visual descriptions (what you see) and ignore other senses like touch, sound, or smell.' }
          ],
            remediations: { 'imagery-only-involves-visual-descriptions': { steps: ['To fix this, guide the student to explicitly check for each sense when analyzing imagery: Ask, "What can you see, hear.', 'Then, connect each sensation to how it shows the harshness of the setting for the cherry tree\'s growth.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_8', difficulty: 'standard',
          question: 'In Ruskin Bond\'s "The Cherry Tree", the cherry tree specifically symbolizes.',
          hint: 'If stuck, review the symbolism lessons from Class 6 (c6_english_u3_025 on Tagore\'s "Paper.',
          misconception: 'Students often believe that any mention of a tree or plant in a story automatically symbolizes hope, overlooking how.',
          parts: [
                { id: 'a', prompt: 'What is the primary symbolic meaning of the cherry tree in "The Cherry Tree" as discussed in this node?', answer: 'The cherry tree primarily symbolizes growth and hope',
                  options: ['The cherry tree primarily symbolizes growth and hope', 'the cherry tree symbolizes only difficulty', 'The Cherry Tree'],
                  hint: 'If stuck, review the symbolism lessons from Class 6 (c6_english_u3_025 on Tagore\'s "Paper Boats").',
                  misconception: 'Students often believe that any mention of a tree or plant in a story automatically symbolizes hope, overlooking how the specific context.' },
                { id: 'b', prompt: 'Apply the concept of symbolism: If a student drew a picture of a small, cracked pot with a single green shoot growing from it, what abstract idea could this.', answer: 'This image could symbolize hope or resilience',
                  options: ['This image could symbolize hope or resilience', 'it symbolizes sadness', 'The Cherry Tree'],
                  hint: 'If stuck, review the symbolism lessons from Class 6 (c6_english_u3_025 on Tagore\'s "Paper Boats").',
                  misconception: 'Students often believe that any mention of a tree or plant in a story automatically symbolizes hope, overlooking how the specific context.' }
          ],
            remediations: { 'any-mention-of-a-tree': { steps: ['To fix this, guide students to reread paragraphs where the tree faces specific threats (e.g., "The goats ate the.', 'Finally, prompt them to rewrite a weak answer by adding evidence of both adversity (e.g., rocky soil) and response.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_9', difficulty: 'standard',
          question: 'Vocabulary in context is the practice of identifying the precise meaning.',
          hint: 'If stuck, review basic context clue strategies such as looking for contrast words (but.',
          misconception: '**Confusing the dual meanings of "yielding."** Students often think "yielding" only means "surrendering in a fight".',
          parts: [
                { id: 'a', prompt: 'Match the following words with their correct literal definitions: 1. **Stunted** -> A. The outer borders or edges of a town or city. 2. **Outskirts** -> B.', answer: 'The correct match is: 1-C, 2-A, 3-B, 4-D',
                  options: ['The correct match is: 1-C, 2-A, 3-B, 4-D', 'yielding', 'surrendering in a fight', 'producing/giving fruit'],
                  hint: 'If stuck, review basic context clue strategies such as looking for contrast words (but, although).',
                  misconception: '**Confusing the dual meanings of "yielding."** Students often think "yielding" only means "surrendering in a fight" or "producing/giving.' },
                { id: 'b', prompt: 'In the sentence: *"The dry, stony ground was barely yielding to Rakesh\'s small spade,"* what does the word **yielding** mean, and what clue in the sentence.', answer: 'In this context, **yielding** means soft, pliable, or giving way',
                  options: ['In this context, **yielding** means soft, pliable, or giving way', 'producing cherries', 'yielding fruit', 'stony ground'],
                  hint: 'If stuck, review basic context clue strategies such as looking for contrast words (but, although).',
                  misconception: '**Confusing the dual meanings of "yielding."** Students often think "yielding" only means "surrendering in a fight" or "producing/giving.' },
                { id: 'c', prompt: 'Read the sentence below and fill in the blank with the most appropriate word from our list (*stunted*, *outskirts*, *yielding*, *tang*): *"After driving for.', answer: 'The correct word is **outskirts**',
                  options: ['The correct word is **outskirts**', 'yielding', 'stunted', 'city center'],
                  hint: 'If stuck, review basic context clue strategies such as looking for contrast words (but, although).',
                  misconception: '**Confusing the dual meanings of "yielding."** Students often think "yielding" only means "surrendering in a fight" or "producing/giving.' }
          ],
            remediations: { 'confusing-the-dual-meanings-of': { steps: ['**Physical Demonstration:** Hand the student a hard wooden ruler and a soft sponge.', 'Explain: *"The sponge gives way under your finger; it is yielding.', 'The wood resists; it is unyielding."* 2.', '**Connect to Context:** Explain that "yielding" comes from the verb "to yield" (to give up or give way).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
