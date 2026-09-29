import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch02_p2: SimDef = {
    id: 'v3_c7_engl_ch02_p2',
    title: 'Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 2/3',
    subtitle: 'This node covers contextual word analysis specifically for the four words: scholar, vet.',
    classLevel: 7, subject: 'engl', topic: 'Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 2/3',
    chapters: ['c7_engl_ch02'],
    nodeIds: ['c7_engl_ch02_007', 'c7_engl_ch02_008', 'c7_engl_ch02_009', 'c7_engl_ch02_010', 'c7_engl_ch02_011', 'c7_engl_ch02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are reading a story about an extraordinary animal doctor, and you come across a sentence where.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A respected human doctor loses every patient because his house overflows with ducks, pigs, and owls — and he chooses the animals anyway. Is he just eccentric, or is something deeper going on?',
        options: ['His radical empathy is a moral choice — he values the wellbeing of animals above wealth, reputation, and polite society', 'He is simply bad at business and cannot help it', 'He lost his medical license for incompetence', 'He is collecting animals to sell them later'],
        answer: 'His radical empathy is a moral choice — he values the wellbeing of animals above wealth, reputation, and polite society',
        hook: 'Dr Dolittle is not merely a funny pet collector. Losing income, patients, and social standing are sacrifices — and when his parrot teaches him that animals have their own language, pets become voices worth listening to, not objects.',
    },
    teaching: [
        { title: 'Vocabulary in Context: scholar, vet, cracker, sense', text: 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the case for Dr Dolittle — gather three sacrifices he makes for animals and one moment an animal teaches him, then argue whether leaving human medicine was wisdom or folly.',
        labels: ['Vocabulary in Context: scholar,', 'Literary Devices: Dialogue', 'Comprehension: How Dr. Dolittle', 'Critical Thinking: Empathy', 'Poem: Summary and Tone', 'Poem: Rhyme Scheme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch02_007', title: 'Vocabulary in Context: scholar, vet, cracker, sense',
          caseStudy: { intro: 'Imagine you are reading a story about an extraordinary animal doctor, and you come across a sentence where a character is described as a wise "scholar" or.',
            decisions: [{ prompt: 'In the sentence, "The learned scholar spent hours in the library studying ancient animal languages," what does the word "scholar" mean.', options: [
                { text: 'A scholar is an educated person who has great knowledge in a particular field of study', outcome: 'A scholar is an educated person who has great knowledge in a particular field of study.' },
                { text: 'library', outcome: 'Not quite — Students often assume that words like "vet" or "scholar" have only one rigid definition that never.', reveals: 'words-like-vet-or-scholar' },
                { text: 'studying', outcome: 'Not quite — Students often assume that words like "vet" or "scholar" have only one rigid definition that never.', reveals: 'words-like-vet-or-scholar' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_008', title: 'Literary Devices: Dialogue and Characterisation Through Speech',
          caseStudy: { intro: 'Imagine listening to two people talking at a busy bus stop in Delhi—one speaks in hurried, formal English with official words, while the other chats casually.',
            decisions: [{ prompt: 'What is dialogue in a story?', options: [
                { text: 'Dialogue is the conversation between two or more characters in a literary work, marked by', outcome: 'Dialogue is the conversation between two or more characters in a literary work, marked by spoken.' },
                { text: 'He was a kind man', outcome: 'Not quite — Students often believe that character traits are *only* established through explicit author.', reveals: 'character-traits-are-only-established' },
                { text: 'character traits are *only* established through explicit author descriptions (e', outcome: 'Not quite — Students often believe that character traits are *only* established through explicit author.', reveals: 'character-traits-are-only-established' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_009', title: 'Comprehension: How Dr. Dolittle Learns Animal Language',
          caseStudy: { intro: 'Have you ever tried to understand what your pet dog or cat is trying to tell you when they whine by the door or scratch at your bag? When reading how Dr.',
            decisions: [{ prompt: 'Which animal acts as Dr. Dolittle\'s primary teacher and guide when he first starts learning how to speak with animals?', options: [
                { text: 'Polynesia the parrot is Dr', outcome: 'Polynesia the parrot is Dr. Dolittle\'s primary teacher and guide.' },
                { text: 'the dog Jip or the duck Dab-Dab', outcome: 'Not quite — Students often believe that Dr. Dolittle learns animal language overnight through magic, completely.', reveals: 'dr' },
                { text: 'that Dr', outcome: 'Not quite — Students often believe that Dr. Dolittle learns animal language overnight through magic, completely.', reveals: 'dr' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_010', title: 'Critical Thinking: Empathy and Understanding Animals',
          caseStudy: { intro: 'Imagine you see a stray dog shivering in the rain outside your school gate, and a classmate says, "It doesn\'t feel cold; it\'s just an animal." How would you.',
            decisions: [{ prompt: 'What term describes the ability to understand and share the feelings of another living creature, such as an animal?', options: [
                { text: 'empathy', outcome: 'The correct answer is empathy. A wrong answer like "sympathy" or "symbiosis" reveals that the.' },
                { text: 'sympathy', outcome: 'Not quite — Students often confuse anthropomorphism (giving human traits to animals in fairy tales, like.', reveals: 'students-often-confuse-anthropomorphism-giving' },
                { text: 'symbiosis', outcome: 'Not quite — Students often confuse anthropomorphism (giving human traits to animals in fairy tales, like.', reveals: 'students-often-confuse-anthropomorphism-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_011', title: 'Poem: Summary and Tone of the Nature Poem',
          caseStudy: { intro: 'Imagine standing outside during a sudden monsoon shower in your school playground—how does the sudden change in the wind and sky make you feel?',
            decisions: [{ prompt: 'What does the term "tone" refer to in a poem about nature?', options: [
                { text: 'Tone refers to the poet\'s attitude or emotional feeling toward the subject of the poem,', outcome: 'Tone refers to the poet\'s attitude or emotional feeling toward the subject of the poem, such.' },
                { text: 'about the poem\'s structure rather than its emotional voice', outcome: 'Not quite — Students often confuse the poet\'s mood or tone with their own personal feelings about the topic.', reveals: 'students-often-confuse-the-poet' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_012', title: 'Poem: Rhyme Scheme and Rhythm Analysis',
          caseStudy: { intro: 'Have you ever noticed how a song on the radio makes you want to tap your foot while you sing along?',
            decisions: [{ prompt: 'What is the term used to describe the pattern of rhymes at the end of each line of a poem?', options: [
                { text: 'The correct term is "rhyme scheme."', outcome: 'The correct term is "rhyme scheme." A student who answers "rhythm" is confusing the sound pattern.' },
                { text: 'rhyme scheme', outcome: 'Not quite — Students often confuse rhyme scheme (the matching end-sounds of lines marked with letters like.', reveals: 'students-often-confuse-rhyme-scheme' },
                { text: 'rhythm', outcome: 'Not quite — Students often confuse rhyme scheme (the matching end-sounds of lines marked with letters like.', reveals: 'students-often-confuse-rhyme-scheme' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family friend gives up a high-paying city clinic to run a free shelter for injured street animals. Relatives call it a waste of a medical degree — \'he had everything, and he chose dogs.\'',
            decisions: [{ prompt: 'How would Dr. Dolittle\'s story judge the friend\'s choice?', options: [
                { text: 'As success, not failure — Dolittle was called foolish for the same reason: he preferred animals and meaningful work over wealthy patients and status, and the story shows his devotion made him better at healing, not worse. The friend\'s choice mirrors that — the townspeople\'s verdict measures money, but the chapter measures purpose.', outcome: 'The chapter quietly redefines success: Dolittle\'s \'failure\' by society\'s ledger was a life aligned with what he loved, which is exactly what the friend has chosen.' },
                { text: 'The relatives are right — success is income and status, and the friend traded both away.', outcome: 'That is the townspeople\'s measure in the story — and the story\'s whole point is that it misjudges Dolittle, whose real achievement was a life of purpose.', reveals: 'success-equals-wealth' },
                { text: 'It is admirable but doomed — anyone choosing animals over human patients must fail in the end.', outcome: 'Dolittle\'s life contradicts that — his choice made him uniquely effective and fulfilled; the story predicts flourishing, not failure.', reveals: 'purpose-always-fails' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch02_012', title: 'The bigger picture',
          caseStudy: { intro: 'Real character hides in what a person gives up. Dolittle traded status for compassion — and found his true calling in the bargain.',
            decisions: [{ prompt: 'What comes next? Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Wit and Humour: Animals, Birds, and Dr. Dolittle · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch02_007', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches.',
          hint: 'Review Class 6 strategies for context clues (looking for definition clues, example clues.',
          misconception: 'Students often assume that words like "vet" or "scholar" have only one rigid definition that never shifts based.',
          parts: [
                { id: 'a', prompt: 'Read this sentence: "After the stray puppy hurt its paw, Dr. Dolittle acted as a skilled vet to bandage it." Why is the word "vet" used here instead of.', answer: '"Vet" is short for veterinarian',
                  options: ['"Vet" is short for veterinarian', 'stray puppy', 'scholar'],
                  hint: 'Review Class 6 strategies for context clues (looking for definition clues, example clues, and.',
                  misconception: 'Students often assume that words like "vet" or "scholar" have only one rigid definition that never shifts based on story tone, or they.' }
          ],
            remediations: { 'words-like-vet-or-scholar': { steps: ['Have the student read the entire sentence aloud, pointing specifically to the words right before and after the target.', 'Ask, "Does this sentence talk about books, animals, food, or logic?"', 'Match the target word to the correct category. For instance, if looking at "vet," highlight the words "paw," "bandage,".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that words like "vet" or "scholar" have only one rigid definition that never shifts based.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following sentence: "The wise scholar acted like a vet when diagnosing the parrot\'s mood." Is this sentence using both vocabulary words correctly.', answer: 'Yes, the sentence is used correctly',
                  options: ['Yes, the sentence is used correctly', 'scholar'],
                  hint: 'Review Class 6 strategies for context clues (looking for definition clues, example clues, and.',
                  misconception: 'Students often assume that words like "vet" or "scholar" have only one rigid definition that never shifts based on story tone, or they.' }
          ],
            remediations: { 'words-like-vet-or-scholar': { steps: ['Have the student read the entire sentence aloud, pointing specifically to the words right before and after the target.', 'Ask, "Does this sentence talk about books, animals, food, or logic?"', 'Match the target word to the correct category. For instance, if looking at "vet," highlight the words "paw," "bandage,".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_008', difficulty: 'standard',
          question: 'The way an author uses spoken words (dialogue) between characters and their.',
          hint: 'Review the basic definition of dialogue and practice identifying who is speaking in.',
          misconception: 'Students often believe that character traits are *only* established through explicit author descriptions (e.g., "He was.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The way an author uses spoken words (dialogue) between characters and their distinct',
                  options: ['The way an author uses spoken words (dialogue) between characters and their distinct', 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches, applied to', 'Polynesia the parrot acts as a wise mentor, translator, and moral compass for Dr', 'The narrative arc that traces Dr'],
                  hint: 'Review the basic definition of dialogue and practice identifying who is speaking in a short story.',
                  misconception: 'Students often believe that character traits are *only* established through explicit author descriptions (e.g., "He was a kind man") and.' }
          ],
            remediations: { 'character-traits-are-only-established': { steps: ['Remind the student to look beyond *what* is being said to *how* it is said.', 'Ask them: "If your friend said that exact same sentence with a sigh or a shout, what would you think about their mood?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_009', difficulty: 'standard',
          question: 'Comprehension of how Dr. Dolittle learns animal language involves analyzing the.',
          hint: 'Review the specific dialogue between Polynesia and Dr. Dolittle regarding duck-talk and.',
          misconception: 'Students often believe that Dr. Dolittle learns animal language overnight through magic, completely overlooking the.',
          parts: [
                { id: 'a', prompt: 'Which animal acts as Dr. Dolittle\'s primary teacher and guide when he first starts learning how to speak with animals?', answer: 'Polynesia the parrot is Dr',
                  options: ['Polynesia the parrot is Dr', 'the dog Jip or the duck Dab-Dab', 'that Dr'],
                  hint: 'Review the specific dialogue between Polynesia and Dr. Dolittle regarding duck-talk and short-hand.',
                  misconception: 'Students often believe that Dr. Dolittle learns animal language overnight through magic, completely overlooking the gradual, observational.' },
                { id: 'b', prompt: 'When Dr. Dolittle wants to understand what the ducks are saying, how does he apply his observation skills to begin translating their quacks?', answer: 'To understand the ducks, Dr',
                  options: ['To understand the ducks, Dr', 'that Dr'],
                  hint: 'Review the specific dialogue between Polynesia and Dr. Dolittle regarding duck-talk and short-hand.',
                  misconception: 'Students often believe that Dr. Dolittle learns animal language overnight through magic, completely overlooking the gradual, observational.' },
                { id: 'c', prompt: 'Analyze the role that Polynesia\'s advice plays in Dr. Dolittle\'s transition from an ordinary human doctor to an animal doctor who understands speech.', answer: 'Polynesia\'s advice shifts Dr',
                  options: ['Polynesia\'s advice shifts Dr', 'that Dr'],
                  hint: 'Review the specific dialogue between Polynesia and Dr. Dolittle regarding duck-talk and short-hand.',
                  misconception: 'Students often believe that Dr. Dolittle learns animal language overnight through magic, completely overlooking the gradual, observational.' }
          ],
            remediations: { 'dr': { steps: ['Dolittle learned magically, guide them back to the text step-by-step.', 'Ask: "Who spoke to him first?', 'What did Polynesia tell him about the difference between short-hand bird talk and long-hand talking?" Point out.', 'Explain that just like learning French or Hindi in school, Dr.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_010', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch02\': the skill or concept this node teaches.',
          hint: 'Review c7_engl_ch02_004 to see practical examples of how Dr. Dolittle interprets animal.',
          misconception: 'Students often confuse anthropomorphism (giving human traits to animals in fairy tales, like wearing clothes) with.',
          parts: [
                { id: 'a', prompt: 'What term describes the ability to understand and share the feelings of another living creature, such as an animal?', answer: 'empathy',
                  options: ['empathy', 'sympathy', 'symbiosis'],
                  hint: 'Review c7_engl_ch02_004 to see practical examples of how Dr. Dolittle interprets animal sounds.',
                  misconception: 'Students often confuse anthropomorphism (giving human traits to animals in fairy tales, like wearing clothes) with genuine empathy.' },
                { id: 'b', prompt: 'A character in a story keeps a parrot in a tiny cage, feeds it well, and believes the bird is completely happy because it sings.', answer: 'Step 1: Identify the character\'s action (feeding well, keeping in a tiny cage)',
                  options: ['Step 1: Identify the character\'s action (feeding well, keeping in a tiny cage)', 'the character is very empathetic'],
                  hint: 'Review c7_engl_ch02_004 to see practical examples of how Dr. Dolittle interprets animal sounds.',
                  misconception: 'Students often confuse anthropomorphism (giving human traits to animals in fairy tales, like wearing clothes) with genuine empathy.' }
          ],
            remediations: { 'students-often-confuse-anthropomorphism-giving': { steps: ['If a student struggles with this, guide them through a structured contrast exercise.', 'Ask: "What is the difference between what *we* want the animal to be (a toy or pet) and what the animal *naturally*.', 'Remind them that true empathy respects an animal\'s true nature rather than turning them into furry humans.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_011', difficulty: 'standard',
          question: 'The summary of a nature poem is a concise restatement of its main events.',
          hint: 'Review the poem\'s vocabulary list and categorize words into positive (joy, bright) and.',
          misconception: 'Students often confuse the poet\'s mood or tone with their own personal feelings about the topic.',
          parts: [
                { id: 'a', prompt: 'Read these lines: "The fierce wind roared across the silent glen, / And scattered fallen leaves like frightened men." How would you describe the tone of these.', answer: 'The tone is turbulent, dramatic, or fearful',
                  options: ['The tone is turbulent, dramatic, or fearful', 'peaceful', 'fierce', 'roared'],
                  hint: 'Review the poem\'s vocabulary list and categorize words into positive (joy, bright) and.',
                  misconception: 'Students often confuse the poet\'s mood or tone with their own personal feelings about the topic.' },
                { id: 'b', prompt: 'Analyze how word choice creates tone in a short poem about a rainy morning: "Grey clouds press low; the sleepy earth sighs under heavy drops." Which specific.', answer: 'The words "Grey clouds press low" and "heavy drops" create a gloomy tone',
                  options: ['The words "Grey clouds press low" and "heavy drops" create a gloomy tone', 'earth sighs'],
                  hint: 'Review the poem\'s vocabulary list and categorize words into positive (joy, bright) and.',
                  misconception: 'Students often confuse the poet\'s mood or tone with their own personal feelings about the topic.' }
          ],
            remediations: { 'students-often-confuse-the-poet': { steps: ['Guide the student to look strictly at the words on the page rather than their personal memories.', 'Ask them to circle three descriptive verbs or adjectives in the stanza and ask: "Do these words make you feel happy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch02_012', difficulty: 'standard',
          question: 'Rhyme scheme is the pattern of sounds that repeats at the end of a poem\'s.',
          hint: 'Review Class 6 concepts on rhyming words and practice tapping out syllables in simple.',
          misconception: 'Students often confuse rhyme scheme (the matching end-sounds of lines marked with letters like AABB) with rhythm (the.',
          parts: [
                { id: 'a', prompt: 'What is the term used to describe the pattern of rhymes at the end of each line of a poem?', answer: 'The correct term is "rhyme scheme."',
                  options: ['The correct term is "rhyme scheme."', 'rhyme scheme', 'rhythm', 'stanza'],
                  hint: 'Review Class 6 concepts on rhyming words and practice tapping out syllables in simple nursery.',
                  misconception: 'Students often confuse rhyme scheme (the matching end-sounds of lines marked with letters like AABB) with rhythm (the beat or meter.' },
                { id: 'b', prompt: 'If a four-line stanza has lines ending with the words "tree" (A), "bee" (A), "sky" (B), and "high" (B), how is the rhyme scheme properly written?', answer: 'The rhyme scheme is written as "AABB."',
                  options: ['The rhyme scheme is written as "AABB."', 'A student who writes'],
                  hint: 'Review Class 6 concepts on rhyming words and practice tapping out syllables in simple nursery.',
                  misconception: 'Students often confuse rhyme scheme (the matching end-sounds of lines marked with letters like AABB) with rhythm (the beat or meter.' }
          ],
            remediations: { 'students-often-confuse-rhyme-scheme': { steps: ['When a student confuses rhyme with rhythm, ask them to first clap their hands to the words as they read the poem out.', 'Then, have them look only at the final words of each line and check their spelling/sound endings to map out the letters.', 'Explicitly remind them that rhyme is about *what* sounds match at the end, while rhythm is *how* the words march.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
