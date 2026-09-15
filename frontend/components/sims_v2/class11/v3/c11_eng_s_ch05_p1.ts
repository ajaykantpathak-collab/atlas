import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch05_p1: SimDef = {
    id: 'v3_c11_eng_s_ch05_p1',
    title: 'The Tale of Melon City · Part 1/3',
    subtitle: 'Follow a law so rigid it executes its own king — and a people who accept a melon.',
    classLevel: 11, subject: 'eng_s', topic: 'The Tale of Melon City · Part 1/3',
    chapters: ['c11_eng_s_ch05'],
    nodeIds: ['c11_eng_s_cbse_05_001', 'c11_eng_s_cbse_05_002', 'c11_eng_s_cbse_05_003', 'c11_eng_s_cbse_05_004', 'c11_eng_s_cbse_05_005', 'c11_eng_s_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a satirist auditing a kingdom run by procedure', intro: 'An arch too low, a decree too absolute, a noose measured to fit — watch justice turn in a perfect circle.', goal: 'Analyse the poem\'s circular causal structure and the satirical work of its verse form.' },
    discovery: {
        question: 'A \'just and placid\' king orders an arch, blames everyone for its failure, and ends up hanged by his own decree. What mechanism delivers this absurdity?',
        options: ['Procedure obeyed to the letter — \'someone must be hanged\' and only his neck fits the arch\'s measure', 'A palace coup disguised as justice', 'The crowd\'s random fury', 'A prophecy that demanded a royal death'],
        answer: 'Procedure obeyed to the letter — \'someone must be hanged\' and only his neck fits the arch\'s measure',
        hook: 'The blame chain isn\'t random — each defence narrows the target until the king\'s own rule turns the noose on him.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" refers to the preliminary study of a text\'s author, historical period, literary tradition, genre conventions, and central thematic concerns before engaging.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace the blame chain from builders to king, check whether the poem opens in medias res, and weigh whether the melon on the throne is earned or arbitrary.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a political satire show like "The Great Indian Kapil Show" but set in a medieval kingdom — you\'d want to know who wrote it, what.',
            decisions: [{ prompt: 'Who is the author of "The Tale of Melon City" and from which collection is this poem taken?', options: [
                { text: 'The poem is by Vikram Seth, taken from his 1981 collection "Mappings" and later included', outcome: 'The poem is by Vikram Seth, taken from his 1981 collection "Mappings" and later included in his.' },
                { text: 'Mappings', outcome: 'Not quite — Students often treat "Before You Read" as optional background trivia rather than an analytical.', reveals: 'students-often-treat-before-you' },
                { text: 'Collected Poems', outcome: 'Not quite — Students often treat "Before You Read" as optional background trivia rather than an analytical.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are watching a play where the stage set changes from a grand palace archway to a grim scaffold to a dusty city gate — all in a few minutes.',
            decisions: [{ prompt: 'What are the four main physical settings in "The Tale of Melon City" in the order they appear?', options: [
                { text: 'The four main physical settings in sequence are: 1) the major thoroughfare where the arch', outcome: 'The four main physical settings in sequence are: 1) the major thoroughfare where the arch is built.' },
                { text: 'the throne room before the scaffold', outcome: 'Not quite — Students often treat setting as a static list of places ("thoroughfare, court, scaffold, gate") and.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a citizen in a kingdom where the ruler is described as \'just and placid\' — you\'d expect fair, calm leadership.',
            decisions: [{ prompt: 'What are the two adjectives used to describe the King in the opening lines of the poem, and what do they literally mean?', options: [
                { text: 'The King is described as \'just and placid.\' \'Just\' means fair and law-abiding', outcome: 'The King is described as \'just and placid.\' \'Just\' means fair and law-abiding; \'placid\' means calm.' },
                { text: 'the King is a \'good king\'', outcome: 'Not quite — Students often think the King is a \'good king\' because the text calls him \'just and placid\'.', reveals: 'the-king-is-a-good' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a play where the main actor is the King, but the story makes no sense without the people around him.',
            decisions: [{ prompt: 'List three supporting characters from "The Tale of Melon City" and state one action or line of dialogue for each.', options: [
                { text: 'Correct answer: Examples: (1) Chief of builders – says "O King, it was the workmen\'s', outcome: 'Correct answer: Examples: (1) Chief of builders – says "O King, it was the workmen\'s fault"; (2).' },
                { text: 'the King or vague descriptions', outcome: 'Not quite — Students often think supporting characters in this poem are "flat" and therefore unimportant.', reveals: 'supporting-characters-in-this-poem' },
                { text: 'supporting characters in this poem are "flat" and therefore unimportant', outcome: 'Not quite — Students often think supporting characters in this poem are "flat" and therefore unimportant.', reveals: 'supporting-characters-in-this-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re at a traffic signal that stays red for five minutes at 2 AM with no cars in sight — you wait because "that\'s the rule," even though it makes.',
            decisions: [{ prompt: '**REMEMBER LEVEL:** Define "primary theme" in literature and distinguish it from "plot summary" and "moral lesson" using one sentence each.', options: [
                { text: '**Correct Answer:** Primary theme = the central, universal idea explored through the work', outcome: '**Correct Answer:** Primary theme = the central, universal idea explored through the work (e.g.' },
                { text: 'the theme is that the king was foolish', outcome: 'Not quite — **The "Moral-of-the-Story" Trap:** Students equate "theme" with a **simplistic moral** like "don\'t.', reveals: 'the-moral-of-the-story' },
                { text: 'the theme is don\'t blame others', outcome: 'Not quite — **The "Moral-of-the-Story" Trap:** Students equate "theme" with a **simplistic moral** like "don\'t.', reveals: 'the-moral-of-the-story' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire workshop you must explain why \'The Tale of Melon City\' feels familiar to anyone who\'s watched a bureaucratic comedy. A teammate says: \'It\'s just a silly fairy tale — a melon on a throne. Don\'t overthink the joke.\'',
            decisions: [{ prompt: 'What\'s the poem actually doing?', options: [
                { text: 'It\'s deliberate satire in the Sufi \'wise fool\' tradition (the \'After Idries Shah\' tag is the clue): a \'just and placid\' king follows procedure so faithfully that blame escalates absurdly until a melon is crowned — exposing systems where rules, pass-the-parcel accountability and appearances matter more than sense or justice.', outcome: 'Context is a prediction tool: knowing the Sufi-tale lineage and Seth\'s deceptively neat couplets tells you the silliness is aimed at real bureaucratic absurdity.' },
                { text: 'The teammate is right — it\'s nonsense verse for children; satire would need sharper targets.', outcome: 'The targets are precise: ministers who shift blame, procedure worship, and citizens who prefer spectacle — the melon is the punchline of a real critique, not whimsy.', reveals: 'melon-city-is-nonsense' },
                { text: 'It\'s pro-order propaganda — the melon king shows that ANY sovereign keeps the peace, which is the point.', outcome: 'That reads the satire as endorsement; the crowd accepting a crowned melon \'as long as they are left in peace\' mocks apathy, not order\'s virtues.', reveals: 'satire-read-as-endorsement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Sing-song couplets carry a hanging and a crowned melon — the nursery-rhyme form is the joke that makes the satire bite.',
            decisions: [{ prompt: 'What comes next? The Tale of Melon City · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Tale of Melon City · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" refers to the preliminary study of.',
          hint: 'If stuck, review c7_engl_ch01_011 (narrative poem summary) and c8_engl_ch1_6 (wit/humour.',
          misconception: 'Students often treat "Before You Read" as optional background trivia rather than an analytical lens.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" refers to the preliminary study of a text\'s',
                  options: ['"Before You Read: Context and Background" refers to the preliminary study of a text\'s', 'Plot and narrative structure refer to the organized sequence of events in a story and the', 'Setting in a narrative poem refers to the time, place, and social environment where the', 'Character analysis of the protagonist involves examining the King\'s personality traits,'],
                  hint: 'If stuck, review c7_engl_ch01_011 (narrative poem summary) and c8_engl_ch1_6 (wit/humour theme).',
                  misconception: 'Students often treat "Before You Read" as optional background trivia rather than an analytical lens.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['If a student cannot connect context to textual prediction: (1) Have them reread the introductory question about the.', '(2) Ask: "What happens when someone follows rules perfectly but lacks common sense?" (3) Show a 2-minute clip from.', '(4) Map each character in the clip to the poem\'s characters (king = boss, architect = subordinate).', '(5) Have them rewrite the introductory note as a prediction paragraph: "Because this is after Idries Shah, I expect...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the organized sequence of events in.',
          hint: 'Review Freytag\'s Pyramid using a familiar Class 10 story (e.g., "The Necklace".',
          misconception: 'Students often treat the poem\'s events as a linear chain of "funny accidents" rather than a tightly engineered causal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure refer to the organized sequence of events in a story and the',
                  options: ['Plot and narrative structure refer to the organized sequence of events in a story and the', '"Before You Read: Context and Background" refers to the preliminary study of a text\'s', 'Setting in a narrative poem refers to the time, place, and social environment where the', 'Character analysis of the protagonist involves examining the King\'s personality traits,'],
                  hint: 'Review Freytag\'s Pyramid using a familiar Class 10 story (e.g., "The Necklace".',
                  misconception: 'Students often treat the poem\'s events as a linear chain of "funny accidents" rather than a tightly engineered causal loop.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Have the student create a cause-effect flowchart: King\'s order → arch built low → crown lost → king demands hanging →.', 'Ask: "Which link in this chain could be removed without collapsing the outcome?" (Answer: none — each is necessary).', 'Re-read stanza 8 aloud, emphasizing "The noose was set up somewhat high.', '/ Each man was measured by and by.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_003', difficulty: 'standard',
          question: 'Setting in a narrative poem refers to the time, place, and social environment.',
          hint: 'If stuck, re-read the poem focusing only on location words and mood words (adjectives.',
          misconception: 'Students often treat setting as a static list of places ("thoroughfare, court, scaffold, gate") and atmosphere as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in a narrative poem refers to the time, place, and social environment where the',
                  options: ['Setting in a narrative poem refers to the time, place, and social environment where the', '"Before You Read: Context and Background" refers to the preliminary study of a text\'s', 'Plot and narrative structure refer to the organized sequence of events in a story and the', 'Character analysis of the protagonist involves examining the King\'s personality traits,'],
                  hint: 'If stuck, re-read the poem focusing only on location words and mood words (adjectives, verbs.',
                  misconception: 'Students often treat setting as a static list of places ("thoroughfare, court, scaffold, gate") and atmosphere as a single label ("funny".' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot trace the shifts, have them draw a four-panel storyboard: Panel 1 = Arch/Thoroughfare (label mood.', 'Then ask: "In which panel does the king lose control of the setting?" (Panel 3).', '"In which panel do the people lose agency?" (Panel 4).', 'This visual mapping makes the dynamic relationship between setting and atmosphere concrete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the King\'s personality.',
          hint: 'Re-read the poem focusing ONLY on the King\'s lines and actions.',
          misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.',
          parts: [
                { id: 'a', prompt: 'What are the two adjectives used to describe the King in the opening lines of the poem, and what do they literally mean?', answer: 'The King is described as \'just and placid.\' \'Just\' means fair and law-abiding',
                  options: ['The King is described as \'just and placid.\' \'Just\' means fair and law-abiding', 'the King is a \'good king\''],
                  hint: 'Re-read the poem focusing ONLY on the King\'s lines and actions.',
                  misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.' },
                { id: 'b', prompt: 'Explain in your own words why the King orders the chief of builders to be hanged, and what the chief\'s response reveals about the King\'s leadership style.', answer: 'The King orders the hanging',
                  options: ['The King orders the hanging', 'the King is a \'good king\''],
                  hint: 'Re-read the poem focusing ONLY on the King\'s lines and actions.',
                  misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.' },
                { id: 'c', prompt: 'Apply the concept of \'procedural rigidity\' to the King\'s interaction with the architect.', answer: 'Step 1: King summons architect to assign blame',
                  options: ['Step 1: King summons architect to assign blame', 'the King is a \'good king\''],
                  hint: 'Re-read the poem focusing ONLY on the King\'s lines and actions.',
                  misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.' },
                { id: 'd', prompt: 'Analyze the irony in the King\'s consultation with the \'wisest man.\' How does the wisest man\'s verdict reflect the King\'s own logic back at him?', answer: 'The wisest man is so old he \'could not walk and could not see\'',
                  options: ['The wisest man is so old he \'could not walk and could not see\'', 'the King is a \'good king\''],
                  hint: 'Re-read the poem focusing ONLY on the King\'s lines and actions.',
                  misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.' }
          ],
            remediations: { 'the-king-is-a-good': { steps: ['If the student persists in seeing the King as genuinely just: 1) Have them list every execution order in sequence.', '2) Ask: \'At which point does the King investigate *why* the arch was low?\' (Never — he only seeks someone to hang.) 3).', 'But being a just and placid King / He said, "This is a tricky thing"\') — highlight that anger is suppressed *to.', '4) Assign a rewrite: \'Describe the King using three adjectives *not* used in the poem, with evidence.\''], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the King\'s final decision to hang himself because he alone fits the noose. Is this the act of a \'just\' ruler or a \'placid\' one? Justify with evidence.', answer: 'It is the act of a *placid* ruler',
                  options: ['It is the act of a *placid* ruler', 'the King is a \'good king\''],
                  hint: 'Re-read the poem focusing ONLY on the King\'s lines and actions.',
                  misconception: 'Students often think the King is a \'good king\' because the text calls him \'just and placid\' repeatedly.' }
          ],
            remediations: { 'the-king-is-a-good': { steps: ['If the student persists in seeing the King as genuinely just: 1) Have them list every execution order in sequence.', '2) Ask: \'At which point does the King investigate *why* the arch was low?\' (Never — he only seeks someone to hang.) 3).', 'But being a just and placid King / He said, "This is a tricky thing"\') — highlight that anger is suppressed *to.', '4) Assign a rewrite: \'Describe the King using three adjectives *not* used in the poem, with evidence.\''], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining their roles.',
          hint: 'Review the list of characters in the poem and practice writing one PEEL paragraph on the.',
          misconception: 'Students often think supporting characters in this poem are "flat" and therefore unimportant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters involves examining their roles, traits,',
                  options: ['Character analysis of supporting characters involves examining their roles, traits,', '"Before You Read: Context and Background" refers to the preliminary study of a text\'s', 'Plot and narrative structure refer to the organized sequence of events in a story and the', 'Setting in a narrative poem refers to the time, place, and social environment where the'],
                  hint: 'Review the list of characters in the poem and practice writing one PEEL paragraph on the King from.',
                  misconception: 'Students often think supporting characters in this poem are "flat" and therefore unimportant.' }
          ],
            remediations: { 'supporting-characters-in-this-poem': { steps: ['If a student holds this misconception, guide them to list each supporting character\'s profession/role and ask: "What.', 'Then have them write one sentence per character: "The [role] represents [institution] and shows [flaw]."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'If stuck, review **c11_eng_s_cbse_05_002 (Plot and Narrative Structure)** — specifically.',
          misconception: '**The "Moral-of-the-Story" Trap:** Students equate "theme" with a **simplistic moral** like "don\'t blame others".',
          parts: [
                { id: 'a', prompt: '**APPLY LEVEL:** Given this modern scenario, identify the Melon City parallel and name the thematic concept it illustrates: *A university department discovers.', answer: '**Correct Answer:** Mapping: Head = King (initiates action, deflects blame)',
                  options: ['**Correct Answer:** Mapping: Head = King (initiates action, deflects blame)', 'due process was followed', 'Dean = King because both are bosses'],
                  hint: 'If stuck, review **c11_eng_s_cbse_05_002 (Plot and Narrative Structure)** — specifically the.',
                  misconception: '**The "Moral-of-the-Story" Trap:** Students equate "theme" with a **simplistic moral** like "don\'t blame others" or "think before you act.".' }
          ],
            remediations: { 'the-moral-of-the-story': { steps: ['** Ask the student to **retell the plot in 5 sentences** — confirm they know *what happens*. **', '** Ask: *"If you removed the melon, the arch, the king — what idea remains?"* Push past "justice" → "bureaucratic.', '** Give the **Theme vs. Moral T-chart**: | Moral (Lesson) | Theme (Explored Idea) |.', '** Have them write **one thematic statement** using this template: *"The poem argues that [systemic behaviour] leads.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
