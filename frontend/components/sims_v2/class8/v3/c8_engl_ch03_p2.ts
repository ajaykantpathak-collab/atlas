import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch03_p2: SimDef = {
    id: 'v3_c8_engl_ch03_p2',
    title: 'The Case of the Fifth Word · Part 2/3',
    subtitle: 'The detective who notices what adults miss',
    classLevel: 8, subject: 'engl', topic: 'The Case of the Fifth Word · Part 2/3',
    chapters: ['c8_engl_ch03'],
    nodeIds: ['c8_engl_ch3_15', 'c8_engl_ch3_16', 'c8_engl_ch3_17', 'c8_engl_ch3_2', 'c8_engl_ch3_3', 'c8_engl_ch3_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior detective shadowing Encyclopedia Brown', intro: 'Grown-ups run the police station, but a kid keeps solving their cases. Your job: figure out what he sees that they don\'t — and why being young is actually his edge.', goal: 'Analyze Encyclopedia Brown\'s character — how his observation-first, assumption-free approach to clues drives the mystery and the theme that truth requires verification.' },
    discovery: {
        question: 'Tim Nolan swears he was at the jewellery store at 3:00 PM — but the store clock stopped at 2:45. Why does that crack his alibi?',
        options: ['Encyclopedia Brown checks alibis against physical evidence — the stopped clock proves Tim\'s timing was a lie', 'Clocks are always slow in jewellery stores', '3:00 and 2:45 are basically the same time', 'He got lucky guessing'],
        answer: 'Encyclopedia Brown checks alibis against physical evidence — the stopped clock proves Tim\'s timing was a lie',
        hook: 'Adults accept what witnesses say; a kid detective tests it. Encyclopedia Brown\'s real superpower isn\'t luck or book knowledge — it\'s refusing to assume, and noticing the tiny detail everyone else waved past.',
    },
    teaching: [
        { title: 'Poetic Devices: Alliteration and Pun in the Poem', text: '**Alliteration** is the deliberate repetition of the same initial consonant sound in a sequence of nearby words to create a musical rhythm or sound pattern.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch3_15', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build a character case file on Encyclopedia Brown: collect the moments where he spots what adults miss, compare how he and Chief Brown treat the same clue, and prove his \'skill\' is observation, not luck.',
        labels: ['Poetic Devices: Alliteration', 'Poem: Tone of Playfulness', 'Writing: How to Embed', 'Setting: Idaville and', 'Plot: The Mystery', 'Detective Genre: Clues, Deduction,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch3_15', title: 'Poetic Devices: Alliteration and Pun in the Poem',
          caseStudy: { intro: 'Imagine you are reading a billboard on an Indian highway that says: *"Don\'t drive like a monster, save your soul!"* and right below it, there is a picture of.',
            decisions: [{ prompt: 'What is the primary difference between how we identify **alliteration** and how we identify a **pun** in a line of poetry?', options: [
                { text: 'Alliteration is identified through repeating initial consonant **sounds** (an auditory', outcome: 'Alliteration is identified through repeating initial consonant **sounds** (an auditory pattern).' },
                { text: 'alliteration is about repeating *letters* rather than *sounds*', outcome: 'Not quite — **The Spelling Trap:** Students often assume alliteration is about repeating *letters* rather than.', reveals: 'the-spelling-trap-students-often' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_16', title: 'Poem: Tone of Playfulness and Humour in the Poem',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp forward that makes you laugh, but when you re-read it, you realize it\'s actually making a clever point about how we use.',
            decisions: [{ prompt: 'What is the difference between \'tone\' and \'mood\' in poetry?', options: [
                { text: 'Tone is the poet\'s attitude toward the subject (e.g., playful, serious, ironic)', outcome: 'Tone is the poet\'s attitude toward the subject (e.g., playful, serious, ironic); mood is the.' },
                { text: 'the tone is happy', outcome: 'Not quite — Students think "playful tone" means the poem is *only* silly or light, so they write "the poet uses.', reveals: 'playful-tone-means-the-poem' },
                { text: 'playful tone', outcome: 'Not quite — Students think "playful tone" means the poem is *only* silly or light, so they write "the poet uses.', reveals: 'playful-tone-means-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_2', title: 'Setting: Idaville and the Brown Family Dining Table',
          caseStudy: { intro: 'Imagine you walk into your own kitchen after school and your parent is reading a newspaper—what mysteries might be solved right there over tea and toast?',
            decisions: [{ prompt: 'What two primary settings anchor "The Case of the Fifth Word," and what is the distinctive function of each in the story?', options: [
                { text: 'The two primary settings are the town of Idaville (macro-setting) and the Brown family', outcome: 'The two primary settings are the town of Idaville (macro-setting) and the Brown family dining table.' },
                { text: 'Idaville', outcome: 'Not quite — Students treat setting as "where the story happens" (a static backdrop) rather than "how the story.', reveals: 'students-treat-setting-as-where' },
                { text: 'the Brown house', outcome: 'Not quite — Students treat setting as "where the story happens" (a static backdrop) rather than "how the story.', reveals: 'students-treat-setting-as-where' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_3', title: 'Plot: The Mystery of Tim Nolan and the Jewellery Robbery',
          caseStudy: { intro: 'Imagine you are watching a detective series on TV: the episode opens with a jewellery store robbery, the detective gathers clues, some suspects look guilty but.',
            decisions: [{ prompt: 'What are the five standard stages of a plot diagram, and which stage typically contains the crime in a mystery story?', options: [
                { text: 'The five stages are exposition, rising action, climax, falling action, and resolution', outcome: 'The five stages are exposition, rising action, climax, falling action, and resolution.' },
                { text: 'of a mystery is just', outcome: 'Not quite — Students often think the "plot" of a mystery is just "what happened" and write a summary like "Tim.', reveals: 'the-plot-of-a-mystery' },
                { text: 'and write a summary like', outcome: 'Not quite — Students often think the "plot" of a mystery is just "what happened" and write a summary like "Tim.', reveals: 'the-plot-of-a-mystery' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_4', title: 'Detective Genre: Clues, Deduction, and Problem-Solving',
          caseStudy: { intro: 'Imagine you return to class and find your favourite pencil box missing. How would you figure out who took it?',
            decisions: [{ prompt: 'What is a clue in a detective story?', options: [
                { text: 'A clue is any piece of information—something seen, heard, or found—that helps the', outcome: 'A clue is any piece of information—something seen, heard, or found—that helps the investigator.' },
                { text: 'a clue is the criminal’s confession', outcome: 'Not quite — Students often believe that any unusual or striking detail in a story automatically counts as.', reveals: 'any-unusual-or-striking-detail' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_15', title: 'Use it in the wild',
          caseStudy: { intro: 'In a book-club discussion, a classmate says Encyclopedia Brown cracks cases because \'he\'s just the smartest person in town — smarter than every adult.\' A teammate wants to argue the real reason is something else entirely.',
            decisions: [{ prompt: 'What actually makes the boy detective effective?', options: [
                { text: 'His childlike perspective — he questions the assumptions adults take for granted and spots the small, mundane details they dismiss, like a stopped clock contradicting a suspect\'s alibi. His repeatable method is observation, not luck or superior book knowledge.', outcome: 'This links trait to theme correctly: his age gives him fresh eyes, which is precisely what lets him see what experience-blinded adults miss.' },
                { text: 'The first classmate is right — reading that many books simply makes him smarter than the grown-ups, including the police chief.', outcome: 'The stories show him beating adults at noticing, not knowing; his edge is a viewpoint free of adult assumptions, not a bigger memory.', reveals: 'smartest-kid-wins' },
                { text: 'It is mostly luck — he happens to glance at the right detail at the right moment in each case.', outcome: 'Luck is not repeatable, but his method is: he deliberately checks statements against physical evidence every single time.', reveals: 'detective-by-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_4', title: 'The bigger picture',
          caseStudy: { intro: 'The boy detective wins because he assumes nothing. Where adults trust procedure and appearances, he trusts a stopped clock — small overlooked details are where truth hides.',
            decisions: [{ prompt: 'What comes next? The Case of the Fifth Word · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Case of the Fifth Word · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch3_15', difficulty: 'standard',
          question: '**Alliteration** is the deliberate repetition of the same initial consonant.',
          hint: 'If you are stuck, read the lines aloud very slowly and write down the phonetic spelling.',
          misconception: '**The Spelling Trap:** Students often assume alliteration is about repeating *letters* rather than *sounds*.',
          parts: [
                { id: 'a', prompt: 'Explain why the phrase **"Cute cats chase mice"** contains alliteration, while **"Cute cats city-hop"** does not, even though all three words in both sentences.', answer: 'Alliteration is based entirely on the **initial sound**, not the letter',
                  options: ['Alliteration is based entirely on the **initial sound**, not the letter', 'alliteration is about repeating *letters* rather than *sounds*'],
                  hint: 'If you are stuck, read the lines aloud very slowly and write down the phonetic spelling of the.',
                  misconception: '**The Spelling Trap:** Students often assume alliteration is about repeating *letters* rather than *sounds*.' }
          ],
            remediations: { 'the-spelling-trap-students-often': { steps: ['If the student is struggling, take these steps: 1.', '**The Whisper Test:** Have the student whisper the alliterative line.', 'Ask: "Do your lips make the exact same shape for the first sound of each word?" (e.g., *chef* vs.', 'If not, it\'s not alliteration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_15', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The Spelling Trap:** Students often assume alliteration is about repeating *letters* rather than *sounds*.',
          parts: [
                { id: 'a', prompt: 'A student writes this line for a funny poem: *"The big blue bird flew beautifully over the branch."* Evaluate whether this line is highly effective in.', answer: 'The line has strong alliteration ("big blue bird',
                  options: ['The line has strong alliteration ("big blue bird', 'alliteration is about repeating *letters* rather than *sounds*'],
                  hint: 'If you are stuck, read the lines aloud very slowly and write down the phonetic spelling of the.',
                  misconception: '**The Spelling Trap:** Students often assume alliteration is about repeating *letters* rather than *sounds*.' }
          ],
            remediations: { 'the-spelling-trap-students-often': { steps: ['If the student is struggling, take these steps: 1.', '**The Whisper Test:** Have the student whisper the alliterative line.', 'Ask: "Do your lips make the exact same shape for the first sound of each word?" (e.g., *chef* vs.', 'If not, it\'s not alliteration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_16', difficulty: 'standard',
          question: 'Tone in poetry refers to the poet\'s attitude toward the subject, conveyed.',
          hint: 'Review c8_engl_ch3_15 (alliteration and pun) and c7_engl_ch03_015 (writing about tone).',
          misconception: 'Students think "playful tone" means the poem is *only* silly or light, so they write "the poet uses funny words".',
          parts: [
                { id: 'a', prompt: 'What is the difference between \'tone\' and \'mood\' in poetry?', answer: 'Tone is the poet\'s attitude toward the subject (e.g., playful, serious, ironic)',
                  options: ['Tone is the poet\'s attitude toward the subject (e.g., playful, serious, ironic)', 'the tone is happy', 'playful tone', 'the poet uses funny words'],
                  hint: 'Review c8_engl_ch3_15 (alliteration and pun) and c7_engl_ch03_015 (writing about tone) to refresh.',
                  misconception: 'Students think "playful tone" means the poem is *only* silly or light, so they write "the poet uses funny words" without analyzing *how*.' },
                { id: 'b', prompt: 'The poem uses the phrase "the fifth word vanished into thin air." Identify the technique and explain how it contributes to the playful tone.', answer: 'This is hyperbole (exaggeration)—words cannot literally vanish into thin air',
                  options: ['This is hyperbole (exaggeration)—words cannot literally vanish into thin air', 'personification', 'metaphor', 'playful tone'],
                  hint: 'Review c8_engl_ch3_15 (alliteration and pun) and c7_engl_ch03_015 (writing about tone) to refresh.',
                  misconception: 'Students think "playful tone" means the poem is *only* silly or light, so they write "the poet uses funny words" without analyzing *how*.' }
          ],
            remediations: { 'playful-tone-means-the-poem': { steps: ['If a student gives a surface-level answer, do this: (1) Give them two lines from the poem—one "serious-sounding" (e.g.', '(2) Ask: "Why does putting these together make us laugh?" (3) Guide them to name the technique: "This is called.', 'Find three more pairs in the poem." (4) Have them complete a T-chart: Left column = "Detective Language," Right column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_17', difficulty: 'standard',
          question: 'Embedding quotes in poetry answers means seamlessly integrating brief, specific.',
          hint: 'If stuck, practice extracting just 2 or 3 essential words from a line of poetry instead.',
          misconception: 'Students often commit "quote dropping" (also known as "isolated quotes"), where they state a point in one sentence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Embedding quotes in poetry answers means seamlessly integrating brief, specific text',
                  options: ['Embedding quotes in poetry answers means seamlessly integrating brief, specific text', 'Character analysis involves examining a fictional character\'s traits, motivations, and', 'Evidence consists of verifiable, explicit facts, clues, or direct quotes provided', 'An anagram is a word play technique where the letters of a word or phrase are rearranged'],
                  hint: 'If stuck, practice extracting just 2 or 3 essential words from a line of poetry instead of copying.',
                  misconception: 'Students often commit "quote dropping" (also known as "isolated quotes"), where they state a point in one sentence, paste a quote.' }
          ],
            remediations: { 'students-often-commit-quote-dropping': { steps: ['When a student drops isolated quotes, apply the **"Bridge & Blend"** protocol: 1.', '**Identify the Drop:** Circle the quote and ask: "If I remove the quote marks, does this form one smooth, grammatically.', '**Build a Lead-in Bridge:** Require the student to attach a signal verb phrase before the quote (e.g., *...as seen when.', '**Trim the Quote:** Show the student how to cut the quote down to just 2–5 critical words so it easily fits inside.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_2', difficulty: 'standard',
          question: 'Setting in detective fiction establishes the physical and social world where.',
          hint: 'Review c7_engl_ch03_006 (family home as discovery space) and c6_english_u4_031 (setting.',
          misconception: 'Students treat setting as "where the story happens" (a static backdrop) rather than "how the story happens" (an active.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "setting as clue-container" to a new scenario: If Idaville suddenly became a sprawling metropolis with millions of strangers, how would.', answer: 'In a metropolis, crimes would be anonymous, complex, and require forensic',
                  options: ['In a metropolis, crimes would be anonymous, complex, and require forensic', 'it would be harder'],
                  hint: 'Review c7_engl_ch03_006 (family home as discovery space) and c6_english_u4_031 (setting.',
                  misconception: 'Students treat setting as "where the story happens" (a static backdrop) rather than "how the story happens" (an active system that.' }
          ],
            remediations: { 'students-treat-setting-as-where': { steps: ['Have the student list every scene in the story and mark where each clue is *revealed*—they will see almost all arrive.', 'Ask: "If Chief Brown emailed the case file to Encyclopedia\'s phone, what would be lost?" Guide them to: the.', 'Compare with a modern police procedural (TV show) where detectives stand over a light table—ask what *mood* each.', 'Finally, have them rewrite the opening paragraph moving the case presentation to the police station; discuss how the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_3', difficulty: 'standard',
          question: 'Plot is the sequence of causally linked events that make up a mystery story.',
          hint: 'Review the plot diagram from Class 6 (c6_english_u1_001) and practice labeling the stages.',
          misconception: 'Students often think the "plot" of a mystery is just "what happened" and write a summary like "Tim Nolan stole jewels.',
          parts: [
                { id: 'a', prompt: 'Given a new short mystery scenario: "A classroom trophy goes missing.', answer: 'Step 1: Identify the note as a planted clue',
                  options: ['Step 1: Identify the note as a planted clue', 'fifth word', 'of a mystery is just', 'and write a summary like'],
                  hint: 'Review the plot diagram from Class 6 (c6_english_u1_001) and practice labeling the stages in.',
                  misconception: 'Students often think the "plot" of a mystery is just "what happened" and write a summary like "Tim Nolan stole jewels, but Encyclopedia.' }
          ],
            remediations: { 'the-plot-of-a-mystery': { steps: ['Have the student reread only the scenes where Encyclopedia examines the note and explains his thinking.', 'Ask them to draw a flowchart: "Note found → Count words → Fifth word = X → X means Y → Y implicates Z".', 'Then have them retell the plot *as a chain of deductions*, not a list of events.', 'Finally, give them a new 3-sentence mystery note and ask them to pick a "key word position" and explain why it works.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_4', difficulty: 'standard',
          question: 'The detective genre focuses on how investigators use clues and logical.',
          hint: 'Work step by step.',
          misconception: 'Students often believe that any unusual or striking detail in a story automatically counts as a clue that points.',
          parts: [
                { id: 'a', prompt: 'Read the short scene: “During the lunch break, Meena’s notebook went missing. She saw Rohan near her desk, laughing.', answer: 'Step 1: List all details mentioned – Rohan near desk, laughing',
                  options: ['Step 1: List all details mentioned – Rohan near desk, laughing', 'Rohan was laughing'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students often believe that any unusual or striking detail in a story automatically counts as a clue that points directly to the solution.' }
          ],
            remediations: { 'any-unusual-or-striking-detail': { steps: ['To fix this, guide the student through a three‑question check for each detail they notice: (1) Does this detail help.', '(2) Could this detail have another innocent explanation?', '(3) Does combining this detail with other clues eliminate suspects or support a conclusion?', 'Model the process with a simple scenario: “A wet floor near the classroom door.” Ask: Is the wet floor relevant?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
