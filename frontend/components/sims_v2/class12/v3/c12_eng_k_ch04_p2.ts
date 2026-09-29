import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch04_p2: SimDef = {
    id: 'v3_c12_eng_k_ch04_p2',
    title: 'Tomorrow (Short Story) · Part 2/3',
    subtitle: 'He digs every day and plants nothing — hope as a life sentence',
    classLevel: 12, subject: 'eng_k', topic: 'Tomorrow (Short Story) · Part 2/3',
    chapters: ['c12_eng_k_ch04'],
    nodeIds: ['c12_eng_k_cbse_04_007', 'c12_eng_k_cbse_04_008', 'c12_eng_k_cbse_04_009', 'c12_eng_k_cbse_04_010', 'c12_eng_k_cbse_04_011', 'c12_eng_k_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Conrad scholar', intro: 'A retired captain waits for tomorrow — the day his boy comes home. The boy is home. Tomorrow never arrives.', goal: 'Read Tomorrow through Conrad\'s maritime realism, layered narration and the psychology of self-protective delusion.' },
    discovery: {
        question: 'Captain Hagberd digs his garden daily, plants nothing, sews a sailcloth suit on land and advertises for a son who\'s already back — spending the cash and leaving. Why can\'t the barber\'s teasing \'cure\' him?',
        options: ['The delusion is functional — his madness is \'equilibrium based upon self-esteem,\' the very structure that keeps him capable; teasing threatens the architecture, not the symptom', 'The barber isn\'t funny enough', 'Madness can\'t be cured at all', 'Hagberd doesn\'t hear him'],
        answer: 'The delusion is functional — his madness is \'equilibrium based upon self-esteem,\' the very structure that keeps him capable; teasing threatens the architecture, not the symptom',
        hook: 'Conrad the master mariner builds the story in layers — tap-room gossip, Hagberd\'s own voice, the son\'s mercenary return — each stripping his self-mythology. The sailcloth suit and the unplanted spade aren\'t props; they\'re a man suspended between the sea he fled and the tomorrow he invented.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Tomorrow\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk Colebrook\'s coast like a psychologist: peel the story-within-a-story layers, weigh Bessie\'s complicity against Harry\'s brutal clarity, and answer the question — when does hope become a prison?',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Tomorrow\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a short story and give one example from "Tomorrow" other than the captain\'s obsessive hope.', options: [
                { text: 'A secondary theme is a recurring idea that supports or contrasts with the primary theme,', outcome: 'A secondary theme is a recurring idea that supports or contrasts with the primary theme, adding.' },
                { text: 'the captain digs the garden', outcome: 'Not quite — Students often treat secondary themes as "minor themes" and list them without showing how they.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Tomorrow\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, and give one example of each from "Tomorrow" (do not use the sailcloth suit or the sea-god.', options: [
                { text: '**Correct answer**: Imagery is descriptive language appealing to the senses (e.g.,', outcome: '**Correct answer**: Imagery is descriptive language appealing to the senses (e.g., auditory: "the.' },
                { text: 'like a man roughened out of granite', outcome: 'Not quite — Students often think **any comparison is a metaphor** and **any description is imagery**.', reveals: 'any-comparison-is-a-metaphor' },
                { text: '**any comparison is a metaphor** and **any description is imagery**', outcome: 'Not quite — Students often think **any comparison is a metaphor** and **any description is imagery**.', reveals: 'any-comparison-is-a-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Tomorrow\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What does the phrase "possessed of" mean in the opening paragraph of "Tomorrow": "He was possessed of some little money evidently"?', options: [
                { text: 'Correct: (b) owning/having', outcome: 'Correct: (b) owning/having. In this context, "possessed of" is a formal/legalistic phrase meaning.' },
                { text: 'money evidently', outcome: 'Not quite — Students often treat "vocabulary in context" as **matching words to dictionary definitions**.', reveals: 'students-often-treat-vocabulary-in' },
                { text: 'because', outcome: 'Not quite — Students often treat "vocabulary in context" as **matching words to dictionary definitions**.', reveals: 'students-often-treat-vocabulary-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Tomorrow\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is the primary narrative tense used in "Tomorrow", and how does the author signal a shift to a character\'s internal thought?', options: [
                { text: 'The primary narrative tense is past tense', outcome: 'The primary narrative tense is past tense. Shifts to internal thought are often signaled by free.' },
                { text: 'present tense', outcome: 'Not quite — Students often think "language usage" only means identifying parts of speech (nouns, verbs).', reveals: 'language-usage-only-means-identifying' },
                { text: 'language usage', outcome: 'Not quite — Students often think "language usage" only means identifying parts of speech (nouns, verbs).', reveals: 'language-usage-only-means-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A founder has rehearsed her \'big launch tomorrow\' for two years. When a real customer finally shows up today, she turns them away — \'the real launch is coming.\'',
            decisions: [{ prompt: 'What\'s Conrad\'s \'Tomorrow\' diagnosis?', options: [
                { text: 'The fantasy of tomorrow has eaten the present — Hagberd rejects his actual returned son because the real thing can\'t compete with the rehearsed dream; take the imperfect today or lose it.', outcome: 'Living for an imagined tomorrow makes real arrivals look like impostors — the story\'s warning is to test hope against what\'s actually here.' },
                { text: 'Keep waiting — hope is always worth protecting from premature reality.', outcome: 'Hope without an expiry date curdles into self-deception; Hagberd\'s \'tomorrow\' is a prison, not a promise.', reveals: 'hope-without-evidence' },
                { text: 'Kill all hope — expectation is delusion by definition.', outcome: 'The story condemns fantasy substituted for life, not hope itself; acting on the real chance is hope working properly.', reveals: 'hope-is-delusion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read madness as structure, not chaos — and see how Conrad layers narrators so the truth arrives sideways.',
            decisions: [{ prompt: 'What comes next? Tomorrow (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tomorrow (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes in \'Tomorrow\' — the supporting ideas and motifs that deepen.',
          hint: 'Review node 006 (primary theme) and node 004-005 (character analyses) — specifically the.',
          misconception: 'Students often treat secondary themes as "minor themes" and list them without showing how they **interact with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Tomorrow\'',
                  options: ['Secondary themes in \'Tomorrow\'', '\'Tomorrow\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Tomorrow\'', 'The setting of \'Tomorrow\''],
                  hint: 'Review node 006 (primary theme) and node 004-005 (character analyses) — specifically the captain\'s.',
                  misconception: 'Students often treat secondary themes as "minor themes" and list them without showing how they **interact with the primary theme**.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If the student cannot move beyond listing, do this 3-step remediation: (1) Re-read node 006 (primary theme) and write.', '(2) Take each secondary theme candidate (isolation, appearance/reality, exploitation, sea/land, time) and complete this.', 'Re-attempt diagnostic Q4 after this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_008', difficulty: 'standard',
          question: 'Imagery in \'Tomorrow\' — the vivid, sensory language that creates word-pictures.',
          hint: 'If stuck on tenor/vehicle, review c11_eng_h_cbse_01_008 worked example on "The Laburnum.',
          misconception: 'Students often think **any comparison is a metaphor** and **any description is imagery**.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of extended metaphor: Trace the "Gambusino" metaphor across Harry\'s monologue (pp. 62-63).', answer: '**Correct answer**: Tenor = Harry\'s restless, rootless existence',
                  options: ['**Correct answer**: Tenor = Harry\'s restless, rootless existence', 'the Gambusino is a real person Harry met, they miss the metaphorical level', '**any comparison is a metaphor** and **any description is imagery**'],
                  hint: 'If stuck on tenor/vehicle, review c11_eng_h_cbse_01_008 worked example on "The Laburnum Top".',
                  misconception: 'Students often think **any comparison is a metaphor** and **any description is imagery**.' },
                { id: 'b', prompt: 'Analyse how the auditory imagery of the sea ("the measured blows and sighs of the rising tide", "the thundering of the surf", "the voice of the restless sea").', answer: '**Correct answer**: The sea\'s soundscape mirrors Bessie\'s internal turbulence',
                  options: ['**Correct answer**: The sea\'s soundscape mirrors Bessie\'s internal turbulence', '**any comparison is a metaphor** and **any description is imagery**'],
                  hint: 'If stuck on tenor/vehicle, review c11_eng_h_cbse_01_008 worked example on "The Laburnum Top".',
                  misconception: 'Students often think **any comparison is a metaphor** and **any description is imagery**.' }
          ],
            remediations: { 'any-comparison-is-a-metaphor': { steps: ['If the student mislabels simile as metaphor: **Step 1** — Revisit c11_eng_h_cbse_01_008 (Class 11 Hornbill Literary.', '**Step 2** — Do the "Simile vs Metaphor Sort": Write 10 comparisons from "Tomorrow" on cards; sort into two piles.', '**Step 3** — Re-attempt Diagnostic Question 1 & 3.', 'If the student lists non-sensory facts as imagery: **Step 1** — Highlight every adjective in a paragraph; keep only.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **any comparison is a metaphor** and **any description is imagery**.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The metaphor \'turning into stone\' (p. 67) is more powerful than the simile \'like a man roughened out of granite\' (p.', answer: '**Correct answer**: **Defend**',
                  options: ['**Correct answer**: **Defend**', 'similes are weaker', '**any comparison is a metaphor** and **any description is imagery**'],
                  hint: 'If stuck on tenor/vehicle, review c11_eng_h_cbse_01_008 worked example on "The Laburnum Top".',
                  misconception: 'Students often think **any comparison is a metaphor** and **any description is imagery**.' }
          ],
            remediations: { 'any-comparison-is-a-metaphor': { steps: ['If the student mislabels simile as metaphor: **Step 1** — Revisit c11_eng_h_cbse_01_008 (Class 11 Hornbill Literary.', '**Step 2** — Do the "Simile vs Metaphor Sort": Write 10 comparisons from "Tomorrow" on cards; sort into two piles.', '**Step 3** — Re-attempt Diagnostic Question 1 & 3.', 'If the student lists non-sensory facts as imagery: **Step 1** — Highlight every adjective in a paragraph; keep only.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Tomorrow\' — where opposite things are both true,.',
          hint: 'If stuck, re-read the "Stop and Think" questions in the NCERT text — they are designed.',
          misconception: 'Students often confuse *situational irony* (outcome contradicts expectation) with *dramatic irony* (audience knows more.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the word "tomorrow" functions as both a literal time reference and a symbolic concept in the story.', answer: 'Literally, "tomorrow" is the day after today',
                  options: ['Literally, "tomorrow" is the day after today', 'tomorrow'],
                  hint: 'If stuck, re-read the "Stop and Think" questions in the NCERT text — they are designed to guide you.',
                  misconception: 'Students often confuse *situational irony* (outcome contradicts expectation) with *dramatic irony* (audience knows more than character).' }
          ],
            remediations: { 'students-often-confuse-situational-irony': { steps: ['If a student conflates irony types: (1) Have them create a three-column table: Type / Definition / Example from.', '(2) For symbols: use the "literal → metaphorical" two-step: pick an object (spade), state its literal use (digging.', '(3) Re-diagnose with Diagnostic Question 3 and 4 — require them to name the irony type and trace the symbol\'s two.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Tomorrow\' — the words and phrases you must know to read the.',
          hint: 'If unable to move beyond dictionary meaning: Revisit **c12_eng_k_cbse_04_006** (Primary.',
          misconception: 'Students often treat "vocabulary in context" as **matching words to dictionary definitions**.',
          parts: [
                { id: 'a', prompt: 'What does the phrase "possessed of" mean in the opening paragraph of "Tomorrow": "He was possessed of some little money evidently"?', answer: 'Correct: (b) owning/having',
                  options: ['Correct: (b) owning/having', 'money evidently', 'because'],
                  hint: 'If unable to move beyond dictionary meaning: Revisit **c12_eng_k_cbse_04_006** (Primary Theme) and.',
                  misconception: 'Students often treat "vocabulary in context" as **matching words to dictionary definitions**.' },
                { id: 'b', prompt: 'In the sentence "What was known of Captain Hagberd in the little seaport of Colebrook was not exactly in his favour. He did not belong to the place.', answer: '"Morbid" implies an unhealthy, pathological fixation',
                  options: ['"Morbid" implies an unhealthy, pathological fixation', 'morbid'],
                  hint: 'If unable to move beyond dictionary meaning: Revisit **c12_eng_k_cbse_04_006** (Primary Theme) and.',
                  misconception: 'Students often treat "vocabulary in context" as **matching words to dictionary definitions**.' },
                { id: 'c', prompt: 'Apply the 5-step context-clue method to determine the meaning of "skinflint" in this passage: "He had earned for himself the reputation of an awful skinflint.', answer: 'Meaning: An extremely stingy person',
                  options: ['Meaning: An extremely stingy person', 'skin disease', 'tough person'],
                  hint: 'If unable to move beyond dictionary meaning: Revisit **c12_eng_k_cbse_04_006** (Primary Theme) and.',
                  misconception: 'Students often treat "vocabulary in context" as **matching words to dictionary definitions**.' },
                { id: 'd', prompt: 'Analyze how the word "derangement" in "with the muddled lucidity of a mental derangement" functions differently from "madness" or "insanity" in describing.', answer: '"Derangement" suggests a **disordered but internally consistent logic**',
                  options: ['"Derangement" suggests a **disordered but internally consistent logic**', 'derangement'],
                  hint: 'If unable to move beyond dictionary meaning: Revisit **c12_eng_k_cbse_04_006** (Primary Theme) and.',
                  misconception: 'Students often treat "vocabulary in context" as **matching words to dictionary definitions**.' }
          ],
            remediations: { 'students-often-treat-vocabulary-in': { steps: ['If a student gives dictionary meanings without textual anchoring: 1.', '**Re-read the specific paragraph** where the word appears (e.g., "morbid" in para 2).', '**Highlight 3 context clues**: surrounding adjectives, character actions, narrative tone.', '**Write a "Context Definition"** in this format: "In this story, [word] means [contextual meaning] because [clue 1].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_011', difficulty: 'standard',
          question: 'Language and style in \'Tomorrow\' — how the writer chose words, sentences and.',
          hint: 'Review Class 11 Grammar nodes (c11_eng_h_cbse_01_011, etc.) for definitions and examples.',
          misconception: 'Students often think "language usage" only means identifying parts of speech (nouns, verbs) or figures of speech.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative tense used in "Tomorrow", and how does the author signal a shift to a character\'s internal thought?', answer: 'The primary narrative tense is past tense',
                  options: ['The primary narrative tense is past tense', 'present tense', 'language usage'],
                  hint: 'Review Class 11 Grammar nodes (c11_eng_h_cbse_01_011, etc.) for definitions and examples of these.',
                  misconception: 'Students often think "language usage" only means identifying parts of speech (nouns, verbs) or figures of speech in isolation.' },
                { id: 'b', prompt: 'Identify two examples of allusions in the text and rewrite each as a plain sentence without the allusion.', answer: 'Example 1: "beard of Father Neptune" → "beard like the sea god"',
                  options: ['Example 1: "beard of Father Neptune" → "beard like the sea god"', 'language usage'],
                  hint: 'Review Class 11 Grammar nodes (c11_eng_h_cbse_01_011, etc.) for definitions and examples of these.',
                  misconception: 'Students often think "language usage" only means identifying parts of speech (nouns, verbs) or figures of speech in isolation.' }
          ],
            remediations: { 'language-usage-only-means-identifying': { steps: ['Revisit the concept of free indirect discourse using a simpler text (e.g., a short passage from a Class 10 story).', 'Practice converting direct speech to free indirect discourse to see the blending of voices.', 'Re-read the "Tomorrow" passage where Hagberd says "Tomorrow" repeatedly; map each occurrence to narrative time (past.', 'Then re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Tomorrow\' — questions answered straight from the text.',
          hint: 'If stuck on finding evidence: Re-read c12_eng_k_cbse_04_002 (Plot) and use the "Stop and.',
          misconception: 'Students treat inferential questions as "give your opinion" and write answers without textual evidence.',
          parts: [
                { id: 'a', prompt: 'Classify the following question as LITERAL or INFERENTIAL and explain your reasoning: "What does Captain Hagberd do every day in his front plot?"', answer: 'LITERAL',
                  options: ['LITERAL', 'daily routine', 'implied meaning'],
                  hint: 'If stuck on finding evidence: Re-read c12_eng_k_cbse_04_002 (Plot) and use the "Stop and Think".',
                  misconception: 'Students treat inferential questions as "give your opinion" and write answers without textual evidence.' },
                { id: 'b', prompt: 'Answer this INFERENTIAL question using two textual clues: "Why does Bessie Carvil never contradict Captain Hagberd\'s delusion that Harry will return.', answer: 'Step 1: Identify INFERENTIAL (asks "Why" about motivation)',
                  options: ['Step 1: Identify INFERENTIAL (asks "Why" about motivation)', 'She is kind', 'She hopes too'],
                  hint: 'If stuck on finding evidence: Re-read c12_eng_k_cbse_04_002 (Plot) and use the "Stop and Think".',
                  misconception: 'Students treat inferential questions as "give your opinion" and write answers without textual evidence.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['If a student cannot distinguish question types or support inferences: 1) Use c12_eng_k_cbse_04_002 (Plot) to create.', '2) Practice with c11_eng_h_cbse_01_012 (Class 11 Comprehension node) using simpler texts.', '3) For each inferential answer, force the "Evidence Sandwich": Quote → Inference → Quote.', '4) Re-diagnose with DIAGNOSTIC_QUESTION_4 & 5 until they consistently cite two clues.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
