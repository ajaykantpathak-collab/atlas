import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch07_p2: SimDef = {
    id: 'v3_c12_eng_k_ch07_p2',
    title: 'Poems by Milton (Poem) · Part 2/3',
    subtitle: 'The blind poet wrote these poems with perfect sight',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Milton (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch07'],
    nodeIds: ['c12_eng_k_cbse_07_007', 'c12_eng_k_cbse_07_008', 'c12_eng_k_cbse_07_009', 'c12_eng_k_cbse_07_010', 'c12_eng_k_cbse_07_011', 'c12_eng_k_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Renaissance poetry scholar', intro: 'Before the blindness, before the epic — a young Milton was already picking fights with Time itself.', goal: 'Read Milton\'s On Time and On Shakespeare through the right context — a young classicist\'s defiance, not a blind seer\'s hindsight.' },
    discovery: {
        question: 'Milton, the blind poet who dictated Paradise Lost — surely his blindness is the key to \'On Time\' and \'On Shakespeare.\' Is it?',
        options: ['No — both were written around 1630, decades before he lost his sight; the lenses that matter are his classical learning and Puritan worldview', 'Yes — blindness explains everything Milton wrote', 'Only for On Time', 'His blindness was partial anyway'],
        answer: 'No — both were written around 1630, decades before he lost his sight; the lenses that matter are his classical learning and Puritan worldview',
        hook: 'Biography traps readers who don\'t check dates. These are a sighted 22-year-old\'s poems: Time as \'envious\' Cronos devouring its children, hours dragged by a clock\'s \'heavy plummets,\' and Shakespeare needing no monument because his \'easie numbers\' live in readers\' hearts — merit over marble.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas that support or complement the primary theme, often exploring related but distinct aspects of the human experience — such as the contrast between temporal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Milton young: feel time crawl in leaden plummet-steps, hear why the poem calls Time envious, and weigh the claim that a writer\'s true pyramid is built inside his readers.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'ve just identified the main message of a poem — say, "Time is defeated by Eternity." Your teacher then asks, "What else is the poem saying?',
            decisions: [{ prompt: 'List two secondary themes from Milton\'s "On Time".', options: [
                { text: 'Correct answer: The contrast between temporal things (described as \'false and vain\',', outcome: 'Correct answer: The contrast between temporal things (described as \'false and vain\', \'mortal.' },
                { text: 'Time is defeated', outcome: 'Not quite — Students often confuse secondary themes with literary devices (e.g., writing "personification" as.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'personification of Time', outcome: 'Not quite — Students often confuse secondary themes with literary devices (e.g., writing "personification" as.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are scrolling through Instagram and a reel shows a time-lapse of a flower blooming and withering in seconds — you instantly *feel* the rush.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from everyday language (not from the poems).', options: [
                { text: '**Correct answer:** Imagery is descriptive language that appeals to the senses (e.g.,', outcome: '**Correct answer:** Imagery is descriptive language that appeals to the senses (e.g., "The rain.' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — Students often think "identifying" a metaphor or image is the same as "analysing" it.', reveals: 'identifying-a-metaphor-or-image' },
                { text: 'identifying', outcome: 'Not quite — Students often think "identifying" a metaphor or image is the same as "analysing" it.', reveals: 'identifying-a-metaphor-or-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading "On Time" and stumble on "leaden-stepping hours" — you know "lead" is heavy, but why "stepping"?',
            decisions: [{ prompt: 'Define "etymology" and explain why the NCERT note on "entomb\'d" traces it to late Middle English and French origin.', options: [
                { text: 'Etymology is the study of a word\'s historical development, including its origin and', outcome: 'Etymology is the study of a word\'s historical development, including its origin and changes.' },
                { text: 'etymology means dictionary definition', outcome: 'Not quite — Students treat archaic words as "old-fashioned synonyms" — e.g., thinking "conceaving" just means.', reveals: 'students-treat-archaic-words-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE board exam and see a question: "Why does Milton call Time \'envious\' in \'On Time\'?" A literal question would ask "What does.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "According to the poem \'On Time,\' what does Time\'s \'womb\' devour?"', options: [
                { text: 'This is a **literal** comprehension question', outcome: 'This is a **literal** comprehension question. The answer is explicitly stated in lines 5-6: "what.' },
                { text: 'A student who labels this inferential confuses', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any personal interpretation.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any personal interpretation.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A school\'s board debates an expensive marble statue for a beloved retiring teacher versus funding the reading programme she built her life around.',
            decisions: [{ prompt: 'Which honours her — the marble or the work?', options: [
                { text: 'The work — Milton\'s \'On Shakespeare\' argues the true monument is built in transformed readers\' minds; fund what she changed, not what commemorates her.', outcome: 'Shakespeare needs no tomb because his books are the sepulchre; a legacy lives in continued effect, not in stone.' },
                { text: 'The statue — a lasting monument is the only real proof of legacy.', outcome: 'Milton\'s point is precisely that marble is the weaker memorial; people who carry the teaching are the monument.', reveals: 'monument-equals-legacy' },
                { text: 'Neither — legacies are vanity; dissolve the programme and move on.', outcome: 'That confuses humility with erasure; sustaining her work honours her without feeding ego.', reveals: 'legacy-is-vanity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now match the man to the moment — and avoid the exam\'s favourite biographical trap. Milton\'s early poems carry republican fire before the darkness came.',
            decisions: [{ prompt: 'What comes next? Poems by Milton (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poems by Milton (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas that support or complement the.',
          hint: 'If stuck, revisit node 006 (Primary Theme) and practice identifying abstract nouns and.',
          misconception: 'Students often confuse secondary themes with literary devices (e.g., writing "personification" as a theme) or treat.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Milton calls Time \'envious\' and \'greedy\' in "On Time", and how this characterization supports a secondary theme.', answer: 'Correct: Time is personified as envious and greedy',
                  options: ['Correct: Time is personified as envious and greedy', 'personification', 'other topics'],
                  hint: 'If stuck, revisit node 006 (Primary Theme) and practice identifying abstract nouns and contrasts.',
                  misconception: 'Students often confuse secondary themes with literary devices (e.g., writing "personification" as a theme) or treat them as unrelated.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish theme from device, have them list all abstract nouns in both poems (Time, Eternity.', 'Then group them into \'temporal/material\' and \'eternal/spiritual/artistic\' columns.', 'This visual clustering reveals thematic oppositions.', 'Revisit node c12_eng_k_cbse_07_006 (Primary Theme) to see how the primary theme was derived, then practice identifying.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review the "Metaphor Triangle" (tenor, vehicle, ground).',
          misconception: 'Students often think "identifying" a metaphor or image is the same as "analysing" it.',
          parts: [
                { id: 'a', prompt: 'Identify the metaphor in these lines from "On Shakespeare": "Thou in our wonder and astonishment / Hast built thy self a live-long Monument." Then rewrite the.', answer: '**Correct answer:** The metaphor is "built thy self a live-long Monument"',
                  options: ['**Correct answer:** The metaphor is "built thy self a live-long Monument"', 'identifying', 'analysing'],
                  hint: 'If stuck, review the "Metaphor Triangle" (tenor, vehicle, ground) in c11_eng_h_cbse_01_008 Worked.',
                  misconception: 'Students often think "identifying" a metaphor or image is the same as "analysing" it.' },
                { id: 'b', prompt: 'Compare the *visual* imagery of "piled Stones" and "Star-ypointing Pyramid" in "On Shakespeare" with the *organic* imagery of "womb devours" and "greedy self.', answer: '**Correct answer:** "Piled Stones" and "Star-ypointing Pyramid" are static,',
                  options: ['**Correct answer:** "Piled Stones" and "Star-ypointing Pyramid" are static,', 'identifying', 'analysing'],
                  hint: 'If stuck, review the "Metaphor Triangle" (tenor, vehicle, ground) in c11_eng_h_cbse_01_008 Worked.',
                  misconception: 'Students often think "identifying" a metaphor or image is the same as "analysing" it.' }
          ],
            remediations: { 'identifying-a-metaphor-or-image': { steps: ['Revisit **c11_eng_h_cbse_01_008** (Class 11 Imagery and Metaphor) and re-do its Worked Example 2, focusing on the.', 'Take any 4 lines from "On Time," draw a two-column table: **Image/Metaphor** | **Sense/Comparison** | **Thematic.', 'Ask a peer to read your table and ask "So what?" for each row — if you can\'t answer, the analysis is incomplete.', 'Re-attempt Diagnostic Question 4 with this table method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "identifying" a metaphor or image is the same as "analysing" it.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Milton\'s metaphor \'envious Time\' is just personification; it doesn\'t add anything beyond calling Time jealous." Defend or refute.', answer: '**Correct answer:** Refute',
                  options: ['**Correct answer:** Refute', 'identifying', 'analysing'],
                  hint: 'If stuck, review the "Metaphor Triangle" (tenor, vehicle, ground) in c11_eng_h_cbse_01_008 Worked.',
                  misconception: 'Students often think "identifying" a metaphor or image is the same as "analysing" it.' },
                { id: 'b', prompt: 'Write four original lines of poetry that use an *extended metaphor* to describe "Examination Stress" as a *weather system*.', answer: '**Expected criteria:** - Tenor: Examination Stress',
                  options: ['**Expected criteria:** - Tenor: Examination Stress', 'identifying', 'analysing'],
                  hint: 'If stuck, review the "Metaphor Triangle" (tenor, vehicle, ground) in c11_eng_h_cbse_01_008 Worked.',
                  misconception: 'Students often think "identifying" a metaphor or image is the same as "analysing" it.' }
          ],
            remediations: { 'identifying-a-metaphor-or-image': { steps: ['Revisit **c11_eng_h_cbse_01_008** (Class 11 Imagery and Metaphor) and re-do its Worked Example 2, focusing on the.', 'Take any 4 lines from "On Time," draw a two-column table: **Image/Metaphor** | **Sense/Comparison** | **Thematic.', 'Ask a peer to read your table and ask "So what?" for each row — if you can\'t answer, the analysis is incomplete.', 'Re-attempt Diagnostic Question 4 with this table method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning is opposite to the.',
          hint: 'If stuck, review the metaphor analysis in c12_eng_k_cbse_07_008 and practice breaking.',
          misconception: 'Students often confuse irony with mere surprise or coincidence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning is opposite to the literal meaning,',
                  options: ['Irony is a literary device where the intended meaning is opposite to the literal meaning,', '"Before You Read: Context and Background" for Milton\'s poems provides the essential', 'In poetry, plot and narrative structure refers to the organized progression of ideas,', 'Setting in poetry refers to the temporal, spatial, and metaphysical context in'],
                  hint: 'If stuck, review the metaphor analysis in c12_eng_k_cbse_07_008 and practice breaking down "Time".',
                  misconception: 'Students often confuse irony with mere surprise or coincidence.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony from surprise, have them revisit c10_engl_cbse_01_007 (Irony in \'A Letter.', 'Then practice: give three situations (one ironic, one coincidental, one surprising) and ask them to label.', 'For symbolism, go back to c8_engl_ch4_008 (Symbolism of the Cherry Tree) and c10_engl_cbse_03_007 (Symbolism: Flight.', 'Ask them to complete a table: Symbol | Literal Meaning | Abstract Idea | Poem Line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_010', difficulty: 'standard',
          question: 'Vocabulary in context refers to the skill of determining the meaning.',
          hint: 'If stuck on etymology, review Class 9 node c9_engl_ch1_008 (vocabulary from "How I Taught.',
          misconception: 'Students treat archaic words as "old-fashioned synonyms" — e.g., thinking "conceaving" just means "conceiving" with.',
          parts: [
                { id: 'a', prompt: 'The word "Delphic" appears in "On Shakespeare": "Those Delphic lines with deep impression took".', answer: '"Delphic" refers to the Oracle of Delphi',
                  options: ['"Delphic" refers to the Oracle of Delphi', 'Delphic means Greek'],
                  hint: 'If stuck on etymology, review Class 9 node c9_engl_ch1_008 (vocabulary from "How I Taught.',
                  misconception: 'Students treat archaic words as "old-fashioned synonyms" — e.g., thinking "conceaving" just means "conceiving" with an old spelling.' }
          ],
            remediations: { 'students-treat-archaic-words-as': { steps: ['Have the student list 5 archaic words from the poems.', 'For each, use the OED (online) or NCERT etymology note to trace: original language → Middle English form → Milton\'s.', 'Ask: "What physical action or image does the root word evoke?" (e.g., *entomb* → *tombe* (tomb) → putting in a tomb).', 'Re-read the line substituting the literal root image ("put in a tomb" for "entomb\'d") and discuss how the metaphor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_011', difficulty: 'standard',
          question: 'Language usage in poetry refers to the deliberate grammatical, syntactic, and.',
          hint: 'If stuck, review "Subject-Verb Agreement" and "Pronoun Case" from Class 9-10 grammar.',
          misconception: 'Students treat archaic forms (\'thou\', \'hast\', \'dost\', \'-d\' contractions) as interchangeable "old-timey" decoration.',
          parts: [
                { id: 'a', prompt: 'Explain why Milton writes "entomb\'d" and "consum\'d" with apostrophes instead of "entombed" and "consumed" in "On Time".', answer: 'The apostrophes mark poetic elision',
                  options: ['The apostrophes mark poetic elision', 'it\'s just old spelling'],
                  hint: 'If stuck, review "Subject-Verb Agreement" and "Pronoun Case" from Class 9-10 grammar, then practice.',
                  misconception: 'Students treat archaic forms (\'thou\', \'hast\', \'dost\', \'-d\' contractions) as interchangeable "old-timey" decoration, ignoring that they form.' }
          ],
            remediations: { 'students-treat-archaic-forms-thou': { steps: ['Have the student list every \'odd\' word in both poems in a two-column table: Column A = word, Column B = modern.', 'Group Column A words by category (pronoun, verb ending, contraction, spelling).', 'For each group, state the grammatical rule (e.g., "thou + verb-st = 2nd person singular present").', 'Re-read "On Time" aloud, tapping the meter, and note where elisions (\'entomb\'d\') preserve the iambic beat.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck on parsing syntax: revisit c12_eng_k_cbse_07_011 (Grammar).',
          misconception: 'Students believe inferential questions are "opinion questions" where any personal interpretation is valid.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "According to the poem \'On Time,\' what does Time\'s \'womb\' devour?"', answer: 'This is a **literal** comprehension question',
                  options: ['This is a **literal** comprehension question', 'A student who labels this inferential confuses', 'opinion questions', 'any question requiring a sentence-length answer is inferential'],
                  hint: 'If stuck on parsing syntax: revisit c12_eng_k_cbse_07_011 (Grammar).',
                  misconception: 'Students believe inferential questions are "opinion questions" where any personal interpretation is valid.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['If a student cannot distinguish literal from inferential questions: (1) Give them 5 questions from the NCERT.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
