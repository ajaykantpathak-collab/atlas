import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch09_p1: SimDef = {
    id: 'v3_c12_eng_f_ch09_p1',
    title: 'My Mother at Sixty-six (Poem) · Part 1/3',
    subtitle: 'A mother dozes, the trees sprint — and the daughter looks away',
    classLevel: 12, subject: 'eng_f', topic: 'My Mother at Sixty-six (Poem) · Part 1/3',
    chapters: ['c12_eng_f_ch09'],
    nodeIds: ['c12_eng_f_cbse_09_001', 'c12_eng_f_cbse_09_002', 'c12_eng_f_cbse_09_003', 'c12_eng_f_cbse_09_004', 'c12_eng_f_cbse_09_005', 'c12_eng_f_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poetry reader', intro: 'One airport drive holds every goodbye you\'ve ever feared. Kamala Das wrote it down so we could recognise it.', goal: 'Read My Mother at Sixty-six as confessional poetry where suppressed fear of loss erupts through imagery and irony.' },
    discovery: {
        question: 'Outside the car window: sprinting trees, spilling children. Beside the poet: a mother \'ashen like a corpse.\' Why does Kamala Das put motion next to stillness?',
        options: ['Life racing past a parent drifting toward death — the world\'s vitality throws her mother\'s fading into unbearable relief', 'Just scenery — poems need images', 'The children are her siblings', 'Traffic was simply heavy that day'],
        answer: 'Life racing past a parent drifting toward death — the world\'s vitality throws her mother\'s fading into unbearable relief',
        hook: 'The poem\'s engine isn\'t the airport drive — it\'s the thought she \'put away.\' Confessional poetry runs on suppression and eruption: the old familiar ache, the smile that says \'see you soon\' while fearing otherwise. Kerala\'s matrilineal bond is the cultural weight under every line.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'My Mother at Sixty-six\' (Flamingo, ch. 9) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Ride that Friday-morning drive inside the poem: track the ashen face, the sprinting trees, the put-away thought, and the final smiling goodbye that costs the daughter everything.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'My Mother at Sixty-six\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is Kamala Das, and why is her bilingual identity (writing as Madhavikutty in Malayalam and Kamala Das in English) significant for.', options: [
                { text: 'Kamala Das (1934–2009) was a pioneering Indian confessional poet from Malabar, Kerala,', outcome: 'Kamala Das (1934–2009) was a pioneering Indian confessional poet from Malabar, Kerala, who wrote.' },
                { text: 'she just translated her work', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia rather than the **examiner\'s thesis.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'My Mother at Sixty-six\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the grammatical structure of the entire poem "My Mother at Sixty-six" and how does it relate to the narrative flow?', options: [
                { text: 'The poem is written as a single sentence punctuated only by commas', outcome: 'The poem is written as a single sentence punctuated only by commas.' },
                { text: 'it has multiple stanzas', outcome: 'Not quite — Students often treat the poem as having a conventional stanza structure or multiple sentences.', reveals: 'students-often-treat-the-poem' },
                { text: 'it uses full stops', outcome: 'Not quite — Students often treat the poem as having a conventional stanza structure or multiple sentences.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'My Mother at Sixty-six\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "My Mother at Sixty-six"?', options: [
                { text: 'The primary physical setting is a car journey from the poet\'s parental home to Cochin', outcome: 'The primary physical setting is a car journey from the poet\'s parental home to Cochin airport on.' },
                { text: 'the airport', outcome: 'Not quite — Students often treat "setting" as merely the geographical location (Cochin, Kerala) and.', reveals: 'students-often-treat-setting-as' },
                { text: 'the home', outcome: 'Not quite — Students often treat "setting" as merely the geographical location (Cochin, Kerala) and.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'My Mother at Sixty-six\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist of "My Mother at Sixty-six," and what is their narrative perspective?', options: [
                { text: 'The protagonist is the first-person narrator, the poet Kamala Das herself, speaking as an', outcome: 'The protagonist is the first-person narrator, the poet Kamala Das herself, speaking as an adult.' },
                { text: 'The protagonist is the mother who is old and pale', outcome: 'Not quite — Students often treat the mother as the protagonist because the title centres her.', reveals: 'students-often-treat-the-mother' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'My Mother at Sixty-six\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Identify the two supporting images/figures that appear in the poem besides the mother and the narrator.', options: [
                { text: 'The two supporting images are the "Young Trees sprinting" and the "merry children', outcome: 'The two supporting images are the "Young Trees sprinting" and the "merry children spilling out.' },
                { text: 'Young Trees sprinting', outcome: 'Not quite — Students often treat the "young trees" and "merry children" as mere background description.', reveals: 'students-often-treat-the-young' },
                { text: 'merry children spilling out of their homes', outcome: 'Not quite — Students often treat the "young trees" and "merry children" as mere background description.', reveals: 'students-often-treat-the-young' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'My Mother at Sixty-six\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the primary theme of "My Mother at Sixty-six" in one sentence using the formula: "The poem explores [universal human experience].', options: [
                { text: 'Correct: The poem explores the universal pain of witnessing a parent\'s aging and the', outcome: 'Correct: The poem explores the universal pain of witnessing a parent\'s aging and the inevitable.' },
                { text: 'mother-daughter love', outcome: 'Not quite — Students often think the theme is simply "old age is sad" or "we should love our parents." The poem.', reveals: 'the-theme-is-simply-old' },
                { text: 'old age is sad', outcome: 'Not quite — Students often think the theme is simply "old age is sad" or "we should love our parents." The poem.', reveals: 'the-theme-is-simply-old' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Driving to the airport for your first hostel term, you notice how old your mother suddenly looks, and a childhood fear of losing her rises in your throat.',
            decisions: [{ prompt: 'What does Kamala Das\'s poem counsel?', options: [
                { text: 'Acknowledge the ache but answer with love and forward motion — the poem ends \'see you soon, Amma\': stay deliberately connected, keep living, don\'t pretend you felt nothing.', outcome: 'The poet puts the thought away only to return to it honestly; love expressed beats fear suppressed.' },
                { text: 'Suppress it — busy yourself with the new term and never look back.', outcome: 'The \'old familiar ache\' returns precisely because it was suppressed; denial postpones the feeling, it doesn\'t resolve it.', reveals: 'suppressing-grief' },
                { text: 'Cancel the plan — staying home forever is the only way to never lose her.', outcome: 'The poem accepts separation as part of life; surrendering your own future is guilt, not love.', reveals: 'guilt-cancels-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a twelve-line drive as a lifetime of love and dread — and see how poets say the unsayable by looking out the window.',
            decisions: [{ prompt: 'What comes next? My Mother at Sixty-six (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — My Mother at Sixty-six (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_001', difficulty: 'standard',
          question: '\'My Mother at Sixty-six\' (Flamingo, ch. 9) — the context and background to this.',
          hint: 'If stuck, revisit c11_eng_h_cbse_08_001 (Before You Read for "The Voice of the Rain") and.',
          misconception: 'Students treat "Before You Read" as optional background trivia rather than the **examiner\'s thesis statement** for the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'My Mother at Sixty-six\' (Flamingo, ch',
                  options: ['\'My Mother at Sixty-six\' (Flamingo, ch', 'The plot/narrative arc of \'My Mother at Sixty-six\'', 'The setting of \'My Mother at Sixty-six\'', 'Character analysis in \'My Mother at Sixty-six\''],
                  hint: 'If stuck, revisit c11_eng_h_cbse_08_001 (Before You Read for "The Voice of the Rain") and re-do its.',
                  misconception: 'Students treat "Before You Read" as optional background trivia rather than the **examiner\'s thesis statement** for the poem.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student cannot articulate the link between the "Before you read" question and the poem\'s central ache after this.', '(3) Assign a micro-task: Find one line in the poem (later nodes) that directly answers the "expectation" question.', 'Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'My Mother at Sixty-six\' — what happens, in what.',
          hint: 'Review narrative poetry features from c11_eng_h_cbse_01_002 and c6_english_u1_006.',
          misconception: 'Students often treat the poem as having a conventional stanza structure or multiple sentences because they\'re used.',
          parts: [
                { id: 'a', prompt: 'What is the grammatical structure of the entire poem "My Mother at Sixty-six" and how does it relate to the narrative flow?', answer: 'The poem is written as a single sentence punctuated only by commas',
                  options: ['The poem is written as a single sentence punctuated only by commas', 'it has multiple stanzas', 'it uses full stops', 'the poet\'s childhood'],
                  hint: 'Review narrative poetry features from c11_eng_h_cbse_01_002 and c6_english_u1_006, focusing on how.',
                  misconception: 'Students often treat the poem as having a conventional stanza structure or multiple sentences because they\'re used to analyzing poems with.' },
                { id: 'b', prompt: 'Apply the concept of "narrative time" to this poem: identify the three distinct time markers in the poem and explain how they compress a longer emotional.', answer: 'Step 1: Identify explicit time markers',
                  options: ['Step 1: Identify explicit time markers', 'the poet\'s childhood'],
                  hint: 'Review narrative poetry features from c11_eng_h_cbse_01_002 and c6_english_u1_006, focusing on how.',
                  misconception: 'Students often treat the poem as having a conventional stanza structure or multiple sentences because they\'re used to analyzing poems with.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['If a student cannot identify the single-sentence structure: (1) Have them read the poem aloud without pausing at line.', '(2) Ask them to count the full stops — they\'ll find zero.', '(3) Give them a rewritten version with artificial sentence breaks and ask how the reading experience changes.', '(4) Connect to prior knowledge: revisit c11_eng_h_cbse_01_002 (narrative poetry structure) and c6_english_u1_006.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the poem as having a conventional stanza structure or multiple sentences because they\'re used.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the single-sentence structure for this poem\'s narrative purpose. Could the same story be told in multiple sentences?', answer: 'The single-sentence structure is highly effective because: (1) It mimics the',
                  options: ['The single-sentence structure is highly effective because: (1) It mimics the', 'the poet\'s childhood'],
                  hint: 'Review narrative poetry features from c11_eng_h_cbse_01_002 and c6_english_u1_006, focusing on how.',
                  misconception: 'Students often treat the poem as having a conventional stanza structure or multiple sentences because they\'re used to analyzing poems with.' },
                { id: 'b', prompt: 'Create a brief narrative poem (4-6 lines) about a personal farewell that uses a single-sentence structure with commas to convey continuous thought.', answer: 'A strong answer will: (1) Use only commas, no full stops',
                  options: ['A strong answer will: (1) Use only commas, no full stops', 'the poet\'s childhood'],
                  hint: 'Review narrative poetry features from c11_eng_h_cbse_01_002 and c6_english_u1_006, focusing on how.',
                  misconception: 'Students often treat the poem as having a conventional stanza structure or multiple sentences because they\'re used to analyzing poems with.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['If a student cannot identify the single-sentence structure: (1) Have them read the poem aloud without pausing at line.', '(2) Ask them to count the full stops — they\'ll find zero.', '(3) Give them a rewritten version with artificial sentence breaks and ask how the reading experience changes.', '(4) Connect to prior knowledge: revisit c11_eng_h_cbse_01_002 (narrative poetry structure) and c6_english_u1_006.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_003', difficulty: 'standard',
          question: 'The setting of \'My Mother at Sixty-six\' — the place, time and atmosphere the.',
          hint: 'If stuck, review the Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) for the.',
          misconception: 'Students often treat "setting" as merely the geographical location (Cochin, Kerala) and "atmosphere" as a synonym for.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why the poet describes the trees as "sprinting" and the children as "spilling out of their homes."', answer: 'The words "sprinting" and "spilling" convey speed, energy, and abundant life',
                  options: ['The words "sprinting" and "spilling" convey speed, energy, and abundant life', 'trees running fast', 'only defines the words literally (e'],
                  hint: 'If stuck, review the Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) for the.',
                  misconception: 'Students often treat "setting" as merely the geographical location (Cochin, Kerala) and "atmosphere" as a synonym for "theme" (aging.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Re-read the poem *only* for sensory words (sight, sound, touch) — underline them in two colours: inside-car vs.', 'Make a two-column table: Column A = details inside the car (mother\'s face, speaker\'s thoughts); Column B = details.', 'For each pair, ask: "What feeling does this contrast create?" 4.', 'Write one paragraph using the structure: "The poet creates a ______ atmosphere by contrasting ______ (inside detail).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis in \'My Mother at Sixty-six\' — the central figure(s), their.',
          hint: 'Review "focalizer vs focal character" distinction in c11_eng_h_cbse_01_004.',
          misconception: 'Students often treat the mother as the protagonist because the title centres her.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'My Mother at Sixty-six\'',
                  options: ['Character analysis in \'My Mother at Sixty-six\'', '\'My Mother at Sixty-six\' (Flamingo, ch', 'The plot/narrative arc of \'My Mother at Sixty-six\'', 'The setting of \'My Mother at Sixty-six\''],
                  hint: 'Review "focalizer vs focal character" distinction in c11_eng_h_cbse_01_004.',
                  misconception: 'Students often treat the mother as the protagonist because the title centres her.' }
          ],
            remediations: { 'students-often-treat-the-mother': { steps: ['Re-read the poem circling every first-person pronoun/verb ("I saw," "I realised," "I looked," "I felt," "I said," "I.', 'List two columns: INTERNAL (pain, fear, ache) vs EXTERNAL (looking away, smiling, speaking cheerfully).', 'Ask: "Who is doing the suppressing?" — the answer is the protagonist.', 'Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_005', difficulty: 'standard',
          question: 'Supporting characters in \'My Mother at Sixty-six\' — the secondary figures who.',
          hint: 'Review the definition of foil and practice identifying personification in node.',
          misconception: 'Students often treat the "young trees" and "merry children" as mere background description or mood-setters, writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'My Mother at Sixty-six\'',
                  options: ['Supporting characters in \'My Mother at Sixty-six\'', '\'My Mother at Sixty-six\' (Flamingo, ch', 'The plot/narrative arc of \'My Mother at Sixty-six\'', 'The setting of \'My Mother at Sixty-six\''],
                  hint: 'Review the definition of foil and practice identifying personification in node.',
                  misconception: 'Students often treat the "young trees" and "merry children" as mere background description or mood-setters, writing answers like "the poet.' }
          ],
            remediations: { 'students-often-treat-the-young': { steps: ['Re-read the poem aloud, pausing at each comma.', 'Mark every verb attached to a non-human/non-narrator subject.', 'Create a two-column table: Column A = verb + subject for supporting images; Column B = verb/adjective + subject for.', 'For each row, write one sentence explaining the contrast.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme of \'My Mother at Sixty-six\' — the central idea the whole text.',
          hint: 'If stuck, revisit c12_eng_f_cbse_09_004 (Protagonist Analysis) and list the daughter\'s.',
          misconception: 'Students often think the theme is simply "old age is sad" or "we should love our parents." The poem is not *about*.',
          parts: [
                { id: 'a', prompt: 'Analyze the shift from "ashen like that of a corpse" (first glance) to "wan, pale as a late winter\'s moon" (second glance).', answer: 'Correct: The first simile ("corpse") is raw, clinical, terrifying',
                  options: ['Correct: The first simile ("corpse") is raw, clinical, terrifying', 'sad descriptions', 'old age is sad', 'we should love our parents'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_09_004 (Protagonist Analysis) and list the daughter\'s *internal.',
                  misconception: 'Students often think the theme is simply "old age is sad" or "we should love our parents." The poem is not *about* aging; it is about the.' }
          ],
            remediations: { 'the-theme-is-simply-old': { steps: ['If a student cannot distinguish the primary theme from a plot summary: 1) Have them reread the poem and highlight every.', '2) Ask: "Which of these actions is the *most important* for understanding the poem\'s message?" 3) Guide them to see.', '4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
