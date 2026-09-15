import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch03_p1: SimDef = {
    id: 'v3_c8_engl_ch03_p1',
    title: 'The Case of the Fifth Word · Part 1/3',
    subtitle: 'The detective who notices what adults miss',
    classLevel: 8, subject: 'engl', topic: 'The Case of the Fifth Word · Part 1/3',
    chapters: ['c8_engl_ch03'],
    nodeIds: ['c8_engl_ch3_1', 'c8_engl_ch3_10', 'c8_engl_ch3_11', 'c8_engl_ch3_12', 'c8_engl_ch3_13', 'c8_engl_ch3_14'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior detective shadowing Encyclopedia Brown', intro: 'Grown-ups run the police station, but a kid keeps solving their cases. Your job: figure out what he sees that they don\'t — and why being young is actually his edge.', goal: 'Analyze Encyclopedia Brown\'s character — how his observation-first, assumption-free approach to clues drives the mystery and the theme that truth requires verification.' },
    discovery: {
        question: 'Tim Nolan swears he was at the jewellery store at 3:00 PM — but the store clock stopped at 2:45. Why does that crack his alibi?',
        options: ['Encyclopedia Brown checks alibis against physical evidence — the stopped clock proves Tim\'s timing was a lie', 'Clocks are always slow in jewellery stores', '3:00 and 2:45 are basically the same time', 'He got lucky guessing'],
        answer: 'Encyclopedia Brown checks alibis against physical evidence — the stopped clock proves Tim\'s timing was a lie',
        hook: 'Adults accept what witnesses say; a kid detective tests it. Encyclopedia Brown\'s real superpower isn\'t luck or book knowledge — it\'s refusing to assume, and noticing the tiny detail everyone else waved past.',
    },
    teaching: [
        { title: 'Character Analysis: Encyclopedia Brown as a Boy Detective', text: 'Character analysis involves examining a fictional character\'s traits, motivations, and development by identifying textual evidence (actions, dialogue, thoughts, relationships) and explaining how.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch3_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build a character case file on Encyclopedia Brown: collect the moments where he spots what adults miss, compare how he and Chief Brown treat the same clue, and prove his \'skill\' is observation, not luck.',
        labels: ['Character Analysis: Encyclopedia Brown', 'Critical Thinking: Distinguishing Between', 'Word Play: Anagrams', 'Writing: Creating a Short', 'Poem: Summary and Theme', 'Poem: Rhyme and Rhythm'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch3_1', title: 'Character Analysis: Encyclopedia Brown as a Boy Detective',
          caseStudy: { intro: 'Imagine you\'re trying to figure out why your friend suddenly stopped sharing snacks at lunch—you\'d notice small clues like them avoiding the cafeteria.',
            decisions: [{ prompt: 'What is the primary purpose of character analysis in a story like Encyclopedia Brown?', options: [
                { text: 'The primary purpose is to understand how a character\'s traits, actions, and motivations', outcome: 'The primary purpose is to understand how a character\'s traits, actions, and motivations contribute.' },
                { text: 'to describe what the character looks like', outcome: 'Not quite — Students often believe Encyclopedia Brown\'s success comes from him being exceptionally smart.', reveals: 'encyclopedia-brown-s-success-comes' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_11', title: 'Word Play: Anagrams and Crosswords as Literary Puzzles',
          caseStudy: { intro: 'Imagine you are a detective like Encyclopedia Brown, and you find a scrap of paper left by a thief.',
            decisions: [{ prompt: 'What is the core rule that distinguishes a true anagram from a simple spelling variation or a shorter word made from the same letters?', options: [
                { text: 'A true anagram must use **all** the original letters of the source word exactly once to', outcome: 'A true anagram must use **all** the original letters of the source word exactly once to form.' },
                { text: 'it just needs to contain some of the same letters (e', outcome: 'Not quite — The most common mistake Class 8 students make is **semantic guessing**—trying to solve anagrams and.', reveals: 'the-most-common-mistake-class' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_13', title: 'Poem: Summary and Theme of the Wordplay Poem',
          caseStudy: { intro: 'Imagine you are playing a game of treasure hunt with your friends in your neighborhood.',
            decisions: [{ prompt: 'What is the difference between the literal meaning of a word and its figurative use in a wordplay poem?', options: [
                { text: 'The literal meaning is the direct, dictionary definition of a word (e.g., a "pen" as an', outcome: 'The literal meaning is the direct, dictionary definition of a word (e.g., a "pen" as an instrument.' },
                { text: 'serious', outcome: 'Not quite — Students often believe that if a poem is funny or uses wordplay (like puns or riddles), it cannot.', reveals: 'if-a-poem-is-funny' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_14', title: 'Poem: Rhyme and Rhythm in Light Verse',
          caseStudy: { intro: 'Imagine you\'re listening to a funny street vendor\'s rhyming call to sell snacks—"Hot samosas, crisp and golden, prices that won\'t leave you cold-en!"—and you.',
            decisions: [{ prompt: 'What is the basic definition of "rhyme" in poetry?', options: [
                { text: 'Rhyme is the repetition of similar ending sounds in two or more words, typically at the', outcome: 'Rhyme is the repetition of similar ending sounds in two or more words, typically at the end.' },
                { text: 'Rhyme means words that start with the same sound', outcome: 'Not quite — Students often believe that identifying a rhyme scheme (e.g., labeling lines as ABABCC).', reveals: 'identifying-a-rhyme-scheme-e' },
                { text: 'identifying a rhyme scheme (e', outcome: 'Not quite — Students often believe that identifying a rhyme scheme (e.g., labeling lines as ABABCC).', reveals: 'identifying-a-rhyme-scheme-e' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In a book-club discussion, a classmate says Encyclopedia Brown cracks cases because \'he\'s just the smartest person in town — smarter than every adult.\' A teammate wants to argue the real reason is something else entirely.',
            decisions: [{ prompt: 'What actually makes the boy detective effective?', options: [
                { text: 'His childlike perspective — he questions the assumptions adults take for granted and spots the small, mundane details they dismiss, like a stopped clock contradicting a suspect\'s alibi. His repeatable method is observation, not luck or superior book knowledge.', outcome: 'This links trait to theme correctly: his age gives him fresh eyes, which is precisely what lets him see what experience-blinded adults miss.' },
                { text: 'The first classmate is right — reading that many books simply makes him smarter than the grown-ups, including the police chief.', outcome: 'The stories show him beating adults at noticing, not knowing; his edge is a viewpoint free of adult assumptions, not a bigger memory.', reveals: 'smartest-kid-wins' },
                { text: 'It is mostly luck — he happens to glance at the right detail at the right moment in each case.', outcome: 'Luck is not repeatable, but his method is: he deliberately checks statements against physical evidence every single time.', reveals: 'detective-by-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch3_14', title: 'The bigger picture',
          caseStudy: { intro: 'The boy detective wins because he assumes nothing. Where adults trust procedure and appearances, he trusts a stopped clock — small overlooked details are where truth hides.',
            decisions: [{ prompt: 'What comes next? The Case of the Fifth Word · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Case of the Fifth Word · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch3_1', difficulty: 'standard',
          question: 'Character analysis involves examining a fictional character\'s traits.',
          hint: 'Review c7_engl_ch01_002: Character Analysis: Jahnavi and Her Dream.',
          misconception: 'Students often believe Encyclopedia Brown\'s success comes from him being exceptionally smart or knowledgeable like.',
          parts: [
                { id: 'a', prompt: 'In the chapter, Encyclopedia Brown notices Tim Nolan claims he was at the jewellery store at 3:00 PM, but the store clock was stopped at 2:45 PM.', answer: 'STEP 1: Identify the given detail (Tim\'s alibi vs',
                  options: ['STEP 1: Identify the given detail (Tim\'s alibi vs', 'He saw the clock was broken'],
                  hint: 'Review c7_engl_ch01_002: Character Analysis: Jahnavi and Her Dream of Education—specifically how.',
                  misconception: 'Students often believe Encyclopedia Brown\'s success comes from him being exceptionally smart or knowledgeable like an adult, rather than.' }
          ],
            remediations: { 'encyclopedia-brown-s-success-comes': { steps: ['To fix this, first ask the student: "If Encyclopedia Brown were just a smart adult, why would the story emphasize he\'s.', 'Have them list 3 details Brown notices that an adult would likely overlook, then explicitly state how each connects.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_10', difficulty: 'standard',
          question: 'Evidence consists of verifiable, explicit facts, clues, or direct quotes.',
          hint: 'If stuck, practice highlighting only the direct quotes in a short paragraph that prove.',
          misconception: 'Students frequently mistake a high-probability or extremely logical guess for factual textual evidence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Evidence consists of verifiable, explicit facts, clues, or direct quotes provided',
                  options: ['Evidence consists of verifiable, explicit facts, clues, or direct quotes provided', 'Character analysis involves examining a fictional character\'s traits, motivations, and', 'An anagram is a word play technique where the letters of a word or phrase are rearranged', 'A short mystery story with clues is a narrative structured around a central puzzle or'],
                  hint: 'If stuck, practice highlighting only the direct quotes in a short paragraph that prove a given.',
                  misconception: 'Students frequently mistake a high-probability or extremely logical guess for factual textual evidence.' }
          ],
            remediations: { 'students-frequently-mistake-a-high': { steps: ['When students confuse assumptions with evidence, ask them to use the "Text Fingerprint Test." Have the student.', 'If they cannot put their finger on the explicit words in the text, force them to label the claim as.', 'This demonstrates visually that an unproven guess cannot be classified as textual evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_11', difficulty: 'standard',
          question: 'An anagram is a word play technique where the letters of a word or phrase are.',
          hint: 'If a student gets stuck, have them practice simple 3-letter anagrams (e.g., turning "tea".',
          misconception: 'The most common mistake Class 8 students make is **semantic guessing**—trying to solve anagrams and crossword clues.',
          parts: [
                { id: 'a', prompt: 'Read this crossword clue: *"Scrambled eggs found in a valley (4 letters)."* Explain why the word "scrambled" is the most important clue word here, and what.', answer: 'The word "scrambled" acts as an **anagram indicator**',
                  options: ['The word "scrambled" acts as an **anagram indicator**', 'scrambled eggs'],
                  hint: 'If a student gets stuck, have them practice simple 3-letter anagrams (e.g., turning "tea" into.',
                  misconception: 'The most common mistake Class 8 students make is **semantic guessing**—trying to solve anagrams and crossword clues based purely on the.' }
          ],
            remediations: { 'the-most-common-mistake-class': { steps: ['If a student is struggling with semantic guessing, implement this three-step physical intervention: 1.', '**The Letter-Tile Method:** Have the student write the letters of the source word on individual paper slips or sticky.', 'This breaks the visual connection to the original word.', '**The Letter Bank:** Force them to draw a grid with the exact number of boxes as the source word and check off each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_12', difficulty: 'standard',
          question: 'A short mystery story with clues is a narrative structured around a central.',
          hint: 'If stuck, review how authors hide clues in plain sight by describing them as ordinary.',
          misconception: '**The "Magical Deduction" or "Mind-Reading" Fallacy** Students often write mysteries where the detective solves the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A short mystery story with clues is a narrative structured around a central puzzle or',
                  options: ['A short mystery story with clues is a narrative structured around a central puzzle or', 'Character analysis involves examining a fictional character\'s traits, motivations, and', 'Evidence consists of verifiable, explicit facts, clues, or direct quotes provided', 'An anagram is a word play technique where the letters of a word or phrase are rearranged'],
                  hint: 'If stuck, review how authors hide clues in plain sight by describing them as ordinary background.',
                  misconception: '**The "Magical Deduction" or "Mind-Reading" Fallacy** Students often write mysteries where the detective solves the crime using information.' }
          ],
            remediations: { 'the-magical-deduction-or-mind': { steps: ['**The "Clue-to-Resolution" Anchor Sheet** If a student is struggling with planting clues, stop them from writing the.', 'Have them fill out this three-step planning template first: 1.', '**The Culprit\'s Slip-Up (The Clue):** What physical trace did they leave?', '*(e.g., wet footprints)* 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_13', difficulty: 'standard',
          question: 'A wordplay poem is a piece of light verse that uses linguistic games—such.',
          hint: 'If the student is struggling, review how to identify central ideas in simple narrative.',
          misconception: 'Students often believe that if a poem is funny or uses wordplay (like puns or riddles), it cannot have a "serious".',
          parts: [
                { id: 'a', prompt: 'A short poem describes a "ruler" who measures boundaries but has no crown or kingdom.', answer: '**Step 1:** Identify the key word with multiple meanings ("ruler")',
                  options: ['**Step 1:** Identify the key word with multiple meanings ("ruler")', 'serious', 'the poem is about a very poor or weak king who has lost his land'],
                  hint: 'If the student is struggling, review how to identify central ideas in simple narrative poems using.',
                  misconception: 'Students often believe that if a poem is funny or uses wordplay (like puns or riddles), it cannot have a "serious" theme.' }
          ],
            remediations: { 'if-a-poem-is-funny': { steps: ['If a student is stuck on the literal level, draw a simple picture of a "bat" (animal) and a "bat" (cricket equipment).', 'Ask: *"If I say \'The bat flew into the dark night,\' which one is it?', 'Why?"* Once they identify the animal, say: *"See?', 'Your brain did detective work using context clues.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_13', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a poem is funny or uses wordplay (like puns or riddles), it cannot have a "serious".',
          parts: [
                { id: 'a', prompt: 'A critic claims, "Wordplay poems are just silly games for children and do not have serious themes." Evaluate this statement using your knowledge of how.', answer: 'The critic\'s statement is incorrect',
                  options: ['The critic\'s statement is incorrect', 'serious'],
                  hint: 'If the student is struggling, review how to identify central ideas in simple narrative poems using.',
                  misconception: 'Students often believe that if a poem is funny or uses wordplay (like puns or riddles), it cannot have a "serious" theme.' }
          ],
            remediations: { 'if-a-poem-is-funny': { steps: ['If a student is stuck on the literal level, draw a simple picture of a "bat" (animal) and a "bat" (cricket equipment).', 'Ask: *"If I say \'The bat flew into the dark night,\' which one is it?', 'Why?"* Once they identify the animal, say: *"See?', 'Your brain did detective work using context clues.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch3_14', difficulty: 'standard',
          question: 'Rhyme and rhythm in light verse refers to the deliberate pattern of similar.',
          hint: 'If stuck, review the concept of "syllable stress" from c7_engl_ch02_012 (Class 7 rhyme.',
          misconception: 'Students often believe that identifying a rhyme scheme (e.g., labeling lines as ABABCC) is sufficient analysis of rhyme.',
          parts: [
                { id: 'a', prompt: 'Read these lines from a light verse poem: *"The owl said \'Whoo?\' with spectacles askew,* *He searched for his glasses, but they were in his stew!"* Identify.', answer: 'Rhyme scheme: AA (both lines end with "-ew" sounds: askew/stew)',
                  options: ['Rhyme scheme: AA (both lines end with "-ew" sounds: askew/stew)', 'The words \'askew\' and \'stew\' rhyme', 'identifying a rhyme scheme (e'],
                  hint: 'If stuck, review the concept of "syllable stress" from c7_engl_ch02_012 (Class 7 rhyme scheme and.',
                  misconception: 'Students often believe that identifying a rhyme scheme (e.g., labeling lines as ABABCC) is sufficient analysis of rhyme and rhythm.' },
                { id: 'b', prompt: 'Compare how rhyme and rhythm work in these two excerpts from light verse poems: *Excerpt A:* "A flea and a fly in a flue / Were trapped, so what could they.', answer: 'Excerpt B uses rhythm more effectively',
                  options: ['Excerpt B uses rhythm more effectively', 'it has more repeated sounds', 'flea/fly/flue', 'identifying a rhyme scheme (e'],
                  hint: 'If stuck, review the concept of "syllable stress" from c7_engl_ch02_012 (Class 7 rhyme scheme and.',
                  misconception: 'Students often believe that identifying a rhyme scheme (e.g., labeling lines as ABABCC) is sufficient analysis of rhyme and rhythm.' }
          ],
            remediations: { 'identifying-a-rhyme-scheme-e': { steps: ['To fix this, guide the student through a physical auditory exercise: 1) Have them tap their desk steadily while saying.', '2) Contrast this with tapping while saying "the monKEY stole the vicEROY\'s hat" (unnatural stress) to hear how wrong.', '3) Then, ask: "Where does the natural stress fall when you say this sentence conversationally?', 'Mark those beats." 4) Finally, connect it to meaning: "Does this steady iambic rhythm (da-DUM) make the monkey\'s theft.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
