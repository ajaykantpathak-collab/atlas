import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch27_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch27_p2: SimDef = {
    id: 'v3_c11_eng_w_ch27_p2',
    title: 'My Watch (Essay) · Part 2/3',
    subtitle: 'Watch a perfect watch get repaired to death, one expert at a time.',
    classLevel: 11, subject: 'eng_w', topic: 'My Watch (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch27'],
    nodeIds: ['c11_eng_w_cbse_27_007', 'c11_eng_w_cbse_27_008', 'c11_eng_w_cbse_27_009', 'c11_eng_w_cbse_27_010', 'c11_eng_w_cbse_27_011', 'c11_eng_w_cbse_27_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader charting a comedy of accumulated incompetence', intro: 'Eighteen months of perfect timekeeping — then one regulation too many, and seven specialists standing between a man and the correct time.', goal: 'Analyse the essay\'s episodic structure and the satiric work of its open ending.' },
    discovery: {
        question: 'Seven watchmakers \'fix\' Twain\'s watch and each leaves it worse. Where does this escalating farce actually climax?',
        options: ['At the seventh — a former steamboat engineer who destroys the watch completely', 'At the first repair — the original mistake that starts it all', 'There is none — episodes merely repeat', 'At the purchase of the cheap new watch'],
        answer: 'At the seventh — a former steamboat engineer who destroys the watch completely',
        hook: 'It\'s episodic, not linear — the same disaster loops with variations, and the comedy is that expertise itself becomes the hazard.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Bridges\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_27_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Chart the repair-hope-failure episodes, place the steamboat engineer\'s finale, and defend why buying a cheap watch beats a \'fixed\' ending.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Bridges\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature?', options: [
                { text: 'A secondary theme is a subordinate idea or motif that supports, complements, or adds', outcome: 'A secondary theme is a subordinate idea or motif that supports, complements, or adds depth to the.' },
                { text: 'the main message of the story', outcome: 'Not quite — Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary.', reveals: 'any-recurring-topic-e' },
                { text: 'watches', outcome: 'Not quite — Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary.', reveals: 'any-recurring-topic-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Bridges\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and list the five senses it engages. Give one example of each type from daily life (not from the text).', options: [
                { text: 'Imagery is descriptive language that appeals to the five senses: visual (sight – e.g.,', outcome: 'Imagery is descriptive language that appeals to the five senses: visual (sight – e.g., "crimson.' },
                { text: 'visual description', outcome: 'Not quite — Students treat imagery as "adjectives" and metaphor as "any comparison".', reveals: 'students-treat-imagery-as-adjectives' },
                { text: 'imagination', outcome: 'Not quite — Students treat imagery as "adjectives" and metaphor as "any comparison".', reveals: 'students-treat-imagery-as-adjectives' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Bridges\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the meaning of "infraction" as used in the essay, and which context clue helps you determine it?', options: [
                { text: 'Infraction means a violation or breach of a rule', outcome: 'Infraction means a violation or breach of a rule. The context clue is the list of possible minor.' },
                { text: 'a meeting', outcome: 'Not quite — Students often think "dubious assertion" means a false statement, but "dubious" means doubtful.', reveals: 'dubious-assertion-means-a-false' },
                { text: 'a punishment', outcome: 'Not quite — Students often think "dubious assertion" means a false statement, but "dubious" means doubtful.', reveals: 'dubious-assertion-means-a-false' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Bridges\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the tense and mood of the verb phrase "would have been" in the sentence: "That I would work in the field of dance...', options: [
                { text: 'The verb phrase "would have been" is in the **conditional perfect** (or "would have +', outcome: 'The verb phrase "would have been" is in the **conditional perfect** (or "would have + past.' },
                { text: 'simple past', outcome: 'Not quite — Students believe "grammar analysis" means circling verbs and labeling tenses.', reveals: 'grammar-analysis-means-circling-verbs' },
                { text: 'future', outcome: 'Not quite — Students believe "grammar analysis" means circling verbs and labeling tenses.', reveals: 'grammar-analysis-means-circling-verbs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Bridges\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify the question type: "What was the author\'s mother\'s reaction when she saw the author imitating Mumtaz Ali\'s dance at age seven?".', options: [
                { text: 'Literal', outcome: 'Literal. The text explicitly states: "my mother, who was quietly watching, was the one who said.' },
                { text: 'any opinion', outcome: 'Not quite — Students believe inferential questions allow "any opinion" as long as it sounds reasonable.', reveals: 'inferential-questions-allow-any-opinion' },
                { text: 'inference', outcome: 'Not quite — Students believe inferential questions allow "any opinion" as long as it sounds reasonable.', reveals: 'inferential-questions-allow-any-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a memoir-writing workshop you\'re comparing two essays from your syllabus: Lakhia\'s \'Bridges\', where a Kathak dancer turns life episodes into choreography, and Twain\'s \'My Watch\', where each repair makes the watch worse. A fellow participant calls both \'just chronological life stories with a beginning, middle and end.\'',
            decisions: [{ prompt: 'What\'s a sharper description of how these essays are built?', options: [
                { text: 'Name the real structures: \'Bridges\' is reflective autobiography — episodes selected because they become choreographic material, linking guru-shishya discipline to artistic creation. \'My Watch\' is episodic and circular — a repeating loop of hope → repair → brief success → worse failure, where the pile-up of the same disaster IS the humour and the trapped frustration.', outcome: 'Chronology is the raw material, not the structure: one essay builds bridges between life and art, the other spins in a comic trap of repetition.' },
                { text: 'Agree — both run in time order, so both have a linear plot.', outcome: 'Time order isn\'t linear structure: \'My Watch\' repeats circular episodes that don\'t build to a single climax — the repetition is the design.', reveals: 'chronological-equals-linear' },
                { text: 'Focus on facts instead — Lakhia\'s birth year and awards, Twain\'s biography — since structure is too subtle to discuss.', outcome: 'Context is a lens, not data: knowing Lakhia choreographed Umrao Jaan explains the essay\'s cinematic eye; a birth year explains nothing.', reveals: 'context-is-trivia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_012', title: 'The bigger picture',
          caseStudy: { intro: 'He ends not with a repaired watch but a cheap new one — the open ending seals the satire: incompetence wins, resignation is the punchline.',
            decisions: [{ prompt: 'What comes next? My Watch (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — My Watch (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_007', difficulty: 'standard',
          question: 'Secondary themes in \'Bridges\' — the supporting ideas and motifs that deepen the.',
          hint: 'If stuck, review the "Topic vs. Theme" distinction using the fable "The Tortoise and the.',
          misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.',
          parts: [
                { id: 'a', prompt: 'In "My Watch," the narrator says his watch "kept perfect time" until he let it run down.', answer: 'The watch\'s initial perfection represents a natural, self-regulating system',
                  options: ['The watch\'s initial perfection represents a natural, self-regulating system', 'watches', 'repair shops', 'any recurring topic (e'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the fable "The Tortoise and the Hare".',
                  misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.' },
                { id: 'b', prompt: 'Apply the concept of secondary theme to a new context: In a story where a gardener keeps replanting a thriving tree in different soils until it dies, what.', answer: 'A secondary theme could be "the illusion of control"',
                  options: ['A secondary theme could be "the illusion of control"', 'watches', 'repair shops', 'any recurring topic (e'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the fable "The Tortoise and the Hare".',
                  misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.' },
                { id: 'c', prompt: 'Compare the role of the watchmakers in "My Watch" to the role of the doctors in the poem "The Sick Rose" (if studied) or any text where experts worsen.', answer: 'Both texts reveal the secondary theme of "false authority"',
                  options: ['Both texts reveal the secondary theme of "false authority"', 'both make things worse', 'watches', 'repair shops'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the fable "The Tortoise and the Hare".',
                  misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student to write three complete sentences starting with "The essay suggests that..." about the watch, the.', 'Have them label each as primary or secondary by checking if it summarizes the whole essay or only a supporting strand.', 'Guide them to convert topics into themes: "watchmakers" → "the danger of unquestioned authority." 4.', 'Practice with a familiar fable (e.g., "The Tortoise and the Hare") to reinforce the topic-vs-theme distinction before.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The secondary theme of \'time as an uncontrollable force\' is more important than the primary theme in \'My Watch.\'" Defend or refute using.', answer: 'Refute',
                  options: ['Refute', 'watches', 'repair shops', 'agrees reveals confusion about thematic hierarchy and narrative structure'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the fable "The Tortoise and the Hare".',
                  misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.' },
                { id: 'b', prompt: 'Create a one-paragraph alternate ending for "My Watch" that highlights a different secondary theme (e.g., "acceptance of imperfection" or "the value.', answer: 'A strong answer will: 1) Maintain Twain\'s humorous, self-deprecating tone',
                  options: ['A strong answer will: 1) Maintain Twain\'s humorous, self-deprecating tone', 'watches', 'repair shops', 'any recurring topic (e'],
                  hint: 'If stuck, review the "Topic vs. Theme" distinction using the fable "The Tortoise and the Hare".',
                  misconception: 'Students often think any recurring topic (e.g., "watches," "repair shops," "time") is a secondary theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student to write three complete sentences starting with "The essay suggests that..." about the watch, the.', 'Have them label each as primary or secondary by checking if it summarizes the whole essay or only a supporting strand.', 'Guide them to convert topics into themes: "watchmakers" → "the danger of unquestioned authority." 4.', 'Practice with a familiar fable (e.g., "The Tortoise and the Hare") to reinforce the topic-vs-theme distinction before.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_008', difficulty: 'standard',
          question: 'Imagery in \'Bridges\' — the vivid, sensory language that creates word-pictures.',
          hint: 'Review the difference between simile (using \'like\'/\'as\') and metaphor (direct equation).',
          misconception: 'Students treat imagery as "adjectives" and metaphor as "any comparison".',
          parts: [
                { id: 'a', prompt: 'In the sentence "I was enveloped by a great mist of protection and I wanted to emerge from that mist and discover myself," identify the metaphor, name its.', answer: 'Metaphor: "mist of protection"',
                  options: ['Metaphor: "mist of protection"', 'simile because it has \'like\' implied', 'protection'],
                  hint: 'Review the difference between simile (using \'like\'/\'as\') and metaphor (direct equation); practice.',
                  misconception: 'Students treat imagery as "adjectives" and metaphor as "any comparison".' }
          ],
            remediations: { 'students-treat-imagery-as-adjectives': { steps: ['**Re-read with a sensory highlighter**: Assign five colours (V/A/O/G/T).', 'Mark every sensory word in the temple and death paragraphs.', '**Vehicle-Tenor mapping**: For each metaphor (patchwork, mist, cassettes, trading agent, loom), draw a two-column table.', 'List vehicle qualities in left, tenor mappings in right.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Bridges\' — where opposite things are both true,.',
          hint: 'Review the plot summary (c11_eng_w_cbse_27_002) and the imagery/metaphor node.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Bridges\'',
                  options: ['Irony and paradox in \'Bridges\'', '\'Bridges\' (Woven Words, ch', 'The plot/narrative arc of \'Bridges\'', 'The setting of \'Bridges\''],
                  hint: 'Review the plot summary (c11_eng_w_cbse_27_002) and the imagery/metaphor node.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student confuses irony types, have them create a three-column table: Type | Definition | Example from "My Watch".', 'Fill it together using the text.', 'For symbolism, ask: "If the watch were a character, what would it want?', 'What does its death mean?" Guide them to map the watch\'s journey (perfect → fast → slow → stop) to the arc of human.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Bridges\' — the words and phrases you must know to read the.',
          hint: 'If stuck, review the "Context Clues" strategy from Class 10 (node c10_engl_cbse_02_009).',
          misconception: 'Students often think "dubious assertion" means a false statement, but "dubious" means doubtful or questionable, not.',
          parts: [
                { id: 'a', prompt: 'What is the meaning of "infraction" as used in the essay, and which context clue helps you determine it?', answer: 'Infraction means a violation or breach of a rule',
                  options: ['Infraction means a violation or breach of a rule', 'a meeting', 'a punishment', 'dubious assertion'],
                  hint: 'If stuck, review the "Context Clues" strategy from Class 10 (node c10_engl_cbse_02_009) and.',
                  misconception: 'Students often think "dubious assertion" means a false statement, but "dubious" means doubtful or questionable, not necessarily false.' },
                { id: 'b', prompt: 'In the phrase "dubious assertion", what does "dubious" mean? Choose the correct meaning based on the context: (a) certain (b) doubtful (c) strong (d) clear.', answer: 'doubtful (',
                  options: ['doubtful (', 'dubious assertion', 'dubious', 'suspicious'],
                  hint: 'If stuck, review the "Context Clues" strategy from Class 10 (node c10_engl_cbse_02_009) and.',
                  misconception: 'Students often think "dubious assertion" means a false statement, but "dubious" means doubtful or questionable, not necessarily false.' }
          ],
            remediations: { 'dubious-assertion-means-a-false': { steps: ['Re-read the specific paragraphs where each key word appears, highlighting the sentences before and after.', 'For each word, write down the context clues (definition, example, contrast, tone).', 'Practice the word pairs by creating a two-column table: one column for each word, with a sentence from the text (or.', 'Check your sentences with a peer or teacher to ensure the distinction is clear.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_011', difficulty: 'standard',
          question: 'Language and style in \'Bridges\' — how the writer chose words, sentences and.',
          hint: 'Review "Verb Phrase Identification" and "Tense-Mood Mapping" from Class 10 grammar.',
          misconception: 'Students believe "grammar analysis" means circling verbs and labeling tenses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'Bridges\'',
                  options: ['Language and style in \'Bridges\'', '\'Bridges\' (Woven Words, ch', 'The plot/narrative arc of \'Bridges\'', 'The setting of \'Bridges\''],
                  hint: 'Review "Verb Phrase Identification" and "Tense-Mood Mapping" from Class 10 grammar workbook (Unit.',
                  misconception: 'Students believe "grammar analysis" means circling verbs and labeling tenses.' }
          ],
            remediations: { 'grammar-analysis-means-circling-verbs': { steps: ['Give the student the second paragraph only.', 'Ask them to highlight every verb phrase in two colors: one for past perfect, one for simple past.', 'Have them write a one-sentence reason for each color change (e.g., "Past perfect for habitual actions before the main.', 'Finally, ask them to rewrite the paragraph using *only* simple past and read both aloud to hear the loss of temporal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Bridges\' — questions answered straight from the text.',
          hint: 'If stuck, review the "Understanding the Text" questions in the NCERT textbook (page 196).',
          misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.',
          parts: [
                { id: 'a', prompt: 'Identify the question type: "What was the author\'s mother\'s reaction when she saw the author imitating Mumtaz Ali\'s dance at age seven?" Is this literal.', answer: 'Literal',
                  options: ['Literal', 'any opinion', 'inference', 'personal connection'],
                  hint: 'If stuck, review the "Understanding the Text" questions in the NCERT textbook (page 196) which are.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.' },
                { id: 'b', prompt: 'Explain in your own words why the author says "I find this assertion dubious" about dancers who claim they were "born to dance".', answer: 'The author calls the assertion dubious',
                  options: ['The author calls the assertion dubious', 'born to dance', 'any opinion', 'inference'],
                  hint: 'If stuck, review the "Understanding the Text" questions in the NCERT textbook (page 196) which are.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.' },
                { id: 'c', prompt: 'Apply the literal/inferential distinction: The text says "Discipline in one\'s daily routine does bring discipline in thinking." Formulate one literal question.', answer: 'Literal: What does the author say brings discipline in thinking?',
                  options: ['Literal: What does the author say brings discipline in thinking?', 'any opinion', 'inference', 'personal connection'],
                  hint: 'If stuck, review the "Understanding the Text" questions in the NCERT textbook (page 196) which are.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.' },
                { id: 'd', prompt: 'Analyze the author\'s reaction to her mother\'s death: "I did not know where to turn or what to do with my hands, which hung loose from my body.', answer: 'The description infers emotional numbness and dislocation masking deep grief',
                  options: ['The description infers emotional numbness and dislocation masking deep grief', 'emptiness I wanted to fill', 'any opinion', 'inference'],
                  hint: 'If stuck, review the "Understanding the Text" questions in the NCERT textbook (page 196) which are.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds reasonable.' }
          ],
            remediations: { 'inferential-questions-allow-any-opinion': { steps: ['Give the student a two-column table: Column A "Text Says Explicitly" (quote), Column B "This Suggests" (inference).', 'Practice with the mother\'s death passage: Fill Column A with three quotes (e.g., "hands hung loose", "hadn\'t eaten for.', 'Guide them to write Column B inferences that each quote supports.', 'Require them to write one inferential answer using the format: "The text shows [Quote A], which suggests [Inference 1].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
