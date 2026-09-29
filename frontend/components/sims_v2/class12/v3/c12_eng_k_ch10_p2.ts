import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch10_p2: SimDef = {
    id: 'v3_c12_eng_k_ch10_p2',
    title: 'Emily Dickinson (Poem) · Part 2/3',
    subtitle: 'Fewer than a dozen poems published — 1,789 left in a drawer',
    classLevel: 12, subject: 'eng_k', topic: 'Emily Dickinson (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch10'],
    nodeIds: ['c12_eng_k_cbse_10_007', 'c12_eng_k_cbse_10_008', 'c12_eng_k_cbse_10_009', 'c12_eng_k_cbse_10_010', 'c12_eng_k_cbse_10_011', 'c12_eng_k_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'American poetry reader', intro: 'A recluse in Amherst wrote poems too strange for her century — and they turned out to be built, not broken.', goal: 'Read Dickinson\'s Trees through her signature style — dashes, capitals, compressed imagery — and her observational precision.' },
    discovery: {
        question: 'Dickinson writes \'The Trees like Tassels hit – and – swung –\' with dashes where commas belong and capitals mid-sentence. Error, or instrument?',
        options: ['Instrument — the dashes mime the trees\' jerky swing and the capitals turn Sun and Summer into persons with Estates of Cloud', 'Errors — she needed an editor', 'Random habit', 'Old-fashioned grammar rules'],
        answer: 'Instrument — the dashes mime the trees\' jerky swing and the capitals turn Sun and Summer into persons with Estates of Cloud',
        hook: 'She published barely a dozen poems alive; 1,789 surfaced after — written for herself, never flattened by a publisher. Recluse doesn\'t mean unobservant: \'A Bird sat careless on the fence\' is precision, not fantasy. The strangeness is the point.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Trees\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Decode Dickinson\'s fingerprint: wield her dashes and capitals as reading tools, then prove that a woman at one window watched nature more closely than most travellers.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Trees\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'List two secondary themes present in Emily Dickinson\'s poem "Trees" (Kaleidoscope Ch. 10) based on your reading.', options: [
                { text: 'Correct answer: Any two of: (1) Nature as music/harmony ("Psalteries of Summer," "Tune', outcome: 'Correct answer: Any two of: (1) Nature as music/harmony ("Psalteries of Summer," "Tune from.' },
                { text: 'rhyme scheme', outcome: 'Not quite — Students routinely confuse **literary devices** (personification, metaphor, allusion) with.', reveals: 'students-routinely-confuse-literary-devices' },
                { text: 'the season of summer', outcome: 'Not quite — Students routinely confuse **literary devices** (personification, metaphor, allusion) with.', reveals: 'students-routinely-confuse-literary-devices' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Trees\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor, and which one does Dickinson primarily use in the line "The Trees like Tassels hit.', options: [
                { text: 'A simile uses "like" or "as" to compare', outcome: 'A simile uses "like" or "as" to compare; a metaphor states the comparison directly without those.' },
                { text: 'it\'s just a simile', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and.', reveals: 'students-often-treat-imagery-and' },
                { text: 'Himself', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Trees\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "Psalteries of Summer" in the poem, and what musical instrument does a psaltery resemble?', options: [
                { text: 'A psaltery is an ancient stringed instrument similar to a dulcimer or zither', outcome: 'A psaltery is an ancient stringed instrument similar to a dulcimer or zither; "Psalteries.' },
                { text: 'type of flower', outcome: 'Not quite — Students often confuse symbolism with metaphor, writing "The Sun is a metaphor for God" or "The.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'a poetic word for sunshine', outcome: 'Not quite — Students often confuse symbolism with metaphor, writing "The Sun is a metaphor for God" or "The.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Trees\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary meaning of the word "Tassels" as used in the opening line "The Trees like Tassels hit – and – swung –"?', options: [
                { text: 'In this context, "Tassels" refers to the hanging, fringe-like clusters of leaves or', outcome: 'In this context, "Tassels" refers to the hanging, fringe-like clusters of leaves or flowers.' },
                { text: 'decorative cords on curtains', outcome: 'Not quite — Students treat "Vocabulary in Context" as "look up the dictionary definition of hard words." They.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'hit – and – swung –', outcome: 'Not quite — Students treat "Vocabulary in Context" as "look up the dictionary definition of hard words." They.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Trees\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What are two unconventional grammatical features Emily Dickinson uses in "Trees" that differ from standard English conventions?', options: [
                { text: 'Correct answer: (1) Capitalization of common nouns (e.g., "Trees", "Tassels", "Sun",', outcome: 'Correct answer: (1) Capitalization of common nouns (e.g., "Trees", "Tassels", "Sun", "Bird".' },
                { text: 'she uses rhyme', outcome: 'Not quite — Students often think Dickinson\'s capitalization is "old-fashioned" or "random poetic license".', reveals: 'dickinson-s-capitalization-is-old' },
                { text: 'she uses metaphors', outcome: 'Not quite — Students often think Dickinson\'s capitalization is "old-fashioned" or "random poetic license".', reveals: 'dickinson-s-capitalization-is-old' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Trees\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question when applied to a poem?', options: [
                { text: 'A literal question asks for information directly stated in the poem (e.g., "What does the', outcome: 'A literal question asks for information directly stated in the poem (e.g., "What does the Sun do.' },
                { text: 'questions about the poem', outcome: 'Not quite — Students believe inferential questions are "guessing what the poet meant" and therefore any.', reveals: 'inferential-questions-are-guessing-what' },
                { text: 'guessing what the poet meant', outcome: 'Not quite — Students believe inferential questions are "guessing what the poet meant" and therefore any.', reveals: 'inferential-questions-are-guessing-what' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Editing a young poet\'s manuscript, a colleague wants to strip out all her odd dashes and strange capitalisations \'to fix the grammar before we publish\'.',
            decisions: [{ prompt: 'Correct the strangeness or keep it?', options: [
                { text: 'Keep it until proven decorative — Dickinson\'s dashes and capitals aren\'t errors but tools that hold pauses and double meanings; \'fixing\' them flattens the poem.', outcome: 'Before editing style into compliance, ask what the oddity is doing — in Dickinson the form carries the meaning.' },
                { text: 'Fix it — standard grammar exists so readers aren\'t confused.', outcome: 'That treats deliberate prosodic choice as a mistake; her compressed strangeness is the precision.', reveals: 'unconventionality-is-error' },
                { text: 'Publish it, but note she\'s a recluse so expect the work to be small and private anyway.', outcome: 'Her window-narrow life produced startlingly universal poems; biography doesn\'t bound imagination.', reveals: 'isolation-means-narrowness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the strangest punctuation in English poetry as deliberate music — and defend private genius against the myth of the madwoman.',
            decisions: [{ prompt: 'What comes next? Emily Dickinson (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Emily Dickinson (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes in \'Trees\' — the supporting ideas and motifs that deepen the.',
          hint: 'If stuck, return to the Primary Theme node (c12_eng_k_cbse_10_006) and re-do its Worked.',
          misconception: 'Students routinely confuse **literary devices** (personification, metaphor, allusion) with **secondary themes**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Trees\'',
                  options: ['Secondary themes in \'Trees\'', '\'Trees\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Trees\'', 'The setting of \'Trees\''],
                  hint: 'If stuck, return to the Primary Theme node (c12_eng_k_cbse_10_006) and re-do its Worked Example 1.',
                  misconception: 'Students routinely confuse **literary devices** (personification, metaphor, allusion) with **secondary themes**.' }
          ],
            remediations: { 'students-routinely-confuse-literary-devices': { steps: ['If a student lists devices instead of themes: (1) Have them complete this sentence frame for *each* device they found.', '(3) Then ask: "Which of these completed sentences could stand alone as a truth the poem explores?" Those are the themes.', '(4) Re-attempt Diagnostic Question 1 & 2 after this drill.', 'If they still conflate, revisit **c12_eng_k_cbse_10_006** (Primary Theme) to re-establish the theme/device distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_008', difficulty: 'standard',
          question: 'Imagery in \'Trees\' — the vivid, sensory language that creates word-pictures.',
          hint: 'Review the "metaphor dissection" steps in ON_FAILURE using a familiar Class 11 poem.',
          misconception: 'Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and labelled, rather than.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a simile and a metaphor, and which one does Dickinson primarily use in the line "The Trees like Tassels hit – and – swung –"?', answer: 'A simile uses "like" or "as" to compare',
                  options: ['A simile uses "like" or "as" to compare', 'it\'s just a simile', 'Himself', 'Estates of Cloud'],
                  hint: 'Review the "metaphor dissection" steps in ON_FAILURE using a familiar Class 11 poem (e.g., "The.',
                  misconception: 'Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and labelled, rather than as the *thinking.' },
                { id: 'b', prompt: 'In the stanza "The Sun shone whole at intervals – / Then Half – then utter hid – / As if Himself were optional / And had Estates of Cloud / Sufficient.', answer: 'The metaphor is "Estates of Cloud"',
                  options: ['The metaphor is "Estates of Cloud"', 'optional', 'Estates of Cloud', 'Eternally from view'],
                  hint: 'Review the "metaphor dissection" steps in ON_FAILURE using a familiar Class 11 poem (e.g., "The.',
                  misconception: 'Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and labelled, rather than as the *thinking.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['If a student cannot move beyond labelling, take them through a "metaphor dissection" on a single line: (1) Copy the.', '(2) Draw two columns: TENOR (what\'s being described) and VEHICLE (the image used).', '(3) List 3 qualities of the vehicle.', '(4) For each quality, write: "This suggests the tenor is ______." (5) Combine into one sentence: "By comparing [tenor].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and labelled, rather than.',
          parts: [
                { id: 'a', prompt: 'The poem ends: "\'Twas more – I cannot mention – / How mean – to those that see / Vandyke\'s Delineation / Of Nature\'s – Summer Day!" Evaluate whether Dickinson.', answer: 'Dickinson claims direct experience surpasses both',
                  options: ['Dickinson claims direct experience surpasses both', 'she says poetry is better than painting', 'cannot mention', 'those that see'],
                  hint: 'Review the "metaphor dissection" steps in ON_FAILURE using a familiar Class 11 poem (e.g., "The.',
                  misconception: 'Students often treat imagery and metaphor as decorative "figures of speech" to be spotted and labelled, rather than as the *thinking.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['If a student cannot move beyond labelling, take them through a "metaphor dissection" on a single line: (1) Copy the.', '(2) Draw two columns: TENOR (what\'s being described) and VEHICLE (the image used).', '(3) List 3 qualities of the vehicle.', '(4) For each quality, write: "This suggests the tenor is ______." (5) Combine into one sentence: "By comparing [tenor].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Trees\' — where opposite things are both true, or meaning.',
          hint: 'If stuck, review the "metaphor vs. symbol" distinction in c12_eng_k_cbse_10_008 and the.',
          misconception: 'Students often confuse symbolism with metaphor, writing "The Sun is a metaphor for God" or "The flowers are a metaphor.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "Psalteries of Summer" in the poem, and what musical instrument does a psaltery resemble?', answer: 'A psaltery is an ancient stringed instrument similar to a dulcimer or zither',
                  options: ['A psaltery is an ancient stringed instrument similar to a dulcimer or zither', 'type of flower', 'a poetic word for sunshine', 'The Sun is a metaphor for God'],
                  hint: 'If stuck, review the "metaphor vs. symbol" distinction in c12_eng_k_cbse_10_008 and the situational.',
                  misconception: 'Students often confuse symbolism with metaphor, writing "The Sun is a metaphor for God" or "The flowers are a metaphor for hope.".' },
                { id: 'b', prompt: 'Explain in your own words why the speaker calls Vandyke\'s painting "mean" compared to the actual summer day.', answer: '"Mean" here means paltry, inadequate, or inferior',
                  options: ['"Mean" here means paltry, inadequate, or inferior', 'the painting is rude', 'the speaker dislikes art', 'The Sun is a metaphor for God'],
                  hint: 'If stuck, review the "metaphor vs. symbol" distinction in c12_eng_k_cbse_10_008 and the situational.',
                  misconception: 'Students often confuse symbolism with metaphor, writing "The Sun is a metaphor for God" or "The flowers are a metaphor for hope.".' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Re-read the poem aloud, circling every capitalised word and dash.', 'Revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) to distinguish metaphor (direct comparison) from symbol.', 'Practice: take one symbol (e.g., "Snake") and brainstorm 5 abstract ideas it *could* represent without choosing one.', 'Re-attempt Diagnostic Questions 3 and 4, writing a 3-sentence explanation for each that uses the phrase "suggests".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Trees\' — the words and phrases you must know to read the.',
          hint: 'Review "Context Clue Types" from c11_eng_h_cbse_10_010; practice on a simple prose.',
          misconception: 'Students treat "Vocabulary in Context" as "look up the dictionary definition of hard words." They write: "Psaltery:.',
          parts: [
                { id: 'a', prompt: 'Compare the usage of "Estates" in "had Estates of Cloud" (line 12) with its conventional legal/property meaning.', answer: 'Conventionally, "estates" means landed property owned by a person',
                  options: ['Conventionally, "estates" means landed property owned by a person', 'clouds covering the sun', 'whim of His', 'Vandyke'],
                  hint: 'Review "Context Clue Types" from c11_eng_h_cbse_10_010; practice on a simple prose passage first.',
                  misconception: 'Students treat "Vocabulary in Context" as "look up the dictionary definition of hard words." They write: "Psaltery: a musical instrument.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student re-read the specific stanza containing the target word aloud, twice.', 'Ask: "What is the *subject* doing?', 'What *sense* is appealed to (sight, sound, touch)?', 'What *comparison* (simile/metaphor) is active?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_011', difficulty: 'standard',
          question: 'Language and style in \'Trees\' — how the writer chose words, sentences and tone.',
          hint: 'If stuck, review Class 6-8 grammar nodes on sentence structure (c6_english_u4_038).',
          misconception: 'Students often think Dickinson\'s capitalization is "old-fashioned" or "random poetic license" — they write "Dickinson.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'Trees\'',
                  options: ['Language and style in \'Trees\'', '\'Trees\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Trees\'', 'The setting of \'Trees\''],
                  hint: 'If stuck, review Class 6-8 grammar nodes on sentence structure (c6_english_u4_038), punctuation.',
                  misconception: 'Students often think Dickinson\'s capitalization is "old-fashioned" or "random poetic license" — they write "Dickinson capitalizes nouns.' }
          ],
            remediations: { 'dickinson-s-capitalization-is-old': { steps: ['If the student holds this misconception: (1) Give them two columns: "Capitalized nouns" vs "Non-capitalized nouns" from.', 'Have them hypothesize the semantic rule.', '(2) Show a standard 19th-century prose excerpt (e.g., from a Dickens novel) to prove common nouns weren\'t.', '(3) Ask: "Why \'Sun\' but not \'Cloud\'?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Trees\' — questions answered straight from the text.',
          hint: 'Review Class 11 Comprehension node (c11_eng_h_cbse_01_012) and the Vocabulary node.',
          misconception: 'Students believe inferential questions are "guessing what the poet meant" and therefore any subjective answer.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "The Trees like Tassels hit – and – swung –" appears.', answer: 'This is an inferential statement',
                  options: ['This is an inferential statement', 'literal', 'guessing what the poet meant'],
                  hint: 'Review Class 11 Comprehension node (c11_eng_h_cbse_01_012) and the Vocabulary node.',
                  misconception: 'Students believe inferential questions are "guessing what the poet meant" and therefore any subjective answer is acceptable.' },
                { id: 'b', prompt: 'Answer this inferential question using the PEEL structure: "What does the phrase \'Psalteries of Summer\' suggest about the sounds of the season?" (Hint:.', answer: '**Point:** The phrase suggests the sounds of summer are musical, delicate, and',
                  options: ['**Point:** The phrase suggests the sounds of summer are musical, delicate, and', 'guessing what the poet meant'],
                  hint: 'Review Class 11 Comprehension node (c11_eng_h_cbse_01_012) and the Vocabulary node.',
                  misconception: 'Students believe inferential questions are "guessing what the poet meant" and therefore any subjective answer is acceptable.' },
                { id: 'c', prompt: 'Compare the literal description of the Sun in stanza 3 ("The Sun shone whole at intervals — Then Half — then utter hid —") with the inferential portrayal.', answer: 'The literal description records observed changes: full sun, half sun, hidden sun',
                  options: ['The literal description records observed changes: full sun, half sun, hidden sun', 'The sun hides behind clouds', 'guessing what the poet meant'],
                  hint: 'Review Class 11 Comprehension node (c11_eng_h_cbse_01_012) and the Vocabulary node.',
                  misconception: 'Students believe inferential questions are "guessing what the poet meant" and therefore any subjective answer is acceptable.' }
          ],
            remediations: { 'inferential-questions-are-guessing-what': { steps: ['If a student cannot distinguish literal from inferential or cannot support inferences with evidence: (1) Give them.', 'Ask: "Underline everything the poet *says directly* (literal).', 'Circle everything you *conclude* (inferential)." (2) For each circled inference, demand: "Which underlined words made.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
