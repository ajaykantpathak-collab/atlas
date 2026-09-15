import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch07_p3: SimDef = {
    id: 'v3_c11_eng_h_ch07_p3',
    title: 'The Adventure · Part 3/3',
    subtitle: 'Distinguish a parallel present from time travel in a scientist\'s alternate history.',
    classLevel: 11, subject: 'eng_h', topic: 'The Adventure · Part 3/3',
    chapters: ['c11_eng_h_ch07'],
    nodeIds: ['c11_eng_h_cbse_07_013', 'c11_eng_h_cbse_07_014', 'c11_eng_h_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physicist auditing a historian\'s two missing days', intro: 'A truck, a blackout, and a Bombay where the East India Company still stands — explain it without calling it a dream.', goal: 'Explain the story\'s frame structure and the scientific ideas powering its alternate history.' },
    discovery: {
        question: 'Professor Gaitonde wakes in a Bombay where the Marathas won Panipat. Did he travel back to 1761?',
        options: ['No — he shifted to a parallel present where that past unfolded differently; he never left his own century', 'Yes — the truck collision sent his body to 1761', 'Yes — but only his mind travelled, in a dream', 'No — he hallucinated while comatose, and the story says so'],
        answer: 'No — he shifted to a parallel present where that past unfolded differently; he never left his own century',
        hook: 'Not time travel but a sidestep — many-worlds says another \'now\' exists where Panipat went the other way.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literature involves systematically analyzing a text\'s explicit and implicit meanings, evaluating the author\'s narrative choices, and interpreting how literary elements (plot.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_07_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the frame story from the inner alternate history, map the Bombay episode onto five dramatic stages, and judge whether Rajendra\'s physics is real resolution or decoration.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you have just finished reading "The Adventure" and your teacher asks you to write an essay on the theme of alternative history.',
            decisions: [{ prompt: 'List the six writing formats taught in the NCERT writing skills section for this chapter.', options: [
                { text: 'The six formats are: note-making, summarising, sub-titling, essay-writing,', outcome: 'The six formats are: note-making, summarising, sub-titling, essay-writing, letter-writing, and.' },
                { text: 'diary entry', outcome: 'Not quite — Students often think writing based on a chapter means simply retelling the story.', reveals: 'writing-based-on-a-chapter' },
                { text: 'report writing', outcome: 'Not quite — Students often think writing based on a chapter means simply retelling the story.', reveals: 'writing-based-on-a-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are sitting in a circle with classmates for an assessed group discussion on "The Adventure".',
            decisions: [{ prompt: 'What is the primary purpose of a speaking and listening discussion point assessment based on a literary text like "The Adventure"?', options: [
                { text: 'The primary purpose is to evaluate', outcome: 'The primary purpose is to evaluate a student\'s ability to articulate text-based interpretations.' },
                { text: 'to share personal opinions about the story', outcome: 'Not quite — Students believe a "discussion point" is just an opinion or a plot summary.', reveals: 'a-discussion-point-is-just' },
                { text: 'discussion point', outcome: 'Not quite — Students believe a "discussion point" is just an opinion or a plot summary.', reveals: 'a-discussion-point-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your book club discusses \'The Adventure\'. One member summarises: \'Professor Gaitonde time-travels to 1761, and his presence near the battle makes the Marathas win — classic butterfly-effect time travel.\'',
            decisions: [{ prompt: 'Is that what the story does?', options: [
                { text: 'No — it\'s a many-worlds shift, not time travel: Gaitonde never visits 1761; the collision triggers a catastrophic transition so his consciousness lands in a parallel PRESENT — a modern Bombay (Victoria Terminus, Forbes building) where the Marathas won long ago. He meets the outcome, not the battle.', outcome: 'Alternate history ≠ time travel: the divergence happened in the past, but the professor experiences a contemporary world-line that branched from it.' },
                { text: 'The summary is right — he goes back and changes the result at Panipat.', outcome: 'He changes nothing and goes nowhere backward — he observes a world-line where events already differed; the \'travel\' is horizontal between presents, not diagonal into 1761.', reveals: 'alternate-history-is-time-travel' },
                { text: 'It\'s a dream — the truck crash knocked him out and he hallucinated the other Bombay.', outcome: 'Narlikar, an astrophysicist, grounds it in catastrophe theory and quantum branching — the story insists on a physical mechanism, not \'it was all a dream\'.', reveals: 'it-was-all-a-dream' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'Narlikar the astrophysicist smuggled real theory into fiction — the torn Bakhar page is the clue that refuses to stay a dream.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_013', difficulty: 'standard',
          question: 'Critical thinking in literature involves systematically analyzing a text\'s.',
          hint: 'If stuck, return to c11_eng_h_cbse_07_002 (Plot) and create a two-column timeline.',
          misconception: 'Students often treat the quantum physics references (catastrophe theory, many-worlds interpretation) as *metaphors* for.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "narrative focalization" to analyze the shift in Chapter 7 when the narrative moves from describing Gaitonde\'s external actions in the.', answer: 'Segment 1 (external actions): **Zero focalization / external focalization**',
                  options: ['Segment 1 (external actions): **Zero focalization / external focalization**', 'third-person narration'],
                  hint: 'If stuck, return to c11_eng_h_cbse_07_002 (Plot) and create a two-column timeline: "Events in Real.',
                  misconception: 'Students often treat the quantum physics references (catastrophe theory, many-worlds interpretation) as *metaphors* for the story\'s themes.' }
          ],
            remediations: { 'students-often-treat-the-quantum': { steps: ['Have the student reread the Rajendra Deshpande explanation scene (paragraphs starting "You have passed through.', '*psychological* verbs ("imagined," "dreamed," "hallucinated").', 'Ask: "If this were a dream, why does the torn page exist in the final paragraph?" 3.', 'Assign a micro-task: Rewrite the last three paragraphs *as if* the physics were metaphorical (Gaitonde wakes up,.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "The Adventure" refers to the ability.',
          hint: 'Review the note-making steps in the NCERT textbook (pages 70-76) and the PEEL structure.',
          misconception: 'Students often think writing based on a chapter means simply retelling the story.',
          parts: [
                { id: 'a', prompt: 'List the six writing formats taught in the NCERT writing skills section for this chapter.', answer: 'The six formats are: note-making, summarising, sub-titling, essay-writing,',
                  options: ['The six formats are: note-making, summarising, sub-titling, essay-writing,', 'diary entry', 'report writing', 'diary entry" or "report writing'],
                  hint: 'Review the note-making steps in the NCERT textbook (pages 70-76) and the PEEL structure from Class.',
                  misconception: 'Students often think writing based on a chapter means simply retelling the story.' },
                { id: 'b', prompt: 'Given a paragraph from "The Adventure" describing the alternative Battle of Panipat, write three note-making points using the correct format (hierarchical.', answer: 'Example points: 1',
                  options: ['Example points: 1', 'The Marathas won the battle because', 'writing based on a chapter means simply retelling the story'],
                  hint: 'Review the note-making steps in the NCERT textbook (pages 70-76) and the PEEL structure from Class.',
                  misconception: 'Students often think writing based on a chapter means simply retelling the story.' }
          ],
            remediations: { 'writing-based-on-a-chapter': { steps: ['If a student retells instead of analyzing, have them: 1) Identify the format\'s purpose (e.g., essay = argue a thesis).', '2) Highlight textual evidence that supports a claim, not just plot points.', '3) Practice converting a plot point into an analytical point using PEEL (Point, Evidence, Explanation, Link).', '4) Rewrite a paragraph focusing on \'why\' and \'how\' rather than \'what happened\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for "The Adventure" refers to the.',
          hint: 'If stuck, review c11_eng_h_cbse_07_013 (Critical Thinking) for how to evaluate the two.',
          misconception: 'Students believe a "discussion point" is just an opinion or a plot summary.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a speaking and listening discussion point assessment based on a literary text like "The Adventure"?', answer: 'The primary purpose is to evaluate',
                  options: ['The primary purpose is to evaluate', 'to share personal opinions about the story', 'discussion point', 'a "discussion point" is just an opinion or a plot summary'],
                  hint: 'If stuck, review c11_eng_h_cbse_07_013 (Critical Thinking) for how to evaluate the two theories.',
                  misconception: 'Students believe a "discussion point" is just an opinion or a plot summary.' },
                { id: 'b', prompt: 'Explain why simply stating "Professor Gaitonde imagined everything" is an insufficient discussion point for this chapter.', answer: 'It is insufficient',
                  options: ['It is insufficient', 'because the story is fiction anyway', 'discussion point', 'a "discussion point" is just an opinion or a plot summary'],
                  hint: 'If stuck, review c11_eng_h_cbse_07_013 (Critical Thinking) for how to evaluate the two theories.',
                  misconception: 'Students believe a "discussion point" is just an opinion or a plot summary.' }
          ],
            remediations: { 'a-discussion-point-is-just': { steps: ['Have the student re-read the Rajendra-Gaitonde hospital dialogue (last 3 pages) and underline every scientific term.', 'Ask them to convert each term into a discussion question: "How does \'perturbation\' explain the missing train?" 3.', 'Model one evidence-based point together: "Text says \'the trajectory changed at the Battle of Panipat\' → This is.', 'Practice a 2-minute timed response using the structure: "Evidence → Concept → Question for group."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a "discussion point" is just an opinion or a plot summary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of this discussion strategy: "I will prepare five memorized points and deliver them regardless of what others say." Justify your.', answer: 'This strategy is ineffective',
                  options: ['This strategy is ineffective', 'discussion point', 'a "discussion point" is just an opinion or a plot summary'],
                  hint: 'If stuck, review c11_eng_h_cbse_07_013 (Critical Thinking) for how to evaluate the two theories.',
                  misconception: 'Students believe a "discussion point" is just an opinion or a plot summary.' }
          ],
            remediations: { 'a-discussion-point-is-just': { steps: ['Have the student re-read the Rajendra-Gaitonde hospital dialogue (last 3 pages) and underline every scientific term.', 'Ask them to convert each term into a discussion question: "How does \'perturbation\' explain the missing train?" 3.', 'Model one evidence-based point together: "Text says \'the trajectory changed at the Battle of Panipat\' → This is.', 'Practice a 2-minute timed response using the structure: "Evidence → Concept → Question for group."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
