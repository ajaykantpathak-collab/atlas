import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch08_p2: SimDef = {
    id: 'v3_c12_eng_k_ch08_p2',
    title: 'Poems by Blake (Poem) · Part 2/3',
    subtitle: 'One soul, two songs — and neither is the correction',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Blake (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch08'],
    nodeIds: ['c12_eng_k_cbse_08_007', 'c12_eng_k_cbse_08_008', 'c12_eng_k_cbse_08_009', 'c12_eng_k_cbse_08_010', 'c12_eng_k_cbse_08_011', 'c12_eng_k_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic-era critic', intro: 'A poet-engraver who hated the industrial age wrote two books that disagree with each other — on purpose.', goal: 'Read Blake\'s Songs of Innocence and Experience as contrary states, and see how illuminated printing fuses text and image.' },
    discovery: {
        question: 'Blake writes \'The Divine Image\' praising Mercy, Pity, Peace, Love — then \'The Human Abstract\' showing cruelty growing from the same tree. Did the adult outgrow the child\'s innocence?',
        options: ['No — they\'re \'two contrary states of the human soul,\' simultaneous and warring, not a before-and-after correction', 'Yes — Experience replaced Innocence', 'They\'re unrelated poems', 'Innocence is for children only'],
        answer: 'No — they\'re \'two contrary states of the human soul,\' simultaneous and warring, not a before-and-after correction',
        hook: 'Innocence isn\'t naivety and Experience isn\'t just cynicism — both live in one person at once. And Blake etched his poems into copper himself because the image is part of the argument: illuminated printing was rebellion against art made by machine.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Poems by Blake\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold both Blakes at once: read The Divine Image\'s prayer beside The Human Abstract\'s trap, then map how the same virtues become \'selfish loves\' when Experience twists them.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Poems by Blake\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'List two secondary themes present in "The Divine Image" and briefly state the textual evidence for each (e.g., specific lines or images).', options: [
                { text: '**Correct Answer:** 1', outcome: '**Correct Answer:** 1. **Anthropomorphism of the Divine/Virtues**: The poem equates God and.' },
                { text: 'as themes without a statement (e.g', outcome: 'Not quite — Students often treat secondary themes as **mere "sub-topics"** (e.g., "religion," "poverty,".', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Poems by Blake\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "metaphor" and distinguish it from "simile" using the exact terminology of tenor and vehicle.', options: [
                { text: 'A metaphor directly equates tenor (subject) and vehicle (image) without comparative words', outcome: 'A metaphor directly equates tenor (subject) and vehicle (image) without comparative words; a simile.' },
                { text: 'metaphor uses like or as', outcome: 'Not quite — Students often treat imagery as "descriptive writing" and metaphor as "a fancy comparison".', reveals: 'students-often-treat-imagery-as' },
                { text: 'says "metaphor uses like or as" reveals confusion with simile', outcome: 'Not quite — Students often treat imagery as "descriptive writing" and metaphor as "a fancy comparison".', reveals: 'students-often-treat-imagery-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Poems by Blake\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Identify **four abstract nouns** that are capitalized and personified in the first stanza of "The Divine Image" and state the human.', options: [
                { text: 'The four capitalized abstract nouns in stanza 1 of "The Divine Image" are **Mercy, Pity,', outcome: 'The four capitalized abstract nouns in stanza 1 of "The Divine Image" are **Mercy, Pity, Peace, and.' },
                { text: '\'God\' or \'Man\' or missing the explicit body-part mapping', outcome: 'Not quite — **Misconception:** "Vocabulary in context means looking up the dictionary definition of hard words.', reveals: 'misconception-vocabulary-in-context-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Poems by Blake\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'In "The Divine Image," the words Mercy, Pity, Peace, and Love are capitalized throughout.', options: [
                { text: 'The capitalization transforms these abstract nouns into proper nouns, personifying them', outcome: 'The capitalization transforms these abstract nouns into proper nouns, personifying them as divine.' },
                { text: 'they are at the start of a line', outcome: 'Not quite — Students often think "capitalization in poetry is just for emphasis" or "old poems use weird.', reveals: 'capitalization-in-poetry-is-just' },
                { text: 'they are important words', outcome: 'Not quite — Students often think "capitalization in poetry is just for emphasis" or "old poems use weird.', reveals: 'capitalization-in-poetry-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Poems by Blake\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define literal comprehension and inferential comprehension in your own words.', options: [
                { text: 'Literal comprehension: retrieving information directly stated in the text (e.g., "What', outcome: 'Literal comprehension: retrieving information directly stated in the text (e.g., "What four virtues.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "subjective opinion" — they write "I think Mercy means.', reveals: 'inferential-means-subjective-opinion-they' },
                { text: 'opinion-based', outcome: 'Not quite — Students believe "inferential" means "subjective opinion" — they write "I think Mercy means.', reveals: 'inferential-means-subjective-opinion-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An NGO head notices their flagship \'compassion programme\' quietly depends on keeping beneficiaries visibly needy for donors. Nobody wants to say it aloud.',
            decisions: [{ prompt: 'What would Blake\'s paired poems flag here?', options: [
                { text: 'That a \'virtue\' feeding on others\' misery is already corrupt — \'The Human Abstract\' shows pity engineered by those who need poverty to continue; redesign for dignity and self-sufficiency.', outcome: 'Blake\'s contrary states: the same organisation can house innocent intention and experienced cynicism — examine which your structure actually rewards.' },
                { text: 'Nothing — compassion is compassion; don\'t overthink a good deed.', outcome: 'The Divine Image taken alone misses that unexamined virtue can be manufactured by the very suffering it claims to relieve.', reveals: 'virtue-without-examination' },
                { text: 'Shut it down — all organised charity is hidden cynicism.', outcome: 'Blake doesn\'t crown Experience as truth; he shows both states are human and the task is integration, not abandonment.', reveals: 'experience-is-superior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poet\'s contradictions as dialectic, not confusion — Blake teaches that the divided soul is the honest one.',
            decisions: [{ prompt: 'What comes next? Poems by Blake (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poems by Blake (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_007', difficulty: 'standard',
          question: 'Secondary themes in \'Poems by Blake\' — the supporting ideas and motifs that.',
          hint: 'If stuck, review the "Understanding the Poem" questions in the NCERT text (especially Q1.',
          misconception: 'Students often treat secondary themes as **mere "sub-topics"** (e.g., "religion," "poverty," "fear") rather than.',
          parts: [
                { id: 'a', prompt: 'List two secondary themes present in "The Divine Image" and briefly state the textual evidence for each (e.g., specific lines or images).', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'as themes without a statement (e.g'],
                  hint: 'If stuck, review the "Understanding the Poem" questions in the NCERT text (especially Q1: "How are.',
                  misconception: 'Students often treat secondary themes as **mere "sub-topics"** (e.g., "religion," "poverty," "fear") rather than **thematic statements**.' },
                { id: 'b', prompt: 'Analyze the shift in the depiction of **Peace** across the two poems.', answer: '**Correct Answer:** In Innocence, Peace is an *internal, wearable grace*',
                  options: ['**Correct Answer:** In Innocence, Peace is an *internal, wearable grace*', 'Peace is good in the first poem, bad in the second'],
                  hint: 'If stuck, review the "Understanding the Poem" questions in the NCERT text (especially Q1: "How are.',
                  misconception: 'Students often treat secondary themes as **mere "sub-topics"** (e.g., "religion," "poverty," "fear") rather than **thematic statements**.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot generate thematic statements: 1.', '**Re-read both poems** and list every capitalized abstract noun (Mercy, Pity, Peace, Love, Cruelty, Humility, Mystery.', '**For each noun, complete this sentence**: "The poem suggests that [Noun] is actually ________." (e.g., "Pity.', '**Group the completions** into 3-4 clusters (e.g., "Virtues need victims," "Fear masquerades as peace," "Evil grows.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_008', difficulty: 'standard',
          question: 'Imagery in \'Poems by Blake\' — the vivid, sensory language that creates.',
          hint: 'Review the difference between simile and metaphor using the Class 10 node.',
          misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "a fancy comparison".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Blake capitalises Mercy, Pity, Peace, and Love in both poems.', answer: 'Capitalisation personifies the abstract virtues as active agents or characters',
                  options: ['Capitalisation personifies the abstract virtues as active agents or characters', 'it\'s just for emphasis'],
                  hint: 'Review the difference between simile and metaphor using the Class 10 node c10_engl_cbse_03_007.',
                  misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "a fancy comparison".' },
                { id: 'b', prompt: 'In "The Human Abstract", the lines "He sits down with holy fears, / And waters the ground with tears" contain an implied metaphor.', answer: 'Tenor: the hypocritical cultivator of false virtue',
                  options: ['Tenor: the hypocritical cultivator of false virtue', 'waters the ground', 'treats "waters the ground" as literal gardening misses the sustained metaphor'],
                  hint: 'Review the difference between simile and metaphor using the Class 10 node c10_engl_cbse_03_007.',
                  misconception: 'Students often treat imagery as "descriptive writing" and metaphor as "a fancy comparison".' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Re-read c11_eng_h_cbse_01_008 (Class 11 Imagery and Metaphor node) focusing on the "tenor/vehicle/grounds" framework.', 'Take the two poems and, for each metaphor, fill a three-column table: Tenor | Vehicle | Grounds (shared quality).', 'Re-attempt Diagnostic Questions 3 and 4 using the table.', 'If still stuck, watch a 10-minute video on "Blake\'s contrary states" and map each image to either Innocence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Poems by Blake\' — where opposite things are both true,.',
          hint: 'If stuck on "why is this irony not just sadness?", review the **"mutual fear brings.',
          misconception: '**Misconception:** "Irony in these poems is just that the second poem contradicts the first." **Why it\'s wrong:** That.',
          parts: [
                { id: 'a', prompt: 'Analyse the symbol of the **Raven** in *The Human Abstract*. How does it transform the traditional symbol of the raven (death, ill omen) into a specifically.', answer: '**Correct answer:** Traditionally, the raven symbolises death or prophecy',
                  options: ['**Correct answer:** Traditionally, the raven symbolises death or prophecy', 'the raven means death'],
                  hint: 'If stuck on "why is this irony not just sadness?", review the **"mutual fear brings peace"** stanza.',
                  misconception: '**Misconception:** "Irony in these poems is just that the second poem contradicts the first." **Why it\'s wrong:** That is **contrast**, not.' }
          ],
            remediations: { 'misconception-irony-in-these-poems': { steps: ['**Revisit definitions**: Use c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism) — re-read the "Irony vs.', 'Coincidence" and "Symbol vs.', '**Micro-practice**: Take *one* stanza of *The Human Abstract* (e.g., stanza 2: "And mutual fear brings peace...").', 'Write three sentences: (a) What is the surface meaning?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Poems by Blake\' — the words and phrases you must know.',
          hint: 'If stuck, review **c11_eng_h_cbse_01_010** (Class 11 Hornbill Vocabulary in Context).',
          misconception: '**Misconception:** "Vocabulary in context means looking up the dictionary definition of hard words in the poem." **Why.',
          parts: [
                { id: 'a', prompt: '**Apply** the concept of "semantic shift" to the word **"Pity."** Compare its role in the opening lines of both poems: *The Divine Image*: "To Mercy, Pity.', answer: 'In *The Divine Image*, **Pity is a divine virtue**',
                  options: ['In *The Divine Image*, **Pity is a divine virtue**', 'Pity is good in both', 'Pity is bad in the second'],
                  hint: 'If stuck, review **c11_eng_h_cbse_01_010** (Class 11 Hornbill Vocabulary in Context) — specifically.',
                  misconception: '**Misconception:** "Vocabulary in context means looking up the dictionary definition of hard words in the poem." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-vocabulary-in-context-means': { steps: ['If a student cannot distinguish dictionary meaning from poetic function: 1.', '**Revisit** the capitalization pattern: have them list *every* capitalized common noun in both poems side-by-side.', 'Cruelty/Humility/Mystery/Deceit/Raven).', '**Model** a "Word Autopsy" on one pair (e.g., \'Peace\'): In Poem 1 → "human dress" (protective, worn by all).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_011', difficulty: 'standard',
          question: 'Language and style in \'Poems by Blake\' — how the writer chose words, sentences.',
          hint: 'If stuck, review Class 6 Grammar: Nouns and Pronouns (c6_english_u1_008) for noun types.',
          misconception: 'Students often think "capitalization in poetry is just for emphasis" or "old poems use weird grammar because English.',
          parts: [
                { id: 'a', prompt: 'In "The Human Abstract," Blake writes: "And mutual fear brings peace, / Till the selfish loves increase." Rewrite the second line in standard.', answer: 'Standard order: "Till the selfish loves increase" is already SVO',
                  options: ['Standard order: "Till the selfish loves increase" is already SVO', 'The Human Abstract', 'Divine Image', 'capitalization in poetry is just for emphasis'],
                  hint: 'If stuck, review Class 6 Grammar: Nouns and Pronouns (c6_english_u1_008) for noun types, and Class.',
                  misconception: 'Students often think "capitalization in poetry is just for emphasis" or "old poems use weird grammar because English was different then.".' }
          ],
            remediations: { 'capitalization-in-poetry-is-just': { steps: ['Revisit c12_eng_k_cbse_08_010 (Vocabulary in Context) to review the list of capitalized words in both poems.', 'Practice scanning iambic meter using the first stanza of "The Divine Image" with a metronome or finger-tapping.', 'Complete a T-chart: left column "Divine Image capitalized words," right column "Human Abstract capitalized words".', 'Re-attempt Diagnostic Questions 1 and 5 after the T-chart.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "capitalization in poetry is just for emphasis" or "old poems use weird grammar because English.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Blake capitalizes \'Cruelty,\' \'Humility,\' \'Mystery,\' and \'Deceit\' in \'The Human Abstract\' for the same reason he capitalizes \'Mercy\' and.', answer: 'Refute',
                  options: ['Refute', 'yes, same reason', 'capitalization in poetry is just for emphasis', 'old poems use weird grammar'],
                  hint: 'If stuck, review Class 6 Grammar: Nouns and Pronouns (c6_english_u1_008) for noun types, and Class.',
                  misconception: 'Students often think "capitalization in poetry is just for emphasis" or "old poems use weird grammar because English was different then.".' }
          ],
            remediations: { 'capitalization-in-poetry-is-just': { steps: ['Revisit c12_eng_k_cbse_08_010 (Vocabulary in Context) to review the list of capitalized words in both poems.', 'Practice scanning iambic meter using the first stanza of "The Divine Image" with a metronome or finger-tapping.', 'Complete a T-chart: left column "Divine Image capitalized words," right column "Human Abstract capitalized words".', 'Re-attempt Diagnostic Questions 1 and 5 after the T-chart.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_08_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Poems by Blake\' — questions answered straight from.',
          hint: 'If stuck on inferential questions, return to c12_eng_k_cbse_08_008 (Imagery and Metaphor).',
          misconception: 'Students believe "inferential" means "subjective opinion" — they write "I think Mercy means kindness" instead of "The.',
          parts: [
                { id: 'a', prompt: 'A student writes this answer to "How is the human being depicted in The Divine Image?": "The human being is depicted as divine because the poem says \'Love, the.', answer: 'This is a LITERAL answer',
                  options: ['This is a LITERAL answer', 'inferential', 'subjective opinion', 'I think Mercy means kindness'],
                  hint: 'If stuck on inferential questions, return to c12_eng_k_cbse_08_008 (Imagery and Metaphor) and.',
                  misconception: 'Students believe "inferential" means "subjective opinion" — they write "I think Mercy means kindness" instead of "The poem shows Mercy has.' },
                { id: 'b', prompt: 'Classify each question below as Literal (L) or Inferential (I) for "The Human Abstract": (a) What does "mutual fear" bring, according to stanza 2?', answer: '(a) L — directly stated: "mutual fear brings peace" (stanza 2, line 1)',
                  options: ['(a) L — directly stated: "mutual fear brings peace" (stanza 2, line 1)', 'inferential', 'subjective opinion', 'I think Mercy means kindness'],
                  hint: 'If stuck on inferential questions, return to c12_eng_k_cbse_08_008 (Imagery and Metaphor) and.',
                  misconception: 'Students believe "inferential" means "subjective opinion" — they write "I think Mercy means kindness" instead of "The poem shows Mercy has.' }
          ],
            remediations: { 'inferential-means-subjective-opinion-they': { steps: ['Have the student take any 5 questions from NCERT "Understanding the Poem" (p.', 'For each I question, force the student to write: "Evidence 1: [quote]; Evidence 2: [quote]; Therefore: [inference]."', 'Give them a fresh stanza (e.g., from "The Chimney Sweeper" pair) and ask them to generate 2 L and 2 I questions with.', 'Re-diagnose using Diagnostic Questions 3 and 4 above.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
