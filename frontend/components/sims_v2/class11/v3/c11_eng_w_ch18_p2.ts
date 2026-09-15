import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch18_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch18_p2: SimDef = {
    id: 'v3_c11_eng_w_ch18_p2',
    title: 'Felling of the Banyan Tree (Poem) · Part 2/3',
    subtitle: 'Watch two hundred years come down in seven days — and keep growing in a dream.',
    classLevel: 11, subject: 'eng_w', topic: 'Felling of the Banyan Tree (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch18'],
    nodeIds: ['c11_eng_w_cbse_18_007', 'c11_eng_w_cbse_18_008', 'c11_eng_w_cbse_18_009', 'c11_eng_w_cbse_18_010', 'c11_eng_w_cbse_18_011', 'c11_eng_w_cbse_18_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a child watching the family banyan come down', intro: 'Sacred tree, developer\'s logic, fifty men with axes — and a boy who carries the stump to Bombay in his sleep.', goal: 'Analyse the poem\'s engineered narrative time and its unresolved ending.' },
    discovery: {
        question: 'The tree\'s seven-day felling sprawls across line after line, while its two hundred years of life compress into a single phrase: \'the rings of two hundred years.\' Why engineer time that way?',
        options: ['To make the killing feel interminable and the lost life feel instantaneous — the pace itself is the grief', 'To keep the poem short for exams', 'Because seven days is poetically harder to say than two centuries', 'No reason — narrative pacing is accidental here'],
        answer: 'To make the killing feel interminable and the lost life feel instantaneous — the pace itself is the grief',
        hook: 'The grandmother says \'trees are sacred\'; the father \'massacred them all\' — the poem lets both be true, and makes you watch the saw do it slowly.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement the primary theme, adding layers of meaning and complexity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_18_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Label the stages of a felling — order, warning, seven days of sawing, fifty men, revealed rings — then test the ending where the tree \'grows and seethes in one\'s dreams.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are standing in a metro station in Mumbai, watching thousands of people rush past concrete pillars—where a banyan tree once stood.',
            decisions: [{ prompt: 'List two secondary themes in "Felling of the Banyan Tree" other than environmental destruction.', options: [
                { text: 'Correct answer: Any two of: (1) Conflict between tradition and modernity (grandmother\'s', outcome: 'Correct answer: Any two of: (1) Conflict between tradition and modernity (grandmother\'s sacred view.' },
                { text: 'love for trees', outcome: 'Not quite — Students often treat secondary themes as a checklist of "topics mentioned in the poem" (e.g.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'father\'s authority', outcome: 'Not quite — Students often treat secondary themes as a checklist of "topics mentioned in the poem" (e.g.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing on that hill in Baroda, hearing the saws bite into the banyan\'s branches for seven days. The poem makes you *feel* that violence.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from everyday language (not from the poem).', options: [
                { text: '**Correct Answer:** Imagery is descriptive language appealing to the senses (e.g., "the', outcome: '**Correct Answer:** Imagery is descriptive language appealing to the senses (e.g., "the acrid smell.' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — Students often treat imagery as mere "decoration" and metaphor as a "fancy synonym".', reveals: 'students-often-treat-imagery-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re standing in a Mumbai high-rise, hearing your grandmother describe a banyan tree that once shaded your ancestral home in Baroda — a tree your.',
            decisions: [{ prompt: 'Define situational irony and give one example from the poem where the outcome of an action is the opposite of what was intended or expected.', options: [
                { text: 'Situational irony occurs when actions produce an outcome contrary to what was intended or', outcome: 'Situational irony occurs when actions produce an outcome contrary to what was intended or logically.' },
                { text: 'the tree was big so it was hard to cut', outcome: 'Not quite — Students often conflate *symbolism* with *metaphor*, treating the banyan tree as a mere comparison.', reveals: 'students-often-conflate-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the poem and encounter the word "scraggy" describing the banyan\'s roots.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a poem when a dictionary is not available?', options: [
                { text: 'The primary strategy is contextual inference: using surrounding words, imagery, tone, and', outcome: 'The primary strategy is contextual inference: using surrounding words, imagery, tone, and.' },
                { text: 'guess randomly', outcome: 'Not quite — Students believe vocabulary in context means finding a single dictionary synonym that fits the.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'skip the word', outcome: 'Not quite — Students believe vocabulary in context means finding a single dictionary synonym that fits the.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are watching a video of a tree being cut down — the camera zooms in on the axe, then pans to the falling leaves, then shows the rings of the trunk.',
            decisions: [{ prompt: 'Identify the tense of the verb phrase "used to say" in the line "Trees are sacred my grandmother used to say" and state its grammatical.', options: [
                { text: 'The verb phrase "used to say" is in the **past habitual** aspect (often called', outcome: 'The verb phrase "used to say" is in the **past habitual** aspect (often called "semi-modal used to".' },
                { text: 'simple past', outcome: 'Not quite — Students often think "analyzing language usage" means **labeling parts of speech** (e.g., "this.', reveals: 'analyzing-language-usage-means-labeling' },
                { text: 'analyzing language usage', outcome: 'Not quite — Students often think "analyzing language usage" means **labeling parts of speech** (e.g., "this.', reveals: 'analyzing-language-usage-means-labeling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in an exam hall and the first question asks: "What was the circumference of the banyan tree\'s trunk?" You can point to the exact line.',
            decisions: [{ prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal comprehension question asks for information explicitly stated in the text', outcome: 'A literal comprehension question asks for information explicitly stated in the text (e.g., "How.' },
                { text: 'questions about the text', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal interpretation.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your colony\'s oldest banyan is marked for felling to widen a road. At a residents\' meeting you read Chitre\'s \'Felling of the Banyan Tree\'. A neighbour shrugs: \'It\'s just a poem about chopping a tree — sentimental green stuff.\'',
            decisions: [{ prompt: 'What do you say the poem is actually about?', options: [
                { text: 'Read it as an elegy for a worldview: the banyan is sacred in Indian tradition, a community shelter, an ecological keystone — and its felling, ordered by the father over the grandmother\'s warning, enacts the violence of replacing roots with concrete. The family moves to Bombay where the only tree left \'grows and seethes in one\'s dreams\'; the personal migration mirrors millions. Structure enacts it: seven days of sawing stretch unbearably while two hundred years of rings compress into one phrase.', outcome: 'The poem stops being \'green sentiment\' and becomes what it is — memory, displacement, and a way of life where nature was kin, not resource.' },
                { text: 'Concede it\'s a simple chronological report — father orders, men saw, tree falls, family moves.', outcome: 'That misses the engineered narrative time: the sawing is stretched across enjambed lines to feel interminable while the tree\'s 200-year life is compressed — the pacing is the meaning.', reveals: 'felling-is-chronological-report' },
                { text: 'Offer it as an anti-development poem — the father is the villain who kills a sacred tree.', outcome: 'Blaming one man flattens it: the felling stands for an era\'s migration from green Baroda to concrete Bombay — the tragedy is systemic, not personal villainy.', reveals: 'father-is-the-villain' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_18_012', title: 'The bigger picture',
          caseStudy: { intro: 'The banyan is felled in Baroda and replanted as a nightmare in Bombay — the past tense ends, the present tense seethes.',
            decisions: [{ prompt: 'What comes next? Felling of the Banyan Tree (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Felling of the Banyan Tree (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'If stuck, review node 006 (Primary Theme) to re-anchor the central argument, then re-read.',
          misconception: 'Students often treat secondary themes as a checklist of "topics mentioned in the poem" (e.g., "family," "dreams,".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the line "Trees are sacred my grandmother used to say" functions as more than just a character detail—what secondary theme does.', answer: 'Correct answer: This line introduces the secondary theme of tradition vs',
                  options: ['Correct answer: This line introduces the secondary theme of tradition vs', 'it shows the grandmother loved trees'],
                  hint: 'If stuck, review node 006 (Primary Theme) to re-anchor the central argument, then re-read the poem.',
                  misconception: 'Students often treat secondary themes as a checklist of "topics mentioned in the poem" (e.g., "family," "dreams," "history") rather than.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists topics instead of themes: (1) Ask: "What *argument* does the poem make about this topic?', 'Complete: \'The poem suggests that family...\'" (2) Have them trace one topic (e.g., dreams) across three stanzas, noting.', '(3) Require them to write one thematic statement per topic using the template: "Through [topic], the poem reveals that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the definitions and function of imagery and metaphor in Class 10 poetry analysis.',
          misconception: 'Students often treat imagery as mere "decoration" and metaphor as a "fancy synonym".',
          parts: [
                { id: 'a', prompt: 'Identify a metaphor in the poem (not a simile). State the tenor and the vehicle, then explain what quality is transferred.', answer: '**Correct Answer:** Metaphor: "raw mythology revealed to us its age"',
                  options: ['**Correct Answer:** Metaphor: "raw mythology revealed to us its age"', 'stood like a problem'],
                  hint: 'Review the definitions and function of imagery and metaphor in Class 10 poetry analysis.',
                  misconception: 'Students often treat imagery as mere "decoration" and metaphor as a "fancy synonym".' },
                { id: 'b', prompt: 'Compare the imagery used for the banyan tree with that used for the other trees (sheoga, oudumber, neem).', answer: '**Correct Answer:** The other trees are listed only by name in a single line',
                  options: ['**Correct Answer:** The other trees are listed only by name in a single line', 'the banyan is described more'],
                  hint: 'Review the definitions and function of imagery and metaphor in Class 10 poetry analysis.',
                  misconception: 'Students often treat imagery as mere "decoration" and metaphor as a "fancy synonym".' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Give the student three isolated sentences: one with only visual imagery, one with tactile+olfactory, one with a clear.', 'Ask them to label the senses and the tenor/vehicle.', 'Have them complete a two-column table: Column A = "Quoted Phrase", Column B = "Sense(s) Targeted + Effect on Reader".', 'Ask them to rewrite their earlier "beautiful/old" answer using the sentence stem: "By comparing the tree\'s rings.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat imagery as mere "decoration" and metaphor as a "fancy synonym".',
          parts: [
                { id: 'a', prompt: 'Which metaphor in the poem more powerfully conveys the theme of irreversible loss: "raw mythology" or "grows and seethes in one\'s dreams"?', answer: '**Correct Answer:** "Grows and seethes in one\'s dreams" is more powerful',
                  options: ['**Correct Answer:** "Grows and seethes in one\'s dreams" is more powerful', 'raw mythology'],
                  hint: 'Review the definitions and function of imagery and metaphor in Class 10 poetry analysis.',
                  misconception: 'Students often treat imagery as mere "decoration" and metaphor as a "fancy synonym".' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Give the student three isolated sentences: one with only visual imagery, one with tactile+olfactory, one with a clear.', 'Ask them to label the senses and the tenor/vehicle.', 'Have them complete a two-column table: Column A = "Quoted Phrase", Column B = "Sense(s) Targeted + Effect on Reader".', 'Ask them to rewrite their earlier "beautiful/old" answer using the sentence stem: "By comparing the tree\'s rings.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review c11_eng_w_cbse_18_008 (imagery/metaphor) for the literal/figurative.',
          misconception: 'Students often conflate *symbolism* with *metaphor*, treating the banyan tree as a mere comparison ("the tree is like.',
          parts: [
                { id: 'a', prompt: 'Identify the symbolism of the "aerial roots / Looking for the ground to strike" in the final lines.', answer: 'The aerial roots symbolize the banyan\'s regenerative persistence',
                  options: ['The aerial roots symbolize the banyan\'s regenerative persistence', 'memories', 'strike'],
                  hint: 'If stuck, review c11_eng_w_cbse_18_008 (imagery/metaphor) for the literal/figurative boundary, and.',
                  misconception: 'Students often conflate *symbolism* with *metaphor*, treating the banyan tree as a mere comparison ("the tree is like history") rather than.' },
                { id: 'b', prompt: 'Analyze how the banyan tree\'s "rings of two hundred years" function as a symbol that simultaneously operates at three levels: personal, historical, and.', answer: 'The rings symbolize: (1) Personal',
                  options: ['The rings symbolize: (1) Personal', 'it shows the tree was old'],
                  hint: 'If stuck, review c11_eng_w_cbse_18_008 (imagery/metaphor) for the literal/figurative boundary, and.',
                  misconception: 'Students often conflate *symbolism* with *metaphor*, treating the banyan tree as a mere comparison ("the tree is like history") rather than.' }
          ],
            remediations: { 'students-often-conflate-symbolism-with': { steps: ['If a student cannot distinguish symbolism from metaphor, have them list five physical details of the banyan tree from.', 'Then ask: "Which of these *is* the history/ecology/memory, and which *represents* it?" Guide them to see the rings.', 'For irony, give a three-column table: Expectation (grandmother\'s words, tree\'s resilience, speaker\'s safety) | Reality.', 'Have them fill it using only poem phrases.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_010', difficulty: 'standard',
          question: 'Vocabulary in context refers to the skill of determining the meaning.',
          hint: 'If stuck, review "Imagery and Metaphor" (c11_eng_w_cbse_18_008) to practice spotting.',
          misconception: 'Students believe vocabulary in context means finding a single dictionary synonym that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context refers to the skill of determining the meaning, connotation, and',
                  options: ['Vocabulary in context refers to the skill of determining the meaning, connotation, and', 'Context and background for "Felling of the Banyan Tree" involves understanding the poet', 'Plot and Narrative Structure in a narrative poem refers to the organized sequence of', 'Setting in poetry refers to the time, place, and cultural context in'],
                  hint: 'If stuck, review "Imagery and Metaphor" (c11_eng_w_cbse_18_008) to practice spotting visual clues.',
                  misconception: 'Students believe vocabulary in context means finding a single dictionary synonym that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['If a student defaults to dictionary definitions, have them: (1) reread the stanza aloud, noting images and sounds; (2).', 'Repeat with three poem words.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_011', difficulty: 'standard',
          question: 'Language usage in a literary text refers to the deliberate grammatical.',
          hint: 'If stuck, review "Finite vs Non-finite Verbs" and "Tense vs Aspect" from Class 10 grammar.',
          misconception: 'Students often think "analyzing language usage" means **labeling parts of speech** (e.g., "this is a verb, this is.',
          parts: [
                { id: 'a', prompt: 'Identify the tense of the verb phrase "used to say" in the line "Trees are sacred my grandmother used to say" and state its grammatical name.', answer: 'The verb phrase "used to say" is in the **past habitual** aspect (often called',
                  options: ['The verb phrase "used to say" is in the **past habitual** aspect (often called', 'simple past', 'analyzing language usage', 'this is a verb, this is an adjective'],
                  hint: 'If stuck, review "Finite vs Non-finite Verbs" and "Tense vs Aspect" from Class 10 grammar.',
                  misconception: 'Students often think "analyzing language usage" means **labeling parts of speech** (e.g., "this is a verb, this is an adjective").' }
          ],
            remediations: { 'analyzing-language-usage-means-labeling': { steps: ['**Re-teach the "Grammar as Camera" metaphor**: Show two photos of the same event — one wide shot (active voice, "Father.', 'Ask: "Which grammar matches which photo?" 2.', '**Color-code the poem**: Verbs in red (past), blue (present), green (participles).', 'Physically see the patterns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_18_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review node 18_002 (Plot and Narrative Structure) to re-establish the sequence.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any personal interpretation is acceptable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require answers directly stated in the text, while',
                  options: ['Literal comprehension questions require answers directly stated in the text, while', 'Context and background for "Felling of the Banyan Tree" involves understanding the poet', 'Plot and Narrative Structure in a narrative poem refers to the organized sequence of', 'Setting in poetry refers to the time, place, and cultural context in'],
                  hint: 'If stuck, review node 18_002 (Plot and Narrative Structure) to re-establish the sequence of events.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any personal interpretation is acceptable.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student cannot distinguish literal from inferential, use a two-column sorting activity: write 5 questions from the.', '"Why did the insects and birds leave?").', 'Have the student sort them into "Answer in the text" and "Answer from clues." Then, for each inferential question.', '2) Find two related details in the poem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
