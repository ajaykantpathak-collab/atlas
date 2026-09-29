import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch01_p2: SimDef = {
    id: 'v3_c7_engl_ch01_p2',
    title: 'Learning Together: The Day the River Spoke · Part 2/3',
    subtitle: 'This node covers analyzing and applying four specific descriptive words (*splashed*.',
    classLevel: 7, subject: 'engl', topic: 'Learning Together: The Day the River Spoke · Part 2/3',
    chapters: ['c7_engl_ch01'],
    nodeIds: ['c7_engl_ch01_007', 'c7_engl_ch01_008', 'c7_engl_ch01_009', 'c7_engl_ch01_010', 'c7_engl_ch01_011', 'c7_engl_ch01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are walking by a rushing river in Kerala, and suddenly you hear a soft, continuous whispering.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In a coastal village, the high tide swallows the footpaths and the children simply wait for the water to fall. Is this setting just a pretty postcard — or something with real power over the story?',
        options: ['It is an active force — tides, floods, and isolation decide how villagers travel, work, and whether children reach a school', 'Just a backdrop — the same story could happen anywhere', 'A decoration — rivers are added to stories to sound nice', 'A mistake — real rivers never affect villages'],
        answer: 'It is an active force — tides, floods, and isolation decide how villagers travel, work, and whether children reach a school',
        hook: 'A setting is never window dressing. When a river floods the only path to school, geography becomes an obstacle in the plot — move the village to a dry plain and the whole struggle dissolves.',
    },
    teaching: [
        { title: 'Vocabulary in Context: splashed, slithered, murmuring, thicket', text: 'Vocabulary in context refers to figuring out the precise meaning of words—such as *splashed*, *slithered*, *murmuring*, and *thicket*—by using the surrounding sentences, clues, and overall setting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the riverbank at high tide and low tide — list what each state of the water allows or forbids — and prove the setting is steering the plot.',
        labels: ['Vocabulary in Context: splashed,', 'Literary Devices: Imagery', 'Comprehension: Why Jahnavi Was', 'Critical Thinking: The Message', 'Poem: King Bruce', 'Poem: Rhyme Scheme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch01_008', title: 'Literary Devices: Imagery and Sound in Nature Descriptions',
          caseStudy: { intro: 'Have you ever stood by a rushing river in your village or heard rain pattering on your tin roof, and felt like the water was whispering a secret to you?',
            decisions: [{ prompt: 'Which of the following lines from a nature description appeals primarily to the sense of sound?', options: [
                { text: 'C', outcome: 'The correct answer is C. The words "gurgled" and "hissed" directly appeal to the sense of hearing.' },
                { text: 'imagery', outcome: 'Not quite — Students often confuse "imagery" with "imagination," thinking that any made-up story element.', reveals: 'students-often-confuse-imagery-with' },
                { text: 'imagination', outcome: 'Not quite — Students often confuse "imagery" with "imagination," thinking that any made-up story element.', reveals: 'students-often-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_010', title: 'Critical Thinking: The Message of the Story About Education',
          caseStudy: { intro: 'Imagine you watch a film where a young girl in a rural Indian village is told she cannot attend school simply because of traditions, but she refuses to accept.',
            decisions: [{ prompt: 'What is the primary obstacle that prevents Jahnavi from attending school in the story "The Day the River Spoke"?', options: [
                { text: 'Jahnavi is denied schooling primarily due to entrenched gender barriers and traditional', outcome: 'Jahnavi is denied schooling primarily due to entrenched gender barriers and traditional village.' },
                { text: 'message', outcome: 'Not quite — Students often believe that the "message" of a story is just a summary of what happened at the end.', reveals: 'the-message-of-a-story' },
                { text: 'Jahnavi finally went to school, so the moral is to go to school', outcome: 'Not quite — Students often believe that the "message" of a story is just a summary of what happened at the end.', reveals: 'the-message-of-a-story' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_012', title: 'Poem: Rhyme Scheme and Stanza Structure (AABB/ABAB)',
          caseStudy: { intro: 'Imagine you are listening to your favorite song or a traditional folk rhyme in Hindi or English—notice how the ends of certain lines bounce and match each.',
            decisions: [{ prompt: 'What term describes the pattern of rhymes at the end of each line in a poem, usually represented by letters like A, B, C?', options: [
                { text: 'The correct term is "rhyme scheme."', outcome: 'The correct term is "rhyme scheme." A wrong answer often confuses this with "stanza structure".' },
                { text: 'rhyme scheme', outcome: 'Not quite — Students often assume that words ending with the same spelling automatically rhyme (such as "rough".', reveals: 'words-ending-with-the-same' },
                { text: 'stanza structure', outcome: 'Not quite — Students often assume that words ending with the same spelling automatically rhyme (such as "rough".', reveals: 'words-ending-with-the-same' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student adapts \'The Day the River Spoke\' for a school anthology, but moves the whole story from the coastal river village to a dry desert plateau \'for variety\' — keeping every scene otherwise identical.',
            decisions: [{ prompt: 'What would this transplant break?', options: [
                { text: 'Almost everything — the river is not scenery but the story\'s machinery: it shapes the villagers\' commute, the isolation, and the voice that speaks to the protagonist. In a desert the same scenes lose their logic — no water to cross, no river to listen — so the character\'s relationship with her environment, and the imagery carrying it, must be rebuilt from scratch.', outcome: 'Setting in this story is causal, not decorative — change it and the plot\'s reasons evaporate, which is why \'same story, new backdrop\' never survives the move.' },
                { text: 'Nothing breaks — settings are interchangeable backdrops, so the story works identically on a plateau.', outcome: 'The river drives the plot — the crossing, the isolation, the speaking water — so swapping it for desert deletes the story\'s causes, not just its look.', reveals: 'setting-is-interchangeable' },
                { text: 'Only the descriptions need rewriting — the river\'s role is just pretty imagery.', outcome: 'The river does narrative work — it isolates the village and literally speaks to the protagonist — so it is plot machinery, not ornament.', reveals: 'setting-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Read the water and you read the village. In this story, the river does not just flow beside the characters — it pushes their lives around.',
            decisions: [{ prompt: 'What comes next? Learning Together: The Day the River Spoke · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Learning Together: The Day the River Spoke · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch01_007', difficulty: 'standard',
          question: 'Vocabulary in context refers to figuring out the precise meaning of words—such.',
          hint: 'Review Class 6 unit vocabulary strategies where context clues (synonyms, antonyms, and.',
          misconception: 'Students often look at a descriptive word like *slithered* or *murmuring* in isolation and guess its meaning based.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context refers to figuring out the precise meaning of words—such as',
                  options: ['Vocabulary in context refers to figuring out the precise meaning of words—such as', 'The story setting encompasses the physical location, environmental details, and cultural', 'From \'English chapter c7_engl_ch01\': the skill or concept this node teaches, applied to', 'Gender barriers to education refer to social, cultural, and economic obstacles that'],
                  hint: 'Review Class 6 unit vocabulary strategies where context clues (synonyms, antonyms, and direct.',
                  misconception: 'Students often look at a descriptive word like *slithered* or *murmuring* in isolation and guess its meaning based on sound alone (e.g.' }
          ],
            remediations: { 'students-often-look-at-a': { steps: ['If a student struggles to identify word meanings from context, guide them through a 3-step breakdown: First, circle the.', 'Second, underline the words right before and after it that describe what is moving or making a sound (the subject and.', 'Third, ask: "If I were acting this out or drawing this scene, what physical motion or sound would make sense here?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_008', difficulty: 'standard',
          question: 'Literary devices like imagery (using sensory details to paint pictures in the.',
          hint: 'Review vocabulary words from c7_engl_ch01_007 like splashed, slithered, and murmur before.',
          misconception: 'Students often confuse "imagery" with "imagination," thinking that any made-up story element is imagery.',
          parts: [
                { id: 'a', prompt: 'Which of the following lines from a nature description appeals primarily to the sense of sound? A) The bright green leaves shimmered under the afternoon sun.', answer: 'The rushing water gurgled and hissed',
                  options: ['The rushing water gurgled and hissed', 'imagery', 'imagination'],
                  hint: 'Review vocabulary words from c7_engl_ch01_007 like splashed, slithered, and murmur before analyzing.',
                  misconception: 'Students often confuse "imagery" with "imagination," thinking that any made-up story element is imagery.' },
                { id: 'b', prompt: 'Read this sentence: "The emerald canopy of the forest whispered ancient secrets through the morning breeze." What specific literary device is being used when.', answer: 'Personification',
                  options: ['Personification', 'imagery', 'imagination'],
                  hint: 'Review vocabulary words from c7_engl_ch01_007 like splashed, slithered, and murmur before analyzing.',
                  misconception: 'Students often confuse "imagery" with "imagination," thinking that any made-up story element is imagery.' },
                { id: 'c', prompt: 'Identify the type of imagery used in the phrase: "The coarse, damp mud squelched between her toes as she stepped toward the riverbank." A) Visual imagery only.', answer: 'C) Tactile (touch) and auditory imagery',
                  options: ['C) Tactile (touch) and auditory imagery', 'imagery', 'imagination'],
                  hint: 'Review vocabulary words from c7_engl_ch01_007 like splashed, slithered, and murmur before analyzing.',
                  misconception: 'Students often confuse "imagery" with "imagination," thinking that any made-up story element is imagery.' }
          ],
            remediations: { 'students-often-confuse-imagery-with': { steps: ['If a student struggles to identify imagery, guide them step-by-step using a sensory chart.', 'Ask: "Can you see a color here?', 'Can you feel temperature or texture?', 'Can you hear a noise?" Have them highlight color words in green, touch words in blue, and sound words in red before.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "imagery" with "imagination," thinking that any made-up story element is imagery.',
          parts: [
                { id: 'a', prompt: 'A critic claims that sound words and imagery in a story about nature are just unnecessary decoration that slows down the plot.', answer: 'that you must disagree',
                  options: ['that you must disagree', 'imagery', 'imagination'],
                  hint: 'Review vocabulary words from c7_engl_ch01_007 like splashed, slithered, and murmur before analyzing.',
                  misconception: 'Students often confuse "imagery" with "imagination," thinking that any made-up story element is imagery.' }
          ],
            remediations: { 'students-often-confuse-imagery-with': { steps: ['If a student struggles to identify imagery, guide them step-by-step using a sensory chart.', 'Ask: "Can you see a color here?', 'Can you feel temperature or texture?', 'Can you hear a noise?" Have them highlight color words in green, touch words in blue, and sound words in red before.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_009', difficulty: 'standard',
          question: 'Analyzing the specific socio-economic, familial, and cultural reasons why.',
          hint: 'Review character analysis and plot sequence from Class 6 unit 1 stories before analyzing.',
          misconception: 'Students often believe that Jahnavi was denied schooling purely because she disliked studying or because her parents.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Analyzing the specific socio-economic, familial, and cultural reasons why a character in',
                  options: ['Analyzing the specific socio-economic, familial, and cultural reasons why a character in', 'The story setting encompasses the physical location, environmental details, and cultural', 'From \'English chapter c7_engl_ch01\': the skill or concept this node teaches, applied to', 'Gender barriers to education refer to social, cultural, and economic obstacles that'],
                  hint: 'Review character analysis and plot sequence from Class 6 unit 1 stories before analyzing complex.',
                  misconception: 'Students often believe that Jahnavi was denied schooling purely because she disliked studying or because her parents were cruel, completely.' }
          ],
            remediations: { 'jahnavi-was-denied-schooling-purely': { steps: ['When a student struggles with this, guide them step-by-step: 1.', 'Ask them to locate two sentences in the story where Jahnavi talks about her daily chores.', 'Ask them who works in the fields or helps at home in her family.', 'Explain that poverty and daily survival chores force families to make hard choices, and Jahnavi\'s denial is a result.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_010', difficulty: 'standard',
          question: 'From \'English chapter c7_engl_ch01\': the skill or concept this node teaches.',
          hint: 'Review node c7_engl_ch01_009 to ensure clarity on the exact reasons Jahnavi faced.',
          misconception: 'Students often believe that the "message" of a story is just a summary of what happened at the end (e.g., "Jahnavi.',
          parts: [
                { id: 'a', prompt: 'If a classmate argues that Jahnavi\'s struggle for education is solely her family\'s private matter and has nothing to do with society, how would you use.', answer: 'Step 1: Identify the claim that education is merely a private family affair',
                  options: ['Step 1: Identify the claim that education is merely a private family affair', 'message', 'Jahnavi finally went to school, so the moral is to go to school', 'the "message" of a story is just a summary of what happened at the end (e'],
                  hint: 'Review node c7_engl_ch01_009 to ensure clarity on the exact reasons Jahnavi faced educational.',
                  misconception: 'Students often believe that the "message" of a story is just a summary of what happened at the end (e.g., "Jahnavi finally went to school.' }
          ],
            remediations: { 'the-message-of-a-story': { steps: ['If a student struggles to identify the deeper message, guide them with targeted questions: Do not ask "What happened?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_011', difficulty: 'standard',
          question: '"King Bruce and the Spider" is a narrative poem that tells the true historical.',
          hint: 'Review Class 6 Node c6_english_u1_004 on narrative poetry features before attempting.',
          misconception: 'Students often think that narrative poems are just stories written in regular paragraphs with random rhyming words.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"King Bruce and the Spider" is a narrative poem that tells the true historical legend of',
                  options: ['"King Bruce and the Spider" is a narrative poem that tells the true historical legend of', 'The story setting encompasses the physical location, environmental details, and cultural', 'From \'English chapter c7_engl_ch01\': the skill or concept this node teaches, applied to', 'Gender barriers to education refer to social, cultural, and economic obstacles that'],
                  hint: 'Review Class 6 Node c6_english_u1_004 on narrative poetry features before attempting.',
                  misconception: 'Students often think that narrative poems are just stories written in regular paragraphs with random rhyming words thrown in at the end.' }
          ],
            remediations: { 'narrative-poems-are-just-stories': { steps: ['To fix this, guide the student to read Stanza 3 and Stanza 5 aloud, pointing out how the rhythm mimics the steady.', 'Ask them: \'How does the king\'s voice change from the start of the poem to the end?\' Explain that narrative poetry uses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch01_012', difficulty: 'standard',
          question: 'A rhyme scheme is the pattern of sounds that repeats at the end of a line.',
          hint: 'Review Class 6 Poetic Devices -- Rhyme Scheme, Metaphor, Imagery to practice matching.',
          misconception: 'Students often assume that words ending with the same spelling automatically rhyme (such as "rough" and "cough",.',
          parts: [
                { id: 'a', prompt: 'What term describes the pattern of rhymes at the end of each line in a poem, usually represented by letters like A, B, C?', answer: 'The correct term is "rhyme scheme."',
                  options: ['The correct term is "rhyme scheme."', 'rhyme scheme', 'stanza structure', 'through'],
                  hint: 'Review Class 6 Poetic Devices -- Rhyme Scheme, Metaphor, Imagery to practice matching sound pairs.',
                  misconception: 'Students often assume that words ending with the same spelling automatically rhyme (such as "rough" and "cough", or "bough" and "through").' },
                { id: 'b', prompt: 'Read this four-line stanza: "The morning sun begins to rise (A) And paints the waking earth with gold (B) Beneath the wide and open skies (A) A tale of hope.', answer: 'The rhyme scheme is ABAB',
                  options: ['The rhyme scheme is ABAB', 'through'],
                  hint: 'Review Class 6 Poetic Devices -- Rhyme Scheme, Metaphor, Imagery to practice matching sound pairs.',
                  misconception: 'Students often assume that words ending with the same spelling automatically rhyme (such as "rough" and "cough", or "bough" and "through").' },
                { id: 'c', prompt: 'If a four-line stanza has the ending words "tree" (line 1), "free" (line 2), "night" (line 3), and "light" (line 4), how should you label its rhyme scheme.', answer: 'Label the end word of line 1 ("tree") as A',
                  options: ['Label the end word of line 1 ("tree") as A', 'through'],
                  hint: 'Review Class 6 Poetic Devices -- Rhyme Scheme, Metaphor, Imagery to practice matching sound pairs.',
                  misconception: 'Students often assume that words ending with the same spelling automatically rhyme (such as "rough" and "cough", or "bough" and "through").' }
          ],
            remediations: { 'words-ending-with-the-same': { steps: ['When a student makes a sound-versus-spelling error, guide them to read the poem aloud and cover the text with their.', 'Ask: "Do your ears hear the exact same ending sound, or just similar spelling?" Have them tap a pencil on the desk when.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
