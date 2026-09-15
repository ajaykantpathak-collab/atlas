import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch07_p2: SimDef = {
    id: 'v3_c11_eng_w_ch07_p2',
    title: 'Glory at Twilight (Short Story) · Part 2/3',
    subtitle: 'Watch a fallen banker\'s borrowed glory spend itself to the last rupee.',
    classLevel: 11, subject: 'eng_w', topic: 'Glory at Twilight (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch07'],
    nodeIds: ['c11_eng_w_cbse_07_007', 'c11_eng_w_cbse_07_008', 'c11_eng_w_cbse_07_009', 'c11_eng_w_cbse_07_010', 'c11_eng_w_cbse_07_011', 'c11_eng_w_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a reputation burn like a twilight sky', intro: 'A narrow-gauge train making unauthorised stops, a collapsed bank, and a village still expecting benediction in cash.', goal: 'Distinguish frame from flashback and locate the narrative climax of a non-linear story.' },
    discovery: {
        question: 'Satyajit\'s bank has already collapsed when the story opens on a slow train — so where can the climax possibly be?',
        options: ['At the wedding — when he signs away his house and pond for a stranger\'s dowry, the last of the glory spent', 'In the bank collapse itself, told in flashback', 'On the train, when he asks \'What now?\'', 'At the fig tree, where he finally rests'],
        answer: 'At the wedding — when he signs away his house and pond for a stranger\'s dowry, the last of the glory spent',
        hook: 'Chronological climax and narrative climax are different events — the story peaks where the pretending becomes impossible to afford.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate ideas or messages in a literary work that support, complicate, or run parallel to the primary theme, often revealed through subplots, character interactions,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the train frame from the flashbacks, order the narrative versus chronological events, and place the deed-signing as the true climax.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you have just finished reading "Glory at Twilight" and your teacher asks, "Besides the obvious story of a rich man becoming poor, what else is this.',
            decisions: [{ prompt: 'List two secondary themes present in "Glory at Twilight" besides the primary theme of the fall from glory.', options: [
                { text: 'Two secondary themes are: (1) Social hypocrisy and transactional relationships, evident', outcome: 'Two secondary themes are: (1) Social hypocrisy and transactional relationships, evident in the.' },
                { text: 'Satyajit\'s poverty', outcome: 'Not quite — Students often think secondary themes are just "less important" themes or merely subplots like the.', reveals: 'secondary-themes-are-just-less' },
                { text: 'the wedding', outcome: 'Not quite — Students often think secondary themes are just "less important" themes or merely subplots like the.', reveals: 'secondary-themes-are-just-less' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in the examination hall and the question asks: "How does Bhattacharya use the metaphor of the \'wheel of fortune\' to reveal Satyajit\'s.',
            decisions: [{ prompt: 'Define "organic imagery" and give one example from the story that illustrates it.', options: [
                { text: 'Organic imagery describes internal bodily sensations (hunger, thirst, fatigue, nausea,', outcome: 'Organic imagery describes internal bodily sensations (hunger, thirst, fatigue, nausea, heartbeat).' },
                { text: 'green fields', outcome: 'Not quite — Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The.', reveals: 'students-often-treat-imagery-and' },
                { text: 'it creates a nice image', outcome: 'Not quite — Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are watching a film where a character confidently declares "I\'ve never been happier!" while tears stream down their face—you instantly sense the.',
            decisions: [{ prompt: 'Define situational irony and give one example from "Glory at Twilight" where the outcome of an action is the opposite of what the character.', options: [
                { text: 'Situational irony occurs when the result of an action is contrary to the intended or', outcome: 'Situational irony occurs when the result of an action is contrary to the intended or expected.' },
                { text: 'It\'s ironic that the train stopped', outcome: 'Not quite — Students often confuse irony with coincidence or bad luck (e.g., "It\'s ironic that the train.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a novel and suddenly the sentences become choppy, adjectives pile up before a noun, and characters speak in phrases like "life-spark.',
            decisions: [{ prompt: 'Define "adjective padding" in narrative description and give one example from the story where physical traits are linked to mental.', options: [
                { text: 'Adjective padding is the accumulation of multiple adjectives or participial phrases', outcome: 'Adjective padding is the accumulation of multiple adjectives or participial phrases before or after.' },
                { text: 'A wrong answer that merely lists adjectives (', outcome: 'Not quite — Students treat "language usage" as a hunt for figures of speech (simile, metaphor) only.', reveals: 'students-treat-language-usage-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a post-colonial fiction unit your group reads Bhabani Bhattacharya\'s \'Glory at Twilight\'. A member pitches it as \'a nostalgic story about a man remembering his glorious student days — basically a feel-good memory piece about an old Bengali village\'.',
            decisions: [{ prompt: 'What context makes the story bite rather than glow?', options: [
                { text: 'Post-independence rural Bengal\'s collapse: indigenous banking has crumbled, dowry burdens crush families, and the protagonist\'s remembered \'glory\' is set against present decline — the twilight is a civilisational dusk, not a warm sunset. The nostalgia is measuring what\'s been lost, not celebrating what was.', outcome: 'Context supplies the irony: memory\'s brightness is the yardstick for present decay — read it as feel-good and the critique evaporates.' },
                { text: 'The pitch is right — memory pieces are about warmth; social conditions are backdrop.', outcome: 'The story\'s engine is contrast: old prestige versus new precarity; without the collapse of rural economy and dowry pressure, \'glory\' has nothing to fade against.', reveals: 'memory-piece-is-feel-good' },
                { text: 'It\'s a village-idyll essay — rural Bengal as timeless, untouched paradise.', outcome: 'Bhattacharya writes the opposite: the village is being unmade by post-independence economic change; \'timeless idyll\' is the fantasy the story punctures.', reveals: 'village-as-idyll' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'The village worships a success that was born from a forger\'s crime and dies at a dowry table — the flashbacks make both ironies visible at once.',
            decisions: [{ prompt: 'What comes next? Glory at Twilight (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Glory at Twilight (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate ideas or messages in a literary work that.',
          hint: 'Review the "Theme: Primary Theme and Message" node (c11_eng_w_cbse_07_006) and re-read.',
          misconception: 'Students often think secondary themes are just "less important" themes or merely subplots like the wedding or the train.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the subordinate ideas or messages in a literary work that support,',
                  options: ['Secondary themes are the subordinate ideas or messages in a literary work that support,', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review the "Theme: Primary Theme and Message" node (c11_eng_w_cbse_07_006) and re-read the story.',
                  misconception: 'Students often think secondary themes are just "less important" themes or merely subplots like the wedding or the train journey.' }
          ],
            remediations: { 'secondary-themes-are-just-less': { steps: ['If a student cannot distinguish plot from theme, have them complete a two-column table: Column A — "What happens?".', 'Column B — "What idea does this represent?" (themes: escape from reality, social performance, predatory lending, moral.', 'Do this for five plot points.', 'Then ask them to group Column B entries into 3-4 abstract nouns (e.g., hypocrisy, exploitation, pride, vulnerability).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think secondary themes are just "less important" themes or merely subplots like the wedding or the train.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The secondary theme of gendered vulnerability (Beena, Satyajit\'s wife, the forgerer\'s wife) is essential to the story\'s critique.', answer: 'The statement is defensible',
                  options: ['The statement is defensible', 'women are not main characters so the theme isn\'t important', 'less important'],
                  hint: 'Review the "Theme: Primary Theme and Message" node (c11_eng_w_cbse_07_006) and re-read the story.',
                  misconception: 'Students often think secondary themes are just "less important" themes or merely subplots like the wedding or the train journey.' }
          ],
            remediations: { 'secondary-themes-are-just-less': { steps: ['If a student cannot distinguish plot from theme, have them complete a two-column table: Column A — "What happens?".', 'Column B — "What idea does this represent?" (themes: escape from reality, social performance, predatory lending, moral.', 'Do this for five plot points.', 'Then ask them to group Column B entries into 3-4 abstract nouns (e.g., hypocrisy, exploitation, pride, vulnerability).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, revisit c10_engl_cbse_03_007 (Symbolism: Flight as a Metaphor) and.',
          misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The author uses imagery.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between a *simple metaphor* and an *extended metaphor* using examples from the text.', answer: 'A simple metaphor appears once ("Glory was dead")',
                  options: ['A simple metaphor appears once ("Glory was dead")', 'it creates a nice image', 'it maps the cyclical nature of fate onto Satyajit\'s career'],
                  hint: 'If stuck, revisit c10_engl_cbse_03_007 (Symbolism: Flight as a Metaphor) and c8_engl_ch4_7 (Imagery.',
                  misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The author uses imagery like \'wheel.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['Have the student make a two-column table: Column A = "Pure Imagery (no comparison)" — find 3 examples from the story.', 'Column B = "Metaphor (A is B)" — find 3 (e.g., "wheel of fortune", "snare of benediction", "twilight splendour").', 'For each Column B entry, explicitly state: Tenor = _____, Vehicle = _____, Ground (shared quality) = _____.', 'Rewrite one analytical sentence for each using the template: "The metaphor [vehicle] maps [ground] onto [tenor].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'If stuck, re-read the "Understanding the Text" questions 1(a)–(f) in the NCERT.',
          misconception: 'Students often confuse irony with coincidence or bad luck (e.g., "It\'s ironic that the train stopped" – no, that\'s just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality,',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality,', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, re-read the "Understanding the Text" questions 1(a)–(f) in the NCERT textbook—they.',
                  misconception: 'Students often confuse irony with coincidence or bad luck (e.g., "It\'s ironic that the train stopped" – no, that\'s just plot convenience).' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the story marking every moment where a character\'s belief or statement is contradicted by the reader\'s.', 'List all objects that appear in at least two distinct scenes; for each, write the literal role and the abstract idea.', 'Discard objects that do not shift meaning or connect to the theme of glory/shame/identity.', 'Practice writing one PEEL paragraph per irony type and per major symbol using the template: Point (device + location).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_010', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the meaning of unfamiliar.',
          hint: 'Review the four context-clue types with simple sentences (e.g., \'The arid land, dry and.',
          misconception: 'Students often believe \'queer\' in \'queer rhythmic frenzy\' carries its modern slang meaning related to sexual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context is the skill of determining the meaning of unfamiliar words or',
                  options: ['Vocabulary in context is the skill of determining the meaning of unfamiliar words or', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review the four context-clue types with simple sentences (e.g., \'The arid land, dry and barren.',
                  misconception: 'Students often believe \'queer\' in \'queer rhythmic frenzy\' carries its modern slang meaning related to sexual orientation, leading them.' }
          ],
            remediations: { 'queer-in-queer-rhythmic-frenzy': { steps: ['Have the student re-read the specific paragraph (the forgerer scene) aloud, emphasizing the words \'tears rolling down\'.', 'Ask: \'What is the man\'s emotional state?', 'Does "queer" describe the emotion or the movement?\' 3.', 'Provide a mini-lesson on semantic change: list words that have shifted meaning (e.g., \'gay\', \'awful\', \'nice\') and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the deliberate grammatical and stylistic.',
          hint: 'Review Class 6 Sentence Structure (c6_english_u4_038) for fragment vs.',
          misconception: 'Students treat "language usage" as a hunt for figures of speech (simile, metaphor) only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the deliberate grammatical and stylistic choices an',
                  options: ['Language Usage in the Text refers to the deliberate grammatical and stylistic choices an', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review Class 6 Sentence Structure (c6_english_u4_038) for fragment vs.',
                  misconception: 'Students treat "language usage" as a hunt for figures of speech (simile, metaphor) only.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['Give the student three sentences from the story—one complete, one fragment, one adjective-heavy—and ask them to read.', 'Have them rewrite the fragment as a full sentence and the padded version as a simple sentence; compare aloud again.', 'Explicitly label the lost effects: "The fragment loses the gasp between thoughts; the simple sentence loses the layered.', 'Assign a mini-task: convert a diary entry of their own into fragment-heavy interior monologue to internalise the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review the plot summary (c11_eng_w_cbse_07_002) and protagonist analysis.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any answer is valid if they can argue for it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require answers directly stated in the text, while',
                  options: ['Literal comprehension questions require answers directly stated in the text, while', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review the plot summary (c11_eng_w_cbse_07_002) and protagonist analysis.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any answer is valid if they can argue for it.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student makes this error, follow these steps: 1) Have them re-read the exact paragraph where the event occurs.', '2) Ask: "Which sentences show Satyajit\'s thoughts or feelings at that moment?" 3) Require them to write the inference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
