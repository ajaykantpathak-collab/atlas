import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch21_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch21_p2: SimDef = {
    id: 'v3_c11_eng_w_ch21_p2',
    title: 'Patterns of Creativity (Essay) · Part 2/3',
    subtitle: 'Watch an astrophysicist argue that a poet and a physicist create the same way.',
    classLevel: 11, subject: 'eng_w', topic: 'Patterns of Creativity (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch21'],
    nodeIds: ['c11_eng_w_cbse_21_007', 'c11_eng_w_cbse_21_008', 'c11_eng_w_cbse_21_009', 'c11_eng_w_cbse_21_010', 'c11_eng_w_cbse_21_011', 'c11_eng_w_cbse_21_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing one theory of creativity across two fields', intro: 'A Nobel astrophysicist places Keats next to Newton and claims the pattern is identical — interrogate the claim.', goal: 'Apply assimilation and accommodation across poetry and science and analyse the essay\'s circular structure.' },
    discovery: {
        question: 'A poet borrows wave-particle duality as imagery in a poem. Under Chandrasekhar\'s scheme, is that assimilation or accommodation?',
        options: ['Assimilation — new content fitted into poetry\'s existing patterns; the poem\'s frame never changes', 'Accommodation — borrowing science always rebuilds the form', 'Neither — science and poetry share no patterns', 'Accommodation — any new idea forces new patterns'],
        answer: 'Assimilation — new content fitted into poetry\'s existing patterns; the poem\'s frame never changes',
        hook: 'The essay\'s real claim isn\'t \'science vs. poetry\' — it\'s that Newton and Keats ran the same two moves: fit the world to patterns, then remake patterns for the world.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Patterns of Creativity\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_21_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the essay\'s paragraphs as thesis, parallel anecdotes and synthesis, then weigh whether the returning \'child on the seashore\' closes the argument or just repeats it.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Patterns of Creativity\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in a literary essay, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that explores a specific facet of the primary', outcome: 'A secondary theme is a supporting idea that explores a specific facet of the primary theme.' },
                { text: 'examples', outcome: 'Not quite — Students often confuse secondary themes with "examples" or "anecdotes" in the essay, treating.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'anecdotes', outcome: 'Not quite — Students often confuse secondary themes with "examples" or "anecdotes" in the essay, treating.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Patterns of Creativity\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one original example of each that is NOT from the textbook.', options: [
                { text: 'Imagery: Language that appeals to the senses (e.g., "The sulfur smell of burnt matches', outcome: 'Imagery: Language that appeals to the senses (e.g., "The sulfur smell of burnt matches hung in the.' },
                { text: 'any description', outcome: 'Not quite — Students often think imagery is only "visual description" and miss auditory, tactile, olfactory.', reveals: 'imagery-is-only-visual-description' },
                { text: 'visual description', outcome: 'Not quite — Students often think imagery is only "visual description" and miss auditory, tactile, olfactory.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Patterns of Creativity\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'In the essay "Patterns of Creativity," Chandrasekhar writes: "The scientist tries to understand the world by discovering patterns.', options: [
                { text: 'The phrase "discovering patterns in nature" contradicts "decorative design"', outcome: 'The phrase "discovering patterns in nature" contradicts "decorative design" because decorative.' },
                { text: 'discovering patterns', outcome: 'Not quite — Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'recurring regularities', outcome: 'Not quite — Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Patterns of Creativity\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Define \'nominalization\' and give one example from any English text where a verb or adjective has been turned into a noun phrase.', options: [
                { text: 'Nominalization is the process of forming a noun from a verb or adjective, often by adding', outcome: 'Nominalization is the process of forming a noun from a verb or adjective, often by adding a suffix.' },
                { text: '\'grammar analysis\' means only labeling parts of speech (e', outcome: 'Not quite — Students often think \'grammar analysis\' means only labeling parts of speech (e.g., \'this is.', reveals: 'grammar-analysis-means-only-labeling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Patterns of Creativity\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What does', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What does the author.' },
                { text: 'makes sense', outcome: 'Not quite — Students often believe inferential questions allow any personal opinion that "makes sense." They.', reveals: 'inferential-questions-allow-any-personal' },
                { text: 'inferential questions allow any personal opinion that "makes sense', outcome: 'Not quite — Students often believe inferential questions allow any personal opinion that "makes sense." They.', reveals: 'inferential-questions-allow-any-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school runs a \'Science vs Arts\' debate and the science captain claims: \'Scientists discover by logic; poets create by imagination — completely different brains at work.\' You remember Chandrasekhar\'s \'Patterns of Creativity\' argues almost the opposite.',
            decisions: [{ prompt: 'What\'s the essay\'s actual argument you should deploy?', options: [
                { text: 'Counter with the shared pattern: Chandrasekhar — a Nobel astrophysicist who loved literature — argues Keats and Newton use the same cognitive moves: assimilation (fitting new experience into existing patterns) and accommodation (changing the pattern to fit new experience). Newton\'s \'logic\' required imaginative leaps; Keats\'s \'imagination\' required structural discipline.', outcome: 'The debate flips: the essay dissolves the science-is-rigid / poetry-is-free stereotype instead of reinforcing it.' },
                { text: 'Use the essay to support the motion — it contrasts scientists\' facts with poets\' emotions.', outcome: 'That\'s the surface misreading: the essay\'s whole point is that both domains run on identical creative patterns, not that they diverge.', reveals: 'essay-contrasts-science-poetry' },
                { text: 'Summarise it as \'first he talks about Keats, then about Newton\' and let the examples speak for themselves.', outcome: 'That confuses content with argument: the examples are ordered by rhetorical logic to build a thesis, not just listed.', reveals: 'essay-plot-is-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_012', title: 'The bigger picture',
          caseStudy: { intro: 'Newton \'invented\' his framework as surely as Keats \'discovered\' truth in a myth — the essay\'s circle closes because the child on the shore now means something more.',
            decisions: [{ prompt: 'What comes next? Patterns of Creativity (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Patterns of Creativity (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_007', difficulty: 'standard',
          question: 'Secondary themes in \'Patterns of Creativity\' — the supporting ideas and motifs.',
          hint: 'If stuck, review the primary theme statement and the essay\'s paragraph-by-paragraph.',
          misconception: 'Students often confuse secondary themes with "examples" or "anecdotes" in the essay, treating Chandrasekhar\'s.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to a new context: In a speech about climate change, the primary theme is "urgent collective action." List two plausible.', answer: 'Secondary theme 1: "Intergenerational justice"',
                  options: ['Secondary theme 1: "Intergenerational justice"', 'polar bears', 'solar panels', 'examples'],
                  hint: 'If stuck, review the primary theme statement and the essay\'s paragraph-by-paragraph summary.',
                  misconception: 'Students often confuse secondary themes with "examples" or "anecdotes" in the essay, treating Chandrasekhar\'s references to Kepler.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['Have the student create a two-column table: left column = "Paragraph numbers," right column = "Sub-argument advanced.".', 'Guide them to group paragraphs that advance the same sub-argument — each group is a secondary theme.', 'Ask them to label each group with a noun phrase (e.g., "The role of beauty in scientific theory").', 'Verify that each label supports the primary theme "Unity of creative patterns in science and art." This visual mapping.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_008', difficulty: 'standard',
          question: 'Imagery in \'Patterns of Creativity\' — the vivid, sensory language that creates.',
          hint: 'If stuck, review the "Poetic Devices: Metaphor and Imagery" nodes from Class 6-9.',
          misconception: 'Students often think imagery is only "visual description" and miss auditory, tactile, olfactory, gustatory images.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of extended metaphor to the following invented passage from the essay: "Creativity is a loom.', answer: 'Tenor: Creativity (both scientific and poetic)',
                  options: ['Tenor: Creativity (both scientific and poetic)', 'loom = creativity', 'visual description'],
                  hint: 'If stuck, review the "Poetic Devices: Metaphor and Imagery" nodes from Class 6-9 (especially.',
                  misconception: 'Students often think imagery is only "visual description" and miss auditory, tactile, olfactory, gustatory images.' },
                { id: 'b', prompt: 'Analyze how the tactile imagery in "the rough grain of experimental data" and the auditory imagery in "the silent hum of mathematical elegance" work together.', answer: 'Tactile "rough grain" conveys the messy, resistant, tangible nature of raw data',
                  options: ['Tactile "rough grain" conveys the messy, resistant, tangible nature of raw data', 'visual description'],
                  hint: 'If stuck, review the "Poetic Devices: Metaphor and Imagery" nodes from Class 6-9 (especially.',
                  misconception: 'Students often think imagery is only "visual description" and miss auditory, tactile, olfactory, gustatory images.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['Have the student close their eyes and read aloud a dense descriptive paragraph from the essay; ask them to name every.', 'Give them five sentences: two similes, two metaphors, one literal.', 'Have them sort and defend each classification.', 'Provide a table with columns: Tenor | Vehicle | Ground (shared quality) | Sensory Mode.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Patterns of Creativity\' — where opposite things are both.',
          hint: 'If stuck, re-read the Class 10 node c10_engl_cbse_01_007 (Irony in \'A Letter to God\') and.',
          misconception: 'Students often confuse symbolism with metaphor, thinking any comparison is a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Patterns of Creativity\'',
                  options: ['Irony and paradox in \'Patterns of Creativity\'', '\'Patterns of Creativity\' (Woven Words, ch', 'The plot/narrative arc of \'Patterns of Creativity\'', 'The setting of \'Patterns of Creativity\''],
                  hint: 'If stuck, re-read the Class 10 node c10_engl_cbse_01_007 (Irony in \'A Letter to God\') and.',
                  misconception: 'Students often confuse symbolism with metaphor, thinking any comparison is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If a student conflates symbol and metaphor: 1) Have them list all occurrences of the image in the essay.', '2) Ask: Does the meaning deepen each time?', '3) Contrast with a one-off metaphor from the same essay.', '4) Practice: Write a metaphor for "time" (e.g., "time is a thief"), then write a symbolic paragraph where a clock.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Patterns of Creativity\' — the words and phrases you must.',
          hint: 'If stuck, review c11_eng_w_cbse_21_006 (Theme) to see how the central idea "creativity.',
          misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop at a single synonym.',
          parts: [
                { id: 'a', prompt: 'In the essay "Patterns of Creativity," Chandrasekhar writes: "The scientist tries to understand the world by discovering patterns in nature." If a student.', answer: 'The phrase "discovering patterns in nature" contradicts "decorative design"',
                  options: ['The phrase "discovering patterns in nature" contradicts "decorative design"', 'discovering patterns', 'recurring regularities', 'vocabulary in context'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_006 (Theme) to see how the central idea "creativity.',
                  misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop at a single synonym.' },
                { id: 'b', prompt: 'Apply the "substitution test" to determine the contextual meaning of "aesthetic" in this sentence from the essay: "The scientist\'s aesthetic satisfaction comes.', answer: 'intellectual, (',
                  options: ['intellectual, (', 'aesthetic', 'vocabulary in context', 'guess the meaning from surrounding words'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_006 (Theme) to see how the central idea "creativity.',
                  misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop at a single synonym.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['Have the student list every recurrence of the target word in the essay (use find/search).', 'For each occurrence, note: grammatical role, modifying adjectives, governing verbs, and the clause\'s function in the.', 'Build a "semantic map" showing how the word\'s sense shifts across contexts (e.g., "pattern" as noun/verb.', 'Ask: "If I replaced this word with its dictionary synonym, what argumentative nuance would be lost?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop at a single synonym.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Chandrasekhar uses \'myth\' pejoratively to mean \'false belief\' when he writes \'the myth of the creative scientist.\'" Defend.', answer: 'Refute',
                  options: ['Refute', 'urban myth', 'vocabulary in context', 'guess the meaning from surrounding words'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_006 (Theme) to see how the central idea "creativity.',
                  misconception: 'Students assume "vocabulary in context" means "guess the meaning from surrounding words" and stop at a single synonym.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['Have the student list every recurrence of the target word in the essay (use find/search).', 'For each occurrence, note: grammatical role, modifying adjectives, governing verbs, and the clause\'s function in the.', 'Build a "semantic map" showing how the word\'s sense shifts across contexts (e.g., "pattern" as noun/verb.', 'Ask: "If I replaced this word with its dictionary synonym, what argumentative nuance would be lost?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_011', difficulty: 'standard',
          question: 'Language and style in \'Patterns of Creativity\' — how the writer chose words.',
          hint: 'Review \'Sentence Structure and Types of Sentences\' (c6_english_u4_038) and \'Active and.',
          misconception: 'Students often think \'grammar analysis\' means only labeling parts of speech (e.g., \'this is a noun\', \'that is a passive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'Patterns of Creativity\'',
                  options: ['Language and style in \'Patterns of Creativity\'', '\'Patterns of Creativity\' (Woven Words, ch', 'The plot/narrative arc of \'Patterns of Creativity\'', 'The setting of \'Patterns of Creativity\''],
                  hint: 'Review \'Sentence Structure and Types of Sentences\' (c6_english_u4_038) and \'Active and Passive.',
                  misconception: 'Students often think \'grammar analysis\' means only labeling parts of speech (e.g., \'this is a noun\', \'that is a passive verb\').' }
          ],
            remediations: { 'grammar-analysis-means-only-labeling': { steps: ['If a student only labels features without functional explanation, do this: 1) Take a sentence from the essay.', '2) Ask: "What would change if the author used active voice instead?" 3) Have the student rewrite it in active voice.', '4) Compare the two versions for focus, flow, and tone.', '5) Guide them to articulate the difference in a sentence: "The passive voice shifts attention from the doer to the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Patterns of Creativity\' — questions answered straight.',
          hint: 'Review annotation techniques: underline direct statements, circle words indicating.',
          misconception: 'Students often believe inferential questions allow any personal opinion that "makes sense." They fail to realize.',
          parts: [
                { id: 'a', prompt: 'In "Patterns of Creativity," the author writes: "The scientist and the poet both seek patterns." If a question asks, "What common pursuit unites the scientist.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'makes sense', 'inferential questions allow any personal opinion that "makes sense'],
                  hint: 'Review annotation techniques: underline direct statements, circle words indicating author\'s tone.',
                  misconception: 'Students often believe inferential questions allow any personal opinion that "makes sense." They fail to realize inferences must.' },
                { id: 'b', prompt: 'Compare these two questions from the essay: (a) "What are the two types of creativity discussed?" (b) "How does the author contrast the creative processes.', answer: '"What are the two types of creativity discussed?" (',
                  options: ['"What are the two types of creativity discussed?" (', 'makes sense', 'inferential questions allow any personal opinion that "makes sense'],
                  hint: 'Review annotation techniques: underline direct statements, circle words indicating author\'s tone.',
                  misconception: 'Students often believe inferential questions allow any personal opinion that "makes sense." They fail to realize inferences must.' }
          ],
            remediations: { 'inferential-questions-allow-any-personal': { steps: ['If a student cannot distinguish literal from inferential, use a two-column strategy: Column 1: "Words from the text".', 'Column 2: "What I think it means" (inference).', 'Practice with a single paragraph: first extract all explicit facts, then ask "What does this suggest about...?" and.', 'Repeat with gradually longer passages.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
