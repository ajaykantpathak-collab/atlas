import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch11_p2: SimDef = {
    id: 'v3_c11_eng_h_ch11_p2',
    title: 'Childhood (Poem) · Part 2/3',
    subtitle: 'Track a lyric that argues, not narrates — and watch its question mutate at the end.',
    classLevel: 11, subject: 'eng_h', topic: 'Childhood (Poem) · Part 2/3',
    chapters: ['c11_eng_h_ch11'],
    nodeIds: ['c11_eng_h_cbse_11_007', 'c11_eng_h_cbse_11_008', 'c11_eng_h_cbse_11_009', 'c11_eng_h_cbse_11_010', 'c11_eng_h_cbse_11_011', 'c11_eng_h_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a detective of one\'s own lost innocence', intro: 'No plot, no characters — just a man interrogating himself about the exact moment he stopped being a child.', goal: 'Read the poem as a cumulative philosophical argument and analyse the when-to-where pivot.' },
    discovery: {
        question: 'For three stanzas the speaker asks \'when did my childhood go?\' — then the question changes. To what, and why does it matter?',
        options: ['To \'where\' — childhood isn\'t a lost moment in time but a relocated place, \'hidden in an infant\'s face\'', 'To \'why\' — he finally demands the cause of growing up', 'To \'how\' — he wants the mechanism of maturity', 'It doesn\'t — the same question repeats to the end'],
        answer: 'To \'where\' — childhood isn\'t a lost moment in time but a relocated place, \'hidden in an infant\'s face\'',
        hook: 'Each stanza offers a different \'when\' — adult hypocrisy, independent thought, a mind of one\'s own — then the pivot rejects \'when\' altogether.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Childhood\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Line up the poem\'s three candidate answers for when childhood ends, then evaluate whether the infant\'s face resolves the quest or deepens its irony.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Childhood\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, enriching', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, enriching it.' },
                { text: 'less important topics', outcome: 'Not quite — Students often treat each stanza of "Childhood" as an *independent* example of the same theme.', reveals: 'students-often-treat-each-stanza' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Childhood\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, and give one example of each from the poem "Childhood" without looking at the text.', options: [
                { text: 'Imagery: Language appealing to senses (e.g., "the hell and heaven"', outcome: 'Imagery: Language appealing to senses (e.g., "the hell and heaven" — visual/organic).' },
                { text: 'imagery is just description', outcome: 'Not quite — Students think "imagery" only means visual description (pictures in the mind) and miss organic.', reveals: 'imagery-only-means-visual-description' },
                { text: 'metaphor uses like/as', outcome: 'Not quite — Students think "imagery" only means visual description (pictures in the mind) and miss organic.', reveals: 'imagery-only-means-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Childhood\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary difference between a word\'s denotation and its connotation in the context of literary analysis?', options: [
                { text: 'Denotation is the literal, dictionary definition of a word, while connotation refers to', outcome: 'Denotation is the literal, dictionary definition of a word, while connotation refers to the.' },
                { text: 'they are the same', outcome: 'Not quite — Students believe "vocabulary in context" means finding synonyms or dictionary definitions for.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'connotation is just a synonym', outcome: 'Not quite — Students believe "vocabulary in context" means finding synonyms or dictionary definitions for.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Childhood\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is a rhetorical question, and how does it differ from a standard interrogative sentence in terms of expected response?', options: [
                { text: 'A rhetorical question is a figure of speech in the form of a question asked for effect or', outcome: 'A rhetorical question is a figure of speech in the form of a question asked for effect or emphasis.' },
                { text: 'It\'s a question waiting for an answer', outcome: 'Not quite — Students often treat grammatical features in poetry as decorative "devices" to be spotted and.', reveals: 'students-often-treat-grammatical-features' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Childhood\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question in poetry analysis?', options: [
                { text: 'A literal question\'s answer is explicitly stated in the poem (e.g., "At what age did the', outcome: 'A literal question\'s answer is explicitly stated in the poem (e.g., "At what age did the poet cease.' },
                { text: 'Inferential questions are just opinions', outcome: 'Not quite — Students believe inferential questions invite personal opinions ("I think the poet feels sad") and.', reveals: 'inferential-questions-invite-personal-opinions' },
                { text: 'I think the poet feels sad', outcome: 'Not quite — Students believe inferential questions invite personal opinions ("I think the poet feels sad") and.', reveals: 'inferential-questions-invite-personal-opinions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For open-mic night a student adapts the poem \'Childhood\' into a skit: actors play young Markus, his parents, a teacher — dramatising \'the day he stopped believing in heaven\'. The mentor asks: \'Where in the poem is this scene actually narrated?\'',
            decisions: [{ prompt: 'Why does the skit\'s premise misread the poem?', options: [
                { text: '\'Childhood\' is a philosophical lyric, not a narrative: it argues that childhood ends not on a date or event but when the mind gains independent, critical thought — seeing through adults\' hypocrisy, questioning where heaven is, thinking thoughts that are one\'s own. There are no characters, setting or plot to dramatise; the \'when\' is a cognitive threshold.', outcome: 'Reading a lyric argument as a memory-story manufactures scenes the poem deliberately refuses — its refrain is a question about ideas, not an anecdote.' },
                { text: 'The skit works — every poem is a story, so picking one memory as the \'moment\' is fine.', outcome: 'That treats the poem as autobiography; the poem\'s point is that no single event ends childhood — three different \'whens\' are proposed and the answer is a state of mind.', reveals: 'lyric-is-narrative' },
                { text: 'Childhood ends at puberty — the poem is about biological growth, so stage it as a birthday scene.', outcome: 'The poem explicitly locates the end in intellectual awakening — independent perception and thought — not in any birthday or bodily milestone.', reveals: 'childhood-ends-at-puberty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'Childhood doesn\'t die — it emigrates. The speaker can see it in an infant\'s face but never move back in.',
            decisions: [{ prompt: 'What comes next? Childhood (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Childhood (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_007', difficulty: 'standard',
          question: 'Secondary themes in \'Childhood\' — the supporting ideas and motifs that deepen.',
          hint: 'Review c11_eng_h_cbse_11_006 worked examples on primary theme tracing; practice writing.',
          misconception: 'Students often treat each stanza of "Childhood" as an *independent* example of the same theme ("loss of innocence").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Childhood\'',
                  options: ['Secondary themes in \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The plot/narrative arc of \'Childhood\'', 'The setting of \'Childhood\''],
                  hint: 'Review c11_eng_h_cbse_11_006 worked examples on primary theme tracing; practice writing the primary.',
                  misconception: 'Students often treat each stanza of "Childhood" as an *independent* example of the same theme ("loss of innocence") rather than as.' }
          ],
            remediations: { 'students-often-treat-each-stanza': { steps: ['Have the student create a three-column table: Stanza | External Trigger | Internal Cognitive Shift | Secondary Theme.', 'Guide them to fill Column 2 with what the *world* does (adults preach, geography teaches, others think) and Column 3.', 'Ask: "Which column shows the *child\'s* growth?" (Column 3).', 'Explain: Secondary themes live in Column 3—they are the child\'s evolving consciousness, not just external events.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_008', difficulty: 'standard',
          question: 'Imagery in \'Childhood\' — the vivid, sensory language that creates word-pictures.',
          hint: 'If stuck, review c11_eng_h_cbse_11_002 (Plot and Narrative Structure) to re-establish the.',
          misconception: 'Students think "imagery" only means visual description (pictures in the mind) and miss organic (internal body.',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor in your own words, and give one example of each from the poem "Childhood" without looking at the text.', answer: 'Imagery: Language appealing to senses (e.g., "the hell and heaven"',
                  options: ['Imagery: Language appealing to senses (e.g., "the hell and heaven"', 'imagery is just description', 'metaphor uses like/as', 'imagery'],
                  hint: 'If stuck, review c11_eng_h_cbse_11_002 (Plot and Narrative Structure) to re-establish the poem\'s.',
                  misconception: 'Students think "imagery" only means visual description (pictures in the mind) and miss organic (internal body sensations), kinaesthetic.' },
                { id: 'b', prompt: 'The poem uses the phrase "my mind was really mine". Identify the type of imagery here (organic/internal sensation) and explain how it contributes to the theme.', answer: 'This is organic imagery',
                  options: ['This is organic imagery', 'visual imagery because mind is seen', 'imagery', 'Geography'],
                  hint: 'If stuck, review c11_eng_h_cbse_11_002 (Plot and Narrative Structure) to re-establish the poem\'s.',
                  misconception: 'Students think "imagery" only means visual description (pictures in the mind) and miss organic (internal body sensations), kinaesthetic.' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Have the student close their eyes and describe a memory using *only* smell, then sound, then touch — labeling each.', 'Give two sentences: "The exam was a monster" (metaphor) vs "The exam was like a monster" (simile).', 'Ask them to identify the tenor, vehicle, and ground in the metaphor.', 'In the poem, have them highlight every phrase that is *not* visual — this forces detection of organic/kinaesthetic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Childhood\' — where opposite things are both true,.',
          hint: 'If stuck, re-read the "Imagery and Metaphor" node (c11_eng_h_cbse_11_008) and practice.',
          misconception: 'Students often believe that any contradiction in a poem is irony, and any noun with a positive/negative connotation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Childhood\'',
                  options: ['Irony and paradox in \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The plot/narrative arc of \'Childhood\'', 'The setting of \'Childhood\''],
                  hint: 'If stuck, re-read the "Imagery and Metaphor" node (c11_eng_h_cbse_11_008) and practice.',
                  misconception: 'Students often believe that any contradiction in a poem is irony, and any noun with a positive/negative connotation is a symbol.' }
          ],
            remediations: { 'any-contradiction-in-a-poem': { steps: ['If a student cannot distinguish irony from contradiction, give them three clear non-literary scenarios (e.g., a fire.', 'Then return to the poem and map the same structure onto the adults\' love-preaching vs.', 'For symbolism, use the "training wheels" example from Diagnostic 6: ask the student to list what training wheels.', 'Then have them do the same for "Hell and Heaven" in the poem (literal: religious concepts; symbolic: the borrowed moral.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Childhood\' — the words and phrases you must know to read the.',
          hint: 'If stuck, review the connotation/denotation distinction using the Class 8 node.',
          misconception: 'Students believe "vocabulary in context" means finding synonyms or dictionary definitions for difficult words.',
          parts: [
                { id: 'a', prompt: 'In stanza 1 of "Childhood," the speaker asks, "Was it the day I ceased to be eleven?" Why is the specific number "eleven" more effective than "twelve" or "ten".', answer: 'Eleven represents the precise threshold between childhood and adolescence',
                  options: ['Eleven represents the precise threshold between childhood and adolescence', 'it\'s just a random age', 'it rhymes with heaven', 'vocabulary in context'],
                  hint: 'If stuck, review the connotation/denotation distinction using the Class 8 node c8_engl_ch1_9.',
                  misconception: 'Students believe "vocabulary in context" means finding synonyms or dictionary definitions for difficult words.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['If a student gives synonym-based answers, do NOT say "study the dictionary." Instead: (1) Give them stanza 2 and ask.', '(3) Ask: "If you replace \'hypocrisy\' with \'lying,\' what happens to the contrast with \'preached\'?" (4) Guide them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "vocabulary in context" means finding synonyms or dictionary definitions for difficult words.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the word "forgotten" in the final line: "That\'s all I know." Could "lost," "hidden," or "buried" have worked equally well?', answer: '"Forgotten" implies an unconscious, passive process',
                  options: ['"Forgotten" implies an unconscious, passive process', 'vocabulary in context'],
                  hint: 'If stuck, review the connotation/denotation distinction using the Class 8 node c8_engl_ch1_9.',
                  misconception: 'Students believe "vocabulary in context" means finding synonyms or dictionary definitions for difficult words.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['If a student gives synonym-based answers, do NOT say "study the dictionary." Instead: (1) Give them stanza 2 and ask.', '(3) Ask: "If you replace \'hypocrisy\' with \'lying,\' what happens to the contrast with \'preached\'?" (4) Guide them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_011', difficulty: 'standard',
          question: 'Language and style in \'Childhood\' — how the writer chose words, sentences and.',
          hint: 'Review Class 6–10 grammar: sentence types (c6_english_u4_038), tense forms.',
          misconception: 'Students often treat grammatical features in poetry as decorative "devices" to be spotted and labeled (e.g., "There\'s.',
          parts: [
                { id: 'a', prompt: 'Compare the sentence structures of the three stanzas\' opening lines: "When did my childhood go?" (Stanza 1), "When did my childhood go?" (Stanza 2), "When did.', answer: 'This is anaphora',
                  options: ['This is anaphora', 'It\'s just repetition for emphasis'],
                  hint: 'Review Class 6–10 grammar: sentence types (c6_english_u4_038), tense forms (c6_english_u2_018), and.',
                  misconception: 'Students often treat grammatical features in poetry as decorative "devices" to be spotted and labeled (e.g., "There\'s a rhetorical question.' }
          ],
            remediations: { 'students-often-treat-grammatical-features': { steps: ['Give the student a stripped-down version of Stanza 1 with only the main clause ("When did my childhood go?") and ask.', 'Add back the subordinate clause ("Was it the day I ceased to be eleven?").', 'Ask: "What tense is \'ceased\'?', 'What does \'Was it the day...\' imply about the speaker\'s certainty?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Childhood\' — questions answered straight from the.',
          hint: 'If stuck, review c11_eng_h_cbse_11_002 (Plot/Narrative Structure) to map the poem\'s four.',
          misconception: 'Students believe inferential questions invite personal opinions ("I think the poet feels sad") and that literal.',
          parts: [
                { id: 'a', prompt: 'In the poem "Childhood," the poet writes: "When did my childhood go?', answer: 'This is a literal comprehension question',
                  options: ['This is a literal comprehension question', 'It is inferential', 'I think the poet feels sad', 'too easy'],
                  hint: 'If stuck, review c11_eng_h_cbse_11_002 (Plot/Narrative Structure) to map the poem\'s four stanzas.',
                  misconception: 'Students believe inferential questions invite personal opinions ("I think the poet feels sad") and that literal questions are "too easy".' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this new question on "Childhood": "What does the poet realize about adults in the stanza beginning \'When did.', answer: 'Classification: Inferential',
                  options: ['Classification: Inferential', 'A wrong answer (e.g', 'I think the poet feels sad', 'too easy'],
                  hint: 'If stuck, review c11_eng_h_cbse_11_002 (Plot/Narrative Structure) to map the poem\'s four stanzas.',
                  misconception: 'Students believe inferential questions invite personal opinions ("I think the poet feels sad") and that literal questions are "too easy".' }
          ],
            remediations: { 'inferential-questions-invite-personal-opinions': { steps: ['Have the student re-read the poem with two highlighters: one for explicit facts (ages, actions, direct statements), one.', 'Give them 5 mixed questions; ask them to sort into Literal/Inferential piles *before* answering.', 'For each inferential question, force them to write: "Explicit detail A + Explicit detail B = Inference C" on a rough.', 'Show a model answer where the inference collapses without the two explicit details, proving inference is not guesswork.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
