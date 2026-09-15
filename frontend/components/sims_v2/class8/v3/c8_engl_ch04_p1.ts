import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch04_p1: SimDef = {
    id: 'v3_c8_engl_ch04_p1',
    title: 'The Cherry Tree · Part 1/3',
    subtitle: 'A tree, a mountain, and a fight to survive',
    classLevel: 8, subject: 'engl', topic: 'The Cherry Tree · Part 1/3',
    chapters: ['c8_engl_ch04'],
    nodeIds: ['c8_engl_ch4_1', 'c8_engl_ch4_10', 'c8_engl_ch4_11', 'c8_engl_ch4_12', 'c8_engl_ch4_13', 'c8_engl_ch4_14'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young gardener in the Himalayan foothills', intro: 'Rakesh plants a cherry seed where nothing wants to grow — stony soil, icy winds, hungry goats. Read the mountain itself to understand what the little tree is really up against.', goal: 'Analyze how the physical setting of Mussoorie — terrain, climate and seasons — acts as an active force shaping the plot, mood and theme of \'The Cherry Tree\'.' },
    discovery: {
        question: 'Why does Ruskin Bond plant his cherry seed on a stony Mussoorie hillside instead of a warm, flat farm where it would grow easily?',
        options: ['Because surviving the harsh mountains — frost, stony soil, monsoon goats — turns the tree\'s growth into a story about resilience', 'Because cherries only grow in Mussoorie', 'Because the plains were too far from his house', 'Setting doesn\'t matter — it\'s just a backdrop'],
        answer: 'Because surviving the harsh mountains — frost, stony soil, monsoon goats — turns the tree\'s growth into a story about resilience',
        hook: 'Setting isn\'t a painted poster behind the action — it\'s an active opponent. In Mussoorie, the cold winds and stony soil fight the little tree, and that fight is exactly what makes its survival feel like a miracle.',
    },
    teaching: [
        { title: 'Setting: Mussoorie in the Himalayan Foothills', text: 'Setting refers to the physical environment, geographical location, climate, and time period in which a narrative occurs; in "The Cherry Tree," the rugged setting of Mussoorie in the Himalayan.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch4_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the Himalayan seasons through the story: the winter frost that stunts the sapling, the monsoon that feeds it, the goats that threaten it — and show how each attack from the setting drives the plot forward.',
        labels: ['Setting: Mussoorie in', 'Comprehension: The Journey from', 'Critical Thinking: What \'Luck\'', 'Writing: Describing the Growth', 'Poem: The Cherry Tree', 'Poem: Rhyme Scheme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch4_1', title: 'Setting: Mussoorie in the Himalayan Foothills',
          caseStudy: { intro: 'Imagine trying to plant a cherry seed on a steep, cold, windy mountain slope covered with sharp stones—would it grow as easily as it would in a warm garden.',
            decisions: [{ prompt: 'What is the geographical setting of Ruskin Bond\'s story "The Cherry Tree"?', options: [
                { text: 'The geographical setting is Mussoorie, located in the Himalayan foothills, characterized', outcome: 'The geographical setting is Mussoorie, located in the Himalayan foothills, characterized by stony.' },
                { text: 'a big forest', outcome: 'Not quite — Students often treat "setting" as merely a named town (e.g., "Mussoorie") or a passive backdrop.', reveals: 'students-often-treat-setting-as' },
                { text: 'a village in the plains', outcome: 'Not quite — Students often treat "setting" as merely a named town (e.g., "Mussoorie") or a passive backdrop.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_10', title: 'Comprehension: The Journey from Seed to Fruit-Bearing Tree',
          caseStudy: { intro: 'Have you ever planted a mustard seed or coriander seed in a small plastic cup and waited eagerly for sprouts, only to forget about it or accidentally knock.',
            decisions: [{ prompt: 'What is the very first action Rakesh takes that begins the journey of the cherry tree?', options: [
                { text: 'Rakesh presses the hard cherry seed into the soft, damp soil with his thumb until it is', outcome: 'Rakesh presses the hard cherry seed into the soft, damp soil with his thumb until it is buried.' },
                { text: 'he planted a sapling', outcome: 'Not quite — Students often believe that plant growth in literature happens in a smooth, linear fashion—that.', reveals: 'plant-growth-in-literature-happens' },
                { text: 'he watered a grown tree', outcome: 'Not quite — Students often believe that plant growth in literature happens in a smooth, linear fashion—that.', reveals: 'plant-growth-in-literature-happens' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_11', title: 'Critical Thinking: What \'Luck\' Means in the Context of Effort',
          caseStudy: { intro: 'Imagine you prepare for weeks for a school sports race—waking up early, practicing every evening, and taking care of your health—and on race day, you win gold.',
            decisions: [{ prompt: 'What question does Grandfather ask Rakesh near the end of *The Cherry Tree* when they look at the fully grown tree?', options: [
                { text: 'Grandfather asks Rakesh, "Is this what it feels like to be God?" or asks whether they are', outcome: 'Grandfather asks Rakesh, "Is this what it feels like to be God?" or asks whether they are lucky.' },
                { text: 'Grandfather asked how much the cherries cost or when they should chop it down', outcome: 'Not quite — Students often confuse "luck" with "pure random chance" (like winning a lottery).', reveals: 'students-often-confuse-luck-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_12', title: 'Writing: Describing the Growth of a Plant Over Time',
          caseStudy: { intro: 'Imagine you have planted a mango seed in a cup and watched it sprout over weeks.',
            decisions: [{ prompt: 'What is the main purpose of using sequence words like "first," "then," "finally" when describing plant growth?', options: [
                { text: 'Sequence words show the order of events, helping the reader follow the stages of growth', outcome: 'Sequence words show the order of events, helping the reader follow the stages of growth in time.' },
                { text: 'to make the sentence longer', outcome: 'Not quite — Students think describing growth means just writing what happens in order without adding.', reveals: 'describing-growth-means-just-writing' },
                { text: 'seed -> sprout -> leaf -> flower', outcome: 'Not quite — Students think describing growth means just writing what happens in order without adding.', reveals: 'describing-growth-means-just-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'The Cherry Tree\' for homework, a student writes: \'Setting: Mussoorie. The story is just about a boy and his grandfather, so the place doesn\'t matter — it could be anywhere.\'',
            decisions: [{ prompt: 'What does the Mussoorie setting actually contribute?', options: [
                { text: 'It is an active force — stony soil, icy winds, steep slopes, grazing goats and monsoon downpours are the obstacles the seedling must survive; strip them away and the tree\'s survival is no longer an earned triumph of resilience.', outcome: 'This shows setting driving the conflict: the Himalayan environment creates the struggle that gives the story its meaning.' },
                { text: 'The student is right — naming the town completes the setting analysis, and the plot would unfold identically on a warm farm in the plains.', outcome: 'On soft fertile soil a seed\'s survival is routine, not miraculous; the harsh terrain is what turns a small tree into the story\'s achievement.', reveals: 'setting-is-a-label' },
                { text: 'The setting matters only for mood — it makes the story feel cold and quiet but changes nothing that happens.', outcome: 'Mood is only half of it; the cold snaps, slopes and goats directly threaten the sapling and shape what the characters must do.', reveals: 'setting-is-mood-only' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_14', title: 'The bigger picture',
          caseStudy: { intro: 'On easy ground, a tree is just a tree. On a Mussoorie slope, every leaf is a victory. The setting creates the struggle — and the struggle creates the meaning.',
            decisions: [{ prompt: 'What comes next? The Cherry Tree · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Cherry Tree · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch4_1', difficulty: 'standard',
          question: 'Setting refers to the physical environment, geographical location, climate, and.',
          hint: 'If stuck, review c7_engl_ch04_001 to practice identifying how environmental features and.',
          misconception: 'Students often treat "setting" as merely a named town (e.g., "Mussoorie") or a passive backdrop, failing to realize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the physical environment, geographical location, climate, and time',
                  options: ['Setting refers to the physical environment, geographical location, climate, and time', 'Comprehension of the narrative journey from seed to fruit-bearing tree involves', 'In literary analysis, examining "luck in the context of effort" means critically', 'Writing a clear, ordered description of how a plant changes from seed to mature plant,'],
                  hint: 'If stuck, review c7_engl_ch04_001 to practice identifying how environmental features and physical.',
                  misconception: 'Students often treat "setting" as merely a named town (e.g., "Mussoorie") or a passive backdrop, failing to realize that geography and.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['When a student treats setting as a passive label, use the "Setting-to-Plot Connection Matrix": 1.', 'Ask the student to identify 3 physical features of Mussoorie from the story (e.g., stony soil, icy winter wind, monsoon.', 'For each feature, ask: "What problem or change did this feature cause for Rakesh or the cherry tree?" 3.', 'Prompt them: "If the setting were a warm, sheltered green garden with soft black soil, how would the plant\'s story.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_10', difficulty: 'standard',
          question: 'Comprehension of the narrative journey from seed to fruit-bearing tree involves.',
          hint: 'If stuck, ask the student: "What was the very first thing Rakesh held in his hand, and.',
          misconception: 'Students often believe that plant growth in literature happens in a smooth, linear fashion—that once a seed is planted.',
          parts: [
                { id: 'a', prompt: 'Read this excerpt: *"In the spring, a tender green shoot appeared in the garden. By the end of the monsoon, it was a foot high.', answer: 'The plant did not die',
                  options: ['The plant did not die', 'because Rakesh bought a new seed', 'because plants don\'t need leaves to live'],
                  hint: 'If stuck, ask the student: "What was the very first thing Rakesh held in his hand, and what did.',
                  misconception: 'Students often believe that plant growth in literature happens in a smooth, linear fashion—that once a seed is planted, it simply grows.' }
          ],
            remediations: { 'plant-growth-in-literature-happens': { steps: ['When a student fails to identify growth stages or physical setbacks: 1.', 'Draw a simple 4-box horizontal flowchart on paper: [Box 1: Seed] -> [Box 2: First Shoot] -> [Box 3: Setbacks] -> [Box.', 'Ask the student to scan the passage specifically for "danger words" (e.g., *cut, ate, winter, storm, scythe*) and write.', 'Have the student highlight time phrases (*in spring*, *after two years*, *by monsoon*) in green pencil.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that plant growth in literature happens in a smooth, linear fashion—that once a seed is planted.',
          parts: [
                { id: 'a', prompt: 'Evaluate Grandfather’s advice to Rakesh when the seed was first planted: *"Nothing is useful until you sell it or use it, but planting a seed gives it a life.', answer: 'Grandfather\'s statement is justified',
                  options: ['Grandfather\'s statement is justified', 'It is useful because they can sell cherries at the market'],
                  hint: 'If stuck, ask the student: "What was the very first thing Rakesh held in his hand, and what did.',
                  misconception: 'Students often believe that plant growth in literature happens in a smooth, linear fashion—that once a seed is planted, it simply grows.' }
          ],
            remediations: { 'plant-growth-in-literature-happens': { steps: ['When a student fails to identify growth stages or physical setbacks: 1.', 'Draw a simple 4-box horizontal flowchart on paper: [Box 1: Seed] -> [Box 2: First Shoot] -> [Box 3: Setbacks] -> [Box.', 'Ask the student to scan the passage specifically for "danger words" (e.g., *cut, ate, winter, storm, scythe*) and write.', 'Have the student highlight time phrases (*in spring*, *after two years*, *by monsoon*) in green pencil.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_11', difficulty: 'standard',
          question: 'In literary analysis, examining "luck in the context of effort" means.',
          hint: 'If stuck, review `c8_engl_ch4_4` (Plot: Growing a Cherry Tree from a Seed) to list every.',
          misconception: 'Students often confuse "luck" with "pure random chance" (like winning a lottery).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In literary analysis, examining "luck in the context of effort" means critically',
                  options: ['In literary analysis, examining "luck in the context of effort" means critically', 'Setting refers to the physical environment, geographical location, climate, and time', 'Comprehension of the narrative journey from seed to fruit-bearing tree involves', 'Writing a clear, ordered description of how a plant changes from seed to mature plant,'],
                  hint: 'If stuck, review `c8_engl_ch4_4` (Plot: Growing a Cherry Tree from a Seed) to list every action.',
                  misconception: 'Students often confuse "luck" with "pure random chance" (like winning a lottery).' }
          ],
            remediations: { 'students-often-confuse-luck-with': { steps: ['If a student exhibits this misconception, follow this 3-step remediation: 1.', '**Trace the Plot Timeline:** Draw a timeline of the cherry tree\'s life on the board.', 'Mark every disaster (goat attack, scythe cutting, harsh winter frost).', '**Remove the Effort:** Ask the student: "If Rakesh had thrown the seed on the road and walked away forever, would the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_12', difficulty: 'standard',
          question: 'Writing a clear, ordered description of how a plant changes from seed to mature.',
          hint: 'If stuck, review the concept of sensory description from c6_english_u1_009.',
          misconception: 'Students think describing growth means just writing what happens in order without adding descriptive language; they.',
          parts: [
                { id: 'a', prompt: 'Compare these two descriptions of a sunflower’s growth: (A) "The seed was planted. It grew a stem.', answer: 'Description (B) is more effective',
                  options: ['Description (B) is more effective', 'seed -> sprout -> leaf -> flower'],
                  hint: 'If stuck, review the concept of sensory description from c6_english_u1_009.',
                  misconception: 'Students think describing growth means just writing what happens in order without adding descriptive language; they produce a list.' }
          ],
            remediations: { 'describing-growth-means-just-writing': { steps: ['To fix, first ask the student to close eyes and imagine the plant at each stage, then prompt them to name one thing.', 'Next, teach them to add at least one adjective to each noun and one simile per paragraph.', 'Finally, have them rewrite their list, inserting these details and sequence words, and check that each sentence answers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_13', difficulty: 'standard',
          question: 'A stanza-by-stanza summary breaks down a poem section by section, identifying.',
          hint: 'If stuck, review `c7_engl_ch04_011` to practice picking out key action words from short.',
          misconception: 'Students often view stanzas in a poem as isolated chunks of text rather than connected stages of a continuous narrative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A stanza-by-stanza summary breaks down a poem section by section, identifying the core',
                  options: ['A stanza-by-stanza summary breaks down a poem section by section, identifying the core', 'Setting refers to the physical environment, geographical location, climate, and time', 'Comprehension of the narrative journey from seed to fruit-bearing tree involves', 'In literary analysis, examining "luck in the context of effort" means critically'],
                  hint: 'If stuck, review `c7_engl_ch04_011` to practice picking out key action words from short poetic.',
                  misconception: 'Students often view stanzas in a poem as isolated chunks of text rather than connected stages of a continuous narrative or argument.' }
          ],
            remediations: { 'students-often-view-stanzas-in': { steps: ['When a student struggles to trace stanza-by-stanza progression: 1.', 'Have them draw a 4-panel "storyboard" grid on paper.', 'Label each panel with a Stanza Number (Stanza 1, Stanza 2, etc.).', 'Ask the student to identify one key "action verb" and one "main object" in each stanza (e.g., Stanza 1: *plant seed*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_14', difficulty: 'standard',
          question: 'Rhyme scheme is the ordered pattern of rhyming words at the ends of lines in.',
          hint: 'If students cannot identify which lines rhyme, practice reading pairs of end-words aloud.',
          misconception: 'Students treat rhyme scheme as a label to identify ("it\'s abab") and stop there, without explaining what the scheme.',
          parts: [
                { id: 'a', prompt: 'In "The Cherry Tree," if stanza 3 breaks the established rhyme scheme (e.g., from aabb to abcb), what might this signal about the tree\'s experience?', answer: 'A break in rhyme scheme signals a disruption',
                  options: ['A break in rhyme scheme signals a disruption', 'the poet made a mistake'],
                  hint: 'If students cannot identify which lines rhyme, practice reading pairs of end-words aloud and asking.',
                  misconception: 'Students treat rhyme scheme as a label to identify ("it\'s abab") and stop there, without explaining what the scheme does.' }
          ],
            remediations: { 'students-treat-rhyme-scheme-as': { steps: ['Have the student read two stanzas aloud — one aabb, one abab — and ask: "Which feels more settled?', 'Which feels more tense?" This builds ear-awareness of rhyme effect.', 'Give the student a poem with no rhyme markings and have them mark it letter by letter, checking each pair.', 'Ask: "If the poet had chosen the OTHER scheme, how would the poem feel different?" This forces them to see rhyme as.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
