import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch12_p2: SimDef = {
    id: 'v3_c11_eng_h_ch12_p2',
    title: 'Father to Father (Poem) · Part 2/3',
    subtitle: 'Read a generational silence as structure, not as a missing scene.',
    classLevel: 11, subject: 'eng_h', topic: 'Father to Father (Poem) · Part 2/3',
    chapters: ['c11_eng_h_ch12'],
    nodeIds: ['c11_eng_h_cbse_12_007', 'c11_eng_h_cbse_12_008', 'c11_eng_h_cbse_12_009', 'c11_eng_h_cbse_12_010', 'c11_eng_h_cbse_12_011', 'c11_eng_h_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a critic weighing a poem that ends without a handshake', intro: 'Same house, same blood, no words — a father watches his son become someone he can\'t reach.', goal: 'Analyse narrative structure in lyric poetry and defend the open denouement.' },
    discovery: {
        question: 'A classmate calls the ending \'weak\' — father and son never speak or reconcile on the page. Is a silent ending a failed one?',
        options: ['No — the open denouement resolves tension without plot closure, mirroring how generational distance often stays unspoken', 'Yes — a story owes its readers explicit reconciliation', 'Yes — silence means nothing happened', 'No — but only because a sequel was planned'],
        answer: 'No — the open denouement resolves tension without plot closure, mirroring how generational distance often stays unspoken',
        hook: 'Resolution of plot and resolution of tension aren\'t the same — a shared silence can close a poem better than dialogue.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Father to Son\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Treat each stanza as a film scene, find where enjambment rushes the climax, and test whether biography explains the tight quatrains holding emotional chaos.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Father to Son\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from a mere topic?', options: [
                { text: 'A secondary theme is a complete idea or statement about life that supports the primary', outcome: 'A secondary theme is a complete idea or statement about life that supports the primary theme (e.g.' },
                { text: 'silence', outcome: 'Not quite — Students often treat secondary themes as “less important” topics and list nouns like “silence,”.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'metaphor', outcome: 'Not quite — Students often treat secondary themes as “less important” topics and list nouns like “silence,”.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Father to Son\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor. Give one example of each from daily life (not from the poem).', options: [
                { text: '**Correct Answer:** Imagery: Descriptive language appealing to senses (e.g., "The wet', outcome: '**Correct Answer:** Imagery: Descriptive language appealing to senses (e.g., "The wet earth smelled.' },
                { text: 'traffic is *like* a nightmare', outcome: 'Not quite — Students believe **imagery is only "visual description" (pictures in the mind)** and **metaphor.', reveals: 'imagery-is-only-visual-description' },
                { text: 'visual description', outcome: 'Not quite — Students believe **imagery is only "visual description" (pictures in the mind)** and **metaphor.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Father to Son\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example of each from everyday life (not from the poem).', options: [
                { text: 'Irony: a situation where the outcome is opposite to what was expected (e.g., a fire', outcome: 'Irony: a situation where the outcome is opposite to what was expected (e.g., a fire station burning.' },
                { text: 'a funny coincidence', outcome: 'Not quite — Students often treat irony as any unexpected twist and symbolism as any object mentioned in the.', reveals: 'students-often-treat-irony-as' },
                { text: 'a metaphor', outcome: 'Not quite — Students often treat irony as any unexpected twist and symbolism as any object mentioned in the.', reveals: 'students-often-treat-irony-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Father to Son\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "contextual meaning" in poetry and explain how it differs from a dictionary (denotative) meaning.', options: [
                { text: 'Contextual meaning is the specific shade of meaning a word acquires based on the', outcome: 'Contextual meaning is the specific shade of meaning a word acquires based on the surrounding words.' },
                { text: 'they are the same', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Father to Son\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical term for a sentence that lacks a main verb or subject but functions as a complete thought in poetry, such.', options: [
                { text: 'The term is **sentence fragment** (or elliptical construction)', outcome: 'The term is **sentence fragment** (or elliptical construction).' },
                { text: 'run-on sentence', outcome: 'Not quite — Students believe "poetic grammar" means breaking rules randomly for artistic effect.', reveals: 'poetic-grammar-means-breaking-rules' },
                { text: 'simple sentence', outcome: 'Not quite — Students believe "poetic grammar" means breaking rules randomly for artistic effect.', reveals: 'poetic-grammar-means-breaking-rules' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Father to Son\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "In the poem \'Father to Son\', what does the father mean when he says.', options: [
                { text: 'This is an **inferential** question', outcome: 'This is an **inferential** question. The metaphor of "seed" and "land" is not explicitly explained.' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any answer is acceptable.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a poetry-recitation contest you must defend your choice of Elizabeth Jennings\'s \'Father to Son\' against a judge who asks: \'Why did you pick something so plain and restrained? Great emotion deserves dramatic, free-flowing verse.\'',
            decisions: [{ prompt: 'What\'s the strongest defence of the poem\'s plainness?', options: [
                { text: 'The restraint IS the meaning: Jennings was a Movement poet — clarity, formal control, everyday subjects — and the regular quatrains mirror the father\'s emotional lockdown; a man who cannot reach his son speaks in controlled, measured lines. The gap between tidy form and aching content is the poem\'s engine, and context (Movement aesthetics) is what lets you see it.', outcome: 'Form mirrors feeling here: tight stanzas enact the very inarticulateness the poem grieves — dramatic free verse would contradict the subject.' },
                { text: 'Concede — plain form means plain feeling; pick a more passionate poem.', outcome: 'That misreads the aesthetic: the controlled surface contains more grief because it visibly cannot overflow — restraint is the signature, not the defect.', reveals: 'plain-form-plain-feeling' },
                { text: 'Recite it dramatically anyway — performance can add the emotion the text lacks.', outcome: 'Overplaying breaks the poem\'s logic: the father-and-son distance is felt through what\'s withheld; declaiming it erases the silence between them.', reveals: 'perform-the-missing-emotion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'Movement poets put chaos in controlled stanzas — the form is the father trying to hold himself together.',
            decisions: [{ prompt: 'What comes next? Father to Father (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Father to Father (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_007', difficulty: 'standard',
          question: 'Secondary themes in \'Father to Son\' — the supporting ideas and motifs that.',
          hint: 'If stuck, revisit the topic-vs-theme table in node 006 and practice converting three.',
          misconception: 'Students often treat secondary themes as “less important” topics and list nouns like “silence,” “time,”.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to the following lines from the poem: “We speak like strangers, there’s no sign / Of understanding in the air.” Identify.', answer: 'Secondary theme: **Communication breakdown as emotional estrangement**',
                  options: ['Secondary theme: **Communication breakdown as emotional estrangement**', 'speak like strangers', 'no sign / Of understanding', 'they don’t talk'],
                  hint: 'If stuck, revisit the topic-vs-theme table in node 006 and practice converting three topics from.',
                  misconception: 'Students often treat secondary themes as “less important” topics and list nouns like “silence,” “time,” or “forgiveness” without converting.' },
                { id: 'b', prompt: 'Analyze how the secondary themes of “silence” and “the desire for forgiveness” interact in the poem. Does one intensify the other? Use two pieces of evidence.', answer: 'Yes, silence intensifies the desire for forgiveness',
                  options: ['Yes, silence intensifies the desire for forgiveness', 'metaphor'],
                  hint: 'If stuck, revisit the topic-vs-theme table in node 006 and practice converting three topics from.',
                  misconception: 'Students often treat secondary themes as “less important” topics and list nouns like “silence,” “time,” or “forgiveness” without converting.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Give the student a two-column table: Column A = Topics from the poem (silence, seed, land, stranger, prodigal).', 'Column B = Thematic Statements.', 'Ask them to match each topic to a statement like “Silence deepens emotional distance.” 2.', 'Have them re-read the poem and write one sentence for each topic explaining *what the poet suggests about it*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as “less important” topics and list nouns like “silence,” “time,”.',
          parts: [
                { id: 'a', prompt: 'Evaluate which secondary theme in "Father to Father" is most effectively conveyed through the poem’s structure (stanza division, line breaks, enjambment).', answer: 'The theme of **time’s irreversible passage** is most structurally conveyed',
                  options: ['The theme of **time’s irreversible passage** is most structurally conveyed', 'silence', 'Silence surrounds us', 'metaphor'],
                  hint: 'If stuck, revisit the topic-vs-theme table in node 006 and practice converting three topics from.',
                  misconception: 'Students often treat secondary themes as “less important” topics and list nouns like “silence,” “time,” or “forgiveness” without converting.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Give the student a two-column table: Column A = Topics from the poem (silence, seed, land, stranger, prodigal).', 'Column B = Thematic Statements.', 'Ask them to match each topic to a statement like “Silence deepens emotional distance.” 2.', 'Have them re-read the poem and write one sentence for each topic explaining *what the poet suggests about it*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_008', difficulty: 'standard',
          question: 'Imagery in \'Father to Son\' — the vivid, sensory language that creates.',
          hint: 'Review the "Poetic Devices" sections from Class 6 (c6_english_u1_005) and Class 8.',
          misconception: 'Students believe **imagery is only "visual description" (pictures in the mind)** and **metaphor is just "a fancy.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between a *visual image* and a *metaphor* using the following two lines: (A) "The father’s hands were rough and calloused from years.', answer: '**Correct Answer:** (A) is tactile imagery',
                  options: ['**Correct Answer:** (A) is tactile imagery', 'creates a picture of maps', 'visual description', 'a fancy comparison'],
                  hint: 'Review the "Poetic Devices" sections from Class 6 (c6_english_u1_005) and Class 8 (c8_engl_ch4_15).',
                  misconception: 'Students believe **imagery is only "visual description" (pictures in the mind)** and **metaphor is just "a fancy comparison."**.' },
                { id: 'b', prompt: 'In the poem, the poet writes about "the smell of Vicks VapoRub" and "the sound of the scooter key turning in the lock." Identify the *type* of imagery for.', answer: '**Correct Answer:** "Smell of Vicks" = Olfactory imagery',
                  options: ['**Correct Answer:** "Smell of Vicks" = Olfactory imagery', 'visual description', 'a fancy comparison'],
                  hint: 'Review the "Poetic Devices" sections from Class 6 (c6_english_u1_005) and Class 8 (c8_engl_ch4_15).',
                  misconception: 'Students believe **imagery is only "visual description" (pictures in the mind)** and **metaphor is just "a fancy comparison."**.' },
                { id: 'c', prompt: 'The poem uses an extended metaphor comparing the father and son to "two separate rivers flowing in the same bedrock." Analyze this metaphor by naming the.', answer: '**Correct Answer:** Tenor: Father and son relationship',
                  options: ['**Correct Answer:** Tenor: Father and son relationship', 'bedrock', 'visual description', 'a fancy comparison'],
                  hint: 'Review the "Poetic Devices" sections from Class 6 (c6_english_u1_005) and Class 8 (c8_engl_ch4_15).',
                  misconception: 'Students believe **imagery is only "visual description" (pictures in the mind)** and **metaphor is just "a fancy comparison."**.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['**Sensory Audit:** Give the student a 2-minute "sensory scan" of their current room: name 1 thing you smell, 1 sound, 1.', '**Metaphor Surgery:** Take a weak simile from their writing ("He was strong like a tree").', 'Convert to metaphor ("He was an oak").', 'List 5 qualities of "oak" (deep roots, rings of time, hard wood, shade, survives storms).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Father to Son\' — where opposite things are both true,.',
          hint: 'If stuck, review the definitions and Class 10 examples of irony (c10_engl_cbse_01_005).',
          misconception: 'Students often treat irony as any unexpected twist and symbolism as any object mentioned in the poem.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Father to Son\'',
                  options: ['Irony and paradox in \'Father to Son\'', '\'Father to Son\' (Hornbill, ch', 'The plot/narrative arc of \'Father to Son\'', 'The setting of \'Father to Son\''],
                  hint: 'If stuck, review the definitions and Class 10 examples of irony (c10_engl_cbse_01_005) and.',
                  misconception: 'Students often treat irony as any unexpected twist and symbolism as any object mentioned in the poem.' }
          ],
            remediations: { 'students-often-treat-irony-as': { steps: ['Re-read the poem focusing only on the father\'s statements vs.', 'the reality they describe — list three mismatches.', 'For each mismatch, name the irony type (verbal: he says X but means Y; situational: he expects closeness but creates.', 'For symbols, trace one concrete noun ("house", "seed", "silence") across stanzas: note where it appears, what changes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Father to Son\' — the words and phrases you must know to read.',
          hint: 'If stuck, return to **c9_engl_ch1_8 (Vocabulary in Context: Key Words from the Story)**.',
          misconception: 'Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding sentences." They.',
          parts: [
                { id: 'a', prompt: 'Define "contextual meaning" in poetry and explain how it differs from a dictionary (denotative) meaning.', answer: 'Contextual meaning is the specific shade of meaning a word acquires based on the',
                  options: ['Contextual meaning is the specific shade of meaning a word acquires based on the', 'they are the same', 'vocabulary in context', 'guessing the meaning of hard words from surrounding sentences'],
                  hint: 'If stuck, return to **c9_engl_ch1_8 (Vocabulary in Context: Key Words from the Story)** and.',
                  misconception: 'Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding sentences." They treat the poem as.' },
                { id: 'b', prompt: 'Analyze the effect of the word "prodigal" if it appears in the line "The prodigal father waits." (Assume the word is used).', answer: 'In the Bible, the *son* is prodigal (wasteful) and returns',
                  options: ['In the Bible, the *son* is prodigal (wasteful) and returns', 'prodigal', 'wasteful', 'returning'],
                  hint: 'If stuck, return to **c9_engl_ch1_8 (Vocabulary in Context: Key Words from the Story)** and.',
                  misconception: 'Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding sentences." They treat the poem as.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Isolate the Word:** Give the student a single line with the target word blanked out.', 'Ask them to fill it with three synonyms of increasing intensity (e.g., gap / chasm / abyss).', '**Sound & Sense:** Read the line aloud with each synonym.', 'Ask: "Which sounds like the poem?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_011', difficulty: 'standard',
          question: 'Language and style in \'Father to Son\' — how the writer chose words, sentences.',
          hint: 'Review "Sentence Structure and Types" (Class 6, c6_english_u4_038) and "Active and.',
          misconception: 'Students believe "poetic grammar" means breaking rules randomly for artistic effect.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical term for a sentence that lacks a main verb or subject but functions as a complete thought in poetry, such as "Silence between us.".', answer: 'The term is **sentence fragment** (or elliptical construction)',
                  options: ['The term is **sentence fragment** (or elliptical construction)', 'run-on sentence', 'simple sentence', 'poetic grammar'],
                  hint: 'Review "Sentence Structure and Types" (Class 6, c6_english_u4_038) and "Active and Passive Voice".',
                  misconception: 'Students believe "poetic grammar" means breaking rules randomly for artistic effect.' },
                { id: 'b', prompt: 'The poem uses the pronoun "he" to refer to the son in third person despite the father addressing him directly.', answer: 'Direct address ("You have grown up") creates intimacy and confrontation',
                  options: ['Direct address ("You have grown up") creates intimacy and confrontation', 'poetic grammar', '"poetic grammar" means breaking rules randomly for artistic effect'],
                  hint: 'Review "Sentence Structure and Types" (Class 6, c6_english_u4_038) and "Active and Passive Voice".',
                  misconception: 'Students believe "poetic grammar" means breaking rules randomly for artistic effect.' }
          ],
            remediations: { 'poetic-grammar-means-breaking-rules': { steps: ['Give the student a prose version of the poem\'s first stanza (rewrite it as standard sentences).', 'Ask them to list *every* difference — no matter how small — between the prose and poem versions.', 'For each difference, ask: "What does this change *do* to the feeling?"', 'Have them complete a table: Grammatical Feature | Prose Version | Poem Version | Effect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Father to Son\' — questions answered straight from the.',
          hint: 'If stuck, review c11_eng_h_cbse_12_008 (Imagery and Metaphor) — 80% of inferential clues.',
          misconception: 'Students believe inferential questions are "opinion questions" where any answer is acceptable if they "feel" it.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "In the poem \'Father to Son\', what does the father mean when he says \'The seed I spent.', answer: 'This is an **inferential** question',
                  options: ['This is an **inferential** question', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_h_cbse_12_008 (Imagery and Metaphor) — 80% of inferential clues in this.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any answer is acceptable if they "feel" it.' },
                { id: 'b', prompt: 'Read these lines from the poem: "Father and son, we both must live / On the same globe and the same land." Answer the inferential question: "What does the.', answer: 'The phrase suggests **inescapable proximity despite emotional distance**',
                  options: ['The phrase suggests **inescapable proximity despite emotional distance**', 'they live together', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_h_cbse_12_008 (Imagery and Metaphor) — 80% of inferential clues in this.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any answer is acceptable if they "feel" it.' },
                { id: 'c', prompt: 'Compare the following two student answers to the question "Why does the father feel \'anger grows from grief\'?" and identify which demonstrates stronger.', answer: '**Student B** demonstrates stronger inferential reasoning',
                  options: ['**Student B** demonstrates stronger inferential reasoning', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_h_cbse_12_008 (Imagery and Metaphor) — 80% of inferential clues in this.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any answer is acceptable if they "feel" it.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Give the student a 4-line excerpt from the poem.', 'Ask: "Circle every word that is a FACT (literal).', 'Underline every word that suggests a FEELING (inferential clue)." 2.', 'Model a think-aloud: "I see \'silence\' — that\'s a fact.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
