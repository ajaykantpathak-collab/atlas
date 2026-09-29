import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch04_p2: SimDef = {
    id: 'v3_c8_engl_ch04_p2',
    title: 'The Cherry Tree · Part 2/3',
    subtitle: 'A tree, a mountain, and a fight to survive',
    classLevel: 8, subject: 'engl', topic: 'The Cherry Tree · Part 2/3',
    chapters: ['c8_engl_ch04'],
    nodeIds: ['c8_engl_ch4_15', 'c8_engl_ch4_16', 'c8_engl_ch4_17', 'c8_engl_ch4_2', 'c8_engl_ch4_3', 'c8_engl_ch4_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young gardener in the Himalayan foothills', intro: 'Rakesh plants a cherry seed where nothing wants to grow — stony soil, icy winds, hungry goats. Read the mountain itself to understand what the little tree is really up against.', goal: 'Analyze how the physical setting of Mussoorie — terrain, climate and seasons — acts as an active force shaping the plot, mood and theme of \'The Cherry Tree\'.' },
    discovery: {
        question: 'Why does Ruskin Bond plant his cherry seed on a stony Mussoorie hillside instead of a warm, flat farm where it would grow easily?',
        options: ['Because surviving the harsh mountains — frost, stony soil, monsoon goats — turns the tree\'s growth into a story about resilience', 'Because cherries only grow in Mussoorie', 'Because the plains were too far from his house', 'Setting doesn\'t matter — it\'s just a backdrop'],
        answer: 'Because surviving the harsh mountains — frost, stony soil, monsoon goats — turns the tree\'s growth into a story about resilience',
        hook: 'Setting isn\'t a painted poster behind the action — it\'s an active opponent. In Mussoorie, the cold winds and stony soil fight the little tree, and that fight is exactly what makes its survival feel like a miracle.',
    },
    teaching: [
        { title: 'Poetic Devices: Personification and Imagery in the Nature Poem', text: 'Personification is a poetic device that gives human qualities (actions, emotions, thoughts) to non-human things; in "The Cherry Tree" poem, the tree is personified as a struggling, determined living.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch4_15', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the Himalayan seasons through the story: the winter frost that stunts the sapling, the monsoon that feeds it, the goats that threaten it — and show how each attack from the setting drives the plot forward.',
        labels: ['Poetic Devices: Personification', 'Poem: Tone of Wonder', 'Writing: Tracing a Theme', 'Character Analysis: Rakesh as', 'Character Analysis: Grandfather as', 'Plot: Growing a Cherry'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch4_15', title: 'Poetic Devices: Personification and Imagery in the Nature Poem',
          caseStudy: { intro: 'Read the poem and underline every word that gives the tree a human action: does it "struggle," "reach," "refuse," "persist"?',
            decisions: [{ prompt: 'In the line "The cherry tree thrust its head through stony ground," identify the personification and explain what human quality it gives.', options: [
                { text: 'The personification is "thrust its head"', outcome: 'The personification is "thrust its head" — "thrust" is a forceful, deliberate action (a human.' },
                { text: 'it\'s imagery', outcome: 'Not quite — Students identify personification and imagery as separate labels ("this is personification, this.', reveals: 'students-identify-personification-and-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_16', title: 'Poem: Tone of Wonder and Growth in the Cherry Tree Poem',
          caseStudy: { intro: 'Think about watching a seed you planted — first you feel curious (will it grow?), then anxious (will it survive the rain?), then proud (it has fruit!).',
            decisions: [{ prompt: 'What is the difference between tone (poet\'s attitude) and mood (reader\'s feeling)? Use an example from "The Cherry Tree."', options: [
                { text: 'Tone is the poet\'s attitude toward the subject (the tree and its growth)', outcome: 'Tone is the poet\'s attitude toward the subject (the tree and its growth); mood is the feeling.' },
                { text: 'they are the same', outcome: 'Not quite — Students confuse tone with mood and use them interchangeably. They also identify tone with a single.', reveals: 'students-confuse-tone-with-mood' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_2', title: 'Character Analysis: Rakesh as a Curious and Patient Child',
          caseStudy: { intro: 'Have you ever planted a seed in a small cup or pot, only to dig it up the very next day because you were too excited to see if it had grown?',
            decisions: [{ prompt: 'State two specific physical actions Rakesh performs immediately after planting the cherry seed that demonstrate his curiosity.', options: [
                { text: 'Rakesh pats the soil flat with his hands and immediately looks for signs of growth, and', outcome: 'Rakesh pats the soil flat with his hands and immediately looks for signs of growth, and later, when.' },
                { text: 'He ate cherries and threw the seed', outcome: 'Not quite — Students often view character traits as "all-or-nothing" switches.', reveals: 'students-often-view-character-traits' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_3', title: 'Character Analysis: Grandfather as a Wise and Encouraging Guide',
          caseStudy: { intro: 'Have you ever had a grandparent or elder who didn\'t scold you when you made a mistake, but instead asked you a quiet question that made you think?',
            decisions: [{ prompt: 'What core trait does Grandfather demonstrate when he tells Rakesh, "Nothing is lucky if you put it away.', options: [
                { text: 'Grandfather demonstrates practical wisdom and encouraging guidance', outcome: 'Grandfather demonstrates practical wisdom and encouraging guidance.' },
                { text: 'being a mentor/guide', outcome: 'Not quite — Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They.', reveals: 'students-often-confuse-being-a' },
                { text: 'doing everything for the protagonist', outcome: 'Not quite — Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They.', reveals: 'students-often-confuse-being-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_15', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'The Cherry Tree\' for homework, a student writes: \'Setting: Mussoorie. The story is just about a boy and his grandfather, so the place doesn\'t matter — it could be anywhere.\'',
            decisions: [{ prompt: 'What does the Mussoorie setting actually contribute?', options: [
                { text: 'It is an active force — stony soil, icy winds, steep slopes, grazing goats and monsoon downpours are the obstacles the seedling must survive; strip them away and the tree\'s survival is no longer an earned triumph of resilience.', outcome: 'This shows setting driving the conflict: the Himalayan environment creates the struggle that gives the story its meaning.' },
                { text: 'The student is right — naming the town completes the setting analysis, and the plot would unfold identically on a warm farm in the plains.', outcome: 'On soft fertile soil a seed\'s survival is routine, not miraculous; the harsh terrain is what turns a small tree into the story\'s achievement.', reveals: 'setting-is-a-label' },
                { text: 'The setting matters only for mood — it makes the story feel cold and quiet but changes nothing that happens.', outcome: 'Mood is only half of it; the cold snaps, slopes and goats directly threaten the sapling and shape what the characters must do.', reveals: 'setting-is-mood-only' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch4_4', title: 'The bigger picture',
          caseStudy: { intro: 'On easy ground, a tree is just a tree. On a Mussoorie slope, every leaf is a victory. The setting creates the struggle — and the struggle creates the meaning.',
            decisions: [{ prompt: 'What comes next? The Cherry Tree · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Cherry Tree · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch4_15', difficulty: 'standard',
          question: 'Personification is a poetic device that gives human qualities (actions.',
          hint: 'If students confuse personification with metaphor, review: personification gives human.',
          misconception: 'Students identify personification and imagery as separate labels ("this is personification, this is imagery") but fail.',
          parts: [
                { id: 'a', prompt: 'In the line "The cherry tree thrust its head through stony ground," identify the personification and explain what human quality it gives the tree.', answer: 'The personification is "thrust its head"',
                  options: ['The personification is "thrust its head"', 'it\'s imagery'],
                  hint: 'If students confuse personification with metaphor, review: personification gives human qualities.',
                  misconception: 'Students identify personification and imagery as separate labels ("this is personification, this is imagery") but fail to see how they work.' },
                { id: 'b', prompt: 'What sense does the word "crackling" engage, and how does this auditory image contribute to the poem\'s effect?', answer: '"Crackling" engages hearing (auditory imagery)',
                  options: ['"Crackling" engages hearing (auditory imagery)', 'it\'s a visual image'],
                  hint: 'If students confuse personification with metaphor, review: personification gives human qualities.',
                  misconception: 'Students identify personification and imagery as separate labels ("this is personification, this is imagery") but fail to see how they work.' },
                { id: 'c', prompt: 'A student says "the tree is green" is imagery. Evaluate this claim.', answer: 'The claim is partially correct but analytically weak',
                  options: ['The claim is partially correct but analytically weak', 'it\'s imagery'],
                  hint: 'If students confuse personification with metaphor, review: personification gives human qualities.',
                  misconception: 'Students identify personification and imagery as separate labels ("this is personification, this is imagery") but fail to see how they work.' }
          ],
            remediations: { 'students-identify-personification-and-imagery': { steps: ['Give the student a line with both devices and ask them to circle personification in one color and imagery in another.', 'If they cannot separate them, review definitions.', 'Ask: "If we removed the personification, how would the line feel different?" This forces them to see what the device.', 'Have the student write three versions of one scene: no devices, imagery only, imagery + personification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_16', difficulty: 'standard',
          question: 'Tone in "The Cherry Tree" poem is the poet\'s attitude toward the subject.',
          hint: 'If students confuse tone and mood, draw two columns: "Poet\'s attitude (tone)" and.',
          misconception: 'Students confuse tone with mood and use them interchangeably. They also identify tone with a single word ("happy,".',
          parts: [
                { id: 'a', prompt: 'What is the difference between tone (poet\'s attitude) and mood (reader\'s feeling)? Use an example from "The Cherry Tree."', answer: 'Tone is the poet\'s attitude toward the subject (the tree and its growth)',
                  options: ['Tone is the poet\'s attitude toward the subject (the tree and its growth)', 'they are the same'],
                  hint: 'If students confuse tone and mood, draw two columns: "Poet\'s attitude (tone)" and "Reader\'s feeling.',
                  misconception: 'Students confuse tone with mood and use them interchangeably. They also identify tone with a single word ("happy," "sad") rather than.' },
                { id: 'b', prompt: 'Identify the tone of a stanza that contains the words "tiny," "fragile," "barely visible." How do these words create that tone?', answer: 'The tone is wonder mixed with tenderness',
                  options: ['The tone is wonder mixed with tenderness', 'the tone is sad'],
                  hint: 'If students confuse tone and mood, draw two columns: "Poet\'s attitude (tone)" and "Reader\'s feeling.',
                  misconception: 'Students confuse tone with mood and use them interchangeably. They also identify tone with a single word ("happy," "sad") rather than.' },
                { id: 'c', prompt: 'In the final stanza, the poet writes "and finally, it bore fruit — red, round, complete." What tone do these words create and why is "finally" the key word?', answer: 'The tone is quiet admiration and fulfilled anticipation',
                  options: ['The tone is quiet admiration and fulfilled anticipation', 'the tone is happy'],
                  hint: 'If students confuse tone and mood, draw two columns: "Poet\'s attitude (tone)" and "Reader\'s feeling.',
                  misconception: 'Students confuse tone with mood and use them interchangeably. They also identify tone with a single word ("happy," "sad") rather than.' }
          ],
            remediations: { 'students-confuse-tone-with-mood': { steps: ['Give the student two stanzas with opposite tones and ask them to circle the words that create each tone.', 'If they cannot find the diction, they are reading for content, not attitude.', 'Ask: "If the poet felt X, what words would they use?" This reverses the process — building tone from intention.', 'Have the student rewrite a stanza in a different tone (e.g., make the wonder stanza sound angry) by changing only word.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_17', difficulty: 'standard',
          question: 'Tracing a theme across prose and poetry is the analytical writing process.',
          hint: 'If a student is stuck, review how to summarize a story\'s moral in one abstract word.',
          misconception: 'Students frequently confuse **Plot Summary** with **Thematic Analysis**.',
          parts: [
                { id: 'a', prompt: 'Read the following student thesis statement for a comparative response: *"Ruskin Bond\'s story and the poem both feature a young cherry plant in Mussoorie."*.', answer: 'This statement is weak',
                  options: ['This statement is weak', 'sharing a setting or object is equivalent to sharing a central theme'],
                  hint: 'If a student is stuck, review how to summarize a story\'s moral in one abstract word (e.g.',
                  misconception: 'Students frequently confuse **Plot Summary** with **Thematic Analysis**.' }
          ],
            remediations: { 'students-frequently-confuse-plot-summary': { steps: ['**Thematic Abstraction Step:** Give the student a 2-column list.', 'Column A lists literal plot actions ("Rakesh waters the plant"), and Column B lists abstract values ("Patience".', 'Have the student match actions to abstract values.', '**Matrix Blueprint:** Introduce a 3-row Comparative Matrix: - Row 1: Shared Theme Statement - Row 2: Prose Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_2', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch4\': the skill or concept this node teaches.',
          hint: 'If you are stuck, think back to how you analyzed Anand\'s inventions in Class 7.',
          misconception: 'Students often view character traits as "all-or-nothing" switches.',
          parts: [
                { id: 'a', prompt: 'How does Rakesh\'s behavior change when he realizes the cherry tree will not grow overnight? Explain in your own words.', answer: 'Initially, Rakesh is highly impatient and checks the spot daily',
                  options: ['Initially, Rakesh is highly impatient and checks the spot daily', 'He forgot about it completely and stopped caring'],
                  hint: 'If you are stuck, think back to how you analyzed Anand\'s inventions in Class 7.',
                  misconception: 'Students often view character traits as "all-or-nothing" switches.' }
          ],
            remediations: { 'students-often-view-character-traits': { steps: ['If a student struggles to grasp this gradual change, guide them with a "Character Growth Timeline." 1.', 'Draw a line with three points on a sheet of paper: **The Seed**, **The Broken Stem**, and **The Cherry Blossom**.', 'Ask the student: "At \'The Seed\', what does Rakesh want?" (Answer: Immediate results).', 'Ask: "At \'The Broken Stem\', does he get what he wants?" (Answer: No, the plant is ruined).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_3', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch4\': the skill or concept this node teaches.',
          hint: 'If stuck, review how characters influence one another through dialogue by revisiting.',
          misconception: 'Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They assume Grandfather.',
          parts: [
                { id: 'a', prompt: 'What core trait does Grandfather demonstrate when he tells Rakesh, "Nothing is lucky if you put it away. If you want luck, you must put it to some use"?', answer: 'Grandfather demonstrates practical wisdom and encouraging guidance',
                  options: ['Grandfather demonstrates practical wisdom and encouraging guidance', 'being a mentor/guide', 'doing everything for the protagonist'],
                  hint: 'If stuck, review how characters influence one another through dialogue by revisiting Class 7.',
                  misconception: 'Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They assume Grandfather is wise because he takes.' },
                { id: 'b', prompt: 'A student writes: "Grandfather is a wise guide because he plants the cherry seed for Rakesh and waters it every day." Based on your understanding of the story.', answer: 'To correct this, state: Grandfather does not plant or water the seed for Rakesh',
                  options: ['To correct this, state: Grandfather does not plant or water the seed for Rakesh', 'being a mentor/guide', 'doing everything for the protagonist'],
                  hint: 'If stuck, review how characters influence one another through dialogue by revisiting Class 7.',
                  misconception: 'Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They assume Grandfather is wise because he takes.' }
          ],
            remediations: { 'students-often-confuse-being-a': { steps: ['Ask the student to look at the exact dialogue where Rakesh asks Grandfather what to do with the cherry seed.', 'Highlight who physically pushes the seed into the soil (Rakesh, not Grandfather).', 'Point out Grandfather\'s words: "Nothing is lucky if you put it away..." and explain that a true guide prompts the.', 'Have the student rewrite their character point using the PEEL structure (Point: Grandfather encourages self-reliance.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They assume Grandfather.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Grandfather\'s role in the story is minor because he spends most of his time reading newspapers and sitting near the fire." Do you.', answer: 'I disagree with the statement',
                  options: ['I disagree with the statement', 'being a mentor/guide', 'doing everything for the protagonist'],
                  hint: 'If stuck, review how characters influence one another through dialogue by revisiting Class 7.',
                  misconception: 'Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They assume Grandfather is wise because he takes.' },
                { id: 'b', prompt: 'Create a short, 3-sentence dialogic exchange between Rakesh and Grandfather during a moment when rain washes away a fresh soil bed.', answer: 'Expected response example: Rakesh: "Grandfather, look!',
                  options: ['Expected response example: Rakesh: "Grandfather, look!', 'being a mentor/guide', 'doing everything for the protagonist'],
                  hint: 'If stuck, review how characters influence one another through dialogue by revisiting Class 7.',
                  misconception: 'Students often confuse "being a mentor/guide" with "doing everything for the protagonist." They assume Grandfather is wise because he takes.' }
          ],
            remediations: { 'students-often-confuse-being-a': { steps: ['Ask the student to look at the exact dialogue where Rakesh asks Grandfather what to do with the cherry seed.', 'Highlight who physically pushes the seed into the soil (Rakesh, not Grandfather).', 'Point out Grandfather\'s words: "Nothing is lucky if you put it away..." and explain that a true guide prompts the.', 'Have the student rewrite their character point using the PEEL structure (Point: Grandfather encourages self-reliance.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch4_4', difficulty: 'standard',
          question: 'The plot of a story is the organized sequence of connected events that build.',
          hint: 'If stuck, review how setting and actions create a sequence of events.',
          misconception: 'Students often view a plot as a simple, flat timeline of physical events (e.g., "First Rakesh ate cherries, then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot of a story is the organized sequence of connected events that build tension,',
                  options: ['The plot of a story is the organized sequence of connected events that build tension,', 'From \'English chapter c8_engl_ch4\': the skill or concept this node teaches, applied to', 'Comprehension of the narrative journey from seed to fruit-bearing tree involves', 'In literary analysis, examining "luck in the context of effort" means critically'],
                  hint: 'If stuck, review how setting and actions create a sequence of events in `c7_engl_ch04_003` (Plot.',
                  misconception: 'Students often view a plot as a simple, flat timeline of physical events (e.g., "First Rakesh ate cherries, then he planted the seed, then.' }
          ],
            remediations: { 'students-often-view-a-plot': { steps: ['If a student struggles, guide them using a visual "Plot Mountain" exercise: 1.', 'Draw a mountain on a sheet of paper.', 'Ask the student: "What is the very first thing Rakesh does with the seed?" Write *Planting the Seed* at the bottom left.', 'Ask: "What goes wrong first?" Write *Goat eats leaves* on the rising slope.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
