import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch09_p2: SimDef = {
    id: 'v3_c11_eng_h_ch09_p2',
    title: 'A Photograph (Poem) · Part 2/3',
    subtitle: 'Watch a poem hold three times in one cardboard frame.',
    classLevel: 11, subject: 'eng_h', topic: 'A Photograph (Poem) · Part 2/3',
    chapters: ['c11_eng_h_ch09'],
    nodeIds: ['c11_eng_h_cbse_09_007', 'c11_eng_h_cbse_09_008', 'c11_eng_h_cbse_09_009', 'c11_eng_h_cbse_09_010', 'c11_eng_h_cbse_09_011', 'c11_eng_h_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a photograph that outlived its subject', intro: 'A faded beach holiday: the child in it grew up, laughed at it, and is gone — and the poet is left with the looking.', goal: 'Read the poem as a narrative across time frames and connect its structure to transience.' },
    discovery: {
        question: 'Three stanzas, three different times: a girl on a beach, a mother laughing at the photo, a poet in silence. Which stanza is the climax?',
        options: ['The second — the mother\'s laughter at the photo, where joy and the ache of lost time collide', 'The first — the photograph being taken is the peak event', 'The third — the mother\'s death is the climax', 'None — a photograph has no plot to climax'],
        answer: 'The second — the mother\'s laughter at the photo, where joy and the ache of lost time collide',
        hook: 'The poem isn\'t describing an object — it\'s a story memory tells in jumps: the day captured, the woman who laughed at it, the silence she left.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'A Photograph\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark the time period each stanza inhabits, place the arc\'s stages, and test whether the three-stanza shape itself enacts transience.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'A Photograph\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that enriches the primary theme by exploring', outcome: 'A secondary theme is a supporting idea that enriches the primary theme by exploring related facets.' },
                { text: 'sub-plots', outcome: 'Not quite — Students often confuse secondary themes with *literary devices* (e.g., "the secondary theme.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'minor topics', outcome: 'Not quite — Students often confuse secondary themes with *literary devices* (e.g., "the secondary theme.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'A Photograph\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor. Give one example of each from the poem "A Photograph."', options: [
                { text: 'Imagery: Language appealing to senses (e.g., "paddling," "wet hair," "sea holiday" –', outcome: 'Imagery: Language appealing to senses (e.g., "paddling," "wet hair," "sea holiday".' },
                { text: 'feet *like* transient things', outcome: 'Not quite — Students often conflate imagery and metaphor, treating any descriptive phrase as a metaphor (e.g.', reveals: 'students-often-conflate-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'A Photograph\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example of each from everyday life (not from the poem).', options: [
                { text: 'Irony is a situation where the outcome is opposite to what was expected (e.g., a fire', outcome: 'Irony is a situation where the outcome is opposite to what was expected (e.g., a fire station.' },
                { text: 'a funny coincidence', outcome: 'Not quite — Students often confuse irony with simple sadness or coincidence, saying "It\'s ironic that the.', reveals: 'students-often-confuse-irony-with' },
                { text: 'a metaphor', outcome: 'Not quite — Students often confuse irony with simple sadness or coincidence, saying "It\'s ironic that the.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'A Photograph\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary difference between a dictionary definition of a word and its contextual meaning in a poem like "A Photograph"?', options: [
                { text: 'A dictionary definition provides a fixed, general, and decontextualized meaning', outcome: 'A dictionary definition provides a fixed, general, and decontextualized meaning.' },
                { text: 'They are the same', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from the sentence." They look.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'Contextual meaning is just the dictionary meaning applied to the sentence', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from the sentence." They look.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'A Photograph\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the tense of the verb phrase "have changed" in the line "The sea holiday / was her past, mine is her laughter.', options: [
                { text: 'The verb phrase "has changed" is in the **present perfect tense** (has + past participle)', outcome: 'The verb phrase "has changed" is in the **present perfect tense** (has + past participle).' },
                { text: 'has changed', outcome: 'Not quite — Students believe "grammar in poetry" means finding examples of parts of speech (nouns, verbs.', reveals: 'grammar-in-poetry-means-finding' },
                { text: 'grammar in poetry', outcome: 'Not quite — Students believe "grammar in poetry" means finding examples of parts of speech (nouns, verbs.', reveals: 'grammar-in-poetry-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'A Photograph\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal comprehension question has an answer directly stated in the text (e.g., "How', outcome: 'A literal comprehension question has an answer directly stated in the text (e.g., "How many people.' },
                { text: 'she\'s been dead nearly as many years as that girl lived', outcome: 'Not quite — Students often believe that inferential questions have no "right" answer and that any guess.', reveals: 'inferential-questions-have-no-right' },
                { text: 'inferential questions have no "right" answer and that any guess is acceptable', outcome: 'Not quite — Students often believe that inferential questions have no "right" answer and that any guess.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry workshop, students present on \'A Photograph\'. One presenter says: \'It\'s a poem about an old photo — the cardboard, the sea, the cousins\' holiday clothes. The speaker is the girl paddling in the water, remembering her beach day.\'',
            decisions: [{ prompt: 'Untangle the poem\'s voices and timeframes.', options: [
                { text: 'Three layers, two voices: the girl on the beach is the poet\'s MOTHER as a child; the mother later looked at the photo and laughed at how she\'d changed; now the poet looks at it after her mother\'s death — the \'silence\' mourning a double loss. The photograph isn\'t the subject; it\'s a trigger for a meditation on time and mortality.', outcome: 'Track who\'s looking and when: past (mother\'s childhood), recent past (mother\'s adulthood), present (poet\'s grief) — miss a layer and the poem becomes a postcard.' },
                { text: 'The presenter is right — the poem describes the photo\'s contents and the girl-speaker\'s happy memory.', outcome: 'That collapses three timeframes into one and swaps poet for mother — erasing the grief that the whole poem is built on.', reveals: 'speaker-is-the-girl' },
                { text: 'It\'s about photography as an art — how cardboard and chemistry preserve an image.', outcome: 'The object is a vehicle, not the tenor: the poem uses the frozen image to measure everything time has since taken away.', reveals: 'poem-is-about-photography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'Each stanza is a world that has already vanished — the form doesn\'t just state the theme, it performs it.',
            decisions: [{ prompt: 'What comes next? A Photograph (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Photograph (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_007', difficulty: 'standard',
          question: 'Secondary themes in \'A Photograph\' — the supporting ideas and motifs that.',
          hint: 'If stuck, review the three-stanza structure (node 002) and map each stanza to a time.',
          misconception: 'Students often confuse secondary themes with *literary devices* (e.g., "the secondary theme is metaphor") or treat them.',
          parts: [
                { id: 'a', prompt: 'In "A Photograph," the poet writes: "The sea holiday / was her past, mine is her laughter." Explain what this contrast reveals about a secondary theme.', answer: 'This contrast reveals the secondary theme of *the subjectivity of memory across',
                  options: ['This contrast reveals the secondary theme of *the subjectivity of memory across', 'the mother is dead', 'the secondary theme is metaphor'],
                  hint: 'If stuck, review the three-stanza structure (node 002) and map each stanza to a time frame: Stanza.',
                  misconception: 'Students often confuse secondary themes with *literary devices* (e.g., "the secondary theme is metaphor") or treat them as *separate.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists images or devices as themes: 1) Ask them to complete the sentence: "The poem shows that [image].', '3) Guide them to see which statement connects to the primary theme of loss.', '4) Use the "Theme Statement Formula": [Abstract Noun] + [Verb Phrase] + [Universal Insight] (e.g., "Grief transforms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse secondary themes with *literary devices* (e.g., "the secondary theme is metaphor") or treat them.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The photograph in the poem is merely a plot device to trigger the poet\'s memory; it does not embody a secondary theme itself." Defend.', answer: 'Refute',
                  options: ['Refute', 'cardboard', 'snapshot', 'the secondary theme is metaphor'],
                  hint: 'If stuck, review the three-stanza structure (node 002) and map each stanza to a time frame: Stanza.',
                  misconception: 'Students often confuse secondary themes with *literary devices* (e.g., "the secondary theme is metaphor") or treat them as *separate.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists images or devices as themes: 1) Ask them to complete the sentence: "The poem shows that [image].', '3) Guide them to see which statement connects to the primary theme of loss.', '4) Use the "Theme Statement Formula": [Abstract Noun] + [Verb Phrase] + [Universal Insight] (e.g., "Grief transforms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_008', difficulty: 'standard',
          question: 'Imagery in \'A Photograph\' — the vivid, sensory language that creates.',
          hint: 'Review Class 10 poetic devices: metaphor (c10_engl_cbse_03_007) and imagery analysis.',
          misconception: 'Students often conflate imagery and metaphor, treating any descriptive phrase as a metaphor (e.g., calling "wet hair".',
          parts: [
                { id: 'a', prompt: 'Read these lines from another poem: "The winter wind is a wolf howling at the door, / Its icy teeth biting the sleeping house." Identify the metaphor, name its.', answer: 'Metaphor: "winter wind is a wolf." Tenor: winter wind',
                  options: ['Metaphor: "winter wind is a wolf." Tenor: winter wind', 'icy teeth'],
                  hint: 'Review Class 10 poetic devices: metaphor (c10_engl_cbse_03_007) and imagery analysis.',
                  misconception: 'Students often conflate imagery and metaphor, treating any descriptive phrase as a metaphor (e.g., calling "wet hair" a metaphor for.' }
          ],
            remediations: { 'students-often-conflate-imagery-and': { steps: ['**Isolate definitions**: Use a two-column table: "Literal Description" vs.', '"Metaphorical Transfer." Practice with non-poem sentences (e.g., "The classroom was a zoo" vs.', '"The classroom was noisy").', '**Sensory hunt**: Give a short prose paragraph; have student highlight words for each sense (V, A, T, O, G).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_009', difficulty: 'standard',
          question: 'Irony and paradox in \'A Photograph\' — where opposite things are both true,.',
          hint: 'If stuck, re-read the poem and complete the "Three Time Frames" graphic organizer from.',
          misconception: 'Students often confuse irony with simple sadness or coincidence, saying "It\'s ironic that the mother died" — but death.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'A Photograph\'',
                  options: ['Irony and paradox in \'A Photograph\'', '\'A Photograph\' (Hornbill, ch', 'The plot/narrative arc of \'A Photograph\'', 'The setting of \'A Photograph\''],
                  hint: 'If stuck, re-read the poem and complete the "Three Time Frames" graphic organizer from node.',
                  misconception: 'Students often confuse irony with simple sadness or coincidence, saying "It\'s ironic that the mother died" — but death itself is not.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the poem focusing only on the three time shifts: mark them with brackets [Past], [Past-Present], [Present].', 'For each shift, write one sentence answering: "What is the expectation here?', 'List every concrete noun (sea, cardboard, feet, hands) and brainstorm abstract nouns they could represent (eternity.', 'Connect one irony and one symbol in a single PEEL paragraph: Point → Evidence (quote) → Explanation → Link to theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_010', difficulty: 'standard',
          question: 'Key vocabulary of \'A Photograph\' — the words and phrases you must know to read.',
          hint: 'If stuck, return to node c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and create.',
          misconception: 'Students believe "vocabulary in context" means "guess the meaning from the sentence." They look at "transient feet,".',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a dictionary definition of a word and its contextual meaning in a poem like "A Photograph"?', answer: 'A dictionary definition provides a fixed, general, and decontextualized meaning',
                  options: ['A dictionary definition provides a fixed, general, and decontextualized meaning', 'They are the same', 'Contextual meaning is just the dictionary meaning applied to the sentence', 'vocabulary in context'],
                  hint: 'If stuck, return to node c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and create a visual.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the sentence." They look at "transient feet," think "temporary.' },
                { id: 'b', prompt: 'Analyze the oxymoron "laboured ease" in the context of the mother\'s laughter ("My mother\'s, that was before I was born / And the sea... / ...', answer: '"Laboured ease" fuses the active struggle of grief ("laboured"',
                  options: ['"Laboured ease" fuses the active struggle of grief ("laboured"', 'vocabulary in context', 'guess the meaning from the sentence', 'transient feet'],
                  hint: 'If stuck, return to node c11_eng_h_cbse_09_002 (Plot and Narrative Structure) and create a visual.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the sentence." They look at "transient feet," think "temporary.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['**Re-read aloud, slowly:** Force the student to hear the sounds.', 'Ask: "Where does your voice slow down?', 'Catch?" (e.g., the pause at "Both wry / With the laboured ease").', '**Word Surgery:** Take ONE word ("transient").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_011', difficulty: 'standard',
          question: 'Language and style in \'A Photograph\' — how the writer chose words, sentences.',
          hint: 'Review Class 10 tense revision (especially present perfect vs.',
          misconception: 'Students believe "grammar in poetry" means finding examples of parts of speech (nouns, verbs, adjectives) or labeling.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'A Photograph\'',
                  options: ['Language and style in \'A Photograph\'', '\'A Photograph\' (Hornbill, ch', 'The plot/narrative arc of \'A Photograph\'', 'The setting of \'A Photograph\''],
                  hint: 'Review Class 10 tense revision (especially present perfect vs.',
                  misconception: 'Students believe "grammar in poetry" means finding examples of parts of speech (nouns, verbs, adjectives) or labeling tenses.' }
          ],
            remediations: { 'grammar-in-poetry-means-finding': { steps: ['Give the student a **tense-map template**: three columns (Stanza / Verbs / Tense / Time Reference).', 'Have them fill it for the poem.', 'Ask: "If the poet changed *every* verb to simple past, what would be lost?" Guide them to see the present perfect ("has.', 'Have them **rewrite one stanza in all simple past**, then read both aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_09_012', difficulty: 'standard',
          question: 'Literal comprehension of \'A Photograph\' — questions answered straight from the.',
          hint: 'Review the stanza-wise summary and the identification of speakers, characters, and.',
          misconception: 'Students often believe that inferential questions have no "right" answer and that any guess is acceptable.',
          parts: [
                { id: 'a', prompt: 'In the poem "A Photograph," the line "The sea holiday was her past, mine is her laughter" appears.', answer: 'It is an inferential question',
                  options: ['It is an inferential question', 'she\'s been dead nearly as many years as that girl lived', 'inferential questions have no "right" answer and that any guess is acceptable'],
                  hint: 'Review the stanza-wise summary and the identification of speakers, characters, and settings from.',
                  misconception: 'Students often believe that inferential questions have no "right" answer and that any guess is acceptable.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['If a student makes unsupported inferences, guide them through: 1) Identify the literal details in the relevant lines.', '2) List the emotions or ideas those details evoke.', '3) Formulate a claim that links the detail to the inference.', '4) Check if the poem contradicts the claim.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
