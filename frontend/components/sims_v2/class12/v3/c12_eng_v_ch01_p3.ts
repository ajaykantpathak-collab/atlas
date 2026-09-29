import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch01_p3: SimDef = {
    id: 'v3_c12_eng_v_ch01_p3',
    title: 'The Third Level · Part 3/3',
    subtitle: 'Grand Central has two levels — Charley found a third',
    classLevel: 12, subject: 'eng_v', topic: 'The Third Level · Part 3/3',
    chapters: ['c12_eng_v_ch01'],
    nodeIds: ['c12_eng_v_cbse_01_013', 'c12_eng_v_cbse_01_014', 'c12_eng_v_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Speculative fiction reader', intro: 'An ordinary commuter takes a wrong turn in a station and ends up in 1894. Nobody believes him — and that disbelief is the story.', goal: 'Read The Third Level as the collision of modern anxiety and the fantasy of a gentler past.' },
    discovery: {
        question: 'Charley swears Grand Central has a hidden third level that opens onto 1894. His psychiatrist calls it \'waking-dream wish fulfillment.\' Is the diagnosis a dismissal — or the story\'s whole point?',
        options: ['The point — a world \'full of insecurity, fear, war, worry\' builds its own escape hatch; the third level is modern anxiety given an address', 'A dismissal — Charley is simply lying', 'Proof he\'s insane', 'Evidence of a real tunnel'],
        answer: 'The point — a world \'full of insecurity, fear, war, worry\' builds its own escape hatch; the third level is modern anxiety given an address',
        hook: 'Finney grounds the impossible in the mundane — a tan gabardine suit, a stamp collection, a wife to get home to — so fantasy borrows credibility. Even the stamps are contested ground: the psychiatrist calls them \'refuge,\' Charley calls them inheritance from a gentler era.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Third Level\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow Charley below the platforms: weigh the 1894 evidence — gaslights, Cleveland-era bills, a bought ticket — against the waking-dream diagnosis, and decide what Sam\'s letter proves.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Third Level\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What does the psychiatrist mean by "waking-dream wish fulfillment" in the context of Charley\'s experience?', options: [
                { text: 'The psychiatrist means Charley\'s discovery of the third level is not an objective reality', outcome: 'The psychiatrist means Charley\'s discovery of the third level is not an objective reality but.' },
                { text: 'the psychiatrist thinks Charley is lying', outcome: 'Not quite — Students believe "critical thinking" means picking one interpretation (either "it\'s all in his.', reveals: 'critical-thinking-means-picking-one' },
                { text: 'it means the third level is a dream Charley had while sleeping', outcome: 'Not quite — Students believe "critical thinking" means picking one interpretation (either "it\'s all in his.', reveals: 'critical-thinking-means-picking-one' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Third Level\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does PEEL stand for in the context of writing structured answers for Class 12 English board exams?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the story or writing.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the story or writing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Third Level\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'List three discussion points derived from "The Third Level" that would be suitable for a 10-minute group discussion in a Class 12 ASL.', options: [
                { text: 'Strong discussion points include: (1) "Is the third level a real time portal or a', outcome: 'Strong discussion points include: (1) "Is the third level a real time portal or a psychological.' },
                { text: 'A wrong answer would list factual recall questions like', outcome: 'Not quite — Students believe "discussion points" are just comprehension questions asked aloud.', reveals: 'discussion-points-are-just-comprehension' },
                { text: 'Who is Sam Weiner?', outcome: 'Not quite — Students believe "discussion points" are just comprehension questions asked aloud.', reveals: 'discussion-points-are-just-comprehension' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate drowning in board-exam stress swears he found a forgotten stairwell in the old school block that opens into the town as it looked decades ago — gaslights, quiet streets, no exam timetables. Everyone laughs; he insists it\'s real and keeps trying to go back.',
            decisions: [{ prompt: 'How do you respond, having read \'The Third Level\'?', options: [
                { text: 'Neither mock him nor book a ticket — hear it the way the psychiatrist frames Charley\'s third level: a waking-dream wish fulfillment. Ask what he\'s escaping, because the vividness of the refuge is a map of the anxiety he\'s fleeing.', outcome: 'Finney grounds the fantasy in an ordinary man under \'insecurity, fear, war, worry\' — the experience is psychologically true even if the corridor isn\'t, so the useful move is listening to what the escape is escaping from.' },
                { text: 'Take his detailed description as proof and start searching for the stairwell yourself.', outcome: 'Vivid detail is exactly what makes wish fulfillment convincing — Charley\'s gaslights and derby hats felt real too; treating the description as evidence misses that the detail serves the longing, not the claim.', reveals: 'detail-equals-proof' },
                { text: 'Tell him plainly he\'s making it up and should get back to revision.', outcome: 'That repeats Louisa\'s anger and the friends\' disbelief — the story shows dismissal isolates the believer without touching the wish that produced the dream.', reveals: 'disbelief-fixes-fantasy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now read escapism as diagnosis and desire at once — and see how realism smuggles the impossible past the reader\'s guard.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Third Level\' — analysing the text to reach.',
          hint: 'If stuck, review c12_eng_v_cbse_01_012 for inferential question practice and.',
          misconception: 'Students believe "critical thinking" means picking one interpretation (either "it\'s all in his head" or "time travel.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Third Level\'',
                  options: ['Critical thinking on \'The Third Level\'', '\'The Third Level\' (Vistas, ch', 'The plot/narrative arc of \'The Third Level\'', 'The setting of \'The Third Level\''],
                  hint: 'If stuck, review c12_eng_v_cbse_01_012 for inferential question practice and c11_eng_h_cbse_01_013.',
                  misconception: 'Students believe "critical thinking" means picking one interpretation (either "it\'s all in his head" or "time travel is real") and.' }
          ],
            remediations: { 'critical-thinking-means-picking-one': { steps: ['Have the student re-read the psychiatrist\'s dialogue (para 1) and Charley\'s counter-arguments (grandfather\'s peaceful.', 'Create a two-column table: "Evidence for Psychological Escape" vs.', 'Practice writing a PEEL paragraph that *starts* with "The text supports both readings..." and uses evidence from both.', 'Re-attempt Diagnostic Question 5. If still stuck, revisit c12_eng_v_cbse_01_009 (Irony and Symbolism) to see how the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical thinking" means picking one interpretation (either "it\'s all in his head" or "time travel.',
          parts: [
                { id: 'a', prompt: 'Evaluate the psychiatrist\'s diagnosis versus Charley\'s physical evidence. Which interpretation is better supported by the text?', answer: 'The text deliberately balances both',
                  options: ['The text deliberately balances both', 'obviously correct', 'critical thinking', 'it\'s all in his head'],
                  hint: 'If stuck, review c12_eng_v_cbse_01_012 for inferential question practice and c11_eng_h_cbse_01_013.',
                  misconception: 'Students believe "critical thinking" means picking one interpretation (either "it\'s all in his head" or "time travel is real") and.' }
          ],
            remediations: { 'critical-thinking-means-picking-one': { steps: ['Have the student re-read the psychiatrist\'s dialogue (para 1) and Charley\'s counter-arguments (grandfather\'s peaceful.', 'Create a two-column table: "Evidence for Psychological Escape" vs.', 'Practice writing a PEEL paragraph that *starts* with "The text supports both readings..." and uses evidence from both.', 'Re-attempt Diagnostic Question 5. If still stuck, revisit c12_eng_v_cbse_01_009 (Irony and Symbolism) to see how the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills from \'The Third Level\' — using the text as a model.',
          hint: 'If unable to write PEEL paragraphs, revisit Class 11 Writing Skills.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch.',
          parts: [
                { id: 'a', prompt: 'What does PEEL stand for in the context of writing structured answers for Class 12 English board exams?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Conclusion', 'writing skills based on the chapter'],
                  hint: 'If unable to write PEEL paragraphs, revisit Class 11 Writing Skills (c11_eng_w_cbse_01_014) for the.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch.' },
                { id: 'b', prompt: 'A student writes: "Charley escapes because he is unhappy. He collects stamps and finds the third level.', answer: 'Flaw 1: No PEEL structure',
                  options: ['Flaw 1: No PEEL structure', 'grammar errors', 'writing skills based on the chapter'],
                  hint: 'If unable to write PEEL paragraphs, revisit Class 11 Writing Skills (c11_eng_w_cbse_01_014) for the.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch.' },
                { id: 'c', prompt: 'Write a 4-sentence PEEL paragraph answering: "How does the description of the third level establish its historical authenticity?" Use at least two specific.', answer: 'Point: Finney uses dense sensory details to authenticate the third level as 1894',
                  options: ['Point: Finney uses dense sensory details to authenticate the third level as 1894', 'writing skills based on the chapter'],
                  hint: 'If unable to write PEEL paragraphs, revisit Class 11 Writing Skills (c11_eng_w_cbse_01_014) for the.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student cannot produce a PEEL paragraph with two textual evidences: 1) Revisit c12_eng_v_cbse_01_012.', '2) Revisit c11_eng_h_cbse_01_014 / c11_eng_w_cbse_01_014 (Class 11 Writing Skills) for PEEL refresher with simpler.', '3) Do a targeted drill: give the student 3 insight questions from "The Third Level", ask them to highlight 2 quotes per.', '4) Re-diagnose using DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_015', difficulty: 'standard',
          question: 'Discussion points on \'The Third Level\' — speaking and listening around the text.',
          hint: 'If stuck, revisit c12_eng_v_cbse_01_013 (Critical Thinking) for analysis models and.',
          misconception: 'Students believe "discussion points" are just comprehension questions asked aloud.',
          parts: [
                { id: 'a', prompt: 'Explain why the question "Do you think Charley was mentally ill?" is a poor discussion point for this chapter, and rewrite it to make it effective.', answer: 'The original question is poor',
                  options: ['The original question is poor', 'discussion points', '"discussion points" are just comprehension questions asked aloud'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_01_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students believe "discussion points" are just comprehension questions asked aloud.' },
                { id: 'b', prompt: 'You are leading a discussion on the theme of escapism. A peer says, "Charley just wants to run away from his problems." Using the PEEL structure (Point.', answer: 'Response: "I agree that escape is central (Point)',
                  options: ['Response: "I agree that escape is central (Point)', 'discussion points', '"discussion points" are just comprehension questions asked aloud'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_01_013 (Critical Thinking) for analysis models and.',
                  misconception: 'Students believe "discussion points" are just comprehension questions asked aloud.' }
          ],
            remediations: { 'discussion-points-are-just-comprehension': { steps: ['Have the student list 5 factual questions about the chapter.', 'Together, convert each into an open-ended interpretive prompt by adding "Why," "How," or "What does this suggest.', 'Practice a 3-minute micro-discussion on one converted prompt, requiring the student to use "The text says..." and "I.', 'Debrief: identify moments where the student slipped back into fact-recall and redirect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
