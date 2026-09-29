import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch16_p2: SimDef = {
    id: 'v3_c11_eng_w_ch16_p2',
    title: 'For Elkana (Poem) · Part 2/3',
    subtitle: 'Read a family evening where the silences are part of the plot.',
    classLevel: 11, subject: 'eng_w', topic: 'For Elkana (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch16'],
    nodeIds: ['c11_eng_w_cbse_16_007', 'c11_eng_w_cbse_16_008', 'c11_eng_w_cbse_16_009', 'c11_eng_w_cbse_16_010', 'c11_eng_w_cbse_16_011', 'c11_eng_w_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a quiet observer on a lawn at dusk', intro: 'Chairs dragged onto a lawn, a wife\'s grievance, a son\'s demand for dinner — ordinary speech doing the work of poetry.', goal: 'Read understatement and ellipsis as narrative tools in a domestic poem.' },
    discovery: {
        question: 'The title says \'For Elkana\' — a biblical patriarch, or someone closer to home?',
        options: ['Ezekiel\'s own son — the dedication signals a personal, domestic scene, not scripture', 'Elkanah, father of Samuel — expect a religious poem', 'A pseudonym the poet used for himself', 'A character from a Marathi folk tale'],
        answer: 'Ezekiel\'s own son — the dedication signals a personal, domestic scene, not scripture',
        hook: 'Ezekiel\'s surname invites the biblical guess; the poem is actually an April evening, a wife\'s complaint, and a small boy changing the weather of a marriage.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'For Elkana\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_16_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark where each stanza shifts the \'camera\' across a family evening, then decide if \'We rise and go into the house\' closes the story or just pauses a ritual.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'For Elkana\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of poetry analysis and distinguish it from a literary device.', options: [
                { text: 'A secondary theme is a recurring idea that supports or complicates the primary theme,', outcome: 'A secondary theme is a recurring idea that supports or complicates the primary theme, expressed.' },
                { text: 'capitalisation', outcome: 'Not quite — Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme,".', reveals: 'students-often-treat-secondary-themes' },
                { text: 'understatement', outcome: 'Not quite — Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme,".', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'For Elkana\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, and give one example of each from the opening five lines of "For Elkana."', options: [
                { text: 'Imagery: "warm April evening" (thermal/tactile), "breezes sauntering"', outcome: 'Imagery: "warm April evening" (thermal/tactile), "breezes sauntering" (kinesthetic/visual), "stone.' },
                { text: 'chairs', outcome: 'Not quite — Students treat imagery as decorative "word-painting" and metaphor as a simple "A = B" equation.', reveals: 'students-treat-imagery-as-decorative' },
                { text: 'sauntering', outcome: 'Not quite — Students treat imagery as decorative "word-painting" and metaphor as a simple "A = B" equation.', reveals: 'students-treat-imagery-as-decorative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'For Elkana\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "For Elkana" where the outcome contradicts the characters\' stated intentions.', options: [
                { text: 'Situational irony occurs when actions produce an outcome opposite to what was intended', outcome: 'Situational irony occurs when actions produce an outcome opposite to what was intended.' },
                { text: 'unusual rapport', outcome: 'Not quite — Students often equate irony in "For Elkana" with sarcasm or humor alone, missing that Ezekiel\'s.', reveals: 'students-often-equate-irony-in' },
                { text: 'Children Must be Disciplined', outcome: 'Not quite — Students often equate irony in "For Elkana" with sarcasm or humor alone, missing that Ezekiel\'s.', reveals: 'students-often-equate-irony-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'For Elkana\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary meaning of the word "sauntering" as used in the opening line "tempts us to the breezes sauntering across the lawn"?', options: [
                { text: '**Answer:** "Sauntering" means walking in a slow, relaxed, leisurely manner', outcome: '**Answer:** "Sauntering" means walking in a slow, relaxed, leisurely manner.' },
                { text: 'blowing strongly', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the definition from the sentence." They treat.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'moving quickly', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the definition from the sentence." They treat.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'For Elkana\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the primary tense used in the narration of "For Elkana" and quote one verb from the first stanza that exemplifies it.', options: [
                { text: 'The primary tense is the simple present tense (e.g., "tempts," "drag," "plant," "sit,"', outcome: 'The primary tense is the simple present tense (e.g., "tempts," "drag," "plant," "sit," "sprawl").' },
                { text: 'historic present', outcome: 'Not quite — Students believe that "grammar in poetry" means identifying parts of speech (nouns, verbs).', reveals: 'grammar-in-poetry-means-identifying' },
                { text: 'grammar in poetry', outcome: 'Not quite — Students believe that "grammar in poetry" means identifying parts of speech (nouns, verbs).', reveals: 'grammar-in-poetry-means-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'For Elkana\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the literal meaning of the line "Unevenly, to sit or rather sprawl in silence till the words begin to come"?', options: [
                { text: 'The line literally describes the physical action of the husband and wife dragging chairs', outcome: 'The line literally describes the physical action of the husband and wife dragging chairs down stone.' },
                { text: 'It shows their marital discord', outcome: 'Not quite — Students believe inferential questions have "no right answer" because they\'re "just opinions." They.', reveals: 'inferential-questions-have-no-right' },
                { text: 'no right answer', outcome: 'Not quite — Students believe inferential questions have "no right answer" because they\'re "just opinions." They.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your study group is annotating Ezekiel\'s \'For Elkana\'. One member insists Elkana must be Elkanah, the biblical father of Samuel, so the poem \'must be religious.\' Another says \'nothing happens — it\'s just people at dinner.\'',
            decisions: [{ prompt: 'How do you correct both readings at once?', options: [
                { text: 'Show that Elkana is Ezekiel\'s own son — the dedication signals a personal, autobiographical scene of Indian middle-class family life on an April evening. And plenty happens: Ezekiel compresses a short-story arc into the stanzas — the wife\'s complaint, the husband\'s retreat into thought, the son\'s logical performance shifting the dynamic — using understatement and gaps the reader fills.', outcome: 'Both fixes come from the same skill: treating context and stanza structure as interpretive lenses, not trivia — domestic bickering becomes art.' },
                { text: 'Go with the biblical reading — Ezekiel\'s name is biblical and Indian English poetry often uses mythology.', outcome: 'The poet\'s own notes name his son; overgeneralising from the surname and other syllabus poems produces a religious poem that isn\'t on the page.', reveals: 'elkana-is-biblical' },
                { text: 'Agree nothing happens — it\'s a static slice of domestic description.', outcome: 'The narrative runs on mental events and ellipsis: the wife\'s unspoken \'Children Must be Disciplined\', the husband\'s internal monologue, the son\'s speech — the plot is in the structure, not visible action.', reveals: 'domestic-poem-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'The couple came down the stone steps; they rise and go back in — the quarrel was never an event, it\'s the evening itself.',
            decisions: [{ prompt: 'What comes next? For Elkana (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — For Elkana (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_007', difficulty: 'standard',
          question: 'Secondary themes in \'For Elkana\' — the supporting ideas and motifs that deepen.',
          hint: 'If stuck, review the primary theme mind-map from node 006 and the character trait tables.',
          misconception: 'Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme," "capitalisation.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the "idyllic" and the "pedestrian" are juxtaposed in the poem\'s opening stanza, and state what secondary theme this contrast.', answer: 'The "idyllic" is the warm April evening with breezes on the lawn',
                  options: ['The "idyllic" is the warm April evening with breezes on the lawn', 'it shows the house is old', 'only describes the setting without naming the theme (e'],
                  hint: 'If stuck, review the primary theme mind-map from node 006 and the character trait tables from nodes.',
                  misconception: 'Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme," "capitalisation is a theme") because.' },
                { id: 'b', prompt: 'Apply the concept of "unspoken rapport" to analyse the moment when the wife and husband think "Children Must be Disciplined." What does the capitalisation.', answer: 'The capitalisation mimics a formal rule or commandment, ironically elevating a',
                  options: ['The capitalisation mimics a formal rule or commandment, ironically elevating a', 'it shows they are angry'],
                  hint: 'If stuck, review the primary theme mind-map from node 006 and the character trait tables from nodes.',
                  misconception: 'Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme," "capitalisation is a theme") because.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student re-read the poem and highlight every moment where an action or line does *double duty* (e.g., the.', 'Ask: "What idea connects these double-duty moments?" Guide them to phrase it as a noun phrase (e.g., "avoidance.', 'Provide a two-column table: Column A = Device/Detail (capitalisation, child\'s logic, laughter); Column B = Theme.', 'Finally, ask the student to write one sentence per secondary theme using the formula: "Through [device/detail], the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme," "capitalisation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the poem\'s resolution — "My wife\'s delightful laughter / holds the three of us together" — in conveying the secondary theme.', answer: 'The laughter is effective',
                  options: ['The laughter is effective', 'yes, the theme would still be there', 'holds the three of us together'],
                  hint: 'If stuck, review the primary theme mind-map from node 006 and the character trait tables from nodes.',
                  misconception: 'Students often treat secondary themes as a checklist of literary devices (e.g., "irony is a theme," "capitalisation is a theme") because.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student re-read the poem and highlight every moment where an action or line does *double duty* (e.g., the.', 'Ask: "What idea connects these double-duty moments?" Guide them to phrase it as a noun phrase (e.g., "avoidance.', 'Provide a two-column table: Column A = Device/Detail (capitalisation, child\'s logic, laughter); Column B = Theme.', 'Finally, ask the student to write one sentence per secondary theme using the formula: "Through [device/detail], the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_008', difficulty: 'standard',
          question: 'Imagery in \'For Elkana\' — the vivid, sensory language that creates.',
          hint: 'Review "identifying sensory details" and "metaphor vs. simile" from Class 10 poetry nodes.',
          misconception: 'Students treat imagery as decorative "word-painting" and metaphor as a simple "A = B" equation.',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor in your own words, and give one example of each from the opening five lines of "For Elkana."', answer: 'Imagery: "warm April evening" (thermal/tactile), "breezes sauntering"',
                  options: ['Imagery: "warm April evening" (thermal/tactile), "breezes sauntering"', 'chairs', 'sauntering', 'Children Must be Disciplined'],
                  hint: 'Review "identifying sensory details" and "metaphor vs. simile" from Class 10 poetry nodes.',
                  misconception: 'Students treat imagery as decorative "word-painting" and metaphor as a simple "A = B" equation.' },
                { id: 'b', prompt: 'The poem states: "Her voice crawls up and down the lawn." Explain why this is a metaphor and not a simile, and what the verb "crawls" suggests about the wife\'s.', answer: 'It is a metaphor',
                  options: ['It is a metaphor', 'Crawls', 'behind my eyes', 'it\'s a simile because it compares voice to crawling'],
                  hint: 'Review "identifying sensory details" and "metaphor vs. simile" from Class 10 poetry nodes.',
                  misconception: 'Students treat imagery as decorative "word-painting" and metaphor as a simple "A = B" equation.' }
          ],
            remediations: { 'students-treat-imagery-as-decorative': { steps: ['Return to the text with three highlighters: one for each sense (visual/tactile, auditory, kinesthetic/organic).', 'For each marked word, write in the margin: "What does this *do*?', '(reveals character / builds tension / creates irony)." 3.', 'List every comparison without "like/as" — include noun-metaphors ("logician"), verb-metaphors ("crawls"), and implied.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_009', difficulty: 'standard',
          question: 'Irony and paradox in \'For Elkana\' — where opposite things are both true,.',
          hint: 'If stuck, review "voice crawls up and down the lawn" (c11_eng_w_cbse_16_008 metaphor.',
          misconception: 'Students often equate irony in "For Elkana" with sarcasm or humor alone, missing that Ezekiel\'s irony is *structural*.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of verbal irony to the father\'s internal monologue: "I turn towards the more attractive view that opens up behind my eyes and shuts her out.".', answer: 'The father *says* (internally) he is choosing a "more attractive view"',
                  options: ['The father *says* (internally) he is choosing a "more attractive view"', 'he is admiring the lawn'],
                  hint: 'If stuck, review "voice crawls up and down the lawn" (c11_eng_w_cbse_16_008 metaphor analysis) and.',
                  misconception: 'Students often equate irony in "For Elkana" with sarcasm or humor alone, missing that Ezekiel\'s irony is *structural* — the poem\'s.' }
          ],
            remediations: { 'students-often-equate-irony-in': { steps: ['Re-read the poem *only* for the father\'s internal monologues (stanzas 1, 3, 5) — highlight where his thoughts.', 'List every concrete object mentioned (window-pane, chairs, lawn, chin, finger, dinner, five minutes, laughter, house).', 'For each, ask: "Does this appear at a turning point?', 'Does it carry emotional weight beyond utility?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_010', difficulty: 'standard',
          question: 'Key vocabulary of \'For Elkana\' — the words and phrases you must know to read.',
          hint: 'If stuck, review **c11_eng_w_cbse_16_009 (Literary Devices: Irony and Symbolism)**.',
          misconception: 'Students believe "vocabulary in context" means "guess the definition from the sentence." They treat the poem as a cloze.',
          parts: [
                { id: 'a', prompt: 'What is the primary meaning of the word "sauntering" as used in the opening line "tempts us to the breezes sauntering across the lawn"?', answer: '**Answer:** "Sauntering" means walking in a slow, relaxed, leisurely manner',
                  options: ['**Answer:** "Sauntering" means walking in a slow, relaxed, leisurely manner', 'blowing strongly', 'moving quickly', 'warm April evening'],
                  hint: 'If stuck, review **c11_eng_w_cbse_16_009 (Literary Devices: Irony and Symbolism)**, specifically.',
                  misconception: 'Students believe "vocabulary in context" means "guess the definition from the sentence." They treat the poem as a cloze test: find synonym.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['**Re-read the specific stanza aloud** three times: once for literal action, once for tone of voice (imagine the.', '**Circle the target word** and draw arrows to 3 surrounding words/phrases that "pull" its meaning away from the.', '**Complete this stem:** "The poet uses [word] instead of [expected word] because ______." (e.g., "uses \'bastard\'.', '**Write one PEEL paragraph** using this structure: Point (word\'s contextual meaning), Evidence (quoted phrase.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_011', difficulty: 'standard',
          question: 'Language and style in \'For Elkana\' — how the writer chose words, sentences and.',
          hint: 'Review Class 10 Grammar: "Sentence Structure and Types" (simple, compound, complex.',
          misconception: 'Students believe that "grammar in poetry" means identifying parts of speech (nouns, verbs) or spotting errors.',
          parts: [
                { id: 'a', prompt: 'Locate one example of an imperative sentence spoken by a character in the poem.', answer: 'Example: "Wait," spoken by the wife (mother) to the son',
                  options: ['Example: "Wait," spoken by the wife (mother) to the son', 'I want my dinner', 'grammar in poetry'],
                  hint: 'Review Class 10 Grammar: "Sentence Structure and Types" (simple, compound, complex, fragments) and.',
                  misconception: 'Students believe that "grammar in poetry" means identifying parts of speech (nouns, verbs) or spotting errors.' }
          ],
            remediations: { 'grammar-in-poetry-means-identifying': { steps: ['Have the student read the poem aloud, physically pausing at every line break and punctuation mark, to "hear" the.', 'Give them a "standardized" prose version of Stanza 1 (corrected to full sentences, past tense, no fragments) and ask.', 'Provide a checklist of grammatical features (Tense, Sentence Completeness, Punctuation, Capitalization, Mood) and have.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_012', difficulty: 'standard',
          question: 'Literal comprehension of \'For Elkana\' — questions answered straight from the.',
          hint: 'If stuck, review c11_eng_w_cbse_16_002 (Plot and Narrative Structure) and create.',
          misconception: 'Students believe inferential questions have "no right answer" because they\'re "just opinions." They treat inference.',
          parts: [
                { id: 'a', prompt: 'Apply the literal/inferential distinction to answer: "What does the wife comment on?" (literal) and "Why does the husband not dispute her?" (inferential).', answer: 'Literal: She comments on "a broken window-pane" (explicit)',
                  options: ['Literal: She comments on "a broken window-pane" (explicit)', 'he loves her', 'no right answer', 'just opinions'],
                  hint: 'If stuck, review c11_eng_w_cbse_16_002 (Plot and Narrative Structure) and create a 6-panel.',
                  misconception: 'Students believe inferential questions have "no right answer" because they\'re "just opinions." They treat inference as guesswork rather.' },
                { id: 'b', prompt: 'Analyze how the capitalization in "Children Must be Disciplined" shifts the line from a literal statement to an inferential revelation about the parents\'.', answer: 'Literally, it\'s a capitalized sentence stating a parenting rule',
                  options: ['Literally, it\'s a capitalized sentence stating a parenting rule', 'it emphasizes importance', 'no right answer', 'just opinions'],
                  hint: 'If stuck, review c11_eng_w_cbse_16_002 (Plot and Narrative Structure) and create a 6-panel.',
                  misconception: 'Students believe inferential questions have "no right answer" because they\'re "just opinions." They treat inference as guesswork rather.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Have the student highlight every explicit fact in Stanza 1 (time, action, dialogue) in yellow.', 'In a different color, mark every phrase implying something unstated (e.g., "shuts her out," "masterly determination").', 'Practice converting each yellow fact into a literal question and each implied phrase into an inferential question.', 'Require the student to write the answer with the format: "The text says ____, which suggests ____ because ____." Repeat.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
