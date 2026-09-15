import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch15_p2: SimDef = {
    id: 'v3_c12_eng_k_ch15_p2',
    title: 'The Mark on the Wall (Non-fiction) · Part 2/3',
    subtitle: 'A snail-shaped thought: the essay where the plot refuses to show up',
    classLevel: 12, subject: 'eng_k', topic: 'The Mark on the Wall (Non-fiction) · Part 2/3',
    chapters: ['c12_eng_k_ch15'],
    nodeIds: ['c12_eng_k_cbse_15_007', 'c12_eng_k_cbse_15_008', 'c12_eng_k_cbse_15_009', 'c12_eng_k_cbse_15_010', 'c12_eng_k_cbse_15_011', 'c12_eng_k_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist essay reader', intro: 'One smudge on a wall detonates a whole philosophy of mind. Virginia Woolf at her freest.', goal: 'Read The Mark on the Wall as stream of consciousness — where association, not plot, is the architecture.' },
    discovery: {
        question: 'A narrator stares at a mark on the wall and thinks of Shakespeare, snails and the meaning of knowledge — for pages. Where did the plot go?',
        options: ['Nowhere — Woolf replaced events with consciousness itself; the stream of association IS the structure, not a failure of one', 'It got lost — bad writing', 'The mark is a murder mystery clue', 'It\'s a diary, not an essay'],
        answer: 'Nowhere — Woolf replaced events with consciousness itself; the stream of association IS the structure, not a failure of one',
        hook: 'Woolf believed life is \'a luminous halo,\' not a chain of episodes — so stream of consciousness isn\'t first-person rambling but the deliberate music of a mind moving. The mark, the fire, the tree are just launchpads; the real action is thought itself.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subsidiary ideas that run parallel to the primary theme, enriching the text by exploring related philosophical, social, or psychological dimensions; in "The Mark on the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_15_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Surrender the plot and follow the mind: ride one small mark through memories, mockeries of Sunday luncheons and Whitaker\'s precedency, to Woolf\'s larger question — what can anyone actually know?',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and a single post triggers a chain of thoughts — about your childhood, a news article you read, a conversation.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a modernist essay like "The Mark on the Wall" and name ONE secondary theme from the text.', options: [
                { text: 'A secondary theme is a recurring idea that supports, contrasts with, or expands the', outcome: 'A secondary theme is a recurring idea that supports, contrasts with, or expands the primary theme.' },
                { text: 'stream of consciousness', outcome: 'Not quite — Students often confuse "secondary themes" with "examples of the primary theme." For instance, they.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'the mark is a snail', outcome: 'Not quite — Students often confuse "secondary themes" with "examples of the primary theme." For instance, they.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in a quiet room and notice a tiny, unexplained mark on the wall — a nail hole? a smudge?',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from "The Mark on the Wall" (do not use the examples from the.', options: [
                { text: '**Correct answer:** Imagery is descriptive language that appeals to the senses', outcome: '**Correct answer:** Imagery is descriptive language that appeals to the senses; e.g., the auditory.' },
                { text: 'life is *like* a tube', outcome: 'Not quite — Students often treat **every comparison** in the essay as a metaphor, including similes ("like.', reveals: 'students-often-treat-every-comparison' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re staring at a tiny stain on your bedroom wall during a boring online class — your mind races from "Is that mold?" to "Maybe it\'s a secret map?".',
            decisions: [{ prompt: 'Define situational irony and give one example from "The Mark on the Wall" where the narrator\'s expectation about the mark contrasts with.', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply different from what', outcome: 'Situational irony occurs when the outcome of a situation is sharply different from what was.' },
                { text: 'It was a snail', outcome: 'Not quite — Students often treat every "twist" as irony and every recurring object as a symbol.', reveals: 'students-often-treat-every-twist' },
                { text: 'verbal irony', outcome: 'Not quite — Students often treat every "twist" as irony and every recurring object as a symbol.', reveals: 'students-often-treat-every-twist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading Woolf\'s essay and hit the phrase "the crimson flag flapping from the castle tower." You know "crimson" means red, but why *crimson* and.',
            decisions: [{ prompt: 'Define "content word" and "function word" as per the NCERT Language Work classification.', options: [
                { text: 'Content words (nouns, verbs, adjectives, adverbs, sometimes prepositions) carry definable', outcome: 'Content words (nouns, verbs, adjectives, adverbs, sometimes prepositions) carry definable lexical.' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means *finding a synonym* that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' },
                { text: '"vocabulary in context" means *finding a synonym* that fits the sentence', outcome: 'Not quite — Students believe "vocabulary in context" means *finding a synonym* that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are sending a telegram in the 1990s — you pay per word, so you write "ARRIVING TOMORROW STOP NEED PICKUP STOP". Which words did you keep?',
            decisions: [{ prompt: 'Define content words and function words. Give one example of each from the sentence: "Ants carry a blade of straw so feverishly, and then.', options: [
                { text: 'Content words: carry (verb), blade (noun), straw (noun), feverishly (adverb)', outcome: 'Content words: carry (verb), blade (noun), straw (noun), feverishly (adverb) — they carry lexical.' },
                { text: 'any word with dictionary meaning is a content word', outcome: 'Not quite — Students think any word with dictionary meaning is a content word.', reveals: 'any-word-with-dictionary-meaning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you receive a WhatsApp forward: "Mark on wall — snail?" You instantly know the literal fact (a snail) but you might wonder why the sender shared.',
            decisions: [{ prompt: 'What is the literal description of the mark on the wall as given in the opening paragraph of the essay?', options: [
                { text: 'The mark is described as a small round mark, black upon the white wall, about six or', outcome: 'The mark is described as a small round mark, black upon the white wall, about six or seven inches.' },
                { text: 'a nail hole', outcome: 'Not quite — Students often treat the narrator\'s passing fancies (e.g., the mark as a nail hole, the barrows.', reveals: 'students-often-treat-the-narrator' },
                { text: 'a snail', outcome: 'Not quite — Students often treat the narrator\'s passing fancies (e.g., the mark as a nail hole, the barrows.', reveals: 'students-often-treat-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Reviewing an experiment, the team spots an odd mark in the data and someone demands \'classify it now and move on\'.',
            decisions: [{ prompt: 'What would Woolf\'s mark on the wall suggest?', options: [
                { text: 'Sit with it first — the essay\'s whole method is resisting the reflex to label; let perception roam before deciding, because the premature category decides what you\'re allowed to see.', outcome: 'The mark turns out to be a snail — but the thinking it provoked was the real content; observation before classification is the skill.' },
                { text: 'Label it immediately — a mystery is just a task awaiting a tag.', outcome: 'That\'s the habit Woolf is unweaving: the instant category closes perception and you never see what the thing actually is.', reveals: 'label-first-perception' },
                { text: 'Skip it — if it ends up trivial like a snail, the reflection was wasted anyway.', outcome: 'Judging the process by the triviality of the answer misses that the noticing itself was the point.', reveals: 'process-equals-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read \'nothing happening\' as everything happening — modernism\'s great trade of event for consciousness. This essay rewires how you measure a text.',
            decisions: [{ prompt: 'What comes next? The Mark on the Wall (Non-fiction) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Mark on the Wall (Non-fiction) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_007', difficulty: 'standard',
          question: 'Secondary themes are the subsidiary ideas that run parallel to the primary.',
          hint: 'If unsure about the primary theme, re-read the "Stop and Think" question 2 in the NCERT.',
          misconception: 'Students often confuse "secondary themes" with "examples of the primary theme." For instance, they write: "The tree.',
          parts: [
                { id: 'a', prompt: 'Explain how the narrator\'s reflection on "three pale blue canisters of book-binding tools" and "the bird cages, the iron hoops" develops the secondary theme.', answer: 'The enumeration of lost objects',
                  options: ['The enumeration of lost objects', 'perpetual waste and repair', 'secondary themes', 'examples of the primary theme'],
                  hint: 'If unsure about the primary theme, re-read the "Stop and Think" question 2 in the NCERT text ("What.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme." For instance, they write: "The tree imagery is a secondary.' },
                { id: 'b', prompt: 'Compare the secondary theme of nature as sanctuary (the tree, the fish, the Downs) with the secondary theme of societal convention (Sunday luncheons, Table.', answer: 'Nature represents organic, unforced continuity ("trees grow',
                  options: ['Nature represents organic, unforced continuity ("trees grow', 'secondary themes', 'examples of the primary theme', 'nature as sanctuary from societal pressure'],
                  hint: 'If unsure about the primary theme, re-read the "Stop and Think" question 2 in the NCERT text ("What.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme." For instance, they write: "The tree imagery is a secondary.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student cannot separate secondary themes from primary-theme illustrations: 1) Have them list 5 distinct.', '2) For each, ask: "If this were the ONLY idea in the essay, what would the essay be about?" 3) The answers.', '4) Re-read node 006 (Primary Theme) to reconfirm the difference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "examples of the primary theme." For instance, they write: "The tree.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of gender/power (the masculine point of view governing lives, Whitaker\'s Table of Precedency) is the most politically.', answer: 'The claim is strongly supported',
                  options: ['The claim is strongly supported', 'secondary themes', 'examples of the primary theme', 'nature as sanctuary from societal pressure'],
                  hint: 'If unsure about the primary theme, re-read the "Stop and Think" question 2 in the NCERT text ("What.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme." For instance, they write: "The tree imagery is a secondary.' },
                { id: 'b', prompt: 'Create a 4-sentence "stream of consciousness" paragraph that begins with a mundane object (like a coffee stain on a desk) and branches into TWO distinct.', answer: 'The coffee stain on my desk is a small brown continent',
                  options: ['The coffee stain on my desk is a small brown continent', 'secondary themes', 'examples of the primary theme', 'nature as sanctuary from societal pressure'],
                  hint: 'If unsure about the primary theme, re-read the "Stop and Think" question 2 in the NCERT text ("What.',
                  misconception: 'Students often confuse "secondary themes" with "examples of the primary theme." For instance, they write: "The tree imagery is a secondary.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student cannot separate secondary themes from primary-theme illustrations: 1) Have them list 5 distinct.', '2) For each, ask: "If this were the ONLY idea in the essay, what would the essay be about?" 3) The answers.', '4) Re-read node 006 (Primary Theme) to reconfirm the difference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, return to c6_english_u1_005 (basic metaphor/imagery definitions) and practice.',
          misconception: 'Students often treat **every comparison** in the essay as a metaphor, including similes ("like brown paper parcels").',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor in your own words, giving one example of each from "The Mark on the Wall" (do not use the examples from the definition above).', answer: '**Correct answer:** Imagery is descriptive language that appeals to the senses',
                  options: ['**Correct answer:** Imagery is descriptive language that appeals to the senses', 'life is *like* a tube'],
                  hint: 'If stuck, return to c6_english_u1_005 (basic metaphor/imagery definitions) and practice on a single.',
                  misconception: 'Students often treat **every comparison** in the essay as a metaphor, including similes ("like brown paper parcels") and analogies ("liken.' },
                { id: 'b', prompt: 'Find two tactile images in the essay. For each, quote the phrase and explain how it contributes to the narrator’s desire for "stillness of living, breathing.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'black upon the white wall'],
                  hint: 'If stuck, return to c6_english_u1_005 (basic metaphor/imagery definitions) and practice on a single.',
                  misconception: 'Students often treat **every comparison** in the essay as a metaphor, including similes ("like brown paper parcels") and analogies ("liken.' }
          ],
            remediations: { 'students-often-treat-every-comparison': { steps: ['**Revisit device definitions**: Use c6_english_u1_005 (Poetic Devices: Metaphor, Imagery) and c11_eng_h_cbse_01_008.', '**Sensory highlighting exercise**: Take a fresh page of the essay.', 'With three coloured pens, mark visual, auditory, and tactile phrases.', 'Write the sense modality in the margin.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality, where the.',
          hint: 'If stuck, revisit c10_engl_cbse_16_008 (The Necklace irony) and c8_engl_ch4_8 (Cherry.',
          misconception: 'Students often treat every "twist" as irony and every recurring object as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony in literature is a contrast between expectation and reality, where the intended',
                  options: ['Irony in literature is a contrast between expectation and reality, where the intended', 'The "Before You Read: Context and Background" section provides essential biographical,', 'In "The Mark on the Wall," plot refers not to a sequence of external events but to the', 'Setting and atmosphere in "The Mark on the Wall" refer to the physical environment (a'],
                  hint: 'If stuck, revisit c10_engl_cbse_16_008 (The Necklace irony) and c8_engl_ch4_8 (Cherry Tree.',
                  misconception: 'Students often treat every "twist" as irony and every recurring object as a symbol.' }
          ],
            remediations: { 'students-often-treat-every-twist': { steps: ['If a student cannot distinguish irony types or identify valid symbols: (1) Have them re-read the "Stop and Think".', '141, 144) — these are designed to guide exactly this analysis.', '(2) Use a two-column table: Column A = narrator\'s speculation (nail, rose-leaf, tomb); Column B = textual evidence.', '(3) For symbols, trace *only* the tree, fish, and Table of Precedency across 3+ paragraphs each, noting how each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck on content/function classification, review NCERT p. 146-147 "Language Work.',
          misconception: 'Students believe "vocabulary in context" means *finding a synonym* that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'In the sentence "The mark was a small round mark, black upon the white wall, about six or seven inches above the mantelpiece," explain why "round" and "black".', answer: '"Round" and "black" are adjectives describing inherent qualities of the mark',
                  options: ['"Round" and "black" are adjectives describing inherent qualities of the mark', 'vocabulary in context', '"vocabulary in context" means *finding a synonym* that fits the sentence'],
                  hint: 'If stuck on content/function classification, review NCERT p. 146-147 "Language Work: Content Words.',
                  misconception: 'Students believe "vocabulary in context" means *finding a synonym* that fits the sentence.' },
                { id: 'b', prompt: 'Analyze the word "asphodel" in the passage: "Tumbling head over heels in the asphodel meadows like brown paper parcels..." How does its classical allusion.', answer: '"Asphodel" evokes Homer\'s *Odyssey* (fields where dead souls wander)',
                  options: ['"Asphodel" evokes Homer\'s *Odyssey* (fields where dead souls wander)', 'vocabulary in context', '"vocabulary in context" means *finding a synonym* that fits the sentence'],
                  hint: 'If stuck on content/function classification, review NCERT p. 146-147 "Language Work: Content Words.',
                  misconception: 'Students believe "vocabulary in context" means *finding a synonym* that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['If a student substitutes synonyms instead of analyzing connotation: 1) Have them re-read the "Language Work" section.', '146-147) on content/function words.', '2) Give them three sentences from the essay with a key word bolded.', '3) Ask: "What *associations* (historical, sensory, emotional) does this word carry that its nearest synonym *does.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_011', difficulty: 'standard',
          question: 'Content words (nouns, verbs, adjectives, adverbs, and sometimes prepositions).',
          hint: 'If stuck, review the parts-of-speech chart from Class 6–8 (nodes c6_english_u1_008.',
          misconception: 'Students think any word with dictionary meaning is a content word.',
          parts: [
                { id: 'a', prompt: 'Define content words and function words. Give one example of each from the sentence: "Ants carry a blade of straw so feverishly, and then leave it."', answer: 'Content words: carry (verb), blade (noun), straw (noun), feverishly (adverb)',
                  options: ['Content words: carry (verb), blade (noun), straw (noun), feverishly (adverb)', 'any word with dictionary meaning is a content word'],
                  hint: 'If stuck, review the parts-of-speech chart from Class 6–8 (nodes c6_english_u1_008.',
                  misconception: 'Students think any word with dictionary meaning is a content word.' },
                { id: 'b', prompt: 'Compare the two sentences: (a) "How readily our thoughts swarm upon a new object!" (b) "Our thoughts swarm upon a new object so readily!" Identify the.', answer: 'In (b), "so" is an intensifier modifying "readily"',
                  options: ['In (b), "so" is an intensifier modifying "readily"', 'any word with dictionary meaning is a content word'],
                  hint: 'If stuck, review the parts-of-speech chart from Class 6–8 (nodes c6_english_u1_008.',
                  misconception: 'Students think any word with dictionary meaning is a content word.' }
          ],
            remediations: { 'any-word-with-dictionary-meaning': { steps: ['Revisit the telegram test: write a full sentence, then cross out words until only the "essential" meaning remains.', 'The crossed-out words are function words.', 'Memorise the closed-class list: pronouns (I, you, he, she, it, we, they, this, that, etc.), determiners (a, an, the.', 'Practice with the five NCERT task sentences, checking each word against the list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'If unable to separate observation from speculation, revisit the first three paragraphs.',
          misconception: 'Students often treat the narrator\'s passing fancies (e.g., the mark as a nail hole, the barrows as tombs, Shakespeare.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require retrieving explicitly stated information from the',
                  options: ['Literal comprehension questions require retrieving explicitly stated information from the', 'The "Before You Read: Context and Background" section provides essential biographical,', 'In "The Mark on the Wall," plot refers not to a sequence of external events but to the', 'Setting and atmosphere in "The Mark on the Wall" refer to the physical environment (a'],
                  hint: 'If unable to separate observation from speculation, revisit the first three paragraphs and practice.',
                  misconception: 'Students often treat the narrator\'s passing fancies (e.g., the mark as a nail hole, the barrows as tombs, Shakespeare leaning by the fire).' }
          ],
            remediations: { 'students-often-treat-the-narrator': { steps: ['Have the student reread the first three paragraphs and highlight every verb phrase that signals speculation ("I think".', 'Ask them to list only the sentences that describe physical actions in the present moment (e.g., "I looked up", "I was.', 'Compare the two lists: the first are mental simulations, the second are literal facts.', 'Re-attempt Diagnostic Question 1 and 2, explicitly labeling each answer as "literal observation" or "narrator\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
