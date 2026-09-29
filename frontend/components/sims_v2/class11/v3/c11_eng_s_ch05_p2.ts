import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch05_p2: SimDef = {
    id: 'v3_c11_eng_s_ch05_p2',
    title: 'The Tale of Melon City · Part 2/3',
    subtitle: 'Follow a law so rigid it executes its own king — and a people who accept a melon.',
    classLevel: 11, subject: 'eng_s', topic: 'The Tale of Melon City · Part 2/3',
    chapters: ['c11_eng_s_ch05'],
    nodeIds: ['c11_eng_s_cbse_05_007', 'c11_eng_s_cbse_05_008', 'c11_eng_s_cbse_05_009', 'c11_eng_s_cbse_05_010', 'c11_eng_s_cbse_05_011', 'c11_eng_s_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a satirist auditing a kingdom run by procedure', intro: 'An arch too low, a decree too absolute, a noose measured to fit — watch justice turn in a perfect circle.', goal: 'Analyse the poem\'s circular causal structure and the satirical work of its verse form.' },
    discovery: {
        question: 'A \'just and placid\' king orders an arch, blames everyone for its failure, and ends up hanged by his own decree. What mechanism delivers this absurdity?',
        options: ['Procedure obeyed to the letter — \'someone must be hanged\' and only his neck fits the arch\'s measure', 'A palace coup disguised as justice', 'The crowd\'s random fury', 'A prophecy that demanded a royal death'],
        answer: 'Procedure obeyed to the letter — \'someone must be hanged\' and only his neck fits the arch\'s measure',
        hook: 'The blame chain isn\'t random — each defence narrows the target until the king\'s own rule turns the noose on him.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Tale of Melon City\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the blame chain from builders to king, check whether the poem opens in medias res, and weigh whether the melon on the throne is earned or arbitrary.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Tale of Melon City\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a \'secondary theme\' in literature, and how does it differ from the \'primary theme\'?', options: [
                { text: 'A secondary theme is a subordinate idea that supports or runs parallel to the main', outcome: 'A secondary theme is a subordinate idea that supports or runs parallel to the main central message.' },
                { text: 'it\'s just a less important theme', outcome: 'Not quite — Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'as a theme) or treat them as **minor plot points** (e.g', outcome: 'Not quite — Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Tale of Melon City\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "metaphor" precisely using the terms "tenor" and "vehicle", and give one example from the poem where an abstract concept is the.', options: [
                { text: 'A metaphor asserts that the tenor (subject, e.g., "justice") *is* the vehicle (image,', outcome: 'A metaphor asserts that the tenor (subject, e.g., "justice") *is* the vehicle (image, e.g., "a.' },
                { text: 'metaphor uses like or as', outcome: 'Not quite — Students often treat *any* descriptive adjective as imagery (e.g., calling "just and placid".', reveals: 'students-often-treat-any-descriptive' },
                { text: 'tenor/vehicle', outcome: 'Not quite — Students often treat *any* descriptive adjective as imagery (e.g., calling "just and placid".', reveals: 'students-often-treat-any-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Tale of Melon City\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "The Tale of Melon City" where the outcome is the opposite of what was intended.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is starkly different from', outcome: 'Situational irony occurs when the actual outcome of a situation is starkly different from what was.' },
                { text: 'the king is funny', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck.', reveals: 'students-often-confuse-irony-with' },
                { text: 'the arch is too low', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Tale of Melon City\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text without using a dictionary?', options: [
                { text: 'The primary strategy is to use context clues—such as surrounding words, tone, syntax, and', outcome: 'The primary strategy is to use context clues—such as surrounding words, tone, syntax, and the.' },
                { text: 'guess from the first letter', outcome: 'Not quite — Students often think "vocabulary in context" means finding a dictionary definition that fits the.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'skip the word', outcome: 'Not quite — Students often think "vocabulary in context" means finding a dictionary definition that fits the.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Tale of Melon City\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical voice used in the line "The arch was built too low" and name the tense.', options: [
                { text: 'The line uses passive voice in the simple past tense ("was built")', outcome: 'The line uses passive voice in the simple past tense ("was built").' },
                { text: 'active voice', outcome: 'Not quite — Students often treat grammar in poetry as "just the way poems talk" and fail to see that Seth.', reveals: 'students-often-treat-grammar-in' },
                { text: 'past perfect', outcome: 'Not quite — Students often treat grammar in poetry as "just the way poems talk" and fail to see that Seth.', reveals: 'students-often-treat-grammar-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Tale of Melon City\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is directly stated in the text and can be quoted', outcome: 'A literal question\'s answer is directly stated in the text and can be quoted; an inferential.' },
                { text: 'literal means easy, inferential means hard', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and write answers based on personal.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'inferential', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and write answers based on personal.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire workshop you must explain why \'The Tale of Melon City\' feels familiar to anyone who\'s watched a bureaucratic comedy. A teammate says: \'It\'s just a silly fairy tale — a melon on a throne. Don\'t overthink the joke.\'',
            decisions: [{ prompt: 'What\'s the poem actually doing?', options: [
                { text: 'It\'s deliberate satire in the Sufi \'wise fool\' tradition (the \'After Idries Shah\' tag is the clue): a \'just and placid\' king follows procedure so faithfully that blame escalates absurdly until a melon is crowned — exposing systems where rules, pass-the-parcel accountability and appearances matter more than sense or justice.', outcome: 'Context is a prediction tool: knowing the Sufi-tale lineage and Seth\'s deceptively neat couplets tells you the silliness is aimed at real bureaucratic absurdity.' },
                { text: 'The teammate is right — it\'s nonsense verse for children; satire would need sharper targets.', outcome: 'The targets are precise: ministers who shift blame, procedure worship, and citizens who prefer spectacle — the melon is the punchline of a real critique, not whimsy.', reveals: 'melon-city-is-nonsense' },
                { text: 'It\'s pro-order propaganda — the melon king shows that ANY sovereign keeps the peace, which is the point.', outcome: 'That reads the satire as endorsement; the crowd accepting a crowned melon \'as long as they are left in peace\' mocks apathy, not order\'s virtues.', reveals: 'satire-read-as-endorsement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'Sing-song couplets carry a hanging and a crowned melon — the nursery-rhyme form is the joke that makes the satire bite.',
            decisions: [{ prompt: 'What comes next? The Tale of Melon City · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Tale of Melon City · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Tale of Melon City\' — the supporting ideas and motifs.',
          hint: 'If stuck, review c11_eng_s_cbse_05_006 (Primary Theme) and c11_eng_s_cbse_05_002 (Plot).',
          misconception: 'Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as a theme) or treat them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'The Tale of Melon City\'',
                  options: ['Secondary themes in \'The Tale of Melon City\'', '\'The Tale of Melon City\' (Snapshots, ch', 'The plot/narrative arc of \'The Tale of Melon City\'', 'The setting of \'The Tale of Melon City\''],
                  hint: 'If stuck, review c11_eng_s_cbse_05_006 (Primary Theme) and c11_eng_s_cbse_05_002 (Plot).',
                  misconception: 'Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as a theme) or treat them as **minor plot.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Ask the student to write the primary theme as a full sentence.', 'Have them list 3 groups in the poem (King, Ministers, Crowd, Architect, Wise Man).', 'For each group, ask: "What does this group *want*?', 'What *rule* do they follow?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as a theme) or treat them.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The poem\'s endorsement of \'laissez-faire\' principles (\'The principles of laissez faire / Seem to be well-established there\') is the.', answer: 'The statement is false',
                  options: ['The statement is false', 'just and placid', 'as a theme) or treat them as **minor plot points** (e.g', 'irony" as a theme'],
                  hint: 'If stuck, review c11_eng_s_cbse_05_006 (Primary Theme) and c11_eng_s_cbse_05_002 (Plot).',
                  misconception: 'Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as a theme) or treat them as **minor plot.' },
                { id: 'b', prompt: 'Create a 4-line satirical verse (in Vikram Seth\'s couplet style) that introduces a *new* secondary theme for Melon City: **The corruption of language/law**.', answer: '*The King decreed "Justice" with a placid smile,* *While hanging architects for',
                  options: ['*The King decreed "Justice" with a placid smile,* *While hanging architects for', 'as a theme) or treat them as **minor plot points** (e.g', 'irony" as a theme'],
                  hint: 'If stuck, review c11_eng_s_cbse_05_006 (Primary Theme) and c11_eng_s_cbse_05_002 (Plot).',
                  misconception: 'Students often confuse **secondary themes** with **literary devices** (e.g., listing "irony" as a theme) or treat them as **minor plot.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Ask the student to write the primary theme as a full sentence.', 'Have them list 3 groups in the poem (King, Ministers, Crowd, Architect, Wise Man).', 'For each group, ask: "What does this group *want*?', 'What *rule* do they follow?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_008', difficulty: 'standard',
          question: 'Imagery in \'The Tale of Melon City\' — the vivid, sensory language that creates.',
          hint: 'If stuck, review the "Poetic Devices" nodes from Class 6 (c6_english_u1_005.',
          misconception: 'Students often treat *any* descriptive adjective as imagery (e.g., calling "just and placid" imagery) and think.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between *description* and *imagery* using the lines "The workmen went and built the thing" (description) versus "Under the arch he lost.', answer: 'Description states facts neutrally',
                  options: ['Description states facts neutrally', 'description'],
                  hint: 'If stuck, review the "Poetic Devices" nodes from Class 6 (c6_english_u1_005, c6_english_u4_035) for.',
                  misconception: 'Students often treat *any* descriptive adjective as imagery (e.g., calling "just and placid" imagery) and think metaphor *only* exists when.' }
          ],
            remediations: { 'students-often-treat-any-descriptive': { steps: ['Re-read the poem *only* for sensory verbs/nouns: highlight every word implying sight, sound, touch, movement.', 'Make a two-column table: Column A = Abstract Concept (Justice, Wisdom, Authority, Law), Column B = Physical.', 'For each arrow, write one sentence: "Seth makes [Concept] tangible as [Object] to show [Satirical Point]." 4.', 'Practice explaining *why* "quivering" is kinesthetic imagery but "old" is not imagery at all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Tale of Melon City\' — where opposite things are both.',
          hint: 'Review the plot flowchart from c11_eng_s_cbse_05_002 and the King\'s character traits from.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck.',
          parts: [
                { id: 'a', prompt: 'The poem describes the King as "just and placid" in the opening stanza, yet he orders multiple executions.', answer: 'Verbal irony occurs when words state the opposite of what is meant',
                  options: ['Verbal irony occurs when words state the opposite of what is meant', 'the king is actually just'],
                  hint: 'Review the plot flowchart from c11_eng_s_cbse_05_002 and the King\'s character traits from.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' },
                { id: 'b', prompt: 'Identify an instance of dramatic irony in the poem where the reader knows more than the characters, and explain the effect it creates.', answer: 'When the "wisest man" declares the arch must be hanged',
                  options: ['When the "wisest man" declares the arch must be hanged', 'justice system', 'the king doesn\'t know he will die'],
                  hint: 'Review the plot flowchart from c11_eng_s_cbse_05_002 and the King\'s character traits from.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony types, use a three-column table: Column 1 = What is expected/intended (King wants.', 'For symbolism, have them complete: "The [object] stands for [abstract idea] because [textual evidence]." Practice with.', 'Repeat until they can fill all three columns for each device without prompting.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Tale of Melon City\' — the words and phrases you must.',
          hint: 'If stuck, review the Irony and Symbolism node (c11_eng_s_cbse_05_009) to refresh how tone.',
          misconception: 'Students often think "vocabulary in context" means finding a dictionary definition that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Compare the words "just" and "placid" as used in the opening description of the king.', answer: '"Just" implies fairness and legal correctness',
                  options: ['"Just" implies fairness and legal correctness', 'vocabulary in context', 'treats them as consistent traits misses the central satire'],
                  hint: 'If stuck, review the Irony and Symbolism node (c11_eng_s_cbse_05_009) to refresh how tone shifts.',
                  misconception: 'Students often think "vocabulary in context" means finding a dictionary definition that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Have the student re-read only the stanzas containing the target word, ignoring the rest of the poem.', 'Ask: "What is happening right before and after this word?', 'Guide them to list three context clues (tone, action, consequence).', 'Then ask: "If you replace the word with \'calm\' / \'fair\' / \'order\', does the irony disappear?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_011', difficulty: 'standard',
          question: 'Language and style in \'The Tale of Melon City\' — how the writer chose words.',
          hint: 'Review passive voice transformation rules (Class 6 node c6_english_u5_048) and reported.',
          misconception: 'Students often treat grammar in poetry as "just the way poems talk" and fail to see that Seth deliberately chooses.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical voice used in the line "The arch was built too low" and name the tense.', answer: 'The line uses passive voice in the simple past tense ("was built")',
                  options: ['The line uses passive voice in the simple past tense ("was built")', 'active voice', 'past perfect', 'The arch'],
                  hint: 'Review passive voice transformation rules (Class 6 node c6_english_u5_048) and reported speech.',
                  misconception: 'Students often treat grammar in poetry as "just the way poems talk" and fail to see that Seth deliberately chooses passive voice, archaic.' }
          ],
            remediations: { 'students-often-treat-grammar-in': { steps: ['Give the student three short extracts from the poem: one passive, one active imperative, one fragment.', 'Ask them to label voice and sentence type.', 'Provide a modern bureaucratic sentence ("The form must be submitted by 5 p.m.") and ask them to rewrite it in active.', 'Have them read the two versions aloud and discuss which sounds more "official" and why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Tale of Melon City\' — questions answered straight.',
          hint: 'If stuck, review the plot summary (c11_eng_s_cbse_05_002) and character analysis of the.',
          misconception: 'Students treat inferential questions as "opinion questions" and write answers based on personal feelings ("I think the.',
          parts: [
                { id: 'a', prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', answer: 'A literal question\'s answer is directly stated in the text and can be quoted',
                  options: ['A literal question\'s answer is directly stated in the text and can be quoted', 'literal means easy, inferential means hard', 'inferential', 'predictive'],
                  hint: 'If stuck, review the plot summary (c11_eng_s_cbse_05_002) and character analysis of the King.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write answers based on personal feelings ("I think the King was stupid").' },
                { id: 'b', prompt: 'In the poem, the King is described as "just and placid." Is the question "Why does the poet call the King \'just and placid\'?" literal or inferential?', answer: 'It is an inferential question',
                  options: ['It is an inferential question', 'inferential', 'predictive', 'interpretive'],
                  hint: 'If stuck, review the plot summary (c11_eng_s_cbse_05_002) and character analysis of the King.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write answers based on personal feelings ("I think the King was stupid").' },
                { id: 'c', prompt: 'Analyze the following inferential question: "Why do the ministers proclaim \'Long live the King!', answer: 'Clue 1: The ministers say, "Thank Goodness we found someone',
                  options: ['Clue 1: The ministers say, "Thank Goodness we found someone', 'inferential', 'predictive', 'interpretive'],
                  hint: 'If stuck, review the plot summary (c11_eng_s_cbse_05_002) and character analysis of the King.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write answers based on personal feelings ("I think the King was stupid").' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Give the student a two-column table: Column A = literal questions from the poem, Column B = inferential questions.', 'Ask them to sort 10 mixed questions.', 'For each inferential question, require them to fill a three-row template: Clue 1 (quote), Clue 2 (quote), Logical.', 'Practice with a think-aloud: teacher models inferring the King\'s irony using the "just and placid" label, then student.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
