import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch19_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch19_p2: SimDef = {
    id: 'v3_c11_eng_w_ch19_p2',
    title: 'Ode to a Nightingale (Poem) · Part 2/3',
    subtitle: 'Follow a mind into the bird\'s timelessness and the violent fall back.',
    classLevel: 11, subject: 'eng_w', topic: 'Ode to a Nightingale (Poem) · Part 2/3',
    chapters: ['c11_eng_w_ch19'],
    nodeIds: ['c11_eng_w_cbse_19_007', 'c11_eng_w_cbse_19_008', 'c11_eng_w_cbse_19_009', 'c11_eng_w_cbse_19_010', 'c11_eng_w_cbse_19_011', 'c11_eng_w_cbse_19_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener half-seduced by an immortal song', intro: 'A 24-year-old who has watched his brother die sits in a garden at night — and a bird sings as if hunger had never existed.', goal: 'Distinguish the speaker\'s mortality from the song\'s immortality and evaluate the ambiguous ending.' },
    discovery: {
        question: 'With \'Lethe,\' \'fade away\' and \'rich to die\' everywhere, many read the nightingale as a symbol of death. What does the bird actually carry?',
        options: ['Undying art — the song \'was not born for death,\' heard by emperor and clown across generations while each mortal listener fades', 'Death — the poem\'s whole drift is the wish to die', 'The poet\'s dying brother, straightforwardly', 'A hallucination with no symbolic weight'],
        answer: 'Undying art — the song \'was not born for death,\' heard by emperor and clown across generations while each mortal listener fades',
        hook: 'The death-wish is the speaker\'s, not the bird\'s — the poem\'s engine is the gap between a mortal who aches and a song that outlives him.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas that support, complicate, or enrich the primary theme of a literary work; in *Ode to a Nightingale*, they include the tension between imagination and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_19_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Label each of the eight stanzas by mental state — numbness to escape to ecstasy to ejection — then decide whether \'Do I wake or sleep?\' fails or finishes the arc.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are listening to a favourite song that makes you feel both incredibly happy and strangely sad at the same time — that mixed feeling is exactly what.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a poem and give one example from *Ode to a Nightingale* (do not use the primary theme of the.', options: [
                { text: 'A secondary theme is a recurring idea that supports or adds layers to the primary theme;', outcome: 'A secondary theme is a recurring idea that supports or adds layers to the primary theme; for.' },
                { text: 'the limitation of imagination (Fancy) as a means of escape', outcome: 'Not quite — Students often treat every noun in the poem (wine, Ruth, Hippocrene, Lethe) as a separate "theme".', reveals: 'students-often-treat-every-noun' },
                { text: 'the fancy cannot cheat so well / As she is fam\'d to do', outcome: 'Not quite — Students often treat every noun in the poem (wine, Ruth, Hippocrene, Lethe) as a separate "theme".', reveals: 'students-often-treat-every-noun' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are describing the taste of your favourite monsoon snack — hot *pakoras* with chutney — to a friend who has never eaten it.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" as literary devices, giving one example of each from *Ode to a Nightingale* (cite line or stanza reference).', options: [
                { text: '**Correct answer:** Imagery: language appealing to senses', outcome: '**Correct answer:** Imagery: language appealing to senses; e.g., visual "purple-stained mouth".' },
                { text: 'like/as', outcome: 'Not quite — Students believe "imagery" means only *visual* description (pictures in the mind) and that.', reveals: 'imagery-means-only-visual-description' },
                { text: 'imagery', outcome: 'Not quite — Students believe "imagery" means only *visual* description (pictures in the mind) and that.', reveals: 'imagery-means-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are listening to a song so beautiful it makes you forget your own pain, yet the singer is a fragile bird that will die, while the song seems.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from "Ode to a Nightingale" for each device.', options: [
                { text: 'Correct answer: Irony is a contrast between expectation and reality; for example, the', outcome: 'Correct answer: Irony is a contrast between expectation and reality; for example, the poet calls.' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students frequently confuse symbolism with metaphor, treating every comparative image as a symbol.', reveals: 'students-frequently-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading Keats\'s poem for the first time and stumble upon "Lethe-wards had sunk." You don\'t know "Lethe," but you notice "sunk" and the earlier.',
            decisions: [{ prompt: 'What is the primary contextual clue in the first stanza that helps a reader infer the meaning of "hemlock" without a dictionary?', options: [
                { text: 'The primary clue is the syntactic parallelism and semantic association: "hemlock I had', outcome: 'The primary clue is the syntactic parallelism and semantic association: "hemlock I had drunk".' },
                { text: 'hemlock is a tree', outcome: 'Not quite — Students believe "vocabulary in context" means **guessing a synonym** that fits the sentence.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means **guessing a synonym** that fits the sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading the poem aloud and stumble over phrases like "Thou wast not born for death" or "Tasting of Flora and the country green".',
            decisions: [{ prompt: 'Identify two archaic pronouns used in the poem and state their modern equivalents.', options: [
                { text: 'The poem uses "thou" (subject form, modern \'you\') and "thee" (object form, modern \'you\')', outcome: 'The poem uses "thou" (subject form, modern \'you\') and "thee" (object form, modern \'you\').' },
                { text: 'old-fashioned language', outcome: 'Not quite — Students often think that grammatical deviations in poetry are errors or simply "old-fashioned.', reveals: 'grammatical-deviations-in-poetry-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the first question asks: "How does the nightingale\'s song plunge the poet into a state of ecstasy?" You might.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What has the', outcome: 'A literal question asks for information directly stated in the text (e.g., "What has the poet.' },
                { text: 'literal is easy, inferential is hard', outcome: 'Not quite — Students often treat inferential questions as "guessing" and write personal opinions unrelated.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a literature circle, a friend presents \'Ode to a Nightingale\' as \'Keats\'s death poem — the bird is the afterlife calling him, and he wants to die.\' Others nod along. You\'re asked for your reading.',
            decisions: [{ prompt: 'What\'s the nightingale, and what is the poem\'s real arc?', options: [
                { text: 'Separate the speaker\'s longing from the bird\'s meaning: the nightingale is undying art — \'No hungry generations tread thee down\' — a song heard by emperors and Ruth alike. The speaker\'s \'rich to die\' is a death-wish the poem tests and rejects; the real plot is psychological: his mind escapes into the bird\'s world across the stanzas and is violently ejected back by \'forlorn\'.', outcome: 'Context does its work — a 24-year-old nursing a dying brother worshipping beauty as truth — and the ode reads as a journey into imagination and back, not a suicide note.' },
                { text: 'Support the friend\'s reading — \'Lethe\', \'fade away\', and \'rich to die\' all point to death, so the bird is death\'s messenger.', outcome: 'That conflates the speaker\'s mood with the symbol: the bird is precisely what does NOT die — living immortality through song, contrasted with mortal longing.', reveals: 'nightingale-means-death' },
                { text: 'Read it as a nature description — Keats catalogues the forest, wine, flowers, and Ruth as beautiful images.', outcome: 'The stanzas are decisions, not descriptions: \'I cannot see what flowers are at my feet\' is the speaker deliberately constructing a darkness he prefers over painful reality.', reveals: 'ode-is-nature-catalogue' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_19_012', title: 'The bigger picture',
          caseStudy: { intro: 'The song flees and the ache returns — but the speaker has been somewhere, and the unanswered question is the souvenir.',
            decisions: [{ prompt: 'What comes next? Ode to a Nightingale (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Ode to a Nightingale (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas that support, complicate, or enrich.',
          hint: 'Review the stanza-wise summary from node 19_002 and the primary theme statement from node.',
          misconception: 'Students often treat every noun in the poem (wine, Ruth, Hippocrene, Lethe) as a separate "theme" instead of seeing.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "secondary theme" to stanza 3: identify the theme, quote two phrases that evidence it, and explain how it contrasts with the nightingale\'s.', answer: 'Secondary theme: the inevitability of suffering and decay in human life',
                  options: ['Secondary theme: the inevitability of suffering and decay in human life', 'instead of seeing them as *vehicles* for broader ideas like', 'timelessness', 'oblivion'],
                  hint: 'Review the stanza-wise summary from node 19_002 and the primary theme statement from node 19_006.',
                  misconception: 'Students often treat every noun in the poem (wine, Ruth, Hippocrene, Lethe) as a separate "theme" instead of seeing them as *vehicles* for.' },
                { id: 'b', prompt: 'Analyze how the reference to Ruth in stanza 6 expands the secondary theme of "the universality and timelessness of the bird\'s song."', answer: 'By invoking Ruth',
                  options: ['By invoking Ruth', 'instead of seeing them as *vehicles* for broader ideas like', 'timelessness', 'oblivion'],
                  hint: 'Review the stanza-wise summary from node 19_002 and the primary theme statement from node 19_006.',
                  misconception: 'Students often treat every noun in the poem (wine, Ruth, Hippocrene, Lethe) as a separate "theme" instead of seeing them as *vehicles* for.' }
          ],
            remediations: { 'students-often-treat-every-noun': { steps: ['Ask the student to complete this sentence frame for three different stanzas: "In stanza __, Keats uses the image.', 'Have them label each completion as either "Primary Theme" or "Secondary Theme" by checking if it directly contrasts.', 'Provide a two-column table: Column A lists motifs (wine, Ruth, Fancy, Lethe); Column B requires the thematic statement.', 'Model one example together, then let them finish the table before re-attempting the diagnostic questions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid and descriptive language that appeals to the senses.',
          hint: 'If stuck, review "PEEL paragraph structure" (c11_eng_w_cbse_19_014) and "identifying.',
          misconception: 'Students believe "imagery" means only *visual* description (pictures in the mind) and that "metaphor" is merely.',
          parts: [
                { id: 'a', prompt: 'Define "imagery" and "metaphor" as literary devices, giving one example of each from *Ode to a Nightingale* (cite line or stanza reference).', answer: '**Correct answer:** Imagery: language appealing to senses',
                  options: ['**Correct answer:** Imagery: language appealing to senses', 'like/as', 'imagery', 'metaphor'],
                  hint: 'If stuck, review "PEEL paragraph structure" (c11_eng_w_cbse_19_014) and "identifying sensory words".',
                  misconception: 'Students believe "imagery" means only *visual* description (pictures in the mind) and that "metaphor" is merely a decorative substitution.' },
                { id: 'b', prompt: 'In stanza 3, Keats lists "The weariness, the fever, and the fret / Here, where men sit and hear each other groan." Identify the dominant sensory imagery here.', answer: '**Correct answer:** Dominant imagery: auditory ("hear each other groan") and',
                  options: ['**Correct answer:** Dominant imagery: auditory ("hear each other groan") and', 'imagery', 'metaphor'],
                  hint: 'If stuck, review "PEEL paragraph structure" (c11_eng_w_cbse_19_014) and "identifying sensory words".',
                  misconception: 'Students believe "imagery" means only *visual* description (pictures in the mind) and that "metaphor" is merely a decorative substitution.' },
                { id: 'c', prompt: 'Analyze how the *progression* of imagery across stanzas 1–3 moves from the bird\'s realm to the human realm.', answer: '**Correct answer:** Stanza 1: bird\'s realm',
                  options: ['**Correct answer:** Stanza 1: bird\'s realm', 'imagery', 'metaphor'],
                  hint: 'If stuck, review "PEEL paragraph structure" (c11_eng_w_cbse_19_014) and "identifying sensory words".',
                  misconception: 'Students believe "imagery" means only *visual* description (pictures in the mind) and that "metaphor" is merely a decorative substitution.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['**Sensory Audit:** Give the student a single stanza (e.g., stanza 2).', 'Have them draw five columns (Sight, Sound, Taste, Touch, Smell) and place *every* sensory word in the correct column.', '**Metaphor Surgery:** Take the metaphor "light-winged Dryad." Ask: "What two things are equated?', 'What *qualities* of a Dryad (tree-spirit, immortality, bond to nature) are transferred to the bird?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "imagery" means only *visual* description (pictures in the mind) and that "metaphor" is merely.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The nightingale\'s immortality in stanza 6 (\'Thou wast not born for death, immortal Bird!\') is established solely through the metaphor.', answer: '**Correct answer:** Refute',
                  options: ['**Correct answer:** Refute', 'metaphor', 'and ignores the evidentiary chain of images'],
                  hint: 'If stuck, review "PEEL paragraph structure" (c11_eng_w_cbse_19_014) and "identifying sensory words".',
                  misconception: 'Students believe "imagery" means only *visual* description (pictures in the mind) and that "metaphor" is merely a decorative substitution.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['**Sensory Audit:** Give the student a single stanza (e.g., stanza 2).', 'Have them draw five columns (Sight, Sound, Taste, Touch, Smell) and place *every* sensory word in the correct column.', '**Metaphor Surgery:** Take the metaphor "light-winged Dryad." Ask: "What two things are equated?', 'What *qualities* of a Dryad (tree-spirit, immortality, bond to nature) are transferred to the bird?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_009', difficulty: 'standard',
          question: 'Irony is a literary device where a contrast exists between expectation and.',
          hint: 'Review the definitions of irony types using "The Necklace" (situational) and "A Letter.',
          misconception: 'Students frequently confuse symbolism with metaphor, treating every comparative image as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where a contrast exists between expectation and reality, or',
                  options: ['Irony is a literary device where a contrast exists between expectation and reality, or', '"Before You Read: Context and Background" provides the essential historical,', 'Narrative structure in a lyric poem like "Ode to a Nightingale" refers to the organized', 'In poetry, **setting** refers to the time, place, and physical environment where the'],
                  hint: 'Review the definitions of irony types using "The Necklace" (situational) and "A Letter to God".',
                  misconception: 'Students frequently confuse symbolism with metaphor, treating every comparative image as a symbol.' }
          ],
            remediations: { 'students-frequently-confuse-symbolism-with': { steps: ['Re-read stanza 7 aloud and underline the phrases "hungry generations," "emperor and clown," and "Ruth." Ask: what does.', 'Make a two-column table. Column A: concrete objects/images in the poem (nightingale, wine, forest, bell, "viewless.', 'For each pairing, write one sentence explaining how the object *sustains* that meaning across stanzas.', 'Locate the moment in stanza 8 where the speaker\'s expectation (permanent union with the bird) meets reality (the song.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_010', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the meaning of unfamiliar.',
          hint: 'Review the **stanza-by-stanza emotional arc** (node c11_eng_w_cbse_19_002) and the.',
          misconception: 'Students believe "vocabulary in context" means **guessing a synonym** that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context is the skill of determining the meaning of unfamiliar words by',
                  options: ['Vocabulary in context is the skill of determining the meaning of unfamiliar words by', '"Before You Read: Context and Background" provides the essential historical,', 'Narrative structure in a lyric poem like "Ode to a Nightingale" refers to the organized', 'In poetry, **setting** refers to the time, place, and physical environment where the'],
                  hint: 'Review the **stanza-by-stanza emotional arc** (node c11_eng_w_cbse_19_002) and the **imagery.',
                  misconception: 'Students believe "vocabulary in context" means **guessing a synonym** that fits the sentence grammatically.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Re-read the stanza aloud** — hear the vowel/consonant music of the target word (e.g., the liquid \'l\'s in "plaintive,".', '**Mark the "clue chain":** Underline the 3-4 words immediately preceding and following the target word; draw arrows.', '**Use the textbook glosses as evidence, not answers:** For "Hippocrene," write: "Gloss = fountain of poetic inspiration.', '**Write a "context definition"** in your notebook: "In *this* poem, [word] means [definition] because [specific.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the study of grammatical structures.',
          hint: 'Review Class 10 grammar: sentence types (declarative, imperative, exclamatory), verb.',
          misconception: 'Students often think that grammatical deviations in poetry are errors or simply "old-fashioned language" with.',
          parts: [
                { id: 'a', prompt: 'In the line "Fade far away, dissolve, and quite forget", identify the grammatical form of the verbs and rewrite the line in standard modern English prose word.', answer: 'The verbs are imperative mood (commands)',
                  options: ['The verbs are imperative mood (commands)', 'old-fashioned language'],
                  hint: 'Review Class 10 grammar: sentence types (declarative, imperative, exclamatory), verb forms.',
                  misconception: 'Students often think that grammatical deviations in poetry are errors or simply "old-fashioned language" with no functional purpose.' }
          ],
            remediations: { 'grammatical-deviations-in-poetry-are': { steps: ['Give the student a short prose version of a stanza (e.g., rewrite Stanza 2 in standard English) and ask them to compare.', 'Have them identify the subject-verb-object order in a normal sentence, then find where Keats disrupts it.', 'Ask them to read the poem aloud, emphasizing the inverted phrases, and discuss how the rhythm changes.', 'Finally, assign a mini-task: convert three modern sentences into Keatsian style using inversion, archaism, and ellipsis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_19_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'Review the distinction between simile (explicit comparison) and metaphor (implicit.',
          misconception: 'Students often treat inferential questions as "guessing" and write personal opinions unrelated to the text.',
          parts: [
                { id: 'a', prompt: 'In the poem, the poet says, "My heart aches, and a drowsy numbness pains / My sense, as though of hemlock I had drunk".', answer: 'This is a literal question',
                  options: ['This is a literal question', 'hemlock'],
                  hint: 'Review the distinction between simile (explicit comparison) and metaphor (implicit comparison).',
                  misconception: 'Students often treat inferential questions as "guessing" and write personal opinions unrelated to the text.' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this question: "What are the unpleasant aspects of the human condition that the poet wants to escape from?" List.', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'weariness, fever, fret'],
                  hint: 'Review the distinction between simile (explicit comparison) and metaphor (implicit comparison).',
                  misconception: 'Students often treat inferential questions as "guessing" and write personal opinions unrelated to the text.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['Have the student re-read the poem and highlight every concrete noun and verb in the relevant stanza.', 'Ask them to write one literal fact per highlighted word.', 'Then guide them to connect two facts with a logical connector (e.g., "because", "therefore") to form an inference.', 'Practice with a simpler poem first, using a two-column table: "Text says" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
