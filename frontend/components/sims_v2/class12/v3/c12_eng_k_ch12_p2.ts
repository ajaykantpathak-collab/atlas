import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch12_p2: SimDef = {
    id: 'v3_c12_eng_k_ch12_p2',
    title: 'Time and Time Again (Poem) · Part 2/3',
    subtitle: 'The clocks never agreed — that was the city\'s harmony',
    classLevel: 12, subject: 'eng_k', topic: 'Time and Time Again (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch12'],
    nodeIds: ['c12_eng_k_cbse_12_007', 'c12_eng_k_cbse_12_008', 'c12_eng_k_cbse_12_009', 'c12_eng_k_cbse_12_010', 'c12_eng_k_cbse_12_011', 'c12_eng_k_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Indian English poetry reader', intro: 'A linguist who translated ancient Tamil verse hears Indian cities in their clock towers — every one offbeat, all of them together.', goal: 'Read Time and Time Again through its clock-tower metaphor for pluralism, and the lament for rhythms broken by violence.' },
    discovery: {
        question: 'Old-city clock towers strike the hour \'slightly off\' each other — never together. A.K. Ramanujan builds a poem on that tiny imperfection. What is he actually clocking?',
        options: ['The perennial feuds and seasonal alliances of Hindu, Christian and Muslim neighbours — a plural city that coexists without ever synchronising', 'Bad clockmakers', 'Indian Standard Time delays', 'Nothing — just sounds'],
        answer: 'The perennial feuds and seasonal alliances of Hindu, Christian and Muslim neighbours — a plural city that coexists without ever synchronising',
        hook: 'A tower left \'eyeless, silent\' after a riot — or a \'precise act of nature\' in lightning — equates human violence with natural disaster. Nature\'s fury is lawful and exact; communal hatred is lawless. The poem doesn\'t condemn or accept — it bears witness, a wistful lament for a shattered rhythm.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement the primary theme by adding layers of meaning, exploring related facets of the central concern, or presenting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen to an Indian city\'s towers: hear alloy, maker\'s hand and donor\'s whim inside each bell, then follow the poem to the knocked-out clockwork and the zigzag sky showing through.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re standing in an old Indian city — maybe Lucknow or Hyderabad — hearing multiple clocktowers strike midnight at slightly different moments.',
            decisions: [{ prompt: 'What is the most immediate, literal reason the poem gives for the clocktowers beating at different times?', options: [
                { text: 'The poem attributes the time differences to "accidents of alloy, a maker\'s shaking hand /', outcome: 'The poem attributes the time differences to "accidents of alloy, a maker\'s shaking hand /.' },
                { text: 'the clocks represent different religions', outcome: 'Not quite — Students conflate "secondary theme" with "any other idea in the poem" and list topics (e.g.', reveals: 'students-conflate-secondary-theme-with' },
                { text: 'time zones', outcome: 'Not quite — Students conflate "secondary theme" with "any other idea in the poem" and list topics (e.g.', reveals: 'students-conflate-secondary-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re standing in an old Indian city at noon: you hear not one bell but several clocktowers striking slightly out of sync, each with a different tone.',
            decisions: [{ prompt: 'What is the primary sensory modality invoked by the phrase "beating their gongs round the clock" in the poem\'s opening lines?', options: [
                { text: 'The primary sensory modality is auditory (sound)', outcome: 'The primary sensory modality is auditory (sound). The words "beating" and "gongs" directly evoke.' },
                { text: 'visual', outcome: 'Not quite — Students often treat every comparison in the poem as a metaphor, labeling "like a change of wind".', reveals: 'students-often-treat-every-comparison' },
                { text: 'clocktowers', outcome: 'Not quite — Students often treat every comparison in the poem as a metaphor, labeling "like a change of wind".', reveals: 'students-often-treat-every-comparison' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re standing in a busy Indian city square with three clocktowers visible — each showing a different time. You\'d probably feel annoyed or confused.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "each slightly off the others\' time" in the first stanza of the poem?', options: [
                { text: 'The phrase means the clocktowers show different times', outcome: 'The phrase means the clocktowers show different times because of variations in their bronze alloy.' },
                { text: 'they are set to different time zones', outcome: 'Not quite — Students often confuse the *differences* between the clocks (first stanza) as the central irony.', reveals: 'students-often-confuse-the-differences' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the poem and hit the word "alloy" in line 7: "out of the accidents of alloy".',
            decisions: [{ prompt: 'Define "vocabulary in context" as a reading skill for poetry. How does it differ from looking up a word in a dictionary?', options: [
                { text: 'Vocabulary in context is the process of deriving a word\'s specific meaning, connotation,', outcome: 'Vocabulary in context is the process of deriving a word\'s specific meaning, connotation, and.' },
                { text: 'it means guessing the meaning', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from the sentence" and stop at.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Have you ever noticed how a poet\'s choice of a sentence fragment instead of a full sentence can make you feel the brokenness of a destroyed clock tower?',
            decisions: [{ prompt: 'What is the grammatical term for a group of words that lacks a main verb and cannot stand alone as a complete sentence, such as "eyeless.', options: [
                { text: 'The term is **sentence fragment** (or simply **fragment**)', outcome: 'The term is **sentence fragment** (or simply **fragment**). A wrong answer (e.g., "phrase".' },
                { text: 'phrase', outcome: 'Not quite — Students believe "grammar analysis" means only labeling parts of speech (noun, verb, adjective).', reveals: 'grammar-analysis-means-only-labeling' },
                { text: 'clause', outcome: 'Not quite — Students believe "grammar analysis" means only labeling parts of speech (noun, verb, adjective).', reveals: 'grammar-analysis-means-only-labeling' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you’re sitting in the exam hall and the first question asks, “What did you think the poem was about when you read the first few lines?” You might panic.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question when reading a poem?', options: [
                { text: 'A literal question asks for information directly stated in the poem (e.g., “What are the', outcome: 'A literal question asks for information directly stated in the poem (e.g., “What are the clock.' },
                { text: 'Both need you to guess', outcome: 'Not quite — Students often treat inferential questions as “opinion” questions and write personal feelings.', reveals: 'students-often-treat-inferential-questions' },
                { text: 'comprehension is about speculation rather than evidence-based reading', outcome: 'Not quite — Students often treat inferential questions as “opinion” questions and write personal feelings.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A city\'s peace committee proposes demolishing a clock tower scarred by an old riot \'so the cycle of conflict is forgotten\'.',
            decisions: [{ prompt: 'Does erasing the landmark break the cycle?', options: [
                { text: 'No — Ramanujan\'s time-worn city shows violence repeats time and time again when memory is paved over; keep the scar visible and fix the causes, not the evidence.', outcome: 'The poem\'s looped time warns that forgetting is how the cycle reloads; honest memory is the interruption.' },
                { text: 'Yes — remove the symbol and the hostility loses its rallying point.', outcome: 'The poem\'s violence outlives its monuments; symbols don\'t cause the repetition, unaddressed grievances do.', reveals: 'erasure-prevents-repetition' },
                { text: 'It doesn\'t matter — history always repeats, so nothing we do helps.', outcome: 'Ramanujan observes the cycle to indict it; fatalism just agrees to the next round.', reveals: 'fatalism-about-cycles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear civic time as a metaphor for coexistence — and read a broken clock face as a broken social contract.',
            decisions: [{ prompt: 'What comes next? Time and Time Again (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Time and Time Again (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'If stuck, review the "topic vs. theme" exercise in c11_eng_h_cbse_01_007 using the.',
          misconception: 'Students conflate "secondary theme" with "any other idea in the poem" and list topics (e.g., "time," "religion,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying, supporting ideas in a literary work that complement',
                  options: ['Secondary themes are the underlying, supporting ideas in a literary work that complement', '"Before You Read: Context and Background" is a pre-reading strategy that provides', 'Plot and narrative structure in poetry refers to how a poem organizes its sequence of', 'Setting in poetry refers to the time, place, and social environment in'],
                  hint: 'If stuck, review the "topic vs. theme" exercise in c11_eng_h_cbse_01_007 using the "Portrait of.',
                  misconception: 'Students conflate "secondary theme" with "any other idea in the poem" and list topics (e.g., "time," "religion," "violence," "nature").' }
          ],
            remediations: { 'students-conflate-secondary-theme-with': { steps: ['If the student cannot distinguish topics from thematic statements, do this 3-step remediation: (1) Have them list 5.', '(2) For each, ask: "What is the poem *saying* about this topic?', 'Complete the sentence: \'The poem suggests that [topic]...\'" — e.g., "The poem suggests that time is measured.', 'Then re-read the poem, highlighting lines that support each statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "secondary theme" with "any other idea in the poem" and list topics (e.g., "time," "religion,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the poet\'s attitude toward communal disharmony as reflected in the poem.', answer: '"Wistful lament" is most justified',
                  options: ['"Wistful lament" is most justified', 'critical condemnation'],
                  hint: 'If stuck, review the "topic vs. theme" exercise in c11_eng_h_cbse_01_007 using the "Portrait of.',
                  misconception: 'Students conflate "secondary theme" with "any other idea in the poem" and list topics (e.g., "time," "religion," "violence," "nature").' }
          ],
            remediations: { 'students-conflate-secondary-theme-with': { steps: ['If the student cannot distinguish topics from thematic statements, do this 3-step remediation: (1) Have them list 5.', '(2) For each, ask: "What is the poem *saying* about this topic?', 'Complete the sentence: \'The poem suggests that [topic]...\'" — e.g., "The poem suggests that time is measured.', 'Then re-read the poem, highlighting lines that support each statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the definitions of metaphor vs. simile and the five types of imagery (visual.',
          misconception: 'Students often treat every comparison in the poem as a metaphor, labeling "like a change of wind" as a metaphor because.',
          parts: [
                { id: 'a', prompt: 'What is the primary sensory modality invoked by the phrase "beating their gongs round the clock" in the poem\'s opening lines?', answer: 'The primary sensory modality is auditory (sound)',
                  options: ['The primary sensory modality is auditory (sound)', 'visual', 'clocktowers'],
                  hint: 'Review the definitions of metaphor vs. simile and the five types of imagery (visual, auditory.',
                  misconception: 'Students often treat every comparison in the poem as a metaphor, labeling "like a change of wind" as a metaphor because it compares wind.' }
          ],
            remediations: { 'students-often-treat-every-comparison': { steps: ['Re-read the poem aloud, marking every verb that evokes a sense (beat, cut, showing, knocked-out).', 'For each marked verb, name the sense (auditory, visual, tactile).', 'Take the three clearest metaphors (clocktowers = communities, alloy/shaking hand = historical contingency, knocked-out.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_009', difficulty: 'standard',
          question: 'Irony in this poem is the contrast between the expected function of clocktowers.',
          hint: 'If stuck, review "How to annotate a poem for literary devices" from c11_eng_h_cbse_01_008.',
          misconception: 'Students often confuse the *differences* between the clocks (first stanza) as the central irony, and miss the deeper.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "each slightly off the others\' time" in the first stanza of the poem?', answer: 'The phrase means the clocktowers show different times',
                  options: ['The phrase means the clocktowers show different times', 'they are set to different time zones'],
                  hint: 'If stuck, review "How to annotate a poem for literary devices" from c11_eng_h_cbse_01_008 (Imagery.',
                  misconception: 'Students often confuse the *differences* between the clocks (first stanza) as the central irony, and miss the deeper irony: the clocks are.' }
          ],
            remediations: { 'students-often-confuse-the-differences': { steps: ['Re-read stanza 1 and list every stated reason for the clocks\' differences (alloy, hand, distance, donor, religion).', 'Re-read stanza 2 and underline the three causes of the clock\'s destruction (riot, peace-march time bomb, lightning).', 'For each cause, ask: "Is this human or natural?', 'Intentional or accidental?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_010', difficulty: 'standard',
          question: 'Vocabulary in context refers to the skill of determining the meaning.',
          hint: 'If stuck, revisit the imagery node (c12_eng_k_cbse_12_008) and re-read the poem aloud.',
          misconception: 'Students treat "vocabulary in context" as "guess the meaning from the sentence" and stop at a synonym.',
          parts: [
                { id: 'a', prompt: 'In the phrase "perennial feuds and seasonal alliance" (line 9), explain why the poet chooses "perennial" for feuds and "seasonal" for alliance.', answer: '"Perennial" means lasting all year / perpetual',
                  options: ['"Perennial" means lasting all year / perpetual', 'perennial means strong, seasonal means weak'],
                  hint: 'If stuck, revisit the imagery node (c12_eng_k_cbse_12_008) and re-read the poem aloud, physically.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from the sentence" and stop at a synonym.' },
                { id: 'b', prompt: 'Analyze the word "zigzag" in line 12: "a zigzag sky showing / through the knocked-out clockwork".', answer: 'Visually: the sky is seen in jagged fragments through broken clock-face glass',
                  options: ['Visually: the sky is seen in jagged fragments through broken clock-face glass', 'it just means the sky looks crooked'],
                  hint: 'If stuck, revisit the imagery node (c12_eng_k_cbse_12_008) and re-read the poem aloud, physically.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from the sentence" and stop at a synonym.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['If a student cannot move beyond dictionary definitions: 1.', 'Have them re-read c12_eng_k_cbse_12_008 (Imagery and Metaphor) to see how words carry thematic weight.', 'Write it in the center of a page.', 'Draw three branches: Literal Meaning, Contextual Clues (lines 6-8), Thematic Resonance.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_011', difficulty: 'standard',
          question: 'Language usage in a literary text refers to the author\'s deliberate choices.',
          hint: 'Review Class 8–10 grammar: sentence types (`c6_english_u4_038`), phrases/clauses.',
          misconception: 'Students believe "grammar analysis" means only labeling parts of speech (noun, verb, adjective).',
          parts: [
                { id: 'a', prompt: 'What is the grammatical term for a group of words that lacks a main verb and cannot stand alone as a complete sentence, such as "eyeless, silent" in the poem\'s.', answer: 'The term is **sentence fragment** (or simply **fragment**)',
                  options: ['The term is **sentence fragment** (or simply **fragment**)', 'phrase', 'clause', 'run-on sentence'],
                  hint: 'Review Class 8–10 grammar: sentence types (`c6_english_u4_038`), phrases/clauses, non-finite verbs.',
                  misconception: 'Students believe "grammar analysis" means only labeling parts of speech (noun, verb, adjective).' }
          ],
            remediations: { 'grammar-analysis-means-only-labeling': { steps: ['**Revisit basics**: Review Class 8–10 grammar — sentence types (simple/compound/complex), phrases vs.', 'clauses, non-finite verbs (participles, infinitives, gerunds), active/passive voice.', 'Use nodes `c6_english_u4_038` (sentence structure) and `c6_english_u5_048` (voice).', '**Focused re-read**: Read the poem *only* for verbs and sentence boundaries.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'If stuck, review the definition of literal vs. inferential in Class 11 node.',
          misconception: 'Students often treat inferential questions as “opinion” questions and write personal feelings without textual evidence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require retrieving explicitly stated information from the',
                  options: ['Literal comprehension questions require retrieving explicitly stated information from the', '"Before You Read: Context and Background" is a pre-reading strategy that provides', 'Plot and narrative structure in poetry refers to how a poem organizes its sequence of', 'Setting in poetry refers to the time, place, and social environment in'],
                  hint: 'If stuck, review the definition of literal vs. inferential in Class 11 node c11_eng_h_cbse_01_012.',
                  misconception: 'Students often treat inferential questions as “opinion” questions and write personal feelings without textual evidence.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student cannot distinguish literal from inferential, have them re-read the poem and highlight every fact.', 'Then ask: “Which questions can be answered only with these highlighted phrases?” Next, give them two questions – one.', 'If they still struggle, revisit Class 11 comprehension nodes (c11_eng_h_cbse_01_012) for guided practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
