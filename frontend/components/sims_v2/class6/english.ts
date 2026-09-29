/**
 * Class 6 English — "Curiosity"-aligned NCERT English nodes (u1-u5).
 * Senior depth: literary analysis, grammar application, writing structure.
 * 50 nodes → 10 sims. Real nodeIds from the enhanced graph.
 */
import type { SimDef } from '../engine/types';
import { CharacterMap, LetterFormatter, PlotArcDiagram, PoemHighlighter, SentenceBuilder } from './interactives_english';

export const c6EngRiver: SimDef = {
    id: 'c6_eng_river', title: 'The Day the River Spoke', subtitle: 'Plot, character & theme',
    classLevel: 6, subject: 'english', topic: 'Prose: River Spoke',
    chapters: ['English U1: The Day the River Spoke'],
    nodeIds: ['c6_english_u1_001','c6_english_u1_002','c6_english_u1_003','c6_english_u1_004','c6_english_u1_005','c6_english_u1_009'],
    emoji: '🌊', theme: { bg: 'from-sky-900 to-blue-800', accent: 'sky', scene: 'river' },
    scenario: { role: "a literary detective", intro: "A river speaks to a girl named Jahnavi — but what does the story really mean?", goal: "Uncover the plot, character, and theme." },
    discovery: {
        question: "A river 'speaks' to Jahnavi in the story. What do you think 'speaking' means here?",
        options: ["The river literally talks", "A metaphor for guidance/inspiration", "Jahnavi imagines sounds"],
        answer: "A metaphor for guidance/inspiration",
        hook: "Rivers can't talk — but the story uses the river to GUIDE Jahnavi toward her dream!",
    },
    teaching: [
        { title: 'Story: The Day the River Spoke -- Pl', text: 'The plot is the sequence of events that make up a story\'s action, while the setting is the time and place where these events occur, acting as the foundation Imagine you are playing your favorite game; you need to know where you are stan', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: The Day the River Spoke -- Ch', text: 'Character analysis is the process of looking at what a character says, does, and feels to understand their personality, motivations, and why they act the way th Have you ever wanted to learn something new but felt like you didn\'t have the t', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: The Day the River Spoke -- Th', text: 'A theme is the central, underlying message or big idea about life that an author explores within a story, such as the value of hard work or the importance of  Have you ever wanted to learn a new skill, like playing the guitar or drawing,', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: King Bruce Narrative Poem -- Mea', text: 'A narrative poem is a type of poetry that tells a story, featuring characters, a setting, and a sequence of events. Its primary goal is to convey a lesson or me Have you ever felt like giving up on a math problem or a difficult drawing beca', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Poetic Devices -- Rhyme Scheme,', text: 'Poetic devices are creative tools like rhyme, metaphor, and imagery that poets use to turn simple words into art that paints a picture, creates a rhythm, or hig Have you ever wondered why some song lyrics or poems get stuck in your head whi', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poetry Form: Narrative Poetry and Its', text: 'Narrative poetry is a form of poetry that tells a complete story, featuring a plot with a beginning, middle, and end, as well as characters, a setting, and a se Have you ever told a friend about a movie you saw, explaining how it started, w', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Vocabulary in Context: Words from the', text: 'Vocabulary in context is the skill of determining the meaning of an unfamiliar word by looking at the clues provided in the surrounding sentences or the overall Have you ever been reading a story and bumped into a word you didnt recognize,', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Grammar: Nouns and Pronouns', text: 'A noun is a word that names a person, place, thing, or idea, while a pronoun is a substitute word like \'he\', \'she\', or \'it\' used to avoid repeating the same nou Imagine you are telling your friend about a visit to a market.', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Writing: Letter Writing and Descriptio', text: 'Letter writing is a structured way of communicating messages to specific people, divided into informal letters for friends and family, and formal letters for of Have you ever wanted to tell your best friend about a new game you found, or de', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Speaking and Listening: Expressing Ide', text: 'Speaking and listening are active communication skills where you organize your thoughts to share ideas clearly and pay focused attention to understand others. I Have you ever tried to tell a friend about a great movie, but they didn\'t under', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' }
    ],
    explore: { component: PlotArcDiagram, prompt: 'Sort story events into beginning, middle, end — what order makes sense?' },
    observe: {
        prompt: 'What did you notice about how the river changes Jahnavi?',
        options: ['It gives her courage to try', 'It scares her', 'Nothing changes'],
        answer: 'It gives her courage to try',
    },
    predict: {
        question: 'If Jahnavi never met the river, would she still go to school?',
        options: ['Maybe — but harder', 'Definitely yes', 'Never'],
        answer: 'Maybe — but harder',
        verifyWidget: 'tray', verifyPrompt: 'Think: does the river create her dream or strengthen it?',
    },
    challenges: [
        { type: 'order', question: 'Put the plot in order:', sortItems: [
            { id: 'o0', label: 'She pursues her dream', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Jahnavi wants school', emoji: '▶️', correctBin: 's0' },
            { id: 'o2', label: 'She gains courage', emoji: '▶️', correctBin: 's2' },
            { id: 'o3', label: 'River speaks to her', emoji: '▶️', correctBin: 's1' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Desire → guidance → courage → action!', misconception: 'The river comes AFTER she already wants school.',
          workedExample: ['She wants school first.', 'Then river speaks.', 'Then courage, then action.'] },
        { type: 'mcq', question: 'The river "speaking" is an example of:', answer: 'personification', options: ['simile', 'personification', 'rhyme'],
          hint: 'Giving human qualities to a non-human!', misconception: 'Personification = giving human traits (speech) to a non-human (river).',
          workedExample: ['River = non-human.', 'Speaking = human trait.', 'So = personification.'] },
        { type: 'mcq', question: 'The main theme of the story is:', answer: 'dreams and determination overcome barriers', options: ['rivers are dangerous', 'dreams and determination overcome barriers', 'school is boring'],
          hint: 'What message does the story send?', misconception: 'Theme = the message — Jahnavi\'s dream + determination = overcoming barriers.',
          workedExample: ['Jahnavi wants education.', 'She overcomes obstacles.', 'Theme: dreams overcome barriers.'] },
        { type: 'subpart', question: 'Analyze Jahnavi\'s character:',
          parts: [
            { id: 'a', prompt: 'What does Jahnavi want?', answer: 'to go to school', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'What quality does she show?', answer: 'determination', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in The Day the River Spoke:', hint: 'Work through each part step by step.', misconception: 'Students often think the setting is only the weather or the scenery (e.g., it is sunny). They fail to real', parts: [
            { id: 'a', prompt: 'What is the plot of a story?', answer: 'The plot is the sequence of events that tell the story, usua', hint: 'Think: Story: The Day the River Spoke -- Plot and', misconception: 'Students often think the setting is only the weather or the scenery (e.g., it is sunny). They fail to real', workedExample: ['1','Ask the student to describe a place where they feel calm','2'] },
            { id: 'b', prompt: 'Why is the riverbank in this story considered a liminal or border space?', answer: 'It is a boundary between the familiar village and the vast,', hint: 'Think: Story: The Day the River Spoke -- Plot and', misconception: 'Students often think the setting is only the weather or the scenery (e.g., it is sunny). They fail to real', workedExample: ['1','Ask the student to describe a place where they feel calm','2'] },
            { id: 'c', prompt: 'If the story took place in a crowded classroom instead of a quiet riverbank, how might Jahnavi\'s experience change?', answer: 'She would lose the quiet place where she feels heard and free', hint: 'Think: Story: The Day the River Spoke -- Plot and', misconception: 'Students often think the setting is only the weather or the scenery (e.g., it is sunny). They fail to real', workedExample: ['1','Ask the student to describe a place where they feel calm','2'] },
            { id: 'd', prompt: 'Analyze the relationship between the moment of despair and the river speaking. What does this tell us abou', answer: 'The despair is the inciting incident, providing the motiva', hint: 'Think: Story: The Day the River Spoke -- Plot and', misconception: 'Students often think the setting is only the weather or the scenery (e.g., it is sunny). They fail to real', workedExample: ['1','Ask the student to describe a place where they feel calm','2'] }
        ] },
    ],
    reflect: { prompts: ['How does a character\'s actions reveal their traits?', 'What is the difference between plot and theme?'] },
    successLine: 'Literary analyst! 📚', tryAgainLine: 'Look at what the character DOES.',
};

export const c6EngDolittle: SimDef = {
    id: 'c6_eng_dolittle', title: 'Dr. Dolittle', subtitle: 'Humour & character',
    classLevel: 6, subject: 'english', topic: 'Prose: Dr. Dolittle',
    chapters: ['English U2: Animals, Birds, and Dr. Dolittle'],
    nodeIds: ['c6_english_u2_011','c6_english_u2_012','c6_english_u2_014','c6_english_u2_015','c6_english_u2_016','c6_english_u2_017','c6_english_u2_019'],
    emoji: '🦜', theme: { bg: 'from-emerald-900 to-teal-800', accent: 'emerald', scene: 'animals' },
    scenario: { role: "a humour-critic", intro: "A doctor who talks to animals — why is this story funny?", goal: "Analyze the humour and Dolittle's character." },
    discovery: {
        question: "A doctor who prefers animal patients over human ones — what's funny about that?",
        options: ["It's absurd/unexpected", "Nothing is funny", "It's sad"],
        answer: "It's absurd/unexpected",
        hook: "The humour comes from reversal — animals act like humans, humans act strangely!",
    },
    teaching: [
        { title: 'Story: Animals, Birds, and Dr. Dolitt', text: 'A plot is the sequence of major events that make up a story, while humour refers to the elements—such as irony, absurdity, or character observations—that make a Have you ever tried to tell a friend about a funny movie? You start with First', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: Dr. Dolittle -- Character Ana', text: 'Character analysis is the process of examining a character\'s traits, motivations, and behaviors to understand their role and personality within a story. It invo Think of your favorite cartoon or movie hero—how do you know they are brave o', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: Dr. Dolittle -- Theme: Commun', text: 'Communication and empathy are the abilities to understand, share, and respond to the needs, feelings, and languages of others, even when those others are differ Have you ever tried to comfort a younger sibling or a pet who was sad, even tho', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: The Funny Man Poem -- Tone and H', text: 'Tone in poetry is the poet\'s emotional attitude toward the subject (e.g., playful, serious, or sad), while humour is a literary device that creates amusement by Have you ever seen someone try to drink tea with a fork? You would laugh becaus', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Poetic Devices -- Repetition, Rh', text: 'Poetic devices are creative tools used by poets to make language more interesting, musical, or humorous. They include repetition (re-using words for effect), rh Have you ever noticed how a song gets stuck in your head because it keeps repea', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poetry Form: Limericks -- Structure an', text: 'A limerick is a short, five-line poem that follows a bouncy AABBA rhyme scheme and is specifically designed to be humorous or absurd. It uses a specific rhyth Have you ever heard a joke that sounded like a song because of its beat? Think', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Vocabulary in Context: Words from the', text: 'Vocabulary in context refers to determining the meaning of a word by analyzing the clues provided by the sentences and the overall situation surrounding it, rat Have you ever seen a word in a story that you didn\'t know, but you still unders', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Grammar: Tenses -- Present and Past', text: 'Tenses indicate the time of an action: the Present Tense describes actions happening now or general facts, while the Past Tense describes actions that finished  Think about your day: you \'eat\' breakfast every morning (Present), but yesterda', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Writing: Dialogue Writing and Humorous', text: 'Dialogue writing is the art of recording the exact spoken words between two or more characters, while humorous writing uses wit, surprises, or funny situations  Have you ever tried to tell a friend a funny story that happened at home, but f', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Speaking and Listening: Storytelling a', text: 'Storytelling and recitation are speaking skills that involve narrating a story or performing a poem aloud by using voice modulation, rhythm, and body language t Have you ever noticed how your favorite cartoon character sounds different when', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' }
    ],
    explore: { component: CharacterMap, prompt: 'Match each animal to its problem — who needs Dolittle' },
    challenges: [
        { type: 'mcq', question: 'The main source of humour in the story is:', answer: 'animals acting like humans', options: ['sad events', 'animals acting like humans', 'scary scenes'],
          hint: 'What makes it funny?', misconception: 'Humour = reversal — animals have human problems, humans act absurd.',
          workedExample: ['Crocodile complains about diet.', 'Animals talk like people.', 'That reversal = funny.'] },
        { type: 'mcq', question: 'Dr. Dolittle learns animal languages because he is:', answer: 'empathetic and dedicated', options: ['lazy', 'empathetic and dedicated', 'afraid of people'],
          hint: 'What motivates him?', misconception: 'His love for animals drives him to learn their languages.',
          workedExample: ['He loves animals.', 'He learns their languages.', 'So: dedicated + empathetic.'] },
        { type: 'subpart', question: 'Understand the theme:',
          parts: [
            { id: 'a', prompt: 'What does Dolittle do differently from other doctors?', answer: 'treats animals', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'What does this teach about understanding?', answer: 'empathy bridges differences', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'order', question: 'Order Dolittle\'s journey:', sortItems: [
            { id: 'o0', label: 'Becomes famous', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Learns animal languages', emoji: '▶️', correctBin: 's1' },
            { id: 'o2', label: 'Loses human patients', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Treats animals', emoji: '▶️', correctBin: 's2' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Cause → effect!', misconception: 'He loses patients FIRST, then finds a new path.',
          workedExample: ['Loses humans.', 'Learns languages.', 'Treats animals.', 'Becomes famous.'] },
        { type: 'subpart', question: 'Apply what you learned in Dr. Dolittle:', hint: 'Work through each part step by step.', misconception: 'Students often think humour only means telling a joke. They fail to see that humour can also come from a s', parts: [
            { id: 'a', prompt: 'What is the main event that starts the plot of the Dr. Dolittle story?', answer: 'The story begins when the Cat\'s-food-Man suggests that the d', hint: 'Think: Story: Animals, Birds, and Dr. Dolittle --', misconception: 'Students often think humour only means telling a joke. They fail to see that humour can also come from a s', workedExample: ['If a student struggles, ask them: What would happen if your '] },
            { id: 'b', prompt: 'In your own words, why is it considered humorous that a doctor talks to animals?', answer: 'It is funny because we expect doctors to treat humans in cli', hint: 'Think: Story: Animals, Birds, and Dr. Dolittle --', misconception: 'Students often think humour only means telling a joke. They fail to see that humour can also come from a s', workedExample: ['If a student struggles, ask them: What would happen if your '] },
            { id: 'c', prompt: 'If a doctor suddenly started asking a stray dog about its stomach ache, what part of the \'humour\' criteria wou', answer: 'This satisfies the \'reversal of roles\' criteria, as the anim', hint: 'Think: Story: Animals, Birds, and Dr. Dolittle --', misconception: 'Students often think humour only means telling a joke. They fail to see that humour can also come from a s', workedExample: ['If a student struggles, ask them: What would happen if your '] },
            { id: 'd', prompt: 'Compare the doctor\'s interaction with humans versus his interaction with animals. How does this drive the plot', answer: 'The doctor moves from a traditional medical practice to a ne', hint: 'Think: Story: Animals, Birds, and Dr. Dolittle --', misconception: 'Students often think humour only means telling a joke. They fail to see that humour can also come from a s', workedExample: ['If a student struggles, ask them: What would happen if your '] }
        ] },
    ],
    reflect: { prompts: ['How does humour reveal a story\'s message?', 'Why is empathy central to this story?'] },
    successLine: 'Humour decoded! 😄', tryAgainLine: 'Find the reversal that makes it funny.',
};

export const c6EngInvention: SimDef = {
    id: 'c6_eng_invention', title: "My Brother's Great Invention", subtitle: 'Curiosity & sequence',
    classLevel: 6, subject: 'english', topic: 'Prose: Great Invention',
    chapters: ['English U3: My Brother\'s Great Invention'],
    nodeIds: ['c6_english_u3_021','c6_english_u3_022','c6_english_u3_023','c6_english_u3_024','c6_english_u3_025','c6_english_u3_027','c6_english_u3_029'],
    emoji: '🔧', theme: { bg: 'from-amber-900 to-orange-800', accent: 'amber', scene: 'invention' },
    scenario: { role: "an invention-analyst", intro: "Anand builds a wild invention — what does the story say about curiosity?", goal: "Analyze Anand's character and the theme of innovation." },
    discovery: {
        question: "Anand's invention causes chaos but he keeps inventing. What does that tell you?",
        options: ["He's reckless but curious", "He's bad at inventing", "He gives up easily"],
        answer: "He's reckless but curious",
        hook: "Failure doesn't stop a true inventor — curiosity drives him!",
    },
    teaching: [
        { title: 'Story: My Brother\'s Great Invention', text: 'Plot and sequence refer to the organization of events in a story: the plot is what happens, and the sequence is the order in which those events occur to cre Have you ever tried to fix a broken toy but made it worse instead? Imagine you', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: My Brother\'s Great Invention', text: 'Character analysis is the process of examining a character\'s traits, motivations, and behaviors to understand their role and personality in a story. It involves Have you ever met someone who keeps trying to build something, even if it falls', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: My Brother\'s Great Invention', text: 'The spirit of innovation is the drive to question, experiment, and persist despite failure. Curiosity is the foundation of this spirit, acting as the starting p Imagine you are trying to build a paper plane that flies across the entire clas', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Paper Boats by Tagore -- Meani', text: 'Paper Boats is a poem that uses imagery—mental pictures created by words—to describe a childs imaginative play. It functions as a metaphor, where the physica Have you ever made a paper boat and watched it float away in a puddle or stream', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Poetic Devices -- Alliteration,', text: 'Poetic devices are tools used by poets to create deeper meaning and musical effects, including **Alliteration** (repeating initial sounds), **Personification**  Have you ever felt like your favorite tree was actually listening to your secre', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poetry Form: Free Verse and Its Charac', text: 'Free verse is a style of poetry that does not use a set rhyme scheme or a strict rhythmic pattern, allowing the poet to mirror the natural rhythm of speech. It  Have you ever tried to describe your favorite tree, like the Neem, but found th', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Vocabulary in Context: Words from the', text: 'Vocabulary in context is the skill of determining the meaning of an unfamiliar word by looking at the words, sentences, and ideas surrounding it in a text. Inst Have you ever been reading a story and bumped into a word you didn\'t know, like', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Grammar: Adjectives and Adverbs', text: 'An adjective is a word that describes a noun (person, place, or thing), while an adverb is a word that describes an action (verb) by telling us how, when, or wh Imagine you are describing your favorite tree, like a Neem tree.', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Writing: Creative and Imaginative Writ', text: 'Creative and imaginative writing is the process of using ones own ideas to invent stories, characters, and descriptions that go beyond simple facts or reports. Have you ever looked at a tree in your school playground and imagined it had a', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Speaking and Listening: Presenting Ide', text: 'Presenting ideas is the act of sharing information clearly and logically to an audience, while debating is a structured verbal exchange where two sides present  Imagine you want to convince your parents to let you plant a tree in the courty', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' }
    ],
    explore: { component: PoemHighlighter, prompt: 'Sequence Anand' },
    challenges: [
        { type: 'order', question: 'Order the invention process:', sortItems: [
            { id: 'o0', label: 'He plans the next one', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'He builds the invention', emoji: '▶️', correctBin: 's1' },
            { id: 'o2', label: 'Anand gets an idea', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'It malfunctions', emoji: '▶️', correctBin: 's2' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Idea → build → fail → try again!', misconception: 'The failure comes before the next idea — inventors iterate.',
          workedExample: ['Idea first.', 'Then build.', 'Then fail.', 'Then next idea.'] },
        { type: 'mcq', question: 'Anand\'s main character trait is:', answer: 'curiosity', options: ['laziness', 'curiosity', 'fear'],
          hint: 'Why does he keep inventing?', misconception: 'His curiosity drives him — he can\'t stop inventing.',
          workedExample: ['He invents constantly.', 'He\'s driven by wonder.', 'So: curious.'] },
        { type: 'mcq', question: 'The story\'s theme is best described as:', answer: 'curiosity and innovation triumph over failure', options: ['inventions are dangerous', 'curiosity and innovation triumph over failure', 'brothers are annoying'],
          hint: 'What is the story really saying?', misconception: 'Theme = the message — keep inventing despite failure.',
          workedExample: ['Anand fails.', 'He keeps trying.', 'Theme: curiosity triumphs.'] },
        { type: 'subpart', question: 'Analyze the humour:',
          parts: [
            { id: 'a', prompt: 'What causes the comedy?', answer: 'the gap between vision and reality', options: ['the gap between vision and reality', 'the family buying new gadgets', 'Anand getting good marks'], hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'How does Anand react to failure?', answer: 'plans the next invention', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Curiosity & sequence:', hint: 'Work through each part step by step.', misconception: 'Students often confuse plot (the full story) with sequence (the specific order of time). They may try to s', parts: [
            { id: 'a', prompt: 'What is the opening incident in the story about Anands inventions?', answer: 'The opening incident is the burglar alarm made from a water', hint: 'Think: Story: My Brother\'s Great Invention -- Plot', misconception: 'Students often confuse plot (the full story) with sequence (the specific order of time). They may try to s', workedExample: ['First, ask the student to draw a story map with three boxes:','Ask them to place one invention in each box','If they struggle, ask: What happened right after the water b'] },
            { id: 'b', prompt: 'Why is it important to follow the sequence of Anand\'s inventions rather than just reading them randomly?', answer: 'The sequence is important because each invention is more amb', hint: 'Think: Story: My Brother\'s Great Invention -- Plot', misconception: 'Students often confuse plot (the full story) with sequence (the specific order of time). They may try to s', workedExample: ['First, ask the student to draw a story map with three boxes:','Ask them to place one invention in each box','If they struggle, ask: What happened right after the water b'] },
            { id: 'c', prompt: 'If Anand invents a robot that accidentally paints the walls, what should logically happen next in the sequen', answer: 'The next step must be the family\'s reaction or the father\'s', hint: 'Think: Story: My Brother\'s Great Invention -- Plot', misconception: 'Students often confuse plot (the full story) with sequence (the specific order of time). They may try to s', workedExample: ['First, ask the student to draw a story map with three boxes:','Ask them to place one invention in each box','If they struggle, ask: What happened right after the water b'] },
            { id: 'd', prompt: 'Analyze the pattern: Anand builds -> Invention fails -> Chaos happens. How does this cycle affect the reader\'s', answer: 'The reader begins to expect disaster instead of success, whi', hint: 'Think: Story: My Brother\'s Great Invention -- Plot', misconception: 'Students often confuse plot (the full story) with sequence (the specific order of time). They may try to s', workedExample: ['First, ask the student to draw a story map with three boxes:','Ask them to place one invention in each box','If they struggle, ask: What happened right after the water b'] }
        ] },
    ],
    reflect: { prompts: ['Why do inventors need failure?', 'How does sequence show a character\'s growth?'] },
    successLine: 'Innovation understood! 🔧', tryAgainLine: 'Watch how he responds to failure.',
};

export const c6EngTunnel: SimDef = {
    id: 'c6_eng_tunnel', title: 'The Tunnel', subtitle: 'Courage & adventure',
    classLevel: 6, subject: 'english', topic: 'Prose: The Tunnel',
    chapters: ['English U4: The Tunnel'],
    nodeIds: ['c6_english_u4_031','c6_english_u4_032','c6_english_u4_033','c6_english_u4_035','c6_english_u4_037'],
    emoji: '🚇', theme: { bg: 'from-slate-900 to-gray-800', accent: 'slate', scene: 'tunnel' },
    scenario: { role: "an adventure-analyst", intro: "Suraj enters a dark tunnel — what does this adventure teach about courage?", goal: "Analyze Suraj's courage and the adventure theme." },
    discovery: {
        question: "Suraj is scared of the dark tunnel but goes in anyway. What is that called?",
        options: ["Courage — acting despite fear", "Foolishness", "No fear at all"],
        answer: "Courage — acting despite fear",
        hook: "Courage isn't absence of fear — it's acting IN SPITE of fear!",
    },
    teaching: [
        { title: 'Story: The Tunnel -- Plot and Settin', text: 'The plot is the sequence of events that make up a story\'s action, while the setting is the time and place where these events occur. Together, they create th Imagine you are waiting at a busy railway station in India.', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: The Tunnel -- Character Analy', text: 'Character analysis is the process of identifying a character\'s personality traits, motivations, and values based on their actions, words, and reactions to event Have you ever watched a friend react to a scary situation and thought, That sh', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Story: The Tunnel -- Theme: Courage', text: 'Courage and adventure are literary themes where a character chooses to face something unknown or challenging, rather than avoiding it, to learn more about thems Have you ever stood in front of a dark, empty corridor and felt scared to walk', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Train Whistle Poem -- Tone and P', text: 'Personification is a literary device where human traits, emotions, or actions are given to non-human things like objects or nature. The tone of a poem is the po Have you ever felt like your bicycle was tired after a long ride or that the', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Poetic Devices -- Imagery, Contr', text: 'Poetic devices are specific tools—like imagery, contrast, and sound words—that writers use to make their poems more vivid, emotional, and memorable for the read Have you ever closed your eyes and felt like you could hear the rain or see', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poetry Form: Diamante Poems -- Structu', text: 'A diamante poem is a seven-line poem structured in the shape of a diamond, which uses specific parts of speech to show the transition between two contrasting or Have you ever tried to describe a win and a loss using only a few words? To', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Vocabulary in Context: Words from the', text: 'Vocabulary in context is the skill of using clues within a sentence or paragraph to determine the meaning of an unfamiliar word without relying solely on a dict Have you ever been reading a story and hit a word you didn\'t know, like \'phenom', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Grammar: Sentence Structure and Types', text: 'A simple sentence contains one independent clause (a complete thought), while a complex sentence combines one independent clause with a dependent clause (a grou Imagine you are telling your friend about your day at school.', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Writing: Narrative and Adventure Writi', text: 'Adventure writing is a form of storytelling that focuses on a character facing risky, exciting, or challenging situations in a specific setting. It relies on bu Have you ever felt your heart race while reading about a character exploring a', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Speaking and Listening: Reading Aloud', text: 'Reading aloud and dramatisation are performance-based communication skills that use voice, pacing, and physical expression to convey the emotions and events of  Have you ever told a friend about a scary movie you saw and noticed your voice', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' }
    ],
    explore: { component: SentenceBuilder, prompt: 'Hop Suraj through the tunnel — each step is a choice to keep going!' },
    challenges: [
        { type: 'mcq', question: 'Suraj entering the tunnel despite fear shows:', answer: 'courage', options: ['recklessness', 'courage', 'confusion'],
          hint: 'Acting despite fear = ?', misconception: 'Courage = acting IN SPITE of fear, not absence of it.',
          workedExample: ['He\'s afraid.', 'He goes anyway.', 'That\'s courage.'] },
        { type: 'order', question: 'Order Suraj\'s emotional journey:', sortItems: [
            { id: 'o0', label: 'Emerges braver', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Decides to enter', emoji: '▶️', correctBin: 's1' },
            { id: 'o2', label: 'Fear of the tunnel', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Faces the darkness', emoji: '▶️', correctBin: 's2' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Fear → decision → action → growth!', misconception: 'His growth comes AFTER facing the fear.',
          workedExample: ['Afraid first.', 'Decides to enter.', 'Faces darkness.', 'Emerges braver.'] },
        { type: 'subpart', question: 'Analyze the setting:',
          parts: [
            { id: 'a', prompt: 'What does the tunnel represent?', answer: 'the unknown/fear', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'How does the setting create tension?', answer: 'darkness and unknown', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'mcq', question: 'The theme of the story is:', answer: 'courage means acting despite fear', options: ['tunnels are scary', 'courage means acting despite fear', 'trains are fast'],
          hint: 'What does Suraj learn?', misconception: 'Theme: courage is action despite fear — the core message.',
          workedExample: ['Suraj is afraid.', 'He acts anyway.', 'Theme: courage = action despite fear.'] },
        { type: 'subpart', question: 'Apply what you learned in The Tunnel:', hint: 'Work through each part step by step.', misconception: 'Students often think the plot is just a list of everything a character does, including unimportant things li', parts: [
            { id: 'a', prompt: 'What are the two main elements of a story that tell us where it is and what happens?', answer: 'The two elements are the setting and the plot', hint: 'Think: Story: The Tunnel -- Plot and Setting', misconception: 'Students often think the plot is just a list of everything a character does, including unimportant things li', workedExample: ['Ask the student to pick the three most important moments in ','Tell them to ignore the boring parts like sitting still','Explain that plot is like a mountain—you start at the bottom'] },
            { id: 'b', prompt: 'If a story starts with a boy waiting at a train tunnel, why is it important to know that the jungle is still', answer: 'The description helps us understand the atmosphere and the m', hint: 'Think: Story: The Tunnel -- Plot and Setting', misconception: 'Students often think the plot is just a list of everything a character does, including unimportant things li', workedExample: ['Ask the student to pick the three most important moments in ','Tell them to ignore the boring parts like sitting still','Explain that plot is like a mountain—you start at the bottom'] },
            { id: 'c', prompt: 'If you were to rewrite the beginning of a story set in a jungle, how would you change the setting if you moved', answer: 'You would change the sights and sounds, replacing still jun', hint: 'Think: Story: The Tunnel -- Plot and Setting', misconception: 'Students often think the plot is just a list of everything a character does, including unimportant things li', workedExample: ['Ask the student to pick the three most important moments in ','Tell them to ignore the boring parts like sitting still','Explain that plot is like a mountain—you start at the bottom'] },
            { id: 'd', prompt: 'In a story about a train tunnel, why does the author tell us what the boy does every day before the danger h', answer: 'The author establishes a routine to show us what is normal', hint: 'Think: Story: The Tunnel -- Plot and Setting', misconception: 'Students often think the plot is just a list of everything a character does, including unimportant things li', workedExample: ['Ask the student to pick the three most important moments in ','Tell them to ignore the boring parts like sitting still','Explain that plot is like a mountain—you start at the bottom'] }
        ] },
    ],
    reflect: { prompts: ['What is the difference between courage and recklessness?', 'How does setting create the story\'s challenge?'] },
    successLine: 'Courage understood! 🚇', tryAgainLine: 'Courage = acting despite fear.',
};

export const c6EngSoldiers: SimDef = {
    id: 'c6_eng_soldiers', title: 'A Homage to Our Brave Soldiers', subtitle: 'Patriotism & letter format',
    classLevel: 6, subject: 'english', topic: 'Prose: Brave Soldiers',
    chapters: ['English U5: A Homage to Our Brave Soldiers'],
    nodeIds: ['c6_english_u5_041','c6_english_u5_042','c6_english_u5_043','c6_english_u5_044','c6_english_u5_047','c6_english_u5_049'],
    emoji: '🎖️', theme: { bg: 'from-rose-900 to-red-800', accent: 'rose', scene: 'memorial' },
    scenario: { role: "a tribute-writer", intro: "A letter honors soldiers who sacrificed everything — how do you write such a tribute?", goal: "Understand the letter format and the theme of patriotism." },
    discovery: {
        question: "Why do we write letters of homage to soldiers we've never met?",
        options: ["To honor sacrifice and express gratitude", "It's required homework", "To complain"],
        answer: "To honor sacrifice and express gratitude",
        hook: "Homage = deep respect — we honor those who protect us!",
    },
    teaching: [
        { title: 'Prose: A Homage to Our Brave Soldiers', text: 'An epistolary prose style uses letters between characters to convey personal feelings and reflections, creating an intimate, conversational tone that allows the Have you ever received a handwritten note or a personal message from a friend t', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Prose: A Homage to Our Brave Soldiers', text: 'Patriotism is the deep love, pride, and sense of duty one feels for their country, while sacrifice refers to the selfless act of giving up something valuable, i Have you ever seen a soldier in uniform and wondered what they are thinking abo', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Prose: A Homage to Our Brave Soldiers', text: 'A National War Memorial is a site of national importance created to honor the memory of soldiers who sacrificed their lives for the country\'s sovereignty and fr Have you ever visited a place that made you feel very quiet and thoughtful, lik', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: My Dear Soldiers -- Theme and', text: 'The theme of a poem is its central message or big idea, while the emotion (or mood) is the specific feeling the poet creates to help the reader experience tha Imagine you are writing a thank-you note to someone who helped you.', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poem: Poetic Devices -- Acrostic Form,', text: 'Poetic devices are tools like acrostic form (using first letters to spell a word), imagery (using words to paint pictures), and repetition (repeating sounds or  Have you ever tried to hide a secret message in a card you made for a friend? A', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Poetry Form: Acrostic Poems -- How to', text: 'An acrostic poem is a creative writing form where the first letter of each line, when read vertically from top to bottom, spells out a specific word or phrase r Have you ever tried to hide a secret message inside your writing? An acrostic p', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Vocabulary in Context: Words from the', text: 'Vocabulary in context refers to determining the meaning of words by looking at the surrounding sentences, the tone of the passage, and the emotional connection  Imagine you are watching a news report about a soldier who helped his village d', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Grammar: Active and Passive Voice', text: 'Voice explains the relationship between the doer of an action (the subject) and the action itself. In Active Voice, the subject performs the action, while in Pa Have you ever noticed that saying I ate the mango sounds different from sayin', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Writing: Formal and Informal Letters', text: 'A letter is a written message sent from one person to another. An informal letter is written to friends or family in a conversational tone, while a formal lette Imagine you want to tell your cousin about the amazing Dhokra art you saw in cl', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Speaking and Listening: Recitation and', text: 'Recitation is the act of speaking a poem aloud with appropriate emotion, pacing, and tone, while group discussion is a collaborative conversation where particip Have you ever tried to tell a friend about a story you loved, but they kept int', emoji: '💡', bgColor: 'from-amber-400 to-orange-500' }
    ],
    explore: { component: LetterFormatter, prompt: 'Build the letter — put the parts of a homage letter in order!' },
    challenges: [
        { type: 'order', question: 'Order the parts of a homage letter:', sortItems: [
            { id: 'o0', label: 'Closing and signature', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Body: gratitude + honor', emoji: '▶️', correctBin: 's2' },
            { id: 'o2', label: 'Address and date', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Salutation', emoji: '▶️', correctBin: 's1' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Top to bottom of a letter!', misconception: 'Letters have a set format — address, greeting, body, closing.',
          workedExample: ['Address first.', 'Then salutation.', 'Then body.', 'Then closing.'] },
        { type: 'mcq', question: 'The purpose of a homage letter is to:', answer: 'honor and thank soldiers for sacrifice', options: ['complain', 'honor and thank soldiers for sacrifice', 'sell something'],
          hint: 'Homage = deep respect!', misconception: 'Homage = honoring — the letter thanks soldiers for their sacrifice.',
          workedExample: ['Homage = respect.', 'Soldiers = sacrifice.', 'Purpose: honor + thank.'] },
        { type: 'subpart', question: 'Understand patriotism:',
          parts: [
            { id: 'a', prompt: 'What does patriotism mean here?', answer: 'respect for those who serve the nation', options: ['respect for those who serve the nation', 'interest in war movies', 'love of picnic outings'], hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'What makes the tone appropriate?', answer: 'solemn and grateful', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'mcq', question: 'The National War Memorial in the letter represents:', answer: 'a place honoring fallen soldiers', options: ['a tourist spot', 'a place honoring fallen soldiers', 'a military base'],
          hint: 'Why mention the memorial?', misconception: 'The memorial honors the fallen — it makes sacrifice concrete.',
          workedExample: ['Memorial = honor place.', 'For fallen soldiers.', 'Makes sacrifice real.'] },
        { type: 'subpart', question: 'Apply what you learned in A Homage to Our Brave Soldiers:', hint: 'Work through each part step by step.', misconception: 'Students often think a letter is just a formal document for information. They struggle to write as themselves', parts: [
            { id: 'a', prompt: 'What are the two most important structural parts that make a letter different from a newspaper report?', answer: 'The salutation (e', hint: 'Think: Prose: A Homage to Our Brave Soldiers -- Le', misconception: 'Students often think a letter is just a formal document for information. They struggle to write as themselves', workedExample: ['If the student struggles, ask them: If you were texting your','Then, explain that a letter is just a longer, more thoughtfu'] },
            { id: 'b', prompt: 'Why does an author choose to write a story as a series of letters instead of a formal report?', answer: 'It creates a personal, intimate tone that feels like a conve', hint: 'Think: Prose: A Homage to Our Brave Soldiers -- Le', misconception: 'Students often think a letter is just a formal document for information. They struggle to write as themselves', workedExample: ['If the student struggles, ask them: If you were texting your','Then, explain that a letter is just a longer, more thoughtfu'] },
            { id: 'c', prompt: 'If you were writing a letter about a visit to a memorial, how would your language change compared to writing a', answer: 'You would use I and me, describe how you *felt* (scared,', hint: 'Think: Prose: A Homage to Our Brave Soldiers -- Le', misconception: 'Students often think a letter is just a formal document for information. They struggle to write as themselves', workedExample: ['If the student struggles, ask them: If you were texting your','Then, explain that a letter is just a longer, more thoughtfu'] },
            { id: 'd', prompt: 'Analyze this: If the letters were removed and replaced by a neutral narrator describing the memorial, what wou', answer: 'The reader would lose the character\'s personal reaction and', hint: 'Think: Prose: A Homage to Our Brave Soldiers -- Le', misconception: 'Students often think a letter is just a formal document for information. They struggle to write as themselves', workedExample: ['If the student struggles, ask them: If you were texting your','Then, explain that a letter is just a longer, more thoughtfu'] }
        ] },
    ],
    reflect: { prompts: ['Why do we honor people we\'ve never met?', 'How does letter format show respect?'] },
    successLine: 'Tribute mastered! 🎖️', tryAgainLine: 'Homage = respect + gratitude.',
};

export const c6EngPoetry: SimDef = {
    id: 'c6_eng_poetry', title: 'Poetic Devices', subtitle: 'Rhyme, metaphor, imagery',
    classLevel: 6, subject: 'english', topic: 'Poetry: Devices',
    chapters: ['English: Poetic Devices across units'],
    // nodeIds intentionally omitted: every c6_english_u* node is owned by exactly one unit sim (c6_eng_river..c6_eng_soldiers); this cross-unit sim falls back to its own simId for mastery attribution.
    emoji: '📜', theme: { bg: 'from-violet-900 to-purple-800', accent: 'violet', scene: 'poetry' },
    scenario: { role: "a poetry-detective", intro: "Poems use special tricks — rhyme, metaphor, imagery — to create magic with words.", goal: "Identify and understand poetic devices." },
    discovery: {
        question: "'The moon is a silver coin in the sky' — what makes this poetic?",
        options: ["A metaphor comparing moon to coin", "It's a fact", "It rhymes"],
        answer: "A metaphor comparing moon to coin",
        hook: "Metaphor = saying one thing IS another to paint a picture!",
    },
    teaching: [
        { title: 'Metaphor 🎭', text: 'Metaphor says one thing IS another: "The moon is a silver coin." It creates a vivid image without using "like" or "as."', emoji: '🎭', bgColor: 'from-violet-500 to-purple-600' },
        { title: 'Imagery 🖼️', text: 'Imagery paints pictures with words — appeals to senses (sight, sound, smell, touch). "Golden fields danced in the wind."', emoji: '🖼️', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'Rhyme & Rhythm 🎵', text: 'Rhyme = matching end sounds (cat/hat). Rhythm = the beat of the poem. Together they make poetry musical.', emoji: '🎵', bgColor: 'from-sky-500 to-blue-600' },
        { title: 'Personification 🌟', text: 'Personification gives human qualities to non-human things: "The wind whispered." Makes nature feel alive.', emoji: '🌟', bgColor: 'from-emerald-500 to-teal-600' },
    ],
    explore: { widget: 'tray', prompt: 'Sort each line into metaphor, imagery, or personification!' },
    challenges: [
        { type: 'sort', question: 'Sort the poetic devices:',
          sortItems: [
            { id: 's0', label: '"The moon is a coin"', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: '"The wind whispered"', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: '"Golden fields danced"', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'metaphor', color: '#3b82f6' },
                  { id: 'b1', label: 'personification', color: '#ef4444' },
                  { id: 'b2', label: 'imagery', color: '#10b981' } ],
          hint: 'One IS another / human trait / paints a picture!', misconception: 'Metaphor says X IS Y; personification gives human traits; imagery appeals to senses.',
          workedExample: ['"Moon is a coin" = IS = metaphor.', '"Wind whispered" = human act = personification.', '"Golden fields" = picture = imagery.'] },
        { type: 'mcq', question: '"The stars danced in the night sky" uses:', answer: 'personification', options: ['metaphor', 'personification', 'rhyme'],
          hint: 'Can stars actually dance?', misconception: 'Dancing = human act on non-human stars = personification.',
          workedExample: ['Stars can\'t dance.', 'Giving them a human act.', 'Personification.'] },
        { type: 'mcq', question: 'Imagery in poetry appeals to:', answer: 'the senses', options: ['logic', 'the senses', 'grammar'],
          hint: 'What does imagery create?', misconception: 'Imagery = sensory pictures — sight, sound, smell, touch, taste.',
          workedExample: ['Imagery = word pictures.', 'Appeals to senses.', 'Not logic.'] },
        { type: 'subpart', question: 'Identify the device:',
          parts: [
            { id: 'a', prompt: '"Her smile is sunshine" is:', answer: 'a metaphor', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Why does it work?', answer: 'compares smile to sunshine', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
    ],
    reflect: { prompts: ['What is the difference between metaphor and personification?', 'Why does imagery make poetry powerful?'] },
    successLine: 'Poetry decoded! 📜', tryAgainLine: 'Find the comparison or human trait.',
};

export const c6EngPoetryForms: SimDef = {
    id: 'c6_eng_poetry_forms', title: 'Poetry Forms', subtitle: 'Limerick, free verse, acrostic',
    classLevel: 6, subject: 'english', topic: 'Poetry: Forms',
    chapters: ['English: Poetry forms across units'],
    // nodeIds intentionally omitted: every c6_english_u* node is owned by exactly one unit sim (c6_eng_river..c6_eng_soldiers); this cross-unit sim falls back to its own simId for mastery attribution.
    emoji: '✍️', theme: { bg: 'from-fuchsia-900 to-pink-800', accent: 'fuchsia', scene: 'poetry_forms' },
    scenario: { role: "a poetry-crafter", intro: "Poems come in shapes — limericks bounce, free verse flows, acrostics hide secrets.", goal: "Master the different poetry forms." },
    discovery: {
        question: "A limerick has 5 lines and goes AABBA. What does 'AABBA' describe?",
        options: ["The rhyme scheme pattern", "The number of words", "The poet's name"],
        answer: "The rhyme scheme pattern",
        hook: "AABBA = lines 1,2,5 rhyme together; lines 3,4 rhyme together!",
    },
    teaching: [
        { title: 'Limerick 😄', text: 'A limerick: 5 lines, AABBA rhyme, funny/bouncy. Lines 1,2,5 are long; 3,4 are short. Often silly!', emoji: '😄', bgColor: 'from-fuchsia-500 to-pink-600' },
        { title: 'Free Verse 🌊', text: 'Free verse: no fixed rhyme or rhythm — flows naturally like speech. Modern poetry often uses it.', emoji: '🌊', bgColor: 'from-sky-500 to-blue-600' },
        { title: 'Acrostic 🔤', text: 'An acrostic spells a word with the first letter of each line: S-U-N down the side spells "SUN." Hidden message!', emoji: '🔤', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'Diamante 💎', text: 'A diamante is diamond-shaped: 7 lines, specific structure (noun, adjectives, -ing words, nouns...). Symmetrical!', emoji: '💎', bgColor: 'from-emerald-500 to-teal-600' },
    ],
    explore: { widget: 'tray', prompt: 'Build an acrostic — spell a word down the first letters!' },
    challenges: [
        { type: 'order', question: 'Order the limerick rhyme scheme (AABBA):', sortItems: [
            { id: 'o0', label: 'Ends on the A rhyme', emoji: '▶️', correctBin: 's2' },
            { id: 'o1', label: 'Line 3 rhymes with 4', emoji: '▶️', correctBin: 's1' },
            { id: 'o2', label: 'Line 1 rhymes with 2 and 5', emoji: '▶️', correctBin: 's0' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' } ],
          hint: 'AABBA: 1,2,5 = A; 3,4 = B!', misconception: 'AABBA means lines 1,2,5 rhyme; 3,4 rhyme separately.',
          workedExample: ['1,2,5 = A rhyme.', '3,4 = B rhyme.', 'AABBA.'] },
        { type: 'mcq', question: 'Free verse poetry is characterized by:', answer: 'no fixed rhyme or rhythm', options: ['strict rhyming', 'no fixed rhyme or rhythm', 'only 5 lines'],
          hint: 'Free = no rules!', misconception: 'Free verse has no set rhyme/meter — it flows like natural speech.',
          workedExample: ['Free = no rules.', 'No rhyme/rhythm.', 'Flows naturally.'] },
        { type: 'mcq', question: 'An acrostic poem spells a word using:', answer: 'the first letter of each line', options: ['the last word', 'the first letter of each line', 'rhyming words'],
          hint: 'Read down the first letters!', misconception: 'Acrostic = first letter of each line spells a word.',
          workedExample: ['First letters down.', 'Spells a word.', 'Acrostic.'] },
        { type: 'subpart', question: 'Identify the form:',
          parts: [
            { id: 'a', prompt: 'A 5-line funny poem (AABBA) is:', answer: 'a limerick', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'A diamond-shaped 7-line poem is:', answer: 'a diamante', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
    ],
    reflect: { prompts: ['Which form suits a funny poem vs a serious one?', 'How does structure shape a poem\'s effect?'] },
    successLine: 'Forms mastered! ✍️', tryAgainLine: 'Match the shape and rhyme to the form.',
};

export const c6EngGrammar: SimDef = {
    id: 'c6_eng_grammar', title: 'Grammar Toolkit', subtitle: 'Nouns, pronouns, tenses, voice',
    classLevel: 6, subject: 'english', topic: 'Grammar: Parts of Speech & Tense',
    chapters: ['English: Grammar across units'],
    // nodeIds intentionally omitted: every c6_english_u* node is owned by exactly one unit sim (c6_eng_river..c6_eng_soldiers); this cross-unit sim falls back to its own simId for mastery attribution.
    emoji: '📐', theme: { bg: 'from-cyan-900 to-blue-800', accent: 'cyan', scene: 'grammar' },
    scenario: { role: "a grammar-mechanic", intro: "Sentences have rules — nouns, pronouns, tenses, voice — that make meaning clear.", goal: "Master the core grammar tools." },
    discovery: {
        question: "'She gave it to him' — which words are pronouns replacing names?",
        options: ["She, it, him", "gave, to", "She only"],
        answer: "She, it, him",
        hook: "Pronouns replace nouns — she, it, him stand in for actual names!",
    },
    teaching: [
        { title: 'Nouns & Pronouns 🏷️', text: 'Nouns name (person, place, thing). Pronouns replace them (he, she, it, they). "Ravi" → "he."', emoji: '🏷️', bgColor: 'from-cyan-500 to-blue-600' },
        { title: 'Tenses ⏰', text: 'Tense = when. Past (was, played), Present (is, plays), Future (will be, will play). Same action, different time!', emoji: '⏰', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'Adjectives & Adverbs 🎨', text: 'Adjectives describe nouns (big, red). Adverbs describe verbs (quickly, slowly). They add color to sentences.', emoji: '🎨', bgColor: 'from-emerald-500 to-teal-600' },
        { title: 'Active vs Passive 🔄', text: 'Active: subject does the action ("Ravi hit the ball"). Passive: subject receives it ("The ball was hit by Ravi"). Same event, different focus.', emoji: '🔄', bgColor: 'from-purple-500 to-indigo-600' },
    ],
    explore: { widget: 'tray', prompt: 'Sort words into noun, pronoun, adjective, adverb!' },
    challenges: [
        { type: 'sort', question: 'Sort the words:',
          sortItems: [
            { id: 's0', label: 'quickly', emoji: '📌', correctBin: 'b3' },
            { id: 's1', label: 'teacher', emoji: '📌', correctBin: 'b0' },
            { id: 's2', label: 'beautiful', emoji: '📌', correctBin: 'b2' },
            { id: 's3', label: 'they', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'noun', color: '#3b82f6' },
                  { id: 'b1', label: 'pronoun', color: '#ef4444' },
                  { id: 'b2', label: 'adjective', color: '#10b981' },
                  { id: 'b3', label: 'adverb', color: '#f59e0b' } ],
          hint: 'Names/replaces/describes noun/describes verb!', misconception: 'Noun names; pronoun replaces; adjective describes noun; adverb describes verb.',
          workedExample: ['teacher = noun.', 'they = pronoun.', 'beautiful = adjective.', 'quickly = adverb.'] },
        { type: 'mcq', question: '"The ball was kicked by Ravi" is in:', answer: 'passive voice', options: ['active voice', 'passive voice', 'future tense'],
          hint: 'Is the subject doing or receiving the action?', misconception: 'Passive = subject receives action (ball was kicked). Active = subject does it (Ravi kicked).',
          workedExample: ['Ball receives the kick.', 'Subject = receiver.', 'Passive.'] },
        { type: 'mcq', question: 'Change "She plays" to future tense:', answer: 'She will play', options: ['She played', 'She will play', 'She is playing'],
          hint: 'Future = will + verb!', misconception: 'Future tense uses "will": will play, will go, will be.',
          workedExample: ['Future = will + verb.', 'plays → will play.', 'Future.'] },
        { type: 'subpart', question: 'Identify parts of speech in "The tall boy ran quickly":',
          parts: [
            { id: 'a', prompt: '"tall" is:', answer: 'an adjective', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: '"quickly" is:', answer: 'an adverb', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
    ],
    reflect: { prompts: ['How does changing voice change a sentence\'s focus?', 'Why do pronouns make writing smoother?'] },
    successLine: 'Grammar mastered! 📐', tryAgainLine: 'Nouns name, pronouns replace, tense shows time.',
};

export const c6EngWriting: SimDef = {
    id: 'c6_eng_writing', title: 'Writing Skills', subtitle: 'Letters, dialogue, narrative',
    classLevel: 6, subject: 'english', topic: 'Writing: Letters & Composition',
    chapters: ['English: Writing across units'],
    // nodeIds intentionally omitted: every c6_english_u* node is owned by exactly one unit sim (c6_eng_river..c6_eng_soldiers); this cross-unit sim falls back to its own simId for mastery attribution.
    emoji: '📝', theme: { bg: 'from-teal-900 to-cyan-800', accent: 'teal', scene: 'writing' },
    scenario: { role: "a writer-in-training", intro: "Good writing has structure — letters have format, dialogues have flow, narratives have order.", goal: "Master the craft of clear writing." },
    discovery: {
        question: "What makes a formal letter different from a note to a friend?",
        options: ["Format and tone", "Longer words", "More sentences"],
        answer: "Format and tone",
        hook: "Formal = structured format + respectful tone; informal = relaxed + personal!",
    },
    teaching: [
        { title: 'Letter Format ✉️', text: 'Formal letter: sender\'s address → date → receiver\'s address → salutation (Dear Sir/Madam) → body → closing (Yours faithfully) → signature.', emoji: '✉️', bgColor: 'from-teal-500 to-cyan-600' },
        { title: 'Dialogue Writing 💬', text: 'Dialogue shows conversation — use quotation marks, new line per speaker, and natural speech. "Hello!" she said.', emoji: '💬', bgColor: 'from-amber-500 to-orange-600' },
        { title: 'Narrative Structure 📖', text: 'A narrative has: beginning (setting + characters) → middle (problem/conflict) → end (resolution). Order matters!', emoji: '📖', bgColor: 'from-emerald-500 to-teal-600' },
        { title: 'Tone Matters 🎭', text: 'Formal tone = respectful, no slang ("I request"). Informal = relaxed, personal ("Hey! Guess what"). Match tone to audience.', emoji: '🎭', bgColor: 'from-purple-500 to-indigo-600' },
    ],
    explore: { widget: 'tray', prompt: 'Build a letter — put the parts in the right order!' },
    challenges: [
        { type: 'order', question: 'Order a formal letter:', sortItems: [
            { id: 'o0', label: 'Closing and signature', emoji: '▶️', correctBin: 's4' },
            { id: 'o1', label: 'Salutation', emoji: '▶️', correctBin: 's2' },
            { id: 'o2', label: "Sender's address", emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Date', emoji: '▶️', correctBin: 's1' },
            { id: 'o4', label: 'Body: gratitude and honor', emoji: '▶️', correctBin: 's3' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' },
                  { id: 's4', label: '5th', color: '#ec4899' } ],
          hint: 'Top to bottom!', misconception: 'Formal letters have a set order — address, date, greeting, body, closing.',
          workedExample: ['Address first.', 'Date.', 'Salutation.', 'Body.', 'Closing.'] },
        { type: 'mcq', question: 'A formal letter should use:', answer: 'respectful tone and no slang', options: ['lots of slang', 'respectful tone and no slang', 'emojis'],
          hint: 'Formal = respectful!', misconception: 'Formal letters need respectful tone — "I request" not "hey give me".',
          workedExample: ['Formal = respectful.', 'No slang.', 'Yours faithfully.'] },
        { type: 'subpart', question: 'Understand narrative structure:',
          parts: [
            { id: 'a', prompt: 'What goes in the beginning?', answer: 'setting and characters', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'What goes in the middle?', answer: 'the problem or conflict', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'mcq', question: 'In dialogue, a new speaker needs:', answer: 'a new line with quotation marks', options: ['a new paragraph with quotation marks', 'a new line with quotation marks', 'no punctuation'],
          hint: 'Each speaker gets their own line!', misconception: 'New speaker = new line + quotation marks around their words.',
          workedExample: ['New speaker.', 'New line.', 'Quotation marks.'] },
    ],
    reflect: { prompts: ['Why does format matter in formal writing?', 'How does tone change for different audiences?'] },
    successLine: 'Writing mastered! 📝', tryAgainLine: 'Format + tone = clear writing.',
};

export const c6EngSpeaking: SimDef = {
    id: 'c6_eng_speaking', title: 'Speaking & Listening', subtitle: 'Storytelling, recitation, discussion',
    classLevel: 6, subject: 'english', topic: 'Speaking & Listening Skills',
    chapters: ['English: Speaking/Listening across units'],
    // nodeIds intentionally omitted: every c6_english_u* node is owned by exactly one unit sim (c6_eng_river..c6_eng_soldiers); this cross-unit sim falls back to its own simId for mastery attribution.
    emoji: '🎤', theme: { bg: 'from-orange-900 to-amber-800', accent: 'orange', scene: 'speaking' },
    scenario: { role: "a storyteller", intro: "Speaking and listening are skills too — storytelling, recitation, and discussion all have craft.", goal: "Learn to speak and listen well." },
    discovery: {
        question: "What makes a good storyteller different from someone just reading words?",
        options: ["Expression, pace, and voice", "Louder voice", "Faster reading"],
        answer: "Expression, pace, and voice",
        hook: "Storytelling = bringing words to life with voice, expression, and timing!",
    },
    teaching: [
        { title: 'Storytelling 🗣️', text: 'Good storytelling uses expression, varied pace, and character voices — it brings the story to life for the listener.', emoji: '🗣️', bgColor: 'from-orange-500 to-amber-600' },
        { title: 'Recitation 📖', text: 'Reciting a poem aloud needs rhythm, clear pronunciation, and feeling — the voice carries the poem\'s music.', emoji: '📖', bgColor: 'from-sky-500 to-blue-600' },
        { title: 'Active Listening 👂', text: 'Listening well means paying attention, not interrupting, and responding to what was actually said — not just waiting to talk.', emoji: '👂', bgColor: 'from-emerald-500 to-teal-600' },
        { title: 'Discussion Skills 💬', text: 'In a discussion: share ideas clearly, listen to others, build on their points, and disagree respectfully.', emoji: '💬', bgColor: 'from-purple-500 to-indigo-600' },
    ],
    explore: { widget: 'tray', prompt: 'Match the skill to its key technique!' },
    challenges: [
        { type: 'mcq', question: 'Good storytelling requires:', answer: 'expression, pace, and character voices', options: ['reading fast', 'expression, pace, and character voices', 'a monotone'],
          hint: 'What brings a story to life?', misconception: 'Storytelling = expression + varied pace + voices — brings the story alive.',
          workedExample: ['Expression.', 'Varied pace.', 'Character voices.', 'Brings to life.'] },
        { type: 'mcq', question: 'Active listening means:', answer: 'paying attention and responding to what was said', options: ['waiting to talk', 'paying attention and responding to what was said', 'interrupting'],
          hint: 'Listening = understanding, not just hearing!', misconception: 'Active listening = attention + response to the actual message.',
          workedExample: ['Pay attention.', 'Don\'t interrupt.', 'Respond to content.'] },
        { type: 'subpart', question: 'Understand recitation:',
          parts: [
            { id: 'a', prompt: 'Reciting a poem needs:', answer: 'rhythm, pronunciation, feeling', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'The voice should carry:', answer: 'the poem\'s music and meaning', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'mcq', question: 'In a group discussion, disagreeing means:', answer: 'disagreeing respectfully with reasons', options: ['shouting', 'disagreeing respectfully with reasons', 'staying silent'],
          hint: 'How do you disagree well?', misconception: 'Disagreement = respect + reasons, not shouting.',
          workedExample: ['Disagree.', 'Give reasons.', 'Stay respectful.'] },
    ],
    reflect: { prompts: ['How does listening well improve a discussion?', 'What makes a storyteller engaging?'] },
    successLine: 'Voice mastered! 🎤', tryAgainLine: 'Expression + listening = great communication.',
};

export const c6EnglishSims = [
    c6EngRiver, c6EngDolittle, c6EngInvention, c6EngTunnel, c6EngSoldiers,
    c6EngPoetry, c6EngPoetryForms, c6EngGrammar, c6EngWriting, c6EngSpeaking,
];
