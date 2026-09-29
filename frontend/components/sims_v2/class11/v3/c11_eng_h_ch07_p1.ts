import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch07_p1: SimDef = {
    id: 'v3_c11_eng_h_ch07_p1',
    title: 'The Adventure · Part 1/3',
    subtitle: 'Distinguish a parallel present from time travel in a scientist\'s alternate history.',
    classLevel: 11, subject: 'eng_h', topic: 'The Adventure · Part 1/3',
    chapters: ['c11_eng_h_ch07'],
    nodeIds: ['c11_eng_h_cbse_07_001', 'c11_eng_h_cbse_07_002', 'c11_eng_h_cbse_07_003', 'c11_eng_h_cbse_07_004', 'c11_eng_h_cbse_07_005', 'c11_eng_h_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physicist auditing a historian\'s two missing days', intro: 'A truck, a blackout, and a Bombay where the East India Company still stands — explain it without calling it a dream.', goal: 'Explain the story\'s frame structure and the scientific ideas powering its alternate history.' },
    discovery: {
        question: 'Professor Gaitonde wakes in a Bombay where the Marathas won Panipat. Did he travel back to 1761?',
        options: ['No — he shifted to a parallel present where that past unfolded differently; he never left his own century', 'Yes — the truck collision sent his body to 1761', 'Yes — but only his mind travelled, in a dream', 'No — he hallucinated while comatose, and the story says so'],
        answer: 'No — he shifted to a parallel present where that past unfolded differently; he never left his own century',
        hook: 'Not time travel but a sidestep — many-worlds says another \'now\' exists where Panipat went the other way.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Laburnum Top\' (Hornbill, ch. 7) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the frame story from the inner alternate history, map the Bombay episode onto five dramatic stages, and judge whether Rajendra\'s physics is real resolution or decoration.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Laburnum Top\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the author of "The Adventure" and what is his primary professional identity that informs the scientific basis of this story?', options: [
                { text: 'The author is Jayant Narlikar, a renowned Indian astrophysicist and cosmologist', outcome: 'The author is Jayant Narlikar, a renowned Indian astrophysicist and cosmologist.' },
                { text: 'The Adventure', outcome: 'Not quite — Students often think "The Adventure" is a time-travel story where Professor Gaitonde physically.', reveals: 'the-adventure-is-a-time' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Laburnum Top\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'Define "frame narrative" and identify the outer and inner frames in "The Adventure."', options: [
                { text: 'A frame narrative is a story within a story where an outer narrative "frames" an inner', outcome: 'A frame narrative is a story within a story where an outer narrative "frames" an inner narrative.' },
                { text: 'main story', outcome: 'Not quite — Students consistently confuse **plot** (the chronological sequence of events in the story world).', reveals: 'students-consistently-confuse-plot-the' },
                { text: 'flashback', outcome: 'Not quite — Students consistently confuse **plot** (the chronological sequence of events in the story world).', reveals: 'students-consistently-confuse-plot-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Laburnum Top\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the two primary physical settings in "The Adventure" where Professor Gaitonde experiences the alternative reality?', options: [
                { text: 'The two primary physical settings are Pune (where Professor Gaitonde lives and has the', outcome: 'The two primary physical settings are Pune (where Professor Gaitonde lives and has the accident).' },
                { text: 'Delhi and Pune', outcome: 'Not quite — Students often think "setting" is just a list of places and times, and "atmosphere" is just.', reveals: 'setting-is-just-a-list' },
                { text: 'only Bombay', outcome: 'Not quite — Students often think "setting" is just a list of places and times, and "atmosphere" is just.', reveals: 'setting-is-just-a-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Laburnum Top\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is Professor Gaitonde\'s profession and how does it shape his initial reaction to the alternate reality he experiences?', options: [
                { text: 'Professor Gaitonde is a historian', outcome: 'Professor Gaitonde is a historian. His professional training makes him initially skeptical and.' },
                { text: 'he is a scientist who immediately accepts the parallel world', outcome: 'Not quite — Students often treat Professor Gaitonde as a mere plot device for the alternate history concept.', reveals: 'students-often-treat-professor-gaitonde' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Laburnum Top\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "The Adventure" as distinct from its plot? State it in one precise sentence.', options: [
                { text: '**Correct Answer:** The primary theme is the **contingency of history and the existence', outcome: '**Correct Answer:** The primary theme is the **contingency of history and the existence.' },
                { text: 'time travel', outcome: 'Not quite — **Students conflate "alternate history" (a sub-genre of fiction) with the story\'s *theme*.', reveals: 'students-conflate-alternate-history-a' },
                { text: 'Professor Gaitonde\'s dream', outcome: 'Not quite — **Students conflate "alternate history" (a sub-genre of fiction) with the story\'s *theme*.', reveals: 'students-conflate-alternate-history-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your book club discusses \'The Adventure\'. One member summarises: \'Professor Gaitonde time-travels to 1761, and his presence near the battle makes the Marathas win — classic butterfly-effect time travel.\'',
            decisions: [{ prompt: 'Is that what the story does?', options: [
                { text: 'No — it\'s a many-worlds shift, not time travel: Gaitonde never visits 1761; the collision triggers a catastrophic transition so his consciousness lands in a parallel PRESENT — a modern Bombay (Victoria Terminus, Forbes building) where the Marathas won long ago. He meets the outcome, not the battle.', outcome: 'Alternate history ≠ time travel: the divergence happened in the past, but the professor experiences a contemporary world-line that branched from it.' },
                { text: 'The summary is right — he goes back and changes the result at Panipat.', outcome: 'He changes nothing and goes nowhere backward — he observes a world-line where events already differed; the \'travel\' is horizontal between presents, not diagonal into 1761.', reveals: 'alternate-history-is-time-travel' },
                { text: 'It\'s a dream — the truck crash knocked him out and he hallucinated the other Bombay.', outcome: 'Narlikar, an astrophysicist, grounds it in catastrophe theory and quantum branching — the story insists on a physical mechanism, not \'it was all a dream\'.', reveals: 'it-was-all-a-dream' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Narlikar the astrophysicist smuggled real theory into fiction — the torn Bakhar page is the clue that refuses to stay a dream.',
            decisions: [{ prompt: 'What comes next? The Adventure · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Adventure · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_001', difficulty: 'standard',
          question: '\'The Laburnum Top\' (Hornbill, ch. 7) — the context and background to this text.',
          hint: 'Review the Class 10 History chapter on "The Rise of British Power in India" (or.',
          misconception: 'Students often think "The Adventure" is a time-travel story where Professor Gaitonde physically goes back to 1761 and.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "The Adventure" and what is his primary professional identity that informs the scientific basis of this story?', answer: 'The author is Jayant Narlikar, a renowned Indian astrophysicist and cosmologist',
                  options: ['The author is Jayant Narlikar, a renowned Indian astrophysicist and cosmologist', 'The Adventure'],
                  hint: 'Review the Class 10 History chapter on "The Rise of British Power in India" (or equivalent) for the.',
                  misconception: 'Students often think "The Adventure" is a time-travel story where Professor Gaitonde physically goes back to 1761 and changes history.' }
          ],
            remediations: { 'the-adventure-is-a-time': { steps: ['If the student confuses alternate history with time travel: (1) Draw a simple diagram: two vertical lines labeled.', '(2) Mark "Professor Gaitonde" on World A at "Present Day" with an arrow showing his consciousness jumping horizontally.', '(3) Ask: "Does he meet Shivaji or the Peshwas in 1761?" (No, he sees their *descendants* ruling a modern India.) (4).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Laburnum Top\' — what happens, in what order, and.',
          hint: 'If stuck, review "narrative levels" and "frame narrative" using the Class 10 parable.',
          misconception: 'Students consistently confuse **plot** (the chronological sequence of events in the story world) with **narrative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'The Laburnum Top\'',
                  options: ['The plot/narrative arc of \'The Laburnum Top\'', '\'The Laburnum Top\' (Hornbill, ch', 'The setting of \'The Laburnum Top\'', 'Character analysis in \'The Laburnum Top\''],
                  hint: 'If stuck, review "narrative levels" and "frame narrative" using the Class 10 parable analysis.',
                  misconception: 'Students consistently confuse **plot** (the chronological sequence of events in the story world) with **narrative structure** (the order.' }
          ],
            remediations: { 'students-consistently-confuse-plot-the': { steps: ['If a student cannot separate plot from structure: (1) Have them draw two timelines side-by-side—one labeled "Story.', '(2) Ask them to number each event on both timelines; the mismatch (e.g., the hospital scene is last in story time but.', '(3) Give them a 3-sentence micro-story with a flashback and ask them to identify the two timelines—this isolates the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_003', difficulty: 'standard',
          question: 'The setting of \'The Laburnum Top\' — the place, time and atmosphere the text.',
          hint: 'If stuck, re-read the "Before You Read" section (node 001) for the Panipat context, and.',
          misconception: 'Students often think "setting" is just a list of places and times, and "atmosphere" is just a synonym for "weather.".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the atmosphere changes when Professor Gaitonde moves from the real world to the alternative Bombay.', answer: 'In the real world, the atmosphere is ordinary and routine',
                  options: ['In the real world, the atmosphere is ordinary and routine', 'the buildings look different', 'setting', 'atmosphere'],
                  hint: 'If stuck, re-read the "Before You Read" section (node 001) for the Panipat context, and the plot.',
                  misconception: 'Students often think "setting" is just a list of places and times, and "atmosphere" is just a synonym for "weather." In "The Adventure,".' },
                { id: 'b', prompt: 'Identify three descriptive phrases from the text that establish the atmosphere of the alternative Bombay, and explain what mood each phrase creates.', answer: 'Example phrases: (1) "a world where the Marathas had won"',
                  options: ['Example phrases: (1) "a world where the Marathas had won"', 'crowded streets', 'setting', 'atmosphere'],
                  hint: 'If stuck, re-read the "Before You Read" section (node 001) for the Panipat context, and the plot.',
                  misconception: 'Students often think "setting" is just a list of places and times, and "atmosphere" is just a synonym for "weather." In "The Adventure,".' },
                { id: 'c', prompt: 'Compare the role of the train journey in the real world versus the alternative world.', answer: 'In the real world, the train journey is mundane—a routine commute',
                  options: ['In the real world, the train journey is mundane—a routine commute', 'setting', 'atmosphere', 'weather'],
                  hint: 'If stuck, re-read the "Before You Read" section (node 001) for the Panipat context, and the plot.',
                  misconception: 'Students often think "setting" is just a list of places and times, and "atmosphere" is just a synonym for "weather." In "The Adventure,".' }
          ],
            remediations: { 'setting-is-just-a-list': { steps: ['If a student cannot distinguish setting from atmosphere, use a two-column table: left column "Setting Details" (quotes.', 'Have them fill it for three scenes: the accident site, the train, the library.', 'Then ask: "Which column tells you where/when?', 'Which tells you how it feels?" This concrete separation builds the distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_004', difficulty: 'standard',
          question: 'Character analysis in \'The Laburnum Top\' — the central figure(s), their traits.',
          hint: 'Review the PEEL paragraph structure from c10_engl_cbse_04_009 (Anne Frank analysis) and.',
          misconception: 'Students often treat Professor Gaitonde as a mere plot device for the alternate history concept, analyzing the.',
          parts: [
                { id: 'a', prompt: 'What is Professor Gaitonde\'s profession and how does it shape his initial reaction to the alternate reality he experiences?', answer: 'Professor Gaitonde is a historian',
                  options: ['Professor Gaitonde is a historian', 'he is a scientist who immediately accepts the parallel world'],
                  hint: 'Review the PEEL paragraph structure from c10_engl_cbse_04_009 (Anne Frank analysis) and practice.',
                  misconception: 'Students often treat Professor Gaitonde as a mere plot device for the alternate history concept, analyzing the *history* he discovers.' },
                { id: 'b', prompt: 'Explain why Professor Gaitonde\'s decision to occupy the presidential chair at the Azad Maidan lecture is a pivotal character moment.', answer: 'The empty presidential chair symbolizes authority and historical legitimacy',
                  options: ['The empty presidential chair symbolizes authority and historical legitimacy', 'he was just confused'],
                  hint: 'Review the PEEL paragraph structure from c10_engl_cbse_04_009 (Anne Frank analysis) and practice.',
                  misconception: 'Students often treat Professor Gaitonde as a mere plot device for the alternate history concept, analyzing the *history* he discovers.' },
                { id: 'c', prompt: 'Compare Professor Gaitonde\'s approach to the alternate history with a typical science fiction protagonist who travels to a parallel world.', answer: 'Typical SF protagonists explore or exploit the new world',
                  options: ['Typical SF protagonists explore or exploit the new world', 'he is curious like any protagonist'],
                  hint: 'Review the PEEL paragraph structure from c10_engl_cbse_04_009 (Anne Frank analysis) and practice.',
                  misconception: 'Students often treat Professor Gaitonde as a mere plot device for the alternate history concept, analyzing the *history* he discovers.' }
          ],
            remediations: { 'students-often-treat-professor-gaitonde': { steps: ['If a student cannot distinguish Gaitonde\'s character from the plot events: Step 1 — Create a two-column table: left.', 'Step 2 — For each right-column action, ask "What trait does this show?" (intellectual courage, evidentiary rigor, need.', 'Step 3 — Have the student write one paragraph using only right-column actions as evidence.', 'Step 4 — Compare with a sample answer that analyzes the left-column events as character revelation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Professor Gaitonde as a mere plot device for the alternate history concept, analyzing the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Professor Gaitonde is a passive observer to whom things happen, not an active agent driving the narrative." Defend your position with.', answer: 'The claim is false',
                  options: ['The claim is false', 'lack of physical control over the transition', 'narrative passivity'],
                  hint: 'Review the PEEL paragraph structure from c10_engl_cbse_04_009 (Anne Frank analysis) and practice.',
                  misconception: 'Students often treat Professor Gaitonde as a mere plot device for the alternate history concept, analyzing the *history* he discovers.' }
          ],
            remediations: { 'students-often-treat-professor-gaitonde': { steps: ['If a student cannot distinguish Gaitonde\'s character from the plot events: Step 1 — Create a two-column table: left.', 'Step 2 — For each right-column action, ask "What trait does this show?" (intellectual courage, evidentiary rigor, need.', 'Step 3 — Have the student write one paragraph using only right-column actions as evidence.', 'Step 4 — Compare with a sample answer that analyzes the left-column events as character revelation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Laburnum Top\' — the secondary figures who move.',
          hint: 'Review c11_eng_h_cbse_07_004 (Protagonist Analysis) to re-establish Gaitonde\'s character.',
          misconception: 'Students believe supporting character analysis means writing a biography of each character — listing their background.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Khan Sahib\'s casual reference to the "Maratha victory at Panipat" is more effective world-building than a history textbook.', answer: 'Correct answer: Khan Sahib\'s offhand mention normalizes the alternate history',
                  options: ['Correct answer: Khan Sahib\'s offhand mention normalizes the alternate history', 'plot information'],
                  hint: 'Review c11_eng_h_cbse_07_004 (Protagonist Analysis) to re-establish Gaitonde\'s character, then.',
                  misconception: 'Students believe supporting character analysis means writing a biography of each character — listing their background, personality traits.' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['If a student writes character biographies instead of functional analysis: (1) Have them re-read Khan Sahib\'s scene and.', '(3) Practice with the Anglo-Indian receptionist: her entire appearance is 3 lines — ask the student to extract 3.', 'This trains the eye to see function over personality.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_006', difficulty: 'standard',
          question: 'The primary theme of \'The Laburnum Top\' — the central idea the whole text.',
          hint: 'If stuck, review **c11_eng_h_cbse_07_002 (Plot)** for the sequence of realities, and.',
          misconception: '**Students conflate "alternate history" (a sub-genre of fiction) with the story\'s *theme* of "quantum branching.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'The Laburnum Top\'',
                  options: ['The primary theme of \'The Laburnum Top\'', '\'The Laburnum Top\' (Hornbill, ch', 'The plot/narrative arc of \'The Laburnum Top\'', 'The setting of \'The Laburnum Top\''],
                  hint: 'If stuck, review **c11_eng_h_cbse_07_002 (Plot)** for the sequence of realities, and.',
                  misconception: '**Students conflate "alternate history" (a sub-genre of fiction) with the story\'s *theme* of "quantum branching of reality."** They treat.' }
          ],
            remediations: { 'students-conflate-alternate-history-a': { steps: ['** Have the student re-read the dialogue between Gaitonde and Rajendra Deshpande (pages 62-64 in Hornbill) **only for.', '** Ask them to define "Catastrophe Theory" and "lack of determinism in quantum theory" in their own words using.', '** Give them a 3-column table: *Micro-Change (Bifurcation)* | *Branch A Outcome* | *Branch B Outcome*.', '** Ask: "If the torn page is real, what does that prove about the *status* of the alternate world?" Force the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
