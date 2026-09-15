import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch15_p1: SimDef = {
    id: 'v3_c12_eng_k_ch15_p1',
    title: 'The Mark on the Wall (Non-fiction) · Part 1/3',
    subtitle: 'A snail-shaped thought: the essay where the plot refuses to show up',
    classLevel: 12, subject: 'eng_k', topic: 'The Mark on the Wall (Non-fiction) · Part 1/3',
    chapters: ['c12_eng_k_ch15'],
    nodeIds: ['c12_eng_k_cbse_15_001', 'c12_eng_k_cbse_15_002', 'c12_eng_k_cbse_15_003', 'c12_eng_k_cbse_15_004', 'c12_eng_k_cbse_15_005', 'c12_eng_k_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist essay reader', intro: 'One smudge on a wall detonates a whole philosophy of mind. Virginia Woolf at her freest.', goal: 'Read The Mark on the Wall as stream of consciousness — where association, not plot, is the architecture.' },
    discovery: {
        question: 'A narrator stares at a mark on the wall and thinks of Shakespeare, snails and the meaning of knowledge — for pages. Where did the plot go?',
        options: ['Nowhere — Woolf replaced events with consciousness itself; the stream of association IS the structure, not a failure of one', 'It got lost — bad writing', 'The mark is a murder mystery clue', 'It\'s a diary, not an essay'],
        answer: 'Nowhere — Woolf replaced events with consciousness itself; the stream of association IS the structure, not a failure of one',
        hook: 'Woolf believed life is \'a luminous halo,\' not a chain of episodes — so stream of consciousness isn\'t first-person rambling but the deliberate music of a mind moving. The mark, the fire, the tree are just launchpads; the real action is thought itself.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" section provides essential biographical, historical, and literary information about Virginia Woolf and the modernist movement to prepare students for the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Surrender the plot and follow the mind: ride one small mark through memories, mockeries of Sunday luncheons and Whitaker\'s precedency, to Woolf\'s larger question — what can anyone actually know?',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine opening a story expecting a beginning, middle, and end, but instead finding a narrator staring at a wall, thinking about Shakespeare, snails, and the.',
            decisions: [{ prompt: 'Who was Virginia Woolf, and what literary group was she associated with?', options: [
                { text: 'Virginia Woolf (1882–1941) was a British modernist novelist, essayist, and publisher,', outcome: 'Virginia Woolf (1882–1941) was a British modernist novelist, essayist, and publisher, central.' },
                { text: 'Victorian novelist', outcome: 'Not quite — Students often think "context" means "summary of the story" or "list of facts about the author\'s.', reveals: 'context-means-summary-of-the' },
                { text: 'Romantic poet', outcome: 'Not quite — Students often think "context" means "summary of the story" or "list of facts about the author\'s.', reveals: 'context-means-summary-of-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are sitting in an exam hall and the invigilator announces “Five minutes left.” Your mind instantly jumps: the ticking clock → your unfinished.',
            decisions: [{ prompt: 'What is the primary narrative technique Virginia Woolf uses in "The Mark on the Wall" to replace a conventional event‑based plot?', options: [
                { text: 'The primary technique is stream‑of‑consciousness narration', outcome: 'The primary technique is stream‑of‑consciousness narration, which presents the continuous.' },
                { text: 'first‑person narration', outcome: 'Not quite — Students often think “stream of consciousness” means “random, disorganized thoughts.” In Woolf.', reveals: 'stream-of-consciousness-means-random' },
                { text: 'flashback', outcome: 'Not quite — Students often think “stream of consciousness” means “random, disorganized thoughts.” In Woolf.', reveals: 'stream-of-consciousness-means-random' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are sitting in a quiet room on a winter afternoon, staring at a small mark on the wall.',
            decisions: [{ prompt: 'What is the primary physical setting of the essay "The Mark on the Wall" as described in the opening paragraph?', options: [
                { text: 'The primary physical setting is a room in winter with a fire burning, a mantelpiece', outcome: 'The primary physical setting is a room in winter with a fire burning, a mantelpiece holding three.' },
                { text: 'a garden', outcome: 'Not quite — Students often think "setting" in this essay is only the room and the mark, and "atmosphere".', reveals: 'setting-in-this-essay-is' },
                { text: 'a train', outcome: 'Not quite — Students often think "setting" in this essay is only the room and the mark, and "atmosphere".', reveals: 'setting-in-this-essay-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet someone who, instead of answering "How are you?", describes the history of the teacup they\'re holding, the geometry of steam, and a childhood.',
            decisions: [{ prompt: 'What is the narrative point of view used in "The Mark on the Wall," and how does it differ from a traditional third-person omniscient.', options: [
                { text: 'The essay uses first-person stream-of-consciousness narration', outcome: 'The essay uses first-person stream-of-consciousness narration.' },
                { text: 'third person limited', outcome: 'Not quite — Students often treat the narrator as Virginia Woolf\'s direct autobiography or as a generic "woman.', reveals: 'students-often-treat-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are sitting in an exam hall and the question asks: "How do the supporting characters in \'The Mark on the Wall\' reveal the narrator\'s state.',
            decisions: [{ prompt: 'List three supporting characters (or figures) that appear in the narrator\'s thoughts in "The Mark on the Wall" and state one thing each.', options: [
                { text: 'Correct answer: (1) The previous occupants of the house', outcome: 'Correct answer: (1) The previous occupants of the house — represent the transience of ownership and.' },
                { text: 'the narrator', outcome: 'Not quite — Students often treat the supporting figures as "characters in a story" with independent existence.', reveals: 'students-often-treat-the-supporting' },
                { text: 'the snail', outcome: 'Not quite — Students often treat the supporting figures as "characters in a story" with independent existence.', reveals: 'students-often-treat-the-supporting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Have you ever stared at a tiny crack on the ceiling and found your mind drifting from a childhood memory to a historical fact to a philosophical question.',
            decisions: [{ prompt: 'What is the primary theme of "The Mark on the Wall" as reflected in the narrator\'s shifting thoughts?', options: [
                { text: 'The primary theme is the fluid, associative nature of human consciousness and the tension', outcome: 'The primary theme is the fluid, associative nature of human consciousness and the tension between.' },
                { text: 'the theme is identifying a snail', outcome: 'Not quite — Students often think the primary theme is the mystery of the mark\'s identity (nail, rose-leaf.', reveals: 'the-primary-theme-is-the' },
                { text: 'focuses only on the mark\'s physical identity (e', outcome: 'Not quite — Students often think the primary theme is the mystery of the mark\'s identity (nail, rose-leaf.', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Reviewing an experiment, the team spots an odd mark in the data and someone demands \'classify it now and move on\'.',
            decisions: [{ prompt: 'What would Woolf\'s mark on the wall suggest?', options: [
                { text: 'Sit with it first — the essay\'s whole method is resisting the reflex to label; let perception roam before deciding, because the premature category decides what you\'re allowed to see.', outcome: 'The mark turns out to be a snail — but the thinking it provoked was the real content; observation before classification is the skill.' },
                { text: 'Label it immediately — a mystery is just a task awaiting a tag.', outcome: 'That\'s the habit Woolf is unweaving: the instant category closes perception and you never see what the thing actually is.', reveals: 'label-first-perception' },
                { text: 'Skip it — if it ends up trivial like a snail, the reflection was wasted anyway.', outcome: 'Judging the process by the triviality of the answer misses that the noticing itself was the point.', reveals: 'process-equals-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read \'nothing happening\' as everything happening — modernism\'s great trade of event for consciousness. This essay rewires how you measure a text.',
            decisions: [{ prompt: 'What comes next? The Mark on the Wall (Non-fiction) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Mark on the Wall (Non-fiction) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" section provides essential.',
          hint: 'If stuck, review c11_eng_h_cbse_01_001: identify the difference between "Virginia Woolf.',
          misconception: 'Students often think "context" means "summary of the story" or "list of facts about the author\'s life." They memorize.',
          parts: [
                { id: 'a', prompt: 'The textbook states: "This essay records fleeting impressions and delicate shades of mental experience." Based on this, predict how the essay will handle (a).', answer: 'time, (',
                  options: ['time, (', 'context', 'summary of the story', 'list of facts about the author\'s life'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_001: identify the difference between "Virginia Woolf was born.',
                  misconception: 'Students often think "context" means "summary of the story" or "list of facts about the author\'s life." They memorize Woolf\'s dates and.' },
                { id: 'b', prompt: 'Compare the opening of "The Mark on the Wall" with a traditional short story opening (e.g., "Once there was a king...").', answer: '**Gains:** Immediate immersion in subjective perception',
                  options: ['**Gains:** Immediate immersion in subjective perception', 'What happens next?', 'Where does this thought go?', 'It\'s boring'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_001: identify the difference between "Virginia Woolf was born.',
                  misconception: 'Students often think "context" means "summary of the story" or "list of facts about the author\'s life." They memorize Woolf\'s dates and.' }
          ],
            remediations: { 'context-means-summary-of-the': { steps: ['**Revisit the blurb in the textbook (p.', '136):** Underline every claim about Woolf\'s *beliefs* (not facts).', '**Watch a 5-min video** on "Bloomsbury Group philosophy" (search "Bloomsbury Group modernism rejection Victorian").', '**Re-read the first two paragraphs of the essay** asking: *Which sentence shows Woolf practicing what the blurb.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_002', difficulty: 'standard',
          question: 'In "The Mark on the Wall," plot refers not to a sequence of external events but.',
          hint: 'If the student cannot distinguish “events outside the character” from “events inside the.',
          misconception: 'Students often think “stream of consciousness” means “random, disorganized thoughts.” In Woolf, every leap has.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative technique Virginia Woolf uses in "The Mark on the Wall" to replace a conventional event‑based plot?', answer: 'The primary technique is stream‑of‑consciousness narration',
                  options: ['The primary technique is stream‑of‑consciousness narration', 'first‑person narration', 'flashback', 'stream of consciousness'],
                  hint: 'If the student cannot distinguish “events outside the character” from “events inside the.',
                  misconception: 'Students often think “stream of consciousness” means “random, disorganized thoughts.” In Woolf, every leap has a traceable trigger (visual.' }
          ],
            remediations: { 'stream-of-consciousness-means-random': { steps: ['Have the student re‑read only the first two pages and highlight every phrase that signals a shift (e.g., “But for that.', 'For each highlight, ask: “What sensory or verbal cue in the previous sentence pulled the mind here?” 3.', 'Draw a flowchart: Mark → nail → miniature → former occupants → lost possessions → tube‑ride metaphor → after‑life.', 'Assign a 5‑minute freewrite imitating the pattern (see Diagnostic Q6) and compare the student’s transitions to Woolf’s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_003', difficulty: 'standard',
          question: 'Setting and atmosphere in "The Mark on the Wall" refer to the physical.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (Setting and Atmosphere in Hornbill) and practice.',
          misconception: 'Students often think "setting" in this essay is only the room and the mark, and "atmosphere" is just the mood.',
          parts: [
                { id: 'a', prompt: 'Analyze how Woolf uses the tree outside the window to reflect the narrator\'s inner state. Provide textual evidence.', answer: 'The tree tapping gently on the pane mirrors the narrator\'s desire for quiet,',
                  options: ['The tree tapping gently on the pane mirrors the narrator\'s desire for quiet,', 'setting', 'atmosphere'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_003 (Setting and Atmosphere in Hornbill) and practice listing.',
                  misconception: 'Students often think "setting" in this essay is only the room and the mark, and "atmosphere" is just the mood.' }
          ],
            remediations: { 'setting-in-this-essay-is': { steps: ['If a student cannot distinguish physical setting from mental landscape, have them: (1) reread the first three.', '(2) Then highlight every sentence that moves away from the room (knights, former occupants, lost possessions.', '(3) Discuss how each mental leap is sparked by a physical detail.', '(4) Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a stream-of-consciousness essay.',
          hint: 'If confused, revisit c11_eng_h_cbse_01_004 (Character Analysis: Protagonist in "The.',
          misconception: 'Students often treat the narrator as Virginia Woolf\'s direct autobiography or as a generic "woman thinking." The.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view used in "The Mark on the Wall," and how does it differ from a traditional third-person omniscient narration in terms.', answer: 'The essay uses first-person stream-of-consciousness narration',
                  options: ['The essay uses first-person stream-of-consciousness narration', 'third person limited'],
                  hint: 'If confused, revisit c11_eng_h_cbse_01_004 (Character Analysis: Protagonist in "The Portrait of.',
                  misconception: 'Students often treat the narrator as Virginia Woolf\'s direct autobiography or as a generic "woman thinking." The narrator is a constructed.' },
                { id: 'b', prompt: 'Compare the narrator\'s portrayal of the "antiquary" (retired Colonel) with her portrayal of "professors or specialists." What does this comparison reveal about.', answer: 'Both are satirized: the antiquary obsesses over trivial classifications (camp vs',
                  options: ['Both are satirized: the antiquary obsesses over trivial classifications (camp vs', 'Whitaker\'s'],
                  hint: 'If confused, revisit c11_eng_h_cbse_01_004 (Character Analysis: Protagonist in "The Portrait of.',
                  misconception: 'Students often treat the narrator as Virginia Woolf\'s direct autobiography or as a generic "woman thinking." The narrator is a constructed.' }
          ],
            remediations: { 'students-often-treat-the-narrator': { steps: ['Re-read the first three paragraphs of the essay aloud, marking every "I" statement.', 'List 10 distinct topics the mind visits (e.g., previous tenants, lost possessions, Shakespeare, antiquary).', 'For each, ask: "What does this reveal about the thinker\'s values/fears/desires?" 4.', 'Revisit c12_eng_k_cbse_15_002 (Plot/Narrative Structure) to confirm the non-linear structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_005', difficulty: 'standard',
          question: 'Supporting characters in "The Mark on the Wall" are the figures — real.',
          hint: 'If stuck, review the definition of stream-of-consciousness in c12_eng_k_cbse_15_002 (Plot.',
          misconception: 'Students often treat the supporting figures as "characters in a story" with independent existence, analyzing them for.',
          parts: [
                { id: 'a', prompt: 'List three supporting characters (or figures) that appear in the narrator\'s thoughts in "The Mark on the Wall" and state one thing each represents.', answer: 'Correct answer: (1) The previous occupants of the house',
                  options: ['Correct answer: (1) The previous occupants of the house', 'the narrator', 'the snail'],
                  hint: 'If stuck, review the definition of stream-of-consciousness in c12_eng_k_cbse_15_002 (Plot and.',
                  misconception: 'Students often treat the supporting figures as "characters in a story" with independent existence, analyzing them for personality traits.' }
          ],
            remediations: { 'students-often-treat-the-supporting': { steps: ['If a student cannot distinguish mental projections from narrative characters, guide them through this 3-step.', '(2) For each figure, ask: "Does the narrator see/hear this person, or does she *invent* them?" (3) Rewrite one.', 'Then re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the supporting figures as "characters in a story" with independent existence, analyzing them for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The final voice (\'I\'m going out to buy a newspaper...', answer: 'Correct answer: Challenge',
                  options: ['Correct answer: Challenge', 'agrees reveals a plot-based reading habit'],
                  hint: 'If stuck, review the definition of stream-of-consciousness in c12_eng_k_cbse_15_002 (Plot and.',
                  misconception: 'Students often treat the supporting figures as "characters in a story" with independent existence, analyzing them for personality traits.' }
          ],
            remediations: { 'students-often-treat-the-supporting': { steps: ['If a student cannot distinguish mental projections from narrative characters, guide them through this 3-step.', '(2) For each figure, ask: "Does the narrator see/hear this person, or does she *invent* them?" (3) Rewrite one.', 'Then re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_15_006', difficulty: 'standard',
          question: 'The primary theme of "The Mark on the Wall" is the fluid, associative nature.',
          hint: 'If stuck, review the definition of stream of consciousness in Class 11 Hornbill Chapter 1.',
          misconception: 'Students often think the primary theme is the mystery of the mark\'s identity (nail, rose-leaf, snail) and that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of "The Mark on the Wall" is the fluid, associative nature of human',
                  options: ['The primary theme of "The Mark on the Wall" is the fluid, associative nature of human', 'The "Before You Read: Context and Background" section provides essential biographical,', 'In "The Mark on the Wall," plot refers not to a sequence of external events but to the', 'Setting and atmosphere in "The Mark on the Wall" refer to the physical environment (a'],
                  hint: 'If stuck, review the definition of stream of consciousness in Class 11 Hornbill Chapter 1 (The.',
                  misconception: 'Students often think the primary theme is the mystery of the mark\'s identity (nail, rose-leaf, snail) and that the essay is a puzzle to.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['If a student insists on the mark\'s identity as the theme, guide them to re-read the paragraph where the narrator says.', 'Matter for further speculation?', 'I can think sitting still as well as standing up." Ask: "Does the narrator care about the answer?" Then have them list.', 'Finally, ask them to write a one-sentence theme statement that does not mention the mark.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
