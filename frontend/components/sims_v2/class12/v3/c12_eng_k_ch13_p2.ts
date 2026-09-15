import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch13_p2: SimDef = {
    id: 'v3_c12_eng_k_ch13_p2',
    title: 'A River (Poem) · Part 2/3',
    subtitle: 'The house she left keeps dying in every town she reaches',
    classLevel: 12, subject: 'eng_k', topic: 'A River (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch13'],
    nodeIds: ['c12_eng_k_cbse_13_007', 'c12_eng_k_cbse_13_008', 'c12_eng_k_cbse_13_009', 'c12_eng_k_cbse_13_010', 'c12_eng_k_cbse_13_011', 'c12_eng_k_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Confessional poetry reader', intro: 'A feminist poet returns, in verse, to the feudal house that made her — and asks what her blood remembers that she\'d rather forget.', goal: 'Read Kamala Das\'s Blood as a confessional meditation on matrilineal inheritance, female agency and unresolved guilt.' },
    discovery: {
        question: 'A great-grandmother boasts her blood is \'the oldest blood in the world — thin and clear and fine,\' while the poor bleed \'thick as gruel.\' Is the poem endorsing her pride?',
        options: ['No — it stages the feudal metaphor for critique; the granddaughter who shares that blood abandons the house and learns \'most lessons of defeat\'', 'Yes — aristocratic blood is real', 'It\'s about literal blood types', 'The grandmother is simply right'],
        answer: 'No — it stages the feudal metaphor for critique; the granddaughter who shares that blood abandons the house and learns \'most lessons of defeat\'',
        hook: '\'Blood\' is confessional poetry — a feminist voice interrogating her own inheritance. The decaying tharavad and the dying matriarch are one body; the speaker flees, feels the betrayal, and still hears \'the rattle of its death\' from every town she lives in. Inheritance is a haunting, not a keepsake.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate yet significant ideas that run parallel to the primary theme in a literary work, enriching the text by exploring complementary dimensions such as social critique.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ancestral house of South Malabar: map the poem\'s three timeframes, weigh the great-grandmother\'s devotion against the speaker\'s flight, and decide if the ending offers closure — or a haunting that rides on.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re standing in front of a 300-year-old Kerala tharavadu (ancestral house) with cracked walls and a snake-shrine overtaken by weeds — the.',
            decisions: [{ prompt: 'What is the difference between a primary theme and a secondary theme in a poem? Answer in 1-2 sentences.', options: [
                { text: 'A primary theme is the central, dominating idea that structures the entire poem (in', outcome: 'A primary theme is the central, dominating idea that structures the entire poem (in "Blood," the.' },
                { text: 'less important', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" and list them like inventory.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing in the ruined courtyard of a 300-year-old Kerala tharavadu during monsoon: you hear the windows whine, smell the damp moss.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from the poem "Blood" without quoting full lines.', options: [
                { text: 'Imagery: language appealing to senses (e.g., "windows whine and groan"', outcome: 'Imagery: language appealing to senses (e.g., "windows whine and groan" — auditory).' },
                { text: 'blood like water', outcome: 'Not quite — Students often treat every descriptive phrase as imagery and every comparison as metaphor.', reveals: 'students-often-treat-every-descriptive' },
                { text: 'the house is old', outcome: 'Not quite — Students often treat every descriptive phrase as imagery and every comparison as metaphor.', reveals: 'students-often-treat-every-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you promised your grandmother as a child that you would restore your crumbling ancestral home, but as an adult you leave it to decay — that gap between.',
            decisions: [{ prompt: 'Define situational irony and give one example from the poem "Blood" where the outcome contradicts the character\'s intention or expectation.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to', outcome: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to what was.' },
                { text: 'oldest blood', outcome: 'Not quite — Students often confuse irony with mere coincidence or unfortunate timing.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the poem and stumble on the line "A blood thin and clear and fine / While in the veins of the always poor / And in the veins / Of the.',
            decisions: [{ prompt: 'Define "connotation" in the context of literary analysis and give one example from the poem "Blood" where a word\'s connotation differs.', options: [
                { text: 'Connotation is the set of associated, implied, or emotional meanings a word carries', outcome: 'Connotation is the set of associated, implied, or emotional meanings a word carries beyond its.' },
                { text: 'connotation is just the dictionary meaning', outcome: 'Not quite — Students often treat vocabulary-in-context questions as **dictionary-definition exercises**.', reveals: 'students-often-treat-vocabulary-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading "Blood" aloud and notice the sentences don\'t follow normal rules — some stretch across stanzas, some are fragments, and the tense jumps.',
            decisions: [{ prompt: 'Identify the predominant tense used in the first three stanzas of "Blood" and state one reason a poet might choose this tense for.', options: [
                { text: 'The predominant tense is simple past ("said," "was," "hurt," "cried," "told")', outcome: 'The predominant tense is simple past ("said," "was," "hurt," "cried," "told").' },
                { text: 'present tense', outcome: 'Not quite — Students treat poetic grammar as "incorrect" or "broken" prose grammar — e.g., marking sentence.', reveals: 'students-treat-poetic-grammar-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the first question asks: "What did the great-grandmother say about the house?" You instantly scan the poem for her.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question when answering from.', options: [
                { text: 'A literal comprehension question asks for information directly stated in the poem (e.g.,', outcome: 'A literal comprehension question asks for information directly stated in the poem (e.g., "How old.' },
                { text: 'no right answer', outcome: 'Not quite — Students often believe inferential questions have "no right answer" and write vague personal.', reveals: 'inferential-questions-have-no-right' },
                { text: 'I think the poet is sad', outcome: 'Not quite — Students often believe inferential questions have "no right answer" and write vague personal.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A daughter is told she must keep the crumbling ancestral house and \'the oldest blood in the world\' — abandon her career in the city to guard the lineage.',
            decisions: [{ prompt: 'What does Kamala Das\'s \'Blood\' make of that demand?', options: [
                { text: 'It backs her break — the poem loves the house yet shows \'blood\' pride as a script that cages women; she can honour the inheritance and still refuse the role it assigns her.', outcome: 'The speaker stays haunted but leaves anyway — loyalty to memory doesn\'t mean submission to the lineage\'s demands.' },
                { text: 'She must stay — bloodline duty outranks any individual life.', outcome: 'The poem reports the great-grandmother\'s claim ironically, exposing how \'oldest blood\' talk serves the feudal order, not her.', reveals: 'tradition-outranks-person' },
                { text: 'She should go and feel nothing — attachment to an old house is irrational.', outcome: 'The poem refuses that easy exit too; the haunting is real, and denying it just hides the cost rather than paying it honestly.', reveals: 'heritage-is-irrational' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a family home as an argument about lineage, gender and guilt — and hear an ellipsis where a resolution should be.',
            decisions: [{ prompt: 'What comes next? A River (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A River (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate yet significant ideas that run parallel.',
          hint: 'If stuck, return to c12_eng_k_cbse_13_006 and re-do the primary theme articulation.',
          misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" and list them like inventory items (e.g., "Theme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the subordinate yet significant ideas that run parallel to the',
                  options: ['Secondary themes are the subordinate yet significant ideas that run parallel to the', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and narrative structure in a narrative poem refer to the sequence of events (plot)', 'Setting in poetry refers to the time, place, and cultural environment where the poem\'s'],
                  hint: 'If stuck, return to c12_eng_k_cbse_13_006 and re-do the primary theme articulation exercise — write.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" and list them like inventory items (e.g., "Theme 1: Class.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student cannot move beyond listing themes: (1) Have them re-read the poem with three colored highlighters — one.', 'Where do they clash?" (3) Guide them to write one paragraph per overlap/clash using the template: "The poem introduces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the "Identify the Device" exercises in Class 11 Woven Words Chapter 1 (Poetry) and.',
          misconception: 'Students often treat every descriptive phrase as imagery and every comparison as metaphor.',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor in your own words, giving one example of each from the poem "Blood" without quoting full lines.', answer: 'Imagery: language appealing to senses (e.g., "windows whine and groan"',
                  options: ['Imagery: language appealing to senses (e.g., "windows whine and groan"', 'blood like water', 'the house is old'],
                  hint: 'Review the "Identify the Device" exercises in Class 11 Woven Words Chapter 1 (Poetry) and Hornbill.',
                  misconception: 'Students often treat every descriptive phrase as imagery and every comparison as metaphor.' },
                { id: 'b', prompt: 'In the line "The house was crouching / On its elbows then", identify the metaphor and explain what quality of the house is highlighted by comparing it to.', answer: 'Metaphor: house = crouching creature (implied)',
                  options: ['Metaphor: house = crouching creature (implied)', 'the house is old'],
                  hint: 'Review the "Identify the Device" exercises in Class 11 Woven Words Chapter 1 (Poetry) and Hornbill.',
                  misconception: 'Students often treat every descriptive phrase as imagery and every comparison as metaphor.' }
          ],
            remediations: { 'students-often-treat-every-descriptive': { steps: ['Revisit Class 11 node c11_eng_h_cbse_01_008 (Literary Devices: Imagery and Metaphor) and re-do the identification.', 'Create a two-column table: column A = sensory word/phrase from "Blood", column B = sense appealed to.', 'For metaphor, list every "X is Y" and "X verb Y" where X and Y are nouns; test by inserting "is" — if it makes sense.', 'Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review the "Irony in \'A Letter to God\'" (c10_engl_cbse_01_007) worked example.',
          misconception: 'Students often confuse irony with mere coincidence or unfortunate timing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and narrative structure in a narrative poem refer to the sequence of events (plot)', 'Setting in poetry refers to the time, place, and cultural environment where the poem\'s'],
                  hint: 'If stuck, review the "Irony in \'A Letter to God\'" (c10_engl_cbse_01_007) worked example — it breaks.',
                  misconception: 'Students often confuse irony with mere coincidence or unfortunate timing.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony types, have them create a three-column table: Column 1 = character\'s.', 'Fill it for three moments: (a) childhood promise vs adult abandonment (situational), (b) "do not blame my blood" while.', 'For symbols, use the "concrete-to-abstract" ladder: list the physical object, its described qualities, the abstract.', 'Practice with the house, then the snake-shrine, then blood.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse irony with mere coincidence or unfortunate timing.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s ending — the speaker hearing the house\'s "rattle of its death" from "every town I live in" — resolves or intensifies the irony.', answer: 'The ending intensifies the irony rather than resolving it',
                  options: ['The ending intensifies the irony rather than resolving it', 'she asks forgiveness', 'I seek forgiveness'],
                  hint: 'If stuck, review the "Irony in \'A Letter to God\'" (c10_engl_cbse_01_007) worked example — it breaks.',
                  misconception: 'Students often confuse irony with mere coincidence or unfortunate timing.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony types, have them create a three-column table: Column 1 = character\'s.', 'Fill it for three moments: (a) childhood promise vs adult abandonment (situational), (b) "do not blame my blood" while.', 'For symbols, use the "concrete-to-abstract" ladder: list the physical object, its described qualities, the abstract.', 'Practice with the house, then the snake-shrine, then blood.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck on connotation vs denotation, review the "Language Study" section in the NCERT.',
          misconception: 'Students often treat vocabulary-in-context questions as **dictionary-definition exercises**.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "semantic shift" to the word "blood" across the poem.', answer: 'In stanza 3, "blood" functions as a **class marker**',
                  options: ['In stanza 3, "blood" functions as a **class marker**', 'as having a static meaning (e.g', 'treats "blood" as having a static meaning (e'],
                  hint: 'If stuck on connotation vs denotation, review the "Language Study" section in the NCERT textbook.',
                  misconception: 'Students often treat vocabulary-in-context questions as **dictionary-definition exercises**.' }
          ],
            remediations: { 'students-often-treat-vocabulary-in': { steps: ['**Revisit the poem with a highlighter:** Mark every word you cannot define *in the context of this specific line*.', 'Do not use a dictionary yet.', '**For each marked word:** Write the literal meaning, then write "In this poem, it suggests..." and list 2-3.', '**Check the "Blood" semantic map:** Draw a timeline of the word "blood" across the poem (Stanza 3 -> Stanza 5 -> Final.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_011', difficulty: 'standard',
          question: 'Language usage in poetry refers to the deliberate grammatical, syntactic, and.',
          hint: 'If stuck, review "sentence vs. fragment" and "finite vs. non-finite verbs" from Class 10.',
          misconception: 'Students treat poetic grammar as "incorrect" or "broken" prose grammar — e.g., marking sentence fragments as errors,.',
          parts: [
                { id: 'a', prompt: 'Identify the predominant tense used in the first three stanzas of "Blood" and state one reason a poet might choose this tense for a narrative about childhood.', answer: 'The predominant tense is simple past ("said," "was," "hurt," "cried," "told")',
                  options: ['The predominant tense is simple past ("said," "was," "hurt," "cried," "told")', 'present tense'],
                  hint: 'If stuck, review "sentence vs. fragment" and "finite vs. non-finite verbs" from Class 10 grammar.',
                  misconception: 'Students treat poetic grammar as "incorrect" or "broken" prose grammar — e.g., marking sentence fragments as errors, or assuming tense.' },
                { id: 'b', prompt: 'Explain in your own words how the sentence fragment "The oldest blood in the world" (repeated in stanzas 4 and 8) functions grammatically and thematically.', answer: 'Grammatically, it is a noun phrase functioning as an elliptical declaration',
                  options: ['Grammatically, it is a noun phrase functioning as an elliptical declaration', 'it\'s an incomplete sentence, so it\'s wrong'],
                  hint: 'If stuck, review "sentence vs. fragment" and "finite vs. non-finite verbs" from Class 10 grammar.',
                  misconception: 'Students treat poetic grammar as "incorrect" or "broken" prose grammar — e.g., marking sentence fragments as errors, or assuming tense.' },
                { id: 'c', prompt: 'In stanza 5, the lines "I looked deep into her eyes / Her poor bleary eyes" use a syntactic technique where the second line renames the first.', answer: 'The technique is apposition',
                  options: ['The technique is apposition', 'Her poor bleary eyes', 'her eyes', 'I looked deep into her poor bleary eyes'],
                  hint: 'If stuck, review "sentence vs. fragment" and "finite vs. non-finite verbs" from Class 10 grammar.',
                  misconception: 'Students treat poetic grammar as "incorrect" or "broken" prose grammar — e.g., marking sentence fragments as errors, or assuming tense.' }
          ],
            remediations: { 'students-treat-poetic-grammar-as': { steps: ['Revisit c11_eng_h_cbse_01_011 (Class 11 Grammar: Language Usage in the Text) for the baseline method of annotating.', 'Re-read "Blood" with a coloured pen: mark every line that lacks a finite verb in one colour, every tense shift.', 'For each mark, write one sentence: "This [fragment/tense shift/enjambment] makes me feel/think ___ because ___." 4.', 'Re-attempt DIAGNOSTIC_QUESTION_4 using your annotations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck, review the PEEL answer structure from c11_eng_w_cbse_01_014 (Class 11 Writing.',
          misconception: 'Students often believe inferential questions have "no right answer" and write vague personal opinions like "I think the.',
          parts: [
                { id: 'a', prompt: 'In the poem, the great-grandmother says, "For I love this house, it hurts me much / To watch it die." Is the house literally dying?', answer: 'No, the house is not literally dying',
                  options: ['No, the house is not literally dying', 'no right answer', 'I think the poet is sad', 'the poet is sad'],
                  hint: 'If stuck, review the PEEL answer structure from c11_eng_w_cbse_01_014 (Class 11 Writing Skills) and.',
                  misconception: 'Students often believe inferential questions have "no right answer" and write vague personal opinions like "I think the poet is sad.".' },
                { id: 'b', prompt: 'Using the poem, answer this literal question: "What specific promise does the child speaker make to the great-grandmother about the house?" Then rewrite the.', answer: 'Literal answer: The child promises, "When I grow old',
                  options: ['Literal answer: The child promises, "When I grow old', 'oldest blood', 'no right answer', 'I think the poet is sad'],
                  hint: 'If stuck, review the PEEL answer structure from c11_eng_w_cbse_01_014 (Class 11 Writing Skills) and.',
                  misconception: 'Students often believe inferential questions have "no right answer" and write vague personal opinions like "I think the poet is sad.".' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['If a student cannot differentiate literal from inferential or produces unsupported inferences, assign this 3-step.', '(2) Take five literal questions from c12_eng_k_cbse_13_012 and convert each into an inferential version, writing a PEEL.', '(3) Re-attempt DIAGNOSTIC_QUESTION_4 and DIAGNOSTIC_QUESTION_5, then self-check using the provided answers.', 'If still stuck, revisit c11_eng_h_cbse_01_012 (Class 11 Hornbill comprehension) for foundational practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
