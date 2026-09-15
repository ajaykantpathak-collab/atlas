import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch02_p3: SimDef = {
    id: 'v3_c7_engl_ch02_p3',
    title: 'Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 3/3',
    subtitle: 'This node covers identifying and analyzing visual imagery and sensory descriptions within.',
    classLevel: 7, subject: 'engl', topic: 'Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 3/3',
    chapters: ['c7_engl_ch02'],
    nodeIds: ['c7_engl_ch02_013', 'c7_engl_ch02_014', 'c7_engl_ch02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever closed your eyes while someone describes a bustling market in Delhi or a rainy afternoon.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A respected human doctor loses every patient because his house overflows with ducks, pigs, and owls — and he chooses the animals anyway. Is he just eccentric, or is something deeper going on?',
        options: ['His radical empathy is a moral choice — he values the wellbeing of animals above wealth, reputation, and polite society', 'He is simply bad at business and cannot help it', 'He lost his medical license for incompetence', 'He is collecting animals to sell them later'],
        answer: 'His radical empathy is a moral choice — he values the wellbeing of animals above wealth, reputation, and polite society',
        hook: 'Dr Dolittle is not merely a funny pet collector. Losing income, patients, and social standing are sacrifices — and when his parrot teaches him that animals have their own language, pets become voices worth listening to, not objects.',
    },
    teaching: [
        { title: 'Poem: Imagery and Visual Description in Poetry', text: 'Imagery and visual description in poetry refer to the use of vivid, sensory language by a poet to paint mental pictures in the reader\'s mind, appealing primarily to the sense of sight but often.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the case for Dr Dolittle — gather three sacrifices he makes for animals and one moment an animal teaches him, then argue whether leaving human medicine was wisdom or folly.',
        labels: ['Poem: Imagery and Visual', 'Poetic Devices: Simile, Alliteration', 'Writing: Comparing Prose'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch02_013', title: 'Poem: Imagery and Visual Description in Poetry',
          caseStudy: { intro: 'Have you ever closed your eyes while someone describes a bustling market in Delhi or a rainy afternoon in Kerala, and you could actually see the colors and.',
            decisions: [{ prompt: 'What is the primary purpose of visual imagery in a poem?', options: [
                { text: 'The primary purpose of visual imagery is to create vivid mental pictures in the reader\'s', outcome: 'The primary purpose of visual imagery is to create vivid mental pictures in the reader\'s mind using.' },
                { text: 'visual imagery', outcome: 'Not quite — Students often believe that any descriptive word or adjective in a poem is automatically an example.', reveals: 'any-descriptive-word-or-adjective' },
                { text: 'poetry devices are only about sound rather than creating sensory experiences', outcome: 'Not quite — Students often believe that any descriptive word or adjective in a poem is automatically an example.', reveals: 'any-descriptive-word-or-adjective' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_014', title: 'Poetic Devices: Simile, Alliteration and Personification',
          caseStudy: { intro: 'Imagine reading a poem where the wind "whispers secrets to the sleeping trees" and a swift dog runs "as fast as lightning." How do poets make these animals and.',
            decisions: [{ prompt: 'Which poetic device is used in the phrase "the clever cat crept quietly"?', options: [
                { text: 'alliteration', outcome: 'The correct answer is alliteration. Alliteration is the repetition of the same consonant sound ("c".' },
                { text: 'simile', outcome: 'Not quite — Students often confuse similes and metaphors because both compare two things, or they mistakenly.', reveals: 'students-often-confuse-similes-and' },
                { text: 'personification', outcome: 'Not quite — Students often confuse similes and metaphors because both compare two things, or they mistakenly.', reveals: 'students-often-confuse-similes-and' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A family friend gives up a high-paying city clinic to run a free shelter for injured street animals. Relatives call it a waste of a medical degree — \'he had everything, and he chose dogs.\'',
            decisions: [{ prompt: 'How would Dr. Dolittle\'s story judge the friend\'s choice?', options: [
                { text: 'As success, not failure — Dolittle was called foolish for the same reason: he preferred animals and meaningful work over wealthy patients and status, and the story shows his devotion made him better at healing, not worse. The friend\'s choice mirrors that — the townspeople\'s verdict measures money, but the chapter measures purpose.', outcome: 'The chapter quietly redefines success: Dolittle\'s \'failure\' by society\'s ledger was a life aligned with what he loved, which is exactly what the friend has chosen.' },
                { text: 'The relatives are right — success is income and status, and the friend traded both away.', outcome: 'That is the townspeople\'s measure in the story — and the story\'s whole point is that it misjudges Dolittle, whose real achievement was a life of purpose.', reveals: 'success-equals-wealth' },
                { text: 'It is admirable but doomed — anyone choosing animals over human patients must fail in the end.', outcome: 'Dolittle\'s life contradicts that — his choice made him uniquely effective and fulfilled; the story predicts flourishing, not failure.', reveals: 'purpose-always-fails' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_015', title: 'You made it',
          caseStudy: { intro: 'Real character hides in what a person gives up. Dolittle traded status for compassion — and found his true calling in the bargain.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch02_013', difficulty: 'standard',
          question: 'Imagery and visual description in poetry refer to the use of vivid, sensory.',
          hint: 'Review Class 6 poetic devices regarding imagery and practice identifying color words.',
          misconception: 'Students often believe that any descriptive word or adjective in a poem is automatically an example of "visual.',
          parts: [
                { id: 'a', prompt: 'A poet writes about a sleeping owl: "A ball of brown feathers tucked tightly against the bark." How would you transform this into a stronger visual image using.', answer: 'Steps: (1) Identify the existing visual elements ("brown feathers", "bark")',
                  options: ['Steps: (1) Identify the existing visual elements ("brown feathers", "bark")', 'A ball of brown feathers touched by silver moonlight against the dark bark', 'visual imagery'],
                  hint: 'Review Class 6 poetic devices regarding imagery and practice identifying color words in simple.',
                  misconception: 'Students often believe that any descriptive word or adjective in a poem is automatically an example of "visual imagery." For example, they.' }
          ],
            remediations: { 'any-descriptive-word-or-adjective': { steps: ['If a student struggles with this misconception, have them use a highlighter to mark words in a poem.', 'Instruct them: "If you cannot close your eyes and literally draw or picture the exact color, shape, or light being.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_014', difficulty: 'standard',
          question: 'A simile is a figure of speech comparing two different things using "like".',
          hint: 'Review the definitions of similes (comparing with like/as), alliteration (sound.',
          misconception: 'Students often confuse similes and metaphors because both compare two things, or they mistakenly label any animal.',
          parts: [
                { id: 'a', prompt: 'Which poetic device is used in the phrase "the clever cat crept quietly"?', answer: 'alliteration',
                  options: ['alliteration', 'simile', 'personification'],
                  hint: 'Review the definitions of similes (comparing with like/as), alliteration (sound repetition), and.',
                  misconception: 'Students often confuse similes and metaphors because both compare two things, or they mistakenly label any animal action in a story.' },
                { id: 'b', prompt: 'Explain why the sentence "The wind whispered through the tall eucalyptus trees" is an example of personification.', answer: 'that the wind is given the human action of "whispering,"',
                  options: ['that the wind is given the human action of "whispering,"', 'personification'],
                  hint: 'Review the definitions of similes (comparing with like/as), alliteration (sound repetition), and.',
                  misconception: 'Students often confuse similes and metaphors because both compare two things, or they mistakenly label any animal action in a story.' }
          ],
            remediations: { 'students-often-confuse-similes-and': { steps: ['If a student struggles, guide them through a 3-step check: (1) Look for the exact comparison words "like" or "as"—if.', '(2) Ask: "Can a non-human thing or animal actually do this human action?" If yes, it\'s literal; if no (like a tree.', '(3) Count starting consonant sounds in consecutive words to spot alliteration.', 'Have them practice sorting mixed sentences into three separate columns headed Simile, Alliteration, and Personification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse similes and metaphors because both compare two things, or they mistakenly label any animal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using the alliteration "busy bees buzzed beside the blooming bush" versus simply writing "active insects flew near the plant".', answer: 'The alliteration "busy bees buzzed" is much more effective in poetry',
                  options: ['The alliteration "busy bees buzzed" is much more effective in poetry', 'personification'],
                  hint: 'Review the definitions of similes (comparing with like/as), alliteration (sound repetition), and.',
                  misconception: 'Students often confuse similes and metaphors because both compare two things, or they mistakenly label any animal action in a story.' }
          ],
            remediations: { 'students-often-confuse-similes-and': { steps: ['If a student struggles, guide them through a 3-step check: (1) Look for the exact comparison words "like" or "as"—if.', '(2) Ask: "Can a non-human thing or animal actually do this human action?" If yes, it\'s literal; if no (like a tree.', '(3) Count starting consonant sounds in consecutive words to spot alliteration.', 'Have them practice sorting mixed sentences into three separate columns headed Simile, Alliteration, and Personification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_015', difficulty: 'standard',
          question: 'Comparing prose and poetry on the same theme involves analyzing how different.',
          hint: 'Review c7_engl_ch02_011 for poetry tone and c7_engl_ch02_004 for prose themes before.',
          misconception: 'Students often believe that if a poem and a prose story are about the same animal, they must have the exact same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing prose and poetry on the same theme involves analyzing how different literary',
                  options: ['Comparing prose and poetry on the same theme involves analyzing how different literary', 'Character analysis of Dr', 'Polynesia the parrot acts as a wise mentor, translator, and moral compass for Dr', 'The narrative arc that traces Dr'],
                  hint: 'Review c7_engl_ch02_011 for poetry tone and c7_engl_ch02_004 for prose themes before attempting.',
                  misconception: 'Students often believe that if a poem and a prose story are about the same animal, they must have the exact same message and tone.' }
          ],
            remediations: { 'if-a-poem-and-a': { steps: ['When a student struggles to differentiate prose and poetry on the same theme, guide them step-by-step using.', 'Ask them to read a short prose paragraph and a poem about an animal, then have them circle words that tell a story.', 'Say: "Look at how the prose tells you what happened next, but the poem makes you pause and picture the colour and sound.', 'How do those two goals change the way the author writes?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
