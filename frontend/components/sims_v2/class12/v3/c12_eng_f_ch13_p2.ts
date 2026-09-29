import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch13_p2: SimDef = {
    id: 'v3_c12_eng_f_ch13_p2',
    title: 'A Roadside Stand (Poem) · Part 2/3',
    subtitle: 'A thousand cars an hour — and not one stops',
    classLevel: 12, subject: 'eng_f', topic: 'A Roadside Stand (Poem) · Part 2/3',
    chapters: ['c12_eng_f_ch13'],
    nodeIds: ['c12_eng_f_cbse_13_007', 'c12_eng_f_cbse_13_008', 'c12_eng_f_cbse_13_009', 'c12_eng_f_cbse_13_010', 'c12_eng_f_cbse_13_011', 'c12_eng_f_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry and society analyst', intro: 'Every highway has them — stalls nobody stops at. Frost turned one into an accusation aimed at every passing car.', goal: 'Read A Roadside Stand as a Depression-era critique of rural marginalisation and the false charity of top-down rescue.' },
    discovery: {
        question: 'On a Depression-era highway, \'polished traffic\' streaks past a fruit stand without braking. Why does Frost call the government\'s plan to \'gather\' these villagers into towns predatory — not helpful?',
        options: ['Because \'greedy good-doers\' strip rural people of agency — relocation destroys the self-reliance it claims to save', 'Because villages are cheaper', 'Because traffic needs slowing', 'No reason — Frost is just being dramatic'],
        answer: 'Because \'greedy good-doers\' strip rural people of agency — relocation destroys the self-reliance it claims to save',
        hook: 'This isn\'t a quaint farm scene — it\'s economics in verse. The stand owners need city money that never stops; the city needs nothing from them. Frost even confesses the urge to end their pain \'at one stroke\' — then catches himself, because pity without dignity is its own violence.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Aunt Jennifer\'s Tigers\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Decelerate at a roadside stand: read the squeal of brakes, the \'artless paint\' and the waiting sellers as a critique of a cash economy that drives past — then test the poem against India\'s own highway vendors.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Aunt Jennifer\'s Tigers\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in poetry, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a recurring idea that supports or complicates the primary theme', outcome: 'A secondary theme is a recurring idea that supports or complicates the primary theme; it is not the.' },
                { text: 'any topic mentioned', outcome: 'Not quite — Students often list "poverty," "government," and "city vs. village" as secondary themes without.', reveals: 'students-often-list-poverty' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Aunt Jennifer\'s Tigers\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor? Give one example of each from "A Roadside Stand" (or from any poem you know if you.', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "the traffic moved like a river")', outcome: 'A simile compares two things using "like" or "as" (e.g., "the traffic moved like a river");.' },
                { text: 'poetic language', outcome: 'Not quite — Students think "imagery" only means *visual* description (pictures in the mind).', reveals: 'imagery-only-means-visual-description' },
                { text: 'imagery', outcome: 'Not quite — Students think "imagery" only means *visual* description (pictures in the mind).', reveals: 'imagery-only-means-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Aunt Jennifer\'s Tigers\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "A Roadside Stand" where the outcome is the opposite of what the roadside stand owners.', options: [
                { text: 'Situational irony occurs when the actual result of a situation is starkly different from', outcome: 'Situational irony occurs when the actual result of a situation is starkly different from what was.' },
                { text: 'ironic', outcome: 'Not quite — Students often label any sad or unfair situation as "irony" — e.g., "It\'s ironic that the villagers.', reveals: 'students-often-label-any-sad' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Aunt Jennifer\'s Tigers\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define the term "denizen" as used in the line "Bright topaz denizens of a world of green." Provide the dictionary meaning and the.', options: [
                { text: 'Dictionary meaning: An inhabitant or occupant of a particular place', outcome: 'Dictionary meaning: An inhabitant or occupant of a particular place.' },
                { text: 'visitor', outcome: 'Not quite — Students treat vocabulary questions as "give the synonym" tasks.', reveals: 'students-treat-vocabulary-questions-as' },
                { text: 'tourist', outcome: 'Not quite — Students treat vocabulary questions as "give the synonym" tasks.', reveals: 'students-treat-vocabulary-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Aunt Jennifer\'s Tigers\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the tense of the verb phrase "are selling" in the line "The little old house was out with a little new shed / In front at the edge.', options: [
                { text: 'Correct: Present continuous (progressive) tense', outcome: 'Correct: Present continuous (progressive) tense — "are selling".' },
                { text: 'present simple', outcome: 'Not quite — Students treat "grammar in poetry" as spotting errors (e.g., "N turned wrong" is \'bad grammar\').', reveals: 'students-treat-grammar-in-poetry' },
                { text: 'past continuous', outcome: 'Not quite — Students treat "grammar in poetry" as spotting errors (e.g., "N turned wrong" is \'bad grammar\').', reveals: 'students-treat-grammar-in-poetry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Aunt Jennifer\'s Tigers\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define a literal comprehension question and give one example from the poem "Aunt Jennifer\'s Tigers".', options: [
                { text: 'A literal comprehension question asks for information directly stated in the text', outcome: 'A literal comprehension question asks for information directly stated in the text.' },
                { text: 'The tigers are orange', outcome: 'Not quite — Students treat inferential questions as "give your opinion" questions.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'They are denizens', outcome: 'Not quite — Students treat inferential questions as "give your opinion" questions.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A new highway bypass leaves a village\'s fruit stalls watching traffic roar past. The council proposes fresh paint and prettier signboards to \'attract the city money\'.',
            decisions: [{ prompt: 'Will a facelift fix it?', options: [
                { text: 'No — Frost\'s roadside stand is about structural exclusion: rural sellers are shut out of the cash flow entirely; the answer is real access — viable locations, linkages to buyers — not cosmetics.', outcome: 'The poem\'s vendors wanted \'city money\', not city approval; paint doesn\'t move money off the highway.' },
                { text: 'Yes — a polished look is what draws passing customers.', outcome: 'The poem\'s drivers speed past indifferent to the stand itself; the failure is economic exclusion, not aesthetics.', reveals: 'cosmetics-over-structure' },
                { text: 'Neither — the sensible thing is for them to abandon the village for the city.', outcome: 'Frost treats their rootedness as legitimate; telling them to migrate just accepts the neglect the poem indicts.', reveals: 'displacement-as-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a fruit stall as a structural argument about who development forgets. The stand is small; the question it asks is enormous.',
            decisions: [{ prompt: 'What comes next? A Roadside Stand (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Roadside Stand (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_007', difficulty: 'standard',
          question: 'Secondary themes in \'Aunt Jennifer\'s Tigers\' — the supporting ideas and motifs.',
          hint: 'If stuck, review how "Aunt Jennifer\'s Tigers" (Class 12 Flamingo Poem 1) uses secondary.',
          misconception: 'Students often list "poverty," "government," and "city vs. village" as secondary themes without showing how each.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Aunt Jennifer\'s Tigers\'',
                  options: ['Secondary themes in \'Aunt Jennifer\'s Tigers\'', '\'Aunt Jennifer\'s Tigers\' (Flamingo, ch', 'The plot/narrative arc of \'Aunt Jennifer\'s Tigers\'', 'The setting of \'Aunt Jennifer\'s Tigers\''],
                  hint: 'If stuck, review how "Aunt Jennifer\'s Tigers" (Class 12 Flamingo Poem 1) uses secondary themes.',
                  misconception: 'Students often list "poverty," "government," and "city vs. village" as secondary themes without showing how each is *developed* through.' }
          ],
            remediations: { 'students-often-list-poverty': { steps: ['If the student cannot distinguish secondary themes from topics, have them: (1) re-read the poem and highlight every.', 'Then revisit node c12_eng_f_cbse_13_006 (primary theme) to see how the primary theme was built similarly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_008', difficulty: 'standard',
          question: 'Imagery in \'Aunt Jennifer\'s Tigers\' — the vivid, sensory language that creates.',
          hint: 'If the student cannot distinguish tenor/vehicle in a metaphor, return.',
          misconception: 'Students think "imagery" only means *visual* description (pictures in the mind).',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "extended metaphor" to the phrase "beneficent beasts of prey" (stanza 4).', answer: 'Tenor = government officials / "good-doers"',
                  options: ['Tenor = government officials / "good-doers"', 'it means they are bad people', 'doing good', 'devouring'],
                  hint: 'If the student cannot distinguish tenor/vehicle in a metaphor, return to c11_eng_h_cbse_01_008.',
                  misconception: 'Students think "imagery" only means *visual* description (pictures in the mind).' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Have the student close their eyes and listen to you read stanza 1 aloud. Ask: "What do you *hear*? *Smell*?', 'Give them a fresh copy of the poem. Color-code: highlight visual=yellow, auditory=blue, tactile=green.', 'For each color, write one sentence: "This [sense] image makes me feel ____ because ____."', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit c6_english_u1_005 (Poetic Devices: Metaphor, Imagery).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "imagery" only means *visual* description (pictures in the mind).',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The metaphor \'childish longing\' (stanza 5) insults the farmers by calling them immature." Defend or refute using evidence from.', answer: 'Refute',
                  options: ['Refute', 'childish', 'imagery', '"imagery" only means *visual* description (pictures in the mind)'],
                  hint: 'If the student cannot distinguish tenor/vehicle in a metaphor, return to c11_eng_h_cbse_01_008.',
                  misconception: 'Students think "imagery" only means *visual* description (pictures in the mind).' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Have the student close their eyes and listen to you read stanza 1 aloud. Ask: "What do you *hear*? *Smell*?', 'Give them a fresh copy of the poem. Color-code: highlight visual=yellow, auditory=blue, tactile=green.', 'For each color, write one sentence: "This [sense] image makes me feel ____ because ____."', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit c6_english_u1_005 (Poetic Devices: Metaphor, Imagery).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Aunt Jennifer\'s Tigers\' — where opposite things are both.',
          hint: 'Review the poem\'s summary in c12_eng_f_cbse_13_002 and the theme analysis.',
          misconception: 'Students often label any sad or unfair situation as "irony" — e.g., "It\'s ironic that the villagers are poor." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Aunt Jennifer\'s Tigers\'',
                  options: ['Irony and paradox in \'Aunt Jennifer\'s Tigers\'', '\'Aunt Jennifer\'s Tigers\' (Flamingo, ch', 'The plot/narrative arc of \'Aunt Jennifer\'s Tigers\'', 'The setting of \'Aunt Jennifer\'s Tigers\''],
                  hint: 'Review the poem\'s summary in c12_eng_f_cbse_13_002 and the theme analysis in c12_eng_f_cbse_13_006.',
                  misconception: 'Students often label any sad or unfair situation as "irony" — e.g., "It\'s ironic that the villagers are poor." This confuses irony with.' }
          ],
            remediations: { 'students-often-label-any-sad': { steps: ['Re-read the poem with two highlighters: one for moments where expectation clashes with outcome (irony), one for objects.', 'For each highlight, write a one-sentence "because" statement: "This is irony because the stand was built to earn money.', 'Compare your list with the worked examples below.', 'If still stuck, revisit c12_eng_f_cbse_13_008 (Imagery and Metaphor) to strengthen the concrete-to-abstract thinking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Aunt Jennifer\'s Tigers\' — the words and phrases you must.',
          hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" vocabulary node.',
          misconception: 'Students treat vocabulary questions as "give the synonym" tasks.',
          parts: [
                { id: 'a', prompt: 'Define the term "denizen" as used in the line "Bright topaz denizens of a world of green." Provide the dictionary meaning and the contextual meaning in the.', answer: 'Dictionary meaning: An inhabitant or occupant of a particular place',
                  options: ['Dictionary meaning: An inhabitant or occupant of a particular place', 'visitor', 'tourist'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" vocabulary node (c11_eng_h_cbse_01_010).',
                  misconception: 'Students treat vocabulary questions as "give the synonym" tasks.' }
          ],
            remediations: { 'students-treat-vocabulary-questions-as': { steps: ['If a student gives dictionary-only meanings: (1) Have them re-read the stanza aloud, emphasizing the target word.', '(2) Ask: "If the poet used \'inhabitant\' instead of \'denizen,\' what feeling is lost?" (3) Guide them to list 3.', '(4) Have them write one sentence connecting the word to the tigers vs.', 'Re-test with a new word from the poem (e.g., "ordeals") using the same 4-step scaffold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_011', difficulty: 'standard',
          question: 'Language and style in \'Aunt Jennifer\'s Tigers\' — how the writer chose words.',
          hint: 'If stuck on identifying a structure, revisit the "Grammar Toolbox" section.',
          misconception: 'Students treat "grammar in poetry" as spotting errors (e.g., "N turned wrong" is \'bad grammar\') rather than *deliberate.',
          parts: [
                { id: 'a', prompt: 'Identify the tense of the verb phrase "are selling" in the line "The little old house was out with a little new shed / In front at the edge of the road where.', answer: 'Correct: Present continuous (progressive) tense',
                  options: ['Correct: Present continuous (progressive) tense', 'present simple', 'past continuous'],
                  hint: 'If stuck on identifying a structure, revisit the "Grammar Toolbox" section in c11_eng_h_cbse_01_011.',
                  misconception: 'Students treat "grammar in poetry" as spotting errors (e.g., "N turned wrong" is \'bad grammar\') rather than *deliberate deviations* that.' },
                { id: 'b', prompt: 'In the stanza beginning "The polished traffic passed...", the poet writes: "Or if ever aside a moment, then out of sorts / At having the landscape marred with.', answer: 'Correct: The participial phrase ("having the landscape marred") subordinates the',
                  options: ['Correct: The participial phrase ("having the landscape marred") subordinates the', 'only paraphrases meaning without addressing *subordination vs'],
                  hint: 'If stuck on identifying a structure, revisit the "Grammar Toolbox" section in c11_eng_h_cbse_01_011.',
                  misconception: 'Students treat "grammar in poetry" as spotting errors (e.g., "N turned wrong" is \'bad grammar\') rather than *deliberate deviations* that.' }
          ],
            remediations: { 'students-treat-grammar-in-poetry': { steps: ['Revisit c11_eng_h_cbse_01_011 (Class 11 Hornbill Grammar: Language Usage) — redo the diagnostic on "fronting and.', 'Take the first stanza of "A Roadside Stand" and rewrite every line in *standard* SVO order.', 'For each rewrite, write one sentence: "The original version does X; my rewrite loses Y."', 'Submit this table to your teacher for verification. Do NOT reread the poem — do the *transformation exercise*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_13_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Aunt Jennifer\'s Tigers\' — questions answered straight.',
          hint: 'If unable to generate inferences, return to node c12_eng_f_cbse_13_008 and re-do the.',
          misconception: 'Students treat inferential questions as "give your opinion" questions.',
          parts: [
                { id: 'a', prompt: 'Classify the following question as literal or inferential and answer it using textual evidence: "What will happen to the tigers after Aunt Jennifer dies?"', answer: 'This is an **inferential** question',
                  options: ['This is an **inferential** question', 'They will die too', 'will go on', 'They will be happy'],
                  hint: 'If unable to generate inferences, return to node c12_eng_f_cbse_13_008 and re-do the "Image →.',
                  misconception: 'Students treat inferential questions as "give your opinion" questions.' },
                { id: 'b', prompt: 'Two students answer the inferential question: "Why are Aunt Jennifer\'s fingers \'fluttering\'?" Student A: "Because she is old and weak." Student B: "Because she.', answer: 'Student B demonstrates correct inferential reasoning',
                  options: ['Student B demonstrates correct inferential reasoning', 'The poem criticises marriage'],
                  hint: 'If unable to generate inferences, return to node c12_eng_f_cbse_13_008 and re-do the "Image →.',
                  misconception: 'Students treat inferential questions as "give your opinion" questions.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['**Re-read with two highlighters:** Yellow = explicit facts (literal).', 'Pink = words suggesting deeper meaning (inferential clues: "massive", "terrified", "chivalric", "ringed").', '**Convert practice:** Take 5 literal questions from the NCERT "Think it out" and rewrite each as an inferential.', '**Use the "Quote-Sandwich" template:** For any inferential question, write: *Inference* → "This is shown in the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
