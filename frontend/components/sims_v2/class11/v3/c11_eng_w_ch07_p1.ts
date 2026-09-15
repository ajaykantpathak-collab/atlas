import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch07_p1: SimDef = {
    id: 'v3_c11_eng_w_ch07_p1',
    title: 'Glory at Twilight (Short Story) · Part 1/3',
    subtitle: 'Watch a fallen banker\'s borrowed glory spend itself to the last rupee.',
    classLevel: 11, subject: 'eng_w', topic: 'Glory at Twilight (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch07'],
    nodeIds: ['c11_eng_w_cbse_07_001', 'c11_eng_w_cbse_07_002', 'c11_eng_w_cbse_07_003', 'c11_eng_w_cbse_07_004', 'c11_eng_w_cbse_07_005', 'c11_eng_w_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a reputation burn like a twilight sky', intro: 'A narrow-gauge train making unauthorised stops, a collapsed bank, and a village still expecting benediction in cash.', goal: 'Distinguish frame from flashback and locate the narrative climax of a non-linear story.' },
    discovery: {
        question: 'Satyajit\'s bank has already collapsed when the story opens on a slow train — so where can the climax possibly be?',
        options: ['At the wedding — when he signs away his house and pond for a stranger\'s dowry, the last of the glory spent', 'In the bank collapse itself, told in flashback', 'On the train, when he asks \'What now?\'', 'At the fig tree, where he finally rests'],
        answer: 'At the wedding — when he signs away his house and pond for a stranger\'s dowry, the last of the glory spent',
        hook: 'Chronological climax and narrative climax are different events — the story peaks where the pretending becomes impossible to afford.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Before You Read: Context and Background is a pre-reading strategy that provides the historical, social, cultural, and authorial framework necessary to interpret a literary text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the train frame from the flashbacks, order the narrative versus chronological events, and place the deed-signing as the true climax.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a movie that opens with a man on a train asking "What now?" then jumps to his past glory, then returns to the train—why does the.',
            decisions: [{ prompt: 'Define "circular narrative structure" and identify the opening and closing lines in "Glory at Twilight" that create this circle.', options: [
                { text: 'A circular narrative ends where it begins, often with a repeated motif or question', outcome: 'A circular narrative ends where it begins, often with a repeated motif or question.' },
                { text: 'the story goes in a circle', outcome: 'Not quite — Students treat "flashback" and "frame narrative" as interchangeable labels, writing "the story uses.', reveals: 'students-treat-flashback-and-frame' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are Satyajit on that slow train, watching green fields pass by while your world has collapsed.',
            decisions: [{ prompt: 'What are the three main physical settings in "Glory at Twilight" and the time frame of the story?', options: [
                { text: 'The three main physical settings are the narrow-gauge train, Shantipur village (station,', outcome: 'The three main physical settings are the narrow-gauge train, Shantipur village (station, Uncle.' },
                { text: 'where and when', outcome: 'Not quite — Students often think setting is just "where and when" and atmosphere is just "mood." They miss that.', reveals: 'setting-is-just-where-and' },
                { text: 'only the village or missing the train', outcome: 'Not quite — Students often think setting is just "where and when" and atmosphere is just "mood." They miss that.', reveals: 'setting-is-just-where-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet a former CEO at a family wedding who acts wealthy but you discover he\'s secretly bankrupt and about to lose his childhood home.',
            decisions: [{ prompt: 'What is Satyajit\'s former professional position and the specific event that triggered his rise from clerk to Managing Director?', options: [
                { text: 'Satyajit was the Managing Director of a bank', outcome: 'Satyajit was the Managing Director of a bank. His rise began when, as a clerk, he detected a forger.' },
                { text: 'he inherited the bank', outcome: 'Not quite — Students often reduce Satyajit to a passive victim of the bank collapse, overlooking his agency.', reveals: 'students-often-reduce-satyajit-to' },
                { text: 'he got promoted through bribery', outcome: 'Not quite — Students often reduce Satyajit to a passive victim of the bank collapse, overlooking his agency.', reveals: 'students-often-reduce-satyajit-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'ve just aced an exam everyone thought you\'d fail, and suddenly relatives treat you like a genius — but you know you just got lucky with the.',
            decisions: [{ prompt: 'What is the primary theme of "Glory at Twilight" as distinct from its plot summary?', options: [
                { text: 'The primary theme is the fragility of material success and the psychological toll of', outcome: 'The primary theme is the fragility of material success and the psychological toll of maintaining.' },
                { text: 'Satyajit loses his bank and goes to a wedding', outcome: 'Not quite — Students often equate "theme" with "topic" (e.g., "the theme is banking failure" or "the theme.', reveals: 'students-often-equate-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a post-colonial fiction unit your group reads Bhabani Bhattacharya\'s \'Glory at Twilight\'. A member pitches it as \'a nostalgic story about a man remembering his glorious student days — basically a feel-good memory piece about an old Bengali village\'.',
            decisions: [{ prompt: 'What context makes the story bite rather than glow?', options: [
                { text: 'Post-independence rural Bengal\'s collapse: indigenous banking has crumbled, dowry burdens crush families, and the protagonist\'s remembered \'glory\' is set against present decline — the twilight is a civilisational dusk, not a warm sunset. The nostalgia is measuring what\'s been lost, not celebrating what was.', outcome: 'Context supplies the irony: memory\'s brightness is the yardstick for present decay — read it as feel-good and the critique evaporates.' },
                { text: 'The pitch is right — memory pieces are about warmth; social conditions are backdrop.', outcome: 'The story\'s engine is contrast: old prestige versus new precarity; without the collapse of rural economy and dowry pressure, \'glory\' has nothing to fade against.', reveals: 'memory-piece-is-feel-good' },
                { text: 'It\'s a village-idyll essay — rural Bengal as timeless, untouched paradise.', outcome: 'Bhattacharya writes the opposite: the village is being unmade by post-independence economic change; \'timeless idyll\' is the fantasy the story punctures.', reveals: 'village-as-idyll' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'The village worships a success that was born from a forger\'s crime and dies at a dowry table — the flashbacks make both ironies visible at once.',
            decisions: [{ prompt: 'What comes next? Glory at Twilight (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Glory at Twilight (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_001', difficulty: 'standard',
          question: 'Before You Read: Context and Background is a pre-reading strategy that provides.',
          hint: 'Review c10_engl_cbse_02_001 (Apartheid background) and practice: "List 3 ways Apartheid.',
          misconception: 'Students often treat "context" as a list of static facts (author birth/death, historical dates) rather than as.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "bank collapse" mentioned in the story\'s opening would have been catastrophic for a Managing Director like Satyajit in 1960s.', answer: 'In 1960s India, banking was largely personal and uninsured',
                  options: ['In 1960s India, banking was largely personal and uninsured', 'losing a job'],
                  hint: 'Review c10_engl_cbse_02_001 (Apartheid background) and practice: "List 3 ways Apartheid laws.',
                  misconception: 'Students often treat "context" as a list of static facts (author birth/death, historical dates) rather than as a dynamic lens that shapes.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['If a student cannot articulate how context shapes the story, do not re-lecture facts.', 'Instead: (1) Have them reread the opening train passage and list every detail suggesting "systems breaking down".', '(2) Ask: "Which passenger is Satyajit?', 'Why does he *not* write a letter or get off?" (3) Connect his paralysis to the bank clerk who *acted* on impulse.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the deliberate arrangement of events.',
          hint: 'If stuck, review "story vs. discourse" using a familiar tale (e.g., *Mahabharata* begins.',
          misconception: 'Students treat "flashback" and "frame narrative" as interchangeable labels, writing "the story uses flashbacks" without.',
          parts: [
                { id: 'a', prompt: 'Analyze how the frame narrative (train journey → village → train memory → village climax → fig tree) controls the reader\'s sympathy for Satyajit.', answer: 'The frame traps us in Satyajit\'s consciousness: we see his humiliation (rationed',
                  options: ['The frame traps us in Satyajit\'s consciousness: we see his humiliation (rationed', 'we sympathize because he lost money'],
                  hint: 'If stuck, review "story vs. discourse" using a familiar tale (e.g., *Mahabharata* begins mid-war.',
                  misconception: 'Students treat "flashback" and "frame narrative" as interchangeable labels, writing "the story uses flashbacks" without distinguishing: the.' }
          ],
            remediations: { 'students-treat-flashback-and-frame': { steps: ['Have the student draw two timelines side-by-side: Timeline A = Satyajit\'s life in chronological order (clerk → forger.', 'Timeline B = Story\'s presentation order (train → forger memory → village welcome → wedding crisis → fig tree).', 'Ask: "Which event appears in a different position on each timeline?', 'Why did the author move it?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck, review the plot summary (c11_eng_w_cbse_07_002) and the Class 7/8.',
          misconception: 'Students often think setting is just "where and when" and atmosphere is just "mood." They miss that in literary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the time, place, and social environment in',
                  options: ['Setting refers to the time, place, and social environment in', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'If stuck, review the plot summary (c11_eng_w_cbse_07_002) and the Class 7/8 atmosphere/imagery.',
                  misconception: 'Students often think setting is just "where and when" and atmosphere is just "mood." They miss that in literary analysis, setting *creates*.' }
          ],
            remediations: { 'setting-is-just-where-and': { steps: ['Have the student reread the opening train paragraph and the fig tree scene, underlining every sensory word (sight.', 'Ask: "What feeling does each detail give you?" 3.', 'Then ask: "What is Satyajit feeling at that exact moment?" 4.', 'Guide them to write one sentence linking a specific detail to his internal state (e.g., "The train\'s \'unauthorised.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think setting is just "where and when" and atmosphere is just "mood." They miss that in literary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to set the story\'s climax at twilight under a fig tree rather than in the wedding pavilion. Is this effective? Justify.', answer: 'Yes, it is effective',
                  options: ['Yes, it is effective', 'it doesn\'t matter', 'the pavilion would be better', 'where and when'],
                  hint: 'If stuck, review the plot summary (c11_eng_w_cbse_07_002) and the Class 7/8 atmosphere/imagery.',
                  misconception: 'Students often think setting is just "where and when" and atmosphere is just "mood." They miss that in literary analysis, setting *creates*.' }
          ],
            remediations: { 'setting-is-just-where-and': { steps: ['Have the student reread the opening train paragraph and the fig tree scene, underlining every sensory word (sight.', 'Ask: "What feeling does each detail give you?" 3.', 'Then ask: "What is Satyajit feeling at that exact moment?" 4.', 'Guide them to write one sentence linking a specific detail to his internal state (e.g., "The train\'s \'unauthorised.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If stuck, review the character analysis of Matilda Loisel in c10_engl_cbse_16_001 for.',
          misconception: 'Students often reduce Satyajit to a passive victim of the bank collapse, overlooking his agency in "overreaching.',
          parts: [
                { id: 'a', prompt: 'What is Satyajit\'s former professional position and the specific event that triggered his rise from clerk to Managing Director?', answer: 'Satyajit was the Managing Director of a bank',
                  options: ['Satyajit was the Managing Director of a bank', 'he inherited the bank', 'he got promoted through bribery'],
                  hint: 'If stuck, review the character analysis of Matilda Loisel in c10_engl_cbse_16_001 for.',
                  misconception: 'Students often reduce Satyajit to a passive victim of the bank collapse, overlooking his agency in "overreaching himself" (risky.' },
                { id: 'b', prompt: 'In your own words, explain why Satyajit feels like an "impostor" during the wedding celebrations at Shantipur.', answer: 'Satyajit feels like an impostor',
                  options: ['Satyajit feels like an impostor', 'he is poor', 'last breath of peace', 'focuses only on his lack of money (e'],
                  hint: 'If stuck, review the character analysis of Matilda Loisel in c10_engl_cbse_16_001 for.',
                  misconception: 'Students often reduce Satyajit to a passive victim of the bank collapse, overlooking his agency in "overreaching himself" (risky.' }
          ],
            remediations: { 'students-often-reduce-satyajit-to': { steps: ['Direct the student to the flashback paragraph ("He had tried to overreach himself...") and ask: "List three specific.', 'Have them compare the forger\'s plea ("She is dying for want of medicine") with Srinath\'s plea ("Who will ever marry.', 'Ask: "Is Satyajit\'s signing of the deed an act of redemption, weakness, or both?', 'Find one phrase supporting each view." This forces engagement with textual evidence and moral complexity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'Review the four-column method (appearance, dialogue, desire, protagonist\'s reaction) from.',
          misconception: 'Students often treat supporting characters as mere "background" or "plot devices" and write generic descriptions like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining how secondary figures in a',
                  options: ['Character analysis of supporting characters involves examining how secondary figures in a', 'Before You Read: Context and Background is a pre-reading strategy that provides the', 'Plot and narrative structure refer to the deliberate arrangement of events, conflicts,', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review the four-column method (appearance, dialogue, desire, protagonist\'s reaction) from the.',
                  misconception: 'Students often treat supporting characters as mere "background" or "plot devices" and write generic descriptions like "Srinath is greedy".' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student writes generic traits, guide them through this 3-step repair: (1) Pick one character and find the exact.', '(2) Ask: "What does this character want RIGHT NOW?', 'What does their dialogue assume about Satyajit?" (3) Connect that want to a larger theme: patronage, meritocracy.', 'Practice with Srinath first — his "begging bowl" speech is the clearest entry point.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, return to c11_eng_w_cbse_07_004 (Character Analysis: Protagonist) and re-map.',
          misconception: 'Students often equate "theme" with "topic" (e.g., "the theme is banking failure" or "the theme is village weddings").',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "theme as universal insight" to this passage: "Glory was all overlaid with dark shame.', answer: 'Step 1: Identify the abstract nouns',
                  options: ['Step 1: Identify the abstract nouns', 'he lost his bank'],
                  hint: 'If stuck, return to c11_eng_w_cbse_07_004 (Character Analysis: Protagonist) and re-map Satyajit\'s.',
                  misconception: 'Students often equate "theme" with "topic" (e.g., "the theme is banking failure" or "the theme is village weddings") or with "moral" (e.g.' }
          ],
            remediations: { 'students-often-equate-theme-with': { steps: ['Have the student re-read only the first 3 and last 3 paragraphs, highlighting every abstract noun (glory, shame, pride.', 'Ask: "Which three words best name the *tension* Satyajit feels?" Guide them to "performance," "collapse," "sacrifice.".', 'Co-construct a theme statement using the template: "The story explores how [abstract force 1] ______ collides with.', 'Verify by checking if the statement fits both the bank-forger flashback AND the fig-tree climax.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
