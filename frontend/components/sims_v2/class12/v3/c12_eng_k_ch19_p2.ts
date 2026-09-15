import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch19_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch19_p2: SimDef = {
    id: 'v3_c12_eng_k_ch19_p2',
    title: 'On Science Fiction (Non-fiction) · Part 2/3',
    subtitle: 'Cowboys herding dolphins — science fiction, says Asimov',
    classLevel: 12, subject: 'eng_k', topic: 'On Science Fiction (Non-fiction) · Part 2/3',
    chapters: ['c12_eng_k_ch19'],
    nodeIds: ['c12_eng_k_cbse_19_007', 'c12_eng_k_cbse_19_008', 'c12_eng_k_cbse_19_009', 'c12_eng_k_cbse_19_010', 'c12_eng_k_cbse_19_011', 'c12_eng_k_cbse_19_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genre theorist', intro: 'A biochemist who wrote hundreds of SF books draws the genre\'s true border — and it\'s not where you think.', goal: 'Apply Asimov\'s background-over-content definition and trace science fiction\'s birth to the Industrial Revolution.' },
    discovery: {
        question: 'A Western where cowboys herd dolphins on a water planet — Asimov says it\'s still science fiction. A baseball thriller aboard a space station? Also SF. What makes a story SF?',
        options: ['The background, not the content — any story set in a society transformed by science counts, whatever genre its plot belongs to', 'Spaceships and lasers', 'Aliens must appear', 'It must predict the future correctly'],
        answer: 'The background, not the content — any story set in a society transformed by science counts, whatever genre its plot belongs to',
        hook: 'Sci-fi couldn\'t exist before ~1800: only when the Industrial Revolution made change visible within one lifetime did \'the future\' become imaginable. The scientist is the priest\'s heir — both hold \'the secret of controlling the Universe\'; one through formulas, the other through laws.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, motifs, or arguments that support, complicate, or run parallel to the primary theme of a text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_19_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draw Asimov\'s border yourself: separate prescientific wonder from scientific extrapolation, judge whether a fair-play mystery can survive alien rules, and reclassify the stories you thought you knew.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are explaining to a friend why *Star Wars* feels like a Western and a fairy tale at the same time.',
            decisions: [{ prompt: 'Identify the specific phrase Asimov uses in Section II to define what makes a story science fiction, distinguishing it from genres like.', options: [
                { text: 'Correct answer: "Science fiction is what it is, not through its content but through its', outcome: 'Correct answer: "Science fiction is what it is, not through its content but through its.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often confuse **topics** with **themes**. They list "mythology," "mysteries," "John.', reveals: 'students-often-confuse-topics-with' },
                { text: 'space travel', outcome: 'Not quite — Students often confuse **topics** with **themes**. They list "mythology," "mysteries," "John.', reveals: 'students-often-confuse-topics-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are explaining to a friend why your phone feels like "a magic wand" — you just used a metaphor to make an abstract tech concept concrete.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from everyday speech (not from the textbook).', options: [
                { text: 'Imagery: descriptive language appealing to senses (e.g., "the coffee\'s bitter aroma', outcome: 'Imagery: descriptive language appealing to senses (e.g., "the coffee\'s bitter aroma curled through.' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3").', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'I saw a red car', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3").', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re watching a sci-fi movie where a character uses a "communicator" — you instantly recognize it as a symbol for a smartphone, and there\'s irony.',
            decisions: [{ prompt: 'What is the specific irony Asimov highlights when he compares the "crystal ball" to "television sets of today"?', options: [
                { text: 'The irony is that the crystal ball', outcome: 'The irony is that the crystal ball — a magical object requiring supernatural power to see distant.' },
                { text: 'both show pictures', outcome: 'Not quite — Students confuse Asimov\'s irony with mere "coincidence" or "difference" — e.g., writing "It\'s.', reveals: 'students-confuse-asimov-s-irony' },
                { text: 'coincidence', outcome: 'Not quite — Students confuse Asimov\'s irony with mere "coincidence" or "difference" — e.g., writing "It\'s.', reveals: 'students-confuse-asimov-s-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading Asimov\'s claim that "science fiction is a literary universe of no mean size" and you pause at "no mean size" — does it mean small.',
            decisions: [{ prompt: 'What is the meaning of the phrase "no mean size" as used by Asimov in the sentence "Science fiction is a literary universe of no mean size"?', options: [
                { text: 'The phrase "no mean size" is a litotes (understatement) meaning "very large" or', outcome: 'The phrase "no mean size" is a litotes (understatement) meaning "very large" or "immense." A wrong.' },
                { text: 'no mean size', outcome: 'Not quite — Students often treat vocabulary in context as "guess the dictionary definition." They look.', reveals: 'students-often-treat-vocabulary-in' },
                { text: 'very large', outcome: 'Not quite — Students often treat vocabulary in context as "guess the dictionary definition." They look.', reveals: 'students-often-treat-vocabulary-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are writing a formal essay for your CUET English paper and need to sound authoritative yet precise — just like Asimov does when he argues that.',
            decisions: [{ prompt: 'In the sentence "A \'sports story\' must have, as part of its content, some competitive activity," why can the verb "have" not be converted.', options: [
                { text: 'Correct answer: "Have" is a stative transitive verb denoting possession or inclusion, not', outcome: 'Correct answer: "Have" is a stative transitive verb denoting possession or inclusion, not an action.' },
                { text: 'because it\'s intransitive', outcome: 'Not quite — Students believe that ANY verb followed by a noun phrase can be passivized.', reveals: 'any-verb-followed-by-a' },
                { text: 'ANY verb followed by a noun phrase can be passivized', outcome: 'Not quite — Students believe that ANY verb followed by a noun phrase can be passivized.', reveals: 'any-verb-followed-by-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE exam hall and see a question: "Why does Asimov say myths fulfil the same emotional needs as science fiction?" Your heart.',
            decisions: [{ prompt: 'According to Asimov in "On Science Fiction", what is the fundamental difference between the universe of myths/legends and the universe.', options: [
                { text: 'The fundamental difference is that myths/legends depict a universe controlled by', outcome: 'The fundamental difference is that myths/legends depict a universe controlled by gods/demons who.' },
                { text: 'myths are old, science fiction is new', outcome: 'Not quite — Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge.', reveals: 'inferential-questions-allow-any-reasonable' },
                { text: 'any reasonable opinion', outcome: 'Not quite — Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge.', reveals: 'inferential-questions-allow-any-reasonable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Marketing debates whether a quiet family drama aboard a generation ship \'counts\' as science fiction for the catalogue — \'there isn\'t a single ray gun in it.\'',
            decisions: [{ prompt: 'Is it science fiction?', options: [
                { text: 'Yes — Asimov\'s test is the background, not the props: a world running on different discovered rules makes it SF even if the plot is a domestic drama.', outcome: 'Spaceships and lasers are content; the genre marker is a society significantly transformed by science — which this has.' },
                { text: 'No — no gadgets, no aliens, no SF.', outcome: 'That\'s the marketing-trope definition Asimov dismantles; the background society is what does the classifying.', reveals: 'scifi-equals-gadgets' },
                { text: 'Yes — and anything set in the future or with magic like the Force is SF too.', outcome: 'Over-correcting breaks the other boundary: fantasy tropes in space costumes aren\'t SF because the laws of nature aren\'t the engine.', reveals: 'fantasy-equals-scifi' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define a genre by its world, not its wardrobe — and you\'ll never call Star Wars hard SF again without a caveat.',
            decisions: [{ prompt: 'What comes next? On Science Fiction (Non-fiction) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — On Science Fiction (Non-fiction) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, motifs, or arguments that support.',
          hint: 'If stuck, review c12_eng_k_cbse_19_006 (Primary Theme) and practice writing one-sentence.',
          misconception: 'Students often confuse **topics** with **themes**. They list "mythology," "mysteries," "John Campbell," or "Industrial.',
          parts: [
                { id: 'a', prompt: 'Apply Asimov\'s "background vs. content" distinction to classify the following hypothetical story: "A detective in a future Mumbai where crimes are predicted.', answer: 'Correct answer: Content genre = Mystery/Detective (clues, deduction, fair play)',
                  options: ['Correct answer: Content genre = Mystery/Detective (clues, deduction, fair play)', 'sci-fi'],
                  hint: 'If stuck, review c12_eng_k_cbse_19_006 (Primary Theme) and practice writing one-sentence thematic.',
                  misconception: 'Students often confuse **topics** with **themes**. They list "mythology," "mysteries," "John Campbell," or "Industrial Revolution".' }
          ],
            remediations: { 'students-often-confuse-topics-with': { steps: ['If a student lists topics instead of themes: 1.', 'Ask: "What is Asimov *arguing* about mythology?', 'Complete this sentence: \'Asimov believes mythology and science fiction are similar because...\'" (Forces a thematic.', 'Have them re-read Section I, last paragraph ("The goals...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review "Tenor/Vehicle" in c11_eng_h_cbse_01_008 notes; practice on "Hope is a thing with.',
          misconception: 'Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3") rather than.',
          parts: [
                { id: 'a', prompt: 'In Section I, Asimov writes: "The beings who controlled natural phenomena were therefore pictured in human form, but of superhuman strength...', answer: 'Metaphor: "gods are',
                  options: ['Metaphor: "gods are', 'This is personification, not metaphor', 'superhuman strength', 'says "This is personification, not metaphor" confuses device labels'],
                  hint: 'Review "Tenor/Vehicle" in c11_eng_h_cbse_01_008 notes; practice on "Hope is a thing with feathers".',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3") rather than *analytical tools*.' },
                { id: 'b', prompt: 'Apply the "vehicle/tenor" framework to Asimov\'s metaphor: "sword-and-sorcery [is] the equivalent of science fiction set in another kind of Universe —.', answer: 'Tenor: sword-and-sorcery fantasy',
                  options: ['Tenor: sword-and-sorcery fantasy', 'entertainment', 'swaps tenor/vehicle shows confusion about'],
                  hint: 'Review "Tenor/Vehicle" in c11_eng_h_cbse_01_008 notes; practice on "Hope is a thing with feathers".',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3") rather than *analytical tools*.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Revisit c11_eng_h_cbse_01_008 (Class 11 Imagery/Metaphor) and annotate *one* poem using the vehicle/tenor/ground table.', 'Return to Asimov\'s Section I, paragraph 4 ("The beings who controlled...").', 'Build a 3-column table: Image/Metaphor | Sensory Channel / Vehicle-Tenor | Argumentative Function.', 'Re-attempt Diagnostic Q3 and Q4 with the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3") rather than.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Asimov\'s metaphor of the \'priest, magician, wizard, shaman\' as the \'prescientific scientist\' is reductive because it ignores the.', answer: 'Refute: Asimov explicitly anticipates this objection ("We needn\'t sneer',
                  options: ['Refute: Asimov explicitly anticipates this objection ("We needn\'t sneer', 'understanding laws to control environment', 'just an analogy'],
                  hint: 'Review "Tenor/Vehicle" in c11_eng_h_cbse_01_008 notes; practice on "Hope is a thing with feathers".',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* ("Spot the metaphor in Para 3") rather than *analytical tools*.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Revisit c11_eng_h_cbse_01_008 (Class 11 Imagery/Metaphor) and annotate *one* poem using the vehicle/tenor/ground table.', 'Return to Asimov\'s Section I, paragraph 4 ("The beings who controlled...").', 'Build a 3-column table: Image/Metaphor | Sensory Channel / Vehicle-Tenor | Argumentative Function.', 'Re-attempt Diagnostic Q3 and Q4 with the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_009', difficulty: 'standard',
          question: 'Irony in Asimov\'s essay is the contrast between what ancient myths presented.',
          hint: 'If stuck, review c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism) for definitions.',
          misconception: 'Students confuse Asimov\'s irony with mere "coincidence" or "difference" — e.g., writing "It\'s ironic that myths had.',
          parts: [
                { id: 'a', prompt: 'What is the specific irony Asimov highlights when he compares the "crystal ball" to "television sets of today"?', answer: 'The irony is that the crystal ball',
                  options: ['The irony is that the crystal ball', 'both show pictures', 'coincidence', 'difference'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism) for definitions, then.',
                  misconception: 'Students confuse Asimov\'s irony with mere "coincidence" or "difference" — e.g., writing "It\'s ironic that myths had flying carpets and.' },
                { id: 'b', prompt: 'Explain in your own words why Asimov calls the ancient gods "whimsical and unpredictable" and how this description serves his larger argument about the.', answer: 'Asimov describes gods as whimsical',
                  options: ['Asimov describes gods as whimsical', 'gods were mean', 'coincidence', 'difference'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism) for definitions, then.',
                  misconception: 'Students confuse Asimov\'s irony with mere "coincidence" or "difference" — e.g., writing "It\'s ironic that myths had flying carpets and.' },
                { id: 'c', prompt: 'Analyze how Asimov\'s reference to John Campbell\'s "failure of nerve" regarding science fiction mysteries creates dramatic irony for the reader who knows.', answer: 'The dramatic irony arises',
                  options: ['The dramatic irony arises', 'Campbell was wrong', 'coincidence', 'difference'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism) for definitions, then.',
                  misconception: 'Students confuse Asimov\'s irony with mere "coincidence" or "difference" — e.g., writing "It\'s ironic that myths had flying carpets and.' }
          ],
            remediations: { 'students-confuse-asimov-s-irony': { steps: ['Re-read Section I paragraphs 4–6 aloud, underlining every magical object and its modern counterpart Asimov names.', 'Make a two-column table: Column A = Mythical Object/Claim, Column B = Scientific Reality/Method.', 'For each row, write one sentence: "The irony is that ______." 4.', 'Revisit c12_eng_k_cbse_19_008 (Imagery and Metaphor) to distinguish metaphor (direct comparison) from symbol (object.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_010', difficulty: 'standard',
          question: 'Vocabulary in Context: Key Words refers to the practice of determining the.',
          hint: 'If stuck, review c12_eng_k_cbse_19_008 and c12_eng_k_cbse_19_009 for irony and metaphor.',
          misconception: 'Students often treat vocabulary in context as "guess the dictionary definition." They look up "senescence" (aging) and.',
          parts: [
                { id: 'a', prompt: 'What is the meaning of the phrase "no mean size" as used by Asimov in the sentence "Science fiction is a literary universe of no mean size"?', answer: 'The phrase "no mean size" is a litotes (understatement) meaning "very large" or',
                  options: ['The phrase "no mean size" is a litotes (understatement) meaning "very large" or', 'no mean size', 'very large', 'immense'],
                  hint: 'If stuck, review c12_eng_k_cbse_19_008 and c12_eng_k_cbse_19_009 for irony and metaphor.',
                  misconception: 'Students often treat vocabulary in context as "guess the dictionary definition." They look up "senescence" (aging) and write "getting old".' }
          ],
            remediations: { 'students-often-treat-vocabulary-in': { steps: ['If a student gives only dictionary definitions, have them reread the specific paragraph containing the word and answer.', 'Repeat with three words until tone-awareness becomes automatic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck, review Class 11 Woven Words Chapter 1 Grammar node (c11_eng_w_cbse_01_011).',
          misconception: 'Students believe that ANY verb followed by a noun phrase can be passivized.',
          parts: [
                { id: 'a', prompt: 'Asimov writes: "The writer must carefully explain to the reader all the boundary conditions of the imaginary society." Identify the two noun phrases that.', answer: 'Correct answer: The verb "explain" takes two objects',
                  options: ['Correct answer: The verb "explain" takes two objects', 'The reader must be carefully explained', 'makes only one object the subject (e', 'ANY verb followed by a noun phrase can be passivized'],
                  hint: 'If stuck, review Class 11 Woven Words Chapter 1 Grammar node (c11_eng_w_cbse_01_011) exercises.',
                  misconception: 'Students believe that ANY verb followed by a noun phrase can be passivized.' },
                { id: 'b', prompt: 'From the text, find three verbs (other than "ask") that are followed by a that-clause.', answer: 'Correct answer examples: (1) "I imagine that what he expected was..."',
                  options: ['Correct answer examples: (1) "I imagine that what he expected was..."', 'expected a sudden change', 'prevent writers from using', 'ANY verb followed by a noun phrase can be passivized'],
                  hint: 'If stuck, review Class 11 Woven Words Chapter 1 Grammar node (c11_eng_w_cbse_01_011) exercises.',
                  misconception: 'Students believe that ANY verb followed by a noun phrase can be passivized.' },
                { id: 'c', prompt: 'Compare the active sentence "John Dickson Carr revealed that he didn\'t know the difference between the element and the compound" with its hypothetical passive.', answer: 'Correct answer: The passive is grammatically valid',
                  options: ['Correct answer: The passive is grammatically valid', 'ungrammatical', 'it\'s fine', 'that-clauses cannot be passivized'],
                  hint: 'If stuck, review Class 11 Woven Words Chapter 1 Grammar node (c11_eng_w_cbse_01_011) exercises.',
                  misconception: 'Students believe that ANY verb followed by a noun phrase can be passivized.' }
          ],
            remediations: { 'any-verb-followed-by-a': { steps: ['Have the student list 10 verbs from the essay that take noun phrase objects.', 'For each, attempt passive transformation aloud.', 'When they hit "have," "lack," "resemble," discuss why the passive sounds wrong (no action transfer).', 'Create a two-column table: "Passivizable transitives" (take, place, involve, change, add, explain, reveal, demonstrate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck on question classification, revisit c11_eng_h_cbse_01_012 (Comprehension.',
          misconception: 'Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge (e.g., "Asimov wrote.',
          parts: [
                { id: 'a', prompt: 'According to Asimov in "On Science Fiction", what is the fundamental difference between the universe of myths/legends and the universe of science fiction?', answer: 'The fundamental difference is that myths/legends depict a universe controlled by',
                  options: ['The fundamental difference is that myths/legends depict a universe controlled by', 'myths are old, science fiction is new', 'any reasonable opinion', 'Asimov wrote Foundation, so he must think'],
                  hint: 'If stuck on question classification, revisit c11_eng_h_cbse_01_012 (Comprehension: Literal and.',
                  misconception: 'Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge (e.g., "Asimov wrote Foundation, so.' },
                { id: 'b', prompt: 'Explain in your own words what Asimov means when he writes: "In a narrow sense, only science fiction is valid for today since, as far as we can tell, the.', answer: 'Asimov means that',
                  options: ['Asimov means that', 'He thinks myths are fake', 'any reasonable opinion', 'Asimov wrote Foundation, so he must think'],
                  hint: 'If stuck on question classification, revisit c11_eng_h_cbse_01_012 (Comprehension: Literal and.',
                  misconception: 'Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge (e.g., "Asimov wrote Foundation, so.' },
                { id: 'c', prompt: 'Classify the following question as literal or inferential and answer it using the text: "What examples does Asimov give to show that ancient magical devices.', answer: 'This is a LITERAL question',
                  options: ['This is a LITERAL question', 'any reasonable opinion', 'Asimov wrote Foundation, so he must think'],
                  hint: 'If stuck on question classification, revisit c11_eng_h_cbse_01_012 (Comprehension: Literal and.',
                  misconception: 'Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge (e.g., "Asimov wrote Foundation, so.' },
                { id: 'd', prompt: 'Analyze the relationship between these two questions from the text\'s "Understanding the Text" section: (1) "What makes for the distinction between the various.', answer: 'Question (1) is LITERAL',
                  options: ['Question (1) is LITERAL', 'any reasonable opinion', 'Asimov wrote Foundation, so he must think'],
                  hint: 'If stuck on question classification, revisit c11_eng_h_cbse_01_012 (Comprehension: Literal and.',
                  misconception: 'Students believe inferential questions allow "any reasonable opinion" and bring outside knowledge (e.g., "Asimov wrote Foundation, so.' }
          ],
            remediations: { 'inferential-questions-allow-any-reasonable': { steps: ['Give them 5 questions from the "Understanding the Text" section; have them highlight trigger words (what/when/who →.', 'For each inferential question, have them write the exact sentences they would combine.', 'Practice with a fresh paragraph from the essay (e.g., the Sherlock Holmes/Q-ray analogy) writing one literal and one.', 'Re-attempt Diagnostic Questions 3-4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
