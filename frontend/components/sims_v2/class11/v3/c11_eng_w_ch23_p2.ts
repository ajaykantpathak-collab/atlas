import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch23_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch23_p2: SimDef = {
    id: 'v3_c11_eng_w_ch23_p2',
    title: 'What is a Good Book? (Essay) · Part 2/3',
    subtitle: 'Assemble the criteria for a good book the way a reader actually does.',
    classLevel: 11, subject: 'eng_w', topic: 'What is a Good Book? (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch23'],
    nodeIds: ['c11_eng_w_cbse_23_007', 'c11_eng_w_cbse_23_008', 'c11_eng_w_cbse_23_009', 'c11_eng_w_cbse_23_010', 'c11_eng_w_cbse_23_011', 'c11_eng_w_cbse_23_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lifelong reader auditing what lasted', intro: 'Which books from your childhood still hold up? The essay builds its answer from exactly that experiment.', goal: 'Analyse the essay\'s inductive structure and its circular, library-framed resolution.' },
    discovery: {
        question: 'Which test best certifies a \'good book\' — critical acclaim, or something a childhood favourite can prove decades later?',
        options: ['Whether it survives re-reading as an adult — endurance across the reader\'s own time is the essay\'s criterion', 'Sales figures — the market recognises quality', 'Difficulty — a good book must resist easy reading', 'Newness — only contemporary work matters'],
        answer: 'Whether it survives re-reading as an adult — endurance across the reader\'s own time is the essay\'s criterion',
        hook: 'Bond builds his criteria inductively out of a childhood of reading — the essay argues the way a library grows: one loved book at a time.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are subordinate thematic threads that run parallel to the primary theme, enriching the text\'s complexity by exploring related but distinct ideas, perspectives, or tensions without.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_23_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how the essay departs from chronology to group books by theme, and judge the ending\'s return to the grandfather\'s library.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re listening to a podcast where the host keeps returning to a main argument but occasionally drops fascinating side-observations that make you.',
            decisions: [{ prompt: 'Define "secondary theme" in literary analysis and distinguish it from "primary theme" using "Patterns of Creativity" as your reference text.', options: [
                { text: 'A secondary theme is a subordinate thematic thread that supports, complicates, or runs', outcome: 'A secondary theme is a subordinate thematic thread that supports, complicates, or runs parallel.' },
                { text: 'minor topics', outcome: 'Not quite — Students treat "secondary theme" as "any other topic mentioned in the text" and list discrete.', reveals: 'students-treat-secondary-theme-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading Chandrasekhar\'s description of Shelley\'s cloud: "I pass through the pores of the ocean and the shores...',
            decisions: [{ prompt: 'Define "metaphor" precisely using the terms "tenor" and "vehicle", and give one example from the essay where Chandrasekhar quotes Shelley.', options: [
                { text: 'A metaphor asserts that the tenor (subject) *is* the vehicle (image), transferring', outcome: 'A metaphor asserts that the tenor (subject) *is* the vehicle (image), transferring qualities from.' },
                { text: 'comparison using like or as', outcome: 'Not quite — Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The.', reveals: 'students-often-treat-imagery-and' },
                { text: 'says "comparison using like or as" reveals confusion with simile', outcome: 'Not quite — Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a newspaper editorial about climate change and encounter the phrase "mitigation strategies" — you don\'t know "mitigation", but the next.',
            decisions: [{ prompt: 'What is the primary purpose of the "Look for these expressions and guess the meaning from the context" box at the start of the chapter?', options: [
                { text: 'The box directs students to ten specific expressions that are central to the author\'s', outcome: 'The box directs students to ten specific expressions that are central to the author\'s argument.' },
                { text: 'to test dictionary skills', outcome: 'Not quite — Students believe "guessing from context" means making a wild guess based on a single nearby word.', reveals: 'guessing-from-context-means-making' },
                { text: 'guessing from context', outcome: 'Not quite — Students believe "guessing from context" means making a wild guess based on a single nearby word.', reveals: 'guessing-from-context-means-making' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading Chandrasekhar\'s lecture and notice how he packs multiple ideas into single sentences—like when he writes "The cultivation of those.',
            decisions: [{ prompt: 'Identify the grammatical term for the underlined structure in this sentence from the text: "Shelley\'s attitude to science emphasises the.', options: [
                { text: 'The underlined structure is a **relative clause** (specifically, a non-restrictive', outcome: 'The underlined structure is a **relative clause** (specifically, a non-restrictive relative clause.' },
                { text: 'adverbial clause', outcome: 'Not quite — Students believe "grammar analysis" means labeling parts of speech (noun, verb, adjective).', reveals: 'grammar-analysis-means-labeling-parts' },
                { text: 'noun clause', outcome: 'Not quite — Students believe "grammar analysis" means labeling parts of speech (noun, verb, adjective).', reveals: 'grammar-analysis-means-labeling-parts' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp forward claiming a new scientific discovery. You first check: what exactly does the message say? (Literal).',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "Which poet', outcome: 'A literal question asks for information directly stated in the text (e.g., "Which poet does.' },
                { text: 'personal opinion', outcome: 'Not quite — Students believe inferential questions license "personal opinion" answers.', reveals: 'inferential-questions-license-personal-opinion' },
                { text: 'inferential questions license "personal opinion" answers', outcome: 'Not quite — Students believe inferential questions license "personal opinion" answers.', reveals: 'inferential-questions-license-personal-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The library committee asks your class to draft criteria for \'what makes a book worth keeping.\' You suggest the essay \'What is a Good Book?\' but a teammate dismisses it: \'It\'s just someone\'s childhood reading memories — there\'s no argument, no structure, nothing to extract criteria from.\'',
            decisions: [{ prompt: 'How do you show the essay\'s argumentative structure?', options: [
                { text: 'Trace the essay\'s real architecture: it poses a question and answers it inductively — personal reading memories aren\'t decoration but anchors, recurring touchstones from which general criteria accumulate. The childhood anecdotes function as evidence, and the movement from specific books to universal standards is the \'plot of ideas\' guiding the reader to a conclusion.', outcome: 'The teammate learns to read non-fiction structure: an essay\'s plot is its logical progression, and the memories are load-bearing evidence, not nostalgia.' },
                { text: 'Concede and drop the essay — pick a checklist article instead, since this one has no criteria.', outcome: 'The criteria are there; they\'re built inductively from experience rather than listed — a stronger, more durable kind of argument for \'worth keeping\'.', reveals: 'reflective-essay-has-no-argument' },
                { text: 'Force it into a story shape — call the childhood memory the \'exposition\' and the last library image the \'resolution\' to prove it has structure.', outcome: 'Freytag\'s pyramid is the wrong tool: the essay\'s architecture is an inductive accumulation of criteria anchored by personal touchstones, not a fictional arc.', reveals: 'forcing-fiction-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_012', title: 'The bigger picture',
          caseStudy: { intro: 'The essay closes the circle where it began — in a library — and hands the question to the reader\'s own shelves.',
            decisions: [{ prompt: 'What comes next? What is a Good Book? (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — What is a Good Book? (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_007', difficulty: 'standard',
          question: 'Secondary themes are subordinate thematic threads that run parallel to the.',
          hint: 'If stuck, review c11_eng_w_cbse_23_006\'s worked example on identifying the primary theme.',
          misconception: 'Students treat "secondary theme" as "any other topic mentioned in the text" and list discrete subjects (Darwin.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "secondary theme" to a new context: In a hypothetical essay arguing "Social media connects people globally," identify two plausible.', answer: 'Secondary theme 1: "Connection paradox"',
                  options: ['Secondary theme 1: "Connection paradox"', 'privacy concerns', 'fake news'],
                  hint: 'If stuck, review c11_eng_w_cbse_23_006\'s worked example on identifying the primary theme through.',
                  misconception: 'Students treat "secondary theme" as "any other topic mentioned in the text" and list discrete subjects (Darwin, Faraday, Shelley.' }
          ],
            remediations: { 'students-treat-secondary-theme-as': { steps: ['Have the student list every distinct "idea cluster" in the essay (not names, but concepts: e.g., "loss of aesthetic.', 'For each cluster, ask "What abstract claim about human creativity/knowledge does this cluster prove?"', 'Label that abstract claim as a secondary theme.', 'Draw lines connecting each secondary theme to the primary theme with a verb (illustrates, complicates, qualifies).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review Class 8 node c8_engl_ch2_15 (Imagery and Symbolism in War Poetry) for imagery.',
          misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The author uses imagery.',
          parts: [
                { id: 'a', prompt: 'Chandrasekhar writes: "My mind seems to have become a kind of machine for grinding general laws out of large collections of facts." Explain the metaphor.', answer: 'Tenor = Darwin\'s mind',
                  options: ['Tenor = Darwin\'s mind', 'grinding'],
                  hint: 'Review Class 8 node c8_engl_ch2_15 (Imagery and Symbolism in War Poetry) for imagery classification.',
                  misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The author uses imagery like \'machine for.' },
                { id: 'b', prompt: 'In the essay, Chandrasekhar quotes Shelley: "Poets are the mirrors of the gigantic shadows which futurity casts on the present." Identify the *two* distinct.', answer: 'Metaphor 1: Tenor = Poets',
                  options: ['Metaphor 1: Tenor = Poets', 'poets reflect the future', 'futurity'],
                  hint: 'Review Class 8 node c8_engl_ch2_15 (Imagery and Symbolism in War Poetry) for imagery classification.',
                  misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The author uses imagery like \'machine for.' },
                { id: 'c', prompt: 'Compare the imagery in Wordsworth\'s "We murder to dissect" (quoted in para 2) with Faraday\'s "lines of force" (para 7).', answer: 'Wordsworth: Visual/tactile imagery ("murder", "dissect")',
                  options: ['Wordsworth: Visual/tactile imagery ("murder", "dissect")', 'analyze'],
                  hint: 'Review Class 8 node c8_engl_ch2_15 (Imagery and Symbolism in War Poetry) for imagery classification.',
                  misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write: "The author uses imagery like \'machine for.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Terminology Drill**: Give the student 5 sentences from the essay.', 'For each, they must label: "Metaphor only", "Imagery only", "Both (nested)", or "Neither".', 'Use: "cold philosophy", "lines of force", "atrophy of that part of the brain", "hierophants of an unapprehended.', '**Sensory Mapping**: For the three "Both" cases, have them draw a two-column table: Column A = Metaphor analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'If stuck, review the distinction between metaphor (direct comparison) and symbol.',
          misconception: 'Students often treat irony and symbolism as decorative "figures of speech" to be spotted and labeled, rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality, or',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality, or', '"Before You Read: Context and Background" is a pre-reading strategy where students', 'Plot is the sequence of causally linked events that form the narrative arc of a text,', 'In a non-fiction essay, **setting** refers to the intellectual, historical, and cultural'],
                  hint: 'If stuck, review the distinction between metaphor (direct comparison) and symbol (open-ended.',
                  misconception: 'Students often treat irony and symbolism as decorative "figures of speech" to be spotted and labeled, rather than as structural elements.' }
          ],
            remediations: { 'students-often-treat-irony-and': { steps: ['Have the student re-read the essay\'s first three paragraphs and underline every quoted passage.', 'For each quote, ask: "Is Chandrasekhar agreeing or using this to make a counter-point?" 3.', 'Map the Cloud\'s three symbolic layers on a three-column chart (Myth | Science | Tale) using specific lines.', 'Write one paragraph explaining how the symbol *performs* the argument rather than merely illustrating it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_010', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of inferring the meaning of unfamiliar words.',
          hint: 'If stuck, review Class 10 "Nelson Mandela" vocabulary node (c10_engl_cbse_02_009) where.',
          misconception: 'Students believe "guessing from context" means making a wild guess based on a single nearby word.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in context is the skill of inferring the meaning of unfamiliar words or',
                  options: ['Vocabulary in context is the skill of inferring the meaning of unfamiliar words or', '"Before You Read: Context and Background" is a pre-reading strategy where students', 'Plot is the sequence of causally linked events that form the narrative arc of a text,', 'In a non-fiction essay, **setting** refers to the intellectual, historical, and cultural'],
                  hint: 'If stuck, review Class 10 "Nelson Mandela" vocabulary node (c10_engl_cbse_02_009) where you.',
                  misconception: 'Students believe "guessing from context" means making a wild guess based on a single nearby word.' }
          ],
            remediations: { 'guessing-from-context-means-making': { steps: ['Have the student locate the exact sentence containing the target expression.', 'Ask them to bracket the main clause and underline every modifier.', 'Together, identify the grammatical role of the expression (subject, object, complement, adverbial).', 'Ask: "What is the author doing in this sentence — defining, contrasting, exemplifying, or arguing?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "guessing from context" means making a wild guess based on a single nearby word.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The expression \'hierophants of an unapprehended inspiration\' is the most difficult phrase in the chapter because it uses archaic religious.', answer: 'Refute',
                  options: ['Refute', 'guessing from context', '"guessing from context" means making a wild guess based on a single nearby word'],
                  hint: 'If stuck, review Class 10 "Nelson Mandela" vocabulary node (c10_engl_cbse_02_009) where you.',
                  misconception: 'Students believe "guessing from context" means making a wild guess based on a single nearby word.' },
                { id: 'b', prompt: 'Create a new sentence using "interlunations of life" that demonstrates you understand its metaphorical meaning in Shelley\'s phrase "arrests the vanishing.', answer: 'A strong answer: "During the interlunations of life',
                  options: ['A strong answer: "During the interlunations of life', 'guessing from context', '"guessing from context" means making a wild guess based on a single nearby word'],
                  hint: 'If stuck, review Class 10 "Nelson Mandela" vocabulary node (c10_engl_cbse_02_009) where you.',
                  misconception: 'Students believe "guessing from context" means making a wild guess based on a single nearby word.' }
          ],
            remediations: { 'guessing-from-context-means-making': { steps: ['Have the student locate the exact sentence containing the target expression.', 'Ask them to bracket the main clause and underline every modifier.', 'Together, identify the grammatical role of the expression (subject, object, complement, adverbial).', 'Ask: "What is the author doing in this sentence — defining, contrasting, exemplifying, or arguing?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'Review "Sentence Structure and Types of Sentences" (c6_english_u4_038) focusing.',
          misconception: 'Students believe "grammar analysis" means labeling parts of speech (noun, verb, adjective) in isolation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic analysis of grammatical structures,',
                  options: ['Language Usage in the Text refers to the systematic analysis of grammatical structures,', '"Before You Read: Context and Background" is a pre-reading strategy where students', 'Plot is the sequence of causally linked events that form the narrative arc of a text,', 'In a non-fiction essay, **setting** refers to the intellectual, historical, and cultural'],
                  hint: 'Review "Sentence Structure and Types of Sentences" (c6_english_u4_038) focusing on complex sentence.',
                  misconception: 'Students believe "grammar analysis" means labeling parts of speech (noun, verb, adjective) in isolation.' }
          ],
            remediations: { 'grammar-analysis-means-labeling-parts': { steps: ['If a student cannot deconstruct nominalization: (1) Give them the verb "cultivate" and ask them to build the noun.', '(2) Provide a two-column table: Column A with active verbs from the text (enlarge, circumscribe, discriminate.', '(3) Have them rewrite one dense sentence using only verbs, then compare the clause count and information density.', '(4) Finally, ask them to find three more nominalizations in the text and explain what process each condenses.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'Review annotation strategies from c11_eng_w_cbse_23_011 (Grammar: Language Usage).',
          misconception: 'Students believe inferential questions license "personal opinion" answers.',
          parts: [
                { id: 'a', prompt: 'Using the essay, answer this literal question: "Which two scientists does Chandrasekhar contrast with the poets Wordsworth and Keats?" Provide the exact.', answer: 'Chandrasekhar contrasts Darwin and Faraday with Wordsworth and Keats',
                  options: ['Chandrasekhar contrasts Darwin and Faraday with Wordsworth and Keats', 'personal opinion', 'inferential questions license "personal opinion" answers'],
                  hint: 'Review annotation strategies from c11_eng_w_cbse_23_011 (Grammar: Language Usage) focusing.',
                  misconception: 'Students believe inferential questions license "personal opinion" answers.' }
          ],
            remediations: { 'inferential-questions-license-personal-opinion': { steps: ['Have the student highlight every proper noun and direct quotation in the essay with one color.', 'Have them highlight every opinion verb (argues, counters, implies, suggests) with another color.', 'Practice converting each highlighted opinion verb into an inferential question stem: "What does the author imply when.', 'Require the student to write the answer using the formula: "The author implies X because the text states Y and Z."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
