import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch04_p2: SimDef = {
    id: 'v3_c11_eng_h_ch04_p2',
    title: 'Landscape of the Soul · Part 2/3',
    subtitle: 'See why Chinese painters walked away from the single fixed viewpoint on purpose.',
    classLevel: 11, subject: 'eng_h', topic: 'Landscape of the Soul · Part 2/3',
    chapters: ['c11_eng_h_ch04'],
    nodeIds: ['c11_eng_h_cbse_04_007', 'c11_eng_h_cbse_04_008', 'c11_eng_h_cbse_04_009', 'c11_eng_h_cbse_04_010', 'c11_eng_h_cbse_04_011', 'c11_eng_h_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a curator comparing two wings of an art museum', intro: 'Misty mountains with tiny humans on one side, pin-sharp portraits on the other — decide what each culture was really painting.', goal: 'Contrast the Chinese and European landscape traditions and interpret \'landscape of the soul.\'' },
    discovery: {
        question: 'A common verdict: Chinese landscape painting looks \'less realistic\' because its painters never mastered perspective. What\'s wrong with that?',
        options: ['They knew perspective but rejected it — the goal was conceptual completeness across viewpoints, not one frozen optical illusion', 'Nothing — they genuinely lacked the technique until Europe arrived', 'They avoided perspective only because paper scrolls were too small', 'Realism was banned under imperial decree'],
        answer: 'They knew perspective but rejected it — the goal was conceptual completeness across viewpoints, not one frozen optical illusion',
        hook: 'Judging Shanshui by European realism is a rigged test — the European painter lends you his eyes; the Chinese painter invites you into his mind.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Landscape of the Soul\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast single-viewpoint perspective with a scroll\'s travelling viewpoints, then test whether \'landscape of the soul\' implies a greener relationship to nature.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Landscape of the Soul\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the Daoist concept of the \'Middle Void\' in the context of Shanshui, and which two elements does it mediate?', options: [
                { text: 'The Middle Void is the essential space where Yang (mountain, vertical, stable, warm, dry,', outcome: 'The Middle Void is the essential space where Yang (mountain, vertical, stable, warm, dry.' },
                { text: 'blank space', outcome: 'Not quite — Students often confuse \'secondary themes\' with \'minor details\' or \'sub-plots\', listing the two.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'background', outcome: 'Not quite — Students often confuse \'secondary themes\' with \'minor details\' or \'sub-plots\', listing the two.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Landscape of the Soul\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from memory (not from the Chapter 4 texts).', options: [
                { text: 'Imagery: Language appealing to the senses (e.g., "The sour lemon juice stung my tongue"', outcome: 'Imagery: Language appealing to the senses (e.g., "The sour lemon juice stung my tongue".' },
                { text: 'for metaphor reveals confusion with simile', outcome: 'Not quite — Students conflate *any* descriptive language with imagery, treating abstract nouns ("destruction,".', reveals: 'students-conflate-any-descriptive-language' },
                { text: 'they label', outcome: 'Not quite — Students conflate *any* descriptive language with imagery, treating abstract nouns ("destruction,".', reveals: 'students-conflate-any-descriptive-language' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Landscape of the Soul\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from everyday life for each.', options: [
                { text: 'Irony occurs when there is a contrast between expectation and reality (e.g., a fire', outcome: 'Irony occurs when there is a contrast between expectation and reality (e.g., a fire station burning.' },
                { text: 'any unexpected event is irony, but irony requires a structural contradiction (e', outcome: 'Not quite — Students often think any unexpected event is irony, but irony requires a structural contradiction.', reveals: 'any-unexpected-event-is-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Landscape of the Soul\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary strategy for inferring the meaning of an unfamiliar word from context?', options: [
                { text: 'The primary strategy is to examine surrounding sentences for clues such as definitions,', outcome: 'The primary strategy is to examine surrounding sentences for clues such as definitions, examples.' },
                { text: 'look it up in a dictionary immediately', outcome: 'Not quite — Students often think "context clues" only mean looking for a synonym or definition in the same.', reveals: 'context-clues-only-mean-looking' },
                { text: 'context clues', outcome: 'Not quite — Students often think "context clues" only mean looking for a synonym or definition in the same.', reveals: 'context-clues-only-mean-looking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Landscape of the Soul\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is the meaning of the Latin expression "inter alia" as used in the text, and in what type of writing is it typically found?', options: [
                { text: '"Inter alia" means "among other things" and is typically used in formal, legal, academic,', outcome: '"Inter alia" means "among other things" and is typically used in formal, legal, academic,.' },
                { text: 'it means \'therefore\'', outcome: 'Not quite — Students often believe that Latin expressions like "inter alia" or "prima facie" are just "fancy.', reveals: 'latin-expressions-like-inter-alia' },
                { text: 'inter alia', outcome: 'Not quite — Students often believe that Latin expressions like "inter alia" or "prima facie" are just "fancy.', reveals: 'latin-expressions-like-inter-alia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Landscape of the Soul\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal comprehension question has its answer explicitly stated in the text, while an', outcome: 'A literal comprehension question has its answer explicitly stated in the text, while an inferential.' },
                { text: 'literal questions are easy, inferential are hard', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any plausible guess.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating the school art show, you hang a Song-dynasty style scroll beside a Renaissance-style portrait. A visitor remarks: \'The Chinese painting is charming but primitive — those artists hadn\'t discovered perspective yet. European art was simply more advanced.\'',
            decisions: [{ prompt: 'Is \'hadn\'t discovered perspective\' a fair reading?', options: [
                { text: 'No — Chinese artists knew perspective (their architecture proves it) but deliberately used multiple viewpoints: the goal of Shanshui was conceptual completeness — letting the viewer spiritually enter the landscape and wander it — not an optical illusion for a single eye at a single moment. It\'s a choice of aim, not a lack of skill.', outcome: 'Judging one tradition by another\'s goal posts is the error: Wu Daozi\'s painting-as-doorway versus Metsys\'s fly-real-enough-to-swat are different ideas of what art is for.' },
                { text: 'Fair — realism measures progress; perspective is the technical peak of painting.', outcome: 'That\'s the Eurocentric assumption the chapter dismantles: \'one eye, one moment, one truth\' is the European aim; the Chinese aim was the Dao — a mountain has no single correct view.', reveals: 'perspective-equals-progress' },
                { text: 'The scroll is just decorative — landscapes can\'t carry philosophy.', outcome: 'Shanshui literally means mountain-water as a vision of complementary forces; the misty gaps are the Daoist void the viewer\'s imagination is meant to fill.', reveals: 'landscape-is-decoration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'A European landscape is a window you look through; a Chinese one is a country you wander — the difference is a philosophy, not a skill gap.',
            decisions: [{ prompt: 'What comes next? Landscape of the Soul · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Landscape of the Soul · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes in \'Landscape of the Soul\' — the supporting ideas and motifs.',
          hint: 'Review the distinction between \'illusionistic likeness\' (optical truth) and \'essence.',
          misconception: 'Students often confuse \'secondary themes\' with \'minor details\' or \'sub-plots\', listing the two anecdotes (Wu Daozi.',
          parts: [
                { id: 'a', prompt: 'Analyze how the Quinten Metsys anecdote (the fly on the panel) functions as a foil to the Wu Daozi story to develop the secondary theme of \'art as illusion.', answer: 'The Metsys story exemplifies European art\'s pursuit of trompe-l\'oeil',
                  options: ['The Metsys story exemplifies European art\'s pursuit of trompe-l\'oeil', 'realistic vs abstract'],
                  hint: 'Review the distinction between \'illusionistic likeness\' (optical truth) and \'essence of inner life\'.',
                  misconception: 'Students often confuse \'secondary themes\' with \'minor details\' or \'sub-plots\', listing the two anecdotes (Wu Daozi, Quinten Metsys).' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Ask the student to re-read the paragraph defining Shanshui (para 5) and underline every abstract noun (Yang, Yin.', 'Have them complete a three-column table: Column A = Anecdote/Detail, Column B = Abstract Idea it Illustrates, Column.', 'Model one row: Wu Daozi entering cave -> Artist\'s spiritual transcendence -> Theme: Art as spiritual journey.', 'Require them to fill three more rows before re-attempting the diagnostic questions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_008', difficulty: 'standard',
          question: 'Imagery in \'Landscape of the Soul\' — the vivid, sensory language that creates.',
          hint: 'Review "Metaphor vs Simile vs Personification" and "Seven Types of Imagery" from Class 10.',
          misconception: 'Students conflate *any* descriptive language with imagery, treating abstract nouns ("destruction," "depletion,".',
          parts: [
                { id: 'a', prompt: 'In "The Ailing Planet," Palkhivala writes: "The earth\'s vital signs reveal a patient in declining health." Identify the tenor and vehicle of this metaphor, and.', answer: 'Tenor: the earth / planet',
                  options: ['Tenor: the earth / planet', 'sickness', 'Childhood', 'Geography'],
                  hint: 'Review "Metaphor vs Simile vs Personification" and "Seven Types of Imagery" from Class 10 Poetic.',
                  misconception: 'Students conflate *any* descriptive language with imagery, treating abstract nouns ("destruction," "depletion," "concern") as images.' }
          ],
            remediations: { 'students-conflate-any-descriptive-language': { steps: ['Give the student a two-column table: Column A = 10 phrases from the text (mix of abstract nouns, similes, metaphors.', 'For each mis-sorted item, ask: "Which sense does this word make me *feel*?" (for imagery) or "Can I rewrite this as \'X.', 'Have them rewrite three abstract sentences from the text into sensory imagery (e.g., "deforestation continues" →.', 'Co-construct a metaphor map: draw tenor circle, vehicle circle, arrow labeled with 3 transferred qualities.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Landscape of the Soul\' — where opposite things are both.',
          hint: 'Review the anecdotes in the chapter (Wu Daozi\'s painting and the dragon\'s eye) and the.',
          misconception: 'Students often think any unexpected event is irony, but irony requires a structural contradiction (e.g., between.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Landscape of the Soul\'',
                  options: ['Irony and paradox in \'Landscape of the Soul\'', '\'Landscape of the Soul\' (Hornbill, ch', 'The plot/narrative arc of \'Landscape of the Soul\'', 'The setting of \'Landscape of the Soul\''],
                  hint: 'Review the anecdotes in the chapter (Wu Daozi\'s painting and the dragon\'s eye) and the explanation.',
                  misconception: 'Students often think any unexpected event is irony, but irony requires a structural contradiction (e.g., between appearance and reality,.' }
          ],
            remediations: { 'any-unexpected-event-is-irony': { steps: ['If a student conflates irony with surprise, walk them through the Wu Daozi anecdote step by step: (1) Emperor\'s.', '(2) Painter\'s action: he enters the painting.', '(3) Outcome: painter gains access to the spiritual realm; emperor does not.', '(4) Label the contradiction: the one who commissions (power) is excluded; the one who creates (servant) enters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any unexpected event is irony, but irony requires a structural contradiction (e.g., between.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of symbolism in conveying the concept of \'Dao\' in the chapter.', answer: 'The Middle Void is more comprehensive',
                  options: ['The Middle Void is more comprehensive', 'any unexpected event is irony, but irony requires a structural contradiction (e'],
                  hint: 'Review the anecdotes in the chapter (Wu Daozi\'s painting and the dragon\'s eye) and the explanation.',
                  misconception: 'Students often think any unexpected event is irony, but irony requires a structural contradiction (e.g., between appearance and reality,.' }
          ],
            remediations: { 'any-unexpected-event-is-irony': { steps: ['If a student conflates irony with surprise, walk them through the Wu Daozi anecdote step by step: (1) Emperor\'s.', '(2) Painter\'s action: he enters the painting.', '(3) Outcome: painter gains access to the spiritual realm; emperor does not.', '(4) Label the contradiction: the one who commissions (power) is excluded; the one who creates (servant) enters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Landscape of the Soul\' — the words and phrases you must know.',
          hint: 'If stuck, review Class 10 vocabulary in context exercises (c10_engl_cbse_02_009) focusing.',
          misconception: 'Students often think "context clues" only mean looking for a synonym or definition in the same sentence.',
          parts: [
                { id: 'a', prompt: 'In the phrase "the movement has not looked back", what does "looked back" mean figuratively, and what context clue helps you decide?', answer: 'Figuratively, "looked back" means "regressed or reversed progress"',
                  options: ['Figuratively, "looked back" means "regressed or reversed progress"', 'context clues', 'gripped the imagination'],
                  hint: 'If stuck, review Class 10 vocabulary in context exercises (c10_engl_cbse_02_009) focusing on the.',
                  misconception: 'Students often think "context clues" only mean looking for a synonym or definition in the same sentence.' },
                { id: 'b', prompt: 'The text says: "Forests precede mankind; deserts follow." If you encounter "precede" here, how would you infer its meaning using the contrast with "follow"?', answer: '"Precede" means "come before"',
                  options: ['"Precede" means "come before"', 'precede means succeed', 'context clues', 'gripped the imagination'],
                  hint: 'If stuck, review Class 10 vocabulary in context exercises (c10_engl_cbse_02_009) focusing on the.',
                  misconception: 'Students often think "context clues" only mean looking for a synonym or definition in the same sentence.' }
          ],
            remediations: { 'context-clues-only-mean-looking': { steps: ['If a student struggles, first have them identify the part of speech of the target word (verb, noun, adjective).', 'Then ask them to highlight the sentence containing the word and the two sentences before and after.', 'Guide them to ask: "Does the text give an example?', 'A cause-effect?" Practice with "ignominious darkness": the surrounding text says species "languish unnamed" —.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_011', difficulty: 'standard',
          question: 'Language and style in \'Landscape of the Soul\' — how the writer chose words.',
          hint: 'Review the "Vocabulary in Context" node (c11_eng_h_cbse_04_010) and the Class 9 node.',
          misconception: 'Students often believe that Latin expressions like "inter alia" or "prima facie" are just "fancy words" that can.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'Landscape of the Soul\'',
                  options: ['Language and style in \'Landscape of the Soul\'', '\'Landscape of the Soul\' (Hornbill, ch', 'The plot/narrative arc of \'Landscape of the Soul\'', 'The setting of \'Landscape of the Soul\''],
                  hint: 'Review the "Vocabulary in Context" node (c11_eng_h_cbse_04_010) and the Class 9 node on Idioms and.',
                  misconception: 'Students often believe that Latin expressions like "inter alia" or "prima facie" are just "fancy words" that can be replaced by simple.' }
          ],
            remediations: { 'latin-expressions-like-inter-alia': { steps: ['Give the student a two-column table: Column A lists the seven Latin phrases from the textbook; Column B has their.', 'For each phrase, provide a one-sentence context from a newspaper or legal document (e.g., "The committee, inter alia.', 'Have the student write one original sentence per phrase in a formal context (e.g., a letter to the principal).', 'Finally, ask them to explain why "inter alia" is better than "among other things" in a legal document (precision.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Landscape of the Soul\' — questions answered straight.',
          hint: 'Review the skill of "scanning for keywords" and "paraphrasing a sentence in your own.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any plausible guess is acceptable.',
          parts: [
                { id: 'a', prompt: 'In the prose "The Ailing Planet," the author writes: "The earth\'s vital signs reveal a patient in declining health." If a question asks, "What does the author.', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'literal, because the words are in the text'],
                  hint: 'Review the skill of "scanning for keywords" and "paraphrasing a sentence in your own words" from.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any plausible guess is acceptable.' },
                { id: 'b', prompt: 'Given the line from the poem "Childhood": "They talked of love and preached of love, But did not act so lovingly," formulate a literal question and.', answer: 'Literal: "What did the adults talk about and preach?" (Answer: love)',
                  options: ['Literal: "What did the adults talk about and preach?" (Answer: love)', 'Why did the adults not act lovingly?'],
                  hint: 'Review the skill of "scanning for keywords" and "paraphrasing a sentence in your own words" from.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any plausible guess is acceptable.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student cannot distinguish literal from inferential, have them practice with a two-column table: Column A: "Text.', 'Column B: "Text implies..." (write an inference).', 'Use three sentences from "The Ailing Planet." Then give them a mixed set of 5 questions to classify.', 'Finally, have them answer one inferential question using the "Evidence 1 + Evidence 2 = Inference" template.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
