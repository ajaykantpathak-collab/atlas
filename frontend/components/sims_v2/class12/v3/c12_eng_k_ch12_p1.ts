import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch12_p1: SimDef = {
    id: 'v3_c12_eng_k_ch12_p1',
    title: 'Time and Time Again (Poem) · Part 1/3',
    subtitle: 'The clocks never agreed — that was the city\'s harmony',
    classLevel: 12, subject: 'eng_k', topic: 'Time and Time Again (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch12'],
    nodeIds: ['c12_eng_k_cbse_12_001', 'c12_eng_k_cbse_12_002', 'c12_eng_k_cbse_12_003', 'c12_eng_k_cbse_12_004', 'c12_eng_k_cbse_12_005', 'c12_eng_k_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Indian English poetry reader', intro: 'A linguist who translated ancient Tamil verse hears Indian cities in their clock towers — every one offbeat, all of them together.', goal: 'Read Time and Time Again through its clock-tower metaphor for pluralism, and the lament for rhythms broken by violence.' },
    discovery: {
        question: 'Old-city clock towers strike the hour \'slightly off\' each other — never together. A.K. Ramanujan builds a poem on that tiny imperfection. What is he actually clocking?',
        options: ['The perennial feuds and seasonal alliances of Hindu, Christian and Muslim neighbours — a plural city that coexists without ever synchronising', 'Bad clockmakers', 'Indian Standard Time delays', 'Nothing — just sounds'],
        answer: 'The perennial feuds and seasonal alliances of Hindu, Christian and Muslim neighbours — a plural city that coexists without ever synchronising',
        hook: 'A tower left \'eyeless, silent\' after a riot — or a \'precise act of nature\' in lightning — equates human violence with natural disaster. Nature\'s fury is lawful and exact; communal hatred is lawless. The poem doesn\'t condemn or accept — it bears witness, a wistful lament for a shattered rhythm.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading strategy that provides essential biographical, historical, and cultural information about the poet and the poem\'s setting to activate prior.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen to an Indian city\'s towers: hear alloy, maker\'s hand and donor\'s whim inside each bell, then follow the poem to the knocked-out clockwork and the zigzag sky showing through.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine walking through the old quarter of any Indian city — Lucknow, Hyderabad, or Madurai — where multiple clock towers stand within hearing distance.',
            decisions: [{ prompt: 'Who is A.K. Ramanujan, and what is his primary scholarly contribution that influences his poetry?', options: [
                { text: 'A.K', outcome: 'A.K. Ramanujan (1929–1993) was a linguist, folklorist, and translator renowned for pioneering.' },
                { text: 'He was a novelist', outcome: 'Not quite — Students often treat the poem as a simple description of faulty clocks or a general anti-war.', reveals: 'students-often-treat-the-poem' },
                { text: 'He wrote only in English', outcome: 'Not quite — Students often treat the poem as a simple description of faulty clocks or a general anti-war.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re handed a poem with no title, no obvious story, just clocks striking different hours. Where do you begin?',
            decisions: [{ prompt: 'What are the three main structural movements in "Time and Time Again" and which stanzas correspond to each?', options: [
                { text: 'The three movements are: (1) Exposition', outcome: 'The three movements are: (1) Exposition — Stanza 1 establishes the clocktowers as distinct.' },
                { text: 'description of clocks', outcome: 'Not quite — Students treat the poem as a simple description of clocks, missing that the clock description *is*.', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing in a historic Indian city — perhaps Lucknow or Hyderabad — where several clock towers from different eras chime at slightly different.',
            decisions: [{ prompt: 'What is the primary physical setting described in the opening lines of "Time and Time Again"?', options: [
                { text: 'The primary physical setting is the clock towers of an old, well-managed city', outcome: 'The primary physical setting is the clock towers of an old, well-managed city.' },
                { text: 'a village square', outcome: 'Not quite — Students often treat setting as mere "where and when" and atmosphere as a synonym for "tone.".', reveals: 'students-often-treat-setting-as' },
                { text: 'a single clock', outcome: 'Not quite — Students often treat setting as mere "where and when" and atmosphere as a synonym for "tone.".', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re listening to a friend describe their city\'s clock towers — each keeping slightly different time, each with its own history — and then one day.',
            decisions: [{ prompt: 'Who is the protagonist (central perspective) in "Time and Time Again," and how do you know it\'s not the poet A.K. Ramanujan himself?', options: [
                { text: 'The protagonist is the poetic speaker', outcome: 'The protagonist is the poetic speaker — an unnamed observer who describes the clock towers and.' },
                { text: 'character analysis', outcome: 'Not quite — Students often think "character analysis" in a poem means finding a human character with a name and.', reveals: 'character-analysis-in-a-poem' },
                { text: 'the poet\'s biography dictates the poem\'s voice', outcome: 'Not quite — Students often think "character analysis" in a poem means finding a human character with a name and.', reveals: 'character-analysis-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are standing in an old Indian city square at noon: you hear not one bell but several, each slightly off, each with its own tone and history.',
            decisions: [{ prompt: 'Name the four distinct categories of supporting presences that appear in the poem, giving one example from the text for each category.', options: [
                { text: 'The four categories are: (1) Mechanical', outcome: 'The four categories are: (1) Mechanical — the clocktowers and their gongs ("clocktowers / of any.' },
                { text: 'supporting characters', outcome: 'Not quite — Students often think "supporting characters" in a poem must be human figures with names and.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'merges categories (e', outcome: 'Not quite — Students often think "supporting characters" in a poem must be human figures with names and.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A city\'s peace committee proposes demolishing a clock tower scarred by an old riot \'so the cycle of conflict is forgotten\'.',
            decisions: [{ prompt: 'Does erasing the landmark break the cycle?', options: [
                { text: 'No — Ramanujan\'s time-worn city shows violence repeats time and time again when memory is paved over; keep the scar visible and fix the causes, not the evidence.', outcome: 'The poem\'s looped time warns that forgetting is how the cycle reloads; honest memory is the interruption.' },
                { text: 'Yes — remove the symbol and the hostility loses its rallying point.', outcome: 'The poem\'s violence outlives its monuments; symbols don\'t cause the repetition, unaddressed grievances do.', reveals: 'erasure-prevents-repetition' },
                { text: 'It doesn\'t matter — history always repeats, so nothing we do helps.', outcome: 'Ramanujan observes the cycle to indict it; fatalism just agrees to the next round.', reveals: 'fatalism-about-cycles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear civic time as a metaphor for coexistence — and read a broken clock face as a broken social contract.',
            decisions: [{ prompt: 'What comes next? Time and Time Again (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Time and Time Again (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading strategy that.',
          hint: 'If stuck, review c11_eng_h_cbse_01_009 (Irony and Symbolism) — specifically the worked.',
          misconception: 'Students often treat the poem as a simple description of faulty clocks or a general anti-war statement.',
          parts: [
                { id: 'a', prompt: 'Analyze the phrase "precise act / Of nature in a night of lightnings." Why is a lightning strike called "precise" when it is typically seen as random?', answer: 'The lightning is "precise"',
                  options: ['The lightning is "precise"', 'random', 'chaotic', 'wistful lament'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_009 (Irony and Symbolism) — specifically the worked example.',
                  misconception: 'Students often treat the poem as a simple description of faulty clocks or a general anti-war statement.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the poet\'s bio in the NCERT "Before You Read" box — underline "anthropology," "folklore," "translations." 2.', 'List three ways clock towers differ in the poem (alloy, maker\'s hand, donor\'s whim, wind).', 'Map each to a social difference (caste, religion, language, region).', 'Watch a 5-min video on "Clock towers in Indian cities" (e.g., Husainabad Clock Tower, Lucknow) to visualize the setting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the poem as a simple description of faulty clocks or a general anti-war statement.',
          parts: [
                { id: 'a', prompt: 'Evaluate the poet\'s attitude toward communal disharmony as reflected in the poem.', answer: '(iii) Wistful lament',
                  options: ['(iii) Wistful lament', 'wistful lament', 'nostalgia'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_009 (Irony and Symbolism) — specifically the worked example.',
                  misconception: 'Students often treat the poem as a simple description of faulty clocks or a general anti-war statement.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the poet\'s bio in the NCERT "Before You Read" box — underline "anthropology," "folklore," "translations." 2.', 'List three ways clock towers differ in the poem (alloy, maker\'s hand, donor\'s whim, wind).', 'Map each to a social difference (caste, religion, language, region).', 'Watch a 5-min video on "Clock towers in Indian cities" (e.g., Husainabad Clock Tower, Lucknow) to visualize the setting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to how a poem organizes its.',
          hint: 'Review Class 11 "Plot and Narrative Structure" nodes (c11_eng_h_cbse_01_002.',
          misconception: 'Students treat the poem as a simple description of clocks, missing that the clock description *is* the narrative — the.',
          parts: [
                { id: 'a', prompt: 'What are the three main structural movements in "Time and Time Again" and which stanzas correspond to each?', answer: 'The three movements are: (1) Exposition',
                  options: ['The three movements are: (1) Exposition', 'description of clocks'],
                  hint: 'Review Class 11 "Plot and Narrative Structure" nodes (c11_eng_h_cbse_01_002, c11_eng_s_cbse_01_002).',
                  misconception: 'Students treat the poem as a simple description of clocks, missing that the clock description *is* the narrative — the clocks *are* the.' },
                { id: 'b', prompt: 'Analyze how the poem\'s free verse form — lack of consistent rhyme scheme or meter — contributes to its narrative structure.', answer: 'The free verse structure mirrors the "slightly off" timekeeping of the clocks',
                  options: ['The free verse structure mirrors the "slightly off" timekeeping of the clocks', 'unstructured'],
                  hint: 'Review Class 11 "Plot and Narrative Structure" nodes (c11_eng_h_cbse_01_002, c11_eng_s_cbse_01_002).',
                  misconception: 'Students treat the poem as a simple description of clocks, missing that the clock description *is* the narrative — the clocks *are* the.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student physically map the poem: draw three boxes labeled "Observation," "Symbolism," "Catastrophe" and place.', 'Read the poem aloud together, pausing at each structural shift (line 7: "perennial feuds"; line 13: "One day you look.', 'Compare with a conventional narrative (e.g., Class 10\'s "The Necklace") using a story mountain diagram to show parallel.', 'Re-attempt Diagnostic Question 4 to verify structural thinking about form.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and social environment in which.',
          hint: 'Review the worked example in c11_eng_h_cbse_01_003 where setting-atmosphere is analyzed.',
          misconception: 'Students often treat setting as mere "where and when" and atmosphere as a synonym for "tone." In this poem, they may.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical setting described in the opening lines of "Time and Time Again"?', answer: 'The primary physical setting is the clock towers of an old, well-managed city',
                  options: ['The primary physical setting is the clock towers of an old, well-managed city', 'a village square', 'a single clock'],
                  hint: 'Review the worked example in c11_eng_h_cbse_01_003 where setting-atmosphere is analyzed for.',
                  misconception: 'Students often treat setting as mere "where and when" and atmosphere as a synonym for "tone." In this poem, they may say "the setting is.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student cannot distinguish setting from atmosphere or cannot trace the shift from chronic discord to acute.', '(2) Revisit Class 11 node c11_eng_h_cbse_01_003 (Setting and Atmosphere) and complete its worked example on a different.', '(3) Practice the diagnostic question 4 again, this time writing a one-paragraph answer using the PEEL structure (Point.', '(4) Ask a peer to read your paragraph and identify whether you used sensory evidence from both stanzas.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_004', difficulty: 'standard',
          question: 'In poetry, the protagonist is the central perspective or persona through which.',
          hint: 'Review "persona" in c11_eng_h_cbse_01_004 and practice identifying the speaker in three.',
          misconception: 'Students often think "character analysis" in a poem means finding a human character with a name and backstory.',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist (central perspective) in "Time and Time Again," and how do you know it\'s not the poet A.K. Ramanujan himself?', answer: 'The protagonist is the poetic speaker',
                  options: ['The protagonist is the poetic speaker', 'character analysis', 'the poet\'s biography dictates the poem\'s voice'],
                  hint: 'Review "persona" in c11_eng_h_cbse_01_004 and practice identifying the speaker in three short poems.',
                  misconception: 'Students often think "character analysis" in a poem means finding a human character with a name and backstory.' }
          ],
            remediations: { 'character-analysis-in-a-poem': { steps: ['If a student cannot separate poet from speaker: 1) Have them read the poem aloud and mark every "you" and "one".', 'Or is that a plausible invention?" 3) Compare with c11_eng_h_cbse_01_004 (Class 11 Protagonist analysis) where the.', '4) Re-do Diagnostic Question 1 with this framing: "The speaker is a mask the poet wears for this poem."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_005', difficulty: 'standard',
          question: 'In poetry, supporting characters are the personified entities, collective.',
          hint: 'If stuck, revisit c11_eng_h_cbse_12_005 (Class 11 Hornbill poem supporting characters).',
          misconception: 'Students often think "supporting characters" in a poem must be human figures with names and dialogue.',
          parts: [
                { id: 'a', prompt: 'Name the four distinct categories of supporting presences that appear in the poem, giving one example from the text for each category.', answer: 'The four categories are: (1) Mechanical',
                  options: ['The four categories are: (1) Mechanical', 'supporting characters', 'merges categories (e', '"supporting characters" in a poem must be human figures with names and dialogue'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_12_005 (Class 11 Hornbill poem supporting characters) and practice.',
                  misconception: 'Students often think "supporting characters" in a poem must be human figures with names and dialogue.' },
                { id: 'b', prompt: 'Analyse how the "seasonal alliance / of Hindu, Christian, and Muslim" is both supported and undermined by the clocktowers\' sounds.', answer: 'The alliance is "seasonal"',
                  options: ['The alliance is "seasonal"', 'feuds and seasonal alliance', 'supporting characters', '"supporting characters" in a poem must be human figures with names and dialogue'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_12_005 (Class 11 Hornbill poem supporting characters) and practice.',
                  misconception: 'Students often think "supporting characters" in a poem must be human figures with names and dialogue.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['Re‑read the poem aloud, underlining every noun that acts or is acted upon (clocktowers, gongs, alloy, hand, donor.', 'Sort the underlined words into the four categories from Diagnostic 1.', 'For each category, write one sentence explaining what human trait or symbolic role the poem assigns to it.', 'Check your sentences against the "personification" and "symbolism" nodes (c12_eng_k_cbse_12_008, c12_eng_k_cbse_12_009).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea or message that the.',
          hint: 'If stuck, review the "flight as metaphor" analysis in c10_engl_cbse_03_007 and the.',
          misconception: 'Students often think the poem is **about clocks and timekeeping** — they write answers describing the mechanics of why.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet describes the act of nature (lightning) as "precise" in contrast to the human-made clocks and riots.', answer: 'The lightning is "precise"',
                  options: ['The lightning is "precise"', 'precise'],
                  hint: 'If stuck, review the "flight as metaphor" analysis in c10_engl_cbse_03_007 and the theme-extraction.',
                  misconception: 'Students often think the poem is **about clocks and timekeeping** — they write answers describing the mechanics of why clocks differ.' }
          ],
            remediations: { 'the-poem-is-about-clocks': { steps: ['If a student writes a literal explanation of clock differences: (1) Ask them to reread lines 9–12 and underline the.', '(3) Assign a 3-column table: Column 1 = Clock Feature (e.g., "shaking hand in Switzerland"), Column 2 = Literal.', '(4) Re-diagnose with Diagnostic Question 3 to test transfer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
