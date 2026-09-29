import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch02_p1: SimDef = {
    id: 'v3_c11_eng_s_ch02_p1',
    title: 'The Address · Part 1/3',
    subtitle: 'Read a doorstep rejection as the machinery of dispossession, not a quarrel over furniture.',
    classLevel: 11, subject: 'eng_s', topic: 'The Address · Part 1/3',
    chapters: ['c11_eng_s_ch02'],
    nodeIds: ['c11_eng_s_cbse_02_001', 'c11_eng_s_cbse_02_002', 'c11_eng_s_cbse_02_003', 'c11_eng_s_cbse_02_004', 'c11_eng_s_cbse_02_005', 'c11_eng_s_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a survivor returning to claim a stolen past', intro: 'Number 46 still stands, the tablecloth is hers, the burn mark familiar — yet the room feels like a stranger\'s house.', goal: 'Situate the story in occupied Holland and analyse how its two-visit structure delivers disillusionment.' },
    discovery: {
        question: 'Mrs. Dorling \'safekeeps\' a Jewish family\'s belongings and later won\'t let the daughter in. Simple greed — or something larger?',
        options: ['Larger — she embodies the legalised seizure of Jewish property under occupation, not just one woman\'s dishonesty', 'Simple greed — a neighbour exploiting a friendship', 'Neither — she was protecting the items from damage', 'Larger — she was a paid government custodian by law'],
        answer: 'Larger — she embodies the legalised seizure of Jewish property under occupation, not just one woman\'s dishonesty',
        hook: 'Reading her as merely greedy shrinks systemic dispossession into personal villainy — the law itself made the theft respectable.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Address\' (Snapshots, ch. 2) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the story into its pre-war and post-war timeframes, place the flashbacks as structural pillars, and defend the choice to \'forget the address.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Address\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What was the approximate percentage of Dutch Jews who perished during the Holocaust, and how does this statistic distinguish the.', options: [
                { text: 'Approximately 75% of Dutch Jews (104,000 out of 140,000) perished', outcome: 'Approximately 75% of Dutch Jews (104,000 out of 140,000) perished — the highest percentage.' },
                { text: 'similar to France at 25%', outcome: 'Not quite — Students often believe "The Address" is a simple story about a greedy woman stealing furniture.', reveals: 'the-address-is-a-simple' },
                { text: 'The Address', outcome: 'Not quite — Students often believe "The Address" is a simple story about a greedy woman stealing furniture.', reveals: 'the-address-is-a-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Address\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What are the two distinct timeframes in which the events of "The Address" are set, and which narrative technique connects them?', options: [
                { text: 'The two timeframes are pre-War (when the narrator\'s mother entrusts belongings to Mrs', outcome: 'The two timeframes are pre-War (when the narrator\'s mother entrusts belongings to Mrs.' },
                { text: 'past and present', outcome: 'Not quite — Students often treat the flashbacks as mere "backstory" or "background information" rather than.', reveals: 'students-often-treat-the-flashbacks' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Address\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the two main physical settings contrasted in "The Address," and what time periods do they represent?', options: [
                { text: 'The two main physical settings are the narrator\'s pre-war family home (described in', outcome: 'The two main physical settings are the narrator\'s pre-war family home (described in flashback) and.' },
                { text: 'setting', outcome: 'Not quite — Students often think "setting" is just the geographical location (Holland, Marconi Street) and.', reveals: 'setting-is-just-the-geographical' },
                { text: 'atmosphere', outcome: 'Not quite — Students often think "setting" is just the geographical location (Holland, Marconi Street) and.', reveals: 'setting-is-just-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Address\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Name the three supporting characters in "The Address" who directly interact with the narrator or shape her memories, and state one defining.', options: [
                { text: 'The three supporting characters are: (1) Mrs', outcome: 'The three supporting characters are: (1) Mrs. Dorling — she wears the narrator\'s mother\'s green.' },
                { text: 'The Address', outcome: 'Not quite — Students often think supporting characters in "The Address" are simply "good" or "bad." They label.', reveals: 'supporting-characters-in-the-address' },
                { text: 'the conductor or the woman at the bay window', outcome: 'Not quite — Students often think supporting characters in "The Address" are simply "good" or "bad." They label.', reveals: 'supporting-characters-in-the-address' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Address\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the literal "address" in the story, and what does the narrator resolve to do with it at the end?', options: [
                { text: 'The literal address is **46 Marconi Street**, where Mrs', outcome: 'The literal address is **46 Marconi Street**, where Mrs. Dorling stored the narrator\'s mother\'s.' },
                { text: 'she decides to take the things back', outcome: 'Not quite — Students often think the **primary theme is "the horrors of war" or "the dishonesty of Mrs.', reveals: 'the-primary-theme-is-the' },
                { text: 'she writes it down for future visits', outcome: 'Not quite — Students often think the **primary theme is "the horrors of war" or "the dishonesty of Mrs.', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a Remembrance Week display your class presents \'The Address\'. The caption reads: \'A story about a selfish woman who kept a neighbour\'s furniture — a lesson in greed.\' A visitor who knows the history frowns at the caption.',
            decisions: [{ prompt: 'What does the caption get wrong?', options: [
                { text: 'It shrinks systemic dispossession to personal greed: Mrs Dorling\'s holding the family\'s things sits inside the Holocaust-era \'Aryanisation\' of Jewish property — ~75% of Dutch Jews were murdered, belongings \'safeguarded\' or seized, and the objects at 46 Marconi Street are the only remaining witnesses to erased lives. The narrator doesn\'t reclaim them because they\'re now \'uncanny\' — arranged in a stranger\'s room, they\'ve lost their meaning.', outcome: 'The address is about ruptured continuity, not bad manners; the objects testify to a family the state wiped out.' },
                { text: 'The caption is fine — at heart it\'s a morality tale about not taking other people\'s things.', outcome: 'That reads it as universal \'theft\' and misses the specific mechanism — state-sanctioned dispossession under occupation — and why the daughter walks away rather than demand her inheritance back.', reveals: 'address-is-about-greed' },
                { text: 'Reframe it as triumph — the daughter should have taken everything back to honour her mother.', outcome: 'That misses the ending\'s point: seeing her mother\'s cardigan worn as ordinary utility broke the link; reclaiming objects can\'t restore the erased world they came from.', reveals: 'reclaiming-is-the-lesson' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The objects were real; the life they belonged to was not reclaimable — forgetting the address is the only honest resolution left.',
            decisions: [{ prompt: 'What comes next? The Address · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Address · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_001', difficulty: 'standard',
          question: '\'The Address\' (Snapshots, ch. 2) — the context and background to this text: who.',
          hint: 'If stuck, review Class 10 "Diary of Anne Frank" historical context notes.',
          misconception: 'Students often believe "The Address" is a simple story about a greedy woman stealing furniture, missing that Mrs.',
          parts: [
                { id: 'a', prompt: 'What was the approximate percentage of Dutch Jews who perished during the Holocaust, and how does this statistic distinguish the Netherlands from other Western.', answer: 'Approximately 75% of Dutch Jews (104,000 out of 140,000) perished',
                  options: ['Approximately 75% of Dutch Jews (104,000 out of 140,000) perished', 'similar to France at 25%', 'The Address'],
                  hint: 'If stuck, review Class 10 "Diary of Anne Frank" historical context notes (c10_engl_cbse_04_008).',
                  misconception: 'Students often believe "The Address" is a simple story about a greedy woman stealing furniture, missing that Mrs.' }
          ],
            remediations: { 'the-address-is-a-simple': { steps: ['If the student holds this misconception, do NOT simply re-teach the plot.', 'Instead: (1) Show a 1941 Nazi decree (Verordnung) on "Jewish Property Registration" — have the student identify the.', '(2) Map the trajectory: registration → forced sale/entrustment → deportation → "Aryan" custodian gains legal title.', '(3) Re-read the mother\'s dialogue: "She even insisted.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "The Address" is a simple story about a greedy woman stealing furniture, missing that Mrs.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The story \'The Address\' is primarily about the material greed of Mrs.', answer: 'No, this reduces a complex historical reality to individual villainy',
                  options: ['No, this reduces a complex historical reality to individual villainy', 'The Address'],
                  hint: 'If stuck, review Class 10 "Diary of Anne Frank" historical context notes (c10_engl_cbse_04_008).',
                  misconception: 'Students often believe "The Address" is a simple story about a greedy woman stealing furniture, missing that Mrs.' },
                { id: 'b', prompt: 'Write a 50-word "museum label" for the green knitted cardigan with pale wooden buttons that the woman wears at the door.', answer: '"Green knitted cardigan, c',
                  options: ['"Green knitted cardigan, c', 'The Address'],
                  hint: 'If stuck, review Class 10 "Diary of Anne Frank" historical context notes (c10_engl_cbse_04_008).',
                  misconception: 'Students often believe "The Address" is a simple story about a greedy woman stealing furniture, missing that Mrs.' }
          ],
            remediations: { 'the-address-is-a-simple': { steps: ['If the student holds this misconception, do NOT simply re-teach the plot.', 'Instead: (1) Show a 1941 Nazi decree (Verordnung) on "Jewish Property Registration" — have the student identify the.', '(2) Map the trajectory: registration → forced sale/entrustment → deportation → "Aryan" custodian gains legal title.', '(3) Re-read the mother\'s dialogue: "She even insisted.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Address\' — what happens, in what order, and why.',
          hint: 'Review "narrative time vs. chronological time" using the Class 10 node.',
          misconception: 'Students often treat the flashbacks as mere "backstory" or "background information" rather than as structural pillars.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'The Address\'',
                  options: ['The plot/narrative arc of \'The Address\'', '\'The Address\' (Snapshots, ch', 'The setting of \'The Address\'', 'Character analysis in \'The Address\''],
                  hint: 'Review "narrative time vs. chronological time" using the Class 10 node c10_engl_cbse_11_008 (Hari.',
                  misconception: 'Students often treat the flashbacks as mere "backstory" or "background information" rather than as structural pillars that create dramatic.' }
          ],
            remediations: { 'students-often-treat-the-flashbacks': { steps: ['Have the student draw a timeline: mark "War starts," "Mother gives address," "First visit," "Second visit," "Narrator.', 'Ask: "What does the narrator KNOW at each point that she didn\'t know before?" 3.', 'Show how each flashback answers a question raised in the present timeline.', 'Practice with a simpler text (e.g., a fairy tale told out of order) to isolate the flashback function.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_003', difficulty: 'standard',
          question: 'The setting of \'The Address\' — the place, time and atmosphere the text creates.',
          hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) to practice extracting.',
          misconception: 'Students often think "setting" is just the geographical location (Holland, Marconi Street) and "atmosphere" is just the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'The Address\'',
                  options: ['The setting of \'The Address\'', '\'The Address\' (Snapshots, ch', 'The plot/narrative arc of \'The Address\'', 'Character analysis in \'The Address\''],
                  hint: 'Review "Sensory Imagery and Suspense Building" (c7_engl_ch04_008) to practice extracting atmosphere.',
                  misconception: 'Students often think "setting" is just the geographical location (Holland, Marconi Street) and "atmosphere" is just the weather or time.' }
          ],
            remediations: { 'setting-is-just-the-geographical': { steps: ['If a student conflates setting with mere backdrop, have them reread the second visit scene (from "I followed the girl.', 'Then ask: "If you walked into this room blindfolded, what would you smell, hear, feel?', 'Would it feel like a home?" Next, have them list the objects the narrator recognizes (table-cloth, tea-set.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis in \'The Address\' — the central figure(s), their traits, and.',
          hint: 'If stuck, re-read the three key scenes: first visit (rejection), second visit.',
          misconception: 'Students often think the narrator is "passive" or "weak" because she leaves without taking anything and decides.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'The Address\'',
                  options: ['Character analysis in \'The Address\'', '\'The Address\' (Snapshots, ch', 'The plot/narrative arc of \'The Address\'', 'The setting of \'The Address\''],
                  hint: 'If stuck, re-read the three key scenes: first visit (rejection), second visit (confrontation).',
                  misconception: 'Students often think the narrator is "passive" or "weak" because she leaves without taking anything and decides to forget.' }
          ],
            remediations: { 'the-narrator-is-passive-or': { steps: ['If a student insists the narrator is passive, guide them through these steps: (1) List every *active* choice she makes.', '(2) Ask: "Does she *fail* to take things, or does she *refuse*?" (3) Point to the line "I resolved to forget".', '(4) Connect to theme: the story is about *survival*, not retrieval.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Address\' — the secondary figures who move the.',
          hint: 'If stuck, review the protagonist\'s motivation for visiting (curiosity vs.',
          misconception: 'Students often think supporting characters in "The Address" are simply "good" or "bad." They label Mrs.',
          parts: [
                { id: 'a', prompt: 'Name the three supporting characters in "The Address" who directly interact with the narrator or shape her memories, and state one defining action for each.', answer: 'The three supporting characters are: (1) Mrs',
                  options: ['The three supporting characters are: (1) Mrs', 'The Address', 'the conductor or the woman at the bay window', 'supporting characters in "The Address" are simply "good" or "bad'],
                  hint: 'If stuck, review the protagonist\'s motivation for visiting (curiosity vs.',
                  misconception: 'Students often think supporting characters in "The Address" are simply "good" or "bad." They label Mrs.' },
                { id: 'b', prompt: 'Explain in your own words why the narrator\'s mother trusted Mrs. Dorling with their valuables, and what this reveals about the mother\'s character.', answer: 'The mother trusted Mrs',
                  options: ['The mother trusted Mrs', 'the mother was foolish', 'she didn\'t care', 'The Address'],
                  hint: 'If stuck, review the protagonist\'s motivation for visiting (curiosity vs.',
                  misconception: 'Students often think supporting characters in "The Address" are simply "good" or "bad." They label Mrs.' }
          ],
            remediations: { 'supporting-characters-in-the-address': { steps: ['If a student falls into the good/bad binary, guide them through a three-step correction: (1) Re-read the mother\'s.', 'She wanted to save all my nice things." Ask: does the mother sound suspicious?', 'Dorling\'s first appearance: "She had suddenly turned up and renewed their contact." Ask: why would she renew contact.', '(3) Have the student write two adjectives for each character that are NOT moral judgments (e.g., for mother.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of \'The Address\' — the central idea the whole text returns to.',
          hint: 'Review the **PEEL paragraph structure** (Point, Evidence, Explanation, Link) for theme.',
          misconception: 'Students often think the **primary theme is "the horrors of war" or "the dishonesty of Mrs.',
          parts: [
                { id: 'a', prompt: 'What is the literal "address" in the story, and what does the narrator resolve to do with it at the end?', answer: 'The literal address is **46 Marconi Street**, where Mrs',
                  options: ['The literal address is **46 Marconi Street**, where Mrs', 'she decides to take the things back', 'she writes it down for future visits', 'the horrors of war'],
                  hint: 'Review the **PEEL paragraph structure** (Point, Evidence, Explanation, Link) for theme analysis.',
                  misconception: 'Students often think the **primary theme is "the horrors of war" or "the dishonesty of Mrs.' },
                { id: 'b', prompt: 'Explain in your own words why the narrator feels "oppressed" in the living room at 46 Marconi Street, even though she recognizes the woollen table-cloth and.', answer: 'The narrator feels oppressed',
                  options: ['The narrator feels oppressed', 'ugly furniture', 'muggy smell', 'the horrors of war'],
                  hint: 'Review the **PEEL paragraph structure** (Point, Evidence, Explanation, Link) for theme analysis.',
                  misconception: 'Students often think the **primary theme is "the horrors of war" or "the dishonesty of Mrs.' },
                { id: 'c', prompt: 'Analyze the contrast between the narrator\'s first visit (Mrs. Dorling at the door) and second visit (the daughter inside).', answer: '**First visit**: Mrs',
                  options: ['**First visit**: Mrs', 'the horrors of war', 'the **primary theme is "the horrors of war" or "the dishonesty of Mrs'],
                  hint: 'Review the **PEEL paragraph structure** (Point, Evidence, Explanation, Link) for theme analysis.',
                  misconception: 'Students often think the **primary theme is "the horrors of war" or "the dishonesty of Mrs.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['** Ask them to list *only* the narrator\'s *feelings* at three moments: (a) ringing the bell first time, (b) sitting.', '** Have them write one sentence connecting those three feelings using the word "because." (e.g., "She goes from hopeful.', '** Show the last paragraph again. Ask: "Is she sad about the *things* or the *loss of meaning*?" **', '** Co-write a theme statement: "The story shows that ______." Guide them to: "objects cannot carry love once the lover.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
