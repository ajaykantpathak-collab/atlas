import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch01_p2: SimDef = {
    id: 'v3_c11_eng_h_ch01_p2',
    title: 'The Portrait of a Lady · Part 2/3',
    subtitle: 'Read the grandmother as a vanishing world, not a quirky old woman.',
    classLevel: 11, subject: 'eng_h', topic: 'The Portrait of a Lady · Part 2/3',
    chapters: ['c11_eng_h_ch01'],
    nodeIds: ['c11_eng_h_cbse_01_007', 'c11_eng_h_cbse_01_008', 'c11_eng_h_cbse_01_009', 'c11_eng_h_cbse_01_010', 'c11_eng_h_cbse_01_011', 'c11_eng_h_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader tracing a relationship across two Indias', intro: 'Village temple school to English city classroom — watch a bond dissolve not in anger but in syllabi.', goal: 'Use context and narrative phases to interpret the grandmother\'s values and the story\'s ending.' },
    discovery: {
        question: 'The narrator\'s grandmother declares music \'the monopoly of harlots and beggars.\' Is this just one old woman\'s prejudice?',
        options: ['No — it encodes a broader class attitude of her era, when professional musicians came from communities respectable families shunned', 'Yes — a purely personal quirk with no cultural basis', 'No — she objected because music distracted from prayer, nothing more', 'Yes — she simply disliked the instrument the boy played'],
        answer: 'No — it encodes a broader class attitude of her era, when professional musicians came from communities respectable families shunned',
        hook: 'She isn\'t \'backward\' — she\'s a representative figure of a vanishing world, and her silences carry a whole generation\'s rules.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, concerns, or motifs that run parallel to the primary theme in a literary text, enriching the narrative by exploring specific aspects of human experience.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the narrative into its three phases of companionship, separation and loss — then defend why the story ends with silent sparrows, not a funeral.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are listening to your grandmother recount her youth, but you are distracted by your phone — this modern disconnect mirrors the author\'s experience.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a recurring idea that supports or runs parallel to the primary theme', outcome: 'A secondary theme is a recurring idea that supports or runs parallel to the primary theme but.' },
                { text: 'less important themes', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor topics," listing events (e.g.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'secondary themes', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor topics," listing events (e.g.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are describing your own grandmother to a friend who has never met her.',
            decisions: [{ prompt: 'Identify the sensory modality (visual, auditory, tactile, olfactory, gustatory) primarily evoked by the phrase "a veritable bedlam.', options: [
                { text: '**Answer:** Auditory', outcome: '**Answer:** Auditory. **Explanation:** "Bedlam" means chaotic noise, and "chirrupings" are bird.' },
                { text: 'visual', outcome: 'Not quite — Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.', reveals: 'students-consistently-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re reading a story where a deeply religious grandmother who disapproves of music suddenly sings and beats a drum on her grandson\'s return – that\'s.',
            decisions: [{ prompt: 'What is the definition of irony in literature? Give a one-sentence definition.', options: [
                { text: 'Irony is a literary device where there is a contrast between what is expected to happen', outcome: 'Irony is a literary device where there is a contrast between what is expected to happen and what.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often confuse symbolism with mere description: they think any object mentioned in the text.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'any object mentioned in the text is a symbol', outcome: 'Not quite — Students often confuse symbolism with mere description: they think any object mentioned in the text.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the description of the grandmother\'s face as "a criss-cross of wrinkles running from everywhere to everywhere" and you encounter the.',
            decisions: [{ prompt: 'What is the primary strategy for inferring the meaning of "veritable bedlam" in the sentence: "hundreds of little birds collected round her.', options: [
                { text: 'The primary strategy is analyzing the appositive phrase "of chirrupings"', outcome: 'The primary strategy is analyzing the appositive phrase "of chirrupings" which defines "bedlam".' },
                { text: 'of chirrupings', outcome: 'Not quite — Students treat "context clues" as only the immediate sentence, ignoring the **paragraph-level.', reveals: 'students-treat-context-clues-as' },
                { text: 'bedlam', outcome: 'Not quite — Students treat "context clues" as only the immediate sentence, ignoring the **paragraph-level.', reveals: 'students-treat-context-clues-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a diary entry where the writer says, "I had finished my homework before my friend arrived." Ask yourself: why not simply "I finished"?',
            decisions: [{ prompt: 'What is the structure of the past perfect tense, and what time relationship does it express?', options: [
                { text: 'The past perfect is formed with *had* + past participle (e.g., *had known*, *had', outcome: 'The past perfect is formed with *had* + past participle (e.g., *had known*, *had finished*).' },
                { text: 'past-before-past', outcome: 'Not quite — Students often think the past perfect is merely a "more formal" past tense and use.', reveals: 'the-past-perfect-is-merely' },
                { text: 'more formal', outcome: 'Not quite — Students often think the past perfect is merely a "more formal" past tense and use.', reveals: 'the-past-perfect-is-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Start by asking the student: "When you read that the grandmother \'hobbled about the house in spotless white,\' what do you know for sure, and what can you guess.',
            decisions: [{ prompt: 'What is the definition of a literal comprehension question?', options: [
                { text: 'A literal comprehension question asks for information that is directly stated in the', outcome: 'A literal comprehension question asks for information that is directly stated in the text.' },
                { text: 'a question that asks for your opinion', outcome: 'Not quite — Students often treat any question that requires a sentence-long answer as inferential, even when.', reveals: 'students-often-treat-any-question' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school\'s heritage club is collecting elders\' memories. After reading \'The Portrait of a Lady\', a member drafts an exhibit label: \'The grandmother was simply a backward old woman who hated music and English schools — a personal quirk, nothing more.\'',
            decisions: [{ prompt: 'What\'s missing from that label?', options: [
                { text: 'Context: born around the 1880s into a pre-independence Punjabi joint-family world, her views (music associated with \'harlots and beggars\', temple school versus English motor-bus school) are the values of a specific generation — not quirks. She represents a vanishing way of life where religion, routine and community were one fabric; her silence is a tragic defence of identity, not mere backwardness.', outcome: 'Reading her through her era\'s values turns \'old-fashioned\' into a portrait of a disappearing world — exactly what context work is for.' },
                { text: 'The label is accurate — context is just summary and difficult words; judge the character on her choices alone.', outcome: 'Context isn\'t trivia: each detail (temple school, spinning wheel, sparrows) is a cultural marker; stripping them makes her a caricature instead of a representative figure.', reveals: 'context-is-just-trivia' },
                { text: 'Fix it by judging her harshly — modern readers should condemn her refusal of music outright.', outcome: 'Presentism isn\'t analysis; the text invites you to understand why those beliefs existed, which makes her estrangement moving rather than merely wrong.', reveals: 'judge-by-todays-values' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'The sparrows refusing their crumbs say what the family couldn\'t — her world mourned her in its own tongue.',
            decisions: [{ prompt: 'What comes next? The Portrait of a Lady · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Portrait of a Lady · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, concerns, or motifs that run.',
          hint: 'Review the three-phase relationship table from node 002 (Plot) and the primary theme.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor topics," listing events (e.g., "the author goes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas, concerns, or motifs that run parallel to the',
                  options: ['Secondary themes are the underlying ideas, concerns, or motifs that run parallel to the', 'Before You Read: Context and Background provides the historical, cultural, and', 'Plot and narrative structure refer to the organized sequence of events and the framework', 'Setting is the physical, temporal, and social environment in'],
                  hint: 'Review the three-phase relationship table from node 002 (Plot) and the primary theme statement from.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor topics," listing events (e.g., "the author goes to university," "the.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Have the student create a three-column table: Phase (Village/City/University) | Recurring Action/Conflict | Abstract.', 'Guide them to fill it using the text: e.g., Village: grandmother teaches prayer / City: grandmother cannot help with.', 'Ask: "What does the author *feel* in each phase?" to move from plot to theme.', 'Practice writing one theme statement using the formula: "The text explores [abstract noun] through [character\'s action].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor topics," listing events (e.g., "the author goes.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The grandmother\'s celebration with the drum and women neighbours before her death contradicts her lifelong piety and signals.', answer: 'The statement is false',
                  options: ['The statement is false', 'secondary themes', 'subplots', 'minor topics'],
                  hint: 'Review the three-phase relationship table from node 002 (Plot) and the primary theme statement from.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor topics," listing events (e.g., "the author goes to university," "the.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Have the student create a three-column table: Phase (Village/City/University) | Recurring Action/Conflict | Abstract.', 'Guide them to fill it using the text: e.g., Village: grandmother teaches prayer / City: grandmother cannot help with.', 'Ask: "What does the author *feel* in each phase?" to move from plot to theme.', 'Practice writing one theme statement using the formula: "The text explores [abstract noun] through [character\'s action].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck on identifying imagery: Re-read the first two paragraphs slowly.',
          misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.',
          parts: [
                { id: 'a', prompt: 'Identify the sensory modality (visual, auditory, tactile, olfactory, gustatory) primarily evoked by the phrase "a veritable bedlam of chirrupings" from the.', answer: '**Answer:** Auditory',
                  options: ['**Answer:** Auditory', 'visual'],
                  hint: 'If stuck on identifying imagery: Re-read the first two paragraphs slowly.',
                  misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['**Sensory Sort:** Give the student 10 quotes from the text (mix of imagery and abstract statements).', 'Have them physically sort into five sense-bins (See, Hear, Touch, Taste, Smell).', 'Discard quotes that don\'t fit any bin – those are abstract, not imagery.', '**Metaphor Surgery:** Take the metaphor "She was the winter landscape." Write "Grandmother" on left card, "Winter.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'If stuck, review the character analysis of the grandmother (node c11_eng_h_cbse_01_004).',
          misconception: 'Students often confuse symbolism with mere description: they think any object mentioned in the text is a symbol.',
          parts: [
                { id: 'a', prompt: 'In "The Portrait of a Lady," the grandmother disapproves of music lessons because she associates music with "harlots and beggars." Later, she sings and beats.', answer: 'This is situational irony',
                  options: ['This is situational irony', 'she changed her mind', 'any object mentioned in the text is a symbol'],
                  hint: 'If stuck, review the character analysis of the grandmother (node c11_eng_h_cbse_01_004) to recall.',
                  misconception: 'Students often confuse symbolism with mere description: they think any object mentioned in the text is a symbol.' },
                { id: 'b', prompt: 'Compare the two ironic moments in the story: (1) the grandmother\'s reaction to music lessons vs.', answer: 'Both ironies highlight love expressed through actions rather than words',
                  options: ['Both ironies highlight love expressed through actions rather than words', 'any object mentioned in the text is a symbol'],
                  hint: 'If stuck, review the character analysis of the grandmother (node c11_eng_h_cbse_01_004) to recall.',
                  misconception: 'Students often confuse symbolism with mere description: they think any object mentioned in the text is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If a student cannot distinguish symbols from setting details, guide them through this 3-step check: (1) Does the object.', '(2) Is it associated with a character\'s inner state or a theme?', '(3) Does it represent something abstract (e.g., faith, time, love)?', 'Apply this to the spinning wheel (yes, yes, yes) vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'If stuck on syntactic framing, review Class 10 Grammar node on "Phrases and Clauses".',
          misconception: 'Students treat "context clues" as only the immediate sentence, ignoring the **paragraph-level emotional tone** and.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for inferring the meaning of "veritable bedlam" in the sentence: "hundreds of little birds collected round her creating.', answer: 'The primary strategy is analyzing the appositive phrase "of chirrupings"',
                  options: ['The primary strategy is analyzing the appositive phrase "of chirrupings"', 'of chirrupings', 'bedlam', 'veritable'],
                  hint: 'If stuck on syntactic framing, review Class 10 Grammar node on "Phrases and Clauses".',
                  misconception: 'Students treat "context clues" as only the immediate sentence, ignoring the **paragraph-level emotional tone** and **character.' },
                { id: 'b', prompt: 'Apply the \'substitution test\' to verify your inferred meaning of "dilapidated" in "the sagging skins of the dilapidated drum." Write the sentence with your.', answer: 'Substitution: "the sagging skins of the **broken-down** drum." It fits',
                  options: ['Substitution: "the sagging skins of the **broken-down** drum." It fits', 'resignation'],
                  hint: 'If stuck on syntactic framing, review Class 10 Grammar node on "Phrases and Clauses".',
                  misconception: 'Students treat "context clues" as only the immediate sentence, ignoring the **paragraph-level emotional tone** and **character.' },
                { id: 'c', prompt: 'Compare the two uses of "take" in the text: "she took to feeding sparrows" and "she was taken ill." Analyze how the particle/preposition changes the meaning.', answer: '"Took to" (phrasal verb + gerund) means \'began a habit\'',
                  options: ['"Took to" (phrasal verb + gerund) means \'began a habit\'', 'started doing something', 'taken ill', 'resignation'],
                  hint: 'If stuck on syntactic framing, review Class 10 Grammar node on "Phrases and Clauses".',
                  misconception: 'Students treat "context clues" as only the immediate sentence, ignoring the **paragraph-level emotional tone** and **character.' }
          ],
            remediations: { 'students-treat-context-clues-as': { steps: ['**Re-read the target paragraph aloud** focusing on the narrator\'s voice: Is he fond, critical, awed?', 'Circle adjectives describing the grandmother in that paragraph.', '**Draw a \'Context Circle\'**: Write the target word in center.', 'In ring 1: immediate sentence clues (synonyms/antonyms).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how specific.',
          hint: 'Review irregular verb tables (V2 vs V3) and practice converting simple past sentences.',
          misconception: 'Students often think the past perfect is merely a "more formal" past tense and use it interchangeably with simple past.',
          parts: [
                { id: 'a', prompt: 'What is the structure of the past perfect tense, and what time relationship does it express?', answer: 'The past perfect is formed with *had* + past participle (e.g., *had known*, *had',
                  options: ['The past perfect is formed with *had* + past participle (e.g., *had known*, *had', 'past-before-past', 'more formal'],
                  hint: 'Review irregular verb tables (V2 vs V3) and practice converting simple past sentences to present.',
                  misconception: 'Students often think the past perfect is merely a "more formal" past tense and use it interchangeably with simple past.' },
                { id: 'b', prompt: 'In the sentence "Her fingers were busy telling the beads of her rosary," why does \'tell\' not mean \'to speak\' or \'to inform\'?', answer: 'Here \'tell\' means \'to count while reciting\' (sense 2 in the textbook exercise)',
                  options: ['Here \'tell\' means \'to count while reciting\' (sense 2 in the textbook exercise)', 'more formal'],
                  hint: 'Review irregular verb tables (V2 vs V3) and practice converting simple past sentences to present.',
                  misconception: 'Students often think the past perfect is merely a "more formal" past tense and use it interchangeably with simple past.' }
          ],
            remediations: { 'the-past-perfect-is-merely': { steps: ['Isolate the timeline: draw a two-event timeline (Event A earlier, Event B later) and practice converting Event A.', 'For polysemy, create a four-column table: Word | Sentence from text | Context clues | Dictionary sense.', 'Fill it for all four \'tell\' sentences and two \'take\' phrases.', 'For walking verbs, watch 30-second video clips of people hobbling, shuffling, striding, waddling, trudging, slogging.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension refers to understanding information explicitly stated.',
          hint: 'If stuck, review "Vocabulary in Context: Key Words" (c11_eng_h_cbse_01_010) and practice.',
          misconception: 'Students often treat any question that requires a sentence-long answer as inferential, even when the answer is directly.',
          parts: [
                { id: 'a', prompt: 'In the text, the author says, "She could never have been pretty; but she was always beautiful." Is this a literal or inferential statement? Explain.', answer: 'This is an inferential statement',
                  options: ['This is an inferential statement', 'literal because it\'s in the text'],
                  hint: 'If stuck, review "Vocabulary in Context: Key Words" (c11_eng_h_cbse_01_010) and practice scanning.',
                  misconception: 'Students often treat any question that requires a sentence-long answer as inferential, even when the answer is directly stated in the text.' }
          ],
            remediations: { 'students-often-treat-any-question': { steps: ['If the student cannot distinguish, use a two-column table: Column A lists questions, Column B asks "Is the answer.', 'Then explicitly label Yes as literal, No as inferential.', 'Next, for each inferential question, ask them to underline the clues in the text that led to the answer.', 'Repeat with new questions until they consistently identify the type and cite evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
