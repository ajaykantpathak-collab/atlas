import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch22_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch22_p2: SimDef = {
    id: 'v3_c11_eng_w_ch22_p2',
    title: 'Tribal Verse (Essay) · Part 2/3',
    subtitle: 'Defend a literature with no script, no author and centuries of memory.',
    classLevel: 11, subject: 'eng_w', topic: 'Tribal Verse (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch22'],
    nodeIds: ['c11_eng_w_cbse_22_007', 'c11_eng_w_cbse_22_008', 'c11_eng_w_cbse_22_009', 'c11_eng_w_cbse_22_010', 'c11_eng_w_cbse_22_011', 'c11_eng_w_cbse_22_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a literature student arguing orality counts', intro: 'A Munda song, a Kondh song, an Adi song — none ever written down, all carried for centuries. Decide if that disqualifies them.', goal: 'Evaluate orality as literature and analyse the essay\'s inductive structure.' },
    discovery: {
        question: '\'Tribal songs are just folklore — no fixed form, no real authorship, no depth.\' Devy\'s counterargument?',
        options: ['Oral literatures run on strict conventions passed through performance — and every written literature still carries layers of orality', 'Correct — without a script there can be no literature', 'Correct — anonymity means no aesthetic intent exists', 'Partly — they only gain depth once translated into print'],
        answer: 'Oral literatures run on strict conventions passed through performance — and every written literature still carries layers of orality',
        hook: 'The bias is print\'s, not the songs\' — a living library carried in voice and memory is still literature, just one our syllabus forgot.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, complementary ideas that run alongside the primary theme in a text, enriching its meaning by exploring related human experiences, tensions, or philosophical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_22_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the three tribal songs as evidence, then the \'Painted Words\' theory — and explain why the argument puts examples before analysis.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re listening to a grandparent reflect on their life: they speak of love, career, and regrets — but underneath, you sense themes of sacrifice, the.',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes a secondary theme from the primary theme in a literary essay?', options: [
                { text: 'A secondary theme complements and enriches the primary theme but is not the central', outcome: 'A secondary theme complements and enriches the primary theme but is not the central governing idea.' },
                { text: 'secondary themes are less important', outcome: 'Not quite — Students often treat secondary themes as \'hidden messages\' the author intentionally buried, leading.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading Russell\'s essay and you feel the "cold unfathomable lifeless abyss" — that\'s imagery making you shiver.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor? Give one example of each from the essay "My Three Passions".', options: [
                { text: 'A simile uses "like" or "as" to compare (e.g., "passions, like great winds"), while a', outcome: 'A simile uses "like" or "as" to compare (e.g., "passions, like great winds"), while a metaphor.' },
                { text: 'mystic miniature', outcome: 'Not quite — Students often think any descriptive language is imagery, and any comparison is a metaphor.', reveals: 'any-descriptive-language-is-imagery' },
                { text: 'any descriptive language is imagery, and any comparison is a metaphor', outcome: 'Not quite — Students often think any descriptive language is imagery, and any comparison is a metaphor.', reveals: 'any-descriptive-language-is-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are writing a college application essay about a personal struggle: you describe your ambition as a "rocket" but admit gravity keeps pulling you.',
            decisions: [{ prompt: 'What is the primary difference between situational irony and verbal irony, and which type dominates Russell\'s essay?', options: [
                { text: 'Situational irony occurs when the actual outcome contradicts the expected outcome', outcome: 'Situational irony occurs when the actual outcome contradicts the expected outcome; verbal irony.' },
                { text: 'verbal irony', outcome: 'Not quite — Students often treat every metaphor as a symbol and every unfortunate event as irony.', reveals: 'students-often-treat-every-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading Bertrand Russell\'s autobiography and encounter the phrase "wayward course" describing his life\'s path.',
            decisions: [{ prompt: 'What is the primary context clue type used to understand "unfathomable" in the phrase "cold unfathomable lifeless abyss"?', options: [
                { text: 'The primary clue is an **appositional/definitional clue** within the noun phrase itself:', outcome: 'The primary clue is an **appositional/definitional clue** within the noun phrase itself.' },
                { text: 'it means cold', outcome: 'Not quite — Students treat "vocabulary in context" as **synonym substitution**—they hunt for a single word.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading Russell\'s essay and notice his sentences flow like a river — sometimes long and winding, sometimes short and sharp.',
            decisions: [{ prompt: 'Define \'non-finite clause\' and give one example from the first paragraph of "My Three Passions".', options: [
                { text: 'A non-finite clause is a subordinate clause whose verb is an infinitive, participle, or', outcome: 'A non-finite clause is a subordinate clause whose verb is an infinitive, participle, or gerund.' },
                { text: 'I have sought', outcome: 'Not quite — Students often treat grammar analysis as a labeling exercise (circling nouns, verbs) rather than.', reveals: 'students-often-treat-grammar-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you receive a text from a friend: "I\'m fine." A literal question asks, "What did the message say?" An inferential question asks, "Is your friend.',
            decisions: [{ prompt: 'Define a literal comprehension question and give one example from "My Three Passions".', options: [
                { text: 'A literal comprehension question asks for information directly stated in the text', outcome: 'A literal comprehension question asks for information directly stated in the text.' },
                { text: 'What are the three passions Bertrand Russell mentions?', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any guess is valid.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'The passions are love, knowledge, and pity for mankind\'s suffering', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any guess is valid.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing your university personal statement, you open Russell\'s \'My Three Passions\' for a model. A friend skims it and says: \'Useless — he doesn\'t even tell his life story, just three abstract feelings. And ending with “I\'d live it again” is plain optimism.\'',
            decisions: [{ prompt: 'Why does Russell\'s structure actually work as a model?', options: [
                { text: 'Show the genre: it\'s an intellectual autobiography — a map of inner geography, not a chronological travelogue. Three passions (love, knowledge, pity) are \'great winds\' blowing him across an \'ocean of anguish\'; each gets a paragraph, and the circular ending mirrors the opening. And context hardens the close: a pacifist jailed in WWI who faced the abyss earned \'I would gladly live it again\' as a verdict, not a platitude.', outcome: 'Your friend sees the craft: select governing passions, unify them with metaphor, close the circle — exactly what a personal statement should do.' },
                { text: 'Agree it\'s a weak model — a real autobiography should narrate events year by year.', outcome: 'In reflective essays structure serves argument, not chronology; the \'plot\' is thesis → each passion → synthesis.', reveals: 'autobiography-must-be-chronological' },
                { text: 'Take the ending at face value — Russell was simply a cheerful optimist about life.', outcome: 'Without the context — prison for pacifism, activism, a logician\'s view of suffering — the verdict reads as optimism; with it, it\'s a hard-won existential choice.', reveals: 'russell-ending-is-platitude' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_012', title: 'The bigger picture',
          caseStudy: { intro: 'The songs come first so you meet the literature before you\'re allowed to theorise it — induction is the essay\'s politics.',
            decisions: [{ prompt: 'What comes next? Tribal Verse (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tribal Verse (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, complementary ideas that run alongside the.',
          hint: 'If stuck, review node 006\'s worked example on identifying the primary theme\'s three-part.',
          misconception: 'Students often treat secondary themes as \'hidden messages\' the author intentionally buried, leading them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying, complementary ideas that run alongside the primary',
                  options: ['Secondary themes are the underlying, complementary ideas that run alongside the primary', '"Before You Read: Context and Background" is a pre-reading pedagogical stage that equips', 'Plot and narrative structure in an autobiographical essay refers to the deliberate', 'Setting in a reflective essay refers to the metaphorical, emotional, and intellectual'],
                  hint: 'If stuck, review node 006\'s worked example on identifying the primary theme\'s three-part structure.',
                  misconception: 'Students often treat secondary themes as \'hidden messages\' the author intentionally buried, leading them to over-interpret minor phrases.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student create a two-column table: Column A = "Explicit statements by Russell" (primary theme content), Column.', 'Guide them to cluster Column B observations into 2-3 categories (e.g., \'upward vs downward movement\', \'individual.', 'For each cluster, formulate a noun phrase naming the abstract tension (e.g., \'transcendence/immanence\').', 'Verify each candidate secondary theme appears in *at least two distinct paragraphs* — if not, it\'s a motif, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid and descriptive language that appeals to the senses.',
          hint: 'Review the definitions of simile, metaphor, and imagery types in c6_english_u1_005 and.',
          misconception: 'Students often think any descriptive language is imagery, and any comparison is a metaphor.',
          parts: [
                { id: 'a', prompt: 'Identify the metaphor in the sentence: "I have tried to apprehend the Pythagorean power by which number holds sway over the flux." Explain the tenor and.', answer: 'The metaphor is "Pythagorean power by',
                  options: ['The metaphor is "Pythagorean power by', 'Pythagorean power', 'mystic miniature', 'any descriptive language is imagery, and any comparison is a metaphor'],
                  hint: 'Review the definitions of simile, metaphor, and imagery types in c6_english_u1_005 and.',
                  misconception: 'Students often think any descriptive language is imagery, and any comparison is a metaphor.' }
          ],
            remediations: { 'any-descriptive-language-is-imagery': { steps: ['Have the student list the five senses and find one phrase in the essay for each.', 'Give them five sentences: some similes, some metaphors, some literal.', 'Ask them to label each and explain why.', 'For each metaphor identified, have them fill a two-column table: Tenor (what is described) and Vehicle (the image used).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'If stuck, return to c11_eng_w_cbse_22_008 and practice converting five metaphors from the.',
          misconception: 'Students often treat every metaphor as a symbol and every unfortunate event as irony.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality,',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality,', '"Before You Read: Context and Background" is a pre-reading pedagogical stage that equips', 'Plot and narrative structure in an autobiographical essay refers to the deliberate', 'Setting in a reflective essay refers to the metaphorical, emotional, and intellectual'],
                  hint: 'If stuck, return to c11_eng_w_cbse_22_008 and practice converting five metaphors from the essay.',
                  misconception: 'Students often treat every metaphor as a symbol and every unfortunate event as irony.' }
          ],
            remediations: { 'students-often-treat-every-metaphor': { steps: ['Have the student list all concrete images in the essay (winds, ocean, abyss, miniature, echoes, cries).', 'For each, ask: "What abstract idea does this image carry across the whole essay?" — this forces symbolic thinking.', 'Then draw a two-column table: "What the passions promise" vs.', '"What pity delivers" — this visualizes structural irony.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'If stuck, return to **c10_engl_cbse_02_009** and re-do the "Key Terms" exercise for.',
          misconception: 'Students treat "vocabulary in context" as **synonym substitution**—they hunt for a single word replacement (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar words or',
                  options: ['Vocabulary in Context is the skill of determining the meaning of unfamiliar words or', '"Before You Read: Context and Background" is a pre-reading pedagogical stage that equips', 'Plot and narrative structure in an autobiographical essay refers to the deliberate', 'Setting in a reflective essay refers to the metaphorical, emotional, and intellectual'],
                  hint: 'If stuck, return to **c10_engl_cbse_02_009** and re-do the "Key Terms" exercise for Mandela\'s.',
                  misconception: 'Students treat "vocabulary in context" as **synonym substitution**—they hunt for a single word replacement (e.g., "unfathomable = deep").' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['**Isolate the metaphor**: Ask the student to draw the literal image (e.g., an abyss, a miniature, a reverberating.', '**Map the transfer**: Have them list what the literal image *does* (abyss: swallows, has no bottom, inspires fear.', '**Connect to the tenor**: Match each action to the abstract concept (love, knowledge, pity).', '**Re-read the clause** with the mapped meaning aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of how grammatical.',
          hint: 'Review Class 10 grammar: clause types (especially non-finite -ing, -ed, to-infinitive).',
          misconception: 'Students often treat grammar analysis as a labeling exercise (circling nouns, verbs) rather than a functional.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic analysis of how grammatical',
                  options: ['Language Usage in the Text refers to the systematic analysis of how grammatical', '"Before You Read: Context and Background" is a pre-reading pedagogical stage that equips', 'Plot and narrative structure in an autobiographical essay refers to the deliberate', 'Setting in a reflective essay refers to the metaphorical, emotional, and intellectual'],
                  hint: 'Review Class 10 grammar: clause types (especially non-finite -ing, -ed, to-infinitive) and cohesive.',
                  misconception: 'Students often treat grammar analysis as a labeling exercise (circling nouns, verbs) rather than a functional exploration.' }
          ],
            remediations: { 'students-often-treat-grammar-analysis': { steps: ['Return to the text and isolate ONE sentence.', 'Together, bracket every clause and label its type (finite/non-finite, main/subordinate).', 'Ask: "What does this clause DO?', 'Co-construct a two-column table: Structure | Function.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'Review "Identifying Explicit Information" from Class 9/10 comprehension nodes (e.g.',
          misconception: 'Students believe inferential questions are "opinion questions" where any guess is valid.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the difference between literal and inferential questions. Why might a student mistakenly treat an inferential question as literal?', answer: 'Literal questions have answers explicitly written in the text',
                  options: ['Literal questions have answers explicitly written in the text', 'opinion questions', 'inferential', 'critical'],
                  hint: 'Review "Identifying Explicit Information" from Class 9/10 comprehension nodes (e.g.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any guess is valid.' },
                { id: 'b', prompt: 'Given the question: "Why does Russell compare his passions to great winds?" Identify if it is literal or inferential.', answer: 'The question is inferential',
                  options: ['The question is inferential', 'opinion questions', 'inferential', 'critical'],
                  hint: 'Review "Identifying Explicit Information" from Class 9/10 comprehension nodes (e.g.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any guess is valid.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Show a two‑sentence micro‑text: "The room was silent.', 'Maya stared at the untouched cake." Ask: "Literal: What is Maya looking at?', 'Inferential: How might Maya feel?" 2.', 'Have the student highlight the explicit fact (untouched cake) and list three possible inferences with evidence (sadness.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe inferential questions are "opinion questions" where any guess is valid.',
          parts: [
                { id: 'a', prompt: 'A student answers: "Russell\'s pity is earth-bound because he feels sad for poor people." Evaluate this answer. Is it sufficient? What\'s missing?', answer: 'The answer is partially correct but insufficient',
                  options: ['The answer is partially correct but insufficient', 'opinion questions', 'inferential', 'critical'],
                  hint: 'Review "Identifying Explicit Information" from Class 9/10 comprehension nodes (e.g.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any guess is valid.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Show a two‑sentence micro‑text: "The room was silent.', 'Maya stared at the untouched cake." Ask: "Literal: What is Maya looking at?', 'Inferential: How might Maya feel?" 2.', 'Have the student highlight the explicit fact (untouched cake) and list three possible inferences with evidence (sadness.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
