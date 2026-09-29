import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch11_p2: SimDef = {
    id: 'v3_c12_eng_f_ch11_p2',
    title: 'Keeping Quiet (Poem) · Part 2/3',
    subtitle: 'Count to twelve — the radical politics of doing nothing',
    classLevel: 12, subject: 'eng_f', topic: 'Keeping Quiet (Poem) · Part 2/3',
    chapters: ['c12_eng_f_ch11'],
    nodeIds: ['c12_eng_f_cbse_11_007', 'c12_eng_f_cbse_11_008', 'c12_eng_f_cbse_11_009', 'c12_eng_f_cbse_11_010', 'c12_eng_f_cbse_11_011', 'c12_eng_f_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry analyst', intro: 'One poet asked humanity to stop — no engines, no words, no wars — just long enough to finally meet ourselves.', goal: 'Trace the stanza-wise argument of Keeping Quiet and explain why its stillness is life-affirming, not passive.' },
    discovery: {
        question: 'Neruda asks the whole world to count to twelve and keep still — then insists this is \'not total inactivity.\' Why the urgent clarification?',
        options: ['Without it the call for stillness reads as passivity or death; he means a life-affirming pause — \'Life is what it is about\' — not surrender', 'He was afraid people would nap', 'Stillness and inactivity are the same thing', 'Poets just contradict themselves'],
        answer: 'Without it the call for stillness reads as passivity or death; he means a life-affirming pause — \'Life is what it is about\' — not surrender',
        hook: 'The poem is an argument, not a mood: proposal → consequence → evidence → clarification. Fishermen harming themselves, \'wars with gas, wars with fire,\' a \'victory with no survivors\' — the images are evidence that activity without introspection is the real danger.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Keeping Quiet\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_11_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold the world\'s pause button: follow the five-stanza argument from \'count to twelve\' through the fishermen, the salt-gatherer and the war-makers to the Earth that teaches by seeming dead yet living.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Keeping Quiet\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of poetry analysis. How does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that explores a specific dimension of the primary', outcome: 'A secondary theme is a supporting idea that explores a specific dimension of the primary theme.' },
                { text: 'Secondary theme is just another main idea', outcome: 'Not quite — Students often treat secondary themes as *just a list of topics* ("nature," "death," "stories").', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Keeping Quiet\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the basic difference between imagery and metaphor in poetry?', options: [
                { text: 'Imagery uses sensory language to create a concrete mental picture (e.g., "his hands hurt', outcome: 'Imagery uses sensory language to create a concrete mental picture (e.g., "his hands hurt from the.' },
                { text: 'both are comparisons', outcome: 'Not quite — Students routinely confuse *symbolism* with *metaphor* in this poem.', reveals: 'students-routinely-confuse-symbolism-with' },
                { text: 'identify the poetic device', outcome: 'Not quite — Students routinely confuse *symbolism* with *metaphor* in this poem.', reveals: 'students-routinely-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Keeping Quiet\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'What is the basic definition of irony as a literary device?', options: [
                { text: 'Irony is a contrast between expectation and reality, or between what is said and what is', outcome: 'Irony is a contrast between expectation and reality, or between what is said and what is meant.' },
                { text: 'irony is a funny coincidence', outcome: 'Not quite — Students often think any unexpected event is irony, and any comparison is symbolism.', reveals: 'any-unexpected-event-is-irony' },
                { text: 'any unexpected event is irony, and any comparison is symbolism', outcome: 'Not quite — Students often think any unexpected event is irony, and any comparison is symbolism.', reveals: 'any-unexpected-event-is-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Keeping Quiet\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "denotation" and "connotation" and give one example from "Keeping Quiet" where a word\'s connotation matters more than its denotation.', options: [
                { text: 'Denotation is the literal dictionary meaning of a word', outcome: 'Denotation is the literal dictionary meaning of a word; connotation is the emotional, cultural,.' },
                { text: 'How does the poet\'s word choice convey...?', outcome: 'Not quite — Students treat vocabulary questions as "give the meaning of X word" and write dictionary.', reveals: 'students-treat-vocabulary-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Keeping Quiet\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the archaic or poetic word forms used in the poem "A Thing of Beauty" and give one example with its modern equivalent.', options: [
                { text: 'The poem uses "morrow" (modern: morning/tomorrow), "o\'er-darkened" (modern:', outcome: 'The poem uses "morrow" (modern: morning/tomorrow), "o\'er-darkened" (modern: over-darkened), and.' },
                { text: 'beauty, joy, forever', outcome: 'Not quite — Students treat "grammar in poetry" as merely spotting parts of speech (nouns, verbs, adjectives).', reveals: 'students-treat-grammar-in-poetry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Keeping Quiet\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "List the things of beauty mentioned in the poem."', options: [
                { text: 'This is a **literal** question', outcome: 'This is a **literal** question because it asks for information directly stated in the poem (sun.' },
                { text: 'inferential', outcome: 'Not quite — Students believe **inferential questions have "no right answer" — "it\'s just your opinion."** They.', reveals: 'inferential-questions-have-no-right' },
                { text: 'listing', outcome: 'Not quite — Students believe **inferential questions have "no right answer" — "it\'s just your opinion."** They.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A project team fractures in constant quarrels; deadlines force more meetings, more noise. Someone suggests the group stop and sit in silence together once a day.',
            decisions: [{ prompt: 'Is \'keeping quiet\' a real intervention?', options: [
                { text: 'Yes — Neruda\'s stillness is deliberate introspection, \'not total inactivity\': pausing the machinery of conflict lets the team interrupt its own momentum and see itself.', outcome: 'The poem\'s count to twelve is an active interruption of harmful motion — stillness as insight, not idleness.' },
                { text: 'No — silence means doing nothing, and doing nothing ships no work.', outcome: 'Neruda explicitly rules that out; the pause is productive self-examination, not a strike.', reveals: 'stillness-is-inactivity' },
                { text: 'No — the fix is staying even busier so there\'s no time to fight.', outcome: 'Busyness is the engine of the quarrel; the poem\'s point is that ceaseless motion is what hides us from ourselves.', reveals: 'busyness-as-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend stillness as an act of understanding, not idleness — and trace how a poem builds an argument through images instead of reasons.',
            decisions: [{ prompt: 'What comes next? Keeping Quiet (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Keeping Quiet (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_007', difficulty: 'standard',
          question: 'Secondary themes in \'Keeping Quiet\' — the supporting ideas and motifs that.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_007 (Class 11 secondary themes) and.',
          misconception: 'Students often treat secondary themes as *just a list of topics* ("nature," "death," "stories") rather than.',
          parts: [
                { id: 'a', prompt: 'Analyze the line: "Therefore, on every morrow, are we wreathing / A flowery band to bind us to the earth." What secondary theme does this metaphor reveal?', answer: 'The metaphor reveals the secondary theme: **Beauty as a deliberate, daily act of',
                  options: ['The metaphor reveals the secondary theme: **Beauty as a deliberate, daily act of', 'it means we like flowers', 'every morrow', 'bind us to the earth'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_007 (Class 11 secondary themes) and c12_eng_f_cbse_11_006.',
                  misconception: 'Students often treat secondary themes as *just a list of topics* ("nature," "death," "stories") rather than as *arguable claims with.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot move from topic to thematic statement: (1) Give them the topic "nature" and ask: "What *does*.', 'Complete: \'Nature _______.\'" (2) Have them find 3 lines showing that action.', '(3) Guide them to formulate: "Nature *provides democratic healing* because..." (4) Practice converting 3 topics from.', 'Re-test with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_008', difficulty: 'standard',
          question: 'Imagery in \'Keeping Quiet\' — the vivid, sensory language that creates.',
          hint: 'If stuck, return to c6_english_u1_005 and practice labeling 20 lines from various poems.',
          misconception: 'Students routinely confuse *symbolism* with *metaphor* in this poem.',
          parts: [
                { id: 'a', prompt: 'In the line "Now we will count to twelve / and we will all keep still," why is this an example of kinesthetic imagery rather than a metaphor?', answer: 'Kinesthetic imagery appeals to the sense of movement and bodily stillness',
                  options: ['Kinesthetic imagery appeals to the sense of movement and bodily stillness', 'identify the poetic device', 'analyze the effect'],
                  hint: 'If stuck, return to c6_english_u1_005 and practice labeling 20 lines from various poems as "visual.',
                  misconception: 'Students routinely confuse *symbolism* with *metaphor* in this poem.' }
          ],
            remediations: { 'students-routinely-confuse-symbolism-with': { steps: ['Revisit c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c7_engl_ch01_008 (Literary Devices.', 'Create a three-column table: Column A = line from poem, Column B = device (imagery type / metaphor / symbol.', 'Re-attempt Diagnostic Questions 2 and 4.', 'If still incorrect, schedule a 15-minute conference with the teacher using the table as discussion basis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely confuse *symbolism* with *metaphor* in this poem.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the central metaphor "keeping quiet" (silence) as a tool for social change.', answer: 'The metaphor is effective',
                  options: ['The metaphor is effective', 'identify the poetic device', 'analyze the effect'],
                  hint: 'If stuck, return to c6_english_u1_005 and practice labeling 20 lines from various poems as "visual.',
                  misconception: 'Students routinely confuse *symbolism* with *metaphor* in this poem.' }
          ],
            remediations: { 'students-routinely-confuse-symbolism-with': { steps: ['Revisit c6_english_u1_005 (Poetic Devices: Rhyme Scheme, Metaphor, Imagery) and c7_engl_ch01_008 (Literary Devices.', 'Create a three-column table: Column A = line from poem, Column B = device (imagery type / metaphor / symbol.', 'Re-attempt Diagnostic Questions 2 and 4.', 'If still incorrect, schedule a 15-minute conference with the teacher using the table as discussion basis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Keeping Quiet\' — where opposite things are both true,.',
          hint: 'Review c12_eng_f_cbse_11_008 (Imagery and Metaphor) and practice labeling images in the.',
          misconception: 'Students often think any unexpected event is irony, and any comparison is symbolism.',
          parts: [
                { id: 'a', prompt: 'Identify one symbol in the poem and explain what abstract idea it represents.', answer: '"Fishermen in the cold sea" symbolize humans exploiting nature without thought',
                  options: ['"Fishermen in the cold sea" symbolize humans exploiting nature without thought', 'it\'s about fishing', 'only describes the literal scene (e', 'any unexpected event is irony, and any comparison is symbolism'],
                  hint: 'Review c12_eng_f_cbse_11_008 (Imagery and Metaphor) and practice labeling images in the poem.',
                  misconception: 'Students often think any unexpected event is irony, and any comparison is symbolism.' },
                { id: 'b', prompt: 'Compare the irony in the first stanza ("count to twelve and keep quiet") with the irony in the last stanza ("you keep quiet and I will go").', answer: 'The first irony initiates the collective pause',
                  options: ['The first irony initiates the collective pause', 'any unexpected event is irony, and any comparison is symbolism'],
                  hint: 'Review c12_eng_f_cbse_11_008 (Imagery and Metaphor) and practice labeling images in the poem.',
                  misconception: 'Students often think any unexpected event is irony, and any comparison is symbolism.' }
          ],
            remediations: { 'any-unexpected-event-is-irony': { steps: ['Re-read the poem and highlight every imperative verb (e.g., "count", "stop", "let\'s not").', 'For each, ask: does the speaker do that thing?', 'List all concrete nouns (fishermen, salt, wars, clothes, earth).', 'For each, write what it *could* stand for beyond the literal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Keeping Quiet\' — the words and phrases you must know to read.',
          hint: 'If stuck on connotation analysis, review the "green wars" example in Class 11 Hornbill.',
          misconception: 'Students treat vocabulary questions as "give the meaning of X word" and write dictionary definitions.',
          parts: [
                { id: 'a', prompt: 'Define "denotation" and "connotation" and give one example from "Keeping Quiet" where a word\'s connotation matters more than its denotation for understanding.', answer: 'Denotation is the literal dictionary meaning of a word',
                  options: ['Denotation is the literal dictionary meaning of a word', 'How does the poet\'s word choice convey...?'],
                  hint: 'If stuck on connotation analysis, review the "green wars" example in Class 11 Hornbill Chapter 1.',
                  misconception: 'Students treat vocabulary questions as "give the meaning of X word" and write dictionary definitions.' },
                { id: 'b', prompt: 'In the line "Those who prepare green wars / wars with gas, wars with fire" (lines 10-11), the adjective "green" modifies "wars." Apply your understanding.', answer: '"Green" connotes life, nature, growth, and peace',
                  options: ['"Green" connotes life, nature, growth, and peace', 'only as'],
                  hint: 'If stuck on connotation analysis, review the "green wars" example in Class 11 Hornbill Chapter 1.',
                  misconception: 'Students treat vocabulary questions as "give the meaning of X word" and write dictionary definitions.' }
          ],
            remediations: { 'students-treat-vocabulary-questions-as': { steps: ['Have the student re-read the poem with a highlighter, marking only words that "feel wrong" or surprising in context.', 'For each marked word, complete a 3-column table: Literal Meaning | Contextual Meaning | Effect on Reader.', 'Practice one Board-style question: "How does Neruda\'s use of the word \'______\' contribute to the poem\'s message?" using.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_011', difficulty: 'standard',
          question: 'Language and style in \'Keeping Quiet\' — how the writer chose words, sentences.',
          hint: 'Review "Subject-Auxiliary Inversion after Fronted Adverbials" and "Prepositional Phrase.',
          misconception: 'Students treat "grammar in poetry" as merely spotting parts of speech (nouns, verbs, adjectives) rather than analyzing.',
          parts: [
                { id: 'a', prompt: 'Identify the archaic or poetic word forms used in the poem "A Thing of Beauty" and give one example with its modern equivalent.', answer: 'The poem uses "morrow" (modern: morning/tomorrow), "o\'er-darkened" (modern:',
                  options: ['The poem uses "morrow" (modern: morning/tomorrow), "o\'er-darkened" (modern:', 'beauty, joy, forever'],
                  hint: 'Review "Subject-Auxiliary Inversion after Fronted Adverbials" and "Prepositional Phrase.',
                  misconception: 'Students treat "grammar in poetry" as merely spotting parts of speech (nouns, verbs, adjectives) rather than analyzing syntactic deviations.' }
          ],
            remediations: { 'students-treat-grammar-in-poetry': { steps: ['Revisit c11_eng_h_cbse_11_011 (Class 11 Grammar: Language Usage) and re-do the inversion and parallelism exercises.', 'Take the first 8 lines of "A Thing of Beauty," rewrite each line in standard prose order, then compare: what.', 'Complete the diagnostic re-check: identify the three inversions in the poem and explain each one\'s effect on emphasis.', 'If still stuck, watch the 10-minute video "Poetic Syntax in Keats" (linked in Class 12 resources) and take structured.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Keeping Quiet\' — questions answered straight from the.',
          hint: 'If stuck on inference, return to c12_eng_f_cbse_11_008 (Imagery and Metaphor) — most.',
          misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just your opinion."** They write vague.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "List the things of beauty mentioned in the poem."', answer: 'This is a **literal** question',
                  options: ['This is a **literal** question', 'inferential', 'listing', 'interpreting'],
                  hint: 'If stuck on inference, return to c12_eng_f_cbse_11_008 (Imagery and Metaphor) — most inferential.',
                  misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just your opinion."** They write vague responses like "It means.' },
                { id: 'b', prompt: 'Apply the "Evidence → Inference → Significance" routine to answer: "Why is \'grandeur\' associated with the \'mighty dead\'?" Use two distinct pieces of textual.', answer: '**Evidence 1:** "All lovely tales that we have heard or read"',
                  options: ['**Evidence 1:** "All lovely tales that we have heard or read"', 'they were great kings', 'grandeur', 'immortal drink'],
                  hint: 'If stuck on inference, return to c12_eng_f_cbse_11_008 (Imagery and Metaphor) — most inferential.',
                  misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just your opinion."** They write vague responses like "It means.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['**Revisit the "Evidence → Inference → Significance" routine** using NCERT "Think it out" Q3 and Q4.', '**Practice classifying** 10 past Board questions (literal vs inferential) — use CBSE 2019-2023 papers.', '**Rewrite three weak inferential answers** from your notebook: for each, add two quoted lines and a "This shows.', '**Re-diagnostic:** Attempt Diagnostic Question 3 again without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
