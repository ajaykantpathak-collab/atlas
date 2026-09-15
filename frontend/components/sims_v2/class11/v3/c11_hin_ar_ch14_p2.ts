import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p2',
    title: 'ckck lkgsc Hkhejko · Part 2/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'ckck lkgsc Hkhejko · Part 2/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_007', 'c11_hin_ar_cbse_14_008', 'c11_hin_ar_cbse_14_009', 'c11_hin_ar_cbse_14_010', 'c11_hin_ar_cbse_14_011', 'c11_hin_ar_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate yet significant ideas that run parallel to the primary theme, explored through specific character perspectives, settings, or subplots to add layers of meaning and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are listening to an elder in your village singing a folk song about a flood.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in a literary text, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a recurring subordinate idea that supports, complicates, or', outcome: 'A secondary theme is a recurring subordinate idea that supports, complicates, or contrasts with the.' },
                { text: 'minor topics mentioned once', outcome: 'Not quite — Students often believe secondary themes are simply "other topics mentioned in the text" (e.g., "the.', reveals: 'secondary-themes-are-simply-other' },
                { text: 'other topics mentioned in the text', outcome: 'Not quite — Students often believe secondary themes are simply "other topics mentioned in the text" (e.g., "the.', reveals: 'secondary-themes-are-simply-other' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in a dark room during a power cut and someone lights a single diya — suddenly you *see* the dancing flame, *feel* its warmth, *smell*.',
            decisions: [{ prompt: 'What is the precise difference between imagery (बिंब) and metaphor (रूपक) in Hindi poetics? Write the definition of each in one sentence.', options: [
                { text: '**Correct Answer:** Imagery (बिंब) is sensory language that evokes a concrete perceptual', outcome: '**Correct Answer:** Imagery (बिंब) is sensory language that evokes a concrete perceptual experience.' },
                { text: 'both are comparisons', outcome: 'Not quite — **Specific Error:** Students believe "बिंब (imagery) = दृश्य वर्णन (visual description only)" and.', reveals: 'specific-error-students-believe-imagery' },
                { text: 'imagery uses like/as', outcome: 'Not quite — **Specific Error:** Students believe "बिंब (imagery) = दृश्य वर्णन (visual description only)" and.', reveals: 'specific-error-students-believe-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp forward in Hindi where a friend uses the word "जुगाड़" - you instantly know it means an innovative fix, not just.',
            decisions: [{ prompt: 'Define "vocabulary in context" and explain how it differs from looking up a word in a standard Hindi dictionary (शब्दकोश).', options: [
                { text: 'Vocabulary in context means determining a word\'s meaning based on how it functions within', outcome: 'Vocabulary in context means determining a word\'s meaning based on how it functions within.' },
                { text: 'both give the same meaning', outcome: 'Not quite — Students believe "vocabulary in context" means finding the *one correct dictionary definition* that.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means finding the *one correct dictionary definition* that.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a poem written 400 years ago and notice words like "एर", "पन", "उहन", "इकु" that don\'t match modern Hindi—how would you systematically.',
            decisions: [{ prompt: 'Identify the grammatical function of the suffix "एर" in the phrase "एर एप्य" from the first poem, and state its modern Hindi equivalent.', options: [
                { text: 'The suffix "एर" functions as the genitive case marker (कारक चिह्न) equivalent to modern', outcome: 'The suffix "एर" functions as the genitive case marker (कारक चिह्न) equivalent to modern Hindi.' },
                { text: 'or locative', outcome: 'Not quite — Students consistently treat Braj Bhasha forms as "incorrect" or "corrupted" Hindi rather than as.', reveals: 'students-consistently-treat-braj-bhasha' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp forward claiming "vDdegknsoh was a queen" – you instantly know it\'s false because the text says she was a poet.',
            decisions: [{ prompt: 'What is the defining characteristic of a literal comprehension question?', options: [
                { text: 'A literal comprehension question has its answer explicitly stated in the text, requiring', outcome: 'A literal comprehension question has its answer explicitly stated in the text, requiring.' },
                { text: 'it asks for the main idea', outcome: 'Not quite — Students believe inferential questions are "guessing" or "opinion-based" because the answer isn\'t.', reveals: 'inferential-questions-are-guessing-or' },
                { text: 'guessing', outcome: 'Not quite — Students believe inferential questions are "guessing" or "opinion-based" because the answer isn\'t.', reveals: 'inferential-questions-are-guessing-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'What comes next? ckck lkgsc Hkhejko · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — ckck lkgsc Hkhejko · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate yet significant ideas that run parallel.',
          hint: 'If stuck, re-read the introductory note (पृष्ठ 135-136) for the meta-context of oral.',
          misconception: 'Students often believe secondary themes are simply "other topics mentioned in the text" (e.g., "the poem mentions.',
          parts: [
                { id: 'a', prompt: 'What is the definition of a secondary theme in a literary text, and how does it differ from the primary theme?', answer: 'A secondary theme is a recurring subordinate idea that supports, complicates, or',
                  options: ['A secondary theme is a recurring subordinate idea that supports, complicates, or', 'minor topics mentioned once', 'other topics mentioned in the text', 'the poem mentions a hut, so \'huts\' is a theme'],
                  hint: 'If stuck, re-read the introductory note (पृष्ठ 135-136) for the meta-context of oral preservation.',
                  misconception: 'Students often believe secondary themes are simply "other topics mentioned in the text" (e.g., "the poem mentions a hut, so \'huts\' is.' },
                { id: 'b', prompt: 'Compare the collective pronouns ("हमारा", "हम") in the first poem with the individual pronouns ("मेरी", "मेरा", "मैं") in the second.', answer: 'The first poem uses collective pronouns to frame exploitation as a shared tribal',
                  options: ['The first poem uses collective pronouns to frame exploitation as a shared tribal', 'ignores the deliberate strategic shift from', 'other topics mentioned in the text', 'the poem mentions a hut, so \'huts\' is a theme'],
                  hint: 'If stuck, re-read the introductory note (पृष्ठ 135-136) for the meta-context of oral preservation.',
                  misconception: 'Students often believe secondary themes are simply "other topics mentioned in the text" (e.g., "the poem mentions a hut, so \'huts\' is.' }
          ],
            remediations: { 'secondary-themes-are-simply-other': { steps: ['If the student conflates motif and theme: 1) Have them list 5 nouns repeated in both poems (hut, field, landlord, song.', '2) For each noun, ask: "What *idea* does the poet attach to this noun?', 'Complete: \'The hut represents ___.\'" 3) Group the completed sentences: which ones cluster together?', '(e.g., hut + body + domestic labor = gendered poverty).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_008', difficulty: 'standard',
          question: 'Imagery (बिंब/प्रतीक) refers to the use of vivid, sensory language that appeals.',
          hint: 'If stuck, review the **Theme nodes (006, 007)** — every device analysis question.',
          misconception: '**Specific Error:** Students believe "बिंब (imagery) = दृश्य वर्णन (visual description only)" and "रूपक (metaphor).',
          parts: [
                { id: 'a', prompt: 'Apply the metaphor-identification test to this new line from an unseen poem: "यादें पुराने खतों की तरह पीली पड़ जाती हैं।" Is this a metaphor? Why or why not?', answer: '**Correct Answer:** No',
                  options: ['**Correct Answer:** No', 'two things are compared', 'बिंब (imagery) = दृश्य वर्णन (visual description only)', 'रूपक (metaphor) = अलंकार (ornament)'],
                  hint: 'If stuck, review the **Theme nodes (006, 007)** — every device analysis question in boards.',
                  misconception: '**Specific Error:** Students believe "बिंब (imagery) = दृश्य वर्णन (visual description only)" and "रूपक (metaphor) = अलंकार (ornament)".' }
          ],
            remediations: { 'specific-error-students-believe-imagery': { steps: ['**Sensory Sorting Drill:** Give the student 10 lines from the two poems (e.g., "epy", "lrk", "iqFky", "yypk", "bZ\'oj".', 'Ask them to sort each into: Visual / Auditory / Tactile / Olfactory / Gustatory.', 'Do this *before* discussing meaning.', '**Metaphor Surgery:** Take a simile from the text or elsewhere (e.g., "जीवन फूल जैसा है").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe "बिंब (imagery) = दृश्य वर्णन (visual description only)" and "रूपक (metaphor).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The metaphor \'बज़\'ओज\' (lamp) in Poem 2 is more effective than the imagery in Poem 1 because a metaphor *explains* the theme while imagery.', answer: '**Correct Answer:** The claim is **false**',
                  options: ['**Correct Answer:** The claim is **false**', 'figures of speech = ornamentation (अलंकार)', 'imagery = decoration', 'बिंब (imagery) = दृश्य वर्णन (visual description only)'],
                  hint: 'If stuck, review the **Theme nodes (006, 007)** — every device analysis question in boards.',
                  misconception: '**Specific Error:** Students believe "बिंब (imagery) = दृश्य वर्णन (visual description only)" and "रूपक (metaphor) = अलंकार (ornament)".' }
          ],
            remediations: { 'specific-error-students-believe-imagery': { steps: ['**Sensory Sorting Drill:** Give the student 10 lines from the two poems (e.g., "epy", "lrk", "iqFky", "yypk", "bZ\'oj".', 'Ask them to sort each into: Visual / Auditory / Tactile / Olfactory / Gustatory.', 'Do this *before* discussing meaning.', '**Metaphor Surgery:** Take a simile from the text or elsewhere (e.g., "जीवन फूल जैसा है").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'Review the distinction between metaphor (direct comparison) and symbol (object.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck, and they treat symbols as just \'metaphors\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and physical environment constructed through'],
                  hint: 'Review the distinction between metaphor (direct comparison) and symbol (object representing an idea.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck, and they treat symbols as just \'metaphors\'.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the two poems focusing only on lines where the speaker\'s tone suggests a gap between words and reality (irony).', 'Create a two-column table: Column A – Literal meaning; Column B – Implied meaning. Fill for 3-4 key lines.', 'For symbolism, list the object, its literal function, and its abstract association in the poem.', 'Write one paragraph explaining how the contradiction (irony) or the object (symbol) deepens the theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'Review "ध्वनि-चित्रण" (onomatopoeia/phonetic imaging) and "अनुप्रास" (alliteration) from.',
          misconception: 'Students believe "vocabulary in context" means finding the *one correct dictionary definition* that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and physical environment constructed through'],
                  hint: 'Review "ध्वनि-चित्रण" (onomatopoeia/phonetic imaging) and "अनुप्रास" (alliteration) from Node.',
                  misconception: 'Students believe "vocabulary in context" means finding the *one correct dictionary definition* that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Give the student a single line from the poem (e.g., "पजकपज! एर पवद वोलज") and ask: "What does the *sound* of पजकपज make.', 'Have them list 5 words that *sound* like panic (धड़क, काँप, थर्र, etc.) and compare phonetic textures.', 'Return to the line - now ask: "If the poet wrote \'डर\' instead, what would be lost?"', 'Guide them to write: "पजकपज enacts panic through its repetitive plosives; \'डर\' only names it." This shifts focus from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis.',
          hint: 'Review the शब्द-अर्थ (word-meaning) list from the textbook\'s \'शब्द-नोट\' section and.',
          misconception: 'Students consistently treat Braj Bhasha forms as "incorrect" or "corrupted" Hindi rather than as a systematic literary.',
          parts: [
                { id: 'a', prompt: 'Explain why the poet uses "पन" instead of standard Braj "पर" or modern Hindi "पर/में" in "रमि एर" and "एपक एर मफक्य-इकफक्य", and what phonological process this.', answer: '"पन" represents the Braj Bhasha locative postposition where the dental nasal \'न\'',
                  options: ['"पन" represents the Braj Bhasha locative postposition where the dental nasal \'न\'', 'as a separate lexical item or modern Hindi'],
                  hint: 'Review the शब्द-अर्थ (word-meaning) list from the textbook\'s \'शब्द-नोट\' section and practice.',
                  misconception: 'Students consistently treat Braj Bhasha forms as "incorrect" or "corrupted" Hindi rather than as a systematic literary dialect with its own.' }
          ],
            remediations: { 'students-consistently-treat-braj-bhasha': { steps: ['Give the student a three-column table — Column A: Braj form from poem, Column B: Modern Khari Boli equivalent, Column.', 'Ask them to read aloud both versions and clap the meter — they will hear how "एर" (light) vs "का" (heavy) changes the.', 'Show a parallel example from Surdas or Mirabai where the same Braj forms appear, proving these are literary conventions.', 'Have them rewrite one stanza in pure Khari Boli and compare emotional/rustic effect — they will perceive the loss.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review the \'Text: Plot and Narrative Structure\' (c11_hin_ar_cbse_14_002) and.',
          misconception: 'Students believe inferential questions are "guessing" or "opinion-based" because the answer isn\'t in one sentence.',
          parts: [
                { id: 'a', prompt: 'In the first poem, the line "vDdegknsoh viwoZ lqanjh FkhaA" appears.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'guessing', 'opinion-based'],
                  hint: 'If stuck, review the \'Text: Plot and Narrative Structure\' (c11_hin_ar_cbse_14_002) and \'Vocabulary.',
                  misconception: 'Students believe inferential questions are "guessing" or "opinion-based" because the answer isn\'t in one sentence.' }
          ],
            remediations: { 'inferential-questions-are-guessing-or': { steps: ['Give the student a 3-column table: Column A = Direct Quote (e.g., "vks pjkpj!', 'er pwd volj"), Column B = Literal Fact (She says burn the house), Column C = Inference (She wants to destroy her.', 'Practice filling Column C for 5 quotes from the poem.', 'Require them to write the reasoning sentence: "The word \'volj\' (whole/complete) implies total destruction, not partial.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
