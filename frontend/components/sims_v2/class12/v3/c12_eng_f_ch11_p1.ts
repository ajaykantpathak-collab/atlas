import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch11_p1: SimDef = {
    id: 'v3_c12_eng_f_ch11_p1',
    title: 'Keeping Quiet (Poem) · Part 1/3',
    subtitle: 'Count to twelve — the radical politics of doing nothing',
    classLevel: 12, subject: 'eng_f', topic: 'Keeping Quiet (Poem) · Part 1/3',
    chapters: ['c12_eng_f_ch11'],
    nodeIds: ['c12_eng_f_cbse_11_001', 'c12_eng_f_cbse_11_002', 'c12_eng_f_cbse_11_003', 'c12_eng_f_cbse_11_004', 'c12_eng_f_cbse_11_005', 'c12_eng_f_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry analyst', intro: 'One poet asked humanity to stop — no engines, no words, no wars — just long enough to finally meet ourselves.', goal: 'Trace the stanza-wise argument of Keeping Quiet and explain why its stillness is life-affirming, not passive.' },
    discovery: {
        question: 'Neruda asks the whole world to count to twelve and keep still — then insists this is \'not total inactivity.\' Why the urgent clarification?',
        options: ['Without it the call for stillness reads as passivity or death; he means a life-affirming pause — \'Life is what it is about\' — not surrender', 'He was afraid people would nap', 'Stillness and inactivity are the same thing', 'Poets just contradict themselves'],
        answer: 'Without it the call for stillness reads as passivity or death; he means a life-affirming pause — \'Life is what it is about\' — not surrender',
        hook: 'The poem is an argument, not a mood: proposal → consequence → evidence → clarification. Fishermen harming themselves, \'wars with gas, wars with fire,\' a \'victory with no survivors\' — the images are evidence that activity without introspection is the real danger.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Keeping Quiet\' (Flamingo, ch. 11) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold the world\'s pause button: follow the five-stanza argument from \'count to twelve\' through the fishermen, the salt-gatherer and the war-makers to the Earth that teaches by seeming dead yet living.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Keeping Quiet\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who was John Keats, and what are two key facts about his life that are essential for understanding his poetry?', options: [
                { text: 'John Keats (1795–1821) was a British Romantic poet who died of tuberculosis at 25', outcome: 'John Keats (1795–1821) was a British Romantic poet who died of tuberculosis at 25.' },
                { text: 'He was a Victorian novelist', outcome: 'Not quite — Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.', reveals: 'context-means-memorizing-keats-s' },
                { text: 'context', outcome: 'Not quite — Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.', reveals: 'context-means-memorizing-keats-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Keeping Quiet\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary structural feature that divides "Keeping Quiet" into distinct sections, and how many such sections are there?', options: [
                { text: 'The poem is divided into five stanzas of varying lengths', outcome: 'The poem is divided into five stanzas of varying lengths. A wrong answer (e.g., "four stanzas".' },
                { text: 'four stanzas', outcome: 'Not quite — Students believe "plot" and "narrative structure" only apply to stories with characters and events.', reveals: 'plot-and-narrative-structure-only' },
                { text: 'it has no stanzas, it\'s free verse so structure doesn\'t matter', outcome: 'Not quite — Students believe "plot" and "narrative structure" only apply to stories with characters and events.', reveals: 'plot-and-narrative-structure-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Keeping Quiet\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary setting of "Keeping Quiet" — a specific geographical location, a historical period, or a universal moment of pause?', options: [
                { text: 'The primary setting is a **universal, timeless moment of collective pause** imagined by', outcome: 'The primary setting is a **universal, timeless moment of collective pause** imagined by the poet.' },
                { text: 'the 20th century', outcome: 'Not quite — **Misconception:** "Setting in a poem always means a physical place like a forest, village,.', reveals: 'misconception-setting-in-a-poem' },
                { text: 'explain the setting', outcome: 'Not quite — **Misconception:** "Setting in a poem always means a physical place like a forest, village,.', reveals: 'misconception-setting-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Keeping Quiet\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist in "Keeping Quiet," and what is his primary role in the poem?', options: [
                { text: 'The protagonist is the poetic speaker (Neruda\'s persona) who acts as a guide urging', outcome: 'The protagonist is the poetic speaker (Neruda\'s persona) who acts as a guide urging humanity toward.' },
                { text: 'there is no protagonist in a poem', outcome: 'Not quite — Students treat the protagonist as "just the poet talking" and miss that Neruda constructs.', reveals: 'students-treat-the-protagonist-as' },
                { text: 'the protagonist is the earth', outcome: 'Not quite — Students treat the protagonist as "just the poet talking" and miss that Neruda constructs.', reveals: 'students-treat-the-protagonist-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Keeping Quiet\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the five distinct groups or entities explicitly named or clearly implied in the poem "Keeping Quiet" that function as supporting.', options: [
                { text: 'The five groups are: (1) the collective "we"/humanity, (2) fishermen in the cold sea, (3)', outcome: 'The five groups are: (1) the collective "we"/humanity, (2) fishermen in the cold sea, (3) the man.' },
                { text: 'the Earth', outcome: 'Not quite — Students treat the poem\'s groups as literal character sketches (e.g., writing a biography of the.', reveals: 'students-treat-the-poem-s' },
                { text: 'fishermen', outcome: 'Not quite — Students treat the poem\'s groups as literal character sketches (e.g., writing a biography of the.', reveals: 'students-treat-the-poem-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Keeping Quiet\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "Keeping Quiet" in one complete thematic sentence (not a phrase like "silence" or "peace").', options: [
                { text: 'Correct answer: "The poem asserts that a deliberate, collective pause from speech and', outcome: 'Correct answer: "The poem asserts that a deliberate, collective pause from speech and action allows.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students consistently confuse the poem\'s *advocacy for a moment of silence* with *advocacy for.', reveals: 'students-consistently-confuse-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A project team fractures in constant quarrels; deadlines force more meetings, more noise. Someone suggests the group stop and sit in silence together once a day.',
            decisions: [{ prompt: 'Is \'keeping quiet\' a real intervention?', options: [
                { text: 'Yes — Neruda\'s stillness is deliberate introspection, \'not total inactivity\': pausing the machinery of conflict lets the team interrupt its own momentum and see itself.', outcome: 'The poem\'s count to twelve is an active interruption of harmful motion — stillness as insight, not idleness.' },
                { text: 'No — silence means doing nothing, and doing nothing ships no work.', outcome: 'Neruda explicitly rules that out; the pause is productive self-examination, not a strike.', reveals: 'stillness-is-inactivity' },
                { text: 'No — the fix is staying even busier so there\'s no time to fight.', outcome: 'Busyness is the engine of the quarrel; the poem\'s point is that ceaseless motion is what hides us from ourselves.', reveals: 'busyness-as-solution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend stillness as an act of understanding, not idleness — and trace how a poem builds an argument through images instead of reasons.',
            decisions: [{ prompt: 'What comes next? Keeping Quiet (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Keeping Quiet (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_001', difficulty: 'standard',
          question: '\'Keeping Quiet\' (Flamingo, ch. 11) — the context and background to this text.',
          hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Woven Words Chapter 1 Before You Read) and re-do.',
          misconception: 'Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Keeping Quiet\' (Flamingo, ch',
                  options: ['\'Keeping Quiet\' (Flamingo, ch', 'The plot/narrative arc of \'Keeping Quiet\'', 'The setting of \'Keeping Quiet\'', 'Character analysis in \'Keeping Quiet\''],
                  hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Woven Words Chapter 1 Before You Read) and re-do its.',
                  misconception: 'Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.' }
          ],
            remediations: { 'context-means-memorizing-keats-s': { steps: ['If a student treats context as trivia: (1) Have them re-read the "Before You Read" questions and write answers *before*.', '(2) Give them three Keats facts (surgeon, brother\'s death, died at 25) and ask: "Which line in the poem does each fact.', '(3) Show a 2-mark board answer that cites biography without textual link (0 marks) vs.', 'one that says "Keats\'s medical training appears in \'clear rills / That for themselves a cooling covert make\' — precise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student statement: "Keats says beauty makes us happy, so the poem is just about enjoying pretty things." Is this a fair reading?', answer: 'No, it\'s a severe misreading',
                  options: ['No, it\'s a severe misreading', 'context'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Woven Words Chapter 1 Before You Read) and re-do its.',
                  misconception: 'Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.' },
                { id: 'b', prompt: 'Create a 4-line poem opening (any form) that imitates Keats\'s technique: start with a universal claim about beauty, then name two specific natural images that.', answer: 'A thing of beauty steadies the trembling heart',
                  options: ['A thing of beauty steadies the trembling heart', 'context'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_01_001 (Woven Words Chapter 1 Before You Read) and re-do its.',
                  misconception: 'Students think "context" means memorizing Keats\'s birth/death dates and the Endymion plot summary.' }
          ],
            remediations: { 'context-means-memorizing-keats-s': { steps: ['If a student treats context as trivia: (1) Have them re-read the "Before You Read" questions and write answers *before*.', '(2) Give them three Keats facts (surgeon, brother\'s death, died at 25) and ask: "Which line in the poem does each fact.', '(3) Show a 2-mark board answer that cites biography without textual link (0 marks) vs.', 'one that says "Keats\'s medical training appears in \'clear rills / That for themselves a cooling covert make\' — precise.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Keeping Quiet\' — what happens, in what order, and.',
          hint: 'If stuck, revisit "stanza mapping" using a simpler poem (e.g., Frost\'s "Stopping.',
          misconception: 'Students believe "plot" and "narrative structure" only apply to stories with characters and events, so they say a lyric.',
          parts: [
                { id: 'a', prompt: 'What is the primary structural feature that divides "Keeping Quiet" into distinct sections, and how many such sections are there?', answer: 'The poem is divided into five stanzas of varying lengths',
                  options: ['The poem is divided into five stanzas of varying lengths', 'four stanzas', 'it has no stanzas, it\'s free verse so structure doesn\'t matter', 'narrative structure'],
                  hint: 'If stuck, revisit "stanza mapping" using a simpler poem (e.g., Frost\'s "Stopping by Woods").',
                  misconception: 'Students believe "plot" and "narrative structure" only apply to stories with characters and events, so they say a lyric poem like "Keeping.' }
          ],
            remediations: { 'plot-and-narrative-structure-only': { steps: ['Have the student physically mark the poem: number stanzas, draw arrows where focus shifts (self → group → nature → war.', 'Ask them to summarize each stanza in one phrase (e.g., "Call to silence", "Description of the moment", "Critique.', 'Compare this to a 5-paragraph essay structure — intro, body 1, body 2, body 3, conclusion.', 'Re-read the poem aloud, pausing deliberately at each stanza break, to hear the structural rhythm.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_003', difficulty: 'standard',
          question: 'The setting of \'Keeping Quiet\' — the place, time and atmosphere the text.',
          hint: 'If stuck, review "how imagery creates mood" in Class 11 poem nodes.',
          misconception: '**Misconception:** "Setting in a poem always means a physical place like a forest, village, or room." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the atmosphere in the first two stanzas differs from the atmosphere in stanzas three and four.', answer: 'The first two stanzas create an atmosphere of **gentle invitation**',
                  options: ['The first two stanzas create an atmosphere of **gentle invitation**', 'both are peaceful'],
                  hint: 'If stuck, review "how imagery creates mood" in Class 11 poem nodes (c11_eng_h_cbse_03_008) and.',
                  misconception: '**Misconception:** "Setting in a poem always means a physical place like a forest, village, or room." **Why it\'s wrong:** In "Keeping.' },
                { id: 'b', prompt: 'In the line "Perhaps the earth can teach us / as when everything seems dead / and later proves to be alive," what atmospheric change does the poet suggest, and.', answer: 'Step 1: Identify the atmospheric change',
                  options: ['Step 1: Identify the atmospheric change', 'it means nature cycles'],
                  hint: 'If stuck, review "how imagery creates mood" in Class 11 poem nodes (c11_eng_h_cbse_03_008) and.',
                  misconception: '**Misconception:** "Setting in a poem always means a physical place like a forest, village, or room." **Why it\'s wrong:** In "Keeping.' },
                { id: 'c', prompt: 'Compare the atmosphere created by the imagery of "fishermen in the cold sea" (stanza 3) and "those who prepare green wars / wars with gas, wars with fire".', answer: 'The fishermen image evokes a **quiet, cold, elemental atmosphere**',
                  options: ['The fishermen image evokes a **quiet, cold, elemental atmosphere**', 'sad images'],
                  hint: 'If stuck, review "how imagery creates mood" in Class 11 poem nodes (c11_eng_h_cbse_03_008) and.',
                  misconception: '**Misconception:** "Setting in a poem always means a physical place like a forest, village, or room." **Why it\'s wrong:** In "Keeping.' }
          ],
            remediations: { 'misconception-setting-in-a-poem': { steps: ['If a student cannot distinguish physical vs.', '**Revisit Class 7 node c7_engl_ch04_005** (Atmosphere: Heat, Silence and Anticipation in the Jungle) — note how "The.', '**Revisit Class 8 node c8_engl_ch4_1** (Setting: Mussoorie in the Himalayan Foothills) — identify concrete sensory.', '**Do a 5-minute exercise:** Read stanza 1 of "Keeping Quiet" aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_004', difficulty: 'standard',
          question: 'Character analysis in \'Keeping Quiet\' — the central figure(s), their traits.',
          hint: 'If stuck on "who is speaking?", revisit c11_eng_w_cbse_01_004 (Class 11 poetic persona).',
          misconception: 'Students treat the protagonist as "just the poet talking" and miss that Neruda constructs a deliberate persona who.',
          parts: [
                { id: 'a', prompt: 'Analyze the shift in the protagonist\'s tone between stanza 1 ("Now we will count to twelve") and stanza 4 ("Perhaps the earth can teach us").', answer: 'Stanza 1: imperative, urgent, almost military ("count to twelve," "keep still")',
                  options: ['Stanza 1: imperative, urgent, almost military ("count to twelve," "keep still")', 'peaceful'],
                  hint: 'If stuck on "who is speaking?", revisit c11_eng_w_cbse_01_004 (Class 11 poetic persona) and.',
                  misconception: 'Students treat the protagonist as "just the poet talking" and miss that Neruda constructs a deliberate persona who PERFORMS the poem\'s.' }
          ],
            remediations: { 'students-treat-the-protagonist-as': { steps: ['Re-read the poem marking ONLY the protagonist\'s verbs (imperatives, conditionals, modals).', 'Create a two-column table: Left = Protagonist\'s Action/Stance, Right = Line Reference.', 'Revisit c12_eng_f_cbse_11_002 (Plot and Narrative Structure) to map the protagonist\'s voice onto the poem\'s five-stanza.', 'Practice: Rewrite one stanza from the protagonist\'s perspective as a diary entry — this forces you to inhabit the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_005', difficulty: 'standard',
          question: 'Supporting characters in \'Keeping Quiet\' — the secondary figures who move the.',
          hint: 'Review "symbolic vs. literal character" in c11_eng_h_cbse_11_005 and the speaker analysis.',
          misconception: 'Students treat the poem\'s groups as literal character sketches (e.g., writing a biography of the salt gatherer) rather.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "symbolic function" to the warmongers ("those who prepare green wars / wars with gas, wars with fire").', answer: 'They serve as the antithesis of the poem\'s prescription: they embody *organized,',
                  options: ['They serve as the antithesis of the poem\'s prescription: they embody *organized,', 'victory with no survivors', 'bad people', 'put on clean clothes / walk about with their brothers'],
                  hint: 'Review "symbolic vs. literal character" in c11_eng_h_cbse_11_005 and the speaker analysis.',
                  misconception: 'Students treat the poem\'s groups as literal character sketches (e.g., writing a biography of the salt gatherer) rather than symbolic cogs.' },
                { id: 'b', prompt: 'Analyze how the Earth functions as a supporting character. Compare its portrayal in the first mention ("the Earth can teach us") with the final lines ("when.', answer: 'Initially, Earth is a *teacher* offering a lesson in cyclical renewal',
                  options: ['Initially, Earth is a *teacher* offering a lesson in cyclical renewal', 'nature imagery'],
                  hint: 'Review "symbolic vs. literal character" in c11_eng_h_cbse_11_005 and the speaker analysis.',
                  misconception: 'Students treat the poem\'s groups as literal character sketches (e.g., writing a biography of the salt gatherer) rather than symbolic cogs.' }
          ],
            remediations: { 'students-treat-the-poem-s': { steps: ['Have the student re-read node 004 (Protagonist) to see how the *speaker* is also a construct, not a biography.', 'Assign: "Rewrite the salt gatherer\'s \'appearance\' in three lines — then delete all proper nouns.', 'Use c11_eng_h_cbse_11_005 (Class 11 Supporting Characters) to review how collective figures function in "The Voice.', 'Re-diagnose with DIAGNOSTIC_QUESTION_2: if they still merge salt gatherer and fishermen, they haven\'t grasped symbolic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of \'Keeping Quiet\' — the central idea the whole text returns.',
          hint: 'If the student writes "The theme is silence" or "The theme is peace," they are stuck.',
          misconception: 'Students consistently confuse the poem\'s *advocacy for a moment of silence* with *advocacy for passivity or inaction*.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet asks us to "count to twelve" and "keep still" rather than simply saying "be silent." What does the specific number and.', answer: 'Correct answer: "Counting to twelve creates a ritualistic, measurable pause',
                  options: ['Correct answer: "Counting to twelve creates a ritualistic, measurable pause', 'A wrong answer like', 'It\'s easier to count than to be silent'],
                  hint: 'If the student writes "The theme is silence" or "The theme is peace," they are stuck.',
                  misconception: 'Students consistently confuse the poem\'s *advocacy for a moment of silence* with *advocacy for passivity or inaction*.' }
          ],
            remediations: { 'students-consistently-confuse-the-poem': { steps: ['If a student cannot distinguish topic from theme, or reads the silence as permanent passivity: (1) Have them re-read.', '(2) Ask: "What happens *after* the silence?', 'Does the poem end in stillness?" (3) Assign a 3-sentence writing task: "Complete this: The silence in the poem is not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
